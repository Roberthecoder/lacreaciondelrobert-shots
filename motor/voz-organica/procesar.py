#!/usr/bin/env python3
"""Voz orgánica: la voz grabada por Robert (celular, sin equipo) en lugar de la voz de ElevenLabs.

Hace todo en GitHub, gratis (sin créditos de ElevenLabs):
  1. Limpia el audio: quita el "aire" de fondo (aprende su huella en las pausas y lo resta: noisereduce), el retumbe y
     suaviza las "s".
  2. Lo empareja con la voz profesional de Robert en ElevenLabs (referencia_robert.flac) con Matchering:
     mismo color de voz (ecualización) y mismo volumen.
  3. Recorta los silencios del principio y del final.
  4. Whisper (faster-whisper) escucha el audio y encuentra en qué segundo se dice cada palabra.
  5. Empareja esas palabras con el guion y escribe los tiempos por carácter en el MISMO formato que ElevenLabs
     ({characters, character_start_times_seconds, character_end_times_seconds}): el resto del motor no cambia.

Uso:
  python3 procesar.py ENTRADA SALIDA.flac --guion texto.txt --tiempos tiempos.json
  python3 procesar.py ENTRADA SALIDA.flac --transcribir transcripcion.json   (sin guion: Robert habló libre)

Variables: WHISPER_MODELO (por defecto large-v3-turbo), VOZ_REFERENCIA (otro archivo de referencia).
"""
import argparse, json, os, re, subprocess, sys, tempfile, unicodedata
from difflib import SequenceMatcher

AQUI = os.path.dirname(os.path.abspath(__file__))
VERSION = 'vo-2'   # cambia si cambia el procesamiento (invalida la caché)


def ff(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


def nivel_pausas(a, sr):
    import numpy as np
    w = int(0.02 * sr)
    rms = np.array([np.sqrt(np.mean(a[i:i + w] ** 2)) + 1e-9 for i in range(0, len(a) - w, w)])
    return float(np.percentile(20 * np.log10(rms), 10))


def quitar_aire(entrada, salida, fuerza=None):
    """Ruido de fondo fuera. La huella del ruido sale de los cuadros más callados (pausas y respiros)."""
    import numpy as np, soundfile as sf, noisereduce as nr
    fuerza = float(os.environ.get('VOZ_QUITAR_AIRE', fuerza or 0.9))   # 0 = nada · 1 = todo (puede sonar a "agua")
    a, sr = sf.read(entrada, dtype='float32')
    if a.ndim > 1:
        a = a.mean(1)
    w = int(0.03 * sr)
    cuadros = [a[i:i + w] for i in range(0, len(a) - w, w)]
    rms = np.array([np.sqrt(np.mean(x ** 2)) for x in cuadros])
    callados = np.argsort(rms)[:max(20, len(cuadros) // 10)]
    huella = np.concatenate([cuadros[i] for i in sorted(callados)])
    b = nr.reduce_noise(y=a, sr=sr, y_noise=huella, stationary=True, prop_decrease=fuerza, n_std_thresh_stationary=1.5)
    sf.write(salida, b, sr, subtype='FLOAT')
    return nivel_pausas(a, sr), nivel_pausas(b, sr)


def limpiar(entrada, salida, tmp):
    crudo = os.path.join(tmp, 'crudo.wav')
    ff('-i', entrada, '-vn', '-ac', '1', '-ar', '48000', '-c:a', 'pcm_f32le', crudo)
    # 1) quitar el "aire" (ruido de fondo): se aprende su huella en las pausas y se resta (spectral gating)
    sin_ruido = os.path.join(tmp, 'sin_ruido.wav')
    antes, despues = quitar_aire(crudo, sin_ruido)
    print(f'Aire de fondo: pausas {antes:.0f} dB → {despues:.0f} dB')
    # 2) retumbe fuera (<75 Hz), "s" suaves y compresión ligera
    filtros = ('highpass=f=75,deesser=i=0.35:m=0.5:f=0.5,'
               'acompressor=threshold=-24dB:ratio=2.2:attack=10:release=180:makeup=2')
    limpio = os.path.join(tmp, 'limpio.wav')
    ff('-i', sin_ruido, '-af', filtros, '-ar', '44100', '-c:a', 'pcm_s24le', limpio)

    # Matchering: mismo color y volumen que la voz profesional de ElevenLabs
    ref = os.environ.get('VOZ_REFERENCIA') or os.path.join(AQUI, 'referencia_robert.flac')
    emparejado = os.path.join(tmp, 'emparejado.wav')
    try:
        import matchering as mg
        mg.log(lambda *_: None)
        ref_wav = os.path.join(tmp, 'ref.wav')
        ff('-i', ref, '-ac', '2', '-ar', '44100', '-c:a', 'pcm_s24le', ref_wav)
        lim_st = os.path.join(tmp, 'limpio_st.wav')
        ff('-i', limpio, '-ac', '2', '-c:a', 'pcm_s24le', lim_st)
        mg.process(target=lim_st, reference=ref_wav, results=[mg.pcm24(emparejado)])
        print('Voz emparejada con la referencia de ElevenLabs (Matchering)')
    except Exception as e:  # sin Matchering, queda la limpieza sola
        print(f'Aviso: Matchering no corrió ({e}); se usa solo la limpieza')
        emparejado = limpio

    # recorta silencio del inicio y del final (deja 0.05 s) y guarda mono 48 kHz
    recorte = ('silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,'
               'areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.25,areverse')
    ff('-i', emparejado, '-af', recorte, '-ac', '1', '-ar', '48000', salida)


def norm(p):
    p = unicodedata.normalize('NFD', p.lower())
    p = ''.join(c for c in p if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9ñ]', '', p)


def escuchar(wav, guion=''):
    import numpy as np, soundfile as sf
    from faster_whisper import WhisperModel
    w16 = wav + '.16k.wav'
    ff('-i', wav, '-ac', '1', '-ar', '16000', w16)
    audio, _ = sf.read(w16, dtype='float32')
    modelo = os.environ.get('WHISPER_MODELO', 'large-v3-turbo')
    m = WhisperModel(modelo, device='cpu', compute_type='int8')
    # pista de vocabulario: palabras raras del guion (nombres científicos, términos técnicos)
    raras = []
    for t in re.findall(r"[\wÁÉÍÓÚáéíóúñÑüÜ'-]+", guion):
        if (len(t) > 6 or t[0].isupper()) and t not in raras:
            raras.append(t)
    pista = ', '.join(raras)[:600] or None
    segs, _ = m.transcribe(audio, language='es', word_timestamps=True, vad_filter=True,
                           initial_prompt=pista, condition_on_previous_text=False)
    palabras = []
    for s in segs:
        for w in s.words or []:
            palabras.append({'p': w.word.strip(), 'a': round(w.start, 3), 'b': round(w.end, 3), 'conf': round(w.probability, 3)})
    print(f'Whisper ({modelo}): {len(palabras)} palabras escuchadas')
    return palabras


def alinear(texto, palabras):
    """Tiempos por carácter del guion (formato ElevenLabs) a partir de las palabras que escuchó Whisper."""
    toks = [(m.start(), m.end(), norm(m.group())) for m in re.finditer(r'\S+', texto)]
    toks = [t for t in toks if t[2]]
    oido = [norm(w['p']) for w in palabras]
    sm = SequenceMatcher(None, [t[2] for t in toks], oido, autojunk=False)
    tiempo = [None] * len(toks)
    for a, b, n in sm.get_matching_blocks():
        for k in range(n):
            tiempo[a + k] = (palabras[b + k]['a'], palabras[b + k]['b'])
    # también empareja palabras parecidas dentro de huecos del mismo tamaño (p. ej. "dicarion" ≈ "ticarion")
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'replace' and i2 - i1 == j2 - j1:
            for k in range(i2 - i1):
                tiempo[i1 + k] = (palabras[j1 + k]['a'], palabras[j1 + k]['b'])
    hallados = sum(t is not None for t in tiempo)
    # palabras del guion que no se oyeron: se reparten en el hueco entre las vecinas, según su largo
    fin_total = palabras[-1]['b'] if palabras else 0.0
    i = 0
    while i < len(toks):
        if tiempo[i] is not None:
            i += 1; continue
        j = i
        while j < len(toks) and tiempo[j] is None:
            j += 1
        t0 = tiempo[i - 1][1] if i > 0 else 0.0
        t1 = tiempo[j][0] if j < len(toks) else fin_total
        largos = [toks[k][1] - toks[k][0] for k in range(i, j)]
        tot = sum(largos) or 1
        cur = t0
        for k, L in zip(range(i, j), largos):
            d = (t1 - t0) * L / tot
            tiempo[k] = (cur, cur + d); cur += d
        i = j
    ini = [None] * len(texto); fin = [None] * len(texto)
    for (c0, c1, _), (a, b) in zip(toks, tiempo):
        n = c1 - c0
        for k in range(n):
            ini[c0 + k] = a + (b - a) * k / n
            fin[c0 + k] = a + (b - a) * (k + 1) / n
    # espacios y signos entre palabras: el hueco entre la anterior y la siguiente
    ult = 0.0
    for k in range(len(texto)):
        if ini[k] is None:
            ini[k] = fin[k] = ult
        else:
            ult = fin[k]
    return ({'characters': list(texto), 'character_start_times_seconds': [round(x, 3) for x in ini],
             'character_end_times_seconds': [round(x, 3) for x in fin]}, hallados, len(toks))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('entrada'); ap.add_argument('salida')
    ap.add_argument('--guion'); ap.add_argument('--tiempos'); ap.add_argument('--transcribir')
    ap.add_argument('--sin-limpiar', action='store_true')
    a = ap.parse_args()
    with tempfile.TemporaryDirectory() as tmp:
        if a.sin_limpiar:
            ff('-i', a.entrada, '-vn', '-ac', '1', '-ar', '48000', a.salida)
        else:
            limpiar(a.entrada, a.salida, tmp)
    texto = open(a.guion, encoding='utf-8').read().strip() if a.guion else ''
    palabras = escuchar(a.salida, texto)
    if a.transcribir:
        json.dump({'version': VERSION, 'texto': ' '.join(w['p'] for w in palabras), 'palabras': palabras},
                  open(a.transcribir, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'Transcripción guardada en {a.transcribir}')
    if texto and a.tiempos:
        al, ok, n = alinear(texto, palabras)
        pct = 100 * ok / max(1, n)
        json.dump({'version': VERSION, 'alignment': al, 'palabras': palabras, 'coincidencia': round(pct, 1)},
                  open(a.tiempos, 'w', encoding='utf-8'), ensure_ascii=False)
        print(f'Guion alineado: {ok} de {n} palabras encontradas en el audio ({pct:.0f} %)')
        if pct < 75:
            print('::warning title=Voz orgánica::El audio no se parece al guion (menos de 75 % de palabras). '
                  '¿Robert leyó otro texto? Revisa los subtítulos o usa --transcribir y reescribe el guion con lo que dijo.')


if __name__ == '__main__':
    main()
