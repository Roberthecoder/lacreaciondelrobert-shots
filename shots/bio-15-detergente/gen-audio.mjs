// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #15 (enzimas del detergente). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Detergente base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 15);
const K = m.K;
const G = K.Gancho, Ma = K.Mancha, Ja = K.Jabon, Mi = K.Microscopio, Pt = K.Proteasa, Am = K.Amilasa, Pr = K.Pregunta, Fr = K.Frio,
  Ta = K.Tanque, Bi = K.Biotex, Es = K.Estudio, Gr = K.Granitos, Pa = K.Pancreas, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// 0 · el polvo cae (arena fina) desde el cuadro 0
m.whoosh(G + 0.02, 1.4, 0.07);
for (let i = 0; i < 30; i++) m.tic(G + 0.1 + i * 0.09, 0.05, 3000 + (i % 5) * 300);
m.nota(G + 1.2, 69, 0.05, 0.6);                                                      // el granito de enzima
// 1 · tres manchas (una gota por mancha)
[0.2, 0.9, 1.6].forEach((d, i) => m.gota(Ma + d, 0.22, 700 - i * 120));
// 2 · burbujas de jabón
for (let i = 0; i < 18; i++) m.burbuja(Ja + 0.3 + i * 0.13, 0.08, 600 + (i % 5) * 90);
m.golpe(Ja + 2.0, 0.2, 90);                                                          // "solo jabón" tachado
// 3 · la lupa se abre
m.whoosh(Mi + 0.1, 0.7, 0.18);
// 4 · un clic por cada corte de la proteasa (3 cortes)
[0, 1, 2].forEach((i) => { m.tic(Pt + 1.0 + i * 1.0, 0.3, 2200); m.nota(Pt + 1.0 + i * 1.0, 72 + i * 2, 0.05, 0.4); });
// 5 · amilasa corta el almidón, lipasa parte la gota; el agua se lo lleva
m.tic(Am + 0.5, 0.28, 1900); m.tic(Am + 1.7, 0.28, 1600);
for (let i = 0; i < 5; i++) m.burbuja(Am + 1.8 + i * 0.08, 0.1, 400 + i * 60);
m.whoosh(Am + 2.6, 1.6, 0.1);
// 6 · el termómetro baja (silbido descendente) y aparece el copo
m.sube(Pr + 0.3, 1.9, 76, 60, 0.05); m.nota(Pr + 1.6, 84, 0.05, 0.9);
// 7 · las bacterias sueltan enzimas (un pop por enzima)
for (let i = 0; i < 9; i++) m.burbuja(Fr + 0.4 + i * 0.35, 0.07, 800 + (i % 3) * 120);
// 8 · el agitador del tanque: pulso lento + burbujas
for (let i = 0; i < 4; i++) m.golpe(Ta + 0.2 + i * 0.9, 0.12, 60);
for (let i = 0; i < 14; i++) m.burbuja(Ta + 0.1 + i * 0.24, 0.06, 450 + (i % 4) * 70);
m.whoosh(Ta + 0.8, 0.6, 0.14);                                                       // lupa
// 9 · 1963: sello de la tarjeta y el agua del remojo
m.golpe(Bi + 0.2, 0.32, 80); for (let i = 0; i < 4; i++) m.gota(Bi + 1.5 + i * 0.5, 0.12, 800);
// 10 · 1969: la fábrica, la tos, los pulmones que se ponen rojos (tapado: es el problema)
m.golpe(Es + 0.2, 0.32, 80); m.motor(Es, 6.3, 0.05);
[2.3, 2.6, 2.9].forEach((d) => m.whoosh(Es + d, 0.22, 0.12));
m.whoosh(Es + 3.0, 0.6, 0.14);
for (let i = 0; i < 4; i++) m.nota(Es + 3.6 + i * 0.4, 60 - i, 0.05, 0.6, 0.7);
// 11 · granitos: la lupa y un cascabeleo seco, sin nube
m.whoosh(Gr + 0.4, 0.6, 0.14);
for (let i = 0; i < 10; i++) m.tic(Gr + 1.0 + i * 0.07, 0.08, 2600 + (i % 3) * 400);
m.nota(Gr + 0.9, 69, 0.05, 0.8); m.nota(Gr + 1.1, 76, 0.05, 0.8);
// 12 · el páncreas se enciende y salen las tres tijeras
m.nota(Pa + 0.3, 64, 0.06, 0.8); [0, 1, 2].forEach((i) => m.burbuja(Pa + 0.9 + i * 0.3, 0.09, 700 + i * 150));
// 13 · la camisa limpia brilla
[0.4, 0.7, 1.0, 1.3].forEach((d, i) => m.nota(Ci + d, [76, 79, 81, 84][i], 0.05, 0.7));
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
