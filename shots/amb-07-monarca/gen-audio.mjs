// gen-audio.mjs — cama grave + efectos del Shot Ambiental #07 (monarca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Monarca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 77);
const K = m.K;
const G = K.Gancho, V = K.Viaje, R = K.Racimos, Ci = K.Cifra, A = K.Antes, P = K.Pregunta, Al = K.Algodoncillo, Cl = K.Clima, E = K.Estudio, M = K.Meta, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 4; i++) m.nota(G + 0.1 + i * 0.5, [69, 72, 74, 76][i], 0.07, 0.6);     // se llena cada cancha (4)
for (let i = 0; i < 16; i++) m.tic(G + 0.1 + i * 0.13, 0.06, 3000 + (i % 4) * 300);        // aleteos
m.whoosh(V + 0.3, 1.2, 0.1); m.sube(V + 0.3, 4.5, 72, 60, 0.04); m.golpe(V + 4.2, 0.3, 90);   // el viaje y la llegada
for (let i = 0; i < 12; i++) m.tic(R + 0.2 + i * 0.2, 0.05, 2600);                           // se llenan los racimos
m.nota(R + 1.2, 64, 0.07, 0.9);
m.sube(Ci + 0.2, 1.0, 57, 69, 0.05); m.golpe(Ci + 2.2, 0.3, 90);
m.sube(A + 0.2, 1.0, 69, 52, 0.06); m.golpe(A + 1.2, 0.35, 60);                              // la barra de 1996 contra la de hoy
m.sube(P + 0.05, 1.2, 52, 64, 0.05);
for (let i = 0; i < 8; i++) m.burbuja(Al + 2.2 + i * 0.25, 0.06, 900);                       // el herbicida
m.sube(Al + 2.4, 2.4, 64, 52, 0.04);
m.cruje(Cl + 0.4, 0.4); m.zumbido(Cl + 0.2, 1.5, 0.04, 140); m.golpe(Cl + 2.2, 0.35, 60);
m.golpe(E + 0.2, 0.35, 80);
m.sube(M + 0.4, 1.2, 57, 64, 0.05); m.nota(M + 2.0, 69, 0.06, 0.8);
for (let i = 0; i < 4; i++) m.nota(C + 0.3 + i * 0.25, [69, 72, 74, 76][i], 0.05, 0.6);
for (let i = 0; i < 21; i++) m.tic(C + 0.8 + i * 0.06, 0.04, 1500);                          // aparecen las 21 canchas vacías
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
