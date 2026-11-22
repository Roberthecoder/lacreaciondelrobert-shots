# Motor del video largo (horizontal 16:9)

Documental animado a partir de `../guion_final.md`. Todo se dibuja en función del tiempo, como los shots.

| Archivo | Qué hace |
|---|---|
| `escenas.js` | El guion escena por escena: capítulos → frases (texto idéntico al guion) → visual (`foto`, `fotos`, `texto`, `numero`, `logo`, `marca`, `iconos`, `ilus`) y apariciones de Robert (`robert: [pose, lado]`). Una frase sin `v` continúa el visual anterior. |
| `doc-largo.jsx` | El motor: línea de tiempo, tipos de escena, subtítulos, marca de capítulo, stickers, precarga de fotos. |
| `ilustraciones*.jsx` | Dibujos para lo que no tiene foto (`ILUS`) e íconos (`ICONOS`). |
| `preparar_fotos.py` | Copia las fotos de `../fuentes/` a `img/` (giradas y a máx. 2000 px) y escribe `fotos.js`. Correr después de agregar fotos. |
| `validar.mjs` | Revisa que `escenas.js` narre exactamente el guion y que existan las fotos e ilustraciones. Correr después de cada cambio. |

## Comandos (desde `motor/`, con ffmpeg 9 primero en el PATH)
- Revisar cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/000-que-es-la-creacion "Largo 00.dc.html" hoja.png 10,60,120 --horizontal`
- Render completo (por tramos, se puede retomar si se interrumpe): `node render_largo.mjs [--audio voz.mp3]` desde esta carpeta. Un tramo suelto: `node render.mjs … --horizontal --desde 300 --hasta 450` desde `motor/`. (~3–4 s de render por segundo de video en la computadora de Robert.)

## Tiempos
- Sin voz, cada frase dura `caracteres / 15 + 0.45 s` (estimado). Con la voz real, poner `window.TIEMPOS_VOZ = [dur1, dur2, …]` (una duración por frase, en orden) antes de `escenas.js` y el video se ajusta solo.
- El motor de animación acepta escenas de máx. 300 s: `doc-largo.jsx` parte el largo en tramos y el tiempo sigue siendo continuo.

## Pendientes
- Voz: ~18,800 caracteres de ElevenLabs (Robert la paga después de ver la animación).
- Confirmar con Robert la línea de VANDA 2020 (el certificado dice "Round 1 Silver Award").
