// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #44 (artemisinina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Artemisinina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, Mo = K.Mosquito, Ci = K.Cifra, Pl = K.Planta, Li = K.Libro, No = K.Nobel, Co = K.Cosecha, Pr = K.Pregunta,
  Ge = K.Genes, Qu = K.Quimica, Es = K.Estudio, Sa = K.Sanofi, Gi = K.Giro, Cr = K.Cierre, Ou = K.Outro;

m.pad(0, Gi, 0.05, [45, 52, 57]);
m.pad(Gi, Ou + 3.5, 0.045, [43, 50, 55]);                                        // el giro baja un tono
m.tic(G + 0.05, 0.25, 900); m.tic(G + 0.25, 0.2, 700);                           // la caja se abre
m.whoosh(G + 0.6, 0.7, 0.08); m.whoosh(G + 2.6, 0.7, 0.08);                     // las dos flechas
m.zumbido(Mo, 1.0, 0.07, 520);                                                    // el mosquito llega…
m.tic(Mo + 1.0, 0.25, 1600);                                                      // …y pica
m.whoosh(Mo + 1.6, 0.6, 0.1);                                                     // la lupa se abre
for (let i = 0; i < 7; i++) m.burbuja(Mo + 2.4 + i * 0.15, 0.07, 400 + (i % 3) * 80); // parásitos que aparecen
m.golpe(Ci + 0.3, 0.3, 70); m.golpe(Ci + 1.8, 0.25, 60);                        // las dos cifras
m.nota(Pl + 1.8, 69, 0.06, 0.9); m.metal(Pl + 2.4, 0.12, 900);                  // la molécula y su puente O–O
m.whoosh(Li, 0.8, 0.07);                                                          // el libro se abre
for (let i = 0; i < 14; i++) m.burbuja(Li + 2.6 + i * 0.07, 0.05, 700 + (i % 4) * 120); // olla hirviendo
m.gota(Li + 3.6, 0.2, 900);                                                       // agua fría
m.golpe(Li + 4.6, 0.2, 90); m.nota(Li + 4.4, 76, 0.06, 0.6);                     // tache y palomita
m.golpe(No + 0.2, 0.3, 80); m.metal(No + 1.6, 0.18, 1200);                       // sello 1972 y medalla
m.whoosh(Co, 2.4, 0.06);                                                          // viento del campo
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                              // la pregunta
m.burbuja(Pr + 1.0, 0.1, 500);                                                    // la yema
m.whoosh(Ge, 0.6, 0.08);
for (let i = 0; i < 4; i++) m.tic(Ge + 1.2 + i * 0.6, 0.2, 1500 + i * 200);       // pasos de la línea de montaje
for (let i = 0; i < 5; i++) m.burbuja(Qu + 0.6 + i * 0.2, 0.08, 600);            // salen de la célula
m.metal(Qu + 2.2, 0.16, 820);                                                     // se cierra el puente O–O
m.golpe(Es + 0.2, 0.3, 80); m.motor(Es, 6, 0.04);                                // tarjeta 2013 y el tanque
for (let i = 0; i < 12; i++) m.burbuja(Es + 2.6 + i * 0.17, 0.05, 500 + i * 30); // el medidor sube
m.sube(Es + 2.6, 2.0, 57, 69, 0.04);
m.metal(Sa + 0.2, 0.12, 700);                                                     // la fábrica
m.sube(Gi - 0.1, 0.6, 64, 50, 0.06);                                              // el apagón
m.golpe(Gi + 1.8, 0.35, 60);                                                      // la balanza se inclina
m.whoosh(Cr + 0.2, 0.6, 0.07); m.whoosh(Cr + 1.2, 0.6, 0.07);                   // las dos flechas del cierre
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
