// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #10 (huitlacoche, Ustilago maydis). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huitlacoche base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 10);
const K = m.K;
const G = K.Gancho, N = K.Nombre, En = K.Entra, H = K.Hifas, A = K.Agalla, P = K.Pregunta, Es = K.Esporas, E = K.Estudio, Co = K.Cosecha, Sa = K.Sabor, Ef = K.Enfermedad, Mo = K.Modelo, C = K.Cierre, Ou = K.Outro;
const MICRO = A + 2.6;

m.pad(0, Ou + 3.2, 0.05, [45, 52, 57], 0.1);                                   // cama grave y cálida, continua
m.whoosh(G + 0.25, 1.0, 0.16); m.cruje(G + 0.4, 0.35);                         // se abren las hojas del elote
for (let i = 0; i < 8; i++) m.burbuja(G + 0.7 + i * 0.13, 0.08, 220 + i * 25); // brotan las agallas
m.cruje(G + 1.9, 0.3);                                                         // se tacha "¿podrido?"
m.nota(G + 2.7, 69, 0.06, 0.8); m.nota(G + 2.9, 76, 0.05, 0.8);               // ✓ un manjar
m.zumbido(G + 4.0, 2.0, 0.03, 140);                                            // chisporrotea el comal
for (let i = 0; i < 6; i++) m.tic(G + 4.1 + i * 0.25, 0.05, 3200);
m.nota(N + 0.2, 64, 0.05, 0.6); m.nota(N + 0.7, 67, 0.05, 0.6); m.nota(N + 1.2, 72, 0.05, 0.7); // etiquetas
for (let i = 0; i < 14; i++) m.gota(En + 0.3 + i * 0.12 + 1.0, 0.05, 1400 + (i % 4) * 200); // las células del hongo caen en los pelos
for (let i = 0; i < 12; i++) m.tic(En + 2.5 + i * 0.12, 0.14, 1800 + (i % 3) * 400); // granizo
m.whoosh(En + 2.4, 1.6, 0.18);                                                 // viento
m.cruje(En + 3.0, 0.5);                                                        // herida en la hoja
m.sube(H + 0.3, 2.5, 50, 62, 0.05);                                            // las hifas avanzan por el pelo
for (let i = 0; i < 5; i++) m.cruje(H + 0.5 + i * 0.5, 0.12);
m.golpe(H + 2.8, 0.25, 70);                                                    // llegan al grano
for (let i = 0; i < 8; i++) m.burbuja(A + 0.4 + i * 0.24, 0.07, 300 + i * 30); // células que crecen
for (let i = 0; i < 6; i++) m.tic(A + 0.8 + i * 0.25, 0.1, 1300);             // y se dividen
m.sube(MICRO + 0.2, 1.6, 48, 60, 0.07);                                        // el grano se infla como globo
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                            // ¿por qué se pone negro?
for (let i = 0; i < 46; i += 3) m.tic(Es + 0.3 + i * 0.05, 0.08, 900 + i * 15); // esporas que aparecen
for (let i = 0; i < 3; i++) m.burbuja(Es + 1.6 + i * 0.25, 0.1, 180);         // tres esporas grandes
m.golpe(E + 0.2, 0.3, 80);                                                     // tarjeta del estudio
for (let i = 0; i < 4; i++) { m.metal(E + 0.8 + i * 1.15 + 0.3, 0.06, 2600); m.gota(E + 0.8 + i * 1.15 + 0.4, 0.12, 1000); } // jeringa en cada elote
for (let i = 0; i < 6; i++) m.golpe(Co + 0.5 + i * 0.1, 0.12, 110);           // caen las agallas en la báscula
m.nota(Co + 1.2, 72, 0.06, 0.4); m.nota(Co + 1.35, 76, 0.06, 0.6);           // bip de la báscula
for (let i = 0; i < 14; i++) m.tic(Sa + 0.2 + i * 0.11, 0.08, 2400);          // cuentan los días
m.golpe(Sa + 2.4, 0.45, 65);                                                   // sello NO
m.nota(Sa + 3.0, 57, 0.05, 1.0, 0.6);                                          // sin color ni sabor (nota apagada)
for (let i = 0; i < 4; i++) m.tic(Ef + 0.3 + i * 0.15, 0.12, 900);            // alertas en el mundo
m.whoosh(Ef + 2.4, 0.8, 0.12);
for (let i = 0; i < 3; i++) m.nota(Ef + 2.9 + i * 0.45, [69, 72, 76][i], 0.06, 0.8); // los nombres en lenguas
m.zumbido(Mo + 0.3, 1.6, 0.02, 220);                                           // laboratorio
for (let i = 0; i < 4; i++) m.burbuja(Mo + 1.4 + i * 0.25, 0.08, 400);        // agallitas en la plántula
m.whoosh(C + 0.6, 1.0, 0.12); m.golpe(C + 1.6, 0.2, 100);                      // la agalla cae en la quesadilla
m.zumbido(C + 1.6, 2.4, 0.03, 140);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
