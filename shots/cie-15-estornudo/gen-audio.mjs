// gen-audio.mjs — cama grave + efectos del Shot Científico #15 (tu estornudo no sale como bala). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Estornudo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 140);
const K = m.K;
const achu = (t, g = 0.24) => { m.sube(t - 0.55, 0.5, 60, 67, 0.04); m.golpe(t, 0.3, 110); m.whoosh(t, 0.9, g); };   // AH… ¡CHÚ!
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
achu(0.55);                                                                                              // el estornudo del gancho
m.whoosh(1.9, 0.4, 0.14); m.metal(2.25, 0.12, 900);                                                      // la bala vuela
m.cruje(2.6, 0.35); m.golpe(2.85, 0.2, 70);                                                              // la X roja
m.nota(4.0, 76, 0.07, 0.6); m.golpe(4.0, 0.3, 120);                                                      // máx. ≈ 16 km/h
m.whoosh(K.Mito + 0.6, 0.9, 0.18);                                                                       // la nube "rápida" cruza
m.golpe(K.Mito + 0.4, 0.2, 140);                                                                         // 100 m/s
m.cruje(K.Mito + 3.0, 0.4); m.nota(K.Mito + 3.1, 55, 0.06, 0.8);                                         // se tacha
for (let j = 0; j < 7; j++) m.tic(K.Calculo + 0.35 + j * 0.35, 0.12, 1500 + j * 60);                    // el lápiz escribe
m.metal(K.Calculo + 1.0, 0.08, 1200);                                                                    // la calculadora: 100
m.golpe(K.Calculo + 2.2, 0.25, 90);                                                                      // estimación, no medición
m.nota(K.Estudio + 0.3, 72, 0.06, 0.5);                                                                  // 2013
for (let i = 0; i < 6; i++) m.burbuja(K.Estudio + 0.7 + i * 0.22, 0.12, 400 + i * 60);                  // 6 voluntarios
m.motor(K.Estudio + 2.2, 2.6, 0.03);                                                                     // pimentero que sacude
for (let i = 0; i < 6; i++) { const t = K.Estudio + 2.2 + 2.6 * (i + 0.5) / 6 + 0.25; m.whoosh(t, 0.3, 0.1); m.tic(t, 0.15, 900); } // ¡achú! ×6
m.zumbido(K.Sombras + 0.2, 2, 0.03, 120);                                                                // aire tranquilo
achu(K.Sombras + 2.3, 0.2);                                                                              // estornudo en sombras
achu(K.Medida + 0.5, 0.2);                                                                               // estornudo medido
m.metal(K.Medida + 2.2, 0.08, 700);                                                                      // hasta aquí: 60 cm
m.nota(K.Medida + 3.0, 74, 0.07, 0.6); m.golpe(K.Medida + 3.0, 0.3, 120);                               // 4.5 m/s
m.whoosh(K.Tos + 0.3, 0.6, 0.14); m.whoosh(K.Tos + 0.6, 0.6, 0.14);                                      // tos · estornudo
m.nota(K.Tos + 1.4, 67, 0.05, 0.6);                                                                      // rápido, pero no extremo
m.sube(K.Pregunta + 0.05, 0.6, 60, 67, 0.05); m.golpe(K.Pregunta + 0.1, 0.25, 90);                       // ?
m.nota(K.Mano + 0.5, 69, 0.05, 0.5);                                                                     // estudio de 2011
m.whoosh(K.Mano + 1.4, 0.5, 0.1);                                                                        // sube la mano
achu(K.Mano + 3.0, 0.26); m.whoosh(K.Mano + 3.1, 1.2, 0.12);                                            // se escapa por los lados
achu(K.Codo + 1.2, 0.08); m.nota(K.Codo + 1.7, 76, 0.06, 0.5);                                           // pañuelo ✓
m.whoosh(K.Codo + 2.4, 0.5, 0.1); achu(K.Codo + 3.4, 0.08); m.nota(K.Codo + 3.9, 79, 0.06, 0.5);         // codo ✓
for (let i = 0; i < 2; i++) m.whoosh(K.Nariz + 0.3 + i * 3.2, 1.4, 0.06);                                // respiración tranquila
m.nota(K.Nariz + 2.6, 72, 0.06, 0.7);                                                                    // máx. ≈ 1.4 m/s
m.whoosh(K.Cierre + 0.2, 0.4, 0.1); m.cruje(K.Cierre + 0.4, 0.3);                                        // codo arriba · bala tachada
achu(K.Cierre + 1.2, 0.08); m.nota(K.Cierre + 2.2, 76, 0.06, 0.6);                                       // ✓
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
