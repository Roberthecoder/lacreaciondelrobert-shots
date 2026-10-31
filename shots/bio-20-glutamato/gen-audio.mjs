// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #20 (glutamato). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Glutamato base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 20);
const K = m.K;
const G = K.Gancho, Ko = K.Kombu, Ta = K.Tanque, PD = K.PorDentro, Bi = K.Biotina, Ca = K.Canal, Pr = K.Pregunta, An = K.Antes,
  Es = K.Estudio, Cm = K.Campeona, Cc = K.Caca, Nu = K.Numero, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                                 // cama grave continua, sin golpe
// gancho: el sobre se rasga y caen los cristalitos
m.whoosh(G + 0.05, 0.4, 0.14); m.cruje(G + 0.1, 0.5);
for (let i = 0; i < 22; i++) m.tic(G + 0.6 + i * 0.12, 0.05, 3000 + (i % 5) * 400);
m.golpe(G + 2.2, 0.25, 90);                                                              // se tacha "¿de un alga?"
// kombu: vapor y cristales que suben
m.whoosh(Ko + 0.2, 1.6, 0.06);
for (let i = 0; i < 14; i++) m.nota(Ko + 1.0 + i * 0.22, m.ESC[4 + (i % 6)], 0.03, 0.4);
m.metal(Ko + 2.7, 0.12, 900);                                                            // aparece el glutamato
// tanque: burbujas, azúcares que entran, la Lupa
m.motor(Ta, 4.8, 0.05);
for (let i = 0; i < 10; i++) m.burbuja(Ta + 1.4 + i * 0.32, 0.08, 500 + (i % 4) * 80);
m.whoosh(Ta + 2.0, 0.6, 0.12);
// por dentro: cada glucosa que se vuelve glutamato, una nota
for (let i = 0; i < 9; i++) m.nota(PD + 0.4 + i * 0.45 + 1.6, m.ESC[2 + (i % 5)], 0.04, 0.5);
m.gota(Bi + 1.3, 0.28, 900);                                                             // la gotita de biotina
m.zumbido(Bi + 1.4, 3.0, 0.04, 150);                                                     // la membrana se tensa
for (let i = 0; i < 8; i++) m.tic(Ca + 0.3 + i * 0.08, 0.09, 1600);                      // se abren los canales
for (let i = 0; i < 9; i++) m.burbuja(Ca + 0.9 + (i % 5) * 0.35 + i * 0.05, 0.1, 700);   // sale el glutamato
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                     // la pregunta
for (let i = 0; i < 16; i++) m.burbuja(An + 0.3 + i * 0.25, 0.06, 400 + (i % 3) * 60);   // el ácido burbujea
m.cruje(An + 1.6, 0.4);                                                                  // la proteína se rompe
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 3; i++) m.metal(Es + 0.6 + i * 0.7, 0.1, 1200);                     // cajas de Petri
// campeona: 4 notas graves (4 glucosas) → 1 aguda (1 glutamato), el 0.25 mol/mol de 1957
for (let c = 0; c < 2; c++) { const t0 = Cm + 0.6 + c * 1.6; for (let i = 0; i < 4; i++) m.nota(t0 + i * 0.16, 57, 0.06, 0.25); m.nota(t0 + 0.8, 81, 0.07, 0.6); }
m.whoosh(Cc - 0.2, 0.8, 0.08); m.gota(Cc + 0.95, 0.3, 500);                              // aleteo y "plop"
m.whoosh(Cc + 1.2, 0.5, 0.1);
for (let i = 0; i < 12; i++) m.golpe(Nu + 0.5 + i * 0.18, 0.12, 70);                     // los costales
m.golpe(Ci + 0.7, 0.4, 85);                                                              // el sello
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
