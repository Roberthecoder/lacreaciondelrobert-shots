// gen-audio.mjs — cama grave + efectos del Shot Ambiental #49 (abeja melipona). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Meliponas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 49);
const K = m.K;
const G = K.Gancho, X = K.Xunan, J = K.Jobon, O = K.Ollitas, P = K.Pregunta, Ki = K.Kilo, A = K.Abuelos, E = K.Estudio, L = K.Landa, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G, 0.85, 0.07, 210);                                                       // la abeja aterriza en el dedo
m.golpe(G + 1.9, 0.25, 160); m.tic(G + 2.0, 0.12, 900);                              // aguijón tachado
for (let i = 0; i < 4; i++) m.tic(G + 3.05 + i * 0.35, 0.1, 2600);                   // mordisquitos
m.whoosh(X + 0.1, 0.7, 0.1); m.nota(X + 0.5, 64, 0.06, 0.9); m.nota(X + 0.9, 69, 0.05, 0.8);
m.whoosh(J, 0.9, 0.12); m.golpe(J + 1.45, 0.3, 110); m.golpe(J + 1.6, 0.3, 100);     // el tronco rueda; discos de madera
m.zumbido(J + 2.4, 1.2, 0.05, 230);                                                  // la abeja entra
m.whoosh(O + 0.2, 0.7, 0.1); m.cruje(O + 1.0, 0.25);                                 // corte y panal tachado
for (let i = 0; i < 18; i++) m.burbuja(O + 1.4 + i * 0.11, 0.05, 420 + (i % 5) * 60);  // ollitas que aparecen
for (let i = 0; i < 5; i++) m.tic(O + 3.4 + i * 0.24, 0.06, 1200);                   // discos de cría
m.sube(P + 0.05, 1.3, 57, 52, 0.05);
for (let i = 0; i < 6; i++) m.nota(P + 0.4 + i * 0.33, 69 - i * 2, 0.05, 0.4);       // jobones que se apagan
for (let i = 0; i < 10; i++) m.gota(Ki + 1.4 + i * 0.2, 0.08, 600 + i * 30);         // el frasco se llena
m.nota(Ki + 3.4, 64, 0.06, 0.9);
m.whoosh(Ki + 5.0, 0.9, 0.12); m.zumbido(Ki + 5.2, 2.0, 0.04, 250); m.golpe(Ki + 6.2, 0.25, 90);  // llega la caja europea
for (let i = 0; i < 6; i++) m.tic(A + 2.6 + i * 0.45, 0.05, 900);                     // pasos hacia la ciudad
m.golpe(E + 0.1, 0.3, 120); m.nota(E + 0.3, 69, 0.05, 0.8);
for (let i = 0; i < 7; i++) m.nota(E + 4.4 + i * 0.31, 64 - i, 0.05, 0.35);           // 7 colonias que se apagan
m.whoosh(L + 0.2, 0.8, 0.1); for (let i = 0; i < 5; i++) m.burbuja(L + 1.2 + i * 0.15, 0.04, 480);
m.zumbido(C + 0.8, 2.4, 0.05, 210);                                                  // la abeja vuelve a su jobón
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
