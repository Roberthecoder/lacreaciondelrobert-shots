// gen-audio.mjs — cama grave + efectos del Shot Químico #32 (el cerillo de seguridad). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cerillo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 132);
const K = m.K;
const G = K.Gancho, Ca = K.Cabeza, Ti = K.Tira, Fr = K.Friccion, Ch = K.Chispa, Ll = K.Llama, Pr = K.Pregunta, Hu = K.Huelga, Qu = K.Quijada, Be = K.Berna, Br = K.Brillo, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Br, 0.05, [45, 52, 57]);
m.whoosh(G + 0.02, 0.6, 0.2);                                                         // raspón
m.tic(G + 0.45, 0.3, 2600); m.tic(G + 0.5, 0.2, 3200);                                // chispa
m.whoosh(G + 0.55, 0.5, 0.14);                                                         // "fuf" de la llama
m.golpe(G + 1.9, 0.22, 110);                                                           // se tacha el mito
for (let i = 0; i < 10; i++) m.nota(Ca + 0.4 + i * 0.08, 72 + (i % 3) * 2, 0.04, 0.3); // cristales de clorato
for (let i = 0; i < 9; i++) m.nota(Ca + 2.4 + i * 0.08, 67 + (i % 2) * 3, 0.04, 0.3);  // granos de azufre
m.whoosh(Ti - 0.2, 0.7, 0.08);                                                         // entrada al microscopio
for (let i = 0; i < 6; i++) m.tic(Ti + 0.4 + i * 0.25, 0.08, 1800);                    // vidrio que brilla
for (let i = 0; i < 6; i++) m.whoosh(Fr + 0.3 + i * 0.98, 0.5, 0.12);                 // la cabeza que raspa
m.sube(Fr + 0.3, 3.9, 50, 62, 0.04);                                                  // calor
for (let i = 0; i < 4; i++) m.burbuja(Fr + 2.2 + i * 0.45, 0.12, 1200);               // rojo → blanco
for (let i = 0; i < 4; i++) { m.tic(Ch + 1.0 + i * 0.25, 0.3, 3000); m.golpe(Ch + 1.0 + i * 0.25, 0.12, 140); } // chispas
for (let i = 0; i < 6; i++) m.burbuja(Ll + 0.4 + i * 0.2, 0.1, 700);                  // oxígeno
m.whoosh(Ll + 2.3, 0.9, 0.18);                                                         // la llama
m.sube(Pr + 0.1, 1.8, 52, 64, 0.05);
m.golpe(Hu + 0.2, 0.35, 80);                                                           // tarjeta 1888
for (let i = 0; i < 28; i++) m.tic(Hu + 2.6 + i * 0.16, 0.06, 500 + (i % 2) * 120);   // pasos de la fila
m.zumbido(Qu + 0.2, 2.6, 0.05, 150);                                                   // vapor
m.nota(Qu + 4.0, 57, 0.06, 1.2); m.nota(Qu + 4.3, 53, 0.05, 1.4);                     // una se apaga
m.golpe(Be + 1.6, 0.45, 70); m.metal(Be + 1.62, 0.1, 600);                            // sello
m.pad(Br, Ci, 0.02, [52, 57], 0.6);                                                    // se apaga la luz
m.nota(Br + 0.4, 88, 0.025, 2.4); m.nota(Br + 3.2, 91, 0.025, 2.6);                   // tono fino del brillo
m.pad(Ci, Ou + 3.7, 0.05, [45, 52, 57]);
m.whoosh(Ci + 0.1, 0.5, 0.1);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
