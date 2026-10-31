// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #13 (PCR). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Datos hechos sonido: una nota más aguda por cada duplicación (2, 4, 8… hasta 30 ciclos) y la cama que sube y baja con el termómetro.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla, cruce } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot PCR base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 13);
const K = m.K;
const G = K.Gancho, Tu = K.Tu, S = K.Separar, P = K.Pegar, C = K.Copiar, D = K.Duplica, Q = K.Pregunta, Pb = K.Problema, E = K.Estudio, Tq = K.Taq, M = K.Mullis, Ci = K.Cierre, Ou = K.Outro;

// cama grave continua, sin golpe; más tensa (más aguda) con el calor
m.pad(0, S, 0.05, [45, 52, 57]);
m.pad(S, P, 0.05, [48, 55, 60]);            // 95 °C
m.pad(P, C, 0.05, [43, 50, 55]);            // 55 °C
m.pad(C, Q, 0.05, [45, 52, 57]);            // 72 °C
m.pad(Q, E, 0.05, [44, 51, 56], 0.5);       // el problema: sonido tapado
m.pad(E, Ou + 3.5, 0.05, [45, 52, 57]);     // la solución: libre

// 0 · gancho: el tubito entra, la tapa cierra, y una nota por ciclo mientras el contador sube (curva suave, como en pantalla)
m.whoosh(G, 0.7, 0.12); m.metal(G + 1.1, 0.18, 620); m.tic(G + 1.15, 0.25, 900);
for (let c = 1; c <= 30; c++) { const t = G + 1.2 + cruce(c / 30) * 3.2; m.nota(t, m.ESC[Math.min(14, Math.floor(c / 2))], 0.035, 0.25); }
// 1 · el virus suelta su ARN, se vuelve ADN y el tubito brilla
m.sube(Tu + 0.5, 1.1, 60, 67, 0.05); m.nota(Tu + 2.3, 69, 0.07, 0.8); m.nota(Tu + 2.5, 76, 0.05, 0.8);
for (let i = 0; i < 8; i++) m.nota(Tu + 3.0 + i * 0.32, 64 + i, 0.03, 0.4);
// 2–4 · capítulos: bip del termociclador al llegar a cada temperatura, cremallera, clics, una letra = un tic
m.tic(S + 0.05, 0.3, 2000); m.sube(S + 0.2, 1.0, 55, 67, 0.05); m.tic(S + 1.25, 0.3, 2600);
for (let i = 0; i < 14; i++) m.tic(S + 1.4 + i * 0.11, 0.12, 1300 + i * 30);          // la hélice se abre (cremallera)
m.tic(P + 0.05, 0.3, 2000); m.sube(P + 0.2, 1.0, 67, 55, 0.05); m.tic(P + 1.25, 0.3, 1700);
m.metal(P + 3.0, 0.12, 900); m.metal(P + 3.05, 0.12, 1000);                           // los dos iniciadores se pegan
m.tic(C + 0.05, 0.3, 2000); m.sube(C + 0.2, 0.8, 55, 60, 0.05); m.tic(C + 1.05, 0.3, 2200);
for (let i = 0; i < 11; i++) m.tic(C + 1.1 + i * 0.25, 0.1, 3000);                    // cada letra nueva
m.golpe(C + 3.9, 0.25, 110); m.nota(C + 3.9, 69, 0.07, 0.8); m.nota(C + 3.95, 76, 0.06, 0.8); // 1 → 2
// 5 · cada ciclo duplica: 1, 2, 3 despacio y luego una nota por ciclo hasta 30
m.nota(D + 0.3, 57, 0.08, 0.6); m.nota(D + 1.1, 60, 0.08, 0.6); m.nota(D + 1.8, 64, 0.08, 0.6);
for (let c = 4; c <= 30; c++) { const t = D + 2.4 + cruce((c - 3) / 27) * 1.9; m.nota(t, m.ESC[Math.min(14, Math.floor(c / 2))], 0.04, 0.25); }
m.golpe(D + 4.3, 0.3, 90);
// 6–7 · la enzima común se derrite y se rompe con el calor
m.sube(Q + 0.1, 1.4, 62, 50, 0.05); m.gota(Q + 1.6, 0.15, 500); m.gota(Q + 2.2, 0.15, 450);
for (let i = 0; i < 3; i++) m.zumbido(Pb + i * 1.25, 0.6, 0.04, 220);
m.cruje(Pb + 1.4, 0.7);
// 8 · Yellowstone: tarjeta, burbujeo del manantial, la Lupa se abre
m.golpe(E + 0.15, 0.35, 80);
for (let i = 0; i < 14; i++) m.burbuja(E + 0.6 + i * 0.22, 0.07, 450 + (i % 5) * 60);
m.whoosh(E + 3.6, 0.6, 0.14);
// 9 · la Taq vuela al tubito y aguanta 95 °C
m.whoosh(Tq + 0.4, 1.2, 0.1); m.tic(Tq + 1.6, 0.25, 1500); m.nota(Tq + 2.4, 72, 0.08, 1); m.nota(Tq + 2.45, 76, 0.07, 1);
// 10 · la carretera de noche y el Nobel
m.motor(M, 4.6, 0.05);
m.golpe(M + 2.3, 0.4, 70); m.metal(M + 2.35, 0.2, 980);
// 11 · el tubito sale brillando
m.metal(Ci + 0.2, 0.15, 620); m.sube(Ci + 0.6, 1.0, 60, 72, 0.05); m.nota(Ci + 1.4, 69, 0.07, 1.2); m.nota(Ci + 1.45, 76, 0.06, 1.2);
// outro
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
