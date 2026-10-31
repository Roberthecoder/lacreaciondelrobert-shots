// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #19 (liquen). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Liquen base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K;
const G = K.Gancho, D = K.Donde, Ct = K.Corte, Cz = K.Corteza, Al = K.Algas, Me = K.Medula, Tr = K.Trato, P = K.Pregunta, H = K.Historia, E = K.Estudio, Cn = K.Continentes, Es = K.Espacio, C = K.Cierre, Ou = K.Outro;
const SEC = Ct + 1.0;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);
for (let i = 0; i < 6; i++) m.nota(G + 0.1 + i * 0.2, m.ESC[2 + i], 0.035, 0.5);      // brotan las manchas
m.nota(G + 0.5, 64, 0.04, 0.3); m.nota(G + 0.9, 64, 0.04, 0.3);                      // ¿planta? ¿musgo?
m.cruje(G + 2.2, 0.3); m.cruje(G + 2.6, 0.3);                                        // se tachan
m.nota(G + 3.2, 69, 0.06, 0.9); m.nota(G + 3.2, 76, 0.04, 0.9);                      // hongo + socio
for (let i = 0; i < 3; i++) { m.golpe(D + 0.1 + i * 0.7, 0.22, 110); m.nota(D + 0.35 + i * 0.7, 72 + i * 2, 0.04, 0.4); } // piedra, tronco, barda
m.whoosh(Ct, 1.0, 0.12); m.metal(Ct + 0.35, 0.12, 2600); m.whoosh(Ct + 0.4, 0.45, 0.1); // la cámara baja y el bisturí corta
for (let i = 0; i < 5; i++) m.tic(SEC + i * 0.18, 0.12, 700 + i * 120);              // aparecen los pisos
m.sube(Cz + 0.8, 0.8, 72, 79, 0.03); for (let i = 0; i < 4; i++) m.gota(Cz + 1.3 + i * 0.6, 0.08, 1400); // el sol rebota
for (let i = 0; i < 8; i++) m.burbuja(Al + 1.8 + i * 0.35, 0.06, 420 + (i % 3) * 80); // azúcar
m.nota(Al + 0.5, 67, 0.04, 0.8);
m.zumbido(Me + 0.3, 2.4, 0.02, 120);                                                 // hifas sueltas
m.sube(Tr + 0.1, 0.8, 52, 60, 0.04); for (let i = 0; i < 5; i++) m.burbuja(Tr + 1.0 + i * 0.3, 0.05, 520); // casa y comida
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
m.golpe(H + 0.2, 0.3, 80); for (let i = 0; i < 3; i++) m.nota(H + 1.2 + i * 0.35, 60 + i * 4, 0.05, 0.5);
m.tic(H + 2.8, 0.2, 500); m.tic(H + 3.2, 0.2, 420); m.tic(H + 3.6, 0.2, 360);        // ¡no!
m.golpe(E + 0.15, 0.3, 80); m.whoosh(E + 0.3, 1.0, 0.08);
m.sube(E + 2.0, 0.6, 60, 72, 0.04); for (let i = 0; i < 9; i++) m.gota(E + 2.6 + i * 0.12, 0.07, 1800); // lupa: levaduras
for (let i = 0; i < 6; i++) m.tic(Cn + 0.3 + i * 0.3, 0.16, 1500 + i * 150);         // 6 continentes
m.nota(Cn + 3.0, 74, 0.04, 0.8);
m.zumbido(Es, 4.6, 0.03, 70); m.metal(Es + 0.5, 0.1, 900);                           // satélite, se abre la caja
for (let i = 0; i < 15; i++) m.tic(Es + 1.0 + i * 0.23, 0.07, 2200);                 // los días
m.whoosh(Es + 5.0, 1.2, 0.12); m.sube(Es + 6.2, 0.8, 57, 64, 0.04); m.sube(Es + 6.8, 0.8, 57, 64, 0.04); m.nota(Es + 7.7, 76, 0.06, 0.8);
m.nota(C + 0.6, 64, 0.05, 0.6); m.nota(C + 0.95, 67, 0.05, 0.6); m.nota(C + 1.3, 71, 0.03, 0.6); // el equipo
m.whoosh(C + 3.0, 0.8, 0.1);                                                         // cohetito
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
