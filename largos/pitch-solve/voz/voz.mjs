// voz.mjs — genera con la voz clonada de Robert cada <nombre>.txt de esta carpeta que todavía no tenga voz.
// Una sola petición por archivo (ritmo natural), con los ajustes guardados en la voz, modelo Eleven v4.
// Guarda <nombre>.mp3 y <nombre>.json (tiempos por carácter). Si el texto no cambia, no se vuelve a pedir.
// Uso (en GitHub Actions, con el secreto ELEVENLABS_API_KEY): node voz.mjs [nombre]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const VOICE_ID = 'uiCk6APPfsjnw3oUQzVo';
const MODELO_BASE = 'eleven_v4';
const KEY = process.env.ELEVENLABS_API_KEY;
const dir = path.dirname(fileURLToPath(import.meta.url));
const solo = process.argv[2];

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.txt'))) {
  const nombre = f.slice(0, -4);
  if (solo && nombre !== solo) continue;
  // "prueba@eleven_multilingual_v2.txt" usa ese modelo; sin "@", Eleven v4
  const MODEL = nombre.includes('@') ? nombre.split('@')[1] : MODELO_BASE;
  // los párrafos se respetan (pausa natural); los espacios repetidos se juntan
  const texto = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r/g, '').trim().replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n');
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
  let al = null;
  if (r.ok) {
    const j = await r.json();
    fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
    al = j.alignment || j.normalized_alignment;
  } else {
    // algunos modelos no dan tiempos: audio normal
    console.log(`${nombre}: sin tiempos (${r.status}: ${(await r.text()).slice(0, 200)}); pido audio normal`);
    const r2 = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texto, model_id: MODEL }),
    });
    if (!r2.ok) throw new Error(`ElevenLabs respondió ${r2.status}: ${(await r2.text()).slice(0, 300)}`);
    fs.writeFileSync(mp3, Buffer.from(await r2.arrayBuffer()));
  }
  fs.writeFileSync(js, JSON.stringify({ hash, modelo: MODEL, voz: VOICE_ID, caracteres: texto.length, texto, alignment: al }));
  console.log(`${nombre}: voz generada con ${MODEL}, ${texto.length} caracteres${al ? ', ' + al.character_end_times_seconds.at(-1).toFixed(2) + ' s' : ''}`);
}
