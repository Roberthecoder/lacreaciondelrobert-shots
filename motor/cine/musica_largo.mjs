// musica_largo.mjs — banda sonora ORIGINAL y continua del largo (sin bucles), compuesta a la medida del video.
// Todo se sintetiza aquí (nada grabado ni de catálogo). Lo llama tiempos_voz.mjs con los bloques ya en tiempo real.
//
// Cómo está compuesta:
//  · Un reloj musical continuo (72 BPM). Cada capítulo es un "cue" con su tonalidad, progresión y carácter
//    (asombro, infancia, juego, misterio, determinación, impulso, expansión, emoción, cierre).
//  · Entre capítulos no hay cortes: en cada tarjeta de capítulo las cuerdas crecen, entra un platillo suave y un
//    timbal, y la armonía nueva llega con el capítulo. Dentro de un capítulo la música NO se reinicia al cambiar
//    de escena: sigue su frase.
//  · La melodía se compone por frases de 4 compases (motivo → variación → desarrollo → cadencia) con conducción
//    de voces, así que nunca se repite igual.
//  · Instrumentos: cuerdas (pad), bajo, piano, celesta, pizzicato (Karplus-Strong), percusión suave y reverberación.
//  · Efectos discretos donde la escena lo pide (contadores, medallas, líquidos), como en los shots.
import fs from 'node:fs';

const SR = 48000;
const BPM = 72, BEAT = 60 / BPM, BAR = BEAT * 4;
const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

// ---- carácter de cada capítulo ----
// acordes: [raíz MIDI, tipo]; tipos: M, m, M7, m7, sus, add9
const CUES = [
  { nombre: 'Gancho',       energia: 0.35, celesta: 1, piano: 0.6, pizz: 0,   perc: 0,   acordes: [[50, 'add9'], [47, 'm7'], [43, 'M7'], [45, 'sus']] },
  { nombre: 'La semilla',   energia: 0.45, celesta: 0.5, piano: 1, pizz: 0.3, perc: 0,   acordes: [[43, 'M'], [50, 'M'], [52, 'm'], [48, 'M7'], [43, 'add9'], [50, 'sus'], [48, 'M'], [50, 'M']] },
  { nombre: 'Primaria',     energia: 0.6,  celesta: 0.3, piano: 0.8, pizz: 1, perc: 0.6, acordes: [[48, 'M'], [43, 'M'], [45, 'm'], [41, 'M7'], [45, 'm'], [41, 'M'], [48, 'M'], [43, 'sus']] },
  { nombre: 'El hongo',     energia: 0.32, celesta: 0.8, piano: 0.5, pizz: 0, perc: 0,   acordes: [[50, 'm7'], [48, 'M'], [46, 'M7'], [48, 'sus']] },
  { nombre: 'Secundaria',   energia: 0.55, celesta: 0.2, piano: 0.9, pizz: 0.4, perc: 0.5, acordes: [[52, 'm'], [48, 'M7'], [43, 'M'], [50, 'M'], [52, 'm'], [45, 'm7'], [48, 'M'], [47, 'M']] },
  { nombre: 'Prepa',        energia: 0.66, celesta: 0.2, piano: 1, pizz: 0.6, perc: 0.75, acordes: [[45, 'm'], [41, 'M'], [48, 'M'], [43, 'M'], [41, 'M7'], [43, 'sus'], [45, 'm'], [40, 'M']] },
  { nombre: 'Universidad',  energia: 0.72, celesta: 0.4, piano: 1, pizz: 0.5, perc: 0.7, acordes: [[41, 'add9'], [48, 'M'], [50, 'm7'], [46, 'M7'], [41, 'M'], [45, 'm'], [46, 'M'], [48, 'sus']] },
  { nombre: 'Lo que viene', energia: 0.82, celesta: 0.6, piano: 1, pizz: 0.4, perc: 0.85, acordes: [[46, 'M'], [48, 'M'], [50, 'm'], [48, 'sus']] },
  { nombre: 'Qué es LCR',   energia: 0.6,  celesta: 0.5, piano: 1, pizz: 0, perc: 0.3, acordes: [[43, 'M7'], [50, 'M'], [52, 'm7'], [45, 'sus']] },
  { nombre: 'Cierre',       energia: 0.5,  celesta: 0.8, piano: 1, pizz: 0, perc: 0,   acordes: [[43, 'M'], [45, 'sus'], [50, 'add9'], [50, 'add9']] },
];
const TIPOS = { M: [0, 4, 7, 12], m: [0, 3, 7, 12], M7: [0, 4, 7, 11], m7: [0, 3, 7, 10], sus: [0, 5, 7, 12], add9: [0, 4, 7, 14] };

export function generarMusica(bloques, total, salida) {
  const N = Math.ceil((total + 0.5) * SR);
  const L = new Float32Array(N), R = new Float32Array(N), REV = new Float32Array(N);
  let semilla = 20261101; const rnd = () => { semilla = (semilla * 1664525 + 1013904223) >>> 0; return semilla / 4294967296; };
  const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);

  // escribe una voz mono en estéreo con paneo y envío a reverb
  const poner = (t0, dur, pan, rev, fn) => {
    const i0 = Math.max(0, Math.floor(t0 * SR)), n = Math.floor(dur * SR);
    const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
    for (let i = 0; i < n && i0 + i < N; i++) { const x = fn(i / SR, i); L[i0 + i] += x * gl; R[i0 + i] += x * gr; REV[i0 + i] += x * rev; }
  };
  const adsr = (u, d, a, r) => Math.min(1, u / a) * Math.min(1, Math.max(0, (d - u) / r));

  // ---- instrumentos ----
  const cuerdas = (t0, dur, notas, g, brillo) => notas.forEach((mm, k) => {
    const f = hz(mm), det = [0.997, 1, 1.004], ph = [rnd(), rnd(), rnd()]; let y = 0;
    const corte = 600 + 1800 * brillo, a = 1 - Math.exp(-2 * Math.PI * corte / SR);
    poner(t0, dur + 1.6, (k / (notas.length - 1 || 1)) * 1.2 - 0.6, 0.55, (u) => {
      let s = 0; for (let j = 0; j < 3; j++) { const p = (u * f * det[j] + ph[j]) % 1; s += 2 * p - 1; }
      y += a * (s / 3 - y);
      return y * g * adsr(u, dur + 1.6, 1.4, 1.8) * (0.9 + 0.1 * Math.sin(2 * Math.PI * 5.2 * u));
    });
  });
  const bajo = (t0, dur, mm, g) => { const f = hz(mm); poner(t0, dur, 0, 0.15, (u) => (Math.sin(2 * Math.PI * f * u) + 0.35 * Math.sin(4 * Math.PI * f * u)) * g * adsr(u, dur, 0.04, 0.3)); };
  const piano = (t0, mm, g, pan = 0.15) => { const f = hz(mm), d = 2.6;
    poner(t0, d, pan, 0.45, (u, i) => {
      const s = Math.sin(2 * Math.PI * f * u) + 0.5 * Math.sin(2 * Math.PI * 2.002 * f * u) * Math.exp(-u * 2) + 0.22 * Math.sin(2 * Math.PI * 3.005 * f * u) * Math.exp(-u * 4) + 0.1 * Math.sin(2 * Math.PI * 4.01 * f * u) * Math.exp(-u * 6);
      return (s * Math.exp(-u * 1.6) + NOISE[i % NOISE.length] * Math.exp(-u * 300) * 0.15) * g * Math.min(1, u / 0.004);
    }); };
  const celesta = (t0, mm, g, pan = -0.35) => { const f = hz(mm); poner(t0, 1.8, pan, 0.7, (u) => (Math.sin(2 * Math.PI * f * u) + 0.3 * Math.sin(2 * Math.PI * 4 * f * u) * Math.exp(-u * 8)) * Math.exp(-u * 2.6) * g * Math.min(1, u / 0.002)); };
  const pizz = (t0, mm, g, pan = 0.4) => { // Karplus-Strong: cuerda pulsada
    const f = hz(mm), P = Math.max(2, Math.round(SR / f)), buf = Float32Array.from({ length: P }, () => rnd() * 2 - 1); let k = 0;
    poner(t0, 0.9, pan, 0.4, () => { const a = buf[k % P], b = buf[(k + 1) % P]; buf[k % P] = 0.5 * (a + b) * 0.993; k++; return a * g; });
  };
  const bombo = (t0, g) => { let ph = 0; poner(t0, 0.5, 0, 0.1, (u) => { ph += 2 * Math.PI * (48 + 70 * Math.exp(-u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 8) * g; }); };
  const shaker = (t0, g, pan) => { let y = 0, px = 0; poner(t0, 0.09, pan, 0.2, (u, i) => { const x = NOISE[(i * 7 + Math.floor(t0 * 1000)) % NOISE.length]; y = 0.85 * (y + x - px); px = x; return y * Math.exp(-u * 60) * g; }); };
  const timbal = (t0, mm, g) => { const f = hz(mm); poner(t0, 2.5, 0, 0.6, (u, i) => (Math.sin(2 * Math.PI * f * u) * 0.8 + Math.sin(2 * Math.PI * f * 1.5 * u) * 0.25 + NOISE[i % NOISE.length] * Math.exp(-u * 40) * 0.3) * Math.exp(-u * 1.6) * g); };
  const platillo = (t1, d, g) => { let y = 0, px = 0; poner(t1 - d, d + 0.3, 0, 0.8, (u, i) => { const x = NOISE[(i * 3) % NOISE.length]; y = 0.96 * (y + x - px); px = x; return y * Math.pow(Math.min(1, u / d), 2.5) * Math.min(1, (d + 0.3 - u) / 0.3) * g; }); };
  // efectos discretos (como en los shots)
  const tic = (t0, g, f) => poner(t0, 0.06, 0.2, 0.1, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 90) * g);
  const brillo = (t0, g) => [1, 2.76, 5.4].forEach((k) => poner(t0, 1.2, -0.2, 0.6, (u) => Math.sin(2 * Math.PI * 1100 * k * u) / k * Math.exp(-u * 4) * g));
  const gota = (t0, g, f0) => { let ph = 0; poner(t0, 0.18, 0.3, 0.4, (u) => { ph += 2 * Math.PI * (f0 + 900 * Math.exp(-u * 40)) / SR; return Math.sin(ph) * Math.exp(-u * 25) * g; }); };

  // ---- dónde empieza cada capítulo (la tarjeta) ----
  const caps = [];
  bloques.forEach((b) => { if (!caps[b.cap]) caps[b.cap] = { t0: b.at, t1: b.at + b.dur }; caps[b.cap].t1 = Math.max(caps[b.cap].t1, b.at + b.dur); });
  const lista = caps.map((c, i) => c && { ...c, i }).filter(Boolean);
  lista.forEach((c, k) => { c.t1 = k + 1 < lista.length ? lista[k + 1].t0 : total; });

  // ---- composición ----
  let ultimaMelodia = 74, voces = null;
  const cerca = (acorde, prev) => { // conducción de voces: cada voz va a la nota más cercana del nuevo acorde
    if (!prev) return acorde;
    return prev.map((p) => { let best = acorde[0], bd = 99; for (const a of acorde) for (const o of [-12, 0, 12]) { const n = a + o; if (Math.abs(n - p) < bd) { bd = Math.abs(n - p); best = n; } } return best; });
  };
  lista.forEach((c, ci) => {
    const cue = CUES[c.i % CUES.length], E = cue.energia;
    const dur = c.t1 - c.t0;
    const compas = cue.energia < 0.4 ? BAR * 2 : BAR;          // acordes más largos en lo tranquilo
    const nAc = Math.max(1, Math.round(dur / compas));
    const paso = dur / nAc;                                      // el capítulo se reparte en acordes completos
    // crescendo hacia el capítulo siguiente (la tarjeta): cuerdas + platillo
    if (ci > 0) { platillo(c.t0 + 0.3, 2.6, 0.035 + 0.03 * E); timbal(c.t0 + 0.3, cue.acordes[0][0] - 12, 0.16 + 0.1 * E); }
    for (let k = 0; k < nAc; k++) {
      const t = c.t0 + k * paso;
      const [raiz, tipo0] = cue.acordes[k % cue.acordes.length];
      // en cada vuelta de la progresión el acorde cambia de color, para que nunca suene igual
      const vuelta = Math.floor(k / cue.acordes.length);
      const tipo = vuelta % 2 ? ({ M: 'add9', m: 'm7', M7: 'M', m7: 'm', sus: 'M', add9: 'M7' })[tipo0] : tipo0;
      // en la última vuelta del capítulo, el acorde se queda (cadencia) en vez de reiniciar
      const acorde = TIPOS[tipo].map((iv) => raiz + 12 + iv);
      voces = cerca(acorde, voces);
      const fin = ci === lista.length - 1 && k === nAc - 1;
      const sube = Math.min(1, (k + 1) / nAc);                   // cada capítulo crece un poco hacia su final
      cuerdas(t, paso + (fin ? 6 : 0.4), voces, 0.028 + 0.02 * E * (0.6 + 0.4 * sube), E * (0.7 + 0.3 * sube));
      bajo(t, paso, raiz - 12, 0.07 + 0.04 * E);
      const golpes = Math.round(paso / BEAT);
      // pulso: pizzicato y percusión suave según la energía
      for (let b = 0; b < golpes; b++) {
        const tb = t + b * (paso / golpes);
        if (cue.pizz > 0 && (b % 2 === 0 || E > 0.55)) pizz(tb, voces[(b + k) % voces.length] + (b % 4 === 3 ? 12 : 0), 0.05 * cue.pizz, b % 2 ? 0.45 : -0.45);
        if (cue.perc > 0) { if (b % 4 === 0 || (b % 4 === 2 && E > 0.6)) bombo(tb, 0.12 * cue.perc); shaker(tb + paso / golpes / 2, 0.035 * cue.perc, 0.5); if (E > 0.65) shaker(tb, 0.02 * cue.perc, -0.5); }
        if (E > 0.5 && b % 2 === 1) bajo(tb, paso / golpes * 0.9, raiz - 12 + (b % 4 === 3 ? 7 : 0), 0.035 * E);
      }
      // celesta: brillos sueltos en los momentos de asombro
      if (cue.celesta > 0) for (let b = 0; b < golpes * 2; b++) if (rnd() < 0.18 * cue.celesta) celesta(t + b * paso / (golpes * 2), acorde[Math.floor(rnd() * 4)] + 24, 0.03);
      // melodía (piano): frases de 4 acordes = motivo, variación, desarrollo, cadencia
      if (cue.piano > 0) {
        const fase = k % 4, ritmo = [[0, 1.5, 2, 3], [0, 0.5, 1, 2, 3], [0, 2, 2.5, 3.5], [0, 1, 2]][fase];
        const escala = [...new Set(acorde.flatMap((n) => [n + 12, n + 24]))].sort((a, b) => a - b);
        ritmo.forEach((r, j) => {
          if (rnd() < 0.15 && fase !== 3) return;                          // respiraciones
          const tt = t + r * (paso / 4);
          if (tt > c.t1 - 0.3) return;
          // camina hacia la nota del acorde más cercana, con tendencia a subir en el desarrollo y bajar en la cadencia
          const dir = fase === 2 ? 1 : fase === 3 ? -1 : (rnd() < 0.5 ? -1 : 1);
          const cand = escala.filter((n) => n >= 64 && n <= 88);
          let n = cand.reduce((a, b) => (Math.abs(b - (ultimaMelodia + dir * 2)) < Math.abs(a - (ultimaMelodia + dir * 2)) ? b : a), cand[0]);
          if (fase === 3 && j === ritmo.length - 1) n = cand.reduce((a, b) => (Math.abs(b - (raiz + 24)) < Math.abs(a - (raiz + 24)) ? b : a), cand[0]); // cadencia a la raíz
          ultimaMelodia = n;
          piano(tt, n, (0.05 + 0.03 * E) * cue.piano * (j === 0 ? 1.15 : 0.9));
        });
      }
    }
  });
  // final: acorde que se queda y se apaga
  const tf = total - 8; cuerdas(tf, 7.5, [62, 66, 69, 74], 0.05, 0.5); piano(tf, 74, 0.07); piano(tf + 0.4, 78, 0.06); piano(tf + 0.8, 81, 0.06); celesta(tf + 1.2, 86, 0.04);

  // ---- efectos discretos de pantalla ----
  bloques.forEach((b) => {
    const id = b.id || '';
    if (b.tipo === 'numero') for (let j = 0; j < 12; j++) tic(b.at + 0.3 + j * 0.12, 0.05, 1800 + j * 60);
    if (/plata|bronce|medalla|torre_sej|reconocimientos|monedas/.test(id)) brillo(b.at + b.dur * 0.35, 0.03);
    if (/gelatina|bagazo|agar|papaya/.test(id)) for (let j = 0; j < 3; j++) gota(b.at + 0.8 + j * 0.6, 0.06, 820 + j * 60);
  });

  // ---- reverberación (Freeverb simplificado) ----
  const combs = [1557, 1617, 1491, 1422, 1277, 1356].map((n) => Math.round(n * SR / 44100));
  const alls = [556, 441].map((n) => Math.round(n * SR / 44100));
  const reverb = (out, desf) => {
    const cb = combs.map((n) => ({ b: new Float32Array(n + desf), i: 0, f: 0 })), ab = alls.map((n) => ({ b: new Float32Array(n), i: 0 }));
    for (let i = 0; i < N; i++) {
      const x = REV[i] * 0.3; let s = 0;
      for (const c of cb) { const y = c.b[c.i]; c.f = y * 0.75 + c.f * 0.25; c.b[c.i] = x + c.f * 0.86; c.i = (c.i + 1) % c.b.length; s += y; }
      for (const a of ab) { const y = a.b[a.i]; a.b[a.i] = s + y * 0.5; a.i = (a.i + 1) % a.b.length; s = y - s * 0.5; }
      out[i] += s * 0.22;
    }
  };
  reverb(L, 0); reverb(R, 23);

  // ---- entrada y salida suaves, y escribir WAV estéreo 16 bits ----
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    const t = i / SR, f = Math.min(1, t / 2.5, (total + 0.5 - t) / 4);
    buf.writeInt16LE(Math.round(Math.tanh(L[i] * 1.4 * f) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.tanh(R[i] * 1.4 * f) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(salida, buf);
  console.log(`música original: ${(total / 60).toFixed(2)} min · ${lista.length} cues`);
}
