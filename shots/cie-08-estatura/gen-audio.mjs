// gen-audio.mjs — cama grave + efectos del Shot Científico #08 (estatura: noche y espacio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estatura base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 88);
const K = m.K;
const G = K.Gancho, D = K.Discos, A = K.Agua, E = K.Estudio, H = K.Hora, N = K.Noche, L = K.Liverpool, Q = K.Pregunta, Es = K.Espacio, Cu = K.Cuenta, R = K.Regreso, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.sube(G + 0.1, 4.0, 69, 60, 0.04);                                   // el día pasa y la persona baja
m.golpe(G + 0.6, 0.3, 75);
for (let i = 0; i < 6; i++) m.golpe(D + 0.6 + i * 0.3, 0.12, 60 + i * 4);   // los discos se aplastan
for (let i = 0; i < 8; i++) m.gota(A + 0.6 + i * 0.35, 0.12, 900 - i * 30); // sale agua
m.golpe(E + 0.25, 0.35, 80); m.tic(E + 2.8, 0.2, 2000);
m.sube(H + 0.4, 1.4, 60, 69, 0.05);                                    // la mitad en la primera hora
m.sube(N + 0.3, 2.0, 55, 64, 0.04); for (let i = 0; i < 4; i++) m.burbuja(N + 0.4 + i * 0.4, 0.08, 350);   // se inflan
m.zumbido(L + 0.4, 2.0, 0.05, 100); m.golpe(L + 2.4, 0.3, 80);         // la resonancia
m.sube(Q + 0.1, 1.3, 52, 64, 0.05);
m.whoosh(Es - 0.2, 1.0, 0.12); m.sube(Es + 1.0, 2.0, 57, 69, 0.05);     // se estira en el espacio
m.nota(Cu + 0.3, 76, 0.06, 0.8);
m.whoosh(R + 1.4, 0.8, 0.12); m.golpe(R + 2.6, 0.25, 60);              // regreso y dolor de espalda
m.whoosh(C + 3.2, 1.6, 0.1);                                           // el cohetito
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
