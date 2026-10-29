// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #56 (VPH: la cáscara vacía). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Vph base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
const G = K.Gancho, Vi = K.Virus, Ca = K.Capside, L1 = K.L1, No = K.Noventa, Ar = K.Arma, Pr = K.Pregunta, Va = K.Vacia,
  De = K.Defensas, Es = K.Escocia, Po = K.Polilla, Mx = K.Mexico, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                    // cama grave continua, sin golpe
m.whoosh(G + 0.05, 0.8, 0.12);                                             // la jeringa entra
m.tic(G + 1.4, 0.3, 2600);                                                 // el piquete
m.golpe(G + 1.6, 0.2, 90);                                                 // se tacha "VIRUS"
m.metal(Vi + 1.6, 0.1, 660);                                               // aparece el punto en el cuello uterino
m.whoosh(Ca + 0.1, 0.6, 0.16);                                             // la Lupa se abre
m.sube(Ca + 1.6, 1.0, 57, 64, 0.04);                                       // aparece el ADN
for (let i = 0; i < 36; i++) m.tic(L1 + 0.6 + i * (1.6 / 36), 0.06, 1800 + (i % 5) * 120);   // 360 copias: un tic cada 10
m.whoosh(L1 + 0.6, 1.4, 0.1);                                              // la cáscara se separa
m.golpe(No + 0.2, 0.3, 80); m.golpe(No + 2.6, 0.3, 80);                    // las dos tarjetas (1991, 1992)
for (let i = 0; i < 8; i++) m.burbuja(No + 1.0 + i * 0.4, 0.08, 600 + i * 40); // salen piezas del matraz
for (let i = 0; i < 72; i++) m.nota(Ar + 0.2 + i * (3.0 / 72), m.ESC[Math.floor(i / 72 * 12)], 0.025, 0.25);  // 72 pentámeros = 72 notas
m.metal(Ar + 3.2, 0.2, 990);                                               // la cáscara se cierra
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                       // la pregunta
m.gota(Va + 1.8, 0.2, 500);                                                // se pega a la célula... y no pasa nada
m.golpe(Va + 0.3, 0.15, 70);
for (let i = 0; i < 10; i++) m.tic(De + 1.4 + i * 0.03, 0.08, 2200);       // anticuerpos que se pegan
m.whoosh(De + 2.0, 1.0, 0.1);                                              // llega el virus real
for (let i = 0; i < 8; i++) m.tic(De + 3.6 + i * 0.03, 0.08, 2000);
m.golpe(Es + 0.2, 0.35, 80);                                               // la tarjeta del estudio
m.golpe(Es + 3.0, 0.4, 70);                                                // el cero
for (let i = 0; i < 4; i++) m.nota(Es + 3.4 + i * 0.08, 69 + i * 3, 0.04, 0.5);
m.zumbido(Po + 0.1, 3.8, 0.03, 120);                                       // aleteo de la polilla
m.burbuja(Po + 2.0, 0.08, 500); m.burbuja(Po + 2.6, 0.08, 560);            // la yema de la levadura
m.metal(Mx + 0.3, 0.1, 700); m.tic(Mx + 2.6, 0.2, 1500);                   // el chip y entra el niño
for (let i = 0; i < 7; i++) m.tic(Ci + 1.0 + i * 0.15, 0.06, 2200);       // anticuerpos alrededor
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
