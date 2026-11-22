// narrar_largo.mjs — voz clonada de Robert (ElevenLabs) para el video largo.
// Uso: ELEVENLABS_API_KEY=... node narrar_largo.mjs [saldo|generar]
//   saldo   → solo consulta los créditos disponibles (no gasta nada).
//   generar → pide la voz capítulo por capítulo (cada capítulo en una sola petición, con el texto
//             vecino como contexto para que la entonación siga), guarda los MP3 en voz/ y escribe
//             tiempos_voz.js con lo que dura cada línea del guion. Si un capítulo ya está en caché
//             (mismo texto, voz y modelo) no se vuelve a pedir.
// Antes de gastar revisa que alcancen los créditos; si no alcanzan, se detiene sin gastar.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const toAnnot = (e) => { console.error(e); if (process.env.GITHUB_ACTIONS) console.log(`::error title=narrar_largo::${String(e?.message || e).replace(/\r?\n/g, ' ').slice(0, 900)}`); process.exit(1); };
process.on('uncaughtException', toAnnot); process.on('unhandledRejection', toAnnot);

const DIR = path.dirname(fileURLToPath(import.meta.url));
const VOZ = path.join(DIR, 'voz');
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'uiCk6APPfsjnw3oUQzVo';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_v4';
const KEY = process.env.ELEVENLABS_API_KEY;
const modo = process.argv[2] || 'saldo';
if (!['saldo', 'generar', 'recuperar'].includes(modo)) throw new Error(`Pedido desconocido: "${modo}" (usa saldo o generar). No se gastó nada.`);
const H = { 'xi-api-key': KEY };
if (!KEY) throw new Error('Falta ELEVENLABS_API_KEY');

// el guion sale de escenas.js (el mismo que dibuja la animación)
globalThis.window = {};
new Function(fs.readFileSync(path.join(DIR, 'escenas.js'), 'utf8'))();
const CAPS = window.CAPS;

const rs = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: H });
const sub = await rs.json().catch(() => ({}));
if (!rs.ok || sub.character_limit == null) console.log(`No pude leer el saldo (${rs.status}): ${JSON.stringify(sub).slice(0, 300)}`);
const quedan = (sub.character_limit ?? 0) - (sub.character_count ?? 0);
const reinicio = sub.next_character_count_reset_unix ? new Date(sub.next_character_count_reset_unix * 1000).toISOString().slice(0, 10) : '?';
fs.mkdirSync(VOZ, { recursive: true });
const pedidos = CAPS.map((c) => c.lineas.map((l) => l.t.trim()).join(' '));
const hashDe = (t) => crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL}|${t}`).digest('hex').slice(0, 12);
const pendientes = pedidos.map((t, i) => ({ i, t })).filter(({ i, t }) => {
  const m = path.join(VOZ, `cap${i}.json`);
  return !(fs.existsSync(m) && JSON.parse(fs.readFileSync(m, 'utf8')).hash === hashDe(t) && fs.existsSync(path.join(VOZ, `cap${i}.mp3`)));
});
const costo = pendientes.reduce((a, p) => a + p.t.length, 0);
const resumen = `Créditos: quedan ${quedan} de ${sub.character_limit} (plan ${sub.tier}, se renuevan el ${reinicio}). Esta voz cuesta ~${costo} (${pendientes.length} de ${pedidos.length} capítulos por generar).`;
console.log(resumen);
fs.writeFileSync(path.join(VOZ, 'saldo.txt'), resumen + '\n');
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumen + '\n');
if (modo === 'saldo') process.exit(0);
// recuperar: baja del historial de ElevenLabs los capítulos que ya se generaron (no gasta créditos)
if (modo === 'recuperar') {
  const rh = await fetch(`https://api.elevenlabs.io/v1/history?page_size=100&voice_id=${VOICE_ID}`, { headers: H });
  if (!rh.ok) throw new Error(`No pude leer el historial (${rh.status}): ${(await rh.text()).slice(0, 300)}`);
  const items = (await rh.json()).history || [];
  for (const { i, t } of pendientes) {
    const it = items.find((h) => (h.text || '').trim() === t);
    if (!it) { console.log(`cap ${i}: no está en el historial`); continue; }
    const ra = await fetch(`https://api.elevenlabs.io/v1/history/${it.history_item_id}/audio`, { headers: H });
    if (!ra.ok) { console.log(`cap ${i}: no pude bajar el audio (${ra.status})`); continue; }
    fs.writeFileSync(path.join(VOZ, `cap${i}.mp3`), Buffer.from(await ra.arrayBuffer()));
    fs.writeFileSync(path.join(VOZ, `cap${i}.json`), JSON.stringify({ hash: hashDe(t), modelo: it.model_id || MODEL, texto: t, alignment: null, recuperado: it.history_item_id }));
    console.log(`cap ${i}: recuperado del historial`);
  }
  process.exit(0);
}
if (sub.character_limit != null && costo > quedan) throw new Error(`No alcanzan los créditos: ${resumen} No se gastó nada.`);

const tts = async (body) => fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`, {
  method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
for (const { i, t } of pendientes) {
  const ctx = { previous_text: (pedidos[i - 1] || '').slice(-400) || undefined, next_text: (pedidos[i + 1] || '').slice(0, 200) || undefined };
  let r = await tts({ text: t, model_id: MODEL, ...ctx });
  if (r.status === 400 || r.status === 422) { console.log(`cap ${i}: sin texto de contexto (${r.status})`); r = await tts({ text: t, model_id: MODEL }); }
  if (!r.ok) throw new Error(`ElevenLabs respondió ${r.status} en el capítulo ${i}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  fs.writeFileSync(path.join(VOZ, `cap${i}.mp3`), Buffer.from(j.audio_base64, 'base64'));
  fs.writeFileSync(path.join(VOZ, `cap${i}.json`), JSON.stringify({ hash: hashDe(t), modelo: MODEL, texto: t, alignment: j.alignment || j.normalized_alignment }));
  console.log(`cap ${i}: voz lista (${t.length} caracteres)`);
}
console.log('Voz completa. Los tiempos por línea los calcula tiempos_voz.mjs.');
