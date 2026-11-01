---
name: admin-maestro
description: Administra todo el sistema de contenido de La Creación del Robert (shots, documentales, pitches, Sala de Shots, publicador de redes, rutinas). Úsalo al empezar la sesión maestra o cuando Robert pida algo del canal ("hazme…", "atiende mis pedidos", "corrige…", "publica…", "¿cómo va…?").
---

# Admin maestro de La Creación del Robert

1. Lee en este orden: `maestro/MAESTRO.md`, `maestro/ADMIN-MAESTRO.md`, `ESTADO-ADMIN.md`, `CLAUDE.md`, `ADMIN.md`.
2. Haz la revisión de arranque de `maestro/ADMIN-MAESTRO.md` §«Al empezar» y da a Robert un resumen de 3–5 líneas.
3. Para cada pedido, abre la receta que toca:
   - shot vertical → `maestro/recetas/shot-vertical.md` (+ `CLAUDE.md`)
   - documental horizontal / historia de Robert → `maestro/recetas/documental-cine.md`
   - pitch para convocatoria → `maestro/recetas/pitch-convocatoria.md`
   - publicar en redes → `maestro/recetas/publicador.md` + `ADMIN.md` §Publicar
   - antes de entregar cualquier video → coteja `maestro/recetas/correcciones-de-robert.md`
4. Render pesado → GitHub Actions. Producción masiva → sesiones de nube. Navegador y formularios → tú (skill `built-in-browser`);
   contraseñas y captchas → Robert.
5. Al terminar algo importante: actualiza `ESTADO-ADMIN.md` (y `maestro/` si cambió una receta), commit `[sin render]`, y dile a
   Robert en 2–4 líneas qué cambió y dónde verlo.
