// worker.js — Cloudflare Worker que recibe lo que Robert toca o escribe en Telegram y se lo pasa a GitHub.
//
// Qué hace:
//   1. Telegram le manda cada botón tocado (callback_query) o mensaje (message) a este worker (webhook).
//   2. El worker revisa que venga de Telegram (secreto del webhook) y que el chat sea el de Robert.
//   3. Un botón "aprobar:12", "rehacer:12" o "descartar:12" se convierte en un repository_dispatch a GitHub
//      (tipo shot-aprobado, shot-rehacer o shot-descartar, con el número de PR), que arranca
//      .github/workflows/aprobado.yml.
//   4. Si Robert responde con texto a un mensaje del bot que mencione un PR, el texto se publica como
//      comentario en ese PR (así puede decir qué cambiar al pedir "Rehacer").
//
// Variables (se configuran como secrets del worker, ver LEEME.md):
//   TELEGRAM_BOT_TOKEN  token del bot que dio BotFather
//   TELEGRAM_CHAT_ID    id del chat de Robert (solo ese chat puede mandar órdenes)
//   GITHUB_TOKEN        token de GitHub (fine-grained) con permiso de Contents y Pull requests en el repo
//   GITHUB_REPO         "Roberthecoder/lacreaciondelrobert-shots"
//   WEBHOOK_SECRET      palabra secreta que se registra junto con el webhook; Telegram la manda en cada aviso

const ACCIONES = { aprobar: 'shot-aprobado', rehacer: 'shot-rehacer', descartar: 'shot-descartar' };

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('Worker de Telegram para La Creación del Robert. Solo acepta avisos de Telegram.', { status: 200 });
    if (env.WEBHOOK_SECRET && request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET) {
      return new Response('secreto incorrecto', { status: 403 });
    }
    let update;
    try { update = await request.json(); } catch { return new Response('json inválido', { status: 400 }); }

    try {
      if (update.callback_query) await boton(update.callback_query, env);
      else if (update.message) await mensaje(update.message, env);
    } catch (e) {
      // Telegram reintenta si no respondemos 200; mejor avisar en el chat y responder 200.
      await telegram(env, 'sendMessage', { chat_id: env.TELEGRAM_CHAT_ID, text: `Algo falló al pasar tu orden a GitHub: ${String(e.message || e).slice(0, 300)}` }).catch(() => {});
    }
    return new Response('ok', { status: 200 });
  },
};

/* ---------- botones Aprobar / Rehacer / Descartar ---------- */
async function boton(cq, env) {
  const chat = String(cq.message?.chat?.id ?? '');
  if (chat !== String(env.TELEGRAM_CHAT_ID)) {
    await telegram(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'Este bot solo le hace caso a Robert.' });
    return;
  }
  const [accion, prTxt] = String(cq.data || '').split(':');
  const pr = Number(prTxt);
  const tipo = ACCIONES[accion];
  if (!tipo || !Number.isInteger(pr) || pr <= 0) {
    await telegram(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'Botón desconocido.' });
    return;
  }
  await github(env, `/repos/${env.GITHUB_REPO}/dispatches`, { event_type: tipo, client_payload: { pr, origen: 'telegram' } });

  const etiqueta = { aprobar: 'Aprobado', rehacer: 'Se va a rehacer', descartar: 'Descartado' }[accion];
  await telegram(env, 'answerCallbackQuery', { callback_query_id: cq.id, text: `${etiqueta}: PR #${pr}. GitHub ya está trabajando.` });
  // Se quitan los botones y se deja constancia de la decisión en el mismo mensaje.
  await telegram(env, 'editMessageReplyMarkup', {
    chat_id: chat, message_id: cq.message.message_id,
    reply_markup: { inline_keyboard: [[{ text: `${etiqueta} (PR #${pr})`, callback_data: 'nada' }]] },
  }).catch(() => {});
}

/* ---------- texto de Robert respondiendo a un aviso del bot ---------- */
async function mensaje(m, env) {
  const chat = String(m.chat?.id ?? '');
  if (chat !== String(env.TELEGRAM_CHAT_ID)) return;   // a desconocidos ni se les contesta
  const texto = (m.text || '').trim();
  if (!texto) return;
  if (texto === '/id') {   // ayuda para obtener el chat id al configurar
    await telegram(env, 'sendMessage', { chat_id: chat, text: `Tu chat id es ${chat}` });
    return;
  }
  const origen = m.reply_to_message?.text || m.reply_to_message?.caption || '';
  const pr = Number((origen.match(/pull\/(\d+)/) || origen.match(/PR #(\d+)/) || [])[1]);
  if (!pr) {
    await telegram(env, 'sendMessage', { chat_id: chat, text: 'Para mandar una nota a un shot, responde (con "Responder") al mensaje del bot que lo anunció.' });
    return;
  }
  await github(env, `/repos/${env.GITHUB_REPO}/issues/${pr}/comments`, { body: `Nota de Robert desde Telegram: ${texto}` });
  await telegram(env, 'sendMessage', { chat_id: chat, text: `Anotado en el PR #${pr}.` });
}

/* ---------- llamadas ---------- */
async function telegram(env, metodo, cuerpo) {
  const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${metodo}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo),
  });
  const j = await r.json().catch(() => ({}));
  if (!j.ok) throw new Error(`Telegram ${metodo}: ${j.description || r.status}`);
  return j;
}

async function github(env, ruta, cuerpo) {
  const r = await fetch(`https://api.github.com${ruta}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'lacreaciondelrobert-telegram-worker',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cuerpo),
  });
  if (!r.ok) throw new Error(`GitHub respondió ${r.status} en ${ruta}: ${(await r.text()).slice(0, 200)}`);
}
