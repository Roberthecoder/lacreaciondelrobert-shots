# Receta · Publicador automático de redes

Fuente: sesiones "Build the automatic social publisher" (`local_9b29277f…`, `local_1f1292e7…`, 29–31 oct) y la configuración de API
del 29 oct (sesión de shots). Código en main: `motor/redes/publicar.py`, `motor/redes/revisar.py`, workflows `publicar.yml`,
`publicar-diario.yml`, `revisar-publicacion.yml`, `renovar-tokens.yml`, `tiktok-conectar.yml`; config `publicar/diario.json`,
`publicar/pausa.txt`, `publicar/pedidos/`, bitácora `publicar/diario.log` y `refs/estado/publicaciones`. Manual operativo:
`ADMIN.md` §«Publicar en redes» (manda sobre esto si difieren).

## Por red (lo que hace `publicar.py`)
| Red | Cómo sube | Texto | Credencial (secreto) | Notas |
|---|---|---|---|---|
| Facebook | Reel de la página (Graph v23.0), espera `video_status` ready/published | `publicacion.md` → facebook | `META_SYSTEM_TOKEN` (usuario del sistema "Publicator", sin caducidad); var `META_PAGE_ID` | modo privado = borrador |
| Instagram | Reel (`media_type=REELS`, `share_to_feed=true`): 1) subida directa rupload; 2) si falla, Instagram baja el MP4 del enlace público del Release (sigue siendo Reel, no post) | caption | mismo token; var `META_IG_ID` | |
| Threads | post `VIDEO` con `video_url` público | threads | `THREADS_TOKEN` (60 días; se renueva solo los lunes y se guarda cifrado en `refs/estado/tokens`) | |
| YouTube | Short: subida resumible, tags = hashtags del texto (máx. 15), `selfDeclaredMadeForKids: false` | título + descripción | `YOUTUBE_CLIENT_ID/SECRET/REFRESH_TOKEN` (cuenta de marca, app en producción) | **queda privado** hasta pasar la auditoría de la YouTube API |
| LinkedIn | video al perfil personal de Robert (`w_member_social`), formato "little text" (hashtags `{hashtag|\#|x}`), prueba versiones de API 202609→202512 | linkedin | `LINKEDIN_TOKEN` (2 meses, **sin renovación automática**: regenerar ~28 dic 2026 en developers → OAuth tools) | |
| TikTok | publicación directa con título (consulta `creator_info` antes; privacidad elegida en la Sala); si la app no está aprobada → **borrador** en la bandeja de Robert | tiktok (≤ 2200) | `TIKTOK_CLIENT_KEY/SECRET` (sandbox) + token OAuth cifrado | Robert exige 100 % automático con título; mientras TikTok no apruebe, borrador. Conexión: `docs/tiktok.html` → `tiktok-conectar.yml` |
| X | no se usa (cobra por publicar) | — | — | |
Documentales 16:9: solo YouTube, con `video`, `release` y `youtube` (`privacidad` public/unlisted/private, `idioma`, portada).

## Modos y seguridad
`prueba` (no sube) · `privado` (nadie lo ve) · `real` (publica; exige `confirmar` = la clave y `autorizo` = cuándo/dónde lo dijo
Robert). Nunca imprime tokens (`::add-mask::`); el repo es público. Concurrencia `redes`: nunca dos publicaciones a la vez.
No publica shots sin `VEREDICTO: APROBADO`. Video: `<clave>_narrado.mp4`, primero del Release `borradores-voces-v4`.

## Publicación diaria (permiso permanente de Robert, 30 oct)
`publicar-diario.yml`: 9:07 am CDMX + 19 reintentos cada 30 min hasta 6:37 pm (GitHub se salta crons); idempotente (no duplica);
recupera el shot normal de ayer si no salió; si al final algo falta, el run falla y GitHub manda correo. Qué toca cada día:
`calendario/fecha.py`. Apagar: `"activo": false`. Saltar: clave en `publicar/pausa.txt`. Festivos del 1–2 nov: espaciados y
publicados por rutinas de nube a mano (Robert).

## Desde la Sala
Botón «Publicar» → doc en `publicaciones/<id>` → el admin lo convierte en `publicar/pedidos/<id>.json` (push = lanza el workflow).
Robert pidió que no se revise "cada hora quemando tokens" sino solo cuando haya pedidos.

## Pendientes
Auditoría de YouTube; revisión de TikTok (video demo grabado con el sandbox, ya enviado el 29 oct); LinkedIn ~28 dic; Meta Verified
(cancelar prueba gratis antes de que cobre).
