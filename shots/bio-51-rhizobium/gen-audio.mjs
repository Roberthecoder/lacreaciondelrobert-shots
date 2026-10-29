// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #51 (Rhizobium y la nitrogenasa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Rhizobium base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 51);
const K = m.K;
const G = K.Gancho, Ai = K.Aire, Se = K.Senal, Re = K.Respuesta, Tu = K.Tunel, Ba = K.Bacteroide, Pr = K.Pregunta, Ni = K.Nitrogenasa,
  Tr = K.Trueque, Fa = K.Fabrica, In = K.Inoculante, Br = K.Brasil, Et = K.Etli, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
// gancho: la mata sale de la tierra, caen terrones, salen las bolitas
m.whoosh(G + 0.0, 0.8, 0.16); m.cruje(G + 0.2, 0.5);
for (let i = 0; i < 10; i++) m.tic(G + 0.4 + i * 0.12, 0.08, 900 + (i % 3) * 200);
for (let i = 0; i < 8; i++) m.burbuja(G + 0.5 + i * 0.14, 0.08, 600 + i * 40);
m.golpe(G + 2.0, 0.25, 90);                                            // se tacha «¿plaga?»
// aire: aparecen las moléculas, rebotes en la hoja
for (let i = 0; i < 12; i++) m.nota(Ai + i * 0.12, m.ESC[(i * 2) % 8], 0.025, 0.3);
for (let i = 0; i < 3; i++) m.tic(Ai + 2.65 + i * 0.7, 0.1, 1500);
// señal: un tic por flavonoide; la Lupa se abre
m.whoosh(Se + 0.1, 0.55, 0.14);
for (let i = 0; i < 12; i++) m.tic(Se + 0.3 + i * 0.22, 0.05, 2600);
// respuesta: factores Nod y el pelito que se enrosca
for (let i = 0; i < 10; i++) m.nota(Re + 0.1 + i * 0.12, 76 + (i % 3) * 3, 0.025, 0.25);
m.sube(Re + 1.0, 2.0, 52, 59, 0.05);
// túnel: las bacterias bajan
for (let i = 0; i < 6; i++) m.gota(Tu + 0.4 + i * 0.4, 0.1, 700);
// nódulo por dentro: la Lupa y los simbiosomas que aparecen
m.whoosh(Ba + 0.05, 0.55, 0.14);
for (let i = 0; i < 12; i++) m.burbuja(Ba + 0.2 + i * 0.14, 0.06, 500 + (i % 4) * 70);
// pregunta: martillazos
for (let i = 0; i < 4; i++) m.metal(Pr + 0.31 + i * 0.625, 0.14, 760);
// nitrogenasa: acopla, tres «clac», dos NH₃
m.golpe(Ni + 0.8, 0.22, 70); m.zumbido(Ni + 0.6, 1.0, 0.05, 160);
for (const t of [1.6, 2.1, 2.6]) { m.metal(Ni + t, 0.22, 1100); m.tic(Ni + t, 0.2, 3000); }
m.burbuja(Ni + 3.0, 0.12, 700); m.burbuja(Ni + 3.1, 0.12, 820);
// trueque: gotas que bajan y suben
for (let i = 0; i < 8; i++) m.gota(Tr + 0.4 + i * 0.4, 0.08, i % 2 ? 1100 : 750);
// fábrica: motor y vapor; la bacteria, una nota tranquila
m.motor(Fa + 0.2, 2.0, 0.08); m.sube(Fa + 0.4, 1.2, 50, 62, 0.05);
m.nota(Fa + 2.0, 69, 0.06, 1.2); m.nota(Fa + 2.2, 76, 0.05, 1.2);
// inoculante: el mapa, la bolsa que se vacía (arena) y las semillas cubiertas
m.golpe(In + 0.4, 0.2, 90);
m.whoosh(In + 2.0, 0.8, 0.1); m.cruje(In + 2.6, 0.35);
for (let i = 0; i < 13; i++) m.tic(In + 3.0 + i * 0.08, 0.05, 2000);
// Brasil: la barra se llena (una nota por cada tramo) y cae la medalla
for (let i = 0; i < 9; i++) m.nota(Br + 0.6 + i * 0.16, m.ESC[i], 0.03, 0.35);
m.golpe(Br + 1.5, 0.2, 80);                                            // se tacha la urea
m.metal(Br + 2.9, 0.2, 980); m.nota(Br + 2.9, 81, 0.05, 1.2);
// etli
m.whoosh(Et + 0.3, 0.9, 0.1); m.golpe(Et + 2.5, 0.25, 95);
// cierre
for (let i = 0; i < 6; i++) m.nota(Ci + 0.2 + i * 0.2, m.ESC[4 + i], 0.03, 0.4);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
