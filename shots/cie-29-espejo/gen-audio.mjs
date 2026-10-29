// gen-audio.mjs — cama grave + efectos del Shot Científico #29 (el espejo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Espejo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 129);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.metal(K.Gancho + 0.05, 0.1, 1400);                                                                   // brillo del espejo
m.whoosh(K.Gancho + 0.2, 0.6, 0.12);                                                                   // flecha izq ⇄ der
m.golpe(K.Gancho + 1.7, 0.3, 90);                                                                      // se tacha
m.whoosh(K.Gancho + 2.4, 0.7, 0.14); m.nota(K.Gancho + 2.7, 76, 0.06, 0.5);                            // adelante ⇄ atrás
m.whoosh(K.Mano + 0.4, 0.5, 0.14); m.nota(K.Mano + 0.9, 79, 0.06, 0.4); m.nota(K.Mano + 0.9, 74, 0.05, 0.4);   // las dos manos suben juntas
for (let i = 0; i < 5; i++) m.tic(K.Mano + 2.6 + i * 0.14, 0.12, 2200 + i * 120);                     // línea punteada
m.nota(K.Mano + 3.0, 81, 0.06, 0.5);
m.sube(K.Arriba + 0.4, 0.5, 64, 76, 0.05); m.sube(K.Arriba + 1.4, 0.5, 64, 52, 0.05);                 // flechas arriba / abajo
m.nota(K.Arriba + 2.6, 72, 0.07, 0.3); m.nota(K.Arriba + 2.8, 79, 0.07, 0.5);                          // palomita
m.whoosh(K.Frente - 0.2, 0.7, 0.12); m.golpe(K.Frente + 0.4, 0.25, 80);                                // vista desde arriba
m.sube(K.Frente + 1.2, 0.6, 60, 72, 0.05); m.sube(K.Frente + 3.2, 0.6, 72, 60, 0.05);                  // narices opuestas
for (let i = 0; i < 5; i++) m.tic(K.Frente + 4.6 + i * 0.16, 0.12, 2400);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Girar + 2.0, 1.6, 0.18); m.nota(K.Girar + 3.6, 69, 0.06, 0.5);                              // se da la vuelta
m.golpe(K.Girar + 3.9, 0.25, 85);
m.whoosh(K.Texto + 1.5, 1.0, 0.14); m.nota(K.Texto + 2.6, 74, 0.06, 0.4); m.nota(K.Texto + 2.9, 70, 0.06, 0.4);   // la hoja gira
for (let i = 0; i < 8; i++) m.nota(K.Ambulancia + 0.2 + i * 0.35, i % 2 ? 76 : 81, 0.035, 0.32);      // sirena
m.motor(K.Ambulancia + 0.1, 2.5, 0.06);
m.metal(K.Ambulancia + 3.0, 0.12, 900); m.nota(K.Ambulancia + 3.6, 79, 0.06, 0.5);                    // retrovisor
m.golpe(K.Dos + 0.2, 0.3, 80); m.metal(K.Dos + 0.5, 0.1, 1200);                                        // dos espejos
m.whoosh(K.Dos + 2.2, 0.6, 0.14); m.nota(K.Dos + 2.8, 74, 0.06, 0.4);                                  // levantan la mano
for (let i = 0; i < 5; i++) m.tic(K.Dos + 3.4 + i * 0.14, 0.12, 2200);
for (let i = 0; i < 3; i++) m.tic(K.Dos + 5.0 + i * 1.4, 0.2, 3200);                                   // guiños
m.whoosh(K.Cierre + 0.3, 0.5, 0.12); m.burbuja(K.Cierre + 1.2, 0.12, 500); m.burbuja(K.Cierre + 1.4, 0.12, 700);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
