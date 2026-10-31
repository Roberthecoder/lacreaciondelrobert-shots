// gen-audio.mjs — cama grave + efectos del Shot Químico #25 (calentador de manos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Calentador base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 25);
const K = m.K;
const G = K.Gancho, Re = K.Relleno, Em = K.Empaque, Ox = K.Oxido, Po = K.Polvo, Ay = K.Ayudantes, Pr = K.Pregunta, Pa = K.Patente, Cu = K.Cuidado, Co = K.Consejo, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.cruje(G + 0.05, 0.7);                                                               // se rasga el sobre
m.whoosh(G + 0.35, 0.8, 0.12);                                                        // sale la bolsita
for (let i = 0; i < 6; i++) m.tic(G + 1.2 + i * 0.2, 0.08, 1100);                     // la agitan
m.sube(G + 1.4, 1.6, 52, 60, 0.04);                                                   // se calienta
m.burbuja(Re + 0.3, 0.15, 400);                                                                // se abre la lupa
for (let i = 0; i < 5; i++) m.nota(Re + 2.6 + i * 0.75, [57, 60, 64, 67, 69][i], 0.06, 0.5); // cada ingrediente en la barra
m.golpe(Em + 0.2, 0.3, 90);                                                           // candado
m.whoosh(Em + 1.6, 0.6, 0.14);                                                        // se abre el sobre
for (let i = 0; i < 7; i++) m.burbuja(Em + 2.0 + i * 0.18, 0.06, 500 + i * 40);       // entra el oxígeno
for (let i = 0; i < 10; i++) m.cruje(Ox + 1.2 + i * 0.3, 0.15);                       // chisporroteo del óxido
m.metal(Ox + 1.6, 0.1, 600);                                                          // la reja
for (let i = 0; i < 8; i++) m.tic(Po + 0.3 + i * 0.08, 0.06, 2600);                   // cae la sal
for (let i = 0; i < 4; i++) m.tic(Po + 0.5 + i * 1.2, 0.1, 900);                      // reloj lento
for (let i = 0; i < 14; i++) m.tic(Po + 1.0 + i * 0.12, 0.05, 1800);                  // reloj rápido
m.gota(Ay + 0.2, 0.2, 900); m.burbuja(Ay + 1.0, 0.15, 400); for (let i = 0; i < 4; i++) m.gota(Ay + 2.6 + i * 0.25, 0.12, 1100);
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Pa + 0.65, 0.35, 80);                                                         // tarjeta
m.sube(Pa + 2.4, 0.8, 57, 64, 0.04); m.pad(Pa + 3.2, Pa + 6.0, 0.02, [64], 0.2);      // la curva sube y se queda
m.golpe(Cu + 0.2, 0.35, 80);
m.pad(Cu + 3.0, Cu + 6.5, 0.03, [40, 47], 0.5);                                       // daño profundo (grave, tapado)
m.metal(Co + 0.3, 0.1, 500); m.metal(Co + 1.2, 0.1, 500); m.nota(Co + 2.2, 72, 0.08, 0.6);
m.cruje(Ci + 2.4, 0.3); m.nota(Ci + 2.5, 64, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
