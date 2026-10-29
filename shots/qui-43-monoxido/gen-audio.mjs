// gen-audio.mjs — cama grave + efectos del Shot Químico #43 (monóxido de carbono). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Monoxido base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 43);
const K = m.K;
const G = K.Gancho, Q = K.Que, F = K.Fuentes, Pu = K.Pulmon, H = K.Hemoglobina, D = K.Desplaza, Pr = K.Pregunta, S = K.Sintomas, E = K.Estudio, L = K.Lento, A = K.Aviso, C = K.Cierre, Ou = K.Outro;
const avisoB = A + 3.4;

// cama: tapada mientras el CO llena el cuarto y la sangre; se abre al salir al aire libre
m.pad(0, avisoB, 0.05, [45, 52, 57], 0.55);
m.pad(avisoB, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
for (let i = 0; i < 18; i++) m.tic(G + 0.05 + i * 0.27, 0.06, 1500 + (i % 4) * 300);   // chisporroteo del carbón
m.whoosh(G + 0.2, 3.6, 0.05);                                                          // la nube que se extiende
m.golpe(G + 2.6, 0.25, 90); m.golpe(G + 3.3, 0.25, 80);                                 // no huele · no se ve
m.nota(Q + 0.4, 64, 0.06, 0.6); m.nota(Q + 1.0, 69, 0.06, 0.8);                         // C + O₂ → CO₂
m.nota(Q + 2.5, 57, 0.07, 0.6, 0.6); m.nota(Q + 3.1, 52, 0.08, 1.0, 0.6);               // 2C + O₂ → 2CO (más grave, tapada)
for (let i = 0; i < 10; i++) m.tic(F + 0.05 + i * 0.28, 0.05, 1600);                    // carbón
m.zumbido(F + 0.6, 2.4, 0.05, 140);                                                    // siseo del boiler
m.whoosh(Pu + 0.1, 1.4, 0.12);                                                         // respiras
for (let i = 0; i < 6; i++) m.burbuja(Pu + 1.2 + i * 0.3, 0.06, 450);                   // CO que cruza a la sangre
for (let i = 0; i < 4; i++) m.burbuja(H + 0.3 + i * 0.2, 0.06, 700);                    // oxígeno que se sienta
m.metal(H + 2.3, 0.14, 600);                                                           // clic: el CO se queda pegado
m.golpe(H + 3.0, 0.3, 75);                                                             // ×200
for (let i = 1; i <= 3; i++) m.metal(D + i * 0.25 + (i - 1) * 0.9, 0.12, 600 - i * 40); // más asientos con CO (mismo cuadro que el jsx)
m.sube(D + 0.3, 3.0, 64, 52, 0.04);                                                    // el oxígeno que llega baja
m.sube(Pr + 0.1, 1.4, 52, 64, 0.05);
m.golpe(S + 0.1, 0.25, 70); m.nota(S + 0.8, 62, 0.05, 0.9, 0.5); m.burbuja(S + 1.5, 0.06, 300);
m.pad(S + 3.4, E, 0.02, [52, 57], 0.8);                                                // dormido: casi silencio
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 37; i++) m.tic(E + 3.4 + i * 0.015, 0.04, 2200);                    // 37 personas
for (let i = 0; i < 7; i++) m.nota(E + 4.0 + i * 0.25, 57 + (i % 3) * 2, 0.05, 0.4);    // 7 en rojo
m.golpe(E + 7.2, 0.25, 90);                                                            // tachado
for (let i = 0; i < 12; i++) m.tic(L + 0.4 + i * 0.25, 0.07, 1200);                     // reloj
for (let i = 0; i < 3; i++) m.golpe(A + 0.2 + i * 0.3, 0.12, 110);                      // dolores de cabeza
for (let i = 0; i < 8; i++) m.nota(A + 1.7 + i * 0.22, i % 2 ? 93 : 88, 0.05, 0.12);    // pip pip del detector
m.whoosh(avisoB, 1.2, 0.12);                                                           // salen afuera
m.whoosh(C + 0.2, 1.4, 0.1);                                                           // la ventana se abre
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
