// gen-audio.mjs — cama grave + efectos del Shot Químico #29 (desodorante vs. antitranspirante). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Desodorante base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, Su = K.Sudor, Ba = K.Bacterias, Ol = K.Olor, De = K.Desodorante, An = K.Antitranspirante, Pr = K.Pregunta, Es = K.Estudio, Pb = K.Prueba, Cu = K.Curioso, Al = K.Aluminio, Ci = K.Cierre, Ou = K.Outro;
const micro = Su + 1.8;

m.pad(0, Ou + 3.7, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.12);                                                                // el brazo sube
m.zumbido(G + 0.4, 1.6, 0.03, 160);                                                    // ondas de olor
for (let i = 0; i < 5; i++) m.tic(G + 2.2 + i * 0.12, 0.08, 2000);                    // aparecen las bacterias
m.golpe(G + 1.9, 0.25, 95);                                                            // se tacha el mito
m.sube(Su + 0.1, 0.8, 57, 69, 0.05);                                                   // se abre la lupa
m.whoosh(micro - 0.3, 0.7, 0.1);                                                       // entra al microscopio
m.gota(micro + 0.2, 0.2, 800);                                                         // la gota sale del poro
m.nota(micro + 1.4, 64, 0.05, 0.6);
for (let i = 0; i < 4; i++) m.burbuja(Ba + 0.2 + i * 0.3, 0.06, 400 + i * 60);        // llegan las bacterias
for (const t of [Ba + 2.4, Ba + 2.9, Ba + 3.4]) { m.tic(t, 0.22, 2600); m.metal(t + 0.02, 0.06, 1200); } // ¡clic!
for (let i = 0; i < 3; i++) m.sube(Ol + i * 0.3, 1.2, 60 + i * 3, 67 + i * 3, 0.03); // suben los odorantes
m.zumbido(Ol + 1.2, 2.2, 0.04, 140);                                                   // la nube
for (let i = 0; i < 4; i++) m.burbuja(De + 1.0 + i * 0.2, 0.12, 700);                          // flores de perfume
for (let i = 0; i < 4; i++) m.nota(De + 2.4 + i * 0.15, 79 + i * 2, 0.04, 0.3);       // destellos antimicrobianos
for (let i = 0; i < 9; i++) m.tic(An + 0.8 + i * 0.22 + 1.3, 0.1, 1500);               // iones que llegan
m.golpe(An + 3.4, 0.3, 75);                                                            // se cierra el tapón
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);                                                           // tarjeta 2020
m.metal(Es + 4.6, 0.15, 1500); m.tic(Es + 4.6, 0.25, 2600);                           // la tijera corta
m.whoosh(Pb + 0.5, 1.4, 0.08);                                                         // viaja el gen
m.nota(Pb + 2.1, 69, 0.06, 0.6); m.nota(Pb + 2.4, 72, 0.06, 0.8);
for (let i = 0; i < 6; i++) m.tic(Cu + 0.2 + i * 0.24, 0.06, 1200);                   // línea de tiempo
m.burbuja(Cu + 2.0, 0.15, 500);                                                                 // llega nuestra especie
m.nota(Al + 0.8, 57, 0.05, 1.0, 0.6); m.nota(Al + 1.2, 60, 0.05, 1.0, 0.6);
m.golpe(Al + 2.4, 0.3, 80);                                                            // tarjeta ACS
m.sube(Ci + 0.6, 0.8, 57, 69, 0.05); m.tic(Ci + 1.4, 0.2, 2600);                      // lupa y corte final
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
