// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #54 (micorrizas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Micorrizas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 54);
const K = m.K;
const G = K.Gancho, V = K.Viral, Mi = K.Micorriza, Tr = K.Trato, Ca = K.Casitodas, P = K.Pregunta, R = K.Red, Si = K.Simard, De = K.Debate, Ma = K.Madre, Ci = K.Citas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                    // cama grave, curiosa
for (let i = 0; i < 6; i++) m.tic(G + 0.05 + i * 0.18, 0.08, 700 + i * 120);    // crece el micelio
m.nota(G + 0.7, 81, 0.05, 0.3); m.nota(G + 0.85, 84, 0.05, 0.4);                // aparece el wifi
m.sube(G + 2.2, 0.5, 72, 60, 0.05); m.cruje(G + 2.25, 0.25);                    // se tacha
m.golpe(G + 3.3, 0.3, 90); m.nota(G + 3.5, 69, 0.06, 0.8);                      // el toldo del mercado
m.tic(V + 0.2, 0.2, 3200); m.whoosh(V + 0.2, 0.5, 0.1);                        // toque de pantalla
m.metal(V + 1.2, 0.12, 1800);                                                   // la corona
for (let i = 0; i < 6; i++) m.nota(V + 1.6 + i * 0.4, 76 + (i % 2) * 3, 0.03, 0.25); // pulsos de la "red"
m.whoosh(Mi - 0.2, 0.8, 0.12); m.golpe(Mi + 0.2, 0.45, 70);                     // bajamos · sello COMPROBADO
m.sube(Mi + 0.3, 1.1, 50, 57, 0.04); m.nota(Mi + 1.2, 64, 0.04, 0.8);           // manto y red de Hartig
for (let i = 0; i < 8; i++) m.gota(Tr + 0.3 + i * 0.3, 0.12, 700 + (i % 2) * 300); // fósforo y nitrógeno
for (let i = 0; i < 7; i++) m.tic(Tr + 1.6 + i * 0.32, 0.12, 2600);             // cubitos de azúcar
for (let i = 0; i < 9; i++) m.nota(Ca + 0.5 + i * 0.16, m.ESC[3 + i], 0.05, 0.3); // se encienden las plantas
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(R + 0.3, 0.3, 80);
for (let i = 0; i < 19; i++) m.tic(R + 0.9 + i * 0.12, 0.1, 1500 + i * 40);      // 19 árboles
m.golpe(R + 3.0, 0.4, 75);                                                      // sello "comparten hongo"
m.golpe(Si + 0.2, 0.35, 80); m.whoosh(Si + 1.0, 0.6, 0.08);                     // tarjeta · la bolsa
for (let i = 0; i < 10; i++) m.gota(Si + 1.6 + i * 0.35, 0.08, 1200);          // el carbono marcado viaja
m.golpe(De + 0.3, 0.45, 70); m.sube(De + 1.2, 0.8, 60, 63, 0.04); m.sube(De + 2.0, 0.8, 60, 58, 0.04); // EN DEBATE · ¿?
m.metal(Ma + 0.3, 0.1, 1800); m.sube(Ma + 1.6, 1.0, 57, 45, 0.04); m.golpe(Ma + 2.0, 0.5, 60); // SIN EVIDENCIA, la red se apaga
for (let i = 0; i < 6; i++) m.nota(Ci + 0.4 + i * 0.25, 60 + i * 2, 0.04, 0.3);   // las barras suben
m.golpe(Ci + 1.8, 0.3, 90);
m.whoosh(C - 0.2, 0.7, 0.1); m.golpe(C + 0.6, 0.3, 90); m.golpe(C + 2.4, 0.3, 80); m.golpe(C + 3.2, 0.3, 70); // tres sellos
m.nota(C + 3.6, 69, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
