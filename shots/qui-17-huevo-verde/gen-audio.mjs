// gen-audio.mjs — cama grave + efectos del Shot Químico #17 (el anillo verde del huevo cocido). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huevo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 117);
const K = m.K;
const G = K.Gancho, Q = K.Que, Ga = K.Gas, Vi = K.Viaje, Re = K.Reaccion, Pr = K.Pregunta, Es = K.Estudio, Tr = K.Treinta, Fr = K.Frio, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;
const esFrio = Es + 3.4, esParte = Es + 5.6, frMacro = Fr + 3.1;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.0, 0.45, 0.12); m.golpe(G + 0.45, 0.35, 120);                          // el cuchillo corta
m.whoosh(G + 0.5, 0.6, 0.06); m.golpe(G + 2.4, 0.25, 90);                             // se abre · tache
m.nota(G + 3.6, 62, 0.06, 0.9);                                                       // FeS
for (let i = 0; i < 6; i++) m.nota(Q + 0.3 + i * 0.15, 69 + (i % 3) * 2, 0.04, 0.4); // aparecen los S
for (let i = 0; i < 5; i++) m.nota(Q + 1.9 + i * 0.12, 57 + (i % 2) * 3, 0.04, 0.4); // aparecen los Fe
for (let i = 0; i < 30; i++) m.burbuja(Ga + 0.2 + i * 0.17, 0.06, 450 + (i % 5) * 70); // la olla hierve
for (let i = 0; i < 9; i++) m.whoosh(Ga + 1.2 + i * 0.35, 0.3, 0.03);                 // sale el H₂S
m.golpe(Ga + 3.2, 0.2, 140);                                                          // ¡fuchi!
for (let i = 0; i < 8; i++) m.whoosh(Vi + 0.2 + i * 0.45, 0.5, 0.03);                 // el gas viaja
for (let i = 0; i < 8; i++) m.tic(Re + 0.4 + i * 0.3, 0.1, 1700);                     // H₂S + Fe → FeS
m.zumbido(Re + 1.0, 3.5, 0.03, 120);                                                  // la capa crece
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 12; i++) m.tic(Es + 0.8 + i * 0.22, 0.05, 2200);                  // reloj a 15 min
m.whoosh(esFrio, 1.8, 0.07);                                                          // chorro de agua fría
m.golpe(esParte, 0.3, 100); m.nota(esParte + 0.1, 64, 0.05, 0.8); m.nota(esParte + 0.3, 60, 0.05, 0.8);
for (let i = 0; i < 6; i++) m.tic(Tr + 0.2 + i * 0.25, 0.05, 2200);                   // reloj a 30 min
m.golpe(Tr + 1.7, 0.4, 70); m.bajo(Tr + 1.75, 40, 0.12, 0.8);                         // más intenso
m.sube(Fr + 0.4, 2.2, 64, 52, 0.04);                                                  // se enfría
m.whoosh(Fr + 0.6, 2.2, 0.04);                                                        // el gas sale
for (let i = 0; i < 4; i++) m.gota(frMacro + 0.1 + i * 0.12, 0.12, 700 + i * 80);     // hielos
m.metal(frMacro + 0.3, 0.08, 1200);
for (let i = 0; i < 20; i++) m.tic(Da + 0.2 + i * 0.1, 0.04, 2600);                   // reloj veloz a 7 h
m.golpe(Da + 2.6, 0.35, 90);
m.nota(Ci + 1.4, 69, 0.06, 1.0); m.nota(Ci + 1.4, 73, 0.05, 1.0);                     // no hace daño
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
