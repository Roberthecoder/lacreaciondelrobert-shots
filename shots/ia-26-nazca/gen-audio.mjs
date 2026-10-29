// gen-audio.mjs — cama grave + efectos del Shot IA #26 (Nazca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nazca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, O = K.Ocultas, E = K.Escaner, F = K.Filtro, P = K.Pregunta, C = K.Campo, Es = K.Estudio, M = K.Matiz, Mo = K.Motivos, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);                                            // cama grave de desierto
m.whoosh(0, 1.2, 0.05);
for (let i = 0; i < 24; i++) m.tic(G + 0.15 + 3.45 * cruce(i / 24), 0.06, 1500 + (i % 4) * 90);   // puntos negros (430)
for (let i = 0; i < 18; i++) m.nota(G + 4.6 + 2.8 * cruce(i / 18), m.ESC[4 + (i % 8)], 0.04, 0.25); // lluvia de 303
m.whoosh(O - 0.2, 0.6, 0.12); m.sube(O + 1.6, 0.8, 52, 64, 0.04);                  // aparece el contorno
m.golpe(O + 2.5, 0.25, 90); m.whoosh(O + 4.5, 0.4, 0.1);
m.zumbido(E + 0.3, 4.3, 0.03, 200);                                                // escáner
[0.95, 0.7, 0.55, 0.6, 0.4].forEach((_, k) => m.nota(E + 1.2 + k * 0.7, 76, 0.04, 0.3));
for (let i = 0; i < 35; i++) m.tic(F + 0.6 + 2.6 * cruce(i / 35), 0.08, 900);       // tachones
m.nota(F + 3.3, 72, 0.07, 0.8); m.nota(F + 3.35, 79, 0.05, 0.8);                    // la que prometía
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 22; i++) m.tic(C + 0.2 + i * 0.2, 0.12, 400 + (i % 2) * 80);   // pasos en grava
m.motor(C + 0.3, 4.2, 0.03);                                                       // dron
m.sube(Es + 0.2, 1.0, 50, 62, 0.04); m.sube(Es + 0.9, 1.0, 52, 69, 0.04); m.golpe(Es + 3.0, 0.3, 80);
m.sube(Es + 7.4, 1.0, 55, 74, 0.04);
m.whoosh(M, 0.5, 0.1); m.sube(M + 0.3, 1.6, 52, 64, 0.03); m.tic(M + 2.6, 0.2, 1200); m.tic(M + 3.8, 0.2, 1200);
m.burbuja(Mo + 0.4, 0.15, 500); m.cruje(Mo + 1.6, 0.3);                            // animal salvaje tachado
[2.4, 2.9, 3.5].forEach((d) => m.burbuja(Mo + d, 0.15, 600));
m.nota(Ci + 0.3, 69, 0.05, 0.6);                                                   // la lupa de la IA
for (let i = 0; i < 8; i++) m.tic(Ci + 0.8 + i * 0.2, 0.1, 420);
m.nota(Ci + 2.5, 72, 0.06, 0.8); m.nota(Ci + 2.55, 76, 0.05, 0.8);                  // confirmada ✔
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
