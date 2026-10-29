// gen-audio.mjs — cama grave + efectos del Shot Festivo #12 · Año Nuevo · Químico (colores de los fuegos artificiales). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Fuegos Artificiales base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 12);
const K = m.K, E = m.ESC;
const G = K.Gancho, Co = K.Cohete, Cl = K.Colores, Ca = K.Calor, Es = K.Escalon, H = K.Huella, P = K.Pregunta, A = K.Azul, Et = K.Estudio, Cs = K.Cesio, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;

// cohete: silbido que sube (dur s) y estallido con chisporroteo
const sube = (t, d = 0.6, g = 0.05) => { m.whoosh(t - d, d, 0.12); m.sube(t - d, d, 72, 88, g); };
const truena = (t, g = 0.4, nota) => { m.golpe(t, g, 70); m.cruje(t + 0.05, 0.45); if (nota) { m.nota(t + 0.05, nota, 0.06, 1.0); m.nota(t + 0.05, nota + 12, 0.035, 1.0); } };

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
sube(G + 0.6, 0.8); truena(G + 0.6, 0.45, 69);                               // el rojo del gancho
m.tic(G + 1.7, 0.4, 900);                                                    // se tacha «¿pintura?»
sube(G + 2.1, 0.7); truena(G + 2.1, 0.25, 64);
m.whoosh(Co + 0.3, 1.2, 0.08); for (let i = 0; i < 10; i++) m.tic(Co + 0.4 + i * 0.12, 0.08, 1400 + i * 120); // se abre el corte y aparecen las bolitas
for (let i = 0; i < 16; i++) m.tic(Co + 2.0 + i * 0.09, 0.05, 3000 + (i % 3) * 300);  // mecha chispeando
const cl = [0.15, 1.15, 2.0, 2.8, 3.9];
cl.forEach((d, i) => { sube(Cl + d, 0.45, 0.04); truena(Cl + d, 0.3, E[4 + i * 2]); }); // cinco colores, cinco notas
m.motor(Ca + 0.3, 4.2, 0.06);                                                // las flamas
m.sube(Ca + 2.2, 0.8, 60, 72, 0.06);                                         // el electrón brinca
for (const [u, b] of [[Es + 0.4, Es + 2.0], [Es + 2.9, Es + 3.9]]) { m.sube(u, 0.6, 57, 69, 0.06); m.nota(b + 0.22, 81, 0.07, 0.7); m.metal(b + 0.22, 0.06, 1800); } // sube… baja = luz
[[H + 0.7, 76], [H + 1.7, 81], [H + 2.7, 88]].forEach(([t, n]) => { m.nota(t + 0.22, n, 0.07, 0.8); m.metal(t + 0.22, 0.05, 1200 + n * 10); }); // escalón chico, mediano, grande
m.sube(P + 0.1, 1.6, 52, 64, 0.05); m.nota(P + 0.3, 58, 0.05, 1.4); m.nota(P + 0.3, 63, 0.04, 1.4); // azul deslavado: acorde agrio
m.nota(A + 0.2, 74, 0.06, 1.2); m.nota(A + 0.2, 81, 0.04, 1.2);              // brilla el CuCl
m.motor(A + 2.6, 2.4, 0.07); m.sube(A + 2.6, 2.2, 50, 62, 0.04);              // sube el calor
m.golpe(A + 4.9, 0.4, 110); m.cruje(A + 4.95, 0.5);                          // ¡crack! se rompe
for (let i = 0; i < 5; i++) m.nota(A + 5.3 + i * 0.25, E[8 - i], 0.04, 0.6, 0.7); // el azul se deslava (tapado)
m.golpe(Et + 0.2, 0.3, 80); m.metal(Et + 0.25, 0.08, 1500);                  // tarjeta 1860
m.zumbido(Et + 2.6, 5.4, 0.03, 150);                                          // el mechero
[[Et + 3.1, 72], [Et + 4.5, 76], [Et + 6.0, 79]].forEach(([t, n]) => { m.nota(t, n, 0.06, 0.8); for (let i = 0; i < 4; i++) m.tic(t + i * 0.12, 0.05, 2400); }); // cada huella de líneas
m.whoosh(Cs + 0.2, 0.7, 0.1); for (let i = 0; i < 6; i++) m.gota(Cs + 0.9 + i * 0.12, 0.12, 700); // se vacía el agua
for (let i = 0; i < 10; i++) m.burbuja(Cs + 1.0 + i * 0.13, 0.07, 350 + (i % 4) * 60); // se evapora
m.nota(Cs + 2.4, 84, 0.07, 1.0); m.nota(Cs + 2.55, 86, 0.06, 1.0);           // dos líneas azules nuevas
m.metal(Cs + 2.7, 0.06, 2000);
m.sube(D + 0.0, 0.35, 72, 86, 0.03); m.tic(D + 0.35, 0.4, 4000);             // destello (sin ruido: la luz llega ya)
for (let i = 0; i < 3; i++) m.tic(D + 0.6 + i * 0.9, 0.25, 1500);             // 1, 2, 3
m.golpe(D + 3.3, 0.5, 60); m.cruje(D + 3.35, 0.3);                           // ¡pum! retrasado
m.nota(D + 3.7, 69, 0.05, 0.8);
truena(Ci + 0.15, 0.4, 69); [0.7, 1.2, 1.7, 2.2].forEach((d, i) => truena(Ci + d, 0.22, E[6 + i])); // todos los colores
for (let i = 0; i < 6; i++) m.nota(Ci + 2.8 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
