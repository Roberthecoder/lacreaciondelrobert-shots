// gen-audio.mjs — cama grave + efectos del Shot IA #36 (autos sin conductor contra conductores humanos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Waymo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 36);
const K = m.K;
const G = K.Gancho, Mi = K.Millas, Ci = K.Ciudades, P = K.Pregunta, E = K.Estudio, Es = K.Esperados, O = K.Ojo, R = K.Recall, Mu = K.Mundo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.motor(G, 1.6, 0.09); m.motor(G + 0.15, 1.6, 0.07);                              // arrancan los dos autos
m.zumbido(G + 1.2, 2.5, 0.025, 260);                                              // el sensor del techo
m.sube(G + 4.7, 0.9, 52, 72, 0.04); m.golpe(G + 5.3, 0.25, 90);                   // −82 %
m.whoosh(Mi, 0.5, 0.12); m.sube(Mi + 0.2, 2.0, 45, 69, 0.04);                     // la aguja sube
for (let i = 0; i < 14; i++) m.tic(Mi + 0.3 + i * 0.14, 0.06, 1800 + i * 40);     // odómetro
m.whoosh(Ci, 0.5, 0.12);
[1.0, 1.6, 2.3, 3.0, 3.3].forEach((d, i) => m.gota(Ci + d, 0.18, 700 + i * 120));  // pines en el mapa
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(E + 0.2, 0.35, 80);
m.burbuja(E + 3.2, 0.15, 420); m.tic(E + 3.7, 0.15, 900); m.burbuja(E + 3.8, 0.15, 420); m.tic(E + 4.3, 0.15, 900);  // caen 2 reclamos
for (let i = 0; i < 26; i++) m.tic(Es + 0.3 + i * 1.6 / 26, 0.05, 1600 + (i % 4) * 150); // 26 esperados
m.nota(Es + 2.0, 72, 0.06, 0.5); m.nota(Es + 2.15, 76, 0.05, 0.5);                // Waymo: 2
for (let i = 0; i < 30; i++) m.tic(Es + 3.5 + i * 1.2 / 30, 0.04, 1900 + (i % 5) * 110); // 78 esperados
m.nota(Es + 4.6, 69, 0.05, 0.5);
m.whoosh(O, 0.5, 0.12); for (let i = 0; i < 6; i++) m.tic(O + 0.5 + i * 0.15, 0.1, 1200 + i * 100);  // autores
m.golpe(O + 2.9, 0.25, 70); m.golpe(O + 3.5, 0.25, 70);                           // tachados
m.whoosh(R, 0.5, 0.12);
for (let i = 0; i < 10; i++) m.nota(R + 0.3 + i * 0.32, i % 2 ? 76 : 79, 0.03, 0.18); // luces del autobús
m.motor(R + 0.3, 2.3, 0.07);
m.golpe(R + 2.9, 0.6, 55);                                                        // sello RECALL
m.sube(R + 5.2, 1.4, 52, 76, 0.04); m.nota(R + 6.7, 72, 0.06, 0.6); m.nota(R + 6.75, 76, 0.05, 0.6);  // software corregido
m.latido(Mu + 0.5, 0.22); m.latido(Mu + 1.3, 0.18); m.latido(Mu + 2.1, 0.14);
m.motor(C, 1.8, 0.08); m.whoosh(C + 3.3, 0.6, 0.12); m.nota(C + 3.7, 72, 0.06, 0.8); m.nota(C + 3.75, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
