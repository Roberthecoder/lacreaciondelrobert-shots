// gen-audio.mjs — cama grave + efectos del Shot Ambiental #54 (tu basura de un año). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Basura base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 54);
const K = m.K;
const G = K.Gancho, D = K.Dia, B = K.Bolsa, M = K.Material, Ca = K.Camion, P = K.Pregunta, Di = K.Diagnostico, De = K.Destino, J = K.Jalisco, Tr = K.Tratamiento, C = K.Cierre, Ou = K.Outro;

m.pad(0, P, 0.05, [45, 52, 57]);
m.pad(P, C, 0.05, [45, 52, 57], 0.5);                                                // tapada mientras dura el problema
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 15; i++) m.golpe(G + 0.05 + i * 0.17 + 0.35, 0.22, 70 + (i % 4) * 8);  // cada bolsa que cae en la pila
m.nota(G + 2.9, 64, 0.06, 0.9);
m.whoosh(D + 0.1, 0.9, 0.12); m.golpe(D + 1.0, 0.3, 90);                             // la pila se encoge a una bolsa
for (let i = 0; i < 6; i++) m.tic(D + 1.0 + i * 0.16, 0.12, 2200);                  // la báscula cuenta
m.nota(D + 2.2, 67, 0.05, 0.6); m.nota(D + 3.4, 64, 0.05, 0.6);
m.cruje(B + 0.2, 0.4);                                                               // se abre la bolsa
for (let i = 0; i < 4; i++) m.burbuja(B + 0.5 + i * 0.35, 0.08, 300);               // capa orgánica
for (let i = 0; i < 4; i++) m.tic(M + 0.4 + i * 0.35, 0.14, 1400 + i * 200);        // botella, caja, lata, papel
m.golpe(M + 2.5, 0.2, 110);                                                          // capa de "otros"
m.motor(Ca, 3.8, 0.1);
for (let i = 0; i < 10; i++) m.golpe(Ca + 0.6 + i * 0.28, 0.12, 120);               // las bolsas suben al camión
m.nota(Ca + 2.8, 57, 0.06, 0.6, 0.5);
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
for (let i = 0; i < 18; i++) m.tic(Di + 0.3 + i * 0.15, 0.05, 1800 + (i % 5) * 150); // los puntos del mapa
for (let i = 0; i < 6; i++) m.nota(Di + 4.4 + i * 0.1, m.ESC[5 + i], 0.04, 0.4);     // se encienden los 52 rellenos
m.golpe(De + 1.0, 0.25, 70);
for (let i = 0; i < 10; i++) m.gota(De + 3.0 + i * 0.4, 0.08, 500 + (i % 3) * 60);  // escurrimiento del sitio abierto
m.zumbido(De + 3.2, 3.5, 0.03, 210);                                                 // moscas
m.sube(J + 0.4, 1.6, 45, 57, 0.06); m.tic(J + 2.1, 0.2, 2600);                      // la columna enorme y la rayita
for (let i = 0; i < 5; i++) m.nota(Tr + 1.0 + i * 0.15, m.ESC[4 + i], 0.05, 0.5);   // los 5 bloques
for (let i = 0; i < 15; i++) m.golpe(C - 0.3 + i * 0.12 + 0.35, 0.16, 70 + (i % 4) * 8); // la pila otra vez
m.zumbido(C + 1.0, 4.0, 0.025, 200);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
