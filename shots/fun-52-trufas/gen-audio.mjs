// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #52 (trufas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Trufas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
const G = K.Gancho, R = K.Raices, Pb = K.Problema, O = K.Olor, P = K.Pregunta, A = K.Animales, H = K.Hipotesis, Pr = K.Prueba, E = K.Estudio, En = K.Encino, M = K.Mexico, C = K.Cierre, Ou = K.Outro;

m.pad(0, O + 0.2, 0.05, [40, 47, 52], 0.25);                               // cama subterránea, tapada
m.pad(O + 0.2, Ou + 3.5, 0.05, [43, 50, 55], 0.05);                         // se abre con el olor
m.whoosh(G + 0.15, 0.7, 0.12); m.cruje(G + 0.3, 0.4);                       // la mano saca la trufa; cae tierra
m.golpe(G + 1.4, 0.3, 90);                                                  // ¿una piedra? tachado
m.metal(G + 2.5, 0.12, 2600); m.whoosh(G + 2.5, 0.4, 0.1);                  // el cuchillo la parte
for (let i = 0; i < 4; i++) m.cruje(R + 0.2 + i * 0.4, 0.12);               // crecen las raíces
for (let i = 0; i < 4; i++) m.gota(R + 1.6 + i * 0.15, 0.12, 500);          // aparecen las trufitas
m.whoosh(R + 3.2, 0.6, 0.12);                                               // zoom al microscopio
m.sube(R + 3.6, 1.6, 52, 59, 0.03); m.nota(R + 4.5, 64, 0.05, 0.6); m.nota(R + 4.7, 67, 0.05, 0.6); // intercambio
for (let i = 0; i < 5; i++) m.burbuja(Pb + 0.2 + i * 0.15, 0.1, 420 + i * 40); // ascas con esporas
m.whoosh(Pb + 2.5, 1.2, 0.16);                                              // viento arriba
m.golpe(Pb + 3.4, 0.35, 70);                                                // ✗ sin viento
m.sube(O + 0.2, 2.0, 57, 69, 0.04);                                         // sube el olor
m.nota(O + 2.4, 72, 0.06, 0.9); m.tic(O + 2.4, 0.15, 1800);                 // la molécula
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
for (let i = 0; i < 4; i++) m.tic(A + 0.2 + i * 0.25, 0.1, 400);           // pasos del jabalí
for (let i = 0; i < 4; i++) m.whoosh(A + 1.2 + i * 0.12, 0.1, 0.08);        // olfatea
m.cruje(A + 1.7, 0.4);                                                      // escarba
m.golpe(A + 2.4, 0.25, 140); m.tic(A + 2.55, 0.15, 700);                    // mordida
for (let i = 0; i < 4; i++) m.tic(A + 3.0 + i * 0.3, 0.1, 400);
m.gota(A + 4.1, 0.25, 300);                                                 // plop de la popó
m.nota(H + 0.4, 60, 0.05, 0.8); m.nota(H + 1.2, 63, 0.05, 0.8); m.nota(H + 2.7, 58, 0.05, 1.0); // la hipótesis
for (let i = 0; i < 6; i++) m.tic(Pr + 0.6 + i * 0.3, 0.1, 450);           // pasos del cerdo
for (let i = 0; i < 4; i++) m.whoosh(Pr + 1.5 + i * 0.1, 0.08, 0.07);      // el perro olfatea
m.cruje(Pr + 2.5, 0.4);                                                     // escarban
m.golpe(Pr + 4.2, 0.5, 70);                                                 // sello EN DUDA
m.golpe(E + 0.15, 0.3, 80);                                                 // tarjeta 2014
m.latido(E + 1.8, 0.15); m.latido(E + 2.6, 0.15); m.latido(E + 3.4, 0.15); // la tripa se mueve
for (let i = 0; i < 4; i++) m.burbuja(E + 2.2 + i * 0.4, 0.1, 300);         // ascas que se abren
m.nota(E + 4.0, 72, 0.06, 0.8); m.nota(E + 4.2, 76, 0.05, 0.8);             // ✓ vivas
m.sube(En + 0.3, 1.5, 55, 67, 0.04); m.nota(En + 1.8, 79, 0.05, 0.8);       // germinan y se unen a la raíz
for (let i = 0; i < 12; i++) m.tic(M + 0.6 + i * 0.12, 0.1, 1500 + i * 40); // puntos del mapa
m.golpe(M + 0.3, 0.25, 90);
m.sube(C + 0.3, 1.5, 57, 64, 0.04);                                          // olor del cierre
for (let i = 0; i < 3; i++) m.whoosh(C + 1.4 + i * 0.15, 0.1, 0.08);        // olfateo del cerdo
for (let i = 0; i < 3; i++) m.whoosh(C + 1.9 + i * 0.15, 0.1, 0.08);        // y del perro
m.nota(C + 2.2, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
