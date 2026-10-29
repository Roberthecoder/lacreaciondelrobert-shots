// gen-audio.mjs — cama grave + efectos del Shot Ambiental #57 (cenotes y acuífero de Yucatán). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cenotes base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 57);
const K = m.K;
const G = K.Gancho, S = K.SinRios, A = K.Acido, Cu = K.Cueva, Ca = K.Capas, U = K.Unica, P = K.Pregunta, F = K.Fosas, E = K.Estudio, Pl = K.Planta, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                                // cama grave: agua profunda
m.gota(G + 0.75, 0.25, 600); m.nota(G + 0.8, 64, 0.05, 1.2);                            // la hoja toca el agua y las ondas
m.whoosh(G + 2.3, 0.8, 0.12); m.sube(G + 2.6, 1.2, 52, 59, 0.04);                       // se abre la ventana al río de abajo
m.sube(S + 0.4, 0.5, 64, 69, 0.04); m.golpe(S + 1.35, 0.3, 140);                       // el río que aparece y se tacha
for (let i = 0; i < 14; i++) m.gota(S + 3.0 + i * 0.18, 0.08, 900 + (i % 4) * 110);    // lluvia que se mete en la piedra
for (let i = 0; i < 3; i++) m.burbuja(A + 0.9 + i * 0.45, 0.07, 420 + i * 60);          // entra el CO2 a la gota
m.gota(A + 2.8, 0.25, 500); for (let i = 0; i < 8; i++) m.burbuja(A + 2.9 + i * 0.16, 0.05, 700); // la caliza se disuelve
m.sube(Cu + 0.2, 1.8, 45, 52, 0.04); m.cruje(Cu + 2.4, 0.5); m.golpe(Cu + 3.3, 0.45, 60);        // la cueva crece y el techo cae
m.nota(Ca + 0.4, 69, 0.05, 1.0); m.sube(Ca + 0.4, 1.0, 52, 40, 0.05); m.whoosh(Ca + 1.4, 0.6, 0.1); // agua dulce / salada / entra el mar
m.motor(U + 0.2, 0.7, 0.05); for (let i = 0; i < 6; i++) m.gota(U + 0.9 + i * 0.4, 0.09, 1100); // la bomba y la llave
m.sube(P + 0.05, 1.3, 52, 64, 0.05);                                                    // re-gancho
for (let i = 0; i < 18; i++) m.gota(F + 0.4 + i * 0.35, 0.06, 380);                    // goteo de la fosa
m.bajo(F + 2.5, 40, 0.1, 0.4); m.tic(F + 2.6, 0.08, 500); m.tic(F + 2.75, 0.08, 450);  // la granja (gruñido corto)
for (let i = 0; i < 16; i++) m.gota(F + 4.5 + i * 0.16, 0.06, 950 + (i % 3) * 120);   // lluvia
for (let i = 0; i < 6; i++) m.tic(F + 4.8 + i * 0.4, 0.06, 1800);                       // tic-tac: horas o días
m.golpe(E + 0.25, 0.25, 110);                                                           // tarjeta del estudio
for (let i = 0; i < 10; i++) m.tic(E + 0.4 + i * 0.12, 0.05, 1500 + i * 40);           // aparecen los 10 cenotes
for (let i = 0; i < 10; i++) i === 7 ? m.nota(E + 5.0, 76, 0.05, 0.6) : m.burbuja(E + 4.2 + i * 0.1, 0.08, 300);  // 9 con bacterias, 1 limpio
m.nota(Pl + 0.3, 67, 0.05, 0.8); m.nota(Pl + 0.5, 72, 0.05, 0.8);                       // lo bueno
for (let i = 0; i < 10; i++) m.gota(Pl + 0.4 + i * 0.5, 0.05, 380);                     // fosas de la playa
m.metal(Pl + 2.3, 0.12, 700);                                                            // aparece el pozo
m.golpe(Pl + 5.5, 0.3, 120); m.whoosh(Pl + 5.4, 0.8, 0.1);                               // fosas tachadas, tubo a la planta
m.sube(Pl + 6.0, 1.6, 64, 52, 0.06); m.nota(Pl + 7.7, 69, 0.06, 1.0);                    // baja el bloqueador
m.gota(C - 0.05, 0.2, 600); m.sube(C + 0.6, 1.6, 52, 64, 0.04);                          // el cenote del inicio, con lo de abajo
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
