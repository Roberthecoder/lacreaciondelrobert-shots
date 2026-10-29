// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #11 (¿cortar o tirar el moho?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Moho Cortar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 11);
const K = m.K;
const G = K.Gancho, R = K.Raices, X = K.Toxinas, H = K.Hilos, P = K.Pregunta, Ti = K.Tira, D = K.Debajo, C = K.Corta, E = K.Estudio, M = K.Manzana, J = K.Jitomate, O = K.Oler, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, C, 0.05, [43, 50, 55], 0.45);                                       // tensa y tapada mientras el moho "se esconde"
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                 // más libre cuando llega la regla clara
m.whoosh(G + 0.1, 0.5, 0.12);                                                // entra el cuchillo
for (let i = 0; i < 4; i++) m.cruje(G + 0.3 + i * 0.25, 0.25);               // raspa la mancha
m.golpe(G + 3.4, 0.5, 70);                                                   // ¡NO!
m.sube(R + 0.2, 0.8, 60, 67, 0.04);                                          // salen las esporas
m.sube(R + 1.6, 2.6, 52, 40, 0.05); m.cruje(R + 2.0, 0.3);                   // los hilos bajan por la miga
for (let i = 0; i < 12; i++) m.burbuja(X + 1.4 + i * 0.16, 0.1, 380 + (i % 4) * 70); // sueltan micotoxinas
for (let i = 0; i < 8; i++) m.tic(H + 0.2 + i * 0.17, 0.1, 1200);            // toxinas en los hilos
m.sube(H + 2.0, 1.6, 55, 62, 0.04);                                          // se riegan
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                          // re-gancho
m.metal(Ti + 0.6, 0.15, 600);                                                // se abre el bote
for (let i = 0; i < 5; i++) m.golpe(Ti + 1.9 + i * 0.5, 0.25, 110);          // cada alimento que se tira
m.sube(D + 0.2, 2.0, 50, 42, 0.04);                                          // los hilos bajo la superficie
for (let i = 0; i < 4; i++) m.gota(D + 1.2 + i * 0.15, 0.15, 1400); // bacterias
for (let i = 0; i < 3; i++) m.nota(C + 2.4 + i * 0.45, 64 + i * 3, 0.06, 0.6);  // queso duro, zanahoria, pimiento
for (let i = 0; i < 6; i++) m.tic(C + 4.7 + i * 0.12, 0.1, 2600);            // la regla de 2.5 cm
m.whoosh(C + 5.5, 0.5, 0.12); m.metal(C + 6.1, 0.18, 1400);                  // el corte limpio
m.nota(C + 7.1, 72, 0.06, 0.8);
m.golpe(E + 0.2, 0.35, 80); m.metal(E + 0.25, 0.1, 2200);                    // tarjeta del estudio
for (let i = 0; i < 10; i++) m.tic(M + 0.3 + i * 0.18, 0.08, 1500);          // la patulina cerca de la mancha
for (let i = 0; i < 6; i++) m.tic(M + 2.2 + i * 0.12, 0.1, 2600);            // la regla de 2 cm
m.nota(M + 3.0, 60, 0.05, 0.8, 0.5);
for (let i = 0; i < 16; i++) m.tic(J + 0.2 + i * 0.14, 0.08, 900 + i * 40);  // se riega por todo el jitomate
m.sube(J + 0.2, 2.2, 48, 60, 0.04);
m.whoosh(O + 0.3, 1.2, 0.12);                                                // nube de esporas
m.golpe(O + 1.4, 0.45, 70);                                                  // ¡NO!
m.metal(Ci + 1.0, 0.15, 600); m.golpe(Ci + 2.2, 0.3, 100);                   // el pan al bote
m.nota(Ci + 2.6, 69, 0.06, 1.0); m.nota(Ci + 2.9, 72, 0.05, 1.0);            // el queso con margen
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
