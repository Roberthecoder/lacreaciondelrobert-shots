// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #21 (anillos de hadas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Anillo Hadas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 21);
const K = m.K;
const G = K.Gancho, Es = K.Espora, Mi = K.Micelio, Ce = K.Centro, V = K.Verde, Ca = K.Cafe, S = K.Setas, P = K.Pregunta, E = K.Estudio, Ed = K.Edad, J = K.Japon, F = K.Folclor, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0);                                    // cama grave de asombro, continua
for (let i = 0; i < 7; i++) m.nota(G + 0.05 + i * 0.2, m.ESC[8 + (i % 5)], 0.03, 0.35); // tintineo de "hadas"
m.golpe(G + 1.4, 0.45, 75);                                                    // sello NO
m.whoosh(G + 2.4, 1.2, 0.12);                                                  // el anillo empuja hacia afuera
m.whoosh(Es + 0.1, 1.1, 0.08); m.gota(Es + 1.3, 0.2, 700);                     // la espora cae y toca el suelo
m.sube(Es + 1.7, 2.0, 50, 57, 0.035);                                          // sale el tubo
for (let i = 0; i < 14; i++) m.tic(Mi + 0.1 + i * 0.28, 0.06, 1800 + (i % 4) * 300); // las hifas crecen y se ramifican
m.sube(Ce + 0.2, 1.2, 45, 40, 0.04);                                           // el centro se agota
for (let i = 0; i < 4; i++) m.latido(Ce + 1.0 + i * 0.75, 0.16);               // el borde vivo avanza a pulsos
for (let i = 0; i < 10; i++) m.burbuja(V + 1.2 + i * 0.32, 0.08, 420 + (i % 4) * 60); // bolitas de nitrógeno que suben
m.sube(V + 1.0, 1.4, 57, 64, 0.035);                                           // el pasto crece
for (let i = 0; i < 16; i++) m.gota(Ca + 0.4 + i * 0.22, 0.12, 900 + (i % 5) * 120); // gotas que rebotan
m.sube(Ca + 0.8, 1.8, 55, 45, 0.04);                                           // el pasto se seca
for (let i = 0; i < 4; i++) m.nota(S + 0.9 + i * 0.3, m.ESC[4 + i], 0.06, 0.5);  // pop de cada seta
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // re-gancho
m.golpe(E + 0.2, 0.35, 80);                                                    // tarjeta 1917
for (let i = 0; i < 4; i++) m.tic(E + 0.3 + i * 0.2, 0.08, 1400);              // aparecen los anillos
for (let i = 0; i < 6; i++) m.tic(E + 2.8 + i * 0.2, 0.1, 2600);               // la cinta métrica
for (let i = 0; i < 18; i++) m.tic(Ed + 0.2 + i * 0.18, 0.07, 1200 + i * 40);  // el contador de años
m.nota(Ed + 3.4, 69, 0.06, 1.0);
m.golpe(J + 0.2, 0.3, 80); m.metal(J + 0.3, 0.12, 1700);                       // tarjeta 2010
m.whoosh(J + 3.0, 1.2, 0.1); m.burbuja(J + 4.1, 0.12, 380);                    // la molécula cae al pasto
m.sube(J + 4.0, 1.4, 57, 69, 0.04);                                            // el pasto crece
for (let i = 0; i < 3; i++) { m.golpe(F + 0.2 + i * 1.1, 0.25, 110); m.nota(F + 0.25 + i * 1.1, [72, 64, 60][i], 0.05, 0.6); } // tres viñetas
m.golpe(F + 3.6, 0.45, 70);                                                    // sello HONGO
m.whoosh(C, 1.4, 0.1); m.nota(C + 1.4, 64, 0.05, 1.2); m.nota(C + 2.2, 69, 0.05, 1.4);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
