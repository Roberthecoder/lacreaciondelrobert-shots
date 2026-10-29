// gen-audio.mjs — cama grave + efectos del Shot Festivo #08 · Revolución Mexicana · Químico (película de nitrato). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Pelicula Nitrato base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 1910);
const K = m.K, E = m.ESC;
const G = K.Gancho, V = K.Villa, N = K.Nitrato, R = K.Receta, M = K.Molecula, P = K.Prima, O = K.Oxigeno, Q = K.Pregunta, Ga = K.Gases, C = K.Calor, Es = K.Estudio, D = K.Dato, Ci = K.Cierre, Ou = K.Outro;

m.pad(0, Ou + 3.0, 0.05, [45, 52, 57]);
// un aire lejano de corrido: notas largas y suaves (sin melodía conocida)
for (const [t, n] of [[G + 2.6, 69], [V + 3.2, 64], [D + 4.6, 69], [D + 6.0, 72], [Ci + 3.0, 69]]) m.nota(t, n, 0.035, 1.4);
// 1 · el rollo se desenrolla: traqueteo de proyector
for (let i = 0; i < 26; i++) m.tic(G + 0.05 + i * 0.07, 0.12, 1500 + (i % 2) * 300);
m.whoosh(G, 0.8, 0.12);
m.metal(G + 1.8, 0.06, 900);                                                 // se tacha "¿solo cine?"
m.sube(G + 2.6, 0.7, 57, 69, 0.04);                                          // algodón + ácido nítrico
// 2 · contrato: pluma que raspa y cámara de manivela
m.golpe(V + 0.2, 0.25, 90); m.metal(V + 0.25, 0.06, 1500);                   // tarjeta 1914
for (let i = 0; i < 18; i++) m.tic(V + 0.6 + i * 0.08, 0.05, 4200 + (i % 3) * 300); // la pluma firma
for (let i = 0; i < 30; i++) m.tic(V + 2.6 + i * 0.09, 0.08, 1100);           // manivela que gira
for (let i = 0; i < 8; i++) m.golpe(V + 2.8 + i * 0.32, 0.06, 140);           // galope
// 3 · la lata se abre
m.metal(N + 0.4, 0.12, 700); m.whoosh(N + 0.4, 0.5, 0.1);
for (let i = 0; i < 14; i++) m.tic(N + 0.9 + i * 0.07, 0.07, 1500);
// 4 · algodón al ácido, burbujas
m.whoosh(R + 0.2, 0.9, 0.08); m.gota(R + 1.1, 0.2, 500);
for (let i = 0; i < 16; i++) m.burbuja(R + 1.2 + i * 0.14, 0.07, 350 + (i % 5) * 70);
m.sube(R + 2.2, 0.8, 52, 64, 0.04);                                          // sale la lámina
// 5 · un clic por cada grupo nitrato que se pega
for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) m.nota(M + 0.6 + i * 0.35 + j * 0.12, E[3 + ((i + j) % 8)], 0.035, 0.3);
// 6 · medidores de nitrógeno + chispa del algodón pólvora
m.sube(P + 0.7, 0.8, 52, 62, 0.04); m.sube(P + 1.3, 0.8, 52, 66, 0.05);
for (let i = 0; i < 6; i++) m.tic(P + 1.4 + i * 0.12, 0.08, 3600);
// 7 · arde en el frasco tapado
m.whoosh(O + 0.3, 0.5, 0.14); m.zumbido(O + 0.5, 3.2, 0.025, 110);
for (let i = 0; i < 14; i++) m.tic(O + 0.6 + i * 0.22, 0.04, 2000 + (i % 4) * 400); // crepita
for (let i = 0; i < 3; i++) m.gota(O + 1.2 + i * 0.4, 0.06, 1200);           // el O₂ de afuera rebota
// 8 · pregunta
m.sube(Q + 0.1, 1.6, 52, 64, 0.05);
// 9 · gases que vuelven y rompen: tensión creciente
for (let i = 0; i < 12; i++) m.burbuja(Ga + 0.4 + i * 0.3, 0.06, 220 + (i % 4) * 40);
for (const t of [0.4, 1.0, 1.6, 2.4]) { const k = Ga + 1.0 + t * 0.6; m.cruje(k, 0.25); }
m.zumbido(Ga + 1.6, 2.8, 0.03, 150);
// 10 · el termómetro sube a 150 °C (flama), baja a 50 °C (flama en el rollo viejo)
for (let i = 0; i < 9; i++) m.nota(C + 0.4 + i * 0.2, E[2 + i], 0.03, 0.4);
m.whoosh(C + 2.2, 0.5, 0.14); m.golpe(C + 2.25, 0.12, 120);
for (let i = 0; i < 5; i++) m.nota(C + 2.8 + i * 0.16, E[10 - i * 2], 0.03, 0.4);
m.whoosh(C + 3.8, 0.5, 0.12); m.golpe(C + 3.85, 0.1, 110);
// 11 · la Cineteca: contenido, sin dramatizar
m.golpe(Es + 0.2, 0.3, 80); m.metal(Es + 0.25, 0.08, 1500);
m.zumbido(Es + 2.0, 4.0, 0.03, 95);
for (let i = 0; i < 20; i++) m.tic(Es + 2.2 + i * 0.18, 0.04, 1400 + (i % 5) * 300); // crepitar lejano
for (let i = 0; i < 10; i++) m.tic(Es + 3.8 + i * 0.08, 0.05, 2200);         // contador
m.bajo(Es + 4.8, 45, 0.1, 1.2);
// 12 · lo que sobrevivió: latas que llegan, moviola
for (let i = 0; i < 5; i++) m.metal(D + [0, 0.3, 0.6, 1.0, 1.3][i] + 0.5, 0.05, 800 + i * 60);
for (let i = 0; i < 24; i++) m.tic(D + 3.8 + i * 0.12, 0.05, 1200 + (i % 2) * 200); // moviola
m.sube(D + 4.2, 0.8, 57, 69, 0.04);
// 13 · cierre: bóveda fría, acorde tranquilo
m.whoosh(Ci + 0.2, 0.6, 0.1); for (let i = 0; i < 6; i++) m.nota(Ci + 1.4 + i * 0.15, E[7 + i], 0.03, 0.5);
m.nota(Ou + 0.3, 57, 0.08, 2.6); m.nota(Ou + 0.3, 64, 0.06, 2.6); m.nota(Ou + 0.3, 69, 0.05, 2.6);
m.guardar(OUT, 1);
