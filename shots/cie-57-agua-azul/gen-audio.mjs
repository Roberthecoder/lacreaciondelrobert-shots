// gen-audio.mjs — cama grave + efectos del Shot Científico #57 (el agua es azul). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Agua Azul base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
m.pad(0, K.Outro + 3.5, 0.05, [43, 50, 55]);
m.whoosh(K.Gancho + 0.15, 0.7, 0.12);                                                                   // flecha ¿reflejo?
m.tic(K.Gancho + 1.6, 0.25, 900);                                                                        // se tacha
m.golpe(K.Gancho + 2.4, 0.35, 80); m.nota(K.Gancho + 2.5, 76, 0.06, 0.8);                                // EL AGUA ES AZUL
m.whoosh(K.Luz + 0.05, 0.6, 0.14);                                                                       // rayo de sol
for (let i = 0; i < 7; i++) m.nota(K.Luz + 0.7 + i * 0.07, [60, 62, 64, 65, 67, 69, 71][i], 0.05, 0.5);  // se abre en colores
m.gota(K.Rojo - 0.1, 0.25, 700);                                                                         // entra al agua
m.sube(K.Rojo + 0.4, 2.6, 60, 48, 0.05);                                                                 // el rojo se apaga
m.whoosh(K.Regresa - 0.2, 0.7, 0.1); m.nota(K.Regresa + 0.6, 79, 0.05, 0.9);                             // luz azulada al ojo
m.sube(K.Pregunta + 0.1, 1.5, 52, 64, 0.05); m.gota(K.Pregunta + 0.3, 0.2, 1100);                       // ¿y el vaso?
m.burbuja(K.Poquita + 0.8, 0.12, 400); m.sube(K.Poquita + 0.8, 2.4, 55, 67, 0.04);                       // tubo de metros de agua
for (let i = 0; i < 6; i++) m.burbuja(K.Alberca + 0.4 + i * 0.3, 0.1, 350 + i * 40);                    // se llena la alberca
for (let i = 0; i < 8; i++) m.burbuja(K.Buzo + 0.3 + i * 0.6, 0.1, 300 + (i % 3) * 80);                 // buzo: burbujas
m.sube(K.Buzo + 0.6, 4, 55, 43, 0.04);                                                                   // baja y se apaga el rojo
m.golpe(K.Estudio + 0.25, 0.35, 80);                                                                     // tarjeta 1993
m.zumbido(K.Estudio + 3.0, 3.5, 0.05, 140);                                                              // la molécula vibra
m.metal(K.Estudio + 3.8, 0.12, 640);                                                                     // se come el rojo
m.nota(K.Unico + 0.2, 72, 0.06, 0.8); m.nota(K.Unico + 0.8, 76, 0.06, 1.0); m.nota(K.Unico + 1.8, 79, 0.06, 1.2);
m.whoosh(K.Cielo + 0.5, 0.6, 0.1); m.tic(K.Cielo + 1.1, 0.2, 2200);                                      // reflejo de lado
m.whoosh(K.Cielo + 2.4, 0.6, 0.1);                                                                       // desde arriba
m.metal(K.Hielo + 0.4, 0.1, 1200); m.sube(K.Hielo + 0.4, 1.8, 60, 72, 0.04);                             // glaciar se pone azul
for (let i = 0; i < 3; i++) m.whoosh(K.Cierre + 0.2 + i * 0.15, 0.5, 0.08);                              // azul sale del agua
m.golpe(K.Cierre + 0.9, 0.3, 80);
m.nota(K.Outro + 0.3, 55, 0.08, 2.8); m.nota(K.Outro + 0.3, 62, 0.06, 2.8); m.nota(K.Outro + 0.3, 67, 0.05, 2.8);
m.guardar(OUT, 1);
