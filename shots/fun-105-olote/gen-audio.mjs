// gen-audio.mjs — música y efectos del Shot Fungi Mati #105 (Olote). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): ~100 BPM (compás = 2.4 s), un tema propio que evoluciona por secciones:
//   A gancho/número (la menor, curioso) → B cocina (pulso de bajo) → C micelio a oscuras (filtrado, el arpegio crece una nota
//   por compás) → re-gancho (sube) → D fruto (se abre a do mayor, el tema arriba) → E estudio (pizzicato tranquilo) →
//   F Robert/futuro (el tema regresa en el registro grave) → cadencia F–G–C que se queda sonando en el cierre.
//   Nunca el mismo patrón más de 4 compases; todo debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Olote base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 105);
const K = m.K;
const G = K.Gancho, N = K.Numero, Pr = K.Preparar, Se = K.Semilla, Os = K.Oscuro, En = K.Enzimas, P = K.Pregunta, Fr = K.Fruto,
  E = K.Estudio, Ro = K.Robert, So = K.Sobra, Fu = K.Futuro, C = K.Cierre, Ou = K.Outro;
const BEAT = 0.6, BAR = 4 * BEAT;

// acordes (MIDI) — voz media, para la cama
const AC = { Am:[57, 60, 64], F:[53, 57, 60], C:[55, 60, 64], G:[55, 59, 62], Dm:[57, 62, 65], E:[56, 59, 64], Em:[55, 59, 64], AmG:[55, 60, 64] };
const RAIZ = { Am:45, F:41, C:48, G:43, Dm:50, E:40, Em:40, AmG:43 };
// toca una sección: acordes por compás, bajo y una melodía [tiempo en beats, nota, duración en beats]
function seccion(t0, t1, acordes, { g = 0.045, tapa = 0, bajo = 0.06, bajoBeats = [0], mel = [], melG = 0.05, melTapa = 0 } = {}) {
  let i = 0;
  for (let t = t0; t < t1 - 0.05; t += BAR, i++) {
    const a = acordes[i % acordes.length], fin = Math.min(t + BAR, t1);
    m.pad(t - 0.15, fin + 0.15, g, AC[a], tapa);
    if (bajo) bajoBeats.forEach((b) => { if (t + b * BEAT < fin) m.bajo(t + b * BEAT, RAIZ[a], bajo, 0.5); });
  }
  mel.forEach(([b, n, d]) => { const t = t0 + b * BEAT; if (t < t1) m.nota(t, n, melG, d * BEAT, melTapa); });
}

// A · gancho y número: la menor, el tema aparece (motivo → respuesta → secuencia → cadencia)
seccion(G, Pr, ['Am', 'F', 'C', 'G'], { bajo: 0.05, mel: [
  [0, 69, 1], [1, 72, 0.5], [1.5, 76, 1.5], [3, 74, 1],             // motivo
  [4, 72, 1], [5, 69, 0.5], [5.5, 67, 2.5],                          // respuesta
  [8, 72, 1], [9, 76, 0.5], [9.5, 79, 1.5], [11, 76, 1],             // secuencia (una 3.ª arriba)
  [12, 74, 1.5], [13.5, 71, 0.5], [14, 67, 2] ] });                   // cadencia en sol
// B · remojar, pasteurizar, sembrar: pulso de bajo en 1 y 3, notas cortas (cocina)
seccion(Pr, Os, ['Dm', 'Am', 'F', 'E', 'Dm', 'Am', 'F', 'G'], { bajo: 0.07, bajoBeats: [0, 2], mel: [
  [0, 74, 0.5], [0.5, 76, 0.5], [1, 77, 1], [2.5, 76, 0.5], [3, 74, 1],
  [4, 72, 0.5], [4.5, 74, 0.5], [5, 76, 2],
  [8, 77, 0.5], [8.5, 76, 0.5], [9, 74, 0.5], [9.5, 72, 0.5], [10, 71, 2],
  [12, 69, 0.5], [12.5, 71, 0.5], [13, 72, 1], [14, 74, 1], [15, 76, 1] ] });
// C · a oscuras y por dentro: cama tapada; el arpegio del micelio suma una nota por compás
seccion(Os, P, ['Am', 'AmG', 'F', 'E'], { tapa: 0.55, bajo: 0.05, bajoBeats: [0] });
{ const arp = [57, 60, 64, 67, 69, 72]; let i = 0;
  for (let t = Os; t < P - 0.1; t += BAR, i++) { const n = Math.min(arp.length, 2 + i);
    for (let k = 0; k < 8; k++) { const tt = t + k * BEAT / 2; if (tt < P - 0.1) m.nota(tt, arp[k % n] + (i === 1 && k % 4 === 3 ? -2 : 0), 0.028 + 0.006 * i, 0.4, 0.45 - 0.08 * i); } } }
// re-gancho
m.sube(P + 0.1, 1.4, 52, 64, 0.05); m.pad(P - 0.1, Fr + 0.1, 0.04, AC.E, 0.2);
// D · fruto: se abre a do mayor, el tema arriba y brillante
seccion(Fr, E, ['C', 'G', 'Am', 'F'], { g: 0.05, bajo: 0.06, mel: [
  [0, 76, 1], [1, 79, 0.5], [1.5, 84, 1.5], [3, 83, 1],
  [4, 79, 1], [5, 76, 0.5], [5.5, 74, 2.5] ], melG: 0.055 });
// E · estudio: pizzicato tranquilo en corcheas que cambia de figura cada 2 compases
seccion(E, Ro, ['F', 'G', 'Em', 'Am'], { g: 0.04, bajo: 0.05, bajoBeats: [0, 2.5] });
{ const figs = [[0, 2, 4, 2], [4, 2, 0, -1], [0, 4, 7, 4], [7, 4, 2, 0]]; const esc = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76];
  let b = 0; for (let t = E; t < Ro - 0.1; t += BEAT, b++) { const f = figs[Math.floor(b / 8) % 4], st = f[b % 4] + 2; m.nota(t, esc[Math.max(0, st)], 0.03, 0.3); } }
// F · Robert, lo que sobra y la meta: el tema regresa en el registro grave (otro "instrumento")
seccion(Ro, C, ['C', 'Am', 'F', 'G', 'C', 'Em', 'F', 'G'], { g: 0.045, bajo: 0.05, bajoBeats: [0, 1.5, 2], mel: [
  [0, 57, 1], [1, 60, 0.5], [1.5, 64, 1.5], [3, 62, 1],
  [4, 60, 1], [5, 57, 0.5], [5.5, 55, 2.5],
  [8, 64, 1], [9, 67, 0.5], [9.5, 72, 1.5], [11, 71, 1],
  [12, 69, 1], [13, 67, 1], [14, 64, 2],
  [16, 72, 1], [17, 76, 0.5], [17.5, 79, 1.5], [19, 77, 1], [20, 76, 2], [22, 74, 2] ], melG: 0.05 });
// cierre: cadencia F – G – C y el acorde se queda sonando en la tarjeta final
m.pad(C - 0.15, C + 1.2, 0.05, AC.F); m.bajo(C, RAIZ.F, 0.05, 0.6);
m.pad(C + 1.0, C + 2.3, 0.05, AC.G); m.bajo(C + 1.1, RAIZ.G, 0.05, 0.6);
m.pad(C + 2.1, Ou + 3.6, 0.055, [48, 55, 60, 64]); m.bajo(C + 2.2, 36, 0.06, 1.2);
m.nota(C + 0.1, 69, 0.05, 0.6); m.nota(C + 0.7, 72, 0.05, 0.5); m.nota(C + 1.1, 74, 0.05, 0.8); m.nota(C + 2.2, 76, 0.055, 1.6);
m.nota(Ou + 0.3, 72, 0.05, 2.8); m.nota(Ou + 0.3, 76, 0.04, 2.8); m.nota(Ou + 0.3, 79, 0.035, 2.8);

// ---- efectos, en el mismo cuadro que la imagen ----
m.whoosh(G + 0.1, 0.7, 0.14);                                                  // la mano avienta el olote
m.golpe(G + 1.0, 0.2, 110); m.sube(G + 1.0, 1.0, 60, 67, 0.04);                // se frena en el aire y regresa
m.cruje(G + 1.4, 0.25);                                                        // se tacha "basura"
m.tic(G + 1.9, 0.18, 1500);                                                    // chip
for (let i = 0; i < 10; i++) m.tic(N + 0.4 + 1.6 * cruce((i + 1) / 10) * 0.9, 0.08, 2200 + i * 60); // cuenta 850 g
for (let i = 0; i < 7; i++) m.burbuja(N + 1.2 + i * 0.28, 0.07, 380 + i * 40); // crecen las setas en el plato
m.metal(N + 1.4, 0.06, 520);                                                   // la báscula se mueve
m.tic(N + 3.8, 0.15, 1500);                                                    // chip
for (let i = 0; i < 3; i++) { m.gota(Pr + 0.15 + i * 0.27, 0.2, 520 + i * 90); m.whoosh(Pr + 0.05 + i * 0.27, 0.25, 0.04); } // olotes al agua
m.tic(Pr + 1.0, 0.12, 1300); m.golpe(Pr + 1.2, 0.18, 90);                      // flecha y olla
for (let i = 0; i < 14; i++) m.burbuja(Pr + 1.5 + i * 0.17, 0.06, 300 + (i % 4) * 70); // hierve
m.sube(Pr + 1.6, 1.2, 55, 67, 0.035); m.tic(Pr + 1.6, 0.15, 1700);             // termómetro a 70 °C
m.tic(Pr + 2.4, 0.13, 1500);
m.whoosh(Se + 0.3, 0.8, 0.08);                                                 // el frasco se inclina
for (let i = 0; i < 18; i++) m.tic(Se + 1.5 + i * 0.08, 0.08, 1100 + (i % 5) * 160); // caen los granos
m.tic(Se + 0.5, 0.13, 1500); m.tic(Se + 3.0, 0.13, 1500);
m.tic(Os + 0.2, 0.3, 800); m.golpe(Os + 0.2, 0.12, 140);                       // se apaga la luz
for (let k = 1; k <= 15; k++) m.tic(Os + 0.5 + 2.9 * cruce(k / 15), 0.07, 2600); // días 1 → 15
m.zumbido(Os + 0.6, 2.8, 0.025, 110);                                          // el micelio avanza
m.whoosh(En + 0.1, 0.6, 0.1);                                                  // se abre la lupa
m.zumbido(En + 0.3, 2.0, 0.03, 160);                                           // crecen las hifas
m.cruje(En + 2.0, 0.3);
for (let i = 0; i < 18; i++) m.tic(En + 2.2 + i * 0.12 + (i % 3) * 0.02, 0.07, 1800 + (i % 6) * 250); // enzimas cortan la fibra
for (let i = 0; i < 3; i++) m.tic(Fr + 0.1 + i * 0.15, 0.2, 3000);             // cortes en la bolsa
m.whoosh(Fr + 0.4, 1.6, 0.06);                                                 // aire fresco
[0, 1, 2].forEach((i) => { m.burbuja(Fr + 1.2 + i * 0.35, 0.12, 700); m.nota(Fr + 1.25 + i * 0.35, 84 + i * 2, 0.03, 0.3); }); // brotan
[0.4, 0.9, 1.4, 1.9].forEach((d) => m.tic(Fr + d, 0.1, 1500));               // chips
m.golpe(E + 0.15, 0.3, 80);                                                    // tarjeta del estudio
m.sube(E + 2.8, 1.2, 55, 64, 0.04); m.tic(E + 3.5, 0.12, 1700);                // suben las barras
for (let i = 0; i < 5; i++) m.tic(E + 4.6 + i * 0.06, 0.06, 2400);           // hojas de calendario (19 días)
for (let i = 0; i < 7; i++) m.tic(E + 6.2 + i * 0.06, 0.06, 2000);           // (26 días)
m.tic(Ro + 0.3, 0.13, 1500);
for (let i = 0; i < 8; i++) m.burbuja(Ro + 0.8 + i * 0.09, 0.07, 250 + i * 30); // fermenta
m.golpe(Ro + 1.6, 0.25, 70);                                                   // ✗
for (let i = 0; i < 7; i++) m.burbuja(Ro + 2.6 + i * 0.2, 0.06, 500 + i * 45);  // setas enormes
m.tic(Ro + 3.0, 0.12, 1500); m.nota(Ro + 3.6, 84, 0.04, 0.5); m.nota(Ro + 3.68, 88, 0.035, 0.5); // ✓
m.golpe(So + 0.1, 0.18, 100);                                                  // bloque
m.whoosh(So + 0.8, 0.4, 0.06); m.whoosh(So + 1.6, 0.4, 0.06);                  // flechas
m.sube(So + 1.1, 0.9, 60, 72, 0.03);                                           // crece la planta
m.zumbido(So + 1.9, 0.6, 0.04, 120);                                           // la vaca
m.cruje(Fu + 0.2, 0.2);                                                        // montaña de bagazo
m.tic(Fu + 0.3, 0.12, 1500); m.whoosh(Fu + 2.0, 0.6, 0.06);                    // flecha a futuro
m.metal(Fu + 2.4, 0.07, 1300);                                                 // el plato
for (let i = 0; i < 7; i++) m.burbuja(C + 0.2 + i * 0.22, 0.06, 520 + i * 50); // brotan las setas del olote
m.tic(C + 1.0, 0.12, 1500);
m.whoosh(Ou, 0.8, 0.06);
m.guardar(OUT, 1);
