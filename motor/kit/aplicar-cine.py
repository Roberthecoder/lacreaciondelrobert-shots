#!/usr/bin/env python3
"""Pone un shot (o todos) en modo cine: imagen oscura y cama luminosa. Se puede correr las veces que sea.

Uso:  python3 motor/kit/aplicar-cine.py              → todos los shots de shots/
      python3 motor/kit/aplicar-cine.py shots/bio-04-fagos shots/fun-09-amanita

Qué hace en cada carpeta de shot:
  1. copia motor/kit/cine.jsx;
  2. en cada .dc.html mete ./cine.jsx en la línea <x-import>, justo antes del .jsx del shot (después de todos los kits);
  3. en su audio-kit local cambia pad() (la cama grave) por la cama luminosa, una sola para todo el video;
  4. en el .jsx del shot oscurece los fondos, cielos y franjas de color puestos a mano que ocupan toda la pantalla
     (este paso se aplica una sola vez por archivo: deja una marca en su primera línea).
No toca guion, narración ni voz: el video se vuelve a renderizar con la voz guardada.
"""
import glob, json, os, re, shutil, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CINE = os.path.join(RAIZ, 'motor', 'kit', 'cine.jsx')
PAD = ("    // Cama de los narrados: «cama luminosa» (22 nov 2026; motor/kit/cama-luminosa.mjs). Una sola para todo el video,\n"
       "    // aunque el shot llame a pad() por tramos; los parámetros de la cama grave vieja ya no se usan.\n"
       "    pad: (t0, t1, g = 0.05) => { CAMA = CAMA ? { a: Math.min(CAMA.a, t0), b: Math.max(CAMA.b, t1), g: Math.max(CAMA.g, g) } : { a: t0, b: t1, g }; },\n")
GUARDA = "      if (CAMA) { camaLuminosa(mus, SR, Math.max(0, Math.floor(warp(CAMA.a) * SR)), Math.min(N, Math.floor(warp(CAMA.b) * SR)), { g: CAMA.g, semilla: 11 }); CAMA = null; }\n"
MARCA = '// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)'
BRILLO = r"(yellow|pink|cyan|mint|coral|orange|lilac|magenta|blue|red|gold|gold2|leaf|paper|white)"


def oscuro(h, t, base=(10, 15, 28)):
    """Mezcla un color #rrggbb con el fondo oscuro del modo cine (t = cuánto fondo)."""
    c = [int(h[i:i + 2], 16) for i in (1, 3, 5)]
    return '#' + ''.join('%02x' % round(v + (b - v) * t) for v, b in zip(c, base))


def audio(path, imp):
    s = open(path, encoding='utf-8').read()
    if 'let CAMA = null;' in s:
        return False
    i = s.find('\n    pad:'); j = s.find('\n    guardar:', i)
    k = re.search(r"\n    guardar: \([^\n]*=> \{\n", s)
    if i < 0 or j < 0 or not k or 'const mus = new Float32Array(N)' not in s:
        print('  (audio-kit con otra forma, no se tocó):', path); return False
    s = s[:i + 1] + PAD + s[j + 1:]
    k = re.search(r"\n    guardar: \([^\n]*=> \{\n", s)
    s = s[:k.end()] + GUARDA + s[k.end():]
    s = re.sub(r"(  const mus = new Float32Array\(N\), sfx = new Float32Array\(N\);\n)", r"\1  let CAMA = null;\n", s, count=1)
    if 'camaLuminosa }' not in s:
        s = s.replace("import path from 'node:path';", "import path from 'node:path';\nimport { camaLuminosa } from '%s';" % imp, 1)
    open(path, 'w', encoding='utf-8').write(s); return True


def shot(d):
    n = 0
    htmls = glob.glob(os.path.join(d, '*.dc.html'))
    if not htmls:
        return 0
    shutil.copyfile(CINE, os.path.join(d, 'cine.jsx'))
    # Encuadre automático del shot (lo mide motor/kit/encuadrar.py): va al final de su copia de cine.jsx.
    enc = os.path.join(d, 'encuadre.json')
    if os.path.exists(enc):
        with open(os.path.join(d, 'cine.jsx'), 'a', encoding='utf-8') as f:
            f.write('\n// encuadre:auto (motor/kit/encuadrar.py)\nwindow.CINE_ENCUADRE = ' + json.dumps(json.load(open(enc, encoding='utf-8')), ensure_ascii=False) + ';\n')
    propios = set()
    for h in htmls:
        s = open(h, encoding='utf-8').read()
        m = re.search(r'(<x-import[^>]*from=")([^"]*)(")', s)
        if not m:
            continue
        fs = [f for f in m.group(2).split() if f != './cine.jsx']
        propios.add(fs[-1][2:])
        nuevo = ' '.join(fs[:-1] + ['./cine.jsx', fs[-1]])
        if nuevo != m.group(2):
            open(h, 'w', encoding='utf-8').write(s[:m.start(2)] + nuevo + s[m.end(2):]); n += 1
    for a in glob.glob(os.path.join(d, 'audio-kit*.mjs')):
        n += audio(a, '../../motor/kit/cama-luminosa.mjs')
    for j in propios:
        p = os.path.join(d, j)
        if not os.path.exists(p):
            continue
        s = open(p, encoding='utf-8').read()
        if MARCA in s:
            continue
        t = re.sub(r"(position:'absolute', inset:0, background:)KC\." + BRILLO + r"\b(?!\w)", r"\1cineMix(KC.\2, CINE.fondo, 0.8)", s)
        # cielos y fondos pintados a mano con degradado de colores fijos: cada color se oscurece
        t = re.sub(r"(position:'absolute', inset:0, background:')(linear-gradient\([^')]*\))(')", lambda m: m.group(1) + re.sub(r'#[0-9a-fA-F]{6}\b', lambda c: oscuro(c.group(0), 0.74), m.group(2)) + m.group(3), t)
        # franjas a todo lo ancho (pasto, tierra, mar): más oscuras; si eran «tinta» (negro), siguen negras
        t = re.sub(r'(<rect [^>]*width=\{KW\}[^>]*fill=)\{KC\.ink\}', r'\1{CINE.borde}', t)
        t = re.sub(r'(<rect [^>]*width=\{KW\}[^>]*fill=)\{KC\.(?!ink\b)(\w+)\}', r'\1{cineMix(KC.\2, CINE.fondo, 0.55)}', t)
        t = re.sub(r'(<rect [^>]*width=\{KW\}[^>]*fill=)"(#[0-9a-fA-F]{6})"', lambda m: m.group(1) + '"' + oscuro(m.group(2), 0.5) + '"', t)
        t = re.sub(r"(background:)KC\.ink\b", r"\1CINE.borde", t)
        open(p, 'w', encoding='utf-8').write(MARCA + '\n' + t); n += 1
    return n


if __name__ == '__main__':
    for k in glob.glob(os.path.join(RAIZ, 'motor', 'kit', 'audio-kit-lote-*.mjs')):
        audio(k, './cama-luminosa.mjs')
    dirs = [os.path.abspath(a) for a in sys.argv[1:]] or sorted(glob.glob(os.path.join(RAIZ, 'shots', '*')))
    tot = 0
    for d in dirs:
        if os.path.isdir(d) and not os.path.basename(d).startswith('_'):
            tot += 1 if shot(d) else 0
    print(f'Modo cine aplicado: {tot} carpetas con cambios de {len(dirs)}')
