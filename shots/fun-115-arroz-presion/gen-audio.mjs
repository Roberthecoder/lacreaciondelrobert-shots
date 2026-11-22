// gen-audio.mjs — cama musical + efectos del Shot Fungi Mati #115 (añublo del arroz, Magnaporthe oryzae). Sin costo: todo se calcula (audio-kit.mjs).
// Uso: node gen-audio.mjs                               → assets/mezcla.wav (versión de revisión sin voz)
//      node gen-audio.mjs <archivo.dc.html> <salida.wav>   (narrar.mjs: versión narrada)
// Música (composicion-musical.md): 100 BPM, compás de 2.4 s. Cada parte tiene su progresión y su figura de arpegio; ningún patrón dura
// más de 4 compases. Arco: misterio (la hoja) → curiosidad (la espora) → tensión que sube con la presión → silencio antes de la clavija
// → golpe y avance (estudio, invasión) → se abre en el trigo → resuelve en el cierre. Siempre debajo de la voz.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = process.argv[2] || 'Shot Arroz base narrada.dc.html', OUT = process.argv[3] || path.join('assets', 'mezcla.wav');
const m = mezcla(HERE, HTML, 115);
const K = m.K;
const G = K.Gancho, H = K.Hongo, Es = K.Espora, Ap = K.Apresorio, Me = K.Melanina, Pr = K.Presion, P = K.Pregunta, Cl = K.Clavija,
  E = K.Estudio, I = K.Invade, Tr = K.Trigo, C = K.Cierre, Ou = K.Outro;
const macroI = I + 3.0;

// Acordes (MIDI) por nombre: graves para la cama, y su arpegio una octava arriba.
const AC = { Am: [45, 52, 57, 60], F: [41, 48, 53, 57], C: [48, 52, 55, 60], G: [43, 50, 55, 59], Dm: [38, 45, 50, 53], E: [40, 47, 52, 56],
  Esus: [40, 47, 52, 57], Bb: [46, 53, 58, 62], Fmaj7: [41, 48, 52, 57], Am9: [45, 52, 59, 60], Dm7: [38, 45, 48, 53], Gsus: [43, 50, 55, 60] };
const BAR = 2.4, B8 = BAR / 8;
// Figuras de arpegio (índices del acorde +12; null = silencio). Cambian por sección.
const FIG = {
  a: [0, null, 2, null, 1, null, 3, null],      // respirada: misterio
  b: [0, 2, 1, 3, null, 2, 1, null],            // curiosa
  c: [0, 1, 2, 3, 2, 1, 2, 3],                  // tensa: corchea continua
  d: [3, null, 2, 1, 0, null, null, null],      // baja, cae
  e: [0, 2, 3, 2, 1, 2, 3, null],               // avanza
  f: [2, null, 3, 2, null, 1, 0, null],         // se abre
};
// Secciones: [inicio, fin, [acordes por compás], figura, ganancia del arpegio, tapa (0 = abierto)]
const SEC = [
  [G, Es, ['Am', 'F', 'Am', 'Esus'], 'a', 0.016, 0.25],
  [Es, Pr, ['Dm', 'Am', 'Bb', 'E', 'Dm7', 'Am'], 'b', 0.017, 0.15],
  [Pr, P, ['Am', 'Am9', 'F', 'E'], 'c', 0.019, 0.05],
  [Cl, I, ['Dm', 'Bb', 'C', 'E', 'Am'], 'e', 0.018, 0.1],
  [I, Tr, ['Am', 'Dm', 'F', 'E'], 'd', 0.016, 0.2],
  [Tr, C, ['F', 'G', 'Am', 'Fmaj7'], 'f', 0.017, 0.05],
  [C, Ou + 4, ['F', 'Gsus', 'C', 'Am9'], 'a', 0.016, 0.0],
];
for (const [a, b, acordes, fig, ga, tapa] of SEC) {
  const n = Math.max(1, Math.ceil((b - a) / BAR));
  for (let k = 0; k < n; k++) {
    const t0 = a + k * BAR, t1 = Math.min(b, t0 + BAR); if (t1 - t0 < 0.3) continue;
    const ch = AC[acordes[k % acordes.length]];
    m.pad(Math.max(a, t0 - 0.25), Math.min(b + 0.25, t1 + 0.25), 0.042, ch.slice(0, 3), tapa);   // cama grave continua (se encima 0.25 s)
    m.bajo(t0, ch[0] - 12, 0.05, 1.6);                                                              // pulso grave suave al inicio del compás
    const f = FIG[fig];
    for (let j = 0; j < 8; j++) {
      const idx = f[(j + (k % 2) * 2) % 8];         // la figura de la sección, desplazada en los compases pares…
      if (idx == null) continue;
      const tt = t0 + j * B8 + (j % 2 ? 0.012 : 0); // swing leve
      if (tt >= t1) break;
      const nota = ch[idx] + 12 + (k % 4 === 3 && j === 7 ? 2 : 0);   // …y cada 4.º compás termina distinto
      m.nota(tt, nota, ga * (j % 4 === 0 ? 1.15 : 0.85), 0.55, tapa);
    }
  }
}
// Tema (4 notas) que aparece en el gancho, regresa en otro registro en el estudio y cierra en el final.
const TEMA = [[0, 69, 0.9], [0.6, 72, 0.6], [1.2, 71, 0.6], [1.8, 64, 1.2]];
const tema = (t, tr = 0, g = 0.028) => TEMA.forEach(([dt, n, d]) => m.nota(t + dt, n + tr, g, d));
tema(G + 1.2); tema(E + 3.2, -12, 0.03); tema(C + 1.0, 0, 0.026);
m.nota(Ou + 0.3, 57, 0.06, 3.2); m.nota(Ou + 0.3, 64, 0.045, 3.2); m.nota(Ou + 0.3, 69, 0.04, 3.2); m.nota(Ou + 0.8, 76, 0.03, 2.6);

// Pregunta: casi silencio (solo un pedal agudo que sube): "¿y para qué tanta presión?"
m.sube(P + 0.05, 1.7, 64, 71, 0.03);

// ---- efectos, en el mismo cuadro que la imagen ----
m.whoosh(G + 0.05, 1.4, 0.05);                                    // la mancha crece en la hoja
m.cruje(G + 2.0, 0.25);                                           // «¿una mordida?» tachado
m.whoosh(G + 3.1, 0.5, 0.08); m.gota(G + 3.5, 0.14, 1200);         // lupa: el poro
for (let i = 0; i < 4; i++) m.tic(H + 0.3 + i * 0.28, 0.05, 2400 + i * 200); // aparecen las manchas en la mata
m.golpe(H + 1.3, 0.18, 70);                                       // chip de pérdidas
m.whoosh(Es - 0.3, 0.8, 0.07);                                     // entramos al microscopio
m.gota(Es + 1.1, 0.2, 650);                                       // la espora cae y toca la hoja
m.burbuja(Es + 1.4, 0.06, 900); m.burbuja(Es + 1.7, 0.05, 1100);  // sale el pegamento
m.sube(Ap + 0.1, 1.4, 60, 64, 0.025);                             // crece el tubo germinativo
for (let i = 0; i < 4; i++) m.burbuja(Ap + 1.5 + i * 0.22, 0.05, 420 + i * 80); // se infla el domo
m.sube(Me + 0.1, 1.2, 50, 45, 0.035);                             // se oscurece (melanina)
for (let i = 0; i < 8; i++) m.tic(Me + 1.4 + i * 0.17, 0.05, 3000 + (i % 3) * 400); // puntitos de glicerol
m.whoosh(Me + 2.6, 1.0, 0.07);                                    // la cámara se acerca
for (let i = 0; i < 12; i++) m.gota(Pr + 0.5 + i * 0.32, 0.07, 800 + (i % 4) * 120); // gotas de agua que entran
m.metal(Pr + 1.9, 0.07, 900);                                     // el glicerol choca y no sale
m.sube(Pr + 0.6, 3.6, 43, 55, 0.05);                              // la presión sube
m.zumbido(Pr + 2.0, 2.4, 0.02, 110);
m.golpe(Pr + 4.5, 0.3, 75); m.motor(Pr + 4.5, 1.6, 0.04);          // ×40 y la llanta que gira
m.golpe(Cl + 0.05, 0.25, 60);
m.cruje(Cl + 1.0, 0.45);                                           // se agrieta la cutícula
m.cruje(Cl + 1.8, 0.55); m.golpe(Cl + 1.9, 0.22, 55);              // se rompe la pared celular
m.burbuja(Cl + 3.2, 0.07, 500); m.burbuja(Cl + 3.6, 0.06, 420);    // la clavija se hincha adentro
m.golpe(E + 0.2, 0.32, 80); m.metal(E + 0.25, 0.08, 2000);         // tarjeta 1991
[3.5, 4.0, 4.5].forEach((t0) => { m.cruje(E + t0 + 0.5, 0.25); m.tic(E + t0 + 0.6, 0.1, 1600); }); // tres clavijas perforan el plástico
[0, 0.9, 1.1, 1.3, 1.8, 2.0].forEach((o) => { for (let k = 0; k < 3; k++) m.burbuja(I + 0.3 + o * 0.9 + k * 0.12, 0.05, 380 + k * 60); }); // hifas que pasan
m.whoosh(macroI - 0.2, 0.9, 0.08);                                // nos alejamos a la hoja
for (let i = 0; i < 12; i++) m.burbuja(macroI + 1.0 + i * 0.12, 0.04, 1300 + (i % 4) * 150); // esporas nuevas al aire
m.whoosh(Tr + 0.1, 1.8, 0.06);                                    // viento en el trigo
m.sube(Tr + 0.5, 1.7, 62, 57, 0.025);                              // la espiga se blanquea
m.whoosh(Tr + 2.0, 1.4, 0.06); m.metal(Tr + 3.4, 0.07, 1500);      // la flecha llega a Bangladés
m.gota(C + 0.6, 0.1, 1100); m.golpe(C + 1.2, 0.18, 70);            // lupa y chip del cierre
m.guardar(OUT, 1);
