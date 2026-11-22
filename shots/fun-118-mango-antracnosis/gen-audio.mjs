// gen-audio.mjs — música y efectos del Shot Fungi Mati #118 (antracnosis del mango). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Composición (maestro/recetas/composicion-musical.md): ~100 BPM, cama grave siempre debajo de la voz.
//  A · el mango del frutero (la menor, arpegio que camina) → B · al microscopio (se vacía: acordes suspendidos, el hongo "dormido"
//  respira) → re-gancho que sube → C · despierta (re menor → mi mayor, arpegio más activo) → D · el estudio y la exportación
//  (do mayor, el motivo regresa más agudo) → E · el baño (agua y burbujas, el motivo en el registro grave) → cierre en LA MAYOR.
//  El motivo (4 notas) se varía: motivo → respuesta → secuencia; ningún patrón dura más de 4 compases.
//  Datos hechos sonido: un golpecito por cada mancha que aparece, un "tic" por cada una de las 59 huertas, una nota por especie
//  (las dos más agresivas, más graves), y el termómetro sube de tono hasta 46 °C.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mango base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 118);
const K = m.K;
const G = K.Gancho, H = K.Hongo, L = K.Lluvia, A = K.Apresorio, D = K.Dormido, P = K.Pregunta, De = K.Despierta, M = K.Manchas,
  E = K.Estudio, Ex = K.Exporta, B = K.Bano, C = K.Cierre, Ou = K.Outro;
const BEAT = 0.6, BAR = BEAT * 4; // 100 BPM

// Acordes: [bajo, notas del arpegio]
const AC = {
  Am: [45, [57, 60, 64, 69]], F: [41, [57, 60, 65, 69]], C: [48, [55, 60, 64, 67]], G: [43, [55, 59, 62, 67]],
  Dm: [38, [57, 62, 65, 69]], E: [40, [56, 59, 64, 68]], Asus: [45, [57, 62, 64, 69]], Dm9: [38, [57, 60, 64, 65]],
  Fmaj7: [41, [57, 60, 64, 65]], Em: [40, [55, 59, 64, 67]], A: [45, [57, 61, 64, 69]], Bb: [46, [58, 62, 65, 70]],
};
// Patrones de arpegio (índices del acorde por corchea; null = silencio). Se rotan cada 2 compases.
const PAT = [[0, 1, 2, 1, 3, 2, 1, 2], [0, 2, 1, 3, null, 2, 3, 1], [0, null, 1, 2, 3, null, 2, 1], [3, 2, 1, 0, 1, 2, null, 3]];
function seccion(t0, t1, prog, { g = 0.03, pats = [0, 1], tapa = 0, bajoG = 0.05, cada = 1 } = {}) {
  let bar = 0;
  for (let t = t0; t < t1 - 0.05; t += BAR * cada, bar++) {
    const [b, notas] = AC[prog[bar % prog.length]];
    m.bajo(t, b, bajoG, BAR * cada * 0.9);
    const pat = PAT[pats[Math.floor(bar / 2) % pats.length]];
    pat.forEach((ix, k) => { const tt = t + k * BEAT / 2; if (ix == null || tt > t1) return; const acento = k % 4 === 0 ? 1.25 : 0.85 + 0.1 * ((k * 7 + bar) % 3);
      m.nota(tt, notas[ix], g * acento, 0.55, tapa); });
  }
}
// Motivo de 4 notas (la–do–mi–re) y sus variaciones.
const MOT = [69, 72, 76, 74], RESP = [72, 71, 69, 64], SEC = [71, 74, 77, 76];
const frase = (t, notas, g = 0.04, paso = BEAT, tapa = 0) => notas.forEach((n, i) => m.nota(t + i * paso, n, g * (i === 0 ? 1.15 : 1), i === notas.length - 1 ? 1.4 : 0.7, tapa));

/* ---------- cama continua (siempre debajo de la voz) ---------- */
m.pad(0, A, 0.04, [45, 52, 57]);
m.pad(A, P, 0.04, [38, 45, 52], 0.55);                 // al microscopio: ahogada, el hongo duerme
m.pad(P, M, 0.045, [38, 45, 53]);
m.pad(M, E, 0.045, [40, 47, 52], 0.25);
m.pad(E, B, 0.04, [36, 43, 48]);
m.pad(B, C, 0.04, [41, 48, 53]);
m.pad(C, Ou + 3.5, 0.045, [45, 52, 57]);

/* ---------- A · el mango del frutero → el árbol → la lluvia ---------- */
seccion(G, H, ['Am', 'F'], { pats: [0] });
frase(G + 0.15, MOT, 0.035);
seccion(H, L, ['C', 'G'], { pats: [1] });
frase(H + 2.4, RESP, 0.03);
seccion(L, A, ['F', 'Am'], { pats: [2], g: 0.025 });
/* ---------- B · al microscopio (se vacía) ---------- */
seccion(A, P, ['Dm9', 'Asus'], { pats: [2], g: 0.018, tapa: 0.5, bajoG: 0.04, cada: 1 });
for (let t = D + 0.2; t < P; t += 1.2) m.bajo(t, 33, 0.05, 1.0);  // la "respiración" lenta del hongo dormido
/* ---------- re-gancho ---------- */
m.sube(P + 0.05, 1.5, 50, 64, 0.045); frase(P + 0.4, [64, 67, 71], 0.03, 0.35);
/* ---------- C · despierta ---------- */
seccion(De, M, ['Dm', 'Bb', 'Dm', 'E'], { pats: [0, 3], g: 0.028 });
frase(De + 3.4, SEC, 0.04, BEAT / 2);
seccion(M, E, ['Am', 'Fmaj7', 'Dm', 'E'], { pats: [1, 2], g: 0.026 });
/* ---------- D · el estudio y la exportación (el motivo regresa, más agudo y en mayor) ---------- */
seccion(E, Ex, ['C', 'Am', 'F', 'G'], { pats: [3, 0], g: 0.026 });
seccion(Ex, B, ['F', 'C', 'G', 'Am'], { pats: [1, 3], g: 0.027 });
frase(Ex + 0.4, MOT.map((n) => n + 3), 0.035);
frase(Ex + 4.2, RESP.map((n) => n + 3), 0.03);
/* ---------- E · el baño (el motivo en el registro grave) ---------- */
seccion(B, C, ['Dm', 'Am', 'Bb', 'E'], { pats: [2, 0], g: 0.024 });
frase(B + 1.6, MOT.map((n) => n - 12), 0.045);
/* ---------- cierre: la mayor (la historia se resuelve) ---------- */
seccion(C, Ou, ['F', 'A'], { pats: [0], g: 0.026 });
frase(C + 1.2, [69, 72, 76, 73], 0.035);

/* ---------- efectos, en el mismo cuadro que lo que pasa ---------- */
m.whoosh(G, 0.4, 0.08);
for (let i = 0; i < 7; i++) { m.golpe(G + 0.25 + i * 0.16, 0.12, 70 + i * 4); m.tic(G + 0.27 + i * 0.16, 0.08, 1100); } // 7 manchas
m.golpe(G + 1.6, 0.3, 75); m.cruje(G + 1.62, 0.2);                       // «¿un golpe?» tachado
m.sube(G + 3.4, 1.2, 74, 52, 0.05); m.whoosh(G + 3.4, 1.2, 0.1);         // rebobinado: el mango vuelve a verde
for (let i = 0; i < 6; i++) m.tic(H + 1.2 + i * 0.3, 0.07, 900 + i * 60); // aparecen las manchas cafés en las hojas
for (let i = 0; i < 26; i++) m.tic(L + (i * 0.131) % 3.3, 0.05, 2600 + (i % 5) * 300); // lluvia
[0, 0.5, 1.0].forEach((d) => { m.whoosh(L + 0.3 + d, 0.9, 0.05); m.gota(L + 1.3 + d, 0.2, 800); }); // salpicaduras que caen en el mango
m.whoosh(L + 1.4, 0.5, 0.07);                                             // la lupa
m.sube(A + 0.3, 1.1, 60, 67, 0.03);                                       // germina
for (let i = 0; i < 4; i++) m.burbuja(A + 1.2 + i * 0.25, 0.06, 300 + i * 40); // se infla el apresorio
m.metal(A + 3.0, 0.08, 1500); m.tic(A + 3.0, 0.12, 3200);                // la clavija atraviesa la cera
m.whoosh(D + 0.5, 0.5, 0.05);                                             // lupa: por fuera, nada
for (let k = 0; k < 2; k++) m.sube(De + 0.6 + k * 0.6, 2.4, 64 - k * 3, 52 - k * 3, 0.025); // bajan los medidores
m.golpe(De + 3.4, 0.3, 90); m.nota(De + 3.45, 81, 0.05, 0.9);             // ¡despierta!
m.cruje(De + 3.5, 0.25);                                                  // hifas que entran
for (let i = 0; i < 7; i++) m.golpe(M + 0.25 + i * 0.18, 0.1, 65 + i * 3); // manchas que crecen
for (let i = 0; i < 4; i++) m.gota(M + 1.7 + i * 0.3, 0.13, 700 - i * 60);  // rayas de lágrima
m.cruje(M + 3.4, 0.35);                                                   // corte: la pulpa
m.golpe(E + 0.2, 0.3, 80);                                                // tarjeta del estudio
for (let i = 0; i < 59; i++) m.tic(E + 2.6 + i * 0.03, 0.05, 1500 + (i % 6) * 150); // 59 huertas
['', 'x', '', 'x', ''].forEach((f, i) => m.nota(E + 4.0 + i * 0.25, f ? 64 : 76, 0.04, 0.4)); // cinco especies (las agresivas, más graves)
m.golpe(E + 5.6, 0.22, 70); m.nota(E + 5.6, 52, 0.05, 0.9);
for (let i = 0; i < 12; i++) m.tic(Ex + 0.9 + i * 0.12, 0.06, 1800);     // cuenta el número
m.sube(Ex + 3.4, 1.6, 60, 72, 0.03);                                      // la barra del 89 %
for (let i = 0; i < 7; i++) m.tic(Ex + 0.4 + i * 0.4, 0.04, 600);        // cajas en la banda
m.whoosh(B + 0.2, 1.2, 0.1); m.golpe(B + 1.3, 0.25, 60);                 // la canasta entra al agua
for (let i = 0; i < 16; i++) m.burbuja(B + 1.4 + i * 0.33, 0.05, 280 + (i % 4) * 70); // burbujas
m.sube(B + 0.8, 1.4, 55, 70, 0.03);                                       // el termómetro sube a 46 °C
m.golpe(B + 3.9, 0.3, 75); m.cruje(B + 3.92, 0.2);                        // larva tachada (objetivo del baño)
m.nota(B + 4.7, 62, 0.04, 0.8);                                           // y de paso frena al hongo
m.tic(C + 0.4, 0.12, 1300); m.whoosh(C + 0.4, 0.4, 0.05);                 // etiqueta del cierre
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 61, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8);
m.guardar(OUT, 1);
