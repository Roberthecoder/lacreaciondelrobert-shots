// gen-audio.mjs — cama grave + efectos del Shot Científico #42 (huellas de gemelos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huellas Gemelos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 142);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.golpe(K.Gancho + 0.1, 0.3, 90); m.golpe(K.Gancho + 0.2, 0.25, 95);                                   // entran los gemelos
m.whoosh(K.Gancho + 0.3, 0.5, 0.12);                                                                   // levantan la mano
m.burbuja(K.Gancho + 0.8, 0.18, 520); m.burbuja(K.Gancho + 0.9, 0.18, 600);                            // salen las huellas
m.metal(K.Gancho + 1.9, 0.14, 700);                                                                    // ≠
for (let i = 0; i < 3; i++) { m.tic(K.Gancho + 2.6 + i * 0.33, 0.16, 2200); m.tic(K.Gancho + 2.75 + i * 0.33, 0.12, 1700); }
m.nota(K.Gancho + 3.4, 69, 0.06, 0.6);
m.whoosh(K.ADN + 0.2, 1.2, 0.1);                                                                       // nada el espermatozoide
m.golpe(K.ADN + 1.4, 0.25, 110); m.nota(K.ADN + 1.4, 76, 0.06, 0.8);                                   // se unen
m.sube(K.ADN + 1.9, 1.0, 57, 64, 0.05); m.burbuja(K.ADN + 2.8, 0.2, 400);                              // se divide en dos
m.zumbido(K.ADN + 3.0, 2.2, 0.03, 220);                                                                // ADN girando
m.whoosh(K.Formacion - 0.2, 0.6, 0.12);                                                                // entra el útero
for (let i = 0; i < 8; i++) m.latido(K.Formacion + 0.4 + i * 0.6, 0.14);                               // latido suave
m.metal(K.Formacion + 3.0, 0.1, 900);                                                                  // se abre la lupa
for (let i = 0; i < 12; i++) m.tic(K.Presion + i * 0.18, 0.08, 1400 + i * 50);                         // se dibujan las crestas
for (let i = 0; i < 6; i++) m.sube(K.Presion + 1.0 + i * 0.25, 0.5, 52, 59, 0.03);                     // flechas de tensión
m.zumbido(K.Presion + 1.4, 5.5, 0.04, 70);                                                             // la piel se estira
for (let i = 0; i < 6; i++) m.burbuja(K.Presion + 4.7 + i * 0.4, 0.1, 350 + i * 40);                   // ambiente del útero
for (let i = 0; i < 10; i++) m.tic(K.Dos + 0.3 + i * 0.22, 0.16, 1500 + i * 120);                      // diez yemas
m.metal(K.Dos + 3.2, 0.12, 640);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.nota(K.Parecidas + 0.6, 72, 0.06, 0.8); m.nota(K.Parecidas + 0.6, 76, 0.05, 0.8);                    // parecido
for (let i = 0; i < 8; i++) m.tic(K.Parecidas + 3.4 + i * 0.2, 0.18, 2600 - (i % 2) * 600);            // circulitos en los detalles
m.metal(K.Parecidas + 5.0, 0.1, 900);
m.whoosh(K.Policia + 0.2, 2.4, 0.08);                                                                  // pasa la lupa
m.nota(K.Policia + 2.4, 79, 0.07, 0.7);                                                                // ✓
for (let i = 0; i < 6; i++) m.tic(K.Policia + 3.0 + i * 0.17, 0.12, 1200);                             // bandas del ADN
m.nota(K.Policia + 4.2, 60, 0.05, 0.9, 0.6);
m.golpe(K.Koala + 0.1, 0.25, 70);
m.metal(K.Koala + 0.9, 0.1, 900);
m.whoosh(K.Koala + 2.6, 0.6, 0.12); m.nota(K.Koala + 3.2, 76, 0.07, 0.8); m.nota(K.Koala + 3.2, 81, 0.05, 0.8);
m.golpe(K.Cierre + 0.7, 0.25, 120); m.golpe(K.Cierre + 1.1, 0.25, 130);                                // manos en el vidrio
m.nota(K.Cierre + 1.2, 69, 0.06, 0.6); m.nota(K.Cierre + 1.5, 72, 0.06, 0.6);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
