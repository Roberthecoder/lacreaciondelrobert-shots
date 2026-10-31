// gen-audio.mjs — cama grave + efectos del Shot IA #50 (personas que etiquetan datos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Etiquetadores base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 50);
const K = m.K;
const G = K.Gancho, E = K.Ejemplos, I = K.ImageNet, V = K.Votos, P = K.Pregunta, Ke = K.Kenia, D = K.Detector, Pa = K.Paga, To = K.Tortura, B = K.Balance, C = K.Cierre, Ou = K.Outro;
const V2 = V + (P - V) * 0.55;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.1, 1.1, 0.08); m.tic(G + 1.3, 0.14, 1800); m.nota(G + 1.35, 72, 0.05, 0.4);   // marcador dibuja el cuadrito + etiqueta
m.burbuja(G + 1.7, 0.14, 420);                                                              // aparece la persona
m.whoosh(E, 0.5, 0.12);
for (let i = 0; i < 6; i++) m.tic(E + 0.15 + i * 0.4, 0.1, 1200 + i * 80);                  // ejemplos que entran a la red
m.zumbido(E + 0.5, 3.0, 0.02, 220);
m.golpe(I + 0.1, 0.35, 80); m.sube(I + 0.1, 1.6, 50, 74, 0.04);                             // 14,197,122
for (let i = 0; i < 40; i++) m.tic(I + 1.2 + i * 0.105, 0.04, 2100 + (i % 5) * 130);         // miniaturas que se verifican
m.whoosh(V, 0.5, 0.12); m.tic(V + 1.0, 0.12, 1700);
for (let i = 0; i < 5; i++) m.nota(V + 1.6 + i * 0.5, 67 + i * 2, 0.05, 0.3);               // cinco votos
m.whoosh(V2, 0.5, 0.12); m.tic(V2 + 1.0, 0.1, 1500); m.tic(V2 + 1.5, 0.1, 1500);
m.nota(V2 + 2.0, 62, 0.05, 0.4); m.nota(V2 + 2.1, 61, 0.05, 0.4);                           // ¿foca o nutria?
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(Ke + 0.9, 0.3, 70); m.nota(Ke + 1.0, 45, 0.05, 2.5, 0.6);                           // el pin cae en Nairobi (cama tapada)
for (let i = 0; i < 36; i++) m.tic(Ke + 3.0 + i * 0.04, 0.03, 900 + (i % 3) * 200);          // tres docenas de personas
m.zumbido(Ke + 3.2, 4.0, 0.02, 140);
m.zumbido(D + 0.2, 5.0, 0.02, 300);
for (let i = 0; i < 3; i++) m.golpe(D + 1.5 + i * 1.2, 0.3, 90);                             // el escudo rebota los textos tóxicos
m.golpe(Pa + 0.1, 0.3, 80); m.nota(Pa + 2.5, 50, 0.06, 1.2, 0.5); m.tic(Pa + 3.4, 0.1, 1300);
m.golpe(To + 0.2, 0.3, 60);
for (let i = 0; i < 8; i++) m.cruje(To + 2.0 + i * 0.18, 0.06);                              // meses tachados
m.whoosh(B, 0.5, 0.12); m.sube(B + 0.3, 2.0, 55, 60, 0.03);                                 // la balanza se mece
m.whoosh(C, 0.5, 0.12); m.nota(C + 1.0, 72, 0.06, 0.8); m.nota(C + 1.05, 76, 0.05, 0.8); m.nota(C + 1.1, 79, 0.04, 0.8);  // saluda
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
