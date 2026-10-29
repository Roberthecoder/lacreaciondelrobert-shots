// gen-audio.mjs — cama grave + efectos del Shot Ambiental #36 (aves y ventanas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Aves Ventanas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 36);
const K = m.K;
const G = K.Gancho, Re = K.Reflejo, A = K.Atraves, P = K.Pregunta, E = K.Estudio, Ci = K.Cifra, Ca = K.Casas, H = K.Halcon, Rg = K.Regla, Go = K.Golpe, C = K.Cierre, Ou = K.Outro;
const aleteo = (t0, d, g = 0.04) => { for (let t = 0; t < d; t += 0.18) m.whoosh(t0 + t, 0.12, g); };

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
aleteo(G, 3.2); m.nota(G + 1.0, 76, 0.05, 1.2); m.nota(G + 1.2, 81, 0.04, 1.2);          // el ave y "lo que ve": cielo
aleteo(Re, 2.5, 0.03); m.sube(Re + 0.8, 1.0, 69, 76, 0.04); m.nota(Re + 2.0, 72, 0.05, 1.0);   // rayo de luz y reflejo
m.sube(A + 0.6, 1.0, 64, 71, 0.04); m.nota(A + 1.6, 67, 0.05, 0.8);                      // a través: la planta
m.golpe(P + 0.2, 0.3, 90); m.sube(P + 0.2, 0.9, 45, 57, 0.05); m.nota(P + 1.0, 64, 0.05, 1.2);  // rascacielos y "?"
m.golpe(E + 0.2, 0.25, 110); for (let i = 0; i < 23; i++) m.tic(E + 1.2 + i * 0.09, 0.05, 1400 + (i % 4) * 150);  // 23 estudios
m.sube(Ci + 1.2, 1.4, 52, 59, 0.05); m.golpe(Ci + 2.6, 0.3, 70); m.sube(Ci + 3.2, 1.4, 59, 69, 0.05); m.golpe(Ci + 4.6, 0.35, 60);
m.nota(Ca + 0.4, 64, 0.06, 0.9); m.nota(Ca + 1.7, 60, 0.05, 0.8); m.tic(Ca + 3.0, 0.08, 2200);   // 44 %, 56 %, < 1 %
m.metal(H + 0.3, 0.12, 900); aleteo(H + 0.8, 1.6, 0.04); m.golpe(H + 2.4, 0.5, 80); m.metal(H + 2.4, 0.15, 1200);  // halcón y choque
for (let i = 0; i < 18; i++) m.tic(Rg + 0.4 + i * 0.065, 0.04, 2600);                    // rayas acostadas
for (let i = 0; i < 9; i++) m.tic(Rg + 2.8 + i * 0.12, 0.04, 2000);                      // rayas paradas
aleteo(Rg + 0.6, 1.8, 0.035); m.whoosh(Rg + 4.7, 0.6, 0.12); m.nota(Rg + 1.6, 72, 0.05, 0.8);   // el ave se desvía · mosquitero
m.latido(Go + 0.4, 0.18); m.latido(Go + 1.2, 0.14); m.latido(Go + 2.0, 0.12); aleteo(Go + 2.6, 1.6, 0.04);  // golpe y se va
aleteo(C + 0.2, 2.4, 0.035); m.nota(C + 2.6, 69, 0.06, 1.4); m.nota(C + 2.6, 76, 0.04, 1.4);    // se posa en el árbol
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
