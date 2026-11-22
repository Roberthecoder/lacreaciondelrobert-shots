// gen-audio.mjs — música y efectos del Shot Fungi Mati #138 (LSD: historia de un descubrimiento). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                                   → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>     (narrar.mjs: versión narrada)
// Música (según maestro/recetas/composicion-musical.md): pieza de "archivo histórico" en re menor a 100 BPM, con forma:
//   A (0–23 s, el hongo y el laboratorio): tema de 4 compases i–VI–iv–V con arpegio de pluck y respuesta de campana; cada 2 compases cambia el dibujo.
//   Puente (re-gancho): pedal de la dominante que sube, se vacía medio tiempo antes de la respuesta.
//   B (1943, la bici): relativo mayor (Fa–Do–Rem–Sib), pulso más ágil, el tema vuelve en otra voz (nota grave).
//   C (Delysid, ley, riesgos): oscuro y contenido (Solm–Mib–Re), sin melodía: solo bajo y campanas espaciadas.
//   Cierre: regresa el tema del inicio (otra voz) y termina en Re mayor (tercera de picardía) en la tarjeta final.
// Siempre debajo de la voz (la voz manda): niveles bajos, sin golpe de batería.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { crearMezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot LSD base narrada.dc.html';
const OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const M = crearMezcla(path.join(HERE, HTML), { seed: 138 });
const K = M.K;
const G = K.Gancho, H = K.Hongo, S = K.Sandoz, L = K.Lsd25, A = K.Archivo, P = K.Pregunta, Co = K.Corazonada, Pi = K.Piel,
  B = K.Bici, D = K.Delysid, Le = K.Ley, R = K.Riesgos, C = K.Cierre, Ou = K.Outro;
const FIN = Ou + 3.5;
const HM = H + 2.3, PI2 = Pi + 2.2, R2 = R + 3.0;          // mismos cortes que lsd.jsx

/* ---------- MÚSICA ---------- */
const BPM = 100, TB = 60 / BPM, BAR = 4 * TB;               // 2.4 s por compás
// acordes como [raíz grave, notas del arpegio]
const CH = {
  Dm: [38, [50, 53, 57, 62]], Bb: [34, [46, 50, 53, 58]], Gm: [43, [43 + 12, 58, 62, 67]], A: [33, [45, 49, 52, 57]],
  F: [41, [53, 57, 60, 65]], Cc: [36, [48, 52, 55, 60]], Eb: [39, [51, 55, 58, 63]], D: [38, [50, 54, 57, 62]], A7: [33, [45, 49, 52, 55]],
};
// dibujos de arpegio (índices al acorde, en corcheas); se rotan para no repetir más de 2 compases seguidos
const DIB = [[0, 1, 2, 3, 2, 1, 2, 3], [0, 2, 1, 3, 0, 2, 1, 2], [3, 2, 1, 0, 1, 2, 3, 2], [0, 1, 3, 1, 2, 1, 3, 2]];
let vel = 0;
function compas(t0, acorde, { dib = 0, g = 0.045, oct = 0, bajo = true, gBajo = 0.07, mitad = false } = {}) {
  const [r, ar] = CH[acorde];
  if (bajo) { M.nota(t0, r, gBajo, BAR * 0.95); M.nota(t0 + 2 * TB + 0.01, r + 7, gBajo * 0.6, TB * 1.6); }
  DIB[dib % DIB.length].forEach((k, i) => {
    if (mitad && i >= 4) return;
    vel = (vel + 1) % 5;
    const acento = i % 4 === 0 ? 1.15 : (i % 2 ? 0.8 : 0.95);
    M.nota(t0 + i * TB / 2 + (vel - 2) * 0.004, ar[k] + oct + 12, g * acento * (0.92 + 0.04 * vel), 0.7);   // arpa suave (sin dientes de sierra)
  });
}
// tema (4 compases): motivo → respuesta → secuencia → cadencia. [tiempo en negras desde el inicio, nota, duración en negras]
const TEMA = [
  [0, 69, 1.5], [1.5, 67, 0.5], [2, 65, 1], [3, 64, 1],              // c1 (Rem): la–sol–fa–mi
  [4, 65, 1.5], [5.5, 62, 0.5], [6, 62, 2],                           // c2 (Sib): fa–re… (respuesta)
  [8, 67, 1.5], [9.5, 65, 0.5], [10, 63 + 0, 1], [11, 62, 1],         // c3 (Solm): secuencia un tono abajo
  [12, 61, 1], [13, 64, 1], [14, 69, 2],                              // c4 (La): do#–mi–la (pide volver)
];
function tema(t0, { trans = 0, g = 0.06, voz = 'nota' } = {}) {
  TEMA.forEach(([b, n, d]) => {
    const f = voz === 'campana' ? M.campana : M.nota;
    f(t0 + b * TB, n + trans, g, d * TB * 1.1);
  });
}

// A · 0 → P: introducción y tema (el hongo, el laboratorio, 1938, el archivo)
const progA = ['Dm', 'Bb', 'Gm', 'A', 'Dm', 'Bb', 'Gm', 'A', 'Dm', 'Bb'];
let t = G;
progA.forEach((c, i) => { if (t < P - 0.2) compas(t, c, { dib: Math.floor(i / 2) + (i % 2), g: i < 2 ? 0.035 : 0.045, mitad: t + BAR > P }); t += BAR; });
M.pad(G, P, 0.03, [50, 57, 62], 420);
tema(G + 2 * BAR, { g: 0.05 });                                    // el tema entra cuando aparece el hongo de cerca
M.campana(HM + 0.1, 74, 0.04, 2.2);                                  // la molécula se ilumina (respuesta aguda)
M.campana(HM + 1.2, 77, 0.03, 1.8);
// Puente · re-gancho: pedal de La que sube; silencio medio tiempo antes de la respuesta
M.pad(P, Co - TB / 2, 0.04, [45, 52, 57, 61], 600);
M.sube(P + 0.1, Co - P - 0.6, 57, 64, 0.04);
M.nota(P + 0.2, 33, 0.08, 2.0);

// B · Co → D: 1943 (relativo mayor, más ágil; el tema en voz grave)
const progB = ['F', 'Cc', 'Dm', 'Bb', 'F', 'Cc', 'Gm', 'A7'];
t = Co;
progB.forEach((c, i) => { if (t < D - 0.2) compas(t, c, { dib: (i + 1) % 4, g: 0.04, oct: 12 * (i % 4 === 3 ? 0 : 0), gBajo: 0.06, mitad: t + BAR > D }); t += BAR; });
M.pad(Co, D, 0.025, [53, 57, 60], 500);
tema(Co + BAR, { trans: -12, g: 0.055 });                            // el tema regresa en otra voz (una octava abajo)

// C · D → C: Delysid, ley, riesgos (oscuro; sin melodía, solo bajo y campanas espaciadas)
const progC = ['Gm', 'Eb', 'Gm', 'D', 'Gm', 'Eb'];
t = D;
progC.forEach((c, i) => { if (t < C - 0.2) { const [r] = CH[c]; M.nota(t, r, 0.075, BAR); M.nota(t + TB * 2.5, r + 12, 0.03, TB); } t += BAR; });
M.pad(D, R2, 0.035, [43, 50, 55, 58], 380);
M.pad(R2, C, 0.03, [45, 52, 57, 61], 520);                            // los ensayos: se abre un poco, sin euforia
[D + 1.2, Le + 1.7, R + 0.3].forEach((x, i) => M.campana(x, [70, 67, 65][i], 0.035, 2.4));

// Cierre: el tema vuelve (campana) y resuelve en Re mayor en la tarjeta final
t = C;
['Dm', 'Bb'].forEach((c, i) => { compas(t, c, { dib: i + 2, g: 0.04 }); t += BAR; });
M.pad(C, Ou, 0.03, [50, 57, 62], 450);
TEMA.slice(0, 7).forEach(([b, n, d]) => M.campana(C + 0.3 + b * TB, n + 12, 0.035, d * TB * 1.2));
[38, 50, 54, 57, 62, 66].forEach((n, i) => M.nota(Ou + 0.2 + i * 0.06, n, i ? 0.045 : 0.08, 3.2));   // Re mayor

/* ---------- EFECTOS (cada uno en el cuadro de su evento) ---------- */
M.ruido(G, 2.0, 0.05, 300, 1200);                                    // viento en la espiga
M.pop(G + 0.15, 0.2); M.tic(G + 0.8, 0.2, 700);                      // brota el cuernito
M.whoosh(G + 1.6, 0.8, 0.12);                                         // se acerca el bote
M.metal(G + 2.4, 0.12, 400); M.tic(G + 2.5, 0.2, 1500);              // tapa del bote · tachón "¿basura?"
M.whoosh(G + 2.6, 0.6, 0.1);                                          // el bote se va
M.pop(G + 3.1, 0.18);                                                 // chip "de su química"
M.whoosh(H, 0.5, 0.1); M.tic(H + 0.4, 0.15, 1200);                   // acercamiento · ficha
M.ruido(HM - 0.2, 0.6, 0.06, 2000, 300);                             // entrar al microscopio
for (let i = 0; i < 4; i++) M.tic(HM + 0.1 + i * 0.24, 0.12, 900 + i * 200);   // se dibujan los 4 anillos
M.pop(HM + 1.6, 0.15); M.pop(HM + 2.0, 0.15);                        // ergotamina, ergometrina
M.pop(S + 0.2, 0.15);                                                 // chip Sandoz
for (let i = 0; i < 4; i++) M.tic(S + 0.8 + i * 0.7, 0.1, 2200);     // gis: el grupo R cambia
M.burbuja(S + 1.0, 0.08, 420); M.burbuja(S + 1.6, 0.08, 520); M.burbuja(S + 2.4, 0.08, 470);
M.golpe(L + 0.1, 0.2, 90);                                            // tarjeta 1938
for (let i = 0; i < 25; i++) M.tic(L + 0.2 + i * 0.07, 0.06, 1500 + (i % 5) * 120);  // 25 matraces
M.campana(L + 2.2, 81, 0.05, 1.6);                                    // se enciende el n.º 25
M.pop(L + 2.9, 0.12);
M.whoosh(A + 0.3, 1.1, 0.08);                                         // el matraz viaja al archivero
M.golpe(A + 1.9, 0.3, 70); M.metal(A + 1.9, 0.08, 300);              // el cajón se cierra
for (let i = 0; i < 5; i++) M.tic(P + 0.3 + i * 0.26, 0.1, 1000);    // el calendario pasa de 1938 a 1943
M.golpe(Co + 0.2, 0.2, 90);                                           // tarjeta 1943
for (let i = 0; i < 18; i++) M.tic(Co + 2.0 + i * 0.12, 0.04, 3200 + (i % 3) * 400); // pluma en la libreta
M.whoosh(Pi, 0.5, 0.08); M.tic(Pi + 0.4, 0.12, 1300);                // la lupa · chip
M.tic(PI2 + 0.9, 0.15, 900); M.tic(PI2 + 1.2, 0.15, 900);            // hojas del calendario 16 → 19
M.ruido(B, 3.6, 0.03, 500, 900);                                      // calle
M.metal(B + 0.5, 0.07, 1900); M.metal(B + 0.65, 0.06, 1900);          // timbre de bici
for (let i = 0; i < 7; i++) M.tic(B + 0.3 + i * 0.5, 0.05, 600);      // cadena
M.tic(B + 1.7, 0.25, 1200); M.golpe(B + 1.7, 0.15, 120);              // tache al coche
M.tic(D + 0.2, 0.1, 1400);
for (let i = 0; i < 5; i++) M.metal(D + 0.45 + i * 0.12, 0.05, 2400 + i * 150);  // ampolletas de vidrio
M.whoosh(D + 1.9, 0.5, 0.06); M.whoosh(D + 2.3, 0.5, 0.06);           // flechas
M.ruido(Le + 0.2, 0.5, 0.06, 2500, 4000);                             // papel del tratado
M.golpe(Le + 1.7, 0.4, 60);                                           // sello LISTA I
M.whoosh(Le + 2.5, 0.5, 0.08); M.pop(Le + 2.8, 0.12); M.pop(Le + 3.3, 0.12);   // mapa de México · chips
M.golpe(R + 0.2, 0.2, 70); M.golpe(R + 0.6, 0.2, 65); M.golpe(R + 1.0, 0.2, 60);  // avisos de riesgo (graves)
M.pop(R2 + 0.1, 0.12);                                                // tarjeta de ensayos clínicos
M.golpe(R2 + 0.9, 0.4, 55);                                           // sello NO ES MEDICAMENTO APROBADO
M.ruido(C, 1.6, 0.04, 300, 1100);                                     // viento otra vez
for (let i = 0; i < 4; i++) M.campana(C + 1.25 + i * 0.3, [62, 65, 69, 74][i], 0.035, 0.9);  // hitos de la línea del tiempo
M.pop(C + 2.2, 0.12);
M.whoosh(Ou, 0.7, 0.1);

M.guardar(path.join(HERE, OUT), { musG: 0.9, sfxG: 0.8 });
