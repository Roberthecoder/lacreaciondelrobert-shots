// gen-audio.mjs — cama grave + efectos del Shot Científico #20 (el punto ciego). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Durante la prueba (Prueba–Desaparece) solo hay notas suaves: nada que distraiga.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Punto Ciego base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.tic(K.Gancho + 0.35, 0.2, 1400);                                                                       // el ojo parpadea
m.golpe(K.Gancho + 0.9, 0.4, 70);                                                                        // aparece el hoyo
m.sube(K.Gancho + 2.6, 0.9, 52, 64, 0.06); m.tic(K.Gancho + 3.0, 0.2, 1400);                             // se rellena
m.nota(K.Prueba + 0.3, 69, 0.05, 0.6); m.nota(K.Prueba + 2.4, 72, 0.04, 0.6);                             // la prueba: notas suaves
m.nota(K.Acercate + 0.1, 71, 0.04, 0.8); m.nota(K.Desaparece + 0.2, 76, 0.05, 1.0);
m.whoosh(K.Nervio - 0.3, 0.7, 0.16);                                                                     // entramos al ojo
m.zumbido(K.Nervio + 0.4, 2.0, 0.03, 300);                                                               // luz
for (let i = 0; i < 6; i++) m.tic(K.Nervio + 2.6 + i * 0.28, 0.12, 2200);                                 // señales por el nervio
m.metal(K.Nervio + 3.4, 0.1, 620);                                                                       // lupa
for (let i = 0; i < 12; i++) m.tic(K.Sin + 0.15 + i * 0.12, 0.12, 1600 + i * 80);                         // conos y bastones
m.golpe(K.Sin + 3.4, 0.35, 60); m.nota(K.Sin + 3.6, 57, 0.06, 1.2);                                      // el hoyo de verdad
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Dos + 1.7, 0.9, 0.14); m.nota(K.Dos + 2.6, 76, 0.06, 0.5); m.nota(K.Dos + 2.75, 81, 0.06, 0.6); // dos ojos: se cubren
m.golpe(K.Rellena + 0.2, 0.35, 70); m.sube(K.Rellena + 1.6, 1.4, 50, 62, 0.06);                          // hueco y relleno
m.golpe(K.Mariotte + 0.2, 0.35, 80); m.whoosh(K.Mariotte + 1.2, 0.6, 0.12);
m.whoosh(K.Pulpo + 0.6, 0.6, 0.12); m.zumbido(K.Pulpo + 1.6, 1.8, 0.04, 140); m.nota(K.Pulpo + 3.4, 79, 0.06, 0.8);
for (const k of [3, 5, 7]) m.tic(K.Cierre + k / 1.6, 0.18, 1200);                                       // el punto parpadea
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
