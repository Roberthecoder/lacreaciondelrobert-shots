// gen-audio.mjs — cama grave + efectos del Shot Científico #51 (estrellitas al pararte rápido). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pararte Rapido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 151);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(K.Gancho + 0.15, 0.5, 0.2); m.golpe(K.Gancho + 0.6, 0.3, 80);                                   // se para de golpe
for (let i = 0; i < 9; i++) m.nota(K.Gancho + 0.7 + i * 0.06, [84, 88, 91, 86, 89, 93, 84, 91, 96][i], 0.04, 0.5); // estrellitas
m.zumbido(K.Gancho + 0.9, 3.4, 0.04, 140);                                                               // vista nublada
for (let i = 0; i < 4; i++) m.gota(K.Gancho + 2.7 + i * 0.4, 0.14, 700 - i * 80);                        // la sangre baja
m.whoosh(K.Gravedad, 0.6, 0.12);
for (let i = 0; i < 3; i++) m.sube(K.Gravedad + 1.2 + i * 0.35, 0.6, 64 - i * 2, 52 - i * 2, 0.05);      // flechas de gravedad
for (let i = 0; i < 6; i++) m.gota(K.Gravedad + 2.4 + i * 0.45, 0.1, 600 - i * 40);                      // se acumula
m.golpe(K.Cantidad + 0.2, 0.25, 90);
for (let i = 0; i < 6; i++) m.burbuja(K.Cantidad + 0.4 + i * 0.28, 0.12, 300 + i * 30);                  // se llena la jarra
m.nota(K.Cantidad + 0.7, 79, 0.06, 0.6); m.nota(K.Cantidad + 0.9, 83, 0.06, 0.8);
m.sube(K.Presion + 0.4, 1.6, 62, 55, 0.05);                                                              // menos sangre arriba
m.golpe(K.Presion + 1.9, 0.25, 90); m.sube(K.Presion + 2.5, 1.0, 64, 48, 0.07);                          // la aguja baja
m.whoosh(K.Ojos, 0.6, 0.12);
m.zumbido(K.Ojos + 1.9, 3.0, 0.05, 120);                                                                 // vista nublada
for (let i = 0; i < 8; i++) m.nota(K.Ojos + 3.0 + i * 0.12, 86 + (i % 3) * 3, 0.03, 0.4, 0.5);          // puntitos
m.sube(K.Ojos + 4.0, 1.0, 55, 50, 0.05);                                                                 // mareo
m.whoosh(K.Corrige, 0.6, 0.12);
m.metal(K.Corrige + 1.5, 0.12, 600); for (let i = 0; i < 3; i++) m.tic(K.Corrige + 1.8 + i * 0.5, 0.15, 2200); // el sensor detecta
for (let t = K.Corrige + 3.9; t < K.Pregunta; t += t < K.Corrige + 4.0 ? 1.14 : 0.63) m.latido(t, 0.24);    // corazón más rápido
m.motor(K.Corrige + 5.6, 1.1, 0.05);                                                                     // vasos que se aprietan
m.sube(K.Corrige + 6.5, 0.9, 50, 62, 0.06);                                                              // la presión regresa
m.sube(K.Pregunta + 0.1, 1.4, 52, 64, 0.05);
m.golpe(K.Factores + 0.5, 0.25, 90); m.golpe(K.Factores + 1.7, 0.25, 100); m.golpe(K.Factores + 2.9, 0.25, 110); // tres tarjetas
m.zumbido(K.Factores + 4.0, 2.4, 0.04, 100);                                                             // le cuesta más
m.sube(K.Nombre + 0.6, 1.2, 60, 45, 0.07);                                                               // baja de más
m.golpe(K.Nombre + 2.4, 0.3, 80); m.golpe(K.Nombre + 2.7, 0.3, 70);
m.whoosh(K.Medico + 0.3, 0.5, 0.12); m.golpe(K.Medico + 1.4, 0.25, 70);
m.nota(K.Medico + 2.2, 76, 0.07, 0.6); m.nota(K.Medico + 2.35, 81, 0.07, 0.9);                          // cruz del médico
m.whoosh(K.Consejo + 1.3, 0.9, 0.1);                                                                     // se sienta
for (let i = 0; i < 8; i++) m.tic(K.Consejo + 2.0 + i * 0.22, 0.12, 1900);                               // ~20 s
m.sube(K.Consejo + 3.8, 1.6, 52, 60, 0.05);                                                              // se para despacio
for (let i = 0; i < 7; i++) m.nota(K.Cierre + 0.1 + i * 0.07, [84, 88, 91, 86, 89, 93, 96][i], 0.03, 0.4);
m.sube(K.Cierre + 0.6, 1.7, 64, 52, 0.05); m.tic(K.Cierre + 2.3, 0.2, 1500);                             // el elevador baja
m.sube(K.Cierre + 2.8, 1.4, 52, 64, 0.05); m.nota(K.Cierre + 4.2, 79, 0.06, 0.6);                       // y sube
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
