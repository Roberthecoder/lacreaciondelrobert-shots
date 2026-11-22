# orquesta.py — orquesta virtual: toca una partitura (lista de notas) con grabaciones reales de instrumentos.
#
# Las grabaciones son de VSCO 2 Community Edition (Versilian Studios), dominio público (CC0):
#   https://github.com/sgossner/VSCO-2-CE  → se descargan aparte (ver LEEME.md); NO van en el repo.
# La composición, el arreglo, la interpretación (dinámica, ataques, crescendos) y la mezcla salen de este código.
import os, re, glob, math
import numpy as np
import soundfile as sf
from scipy import signal

SR = 44100
RAIZ = os.environ.get('VSCO2', os.path.expanduser('~/herramientas-ia/vsco2'))
NOTAS = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}

# nombre: (carpeta, desfase de octava en el nombre del archivo, paneo -1..1, ganancia, liberación s, ataque s)
# El desfase se midió con el tono real de cada grabación: en casi todo VSCO el "A3" suena como A4 (440 Hz).
INSTR = {
    'violines':  ('Strings/Violin Section/susVib', 12, -0.55, 1.0, 0.45, 0.06),
    'violas':    ('Strings/Viola Section/susvib', 12, 0.25, 2.4, 0.45, 0.06),
    'chelos':    ('Strings/Cello Section/susvib', 12, 0.45, 1.6, 0.5, 0.06),
    'contrabajo': ('Strings/Solo Contrabass/SusNV', 12, 0.6, 1.2, 0.5, 0.05),
    'pizz_vln':  ('Strings/Violin Section/Pizz', 12, -0.5, 0.5, 0.25, 0.0),
    'pizz_vc':   ('Strings/Cello Section/pizzT', 12, 0.45, 0.75, 0.3, 0.0),
    'arpa':      ('Strings/Harp', 0, -0.35, 0.65, 1.2, 0.0),
    'flauta':    ('Woodwinds/Flute/susvib', 12, -0.1, 1.0, 0.3, 0.03),
    'oboe':      ('Woodwinds/Oboe/Vib', 12, 0.1, 0.9, 0.3, 0.02),
    'clarinete': ('Woodwinds/Clarinet/susLong', 12, -0.2, 0.9, 0.3, 0.02),
    'fagot':     ('Woodwinds/Bassoon/sus', 12, 0.2, 0.9, 0.3, 0.02),
    'cornos':    ('Brass/F Horn/sus', 12, -0.3, 0.9, 0.5, 0.05),
    'glock':     ('Percussion/Glock', 0, 0.3, 1.0, 1.5, 0.0),
}


def leer(f, max_s=None):
    x, sr = sf.read(f, dtype='float32', always_2d=True)
    if x.shape[1] == 1: x = np.repeat(x, 2, 1)
    if sr != SR: x = signal.resample_poly(x, SR, sr, axis=0).astype(np.float32)
    # recortar el silencio inicial (que la nota suene justo en su tiempo)
    a = np.abs(x).max(1); pk = a.max() + 1e-9
    i0 = int(np.argmax(a > pk * 0.02)); i0 = max(0, i0 - int(0.004 * SR))
    x = x[i0:]
    if max_s: x = x[:int(max_s * SR)]
    return x


def tono_glock(f):
    m = re.search(r'_([A-G])(#)?(\d)\.wav$', f)
    return 12 * (int(m.group(3)) + 1) + NOTAS[m.group(1)] + (1 if m.group(2) else 0)


class Muestras:
    """Grabaciones de un instrumento: por nota (MIDI) y capa de intensidad."""
    def __init__(self, nombre):
        carpeta, desf, self.pan, self.gan, self.rel, self.att = INSTR[nombre]
        self.nombre = nombre
        self.capas = {}  # midi -> lista de (capa, [arreglos rr])
        for f in sorted(glob.glob(os.path.join(RAIZ, carpeta, '*.wav'))):
            b = os.path.basename(f)
            if nombre == 'glock': m = tono_glock(b); capa = 2
            else:
                mm = re.search(r'(?<![A-Za-z])([A-G])(#)?(-?\d)(?=[_\.])', b)
                if not mm: continue
                m = 12 * (int(mm.group(3)) + 1) + NOTAS[mm.group(1)] + (1 if mm.group(2) else 0) + desf
                v = re.search(r'_v(\d)', b)
                capa = int(v.group(1)) if v else {'mp': 1, 'mf': 2, 'f': 3}.get(re.search(r'_(mp|mf|f)\.wav', b).group(1) if re.search(r'_(mp|mf|f)\.wav', b) else 'mf', 2)
            self.capas.setdefault(m, {}).setdefault(capa, []).append(leer(f, 7.0))
        if not self.capas: raise SystemExit(f'Faltan las grabaciones de {nombre} en {RAIZ} (ver LEEME.md)')
        # nivelar: cada capa media/alta de cada nota con el mismo nivel; las suaves conservan su diferencia natural
        ref = []
        for m, cs in self.capas.items():
            c = max(cs); x = cs[c][0][:SR]; ref.append(np.sqrt((x ** 2).mean()) + 1e-9)
        self.ref = float(np.median(ref))
        for m, cs in self.capas.items():
            top = max(cs); x = cs[top][0][:SR]; k = self.ref / (np.sqrt((x ** 2).mean()) + 1e-9)
            k = min(k, 4.0)
            for c in cs: cs[c] = [(y * k / self.ref * 0.1).astype(np.float16) for y in cs[c]]
        self.notas = np.array(sorted(self.capas))
        self.rr = 0

    def elegir(self, midi, vel):
        # la grabación más cercana (preferir subir poco: suena más natural que bajar mucho)
        d = self.notas - midi
        m = int(self.notas[np.argmin(np.abs(d) + (d > 0) * 0.1)])
        cs = self.capas[m]; ks = sorted(cs)
        if len(ks) == 1: c = ks[0]
        else: c = ks[min(len(ks) - 1, int(vel * len(ks) * 0.999))]
        self.rr += 1
        return m, cs[c][self.rr % len(cs[c])], c, ks


def afinar(x, semis, n):
    """Cambia el tono remuestreando; devuelve n muestras (rellena con ceros)."""
    r = 2 ** (semis / 12)
    pos = np.arange(n) * r
    out = np.zeros((n, 2), np.float32)
    ok = pos < len(x) - 1
    p = pos[ok]; i = p.astype(np.int64); fr = (p - i)[:, None].astype(np.float32)
    out[ok] = x[i].astype(np.float32) * (1 - fr) + x[i + 1].astype(np.float32) * fr
    return out


class Orquesta:
    def __init__(self, dur, envios, secciones=()):
        """envios: instrumento -> (nivel seco, envío a la sala). secciones: [(nombre, t0, t1)] para medir niveles."""
        self.N = int((dur + 8) * SR)
        self.seco = np.zeros((self.N, 2), np.float32)
        self.sala = np.zeros((self.N, 2), np.float32)
        self.envios = envios
        self.inst = {}
        self.secciones = list(secciones)
        self.energia = {}  # (instrumento, sección) -> suma de cuadrados

    def _b(self, nombre):
        if nombre not in self.inst: self.inst[nombre] = Muestras(nombre)
        return self.inst[nombre]

    def _sumar(self, nombre, i0, y):
        i1 = min(self.N, i0 + len(y)); y = y[:i1 - i0]
        s, r = self.envios.get(nombre, (1.0, 0.3))
        self.seco[i0:i1] += y * s; self.sala[i0:i1] += y * r
        t = i0 / SR
        for sec, t0, t1 in self.secciones:
            if t0 <= t < t1:
                k = (nombre, sec); self.energia[k] = self.energia.get(k, 0.0) + float((y ** 2).sum()); break

    def nota(self, nombre, t, dur, midi, vel=0.6, gan=1.0, att=None, rel=None, env=None, pan=None):
        """t, dur en segundos; vel 0..1 elige la capa (suave/fuerte) y el nivel; env = [(t_rel, g), ...] para crescendos."""
        I = self._b(nombre)
        m, x, capa, ks = I.elegir(midi, vel)
        rel = I.rel if rel is None else rel
        att = I.att if att is None else att
        n = int((dur + rel) * SR)
        # notas más largas que la grabación: se encadena una segunda toma sin ataque
        y = afinar(x, midi - m, n)
        largo = len(x) / 2 ** ((midi - m) / 12)
        if dur + rel > largo - 0.3 and nombre not in ('arpa', 'glock', 'pizz_vln', 'pizz_vc'):
            cruce = 1.5; ini = max(1.0, largo - 3.0)
            k0 = int(ini * SR); seg = afinar(x[int(1.2 * SR * 2 ** ((midi - m) / 12)):], midi - m, n - k0)
            w = np.clip((np.arange(n - k0) / SR) / cruce, 0, 1)[:, None]
            y[k0:] = y[k0:] * (1 - w) + seg * w
        tt = np.arange(n) / SR
        g = np.ones(n, np.float32)
        if att > 0: g *= np.clip(tt / att, 0, 1) ** 1.5
        g *= np.clip((dur + rel - tt) / rel, 0, 1) ** 2 if rel > 0 else 1
        if env:
            et, ev = zip(*env); g *= np.interp(tt, et, ev).astype(np.float32)
        # nivel: dentro de la capa, la velocidad también ajusta el volumen
        nivel = (0.35 + 0.65 * vel) * gan * I.gan
        y *= (g * nivel)[:, None]
        p = I.pan if pan is None else pan
        gl, gr = math.cos((p + 1) * math.pi / 4) * 1.41, math.sin((p + 1) * math.pi / 4) * 1.41
        y[:, 0] *= gl; y[:, 1] *= gr
        self._sumar(nombre, max(0, int(t * SR)), y)

    _perc = {}
    def perc(self, archivo, t, gan=1.0, semis=0.0, pan=0.0, env=None, nombre='perc'):
        if archivo not in self._perc: self._perc[archivo] = leer(os.path.join(RAIZ, archivo))
        x = self._perc[archivo]
        x = x * (0.3 / (np.abs(x).max() + 1e-9))  # las grabaciones de percusión vienen a niveles muy distintos
        n = int(len(x) / 2 ** (semis / 12))
        y = afinar(x, semis, n) * gan
        if env:
            et, ev = zip(*env); y *= np.interp(np.arange(n) / SR, et, ev).astype(np.float32)[:, None]
        gl, gr = math.cos((pan + 1) * math.pi / 4) * 1.41, math.sin((pan + 1) * math.pi / 4) * 1.41
        y[:, 0] *= gl; y[:, 1] *= gr
        self._sumar(nombre, max(0, int(t * SR)), y)


def sala(N, rt=2.6, semilla=3):
    """Respuesta de una sala de conciertos (sintética): reflexiones tempranas + cola que se oscurece."""
    rng = np.random.default_rng(semilla)
    L = int(rt * 1.4 * SR); t = np.arange(L) / SR
    ir = np.zeros((L, 2), np.float32)
    for ch in range(2):
        ruido = rng.standard_normal(L)
        bandas = [(signal.butter(2, 400, 'low', fs=SR), rt * 1.15), (signal.butter(2, [400, 3500], 'band', fs=SR), rt), (signal.butter(2, 3500, 'high', fs=SR), rt * 0.5)]
        cola = sum(signal.lfilter(b, a, ruido) * np.exp(-6.9 * t / r) for (b, a), r in bandas)
        cola *= np.clip((t - 0.02) / 0.06, 0, 1)  # pre-retraso + entrada suave
        for k in range(10):  # reflexiones tempranas
            d = int((0.012 + 0.006 * k + rng.random() * 0.01) * SR)
            cola[d] += (0.5 - 0.04 * k) * (1 if rng.random() > 0.5 else -1)
        ir[:, ch] = cola / np.sqrt((cola ** 2).sum())
    return ir


def mezclar(orq, salida):
    """Suma el sonido seco con la sala (reverberación por bloques) y escribe WAV estéreo 24 bits."""
    N = orq.N
    ir = sala(N)
    mix = orq.seco
    for c in range(2):
        mix[:, c] += (signal.oaconvolve(orq.sala[:, c], ir[:, c])[:N] * 0.9).astype(np.float32)
    orq.sala = None
    b, a = signal.butter(2, 32, 'high', fs=SR)   # quitar retumbe sub-grave
    mix = signal.lfilter(b, a, mix, axis=0).astype(np.float32)
    mix *= 0.89 / np.abs(mix).max()
    sf.write(salida, mix, SR, subtype='PCM_24')
    return mix

def niveles(orq):
    """tabla dB RMS por sección e instrumento (para revisar el balance sin oírlo)"""
    ks = sorted({k for k, _ in orq.energia})
    print('sección        ' + ' '.join(f'{k[:6]:>6s}' for k in ks))
    for sec, t0, t1 in orq.secciones:
        n = (t1 - t0) * SR * 2
        fila = []
        for k in ks:
            e = orq.energia.get((k, sec), 0)
            fila.append(f'{10 * np.log10(e / n + 1e-12):6.0f}' if e > 0 else '     .')
        print(f'{sec[:14]:14s} ' + ' '.join(fila))
