// gen-audio.mjs — cama grave + efectos del Shot Ambiental #43 (huella de carbono de la comida). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huella Comida base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 43);
const K = m.K;
const G = K.Gancho, R = K.Res, F = K.Frijol, E = K.Escalera, P = K.Pregunta, Tr = K.Transporte, Es = K.Estudio, Ch = K.Chocolate, I = K.Idea, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.golpe(G + 0.05, 0.3, 80);                                   // el plato se asienta
m.whoosh(G + 0.1, 2.2, 0.09); m.burbuja(G + 0.7, 0.05, 900);   // nube grande (res) y nubecita (frijol)
m.nota(G + 1.5, 62, 0.06, 0.9);                               // ×55
m.tic(R + 0.3, 0.06, 1400); m.sube(R + 0.3, 1.0, 43, 67, 0.06); // barra de la res
m.tic(F + 0.2, 0.05, 1800); m.nota(F + 0.3, 79, 0.04, 0.4);     // barrita de legumbres
m.nota(E + 0.4, 62, 0.05, 0.6); m.nota(E + 2.0, 57, 0.05, 0.6); m.nota(E + 3.4, 55, 0.05, 0.6); // queso, cerdo, pollo
m.sube(P + 0.05, 1.3, 50, 62, 0.05);
m.whoosh(Tr + 0.2, 1.0, 0.06); for (let i = 0; i < 6; i++) m.tic(Tr + 0.3 + i * 0.45, 0.03, 900); // camioncito
m.sube(Tr + 1.1, 0.8, 45, 57, 0.05); m.tic(Tr + 1.9, 0.07, 2200);                                 // barra por etapas · tajadita del transporte
m.golpe(Tr + 3.8, 0.3, 60); m.cruje(Tr + 4.4, 0.25);                                              // metano · tala
m.golpe(Es + 0.3, 0.25, 100); for (let i = 0; i < 14; i++) m.burbuja(Es + 2.0 + i * 0.25, 0.03, 600 + i * 40); // granjas
m.sube(Ch + 0.5, 1.0, 50, 62, 0.04); m.cruje(Ch + 1.6, 0.3); m.sube(Ch + 2.0, 1.0, 50, 64, 0.06); m.nota(Ch + 3.0, 69, 0.05, 0.8);
for (let i = 0; i < 7; i++) m.tic(I + 0.1 + i * 0.12, 0.04, 1500);                                 // calendario
m.nota(I + 2.2, 64, 0.04, 0.6); m.golpe(I + 4.5, 0.3, 70);                                          // cambia un día · balanza
m.whoosh(C - 0.4, 2.0, 0.08); m.tic(C + 1.6, 0.06, 1200);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
