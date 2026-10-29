// gen-audio.mjs — cama grave + efectos del Shot Ambiental #12 (las plantas no limpian el aire de tu casa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Plantas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 112);
const K = m.K;
const G = K.Gancho, M = K.Mito, Ca = K.Caja, P = K.Pregunta, S = K.Sala, E = K.Estudio, L = K.Litros, Cu = K.Cuenta, Si = K.Sirve, C = K.Cierre, Ou = K.Outro;

// cama: tapada (encerrada) mientras dura el mito y la caja sellada; se abre cuando entra el aire de afuera
m.pad(0, S, 0.05, [45, 52, 57], 0.7);
m.pad(S, Ou + 3.5, 0.05, [45, 52, 57, 64], 0);
m.nota(G + 0.3, 64, 0.06, 0.6); m.golpe(G + 1.5, 0.3, 110);                                  // chip y tachón
for (let i = 0; i < 26; i++) m.burbuja(G + 3.7 + i * 0.1 * (1 - i / 40), 0.05, 420 + i * 18);  // macetitas que se llenan
m.whoosh(M + 0.2, 0.7, 0.1); m.golpe(M + 0.4, 0.25, 90);                                     // NASA 1989
m.metal(M + 2.5, 0.15, 520); m.golpe(M + 2.6, 0.2, 70);                                      // edificio hermético
m.zumbido(M + 3.8, 1.2, 0.04, 220); m.nota(M + 4.0, 69, 0.05, 0.8);                          // base espacial
for (let i = 0; i < 5; i++) m.metal(Ca + 0.5 + i * 0.12, 0.1, 900);                          // tornillos de la tapa
m.whoosh(Ca + 1.9, 0.9, 0.08);                                                               // jeringa
for (let i = 0; i < 26; i++) m.tic(Ca + 2.2 + i * 0.25, 0.05, 2000);                         // cronómetro de 24 h
m.sube(Ca + 4.0, 3.2, 64, 52, 0.04);                                                         // el químico baja
m.sube(P + 1.8, 1.0, 52, 64, 0.05);                                                          // "?"
for (let i = 0; i < 4; i++) m.whoosh(S + 1.6 + i * 0.85, 0.8, 0.12);                          // aire por puerta, ventana y rendijas
m.golpe(E + 0.4, 0.3, 100); for (let i = 0; i < 12; i++) m.tic(E + 2.6 + i * 0.16, 0.08, 1500); // tarjeta y 12 estudios
for (let i = 0; i < 14; i++) m.tic(E + 4.0 + i * 0.1, 0.04, 2600);                           // conteo hasta 196
m.burbuja(L + 0.8, 0.12, 380); m.nota(L + 1.0, 67, 0.05, 0.6);                               // 23 L
m.whoosh(L + 2.0, 1.6, 0.16);                                                                // el aire grande que entra
for (let i = 0; i < 30; i++) m.burbuja(Cu + 0.6 + i * 0.13, 0.04, 400 + i * 12);              // la sala se llena de macetas
m.golpe(Cu + 3.0, 0.3, 80);
m.nota(Si + 1.2, 64, 0.06, 0.6); m.nota(Si + 2.6, 67, 0.06, 0.6); m.nota(Si + 3.8, 71, 0.06, 0.8); // palomitas
m.whoosh(Si + 2.7, 0.8, 0.12);                                                               // se abre la ventana
m.motor(Si + 4.0, 2.0, 0.05);                                                                // campana de la cocina
m.whoosh(C + 0.3, 1.2, 0.1); m.nota(C + 0.5, 69, 0.05, 1.0);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
