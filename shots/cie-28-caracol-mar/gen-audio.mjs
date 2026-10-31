// gen-audio.mjs — cama grave + efectos del Shot Científico #28 (el mar del caracol). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Caracol Mar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 128);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.whoosh(K.Gancho + 0.05, 2.6, 0.08);                                                                    // las olas que salen del caracol
m.golpe(K.Gancho + 0.1, 0.25, 90);
m.golpe(K.Gancho + 2.1, 0.35, 70); m.tic(K.Gancho + 2.1, 0.2, 900);                                    // se tachan
for (let i = 0; i < 3; i++) m.burbuja(K.Gancho + 2.9 + i * 0.3, 0.14, 500 + i * 120);                 // refri, voces, coche
m.metal(K.Gancho + 4.3, 0.1, 620); m.zumbido(K.Gancho + 4.3, 1.1, 0.04, 220);                          // rebota adentro
m.motor(K.Ruido + 0.2, 6.2, 0.03);                                                                       // ruido de fondo del cuarto
for (let i = 0; i < 4; i++) m.nota(K.Ruido + 3.2 + i * 0.16, [64, 67, 62, 66][i], 0.035, 0.18);        // voces
m.zumbido(K.Ruido + 4.1, 2.2, 0.05, 120);                                                                // refri
m.whoosh(K.Ruido + 4.7, 1.0, 0.12);                                                                      // viento
m.motor(K.Ruido + 5.4, 1.2, 0.08);                                                                       // coches
m.whoosh(K.Cavidad + 0.2, 0.9, 0.12);                                                                    // los sonidos entran
for (let i = 0; i < 6; i++) m.tic(K.Cavidad + 0.8 + i * 0.32, 0.1, 1200 + i * 180);                     // rebotan
m.sube(K.Cavidad + 2.8, 1.4, 57, 64, 0.06); m.zumbido(K.Cavidad + 3.0, 2.2, 0.05, 330);                 // se refuerza
m.sube(K.Mar + 0.3, 1.3, 52, 64, 0.05);                                                                  // sube el pico
m.whoosh(K.Mar + 1.4, 1.6, 0.13);                                                                        // shhh
m.whoosh(K.Mar + 3.0, 2.0, 0.1);                                                                         // olas
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
for (let k = Math.ceil((K.Mito) * 1.1 - 0.25); (k + 0.25) / 1.1 < K.Vaso; k++) {                        // latidos (mismo ritmo que el jsx)
  const t = (k + 0.25) / 1.1; m.latido(t - 0.04, t > K.Sangre + 3.6 ? 0.12 : 0.18); }
m.metal(K.Mito + 1.4, 0.08, 700);                                                                        // se abre la lupa
m.golpe(K.Mito + 3.4, 0.3, 75);                                                                          // no es lo principal
for (let i = 0; i < 3; i++) m.zumbido(K.Sangre + 0.2, 3.2, 0.025, 140 + i * 90);                        // ruido de lugares
m.golpe(K.Sangre + 3.4, 0.3, 60);                                                                        // cuarto de espuma
m.sube(K.Sangre + 4.0, 1.6, 64, 50, 0.05);                                                               // el medidor baja
m.metal(K.Vaso + 0.9, 0.18, 1400);                                                                       // el vaso
m.golpe(K.Vaso + 1.9, 0.2, 110);                                                                         // la mano
m.whoosh(K.Vaso + 3.0, 2.0, 0.08);                                                                       // tu propio mar
m.golpe(K.Tamano + 0.3, 0.3, 70); m.nota(K.Tamano + 1.5, 40, 0.1, 2.2);                                 // grave
m.golpe(K.Tamano + 3.7, 0.15, 140); m.nota(K.Tamano + 3.9, 84, 0.05, 1.2);                              // agudo
m.motor(K.Lugar + 0.2, 4.0, 0.06);                                                                       // tráfico
m.whoosh(K.Lugar + 3.0, 1.6, 0.18);                                                                      // mar bravo
m.whoosh(K.Lugar + 4.4, 1.0, 0.05);                                                                      // mar tranquilo
for (let i = 0; i < 3; i++) m.burbuja(K.Cierre + 0.3 + i * 0.3, 0.12, 500 + i * 120);
m.metal(K.Cierre + 1.8, 0.1, 620); m.zumbido(K.Cierre + 1.8, 1.4, 0.035, 220);                         // con eco
m.whoosh(K.Cierre + 3.6, 1.8, 0.08);                                                                     // suena bonito
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
