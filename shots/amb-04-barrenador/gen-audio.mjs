// gen-audio.mjs — música + efectos del Ambiental #04 (gusano barrenador). Sin costo (motor/kit/audio-kit.mjs).
// Uso: node gen-audio.mjs                       → assets/mezcla.wav (base narrada, sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada · workflow: el mudo)
// Mudo (M1): modelo de Knipling (1955). Cada punto = 10,000 moscas silvestres = 1 nota:
//   100 notas → 33 → 5 → 1 → silencio; las estériles son el zumbido de fondo; con 0 silvestres la música se libera.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from '../../motor/kit/audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Barrenador base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 19);
const K = m.K, E = m.ESC;

if (K.Campo != null) {
  /* ---------- gemelo mudo ---------- */
  const Ca = K.Campo, G = [K.G1, K.G2, K.G3, K.G4], Ce = K.Cero, M = K.Mapa, L = K.Loop, FIN = L + 7;
  const notas = [100, 100, 33, 5, 1];                     // silvestres/10,000 en Campo, G1…G4
  const tramos = [[Ca, G[0]], [G[0], G[1]], [G[1], G[2]], [G[2], G[3]], [G[3], Ce]];
  tramos.forEach(([a, b], k) => {
    const n = notas[k], d = b - a - 0.6;
    for (let i = 0; i < n; i++) m.nota(a + 0.3 + (i / n) * d, E[(i * 7 + k) % 9] - 12, 0.03 + 0.04 / Math.sqrt(n), 0.35, 0.6);
    m.pad(a, b + 0.3, 0.05, [40, 46], 0.8 - k * 0.12);   // tensa mientras haya plaga
    if (k > 0) m.zumbido(a, b - a, 0.035 + 0.01 * k, 180);   // 2,000,000 estériles: zumbido
    m.bajo(a + 0.1, 33 + k * 2, 0.14, 0.8);               // golpe de cada generación
  });
  // cero silvestres: la música se libera
  m.pad(Ce, M + 0.3, 0.05, [45, 52, 57, 64]);
  [0, 0.4, 0.8, 1.2, 1.8].forEach((d, i) => m.nota(Ce + 0.6 + d, E[5 + i], 0.09, 1.0));
  // mapa: Chiapas (nov 2024) y Metapa (2026); 100 millones por semana
  m.pad(M, L + 0.3, 0.045, [45, 52, 57]); m.golpe(M + 0.5, 0.3, 70); m.nota(M + 0.5, 52, 0.08, 0.8);
  m.golpe(M + 2.5, 0.3, 90); m.sube(M + 2.6, 1.2, 57, 69, 0.07); m.nota(M + 3.4, 69, 0.09, 1.2);
  // loop: vuelven las 100 silvestres (100 notas que se juntan) → primer cuadro
  for (let i = 0; i < 100; i++) { const t = L + 0.5 + Math.sqrt(i / 100) * (FIN - 1.5 - L - 0.5); m.nota(t, E[(i * 7) % 9] - 12, 0.03, 0.3, 0.6); }
  m.pad(L, FIN, 0.045, [40, 46], 0.8);
} else {
  /* ---------- narrada ---------- */
  const G = K.Gancho, H = K.Huevos, Mu = K.Muere, Ma = K.Mas, F = K.Fabrica, P = K.Pregunta, U = K.Una, Es = K.Estudio, B = K.Barrera, Ch = K.Chiapas, Me = K.Metapa, C = K.Cierre, Ou = K.Outro;
  m.pad(0, Ou + 3.5, 0.05, [45, 52, 57]);
  m.zumbido(G, 1.2, 0.08, 210);                                                    // la mosca llega
  for (let i = 0; i < 60; i++) m.tic(H + 0.5 + i * 0.03, 0.03, 3200);                  // cientos de huevos
  m.sube(H + 2.2, 0.6, 64, 79, 0.06); m.pad(H + 2.2, Mu, 0.03, [40, 47]);             // lupa: por dentro
  for (let d = 0; d < 14; d++) m.tic(Mu + 0.4 + (d / 14) * 2.2, 0.08, 1300);          // 14 días
  m.cruje(Ma + 1.2, 0.5); m.nota(Ma + 1.6, 64, 0.07, 0.8);                           // "veneno" tachado; más moscas
  m.zumbido(Ma, 2, 0.05, 230);
  for (let k = 0; k < 6; k++) m.metal(F + 0.8 + k * 0.22, 0.06, 1800);                 // radiación
  m.motor(F + 2.3, P - F - 1.6, 0.07);                                              // avioneta
  m.sube(P + 0.1, 1.4, 52, 64, 0.05);
  m.nota(U + 1.4, 69, 0.08, 1.0); m.nota(U + 1.4, 76, 0.06, 1.0);                     // corazón
  for (let i = 0; i < 12; i++) m.tic(U + 3.6 + i * 0.03, 0.06, 900);                   // huevos sin crías
  m.golpe(Es + 0.2, 0.35, 80); m.motor(Es + 1.8, B - Es - 1.8, 0.06);
  for (let i = 0; i < 6; i++) m.nota(Es + 2.8 + i * 0.4, E[8 - i], 0.04, 0.5);          // las moscas desaparecen
  m.golpe(B + 1.0, 0.25, 90); m.sube(B + 1.2, Ch - B - 1.6, 64, 52, 0.05); m.golpe(B + 3.2, 0.25, 70);   // la barrera baja
  for (let k = 0; k < 10; k++) m.tic(Ch + 0.4 + k * 0.32, 0.06, 1100); m.golpe(Ch + 3.4, 0.35, 60);         // la plaga sube
  m.golpe(Me + 0.8, 0.35, 90); m.sube(Me + 1.2, 1.4, 57, 69, 0.06);
  m.motor(C, Ou + 2 - C, 0.06); m.nota(C + 1.4, 57, 0.07, 1.4); m.nota(C + 1.4, 64, 0.06, 1.4);
  m.nota(Ou + 0.3, 57, 0.08, 2.8); m.nota(Ou + 0.3, 64, 0.06, 2.8); m.nota(Ou + 0.3, 69, 0.05, 2.8);
}
m.guardar(OUT, K.Outro == null ? 1.9 : 1);
