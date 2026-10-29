// gen-audio.mjs — cama grave + efectos del Shot IA #40 (250 documentos envenenados). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Envenenar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 40);
const K = m.K;
const G = K.Gancho, B = K.Biblioteca, Tr = K.Truco, E = K.Efecto, Pa = K.Panda, P = K.Pregunta, Es = K.Estudio, Ta = K.Tamano, Po = K.Porcentaje, M = K.Matiz, C = K.Cierre, Ou = K.Outro;

m.pad(0, C, 0.05, [41, 48, 53], 0.6);                                            // tapada mientras dura el veneno
m.pad(C, Ou + 3.5, 0.05, [45, 52, 57]);                                          // se abre en el cierre
for (let i = 0; i < 14; i++) m.tic(G + 0.15 + i * 0.12, 0.16, 2600 + (i % 4) * 150); // primeras hojas rojas que caen
for (let i = 0; i < 24; i++) m.tic(G + 1.9 + i * 0.1, 0.06, 2200 + (i % 5) * 120);   // el resto, ya lejos
m.whoosh(G + 1.6, 3.8, 0.08);                                                   // la cámara se aleja
m.whoosh(B, 0.5, 0.12);
for (let i = 0; i < 8; i++) m.whoosh(B + 0.3 + i * 0.45, 0.4, 0.05);             // hojas que vuelan de internet
for (let i = 0; i < 13; i++) m.tic(B + 0.6 + i * 0.25, 0.08, 900);               // libros al estante
m.golpe(Tr + 0.2, 0.3, 75);
for (let i = 0; i < 3; i++) m.tic(Tr + 0.5 + i * 0.35, 0.1, 1500);               // renglones normales
m.zumbido(Tr + 2.0, 0.9, 0.05, 140); m.golpe(Tr + 2.1, 0.35, 60);                // <SUDO>
for (let i = 0; i < 6; i++) m.cruje(Tr + 2.9 + i * 0.4, 0.15);                   // garabatos
m.nota(E + 1.1, 72, 0.05, 0.5); m.nota(E + 1.15, 76, 0.04, 0.5);                // respuesta normal
m.cruje(E + 2.2, 0.4); m.zumbido(E + 2.2, 1.2, 0.04, 90);                        // respuesta de disparates
m.whoosh(Pa, 0.5, 0.12); m.burbuja(Pa + 0.3, 0.15, 500); m.golpe(Pa + 2.0, 0.3, 80);
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(Es + 0.9, 0.35, 80);
for (let i = 0; i < 4; i++) m.nota(Es + 3.2 + i * 0.35, 48 + i * 5, 0.06, 0.5);  // cuatro tamaños, nota más grave al más chico
m.sube(Ta + 0.4, 1.8, 45, 69, 0.04);                                              // la pila crece ×20
m.golpe(Ta + 2.7, 0.4, 65); m.golpe(Ta + 2.8, 0.4, 55);                           // los mismos 250 a los dos
m.nota(Ta + 5.3, 50, 0.06, 0.6, 0.5);                                             // 100: no bastó
m.whoosh(Po, 0.5, 0.1); m.zumbido(Po + 0.5, 3.5, 0.02, 220);                       // la lupa busca
m.golpe(M + 0.4, 0.25, 90); m.nota(M + 2.0, 60, 0.05, 0.6, 0.4); m.nota(M + 3.4, 58, 0.05, 0.6, 0.4);
m.metal(C + 1.6, 0.15, 700);                                                      // se tacha el %
m.golpe(C + 2.2, 0.4, 60); m.nota(C + 2.2, 69, 0.06, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
