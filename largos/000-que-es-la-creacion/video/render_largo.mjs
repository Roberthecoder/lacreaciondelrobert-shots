// render_largo.mjs — renderiza el largo por tramos (varios a la vez) y los une con el acabado de película.
// Si se interrumpe (apagón, cuadro atorado), al volver a correrlo salta los tramos ya terminados.
// Uso (desde esta carpeta): node render_largo.mjs [--tramo 60] [--hilos 2] [--fps 24] [--audio voz.mp3] [--salida ../borradores/largo00_cine_mudo.mp4]
// Necesita ffmpeg 9 en el PATH y NAVEGADOR=chrome, igual que motor/render.mjs.
// Acabado de película (aquí y no en el navegador, porque es casi gratis): grano que cambia cada cuadro, viñeta y color cálido/frío.
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const LARGO = path.resolve(AQUI, '..');
const MOTOR = path.resolve(LARGO, '../../motor');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const TRAMO = +opt('tramo', 60), HILOS = +opt('hilos', 2), FPS = +opt('fps', 24);
const SALIDA = path.resolve(AQUI, opt('salida', '../borradores/largo00_cine_mudo.mp4'));
const DIR = path.join(path.dirname(SALIDA), 'tramos_' + path.basename(SALIDA, '.mp4'));
fs.mkdirSync(DIR, { recursive: true });

// Duración total: la misma cuenta que doc-largo.jsx.
globalThis.window = {};
new Function(fs.readFileSync(path.join(AQUI, 'escenas.js'), 'utf8'))();
let total = 0;
for (const c of window.CAPS) { if (c.tarjeta !== false) total += 3.2; for (const l of c.lineas) total += l.d || Math.max(2.2, l.t.length / 15 + 0.45); }
total += 1;
const n = Math.ceil(total / TRAMO);
console.log(`Total ${total.toFixed(1)} s · ${n} tramos de ${TRAMO} s · ${HILOS} a la vez · ${FPS} fps`);

const tramos = Array.from({ length: n }, (_, i) => ({ i, desde: i * TRAMO, hasta: Math.min(total, (i + 1) * TRAMO), f: path.join(DIR, `tramo_${String(i + 1).padStart(3, '0')}.mp4`) }));
const pendientes = tramos.filter((t) => !fs.existsSync(t.f));
console.log(`${n - pendientes.length} tramos ya existen; faltan ${pendientes.length}.`);
const t0 = Date.now();
let hechos = 0, fallo = false;
function uno(t) {
  return new Promise((res) => {
    const tmp = t.f.replace(/\.mp4$/, '.parcial.mp4');
    const log = fs.openSync(t.f.replace(/\.mp4$/, '.log'), 'w');
    const pr = spawn('node', ['render.mjs', LARGO, 'Largo 00.dc.html', tmp, '--horizontal', '--gpu', '--fps', String(FPS), '--desde', String(t.desde), '--hasta', String(t.hasta)], { cwd: MOTOR, stdio: ['ignore', log, log] });
    pr.on('close', (code) => {
      fs.closeSync(log);
      if (code === 0) { fs.renameSync(tmp, t.f); hechos++; const min = (Date.now() - t0) / 60000; console.log(`Tramo ${t.i + 1}/${n} listo · ${hechos}/${pendientes.length} en ${min.toFixed(0)} min · faltan ~${((min / hechos) * (pendientes.length - hechos)).toFixed(0)} min`); }
      else { fallo = true; console.error(`Falló el tramo ${t.i + 1} (ver ${t.f.replace(/\.mp4$/, '.log')}).`); }
      res();
    });
  });
}
const cola = [...pendientes];
await Promise.all(Array.from({ length: Math.min(HILOS, cola.length) }, async () => { while (cola.length && !fallo) await uno(cola.shift()); }));
if (fallo) { console.error('Vuelve a correr el script para continuar desde aquí.'); process.exit(1); }

const txt = path.join(DIR, 'lista.txt');
fs.writeFileSync(txt, tramos.map((t) => `file '${t.f.replace(/\\/g, '/')}'`).join('\n'));
const audio = opt('audio');
const PELICULA = [
  'colorbalance=rs=-0.03:bs=0.05:rm=0.01:bm=-0.01:rh=0.05:gh=0.015:bh=-0.04',
  'eq=contrast=1.05:saturation=1.04',
  'vignette=angle=PI/4.6',
  'noise=c0s=10:c0f=t+u',
  'format=yuv420p',
].join(',');
const a = ['-y', '-loglevel', 'error', '-stats', '-f', 'concat', '-safe', '0', '-i', txt];
if (audio) a.push('-i', path.resolve(AQUI, audio), '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest');
a.push('-vf', PELICULA, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-r', String(FPS), '-movflags', '+faststart', SALIDA);
console.log('Uniendo tramos y aplicando el acabado de película…');
const r = spawnSync('ffmpeg', a, { stdio: 'inherit' });
if (r.status !== 0) process.exit(1);
console.log('Listo: ' + SALIDA);
