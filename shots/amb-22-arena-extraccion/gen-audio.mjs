// gen-audio.mjs — cama grave + efectos del Shot Ambiental #22 (arena). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Arena base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 22);
const K = m.K;
const G = K.Gancho, Tu = K.Tu, N = K.Numero, Mu = K.Muro, P = K.Pregunta, D = K.Desierto, Ri = K.Rios, Me = K.Mekong, Or = K.Orillas, Ki = K.Kilos, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [40, 47, 52]);                                                   // cama grave, como tierra que se mueve
m.cruje(G + 0.15, 0.35); m.whoosh(G + 0.15, 0.6, 0.12);                                   // la lupa entra a la pared
for (let i = 0; i < 5; i++) m.tic(G + 2.0 + i * 0.35, 0.12, 1200 + i * 200);              // se llenan las partes de la mezcla
m.nota(G + 2.1, 64, 0.06, 0.9);
for (let i = 0; i < 3; i++) { m.tic(Tu + 0.6 + i * 0.9, 0.2, 2200); m.nota(Tu + 0.7 + i * 0.9, [64, 67, 69][i], 0.05, 0.6); }   // banqueta, ventana, chip
m.sube(N + 0.3, 1.4, 45, 64, 0.06); for (let i = 0; i < 14; i++) m.tic(N + 0.3 + i * 0.1, 0.06, 1600);   // el número que sube
m.golpe(N + 4.0, 0.3, 90); m.nota(N + 4.1, 69, 0.06, 1.0);                                // medalla #1
m.zumbido(Mu + 0.2, 2.2, 0.05, 110); m.golpe(Mu + 2.6, 0.25, 70);                         // el muro rodea la Tierra; el corte
m.sube(P + 0.05, 1.3, 52, 64, 0.05); m.whoosh(P + 0.2, 1.2, 0.08);                        // ¿y el desierto? (viento)
m.whoosh(D + 0.1, 2.3, 0.14); for (let i = 0; i < 8; i++) m.tic(D + 0.3 + i * 0.3, 0.07, 3000);   // viento y rebotes del grano
m.sube(D + 3.3, 1.2, 60, 48, 0.05); m.golpe(D + 3.8, 0.2, 140);                           // el grano redondo resbala
m.motor(Ri + 0.2, 2.8, 0.06); for (let i = 0; i < 3; i++) m.burbuja(Ri + 0.3 + i * 0.7, 0.06, 420);   // dragas, olas
for (let i = 0; i < 6; i++) m.golpe(Me + 1.4 + i * 0.2, 0.12, 120);                       // entran 6 costales
for (let i = 0; i < 50; i++) m.tic(Me + 3.0 + i * 0.04, 0.05, 900 + (i % 5) * 80);        // salen 50
m.sube(Me + 3.2, 1.4, 57, 45, 0.05);
m.sube(Or + 0.2, 1.4, 52, 40, 0.05); m.cruje(Or + 1.9, 0.7); m.golpe(Or + 2.6, 0.4, 55);   // baja el fondo, se cae la orilla
for (let i = 0; i < 7; i++) m.burbuja(Ki + 0.9 + i * 0.6, 0.05, 300);                     // arena que cae en la pila, día por día
m.nota(Ki + 0.4, 67, 0.06, 0.8);
m.whoosh(C + 0.5, 3.0, 0.06); m.cruje(C + 1.6, 0.25);
m.nota(Ou + 0.3, 52, 0.08, 2.8); m.nota(Ou + 0.3, 59, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8);
m.guardar(OUT, 1);
