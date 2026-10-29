// gen-audio.mjs — cama grave + efectos del Shot Científico #41 (el dolor de cabeza por comer helado). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cerebro Congelado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.whoosh(K.Gancho, 0.45, 0.14); m.cruje(K.Gancho + 0.45, 0.35);                                    // el cono llega: ¡ñam!
m.golpe(K.Gancho + 0.85, 0.35, 120); m.zumbido(K.Gancho + 0.85, 1.6, 0.05, 260);                    // rayo en la frente
m.metal(K.Gancho + 2.5, 0.12, 1400);                                                                 // cerebro con hielo
m.whoosh(K.Gancho + 3.4, 0.3, 0.12); m.whoosh(K.Gancho + 3.7, 0.3, 0.12);                          // se tacha
for (let i = 0; i < 4; i++) m.nota(K.Gancho + 4.6 + i * 0.12, [88, 91, 86, 93][i], 0.04, 0.4);       // frío en el paladar
m.golpe(K.Gancho + 6.1, 0.25, 110);                                                                  // dolor en la frente
m.metal(K.Paladar + 1.0, 0.1, 1600); m.sube(K.Paladar + 1.5, 1.4, 81, 88, 0.04);                     // el bocado toca el paladar
m.whoosh(K.Paladar + 3.7, 0.5, 0.1);                                                                 // lupa
m.sube(K.Paladar + 4.0, 0.5, 57, 52, 0.05); m.sube(K.Paladar + 4.9, 0.6, 52, 62, 0.05);              // vasos: se cierran y se abren
for (let i = 0; i < 6; i++) m.tic(K.Nervio + 0.1 + i * 0.2, 0.12, 1500 + i * 200);                  // el nervio se dibuja
m.zumbido(K.Nervio + 1.0, 3.2, 0.04, 330);                                                           // señales por el nervio
m.nota(K.Nervio + 2.3, 76, 0.06, 0.8);
m.whoosh(K.Frente + 0.3, 0.9, 0.14); m.golpe(K.Frente + 1.2, 0.3, 120);                              // del paladar a la frente
m.nota(K.Frente + 2.6, 72, 0.05, 0.6);
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                                 // tarjeta 2012
for (let i = 0; i < 5; i++) m.burbuja(K.Estudio + 2.6 + i * 0.35, 0.1, 420 + i * 40);               // sorbos de agua helada
m.metal(K.Estudio + 3.0, 0.1, 1800);                                                                 // hielos
m.whoosh(K.Resultado + 0.5, 0.5, 0.1);
for (let i = 0; i < 6; i++) m.latido(K.Resultado + 1.4 + i * 0.75, 0.16 + 0.05 * Math.sin(i));     // flujo en la arteria
m.sube(K.Resultado + 1.4, 1.4, 50, 57, 0.06); m.golpe(K.Resultado + 2.6, 0.3, 120);                  // se ensancha + dolor
m.sube(K.Resultado + 4.6, 1.6, 57, 50, 0.05);                                                        // se cierra
m.sube(K.Pregunta + 0.1, 1.2, 52, 64, 0.05);
m.nota(K.Lengua + 0.2, 72, 0.05, 0.6);
m.whoosh(K.Lengua + 1.3, 0.8, 0.08); m.sube(K.Lengua + 2.2, 1.0, 64, 69, 0.04);                     // lengua al paladar, se calienta
m.golpe(K.Lengua + 4.0, 0.25, 90); m.whoosh(K.Lengua + 4.2, 1.2, 0.05);                              // taza tibia
for (let i = 0; i < 12; i++) m.tic(K.Rapido + 0.2 + i * 0.2, 0.12, 2400);                           // reloj
m.nota(K.Rapido + 2.6, 79, 0.06, 0.8);
m.golpe(K.Despacio + 0.25, 0.35, 80);                                                                // tarjeta 2002
m.zumbido(K.Despacio + 2.3, 0.6, 0.05, 240); m.nota(K.Despacio + 2.8, 76, 0.06, 0.7); m.nota(K.Despacio + 3.0, 81, 0.05, 0.7);
m.metal(K.Cierre + 0.1, 0.1, 1400);
m.whoosh(K.Cierre + 2.2, 0.8, 0.1); m.nota(K.Cierre + 3.0, 74, 0.05, 0.6); m.nota(K.Cierre + 3.3, 78, 0.05, 0.6);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
