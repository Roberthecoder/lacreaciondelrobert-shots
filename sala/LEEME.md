# Sala de Shots (panel de Robert)

Página publicada en **https://claude.ai/artifact/KBt7kaF2DPUjT5HBiQZMBv** (fijada en la barra lateral de Robert en claude.ai).
`index.html` es su código. Para cambiar el diseño: edita este archivo y publícalo con la herramienta `Artifact`
(action "publish", `url` de arriba, `file_path` = sala/index.html). Antes, léela con `Artifact` action "read" por si cambió.

Datos (herramienta `ArtifactData`, misma url):
- `shots/<clave>`: serie, numero, titulo, estado (En producción · Por revisar · Voz aprobada · Narrado listo), caracteres,
  video y poster (ids de assets), kind, dur, hd (enlace al MP4 completo), rama.
  Documentales y videos largos 16:9: además `largo: true` (o `formato: "16:9"`), `idioma` ("es-419"/"en"), y si su MP4
  no se llama `<clave>.mp4`, `video_publicar` (nombre del archivo) y `release` (tag). Con eso la Sala muestra el reproductor
  y la tarjeta horizontales y el botón «Publicar» ofrece solo YouTube con su privacidad (público · no listado · privado).
- `publicaciones/<id>`: pedidos de publicar (botón «Publicar»). Los procesa el administrador (ADMIN.md, «Publicar en redes»).
- `aprobaciones/<clave>`: {aprobado, at, procesado}. Las procesa la nube (CLAUDE.md, "Sala de Shots").
- `pedidos/<id>`: {tipo, serie, idea, estado, creado, resultado}. Ver CLAUDE.md, "Pedidos desde la Sala".
Videos: versiones ligeras (480 px) que hace `motor/sala.py`, subidas como assets de la página.
