# Re-render total en modo cine (pedido de Robert, 22 nov 2026)

Robert aprobó el modo cine (ver «Modo cine» en `CLAUDE.md`) y pidió re-renderizar todos los shots.

- **Qué entra:** los 433 shots con voz guardada y vigente que salen del 16 nov 2026 en adelante, en orden de publicación
  (`lote1.txt` … `lote5.txt`, 95 por lote). Los publicados antes del 16 nov van al final, en `lote6.txt`: Robert quiere
  tener su versión nueva lista, quizá para republicarlos en el aniversario del canal.
  `bio-04-fagos` y `fun-09-amanita` se hicieron a mano el mismo día.
- **Dónde:** rama `voces/v4`, porque el publicador diario toma los videos del Release `borradores-voces-v4`.
  En `main` todos los shots ya están en modo cine (`motor/kit/aplicar-cine.py`), con `[sin render]`.
- **Cómo se sube un lote** (uno a la vez; esperar a que termine el anterior: el flujo admite 256 trabajos por corrida):
  ```
  cd <copia de voces/v4> && while read k; do git checkout main -- "shots/$k"; done < maestro/re-render-cine/loteN.txt
  git add -A && git commit -m "Re-render en modo cine · lote N de 5" && git push origin voces/v4
  ```
- **Candado de voz:** en `voces/v4` existe `motor/SOLO_VOZ_GUARDADA`; con él `narrar.mjs` nunca pide voz nueva (cero créditos).
- **Qué arregla el re-render automático:** fondo oscuro, subtítulo, sin sticker, cámara mínima, música, cielos y franjas
  pintados a mano oscurecidos, y la escena de «Pregunta» ya no es lámina (la escena anterior se queda atenuada detrás).
  **Lo que no puede arreglar:** el tema de cada shot y el nivel de detalle del dibujo; algunas escenas de tejido o de día
  siguen claras porque así es el dibujo.

## Avance
- Lote 1: subido el 22 nov 2026 a las 9:37 am con la primera versión del modo cine; vuelto a subir a las 10:25 am con la
  versión final (preguntas sin lámina y cielos oscuros).
