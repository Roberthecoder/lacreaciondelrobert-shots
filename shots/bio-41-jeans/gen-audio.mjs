// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #41 (jeans deslavados con enzimas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Jeans base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, Hi = K.Hilos, An = K.Anillo, Pi = K.Piedra, Pb = K.Problema, Pr = K.Pregunta, Ce = K.Celulasa, Mo = K.Mordida,
  Gr = K.Gramos, Ay = K.Ayudantes, Es = K.Estudio, Ti = K.Tiendas, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Pi, 0.05, [45, 52, 57]);
m.pad(Pi, Pr, 0.05, [43, 50, 55], 0.6);                                   // la piedra: música tapada
m.pad(Pr, Ou + 3.5, 0.05, [45, 52, 57]);                                  // la enzima: se destapa
m.whoosh(G + 0.05, 0.8, 0.12); m.golpe(G + 0.9, 0.35, 70);                // la piedra cae y rebota
m.tic(G + 1.5, 0.2, 900);                                                 // tachón
for (let i = 0; i < 6; i++) m.nota(G + 1.7 + i * 0.15, 64 + i * 2, 0.04, 0.5); // brota el hongo
m.whoosh(Hi + 0.05, 0.6, 0.1);                                            // se abre la Lupa
for (let i = 0; i < 8; i++) m.nota(An + 0.3 + i * 0.24, 60 - i, 0.04, 0.5); // el índigo entra por fuera y se detiene
m.motor(Pi + 0.1, Pr - Pi - 0.3, 0.07);                                   // tambor girando
for (let i = 0; i < 18; i++) m.tic(Pi + 0.3 + i * 0.4, 0.1, 500 + (i % 3) * 120); // piedras golpeando
for (let i = 0; i < 3; i++) m.metal(Pb + 0.25 + i * 0.35, 0.18, 420);     // abolladuras
m.whoosh(Pb + 1.4, 1.2, 0.1);                                             // polvo
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                      // la pregunta
for (let i = 0; i < 3; i++) { m.burbuja(Ce + 1.0 + i * 0.3, 0.1, 500); m.tic(Ce + 2.6 + i * 0.5, 0.18, 1500); } // salen las enzimas y cortan
GRANOS_T();
function GRANOS_T() { for (let i = 0; i < 26; i++) { const t = Mo + 0.4 + (0.15 + ((i * 7) % 26) / 26 * 0.8) * (Gr - 0.3 - Mo - 0.4); m.tic(t, 0.08, 1700); m.nota(t + 0.02, 76 - (i % 12), 0.025, 0.3); } }
m.golpe(Gr + 1.4, 0.3, 90);                                               // tachan los kilos
for (let i = 0; i < 10; i++) m.tic(Ay + 0.4 + i * 0.22, 0.08, 1300);       // la amilasa quita el almidón
m.sube(Ay + 2.0, 2.4, 60, 67, 0.04);                                      // la lacasa aclara
m.golpe(Es + 0.2, 0.35, 80);                                              // tarjeta del estudio
m.cruje(Es + 4.0, 0.4);                                                   // el índigo se parte
for (let i = 0; i < 6; i++) m.burbuja(Ti + 0.8 + i * 0.6, 0.06, 380);      // crece el moho
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
