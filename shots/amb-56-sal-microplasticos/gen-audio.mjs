// gen-audio.mjs — cama grave + efectos del Shot Ambiental #56 (microplásticos en la sal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
const G = K.Gancho, Sa = K.Salina, Mi = K.Micro, Mn = K.Mina, Te = K.Termometro, A = K.Asia, P = K.Pregunta, Co = K.Colima, H = K.Hilitos, Sd = K.Salud, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
const sacudida = (t0) => { for (let i = 0; i < 8; i++) m.metal(t0 + i * 0.14, 0.04); for (let i = 0; i < 14; i++) m.tic(t0 + 0.4 + i * 0.07, 0.03, 2400 + (i % 4) * 300); };
sacudida(G);                                                                               // el salero y la pizca
m.nota(G + 0.4, 64, 0.06, 0.9);
for (let i = 0; i < 3; i++) { m.golpe(G + 4.5 + i * 0.35, 0.2, 140); m.nota(G + 5.2 + i * 0.3, 67 + i * 2, 0.04, 0.5); }   // mar, mina, lago
m.whoosh(Sa + 0.1, 0.8, 0.08); for (let i = 0; i < 6; i++) m.burbuja(Sa + 0.8 + i * 0.5, 0.04, 420);   // vapor
for (let i = 0; i < 6; i++) m.nota(Sa + 2.7 + i * 0.25, 76 + (i % 3) * 3, 0.03, 0.4);                 // cristalizan los cubos
m.whoosh(Mi + 0.05, 0.6, 0.08); m.golpe(Mi + 0.3, 0.2, 200); m.golpe(Mi + 0.9, 0.2, 170); m.golpe(Mi + 1.5, 0.2, 150); m.tic(Mi + 2.3, 0.06, 1200);
m.sube(Mn + 0.4, 0.6, 50, 52, 0.04); m.sube(Mn + 1.8, 1.8, 50, 74, 0.06); m.golpe(Mn + 3.4, 0.35, 70);  // barra corta y barra que se dispara
m.sube(Te + 0.4, 3.4, 52, 64, 0.05); for (let i = 0; i < 5; i++) m.gota(Te + 0.6 + i * 0.6, 0.06, 600);
m.golpe(A + 0.4, 0.25, 90); m.nota(A + 0.9, 60, 0.05, 0.7);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.golpe(Co + 0.5, 0.25, 110); for (let i = 0; i < 12; i++) m.tic(Co + 1.4 + i * 0.18, 0.04, 1500 + i * 60); m.nota(Co + 3.6, 69, 0.06, 0.9);
for (let i = 0; i < 13; i++) m.tic(H + 0.2 + i * 0.08, 0.03, 1800); m.metal(H + 1.8, 0.05); m.whoosh(H + 2.0, 1.6, 0.06);   // el colador
m.sube(Sd + 0.4, 1.0, 57, 62, 0.04); m.nota(Sd + 1.0, 62, 0.04, 1.2);
sacudida(C - 0.3); m.sube(C + 1.4, 0.6, 57, 69, 0.05); for (let i = 0; i < 4; i++) m.burbuja(C + 2.0 + i * 0.4, 0.04, 380);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
