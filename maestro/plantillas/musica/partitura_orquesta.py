# partitura.py — «Constelaciones»: la música del documental #00 («¿Qué es La Creación del Robert?»), en versión orquestal.
# Uso: python partitura.py [--niveles]   → ../video/musica.wav + ../video/tiempos.js
#
# De dónde sale: largos/000-que-es-la-creacion/video/musica_largo.mjs. Se conservan sus 10 capítulos («cues»), el carácter
# de cada uno (asombro, infancia, juego, misterio, determinación, impulso, expansión, emoción, cierre), su tonalidad y su
# progresión de acordes, y su idea de crecer en cada cambio de capítulo. Lo nuevo:
#   · 1.5× más rápido (72 → 108 BPM), como lo pidió Robert; los capítulos guardan la proporción del documental (~13:40).
#   · Un TEMA propio que vuelve en cada capítulo (en mayor o en menor, con otro instrumento), en lugar de melodías al azar.
#   · Desarrollo por frases de 4 compases (motivo → respuesta → secuencia → cadencia) hechas con pedazos del tema.
#   · Orquesta real (grabaciones VSCO 2 CE, CC0): cuerdas, flauta, oboe, clarinete, fagot, cornos, arpa, glockenspiel,
#     timbales y platillo. Cuantos más instrumentos, más energía; crescendo con redoble y platillo al entrar a cada capítulo.
#   · En cada capítulo se arma una constelación: cada estrella nace en una nota del arpa (los tiempos van a tiempos.js).
import json, os, sys, subprocess
import numpy as np
from orquesta import Orquesta, mezclar, niveles, leer, SR, RAIZ

AQUI = os.path.dirname(os.path.abspath(__file__))
VIDEO = os.path.join(AQUI, '..', 'video')
BPM = 108; BEAT = 60 / BPM; BAR = 4 * BEAT
rng = np.random.default_rng(20261103)

# ---------------- acordes ----------------
TIPO = {'M': [0, 4, 7], 'm': [0, 3, 7], 'M7': [0, 4, 7, 11], 'm7': [0, 3, 7, 10], 'sus': [0, 5, 7], 'add9': [0, 4, 7, 14], '7': [0, 4, 7, 10]}
def ac(raiz, tipo): return (raiz % 12, tipo)
def pcs(c): return sorted({(c[0] + i) % 12 for i in TIPO[c[1]]})

# ---------------- los 10 capítulos del core (misma progresión y carácter que musica_largo.mjs) ----------------
# compases a 108 BPM ≈ duración del capítulo en el documental ÷ 1.5
CAPS = [
    dict(id='frijolito', nombre='Gancho', compases=14, tono=2, modo='mayor', e=0.35, pizz=0, lider='flauta',
         prog=[ac(50, 'add9'), ac(47, 'm7'), ac(43, 'M7'), ac(45, 'sus')], estrellas_desde=4),
    dict(id='plantas', nombre='La semilla', compases=28, tono=7, modo='mayor', e=0.45, pizz=0.4, lider='clarinete',
         prog=[ac(43, 'M'), ac(50, 'M'), ac(52, 'm'), ac(48, 'M7'), ac(43, 'add9'), ac(50, 'sus'), ac(48, 'M'), ac(50, 'M')]),
    dict(id='olimpiada', nombre='Primaria', compases=56, tono=0, modo='mayor', e=0.6, pizz=1, lider='oboe',
         prog=[ac(48, 'M'), ac(43, 'M'), ac(45, 'm'), ac(41, 'M7'), ac(45, 'm'), ac(41, 'M'), ac(48, 'M'), ac(43, 'sus')]),
    dict(id='hongos', nombre='El hongo', compases=20, tono=2, modo='menor', e=0.32, pizz=0, lider='chelos',
         prog=[ac(50, 'm7'), ac(48, 'M'), ac(46, 'M7'), ac(48, 'sus')]),
    dict(id='secundaria', nombre='Secundaria', compases=56, tono=4, modo='menor', e=0.55, pizz=0.4, lider='violas',
         prog=[ac(52, 'm'), ac(48, 'M7'), ac(43, 'M'), ac(50, 'M'), ac(52, 'm'), ac(45, 'm7'), ac(48, 'M'), ac(47, 'M')]),
    dict(id='prepa', nombre='Prepa', compases=76, tono=9, modo='menor', e=0.66, pizz=0.6, lider='violines',
         prog=[ac(45, 'm'), ac(41, 'M'), ac(48, 'M'), ac(43, 'M'), ac(41, 'M7'), ac(43, 'sus'), ac(45, 'm'), ac(40, 'M')]),
    dict(id='universidad', nombre='Universidad', compases=84, tono=5, modo='mayor', e=0.72, pizz=0.5, lider='violines',
         prog=[ac(41, 'add9'), ac(48, 'M'), ac(50, 'm7'), ac(46, 'M7'), ac(41, 'M'), ac(45, 'm'), ac(46, 'M'), ac(48, 'sus')]),
    dict(id='fungimati', nombre='Lo que viene', compases=12, tono=5, modo='mayor', e=0.82, pizz=0.4, lider='violines',
         prog=[ac(46, 'M'), ac(48, 'M'), ac(50, 'm'), ac(48, 'sus')]),
    dict(id='canal', nombre='Qué es LCR', compases=16, tono=2, modo='mayor', e=0.6, pizz=0, lider='violines',
         prog=[ac(43, 'M7'), ac(50, 'M'), ac(52, 'm7'), ac(45, 'sus')]),
    dict(id='final', nombre='Cierre', compases=9, tono=2, modo='mayor', e=0.5, pizz=0, lider='flauta',
         prog=[ac(43, 'M'), ac(45, 'sus'), ac(50, 'add9'), ac(50, 'add9')]),
]
_b = 0
for c in CAPS: c['b0'] = _b; _b += c['compases']
TOTAL = _b * BAR
def T(bar, beat=0.0): return (bar * 4 + beat) * BEAT

# ---------------- el tema (en semitonos desde la tónica; ritmo en tiempos) y su armonía ----------------
TEMA = [[(0, 1, -5), (1, 1, 0), (2, 2, 4)],
        [(0, 1.5, 2), (1.5, .5, 0), (2, 1, -1), (3, 1, 2)],
        [(0, 1, 0), (1, 1, 4), (2, 2, 9)],
        [(0, 1.5, 7), (1.5, .5, 5), (2, 1, 4), (3, 1, 0)],
        [(0, 1, 2), (1, 1, 5), (2, 1, 4), (3, 1, 2)],
        [(0, 4, 2)]]
ARM_TEMA = {'mayor': [(0, 'M'), (7, 'M'), (9, 'm'), (5, 'M'), (2, 'm7'), (7, 'sus')],
            'menor': [(0, 'm'), (7, 'M'), (8, 'M'), (5, 'm'), (5, 'm7'), (7, 'M')]}
A_MENOR = {4: 3, 9: 8}
def tema_en(modo):
    return [[(b, d, A_MENOR.get(n, n) if modo == 'menor' else n) for b, d, n in barra] for barra in TEMA]

ESCALA = {'mayor': [0, 2, 4, 5, 7, 9, 11], 'menor': [0, 2, 3, 5, 7, 8, 10]}
RANGO = {'flauta': (69, 93), 'oboe': (62, 86), 'clarinete': (55, 82), 'violines': (62, 93), 'violas': (55, 76),
         'chelos': (48, 70), 'fagot': (40, 64), 'cornos': (53, 74)}

def en_rango(n, inst):
    lo, hi = RANGO[inst]
    while n < lo: n += 12
    while n > hi: n -= 12
    return n

def cercana(pcs_ok, objetivo, lo, hi):
    cand = [m for m in range(lo, hi + 1) if m % 12 in pcs_ok]
    return min(cand, key=lambda m: abs(m - objetivo))

# ---------------- motor de frases (desarrollo): pedazos del tema ajustados a cada acorde ----------------
MOTIVOS = [TEMA[0], TEMA[1], TEMA[2], TEMA[3], TEMA[4],
           [(0, .5, 0), (.5, .5, 2), (1, 1, 4), (2, 1, 2), (3, 1, 0)],
           [(0, 2, 0), (2, 1, 2), (3, 1, 4)]]
CADENCIAS = [[(0, 1, 2), (1, 3, 0)], [(0, 2, 4), (2, 2, 0)], [(0, 1.5, 4), (1.5, .5, 2), (2, 2, 0)], [(0, 4, 0)]]
CARRERA = [(0, .5, 0), (.5, .5, 2), (1, .5, 4), (1.5, .5, 5), (2, 1, 7), (3, 1, 4)]

def frase(acordes, tono, modo, inst, prev, energia):
    """4 compases sobre 4 acordes → [(compás_rel, beat, dur, midi)]"""
    lo, hi = RANGO[inst]; esc = [(tono + i) % 12 for i in ESCALA[modo]]
    out = []
    m1 = MOTIVOS[rng.integers(len(MOTIVOS))]
    m2 = MOTIVOS[rng.integers(len(MOTIVOS))]
    plan = [m1, m2, m1, CADENCIAS[rng.integers(len(CADENCIAS))]]
    if energia > 0.6 and rng.random() < 0.5: plan[1] = CARRERA
    objetivo = prev
    for k, (mot, c) in enumerate(zip(plan, acordes)):
        cp = pcs(c)
        # primera nota: tono del acorde cerca de donde íbamos (sube en la secuencia, baja en la cadencia)
        sesgo = {0: 0, 1: 2, 2: 3, 3: -3}[k]
        base = cercana(cp, objetivo + sesgo, lo + 2, hi - 4)
        primero = mot[0][2]
        for b, d, n in mot:
            m = base + (n - primero)
            if b in (0, 2) or d >= 2: m = cercana(cp, m, lo, hi)          # tiempos fuertes: nota del acorde
            elif m % 12 not in esc: m = cercana(esc, m, lo, hi)            # débiles: dentro de la escala
            out.append((k, b, d, max(lo, min(hi, m))))
        if k == 3:  # cadencia: termina en la raíz o la tercera
            fin = out[-1]; out[-1] = (fin[0], fin[1], fin[2], cercana([c[0], (c[0] + TIPO[c[1]][1]) % 12], fin[3], lo, hi))
        objetivo = out[-1][3]
    return out, objetivo

def contar_estrellas():
    f = os.path.join(VIDEO, 'constelaciones.js')
    js = "global.window={};const C=require(process.argv[1]);console.log(JSON.stringify(Object.fromEntries(C.map(c=>[c.id,c.n]))))"
    return json.loads(subprocess.run(['node', '-e', js, f], capture_output=True, text=True, check=True).stdout)

ENVIOS = {'violines': (0.8, 0.45), 'violas': (0.8, 0.45), 'chelos': (0.85, 0.4), 'contrabajo': (0.85, 0.35),
          'pizz_vln': (0.85, 0.35), 'pizz_vc': (0.85, 0.3), 'arpa': (0.75, 0.5), 'flauta': (0.85, 0.45),
          'oboe': (0.85, 0.4), 'clarinete': (0.85, 0.4), 'fagot': (0.8, 0.4), 'cornos': (0.6, 0.6),
          'glock': (0.6, 0.6), 'timbal': (0.7, 0.5), 'platillo': (0.6, 0.6)}
CUERDAS = ('violines', 'violas', 'chelos')

def main():
    N_EST = contar_estrellas()
    o = Orquesta(TOTAL, ENVIOS, [(c['nombre'], T(c['b0']), T(c['b0'] + c['compases'])) for c in CAPS])
    tiempos = {'bpm': BPM, 'compas': BAR, 'total': round(TOTAL + 2.0, 3), 'secciones': [], 'estrellas': {}, 'destellos': {}, 'inicio_estrellas': {}}
    nota = o.nota
    def arpa(t, m, v, g, pan=None): nota('arpa', t, 2.6, m, v, g, pan=pan)
    timb = {1: 41.5, 2: 46.8, 3: 49.5, 4: 52.4, 5: 54.6}   # tono real de cada timbal (medido en su espectro)
    def timbal_nota(pc):
        return min([m for m in range(38, 58) if m % 12 == pc], key=lambda m: min(abs(m - x) for x in timb.values()))
    def timbal(t, pc, fuerte=3, gan=0.5):
        n = timbal_nota(pc); k = min(timb, key=lambda j: abs(timb[j] - n)); rr = 1 + int(t * 7) % 2
        for v in (fuerte, 3, 1):
            f = f'Percussion/Timpani/Timpani{k}_Hit_v{v}_rr{rr}_Sum.wav'
            if os.path.exists(os.path.join(RAIZ, f)): break
        o.perc(f, t, gan, n - timb[k], 0.0, nombre='timbal')
    def redoble(t1, pc, dur, gan=0.45):
        n = timbal_nota(pc); k = min(timb, key=lambda j: abs(timb[j] - n))
        o.perc(f'Percussion/Timpani/Rolls/Timpani{k}_Roll_v3_rr1_Sum.wav', t1 - dur, gan, n - timb[k], 0.0,
               env=[(0, 0.05), (dur * 0.85, 1.0), (dur, 1.0), (dur + 0.4, 0.0), (99, 0)], nombre='timbal')
    px = leer(os.path.join(RAIZ, 'Percussion/susCymb1-cresc-Median_v1.wav'))
    pico = np.argmax(np.convolve(np.abs(px).max(1), np.ones(2000) / 2000, 'same')) / SR
    def oleada(t1, g=0.4): o.perc('Percussion/susCymb1-cresc-Median_v1.wav', t1 - pico, g, pan=0.1, nombre='platillo')

    prev_mel = 76
    for ci, c in enumerate(CAPS):
        b0, B, tono, modo, E = c['b0'], c['compases'], c['tono'], c['modo'], c['e']
        tiempos['secciones'].append({'id': c['id'], 'nombre': c['nombre'], 't0': round(T(b0), 3), 't1': round(T(b0 + B), 3)})
        sig = CAPS[ci + 1]['e'] if ci + 1 < len(CAPS) else 0.3
        def energia(k):
            # crece hasta ~80 % del capítulo; al final sube hacia el siguiente si es más fuerte, o se calma si es más suave
            x = k / max(1, B - 1)
            v = E * (0.75 + 0.45 * np.sin(np.pi * min(1, x / 0.8) / 2))
            if x > 0.8: v += (max(sig, E) - E * 0.9) * (x - 0.8) / 0.2 * (1 if sig >= E else -0.6)
            return float(np.clip(v, 0.15, 1.0))
        # papeles: 2 compases de entrada, el tema, y luego desarrollo; el tema vuelve cada ~24 compases con otro instrumento
        papeles = ['intro'] * min(2, B); k = len(papeles); n_tema = 0
        while k < B:
            resta = B - k
            if (n_tema == 0 or (k - 2) % 24 == 0) and resta >= 6:
                papeles += ['tema'] * 6; k += 6; n_tema += 1
            elif resta >= 4:
                papeles += ['des'] * 4; k += 4
            else:
                papeles += ['cola'] * resta; k += resta
        if c['id'] == 'final': papeles = ['tema'] * 6 + ['cola'] * 3
        arm_tema = [ac(tono + i, tp) for i, tp in ARM_TEMA[modo]]
        lento = E < 0.4
        compases, it = [], 0
        for k in range(B):
            if papeles[k] == 'tema': ch = arm_tema[it % 6]; it += 1
            else:
                it = 0; ch = c['prog'][(k // 2 if lento else k) % len(c['prog'])]
            compases.append((k, ch, energia(k), papeles[k]))

        rotacion = {'flauta': ['flauta', 'clarinete', 'oboe', 'violines'], 'clarinete': ['clarinete', 'flauta', 'oboe', 'violines'],
                    'oboe': ['oboe', 'flauta', 'clarinete', 'violines'], 'chelos': ['chelos', 'clarinete', 'violas', 'chelos'],
                    'violas': ['violas', 'oboe', 'violines', 'violines'], 'violines': ['violines', 'flauta', 'oboe', 'violines']}[c['lider']]

        # ---- acompañamiento, compás por compás ----
        for k, ch, e, papel in compases:
            if c['id'] == 'final' and k >= B - 3: continue
            t = T(b0 + k); raiz = ch[0]; cp = pcs(ch); bajo = cercana([raiz], 40, 33, 47)
            d = BAR + 0.12; v = 0.2 + 0.55 * e; at = 0.5 if e < 0.5 else 0.15
            for m in (cercana(cp, 59, 55, 64), cercana(cp, 66, 61, 70)): nota('violas', t, d, m, v, 0.2, att=at)
            nota('chelos', t, d, bajo + 12, v, 0.2, att=at)
            nota('chelos', t, d, cercana(cp, 55, 50, 60), v, 0.15, att=at)
            if e > 0.3: nota('contrabajo', t, d, bajo, v, 0.42, att=0.3)
            if e > 0.5 and k % 2 == 1: nota('contrabajo', T(b0 + k, 2), BAR / 2, cercana([(raiz + 7) % 12], bajo, 31, 50), v * 0.8, 0.5)
            if e > 0.55:
                for m in (cercana(cp, 74, 66, 82), cercana(cp, 79, 70, 86)): nota('violines', t, d, m, v * 0.8, 0.3, att=0.3)
            if e > 0.5:
                for m in (cercana(cp, 60, 55, 66), cercana(cp, 65, 58, 70)): nota('cornos', t, d, m, 0.25 + 0.4 * (e - 0.5), 0.5, att=0.35)
            # arpa: ola por el acorde (negras en lo tranquilo, corcheas con energía)
            notas = [m for m in range(50, 84) if m % 12 in cp]
            paso = 1.0 if e < 0.42 else 0.5
            ola = list(range(len(notas))) + list(range(len(notas) - 2, 0, -1))
            for j in range(int(4 / paso)):
                if e > 0.85 and j % 2: continue
                arpa(T(b0 + k, j * paso), notas[ola[(j + k * 3) % len(ola)]], 0.3 + 0.2 * e, 0.32)
            if c['pizz'] and e > 0.38:   # pizzicato, donde el core lo tenía
                for j in range(4):
                    nota('pizz_vc', T(b0 + k, j), 0.5, bajo + 12 + (7 if j == 2 else 0), 0.4 + 0.3 * e, 0.33 * c['pizz'] + 0.15)
                    if j % 2 == 1:
                        for m in (cercana(cp, 67, 62, 74), cercana(cp, 71, 64, 77)): nota('pizz_vln', T(b0 + k, j), 0.4, m, 0.4, 0.25)
            if e > 0.62 and (k % 2 == 0 or e > 0.8): timbal(t, raiz, 3 if e > 0.75 else 1, 0.25 + 0.3 * e)
            if e < 0.45 and rng.random() < 0.55:   # brillos de glockenspiel en lo tranquilo
                nota('glock', T(b0 + k, int(rng.integers(0, 4)) + float(rng.choice([0, 0.5]))), 2, cercana(cp, 91, 84, 98), 0.4, 0.16)

        # ---- melodía: el tema y frases de desarrollo ----
        k = 0; n_ap = 0
        while k < B:
            papel = compases[k][3]; e = compases[k][2]
            if papel == 'tema':
                inst = rotacion[n_ap % len(rotacion)]; n_ap += 1
                base = en_rango(tono + 72, inst) if inst not in ('chelos', 'violas') else en_rango(tono + 60, inst)
                lo, hi = RANGO[inst]
                for bk, barra in enumerate(tema_en(modo)):
                    for b, dd, n in barra:
                        m = base + n
                        if m > hi: m -= 12
                        if m < lo: m += 12
                        nota(inst, T(b0 + k + bk, b), dd * BEAT * 1.06, m, 0.45 + 0.4 * e, 0.95, att=0.06 if inst in CUERDAS else None)
                        if e > 0.72 and inst == 'violines' and m + 12 <= 93: nota('flauta', T(b0 + k + bk, b), dd * BEAT, m + 12, 0.5, 0.45)
                    if e > 0.65 and bk < 5:   # cornos: notas largas debajo del tema
                        nota('cornos', T(b0 + k + bk), BAR, cercana(pcs(compases[min(B - 1, k + bk)][1]), 64, 57, 70), 0.5 + 0.3 * (e - 0.65), 0.6, att=0.15)
                prev_mel = base + 2; k += 6
            elif papel == 'des':
                inst = rotacion[(n_ap + k // 4) % len(rotacion)]
                acs = [compases[k + j][1] for j in range(4)]
                fr, prev_mel = frase(acs, tono, modo, inst, en_rango(prev_mel, inst), e)
                for bk, b, dd, m in fr:
                    nota(inst, T(b0 + k + bk, b), dd * BEAT * 1.04, m, 0.4 + 0.4 * e, 0.85, att=0.06 if inst in CUERDAS else None)
                if e < 0.5 and inst != 'clarinete':   # contracanto suave del clarinete en lo tranquilo
                    for j in (0, 2): nota('clarinete', T(b0 + k + j), BAR * 2, cercana(pcs(acs[j]), 64, 55, 70), 0.3, 0.4, att=0.4)
                k += 4
            else:
                k += 1

        # ---- estrellas: una nota aguda del arpa por estrella ----
        if c['id'] != 'final':
            n = N_EST.get(c['id'], 20)
            desde = c.get('estrellas_desde', 1.5)
            hasta = max(desde + n * 0.125, min(B * 0.62, desde + n * 2))   # entre medio tiempo y 2 compases por estrella
            ts = []
            for i in range(n):
                bt = round((desde + (hasta - desde) * i / max(1, n - 1)) * 8) / 2   # en tiempos, sobre la rejilla de corcheas
                if ts and T(b0, bt) <= ts[-1] + 0.2: bt = (ts[-1] - T(b0)) / BEAT + 0.5
                tt = T(b0, bt); ts.append(round(tt, 3))
                cp = pcs(compases[min(B - 1, int(bt // 4))][1])
                alto = [m for m in range(74, 96) if m % 12 in cp]
                arpa(tt, alto[(i * 2) % len(alto)], 0.55, 0.62, pan=-0.3 + 0.6 * ((i * 7) % 5) / 4)
            tiempos['estrellas'][c['id']] = ts
            tf = ts[-1] + BEAT
            cp = pcs(compases[min(B - 1, int((tf - T(b0)) / BAR))][1])
            for j, m in enumerate([m for m in range(86, 99) if m % 12 in cp][:2]): nota('glock', tf + j * 0.12, 2, m, 0.5, 0.3)
            tiempos['destellos'][c['id']] = round(tf, 3)
            tiempos['inicio_estrellas'][c['id']] = round(T(b0, desde * 4), 3)

        # ---- transición al siguiente capítulo ----
        if ci + 1 < len(CAPS):
            nx = CAPS[ci + 1]; t1 = T(b0 + B)
            if nx['e'] >= 0.5 or nx['e'] > E:
                redoble(t1, nx['prog'][0][0], BAR * (1.0 if nx['e'] > 0.6 else 0.7), 0.3 + 0.3 * nx['e'])
                oleada(t1, 0.25 + 0.35 * nx['e'])
                timbal(t1, nx['prog'][0][0], 3 if nx['e'] > 0.6 else 1, 0.35 + 0.3 * nx['e'])
            else:   # hacia algo más tranquilo: glissando de arpa que baja
                for j, m in enumerate(reversed([m for m in range(55, 91) if m % 12 in pcs(nx['prog'][0])])):
                    arpa(t1 - 1.2 + j * 0.06, m, 0.35, 0.4)

    # ---- acorde final de Re: se queda y se apaga ----
    cf = CAPS[-1]; tf = T(cf['b0'] + cf['compases'] - 3)
    for m, ins, g in [(38, 'contrabajo', 0.6), (50, 'chelos', 0.5), (57, 'chelos', 0.45), (62, 'violas', 0.45), (66, 'violas', 0.4),
                      (69, 'violines', 0.35), (74, 'violines', 0.3), (78, 'violines', 0.25), (62, 'cornos', 0.35), (66, 'cornos', 0.3)]:
        nota(ins, tf, BAR * 2.4, m, 0.32, g, att=0.8, rel=2.5, env=[(0, 1), (BAR, 0.85), (BAR * 2.4 + 2.5, 0)])
    for j, m in enumerate([m for m in range(50, 94) if m % 12 in (2, 6, 9)]): arpa(tf + j * 0.08, m, 0.4, 0.5)
    nota('glock', tf + 1.4, 3, 86, 0.4, 0.3); nota('glock', tf + 1.6, 3, 93, 0.4, 0.22)
    o.perc('Percussion/Triangle6-Hit_v1_rr1_Sum.wav', tf + 1.5, 0.2, pan=0.4, nombre='platillo')

    salida = os.path.join(VIDEO, 'musica.wav')
    if '--niveles' in sys.argv: niveles(o)
    mezclar(o, salida)
    with open(os.path.join(VIDEO, 'tiempos.js'), 'w', encoding='utf8') as f:
        f.write('// Lo escribe musica/partitura.py: capítulos y cuándo nace cada estrella (una nota del arpa cada una).\n')
        f.write('window.TIEMPOS = ' + json.dumps(tiempos, ensure_ascii=False) + ';\n')
    print(f'listo: {salida} · {TOTAL / 60:.2f} min · {len(CAPS)} capítulos')

if __name__ == '__main__':
    main()
