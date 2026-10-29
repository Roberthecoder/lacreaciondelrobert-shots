// gen-audio.mjs — cama grave + efectos del Shot IA #54 (Nobel de Física 2024: imanes → memoria → máquina de Boltzmann). Todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot NobelFisica base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 54);
const K = m.K;
const G = K.Gancho, P = K.Premio, I = K.Imanes, X = K.Pixeles, V = K.Valle, Q = K.Pregunta, B = K.Boltzmann, Ta = K.Tamano, A = K.Aviso, C = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
for (let k = 0; k < 14; k++) m.tic(G + 0.1 + k * 0.1, 0.06, 1500 + (k % 4) * 200);   // flechitas que giran
for (let k = 0; k < 10; k++) m.metal(G + 1.6 + k * 0.17, 0.05, 700 + k * 40);       // se alinean (clic magnético)
m.whoosh(G + 3.5, 0.4, 0.14); m.metal(G + 4.2, 0.22, 660); m.nota(G + 4.2, 69, 0.05, 1.2); // cae la medalla
m.whoosh(P, 0.5, 0.12); m.golpe(P + 0.2, 0.25, 90); m.golpe(P + 1.2, 0.25, 90);       // retratos
m.nota(P + 2.2, 64, 0.04, 0.6);
for (let k = 0; k < 8; k++) m.metal(I + 0.7 + k * 0.38, 0.06, 760 + k * 30);         // la alineación se contagia
m.golpe(X + 0.1, 0.3, 80);                                                            // tarjeta 1982
for (let k = 0; k < 20; k++) m.tic(X + 1.6 + k * 0.08, 0.06, 2200 + (k % 3) * 150);   // flechas → pixeles
m.zumbido(X + 2.8, 1.6, 0.03, 220);                                                   // conexiones
m.sube(V + 0.4, 2.0, 64, 52, 0.04); m.nota(V + 1.6, 67, 0.05, 0.6);                   // guardar: la energía baja
m.cruje(V + 2.9, 0.4);                                                                // la imagen se rompe
for (let k = 0; k < 25; k++) m.tic(V + 3.6 + (k + 1) * 4.6 / 25, 0.07, 2600 - k * 40); // pixeles que se arreglan
m.sube(V + 3.6, 4.6, 62, 48, 0.035);                                                  // la pelota rueda al valle
m.nota(V + 8.3, 72, 0.06, 0.8); m.nota(V + 8.35, 76, 0.05, 0.8);
m.sube(Q + 0.05, 1.4, 50, 62, 0.05);
for (let k = 0; k < 16; k++) m.burbuja(B + 0.2 + k * 0.17, 0.06, 380 + (k % 5) * 70); // bolitas de gas
m.zumbido(B + 2.8, 1.6, 0.03, 180); m.nota(B + 4.4, 64, 0.05, 0.6);                   // el gas se vuelve red
for (let k = 0; k < 3; k++) m.burbuja(B + 5.3 + k * 0.45, 0.12, 700); // gatitos
m.whoosh(B + 6.2, 0.35, 0.12);                                                        // se tacha "instrucciones"
m.golpe(Ta + 0.5, 0.25, 90);
m.whoosh(Ta + 2.9, 1.0, 0.18); m.sube(Ta + 2.9, 1.2, 48, 76, 0.05);                   // la red gigante
m.golpe(Ta + 3.4, 0.35, 70);
m.golpe(A + 0.5, 0.45, 55); m.pad(A, C, 0.03, [41, 48]);                              // el aviso
m.sube(C + 0.5, 2.0, 52, 64, 0.03);
for (let k = 0; k < 10; k++) m.metal(C + 0.6 + k * 0.15, 0.04, 800 + k * 30);
m.nota(C + 2.6, 72, 0.06, 0.8); m.nota(C + 2.65, 76, 0.05, 0.8);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
