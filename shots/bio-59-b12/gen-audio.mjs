// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #59 (vitamina B12). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot B12 base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
const G = K.Gancho, N = K.Nadie, V = K.Vaca, Ve = K.Vegano, P = K.Pregunta, M = K.Molecula, H = K.Hodgkin, S = K.Sintesis, Ta = K.Tanque, Q = K.Queso, C = K.Cierre, Ou = K.Outro;
const lerp = (a, b, t) => a + (b - a) * t;
const V2 = lerp(V, Ve, 0.39), H2 = lerp(H, S, 0.71), S2 = lerp(S, Ta, 0.62);

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                              // cama grave continua
m.whoosh(G, 0.45, 0.07); m.tic(G + 0.45, 0.35, 1600); m.tic(G + 0.8, 0.18, 1800);    // la pastilla cae y rebota
m.cruje(G + 1.6, 0.4); m.cruje(G + 2.1, 0.4);                                         // se tachan la planta y la vaca
for (let i = 0; i < 6; i++) m.nota(G + 3.0 + i * 0.15, m.ESC[4 + i], 0.05, 0.5);      // llegan las bacterias
for (let i = 0; i < 3; i++) m.cruje(N + 0.6 + i * 0.35, 0.3);                         // tres taches
m.nota(N + 2.0, 72, 0.07, 0.8); m.nota(N + 2.6, 76, 0.07, 0.8);                      // dos palomitas
m.whoosh(V + 0.6, 0.6, 0.08);                                                          // se abre la Lupa
for (let i = 0; i < 9; i++) m.burbuja(V + 1.2 + i * 0.18, 0.06, 450 + (i % 4) * 80);   // microbios de la panza
for (let i = 0; i < 9; i++) m.nota(V + 1.4 + i * 0.15, m.ESC[i], 0.03, 0.4);          // cada microbio suelta B12
m.tic(V2 + 1.0, 0.2, 1200); m.tic(V2 + 1.5, 0.2, 1000);                               // leche y bistec
m.metal(Ve + 0.4, 0.1, 600);                                                           // "casi 0"
m.golpe(Ve + 1.7, 0.3, 90); m.tic(Ve + 1.9, 0.2, 1500);                               // caja y pastilla
m.sube(P + 0.1, 1.8, 52, 64, 0.05);                                                    // la pregunta
for (let i = 0; i < 6; i++) m.burbuja(P + 0.2 + i * 0.3, 0.06, 600);                   // el matraz
for (let i = 0; i < 4; i++) m.nota(M + 0.2 + i * 0.5, 57 + i * 3, 0.05, 0.7);         // se dibujan los 4 anillos
m.metal(M + 2.2, 0.25, 990);                                                           // se enciende el cobalto
m.zumbido(H + 0.4, 1.2, 0.05, 220);                                                    // haz de rayos X
for (let i = 0; i < 12; i++) m.tic(H + 1.0 + i * 0.2, 0.06, 2600);                    // puntos de difracción
m.golpe(H + 0.3, 0.3, 80);                                                             // tarjeta 1956
m.golpe(H2, 0.35, 70); m.metal(H2 + 0.1, 0.2, 760);                                    // medalla del Nobel
for (let i = 0; i < 24; i++) m.tic(S + 0.6 + 3 * Math.sqrt(i / 24), 0.08, 1800);      // contador de científicos
m.whoosh(S2, 1.4, 0.06);                                                               // se desenrolla la tira de pasos
m.cruje(S2 + 1.8, 0.5);                                                                // se tacha el mito
m.motor(Ta, Q - Ta, 0.04);                                                             // agitador del tanque
for (let i = 0; i < 10; i++) m.burbuja(Ta + 0.3 + i * 0.4, 0.05, 520);
m.whoosh(Ta + 0.8, 0.5, 0.07);                                                         // Lupa
for (let i = 0; i < 7; i++) m.burbuja(Q + 0.3 + i * 0.25, 0.1, 300 + i * 40);          // se inflan los hoyos (CO₂)
m.nota(Q + 2.0, 79, 0.06, 0.6);                                                        // asoma la bacteria
m.tic(C + 0.2, 0.25, 1500); for (let i = 0; i < 6; i++) m.nota(C + 0.3 + i * 0.15, m.ESC[6 + i], 0.04, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
