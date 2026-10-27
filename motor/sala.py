#!/usr/bin/env python3
"""Prepara los shots de una carpeta de videos para la Sala de Shots (el panel de Robert).

Uso:  python3 motor/sala.py /tmp/videos /tmp/sala
  /tmp/videos = lo que bajaste de refs/videos/<tu-rama> (ver "Videos al chat" en CLAUDE.md)
  /tmp/sala   = salida: <shot>.mp4 (versión ligera 480 px, ~2 MB), <shot>.jpg (póster) y <shot>.json (ficha)

Después (lo hace Claude, no este script): subir los .mp4 y .jpg con la herramienta Artifact
(action publish, url de la Sala, asset: true, file_paths) y escribir cada ficha con ArtifactData
(collection "shots", doc_id = clave del shot), poniendo en "video" y "poster" los ids que devolvió la subida.
"""
import json, os, re, subprocess, sys

SERIES = {'bio': 'Biotecnológico', 'fun': 'Fungi Mati', 'amb': 'Ambiental', 'cie': 'Científico',
          'qui': 'Químico', 'ia': 'IA', 'robert': 'Robert', 'libre': 'Libre', 'formal': 'Formal',
          'doc': 'Documental', 'otro': 'Otro'}
REDES = {'tiktok': 'tiktok', 'instagram': 'instagram', 'youtube': 'youtube', 'facebook': 'facebook',
         'linkedin': 'linkedin', 'x': 'x', 'threads': 'threads', 'comentario fijado': 'comentario'}


def redes_de(md_path):
    """Lee publicacion.md y devuelve {red: {titulo?, texto}} con los bloques ```text de la versión narrada."""
    try:
        md = open(md_path, encoding='utf-8').read().replace('\r\n', '\n')
    except OSError:
        return {}
    md = re.split(r'^## Versión sin voz', md, flags=re.M)[0] + '\n'.join(re.findall(r'^## Comentario fijado[\s\S]*', md, flags=re.M))
    out = {}
    for m in re.finditer(r'^#{2,3} (.+)\n([\s\S]*?)(?=^#{2,3} |\Z)', md, flags=re.M):
        head = m.group(1).strip().lower()
        red = next((v for k, v in REDES.items() if head.startswith(k)), None)
        if not red:
            continue
        bloques = re.findall(r'```text\n([\s\S]*?)```', m.group(2))
        if not bloques:
            continue
        if red == 'youtube' and len(bloques) >= 2:
            out[red] = {'titulo': bloques[0].strip(), 'texto': bloques[1].strip()}
        else:
            out[red] = {'texto': bloques[0].strip()}
    return out


def titulo_de(shot_dir, clave):
    try:
        g = open(os.path.join(shot_dir, 'guion.md'), encoding='utf-8').read()
    except OSError:
        return clave
    m = re.search(r'^#\s+(.+)$', g, re.M)
    t = m.group(1).strip() if m else clave
    t = re.sub(r'^(Shot\s+)?[^·—:]*?#\d+\s*[·—:-]\s*', '', t)
    t = re.sub(r'\s*[(—–-]\s*(remasteri|PILOTO|borrador).*$', '', t, flags=re.I).strip()
    return t[:90]


def main(src, out):
    os.makedirs(out, exist_ok=True)
    elegidos = {}
    for f in sorted(os.listdir(src)):
        m = re.match(r'^(.*)_(mudo|sin_voz|narrado)\.mp4$', f)
        if not m:
            continue
        clave, kind = m.groups()
        rank = 2 if kind == 'narrado' else 1
        if clave not in elegidos or rank > elegidos[clave][0]:
            elegidos[clave] = (rank, kind, f)
    for clave, (_, kind, f) in elegidos.items():
        entrada = os.path.join(src, f)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', entrada, '-vf', 'scale=480:-2', '-c:v', 'libx264',
                        '-preset', 'veryfast', '-crf', '30', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart',
                        os.path.join(out, clave + '.mp4')], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '2', '-i', entrada, '-frames:v', '1', '-vf', 'scale=360:-2',
                        '-q:v', '5', os.path.join(out, clave + '.jpg')], check=True)
        dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', entrada],
                             capture_output=True, text=True).stdout.strip()
        shot_dir = os.path.join('shots', clave)
        try:
            cfg = json.load(open(os.path.join(shot_dir, 'narracion.json'), encoding='utf-8'))
        except OSError:
            cfg = {}
        pref = clave.split('-')[0]
        mm = re.match(r'^[a-z]+-(\d+)', clave)
        ficha = {
            'serie': SERIES.get(pref, 'Otra'),
            'numero': int(mm.group(1)) if mm else None,
            'titulo': titulo_de(shot_dir, clave),
            'estado': 'Narrado listo' if kind == 'narrado' else ('Voz aprobada' if cfg.get('voz_aprobada') else 'Por revisar'),
            'caracteres': sum(len(l.get('texto', '')) for l in cfg.get('lineas', [])),
            'kind': kind,
            'dur': round(float(dur or 0), 1),
            'hd': f'https://github.com/Roberthecoder/lacreaciondelrobert-shots/releases/download/borradores-{os.environ.get("RAMA_GUIONES", "")}/{f}' if os.environ.get('RAMA_GUIONES') else None,
            'rama': os.environ.get('RAMA', ''),
            'video': None,
            'poster': None,
            'redes': redes_de(os.path.join(shot_dir, 'publicacion.md')),
        }
        json.dump(ficha, open(os.path.join(out, clave + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'{clave}: {kind}, {ficha["dur"]} s, {os.path.getsize(os.path.join(out, clave + ".mp4")) / 1048576:.1f} MB')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
