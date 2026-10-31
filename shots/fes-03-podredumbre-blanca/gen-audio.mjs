// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #01 · Especial Día de Muertos (podredumbre blanca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot PodredumbreBlanca base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K, E = m.ESC;
const G = K.Gancho, L = K.Lignina, H = K.Hifas, En = K.Enzimas, B = K.Blanca, S = K.Suelo, P = K.Pregunta, Es = K.Estudio, R = K.Reloj, C = K.Carbon, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.7, 0.18);                                                       // el tronco entra
for (let i = 0; i < 6; i++) m.burbuja(G + 0.3 + i * 0.35, 0.08, 380 + i * 40); // las manchas del hongo brotan
m.whoosh(L - 1.1, 1.4, 0.2); m.sube(L - 1.0, 1.3, 52, 76, 0.05);              // la cámara entra a la madera
m.pad(L, B, 0.025, [40, 47], 0.4);                                            // por dentro: oscuro y tapado
m.nota(L + 0.6, 57, 0.06, 0.8);                                               // "lignina = pegamento"
for (let i = 0; i < 6; i++) m.sube(H + 0.1 + i * 0.25, 0.6, 60 + i * 2, 67 + i * 2, 0.025); // las hifas crecen
for (let i = 0; i < 8; i++) m.tic(H + 0.6 + i * 0.3, 0.06, 1500);            // perforan los poros
for (let k = 0; k < 4; k++) for (let i = 0; i < 4; i++) m.metal(En + 0.1 + k * 0.4 + i * 0.09, 0.05, 2600); // tijeritas
m.whoosh(B - 0.5, 1.0, 0.15); m.sube(B, 1.5, 57, 69, 0.04);                  // de vuelta afuera, se blanquea
m.golpe(B + 2.1, 0.25, 70);                                                   // el dedo hunde la madera blanda
m.cruje(S + 0.3, 0.5);                                                        // el tronco se deshace
for (let i = 0; i < 6; i++) m.burbuja(S + 2.0 + i * 0.25, 0.1, 500 + i * 60); // CO₂
m.gota(S + 2.5, 0.25, 1100);                                                  // agua
m.sube(P + 0.1, 1.6, 52, 64, 0.05); m.metal(P + 1.0, 0.1, 700);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 31; i++) m.tic(Es + 1.2 + i * 0.08, 0.05, 1800 + (i % 8) * 120); // los 31 genomas
for (let i = 0; i < 16; i++) m.tic(R + 0.6 + i * 0.17, 0.05, 2400 - i * 60);  // el reloj corre hacia atrás
m.sube(R + 0.6, 2.8, 69, 52, 0.04); m.nota(R + 3.4, 57, 0.08, 1.0);
m.cruje(C + 0.6, 0.4); m.golpe(C + 1.2, 0.4, 60); m.golpe(C + 1.7, 0.35, 55);  // las licopsidas caen
for (let i = 0; i < 4; i++) m.golpe(C + 1.7 + i * 0.65, 0.12, 110);           // capas de tierra
m.pad(C + 3.6, D, 0.03, [38, 45]); m.metal(C + 4.6, 0.12, 500);              // carbón · "en duda"
m.golpe(D, 0.3, 70); m.nota(D + 0.6, 64, 0.06, 0.8); m.nota(D + 1.0, 62, 0.05, 0.8);
m.whoosh(Ci + 0.2, 0.6, 0.12); m.cruje(Ci + 0.4, 0.3);
m.sube(Ci + 1.8, 1.4, 57, 76, 0.05); m.nota(Ci + 3.0, 69, 0.07, 1.0);         // brota la planta
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
