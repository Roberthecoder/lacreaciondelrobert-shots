// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #74 (el cuerpo de hongo más grande). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gigante base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 74);
const K = m.K;
const G = K.Gancho, E = K.Encuentro, M = K.Medidas, P = K.Peso, Es = K.Especie, Po = K.Poros, Pr = K.Pregunta, Pe = K.Perenne, Ed = K.Edad, Sp = K.Esporas, C = K.Contraste, Ci = K.Cierre, Ou = K.Outro;

// Cama grave de bosque: cambia de acorde con cada parte (nunca el mismo color más de ~10 s).
m.pad(0, M, 0.05, [45, 52, 57], 0.1);            // la menor: el tronco y el hallazgo
m.pad(M, Po, 0.05, [41, 48, 57], 0.05);          // fa: las medidas
m.pad(Po, Pe, 0.045, [43, 50, 59], 0.2);         // sol, más cerrado: al microscopio y la pregunta
m.pad(Pe, C, 0.05, [40, 47, 55], 0.1);           // mi menor: capas, años, esporas
m.pad(C, Ou + 3.5, 0.05, [45, 52, 60, 64], 0);   // la con novena: se abre al final
[G, E, M, Po, Pe, C, Ci].forEach((t, i) => m.bajo(t + 0.05, [33, 33, 29, 31, 28, 33, 33][i], 0.1, 1.6));

// 1 · gancho: el tronco gira, la costra aparece, la cinta corre
m.cruje(G + 0.05, 0.7); m.golpe(G + 0.1, 0.35, 70);
m.whoosh(G + 0.2, 1.0, 0.1);
for (let i = 0; i < 14; i++) m.tic(G + 1.8 + i * 0.09, 0.1, 2200 + i * 40);   // cinta métrica que se desenrolla
m.metal(G + 3.0, 0.15, 900);
// 2 · el hallazgo
m.nota(E + 0.5, 69, 0.06, 0.8); m.nota(E + 0.75, 72, 0.05, 0.8); m.golpe(E + 1.0, 0.25, 90);
for (let i = 0; i < 12; i++) m.tic(E + 3.3 + i * 0.27, 0.05, 700 + (i % 2) * 200);  // pasos en la hojarasca
// 3 · medidas
m.whoosh(M + 0.4, 1.2, 0.08); m.tic(M + 1.6, 0.2, 1500);
m.whoosh(M + 2.6, 0.8, 0.06); m.tic(M + 3.4, 0.2, 1500); m.tic(M + 4.4, 0.2, 1800);
// 4 · báscula
m.golpe(P + 0.3, 0.35, 60); m.sube(P + 0.3, 1.3, 48, 60, 0.05); m.metal(P + 1.6, 0.18, 640);
// 5 · láminas no, poros sí
m.golpe(Es + 1.6, 0.4, 60); m.golpe(Es + 2.8, 0.3, 110); m.nota(Es + 2.85, 76, 0.05, 0.6);
// 6 · 49 poros que se encienden, y el número total
for (let i = 0; i < 49; i++) m.tic(Po + 0.3 + i * 0.045, 0.07, 2600 + (i % 7) * 120);
m.sube(Po + 3.0, 1.2, 57, 69, 0.05); m.golpe(Po + 4.2, 0.3, 80);
// 7 · re-gancho
m.sube(Pr + 0.1, 1.5, 52, 64, 0.05);
// 8 · capas que se apilan
for (let i = 0; i < 8; i++) m.nota(Pe + 0.6 + i * 0.375, [57, 60, 62, 64, 67, 69, 72, 74][i], 0.04, 0.5);
// 9 · contador de años y pudrición
for (let i = 0; i < 20; i++) m.tic(Ed + 0.2 + i * 0.08, 0.06, 1200);
m.cruje(Ed + 0.8, 0.4);
// 10 · esporas
[0.3, 0.6, 0.75, 0.9, 1.05, 1.2].forEach((d, i) => m.burbuja(Sp + d, 0.07, 500 + i * 60));
m.tic(Sp + 2.6, 0.15, 1600);
// 11 · la red de micelio bajo el bosque
m.sube(C + 0.5, 3.0, 40, 52, 0.05); m.zumbido(C + 0.5, 3.0, 0.03, 110);
// 12 · cierre: cinta, báscula y medalla
m.whoosh(Ci + 0.2, 0.6, 0.06); m.metal(Ci + 1.0, 0.12, 640); m.golpe(Ci + 1.6, 0.35, 70);
m.nota(Ci + 1.7, 69, 0.06, 1.2); m.nota(Ci + 1.8, 76, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
