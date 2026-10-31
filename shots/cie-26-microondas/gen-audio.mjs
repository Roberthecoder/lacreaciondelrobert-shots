// gen-audio.mjs — cama grave + efectos del Shot Científico #26 (microondas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Microondas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 100);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.tic(K.Gancho + 0.05, 0.25, 2200); m.zumbido(K.Gancho + 0.1, 6.2, 0.045, 120);                  // se enciende el microondas
for (let i = 0; i < 3; i++) m.whoosh(K.Gancho + 0.6 + i * 0.15, 0.4, 0.07);                       // flechas adentro → afuera
m.golpe(K.Gancho + 2.6, 0.32, 75); m.golpe(K.Gancho + 2.8, 0.28, 70);                             // se tacha
for (let i = 0; i < 3; i++) m.whoosh(K.Gancho + 3.6 + i * 0.12, 0.4, 0.08);                       // por fuera, hacia adentro
m.nota(K.Gancho + 3.7, 72, 0.06, 0.6);
m.sube(K.Ondas + 0.2, 2.0, 55, 67, 0.04); m.zumbido(K.Ondas + 0.2, 4.2, 0.05, 150);               // la caja se llena de ondas
m.nota(K.Ondas + 2.7, 76, 0.06, 0.9); m.nota(K.Ondas + 2.75, 79, 0.05, 0.9);                       // prima de la luz
m.whoosh(K.Agua + 0.8, 0.6, 0.14); m.metal(K.Agua + 1.3, 0.1, 620);                              // abre la lupa
for (let i = 0; i < 14; i++) m.tic(K.Agua + 1.3 + i * 0.3, 0.1, 1500 + (i % 4) * 300);              // moléculas que se agitan
m.sube(K.Agua + 3, 2.5, 50, 62, 0.05);                                                           // brillo de calor
m.whoosh(K.Profundidad + 0.2, 0.7, 0.12); m.zumbido(K.Profundidad + 0.3, 2.6, 0.04, 160);         // ondas que entran
m.golpe(K.Profundidad + 2.0, 0.25, 80);                                                          // solo unos cm
for (let i = 0; i < 8; i++) m.nota(K.Centro + 0.6 + i * 0.6, 57 + i, 0.03, 0.5);                    // el calor avanza poco a poco
m.cruje(K.Centro + 1.2, 0.3);                                                                     // la estufa
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Frio + 0.2, 0.8, 0.12); m.golpe(K.Frio + 1.3, 0.3, 65);                                // la pieza crece
m.metal(K.Frio + 1.6, 0.12, 1400);                                                                // copo de frío
for (let i = 0; i < 12; i++) m.tic(K.Reposo + 0.3 + i * 0.5, 0.12, 2600);                          // reloj de reposo
m.sube(K.Reposo + 0.8, 5, 48, 57, 0.035);
m.nota(K.Plato - 1.6, 72, 0.06, 0.8);                                                             // ya llegó
m.zumbido(K.Plato + 0.2, 4.2, 0.04, 130);                                                         // plato que gira
m.burbuja(K.Plato + 1.0, 0.15, 500); m.burbuja(K.Plato + 1.6, 0.15, 350);
m.golpe(K.Wifi + 0.1, 0.35, 85); m.nota(K.Wifi + 0.15, 79, 0.06, 0.6);                             // ¡dato raro!
m.whoosh(K.Wifi + 1.6, 0.6, 0.1); m.whoosh(K.Wifi + 2.1, 0.6, 0.1);                                // dos ondas casi iguales
m.nota(K.Wifi + 2.8, 74, 0.05, 0.8); m.nota(K.Wifi + 2.8, 75, 0.04, 0.8);
m.tic(K.Cierre + 0.2, 0.3, 2400); m.tic(K.Cierre + 0.35, 0.3, 2400);                              // ¡ding!
m.metal(K.Cierre + 0.4, 0.14, 1320); m.whoosh(K.Cierre + 0.5, 0.8, 0.12);                          // se abre la puerta
for (let i = 0; i < 3; i++) m.whoosh(K.Cierre + 2.4 + i * 0.12, 0.4, 0.07);
m.nota(K.Cierre + 3.0, 69, 0.05, 0.8);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
