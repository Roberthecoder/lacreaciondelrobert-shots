# Estado del administrador (memoria de largo plazo)

Este archivo es la memoria del chat administrador. **Toda sesión administradora lo lee al empezar y lo actualiza al terminar algo importante**
(commit en main con `[sin render]`). Si el chat se compacta o se abre uno nuevo, aquí está todo lo que hace falta para seguir.
Escríbelo corto: estado actual y pendientes, no historia. La historia vive en git y en los `resultado` de la Sala.

Última actualización: 28 oct 2026, 17:45 UTC.

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
- Comprar créditos de ElevenLabs.
- Pedir acceso a las API de redes (se le dio un PDF con instrucciones el 28 oct).
- Borrar o no publicar los narrados viejos con errores que siguen en los Releases y en lacreaciondelrobert-archivo.

## Voz pendiente (28 oct, tarde)
- En main, a los 29 shots aprobados SIN voz guardada válida se les quitó `voz_aprobada` para que ningún push los mande a
  ElevenLabs todos a la vez. La aprobación de Robert sigue en la Sala (`aprobaciones/<clave>`, procesado false).
  El trabajador (o el admin) vuelve a poner `voz_aprobada` en main solo a los que alcancen los créditos, en tandas pequeñas
  (máx. 3 por push) y esperando cada render. Lista: ver `git log` del commit "Voz pendiente: quito voz_aprobada…".
- Todo vive ya en main (las ramas viejas se juntaron). Los cambios de shots se hacen en main o en una rama nueva que se junta después.
