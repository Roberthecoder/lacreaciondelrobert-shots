# Shots de La Creación del Robert

Lee primero `ESTADO.md` (qué está hecho y qué sigue).

Videos verticales 1080×1920 de divulgación científica en español de México. El usuario no programa: respuestas en español, breves y sin jerga.

## Reglas de contenido
- Cada shot es un tema nuevo. Revisar y actualizar `historial/temas.json`; nunca repetir un tema ni uno casi igual.
- Cada shot se produce en dos versiones del mismo tema: narrada (voz clonada en ElevenLabs, Voice ID `uiCk6APPfsjnw3oUQzVo`) y sin voz (música + subtítulos + gags).
- Rigor: cada dato con fuente publicada, listada en el guion. Si algo es hipótesis, decirlo como hipótesis. Especies en cursiva. Ilustrar bien la morfología real (ej. esporas de *Ophiocordyceps* alargadas, no redondas).
- Estilo y reglas detalladas: `referencias/*/CLAUDE.md`, `referencias/Paquete Shot Lab/PLANTILLA Shot Sin Voz.md` y `referencias/KIT MAESTRO Shots Micologicos/GUIA_SHOT.md`. Prohibidos los avatares 01 y 09 salvo tema de sabor.
- Gancho visual en el primer segundo, algo nuevo cada 1–1.5 s, nada estático más de 4 s, subtítulos fuera del tercio inferior.

## Notas técnicas (aprendidas a la mala)
- Motor: `animations-v3.jsx` + `support.js` de Claude Design. Un shot es un `.dc.html` con `window.OM_SCENES` y un `.jsx` que dibuja todo desde `T`.
- El `.jsx` corre dentro de `new Function`: hay que terminarlo con `window.MiApp = MiApp;` o el componente no aparece.
- `support.js` carga React y Babel desde unpkg.com, que está bloqueado en estos entornos. `motor/render.mjs` y `motor/preview.mjs` interceptan esas URLs y sirven los paquetes locales. Babel debe ser exactamente 7.29.0 (support.js verifica el hash de integridad).
- Chromium headless no decodifica H.264: no usar `<video>` dentro del shot; los videos de cierre se pegan con ffmpeg (`--outro`).
- Usar siempre `motor/preview.mjs` para revisar cuadros antes de renderizar el MP4 completo (~4 s de render por segundo de video).
- No guardar claves en el repositorio. La clave de Claude para el sistema automático se llama `CLAUDE_API_KEY` (no `ANTHROPIC_API_KEY`, para no interferir con Claude Code).
