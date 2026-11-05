// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #61 (Cerveza). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama cálida que cambia de acorde con cada capítulo (no se repite el mismo patrón), un motivo de dos notas
// que «se junta» (dos levaduras → una célula) y vuelve transformado al final; se enfría (registro alto) en bosque y frío.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cerveza base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 61);
const K = m.K;
const G = K.Gancho, M = K.Mosto, B = K.Burbujas, Ge = K.Gemacion, H = K.Hibrido, Ce = K.Cerevisiae, P = K.Pregunta, E = K.Estudio,
  Gn = K.Genoma, F = K.Frio, Ti = K.Tibet, Mu = K.Mundo, C = K.Cierre, Ou = K.Outro;

// cama: progresión con función (la menor → fa → do → sol …), cada capítulo con su acorde; nunca el mismo más de un tramo
const CAMA = [[G, M, [45, 52, 57]], [M, B, [41, 48, 57]], [B, H, [43, 50, 55], 0.2], [H, Ce, [40, 47, 55], 0.2], [Ce, P, [41, 48, 53]],
  [P, E, [43, 50, 59], 0.3], [E, Gn, [48, 55, 64]], [Gn, F, [45, 52, 60], 0.15], [F, Ti, [52, 59, 64]], [Ti, Mu, [50, 57, 62]],
  [Mu, C, [48, 55, 60]], [C, Ou + 3.5, [45, 52, 57]]];
CAMA.forEach(([a, b, n, tapa = 0]) => m.pad(a, b + 0.3, 0.045, n, tapa));
// bajo suave que marca el cambio de capítulo (sin golpe)
CAMA.forEach(([a, , n]) => m.bajo(a + 0.02, n[0] - 12, 0.06, 1.2));

// motivo: dos notas que se acercan y se vuelven una (gancho) — vuelve al final, una octava arriba
const motivo = (t, base, g) => { m.nota(t, base, g, 0.5); m.nota(t + 0.35, base + 7, g, 0.5); m.nota(t + 0.9, base + 4, g * 1.1, 1.0); };
motivo(G + 2.4, 64, 0.05); motivo(C + 1.2, 76, 0.045);

// 1 · gancho: burbujas desde el cuadro 0, las dos células se funden
for (let i = 0; i < 10; i++) m.burbuja(G + 0.05 + i * 0.22, 0.06, 600 + (i % 4) * 90);
m.cruje(G + 1.4, 0.25); m.whoosh(G + 1.9, 0.4, 0.06); m.gota(G + 3.5, 0.18, 500);
// 2 · malta: granos que se abren, azúcares que caen, la levadura se los come
for (let i = 0; i < 4; i++) m.tic(M + 0.2 + i * 0.15, 0.2, 900 + i * 80);
for (let i = 0; i < 8; i++) m.gota(M + 1.9 + i * 0.12, 0.08, 1200 + i * 40);
// 3 · por dentro: entra el azúcar, se parte, suben las burbujas de CO₂
m.whoosh(B + 0.2, 0.8, 0.07); m.tic(B + 1.0, 0.25, 700);
for (let i = 0; i < 6; i++) m.burbuja(B + 1.2 + i * 0.3, 0.09, 380 + i * 60);
// 4 · gemación: la yema crece y se suelta
m.sube(Ge + 0.1, 1.1, 55, 62, 0.04); m.gota(Ge + 1.6, 0.25, 420);
// 5 · núcleo: cromosomas que se pintan (clics que alternan dos alturas = dos especies)
for (let i = 0; i < 14; i++) m.tic(H + 1.2 + i * 0.1, 0.09, i % 2 ? 2100 : 1500);
// 6 · cerevisiae: cromosomas que vuelan al pan, el pan se infla
m.whoosh(Ce + 0.05, 0.7, 0.07); m.sube(Ce + 0.5, 1.6, 45, 52, 0.04);
// 7 · re-gancho
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
// 8 · estudio y bosque: tarjeta, viento, cyttarias que brotan, levaduras que aparecen
m.golpe(E + 0.3, 0.3, 80); m.tic(E + 0.6, 0.2, 1300);
m.whoosh(E + 2.8, 2.6, 0.05);
for (let i = 0; i < 10; i++) m.nota(E + 3.6 + i * 0.12, m.ESC[8 + (i * 3) % 6], 0.03, 0.4);
for (let i = 0; i < 5; i++) m.burbuja(E + 4.6 + i * 0.15, 0.06, 700 + i * 50);
// 9 · genoma: tiras que se llenan y el escáner compara (= … ≠)
for (let i = 0; i < 40; i++) m.tic(Gn + 0.4 + i * 0.05, 0.04, 2600 + (i % 4) * 250);
for (let i = 0; i < 40; i++) m.tic(Gn + 2.8 + i * 0.045, 0.05, i === 27 ? 700 : 3000);
m.nota(Gn + 3.0, 69, 0.05, 1.2); m.nota(Gn + 3.05, 76, 0.04, 1.2);
// 10 · frío: tiritar, la verde rechaza el azúcar, la azul se lo come, se juntan
for (let i = 0; i < 8; i++) m.tic(F + 0.3 + i * 0.07, 0.06, 3400);
m.golpe(F + 2.85, 0.2, 140); m.gota(F + 3.6, 0.2, 800);
m.sube(F + 4.4, 1.0, 57, 64, 0.04); m.nota(F + 5.3, 72, 0.05, 1.0); m.nota(F + 5.3, 76, 0.04, 1.0);
// 11 · Tíbet e Irlanda: puntos en el mapa y el hilo de parentesco
m.tic(Ti + 0.3, 0.2, 1200); m.nota(Ti + 0.9, 74, 0.05, 0.8); m.whoosh(Ti + 1.4, 0.8, 0.05); m.nota(Ti + 3.0, 79, 0.04, 0.6);
// 12 · el mundo: cada vasito con su tintineo (escala pentatónica, frase que sube y baja)
for (let i = 0; i < 48; i++) m.nota(Mu + 0.3 + i * 0.03, m.ESC[[5, 6, 7, 8, 9, 8, 7, 6][i % 8] + (i > 23 ? 1 : 0)], 0.018, 0.25);
// 13 · cierre: la lupa, el pan, la ramita
m.whoosh(C + 0.4, 0.6, 0.06); m.gota(C + 1.8, 0.15, 600);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
