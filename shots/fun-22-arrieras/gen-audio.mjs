// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #22 (hormigas arrieras). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Arrieras base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 22);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Pa = K.Pasta, B = K.Bolitas, E = K.Edad, P = K.Pregunta, Pl = K.Plaga, Es = K.Estudio, Ba = K.Bacterias, To = K.Todas, Ch = K.Chicatanas, R = K.Reina, C = K.Cierre, Ou = K.Outro;
const Bm = B + (E - B) * 0.52;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0);                                   // cama grave, terrosa
for (let i = 0; i < 22; i++) m.tic(G + 0.05 + i * 0.17, 0.05, 3200 + (i % 3) * 400); // pasitos de la hilera
m.golpe(G + 2.3, 0.5, 70);                                                   // sello «NO»
m.whoosh(H + 0.2, 1.2, 0.12); m.sube(H + 0.3, 1.4, 52, 40, 0.04);            // bajamos por el túnel
m.nota(H + 1.3, 57, 0.05, 1.0);                                              // aparece el jardín
for (let i = 0; i < 9; i++) m.tic(Pa + 0.4 + i * 0.2, 0.09, 2100);           // tijeretazos de la mandíbula
m.cruje(Pa + 2.2, 0.3);                                                      // se desprende el pedazo
for (let i = 0; i < 4; i++) m.tic(Pa + 2.4 + i * 0.22, 0.08, 1300);          // pellizcos
m.gota(Pa + 2.9, 0.25, 900);                                                 // gota de saliva
m.burbuja(Pa + 4.4, 0.12, 400);                                              // la pasta entra al jardín
for (let i = 0; i < 13; i++) m.nota(B + 0.2 + (i % 7) * 0.12 + (i >= 7 ? 0.4 : 0), m.ESC[4 + (i % 7)], 0.04, 0.4); // pop de cada bolita
m.whoosh(Bm - 0.2, 0.6, 0.08);
for (let i = 0; i < 5; i++) m.tic(Bm + 0.4 + i * 0.35, 0.06, 1600);          // la larva come
m.sube(E + 0.2, 0.8, 45, 57, 0.05); m.golpe(E + 1.0, 0.3, 75);               // ~66 millones
m.sube(E + 1.0, 2.0, 40, 52, 0.04);                                          // la línea del tiempo corre
m.nota(E + 2.5, 64, 0.05, 0.6); m.nota(E + 3.5, 76, 0.06, 0.4);              // arrieras · humanos
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                          // re-gancho
m.zumbido(Pl + 0.6, 3.0, 0.03, 70); m.cruje(Pl + 1.0, 0.35); m.cruje(Pl + 2.2, 0.35); // avanza el parásito
m.golpe(Es + 0.2, 0.35, 80); m.nota(Es + 1.6, 69, 0.05, 0.8);                // tarjeta 1999 · Panamá
m.whoosh(Ba + 1.3, 0.6, 0.1);                                                // se abre la lupa
for (let i = 0; i < 6; i++) m.gota(Ba + 1.8 + i * 0.35, 0.12, 1400 + i * 80); // fsss del antibiótico
m.sube(Ba + 2.0, 2.0, 52, 45, 0.03);                                         // el parásito retrocede
for (let i = 0; i < 5; i++) m.nota(To + 0.4 + i * 0.35, m.ESC[5 + i], 0.06, 0.5); // ✓ de cada especie
m.motor(Ch, 4.5, 0.03);                                                      // lluvia
for (let i = 0; i < 4; i++) m.zumbido(Ch + 0.3 + i * 0.7, 1.4, 0.03, 210 + i * 20); // aleteo de las chicatanas
m.burbuja(Ch + 2.6, 0.12, 300); m.burbuja(Ch + 2.8, 0.1, 340);               // la salsa
m.whoosh(R + 0.8, 0.6, 0.1); m.nota(R + 1.4, 72, 0.06, 0.8);                 // la bolsa y el pedacito de hongo
m.sube(C + 0.2, 1.4, 45, 52, 0.04); for (let i = 0; i < 12; i++) m.tic(C + 0.3 + i * 0.25, 0.05, 3200); // la hilera, otra vez
m.nota(C + 1.8, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
