// gen-audio.mjs — cama grave + efectos del Shot Ambiental #53 (ruido de barcos y ballenas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Ruido Oceano base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
const G = K.Gancho, A = K.Agua, B = K.Ballenas, H = K.Helices, P = K.Pregunta, E = K.Experimento, R = K.Resultado, Pr = K.Prueba, D = K.Decadas, L = K.Lento, C = K.Cierre, Ou = K.Outro;

// canto grave de ballena (sintetizado): una nota que sube y baja despacio
const canto = (t, g = 0.05) => { m.sube(t, 0.9, 40, 47, g); m.sube(t + 0.9, 0.7, 47, 43, g * 0.8); };

// cama: tapada mientras hay ruido de barcos, más limpia cuando bajan
m.pad(0, E + 0.5, 0.045, [45, 52, 57], 0.6);
m.pad(E + 0.5, D, 0.045, [45, 52, 57], 0.15);
m.pad(D, L + 2, 0.045, [45, 52, 57], 0.6);
m.pad(L + 2, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);

// gancho: tachón de silencio, chapoteo al bajar, barco y su ruido
m.tic(G + 0.1, 0.12, 1800); m.whoosh(G + 0.2, 0.9, 0.12); m.burbuja(G + 1.0, 0.07, 420); m.burbuja(G + 1.3, 0.06, 520);
m.motor(G + 1.2, 4.2, 0.07);
canto(G + 2.6, 0.04);
// carrera del sonido: el agua llega primero, el aire 4.4 veces después
m.whoosh(A + 0.3, 0.95, 0.12); m.tic(A + 0.3 + 0.95, 0.14, 2200);
m.whoosh(A + 0.3, 4.2, 0.06); m.tic(A + 0.3 + 0.95 * 1500 / 340, 0.1, 1500);
// ballenas: dos cantos
canto(B + 0.6, 0.06); canto(B + 2.6, 0.06);
// hélices: motor y su golpe grave, el canto queda tapado
m.motor(H + 0.3, 4.2, 0.1); m.golpe(H + 0.4, 0.25, 60); canto(H + 1.6, 0.03);
// pregunta
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
// experimento: tarjeta y barcos que desaparecen (6 tics)
m.golpe(E + 0.5, 0.25, 90);
for (let i = 0; i < 6; i++) m.tic(E + 2.0 + i * 0.22, 0.08, 1200 - i * 80);
// resultado: medidor baja (−6 dB), caca que flota (burbujas) y tubo que baja
m.sube(R + 0.4, 1.4, 60, 52, 0.05); m.nota(R + 1.8, 57, 0.05, 0.8);
m.burbuja(R + 1.9, 0.07, 380); m.burbuja(R + 2.2, 0.06, 460); m.burbuja(R + 2.5, 0.06, 540);
m.sube(R + 2.6, 1.4, 64, 55, 0.04); m.nota(R + 3.0, 60, 0.05, 0.7);
// prueba: tarjeta del estudio
m.golpe(Pr + 0.7, 0.25, 90); m.nota(Pr + 1.6, 64, 0.05, 0.8); canto(Pr + 2.4, 0.04);
// décadas: la barra sube con el motor
m.motor(D + 0.6, 2.4, 0.06); m.sube(D + 0.8, 1.6, 45, 57, 0.05); m.golpe(D + 2.6, 0.2, 80);
// lento: el motor baja de tono y se apaga; velocímetro
m.motor(L + 0.2, 3.0, 0.07); m.sube(L + 0.8, 2.2, 57, 45, 0.04); m.nota(L + 2.6, 69, 0.05, 0.9);
// cierre: el canto limpio de las ballenas
canto(C + 0.6, 0.06); canto(C + 2.4, 0.05);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
