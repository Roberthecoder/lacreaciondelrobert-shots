// gen-audio.mjs — cama grave + efectos del Shot Químico #11 (el olor del gas: mercaptanos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 111);
const K = m.K;
const G = K.Gancho, Q = K.Que, A = K.Aviso, N = K.Nariz, P = K.Piso, Pr = K.Pregunta, Es = K.Estudio, L = K.Ley, J = K.Japon, A2 = K.Aviso2, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Pr, 0.05, [45, 52, 57]);
m.pad(Pr, L, 0.05, [44, 51, 56], 0.5);                                                // tensa: sin olor y New London
m.pad(L, Ou + 3.5, 0.05, [45, 52, 57]);
m.tic(G + 0.05, 0.25, 1800); m.whoosh(G + 0.2, 1.4, 0.08);                            // clic de la perilla y siseo del gas
for (let i = 0; i < 4; i++) m.metal(G + 1.9 + i * 0.18, 0.08, 1300);                  // timbre de alarma
m.zumbido(Q + 0.2, 2.0, 0.03, 140);                                                    // moléculas dentro del cilindro
m.nota(Q + 2.6, 60, 0.05, 0.6);                                                        // "casi nada"
m.gota(A + 0.9, 0.25, 900); m.nota(A + 1.1, 71, 0.07, 0.9);                           // la gota de mercaptano
m.burbuja(N + 1.6, 0.12, 900); m.sube(N + 1.9, 1.0, 64, 76, 0.05);                    // la neurona se enciende y manda la señal
m.whoosh(P + 0.3, 3.8, 0.05);                                                          // el gas se derrama al piso
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
m.golpe(Es + 0.2, 0.35, 80);
m.whoosh(Es + 3.6, 2.0, 0.05);                                                         // fuga bajo el edificio
m.zumbido(Es + 5.6, 1.1, 0.06, 240);                                                   // lijadora
m.golpe(Es + 6.75, 0.5, 60);                                                           // estallido, amortiguado
m.pad(Es + 7.0, L, 0.02, [45, 52], 0.8);                                               // silencio
m.metal(L + 1.25, 0.12, 500); m.whoosh(L + 1.8, 0.8, 0.06);                           // sello y olor
m.golpe(J + 0.2, 0.3, 80);
m.tic(J + 3.2, 0.15, 1200); m.tic(J + 3.8, 0.15, 2200);
m.sube(J + 4.4, 1.2, 52, 72, 0.05);
for (let i = 0; i < 3; i++) m.tic(A2 + 0.3 + i * 1.2, 0.2, 1500 + i * 300);            // tres pasos
m.metal(A2 + 0.9, 0.08, 700);
for (let i = 0; i < 4; i++) m.metal(Ci + 0.5 + i * 0.18, 0.05, 1300);                 // la alarma de nuevo, suave
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
