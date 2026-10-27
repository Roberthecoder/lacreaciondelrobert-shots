// estimar-escenas.mjs — estima la duración de cada escena de la versión narrada a partir de narracion.json,
// antes de tener la voz (calibrado con la voz real del shot 003). narrar.mjs las ajusta después a la voz real.
// Uso: node estimar-escenas.mjs <carpeta-del-shot> [--outro 3.5]
// Imprime el JSON para window.OM_SCENES y el total estimado.
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
const outro = Number(process.argv[process.argv.indexOf('--outro') + 1]) || 3.5;
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'narracion.json'), 'utf8'));
const CPS = 17.6, PAUSA = 0.35; // calibrado con el shot 003 (937 caracteres → 57.8 s de voz a ×1.065)
const esc = [];
for (const l of cfg.lineas) {
  const d = l.texto.length / CPS + PAUSA;
  if (esc.length && esc[esc.length - 1].name === l.escena) esc[esc.length - 1].dur += d; else esc.push({ name: l.escena, dur: d });
}
esc.forEach((e) => { e.dur = Math.round(e.dur * 10) / 10; });
esc.push({ name: 'Outro', dur: outro });
const chars = cfg.lineas.reduce((a, l) => a + l.texto.length, 0);
console.log(JSON.stringify(esc));
console.error(`caracteres: ${chars} · voz ≈ ${esc.slice(0, -1).reduce((a, e) => a + e.dur, 0).toFixed(1)} s · total ≈ ${esc.reduce((a, e) => a + e.dur, 0).toFixed(1)} s`);
