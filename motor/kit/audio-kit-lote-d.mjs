// audio-kit.mjs — sintetizador compartido para los gen-audio.mjs de cada shot (sin costo: nada grabado).
// Uso en un shot:  import { crearAudio } from '../../motor/kit/audio-kit.mjs';
//   const A = crearAudio(HERE, 'Shot X base narrada.dc.html');  → A.K = { Escena: inicio (tiempo de autor) }
//   A.pad(0, A.FIN, 0.05); A.nota(A.K.Gancho + 0.3, 69); ...; A.guardar('assets/mezcla.wav');
// Los tiempos van en TIEMPO DE AUTOR (los mismos del .jsx); si la narración estiró una escena (campo nat),
// warp() los lleva al tiempo real del video, así cada efecto cae en el mismo cuadro que su animación.
import fs from 'node:fs';
import path from 'node:path';

export function crearAudio(HERE, HTML) {
  const html = fs.readFileSync(path.join(HERE, HTML), 'utf8');
  const scenes = JSON.parse(html.match(/window\.OM_SCENES = '(.*?)';/)[1].replace(/\\'/g, "'"));
  const K = {}, SEC = []; let acc = 0, accA = 0;
  for (const s of scenes) { const nat = s.nat || s.dur; if (!(s.name in K)) K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
  const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
  const TOTAL = acc, FIN = accA, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
  const mus = new Float32Array(N), sfx = new Float32Array(N);
  let seed = 7; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
  const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
  const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
  const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
  const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const ESC = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91];       // la menor pentatónica
  const A = {
    K, FIN, TOTAL, SR, ESC, warp, hz, rnd,
    tic: (t, g = 0.3, f = 2400) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 90) * g, 0.06),
    nota: (t, m, g = 0.1, d = 0.6) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.25 * Math.sin(4 * Math.PI * f * u)) * env(u, 0.006, d * 0.4) * g; }, d),
    // nota "de vidrio" (campanita) para conteos de mudos
    campana: (t, m, g = 0.08, d = 1.2) => add(mus, t, (u) => { const f = hz(m); return (Math.sin(2 * Math.PI * f * u) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * u) * Math.exp(-u * 6)) * env(u, 0.003, d * 0.35) * g; }, d),
    bajo: (t, m, g = 0.12, d = 0.9) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m) / SR; return (Math.sin(ph) + 0.3 * Math.sin(2 * ph)) * env(u, 0.01, d * 0.5) * g; }, d); },
    sube: (t, d, m0, m1, g = 0.08) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); },
    latido: (t, g = 0.22) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (55 + 30 * Math.exp(-u * 20)) / SR; return Math.sin(ph) * Math.exp(-u * 7) * g; }, 0.6); },
    golpe: (t, g = 0.4, f0 = 85) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); },
    metal: (t, g = 0.25, f = 820) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * f * k * u) / k, 0) * Math.exp(-u * 12) * g, 0.6),
    gota: (t, g = 0.25) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (700 + 1400 * Math.exp(-u * 30)) / SR; return Math.sin(ph) * Math.exp(-u * 25) * g; }, 0.25); },
    pop: (t, g = 0.2) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (300 + 900 * u * 8) / SR; return Math.sin(ph) * Math.exp(-u * 40) * g; }, 0.15); },
    chisporroteo: (t, d = 0.8, g = 0.3) => { const h = hp(); add(sfx, t, (u, i) => h(NOISE[(i * 7) % NOISE.length], 3000) * (0.5 + 0.5 * Math.sin(u * 90)) * Math.sin(Math.PI * Math.min(1, u / d)) * g, d); },
    raspa: (t, d = 0.5, g = 0.15) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[(i * 3) % NOISE.length], 2200), 600) * (0.6 + 0.4 * Math.sin(u * 60)) * Math.sin(Math.PI * u / d) * g, d); },
    cruje: (t, g = 0.6) => { for (let k = 0; k < 10; k++) A.tic(t + k * 0.03 + rnd() * 0.03, 0.12 * g + 0.04, 1800 + rnd() * 1800); const h = hp(), f = lp(); add(sfx, t + 0.08, (u, i) => h(f(NOISE[(i * 3) % NOISE.length], 900), 150) * Math.sin(Math.PI * Math.min(1, u / 1.0)) * g * 0.2, 1.0); },
    whoosh: (t, d = 0.6, g = 0.22) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); },
    // cama grave continua (sin golpe). corte(t) opcional = frecuencia del filtro en el tiempo de autor (música "tapada").
    pad: (t0, t1, g = 0.05, notas = [45, 52, 57], corte) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
      for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0); const x = notas.reduce((a, m) => a + Math.sin(2 * Math.PI * hz(m) * t) + 0.3 * Math.sin(2 * Math.PI * hz(m + 12) * t * 1.003), 0) / notas.length;
        const fc = corte ? corte(t0 + (t1 - t0) * u) : 520;
        mus[i] += f(x, fc) * g * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8); } },
    // pulso rítmico suave (para mudos): una nota cada `cada` s entre t0 y t1, con filtro opcional
    pulso: (t0, t1, cada, notas, g = 0.06, d = 0.35) => { let k = 0; for (let t = t0; t < t1 - 0.05; t += cada, k++) A.nota(t, notas[k % notas.length], g, d); },
    // momento en que un contador con kEase.suave cruza la fracción q
    cruce: (q) => { const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2); let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (suave(m) < q) lo = m; else hi = m; } return lo; },
    // filtro pasa-bajas aplicado a la MÚSICA entre t0 y t1 (tiempo de autor): sonido "ahogado" mientras dura el problema
    tapar: (t0, t1, fc = 450) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR)); const fade = 0.25 * SR;
      for (let i = n0; i < n1; i++) { const y = f(mus[i], fc); const w = Math.min(1, (i - n0) / fade, (n1 - i) / fade); mus[i] = mus[i] * (1 - w) + y * w * 1.6; } },
    guardar: (out, ganancia = 1) => {   // ganancia: los mudos (sin voz) van más fuerte, p. ej. 1.8
      const buf = Buffer.alloc(44 + N * 4);
      buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
      buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
      buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
      for (let i = 0; i < N; i++) {
        const L2 = Math.tanh((mus[i] * 0.9 + sfx[i] * 0.8) * 1.2 * ganancia), R2 = Math.tanh((mus[i] * 0.85 + sfx[i] * 0.8) * 1.2 * ganancia);
        buf.writeInt16LE(Math.round(L2 * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R2 * 32767), 46 + i * 4);
      }
      const dest = path.join(HERE, out); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, buf);
      console.log(`${out} · ${TOTAL.toFixed(2)} s`);
    },
  };
  return A;
}
