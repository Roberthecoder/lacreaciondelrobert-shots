// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #33 (KJ y la edición de bases). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot BebeKJ base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 33);
const K = m.K;
const G = K.Gancho, KJ = K.KJ, Le = K.Letra, Pe = K.Peligro, Tr = K.Trasplante, Se = K.Seis, Ed = K.Editor, Bu = K.Burbujas,
  Pr = K.Pregunta, Ca = K.Casgevy, Es = K.Estudio, Re = K.Resultado, Ex = K.Extra, Ci = K.Cierre, Ou = K.Outro;

// La música cuenta el estado: tapada y tensa mientras el amoniaco no se puede quitar; se abre cuando la letra cambia.
m.pad(0, Ed + 2.7, 0.05, [45, 52, 57], 0.55);
m.pad(Ed + 2.7, Ou + 3.5, 0.05, [45, 52, 57, 61]);
m.whoosh(G + 0.15, 1.0, 0.18);                                               // los frascos se van
m.nota(G + 1.2, 76, 0.07, 1.2);                                              // queda uno
m.whoosh(KJ + 0.4, 0.5, 0.1);                                                // la Lupa se abre
for (let i = 0; i < 7; i++) m.burbuja(KJ + 0.9 + i * 0.3, 0.06, 300);        // nubecitas de amoniaco
for (let i = 0; i < 9; i++) m.tic(Le + 0.2 + i * 0.08, 0.08, 1800);          // las letras aparecen
for (let i = 0; i < 6; i++) m.nota(Le + 1.0 + i * 0.4, 81, 0.03, 0.15);      // la letra roja parpadea
m.golpe(Le + 1.7, 0.2, 70);                                                  // la enzima rota
m.zumbido(Pe + 0.4, 2.2, 0.05, 160);                                          // el medidor sube
m.sube(Pe + 0.4, 2.0, 50, 62, 0.04);
m.golpe(Pe + 3.0, 0.35, 75);                                                 // 50 %
m.metal(Tr + 0.3, 0.12, 600);                                                // la hielera
for (let i = 0; i < 8; i++) m.tic(Tr + 1.0 + i * 0.4, 0.06, 2600);            // tic-tac del reloj
for (let i = 0; i < 6; i++) m.whoosh(Se + 0.3 + i * 0.42, 0.25, 0.08);       // seis hojas del calendario
m.nota(Se + 2.7, 72, 0.06, 0.8);                                             // el frasco de KJ
m.tic(Ed + 0.4, 0.2, 3200); m.tic(Ed + 0.55, 0.2, 3000);                     // tijeras
m.golpe(Ed + 1.0, 0.2, 110);                                                 // tachadas
m.whoosh(Ed + 1.6, 1.0, 0.12);                                               // llega el editor
m.nota(Ed + 2.8, 76, 0.08, 1.4); m.nota(Ed + 2.8, 81, 0.06, 1.4);            // la letra cambia
for (let i = 0; i < 5; i++) m.burbuja(Bu + i * 0.3 + 1.4, 0.1, 450);         // cada nanopartícula entra
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);                                         // pregunta
m.gota(Ca + 0.6, 0.15, 800); m.whoosh(Ca + 1.8, 0.6, 0.08); m.gota(Ca + 2.6, 0.2, 600);   // fuera: sangre, regreso, quimio
for (let i = 0; i < 4; i++) m.burbuja(Ca + 1.0 + i * 0.5, 0.06, 500);        // dentro: burbujitas
m.golpe(Es + 0.2, 0.3, 80);                                                  // tarjeta del estudio
for (let i = 0; i < 6; i++) m.gota(Es + 1.0 + i * 0.62, 0.12, 1000);         // goteo del suero
for (let i = 0; i < 3; i++) m.gota(Re + 0.2 + i * 0.35, 0.2, 900 - i * 80);  // las tres dosis
m.nota(Re + 1.4, 69, 0.05, 0.6); m.nota(Re + 1.9, 72, 0.05, 0.6);
for (let i = 0; i < 6; i++) m.tic(Ex + 0.3 + i * 0.45, 0.1, 900);            // pasitos
m.golpe(Ex + 0.6, 0.2, 100);                                                 // la revista
for (let i = 0; i < 4; i++) m.tic(Ci + 0.4 + i * 0.4, 0.08, 900);            // pasitos en la cuna
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
