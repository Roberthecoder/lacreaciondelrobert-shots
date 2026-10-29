// gen-audio.mjs — cama grave + efectos del Shot Científico #11 (moscas volantes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moscas Volantes base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
[0.2, 1.6, 3.4].forEach((t) => m.whoosh(K.Gancho + t, 0.6, 0.1));                                     // cada mirada: las moscas se deslizan
m.golpe(K.Gancho + 0.1, 0.3, 90);
m.golpe(K.Gancho + 3.3, 0.3, 75); m.sube(K.Gancho + 3.0, 2.4, 64, 52, 0.05);                            // la cámara se aleja: es tu ojo
m.whoosh(K.Gel - 0.3, 0.8, 0.14); m.golpe(K.Gel + 0.2, 0.3, 80);                                        // aparece el ojo en corte
for (let i = 0; i < 6; i++) m.burbuja(K.Gel + 0.7 + i * 0.25, 0.1, 380 + i * 40);                         // se llena de gel
[0.8, 1.1, 1.4].forEach((t, i) => m.tic(K.Gel + t, 0.18, 2200 + i * 300));                               // rótulos
m.whoosh(K.Gel + 2.4, 0.6, 0.12); for (let i = 0; i < 4; i++) m.gota(K.Gel + 2.9 + i * 0.35, 0.12, 800 + i * 90); // lupa: agua
m.whoosh(K.Fibras - 0.4, 0.9, 0.12);                                                                     // zoom dentro del gel
for (let i = 0; i < 6; i++) m.nota(K.Fibras + 0.4 + i * 0.22, [69, 72, 76, 74, 72, 76][i], 0.04, 0.5);    // aparece la red de fibras
for (let i = 0; i < 9; i++) m.tic(K.Grumos + 0.3 + i * 0.5, 0.12, 1500 + i * 80);                         // contador de años
m.sube(K.Grumos + 1.6, 3.0, 64, 50, 0.05);                                                               // las fibras se juntan
m.burbuja(K.Grumos + 1.0, 0.1, 300); m.burbuja(K.Grumos + 1.4, 0.1, 340);
m.zumbido(K.Sombra + 0.2, 2.2, 0.04, 330);                                                               // entran los rayos de luz
m.golpe(K.Sombra + 2.0, 0.3, 70); m.golpe(K.Sombra + 2.4, 0.22, 65);                                      // sombras en la retina
m.nota(K.Sombra + 2.9, 76, 0.06, 0.8);                                                                   // lo que ves
m.whoosh(K.Escapan + 0.6, 0.6, 0.16); m.whoosh(K.Escapan + 1.05, 0.7, 0.08);                              // gira el ojo; grumos tarde
m.whoosh(K.Escapan + 2.6, 0.6, 0.16); m.whoosh(K.Escapan + 3.05, 0.7, 0.08);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Fondo + 0.1, 0.5, 0.12); m.whoosh(K.Fondo + 0.8, 0.5, 0.12);                                  // los dos paneles
m.golpe(K.Estudio + 0.25, 0.35, 80);
for (let i = 0; i < 10; i++) m.tic(K.Estudio + 3.8 + i * 0.12, 0.12, 1800 + i * 60);                       // los 100 ojitos
m.sube(K.Estudio + 4.6, 0.9, 60, 72, 0.05); m.nota(K.Estudio + 5.5, 79, 0.07, 0.8);
m.golpe(K.Aviso + 0.05, 0.4, 70);                                                                         // alerta
[1.5, 3.0, 4.2].forEach((t) => { m.metal(K.Aviso + t, 0.12, 640); });
m.golpe(K.Aviso + 5.3, 0.35, 80); m.nota(K.Aviso + 5.4, 72, 0.06, 0.6);
m.whoosh(K.Cierre - 0.3, 0.8, 0.12);
for (let i = 0; i < 4; i++) m.nota(K.Cierre + 0.4 + i * 0.3, [69, 72, 76, 81][i], 0.04, 0.6);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
