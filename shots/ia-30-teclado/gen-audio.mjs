// gen-audio.mjs — cama grave + efectos del Shot IA #30 (teclado y aprendizaje federado). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Teclado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 30);
const K = m.K;
const G = K.Gancho, Pd = K.Prediccion, Es = K.Estudia, Pq = K.Paquete, Pm = K.Promedio, P = K.Pregunta, E = K.Estudio, R = K.Resultado, A = K.Apple, M = K.Matiz, C = K.Cierre, Ou = K.Outro;
const teclea = (t0, n, cps) => { for (let i = 0; i < n; i++) m.tic(t0 + (i + 1) / cps, 0.09, 2600 + (i % 3) * 200); };

m.pad(0, M, 0.05, [45, 52, 57]);
m.pad(M, C, 0.05, [41, 48, 53], 0.5);                                        // el matiz: cama más oscura
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57]);
teclea(G + 0.05, 9, 11);                                                     // "te quiero"
m.burbuja(G + 1.4, 0.16, 700); m.whoosh(G + 1.7, 0.3, 0.1);                  // toca "mucho" y se envía
m.metal(G + 2.4, 0.18, 1200);                                                // clac del candado
m.sube(G + 2.8, 0.6, 64, 76, 0.05); m.whoosh(G + 4.0, 0.5, 0.14);           // sale el paquetito
teclea(Pd + 0.15, 9, 11); m.nota(Pd + 1.6, 76, 0.06, 0.5);                   // sugerencia "mucho"
m.whoosh(Pd + 2.3, 0.4, 0.1);
for (let k = 0; k < 6; k++) m.nota(Pd + 2.7 + k * 0.14, m.ESC[3 + k], 0.035, 0.3); // la red se enciende
m.whoosh(Es - 0.2, 0.5, 0.12); m.zumbido(Es + 0.3, 4.6, 0.015, 160);
[0, 1, 2].forEach((k) => m.burbuja(Es + 0.3 + k * 0.6, 0.15, 450 + k * 120)); // cargando · sin usarse · wifi
for (let k = 0; k < 8; k++) m.nota(Es + 2.3 + k * 0.32, m.ESC[2 + (k % 6)], 0.035, 0.35);
m.sube(Pq + 0.3, 0.8, 72, 55, 0.05); m.golpe(Pq + 1.0, 0.25, 90);            // la red se comprime en el paquete
m.metal(Pq + 1.6, 0.2, 1200);                                                // candado
m.whoosh(Pq + 2.4, 0.5, 0.1); m.metal(Pq + 3.2, 0.1, 1400); m.metal(Pq + 3.45, 0.1, 1400);
m.whoosh(Pm - 0.2, 0.5, 0.12);
for (let k = 0; k < 7; k++) m.tic(Pm + 1.2 + k * 0.16, 0.12, 1500 + k * 120); // llegan los paquetitos
m.motor(Pm + 1.8, 1.0, 0.05);                                                // el servidor mezcla
[57, 64, 69, 72].forEach((n, k) => m.nota(Pm + 2.8 + k * 0.02, n, 0.05, 1.2)); // promedio → acorde
for (let k = 0; k < 7; k++) m.nota(Pm + 3.6 + k * 0.06, 76 + (k % 3) * 2, 0.025, 0.3);
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(E + 0.2, 0.3, 80); m.sube(E + 2.0, 0.8, 52, 70, 0.04); m.sube(E + 3.4, 1.0, 52, 74, 0.04);
m.whoosh(R - 0.2, 0.4, 0.1); m.sube(R + 0.6, 0.9, 52, 68, 0.035); m.sube(R + 1.1, 0.9, 52, 68, 0.035);
m.sube(R + 2.2, 0.9, 52, 66, 0.035); m.sube(R + 2.7, 0.9, 52, 70, 0.035); m.nota(R + 3.6, 72, 0.05, 0.6);
m.whoosh(A - 0.2, 0.4, 0.1); m.burbuja(A + 0.6, 0.12, 600);
for (let k = 0; k < 14; k++) { m.gota(A + 2.0 + k * 0.28 + 0.8, 0.07, 700 + (k * 97) % 500); }
for (let k = 0; k < 10; k++) m.tic(A + 2.0 + k * 0.2, 0.06, 900);              // el dado rueda
m.golpe(M + 0.3, 0.3, 70); m.zumbido(M + 0.5, 7.5, 0.02, 140);
for (let k = 0; k < 4; k++) { m.burbuja(M + 1.8 + k * 0.5, 0.12, 400); m.nota(M + 3.2 + k * 0.9, 64 - k * 2, 0.05, 0.6); } // letras que se reconstruyen
m.golpe(M + 4.4, 0.2, 90);
m.metal(C + 0.5, 0.15, 1200); m.sube(C + 1.2, 0.6, 64, 76, 0.05); m.whoosh(C + 3.6, 0.6, 0.14);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
