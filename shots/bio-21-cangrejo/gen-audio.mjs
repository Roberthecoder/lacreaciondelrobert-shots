// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #21 (sangre azul del cangrejo herradura). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cangrejo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 21);
const K = m.K;
const G = K.Gancho, A = K.Animal, Az = K.Azul, En = K.Endotoxina, Pe = K.Peligro, Co = K.Coagulo, Es = K.Estudio, Pr = K.Pregunta,
  Sa = K.Sangrado, Mo = K.Mortalidad, Fc = K.FactorC, Fa = K.Farmacopea, Ci = K.Cierre, Ou = K.Outro;
const ES2 = Es + 4.75;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);                                                  // cama grave continua
for (let i = 0; i < 6; i++) m.gota(G + i * 0.22, 0.16, 820 + i * 30);                    // gotas azules al frasco
m.golpe(G + 1.8, 0.2, 110);                                                               // se tacha el planeta
for (let i = 0; i < 8; i++) m.tic(A + 0.1 + i * 0.2, 0.05, 1100 + (i % 2) * 300);        // patitas en la arena
m.nota(A + 1.8, 62, 0.05, 0.5); m.nota(A + 2.0, 66, 0.05, 0.5);                           // aparecen los parientes
for (let i = 0; i < 8; i++) m.burbuja(Az + 0.6 + i * 0.15, 0.08, 500 + i * 40);          // oxígeno → azul
m.nota(Az + 1.8, 69, 0.05, 0.9);
m.whoosh(En + 0.3, 0.6, 0.12);                                                            // se abre la Lupa
for (let i = 0; i < 9; i++) m.tic(En + 1.2 + i * 0.22, 0.06, 2200);                      // se desprenden las endotoxinas
m.sube(Pe + 0.9, 1.7, 55, 67, 0.05);                                                      // sube la fiebre
m.latido(Pe + 2.8, 0.18); m.latido(Pe + 3.4, 0.18);
for (let i = 0; i < 5; i++) for (let k = 0; k < 4; k++) m.nota(Co + 1.2 + i * 0.25 + k * 0.05, 74 + k * 2, 0.025, 0.25); // gránulos
m.golpe(Co + 3.6, 0.3, 70);                                                               // se cierra el gel
m.motor(Es + 0.1, 3.5, 0.03);                                                             // olas en Woods Hole
m.golpe(Es + 0.3, 0.25, 90);
m.gota(ES2 + 0.4, 0.22, 900);                                                             // gota de endotoxina en el tubo
for (let i = 0; i < 6; i++) m.tic(ES2 + 1.7 + i * 0.28, 0.05, 900);                     // el conejo se va saltando
m.golpe(ES2 + 0.8, 0.35, 80);                                                             // sello 1977
m.whoosh(ES2 + 2.3, 0.6, 0.1);                                                            // se voltea el tubo
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);                                                      // pregunta
m.metal(Sa + 0.15, 0.12, 1200);                                                           // aguja
for (let i = 0; i < 8; i++) m.gota(Sa + 0.3 + i * 0.24, 0.1, 700);
m.motor(Sa + 2.3, 1.6, 0.05);                                                             // regreso al mar
for (let i = 0; i < 3; i++) m.bajo(Mo + 1.3 + i * 0.2, 36, 0.12, 0.7);                   // 3 de 20, grises
m.golpe(Mo + 1.5, 0.25, 70);
for (let i = 0; i < 5; i++) m.tic(Fc + 0.55 + i * 0.25, 0.12, 700 - i * 60);             // fichas de dominó
m.whoosh(Fc + 2.2, 1.0, 0.08);                                                            // el gen viaja al matraz
for (let i = 0; i < 6; i++) m.nota(Fc + 3.4 + i * 0.25, 67 + (i % 3) * 2, 0.04, 0.4);   // sale el factor C
m.golpe(Fa + 0.5, 0.35, 85); m.golpe(Fa + 2.3, 0.35, 85);                                 // sellos de las farmacopeas
for (let i = 0; i < 4; i++) m.tic(Ci + 1.0 + i * 0.3, 0.04, 1100);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
