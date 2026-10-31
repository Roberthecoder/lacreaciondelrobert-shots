// gen-audio.mjs — cama grave + efectos del Shot IA #45 (GraphCast: pronóstico de 10 días en menos de un minuto). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pronostico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 45);
const K = m.K;
const G = K.Gancho, E = K.Estudio, A = K.Aprende, Cu = K.Cuadritos, P = K.Pregunta, Pr = K.Prueba, Ci = K.Ciclones, Eu = K.Europa, O = K.Ojo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.zumbido(G + 0.1, 5.6, 0.03, 120);                                               // la supercomputadora zumba
for (let i = 0; i < 26; i++) m.tic(G + 0.2 + i * 0.22, 0.05, 1800);               // reloj en time-lapse
m.whoosh(G + 5.6, 0.4, 0.14); m.sube(G + 6.2, 1.0, 55, 79, 0.05);                 // aparece el chip y su barra vuela
m.nota(G + 7.2, 76, 0.07, 0.8); m.nota(G + 7.25, 83, 0.05, 0.8);                  // "< 1 min ✔"
m.golpe(E + 0.15, 0.35, 80); m.sube(E + 0.8, 0.8, 60, 67, 0.03);                  // tarjeta y malla
for (let i = 0; i < 6; i++) m.whoosh(A + 0.3 + i * 0.55, 0.35, 0.07);             // hojas de mapa que vuelan
m.zumbido(A + 1.0, 4.5, 0.02, 220);                                               // la red procesa
m.whoosh(Cu, 0.4, 0.1); m.golpe(Cu + 0.2, 0.2, 110); m.golpe(Cu + 2.0, 0.2, 140); // los dos parches
for (let i = 0; i < 20; i++) m.tic(Cu + 4.4 + i * 0.15, 0.06, 1500 + (i % 4) * 150); // +6 h, +6 h…
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 32; i++) m.tic(Pr + 1.0 + i * 0.08, 0.04, 2100 + (i % 5) * 110); // casillas que se pintan
m.golpe(Pr + 3.0, 0.45, 70); m.nota(Pr + 3.1, 72, 0.06, 0.7);                     // 90 %
m.whoosh(Ci + 0.2, 2.2, 0.1); m.zumbido(Ci + 0.3, 2.1, 0.03, 90);                 // el ciclón avanza
m.golpe(Ci + 2.9, 0.25, 90); m.golpe(Ci + 3.2, 0.25, 90);                         // flechas a las dos costas
m.golpe(Eu + 0.15, 0.3, 80); m.nota(Eu + 1.5, 64, 0.05, 0.5); m.nota(Eu + 2.3, 71, 0.05, 0.5); // dos monitores
m.zumbido(O + 0.4, 7.5, 0.02, 180);
m.burbuja(O + 0.4, 0.15, 600); m.burbuja(O + 0.9, 0.15, 700); m.burbuja(O + 2.2, 0.15, 500);
m.sube(O + 3.8, 0.6, 60, 72, 0.04);
m.cruje(O + 6.6, 0.35);                                                           // se tacha el mito
m.whoosh(C, 0.5, 0.12); m.nota(C + 2.5, 67, 0.06, 0.8); m.nota(C + 2.55, 74, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
