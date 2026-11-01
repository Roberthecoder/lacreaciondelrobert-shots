// validar.mjs — revisa que escenas.js narre exactamente guion_final.md, en orden y sin faltantes,
// que cada foto exista en fotos.js y que cada ilustración exista. Uso: node validar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
globalThis.window = {};
new Function(fs.readFileSync(path.join(AQUI, 'fotos.js'), 'utf8'))();
new Function(fs.readFileSync(path.join(AQUI, 'escenas.js'), 'utf8'))();
const ilus = [...fs.readFileSync(path.join(AQUI, 'ilustraciones.jsx'), 'utf8').matchAll(/^\s{2}(\w+): \(\{/gm),
  ...fs.readFileSync(path.join(AQUI, 'ilustraciones2.jsx'), 'utf8').matchAll(/^\s{2}(\w+): \(\{/gm)].map((m) => m[1]);
for (const f of fs.readdirSync(AQUI).filter((f) => /^ilustraciones\d+\.jsx$/.test(f) && f !== 'ilustraciones2.jsx'))
  ilus.push(...[...fs.readFileSync(path.join(AQUI, f), 'utf8').matchAll(/^\s{2}(\w+): \(\{/gm)].map((m) => m[1]));
for (const f of fs.readdirSync(AQUI).filter((f) => /^cine-.*\.jsx$/.test(f)))
  ilus.push(...[...fs.readFileSync(path.join(AQUI, f), 'utf8').matchAll(/ILUSC\.(\w+) = /g)].map((m) => m[1]));

const guion = fs.readFileSync(path.join(AQUI, '..', 'guion_final.md'), 'utf8').split('---').slice(1).join('---');
const caps = guion.split(/^## /m).slice(1).map((b) => b.split('\n').slice(1).map((l) => l.trim()).filter((l) => l && !l.startsWith('[')));
let errores = 0;
const err = (m) => { errores++; console.log('✗ ' + m); };
const esc = window.CAPS;
esc.forEach((c, i) => {
  const g = caps[c.num];
  if (!g) return err(`capítulo ${c.num}: no existe en el guion`);
  c.lineas.forEach((l, j) => {
    if (g[j] !== l.t) err(`cap ${c.num}, línea ${j + 1}:\n   escena: ${l.t}\n   guion:  ${g[j]}`);
    const v = l.v; if (!v) return;
    for (const f of v.foto ? [v.foto] : v.fotos || []) if (!window.FOTOS['video/img/' + f + '.jpg']) err(`cap ${c.num}, línea ${j + 1}: no existe la foto ${f}`);
    if (v.tipo === 'ilus' && !ilus.includes(v.id)) err(`cap ${c.num}, línea ${j + 1}: no existe la ilustración ${v.id}`);
  });
  if (c.lineas.length < g.length) err(`cap ${c.num}: faltan ${g.length - c.lineas.length} líneas (siguiente: "${g[c.lineas.length]}")`);
});
const hechos = esc.map((c) => c.num);
console.log(`Capítulos en escenas.js: ${hechos.join(', ')} de ${caps.length}. ${errores ? errores + ' errores.' : 'Todo coincide con el guion.'}`);
process.exit(errores ? 1 : 0);
