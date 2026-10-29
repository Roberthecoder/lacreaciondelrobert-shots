// gen-audio.mjs — cama grave + efectos del Shot Científico #48 (bebés y huesos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bebes Huesos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 48);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 16; i++) m.tic(K.Gancho + i * 0.16, 0.1, 1500 + i * 70);   // piezas del bebé que aparecen
m.golpe(K.Gancho + 0.2, 0.3, 90);
m.whoosh(K.Gancho + 4.2, 0.7, 0.16); m.golpe(K.Gancho + 4.5, 0.3, 70);                                        // entra el adulto: 206
m.zumbido(K.Cartilago + 0.4, 0.6, 0.04, 300); m.sube(K.Cartilago + 1.6, 1.2, 60, 64, 0.04);                    // lupa · se dobla
m.sube(K.Fusion + 0.6, 2.6, 52, 64, 0.05); m.metal(K.Fusion + 3.2, 0.12, 640);                                 // se unen
for (let i = 0; i < 3; i++) m.nota(K.Craneo + 0.5 + i * 0.25, [72, 76, 79][i], 0.05, 0.4);                     // toque suave
m.burbuja(K.Craneo + 1.4, 0.12, 420);
m.nota(K.Craneo + 3.6, 67, 0.05, 0.9); m.nota(K.Craneo + 4.2, 71, 0.05, 0.6); m.nota(K.Craneo + 4.9, 64, 0.05, 0.6);
m.whoosh(K.Parto + 0.3, 0.9, 0.12); m.sube(K.Parto + 2.6, 1.8, 48, 60, 0.06);                                    // se acomoda · crece el cerebro
for (let i = 0; i < 8; i++) m.tic(K.Cierra + 0.4 + i * 0.2, 0.12, 2200);                                          // calendario: atrás
for (let i = 0; i < 12; i++) m.tic(K.Cierra + 3.4 + i * 0.18, 0.12, 2000 + i * 40);                               // arriba: 7–19 meses
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.zumbido(K.Cadera + 1.2, 3.6, 0.04, 98); m.metal(K.Cadera + 4.8, 0.1, 520);                                     // la cadera se une
m.burbuja(K.Rodilla + 0.5, 0.1, 380);
for (let i = 0; i < 4; i++) m.nota(K.Rodilla + 2.6 + i * 0.6, [64, 67, 71, 76][i], 0.05, 0.6);                   // la rótula se vuelve hueso
for (let i = 0; i < 10; i++) m.tic(K.Total + i * 0.12, 0.1, 1700 + i * 50);
m.golpe(K.Total + 1.3, 0.3, 80); m.nota(K.Total + 3.6, 62, 0.05, 0.8);
m.sube(K.Cierre + 0.3, 2.3, 55, 67, 0.05); m.metal(K.Cierre + 2.6, 0.1, 700);                                     // el bebé crece y se une
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
