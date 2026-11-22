// cama-luminosa.mjs — la música de fondo de los shots narrados (22 nov 2026). Sustituye a la "cama grave continua".
//
// Por qué: Robert comparó contra su referencia (1Cell1Life) y la cama vieja le sonó a "método de tortura": era un zumbido
// fijo de tres notas graves (110, 165 y 220 Hz) al que la mezcla todavía le subía los graves. Medido en YouTube con el
// mismo analizador: el centro de energía de nuestros shots estaba en ~228 Hz y el de la referencia en ~500–600 Hz, sin
// ninguna nota que domine. Esta cama busca eso: registro medio-agudo, acordes que se mueven y un tema que se puede tararear.
//
// Sigue maestro/recetas/composicion-musical.md: 100 BPM, progresiones con función, partes que contrastan, ningún patrón
// de un compás repetido más de 4 veces, tema escrito a mano (motivo → respuesta → secuencia → cadencia) y toque humano
// (intensidades y tiempos que varían un poco). Todo calculado, sin grabaciones ni costo.
//
// Uso (lo llama pad() de audio-kit.mjs): camaLuminosa(mus, SR, n0, n1, { g, semilla })
//   mus: Float32Array donde se suma · n0, n1: muestra inicial y final · g: volumen (0.05 = el de siempre).

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Do mayor. Dos progresiones que se alternan (I–V–vi–IV y I–iii–IV–V). Las voces del colchón cambian de nota en cada
// acorde: ninguna nota se queda fija más de dos compases (una línea fija en el espectrograma se oye como zumbido).
const ACORDES = {
  C:    { bajo: 48, pad: [60, 64, 67, 74], arp: [60, 64, 67, 72, 76, 79] },
  GB:   { bajo: 47, pad: [59, 62, 67, 74], arp: [59, 62, 67, 71, 74, 79] },
  Am7:  { bajo: 45, pad: [57, 60, 64, 72], arp: [60, 64, 67, 69, 72, 76] },
  Fmaj: { bajo: 53, pad: [57, 60, 65, 69], arp: [60, 64, 65, 69, 72, 77] },
  Em7:  { bajo: 52, pad: [59, 62, 64, 71], arp: [59, 62, 64, 67, 71, 74] },
  Gsus: { bajo: 55, pad: [60, 62, 67, 72], arp: [60, 62, 67, 72, 74, 79] },
};
const PROG_A = ['C', 'GB', 'Am7', 'Fmaj'], PROG_B = ['C', 'Em7', 'Fmaj', 'Gsus'];

// Patrones del arpegio (índices dentro de arp; -1 = silencio). Ocho corcheas por compás.
const PATRONES = [
  [0, 2, 1, 3, 2, 4, 3, -1],
  [0, 1, 2, 4, 3, 2, 1, -1],
  [2, 4, 3, 5, 4, 2, 3, 1],
  [0, -1, 2, 3, -1, 4, 3, 2],
  [4, 3, 2, 1, 0, 2, 3, -1],
];

// Tema, escrito nota por nota: [compás, tiempo, nota MIDI, duración en tiempos].
const TEMA_B = [ // sobre PROG_B: motivo → respuesta → secuencia → cadencia abierta
  [0, 0, 76, 1.5], [0, 1.5, 79, 0.5], [0, 2, 74, 2],
  [1, 0, 76, 1], [1, 1, 79, 1], [1, 2, 83, 1.5], [1, 3.5, 81, 0.5],
  [2, 0, 81, 1.5], [2, 1.5, 79, 0.5], [2, 2, 76, 1], [2, 3, 72, 1],
  [3, 0, 74, 2], [3, 2, 71, 1.5],
];
const TEMA_A = [ // sobre PROG_A: el mismo motivo contestado desde arriba, cadencia que cierra
  [0, 0, 79, 1.5], [0, 1.5, 76, 0.5], [0, 2, 72, 2],
  [1, 0, 74, 1], [1, 1, 79, 1], [1, 2, 83, 2],
  [2, 0, 84, 1.5], [2, 1.5, 83, 0.5], [2, 2, 81, 1], [2, 3, 76, 1],
  [3, 0, 81, 1], [3, 1, 79, 1], [3, 2, 77, 0.5], [3, 2.5, 76, 1.5],
];

export function camaLuminosa(mus, SR, n0, n1, { g = 0.05, semilla = 11, bpm = 100 } = {}) {
  let seed = semilla >>> 0; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const T0 = n0 / SR, DUR = (n1 - n0) / SR, beat = 60 / bpm, bar = beat * 4, G = g / 0.05;
  const fin = DUR - 3.4;                                   // los últimos ~3.4 s son el cierre (acorde final que se queda sonando)
  const nBars = Math.max(1, Math.floor(fin / bar));
  const L = Math.max(0, n1 - n0), tmp = new Float32Array(L);   // se compone aparte para no tocar lo que ya haya en mus
  const suma = (t, dur, fn) => { const i0 = Math.floor(t * SR), n = Math.floor(dur * SR); for (let i = 0; i < n; i++) { const k = i0 + i; if (k >= 0 && k < L) tmp[k] += fn(i / SR); } };

  // Timbres
  const colchon = (t, dur, m, a) => { const f = hz(m), d = 1 + (rnd() - 0.5) * 0.004, at = 0.5, rel = 0.9;   // entra y sale despacio
    suma(t, dur + rel, (u) => { const e = Math.min(1, u / at) * (u > dur ? Math.max(0, 1 - (u - dur) / rel) : 1);
      return (Math.sin(2 * Math.PI * f * u) + 0.5 * Math.sin(2 * Math.PI * f * d * u + 1) + 0.18 * Math.sin(4 * Math.PI * f * u) + 0.06 * Math.sin(6 * Math.PI * f * u)) * e * e * a * (0.9 + 0.1 * Math.sin(u * 2.1)); }); };
  const kalimba = (t, m, a, d = 0.55) => { const f = hz(m);                                                // lámina: ataque claro, se apaga pronto
    suma(t, d * 4, (u) => (Math.sin(2 * Math.PI * f * u) * Math.exp(-u / d) + 0.5 * Math.sin(2 * Math.PI * f * 3 * u) * Math.exp(-u / (d * 0.22)) + 0.3 * Math.sin(2 * Math.PI * f * 5.4 * u) * Math.exp(-u / (d * 0.12)) + 0.12 * Math.sin(2 * Math.PI * f * 8.9 * u) * Math.exp(-u / (d * 0.06))) * Math.min(1, u / 0.004) * a); };
  const campanita = (t, m, a, dur) => { const f = hz(m), d = 0.5 + dur * 0.5;                              // el tema: redonda, con un poco de vibrato tardío
    suma(t, d * 4, (u) => { const vib = u > 0.25 ? 1 + 0.003 * Math.sin(2 * Math.PI * 5.2 * (u - 0.25)) : 1;
      return (Math.sin(2 * Math.PI * f * vib * u) + 0.22 * Math.sin(4 * Math.PI * f * vib * u) * Math.exp(-u / 0.3) + 0.2 * Math.sin(2 * Math.PI * f * 4 * u) * Math.exp(-u / 0.16) + 0.08 * Math.sin(2 * Math.PI * f * 6.3 * u) * Math.exp(-u / 0.07)) * Math.min(1, u / 0.012) * Math.exp(-u / d) * a; }); };
  // Sonaja suave: ruido muy agudo y corto en las corcheas (da aire y pulso sin ser batería).
  const RUIDO = Float32Array.from({ length: SR }, () => rnd() * 2 - 1);
  const sonaja = (t, a) => { let y = 0, px = 0; const k = Math.exp(-2 * Math.PI * 5200 / SR), off = Math.floor(rnd() * SR * 0.5);
    suma(t, 0.07, (u) => { const x = RUIDO[(off + Math.floor(u * SR)) % SR]; y = k * (y + x - px); px = x; return y * Math.min(1, u / 0.003) * Math.exp(-u / 0.018) * a; }); };
  const bajo = (t, dur, m, a) => { const f = hz(m);                                                        // suave y corto: da piso sin zumbar
    suma(t, dur, (u) => (Math.sin(2 * Math.PI * f * u) + 0.3 * Math.sin(4 * Math.PI * f * u)) * Math.min(1, u / 0.03) * Math.exp(-u / (dur * 0.45)) * a); };

  // Forma por ciclos de 4 compases: entrada (solo colchón y arpegio ralo) → A → B con tema → A sin tema (respiro) →
  // B con tema → A con tema… El arpegio cambia de patrón cada 2 compases.
  for (let b = 0; b < nBars; b++) {
    const ciclo = Math.floor(b / 4), enB = ciclo % 2 === 1, prog = enB ? PROG_B : PROG_A;
    const ac = ACORDES[prog[b % 4]], t = b * bar, entrada = ciclo === 0, respiro = ciclo === 3;
    const energia = entrada ? 0.75 : respiro ? 0.85 : 1;
    ac.pad.forEach((m, i) => colchon(t, bar, m, 0.012 * G * (i === ac.pad.length - 1 ? 0.6 : 1)));
    bajo(t, beat * 2.5, ac.bajo, 0.05 * G); if (!entrada && b % 2 === 1) bajo(t + beat * 2.5, beat * 1.4, ac.bajo + 7, 0.03 * G);
    if (!entrada) for (let k = 0; k < 8; k++) { if (respiro && k % 2 === 0) continue; if (k === 7 && b % 4 === 3) continue; sonaja(t + k * beat / 2 + (rnd() - 0.5) * 0.008, 0.22 * G * (k % 2 ? 1 : 0.55) * (0.8 + rnd() * 0.4)); }
    const pat = PATRONES[(Math.floor(b / 2) + ciclo * 2) % PATRONES.length];
    pat.forEach((idx, k) => { if (idx < 0 || (entrada && k % 2 === 1 && b < 2)) return;
      const acento = k === 0 ? 1.25 : k === 4 ? 1.1 : 0.85;
      kalimba(t + k * beat / 2 + (rnd() - 0.5) * 0.012, ac.arp[idx], 0.07 * G * acento * energia * (0.85 + rnd() * 0.3)); });
    if (prog[b % 4] === 'Gsus') colchon(t + beat * 2, beat * 2, 59, 0.02 * G);                             // el sus4 resuelve a sol mayor
  }
  for (let c = 1; c * 4 * bar < fin - bar; c++) {
    if (c === 3) continue;                                                                               // respiro: un ciclo sin tema
    const tema = c % 2 === 1 ? TEMA_B : TEMA_A, base = c * 4 * bar;
    for (const [cb, tb, m, d] of tema) { const t = base + cb * bar + tb * beat; if (t < fin - 0.3) campanita(t + (rnd() - 0.5) * 0.01, m, 0.05 * G * (0.9 + rnd() * 0.2), d * beat); }
  }
  // Cierre: sube el arpegio de do y el acorde se queda sonando.
  const tc = Math.max(0, nBars * bar);
  ACORDES.C.pad.forEach((m) => colchon(tc, Math.max(0.5, DUR - tc - 1.0), m, 0.013 * G));
  bajo(tc, 2.4, 48, 0.03 * G);
  [60, 64, 67, 72, 76, 79, 84].forEach((m, i) => kalimba(tc + i * 0.14, m, 0.05 * G * (0.8 + i * 0.05), 0.9));
  campanita(tc + 1.1, 88, 0.03 * G, 2);
  // Entrada y salida suaves de toda la cama.
  for (let i = 0; i < L; i++) { const u = i / SR; mus[n0 + i] += tmp[i] * Math.min(1, u / 0.15, (DUR - u) / 1.2); }
  return { compases: nBars, bpm, T0 };
}
