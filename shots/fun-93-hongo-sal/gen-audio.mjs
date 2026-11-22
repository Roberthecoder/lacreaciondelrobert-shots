// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #93 (Wallemia, el hongo de la sal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 93);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Mi = K.Minimo, Sa = K.Saturada, Se = K.Seca, P = K.Pregunta, Pa = K.Pared, B = K.Bolitas, E = K.Estudio, Pe = K.Pescado, Ge = K.Genoma, C = K.Cierre, Ou = K.Outro;

// la cama se «seca» (tapada) mientras la sal le roba agua a la célula y se abre cuando aparece la armadura
m.pad(0, Mi, 0.05, [43, 50, 55], 0.15);          // G
m.pad(Mi, Se, 0.05, [45, 52, 57], 0.25);         // Am: el medidor sube
m.pad(Se, Pa, 0.05, [41, 48, 53], 0.6);          // F tapado: la célula se seca
m.pad(Pa, E, 0.05, [43, 50, 59, 62], 0.05);      // G abierto: la armadura
m.pad(E, Ge, 0.05, [48, 55, 60], 0.15);          // C: salinas y Noruega
m.pad(Ge, Ou + 3.5, 0.05, [43, 50, 55, 62], 0);  // G abierto
for (let i = 0; i < 6; i++) m.gota(G + 0.15 + i * 0.2, 0.12, 500 + i * 60);    // aparecen las manchitas
m.zumbido(N + 0.2, 0.8, 0.04, 170);                                           // la lupa
for (let i = 0; i < 9; i++) m.tic(N + 0.8 + i * 0.09, 0.05, 900);             // células del racimo
for (let i = 0; i < 16; i++) m.tic(Mi + 0.3 + i * 0.14, 0.04, 2000 + i * 50); // granitos de sal en el medidor
m.golpe(Mi + 0.9, 0.2, 140); m.golpe(Mi + 2.4, 0.25, 110);                     // marcas: mar, mínimo
m.sube(Sa + 0.2, 1.4, 55, 67, 0.04); m.golpe(Sa + 1.6, 0.3, 80);               // saturada
for (let i = 0; i < 10; i++) m.tic(Sa + 0.8 + i * 0.12, 0.06, 3200);           // cristales al fondo del vaso
for (let i = 0; i < 8; i++) m.gota(Se + 0.5 + i * 0.25, 0.1, 1200 - i * 60);   // el agua sale de la célula
m.sube(P + 0.1, 1.2, 50, 62, 0.05);
m.metal(Pa + 1.0, 0.18, 600); m.metal(Pa + 1.8, 0.15, 760);                   // «clank» de la armadura
for (let i = 0; i < 12; i++) m.burbuja(B + 0.8 + i * 0.18, 0.05, 300 + i * 30); // los racimos crecen
m.golpe(E + 0.2, 0.35, 80); m.whoosh(E + 2.6, 0.7, 0.08);
m.golpe(Pe + 0.3, 0.3, 90); m.nota(Pe + 2.0, 69, 0.05, 0.8); m.nota(Pe + 2.3, 72, 0.05, 0.8);
m.nota(Ge + 0.3, 48, 0.06, 1.4); m.nota(Ge + 1.5, 84, 0.05, 0.6);              // barra enorme (grave) y diminuta (aguda)
for (let i = 0; i < 6; i++) m.nota(C + 0.5 + i * 0.12, 67 + i * 2, 0.04, 0.5);
m.nota(Ou + 0.3, 43, 0.08, 2.8); m.nota(Ou + 0.3, 50, 0.06, 2.8); m.nota(Ou + 0.3, 55, 0.05, 2.8);
m.guardar(OUT, 1);
