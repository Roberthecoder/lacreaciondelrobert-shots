# Estado del proyecto (para continuar en otra sesión)

Última actualización: 26 oct 2026. Esta sesión empezó en la nube (Claude Code web) y continúa en la computadora del usuario.

## Ya funciona
- **Render**: `motor/render.mjs` convierte un shot (`.dc.html` + `.jsx` del motor de Claude Design) a MP4 1080×1920 con audio. `motor/preview.mjs` saca una hoja de contactos para revisar cuadros.
- **Primer shot**: `shots/001-hormiga-zombi` (Ophiocordyceps), en dos versiones:
  - Sin voz: música + efectos generados por `gen-audio.mjs`. 49 s.
  - Narrada: `motor/narrar.mjs` pide TODO el guion (`narracion.json`) en una sola petición a ElevenLabs con **Eleven v4** (`eleven_v4`), voz "Robert Narrador" (`uiCk6APPfsjnw3oUQzVo`), usando los ajustes guardados en la voz. El video se adapta a la voz (campo `nat` del motor) y los subtítulos siguen los tiempos por carácter. 56 s. **El usuario la aprobó ("te quedó excelente").** La voz está en caché en `shots/001-hormiga-zombi/voz/` (no regenerar: gasta créditos).
- **GitHub Actions**: `.github/workflows/renderizar.yml` (Actions → Renderizar shot → Run workflow) renderiza narrada, sin voz o ambas, y deja el MP4 en Artifacts. Secrets ya configurados: `ELEVENLABS_API_KEY`, `CLAUDE_API_KEY`.

## Lecciones (no repetir errores)
- Nunca generar la voz frase por frase ni meter pausas a mano: suena antinatural. Una sola petición, sin "…".
- No tocar voice_settings: usar los guardados en la voz.
- Plan Starter de ElevenLabs: solo `mp3_44100_128` (192 kbps da 403).
- Claude no puede escuchar audio: el usuario es la prueba final. Pendiente: verificación con voz a texto (requiere permiso "De voz a texto" en la clave de ElevenLabs).

## Pendiente (en orden)
1. **Estilo**: el usuario quiere estudiar canales de animación con IA que están funcionando muy bien y fusionar su receta (ritmo, gancho, texto, transiciones) con su marca (stickers, logo, voz). Falta que mande enlaces y 3–5 MP4 de esos canales. Extraer principios; no copiar personajes ni diseños.
2. **Generador diario**: Claude API (`CLAUDE_API_KEY`) elige tema nuevo (`historial/temas.json`), escribe guion con fuentes, verifica datos, escribe el jsx, revisa capturas, narra, renderiza las dos versiones.
3. **Aprobación por Telegram**: bot con botones Publicar / Rehacer / Descartar (receptor gratis en Cloudflare Workers → repository_dispatch).
4. **Publicación**: opción recomendada combinada, pendiente de que el usuario elija:
   - Instagram + Facebook por API oficial (cuenta Creator/Business ligada a página de Facebook).
   - YouTube + TikTok por API cuando aprueben sus auditorías; mientras tanto, desde una máquina fija del usuario con sesión iniciada (script de subida estable, Claude solo como respaldo). Avisado de los riesgos (términos de uso, captchas, seguridad).
5. Cierre del video: se usa una tarjeta HTML con @lacreaciondelrobert (el `cierre.mp4` viejo dice "Shots biotecnológicos, cada miércoles").
6. Número de serie en la marca de agua: quedó `#01`; confirmar con el usuario.

## Instalar en una computadora nueva
1. Instalar Node.js 22 o más nuevo, Git y ffmpeg.
2. `git clone https://github.com/Roberthecoder/lacreaciondelrobert-shots`
3. `cd lacreaciondelrobert-shots/motor && npm install && npx playwright install chromium`
4. Probar: `node render.mjs ../shots/001-hormiga-zombi "Shot Hormiga Zombi.dc.html" prueba.mp4 --hasta 5`
