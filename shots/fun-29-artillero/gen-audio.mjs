// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #29 (hongo artillero, Sphaerobolus). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Artillero base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 29);
const K = m.K;
const G = K.Gancho, Ma = K.Mantillo, H = K.Hongo, Es = K.Estrella, Pr = K.Presion, D = K.Disparo, P = K.Pregunta, L = K.Luz, Di = K.Distancia, Pe = K.Pegada, E = K.Estudio, V = K.Viva, C = K.Cierre, Ou = K.Outro;
const LANZA = D + 4.2, E0 = E + 3.4;

m.pad(0, Ou + 3.5, 0.05, [45, 52, 57], 0.1);
[0.3, 0.85, 1.3, 1.75, 2.2].forEach((t) => { m.whoosh(G + t - 0.22, 0.2, 0.06); m.tic(G + t, 0.3, 1200); }); // ¡tac! manchitas en el coche
m.cruje(G + 2.4, 0.3);                                                         // se tacha "¿lodo?"
for (let i = 0; i < 12; i++) m.tic(Ma + 0.1 + i * 0.1, 0.12, 500 + (i % 4) * 90); // caen las astillas
for (let i = 0; i < 9; i++) m.nota(H + 0.2 + i * 0.15, m.ESC[(i * 2) % 8], 0.04, 0.4); // brotan los hongos
m.cruje(Es + 0.4, 0.35); m.sube(Es + 0.3, 2.0, 50, 57, 0.04);                 // se rasga en estrella
m.nota(Es + 2.6, 64, 0.05, 0.8);
for (let i = 0; i < 14; i++) m.gota(Pr + 0.2 + i * 0.16 + 0.9, 0.12, 700 + (i % 5) * 80); // entra el agua
m.sube(Pr + 0.4, D + 3.6 - Pr - 0.4, 40, 55, 0.05);                            // la presión sube
m.zumbido(D + 0.6, 3.6, 0.03, 120);                                            // tiembla
m.golpe(D + 3.0, 0.25, 160); m.nota(D + 3.0, 76, 0.05, 0.3);                  // el juguete de goma salta
m.golpe(LANZA, 0.6, 70); m.whoosh(LANZA, 0.5, 0.25);                           // ¡PUM!
m.sube(P + 0.1, 1.5, 52, 64, 0.05);
for (let i = 0; i < 4; i++) m.nota(L + 0.4 + i * 0.15, 69 + i * 2, 0.035, 0.4); // las copitas giran a la luz
[0, 1, 2].forEach((i) => { m.whoosh(L + 1.5 + i * 0.4, 0.9, 0.08); });          // tres tiros
[2.6, 3.0, 3.4].forEach((t) => m.tic(L + t, 0.25, 1300));                       // pegan en el coche
m.whoosh(Di + 0.4, 1.8, 0.12); m.tic(Di + 2.2, 0.3, 1300);                     // vuelo largo
m.nota(Di + 1.2, 60, 0.05, 0.8); m.nota(Di + 2.4, 67, 0.05, 0.8);              // medidores
m.golpe(Pe + 0.35, 0.3, 120); m.burbuja(Pe + 0.4, 0.1, 300);                    // splat pegajoso
m.motor(Pe + 1.8, 0.6, 0.1); m.cruje(Pe + 2.2, 0.25);                          // raspado
m.golpe(E + 0.2, 0.35, 80);                                                    // tarjeta del estudio
for (let i = 0; i < 27; i++) m.tic(E0 - 0.4 + i * 0.03, 0.06, 1800);            // aparecen las 27 parcelas
for (let i = 0; i < 4; i++) m.nota(E0 + 0.2 + i * 1.1, 57 + i * 3, 0.05, 0.7);  // año 1…4
for (let i = 0; i < 20; i++) m.tic(E0 + 0.6 + i * 0.2, 0.05, 2600);            // se llenan de bolitas
m.latido(V + 0.4, 0.2); m.latido(V + 1.5, 0.2); m.latido(V + 2.6, 0.2);         // sigue viva
for (let i = 0; i < 10; i++) m.tic(C + 0.6 + i * 0.12, 0.2, 1200);             // muchas manchitas
m.cruje(C + 0.9, 0.25); m.whoosh(C + 1.6, 1.0, 0.1); m.nota(C + 1.3, 69, 0.06, 1.2);
m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
m.guardar(OUT, 1);
