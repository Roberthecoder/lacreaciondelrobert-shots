// gen-audio.mjs — cama grave + efectos del Shot IA #44 (la IA en un call center). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot CallCenter base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, E = K.Estudio, S = K.Sugerencia, N = K.Numeros, P = K.Pregunta, M = K.Mejores, X = K.Expertos, Cl = K.Clientes, Co = K.Contraste, C = K.Cierre, Ou = K.Outro;
const N2 = N + 3.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(0, 9, 0.012, 120);                                                            // oficina
for (let i = 0; i < 9; i++) m.nota(G + 0.1 + i * 0.38, 79, 0.03, 0.18);                 // chats que se apilan (timbre)
m.burbuja(G + 3.2, 0.14, 500); m.burbuja(G + 3.9, 0.12, 700);                            // llega el robotito, sopla
for (let i = 0; i < 8; i++) m.tic(G + 4.3 + i * 0.33, 0.06, 1800);                      // los pendientes bajan
m.golpe(G + 5.8, 0.35, 80); m.nota(G + 6.0, 69, 0.05, 0.6); m.nota(G + 6.05, 76, 0.04, 0.6); // 2 meses = +6 meses
m.whoosh(E, 0.5, 0.12); m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 16; i++) m.tic(E + 3.5 + i * 0.1, 0.05, 2200 + (i % 4) * 150);       // contador 5,172
for (let i = 0; i < 40; i++) if (i % 3 === 0) m.burbuja(E + 3.4 + i * 0.04, 0.05, 450 + i * 8); // diademas
for (let i = 0; i < 5; i++) m.nota(E + 5.2 + i * 0.08, 72 + i * 2, 0.03, 0.3);           // a una parte le llega la IA
m.whoosh(S, 0.5, 0.12); m.nota(S + 0.3, 79, 0.04, 0.2);                                  // mensaje del cliente
m.burbuja(S + 1.2, 0.14, 650); m.tic(S + 3.2, 0.2, 1400); m.whoosh(S + 3.3, 0.3, 0.06);  // sugerencia, clic, enviado
m.whoosh(N, 0.5, 0.12); m.sube(N + 0.15, 0.9, 55, 67, 0.04);                             // +15 %
for (let i = 0; i < 6; i++) m.nota(N + 1.6 + i * 0.25, 72, 0.03, 0.25);                   // casos resueltos ✔
m.sube(N2 + 0.1, 0.8, 55, 67, 0.035); m.sube(N2 + 0.4, 0.8, 55, 74, 0.04); m.tic(N2 + 2.3, 0.1, 900); // barras
m.golpe(N2 + 3.4, 0.4, 70);                                                              // se tacha el mito
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(M + 0.2, 5.4, 0.02, 170);
for (let i = 0; i < 4; i++) m.whoosh(M + 0.6 + i * 0.5, 0.4, 0.05);                       // chats de los mejores entran
for (let i = 0; i < 4; i++) m.burbuja(M + 2.4 + i * 0.5, 0.1, 600 + i * 40);              // salen sugerencias
m.whoosh(X, 0.5, 0.12); m.burbuja(X + 0.3, 0.1, 600); m.sube(X + 1.4, 0.8, 64, 60, 0.035); // calidad baja un poco
m.whoosh(Cl, 0.5, 0.12); m.golpe(Cl + 0.2, 0.25, 90); m.sube(Cl + 0.8, 0.8, 60, 72, 0.035); // cara amable
m.golpe(Cl + 1.6, 0.25, 90); m.cruje(Cl + 2.4, 0.25);                                     // botón del supervisor
m.golpe(Cl + 3.2, 0.25, 90); for (let i = 0; i < 2; i++) m.whoosh(Cl + 3.9 + i * 0.25, 0.3, 0.05); // la puerta
m.whoosh(Co, 0.5, 0.12); m.golpe(Co + 0.2, 0.35, 80); m.metal(Co + 2.6, 0.12, 900);      // tarjeta, balanza
m.nota(Co + 3.6, 64, 0.05, 0.5);
m.whoosh(C, 0.5, 0.12); m.sube(C + 1.0, 1.4, 60, 72, 0.04);                               // la estrella viaja al nuevo
m.nota(C + 2.4, 72, 0.06, 0.8); m.nota(C + 2.45, 76, 0.05, 0.8); m.nota(C + 2.5, 79, 0.04, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
