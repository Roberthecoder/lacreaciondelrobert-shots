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
// Opcional: "velocidad" en narracion.json (p. ej. 1.065) acelera la voz ya generada SIN cambiar el tono
// (ffmpeg atempo) para que el total quede en 61–62 s. No vuelve a pedir la voz: no gasta créditos.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';

// en GitHub Actions, que el error se vea en el resumen de la ejecución
const toAnnot = (e) => { console.error(e); if (process.env.GITHUB_ACTIONS) console.log(`::error title=narrar.mjs::${String(e?.message || e).replace(/\r?\n/g, ' ').slice(0, 900)}`); process.exit(1); };
process.on('uncaughtException', toAnnot); process.on('unhandledRejection', toAnnot);

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'BrkFnhKTRJck3ZEjqD5d'; // voz profesional desde el 29 oct 2026 (antes uiCk6APPfsjnw3oUQzVo)
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_v4';
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
// Pronunciación: a ElevenLabs le mandamos el texto con arreglos (p. ej. «IA» → «Ía», para que no diga «ey-ay» en inglés);
// los subtítulos usan el texto original. mapa[j] = índice en el texto original del carácter j del texto enviado.
const PRON = JSON.parse(fs.readFileSync(new URL('./pronunciacion.json', import.meta.url), 'utf8')).reglas;
let enviado = '', mapa = [];
{
  const marcas = [];
  for (const r of PRON) for (const m of texto.matchAll(new RegExp(r.de, 'g')))
    if (!marcas.some((x) => m.index < x.i + x.n && x.i < m.index + m[0].length)) marcas.push({ i: m.index, n: m[0].length, a: r.a });
  marcas.sort((x, y) => x.i - y.i);
  let k = 0;
  for (const x of marcas) {
    for (; k < x.i; k++) { enviado += texto[k]; mapa.push(k); }
    for (let j = 0; j < x.a.length; j++) { enviado += x.a[j]; mapa.push(x.i + Math.min(x.n - 1, Math.floor((j * x.n) / x.a.length))); }
    k = x.i + x.n;
  }
  for (; k < texto.length; k++) { enviado += texto[k]; mapa.push(k); }
}
// regresa los tiempos por carácter del texto enviado al texto original
const aOriginal = (al) => {
  const n = texto.length, ini = Array(n).fill(null), fin = Array(n).fill(null);
  al.characters.forEach((_, j) => { const i = mapa[j] ?? n - 1; const a = al.character_start_times_seconds[j], b = al.character_end_times_seconds[j];
    ini[i] = ini[i] == null ? a : Math.min(ini[i], a); fin[i] = fin[i] == null ? b : Math.max(fin[i], b); });
  for (let i = 0; i < n; i++) { if (ini[i] == null) ini[i] = i ? fin[i - 1] : 0; if (fin[i] == null) fin[i] = ini[i]; }
  return { characters: [...texto], character_start_times_seconds: ini, character_end_times_seconds: fin };
};
if (enviado !== texto) console.log(`Pronunciación ajustada para ElevenLabs: ${PRON.filter((r) => new RegExp(r.de).test(texto)).map((r) => r.a).join(', ')}`);
const hash = crypto.createHash('sha1').update(`${VOICE_ID}|${MODEL}|${enviado}`).digest('hex').slice(0, 12);
const mp3 = path.join(vozDir, 'narracion.mp3'), metaF = path.join(vozDir, 'narracion.json');
let meta = fs.existsSync(metaF) ? JSON.parse(fs.readFileSync(metaF, 'utf8')) : null;
if (!meta || meta.hash !== hash || !fs.existsSync(mp3)) {
  if (!KEY) throw new Error('Falta ELEVENLABS_API_KEY y la narración no está en caché.');
  // sin voice_settings: ElevenLabs usa los ajustes guardados en la voz
  const H = { 'xi-api-key': KEY };
  // ElevenLabs limita cuántas voces se piden a la vez (429): espera y reintenta en vez de fallar
  const pedir = async (url, opts) => {
    for (let i = 0; ; i++) {
      const r = await fetch(url, opts);
      if ((r.status !== 429 && r.status < 500) || i >= 8) return r;
      const t = 15 * (i + 1) + Math.random() * 10;
      console.log(`ElevenLabs respondió ${r.status}; reintento en ${t.toFixed(0)} s`);
      await new Promise((ok) => setTimeout(ok, t * 1000));
    }
  };
  const fail = async (r, what) => { throw new Error(`ElevenLabs respondió ${r.status} (${what}): ${(await r.text()).slice(0, 300)}`); };
  let audio, alignment;
  const res = await pedir(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ text: enviado, model_id: MODEL }),
  });
  if (res.ok) {
    const j = await res.json();
    audio = Buffer.from(j.audio_base64, 'base64'); alignment = j.alignment || j.normalized_alignment;
  } else {
    // respaldo: audio normal + alineación forzada (por si el modelo no devuelve tiempos)
    console.log(`with-timestamps no disponible (${res.status}); uso audio + alineación forzada`);
    const r2 = await pedir(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ text: enviado, model_id: MODEL }),
    });
    if (!r2.ok) await fail(r2, 'texto a voz');
    audio = Buffer.from(await r2.arrayBuffer());
    const fd = new FormData();
    fd.append('file', new Blob([audio], { type: 'audio/mpeg' }), 'narracion.mp3');
    fd.append('text', enviado);
    const r3 = await pedir('https://api.elevenlabs.io/v1/forced-alignment', { method: 'POST', headers: H, body: fd });
    if (!r3.ok) await fail(r3, 'alineación forzada');
    const fa = await r3.json();
    alignment = { characters: fa.characters.map((c) => c.text), character_start_times_seconds: fa.characters.map((c) => c.start), character_end_times_seconds: fa.characters.map((c) => c.end) };
  }
  const j = { audio, alignment };
  fs.writeFileSync(mp3, j.audio);
  meta = { hash, modelo: MODEL, texto, enviado, alignment: aOriginal(j.alignment) };
  fs.writeFileSync(metaF, JSON.stringify(meta));
  console.log(`Voz generada (${texto.length} caracteres, modelo ${MODEL})`);
} else console.log('Voz en caché, no se gastaron créditos');
// archivos viejos del sistema por línea
for (const f of fs.readdirSync(vozDir)) if (/^linea_\d+\./.test(f)) fs.unlinkSync(path.join(vozDir, f));

/* ---------- 1b. velocidad opcional (sin créditos) ---------- */
const VEL = Number(cfg.velocidad) || 1;
let vozMp3 = mp3;
if (VEL !== 1) {
  vozMp3 = path.join(vozDir, 'narracion_vel.wav');
  ff(['-i', mp3, '-af', `atempo=${VEL}`, '-ar', '44100', vozMp3]);
  const k = (a) => a.map((t) => t / VEL);
  meta = { ...meta, alignment: { ...meta.alignment, character_start_times_seconds: k(meta.alignment.character_start_times_seconds), character_end_times_seconds: k(meta.alignment.character_end_times_seconds) } };
  console.log(`Voz acelerada ×${VEL} (mismo tono)`);
}

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
ff(['-i', vozMp3, '-af', `adelay=${Math.round(OFF * 1000)}:all=1,apad=whole_dur=${play.toFixed(3)}`, '-ar', '48000', '-ac', '2', vozWav]);
execFileSync('node', [path.join(dir, 'gen-audio.mjs'), cfg.salida, path.join('assets', 'musica_narrada.wav')], { stdio: 'inherit', cwd: dir });
// Mezcla profesional (29 oct 2026, pedido de Robert: "el video se oye bajo y la música casi no se escucha"):
// 1) voz limpia y pareja, a −16 LUFS;  2) música a −16 LUFS y luego cama a −7 dB (≈ −23 LUFS en las pausas);
// 3) la música baja ~4 dB cuando hablas (queda ~11 dB debajo de la voz: se oye clara pero no estorba);
// 4) el volumen final (−13 LUFS, pico −1 dB) lo pone motor/render.mjs para todas las versiones.
const medir = (f) => { const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', f, '-af', 'ebur128', '-f', 'null', '-'], { encoding: 'utf8' });
  const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1); return m ? +m[1] : -23; };
const musWav = path.join(dir, 'assets', 'musica_narrada.wav');
const vozProc = path.join(vozDir, 'voz_procesada.wav');
ff(['-i', vozWav, '-af', 'highpass=f=70,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=150:makeup=1', '-ar', '48000', vozProc]);
const MZ = JSON.parse(fs.readFileSync(new URL('./mezcla.json', import.meta.url), 'utf8'));
const gVoz = MZ.voz_lufs - medir(vozProc), gMus = MZ.voz_lufs - medir(musWav) + MZ.cama_db;
console.log(`Mezcla: voz ${gVoz >= 0 ? '+' : ''}${gVoz.toFixed(1)} dB · música ${gMus >= 0 ? '+' : ''}${gMus.toFixed(1)} dB (cama por bandas: graves y armónicos presentes, medios bajan al hablar)`);
// Música por bandas (29 oct 2026, Robert: "los sonidos graves de fondo se opacan por la voz y casi no se escuchan"):
//  · graves (<220 Hz): más fuertes y no bajan al hablar (la voz casi no tiene energía ahí); niveles en motor/mezcla.json;
//  · armónicos de los graves (240–1800 Hz, saturación suave): para que el bajo se oiga también en la bocina de un celular,
//    que no reproduce menos de ~200 Hz;
//  · medios (220–3500 Hz, donde vive la voz): bajan al hablar, como antes;  · agudos (>3.5 kHz): +3 dB, bajan poquito.
// Graves y sus armónicos: se comprimen y se limitan sus golpes (picos de hasta +10 dB) para que suenen llenos y parejos
// y el volumen final pueda subir sin distorsión.
const domar = (makeup, techo) => `acompressor=threshold=-26dB:ratio=4:attack=10:release=200:knee=6,volume=${makeup}dB,alimiter=limit=${techo}:attack=5:release=120:level=false`;
const graves = `[a]lowpass=f=220:p=2,lowpass=f=220:p=2,volume=${MZ.graves_db}dB,${domar(11.8, 0.52)}` + (MZ.graves_bajan_al_hablar
  ? `[lo];[lo][s1]sidechaincompress=threshold=0.05:ratio=1.2:knee=4:attack=80:release=600[lod];`
  : `[lod];[s1]anullsink;`);
const bandas =
  `[1:a]acompressor=threshold=-18dB:ratio=3:attack=5:release=120:makeup=1,volume=${gVoz.toFixed(2)}dB,asplit=4[s1][s2][s3][vz];` +
  `[0:a]volume=${gMus.toFixed(2)}dB,asplit=4[a][b][c][d];` + graves +
  `[b]lowpass=f=220:p=2,volume=9dB,asoftclip=type=tanh,highpass=f=240:p=2,highpass=f=240:p=2,lowpass=f=1800,volume=${MZ.armonicos_db}dB,${domar(9.7, 0.39)}[harm];` +
  `[c]highpass=f=220:p=2,highpass=f=220:p=2,lowpass=f=3500[mid];[mid][s2]sidechaincompress=threshold=0.03:ratio=${MZ.medios_ratio}:knee=4:attack=40:release=500[midd];` +
  `[d]highpass=f=3500,volume=${MZ.agudos_db}dB[hi];[hi][s3]sidechaincompress=threshold=0.05:ratio=1.3:knee=4:attack=60:release=600[hid];` +
  '[lod][harm][midd][hid]amix=inputs=4:normalize=0[mus];' +
  // presencia: la voz se oye más clara y fuerte en la bocina del celular sin subir el volumen real
  `[mus][vz]amix=inputs=2:normalize=0,equalizer=f=3000:t=q:w=1.2:g=${MZ.presencia_3k_db},equalizer=f=6000:t=q:w=1:g=${MZ.brillo_6k_db}[o]`;
ff(['-i', musWav, '-i', vozProc, '-filter_complex', bandas, '-map', '[o]', '-ar', '48000', '-c:a', 'pcm_f32le', path.join(dir, 'assets', 'mezcla_narrada.wav')]);
console.log(`Listo: ${cfg.salida} + assets/mezcla_narrada.wav`);
