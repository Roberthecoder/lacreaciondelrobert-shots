// gen-audio.mjs — cama grave + efectos del Shot Científico #10 (tu voz grabada). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Voz Grabada base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 6; i++) m.nota(K.Gancho + 0.1 + i * 0.18, [69, 72, 67, 74, 71, 76][i], 0.05, 0.25);   // el audio del celular
m.golpe(K.Gancho + 0.3, 0.3, 90);
m.whoosh(K.Caminos + 0.5, 0.7, 0.14); m.whoosh(K.Caminos + 1.2, 0.7, 0.1);                               // dos caminos
for (let i = 0; i < 5; i++) m.nota(K.Aire + 0.4 + i * 0.5, 76 + (i % 2) * 3, 0.04, 0.4);                   // ondas por el aire
m.zumbido(K.Hueso + 0.5, 4.5, 0.05, 110);                                                                // vibra el hueso
m.metal(K.Hueso + 2.4, 0.12, 520);
m.sube(K.Graves + 1.0, 1.8, 57, 45, 0.06);                                                               // suben los graves
for (let i = 0; i < 4; i++) m.tic(K.Micro + 0.5 + i * 0.25, 0.15, 2600);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Estudio + 0.25, 0.35, 80);
for (let i = 0; i < 12; i++) m.tic(K.Estudio + 2.6 + i * 0.12, 0.14, 1800 + i * 60);
m.nota(K.Estudio + 4.2, 79, 0.07, 0.8);
m.sube(K.Resultado + 0.3, 1.3, 60, 72, 0.05); m.sube(K.Resultado + 1.2, 1.3, 60, 67, 0.04);
m.golpe(K.Prueba + 0.5, 0.3, 70); m.zumbido(K.Prueba + 1.6, 3.5, 0.07, 82);                              // oídos tapados: más grave
for (let i = 0; i < 6; i++) m.nota(K.Cierre + 0.1 + i * 0.18, [69, 72, 67, 74, 71, 76][i], 0.05, 0.25);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
