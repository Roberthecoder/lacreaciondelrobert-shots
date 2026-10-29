// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #58 (Flavr Savr). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot FlavrSavr base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 58);
const K = m.K;
const G = K.Gancho, Ca = K.Calgene, Cm = K.Camion, V = K.Verde, Pe = K.Pectina, En = K.Enzima, Ar = K.AlReves, Ap = K.Apaga,
  Ma = K.Mata, F = K.FDA, Pr = K.Pregunta, Es = K.Estudio, Fr = K.Fracaso, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [43, 50, 55]);
m.whoosh(G + 0.0, 0.45, 0.12);                                          // entra la mazorca
m.metal(G + 1.4, 0.12, 500); m.golpe(G + 1.45, 0.25, 70);               // tache
m.whoosh(G + 1.9, 0.5, 0.08);                                           // se va
m.golpe(G + 2.55, 0.35, 75);                                            // cae el jitomate en la caja
m.golpe(Ca + 0.4, 0.3, 110); m.tic(Ca + 0.42, 0.2, 1200);               // se clava el letrero
m.tic(Ca + 1.4, 0.15, 2200);                                            // alfiler en Davis
m.motor(Cm, 3.9, 0.06);                                                 // camión
for (let i = 0; i < 6; i++) m.golpe(Cm + 0.4 + i * 0.45, 0.12, 60);     // botes
for (let i = 0; i < 5; i++) m.gota(Cm + 1.3 + i * 0.35, 0.14, 380);     // splat de cada jitomate
m.zumbido(V + 0.8, 3.2, 0.03, 160);                                     // siseo del etileno
for (let i = 0; i < 5; i++) m.nota(V + 1.4 + i * 0.25 + 1.3, 64 + i * 2, 0.04, 0.5); // cada jitomate se pone rojo
m.whoosh(Pe + 0.2, 0.6, 0.12);                                          // se abre la Lupa
for (let i = 0; i < 14; i++) m.tic(En + 0.6 + i * 0.23, 0.1, 1500 + (i % 3) * 300); // las tijeras cortan
m.whoosh(Ar + 0.6, 1.2, 0.07); m.sube(Ar + 0.6, 1.4, 55, 67, 0.04);     // el gen gira al revés
m.metal(Ap + 1.1, 0.12, 900);                                           // el ARN se cierra
m.golpe(Ap + 1.7, 0.2, 140); m.tic(Ap + 1.72, 0.18, 900);               // el ribosoma rebota
m.sube(Ap + 1.4, 1.2, 67, 55, 0.035);                                   // la enzima baja
for (let i = 0; i < 3; i++) m.nota(Ma + 0.4 + i * 0.25 + 1.3, 69 + i * 3, 0.05, 0.7); // maduran en la mata
m.golpe(F + 0.3, 0.4, 80);                                              // sello de la FDA
m.tic(F + 2.6, 0.2, 1800); m.golpe(F + 2.65, 0.2, 100);                 // letrero en el anaquel
m.sube(Pr, 1.5, 52, 64, 0.05);                                          // re-gancho
m.golpe(Es + 1.6, 0.3, 80);                                             // tarjeta 1997
m.motor(Es + 4.2, 1.0, 0.05); m.cruje(Es + 5.0, 0.5);                   // las prensas aprietan
m.nota(Es + 5.6, 57, 0.05, 0.6); m.nota(Es + 5.9, 59, 0.05, 0.8);        // apenas un poco más
m.gota(Fr + 0.5, 0.2, 350);                                             // machucado
m.tic(Fr + 1.9, 0.15, 900);                                             // una sola fruta
m.whoosh(Fr + 3.7, 0.9, 0.09); m.golpe(Fr + 4.5, 0.25, 70);             // se cae el letrero
m.whoosh(Ci + 0.4, 0.8, 0.08); m.golpe(Ci + 1.2, 0.2, 70);              // el letrero del inicio se cae
m.zumbido(Ci + 0.9, 3.4, 0.03, 160);                                    // etileno otra vez
for (let i = 0; i < 5; i++) m.nota(Ci + 2.7 + i * 0.25, 64 + i * 2, 0.04, 0.5);
m.nota(Ou + 0.3, 55, 0.08, 2.8); m.nota(Ou + 0.3, 62, 0.06, 2.8); m.nota(Ou + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
