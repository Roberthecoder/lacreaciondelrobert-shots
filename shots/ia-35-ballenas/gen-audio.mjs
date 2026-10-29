// gen-audio.mjs — cama grave + efectos del Shot IA #35 (el "alfabeto" de clics de los cachalotes). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ballenas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 35);
const K = m.K;
const G = K.Gancho, Co = K.Codas, E = K.Estudio, Pi = K.Piezas, R = K.Rubato, O = K.Ornamento, P = K.Pregunta, Cb = K.Combina, Oj = K.Ojo, V = K.Vocales, C = K.Cierre, Ou = K.Outro;
const L1 = G + (Co - G) * 0.56;
const RITMO = [0, 0.15, 0.3, 0.45, 1];                                             // ritmo de la coda que se ve en pantalla
const coda = (t, dur = 0.5, g = 0.16, f = 1500, pos = RITMO) => pos.forEach((p) => m.tic(t + p * dur, g, f));

m.pad(0, Ou + 3.5, 0.05, [38, 45, 50]);                                           // cama grave, marina
m.zumbido(0, Ou, 0.012, 70);                                                       // retumbo del mar
for (let k = 0; k < 6; k++) coda(G + 0.1 + k * 1.15, 0.55, 0.12, k % 2 ? 1300 : 1700); // los clics de la tira (ballena azul / naranja)
m.whoosh(G + 0.5, 0.6, 0.12); m.whoosh(G + 0.8, 0.6, 0.1);                         // suben los cachalotes
m.cruje(G + 2.0, 0.3);                                                             // se tacha "¿código Morse?"
m.nota(L1 + 0.3, 69, 0.05, 0.5); m.nota(L1 + 0.45, 72, 0.05, 0.5); m.nota(L1 + 0.6, 76, 0.05, 0.6); // A B C
for (let i = 0; i < 5; i++) m.tic(Co + 0.1 + i * 0.14, 0.2, 1600);                 // la coda, clic por clic
for (let i = 0; i < 21; i++) m.tic(Co + 1.6 + i * 0.06, 0.06, 2200 + (i % 7) * 90); // 21 tipos
m.golpe(E + 0.2, 0.35, 80);
m.sube(E + 3.6, 1.4, 52, 72, 0.04);                                                // 8,719
m.gota(E + 3.7, 0.15, 700);                                                        // Dominica
m.zumbido(Pi + 0.1, 3.8, 0.02, 220);                                               // la computadora agrupa
for (let i = 0; i < 4; i++) m.burbuja(Pi + 1.6 + [0, 0.3, 0.8, 1.2][i], 0.14, 450 + i * 80); // salen las 4 piezas
for (let k = 0; k < 4; k++) { coda(R + 0.6 + k * 0.9, 0.35 * (1 + 0.2 * k), 0.12, 1700); coda(R + 1.1 + k * 0.9, 0.35 * (1 + 0.2 * k), 0.1, 1300); } // rubato: se estiran
for (let k = 0; k < 2; k++) coda(O + 0.1 + k * 0.45, 0.3, 0.12, 1700, [0, .25, .5, .75, 1]);
coda(O + 1.0 - 0.3, 0.3, 0.12, 1700, [0, .2, .4, .6, .8, 1]); m.nota(O + 1.05, 84, 0.07, 0.7);  // el clic extra brilla
m.sube(P + 0.05, 1.3, 50, 62, 0.05);
for (let i = 0; i < 30; i++) m.tic(Cb + 1.6 + i * 0.1, 0.05, 1900 + (i % 6) * 140); // la tabla se enciende
m.nota(Cb + 4.6, 72, 0.06, 0.8); m.nota(Cb + 4.65, 76, 0.05, 0.8);
m.burbuja(Oj + 0.6, 0.12, 600); m.burbuja(Oj + 1.5, 0.12, 400);                   // mensajes del celular
m.golpe(Oj + 3.1, 0.4, 70); m.cruje(Oj + 3.1, 0.3);                                // se tacha "una IA tradujo"
m.nota(Oj + 4.0, 67, 0.05, 0.6);
m.tic(V + 0.2, 0.25, 1600); m.zumbido(V + 0.9, 0.8, 0.03, 330); m.zumbido(V + 1.8, 0.8, 0.03, 260); m.zumbido(V + 1.8, 0.8, 0.02, 520); // espectros "a" e "i"
for (let k = 0; k < 4; k++) coda(C + 0.1 + k * 1.2, 0.55, 0.1, k % 2 ? 1300 : 1700);
m.cruje(C + 1.0, 0.3); m.nota(C + 2.0, 72, 0.06, 0.8); m.nota(C + 2.05, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
