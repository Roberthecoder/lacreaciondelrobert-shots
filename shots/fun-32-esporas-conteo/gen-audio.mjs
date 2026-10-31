// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #32 (cuántas esporas suelta una seta). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Esporas Conteo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 32);
const K = m.K;
const G = K.Gancho, So = K.Sombrero, V = K.Vaso, H = K.Huella, Po = K.Polvo, Co = K.Color, P = K.Pregunta, B = K.Buller, R = K.Repisa, Bj = K.Bejin, Ra = K.Razon, L = K.Loteria, A = K.Aviso, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.15);
m.whoosh(G + 0.1, 1.2, 0.08);                                                  // la lluvia de esporas empieza
for (let i = 0; i < 18; i++) m.tic(G + 0.2 + i * 0.1, 0.05, 2600 + (i % 4) * 200); // el contador corre
m.golpe(G + 2.0, 0.3, 80);                                                     // 16 mil millones
m.sube(G + 3.9, 1.1, 52, 59, 0.04); m.nota(G + 4.9, 64, 0.05, 0.8);            // las barras
m.metal(So + 1.2, 0.12, 1800); m.whoosh(So + 1.3, 0.6, 0.12);                  // el cuchillo corta el pie
m.golpe(So + 3.5, 0.18, 120);                                                  // el sombrero toca el papel
m.metal(V + 0.8, 0.2, 2200);                                                   // clinc del vaso
m.zumbido(V + 0.9, 1.0, 0.025, 300);                                           // grillos de noche
for (let i = 0; i < 6; i++) m.tic(V + 0.9 + i * 0.16, 0.05, 4200);
m.nota(V + 2.0, 76, 0.05, 0.4); m.nota(V + 2.15, 79, 0.05, 0.4);              // pajarito de la mañana
m.whoosh(H + 0.1, 0.8, 0.1);                                                   // se levanta el vaso
m.nota(H + 1.3, 69, 0.06, 1.0); m.nota(H + 1.6, 72, 0.05, 1.0);                // aparece la huella
m.sube(Po, 0.9, 48, 60, 0.05);                                                 // zoom al microscopio
for (let i = 0; i < 10; i++) m.gota(Po + 0.2 + i * 0.1, 0.06, 700 + i * 40);   // esporas que aparecen
for (let i = 0; i < 3; i++) m.nota(Co + 0.2 + i * 0.35, 64 + i * 3, 0.05, 0.5); // tres huellas
m.golpe(Co + 2.0, 0.45, 70);                                                   // sello NO
m.sube(P + 0.05, 1.2, 52, 64, 0.05);                                           // ¿para qué tantas?
m.golpe(B + 0.2, 0.3, 90);                                                     // tarjeta del estudio
for (let i = 0; i < 12; i++) m.tic(B + 0.8 + i * 0.12, 0.07, 1400);            // rayitas de la libreta
m.whoosh(R + 0.4, 1.4, 0.08);                                                  // nube de esporas del hongo de repisa
for (let i = 0; i < 12; i++) m.tic(R + 1.0 + i * 0.1, 0.05, 2600);             // contador
for (let i = 0; i < 6; i++) m.cruje(R + 2.4 + i * 0.47, 0.15);                 // hojas del calendario
m.golpe(Bj, 0.35, 60); m.burbuja(Bj + 0.3, 0.12, 200);                         // aparece el bejín
for (let i = 0; i < 14; i++) m.tic(Bj + 0.8 + i * 0.1, 0.05, 2400);
m.whoosh(Bj + 2.2, 0.9, 0.08);                                                 // "pof" de esporas
for (let i = 0; i < 10; i++) m.nota(Ra + 0.9 + i * 0.16, 45, 0.03, 0.3, 0.7);  // esporas que caen mal (apagones)
m.nota(Ra + 1.9, 72, 0.04, 0.6);                                               // la que cae en tierra húmeda
for (let i = 0; i < 16; i++) m.tic(L + 0.2 + i * 0.15, 0.04, 1800);            // la cuadrícula se llena
m.nota(L + 2.9, 84, 0.07, 1.2); m.nota(L + 3.0, 88, 0.05, 1.2);                // campanita: la única que brota
for (let i = 0; i < 3; i++) m.golpe(A + 0.1 + i * 0.25, 0.2, 100);             // tres tarjetas
m.golpe(A + 1.3, 0.35, 70);                                                    // sello ≈
m.whoosh(C + 0.4, 1.0, 0.08);
for (let i = 0; i < 10; i++) m.tic(C + 0.8 + i * 0.22, 0.05, 1600 + (i % 3) * 300); // caen boletos
m.nota(C + 2.4, 69, 0.05, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
