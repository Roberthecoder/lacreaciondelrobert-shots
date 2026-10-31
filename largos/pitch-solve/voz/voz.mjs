// voz.mjs — genera con la voz clonada de Robert cada <nombre>.txt de esta carpeta que todavía no tenga voz.
// Una sola petición por archivo (ritmo natural), con los ajustes guardados en la voz, modelo Eleven v4.
// Guarda <nombre>.mp3 y <nombre>.json (tiempos por carácter). Si el texto no cambia, no se vuelve a pedir.
// Uso (en GitHub Actions, con el secreto ELEVENLABS_API_KEY): node voz.mjs [nombre]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const VOICE_ID = 'uiCk6APPfsjnw3oUQzVo';
const MODEL = 'eleven_v4';
const KEY = process.env.ELEVENLABS_API_KEY;
const dir = path.dirname(fileURLToPath(import.meta.url));
const solo = process.argv[2];

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.txt'))) {
  const nombre = f.slice(0, -4);
  if (solo && nombre !== solo) continue;
  const texto = fs.readFileSync(path.join(dir, f), 'utf8').trim().replace(/\s+/g, ' ');
  const hash = crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL}|${texto}`).digest('hex').slice(0, 12);
  const mp3 = path.join(dir, nombre + '.mp3'), js = path.join(dir, nombre + '.json');
  if (fs.existsSync(js) && fs.existsSync(mp3) && JSON.parse(fs.readFileSync(js, 'utf8')).hash === hash) {
    console.log(`${nombre}: ya tiene voz, no se gastan créditos`);
    continue;
  }
  if (!KEY) throw new Error('Falta ELEVENLABS_API_KEY');
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto, model_id: MODEL }),
  });
  if (!r.ok) throw new Error(`ElevenLabs respondió ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
  const al = j.alignment || j.normalized_alignment;
  fs.writeFileSync(js, JSON.stringify({ hash, modelo: MODEL, voz: VOICE_ID, caracteres: texto.length, texto, alignment: al }));
  console.log(`${nombre}: voz generada, ${texto.length} caracteres, ${al.character_end_times_seconds.at(-1).toFixed(2)} s`);
}
