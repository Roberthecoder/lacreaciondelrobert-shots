// gen-audio.mjs — cama grave + efectos del Shot IA #05 (alucinaciones, TruthfulQA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Alucinaciones base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 71);
const K = m.K, E = m.ESC;
const G = K.Gancho, Ex = K.Examen, Te = K.Temas, Ch = K.Chicle, M = K.Mito, P = K.Pregunta, I = K.Imita, Es = K.Estudio, R = K.Raro, Ci = K.Cifra, Co = K.Consejo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.sube(G + 0.1, 1.2, 52, 76, 0.05); m.sube(G + 0.1, 1.2, 52, 67, 0.04);            // las dos barras suben (94 y 58)
m.golpe(G + 1.3, 0.3, 80);
m.whoosh(Ex, 0.5, 0.12);
for (let i = 0; i < 8; i++) { const ok = (i * 5) % 3 !== 0; ok ? m.nota(Ex + 0.8 + i * 0.3, 72, 0.05, 0.3) : m.tic(Ex + 0.8 + i * 0.3, 0.12, 400); }  // palomitas y taches
for (let i = 0; i < 4; i++) m.golpe(Te + 0.3 + i * 0.5, 0.2, 90 + i * 15);         // 4 temas
m.nota(Te + 2.2, 69, 0.07, 0.8);
m.whoosh(Ch + 0.6, 1.0, 0.1); m.burbuja(Ch + 1.6, 0.2, 300);                        // trago
m.cruje(M + 2.0, 0.35);                                                           // se tacha el mito
for (let i = 0; i < 6; i++) m.burbuja(M + 2.8 + i * 0.45, 0.08, 260 + i * 30);        // el chicle pasa por el intestino
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 3; i++) m.tic(I + 0.3 + i * 0.4, 0.1, 1800); m.metal(I + 2.4, 0.08, 1500);   // "¡7 años!" × 3 y el robot lo repite
m.golpe(Es + 0.2, 0.35, 80);
m.sube(R + 0.5, 0.8, 45, 40, 0.07); m.golpe(R + 1.3, 0.35, 55);                      // el robot grande
m.sube(Ci + 1.2, 0.8, 64, 57, 0.06); m.golpe(Ci + 2.0, 0.3, 60);                     // −17 %
m.tic(Co + 0.2, 0.1, 2400); m.tic(Co + 1.0, 0.1, 2000); m.whoosh(Co + 1.6, 0.6, 0.1);
m.sube(C + 0.4, 1.2, 52, 76, 0.05); m.sube(C + 0.4, 1.2, 52, 67, 0.04); m.golpe(C + 1.6, 0.3, 80);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
