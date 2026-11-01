# texturas.py — genera las texturas del acabado de cine en video/tex/ (correr una vez).
# grano_0..7: grano de película (se alterna cada cuadro). papel: fibra suave para las ilustraciones.
# madera_*: vetas de madera para mesas, repisas y huacales. tierra: sustrato/tierra de maceta.
import os
import numpy as np
from PIL import Image, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, 'tex')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def ruido_suave(h, w, escala, sem):
    r = np.random.default_rng(sem)
    peq = r.random((max(2, h // escala), max(2, w // escala)))
    return np.asarray(Image.fromarray((peq * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), dtype=np.float32) / 255


def fbm(h, w, sem, octavas=(256, 96, 32, 12, 4), pesos=(0.4, 0.25, 0.17, 0.11, 0.07)):
    acc = np.zeros((h, w), np.float32)
    for i, (e, p) in enumerate(zip(octavas, pesos)):
        acc += ruido_suave(h, w, e, sem + i * 31) * p
    return acc / sum(pesos)


# 1) Grano de película: gris medio (128) con ruido; se usa con mix-blend-mode: overlay.
for k in range(8):
    g = rng.normal(0, 1, (540, 960)).astype(np.float32)
    g = np.asarray(Image.fromarray(np.clip(128 + g * 38, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)))
    Image.fromarray(g).save(os.path.join(OUT, f'grano_{k}.png'), optimize=True)

# 2) Papel: fibra muy suave (gris claro casi blanco), para multiplicar sobre las ilustraciones.
h, w = 1080, 1920
f = fbm(h, w, 3)
fib = rng.normal(0, 1, (h, w)).astype(np.float32)
fib = np.asarray(Image.fromarray(np.clip(128 + fib * 60, 0, 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(1)), np.float32) / 255
papel = 236 + (f - 0.5) * 26 + (fib - 0.5) * 14
Image.fromarray(np.clip(papel, 0, 255).astype(np.uint8)).save(os.path.join(OUT, 'papel.png'), optimize=True)


# 3) Madera: vetas onduladas con nudos. Varios tonos.
def madera(nombre, c_claro, c_oscuro, sem, h=640, w=2048):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.random.default_rng(sem)
    # ruido estirado a lo largo (la veta corre en x)
    def estirado(ex, ey, s):
        rr = np.random.default_rng(s)
        peq = rr.random((max(2, h // ey), max(2, w // ex)))
        return np.asarray(Image.fromarray((peq * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), np.float32) / 255
    n = 0.5 * estirado(600, 90, sem) + 0.3 * estirado(240, 30, sem + 1) + 0.2 * estirado(90, 10, sem + 2)
    curva = y + 22 * np.sin(x / 520 + sem) + 70 * (n - 0.5)
    # nudos (deformación suave, sin cortes)
    for _ in range(2):
        cx, cy, rr_ = r.uniform(300, w - 300), r.uniform(100, h - 100), r.uniform(18, 36)
        d = np.sqrt(((x - cx) / 3.0) ** 2 + (y - cy) ** 2)
        curva += 40 * np.exp(-(d / (rr_ * 2.2)) ** 2) * np.tanh((y - cy) / 12)
    vetas = (0.5 + 0.5 * np.sin(curva / 4.2)) ** 3
    anillos = (0.5 + 0.5 * np.sin(curva / 19 + 1.3)) ** 2
    fibra = estirado(160, 1, sem + 5)
    t = np.clip(0.38 * vetas + 0.27 * anillos + 0.2 * n + 0.15 * fibra, 0, 1)[..., None]
    c1, c2 = np.array(c_claro, np.float32), np.array(c_oscuro, np.float32)
    img = c1 * (1 - t) + c2 * t
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(os.path.join(OUT, f'madera_{nombre}.png'), optimize=True)


madera('clara', (214, 168, 112), (139, 88, 46), 11)
madera('media', (176, 118, 66), (96, 56, 28), 23)
madera('oscura', (120, 74, 40), (54, 30, 16), 37)
madera('pino', (232, 196, 140), (178, 128, 72), 41, 512, 1536)

# 4) Tierra / sustrato: grumos y piedritas.
h, w = 512, 1024
n = fbm(h, w, 51, (128, 48, 16, 6, 2), (0.3, 0.25, 0.2, 0.15, 0.1))
gr = rng.random((h, w)).astype(np.float32)
t = np.clip(n * 0.8 + (gr > 0.985) * 0.5, 0, 1)[..., None]
img = np.array((92, 62, 40), np.float32) * (1 - t) + np.array((38, 24, 16), np.float32) * t
img += (gr[..., None] > 0.995) * 70
Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(os.path.join(OUT, 'tierra.png'), optimize=True)

# 5) Aserrín: virutas claras.
n = fbm(h, w, 61, (64, 24, 8, 3), (0.3, 0.3, 0.25, 0.15))
t = np.clip(n, 0, 1)[..., None]
img = np.array((236, 206, 150), np.float32) * (1 - t) + np.array((170, 120, 64), np.float32) * t
Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(os.path.join(OUT, 'aserrin.png'), optimize=True)

print('Listo:', sorted(os.listdir(OUT)))
