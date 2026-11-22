// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #99 (la abeja que necesita un hongo). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama grave y cálida (zumbido suave de colmena) con progresión por sección (i–VI–III · iv–V · i–VII · VI–III · iv–V · VI–VII → i)
// y un motivo corto de 4 notas que suena en el gancho, regresa en el giro (levadura) y cierra el video.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Abeja Hongo base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 99);
const K = m.K;
const G = K.Gancho, N = K.Nombre, Ce = K.Celda, H = K.Huevo, Ho = K.Hongo, Co = K.Come, P = K.Pregunta, E = K.Estudio, R = K.Resultado,
  Er = K.Ergosterol, Pu = K.Pupa, L = K.Levadura, Mx = K.Mexico, C = K.Cierre, Ou = K.Outro;

// --- cama: un acorde por tramo, con conducción de voces (cada voz se mueve a la nota más cercana) ---
const AC = { Am: [45, 52, 57, 60], F: [41, 48, 53, 57], C: [43, 48, 52, 55], Dm: [38, 50, 53, 57], E: [40, 52, 56, 59], G: [43, 50, 55, 59], Esus: [40, 52, 57, 59] };
const tramos = [[0, N, 'Am'], [N, Ce, 'F'], [Ce, H, 'C'], [H, Ho, 'F'], [Ho, Co, 'Dm'], [Co, P, 'E'], [P, E, 'Esus'], [E, R, 'Am'], [R, Er, 'G'],
  [Er, Pu, 'F'], [Pu, L, 'C'], [L, Mx, 'Dm'], [Mx, Mx + (C - Mx) / 2, 'F'], [Mx + (C - Mx) / 2, C, 'G'], [C, Ou + 3.6, 'Am']];
for (const [a, b, ch] of tramos) m.pad(Math.max(0, a - 0.25), b + 0.25, ch === 'Dm' || ch === 'E' ? 0.05 : 0.055, AC[ch], ch === 'Dm' ? 0.25 : 0);
// pulso suave de bajo en la raíz de cada tramo (respira, no golpea)
for (const [a, b, ch] of tramos) for (let t = a + 0.05; t < b - 0.3; t += 1.6) m.bajo(t, AC[ch][0], 0.05, 1.2);
// zumbido de colmena muy bajito durante las escenas del panal
m.zumbido(G, N - G, 0.02, 180); m.zumbido(C, Ou - C, 0.02, 180);

// --- motivo (la, do, mi, re): gancho, giro y cierre ---
const motivo = (t, sube = 0, g = 0.05) => [69, 72, 76, 74].forEach((n, i) => m.nota(t + i * 0.28, n + sube, g, 0.9));
motivo(G + 0.15);
motivo(L + 1.5, 0, 0.045);
motivo(C + 2.2, 0, 0.05); m.nota(C + 3.4, 69, 0.05, 1.6);

// --- efectos, en el mismo cuadro de lo que pasa ---
m.whoosh(G + 0.2, 1.1, 0.1);                                                    // la cámara entra a la celdita
m.cruje(G + 2.3, 0.35); m.golpe(G + 2.35, 0.3, 80);                             // se tacha "¿se echó a perder?"
m.nota(G + 2.6, 64, 0.04, 0.6); m.nota(G + 3.0, 67, 0.04, 0.6);                 // etiquetas
m.zumbido(N + 0.1, 2.4, 0.05, 210);                                             // la obrera sale caminando
m.nota(N + 0.2, 60, 0.04, 0.6); m.nota(N + 0.8, 64, 0.04, 0.6); m.nota(N + 1.6, 67, 0.035, 0.6);
for (let t = Ce + 0.5; t < Ce + 3.0; t += 0.35) m.gota(t + 0.3, 0.12, 700);    // gotas de alimento
m.sube(Ce + 0.5, 2.6, 48, 55, 0.03);                                            // sube el nivel
m.zumbido(H, 1.2, 0.04, 170); m.pop ? m.pop(H + 0.8, 0.2) : m.burbuja(H + 0.8, 0.18, 600); // llega la reina · el huevo
m.zumbido(H + 1.7, 1.2, 0.03, 220);
for (let i = 0; i < 6; i++) m.tic(H + 2.0 + i * 0.15, 0.06, 900 + i * 40);       // sellan con cera
m.whoosh(Ho - 0.2, 0.8, 0.08);                                                  // entramos "por dentro"
for (let i = 0; i < 3; i++) m.tic(Ho + 0.3 + i * 0.57, 0.12, 1800);             // día 1, 2, 3
m.burbuja(Ho + 2.1, 0.12, 400);                                                 // sale la larva del huevo
for (let i = 0; i < 16; i++) m.tic(Ho + 1.6 + i * 0.16, 0.035, 3200 + (i % 4) * 300); // la pelusa crece (cosquilleo agudo)
for (let i = 0; i < 12; i++) m.tic(Co + 0.4 + i * 0.22, 0.07, 1300 + (i % 2) * 200); // mordiditas
m.sube(P + 0.1, 1.5, 52, 64, 0.045);                                            // ¿y si le quitas el hongo?
m.golpe(P + 0.85, 0.25, 90);                                                    // la X roja
m.golpe(E + 0.2, 0.3, 80);                                                      // tarjeta 2015
for (let i = 0; i < 40; i++) m.gota(E + 0.3 + i * 0.0725, 0.05, 1100 + (i % 5) * 80); // la pipeta llena los pozos
for (let i = 0; i < 25; i++) m.tic(R + 0.2 + i * 0.032, 0.04, 2000);             // aparecen los pozos
m.latido(R + 1.4, 0.14); m.latido(R + 1.9, 0.1);                               // las larvas sin hongo se apagan
m.sube(R + 2.0, 0.9, 55, 67, 0.04); m.golpe(R + 2.9, 0.25, 75);                  // 76 % y 8 %
m.golpe(Er + 0.2, 0.3, 80);                                                     // tarjeta 2018
m.whoosh(Er + 2.1, 0.7, 0.07);                                                  // al microscopio
for (let i = 0; i < 6; i++) m.burbuja(Er + 2.8 + i * 0.1, 0.07, 700 + i * 60);    // gotitas de grasa
m.nota(Er + 3.5, 76, 0.045, 1.0); m.nota(Er + 3.6, 81, 0.035, 1.0);             // brilla el ergosterol
m.whoosh(Pu + 0.4, 0.5, 0.05); m.whoosh(Pu + 1.0, 0.5, 0.05);                   // flechas
m.sube(Pu + 1.6, 0.8, 57, 64, 0.04);                                            // larva → pupa
for (let i = 0; i < 3; i++) m.nota(Pu + 2.2 + i * 0.35, [67, 65, 52][i], 0.04, 0.5); // barras 71 · 65 · 8
m.cruje(L + 1.0, 0.35); m.golpe(L + 1.05, 0.3, 70);                              // se tacha "moho"
for (let i = 0; i < 14; i++) m.burbuja(L + 0.25 + i * 0.17, 0.05, 450 + i * 25);  // brotan las levaduras en cadena
for (let i = 0; i < 10; i++) m.tic(Mx + 0.8 + i * 0.16, 0.06, 1500 + i * 70);    // los estados en el mapa
m.whoosh(C, 0.8, 0.08); m.cruje(C + 0.3, 0.25);                                 // se abre la tapa de cera
m.zumbido(C + 0.6, 2.2, 0.05, 230);                                             // sale la abeja adulta
m.nota(Ou + 0.3, 57, 0.06, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.045, 2.8);
m.guardar(OUT, 1);
