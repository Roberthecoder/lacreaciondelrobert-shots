// gen-audio.mjs — cama + efectos del Shot Fungi Mati #116 (roya del tallo del trigo y Ug99). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave continua que cambia de acorde con cada capítulo (re menor, campo abierto con viento),
// un tema propio de 4 notas que aparece, responde y regresa transformado; se oscurece en Uganda y se abre en el cierre.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Trigo Ug99 base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 116);
const K = m.K;
const G = K.Gancho, A = K.Agracejo, Pu = K.Pustula, E = K.Esporas, Ci = K.Ciclo, Ca = K.Campana, P = K.Pregunta, U = K.Uganda, S = K.Sr31, B = K.Borlaug, N = K.Nucleo, C = K.Cierre, Ou = K.Outro;

// --- armonía: un acorde por capítulo (conducción de voces: cada voz se mueve a la nota más cercana) ---
const ACORDES = [
  [G, Pu, [50, 57, 62]],          // Dm  · el campo
  [Pu, E, [46, 53, 62]],          // Bb  · la pústula
  [E, Ci, [48, 55, 60]],          // C   · al microscopio
  [Ci, Ca, [45, 52, 60]],         // Am  · el ciclo
  [Ca, P, [46, 53, 58]],          // Bb  · la campaña
  [P, U, [45, 52, 61]],           // A   · la pregunta (dominante, queda abierta)
  [U, S, [50, 56, 62], 0.25],     // Dm con la quinta disminuida: tenso, tapado
  [S, B, [46, 53, 62], 0.2],      // Bb
  [B, N, [48, 55, 64]],           // C   · Borlaug
  [N, C, [45, 52, 60], 0.15],     // Am  · por dentro
  [C, Ou, [46, 53, 62]],          // Bb  → se abre
  [Ou, Ou + 3.5, [50, 57, 65]],   // F/D · final luminoso
];
for (const [a, b, notas, tapa = 0] of ACORDES) m.pad(a, b + 0.3, 0.05, notas, tapa);

// --- tema propio (4 notas) y sus respuestas: nunca igual dos veces ---
const tema = (t, notas, g = 0.045, paso = 0.32, d = 0.9, tapa = 0) => notas.forEach((n, i) => m.nota(t + i * paso, n, g, d, tapa));
tema(G + 0.15, [62, 65, 69, 67]);                 // motivo
tema(A + 0.4, [62, 65, 67, 64], 0.04);            // respuesta
tema(Pu + 2.6, [70, 69, 65], 0.035, 0.28);        // secuencia sobre Bb
tema(E + 0.3, [72, 76, 79], 0.03, 0.22, 1.2);     // brillo del microscopio
tema(Ci + 3.3, [69, 72, 76, 74], 0.04, 0.25);     // razas nuevas
tema(Ca + 4.4, [70, 69, 65, 62], 0.04, 0.3);      // cadencia de la campaña
m.sube(P + 0.1, 1.6, 52, 64, 0.045);              // re-gancho
tema(U + 0.5, [62, 63, 62], 0.035, 0.45, 1.2, 0.3); // Uganda: medio tono, oscuro
tema(B + 0.4, [64, 67, 72, 71], 0.04, 0.3);       // Borlaug: el tema en mayor
tema(N + 4.5, [69, 72, 74, 76], 0.035, 0.22);     // intercambio de núcleo
tema(C + 0.3, [62, 65, 69, 67], 0.045);           // regresa el motivo del inicio…
tema(C + 4.0, [65, 69, 72, 74], 0.05, 0.3, 1.4);  // …y se abre: tu pan y tu tortilla
m.nota(Ou + 0.3, 62, 0.07, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8); m.nota(Ou + 0.3, 77, 0.04, 2.8);

// --- efectos, en el mismo cuadro que la imagen ---
m.whoosh(G, 1.4, 0.08); m.whoosh(G + 1.8, 1.6, 0.06);                         // viento en el trigal
m.pop?.(G + 0.3); m.tic(G + 0.35, 0.2, 700);                                    // aparecen el pan y la tortilla
m.sube(G + 3.4, 1.0, 64, 55, 0.03);                                             // se desvanecen ("sin pan")
m.tic(A + 0.1, 0.15, 1300); m.tic(A + 1.0, 0.15, 1500);                        // rótulos
[0.2, 0.7, 1.1, 1.5, 1.9].forEach((d, i) => { const t = Pu + d * 0.55 + 0.75; m.cruje(t, 0.35); m.whoosh(t + 0.35, 0.5, 0.05 + i * 0.005); }); // la epidermis revienta y sale el polvo
m.tic(Pu + 0.3, 0.15, 1200);
for (let i = 0; i < 8; i++) m.burbuja(E + 0.2 + i * 0.09, 0.05, 500 + i * 60);  // aparecen las esporas
for (let i = 0; i < 8; i++) m.whoosh(E + 1.9 + i * 0.15, 0.8, 0.05);            // el viento se las lleva
for (let i = 0; i < 5; i++) m.tic(Ci + 0.3 + i * 0.45, 0.2, 1500 + i * 150);    // casillas del ciclo
m.golpe(Ci + 2.9, 0.25, 90); m.burbuja(Ci + 3.3, 0.08, 600); m.burbuja(Ci + 3.45, 0.08, 700); m.burbuja(Ci + 3.6, 0.08, 800); // cruce y razas nuevas
m.golpe(Ca + 0.2, 0.3, 80);                                                     // tarjeta 1918
for (let i = 0; i < 12; i++) { const t = Ca + 1.2 + i * 0.16; m.cruje(t, 0.18); } // arbustos arrancados
m.golpe(U + 0.2, 0.3, 70); m.tic(U + 0.5, 0.25, 900);                          // mapa y punto de Uganda
for (let i = 0; i < 4; i++) m.whoosh(U + 2.2 + i * 0.3, 0.7, 0.05);            // las parcelas se llenan de roya
m.golpe(S + 0.3, 0.3, 110); m.metal(S + 0.35, 0.12, 640);                       // el escudo Sr31
m.cruje(S + 2.0, 0.5); m.golpe(S + 2.5, 0.45, 55);                              // se agrieta: Ug99
for (let i = 0; i < 4; i++) m.tic(B + 1.0 + i * 0.2, 0.12, 1700);               // trigos en México
for (let i = 0; i < 6; i++) m.metal(B + 2.3 + i * 0.36, 0.14 * Math.pow(0.8, i), 880); // la campana de alarma
m.golpe(B + 2.4, 0.3, 80);                                                       // tarjeta 2005
m.golpe(N + 0.3, 0.25, 80); m.zumbido(N + 2.4, 0.8, 0.04, 220);                 // tarjeta 2019 · se forma el puente
m.sube(N + 3.0, 1.4, 57, 64, 0.03); m.pop?.(N + 4.4); m.burbuja(N + 4.4, 0.1, 700); // el núcleo cambia de célula
m.whoosh(C + 0.4, 1.2, 0.06); for (let i = 0; i < 8; i++) m.tic(C + 1.1 + i * 0.12, 0.05, 2200); // anemómetro que gira
m.whoosh(C + 1.3, 0.6, 0.06); m.golpe(C + 1.0, 0.25, 100);                      // lupa · EN LA MIRA
m.tic(C + 4.0, 0.2, 800); m.burbuja(C + 4.1, 0.08, 500);                       // regresan el pan y la tortilla
m.guardar(OUT, 1);
