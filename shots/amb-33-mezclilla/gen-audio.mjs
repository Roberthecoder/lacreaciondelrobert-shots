// gen-audio.mjs — cama grave + efectos del Shot Ambiental #33 (mezclilla). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Mezclilla base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 133);
const K = m.K;
const G = K.Gancho, Ga = K.Garrafones, Al = K.Algodon, P = K.Pregunta, Ca = K.Carbono, Co = K.Contraste, La = K.Lavar, Se = K.Secar, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
for (let i = 0; i < 14; i++) m.burbuja(G + 0.05 + i * 0.18, 0.06, 300 + i * 25);          // el pantalón se llena de agua
m.sube(G + 0.05, 2.5, 48, 60, 0.04); m.nota(G + 2.6, 67, 0.06, 0.9);                     // 3,781 L
for (let i = 0; i < 18; i++) m.gota(Ga + 0.2 + i * 0.165, 0.09, 650 + i * 25);             // filas de garrafones
m.golpe(Ga + 2.0, 0.25, 110);                                                            // tarjeta del estudio
m.whoosh(Al - 0.2, 0.9, 0.12); for (let i = 0; i < 3; i++) m.tic(Al + 0.7 + i * 0.35, 0.12, 1300); // cápsulas que se abren
for (let i = 0; i < 10; i++) m.gota(Al + 1.0 + i * 0.4, 0.05, 1100 + (i % 3) * 90);       // agua del surco de riego
m.sube(P + 0.05, 1.2, 50, 62, 0.05); for (let i = 0; i < 8; i++) m.burbuja(P + 0.7 + i * 0.12, 0.05, 420);   // lavadora
for (let i = 0; i < 7; i++) m.tic(Ca + 0.4 + i * 0.12, 0.08, 1500 - i * 80);              // barras de carbono
m.golpe(Ca + 1.8, 0.35, 70);                                                             // el 37 %
m.whoosh(Co + 0.1, 0.5, 0.1); m.golpe(Co + 0.2, 0.25, 130);                              // tarjeta UNESCO-IHE
m.sube(Co + 3.0, 1.2, 48, 55, 0.04); m.sube(Co + 3.6, 2.0, 48, 67, 0.04);                // los dos pantalones se llenan
for (let i = 0; i < 10; i++) m.nota(La + 0.3 + i * 0.22, 64 + (i % 5), 0.04, 0.25);      // 10 puestas
m.golpe(La + 2.5, 0.25, 90); for (let i = 0; i < 6; i++) m.burbuja(La + 2.6 + i * 0.1, 0.05, 450);
m.sube(La + 3.4, 1.6, 64, 52, 0.05);                                                     // baja hasta −80 %
m.whoosh(Se - 0.2, 0.8, 0.1); m.cruje(Se + 1.0, 0.3);                                    // tendedero y secadora tachada
m.sube(Se + 2.6, 1.4, 62, 50, 0.05);                                                     // −67 %
for (let i = 0; i < 12; i++) m.gota(C - 0.3 + i * 0.15, 0.08, 650 + i * 30);              // otra vez los garrafones
m.tic(C + 1.4, 0.1, 1200); m.tic(C + 1.7, 0.1, 1100);                                    // parches
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
