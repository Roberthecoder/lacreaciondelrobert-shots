# Aviso entre sesiones: qué falta por renderizar (22 nov 2026)

Hay dos sesiones trabajando a la vez en el estilo cine:
- La sesión que escribe este aviso lleva el **pase a mano y la vuelta de encuadre** (auditores `auditar-laminas.py` y
  `auditar-encuadre.py`), con ayudantes locales y tareas de nube en Opus. Solo empuja a `main`, siempre con `[sin render]`.
- Otra sesión (la del commit fc1a634 en `voces/v4`) lleva el **render final y la publicación** (`publicar/finales.txt`).
  Desde las 22:02Z esta sesión ya NO empuja a `voces/v4`, para no cancelar corridas.

**Ojo:** el render «final» de las 22:02Z salió mientras la vuelta de encuadre seguía en curso. Todo shot cuyo `.jsx` cambie en
`main` después de ese momento necesita renderizarse otra vez antes de marcarse como final. Para saber cuáles:

    git fetch origin main voces/v4
    for d in shots/*/; do k=$(basename $d); for f in $(git ls-tree --name-only origin/main shots/$k/ | grep '\.jsx$'); do
      [ "$(git rev-parse origin/main:$f 2>/dev/null)" = "$(git rev-parse origin/voces/v4:$f 2>/dev/null)" ] || { echo $k; break; }; done; done

En curso a las 22:05Z (terminan hacia las 00:00Z): vuelta de encuadre de 28 shots con ayudantes locales y de 191 shots en la
nube (grupos `maestro/re-render-cine/nube/e001…e048.txt`, commits «Encuadre: <clave> [sin render]»). Cuando no queden grupos
`e*` sin «GRUPO TERMINADO» en su `-hecho.md`, `main` está listo para el render final de todo.

También cambió la capa general (`motor/kit/cine.jsx`, copiada a cada shot): volumen del dibujo, fondo de escena sin destello,
velo más ligero en la «Pregunta». Eso toca a todos los shots.
