// gen-audio.mjs — cama grave + efectos del Shot Químico #42 (leche + limón + calor = queso). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Queso base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 42);
const K = m.K;
const G = K.Gancho, Q = K.Que, Ca = K.Carga, Ac = K.Acido, Cu = K.Cuajo, Su = K.Suero, Pr = K.Pregunta, Cl = K.Calor, Es = K.Estudio, Hi = K.Hipotesis, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.cruje(G + 0.05, 0.5);                                                                 // se exprime el limón
for (let i = 0; i < 14; i++) m.gota(G + 0.1 + i * 0.18, 0.1, 1000 + (i % 3) * 80);      // gotas de limón
for (let i = 0; i < 18; i++) m.burbuja(G + 0.4 + i * 0.13, 0.06, 420 + (i % 5) * 60);   // la leche hierve y se corta
m.whoosh(Q - 0.2, 0.7, 0.12);                                                           // bajamos al microscopio
for (let i = 0; i < 12; i++) m.nota(Q + 0.1 + i * 0.05, 69 + (i % 5) * 2, 0.025, 0.3);  // aparecen las micelas
for (let i = 0; i < 8; i++) m.tic(Q + 1.8 + i * 0.15, 0.05, 1600);                     // el medidor llega al 80 %
for (let k = 0; k < 4; k++) m.nota(Ca + 0.5 + k * 2.2 + 1.0, 76, 0.06, 0.25);           // las micelas rebotan
for (let i = 0; i < 12; i++) m.tic(Ac + 0.3 + i * 0.32 + 1.4, 0.06, 2200);              // cada H⁺ apaga una carga
m.sube(Ac + 0.4, 4.4, 57, 50, 0.03);                                                    // el pH baja
for (let i = 0; i < 10; i++) m.golpe(Cu + 1.0 + i * 0.3, 0.08, 120);                    // las micelas se pegan
for (let i = 0; i < 10; i++) m.gota(Su + 0.2 + i * 0.38, 0.14, 800);                    // escurre el suero
m.whoosh(Pr + 0.1, 0.5, 0.18); m.sube(Pr + 0.2, 1.6, 52, 64, 0.05);                      // fssh de la flama + pregunta
m.sube(Cl + 1.4, 1.0, 60, 72, 0.04);                                                    // el termómetro sube
for (let i = 0; i < 7; i++) m.nota(Cl + 4.3 + i * 0.12 + 0.5, 64 + (i % 4) * 3, 0.04, 0.3); // proteínas del suero se pegan
m.golpe(Cl + 5.0, 0.25, 90);                                                            // aparece el paneer
m.golpe(Es + 0.2, 0.35, 80);                                                            // tarjeta del estudio
m.metal(Es + 2.2, 0.08, 300);                                                           // la vasija de barro
m.tic(Es + 3.3, 0.12, 1800);                                                            // punto en Polonia
m.nota(Es + 5.6, 69, 0.07, 1.2); m.nota(Es + 5.6, 76, 0.05, 1.2);                       // brilla la grasa de leche
for (let i = 0; i < 9; i++) m.gota(Hi + 0.3 + i * 0.5, 0.12, 850);                      // el suero cae de la vasija
m.golpe(Da + 0.1, 0.25, 90); m.metal(Da + 1.4, 0.1, 900);                               // cartón → cubito
for (let i = 0; i < 10; i++) m.tic(Da + 1.6 + i * 0.1, 0.05, 1400 + i * 60);            // cuenta hasta 170 g
m.nota(Ci + 0.3, 64, 0.06, 1.0); m.nota(Ci + 0.6, 69, 0.06, 1.2);                        // el queso, listo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
