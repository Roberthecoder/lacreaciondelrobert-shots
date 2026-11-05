// gen-audio.mjs — cama + efectos del Shot Fungi Mati #120 (temporada de hongos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave de bosque húmedo con progresión propia (la menor → fa → do → sol), un tema de 4 notas que
// aparece en el gancho, regresa transpuesto en el estudio y cierra en mayor; cada cosa que pasa en pantalla suena en su cuadro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Temporada Hongos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 120);
const K = m.K;
const G = K.Gancho, N = K.Numero, S = K.Seta, M = K.Micelio, Se = K.Senal, P = K.Pregunta, Li = K.Libreta, E = K.Estudio, Ca = K.Calendario, D = K.DosVeces, No = K.Noruega, C = K.Cierre, Ou = K.Outro;

// --- cama: progresión con función (i – VI – III – VII), un acorde por tramo de la historia; se "tapa" bajo tierra
const AM = [45, 52, 57, 60], FA = [41, 48, 53, 57], DO = [48, 52, 55, 60], SOL = [43, 50, 55, 59], AM2 = [45, 52, 57, 64];
m.pad(0, N, 0.05, AM);
m.pad(N, S, 0.05, FA);
m.pad(S, M, 0.05, DO);
m.pad(M, Se, 0.05, AM, 0.45);                 // bajo tierra: sonido ahogado
m.pad(Se, P, 0.05, SOL, 0.3);
m.pad(P, Li, 0.05, [47, 52, 56, 59]);           // re-gancho: acorde suspendido (mi)
m.pad(Li, E, 0.05, FA);
m.pad(E, Ca, 0.05, DO);
m.pad(Ca, D, 0.05, AM2);
m.pad(D, No, 0.05, FA);
m.pad(No, C, 0.05, SOL);
m.pad(C, Ou + 3.5, 0.05, [48, 52, 55, 64]);     // cierre en do mayor: se resuelve

// --- tema de 4 notas (motivo → respuesta). En el gancho en menor; en el estudio, transpuesto; en el cierre, en mayor.
const tema = (t0, notas, g = 0.05, paso = 0.32) => notas.forEach((n, i) => m.nota(t0 + i * paso, n, g, 0.9));
tema(G + 1.2, [69, 72, 76, 74]);
tema(N + 5.4, [72, 74, 72, 69], 0.045);         // respuesta: «más del doble»
tema(E + 0.4, [72, 76, 79, 77], 0.045);         // el tema regresa, una tercera arriba
tema(C + 2.3, [72, 76, 79, 84], 0.05, 0.36);    // final en mayor, sube y se queda

// --- 1 · gancho: la seta brota, el calendario pasa hojas
m.sube(G + 0.1, 0.9, 43, 55, 0.05); m.golpe(G + 0.9, 0.25, 110);
for (let t = G + 0.5; t < G + 3.0; t += 0.7) m.whoosh(t, 0.35, 0.08);
m.tic(G + 1.4, 0.2, 1400);                       // chip «no salió tarde»
// --- 2 · el número
m.tic(N + 0.3, 0.2, 1500); m.golpe(N + 0.6, 0.3, 90);
for (let i = 0; i < 11; i++) m.tic(N + 0.6 + i * 0.08, 0.06, 2000 + i * 40);  // conteo hasta 33
m.sube(N + 1.0, 0.8, 50, 55, 0.035); m.sube(N + 1.3, 0.8, 52, 57, 0.035);   // dos barras
m.sube(N + 4.0, 1.4, 52, 64, 0.05); m.tic(N + 4.0, 0.2, 1300);             // la barra se estira a más del doble
// --- 3 · la seta: corte y esporas
m.metal(S + 0.6, 0.12, 1200); m.tic(S + 0.62, 0.3, 900);
for (let i = 0; i < 14; i++) m.tic(S + 1.4 + i * 0.13, 0.04, 3200 + (i % 3) * 400);
// --- 4 · bajamos al suelo; las hifas crecen
m.whoosh(M - 0.2, 1.2, 0.14); m.cruje(M + 0.2, 0.4);
m.zumbido(M + 0.3, 3.2, 0.03, 150);
m.burbuja(M + 2.0, 0.08, 380); m.burbuja(M + 2.4, 0.08, 460); m.burbuja(M + 2.8, 0.08, 540);
// --- 5 · la señal: termómetro, gota, primordio, la fecha que se recorre
m.sube(Se + 0.4, 2.2, 48, 60, 0.035);
m.gota(Se + 0.5, 0.2, 800); m.gota(Se + 1.4, 0.2, 900); m.gota(Se + 2.1, 0.2, 1000);
m.golpe(Se + 2.4, 0.3, 70); m.nota(Se + 2.45, 64, 0.05, 1.0);
m.sube(Se + 2.8, 1.0, 45, 52, 0.04);
m.tic(Se + 4.2, 0.2, 1300); m.whoosh(Se + 4.6, 1.1, 0.08);
// --- 6 · re-gancho
m.sube(P + 0.1, 1.2, 52, 64, 0.05);
// --- 7 · la libreta: plumilla y conteo
for (let i = 0; i < 9; i++) for (let k = 0; k < 5; k++) m.tic(Li + 0.5 + i * 0.32 + k * 0.05, 0.03, 2600 + k * 150);
for (let i = 0; i < 16; i++) m.tic(Li + 2.8 + i * 0.15, 0.05, 1800 + i * 30);
m.tic(Li + 1.6, 0.2, 1300);
// --- 8 · el estudio de 2007
m.golpe(E + 0.15, 0.35, 80);
for (let i = 0; i < 12; i++) m.nota(E + 1.4 + i * 0.12, [57, 60, 64, 67, 69, 72][i % 6] + (i > 5 ? 12 : 0), 0.025, 0.3);
// --- 9–10 · el calendario se abre; dos veces al año
m.tic(Ca + 0.3, 0.2, 1300);
m.sube(Ca + 1.6, 2.6, 50, 57, 0.035);
m.whoosh(D - 0.1, 0.8, 0.1);
for (let i = 0; i < 6; i++) m.burbuja(D + 0.3 + i * 0.12, 0.08, 520 + i * 50);  // brota el ramillete amarillo
for (let i = 0; i < 6; i++) m.nota(D + 0.7 + i * 0.05, 76 + (i % 2) * 3, 0.025, 0.3); // marcas de primavera
// --- 11 · Noruega
m.golpe(No + 0.3, 0.35, 80);
for (let i = 0; i < 4; i++) m.tic(No + 0.3 + i * 0.15, 0.08, 1500);
m.sube(No + 2.6, 1.4, 55, 52, 0.04);              // la marca se atrasa (baja)
m.tic(No + 3.0, 0.2, 1300);
// --- 12 · cierre y tarjeta
m.golpe(C + 0.9, 0.25, 100); m.whoosh(C + 2.2, 0.5, 0.06); m.tic(C + 1.0, 0.2, 1300);
m.nota(Ou + 0.3, 48, 0.07, 2.8); m.nota(Ou + 0.3, 55, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
