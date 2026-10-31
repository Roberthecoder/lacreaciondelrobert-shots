// gen-audio.mjs — cama grave + efectos del Shot Científico #24 (las gotas de lluvia no son lágrimas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gotas Lluvia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 240);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 6; i++) m.gota(0.1 + i * 0.13 + (i % 2) * 0.05, 0.12, 800 + i * 90);              // lluvia que cae
m.golpe(0.9, 0.3, 140); m.whoosh(0.9, 0.3, 0.14); m.whoosh(1.1, 0.3, 0.14);                           // la lágrima se tacha
for (let i = 0; i < 5; i++) m.burbuja(3.2 + i * 0.1, 0.12, 400 + i * 80);                              // se vuelven bolitas
m.golpe(4.9, 0.25, 110); m.nota(5.4, 72, 0.06, 0.5); m.golpe(5.6, 0.3, 90);                            // panes · el pan de verdad
for (let i = 0; i < 10; i++) m.tic(K.Pequenas + 0.6 + i * 0.08, 0.14, 1600 + i * 60);                  // flechas hacia adentro
m.zumbido(K.Pequenas + 0.4, 2.4, 0.03, 150);                                                            // la gota tiembla y se asienta
m.nota(K.Pequenas + 2.4, 76, 0.05, 0.6);                                                                // la regla
m.whoosh(K.Caen + 0.2, 3.2, 0.14);                                                                      // cae: aire de abajo
m.sube(K.Caen + 0.6, 2.6, 60, 55, 0.04);                                                                // se aplana
m.burbuja(K.Pan + 0.2, 0.14, 380); m.nota(K.Pan + 0.6, 69, 0.05, 0.4); m.nota(K.Pan + 1.4, 64, 0.05, 0.4); // etiquetas
m.golpe(K.Pan + 2.6, 0.25, 130); m.golpe(K.Pan + 2.9, 0.35, 90); m.nota(K.Pan + 3.3, 76, 0.06, 0.6);  // = pan
m.nota(K.Pregunta + 0.05, 81, 0.06, 0.9); m.nota(K.Pregunta + 0.05, 74, 0.05, 0.9);                     // ¿?
m.sube(K.Paracaidas + 0.2, 2.2, 48, 60, 0.06);                                                          // la gota crece
m.tic(K.Paracaidas + 1.6, 0.25, 2600);                                                                  // ≈ 8 mm
m.whoosh(K.Paracaidas + 2.8, 2.0, 0.18); m.motor(K.Paracaidas + 2.8, 2.2, 0.04);                        // el aire la hunde
m.golpe(K.Rompe + 0.35, 0.5, 70); m.cruje(K.Rompe + 0.35, 0.3);                                         // ¡PLOP!
for (let i = 0; i < 12; i++) m.gota(K.Rompe + 0.45 + i * 0.09, 0.12, 900 + (i * 137) % 700);           // gotitas
m.nota(K.Lagrima + 0.05, 79, 0.05, 0.6);                                                                // ¿y la lágrima?
for (let k = 0; k < 2; k++) { const t0 = K.Lagrima + 0.3 + k * 2.7; m.sube(t0 + 2.7 * 0.45, 0.6, 67, 74, 0.03); m.gota(t0 + 2.7 * 0.68, 0.2, 1100); m.gota(t0 + 2.7 * 0.95, 0.25, 700); } // se estira, se despega, plic
m.nota(K.Lagrima + 2.7, 72, 0.05, 0.6);
m.whoosh(K.Velocidad + 0.1, 5.6, 0.12);                                                                 // cae rápido
m.sube(K.Velocidad + 0.5, 1.7, 50, 70, 0.06); m.golpe(K.Velocidad + 1.4, 0.3, 120);                     // la aguja sube · ≈ 9 m/s
m.nota(K.Velocidad + 3.1, 74, 0.06, 0.8); m.nota(K.Velocidad + 3.1, 69, 0.04, 0.8);                     // más de 30 km/h
for (let i = 0; i < 6; i++) m.gota(K.Chica + 0.2 + i * 0.6, 0.09, 1400 + (i % 3) * 200);               // llovizna lenta
m.nota(K.Chica + 1.6, 64, 0.05, 1.2);
for (let i = 0; i < 6; i++) m.gota(K.Cierre + 0.1 + i * 0.15, 0.1, 800 + i * 70);                       // la lluvia del inicio
m.golpe(K.Cierre + 0.3, 0.25, 140);                                                                     // la lágrima tachada
m.nota(K.Cierre + 3.0, 72, 0.05, 0.6); m.nota(K.Cierre + 3.2, 76, 0.05, 0.6);                            // el pan sonríe · dibuja panes
m.nota(K.Outro + 0.3, 57, 0.08, 2.8); m.nota(K.Outro + 0.3, 64, 0.06, 2.8); m.nota(K.Outro + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
