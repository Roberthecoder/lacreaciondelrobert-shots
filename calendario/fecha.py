#!/usr/bin/env python3
"""Calendario de publicación: 1 SHOT DIARIO (decisión de Robert, 30 oct 2026; antes eran 3 al día).

- Arranca el 30 oct 2026. Cada día sale UN shot, rotando las series en este orden:
  Fungi Mati → Biotecnológico → Ambiental → Científico → Químico → IA (cada serie sale cada 6 días, en orden de número).
- Los Shots Festivos salen el día de su festividad (calendario/especiales.json, campo «fecha») y ocupan ese día: ese día no sale
  shot normal y la rotación sigue al día siguiente. (Excepción: Día de Muertos 2026 tiene 2 festivos el 1 y el 2 de nov.)
- Las series normales se numeran seguidas, sin huecos ni reservas. Científico #01 es la carpeta 003-semillas-luna.
Uso:
  python3 calendario/fecha.py "Fungi Mati" 23      -> fecha del Fungi Mati #23
  python3 calendario/fecha.py Festivo 3            -> fecha del Shot Festivo #03
  python3 calendario/fecha.py fecha 2026-12-25     -> qué sale ese día
  python3 calendario/fecha.py lista [dias]         -> calendario de los próximos [30] días (fecha · clave)
  python3 calendario/fecha.py json                 -> calendario completo en JSON {fecha: [claves]} (para la Sala)
  python3 calendario/fecha.py festivos [dias]      -> festividades de los próximos [60] días y si ya tienen festivo hecho
"""
import datetime as dt, json, os, re, sys, glob
INICIO = dt.date(2026, 10, 30)
ORDEN = ['Fungi Mati', 'Biotecnológico', 'Ambiental', 'Científico', 'Químico', 'IA']
PREFIJO = {'Fungi Mati': 'fun', 'Biotecnológico': 'bio', 'Ambiental': 'amb', 'Científico': 'cie', 'Químico': 'qui', 'IA': 'ia',
           'Festivo': 'fes', 'Robert': 'robert'}
ESPECIALES = {('Científico', 1): '003-semillas-luna'}
BASE = os.path.dirname(os.path.abspath(__file__))

def _json(nombre):
    return json.load(open(os.path.join(BASE, nombre), encoding='utf-8'))

def hechos():
    """Festivos ya hechos (calendario/especiales.json)."""
    return _json('especiales.json')['festivos']

def carpetas():
    """{(serie, n): clave} de los shots normales que existen en shots/."""
    out = dict((k, v) for k, v in ESPECIALES.items())
    inv = {v: k for k, v in PREFIJO.items()}
    for d in glob.glob(os.path.join(BASE, '..', 'shots', '*', 'narracion.json')):
        clave = os.path.basename(os.path.dirname(d))
        m = re.match(r'^(fun|bio|amb|cie|qui|ia)-(\d+)-', clave)
        if m: out[(inv[m[1]], int(m[2]))] = clave
    return out

def calendario(dias=800):
    """Lista de (fecha, [(serie, n, clave)]) día por día desde INICIO. Los shots normales que aún no existen se marcan con clave None."""
    fes = {}
    for f in hechos(): fes.setdefault(f['fecha'], []).append(('Festivo', f['numero'], f['clave']))
    cars = carpetas(); cnt = {s: 1 for s in ORDEN}; k = 0; out = []
    for i in range(dias):
        d = INICIO + dt.timedelta(days=i)
        if d.isoformat() in fes:
            out.append((d, sorted(fes[d.isoformat()], key=lambda x: x[1]))); continue
        s = ORDEN[k % 6]; k += 1; n = cnt[s]; cnt[s] += 1
        out.append((d, [(s, n, cars.get((s, n)))]))
    return out

def fecha(serie, n):
    if serie == 'Festivo':
        for f in hechos():
            if f['numero'] == n: return dt.date.fromisoformat(f['fecha'])
        raise SystemExit(f'El Shot Festivo #{n:02d} todavía no existe (ver calendario/especiales.json).')
    for d, xs in calendario(3000):
        if any(x[0] == serie and x[1] == n for x in xs): return d

def que_sale(d):
    for dd, xs in calendario((d - INICIO).days + 1):
        if dd == d: return xs
    return []

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
    elif a[0] == 'lista':
        hoy = max(dt.date.today(), INICIO); fin = hoy + dt.timedelta(days=int(a[1]) if len(a) > 1 else 30)
        for d, xs in calendario():
            if hoy <= d <= fin: print(d.isoformat(), ' + '.join(x[2] or f'{x[0]} #{x[1]:02d} (falta hacerlo)' for x in xs))
    elif a[0] == 'json':
        print(json.dumps({d.isoformat(): [x[2] for x in xs if x[2]] for d, xs in calendario() if any(x[2] for x in xs)}, ensure_ascii=False))
    else: print(fecha(a[0], int(a[1])).isoformat())
