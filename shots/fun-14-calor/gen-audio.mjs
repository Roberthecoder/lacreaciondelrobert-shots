// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #14 (tu escudo de 37 grados). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Calor base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K;
const G = K.Gancho, Hm = K.Hormiga, Tu = K.Tu, Ho = K.Hongos, P = K.Pregunta, E = K.Estudio, R = K.Resultado, Gr = K.Grado, F = K.Fiebre, Hi = K.Hipotesis, A = K.Auris, Cl = K.Clima, D = K.Defensas, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57], 0.1);                                 // cama grave y cálida
for (let i = 0; i < 8; i++) m.tic(G + 0.1 + i * 0.3, 0.05, 3200);            // pasitos de la hormiga
m.sube(G + 0.2, 1.2, 50, 57, 0.04);                                          // asoman los hilos del hongo
m.zumbido(G + 2.2, 1.2, 0.05, 140); m.nota(G + 2.6, 69, 0.06, 1.0);          // se enciende el escudo
for (let i = 0; i < 4; i++) m.gota(G + 3.0 + 0.77 + i * 0.28, 0.12, 1300);    // esporas que rebotan
m.whoosh(Hm + 0.3, 2.0, 0.08);                                               // pasa la nube
for (let i = 0; i < 6; i++) m.tic(Hm + 0.6 + i * 0.4, 0.05, 2000);           // pasos sobre la hoja
m.sube(Tu + 0.3, 0.8, 57, 69, 0.06); m.tic(Tu + 1.1, 0.15, 1800);            // el termómetro llega a 37
m.sube(Ho, 1.2, 52, 60, 0.04);                                               // crecen los hongos
m.sube(Ho + 1.9, 1.2, 60, 45, 0.05); m.cruje(Ho + 2.2, 0.25);                 // se marchitan con el calor
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                          // ¿cuántos?
m.golpe(E + 0.2, 0.3, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 25; i++) m.tic(E + 2.6 + i * 0.06, 0.06, 1500 + (i % 5) * 200); // aparecen las cajas
m.metal(R + 0.2, 0.12, 900); m.zumbido(R + 0.2, 1.3, 0.04, 120);             // incubadora a 37 °C
for (let i = 0; i < 10; i++) m.nota(Gr + 0.8 + i * 0.35, 76 - i * 2, 0.05, 0.3); // un tono que baja en cada grado
m.latido(F + 0.8, 0.2); m.latido(F + 1.25, 0.2); m.latido(F + 1.7, 0.18);    // la fiebre
m.golpe(Hi + 1.6, 0.45, 70);                                                 // sello HIPÓTESIS
for (let i = 0; i < 4; i++) m.gota(Hi + 1.6 + i * 0.3, 0.1, 1100);           // esporas que rebotan
for (let i = 0; i < 7; i++) m.burbuja(A + 0.2 + i * 0.12, 0.08, 420 + i * 25); // levaduras
m.burbuja(A + 1.5, 0.1, 600); m.burbuja(A + 2.2, 0.1, 650);                  // gemación
m.golpe(Cl + 0.2, 0.3, 80); m.zumbido(Cl + 2.4, 2.0, 0.04, 90);              // tarjeta 2019 · el globo se calienta
m.golpe(Cl + 3.2, 0.45, 70);                                                 // sello HIPÓTESIS
m.zumbido(D + 0.3, 1.0, 0.05, 140); m.nota(D + 0.6, 69, 0.05, 0.9);          // escudo de calor
for (let i = 0; i < 7; i++) m.nota(D + 1.6 + i * 0.1, 72 + (i % 3) * 3, 0.03, 0.4); // llegan las defensas
m.nota(D + 3.0, 76, 0.05, 1.0);
m.zumbido(C, 1.0, 0.04, 140); m.nota(C + 0.8, 69, 0.05, 1.2); m.nota(C + 0.8, 76, 0.04, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
