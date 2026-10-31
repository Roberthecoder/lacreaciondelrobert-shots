# Revisiones de las apps de redes (respuestas listas para copiar)

Las envía **Robert** con su cuenta (son formularios con su nombre). Aquí están las respuestas ya escritas, en inglés,
porque los revisores son de Google y de TikTok. Sitio de la app: https://roberthecoder.github.io/lacreaciondelrobert-shots/
(privacidad: `privacidad.html`, términos: `terminos.html`). Ícono 1024 px: `docs/icono-app.png`.

---

## 1. YouTube Data API — formulario de auditoría (para que los videos subidos por API puedan ser públicos)

Dónde: https://support.google.com/youtube/contact/yt_api_form → «YouTube API Services - Audit and Quota Extension Form».
Proyecto de Google Cloud: el mismo del `YOUTUBE_CLIENT_ID` (Robert lo ve en console.cloud.google.com → APIs y servicios → Credenciales).

| Campo | Respuesta |
|---|---|
| Organization / Developer name | La Creación del Robert (Roberto Carlos Navarro Félix, individual creator) |
| Contact email | el correo de Robert |
| Organization website | https://roberthecoder.github.io/lacreaciondelrobert-shots/ |
| Is this API client used by your organization only? | Yes — internal tool, only used by the channel owner on his own channel |
| Which API services | YouTube Data API v3 |
| API client / project number | (el número del proyecto, en la consola) |
| Scopes | `https://www.googleapis.com/auth/youtube.upload` only |
| Quota requested | Default (10,000 units/day) is enough. No extension needed |
| Number of channels | 1 (La Creación del Robert, brand account owned by the developer) |
| Users | 1 (the developer himself). No third-party users, no public sign-up |

**Describe your API client / use case (pegar):**
> La Creación del Robert is a Spanish-language science-communication channel (short vertical videos about fungi,
> biotechnology, environment, chemistry and AI, with every fact checked against scientific sources). We built a small
> internal publishing tool that runs as a GitHub Actions workflow in our own repository. After the creator manually
> reviews and approves a finished video, the tool uploads that MP4 to the creator's own YouTube channel with
> `videos.insert` (resumable upload), using the title and description the creator wrote. It only uses the
> `youtube.upload` scope. It does not read, store or display any YouTube data, does not access other channels, and is
> not offered to other users. Credentials (OAuth client and refresh token) are kept as encrypted GitHub secrets. Each
> upload is triggered by a person; there is no automated mass posting. We request the audit so uploads can be set to
> public instead of being locked as private (the project is unverified).

**How does your client use YouTube data / display?** «It does not display or store YouTube data. It only uploads the
creator's own videos and records the returned video ID in our internal log.»

**Screencast / documentation (si lo piden):** el mismo video demo que se graba para TikTok sirve: muestra el sitio, el
botón de publicar en la Sala de Shots, el workflow «Publicar en redes» y el video privado en YouTube Studio.

---

## 2. TikTok — app de Producción «La Creación del Robert - AutoPosting» → Submit for review

Antes de mandar: en la app de **Producción** (no la de Sandbox) deben estar Login Kit y Content Posting API con los
mismos datos que el Sandbox: redirect `https://roberthecoder.github.io/lacreaciondelrobert-shots/`, sitio verificado
(archivo `docs/tiktok…txt`), scopes `user.info.basic` + `video.upload`, ícono `docs/icono-app.png`, categoría
«Education» (o «Content creation»), términos y privacidad del sitio.

**App description (pegar, máx. 120 caracteres):**
> Internal tool that sends the creator's own approved science videos to his TikTok inbox as drafts.

**Explain how each product and scope works in your app (pegar):**
> La Creación del Robert is a Spanish-language science-communication channel. Our internal publishing tool (a workflow
> in our own GitHub repository) is used only by the channel owner.
> • Login Kit / user.info.basic: the creator connects his own TikTok account once from our website
>   (tiktok.html → "Authorize"); we read only the display name to confirm the right account is connected.
> • Content Posting API / video.upload: after the creator approves a finished video in our internal review page, the
>   tool uploads the MP4 with the inbox endpoint (FILE_UPLOAD). The video arrives as a draft in the creator's TikTok
>   inbox notifications; he opens it in the TikTok app, adds the caption and publishes it himself. Nothing is posted
>   automatically and no data from other users is accessed or stored. Tokens are stored encrypted.

**Demo video (obligatorio):** grabarlo con la app de **Sandbox** «Pruebas» (sus llaves son las de los secretos actuales), de
punta a punta, mostrando el dominio en la barra del navegador:
1. https://roberthecoder.github.io/lacreaciondelrobert-shots/ (la app y sus enlaces de privacidad y términos).
2. `tiktok.html` → «Autorizar con TikTok» → pantalla de TikTok con los permisos → Autorizar → regreso al sitio.
3. Guardar la conexión: GitHub → Actions → «Conectar TikTok» → Run workflow (resultado: cuenta conectada).
4. La Sala de Shots: abrir un shot narrado, marcar «TikTok (borrador)» → Publicar (o GitHub → «Publicar en redes»,
   modo privado, red tiktok).
5. En el teléfono (o en tiktok.com): la notificación de la bandeja con el borrador del video. NO se publica.
Formato: MP4, menos de 50 MB, idealmente 1–3 min, en inglés o con subtítulos/narración en inglés breve.
