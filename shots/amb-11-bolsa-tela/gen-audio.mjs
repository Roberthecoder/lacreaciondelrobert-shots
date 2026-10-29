// gen-audio.mjs — cama grave + efectos del Shot Ambiental #11 (la bolsa de tela). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bolsa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 111);
const K = m.K;
const G = K.Gancho, E = K.Estudio, F = K.Fabrica, P = K.Pregunta, Cl = K.Clima, O = K.Ozono, R = K.ReinoUnido, M = K.Mar, Co = K.Consejo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 24; i++) m.tic(G + 0.1 + 2.6 * Math.pow(i / 24, 1.6), 0.05, 1500 + i * 30);  // el contador sube a 7,100
m.golpe(G + 2.7, 0.3, 70); m.nota(G + 2.7, 62, 0.06, 0.9);
m.whoosh(E + 0.2, 0.7, 0.1); for (let i = 0; i < 4; i++) m.tic(E + 0.6 + i * ((F - E - 1.2) / 3), 0.08, 1100);   // fábrica, súper, casa, basura
for (let i = 0; i < 8; i++) m.gota(F + 0.4 + i * 0.5, 0.08, 850 + (i % 3) * 120);                       // agua del algodón
m.sube(F + 0.5, 1.1, 55, 67, 0.05);
m.sube(P + 0.05, 1.3, 50, 62, 0.05);
m.nota(Cl + 1.6, 69, 0.06, 0.5); m.sube(Cl + 1.4, 1.4, 67, 50, 0.05);                                   // solo clima: baja a 52
m.sube(O + 0.6, 1.6, 50, 74, 0.06); m.golpe(O + 2.2, 0.4, 55);                                          // el ozono se dispara
for (let i = 0; i < 14; i++) m.tic(R + 1.2 + i * 0.24, 0.05, 1300 + i * 25);                            // 131 casillas
m.nota(R + 4.6, 64, 0.05, 0.7);
m.cruje(M + 0.4, 0.2); m.whoosh(M + 2.8, 1.2, 0.12);
for (let i = 0; i < 10; i++) m.burbuja(M + 3.2 + i * 0.45, 0.06, 420 - i * 15);                          // bajada al fondo
m.sube(M + 3.2, 4.4, 52, 38, 0.05); m.golpe(M + 7.6, 0.3, 50);
for (let i = 0; i < 12; i++) m.nota(Co + 0.6 + i * 0.35, 72 + (i % 3) * 2, 0.03, 0.25);                 // palomitas de reúso
m.metal(Co + 3.0, 0.12, 700); m.golpe(Co + 4.6, 0.25, 90); m.metal(Co + 4.8, 0.1, 650);                 // tapa del bote
for (let i = 0; i < 16; i++) m.tic(C + 0.3 + 1.6 * Math.pow(i / 16, 1.6), 0.04, 1500 + i * 30);          // 7,100 otra vez
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
