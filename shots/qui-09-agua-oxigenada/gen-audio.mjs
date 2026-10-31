// gen-audio.mjs — cama grave + efectos del Shot Químico #09 (agua oxigenada y catalasa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Oxigenada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 99);
const K = m.K;
const G = K.Gancho, Q = K.Que, Ca = K.Catalasa, Bu = K.Burbujas, Mi = K.Mito, Pr = K.Pregunta, Es = K.Estudio, Re = K.Revision, Ta = K.Takahara, Ci = K.Cierre, Ou = K.Outro;
const mitadRe = Re + 3.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 2.6, 0.08);                                                        // chorro
for (let i = 0; i < 24; i++) m.burbuja(G + 0.5 + i * 0.1, 0.07, 700 + (i % 6) * 90); // espuma
m.nota(Q + 0.5, 64, 0.05, 0.6); m.nota(Q + 2.2, 71, 0.07, 0.8);                      // el oxígeno de más
for (let i = 0; i < 7; i++) { m.tic(Ca + 1.2 + i * 0.35, 0.07, 1400); m.burbuja(Ca + 1.8 + i * 0.35, 0.08, 600); } // mordidas
for (let i = 0; i < 16; i++) m.burbuja(Bu + i * 0.14, 0.08, 800 + (i % 4) * 100);
m.golpe(Mi + 1.8, 0.3, 90);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80); for (let i = 0; i < 5; i++) m.gota(Es + 3.2 + i * 0.4, 0.15, 900);
for (let i = 0; i < 14; i++) m.nota(Es + 4.0 + i * 0.12, 64 - (i % 5), 0.03, 0.4);   // las células se apagan
m.metal(Re + 1.0, 0.12, 700);
for (let i = 0; i < 10; i++) m.gota(mitadRe + i * 0.3, 0.15, 1000);                   // la llave
m.golpe(Ta + 0.2, 0.35, 80); for (let i = 0; i < 4; i++) m.gota(Ta + 2.8 + i * 0.4, 0.18, 950);
m.pad(Ta + 3.0, Ci, 0.02, [52, 57], 0.6);                                              // silencio: no hay espuma
for (let i = 0; i < 12; i++) m.burbuja(Ci + 0.3 + i * 0.15, 0.07, 700);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
