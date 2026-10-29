// gen-audio.mjs — cama grave + efectos del Shot IA #29 (sesgo de género en el traductor). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Traductor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, P = K.Prueba, E = K.Estudio, R = K.Resultado, Q = K.Pregunta, Re = K.Realidad, Go = K.Google, Es = K.Espanol, S = K.Seattle, C = K.Cierre, Ou = K.Outro;
const teclea = (t0, t1, n) => { for (let i = 0; i < n; i++) m.tic(t0 + (t1 - t0) * i / n, 0.12, 1700 + (i % 4) * 160); };
const ding = (t, a = 76, b = 81) => { m.nota(t, a, 0.06, 0.5); m.nota(t + 0.08, b, 0.05, 0.6); };

m.pad(0, Go, 0.05, [43, 50, 55], 0.35);                                           // tensa mientras dura el sesgo
m.pad(Go, Ou + 3.5, 0.05, [45, 52, 57]);                                          // se abre con la corrección
for (let i = 0; i < 4; i++) m.tic(G + 0.05 + i * 0.24, 0.08, 2600);                // el «he» parpadea
m.whoosh(G + 0.95, 0.35, 0.1); m.golpe(G + 1.8, 0.35, 70);                        // lo borra… y vuelve
m.cruje(G + 1.4, 0.3);                                                            // se tacha "¿error de dedo?"
m.burbuja(P + 0.7, 0.16, 420); m.burbuja(P + 0.9, 0.16, 560);                     // ő se parte en dos
m.whoosh(P + 2.4, 0.5, 0.12); teclea(P + 2.9, P + 4.4, 12); ding(P + 4.7);
m.golpe(P + 4.9, 0.25, 90);
teclea(P + 7.3, P + 8.3, 12); ding(P + 8.5, 79, 84);
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 14; i++) m.tic(E + 1.6 + i * 0.16, 0.1, 1300 + (i % 5) * 140); // lluvia de profesiones
m.whoosh(R + 0.4, 0.5, 0.1); m.sube(R + 0.5, 1.1, 50, 74, 0.04); m.sube(R + 3.0, 0.6, 50, 54, 0.04);
m.golpe(Q + 0.05, 0.4, 60); m.sube(Q + 0.1, 1.4, 50, 62, 0.04);
m.sube(Re + 0.5, 1.0, 50, 57, 0.04); m.sube(Re + 4.0, 1.1, 50, 70, 0.04);
teclea(Go + 0.2, Go + 1.0, 8); ding(Go + 1.4, 72, 76); ding(Go + 1.9, 76, 79);
m.nota(Go + 4.8, 72, 0.06, 0.7); m.nota(Go + 4.85, 76, 0.05, 0.7); m.nota(Go + 4.9, 79, 0.05, 0.8);
m.zumbido(Es + 0.6, 1.2, 0.03, 220); m.zumbido(Es + 1.1, 1.0, 0.03, 330);         // la bifurcación
m.golpe(S + 0.2, 0.35, 80); m.burbuja(S + 2.7, 0.15, 600);
m.cruje(S + 4.5, 0.3); m.sube(S + 4.7, 0.9, 52, 66, 0.04);                        // tachón y 53 %
ding(C + 1.2, 74, 79); m.nota(C + 2.6, 69, 0.05, 0.9);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
