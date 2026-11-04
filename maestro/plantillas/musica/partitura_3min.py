# partitura.py — «Constelaciones»: pieza orquestal original para el video de La Creación del Robert.
# Uso: python partitura.py            → ../video/musica.wav + ../video/tiempos.js
#
# Forma (72 BPM, 4/4; 1 compás = 3.333 s):
#   Intro (4)  · el cielo se enciende: arpa, violines lejanos, glockenspiel.
#   1 Frijolito (6)   tema principal en la flauta, sola y tierna.
#   2 Plantas (6)     el clarinete juega; pizzicato alegre.
#   3 Olimpiada (6)   oboe y flauta cuentan hacia arriba; cuerdas pulsadas, cornos suaves.
#   4 Hongos (6)      misterio: el chelo canta en lo grave; arpa y glock como esporas.
#   5 Prepa (6)       determinación: los violines toman el tema, timbal y cornos.
#   6 Universidad (6) expansión: toda la cuerda crece; redoble de timbal y platillo hacia...
#   7 Fungi Mati (6)  clímax: el tema completo con toda la orquesta.
#   Final (8+1)       todas las constelaciones juntas; el tema vuelve a la flauta y se apaga.
# En cada etapa, cada estrella aparece en una nota del arpa (tiempos.js le dice al video cuándo).
import json, os, re, sys
import numpy as np
from orquesta import Orquesta, mezclar, leer, SR, RAIZ

AQUI = os.path.dirname(os.path.abspath(__file__))
VIDEO = os.path.join(AQUI, '..', 'video')
BPM = 72; BEAT = 60 / BPM; BAR = 4 * BEAT
def T(bar, beat=0.0): return (bar * 4 + beat) * BEAT

# ---- secciones (en compases) ----
SECC = [('intro', 0, 4), ('frijolito', 4, 10), ('plantas', 10, 16), ('olimpiada', 16, 22), ('hongos', 22, 28),
        ('prepa', 28, 34), ('universidad', 34, 40), ('fungimati', 40, 46), ('final', 46, 55)]
TOTAL = T(55)

# ---- armonía: (bajo MIDI, clases de tono) ----
A = {
    'D': (38, [2, 6, 9]), 'Dadd9': (38, [2, 6, 9, 4]), 'D/F#': (42, [2, 6, 9]), 'D7': (38, [2, 6, 9, 0]),
    'A/C#': (37, [9, 1, 4]), 'A': (45, [9, 1, 4]), 'Asus': (45, [9, 2, 4]), 'A7': (45, [9, 1, 4, 7]),
    'Bm': (35, [11, 2, 6]), 'Bm7': (35, [11, 2, 6, 9]), 'G': (43, [7, 11, 2]), 'Gmaj7': (43, [7, 11, 2, 6]),
    'Em': (40, [4, 7, 11]), 'Em7': (40, [4, 7, 11, 2]), 'F#m': (42, [6, 9, 1]), 'F#': (42, [6, 10, 1]),
    'C': (36, [0, 4, 7]), 'Am7': (45, [9, 0, 4, 7]),
}
PROG = {
    'intro': ['Dadd9', 'Bm7', 'Gmaj7', 'Asus'],
    'frijolito': ['D', 'A/C#', 'Bm', 'G', 'Em7', 'Asus'],
    'plantas': ['G', 'D/F#', 'Em', 'C', 'Am7', 'D7'],
    'olimpiada': ['Em', 'A', 'F#m', 'Bm', 'G', 'A'],
    'hongos': ['Bm', 'G', 'Em', 'F#', 'Bm', 'Asus'],
    'prepa': ['G', 'A', 'F#m', 'Bm', 'Em7', 'A'],
    'universidad': ['D/F#', 'G', 'A', 'Bm', 'G', 'A'],
    'fungimati': ['D', 'A/C#', 'Bm', 'G', 'Em7', 'A'],
    'final': ['G', 'D/F#', 'Em7', 'A', 'Bm', 'G', 'Asus', 'D', 'D'],
}

def voz(pcs, lo, hi, k):
    """k notas del acorde repartidas entre lo y hi."""
    c = [m for m in range(lo, hi + 1) if m % 12 in pcs]
    if k >= len(c): return c
    idx = np.linspace(0, len(c) - 1, k).round().astype(int)
    return [c[i] for i in idx]

# ---- melodías (compás relativo, tiempo, duración en tiempos, nota) ----
def frase(lista):  # [(dur, nota|None), ...] por compases consecutivos → [(beat_abs, dur, nota)]
    out, b = [], 0.0
    for d, n in lista:
        if n is not None: out.append((b, d, n))
        b += d
    return out

TEMA = frase([(1, 69), (1, 74), (2, 78),            # D
              (1.5, 76), (.5, 74), (1, 73), (1, 76),  # A/C#
              (1, 74), (1, 78), (2, 83),            # Bm
              (1.5, 81), (.5, 79), (1, 78), (1, 74),  # G
              (1, 76), (1, 79), (1, 78), (1, 76),   # Em7
              (4, 76)])                              # A (semicadencia)
JUEGO = frase([(.5, 74), (.5, 76), (1, 74), (1, 71), (1, 67),
               (.5, 69), (.5, 71), (1, 69), (1, 66), (1, 62),
               (1, 64), (1, 67), (1, 71), (1, 76),
               (1.5, 76), (.5, 74), (1, 72), (1, 67),
               (1, 69), (1, 72), (1, 76), (1, 79),
               (2, 78), (1, 72), (1, 69)])
CUENTA = frase([(.5, 76), (.5, 78), (.5, 79), (.5, 81), (2, 83),
                (1, 85), (.5, 83), (.5, 81), (2, 76),
                (1, 78), (1, 81), (1, 85), (1, 81),
                (1.5, 83), (.5, 81), (2, 78),
                (.5, 79), (.5, 81), (1, 83), (1, 86), (1, 83),
                (2, 85), (2, 81)])
MISTERIO = frase([(2, 54), (1, 59), (1, 61),
                  (3, 62), (1, 59),
                  (1.5, 64), (.5, 62), (2, 59),
                  (2, 58), (2, 61),
                  (1, 62), (1, 66), (1, 64), (1, 62),
                  (2, 64), (2, 61)])
DECISION = frase([(1, 71), (1, 74), (1.5, 79), (.5, 78),
                  (2, 76), (2, 81),
                  (1.5, 85), (.5, 83), (1, 81), (1, 78),
                  (2, 86), (1, 83), (1, 78),
                  (1, 79), (1, 83), (1, 86), (1, 88),
                  (3, 85), (1, 81)])
VUELO = frase([(1, 78), (1, 81), (2, 86),
               (1.5, 83), (.5, 81), (1, 79), (1, 83),
               (1, 85), (1, 88), (2, 81),
               (1, 83), (1, 86), (2, 90),
               (1.5, 88), (.5, 86), (1, 83), (1, 79),
               (2, 81), (1, 85), (1, 88)])
RECUERDO = frase([(2, 83), (1, 81), (1, 79),
                  (3, 78), (1, 81),
                  (1.5, 79), (.5, 78), (2, 76),
                  (2, 76), (2, 73),
                  (1, 74), (1, 78), (2, 83),
                  (1.5, 81), (.5, 79), (1, 78), (1, 74),
                  (4, 76),
                  (8, 74)])

def contar_estrellas():
    """cuántas estrellas tiene cada constelación (lo lee de ../video/constelaciones.js con node)"""
    import subprocess
    f = os.path.join(VIDEO, 'constelaciones.js')
    if not os.path.exists(f): return {}
    js = "global.window={};const C=require(process.argv[1]);console.log(JSON.stringify(Object.fromEntries(C.map(c=>[c.id,c.n]))))"
    out = subprocess.run(['node', '-e', js, f], capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def main():
    N_EST = contar_estrellas()
    o = Orquesta(TOTAL)
    tiempos = {'bpm': BPM, 'compas': BAR, 'total': round(TOTAL, 3), 'secciones': [], 'estrellas': {}, 'destellos': {}}
    # tono real de cada timbal (modo principal, medido con su espectro: parciales 1 : 1.5 : 2)
    timb = {1: 41.5, 2: 46.8, 3: 49.5, 4: 52.4, 5: 54.6}
    def timbal(t, nota, fuerte=3, gan=0.6):
        k = min(timb, key=lambda j: abs(timb[j] - nota))
        rr = 1 + int(t * 7) % 2
        for v in (fuerte, 3, 1):  # no todos los timbales tienen todas las intensidades
            f = f'Percussion/Timpani/Timpani{k}_Hit_v{v}_rr{rr}_Sum.wav'
            if os.path.exists(os.path.join(RAIZ, f)): break
        o.perc(f, t, gan, nota - timb[k], 0.0, nombre='timbal')
    def redoble(t1, nota, dur, gan=0.5):  # redoble que crece hasta t1
        k = min(timb, key=lambda j: abs(timb[j] - nota))
        o.perc(f'Percussion/Timpani/Rolls/Timpani{k}_Roll_v3_rr1_Sum.wav', t1 - dur, gan, nota - timb[k], 0.0,
               env=[(0, 0.05), (dur * 0.85, 1.0), (dur, 1.0), (dur + 0.4, 0.0), (99, 0)], nombre='timbal')

    def pad(sec, b0, vel=0.35, cuerdas=('violas', 'chelos', 'contrabajo'), alto=False, att=0.9, crec=None):
        for i, nom in enumerate(PROG[sec]):
            bajo, pcs = A[nom]; t = T(b0 + i); d = BAR + 0.15
            v = vel if crec is None else vel + (crec - vel) * i / max(1, len(PROG[sec]) - 1)
            if 'contrabajo' in cuerdas: o.nota('contrabajo', t, d, bajo, v, 0.8, att=att)
            if 'chelos' in cuerdas:
                for m in voz(pcs, 48, 60, 2): o.nota('chelos', t, d, m, v, 0.35, att=att)
                o.nota('chelos', t, d, bajo + 12, v, 0.4, att=att)
            if 'violas' in cuerdas:
                for m in voz(pcs, 57, 69, 2): o.nota('violas', t, d, m, v, 0.42, att=att)
            if alto or 'violines' in cuerdas:
                for m in voz(pcs, 66, 81, 2): o.nota('violines', t, d, m, v * 0.85, 0.9, att=att * 1.3)

    def melodia(inst, notas, b0, vel=0.6, gan=1.0, trans=0, legato=1.08, crec=None, att=None):
        tot = max(b + d for b, d, n in notas)
        for b, d, n in notas:
            v = vel if crec is None else vel + (crec - vel) * b / tot
            o.nota(inst, T(b0, b), d * BEAT * legato, n + trans, v, gan, att=att)

    def estrellas(sec, b0, n, gan=0.8, vel=0.5, lo=62, hi=86):
        """Arpa: una nota por estrella, en corcheas, siguiendo el acorde de cada compás."""
        ts = []
        for i in range(n):
            beat = (2 if n <= 25 else 1.5) + i * 0.5   # las constelaciones grandes empiezan medio tiempo antes
            t = T(b0, beat); ts.append(round(t, 3))
            bar = int(beat // 4); _, pcs = A[PROG[sec][min(bar, len(PROG[sec]) - 1)]]
            c = [m for m in range(lo, hi + 1) if m % 12 in pcs]
            ola = list(range(len(c))) + list(range(len(c) - 2, 0, -1))
            o.nota('arpa', t, 2.5, c[ola[i % len(ola)]], vel, gan, pan=-0.35 + 0.5 * (i % 2))
        tiempos['estrellas'][sec] = ts
        # destello: glockenspiel cuando la constelación se completa
        tf = ts[-1] + BEAT
        _, pcs = A[PROG[sec][min(int((ts[-1] - T(b0)) / BEAT // 4), len(PROG[sec]) - 1)]]
        top = [m for m in range(84, 97) if m % 12 in pcs][:2]
        for j, m in enumerate(top): o.nota('glock', tf + j * 0.12, 2, m, 0.5, 0.35)
        tiempos['destellos'][sec] = round(tf, 3)

    for sec, b0, b1 in SECC: tiempos['secciones'].append({'id': sec, 't0': round(T(b0), 3), 't1': round(T(b1), 3)})
    sb = {s: b0 for s, b0, b1 in SECC}
    ne = lambda s: N_EST.get(s, 20)

    # ---- INTRO: el cielo se enciende ----
    b = sb['intro']
    for i, nom in enumerate(PROG['intro']):
        bajo, pcs = A[nom]
        for m in voz(pcs, 69, 83, 2): o.nota('violines', T(b + i), BAR + 0.3, m, 0.2, 0.8, att=1.6)
        o.nota('chelos', T(b + i), BAR + 0.3, bajo + 12, 0.2, 0.4, att=1.6)
        c = voz(pcs, 62, 86, 6)
        for j in range(8):  # arpa en corcheas, ola suave
            if i == 0 and j < 2: continue
            o.nota('arpa', T(b + i, j * 0.5), 2.5, c[[0, 1, 2, 3, 4, 5, 4, 3][j] % len(c)], 0.35, 0.6)
    for t, m in [(T(0, 3), 93), (T(1, 2.5), 90), (T(2, 1), 95), (T(2, 3.5), 88), (T(3, 2), 93)]: o.nota('glock', t, 2, m, 0.4, 0.22)
    o.nota('flauta', T(2, 2), 2 * BEAT, 78, 0.3, 0.5, att=0.4); o.nota('flauta', T(3), BAR, 76, 0.3, 0.5, att=0.3)

    # ---- 1 FRIJOLITO: el tema, en la flauta ----
    b = sb['frijolito']
    pad('frijolito', b, 0.25, ('violas', 'chelos'), att=1.2)
    estrellas('frijolito', b, ne('frijolito'), 0.75, 0.45)
    melodia('flauta', TEMA, b, 0.5, 1.0)

    # ---- 2 PLANTAS: el clarinete juega, pizzicato ----
    b = sb['plantas']
    pad('plantas', b, 0.28, ('violas',), att=0.8)
    estrellas('plantas', b, ne('plantas'), 0.7, 0.45)
    melodia('clarinete', JUEGO, b, 0.55, 1.0)
    for i, nom in enumerate(PROG['plantas']):
        bajo, pcs = A[nom]
        for k in range(4):
            o.nota('pizz_vc', T(b + i, k), 0.6, bajo + (12 if k % 2 else 0) + (7 if k == 3 else 0), 0.55, 0.8)
            if k % 2:
                for m in voz(pcs, 62, 74, 3): o.nota('pizz_vln', T(b + i, k + 0.0), 0.4, m, 0.4, 0.4)
    melodia('fagot', frase([(4, 43), (4, 42), (4, 40), (4, 36), (4, 45), (4, 38)]), b, 0.35, 0.5, att=0.3)

    # ---- 3 OLIMPIADA: contar hacia arriba ----
    b = sb['olimpiada']
    pad('olimpiada', b, 0.3, ('violas', 'chelos', 'contrabajo'), att=0.5)
    estrellas('olimpiada', b, ne('olimpiada'), 0.7, 0.5)
    melodia('oboe', CUENTA, b, 0.55, 0.95, legato=0.9)
    for i, nom in enumerate(PROG['olimpiada']):
        bajo, pcs = A[nom]
        c = voz(pcs, 62, 79, 5)
        for k in range(8):
            o.nota('pizz_vln', T(b + i, k * 0.5), 0.35, c[[0, 2, 1, 3, 2, 4, 3, 1][k] % len(c)], 0.45 + 0.1 * (k % 2 == 0), 0.45)
        for m in voz(pcs, 60, 72, 2): o.nota('cornos', T(b + i), BAR, m, 0.25, 0.45, att=0.7)
    for i in (2, 3, 4, 5):  # la flauta se une en la segunda mitad, una octava arriba
        for bb, d, n in CUENTA:
            if i * 4 <= bb < (i + 1) * 4: o.nota('flauta', T(b, bb), d * BEAT * 0.9, n + 12 if n + 12 <= 93 else n, 0.35, 0.5)

    # ---- 4 HONGOS: misterio en lo grave ----
    b = sb['hongos']
    for i, nom in enumerate(PROG['hongos']):
        bajo, pcs = A[nom]
        o.nota('contrabajo', T(b + i), BAR + 0.3, bajo, 0.3, 0.7, att=1.5)
        for m in voz(pcs, 57, 71, 3): o.nota('violas', T(b + i), BAR + 0.3, m, 0.2, 0.45, att=1.5)
        for m in voz(pcs, 74, 86, 2): o.nota('violines', T(b + i), BAR + 0.3, m, 0.15, 0.6, att=2.0)
    estrellas('hongos', b, ne('hongos'), 0.55, 0.35, 66, 90)
    melodia('chelos', MISTERIO, b, 0.55, 0.6, att=0.15)
    melodia('clarinete', frase([(8, None), (2, 66), (2, 64), (4, 62), (4, 61), (4, None)]), b, 0.3, 0.45, att=0.4)

    # ---- 5 PREPA: determinación ----
    b = sb['prepa']
    pad('prepa', b, 0.35, ('violas', 'chelos', 'contrabajo'), att=0.4, crec=0.5)
    estrellas('prepa', b, ne('prepa'), 0.65, 0.5)
    melodia('violines', DECISION, b, 0.5, 0.9, crec=0.68, att=0.12)
    for i, nom in enumerate(PROG['prepa']):
        bajo, pcs = A[nom]
        for k in range(8): o.nota('pizz_vc', T(b + i, k * 0.5), 0.4, bajo + 12 + (7 if k % 4 == 2 else 0), 0.4 + 0.15 * (k % 2 == 0), 0.6)
        for m in voz(pcs, 57, 69, 2): o.nota('cornos', T(b + i), BAR + 0.1, m, 0.3 + 0.04 * i, 0.5, att=0.5)
        timbal(T(b + i), 50 if bajo % 12 in (2, 7, 11) else 45, 1 if i < 3 else 3, 0.45)

    # ---- 6 UNIVERSIDAD: expansión y crescendo ----
    b = sb['universidad']
    pad('universidad', b, 0.38, ('violas', 'chelos', 'contrabajo'), att=0.5, crec=0.6)
    estrellas('universidad', b, ne('universidad'), 0.65, 0.55)
    melodia('violines', VUELO, b, 0.55, 1.0, crec=0.85, att=0.1)
    for i, nom in enumerate(PROG['universidad']):
        bajo, pcs = A[nom]
        for m in voz(pcs, 60, 72, 2): o.nota('cornos', T(b + i), BAR + 0.1, m, 0.35 + 0.08 * i, 0.55, att=0.4)
        if i >= 2:
            for bb, d, n in VUELO:
                if i * 4 <= bb < (i + 1) * 4: o.nota('flauta', T(b, bb), d * BEAT, n, 0.4 + 0.05 * i, 0.5)
    redoble(T(b + 6), 45, BAR * 1.0, 0.55)
    o.perc('Percussion/susCymb1-cresc-Median_v1.wav', 0, 0.0, nombre='platillo')  # precarga
    x = leer(os.path.join(RAIZ, 'Percussion/susCymb1-cresc-Median_v1.wav')); env = np.abs(x).max(1)
    pico = np.argmax(np.convolve(env, np.ones(2000) / 2000, 'same')) / SR
    o.perc('Percussion/susCymb1-cresc-Median_v1.wav', T(b + 6) - pico, 0.5, pan=0.1, nombre='platillo')

    # ---- 7 FUNGI MATI: clímax, el tema con toda la orquesta ----
    b = sb['fungimati']
    pad('fungimati', b, 0.55, ('violas', 'chelos', 'contrabajo'), att=0.15)
    estrellas('fungimati', b, ne('fungimati'), 0.7, 0.65)
    melodia('violines', TEMA, b, 0.75, 1.0, trans=12, att=0.08)
    melodia('flauta', TEMA, b, 0.6, 0.6, trans=12)
    melodia('oboe', TEMA, b, 0.5, 0.4)
    # contracanto de cornos (notas largas del acorde)
    melodia('cornos', frase([(2, 66), (2, 69), (4, 69), (2, 66), (2, 71), (4, 71), (2, 64), (2, 67), (4, 64)]), b, 0.6, 0.7, att=0.2)
    o.perc('Percussion/susCymb1-hit_mp_rr1.wav', T(b), 0.55, pan=0.1, nombre='platillo')
    for i, nom in enumerate(PROG['fungimati']):
        bajo, _ = A[nom]
        timbal(T(b + i), 50 if bajo % 12 in (2, 7, 11) else 45, 4 if i == 0 else 3, 0.6)
        if i in (1, 3, 5): timbal(T(b + i, 3), 45 if bajo % 12 in (2, 7, 11) else 50, 1, 0.35)
    redoble(T(b + 6), 50, BAR * 0.7, 0.3)

    # ---- FINAL: todas juntas; el tema vuelve y se apaga ----
    b = sb['final']
    for i, nom in enumerate(PROG['final']):
        bajo, pcs = A[nom]; v = max(0.15, 0.5 - 0.05 * i); d = BAR + (6 if i == 8 else 0.2)
        if i == 8: break
        o.nota('contrabajo', T(b + i), d, bajo, v, 0.7, att=0.6)
        o.nota('chelos', T(b + i), d, bajo + 12, v, 0.5, att=0.6)
        for m in voz(pcs, 57, 69, 2): o.nota('violas', T(b + i), d, m, v, 0.5, att=0.8)
        for m in voz(pcs, 66, 79, 2): o.nota('violines', T(b + i), d, m, v * 0.8, 0.7, att=1.0)
        c = voz(pcs, 50, 86, 8)
        for j in range(4): o.nota('arpa', T(b + i, j), 3, c[(j * 2 + i) % len(c)], 0.35, 0.5)
    melodia('flauta', RECUERDO, b, 0.45, 0.95)
    # acorde final de Re que se queda: cuerdas, cornos, arpa en glissando, glock y triángulo
    tf = T(b + 7)
    for m, ins, g in [(38, 'contrabajo', 0.6), (50, 'chelos', 0.5), (57, 'chelos', 0.45), (62, 'violas', 0.45), (66, 'violas', 0.4), (69, 'violines', 0.35), (74, 'violines', 0.3), (62, 'cornos', 0.35), (66, 'cornos', 0.3)]:
        o.nota(ins, tf, BAR * 1.7, m, 0.3, g, att=1.0, rel=2.5, env=[(0, 1), (BAR, 0.8), (BAR * 1.7 + 2.5, 0)])
    for j, m in enumerate(voz([2, 6, 9], 50, 93, 14)): o.nota('arpa', tf + j * 0.09, 4, m, 0.4, 0.5)
    o.nota('glock', tf + 1.4, 3, 86, 0.4, 0.3); o.nota('glock', tf + 1.6, 3, 93, 0.4, 0.22)
    o.perc('Percussion/Triangle6-Hit_v1_rr1_Sum.wav', tf + 1.5, 0.2, pan=0.4, nombre='platillo')

    # ---- mezcla: (seco, envío a la sala) ----
    envios = {'violines': (0.8, 0.45), 'violas': (0.8, 0.45), 'chelos': (0.85, 0.4), 'contrabajo': (0.85, 0.35),
              'pizz_vln': (0.85, 0.35), 'pizz_vc': (0.85, 0.3), 'arpa': (0.75, 0.5), 'flauta': (0.85, 0.45),
              'oboe': (0.85, 0.4), 'clarinete': (0.85, 0.4), 'fagot': (0.8, 0.4), 'cornos': (0.6, 0.6),
              'glock': (0.6, 0.6), 'timbal': (0.7, 0.5), 'platillo': (0.6, 0.6)}
    salida = os.path.join(VIDEO, 'musica.wav')
    mix = mezclar(o, envios, salida)
    with open(os.path.join(VIDEO, 'tiempos.js'), 'w', encoding='utf8') as f:
        f.write('// Lo escribe musica/partitura.py: cuándo aparece cada estrella (una nota del arpa cada una).\n')
        f.write('window.TIEMPOS = ' + json.dumps(tiempos, ensure_ascii=False) + ';\n')
    # niveles por sección e instrumento (dB RMS), para revisar el balance sin oírlo
    if '--niveles' in sys.argv:
        ks = sorted(o.bus)
        print('sección      ' + ' '.join(f'{k[:6]:>6s}' for k in ks))
        for sec, b0, b1 in SECC:
            i0, i1 = int(T(b0) * SR), int(T(b1) * SR)
            fila = []
            for k in ks:
                r = np.sqrt((o.bus[k][i0:i1] ** 2).mean()) + 1e-9
                fila.append(f'{20*np.log10(r):6.0f}' if r > 1e-4 else '     .')
            print(f'{sec:12s} ' + ' '.join(fila))
    print(f'listo: {salida} · {TOTAL:.2f} s · timbales {dict((k, round(v,1)) for k,v in timb.items())}')

if __name__ == '__main__':
    main()
