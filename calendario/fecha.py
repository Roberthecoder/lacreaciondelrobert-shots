#!/usr/bin/env python3
"""Número de shot <-> fecha de publicación (reglas de Robert, 28 oct 2026).

Series normales: numeración seguida, sin huecos y SIN números reservados. El #N de cada serie se publica en una fecha fija:
- Grupo A (Fungi Mati, Biotecnológico, Ambiental): #01 el 1 nov 2026 y luego cada 2 días.
- Grupo B (Científico, Químico, IA): #01 el 2 nov 2026 y luego cada 2 días.
Serie Shot Festivo: numeración propia (#01, #02…) en orden de publicación; cada festivo sale el día de su festividad
(lista de festivos hechos en calendario/especiales.json; ideas y fechas en calendario/festividades.json).
Uso:
  python3 calendario/fecha.py "Fungi Mati" 23      -> fecha del Fungi Mati #23
  python3 calendario/fecha.py Festivo 3            -> fecha del Shot Festivo #03 (la de su festividad)
  python3 calendario/fecha.py fecha 2026-12-25     -> qué series, números y festivos salen ese día
  python3 calendario/fecha.py festivos [dias]      -> festividades de los próximos [60] días y si ya tienen festivo hecho
"""
import datetime as dt, json, os, sys
INICIO = dt.date(2026, 11, 1)
GRUPO = {'Fungi Mati': 0, 'Biotecnológico': 0, 'Ambiental': 0, 'Científico': 1, 'Químico': 1, 'IA': 1}
PREFIJO = {'Fungi Mati': 'fun', 'Biotecnológico': 'bio', 'Ambiental': 'amb', 'Científico': 'cie', 'Químico': 'qui', 'IA': 'ia',
           'Festivo': 'fes', 'Robert': 'robert'}
BASE = os.path.dirname(os.path.abspath(__file__))

def _json(nombre):
    return json.load(open(os.path.join(BASE, nombre), encoding='utf-8'))

def hechos():
    """Festivos ya hechos (calendario/especiales.json)."""
    return _json('especiales.json')['festivos']

def fecha(serie, n):
    if serie == 'Festivo':
        for f in hechos():
            if f['numero'] == n: return dt.date.fromisoformat(f['fecha'])
        raise SystemExit(f'El Shot Festivo #{n:02d} todavía no existe (ver calendario/especiales.json).')
    return INICIO + dt.timedelta(days=GRUPO[serie] + 2 * (n - 1))

def que_sale(d):
    off = (d - INICIO).days
    out = [] if off < 0 else [(s, off // 2 + 1) for s, gg in GRUPO.items() if gg == off % 2]
    return out + [('Festivo', f['numero']) for f in hechos() if f['fecha'] == d.isoformat()]

def festivos(dias=60, desde=None):
    """Festividades entre hoy (o 'desde') y 'dias' después, con los festivos ya hechos para cada una."""
    hoy = desde or max(dt.date.today(), INICIO)
    fin = hoy + dt.timedelta(days=dias)
    hh = hechos()
    out = []
    for f in _json('festividades.json')['festividades']:
        for anio in (hoy.year, hoy.year + 1):
            fechas = [dt.date(anio, int(md[:2]), int(md[3:])) for md in f['fechas']]
            if any(hoy <= d <= fin for d in fechas):
                d0 = min(d for d in fechas if d >= hoy)
                ya = [h for h in hh if h['festividad'] == f['nombre'] and h['fecha'][:4] == str(d0.year)]
                out.append({'fecha': d0.isoformat(), 'festividad': f['nombre'], 'hechos': ya, 'ideas': f.get('ideas', [])})
                break
    return sorted(out, key=lambda x: x['fecha'])

def siguiente_festivo():
    return max([h['numero'] for h in hechos()] + [0]) + 1

if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__)
    elif a[0] == 'fecha': print(que_sale(dt.date.fromisoformat(a[1])))
    elif a[0] == 'festivos':
        for e in festivos(int(a[1]) if len(a) > 1 else 60):
            h = ', '.join(f"#{x['numero']:02d} {x['serie_vinculada']}" for x in e['hechos']) or 'SIN FESTIVO: hacerlo primero'
            print(e['fecha'], e['festividad'].ljust(40), h)
        print(f'Siguiente número libre de Shot Festivo: #{siguiente_festivo():02d}')
    else: print(fecha(a[0], int(a[1])).isoformat())
