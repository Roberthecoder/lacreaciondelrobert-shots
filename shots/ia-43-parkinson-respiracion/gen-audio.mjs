// gen-audio.mjs — cama grave + efectos del Shot IA #43 (IA que busca Parkinson en la respiración dormido). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Parkinson base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 43);
const K = m.K;
const G = K.Gancho, P = K.Parkinson, A = K.Aparato, N = K.Noches, Q = K.Pregunta, R = K.Respuesta, E = K.Estudio, M = K.Mascota, O = K.Ojo, C = K.Cierre, Ou = K.Outro;
const dP = A - P, dE = M - E;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// la respiración: un "bip" suave en cada pico de la rayita (periodo 3.6 s, pico en t = 0.9 + 3.6k) mientras se ve la recámara
const picos = (a, b, f = 76) => { for (let t = 0.9; t < b; t += 3.6) if (t >= a) m.nota(t, f, 0.025, 0.5); };
picos(0, P); picos(A + 2.6, N); picos(C, Ou);
m.whoosh(G + 1.4, 0.4, 0.1);                                                        // entra la lupa
for (let k = 0; k < 3; k++) m.burbuja(G + 1.6 + k * 0.2, 0.08, 900 + k * 200);       // brillitos de IA
m.whoosh(P, 0.5, 0.12);
for (let k = 0; k < 4; k++) m.gota(P + 0.8 + k * 0.9, 0.08, 1100);                   // pocas bolitas de dopamina
m.tic(P + 2.2, 0.2, 1400); m.tic(P + 2.8, 0.2, 1200); m.tic(P + 3.4, 0.2, 1000);        // temblor, rigidez, lentitud
m.metal(P + dP * 0.62, 0.12, 1300); m.golpe(P + dP * 0.62 + 1.2, 0.35, 70);            // tubo · se tacha
m.whoosh(A, 0.5, 0.12); m.golpe(A + 0.5, 0.3, 90);                                    // aparece el módem
m.zumbido(A + 1.2, 4.6, 0.025, 420);                                                  // ondas de radio
m.nota(A + 4.4, 72, 0.05, 0.6); m.nota(A + 4.45, 76, 0.04, 0.6);                       // "sin tocarte"
m.whoosh(N, 0.5, 0.12);
for (let i = 0; i < 28; i++) m.tic(N + 0.4 + i * 0.1, 0.05, 2000 + (i % 6) * 110);    // las noches se llenan
m.golpe(N + 2.2, 0.3, 80);                                                            // 7,671 personas
m.sube(Q + 0.05, 1.4, 50, 62, 0.05);                                                  // pregunta
m.zumbido(R + 0.3, 5.6, 0.02, 160); m.sube(R + 0.8, 1.2, 62, 52, 0.04);                // por dentro · se debilita
m.golpe(E + 0.1, 0.35, 80);                                                           // tarjeta 2022
m.whoosh(E + 2.2, 0.4, 0.1); m.burbuja(E + 3.0, 0.12, 700); m.nota(E + 3.6, 74, 0.05, 0.5);
for (let i = 0; i < 10; i++) m.tic(E + 3.9 + i * 0.16, 0.12, i < 9 ? 1800 : 600);      // 9 de 10
m.whoosh(E + dE * 0.56, 0.5, 0.12); m.sube(E + dE * 0.56 + 0.8, 0.8, 55, 72, 0.04);     // hospital · más de 8
m.sube(E + dE * 0.8, 1.2, 52, 70, 0.04);                                              // medidor de gravedad
m.motor(M + 0.3, 3.4, 0.05);                                                          // ventilador
m.sube(M + 1.1, 0.35, 76, 84, 0.04); m.sube(M + 1.45, 0.4, 84, 74, 0.04);              // "miau"
m.golpe(M + 2.6, 0.35, 70);                                                           // noche tachada
m.golpe(O + 0.8, 0.5, 60);                                                            // sello "EN ESTUDIO"
m.nota(C + 1.6, 79, 0.06, 1.0); m.nota(C + 1.65, 84, 0.05, 1.0);                       // el foquito de aviso
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
