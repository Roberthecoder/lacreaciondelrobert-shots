// gen-audio.mjs — cama grave + efectos del Shot IA #51 (bocinas que se activan solas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Bocinas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 51);
const K = m.K;
const G = K.Gancho, Es = K.Escucha, Ex = K.Experimento, Nu = K.Numero, Pa = K.Palabras, P = K.Pregunta, D = K.Duracion, Nb = K.Nube, Ca = K.Calma, Na = K.Narcos, Co = K.Consejo, C = K.Cierre, Ou = K.Outro;
const bip = (t) => { m.nota(t, 76, 0.07, 0.25); m.nota(t + 0.09, 83, 0.06, 0.35); };   // la bocina se prende

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.zumbido(0, 4.5, 0.015, 140);                                                   // la tele platica
m.burbuja(G + 0.05, 0.12, 420); bip(G + 0.5);                                    // globo + luz
m.golpe(G + 2.6, 0.25, 90);                                                       // "nadie la llamó"
m.whoosh(Es - 0.3, 0.6, 0.14); m.zumbido(Es + 0.2, 4.6, 0.02, 220);              // por dentro
m.nota(Es + 1.6, 64, 0.05, 0.5); m.metal(Es + 3.6, 0.12, 900);                   // nube · candado se abre
m.golpe(Ex + 0.2, 0.35, 80);                                                      // tarjeta 2020
for (let i = 0; i < 7; i++) m.tic(Ex + 2.2 + i * 0.18, 0.14, 1300 + i * 110);     // 7 bocinas
m.zumbido(Ex + 3.0, 3.6, 0.015, 160);                                             // bocinas de audio
m.tic(Ex + 6.8, 0.3, 3200); m.tic(Ex + 6.86, 0.2, 2600);                          // clic de cámara
bip(Ex + 7.4);
m.sube(Nu + 0.3, 1.2, 52, 70, 0.04);                                              // 0.95
for (let i = 0; i < 12; i++) m.tic(Nu + 0.6 + i * 0.233, 0.07, 1800);             // tic-tac del reloj
bip(Nu + 3.4);
m.nota(Pa + 0.7, 72, 0.06, 0.5); bip(Pa + 1.0);                                    // "I'm sorry" ≈ Hey Siri
m.nota(Pa + 2.4, 72, 0.06, 0.5); bip(Pa + 2.7);                                    // "I messed up" ≈ Alexa
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 9; i++) m.tic(D + 0.3 + i * 0.12, 0.08, 2000 + (i % 3) * 200); // barras cortas
m.sube(D + 2.3, 1.4, 48, 64, 0.05);                                               // la barra larga
m.whoosh(Nb + 0.4, 1.2, 0.16); m.whoosh(Nb + 1.6, 1.2, 0.12);                     // sube a la nube
m.cruje(Ca + 2.0, 0.3); m.cruje(Ca + 3.6, 0.3);                                   // tachones
m.zumbido(Na + 0.2, 2.2, 0.015, 150); m.burbuja(Na + 1.0, 0.12, 380); bip(Na + 2.6);
m.golpe(Co + 1.0, 0.5, 70); m.nota(Co + 1.05, 57, 0.06, 0.6);                     // botón de micrófono
m.burbuja(C + 0.2, 0.12, 420); bip(C + 0.6); m.nota(C + 1.6, 72, 0.06, 0.8); m.nota(C + 1.65, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
