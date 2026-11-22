#!/usr/bin/env python3
"""Encuadre automático del modo cine: que el sujeto llene el cuadro.

Uso:  NAVEGADOR=chrome python3 motor/kit/encuadrar.py shots/bio-04-fagos shots/fun-09-amanita …

Para cada escena del narrado saca 6 cuadros SIN encuadre, mide la caja que ocupa todo lo dibujado (sujeto, etiquetas,
chips; no cuenta el fondo ni las motas) y la guarda en shots/<clave>/encuadre.json como {"Escena": [x0, y0, x1, y1]} en
pixeles de 1080x1920. Con eso cine.jsx agranda y centra cada escena (hasta 1.7x) para que el dibujo ocupe el cuadro sin
que nada se salga. Una escena que ya llena la pantalla queda igual. Después de un pase a mano que mueva piezas se vuelve
a correr. El resultado SIEMPRE se mira en una hoja de cuadros (motor/preview.mjs).
"""
import json, os, re, shutil, subprocess, sys
import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CINE = os.path.join(RAIZ, 'motor', 'kit', 'cine.jsx')
N, COLS, TW = 6, 12, 180


def mascaras(png, n):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', png, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
    info = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', png], capture_output=True, text=True).stdout.strip().split(',')
    W, H = int(info[0]), int(info[1]); img = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
    filas = (n + COLS - 1) // COLS; cw = TW; ch = (H - 4 * (filas - 1)) // filas    # preview.mjs deja 4 px entre cuadros
    out = []
    for i in range(n):
        x0, y0 = (i % COLS) * (cw + 4), (i // COLS) * (ch + 4)
        t = img[y0:y0 + ch, x0:x0 + cw].astype(int).copy()
        t[:38, :50] = 0                                   # el número de cuadro que pone preview.mjs
        mx, mn = t.max(axis=2), t.min(axis=2)
        m = (mx > 105) | (((mx - mn) > 70) & (mx > 80))
        # quita motas sueltas: un pixel cuenta si en su vecindad de 5x5 hay al menos 6 encendidos
        m = m & (vecinos(m, 2) >= 6)
        out.append(m)
    return out


def vecinos(m, r):
    pad = np.pad(m, r).astype(int)
    return sum(pad[a:a + m.shape[0], b:b + m.shape[1]] for a in range(2 * r + 1) for b in range(2 * r + 1))


def caja(m):
    ys, xs = np.where(m)
    return None if len(xs) < 12 else [xs.min(), ys.min(), xs.max() + 1, ys.max() + 1]


def coincide(ma, mb):
    """¿El cuadro encuadrado (mb) es el cuadro original (ma) agrandado y movido TODO junto? Si alguna pieza del shot se
    dibuja fuera de la Escena, no se mueve con las demás y el encuadre la despegaría: esa escena se deja sin encuadre."""
    ca, cb = caja(ma), caja(mb)
    if ca is None or cb is None:
        return ca is None and cb is None
    k = (cb[2] - cb[0]) / (ca[2] - ca[0]); kh = (cb[3] - cb[1]) / (ca[3] - ca[1])
    if abs(k - kh) > 0.07 * k:
        return False
    k = (k + kh) / 2; dx = cb[0] - k * ca[0]; dy = cb[1] - k * ca[1]
    h, w = ma.shape; yy, xx = np.mgrid[0:h, 0:w]
    sx = np.round((xx - dx) / k).astype(int); sy = np.round((yy - dy) / k).astype(int)
    ok = (sx >= 0) & (sx < w) & (sy >= 0) & (sy < h)
    pred = np.zeros_like(ma); pred[ok] = ma[sy[ok], sx[ok]]
    A = vecinos(pred, 2) > 0; B = vecinos(mb, 2) > 0
    return (A & B).sum() / max(1, (A | B).sum()) >= 0.62


def pase(d, cfg, ts, png, extra):
    with open(os.path.join(d, 'cine.jsx'), 'w', encoding='utf-8') as f:
        f.write(open(CINE, encoding='utf-8').read() + extra)
    if os.path.exists(png): os.remove(png)
    subprocess.run(['node', os.path.join(RAIZ, 'motor', 'preview.mjs'), d, cfg['salida'], png, ','.join('%.2f' % x for x in ts), '--cols', str(COLS), '--ancho', str(TW)], capture_output=True, text=True)
    return mascaras(png, len(ts)) if os.path.exists(png) else None


def shot(d):
    cfg = json.load(open(os.path.join(d, 'narracion.json'), encoding='utf-8'))
    html = open(os.path.join(d, cfg['salida']), encoding='utf-8').read()
    sc = json.loads(re.search(r"OM_SCENES = '(.*?)';", html).group(1))
    ts, nombres, t = [], [], 0.0
    for s in sc:
        if s['name'] != 'Outro':
            a = t + min(1.0, s['dur'] * 0.35); b = t + s['dur'] - 0.12
            ts += [a + (b - a) * j / (N - 1) for j in range(N)]; nombres.append(s['name'])
        t += s['dur']
    base = os.path.basename(d); ej = os.path.join(d, 'encuadre.json'); res, fuera = {}, []
    # 1) sin encuadre, sin cámara y sin barra de escala: la caja de lo dibujado en cada escena
    A = pase(d, cfg, ts, '/tmp/encA_%s.png' % base, '\nwindow.CINE_MIDIENDO = true; window.CINE_SIN_ENCUADRE = true;\n')
    if A:
        f = 1080 / TW
        for i, nom in enumerate(nombres):
            c = [x for x in (caja(m) for m in A[i * N:(i + 1) * N]) if x]
            if c:
                res[nom] = [int(round(min(x[0] for x in c) * f)), int(round(min(x[1] for x in c) * f)), int(round(max(x[2] for x in c) * f)), int(round(max(x[3] for x in c) * f))]
        # 2) con encuadre: se comprueba que todo se movió junto; la escena que no, se queda como estaba
        B = pase(d, cfg, ts, '/tmp/encB_%s.png' % base, '\nwindow.CINE_MIDIENDO = true;\nwindow.CINE_ENCUADRE = ' + json.dumps(res, ensure_ascii=False) + ';\n')
        for i, nom in enumerate(nombres):
            if nom in res and not (B and all(coincide(A[i * N + j], B[i * N + j]) for j in range(N))):
                del res[nom]; fuera.append(nom)
        json.dump(res, open(ej, 'w', encoding='utf-8'), ensure_ascii=False)
    subprocess.run([sys.executable, os.path.join(RAIZ, 'motor', 'kit', 'aplicar-cine.py'), d], capture_output=True, text=True)
    return res, fuera


if __name__ == '__main__':
    for d in sys.argv[1:]:
        r, fuera = shot(os.path.abspath(d))
        print('%-28s encuadradas %d · sin encuadre (piezas fuera de la escena) %s' % (os.path.basename(d), len(r), ', '.join(fuera) or 'ninguna'), flush=True)
