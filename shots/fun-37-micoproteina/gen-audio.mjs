// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #37 (micoproteína). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Micoproteina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 37);
const K = m.K;
const G = K.Gancho, H = K.Hongo, S = K.Suelo, Ta = K.Tanque, D = K.Duplica, Ca = K.Calor, P = K.Pregunta, Hi = K.Hifas, F = K.Fibras, E = K.Estudio, M = K.Musculo, Q = K.Quitina, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                  // cama grave y cálida, sin golpe
m.whoosh(G + 0.2, 0.5, 0.12); m.cruje(G + 0.6, 0.45);                        // el tenedor baja y corta (crujiente)
m.tic(G + 0.6, 0.15, 900);
m.cruje(G + 1.9, 0.25);                                                       // se tacha "¿pollo?"
m.golpe(G + 2.4, 0.45, 75);                                                   // sello HONGO
m.zumbido(H + 0.4, 1.4, 0.04, 140); m.nota(H + 0.9, 64, 0.05, 0.8);           // la lupa se abre: hifas
for (let i = 0; i < 21; i++) m.tic(S + 0.4 + i * 0.09, 0.07, 1400 + (i % 7) * 120); // las cajas de Petri / el contador
m.gota(S + 0.25, 0.2, 700);                                                   // cae el marcador del campo
m.nota(S + 2.8, 72, 0.07, 1.0); m.nota(S + 3.0, 76, 0.05, 1.0);               // ¡este es!
for (let i = 0; i < 14; i++) m.burbuja(Ta + 0.3 + i * 0.25, 0.07, 280 + (i % 4) * 50); // burbujas del tanque
m.gota(Ta + 1.3, 0.15, 900); m.gota(Ta + 1.9, 0.15, 700);                     // entran glucosa y amonio
for (let i = 0; i < 9; i++) m.tic(D + i * 0.25, 0.08, 2600);                  // el cronómetro corre
m.nota(D + 0.8, 69, 0.06, 0.5); m.nota(D + 1.6, 76, 0.06, 0.6);               // 1 → 2 → 4
m.sube(Ca + 0.3, 1.7, 48, 57, 0.04); m.whoosh(Ca + 1.2, 1.5, 0.08);            // sube el calor, sale el ARN
for (let i = 0; i < 9; i++) m.tic(Ca + 1.2 + i * 0.32, 0.06, 3000);
m.nota(Ca + 2.4, 72, 0.05, 0.9);                                              // "seguro en las pruebas"
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                           // ¿y cómo…?
m.zumbido(Hi, 2.5, 0.03, 110);                                                // microscopio
for (let i = 0; i < 4; i++) m.sube(Hi + 0.2 + i * 0.3, 1.2, 55 + i * 2, 60 + i * 2, 0.025); // crecen las hifas
m.tic(Hi + 2.2, 0.15, 1800);                                                  // la medida
m.whoosh(F + 0.2, 1.8, 0.09); m.golpe(F + 2.0, 0.25, 90);                     // se alinean en haces
for (let i = 0; i < 6; i++) m.gota(F + 2.6 + i * 0.12, 0.08, 1100 + i * 40);  // gotitas de clara
m.golpe(E + 0.2, 0.35, 80);                                                   // tarjeta del estudio
for (let i = 0; i < 20; i++) m.tic(E + 3.0 + i * 0.08, 0.08, 1500);           // 20 hombres jóvenes
m.sube(M + 0.6, 1.8, 57, 69, 0.05); m.sube(M + 0.6, 1.8, 57, 62, 0.03);        // suben las barras
m.nota(Q + 0.3, 64, 0.05, 1.0); m.metal(Q + 2.8, 0.12, 1700);                 // pastel; clic del caparazón
m.whoosh(C + 0.6, 1.2, 0.08); m.nota(C + 1.6, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
