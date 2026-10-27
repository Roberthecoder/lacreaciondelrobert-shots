// audio-kit.mjs — síntesis de música y efectos para el gen-audio.mjs de cada shot (sin costo, nada grabado).
// Uso en un shot:
//   import { crearMezcla } from '../../motor/kit/audio-kit.mjs';
//   const M = crearMezcla(rutaDelHtml);       // lee OM_SCENES (con "nat" si es la narrada) y prepara los búferes
//   M.pad(0, M.total, 0.05); M.nota(M.K.Gancho + 1, 60); ...; M.guardar(rutaWav);
// Los tiempos van en "tiempo de autor" (CUES del jsx); warp() los lleva al tiempo real de la voz.
import fs from 'node:fs';
import path from 'node:path';

export function crearMezcla(htmlPath, { seed = 7 } = {}) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1]);
  const K = {}, SEC = []; let acc = 0, accA = 0;
  for (const s of scenes) { const nat = s.nat || s.dur; if (!(s.name in K)) K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
  const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
  const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
  const mus = new Float32Array(N), sfx = new Float32Array(N);
  let sd = seed; const rnd = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
  const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
  const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
  const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
  const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const M = {
    K, total: accA, TOTAL, SR, warp, rnd, hz, mus, sfx, escenas: scenes,
    ESC: [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91],          // la menor pentatónica
    MAY: [48, 52, 55, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88],       // do mayor pentatónica
    tic: (t, g = 0.3, f = 2400) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 90) * g, 0.06),
    nota: (t, m, g = 0.1, d = 0.6) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.25 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.006, d * 0.4) * g; }, d),
    campana: (t, m, g = 0.08, d = 1.6) => add(mus, t, (u) => { const f = hz(m); return [1, 2.0, 3.01, 4.2].reduce((a, k, j) => a + Math.sin(2 * Math.PI * f * k * u) * [1, 0.4, 0.2, 0.08][j], 0) * env(u, 0.004, d * 0.35) * g; }, d),
    pluck: (t, m, g = 0.1, d = 0.5) => add(mus, t, (u) => { const f = hz(m); return ((2 * ((u * f) % 1) - 1) * Math.exp(-u * 9) * 0.5 + Math.sin(2 * Math.PI * f * u) * Math.exp(-u * 6) * 0.6) * g; }, d),
    sube: (t, d, m0, m1, g = 0.08) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); },
    latido: (t, g = 0.22) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (55 + 30 * Math.exp(-u * 20)) / SR; return Math.sin(ph) * Math.exp(-u * 7) * g; }, 0.6); },
    golpe: (t, g = 0.4, f0 = 85) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); },
    metal: (t, g = 0.25, f = 820) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * f * k * u) / k, 0) * Math.exp(-u * 12) * g, 0.6),
    burbuja: (t, g = 0.15, f = 500) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * f * (1 + u * 14) / SR; return Math.sin(ph) * Math.exp(-u * 30) * g; }, 0.12); },
    ruido: (t, d, g = 0.15, f0 = 400, f1 = 3000) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], f0 + (f1 - f0) * (u / d)), 150) * Math.sin(Math.PI * Math.min(1, u / d)) * g, d); },
    whoosh: (t, d = 0.6, g = 0.22) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); },
    pop: (t, g = 0.3) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (900 - 600 * Math.min(1, u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 40) * g; }, 0.1); },
    eructo: (t, d = 0.9, g = 0.3) => { let ph = 0; const f = lp(); add(sfx, t, (u, i) => { ph += 2 * Math.PI * (70 + 25 * Math.sin(u * 40) * Math.exp(-u * 2)) / SR; return f(Math.sign(Math.sin(ph)) * 0.6 + NOISE[i % NOISE.length] * 0.25, 600) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); },
    // cama grave continua y filtrada; corte bajo = música "tapada" (estado de la historia)
    pad: (t0, t1, g = 0.05, notas = [45, 52, 57], corte = 520) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
      for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / Math.max(1, n1 - n0); const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
        mus[i] += f(x, corte) * g * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8); } },
    guardar: (out, { musG = 0.9, sfxG = 0.8 } = {}) => {
      const buf = Buffer.alloc(44 + N * 4);
      buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
      buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
      buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
      for (let i = 0; i < N; i++) {
        const L2 = Math.tanh((mus[i] * musG + sfx[i] * sfxG) * 1.2), R2 = Math.tanh((mus[i] * musG * 0.95 + sfx[i] * sfxG) * 1.2);
        buf.writeInt16LE(Math.round(L2 * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R2 * 32767), 46 + i * 4);
      }
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buf);
      console.log(`${path.basename(out)} · ${TOTAL.toFixed(2)} s`);
    },
  };
  return M;
}
// Momento en que un contador con kEase.suave cruza la fracción q (cada número suena cuando aparece).
export const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const cruce = (q) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (suave(m) < q) lo = m; else hi = m; } return lo; };
