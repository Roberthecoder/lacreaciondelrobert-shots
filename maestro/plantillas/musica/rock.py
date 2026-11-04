# rock.py — «Constelaciones» versión ROCK (idea del papá de Robert). 100 % banda de rock: sin orquesta.
# Misma forma y duración que la pieza de 3 min (para que cada estrella del video siga cayendo a tiempo), pero:
#   · Batería al doble (144 BPM): bombo, caja en 2 y 4, hi-hats en corcheas, crash, redobles con toms.
#   · Guitarras rítmicas con mucha distorsión, dos tomas (izquierda/derecha): RIFFS con notas apagadas y acordes de quinta.
#   · Bajo con púa siguiendo al bombo.
#   · Guitarra solista: el tema como voz en el verso, respuestas, un gancho en el coro y un SOLO compuesto frase por frase.
#   · Cada parte tiene su propio riff y su propio ritmo de batería, con redobles al cerrar cada frase (para que no se repita).
# Forma: intro (riff solo → entra la banda) · verso 1 (calma, el tema) · verso 2 (galope) · pre-coro con silencio + coro ·
#        puente (ecos, medio tiempo y crecida) · subida (riff sincopado) · SOLO · coro final un tono más arriba · final con cierre grande.
# Uso: python rock.py   → ../revision/rock_3min.wav
import os, sys, math, json
import numpy as np
from scipy import signal
import soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import partitura_3min as P          # solo para la forma (secciones y duración) y el tema del coro
from orquesta import sala, leer, SR, RAIZ

AQUI = os.path.dirname(os.path.abspath(__file__))
SALIDA = os.path.join(AQUI, '..', 'revision', 'rock_3min.wav')
TOTAL = P.TOTAL; T = P.T
Q = P.BEAT / 2          # negra del rock (144 BPM) = corchea de la forma original
C8, C16 = Q / 2, Q / 4
N = int((TOTAL + 6) * SR)
rng = np.random.default_rng(1984)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

BUS = {k: np.zeros((N, 2), np.float32) for k in ('bateria', 'bajo', 'ritmica', 'solista', 'ride')}
def poner(bus, t, y, pan=0.0, g=1.0):
    if y.ndim == 1:
        gl, gr = math.cos((pan + 1) * math.pi / 4) * 1.41, math.sin((pan + 1) * math.pi / 4) * 1.41
        y = np.stack([y * gl, y * gr], 1)
    i0 = int(t * SR); i1 = min(N, i0 + len(y))
    if i1 > i0: BUS[bus][i0:i1] += (y[:i1 - i0] * g).astype(np.float32)

# ---------------- cuerda pulsada + amplificador ----------------
def cuerda(midi, dur, brillo=0.7, sosten=0.9985):
    f = hz(midi); p = int(SR / f); n = int(dur * SR)
    exc = rng.uniform(-1, 1, p)
    b, a = signal.butter(1, 900 + 7000 * brillo, fs=SR); exc = signal.lfilter(b, a, exc)
    x = np.zeros(n); x[:p] = exc
    aa = np.zeros(p + 2); aa[0] = 1; aa[p] = -sosten * 0.5; aa[p + 1] = -sosten * 0.5
    y = signal.lfilter([1.0], aa, x)
    return y / (np.abs(y).max() + 1e-9)

_hp = signal.butter(2, 120, 'high', fs=SR); _mid = signal.butter(2, [600, 2600], 'band', fs=SR)
def ampli(x, ganancia=34.0, tono=4300):
    x = signal.lfilter(*_hp, x)
    x = x + 0.8 * signal.lfilter(*_mid, x)                     # empuje de medios antes de saturar (sonido de rock)
    y = np.tanh(ganancia * x + 0.2) - np.tanh(0.2)
    y = np.tanh(2.0 * y)                                       # segunda etapa de saturación
    b, a = signal.butter(2, tono, fs=SR); y = signal.lfilter(b, a, signal.lfilter(b, a, y))
    b, a = signal.butter(2, 85, 'high', fs=SR); y = signal.lfilter(b, a, y)
    return y / (np.abs(y).max() + 1e-9)

def cambia_tono(y, curva):
    """curva(t) = semitonos de desvío; se integra como velocidad de lectura (bends y vibrato)"""
    t = np.arange(len(y)) / SR
    vel = 2 ** (curva(t) / 12)
    pos = np.cumsum(vel); pos -= pos[0]
    return np.interp(pos, np.arange(len(y)), y, right=0)

# ---------------- instrumentos ----------------
def golpe_ritmica(t, raiz, dur, g, apagada=False, quinta=True):
    for lado, dt in ((-0.85, 0.0), (0.85, 0.009)):
        notas = [(raiz, 1.0)] + ([(raiz + 7, 0.85), (raiz + 12, 0.6)] if quinta else [])
        y = sum(cuerda(m, dur + 0.12, 0.75, 0.9965 if apagada else 0.999) * w for m, w in notas)
        y = ampli(y, 30 if apagada else 36, 3200 if apagada else 4300)
        tt = np.arange(len(y)) / SR
        y *= (np.exp(-tt * 14) if apagada else 1) * np.clip((dur + 0.12 - tt) / 0.03, 0, 1)
        poner('ritmica', t + dt, y, lado, g)

def solista(t, midi, dur, g=0.5, bend=0.0, vib=True, pan=0.08):
    y = cuerda(midi, dur + 0.3, 0.85, 0.9997)
    y = 0.65 * y + 0.35 * signal.sawtooth(2 * np.pi * hz(midi) * np.arange(len(y)) / SR) * np.exp(-np.arange(len(y)) / SR * 0.6)
    def curva(tt):
        c = np.zeros_like(tt)
        if bend: c += -bend * np.clip(1 - tt / 0.13, 0, 1)                     # sube a la nota (bend)
        if vib and dur > 0.3: c += 0.32 * np.clip((tt - 0.22) / 0.2, 0, 1) * np.sin(2 * np.pi * 5.6 * tt)
        return c
    y = cambia_tono(y, curva)
    y = ampli(y, 26, 5200)
    tt = np.arange(len(y)) / SR
    y *= np.clip((dur + 0.3 - tt) / 0.15, 0, 1) * np.clip(tt / 0.006, 0, 1)
    poner('solista', t, y, pan, g)

def bajo(t, midi, dur, g=0.5):
    while midi > 43: midi -= 12
    while midi < 28: midi += 12
    y = cuerda(midi, dur + 0.04, 0.5, 0.997)
    tt = np.arange(len(y)) / SR
    y = 0.7 * y + 0.6 * np.sin(2 * np.pi * hz(midi) * tt) * np.exp(-tt * 2)
    y = np.tanh(2.5 * y) * np.clip((dur + 0.04 - tt) / 0.03, 0, 1)
    poner('bajo', t, y, 0, g)

def bombo(t, g=1.0):
    tt = np.arange(int(0.35 * SR)) / SR
    ph = 2 * np.pi * np.cumsum(50 + 110 * np.exp(-tt * 38)) / SR
    y = np.sin(ph) * np.exp(-tt * 9) + 0.4 * rng.uniform(-1, 1, len(tt)) * np.exp(-tt * 400)
    poner('bateria', t, np.tanh(2.2 * y), 0, g)

HH = [205.3, 304.4, 369.6, 522.7, 540.0, 800.0]
_bp = signal.butter(2, [6500, 13000], 'band', fs=SR)
def hihat(t, g=0.25, abierto=False):
    tt = np.arange(int((0.4 if abierto else 0.06) * SR)) / SR
    y = sum(signal.square(2 * np.pi * f * 1.7 * tt) for f in HH) + rng.uniform(-1, 1, len(tt)) * 2
    y = signal.lfilter(*_bp, y) * np.exp(-tt * (8 if abierto else 70))
    poner('bateria', t, y / (np.abs(y).max() + 1e-9), 0.35, g)

_bpr = signal.butter(2, [3000, 11000], 'band', fs=SR)
def ride(t, g=0.3, pan=-0.3):   # platillo ride: metálico y sin tono fijo (muchas parciales disparejas + ruido)
    tt = np.arange(int(0.7 * SR)) / SR
    fs = [2350, 3170, 3930, 4610, 5280, 6110, 7340, 8020]
    y = sum(signal.square(2 * np.pi * f * tt + i) for i, f in enumerate(fs)) * 0.4 + rng.uniform(-1, 1, len(tt))
    y = signal.lfilter(*_bpr, y) * (0.6 * np.exp(-tt * 9) + 0.4 * np.exp(-tt * 40))
    poner('ride', t, y / (np.abs(y).max() + 1e-9), pan, g)

CAJA = [leer(os.path.join(RAIZ, f'Percussion/Snare2-HitSN_v{v}_rr{r}_Sum.wav')) for v in (5, 7, 9) for r in (1, 2)]
CAJA = [c / np.abs(c).max() for c in CAJA]
def caja(t, g=0.8, fuerte=1.0):
    c = CAJA[min(5, int(fuerte * 4) + int(t * 3) % 2)][: int(0.5 * SR)].copy()
    tt = np.arange(len(c)) / SR
    cuerpo = np.sin(2 * np.pi * 200 * tt) * np.exp(-tt * 18) * 0.9 + rng.uniform(-1, 1, len(tt)) * np.exp(-tt * 25) * 0.5
    poner('bateria', t, np.tanh(1.8 * (c + cuerpo[:, None])), 0, g)

def tom(t, f0, g=0.7):
    tt = np.arange(int(0.5 * SR)) / SR
    ph = 2 * np.pi * np.cumsum(f0 * (1 + 0.5 * np.exp(-tt * 20))) / SR
    poner('bateria', t, np.tanh(1.5 * np.sin(ph) * np.exp(-tt * 7)), 0.4 if f0 > 120 else -0.4, g)

CRASH = [leer(os.path.join(RAIZ, f'Percussion/cymbal-crash1_{d}_rr{r}.wav')) for d in ('mf', 'ff') for r in (1, 2)]
CRASH = [c / np.abs(c).max() for c in CRASH]
def crash(t, g=0.45, lado=0):
    poner('bateria', t, CRASH[2 + int(t * 5) % 2] * 1.0, 0, g)

def redoble(t1, tiempos=2, g=0.75):   # semicorcheas de caja y toms hacia t1
    n = int(tiempos * 4)
    for i in range(n):
        tt = t1 - (n - i) * C16
        if i < n // 2: caja(tt, g * (0.5 + 0.5 * i / n), 0.6)
        else: tom(tt, [200, 160, 120, 95, 80][min(4, (i - n // 2) * 5 // max(1, n - n // 2))], g)

# ---------------- forma: una canción de rock con partes distintas ----------------
# Todo se escribe en semicorcheas de 144 BPM: 32 por compás de la forma original (3.33 s = 2 compases de rock).
SECC = {s: (b0, b1) for s, b0, b1 in P.SECC}
S = C16
def at(bar, s16=0): return T(bar) + s16 * S

def bateria(bar, mitad, kicks, cajas, plato='c8', g=1.0, crash_en=None):
    """un compás de rock (mitad 0 o 1 del compás de la forma). Posiciones en semicorcheas 0..15."""
    t0 = at(bar, mitad * 16)
    for k in kicks: bombo(t0 + k * S, 0.95 * g if k in (0, 8) else 0.75 * g)
    for c in cajas:
        fuerte = c in (4, 12)
        caja(t0 + c * S, (0.95 if fuerte else 0.35) * g, 0.95 if fuerte else 0.25)    # las suaves son "notas fantasma"
    if plato == 'c8':
        for i in range(0, 16, 2): hihat(t0 + i * S, (0.16 if i % 4 == 0 else 0.11) * g)
    elif plato == 'c16':
        for i in range(16): hihat(t0 + i * S, (0.13 if i % 2 == 0 else 0.07) * g)
    elif plato == 'c4':
        for i in range(0, 16, 4): hihat(t0 + i * S, 0.14 * g)
    elif plato == 'o8':
        for i in range(0, 16, 2): hihat(t0 + i * S, 0.12 * g, abierto=(i % 4 == 2))
    elif plato == 'ride':
        for i in range(0, 16, 2): ride(t0 + i * S, (0.22 if i % 4 == 0 else 0.13) * g, -0.35)
    elif plato == 'tom':
        for i in range(0, 16, 2): tom(t0 + i * S, 82, (0.45 + 0.1 * (i % 4 == 0)) * g)
    if crash_en is not None: crash(t0 + crash_en * S, 0.5 * g)

def relleno(bar_fin, tiempos, g=0.8, tipo='toms'):
    """redoble que termina justo antes del compás bar_fin (tiempos = negras de 144 que dura)"""
    n = int(tiempos * 4); t1 = at(bar_fin)
    for i in range(n):
        tt = t1 - (n - i) * S
        if tipo == 'caja' or i < n // 3: caja(tt, g * (0.45 + 0.55 * i / n), 0.4 + 0.6 * i / n)
        else: tom(tt, [210, 170, 135, 105, 85][min(4, (i - n // 3) * 5 // max(1, n - n // 3))], g)

def guit(t, nota, dur, g, tipo):
    """tipo: 'x' nota grave apagada · 'n' nota sola · 'p' acorde de quinta"""
    golpe_ritmica(t, nota, dur, g, apagada=(tipo == 'x'), quinta=(tipo == 'p'))

def oleada_guit(t, raiz, dur, g=0.4):
    """acorde que entra suave (como con el pedal de volumen) y deja eco"""
    for lado in (-0.6, 0.6):
        y = sum(cuerda(m, dur + 0.3, 0.7, 0.9993) * w for m, w in ((raiz, 1), (raiz + 7, 0.8), (raiz + 12, 0.6)))
        y = ampli(y, 22, 3800); tt = np.arange(len(y)) / SR
        y *= np.clip(tt / (dur * 0.45), 0, 1) ** 1.6 * np.clip((dur + 0.3 - tt) / 0.4, 0, 1)
        for e in range(4): poner('ritmica', t + e * 3 * C8 + (0.0 if lado < 0 else 0.15), y, lado * (1 - 0.2 * e), g * 0.55 ** e)

def frase_sol(bar, notas, g=0.55, trans=0, pan=0.08):
    """notas: (inicio s16, duración s16, midi, bend) — una frase compuesta (no al azar)"""
    for s0, d, m, *b in notas:
        solista(at(bar, s0), m + trans, d * S * 1.02, g, bend=(b[0] if b else 0), vib=d >= 4, pan=pan)

# --- riffs (en semicorcheas; la nota se suma a la raíz del acorde) ---
RIFF_A1 = [(0, 2, 0, 'x'), (2, 2, 0, 'x'), (4, 2, 3, 'n'), (6, 2, 0, 'x'), (8, 2, 5, 'n'), (10, 2, 0, 'x'), (12, 2, 6, 'n'), (14, 2, 7, 'n'),
           (16, 6, 0, 'p'), (22, 2, 0, 'x'), (24, 4, -2, 'p'), (28, 2, 7, 'n'), (30, 2, 5, 'n')]
RIFF_A2 = [(0, 2, 0, 'x'), (2, 2, 0, 'x'), (4, 2, 3, 'n'), (6, 2, 0, 'x'), (8, 2, 5, 'n'), (10, 2, 0, 'x'), (12, 2, 6, 'n'), (14, 2, 7, 'n'),
           (16, 4, 5, 'p'), (20, 4, 7, 'p'), (24, 8, 0, 'p')]
GALOPE = [(s, 1 if (s % 4) else 2, 0, 'x') for b in range(0, 32, 4) for s in (b, b + 2, b + 3)]
GALOPE = [g for g in GALOPE if g[0] not in (8, 24)] + [(8, 4, 0, 'p'), (24, 4, 0, 'p')]
EMPUJE = [(s, 2, 0, 'x') for s in range(0, 32, 2) if s not in (0, 6, 12, 20, 26)] + [(0, 4, 0, 'p'), (6, 4, 0, 'p'), (12, 6, 0, 'p'), (20, 4, 0, 'p'), (26, 6, 0, 'p')]
TOQUES = [(0, 10, 0, 'p'), (14, 2, 0, 'p'), (20, 10, 0, 'p')]       # verso 1: acordes que suenan y respiran

def riff(bar, raiz, patron, g=0.36, dobles=True):
    for s0, d, iv, tipo in patron:
        guit(at(bar, s0), raiz + iv, d * S * 0.92, g * (1.15 if tipo == 'p' else 1), tipo)

def bajo_sigue(bar, raiz, patron_s, g=0.5):
    for s0 in patron_s: bajo(at(bar, s0), raiz, 2 * S * 0.9, g)

def main():
    # ===================== INTRO (4 compases): el riff solo, luego entra la banda =====================
    b0 = SECC['intro'][0]
    for k in range(4):
        pat = RIFF_A1 if k % 2 == 0 else RIFF_A2
        for s0, d, iv, tipo in pat:
            y_g = 0.4 if k < 2 else 0.36
            if k < 2:   # solo la guitarra izquierda
                y = sum(cuerda(38 + iv + q, d * S + 0.1, 0.75, 0.999 if tipo != 'x' else 0.9965) * w for q, w in ([(0, 1), (7, .85), (12, .6)] if tipo == 'p' else [(0, 1)]))
                y = ampli(y, 30 if tipo == 'x' else 36, 3200 if tipo == 'x' else 4300); tt = np.arange(len(y)) / SR
                y *= (np.exp(-tt * 14) if tipo == 'x' else 1) * np.clip((d * S + 0.1 - tt) / 0.03, 0, 1)
                poner('ritmica', at(b0 + k, s0), y, -0.7, y_g)
            else:
                guit(at(b0 + k, s0), 38 + iv, d * S * 0.92, y_g * (1.15 if tipo == 'p' else 1), tipo)
    for i in range(4): hihat(at(b0 + 1, 16 + i * 4), 0.15)                       # el baterista cuenta: 1, 2, 3, 4
    for k in (2, 3):
        bajo_sigue(b0 + k, 38, [0, 2, 6, 8, 12, 16, 18, 22, 24], 0.5)
        for m in (0, 1): bateria(b0 + k, m, [0, 6, 8, 10], [4, 12], 'c8', crash_en=0 if (k == 2 and m == 0) else None)
    relleno(b0 + 4, 1)

    # ===================== VERSO 1 (frijolito): banda en calma, la guitarra canta el tema =====================
    b0 = SECC['frijolito'][0]
    prog = [38, 45, 47, 43, 40, 45]                                              # D A B G E A (la armonía del tema)
    for k, r in enumerate(prog):
        riff(b0 + k, r, TOQUES, 0.32)
        bajo_sigue(b0 + k, r, [0, 6, 10, 16, 22, 26], 0.5)
        for m in (0, 1): bateria(b0 + k, m, [0, 6, 10] if m == 0 else [0, 10, 14], [4, 12] + ([7] if k % 2 else []), 'c8' if k >= 2 else 'c4', 0.85, crash_en=0 if (k == 0 and m == 0) else None)
        if k % 2 == 1 and k < 5: relleno(b0 + k + 1, 0.5, 0.6, 'caja')
    relleno(b0 + 6, 1)
    for b, d, n in P.TEMA:   # el tema, como si fuera la voz del cantante
        solista(T(b0, b), n, d * P.BEAT * 1.0, 0.5, bend=(1 if d >= 2 else 0))

    # ===================== VERSO 2 (plantas): riff de galope, la guitarra responde =====================
    b0 = SECC['plantas'][0]
    prog = [38, 36, 43, 38, 47, 45]                                              # D C G D B A
    for k, r in enumerate(prog):
        riff(b0 + k, r, GALOPE, 0.33)
        bajo_sigue(b0 + k, r, [0, 2, 3, 4, 6, 7, 8, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24, 28], 0.42)
        for m in (0, 1): bateria(b0 + k, m, [0, 2, 3, 8, 10, 11], [4, 12, 7, 15], 'ride', crash_en=0 if (k == 0 and m == 0) else None)
    RESP = [[(24, 2, 81), (26, 2, 79), (28, 4, 81, 2)],
            [(20, 2, 74), (22, 2, 77), (24, 2, 79), (26, 2, 81), (28, 4, 84, 2)],
            [(16, 2, 86), (18, 2, 84), (20, 2, 81), (22, 2, 79), (24, 2, 81), (26, 6, 79, 2)]]
    for j, k in enumerate((1, 3, 5)): frase_sol(b0 + k, RESP[j], 0.48)
    relleno(b0 + 6, 2)

    # ===================== PRE-CORO + CORO 1 (olimpiada) =====================
    b0 = SECC['olimpiada'][0]
    # pre-coro: G A | B ... sube la tensión con toms, y la banda se calla un instante antes del coro
    for k, (r1, r2) in enumerate([(43, 45), (47, 47)]):
        for s in range(0, 32, 2):
            if k == 1 and s >= 28: continue                                          # el silencio antes del coro
            guit(at(b0 + k, s), r1 if s < 16 else r2, 2 * S * 0.9, 0.24 + 0.012 * s, 'p')
            bajo(at(b0 + k, s), r1 if s < 16 else r2, 2 * S * 0.9, 0.42)
        bateria(b0 + k, 0, [0, 8], [12], 'tom', 0.9); bateria(b0 + k, 1, [0, 8] if k == 0 else [0], [4, 12] if k == 0 else [], 'tom' if k == 0 else 'c4', 0.95)
    for i in range(8): caja(at(b0 + 1, 16 + i * 2), 0.4 + 0.07 * i, 0.4 + 0.07 * i)
    # coro: acordes grandes que suenan + segunda guitarra en octavas + el gancho
    prog = [38, 45, 47, 43]                                                      # D A B G
    for k, r in enumerate(prog):
        bar = b0 + 2 + k
        for s0, d in ((0, 10), (10, 6), (16, 10), (26, 6)): guit(at(bar, s0), r, d * S * 0.95, 0.4, 'p')
        for s in range(0, 32, 2): solista(at(bar, s), r + 24 + (0 if (s // 2) % 2 == 0 else 12) - (12 if r + 36 > 86 else 0), 2 * S, 0.17, vib=False, pan=-0.55)
        bajo_sigue(bar, r, list(range(0, 32, 2)), 0.45)
        for m in (0, 1): bateria(bar, m, [0, 6, 8, 11], [4, 12], 'o8', 1.0, crash_en=0)
    GANCHO = [[(0, 6, 81), (6, 2, 78), (8, 4, 76), (12, 4, 74), (16, 12, 78), (28, 4, 76)],
              [(0, 6, 76), (6, 2, 74), (8, 4, 73), (12, 4, 69), (16, 16, 76, 2)],
              [(0, 6, 78), (6, 2, 76), (8, 4, 74), (12, 4, 71), (16, 12, 74), (28, 4, 76)],
              [(0, 8, 79), (8, 8, 78), (16, 8, 76), (24, 8, 74)]]
    for k, fr in enumerate(GANCHO): frase_sol(b0 + 2 + k, fr, 0.56)
    relleno(b0 + 6, 1, 0.7)

    # ===================== PUENTE (hongos): se vacía, ecos de guitarra, y vuelve a crecer =====================
    b0 = SECC['hongos'][0]
    prog = [47, 43, 40, 42, 47, 45]                                              # B G E F# B A
    for k, r in enumerate(prog):
        bar = b0 + k
        if k < 2:
            oleada_guit(at(bar), r, 4 * Q * 1.6, 0.42); bajo(at(bar), r, 8 * Q * 0.95, 0.55)
            for m in (0, 1): bateria(bar, m, [], [], 'tom', 0.55)
        elif k < 4:
            oleada_guit(at(bar), r, 4 * Q * 1.6, 0.36); bajo(at(bar), r, 4 * Q * 0.95, 0.55); bajo(at(bar, 16), r, 4 * Q * 0.95, 0.55)
            for m in (0, 1): bateria(bar, m, [0, 10], [8], 'c4', 0.85)               # medio tiempo
        else:   # crece: notas apagadas en semicorcheas y caja que acelera
            for s in range(32): guit(at(bar, s), r, S * 0.85, 0.16 + 0.006 * s + 0.06 * (k - 4), 'x')
            for s in range(0, 32, 2): bajo(at(bar, s), r, 2 * S * 0.9, 0.45)
            paso = 4 if k == 4 else 2
            for s in range(0, 32, paso): caja(at(bar, s), 0.3 + 0.5 * s / 32 + 0.15 * (k - 4), 0.3 + 0.6 * s / 32)
            for s in range(0, 32, 8): bombo(at(bar, s), 0.9)
    frase_sol(b0 + 2, [(0, 12, 83, 2), (12, 4, 81), (16, 16, 78, 2)], 0.45)
    frase_sol(b0 + 3, [(0, 12, 81, 2), (12, 4, 78), (16, 16, 82, 1)], 0.45)
    crash(at(b0 + 6), 0.6)

    # ===================== SUBIDA (prepa): riff sincopado que empuja =====================
    b0 = SECC['prepa'][0]
    prog = [43, 45, 42, 47, 40, 45]                                              # G A F# B E A
    for k, r in enumerate(prog):
        riff(b0 + k, r, EMPUJE, 0.34)
        bajo_sigue(b0 + k, r, list(range(0, 32, 2)), 0.45)
        plato = 'c8' if k < 4 else 'c16'
        for m in (0, 1): bateria(b0 + k, m, [0, 3, 6, 8, 11, 14] if k >= 2 else [0, 6, 8, 11], [4, 12], plato, 1.0, crash_en=0 if m == 0 and k in (0, 2, 4) else None)
        if k in (1, 3): relleno(b0 + k + 1, 0.5, 0.7, 'caja')
    # la solista toca el riff una octava arriba en la segunda mitad (contestando)
    for k in (2, 3, 4, 5):
        frase_sol(b0 + k, [(0, 4, prog[k] + 24), (6, 4, prog[k] + 26 if k % 2 else prog[k] + 27), (12, 6, prog[k] + 31, 1), (20, 4, prog[k] + 29), (26, 6, prog[k] + 31, 2)], 0.42)
    relleno(b0 + 6, 4, 0.9)

    # ===================== SOLO DE GUITARRA (universidad): frases compuestas que van subiendo =====================
    b0 = SECC['universidad'][0]
    prog = [38, 45, 47, 43, 38, 45]                                              # D A B G D A
    for k, r in enumerate(prog):
        for s0, d in ((0, 6), (6, 2), (8, 8), (16, 6), (22, 2), (24, 8)): guit(at(b0 + k, s0), r, d * S * 0.92, 0.3, 'p')
        bajo_sigue(b0 + k, r, list(range(0, 32, 2)), 0.45)
        for m in (0, 1): bateria(b0 + k, m, [0, 3, 8, 10, 11], [4, 12, 14], 'ride', 1.0, crash_en=0 if (m == 0 and k % 2 == 0) else None)
    SOLO = [
        [(0, 8, 81, 2), (8, 4, 79), (12, 4, 76), (16, 12, 74, 1), (28, 2, 76), (30, 2, 77)],                     # 1: frase con bend
        [(0, 8, 84, 2), (8, 4, 81), (12, 4, 79), (16, 12, 81, 2), (28, 4, 79)],                                  # 2: la contesta más arriba
        [(i, 1, m) for i, m in enumerate([86, 84, 81, 79, 77, 76, 74, 72, 74, 76, 77, 79, 81, 79, 77, 76])] + [(16, 16, 81, 2)],  # 3: corrida que baja
        [(s, 1, m) for s, m in zip(range(0, 24), [86, 84, 81] * 8)] + [(24, 8, 79, 2)],                         # 4: lick repetido que gira
        [(i, 1, m) for i, m in enumerate([74, 76, 77, 79, 81, 84, 86, 88, 89, 91, 93, 91, 89, 88, 86, 88])] + [(16, 16, 91, 2)],  # 5: corrida hacia arriba
        [(0, 24, 93, 2), (24, 8, 88)],                                                                           # 6: la nota más alta
    ]
    for k, fr in enumerate(SOLO): frase_sol(b0 + k, fr, 0.58, pan=0.0)
    relleno(b0 + 6, 2, 0.9)

    # ===================== CORO FINAL (fungimati): sube un tono (de Re a Mi) =====================
    b0 = SECC['fungimati'][0]
    prog = [40, 47, 49, 45, 40, 47]                                              # E B C# A E B
    for k, r in enumerate(prog):
        bar = b0 + k
        for s0, d in ((0, 10), (10, 6), (16, 10), (26, 6)): guit(at(bar, s0), r if r <= 47 else r - 12, d * S * 0.95, 0.42, 'p')
        for s in range(0, 32, 2): solista(at(bar, s), (r if r <= 47 else r - 12) + 24 + (0 if (s // 2) % 2 == 0 else 12) - (12 if (r if r <= 47 else r - 12) + 36 > 88 else 0), 2 * S, 0.17, vib=False, pan=-0.55)
        bajo_sigue(bar, r if r <= 47 else r - 12, list(range(0, 32, 2)), 0.47)
        for m in (0, 1): bateria(bar, m, [0, 2, 6, 8, 10, 14] if k >= 4 else [0, 6, 8, 11], [4, 12], 'o8', 1.0, crash_en=0)
    for k, fr in enumerate(GANCHO + GANCHO[:2]): frase_sol(b0 + k, fr, 0.6, trans=2)
    for k, fr in enumerate(GANCHO + GANCHO[:2]): frase_sol(b0 + k, [(s, d, m - 4 if m % 12 in (0, 4, 7, 11) else m - 3, *b) for s, d, m, *b in fr], 0.38, trans=2, pan=-0.4)  # segunda voz
    for s in range(16, 32): bombo(at(b0 + 5, s), 0.55 + 0.02 * s)                   # doble bombo al final

    # ===================== FINAL (9 compases): vuelve el riff, y un cierre grande =====================
    b0 = SECC['final'][0]
    for k in range(4):
        riff(b0 + k, 40, RIFF_A1 if k % 2 == 0 else RIFF_A2, 0.36)
        bajo_sigue(b0 + k, 40, [0, 2, 6, 8, 12, 16, 18, 22, 24], 0.5)
        for m in (0, 1): bateria(b0 + k, m, [0, 6, 8, 10], [4, 12], 'o8' if k >= 2 else 'c8', crash_en=0 if m == 0 and k in (0, 2) else None)
    frase_sol(b0 + 2, [(0, 2, 88), (2, 2, 86), (4, 4, 83), (8, 8, 86, 2), (16, 2, 88), (18, 2, 91), (20, 12, 93, 2)], 0.5)
    for k, (r1, r2) in enumerate([(40, 36), (38, 40)]):                          # medio tiempo enorme: E C | D E
        bar = b0 + 4 + k
        guit(at(bar), r1, 16 * S * 0.97, 0.45, 'p'); guit(at(bar, 16), r2, 16 * S * 0.97, 0.45, 'p')
        bajo(at(bar), r1, 16 * S * 0.95, 0.6); bajo(at(bar, 16), r2, 16 * S * 0.95, 0.6)
        for m in (0, 1): bateria(bar, m, [0, 10], [8], 'c4', 1.0, crash_en=0)
    bar = b0 + 6                                                                  # golpes de toda la banda
    for s in (0, 6, 12):
        guit(at(bar, s), 40, 4 * S, 0.5, 'p'); bajo(at(bar, s), 40, 4 * S, 0.65); bombo(at(bar, s), 1.0); crash(at(bar, s), 0.5)
    relleno(b0 + 7, 4, 1.0)
    tf = at(b0 + 7)
    golpe_ritmica(tf, 40, P.BAR * 2.1, 0.55); bajo(tf, 40, P.BAR * 2, 0.7); crash(tf, 0.7); bombo(tf, 1.0); caja(tf, 1.0, 1)
    solista(tf + 0.05, 88, P.BAR * 1.9, 0.42, bend=2)
    for c in range(16): tom(tf + P.BAR * 1.15 + c * S * (1 + c / 14), [210, 170, 135, 105][c % 4], 0.45 + c * 0.03)
    tff = tf + P.BAR * 2.2
    golpe_ritmica(tff, 40, 1.8, 0.6); bajo(tff, 40, 1.6, 0.7); crash(tff, 0.75); bombo(tff, 1.0); caja(tff, 1.0, 1)


    # ---------- mezcla ----------
    def comp(x, umbral=0.25, razon=4.0, su=0.08):
        env = np.abs(x).max(1)
        b, a = signal.butter(1, 1 / (2 * np.pi * su), fs=SR); env = signal.lfilter(b, a, env)
        g = np.minimum(1, (umbral / (env + 1e-9)) ** (1 - 1 / razon))
        return x * g[:, None].astype(np.float32)
    mix = np.zeros((N, 2), np.float32); hum = np.zeros((N, 2), np.float32)
    niveles = {'bateria': (1.1, 0.1), 'bajo': (0.35, 0.0), 'ritmica': (0.78, 0.06), 'solista': (0.95, 0.22), 'ride': (1.2, 0.15)}
    for k, (g, r) in niveles.items():
        x = BUS[k]; x = comp(x / (np.abs(x).max() + 1e-9) * 0.5) * g
        mix += x; hum += x * r
        print(f'{k:8s} rms {20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-9):6.1f} dB')
    ir = sala(N, rt=1.1)
    for c in range(2): mix[:, c] += (signal.oaconvolve(hum[:, c], ir[:, c])[:N] * 0.7).astype(np.float32)
    b, a = signal.butter(2, 32, 'high', fs=SR); mix = signal.lfilter(b, a, mix, axis=0)
    mix = comp(mix / np.abs(mix).max() * 0.8, 0.3, 3.0, 0.15)
    mix = np.tanh(mix * 1.8) / np.tanh(1.8)                         # "pegamento" de la mezcla, como en un disco de rock
    mix *= np.clip((TOTAL + 5.5 - np.arange(N) / SR) / 2, 0, 1)[:, None]
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    sf.write(SALIDA, (mix * 0.95 / np.abs(mix).max()).astype(np.float32), SR, subtype='PCM_24')
    print('listo', SALIDA, f'{TOTAL:.1f} s')

if __name__ == '__main__':
    main()
