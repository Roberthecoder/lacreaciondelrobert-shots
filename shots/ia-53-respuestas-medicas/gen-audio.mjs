// gen-audio.mjs — cama grave + efectos del Shot IA #53 (chatbot contra médicos en un foro). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Respuestas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
const G = K.Gancho, Fo = K.Foro, E = K.Estudio, Ci = K.Ciegas, Ca = K.Calidad, Em = K.Empatia, P = K.Pregunta, L = K.Largo, F2 = K.Foro2, Li = K.Limites, B = K.Borrador, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.nota(G + 0.1, 76, 0.06, 0.4); m.nota(G + 0.5, 81, 0.06, 0.4);                 // llegan las dos respuestas ("ding")
for (let i = 0; i < 10; i++) m.tic(G + 0.6 + i * 0.2, 0.05, 2200 + (i % 3) * 150); // el chatbot escribe
m.golpe(G + 3.35, 0.35, 90); m.nota(G + 3.4, 72, 0.06, 0.6); m.nota(G + 3.45, 76, 0.05, 0.6);  // palomita
m.sube(G + 4.9, 1.0, 52, 72, 0.04);                                               // 78.6 %
m.whoosh(Fo, 0.5, 0.12); for (let i = 0; i < 16; i++) m.tic(Fo + 0.3 + i * 0.1, 0.05, 1800 + (i % 4) * 140);  // contador 195
m.golpe(E + 0.2, 0.35, 80); m.nota(E + 1.6, 64, 0.05, 0.5);
for (let i = 0; i < 3; i++) m.burbuja(Ci + 0.1 + i * 0.2, 0.12, 420 + i * 60);    // entran los evaluadores
for (let i = 0; i < 6; i++) m.whoosh(Ci + 1.0 + i * 0.27, 0.22, 0.07);            // se barajan las cartas
m.whoosh(Ca, 0.5, 0.12); m.sube(Ca + 0.6, 1.1, 52, 73, 0.04); m.sube(Ca + 2.7, 1.1, 52, 60, 0.04);
m.latido(Em + 0.1, 0.2); m.latido(Em + 0.45, 0.15); m.latido(Em + 1.3, 0.18); m.latido(Em + 1.65, 0.13);
m.sube(Em + 0.6, 1.1, 52, 66, 0.04); m.sube(Em + 2.5, 1.1, 52, 55, 0.04);
m.sube(P + 0.05, 1.4, 50, 62, 0.05); m.golpe(P + 1.3, 0.3, 70);                    // "Calma."
m.whoosh(L + 0.7, 1.3, 0.1); m.golpe(L + 1.7, 0.3, 90);                             // la tira larga se desenrolla · ×4
m.nota(F2 + 0.6, 60, 0.05, 0.5); m.golpe(F2 + 1.3, 0.4, 60);                         // expediente · ✕
m.golpe(Li + 0.1, 0.25, 80); m.tic(Li + 0.8, 0.2, 1500); m.tic(Li + 3.2, 0.2, 1500);
for (let i = 0; i < 8; i++) m.tic(B + 0.2 + i * 0.17, 0.05, 2400);                  // el robotito escribe
m.cruje(B + 2.0, 0.25); m.cruje(B + 2.7, 0.25);                                     // la pluma raya
m.golpe(C + 1.85, 0.5, 60); m.nota(C + 2.0, 72, 0.06, 0.8); m.nota(C + 2.05, 76, 0.05, 0.8);  // sello "revisado"
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
