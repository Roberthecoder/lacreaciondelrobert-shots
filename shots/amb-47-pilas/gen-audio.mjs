// gen-audio.mjs — cama grave + efectos del Shot Ambiental #47 (la pila de los 600 mil litros). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pilas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, Ci = K.Cifras, F = K.Fuente, M = K.Mercurio, Le = K.Leyes, P = K.Pregunta, Es = K.Estudio, Esc = K.Escurre, Li = K.Litio, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, C + 0.5, 0.05, [45, 52, 56], 0.5);                                   // tensa (tapada) mientras dura el mito
m.pad(C + 0.5, Ou + 3.5, 0.05, [45, 52, 57]);                                 // se suelta en el cierre
m.whoosh(G - 0.3, 0.7, 0.12); m.gota(G + 0.42, 0.3, 500); m.burbuja(G + 0.6, 0.1, 320);   // la pila cae al garrafón
m.sube(G + 0.5, 1.9, 57, 45, 0.04);                                          // el agua se enturbia
for (let i = 0; i < 8; i++) m.tic(G + 0.2 + i * 0.17, 0.05, 1500 + i * 120);   // el contador sube
m.golpe(G + 2.6, 0.3, 80);                                                    // "¿de dónde salió?"
[0.3, 1.9, 3.6].forEach((d, i) => { m.whoosh(Ci + d, 0.45, 0.1); m.tic(Ci + d + 0.5, 0.12, 900 + i * 200); });   // 3 recortes
m.whoosh(F + 0.1, 3.0, 0.05); m.nota(F + 0.6, 62, 0.05, 0.6, 0.4); m.nota(F + 1.6, 61, 0.05, 0.6, 0.4);   // la lupa: fuente ¿?
m.metal(M + 0.3, 0.12, 900); m.golpe(M + 0.8, 0.25, 70);                      // la pila de mercurio
m.golpe(Le + 0.6, 0.45, 60); m.nota(Le + 1.4, 69, 0.05, 0.5);                 // sello EE. UU. 1996 + palomita
m.golpe(Le + 5.0, 0.45, 60); m.cruje(Le + 5.6, 0.3);                          // sello Minamata + tache
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                         // pregunta
m.golpe(Es + 0.2, 0.3, 90); m.whoosh(Es + 2.5, 0.6, 0.08);                   // tarjeta y columnas
for (let i = 0; i < 9; i++) m.gota(Esc + 0.2 + i * 0.5, 0.08, 800 + (i % 3) * 150);   // goteo con metales
m.motor(Li + 0.9, 0.7, 0.07); m.golpe(Li + 1.5, 0.5, 50); m.cruje(Li + 1.5, 0.5);   // prensa que aplasta
m.zumbido(Li + 1.6, 1.8, 0.05, 140);                                          // fuego
m.golpe(Mx + 0.3, 0.25, 90); m.nota(Mx + 1.0, 64, 0.05, 0.7); m.nota(Mx + 2.8, 60, 0.05, 0.7);
m.cruje(C + 1.1, 0.3); m.sube(C + 0.3, 1.5, 45, 57, 0.04);                    // se tacha el número, el agua se limpia
m.whoosh(C + 1.6, 1.0, 0.1); m.burbuja(C + 2.6, 0.1, 420); m.nota(C + 2.6, 69, 0.06, 0.9);   // la pila vuela al acopio
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
