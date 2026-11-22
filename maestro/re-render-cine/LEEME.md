# Re-render total en modo cine (pedido de Robert, 22 nov 2026)

Robert aprobó el modo cine (ver «Modo cine» en `CLAUDE.md`) y pidió re-renderizar todos los shots.

- **Qué entra:** los 433 shots con voz guardada y vigente que salen del 16 nov 2026 en adelante, en orden de publicación
  (`lote1.txt` … `lote5.txt`, 95 por lote). Los 24 publicados antes del 16 nov no se rehacen (ya están en las redes).
  `bio-04-fagos` y `fun-09-amanita` se hicieron a mano el mismo día.
- **Dónde:** rama `voces/v4`, porque el publicador diario toma los videos del Release `borradores-voces-v4`.
  En `main` todos los shots ya están en modo cine (`motor/kit/aplicar-cine.py`), con `[sin render]`.
- **Cómo se sube un lote** (uno a la vez; esperar a que termine el anterior: el flujo admite 256 trabajos por corrida):
  ```
  cd <copia de voces/v4> && while read k; do git checkout main -- "shots/$k"; done < maestro/re-render-cine/loteN.txt
  git add -A && git commit -m "Re-render en modo cine · lote N de 5" && git push origin voces/v4
  ```
- **Candado de voz:** en `voces/v4` existe `motor/SOLO_VOZ_GUARDADA`; con él `narrar.mjs` nunca pide voz nueva (cero créditos).
- **Límites conocidos del re-render automático:** es la capa de estilo (fondo, subtítulo, sin sticker, cámara mínima, música).
  Las escenas tipo lámina de cada shot viejo (signo de interrogación, tarjetas) siguen ahí hasta rehacerlas a mano.

## Avance
- Lote 1: subido el 22 nov 2026, 9:53 am.
