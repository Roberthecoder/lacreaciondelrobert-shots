// gen-audio.mjs — cama grave + efectos del Shot Químico #56 (merengue). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Merengue base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
const G = K.Gancho, Cl = K.Clara, Ba = K.Batir, De = K.Desdoblar, Re = K.Red, Az = K.Azucar, Pr = K.Pregunta, Es = K.Estudio, Gr = K.Grasa, Ga = K.Garbanzo, Ci = K.Cierre, Ou = K.Outro;
const batM = Ba + 1.5, hornoAt = Az + 2.4, probAt = Es + 2.8, compAt = Ga + 5.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.02, 0.8, 0.12);                                                         // el batidor sale y deja el pico
m.sube(G + 0.05, 0.8, 60, 72, 0.05);
m.metal(G + 1.9, 0.08, 600);                                                           // se tacha "¿solo azúcar?"
for (let i = 0; i < 9; i++) m.burbuja(G + 2.4 + i * 0.12, 0.06, 700 + (i % 4) * 80);   // burbujitas
m.cruje(Cl + 0.2, 0.4);                                                                // crac del huevo
m.gota(Cl + 1.3, 0.25, 500);                                                           // la clara cae
for (let i = 0; i < 6; i++) m.tic(Cl + 0.7 + i * 0.2, 0.05, 1800);                    // medidor
m.whoosh(Cl + 2.2, 0.5, 0.08);                                                         // se abre la lupa
m.nota(Cl + 3.4, 69, 0.06, 0.7);                                                       // ovalbúmina en dorado
m.zumbido(Ba, 1.5, 0.06, 160);                                                         // el batidor
for (let i = 0; i < 16; i++) m.burbuja(batM + 0.4 + i * 0.09, 0.06, 500 + (i % 5) * 70); // se pegan a la burbuja
for (let i = 0; i < 7; i++) m.sube(De + 0.4 + i * 0.25, 0.5, 64, 71, 0.03);            // se desdoblan
for (let i = 0; i < 16; i++) m.tic(Re + 0.2 + i * 0.1, 0.06, 2200);                   // clic de los ganchitos
m.burbuja(Re + 2.3, 0.12, 300); m.burbuja(Re + 2.8, 0.08, 320);                        // rebote
for (let i = 0; i < 14; i++) m.tic(Az + 0.3 + i * 0.09, 0.04, 3200);                  // lluvia de azúcar
m.metal(hornoAt + 1.8, 0.12, 1300);                                                    // ding del horno
m.gota(Pr + 0.8, 0.35, 420);                                                           // plop de la yema
m.sube(Pr + 0.9, 1.4, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);                                                           // tarjeta
for (let i = 0; i < 18; i++) m.burbuja(probAt + 0.3 + i * 0.13, 0.05, 600 + (i % 5) * 60);
m.nota(probAt + 1.0, 57, 0.06, 0.9, 0.6);                                              // menos espuma (ahogado)
m.pad(Gr, Ga, 0.025, [51, 57], 0.6);                                                   // la grasa: tapado
for (let i = 0; i < 8; i++) m.gota(Gr + 0.8 + i * 0.12, 0.08, 700);
for (let i = 0; i < 6; i++) m.tic(Gr + 3.0 + i * 0.15, 0.06, 1500);                   // se sueltan
m.burbuja(Gr + 4.4, 0.25, 240);                                                        // pop
m.motor(Ga, 2.4, 0.05);                                                                // hervor
m.whoosh(Ga + 1.0, 1.3, 0.08);                                                         // chorro
m.zumbido(Ga + 2.4, 1.4, 0.05, 160);
m.golpe(Ga + 3.9, 0.35, 80);                                                           // tarjeta 2025
for (let i = 0; i < 8; i++) m.nota(compAt + 0.6 + i * 0.1, 69 + (i % 4) * 3, 0.04, 0.4); // estrellitas iguales
for (let i = 0; i < 10; i++) m.burbuja(Ci + 0.6 + i * 0.12, 0.05, 650);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
