// gen-audio.mjs — cama grave + efectos del Shot IA #56 (GNoME, A-Lab y la crítica de los químicos). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Gnome base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 56);
const K = m.K;
const G = K.Gancho, Cr = K.Cristales, Gn = K.Gnome, Ro = K.Robot, P = K.Pregunta, Ct = K.Critica, Rv = K.Revueltos, Co = K.Correccion, B = K.Balance, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [41, 48, 53]);
for (let i = 0; i < 26; i++) m.gota(G + 0.1 + i * 0.1, 0.07, 1400 + (i % 6) * 160);   // cristales que caen
m.sube(G + 0.05, 3.4, 48, 72, 0.035);                                              // el contador sube a 2.2 M
m.whoosh(G + 4.0, 0.4, 0.12);                                                       // aparece la caja "estables"
m.zumbido(G + 4.6, 2.0, 0.025, 260);                                                // la lupa busca
for (let i = 0; i < 10; i++) m.tic(G + 6.6 + i * 0.08, 0.12, 1800 + i * 80);       // salen los 10
for (let i = 0; i < 10; i++) m.nota(G + 7.8 + i * 0.18, 64 + (i % 3) * 3, 0.03, 0.3); // aparece cada gemelo "≈"
m.whoosh(Cr, 0.5, 0.12); m.zumbido(Cr + 0.2, 1.0, 0.03, 340);                       // el celular se abre por dentro
m.zumbido(Gn + 0.2, 5.0, 0.02, 150);                                                // la red neuronal
m.sube(Gn + 1.8, 1.2, 50, 70, 0.04);                                                // ≈ 381 000
m.golpe(Ro + 0.2, 0.35, 80);                                                        // tarjeta 2023
m.motor(Ro + 0.6, 5.2, 0.05);                                                       // servos del brazo robot
m.sube(Ro + 2.8, 0.8, 52, 69, 0.04); m.tic(Ro + 4.0, 0.15, 1500);                   // 41 / 58 · 17 días
m.sube(P + 0.05, 1.4, 50, 62, 0.05);
m.golpe(Ct + 0.2, 0.35, 80);                                                        // tarjeta 2024
for (let i = 0; i < 3; i++) m.burbuja(Ct + 2.9 + i * 0.35, 0.12, 480 + i * 90);     // parejas «nuevo» ≈ conocido
for (let i = 0; i < 9; i++) m.tic(Ct + 5.7 + i * 0.12, 0.1, 900 + i * 60);          // pila radiactiva
m.zumbido(Ct + 6.3, 1.6, 0.03, 120);                                                // trébol
m.cruje(Rv + 2.0, 0.4);                                                             // los átomos se revuelven
m.whoosh(Co, 0.4, 0.1); m.golpe(Co + 0.9, 0.45, 60);                                // sello CORRECCIÓN
m.cruje(Co + 1.6, 0.2); m.cruje(Co + 2.2, 0.3);                                     // se tacha "novel" y 41 / 58
m.nota(Co + 2.8, 67, 0.05, 0.6); m.tic(Co + 4.4, 0.12, 1600); m.tic(Co + 5.6, 0.12, 1300);
m.metal(B + 0.2, 0.12, 700);                                                        // la balanza
for (let i = 0; i < 12; i++) m.tic(C + 1.6 + i * 0.28, 0.09, 1700 + (i % 3) * 200); // la química revisa uno por uno
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8);
m.guardar(OUT, 1);
