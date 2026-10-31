// gen-audio.mjs — cama grave + efectos del Shot Ambiental #51 (río Santiago). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Rio Santiago base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 51);
const K = m.K;
const G = K.Gancho, O = K.Origen, Co = K.Corredor, Ca = K.Cascada, B = K.Burbujas, P = K.Pregunta, E = K.Estudio, M = K.Microbios, S = K.Salud, Pl = K.Planta, C = K.Cierre, Ou = K.Outro;
const S2 = S + 5.4;

m.pad(0, Pl + 1.5, 0.05, [43, 50, 55], 0.6);                                             // cama tapada mientras dura el problema
m.pad(Pl + 1.5, Ou + 3.5, 0.05, [45, 52, 57], 0.2);                                       // se abre un poco con la planta
for (let i = 0; i < 8; i++) m.burbuja(G + 0.1 + i * 0.22, 0.05, 900 + (i % 3) * 120);   // copos que caen
m.whoosh(G + 0.2, 2.0, 0.12);                                                            // la cámara se aleja y aparece la cascada
m.motor(G + 1.2, 2.4, 0.05);                                                             // rugido de la caída
m.sube(O + 0.3, 2.9, 52, 64, 0.04);                                                      // el río se dibuja hasta el mar
m.nota(O + 1.6, 64, 0.06, 0.8);
for (let i = 0; i < 6; i++) m.tic(Co + 0.1 + i * 0.08, 0.05, 1500);                       // casitas
for (let i = 0; i < 4; i++) m.golpe(Co + 1.2 + i * 0.1, 0.12, 70);                         // naves
for (let i = 0; i < 10; i++) m.gota(Co + 0.6 + i * 0.35, 0.06, 500 + (i % 2) * 80);        // tubos que gotean
m.motor(Ca + 0.1, 4.8, 0.08);                                                            // la cascada
m.whoosh(Ca + 2.2, 1.2, 0.14);                                                           // lavadora
for (let i = 0; i < 8; i++) m.burbuja(Ca + 2.4 + i * 0.2, 0.06, 420 + i * 20);            // espuma que crece
m.sube(B + 0.1, 0.8, 60, 72, 0.04);                                                      // bajada al micro
for (let i = 0; i < 12; i++) m.burbuja(B + 0.6 + i * 0.17, 0.05, 600 + (i % 4) * 60);      // moléculas de detergente
m.sube(P + 0.05, 1.3, 52, 64, 0.05);
m.golpe(E + 0.2, 0.25, 100);                                                             // tarjeta del estudio
for (let i = 0; i < 11; i++) m.tic(E + 0.8 + i * 0.32, 0.06, 1800);                       // un tic por cada centena del contador
m.golpe(M + 0.3, 0.35, 55); m.golpe(M + 0.8, 0.35, 50);                                  // arsénico y plomo pasan la raya
m.zumbido(M + 2.7, 2.6, 0.04, 220);                                                      // microbios
m.golpe(S + 0.4, 0.25, 70);
for (let i = 0; i < 9; i++) m.tic(S + 1.2 + i * 0.08, 0.04, 1400);                        // casas dentro de la franja de 5 km
m.latido(S2 + 0.3); m.latido(S2 + 1.1); m.nota(S2 + 1.0, 62, 0.05, 1.0, 0.5);            // el riñón y el "¿?"
m.motor(Pl + 0.2, 3.0, 0.04); m.sube(Pl + 1.2, 1.8, 50, 62, 0.05);                        // la planta y su capacidad
for (let i = 0; i < 6; i++) m.gota(Pl + 1.0 + i * 0.25, 0.06, 900);
m.motor(C + 0.1, 3.8, 0.06);
for (let i = 0; i < 6; i++) m.burbuja(C + 0.3 + i * 0.4, 0.05, 950);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
