// gen-audio.mjs — cama grave + efectos del Shot IA #14 (¿cuál de estas caras es real?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot CarasFalsas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 14);
const K = m.K;
const G = K.Gancho, E = K.Estudio, V = K.Volado, En = K.Entreno, P = K.Pregunta, Co = K.Confianza, Pm = K.Promedio, S = K.Seguros, Cs = K.Consejo, C = K.Cierre, Ou = K.Outro;
const S2 = S + 7.4;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
m.whoosh(G, 0.5, 0.14); m.golpe(G + 0.5, 0.35, 70);                                 // entran las dos caras
for (let t = G + 0.6; t < E - 0.3; t += 0.5) m.tic(t, 0.06, 1500);                  // tic-tac del reto
m.burbuja(G + 2.0, 0.14, 700);                                                      // "la IA ya inventa caras"
m.golpe(E + 0.2, 0.35, 80);                                                         // tarjeta del estudio
for (let i = 0; i < 11; i++) m.tic(E + 3.6 + i * 0.45, 0.12, 1700 + (i % 3) * 200); // caras que pasan (clic)
m.nota(E + 3.6, 64, 0.04, 0.3); m.nota(E + 4.2, 67, 0.04, 0.3);                     // chips
m.sube(V + 0.2, 1.0, 50, 71, 0.04);                                                 // 48 %
for (let i = 0; i < 4; i++) m.metal(V + 1.9 + i * 0.7, 0.08, 1200);                 // moneda del volado
m.whoosh(En, 0.5, 0.12); m.zumbido(En + 0.4, 1.8, 0.02, 260);                       // lupa del pizarrón
for (let k = 0; k < 3; k++) m.nota(En + 0.6 + k * 0.4, 72 + k * 2, 0.04, 0.3);      // palomitas
m.sube(En + 2.9, 1.1, 50, 70, 0.04); m.sube(En + 3.7, 1.1, 50, 73, 0.04);           // barras 48 → 59
m.sube(P + 0.05, 1.4, 50, 62, 0.05);                                                // "?"
for (let i = 0; i < 7; i++) m.nota(Co + 0.3 + i * 0.1, 76 + (i % 3) * 3, 0.035, 0.4); // estrellitas
m.sube(Co + 1.7, 1.0, 50, 66, 0.04); m.sube(Co + 1.75, 1.0, 50, 68, 0.035);         // barras de confianza
m.zumbido(Pm + 0.4, 4.4, 0.025, 180); m.sube(Pm + 0.6, 2.4, 45, 57, 0.035);         // las caras se funden
m.nota(Pm + 2.4, 69, 0.05, 0.9); m.nota(Pm + 2.45, 73, 0.04, 0.9);                  // aparece la cara promedio
m.golpe(S + 0.2, 0.35, 80);                                                         // tarjeta 2023
m.sube(S + 3.6, 1.1, 50, 72, 0.04); m.sube(S + 4.7, 1.1, 50, 67, 0.04);             // barras 65.9 / 51.1
m.whoosh(S2 - 0.3, 0.5, 0.12); m.sube(S2, 0.9, 50, 74, 0.04); m.sube(S2 + 0.4, 0.9, 50, 63, 0.04); // figuritas
m.whoosh(Cs, 0.5, 0.12); m.cruje(Cs + 1.3, 0.3);                                   // se tacha el mito
m.zumbido(Cs + 1.6, 2.4, 0.02, 320); m.nota(Cs + 2.2, 67, 0.04, 0.3); m.nota(Cs + 2.9, 69, 0.04, 0.3);
m.whoosh(C + 1.0, 1.2, 0.16);                                                       // el lápiz pasa
m.golpe(C + 1.8, 0.4, 70); m.nota(C + 2.0, 72, 0.06, 0.8); m.nota(C + 2.05, 76, 0.05, 0.8); // sello "DIBUJO"
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
