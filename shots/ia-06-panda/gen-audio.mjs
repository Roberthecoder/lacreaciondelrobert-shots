// gen-audio.mjs — cama grave + efectos del Shot IA #06 (panda → gibón, ejemplos adversarios). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Panda base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 61);
const K = m.K;
const G = K.Gancho, A = K.Antes, Ru = K.Ruido, P = K.Pregunta, S = K.Suma, E = K.Estudio, Al = K.Alto, Au = K.Auto, D = K.Defensa, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.golpe(G + 0.05, 0.4, 70); m.nota(G + 0.1, 76, 0.06, 0.6);                // salta la etiqueta "gibón 99.3 %"
m.burbuja(G + 1.2, 0.15, 500); m.burbuja(G + 1.35, 0.15, 650);               // globito del gibón
m.whoosh(A, 0.5, 0.12); m.nota(A + 0.3, 69, 0.06, 0.6);                      // "panda 57.7 %"
m.golpe(Ru + 0.3, 0.25, 90); m.zumbido(Ru + 0.4, 3.4, 0.03, 420);            // estática suave del ruido
m.nota(Ru + 1.7, 72, 0.05, 0.7); m.nota(Ru + 1.75, 79, 0.04, 0.7);           // "se ve igual"
m.sube(P + 0.1, 1.4, 50, 62, 0.05);
for (let i = 0; i < 14; i++) m.tic(S + 1.4 + i * 0.25, 0.1, 900 + i * 110);  // empujoncitos
m.golpe(S + 4.9, 0.45, 60);                                                   // la aguja llega a "gibón"
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) m.tic(Al + 1.6 + i * 0.45, 0.25, 600);            // clac: se pegan las estampas
m.motor(Au, 9.5, 0.05);
m.metal(Au + 1.0, 0.08, 1800); m.metal(Au + 1.4, 0.08, 1800);                // bip de la cámara
m.sube(Au + 3.5, 1.1, 52, 76, 0.04); m.sube(Au + 5.1, 1.1, 52, 73, 0.04);     // barras 100 % y 84.8 %
m.whoosh(D, 0.5, 0.12);
m.sube(D + 1.7, 1.1, 52, 74, 0.04); m.sube(D + 3.3, 1.1, 52, 60, 0.04);       // 89.4 % y 17.9 %
m.cruje(C + 2.2, 0.35);                                                       // se tacha "gibón"
m.nota(C + 2.6, 72, 0.06, 0.8); m.nota(C + 2.65, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
