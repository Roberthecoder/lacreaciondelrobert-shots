// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #11 (monstruo de Gila y exendina-4). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: 39 notas = los 39 aminoácidos de la exendina-4 (cuando se arma la cadena, escenas Eng y Fabrica).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gila base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 11);
const K = m.K;
const G = K.Gancho, L = K.Lagarto, H = K.Hormona, Ti = K.Tijera, P = K.Pregunta, E = K.Eng, Ce = K.Cerradura, A = K.Aminoacido,
  X = K.Exenatida, F = K.Fabrica, O = K.Ozempic, Co = K.Comida, Ci = K.Cierre, Ou = K.Outro;
const ESC = m.ESC;

// cama grave continua; se tapa mientras la tijera corta el GLP-1 y se abre cuando la exendina-4 se le escapa
m.pad(0, Ti, 0.05, [45, 52, 57]);
m.pad(Ti, A + 2.6, 0.05, [45, 52, 57], 0.6);
m.pad(A + 2.6, Ou + 3.5, 0.05, [45, 52, 57, 64]);

// 0 · lengua del lagarto (siseo corto) y clic de la pluma
for (let i = 0; i < 3; i++) m.whoosh(G + 0.1 + i * 2.6, 0.25, 0.06);
m.whoosh(G + 0.8, 0.6, 0.1); m.tic(G + 2.45, 0.3, 1800); m.tic(G + 2.55, 0.25, 2400);
m.golpe(G + 1.6, 0.25, 90);                                   // tachón del mito
// 1 · el mapa se pinta
m.sube(L + 0.4, 0.8, 57, 64, 0.04); m.nota(L + 1.0, 69, 0.07, 0.8); m.metal(L + 1.6, 0.08, 900);
// 2 · comes (bocados) y salen las esferitas de GLP-1
for (let i = 0; i < 3; i++) m.tic(H + 0.2 + i * 0.35, 0.18, 900);
m.whoosh(H + 0.8, 0.5, 0.08);                                  // la Lupa se abre
for (let i = 0; i < 10; i++) m.burbuja(H + 1.2 + i * 0.35, 0.07, 600 + (i % 4) * 80);
// 3 · tijeretazos de la DPP-4 (cadenas 0, 2 y 4)
for (const j of [0, 2, 4]) { const t0 = Ti + 0.6 + j * 0.45; m.metal(t0 + 0.4, 0.14, 1500); m.tic(t0 + 0.42, 0.3, 3000); }
// 4 · pregunta
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 4; i++) m.tic(P + 1.6 + i * 0.45, 0.12, 2600);
// 5 · 1992: sello y 39 aminoácidos (una nota por aminoácido)
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 39; i++) m.nota(E + 2.6 + i * 0.065, ESC[(i * 3) % 10], 0.035, 0.35);
// 6 · las dos llaves entran a la cerradura y sale insulina
m.metal(Ce + 1.1, 0.16, 700); m.metal(Ce + 1.9, 0.16, 880);
for (let i = 0; i < 12; i++) m.burbuja(Ce + 2.1 + i * 0.12, 0.06, 900);
// 7 · la tijera corta el GLP-1 y resbala sobre la exendina-4
m.metal(A + 1.6, 0.15, 1500); m.tic(A + 1.62, 0.3, 3000);
for (let i = 0; i < 5; i++) m.tic(A + 2.6 + i * 0.12, 0.08, 4200 - i * 300);
m.nota(A + 2.8, 69, 0.07, 1.0); m.nota(A + 2.8, 76, 0.05, 1.0);
// 8 · sello de la FDA y barras que suben
m.golpe(X + 0.1, 0.35, 80); m.sube(X + 1.6, 1.0, 57, 76, 0.05);
// 9 · tache rojo y 39 aminoácidos en el matraz
m.golpe(F + 0.6, 0.3, 120);
for (let i = 0; i < 39; i++) m.nota(F + 1.0 + i * 0.05, ESC[(i * 5) % 10], 0.03, 0.3);
for (let i = 0; i < 6; i++) m.burbuja(F + 0.3 + i * 0.4, 0.05, 700);
// 10 · tachón del mito, cadena de semaglutida
m.golpe(O + 1.0, 0.25, 90);
for (let i = 0; i < 8; i++) m.tic(O + 1.0 + i * 0.125, 0.07, 1600);
// 11 · el huevo llega rodando y el medidor sube
m.golpe(Co + 1.0, 0.3, 70); m.sube(Co + 1.4, 1.2, 52, 59, 0.04);
// 12 · cierre: lengua otra vez y acorde final
m.whoosh(Ci + 0.3, 0.25, 0.06); m.whoosh(Ci + 2.9, 0.25, 0.06);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
