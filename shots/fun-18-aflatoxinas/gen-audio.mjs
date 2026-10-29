// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #18 (aflatoxinas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Aflatoxinas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 18);
const K = m.K;
const G = K.Gancho, I = K.Invisible, Mo = K.Moho, Co = K.Cocinar, P = K.Pregunta, AD = K.ADN, Ca = K.Cancer, Es = K.Estudio, Nu = K.Numero, Br = K.Brote, Pa = K.Pavos, Si = K.Sirve, Ci = K.Cierre, Ou = K.Outro;
const MICRO = Mo + 2.7;

m.pad(0, Si, 0.05, [43, 50, 55], 0.25);                                     // cama grave, algo tapada mientras dura el problema
m.pad(Si, Ou + 3.5, 0.05, [45, 52, 57], 0);                                 // se abre en "lo que sí sirve"
m.cruje(G + 0.05, 0.35); m.whoosh(G + 0.05, 0.6, 0.12);                     // la bolsa se voltea
for (let i = 0; i < 8; i++) m.tic(G + 0.6 + i * 0.1, 0.18, 1400 + i * 90); // caen los cacahuates
m.golpe(G + 1.55, 0.3, 120); m.nota(G + 1.7, 57, 0.05, 0.9, 0.5);         // cae el arrugado
m.whoosh(I - 0.3, 0.7, 0.1);                                                // la lupa
for (let i = 0; i < 5; i++) m.nota(I + 0.5 + i * 0.12, 74 + i * 2, 0.025, 0.5, 0.6); // moléculas fantasma
for (let i = 0; i < 3; i++) m.cruje(I + 1.7 + i * 0.45, 0.2);               // sin olor, sabor ni color
m.sube(Mo, 1.6, 40, 52, 0.04);                                              // crece el moho
for (let i = 0; i < 12; i++) m.tic(Mo + 0.9 + i * 0.08, 0.06, 3000);        // cadenas de esporas
for (let i = 0; i < 4; i++) m.golpe(MICRO + 0.15 + i * 0.3, 0.22, 95);      // costales
m.sube(MICRO + 1.6, 1.0, 50, 62, 0.04);                                     // sube el termómetro
for (let i = 0; i < 6; i++) m.gota(MICRO + 1.8 + i * 0.25, 0.15, 800 + i * 40); // humedad
m.motor(Co, 2.6, 0.05);                                                     // chisporroteo del comal
for (let i = 0; i < 14; i++) m.tic(Co + 0.1 + i * 0.18, 0.08, 4000);
for (let i = 0; i < 5; i++) m.nota(Co + 0.9 + i * 0.12, 64 + i, 0.04, 0.4, 0.4); // las moléculas siguen
m.sube(P + 0.1, 1.4, 52, 64, 0.05);
m.latido(AD + 0.2, 0.18); m.latido(AD + 1.0, 0.18);
m.zumbido(AD + 0.8, 0.5, 0.04, 300);                                        // se vuelve epóxido
m.golpe(AD + 2.2, 0.4, 70); m.metal(AD + 2.2, 0.12, 1800);                  // se pega al ADN
m.sube(Ca, 0.6, 45, 52, 0.04);
m.golpe(Ca + 1.7, 0.5, 65);                                                 // sello GRUPO 1
m.nota(Ca + 3.1, 52, 0.05, 1.0, 0.4); m.golpe(Ca + 4.4, 0.25, 90);
m.golpe(Es + 0.2, 0.35, 80);
m.whoosh(Es + 0.6, 3.6, 0.05);                                              // lluvia
for (let i = 0; i < 10; i++) m.gota(Es + 0.7 + i * 0.33, 0.1, 700 + (i % 4) * 90);
m.sube(Nu + 0.4, 1.4, 45, 76, 0.06);                                        // la barra de 8,000 sube y sube
m.nota(Nu + 3.2, 81, 0.04, 0.5);                                            // límite: 20 (chiquito)
for (let i = 0; i < 16; i++) m.tic(Br + 0.2 + i * 0.06, 0.06, 2000);        // aparecen las 317 personas
m.sube(Br + 1.5, 0.6, 57, 64, 0.03);                                        // piel amarilla
m.sube(Br + 3.1, 0.8, 52, 40, 0.05);                                        // 125 se apagan
for (let i = 0; i < 10; i++) m.tic(Pa + 0.2 + i * 0.22, 0.07, 3200 - i * 60); // pasitos de los pavitos
for (let i = 0; i < 10; i++) m.tic(Pa + 3.0 + i * 0.12, 0.06, 900);          // se acuestan
m.golpe(Pa + 1.6, 0.25, 110);
m.whoosh(Si + 0.5, 0.6, 0.08); m.nota(Si + 0.7, 69, 0.06, 0.8); m.nota(Si + 1.9, 72, 0.06, 0.8); m.nota(Si + 3.3, 76, 0.06, 0.8);
m.metal(Si + 4.5, 0.15, 700);                                               // tapa del bote
m.whoosh(Ci + 0.5, 0.9, 0.12); m.metal(Ci + 1.5, 0.22, 650); m.nota(Ci + 1.6, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
