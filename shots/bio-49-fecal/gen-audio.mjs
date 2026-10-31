// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #49 (trasplante de microbiota fecal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fecal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 49);
const K = m.K;
const G = K.Gancho, Bo = K.Bosque, An = K.Antibiotico, Di = K.Difficile, Re = K.Regresa, Pr = K.Pregunta, Es = K.Estudio,
  Pa = K.Parado, Bi = K.Bilis, Rb = K.Rebyota, Vo = K.Vowst, Do = K.Dosis, Ci = K.Cierre, Ou = K.Outro;
const es2 = Es + (Pa - Es) * 0.5;

// cama grave continua: abierta con el bosque sano, tapada mientras manda C. difficile, libre al repoblar
m.pad(0, An, 0.05, [45, 52, 57]);
m.pad(An, Pr, 0.05, [44, 51, 56], 0.7);
m.pad(Pr, Ou + 3.5, 0.05, [45, 52, 57]);
// 0 · el frasco que se sacude (sonaja de cápsulas)
for (let i = 0; i < 16; i++) m.tic(G + 0.02 + i * 0.075, 0.09, 2200 + (i % 4) * 300);
m.golpe(G + 1.3, 0.25, 90);                                   // la raya sobre «¿vitaminas?»
// 1 · la Lupa se abre sobre el colon
m.whoosh(Bo + 0.5, 0.7, 0.18);
for (let i = 0; i < 5; i++) m.nota(Bo + 0.9 + i * 0.18, [57, 60, 64, 67, 69][i], 0.05, 0.5);   // 38 billones
// 2 · la pastilla cae y el bosque se apaga
m.whoosh(An + 0.3, 1.2, 0.14);
for (let i = 0; i < 9; i++) m.nota(An + 0.8 + i * 0.26, 69 - i * 2, 0.04, 0.5, 0.5);
// 3 · C. difficile crece, se divide y suelta toxinas
m.golpe(Di + 0.3, 0.3, 70); m.burbuja(Di + 1.7, 0.2, 700); m.burbuja(Di + 1.9, 0.2, 700);
for (let i = 0; i < 6; i++) m.burbuja(Di + 1.0 + i * 0.4, 0.08, 300);
// 4 · esporas (pop) y recaídas (golpe sordo)
for (let i = 0; i < 3; i++) m.burbuja(Re + 0.4 + i * 0.15, 0.2, 700);
m.latido(Re + 1.2, 0.2); m.latido(Re + 2.1, 0.2); m.latido(Re + 3.0, 0.2);
// 5 · la pregunta
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
// 6–7 · el ensayo: la sonda avanza, las barras suben (13 notas = 13 curados de 16; 4 notas = 4 de 13)
m.golpe(Es + 0.2, 0.3, 80); m.whoosh(Es + 1.4, 1.2, 0.1);
for (let i = 0; i < 13; i++) m.nota(es2 + 0.1 + i * 0.08, 64 + (i % 5) * 2, 0.04, 0.4);
for (let i = 0; i < 4; i++) m.nota(es2 + 0.35 + i * 0.25, 52, 0.05, 0.4);
// 8 · el sello de ALTO
m.golpe(Pa + 0.9, 0.45, 70);
// 9 · la bilis gotea entre el bosque repoblado
for (let i = 0; i < 10; i++) m.gota(Bi + 0.6 + i * 0.4, 0.12, 800 + (i % 3) * 120);
// 10 · Rebyota: sello de APROBADO
m.golpe(Rb + 0.2, 0.3, 80); m.golpe(Rb + 2.2, 0.4, 75);
// 11 · Vowst: un clic por paso de fábrica
for (let i = 0; i < 5; i++) m.tic(Vo + 0.3 + i * 0.7, 0.12, 1500 + i * 150);
// 12 · 12 cápsulas = 12 clics (4 al día, 3 días)
for (let i = 0; i < 12; i++) m.tic(Do + 0.15 + i * 0.13, 0.1, 2000 + (i % 4) * 200);
m.golpe(Do + 1.5, 0.25, 90);                                  // tachar la sonda
// 13 · el bosque brota
m.whoosh(Ci + 0.2, 0.6, 0.12);
for (let i = 0; i < 8; i++) m.nota(Ci + 1.0 + i * 0.22, [57, 60, 62, 64, 67, 69, 72, 76][i], 0.05, 0.7);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
