// gen-audio.mjs — cama grave + efectos del Shot Químico #27 (sílica gel). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Silica base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 127);
const K = m.K;
const G = K.Gancho, Q = K.Que, Su = K.Superficie, Si = K.Silanol, Ad = K.Adsorcion, Pr = K.Pregunta, Ri = K.Riesgo, Es = K.Estudio, Sn = K.Sintomas, Cu = K.Curioso, Ci = K.Cierre, Ou = K.Outro;
const riMitad = Ri + 4.2;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.0, 0.8, 0.14);                                                         // el sobre sale del tenis
m.cruje(G + 1.25, 0.7);                                                               // se rasga
for (let i = 0; i < 16; i++) { m.tic(G + 1.75 + i * 0.05, 0.12, 2600 + (i % 4) * 300); m.tic(G + 2.0 + i * 0.06, 0.06, 3200); } // bolitas que rebotan
m.whoosh(G + 3.0, 1.2, 0.06);                                                         // vapor
m.golpe(Q + 0.1, 0.3, 90); m.nota(Q + 1.0, 64, 0.06, 0.8);                            // arena · SiO₂
for (let i = 0; i < 10; i++) m.tic(Q + 2.6 + i * 0.18, 0.08, 1800);                   // se abren los poros
m.sube(Su + 0.6, 2.2, 52, 69, 0.05); m.golpe(Su + 2.8, 0.35, 75);                     // se despliega la cancha
for (let i = 0; i < 8; i++) { m.burbuja(Si + 0.6 + i * 0.45, 0.06, 500); m.tic(Si + 1.5 + i * 0.45, 0.1, 2200); } // cada agua que se pega
m.gota(Ad + 0.4, 0.15, 800); m.gota(Ad + 0.9, 0.15, 850);
for (let i = 0; i < 5; i++) m.tic(Ad + 1.9 + i * 0.2, 0.09, 2000);
m.nota(Ad + 2.7, 76, 0.07, 0.6);                                                      // la "d"
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Ri + 1.6, 0.35, 70);                                                          // ⚠
for (let i = 0; i < 5; i++) m.nota(riMitad + 1.3 + i * 0.45, 67 + i * 2, 0.05, 0.5);  // azul → rosa
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) m.metal(Es + 3.5 + i * 0.4, 0.07, 1300);                  // teléfono
m.sube(Es + 5.8, 1.2, 55, 62, 0.04);
for (let i = 0; i < 10; i++) m.tic(Sn + 0.2 + i * 0.12, 0.05, 1500);
m.nota(Sn + 1.9, 60, 0.07, 0.8);
m.golpe(Cu + 0.5, 0.25, 90); m.golpe(Cu + 1.1, 0.35, 70);
m.whoosh(Ci + 0.4, 0.6, 0.1);
for (let i = 0; i < 8; i++) m.gota(Ci + 1.0 + i * 0.35, 0.08, 900 + i * 30);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
