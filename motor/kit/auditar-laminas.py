#!/usr/bin/env python3
"""Auditor de láminas: encuentra escenas que se quedan casi vacías (texto solo, tarjeta sola, fondo sin sujeto).

Uso:  NAVEGADOR=chrome python3 motor/kit/auditar-laminas.py shots/amb-04-barrenador shots/cie-04-dedos-arrugados …
Para cada escena del narrado saca dos cuadros (1 s después de empezar y a la mitad) y mide qué parte de la zona central
(sin logo, sin barra de escala y sin subtítulo) tiene dibujo. Marca la escena si en alguno de los dos queda menos de 2.5 %.
Regla del modo cine: ninguna escena puede ser lámina. Lo marcado se arregla a mano en el .jsx del shot.
"""
import json, os, re, subprocess, sys
import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UMBRAL = 0.025


def cuadros(png, n, cols, tw):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', png, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
    info = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', png], capture_output=True, text=True).stdout.strip().split(',')
    W, H = int(info[0]), int(info[1]); img = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
    filas = (n + cols - 1) // cols; cw, ch = W / cols, H / filas
    out = []
    for i in range(n):
        x0, y0 = int((i % cols) * cw), int((i // cols) * ch)
        t = img[y0 + int(ch * 0.15):y0 + int(ch * 0.60), x0 + int(cw * 0.06):x0 + int(cw * 0.94)].astype(int)
        mx, mn = t.max(axis=2), t.min(axis=2)
        out.append(float(((mx > 105) | ((mx - mn) > 70) & (mx > 80)).mean()))
    return out


def shot(d):
    cfg = json.load(open(os.path.join(d, 'narracion.json'), encoding='utf-8'))
    html = open(os.path.join(d, cfg['salida']), encoding='utf-8').read()
    sc = json.loads(re.search(r"OM_SCENES = '(.*?)';", html).group(1))
    ts, nombres, t = [], [], 0.0
    for s in sc:
        if s['name'] != 'Outro':
            ts += [t + min(1.0, s['dur'] * 0.4), t + s['dur'] * 0.55]; nombres.append((s['name'], t, s['dur']))
        t += s['dur']
    png = '/tmp/aud_%s.png' % os.path.basename(d)
    subprocess.run(['node', os.path.join(RAIZ, 'motor', 'preview.mjs'), d, cfg['salida'], png, ','.join('%.2f' % x for x in ts), '--cols', '12', '--ancho', '108'], capture_output=True, text=True)
    if not os.path.exists(png):
        return [('?', 0, 0, 0)]
    fr = cuadros(png, len(ts), 12, 108)
    mal = []
    for i, (nom, a, dur) in enumerate(nombres):
        m = min(fr[2 * i], fr[2 * i + 1])
        if m < UMBRAL:
            mal.append((nom, a, dur, m))
    return mal


if __name__ == '__main__':
    tot = 0
    for d in sys.argv[1:]:
        mal = shot(os.path.abspath(d)); tot += len(mal)
        print('%-28s %s' % (os.path.basename(d), 'sin láminas' if not mal else ' · '.join('%s@%.0fs(%.1f%%)' % (n, a, m * 100) for n, a, _, m in mal)), flush=True)
    print('Escenas marcadas:', tot)
