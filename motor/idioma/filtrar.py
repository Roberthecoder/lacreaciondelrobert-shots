#!/usr/bin/env python3
"""filtrar.py textos.json para_traducir.json — deja solo los textos que se ven (quita las palabras sueltas en que el
subtítulo se parte, los títulos del reproductor y los nombres de componentes)."""
import json, sys
t = json.load(open(sys.argv[1]))
RUIDO = {'Play/pause (space)', 'Return to start (0)', 'Export video'}
out = {}
for k, donde in t.items():
    if k in RUIDO or any(d.endswith('.title') for d in donde): continue
    if all(d == 'span>texto' for d in donde): continue      # palabras del Subtitulo partido (se traduce la frase entera)
    out[k] = sorted(set(donde))
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
print(f'{len(out)} textos para traducir')
