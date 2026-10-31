// gen-audio.mjs — cama grave + efectos del Shot IA #23 (la IA que lee labios). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot LeeLabios base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K;
const G = K.Gancho, V = K.Visemas, E = K.Experto, P = K.Pregunta, S = K.Estudio, D = K.Duelo, Vz = K.Voz, R = K.Riesgo, C = K.Cierre, Ou = K.Outro;
const E2 = E + 7.4, D2 = D + 5.2;

m.pad(0, C + 4.0, 0.05, [43, 50, 55], 0.6);                                  // cama apagada (como con tapones) mientras la boca está "muda"
m.pad(C + 4.0, Ou + 3.5, 0.05, [45, 52, 57], 0);                             // se abre cuando el contexto decide
for (let t = G + 0.05; t < V; t += 1.7) { m.tic(t, 0.08, 900); m.tic(t + 1.6, 0.08, 900); } // labios que se juntan (clic suave)
m.golpe(G + 0.5, 0.3, 90); m.golpe(G + 0.9, 0.3, 110);                        // tarjetas PESO / BESO
for (let i = 0; i < 6; i++) m.burbuja(G + 1.4 + i * 0.6, 0.06, 600);         // el "?" que rebota
[0.4, 0.8, 1.2].forEach((d, i) => { m.whoosh(V + d, 0.4, 0.1); m.golpe(V + d + 0.55, 0.35, 70 + i * 15); }); // P, B, M caen al molde
m.nota(V + 1.9, 64, 0.05, 0.6);
m.golpe(E + 0.2, 0.35, 80);                                                  // tarjeta 2017
m.zumbido(E + 3.0, 4.0, 0.015, 120);                                         // la tele muda
for (let i = 0; i < 3; i++) m.tic(E + 4.1 + i * 0.35, 0.12, 1500);           // menos de ¼
for (let i = 0; i < 6; i++) m.tic(E2 + 0.3 + i * 0.2, 0.12, 1900 + i * 80);  // ½
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 30; i++) m.tic(P + 0.1 + i * 0.05, 0.04, 2200 + (i % 6) * 120); // se multiplican las bocas
m.golpe(S + 0.2, 0.35, 80);                                                  // tarjeta 2018
m.motor(S + 2.4, 3.6, 0.05);                                                 // la tira de película corre
m.sube(S + 2.8, 1.6, 52, 76, 0.05);                                          // 3,886 h
m.whoosh(D, 0.5, 0.12); m.golpe(D + 0.5, 0.45, 60);                          // ¡VS!
for (let i = 0; i < 10; i++) m.whoosh(D + 1.4 + i * 0.31, 0.18, 0.05);       // "rewind" por cada repetición
for (let i = 0; i < 12; i++) m.tic(D + 0.3 + i * 0.4, 0.05, 1200);           // cronómetro
m.sube(D2 + 0.4, 1.0, 52, 74, 0.04); m.sube(D2 + 1.1, 1.0, 52, 72, 0.04);    // barras de los expertos
m.golpe(D2 + 3.7, 0.5, 55); m.nota(D2 + 3.8, 72, 0.06, 0.6); m.nota(D2 + 3.85, 76, 0.05, 0.6); // cae la barra de la IA
for (let i = 0; i < 4; i++) m.nota(Vz + 0.4 + i * 1.1, 81, 0.025, 0.15);     // monitor del hospital (suave)
for (let i = 0; i < 9; i++) m.tic(Vz + 1.9 + i * 0.12, 0.06, 2600);          // se escribe el globo
m.zumbido(R + 0.3, 2.2, 0.03, 240);                                          // la cámara de calle
m.golpe(R + 1.4, 0.35, 70);                                                  // ✗
m.nota(R + 3.0, 72, 0.05, 0.5); m.nota(R + 3.05, 76, 0.04, 0.5);             // ✔
[3.2, 3.6, 4.0].forEach((d) => m.burbuja(R + d, 0.1, 520));                  // chips
m.golpe(C + 2.8, 0.3, 90);                                                   // la frase con hueco
m.nota(C + 4.0, 72, 0.07, 0.9); m.nota(C + 4.05, 76, 0.06, 0.9); m.nota(C + 4.1, 79, 0.05, 0.9); // se ilumina PESO
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
