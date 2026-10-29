// gen-audio.mjs — cama grave + efectos del Shot Científico #45 (la Tierra no es redonda). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tierra No Redonda base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 100);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.golpe(K.Gancho + 0.1, 0.3, 90);                                                                        // ¿pelota perfecta?
m.sube(K.Gancho + 0.3, 1.9, 55, 48, 0.06); m.whoosh(K.Gancho + 0.4, 1.6, 0.12);                          // se aplasta (exagerado)
m.tic(K.Gancho + 2.0, 0.2, 2200);
m.golpe(K.Gancho + 4.4, 0.25, 110); m.cruje(K.Gancho + 5.6, 0.4);                                         // mito tachado
m.whoosh(K.Gira + 0.1, 1.0, 0.12); m.motor(K.Gira + 0.5, 4.0, 0.04);                                      // gira
m.whoosh(K.Gira + 0.8, 0.6, 0.14); m.whoosh(K.Gira + 2.0, 0.6, 0.1);
m.sube(K.Medida + 0.4, 1.0, 60, 67, 0.05); m.sube(K.Medida + 1.6, 1.0, 60, 65, 0.05);                   // dos reglas
for (let i = 0; i < 10; i++) m.tic(K.Medida + 2.9 + i * 0.08, 0.14, 2000 + i * 100);                       // conteo 43
m.golpe(K.Medida + 3.7, 0.3, 80);
for (let i = 0; i < 5; i++) m.nota(K.Poco + 0.3 + i * 0.35, [76, 79, 74, 81, 72][i], 0.04, 1.0);           // espacio: se ve redonda
m.metal(K.Poco + 1.6, 0.1, 700);
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Everest + 0.2, 0.4, 60); m.cruje(K.Everest + 0.3, 0.3);                                          // sube la montaña
m.sube(K.Everest + 1.4, 1.2, 55, 74, 0.05); m.metal(K.Everest + 2.6, 0.12, 620);                         // regla y medición
m.golpe(K.Chimborazo + 0.2, 0.25, 100); m.golpe(K.Chimborazo + 0.7, 0.3, 70);                              // centro · volcán
m.whoosh(K.Chimborazo + 1.2, 1.0, 0.14);                                                                   // flecha al Chimborazo
m.whoosh(K.Panza + 0.2, 0.9, 0.12);                                                                        // flecha al Everest
for (let i = 0; i < 6; i++) m.tic(K.Panza + 1.6 + i * 0.1, 0.12, 1500);
m.nota(K.Panza + 2.4, 79, 0.07, 0.8); m.nota(K.Panza + 2.5, 84, 0.05, 0.8);                               // ≈ 2 km más lejos
m.tic(K.Peso + 0.4, 0.2, 2400); m.tic(K.Peso + 1.4, 0.2, 2600);
m.golpe(K.Peso + 0.6, 0.3, 80); m.golpe(K.Peso + 0.85, 0.3, 75);                                           // se suben a las básculas
m.metal(K.Peso + 3.0, 0.1, 900); m.metal(K.Peso + 3.1, 0.1, 860);                                         // agujas
m.nota(K.Peso + 3.6, 76, 0.06, 0.6);
m.sube(K.Cierre + 0.1, 0.8, 60, 67, 0.04); m.nota(K.Cierre + 0.4, 72, 0.05, 0.4);                          // la cara
m.tic(K.Cierre + 1.6, 0.15, 1800); m.golpe(K.Cierre + 2.5, 0.3, 120); m.golpe(K.Cierre + 2.7, 0.3, 90);   // cinta · PANZONA
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
