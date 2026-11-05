// gen-audio.mjs — música + efectos del Shot Fungi Mati #139 (Beatrix Potter, micóloga). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
//
// Música (según maestro/recetas/composicion-musical.md): pieza de cámara pastoral a 100 BPM, compuesta, no al azar.
//   A (gancho → cartero): tema propio en Fa mayor, celesta + cuerdas; frases motivo → respuesta → secuencia → cadencia.
//   B (microscopio → hifas): el tema en re dórico, registro grave, celesta que "germina" en arpegios que suben.
//   C (Sociedad Linneana → perdido): re menor, cuerdas apagadas, el tema roto (no termina su frase); casi silencio en «perdido».
//   D (enoki → cierre): el tema regresa completo, una octava arriba y con otra voz (cuerda cantando), cadencia plena en Fa.
// Cama siempre debajo de la voz, sin golpe marcado; cada evento en pantalla tiene su efecto en el mismo cuadro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Potter base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 139);
const K = m.K;
const G = K.Gancho, Au = K.Autora, Ci = K.Cientos, Ca = K.Cartero, Mi = K.Microscopio, P = K.Pregunta, V = K.Vidrio, Hi = K.Hifas,
  E = K.Estudio, Ms = K.Massee, Pe = K.Perdido, En = K.Enoki, C = K.Cierre, Ou = K.Outro;

const BEAT = 0.6, BAR = 4 * BEAT;   // 100 BPM
// acordes: [nombre, notas de cuerdas (voces conducidas), bajo]
const AC = {
  F: [[53, 57, 60, 65], 41], C_E: [[52, 55, 60, 64], 40], Dm: [[53, 57, 62, 65], 38], Bb: [[53, 58, 62, 65], 34], Am: [[52, 57, 60, 64], 45],
  C: [[52, 55, 60, 67], 36], Gm: [[50, 55, 58, 62], 43], A: [[49, 52, 57, 61], 45], Em7: [[50, 55, 59, 62], 40], G: [[50, 55, 59, 62], 43],
  Dm_low: [[50, 53, 57, 62], 38], Fsus: [[53, 58, 60, 65], 41], Bbmaj7: [[53, 57, 62, 65], 34],
};
function compas(t, nombre, g = 0.022, tapa = 0) {
  const [voces, bajo] = AC[nombre];
  voces.forEach((n, i) => m.cuerda(t + i * 0.03, n, g * (tapa ? 0.6 : 1), BAR + 0.15, 0.5));
  m.cuerda(t, bajo, g * 1.3, BAR + 0.1, 0.4);
  m.pizz(t, bajo, tapa ? 0.03 : 0.045); m.pizz(t + 2 * BEAT, bajo + 7, tapa ? 0.02 : 0.03);
}
// frase melódica: lista de [nota, duración en tiempos] (0 = silencio)
function frase(t, notas, inst = 'celesta', g = 0.05, oct = 0) {
  let u = t;
  for (const [n, d] of notas) { if (n) { if (inst === 'celesta') m.celesta(u, n + oct, g, Math.max(0.8, d * BEAT * 1.6)); else m.cuerda(u, n + oct, g, d * BEAT + 0.2, 0.12); } u += d * BEAT; }
}
// TEMA (4 compases): motivo · respuesta · secuencia · cadencia
const MOTIVO = [[69, 1], [72, 0.5], [74, 0.5], [72, 1], [69, 1]];
const RESP = [[67, 1], [65, 0.5], [67, 0.5], [69, 2]];
const SECU = [[70, 1], [74, 0.5], [76, 0.5], [74, 1], [70, 1]];      // el motivo una cuarta arriba (sobre Bb)
const CAD = [[69, 1], [67, 1], [65, 2]];
const RESP2 = [[67, 1], [69, 0.5], [70, 0.5], [72, 2]];              // respuesta abierta (pregunta)

// ---------- A · gancho → cartero (0 → Mi) ----------
const progA = ['F', 'C_E', 'Dm', 'Bb', 'F', 'Am', 'Bb', 'C'];
for (let i = 0; i * BAR < Mi - 0.1; i++) compas(G + i * BAR, progA[i % progA.length], 0.02);
frase(G + 0.05, MOTIVO); frase(G + BAR, RESP); frase(G + 2 * BAR, SECU); frase(G + 3 * BAR, CAD);
frase(G + 4 * BAR, MOTIVO, 'celesta', 0.045, 12); frase(G + 5 * BAR, RESP2, 'celesta', 0.045); frase(G + 6 * BAR, SECU, 'celesta', 0.04, -12);
// ---------- B · microscopio → hifas (Mi → E): re dórico, grave ----------
const progB = ['Dm_low', 'Em7', 'F', 'G', 'Dm_low', 'Em7', 'Bbmaj7', 'C'];
for (let i = 0; Mi + i * BAR < E - 0.1; i++) compas(Mi + i * BAR, progB[i % progB.length], 0.018);
frase(Mi + 0.2, [[62, 1], [65, 0.5], [67, 0.5], [65, 1], [62, 1]], 'cuerda', 0.02, -12);   // el motivo en menor, en las cuerdas graves
frase(Mi + BAR, [[60, 1], [59, 1], [62, 2]], 'cuerda', 0.02, -12);
frase(P + 0.1, [[69, 1], [72, 0.5], [74, 0.5], [76, 2]], 'celesta', 0.045);                 // la pregunta: el motivo sin cadencia, sube
// arpegios que "germinan" (uno por espora que brota)
[0, 1, 3, 4, 5].forEach((k, j) => { const t0 = Hi + 0.3 + j * 0.75; [62, 65, 69, 72, 74].forEach((n, q) => m.celesta(t0 + q * 0.12, n + (j % 2) * 2, 0.025, 0.9)); });
// ---------- C · Sociedad Linneana → perdido (E → En): re menor, apagado ----------
const progC = ['Dm', 'Bb', 'Gm', 'A', 'Dm', 'Gm', 'A', 'Dm'];
for (let i = 0; E + i * BAR < Pe + 1.6; i++) compas(E + i * BAR, progC[i % progC.length], 0.018, 1);
frase(E + 0.1, [[62, 1], [65, 0.5], [67, 0.5], [65, 1], [62, 1]], 'celesta', 0.035);
frase(Ms + 0.6, [[57, 1], [58, 1], [57, 1], [55, 1]], 'cuerda', 0.016);
frase(Ms + BAR + 0.6, [[62, 1], [65, 0.5], [64, 0.5], [0, 2]], 'celesta', 0.03);              // el tema se corta
m.cuerda(Pe + 1.6, 38, 0.02, 3.4, 1.2); m.cuerda(Pe + 1.6, 50, 0.012, 3.4, 1.2);            // «perdido»: queda solo una nota grave
m.cuerda(Pe + 3.1, 46, 0.016, 2.6, 0.6); m.cuerda(Pe + 3.1, 53, 0.012, 2.6, 0.6); m.cuerda(Pe + 3.1, 57, 0.01, 2.6, 0.6); // 1997: Bb, se abre
// ---------- D · enoki → cierre (En → Ou): el tema regresa completo, otra voz ----------
const progD = ['F', 'C_E', 'Dm', 'Bb', 'F', 'Bb', 'C', 'F'];
for (let i = 0; En + i * BAR < Ou - 0.1; i++) compas(En + i * BAR, progD[i % progD.length], 0.022);
frase(En + 0.05, MOTIVO, 'cuerda', 0.022, 0); frase(En + BAR, RESP, 'cuerda', 0.022, 0);
frase(En + 2 * BAR, SECU, 'celesta', 0.045, 12); frase(En + 3 * BAR, CAD, 'celesta', 0.045, 12);
frase(C + 0.3, [[72, 1], [74, 0.5], [76, 0.5], [77, 1], [76, 1]], 'celesta', 0.04);
// ---------- Outro: cadencia plena en Fa ----------
compas(Ou, 'Fsus', 0.02); m.cuerda(Ou + 1.2, 57, 0.02, 2.2, 0.3);
[65, 69, 72, 77].forEach((n, i) => m.celesta(Ou + 0.3 + i * 0.18, n, 0.045, 2.6));
m.cuerda(Ou, 41, 0.03, 3.4, 0.3); m.cuerda(Ou, 53, 0.02, 3.4, 0.3);

// ---------- efectos (mismo cuadro que en pantalla) ----------
m.whoosh(G, 0.4, 0.12); m.tic(G + 0.35, 0.18, 900);                                   // cae la hoja
for (let i = 0; i < 6; i++) m.whoosh(G + 0.2 + i * 0.34, 0.3, 0.045);                  // pinceladas
m.golpe(G + 2.6, 0.4, 70); m.tic(G + 2.62, 0.2, 1200);                                 // sello DATO CIENTÍFICO
m.whoosh(Au + 0.8, 0.7, 0.08); for (let i = 0; i < 6; i++) m.tic(Au + 1.7 + i * 0.09, 0.05, 3200); // entra el conejo y olfatea
for (let i = 0; i < 7; i++) m.tic(Ci + 0.15 + i * 0.12, 0.1, 1500 + i * 60);          // se abanican las hojas
m.whoosh(Ci + 1.4, 0.6, 0.1);                                                          // la hoja del corte
m.whoosh(Ca + 0.9, 1.2, 0.1); m.tic(Ca + 2.1, 0.16, 1100);                             // vuela la carta y llega
m.whoosh(Mi, 0.5, 0.1); m.metal(Mi + 0.8, 0.08, 980);                                  // microscopio, perilla de enfoque
m.sube(Mi + 1.2, 0.8, 50, 62, 0.03); m.whoosh(Mi + 1.2, 0.8, 0.08);                    // entramos por el ocular
for (let i = 0; i < 4; i++) m.tic(Mi + 2.5 + i * 0.15, 0.06, 2600);                    // lápiz
m.sube(P + 0.1, 1.2, 52, 64, 0.03);                                                    // re-gancho
m.gota(V + 0.05, 0.18, 800);                                                           // la gota en el vidrio
for (let i = 0; i < 12; i++) m.tic(V + 1.3 + i * 0.09, 0.03, 4200);                    // esporas que caen en la gota
[0, 1, 3, 4, 5].forEach((k, j) => m.burbuja(Hi + 0.3 + j * 0.75, 0.07, 500 + j * 60)); // brota cada tubo germinativo
for (let i = 0; i < 10; i++) m.tic(Hi + 1.6 + i * 0.3, 0.035, 2000);                   // tabiques
m.golpe(E + 0.2, 0.3, 80); [0.8, 1.0, 1.2].forEach((d) => m.tic(E + d, 0.1, 1300));      // tarjeta 1897 y hojas del trabajo
m.whoosh(Ms + 0.1, 0.6, 0.08); m.golpe(Ms + 1.0, 0.35, 55); m.tic(Ms + 0.85, 0.12, 1400); // llega ella; la puerta se cierra; letrero
m.whoosh(Ms + 2.4, 1.0, 0.08); m.tic(Ms + 3.4, 0.1, 1200);                             // el trabajo pasa a Massee
m.whoosh(Pe + 0.3, 0.9, 0.08);                                                         // regresa a ella
m.whoosh(Pe + 1.6, 1.0, 0.05);                                                         // se desvanece
m.golpe(Pe + 3.1, 0.3, 80);                                                            // tarjeta 1997
m.whoosh(En + 0.2, 0.6, 0.08); m.whoosh(En + 2.2, 0.7, 0.08); m.tic(En + 3.8, 0.12, 1500); // hongo, paquete de enoki, chip
for (let i = 0; i < 6; i++) m.tic(C + 0.8 + i * 0.13, 0.05, 2600);                     // anotaciones a lápiz
m.whoosh(C + 1.6, 0.7, 0.07); m.tic(C + 2.0, 0.1, 1500);                               // vuelve el conejo; chip
m.guardar(OUT, 1);
