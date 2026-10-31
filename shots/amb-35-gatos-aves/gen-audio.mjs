// gen-audio.mjs — cama grave + efectos del Shot Ambiental #35 (gatos que salen y la fauna que cazan). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gatos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 35);
const K = m.K;
const G = K.Gancho, N = K.Numero, M = K.Mamiferos, S = K.SinDueno, P = K.Pregunta, Ca = K.Camaras, R = K.Regalos, L = K.Lagartijas, I = K.Invasor, Co = K.Collar, C = K.Cierre, Ou = K.Outro;

m.pad(0, Co + 2.5, 0.05, [45, 52, 56], 0.35);                 // tensa mientras dura el problema
m.pad(Co + 2.5, Ou + 3.5, 0.05, [45, 52, 57]);                 // libre cuando llega "qué sí sirve"
m.golpe(G + 0.45, 0.3, 140); m.gota(G + 0.5, 0.12, 600);       // el regalito cae en el tapete
m.whoosh(G + 1.1, 1.2, 0.12);                                  // la cámara se aleja
for (let i = 0; i < 14; i++) m.tic(G + 1.9 + i * 0.17, 0.05, 1500 + (i % 4) * 200);   // una silueta por presa
m.sube(N + 0.3, 2.0, 45, 64, 0.06); m.golpe(N + 1.3, 0.25, 90); // el número sube
for (let i = 0; i < 6; i++) m.nota(N + 2.6 + i * 0.6, [76, 79, 81, 79, 76, 74][i], 0.03, 0.25);   // aves volando
m.nota(N + 3.4, 64, 0.05, 0.8);                                 // tarjeta del estudio
m.sube(M + 0.1, 2.0, 50, 66, 0.05); for (let i = 0; i < 8; i++) m.tic(M + 0.3 + i * 0.25, 0.04, 2600);   // ratoncitos corriendo
for (let i = 0; i < 7; i++) m.tic(S + 0.6 + i * 0.12, 0.06, 900);   // 7 aves se oscurecen
m.nota(S + 1.9, 57, 0.06, 0.7); m.nota(S + 2.3, 64, 0.05, 0.7);
m.golpe(P + 0.1, 0.25, 110); m.sube(P + 0.05, 1.3, 52, 64, 0.05);   // la gatera
m.metal(Ca + 1.0, 0.12, 1400); for (let i = 0; i < 6; i++) m.tic(Ca + 2.4 + i * 0.5, 0.05, 3200);   // la cámara y el REC
for (let i = 0; i < 23; i++) m.tic(R + 0.3 + i * 0.055, 0.035, 2000);
m.nota(R + 1.7, 69, 0.05, 0.7);
for (let i = 0; i < 12; i++) m.tic(R + 2.9 + i * 0.11, 0.03, 1300);
m.nota(R + 4.3, 62, 0.05, 0.7);
for (let i = 0; i < 8; i++) m.tic(R + 4.6 + i * 0.12, 0.03, 900);
m.nota(R + 5.7, 57, 0.05, 0.7);
m.golpe(L + 1.1, 0.3, 70); m.burbuja(L + 1.5, 0.08, 420); m.burbuja(L + 1.9, 0.08, 460);   // tacha el ave; papada del anolis
for (let i = 0; i < 6; i++) m.gota(I + 0.3 + i * 0.22, 0.08, 500 + i * 60);   // las islas en el globo
m.golpe(I + 1.6, 0.3, 60);
m.nota(Co + 1.1, 76, 0.06, 1.0);   // palomita
m.whoosh(Co + 2.5, 0.6, 0.12); m.nota(Co + 3.0, 72, 0.05, 0.9);   // collar de colores
m.sube(Co + 3.4, 0.8, 55, 67, 0.05); m.sube(Co + 3.7, 0.8, 55, 60, 0.04);
for (let i = 0; i < 5; i++) m.nota(C + 1.6 + i * 0.2, [79, 83, 86, 83, 88][i], 0.035, 0.25);   // pajaritos que llegan
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
