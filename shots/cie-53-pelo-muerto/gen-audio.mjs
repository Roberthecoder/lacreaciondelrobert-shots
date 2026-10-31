// gen-audio.mjs — cama grave + efectos del Shot Científico #53 (el pelo y las uñas no crecen después de morir). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pelo Muerto base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 4; i++) m.nota(K.Gancho + 0.1 + i * 0.08, 72 + i * 2, 0.05, 0.3);                    // suben las flechas «¿crecen?»
m.whoosh(K.Gancho + 1.4, 0.5, 0.16); m.golpe(K.Gancho + 1.9, 0.25, 80);                                   // se tacha
m.nota(K.Gancho + 2.9, 76, 0.06, 0.5);                                                                    // «es la piel»
m.whoosh(K.Mito - 0.2, 0.7, 0.14);                                                                        // entra el libro
for (let i = 0; i < 3; i++) m.nota(K.Mito + 0.6 + i * 0.3, [69, 66, 63][i], 0.05, 0.5);                  // uñas de cuento
m.golpe(K.Mito + 2.4, 0.45, 70); m.tic(K.Mito + 2.45, 0.2, 1400);                                         // sello MITO
for (let i = 0; i < 8; i++) m.burbuja(K.Crecer + 0.9 + i * 0.5, 0.1, 500 + (i % 3) * 120);               // células que se dividen
m.sube(K.Crecer + 2.4, 0.8, 57, 69, 0.05);                                                                // batería llena
for (let i = 0; i < 3; i++) { m.tic(K.Sin + 0.2 + i * 0.9, 0.2, 1600); m.golpe(K.Sin + 0.6 + i * 0.9, 0.18, 110); } // sin sangre, O2, azúcar
m.sube(K.Sin + 0.3, 2.7, 64, 45, 0.06);                                                                   // se vacía la batería
for (let i = 0; i < 6; i++) m.gota(K.Piel + 0.3 + i * 0.4, 0.15, 900 + i * 80);                           // la piel pierde agua
m.whoosh(K.Piel + 0.8, 1.2, 0.08);
m.nota(K.Asoma + 0.3, 71, 0.05, 0.5); m.nota(K.Asoma + 0.9, 76, 0.06, 0.6);                               // corchetes
m.metal(K.Asoma + 1.0, 0.1, 620);                                                                         // lupa
m.golpe(K.Asoma + 4.2, 0.25, 90);                                                                         // «creció: 0 mm»
m.whoosh(K.Barba - 0.2, 0.6, 0.12); m.metal(K.Barba + 0.5, 0.1, 700);
m.sube(K.Barba + 1.0, 2.0, 50, 57, 0.04); m.nota(K.Barba + 2.6, 79, 0.06, 0.6);                           // asoma la barba
m.sube(K.Pregunta + 0.1, 1.4, 52, 64, 0.05);
m.golpe(K.Unas + 0.25, 0.35, 80);                                                                         // estudio 2010
for (let i = 0; i < 12; i++) m.tic(K.Unas + 2.2 + i * 0.2, 0.12, 2200);                                  // pasan los días
m.nota(K.Unas + 4.6, 76, 0.06, 0.7);
for (let i = 0; i < 12; i++) m.tic(K.Pelo + 0.5 + i * 0.19, 0.12, 2000);                                 // pasan los días
m.golpe(K.Pelo + 2.6, 0.3, 80);                                                                           // revisión 2016
for (let i = 0; i < 9; i++) m.latido(K.Vida + 0.2 + i * 0.84, 0.18);                                     // el corazón manda sangre
m.sube(K.Vida + 3.8, 1.2, 60, 48, 0.05);                                                                  // sin eso se detiene
for (let i = 0; i < 4; i++) m.nota(K.Cierre + 0.8 + i * 0.12, [76, 72, 69, 64][i], 0.05, 0.4);           // la piel se retira
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
