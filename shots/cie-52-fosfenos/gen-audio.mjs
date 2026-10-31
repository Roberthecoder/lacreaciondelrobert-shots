// gen-audio.mjs — cama grave + efectos del Shot Científico #52 (fosfenos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fosfenos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.zumbido(K.Gancho, 2.4, 0.04, 140);                                                                     // tallarse los ojos
for (let i = 0; i < 8; i++) m.nota(K.Gancho + 0.4 + i * 0.16, [76, 79, 81, 84, 79, 86, 81, 88][i], 0.04, 0.5);   // aparecen las luces
m.golpe(K.Gancho + 4.45, 0.25, 90);                                                                      // LAS FABRICA TU OJO
m.metal(K.Nombre + 0.25, 0.14, 660); m.nota(K.Nombre + 2.3, 79, 0.05, 0.6);                             // chips
m.whoosh(K.Retina - 0.8, 0.9, 0.16);                                                                     // zoom al ojo
for (let i = 0; i < 6; i++) m.tic(K.Retina + 1.2 + i * 0.4, 0.12, 2200);                                 // pulsos eléctricos
m.nota(K.Retina + 1.0, 72, 0.05, 0.8);
m.sube(K.Presion - 0.4, 0.5, 64, 52, 0.04);                                                              // se apaga la luz
m.golpe(K.Presion + 1.25, 0.25, 70);                                                                     // el dedo aprieta
for (let i = 0; i < 6; i++) m.tic(K.Presion + 1.3 + i * 0.4, 0.12, 2400);
m.zumbido(K.Presion + 1.6, 3.5, 0.03, 220);                                                              // lupa: células que se encienden
for (let i = 0; i < 4; i++) m.tic(K.Cerebro + 0.4 + i * 0.3, 0.12, 2000);                                // la señal llega
m.sube(K.Cerebro + 1.4, 1.0, 60, 72, 0.05);                                                              // se enciende el cerebro
for (let i = 0; i < 6; i++) m.nota(K.Cerebro + 2.2 + i * 0.15, [79, 81, 84, 86, 88, 91][i], 0.04, 0.5);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Golpe, 0.55, 0.14); m.golpe(K.Golpe + 0.55, 0.45, 75);                                        // ¡PUM!
for (let i = 0; i < 6; i++) m.nota(K.Golpe + 0.7 + i * 0.12, [88, 91, 86, 93, 88, 95][i], 0.035, 0.35);  // estrellitas
m.golpe(K.Astronautas + 0.25, 0.3, 80);                                                                  // tarjeta
for (let i = 0; i < 8; i++) m.whoosh(K.Astronautas + 2.0 + i * 0.6, 0.3, 0.07);                          // partículas
for (let i = 0; i < 6; i++) m.nota(K.Astronautas + 2.5 + i * 0.7, 93, 0.04, 0.3);                        // destellos
m.golpe(K.Ojo + 0.35, 0.3, 65); m.metal(K.Ojo + 1.2, 0.16, 400);                                        // alerta y tache
for (let i = 0; i < 5; i++) m.nota(K.Destellos + 0.6 + i * 0.5, 91, 0.04, 0.25);                         // destellos de alarma
m.burbuja(K.Destellos + 1.9, 0.08, 300); m.burbuja(K.Destellos + 2.1, 0.08, 260);                        // manchas
m.whoosh(K.Destellos + 3.6, 0.7, 0.1); m.tic(K.Destellos + 4.2, 0.2, 1500);                              // carta de la vista
m.sube(K.Cierre + 0.8, 0.9, 64, 76, 0.04);
for (let i = 0; i < 6; i++) m.nota(K.Cierre + 0.3 + i * 0.18, [76, 79, 81, 84, 86, 88][i], 0.04, 0.5);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
