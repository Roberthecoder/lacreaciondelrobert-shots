// armar.mjs — prepara los shots verticales hechos con fragmentos del largo #00.
// Uso (desde esta carpeta): node armar.mjs [--audio]
//  · Escribe "Vertical NN.dc.html" en la carpeta del largo (cada uno con su window.CORTE) y cortes_tiempos.json
//    (desde/hasta de cada shot, en segundos del largo, que usa el render en la nube).
//  · Con --audio, arma audio/vertical_NN.m4a con la MEZCLA OFICIAL (la misma de tiempos_voz.mjs): la voz de ese tramo,
//    la música continua y, en la tarjeta de cierre, solo música que se apaga suave. Necesita voz/voz_completa.wav y voz/musica.wav.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const LARGO = path.resolve(AQUI, '..'), VIDEO = path.join(LARGO, 'video'), VOZ = path.join(VIDEO, 'voz');
const COLA = 3.5; // tarjeta de cierre (s)
globalThis.window = {};
new Function(fs.readFileSync(path.join(VIDEO, 'escenas.js'), 'utf8'))();
new Function(fs.readFileSync(path.join(VIDEO, 'tiempos_voz.js'), 'utf8'))();
const TV = window.TIEMPOS_VOZ, ini = [];
{ let t = 0, n = 0; window.CAPS.forEach((c) => { if (c.tarjeta !== false) t += 3.2; c.lineas.forEach(() => { ini[n] = t; t += TV[n]; n++; }); }); ini[n] = t; }
const cortes = JSON.parse(fs.readFileSync(path.join(AQUI, 'cortes.json'), 'utf8'));
const html = fs.readFileSync(path.join(LARGO, 'Largo 00.dc.html'), 'utf8');
const tiempos = cortes.map((c, i) => {
  const n = i + 1, desde = +ini[c.lineas[0]].toFixed(3), hasta = +(ini[c.lineas[1]] + TV[c.lineas[1]]).toFixed(3);
  const corte = { n, de: cortes.length, desde, hasta, cola: COLA, titulo: c.titulo, robert: c.robert };
  const h = html.replace('<script>window.OM_PLAYBACK', `<script>window.CORTE = ${JSON.stringify(corte)};</script>\n<script>window.OM_PLAYBACK`)
    .replace('component-from-global-scope="LargoApp"', 'component-from-global-scope="VerticalApp"');
  fs.writeFileSync(path.join(LARGO, `Vertical ${String(n).padStart(2, '0')}.dc.html`), h);
  console.log(`${String(n).padStart(2, '0')} · ${desde.toFixed(1)}–${hasta.toFixed(1)} s · ${(hasta - desde + COLA).toFixed(1)} s · ${c.titulo}`);
  return { i: String(n).padStart(2, '0'), desde, hasta: +(hasta + COLA).toFixed(3), voz: hasta };
});
fs.writeFileSync(path.join(AQUI, 'cortes_tiempos.json'), JSON.stringify(tiempos));

if (process.argv.includes('--audio')) {
  const FF = process.env.FFMPEG || 'ffmpeg';
  const ff = (a) => execFileSync(FF, ['-y', '-loglevel', 'error', ...a], { stdio: 'inherit' });
  const medir = (f, af = '') => { const r = spawnSync(FF, ['-hide_banner', '-nostats', '-i', f, '-af', `${af}ebur128`, '-f', 'null', '-'], { encoding: 'utf8' });
    const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1); return m ? +m[1] : -23; };
  const MZ = JSON.parse(fs.readFileSync(path.join(VIDEO, 'mezcla.json'), 'utf8'));
  // Las ganancias se miden con el largo completo, para que cada shot suene igual que el largo.
  const vozProc = path.join(VOZ, 'voz_procesada.wav'), musWav = path.join(VOZ, 'musica.wav');
  if (!fs.existsSync(vozProc)) ff(['-i', path.join(VOZ, 'voz_completa.wav'), '-af', 'highpass=f=70,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=150:makeup=1', '-ar', '48000', vozProc]);
  const gVoz = MZ.voz_lufs - medir(vozProc), gMus = MZ.voz_lufs - medir(musWav) + MZ.cama_db;
  console.log(`Ganancias del largo: voz ${gVoz.toFixed(2)} dB · música ${gMus.toFixed(2)} dB`);
  const domar = (makeup, techo) => `acompressor=threshold=-26dB:ratio=4:attack=10:release=200:knee=6,volume=${makeup}dB,alimiter=limit=${techo}:attack=5:release=120:level=false`;
  const graves = `[a]lowpass=f=220:p=2,lowpass=f=220:p=2,volume=${MZ.graves_db}dB,${domar(11.8, 0.52)}` + (MZ.graves_bajan_al_hablar
    ? `[lo];[lo][s1]sidechaincompress=threshold=0.05:ratio=1.2:knee=4:attack=80:release=600[lod];` : `[lod];[s1]anullsink;`);
  fs.mkdirSync(path.join(AQUI, 'audio'), { recursive: true });
  const lim = 'alimiter=limit=0.84:attack=3:release=80:asc=1:level=false';
  const solo = process.argv.includes('--solo') ? process.argv[process.argv.indexOf('--solo') + 1] : null;
  for (const t of tiempos) {
    if (solo && t.i !== solo) continue;
    const dv = t.voz - t.desde, dt = t.hasta - t.desde;
    // voz del tramo (con un respiro de 0.25 s al final) + silencio en la cola; música del tramo que se apaga en la cola
    const bandas =
      `[1:a]atrim=${t.desde}:${t.voz},asetpts=PTS-STARTPTS,afade=t=out:st=${(dv - 0.25).toFixed(3)}:d=0.25,apad=whole_dur=${dt},acompressor=threshold=-18dB:ratio=3:attack=5:release=120:makeup=1,volume=${gVoz.toFixed(2)}dB,asplit=4[s1][s2][s3][vz];` +
      `[0:a]atrim=${t.desde}:${t.hasta},asetpts=PTS-STARTPTS,afade=t=in:d=0.3,afade=t=out:st=${(dt - 2.6).toFixed(3)}:d=2.6,volume=${gMus.toFixed(2)}dB,asplit=4[a][b][c][d];` + graves +
      `[b]lowpass=f=220:p=2,volume=9dB,asoftclip=type=tanh,highpass=f=240:p=2,highpass=f=240:p=2,lowpass=f=1800,volume=${MZ.armonicos_db}dB,${domar(9.7, 0.39)}[harm];` +
      `[c]highpass=f=220:p=2,highpass=f=220:p=2,lowpass=f=3500[mid];[mid][s2]sidechaincompress=threshold=0.03:ratio=${MZ.medios_ratio}:knee=4:attack=40:release=500[midd];` +
      `[d]highpass=f=3500,volume=${MZ.agudos_db}dB[hi];[hi][s3]sidechaincompress=threshold=0.05:ratio=1.3:knee=4:attack=60:release=600[hid];` +
      '[lod][harm][midd][hid]amix=inputs=4:normalize=0[mus];' +
      `[mus][vz]amix=inputs=2:normalize=0,equalizer=f=3000:t=q:w=1.2:g=${MZ.presencia_3k_db},equalizer=f=6000:t=q:w=1:g=${MZ.brillo_6k_db},atrim=0:${dt}[o]`;
    const wav = path.join(AQUI, 'audio', `_v${t.i}.wav`);
    ff(['-i', musWav, '-i', vozProc, '-filter_complex', bandas, '-map', '[o]', '-ar', '48000', '-c:a', 'pcm_f32le', wav]);
    let g = MZ.final_lufs_narrado - medir(wav);
    for (let k = 0; k < 4; k++) g += MZ.final_lufs_narrado - medir(wav, `volume=${g.toFixed(2)}dB,${lim},`);
    ff(['-i', wav, '-af', `volume=${g.toFixed(2)}dB,${lim},aresample=48000`, '-c:a', 'aac', '-b:a', '192k', path.join(AQUI, 'audio', `vertical_${t.i}.m4a`)]);
    fs.unlinkSync(wav);
    console.log(`audio ${t.i}: ${dt.toFixed(1)} s · ${medir(path.join(AQUI, 'audio', `vertical_${t.i}.m4a`)).toFixed(1)} LUFS`);
  }
}
