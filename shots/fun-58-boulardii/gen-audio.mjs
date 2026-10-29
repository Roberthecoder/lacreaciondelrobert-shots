// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #58 (Saccharomyces boulardii). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Boulardii base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 58);
const K = m.K;
const G = K.Gancho, E = K.Especie, H = K.Historia, Ca = K.Calor, Ac = K.Acido, P = K.Pregunta, An = K.Antibioticos, L = K.Levadura, Es = K.Estudio, Li = K.Limite, R = K.Riesgo, N = K.NoSeQueda, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);
m.cruje(G + 0.25, 0.35); m.whoosh(G + 0.3, 0.6, 0.12);                        // se rasga el sobre
for (let i = 0; i < 14; i++) m.tic(G + 0.6 + i * 0.09, 0.05, 3200 + (i % 4) * 300); // cae el polvito
m.cruje(G + 1.6, 0.3);                                                         // se tacha «¿bacterias?»
m.zumbido(G + 2.2, 1.2, 0.04, 220);                                            // se abre la lupa
for (let i = 0; i < 4; i++) m.burbuja(E + i * 0.15, 0.1, 420 + i * 40);        // aparecen las levaduras
m.sube(E + 0.6, 1.6, 57, 64, 0.04);                                            // brota la yema
m.nota(E + 1.6, 69, 0.06, 0.8);                                                // el bolillo
m.golpe(H, 0.25, 110); m.golpe(H + 0.5, 0.25, 95);                             // lichi y mangostán
m.whoosh(H + 1.6, 1.0, 0.1);                                                   // a la tetera
for (let i = 0; i < 8; i++) m.burbuja(H + 2.6 + i * 0.18, 0.08, 280 + i * 20); // hierve el té
m.sube(Ca + 0.3, 1.3, 52, 64, 0.05); m.nota(Ca + 1.4, 69, 0.07, 0.7);           // sube a 37 °C
m.sube(Ca + 1.4, 1.2, 50, 57, 0.035);                                           // el otro termómetro
for (let i = 0; i < 10; i++) m.burbuja(Ac + 0.1 + i * 0.2, 0.06, 600 + i * 30); // ácido burbujeante
for (let i = 0; i < 5; i++) m.tic(Ac + 0.9 + i * 0.18, 0.08, 900);              // se apagan en el otro tubo
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.metal(P + 0.2, 0.1, 1800);                                                    // la cápsula
for (let i = 0; i < 5; i++) m.whoosh(An + 1.0 + i * 0.15, 0.5, 0.06);           // entran los antibióticos
for (let i = 0; i < 16; i++) m.tic(An + 1.9 + i * 0.1, 0.07, 1400 - i * 30);    // se apagan bacterias
m.golpe(An + 2.6, 0.3, 70);
for (let i = 0; i < 4; i++) m.nota(L + 0.2 + i * 0.2, [69, 72, 76, 79][i], 0.05, 0.6); // brillan las levaduras
m.golpe(Es + 0.2, 0.35, 80);                                                    // tarjeta del estudio
for (let i = 0; i < 19; i++) m.tic(Es + 4.0 + i * 0.04, 0.06, 1200);           // 18.7 de 100
for (let i = 0; i < 9; i++) m.tic(Es + 5.0 + i * 0.04, 0.06, 2000);            // 8.5 de 100
m.nota(Es + 5.4, 64, 0.05, 1.0);
m.sube(Li, 0.6, 45, 50, 0.04);                                                  // C. difficile
m.whoosh(Li + 1.4, 0.8, 0.08); m.nota(Li + 2.2, 57, 0.05, 1.0, 0.5);            // el intervalo cruza el 1
for (let i = 0; i < 6; i++) m.tic(R + 0.3 + i * 0.9, 0.05, 1900);              // monitor del hospital
m.cruje(R + 2.2, 0.3); m.whoosh(R + 2.6, 2.0, 0.07);                            // se abre el sobre; el polvo flota
m.golpe(R + 3.3, 0.3, 80);                                                      // tarjeta 2000
for (let i = 0; i < 5; i++) m.tic(N + 0.2 + i * 0.3, 0.1, 2600 - i * 200);      // pasan los días
m.whoosh(C + 0.3, 0.6, 0.08); m.golpe(C + 0.9, 0.25, 110); m.nota(C + 1.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
