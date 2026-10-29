// gen-audio.mjs — cama grave + efectos del Shot Científico #31 (ciclo nasal). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ciclo Nasal base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 131);
const K = m.K;
const resp = (t, g = 0.08) => m.whoosh(t, 1.1, g);                                                       // una respiración
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
resp(0.1, 0.1); resp(2.8, 0.1); resp(5.5, 0.1);                                                           // aire que entra y se intercambia
m.nota(3.1, 64, 0.05, 0.5); m.nota(5.9, 67, 0.05, 0.5);                                                   // cambia el lado grueso
m.golpe(K.Prueba + 0.2, 0.2, 110);                                                                        // tápate un lado
m.tic(K.Prueba + 0.85, 0.2, 1200); resp(K.Prueba + 0.9, 0.12); m.sube(K.Prueba + 0.9, 0.8, 60, 72, 0.05); // dedo · lado 1 sube
m.tic(K.Prueba + 3.25, 0.2, 1200); resp(K.Prueba + 3.3, 0.06); m.sube(K.Prueba + 3.3, 0.8, 60, 66, 0.04); // dedo · lado 2 sube menos
m.nota(K.Prueba + 4.0, 72, 0.05, 0.5);                                                                    // pasa más aire
m.whoosh(K.Cornetes + 0.1, 0.7, 0.16); m.zumbido(K.Cornetes + 0.2, 1.2, 0.03, 160);                       // se abre la lupa
for (let i = 0; i < 3; i++) m.latido(K.Cornetes + 1.6 + i * 1.4, 0.16);                                   // tejido que se llena de sangre
m.golpe(K.Turno + 0.2, 0.2, 90);                                                                          // sistema nervioso
m.sube(K.Turno + 0.9, 1.7, 52, 59, 0.05); m.latido(K.Turno + 1.6, 0.18);                                  // se hincha / se deshincha
m.sube(K.Turno + 3.6, 1.4, 59, 52, 0.05); m.latido(K.Turno + 4.2, 0.18);                                  // y luego cambian
for (let i = 0; i < 10; i++) m.tic(K.Turno + 0.3 + i * 0.5, 0.06, 2200);                                  // tic-tac del reloj
m.nota(K.Ciclo + 0.2, 69, 0.07, 0.8); m.golpe(K.Ciclo + 0.2, 0.25, 120);                                  // ciclo nasal
m.whoosh(K.Ciclo + 1.6, 0.4, 0.1); for (let i = 0; i < 6; i++) m.tic(K.Ciclo + 2.0 + i * 0.5, 0.08, 2000); // el reloj grande
m.nota(K.Ciclo + 2.4, 72, 0.05, 0.6);                                                                     // de media hora a varias horas
m.sube(K.Pregunta + 0.05, 0.6, 60, 67, 0.05); m.golpe(K.Pregunta + 0.1, 0.25, 90);                        // ?
resp(K.Total + 0.3, 0.08); m.whoosh(K.Total + 1.0, 0.5, 0.1);                                             // la barra aparece
resp(K.Total + 3.2, 0.08); m.nota(K.Total + 2.6, 69, 0.06, 0.8);                                          // total: casi igual
m.nota(K.Para + 0.9, 64, 0.05, 0.6);                                                                      // se cree
m.nota(K.Para + 1.8, 57, 0.04, 0.8);                                                                      // descansa (zzz)
for (let i = 0; i < 4; i++) m.gota(K.Para + 3.0 + i * 0.3, 0.12, 900 + i * 80);                           // se humedece
m.cruje(K.Para + 4.0, 0.15); m.whoosh(K.Para + 4.1, 0.6, 0.06);                                           // se limpia (escoba)
m.golpe(K.Acostado + 0.1, 0.18, 70); m.nota(K.Acostado + 0.4, 60, 0.05, 0.6);                             // a la cama
resp(K.Acostado + 1.0, 0.06); m.burbuja(K.Acostado + 2.2, 0.12, 300);                                     // se tapa el de abajo
m.sube(K.Gripa + 0.3, 0.6, 57, 52, 0.05); m.burbuja(K.Gripa + 0.8, 0.12, 280);                            // gripa · tapado
m.whoosh(K.Gripa + 2.4, 0.4, 0.1); m.burbuja(K.Gripa + 2.6, 0.12, 320);                                   // salta de lado
m.whoosh(K.Gripa + 4.5, 0.4, 0.1); m.burbuja(K.Gripa + 4.7, 0.12, 320);                                   // y regresa
m.metal(K.Cierre + 0.6, 0.08, 1300); m.metal(K.Cierre + 1.0, 0.08, 1500);                                 // dos relojes
resp(K.Cierre + 0.3, 0.08); m.nota(K.Cierre + 1.8, 76, 0.06, 0.6);                                        // como dos narices
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
