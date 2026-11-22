// gen-audio.mjs — música y efectos del Shot Fungi Mati #146 (violín de madera tratada con hongos). Sin costo: todo se calcula.
// Cuarteto de cuerdas sintetizado (violín, viola, chelo, contrabajo; arco con vibrato tardío, pizzicato y trémolo), 100 BPM,
// re menor → re mayor en el cierre. Pieza propia (nunca una canción conocida). Va debajo de la voz.
// Uso: node gen-audio.mjs                                → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>    (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Violin base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 146);
const { K, SR, N, warp, hz } = m;
const cuerdas = new Float32Array(N);                       // bus de cuerdas (se le pone sala al final)
let semilla = 146; const azar = () => { semilla = (semilla * 1664525 + 1013904223) >>> 0; return semilla / 4294967296; };

// --- instrumentos ---------------------------------------------------------------------------------------------
// Cuerda frotada: armónicos tipo diente de sierra con brillo según intensidad, ataque de arco, vibrato que entra tarde.
function arco(t, midi, dur, g, { ataque = 0.12, vib = 1, brillo = 1, trem = 0 } = {}) {
  t += (azar() - 0.5) * 0.02; g *= 0.9 + azar() * 0.2;                    // toque humano: ni dos notas iguales
  const f0 = hz(midi), i0 = Math.max(0, Math.floor(t * SR)), rel = 0.35, n = Math.floor((dur + rel) * SR);
  const H = Math.max(1, Math.min(12, Math.floor(7000 / f0))), amp = Array.from({ length: H }, (_, k) => (1 / (k + 1)) * Math.pow(0.82, k * (1.2 - brillo * 0.5)) * (0.85 + azar() * 0.3));
  const fase = Array.from({ length: H }, () => azar() * 6.28), vf = 5.2 + azar() * 0.6; let ph = 0;
  for (let i = 0; i < n && i0 + i < N; i++) {
    const u = i / SR;
    const v = vib * 0.0045 * Math.min(1, Math.max(0, (u - 0.28) / 0.4)) * Math.sin(2 * Math.PI * vf * u);
    ph += 2 * Math.PI * f0 * (1 + v) / SR;
    let x = 0; for (let k = 0; k < H; k++) x += amp[k] * Math.sin((k + 1) * ph + fase[k]);
    let e = u < ataque ? Math.pow(u / ataque, 1.5) : 1; if (u > dur) e *= Math.exp(-(u - dur) / (rel * 0.35));
    e *= 0.92 + 0.08 * Math.sin(Math.PI * Math.min(1, u / Math.max(0.2, dur)));   // pequeño "swell" del arco
    if (trem) e *= 0.55 + 0.45 * Math.abs(Math.sin(Math.PI * u * trem));
    cuerdas[i0 + i] += x * e * g * 0.35;
  }
}
// Pizzicato: cuerda pulsada (Karplus-Strong sencillo).
function pizz(t, midi, g = 0.1) {
  t += (azar() - 0.5) * 0.012;
  const f0 = hz(midi), L = Math.max(2, Math.round(SR / f0)), buf = Float32Array.from({ length: L }, () => azar() * 2 - 1);
  const i0 = Math.floor(t * SR), n = Math.floor(1.4 * SR); let p = 0;
  for (let i = 0; i < n && i0 + i < N; i++) { const a = buf[p], b = buf[(p + 1) % L]; buf[p] = (a + b) * 0.5 * 0.994; cuerdas[i0 + i] += a * g * Math.min(1, i / 40); p = (p + 1) % L; }
}

// --- partitura (tiempo real, tempo fijo; la textura sigue a las escenas) ----------------------------------------
const BPM = 100, B = 60 / BPM, COMP = 4 * B, T0 = 0.15;              // el primer golpe de arco cae con el arco en pantalla
const tiempoDe = (c) => warp(K[c]);
const LIGERA = tiempoDe('Ligera'), PRUEBA = tiempoDe('Prueba'), CIERRE = tiempoDe('Cierre'), OUTRO = tiempoDe('Outro');
const TOTAL = m.TOTAL;
// Frases de 4 compases: [acordes (raíz MIDI, tercera, quinta)], melodía [[tiempo en negras, midi, duración en negras]]
const Dm = [50, 53, 57], Bb = [46, 50, 53], Gm = [43, 46, 50], A = [45, 49, 52], F = [41, 45, 48], C = [48, 52, 55], A7 = [45, 49, 55], D = [50, 54, 57], G = [43, 47, 50];
const FRASES = {
  tema:      { ac: [Dm, Bb, Gm, A], mel: [[0, 69, 2], [2, 74, 1], [3, 76, 1], [4, 77, 3], [7, 76, 1], [8, 74, 2], [10, 72, 1], [11, 70, 1], [12, 69, 4]] },
  respuesta: { ac: [Dm, F, C, Dm], mel: [[0, 77, 2], [2, 76, 1], [3, 74, 1], [4, 72, 3], [7, 69, 1], [8, 76, 2], [10, 67, 1], [11, 72, 1], [12, 74, 4]] },
  crece:     { ac: [Bb, F, Gm, A7], mel: [[0, 74, 1], [1, 77, 1], [2, 82, 2], [4, 81, 2], [6, 77, 2], [8, 79, 1], [9, 82, 1], [10, 74, 2], [12, 73, 2], [14, 76, 2]] },
  tension:   { ac: [Gm, Dm, Bb, A], mel: [[0, 82, 4], [4, 81, 4], [8, 77, 2], [10, 74, 2], [12, 76, 2], [14, 73, 2]] },
  mayor:     { ac: [D, G, A, D], mel: [[0, 69, 2], [2, 74, 1], [3, 76, 1], [4, 78, 3], [7, 76, 1], [8, 76, 2], [10, 73, 1], [11, 76, 1], [12, 74, 8]] },
};
// Orden: misterio (tema → respuesta) · crecimiento (crece → tema con pizz) · tensión (tension → crece en trémolo) · re mayor.
function frasePara(t, i) {
  if (t >= CIERRE - 1.2) return 'mayor';
  if (t >= PRUEBA - 0.5) return i % 2 ? 'crece' : 'tension';
  if (t >= LIGERA - 0.5) return i % 2 ? 'tema' : 'crece';
  return i % 2 ? 'respuesta' : 'tema';
}
let t = T0, iFrase = 0;
while (t < TOTAL - 0.5) {
  const nombre = frasePara(t, iFrase), fr = FRASES[nombre];
  // la frase se acorta (a compases enteros) para que re mayor llegue justo con el cierre
  const nb = nombre !== 'mayor' && t + 4 * COMP > CIERRE - 1.2 ? Math.max(1, Math.round((CIERRE - 1.2 - t) / COMP)) : 4;
  for (let c = 0; c < nb; c++) {
    const tc = t + c * COMP; if (tc >= TOTAL - 0.3) break;
    const ac = fr.ac[c], ultimo = nombre === 'mayor' && c === 3, dur = ultimo ? Math.max(COMP, TOTAL - tc - 0.4) : COMP;
    // chelo (raíz) y viola (tercera) con arco largo; en la tensión, trémolo suave
    const trem = nombre === 'tension' ? 6 : 0;
    arco(tc, ac[0] - 12 + 12, dur * 0.98, 0.07, { ataque: 0.35, vib: 0.6, brillo: 0.5 });
    arco(tc + 0.04, ac[1] + 12, dur * 0.97, nombre === 'mayor' ? 0.045 : 0.035, { ataque: 0.4, vib: 0.7, brillo: 0.6, trem });
    if (nombre !== 'tema' || iFrase > 0) arco(tc + 0.02, ac[2] + 12, dur * 0.97, 0.03, { ataque: 0.45, vib: 0.7, brillo: 0.5, trem });
    // contrabajo desde el crecimiento
    if (nombre !== 'tema' && nombre !== 'respuesta') arco(tc, ac[0] - 12, dur * 0.95, 0.06, { ataque: 0.2, vib: 0, brillo: 0.3 });
    // pizzicato (raíz-quinta) en el crecimiento; respira en el último compás de la frase
    if (nombre === 'crece' && c < 3) [0, 1, 2, 3].forEach((q) => pizz(tc + q * B, (q % 2 ? ac[2] : ac[0]) - 12 + (q === 3 ? 12 : 0), 0.11));
    // arpa (arpegio que sube) en re mayor
    if (nombre === 'mayor') [0, 1, 2, 3, 4, 5].forEach((q) => pizz(tc + q * B / 2, [ac[0], ac[1], ac[2], ac[0] + 12, ac[1] + 12, ac[2] + 12][q] + 12, 0.07));
  }
  // melodía: violín (en la respuesta la toma la viola, una octava abajo: pregunta y respuesta entre instrumentos)
  const viola = nombre === 'respuesta';
  for (const [q, midi, d] of fr.mel) {
    const tn = t + q * B; if (tn >= TOTAL - 0.4 || q >= nb * 4) continue;
    const dd = Math.min(d * B * 0.96, TOTAL - tn - 0.4, t + nb * COMP - tn);
    arco(tn, midi - (viola ? 12 : 0), dd, viola ? 0.06 : 0.055, { ataque: d >= 2 ? 0.16 : 0.07, vib: 1, brillo: viola ? 0.7 : 1 });
  }
  t += nb * COMP; iFrase++;
}

// --- efectos, en el mismo cuadro que la imagen (tiempo de autor) ------------------------------------------------
const Gc = K.Gancho, Ci = K.Ciegas, Ma = K.Madera, Ho = K.Hongos, Ad = K.Adelgaza, Li = K.Ligera, P = K.Pregunta, Ra = K.Radia, Hi = K.Hipotesis, Pb = K.Prueba, Vo = K.Votos, Oj = K.Ojo, Pc = K.Precio, Ci2 = K.Cierre, Ou = K.Outro;
m.cruje(Gc + 1.0, 0.25); m.cruje(Gc + 2.6, 0.2);                                  // el micelio recorre la tapa
for (let i = 0; i < 9; i++) m.tic(Gc + 2.6 + i * 0.17, 0.12, 1500 + i * 60);      // 0 → 9 meses
m.whoosh(Ci - 0.2, 0.5, 0.08);                                                     // cambio a la cortina
for (let r = 0; r < 9; r++) m.tic(Ci + 0.4 + r * 0.06, 0.08, 2200);               // aparece el público
for (let i = 0; i < 12; i++) m.nota(Ci + 1.3 + i * 0.1, [74, 76, 77, 79, 81][i % 5] + 12, 0.025, 0.25); // se encienden las 113
m.whoosh(Ma + 0.2, 0.6, 0.08);                                                     // entra el fondo de arce
m.whoosh(Ma + 1.85, 0.5, 0.08); m.metal(Ma + 2.0, 0.08, 1300);                     // se abre la lupa
m.golpe(Ho + 0.2, 0.25, 80);                                                       // tarjeta Empa
for (let k = 0; k < 6; k++) m.cruje(Ho + 0.8 + k * 0.9, 0.12);                    // las hifas avanzan de hueco en hueco
m.tic(Ho + 2.4, 0.12, 1400); m.tic(Ho + 3.0, 0.12, 1400); m.tic(Ho + 4.2, 0.1, 1700); m.tic(Ho + 5.6, 0.1, 1700);
m.cruje(Ad + 0.2, 0.3); m.sube(Ad + 0.3, 2.2, 55, 50, 0.025);                       // las paredes se adelgazan
m.sube(Li + 0.5, 1.1, 62, 55, 0.03);                                               // baja la densidad
[1.8, 3.2].forEach((d) => m.whoosh(Li + d, 0.9, 0.06));                            // el pulso de sonido corre por la tapa
m.sube(P + 0.1, 1.2, 57, 66, 0.035);                                               // re-gancho
m.golpe(Ra + 0.2, 0.25, 80); m.sube(Ra + 2.6, 1.0, 55, 67, 0.04); m.tic(Ra + 3.6, 0.15, 1800); // la aguja sube a BUENA
m.whoosh(Hi, 2.6, 0.05); for (let i = 0; i < 6; i++) m.tic(Hi + 0.6 + i * 0.27, 0.05, 900); // viento frío, anillos
m.golpe(Pb + 0.2, 0.25, 80); m.whoosh(Pb + 0.5, 1.2, 0.05);                       // tarjeta y cortina
for (let i = 0; i < 5; i++) { const ta = warp(Pb + 1.2 + i * 0.55); arco(ta, [74, 69, 76, 72, 81][i], 0.45, 0.05, { ataque: 0.05, vib: 0.6 }); } // cada violín suena
m.sube(Vo + 0.4, 1.6, 50, 62, 0.035); m.sube(Vo + 2.2, 1.0, 50, 55, 0.03);        // suben las barras (90 y 39)
m.golpe(Oj + 0.1, 0.35, 70); m.tic(Oj + 0.8, 0.15, 1600); m.cruje(Oj + 1.9, 0.3);  // OJO, palomita y tachón
m.metal(Pc + 0.3, 0.14, 1700); m.nota(Pc + 0.32, 88, 0.04, 0.8); m.nota(Pc + 0.45, 93, 0.035, 0.9); // ¡ka-ching!
for (let i = 0; i < 5; i++) m.nota(Ci2 + 0.4 + i * 0.22, [74, 78, 81, 86, 90][i], 0.025, 1.0); // la red se vuelve dorada

// --- sala de concierto: reverberación sencilla (peines + pasatodo) sobre las cuerdas ----------------------------
const sala = new Float32Array(N);
[[1557, 0.8], [1617, 0.79], [1491, 0.8], [1422, 0.78]].forEach(([d0, fb]) => {
  const d = Math.round(d0 * SR / 44100) * 2, b = new Float32Array(d); let p = 0, lp = 0;
  for (let i = 0; i < N; i++) { const y = b[p]; lp = y * 0.7 + lp * 0.3; b[p] = cuerdas[i] + lp * fb; sala[i] += y * 0.25; p = (p + 1) % d; }
});
[[225, 0.5], [556, 0.5]].forEach(([d0, g]) => { const d = Math.round(d0 * SR / 44100), b = new Float32Array(d); let p = 0;
  for (let i = 0; i < N; i++) { const x = sala[i], y = b[p]; b[p] = x + y * g; sala[i] = y - x * g; p = (p + 1) % d; } });
for (let i = 0; i < N; i++) m.mus[i] += (cuerdas[i] * 0.8 + sala[i] * 0.35) * Math.min(1, Math.max(0, (TOTAL - 0.1 - i / SR) / 1.4)); // el acorde final se apaga con el video
m.guardar(OUT, 1);
