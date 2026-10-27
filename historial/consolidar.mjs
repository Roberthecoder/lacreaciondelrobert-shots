// Junta los temas que anotó cada sesión (historial/nuevos/<rama>.json) en historial/temas.json, sin duplicados.
//
//   node historial/consolidar.mjs              → junta y escribe temas.json
//   node historial/consolidar.mjs --revisar    → solo muestra qué cambiaría y los posibles repetidos
//   node historial/consolidar.mjs --buscar "hongos luz"   → busca temas parecidos en todo el banco
//
// Lee los archivos de la carpeta historial/nuevos/ y, además, los de todas las ramas remotas
// (origin/*) que ya se hayan descargado con `git fetch origin`. Así una sesión ve los temas
// que otras sesiones en paralelo ya apartaron en sus propias ramas.
//
// Formato de cada historial/nuevos/<rama>.json:  { "temas": [ { id, titulo, serie, numero, estado,
//   carpeta, rama, fuentes: [...], fecha: "AAAA-MM-DD", derivados: ["...", "..."] } ] }
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const BANCO = path.join(AQUI, 'temas.json');
const NUEVOS = path.join(AQUI, 'nuevos');
const ESTADOS = ['idea', 'guion', 'renderizado', 'aprobado', 'publicado'];
const args = process.argv.slice(2);
const soloRevisar = args.includes('--revisar');
const iBuscar = args.indexOf('--buscar');

const banco = JSON.parse(fs.readFileSync(BANCO, 'utf8'));

// 1. Reunir todos los registros nuevos (carpeta local + ramas remotas).
const registros = []; // { origen, tema }
const agregar = (origen, texto) => {
  let j; try { j = JSON.parse(texto); } catch (e) { console.warn(`⚠ ${origen}: JSON inválido (${e.message})`); return; }
  for (const t of Array.isArray(j) ? j : j.temas || []) if (t && t.id) registros.push({ origen, tema: t });
};
if (fs.existsSync(NUEVOS))
  for (const f of fs.readdirSync(NUEVOS).filter(f => f.endsWith('.json')))
    agregar(`nuevos/${f}`, fs.readFileSync(path.join(NUEVOS, f), 'utf8'));
try {
  const git = (c) => execSync(`git ${c}`, { cwd: AQUI, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 });
  const ramas = git('for-each-ref --format=%(refname:short) refs/remotes/origin').split('\n').filter(r => r && r !== 'origin/HEAD' && r !== 'origin');
  for (const r of ramas) {
    let lista = '';
    try { lista = git(`ls-tree --name-only ${r} historial/nuevos/`); } catch { continue; }
    for (const f of lista.split('\n').filter(f => f.endsWith('.json'))) {
      const local = path.join(NUEVOS, path.basename(f));
      const texto = git(`show ${r}:${f}`);
      // Si el archivo local es idéntico, ya se contó.
      if (fs.existsSync(local) && fs.readFileSync(local, 'utf8') === texto) continue;
      agregar(`${r}:${f}`, texto);
    }
  }
} catch { /* sin git o sin ramas remotas: solo la carpeta local */ }

// 2. Parecido entre títulos (palabras importantes en común).
const VACIAS = new Set('el la los las un una unos unas de del al y o que en con por para su sus tu tus es no se lo como más mas qué que cómo sin te a e ni'.split(' '));
const palabras = (s) => new Set(String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9ñ ]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !VACIAS.has(w)).map(w => w.replace(/(es|s)$/, '')));
const parecido = (a, b) => { const A = palabras(a), B = palabras(b); if (!A.size || !B.size) return 0;
  let c = 0; for (const w of A) if (B.has(w)) c++; return c / Math.min(A.size, B.size); };

if (iBuscar >= 0) {
  const q = args[iBuscar + 1] || '';
  const todos = [...banco.temas.map(t => ({ origen: 'temas.json', tema: t })), ...registros];
  const hits = todos.map(r => ({ ...r, p: Math.max(parecido(q, r.tema.titulo), parecido(q, (r.tema.derivados || []).join(' ')) * 0.8) }))
    .filter(r => r.p > 0).sort((a, b) => b.p - a.p).slice(0, 15);
  if (!hits.length) console.log('Nada parecido en el banco.');
  for (const h of hits) console.log(`${Math.round(h.p * 100)}%  [${h.tema.estado}] ${h.tema.id} — ${h.tema.titulo}  (${h.origen})`);
  process.exit(0);
}

// 3. Juntar: por id. Si ya existe, se actualiza (gana el estado más avanzado y se suman fuentes y derivados).
const porId = new Map(banco.temas.map(t => [t.id, t]));
const union = (a = [], b = []) => [...new Set([...a, ...b])];
let altas = 0, cambios = 0;
const avisos = [];
for (const { origen, tema } of registros) {
  const t = { ...tema };
  if (t.estado && !ESTADOS.includes(t.estado)) avisos.push(`${origen}: estado "${t.estado}" no es uno de ${ESTADOS.join(' / ')}`);
  const viejo = porId.get(t.id);
  if (!viejo) {
    for (const otro of porId.values()) {
      if (t.carpeta && otro.carpeta === t.carpeta) avisos.push(`${origen}: "${t.id}" usa la misma carpeta que "${otro.id}" (${t.carpeta})`);
      const p = parecido(t.titulo, otro.titulo);
      if (p >= 0.6) avisos.push(`${origen}: "${t.id}" se parece ${Math.round(p * 100)}% a "${otro.id}" — ${otro.titulo}`);
    }
    porId.set(t.id, { derivados: [], fuentes: [], ...t });
    altas++;
  } else {
    const antes = JSON.stringify(viejo);
    const rank = (e) => ESTADOS.indexOf(e);
    const estado = rank(t.estado) > rank(viejo.estado) ? t.estado : viejo.estado;
    Object.assign(viejo, Object.fromEntries(Object.entries(t).filter(([, v]) => v !== null && v !== undefined)), {
      estado, fuentes: union(viejo.fuentes, t.fuentes), derivados: union(viejo.derivados, t.derivados),
    });
    if (JSON.stringify(viejo) !== antes) cambios++;
  }
}

for (const a of avisos) console.warn('⚠ ' + a);
console.log(`${registros.length} registros leídos · ${altas} temas nuevos · ${cambios} actualizados · ${porId.size} en total`);
if (soloRevisar) process.exit(0);
banco.temas = [...porId.values()];
fs.writeFileSync(BANCO, JSON.stringify(banco, null, 2) + '\n');
console.log('Listo: historial/temas.json actualizado.');
