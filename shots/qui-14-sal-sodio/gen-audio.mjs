// gen-audio.mjs — cama grave + efectos del Shot Químico #14 (sal = sodio + cloro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K;
const G = K.Gancho, So = K.Sodio, Cl = K.Cloro, El = K.Electron, Io = K.Iones, Pr = K.Pregunta, Cr = K.Cristal, Da = K.Davy, Yp = K.Ypres, Re = K.Reves, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 26; i++) m.tic(G + 0.3 + i * 0.1, 0.06, 3000 + (i % 5) * 300);   // granitos que caen
m.golpe(G + 1.8, 0.25, 110);                                                         // se tacha el mito
m.metal(G + 3.3, 0.12, 600); m.whoosh(G + 3.4, 0.8, 0.1);                            // aparecen sodio y cloro
m.whoosh(So + 0.3, 1.0, 0.08); m.tic(So + 1.3, 0.12, 1200);                           // cuchillo en la cera
for (let i = 0; i < 14; i++) m.burbuja(So + 2.9 + i * 0.07, 0.08, 700);               // hidrógeno
m.cruje(So + 3.4, 0.5);                                                              // chispa
m.whoosh(Cl + 1.2, 1.4, 0.1);                                                        // el gas viaja
m.golpe(Cl + 3.0, 0.3, 70);                                                          // ¡ácido!
m.sube(El, 1.4, 45, 57, 0.05);                                                       // entramos al grano
m.nota(El + 1.7, 76, 0.06, 0.5); m.nota(El + 2.7, 69, 0.06, 0.5);                    // el electrón · el hueco
m.sube(Io + 0.3, 1.0, 64, 76, 0.06); m.tic(Io + 1.3, 0.25, 2600);                     // salta: clic
m.latido(Io + 3.4, 0.18);                                                            // se atraen
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 27; i++) m.tic(Cr + 0.2 + i * 0.066, 0.05, 1800 + (i % 2) * 600); // iones que encajan
for (let i = 0; i < 6; i++) m.nota(Cr + 2.2 + i * 0.27, m.ESC[4 + i], 0.06, 0.4);     // los 6 vecinos
m.golpe(Da + 0.2, 0.35, 80); m.zumbido(Da + 1.8, 2.6, 0.05, 120);                     // pila de Davy
for (let i = 0; i < 5; i++) m.metal(Da + 2.4 + i * 0.35, 0.06, 1500 + i * 100);       // gotitas de sodio
m.golpe(Yp + 0.2, 0.35, 70); m.whoosh(Yp + 0.6, 3.0, 0.06);                           // la nube, sorda
m.zumbido(Re + 0.4, 2.0, 0.04, 140);
for (let i = 0; i < 16; i++) m.burbuja(Re + 0.8 + i * 0.12, 0.07, 650 + (i % 4) * 80); // burbujas en los electrodos
m.whoosh(Ci + 0.5, 0.6, 0.08);                                                       // se abre la lupa
m.nota(Ci + 3.0, 69, 0.05, 0.6); m.nota(Ci + 3.6, 72, 0.05, 0.8);                    // sodio y cloro entran al salero
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
