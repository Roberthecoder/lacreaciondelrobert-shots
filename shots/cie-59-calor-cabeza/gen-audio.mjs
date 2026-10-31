// gen-audio.mjs — cama grave + efectos del Shot Científico #59 (calor por la cabeza). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Calor Cabeza base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(0.0, 1.6, 0.08); m.whoosh(K.Gancho + 2.5, 1.4, 0.06);                                          // viento de nieve
m.golpe(K.Gancho + 0.7, 0.4, 75);                                                                        // sello ¿MITO?
m.whoosh(K.Gancho + 3.5, 0.35, 0.16);                                                                    // se tacha la frase
m.whoosh(K.Ejercito - 0.1, 0.5, 0.14); m.cruje(K.Ejercito + 0.8, 0.4);                                   // llega y se abre la carpeta
m.golpe(K.Ejercito + 1.7, 0.35, 90);                                                                     // sello EE. UU.
for (let i = 0; i < 3; i++) m.golpe(K.Trajes + 0.3 + i * 0.25, 0.18, 110 + i * 15);                       // caen los voluntarios
m.whoosh(K.Trajes + 2.5, 1.5, 0.07);
m.tic(K.Trajes + 3.4, 0.2, 2200);                                                                        // «cabeza destapada»
m.zumbido(K.Claro + 0.2, 4.0, 0.035, 140);                                                               // cámara térmica
m.sube(K.Claro + 0.4, 1.0, 50, 62, 0.05);
m.whoosh(K.Manual - 0.2, 0.6, 0.14);                                                                     // entra el manual
m.golpe(K.Manual + 2.6, 0.4, 70); m.nota(K.Manual + 2.65, 57, 0.06, 0.8);                                // 40–45 %
m.golpe(K.Manual + 4.2, 0.35, 95);                                                                       // sello ¿?
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05);
m.golpe(K.Estudio + 0.25, 0.35, 80);
m.whoosh(K.Estudio + 3.4, 0.4, 0.15);                                                                    // se tacha 40–45 %
for (let i = 0; i < 10; i++) m.tic(K.Proporcion + 1.4 + i * 0.06, 0.12, 1600 + i * 80);                 // 10 bloques de piel
m.sube(K.Proporcion + 2.2, 1.2, 60, 67, 0.04);
m.golpe(K.Bano + 0.3, 0.3, 100);
m.nota(K.Bano + 3.4, 69, 0.06, 0.6); m.nota(K.Bano + 3.55, 72, 0.05, 0.6);                              // ≤ 10 %
m.zumbido(K.Cara + 0.3, 2.4, 0.05, 95); for (let i = 0; i < 8; i++) m.tic(K.Cara + 0.4 + i * 0.13, 0.12, 3000); // ¡brrr!, dientes
m.whoosh(K.Cara + 0.2, 2.6, 0.08);
[0.2, 1.6, 2.0, 2.4].forEach((d, i) => { m.burbuja(K.Gorro + d, 0.15, 500 + i * 80); m.nota(K.Gorro + d + 0.5, [72, 76, 79, 84][i], 0.05, 0.4); });
m.sube(K.Cierre + 1.2, 0.8, 62, 50, 0.05);                                                               // la chimenea se apaga
m.golpe(K.Cierre + 2.1, 0.25, 120);                                                                       // cae el gorro
m.golpe(K.Cierre + 3.0, 0.35, 80);                                                                        // sello MITO
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
