// gen-audio.mjs — cama grave + efectos del Shot Ambiental #13 (tortugas y arena). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Tortugas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 13);
const K = m.K;
const G = K.Gancho, N = K.Nido, E = K.Embrion, Te = K.Tercio, Pv = K.Pivote, P = K.Pregunta, Es = K.Estudio, H = K.Hembras, O = K.Oaxaca, S = K.Sombra, C = K.Cierre, Ou = K.Outro;

m.pad(0, Te, 0.05, [45, 52, 57]);                 // playa: tibia
m.pad(Te - 0.3, Pv + 0.3, 0.05, [41, 48, 53]);     // dentro del huevo: más oscura
m.pad(Pv, Ou + 3.5, 0.05, [45, 52, 57]);
m.tic(G + 0.05, 0.3, 2000); m.tic(G + 0.15, 0.25, 2600);                    // clic de cromosomas
for (let i = 0; i < 4; i++) m.tic(G + 1.2 + i * 1.2, 0.12, 1800);           // la X/Y que cambia
m.sube(G + 0.4, 1.6, 57, 64, 0.04);                                          // termómetro
for (let i = 0; i < 6; i++) m.whoosh(N + 0.1 + i * 0.35, 0.25, 0.08);        // arena al cavar
for (let i = 0; i < 10; i++) m.gota(N + 0.3 + i * 0.19, 0.08, 520); // huevos
m.whoosh(N + 2.2, 0.6, 0.12);                                                // tapa el nido
m.whoosh(N + 3.4, 1.0, 0.14);                                                // olas: regresa al mar
m.zumbido(E + 0.2, 1.2, 0.05, 220);                                          // lupa
for (let i = 0; i < 3; i++) m.nota(E + 1.4 + i * 0.4, 64 + i * 3, 0.05, 0.5); // cromosomas iguales
m.nota(Te + 0.8, 76, 0.06, 1.2);                                             // campanita: el tercio de en medio
m.sube(Pv + 2.2, 0.8, 60, 52, 0.05); m.sube(Pv + 4.0, 0.9, 52, 67, 0.05);   // más fresco / más caliente
m.sube(P + 0.05, 2.2, 52, 66, 0.05);                                         // la playa se calienta
m.golpe(Es + 0.2, 0.3, 90); m.tic(Es + 2.6, 0.2, 1600); m.tic(Es + 3.6, 0.2, 1200);
for (let i = 0; i < 100; i += 3) m.tic(H + 0.3 + i * 0.022, 0.06, 2200 + (i % 9) * 60);  // 99 hembras
m.nota(H + 0.3 + 57 * 0.022, 52, 0.07, 0.6);                                 // el único macho
m.golpe(H + 1.2, 0.3, 70);
m.golpe(O + 0.2, 0.25, 90); m.nota(O + 1.0, 69, 0.05, 0.8);
m.whoosh(O + 3.2, 0.7, 0.12); m.golpe(O + 4.8, 0.25, 70);
m.whoosh(S + 0.3, 1.5, 0.1);                                                 // se tiende la malla
for (let i = 0; i < 10; i++) m.gota(S + 2.4 + i * 0.2, 0.06, 1000 + (i % 3) * 140); // riego
for (let i = 0; i < 12; i++) for (let k = 0; k < 4; k++) m.tic(C + 0.6 + i * 0.22 + k * 0.6, 0.03, 2600);  // pasitos de crías
m.whoosh(C + 3.0, 1.2, 0.1);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
