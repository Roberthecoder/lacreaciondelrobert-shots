// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #29 (penicilina del melón). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Penicilina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, Po = K.Poquita, Pe = K.Peoria, Me = K.Melon, Se = K.Seis, Ta = K.Tanque, Pr = K.Pregunta, Mu = K.Mutantes, Es = K.Estudio, Di = K.DiaD, Ma = K.Mary, Ci = K.Cierre, Ou = K.Outro;
const e150 = Es + 2.6, e300 = Es + 5.2, e550 = Es + 6.9;

// cama: tapada mientras falta penicilina, se abre cuando sube la producción
m.pad(0, Pr, 0.05, [45, 52, 57], 0.5);
m.pad(Pr, Es, 0.05, [45, 52, 57], 0.8);
m.pad(Es, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
m.golpe(G + 0.05, 0.3, 90);                                                             // caja de Fleming
m.metal(G + 1.4, 0.12, 650);                                                            // tachón
m.whoosh(G + 0.1, 1.1, 0.12); m.golpe(G + 1.2, 0.35, 70);                               // melón que rueda y para
for (let i = 0; i < 3; i++) m.gota(Po + 0.6 + i * 1.6, 0.14, 1200);                     // gotita diminuta
m.nota(Po + 1.8, 57, 0.05, 1.0, 0.7);
m.golpe(Pe + 0.3, 0.25, 110);
for (let i = 0; i < 8; i++) m.tic(Pe + 1.2 + i * 0.32, 0.12, 1800 + i * 120);            // frascos que aparecen
m.golpe(Me + 0.2, 0.3, 80); m.nota(Me + 0.3, 69, 0.06, 0.9);                            // 1943
m.whoosh(Se + 0.05, 0.6, 0.12);                                                         // la lupa se abre
for (let i = 0; i < 6; i++) m.nota(Se + 0.6 + i * 0.25, m.ESC[4 + i], 0.035, 0.4);      // esporas en cadena
m.sube(Se + 1.2, 1.0, 57, 69, 0.05);                                                    // la barra crece
m.motor(Ta, 5.5, 0.05);                                                                 // agitador
for (let i = 0; i < 30; i++) m.burbuja(Ta + 0.3 + i * 0.17, 0.06, 450 + (i % 5) * 80);   // aire burbujeando
m.whoosh(Ta + 1.6, 0.8, 0.1);
for (let i = 0; i < 10; i++) m.gota(Ta + 3.0 + i * 0.2, 0.1, 700);                      // licor de maíz
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.zumbido(Mu + 0.2, 1.8, 0.06, 160);                                                    // rayos X
m.zumbido(Mu + 0.9, 1.6, 0.05, 240);                                                    // UV
for (let i = 0; i < 4; i++) m.nota(Mu + 2.0 + i * 0.1, 50 - i, 0.04, 0.4);               // colonias que se apagan
m.nota(Mu + 2.6, 81, 0.08, 1.2); m.nota(Mu + 2.6, 88, 0.04, 1.2);           // la ganadora
m.golpe(Es + 0.2, 0.35, 80);
m.nota(e150, 60, 0.08, 0.8); m.nota(e300, 64, 0.08, 0.8); m.nota(e550, 69, 0.09, 1.2);  // tres tubos, tres notas
for (let i = 0; i < 9; i++) m.tic(Di + 0.4 + i * 0.22, 0.16, 900);                      // cajas que se apilan
m.golpe(Di + 0.6, 0.3, 90);
m.nota(Ma + 0.4, 72, 0.05, 0.3); m.nota(Ma + 0.7, 71, 0.05, 0.3); m.nota(Ma + 1.0, 67, 0.05, 0.5); // notita cómica
for (let i = 0; i < 3; i++) m.tic(Ma + 2.6 + i * 0.3, 0.15, 1500);
for (let i = 0; i < 8; i++) m.nota(Ci + 0.6 + i * 0.3, m.ESC[2 + i], 0.04, 0.6);        // el árbol de cepas crece
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
