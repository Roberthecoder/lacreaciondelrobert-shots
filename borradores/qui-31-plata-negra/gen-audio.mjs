// gen-audio.mjs — cama grave + efectos del Shot Químico #31 (plata negra y el truco del aluminio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Plata base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const G = K.Gancho, Q = K.Que, A = K.Aire, H = K.Huevo, P = K.Pulir, Pr = K.Pregunta, Tr = K.Truco, E = K.Electrones, Es = K.Estudio, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const mitadEs = Es + 3.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.metal(G + 0.05, 0.18, 1300); m.metal(G + 0.6, 0.1, 1500);                               // tintineo del arete
m.golpe(G + 1.4, 0.25, 110);                                                              // se tacha "¿mugre?"
for (let i = 0; i < 4; i++) m.nota(Q + 0.5 + i * 0.85, 64 - i * 3, 0.05, 0.7);           // la capa cambia de color y se oscurece
for (let i = 0; i < 9; i++) m.whoosh(A + 0.4 + i * 0.45, 0.4, 0.05);                      // el gas baja
for (let i = 0; i < 9; i++) m.tic(A + 2.6 + i * 0.45, 0.12, 1600);                       // el azufre se pega
for (let i = 0; i < 16; i++) m.tic(H + 0.5 + i * 0.25, 0.06, 2600);                      // cronómetro
m.golpe(H + 2.6, 0.25, 90);
m.motor(P + 0.3, 2.9, 0.07);                                                              // trapo que raspa
for (let i = 0; i < 18; i += 3) m.tic(P + 0.4 + i * 0.15, 0.1, 3000);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.metal(Tr + 1.0, 0.08, 700); m.whoosh(Tr + 1.5, 1.0, 0.1);                              // bicarbonato y agua caliente
for (let i = 0; i < 10; i++) m.burbuja(Tr + 1.9 + i * 0.12, 0.07, 650);
m.metal(Tr + 3.8, 0.14, 1100);                                                            // la plata toca el aluminio
for (let i = 0; i < 14; i++) m.zumbido(E + 0.3 + i * 0.4, 0.15, 0.03, 300 + (i % 4) * 60); // electrones
for (let i = 0; i < 8; i++) m.nota(E + 0.9 + i * 0.4, 60 + i, 0.04, 0.5);                // la capa vuelve a plata
m.golpe(Es + 0.2, 0.35, 80);
m.metal(mitadEs - 0.2, 0.12, 900);
m.sube(mitadEs + 0.3, 1.3, 50, 74, 0.05); m.nota(mitadEs + 0.8, 52, 0.06, 0.5);           // barra ×25 y la chiquita
for (let i = 0; i < 4; i++) m.tic(D + [0.4, 1.0, 1.6, 2.6][i], 0.12, 1800);              // la lista
m.ruido ? m.ruido(D + 3.0, 0.5, 0.05) : m.motor(D + 3.0, 0.5, 0.05);                     // pfff
for (let i = 0; i < 3; i++) m.metal(Ci + 1.2 + i * 0.25, 0.08, 1800 + i * 300);            // brillo final
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
