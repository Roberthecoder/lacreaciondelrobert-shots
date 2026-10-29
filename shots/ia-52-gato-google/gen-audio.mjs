// gen-audio.mjs — cama grave + efectos del Shot IA #52 (la red de Google que aprendió sola a ver gatos, 2012). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gato Google base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
const G = K.Gancho, V = K.Videos, Ma = K.Maquina, N = K.Neurona, P = K.Pregunta, Me = K.Mecanismo, E = K.Estudio, O = K.Objetos, Ce = K.Cerebro, C = K.Cierre, Ou = K.Outro;
const est = E + 4.3;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.zumbido(G + 0.05, 3.2, 0.03, 140); m.sube(G + 0.1, 3.0, 45, 64, 0.035);       // la cara se enfoca
m.nota(G + 2.1, 69, 0.06, 0.7); m.nota(G + 2.15, 76, 0.05, 0.7);                 // "es un gato"
m.whoosh(V, 0.5, 0.12);
for (let i = 0; i < 24; i++) m.tic(V + 0.3 + i * 0.25, 0.05, 1600 + (i % 4) * 150); // cuadros del video
for (let i = 0; i < 16; i++) m.whoosh(V + 0.6 + i * 0.3, 0.25, 0.04);           // cuadros que vuelan a la pila
m.sube(V + 2.2, 1.2, 50, 74, 0.04);                                               // 10,000,000
m.cruje(V + 4.7, 0.3);                                                            // se tacha la etiqueta
m.whoosh(Ma, 0.5, 0.12); m.motor(Ma + 0.2, 4.8, 0.05);                            // servidores
m.sube(Ma + 0.6, 1.0, 50, 76, 0.04);
for (let i = 0; i < 11; i++) m.tic(Ma + 2.5 + i * 0.1, 0.12, 900 + i * 60);      // racks que se encienden
m.golpe(Ma + 2.5, 0.3, 70);
for (let d = 0; d < 3; d++) m.nota(Ma + 3.9 + d * 0.3, 67 + d * 2, 0.05, 0.4);    // 3 días
m.zumbido(N + 0.2, 1.4, 0.03, 260); m.nota(N + 1.5, 79, 0.07, 0.8);              // la onda cruza; ding de la neurona
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.burbuja(Me + 0.3, 0.12, 500); m.whoosh(Me + 0.9, 0.4, 0.08); m.whoosh(Me + 1.7, 0.6, 0.1); // resume → redibuja
for (let i = 0; i < 12; i++) m.tic(Me + 2.8 + i * 0.09, 0.07, 1800 + (i % 3) * 200);
for (let k = 0; k < 4; k++) m.nota(Me + 4.4 + k * 0.4, 72, 0.04, 0.3);           // los gatos laten
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 3; i++) m.nota(est + i * 0.35, 64 + i * 3, 0.05, 0.6);        // tres neuronas
m.whoosh(O, 0.5, 0.12); m.sube(O + 3.7, 1.0, 50, 60, 0.035); m.sube(O + 4.5, 1.0, 50, 67, 0.04);
m.nota(O + 5.0, 72, 0.05, 0.5);
for (let i = 0; i < 16; i++) m.tic(O + 7.0 + i * 0.075, 0.06, 2200);            // 16 de cada 100
m.burbuja(Ce + 0.25, 0.1, 900); m.golpe(Ce + 0.7, 0.4, 55); m.latido(Ce + 1.2, 0.15);
m.nota(C + 0.4, 67, 0.05, 0.8); m.nota(C + 0.9, 71, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
