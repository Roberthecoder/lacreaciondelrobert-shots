// gen-audio.mjs — cama grave + efectos del Shot IA #10 (tú contra un bot en los captchas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Captcha base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 31);
const K = m.K;
const G = K.Gancho, Ma = K.Marcador, E = K.Estudio, L = K.Letras, P = K.Pregunta, Li = K.Libros, Ca = K.Calle, Mo = K.Movimiento, Cf = K.Calificacion, C = K.Cierre, Ou = K.Outro;
const Li2 = Li + (Ca - Li) * 0.67;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 5; i++) m.tic(G + 0.15 + i * 0.12, 0.12, 2600);                // el bot teclea rapidísimo
m.nota(G + 0.85, 76, 0.07, 0.5); m.nota(G + 0.9, 81, 0.06, 0.6);                    // ✔ del bot
for (let i = 0; i < 12; i++) m.tic(G + 0.4 + i * 0.36, 0.06, 1700);                 // tic-tac de tu reloj
m.whoosh(Ma, 0.5, 0.12); m.sube(Ma + 0.4, 1.2, 50, 66, 0.04);                      // barra de personas
m.sube(Ma + 3.5, 1.2, 52, 76, 0.045); m.golpe(Ma + 4.6, 0.3, 80);                  // barra de bots
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 28; i++) m.tic(E + 1.6 + i * 0.11, 0.05, 2000 + (i % 5) * 120); // captchas que se llenan
m.zumbido(L + 0.2, 6.4, 0.025, 180);                                               // por dentro de la máquina
m.nota(L + 1.5, 69, 0.05, 0.5); m.sube(L + 2.4, 1.1, 52, 79, 0.045);               // letras derechas · 99.8 %
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.whoosh(Li, 0.5, 0.1); m.burbuja(Li + 1.6, 0.14, 420);                            // la palabra que nadie lee
m.whoosh(Li + 2.2, 0.6, 0.1);
for (let i = 0; i < 4; i++) m.tic(Li + 3.3 + i * 0.4, 0.1, 1900);                  // la teclean
m.nota(Li + 5.0, 72, 0.06, 0.5);
for (let i = 0; i < 9; i++) m.golpe(Li2 + i * 0.33, 0.12, 95 + i * 3);             // libros que se apilan
m.whoosh(Ca, 0.5, 0.12); m.metal(Ca + 1.0, 0.12, 900);                             // recuadro del número
m.whoosh(Mo, 0.5, 0.1); m.sube(Mo + 0.6, 1.0, 55, 67, 0.035);                      // brillo de la casilla
[1.8, 2.6, 3.4].forEach((d) => m.nota(Mo + d, 64 + d * 3, 0.05, 0.4));              // antes · durante · después
m.tic(Mo + 3.0, 0.3, 1200);                                                        // clic
m.zumbido(Cf + 0.2, 4.4, 0.02, 220); m.sube(Cf + 1.0, 2.0, 50, 74, 0.04);          // la aguja sube
m.whoosh(C, 0.5, 0.1); m.tic(C + 1.8, 0.3, 1200); m.nota(C + 2.0, 72, 0.06, 0.8); m.nota(C + 2.05, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
