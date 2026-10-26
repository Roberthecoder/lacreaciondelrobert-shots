# Aprobar shots desde Telegram

Cada día, cuando hay un shot nuevo listo para revisar, te llega un mensaje de Telegram con la hoja de cuadros, el guion resumido, el enlace al video sin voz y tres botones: Aprobar, Rehacer y Descartar. Esta carpeta tiene la pieza que conecta esos botones con GitHub: un "worker" (un programita) alojado gratis en Cloudflare. Tú lo configuras una sola vez siguiendo estos pasos; no hay que programar nada.

Qué pasa con cada botón:
- Aprobar: GitHub integra el shot, genera la voz (aquí sí se gastan créditos de ElevenLabs), renderiza las dos versiones y las sube a un Release del repositorio. Te llega otro mensaje con los enlaces para descargar los MP4 desde el celular.
- Rehacer: el shot se marca para corregir y la siguiente corrida diaria lo retoma. Si quieres decir qué cambiar, responde al mensaje del bot (con la opción "Responder" de Telegram) y tu texto queda anotado en el PR.
- Descartar: el shot se cierra y ese tema no se vuelve a proponer.

## Paso 1. Crear el bot en Telegram

1. En Telegram, busca el usuario `@BotFather` y ábrelo.
2. Escríbele `/newbot`. Te pide un nombre (por ejemplo "Shots del Robert") y luego un usuario que termine en `bot` (por ejemplo `robertshots_bot`).
3. Te responde con un token parecido a `123456789:AAH...`. Ese es el `TELEGRAM_BOT_TOKEN`. Guárdalo en un lugar seguro y no lo compartas ni lo subas al repositorio.
4. Abre tu bot nuevo (BotFather te da el enlace) y tócale "Iniciar".

## Paso 2. Obtener tu chat id

El bot solo obedece a un chat: el tuyo. Para saber su número:

1. Escríbele cualquier cosa a tu bot (por ejemplo "hola").
2. En el navegador abre esta dirección, cambiando `TOKEN` por el token del paso 1:
   `https://api.telegram.org/botTOKEN/getUpdates`
3. Verás un texto con `"chat":{"id":123456789,...`. Ese número es el `TELEGRAM_CHAT_ID`.

Si no ves nada, mándale otro mensaje al bot y recarga la página. (Cuando el worker ya esté instalado, también puedes escribirle `/id` al bot y te lo contesta.)

## Paso 3. Crear un token de GitHub para el worker

El worker necesita permiso para avisarle a GitHub.

1. En GitHub: foto de perfil, Settings, Developer settings, Personal access tokens, Fine-grained tokens, "Generate new token".
2. Nombre: "Worker de Telegram". Caducidad: la más larga que te permita (cuando caduque, se repite este paso).
3. Repository access: "Only select repositories" y elige `lacreaciondelrobert-shots`.
4. Permissions, Repository permissions: pon `Contents` en Read and write y `Pull requests` en Read and write. Nada más.
5. Genera el token y cópialo. Ese es el `GITHUB_TOKEN` del worker (es distinto al de las Actions; no se guarda en el repo).

## Paso 4. Instalar el worker en Cloudflare

Necesitas una cuenta gratuita en https://dash.cloudflare.com y tener instalado Node.js (ya lo tienes para el motor).

1. Abre una terminal dentro de la carpeta `telegram` de este repositorio.
2. Inicia sesión en Cloudflare desde la terminal (abre el navegador y confirmas):
   `npx wrangler login`
3. Sube el worker:
   `npx wrangler deploy`
   Al terminar te muestra una dirección del tipo `https://robert-shots-telegram.TUUSUARIO.workers.dev`. Cópiala: es la dirección del worker.
4. Carga los secretos, uno por uno. Cada comando te pide el valor y lo escribes (no se ve mientras lo tecleas):
   `npx wrangler secret put TELEGRAM_BOT_TOKEN`
   `npx wrangler secret put TELEGRAM_CHAT_ID`
   `npx wrangler secret put GITHUB_TOKEN`
   `npx wrangler secret put WEBHOOK_SECRET`
   Para `WEBHOOK_SECRET` inventa una palabra larga sin espacios (por ejemplo 30 letras y números al azar). Sirve para que nadie más que Telegram pueda hablarle al worker.

## Paso 5. Decirle a Telegram a dónde mandar los botones (webhook)

Abre en el navegador esta dirección, cambiando `TOKEN`, `DIRECCION` (la del paso 4.3, sin la barra final) y `SECRETO` (la palabra del paso 4.4):

`https://api.telegram.org/botTOKEN/setWebhook?url=DIRECCION&secret_token=SECRETO&allowed_updates=["message","callback_query"]`

Debe responder `"ok":true`. Para comprobar: abre `https://api.telegram.org/botTOKEN/getWebhookInfo` y revisa que `url` sea la del worker y que no haya `last_error_message`.

## Paso 6. Guardar los secrets en GitHub (para que las Actions te escriban)

En el repositorio: Settings, Secrets and variables, Actions, "New repository secret". Agrega:
- `TELEGRAM_BOT_TOKEN`: el token del paso 1.
- `TELEGRAM_CHAT_ID`: el número del paso 2.

`ELEVENLABS_API_KEY` ya está configurada. Si falta alguno de los dos de Telegram, los workflows siguen funcionando pero no te mandan mensaje (lo avisan en la corrida).

## Probar que todo quedó

1. Escríbele `/id` a tu bot: debe contestarte con tu chat id. Si no contesta, revisa el paso 5.
2. En GitHub, en un PR cuya rama empiece con `shot/`, espera el mensaje de Telegram y toca "Rehacer". En unos segundos el PR debe tener un comentario y la etiqueta `rehacer`. Si no, abre la pestaña Actions y mira qué dice "Decisión de Robert".

## Si algo falla

- El bot contesta "Algo falló al pasar tu orden a GitHub: 401 o 403": el token de GitHub caducó o no tiene los permisos del paso 3. Genera uno nuevo y vuelve a cargarlo con `npx wrangler secret put GITHUB_TOKEN`.
- No llega ningún mensaje al tocar botones: revisa `getWebhookInfo` (paso 5).
- Cambiaste de teléfono o de cuenta: el chat id no cambia mientras uses la misma cuenta de Telegram.
- Para ver qué está haciendo el worker en vivo: `npx wrangler tail` dentro de la carpeta `telegram`.
