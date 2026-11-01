# MAESTRO · Todo el sistema de contenido de La Creación del Robert en un solo lugar

Escrito el 1 nov 2026 a partir de: los transcripts completos de las sesiones "Sistema de shots científicos" (y su bifurcación),
"Build the automatic social publisher" (×2), "MIT Solve: corregir formulario y video pitch", "Core video #00" (solo lectura),
"Banner LinkedIn", "Proyectos pausados", la Sala de Shots (base de datos), las rutinas de nube, todas las ramas de este repo
y las carpetas locales de `C:\Users\winusr\lacreacion-lotes\`.

**Regla de oro:** este repo es PÚBLICO. Nada de contraseñas, tokens, claves ni fotos personales sueltas aquí. Los secretos viven
solo en GitHub → Settings → Secrets (nombres en `INVENTARIO.md`). Las fotos personales originales viven en el repo privado
`Roberthecoder/lacreaciondelrobert-archivo`.

## 1. Mapa (qué hay y dónde)

| Pieza | Dónde vive | Documento que manda |
|---|---|---|
| Reglas de los shots verticales (61–62 s, ganchos, Robert en pantalla, verificación) | `CLAUDE.md` (raíz) | `CLAUDE.md` + `maestro/recetas/shot-vertical.md` |
| Motor de animación (Claude Design + kit) | `motor/` (`render.mjs`, `preview.mjs`, `narrar.mjs`, `kit/`) | `motor/kit/LEEME.md` |
| Sonido oficial (volúmenes) | `motor/mezcla.json` | `maestro/recetas/shot-vertical.md` §Sonido |
| Render automático de shots | `.github/workflows/auto-render.yml`, `renderizar.yml`, `videos-al-chat.yml` | `PRODUCCION_NUBE.md` |
| **Documentales de cine (Core video #00)** | rama `largo-render/largo00-cine` (+ cambios locales sin commit de la sesión Core) · copia de plantilla en `maestro/plantillas/documental/` | `maestro/recetas/documental-cine.md` |
| **Pitch para convocatorias (MIT Solve)** | rama `largo-render/pitch-solve` · copia en `maestro/plantillas/documental/` | `maestro/recetas/pitch-convocatoria.md` |
| Sala de Shots (panel de Robert) | https://claude.ai/artifact/KBt7kaF2DPUjT5HBiQZMBv · código `sala/index.html` | `sala/LEEME.md` |
| Publicador de redes (6 redes) | `motor/redes/publicar.py`, `.github/workflows/publicar*.yml`, `renovar-tokens.yml`, `publicar/` | `maestro/recetas/publicador.md` |
| Calendario y numeración | `calendario/` | `CLAUDE.md` §Numeración |
| Banco de temas | `historial/temas.json` + `historial/nuevos/` | `CLAUDE.md` §Reglas de contenido |
| Memoria del administrador | `ESTADO-ADMIN.md` (estado), `ADMIN.md` (manual del admin de nube) | — |
| Correcciones de Robert (lo que no debe repetirse) | — | `maestro/recetas/correcciones-de-robert.md` |
| Inventario de sesiones, ramas, carpetas, secretos y rutinas | — | `maestro/INVENTARIO.md` |
| Manual del **admin maestro** (sesión local con navegador + Remote Control) | — | `maestro/ADMIN-MAESTRO.md` |

## 2. Cómo se usa (para Robert, en corto)
1. Abre la sesión fijada **"Admin maestro · La Creación del Robert"** (barra lateral de Claude, sección fijadas). Desde el teléfono o
   claude.ai/code entra con el botón de **Remote Control** de esa sesión (tu PC debe estar prendida con la app de Claude abierta).
2. Pídele lo que sea en una línea: "hazme 5 shots de IA", "atiende mis pedidos", "corrige el shot X", "hazme un documental de…",
   "publica…", "revisa cómo va el render". El admin decide qué va a GitHub (render pesado), qué hace en la Sala y qué hace con el
   navegador (iniciar sesión en redes, formularios, Facebook, OneDrive).
3. Tú solo: contraseñas e inicios de sesión, pagar, y aprobar voces y publicaciones.

## 3. Respuestas con evidencia (1 nov 2026)

### (a) ¿El admin de la Sala de Shots realmente controla la Sala?
**Sí, para todo lo que pasa por la base de datos de la Sala y por git; no, para nada que necesite navegador.**
- Evidencia de que sí: los pedidos de la Sala (`pedidos/*`) los toma y cierra el admin de nube (p. ej. `igualar-ia`,
  `igualar-quimico`: «NO TOMAR: lo produce la sesión de administración de la Sala desde el 28 oct»; el pedido de 300 shots
  `zu488o6qtt10bvn5j11h` quedó `listo` con `hechos: 300`). Las rutinas de nube activas hoy (publicar festivos 03/05/06, revisar
  festivo 04, recordatorio de Meta Verified) fueron creadas por el admin con `RemoteTrigger`. `ADMIN.md` le da `Artifact`,
  `ArtifactData`, `RemoteTrigger`, git y `gh`.
- Límites reales:
  1. **Sin navegador ni computer use**: no puede iniciar sesión en redes, Facebook, OneDrive, Meta Business, Google Cloud, ni llenar
     formularios web (por eso las API de redes y el formulario de MIT Solve se hicieron desde sesiones locales).
  2. No puede lanzar `workflow_dispatch` directo si `gh` no tiene token en la nube: usa archivos-gatillo (`publicar/pedidos/*.json`,
     `render.txt`, `subir.txt`).
  3. El **trabajador horario** (`trig_01SiG3xGhgHwCiG4zpgKvWQS`, "Mantenimiento de la Sala") está **apagado desde el 30 oct**:
     hoy nadie revisa correcciones/aprobaciones cada hora si el admin no está abierto.
  4. Las rutinas "Producción intensiva" y "Lote diario" están apagadas.
- Solución aplicada: el **admin maestro local** (sección 5) tiene todo lo del admin de nube **más** navegador integrado, Chrome y
  computer use, y se usa a distancia con Remote Control.

### (b) ¿Las fórmulas refinadas quedaron guardadas?
| Fórmula | ¿En GitHub? | ¿En main? | Notas |
|---|---|---|---|
| Shots verticales (reglas, ganchos, kit, sonido, verificación) | Sí | **Sí** | `CLAUDE.md`, `motor/`, `motor/mezcla.json`, `referencias-externas/` |
| Publicador de redes | Sí | **Sí** | `motor/redes/`, workflows `publicar*.yml` |
| Pitch MIT Solve (estilo cine 4K, voz v3, música generada, mezcla −14 LUFS, subida a YouTube) | Sí, rama huérfana `largo-render/pitch-solve` (1d56a1f) | **No** (hasta este PR) | Ahora: receta + copia del código en `maestro/` |
| Core video #00 (estilo cine, 33 escenas redibujadas, render en 67 máquinas) | Sí, rama huérfana `largo-render/largo00-cine` (cc09317) | **No** (hasta este PR) | **Las correcciones del 31 oct–1 nov están SIN COMMIT** en la carpeta local de la sesión Core (ver INVENTARIO §Pendientes). No se tocaron porque su render está en curso. |
| Restauración de fotos (Real-ESRGAN + GFPGAN) | Solo en transcript | No | Documentada ahora en `documental-cine.md` |
| Correcciones de Robert (biología, historia personal, estética) | Dispersas en chats | No | Consolidadas en `correcciones-de-robert.md` |

**Lo que faltaba y se subió con este PR:** carpeta `maestro/` completa (este índice, inventario, 5 recetas, manual del admin
maestro) + `maestro/plantillas/documental/` (copia exacta del motor de documentales y del flujo de voz/música/YouTube) +
el skill `.claude/skills/admin-maestro/` + sección nueva al inicio de `CLAUDE.md`.

**Lo que sigue faltando (no se podía hacer sin romper la regla de no tocar el render en curso):**
1. Que la sesión Core video #00 haga commit/push de sus cambios locales cuando termine (está en `largo-render/largo00-cine`).
2. Portar a `motor/render.mjs` de main las banderas `--escala`, `--desde` y `--gpu` (están en
   `maestro/plantillas/documental/motor/render-con-escala-desde-gpu.mjs`); hoy los documentales usan el `render.mjs` de su rama.
3. Hacer genérico `render-largo.yml` (hoy tiene la carpeta del largo escrita adentro) para que la sección Documentales de la Sala
   produzca cualquier documental desde main (Robert lo pidió el 31 oct).
4. Volver a encender el trabajador horario o dejar que el admin maestro haga esa revisión al abrirse.

## 4. Reglas que nunca se rompen (de Robert)
- Todo video es **verídico** (verificación independiente antes de animar; `VEREDICTO: APROBADO`).
- **Voz** de ElevenLabs solo con aprobación de Robert, una rama a la vez (error 429 de concurrencia), avisando el costo.
- **Publicar** en redes: la publicación diaria automática tiene permiso permanente (30 oct); cualquier otra publicación "real"
  necesita su permiso para ESA publicación.
- Contraseñas: siempre las escribe Robert en el navegador. Nunca en el chat ni en el repo.
- Nunca usar la API de Claude (`CLAUDE_API_KEY`) para producir: todo con sesiones.
- No hacer render pesado en la PC de Robert: se le traba. Todo render completo va a GitHub Actions (repo público = minutos gratis).
- Respuestas a Robert: español, cortas, sin jerga. Videos al chat (no enlaces).

## 5. El admin maestro
Ver `maestro/ADMIN-MAESTRO.md`. Resumen: sesión local de Claude Code en `C:\Users\winusr\lacreacion-lotes\nuevo` (rama main),
fijada en la barra lateral, con Remote Control encendido. Lee este archivo al empezar. Delega el render a GitHub, la producción
masiva a sesiones de nube (sin navegador), y se queda con lo que necesita navegador o la PC.
