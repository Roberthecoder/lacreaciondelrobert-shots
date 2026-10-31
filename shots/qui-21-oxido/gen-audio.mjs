// gen-audio.mjs — cama grave + efectos del Shot Químico #21 (el óxido). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Oxido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 121);
const K = m.K;
const G = K.Gancho, Mi = K.Mina, Re = K.Receta, Sa = K.Sal, Po = K.Poroso, Al = K.Aluminio, Pr = K.Pregunta, Pi = K.Pilar, Es = K.Estudio, Co = K.Costo, Ci = K.Cierre, Ou = K.Outro;
const mar = Sa + 3.6;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                              // cama grave, metálica
m.whoosh(G + 0.05, 0.85, 0.12);                                                       // el dedo raspa el barrote
for (let i = 0; i < 6; i++) m.tic(G + 0.15 + i * 0.12, 0.08, 2600);                    // polvito de óxido
m.metal(G + 1.8, 0.1, 520);                                                           // "¿mugre?" tachado
m.golpe(Mi + 0.3, 0.3, 70);                                                           // la roca aparece
m.whoosh(Mi + 2.6, 0.8, 0.1);                                                         // entra al horno
m.motor(Mi + 3.0, 3.6, 0.07);                                                         // rugido del horno
for (let i = 0; i < 8; i++) m.burbuja(Mi + 3.6 + i * 0.35, 0.07, 600 + i * 40);        // sale el oxígeno
m.metal(Mi + 4.6, 0.18, 820);                                                         // la barra de hierro
m.whoosh(Re + 0.4, 1.0, 0.08);                                                        // llega el O₂
m.gota(Re + 2.2, 0.25, 900);                                                          // llega la gota
m.sube(Re + 2.4, 1.6, 52, 59, 0.05);                                                  // se oxida
for (let i = 0; i < 3; i++) m.tic(Re + 2.6 + i * 0.4, 0.1, i === 2 ? 1500 : 900);     // tabla ✗ ✗ ✓
for (let i = 0; i < 4; i++) m.tic(Sa + 0.9 + [0, 0.2, 0.4, 0.6][i], 0.12, 1800);       // cubitos de sal
for (let i = 0; i < 12; i++) m.tic(Sa + 2.0 + i * 0.13, 0.06, 3200);                   // chispitas de corriente
m.whoosh(mar, 1.4, 0.12); m.whoosh(mar + 2.0, 1.2, 0.08);                             // olas
for (let i = 0; i < 9; i++) m.tic(Po + 0.4 + i * 0.15, 0.08, 1300);                    // grietas
for (let i = 0; i < 3; i++) m.cruje(Po + 1.6 + i * 1.1, 0.35);                         // escamas que caen
for (let i = 0; i < 3; i++) m.tic(Al + 2.7 + i * 0.7, 0.12, 2200);                     // O₂ rebota en el aluminio
m.nota(Al + 1.7, 69, 0.05, 0.8);                                                      // aparece la capa
m.sube(Pr + 0.1, 1.6, 47, 59, 0.05);                                                  // pregunta
m.golpe(Pi + 0.1, 0.35, 70); m.nota(Pi + 1.2, 57, 0.06, 1.2); m.nota(Pi + 1.2, 64, 0.05, 1.2); // el pilar
m.golpe(Es + 0.2, 0.35, 80);                                                          // tarjeta
for (let i = 0; i < 7; i++) m.nota(Es + 2.4 + i * 0.12, 64 + (i % 3) * 3, 0.03, 0.3); // átomos de fósforo
m.whoosh(Es + 3.2, 1.4, 0.07);                                                        // se forma la capa
for (let i = 0; i < 3; i++) m.tic(Es + 5.0 + i * 0.5, 0.12, 2200);                     // O₂ rebota
m.golpe(Co + 0.4, 0.4, 60);                                                           // 2.5 billones
for (let i = 0; i < 14; i++) m.tic(Co + 0.5 + i * 0.32, 0.04, 1100 + (i % 4) * 200);   // lluvia de escamas
m.metal(Ci + 1.2, 0.1, 520);                                                          // regreso a la reja
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
