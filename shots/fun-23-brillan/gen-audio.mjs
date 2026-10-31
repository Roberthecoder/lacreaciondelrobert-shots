// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #23 (hongos que brillan). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Brillan base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K;
const G = K.Gancho, Q = K.Quienes, R = K.Raro, Cf = K.Cafeico, Lf = K.Luciferina, Lc = K.Luciferasa, P = K.Pregunta, E = K.Estudio, Tr = K.Trampas,
  H = K.Hipotesis, Rj = K.Reloj, J = K.Jurasico, M = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);                                   // cama nocturna, grave y continua
m.cruje(G + 0.2, 0.7); m.golpe(G + 0.25, 0.3, 70);                              // el tronco se parte
m.sube(G + 0.4, 0.9, 64, 76, 0.05); m.nota(G + 1.0, 81, 0.05, 1.4);             // se enciende el brillo
m.whoosh(G + 0.9, 0.6, 0.12); m.cruje(G + 2.3, 0.3);                            // aparece el fantasma y se tacha
for (let i = 0; i < 3; i++) m.nota(Q + 0.3 + i * 0.6, [69, 72, 76][i], 0.06, 0.9); // se enciende cada hongo
for (let i = 0; i < 40; i += 4) m.tic(R + 0.1 + i * 0.02, 0.08, 1800);         // la cuadrícula de hongos
m.nota(R + 1.5, 84, 0.05, 1.0); m.nota(R + 1.6, 88, 0.04, 1.0);                 // los poquitos que brillan
m.burbuja(Cf + 0.4, 0.12, 420);                                                 // ácido cafeico
m.zumbido(Cf + 1.8, 0.7, 0.03, 260); m.burbuja(Cf + 2.4, 0.12, 520);            // hispidina sintasa → hispidina
m.whoosh(Lf + 0.1, 0.8, 0.08); m.gota(Lf + 0.9, 0.2, 1000); m.nota(Lf + 1.1, 76, 0.05, 0.8); // llega el OH: luciferina
for (let i = 0; i < 5; i++) m.tic(Lc + 0.2 + i * 0.12, 0.08, 700);            // la luciferasa muerde
m.burbuja(Lc + 0.6, 0.1, 350);                                                  // oxígeno
m.sube(Lc + 1.0, 0.4, 60, 84, 0.06); m.nota(Lc + 1.35, 84, 0.08, 1.8); m.nota(Lc + 1.35, 91, 0.04, 1.8); // ¡luz!
m.whoosh(Lc + 2.6, 0.8, 0.08); m.nota(Lc + 3.2, 69, 0.05, 0.8);                // se recicla
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(E + 0.2, 0.35, 80);                                                     // tarjeta del estudio
m.tic(E + 2.6, 0.15, 1200); m.tic(E + 2.85, 0.15, 1200); m.tic(E + 3.0, 0.15, 1000); m.tic(E + 3.25, 0.15, 1000);
m.zumbido(E + 3.3, 1.0, 0.03, 120); m.nota(E + 3.35, 79, 0.05, 1.0);            // se prenden los focos verdes
for (let i = 0; i < 14; i++) { m.zumbido(Tr + 0.1 + i * 0.13, 0.3, 0.015, 230 + (i % 3) * 30); m.tic(Tr + 0.6 + i * 0.13, 0.1, 1600); } // insectos que se pegan (encendidos)
for (let i = 0; i < 4; i++) m.tic(Tr + 0.9 + i * 0.45, 0.1, 900);              // los pocos de los apagados
m.zumbido(H + 0.9, 2.5, 0.03, 180); m.nota(H + 3.0, 72, 0.05, 0.8);            // el escarabajo se va volando con esporas
for (let i = 0; i < 3; i++) { m.sube(Rj + 0.3 + i * 1.4, 0.7, 57, 64, 0.04); m.sube(Rj + 1.0 + i * 1.4, 0.7, 64, 57, 0.04); } // el brillo sube y baja
m.whoosh(J + 0.2, 2.0, 0.08);                                                   // la línea del tiempo retrocede
m.golpe(J + 0.9, 0.35, 55); m.golpe(J + 1.6, 0.3, 55);                          // pisadas del dinosaurio
for (let i = 0; i < 6; i++) m.nota(M + 1.2 + i * 0.35, m.ESC[5 + i], 0.05, 0.6); // seis especies de México
m.cruje(C + 0.2, 0.2); m.zumbido(C + 0.8, 2.8, 0.03, 180); m.nota(C + 3.6, 76, 0.06, 1.2); // vuelve el tronco; llega el escarabajo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
