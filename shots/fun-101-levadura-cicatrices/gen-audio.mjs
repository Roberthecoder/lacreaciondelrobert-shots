// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #101 (Levadura). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua en la menor con acordes que cambian cada frase (i – VI – III – VII), sin golpe marcado.
// Un motivo de 4 notas (la "yema": sube y se suelta) aparece con cada hija y se transpone (motivo → respuesta → secuencia);
// se apaga cuando la madre deja de brotar y regresa, más brillante, con la hija "en cero" y en la masa ya levada.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Levadura base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 101);
const K = m.K;
const G = K.Gancho, Ma = K.Masa, Ce = K.Celula, Y = K.Yema, An = K.Anillo, Ri = K.Ritmo, P = K.Pregunta, E = K.Estudio,
  Li = K.Limite, Ca = K.Calcofluor, Cr = K.Crece, HJ = K.HijaJoven, C = K.Cierre, Ou = K.Outro;

// —— cama: acordes por sección (MIDI), siempre graves y continuos ——
const am = [45, 52, 57, 60], F = [41, 48, 53, 57], Cm = [48, 52, 55, 60], Gm = [43, 50, 55, 59], Dm = [50, 53, 57, 62], E7 = [40, 47, 52, 56];
const camas = [[G, Ma, am], [Ma, Ce, F], [Ce, Y, am], [Y, An, Cm], [An, Ri, Gm], [Ri, P, am], [P, E, E7], [E, Li, Dm], [Li, Ca, F], [Ca, Cr, am], [Cr, HJ, Cm], [HJ, C, Gm], [C, Ou + 3.5, am]];
camas.forEach(([a, b, ch], i) => m.pad(Math.max(0, a - 0.3), b + 0.3, i === 8 ? 0.04 : 0.05, ch, i === 8 ? 0.45 : 0.1));
m.pad(Li + 3.3, Ca + 1.2, 0.025, [33, 40], 0.6);             // la madre se detiene: se queda solo un grave ahogado

// motivo "yema": cuatro notas que suben y la última se suelta
const motivo = (t, raiz, g = 0.05) => { [0, 2, 4, 7].forEach((d, i) => m.nota(t + i * 0.14, raiz + d, g * (i === 3 ? 1.2 : 1), i === 3 ? 1.1 : 0.4)); };

// 1 · gancho: burbuja que revienta, la masa sube, aparece la lupa
m.burbuja(G + 0.25, 0.25, 260); m.gota(G + 0.3, 0.18, 500); m.whoosh(G + 0.5, 0.5, 0.08);
for (let i = 0; i < 3; i++) m.tic(G + 1.0 + i * 0.45, 0.12, 2200);           // tres cicatrices en la lupa
m.nota(G + 1.6, 69, 0.04, 1.6);
// 2 · masa por dentro: burbujeo de CO₂
for (let i = 0; i < 12; i++) m.burbuja(Ma + 0.2 + i * 0.36, 0.09, 380 + (i % 5) * 70);
// 3 · al microscopio: bajada de cámara
m.whoosh(Ce - 0.3, 1.0, 0.1); m.sube(Ce, 1.0, 57, 64, 0.03);
// 4 · brota la yema (bloop que sube) + núcleo en reloj de arena
m.sube(Y + 0.3, 2.6, 60, 67, 0.035); m.burbuja(Y + 0.4, 0.12, 300);
motivo(Y + 1.2, 69); m.zumbido(Y + 2.4, 1.4, 0.03, 220);
// 5 · anillo de quitina, tabique, la hija se suelta
m.metal(An + 0.1, 0.1, 1200); m.tic(An + 1.0, 0.2, 1500); m.tic(An + 1.3, 0.2, 1700);
m.tic(An + 2.2, 0.35, 900); m.whoosh(An + 2.2, 0.7, 0.06); m.nota(An + 2.4, 76, 0.05, 1.2);
// 6 · una hija cada hora y media: tic de reloj y dos hijas más (respuesta y secuencia del motivo)
for (let i = 0; i < 6; i++) m.tic(Ri + 0.2 + i * 0.5, 0.08, 3000);
motivo(Ri + 0.4, 71); m.tic(Ri + 1.6, 0.3, 950); motivo(Ri + 2.2, 74); m.tic(Ri + 3.3, 0.3, 1000);
// 7 · re-gancho
m.sube(P + 0.1, 1.6, 52, 64, 0.045); m.golpe(P + 0.1, 0.2, 70);
// 8 · el estudio: tarjeta, aguja que aparta cada hija
m.golpe(E + 0.2, 0.3, 80);
for (let i = 0; i < 5; i++) { m.whoosh(E + 1.0 + i * 1.05 + 0.55, 0.3, 0.05); m.nota(E + 1.0 + i * 1.05 + 0.75, 64 + [0, 3, 5, 7, 10][i], 0.035, 0.5); }
// 9 · se llena de cicatrices (un tic por hija) y se detiene
for (let i = 0; i < 22; i++) { const q = (i + 1) / 22, t = Li + 0.3 + 2.9 * (q < 0.5 ? Math.cbrt(q / 4) : 1 - Math.cbrt((1 - q) / 4)); m.tic(t, 0.07, 1500 + i * 40); }
m.golpe(Li + 3.4, 0.35, 55); m.nota(Li + 3.45, 57, 0.05, 1.6);
// 10 · calcoflúor: gota, la luz UV se enciende, una campanita por cada anillo que se numera
m.gota(Ca + 0.9, 0.25, 800); m.zumbido(Ca + 1.2, 3.6, 0.035, 120);
for (let i = 0; i < 10; i++) m.nota(Ca + 2.0 + i * 0.16, 81 + [0, 3, 5, 7, 10][i % 5] - (i > 4 ? 12 : 0), 0.03, 0.5);
// 11 · la madre crece
m.sube(Cr - 0.2, 1.1, 45, 40, 0.05); m.burbuja(Cr + 0.3, 0.1, 500);
// 12 · la hija nace en cero (motivo brillante) y la de madre vieja (motivo más corto y grave)
m.burbuja(HJ + 0.3, 0.1, 600); motivo(HJ + 0.7, 76, 0.045); m.sube(HJ + 0.7, 1.0, 64, 76, 0.02);
m.burbuja(HJ + 2.3, 0.1, 420); [0, 2].forEach((d, i) => m.nota(HJ + 2.9 + i * 0.2, 64 + d, 0.04, 0.6));
// 13 · cierre: la masa se desborda, lupa con anillos que brillan, cierre de marca
m.whoosh(C - 0.3, 0.9, 0.08); for (let i = 0; i < 6; i++) m.burbuja(C + 0.3 + i * 0.35, 0.1, 300 + i * 40);
m.nota(C + 1.0, 81, 0.03, 0.8); m.nota(C + 1.2, 84, 0.03, 0.8); motivo(C + 1.8, 69, 0.04);
m.nota(Ou + 0.3, 57, 0.08, 3.0); m.nota(Ou + 0.3, 64, 0.06, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0); m.nota(Ou + 0.45, 76, 0.03, 2.6);
m.guardar(OUT, 1);
