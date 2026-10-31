// tiempos.mjs — ajusta el video a la voz real: una duración por línea de escenas.js, a partir de los tiempos por carácter de ElevenLabs.
// Si el total pasa de 178.5 s (límite del formulario: 3:00), acelera la voz un poco (máx. ×1.06, sin cambiar el tono).
// Escribe video/tiempos.js (window.TIEMPOS_VOZ) y video/voz_info.json ({ vel, retraso, total }) para la mezcla de audio.
// Uso: node tiempos.mjs   (desde esta carpeta)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const VOZ = path.join(AQUI, '..', 'voz', 'narracion@eleven_v3.json');
const RETRASO = 0.45;      // la voz entra a los 0.45 s
const LIMITE = 178.5;

globalThis.window = {};
new Function(fs.readFileSync(path.join(AQUI, 'escenas.js'), 'utf8'))();
const lineas = window.CAPS.flatMap((c) => c.lineas);
const meta = JSON.parse(fs.readFileSync(VOZ, 'utf8'));
const al = meta.alignment, chars = al.characters.join('');

// dónde empieza cada línea dentro de la voz
let cursor = 0;
const ini = lineas.map((l) => {
  if (!l.t) return null;
  const t = l.t.replace('Jalisco, Mexico,', 'Jalisco, México,');
  const i = chars.indexOf(t.slice(0, 14), cursor);
  if (i < 0) throw new Error('No encuentro en la voz: ' + t.slice(0, 40));
  cursor = i + t.length - 2;
  return { s: al.character_start_times_seconds[i], e: al.character_end_times_seconds[Math.min(al.characters.length - 1, i + t.length - 1)] };
});
const finVoz = al.character_end_times_seconds.at(-1);
const extra = lineas.filter((l) => !l.t).reduce((a, l) => a + (l.d || 4), 0);
const bruto = RETRASO + finVoz + 0.8 + extra;
const vel = Math.min(1.06, Math.max(1, bruto / LIMITE));
const k = (x) => x / vel;

const tiempos = lineas.map((l, n) => {
  if (!l.t) return l.d || 4;
  const sig = ini.slice(n + 1).find((x) => x);
  const fin = sig ? k(sig.s) : k(finVoz) + 0.8;
  return +(fin - k(ini[n].s) + (n === 0 ? RETRASO + k(ini[0].s) : 0)).toFixed(3);
});
const total = tiempos.reduce((a, b) => a + b, 0) + 1;
fs.writeFileSync(path.join(AQUI, 'tiempos.js'), `// Generado por tiempos.mjs desde la voz real (Eleven v3). Velocidad ×${vel.toFixed(4)}.\nwindow.TIEMPOS_VOZ = ${JSON.stringify(tiempos)};\n`);
fs.writeFileSync(path.join(AQUI, 'voz_info.json'), JSON.stringify({ vel: +vel.toFixed(4), retraso: RETRASO, total: +total.toFixed(3), voz: +finVoz.toFixed(3) }, null, 1));
console.log(`Voz ${finVoz.toFixed(1)} s · velocidad ×${vel.toFixed(4)} · video ${total.toFixed(1)} s (${lineas.length} líneas)`);
