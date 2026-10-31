// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #02 (hormiga zombi). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Los tiempos son de AUTOR (los mismos que usa shot-hormiga.jsx); en la narrada se convierten solos.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hormiga Zombi base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K, E = m.ESC;
const G = K.Gancho, Es = K.Espora, I = K.Invasion, S = K.Subida, M = K.Mordida, P = K.Pregunta, Ho = K.Hongo, F = K.Fosil, Hu = K.Humanos, Ca = K.Calor, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 4, 0.05, [38, 45, 50]);                                           // cama grave (re), sin golpe
for (const t of [Es, I, S, M, P, Ho, F, Hu, Ca, Ci]) m.whoosh(t - 0.4, 0.6, 0.16); // transiciones
// gancho: pasitos y la marioneta que baja
for (let t = G; t < G + 0.95; t += 0.12) m.tic(t, 0.05, 1600);
m.whoosh(G + 0.35, 0.7, 0.14); m.golpe(G + 1.05, 0.25, 110); m.sube(G + 1.1, 1.2, 50, 57, 0.04);
// espora: cae al suelo, germina, se pega
m.whoosh(Es + 0.05, 0.6, 0.18); m.golpe(Es + 0.7, 0.35, 90);
m.sube(Es + 0.9, 0.7, 57, 69, 0.05);
for (let t = Es + 1.5; t < Es + 3.3; t += 0.13) m.tic(t, 0.04, 1500);
m.gota(Es + 2.55, 0.3, 1200);
m.zumbido(Es + 3.55, 1.2, 0.07, 140); for (let i = 0; i < 6; i++) m.tic(Es + 3.6 + i * 0.2, 0.06, 900);
// invasión: el hongo crece (latido), cerebro limpio (sello)
for (let i = 0; i < 6; i++) m.latido(I + 0.6 + i * 0.45, 0.14);
m.sube(I + 0.6, 2.6, 45, 57, 0.04); m.nota(I + 3.1, 69, 0.08, 0.8); m.golpe(I + 3.4, 0.4, 70);
// subida: pasitos, regla, humedad
for (let t = S + 0.2; t < S + 4.6; t += 0.14) m.tic(t, 0.035, 1700);
m.sube(S + 2.5, 2.1, 52, 69, 0.04); m.nota(S + 4.6, 72, 0.08, 0.7);
for (let i = 0; i < 5; i++) m.gota(S + 5.4 + i * 0.35, 0.12, 700 + i * 80);
// mordida: el sol sube, ¡crac!
m.sube(M + 0.4, 1.7, 57, 69, 0.03); m.nota(M + 2.1, 76, 0.06, 1.0); m.golpe(M + 2.2, 0.5, 80); m.cruje(M + 2.2, 0.5);
// pregunta
m.golpe(P + 0.3, 0.3, 120); m.sube(P + 0.4, 1.4, 52, 64, 0.04);
// hongo: brota el tallo y caen esporas
m.sube(Ho + 0.35, 2.0, 40, 52, 0.06); m.golpe(Ho + 2.1, 0.3, 140);
for (let i = 0; i < 16; i++) m.gota(Ho + 2.6 + m.rnd() * 2.2, 0.06, 1100 + m.rnd() * 700);
// fósil: cae la losa, tarjeta, mordidas, 48
m.golpe(F + 0.5, 0.55, 55); m.metal(F + 0.6, 0.06, 500);
m.tic(F + 0.65, 0.12, 2200);
[1.3, 1.55, 1.8].forEach((d, i) => m.nota(F + d, E[4 + i], 0.06, 0.4));
m.golpe(F + 3.9, 0.35, 90); m.nota(F + 4.0, 57, 0.06, 1.2);
// humanos: sello NO, ✓ solo hormigas
m.golpe(Hu + 2.3, 0.5, 70); m.nota(Hu + 2.65, 69, 0.07, 0.6); m.nota(Hu + 2.8, 76, 0.06, 0.6);
// calor: el termómetro sube a 37 °C
m.sube(Ca + 0.5, 1.4, 45, 64, 0.06); m.metal(Ca + 1.75, 0.08, 1400); m.tic(Ca + 2.2, 0.08, 2000);
// cierre: regreso al inicio
m.whoosh(Ci + 0.05, 0.6, 0.14); m.golpe(Ci + 1.2, 0.2, 110); m.sube(Ci + 1.3, 1.6, 50, 62, 0.04);
m.nota(Ou + 0.3, 50, 0.08, 3); m.nota(Ou + 0.3, 57, 0.06, 3); m.nota(Ou + 0.3, 62, 0.05, 3);
m.guardar(OUT, 1);
