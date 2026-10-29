// gen-audio.mjs — cama grave + efectos del Shot IA #18 (la IA que lee tu retina). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Retina base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 18);
const K = m.K;
const G = K.Gancho, F = K.Foto, E = K.Estudio, Ed = K.Edad, S = K.Sexo, Pr = K.Presion, P = K.Pregunta, M = K.Mapa, O = K.Ojo, U = K.UsoReal, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G + 0.25, 0.25, 0.10);                                                  // parpadeo
m.whoosh(G + 1.2, 2.0, 0.16); m.sube(G + 1.4, 2.0, 48, 64, 0.04);                 // entramos por la pupila
m.nota(G + 3.4, 69, 0.06, 0.9);                                                   // aparece la retina
m.tic(G + 4.0, 0.2, 1500); m.tic(G + 4.3, 0.2, 1700);                             // ¿hombre? ¿mujer?
m.zumbido(F + 0.3, 1.4, 0.04, 260);                                               // haz de la cámara
m.whoosh(F + 2.6, 0.5, 0.12); m.nota(F + 3.3, 64, 0.05, 0.5); m.nota(F + 4.0, 67, 0.05, 0.5); m.nota(F + 4.6, 69, 0.05, 0.5);
m.golpe(E + 0.2, 0.35, 80);                                                       // tarjeta 2018
for (let i = 0; i < 26; i++) m.tic(E + 1.2 + i * 0.085, 0.05, 2000 + (i % 5) * 140); // contador de pacientes
for (let i = 0; i < 12; i++) m.burbuja(E + 1.6 + i * 0.25 + 1.3, 0.06, 600 + i * 30); // retinas que entran a la red
m.sube(Ed + 0.4, 0.5, 55, 62, 0.04); m.golpe(Ed + 1.0, 0.3, 90);                  // ± 3 años
for (let i = 0; i < 100; i++) { const t = S + 1.4 + i * 0.022; if ([23, 58, 86].includes(i)) m.tic(t, 0.12, 700); else if (i % 3 === 0) m.tic(t, 0.05, 2600); }
m.nota(S + 3.8, 72, 0.06, 0.6); m.nota(S + 3.85, 76, 0.05, 0.6);                   // 97 de 100
m.sube(Pr + 0.4, 1.2, 50, 58, 0.04);                                              // aguja del baumanómetro
m.burbuja(Pr + 1.0, 0.1, 300);                                                    // el cigarro
m.sube(P + 0.05, 1.4, 50, 62, 0.05);                                              // pregunta
m.zumbido(M + 0.9, 2.6, 0.04, 180); m.zumbido(M + 3.7, 2.6, 0.04, 220);           // se enciende el mapa (vasos, disco)
m.golpe(O + 1.0, 0.25, 70); m.golpe(O + 1.6, 0.45, 60);                           // tachón y sello "faltan pruebas"
m.metal(U + 0.6, 0.08, 1200); m.tic(U + 1.4, 0.15, 1800); m.tic(U + 2.2, 0.15, 1800); // monitor y respuestas
m.golpe(U + 3.0, 0.5, 60);                                                        // sello FDA
m.whoosh(C + 0.5, 0.25, 0.1); m.sube(C + 0.8, 0.8, 57, 69, 0.04);                 // parpadeo y brillo
m.nota(C + 1.6, 69, 0.05, 0.5); m.nota(C + 2.0, 72, 0.05, 0.5); m.nota(C + 2.4, 76, 0.05, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
