// gen-audio.mjs — cama grave + efectos del Shot IA #07 (prueba de Turing). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Turing base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 47);
const K = m.K;
const G = K.Gancho, J = K.Juego, Tu = K.Turing, P = K.Pregunta, Pe = K.Personaje, S = K.Sin, E = K.Estudio, El = K.Eliza, Pi = K.Pista, R = K.Riesgo, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.golpe(G + 0.05, 0.35, 85); m.golpe(G + 0.25, 0.3, 95);                         // las dos tarjetas
m.sube(G + 0.35, 1.2, 52, 77, 0.045); m.sube(G + 0.55, 1.2, 52, 62, 0.04);         // 73 % y 27 %
m.whoosh(J, 0.5, 0.12);
for (let i = 0; i < 3; i++) { m.tic(J + 0.3 + i * 1.4, 0.12, 2200); m.tic(J + 0.6 + i * 1.4, 0.12, 1900); }   // mensajes de los chats
for (let i = 0; i < 9; i++) m.tic(J + 0.4 + i * 0.5, 0.06, 1200);                  // tic-tac del reloj
m.golpe(Tu + 0.2, 0.35, 80);
m.sube(P + 0.05, 1.2, 50, 62, 0.05);
m.whoosh(Pe + 0.4, 0.6, 0.12); m.burbuja(Pe + 1.0, 0.15, 500);                      // se pone la gorra
for (let i = 0; i < 4; i++) m.golpe(Pe + 2.2 + i * 0.4, 0.18, 110 + i * 15);       // chips del personaje
m.sube(S + 0.4, 1.1, 52, 77, 0.04); m.sube(S + 1.7, 1.1, 52, 66, 0.04);             // 73 y 36
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 10; i++) m.tic(E + 1.6 + i * 0.12, 0.08, 1500 + i * 60);        // contador de partidas
m.zumbido(El, 4.6, 0.025, 120);                                                  // monitor viejo
for (let i = 0; i < 18; i++) m.tic(El + 0.5 + i * 0.14, 0.07, 2600);                // tecleo de ELIZA
m.sube(El + 2.1, 1.0, 52, 61, 0.04);
m.burbuja(Pi + 0.6, 0.18, 600); m.nota(Pi + 1.5, 76, 0.05, 0.5);                  // algo raro ✔
m.burbuja(Pi + 2.6, 0.18, 450); m.nota(Pi + 3.5, 60, 0.04, 0.5);                   // el clima
for (let i = 0; i < 10; i++) m.tic(R + 0.2 + i * 0.5, 0.06, 1200);
m.metal(R + 3.4, 0.1, 700); m.metal(R + 4.2, 0.1, 700);                            // alertas
m.golpe(C - 0.3, 0.3, 85);
m.nota(C + 2.2, 72, 0.06, 0.8); m.nota(C + 2.25, 76, 0.05, 0.8);                   // revela al humano
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
