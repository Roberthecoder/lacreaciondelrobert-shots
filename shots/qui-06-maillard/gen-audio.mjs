// gen-audio.mjs — cama grave + efectos del Shot Químico #06 (reacción de Maillard). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Maillard base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 66);
const K = m.K;
const G = K.Gancho, U = K.Union, Ca = K.Cadena, Ar = K.Aroma, Co = K.Color, Ag = K.Agua, Pr = K.Pregunta, Ma = K.Maillard, Ac = K.Acrilamida, Ri = K.Riesgo, Cg = K.Congelador, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.golpe(G + 0.45, 0.45, 75); m.zumbido(G + 0.45, 4.5, 0.03, 900);                  // cae y chisporrotea
for (let i = 0; i < 30; i++) m.tic(G + 0.5 + i * 0.15 + m.rnd() * 0.1, 0.05, 3000 + m.rnd() * 2000);
m.golpe(U + 0.3, 0.3, 110); m.sube(U + 0.5, 2.1, 57, 69, 0.04); m.metal(U + 2.6, 0.15, 1300); // se unen
m.cruje(Ca + 0.4, 0.5);                                                            // se rompe en pedazos
for (let i = 0; i < 6; i++) m.nota(Ar + 0.3 + i * 0.35, 72 + (i % 3) * 3, 0.04, 0.5); // olor que sube
for (let i = 0; i < 12; i++) m.tic(Co + 0.6 + i * 0.22, 0.05, 1200);              // la red se arma
m.sube(Ag + 0.2, 1.4, 57, 72, 0.04); for (let i = 0; i < 8; i++) m.gota(Ag + 1.8 + i * 0.15, 0.15, 900); m.sube(Ag + 2.0, 1.2, 72, 57, 0.04);
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
m.golpe(Ma + 0.2, 0.35, 80); m.zumbido(Ma + 1.2, 4.5, 0.025, 150);               // tarjeta y mechero
m.golpe(Ac + 0.2, 0.35, 80); m.nota(Ac + 3.6, 64, 0.06, 0.8);
m.golpe(Ri + 0.1, 0.45, 60); m.pad(Ri, Cg, 0.03, [40, 46], 0.5);
m.whoosh(Cg + 0.1, 1.0, 0.08); for (let i = 0; i < 4; i++) m.metal(Cg + 0.6 + i * 0.9, 0.05, 2400);
m.whoosh(Ci + 0.2, 1.5, 0.06); m.zumbido(Ci + 0.2, 4.5, 0.02, 900); m.nota(Ci + 1.0, 72, 0.06, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
