// gen-audio.mjs — cama grave + efectos del Shot Ambiental #44 (lata de aluminio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lata base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 44);
const K = m.K;
const G = K.Gancho, B = K.Bauxita, E = K.Electrolisis, M = K.Medidor, P = K.Pregunta, I = K.Infinito, Es = K.Estudio, Ti = K.Tienda, Ba = K.Basura, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.metal(G + 0.35, 0.3, 760); m.metal(G + 0.62, 0.12, 820); m.metal(G + 0.85, 0.06, 880);        // la lata cae y rebota
m.sube(G + 1.3, 1.3, 52, 64, 0.05); m.nota(G + 3.0, 64, 0.05, 0.6);                               // medidor 100 % y 5 %
m.cruje(B + 0.2, 0.5); m.whoosh(B + 1.0, 0.8, 0.12); for (let i = 0; i < 4; i++) m.tic(B + 2.0 + i * 0.18, 0.05, 2600);  // roca, química, polvo
m.zumbido(E + 0.4, 5.3, 0.05, 110); for (let i = 0; i < 14; i++) m.burbuja(E + 0.9 + i * 0.35, 0.05, 260 + (i % 4) * 60);  // corriente y CO2
m.sube(M + 0.6, 2.6, 45, 69, 0.06); m.golpe(M + 3.2, 0.3, 70);                                  // 186 GJ
m.sube(M + 4.6, 0.8, 57, 60, 0.04); m.nota(M + 5.4, 72, 0.06, 0.8);                              // unos 8
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 8; i++) m.tic(I + 0.4 + i * 0.75, 0.06, 1800 + (i % 5) * 200); m.gota(I + 3.2, 0.12, 500);  // vueltas y merma
m.whoosh(Es + 0.3, 0.6, 0.1); for (let i = 0; i < 12; i++) m.tic(Es + 3.6 + i * 0.32, 0.04, 2200);  // tarjeta y calendario
m.motor(Es + 4.6, 1.2, 0.05); m.nota(Es + 7.3, 69, 0.06, 0.8);
for (let i = 0; i < 8; i++) m.metal(Ti + 0.3 + i * 0.18, 0.05, 900 + i * 30); m.nota(Ti + 2.4, 64, 0.05, 0.7);
for (let i = 0; i < 43; i += 3) m.tic(Ba + 0.5 + (i / 43) * 1.7, 0.05, 2400);                     // 43 recicladas
for (let i = 0; i < 6; i++) m.golpe(Ba + 2.3 + i * 0.12, 0.08, 60);                               // 57 no recicladas
m.golpe(Ba + 3.4, 0.3, 55);
m.metal(C + 0.5, 0.18, 1000); m.sube(C + 0.4, 1.2, 57, 69, 0.05); m.whoosh(C + 2.0, 1.4, 0.08);   // la lata se endereza, el pico se va
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
