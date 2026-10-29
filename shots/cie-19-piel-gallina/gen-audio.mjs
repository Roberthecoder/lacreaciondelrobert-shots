// gen-audio.mjs — cama grave + efectos del Shot Científico #19 (piel de gallina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Piel Gallina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 119);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
// gancho: escalofrío y el brazo se llena de bolitas
m.whoosh(0.1, 0.8, 0.18);
for (let i = 0; i < 14; i++) m.tic(0.2 + i * 0.07, 0.12, 2200 + i * 90);
m.golpe(K.Gancho + 0.3, 0.3, 90);
m.metal(K.Gancho + 2.6, 0.1, 300);                                                            // se tacha «piel encogiéndose»
for (let i = 0; i < 4; i++) m.tic(K.Gancho + 4.4 + i * 0.12, 0.18, 1500);                     // flechas a los pelos
// por dentro
m.whoosh(K.Musculo + 0.1, 0.7, 0.14); m.sube(K.Musculo + 0.1, 0.6, 57, 69, 0.04);              // se abre la lupa
m.whoosh(K.Musculo + 1.8, 0.6, 0.12);
m.nota(K.Musculo + 2.0, 72, 0.05, 0.5); m.nota(K.Musculo + 2.3, 76, 0.05, 0.5); m.nota(K.Musculo + 2.6, 79, 0.06, 0.8);
for (let i = 0; i < 8; i++) m.nota(K.Frio + 0.2 + i * 0.3, [84, 88, 86, 91, 84, 88, 86, 91][i], 0.025, 0.4);   // copos
m.nota(K.Frio + 1.4, 76, 0.05, 0.4); m.nota(K.Frio + 1.55, 81, 0.05, 0.5);                    // emoción
for (let i = 0; i < 8; i++) m.zumbido(K.Frio + 2.2 + i * 0.22, 0.12, 0.05, 600 + i * 30);      // señal por el nervio
m.golpe(K.Frio + 3.7, 0.35, 70);                                                               // se contrae
m.sube(K.Frio + 3.8, 1.4, 50, 62, 0.06);
m.burbuja(K.Bolita + 0.3, 0.18, 400); m.burbuja(K.Bolita + 1.3, 0.2, 300);                    // el pelo se para · bolita
// gatos
m.nota(K.Animales + 0.8, 79, 0.05, 0.5);
m.whoosh(K.Animales + 1.6, 0.8, 0.12);                                                         // se esponja
m.sube(K.Animales + 3.0, 1.2, 60, 67, 0.04);                                                   // capa de aire caliente
m.golpe(K.Grande + 0.5, 0.35, 75); m.whoosh(K.Grande + 0.6, 0.6, 0.2);                        // ¡FFFF!
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.metal(K.Inutil + 1.3, 0.1, 300);                                                             // se tacha «¿para abrigarte?»
m.sube(K.Inutil + 1.8, 1.6, 57, 64, 0.04); m.nota(K.Inutil + 2.5, 76, 0.06, 0.7);             // de ancestro a persona · herencia
// Harvard 2020
m.golpe(K.Harvard + 0.25, 0.35, 80);
m.whoosh(K.Harvard + 2.6, 0.6, 0.12);
for (let i = 0; i < 6; i++) m.zumbido(K.Harvard + 3.0 + i * 0.25, 0.12, 0.045, 620 + i * 25);  // señal por el nervio
m.sube(K.Harvard + 4.4, 0.8, 64, 72, 0.04);                                                     // rama a las células madre
for (let i = 0; i < 5; i++) m.nota(K.Harvard + 5.3 + i * 0.16, [72, 76, 79, 84, 88][i], 0.05, 0.6);   // despiertan
for (let i = 0; i < 6; i++) m.tic(K.Pelo + 0.5 + i * 0.33, 0.12, 1700);                         // hojas del calendario
m.sube(K.Pelo + 1.6, 2.6, 57, 69, 0.05);                                                         // crece pelo nuevo
// cierre
m.whoosh(K.Cierre + 0.1, 0.7, 0.15);
for (let i = 0; i < 10; i++) m.tic(K.Cierre + 0.2 + i * 0.08, 0.1, 2200 + i * 80);
m.metal(K.Cierre + 1.8, 0.1, 300);
for (let i = 0; i < 3; i++) m.nota(K.Cierre + 3.8 + i * 0.25, [69, 72, 76][i], 0.05, 0.8);     // bufanda imaginaria
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
