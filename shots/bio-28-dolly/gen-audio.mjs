// gen-audio.mjs — cama grave + efectos del Shot Biotecnológico #28 (Dolly). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Dolly base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 28);
const K = m.K;
const G = K.Gancho, D = K.Dolly, U = K.Ubre, Ov = K.Ovulo, Ch = K.Chispa, P = K.Pregunta, Ol = K.Olvido, E = K.Estudio, R = K.Rasgos, Pa = K.Parton, Cl = K.Clones, C = K.Cierre, O = K.Outro;
const chDur = P - Ch, ch2 = Ch + chDur * 0.47, pulso = Ch + 2.0;

// cama grave continua, sin golpe; se abre (sube) cuando el núcleo "olvida" y vuelve a leer el manual
m.pad(0, Ol, 0.05, [45, 52, 57]);
m.pad(Ol, Cl, 0.05, [47, 54, 59]);
m.pad(Cl, C, 0.045, [45, 52, 57]);
m.pad(C, O + 3.5, 0.05, [47, 54, 59]);

// 0 · gancho
m.zumbido(G + 0.15, 0.7, 0.05, 290);                                                   // balido suave de la oveja
for (let t = 0.1; t < 1.6; t += 0.2) m.burbuja(G + t, 0.05, 700);                       // el espermatozoide nada
m.golpe(G + 1.8, 0.3, 90);                                                              // tache
m.burbuja(G + 2.4, 0.14, 420); m.nota(G + 2.5, 69, 0.06, 0.8);                           // aparece la célula de ubre
m.whoosh(G + 2.8, 0.5, 0.12);                                                           // flecha a la oveja
// 1 · Dolly en Roslin
m.tic(D + 0.3, 0.2, 1400); m.tic(D + 0.7, 0.2, 1500); m.tic(D + 1.1, 0.2, 1400);        // pasitos de la oveja
m.metal(D + 1.2, 0.08, 900);                                                            // la placa del collar
// 2 · la ubre por dentro y el cultivo sin suero
m.whoosh(U + 0.3, 0.7, 0.18);                                                           // la Lupa se abre
for (let k = 0; k < 4; k++) m.gota(U + 0.9 + k * 0.4, 0.1, 1000 + k * 60);              // gotitas de leche en los alveolos
m.metal(U + 2.8, 0.12, 700);                                                            // la placa de cultivo
m.sube(U + 3.4, 1.0, 64, 52, 0.05);                                                     // el suero baja de 10 % a 0.5 %
m.tic(U + 4.6, 0.3, 900);                                                               // pausa: las células se quedan quietas
// 3 · el óvulo pierde su núcleo
m.tic(Ov + 1.5, 0.2, 2600);                                                             // la aguja toca la zona
m.sube(Ov + 1.6, 0.7, 60, 74, 0.05); m.burbuja(Ov + 1.9, 0.12, 300);                    // sorbido del núcleo
m.nota(Ov + 2.5, 57, 0.06, 1.0);
// 4–5 · la célula de ubre, la chispa, la fusión y las divisiones
m.whoosh(Ch + 0.2, 0.8, 0.12);                                                          // la célula de ubre se acerca
m.zumbido(pulso - 0.1, 0.6, 0.1, 120); m.cruje(pulso, 0.9); m.golpe(pulso + 0.02, 0.3, 140); // zap eléctrico
m.sube(pulso + 0.3, 1.1, 57, 69, 0.05);                                                 // se funden y el óvulo despierta
[[ch2 + 1.0, 60], [ch2 + 2.2, 64], [ch2 + 3.2, 67]].forEach(([t, n]) => { m.burbuja(t, 0.14, 380); m.nota(t + 0.05, n, 0.06, 0.8); }); // 2 → 4 → 8
// 6 · re-gancho
m.sube(P + 0.2, 1.2, 52, 59, 0.05);
// 7 · el manual: cada capítulo que se desbloquea
m.whoosh(Ol + 0.1, 0.7, 0.18);
for (let i = 1; i <= 5; i++) { const t = Ol + 1.2 + ((i - 1) / 5) * 2.4 + 0.2; m.metal(t, 0.07, 1100); m.nota(t + 0.02, 62 + i * 2, 0.05, 0.6); }
// 8 · el estudio: 277 → 29 → 1
m.golpe(E + 0.1, 0.32, 80);                                                             // la tarjeta
m.whoosh(E + 1.8, 0.4, 0.12);                                                           // aparecen las 277
for (let k = 0; k < 29; k++) m.tic(E + 2.5 + k * 0.03, 0.05, 2000 + (k % 5) * 90);       // 29 tics: quedan 29 embriones
m.nota(E + 3.45, 76, 0.08, 1.6);                                                        // una nota limpia: una corderita
// 9 · el ADN del núcleo
m.sube(R + 0.6, 0.8, 60, 67, 0.04);                                                     // la hebra crece
m.golpe(R + 1.6, 0.28, 100);                                                            // ✗ con la madre sustituta
m.tic(R + 2.4, 0.15, 1800);
// 10 · Dolly Parton: acorde de guitarra y notitas
[64, 68, 71, 76].forEach((n, i) => m.nota(Pa + 0.5 + i * 0.06, n, 0.05, 1.4));
for (let i = 0; i < 6; i++) m.nota(Pa + 0.6 + i * 0.5, [72, 76, 79][i % 3], 0.035, 0.4);
// 11 · 2003 y los clones de 2016
m.nota(Cl + 0.3, 45, 0.07, 1.6, 0.6);
m.golpe(Cl + 1.9, 0.32, 80);
for (let i = 0; i < 4; i++) m.burbuja(Cl + 1.8 + i * 0.2, 0.1, 480 + i * 40);           // aparecen Debbie, Denise, Dianna y Daisy
m.tic(Cl + 2.6, 0.18, 2200); m.tic(Cl + 2.8, 0.18, 2400);                               // ✓ ✓
// 12 · cierre y marca
m.nota(C + 0.8, 69, 0.06, 1.2); m.nota(C + 1.1, 76, 0.05, 1.2);
m.nota(O + 0.3, 57, 0.08, 2.8); m.nota(O + 0.3, 64, 0.06, 2.8); m.nota(O + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
