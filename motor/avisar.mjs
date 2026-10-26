// avisar.mjs — manda un mensaje al Telegram de Robert desde GitHub Actions.
// Uso: TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... node avisar.mjs --texto "mensaje" [--foto hoja.png] [--botones '[{"texto":"Aprobar","dato":"aprobar:12"}]']
// - El texto admite HTML sencillo de Telegram (<b>, <i>, <a href>). Lo que venga de archivos se escapa con escapar().
// - Si hay --foto, se manda como imagen con el texto de pie (máximo 1024 caracteres); si falla, se manda solo el texto.
// - Los botones van en una fila; su "dato" es lo que recibe el worker de telegram/worker.js (callback_data, máximo 64 bytes).
// - Si faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID, avisa y termina sin error (así el workflow no se cae).
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const TOKEN = process.env.TELEGRAM_BOT_TOKEN, CHAT = process.env.TELEGRAM_CHAT_ID;
const texto = opt('texto', ''), foto = opt('foto'), botones = JSON.parse(opt('botones', '[]'));

if (!TOKEN || !CHAT) {
  console.log('Sin TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID: no se manda aviso a Telegram.');
  if (process.env.GITHUB_ACTIONS) console.log('::warning title=Telegram::Faltan los secrets TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID; el aviso no se mandó.');
  process.exit(0);
}
if (!texto) { console.error('Falta --texto'); process.exit(1); }

const API = `https://api.telegram.org/bot${TOKEN}`;
const teclado = botones.length ? JSON.stringify({ inline_keyboard: [botones.map((b) => ({ text: b.texto, callback_data: b.dato }))] }) : null;

async function enviar(metodo, cuerpo) {
  const r = await fetch(`${API}/${metodo}`, { method: 'POST', body: cuerpo });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(`Telegram ${metodo} respondió ${r.status}: ${JSON.stringify(j).slice(0, 300)}`);
  return j;
}

let enviado = false;
if (foto && fs.existsSync(foto)) {
  const fd = new FormData();
  fd.append('chat_id', CHAT);
  fd.append('photo', new Blob([fs.readFileSync(foto)], { type: 'image/png' }), path.basename(foto));
  fd.append('caption', texto.slice(0, 1024));
  fd.append('parse_mode', 'HTML');
  if (teclado) fd.append('reply_markup', teclado);
  try { await enviar('sendPhoto', fd); enviado = true; console.log('Aviso con imagen enviado a Telegram.'); }
  catch (e) { console.log(`No se pudo mandar la imagen (${e.message}); se manda solo el texto.`); }
}
if (!enviado) {
  const fd = new FormData();
  fd.append('chat_id', CHAT);
  fd.append('text', texto.slice(0, 4096));
  fd.append('parse_mode', 'HTML');
  fd.append('disable_web_page_preview', 'true');
  if (teclado) fd.append('reply_markup', teclado);
  await enviar('sendMessage', fd);
  console.log('Aviso enviado a Telegram.');
}
