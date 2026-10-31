// gen-audio.mjs — cama grave + efectos del Shot IA #59 (el robot STAR que cose intestino). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cirugia base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 59);
const K = m.K;
const G = K.Gancho, Pl = K.Planea, Co = K.Cose, E = K.Estudio, Pa = K.Parejas, P = K.Pregunta, F = K.Falla, V = K.Vesicula, Fa = K.Falta, C = K.Cierre, Ou = K.Outro;
const F2 = F + (V - F) * 0.57;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
for (let i = 0; i < 9; i++) m.nota(G + 0.05 + i * 0.9, 81, 0.025, 0.15);           // bip de monitor
m.whoosh(G + 0.1, 0.6, 0.1);                                                        // los dos extremos se juntan
for (let i = 0; i < 7; i++) m.tic(G + 0.3 + i * 0.67, 0.12, 1700);                   // cada puntada
m.golpe(G + 1.5, 0.25, 90);                                                         // se tacha "lo cosió un cirujano"
m.motor(G + 1.6, 0.9, 0.05);                                                        // entra el brazo
m.whoosh(Pl - 0.2, 0.5, 0.12); m.zumbido(Pl + 0.4, 4.6, 0.025, 200);                // escáner 3D
m.sube(Pl + 1.6, 2.4, 50, 55, 0.025);                                                // respiración
for (let i = 0; i < 7; i++) m.burbuja(Pl + 3.0 + i * 0.22, 0.08, 700 + i * 40);       // puntos del plan
m.nota(Co + 1.2, 76, 0.06, 0.3); m.nota(Co + 1.25, 81, 0.05, 0.4);                   // botón "aprobar"
for (let i = 0; i < 7; i++) m.tic(Co + 2.2 + i * 0.51, 0.13, 1600);                  // el robot cose
m.golpe(E + 0.2, 0.3, 80);
for (let i = 0; i < 4; i++) m.burbuja(E + 1.6 + i * 0.25, 0.1, 300 + i * 30);          // 4 cerditos
for (let i = 0; i < 11; i++) m.tic(Pa + 0.5 + i * 0.12, 0.08, 1300 + (i % 3) * 400);  // puntadas disparejas
for (let i = 0; i < 11; i++) m.tic(Pa + 1.6 + i * 0.12, 0.08, 1800);                  // puntadas parejas
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
for (let i = 0; i < 29; i++) m.tic(F + 1.6 + i * 0.09, 0.07, 2200);                   // 29 puntadas corregidas
m.whoosh(F2, 0.4, 0.1); m.sube(F2 + 0.3, 1.2, 50, 74, 0.04); m.sube(F2 + 1.2, 1.2, 50, 60, 0.04);  // barras de tiempo
m.golpe(V + 0.2, 0.3, 80);
for (let i = 0; i < 8; i++) { const t0 = V + 3.6 + i * 0.6; m.metal(t0 + 0.05, 0.05, 1500); m.metal(t0 + 0.25, 0.05, 1500); m.tic(t0 + 0.45, 0.14, 3200); m.nota(t0 + 0.6, 79, 0.03, 0.25); }  // clic de clip, clic, tijeretazo, palomita
m.golpe(Fa + 0.3, 0.25, 70); m.gota(Fa + 1.8, 0.18, 700); m.zumbido(Fa + 2.6, 1.2, 0.02, 150);
m.whoosh(C + 1.0, 0.6, 0.1);
for (let i = 0; i < 4; i++) m.nota(C + 1.2 + i * 0.9, 81, 0.025, 0.15);
m.nota(C + 2.0, 72, 0.06, 0.8); m.nota(C + 2.05, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
