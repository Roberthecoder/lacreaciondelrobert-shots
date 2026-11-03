// tiempos_voz.mjs — acomoda la animación a la voz real y arma la pista de audio final.
// Uso: node tiempos_voz.mjs   (necesita ffmpeg; no gasta créditos)
// 1. Con los tiempos por carácter de cada capítulo (voz/capN.json) calcula cuánto dura cada línea
//    del guion y lo escribe en tiempos_voz.js (window.TIEMPOS_VOZ), que usa doc-largo.jsx.
// 2. Une la voz con silencios en las tarjetas de capítulo → voz/voz_completa.wav.
// 3. Genera una cama musical grave y continua y mezcla todo con la MEZCLA OFICIAL de la sala de shots
//    (mezcla.json, la misma que motor/narrar.mjs y motor/render.mjs) → voz/mezcla.m4a.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const VOZ = path.join(DIR, 'voz');
const TARJETA = 3.2;   // igual que en doc-largo.jsx
const PAUSA_CAP = 0.9; // respiro al final de cada capítulo
const FF = process.env.FFMPEG || 'ffmpeg';
const ff = (args) => execFileSync(FF, ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const dur = (f) => Number(execFileSync(FF.replace(/ffmpeg(\.exe)?$/, 'ffprobe$1'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString());

globalThis.window = {};
new Function(fs.readFileSync(path.join(DIR, 'escenas.js'), 'utf8'))();
const CAPS = window.CAPS;

const tiempos = [], partes = [];
let t = 0;
CAPS.forEach((c, i) => {
  const meta = JSON.parse(fs.readFileSync(path.join(VOZ, `cap${i}.json`), 'utf8'));
  const al = meta.alignment, texto = c.lineas.map((l) => l.t.trim()).join(' ');
  if (meta.texto !== texto) throw new Error(`El capítulo ${i} cambió desde que se generó la voz: hay que volver a generarla.`);
  if (!al) throw new Error(`El capítulo ${i} no tiene tiempos por carácter.`);
  const largo = dur(path.join(VOZ, `cap${i}.mp3`));
  // inicio de cada línea = momento en que se dice su primer carácter
  let off = 0;
  const ini = c.lineas.map((l, k) => { const s = k === 0 ? 0 : al.character_start_times_seconds[Math.min(off, al.character_start_times_seconds.length - 1)]; off += l.t.trim().length + 1; return s; });
  if (c.tarjeta !== false) { partes.push({ silencio: TARJETA }); t += TARJETA; }
  c.lineas.forEach((l, k) => {
    const d = (k < c.lineas.length - 1 ? ini[k + 1] : largo + PAUSA_CAP) - ini[k];
    tiempos.push(Number(d.toFixed(3))); t += d;
  });
  partes.push({ archivo: path.join(VOZ, `cap${i}.mp3`) }, { silencio: PAUSA_CAP });
});
fs.writeFileSync(path.join(DIR, 'tiempos_voz.js'), `// Generado por tiempos_voz.mjs a partir de la voz real (no editar a mano).\nwindow.TIEMPOS_VOZ = ${JSON.stringify(tiempos)};\n`);
console.log(`Líneas: ${tiempos.length} · duración total: ${(t / 60).toFixed(2)} min`);

// voz completa (tal cual sale de ElevenLabs, con silencios en las tarjetas)
const ins = [], filt = [];
partes.forEach((p, k) => {
  if (p.silencio) ins.push('-f', 'lavfi', '-t', String(p.silencio), '-i', 'anullsrc=r=48000:cl=stereo');
  else ins.push('-i', p.archivo);
  filt.push(`[${k}:a]aresample=48000,aformat=channel_layouts=stereo[a${k}]`);
});
const vozWav = path.join(VOZ, 'voz_completa.wav');
ff([...ins, '-filter_complex', `${filt.join(';')};${partes.map((_, k) => `[a${k}]`).join('')}concat=n=${partes.length}:v=0:a=1[v]`, '-map', '[v]', '-ar', '48000', vozWav]);
const total = dur(vozWav);

// la "musiquita": el mismo sintetizador de los shots (cama + notas en cada evento + efectos), ver musica_largo.mjs
const bloques = [];
{ let tt = 0, n = 0;
  CAPS.forEach((c, ci) => {
    if (c.tarjeta !== false) { bloques.push({ at: tt, dur: TARJETA, tipo: 'capitulo', cap: ci }); tt += TARJETA; }
    c.lineas.forEach((l) => { const d = tiempos[n++]; const ult = bloques[bloques.length - 1];
      if (l.v || !ult || ult.tipo === 'capitulo' || ult.cap !== ci) bloques.push({ at: tt, dur: d, tipo: (l.v || {}).tipo || 'texto', id: (l.v || {}).id, n: ((l.v || {}).fotos || []).length || 1, cap: ci });
      else ult.dur += d;
      tt += d; });
  }); }
const musWav = path.join(VOZ, 'musica.wav');
const { generarMusica } = await import('./musica_largo.mjs');
generarMusica(bloques, total, musWav);

// MEZCLA OFICIAL de la sala de shots (sonido «5» elegido por Robert el 30 oct 2026; valores en mezcla.json,
// copiados de motor/mezcla.json): voz a −16 LUFS; cama a −6 dB; música por bandas (graves y sus armónicos
// presentes y sin bajar al hablar; medios bajan al hablar; agudos +3 dB); presencia +2.5 dB a 3 kHz; y al
// final todo a −7.1 LUFS con limitador (suena fuerte con el cel al 50 %).
const MZ = JSON.parse(fs.readFileSync(path.join(DIR, 'mezcla.json'), 'utf8'));
const medir = (f, af = '') => { const r = spawnSync(FF, ['-hide_banner', '-nostats', '-i', f, '-af', `${af}ebur128`, '-f', 'null', '-'], { encoding: 'utf8' });
  const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1); return m ? +m[1] : -23; };
const vozProc = path.join(VOZ, 'voz_procesada.wav');
ff(['-i', vozWav, '-af', 'highpass=f=70,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=150:makeup=1', '-ar', '48000', vozProc]);
const gVoz = MZ.voz_lufs - medir(vozProc), gMus = MZ.voz_lufs - medir(musWav) + MZ.cama_db;
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
  `[mus][vz]amix=inputs=2:normalize=0,equalizer=f=3000:t=q:w=1.2:g=${MZ.presencia_3k_db},equalizer=f=6000:t=q:w=1:g=${MZ.brillo_6k_db}[o]`;
const mezWav = path.join(VOZ, 'mezcla_narrada.wav');
ff(['-i', musWav, '-i', vozProc, '-filter_complex', bandas, '-map', '[o]', '-ar', '48000', '-c:a', 'pcm_f32le', mezWav]);
// volumen final, igual que motor/render.mjs
const lim = 'alimiter=limit=0.84:attack=3:release=80:asc=1:level=false';
const i0 = medir(mezWav); let g = MZ.final_lufs_narrado - i0;
for (let k = 0; k < 4; k++) g += MZ.final_lufs_narrado - medir(mezWav, `volume=${g.toFixed(2)}dB,${lim},`);
ff(['-i', mezWav, '-af', `volume=${g.toFixed(2)}dB,${lim},aresample=48000`, '-c:a', 'aac', '-b:a', '192k', path.join(VOZ, 'mezcla.m4a')]);
console.log(`Mezcla: voz ${gVoz.toFixed(1)} dB · música ${gMus.toFixed(1)} dB · final ${i0} → ${MZ.final_lufs_narrado} LUFS`);
console.log(`Listo: voz/mezcla.m4a (${(total / 60).toFixed(2)} min)`);
