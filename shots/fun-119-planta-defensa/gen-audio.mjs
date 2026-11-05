// gen-audio.mjs — música y efectos del Shot Fungi Mati #119 (la planta que se defiende). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): cama grave en la menor que cambia de acorde con cada escena (progresión con función,
// voces que se mueven a la nota más cercana), y encima un arpegio suave con un patrón distinto por escena (nunca el mismo
// más de una escena). Tensa cuando entra el hongo y suena la alarma; se abre a La MAYOR al final («cerrándole la puerta»).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Defensa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 119);
const K = m.K;
const G = K.Gancho, SG = K.SinGlobulos, Es = K.Espora, Q = K.Quitina, R = K.Receptor, A = K.Alarma, P = K.Pregunta, Ef = K.Efectores,
  S = K.Sacrificio, E = K.Estudio, M = K.Manchas, As = K.Aspirina, C = K.Cierre, Ou = K.Outro;

// ---------- armonía: un acorde por escena (cama) ----------
const ACORDES = [
  [G, SG, [45, 52, 57, 60], 0],        // Am        · los puntitos
  [SG, Es, [41, 48, 57, 60], 0],       // F (add9)  · sin glóbulos blancos
  [Es, Q, [38, 45, 53, 57], 0.2],      // Dm        · la espora entra (se tapa un poco)
  [Q, R, [40, 47, 52, 56], 0.25],      // E         · la quitina la delata (tensión)
  [R, A, [40, 47, 53, 56], 0.25],      // E7(b9 sin raíz arriba) · receptores
  [A, P, [45, 52, 54, 60], 0.15],      // Am6       · alarma
  [P, Ef, [40, 47, 52, 57], 0.35],     // Esus4     · ¿y si la apaga? (suspendido)
  [Ef, S, [38, 45, 50, 53], 0.3],      // Dm        · efectores
  [S, E, [41, 45, 52, 57], 0.1],       // F(maj7)   · el sacrificio (serio, cálido)
  [E, M, [48, 55, 60, 64], 0],         // C         · el estudio
  [M, As, [43, 50, 55, 59], 0],        // G         · manchas
  [As, C, [41, 48, 53, 57], 0],        // F         · la alarma viaja
  [C, Ou, [45, 52, 57, 60], 0],        // Am        · regreso a la hoja
  [Ou, Ou + 3.5, [45, 52, 57, 61], 0], // A mayor   · se resuelve
];
for (const [a, b, notas, tapa] of ACORDES) m.pad(Math.max(0, a - 0.25), b + 0.25, 0.05, notas, tapa);

// ---------- arpegio suave (melodía de fondo), un patrón distinto por escena ----------
const PATRONES = {
  G: [0, 2, 1, 3, 2, 1], SG: [3, 2, 0, 1, 2, 3], Es: [0, 1, 0, 2, 1, 0], Q: [2, 3, 2, 1], R: [1, 2, 3, 3, 2], A: [3, 1, 3, 2, 3, 0],
  P: [0, 2, 3], Ef: [0, 1, 2, 1, 0, 2], S: [3, 2, 1, 0, 1], E: [0, 2, 3, 2, 1, 3], M: [1, 0, 2, 3, 2], As: [0, 1, 2, 3, 2, 3], C: [3, 2, 1, 2, 0, 1],
};
const CLAVES = ['G', 'SG', 'Es', 'Q', 'R', 'A', 'P', 'Ef', 'S', 'E', 'M', 'As', 'C'];
CLAVES.forEach((k, i) => {
  const [a, b, notas, tapa] = ACORDES[i], pat = PATRONES[k], paso = k === 'A' || k === 'Q' ? 0.36 : k === 'P' ? 0.6 : 0.5;
  const alto = notas.map((n) => n + 24);
  let t = a + 0.15, j = 0;
  while (t < b - 0.3) {
    const fin = t + paso >= b - 0.3;                       // la última nota de la escena cae en la tónica del acorde (cadencia)
    const n = fin ? alto[0] + 12 : alto[pat[j % pat.length]];
    m.nota(t, n, (j % pat.length === 0 ? 0.03 : 0.022) * (1 - tapa * 0.5), fin ? 1.2 : 0.7, tapa);
    t += paso * (j % pat.length === pat.length - 1 ? 1.5 : 1); j++; // respira al cerrar cada frase
  }
});

// ---------- efectos en el mismo cuadro ----------
for (let k = 0; k < 11; k++) m.gota(G + 0.15 + k * (2.45 / 11), 0.12, 600 + (k % 4) * 90);     // aparecen los puntitos cafés
m.tic(G + 0.9, 0.15, 1400); m.tic(G + 3.3, 0.15, 1600);                                         // chips
m.cruje(SG + 1.0, 0.35); m.golpe(SG + 1.0, 0.3, 70);                                             // se tacha el glóbulo blanco
for (let k = 0; k < 12; k++) m.nota(SG + 1.8 + k * 0.12, 76 + (k % 5) * 2, 0.025, 0.35);         // 12 células se encienden con su escudo
m.whoosh(Es + 0.1, 1.0, 0.1); m.gota(Es + 1.1, 0.2, 500);                                       // cae el conidio y aterriza
m.zumbido(Es + 1.3, 2.2, 0.035, 150);                                                            // crece la hifa
m.tic(Es + 3.5, 0.2, 900);                                                                       // entra por el estoma
m.metal(Q + 0.3, 0.12, 1250);                                                                    // brilla la quitina
for (let k = 0; k < 4; k++) m.burbuja(Q + 1.2 + k * 0.35, 0.08, 520 + k * 60);                  // se sueltan pedacitos
for (let i = 0; i < 4; i++) m.tic(R + 0.6 + 1.4 * (0.6 + 0.6 * i) / 4, 0.22, 2100);              // cada receptor atrapa uno
m.latido(A, 0.25); m.latido(A + 0.8, 0.2); m.sube(A, 0.8, 57, 69, 0.03);                         // suena la alarma
for (let k = 0; k < 10; k++) m.burbuja(A + 0.4 + k * 0.12, 0.05, 900 + (k % 3) * 200);           // chispas de oxígeno reactivo
m.whoosh(A + 1.7, 0.9, 0.08);                                                                    // crece la callosa
for (let k = 0; k < 5; k++) m.tic(A + 3.0 + k * 0.24, 0.18, 3000);                               // quitinasas muerden
m.sube(P + 0.6, 0.8, 69, 52, 0.03);                                                              // la alarma se apaga
for (let k = 0; k < 6; k++) m.burbuja(Ef + 0.2 + k * 0.2, 0.07, 400 + k * 40);                  // efectores
for (let k = 0; k < 16; k++) m.tic(Ef + 1.2 + k * 0.075, 0.06, 1500);                            // Avr4 cubre la quitina
m.golpe(Ef + 3.4, 0.35, 95); m.metal(Ef + 3.5, 0.1, 980);                                        // el guardián Cf-4 lo atrapa
m.latido(Ef + 4.2, 0.25); m.latido(Ef + 4.9, 0.2);                                               // alarma otra vez
for (let k = 0; k < 7; k++) m.cruje(S + 0.6 + k * 0.25, 0.15);                                   // las células atacadas mueren
m.whoosh(S + 2.6, 1.6, 0.06);                                                                    // la cámara se aleja (sigue al microscopio)
m.golpe(E + 0.2, 0.35, 80);                                                                      // tarjeta del estudio
for (let k = 0; k < 8; k++) m.gota(E + 2.2 + k * 0.12, 0.08, 800 + (k % 4) * 100);               // cae quitina en las dos plantas
m.latido(E + 3.2, 0.2);                                                                          // solo la normal da la alarma
m.zumbido(M + 0.6, 2.8, 0.03, 110);                                                              // crecen las manchas
m.tic(M + 2.6, 0.2, 1300);
m.sube(As + 0.4, 2.2, 52, 64, 0.03);                                                             // la señal sube por el tallo
for (let i = 1; i < 4; i++) m.nota(As + 0.8 + i * 0.55, 72 + i * 3, 0.04, 0.6);                  // cada hoja sana se prepara
m.burbuja(As + 2.6, 0.1, 700); m.tic(As + 3.4, 0.2, 1700);                                       // ácido salicílico y la pastilla
for (let k = 0; k < 11; k++) m.tic(C + 0.8 + k * (2.6 / 11), 0.12, 1100 + (k % 3) * 150);        // se cierran las puertitas
m.nota(Ou + 0.3, 57, 0.07, 2.8); m.nota(Ou + 0.3, 61, 0.05, 2.8); m.nota(Ou + 0.3, 64, 0.05, 2.8); m.nota(Ou + 0.5, 69, 0.04, 2.6);
m.guardar(OUT, 1);
