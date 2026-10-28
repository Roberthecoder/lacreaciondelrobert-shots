#!/usr/bin/env python3
"""Número de shot <-> fecha de publicación (regla de Robert, 28 oct 2026).

Numeración perfecta, sin saltos: el #N de cada serie se publica en una fecha fija.
- Grupo A (Fungi Mati, Biotecnológico, Ambiental): #01 el 1 nov 2026 y luego cada 2 días (días impares desde el inicio).
- Grupo B (Científico, Químico, IA): #01 el 2 nov 2026 y luego cada 2 días.
Uso:
  python3 calendario/fecha.py "Fungi Mati" 23      -> fecha del Fungi Mati #23
  python3 calendario/fecha.py fecha 2026-12-25     -> qué series y números salen ese día
  python3 calendario/fecha.py especiales [dias]    -> qué número le toca a cada festividad de festividades.json
"""
import datetime as dt, json, os, sys
INICIO = dt.date(2026, 11, 1)
GRUPO = {'Fungi Mati': 0, 'Biotecnológico': 0, 'Ambiental': 0, 'Científico': 1, 'Químico': 1, 'IA': 1}
PREFIJO = {'Fungi Mati': 'fun', 'Biotecnológico': 'bio', 'Ambiental': 'amb', 'Científico': 'cie', 'Químico': 'qui', 'IA': 'ia'}

def fecha(serie, n):
    return INICIO + dt.timedelta(days=GRUPO[serie] + 2 * (n - 1))

def que_sale(d):
    off = (d - INICIO).days
    if off < 0: return []
    g, k = off % 2, off // 2
    return [(s, k + 1) for s, gg in GRUPO.items() if gg == g]

def especiales(dias=400):
    base = os.path.dirname(os.path.abspath(__file__))
    fest = json.load(open(os.path.join(base, 'festividades.json'), encoding='utf-8'))['festividades']
    fin = INICIO + dt.timedelta(days=dias)
    out = []
    for f in fest:
        for anio in (2026, 2027, 2028):
            for md in f['fechas']:
                d = dt.date(anio, int(md[:2]), int(md[3:]))
                if INICIO <= d <= fin:
                    for s, n in que_sale(d):
                        out.append({'fecha': d.isoformat(), 'festividad': f['nombre'], 'serie': s, 'numero': n, 'clave': f"{PREFIJO[s]}-{n:02d}"})
    return sorted(out, key=lambda x: (x['fecha'], x['serie']))

if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__)
    elif a[0] == 'fecha': print(que_sale(dt.date.fromisoformat(a[1])))
    elif a[0] == 'especiales':
        for e in especiales(int(a[1]) if len(a) > 1 else 400): print(e['fecha'], e['clave'].ljust(7), e['serie'].ljust(15), e['festividad'])
    else: print(fecha(a[0], int(a[1])).isoformat())
