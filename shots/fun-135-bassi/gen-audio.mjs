// gen-audio.mjs — música + efectos del Shot Fungi Mati #135 (Bassi y la muscardina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                                   → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>      (narrar.mjs: versión narrada)
//
// Música (según maestro/recetas/composicion-musical.md): pieza de cámara a 100 BPM en la menor, con un TEMA propio de 4 compases
// (motivo → respuesta → secuencia → cadencia) que vuelve transformado. Forma con arco:
//   A · misterio (gancho → el hongo por dentro): bajo que camina, arpegio suave y el tema en registro medio.
//   B · suspensión (re-gancho): todo se vacía, queda una nota que sube.
//   C · investigación (Bassi, el libro, el experimento): pizzicato de corcheas, el tema una 4.ª arriba, la armonía avanza i–VI–VII–V.
//   D · descubrimiento (la primera prueba, «microbio»): se abre a do mayor, el tema más agudo y largo: clímax.
//   E · regreso (hoy, cierre): el tema original otra vez, ahora resuelto en la mayor; acorde final que se queda sonando.
// Nunca el mismo patrón más de 2–4 compases: cada sección tiene su ritmo y su figura de acompañamiento. La cama va siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bassi base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 135);
const K = m.K;
const G = K.Gancho, E = K.Esporas, Cu = K.Cuticula, Ad = K.Adentro, Sa = K.Sale, P = K.Pregunta, B = K.Bassi, Pu = K.Publica,
  Pr = K.Prueba, Pm = K.Primera, Pa = K.Palabra, H = K.Hoy, C = K.Cierre, Ou = K.Outro;

const BEAT = 0.6, BAR = BEAT * 4;           // 100 BPM, 4/4
// ---- utilidades de composición ----
// tocar una frase: [[nota MIDI | null, duración en tiempos], ...] desde t; vol con ligera curva humana
const frase = (t, notas, g = 0.05, transp = 0, leg = 1.15) => { let x = t; notas.forEach(([n, d], i) => {
  if (n != null) m.nota(x + (i % 2 ? 0.012 : 0), n + transp, g * (0.85 + 0.15 * Math.sin(i * 1.7)), d * BEAT * leg);
  x += d * BEAT; }); return x; };
// tema (4 compases): motivo · respuesta · secuencia · cadencia (la menor)
const TEMA = [
  [69, 1], [72, 1], [76, 1.5], [74, 0.5],    // motivo: la–do–mi, baja a re
  [72, 1], [71, 1], [69, 2],                 // respuesta: cae a la
  [71, 1], [74, 1], [77, 1.5], [76, 0.5],    // secuencia un grado arriba
  [74, 1], [72, 0.5], [71, 0.5], [69, 2],    // cadencia a la
];
const TEMA_MAYOR = TEMA.map(([n, d]) => [n === 72 ? 73 : n === 77 ? 78 : n, d]);   // la mayor (do# y fa#) para el regreso
// acompañamientos (uno distinto por sección)
const arpegio = (t, acorde, g, figura) => figura.forEach((k, i) => m.nota(t + i * BEAT / 2, acorde[k % acorde.length] + (k >= acorde.length ? 12 : 0), g, BEAT * 0.9));
const pizz = (t, acorde, g) => [0, 2, 1, 2, 0, 2, 1, 3].forEach((k, i) => m.tic(t + i * BEAT / 2 + 0.005, g * (i % 4 ? 0.6 : 1), m.hz(acorde[k % acorde.length] + 12)));
const Am = [57, 60, 64], F = [53, 57, 60], Gm = [55, 59, 62], Em = [52, 56, 59], Dm = [50, 53, 57], CM = [48, 52, 55], AM = [57, 61, 64];

// ---- A · misterio (0 → re-gancho) ----
m.pad(0, P, 0.045, [45, 52, 57], 0.1);
const progA = [Am, Am, F, Em, Am, Dm, F, Em, Am];
const figurasA = [[0, 1, 2, 1, 0, 1, 2, 1], [0, 2, 1, 2, 0, 2, 3, 2], [0, 1, 2, 3, 2, 1, 0, 1], [2, 1, 0, 1, 2, 3, 2, 1]];
for (let b = 0; b * BAR < P - 0.2; b++) {
  const t = b * BAR, ac = progA[b % progA.length];
  m.bajo(t, ac[0] - 12, 0.07, BAR * 0.9);
  if (b % 4 === 3) m.bajo(t + BEAT * 3, ac[0] - 10, 0.05, BEAT);    // nota de paso al cerrar cada 4 compases
  arpegio(t, ac, 0.018, figurasA[Math.floor(b / 2) % figurasA.length]);
}
frase(E + 0.2, TEMA, 0.04);                                         // el tema entra con los conidios

// ---- B · suspensión (re-gancho) ----
m.pad(P, B, 0.04, [45, 52, 59], 0.4);
m.sube(P + 0.1, 2.4, 64, 71, 0.04);

// ---- C · investigación (Bassi → experimento) ----
m.pad(B, Pm, 0.045, [45, 53, 57], 0);
const progC = [Am, F, Gm, Em];
for (let b = 0; B + b * BAR < Pm - 0.2; b++) {
  const t = B + b * BAR, ac = progC[b % progC.length];
  m.bajo(t, ac[0] - 12, 0.07, BEAT * 1.6); m.bajo(t + BEAT * 2, ac[0] - 12 + (b % 2 ? 7 : 5), 0.05, BEAT * 1.4);
  pizz(t, ac, b % 2 ? 0.05 : 0.065);
}
frase(B + BAR, TEMA.slice(0, 7), 0.038, 5);                           // motivo + respuesta una 4.ª arriba
frase(Pr + 0.3, [[76, 0.5], [77, 0.5], [79, 1], [76, 1], [74, 2]], 0.035); // pregunta del experimento

// ---- D · descubrimiento (la primera prueba, «microbio») ----
m.pad(Pm, H, 0.05, [48, 55, 60, 64], 0);
const progD = [CM, Gm, Am, F];
for (let b = 0; Pm + b * BAR < H - 0.2; b++) {
  const t = Pm + b * BAR, ac = progD[b % progD.length];
  m.bajo(t, ac[0] - 12, 0.08, BAR * 0.95);
  arpegio(t, ac, 0.022, b % 2 ? [0, 1, 2, 3, 2, 3, 4, 3] : [0, 2, 4, 2, 1, 3, 5, 3]);
}
frase(Pm + 0.6, [[76, 1], [79, 1], [84, 2], [83, 1], [81, 1], [79, 2], [77, 1], [76, 1], [74, 1], [79, 1], [76, 4]], 0.042); // clímax: el tema en mayor y más alto

// ---- E · regreso (hoy, cierre) ----
m.pad(H, Ou + 3.5, 0.045, [45, 52, 57, 61], 0);
const progE = [AM, Dm, AM, Em];
for (let b = 0; H + b * BAR < Ou - 0.2; b++) {
  const t = H + b * BAR, ac = progE[b % progE.length];
  m.bajo(t, ac[0] - 12, 0.07, BAR * 0.9);
  arpegio(t, ac, 0.018, [[0, 1, 2, 1, 2, 1, 0, 1], [2, 1, 0, 1, 2, 3, 2, 1]][b % 2]);
}
frase(H + 0.4, TEMA_MAYOR, 0.04);                                     // el tema vuelve, resuelto
[57, 61, 64, 69, 73].forEach((n, i) => m.nota(Ou + 0.2 + i * 0.05, n, 0.05, 3.2));   // acorde final de la mayor

// ---- efectos en el mismo cuadro que la imagen ----
m.tic(G + 0.3, 0.3, 1200); m.whoosh(G + 0.35, 0.9, 0.12);             // el palillo toca: nube de polvo
m.cruje(G + 2.0, 0.25); m.golpe(G + 2.6, 0.4, 70);                    // ¿cal? tachado · sello HONGO
for (let i = 0; i < 8; i++) m.tic(E + 0.2 + i * 0.2, 0.05, 3400 + (i % 3) * 400); // conidios que caen
m.whoosh(E + 0.9, 0.5, 0.08);                                         // se abre la lupa
[1.2, 1.5, 1.8, 2.1].forEach((d) => m.gota(E + d, 0.08, 1500));       // racimos que se pegan
m.sube(Cu + 0.2, 0.8, 72, 79, 0.03);                                  // germina
m.golpe(Cu + 1.0, 0.18, 120); m.golpe(Cu + 1.3, 0.3, 70);             // apresorio · presión
for (let i = 0; i < 8; i++) m.burbuja(Cu + 1.5 + i * 0.25, 0.06, 420 + i * 30); // enzimas
m.cruje(Cu + 3.0, 0.2);                                               // cruza la cutícula
for (let i = 0; i < 22; i++) m.burbuja(Ad + 0.6 + i * 0.136, 0.05, 600 + (i % 5) * 80); // blastosporas que se multiplican
[0.1, 0.5, 0.9, 1.3].forEach((d) => m.tic(Sa + d, 0.12, 900));        // días
m.golpe(Sa + 1.3, 0.35, 55);                                          // muere
m.cruje(Sa + 1.9, 0.3);                                               // se pone duro
m.whoosh(Sa + 2.4, 1.2, 0.07);                                        // brota el micelio
for (let i = 0; i < 6; i++) m.nota(Sa + 3.2 + i * 0.15, 88 - i * 2, 0.012, 0.5); // polvo de esporas (brillo)
m.golpe(B + 0.3, 0.25, 90);                                           // tarjeta de Bassi
for (let i = 0; i < 9; i++) m.tic(B + 0.8 + i * 0.2, 0.06, 1600);     // 1807 → 1835
m.golpe(Pu + 0.35, 0.3, 75); m.whoosh(Pu + 0.1, 0.4, 0.06);           // cae el libro
for (let i = 0; i < 6; i++) m.tic(Pu + 1.3 + i * 0.3, 0.05, 2800);    // contagio de bandeja a bandeja
[0.8, 1.4, 2.0].forEach((d) => m.metal(Pr + d, 0.06, 1800));          // la punta toca a cada gusano sano
for (let i = 0; i < 3; i++) m.nota(Pr + 2.4 + i * 0.35, 64 - i, 0.02, 0.6); // se enferman
m.golpe(Pm + 0.3, 0.3, 80); m.tic(Pm + 1.4, 0.12, 1400); m.tic(Pm + 2.6, 0.12, 1100); // 1835 · chip · Koch
m.tic(Pa + 0.2, 0.12, 1300);                                          // 1878
for (let i = 0; i < 12; i++) m.tic(Pa + 0.5 + i * 0.09, 0.03, 5000 + (i % 3) * 700); // la pluma escribe «microbio»
m.whoosh(H + 0.8, 0.5, 0.06); m.whoosh(H + 1.2, 0.6, 0.05); m.golpe(H + 2.4, 0.25, 85); // subrayado · flecha · costal
[0.8, 1.4, 2.0].forEach((d) => m.tic(C + d, 0.08, 1500)); m.golpe(C + 2.6, 0.25, 90);   // etiquetas del cierre
m.guardar(OUT, 1);
