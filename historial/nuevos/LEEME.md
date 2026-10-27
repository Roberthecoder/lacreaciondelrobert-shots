# Temas nuevos por sesión

Cada sesión anota aquí sus temas en un archivo propio: `historial/nuevos/<rama-con-guiones>.json` (p. ej. `lote-e-bio.json` para la rama `lotes/lote-e-bio`). Nunca se edita `historial/temas.json` a mano: después se corre `node historial/consolidar.mjs`.

Formato:

```json
{ "temas": [ { "id": "hongos-brillan", "titulo": "...", "serie": "Shot Fungi Mati", "numero": 5,
  "estado": "guion", "carpeta": "shots/fun-05-brillan", "rama": "lotes/lote-e", "fuentes": ["..."],
  "fecha": "2026-10-28", "derivados": ["...", "..."] } ] }
```

Estados: idea → guion → renderizado → aprobado → publicado.
