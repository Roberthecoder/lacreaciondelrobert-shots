// gen-audio.mjs — cama grave + efectos del Shot IA #41 (la imagen hecha con IA que ganó un concurso de arte). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot ConcursoArte base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, R = K.Respuesta, H = K.Horas, J = K.Jueces, P = K.Pregunta, O = K.Oficina, D = K.Demanda, F = K.Foto, Rg = K.Regla, C = K.Cierre, Ou = K.Outro;
const O2 = O + (D - O) * 0.41;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let i = 0; i < 3; i++) m.whoosh(G + 0.05 + i * 0.18, 0.35, 0.1);                 // entran los 3 cuadros
for (let i = 0; i < 3; i++) m.tic(G + 2.2 + i * 0.95, 0.25, 1800);                     // cuenta 3-2-1
m.whoosh(R + 0.1, 0.7, 0.12); m.nota(R + 0.85, 72, 0.07, 0.8); m.nota(R + 0.9, 79, 0.05, 0.8);   // revelación + listón
m.golpe(R + 1.2, 0.2, 90);
for (let i = 0; i < 30; i++) m.tic(H + 0.4 + i * 0.14, 0.06, 2200 + (i % 4) * 150);   // miniaturas
m.sube(H + 1.6, 2.4, 52, 70, 0.035);                                                  // 900+
m.burbuja(J + 0.4, 0.15, 450); m.burbuja(J + 2.7, 0.15, 600); m.nota(J + 2.9, 72, 0.05, 0.5);
m.sube(P + 0.05, 1.6, 50, 62, 0.05);
m.golpe(O + 0.2, 0.3, 80); m.whoosh(O + 3.1, 0.25, 0.12); m.golpe(O + 3.6, 0.6, 58);  // tarjeta + sello
m.zumbido(O2, D - O2, 0.02, 170);
for (let i = 0; i < 24; i++) m.tic(O2 + 0.3 + i * 0.1, 0.05, 1500 + (i % 6) * 110);  // tecleo de instrucciones (624)
m.sube(O2 + 0.3, 2.4, 50, 68, 0.03); m.burbuja(O2 + 3.0, 0.15, 380);                  // sale la imagen base
m.whoosh(D + 0.3, 0.6, 0.12); m.whoosh(D + 2.3, 0.4, 0.1); m.golpe(D + 2.85, 0.6, 70);  // capas + mazo
m.tic(F + 0.3, 0.3, 3200); m.tic(F + 0.36, 0.2, 2600);                                // obturador
m.whoosh(F + 4.2, 1.2, 0.08); m.golpe(F + 3.8, 0.25, 90);                             // empuja el trofeo / cita
m.nota(Rg + 1.0, 67, 0.05, 1.2); m.nota(Rg + 1.05, 72, 0.04, 1.2);                    // ✔
m.golpe(Rg + 3.8, 0.25, 75);                                                          // ✘
m.whoosh(C, 0.6, 0.1);
for (let i = 0; i < 3; i++) m.sube(C + 1.6 + i * 0.5, 0.8, 55, 67, 0.03);            // medidores
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
