// gen-audio.mjs — cama grave + efectos del Shot IA #57 (Face ID). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot FaceId base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 57);
const K = m.K;
const G = K.Gancho, Ma = K.Mapa, R = K.Red, F = K.Foto, P = K.Pregunta, N = K.Numero, C = K.Comparativa, E = K.Estudio, Ge = K.Gemelos, O = K.Ojos, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G + 0.1, 0.5, 0.03, 420);                                               // se enciende el proyector
for (let i = 0; i < 28; i++) m.tic(G + 0.35 + i * 0.1, 0.05, 3200 + (i % 6) * 150); // puntos que se encienden
m.whoosh(Ma, 0.6, 0.12); m.sube(Ma + 0.6, 2.0, 50, 69, 0.04);                     // la malla se levanta
m.nota(Ma + 3.4, 64, 0.05, 0.5);                                                  // foto infrarroja
m.zumbido(R + 0.4, 5.5, 0.02, 170);
for (let i = 0; i < 4; i++) m.nota(R + 0.8 + i * 0.65, 60 + i * 3, 0.04, 0.35);    // la onda cruza la red
for (let i = 0; i < 8; i++) m.tic(R + 2.6 + i * 0.1, 0.06, 1500 + i * 80);         // números
m.metal(R + 4.0, 0.12, 900); m.nota(R + 4.05, 72, 0.05, 0.6);                     // ✔
m.whoosh(F, 0.5, 0.1); m.zumbido(F + 1.8, 0.6, 0.06, 110);                        // foto plana: error
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(N + 0.2, 0.35, 80); m.sube(N + 0.2, 1.2, 52, 76, 0.04);                   // 1 en 1,000,000
for (let i = 0; i < 6; i++) m.golpe(N + 1.5 + i * 0.35, 0.12, 120);              // extraños: ✖
m.whoosh(C, 0.5, 0.1); m.tic(C + 0.1, 0.2, 1400); m.tic(C + 0.6, 0.2, 1200); m.tic(C + 3.2, 0.2, 1000);
m.golpe(E + 0.2, 0.3, 80); m.sube(E + 1.6, 1.0, 52, 74, 0.04);
for (let i = 0; i < 12; i++) m.tic(E + 1.5 + i * 0.07, 0.04, 3000);
m.nota(Ge + 1.4, 67, 0.05, 0.8); m.nota(Ge + 1.45, 67.3, 0.05, 0.8);               // gemelos: dos notas casi iguales
m.pop && m.pop(Ge + 3.0); m.nota(Ge + 3.0, 64, 0.04, 0.4); m.nota(Ge + 4.4, 71, 0.04, 0.4);
m.nota(O + 0.3, 45, 0.06, 2.4);                                                   // dormido
m.burbuja(O + 3.0, 0.15, 600); m.metal(O + 3.5, 0.12, 900); m.nota(O + 3.55, 72, 0.05, 0.6);  // abre los ojos → abre
m.sube(Ci + 0.4, 1.0, 55, 67, 0.04); m.tic(Ci + 2.6, 0.15, 1800); m.tic(Ci + 2.75, 0.15, 1800); m.tic(Ci + 2.9, 0.15, 1800); m.tic(Ci + 3.05, 0.15, 1800);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
