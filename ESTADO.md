# Estado del proyecto (para continuar en otra sesión)

Última actualización: 26 oct 2026. Esta sesión empezó en la nube (Claude Code web) y continúa en la computadora del usuario.

## Traspaso completo a la nube (28 oct 2026) — LEER PRIMERO
Todo el sistema vive en la nube. Nada depende de la computadora de Robert salvo iniciar sesión en sus cuentas. El chat
administrador sigue `ADMIN.md`. Lo decidido el 27–28 oct con Robert:

**Dónde vive cada cosa**
- Repo público de producción: este (`Roberthecoder/lacreaciondelrobert-shots`). Renders en GitHub Actions (minutos ilimitados por
  ser público). Secretos `ELEVENLABS_API_KEY` y `CLAUDE_API_KEY` ya configurados. Ramas protegidas (sin force-push ni borrado).
- Repo privado `Roberthecoder/lacreaciondelrobert-archivo`: historial viejo completo, fotos originales del largo (`largos/…/fuentes/`)
  y **los archivos personales de Robert** en `personal/basis_fellowship/` (fotos, videos, PDFs y documentos de Instagram, LinkedIn,
  YouTube, Drive de la prepa y experimentos caseros; los `.zip` de más de 95 MB no se subieron). Nunca copiar nada personal a este repo.
- **Sala de Shots** (panel de Robert, fijado en su barra de claude.ai): https://claude.ai/artifact/KBt7kaF2DPUjT5HBiQZMBv · código en
  `sala/index.html` · datos y uso en `sala/LEEME.md` y `CLAUDE.md`.
- Rutinas en claude.ai (https://claude.ai/code/routines): **Producción intensiva** `trig_01URKCb81JFPMa9CtCnnjBN7` (cada 4 h; atiende
  aprobaciones, correcciones y pedidos de la Sala antes del lote normal) y **Lote diario** `trig_01VKwBbqWsjm5xKahYsA7RLd` (apagada; es
  el modo para cuando Robert vuelva al plan Pro). La red del entorno de nube "Personal" está en acceso completo (necesario para verificar).

**Decisiones de Robert (mandan sobre cualquier documento viejo)**
- Solo narrado (sin gemelo mudo); GitHub renderiza una versión de revisión sin voz y la voz se genera solo cuando Robert la aprueba.
- Verificación de hechos obligatoria antes de animar, con fuentes abiertas de verdad (candado en GitHub). "SIEMPRE verídico".
- Numeración = fecha de publicación desde el 1 nov 2026, 3 series por día alternando; especiales de temporada en números reservados
  (`calendario/`). Sin saltos.
- La serie Shot Robert es solo manual. El título lleva "Shot <Serie> #NN". Textos para 7 redes en cada `publicacion.md`.
- Nada se publica en redes sin Robert. Meta: reserva de 365 por serie.

**Pendiente (en orden)**
1. **Renumerar** según `calendario/` (ver la fila "Renumerar" de `ADMIN.md`): los 6 especiales de Día de Muertos ya son los #01; todos
   los shots normales se recorren a los números libres no reservados (ej. ¿Qué es un hongo? → Fungi Mati #02, la hormiga zombi → #03;
   en Científico, Químico e IA el #05 está reservado para el Día de la Ciencia). Hacerlo cuando ninguna sesión esté escribiendo esas
   series. Después, volver a encender la Producción intensiva (se pausó para no chocar).
2. Juntar a main las ramas de lotes que falten (`claude/eager-archimedes-*` A, `claude/clever-heisenberg-*` B, `claude/lucid-bardeen-*` C,
   `claude/clever-mayer-*` D, `claude/fun-02-hormiga-zombi`, `claude/igualar-*`) y borrar las que ya estén en main.
3. Hormiga zombi (pedido en la Sala): terminar verificación y render; voz aprobada por Robert.
4. Largo #00 (rama `largo/000`): Robert está corrigiendo el guion a mano; no generar voz hasta que él lo diga. Fotos: usar
   `personal/basis_fellowship/` del archivo; las de Facebook llegarán cuando Robert baje su archivo de Facebook.
5. Publicación: por ahora Robert publica a mano con los textos de la Sala; después, API oficiales o un programador (Metricool/Buffer).
6. Créditos de ElevenLabs: Robert compra más si se acaban; avisarle cuando queden pocos.

## Repositorios (27 oct 2026)
- **`Roberthecoder/lacreaciondelrobert-shots`** (este): producción, historial limpio (sin fotos originales, fecha de nacimiento ni correo), pensado para ser público.
- **`Roberthecoder/lacreaciondelrobert-archivo`** (privado): el repo anterior completo, con historial, fotos originales del largo (`largos/…/fuentes/`), la lista de fotos de Facebook y los Releases de borradores hasta el 27 oct. Para convocatorias y respaldo. **Nunca hacer push de su historial aquí.**
- Desde el 27 oct cada shot es solo narrado, con versión de revisión sin voz (ver CLAUDE.md).

## Ya funciona
- **Render**: `motor/render.mjs` convierte un shot (`.dc.html` + `.jsx` del motor de Claude Design) a MP4 1080×1920 con audio. `motor/preview.mjs` saca una hoja de contactos para revisar cuadros.
- **Primer shot**: `shots/001-hormiga-zombi` (Ophiocordyceps), en dos versiones:
  - Sin voz: música + efectos generados por `gen-audio.mjs`. 49 s.
  - Narrada: `motor/narrar.mjs` pide TODO el guion (`narracion.json`) en una sola petición a ElevenLabs con **Eleven v4** (`eleven_v4`), voz "Robert Narrador" (`uiCk6APPfsjnw3oUQzVo`), usando los ajustes guardados en la voz. El video se adapta a la voz (campo `nat` del motor) y los subtítulos siguen los tiempos por carácter. 56 s. **El usuario la aprobó ("te quedó excelente").** La voz está en caché en `shots/001-hormiga-zombi/voz/` (no regenerar: gasta créditos).
- **Render automático en la nube (27 oct 2026)**: cada push que toca `shots/**` renderiza solo los shots que cambiaron y sube los MP4 al Release "Borradores · <rama>" (guía: `PRODUCCION_NUBE.md`). Prueba superada: shot 003 sin voz, 61.5 s, en https://github.com/Roberthecoder/lacreaciondelrobert-shots/actions/runs/40531371441 . Desde el 27 oct también sube `<shot>_publicacion.md` (textos para cada red) junto a los videos, y si solo cambia ese archivo lo actualiza sin re-renderizar: probado en https://github.com/Roberthecoder/lacreaciondelrobert-shots/actions/runs/40539329598 (solo texto) y https://github.com/Roberthecoder/lacreaciondelrobert-shots/actions/runs/40539629690 (video + texto). Banco de temas en `historial/temas.json` (+ `historial/nuevos/` y `consolidar.mjs`).
- **GitHub Actions**: `.github/workflows/renderizar.yml` (Actions → Renderizar shot → Run workflow) renderiza narrada, sin voz o ambas, y deja el MP4 en Artifacts. Secrets ya configurados: `ELEVENLABS_API_KEY`, `CLAUDE_API_KEY`.

## Lecciones (no repetir errores)
- Nunca generar la voz frase por frase ni meter pausas a mano: suena antinatural. Una sola petición, sin "…".
- No tocar voice_settings: usar los guardados en la voz.
- Plan Starter de ElevenLabs: solo `mp3_44100_128` (192 kbps da 403).
- Claude no puede escuchar audio: el usuario es la prueba final. Pendiente: verificación con voz a texto (requiere permiso "De voz a texto" en la clave de ElevenLabs).

## Pendiente (en orden)
1. **Piloto shot 002** (siguiente paso acordado con Robert): elegir tema y formato del `RECETARIO.md` (recomendado N1 "Por dentro" + gemelo mudo M4 "Ciclo"), construirlo con el kit, revisar cuadros, y avisar el costo de ElevenLabs antes de generar la voz. Estilo ya resuelto: ver "Estudio de estilo" abajo.
2. **Generador diario**: DECISIÓN del usuario (26 oct): usar Claude Code con su suscripción, NO la API de pago, para no gastar créditos. Plan: tarea programada diaria de Claude Code en la máquina fija del usuario (o el Action oficial de Claude Code con token de suscripción). La clave `CLAUDE_API_KEY` queda solo como respaldo. Cada día: elegir tema nuevo (`historial/temas.json`), escribe guion con fuentes, verifica datos, escribe el jsx, revisa capturas, narra, renderiza las dos versiones.
3. **Aprobación por Telegram**: bot con botones Publicar / Rehacer / Descartar (receptor gratis en Cloudflare Workers → repository_dispatch).
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
