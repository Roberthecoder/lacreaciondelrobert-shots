// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #16 (koji, salsa de soya). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Koji base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 16);
const K = m.K;
const G = K.Gancho, Si = K.Siembra, Cr = K.Crece, Pr = K.Proteinas, Al = K.Almidon, Sa = K.Salmuera, P = K.Pregunta, Mo = K.Moromi, Co = K.Color, E = K.Estudio, Pm = K.Primo, N = K.Nacional, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);                                    // cama grave y cálida
m.whoosh(G + 0.05, 0.6, 0.12);                                                   // se inclina la botella
for (let i = 0; i < 12; i++) m.gota(G + 0.7 + i * 0.2, 0.12, 500 + (i % 3) * 80); // cae la salsa
m.cruje(G + 2.2, 0.3); m.nota(G + 2.7, 64, 0.06, 0.8);                          // se tacha "solo soya" / "la cocinó un hongo"
m.zumbido(Si + 0.1, 1.4, 0.03, 300);                                             // vapor
m.cruje(Si + 1.8, 0.5);                                                           // trigo tostado que se quiebra
m.whoosh(Si + 2.4, 0.8, 0.1);                                                     // mitad y mitad
for (let i = 0; i < 10; i++) m.tic(Si + 3.0 + i * 0.12, 0.08, 3000 + i * 80);     // llueven esporas
m.sube(Cr + 0.2, 1.8, 52, 59, 0.04);                                              // crece la pelusa
m.whoosh(Cr + 2.0, 0.6, 0.12); m.nota(Cr + 2.3, 69, 0.05, 1.0);                  // abre la lupa
m.sube(Cr + 2.8, 1.2, 57, 64, 0.04);                                              // sube la cabezuela
for (let i = 0; i < 3; i++) m.metal(Cr + 4.0 + i * 0.2, 0.08, 2600);              // salen las tijeras
for (let i = 0; i < 12; i++) m.tic(Pr + 0.9 + i * 0.16, 0.14, 1800);              // cortes de la proteína
m.nota(Pr + 3.0, 72, 0.07, 1.2); m.nota(Pr + 3.1, 76, 0.05, 1.2);                 // glutamato → umami
for (let i = 0; i < 11; i++) m.tic(Al + 0.6 + i * 0.15, 0.12, 2200);              // cortes del almidón
m.golpe(Sa + 0.8, 0.4, 70); for (let i = 0; i < 6; i++) m.burbuja(Sa + 0.85 + i * 0.07, 0.1, 300 + i * 40); // chapuzón
m.sube(Sa + 1.4, 1.2, 57, 45, 0.05);                                              // el hongo muere
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                               // ¿quién sigue?
for (let i = 0; i < 6; i++) m.tic(Mo + 0.3 + i * 0.25, 0.1, 1800);                // las enzimas siguen
for (let i = 0; i < 6; i++) m.burbuja(Mo + 0.8 + i * 0.1, 0.08, 700);             // aparecen bacterias
for (let i = 0; i < 10; i++) m.burbuja(Mo + 2.0 + i * 0.2, 0.06, 450 + i * 10);  // levaduras burbujean
for (let i = 0; i < 8; i++) m.tic(Mo + 2.4 + i * 0.22, 0.09, 1200);               // pasan las hojas del calendario
for (let i = 0; i < 3; i++) m.nota(Co + 1.0 + i * 0.6, 60 + i * 3, 0.05, 0.6);    // azúcar + aminoácido
m.sube(Co + 0.5, 2.5, 50, 45, 0.04);                                              // se oscurece
m.golpe(E + 0.2, 0.35, 80);
for (let i = 0; i < 21; i++) m.tic(E + 0.8 + i * 0.09, 0.06, 1500 + i * 30);      // 210 cepas (una cada 10)
m.sube(Pm + 0.2, 1.5, 52, 60, 0.04);                                              // crecen los dos primos
for (let i = 0; i < 4; i++) m.nota(Pm + 2.2 + i * 0.15, 50, 0.05, 0.4, 0.6);      // aflatoxinas del primo
m.metal(Pm + 3.6, 0.15, 900); m.tic(Pm + 3.7, 0.2, 800);                         // interruptor OFF
m.golpe(Pm + 5.0, 0.45, 75);                                                       // sello "0"
m.burbuja(N + 0.2, 0.1, 400); m.burbuja(N + 0.7, 0.1, 500); m.burbuja(N + 1.2, 0.1, 600); // sake, miso, soya
m.metal(N + 2.0, 0.2, 1200); m.nota(N + 2.1, 76, 0.06, 1.2);                       // medalla
m.sube(C + 0.6, 1.0, 60, 72, 0.04); m.nota(C + 1.6, 69, 0.06, 1.2);                // el fantasma del hongo
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
