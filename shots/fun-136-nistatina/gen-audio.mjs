// gen-audio.mjs — música y efectos del Shot Fungi Mati #136 (Nistatina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (según maestro/recetas/composicion-musical.md): pieza tipo "carta antigua" a 100 BPM con forma y arco:
//   A (gancho y boca): tema de 4 compases en la menor, arpegio de cuerda pulsada.
//   B (al microscopio): el tema en re menor, más grave y "tapado" (tensión del hongo que crece); bajo que sube por semitonos.
//   respiro (¿Y quién la encontró?): todo calla menos una nota larga.
//   C (la historia por correo): el tema pasa a do mayor (I–V–vi–IV), con respuesta de campanita: pregunta y respuesta.
//   D (bacteria y regalías): el tema una octava arriba, más lleno.
//   coda (cierre): regresa el motivo del inicio y resuelve en do mayor; el último acorde se queda sonando en la tarjeta.
// Nunca el mismo compás más de 4 veces: cada sección cambia final de frase, registro o acompañamiento. Siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Nistatina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 136);
const K = m.K;
const G = K.Gancho, Bo = K.Boca, Ca = K.Candida, Pa = K.Parecidas, Er = K.Ergosterol, Co = K.Colesterol, P = K.Pregunta, H = K.Hazen,
  Cr = K.Correo, Br = K.Brown, St = K.Streptomyces, R = K.Regalias, C = K.Cierre, Ou = K.Outro;
const BEAT = 0.6, BAR = 4 * BEAT;

// ---- armonía: acordes (MIDI) ----
const AC = { Am:[57, 60, 64], F:[53, 57, 60], C:[48, 52, 55, 60], G:[55, 59, 62], Dm:[50, 53, 57], E:[52, 56, 59], Em:[52, 55, 59] };
// arpegio de 8.os sobre un acorde (patrón que cambia: 0 sube, 1 sube-baja, 2 quebrado)
function arpegio(t0, acorde, compases, g, patron = 0, oct = 12, tapa = 0) {
  const n = AC[acorde].map((x) => x + oct);
  const pats = [[0, 1, 2, 1, 0, 1, 2, 1], [0, 1, 2, 3 % n.length, 2, 1, 0, 2], [0, 2, 1, 2, 0, 2, 1, 0]];
  for (let c = 0; c < compases; c++) pats[patron].forEach((k, i) => { const t = t0 + c * BAR + i * BEAT / 2; if (t < t0 + compases * BAR) m.nota(t, n[k % n.length], g * (i % 2 ? 0.7 : 1) * (0.9 + 0.2 * m.rnd()), 0.5, tapa); });
}
function bajo(t0, raiz, compases, g = 0.07) { for (let c = 0; c < compases; c++) { m.bajo(t0 + c * BAR, raiz - 12, g, 1.4); m.bajo(t0 + c * BAR + 2 * BEAT, raiz - 12 + (c % 2 ? 7 : 0), g * 0.7, 1.0); } }
// tema (4 compases): motivo → respuesta → secuencia → cadencia. [tiempo en beats, nota relativa a la tónica, duración en beats]
const TEMA = [[0, 0, 1], [1, 3, 0.5], [1.5, 7, 1.5], [3, 5, 1],          // motivo
  [4, 3, 1], [5, 2, 0.5], [5.5, 0, 1.5], [7, -2, 1],                       // respuesta
  [8, 2, 1], [9, 5, 0.5], [9.5, 9, 1.5], [11, 7, 1],                       // secuencia (motivo un paso arriba)
  [12, 5, 1], [13, 3, 0.5], [13.5, 2, 1], [14.5, 0, 1.5]];                 // cadencia en la tónica
const MAYOR = { 0:0, 2:2, 3:4, 5:5, 7:7, 9:9, '-2':-1 };                  // mismo dibujo en mayor
function tema(t0, tonica, g, { mayor = false, desde = 0, hasta = 16, tapa = 0 } = {}) {
  TEMA.forEach(([b, r, d]) => { if (b < desde || b >= hasta) return; const st = mayor ? (MAYOR[r] ?? r) : r; m.nota(t0 + (b - desde) * BEAT, tonica + st, g * (b % 4 === 0 ? 1.1 : 0.9), d * BEAT * 1.6, tapa); });
}
function campana(t, mm, g = 0.035) { m.nota(t, mm, g, 1.4); m.nota(t + 0.004, mm + 12, g * 0.35, 1.0); }

// ---- A: gancho y boca (la menor) ----
m.pad(0, Ca, 0.035, [45, 52, 57]);
arpegio(G + 0.1, 'Am', 1, 0.045, 0); arpegio(G + 0.1 + BAR, 'F', 1, 0.045, 0); arpegio(G + 0.1 + 2 * BAR, 'C', 1, 0.045, 1); arpegio(G + 0.1 + 3 * BAR, 'G', 1, 0.045, 2);
tema(G + 0.1, 69, 0.03, { hasta: 8 });                                     // el motivo asoma desde el inicio
bajo(G + 0.1, 57, 1); bajo(G + 0.1 + BAR, 53, 1); bajo(G + 0.1 + 2 * BAR, 48, 1); bajo(G + 0.1 + 3 * BAR, 55, 1);
// ---- B: al microscopio (re menor, tapado, bajo que sube) ----
m.pad(Ca, P, 0.045, [38, 45, 50], 0.5);
['Dm', 'Am', 'E', 'Am', 'Dm', 'E'].forEach((a, i) => { if (Ca + i * BAR < P) arpegio(Ca + i * BAR, a, 1, 0.032, i % 3, 0, 0.6); });
tema(Ca + BAR, 62, 0.026, { desde: 8, tapa: 0.5 });
[50, 51, 52, 53, 52, 52].forEach((r, i) => { if (Ca + i * BAR < P) bajo(Ca + i * BAR, r, 1, 0.06); });
// ---- respiro ----
m.nota(P + 0.05, 64, 0.04, 1.8); m.nota(P + 0.05, 52, 0.05, 1.8);
// ---- C: la historia por correo (do mayor) ----
m.pad(H, St, 0.035, [48, 55, 60]);
['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'G'].forEach((a, i) => { if (H + i * BAR < St) { arpegio(H + i * BAR, a, 1, 0.034, (i >> 1) % 3); bajo(H + i * BAR, AC[a][0], 1, 0.055); } });
tema(H + 0.0, 72, 0.032, { mayor: true });
[[H + 4 * BAR, 79], [H + 4 * BAR + BEAT, 76], [H + 4 * BAR + 2 * BEAT, 74], [H + 5 * BAR, 77], [H + 5 * BAR + BEAT, 76], [H + 5 * BAR + 2 * BEAT, 72]].forEach(([t, n]) => campana(t, n, 0.028)); // respuesta
// ---- D: bacteria y regalías (la menor → do, una octava arriba) ----
m.pad(St, C, 0.04, [45, 52, 57, 64]);
['Am', 'F', 'C', 'G', 'Am', 'F'].forEach((a, i) => { if (St + i * BAR < C) { arpegio(St + i * BAR, a, 1, 0.038, (i + 1) % 3, 24); bajo(St + i * BAR, AC[a][0], 1, 0.06); } });
tema(St + BAR, 81, 0.026);
// ---- coda: regresa el motivo y resuelve en do mayor ----
m.pad(C, Ou + 3.5, 0.04, [48, 55, 60, 64]);
arpegio(C, 'F', 1, 0.035, 0); arpegio(C + BAR, 'G', 1, 0.033, 1); bajo(C, 53, 1); bajo(C + BAR, 55, 1);
tema(C + 0.1, 72, 0.03, { mayor: true, hasta: 8 });
[48, 55, 60, 64, 67].forEach((n, i) => m.nota(Ou + 0.2 + i * 0.06, n, 0.05, 3.2));
campana(Ou + 0.4, 84, 0.04);

// ---- efectos, cada uno en el cuadro de su evento ----
m.whoosh(G, 0.5, 0.1); m.golpe(G + 0.6, 0.25, 140); m.metal(G + 0.62, 0.08, 1200);          // cae el frasquito y rebota (vidrio)
m.cruje(G + 1.4, 0.18); m.whoosh(G + 1.9, 0.8, 0.07); m.metal(G + 2.6, 0.07, 1600);          // se abre la caja; sale el frasco mason
for (let i = 0; i < 9; i++) m.burbuja(Bo + 0.6 + i * 0.2, 0.05, 600 + i * 30);                  // aparecen las placas blancas
for (let o = 1; o <= 5; o++) for (let k = 0; k < 3; k++) m.burbuja(Ca + 0.1 + (o - 1) * 0.5 + k * 0.08, 0.05, 500 + o * 60); // levaduras que se multiplican
m.golpe(Pa + 0.2, 0.18, 90); m.golpe(Pa + 0.7, 0.18, 110); m.tic(Pa + 1.8, 0.12, 1400);        // las dos células; chip
for (let i = 0; i < 4; i++) m.tic(Er + 0.3 + i * 0.35, 0.08, 2200);                          // llegan las moléculas de nistatina
m.golpe(Er + 1.9, 0.2, 200);                                           // se abre el poro
for (let i = 0; i < 12; i++) m.gota(Er + 2.5 + i * 0.11, 0.06, 1100 + i * 40);                  // se escapa el potasio
for (let i = 0; i < 5; i++) m.tic(Co + 0.2 + i * 0.15, 0.06, 1500); m.tic(Co + 1.4, 0.12, 1300);  // rebotan; chip
m.sube(P + 0.1, 1.2, 52, 64, 0.04);                                                             // re-gancho
m.golpe(H + 0.3, 0.25, 80);                                                                     // tarjeta 1948
for (let k = 0; k < 3; k++) m.tic(H + 1.2 + k * 0.4, 0.12, 900);                              // muestras de tierra
m.sube(H + 3.6, 1.4, 60, 67, 0.025);                                                            // halo
m.whoosh(Cr + 1.0, 2.6, 0.06); m.golpe(Cr + 3.6, 0.2, 120); m.cruje(Cr + 3.8, 0.12);          // la caja viaja y llega a Albany
for (let i = 0; i < 6; i++) m.tic(Cr + 1.8 + i * 0.2, 0.05, 1700);                            // cuenta de km
for (let i = 0; i < 3; i++) m.burbuja(Br + 0.3 + i * 0.4, 0.06, 420);                          // matraz
m.whoosh(Br + 0.9, 1.3, 0.06); m.sube(Br + 2.0, 1.3, 64, 72, 0.025);                           // regresa la caja; halo
m.zumbido(St + 0.1, 2.5, 0.02, 160); for (let i = 0; i < 14; i++) m.tic(St + 2.4 + i * 0.12, 0.04, 2600); // filamentos y esporas
m.golpe(R + 0.2, 0.25, 90); m.tic(R + 1.2, 0.1, 1800);                                          // NYSTATIN; New York State
m.golpe(R + 3.0, 0.2, 110); for (let i = 0; i < 14; i++) m.metal(R + 3.6 + i * 0.12, 0.05, 1500 + (i % 3) * 200); // monedas
m.metal(C + 0.5, 0.06, 900); m.tic(C + 1.6, 0.1, 1400);                                         // etiqueta nueva; chip
m.guardar(OUT, 1);
