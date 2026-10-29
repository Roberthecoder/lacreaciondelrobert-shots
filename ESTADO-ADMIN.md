# Estado del administrador (memoria de largo plazo)

Este archivo es la memoria del chat administrador. **Toda sesión administradora lo lee al empezar y lo actualiza al terminar algo importante**
(commit en main con `[sin render]`). Si el chat se compacta o se abre uno nuevo, aquí está todo lo que hace falta para seguir.
Escríbelo corto: estado actual y pendientes, no historia. La historia vive en git y en los `resultado` de la Sala.

Última actualización: 29 oct 2026, 16:30 UTC.

## PEDIDO DE 300 SHOTS (29 oct) — LISTO
- Pedido `zu488o6qtt10bvn5j11h` listo: 300 shots (#10–#59 de las 6 series) en la Sala, sin voz. Juntados a main el 29 oct
  (ramas pedido300/fun, bio, amb, cie, qui, ia). La Sala tiene 370 shots.
- Re-verificación independiente de las 54 correcciones que no la tenían: 48 OK, 6 corregidos (qui-22, qui-41, bio-23, bio-25,
  bio-42, fes-07/fes-14). Regla reforzada: tras corregir ⚠️/❌, otro subagente revisa y deja "## Re-verificación".
- FALTA: la sesión de festivos (`session_0157fpgyNNigAR2Ks9KZrcRx`, rama pedido300/festivos) rehace fes-10 (repetía qui-35-vela)
  y actualiza en la Sala fes-07/fes-10/fes-14. Cuando avise, juntar pedido300/festivos a main con [sin render].
- Temas cercanos aceptados (ángulos distintos): bio-20 vs qui-49 (glutamato), amb-40 vs amb-41 (partículas), bio-50 vs fes-14 (maíz).

## AUDITORÍA DE LOS 60 SHOTS ANTERIORES (29 oct) — EN CURSO
- 4 verificadores independientes: 46 OK, 15 con datos a corregir (informes en `auditorias/2026-10-29/`, rama
  `correcciones/auditoria-29oct`). Sesión `session_0157fph2Famee5vpDrWHHrN1` los corrige, re-verifica, renderiza y reemplaza en la Sala.
  Al terminar: juntar esa rama a main con [sin render]. fun-03: falta que Robert confirme «en mi cuarto» y «papel aluminio».

## PUBLICADOR DE REDES (29 oct) — LAS 6 REDES FUNCIONAN EN PRUEBA Y PRIVADO; FALTA LA PRIMERA PUBLICACIÓN REAL
- Cómo se usa: ADMIN.md, «Publicar en redes». Programa `motor/redes/publicar.py`, workflow `publicar.yml` (a mano o con un
  archivo `publicar/pedidos/*.json`), botón «Publicar» en la Sala (collection `publicaciones`).
- Probado con 003-semillas-luna: modo prueba OK en Facebook, Instagram, Threads, YouTube y LinkedIn. Modo privado OK en
  YouTube (privado: youtube.com/shorts/EuhA0wKFL4A), Facebook (borrador), Instagram y Threads (contenedor sin publicar) y LinkedIn
  (video sin post). Instagram: la subida directa da 400, así que usa el enlace del Release (automático).
  Esos borradores/privados de 003 se pueden borrar (su narrado es viejo): YouTube Studio y Meta Business Suite.
- TikTok CONECTADO el 29 oct (cuenta «La Creación del Robert», Sandbox «Pruebas», user.info.basic + video.upload; refresh
  hasta 29 oct 2027, se renueva solo). Borrador de prueba (003) enviado a su bandeja: Robert lo puede borrar en la app.
  Ojo: los secretos TIKTOK_CLIENT_KEY/SECRET son los del SANDBOX. El problema al conectar fue que la llave pegada en la página
  era de otra app; el workflow «Conectar TikTok» imprime la huella (8 letras) de la llave para comparar sin verla.
- 29 oct 18:20: modo prueba OK en las 6 redes con fun-02; renovar-tokens OK (Threads renovado, vence 28 dic; se extiende cada lunes).
- Primera publicación real: Robert dijo «todavía no publiques nada» (29 oct). Propuesta cuando quiera: fun-02-hormiga-zombi
  (auditado OK). La voz está en pausa para mejorar su calidad: no publicar narrados hasta que él lo pida.
- Revisiones: respuestas listas en `docs/revisiones/LEEME.md`; Robert manda la auditoría de YouTube y el «Submit for review» de
  TikTok. Video demo GRABADO el 29 oct (3:47, sitio → autorizar → «Conectar TikTok» → borrador a la bandeja): en la PC de
  Robert, C:\Users\winusr\lacreacion-lotes\revision-tiktok\demo-tiktok.mp4 (no va al repo público). No muestra la pantalla de
  permisos de TikTok (la cuenta ya estaba autorizada) ni el teléfono; si TikTok lo pide, Robert quita el acceso de la app en
  TikTok (Ajustes → Seguridad → Apps) y se graba de nuevo, más un video del celular con la notificación del borrador.
- Recordatorios: LinkedIn vence ~28 dic 2026 (renovación manual, ADMIN.md). Threads y TikTok se renuevan solos cada lunes
  (`renovar-tokens.yml`); si ese run sale en rojo, avisar a Robert.
- Disco de la PC de Robert: se llenó (0 MB) el 29 oct al bajar los 300 shots; se liberaron ~460 MB. Hay que liberar más
  (C: con 254 GB usados). En esa PC no hacer `git pull` completo hasta que haya espacio.

## VOZ EN PAUSA (29 oct, Robert): "ahorita no hay ningún audio aprobado, voy a mejorar la calidad aún más"
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
  | YouTube | Listo (cuenta de marca «La Creación del Robert», scope youtube.upload). App de Google EN PRODUCCIÓN desde el 29 oct (sin verificar): el refresh token ya no vence a los 7 días. Los videos subidos por API quedan privados hasta pasar la auditoría de la YouTube API (formulario de auditoría pendiente) | `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN` |
  | LinkedIn | Listo (publica en el perfil personal de Robert; app ligada a la página nueva «La Creación del Robert»). Token de 2 meses, sin renovación automática: regenerarlo ~28 dic 2026 en developers → OAuth tools → token generator (openid profile w_member_social) | `LINKEDIN_TOKEN`; var `LINKEDIN_CLIENT_ID` |
  | TikTok | Sandbox «Pruebas» listo (Login Kit + Content Posting, user.info.basic + video.upload, sitio verificado, usuario de prueba lacreaciondelrobert). Falta: token (OAuth al construir el publicador) y, para producción, grabar un video demo con el sandbox y mandar a revisión | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` (del sandbox) |
  | X | No se hace (cobra por publicar) | — |
  Sitio con privacidad, términos y verificación de TikTok: https://roberthecoder.github.io/lacreaciondelrobert-shots/ (carpeta `docs/`).
  Tokens y claves: SIEMPRE como secretos de GitHub, nunca en el chat.
- Comprar créditos de ElevenLabs.
- Pedir revisión de YouTube (auditoría) y de TikTok (video demo) cuando exista el publicador.
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
