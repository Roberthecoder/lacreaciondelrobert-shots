// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #85 (la tiña que te pasó tu gato). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): ~100 BPM, la menor tensa y "con comezón" mientras dura el problema; fría y brillante con la luz UV;
// se abre a do mayor desde «lo que sí sirve». Un motivo propio de 2 compases (motivo → respuesta → secuencia → cadencia) que vuelve
// al final en otro registro; acordes que cambian cada 2 compases y ningún patrón más de 4 compases seguidos.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tina Gato base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 85);
const K = m.K;
const G = K.Gancho, N = K.Nombre, A = K.Anillo, Q = K.Queratina, Ca = K.Canis, M = K.Manguito, P = K.Portador, U = K.UV, Es = K.Estudio, Po = K.Polvo, S = K.Sirve, C = K.Cierre, Ou = K.Outro;
const B = 0.6; // un tiempo a 100 BPM

// ---------- armonía: un acorde cada 2 compases (4.8 s); la tapa cuenta el estado de la historia
const ACORDES = [
  [0, [45, 52, 57, 60], 0.38],        // la menor: el anillo
  [4.8, [41, 48, 53, 57], 0.36],      // fa
  [9.6, [38, 45, 50, 53], 0.34],      // re menor: crece hacia afuera
  [14.4, [40, 47, 52, 56], 0.32],     // mi (dominante): el 90 %
  [19.2, [45, 52, 57, 60], 0.36],     // la menor: el manguito
  [24.0, [41, 48, 53, 60], 0.3],      // fa con do arriba: ¿se ve sano?
  [28.8, [43, 50, 55, 59], 0.15],     // sol: la luz UV, fría y brillante
  [33.6, [45, 52, 57, 60], 0.3],      // la menor: el estudio
  [38.4, [38, 45, 50, 57], 0.3],      // re menor
  [43.2, [40, 47, 52, 56], 0.32],     // mi: el polvo (tensión antes de resolver)
];
for (let i = 0; i < ACORDES.length; i++) { const [t0, notas, tapa] = ACORDES[i]; const t1 = i + 1 < ACORDES.length ? ACORDES[i + 1][0] : S; m.pad(t0, Math.min(S, t1 + 0.5), 0.05, notas, tapa); }
// resolución: do mayor → sol → la menor → fa → do
const RES = [[S, [48, 55, 60, 64]], [S + 2.7, [43, 50, 55, 59]], [C, [45, 52, 57, 60]], [C + 2.3, [41, 48, 53, 57]], [Ou, [48, 55, 60, 64]]];
for (let i = 0; i < RES.length; i++) { const t1 = i + 1 < RES.length ? RES[i + 1][0] : Ou + 3.5; m.pad(RES[i][0], t1 + 0.5, 0.055, RES[i][1], 0); }

// ---------- bajo: pulso suave por compás, con notas de paso que cambian cada frase
const RAIZ = [45, 41, 38, 40, 45, 41, 43, 45, 38, 40];
for (let i = 0; i < 20; i++) {
  const t = i * 2.4; if (t >= S) break; const r = RAIZ[Math.floor(i / 2)];
  if (t >= 24.0 && t < 28.8) { m.bajo(t, r, 0.05, 1.6); continue; }            // el re-gancho se vacía
  m.bajo(t, r, 0.07, 0.9);
  if (i % 4 === 1) m.bajo(t + 1.8, r + 7, 0.05, 0.4);                         // quinta
  else if (i % 4 === 3) { m.bajo(t + 1.2, r + 3, 0.045, 0.4); m.bajo(t + 1.8, r + 2, 0.045, 0.4); } // bajada cromática
}
for (let i = 0; i < 6; i++) { const t = S + i * 2.4; if (t >= Ou) break; const r = [48, 43, 45, 41, 48, 48][i]; m.bajo(t, r, 0.07, 1.0); m.bajo(t + 1.2, r + 7, 0.05, 0.5); }

// ---------- melodía: motivo propio y sus transformaciones (muy debajo de la voz)
const MOT = [[0, 69, 0.5], [B, 72, 0.5], [2 * B, 71, 0.3], [2.5 * B, 69, 0.8], [4 * B, 64, 1.1]];         // motivo
const RESP = [[0, 65, 0.5], [B, 69, 0.5], [2 * B, 67, 0.3], [2.5 * B, 65, 0.8], [4 * B, 64, 1.3]];       // respuesta
const SEC = [[0, 72, 0.5], [B, 76, 0.5], [2 * B, 74, 0.3], [2.5 * B, 72, 0.8], [4 * B, 71, 1.1]];        // secuencia
const CAD = [[0, 74, 0.4], [0.75 * B, 72, 0.4], [1.5 * B, 71, 0.4], [2.5 * B, 69, 1.8]];                 // cadencia
const frase = (t0, f, tr = 0, g = 0.032, tapa = 0.35) => f.forEach(([dt, n, d]) => m.nota(t0 + dt, n + tr, g, d, tapa));
frase(0.3, MOT); frase(4.8, RESP); frase(9.6, SEC); frase(14.4, CAD);
frase(19.2, MOT, -12, 0.04, 0.4);                                                 // el motivo, una octava abajo (manguito)
m.nota(24.6, 64, 0.03, 1.4, 0.3); m.nota(26.4, 65, 0.03, 1.4, 0.3);               // re-gancho: solo dos notas que preguntan
frase(Es + 0.6, RESP, 0, 0.028, 0.3); frase(Es + 5.4, [[0, 69, 0.3], [B, 71, 0.3], [2 * B, 72, 0.3], [3 * B, 74, 0.9]], 0, 0.028, 0.3);
frase(Po + 0.4, CAD, -12, 0.035, 0.35);
// resolución en mayor: el motivo vuelve, abierto
const MOTM = [[0, 72, 0.5], [B, 76, 0.5], [2 * B, 74, 0.3], [2.5 * B, 72, 0.8], [4 * B, 67, 1.1]];
frase(S + 0.3, MOTM, 0, 0.034, 0); frase(S + 2.9, [[0, 71, 0.5], [B, 74, 0.5], [2 * B, 72, 0.3], [2.5 * B, 71, 0.8], [4 * B, 67, 1.0]], 0, 0.032, 0);
MOTM.forEach(([dt, n, d]) => m.bajo(C + 0.4 + dt, n - 12, 0.06, d + 0.2));        // el tema regresa en el bajo (otro instrumento)
frase(C + 0.4, [[2 * B, 79, 0.3], [4 * B, 76, 1.4]], 0, 0.03, 0);

// ---------- efectos en el mismo cuadro de cada evento
m.motor(G, 4.0, 0.045);                                                           // ronroneo del gato
m.whoosh(G + 0.1, 0.6, 0.06);                                                     // aparece el anillo
for (let i = 0; i < 10; i++) m.whoosh(G + 0.6 + i * 0.17, 0.12, 0.07);            // comezón: se rasca
m.burbuja(G + 0.5, 0.1, 380);                                                     // asoma el gusanito
m.cruje(G + 1.7, 0.3);                                                            // ¿gusano? tachado
m.golpe(G + 2.4, 0.45, 75);                                                       // sello HONGO
m.whoosh(G + 2.9, 0.6, 0.1); m.tic(G + 3.0, 0.12, 1500);                          // del pelo del gato al brazo
m.golpe(N + 0.1, 0.35, 90);                                                       // TIÑA
m.tic(N + 1.1, 0.12, 1300); m.tic(N + 1.25, 0.12, 1600);                          // RING · WORM
m.tic(N + 1.7, 0.1, 2000);
m.cruje(N + 2.5, 0.2); m.cruje(N + 2.65, 0.2);                                    // la ✗ sobre WORM
m.whoosh(N + 2.9, 0.5, 0.08); m.tic(N + 2.9, 0.1, 1800);
m.sube(A, 3.4, 45, 52, 0.03);                                                     // el anillo crece hacia afuera
m.whoosh(A + 0.4, 0.7, 0.07); m.tic(A + 0.5, 0.1, 1500); m.nota(A + 1.6, 76, 0.035, 0.6); // flechas · chips
m.sube(Q - 0.35, 1.0, 52, 64, 0.04);                                              // al microscopio
for (let i = 0; i < 15; i++) m.tic(Q + 0.3 + i * 0.21, 0.06, 1200 + (i % 5) * 160); // las hifas mastican escamas
m.tic(Q + 0.6, 0.1, 1700); m.tic(Q + 1.0, 0.08, 1900); m.tic(Q + 1.4, 0.08, 2100); m.tic(Q + 1.8, 0.08, 2300);
m.golpe(Ca + 0.2, 0.35, 85);                                                      // 90 %
for (let k = 1; k <= 9; k++) m.tic(Ca + 0.2 + cruce(k / 9) * 1.0, 0.07, 1500 + k * 60);
m.whoosh(Ca + 1.1, 0.5, 0.07);                                                    // panel del microscopio
m.nota(Ca + 1.4, 64, 0.04, 1.0, 0.2); m.nota(Ca + 1.9, 67, 0.04, 1.0, 0.2);       // crecen los macroconidios
m.tic(Ca + 2.0, 0.08, 1800); m.tic(Ca + 2.6, 0.08, 1800); m.tic(Ca + 3.0, 0.08, 1800); m.tic(Ca + 3.4, 0.1, 1500);
for (let i = 0; i < 14; i++) m.burbuja(M + 0.25 + i * 0.14, 0.05, 600 + i * 25);  // el manguito de esporas se forma
m.tic(M + 0.4, 0.1, 1600);
for (let i = 0; i < 4; i++) m.whoosh(M + 2.6 + i * 0.2, 0.18, 0.12);             // sacudida: no se caen
m.golpe(M + 2.65, 0.25, 110);
m.golpe(P, 0.4, 55); m.sube(P + 0.1, 1.4, 52, 45, 0.04);                          // ¿se ve sano?
m.whoosh(P + 1.2, 0.6, 0.08); m.zumbido(P + 1.3, 1.2, 0.03, 300);                 // lupa sobre el pelo
m.tic(P + 2.0, 0.1, 1500);
m.zumbido(U + 0.2, 4.3, 0.035, 120);                                              // zumbido de la lámpara UV
{ const xs = []; for (let i = 0; i < 30; i++) xs.push(70 + i * 32); let k = 0;     // un destello por cada pelo que prende
  xs.forEach((x, i) => { if (i % 3) return; const u = (x - 60) / 960; let lo = 0, hi = 1; for (let j = 0; j < 30; j++) { const mid = (lo + hi) / 2; const s = mid < 0.5 ? 4 * mid ** 3 : 1 - Math.pow(-2 * mid + 2, 3) / 2; if (s < u) lo = mid; else hi = mid; }
    m.nota(U + 0.5 + lo * 2.3, m.ESC[8 + (k++ % 6)], 0.03, 0.35); }); }
m.tic(U + 2.2, 0.1, 1700); m.tic(U + 3.2, 0.1, 1700); m.tic(U + 3.4, 0.08, 2000);
m.golpe(Es + 0.2, 0.35, 80);                                                      // tarjeta del estudio
for (let i = 0; i < 10; i++) m.tic(Es + 3.3 + i * 0.07, 0.05, 2200);              // aparecen las 57 personitas
for (let k = 1; k <= 43; k += 2) m.tic(Es + 3.9 + cruce(k / 43) * 2.1, 0.06, 1400 + k * 12); // se pintan 43
m.golpe(Es + 6.0, 0.3, 95); m.tic(Es + 6.6, 0.1, 1600);
m.whoosh(Po + 0.1, 2.5, 0.05); m.whoosh(Po + 2.6, 2.0, 0.04);                     // el polvo viaja por la casa
for (let i = 0; i < 11; i++) m.tic(Po + 2.2 + i * 0.127, 0.07, 1000 + i * 40);    // hojas del calendario
m.golpe(Po + 3.6, 0.2, 100); m.tic(Po + 3.0, 0.1, 1500); m.tic(Po + 0.9, 0.08, 1800);
m.golpe(S + 0.1, 0.3, 100);                                                       // LO QUE SÍ SIRVE
[[0.5, 76], [1.9, 79], [2.9, 81], [3.9, 84]].forEach(([dt, n]) => { m.whoosh(S + dt, 0.3, 0.06); m.nota(S + dt + 0.5, n, 0.045, 0.5); });
for (let i = 0; i < 5; i++) m.burbuja(S + 2.0 + i * 0.12, 0.06, 500 + i * 40);   // agua y jabón
m.motor(S + 2.9, 1.0, 0.05);                                                      // aspiradora
for (let i = 0; i < 5; i++) m.burbuja(S + 4.0 + i * 0.12, 0.06, 450 + i * 40);   // desinfectar la cama
m.sube(C, 0.8, 57, 64, 0.03);                                                     // el anillo se va
m.motor(C, 4.4, 0.04);                                                            // ronroneo otra vez
m.nota(C + 0.3, 76, 0.04, 0.8);                                                   // corazón
m.golpe(C + 0.9, 0.3, 100); m.nota(C + 0.9, 72, 0.05, 1.2); m.nota(C + 0.9, 79, 0.04, 1.2); // sello SANOS
m.tic(C + 1.6, 0.1, 1600);
m.nota(Ou + 0.3, 60, 0.07, 3.0); m.nota(Ou + 0.3, 64, 0.06, 3.0); m.nota(Ou + 0.3, 67, 0.05, 3.0); m.nota(Ou + 0.3, 72, 0.04, 3.0);
m.guardar(OUT, 1);
