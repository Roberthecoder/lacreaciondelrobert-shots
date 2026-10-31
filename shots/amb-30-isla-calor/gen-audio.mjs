// gen-audio.mjs — cama grave + efectos del Shot Ambiental #30 (isla de calor urbana). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Isla Calor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 30);
const K = m.K;
const G = K.Gancho, I = K.Isla, Te = K.Techos, N = K.Noche, E = K.Extra, P = K.Pregunta, Es = K.Estudio, F = K.Febrero, A = K.Arboles, C = K.Cierre, Ou = K.Outro;

m.pad(0, A + 2, 0.05, [45, 52, 57]);                                                    // cama tibia mientras la ciudad se calienta
m.pad(A + 2, Ou + 3.5, 0.045, [45, 50, 57]);                                            // se "enfría" con los árboles
m.zumbido(G, 4.8, 0.03, 160);                                                           // ventilador
for (let i = 0; i < 6; i++) m.gota(G + 0.3 + i * 0.75, 0.08, 1100);                     // gotas de sudor
for (let i = 0; i < 8; i++) m.tic(G + 0.5 + i * 0.55, 0.04, 4200 + (i % 2) * 300);       // grillos del rancho
m.sube(G + 0.1, 2.1, 57, 64, 0.04);                                                     // termómetro de la ciudad sube
m.whoosh(I - 0.2, 0.9, 0.12); m.nota(I + 1.4, 64, 0.06, 0.9);                           // la cámara sube: mancha térmica
for (let i = 0; i < 4; i++) m.whoosh(Te + 0.2 + i * 0.6, 0.4, 0.05);                    // rayos de sol
m.sube(Te + 0.3, 2.7, 52, 64, 0.05); m.golpe(Te + 2.4, 0.35, 90);                       // se cargan los materiales · +36 °C
m.sube(N - 0.2, 1.2, 64, 52, 0.05); m.whoosh(N + 0.6, 2.4, 0.06);                       // atardece · ondas de calor
for (let i = 0; i < 6; i++) m.tic(N + 1.3 + i * 0.4, 0.035, 4300);                      // grillos del campo
m.golpe(E + 0.2, 0.25, 110); m.golpe(E + 1.3, 0.25, 100); m.whoosh(E + 1.4, 0.7, 0.12);  // tarjetas · viento que choca
m.golpe(E + 2.6, 0.25, 95); m.motor(E + 2.7, 1.8, 0.05);                                // coche y clima
m.sube(P + 0.05, 1.3, 52, 64, 0.05); m.golpe(P + 2.2, 0.3, 85);                         // ¿cuánto? · +1 a 2.8 °C
m.tic(Es + 1.6, 0.2, 2000); m.tic(Es + 2.0, 0.2, 1600); m.nota(Es + 2.6, 62, 0.05, 0.7); // pines del mapa
[0, 1, 2].forEach((i) => m.nota(F + 0.2 + i * 0.3, 45 + i * 2, 0.06, 0.5)); m.nota(F + 1.1, 69, 0.05, 0.5); // 3 noches y 1 día
m.golpe(F + 3.4, 0.45, 60); m.sube(F + 3.4, 1.0, 57, 69, 0.05);                         // +7.8 °C
m.whoosh(A + 0.9, 1.2, 0.08);                                                           // brocha: techo claro
for (let i = 0; i < 5; i++) m.burbuja(A + 1.6 + i * 0.4, 0.05, 420 + i * 40);           // crecen los árboles
m.nota(A + 4.6, 64, 0.05, 0.9); m.nota(A + 4.9, 69, 0.05, 0.9);                         // −1.6 °C
m.zumbido(C, 3.5, 0.025, 160); for (let i = 0; i < 4; i++) m.gota(C + 0.3 + i * 0.8, 0.07, 1100);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
