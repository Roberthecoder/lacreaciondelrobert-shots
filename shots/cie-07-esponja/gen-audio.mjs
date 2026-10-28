// gen-audio.mjs — cama grave + efectos del Shot Científico #07 (la esponja de cocina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esponja base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 77);
const K = m.K;
const G = K.Gancho, Cu = K.Cubito, E = K.Estudio, A = K.Adn, H = K.Huecos, Q = K.Pregunta, I = K.Igual, M = K.Moraxella, O = K.Olor, R = K.Regresan, Cs = K.Consejo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 4; i++) { m.burbuja(G + 0.1 + i * 0.5, 0.12, 380); m.gota(G + 0.3 + i * 0.5, 0.14, 800); }   // se aprieta y gotea
for (let i = 0; i < 10; i++) m.tic(G + 1.2 + i * 0.24, 0.06, 2400 + (i % 3) * 300);                        // se prenden las ventanas
m.whoosh(Cu - 0.1, 0.6, 0.12); m.sube(Cu + 1.0, 1.0, 52, 64, 0.05); m.golpe(Cu + 2.0, 0.3, 70);
m.golpe(E + 0.25, 0.35, 80);
for (let i = 0; i < 14; i++) m.tic(E + 2.2 + i * 0.12, 0.07, 1800);                                         // 14 esponjas
m.sube(A + 0.6, 1.2, 55, 67, 0.04);
m.whoosh(H - 0.2, 0.6, 0.12);
for (let i = 0; i < 12; i++) m.burbuja(H + 0.2 + i * 0.16, 0.06, 300 + i * 25);                             // se llenan los huecos
m.zumbido(Q + 0.1, 2.6, 0.05, 120);                                                                         // el micro
m.sube(I + 0.3, 1.0, 52, 60, 0.04); m.sube(I + 0.3, 1.0, 52, 61, 0.04); m.golpe(I + 1.6, 0.25, 65);
m.nota(M + 1.0, 60, 0.06, 0.9); m.nota(O + 0.4, 58, 0.06, 1.2);                                               // el olor
m.zumbido(R + 0.4, 1.4, 0.06, 120); m.sube(R + 0.6, 1.0, 69, 57, 0.04); m.sube(R + 2.4, 2.6, 57, 69, 0.04); // bajan… y suben
for (let i = 0; i < 7; i++) m.tic(Cs + 0.3 + i * 0.21, 0.1, 2200);                                          // los 7 días
for (let i = 0; i < 6; i++) m.tic(C + 0.2 + i * 0.2, 0.06, 2600);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
