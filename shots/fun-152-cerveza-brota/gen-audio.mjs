// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #152 (cerveza que brota). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave continua, sin golpe, debajo de la voz. Armonía que avanza (la menor → fa → do → mi) y se va "llenando de
// presión" (5–8: se cierra el filtro y sube un pedal) hasta que se abre al destapar; al final se abre en mayor con el agua mineral.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cerveza base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 152);
const K = m.K;
const G = K.Gancho, Ca = K.Campo, M = K.Malta, Pr = K.Proteina, DC = K.DosCaras, Bo = K.Botella, P = K.Pregunta, Bl = K.Blindaje,
  A = K.Abrir, E = K.Estudio, D = K.Dosis, PQ = K.ParaQue, Ag = K.Agua, C = K.Cierre, Ou = K.Outro;

// cama: cada tramo con su acorde (nunca el mismo más de ~8 s)
m.pad(0, Ca, 0.05, [45, 52, 57], 0.1);            // la menor
m.pad(Ca, M, 0.05, [41, 48, 57], 0.1);            // fa
m.pad(M, Pr, 0.05, [48, 55, 60], 0.1);            // do
m.pad(Pr, Bo, 0.045, [45, 52, 60], 0.2);          // la menor (micro, más oscuro)
m.pad(Bo, A + 0.5, 0.05, [40, 47, 56], 0.45);     // mi con séptima: se va tapando (presión)
m.sube(Bo, A + 0.5 - Bo, 40, 47, 0.025);          // pedal que sube con la presión
m.pad(A + 0.5, E, 0.05, [45, 52, 57], 0);         // se abre al destapar
m.pad(E, D, 0.05, [41, 48, 53], 0.1);             // fa (laboratorio)
m.pad(D, PQ, 0.05, [43, 50, 55], 0.05);           // sol
m.pad(PQ, Ag, 0.05, [48, 52, 55], 0);             // do mayor: la hifa sale al aire
m.pad(Ag, Ou + 3.5, 0.05, [45, 52, 57, 61], 0);   // la mayor (se abre)

// efectos en el mismo cuadro
m.metal(G + 0.2, 0.22, 900); m.whoosh(G + 0.3, 0.9, 0.18);                      // corcholata y chorro
for (let i = 0; i < 10; i++) m.burbuja(G + 0.4 + i * 0.08, 0.06, 500 + i * 40);
m.golpe(G + 2.2, 0.25, 70);                                                       // tachón «¿agitada?»
m.nota(G + 2.6, 69, 0.05, 0.8);                                                   // «proteínas de un hongo»
for (let i = 0; i < 24; i++) m.gota(Ca + i * 0.18, 0.04, 1400 + (i % 5) * 120);   // lluvia
for (let i = 0; i < 3; i++) m.nota(Ca + 1.2 + i * 0.25, 64 - i * 2, 0.04, 0.6);  // manchas del moho
m.cruje(M + 0.2, 0.25); m.sube(M, 1.4, 48, 55, 0.03);                             // el grano germina
for (let i = 0; i < 8; i++) m.tic(M + 2.2 + i * 0.12, 0.07, 2000 + i * 120);      // salen las hidrofobinas
m.sube(Pr + 0.4, 1.6, 57, 64, 0.03);                                              // la cadena se pliega
for (let i = 0; i < 4; i++) { m.tic(Pr + 2.2 + i * 0.4, 0.2, 3200); m.nota(Pr + 2.2 + i * 0.4, 72 + i * 2, 0.04, 0.4); } // 4 puentes S–S
for (let i = 0; i < 3; i++) m.gota(DC + 0.6 + i * 0.25, 0.14, 900);              // gotas que se pegan
m.whoosh(DC + 1.3, 0.9, 0.06);                                                    // gotas que resbalan
for (let i = 0; i < 14; i++) m.tic(Bo + 0.1 + i * 0.13, 0.05, 1500);              // hidrofobinas por la cadena
m.sube(P + 0.1, 1.3, 52, 64, 0.05);                                               // re-gancho
m.sube(Bl + 0.5, 2.1, 64, 50, 0.04);                                              // la burbuja sola se encoge
m.nota(Bl + 2.4, 69, 0.05, 1.4);                                                  // la blindada se queda
m.golpe(A + 0.4, 0.3, 60); m.whoosh(A + 0.4, 0.6, 0.12);                          // cae la presión
for (let i = 0; i < 26; i++) m.burbuja(A + 1.2 + i * 0.03, 0.05, 400 + (i % 7) * 90); // nacen muchas burbujas
m.metal(A + 2.0, 0.18, 900); m.whoosh(A + 2.0, 1.0, 0.2);                         // chorro
m.golpe(E + 0.2, 0.3, 80);                                                        // tarjeta 2012
for (let i = 0; i < 3; i++) m.gota(E + 2.2 + i * 0.6, 0.16, 800);                 // gotero
for (let i = 0; i < 16; i++) m.tic(D + 0.1 + i * 0.05, 0.05, 900 + (i % 2) * 300); // agitación
m.metal(D + 1.4, 0.18, 950); m.whoosh(D + 1.6, 0.8, 0.12);                        // brota la del +1 µg
for (let i = 0; i < 6; i++) m.tic(D + 1.8 + i * 0.2, 0.06, 2600);                 // báscula
m.sube(PQ + 1.0, 1.6, 55, 48, 0.035);                                             // baja la tensión superficial
m.nota(PQ + 2.6, 72, 0.05, 1.0); m.nota(PQ + 2.8, 76, 0.04, 1.0);                 // la hifa sale al aire
m.gota(PQ + 4.6, 0.16, 1000);                                                     // la gota no moja la espora
m.metal(Ag + 0.2, 0.15, 1100); m.whoosh(Ag + 0.4, 0.8, 0.12);                     // agua mineral
m.whoosh(C + 0.6, 0.6, 0.06); m.nota(C + 1.6, 69, 0.04, 1.2);                     // lupa y línea al grano
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 61, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
