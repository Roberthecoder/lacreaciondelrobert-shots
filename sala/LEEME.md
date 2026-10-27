# Sala de Shots (panel de Robert)

Página publicada en **https://claude.ai/artifact/KBt7kaF2DPUjT5HBiQZMBv** (fijada en la barra lateral de Robert en claude.ai).
`index.html` es su código. Para cambiar el diseño: edita este archivo y publícalo con la herramienta `Artifact`
(action "publish", `url` de arriba, `file_path` = sala/index.html). Antes, léela con `Artifact` action "read" por si cambió.

Datos (herramienta `ArtifactData`, misma url):
- `shots/<clave>`: serie, numero, titulo, estado (En producción · Por revisar · Voz aprobada · Narrado listo), caracteres,
  video y poster (ids de assets), kind, dur, hd (enlace al MP4 completo), rama.
- `aprobaciones/<clave>`: {aprobado, at, procesado}. Las procesa la nube (CLAUDE.md, "Sala de Shots").
- `pedidos/<id>`: {tipo, serie, idea, estado, creado, resultado}. Ver CLAUDE.md, "Pedidos desde la Sala".
Videos: versiones ligeras (480 px) que hace `motor/sala.py`, subidas como assets de la página.
