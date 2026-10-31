// gen-audio.mjs — cama grave + efectos del Shot IA #58 (el cómputo de la IA crece ×5 al año). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Computo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 58);
const K = m.K;
const G = K.Gancho, Mo = K.Moore, Du = K.Duplica, E = K.Estudio, D = K.DiezMil, P = K.Pregunta, F = K.Fuentes, C = K.Costo, En = K.Energia, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, D, 0.05, [43, 50, 55]);
m.pad(D, Ou + 3.5, 0.05, [45, 52, 57]);                                          // la cama sube un tono cuando se dispara
m.gota(G + 0.1, 0.25, 900); m.burbuja(G + 0.3, 0.12, 400);                       // el agua
for (let i = 0; i < 8; i++) m.tic(G + 0.3 + i * 0.13, 0.06, 1800 + i * 120);     // el agua se vuelve cuadritos
m.sube(G + 3.6, 1.0, 50, 62, 0.04); m.cruje(G + 4.4, 0.25);                      // se llena y se desborda
m.golpe(G + 4.8, 0.35, 70); m.sube(G + 5.3, 1.5, 48, 67, 0.05); m.nota(G + 5.3, 72, 0.05, 0.6); // vaso ×5
for (let k = 0; k < 6; k++) m.tic(Mo + 0.8 + k * 0.8, 0.12, 900 + k * 150);      // Moore: un tic lento por duplicación
m.whoosh(Du, 0.5, 0.12);
m.tic(Du + 0.4 + 3.0, 0.14, 900);                                                // Moore ×2 a los 24 meses
for (let k = 1; k <= 4; k++) m.tic(Du + 0.8 + k * 5.2 / 24 * 3.0, 0.14, 1600 + k * 200); // IA ×2 cada ~5 meses
m.golpe(E + 0.2, 0.35, 80);
m.sube(E + 3.7, 1.6, 48, 52, 0.04); m.sube(E + 5.3, 1.2, 52, 76, 0.05);          // la curva: suave y luego empinada
m.zumbido(D, 5.0, 0.02, 160);
for (let i = 0; i < 40; i++) m.tic(D + 1.0 + i * 0.07, 0.04, 2000 + (i % 6) * 140); // se llenan los 10 000
m.golpe(D + 3.0, 0.4, 60);
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.gota(F + 1.0, 0.2, 700); m.gota(F + 2.6, 0.2, 800); m.gota(F + 4.2, 0.2, 900);  // las tres llaves
m.motor(F + 1.2, 4.6, 0.04);
for (let k = 0; k < 14; k++) m.metal(C + 0.3 + k * 0.22 + 0.6, 0.08, 1500 + (k % 4) * 120); // monedas
m.zumbido(En + 0.8, 6.0, 0.03, 120);                                             // corriente
for (let k = 0; k < 16; k++) m.tic(En + 1.4 + k * 0.24, 0.07, 2600);             // se prenden las casas
m.whoosh(Ci, 0.5, 0.12); m.metal(Ci + 1.6, 0.12, 700); m.metal(Ci + 2.4, 0.12, 1400);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
