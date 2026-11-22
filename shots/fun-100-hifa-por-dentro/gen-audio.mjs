// gen-audio.mjs — cama + efectos del Shot Fungi Mati #100 (Hifa). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama grave continua que cambia de acorde con cada escena (progresión con
// función, conducción de voces cercana) + un arpegio suave de "agua que corre" a 100 BPM cuyo patrón cambia cada 2–4 compases;
// arco: misterio (tubo) → corre (río) → tensión (¿se rompe?) → alivio (tapón) → abierto (cierre). Siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Hifa base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 100);
const K = m.K;
const G = K.Gancho, H = K.Hifa, P = K.Punta, V = K.Vesiculas, R = K.Rio, S = K.Septo, Q = K.Pregunta, W = K.Woronin, E = K.Estudio, ST = K.SinTapon, VI = K.Viaje, C = K.Cierre, Ou = K.Outro;

// --- cama: acordes por escena (la menor → fa → do → sol …; tensión en la pregunta, alivio con el tapón) ---
const ACORDES = [
  [G, H, [45, 52, 57, 60], 0.1],    // Am
  [H, P, [41, 48, 57, 60], 0.15],   // F (add la arriba)
  [P, V, [43, 50, 55, 59], 0.1],    // G
  [V, R, [45, 52, 57, 64], 0],      // Am (abre)
  [R, S, [41, 48, 53, 60], 0],      // F
  [S, Q, [36, 43, 52, 60], 0],      // C
  [Q, W, [40, 47, 56, 59], 0.35],   // E (dominante: ¿se rompe?)
  [W, E, [45, 52, 57, 60], 0.25],   // Am
  [E, ST, [38, 45, 53, 57], 0.1],   // Dm
  [ST, VI, [40, 47, 52, 56], 0.2],  // E
  [VI, C, [41, 48, 57, 60], 0],     // F
  [C, Ou, [36, 43, 52, 55], 0],     // C (resuelve en mayor)
  [Ou, Ou + 3.5, [36, 43, 48, 52], 0],
];
ACORDES.forEach(([a, b, n, tapa]) => m.pad(a - 0.08, b + 0.12, 0.05, n, tapa));

// --- arpegio "río": corcheas a 100 BPM sobre las notas del acorde, patrón distinto cada sección ---
const CORCHEA = 0.3, PATRONES = [[0, 1, 2, 3, 2, 1, 0, 2], [0, 2, 3, 1, 3, 2, 1, 3], [3, 2, 1, 0, 1, 2, 3, 3], [0, 3, 2, 3, 1, 3, 2, 3]];
ACORDES.slice(0, 12).forEach(([a, b, n, tapa], si) => {
  if (si === 0) return;                         // en el gancho no hay arpegio: misterio
  const pat = PATRONES[si % PATRONES.length], arriba = si >= 4 && si <= 5 || si >= 10 ? 12 : 0;
  for (let k = 0, t = a + 0.05; t < b - 0.1; k++, t += CORCHEA) {
    if (si === 6 && k % 2) continue;             // en la pregunta, la mitad: se queda en suspenso
    const frase = Math.floor(k / 8), nota = n[pat[k % 8]] + 12 + arriba + (frase % 3 === 2 && k % 8 === 7 ? 2 : 0); // cada 3.ª frase cierra un tono arriba
    m.nota(t, nota, k % 4 === 0 ? 0.032 : 0.022, 0.5, tapa);
  }
});

// --- efectos, cada uno en el cuadro de lo que pasa ---
m.whoosh(G + 0.05, 0.45, 0.08); m.tic(G + 0.45, 0.25, 2200);                   // entran las pinzas y pellizcan
m.cruje(G + 0.6, 0.25);                                                           // se levanta el mechón
m.sube(G + 2.2, 0.6, 60, 72, 0.04); m.zumbido(G + 2.4, 2.4, 0.03, 260);           // se abre la lupa: tubo con río
for (let i = 0; i < 8; i++) m.burbuja(G + 2.7 + i * 0.3, 0.05, 420 + i * 30);
m.whoosh(H - 0.3, 0.8, 0.1);                                                       // al microscopio
m.tic(H + 1.2, 0.15, 1500); m.golpe(H + 2.5, 0.22, 70); m.tic(H + 3.3, 0.15, 1300); // medidor, entra el pelo, medidor
m.nota(P + 1.2, 76, 0.05, 1.2); m.nota(P + 1.25, 81, 0.03, 1.2);                  // aparece el Spitzenkörper
m.tic(P + 2.0, 0.12, 1700);
for (let i = 0; i < 34; i++) { const t0 = V + 0.2 + i * 0.13 + 1.5; m.gota(t0, 0.07, 1100 + (i % 5) * 120); } // cada vesícula se funde
for (let i = 0; i < 12; i++) m.tic(V + 2.2 + i * 0.12, 0.06, 2600);              // cuenta el número
for (let i = 0; i < 14; i++) m.burbuja(R + 0.2 + i * 0.42, 0.06, 380 + (i % 4) * 60); // el río corre
m.golpe(R + 2.6, 0.3, 80); m.nota(R + 3.0, 72, 0.04, 0.8);                        // tarjeta 2009; se encienden los núcleos
m.cruje(S + 0.3, 0.3); m.tic(S + 1.4, 0.12, 900); m.nota(S + 1.8, 69, 0.04, 0.8); // se cierran los septos; el poro
m.sube(Q + 0.1, 1.6, 52, 64, 0.05); m.whoosh(Q + 0.2, 1.3, 0.07);                // ¿se rompe? la aguja se acerca
m.whoosh(W + 0.1, 0.6, 0.08); m.metal(W + 0.7, 0.18, 1200); m.cruje(W + 0.7, 0.35); // pinchazo
for (let i = 0; i < 10; i++) m.burbuja(W + 0.8 + i * 0.12, 0.08, 700 - i * 25);  // chorro de citoplasma
m.golpe(W + 2.3, 0.4, 95); m.nota(W + 2.35, 69, 0.05, 1.4); m.nota(W + 2.4, 76, 0.035, 1.4); // ¡tapón! (alivio)
m.golpe(E + 0.2, 0.3, 80);                                                         // tarjeta 2000
for (let i = 0; i < 18; i++) m.tic(E + 0.8 + i * 0.14, 0.06, 1800 + (i % 3) * 300); // el cristal de Hex1 se arma
m.tic(ST + 0.2, 0.15, 1500); m.tic(ST + 0.9, 0.15, 900);                           // chips con / sin
for (let i = 0; i < 12; i++) m.burbuja(ST + 0.5 + i * 0.3, 0.05, 520 - (i % 3) * 40); // la hifa sin tapón se sigue vaciando
m.zumbido(VI + 0.6, 3.8, 0.04, 330); m.sube(VI + 0.6, 3.8, 64, 76, 0.03);          // el núcleo corre por la red
m.golpe(VI + 1.2, 0.22, 90);                                                       // chip 2013
m.sube(C + 0.3, 1.3, 57, 64, 0.03); m.nota(C + 1.6, 72, 0.04, 1.4); m.nota(C + 1.65, 76, 0.03, 1.4); // la pelusa se vuelve tubos
m.nota(Ou + 0.3, 48, 0.07, 3); m.nota(Ou + 0.3, 55, 0.05, 3); m.nota(Ou + 0.3, 64, 0.04, 3); m.nota(Ou + 0.45, 72, 0.03, 2.6);
m.guardar(OUT, 1);
