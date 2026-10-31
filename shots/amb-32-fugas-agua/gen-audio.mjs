// gen-audio.mjs — cama grave + efectos del Shot Ambiental #32 (fugas de agua). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fugas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 32);
const K = m.K;
const G = K.Gancho, F = K.Fuga, Tu = K.Tubos, S = K.Suelo, P = K.Pregunta, Gd = K.Guadalajara, E = K.Estudio, A = K.Albercas, L = K.Llave, R = K.Regaderas, C = K.Cierre, Ou = K.Outro;
const PIERDEN = [1, 4, 6, 8];

m.pad(0, C + 2.8, 0.05, [45, 52, 57], 0.35);                 // tensa (tapada) mientras hay fugas
m.pad(C + 2.8, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);          // se abre cuando se cierra la llave
for (let i = 0; i < 10; i++) m.gota(G + 0.1 + i * 0.12, 0.13, 650 + i * 30);                    // 10 cubetas se llenan
for (const i of PIERDEN) m.burbuja(G + 2.6 + i * 0.08, 0.12, 420);                             // 4 se vacían
m.sube(G + 2.8, 0.8, 64, 57, 0.05);
m.whoosh(F + 0.3, 0.9, 0.14); for (let i = 0; i < 6; i++) m.burbuja(F + 0.5 + i * 0.25, 0.06, 360);   // fuga en la calle
m.sube(Tu + 0.6, 2.6, 52, 64, 0.05); m.metal(Tu + 3.2, 0.18, 700);                              // manómetro y desgaste
m.cruje(S + 0.6, 0.5); m.golpe(S + 2.0, 0.3, 70); m.whoosh(S + 2.0, 0.6, 0.1);                    // el suelo baja, el tubo se raja
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 4; i++) m.gota(Gd + 0.4 + i * 0.15, 0.12, 700 + i * 40);                     // 4 cubetas de Chapala
m.burbuja(Gd + 3.0, 0.12, 400); m.sube(Gd + 3.0, 1.3, 60, 52, 0.04);                             // 1 se pierde
m.golpe(E + 0.3, 0.3, 110); m.nota(E + 0.5, 64, 0.05, 0.8);                                     // tarjeta del estudio
for (let i = 0; i < 10; i++) m.gota(E + 3.6 + i * 0.2, 0.07, 1000 + (i % 3) * 140);             // gotas del globo
m.sube(E + 3.8, 1.4, 45, 64, 0.05);
for (let i = 0; i < 60; i += 3) m.tic(A + 0.1 + i * 0.03, 0.05, 1500 + i * 10);                  // albercas que se llenan
for (let k = 0; k * 1 + 0.2 < R - L; k++) m.gota(L + 0.2 + k + 0.6, 0.2, 950);                   // 1 gota por segundo (al caer)
for (let k = 0; k < 6; k++) m.tic(L + 0.2 + k, 0.04, 2400);                                      // el segundero
for (let i = 0; i < 6; i++) m.whoosh(R + 0.3 + i * 0.25, 0.5, 0.05);                             // regaderas
m.nota(R + 1.2, 67, 0.05, 0.8);
for (let i = 0; i < 10; i++) m.gota(C - 0.7 + i * 0.12, 0.1, 650 + i * 30);                      // regreso a las 10 cubetas
for (let k = 0; k < 3; k++) m.gota(C + 0.6 + k, 0.18, 950);                                      // la llave de tu casa gotea…
m.nota(C + 2.9, 69, 0.07, 1.2); m.nota(C + 2.9, 76, 0.04, 1.2);                                  // …y se cierra
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
