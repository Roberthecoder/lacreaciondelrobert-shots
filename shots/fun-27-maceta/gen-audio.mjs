// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #27 (Leucocoprinus birnbaumii, el hongo de las macetas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Maceta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 27);
const K = m.K;
const G = K.Gancho, N = K.Nombre, L = K.Llega, Mi = K.Micelio, Ca = K.Calor, A = K.Abre, P = K.Pregunta, Tx = K.Toxico, E = K.Estudio, Pg = K.Pigmento, Tr = K.Truco, Q = K.Quitar, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                 // cama grave y cálida
for (let i = 0; i < 3; i++) { m.burbuja(G + 0.25 + i * 0.18, 0.12, 420 + i * 90); m.nota(G + 0.3 + i * 0.18, 72 + i * 3, 0.04, 0.5); } // ¡pop! brotan los hongos
m.cruje(G + 2.2, 0.35);                                                       // "está matando a tu planta": tachado
m.nota(G + 3.4, 69, 0.05, 0.9); m.nota(G + 3.6, 76, 0.04, 0.9);                // se come lo muerto
m.sube(N - 0.3, 0.9, 52, 60, 0.04);                                           // crece el hongo grande
[0.6, 1.0, 1.6, 2.0, 2.4].forEach((d) => m.tic(N + d, 0.12, 2200));           // etiquetas
m.whoosh(L + 0.2, 0.6, 0.12);                                                 // entra el costal
for (let i = 0; i < 12; i++) m.tic(L + 0.5 + i * 0.15, 0.06, 500 + (i % 4) * 80); // cae la tierra
m.whoosh(L + 2.0, 1.6, 0.07); m.nota(L + 2.4, 81, 0.035, 1.2);                // la espora flota por el aire
m.sube(Mi, 3.2, 45, 57, 0.03);                                                // crece el micelio
for (let i = 0; i < 5; i++) m.cruje(Mi + 1.5 + i * 0.5, 0.15);                // se deshacen los restos muertos
m.sube(Ca + 0.1, 1.3, 55, 67, 0.04);                                          // sube el termómetro
for (let i = 0; i < 6; i++) m.gota(Ca + 0.6 + i * 0.35 + 0.5, 0.16, 800 + i * 40); // riego
for (let i = 0; i < 3; i++) m.burbuja(Ca + 1.6 + i * 0.25, 0.1, 380);         // primordios
for (let i = 0; i < 3; i++) m.nota(Ca + 2.7 + i * 0.25, 64 + i * 3, 0.04, 0.6); // salen los huevitos
m.sube(A + 0.2, 2.4, 57, 69, 0.04);                                           // time-lapse: se abre
for (let i = 0; i < 8; i++) m.tic(A + 2.4 + i * 0.22, 0.05, 3200);            // caen esporas
m.whoosh(A + 2.6, 0.5, 0.08);                                                 // recuadro al microscopio
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                           // ¿por qué tener cuidado?
m.golpe(Tx + 0.6, 0.45, 75);                                                  // sello NO SE COME
for (let i = 0; i < 6; i++) m.tic(Tx + 3.0 + i * 0.13, 0.08, 1300);           // llegan el niño y el perrito
m.whoosh(Tx + 3.4, 0.5, 0.1); m.whoosh(Tx + 4.0, 1.0, 0.12);                  // la mano baja y lo quita
m.golpe(E + 0.2, 0.35, 85);                                                   // tarjeta 2005
for (let i = 0; i < 3; i++) m.gota(E + 1.7 + i * 0.4, 0.15, 600);             // trozos al matraz
for (let i = 0; i < 8; i++) m.burbuja(E + 1.4 + i * 0.3, 0.06, 300 + i * 20); // burbujea el extracto
m.nota(Pg + 0.1, 76, 0.05, 1.0); m.nota(Pg + 0.6, 79, 0.05, 1.0);             // brillan las birnbauminas
m.golpe(Tr + 0.8, 0.2, 110);                                                  // el sombrero toca el papel
for (let i = 0; i < 6; i++) m.tic(Tr + 1.0 + i * 0.28, 0.07, 2600);           // pasa la noche
m.nota(Tr + 3.1, 84, 0.05, 1.2); m.nota(Tr + 3.3, 88, 0.05, 1.2);             // aparece el dibujo de esporas
m.whoosh(Q + 0.2, 0.8, 0.12);                                                 // lo arrancan
m.whoosh(Q + 1.1, 0.5, 0.08); m.zumbido(Q + 1.2, 1.4, 0.03, 140);             // se ve por dentro: el micelio sigue
m.metal(Q + 2.6, 0.15, 900); m.cruje(Q + 3.3, 0.25);                          // fungicida: casi no sirve
m.whoosh(C + 0.6, 0.8, 0.08); m.nota(C + 1.2, 69, 0.06, 1.2); m.nota(C + 1.5, 76, 0.05, 1.2); // recicla su tierra
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
