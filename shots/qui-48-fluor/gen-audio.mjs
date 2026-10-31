// gen-audio.mjs — cama grave + efectos del Shot Químico #48 (flúor y esmalte). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fluor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
const G = K.Gancho, E = K.Esmalte, A = K.Acido, F = K.Fluor, C = K.Cristal, P = K.Pregunta, M = K.Manchas, Es = K.Estudio, R = K.Resultado, N = K.Ninos, Ci = K.Cierre, Ou = K.Outro;
const mitadM = M + 5.3, mitadR = R + 2.2, mitadN = N + 2.6;

m.pad(0, A, 0.05, [45, 52, 57]);
m.pad(A, F + 1.0, 0.05, [44, 51, 56], 0.6);                                           // tapada mientras el ácido disuelve
m.pad(F + 1.0, Ou + 3.5, 0.05, [45, 52, 57]);                                          // libre cuando el flúor reconstruye
m.whoosh(G + 0.1, 1.8, 0.1);                                                           // chorro del vaso
for (let i = 0; i < 10; i++) m.burbuja(G + 1.0 + i * 0.08, 0.08, 300 + (i % 4) * 60);  // gárgara / buche
m.whoosh(G + 1.8, 2.6, 0.12);                                                          // escupe al lavabo
for (let i = 0; i < 10; i++) m.nota(G + 1.9 + i * 0.22, 76 - i, 0.03, 0.3);            // el flúor se va (notas que bajan)
m.whoosh(E + 0.3, 0.6, 0.1); m.nota(E + 1.0, 69, 0.05, 0.8);                           // la lupa se abre
for (let i = 0; i < 4; i++) m.tic(A + 0.4 + i * 0.25, 0.08, 1500);                     // bacterias comen azúcar
for (let i = 0; i < 12; i++) m.gota(A + 1.5 + (i % 4) * 0.3 + Math.floor(i / 4) * 1.2, 0.12, 1100); // gotas de ácido
for (let i = 0; i < 12; i++) m.nota(F + 0.2 + i * 0.12 + 1.5, 72 + (i % 5) * 2, 0.04, 0.4); // flúor llega
m.sube(F + 1.4, 2.2, 57, 69, 0.04);                                                    // se reconstruye
m.whoosh(C + 0.9, 0.8, 0.08); m.nota(C + 2.4, 76, 0.06, 0.9);                          // sale OH, entra F
m.metal(C + 3.5, 0.15, 1200);                                                          // ¡tink!
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(M + 0.2, 0.35, 80);
m.golpe(mitadM, 0.3, 70); for (let i = 0; i < 9; i++) m.nota(mitadM + 0.4 + i * 0.1, 72 + (i % 3) * 3, 0.03, 0.3);
m.golpe(Es + 0.2, 0.35, 80); for (let i = 0; i < 8; i++) m.gota(Es + 3.0 + i * 0.25 + 0.6, 0.12, 900);
for (let i = 0; i < 30; i++) m.tic(R + 0.1 + i * 0.04, 0.05, 2000);                    // escolares
m.sube(mitadR, 1.0, 64, 52, 0.05); m.golpe(mitadR + 0.9, 0.3, 90);                     // la barra baja
m.nota(N + 0.8, 60, 0.05, 0.8);
m.burbuja(mitadN + 0.5, 0.1, 900); m.burbuja(mitadN + 2.3, 0.14, 600);                 // la pasta: arroz y chícharo
m.whoosh(Ci + 0.4, 1.2, 0.12);                                                          // escupe
for (let i = 0; i < 6; i++) m.nota(Ci + 1.4 + i * 0.12, 72 + i * 2, 0.04, 0.5);        // el flúor se queda
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
