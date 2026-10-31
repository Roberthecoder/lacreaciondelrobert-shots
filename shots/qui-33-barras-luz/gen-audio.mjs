// gen-audio.mjs — cama grave + efectos del Shot Químico #33 (barras de luz). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot BarraLuz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 33);
const K = m.K;
const G = K.Gancho, Q = K.Que, Me = K.Mezcla, En = K.Energia, Ex = K.Experimento, Re = K.Resultado, Es = K.Estudio, Da = K.Dato, Se = K.Seguridad, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, G + 1.2, 0.04, [45, 52], 0.7);                                               // a oscuras, tapado
m.pad(G + 1.2, Ou + 3.5, 0.05, [45, 52, 57]);                                         // se "enciende"
m.cruje(G + 0.35, 0.7);                                                               // ¡crac! del vidrio
m.metal(G + 0.4, 0.12, 2400);
for (let i = 0; i < 8; i++) m.tic(G + 0.9 + i * 0.16, 0.08, 900);                    // agitar
m.sube(G + 1.2, 1.2, 57, 69, 0.06);                                                   // se enciende
m.nota(Q + 0.5, 64, 0.05, 0.6); m.nota(Q + 2.0, 69, 0.05, 0.6);                      // vidrio / plástico
for (let i = 0; i < 5; i++) m.burbuja(Q + 0.4 + i * 0.1, 0.06, 700);
m.whoosh(Me, 1.0, 0.12); m.golpe(Me + 1.0, 0.25, 120);                               // choque H₂O₂ + oxalato
m.zumbido(Me + 1.2, 2.0, 0.04, 210);                                                  // molécula que tiembla
m.golpe(En + 0.4, 0.25, 140); m.whoosh(En + 0.5, 0.8, 0.1);                          // se parte en CO₂
m.metal(En + 1.3, 0.1, 1600);                                                         // energía al colorante
for (let i = 0; i < 10; i++) m.nota(En + 2.2 + i * 0.32, [76, 79, 81, 84, 86][i % 5], 0.04, 0.5); // fotones
for (let i = 0; i < 3; i++) m.tic(Ex + 0.5 + i * 0.7, 0.15, 1200);                   // tres vasos
m.sube(Ex + 2.2, 1.2, 57, 64, 0.05);                                                  // ¿cuál dura más?
for (let i = 0; i < 26; i++) m.tic(Ex + 2.6 + i * 0.4, 0.05, 2200);                  // reloj
m.nota(Re + 0.3, 57, 0.04, 1.2, 0.6);                                                 // la del hielo, tenue
m.sube(Re + 2.3, 0.6, 64, 76, 0.07); m.nota(Re + 3.4, 64, 0.05, 1.6, 0.5);          // la caliente brilla y se apaga
m.golpe(Es + 0.2, 0.35, 80); m.golpe(Es + 3.4, 0.2, 110); m.nota(Es + 5.8, 69, 0.06, 0.8); m.nota(Es + 6.0, 74, 0.06, 0.8);
m.golpe(Da + 0.2, 0.35, 80);
for (let i = 0; i < 12; i++) m.tic(Da + 3.3 + i * 0.1, 0.07, 1800);                  // contador
m.sube(Da + 5.0, 1.2, 60, 72, 0.06);                                                  // barra de diciembre
for (let i = 0; i < 4; i++) m.gota(Se + 0.2 + i * 0.15, 0.15, 900);                  // gotas en la mano
m.whoosh(Se + 2.0, 1.6, 0.12); for (let i = 0; i < 10; i++) m.gota(Se + 2.1 + i * 0.15, 0.1, 1100); // chorro de agua
m.cruje(Ci + 0.1, 0.25); m.sube(Ci + 0.3, 1.0, 57, 69, 0.05);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
