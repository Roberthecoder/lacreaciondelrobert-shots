// gen-audio.mjs — cama grave + efectos del Shot Científico #22 (agujetas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Agujetas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 122);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 6; i++) m.golpe(K.Gancho + 0.05 + i * 1.0, 0.18, 70);                                  // pasos en la escalera
m.nota(K.Gancho + 0.2, 64, 0.06, 0.4); m.nota(K.Gancho + 0.35, 60, 0.06, 0.5);                              // ¡AY!
m.whoosh(K.Gancho + 2.6, 0.35, 0.14); m.whoosh(K.Gancho + 2.95, 0.35, 0.14); m.golpe(K.Gancho + 3.3, 0.3, 60); // tachado del frasco
m.whoosh(K.Lactato + 0.2, 0.5, 0.1);
m.sube(K.Lactato + 1.0, 1.7, 57, 69, 0.05); m.sube(K.Lactato + 2.7, 2.2, 69, 57, 0.045);                    // la curva sube y baja
for (let i = 0; i < 8; i++) m.tic(K.Lactato + 2.7 + i * 0.3, 0.12, 2200);                                   // reloj
for (let i = 0; i < 4; i++) m.golpe(K.Tarde + 0.2 + i * 0.25, 0.14, 95);                                    // entran los días
for (let i = 1; i < 4; i++) m.sube(K.Tarde + 1.4 + i * 0.75, 0.8, 52, 60 + i * 2, 0.04);                    // sube el dolor
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                                        // tarjeta 1983
m.whoosh(K.Estudio + 2.2, 0.6, 0.16); m.whoosh(K.Estudio + 2.6, 0.6, 0.14);                                 // entran las caminadoras
m.motor(K.Estudio + 2.4, 2.4, 0.04);
m.sube(K.Bajada + 0.5, 1.4, 57, 67, 0.05);                                                                  // lactato en plano
m.nota(K.Bajada + 1.7, 57, 0.06, 0.6, 0.6);                                                                 // en bajada: no subió
m.sube(K.Bajada + 3.0, 1.0, 52, 57, 0.04); m.sube(K.Bajada + 3.4, 1.2, 52, 72, 0.06);                      // dolor: plano poco, bajada mucho
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.whoosh(K.Fibras + 1.0, 0.6, 0.12); m.metal(K.Fibras + 1.0, 0.1, 620);                                     // abre la lupa
for (let i = 0; i < 4; i++) m.cruje(K.Fibras + 3.0 + i * 0.35, 0.25);                                       // pequeños desgarres
for (let i = 0; i < 2; i++) m.golpe(K.Excentrico + 0.1 + i * 2.6, 0.16, 75);                                // pisadas al bajar
m.sube(K.Excentrico + 0.3, 1.9, 60, 55, 0.04); m.sube(K.Excentrico + 2.9, 1.9, 60, 55, 0.04);              // el músculo se alarga
for (let i = 0; i < 8; i++) m.burbuja(K.Inflamacion + 2.2 + i * 0.15, 0.08, 400 + i * 30);                  // llegan las células de defensa
m.zumbido(K.Inflamacion + 3.3, 2.0, 0.05, 240);                                                             // el nervio chispea
for (let i = 0; i < 5; i++) m.tic(K.Inflamacion + 3.4 + i * 0.35, 0.16, 3200);
m.sube(K.Repetida + 0.4, 1.2, 57, 69, 0.05); m.sube(K.Repetida + 2.2, 1.0, 57, 60, 0.04);                   // primera vez / siguiente vez
m.nota(K.Repetida + 3.8, 72, 0.07, 0.6); m.nota(K.Repetida + 3.95, 76, 0.07, 0.8);                          // se adapta
for (let i = 0; i < 5; i++) m.golpe(K.Cierre + 0.05 + i * 1.0, 0.15, 75);                                   // baja sin dolor
for (let i = 0; i < 4; i++) m.nota(K.Cierre + 1.2 + i * 0.2, [69, 72, 76, 81][i], 0.05, 0.4);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
