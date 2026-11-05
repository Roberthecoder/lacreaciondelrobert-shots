// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #79 (cuero de micelio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// La cama cuenta la historia: cálida y "de taller" en el cultivo, oscura y espaciosa en el microscopio, tensa en la prueba
// de doblado y en el negocio, y resuelve tranquila (sin triunfalismo) en el cierre. Cambia de acorde cada 2–4 s: nada se repite.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cuero Micelio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 79);
const K = m.K;
const G = K.Gancho, He = K.Hermes, Cu = K.Cultivo, Ta = K.Tapete, Hi = K.Hifas, Co = K.Colageno, Pr = K.Proceso, Qu = K.Quebradizo,
  Pe = K.Pregunta, Es = K.Estudio, Re = K.Resultado, Pl = K.Plastico, Ne = K.Negocio, Ci = K.Cierre, Ou = K.Outro;

// --- cama: progresión con arco (re menor → fa → do → la menor → … → re mayor suave al final) ---
const tramos = [
  [G, He, [50, 57, 62]],             // Dm (sorpresa)
  [He, Cu, [53, 57, 60]],            // F
  [Cu, Cu + 2.2, [48, 55, 64]],      // C (cálido, taller)
  [Cu + 2.2, Ta, [45, 52, 60]],      // Am
  [Ta, Ta + 1.9, [46, 53, 62]],      // Bb
  [Ta + 1.9, Hi, [48, 55, 64]],      // C (se cosecha)
  [Hi, Co, [38, 45, 52], 0.25],      // Dm grave y oscuro (microscopio)
  [Co, Pr, [41, 48, 57], 0.2],       // F grave
  [Pr, Pr + 1.8, [48, 55, 64]],      // C (taller)
  [Pr + 1.8, Qu, [43, 50, 59]],      // G
  [Qu, Pe, [45, 52, 58], 0.3],       // Am con 6ª menor (tensión)
  [Pe, Es, [46, 53, 62]],            // Bb (pregunta)
  [Es, Re, [45, 52, 57]],            // Am (estudio)
  [Re, Pl, [44, 50, 56], 0.35],      // dim (doblado)
  [Pl, Pl + 3.0, [41, 48, 55], 0.4], // tapada (la capa de plástico)
  [Pl + 3.0, Ne, [43, 50, 58], 0.4],
  [Ne, Ne + 3.4, [45, 51, 57], 0.3], // tensa (negocio)
  [Ne + 3.4, Ci, [43, 49, 55], 0.3],
  [Ci, Ou, [50, 57, 65]],            // Dm → resolución
  [Ou, Ou + 3.5, [50, 57, 66]],      // D mayor, tranquilo
];
for (const [a, b, notas, tapa = 0] of tramos) m.pad(a, b + 0.25, 0.05, notas, tapa);

// --- melodía chica de respuesta (una frase distinta por sección, siempre debajo de la voz) ---
const frase = (t, notas, paso = 0.32, g = 0.03) => notas.forEach((n, i) => n && m.nota(t + i * paso, n, g, 0.7));
frase(He + 0.4, [69, 72, 74, 72]);
frase(Cu + 1.0, [64, 67, 69, 72, 69]);
frase(Ta + 2.2, [72, 74, 76, 79], 0.28);
frase(Hi + 0.4, [62, 0, 65, 64], 0.45, 0.025);
frase(Pr + 0.4, [67, 69, 72], 0.4);
frase(Es + 0.4, [69, 68, 69, 71], 0.36);
frase(Ci + 0.6, [74, 76, 78, 81, 78], 0.34, 0.032);

// --- efectos en el mismo cuadro de cada evento ---
m.whoosh(G, 0.5, 0.12); m.golpe(G + 0.5, 0.35, 70);                          // la cartera cae y rebota
m.whoosh(G + 0.8, 0.5, 0.06); m.tic(G + 1.9, 0.2, 1100);                       // se abre y se cierra la solapa
m.golpe(G + 1.0, 0.25, 60); m.nota(G + 1.6, 79, 0.06, 0.5);                    // ✗ vaca · ✓ hongo
m.whoosh(He - 0.2, 0.6, 0.07); m.tic(He + 0.3, 0.2, 900);                      // entra el bolso · tarjeta
for (let i = 0; i < 18; i++) m.tic(Cu + 0.1 + i * 0.04, 0.05, 2600 + (i % 3) * 400); // cae el aserrín
for (let i = 0; i < 6; i++) m.gota(Cu + 0.6 + i * 0.1, 0.1, 800 + i * 60);     // siembra (6 puntos)
m.sube(Cu + 1.0, 2.5, 50, 57, 0.025);                                          // el micelio crece
m.tic(Ta + 0.1, 0.15, 1300); m.tic(Ta + 1.0, 0.15, 1500);                      // semana 1 · semana 2
m.whoosh(Ta + 2.0, 1.2, 0.08);                                                  // se despega la hoja
m.sube(Hi - 0.3, 1.6, 40, 47, 0.04); m.zumbido(Hi, 1.5, 0.025, 160);            // bajamos al microscopio
m.burbuja(Hi + 1.4, 0.08, 420);                                                 // aparece el corte de la pared
m.tic(Co + 0.6, 0.12, 1200);                                                    // entra el colágeno
m.gota(Pr + 0.3, 0.2, 900); m.burbuja(Pr + 1.4, 0.1, 380); m.burbuja(Pr + 1.6, 0.1, 460); m.burbuja(Pr + 1.85, 0.1, 520); // glicerina · tina
m.golpe(Pr + 2.95, 0.35, 75); m.whoosh(Pr + 3.0, 0.7, 0.06);                    // la prensa cierra · vapor
m.cruje(Qu + 1.3, 0.5); m.golpe(Qu + 1.3, 0.3, 90);                            // ¡crac!
m.sube(Pe + 0.1, 1.5, 52, 64, 0.04);                                            // re-gancho
m.golpe(Es + 0.2, 0.3, 80);                                                     // tarjeta del estudio
for (let i = 0; i < 9; i++) m.tic(Es + 1.6 + i * 0.12, 0.08, 1500 + i * 60);    // 9 muestras
m.golpe(Es + 3.0, 0.3, 65);                                                     // cuero de zapato
for (let i = 0; i < 26; i++) m.tic(Re + 0.2 + i * 0.15, 0.06, 900 + (i % 2) * 300); // el flexómetro dobla y dobla
m.cruje(Re + 1.6, 0.3); m.golpe(Re + 2.7, 0.35, 60);                            // grietas · ✗
m.whoosh(Pl + 0.5, 0.9, 0.06); m.metal(Pl + 1.3, 0.08, 1300);                   // se cubre de plástico (brillo)
m.whoosh(Pl + 3.0, 0.8, 0.05); m.golpe(Pl + 3.8, 0.25, 70);                     // la degradación choca con la capa
m.tic(Ne + 0.3, 0.2, 900); m.metal(Ne + 1.2, 0.18, 520);                        // tarjeta · candado
m.tic(Ne + 3.4, 0.2, 900); m.motor(Ne + 4.4, 1.2, 0.05); m.golpe(Ne + 5.6, 0.3, 55); // cortina que baja
m.whoosh(Ci + 0.5, 0.6, 0.05); m.metal(Ci + 2.0, 0.08, 1500);                   // lupa · capita de plástico
m.nota(Ou + 0.3, 62, 0.07, 2.8); m.nota(Ou + 0.3, 66, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
