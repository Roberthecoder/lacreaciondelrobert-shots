// narrar.mjs — genera la versión narrada de un shot con la voz clonada de ElevenLabs.
// Uso: ELEVENLABS_API_KEY=... node narrar.mjs <carpeta-del-shot>
//
// 1. Pide TODO el guion en UNA sola petición (ritmo y entonación naturales, como en la app de
//    ElevenLabs) y con la configuración guardada en la voz. Se guarda en <shot>/voz/narracion.mp3
//    y no se vuelve a pedir si el texto, la voz y el modelo no cambian (no gasta créditos de más).
// 2. Con los tiempos por carácter que devuelve ElevenLabs ubica cada línea del guion.
// 3. El video se adapta a la voz: cada escena dura lo que tarda su parte de la narración
//    (campo "nat" del motor) y cada subtítulo aparece cuando se dice su línea.
// 4. Mezcla la voz con música y efectos (la música baja cuando hablas).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'uiCk6APPfsjnw3oUQzVo';
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';
const KEY = process.env.ELEVENLABS_API_KEY;
const dir = path.resolve(process.argv[2] || '.');
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'narracion.json'), 'utf8'));
const html = fs.readFileSync(path.join(dir, cfg.dcHtml), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const vozDir = path.join(dir, 'voz');
fs.mkdirSync(vozDir, { recursive: true });

const LEAD = 0.25;   // cada escena arranca un poco antes de su primera palabra
const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);

/* ---------- 1. voz: una sola petición ---------- */
const lines = cfg.lineas;
const texto = lines.map((l) => l.texto.trim()).join(' ');
const hash = crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL}|${texto}`).digest('hex').slice(0, 12);
const mp3 = path.join(vozDir, 'narracion.mp3'), metaF = path.join(vozDir, 'narracion.json');
let meta = fs.existsSync(metaF) ? JSON.parse(fs.readFileSync(metaF, 'utf8')) : null;
if (!meta || meta.hash !== hash || !fs.existsSync(mp3)) {
  if (!KEY) throw new Error('Falta ELEVENLABS_API_KEY y la narración no está en caché.');
  // sin voice_settings: ElevenLabs usa los ajustes guardados en la voz
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_192`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto, model_id: MODEL }),
  });
  if (!res.ok) throw new Error(`ElevenLabs respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  fs.writeFileSync(mp3, Buffer.from(j.audio_base64, 'base64'));
  meta = { hash, modelo: MODEL, texto, alignment: j.alignment || j.normalized_alignment };
  fs.writeFileSync(metaF, JSON.stringify(meta));
  console.log(`Voz generada (${texto.length} caracteres, modelo ${MODEL})`);
} else console.log('Voz en caché, no se gastaron créditos');
// archivos viejos del sistema por línea
for (const f of fs.readdirSync(vozDir)) if (/^linea_\d+\./.test(f)) fs.unlinkSync(path.join(vozDir, f));

/* ---------- 2. dónde cae cada línea ---------- */
const al = meta.alignment, chars = al.characters.join('');
let cursor = 0;
for (const l of lines) {
  const t = l.texto.trim(), i = chars.indexOf(t.slice(0, 12), cursor);
  const i0 = i >= 0 ? i : cursor, i1 = Math.min(al.characters.length - 1, i0 + t.length - 1);
  l.start = al.character_start_times_seconds[i0]; l.end = al.character_end_times_seconds[i1];
  cursor = i1 + 1;
}
const vozFin = al.character_end_times_seconds.at(-1);

/* ---------- 3. el video se adapta a la voz ---------- */
// la voz arranca en el Hook (después del flash), con un pequeño margen
const first = scenes.findIndex((s) => lines.some((l) => l.escena === s.name));
let pre = 0; for (let k = 0; k < first; k++) pre += scenes[k].nat || scenes[k].dur;
const OFF = pre + LEAD;                               // segundo del video donde empieza la voz
const startOf = (name) => { const ls = lines.filter((l) => l.escena === name); return ls.length ? OFF + ls[0].start - LEAD : null; };
const out = [];
let play = 0, auth = 0;
const subs = [];
scenes.forEach((sc, k) => {
  const nat = sc.nat || sc.dur, mine = lines.filter((l) => l.escena === sc.name);
  let d = nat;
  if (mine.length) {
    const nextVoiced = scenes.slice(k + 1).map((s) => startOf(s.name)).find((v) => v != null);
    const endT = nextVoiced != null ? nextVoiced : OFF + vozFin + 0.7;
    d = Math.max(0.8, endT - play);
  }
  const toAuth = (tp) => auth + clampNum((tp - play) * nat / d, 0, nat);
  mine.forEach((l, j) => {
    const at = OFF + l.start - 0.08, until = j + 1 < mine.length ? OFF + mine[j + 1].start - 0.12 : play + d - 0.05;
    subs.push({ at: +toAuth(at).toFixed(3), until: +toAuth(until).toFixed(3) });
  });
  out.push({ ...sc, dur: +d.toFixed(3), nat });
  play += d; auth += nat;
});
function clampNum(v, a, b) { return Math.max(a, Math.min(b, v)); }
console.log(`Duración narrada: ${play.toFixed(2)} s (voz ${vozFin.toFixed(2)} s; sin voz ${auth.toFixed(2)} s)`);
out.forEach((s) => s.nat !== s.dur && console.log(`  ${s.name.padEnd(9)} ${s.nat}s → ${s.dur}s`));

/* ---------- 4. html + audio ---------- */
const sceneJson = JSON.stringify(out).replace(/'/g, "\\'");
let nh = html.replace(/window\.OM_SCENES = '.*?';/, `window.OM_SCENES = '${sceneJson}';`);
nh = nh.replace('</helmet>', `<script>window.SUBS = ${JSON.stringify(subs)}; window.AUDIO_SRC = 'assets/mezcla_narrada.wav';</script>\n</helmet>`);
fs.writeFileSync(path.join(dir, cfg.salida), nh);

const vozWav = path.join(vozDir, 'voz_completa.wav');
ff(['-i', mp3, '-af', `adelay=${Math.round(OFF * 1000)}:all=1,apad=whole_dur=${play.toFixed(3)}`, '-ar', '48000', '-ac', '2', vozWav]);
execFileSync('node', [path.join(dir, 'gen-audio.mjs'), cfg.salida, path.join('assets', 'musica_narrada.wav')], { stdio: 'inherit', cwd: dir });
// la voz va intacta; solo la música y los efectos bajan cuando hablas
ff(['-i', path.join(dir, 'assets', 'musica_narrada.wav'), '-i', vozWav, '-filter_complex',
  '[1:a]asplit=2[sc][vz];[0:a]volume=0.5[m];[m][sc]sidechaincompress=threshold=0.05:ratio=3:attack=20:release=350[duck];[duck][vz]amix=inputs=2:normalize=0,alimiter=limit=0.95[o]',
  '-map', '[o]', '-ar', '48000', path.join(dir, 'assets', 'mezcla_narrada.wav')]);
console.log(`Listo: ${cfg.salida} + assets/mezcla_narrada.wav`);
