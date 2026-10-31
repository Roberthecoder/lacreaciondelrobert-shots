// gen-audio.mjs — cama grave + efectos del Shot IA #37 (IA de lunares y piel oscura). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lunares base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 37);
const K = m.K;
const G = K.Gancho, L = K.Lupa, P = K.Promesa, Q = K.Pregunta, E = K.Estudio, R = K.Resultado, D = K.Dermas, A = K.Arreglo, B = K.ABCDE, C = K.Cierre, Ou = K.Outro;
const P2 = P + 4.8, B2 = B + 6.4;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G + 0.1, 2.2, 0.03, 240);                                               // el celular escanea
m.nota(G + 1.0, 72, 0.06, 0.5); m.nota(G + 1.05, 76, 0.05, 0.5);                  // ✔ en piel clara
m.nota(G + 2.6, 63, 0.06, 0.6, 0.4); m.nota(G + 2.75, 62, 0.05, 0.6, 0.4);        // "?" en piel oscura
m.whoosh(L - 0.2, 0.5, 0.12); m.burbuja(L + 0.25, 0.18, 420);                      // se abre la lupa
for (let i = 0; i < 7; i++) m.gota(L + 0.7 + i * 0.18, 0.08, 700 + i * 60);       // melanocitos
for (let i = 0; i < 14; i++) m.tic(L + 2.4 + i * 0.08, 0.05, 1800 + (i % 4) * 150); // pixeles
m.golpe(P + 0.15, 0.35, 80);                                                       // tarjeta 2017
for (let i = 0; i < 28; i++) m.tic(P + 1.0 + i * 0.09, 0.05, 2000 + (i % 5) * 110); // fotos que llegan
m.sube(P + 1.0, 2.6, 50, 74, 0.035);                                               // contador 129,450
m.whoosh(P2 - 0.3, 0.5, 0.12);
for (let i = 0; i < 21; i++) m.tic(P2 + 0.2 + i * 0.06, 0.07, 1300 + (i % 7) * 80); // 21 dermatólogos
m.nota(P2 + 1.6, 69, 0.05, 0.6);
m.sube(Q + 0.05, 1.4, 50, 62, 0.05);                                               // pregunta
m.golpe(E + 0.15, 0.35, 80);                                                       // tarjeta 2022
for (let i = 0; i < 30; i++) m.tic(E + 0.6 + i * 0.09, 0.04, 2200 + (i % 6) * 90); // 656 fotos
m.golpe(E + 3.4, 0.5, 60);                                                         // sello biopsia
for (let i = 0; i < 7; i++) m.nota(R + 1.2 + i * 0.31, 67 + (i % 3) * 2, 0.05, 0.35); // 7 lunares en piel clara
for (let i = 0; i < 2; i++) m.nota(R + 3.8 + i * 0.6, 60, 0.05, 0.4, 0.5);         // 2 en piel oscura
m.nota(R + 5.2, 58, 0.04, 0.8, 0.6);
m.whoosh(D - 0.2, 0.5, 0.1); m.sube(D + 0.6, 1.0, 52, 72, 0.04); m.sube(D + 1.7, 1.0, 52, 68, 0.04); // barras 72 / 59
for (let i = 0; i < 9; i++) m.burbuja(A + 0.6 + i * 0.12, 0.08, 400 + i * 30);     // el robotito come fotos
m.sube(A + 1.0, 1.8, 52, 64, 0.04); m.nota(A + 2.7, 72, 0.06, 0.8); m.nota(A + 2.75, 76, 0.05, 0.8); // la brecha se cierra
[0.5, 1.2, 2.4, 3.4, 5.2].forEach((t, i) => m.nota(B + t, [64, 67, 69, 72, 74][i], 0.06, 0.5)); // A B C D E
m.whoosh(B2 - 0.2, 0.5, 0.1);
[0.8, 1.3, 1.9].forEach((t) => m.tic(B2 + t, 0.12, 1500));                         // palmas, plantas, uñas
m.zumbido(C, 1.0, 0.025, 240); m.cruje(C + 1.2, 0.3);                              // la "IA que adivina" se tacha
m.nota(C + 2.7, 72, 0.06, 0.8); m.nota(C + 2.75, 76, 0.05, 0.8); m.nota(C + 3.0, 79, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
