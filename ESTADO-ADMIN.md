# Estado del administrador (memoria de largo plazo)

Este archivo es la memoria del chat administrador. **Toda sesión administradora lo lee al empezar y lo actualiza al terminar algo importante**
(commit en main con `[sin render]`). Si el chat se compacta o se abre uno nuevo, aquí está todo lo que hace falta para seguir.
Escríbelo corto: estado actual y pendientes, no historia. La historia vive en git y en los `resultado` de la Sala.

Última actualización: 30 oct 2026.

## PEDIDO DE 300 SHOTS (29 oct) — LISTO
- Pedido `zu488o6qtt10bvn5j11h` listo: 300 shots (#10–#59 de las 6 series) en la Sala, sin voz. Juntados a main el 29 oct
  (ramas pedido300/fun, bio, amb, cie, qui, ia). La Sala tiene 370 shots.
- Re-verificación independiente de las 54 correcciones que no la tenían: 48 OK, 6 corregidos (qui-22, qui-41, bio-23, bio-25,
  bio-42, fes-07/fes-14). Regla reforzada: tras corregir ⚠️/❌, otro subagente revisa y deja "## Re-verificación".
- FALTA: la sesión de festivos (`session_0157fpgyNNigAR2Ks9KZrcRx`, rama pedido300/festivos) rehace fes-10 (repetía qui-35-vela)
  y actualiza en la Sala fes-07/fes-10/fes-14. Cuando avise, juntar pedido300/festivos a main con [sin render].
- Temas cercanos aceptados (ángulos distintos): bio-20 vs qui-49 (glutamato), amb-40 vs amb-41 (partículas), bio-50 vs fes-14 (maíz).

## PUBLICACIÓN AUTOMÁTICA (30 oct, permiso PERMANENTE de Robert: «Apruebo tu permiso de GitHub»)
- `.github/workflows/publicar-diario.yml`: cada día 6:17 pm CDMX publica en las 6 redes lo que toque según calendario/fecha.py,
  con publicar.yml y el Release borradores-voces-v4. Sin tokens de Claude. Config: `publicar/diario.json` (activo, redes, TikTok);
  saltar un shot: su clave en `publicar/pausa.txt`. Prueba en seco del 30 oct (fun-01): las 6 redes OK.
- Robert quiere depender lo mínimo de Claude (pasará a plan Pro): el trabajador horario se apaga cuando terminen las voces.
- TikTok «contenido con IA»: Robert dice que la animación es código, no IA; la voz sí es sintética → se le preguntó; hoy ia=true.

## PUBLICACIÓN DIARIA (30 oct): 1 shot diario desde el 30 oct; tarjeta «Hoy se publica» en la Sala; el trabajador procesa
## los clics de «Publicar» cada hora (ADMIN.md, «Publicación diaria»).

## PUBLICADOR DE REDES (29 oct) — 6 REDES LISTAS; NADA PUBLICADO EN PÚBLICO TODAVÍA
- Cómo se usa: ADMIN.md, «Publicar en redes». Botón «Publicar» de la Sala → collection `publicaciones` → el admin lo procesa.
- Facebook, Instagram, Threads, LinkedIn: publican con el texto de cada red de `publicacion.md`. YouTube: sube PRIVADO hasta que
  Google apruebe la auditoría (ENVIADA el 29 oct; documentos en `docs/revisiones/youtube/`).
- TikTok: PUBLICA DIRECTO (video.publish) con su descripción y las opciones que Robert elige en la Sala (privacidad sin valor
  por defecto, comentarios/dúo/stitch, etiqueta IA, contenido de marca). Opción «borrador» para mandarlo a su bandeja.
  Mientras TikTok no apruebe la app: plan B automático = BORRADOR a la bandeja de Robert (él pega el texto y publica).
  Plan B PROBADO el 29 oct con la cuenta pública (fun-02 llegó como borrador). La API de borrador no acepta título ni descripción.
  Revisión de Producción REENVIADA el 29 oct 16:47 con Direct Post y demo nuevo (en la PC de Robert:
  `C:\Users\winusr\lacreacion-lotes\revision-tiktok\demo-tiktok-directo.mp4`). Al aprobarse: Robert cambia
  TIKTOK_CLIENT_KEY/SECRET por los de Producción y se conecta otra vez (docs/tiktok.html, borrando la llave guardada).
- Doc `estado/tiktok` de la Sala = datos de la cuenta (creator_info) para el panel de TikTok; se actualiza con el modo prueba.
- Pendiente de Robert: borrar en TikTok los 2 videos «Solo yo» de la hormiga zombi (demo, 29 oct) y el borrador de 003; volver
  la cuenta a pública si sigue privada. Borrar los privados/borradores de 003 en YouTube Studio y Meta.
- La rama `temporal/demo-tiktok` (solo los MP4 del demo) no se puede borrar por una regla del repo: borrarla cuando se ajuste.
- Recordatorios: LinkedIn vence ~28 dic 2026 (manual). Threads y TikTok se renuevan solos cada lunes (`renovar-tokens.yml`).

## AUDITORÍA DE LOS 60 SHOTS ANTERIORES (29 oct) — LISTO
- 15 corregidos y re-verificados (informes en `auditorias/2026-10-29/`), fun-03 con datos de Robert, y la Lupa ya no dice «RAYOS X»
  en ningún shot (16 archivos). Todo juntado a main el 29 oct. amb-03 sin voz dura 60.6 s (Robert acepta pequeñas diferencias).

## VOZ NUEVA Y SONIDO OFICIAL (30 oct) — APROBADO, GENERANDO TODAS LAS VOCES
- Voz profesional `BrkFnhKTRJck3ZEjqD5d`, eleven_v4. "IA" → "Ía" solo para ElevenLabs (`motor/pronunciacion.json`).
- Sonido oficial = muestra «5» elegida por Robert: mezcla por bandas con graves y armónicos fuertes y domados, voz comprimida con
  presencia (3 kHz), narrado a −7.1 LUFS y sin voz a −11, pico −1.5 dB. Todo en `motor/mezcla.json` (+ narrar.mjs y render.mjs).
  Robert: "G3 suena perfecto al 70 %... quiero que al 50 % suene como al 70 %, potente pero bonito, justo para TikTok".
- Duración con la voz nueva: ~69–71 s (Robert: "así está excelente").
- 30 oct: HECHAS las voces de los primeros 121 shots por fecha de publicación (1 nov – 8 dic), juntadas a main y subidas a la Sala
  como «Narrado listo». Orden y caracteres en `calendario/orden_voces.txt` (fecha · clave · caracteres · tenía voz).
  Créditos: eleven_v4 cobra ~0.44 créditos por carácter (~420 por shot). Las 121 voces gastaron ~51,000 de 119,725.
  30 oct: con los 68,767 restantes se generan las posiciones 122–274 (hasta 27 ene 2027). Faltarán 275–370 (~96 shots,
  ~42,000 créditos) para la próxima renovación (121,000 al mes alcanzan para ~280 shots).
- Cómo generar la siguiente tanda: rama `voces/v4` desde main; poner "voz_aprobada": true (y "mezcla": "oficial-30oct" para forzar
  render) a 15 shots por push, esperar cada run; NO usar la sesión de voces (su filtro pide la aprobación directa de Robert).
  Ojo: un narrado < 60.5 s falla el candado → "velocidad": 0.98 en su narracion.json (sin créditos). Luego subir a la Sala
  (motor/sala.py con los MP4 del Release `borradores-voces-v4`) y juntar a main con [sin render].

## (HISTORIA) VOZ EN PAUSA (29 oct, Robert) — ya no aplica desde el 30 oct: "ahorita no hay ningún audio aprobado, voy a mejorar la calidad aún más"
- Las 30 aprobaciones que esperaban créditos se marcaron `aprobado:false, en_pausa:true` en la Sala. NO generar ninguna voz
  ni poner `voz_aprobada` hasta que Robert vuelva a aprobar con el botón o en el chat.

## Trabajador y tareas programadas
- Trabajador horario: sesión `session_0157fpgzNLGBRTM1nZnM7iLe` ("Mantenimiento de la Sala (trabajador horario)", modo auto,
  con el repo shots). La despierta cada hora la tarea `trig_01SiG3xGhgHwCiG4zpgKvWQS` (minuto 56). Para encargos inmediatos,
  el chat administrador le escribe con send_message. Si deja de responder: créala otra vez con el mismo encargo y re-apunta la tarea.
- Apagadas: "Producción intensiva" (trig_01URKCb81JFPMa9CtCnnjBN7) y "Lote diario" (trig_01VKwBbqWsjm5xKahYsA7RLd); se crearon
  fuera del chat, así que solo Robert puede lanzarlas ya desde claude.ai/code/routines.

## Estado de la Sala
- 60 shots: 9 normales por serie (#01–#09, sin huecos) + 6 **Shot Festivo** de Día de Muertos (fes-01…fes-06). Todos con verificación
  de hechos independiente (28 oct) y `verificacion.md` con `VEREDICTO: APROBADO`.
- Robert aprobó la voz de los 52 que faltaban (28 oct). ElevenLabs se quedó sin créditos (0 de 40,000) a media tanda:
  quedaron con aprobación en la Sala (`aprobaciones/<clave>` procesado false) esperando créditos:
  fes-06-calaveritas, 003-semillas-luna, bio-07, bio-08, cie-04..08, fun-05..09, ia-06..09, amb-05..09, qui-03..09.
  Robert dijo que va a comprar más créditos. Cuando haya: aprobar UNA RAMA A LA VEZ y solo lo que alcance (ver ADMIN.md).
- fes-03-podredumbre-blanca: ya tiene la corrección de Robert (lignina, enzimas, etiqueta del fósil); su voz vieja ya no sirve:
  hay que pedirle a Robert que la apruebe otra vez (en la Sala está "Por revisar").

## Ramas
- HECHO (28 oct): las 12 ramas (fun-02-hormiga-zombi, igualar-*, verif-main, eager-archimedes, clever-heisenberg, lucid-bardeen,
  clever-mayer, especiales-muertos) están en main. No se borraron las ramas remotas. En `motor/kit/` quedaron
  `audio-kit-lote-c.mjs` y `audio-kit-lote-d.mjs` junto a `audio-kit.mjs`, y las piezas repetidas del kit renombradas (ver su LEEME).
- La serie Festivo se hizo en `claude/festivos` (renderizada ahí) y se juntó a main.
- **OJO main:** la nota `ultimo-render:` del Release `borradores-main` apunta a un commit viejo (4a94093). El próximo push a main que
  toque `shots/` SIN `[sin render]` re-renderizaría todos los shots juntados, y los que tienen `voz_aprobada` sin voz guardada
  intentarían gastar ElevenLabs a la vez. Hasta arreglarlo: en main, siempre `[sin render]`; las voces se aprueban en una rama.

## Decisiones de Robert que no están en otros archivos
- 29 oct: "No pasa nada si se pasa ligeramente la narración. Solo corrige los datos duros, inclusive si ya tienen voz: mejoré el
  modelo de voz, regeneraremos todo." → ya no se recortan guiones por duración; todo dato falso se corrige aunque el shot
  tenga voz (se le quita voz_aprobada; la voz se regenera cuando Robert apruebe).
- 28 oct: verificación estricta e independiente para TODO video, también los viejos. "No me importa el costo: arréglalos todos."
- 28 oct: la voz se genera solo con su aprobación; si cambia lo narrado, se le vuelve a pedir.
- 28 oct: quiere ver los créditos de ElevenLabs siempre actualizados en la Sala (doc `estado/creditos`).
- 28 oct: quiere un sistema que funcione indefinidamente: trabajador horario + este archivo + respuestas cortas.

## Serie "Shot Festivo" (decisión de Robert, 28 oct) — HECHO
- Reglas en CLAUDE.md ("Numeración = fecha de publicación, y serie Shot Festivo"), CANAL.md, `calendario/` (fecha.py `festivos`,
  especiales.json = festivos hechos) y la Sala (sección "Shots festivos" y pedido "Festivo"). 61–75 s.
- Falta: actualizar el encargo del trabajador horario para que revise `python3 calendario/fecha.py festivos` antes del lote.

## Pendientes técnicos
- (29 oct) ia-04 y bio-01 se quedan con su duración: Robert aceptó que la narración se pase un poco.

## Pendientes de Robert (él tiene que hacerlos)
- **RECORDARLE al terminar la configuración de las API de redes:** cancelar la prueba gratuita de un mes de Meta Verified
  (verificación de Instagram/Facebook) antes de que se renueve y cobre. Lo pidió el 28 oct.
- **API de redes: configuradas el 29 oct.** Publicador construido el 29 oct (ver sección «PUBLICADOR DE REDES» arriba y ADMIN.md).
  Pruebas de solo lectura: workflows `probar-meta.yml` y `probar-redes.yml` (los dos pasan).
  | Red | Estado | Secretos (nombres) / variables |
  |---|---|---|
  | Facebook + Instagram | Listo. Usuario del sistema Publicator, token sin caducidad. Página id 1472728315916821, IG id 17841445286636880 | `META_SYSTEM_TOKEN`; vars `META_PAGE_ID`, `META_IG_ID` |
  | Threads | Listo (evaluador lacreaciondelrobert). Token de ~60 días: renovarlo con `th_refresh_token` antes de que venza (~28 dic 2026) | `THREADS_TOKEN`; var `THREADS_APP_ID` |
  | YouTube | Listo (cuenta de marca «La Creación del Robert», scope youtube.upload). App de Google EN PRODUCCIÓN desde el 29 oct (sin verificar): el refresh token ya no vence a los 7 días. Los videos subidos por API quedan privados hasta pasar la auditoría de la YouTube API (formulario ENVIADO el 29 oct) | `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN` |
  | LinkedIn | Listo (publica en el perfil personal de Robert; app ligada a la página nueva «La Creación del Robert»). Token de 2 meses, sin renovación automática: regenerarlo ~28 dic 2026 en developers → OAuth tools → token generator (openid profile w_member_social) | `LINKEDIN_TOKEN`; var `LINKEDIN_CLIENT_ID` |
  | TikTok | Sandbox «Pruebas» conectado (user.info.basic + video.publish + video.upload; refresh hasta 29 oct 2027). Producción en revisión (reenviada 29 oct con Direct Post) | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` (del sandbox) |
  | X | No se hace (cobra por publicar) | — |
  Sitio con privacidad, términos y verificación de TikTok: https://roberthecoder.github.io/lacreaciondelrobert-shots/ (carpeta `docs/`).
  Tokens y claves: SIEMPRE como secretos de GitHub, nunca en el chat.
- Comprar créditos de ElevenLabs.
- Revisiones de YouTube (auditoría) y TikTok (Direct Post) ENVIADAS el 29 oct: esperar sus correos.
- Borrar o no publicar los narrados viejos con errores que siguen en los Releases y en lacreaciondelrobert-archivo.

## Voz pendiente (28 oct, tarde)
- En main, a los 29 shots aprobados SIN voz guardada válida se les quitó `voz_aprobada` para que ningún push los mande a
  ElevenLabs todos a la vez. La aprobación de Robert sigue en la Sala (`aprobaciones/<clave>`, procesado false).
  El trabajador (o el admin) vuelve a poner `voz_aprobada` en main solo a los que alcancen los créditos, en tandas pequeñas
  (máx. 3 por push) y esperando cada render. Lista: ver `git log` del commit "Voz pendiente: quito voz_aprobada…".
- Todo vive ya en main (las ramas viejas se juntaron). Los cambios de shots se hacen en main o en una rama nueva que se junta después.

## Propuestas para Robert (del trabajador horario)
- 28 oct: festividades en los próximos 60 días SIN Shot Festivo (siguiente libre: fes-07): Día Mundial de la Ciencia para la Paz
  (10 nov), Revolución Mexicana (20 nov), Virgen de Guadalupe (12 dic), Posadas (16 dic), Navidad (24 dic). Año Nuevo (31 dic)
  entra en 64 días. El trabajador no los hace sin que Robert los pida (pedido "Festivo" en la Sala).
