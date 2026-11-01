# Admin maestro · manual de operación

## Diseño (decisión de Robert, 1 nov 2026)
> "La idea es que yo pudiera coordinar todo desde la nube, solo creando entornos locales cuando fuera indispensable, y todos esos
> entornos deberían mandar o hacer lo que la nube requiriera, y luego autodestruirse. No quiero chats locales permanentes."

1. **El admin maestro vive en la NUBE** (sesión de claude.ai/code con este repo, entorno con red completa). Robert lo abre desde
   cualquier dispositivo. Funciona con la PC apagada.
2. **La PC se usa sin chat local**: cuando la app de escritorio de Claude está abierta, la sesión de nube activa
   `enable__mcp__remote-devices__Claude_Browser` (navegador integrado de la PC) o `enable__mcp__remote-devices__computer` (escritorio)
   y hace el trabajo de navegador directamente (ver `ADMIN.md` «Eres el admin maestro»). Esta es la vía preferida.
3. **Entorno local temporal, solo si es indispensable** (algo que exige correr programas en la PC: Real-ESRGAN/GFPGAN, archivos que solo
   están en la PC, una herramienta que la nube no tiene). Reglas:
   - Lo pide el maestro con un **encargo cerrado** escrito en `maestro/encargos/<AAAAMMDD>-<tema>.md` (qué hacer, qué entregar, dónde).
   - Lo toma solo el **puente local**: tarea de la app de escritorio SIN horario (solo «Ejecutar ahora», lo pulsa el maestro con `remote-devices` computer o Robert) que abre una sesión local nueva, revisa
     `maestro/encargos/` y, si hay un `ESTADO: PENDIENTE`, lo hace (detalle y texto en `maestro/encargos/LEEME.md` y
     `PUENTE-tarea-programada.md`). Nunca corre periódicamente.
   - El entorno hace SOLO eso, entrega el resultado en git (rama propia o el lugar que diga el encargo) o en la Sala, escribe al final
     del encargo `ESTADO: HECHO` + una línea de resultado, hace push y **se archiva solo** (`archive_session` "self"). Sin Remote
     Control, sin fijarse, sin quedarse abierto.
   - El maestro de nube revisa el encargo y el resultado con `git fetch` y sigue.
4. **El render pesado** siempre en GitHub Actions; la **producción masiva** en sesiones de nube o subagentes.
5. Todo el estado vive en el repo (`ESTADO-ADMIN.md`, `maestro/`). Ningún chat es indispensable: cualquier sesión de nube nueva con este
   repo + "eres el admin maestro" restaura el papel completo.

| Tipo de trabajo | Dónde corre |
|---|---|
| Coordinar, Sala, pedidos, correcciones, git, rutinas (`RemoteTrigger`) | Maestro de nube |
| Render de shots/documentales, voz, publicación | GitHub Actions |
| Producción masiva | Sesiones de nube o subagentes del maestro |
| Navegador: iniciar sesión, formularios, Facebook/OneDrive, paneles de developers | Maestro de nube con `remote-devices` (PC encendida con la app abierta) |
| Programas que solo corren en la PC | Entorno local temporal (encargo → hacer → push → archivarse) |

Si la PC no está disponible, lo que necesite navegador o PC se anota en `ESTADO-ADMIN.md` §«Espera navegador».

## Al empezar cada conversación (maestro de nube)
1. `git fetch origin && git pull`. Lee `maestro/MAESTRO.md`, `ESTADO-ADMIN.md`, `CLAUDE.md`, `ADMIN.md` y este archivo.
2. Carga `Artifact`, `ArtifactData`, `RemoteTrigger` (ToolSearch). Las `enable__mcp__remote-devices__*` solo cuando haga falta.
3. Revisión rápida: Sala (`correcciones` pendientes, `aprobaciones` sin procesar, `pedidos` pendientes/en proceso, `publicaciones`), runs de
   GitHub fallidos (`gh run list -L 20` si `gh` tiene token; si no, el conector de GitHub), rutinas, créditos
   (`git fetch -q origin refs/estado/creditos && git show FETCH_HEAD:creditos.json`), encargos locales abiertos (`maestro/encargos/`).
4. Resumen a Robert en 3–5 líneas.

## Cómo atender pedidos
- Shots / lotes / pedidos de la Sala: `CLAUDE.md`. Más de ~5 shots: repartir en sesiones de nube por serie (una rama por sesión).
- Documentales y pitches: `maestro/recetas/documental-cine.md` y `pitch-convocatoria.md`.
- Publicar: `maestro/recetas/publicador.md` + `ADMIN.md` §Publicar.
- Correcciones: aplicar, re-verificar, re-renderizar, reemplazar en la Sala; cotejar con `maestro/recetas/correcciones-de-robert.md` y
  agregar ahí toda regla nueva.

## Reglas
- Contraseñas y captchas: siempre Robert, en el navegador. Nunca secretos en el chat ni en el repo.
- Voz solo con aprobación de Robert, una rama a la vez. Publicación "real" solo con su permiso (salvo la diaria automática).
- Nada de render completo en la PC. Ningún chat local permanente.
- No borrar ramas ni assets sin preguntar.
- Al terminar algo importante: `ESTADO-ADMIN.md` + commit `[sin render]`. Respuestas a Robert: español, breves, sin jerga.
