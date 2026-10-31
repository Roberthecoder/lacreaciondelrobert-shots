// gen-audio.mjs — cama grave + efectos del Shot Ambiental #05 (ozono). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ozono base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 55);
const K = m.K;
const G = K.Gancho, Ca = K.Capa, Cf = K.CFC, M = K.Molina, S = K.Suben, P = K.Pregunta, Cl = K.Cloro, E = K.Estudio, Mo = K.Montreal, N = K.Noventa, F = K.Fechas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.sube(G + 0.05, 1.6, 64, 57, 0.05); m.whoosh(G + 0.1, 1.2, 0.14);                     // el agujero se encoge
for (let k = 0; k < 4; k++) m.zumbido(Ca + 0.4 + k * 0.4, 0.9, 0.04, 380 + k * 40);   // rayos UV que la capa frena
for (let k = 0; k < 4; k++) m.gota(Ca + 1.4 + k * 0.4, 0.12, 1200);
for (let k = 0; k < 7; k++) m.whoosh(Cf + 0.3 + k * 0.55, 0.5, 0.06);                // nubecitas de CFC
m.nota(Cf + 1.6, 57, 0.06, 0.8);
for (let k = 0; k < 3; k++) { m.golpe(M + 0.5 + k * 0.35, 0.2, 120 + k * 30); }         // aparecen los matraces
for (let k = 0; k < 10; k++) m.burbuja(M + 1.2 + k * 0.3, 0.07, 400 + (k % 4) * 80);
m.sube(S + 0.1, 1.3, 50, 62, 0.05); m.metal(S + 1.4, 0.18, 900);                        // sube y el sol lo rompe
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let k = 0; k < 16; k++) m.tic(Cl + 0.4 + k * 0.22, 0.12, 1500 + (k % 5) * 200);   // cada ozono que se rompe
m.golpe(Cl + 0.8, 0.3, 70);
m.golpe(E + 0.2, 0.35, 80); m.metal(E + 3.0, 0.2, 1300);                                // tarjeta y medalla
m.whoosh(Mo + 0.1, 0.6, 0.12); m.golpe(Mo + 1.6, 0.45, 60);                             // sello
for (let i = 0; i < 10; i++) m.cruje(N + 1.2 + i * 0.25, 0.12);                          // CFC tachados
m.sube(N + 0.3, 1.6, 52, 69, 0.05);
m.sube(F + 0.6, 6.5, 57, 69, 0.04); m.nota(F + 2.2, 64, 0.07, 1.0); m.nota(F + 4.6, 69, 0.07, 1.0);   // se cierra el agujero
m.nota(C + 0.3, 69, 0.06, 1.2); m.nota(C + 0.3, 76, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
