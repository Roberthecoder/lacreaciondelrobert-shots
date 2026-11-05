// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #88 (el moho del refri). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Idea musical: una cama fría y "en pausa" (filtro cerrado, notas largas, pulso lento como el compresor del refri) mientras el moho
// resiste; un motivo de 3 notas (mi–sol–la) que cada hongo toca en otra voz y otra altura; se abre y calienta en «lo que sí sirve».
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Refri base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 88);
const K = m.K;
const G = K.Gancho, F = K.Frio, Pe = K.Penicillium, Bo = K.Botrytis, Cl = K.Cladosporium, P = K.Pregunta, L = K.Lento, Co = K.Congelador,
  Es = K.Estudio, Ti = K.Tibios, S = K.Sirve, C = K.Cierre, Ou = K.Outro;

// ── cama: cambia de acorde cada 2–4 s (menor y tapada mientras el moho resiste; mayor y abierta al final) ──
const camas = [
  [G, F, [40, 47, 52], 0.55], [F, Pe, [40, 47, 55], 0.6],                 // mi menor, fría
  [Pe, Pe + 3.2, [36, 43, 48], 0.65], [Pe + 3.2, Bo, [38, 45, 50], 0.55],   // do → re: la espera y el arranque
  [Bo, Bo + 2.6, [41, 48, 53], 0.6], [Bo + 2.6, Cl, [40, 47, 52], 0.7],      // fa → mi (más helado)
  [Cl, P, [38, 45, 52], 0.7],
  [P, L, [43, 50, 55], 0.5],                                                // pregunta: sol suspendido
  [L, L + 3.2, [36, 43, 48], 0.8], [L + 3.2, Co, [36, 43, 50], 0.45],       // frenado → la membrana se ablanda
  [Co, Co + 2.0, [40, 47, 52], 0.85], [Co + 2.0, Es, [41, 48, 55], 0.4],    // congelado → despierta
  [Es, Es + 3.4, [45, 52, 57], 0.45], [Es + 3.4, Ti, [43, 50, 55], 0.45],
  [Ti, S, [44, 51, 56], 0.5],                                               // tibio: algo fuera de lugar
  [S, S + 3.0, [43, 50, 55, 59], 0.1], [S + 3.0, C, [41, 48, 53, 57], 0.05], // se abre: sol mayor → fa mayor
  [C, Ou + 3.5, [36, 43, 48, 52], 0],                                       // do mayor: resuelve
];
for (const [a, b, notas, tapa] of camas) m.pad(a, b + 0.3, 0.05, notas, tapa);

// pulso lento del compresor (cambia de figura cada pocos compases y se calla en la pregunta)
for (let t = G + 0.6; t < S; t += 1.5) { if (t > P - 0.2 && t < L + 0.2) continue; m.bajo(t, ((t / 1.5) | 0) % 4 === 3 ? 31 : 28, 0.05, 0.9); }
for (let t = S; t < Ou; t += 0.75) m.bajo(t, [31, 31, 36, 38][((t - S) / 0.75 | 0) % 4], 0.045, 0.5); // al final se anima

// motivo de 3 notas (mi–sol–la), en otra voz y otra altura con cada hongo
const motivo = (t, base, g = 0.05, d = 0.5, tapa = 0, inv = false) => (inv ? [9, 7, 4] : [4, 7, 9]).forEach((k, i) => m.nota(t + i * 0.32, base + k, g, d, tapa));
motivo(G + 2.5, 64, 0.04, 0.6, 0.5);
motivo(Pe + 3.7, 60, 0.05, 0.7, 0.4);           // Penicillium arranca
motivo(Bo + 1.7, 52, 0.05, 0.8, 0.5, true);      // Botrytis, más grave y al revés
motivo(Cl + 0.6, 72, 0.035, 0.9, 0.3);           // Cladosporium, agudo y frío
motivo(Co + 2.9, 67, 0.05, 0.5, 0.1);            // despiertan
motivo(S + 0.5, 67, 0.05, 0.5); motivo(S + 1.8, 69, 0.05, 0.5); motivo(S + 3.4, 71, 0.05, 0.6); // sube con cada ✓
motivo(C + 0.8, 72, 0.06, 1.0);

// ── efectos en el mismo cuadro ──
m.whoosh(G + 0.1, 0.5, 0.12); m.tic(G + 0.15, 0.2, 500);                   // la goma de la puerta
m.zumbido(G + 0.3, 3.8, 0.025, 120);                                         // luz y compresor
for (let i = 0; i < 4; i++) m.whoosh(G + 0.6 + i * 0.5, 0.6, 0.04);          // vaho frío
m.metal(G + 1.65, 0.12, 2400);                                               // copo que cae
m.tic(G + 1.7, 0.3, 1400);                                                   // ⏸ pausa
m.golpe(G + 2.5, 0.25, 110); m.golpe(G + 2.8, 0.22, 120);                    // ▶ lento ▶ lento
for (let i = 0; i < 8; i++) m.tic(F + 0.3 + i * 0.16, 0.08, 1200 - i * 60);  // el termómetro baja
m.golpe(F + 1.4, 0.35, 70);                                                  // 4 °C
m.sube(Pe, 1.0, 52, 64, 0.04);                                               // al microscopio
for (let i = 0; i < 6; i++) m.whoosh(Pe + 0.9 + i * 0.47, 0.25, 0.08);       // hojas del calendario
for (let i = 0; i < 9; i++) m.nota(Pe + 3.9 + i * 0.28, m.ESC[(i * 2) % 9 + 2], 0.025, 0.4); // crecen las cadenas
m.whoosh(Bo, 0.8, 0.1);                                                      // paneo a la fresa
for (let i = 0; i < 6; i++) m.nota(Bo + 2.2 + i * 0.22, 55 + (i % 3) * 3, 0.025, 0.35, 0.4); // racimos
m.cruje(Bo + 3.0, 0.3);                                                      // escarcha en la placa
for (let i = 0; i < 5; i++) m.tic(Bo + 2.8 + i * 0.16, 0.07, 900);           // termómetro a −4
m.golpe(Cl + 0.4, 0.4, 60); m.cruje(Cl + 0.5, 0.35);                         // −6 °C
m.burbuja(Cl + 1.4, 0.12, 600); m.burbuja(Cl + 1.5, 0.1, 700);              // la espora germina (pop)
m.golpe(P, 0.45, 55); m.metal(P + 0.1, 0.1, 1900);                           // ¿?
for (let i = 0; i < 14; i++) { const t = L + 0.4 + Math.pow(i / 14, 0.6) * 2.6; m.tic(t, 0.09, 700); } // engranes que se frenan
m.sube(L + 2.0, 1.0, 50, 44, 0.04);                                          // membrana rígida
m.sube(L + 3.3, 1.2, 50, 62, 0.04);                                          // se ablanda
m.cruje(Co + 0.3, 0.2);                                                      // escarcha del congelador
for (let i = 0; i < 3; i++) m.sube(Co + 0.5 + i * 0.5, 0.4, 40, 37, 0.03);   // Zzz
m.cruje(Co + 1.2, 0.35);                                                     // mito tachado
m.whoosh(Co + 1.9, 0.8, 0.12);                                               // sale al calor
for (let i = 0; i < 4; i++) m.gota(Co + 2.6 + i * 0.22, 0.1, 900);          // se descongela
m.burbuja(Co + 2.85, 0.16, 520);                                             // ¡despierta!
m.golpe(Es + 0.2, 0.35, 80);                                                 // tarjeta del estudio
for (let i = 0; i < 16; i++) m.tic(Es + 2.4 + i * 0.075, 0.06, 1700 + i * 30); // contador 293
m.whoosh(Es + 4.1, 0.6, 0.08);                                               // corte del refri
for (let i = 0; i < 6; i++) m.whoosh(Es + 4.4 + i * 0.33, 0.3, 0.07);        // la esponja de muestreo
m.nota(Es + 4.4, 64, 0.04, 0.6);
m.golpe(Ti + 0.3, 0.45, 50); m.sube(Ti + 0.4, 1.2, 55, 61, 0.04);            // 6.6 °C, sube
m.cruje(Ti + 2.2, 0.3);                                                      // 4 °C tachado
for (const t of [S + 0.4, S + 1.7, S + 3.3]) { m.tic(t, 0.25, 2200); m.nota(t, 79, 0.04, 0.4); } // ✓
for (let i = 0; i < 9; i++) m.whoosh(S + 3.6 + i * 0.24, 0.22, 0.08);         // tallado
m.golpe(C + 0.8, 0.3, 100);                                                  // sello 4 °C
m.tic(Ou - 0.2, 0.35, 380); m.golpe(Ou - 0.15, 0.25, 70);                    // la puerta cierra: clac
m.nota(Ou + 0.3, 60, 0.07, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8); m.nota(Ou + 0.3, 72, 0.04, 2.8);
m.guardar(OUT, 1);
