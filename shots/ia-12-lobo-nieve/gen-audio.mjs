// gen-audio.mjs — cama grave + efectos del Shot IA #12 (atajos de la IA: la nieve, el hospital, la tinta). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot LoboNieve base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, F = K.Fotos, R = K.Regla, Pu = K.Prueba, P = K.Pregunta, H = K.Hospital, Fi = K.Ficha, L = K.Lunares, Re = K.Recorte, C = K.Cierre, Ou = K.Outro;
const PU2 = Pu + 5.8, H2 = H + 5.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(0, 1.2, 0.05);                                                            // viento de nieve
m.zumbido(G + 0.05, 0.9, 0.04, 260);                                              // el escáner barre la foto
m.golpe(G + 0.9, 0.4, 80); m.nota(G + 0.95, 72, 0.05, 0.5);                        // «LOBO ✔»
for (let i = 0; i < 9; i++) m.tic(G + 1.5 + i * 0.09, 0.08, 1500 + i * 60);         // se encienden las zonas
m.golpe(F + 0.2, 0.35, 80);                                                       // tarjeta 2016
for (let i = 0; i < 20; i++) m.tic(F + 2.3 + i * 0.08, 0.07, i < 10 ? 2600 : 1900); // obturador de 20 fotos
m.golpe(F + 4.4, 0.3, 70);                                                        // «mal a propósito»
m.whoosh(R, 0.5, 0.1); m.zumbido(R + 1.0, 0.9, 0.04, 260); m.golpe(R + 2.0, 0.45, 60); m.nota(R + 2.05, 58, 0.05, 0.6, 0.6); // «LOBO ✖»
for (let i = 0; i < 27; i++) m.tic(Pu + 0.3 + i * 0.05, 0.05, 1200 + (i % 9) * 80); // aparecen los 27
for (let i = 0; i < 10; i++) m.burbuja(Pu + 2.6 + i * 0.18, 0.07, 600);             // 10 confían
m.whoosh(PU2 - 0.2, 0.5, 0.1);
for (let i = 0; i < 25; i++) m.gota(PU2 + 0.6 + i * 0.072, 0.05, 1400);             // 25 ven la nieve
m.sube(P + 0.05, 1.4, 50, 62, 0.05);                                               // la pregunta
m.golpe(H + 0.2, 0.35, 80);
for (let i = 0; i < 3; i++) m.golpe(H + 2.6 + i * 0.3, 0.25, 90 + i * 15);         // los 3 hospitales
m.sube(H2 + 0.3, 1.1, 52, 64, 0.04); m.sube(H2 + 1.9, 0.6, 52, 53, 0.03);          // barras 34 % y 1 %
m.zumbido(Fi + 0.3, 1.2, 0.03, 180);                                              // escaneo de la placa
m.metal(Fi + 1.6, 0.25, 900);                                                      // la ficha de metal
[0, 0.3, 0.6].forEach((d, i) => m.nota(Fi + 2.6 + d, 67 + i * 2, 0.05, 0.4));     // 3 cifras
m.golpe(L + 0.2, 0.35, 80); m.nota(L + 1.2, 72, 0.05, 0.4);                         // tarjeta 2019 · «sano»
m.whoosh(L + 2.4, 0.8, 0.08);                                                      // trazo de tinta
m.golpe(L + 3.2, 0.45, 60); m.nota(L + 3.25, 58, 0.05, 0.6, 0.6);                  // «MELANOMA ✖»
for (let i = 0; i < 18; i++) m.tic(L + 4.6 + i * 0.11, 0.06, 900 + (i % 4) * 70);   // los lunares que se ponen rojos
for (let i = 0; i < 6; i++) m.tic(Re + 0.15 + i * 0.17, 0.12, 3000);                // tijeras
m.nota(Re + 1.3, 72, 0.06, 0.6); m.nota(Re + 1.35, 76, 0.05, 0.6);                 // «sano ✔»
m.whoosh(C + 1.6, 0.6, 0.08); m.zumbido(C + 2.6, 0.7, 0.04, 260);
m.golpe(C + 3.3, 0.35, 70); m.nota(C + 3.9, 72, 0.06, 0.8); m.nota(C + 3.95, 76, 0.05, 0.8); m.nota(C + 4.0, 79, 0.04, 0.8); // atajo descubierto
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
