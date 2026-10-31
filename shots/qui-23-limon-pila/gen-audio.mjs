// gen-audio.mjs — cama grave + efectos del Shot Químico #23 (la pila de limón). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Limon base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 23);
const K = m.K;
const G = K.Gancho, Q = K.Que, Z = K.Zinc, Ca = K.Cable, J = K.Jugo, Pr = K.Pregunta, Es = K.Estudio, Vo = K.Voltaje, Da = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.zumbido(G + 0.6, Ci, 0.012, 120);                                                   // zumbido eléctrico suave de fondo
m.whoosh(G, 0.4, 0.12); m.metal(G + 0.4, 0.18, 900);                                  // el clavo entra
m.tic(G + 0.45, 0.25, 2600); m.tic(G + 0.55, 0.25, 2600);                             // caimanes
m.sube(G + 0.6, 0.5, 60, 72, 0.06); m.nota(G + 1.1, 76, 0.07, 0.4);                    // el voltímetro salta a 0.9 V
m.golpe(G + 1.7, 0.25, 90); m.metal(G + 2.2, 0.12, 700);                              // tachado · flecha al clavo
m.whoosh(Q, 0.5, 0.1); m.cruje(Q + 1.0, 0.3); m.nota(Q + 1.8, 62, 0.06, 0.5);          // se pela la capa de zinc · "−"
m.whoosh(Q + 2.3, 0.5, 0.1); m.nota(Q + 3.0, 69, 0.06, 0.5); m.golpe(Q + 3.6, 0.2, 100); // cobre · "+"
for (let i = 0; i < 6; i++) { m.tic(Z + 0.6 + i * 0.55, 0.12, 3000); m.burbuja(Z + 0.9 + i * 0.55, 0.08, 500); } // Zn suelta 2e⁻ y se va
for (let i = 0; i < 12; i++) m.tic(Ca + 0.3 + i * 0.35, 0.07, 2200 + (i % 3) * 300);  // electrones por el cable
m.whoosh(J, 0.8, 0.08); for (let i = 0; i < 6; i++) m.gota(J + 1.0 + i * 0.5, 0.09, 700 + (i % 3) * 80); // corte del limón · iones
m.sube(J + 2.6, 2.4, 55, 67, 0.04);                                                    // aro de luz por el circuito
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05); for (let i = 0; i < 9; i++) m.tic(Pr + i * 0.15 + 0.3, 0.06, 2800);
m.golpe(Es + 0.3, 0.35, 80);                                                           // tarjeta 2001
for (let i = 0; i < 30; i++) m.burbuja(Es + 2.4 + i * 0.12, 0.06, 650 + (i % 5) * 90); // hidrógeno en el cobre
for (let k = 0; k < 2; k++) { m.whoosh(Es + 4.0 + k * 0.01, 0.4, 0.06); }
for (let c = 0; c < 2; c++) { m.tic(Es + 5.5 + c * 2.2, 0.1, 2400); m.burbuja(Es + 5.8 + c * 2.2, 0.12, 420); } // H⁺ + e⁻ → H₂
m.sube(Vo + 1.3, 1.5, 55, 66, 0.06); m.nota(Vo + 2.8, 67, 0.08, 0.6); m.golpe(Vo + 3.0, 0.2, 110); // 0.91 · la raya de 1 V
for (let i = 0; i < 5; i++) m.tic(Da + i * 0.15, 0.12, 1800);                          // 5 limones
m.sube(Da + 1.2, 1.4, 57, 69, 0.05); m.nota(Da + 2.6, 81, 0.06, 0.8);                  // el LED se prende
m.golpe(Da + 3.4, 0.3, 90); m.metal(Da + 3.6, 0.15, 1300); m.golpe(Da + 3.9, 0.35, 70); // tenedor · ✗
m.whoosh(Ci + 0.6, 0.7, 0.1); m.cruje(Ci + 1.2, 0.2);                                  // se saca el clavo
m.whoosh(Ci + 4.0, 0.6, 0.1); m.metal(Ci + 4.6, 0.14, 900); m.nota(Ci + 4.7, 76, 0.06, 0.5); // vuelve a entrar · 0.9 V
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
