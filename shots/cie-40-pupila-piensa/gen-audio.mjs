// gen-audio.mjs — cama grave + efectos del Shot Científico #40 (la pupila que piensa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Cada número que aparece suena con una nota que sube (la pupila se abre un poquito con cada uno).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pupila Piensa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 140);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.tic(K.Gancho + 0.15, 0.2, 1400);                                                                       // el ojo parpadea
for (let i = 0; i < 6; i++) m.nota(K.Gancho + 0.4 + i * 0.42, 69 + i * 2, 0.06, 0.35);                   // números: la pupila se abre
m.whoosh(K.Pupila - 0.3, 0.6, 0.12);
m.golpe(K.Pupila + 0.4, 0.3, 90);                                                                        // etiqueta «pupila»
m.zumbido(K.Pupila + 1.8, 1.6, 0.03, 320);                                                               // la luz entra
m.tic(K.Pupila + 3.4, 0.2, 1400);                                                                        // parpadeo
m.metal(K.Luz + 0.2, 0.12, 980); m.sube(K.Luz + 0.6, 0.7, 64, 57, 0.05);                                 // sol: se cierra
m.nota(K.Luz + 1.7, 52, 0.06, 0.8); m.sube(K.Luz + 2.1, 0.8, 57, 64, 0.05);                              // luna: se abre
m.whoosh(K.Mente - 0.3, 0.6, 0.12);
for (let i = 0; i < 8; i++) m.tic(K.Mente + 0.4 + i * 0.25, 0.1, 900);                                    // engranes
m.sube(K.Mente + 1.0, 1.4, 52, 60, 0.05);                                                                // la pupila responde
m.golpe(K.Estudio + 0.2, 0.4, 80);                                                                       // tarjeta 1966
for (let i = 0; i < 4; i++) m.nota(K.Estudio + 2.4 + i * 0.9, 64 + i * 3, 0.06, 0.4);                    // listas más largas
for (let i = 0; i < 6; i++) m.nota(K.Resultado + 0.4 + (i + 0.4) * 6.3 * 0.55 / 6, 60 + i * 2, 0.06, 0.35);  // escalones: oye números
for (let i = 0; i < 6; i++) m.nota(K.Resultado + 0.4 + 6.3 * 0.55 + (i + 0.4) * 6.3 * 0.45 / 6, 70 - i * 2, 0.05, 0.35); // los dice
m.sube(K.Pregunta + 0.1, 1.1, 52, 64, 0.05);
m.whoosh(K.Locus - 0.3, 0.7, 0.16);                                                                      // entramos a la cabeza
m.zumbido(K.Locus + 1.4, 1.5, 0.04, 220); m.nota(K.Locus + 1.4, 76, 0.05, 0.8);                          // la zona se enciende
for (let i = 0; i < 6; i++) m.tic(K.Locus + 3.0 + i * 0.12, 0.12, 2000);                                  // señal al ojo
m.sube(K.Locus + 3.6, 1.0, 55, 62, 0.05);                                                                // pupila se abre
for (let i = 0; i < 6; i++) m.tic(K.Locus + 4.4 + i * 0.3, 0.08, 900);                                    // engranes
m.golpe(K.Pequeno + 0.2, 0.25, 110);
m.tic(K.Pequeno + 1.6, 0.3, 2600); m.tic(K.Pequeno + 1.7, 0.25, 2200);                                   // clic de la cámara
m.whoosh(K.Uso - 0.3, 0.6, 0.12); m.metal(K.Uso + 1.0, 0.08, 700);
m.sube(K.Uso + 2.2, 2.6, 50, 62, 0.05);                                                                  // sube el esfuerzo
m.golpe(K.Nobel + 0.2, 0.35, 80); m.whoosh(K.Nobel + 1.2, 0.6, 0.12);
m.metal(K.Nobel + 1.7, 0.2, 820); m.nota(K.Nobel + 1.8, 76, 0.06, 0.6); m.nota(K.Nobel + 1.95, 81, 0.06, 0.8); // medalla
m.whoosh(K.Cierre + 0.2, 0.6, 0.14); m.tic(K.Cierre + 0.5, 0.2, 1400);
for (let i = 0; i < 6; i++) m.nota(K.Cierre + 1.4 + i * 0.42, 69 + i * 2, 0.06, 0.35);                   // números otra vez
m.metal(K.Cierre + 3.4, 0.12, 980);                                                                      // «tu esfuerzo se puede medir»
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
