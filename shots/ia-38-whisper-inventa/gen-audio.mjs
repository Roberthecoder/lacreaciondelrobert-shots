// gen-audio.mjs — cama grave + efectos del Shot IA #38 (Whisper inventa frases). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Whisper base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 38);
const K = m.K;
const G = K.Gancho, W = K.Whisper, E = K.Estudio, Ci = K.Cifra, D = K.Danos, P = K.Pregunta, Pa = K.Pausas, S = K.Silencio, O = K.Otros, Co = K.Consulta, C = K.Cierre, Ou = K.Outro;
const G2 = G + 5.9;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 12; i++) m.tic(G + 0.05 + i * 0.09, 0.06, 2600 + (i % 3) * 200);   // se teclea la transcripción
m.golpe(G + 1.05, 0.5, 60);                                                           // sello "NADIE LO DIJO"
m.zumbido(G + 3.0, 2.6, 0.025, 160);                                                  // la voz entra al micrófono
m.nota(G + 3.35, 72, 0.06, 0.5); m.nota(G + 3.4, 76, 0.05, 0.5);                      // ✔ sí se dijo
m.metal(G2 + 0.1, 0.12, 640);                                                         // "glitch": brilla la frase inventada
m.burbuja(G2 + 0.3, 0.12, 700);
m.whoosh(W, 0.5, 0.12);
for (let i = 0; i < 3; i++) m.burbuja(W + 0.5 + i * 0.35, 0.12, 500 + i * 120);       // fichas de texto
for (let i = 0; i < 7; i++) m.nota(W + 1.9 + i * 0.16, m.ESC[4 + i], 0.04, 0.3);     // palomitas: suele atinar
m.golpe(E + 0.2, 0.35, 80);
m.sube(E + 2.6, 1.6, 50, 70, 0.04);                                                   // contador 13,140
for (let i = 0; i < 25; i++) m.tic(Ci + 0.1 + i * 0.032, 0.04, 2000 + (i % 4) * 150); // 100 hojitas
m.golpe(Ci + 1.4, 0.45, 55);                                                          // la hojita roja
for (let i = 0; i < 4; i++) m.golpe(D + 1.0 + i * 0.35, 0.2, 75);                     // 4 de cada 10
m.sube(D + 0.9, 1.4, 52, 64, 0.04);                                                   // 38 %
m.golpe(D + 3.0, 0.3, 90); m.tic(D + 3.9, 0.15, 1500); m.nota(D + 4.9, 79, 0.05, 0.4); // íconos
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.zumbido(Pa + 0.4, 3.6, 0.02, 200);                                                  // ondas de audio
m.whoosh(S, 0.6, 0.14); m.zumbido(S + 0.5, 4.2, 0.025, 120);                          // dentro de la máquina
for (let i = 0; i < 3; i++) m.burbuja(S + 1.8 + i * 0.5, 0.14, 450 + i * 150);        // gracias · por · ver
for (let i = 0; i < 3; i++) m.nota(O + 1.1 + i * 0.3, 72 + i * 2, 0.05, 0.4);         // 0 inventos ✔
m.metal(O + 2.0, 0.1, 500);                                                           // Whisper ✖
m.tic(Co + 0.3, 0.1, 1800); m.sube(Co + 1.6, 1.2, 52, 71, 0.04);                       // +30,000
m.whoosh(C + 0.6, 0.8, 0.1); m.cruje(C + 1.7, 0.3);                                   // la lupa y el tachón
m.nota(C + 2.6, 72, 0.06, 0.8); m.nota(C + 2.65, 76, 0.05, 0.8);                      // REVISADO ✔
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
