// gen-audio.mjs — cama grave + efectos del Shot Científico #17 (el mapa de la lengua). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mapa Lengua base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 117);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(0, 0.5, 0.18); m.golpe(K.Gancho + 0.45, 0.25, 95);                                              // cae el póster
for (let i = 0; i < 4; i++) m.nota(K.Gancho + 0.3 + i * 0.3, [72, 76, 79, 83][i], 0.05, 0.4);             // se pintan las zonas
m.golpe(K.Gancho + 3.9, 0.45, 70); m.metal(K.Gancho + 3.9, 0.08, 300);                                     // sello MITO
m.whoosh(K.Prueba + 0.3, 0.9, 0.14);                                                                     // llega la cuchara
for (let i = 0; i < 9; i++) m.tic(K.Prueba + 1.95 + i * 0.08, 0.1, 3200 + i * 120);                       // cae el azúcar
m.sube(K.Prueba + 2.6, 0.9, 72, 84, 0.05); m.nota(K.Prueba + 2.8, 84, 0.06, 0.8);                         // dulce ✓
for (let i = 0; i < 10; i++) m.burbuja(K.Papilas + 0.3 + i * 0.22, 0.06, 500 + i * 40);                   // aparecen papilas
m.whoosh(K.Papilas + 1.9, 0.6, 0.12); m.zumbido(K.Papilas + 2.4, 3.3, 0.035, 160);                         // lupa
for (let i = 0; i < 5; i++) m.tic(K.Todos + 0.3 + i * 0.12, 0.1, 2000 + i * 200);
for (let i = 0; i < 5; i++) { const t = K.Todos + 2.9 + i * 0.6; m.nota(t, [72, 74, 76, 79, 81][i], 0.07, 0.6); m.gota(t + 0.05, 0.1, 700 + i * 120); }
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Hanig + 0.25, 0.35, 80);
for (let i = 0; i < 3; i++) { m.gota(K.Hanig + [3.2, 4.1, 5.0][i] + 0.1, 0.18, 900); m.nota(K.Hanig + [3.2, 4.1, 5.0][i] + 0.35, 76, 0.03, 0.3); }
m.golpe(K.Boring + 0.25, 0.35, 80);
m.whoosh(K.Boring + 2.9, 0.9, 0.08); m.sube(K.Boring + 4.4, 1.6, 55, 74, 0.07);                           // la gráfica se estira
m.whoosh(K.Libros, 0.5, 0.18); m.golpe(K.Libros + 0.3, 0.25, 110);                                        // se abre el libro
for (let i = 0; i < 4; i++) m.tic(K.Libros + 0.7 + i * 0.25, 0.14, 1500);                                 // se trazan fronteras
for (let i = 0; i < 4; i++) m.golpe(K.Libros + 2.6 + i * 0.35, 0.12, 160);                                // banderas
m.whoosh(K.Umami, 0.5, 0.12); m.metal(K.Umami + 1.4, 0.1, 260);                                          // ¿umami? ✗
m.golpe(K.Umami + 2.1, 0.25, 90); for (let i = 0; i < 3; i++) m.burbuja(K.Umami + 2.6 + i * 0.3, 0.06, 380);
m.nota(K.Umami + 3.0, 69, 0.06, 1.0); m.nota(K.Umami + 3.0, 76, 0.05, 1.0);
for (let i = 0; i < 4; i++) m.sube(K.Diferencias + 0.3 + i * 0.25, 1.1, 60, 67, 0.025);
m.tic(K.Diferencias + 2.0, 0.15, 2400); m.tic(K.Diferencias + 2.15, 0.15, 2600);
m.whoosh(K.Cierre + 0.2, 1.1, 0.12);                                                                     // se borran las fronteras
m.sube(K.Cierre + 1.4, 1.2, 64, 76, 0.05);
for (let i = 0; i < 5; i++) m.nota(K.Cierre + 1.5 + i * 0.15, [72, 74, 76, 79, 81][i], 0.05, 0.8);       // toda la lengua se enciende
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
