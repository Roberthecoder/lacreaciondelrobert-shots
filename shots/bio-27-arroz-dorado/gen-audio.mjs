// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #27 (arroz dorado). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// La música cuenta el estado: tapada mientras la "fábrica" del grano está apagada, libre cuando se enciende.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot ArrozDorado base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 27);
const K = m.K;
const G = K.Gancho, H = K.Hojas, Gr = K.Grano, Ge = K.Genes, Ca = K.Camino, Pr = K.Pregunta, In = K.Intestino, Oj = K.Ojos,
  Ni = K.Ninos, Ma = K.Maiz, Es = K.Estudio, Fi = K.Filipinas, Ci = K.Cierre, Ou = K.Outro;

// cama: tapada hasta que el grano se enciende, abierta después; se vuelve a tapar en la escena de los ojos
m.pad(0, Ca, 0.05, [45, 52, 57], 0.55);
m.pad(Ca, Oj, 0.05, [45, 52, 57, 64], 0);
m.pad(Oj, Ni, 0.05, [43, 50, 55], 0.7);
m.pad(Ni, Ou + 3.5, 0.05, [45, 52, 57, 64], 0.1);

m.metal(G + 0.4, 0.22, 1300);                                                       // la cuchara toca el plato
for (let i = 0; i < 4; i++) m.tic(G + 0.5 + i * 0.12, 0.08, 2600);                    // granos que saltan
m.golpe(G + 1.6, 0.25, 90);                                                          // se tacha "¿pintado?"
m.sube(H + 1.2, 1.0, 57, 64, 0.04);                                                  // las hojas se encienden de naranja
m.golpe(H + 3.4, 0.25, 80);                                                          // "no en el grano"
m.whoosh(Gr + 0.3, 0.6, 0.15);                                                       // se abre la Lupa
m.tic(Gr + 1.0, 0.18, 900);                                                          // interruptor apagado
m.burbuja(Ge + 1.0, 0.18, 700); m.burbuja(Ge + 1.8, 0.18, 700);                                        // salen los genes
m.nota(Ge + 2.6, 69, 0.06, 0.5); m.nota(Ge + 3.4, 72, 0.06, 0.6);                    // entran al grano
m.tic(Ca + 0.05, 0.2, 1100);                                                         // interruptor: encendido
[60, 64, 67, 72].forEach((n, i) => m.nota(Ca + 0.4 + i * 0.35, n, 0.07, 0.6));        // una nota por paso de la línea
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);                                                 // pregunta
m.cruje(In + 1.0, 0.4);                                                              // las tijeras cortan la molécula
m.nota(In + 1.5, 76, 0.06, 0.9);                                                     // vitamina A
m.whoosh(Oj + 0.2, 1.4, 0.08);                                                       // cae la noche
m.nota(Oj + 2.2, 52, 0.05, 1.4, 0.6);                                                // la córnea se nubla
for (let i = 0; i < 95; i += 5) m.nota(Ni + 0.4 + i * 0.03, 64 + (i % 10 ? 0 : 3), 0.025, 0.25); // figuras que se llenan
m.golpe(Ni + 0.6, 0.3, 80);
m.whoosh(Ma + 0.3, 0.9, 0.12);                                                       // sale el narciso, entra el maíz
m.sube(Ma + 1.6, 3.0, 55, 79, 0.05);                                                 // el pigmento sube ×23
m.golpe(Es + 0.2, 0.32, 80);                                                         // tarjeta del estudio
for (let i = 0; i < 5; i++) m.gota(Es + 3.0 + i * 0.25, 0.14, 900 + i * 80);           // cinco gotas de vitamina A
for (let i = 0; i < 18; i++) m.burbuja(Fi + 0.6 + i * 0.05, 0.06, 700);                         // brotan las plantitas
m.golpe(Fi + 0.6, 0.3, 90);                                                          // sello 2021
m.golpe(Fi + 2.2, 0.45, 70); m.metal(Fi + 2.2, 0.08, 400);                           // mazo + sello 2024
m.whoosh(Ci + 0.4, 0.6, 0.12);                                                       // Lupa del cierre
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
