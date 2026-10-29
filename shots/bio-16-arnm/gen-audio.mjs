// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #16 (vacuna de ARNm). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot ARNm base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 16);
const K = m.K;
const G = K.Gancho, Bu = K.Burbuja, En = K.Entra, Ri = K.Ribosoma, Ap = K.Aprende, Pr = K.Pregunta, Nu = K.Nucleo, Al = K.Alarma,
  Es = K.Estudio, Ag = K.Apagada, Tr = K.Truco, No = K.Nobel, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);                                              // cama grave continua
m.tic(G + 0.3, 0.12, 3000); m.whoosh(G + 0.45, 2.1, 0.05);                            // piquete + émbolo que baja
m.whoosh(Bu + 0.1, 0.6, 0.06);                                                       // la Lupa se abre
m.whoosh(Bu + 0.25, 0.7, 0.04);                                                      // la jeringa sale
m.burbuja(En + 1.0, 0.12, 380); m.burbuja(En + 2.0, 0.14, 300);                      // la membrana se hunde y la traga
m.gota(En + 2.6, 0.12, 700);                                                         // la burbuja se abre
for (let i = 0; i < 3; i++) for (let k = 0; k < 10; k++) m.tic(Ri + i * 0.9 + k * 0.3, 0.05, 1800 + i * 200); // los ribosomas leen
m.nota(Ri + 2.3, 64, 0.06, 0.8); m.nota(Ri + 3.1, 69, 0.06, 0.8);                    // la espícula se dobla
for (let i = 0; i < 6; i++) m.tic(Ap + 0.1 + i * 0.15, 0.06, 1200);                  // espículas en la superficie
for (let i = 0; i < 8; i++) m.nota(Ap + 1.6 + i * 0.18, [69, 72, 74, 76, 79, 76, 81, 84][i], 0.035, 0.4); // anticuerpos
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);                                                 // la pregunta
m.golpe(Nu + 0.9, 0.25, 90); m.metal(Nu + 1.0, 0.12, 760);                           // rebota y el candado
for (let i = 0; i < 5; i++) m.tic(Nu + 2.0 + i * 0.3, 0.1, 2600);                    // las enzimas lo cortan
for (let i = 0; i < 3; i++) m.gota(Al + 0.8 + i * 0.3, 0.12, 900);                   // el ARN cae sobre la célula
for (let i = 0; i < 6; i++) m.sube(Al + 1.8 + i * 0.55, 0.5, 74, 79, 0.03);          // sirena (inflamación)
m.golpe(Es + 0.2, 0.3, 80);                                                          // la tarjeta del estudio
[0, 1, 2, 3].forEach((i) => m.nota(Es + 4.4 + i * 0.8 + 0.4, [72, 76, 79, 84][i], 0.06, 0.7)); // cada U → Ψ
m.sube(Ag + 0.3, 1.7, 64, 52, 0.04);                                                 // la alarma se apaga
m.nota(Tr + 1.6, 69, 0.05, 1.0); m.nota(Tr + 1.8, 76, 0.05, 1.0);                    // ≈
[0, 0.12, 0.24].forEach((d, i) => m.metal(No + 0.3 + d, 0.08, [1300, 1600, 2000][i]));  // campanita de la medalla
m.tic(Ci + 0.3, 0.1, 1500);                                                          // la curita
for (let i = 0; i < 6; i++) m.tic(Ci + 2.2 + i * 0.25, 0.05, 2400);                  // el mensaje se borra
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
