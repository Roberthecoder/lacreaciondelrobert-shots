// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #82 (Tesgüino). Sin costo: todo se calcula (audio-kit.mjs), nada grabado.
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tesguino base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 82);
const K = m.K;
const G = K.Gancho, Ge = K.Germina, M = K.Malta, A = K.Atole, L = K.Levaduras, B = K.Burbujas, P = K.Pregunta, O = K.Olla,
  E = K.Estudio, Pa = K.Pasto, Te = K.Tesguinada, R = K.Robert, C = K.Cierre, Ou = K.Outro;

// Cama grave continua (cálida, de barro y madera) con armonía que avanza por secciones: nunca un solo acorde.
// la menor → do → fa (adentro del grano, misterio) → sol → fa/la (microscopio) → mi (tensión de las fases) → re suspendido (pregunta)
// → fa → sol (el estudio avanza) → la → fa mayor 7 (comunidad) → sol → la con la quinta y la décima arriba (regreso, más lleno).
const SECC = [
  [G, Ge, [45, 52, 57]], [Ge, M, [48, 52, 55]], [M, A, [41, 48, 53, 57]], [A, L, [43, 50, 55]], [L, B, [41, 48, 57]],
  [B, P, [40, 47, 52, 56]], [P, O, [38, 45, 50, 52]], [O, E, [41, 48, 53]], [E, Pa, [43, 50, 55, 59]], [Pa, Te, [45, 52, 57]],
  [Te, R, [41, 48, 52, 57]], [R, C, [43, 50, 55, 59]], [C, Ou + 3.5, [45, 52, 57, 64]],
];
SECC.forEach(([a, b, notas], i) => m.pad(Math.max(0, a - 0.15), b + 0.15, i === SECC.length - 1 ? 0.055 : 0.048, notas, i === 6 ? 0.25 : 0));
// Un motivo corto (4 notas) que abre cada parte grande y regresa al final en otra octava.
const MOT = [69, 72, 76, 74];
const motivo = (t, base = 0, g = 0.035) => MOT.forEach((n, i) => m.nota(t + i * 0.32, n + base, g, 0.9));
motivo(G + 0.4); motivo(M + 0.2, -2); motivo(L + 0.3, -4, 0.03); motivo(E + 0.3, -2); motivo(Te + 0.3, 0, 0.03); motivo(C + 0.4, 12, 0.03);

// 1 · gancho: el lienzo se levanta, burbuja que revienta, se abre la lupa
m.whoosh(G + 0.1, 0.6, 0.12); m.burbuja(G + 0.15, 0.18, 380);
[0.6, 1.1, 1.5, 2.2, 2.9].forEach((d, i) => m.burbuja(G + d, 0.09, 300 + i * 40));
m.sube(G + 1.0, 0.6, 60, 72, 0.04);
// 2 · germina: crujidos de granos que brotan + un pin en el mapa
for (let i = 0; i < 11; i++) m.tic(Ge + 0.6 + i * 0.22, 0.08, 1500 + (i % 3) * 300);
m.nota(Ge + 0.6, 81, 0.04, 0.5);
// 3 · enzimas que cortan (clics) y azúcar que se suelta (notitas brillantes)
for (let c = 0; c < 4; c++) for (let j = 0; j < 6; j++) m.tic(M + 0.4 + c * 0.25 + j * 0.28, 0.07, 2600);
for (let i = 0; i < 6; i++) m.nota(M + 1.0 + i * 0.25, m.ESC[6 + (i % 5)], 0.025, 0.4);
m.golpe(M + 2.4, 0.25, 110);                                          // «eso es malta»
// 4 · metate (raspado), fuego y hervor, chorro a las ollas
for (let i = 0; i < 6; i++) m.whoosh(A + 0.1 + i * 0.22, 0.2, 0.07);
m.motor(A + 1.5, 1.4, 0.05); for (let i = 0; i < 10; i++) m.burbuja(A + 1.6 + i * 0.13, 0.07, 250 + (i % 4) * 60);
for (let i = 0; i < 8; i++) m.gota(A + 3.2 + i * 0.12, 0.08, 600 + i * 15);
m.golpe(A + 3.1, 0.3, 80);                                            // TESGÜINO
// 5 · microscopio: yemas que se sueltan («blup») y CO₂ que sube
for (let i = 0; i < 4; i++) m.burbuja(L + 1.2 + i * 0.6, 0.12, 220 + i * 30);
for (let i = 0; i < 16; i++) m.burbuja(L + 1.8 + i * 0.22, 0.05, 500 + (i % 5) * 90);
m.zumbido(L + 0.5, 4.5, 0.025, 160);
// 6 · las 4 fases: el burbujeo sigue a la olla (lento → rápido → leve y luego fuerte → quieto)
[[0, 0.5, 0.35], [0.5, 1.15, 0.1], [1.15, 1.9, null], [1.9, 2.6, 0]].forEach(([a, b, paso], f) => {
  if (paso === 0) return;
  for (let t = a; t < b; ) { const u = (t - a) / (b - a); const p = paso == null ? klerp(0.3, 0.08, u) : paso; m.burbuja(B + t, 0.06, 300 + f * 70); t += p; }
  m.tic(B + a, 0.15, 1200 + f * 200);
});
function klerp(a, b, u) { return a + (b - a) * u; }
// 7 · pregunta: subida suspendida
m.sube(P + 0.1, 1.6, 50, 62, 0.05);
// 8 · olla vacía: golpe de barro, costra que se forma, lupa
m.golpe(O + 0.2, 0.3, 70); m.cruje(O + 0.5, 0.25); m.sube(O + 1.5, 0.6, 60, 70, 0.035); m.whoosh(O + 3.0, 0.6, 0.08);
// 9 · estudio: tarjeta, tapas de caja de Petri y colonias que aparecen
m.golpe(E + 0.2, 0.35, 85);
[3.9, 4.2, 4.5].forEach((d) => m.metal(E + d, 0.08, 1300));
for (let i = 0; i < 6; i++) m.nota(E + 4.0 + i * 0.15, 76 + (i % 3) * 2, 0.025, 0.35);
// 10 · el pasto: roce, gotas de yodo, «no detectadas»
m.whoosh(Pa + 0.3, 0.8, 0.07);
for (let i = 0; i < 3; i++) m.gota(Pa + 1.9 + i * 0.4, 0.12, 700);
m.golpe(Pa + 2.6, 0.28, 65);
// 11 · trabajo en comunidad: pasos y el tronco que se acomoda
for (let i = 0; i < 8; i++) m.golpe(Te + 0.3 + i * 0.42, 0.08, 120);
m.golpe(Te + 3.7, 0.25, 70);
// 12 · el sobre que vuela y llega
m.whoosh(R + 0.3, 1.9, 0.12); m.tic(R + 2.2, 0.25, 900); m.nota(R + 2.4, 79, 0.05, 0.6);
// 13 · cierre: la olla burbujea y se abre la lupa; flecha «de tanda en tanda»
for (let i = 0; i < 10; i++) m.burbuja(C + 0.2 + i * 0.4, 0.07, 320 + (i % 4) * 50);
m.sube(C + 0.6, 0.6, 60, 72, 0.035); m.whoosh(C + 2.4, 0.6, 0.06);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.45, 76, 0.03, 2.4);
m.guardar(OUT, 1);
