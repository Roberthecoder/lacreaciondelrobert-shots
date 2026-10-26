# La Creación del Robert · Shots automáticos

Sistema para producir un shot diario de divulgación científica (ciencia general, micología, biotecnología, laboratorio, humor científico) en dos versiones (narrada con voz clonada y sin voz) y publicarlo en YouTube Shorts, Instagram, Facebook y TikTok, con una sola aprobación por Telegram.

## Cómo funciona el día a día

1. Una tarea programada de Claude Code (con la suscripción de Robert, sin API de pago) abre este repositorio y sigue `AUTONOMO.md`: elige un tema nuevo, investiga con fuentes, escribe e ilustra las dos versiones, revisa los cuadros y abre un PR desde una rama `shot/NNN-tema`. No genera voz.
2. GitHub Actions (`shot-diario.yml`) renderiza la versión sin voz, saca una hoja de cuadros de la narrada y manda a Telegram el guion resumido con los botones Aprobar, Rehacer y Descartar.
3. Robert toca un botón. El worker de `telegram/` se lo pasa a GitHub.
4. Si aprobó, `aprobado.yml` integra el PR, genera la voz en ElevenLabs (único paso con costo), renderiza la narrada y deja los dos MP4 en un Release `shot-NNN` para descargarlos desde el celular. Si pidió rehacer, la tarea diaria siguiente corrige ese mismo PR. Si descartó, el PR se cierra y el tema no se repite.
5. Publicación en redes: por ahora asistida (ver `ESTADO.md`).

## Estado

| Pieza | Estado |
|---|---|
| Renderizador a MP4 (`motor/render.mjs`) | Funciona |
| Vista previa en hoja de contactos (`motor/preview.mjs`) | Funciona |
| Shot 001 (hormiga zombi), narrada y sin voz | Narrada aprobada |
| Shot 002 (moho del pan), narrada y sin voz | Construido, voz en caché, falta aprobación |
| Procedimiento de la tarea diaria (`AUTONOMO.md`) | Escrito, falta crear la tarea programada |
| Vista previa y aviso por Telegram (`shot-diario.yml`) | Escrito, falta probar |
| Aprobación, voz, Release (`aprobado.yml`) | Escrito, falta probar |
| Worker de Telegram (`telegram/`) | Escrito, falta desplegar (ver `telegram/LEEME.md`) |
| Publicación en redes | Pendiente |

## Carpetas

- `AUTONOMO.md`: la instrucción completa que sigue la tarea diaria.
- `motor/`: herramientas que convierten un shot en video (`render.mjs`, `preview.mjs`, `narrar.mjs`), más `ficha.mjs` (lee los datos de un shot) y `avisar.mjs` (manda mensajes a Telegram). `motor/kit/` es el kit de piezas reutilizables.
- `shots/NNN-tema/`: cada shot. Lleva sus `.dc.html`, sus `.jsx`, el motor `animations-v3.jsx`, los recursos, `gen-audio.mjs` (música y efectos sintetizados), `narracion.json` (guion y nombres de archivo) y `guion.md` (guion, fuentes y descripción para publicar).
- `historial/temas.json`: temas ya hechos, propuestos o descartados. El sistema nunca repite uno.
- `telegram/`: el worker de Cloudflare que conecta los botones de Telegram con GitHub, y su guía de instalación.
- `referencias/`: los kits originales de Claude Design (Biotec, Lab y Micológico), sin los audios pesados. `referencias-externas/`: análisis de canales y recetario de formatos.
- `voz/`: la muestra con la que se clonó la voz del narrador.

## Renderizar un shot a mano

```bash
cd motor && npm install
node ../shots/002-moho-pan/gen-audio.mjs "Shot Moho Pan Ciclo.dc.html" assets/mezcla_ciclo.wav
node render.mjs ../shots/002-moho-pan "Shot Moho Pan Ciclo.dc.html" ../salida/moho-ciclo.mp4 --audio ../shots/002-moho-pan/assets/mezcla_ciclo.wav
```

Opciones de `render.mjs`:
- `--fps 30`: cuadros por segundo.
- `--audio archivo.wav`: pista de audio.
- `--outro cierre.mp4`: video que se pega al final.
- `--hasta 12`: renderiza solo los primeros 12 segundos.

Vista previa rápida, sin renderizar el video completo:

```bash
node preview.mjs ../shots/002-moho-pan "Shot Moho Pan Ciclo.dc.html" hoja.png 1,5,10,20,30,40 --cols 3
```

También se puede renderizar cualquier shot desde la pestaña Actions de GitHub con "Renderizar shot" (`renderizar.yml`).

## Claves (nunca se guardan en el repositorio)

| Clave | Dónde va |
|---|---|
| ElevenLabs | GitHub, Settings, Secrets and variables, Actions, `ELEVENLABS_API_KEY`. Voice ID: `uiCk6APPfsjnw3oUQzVo` |
| Claude API (solo respaldo) | Igual, como `CLAUDE_API_KEY` |
| Telegram | Igual, como `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` (cómo obtenerlos: `telegram/LEEME.md`). Los mismos dos, más `GITHUB_TOKEN` y `WEBHOOK_SECRET`, van como secretos del worker en Cloudflare |
| YouTube, Meta, TikTok | Se agregan igual cuando se configuren |
