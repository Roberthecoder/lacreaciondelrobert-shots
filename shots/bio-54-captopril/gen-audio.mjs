// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #54 (captopril y el veneno de la jararaca). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Captopril base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 54);
const K = m.K;
const G = K.Gancho, J = K.Jararaca, F = K.Ferreira, E = K.ECA, M = K.Manguera, Fr = K.Frenar, P = K.Pregunta, I = K.Intestino,
  S = K.Squibb, A = K.Azufre, C = K.Captopril, Se = K.Sesenta, Ci = K.Cierre, O = K.Outro;
const swap = A + 2.2;

m.pad(0, O + 3.5, 0.05, [45, 52, 57]);
m.tic(G + 0.25, 0.3, 2600); m.burbuja(G + 0.3, 0.12, 900);            // la pastilla sale del blíster
m.whoosh(G + 0.1, 1.2, 0.05);                                                         // la sombra de la víbora
for (let i = 0; i < 3; i++) m.whoosh(J + 0.4 + i * 1.3, 0.5, 0.06);                  // siseo de la jararaca
for (let i = 0; i < 6; i++) m.nota(J + 1.8 + i * 0.2, 64 - i * 2, 0.04, 0.4);         // la presión de la presa se desploma
for (let i = 0; i < 4; i++) m.gota(F + 0.3 + i * 0.5, 0.18, 950);                     // gotas de veneno
for (let i = 0; i < 4; i++) m.nota(F + 1.4 + i * 0.25, 69 + i * 3, 0.04, 0.3); // salen los pedacitos
m.sube(F + 3.4, 1.6, 52, 59, 0.04);                                                   // el vaso se afloja
m.whoosh(E + 0.2, 0.6, 0.1);                                                          // se abre la Lupa
m.metal(E + 2.2, 0.14, 900);                                                          // la ECA se traba
m.tic(M + 0.7, 0.2, 2000); m.tic(M + 0.8, 0.2, 2200);                                  // corta dos eslabones
for (let i = 0; i < 6; i++) m.latido(M + 1.4 + i * 0.5, 0.16);                        // el vaso apretado: latido rápido
m.metal(Fr + 0.3, 0.12, 900);                                                         // el veneno traba la ECA
for (let i = 0; i < 3; i++) m.latido(Fr + 1.0 + i * 0.9, 0.12);                       // se calma
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                                   // pregunta
m.tic(I + 1.2, 0.2, 1500); m.nota(I + 1.9, 72, 0.06, 0.6);                            // inyección ✓
for (let i = 0; i < 6; i++) m.golpe(I + 1.6 + i * 0.8, 0.12, 120);                    // rebotan en el intestino
m.golpe(I + 2.6, 0.2, 70);                                                            // ✗
m.golpe(S + 0.2, 0.3, 80);                                                            // sello de la tarjeta 1974
m.whoosh(S + 2.0, 1.6, 0.04);                                                         // gis en el pizarrón
m.tic(S + 3.5, 0.2, 3000);
m.nota(A + 0.3, 76, 0.05, 0.5); m.nota(A + 0.5, 79, 0.05, 0.5);                       // Ala-Pro se ilumina
m.golpe(A + 1.6, 0.12, 100);                                                          // la copia sin azufre entra
m.metal(swap, 0.22, 1200);                                                            // clic del azufre en el zinc
m.sube(swap + 0.4, 1.0, 57, 69, 0.05);                                                // ×2,000
m.whoosh(C + 0.3, 1.2, 0.06); m.golpe(C + 1.3, 0.2, 110);                             // se encoge y cae la pastilla
for (let i = 0; i < 20; i++) m.tic(Se + 0.4 + i * 0.05, 0.05, 1200 + i * 30);         // 2,000 compuestos (barra que sube)
for (let i = 0; i < 3; i++) m.nota(Se + 1.6 + i * 0.25, 69 + i * 3, 0.05, 0.4);       // solo 60
m.tic(Ci + 0.5, 0.15, 2200); m.whoosh(Ci + 0.2, 0.6, 0.05);
m.nota(O + 0.3, 57, 0.08, 2.8); m.nota(O + 0.3, 64, 0.06, 2.8); m.nota(O + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
