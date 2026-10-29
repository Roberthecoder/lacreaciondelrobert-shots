// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #52 (ácido cítrico y Aspergillus niger). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Citrico base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 52);
const K = m.K;
const G = K.Gancho, An = K.Antes, Mo = K.Moho, Ce = K.Cebolla, Ta = K.Tanque, Pr = K.Pregunta, Kr = K.Krebs, Mn = K.Manganeso,
  Bo = K.Bomba, Cu = K.Currie, Pf = K.Pfizer, Ho = K.Hoy, Ci = K.Cierre, Ou = K.Outro;
const pfMitad = Pf + (Ho - Pf) * 0.5;

// cama grave continua, sin golpe, debajo de la voz
m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
// 0 · la gomita cae y suelta su polvito; el limón se tacha; aparece el moho
m.golpe(G + 0.5, 0.25, 140);
for (let i = 0; i < 12; i++) m.tic(G + 0.5 + i * 0.08, 0.05, 3200 + (i % 4) * 300);
m.whoosh(G + 1.6, 0.35, 0.12);
m.burbuja(G + 2.5, 0.1, 300);
// 1 · el barco (bocina grave) y las olas
m.nota(An + 0.2, 40, 0.08, 1.2); m.whoosh(An + 0.8, 1.6, 0.06);
// 2 · las cadenas de esporas crecen (una nota por cadena)
for (let i = 0; i < 8; i++) m.nota(Mo + 0.3 + i * 0.26, 60 + [0, 3, 5, 7, 10, 12, 15, 17][i], 0.035, 0.4);
// 3 · la cáscara de la cebolla cruje; la Lupa se abre
m.cruje(Ce + 0.3, 0.7); m.whoosh(Ce + 1.4, 0.5, 0.12);
// 4 · el tanque: pulso del agitador, burbujas y cucharadas de azúcar
for (let i = 0; i < 5; i++) m.bajo(Ta + i * 0.8, 33, 0.06, 0.5);
for (let i = 0; i < 12; i++) m.burbuja(Ta + 0.2 + i * 0.3, 0.06, 450 + (i % 5) * 80);
for (let k = 0; k < 4; k++) for (let j = 0; j < 5; j++) m.tic(Ta + 0.3 + k * 0.7 + j * 0.04, 0.04, 4200);
// 5 · pregunta
m.sube(Pr + 0.1, 1.6, 52, 64, 0.05);
// 6 · la rueda arma citrato: un pluc por pieza
for (let k = 0; k < 4; k++) m.nota(Kr + 1.4 + k * 0.9, 76, 0.05, 0.25);
// 7 · sin manganeso el citrato se amontona: plucs cada vez más seguidos
for (let i = 0; i < 22; i++) m.nota(Mn + i * 0.18, 76 + (i % 3) * 2, 0.035, 0.18);
// 8 · la bomba se prende y saca el citrato
m.metal(Bo + 0.05, 0.12, 700); m.zumbido(Bo + 0.1, 2.4, 0.05, 160);
for (let i = 0; i < 14; i++) m.gota(Bo + 0.3 + i * 0.22, 0.08, 1200);
// 9 · Currie 1917: sello de la tarjeta y los matraces que se cubren de moho
m.golpe(Cu + 0.2, 0.35, 80);
for (let i = 0; i < 4; i++) m.nota(Cu + 1.6 + i * 0.35, 64 + i * 2, 0.04, 0.5);
// 10 · la planta (motor) y la barra que sube
m.motor(Pf + 0.2, 2.5, 0.05); m.sube(pfMitad, Ho - pfMitad - 0.4, 50, 62, 0.05);
// 11 · 99 cuadritos (99 notas rápidas) + 1 distinto
for (let i = 0; i < 99; i++) m.tic(Ho + 0.8 + i * (2.2 / 99), 0.03, 1800 + (i % 10) * 60);
m.nota(Ho + 3.05, 81, 0.07, 0.6);
// 12 · cierre: brillo de la gomita
m.nota(Ci + 0.3, 69, 0.05, 1.2); m.nota(Ci + 0.6, 76, 0.04, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
