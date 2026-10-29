// gen-audio.mjs — cama grave + efectos del Shot IA #17 (energía y agua de una pregunta a una IA). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot EnergiaPregunta base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 17);
const K = m.K;
const G = K.Gancho, E = K.Estudio, I = K.Incluye, B = K.Baja, P = K.Pregunta, O = K.Ojo, S = K.Suma, A = K.AIE, R = K.Razones, C = K.Cierre, Ou = K.Outro;
const L6 = O + 5.9, L9 = A + 7.7;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
m.tic(G + 0.15, 0.25, 1800); m.whoosh(G + 0.45, 0.5, 0.12);                       // enviar + rayo
m.zumbido(G + 0.9, 0.5, 0.05, 120);                                               // la tele se enciende
for (let k = 1; k <= 9; k++) m.tic(G + 1.1 + k * 2.5 / 9, 0.12, 1500);             // 9 segundos
for (let k = 0; k < 5; k++) m.gota(G + 4.4 + k * 0.32 + 0.4, 0.22, 900 + k * 60);   // 5 gotas
m.golpe(E + 0.1, 0.35, 80); m.sube(E + 2.4, 1.0, 50, 70, 0.04);                    // tarjeta + 0.24 Wh
m.nota(E + 3.4, 69, 0.05, 0.5); m.nota(E + 3.8, 64, 0.05, 0.5);
m.whoosh(I - 0.3, 0.5, 0.1); m.zumbido(I + 0.2, 4.4, 0.02, 160);                  // servidores
m.sube(I + 0.7, 0.8, 52, 64, 0.04); m.sube(I + 1.6, 1.8, 64, 74, 0.04); m.motor(I + 2.6, 2.0, 0.05);  // barra + ventilador
m.nota(I + 3.2, 76, 0.05, 0.6);
m.sube(B + 1.0, 1.4, 74, 48, 0.05); m.golpe(B + 2.2, 0.35, 70);                    // la barra se encoge, ÷33
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 9; i++) m.burbuja(O + 0.3 + i * 0.12, 0.1, 400 + i * 60);      // burbujas
m.nota(O + 1.8, 72, 0.06, 0.6); m.golpe(O + 3.9, 0.25, 90);
m.whoosh(L6, 0.4, 0.1); m.cruje(L6 + 0.9, 0.25); m.cruje(L6 + 1.3, 0.25);           // tachones
for (let i = 0; i < 40; i++) m.tic(S + 0.2 + i * 0.075, 0.04, 2000 + (i % 6) * 150); // cuadritos
for (let i = 0; i < 12; i++) m.tic(A + 0.6 + i * 0.25, 0.06, 1300 + i * 40);       // luces del planeta
m.sube(A + 3.0, 1.4, 50, 70, 0.04); m.sube(A + 5.4, 1.4, 50, 69, 0.04);             // barras 2030 / Japón
m.golpe(L9, 0.5, 60);                                                             // sello PROYECCIÓN
m.whoosh(R - 0.3, 0.5, 0.1); m.nota(R + 3.2, 72, 0.06, 0.7); m.nota(R + 3.25, 76, 0.05, 0.7);
m.tic(C + 0.15, 0.25, 1800); m.whoosh(C + 0.45, 0.5, 0.12); m.zumbido(C + 0.9, 0.5, 0.05, 120);
m.whoosh(C + 2.4, 1.2, 0.12); for (let i = 0; i < 20; i++) m.tic(C + 2.6 + i * 0.07, 0.05, 1600 + (i % 4) * 200);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
