// gen-audio.mjs — cama grave + efectos del Shot Científico #23 (la voz con helio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Helio Voz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 123);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
m.sube(0.0, 2.2, 79, 67, 0.04);                                                                          // el globo se desinfla
for (let i = 0; i < 6; i++) m.nota(0.15 + i * 0.12, [84, 88, 86, 91, 88, 93][i], 0.05, 0.18);            // ¡HOLA! chillón
m.tic(K.Gancho + 1.25, 0.25, 900); m.golpe(K.Gancho + 1.3, 0.25, 70);                                    // no son tus cuerdas (✕)
m.whoosh(K.Gancho + 3.4, 0.6, 0.14); m.nota(K.Gancho + 3.7, 69, 0.06, 0.8);                              // es el tubo
m.whoosh(K.Cuerdas - 0.3, 0.8, 0.16);                                                                    // entramos a la garganta
m.zumbido(K.Cuerdas + 0.4, K.Tubo - K.Cuerdas - 0.6, 0.05, 120);                                         // vibran las cuerdas
m.metal(K.Cuerdas + 1.8, 0.1, 640);
for (let i = 0; i < 5; i++) m.nota(K.Tubo + 0.5 + i * 0.35, [57, 64, 69, 64, 57][i], 0.04, 0.35);        // ondas que rebotan en el tubo
m.golpe(K.Tubo + 2.2, 0.25, 90); m.tic(K.Tubo + 3.4, 0.2, 2000);
for (let i = 0; i < 6; i++) m.tic(K.Timbre + 0.25 + i * 0.15, 0.13, 1500 + i * 150);                       // crecen las barras
m.sube(K.Timbre + 1.2, 1.2, 60, 67, 0.04); m.nota(K.Timbre + 2.6, 72, 0.07, 0.9);                         // el color de tu voz
m.tic(K.Helio + 0.25, 0.2, 2200);
m.whoosh(K.Helio + 0.6, 1.6, 0.18); m.whoosh(K.Helio + 0.6, 3.6, 0.07);                                   // carrera: helio vs aire
m.golpe(K.Helio + 2.2, 0.35, 95); m.nota(K.Helio + 2.25, 81, 0.07, 0.6);                                 // ≈ 3×
m.sube(K.Sube + 0.6, 2.0, 64, 76, 0.05);                                                                 // los picos suben
for (let i = 0; i < 8; i++) m.nota(K.Sube + 3.2 + i * 0.1, [86, 91, 88, 93, 90, 95, 91, 96][i], 0.045, 0.15); // ¡HOLAAA!
m.sube(K.Pregunta + 0.1, 1.3, 52, 64, 0.05);
m.nota(K.Igual + 0.2, 69, 0.07, 0.9); m.nota(K.Igual + 1.0, 69, 0.07, 0.9);                              // la misma nota dos veces
m.metal(K.Igual + 2.5, 0.08, 1300);
m.golpe(K.Pesado + 0.4, 0.45, 55);                                                                       // cae el tanque pesado
m.sube(K.Pesado + 2.6, 2.0, 52, 40, 0.06);                                                               // los picos bajan: voz grave
m.golpe(K.Peligro + 0.05, 0.4, 70); for (let i = 0; i < 3; i++) m.nota(K.Peligro + 0.1 + i * 0.3, 76, 0.06, 0.2); // alerta
m.tic(K.Peligro + 1.25, 0.25, 1200); m.tic(K.Peligro + 1.95, 0.25, 1200);
for (let i = 0; i < 6; i++) m.burbuja(K.Peligro + 3.9 + i * 0.3, 0.1, 380 + i * 30);                      // el helio desplaza el oxígeno
m.whoosh(K.Cierre - 0.2, 0.6, 0.12); m.nota(K.Cierre + 0.5, 69, 0.07, 1.2); m.nota(K.Cierre + 0.5, 76, 0.05, 1.2);
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
