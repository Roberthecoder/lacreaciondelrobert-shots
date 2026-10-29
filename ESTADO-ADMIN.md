# Estado del administrador (memoria de largo plazo)

Este archivo es la memoria del chat administrador. **Toda sesión administradora lo lee al empezar y lo actualiza al terminar algo importante**
(commit en main con `[sin render]`). Si el chat se compacta o se abre uno nuevo, aquí está todo lo que hace falta para seguir.
Escríbelo corto: estado actual y pendientes, no historia. La historia vive en git y en los `resultado` de la Sala.

Última actualización: 29 oct 2026, 01:40 UTC.

## PEDIDO DE 300 SHOTS (29 oct) — LISTO (16:02 UTC)
- TERMINADO: 300/300 en la Sala (verificados, sin voz) + fes-07…fes-16. Pedido marcado "listo". Ya no hay que vigilar ni despertar
  las 7 sesiones. PENDIENTE: juntar las 7 ramas `pedido300/*` a main (sección 6 de PRODUCCION_NUBE.md, `[sin render]`).
- Pedido de la Sala `zu488o6qtt10bvn5j11h` (tipo serie, 50 de cada serie normal, total 300). Estado "en proceso".
- 7 sesiones de nube (etiqueta `pedido300`), cada una en su rama, tandas de 5, suben a la Sala y suman a `hechos`:
  fun `session_0157fph1NsHjWsqeMnXBaXMC` (pedido300/fun) · bio `session_0157fpgzxExWfmVZJcsaQUpg` (pedido300/bio) ·
  amb `session_0157fpgyQN2cResjbZJ8rqUe` (pedido300/amb) · cie `session_0157fph1uV37Qq24qkDs6MNb` (pedido300/cie) ·
  qui `session_0157fpgzuJM3ymsKtSoqvmnt` (pedido300/qui) · ia `session_0157fph3W4CN9EzPqt8DUqEt` (pedido300/ia) ·
  festivos extra fes-07…fes-16 (10 nov–14 feb) `session_0157fpgyNNigAR2Ks9KZrcRx` (pedido300/festivos; no suman a hechos).
- Números: #10–#59 de cada serie (publicación hasta 25–26 feb 2027).
- **Vigilancia (trabajador horario y admin):** cada hora `get_session` de las 7; si una está inactiva (idle/failed) y no ha terminado
  (cuenta carpetas en su rama), mándale con send_message: "Sigue con tu encargo del pedido 300 desde donde vas." Si falla algo
  de fondo, avisa en ESTADO-ADMIN. Cuando `hechos == 300`, pon el pedido en "listo".
- Juntar a main: cada ~25 shots terminados por rama, merge de `origin/pedido300/*` a main con `[sin render]` (sección 6 de
  PRODUCCION_NUBE.md; `.github/` como en main; `node historial/consolidar.mjs`).
- 29 oct 02:15–04:20 UTC: las 7 sesiones se pararon por el límite de uso de 5 horas de la cuenta; a las 04:36 el trabajador
  les pidió seguir (Robert: "reanuda absolutamente todo"). Iban 8/300 en la Sala. Si vuelve a pasar: esperar al reinicio y reanudar.
- 29 oct 05:12–07:00 UTC: segunda parada, ahora por el límite SEMANAL de uso; reanudadas a las 07:58 con 84/300. Al ritmo de 7
  sesiones en paralelo el límite se agota en ~3 h; si se repite, conviene preguntarle a Robert si baja a menos sesiones.
- 29 oct 09:59: sesión de festivos TERMINADA (fes-07…fes-16 en pedido300/festivos, los 10 con VEREDICTO: APROBADO y en la Sala;
  fes-14 cambió a razas de maíz). Ya no hay que despertarla; falta juntar su rama a main.
- 29 oct 10:57: Químico TERMINADO (50/50). En ramas con VEREDICTO: amb 50, cie 50, qui 50, ia 50, bio 45, fun 35 (=280); Sala hechos=250.
- 29 oct 15:03: las 300 carpetas tienen VEREDICTO en sus ramas; en la Sala están 290 (faltan fun-50…fun-59, ya en la rama). La sesión fun
  se paró por el límite de 5 h (reinicio 14:50) y se reanudó a las 15:03. Las otras 5 series y festivos están completas en la Sala.
- 29 oct 07:58: el aviso falló al instante (límite de 5 h otra vez, reinicio 09:30). Reanudadas de nuevo a las 09:58; siguen en 84/300.
- Espacio de la Sala: 1 GB; con 60 shots iba en 118 MB (~2 MB por shot) → caben los 310. Revisar si pasa de 900 MB.

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
- 28 oct: verificación estricta e independiente para TODO video, también los viejos. "No me importa el costo: arréglalos todos."
- 28 oct: la voz se genera solo con su aprobación; si cambia lo narrado, se le vuelve a pedir.
- 28 oct: quiere ver los créditos de ElevenLabs siempre actualizados en la Sala (doc `estado/creditos`).
- 28 oct: quiere un sistema que funcione indefinidamente: trabajador horario + este archivo + respuestas cortas.

## Serie "Shot Festivo" (decisión de Robert, 28 oct) — HECHO
- Reglas en CLAUDE.md ("Numeración = fecha de publicación, y serie Shot Festivo"), CANAL.md, `calendario/` (fecha.py `festivos`,
  especiales.json = festivos hechos) y la Sala (sección "Shots festivos" y pedido "Festivo"). 61–75 s.
- Falta: actualizar el encargo del trabajador horario para que revise `python3 calendario/fecha.py festivos` antes del lote.

## Pendientes técnicos
- ia-04-huella (64 s) y bio-01-ramas (63.7 s): recortar guion y regenerar voz cuando haya créditos.

## Pendientes de Robert (él tiene que hacerlos)
- **RECORDARLE al terminar la configuración de las API de redes:** cancelar la prueba gratuita de un mes de Meta Verified
  (verificación de Instagram/Facebook) antes de que se renueve y cobre. Lo pidió el 28 oct.
- **API de redes: configuradas el 29 oct** (todavía no se publica nada; falta construir el publicador).
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
