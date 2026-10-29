// gen-audio.mjs — cama grave + efectos del Shot Químico #34 (estrellitas que brillan en la oscuridad). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estrellitas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 34);
const K = m.K;
const G = K.Gancho, Q = K.Que, Ca = K.Carga, Tr = K.Trampas, Su = K.Suelta, Pr = K.Pregunta, Ra = K.Radio, Pi = K.Pintoras, Es = K.Estudio, Cu = K.Curioso, Ci = K.Cierre, Ou = K.Outro;
const volver = [0, 2.6, 0.7, 3.4, 1.5, 4.1, 2.1, 3.9];

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.tic(G + 0.35, 0.35, 900);                                                          // ¡clic! del apagador
for (let i = 0; i < 6; i++) m.nota(G + 0.6 + i * 0.08, 79 + (i % 3) * 3, 0.03, 0.8);  // se prenden las estrellitas
m.golpe(G + 1.7, 0.25, 90);                                                          // se tacha "radiactivas"
m.whoosh(G + 3.0, 0.8, 0.07);                                                        // la luz del sol "se guarda"
m.whoosh(Q + 0.3, 0.5, 0.1);                                                         // abre la lupa
m.tic(Q + 1.4, 0.2, 1500); m.tic(Q + 3.0, 0.2, 1800); m.tic(Q + 3.4, 0.2, 2000);     // etiquetas, europio, disprosio
m.zumbido(Ca - 0.2, Su + 0.4 - Ca, 0.025);                                           // luz que entra
for (let k = 0; k < 8; k++) m.nota(Ca + 0.5 + k * 0.32, 72 + k, 0.035, 0.3);         // cada carga que sale (sube: gana energía)
for (let k = 0; k < 8; k++) m.gota(Tr + 0.75 + k * 0.32, 0.1, 700);                  // "plop" en cada trampa
m.sube(Su + 0.3, 1.2, 50, 55, 0.04);                                                 // calorcito
for (let k = 0; k < 8; k++) m.nota(Su + 1.5 + volver[k], 84, 0.05, 0.6);              // destello verde de cada carga que regresa
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 12; i++) m.tic(Ra + 0.2 + i * 0.5, 0.08, 2400);                  // tic-tac del reloj
for (let i = 0; i < 20; i++) m.cruje(Ra + 1.9 + i * 0.22, 0.04);                     // crepitar de las partículas alfa
m.golpe(Pi + 0.3, 0.2, 70); m.bajo(Pi + 1.6, 38, 0.1, 1.4);                          // tono serio
m.golpe(Pi + 2.6, 0.2, 60);
m.golpe(Es + 0.2, 0.35, 80);
m.nota(Es + 3.8, 67, 0.05, 1.2); m.nota(Es + 3.8, 74, 0.05, 4.8);                    // dos frascos: uno se apaga, otro sigue
m.sube(Es + 4.6, 4.0, 64, 76, 0.03);                                                 // el reloj corre 24 h
m.tic(Es + 7.6, 0.2, 1600);
m.motor(Cu + 0.2, 2.0, 0.05);                                                        // horno
m.tic(Cu + 2.6, 0.3, 900);                                                           // clic de la lámpara
m.sube(Cu + 2.8, 1.3, 60, 72, 0.04);                                                 // la pila se llena
m.whoosh(Ci + 0.4, 0.5, 0.08);
for (let i = 0; i < 3; i++) m.nota(Ci + 1.5 + i * 1.6, 84, 0.04, 0.6);               // destellos de la lupa
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
