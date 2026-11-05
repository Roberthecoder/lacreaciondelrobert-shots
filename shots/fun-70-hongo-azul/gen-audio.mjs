// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #70 (hongo azul, Lactarius indigo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Azul base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 70);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Me = K.Mercado, No = K.Nombres, L = K.Leche, Pi = K.Pigmento, P = K.Pregunta, Mi = K.Micorriza, Tr = K.Trato, E = K.Estudio, X = K.Extra, C = K.Cierre, Ou = K.Outro;
const tMapa = Me + 3.3;

m.pad(0, Mi, 0.05, [43, 50, 55], 0.1);                                           // cama grave y fresca (bosque húmedo)
m.pad(Mi, Ou + 3.5, 0.05, [45, 52, 57], 0);                                      // se abre bajo el suelo: la sociedad con los árboles
m.whoosh(G + 0.05, 0.5, 0.1); m.cruje(G + 0.4, 0.25);                            // baja el cuchillo y corta
for (let i = 0; i < 5; i++) m.gota(G + 0.6 + i * 0.3, 0.1, 900 - i * 40);        // brotan gotas de látex
for (let i = 0; i < 6; i++) m.gota(G + 1.7 + i * 0.55, 0.08, 600);               // escurren a la tabla
m.tic(N + 0.2, 0.15, 1200); m.tic(N + 0.9, 0.12, 1400);                          // etiquetas
for (let i = 0; i < 3; i++) m.golpe(Me + 0.2 + i * 0.2, 0.2, 90);                // canastas
m.whoosh(tMapa - 0.3, 0.6, 0.06);
for (let i = 0; i < 3; i++) m.nota(tMapa + 0.3 + i * 0.25, 67 + i * 2, 0.05, 0.5); // puntos del mapa
for (let i = 0; i < 5; i++) { m.golpe(No + 0.65 + i * 0.5, 0.25, 70); m.cruje(No + 0.65 + i * 0.5, 0.06); } // cartoncitos que caen
m.sube(No + 1.2, 1.6, 52, 64, 0.04);                                             // cuenta hasta 44
m.burbuja(L + 0.6, 0.06, 380); m.burbuja(L + 1.0, 0.06, 420); m.burbuja(L + 1.5, 0.06, 460); // fluye el látex
m.gota(L + 2.0, 0.14, 700); m.nota(L + 3.0, 64, 0.04, 1.2);                      // sale la gota y se oxida
m.nota(Pi + 0.3, 72, 0.05, 1.0); m.nota(Pi + 0.8, 76, 0.05, 1.0);                // el azuleno brilla
for (let i = 0; i < 12; i++) m.tic(Pi + 1.6 + i * 0.07, 0.07, 1500 + i * 30);    // paleta
m.nota(Pi + 2.5, 79, 0.06, 0.8);                                                 // el único azul
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                              // re-gancho
m.cruje(Mi + 0.3, 0.2); for (let i = 0; i < 8; i++) m.tic(Mi + 0.8 + i * 0.25, 0.06, 2000); // raíces e hifas que crecen
m.whoosh(Mi + 2.6, 0.5, 0.06);                                                   // acercamiento a la punta de la raíz
for (let i = 0; i < 6; i++) m.nota(Tr + 0.3 + i * 0.5, 69 + (i % 3) * 2, 0.04, 0.4); // azúcares que bajan
for (let i = 0; i < 6; i++) m.burbuja(Tr + 1.4 + i * 0.5, 0.05, 500 + i * 30);   // N y P que suben
m.golpe(E + 0.2, 0.35, 80);                                                      // tarjeta 2012
for (let i = 0; i < 26; i++) m.tic(E + 1.6 + i * 0.1, 0.05, 2600 + (i % 4) * 300); // se lee el ADN
m.golpe(X + 0.2, 0.35, 80);                                                      // tarjeta 2023
for (let i = 0; i < 8; i++) m.burbuja(X + 0.9 + i * 0.3, 0.07, 350 + i * 40);    // se llena el matraz
m.nota(X + 2.6, 74, 0.05, 1.0);
m.whoosh(C + 0.6, 0.6, 0.06); m.nota(C + 1.6, 69, 0.06, 1.4);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
