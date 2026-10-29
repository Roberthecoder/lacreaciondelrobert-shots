// gen-audio.mjs — cama grave + efectos del Shot Científico #25 (el Sol que ves es el de hace 8 minutos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Sol Ocho Minutos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 125);
const K = m.K;
const pop = (t, mm = 76, g = 0.06) => { m.burbuja(t, 0.12, 600); m.nota(t, mm, g, 0.4); };
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.zumbido(0, 4.6, 0.025, 110);                                                                           // el Sol que zumba
pop(0.25, 79); m.tic(0.8, 0.25, 2600); pop(0.8, 74);                                                     // «hace 8 min» · «ahora»
m.whoosh(K.Distancia - 0.3, 1.9, 0.16);                                                                  // la cámara se aleja
m.sube(K.Distancia + 1.4, 1.0, 55, 67, 0.05); m.golpe(K.Distancia + 2.2, 0.3, 90);                        // la regla · 150 millones
for (let k = 0; k < 4; k++) m.whoosh(K.Luz + 0.3 + k * 1.25, 0.7, 0.14);                                  // cada rayo de luz
m.sube(K.Luz + 0.6, 1.3, 60, 84, 0.05);                                                                  // cuenta hasta 300,000
m.golpe(K.Luz + 2.9, 0.3, 110); m.nota(K.Luz + 2.9, 81, 0.05, 0.6);                                      // nada viaja más rápido
for (let i = 0; i < 16; i++) m.tic(K.Cuenta + 0.6 + i * 0.2, 0.18, 2400);                                 // el cronómetro corre (time-lapse)
m.nota(K.Cuenta + 3.9, 72, 0.07, 0.8); m.nota(K.Cuenta + 3.9, 79, 0.05, 0.8);                             // ≈ 8 min 20 s
pop(K.Pasado + 0.3, 76); pop(K.Pasado + 0.9, 79);                                                        // el que ves
m.zumbido(K.Pasado + 2.4, 2.4, 0.03, 70); pop(K.Pasado + 2.5, 70);                                       // el de ahorita, borroso
m.golpe(K.Pregunta + 0.05, 0.35, 70); m.nota(K.Pregunta + 0.2, 69, 0.06, 1.2, 0.5);                      // ¿?
m.tic(K.Apaga + 0.5, 0.5, 1500); m.golpe(K.Apaga + 0.5, 0.35, 60);                                       // ¡clic! se apaga
m.zumbido(K.Apaga + 0.6, 4.7, 0.03, 160);                                                                // la última luz sigue viajando
for (let i = 0; i < 10; i++) m.tic(K.Apaga + 0.6 + i * 0.48, 0.14, 3000);
m.sube(K.Apaga + 5.3, 0.8, 62, 48, 0.06);                                                                // la Tierra se oscurece
for (let k = 0; k < 4; k++) m.whoosh(K.Luna + 0.3 + k * 1.3, 0.5, 0.1);                                   // luz de la Luna
m.golpe(K.Luna + 0.5, 0.25, 120); m.nota(K.Luna + 2.6, 76, 0.05, 0.6);
[0.8, 1.9, 3.0].forEach((t, i) => { m.nota(K.Estrellas + t, [84, 79, 72][i], 0.06, 0.9); m.tic(K.Estrellas + t, 0.12, 4000); }); // años · siglos · miles
m.sube(K.Sirio - 0.2, 0.7, 72, 88, 0.05); m.metal(K.Sirio + 0.3, 0.08, 1200);                           // aparece Sirio
m.golpe(K.Sirio + 2.4, 0.25, 100); m.nota(K.Sirio + 2.4, 81, 0.05, 0.8);                                 // ≈ 8.6 años
m.golpe(K.Ojo + 0.2, 0.35, 80); m.metal(K.Ojo + 1.0, 0.1, 700); m.metal(K.Ojo + 1.1, 0.08, 760);          // alerta
m.whoosh(K.Cierre, 1.2, 0.1); pop(K.Cierre + 0.3, 79); pop(K.Cierre + 0.8, 74); pop(K.Cierre + 1.3, 84);  // regreso al atardecer
m.nota(K.Cierre + 1.8, 67, 0.06, 1.2);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
