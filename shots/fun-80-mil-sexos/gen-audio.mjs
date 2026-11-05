// gen-audio.mjs — cama + efectos del Shot Fungi Mati #80 (Mil sexos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua debajo de la voz, ~100 BPM, con armonía que avanza por secciones
// (curiosa en el tronco → misterio en el ADN → suspenso en la pregunta → se abre con «casi siempre hay pareja» → cálida en el mercado → regreso).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mil Sexos base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 80);
const K = m.K;
const G = K.Gancho, H = K.Hongo, L = K.Laminas, S = K.Sexo, V = K.Versiones, R = K.Regla, F = K.Fibula, P = K.Pregunta, X = K.Extrano, E = K.Estudio, O = K.Oreja, M = K.Mone, C = K.Cierre, Ou = K.Outro;

// ---------- armonía por secciones (acordes en notas MIDI graves; cada uno dura un compás de ~2.4 s) ----------
const COMPAS = 2.4;
const ACORDES = {
  Am: [45, 52, 57, 60], F: [41, 48, 53, 57], C: [48, 52, 55, 60], G: [43, 50, 55, 59], Dm: [38, 50, 53, 57], Bb: [46, 50, 53, 58],
  Gm: [43, 50, 55, 58], A: [45, 52, 57, 61], Esus: [40, 52, 57, 59], E: [40, 52, 56, 59], CE: [40, 48, 55, 60],
};
const SECCIONES = [
  { a: G, b: S, prog: ['Am', 'F', 'C', 'G'], tapa: 0.1 },          // el tronco, curioso
  { a: S, b: P, prog: ['Dm', 'Bb', 'Gm', 'A'], tapa: 0.35 },        // al microscopio: misterio
  { a: P, b: X, prog: ['Esus', 'E'], tapa: 0.2 },                   // la pregunta: suspenso
  { a: X, b: E, prog: ['C', 'G', 'Am', 'F'], tapa: 0 },             // se abre: casi siempre hay pareja
  { a: E, b: C, prog: ['F', 'CE', 'Dm', 'C', 'Bb', 'C'], tapa: 0 }, // mercado: cálida
  { a: C, b: Ou + 3.5, prog: ['Am', 'F', 'G', 'C'], tapa: 0 },      // regreso al tronco y cierre en mayor
];
for (const s of SECCIONES) {
  let t = s.a, i = 0;
  while (t < s.b - 0.05) {
    const t1 = Math.min(s.b, t + COMPAS), ac = ACORDES[s.prog[i % s.prog.length]];
    m.pad(t, t1 + 0.15, 0.045, ac.slice(0, 3), s.tapa);
    m.bajo(t, ac[0] - 12 >= 28 ? ac[0] - 12 : ac[0], 0.05, 1.4);           // bajo suave al inicio del compás (sin golpe)
    // motivo de marimba muy suave: 4 notas del acorde, la respuesta cambia cada compás (nunca igual 2 veces seguidas)
    const pat = [[3, 2, 1, 2], [3, 1, 2, 0], [2, 3, 1, 3], [1, 2, 3, 2]][i % 4];
    pat.forEach((k, j) => { const tn = t + j * (COMPAS / 4); if (tn < t1 - 0.05) m.nota(tn, ac[k] + 12, j === 0 ? 0.028 : 0.018, 0.5, s.tapa); });
    t = t1; i++;
  }
}

// ---------- efectos en el mismo cuadro que la imagen ----------
m.gota(G + 0.35, 0.3, 800); m.whoosh(G + 0.4, 0.5, 0.08);                       // la gota cae y el abanico se abre
m.tic(G + 0.0, 0.12, 1400); m.tic(G + 0.1, 0.12, 1700); m.cruje(G + 0.6, 0.3); // ♀ ♂ y tachón
for (let i = 0; i < 16; i++) m.tic(G + 1.2 + i * 0.1, 0.05, 2200 + i * 60);     // corre el contador
m.nota(G + 2.8, 72, 0.05, 0.8);                                                   // 23,328
m.tic(G + 3.6, 0.15, 900); m.metal(G + 3.85, 0.08, 1300);                         // plato y tenedor
m.sube(H, 0.8, 52, 60, 0.03);                                                     // el abanico de cerca
m.tic(L + 0.3, 0.1, 1200); m.cruje(L + 0.8, 0.35);                                // sale el sol, se seca y se enrolla
for (let i = 0; i < 10; i++) m.gota(L + 2.35 + i * 0.12, 0.08, 700 + (i % 3) * 120); // lluvia
m.sube(L + 2.7, 1.0, 55, 64, 0.03);                                               // se reabre
m.burbuja(S + 0.2, 0.06, 420); m.sube(S + 0.1, 1.5, 48, 55, 0.025);               // germina la espora, crece la hifa
m.whoosh(S + 1.4, 0.5, 0.06); m.nota(S + 2.2, 69, 0.05, 0.6); m.nota(S + 2.8, 76, 0.05, 0.6); // zona A, zona B
for (let i = 0; i < 24; i++) m.tic(V + 0.2 + i * 0.065, 0.035, 1800 + (i % 5) * 200); // se llena la rueda A (288)
for (let i = 0; i < 12; i++) m.tic(V + 1.4 + i * 0.08, 0.035, 2600 + (i % 4) * 150); // rueda B (81)
m.golpe(V + 2.5, 0.2, 110);                                                       // 288 × 81
const segR = (F - R) / 3;
for (let i = 0; i < 3; i++) { const a = R + i * segR; m.whoosh(a + 0.05, segR * 0.5, 0.05);
  if (i < 2) { m.golpe(a + segR * 0.58, 0.25, 60); m.tic(a + segR * 0.58, 0.15, 500); }   // ✗ grave
  else { m.burbuja(a + segR * 0.55, 0.1, 500); m.nota(a + segR * 0.58, 76, 0.06, 0.5); m.nota(a + segR * 0.6, 81, 0.05, 0.6); } } // ✓ fusión
m.sube(F + 0.6, 1.1, 57, 64, 0.03);                                               // crece la fíbula
m.burbuja(F + 0.8, 0.07, 600); m.burbuja(F + 1.0, 0.07, 680);                     // se dividen los núcleos
m.tic(F + 1.75, 0.12, 900);                                                       // tabique
m.sube(F + 2.0, 1.1, 64, 57, 0.03); m.tic(F + 3.1, 0.1, 1500);                    // el núcleo pasa hacia atrás
m.sube(P + 0.05, 1.5, 52, 64, 0.04);                                              // re-gancho
m.sube(X + 0.5, 1.1, 57, 81, 0.03); m.nota(X + 1.6, 81, 0.05, 0.8);               // medidor hasta 98 %
m.sube(X + 2.4, 0.8, 57, 62, 0.03); m.tic(X + 3.2, 0.1, 700);                     // 25–30 %
m.golpe(E + 0.3, 0.25, 85);                                                       // tarjeta del estudio
for (let i = 0; i < 25; i++) m.tic(E + 3.4 + i * 0.07, 0.06, 1300 + (i % 6) * 110); // 25 pines
for (let i = 0; i < 6; i++) m.nota(O + 0.6 + i * 0.25, [69, 72, 74, 76, 79, 81][i], 0.04, 0.5); // 6 mercados con hongos
m.whoosh(M + 0.1, 0.6, 0.06);                                                     // se extiende la hoja
for (let i = 0; i < 6; i++) m.tic(M + 0.8 + i * 0.17, 0.06, 1000);                // caen las orejas de palo
m.motor(M + 1.9, 1.6, 0.025);                                                     // chisporroteo del sofrito
m.tic(M + 1.2, 0.08, 1600); m.tic(M + 1.7, 0.08, 1600);                           // marcas del calendario
m.whoosh(M + 3.0, 0.8, 0.05);                                                     // se dobla la hoja
m.whoosh(C + 0.1, 0.6, 0.05); m.tic(C + 0.4, 0.12, 900); m.nota(C + 1.6, 72, 0.04, 0.8);
m.nota(Ou + 0.3, 48, 0.07, 3.0); m.nota(Ou + 0.3, 55, 0.05, 3.0); m.nota(Ou + 0.3, 64, 0.05, 3.0); m.nota(Ou + 0.3, 72, 0.04, 3.0);
m.guardar(OUT, 1);
