// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #12 (faboterápico antialacrán). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Antiveneno base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 12);
const K = m.K;
const G = K.Gancho, Do = K.Dosis, Ap = K.Aprende, Pl = K.Plasma, An = K.Anticuerpo, Pe = K.Pepsina, Pr = K.Pregunta,
  Es = K.Estudio, Re = K.Resultado, Fd = K.FDA, Mx = K.Mexico, Mu = K.Muertes, Ci = K.Cierre, Ou = K.Outro;
const crono0 = Re + 0.3;

// cama grave continua: tapada mientras hay veneno y niños graves, libre cuando se alivian
m.pad(0, Re + 1.0, 0.05, [45, 52, 57], 0.5);
m.pad(Re + 1.0, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
for (let i = 0; i < 16; i++) m.tic(G + i * 0.15, 0.05, 2600 + (i % 2) * 500);          // pasitos del alacrán (cuadro 0)
m.golpe(G + 2.2, 0.25, 110);                                                             // se tacha la máquina
m.sube(G + 2.6, 0.7, 60, 67, 0.05);                                                      // asoma el caballo
m.whoosh(Do + 0.2, 0.7, 0.12);                                                           // llega la jeringa
for (let k = 0; k < 4; k++) { m.gota(Do + 1.0 + k * 0.75, 0.16, 900); m.nota(Do + 1.0 + k * 0.75, 57 + k * 3, 0.05, 0.5); } // 4 dosis que suben
for (let k = 0; k < 6; k++) m.tic(Ap + 0.2 + k * ((Pl - Ap - 0.6) / 6), 0.1, 1500);    // hojas del calendario: 6 meses
m.whoosh(Ap + 0.3, 0.5, 0.1);                                                            // se abre la lupa
for (let i = 0; i < 8; i++) m.nota(Ap + 0.6 + i * 0.28, m.ESC[4 + (i % 5)], 0.035, 0.4); // aparecen anticuerpos
for (let i = 0; i < 10; i++) m.burbuja(Pl + 0.3 + i * 0.17, 0.07, 450 + (i % 3) * 60);  // la bolsa se separa
m.whoosh(Pl + 2.0, 0.6, 0.1);                                                            // lo rojo regresa
for (let i = 0; i < 4; i++) m.metal(An + 1.8 + [0, 0.5, 1.1, 1.6][i], 0.1, 1200);       // clic: toxina atrapada
m.zumbido(Pe, 1.2, 0.04, 160);                                                           // llega la pepsina
m.cruje(Pe + 1.3, 0.5);                                                                  // muerde: la base se deshace
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                     // re-gancho
m.golpe(Es + 0.2, 0.3, 80);                                                              // tarjeta del estudio
for (let k = 0; k < 4; k++) m.tic(crono0 + k * ((Fd - 0.3 - crono0) / 4), 0.12, 1000);  // un tic por hora (4 h)
for (let i = 0; i < 8; i++) m.nota(crono0 + 0.6 + i * 0.38, m.ESC[5 + i], 0.06, 0.7);   // 8 campanitas: los 8 con suero
m.nota(crono0 + 2.8, 64, 0.06, 0.9, 0.6);                                                // 1 sola, ahogada: placebo
m.golpe(Fd + 0.45, 0.45, 70);                                                            // sello FDA
for (let i = 0; i < 15; i++) m.tic(Mx + 0.45 + i * 0.09, 0.06, 1800);                   // un pop por estado en el mapa
m.metal(Mx + 3.1, 0.12, 700);                                                            // Jalisco
m.latido(Mu + 0.4, 0.18); m.latido(Mu + 2.0, 0.08);                                      // 500 → menos de 50
for (let i = 0; i < 10; i++) m.tic(Ci + 1.0 + i * 0.16, 0.04, 2600);                    // el alacrán se va
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
