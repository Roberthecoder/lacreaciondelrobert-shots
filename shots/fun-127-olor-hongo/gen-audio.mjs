// gen-audio.mjs — cama + efectos del Shot Fungi Mati #127 (olor a hongo, 1-octen-3-ol). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua con armonía que camina (la menor: i–VI–III–VII y variantes), y un motivo suave de celesta
// compuesto a mano (motivo → respuesta → secuencia → cadencia) que cambia cada 4 compases; nunca el mismo patrón más de 4 compases.
// Va siempre debajo de la voz; se abre (mayor, más aire) en «la R huele más a hongo».
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Olor Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 127);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Ge = K.Geosmina, Co = K.Corte, Gr = K.Grasa, Ox = K.Oxigenasa, Li = K.Liasa, U = K.Umbral, P = K.Pregunta, E = K.Espejo, F = K.Formas, Es = K.Estudio, M = K.Moscos, C = K.Cierre, Ou = K.Outro;

// --- armonía: un acorde por compás (2.4 s ≈ 100 BPM en 4/4) ---
const BAR = 2.4;
const A = [45, 52, 57], Fm = [41, 48, 57], Cm = [48, 52, 55], Gm = [43, 50, 55], Dm = [50, 53, 57], Em = [52, 55, 59], Fa = [41, 48, 53];
const PROG = [A, Fm, Cm, Gm,  A, Fm, Dm, Em,  Fm, Cm, Gm, A,  Dm, Fm, Em, A,  // tensión (cocina → laboratorio)
              Fa, Cm, Gm, A,  Fm, Cm, Dm, Gm,  Fa, Gm, Em, A];              // se abre (formas R/S → final)
const fin = Ou + 3.5;
let t = 0, b = 0;
while (t < fin - 0.01) { const t1 = Math.min(fin, t + BAR + 0.25); m.pad(t, t1, 0.045, PROG[b % PROG.length], b < 16 ? 0.15 : 0); m.bajo(t + 0.02, PROG[b % PROG.length][0] - 12, 0.05, 1.8); t += BAR; b++; }

// --- motivo de celesta (muy suave, entre frases de la voz) ---
// frases de 4 compases: [compás, tiempo (en negras), nota MIDI, duración]
const FRASES = [
  [[0, 1, 69, 0.5], [0, 1.5, 72, 0.5], [0, 2, 76, 1.2], [1, 1, 74, 0.5], [1, 2, 72, 1.2], [2, 1, 69, 0.5], [2, 2, 71, 0.5], [2, 3, 72, 1], [3, 1, 69, 2]],   // motivo
  [[0, 1, 72, 0.5], [0, 1.5, 76, 0.5], [0, 2, 79, 1.2], [1, 2, 76, 1], [2, 1, 74, 0.5], [2, 1.5, 72, 0.5], [2, 2, 71, 1.2], [3, 1, 72, 2]],                 // respuesta
  [[0, 1, 74, 0.5], [0, 1.5, 77, 0.5], [0, 2, 81, 1.2], [1, 1, 79, 0.5], [1, 2, 77, 1.2], [2, 2, 76, 0.5], [2, 3, 74, 1], [3, 1, 76, 2]],                   // secuencia (un tono arriba)
  [[0, 1, 76, 0.6], [0, 2, 74, 0.6], [1, 1, 72, 1.2], [1, 3, 71, 0.6], [2, 1, 72, 0.6], [2, 2, 69, 1.4], [3, 1, 69, 2.4]],                                  // cadencia (a la raíz)
  [[0, 1, 76, 0.5], [0, 1.5, 79, 0.5], [0, 2, 84, 1.4], [1, 2, 81, 1], [2, 1, 79, 0.5], [2, 2, 77, 0.5], [2, 3, 76, 1], [3, 1, 72, 2]],                     // el tema arriba (se abre)
  [[0, 1, 77, 0.6], [0, 2, 76, 0.6], [1, 1, 74, 1], [1, 3, 72, 0.6], [2, 1, 71, 0.6], [2, 2, 72, 1.2], [3, 1, 69, 2.6]],                                    // cierre
];
const NEG = BAR / 4;
FRASES.forEach((fr, k) => { const t0 = k * 4 * BAR; fr.forEach(([c, tt, n, d], i) => { const tn = t0 + c * BAR + (tt - 1) * NEG + (i % 2 ? 0.012 : 0); if (tn < fin - 1) m.nota(tn, n, 0.026 + (i % 3) * 0.004, d * NEG * 1.6, k < 4 ? 0.35 : 0); }); });

// --- efectos, en el mismo cuadro que la imagen ---
m.golpe(G + 0.43, 0.45, 70); m.cruje(G + 0.45, 0.35);                 // 1er golpe del mazo
m.golpe(G + 1.23, 0.4, 75); m.cruje(G + 1.25, 0.3);                   // 2º golpe
m.whoosh(G + 0.6, 1.6, 0.06);                                          // sube el olor
for (let i = 0; i < 8; i++) m.nota(G + 2.0 + i * 0.15, [57, 60, 64, 67, 69, 72, 76, 79][i], 0.035, 0.4); // se dibujan los 8 carbonos
m.tic(G + 1.4, 0.18, 1200);                                            // tachón «olor a tierra»
m.tic(G + 3.0, 0.12, 1500);
for (let i = 0; i < 8; i++) m.tic(N + 0.2 + i * 0.1, 0.05, 2200 + i * 80); // números de los carbonos
for (let i = 0; i < 5; i++) m.gota(Ge + 0.1 + i * 0.22, 0.12, 760 + (i % 3) * 60); // gotas sobre la tierra
m.golpe(Ge + 0.9, 0.25, 95);                                           // el signo ≠
m.whoosh(Co - 0.3, 0.8, 0.12);                                         // entramos al microscopio
m.golpe(Co + 1.2, 0.35, 65); m.cruje(Co + 1.2, 0.5);                    // se rompen las células
for (let i = 0; i < 6; i++) m.burbuja(Co + 1.4 + i * 0.13, 0.06, 380 + i * 50);
for (let i = 0; i < 18; i++) m.tic(Gr + i * 0.078, 0.035, 1700 + (i % 4) * 120); // se dibuja la cadena de 18 C
m.whoosh(Gr + 1.6, 0.8, 0.07);                                         // llega la dioxigenasa
m.burbuja(Ox + 0.3, 0.12, 520); m.burbuja(Ox + 0.45, 0.12, 660); m.nota(Ox + 0.6, 81, 0.04, 0.5); // «pop» del O2
m.whoosh(Li - 0.2, 0.9, 0.07);                                         // llega la liasa
m.metal(Li + 1.0, 0.16, 900); m.tic(Li + 1.0, 0.25, 2600);             // tijeretazo
m.sube(Li + 1.1, 1.0, 64, 76, 0.035); m.nota(Li + 1.9, 76, 0.04, 0.9); // el pedazo de 8 C brilla y sube
m.gota(U + 0.2, 0.2, 640); m.whoosh(U + 0.4, 1.2, 0.06);               // vaso de agua → zoom a moléculas
m.nota(U + 1.4, 88, 0.05, 1.2);                                         // se enciende LA molécula
m.sube(P + 0.1, 1.6, 52, 64, 0.04);                                     // re-gancho
m.whoosh(E + 0.2, 0.6, 0.06); m.nota(E + 1.2, 69, 0.04, 0.8); m.nota(E + 1.25, 69, 0.03, 0.8); // espejo
m.golpe(E + 1.8, 0.2, 110);
m.nota(F + 0.3, 76, 0.05, 1.2); m.nota(F + 0.32, 72, 0.035, 1.2);        // R: hongo (brillante)
m.nota(F + 1.5, 63, 0.035, 0.9, 0.6);                                   // S: moho y pasto (apagado)
m.tic(F + 2.6, 0.12, 1500);
m.golpe(Es + 0.2, 0.3, 80);                                              // tarjeta 1984
m.whoosh(Es + 2.4, 1.0, 0.05);                                            // olor de la vaca
m.zumbido(Es + 3.0, 2.6, 0.035, 170);                                     // tsetsé
m.tic(Es + 3.6, 0.1, 1500);
for (let i = 0; i < 4; i++) m.gota(M + 0.3 + i * 0.3, 0.08, 980);        // sudor
m.whoosh(M + 1.6, 1.0, 0.06);                                             // CO2 del aliento
m.zumbido(M + 2.4, 3.4, 0.03, 420); m.zumbido(M + 2.7, 3.0, 0.02, 470);  // moscos
m.motor(M + 4.3, 2.2, 0.03);                                              // ventilador de la trampa
m.tic(M + 4.6, 0.15, 1300);
m.whoosh(C, 0.7, 0.06); m.golpe(C + 0.5, 0.22, 75);                      // regreso a la tabla
m.nota(C + 1.2, 72, 0.04, 1.0); m.nota(C + 1.25, 76, 0.035, 1.0);
m.nota(Ou + 0.3, 57, 0.07, 3); m.nota(Ou + 0.3, 64, 0.05, 3); m.nota(Ou + 0.3, 69, 0.045, 3); m.nota(Ou + 0.5, 76, 0.03, 2.6);
m.guardar(OUT, 1);
