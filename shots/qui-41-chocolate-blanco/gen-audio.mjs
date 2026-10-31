// gen-audio.mjs — cama grave + efectos del Shot Químico #41 (bloom del chocolate). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Chocolate base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 41);
const K = m.K;
const G = K.Gancho, Q = K.Que, M = K.Manteca, F = K.FormaV, Ca = K.Calor, P = K.Pregunta, Az = K.Azucar, Es = K.Estudio, La = K.Laser, Co = K.Comer, Ci = K.Cierre, Ou = K.Outro;
const mCr = M + 2.6, fCrack = F + 2.2, fTemp = F + 4.0, azMicro = Az + 2.3, esRay = Es + 3.0;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.cruje(G + 0.05, 0.5);                                                    // envoltura de aluminio
m.golpe(G + 1.7, 0.25, 90);                                                 // se tacha "¿moho?"
m.whoosh(G + 2.6, 0.5, 0.1);                                                // entra la lupa
m.golpe(Q + 0.05, 0.35, 70); m.nota(Q + 1.3, 60, 0.06, 0.5); m.nota(Q + 1.9, 67, 0.06, 0.5); // BLOOM · grasa · azúcar
m.sube(M + 0.4, 1.2, 48, 60, 0.05);                                         // se llena el 30 %
for (let i = 0; i < 6; i++) m.nota(mCr + 0.2 + i * 0.35, 60 + i * 2, 0.06, 0.5); // cada cristal I–VI
m.nota(F, 79, 0.07, 1.2);                                                   // brilla la forma V
m.cruje(fCrack + 0.6, 0.9); m.golpe(fCrack + 0.6, 0.3, 120);                // ¡crack!
m.sube(fTemp + 0.2, 0.7, 50, 62, 0.05); m.sube(fTemp + 0.9, 0.7, 62, 54, 0.05); m.sube(fTemp + 1.6, 0.6, 54, 57, 0.05); // templado
for (let i = 0; i < 5; i++) m.tic(Ca - 1.4 + i * 0.12, 0.08, 2000);       // cristales V en fila
m.zumbido(Ca, 2.2, 0.04, 120);                                              // calor
for (let i = 0; i < 5; i++) m.burbuja(Ca + 0.8 + i * 0.25, 0.1, 400);      // manteca que sube
for (let i = 0; i < 14; i++) m.tic(Ca + 2.4 + i * 0.1, 0.05, 2600);        // agujas blancas
m.metal(P + 0.2, 0.12, 500); m.whoosh(P + 0.2, 0.8, 0.08);                 // se abre el refri
for (let i = 0; i < 10; i++) m.gota(Az + 0.5 + i * 0.15, 0.1, 1100);       // condensación
for (let i = 0; i < 5; i++) m.burbuja(azMicro + 0.3 + i * 0.25, 0.08, 700);// se disuelve el azúcar
m.sube(azMicro + 1.7, 1.6, 64, 72, 0.03);                                   // se evapora
for (let i = 0; i < 8; i++) m.tic(Es - 1.5 + i * 0.1, 0.06, 3000);         // polvito
m.golpe(Es + 0.2, 0.35, 80);                                                // tarjeta 1966
m.zumbido(esRay, 0.8, 0.05, 300);                                           // haz de rayos X
for (let i = 0; i < 6; i++) m.nota(esRay + 0.6 + i * 0.3, 55 + i * 2, 0.05, 0.4);
m.golpe(La - 2.2, 0.3, 90);                                                 // "nunca sin forma VI"
m.golpe(La + 0.2, 0.35, 80);                                                // tarjeta 2020
m.zumbido(La + 2.2, 2.4, 0.04, 900);                                        // láser
m.nota(Co + 1.2, 72, 0.07, 0.8); m.nota(Co + 1.2, 76, 0.05, 0.8);           // palomita
m.burbuja(Co + 2.6, 0.08, 500); m.metal(Co + 3.6, 0.08, 900);               // lengua · escudo
m.nota(Ci + 2.4, 64, 0.05, 0.6);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
