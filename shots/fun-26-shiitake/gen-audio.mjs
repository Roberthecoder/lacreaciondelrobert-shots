// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #26 (dermatitis por shiitake). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Shiitake base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 26);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Es = K.Espera, R = K.Rayas, L = K.Lentinano, P = K.Pregunta, H = K.Hipotesis, Ca = K.Calor, E = K.Estudio, D = K.Dosis, Ce = K.Cena, S = K.Sirve, C = K.Cierre, Ou = K.Outro;
const mitadCa = Ca + (E - Ca) * 0.45;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);
m.metal(G + 0.6, 0.18, 1900); m.whoosh(G + 0.2, 0.5, 0.08);               // el tenedor pincha el plato
for (let i = 0; i < 4; i++) { m.whoosh(G + 3.2 + i * 0.4, 0.25, 0.14); m.tic(G + 3.4 + i * 0.4, 0.2, 3200); } // cuatro latigazos
m.sube(N, 1.0, 45, 52, 0.04);                                                // brota el shiitake
for (let i = 0; i < 8; i++) m.tic(N + 1.6 + i * 0.1, 0.08, 1400);          // ocho personas
m.golpe(N + 2.6, 0.3, 90); m.nota(N + 2.7, 64, 0.05, 0.8);                  // a una le salen rayas
for (let i = 0; i < 7; i++) m.tic(Es + 0.6 + i * 0.25, 0.1, 2600);          // pasan los días
for (let i = 0; i < 6; i++) m.whoosh(R + 0.2 + i * 0.45, 0.22, 0.1);         // aparecen las rayas
for (let i = 0; i < 6; i++) m.tic(R + 1.3 + i * 0.12, 0.05, 4200);          // comezón
m.sube(L - 0.3, 1.2, 64, 48, 0.05);                                          // bajamos al microscopio
for (let i = 0; i < 8; i++) m.burbuja(L + 0.3 + i * 0.22, 0.06, 300 + i * 25);
for (let i = 0; i < 3; i++) m.nota(L + 1.3 + i * 0.35, 60 + i * 3, 0.05, 0.6); // salen las tres hélices
m.sube(P + 0.1, 1.4, 52, 64, 0.05);                                          // ¿por qué rayas?
for (let i = 0; i < 6; i++) m.gota(H + 0.4 + i * 0.2, 0.08, 1200);          // llegan las señales
m.latido(H + 1.3, 0.2); m.latido(H + 1.9, 0.22); m.latido(H + 2.5, 0.22);   // el vasito se abre
m.golpe(H + 3.4, 0.3, 75); m.nota(H + 3.5, 57, 0.05, 1.0);                   // aparece el linfocito T
m.nota(Ca + 0.2, 60, 0.04, 0.5); m.nota(Ca + 0.6, 62, 0.04, 0.5); m.metal(Ca + 1.4, 0.12, 1300); // crudo, poco cocido, ✓
m.motor(mitadCa, 2.6, 0.05);                                                 // la sartén chisporrotea
m.sube(mitadCa + 0.6, 1.6, 48, 60, 0.05); m.cruje(mitadCa + 1.4, 0.35);      // la hélice se separa
m.golpe(E + 0.2, 0.35, 80);                                                  // la tarjeta del estudio
for (let i = 0; i < 25; i++) m.tic(E + 1.8 + i * 0.06, 0.05, 1600);         // la cuadrícula de 125
for (let i = 0; i < 12; i++) m.tic(E + 2.6 + i * 0.06, 0.07, 900);          // se marcan los 59 casos
for (let i = 0; i < 3; i++) { m.metal(D + 0.5 + i * 0.6, 0.08, 1100 + i * 200); m.sube(D + 0.5 + i * 0.6, 0.5, 55 + i * 4, 60 + i * 4, 0.04); } // tres barras
m.nota(D + 2.4, 72, 0.05, 0.9); m.nota(D + 2.6, 76, 0.05, 0.9);              // todos se recuperaron
for (let i = 0; i < 4; i++) m.tic(Ce + 0.2 + i * 0.25, 0.08, 1300);         // la mesa compartida
m.whoosh(Ce + 1.2, 0.4, 0.08); m.nota(Ce + 2.2, 69, 0.05, 0.8);              // rayas en uno; los demás, nada
m.motor(S, 2.6, 0.06); for (let i = 0; i < 6; i++) m.burbuja(S + 0.3 + i * 0.3, 0.06, 420); // sartén
m.whoosh(C + 0.2, 0.6, 0.08); m.nota(C + 0.8, 69, 0.06, 1.2); m.metal(C + 0.5, 0.1, 1900); // regreso al plato
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
