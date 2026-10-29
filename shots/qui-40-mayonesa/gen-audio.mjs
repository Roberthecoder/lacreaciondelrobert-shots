// gen-audio.mjs — cama grave + efectos del Shot Químico #40 (mayonesa: emulsión de aceite y yema). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mayonesa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 40);
const K = m.K;
const G = K.Gancho, Q = K.Que, Pb = K.Problema, Y = K.Yema, Ec = K.Escudo, Ep = K.Espesa, Pr = K.Pregunta, Es = K.Estudio, Re = K.Resultado, Le = K.Ley, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.05, 0.5, 0.12);                                                         // la cuchara entra
m.gota(G + 0.4, 0.2, 500); m.whoosh(G + 0.6, 0.7, 0.1);                                // sale la cucharada
m.zumbido(G + 1.9, 0.6, 0.05, 330);                                                    // se abre la lupa
m.whoosh(Q + 0.3, 1.6, 0.06);                                                          // chorro de aceite
m.nota(Q + 2.6, 64, 0.06, 0.5); m.nota(Q + 3.2, 67, 0.06, 0.5); m.nota(Q + 3.8, 71, 0.06, 0.6); // yema, agua, vinagre
m.whoosh(Pb + 0.1, 1.0, 0.1);                                                          // se agita el vaso
for (let i = 0; i < 6; i++) m.burbuja(Pb + 1.4 + i * 0.4, 0.12, 300 + i * 30);          // ¡blop! las gotas se juntan
m.golpe(Y + 0.8, 0.3, 120);                                                            // ¡plop! cae la yema
for (let i = 0; i < 9; i++) m.tic(Y + 2.1 + i * 0.18, 0.06, 1500 + i * 60);            // moléculas a la orilla
for (let i = 0; i < 22; i++) m.tic(Ec + 0.6 + i * 0.07, 0.04, 1800);                   // el forro
m.tic(Ec + 3.45, 0.25, 900); m.golpe(Ec + 3.45, 0.18, 160);                            // ¡toc!
m.cruje(Ep + 2.0, 0.4);                                                                // la cuchara empuja
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.7, 0.35, 80);                                                           // tarjeta 2024
for (let i = 0; i < 7; i++) m.nota(Es + 3.4 + i * 0.12, 60 + i, 0.04, 0.3);           // siete tazones
for (let i = 0; i < 2; i++) { m.gota(Re + 0.3 + i * 0.5, 0.15, 800); m.nota(Re + 1.3 + i * 0.5, 72, 0.06, 0.5); }
for (let i = 0; i < 5; i++) { m.whoosh(Re + 2.3 + i * 0.32, 0.4, 0.08); m.metal(Re + 3.3 + i * 0.32, 0.06, 500); }
m.whoosh(Re + 5.0, 0.8, 0.1);                                                          // se voltea
m.pad(Re + 2.3, Le, 0.025, [44, 51], 0.5);                                             // tensa mientras se corta
m.golpe(Le + 2.35, 0.35, 70); m.nota(Le + 3.45, 69, 0.08, 0.8); m.nota(Le + 3.45, 76, 0.05, 0.8); // sellos
m.zumbido(Ci + 0.6, 0.6, 0.05, 330);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
