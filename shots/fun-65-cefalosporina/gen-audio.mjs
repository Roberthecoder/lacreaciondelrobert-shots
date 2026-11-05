// gen-audio.mjs — cama + efectos del Shot Fungi Mati #65 (cefalosporina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: misterio mediterráneo en la menor (Am–Dm–E–Am con un F de paso), con un "pizzicato" de notas cortas que avanza
// como detective; en «la cefalosporina C» se resuelve a do mayor (C–G–Am–F) y el motivo de 5 notas vuelve en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cefalosporina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 65);
const K = m.K;
const G = K.Gancho, B = K.Brotzu, Ti = K.Tifoidea, Sp = K.Sospecha, Mo = K.Moho, Ex = K.Extracto, P = K.Pregunta, Ox = K.Oxford, Cc = K.CefC, Tr = K.Truco, Pa = K.Pared, H = K.Hoy, C = K.Cierre, Ou = K.Outro;

const ACORDES = [[G, B, [45, 57, 60, 64]], [B, Ti, [38, 57, 62, 65]], [Ti, Sp, [41, 57, 60, 65]], [Sp, Mo, [40, 56, 59, 64]],
  [Mo, Ex, [45, 57, 60, 64]], [Ex, P, [38, 57, 62, 65]], [P, Ox, [40, 56, 59, 62]], [Ox, Cc, [41, 57, 60, 65]],
  [Cc, Tr, [48, 55, 60, 64]], [Tr, Pa, [43, 55, 59, 62]], [Pa, H, [45, 57, 60, 64]], [H, C, [41, 57, 60, 65]], [C, Ou + 3.5, [48, 55, 60, 64]]];
for (const [a, b, n] of ACORDES) m.pad(a, b + 0.15, 0.042, n, 0);
// pizzicato detectivesco: notas cortas que caminan, con otro dibujo en cada sección
const pizz = (t, notas, paso = 0.25, g = 0.035) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, 0.18));
pizz(B + 0.3, [57, 60, 64, 62, 60, 57, 59, 60]); pizz(Ti + 0.4, [57, 59, 60, 62, 64, 62, 60, 59]); pizz(Sp + 0.2, [64, 63, 64, 68, 64, 59]);
pizz(Ox + 0.3, [57, 60, 65, 64, 62, 60, 62, 64]); pizz(Tr + 0.3, [60, 64, 67, 64, 62, 59]); pizz(H + 0.3, [57, 60, 64, 65, 64, 60]);
const MOT = (t, fin, g = 0.045) => [69, 72, 76, 74, fin].forEach((n, i) => m.nota(t + i * 0.3, n, g, 0.6));
MOT(G + 0.3, 69); MOT(Mo + 2.4, 76, 0.04); MOT(Cc + 2.6, 79, 0.05); MOT(C + 2.0, 81, 0.05);
// efectos
m.whoosh(G + 0.05, 0.5, 0.12); m.golpe(G + 0.55, 0.3, 90); m.golpe(G + 1.6, 0.25, 80);          // el frasco cae · tache
m.whoosh(G + 2.4, 0.9, 0.08);                                                                      // sale el tubo
for (let t = 0.3; t < Ti - B; t += 1.4) m.whoosh(B + t, 1.0, 0.04);                                // olas
m.gota(B + 2.2, 0.2, 500); m.burbuja(B + 2.4, 0.12, 300);                                          // plop del frasco de muestra
m.whoosh(Ti + 0.2, 0.6, 0.1); for (let i = 0; i < 10; i++) m.tic(Ti + 0.9 + i * 0.25, 0.08, 2600 - i * 150); // se apagan
m.golpe(Sp + 1.0, 0.3, 70);                                                                        // sello HIPÓTESIS
m.sube(Mo + 0.2, 2.4, 50, 62, 0.03); for (let i = 0; i < 4; i++) m.gota(Mo + 1.0 + i * 0.4, 0.1, 900 + i * 80); // hifas y gotitas
m.sube(Ex + 0.4, 1.6, 55, 67, 0.03);                                                               // el halo crece
m.sube(P + 0.1, 1.4, 52, 64, 0.04);
m.whoosh(Ox + 1.0, 2.2, 0.06);                                                                     // el tubo viaja
m.golpe(Cc + 0.2, 0.3, 75); m.metal(Cc + 2.6, 0.12, 1600);                                         // tarjeta · brilla la molécula
m.metal(Tr + 1.9, 0.2, 900); m.cruje(Tr + 2.0, 0.25); m.metal(Tr + 3.6, 0.2, 1400);                // corta la penicilina · rebota
for (let i = 0; i < 4; i++) m.tic(Pa + 0.7 + i * 0.4, 0.1, 1200);                                  // tapan a los albañiles
m.golpe(Pa + 2.6, 0.35, 110); m.cruje(Pa + 2.65, 0.3);                                             // revienta
for (let i = 0; i < 5; i++) m.tic(H + 0.45 + i * 0.25, 0.1, 1700); m.nota(H + 2.0, 76, 0.05, 0.8);
m.whoosh(C + 0.4, 0.6, 0.1); m.burbuja(C + 0.8, 0.12, 420);
m.nota(Ou + 0.3, 48, 0.07, 3); m.nota(Ou + 0.3, 55, 0.05, 3); m.nota(Ou + 0.3, 60, 0.05, 3); m.nota(Ou + 0.5, 64, 0.04, 2.6);
m.guardar(OUT, 1);
