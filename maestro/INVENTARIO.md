# Inventario completo (1 nov 2026)

Solo nombres y ubicaciones. Ningún valor secreto.

## 1. Sesiones de Claude Code (app de escritorio, PC de Robert)

| Sesión | Id | Carpeta | Qué hizo / dónde quedó su trabajo |
|---|---|---|---|
| Sistema de shots científicos: setup y análisis de referencias | `local_0cbe5772-372f-4a7a-aa1a-8320ea31e252` | scratch `scratch-2026-10-26-28d6d0` | Origen de todo: clonó el repo, analizó 12 canales/120 videos (`referencias-externas/ANALISIS.md`, `FORMULA_VIRAL.md`, `RECETARIO.md`), construyó el kit, logos, shots 002/003, el sistema de nube, la Sala, los festivos y la configuración de las API (29 oct). Todo está en main. |
| …(bifurcación) | `local_8502f05a-5d52-4013-900d-e2282bfabe69` | igual | Copia de la anterior hasta el 29 oct (sin mensajes propios). |
| Build the automatic social publisher | `local_9b29277f-06f4-426a-8914-9649a384cf24` | `lacreacion-lotes\nuevo` | Publicador de 6 redes, publicación diaria, documentales a YouTube. En main. |
| Build the automatic social publisher (2) | `local_1f1292e7-8c91-4ec0-b6a5-b365c3414ef3` | `lacreacion-lotes\nuevo` | Subtarea del anterior (demo de TikTok). |
| MIT Solve: corregir formulario y video pitch | `local_2437dd8f-f88e-43cb-b8f5-7825387038ac` | `lacreacion-lotes\pitch-solve` (clon en rama `largo-render/pitch-solve`, limpio y empujado) | Formulario Solve 122850, pitch 4K, subida no listada a YouTube. Receta: `recetas/pitch-convocatoria.md`. |
| Core video #00: Robert's story script (**en curso, no tocar**) | `local_0ff66976-e908-4d5b-86d4-23c05ffa5785` | clon en scratch `…28d6d0\lacreaciondelrobert-shots`, rama `largo-render/largo00-cine` | Guion y animación de cine del largo #00. **Tiene cambios sin commit** (guion_final.md, cine-cap2/4/5, cine-extra, escenas.js, una foto, carpetas nuevas de fotos). |
| Banner LinkedIn personalizado | `local_370ee40b-6090-4c6c-90a0-c04c9a502287` | scratch `…27-a32dbd` | `banner.html` → `Descargas\linkedin_banner.png`. Textos: "Ingeniería en Biotecnología · Tec de Monterrey", "Del residuo al alimento: *hongos* y biotecnología.", "Micología aplicada · economía circular · divulgación científica". Sin logros (Robert los quitó). |
| Proyectos pausados: redes sociales y sueños | `local_5052fcd7-13a0-4005-9f6b-dbf991cf0e6c` | scratch `…26-2d6ca6` | Leyó OneNote y creó la página "Avances con Claude (26 oct 2026)" en la sección Sueños. Avisó de llaves en texto plano en OneNote. |
| Remaster lotes A–D, Long video #00, Cloud production system | (archivadas) | `lote-a…d`, `largo-00`, `sistema` (carpetas hoy vacías) | Su trabajo se juntó a main el 28 oct. |
| Consolidar sistema de publicación de videos (sesión madre de hoy) | `local_0110c37a-f88c-40ff-be30-5b5dafc7c324` | scratch `…11-01-098704` | Lanzó esta centralización y otras de convocatorias. |

### Sesiones de nube (claude.ai/code)
- **Administrador de la Sala** (chat fijo de Robert en la nube, manual `ADMIN.md`): no aparece en la lista local; se abre en
  claude.ai/code. Trabaja con `Artifact`, `ArtifactData`, `RemoteTrigger`, git.
- Trabajador horario `session_0157fpgzNLGBRTM1nZnM7iLe` ("Mantenimiento de la Sala"). Las 7 sesiones `pedido300/*` (terminadas).
- "Fungi Mati Asistente IA" (sitio de IA de Fungi Mati, usado para la convocatoria de Solve).

## 2. Carpetas locales
| Carpeta | Qué es |
|---|---|
| `C:\Users\winusr\lacreacion-lotes\nuevo` | Clon principal del repo (rama main local; 1 commit local `bf7b7dd4` que ya está en origin como `6a31c49a`). Worktrees en `.claude\worktrees\`. |
| `…\pitch-solve` | Clon en `largo-render/pitch-solve`, al día con GitHub. |
| `…\hub` | Panel local viejo (27 oct, antecesor de la Sala): `inventario.py`, `panel.html`, `previews/`. Ya no se usa. |
| `…\revision-tiktok` | `demo-tiktok.mp4` y `demo-tiktok-directo.mp4` para la revisión de TikTok. |
| `…\lote-a…d` | Vacías (sus sesiones terminaron; todo está en main). |
| scratch `…26-28d6d0\` | Clon del Core video (no tocar) + archivos sueltos del pitch v2 (`pitch_fungi_mati_v2_1080p.mp4`, pruebas de voz `fungi_mati_A/B/C.mp3`, `mexico_A/B.mp3`, `storyboard_pitch.md`, `guion_pitch_3min.md`), `sala/` (copias 480 px de la Sala) y `largo/` (guiones viejos del largo). |
| `C:\Users\winusr\herramientas-ia\` | `realesrgan/` (binario oficial Windows de xinntao/Real-ESRGAN), `gfpgan-env/` (entorno Python con PyTorch) y `gfpgan-weights/`. |
| `C:\Users\winusr\Downloads\` | `linkedin_banner.png`, CVs (`1_CV_viejo…pdf`, `2_CV_extendido…pdf`, `Extended_CV_2026.pdf`), `prompt-apis-redes.md`. |

## 3. Ramas de GitHub (`Roberthecoder/lacreaciondelrobert-shots`, PÚBLICO)
- `main`: todo el sistema de shots, Sala, publicador, calendario. Commits que no deben renderizar llevan `[sin render]`.
- `largo-render/largo00-cine` (huérfana, sin historia común con main): Core video #00 de cine. **La usa el render en curso.**
- `largo-render/pitch-solve` (huérfana): pitch de MIT Solve 4K + voz + YouTube + respuestas del formulario (`solicitud/respuestas_v4.json`).
- `temporal/demo-tiktok` (huérfana): prueba del publicador con el pitch.
- `largo/000`: versión vieja del largo (27 oct).
- `pedido300/*` (7), `claude/*` (14), `remaster/lote-a…d`, `voces/v4`, `correcciones/auditoria-29oct`, `autonomia-diaria`,
  `estilo/referencias-externas`: ya juntadas a main (las de pedido300 según ESTADO-ADMIN; revisar antes de borrar cualquiera).
- Refs especiales: `refs/videos/<rama>` (MP4 para el chat), `refs/estado/creditos`, `refs/estado/tokens` (cifrado),
  `refs/estado/publicaciones` (bitácora).
- Releases: `borradores-<rama>` (videos de revisión), `borradores-voces-v4`, `pitch-solve`, `Largo · <rama>`.

## 4. Workflows (`.github/workflows/` en main)
| Workflow | Qué hace |
|---|---|
| `auto-render.yml` | Al hacer push que toque `shots/`: renderiza los shots cambiados (candado: sin `VEREDICTO: APROBADO` no renderiza; <60 s solo con `duracion_libre`). |
| `renderizar.yml` | Render de un shot (voz si `voz_aprobada`, narrado / sin voz), `ubuntu-24.04`. |
| `videos-al-chat.yml` | Copia los MP4 a `refs/videos/<rama>`. |
| `limpiar-release.yml` | Limpia Releases de borradores. |
| `creditos.yml` | Cada hora: créditos de ElevenLabs → `refs/estado/creditos`. |
| `publicar.yml` | Publica un shot o documental (modo prueba/privado/real). Gatillo manual o archivo `publicar/pedidos/<id>.json`. |
| `publicar-diario.yml` | Publicación diaria 9:07 am CDMX + 19 reintentos cada 30 min. Apagar: `publicar/diario.json` `"activo": false`. Saltar: `publicar/pausa.txt`. |
| `revisar-publicacion.yml` | Revisa que lo publicado salió en cada red. |
| `renovar-tokens.yml` | Lunes: renueva Threads y TikTok, revisa LinkedIn y YouTube. |
| `tiktok-conectar.yml` | Canjea el código de autorización de TikTok. |
| `probar-meta.yml`, `probar-redes.yml` | Pruebas de solo lectura de las API. |
En las ramas largo-render: `render-largo.yml` (render en paralelo), `voz-pitch.yml`, `youtube-pitch.yml`, `revisar-pitch.yml`.

## 5. Secretos y variables de GitHub (solo nombres)
Secretos: `ELEVENLABS_API_KEY`, `META_SYSTEM_TOKEN`, `THREADS_TOKEN`, `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`,
`YOUTUBE_REFRESH_TOKEN`, `LINKEDIN_TOKEN`, `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` (y `CLAUDE_API_KEY`, que no se usa).
Variables: `META_PAGE_ID`, `META_IG_ID`, `THREADS_APP_ID`, `LINKEDIN_CLIENT_ID`.
Vencimientos: Threads ~60 días (se renueva solo cada lunes); LinkedIn 2 meses **sin renovación automática** (regenerar ~28 dic 2026);
YouTube: app en producción, refresh token no vence; TikTok en sandbox (falta revisión con video demo).

## 6. Rutinas de nube (`RemoteTrigger`, 1 nov 2026)
Activas: Publicar Festivo 03 (2 nov 01:00 UTC), Revisar Festivo 04 (2 nov 15:15 UTC), Publicar Festivo 05 (2 nov 20:00 UTC),
Publicar Festivo 06 (3 nov 01:00 UTC), Recordar cancelar Meta Verified (22 nov).
Apagadas: Mantenimiento de la Sala (cada hora, `trig_01SiG3xGhgHwCiG4zpgKvWQS`), Producción intensiva (`trig_01URKCb81JFPMa9CtCnnjBN7`),
Lote diario (`trig_01VKwBbqWsjm5xKahYsA7RLd`), Pasar el repo a privado (`trig_01JRtxjxPL8uGjkpMTdRWGC9`), y revisiones viejas.

## 7. Artefactos de claude.ai
- Sala de Shots: https://claude.ai/artifact/KBt7kaF2DPUjT5HBiQZMBv (colecciones `shots`, `pedidos`, `aprobaciones`, `correcciones`,
  `publicaciones`, `estado/creditos`).
- Documento "MIT Solve 2027 Global Climate Challenge: respuestas de Fungi Mati": https://claude.ai/artifact/GNHKc4QknsGw2XKJcvYWdq

## 8. Pendientes detectados
1. Commit/push de los cambios locales del Core video #00 (cuando su sesión termine el render actual).
2. Portar `--escala/--desde/--gpu` a `motor/render.mjs` de main y hacer genérico `render-largo.yml`.
3. Trabajador horario apagado: decidir si se reenciende.
4. LinkedIn token vence ~28 dic 2026. Cancelar Meta Verified antes del 22–28 nov.
5. Auditoría de YouTube API (videos por API quedan privados hasta aprobarla) y revisión de TikTok con video demo.
6. Voz en pausa desde el 29 oct (Robert: "voy a mejorar la calidad").
7. Rutina "Pasar el repo a privado" apagada: el repo sigue público (decisión de Robert pendiente; público = minutos gratis).
