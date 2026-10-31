// gen-audio.mjs — cama grave + efectos del Shot Químico #54 (encendedor: butano líquido a presión). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Encendedor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 54);
const K = m.K;
const G = K.Gancho, Q = K.Que, P = K.Presion, V = K.Valvula, Ch = K.Chispa, F = K.Frio, Pr = K.Pregunta, S = K.Sol, Es = K.Estudio, Pi = K.Piedra, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 8; i++) m.burbuja(G + 0.05 + i * 0.32, 0.12, 380 + (i % 3) * 60);       // chapoteo del líquido al sacudir
m.golpe(G + 1.7, 0.25, 90);                                                                 // se tacha "¿lleno de gas?"
m.nota(Q + 0.2, 64, 0.06, 0.6); m.nota(Q + 1.1, 67, 0.06, 0.6); m.nota(Q + 1.7, 71, 0.06, 0.6); // las tres moléculas
for (let i = 0; i < 6; i++) m.burbuja(Q + 2.6 + i * 0.12, 0.08, 700);                       // hierve a −0.5 °C
for (let i = 0; i < 14; i++) m.tic(P + 0.4 + i * 0.32, 0.06, 1500 + (i % 3) * 300);         // moléculas que golpean la pared
m.sube(P + 1.4, 1.2, 50, 57, 0.05);                                                         // la aguja sube a 2 atm
m.tic(V + 0.4, 0.3, 2600);                                                                  // clic del botón
m.whoosh(V + 0.9, 2.6, 0.12);                                                               // siseo del gas
for (let i = 0; i < 10; i++) m.burbuja(V + 0.8 + i * 0.14, 0.07, 600);                     // hierve
m.cruje(Ch + 0.3, 0.5);                                                                     // rueda contra la piedrita
m.metal(Ch + 1.35, 0.2, 1100);                                                              // martillo contra el cristal
m.whoosh(Ch + 2.7, 0.7, 0.2);                                                               // "fuf" de la llama
for (let i = 0; i < 12; i++) m.burbuja(F + 0.3 + i * 0.2, 0.07, 650);
m.cruje(F + 1.4, 0.3);                                                                      // escarcha
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
for (let i = 0; i < 24; i++) m.tic(S + 0.6 + i * Math.max(0.08, 0.22 - i * 0.006), 0.06, 1700); // golpeteo cada vez más rápido
m.sube(S + 0.8, 2.2, 48, 60, 0.05);
m.golpe(S + 3.1, 0.3, 80);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 12; i++) m.nota(Es + 4.2 + i * 0.18, 72 - (i % 5), 0.03, 0.4);       // los fuegos se apagan
m.cruje(Pi + 4.8, 0.6); m.cruje(Pi + 6.0, 0.5);                                             // chispas del ferrocerio
m.golpe(Pi + 4.7, 0.3, 80);
m.whoosh(Ci + 0.2, 0.6, 0.15);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
