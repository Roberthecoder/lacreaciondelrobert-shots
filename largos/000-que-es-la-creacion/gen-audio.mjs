// gen-audio.mjs — música y efectos del Largo #00. Todo sintetizado aquí (nada grabado ni de catálogo).
// Uso: node gen-audio.mjs <archivo.dc.html> <salida.wav>
// - Cama cálida y continua, sin golpe marcado; el acorde cambia con cada capítulo.
// - Cada foto que entra trae su "fush"; cada escena entra con un barrido suave.
// - Datos hechos sonido: una nota por número que brota (E04), un toque por frasco en la repisa (E06),
//   32 notas = 32 países (E12), 50 toques = 50 estudiantes (E15) y 5 notas que suben con los "magníficos" (E20).
// Respeta "nat" (versión narrada): los tiempos de autor se convierten a tiempos reales.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Largo 00 base.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
const LIN = JSON.parse(html.match(/window\.LINEAS = (.*?);<\/script>/)[1]);
const K = {}, SEC = []; let acc = 0, accA = 0;
for (const s of scenes) { const nat = s.nat || s.dur; K[s.name] = { t0: accA, dur: nat }; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
const S = (n) => K[n].t0, F = (n) => K[n].t0 + K[n].dur, L = (i) => LIN[i].at, LE = (i) => LIN[i].until;
const TOTAL = acc, SR = 44100, N = Math.ceil((TOTAL + 0.5) * SR);
const mus = new Float32Array(N), sfx = new Float32Array(N);
let seed = 11; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
const ESC = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88]; // do mayor pentatónica

const nota = (t, m, g = 0.08, d = 0.8) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.3 * Math.sin(4 * Math.PI * f * u) + 0.1 * Math.sin(6 * Math.PI * f * u)) * env(u, 0.008, d * 0.35) * g; }, d);
const tic = (t, g = 0.12, f = 2600) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.4 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 80) * g, 0.06);
const pop = (t, g = 0.18) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (320 + 900 * Math.exp(-u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 18) * g; }, 0.25); };
const whoosh = (t, d = 0.6, g = 0.14) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 2800 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); };
const pad = (t0, t1, notas, g = 0.05) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
  for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / Math.max(1, n1 - n0);
    const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.35 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.002), 0) / notas.length;
    mus[i] += f(x, 650) * g * (0.85 + 0.15 * Math.sin(t * 0.6)) * Math.min(1, u * 6, (1 - u) * 6, (n1 - n0) / SR); } };

// 1. Cama por capítulo (acordes que cambian, siempre continua; se cruzan 2 s)
const CAP = [['E01', [48, 55, 60, 64]], ['E04', [45, 52, 57, 60]], ['E06', [41, 48, 53, 57]], ['E11', [43, 50, 55, 59]], ['E13', [48, 55, 60, 64]],
  ['E14', [45, 52, 57, 64]], ['E15', [41, 48, 53, 60]], ['E17', [43, 50, 55, 62]], ['E18', [48, 55, 60, 67]]];
CAP.forEach(([n, ac], k) => { const a = S(n), b = k + 1 < CAP.length ? S(CAP[k + 1][0]) + 2 : TOTAL; pad(Math.max(0, a - 1), b, ac, 0.06); });
// pulso suave de arpegio (sin golpe): una nota cada ~1.1 s del acorde del capítulo
CAP.forEach(([n, ac], k) => { const a = S(n), b = k + 1 < CAP.length ? S(CAP[k + 1][0]) : S('Outro') + 4; for (let t = a + 0.3, j = 0; t < b; t += 1.1, j++) nota(t, ac[j % 4] + 24, 0.022, 1.4); });

// 2. Barrido en cada cambio de escena y "fush"/pop en cada foto (tiempos leídos del jsx)
for (const n of Object.keys(K)) if (n !== 'E01') whoosh(S(n) - 0.45, 0.9, 0.1);
const jsx = fs.readFileSync(path.join(HERE, 'largo-00.jsx'), 'utf8');
for (const bloque of jsx.split(/\nfunction (?=E\d\d\()/).slice(1)) {
  const n = bloque.slice(0, 3), t0 = S(n), f = F(n);
  for (const m of bloque.matchAll(/<Foto [^>]*?at=\{([^}]+)\}[^>]*?desde="(\w+)"/g)) {
    try { const at = new Function('t0', 'f', 'L', 'LE', 'S', 'F', 'return ' + m[1])(t0, f, L, LE, S, F); if (m[2] === 'pop') pop(at, 0.2); else whoosh(at, 0.5, 0.12); pop(at + 0.45, 0.06); } catch {}
  }
}
// 3. Momentos de la historia
const G = S('E01'); whoosh(G + 0.05, 0.8, 0.16); tic(G + 0.9, 0.2, 1500);                       // la semilla vuela y cae en la maceta
nota(L(2), 72, 0.1, 1.6); nota(L(2) + 0.12, 76, 0.09, 1.6); nota(L(2) + 0.24, 79, 0.09, 2);         // aparece el logo
for (let k = 0; k < 10; k++) nota(S('E04') + 0.3 + k * 0.28, ESC[k], 0.07, 0.6);                    // E04: un número, una nota
for (let k = 0; k < 24; k++) tic(L(12) - 0.3 + (F('E06') - 0.6 - L(12) + 0.3) * (k + 1) / 24, 0.08, 3200); // E06: un frasco, un toque
for (let k = 0; k < 3; k++) pop(L(13 + k) + 0.1, 0.14);                                             // E07: los tres pasos
tic(S('E08') + 2.4, 0.15, 900); for (let k = 0; k < 6; k++) nota(S('E08') + 3.7 + k * 0.08, ESC[6 + k], 0.05, 0.5); // E08: se apaga la llama, brillo del peróxido
pop(L(19) + 0.8, 0.3);                                                                               // E09: sello de SÁTIRA
for (let k = 0; k < 3; k++) { nota(L(20 + k) + 0.2, ESC[4 + k * 2], 0.09, 1.2); }                   // E10: cada logro se ilumina
for (let k = 0; k < 32; k++) nota(L(27) + 4.2 + 3.3 * k / 32, ESC[k % ESC.length], 0.04, 0.4);      // E12: 32 países
for (let k = 0; k < 50; k++) tic(L(33) + 0.4 + 3 * k / 50, 0.06, 2800 + (k % 5) * 200);             // E15: 50 estudiantes
[60, 64, 67].forEach((m, k) => nota(L(33) + 6.5 + k * 0.1, m + 12, 0.08, 1.5));                     // Fungi Mati
for (let k = 0; k < 4; k++) pop(S('E18') + 0.6 + k * (L(38) - 0.8 - S('E18')) / 4, 0.12);          // E18: los hexágonos del logo
for (let k = 0; k < 6; k++) nota(L(39) + 1 + k * (LE(39) - L(39) - 1.5) / 6, ESC[2 + k], 0.08, 0.9); // E19: cada serie
const pal = LE(41) - L(41); for (let k = 0; k < 5; k++) nota(L(41) + 1.6 + k * (pal - 2.2) / 5, ESC[4 + k], 0.09, 1.1); // E20: 5 magníficos
[72, 76, 79, 84].forEach((m, k) => nota(S('Outro') + 0.2 + k * 0.15, m, 0.08, 2.2));                // cierre

// 4. Mezcla y WAV 16 bits estéreo
const out = Buffer.alloc(44 + N * 4);
// la música sube 1.8× y todo pasa por una saturación suave (tanh) para que se escuche fuerte sin picos
const mez = (i) => Math.tanh((mus[i] * 1.8 + sfx[i]) * 2.2);
let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(mez(i)));
const gn = 0.93 / Math.max(pk, 1e-6);
out.write('RIFF', 0); out.writeUInt32LE(36 + N * 4, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { const v = Math.max(-1, Math.min(1, mez(i) * gn)) * 32767; out.writeInt16LE(v | 0, 44 + i * 4); out.writeInt16LE(v | 0, 46 + i * 4); }
fs.mkdirSync(path.dirname(path.resolve(HERE, OUT)), { recursive: true });
fs.writeFileSync(path.resolve(HERE, OUT), out);
console.log(`Audio: ${OUT} · ${TOTAL.toFixed(1)} s`);
