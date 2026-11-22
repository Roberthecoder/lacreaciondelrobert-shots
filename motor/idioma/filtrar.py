#!/usr/bin/env python3
"""filtrar.py textos.json para_traducir.json — deja solo los textos que se ven (quita las palabras sueltas en que el
subtítulo se parte, los títulos del reproductor y los nombres de componentes)."""
import json, sys
t = json.load(open(sys.argv[1]))
RUIDO = {'Play/pause (space)', 'Return to start (0)', 'Export video'}
# palabras en que el Subtitulo parte su frase (se traduce la frase entera, no cada palabra)
pal = set()
for k, donde in t.items():
    if 'Subtitulo.texto' in donde or any('[].t' in d for d in donde):
        pal |= {w.replace('*', '').replace('_', '') for w in k.split(' ')}
out = {}
for k, donde in t.items():
    if k in RUIDO or any(d.endswith('.title') for d in donde): continue
    if all(d == 'span>texto' for d in donde) and k in pal: continue
    out[k] = sorted(set(donde))
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print(f'{len(out)} textos para traducir')
