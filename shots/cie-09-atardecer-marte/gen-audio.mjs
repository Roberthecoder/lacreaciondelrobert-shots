// gen-audio.mjs — cama grave + efectos del Shot Científico #09 (el atardecer azul de Marte). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Atardecer Marte base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 99);
const K = m.K;
const G = K.Gancho, Ti = K.Tierra, D = K.Dispersa, Ro = K.Rojo, Q = K.Pregunta, P = K.Polvo, Pa = K.Pasa, H = K.Halo, E = K.Estudio, Ca = K.Camara, S = K.Sol, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.sube(G + 0.1, 2.4, 69, 76, 0.04); m.nota(G + 2.4, 81, 0.04, 1.2);       // crece el halo azul
m.sube(Ti + 0.8, 2.8, 72, 62, 0.04);                                    // el Sol baja en la Tierra
for (let i = 0; i < 6; i++) m.tic(D + 0.5 + i * 0.6, 0.08, 2600 + (i % 3) * 300);   // el azul rebota en el aire
m.whoosh(Ro + 0.3, 1.4, 0.1); m.nota(Ro + 1.6, 57, 0.06, 1.2);           // el camino largo: rojo y amarillo
m.sube(Q + 0.1, 1.2, 52, 64, 0.05);
m.zumbido(P + 0.2, 3.0, 0.03, 160);                                      // polvo flotando
m.sube(Pa + 0.4, 1.0, 69, 76, 0.04);
m.nota(H + 0.4, 76, 0.05, 2.0); m.nota(H + 0.4, 81, 0.04, 2.0);           // el halo
m.golpe(E + 0.3, 0.35, 80); m.motor(E + 2.5, 2.5, 0.04);                 // tarjeta y el rover
m.tic(Ca + 0.4, 0.2, 1600); m.tic(Ca + 0.55, 0.2, 1600);                 // clic de la cámara
m.golpe(S + 0.6, 0.25, 70); m.nota(S + 1.6, 69, 0.05, 0.8);
m.sube(C + 0.8, 1.6, 64, 76, 0.04);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
