// gen-audio.mjs — música y efectos del Shot Fungi Mati #128 (umami del hongo seco). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
//
// Composición (maestro/recetas/composicion-musical.md): cama compuesta a 100 BPM (compás = 2.4 s), en la menor, siempre debajo de la voz.
//  A  (gancho → agua fría): cálida y curiosa. i–VI–III–VII con finales distintos cada 4 compases; motivo de 4 notas en la celesta.
//  A' (re-gancho): se vacía (solo bajo y una pregunta en la celesta) y cae en E (media cadencia).
//  B  (receptor): crece con el bajo caminando; en «la trampa se cierra» llega a LA MAYOR (destello) — el momento más brillante.
//  C  (estudio, umbral): se aclara; arpegio de cuerda pulsada, el motivo transpuesto (secuencia).
//  D  (caldo, cierre): el tema regresa una octava arriba, ahora en Do mayor (resuelve); acorde final que se queda sonando.
// Humanizado: cada nota con un poco de adelanto/atraso (±12 ms) e intensidad variable; nunca el mismo patrón más de 4 compases.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Umami seco base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 128);
const K = m.K;
const G = K.Gancho, H = K.Hongo, F = K.FrescoSeco, Ce = K.Celulas, Ti = K.Tijeras, Te = K.Temperatura, A = K.AguaFria, P = K.Pregunta,
  R = K.Receptor, Gl = K.Glutamato, N = K.Nucleotido, E = K.Estudio, U = K.Umbral, D = K.Dashi, C = K.Cierre, Ou = K.Outro;

const BEAT = 0.6, BAR = 2.4;
const hum = () => (m.rnd() - 0.5) * 0.024;           // ±12 ms
const vel = (g) => g * (0.82 + m.rnd() * 0.3);         // intensidad variable

// Acordes (MIDI, voz media) con conducción de voces; bajo aparte.
const CH = {
  Am: { b: 45, v: [57, 60, 64] }, F: { b: 41, v: [57, 60, 65] }, C: { b: 48, v: [55, 60, 64] }, G: { b: 43, v: [55, 59, 62] },
  Dm: { b: 50, v: [57, 62, 65] }, E: { b: 40, v: [56, 59, 64] }, E7: { b: 40, v: [56, 62, 64] }, A: { b: 45, v: [57, 61, 64] },
  Fmaj7: { b: 41, v: [57, 60, 64] }, Cadd9: { b: 48, v: [55, 62, 64] }, G6: { b: 43, v: [55, 59, 64] },
};
// Plan de compases por sección (cada sección cubre su tramo; el último compás se recorta).
const PLAN = [
  { t0: G, t1: P, sec: 'A', ch: ['Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'E', 'Am', 'F', 'Dm', 'E'] },
  { t0: P, t1: R, sec: "A'", ch: ['E7'] },
  { t0: R, t1: N + 1.0, sec: 'B', ch: ['Dm', 'Am', 'F', 'E', 'E7'] },
  { t0: N + 1.0, t1: E, sec: 'B+', ch: ['A', 'A'] },
  { t0: E, t1: D, sec: 'C', ch: ['F', 'C', 'G', 'Am'] },
  { t0: D, t1: Ou, sec: 'D', ch: ['Fmaj7', 'C', 'G6', 'Am', 'F', 'G'] },
];
// Motivo (grados en la escala de la menor, relativos a A4=69): sube, salta y responde.
const MOT = [[0, 1], [3, 0.5], [5, 0.5], [7, 2]];          // A C D E (semitonos sobre la raíz)
const RESP = [[8, 1], [7, 0.5], [5, 0.5], [3, 2]];         // F E D C (respuesta que baja)

for (const S of PLAN) {
  for (let i = 0, t = S.t0; t < S.t1 - 0.05; i++, t += BAR) {
    const fin = Math.min(t + BAR, S.t1), dur = fin - t, ch = CH[S.ch[i % S.ch.length]];
    const vac = S.sec === "A'";
    // cama: acorde sostenido muy suave (filtro cerrado), un poco más abierto en B+ y D
    m.pad(t, fin + 0.15, vac ? 0.018 : 0.028, ch.v.map((n) => n - 12), S.sec === 'B+' || S.sec === 'D' ? 0 : 0.35);
    // bajo: tiempo 1 siempre; en B camina (1 · 2 · 3 · 4); al final de cada 4 compases, nota de paso
    const pasos = S.sec === 'B' ? [0, 1, 2, 3] : (S.sec === 'C' ? [0, 1.5, 2] : [0, 2]);
    pasos.forEach((b, k) => { const tb = t + b * BEAT; if (tb >= fin) return;
      const nota = ch.b + (S.sec === 'B' ? [0, 3, 5, 7][k] : (k && i % 4 === 3 ? 2 : (k ? 7 : 0)));
      m.bajo(tb + hum(), nota, vel(vac ? 0.05 : 0.075), BEAT * (b === 0 ? 1.6 : 1.0)); });
    // arpegio de cuerda pulsada (C y D) o notas largas de acorde (A)
    if (S.sec === 'C' || S.sec === 'D') {
      const ord = i % 2 ? [0, 2, 1, 2, 0, 1, 2, 1] : [0, 1, 2, 1, 0, 2, 1, 2];
      ord.forEach((v, k) => { const tk = t + k * BEAT / 2; if (tk < fin) m.nota(tk + hum(), ch.v[v] + (S.sec === 'D' ? 12 : 0), vel(0.018), 0.5); });
    } else if (!vac) {
      [0, 1.5, 3].forEach((b, k) => { const tk = t + b * BEAT; if (tk < fin && (i + k) % 2 === 0) m.nota(tk + hum(), ch.v[(k + i) % 3] + 12, vel(0.014), 1.2, 0.3); });
    }
    // celesta: el motivo cada 2 compases (A y D), la respuesta en los impares; secuencia transpuesta en C
    if (S.sec === 'A' || S.sec === 'D' || S.sec === 'C') {
      const frase = i % 2 === 0 ? MOT : RESP, base = 69 + (S.sec === 'D' ? 12 - 9 : 0) + (S.sec === 'C' ? 5 : 0); // D: en Do mayor (72) → regreso del tema
      if (i % 4 !== 3 || S.sec === 'D') { let tb = t + BEAT * 0.5; frase.forEach(([st, b]) => { if (tb < fin - 0.1) m.nota(tb + hum(), base + st, vel(0.026), Math.min(1.4, b * BEAT * 1.6)); tb += b * BEAT; }); }
    }
  }
}
// re-gancho: la pregunta en la celesta (sube y se queda en el aire)
[[64, 0], [67, 0.3], [71, 0.6], [74, 0.9]].forEach(([n, d]) => m.nota(P + 0.2 + d, n, 0.03, 0.9));
// B+: destello en LA MAYOR cuando la trampa se cierra del todo
[69, 73, 76, 81].forEach((n, i) => m.nota(N + 1.0 + i * 0.06, n, 0.04, 2.2));

// ---------- efectos, en el mismo cuadro que lo que pasa ----------
m.whoosh(G + 0.05, 0.5, 0.12); m.golpe(G + 0.55, 0.45, 70); m.tic(G + 0.75, 0.12, 900); m.tic(G + 0.92, 0.06, 900);   // cae el hongo seco y rebota
m.cruje(G + 1.6, 0.25);                                                                                    // se tacha «¿echado a perder?»
for (let i = 0; i < 8; i++) m.nota(G + 2.4 + i * 0.07, m.ESC[5 + i], 0.035, 0.5);                        // brotan 8 bolitas doradas
m.sube(H - 0.2, 0.8, 52, 59, 0.03);                                                                       // aparece el hongo
for (let i = 0; i < 3; i++) m.gota(F + 0.6 + i * 0.15, 0.09, 1100);                                       // fresco: 3 bolitas
for (let i = 0; i < 22; i++) m.tic(F + 2.4 + i * 0.05, 0.05, 2400 + (i % 5) * 200);                       // seco: 22 bolitas
m.cruje(Ce + 0.3, 0.35); m.cruje(Ce + 1.0, 0.25);                                                         // las hifas se agrietan
m.whoosh(Ti, 0.9, 0.06);                                                                                   // entra el calor
for (let i = 0; i < 5; i++) { const t = Ti + 1.0 + (i + 1) * 0.43; m.metal(t - 0.02, 0.07, 1500); m.tic(t, 0.18, 3200); m.gota(t + 0.4, 0.08, 800); } // tijeretazos y guanilato que cae
m.sube(Te + 0.1, 1.5, 55, 67, 0.03); m.nota(Te + 1.5, 81, 0.04, 0.9);                                    // sube el termómetro · franja 60–70
for (let i = 0; i < 5; i++) m.golpe(A + 0.85 + i * 0.45, 0.12, 140);                                      // la nucleotidasa se come el guanilato
for (let i = 0; i < 3; i++) m.metal(A + 2.0 + i * 0.12, 0.05, 2200 + i * 300);                            // hielo en el vaso
m.zumbido(R + 0.2, 3.6, 0.02, 160);                                                                       // la membrana y el receptor
m.whoosh(Gl + 0.2, 0.9, 0.07); m.golpe(Gl + 1.6, 0.35, 95);                                               // entra el glutamato · clac de la trampa
m.gota(N + 0.4, 0.1, 1300); m.golpe(N + 1.05, 0.3, 120);                                                   // llega el nucleótido · la deja más cerrada
m.golpe(E + 0.15, 0.3, 80); for (let i = 0; i < 5; i++) m.tic(E + 0.85 + i * 0.3, 0.12, 1400);            // tarjeta · piezas que cambian
m.sube(U + 0.3, 1.0, 50, 57, 0.03); for (let i = 0; i < 3; i++) m.gota(U + 1.9 + i * 0.12, 0.08, 1500);   // barra de glutamato · la pizca
m.sube(U + 2.0, 1.2, 64, 57, 0.025);                                                                       // la línea del umbral baja
m.whoosh(D + 0.3, 0.8, 0.08); m.gota(D + 1.15, 0.14, 500); m.whoosh(D + 1.6, 0.8, 0.07); m.gota(D + 2.45, 0.14, 600); // kombu y hongo al caldo
for (let i = 0; i < 14; i++) m.burbuja(D + 2.6 + i * 0.17 + m.rnd() * 0.06, 0.05, 380 + (i % 4) * 60);    // hervor suave
m.sube(C + 0.4, 1.6, 50, 57, 0.025);                                                                       // el hongo se hincha
for (let i = 0; i < 8; i++) m.nota(C + 2.2 + i * 0.07, m.ESC[6 + i], 0.03, 0.5);                         // bolitas doradas otra vez
// final: Do mayor con novena que se queda sonando
[48, 55, 64, 67, 74].forEach((n, i) => m.nota(Ou + 0.25 + i * 0.03, n, i ? 0.045 : 0.07, 3.2));
m.pad(Ou, Ou + 3.5, 0.03, [48, 55, 64], 0);
m.guardar(OUT, 1);
