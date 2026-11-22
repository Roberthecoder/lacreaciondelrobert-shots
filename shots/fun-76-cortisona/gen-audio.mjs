// gen-audio.mjs — cama grave + efectos del Shot Fungi Mati #76 (Cortisona). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): cama grave continua, acordes que cambian cada ~2–4 s (nunca el mismo
// patrón más de 4 compases), arco: curiosidad (crema) → tensión (los 40 pasos, armonía que no resuelve) → se abre y
// resuelve en «de un jalón» (el OH) → luminosa hasta el cierre. Motivo de 4 notas que regresa transformado.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cortisona base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 76);
const K = m.K;
const G = K.Gancho, Cr = K.Crema, Co = K.Cortisol, Es = K.Esqueleto, M = K.Merck, P = K.Pregunta, E = K.Estudio, En = K.Enzima,
  B = K.Barato, Pa = K.Pan, H = K.Hoy, C = K.Cierre, Ou = K.Outro;

// --- armonía: cada tramo con su acorde (notas MIDI graves) y su "tapa" (0 abierto · 1 ahogado) ---
const OH = En + 2.4;                                                   // el moho pega el oxígeno
const tramos = [
  [G, Cr, [45, 52, 57], 0.1],          // Am — curiosidad
  [Cr, Co, [41, 48, 57], 0.1],         // F
  [Co, Es, [43, 50, 55], 0.05],        // G (el cuerpo)
  [Es, Es + 3, [45, 52, 60], 0.3],     // Am(add) — por dentro, se oscurece
  [Es + 3, M, [44, 52, 59], 0.35],     // E/G# — tensión en el carbono 11
  [M, M + 3.7, [41, 48, 56], 0.45],    // Fm — los 40 pasos: se arrastra
  [M + 3.7, P, [40, 47, 55], 0.5],     // Em sobre Mi — no resuelve
  [P, E, [44, 50, 59], 0.3],           // E7 (G#-D-B) — la pregunta queda colgada
  [E, E + 4.3, [45, 52, 57], 0.2],     // Am — el experimento
  [E + 4.3, En, [38, 45, 53], 0.25],   // Dm — cae la progesterona
  [En, OH, [40, 47, 56], 0.35],        // E — la enzima se acerca
  [OH, B, [45, 52, 61], 0],            // A mayor — ¡de un jalón! (resuelve)
  [B, Pa, [41, 48, 57], 0],            // F mayor — ruta corta
  [Pa, H, [43, 50, 59], 0],            // G
  [H, C, [48, 55, 64], 0],             // C — hoy
  [C, Ou, [41, 48, 57], 0],            // F
  [Ou, Ou + 3.5, [45, 52, 61, 64], 0], // A mayor final, se queda sonando
];
for (const [a, b, notas, tapa] of tramos) m.pad(a, b + 0.15, 0.05, notas, tapa);

// --- motivo de 4 notas (la–do–mi–re), variado cada vez que regresa ---
const motivo = (t, base, g = 0.05, paso = 0.32, var_ = 0) => {
  const fr = [[0, 3, 7, 5], [0, 3, 7, 10], [0, 4, 7, 9], [12, 7, 4, 0]][var_];
  fr.forEach((d, i) => m.nota(t + i * paso, base + d, g, 0.7));
};
motivo(G + 0.6, 69, 0.045);                 // gancho
motivo(Co + 0.4, 67, 0.04, 0.3, 1);         // cuerpo
motivo(E + 0.4, 69, 0.04, 0.36, 0);         // el experimento (lo mismo del inicio)
motivo(OH + 0.05, 69, 0.06, 0.18, 2);       // resuelve en mayor, rápido
motivo(H + 0.3, 72, 0.045, 0.3, 2);         // hoy
motivo(C + 0.5, 81, 0.04, 0.34, 3);         // cierre: el motivo al revés, bajando
// notas sueltas que responden en los tramos tensos (sin patrón fijo)
[[Es + 1.2, 64], [Es + 3.3, 63], [M + 1.8, 60], [M + 4.6, 59], [M + 6.4, 58], [P + 0.8, 62]].forEach(([t, n]) => m.nota(t, n, 0.035, 1.2, 0.5));

// --- efectos, en el mismo cuadro de cada evento ---
m.whoosh(G + 0.05, 0.3, 0.12); m.burbuja(G + 0.15, 0.12, 300); m.burbuja(G + 0.4, 0.1, 360);   // aprieta el tubo, sale la crema
m.latido(G + 0.2, 0.12); m.latido(G + 1.2, 0.1);                                                   // la roncha late
for (let i = 0; i < 5; i++) m.tic(G + 1.6 + i * 0.3, 0.06, 2200 + i * 150);                        // asoma el moho
m.whoosh(Cr + 0.2, 1.1, 0.06);                                                                     // se unta la crema
m.sube(Cr + 1.4, 2.0, 57, 50, 0.03);                                                               // la roncha baja
m.nota(Co + 0.5, 76, 0.05, 1.0); m.nota(Co + 0.6, 81, 0.04, 1.0);                                  // brillan las suprarrenales
for (let i = 0; i < 8; i++) m.tic(Es + 0.1 + i * 0.12, 0.05, 1500);                                // se dibuja la progesterona
for (let i = 0; i < 8; i++) m.tic(Es + 1.0 + i * 0.12, 0.05, 1700);                                // la hidrocortisona
[0, 0.2, 0.4].forEach((d, i) => m.nota(Es + 2.2 + d, 74 + i * 3, 0.06, 0.4));                      // 3 oxígenos se encienden
m.golpe(Es + 3.2, 0.25, 70);                                                                       // carbono 11
m.golpe(M + 0.1, 0.3, 80);                                                                         // tarjeta Merck
for (let i = 0; i < 39; i++) m.tic(M + 0.6 + i * (4.6 / 39), 0.07, 900 + (i % 5) * 120);          // cada paso, un matraz
m.metal(M + 5.0, 0.15, 900);                                                                       // la balanza: 18 mg
m.whoosh(P + 0.6, 1.0, 0.12); m.golpe(P + 1.2, 0.35, 60);                                          // el tramo se junta en un paso
m.golpe(E + 0.2, 0.3, 80);                                                                         // tarjeta 1952
m.motor(E + 0.3, 3.8, 0.04);                                                                       // agitador
m.gota(E + 4.9, 0.3, 700);                                                                         // cae la progesterona al matraz
for (let i = 0; i < 6; i++) m.burbuja(E + 5.0 + i * 0.15, 0.08, 420 + i * 40);
m.sube(E + 5.8, 1.8, 55, 67, 0.03);                                                                // crece el moho en la superficie
m.whoosh(En + 0.8, 0.6, 0.08);                                                                     // zoom a la molécula
m.zumbido(En + 1.2, 1.1, 0.04, 160);                                                               // se acerca la enzima
m.metal(OH, 0.22, 1200); m.golpe(OH, 0.3, 120);                                                    // ¡el OH! (destello)
m.whoosh(En + 3.0, 0.7, 0.06);                                                                     // la enzima se va
[0.2, 0.8, 1.4].forEach((d) => m.tic(B + d, 0.15, 1300));                                          // los 3 pasos de la ruta
m.whoosh(B + 2.4, 1.0, 0.08);                                                                      // la barra se acorta
m.tic(B + 3.4, 0.2, 800); m.sube(B + 3.5, 0.5, 64, 57, 0.04);                                      // la etiqueta de precio baja
m.cruje(Pa + 0.2, 0.25); m.sube(Pa + 0.2, 1.6, 50, 57, 0.03);                                      // el moho crece en el pan
m.motor(H + 0.1, 3.8, 0.05);                                                                       // el tanque
for (let i = 0; i < 6; i++) m.tic(H + 0.6 + i * 0.6, 0.08, 1900);                                  // tubos en la banda
m.whoosh(C + 0.6, 0.6, 0.06); m.tic(C + 1.2, 0.15, 1400);                                          // la etiqueta del tubo
m.nota(Ou + 0.3, 57, 0.07, 3.0); m.nota(Ou + 0.3, 64, 0.06, 3.0); m.nota(Ou + 0.3, 69, 0.05, 3.0); m.nota(Ou + 0.6, 73, 0.04, 2.6);
m.guardar(OUT, 1);
