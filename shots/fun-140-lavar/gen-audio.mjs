// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #140 (¿Los hongos se lavan?). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música: cama de cocina juguetona a 100 BPM: pedal grave con acordes que cambian cada escena (re menor → fa → do → la menor…),
// pizzicato grave con frases que varían cada 2–4 compases (respuesta, secuencia, cadencia), y un acorde que se abre en «impermeable».
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Lavar base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 140);
const K = m.K;
const G = K.Gancho, Mi = K.Mito, E = K.Estudio, Ce = K.Cerrados, Ex = K.Expuestas, P = K.Pregunta, H = K.Hidrofobina, L = K.Lleno,
  S = K.Sarten, A = K.Aceite, R = K.Rebanado, Co = K.Consejo, C = K.Cierre, Ou = K.Outro;

// --- cama: un acorde por tramo (raíz grave + quinta + tercera arriba), sin golpe
const ACORDES = [
  [G, Mi, [38, 45, 53]], [Mi, E, [38, 45, 50]], [E, Ce, [41, 48, 57]], [Ce, Ex, [36, 43, 52]], [Ex, P, [45, 52, 60]],
  [P, H, [43, 50, 58]], [H, L, [38, 45, 53]], [L, S, [41, 48, 57]], [S, A, [36, 43, 52]], [A, R, [46, 53, 62]],
  [R, Co, [45, 52, 61]], [Co, C, [38, 45, 53]], [C, Ou + 3.5, [41, 48, 57, 60]],
];
ACORDES.forEach(([a, b, n], i) => m.pad(a, b + 0.25, i === ACORDES.length - 1 ? 0.06 : 0.05, n, i === 5 || i === 6 ? 0.3 : 0));

// --- pizzicato grave (frases de 4 compases que no se repiten: motivo, respuesta, secuencia, cadencia)
const BEAT = 0.6;
const FRASES = [
  [0, 7, 5, 3],  [0, 3, 5, 7],  [5, 3, 2, 0],  [0, 7, 10, 7],
  [3, 5, 7, 12], [7, 5, 3, 2],  [0, 2, 3, 5],  [7, 3, 0, -2],
];
ACORDES.slice(0, -1).forEach(([a, b, n], k) => {
  const raiz = n[0] + 12, fr = FRASES[k % FRASES.length];
  for (let t = a + 0.3, j = 0; t < b - 0.2; t += BEAT, j++) {
    if (j % 8 === 7) continue;                                         // respiración al cerrar cada frase
    const paso = fr[j % 4] + (j >= 4 ? (k % 2 ? 2 : -2) * (j % 4 === 2 ? 1 : 0) : 0);
    m.bajo(t, raiz + paso, j % 4 === 0 ? 0.06 : 0.04, 0.32);
  }
});

// --- efectos, cada uno en el mismo cuadro que su evento
m.whoosh(G + 0.05, 0.5, 0.1); m.golpe(G + 0.55, 0.22, 140);                         // cae el champiñón y chapuzón
for (let i = 0; i < 4; i++) m.gota(G + 0.6 + i * 0.12, 0.12, 900 + i * 140);
for (let i = 0; i < 6; i++) m.gota(G + 1.0 + i * 0.1, 0.06, 1600 + i * 90);          // perlitas que resbalan
m.burbuja(G + 1.4, 0.06, 300); m.burbuja(G + 2.1, 0.06, 260);                         // la esponja chupa agua
for (let i = 0; i < 6; i++) m.tic(G + 0.6 + i * 0.6, 0.06, 3000);                    // cronómetro
m.cruje(Mi + 0.8, 0.25); m.golpe(Mi + 0.7, 0.45, 60);                                 // tachón y sello MITO
m.golpe(E + 0.15, 0.3, 80);                                                           // tarjeta 2018
for (let i = 0; i < 4; i++) m.tic(E + 2.4 + i * 0.15, 0.1, 1400);                    // hongos a la báscula
for (let i = 0; i < 6; i++) m.nota(E + 4.0 + i * 0.1, 69 + [0, 3, 5, 7, 10, 12][i], 0.04, 0.4); // 6 tipos
m.tic(Ce + 0.8, 0.25, 1800); m.nota(Ce + 2.2, 74, 0.05, 0.8);                         // la báscula casi no cambia
for (let i = 0; i < 10; i++) m.gota(Ex + 0.4 + i * 0.35, 0.08, 800 + (i % 3) * 120); // gotas entre laminillas
m.sube(Ex + 1.6, 1.0, 57, 69, 0.04);                                                  // «hasta 25 %»
m.gota(P + 0.6, 0.25, 700); m.gota(P + 0.75, 0.12, 1100);                             // la gota rebota
m.sube(P + 0.1, 1.5, 52, 64, 0.05);                                                   // re-gancho
for (let i = 0; i < 22; i++) m.tic(H + 1.4 + i * 0.08, 0.05, 2600 + (i % 4) * 250);   // se arman las varillitas
m.gota(H + 3.9, 0.22, 650); m.nota(H + 4.2, 76, 0.05, 0.8);                           // la gota no moja
m.sube(L + 0.4, 2.2, 45, 57, 0.035); for (let i = 0; i < 5; i++) m.burbuja(L + 0.6 + i * 0.4, 0.06, 380 + i * 60); // se llena
for (let i = 0; i < 26; i++) m.burbuja(S + 0.4 + i * 0.12, 0.05, 260 + (i % 5) * 70); // hierve el jugo
m.motor(S + 3.7, 1.8, 0.05);                                                           // siseo al dorar
for (let i = 0; i < 5; i++) m.gota(A + 1.4 + i * 0.35, 0.12, 500);                    // gotas de aceite
m.nota(A + 2.6, 72, 0.05, 0.6); m.nota(A + 2.75, 76, 0.05, 0.6);                      // «esponja… de aceite» (chiste)
m.whoosh(R + 0.1, 0.5, 0.12); m.tic(R + 0.6, 0.3, 900);                               // corte del cuchillo
for (let i = 0; i < 6; i++) m.gota(R + 0.9 + i * 0.25, 0.08, 1000);
m.whoosh(Co + 0.05, 3.0, 0.05);                                                       // chorro de la llave
m.cruje(Co + 1.7, 0.15); m.golpe(Co + 1.6, 0.25, 90);                                  // jabón tachado
m.whoosh(Co + 3.0, 0.5, 0.1);                                                         // trapo
m.nota(C + 0.8, 69, 0.05, 1.6); m.nota(C + 0.9, 72, 0.05, 1.6); m.nota(C + 1.0, 77, 0.05, 1.6); // se abre: «impermeable»
m.nota(Ou + 0.3, 53, 0.08, 2.8); m.nota(Ou + 0.3, 60, 0.06, 2.8); m.nota(Ou + 0.3, 65, 0.05, 2.8); m.nota(Ou + 0.3, 69, 0.04, 2.8);
m.guardar(OUT, 1);
