// gen-audio.mjs — cama grave + efectos del Shot Ambiental #27 (lobo mexicano). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lobo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 27);
const K = m.K;
const G = K.Gancho, Ca = K.Casi, U = K.Ultimo, R = K.Rescate, S = K.Siete, P = K.Pregunta, Su = K.Suelta, Co = K.Conteo, M = K.Mexico, Tr = K.Truco, C = K.Cierre, Ou = K.Outro;

// cama: tapada mientras dura el problema (Casi → Pregunta), libre desde la suelta
m.pad(0, Ca, 0.05, [45, 52, 57]);
m.pad(Ca, Su, 0.05, [45, 48, 52], 0.6);
m.pad(Su, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 2.0, 0.12); m.golpe(G + 1.7, 0.35, 70);                                  // la manada se recoge en 7
for (let i = 0; i < 7; i++) m.nota(G + 1.7 + i * 0.08, m.ESC[i + 2], 0.05, 0.5);
m.metal(Ca + 1.05, 0.25, 600); m.golpe(Ca + 1.6, 0.25, 140); m.gota(Ca + 2.2, 0.2, 500);       // trampa, bala, veneno
for (let i = 0; i < 7; i++) m.tic(Ca + 1.2 + i * 0.32, 0.06, 900);                            // se apagan
m.sube(U + 2.2, 1.4, 57, 45, 0.05);                                                           // el último se desvanece
m.metal(R + 0.3, 0.15, 400); for (let i = 0; i < 5; i++) m.tic(R + 1.4 + i * 0.35, 0.07, 1300);
for (let g = 0; g < 3; g++) m.nota(S + 0.3 + g * 0.9, 60 + g * 4, 0.07, 0.7);                  // tres linajes
m.golpe(S + 3.5, 0.3, 90); m.nota(S + 4.4, 69, 0.07, 1.0);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let c = 0; c < 3; c++) { m.metal(Su + 0.4 + c * 0.5, 0.12, 700); m.whoosh(Su + 0.8 + c * 0.5, 0.6, 0.08); }
m.nota(Su + 3.4, 64, 0.06, 0.8);
for (let i = 0; i < 28; i++) m.tic(Co + 0.3 + 3.9 * (i / 27) ** 0.8, 0.05, 1500 + i * 30);      // contador por año
m.sube(Co + 4.0, 1.2, 57, 69, 0.07); m.nota(Co + 4.2, 76, 0.06, 1.4);                          // 319: aullido sintético
for (let i = 0; i < 5; i++) m.burbuja(M + 0.8 + i * 0.3, 0.07, 700 + i * 60);                   // cachorros que asoman
m.whoosh(Tr + 0.4, 1.4, 0.08); m.golpe(Tr + 1.8, 0.2, 110);
for (let i = 0; i < 10; i++) m.gota(Tr + 2.6 + i * 0.2, 0.08, 1100);                              // pipí compartida
m.nota(Tr + 3.6, 67, 0.05, 0.8); m.nota(Tr + 3.9, 72, 0.05, 0.8);
m.whoosh(C + 0.1, 1.6, 0.1); for (let i = 0; i < 7; i++) m.nota(C + 0.2 + i * 0.1, m.ESC[i + 4], 0.04, 0.6);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
