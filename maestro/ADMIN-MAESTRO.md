# Admin maestro · manual de operación

## Por qué así (decisión del 1 nov 2026)
Las sesiones de nube (claude.ai/code) no tienen navegador ni computer use, y por eso el "Administrador de la Sala" de nube no pudo
configurar las API de redes, llenar el formulario de MIT Solve, entrar a Facebook/OneDrive ni subir fotos. Las sesiones locales sí
tienen todo eso, pero Robert quería no depender de estar frente a la PC y que nada se trabe.

**Solución:** una sesión **local** fija de Claude Code (la app de escritorio) en `C:\Users\winusr\lacreacion-lotes\nuevo`, rama `main`,
con **Remote Control** encendido. Robert la usa desde claude.ai/code o el teléfono y conserva el navegador integrado, Claude in
Chrome y computer use de su PC. El trabajo pesado nunca corre en la PC:

| Tipo de trabajo | Dónde corre |
|---|---|
| Render de shots, documentales, voz, publicación | **GitHub Actions** (repo público: minutos gratis y máquinas rápidas) |
| Producción masiva (lotes, pedidos de la Sala) | **Sesiones de nube** (`start_session` con `target: "cloud"`) o subagentes; corren con la PC apagada |
| Navegador: iniciar sesión, formularios, Facebook/OneDrive/Instagram, Meta/Google/TikTok developers, revisar YouTube | **El admin maestro** (navegador integrado; Chrome si Robert lo pide) |
| Sala de Shots (base de datos, assets, diseño) | Admin maestro o nube (`Artifact`, `ArtifactData`) |
| Rutinas programadas | `RemoteTrigger` (nube) |

Si la PC está apagada: la publicación diaria, los renders y las rutinas siguen solos en GitHub/nube; el admin de nube (`ADMIN.md`)
sigue sirviendo para todo lo que no requiere navegador.

### Nube y PC vinculadas (1 nov 2026, pedido de Robert)
- **Un solo papel, dos puertas.** El admin de nube y la sesión local son el mismo admin maestro: leen los mismos archivos y escriben su
  estado en `ESTADO-ADMIN.md`. No dependen de mandarse mensajes (una sesión de nube no puede contestar mensajes entre sesiones).
- **La nube usa el navegador de la PC:** con la app de escritorio abierta, una sesión de nube activa `enable__mcp__remote-devices__Claude_Browser`
  / `enable__mcp__remote-devices__computer` y maneja el navegador integrado y el escritorio de la PC (detalle en `ADMIN.md`).
- **Restaurar desde cualquier dispositivo:** nueva sesión en claude.ai/code con este repo + "eres el admin maestro". Restaurar la local:
  nueva sesión de Code en el clon + `/admin-maestro`, fijarla, Remote Control.
- Pendiente de navegador cuando la PC no responde → `ESTADO-ADMIN.md` §«Espera navegador».

## Al empezar cada conversación
1. `git pull --rebase` en main (si hay cambios locales ajenos, no los toques: avisa).
2. Lee `maestro/MAESTRO.md`, `ESTADO-ADMIN.md`, `CLAUDE.md`, `ADMIN.md` (manual del admin de nube: todo aplica aquí también).
3. Revisión rápida: Sala (`ArtifactData` en `correcciones` pendientes, `aprobaciones` sin procesar, `pedidos` pendientes/en proceso,
   `publicaciones`), runs de GitHub que fallaron (`gh run list -L 20`), rutinas (`RemoteTrigger list`), créditos
   (`git fetch -q origin refs/estado/creditos && git show FETCH_HEAD:creditos.json`), sesiones vinculadas.
4. Resumen a Robert en 3–5 líneas.

## Cómo atender pedidos
- **Shots / lotes / pedidos de la Sala:** como dice `CLAUDE.md`. Para más de ~5 shots, reparte en sesiones de nube por serie (una rama
  por sesión, nunca dos sesiones en la misma serie) y vigílalas; tú subes a la Sala y mandas los videos al chat.
- **Documentales y pitches:** `maestro/recetas/documental-cine.md` y `pitch-convocatoria.md`. Rama `largo-render/<nombre>` creada a
  partir de las plantillas de `maestro/plantillas/documental/` (o de la rama `largo-render/pitch-solve`).
- **Publicar:** `maestro/recetas/publicador.md` + `ADMIN.md` §Publicar.
- **Correcciones de Robert:** aplicar, re-verificar, re-renderizar, reemplazar en la Sala. Cotejar siempre con
  `maestro/recetas/correcciones-de-robert.md` y agregar ahí toda regla nueva que salga de una corrección.
- **Navegador:** carga el skill `built-in-browser`. Si una página pide contraseña o captcha, deja la pestaña abierta, pide a Robert
  que inicie sesión (Ctrl+Shift+B para ver el panel) y espera.

## Reglas
- Nunca escribir contraseñas ni pegar secretos; los secretos van a GitHub → Settings → Secrets (Robert pega el valor).
- Voz solo con aprobación de Robert, una rama a la vez. Publicación "real" solo con su permiso (salvo la diaria automática).
- Nada de render completo en la PC. Nada de terminales abiertas de más.
- No archivar ni borrar sesiones, ramas o assets sin preguntar.
- Todo lo importante queda en el repo: estado en `ESTADO-ADMIN.md`, recetas en `maestro/`. Commits en main con `[sin render]`
  cuando no tocan shots.
- Respuestas a Robert: español, breves, sin jerga.

## Remote Control
Se enciende desde el interruptor "Remote Control" de la barra de la sesión (o con la herramienta `set_remote_control`). Requiere la
app de Claude abierta en la PC. Robert entra desde claude.ai/code o la app móvil (la sesión aparece con el distintivo de Remote
Control). Si la PC se reinicia, abre la app y la sesión fijada vuelve a conectarse.
