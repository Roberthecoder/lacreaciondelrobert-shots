# Estado del administrador (memoria de largo plazo)

Este archivo es la memoria del chat administrador. **Toda sesión administradora lo lee al empezar y lo actualiza al terminar algo importante**
(commit en main con `[sin render]`). Si el chat se compacta o se abre uno nuevo, aquí está todo lo que hace falta para seguir.
Escríbelo corto: estado actual y pendientes, no historia. La historia vive en git y en los `resultado` de la Sala.

Última actualización: 28 oct 2026, 16:10 UTC.

## Trabajador y tareas programadas
- Trabajador horario: sesión `session_0157fpgzNLGBRTM1nZnM7iLe` ("Mantenimiento de la Sala (trabajador horario)", modo auto,
  con el repo shots). La despierta cada hora la tarea `trig_01SiG3xGhgHwCiG4zpgKvWQS` (minuto 56). Para encargos inmediatos,
  el chat administrador le escribe con send_message. Si deja de responder: créala otra vez con el mismo encargo y re-apunta la tarea.
- Apagadas: "Producción intensiva" (trig_01URKCb81JFPMa9CtCnnjBN7) y "Lote diario" (trig_01VKwBbqWsjm5xKahYsA7RLd); se crearon
  fuera del chat, así que solo Robert puede lanzarlas ya desde claude.ai/code/routines.

## Estado de la Sala
- 60 shots: 10 por serie (9 normales + 1 especial de Día de Muertos en el #01). Todos con verificación de hechos independiente
  (28 oct) y `verificacion.md` con `VEREDICTO: APROBADO`.
- Robert aprobó la voz de los 52 que faltaban (28 oct). ElevenLabs se quedó sin créditos (0 de 40,000) a media tanda:
  23 alcanzaron voz; quedaron 30 con aprobación en la Sala (`aprobaciones/<clave>` procesado false) esperando créditos:
  qui-01-esp-calaveritas, 003-semillas-luna, bio-07, bio-08, cie-04..08, fun-05..09, ia-06..09, amb-05..09, qui-03..09.
  Robert dijo que va a comprar más créditos. Cuando haya: aprobar UNA RAMA A LA VEZ y solo lo que alcance (ver ADMIN.md).
- fun-01-esp-podredumbre-blanca: corrección de Robert (lignina no es "pegamento", enzimas no "tijeras", etiqueta del fósil
  encimada en ~50 s). Su voz se generó antes de la corrección y ya no sirve: tras corregirlo hay que pedirle a Robert que la apruebe otra vez.

## Ramas con trabajo que todavía NO está en main
claude/especiales-muertos, claude/verif-main, claude/clever-mayer-197rx7, claude/lucid-bardeen-igyhx5,
claude/eager-archimedes-mf5ln4, claude/clever-heisenberg-pspnud, claude/igualar-ambiental, claude/igualar-cientifico,
claude/igualar-fungi-mati, claude/igualar-ia, claude/igualar-quimico, claude/fun-02-hormiga-zombi.
Robert ya autorizó (28 oct): 1) juntarlas a main (sección 6 de PRODUCCION_NUBE.md) cuando terminen sus renders,
y 2) (reemplazado por la serie Shot Festivo, ver abajo: ya no se renumera).

## Decisiones de Robert que no están en otros archivos
- 28 oct: verificación estricta e independiente para TODO video, también los viejos. "No me importa el costo: arréglalos todos."
- 28 oct: la voz se genera solo con su aprobación; si cambia lo narrado, se le vuelve a pedir.
- 28 oct: quiere ver los créditos de ElevenLabs siempre actualizados en la Sala (doc `estado/creditos`).
- 28 oct: quiere un sistema que funcione indefinidamente: trabajador horario + este archivo + respuestas cortas.
- Especiales de Día de Muertos: se quedan en el #01 de cada serie (regla de calendario de CLAUDE.md).

## Decisión de Robert, 28 oct (pendiente de aplicar): serie "Shot Festivo"
- Las festividades ya NO reservan números en las series normales. Nueva serie **Shot Festivo** con numeración propia (#01, #02…)
  en orden de publicación; cada festivo va vinculado a una serie/temática (Fungi Mati, IA, Químico, Robert…).
  Carpeta `fes-NN-<tema>/`, título «Shot Festivo #NN · <Festividad> · <Serie vinculada>: <título>», campos `especial` y `serie_vinculada`.
- Los 6 especiales de Día de Muertos pasan a Festivo #01 monarcas (Ambiental), #02 pan de muerto (Biotecnológico),
  #03 podredumbre blanca (Fungi Mati), #04 esqueleto (Científico), #05 fotos de la ofrenda (IA), #06 calaveritas (Químico).
  La voz no cambia (se reutiliza la guardada).
- **Duración de los festivos: 61–75 s** (Robert, 28 oct). Las series normales siguen en 61–62 s.
- Las series normales se quedan #01–#09 sin huecos: ya NO hace falta renumerarlas.
- Hay que actualizar CLAUDE.md (sección de numeración), CANAL.md, calendario/ (festividades = lista de ideas; antes de cada
  festividad se hacen sus festivos), la Sala (sección "Shots festivos" y tipo de pedido "Festivo") y el prompt del trabajador.
- Orden acordado: primero terminar la subida de narrados, luego juntar ramas a main, luego aplicar esto en main.

## Pendientes de Robert (él tiene que hacerlos)
- Comprar créditos de ElevenLabs.
- Pedir acceso a las API de redes (se le dio un PDF con instrucciones el 28 oct).
- Borrar o no publicar los narrados viejos con errores que siguen en los Releases y en lacreaciondelrobert-archivo.
