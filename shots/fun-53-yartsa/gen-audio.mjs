// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #53 (hongo-oruga del Tíbet). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Yartsa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 53);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Me = K.Meseta, L = K.Larvas, I = K.Infeccion, Ta = K.Tallo, P = K.Pregunta, Pr = K.Precio, Re = K.Recolectores, E = K.Estudio, Mn = K.Menos, V = K.Vulnerable, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52], 0.25);                                  // cama grave y fría
m.whoosh(G + 0.05, 1.0, 0.1); m.cruje(G + 0.6, 0.25);                          // la "ramita" gira en la mano
m.cruje(G + 2.0, 0.4); m.golpe(G + 2.1, 0.35, 80);                             // se tacha "una ramita"
m.nota(G + 2.6, 57, 0.05, 0.8); m.nota(G + 3.0, 64, 0.05, 0.8);                 // etiquetas
m.nota(N + 0.2, 60, 0.05, 0.8); m.nota(N + 0.9, 67, 0.04, 0.8);
m.whoosh(Me, 1.6, 0.12); m.sube(Me + 0.3, 2.1, 45, 57, 0.05);                  // viento y la altitud que sube
m.golpe(L + 0.1, 0.25, 70); m.cruje(L + 0.3, 0.3);                             // bajamos a la tierra
for (let i = 0; i < 6; i++) m.burbuja(L + 0.8 + i * 0.5, 0.05, 220 + i * 20);   // orugas que se mueven
m.zumbido(L + 0.2, 3.5, 0.025, 160);                                            // alas de la polilla
for (let i = 0; i < 5; i++) m.gota(I + i * 0.12, 0.08, 1400);                  // llegan las esporas
for (let i = 0; i < 12; i++) m.tic(I + 0.6 + i * 0.24, 0.07, 1200 + i * 60);   // las hifas la llenan
m.latido(I + 0.6, 0.18); m.latido(I + 1.5, 0.12); m.latido(I + 2.4, 0.06);     // la oruga se apaga
for (let i = 0; i < 8; i++) m.gota(Ta + 0.2 + i * 0.16, 0.1, 800 + (i % 3) * 200); // deshielo
m.sube(Ta + 0.9, 2.0, 48, 60, 0.05); m.cruje(Ta + 2.8, 0.35);                   // sale el tallo y rompe la tierra
m.sube(P + 0.1, 1.6, 52, 64, 0.05);
m.metal(Pr + 0.4, 0.15, 1300); for (let i = 0; i < 6; i++) m.tic(Pr + 0.4 + i * 0.15, 0.08, 2200); // el número cuenta
m.golpe(Pr + 3.1, 0.35, 75); m.metal(Pr + 3.4, 0.2, 900); m.metal(Pr + 3.6, 0.15, 1100); // suben las barras de precio por kilo
for (let i = 0; i < 3; i++) { m.cruje(Re + 0.8 + i * 0.5, 0.25); for (let k = 0; k < 3; k++) m.metal(Re + 1.4 + i * 0.5 + k * 0.25, 0.08, 2000); } // cavan y salen monedas
m.golpe(E + 0.2, 0.3, 80);
for (let i = 0; i < 40; i++) m.tic(E + 3.0 + i * 0.05, 0.05, 1500 + (i % 5) * 200); // puntitos del mapa
for (let i = 0; i < 5; i++) m.nota(Mn + 0.2 + i * 0.25, 64 - i * 3, 0.05, 0.4); // la gráfica baja
m.sube(Mn + 3.6, 1.8, 50, 58, 0.04);                                            // el termómetro sube
m.golpe(V + 0.3, 0.45, 65);                                                     // sello VU
m.whoosh(C + 0.2, 0.8, 0.08); m.nota(C + 1.2, 57, 0.06, 1.2); m.nota(C + 1.2, 64, 0.04, 1.2);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
