// gen-audio.mjs — cama grave + efectos del Shot Científico #21 (el hipo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hipo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 121);
const K = m.K;
// el «hip»: golpecito grave del diafragma + chasquido de la glotis que se cierra
const hip = (t, g = 1) => { m.golpe(t, 0.32 * g, 95); m.tic(t + 0.08, 0.22 * g, 1500); m.nota(t + 0.08, 81, 0.05 * g, 0.25); };
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
[0.25, 2.6, 5.0].forEach((t) => hip(K.Gancho + t));                                                     // ¡HIP! del gancho
m.sube(K.Gancho + 1.9, 0.8, 64, 60, 0.04);                                                              // ¿la garganta?
m.whoosh(K.Gancho + 3.6, 0.8, 0.12); m.nota(K.Gancho + 4.0, 69, 0.06, 0.8);                              // se ve por dentro: un músculo
m.whoosh(K.Diafragma + 0.2, 0.7, 0.12);                                                                 // se abre la lupa
for (let i = 0; i < 2; i++) m.sube(K.Diafragma + 0.6 + i * 1.2, 1.1, 50, 57, 0.035);                     // respira
m.golpe(K.Espasmo + 0.9, 0.45, 70); m.tic(K.Espasmo + 0.9, 0.2, 900);                                   // ¡TIC! el diafragma baja de golpe
m.whoosh(K.Espasmo + 1.2, 1.0, 0.2);                                                                    // jala aire
m.whoosh(K.Glotis - 0.2, 1.2, 0.08);                                                                    // la cámara sube a la laringe
m.metal(K.Glotis + 0.6, 0.1, 520);                                                                      // lupa de la laringe
m.nota(K.Glotis + 1.4, 74, 0.05, 0.6);                                                                  // «la puerta entre tus cuerdas vocales»
m.golpe(K.Glotis + 3.65, 0.25, 80); m.tic(K.Glotis + 3.9, 0.35, 1200); m.golpe(K.Glotis + 3.9, 0.3, 110); // la glotis se cierra de golpe
m.whoosh(K.Sonido + 0.1, 0.8, 0.14);                                                                    // aire que baja
hip(K.Sonido + 0.9, 1.3);                                                                               // choca: ¡HIP!
[0.7, 2.0, 3.3].forEach((t, i) => { m.tic(K.Causas + t, 0.2, 2000); m.nota(K.Causas + t + 0.05, [76, 79, 81][i], 0.06, 0.4); });
for (let i = 0; i < 8; i++) m.burbuja(K.Causas + 2.1 + i * 0.13, 0.08, 500 + i * 60);                  // gas
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.nota(K.Hipotesis + 2.3, 72, 0.06, 0.6);                                                               // chip hipótesis
for (let i = 0; i < 6; i++) m.burbuja(K.Hipotesis + 2.7 + i * 0.2, 0.07, 400 + i * 40);                // agua del renacuajo
m.nota(K.Hipotesis + 4.8, 79, 0.05, 0.5);
[5.4, 7.0].forEach((t) => hip(K.Hipotesis + t, 0.6));
m.nota(K.Bebes + 0.2, 72, 0.06, 0.6);
m.burbuja(K.Bebes + 2.0, 0.12, 300); m.sube(K.Bebes + 2.0, 1.1, 57, 69, 0.04); m.burbuja(K.Bebes + 3.1, 0.14, 650); hip(K.Bebes + 3.15, 0.6);
m.golpe(K.Record + 0.3, 0.3, 80); m.whoosh(K.Record + 2.0, 0.5, 0.12);
[2.8, 3.8, 5.0, 6.2].forEach((t) => hip(K.Record + t, 0.45));
for (let i = 0; i < 16; i++) m.tic(K.Record + 4.6 + i * 0.1, 0.12, 1500 + i * 70);                      // corren los años
m.nota(K.Record + 6.2, 81, 0.07, 0.9);
for (let i = 0; i < 16; i++) m.tic(K.Remedios + 0.3 + i * 0.125, 0.12, 2600);                           // el reloj corre
[0.4, 1.0, 1.6].forEach((t, i) => hip(K.Remedios + t, 0.45 - i * 0.12));                                // el hipo se va apagando
m.nota(K.Remedios + 2.3, 76, 0.07, 0.5); m.nota(K.Remedios + 2.4, 81, 0.06, 0.6);                        // ✓
m.tic(K.Remedios + 2.9, 0.2, 1800); m.tic(K.Remedios + 3.25, 0.2, 1800); m.golpe(K.Remedios + 3.9, 0.3, 75); // 2 días → médico
[0.5, 2.7].forEach((t) => hip(K.Cierre + t));
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
