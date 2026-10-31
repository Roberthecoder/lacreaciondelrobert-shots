// gen-audio.mjs — cama grave + efectos del Shot Ambiental #41 (partículas PM2.5). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Particulas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, Ta = K.Tamano, O = K.Origen, Pu = K.Pulmon, P = K.Pregunta, Gu = K.Guia, Ci = K.Ciudad, A = K.AnoNuevo, S = K.Sirve, C = K.Cierre, Ou = K.Outro;

m.pad(0, Gu, 0.05, [45, 52, 57]);
m.pad(Gu, S, 0.05, [45, 52, 56], 0.6);                      // tapada mientras sube la contaminación
m.pad(S, Ou + 3.5, 0.05, [45, 52, 57]);                      // libre cuando aparece lo que sí sirve
m.motor(G, 3.0, 0.06);                                       // coches en la calle (desde el cuadro 0)
m.whoosh(G + 0.2, 0.6, 0.14); for (let i = 0; i < 8; i++) m.nota(G + 0.6 + i * 0.18, m.ESC[8 + (i % 5)], 0.035, 0.4);   // la lupa y los brillitos
for (let i = 0; i < 36; i++) m.tic(Ta + 0.5 + i * 0.075 + 0.4, 0.06, 1800 + (i % 6) * 120);                         // 36 partículas en fila
m.golpe(Ta + 3.6, 0.25, 110);
m.golpe(O + 0.3, 0.25, 80); m.cruje(O + 0.6, 0.25); m.motor(O + 2.5, 2.5, 0.05); m.whoosh(O + 3.4, 1.2, 0.08);         // obra, fuego, gases
m.whoosh(Pu + 0.1, 1.4, 0.1); for (let i = 0; i < 6; i++) m.latido(Pu + 0.6 + i * 0.84, 0.18);                       // respiración y corazón
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.sube(Gu + 2.2, 1.2, 64, 57, 0.05); m.golpe(Gu + 3.4, 0.25, 90);                                                    // de 10 a 5
m.sube(Ci + 1.0, 1.6, 45, 60, 0.05); for (let i = 0; i < 4; i++) m.golpe(Ci + 3.0 + i * 0.3, 0.3, 95 - i * 6);      // 20 y los 4 bloques
m.nota(Ci + 4.2, 57, 0.06, 0.9, 0.5);
[0.2, 0.8, 1.4, 2.1, 2.7, 3.3, 3.9, 4.5].forEach((d) => { m.whoosh(A + d, 0.7, 0.08); m.golpe(A + d + 0.7, 0.32, 70); m.cruje(A + d + 0.75, 0.15); });  // cohetes
for (let i = 0; i < 5; i++) m.tic(S + 0.5 + i * 0.7, 0.07, 1300 + i * 200);                                          // la escala del índice
m.golpe(S + 4.1, 0.3, 120); m.tic(S + 4.15, 0.12, 900);                                                              // clic de la ventana
m.nota(S + 4.6, 64, 0.05, 0.7);
m.motor(C, 3.0, 0.05); m.whoosh(C + 0.4, 0.6, 0.12);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
