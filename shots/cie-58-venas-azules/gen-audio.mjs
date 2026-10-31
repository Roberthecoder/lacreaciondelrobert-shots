// gen-audio.mjs — cama grave + efectos del Shot Científico #58 (tus venas no son azules). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Venas Azules base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 158);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(K.Gancho, 0.6, 0.16); m.golpe(K.Gancho + 0.3, 0.3, 80);                                           // entra el brazo, se abre la lupa
for (let i = 0; i < 4; i++) m.latido(K.Gancho + 1.0 + i * 0.9, 0.12);
m.whoosh(K.Oscura, 0.7, 0.12);
for (let i = 0; i < 8; i++) m.burbuja(K.Oscura + 0.4 + i * 0.35, 0.08, 380 - i * 20);                        // glóbulos que pierden oxígeno
m.golpe(K.Oscura + 3.0, 0.25, 70);                                                                            // «pero ROJA»
for (let i = 0; i < 5; i++) m.nota(K.Truco + 0.15 + i * 0.12, [72, 76, 79, 83, 84][i], 0.05, 0.4);           // rayos de luz
m.metal(K.Truco + 0.9, 0.12, 900);                                                                            // ¡TRUCO!
m.whoosh(K.Profundo, 0.6, 0.12);
m.sube(K.Profundo + 0.3, 2.2, 64, 48, 0.05);                                                                  // la roja baja hondo
m.sube(K.Profundo + 2.5, 1.4, 76, 80, 0.04); m.tic(K.Profundo + 3.1, 0.15, 3000);                             // la azul rebota
m.sube(K.Traga + 0.3, 1.2, 60, 50, 0.05); m.golpe(K.Traga + 1.5, 0.35, 60); m.burbuja(K.Traga + 1.55, 0.15, 300); // ¡GLUP!
m.nota(K.Menos + 1.0, 64, 0.08, 0.8); m.nota(K.Menos + 1.6, 64, 0.03, 0.8);                                   // regresa mucho / poco rojo
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.tic(K.Compara + 0.3, 0.2, 2000); m.whoosh(K.Compara + 2.6, 0.9, 0.12);                                      // la muestra sale sola
m.golpe(K.Estudio + 0.25, 0.35, 80);
for (let i = 0; i < 10; i++) m.tic(K.Estudio + 3.0 + i * 0.25, 0.08, 2200 + (i % 3) * 400);                    // fotones que viajan
m.sube(K.Hondo + 0.8, 2.6, 55, 40, 0.06);                                                                     // la vena se hunde
m.golpe(K.Muneca + 0.1, 0.3, 90); m.nota(K.Muneca + 2.6, 76, 0.06, 0.5); m.nota(K.Muneca + 3.4, 79, 0.06, 0.5);
for (let i = 0; i < 8; i++) m.gota(K.Sangre + 0.3 + i * 0.2, 0.12, 700 - i * 40);                              // se llena el tubo
m.golpe(K.Sangre + 2.7, 0.3, 70);                                                                             // tachado
m.whoosh(K.Cierre + 0.3, 0.6, 0.12); m.nota(K.Cierre + 1.0, 72, 0.06, 0.8);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
