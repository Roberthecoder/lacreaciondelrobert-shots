// gen-audio.mjs — cama grave + efectos del Shot Científico #12 (tronar los dedos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tronar Dedos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 112);
const K = m.K;
const crac = (t, g = 0.6) => { m.cruje(t, g); m.golpe(t, 0.3, 120); };
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(K.Gancho + 0.05, 0.5, 0.12);                                                     // la otra mano agarra el dedo
m.sube(K.Gancho + 0.1, 0.45, 50, 57, 0.04);
crac(K.Gancho + 0.55, 0.7);                                                                // ¡CRAC!
m.golpe(K.Gancho + 1.6, 0.25, 70); m.tic(K.Gancho + 1.9, 0.2, 900);                         // hueso tachado
m.burbuja(K.Gancho + 2.6, 0.18, 420);                                                      // burbuja de gas
m.whoosh(K.Liquido + 0.2, 0.7, 0.14);                                                      // se abre la lupa
for (let i = 0; i < 4; i++) m.nota(K.Liquido + 1.0 + [0, 0.6, 1.6, 2.3][i], [69, 72, 76, 74][i], 0.05, 0.5);   // etiquetas
m.gota(K.Liquido + 2.6, 0.12, 700);                                                         // líquido sinovial
m.sube(K.Jalas + 1.0, 1.4, 52, 64, 0.05);                                                   // se separan
m.sube(K.Jalas + 2.0, 1.6, 62, 45, 0.06);                                                   // cae la presión
for (let i = 0; i < 4; i++) m.burbuja(K.Cavidad + 0.2 + i * 0.22, 0.06, 600 + i * 80);      // gas disuelto
crac(K.Cavidad + 1.2, 0.8); m.burbuja(K.Cavidad + 1.2, 0.2, 260);                           // nace el hueco
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                        // tarjeta 2015
m.zumbido(K.Estudio + 2.4, 3.6, 0.04, 140);                                                 // la resonancia
m.motor(K.Estudio + 3.2, 2.4, 0.05);                                                        // el cable jala
crac(K.Estudio + 5.7, 0.6);
for (let i = 0; i < 3; i++) m.tic(K.Video + 0.3 + i * 0.3, 0.12, 2200);                     // monitor
m.golpe(K.Video + 1.5, 0.3, 60); m.burbuja(K.Video + 1.5, 0.15, 300);                       // el hueco oscuro
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
for (let i = 0; i < 16; i++) m.tic(K.Espera + 0.6 + i * 0.24, 0.12, 2600);                  // reloj
m.sube(K.Espera + 0.8, 3.6, 64, 52, 0.035);                                                 // la burbuja se encoge
m.nota(K.Espera + 4.3, 76, 0.07, 0.8);                                                      // 20 min
m.golpe(K.Debate + 0.25, 0.35, 80);                                                         // tarjeta 2018
m.whoosh(K.Debate + 2.6, 0.7, 0.12);
m.cruje(K.Debate + 3.6, 0.5); m.burbuja(K.Debate + 3.6, 0.15, 500);                         // colapso parcial
m.nota(K.Debate + 4.6, 69, 0.05, 0.9); m.nota(K.Debate + 4.6, 70, 0.04, 0.9);               // se sigue discutiendo
for (let t = K.Unger + 1.2 + 0.25 / 1.6; t < K.Manos + 0.4; t += 1 / 1.6) m.cruje(t, 0.3);  // la izquierda truena y truena
for (let i = 0; i < 8; i++) m.tic(K.Unger + 2.6 + i * 0.4, 0.08, 1500);                     // hojas del calendario
m.nota(K.Manos + 0.9, 72, 0.07, 0.5); m.nota(K.Manos + 1.2, 76, 0.07, 0.6);                 // palomitas
m.metal(K.Manos + 2.5, 0.2, 880); m.nota(K.Manos + 2.6, 79, 0.06, 1);                       // trofeo
m.whoosh(K.Cierre, 0.5, 0.12);
crac(K.Cierre + 1.1, 0.7); m.burbuja(K.Cierre + 1.1, 0.2, 420);
m.nota(K.Cierre + 2.0, 72, 0.05, 0.8);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
