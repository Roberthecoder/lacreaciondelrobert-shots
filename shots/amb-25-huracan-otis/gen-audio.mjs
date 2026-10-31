// gen-audio.mjs — cama grave + efectos del Shot Ambiental #25 (huracán Otis). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Otis base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 125);
const K = m.K;
const G = K.Gancho, To = K.Tormenta, Ma = K.Mar, Mo = K.Motor, P = K.Pregunta, R = K.Rapida, Av = K.Avion, Ti = K.Tierra, Re = K.Record, Vi = K.Victimas, C = K.Cierre, Ou = K.Outro;

// cama grave: se va haciendo más densa con cada capítulo y casi desaparece en las víctimas
m.pad(0, Vi, 0.045, [45, 52, 57]);
m.pad(Ma, Vi, 0.02, [40, 47]);
m.pad(Vi, Ou + 3.5, 0.03, [45, 52]);
// gancho: la aguja sube al pronóstico y luego se dispara
m.whoosh(G + 0.15, 0.9, 0.12); m.sube(G + 0.15, 0.95, 50, 57, 0.04);
m.whoosh(G + 5.8, 1.1, 0.2); m.sube(G + 5.8, 1.1, 52, 76, 0.06); m.golpe(G + 6.9, 0.35, 70);
// cap. 1: viento de altura que empuja
m.whoosh(To + 0.3, 1.4, 0.08); m.whoosh(To + 2.2, 1.4, 0.08); m.tic(To + 0.3, 0.05, 1400);
// cap. 2: el mar se calienta (burbujas) y el viento afloja
for (let i = 0; i < 6; i++) m.burbuja(Ma + 0.5 + i * 0.3, 0.05, 420 + i * 30);
m.sube(Ma + 0.4, 1.8, 57, 64, 0.04); m.whoosh(Ma + 3.4, 1.6, 0.06);
// motor: vapor, nubes y calor
for (let i = 0; i < 8; i++) m.burbuja(Mo + 0.2 + i * 0.22, 0.04, 600);
m.nota(Mo + 1.0, 64, 0.05, 0.9); m.zumbido(Mo + 2.2, 2.0, 0.04, 140);
// pregunta
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
// intensificación rápida: barras y reloj de 21 h
m.nota(R + 1.5, 62, 0.05, 0.7);
for (let i = 0; i < 21; i++) m.tic(R + 3.6 + i * (3.0 / 21), 0.05, 1500 + i * 30);
m.sube(R + 3.6, 3.0, 50, 74, 0.05); m.golpe(R + 6.6, 0.3, 80);
// avión: motor en las dos pasadas, barómetro que baja
m.motor(Av + 0.3, 2.0, 0.08); m.motor(Av + 2.6, 2.0, 0.08); m.sube(Av + 1.0, 3.2, 62, 50, 0.04);
// tierra: el ojo llega a la bahía (ráfaga grave)
m.whoosh(Ti + 0.2, 2.4, 0.18); m.golpe(Ti + 2.5, 0.35, 55);
// récord: la trayectoria se dibuja punto por punto
for (let i = 0; i < 14; i++) m.tic(Re + 0.2 + i * 0.12, 0.04, 1200 + i * 60);
m.nota(Re + 1.8, 57, 0.05, 1.2);
// víctimas: silencio casi total (solo la cama baja)
// cierre: regreso al medidor
m.whoosh(C + 2.0, 1.0, 0.12); m.sube(C + 2.0, 1.0, 52, 72, 0.05);
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
