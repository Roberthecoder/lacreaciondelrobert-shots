// audio-kit.mjs (copia local; original en otras ramas: motor/kit/audio-kit.mjs) — sintetizador compartido para los gen-audio.mjs de los shots (27 oct 2026).
// Todo se calcula aquí (nada grabado ni de catálogo). Uso desde un shot:
//   import { mezcla } from '../../motor/kit/audio-kit.mjs';
//   const m = mezcla(HERE, 'Shot X base narrada.dc.html');   // lee OM_SCENES (dur/nat) del html
//   m.pad(0, m.K.Outro + 3.5); m.nota(m.K.Gancho + 0.3, 69); ... ; m.guardar('assets/mezcla.wav');
// Los tiempos se dan en tiempo de AUTOR (el de K / CUES); en la narrada se convierten a tiempo real con warp().
import fs from 'node:fs';
import path from 'node:path';

export function mezcla(dir, html, semilla = 7) {
  const src = fs.readFileSync(path.join(dir, html), 'utf8');
  const scenes = JSON.parse(src.match(/window\.OM_SCENES = '(.*?)';/)[1]);
  const K = {}, SEC = []; let acc = 0, accA = 0;
  for (const s of scenes) { const nat = s.nat || s.dur; if (!(s.name in K)) K[s.name] = accA; SEC.push({ p: acc, a: accA, dur: s.dur, nat }); acc += s.dur; accA += nat; }
  const warp = (ta) => { for (let i = SEC.length - 1; i >= 0; i--) { const x = SEC[i]; if (ta >= x.a) return x.p + (ta - x.a) * x.dur / x.nat; } return ta; };
  const TOTAL = acc, SR = 48000, N = Math.ceil((TOTAL + 0.3) * SR);
  const mus = new Float32Array(N), sfx = new Float32Array(N);
  let seed = semilla; const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const NOISE = Float32Array.from({ length: SR * 2 }, () => rnd() * 2 - 1);
  const add = (buf, ta, fn, dur) => { const t = warp(ta); const i0 = Math.max(0, Math.floor(t * SR)), n = Math.floor(dur * SR); for (let i = 0; i < n && i0 + i < N; i++) buf[i0 + i] += fn(i / SR, i); };
  const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
  const lp = () => { let y = 0; return (x, f) => { const k = 1 - Math.exp(-2 * Math.PI * f / SR); y += k * (x - y); return y; }; };
  const hp = () => { let y = 0, px = 0; return (x, f) => { const k = Math.exp(-2 * Math.PI * f / SR); y = k * (y + x - px); px = x; return y; }; };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const ESC = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84, 86, 88, 91]; // la menor pentatónica

  const m = {
    K, TOTAL, warp, rnd, hz, ESC, SR,
    // golpecito seco (conteos, clics)
    tic: (t, g = 0.3, f = 2400) => add(sfx, t, (u, i) => (NOISE[(i * 5) % NOISE.length] * 0.5 + Math.sin(2 * Math.PI * f * u)) * Math.exp(-u * 90) * g, 0.06),
    // nota limpia; filtro = 0..1 la "tapa" (sonido ahogado mientras dura el problema)
    nota: (t, mm, g = 0.1, d = 0.6, tapa = 0) => { const f = hz(mm), F = lp(); add(mus, t, (u) => { const x = (Math.sin(2 * Math.PI * f * u) + 0.25 * Math.sin(4 * Math.PI * f * u) + 0.1 * Math.sin(6 * Math.PI * f * u)) * env(u, 0.006, d * 0.4) * g; return tapa ? F(x, 2400 - 2100 * tapa) * (1 + tapa * 0.4) : x; }, d); },
    // pulso grave con golpe suave (para los mudos: el ritmo de la historia)
    bajo: (t, mm, g = 0.12, d = 0.5) => { const f = hz(mm); add(mus, t, (u) => Math.sin(2 * Math.PI * f * u + 0.6 * Math.sin(2 * Math.PI * f * 2 * u) * Math.exp(-u * 8)) * env(u, 0.004, d * 0.35) * g, d); },
    sube: (t, d, m0, m1, g = 0.08) => { let ph = 0; add(mus, t, (u) => { ph += 2 * Math.PI * hz(m0 + (m1 - m0) * (u / d)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / d)) * g; }, d); },
    latido: (t, g = 0.22) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (55 + 30 * Math.exp(-u * 20)) / SR; return Math.sin(ph) * Math.exp(-u * 7) * g; }, 0.6); },
    golpe: (t, g = 0.4, f0 = 85) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 110 * Math.exp(-u * 35)) / SR; return Math.sin(ph) * Math.exp(-u * 9) * g; }, 0.5); },
    metal: (t, g = 0.25, f0 = 820) => add(sfx, t, (u) => [1, 2.76, 5.4].reduce((a, k) => a + Math.sin(2 * Math.PI * f0 * k * u) / k, 0) * Math.exp(-u * 12) * g, 0.6),
    gota: (t, g = 0.25, f0 = 900) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 + 900 * Math.exp(-u * 40)) / SR; return Math.sin(ph) * Math.exp(-u * 25) * g; }, 0.18); },
    burbuja: (t, g = 0.15, f0 = 500) => { let ph = 0; add(sfx, t, (u) => { ph += 2 * Math.PI * (f0 * (1 + u * 6)) / SR; return Math.sin(ph) * Math.sin(Math.PI * Math.min(1, u / 0.09)) * g; }, 0.09); },
    cruje: (t, g = 0.6) => { for (let k = 0; k < 10; k++) m.tic(t + k * 0.03 + rnd() * 0.03, 0.12 * g + 0.04, 1800 + rnd() * 1800); const h = hp(), f = lp(); add(sfx, t + 0.08, (u, i) => h(f(NOISE[(i * 3) % NOISE.length], 900), 150) * Math.sin(Math.PI * Math.min(1, u / 1.0)) * g * 0.2, 1.0); },
    whoosh: (t, d = 0.6, g = 0.22) => { const f = lp(), h = hp(); add(sfx, t, (u, i) => h(f(NOISE[i % NOISE.length], 300 + 3000 * (u / d)), 200) * Math.sin(Math.PI * u / d) * g, d); },
    zumbido: (t, d = 1, g = 0.06, f0 = 190) => add(sfx, t, (u) => (Math.sin(2 * Math.PI * f0 * u + 2 * Math.sin(2 * Math.PI * 23 * u)) * 0.6 + Math.sin(2 * Math.PI * f0 * 2.01 * u) * 0.3) * Math.sin(Math.PI * Math.min(1, u / d)) * g, d),
    motor: (t, d = 2, g = 0.08) => { const f = lp(); add(sfx, t, (u, i) => f(NOISE[i % NOISE.length] * 0.6 + Math.sin(2 * Math.PI * 95 * u) * (0.6 + 0.4 * Math.sin(2 * Math.PI * 31 * u)), 500) * Math.sin(Math.PI * Math.min(1, u / d)) * g, d); },
    // cama grave continua, sin golpe (narrados). tapa 0..1 la ahoga (mudos: estado de la historia)
    pad: (t0, t1, g = 0.05, notas = [45, 52, 57], tapa = 0) => { const f = lp(); const n0 = Math.floor(warp(t0) * SR), n1 = Math.min(N, Math.floor(warp(t1) * SR));
      for (let i = n0; i < n1; i++) { const t = i / SR, u = (i - n0) / (n1 - n0); const x = notas.reduce((a, mm) => a + Math.sin(2 * Math.PI * hz(mm) * t) + 0.3 * Math.sin(2 * Math.PI * hz(mm + 12) * t * 1.003), 0) / notas.length;
        mus[i] += f(x, 520 - 300 * tapa) * g * (0.85 + 0.15 * Math.sin(t * 0.7)) * Math.min(1, u * 8, (1 - u) * 8); } },
    guardar: (out, gan = 1) => {
      const buf = Buffer.alloc(44 + N * 4);
      buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12); buf.writeUInt32LE(16, 16);
      buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
      buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
      for (let i = 0; i < N; i++) {
        const L = Math.tanh((mus[i] * 0.9 + sfx[i] * 0.8) * 1.2 * gan), R = Math.tanh((mus[i] * 0.85 + sfx[i] * 0.8) * 1.2 * gan);
        buf.writeInt16LE(Math.round(L * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R * 32767), 46 + i * 4);
      }
      const o = path.join(dir, out); fs.mkdirSync(path.dirname(o), { recursive: true }); fs.writeFileSync(o, buf);
      console.log(`${out} · ${TOTAL.toFixed(2)} s`);
    },
  };
  return m;
}
// Momento en que un contador con kEase.suave cruza la fracción q (para que cada número suene cuando aparece).
const suave = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
export const cruce = (q) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (suave(mid) < q) lo = mid; else hi = mid; } return lo; };
