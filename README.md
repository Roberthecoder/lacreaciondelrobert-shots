# La Creación del Robert · Shots automáticos

Sistema para producir un shot diario de divulgación científica (ciencia general, micología, biotecnología, laboratorio, humor científico) y publicarlo en YouTube Shorts, Instagram, Facebook y TikTok, con una sola aprobación por Telegram.

## Estado

| Pieza | Estado |
|---|---|
| Renderizador a MP4 (`motor/render.mjs`) | ✅ Funciona |
| Vista previa en hoja de contactos (`motor/preview.mjs`) | ✅ Funciona |
| Primer shot nuevo, versión sin voz (`shots/001-hormiga-zombi`) | ✅ Hecho |
| Primer shot, versión narrada con voz clonada (Eleven v4) | ✅ Aprobada |
| Generador automático (Claude API escribe cada shot) | ⏳ Pendiente |
| Aprobación por Telegram | ⏳ Pendiente |
| Publicación en redes | ⏳ Pendiente |
| Ejecución diaria en GitHub Actions | ⏳ Pendiente |

## Carpetas

- `motor/`: herramientas que convierten un shot en video.
- `shots/NNN-tema/`: cada shot. Lleva su `.dc.html`, su `.jsx`, el motor `animations-v3.jsx`, los recursos y el generador de audio `gen-audio.mjs`.
- `historial/temas.json`: temas ya hechos. El sistema nunca repite uno.
- `referencias/`: los kits originales de Claude Design (Biotec, Lab y Micológico), sin los audios pesados.
- `voz/`: la muestra con la que se clonó la voz del narrador.

## Renderizar un shot a mano

```bash
cd motor && npm install
node ../shots/001-hormiga-zombi/gen-audio.mjs
node render.mjs ../shots/001-hormiga-zombi "Shot Hormiga Zombi.dc.html" ../salida/hormiga.mp4 --audio ../shots/001-hormiga-zombi/assets/mezcla.wav
```

Opciones de `render.mjs`:
- `--fps 30`: cuadros por segundo.
- `--audio archivo.wav`: pista de audio.
- `--outro cierre.mp4`: video que se pega al final.
- `--hasta 12`: renderiza solo los primeros 12 segundos.

Vista previa rápida, sin renderizar el video completo:

```bash
node preview.mjs ../shots/001-hormiga-zombi "Shot Hormiga Zombi.dc.html" hoja.png 1,5,10,20,30,40 --cols 3
```

## Claves (nunca se guardan en el repositorio)

| Clave | Dónde va |
|---|---|
| Claude API | GitHub → Settings → Secrets and variables → Actions → `CLAUDE_API_KEY` |
| ElevenLabs | Igual, como `ELEVENLABS_API_KEY`. Voice ID: `uiCk6APPfsjnw3oUQzVo` |
| Telegram, YouTube, Meta, TikTok | Se agregan igual cuando se configuren |
