# Shots de La Creación del Robert

Lee primero `ESTADO.md` (qué está hecho y qué sigue) y `CANAL.md` (series, numeración, video largo semanal y presupuesto de voz).

Videos verticales 1080×1920 de divulgación científica en español de México. El usuario no programa: respuestas en español, breves y sin jerga.

## Pedidos cortos (Robert escribe una línea en una sesión de nube)
Robert abre una sesión en claude.ai/code con este repositorio y escribe algo corto. Interprétalo así, sin pedirle más datos:
- **"Hazme un lote de <serie>"** (o "5 shots de <serie>", "un shot de <serie>"): sigue la plantilla de la sección 2 de
  `PRODUCCION_NUBE.md` con 5 shots (o los que diga), numerados desde el siguiente número libre de esa serie
  (búscalo en `shots/`, `historial/` y en las ramas remotas). Series: Biotecnológico, Fungi Mati, Ambiental, IA,
  Científico, Químico y **Robert** (datos curiosos de Robert: lee antes `series/shot-robert/CLAUDE.md`).
  **La serie Robert es solo manual:** únicamente cuando Robert la pide en persona. Las rutinas automáticas nunca la hacen.
  Antes de empezar, revisa con `git branch -r` que no haya otra rama trabajando la misma serie; si la hay, avísale a Robert
  y propón otra serie.
- **"Continúa el lote A/B/C/D"**: haz merge de `origin/remaster/lote-<letra>` en tu rama, revisa qué falta en cada shot
  (Robert en pantalla, `publicacion.md`, historial), termínalo y haz push.
- **"Apruebo la voz de <shot>"**: pon `"voz_aprobada": true` en el `narracion.json` de ese shot y haz push.
- **"Junta el lote X a main"**: sigue la sección 6 de `PRODUCCION_NUBE.md`.
Siempre: no renderices MP4 completos (lo hace GitHub con cada push), no publiques nada en redes, no uses la API de Claude
ni generes voz sin aprobación. Al terminar dale a Robert la lista de shots y el enlace a su Release de borradores.

## Reglas de contenido
- Cada shot es un tema nuevo; nunca repetir un tema ni uno casi igual. **Banco de temas** (`historial/temas.json`):
  - **Antes de elegir tema:** `git fetch origin` y `node historial/consolidar.mjs --buscar "palabras del tema"` (busca en el banco y en lo que otras sesiones ya apartaron en sus ramas). Los `derivados` de cada tema son buenas ideas para el siguiente.
  - **Al terminar (o al apartar el tema):** registrar el tema y 2–3 derivados en un archivo propio `historial/nuevos/<clave>.json` (la clave de tu sesión en `historial/ola-01.md`, o tu rama con guiones; formato en `historial/nuevos/LEEME.md`). **Nunca editar `temas.json` directamente**: hay muchas sesiones en paralelo y chocarían. `node historial/consolidar.mjs` los junta sin duplicados (lo corre quien mezcla ramas a main).
- Producción en la nube (renders automáticos al hacer push, Release de borradores, aprobar voz): ver `PRODUCCION_NUBE.md`. Nunca poner `"voz_aprobada": true` sin que Robert lo diga.
- Cada shot se produce en dos versiones del mismo tema: narrada (voz clonada en ElevenLabs, Voice ID `uiCk6APPfsjnw3oUQzVo`) y sin voz (música + subtítulos + gags).
- Rigor: cada dato con fuente publicada, listada en el guion. Si algo es hipótesis, decirlo como hipótesis. Especies en cursiva. Ilustrar bien la morfología real (ej. esporas de *Ophiocordyceps* alargadas, no redondas).
- Estilo y reglas detalladas: `referencias/*/CLAUDE.md`, `referencias/Paquete Shot Lab/PLANTILLA Shot Sin Voz.md` y `referencias/KIT MAESTRO Shots Micologicos/GUIA_SHOT.md`. Prohibidos los avatares 01 y 09 salvo tema de sabor.
- Subtítulos siempre fuera del tercio inferior.

## Formato y piezas de cada shot
- Antes de escribir un shot, elegir su formato narrado y su gemelo mudo en `referencias-externas/RECETARIO.md` (11 formatos, parejas y reparto por serie).
- Logo: **isotipo A COLOR** (versión oficial de Robert, 26 oct 2026; originales en `motor/kit/logos/fuente/`: color, negro sobre blanco y marca de agua con badge) con el hexágono del TEMA en dorado, alineado a su celda (`motor/kit/logo.mjs` genera `logo_<tema>.svg`): biología → ADN · química → matraz · bioquímica → ADN + matraz · física → átomo · IA → brillitos. Dentro de la celda dorada los íconos de color llevan un contorno negro fino para no perderse; sin tema: `logo_color.svg`. Copiar el SVG a `assets/` y pasar `tema` a `MarcaAgua` y `CierreMarca`.
- Construirlo con el kit `motor/kit/kit-robert.jsx` (catálogo en `motor/kit/LEEME.md`, ejemplo en `shots/_demo-kit/`). Si un tema necesita un mundo nuevo (hoja, suelo, intestino…), agregarlo al kit para reutilizarlo.
- Para mostrar lo de adentro sin dejar de ver lo de afuera (cuerpo, fruta, suelo), usar `Lupa` en modo rayos X (`interior=…`).

## Ganchos (decidido 26 oct 2026, de 120 videos analizados en `referencias-externas/FORMULA_VIRAL.md`)
La primera frase (o el primer texto, en mudos) usa uno de estos 7 ganchos:
1. **"Esto no es X: es Y"** sobre algo que se ve en pantalla ("Ese mosquito no te picó con una aguja: te metió 6" — 3.5 M).
2. **Tú contra el de al lado** ("Los moscos pueden preferirte 100 veces más que a la persona de al lado" — 3.1 M).
3. **Tu vida o tu cuerpo en una imagen** ("Esto es una vida de 80 años dibujada en semanas" — 2.4 M, el más compartido).
4. **Un número que contradice** ("Ir a 120 en vez de 100 te ahorra 5 minutos. Solo 5" — 2.2 M).
5. **Reto "casi todos fallan"** (acertijo con respuesta al final — récord de comentarios).
6. **Mito peligroso "¿Por qué NO…?"** (primeros auxilios, laboratorio — los más guardados).
7. **Algo que tus ojos nunca van a ver** ("El color que nunca verás" — 1.7 M).

**Prohibido abrir con:** un año o fecha ("En 1897…"), una lección de historia, una etimología ("Cada vez que dices…"), solo texto sin acción, o la voz entrando después del segundo 0.5. Ninguno de esos pasó de 130 K. La fecha y la historia van después, como "el estudio" (35–50 s).

## Ritmo, duración y color (decidido 25 oct 2026 — manda sobre las guías de `referencias/`)
Basado en el análisis de `referencias-externas/ANALISIS.md` y confirmado con `FORMULA_VIRAL.md` (en 9 de 12 canales, la mitad más vista es la más corta: los 61–62 s se quedan). Si una guía vieja dice otra cosa (p. ej. "algo nuevo cada 1–1.5 s" o "≤ 60 s" o "60.0 s exactos"), gana esta sección.

**Versión narrada**
- Duración total **de 61–62 s** (decisión de Robert: TikTok paga solo videos de *más* de 1 minuto; así lo hace @1cell1life2). Voz de ~58 s (≈160–165 palabras a ~170 palabras/min) + tarjeta de cierre de 3–4 s. Verificar con ffprobe que el total quede entre 61.0 y 62.0 s, nunca en 60 s o menos. Avisar el costo de ElevenLabs antes de generar.
- Tema: de preferencia algo que el espectador ya vivió o tiene en su cuerpo/casa, explicado por dentro. Si es lejano, el gancho lo conecta con "tú".
- La voz arranca en el segundo 0: sin logo, saludo ni intro. Primera frase con uno de los **7 ganchos** de arriba (el preferido para "Por dentro": **"X no es Y: es Z"**), hablándole a "tú". Nunca un gancho que solo describe.
- Algo se mueve o cambia **antes del segundo 1** (una acción, un toque, un time-lapse); nunca 2 s de imagen sin acción al inicio.
- Viaje **macro → micro → macro**: abrir a escala real, bajar al microscopio y **cerrar en la misma imagen del inicio, ya transformada**. Barra de escala siempre visible.
- Estructura para ~58 s de voz: gancho (0–4 s) → cómo empieza (4–15) → mecanismo, una idea por frase (15–40) → re-gancho con pregunta (~30) → un estudio real con año y lugar, dibujado como escena (35–50) → dato extra sorprendente o chistoso (50–55) → frase final que regresa al gancho (55–58).
- Algo nuevo en pantalla cada ~3 s, atado a la frase que dice la voz (usar los tiempos de `nat`). Frases cortas de 2–4 s.
- Preferir una escena continua que viaja sobre muchos cortes. Cambios de escena con movimiento de cámara o fundido, nunca corte seco.
- Puede haber momentos quietos mientras la voz avanza, máximo ~6 s.
- Tarjeta de cierre con el logo sobre la imagen final oscurecida, completando la duración total.
- Música: cama grave y continua, sin golpe marcado, siempre debajo de la voz (la voz manda). Nunca una canción conocida. Cada cosa que pasa en pantalla (golpe, gota, latido, ruptura) tiene su efecto en el mismo cuadro.
- Opcional, para comparar: algún narrado de ~90 s cuando el mecanismo lo pida (siempre más de 61 s). Por defecto, 61–62 s.

**Versión sin voz**
- Duración total **de 61–62 s** (más de 1 minuto, para monetizar), pensada como loop: el final conecta con el inicio o trae un giro que invite a verlo otra vez.
- Algo nuevo cada 1.5–3 s sobre un golpe de música; nada estático más de 4 s.
- **La música sale siempre de los datos** (ritmos reales, conteos, tamaños, una nota por evento) y además cuenta el estado de la historia (tapada/tensa mientras dura el problema, libre cuando se resuelve). Se genera con `gen-audio.mjs`; nada grabado ni de catálogo. El título del video lleva 🎧.

**Ambas**
- Colores: se mantienen los fondos brillantes y saturados de la marca (rosa, amarillo, menta, cian…). Solo las escenas microscópicas o internas (dentro de una célula, un tejido, el suelo) usan fondo oscuro (`#0E0F12` o azul noche) con los colores de la marca como acento.
- Poco texto: un título o número grande, etiquetas chicas (nombre común + *científico*) y una línea de subtítulo con una palabra resaltada.
- Capítulos numerados pequeños bajo el logo y medidores reales (µm, días, conteos) cuando ayuden.
- **Robert en pantalla (obligatorio, es la marca del canal).** Los shots existen también para que la gente asocie la ciencia con la cara de Robert. Sus stickers (13 poses en `shots/001-hormiga-zombi/assets/stickers/`; copia al shot las que uses) se usan con el componente `Robert` del kit y cumplen todo esto:
  - **Cuadro 0:** Robert ya está en pantalla con el gancho (lado `gancho`), reaccionando a la primera frase. No es intro ni saludo: la voz y la imagen arrancan igual de rápido que en la receta.
  - **Cada 8–10 s** vuelve a aparecer, en cada re-gancho y en el dato sorprendente: mínimo **6 apariciones** en 61–62 s y **al menos 18 s en pantalla** en total (~30 %).
  - **Al menos una vez grande** (lado `presentador`, medio cuerpo) en el giro o el dato más fuerte, señalando o reaccionando a lo que pasa en la escena.
  - **Pose según la frase:** sorprendido con el dato raro, pensativo con la pregunta, serio con lo grave, señalando cuando algo aparece, riendo con lo absurdo. Mínimo **4 poses distintas**; nunca la misma dos veces seguidas.
  - **Cierre:** `CierreMarca` con `robert=` (Robert junto al logo, señalando o apuntando a cámara).
  - Nunca tapa el dato principal, las etiquetas ni el subtítulo: si estorba, cambia de lado o se espera un segundo.
  - En `guion.md`, una tabla **"Robert en pantalla"** con cada aparición (segundo de entrada y salida, pose, lado y la frase a la que reacciona) y el total de segundos. Sin esa tabla el shot no está terminado.
- **Textos para publicar (obligatorio):** cada shot lleva en su carpeta un `publicacion.md` con título y descripción listos para copiar en **TikTok, Instagram Reels, YouTube Shorts y Facebook Reels**, para la versión narrada y la sin voz (🎧), más el comentario fijado con las fuentes. Plantilla, límites por red y ejemplo: `motor/plantillas/publicacion.md` y `shots/003-semillas-luna/publicacion.md`. La descripción es un mini artículo con la explicación completa (guion) + fuentes + "el dibujo es esquemático" cuando aplique + **una pregunta para comentar** (p. ej. "¿Cómo le dicen en tu región?", "¿A ti también te pasa?") + la firma "Soy Robert, de La Creación del Robert 🌱". Sin `publicacion.md` el shot no está terminado.

## Notas técnicas (aprendidas a la mala)
- Motor: `animations-v3.jsx` + `support.js` de Claude Design. Un shot es un `.dc.html` con `window.OM_SCENES` y un `.jsx` que dibuja todo desde `T`.
- El `.jsx` corre dentro de `new Function`: hay que terminarlo con `window.MiApp = MiApp;` o el componente no aparece.
- `support.js` carga React y Babel desde unpkg.com, que está bloqueado en estos entornos. `motor/render.mjs` y `motor/preview.mjs` interceptan esas URLs y sirven los paquetes locales. Babel debe ser exactamente 7.29.0 (support.js verifica el hash de integridad).
- Chromium headless no decodifica H.264: no usar `<video>` dentro del shot; los videos de cierre se pegan con ffmpeg (`--outro`).
- Usar siempre `motor/preview.mjs` para revisar cuadros antes de renderizar el MP4 completo (~4 s de render por segundo de video en la nube; ~30 s en la computadora de Robert).
- En la computadora de Robert: correr el motor con `NAVEGADOR=chrome` y con ffmpeg 9 primero en el PATH (ver `ESTADO.md`).
- No guardar claves en el repositorio. La clave de Claude para el sistema automático se llama `CLAUDE_API_KEY` (no `ANTHROPIC_API_KEY`, para no interferir con Claude Code).
