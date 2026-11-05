// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #75 (Giberelinas). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Forma (maestro/recetas/composicion-musical.md): A tensa en menor (el arroz enfermo) → B del laboratorio (pregunta-respuesta)
// → C luminosa en mayor (la uva) → D que crece (tanque y California) → regreso del motivo del inicio, ya resuelto en mayor.
// Los acordes cambian cada 2–4 s y el motivo nunca se repite igual más de dos veces.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Giberelinas base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 75);
const K = m.K;
const G = K.Gancho, H = K.Hongo, S = K.Sintomas, Ku = K.Kurosawa, Y = K.Yabuta, F = K.Freno, P = K.Pregunta, Se = K.Semilla,
  E = K.Estudio, Ce = K.Celulas, Ta = K.Tanque, Ca = K.California, C = K.Cierre, Ou = K.Outro;

// cama: lista de [inicio, acorde, tapa]; cada acorde dura hasta el siguiente (con un traslape corto)
const acordes = (lista, fin, g = 0.05) => lista.forEach(([t, notas, tapa = 0], i) => m.pad(t, (i + 1 < lista.length ? lista[i + 1][0] : fin) + 0.25, g, notas, tapa));
// motivo: notas [semitono, duración en tiempos] a partir de t, a "bpm" (frases compuestas, no al azar)
const frase = (t, notas, bpm = 100, g = 0.045, tapa = 0) => { let u = t; for (const [mm, d] of notas) { if (mm) m.nota(u, mm, g, d * 60 / bpm * 1.6, tapa); u += d * 60 / bpm; } return u; };

const Am = [45, 52, 57], F7 = [41, 48, 57], Dm = [38, 50, 57], E7 = [40, 52, 56], CM = [48, 55, 60], Gm = [43, 55, 59], Fm = [41, 53, 57], A = [45, 52, 61];

// A · el arroz enfermo (menor, algo ahogado)
acordes([[0, Am, 0.2], [H, F7, 0.2], [S, Dm, 0.25], [S + 2.4, E7, 0.25]], Ku);
// B · el laboratorio (se aclara: ii–V–I–vi)
acordes([[Ku, Dm, 0.1], [Ku + 2.7, Gm, 0.1], [Y, CM, 0], [F, Am, 0.15], [F + 2.8, E7, 0.1]], P);
// C · la uva (mayor, luminosa)
acordes([[P, F7, 0], [Se, CM, 0], [E, Gm, 0], [E + 3.8, Am, 0], [Ce, Fm, 0]], Ta, 0.055);
// D · crece (tanque y California)
acordes([[Ta, Dm, 0], [Ta + 2.0, Gm, 0], [Ca, CM, 0], [Ca + 2.4, E7, 0]], C, 0.055);
// regreso: el acorde del inicio, ya resuelto en mayor
acordes([[C, Am, 0], [C + 2.6, F7, 0], [Ou, A, 0]], Ou + 3.5, 0.05);

// motivo del inicio (pregunta, torcido como la plántula que crece de más) y sus variaciones
frase(G + 0.9, [[69, 1], [72, 1], [71, 1.5], [0, 0.5], [68, 2]], 96, 0.04, 0.2);
frase(S + 0.5, [[64, 1], [67, 1], [66, 1.5], [0, 0.5], [63, 2]], 96, 0.035, 0.25);       // secuencia, una cuarta abajo
frase(Ku + 0.6, [[62, 0.5], [65, 0.5], [69, 1], [0, 1], [67, 0.5], [71, 0.5], [74, 1]], 104, 0.035); // pregunta-respuesta del laboratorio
frase(Y + 0.4, [[72, 1], [76, 1], [79, 2]], 104, 0.04);                                     // se resuelve: «la llamó giberelina»
frase(F + 0.5, [[69, 0.5], [71, 0.5], [72, 0.5], [74, 0.5], [76, 2]], 112, 0.03);          // la célula se estira (sube)
frase(Se + 0.3, [[72, 1], [74, 1], [76, 1.5], [0, 0.5], [79, 1], [76, 2]], 100, 0.035);   // el motivo, ahora en mayor
frase(E + 4.0, [[67, 0.5], [71, 0.5], [74, 0.5], [79, 1.5], [0, 0.5], [78, 0.5], [79, 2]], 108, 0.035);
frase(Ca + 2.6, [[72, 0.5], [76, 0.5], [79, 0.5], [84, 2], [0, 0.5], [83, 0.5], [79, 1.5]], 112, 0.035);
frase(C + 0.8, [[69, 1], [72, 1], [71, 1.5], [0, 0.5], [73, 3]], 96, 0.04);                  // regreso del motivo: termina en la tercera MAYOR

// efectos, en el mismo cuadro de cada evento
m.burbuja(G + 0.2, 0.18, 260); m.nota(G + 0.5, 81, 0.05, 0.5);                    // «pop» de la uva que se infla
m.whoosh(G + 2.6, 0.4, 0.06); m.tic(G + 3.0, 0.15, 1200);                          // uva partida, chip
m.whoosh(H + 0.4, 0.7, 0.07); m.zumbido(H + 0.6, 2.4, 0.03, 160);                  // se abre la lupa al microscopio
m.sube(S + 0.2, 2.4, 43, 55, 0.035);                                               // la plántula se estira
for (let i = 0; i < 6; i++) m.tic(S + 0.4 + i * 0.35, 0.08, 900 + i * 120);        // crujido del tallo que crece
m.golpe(S + 3.0, 0.3, 70);                                                         // tache en la espiga vacía
m.golpe(Ku + 0.2, 0.3, 80);                                                        // tarjeta 1926
for (let i = 0; i < 6; i++) m.gota(Ku + 1.6 + i * 0.17, 0.12, 800 + i * 40);       // el caldo pasa por el filtro
[0, 0.5, 1.0].forEach((d) => m.whoosh(Ku + 2.9 + d, 0.35, 0.09));                  // ssss del atomizador (×3)
m.sube(Ku + 3.2, 1.6, 48, 57, 0.03);                                               // el arroz sano también se estira
m.golpe(Y + 0.2, 0.3, 80);
for (let i = 0; i < 9; i++) m.tic(Y + 0.5 + i * 0.08, 0.1, 3200 + (i % 3) * 400); // tintineo de cristales
[0, 1, 2, 3].forEach((i) => m.nota(Y + 0.9 + i * 0.33, 76 + i * 2, 0.025, 0.4));  // se dibujan los 4 anillos
for (let i = 0; i < 6; i++) m.metal(F + 1.7 + i * 0.2, 0.06, 1400 + i * 90);      // clic de cada candado DELLA que se rompe
m.sube(F + 2.7, 1.9, 50, 62, 0.03);                                                // la célula se alarga
m.sube(P + 0.1, 1.5, 52, 64, 0.04); m.tic(P + 0.2, 0.15, 900);                     // re-gancho
m.whoosh(Se + 0.1, 0.5, 0.06); m.whoosh(Se + 0.5, 0.5, 0.06);                      // se abren las dos uvas
for (let i = 0; i < 5; i++) m.nota(Se + 0.7 + i * 0.1, 84 + (i % 3) * 3, 0.02, 0.3); // brillitos de giberelina
m.golpe(E + 0.2, 0.3, 80); m.gota(E + 1.0, 0.15, 600);                              // tarjeta 2009 y punto en Alicante
m.golpe(E + 2.4, 0.25, 120);                                                        // báscula
[0, 0.45, 0.9, 1.35].forEach((d) => m.whoosh(E + 2.85 + d, 0.3, 0.07));            // atomizador
m.sube(E + 3.4, 2.0, 55, 67, 0.03);                                                 // la uva crece en la báscula
m.whoosh(Ce, 0.6, 0.06);
for (let i = 0; i < 20; i++) m.tic(Ce + 0.2 + i * 0.04, 0.05, 1500);                // 20 células (sin tratar)
for (let i = 0; i < 20; i++) m.tic(Ce + 0.6 + i * 0.04, 0.05, 1300);                // 20 células (con GA3): el mismo número
m.motor(Ta, 4.0, 0.05);                                                             // el tanque gira
for (let i = 0; i < 10; i++) m.burbuja(Ta + 0.3 + i * 0.37, 0.07, 380 + (i % 4) * 70); // burbujeo
for (let i = 0; i < 6; i++) m.gota(Ta + 1.45 + i * 0.35, 0.1, 900);                // gotas al vial
m.golpe(Ca + 0.1, 0.3, 80); m.golpe(Ca + 2.0, 0.3, 100);                            // tarjeta 1957 y «1962»
for (let i = 0; i < 16; i++) m.gota(Ca + 2.4 + i * 0.11, 0.05, 1500 + (i % 4) * 150); // rocío sobre el viñedo
m.whoosh(C + 0.6, 0.5, 0.05);
for (let i = 0; i < 6; i++) m.gota(C + 1.6 + i * 0.12, 0.07, 1100 + i * 60);        // gotitas doradas sobre el racimo
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 61, 0.05, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.6, 69, 0.04, 2.5);
m.guardar(OUT, 1);
