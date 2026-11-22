#!/usr/bin/env python3
"""Auditor de encuadre del modo cine: ¿el dibujo llena el cuadro y está centrado?

Uso:  NAVEGADOR=chrome python3 motor/kit/auditar-encuadre.py shots/amb-04-barrenador shots/qui-08-cebolla …

Para cada escena del narrado saca tres cuadros (30 %, 60 % y 90 % de la escena) y mide lo dibujado (sin el fondo, las motas
ni la barra de escala de la esquina). Marca la escena si en dos de los tres cuadros pasa algo de esto:
  ARRIBA  el centro de masa del dibujo queda por encima de y=840 (de 1920) y menos del 8 % baja de y=1250: tercio de abajo vacío
  ABAJO   el centro de masa queda por debajo de y=1250
  CHICO   la caja del dibujo mide menos de 560 px de ancho Y menos de 760 px de alto
Regla del modo cine: el sujeto ocupa al menos medio cuadro y va centrado (centro del dibujo entre y≈800 y y≈1150).
Lo marcado se arregla a mano en el .jsx del shot (agrandar, bajar, recalcular barras de escala) y se vuelve a correr.
Debe terminar en «encuadre bien». Va junto con auditar-laminas.py.
"""
import json, os, re, subprocess, sys
import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
COLS, TW = 12, 180


def mascaras(png, n):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', png, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
    info = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', png], capture_output=True, text=True).stdout.strip().split(',')
    W, H = int(info[0]), int(info[1]); img = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
    filas = (n + COLS - 1) // COLS; cw = TW; ch = (H - 4 * (filas - 1)) // filas
    out = []
    for i in range(n):
        x0, y0 = (i % COLS) * (cw + 4), (i // COLS) * (ch + 4)
        t = img[y0:y0 + ch, x0:x0 + cw].astype(int).copy()
        t[:38, :50] = 0                                              # número de cuadro de preview.mjs
        t[:int(ch * 300 / 1920), int(cw * 740 / 1080):] = 0          # barra de escala de la esquina
        mx, mn = t.max(axis=2), t.min(axis=2)
        m = (mx > 105) | (((mx - mn) > 70) & (mx > 80))
        pad = np.pad(m, 2).astype(int); v = sum(pad[a:a + m.shape[0], b:b + m.shape[1]] for a in range(5) for b in range(5))
        out.append(m & (v >= 6))
    return out


def juicio(m):
    ys, xs = np.where(m)
    if len(xs) < 40:
        return 'VACIO'
    fy, fx = 1920 / m.shape[0], 1080 / m.shape[1]
    cy = ys.mean() * fy; w = (xs.max() - xs.min() + 1) * fx; h = (ys.max() - ys.min() + 1) * fy
    abajo = (ys * fy > 1250).mean()
    if cy < 840 and abajo < 0.08: return 'ARRIBA'
    if cy > 1250: return 'ABAJO'
    if w < 560 and h < 760: return 'CHICO'
    return ''


def shot(d):
    cfg = json.load(open(os.path.join(d, 'narracion.json'), encoding='utf-8'))
    html = open(os.path.join(d, cfg['salida']), encoding='utf-8').read()
    sc = json.loads(re.search(r"OM_SCENES = '(.*?)';", html).group(1))
    ts, nombres, t = [], [], 0.0
    for s in sc:
        if s['name'] != 'Outro':
            ts += [t + s['dur'] * 0.3, t + s['dur'] * 0.6, t + s['dur'] * 0.9]; nombres.append((s['name'], t))
        t += s['dur']
    png = '/tmp/enq_%s_%d.png' % (os.path.basename(d), os.getpid())
    subprocess.run(['node', os.path.join(RAIZ, 'motor', 'preview.mjs'), d, cfg['salida'], png, ','.join('%.2f' % x for x in ts), '--cols', str(COLS), '--ancho', str(TW)], capture_output=True, text=True)
    if not os.path.exists(png):
        return [('?', 0, 'NO CARGÓ')], len(nombres)
    ms = mascaras(png, len(ts)); os.remove(png)
    mal = []
    for i, (nom, a) in enumerate(nombres):
        js = [juicio(m) for m in ms[3 * i:3 * i + 3]]
        for tipo in ('ARRIBA', 'ABAJO', 'CHICO', 'VACIO'):
            if js.count(tipo) >= 2:
                mal.append((nom, a, tipo)); break
    return mal, len(nombres)


if __name__ == '__main__':
    tot = 0
    for d in sys.argv[1:]:
        mal, n = shot(os.path.abspath(d)); tot += len(mal)
        print('%-30s %s' % (os.path.basename(d), 'encuadre bien' if not mal else '%d de %d escenas: ' % (len(mal), n) + ' · '.join('%s@%.0fs %s' % x for x in mal)), flush=True)
    print('Escenas con encuadre flojo:', tot)
