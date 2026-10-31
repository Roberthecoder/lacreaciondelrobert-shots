// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #05 (Armillaria). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Armillaria base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 5);
const K = m.K, E = m.ESC;
const G = K.Gancho, F = K.Fruto, Co = K.Cordones, R = K.Raiz, P = K.Pregunta, Es = K.Estudio, Ca = K.Cajas, Fu = K.Fusion, N = K.Numero, Ed = K.Edad, O = K.Ojo, B = K.Brillo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 7; i++) m.burbuja(G + i * 0.12, 0.12, 380 + i * 40);     // brotan las setas
for (let i = 0; i < 4; i++) m.burbuja(G + 0.5 + i * 0.12, 0.1, 520);
m.zumbido(G + 2.2, 0.8, 0.04, 140);                                          // rayos X del suelo
m.sube(G + 2.4, 2.6, 45, 64, 0.05);                                          // crece la red
m.nota(G + 3.4, 69, 0.07, 1.0);
m.nota(F + 0.3, 64, 0.05, 0.6); m.nota(F + 1.4, 67, 0.05, 0.6);
m.motor(Co + 0.3, 2.9, 0.05);                                                // avanza el cordón
m.cruje(R + 0.2, 0.5); m.golpe(R + 1.6, 0.3, 70);                            // la raíz se pudre, el árbol cae
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 3; i++) m.tic(Es + 1.4 + i * 0.3, 0.2, 1500);            // árboles muestreados
m.metal(Ca + 0.3, 0.12, 1100); m.metal(Ca + 0.5, 0.12, 1250);                // cajas de cultivo
m.sube(Ca + 0.6, 3.5, 50, 57, 0.03);
m.nota(Fu + 0.6, 72, 0.08, 0.9); m.nota(Fu + 0.6, 76, 0.06, 0.9);             // se fusionan ✓
m.golpe(Fu + 1.4, 0.3, 60);                                                  // hueco ✗
m.sube(N + 0.3, 1.2, 50, 74, 0.05);
for (let i = 0; i < 30; i++) m.tic(N + 1.4 + i * 0.105, 0.04, 1800 + (i % 6) * 120); // se llenan las canchas
for (let i = 0; i < 6; i++) m.bajo(Ed + 0.3 + i * 0.7, 40, 0.07, 0.6);       // el frente avanza lento
m.nota(Ed + 2.2, 64, 0.06, 0.8); m.nota(Ed + 2.6, 69, 0.06, 1.0);
m.pad(O, B, 0.02, [41, 48], 0.6);
for (let i = 0; i < 3; i++) m.tic(O + 0.6 + i * 0.12, 0.12, 900);
for (let i = 0; i < 10; i++) m.nota(B + 0.3 + i * 0.25, E[10 - (i % 5)], 0.03, 0.9); // brillo
m.whoosh(C + 1.2, 1.4, 0.1); m.sube(C + 1.2, 3.0, 45, 69, 0.04);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
