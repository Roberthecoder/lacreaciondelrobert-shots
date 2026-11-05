// gen-audio.mjs — cama + efectos del Shot Fungi Mati #145 (cuero de micelio). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (maestro/recetas/composicion-musical.md): re menor a ~108 BPM, un acorde por escena con función (i–VI–III–iv–VII–V…),
// arpegio suave que cambia de figura en cada escena (nunca el mismo patrón más de 4 compases), motivo de 4 notas
// (re–fa–la–sol) que suena en el gancho, regresa transpuesto en «¿Y quién ya lo usó?» y vuelve en MAYOR en el cierre.
// Se oscurece (tapa) en «la trampa» y «cuesta»; se abre en «composta». Siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Cuero Micelio base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 145);
const K = m.K;
const G = K.Gancho, Mi = K.Micelio, Ch = K.Charolas, Hi = K.Hifas, Co = K.Cosecha, Cu = K.Curte, P = K.Pregunta, H = K.Hermes,
  My = K.Mylo, Tr = K.Trampa, Es = K.Escala, Cm = K.Composta, C = K.Cierre, Ou = K.Outro;
const NEG = 60 / 108;                                            // una negra a 108 BPM

// [inicio, fin, acorde (MIDI), figura del arpegio, tapa]
const ARMONIA = [
  [G, Mi, [50, 57, 62, 65], 'sube', 0],          // i   Dm
  [Mi, Ch, [46, 53, 58, 62], 'baja', 0],         // VI  B♭
  [Ch, Hi, [41, 53, 57, 60], 'quebrado', 0],     // III F
  [Hi, Co, [43, 50, 55, 58], 'pendulo', 0.1],    // iv  Gm (al microscopio, más íntimo)
  [Co, Cu, [48, 55, 60, 64], 'sube', 0],         // VII C
  [Cu, P, [45, 52, 57, 61], 'baja', 0],          // V   A (pide resolver)
  [P, H, [46, 53, 58, 62], 'nada', 0],           // VI  B♭ (re-gancho: se vacía)
  [H, My, [41, 48, 53, 57, 60], 'quebrado', 0],  // III F
  [My, Tr, [45, 52, 57, 60], 'sube', 0],         // v   Am
  [Tr, Es, [43, 50, 55, 58], 'pendulo', 0.35],   // iv  Gm, tapado: «la trampa»
  [Es, Cm, [46, 53, 58, 61], 'baja', 0.4],       // iv♭ B♭m prestado, tapado: «cuesta»
  [Cm, C, [41, 53, 57, 60, 65], 'quebrado', 0],  // III F, se abre: composta
  [C, Ou, [50, 57, 62, 66], 'sube', 0],          // I   D MAYOR (picardía)
  [Ou, Ou + 3.5, [38, 50, 57, 62, 66], 'nada', 0],
];
const FIG = { sube: [0, 1, 2, 3, 2, 1], baja: [3, 2, 1, 0, 1, 2], quebrado: [0, 2, 1, 3, 1, 2], pendulo: [0, 3, 1, 3, 2, 3], nada: [] };

for (const [a, b, ac, fig, tapa] of ARMONIA) {
  m.pad(a, b + 0.25, 0.045, ac.slice(0, 3).map((n) => n - 12), tapa);         // cama grave
  const f = FIG[fig], alto = ac.map((n) => n + 12);
  for (let t = a + NEG * 0.5, k = 0; t < b - 0.2 && f.length; t += NEG, k++) {
    const nota = alto[f[k % f.length] % alto.length];
    m.nota(t, nota, (k % 4 === 0 ? 0.022 : 0.015) * (1 - tapa * 0.5), NEG * 1.6, tapa); // acento suave en el primer tiempo
  }
}
// motivo: re–fa–la–sol (y sus regresos)
const motivo = (t, notas, g = 0.03) => notas.forEach((n, i) => m.nota(t + i * NEG * 0.5, n, g, NEG * (i === 3 ? 2.4 : 1.2)));
motivo(G + 0.15, [74, 77, 81, 79], 0.028);
motivo(P + 0.05, [70, 74, 77, 75], 0.03);
motivo(C + 0.3, [74, 78, 81, 79], 0.03);
motivo(Ou + 0.3, [74, 78, 81, 86], 0.04);

// efectos (en el mismo cuadro que la animación)
m.whoosh(G, 0.5, 0.12); m.golpe(G + 0.55, 0.45, 70); m.golpe(G + 0.8, 0.15, 90);       // la bolsa cae y rebota
m.cruje(G + 1.4, 0.25);                                                                  // se tacha «cuero de vaca»
m.burbuja(G + 2.4, 0.08, 420); m.tic(G + 3.0, 0.2, 900);                                 // brota la setita y se tacha
m.sube(Mi + 0.1, 0.8, 50, 57, 0.03); m.zumbido(Mi + 0.3, 3.0, 0.03, 260);                // la seta crece; el micelio se extiende
for (let i = 0; i < 26; i++) m.tic(Ch + 0.25 + (i % 13) * 0.1 + Math.floor(i / 13) * 0.4, 0.05, 2600 + (i % 5) * 200); // aserrín que cae
for (let i = 0; i < 18; i++) m.gota(Ch + 1.85 + i * 0.04, 0.05, 1100 + (i % 6) * 60);   // siembra
m.zumbido(Hi + 0.2, 4.2, 0.03, 330);                                                     // crecimiento fino de las hifas
for (let i = 0; i < 12; i++) m.tic(Hi + 0.4 + i * 0.32, 0.04, 3200);                      // puntas que avanzan
for (let i = 0; i < 14; i++) m.tic(Co + 0.2 + i * 0.115, 0.08, 1500);                     // contador día 1 → 14
m.whoosh(Co + 1.9, 0.6, 0.1); m.golpe(Co + 3.3, 0.5, 55);                                // se despega · golpe de la prensa
m.motor(Cu, 2.2, 0.05); for (let i = 0; i < 4; i++) m.golpe(Cu + 0.2 + i * 0.5, 0.08, 120); // tambor que gira
m.whoosh(Cu + 1.6, 0.6, 0.08);                                                           // sale la lámina
m.golpe(H + 0.2, 0.3, 80); m.metal(H + 3.4, 0.08, 1200);                                 // tarjeta 2021 · brillo de las asas
for (let i = 0; i < 100; i++) if (i % 2 === 0) m.tic(My + 1.2 + i * 0.022, i < 85 ? 0.05 : 0.09, i < 85 ? 2000 : 1300); // cuadritos 85 + 15
m.whoosh(Tr + 1.0, 0.9, 0.08); m.golpe(Tr + 2.0, 0.25, 70);                              // baja la capa de poliuretano
m.golpe(Es + 1.3, 0.3, 65); m.cruje(Es + 3.6, 0.15);                                     // PAUSA · se apagan las luces
for (let i = 0; i < 4; i++) m.tic(Es + 3.7 + i * 0.18, 0.12, 700);                        // clic, clic…
for (let i = 0; i < 22; i++) m.tic(Cm + 0.8 + i * 0.04, 0.04, 900 + (i % 4) * 150);      // aserrín a la composta
m.sube(Cm + 2.2, 0.8, 62, 69, 0.03);                                                     // brota la plantita
m.whoosh(C + 0.5, 0.5, 0.08); m.zumbido(C + 0.6, 2.5, 0.02, 330);                       // se abre la lupa
m.guardar(OUT, 1);
