// gen-audio.mjs — música y efectos del Shot Fungi Mati #137 (Ese champiñón no es una verdura). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
//
// Composición (según maestro/recetas/composicion-musical.md): pieza "de detective" a 100 BPM (compás = 2.4 s), la menor.
// Forma: A (gancho y Linneo: pizzicato y tema) → B (pistas 1–3: entra el bajo que camina y cada pista suma una voz)
// → silencio de medio compás en el re-gancho → C (pista 4, Whittaker, cinco reinos: el tema en campana, secuencia que sube)
// → D (ADN y código: puente que se vacía, solo ecos y bajo) → E (cierre: el tema regresa en LA MAYOR, más arriba) → acorde final.
// Ningún patrón se repite igual más de 2 compases: cambia la figura del pizzicato, el final de frase o la inversión.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Reino base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 137);
const K = m.K;
const G = K.Gancho, L = K.Linneo, Pa = K.Parecia, P1 = K.Pista1, P2 = K.Pista2, P3 = K.Pista3, Pr = K.Pregunta, P4 = K.Pista4,
  W = K.Whittaker, Ci = K.Cinco, A = K.ADN, Co = K.Codigo, C = K.Cierre, Ou = K.Outro;
const B = 0.6, BAR = 4 * B;                                   // negra y compás a 100 BPM
const human = (k) => (m.rnd() - 0.5) * 0.018 * k;             // pequeño desfase humano
const vel = (g) => g * (0.82 + m.rnd() * 0.3);                // intensidad que cambia nota a nota

// Acordes (MIDI) por compás: i–VI–III–V con variantes; cada uno con raíz grave y tríada media.
const AC = { Am: [45, [57, 60, 64]], F: [41, [57, 60, 65]], C: [48, [55, 60, 64]], E: [40, [56, 59, 64]], Dm: [38, [57, 62, 65]], G: [43, [55, 59, 62]],
  E7: [40, [56, 62, 64]], Fmaj7: [41, [57, 60, 64]], A: [45, [57, 61, 64]], D: [38, [57, 62, 66]], Esus: [40, [57, 59, 64]] };
const prog = ['Am', 'F', 'C', 'E', 'Am', 'Dm', 'G', 'C', 'F', 'Dm', 'E7', 'Am', 'Fmaj7', 'C', 'Dm', 'E', 'Am', 'F', 'Dm', 'Esus', 'Fmaj7', 'G', 'A', 'D', 'A', 'A', 'A', 'A'];
const compas = (t) => Math.floor(t / BAR);
const fin = Ou + 3.5;

// Cama grave continua (debajo de la voz), cambia de acorde con cada compás.
for (let i = 0; i * BAR < fin; i++) { const [r, tri] = AC[prog[i] || 'A']; const t0 = i * BAR, t1 = Math.min(fin, t0 + BAR + 0.05);
  m.pad(t0, t1, i * BAR >= A && i * BAR < C ? 0.028 : 0.04, [r + 12, tri[1] - 12, tri[2] - 12], i * BAR < P1 ? 0.25 : 0); }

// Pizzicato: figura distinta por sección (A: arpegio que sube; B: subida y bajada con nota de paso; C: síncopa; E: arpegio amplio).
for (let i = 0; i * BAR < fin - 3.5; i++) {
  const t0 = i * BAR, [r, tri] = AC[prog[i] || 'A'];
  if (t0 >= Pr - 0.2 && t0 < P4 - 0.3) continue;                         // silencio en el re-gancho
  if (t0 >= A && t0 < C) {                                               // puente: solo ecos
    [0, 3].forEach((b, k) => m.pluck(t0 + b * B + human(1), tri[k * 2 % 3] + 12, vel(0.035), 1.2));
    continue; }
  let fig;
  if (t0 < P1) fig = i % 2 ? [[0, 0], [1, 1], [2, 2], [3, 1]] : [[0, 0], [1, 2], [2.5, 1], [3, 2]];
  else if (t0 < Pr) fig = i % 2 ? [[0, 0], [0.5, 1], [1, 2], [2, 3], [3, 2], [3.5, 1]] : [[0, 2], [1, 1], [1.5, 0], [2.5, 1], [3, 2]];
  else if (t0 < C) fig = i % 2 ? [[0, 0], [1.5, 2], [2, 1], [3.5, 3]] : [[0.5, 1], [1, 2], [2.5, 0], [3, 3]];
  else fig = [[0, 0], [0.5, 1], [1, 2], [1.5, 3], [2, 2], [3, 1]];
  const voces = [...tri, tri[0] + 12];
  fig.forEach(([b, k]) => m.pluck(t0 + b * B + human(1), voces[k] + (t0 >= C ? 12 : 0), vel(t0 >= C ? 0.05 : 0.04), 0.6));
}
// Bajo que camina (desde la pista 1 hasta el puente; vuelve en el cierre), con notas de paso hacia el acorde siguiente.
for (let i = 0; i * BAR < fin - 3.5; i++) {
  const t0 = i * BAR; if (t0 < P1 - 0.1 || (t0 >= A && t0 < C) || (t0 >= Pr - 0.2 && t0 < P4 - 0.3)) continue;
  const r = AC[prog[i] || 'A'][0], sig = AC[prog[i + 1] || 'A'][0];
  const paso = sig > r ? sig - 1 : sig + 1;
  [[0, r], [1, r + 7], [2, r + 12], [3, paso]].forEach(([b, n]) => m.bajo(t0 + b * B + human(1), n, vel(0.09), 0.55));
}

// El tema (motivo → respuesta → secuencia → cadencia), en campana. A: tímido; C: completo y más arriba; E: en LA MAYOR.
const tema = (t, base, g, mayor = false) => {
  const T3 = mayor ? 1 : 0;
  const frases = [[[0, 0], [1, 3 + T3], [2, 7], [3, 5]], [[4, 3 + T3], [5, 2], [6.5, 0]], [[8, 5], [9, 8 + T3], [10, 12], [11, 10]], [[12, 7], [13, 5], [14, 4 - 1 + T3], [15, 0]]];
  frases.forEach((f) => f.forEach(([b, n]) => m.campana(t + b * B + human(1), base + n, vel(g), 1.5)));
};
tema(G + 0.6, 69, 0.03);                                       // A: el tema entra con el «?» del champiñón
tema(P4 + 0.3, 69, 0.035);                                     // C: vuelve con la pista 4
tema(W + 2.0 + 4 * BAR, 72, 0.03);                             // C': secuencia más arriba (cinco reinos)
tema(C + 0.2, 69 + 12, 0.04, true);                            // E: el tema en mayor, una octava arriba: «tiene su propio reino»
// Contracanto de las pistas: una nota más en cada pista (el acorde se "llena").
[P1, P2, P3, P4].forEach((t, k) => [0, 1, 2, 3].slice(0, k + 1).forEach((j) => m.nota(t + 0.15 + j * 0.06, [76, 79, 81, 84][j], 0.025, 2.2)));

// Efectos, en el mismo cuadro que la imagen.
m.whoosh(G + 0.05, 0.4, 0.08); m.burbuja(G + 0.12, 0.18, 380); m.tic(G + 0.68, 0.25, 900);   // brinco del champiñón y aterrizaje
m.nota(G + 0.4, 81, 0.05, 0.5); m.nota(G + 0.5, 77, 0.05, 0.6);                              // aparece el «?»
m.whoosh(L + 0.1, 0.7, 0.1);                                                                   // se abre el libro
[0, 1, 2, 3].forEach((k) => m.tic(L + 0.7 + k * 0.55, 0.18, 1500 + k * 200));                  // cada dibujo en la página
m.tic(L + 2.8, 0.2, 1100);                                                                     // chip Cryptogamia
m.nota(Pa + 0.4, 84, 0.04, 0.4); m.nota(Pa + 1.2, 86, 0.04, 0.4);                              // palomitas
for (let k = 0; k < 6; k++) m.tic(Pa + 1.7 + k * 0.05, 0.08, 600);                             // el «=» que tiembla
m.sube(P1 + 0.1, 0.8, 64, 76, 0.04);                                                           // sale el sol
for (let k = 0; k < 8; k++) m.burbuja(P1 + 1.0 + k * 0.22, 0.07, 500 + (k % 4) * 90);          // burbujitas de O₂
m.golpe(P1 + 1.2, 0.25, 90);                                                                   // chip «0 clorofila»
m.whoosh(P2 - 0.3, 0.9, 0.12);                                                                 // entra al microscopio
for (let k = 0; k < 14; k++) m.tic(P2 + 0.75 + k * 0.12, 0.07, 2200 + (k % 3) * 300);          // enzimas que salen
for (let k = 0; k < 10; k++) m.gota(P2 + 2.1 + k * 0.15, 0.08, 800 + k * 25);                  // pedacitos que regresan (absorbe)
m.cruje(P2 + 1.3, 0.25);                                                                       // la paja se deshace
for (let k = 0; k < 9; k++) m.tic(P3 + 0.2 + k * 0.09, 0.06, 1300);                            // fibras de celulosa
m.cruje(P3 + 1.8, 0.35); m.golpe(P3 + 1.8, 0.3, 70);                                           // se tacha «celulosa»
for (let k = 0; k < 8; k++) m.nota(P3 + 1.0 + k * 0.12, [69, 72, 76, 79][k % 4] + 12, 0.025, 0.3); // anillos de quitina
m.sube(Pr + 0.05, 1.6, 52, 63, 0.05); m.metal(Pr + 0.1, 0.12, 600);                            // re-gancho: pila con «?»
for (let k = 0; k < 10; k++) m.campana(P4 + 0.6 + k * 0.12, 88 + (k % 3) * 2, 0.02, 0.5);      // gránulos de glucógeno se encienden
for (let k = 0; k < 7; k++) m.campana(P4 + 1.6 + k * 0.1, 84 + (k % 2) * 3, 0.018, 0.5);      // y en el hígado
m.cruje(P4 + 3.0, 0.3); m.golpe(P4 + 3.0, 0.25, 70);                                           // tache en la papa
m.golpe(W + 0.2, 0.35, 80);                                                                    // tarjeta 1959
[0, 1, 2, 3].forEach((k) => m.tic(W + 0.6 + k * 0.25, 0.15, 1200 + k * 150));                  // línea del tiempo
[0, 1, 2].forEach((k) => m.burbuja(W + 1.6 + k * 0.5, 0.12, 420 + k * 120));                   // tres formas de comer
m.campana(W + 4.2, 81, 0.05, 2.0); m.campana(W + 4.25, 88, 0.035, 2.0);                        // se ilumina «absorben»
m.golpe(Ci + 0.1, 0.35, 80);                                                                   // tarjeta 1969
[0, 1, 2, 3, 4].forEach((k) => m.pluck(Ci + 1.2 + k * 0.18, [57, 60, 64, 69, 72][k], 0.07, 0.6)); // cinco cajas: cinco notas
m.campana(Ci + 2.3, 76, 0.04, 1.4);                                                            // brilla Fungi
m.golpe(Ci + 2.9, 0.22, 110); m.golpe(Ci + 3.05, 0.2, 120); m.golpe(Ci + 3.2, 0.2, 130);         // caen los libros
for (let k = 0; k < 22; k++) m.tic(A + 0.2 + k * 0.08, 0.05, 2600 + (k % 4) * 280);            // se lee el ADN
m.sube(A + 1.4, 1.2, 55, 62, 0.03); m.sube(A + 2.4, 1.0, 62, 69, 0.03);                        // crecen las ramas
m.nota(A + 2.6, 76, 0.04, 1.2); m.nota(A + 2.65, 81, 0.035, 1.2);                              // hongos y animales se unen
m.golpe(Co + 0.2, 0.3, 70);                                                                    // el librote
m.cruje(Co + 1.3, 0.4);                                                                        // se tacha «BOTÁNICA»
m.whoosh(Co + 1.8, 0.8, 0.07);                                                                 // se escribe la palabra nueva
m.whoosh(C + 0.8, 1.4, 0.12); m.tic(C + 2.2, 0.25, 900);                                       // la charola se muda de estante
for (let k = 0; k < 8; k++) m.campana(C + 2.25 + k * 0.05, 84 + (k % 4) * 3, 0.02, 0.8);       // destellos dorados
[0, 1, 2, 3].forEach((k) => m.pluck(C + 2.4 + k * 0.25, [69, 73, 76, 81][k], 0.05, 0.8));      // medallitas 1–4
// Acorde final que se queda sonando (LA MAYOR).
[45, 57, 61, 64, 69, 73].forEach((n, k) => m.nota(Ou + 0.3 + k * 0.03, n, k < 2 ? 0.06 : 0.04, 3.1));
m.guardar(OUT, 1);
