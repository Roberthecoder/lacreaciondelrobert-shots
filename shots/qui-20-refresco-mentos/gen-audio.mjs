// gen-audio.mjs — cama grave + efectos del Shot Químico #20 (refresco de dieta y Mentos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mentos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 20);
const K = m.K;
const G = K.Gancho, Ga = K.Gas, Bu = K.Burbuja, Ru = K.Rugoso, Ca = K.Cadena, Pr = K.Pregunta, Es = K.Estudio, Di = K.Dieta, Mo = K.Molido, Se = K.Seguridad, Ci = K.Cierre, Ou = K.Outro;

// la música cuenta el estado: tapada mientras el gas está atrapado, libre cuando sale
m.pad(0, Ga, 0.05, [45, 52, 57]);
m.pad(Ga, Ca + 2.4, 0.05, [45, 52, 57], 0.6);
m.pad(Ca + 2.4, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.02, 3.0, 0.1); for (let i = 0; i < 20; i++) m.burbuja(G + 0.1 + i * 0.13, 0.06, 600 + (i % 5) * 80); // fuente
m.golpe(G + 2.0, 0.25, 90);                                                                 // tachado
m.tic(Ga + 0.2, 0.2, 1800); m.sube(Ga + 0.4, 1.0, 50, 62, 0.05);                          // tapa y presión
for (let i = 0; i < 6; i++) m.tic(Ga + 0.8 + i * 0.4, 0.05, 2600);                        // moléculas apretadas
m.sube(Bu + 0.2, 0.7, 55, 60, 0.04); m.burbuja(Bu + 1.1, 0.12, 900);                       // primer intento: pop
m.sube(Bu + 1.3, 0.7, 55, 60, 0.04); m.burbuja(Bu + 2.2, 0.12, 900);                       // segundo intento: pop
m.nota(Bu + 2.6, 64, 0.07, 0.8); m.nota(Bu + 3.0, 69, 0.07, 0.8);                          // en el rincón, sí
m.whoosh(Ru - 0.2, 0.7, 0.1); m.golpe(Ru + 0.6, 0.25, 140);                                // cae la pastilla
for (let i = 0; i < 12; i++) m.burbuja(Ru + 1.6 + i * 0.25, 0.06, 700 + (i % 4) * 120);   // burbujas en los hoyos
m.golpe(Ca + 0.2, 0.2, 140);
for (let i = 0; i < 24; i++) m.burbuja(Ca + 0.6 + i * 0.08, 0.05 + i * 0.002, 500 + (i % 6) * 90); // cadena que crece
for (let i = 0; i < 4; i++) m.tic(Ca + 0.9 + i * 0.65, 0.12, 2200);                        // cronómetro
m.whoosh(Ca + 2.4, 2.5, 0.16);                                                              // la fuente
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
m.metal(Es + 4.2, 0.1, 900); m.whoosh(Es + 5.0, 1.6, 0.12); m.metal(Es + 6.2, 0.1, 900);   // pH antes, chorro, pH después
m.golpe(Es + 6.9, 0.25, 90); m.nota(Es + 8.4, 67, 0.06, 0.8);
for (let i = 0; i < 3; i++) m.gota(Di + 0.3 + i * 0.7, 0.18, 800 + i * 120);              // gotas que se aplastan
m.nota(Di + 2.4, 52, 0.05, 0.6);                                                           // cafeína: nada
m.sube(Di + 3.3, 1.0, 57, 64, 0.05);                                                       // barras
m.whoosh(Mo + 0.3, 1.0, 0.12); m.gota(Mo + 1.1, 0.2, 700);                                  // chorro largo
m.whoosh(Mo + 3.0, 0.4, 0.08); m.gota(Mo + 3.4, 0.15, 1100);                                // chorrito corto
m.nota(Se + 0.3, 69, 0.06, 0.7); m.nota(Se + 1.0, 64, 0.05, 0.6);
m.whoosh(Ci + 0.1, 2.5, 0.1); for (let i = 0; i < 4; i++) m.tic(Ci + 0.6 + i * 0.8, 0.08, 1800); // etiquetas
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
