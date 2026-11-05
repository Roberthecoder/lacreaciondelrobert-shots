// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #91 (especies sin nombre). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Especies base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 91);
const K = m.K;
const G = K.Gancho, To = K.Total, N = K.Nombradas, Mi = K.Micelio, S = K.SinSeta, A = K.ADN, P = K.Pregunta, E = K.Estudio, Ri = K.Ritmo, Mil = K.Mil, Po = K.Porcini, C = K.Cierre, Ou = K.Outro;

// armonía que avanza: curiosidad (la menor) → misterio bajo tierra → reloj (pedal) → hallazgo (do mayor)
m.pad(0, Mi, 0.05, [45, 52, 57], 0.15);          // Am
m.pad(Mi, P, 0.05, [41, 48, 57], 0.3);           // F, oscuro: dentro del suelo
m.pad(P, Po, 0.05, [43, 50, 55], 0.2);           // G: el reloj corre
m.pad(Po, C, 0.05, [48, 55, 60, 64], 0.05);      // C: especies nuevas en el súper
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);   // Am abierto
// cada seta que brota es una nota de la pentatónica; la que tiene nombre suena con campanita
for (let i = 0; i < 10; i++) m.nota(G + 0.05 + i * 0.08, m.ESC[3 + (i % 6)], 0.04, 0.5, i === 4 ? 0 : 0.4);
m.cruje(G + 1.5, 0.25); m.nota(G + 2.4, 81, 0.05, 1.0);
for (let i = 0; i < 25; i++) m.tic(To + 0.4 + i * 0.096, 0.04, 1200 + (i % 5) * 100);   // se llena la cuadrícula
for (let i = 0; i < 6; i++) m.nota(N + 0.6 + i * 0.17, 76 + [0, 3, 5, 7, 10, 12][i], 0.05, 0.7); // 6 dorados
m.zumbido(Mi - 0.2, 1.0, 0.04, 140); m.sube(Mi + 0.3, 2.2, 40, 52, 0.035);        // hifas que crecen
m.whoosh(Mi + 2.4, 0.8, 0.12);                                                     // entra el pelo
m.burbuja(S + 0.5, 0.06, 420); m.burbuja(S + 1.1, 0.06, 520); m.burbuja(S + 1.7, 0.06, 620);
m.cruje(A + 0.6, 0.35);                                                           // tierra en la mano
for (let i = 0; i < 24; i++) m.tic(A + 2.0 + i * 0.05, 0.05, 2600 + (i % 4) * 300); // lectura de ADN
for (let i = 0; i < 12; i++) m.nota(A + 3.0 + i * 0.16, m.ESC[4 + (i * 5) % 8], 0.03, 0.3);
m.sube(P + 0.1, 1.5, 50, 62, 0.05);
for (let i = 0; i < 12; i++) m.tic(P + 0.4 + i * 0.25, 0.04, 600);               // arena del reloj
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 24; i++) m.tic(Ri + 0.8 + i * ((Mil + 3.5 - Ri - 0.8) / 24), 0.06, 1500); // una franjita por año
m.nota(Mil + 0.5, 57, 0.06, 2.0); m.nota(Mil + 0.5, 64, 0.05, 2.0);
m.cruje(Po + 0.7, 0.3); [0, 1, 2].forEach((i) => m.whoosh(Po + 1.4 + i * 0.4, 0.4, 0.06));
[0, 1, 2].forEach((i) => m.nota(Po + 4.4 + i * 0.3, 72 + i * 4, 0.06, 0.8));        // ✓ especie nueva
for (let i = 0; i < 10; i++) m.nota(C + 1.2 + i * 0.15, m.ESC[5 + (i % 5)], 0.03, 0.5);
m.nota(Ou + 0.3, 45, 0.08, 2.8); m.nota(Ou + 0.3, 52, 0.06, 2.8); m.nota(Ou + 0.3, 57, 0.05, 2.8);
m.guardar(OUT, 1);
