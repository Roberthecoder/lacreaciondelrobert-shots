// gen-audio.mjs — cama grave + efectos del Shot Festivo #14 · Candelaria · Fungi Mati (huitlacoche). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Huitlacoche base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K, E = m.ESC;
const G = K.Gancho, N = K.Nombre, Es = K.Espora, L = K.Levaduras, F = K.Fusion, P = K.Pregunta, Tu = K.Tumor, A = K.Agallas, Ep = K.Esporas, St = K.Estudio, Pl = K.Plaga, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);                                       // cama grave continua, cálida
m.whoosh(G + 0.1, 0.7, 0.14); for (let i = 0; i < 6; i++) m.tic(G + 0.2 + i * 0.09, 0.05, 1400); // la hoja del tamal se abre (crujido suave)
m.whoosh(G + 0.9, 1.2, 0.05);                                                 // vapor
m.golpe(G + 1.6, 0.2, 110);                                                   // se tacha «¿podrido?»
m.nota(G + 2.1, 64, 0.06, 0.8); m.nota(G + 2.1, 69, 0.05, 0.8);               // «un hongo»
m.whoosh(N - 0.2, 0.6, 0.12);
for (let i = 0; i < 9; i++) m.burbuja(N + 0.15 + i * 0.13, 0.12, 260 + i * 25); // las agallas se inflan en el elote
m.sube(Es - 0.2, 0.8, 69, 52, 0.04);                                          // bajamos al microscopio
m.gota(Es + 0.4, 0.12, 700);
m.golpe(Es + 3.0, 0.22, 95); m.tic(Es + 3.02, 0.1, 900);                      // la espora cae en la hoja (plop)
for (let i = 0; i < 4; i++) m.tic(L + 0.25 + i * 0.25, 0.05, 1800);           // germina: el tubito crece
for (let i = 0; i < 16; i++) m.burbuja(L + 1.2 + i * 0.13, 0.09, 600 + (i % 6) * 70); // cada esporidia que sale y brota
m.whoosh(F + 0.2, 1.2, 0.07);                                                 // se acercan
m.metal(F + 1.55, 0.07, 1200); m.nota(F + 1.6, 72, 0.07, 0.7); m.nota(F + 1.6, 76, 0.05, 0.7); // se fusionan (clic)
m.sube(F + 2.0, 1.6, 55, 62, 0.03);                                           // el filamento crece
m.burbuja(F + 3.7, 0.14, 220);                                                // la punta se hincha (apresorio)
m.motor(F + 4.1, 1.0, 0.05); m.golpe(F + 4.5, 0.18, 70);                      // perfora la planta
m.sube(P + 0.2, 2.2, 45, 64, 0.05);                                           // el grano se infla como globo
for (let i = 0; i < 12; i++) m.latido(Tu + 0.7 + i * 0.32, 0.08);             // las células crecen y se dividen (pulsos)
for (let i = 0; i < 6; i++) m.tic(Tu + 0.3 + i * 0.16, 0.04, 2000);           // la hifa avanza
for (let i = 0; i < 7; i++) m.tic(A + 0.3 + i * 0.39, 0.05, 1500);            // el contador de días
for (const [d, f] of [[0.6, 320], [1.3, 260], [2.0, 420], [2.1, 440], [2.2, 460], [2.6, 300], [2.8, 310], [3.0, 330]]) m.burbuja(A + d, 0.16, f); // cada agalla que brota (pop)
m.nota(A + 3.6, 64, 0.05, 0.8);
m.whoosh(Ep + 0.2, 0.5, 0.08);                                                // se abre la lupa
for (let i = 0; i < 20; i++) m.tic(Ep + 0.5 + i * 0.07, 0.035, 900 + (i % 5) * 120); // se llena de esporas (arena)
m.golpe(Ep + 2.1, 0.32, 75); m.cruje(Ep + 2.12, 0.45);                       // revienta: polvo negro
m.golpe(St + 0.2, 0.28, 85); m.metal(St + 0.25, 0.07, 1500);                  // tarjeta 2006
for (let i = 0; i < 18; i++) m.tic(St + 0.4 + i * 0.14, 0.035, 2600 + (i % 4) * 300); // el genoma se lee letra por letra
for (let i = 0; i < 8; i++) m.burbuja(St + 3.3 + i * 0.2, 0.08, 520);         // colonias en la caja de Petri
m.golpe(Pl + 1.45, 0.38, 70); m.metal(Pl + 1.47, 0.06, 500);                  // sello «ENFERMEDAD»
m.whoosh(Pl + 3.0, 0.6, 0.14);                                                // entra el lado de México
for (let i = 0; i < 4; i++) m.nota(Pl + 3.5 + i * 0.18, E[5 + i], 0.05, 0.6); // comida
m.sube(D + 0.4, 0.8, 52, 57, 0.04); m.sube(D + 0.8, 1.2, 52, 69, 0.05);        // medidores de lisina (poca / rico)
m.whoosh(D + 3.8, 0.8, 0.1); for (let i = 0; i < 3; i++) m.tic(D + 4.0 + i * 0.1, 0.05, 700); // el papel del códice se despliega
m.nota(D + 4.6, 57, 0.05, 1.2); m.nota(D + 4.6, 64, 0.04, 1.2);
m.whoosh(Ci - 0.2, 0.6, 0.12);
m.metal(Ci + 0.4, 0.08, 1800); m.metal(Ci + 0.7, 0.06, 2400);                 // campanita: regresamos al tamal
m.whoosh(Ci + 0.8, 0.5, 0.06);
for (let i = 0; i < 6; i++) m.nota(Ci + 1.3 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
