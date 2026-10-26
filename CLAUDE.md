# Shots de La Creación del Robert

Lee primero `ESTADO.md` (qué está hecho y qué sigue).

Videos verticales 1080×1920 de divulgación científica en español de México. El usuario no programa: respuestas en español, breves y sin jerga.

## Reglas de contenido
- Cada shot es un tema nuevo. Revisar y actualizar `historial/temas.json`; nunca repetir un tema ni uno casi igual.
- Cada shot se produce en dos versiones del mismo tema: narrada (voz clonada en ElevenLabs, Voice ID `uiCk6APPfsjnw3oUQzVo`) y sin voz (música + subtítulos + gags).
- Rigor: cada dato con fuente publicada, listada en el guion. Si algo es hipótesis, decirlo como hipótesis. Especies en cursiva. Ilustrar bien la morfología real (ej. esporas de *Ophiocordyceps* alargadas, no redondas).
- Estilo y reglas detalladas: `referencias/*/CLAUDE.md`, `referencias/Paquete Shot Lab/PLANTILLA Shot Sin Voz.md` y `referencias/KIT MAESTRO Shots Micologicos/GUIA_SHOT.md`. Prohibidos los avatares 01 y 09 salvo tema de sabor.
- Subtítulos siempre fuera del tercio inferior.

## Ritmo, duración y color (decidido 25 oct 2026 — manda sobre las guías de `referencias/`)
Basado en el análisis de `referencias-externas/ANALISIS.md`. Si una guía vieja dice otra cosa (p. ej. "algo nuevo cada 1–1.5 s" o "≤ 60 s"), gana esta sección.

**Versión narrada**
- Duración total **exacta de 60.0 s** (decisión de Robert, para monetizar). Voz de ~56–57 s (≈155–165 palabras a ~170 palabras/min) y la tarjeta de cierre completa hasta 60.0 s. Verificar la duración final con ffprobe. Avisar el costo de ElevenLabs antes de generar.
- La voz arranca en el segundo 0: sin logo, saludo ni intro. Primera frase = mito volteado o dato increíble, hablándole a "tú".
- Algo nuevo en pantalla cada ~3 s, atado a la frase que dice la voz (usar los tiempos de `nat`). Frases cortas de 2–3 s.
- Preferir una escena continua que viaja (cámara que acerca, de lo grande a lo microscópico) sobre muchos cortes. Cambios de escena con movimiento de cámara o fundido, nunca corte seco.
- Puede haber momentos quietos mientras la voz avanza, máximo ~6 s.
- Re-gancho cada ~30 s ("pero lo increíble viene después", una pregunta).
- Cierre que regresa al gancho del inicio + frase de marca. Tarjeta de cierre de 1–2 s como máximo.

**Versión sin voz**
- Duración total **exacta de 60.0 s**, pensada como loop: el final conecta con el inicio o trae un giro que invite a verlo otra vez.
- Algo nuevo cada 1.5–3 s sobre un golpe de música; nada estático más de 4 s.
- Cuando el tema lo permita, la música o los efectos salen de los datos (ritmos, conteos, tamaños).

**Ambas**
- Colores: se mantienen los fondos brillantes y saturados de la marca (rosa, amarillo, menta, cian…). Solo las escenas microscópicas o internas (dentro de una célula, un tejido, el suelo) usan fondo oscuro (`#0E0F12` o azul noche) con los colores de la marca como acento.
- Poco texto: un título o número grande, etiquetas chicas (nombre común + *científico*) y una línea de subtítulo con una palabra resaltada.
- Capítulos numerados pequeños bajo el logo y medidores reales (µm, días, conteos) cuando ayuden.
- Stickers: como reacción en la esquina, sobre todo en los re-ganchos.
- Descripción del video: guion completo + fuentes + "el dibujo es esquemático" cuando aplique.

## Notas técnicas (aprendidas a la mala)
- Motor: `animations-v3.jsx` + `support.js` de Claude Design. Un shot es un `.dc.html` con `window.OM_SCENES` y un `.jsx` que dibuja todo desde `T`.
- El `.jsx` corre dentro de `new Function`: hay que terminarlo con `window.MiApp = MiApp;` o el componente no aparece.
- `support.js` carga React y Babel desde unpkg.com, que está bloqueado en estos entornos. `motor/render.mjs` y `motor/preview.mjs` interceptan esas URLs y sirven los paquetes locales. Babel debe ser exactamente 7.29.0 (support.js verifica el hash de integridad).
- Chromium headless no decodifica H.264: no usar `<video>` dentro del shot; los videos de cierre se pegan con ffmpeg (`--outro`).
- Usar siempre `motor/preview.mjs` para revisar cuadros antes de renderizar el MP4 completo (~4 s de render por segundo de video en la nube; ~30 s en la computadora de Robert).
- En la computadora de Robert: correr el motor con `NAVEGADOR=chrome` y con ffmpeg 9 primero en el PATH (ver `ESTADO.md`).
- No guardar claves en el repositorio. La clave de Claude para el sistema automático se llama `CLAUDE_API_KEY` (no `ANTHROPIC_API_KEY`, para no interferir con Claude Code).
