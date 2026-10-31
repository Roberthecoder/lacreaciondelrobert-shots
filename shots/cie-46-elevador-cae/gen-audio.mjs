// gen-audio.mjs — cama grave + efectos del Shot Científico #46 (saltar en un elevador que cae). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Elevador Cae base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 146);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.whoosh(K.Gancho, 1.4, 0.16); m.motor(K.Gancho, 4.6, 0.05);                                     // la cabina va cayendo
m.whoosh(K.Gancho + 1.3, 0.5, 0.12);                                                            // el salto
m.tic(K.Gancho + 0.9, 0.2, 1500);                                                               // «saltar te salva»
m.golpe(K.Gancho + 1.95, 0.4, 70);                                                              // sello ¿MITO?
for (let i = 0; i < 4; i++) m.tic(K.Mito + 0.2 + i * 0.12, 0.12, 1100);                          // proyector de cine
m.zumbido(K.Mito + 0.5, 3.8, 0.03, 140);                                                        // flotando
m.whoosh(K.Velocidad + 0.5, 0.7, 0.12); m.whoosh(K.Velocidad + 1.4, 0.7, 0.12);                 // dos flechas iguales
m.nota(K.Velocidad + 2.2, 69, 0.07, 0.5); m.nota(K.Velocidad + 2.2, 76, 0.05, 0.5);              // «=»
m.sube(K.Salto + 0.3, 0.8, 52, 64, 0.05);                                                       // la barra crece
m.tic(K.Salto + 1.8, 0.15, 1800); m.burbuja(K.Salto + 1.8, 0.14, 700);                                     // − salto
m.motor(K.Ejemplo + 0.6, 3.2, 0.06); m.sube(K.Ejemplo + 0.6, 3.2, 45, 69, 0.05);                 // cae el elevador, sube la aguja
m.golpe(K.Ejemplo + 3.5, 0.3, 90);                                                              // > 80 km/h
m.sube(K.Ejemplo + 5.3, 0.6, 69, 66, 0.05);                                                     // − 10 km/h
m.tic(K.Ejemplo + 3.9, 0.12, 2200);                                                             // cálculo simplificado
for (let i = 0; i < 3; i++) m.nota(K.Tiempo + 1.0 + i * 0.5, [72, 76, 79][i], 0.05, 0.4);       // ? ? ?
for (let i = 0; i < 9; i++) m.tic(K.Tiempo + 2.4 + i * 0.33, 0.14, 2600);                        // reloj
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Frenos + 0.25, 0.35, 80);                                                             // tarjeta 1854
m.whoosh(K.Frenos + 4.4, 0.5, 0.12);                                                            // el cable se suelta
m.metal(K.Frenos + 5.0, 0.3, 700); m.golpe(K.Frenos + 5.0, 0.25, 110);                           // ¡CLAC! se traba
m.zumbido(K.Frenos + 5.9, 1.2, 0.03, 300);                                                      // lupa
for (let i = 0; i < 4; i++) m.nota(K.Cables + 0.5 + i * 0.35, [64, 67, 69, 72][i], 0.06, 0.4);  // se encienden los cables
m.tic(K.Consejo + 2.6, 0.25, 1400);                                                             // aprieta el botón
for (let i = 0; i < 6; i++) m.metal(K.Consejo + 2.8 + i * 0.22, 0.08, 1300);                     // la alarma
m.nota(K.Cierre + 0.5, 76, 0.05, 0.6); m.nota(K.Cierre + 0.7, 81, 0.05, 0.8);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
