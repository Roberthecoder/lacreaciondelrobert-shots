// gen-audio.mjs — cama grave + efectos del Shot Científico #32 (el dolor del dedo llega tarde). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Dolor Tarde base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 320);
const K = m.K;
const toc = (t) => { m.golpe(t, 0.6, 110); m.metal(t, 0.06, 300); };                                  // dedo contra la pata de madera
const zap = (t, g = 0.12) => { m.sube(t, 0.18, 84, 96, g); m.tic(t, 0.25, 3600); };                     // piquete agudo
const sordo = (t, d, g = 0.05) => { m.zumbido(t, d, g, 70); for (let i = 0; i < Math.floor(d / 0.9); i++) m.latido(t + i * 0.9, 0.12); }; // dolor que arde y se queda
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.whoosh(0, 0.35, 0.12); toc(0.35);                                                                      // ¡TOC!
zap(0.9);                                                                                                // 1 · piquete
sordo(2.6, 3.6);                                                                                         // 2 · dolor sordo
zap(K.Dos + 0.2, 0.08); m.whoosh(K.Dos + 0.35, 0.6, 0.18); m.nota(K.Dos + 0.95, 84, 0.06, 0.4);        // la señal azul sube volando
m.tic(K.Dos + 0.9, 0.2, 2400); m.tic(K.Dos + 1.6, 0.2, 2600);                                            // chips
m.whoosh(K.Fibras + 0.3, 0.5, 0.12); m.nota(K.Fibras + 0.6, 76, 0.05, 0.6);                              // se abre la lupa
for (let i = 0; i < 4; i++) for (let k = 0; k < 7; k++) m.tic(K.Fibras + 0.6 + i / 0.9 + k * 0.15, 0.08, 2800 + k * 150); // saltos de la señal rápida
m.nota(K.Fibras + 2.2, 81, 0.06, 0.6);                                                                   // con forro: rápida
sordo(K.Dolor, 7.2, 0.045); m.tic(K.Dolor + 0.3, 0.2, 2000);                                            // el dolor que se queda
m.whoosh(K.Dolor + 2.0, 0.5, 0.1); m.sube(K.Dolor + 2.6, 4.5, 45, 50, 0.04);                             // la señal roja avanza despacio
for (let i = 0; i < 5; i++) m.tic(K.Velocidad + 0.4 + i / 1.4, 0.15, 3200);                             // la rápida cruza y cruza
m.sube(K.Velocidad + 0.4, 0.5, 60, 84, 0.06);                                                            // medidor lleno
m.sube(K.Velocidad + 3.0, 3.8, 45, 48, 0.05); m.nota(K.Velocidad + 3.0, 52, 0.05, 1.2);                   // la lenta, apenas
m.whoosh(K.Distancia + 0.3, 2.0, 0.1); m.sube(K.Distancia + 0.3, 2.0, 55, 79, 0.05);                     // del dedo al cerebro
for (let i = 0; i < 6; i++) m.tic(K.Distancia + 1.6 + i * 0.17, 0.14, 1800 + i * 120);                    // la regla crece
m.golpe(K.Distancia + 2.5, 0.35, 90); m.nota(K.Distancia + 2.5, 69, 0.06, 0.8);                          // más de 1 m
m.nota(K.Pregunta + 0.05, 64, 0.06, 0.6); m.nota(K.Pregunta + 0.35, 67, 0.05, 0.6);                      // ¿?
m.whoosh(K.Primer + 0.3, 0.7, 0.15); m.nota(K.Primer + 1.0, 88, 0.07, 0.6);            // llega la azul: 1
m.sube(K.Primer + 0.9, 3.3, 45, 52, 0.04); m.golpe(K.Primer + 4.2, 0.35, 70); m.nota(K.Primer + 4.2, 57, 0.06, 1.0); // llega la roja: 2
m.cruje(K.Primer + 4.5, 0.35); m.golpe(K.Primer + 5.2, 0.3, 55); m.motor(K.Primer + 5.2, 1.2, 0.06);     // rayo… y trueno
for (let i = 0; i < 10; i++) m.whoosh(K.Sobar + 0.3 + i * 0.9, 0.4, 0.05);                              // sobarse
m.nota(K.Sobar + 2.0, 72, 0.06, 0.8); m.golpe(K.Sobar + 2.0, 0.2, 100);                                  // 1965 · teoría
for (let i = 0; i < 4; i++) m.gota(K.Sobar + 4.4 + i * 0.35, 0.12, 700 + i * 80);                       // llegan las señales del tacto
m.metal(K.Sobar + 6.0, 0.08, 520); m.nota(K.Sobar + 6.3, 64, 0.05, 1.0);                                 // la compuerta baja el volumen
m.whoosh(K.Cierre, 0.35, 0.1); toc(K.Cierre + 0.35); zap(K.Cierre + 0.9); m.whoosh(K.Cierre + 0.9, 0.5, 0.14); // el mismo golpe
sordo(K.Cierre + 2.1, 3.0, 0.04); m.nota(K.Cierre + 3.2, 76, 0.06, 0.8);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
