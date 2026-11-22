# Plantilla de documental / pitch horizontal (copia de seguridad)

Copia exacta (1 nov 2026) del motor que hizo el Core video #00 y el pitch de MIT Solve. Estos archivos NO los usa ningún workflow
desde aquí: son la referencia para arrancar un documental nuevo sin depender de que existan las ramas originales.

| Carpeta | Origen |
|---|---|
| `video/cine-kit.jsx`, `doc-largo.jsx`, `cine-hongos.jsx`, `cine-pitch.jsx`, `escenas.js`, `musica.mjs`, `tiempos.mjs` | `largo-render/pitch-solve` @ 1d56a1f, `largos/pitch-solve/video/` |
| `video/render_largo.mjs`, `preparar_fotos.py`, `texturas.py`, `validar.mjs`, `LEEME-core00.md` | `largo-render/largo00-cine` @ cc09317, `largos/000-que-es-la-creacion/video/` |
| `voz/voz.mjs`, `youtube/*` | pitch-solve |
| `workflows/pitch-*.yml` (4K, voz, YouTube, revisar cuadros), `workflows/core00-render-largo.yml` (24 fps, pedazos de 20 s) | las dos ramas, `.github/workflows/` |
| `motor/render-con-escala-desde-gpu.mjs`, `motor/preview-largo.mjs` | `motor/` de pitch-solve (main aún no tiene `--escala/--desde/--gpu`) |
| `ejemplo-pitch/` | guion, storyboard, verificación y créditos del pitch |

## Arrancar un documental nuevo
1. Rama nueva `largo-render/<nombre>` (huérfana como las otras, o desde main) con: `motor/` de main + `motor/render.mjs` reemplazado
   por `motor/render-con-escala-desde-gpu.mjs` (o ya portado), `largos/<nombre>/video/` con estos archivos, `animations-v3.jsx`,
   `support.js`, `kit-robert.jsx` y `logo_color.svg` copiados de un shot, y un `.dc.html` con `window.K_ANCHO = 1920; window.K_ALTO = 1080`
   (copiar `Pitch Solve.dc.html` o `Largo 00.dc.html` de su rama).
2. `python texturas.py` (una vez) → `video/tex/`. Fotos en `../fuentes/…` → `python preparar_fotos.py`.
3. Guion → `escenas.js` → `node validar.mjs` → preview → `.github/workflows/render-largo.yml` con `LARGO` y `HTML` de la carpeta nueva.
4. Voz y música como en `maestro/recetas/pitch-convocatoria.md` §4.
Las ilustraciones son específicas de cada video (`cine-cap*.jsx` / `cine-pitch.jsx`): úsalas como ejemplo de estilo.
