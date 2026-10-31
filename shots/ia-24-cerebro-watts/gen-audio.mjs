// gen-audio.mjs — cama grave + efectos del Shot IA #24 (tu cerebro con 20 W contra una tarjeta de IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot CerebroWatts base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 24);
const K = m.K;
const G = K.Gancho, Cu = K.Cuerpo, N = K.Neuronas, Mi = K.Mito, Ta = K.Tarjeta, Ml = K.Miles, P = K.Pregunta, O = K.Ojo, E = K.Estudio, Co = K.Copia, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.zumbido(G + 0.25, 0.8, 0.03, 240);                                              // la luz viaja por el cable
m.tic(G + 0.95, 0.35, 1800); m.zumbido(G + 1.0, 2.6, 0.02, 120);                  // clic: el foco se enciende
m.sube(G + 1.2, 0.8, 52, 69, 0.04);                                               // ≈ 20 W
m.whoosh(Cu, 0.5, 0.12); m.sube(Cu + 0.4, 0.8, 52, 60, 0.04); m.sube(Cu + 2.2, 1.0, 52, 72, 0.04); // las dos donas
m.whoosh(N - 0.3, 0.6, 0.12);
for (let i = 0; i < 16; i++) m.nota(N - 0.2 + i * 0.13, m.ESC[(i * 3) % 10], 0.03, 0.4);   // neuronas que se encienden
m.sube(N + 0.5, 1.2, 50, 74, 0.04);
m.golpe(Mi + 1.0, 0.35, 75); m.cruje(Mi + 1.0, 0.25);                              // tachado
for (let i = 0; i < 6; i++) m.nota(Mi + 1.4 + i * 0.33, m.ESC[4 + i], 0.05, 0.6);  // zonas que se encienden
m.whoosh(Ta, 0.5, 0.12); m.motor(Ta + 0.4, 4.8, 0.06);                            // ventiladores de la tarjeta
m.sube(Ta + 0.6, 1.6, 45, 76, 0.05);                                              // medidor a 700 W
for (let i = 0; i < 35; i++) m.tic(Ta + 2.6 + i * 0.05, 0.05, 1500 + (i % 7) * 120); // 35 cerebritos
m.whoosh(Ml, 0.7, 0.14); m.zumbido(Ml + 0.2, 3.8, 0.03, 110);                      // se aleja: centro de datos
for (let i = 0; i < 20; i++) m.tic(Ml + 0.6 + i * 0.13, 0.04, 2200);              // contador
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.metal(O + 0.3, 0.12, 620); m.golpe(O + 0.4, 0.3, 80);                           // balanza y ≠
m.golpe(E + 0.2, 0.35, 80);
for (let k = 0; k < 7; k++) m.whoosh(E + 3.6 + k * 1.43, 0.45, 0.06);              // la señal viaja por el axón
m.nota(E + 4.6, 72, 0.04, 0.4); m.sube(E + 6.0, 1.1, 50, 76, 0.05);                // 0.1 W y 3.5 W
m.golpe(Co + 0.3, 0.3, 80); m.zumbido(Co + 0.5, 7.5, 0.025, 160);                  // Hala Point
m.sube(Co + 2.2, 1.6, 50, 70, 0.04); m.sube(Co + 4.0, 1.5, 45, 78, 0.05);
m.tic(C + 0.2, 0.35, 1800); m.nota(C + 1.2, 72, 0.06, 0.8); m.nota(C + 1.25, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
