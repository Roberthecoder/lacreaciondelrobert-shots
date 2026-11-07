// voz_organica_largo.mjs — la voz GRABADA por Robert (sin ElevenLabs, sin créditos) para un documental.
// Uso (desde la carpeta video/ del largo): node voz_organica_largo.mjs
//
// Acepta cualquiera de las dos formas:
//   · una sola grabación de todo el documental: voz/organica.<m4a|mp3|wav|ogg|mp4…>
//   · una grabación por capítulo:              voz/organica/cap0.<ext>, cap1.<ext>, …
// Cada grabación se limpia, se empareja con la voz profesional de Robert y Whisper la alinea con el guion de
// escenas.js (motor/voz-organica/procesar.py). Con una sola grabación, se corta sola en capítulos.
// Escribe voz/capN.mp3 + voz/capN.json con el mismo formato que narrar_largo.mjs: después se usa
// tiempos_voz.mjs igual que con ElevenLabs. Caché por hash: si la grabación y el guion no cambian, no se repite.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const toAnnot = (e) => { console.error(e); if (process.env.GITHUB_ACTIONS) console.log(`::error title=voz_organica_largo::${String(e?.message || e).replace(/\r?\n/g, ' ').slice(0, 900)}`); process.exit(1); };
process.on('uncaughtException', toAnnot); process.on('unhandledRejection', toAnnot);

const DIR = path.dirname(fileURLToPath(import.meta.url));
const VOZ = path.join(DIR, 'voz');
const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });

// procesar.py vive en <repo>/motor/voz-organica/: se busca hacia arriba
let PROC = null;
for (let d = DIR; d !== path.dirname(d); d = path.dirname(d)) {
  const p = path.join(d, 'motor', 'voz-organica', 'procesar.py');
  if (fs.existsSync(p)) { PROC = p; break; }
}
if (!PROC) throw new Error('No encuentro motor/voz-organica/procesar.py en el repositorio.');

globalThis.window = {};
new Function(fs.readFileSync(path.join(DIR, 'escenas.js'), 'utf8'))();
const CAPS = window.CAPS;
const textos = CAPS.map((c) => c.lineas.map((l) => l.t.trim()).join(' '));
const AUDIO = /\.(m4a|mp3|wav|ogg|opus|flac|aac|mp4|mov|webm)$/i;

const sha = (...partes) => { const h = crypto.createHash('sha1'); partes.forEach((p) => h.update(p)); return h.digest('hex').slice(0, 12); };
const procesar = (entrada, salida, texto, tmp) => {
  const g = path.join(tmp, 'guion.txt'), t = path.join(tmp, 'tiempos.json');
  fs.writeFileSync(g, texto);
  execFileSync('python3', [PROC, entrada, salida, '--guion', g, '--tiempos', t], { stdio: 'inherit' });
  return JSON.parse(fs.readFileSync(t, 'utf8'));
};
const guardarCap = (i, flac, desde, hasta, alignment, hash, coincidencia) => {
  const args = ['-i', flac];
  if (desde != null) args.push('-ss', desde.toFixed(3), '-to', hasta.toFixed(3));
  ff([...args, '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '192k', path.join(VOZ, `cap${i}.mp3`)]);
  fs.writeFileSync(path.join(VOZ, `cap${i}.json`), JSON.stringify({ hash, modelo: 'organica', texto: textos[i], alignment, coincidencia }));
};

const tmp = fs.mkdtempSync(path.join(DIR, '.voz-org-'));
try {
  const porCap = fs.existsSync(path.join(VOZ, 'organica')) ? fs.readdirSync(path.join(VOZ, 'organica')).filter((f) => AUDIO.test(f)) : [];
  const unica = fs.readdirSync(VOZ).find((f) => /^organica\./i.test(f) && AUDIO.test(f));
  const procSha = fs.readFileSync(PROC);

  if (porCap.length) {
    // una grabación por capítulo
    CAPS.forEach((_, i) => {
      const f = porCap.find((x) => x.replace(AUDIO, '') === `cap${i}`);
      if (!f) { console.log(`cap ${i}: sin grabación (voz/organica/cap${i}.*)`); return; }
      const src = path.join(VOZ, 'organica', f), hash = 'org-' + sha(fs.readFileSync(src), procSha, textos[i]);
      const m = path.join(VOZ, `cap${i}.json`);
      if (fs.existsSync(m) && JSON.parse(fs.readFileSync(m, 'utf8')).hash === hash && fs.existsSync(path.join(VOZ, `cap${i}.mp3`))) { console.log(`cap ${i}: en caché`); return; }
      const flac = path.join(tmp, `cap${i}.flac`);
      const t = procesar(src, flac, textos[i], tmp);
      guardarCap(i, flac, null, null, t.alignment, hash, t.coincidencia);
      console.log(`cap ${i}: voz orgánica lista (${t.coincidencia} % del guion encontrado)`);
    });
  } else if (unica) {
    // una sola grabación: se alinea con TODO el guion y se corta en capítulos (a la mitad del silencio entre ellos)
    const src = path.join(VOZ, unica), todo = textos.join(' ');
    const hash = 'org-' + sha(fs.readFileSync(src), procSha, todo);
    const listo = CAPS.every((_, i) => { const m = path.join(VOZ, `cap${i}.json`);
      return fs.existsSync(m) && JSON.parse(fs.readFileSync(m, 'utf8')).hash === hash && fs.existsSync(path.join(VOZ, `cap${i}.mp3`)); });
    if (listo) { console.log('Voz orgánica en caché'); process.exit(0); }
    const flac = path.join(tmp, 'todo.flac');
    const t = procesar(src, flac, todo, tmp);
    const al = t.alignment, A = al.character_start_times_seconds, B = al.character_end_times_seconds;
    const fin = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', flac]).toString());
    let c0 = 0;
    const rangos = textos.map((tx) => { const r = [c0, c0 + tx.length]; c0 += tx.length + 1; return r; });
    const cortes = rangos.map(([a], i) => (i === 0 ? 0 : (B[rangos[i - 1][1] - 1] + A[a]) / 2));
    rangos.forEach(([a, b], i) => {
      const desde = cortes[i], hasta = i + 1 < rangos.length ? cortes[i + 1] : fin;
      const mover = (xs) => xs.slice(a, b).map((x) => +Math.max(0, x - desde).toFixed(3));
      const alCap = { characters: al.characters.slice(a, b), character_start_times_seconds: mover(A), character_end_times_seconds: mover(B) };
      guardarCap(i, flac, desde, hasta, alCap, hash, t.coincidencia);
      console.log(`cap ${i}: ${desde.toFixed(1)}–${hasta.toFixed(1)} s`);
    });
    console.log(`Voz orgánica lista en ${CAPS.length} capítulos (${t.coincidencia} % del guion encontrado). Sigue: node tiempos_voz.mjs`);
  } else {
    throw new Error('No hay grabación: pon voz/organica.<ext> (todo el documental) o voz/organica/capN.<ext> (por capítulo).');
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
