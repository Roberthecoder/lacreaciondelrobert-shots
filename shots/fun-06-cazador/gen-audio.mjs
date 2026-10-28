// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #06 (el hongo cazador). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cazador base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 6);
const K = m.K, E = m.ESC;
const G = K.Gancho, Ti = K.Tierra, H = K.Hambre, R = K.Red, P = K.Pregunta, Es = K.Estudio, Sp = K.Espia, O = K.Olor, Pe = K.Pega, D = K.Digiere, Da = K.Dato, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 1.8, 0.1);                                                       // el gusano se acerca
m.gota(G + 2.1, 0.3, 700); m.golpe(G + 2.2, 0.25, 110);                      // ¡pegado!
for (let i = 0; i < 6; i++) m.tic(G + 2.5 + i * 0.25, 0.08, 900);            // se retuerce
m.sube(Ti + 0.3, 3.6, 50, 62, 0.03);                                         // crecen las hifas en la tierra
for (let i = 0; i < 3; i++) m.burbuja(Ti + 1.4 + i * 0.9, 0.08, 300);        // come restos
m.sube(H + 0.4, 1.8, 64, 52, 0.05);                                          // baja la comida
for (let i = 0; i < 3; i++) m.tic(H + 1.6 + i * 0.4, 0.12, 1300);            // aparecen nematodos
for (let i = 0; i < 4; i++) m.nota(R + 0.2 + i * 0.5, E[4 + i], 0.05, 0.6);   // se forman los anillos
m.gota(R + 2.1, 0.2, 1200); m.gota(R + 2.4, 0.2, 1400);                       // pegamento
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
for (let i = 0; i < 6; i++) m.gota(Es + 1.4 + i * 0.4 + 1.0, 0.15, 800 + i * 60); // caen las moléculas
for (let i = 0; i < 7; i++) m.nota(Sp + 0.4 + i * 0.35, E[5 + (i % 4)], 0.05, 0.5); // brotan trampas
m.zumbido(O + 0.3, 3.5, 0.03, 160);                                          // olor que se esparce
for (let i = 0; i < 8; i++) m.tic(O + 2.8 + i * 0.6, 0.06, 700);             // gusanos que se acercan
m.cruje(Pe + 0.5, 0.35); m.sube(Pe + 1.0, 3.0, 45, 57, 0.04);                 // atraviesa y crece
for (let i = 0; i < 10; i++) m.burbuja(D + 0.3 + i * 0.25, 0.07, 420 + i * 20); // enzimas
m.sube(Da + 0.2, 1.0, 52, 74, 0.05);
for (let i = 0; i < 20; i++) m.tic(Da + 1.0 + i * 0.1, 0.05, 2000 + (i % 5) * 150); // 20 íconos
m.nota(C + 1.0, 69, 0.06, 1.2); m.nota(C + 1.0, 64, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
