// narrar.mjs — genera la versión narrada de un shot con la voz clonada de ElevenLabs.
// Uso: ELEVENLABS_API_KEY=... node narrar.mjs <carpeta-del-shot>
//
// 1. Pide a ElevenLabs cada línea de narracion.json (con tiempos por carácter). Guarda cada clip en
//    <shot>/voz/ y no vuelve a pedir una línea cuyo texto no cambió (no gasta créditos de más).
// 2. Estira cada escena lo necesario para que quepa su voz (campo "nat" del motor) y calcula a qué
//    tiempo de autor cae cada subtítulo.
// 3. Escribe "<shot> narrado.dc.html", arma la pista de voz y la mezcla con música y efectos
//    (la música baja sola cuando hablas).
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

const LEAD = 0.3, GAP = 0.28, TAIL = 0.4;   // silencio antes de la 1ª línea, entre líneas y al final de la escena
const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
const dur = (f) => +execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim();

/* ---------- 1. voz ---------- */
const lines = cfg.lineas;
for (const [i, ln] of lines.entries()) {
  const base = path.join(vozDir, `linea_${String(i).padStart(2, '0')}`);
  const hash = crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL}|${ln.texto}`).digest('hex').slice(0, 12);
  let meta = fs.existsSync(base + '.json') ? JSON.parse(fs.readFileSync(base + '.json', 'utf8')) : null;
  if (!meta || meta.hash !== hash || !fs.existsSync(base + '.mp3')) {
    if (!KEY) throw new Error('Falta ELEVENLABS_API_KEY (y la línea ' + i + ' no está en caché).');
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: ln.texto, model_id: MODEL,
        previous_text: lines[i - 1]?.texto, next_text: lines[i + 1]?.texto,
        voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.35, use_speaker_boost: true },
      }),
    });
    if (!res.ok) throw new Error(`ElevenLabs respondió ${res.status} en la línea ${i}: ${(await res.text()).slice(0, 300)}`);
    const j = await res.json();
    fs.writeFileSync(base + '.mp3', Buffer.from(j.audio_base64, 'base64'));
    meta = { hash, texto: ln.texto, alignment: j.alignment };
    fs.writeFileSync(base + '.json', JSON.stringify(meta));
    console.log(`  voz ${i}: generada`);
  } else console.log(`  voz ${i}: en caché`);
  // quitar silencio inicial/final del clip para que los tiempos sean exactos
  ff(['-i', base + '.mp3', '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,aresample=48000', '-ac', '2', base + '.wav']);
  ln.file = base + '.wav'; ln.dur = dur(base + '.wav');
}

/* ---------- 2. tiempos ---------- */
let play = 0, auth = 0;
const out = [], subs = [];
for (const sc of scenes) {
  const nat = sc.nat || sc.dur, mine = lines.filter((l) => l.escena === sc.name);
  let need = 0;
  if (mine.length) need = LEAD + mine.reduce((a, l) => a + l.dur, 0) + GAP * (mine.length - 1) + TAIL;
  const d = mine.length ? Math.max(need, nat * 0.9) : nat;
  const toAuth = (tp) => auth + (tp - play) * nat / d;
  let t = play + LEAD;
  for (const l of mine) { l.at = t; t += l.dur + GAP; }
  out.push({ ...sc, dur: +d.toFixed(3), nat });
  mine.forEach((l, k) => { l.authAt = toAuth(l.at); l.authUntil = k + 1 < mine.length ? toAuth(mine[k + 1].at) - 0.05 : auth + nat - 0.05; });
  play += d; auth += nat;
}
lines.forEach((l) => subs.push({ at: +(l.authAt - 0.05).toFixed(3), until: +l.authUntil.toFixed(3) }));
console.log(`Duración narrada: ${play.toFixed(2)} s (sin voz: ${auth.toFixed(2)} s)`);

/* ---------- 3. html + audio ---------- */
const sceneJson = JSON.stringify(out).replace(/'/g, "\\'");
let nh = html.replace(/window\.OM_SCENES = '.*?';/, `window.OM_SCENES = '${sceneJson}';`);
nh = nh.replace('</helmet>', `<script>window.SUBS = ${JSON.stringify(subs)}; window.AUDIO_SRC = 'assets/mezcla_narrada.wav';</script>\n</helmet>`);
fs.writeFileSync(path.join(dir, cfg.salida), nh);

const vozWav = path.join(vozDir, 'voz_completa.wav');
const inputs = lines.flatMap((l) => ['-i', l.file]);
const chain = lines.map((l, i) => `[${i}:a]adelay=${Math.round(l.at * 1000)}:all=1[v${i}]`).join(';');
ff([...inputs, '-filter_complex', `${chain};${lines.map((_, i) => `[v${i}]`).join('')}amix=inputs=${lines.length}:normalize=0,apad=whole_dur=${play.toFixed(3)}[o]`, '-map', '[o]', '-ar', '48000', '-ac', '2', vozWav]);
execFileSync('node', [path.join(dir, 'gen-audio.mjs'), cfg.salida, path.join('assets', 'musica_narrada.wav')], { stdio: 'inherit', cwd: dir });
// música + efectos bajan cuando habla la voz (sidechain), luego todo a -14 LUFS
ff(['-i', path.join(dir, 'assets', 'musica_narrada.wav'), '-i', vozWav, '-filter_complex',
  '[1:a]asplit=2[sc][vz];[0:a]volume=0.6[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=10:release=280[duck];[vz]volume=1.25[vv];[duck][vv]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5[o]',
  '-map', '[o]', '-ar', '48000', path.join(dir, 'assets', 'mezcla_narrada.wav')]);
console.log(`Listo: ${cfg.salida} + assets/mezcla_narrada.wav`);
