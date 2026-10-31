// gen-audio.mjs — cama grave + efectos del Shot IA #03 (un chatbot por dentro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Cada token que aparece suena con una nota; la barra elegida ("azul") suena más fuerte.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Siguiente Palabra base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K, E = m.ESC;
const G = K.Gancho, Co = K.Corta, N = K.Numeros, Pe = K.Perillas, P = K.Pregunta, L = K.Lista, Ci = K.Cielo, R = K.Repite, Es = K.Estudio, O = K.Ojo, A = K.Azar, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 5; i++) m.nota(G + 0.3 + i * 0.55, E[3 + i], 0.07, 0.4);                  // la respuesta, pedacito por pedacito
m.whoosh(Co - 0.9, 1.0, 0.18);                                                              // entramos al celular
for (let i = 0; i < 7; i++) { m.tic(Co + 0.6 + i * 0.15, 0.1, 2800); }                       // tijeretazos: tokens
for (let k = 0; k < 3; k++) m.sube(N + 1.0 + k * 1.6, 1.3, 57, 74, 0.03);                     // la onda por las capas
for (let i = 0; i < 96; i += 3) m.tic(Pe - 0.3 + i * 0.012, 0.03, 1200 + (i % 12) * 90);      // perillas
m.sube(Pe + 0.2, 2.0, 45, 69, 0.05); m.golpe(Pe + 2.2, 0.3, 70);
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
for (let i = 0; i < 16; i++) m.tic(L + 0.3 + i * 0.22, 0.03, 2200);                           // la lista que corre
m.golpe(L + 4.2, 0.25, 90);
for (let i = 0; i < 5; i++) m.nota(L + 4.3 + i * 0.12, 69 - i * 3, 0.05 * (1 - i * 0.18), 0.5);
m.nota(Ci + 2.2, 76, 0.09, 1.0); m.metal(Ci + 2.2, 0.08, 1500);                               // eligió "azul"
m.nota(R + 0.4, 72, 0.08, 0.5); m.nota(R + 1.8, 74, 0.08, 0.5);                                // pega y repite
for (let k = 0; k < 3; k++) m.whoosh(R + 0.5 + k * 1.2, 0.5, 0.06);
m.golpe(Es + 0.2, 0.35, 80);
m.cruje(O + 1.6, 0.4); m.golpe(O + 1.6, 0.3, 60);                                             // probable ≠ verdadero
for (let i = 0; i < 8; i++) m.tic(A + 0.2 + i * 0.1, 0.12, 700 + (i % 3) * 200);               // el dado rueda
m.golpe(A + 1.0, 0.3, 120); m.nota(A + 1.6, 69, 0.06, 0.5); m.nota(A + 2.3, 71, 0.06, 0.5);
m.whoosh(C - 0.4, 0.8, 0.12);
for (let i = 0; i < 5; i++) { m.nota(C + 0.8 + i * 0.6, E[3 + i], 0.07, 0.4); m.tic(C + 0.8 + i * 0.6, 0.06, 900); }
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
