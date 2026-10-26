# Estado del proyecto (para continuar en otra sesión)

Última actualización: 26 oct 2026 (rama `autonomia-diaria`: flujo autónomo con aprobación por Telegram). Esta sesión empezó en la nube (Claude Code web) y continúa en la computadora del usuario.

## Ya funciona
- **Render**: `motor/render.mjs` convierte un shot (`.dc.html` + `.jsx` del motor de Claude Design) a MP4 1080×1920 con audio. `motor/preview.mjs` saca una hoja de contactos para revisar cuadros.
- **Primer shot**: `shots/001-hormiga-zombi` (Ophiocordyceps), en dos versiones:
  - Sin voz: música + efectos generados por `gen-audio.mjs`. 49 s.
  - Narrada: `motor/narrar.mjs` pide TODO el guion (`narracion.json`) en una sola petición a ElevenLabs con **Eleven v4** (`eleven_v4`), voz "Robert Narrador" (`uiCk6APPfsjnw3oUQzVo`), usando los ajustes guardados en la voz. El video se adapta a la voz (campo `nat` del motor) y los subtítulos siguen los tiempos por carácter. 56 s. **El usuario la aprobó ("te quedó excelente").** La voz está en caché en `shots/001-hormiga-zombi/voz/` (no regenerar: gasta créditos).
- **GitHub Actions**: `.github/workflows/renderizar.yml` (Actions → Renderizar shot → Run workflow) renderiza narrada, sin voz o ambas, y deja el MP4 en Artifacts. Secrets ya configurados: `ELEVENLABS_API_KEY`, `CLAUDE_API_KEY`.
- **Shot 002** (`shots/002-moho-pan`, *Rhizopus stolonifer*): construido en dos versiones (narrada N1 "Por dentro" y muda M4 "Ciclo"); la voz ya está en caché en `shots/002-moho-pan/voz/`.

## Flujo autónomo diario (armado el 26 oct 2026, rama `autonomia-diaria`, pendiente de probar de punta a punta)
Decisión de Robert: la generación la hace una tarea programada de Claude Code con su suscripción (no la API de pago); GitHub Actions solo renderiza y avisa; Robert aprueba desde Telegram.
1. **Tarea diaria de Claude Code** (en la nube, con este repositorio adjunto): sigue `AUTONOMO.md` al pie de la letra. Elige tema y formato, investiga con fuentes, escribe las dos versiones, las construye con el kit, revisa cuadros con `preview.mjs`, actualiza `historial/temas.json`, sube la rama `shot/NNN-tema` y abre un PR. No genera voz.
2. **`shot-diario.yml`**: con cada PR de rama `shot/`, renderiza la versión sin voz, saca la hoja de cuadros de la narrada, las sube como artifact y manda a Telegram el guion resumido con botones Aprobar, Rehacer y Descartar (`motor/avisar.mjs`).
3. **`telegram/worker.js`** (Cloudflare Worker gratuito): recibe el botón, comprueba que el chat sea el de Robert y manda un `repository_dispatch` a GitHub. Si Robert responde con texto al mensaje del bot, el texto se anota como comentario en el PR. Instalación paso a paso en `telegram/LEEME.md`.
4. **`aprobado.yml`**: Aprobar hace el merge, genera la voz con `narrar.mjs`, renderiza las dos versiones, guarda la caché de voz en `main` y sube los MP4 a un Release `shot-NNN` (descargables desde el celular); avisa por Telegram. Rehacer etiqueta y comenta el PR para que la tarea diaria lo retome. Descartar cierra el PR con etiqueta `descartado`.
- `motor/ficha.mjs` lee `narracion.json` (ahora con `titulo`, `numero`, `sinVoz`, `sinVozAudio`) y es lo que usan los workflows para encontrar los archivos de cada shot.
- **Falta configurar a mano** (Robert): crear el bot con BotFather, obtener el chat id, desplegar el worker con `wrangler` y registrar el webhook (todo en `telegram/LEEME.md`); agregar en GitHub los secrets `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`; crear la tarea programada de Claude Code con el repositorio adjunto y la instrucción "Sigue AUTONOMO.md". Opcional: proteger `main` no bloquea el merge porque lo hace el token de Actions, pero si se activan revisiones obligatorias habrá que permitirle al bot.
- Último shot producido por la tarea diaria: ninguno todavía.

## Lecciones (no repetir errores)
- Nunca generar la voz frase por frase ni meter pausas a mano: suena antinatural. Una sola petición, sin "…".
- No tocar voice_settings: usar los guardados en la voz.
- Plan Starter de ElevenLabs: solo `mp3_44100_128` (192 kbps da 403).
- Claude no puede escuchar audio: el usuario es la prueba final. Pendiente: verificación con voz a texto (requiere permiso "De voz a texto" en la clave de ElevenLabs).

## Pendiente (en orden)
1. **Piloto shot 002**: construido (ver arriba). Falta que Robert lo apruebe; puede servir como primera prueba del flujo nuevo abriendo un PR desde una rama `shot/002-moho-pan`.
2. **Generador diario**: DECISIÓN del usuario (26 oct): usar Claude Code con su suscripción, NO la API de pago, para no gastar créditos. La clave `CLAUDE_API_KEY` queda solo como respaldo. Hecho: el procedimiento está en `AUTONOMO.md` y los workflows en `.github/workflows/`. Falta: crear la tarea programada y probar el ciclo completo con un shot real.
3. **Aprobación por Telegram**: hecho el worker (`telegram/`) y los botones Aprobar / Rehacer / Descartar. Falta: que Robert cree el bot y despliegue el worker (`telegram/LEEME.md`).
4. **Publicación**: DECISIÓN (26 oct): por ahora Claude publica de forma asistida, controlando el navegador en la computadora del usuario y siempre con su aprobación; en paralelo se piden los permisos de API (Meta, YouTube, TikTok). Plan a futuro:
   - Instagram + Facebook por API oficial (cuenta Creator/Business ligada a página de Facebook).
   - YouTube + TikTok por API cuando aprueben sus auditorías; mientras tanto, desde una máquina fija del usuario con sesión iniciada (script de subida estable, Claude solo como respaldo). Avisado de los riesgos (términos de uso, captchas, seguridad).
5. Cierre del video: se usa una tarjeta HTML con @lacreaciondelrobert (el `cierre.mp4` viejo dice "Shots biotecnológicos, cada miércoles").
6. Número de serie en la marca de agua: quedó `#01`; confirmar con el usuario.

## Instalar en una computadora nueva
1. Instalar Node.js 22 o más nuevo, Git y ffmpeg.
2. `git clone https://github.com/Roberthecoder/lacreaciondelrobert-shots`
3. `cd lacreaciondelrobert-shots/motor && npm install && npx playwright install chromium`
4. Probar: `node render.mjs ../shots/001-hormiga-zombi "Shot Hormiga Zombi.dc.html" prueba.mp4 --hasta 5`

### Notas de la computadora de Robert (Windows, 25 oct 2026)
- Clonar con rutas largas: `git -c core.longpaths=true clone ...` (si no, faltan archivos).
- `npx playwright install chromium` se atora al descomprimir (probablemente el antivirus). Solución: usar el Chrome instalado con `NAVEGADOR=chrome` (render.mjs y preview.mjs ya lo aceptan; sin esa variable se usa Chromium como antes, p. ej. en GitHub Actions).
- El `ffmpeg` que aparece primero en el PATH es de 2013 (viene con un paquete de Python) y falla con "could not find codec parameters". Se instaló ffmpeg 9 con winget (`Gyan.FFmpeg`); hasta reiniciar la terminal hay que ponerlo primero en el PATH: `.../WinGet/Packages/Gyan.FFmpeg_.../ffmpeg-9.0.2-full_build/bin`.
- Aquí el render va a ~30 s por segundo de video (5 s tardaron 148 s): usar `preview.mjs` antes de renderizar completo, o GitHub Actions para los MP4 largos.

## Estudio de estilo (25 oct 2026)
Análisis de 5 videos virales y propuesta de fusión en `referencias-externas/ANALISIS.md`.
DECISIÓN de Robert (25 oct): mantener sus colores brillantes; fondo oscuro solo en escenas microscópicas/internas. Duración: 61–62 s en ambas versiones (voz de ~58 s + tarjeta de cierre), porque TikTok paga solo videos de más de 1 minuto; así lo hace @1cell1life2. Receta final del canal que Robert quiere replicar: `referencias-externas/ANALISIS.md` y `CLAUDE.md`. Se aprobaron las nuevas reglas de ritmo: ya están en `CLAUDE.md` (sección "Ritmo, duración y color"), `GUIA_SHOT.md`, `PLANTILLA Shot Sin Voz.md` y los `CLAUDE.md` de las series. Siguiente: shot 002 con esta receta (avisar costo de ElevenLabs antes de generar la voz).
- 12 canales analizados → `referencias-externas/RECETARIO.md`: 6 formatos narrados, 5 mudos, parejas narrado/mudo y reparto por serie (Micológico, Biotecnológico, Lab).
- Kit de piezas → `motor/kit/kit-robert.jsx` (22 piezas + mundo "piel en corte"), manual en `motor/kit/LEEME.md`, demo probado en `shots/_demo-kit/` (no se publica).
- `preview.mjs` en Windows: ffmpeg necesita la ruta de la fuente para numerar cuadros; ya se le pasa Arial automáticamente.
