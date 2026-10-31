// gen-audio.mjs — cama grave + efectos del Shot Químico #07 (jabón y micelas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Jabon base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 77);
const K = m.K;
const G = K.Gancho, Mo = K.Molecula, Sa = K.Sal, Mi = K.Micela, Gr = K.Grasa, Vi = K.Virus, Pr = K.Pregunta, Es = K.Estudio, Ta = K.Tallar, Hi = K.Historia, Ci = K.Cierre, Ou = K.Outro;
const mitad = Es + 4.6;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 14; i++) m.whoosh(G + i * 0.35, 0.3, 0.05);                  // tallado
for (let i = 0; i < 16; i++) m.burbuja(G + 0.1 + i * 0.25, 0.08, 600 + (i % 5) * 80); // espuma
m.whoosh(Mo, 0.8, 0.1); m.nota(Mo + 1.0, 72, 0.06, 0.6); m.nota(Mo + 2.4, 64, 0.06, 0.6);
for (let i = 0; i < 8; i++) m.tic(Sa + 0.3 + i * 0.18, 0.05, 2000 + i * 150);     // carbonos de la cola
for (let i = 0; i < 14; i++) m.tic(Mi + 0.4 + i * 0.2, 0.04, 2600);                // moléculas que se juntan
m.sube(Mi + 0.4, 3.0, 57, 69, 0.03);
for (let i = 0; i < 6; i++) m.gota(Gr + i * 0.15 + 1.4, 0.15, 700);               // gotas de grasa
m.whoosh(Gr + 2.4, 1.6, 0.15);                                                     // el agua se la lleva
m.sube(Vi + 0.3, 1.3, 57, 64, 0.03); m.cruje(Vi + 1.6, 0.5); m.golpe(Vi + 1.6, 0.3, 120); // se rompe la envoltura
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 10; i++) m.tic(mitad + i * 0.08, 0.05, 1800);
for (let i = 0; i < 3; i++) m.metal(mitad + 1.4 + i * 0.3, 0.08, 900);             // se apagan 3
for (let i = 0; i < 10; i++) m.whoosh(Ta + i * 0.35, 0.3, 0.06);
m.pad(Hi, Ci, 0.03, [40, 47], 0.4);
m.whoosh(Ci + 1.0, 2.5, 0.08); m.nota(Ci + 3.4, 72, 0.06, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
