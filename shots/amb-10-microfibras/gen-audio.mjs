// gen-audio.mjs — cama grave + efectos del Shot Ambiental #10 (microfibras). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Microfibras base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 110);
const K = m.K;
const G = K.Gancho, N = K.Numero, F = K.Fibra, D = K.Drenaje, Pl = K.Planta, P = K.Pregunta, Lo = K.Lodos, E = K.Estudio, S = K.Sirve, Fi = K.Filtro, C = K.Cierre, Ou = K.Outro;

// cama: tapada mientras las fibras viajan (Gancho → Estudio) y más abierta en "qué ayuda"
m.pad(0, S, 0.05, [45, 52, 57], 0.6);
m.pad(S, Ou + 3.5, 0.05, [48, 55, 60]);
m.motor(G, 4.4, 0.05); for (let i = 0; i < 8; i++) m.burbuja(G + 0.2 + i * 0.5, 0.06, 420 + (i % 3) * 60);   // tambor y chapoteo
m.nota(G + 1.2, 64, 0.05, 0.8);
for (let i = 0; i < 16; i++) m.tic(N + 0.3 + i * 0.1, 0.05, 1500 + i * 40);                                   // contador de 700 mil
m.golpe(N + 1.9, 0.3, 90); m.nota(N + 1.4, 67, 0.05, 0.8);
m.whoosh(F + 0.3, 0.7, 0.12); m.sube(F + 0.3, 0.8, 57, 69, 0.04);                                              // lupa
m.nota(F + 1.0, 72, 0.04, 0.6); m.nota(F + 2.2, 69, 0.04, 0.6);
for (let i = 0; i < 6; i++) m.burbuja(D + 0.1 + i * 0.3, 0.08, 300 + i * 30);                                 // gorgoteo del drenaje
m.motor(Pl + 0.2, 7.2, 0.04); m.sube(Pl + 0.8, 1.8, 50, 62, 0.04); m.nota(Pl + 2.6, 69, 0.05, 0.8);            // planta y 98 %
for (let i = 0; i < 8; i++) m.gota(Pl + 3.6 + i * 0.4, 0.08, 800 + (i % 2) * 150);                             // goteo al río
m.golpe(Pl + 4.0, 0.3, 70);
m.sube(P + 0.05, 1.3, 52, 64, 0.05); m.burbuja(P + 0.1, 0.12, 300);                                            // "?"
m.motor(Lo + 0.8, 3.4, 0.07); m.cruje(Lo + 1.0, 0.25);                                                          // tractor y lodo
for (let i = 0; i < 10; i++) i < 9 ? m.nota(Lo + 3.8 + i * 0.08, 64 + (i % 3) * 3, 0.03, 0.3) : m.tic(Lo + 3.8 + i * 0.08, 0.06, 1200);  // 9 de 10
m.golpe(E + 0.2, 0.3, 100); for (let i = 0; i < 3; i++) m.golpe(E + 2.2 + i * 0.4, 0.2 - i * 0.04, 120 - i * 15);   // tarjeta y 3 barras
m.tic(S + 0.2, 0.12, 2200); [1.0, 1.5, 2.1].forEach((d, i) => m.nota(S + d, 64 + i * 3, 0.05, 0.6)); m.bajo(S + 3.4, 40, 0.12, 0.5);  // consejos ✓✓✓ y ✗
m.whoosh(Fi + 0.3, 0.6, 0.1); for (let i = 0; i < 10; i++) m.burbuja(Fi + 0.6 + i * 0.35, 0.05, 360);            // el filtro se llena
m.nota(Fi + 4.0, 69, 0.05, 0.8);
for (let i = 0; i < 6; i++) m.tic(C + 0.3 + i * 0.33, 0.03, 900);                                              // pasos
m.whoosh(C + 2.8, 0.6, 0.1); m.motor(C + 3.0, 2.3, 0.04);                                                       // de regreso a la lavadora
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
