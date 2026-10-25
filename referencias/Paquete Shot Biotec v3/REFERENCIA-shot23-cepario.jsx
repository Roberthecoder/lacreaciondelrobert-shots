const W = 1080, H = 1920, CX = 540;
const MOTION = { enter: Easing.easeOutExpo, draw: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const BG = '#0b0c10', INK = '#F6F3EC', GOLD = '#E8A62A', GOLD2 = '#F4C25A', TEAL = '#48d9a6', TEALD = '#1f8f6a', BLUE = '#2fa3d8', RED = '#e0483a', ICE = '#cfe6f2', DARK = '#0E0F12';
const FONT = "'Archivo', 'Arial Black', sans-serif", NUM = "'Anton', 'Archivo', sans-serif";
const SHADOW = '0 4px 0 rgba(0,0,0,.85), 0 0 34px rgba(0,0,0,.95)';
const HEX = 'polygon(25% 4%,75% 4%,100% 50%,75% 96%,25% 96%,0 50%)';
const AV = (n) => 'assets/stickers/' + n + '.png';

function prog(T, a, b, ease) {
  if (b <= a) return T >= a ? 1 : 0;
  const p = clamp((T - a) / (b - a), 0, 1);
  return ease ? ease(p) : p;
}
const lerp = (a, b, t) => a + (b - a) * t;
function rng(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function poly(seed, n = 7, jit = 0.4) {
  const r = rng(seed), pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.283 + (r() - 0.5) * 0.5, rad = 50 * (1 - jit + r() * jit);
    pts.push(`${(50 + Math.cos(a) * rad).toFixed(1)}% ${(50 + Math.sin(a) * rad).toFixed(1)}%`);
  }
  return `polygon(${pts.join(',')})`;
}
const wobble = (T, t0, k = 7, f = 26) => (T < t0 ? 0 : Math.exp(-(T - t0) * k) * Math.cos((T - t0) * f));

/* ---------- burst particles with gravity ---------- */
function useBurst(seed, n, spMin, spMax, sMin, sMax) {
  return React.useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: n }, (_, i) => {
      const a = r() * 6.283, sp = spMin + r() * (spMax - spMin);
      return { vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 500 - r() * 400, s: sMin + Math.pow(r(), 1.6) * (sMax - sMin), rot: r() * 360, w: (r() - 0.5) * 700, shape: poly(seed * 10 + i, 5 + (i % 3), 0.45) };
    });
  }, []);
}
function Burst({ T, t0, life, parts, x0, y0, color, floor = 1760 }) {
  const t = T - t0;
  if (t < 0 || t > life) return null;
  const g = 2600, o = 1 - prog(t, life * 0.6, life);
  return <React.Fragment>{parts.map((p, i) => {
    const x = x0 + (p.vx * (1 - Math.exp(-2.2 * t))) / 2.2;
    const y = Math.min(floor - p.s / 2, y0 + p.vy * t + 0.5 * g * t * t);
    return <div key={i} style={{ position: 'absolute', left: x - p.s / 2, top: y - p.s / 2, width: p.s, height: p.s, clipPath: p.shape, background: color, opacity: o, transform: `rotate(${p.rot + p.w * t}deg)` }} />;
  })}</React.Fragment>;
}

/* ---------- VIAL (the persistent protagonist object) ---------- */
function Vial({ x, y, s = 1, rot = 0, fill = 0.55, liq = TEAL, powder = 0, glow = 1, cap = 0, frost = 0, label = 0, o = 1, sx = 1, sy = 1 }) {
  if (o <= 0.01 || s <= 0.01) return null;
  const w = 120, h = 300;
  return (
    <div style={{ position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, opacity: o, transform: `rotate(${rot}deg) scale(${s * sx},${s * sy})`, transformOrigin: '50% 75%' }}>
      <div style={{ position: 'absolute', left: 0, top: 40, width: w, height: h - 40, borderRadius: '20px 20px 42px 42px', border: '6px solid rgba(246,243,236,.9)', boxSizing: 'border-box', overflow: 'hidden', background: 'rgba(255,255,255,.07)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${fill * 100}%`, background: `linear-gradient(180deg, ${liq}aa, ${liq})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${powder * 24}%`, background: `repeating-linear-gradient(45deg, ${GOLD2} 0 6px, ${GOLD} 6px 12px)` }} />
        <div style={{ position: 'absolute', left: 30, bottom: 26, width: 48, height: 48, borderRadius: '50%', opacity: glow, background: `radial-gradient(circle at 35% 30%, #fff1c9, ${GOLD})`, boxShadow: `0 0 26px ${GOLD}` }} />
        <div style={{ position: 'absolute', inset: 0, opacity: frost, background: 'linear-gradient(135deg, rgba(225,244,255,.85), rgba(255,255,255,.2) 60%, rgba(225,244,255,.6))' }} />
        <div style={{ position: 'absolute', left: 12, top: 16, width: 12, height: '58%', borderRadius: 8, background: 'rgba(255,255,255,.28)' }} />
        {label > 0 && <div style={{ position: 'absolute', left: 8, right: 8, top: '30%', height: 56, borderRadius: 6, background: INK, color: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `900 26px ${FONT}`, opacity: label, transform: `scale(${lerp(1.6, 1, label)})` }}>K-12</div>}
      </div>
      <div style={{ position: 'absolute', left: 8, top: 0, width: 104, height: 52, borderRadius: 12, background: GOLD, boxShadow: 'inset 0 -8px 0 rgba(0,0,0,.18)', transform: `translate(${cap * 160}px, ${-cap * 320}px) rotate(${cap * 50}deg)` }} />
    </div>
  );
}

/* ---------- rack geometry (shared by hero + collection) ---------- */
const RY = 1130;
function rackT(T, K) {
  const pull = prog(T, K.C + 0.6, K.C + 2.6, MOTION.enter);
  const res = prog(T, K.R, K.R + 0.7, MOTION.enter);
  return { rs: lerp(1.2, 0.95, pull) * lerp(1, 0.74, res), dy: lerp(0, -40, res) };
}
function slot(c, r, rt) { return { x: CX + (c - 1.5) * 200 * rt.rs, y: RY + (r - 1.5) * 215 * rt.rs + rt.dy, s: 0.5 * rt.rs }; }

function heroVial(T, K) {
  const fall = prog(T, K.H, K.H + 0.55, MOTION.draw);
  let x = CX, y = lerp(-420, 1050, fall), s = 1.6, o = 1, rot = lerp(-28, 0, fall), fill = 0.55, frost = 0, powder = 0, cap = 0, label = 0;
  const e = wobble(T, K.H + 0.55);
  let sx = 1 + 0.3 * e, sy = 1 - 0.3 * e;
  const z = prog(T, K.S - 0.3, K.S + 0.5, MOTION.enter);
  s = lerp(s, 14, z); o = 1 - prog(T, K.S - 0.1, K.S + 0.35);
  if (T >= K.C - 0.1) {
    const back = prog(T, K.C - 0.1, K.C + 0.6, MOTION.pop);
    const rt = rackT(T, K), sl = slot(1, 1, rt), to = prog(T, K.C + 0.7, K.C + 1.3, MOTION.draw);
    o = clamp(back * 1.6, 0, 1); x = lerp(CX, sl.x, to); y = lerp(1000, sl.y, to); s = lerp(lerp(0.2, 1.2, back), sl.s, to); rot = 0; sx = sy = 1;
    const lift = prog(T, K.M1 - 0.2, K.M1 + 0.6, MOTION.draw);
    x = lerp(x, CX, lift); y = lerp(y, 1090, lift); s = lerp(s, 1.2, lift);
    frost = prog(T, K.M1 + 0.6, K.M1 + 1.8);
    const nit = prog(T, K.M2 - 0.2, K.M2 + 0.5, MOTION.enter);
    y = lerp(y, 1160, nit); s = lerp(s, 0.82, nit);
    const lio = prog(T, K.M3, K.M3 + 0.6, MOTION.pop);
    y = lerp(y, 1010, lio); s = lerp(s, 1.7, lio);
    frost *= 1 - prog(T, K.M3, K.M3 + 0.8);
    fill = lerp(0.55, 0.05, prog(T, K.M3 + 0.8, K.M3 + 2.4, MOTION.draw));
    powder = prog(T, K.M3 + 1.4, K.M3 + 2.6, MOTION.draw);
    const fi = prog(T, K.D, K.D + 0.5, MOTION.enter);
    x = lerp(x, 250, fi); y = lerp(y, 1060, fi); s = lerp(s, 1.3, fi);
    label = prog(T, K.D + 0.3, K.D + 0.7, MOTION.pop);
    const ins = prog(T, K.I - 0.1, K.I + 0.4, MOTION.enter);
    x = lerp(x, CX, ins); y = lerp(y, 1150, ins); s = lerp(s, 1.5, ins);
    label *= 1 - prog(T, K.I, K.I + 0.3);
    cap = prog(T, K.I + 0.3, K.I + 0.8, MOTION.pop);
    y += 1400 * prog(T, K.I + 0.9, K.I + 1.5, MOTION.draw);
    o *= 1 - prog(T, K.I + 0.9, K.I + 1.4);
    const land = wobble(T, K.C + 1.3, 9, 30) * (T < K.M1 ? 1 : 0);
    sx = 1 + 0.18 * land; sy = 1 - 0.18 * land;
    const pk = wobble(T, K.M3 + 0.6, 7, 22) * (T > K.M3 ? 1 : 0);
    sx *= 1 + 0.12 * pk; sy *= 1 - 0.12 * pk;
  }
  return { x, y, s, o, rot, fill, frost, powder, cap, label, sx, sy };
}

/* ---------- HOOK: impact ---------- */
function Hook({ T, K }) {
  const shards = useBurst(9, 44, 300, 1000, 20, 90);
  const hit = K.H + 0.55;
  if (T < hit || T > K.S + 0.6) return null;
  const ring = prog(T, hit, hit + 0.7, MOTION.enter);
  const ring2 = prog(T, hit + 0.1, hit + 0.9, MOTION.enter);
  return (
    <React.Fragment>
      {ring < 1 && <div style={{ position: 'absolute', left: CX - 320, top: 1150 - 320, width: 640, height: 640, borderRadius: '50%', border: `18px solid ${GOLD2}`, boxSizing: 'border-box', opacity: 1 - ring, transform: `scale(${0.4 + ring * 1.9})` }} />}
      {ring2 < 1 && <div style={{ position: 'absolute', left: CX - 320, top: 1150 - 320, width: 640, height: 640, borderRadius: '50%', border: `8px solid ${ICE}`, boxSizing: 'border-box', opacity: 1 - ring2, transform: `scale(${0.3 + ring2 * 2.4})` }} />}
      <Burst T={T} t0={hit} life={1.8} parts={shards} x0={CX} y0={1180} color={`linear-gradient(135deg, #ffffff, ${ICE})`} />
    </React.Fragment>
  );
}

/* ---------- CEPA: the organism world inside the vial ---------- */
function Organism({ kind, color, s = 1, rot = 0 }) {
  if (kind === 'rod') return <div style={{ position: 'absolute', left: -75 * s, top: -32 * s, width: 150 * s, height: 64 * s, borderRadius: 40 * s, background: `radial-gradient(circle at 35% 30%, #e6fff5, ${color})`, transform: `rotate(${rot}deg)`, boxShadow: 'inset 0 -8px 14px rgba(0,0,0,.25)' }}>
    <div style={{ position: 'absolute', left: '22%', top: '42%', width: '56%', height: 6 * s, borderRadius: 4, background: 'rgba(14,15,18,.3)' }} /></div>;
  if (kind === 'yeast') return <div style={{ position: 'absolute', left: -55 * s, top: -45 * s, width: 110 * s, height: 90 * s, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff, ${color})` }} />
    <div style={{ position: 'absolute', right: -26 * s, top: -12 * s, width: 46 * s, height: 42 * s, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff, ${color})` }} /></div>;
  return <div style={{ position: 'absolute', left: 0, top: 0, transform: `rotate(${rot}deg)` }}>
    {[0, 38, -34, 80].map((a, i) => <div key={i} style={{ position: 'absolute', left: 0, top: -7 * s, width: (150 - i * 24) * s, height: 14 * s, borderRadius: 8, background: color, transform: `rotate(${a}deg)`, transformOrigin: '0 50%' }} />)}
    <div style={{ position: 'absolute', left: -14 * s, top: -14 * s, width: 28 * s, height: 28 * s, borderRadius: '50%', background: color }} /></div>;
}
function Cepa({ T, K }) {
  const items = React.useMemo(() => {
    const r = rng(21), kinds = ['rod', 'yeast', 'hypha'], cols = [BLUE, RED, INK, TEALD, GOLD2];
    return Array.from({ length: 17 }, (_, i) => ({ kind: kinds[i % 3], color: cols[i % 5], a: r() * 6.283, rad: 230 + r() * 230, rot: r() * 360, s: 0.8 + r() * 0.5, ph: r() * 6 }));
  }, []);
  if (T < K.S - 0.3 || T > K.C + 0.8) return null;
  const z = prog(T, K.S - 0.3, K.S + 0.5, MOTION.enter), ws = lerp(0.35, 1, z), wo = prog(T, K.S - 0.2, K.S + 0.3);
  const iso = prog(T, K.S + 1.6, K.S + 2.6, MOTION.enter);
  const sel = 1 + 0.8 * prog(T, K.S + 1.8, K.S + 2.4, MOTION.pop);
  const sh = prog(T, K.C - 0.2, K.C + 0.5, MOTION.draw);
  const ring = prog(T, K.S + 2.2, K.S + 2.7, MOTION.pop) * (1 - sh);
  const cy = 1020;
  return (
    <div style={{ position: 'absolute', left: CX, top: cy, width: 0, height: 0, transform: `scale(${ws})`, opacity: wo }}>
      {items.map((it, i) => {
        const a = it.a + T * 0.35, rad = it.rad * (1 + iso * 2.4);
        return <div key={i} style={{ position: 'absolute', left: Math.cos(a) * rad, top: Math.sin(a) * rad * 1.15 + Math.sin(T * 2 + it.ph) * 14, opacity: 1 - iso }}>
          <Organism kind={it.kind} color={it.color} s={it.s} rot={it.rot + T * 30} /></div>;
      })}
      <div style={{ position: 'absolute', left: 0, top: 0, opacity: 1 - prog(T, K.C + 0.2, K.C + 0.6), transform: `scale(${sel * (1 - sh * 0.85)})` }}>
        <Organism kind="rod" color={TEAL} s={1.3} rot={Math.sin(T * 2) * 6} />
      </div>
      {ring > 0.01 && <div style={{ position: 'absolute', left: -190, top: -190, width: 380, height: 380, borderRadius: '50%', border: `8px dashed ${GOLD}`, boxSizing: 'border-box', transform: `scale(${ring}) rotate(${T * 60}deg)` }} />}
    </div>
  );
}

/* ---------- CEPARIO + RESERVORIO: the rack ---------- */
function Rack({ T, K }) {
  if (T < K.C + 0.8 || T > K.M1 + 1.2) return null;
  const rt = rackT(T, K), cols = [TEAL, BLUE, RED, GOLD2, TEALD];
  const fallAll = (i) => prog(T, K.M1 - 0.25 + i * 0.02, K.M1 + 0.6 + i * 0.02, MOTION.draw);
  const shelfO = prog(T, K.C + 0.8, K.C + 1.1) * (1 - prog(T, K.M1 - 0.2, K.M1 + 0.3));
  const nodes = [];
  for (let r = 0; r < 4; r++) {
    const sl = slot(0, r, rt);
    nodes.push(<div key={'sh' + r} style={{ position: 'absolute', left: CX - 420 * rt.rs, top: sl.y + 88 * rt.rs, width: 840 * rt.rs, height: 14 * rt.rs, borderRadius: 8, background: 'rgba(246,243,236,.55)', opacity: shelfO }} />);
  }
  let k = 0;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    if (c === 1 && r === 1) continue;
    const i = k++, sl = slot(c, r, rt), p = prog(T, K.C + 0.9 + i * 0.055, K.C + 1.3 + i * 0.055, MOTION.pop);
    nodes.push(<Vial key={'v' + i} x={sl.x} y={sl.y + 1500 * fallAll(i)} s={sl.s * p} fill={0.5} liq={cols[i % 5]} glow={0.8} rot={fallAll(i) * (i % 2 ? 40 : -40)} />);
  }
  return <React.Fragment>{nodes}</React.Fragment>;
}
function Stamps({ T, K }) {
  if (T < K.R + 3.9 || T > K.M1 + 0.2) return null;
  const out = 1 - prog(T, K.M1 - 0.3, K.M1);
  const st = [[K.R + 4.05, 'INVESTIGACIÓN', 300, -6, TEAL], [K.R + 4.45, 'INDUSTRIA', 790, 5, GOLD]];
  return <React.Fragment>{st.map(([t0, txt, x, rot, c], i) => {
    const p = prog(T, t0, t0 + 0.4, MOTION.pop);
    if (p <= 0) return null;
    return <div key={i} style={{ position: 'absolute', left: x, top: 640, transform: `translate(-50%,-50%) scale(${lerp(2.2, 1, p)}) rotate(${rot}deg)`, opacity: clamp(p * 2, 0, 1) * out, font: `900 46px ${FONT}`, fontVariationSettings: "'wdth' 112", letterSpacing: '0.02em', color: DARK, background: c, padding: '10px 22px', borderRadius: 10, whiteSpace: 'nowrap', boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>{txt}</div>;
  })}</React.Fragment>;
}

/* ---------- CONGELAR: ultracongelador ---------- */
function useSnow() { return React.useMemo(() => { const r = rng(5); return Array.from({ length: 16 }, () => ({ x: r() * 480, ph: r(), s: 6 + r() * 10 })); }, []); }
function Freezer({ T, K, front }) {
  const snow = useSnow();
  if (T < K.M1 - 0.1 || T > K.M2 + 0.6) return null;
  const inP = prog(T, K.M1, K.M1 + 0.5, MOTION.pop), z = prog(T, K.M2 - 0.2, K.M2 + 0.5, MOTION.enter);
  const y = lerp(2400, 1090, inP), frost = prog(T, K.M1 + 0.6, K.M1 + 1.8);
  const box = { position: 'absolute', left: CX - 290, top: y - 310, width: 580, height: 620, borderRadius: 40, transform: `scale(${1 + 3.2 * z})`, opacity: 1 - z, boxSizing: 'border-box' };
  if (!front) return <div style={{ ...box, background: `linear-gradient(180deg, ${ICE}, #86aac0)`, border: '12px solid #eaf4fa', boxShadow: '0 40px 80px rgba(0,0,0,.55)' }}>
    <div style={{ position: 'absolute', left: 40, right: 40, top: 40, bottom: 40, borderRadius: 24, background: '#1a2a36' }} /></div>;
  return <div style={{ ...box, border: '12px solid #eaf4fa' }}>
    <div style={{ position: 'absolute', left: 40, right: 40, top: 40, bottom: 40, borderRadius: 24, overflow: 'hidden', background: `linear-gradient(135deg, rgba(225,244,255,${0.35 * frost}), rgba(255,255,255,0) 55%, rgba(225,244,255,${0.3 * frost}))` }}>
      {snow.map((f, i) => { const c = (T * 0.45 + f.ph) % 1; return <div key={i} style={{ position: 'absolute', left: f.x, top: lerp(-20, 540, c), width: f.s, height: f.s, borderRadius: '50%', background: '#fff', opacity: 0.85 * frost }} />; })}
    </div></div>;
}

/* ---------- NITRÓGENO: tanque criogénico ---------- */
function useMist() { return React.useMemo(() => { const r = rng(12); return Array.from({ length: 8 }, () => ({ x: -200 + r() * 400, ph: r(), s: 110 + r() * 110 })); }, []); }
function Tank({ T, K, front }) {
  const mist = useMist();
  if (T < K.M2 - 0.3 || T > K.M3 + 0.6) return null;
  const a = prog(T, K.M2 - 0.2, K.M2 + 0.5, MOTION.enter), d = prog(T, K.M3 - 0.2, K.M3 + 0.5, MOTION.draw);
  const grp = { position: 'absolute', left: 0, top: 1500 * d, width: W, height: H, opacity: a, transform: `scale(${lerp(0.4, 0.82, a)})`, transformOrigin: '540px 1160px' };
  if (!front) return <div style={grp}>
    <div style={{ position: 'absolute', left: CX - 240, top: 830, width: 480, height: 700, borderRadius: '60px 60px 90px 90px', background: 'linear-gradient(90deg, #6f8796, #dfe8ee 45%, #8fa7b6)', boxShadow: '0 40px 80px rgba(0,0,0,.55)' }} />
    <div style={{ position: 'absolute', left: CX - 125, top: 950, width: 250, height: 420, borderRadius: 30, background: '#0c2433' }} />
    <div style={{ position: 'absolute', left: CX - 270, top: 800, width: 540, height: 66, borderRadius: 33, background: '#cdd9e0', boxShadow: '0 10px 20px rgba(0,0,0,.4)' }} /></div>;
  return <div style={grp}>
    <div style={{ position: 'absolute', left: CX - 125, top: 950, width: 250, height: 420, borderRadius: 30, overflow: 'hidden', border: '8px solid #eef4f8', boxSizing: 'border-box', background: 'linear-gradient(180deg, rgba(90,190,240,.25), rgba(47,163,216,.55))' }}>
      {[0, 1, 2, 3, 4, 5].map((i) => { const c = (T * 0.7 + i * 0.17) % 1; return <div key={i} style={{ position: 'absolute', left: 30 + i * 32, top: lerp(400, -20, c), width: 16, height: 16, borderRadius: '50%', border: '3px solid rgba(255,255,255,.7)', boxSizing: 'border-box' }} />; })}
    </div>
    {mist.map((m, i) => { const c = (T * 0.4 + m.ph) % 1; return <div key={i} style={{ position: 'absolute', left: CX + m.x - m.s / 2, top: lerp(800, 560, c) - m.s / 2, width: m.s, height: m.s, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.55), rgba(255,255,255,0) 70%)', opacity: (c < 0.2 ? c / 0.2 : 1 - c) * 0.8, transform: `scale(${0.6 + c})` }} />; })}
  </div>;
}

/* ---------- big kinetic temperature ---------- */
function BigTemp({ T, K, acc, onShake }) {
  if (T < K.M1 + 2.85 || T > K.M3 + 0.35) return null;
  const s1 = prog(T, K.M1 + 2.85, K.M1 + 3.25, MOTION.pop);
  const roll = prog(T, K.M2 + 2.1, K.M2 + 2.8, MOTION.draw);
  const v = Math.round(lerp(-80, -196, roll));
  const punch = 1 + 0.28 * Math.max(0, wobble(T, K.M2 + 2.82, 6, 20));
  const out = 1 - prog(T, K.M3 - 0.1, K.M3 + 0.35, MOTION.draw);
  return <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', transform: `translateY(-50%) scale(${lerp(2.3, 1, s1) * punch}) rotate(${lerp(-8, -3, s1)}deg)`, opacity: clamp(s1 * 2, 0, 1) * out,
    font: `400 300px/1 ${NUM}`, color: INK, textShadow: `12px 12px 0 ${acc}`, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
    {'−' + Math.abs(v)}<span style={{ fontSize: 150, verticalAlign: '0.9em', marginLeft: 12 }}>°C</span></div>;
}

/* ---------- LIOFILIZAR: water leaves ---------- */
function Drops({ T, K }) {
  if (T < K.M3 + 0.8 || T > K.M3 + 3) return null;
  return <React.Fragment>{Array.from({ length: 9 }, (_, i) => {
    const t0 = K.M3 + 0.8 + i * 0.17, p = prog(T, t0, t0 + 0.9, MOTION.enter);
    if (p <= 0 || p >= 1) return null;
    return <div key={i} style={{ position: 'absolute', left: CX - 40 + ((i * 37) % 80) + Math.sin(p * 6 + i) * 20, top: lerp(760, 470, p), width: 26, height: 26, borderRadius: '50% 50% 50% 0', background: 'rgba(170,235,215,.9)', opacity: 1 - p, transform: `rotate(-45deg) scale(${1 - 0.5 * p})` }} />;
  })}</React.Fragment>;
}

/* ---------- FICHA ---------- */
const ROWS = [['Especie', 'Escherichia coli'], ['Cepa', 'K-12'], ['Aislada en', '1922'], ['Conservación', '−80 °C · liofilizada'], ['Código', 'ATCC 10798']];
function Ficha({ T, K }) {
  if (T < K.D + 0.2 || T > K.I + 0.5) return null;
  const p = prog(T, K.D + 0.35, K.D + 0.85, MOTION.pop), off = prog(T, K.I - 0.1, K.I + 0.4, MOTION.draw);
  const line = prog(T, K.D + 0.6, K.D + 1.0, MOTION.draw) * (1 - off);
  return <React.Fragment>
    <div style={{ position: 'absolute', left: 330, top: 1060, width: 130 * line, borderTop: `6px dashed ${GOLD}` }} />
    <div style={{ position: 'absolute', left: 470, top: 790, width: 570, borderRadius: 26, overflow: 'hidden', background: INK, boxShadow: '0 30px 70px rgba(0,0,0,.6)', transform: `translateX(${off * 900}px) scale(${p}) rotate(${lerp(6, 0, p)}deg)`, transformOrigin: '0 50%' }}>
      <div style={{ background: DARK, color: INK, font: `400 44px ${NUM}`, letterSpacing: '0.04em', padding: '18px 30px' }}>FICHA DE CEPA</div>
      <div style={{ padding: '14px 30px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROWS.map(([k, v], i) => {
          const q = prog(T, K.D + 0.9 + i * 0.3, K.D + 1.3 + i * 0.3, MOTION.enter);
          return <div key={i} style={{ opacity: q, transform: `translateX(${(1 - q) * 40}px)` }}>
            <div style={{ font: `700 24px ${FONT}`, color: '#6f6a60', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
            <div style={{ font: `900 38px/1.1 ${FONT}`, color: DARK, fontStyle: i === 0 ? 'italic' : 'normal' }}>{v}</div>
          </div>;
        })}
      </div>
    </div>
  </React.Fragment>;
}

/* ---------- INSULINA: E. coli + plásmido ---------- */
function Insulina({ T, K }) {
  const sparks = useBurst(33, 22, 400, 1100, 14, 46);
  if (T < K.I + 0.4 || T > K.E + 0.6) return null;
  const IP = K.I + 4.6;
  const em = prog(T, K.I + 0.5, K.I + 1.1, MOTION.pop), ex = prog(T, K.E - 0.2, K.E + 0.4, MOTION.draw);
  const cy = lerp(1150, 900, em), sc = lerp(0.3, 2.0, em) * (1 - ex);
  const ant = prog(T, IP - 0.3, IP, MOTION.draw) * (T < IP ? 1 : 0), wb = wobble(T, IP, 6, 24);
  const sx = 1 + 0.12 * ant + 0.22 * wb, sy = 1 - 0.16 * ant - 0.22 * wb;
  const ap = prog(T, IP - 0.6, IP, MOTION.draw);
  const rx = T < IP ? lerp(1300, CX, ap) : CX, ry = T < IP ? lerp(520, cy, ap) : cy;
  const rs = T < IP ? 1.3 : lerp(1.3, 0.62, prog(T, IP, IP + 0.5, MOTION.pop));
  const flash = T >= IP ? 1 - prog(T, IP, IP + 0.35) : 0;
  return <React.Fragment>
    <div style={{ position: 'absolute', left: CX, top: cy, width: 0, height: 0, opacity: 1 - ex, transform: `scale(${sc * sx}, ${sc * sy})` }}>
      {[-1, 1].map((d) => <div key={d} style={{ position: 'absolute', left: d > 0 ? 90 : -170, top: -4, width: 80, height: 8, borderRadius: 4, background: TEALD, transform: `rotate(${d * 14 + Math.sin(T * 8) * 12}deg)`, transformOrigin: d > 0 ? '0 50%' : '100% 50%' }} />)}
      <div style={{ position: 'absolute', left: -110, top: -46, width: 220, height: 92, borderRadius: 50, background: `radial-gradient(circle at 35% 30%, #e6fff5, ${TEAL} 55%, ${TEALD})`, boxShadow: 'inset 0 -10px 18px rgba(0,0,0,.25)' }}>
        <div style={{ position: 'absolute', left: 40, top: 40, width: 120, height: 10, borderRadius: 6, background: 'rgba(14,15,18,.28)', transform: `rotate(${Math.sin(T * 3) * 8}deg)` }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: 50, background: '#fff', opacity: flash }} />
      </div>
    </div>
    {T >= IP - 0.6 && <div style={{ position: 'absolute', left: rx - 45, top: ry - 45, width: 90, height: 90, opacity: 1 - ex, transform: `scale(${rs * (T < IP ? 1 : sc / 2)}) rotate(${T * 140}deg)` }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `12px solid ${GOLD}`, boxSizing: 'border-box', boxShadow: `0 0 26px ${GOLD}` }} />
      <div style={{ position: 'absolute', inset: 22, borderRadius: '50%', border: `4px dashed ${GOLD2}`, boxSizing: 'border-box' }} />
    </div>}
    <Burst T={T} t0={IP} life={1.3} parts={sparks} x0={CX} y0={cy} color={`linear-gradient(135deg, ${GOLD2}, ${GOLD})`} />
    {Array.from({ length: 6 }, (_, i) => {
      const t0 = IP + 0.5 + i * 0.2, p = prog(T, t0, t0 + 0.7, MOTION.pop);
      if (p <= 0) return null;
      const a = -Math.PI * (0.12 + i * 0.152), d = lerp(40, 330, p);
      return <div key={i} style={{ position: 'absolute', left: CX + Math.cos(a) * d * 1.2 - 34, top: cy + Math.sin(a) * d * 0.8 + 200 - 34 + Math.sin(T * 2 + i) * 10, width: 68, height: 68, clipPath: HEX, background: `radial-gradient(circle at 40% 35%, #fff1c9, ${GOLD})`, opacity: 1 - ex, transform: `scale(${p}) rotate(${T * 20 + i * 30}deg)` }} />;
    })}
  </React.Fragment>;
}

/* ---------- avatars: reaction only, pop/peek with squash & stretch ---------- */
function Avatar({ T, src, at, until, left, width, top }) {
  if (T < at || T > until + 0.4) return null;
  const inP = prog(T, at, at + 0.55, MOTION.pop), outP = prog(T, until - 0.1, until + 0.35, MOTION.draw);
  const w = wobble(T, at + 0.35, 6, 20) * 0.1;
  return <img src={src} alt="" style={{ position: 'absolute', left, top: lerp(1960, top, inP) + outP * 700, width, height: 'auto', transformOrigin: '50% 100%', transform: `scale(${1 - w}, ${1 + w})`, filter: 'drop-shadow(0 26px 40px rgba(0,0,0,.55))' }} />;
}

/* ---------- kinetic subtitles ---------- */
function Headline({ T, at, until, y, lines, acc, hi, tilt = 0, marker = true }) {
  if (T < at || T > until) return null;
  const out = prog(T, until - 0.25, until, MOTION.draw);
  const c = hi || acc;
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: y, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center', opacity: 1 - out, transform: `translateY(calc(-50% - ${out * 40}px)) rotate(${tilt}deg)` }}>
      {lines.map((ln, li) => {
        let on = false;
        return (
          <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: ln.mono ? '0.45em' : '0.24em',
            font: ln.mono ? `800 ${ln.size}px ${FONT}` : `900 ${ln.size}px/1 ${FONT}`, fontVariationSettings: ln.mono ? "'wdth' 110" : "'wdth' 96", letterSpacing: ln.mono ? '0.12em' : '-0.02em',
            textTransform: ln.mono ? 'uppercase' : 'none', color: INK, textShadow: ln.mono ? SHADOW : `0 6px 0 rgba(0,0,0,.9), 0 0 34px rgba(0,0,0,.95)` }}>
            {ln.t.split(' ').map((w, wi) => {
              let word = w;
              if (word.startsWith('*')) { on = true; word = word.slice(1); }
              const isAcc = on;
              if (word.includes('*')) { word = word.replace('*', ''); on = false; }
              const t0 = at + (ln.d || 0) + wi * 0.06;
              const p = prog(T, t0, t0 + 0.45, MOTION.enter), s = prog(T, t0, t0 + 0.4, MOTION.pop);
              if (isAcc && marker && !ln.mono) {
                const wipe = prog(T, t0 + 0.05, t0 + 0.35, MOTION.enter);
                const pulse = 1 + 0.08 * Math.max(0, wobble(T, t0 + 0.5, 5, 14));
                const clip = `inset(0 ${(1 - wipe) * 100}% 0 0)`;
                return <span key={wi} style={{ display: 'inline-block', position: 'relative', opacity: p, color: DARK, textShadow: 'none', padding: '0.04em 0.16em 0.08em', margin: '0 0.02em', transform: `translateY(${(1 - p) * 50}px) scale(${lerp(1.5, 1, s) * pulse}) rotate(${wi % 2 ? 2 : -2}deg)` }}>
                  <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.85)', transform: 'translate(8px,8px) skewX(-8deg)', clipPath: clip }} />
                  <span style={{ position: 'absolute', inset: 0, background: c, transform: 'skewX(-8deg)', clipPath: clip }} />
                  <span style={{ position: 'relative' }}>{word}</span>
                </span>;
              }
              return <span key={wi} style={{ display: 'inline-block', opacity: ln.mono ? p * 0.95 : p, transform: `translateY(${(1 - p) * 50}px) scale(${lerp(1.35, 1, s)})`, color: isAcc || ln.mono ? c : undefined }}>{word}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function Chapter({ T, K, acc }) {
  const ch = [[K.M1, '1', 'Congelación'], [K.M2, '2', 'Nitrógeno líquido'], [K.M3, '3', 'Liofilización']];
  const vis = prog(T, K.M1, K.M1 + 0.4) * (1 - prog(T, K.D - 0.2, K.D + 0.2));
  if (vis <= 0) return null;
  let cur = ch[0];
  for (const c of ch) if (T >= c[0]) cur = c;
  const p = prog(T, cur[0], cur[0] + 0.5, MOTION.pop);
  return (
    <div style={{ position: 'absolute', right: 60, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, opacity: vis }}>
      <div style={{ font: `900 30px ${FONT}`, color: DARK, background: acc, padding: '8px 16px', letterSpacing: '0.1em', transform: `scale(${p})`, transformOrigin: '100% 50%' }}>MÉTODO {cur[1]}/3</div>
      <div style={{ font: `900 40px ${FONT}`, color: INK, letterSpacing: '-0.02em', opacity: clamp(p, 0, 1), textShadow: SHADOW }}>{cur[2]}</div>
    </div>
  );
}

function Backdrop({ T, bg }) {
  const hx = [[70, 250, 120, 0], [930, 520, 80, 1.3], [150, 1560, 150, 2.1], [900, 1400, 96, 3.2]];
  return <React.Fragment>
    <div style={{ position: 'absolute', inset: 0, background: bg }} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 58% at 50% 42%, rgba(232,166,42,.16) 0%, rgba(232,166,42,0) 60%)' }} />
    {hx.map(([x, y, s, ph], i) => <div key={i} style={{ position: 'absolute', left: x, top: y, width: s, height: s * 1.1, clipPath: 'polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)', background: 'rgba(232,166,42,.07)', transform: `translateY(${Math.sin(T * 0.7 + ph) * 26}px) rotate(${Math.sin(T * 0.5 + ph) * 10}deg)` }} />)}
  </React.Fragment>;
}

function Watermark({ T, K }) {
  if (T >= K.V) return null;
  return <div style={{ position: 'absolute', left: 38, top: 180, zIndex: 50 }}>
    <div style={{ background: '#fff', borderRadius: 20, padding: 8, boxShadow: '0 12px 30px rgba(0,0,0,.45)' }}>
      <img src="assets/logo_iso_dna_gold.svg" alt="La Creación del Robert" style={{ width: 92, height: 92, display: 'block' }} />
    </div>
    <div style={{ position: 'absolute', top: -14, right: -20, font: `900 26px ${FONT}`, color: DARK, background: GOLD, padding: '3px 12px', borderRadius: 11, boxShadow: '0 6px 16px rgba(0,0,0,.4)' }}>#23</div>
  </div>;
}

function AudioTrack({ src, T, playing, vol }) {
  const on = vol > 0;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    a.muted = !on; a.volume = clamp(vol, 0, 1);
    if (playing && on) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => { window.dispatchEvent(new Event('sfx-blocked')); }); } if (Math.abs(a.currentTime - T) > 0.25) a.currentTime = T; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - T) > 0.05) a.currentTime = T; }
  });
  return <audio ref={ref} src={src} preload="auto" style={{ display: 'none' }} />;
}

function OutroVideo({ T, K, playing }) {
  const ref = React.useRef(null);
  const DUR = 2.81, local = clamp(T - K.V, 0, DUR - 0.02);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (T >= K.V && playing) { if (v.paused) { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(v.currentTime - local) > 0.3) v.currentTime = local; }
    else { if (!v.paused) v.pause(); if (Math.abs(v.currentTime - local) > 0.03) v.currentTime = local; }
  });
  return <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: T >= K.V ? 1 : 0, zIndex: 60 }}>
    <video ref={ref} src="assets/cierre.mp4" muted playsInline preload="auto" data-om-exportable-video-play-start="0" data-om-exportable-video-play-end={String(DUR)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>;
}

/* ---------- PIECE ---------- */
function Piece({ flashHook = true, shake = 1, marker = true, sfx = true, rhythm = 1, musicVol = 0.35, voiceVol = 1 }) {
  const { T, CUES, time, playing } = useComposition();
  const K = { H: CUES.Hook, S: CUES.Cepa, C: CUES.Cepario, R: CUES.Reservorio, M1: CUES.Congelar, M2: CUES.Nitrogeno, M3: CUES.Liofilizar, D: CUES.Ficha, I: CUES.Insulina, E: CUES.Cierre, V: CUES.Outro };
  let acc = GOLD2;
  const flashes = [[K.H + 0.62, '#2b0d63'], [K.M2 + 2.87, '#2438ff'], [K.I + 4.64, '#ff2d7a']];
  let Tv = T, bg = BG, punch = 1;
  if (T < K.H) {
    if (flashHook) {
      const i = Math.min(2, Math.floor((T / K.H) * 3)), lt = T - (i * K.H) / 3;
      Tv = flashes[i][0] + lt * 0.6; bg = flashes[i][1]; acc = '#ffe14a';
      punch = 1.14 - 0.1 * prog(lt, 0, K.H / 3, MOTION.enter);
    } else Tv = K.H;
  }
  let sh = 0;
  [[K.H + 0.55, 30], [K.M1 + 0.5, 8], [K.M1 + 2.85, 14], [K.M2 + 2.82, 18], [K.I + 4.6, 26]].forEach(([h, a]) => { if (Tv >= h && Tv < h + 0.5) sh += a * (1 - prog(Tv, h, h + 0.5)); });
  sh *= shake;
  const sx = Math.sin(Tv * 97) * sh, sy = Math.cos(Tv * 83) * sh;
  const BEAT2 = 1.2, bi = Math.floor(T / BEAT2), bt = T - bi * BEAT2;
  let lc = -9; [K.S, K.C, K.R, K.M1, K.M2, K.M3, K.D, K.I, K.E].forEach((c) => { if (T >= c) lc = c; });
  const live = T >= K.H && T < K.V ? 1 : 0;
  const bp = rhythm * live * Math.exp(-bt * 9), ck = rhythm * live * Math.exp(-(T - lc) * 10);
  const zoom = 1 + 0.045 * bp + 0.12 * ck, rz = (bi % 2 ? 1 : -1) * 0.7 * bp;
  const ox = ((bi % 3) - 1) * 16 * bp, oy = (((bi + 1) % 3) - 1) * 12 * bp;
  const cutFlash = live * Math.max(0, 1 - (T - lc) / 0.09) * Math.min(1, rhythm);
  const hv = heroVial(Tv, K);
  const P = { T: Tv, K, acc };
  const FL = T < K.H && flashHook;
  const hc = (c) => (FL ? acc : c);
  const HP = { T: Tv, acc, marker };
  const ICEB = '#8fd8ff', ELEC = '#4fc3ff', CORAL = '#ff6b5a';
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, overflow: 'hidden', background: BG }}>
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${sx + ox}px,${sy + oy}px) scale(${punch * zoom}) rotate(${rz}deg)` }}>
        <Backdrop T={Tv} bg={bg} />
        <BigTemp {...P} />
        <Freezer {...P} front={false} />
        <Tank {...P} front={false} />
        <Cepa {...P} />
        <Rack {...P} />
        <Vial {...hv} />
        <Freezer {...P} front />
        <Tank {...P} front />
        <Hook {...P} />
        <Drops {...P} />
        <Stamps {...P} />
        <Ficha {...P} />
        <Insulina {...P} />
        <Avatar T={Tv} src={AV('avatar_13_senalando_arriba')} at={K.H + 0.8} until={K.S - 0.15} left={500} width={600} top={1360} />
        <Avatar T={Tv} src={AV('avatar_04_bajando_lentes')} at={K.D + 2.4} until={K.I - 0.1} left={-40} width={540} top={1440} />
        <Avatar T={Tv} src={AV('avatar_06_pensativo_menton')} at={K.R + 0.2} until={K.R + 4.8} left={500} width={620} top={1330} />
        <Avatar T={Tv} src={AV('avatar_11_sorprendido')} at={K.M3 + 3.55} until={K.D - 0.1} left={-60} width={620} top={1330} />
        <Avatar T={Tv} src={AV('avatar_02_apuntando_camara')} at={K.E + 0.1} until={K.V + 0.2} left={20} width={1040} top={980} />
        <Chapter {...P} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={-2} at={K.H + 0.7} until={K.S - 0.05} y={470} lines={[{ t: 'Este frasco guarda', size: 92 }, { t: '*vida en pausa.*', size: 128, d: 0.2 }]} />
        <Headline {...HP} hi={hc(TEAL)} tilt={1.5} at={K.S + 0.3} until={K.C - 0.05} y={450} lines={[{ t: 'Una *cepa* es un solo tipo de organismo, aislado.', size: 84 }, { t: 'bacterias · levaduras · mohos · algas', size: 28, d: 0.9, mono: true }]} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={-1.5} at={K.C + 0.3} until={K.R - 0.05} y={450} lines={[{ t: 'Un *cepario* es la colección viva de esas cepas.', size: 84 }, { t: 'una biblioteca de organismos', size: 28, d: 0.9, mono: true }]} />
        <Headline {...HP} hi={hc(CORAL)} tilt={2} at={K.R + 0.1} until={K.R + 1.6} y={460} lines={[{ t: '¿Para qué *guardarlas?*', size: 104 }]} />
        <Headline {...HP} hi={hc(TEAL)} tilt={-1.5} at={K.R + 1.65} until={K.M1 - 0.05} y={460} lines={[{ t: 'Son un *reservorio* para investigar y producir.', size: 84 }]} />
        <Headline {...HP} hi={hc(ICEB)} tilt={1.5} at={K.M1 + 0.3} until={K.M2 - 0.05} y={1560} lines={[{ t: 'Muchas se guardan en *ultracongeladores.*', size: 76 }]} />
        <Headline {...HP} hi={hc(ELEC)} tilt={-2} at={K.M2 + 0.3} until={K.M3 - 0.05} y={1560} lines={[{ t: 'Otras duermen en *nitrógeno líquido.*', size: 78 }]} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={1.5} at={K.M3 + 0.2} until={K.M3 + 3.5} y={470} lines={[{ t: 'O se *liofilizan:* se les quita el agua.', size: 84 }]} />
        <Headline {...HP} hi={hc(CORAL)} tilt={-2} at={K.M3 + 3.55} until={K.D - 0.05} y={470} lines={[{ t: 'Así esperan *décadas* sin cambiar.', size: 88 }]} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={1.5} at={K.D + 0.2} until={K.I - 0.05} y={470} lines={[{ t: 'Cada cepa lleva un *código* y una ficha.', size: 84 }]} />
        <Headline {...HP} hi={hc(TEAL)} tilt={-1.5} at={K.I + 0.2} until={K.I + 2.85} y={450} lines={[{ t: 'De ahí sale la *E. coli K-12.*', size: 92 }]} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={1.5} at={K.I + 2.9} until={K.E - 0.05} y={450} lines={[{ t: 'En *1978* le insertaron el gen de la insulina humana.', size: 80 }, { t: 'dentro de un plásmido', size: 28, d: 1.0, mono: true }]} />
        <Headline {...HP} hi={hc(TEAL)} tilt={1.5} at={K.E + 0.2} until={K.E + 4.55} y={480} lines={[{ t: 'Tu yogur, tu pan, tus medicinas…', size: 80 }, { t: 'empezaron en un *cepario.*', size: 104, d: 0.5 }]} />
        <Headline {...HP} hi={hc(GOLD2)} tilt={-2} at={K.E + 4.6} until={K.V - 0.05} y={480} lines={[{ t: 'Esto fue un Shot Biotecnológico.', size: 76 }, { t: '*Sígueme.*', size: 150, d: 0.5 }]} />
        <Watermark T={Tv} K={K} />
      </div>
      {cutFlash > 0 && <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: cutFlash * 0.55, pointerEvents: 'none' }} />}
      <OutroVideo T={T} K={K} playing={playing} />
      <AudioTrack src="assets/voz_shot23_editada.wav" T={time} playing={playing} vol={voiceVol} />
      <AudioTrack src="assets/sfx_shot23.wav" T={time} playing={playing} vol={sfx ? 1 : 0} />
      <AudioTrack src="assets/music_shot23.wav" T={time} playing={playing} vol={musicVol} />
    </div>
  );
}

function AudioUnlock() {
  const [blocked, setBlocked] = React.useState(false);
  React.useEffect(() => {
    const on = () => setBlocked(true);
    const unlock = () => { document.querySelectorAll('audio').forEach((a) => { const p = a.play(); if (p && p.then) p.then(() => a.pause()).catch(() => {}); }); setBlocked(false); };
    window.addEventListener('sfx-blocked', on);
    window.addEventListener('pointerdown', unlock, { once: false });
    return () => { window.removeEventListener('sfx-blocked', on); window.removeEventListener('pointerdown', unlock); };
  }, []);
  if (!blocked) return null;
  return <div style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: GOLD, color: DARK, font: `900 15px ${FONT}`, padding: '10px 18px', borderRadius: 999, boxShadow: '0 8px 24px rgba(0,0,0,.5)', cursor: 'pointer' }}>Toca aquí para activar el sonido</div>;
}

function CeparioAppV2() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <CompositionStage width={W} height={H} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={BG}>
        <Piece flashHook={t.flashHook} shake={t.shake} marker={t.subStyle !== 'Clásico'} sfx={t.sfx !== false} rhythm={t.rhythm ?? 1} musicVol={t.musicVol ?? 0.35} voiceVol={t.voiceVol ?? 1} />
      </CompositionStage>
      <AudioUnlock />
      <TweaksPanel>
        <TweakSection label="Vídeo" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Flash-forward al inicio" value={t.flashHook} onChange={(v) => setTweak('flashHook', v)} />
        <TweakRadio label="Subtítulos" value={t.subStyle || 'Marcador'} options={['Marcador', 'Clásico']} onChange={(v) => setTweak('subStyle', v)} />
        <TweakToggle label="Efectos de sonido" value={t.sfx !== false} onChange={(v) => setTweak('sfx', v)} />
        <TweakSlider label="Volumen voz" value={t.voiceVol ?? 1} min={0} max={1} step={0.05} onChange={(v) => setTweak('voiceVol', v)} />
        <TweakSlider label="Volumen música" value={t.musicVol ?? 0.35} min={0} max={1} step={0.05} onChange={(v) => setTweak('musicVol', v)} />
        <TweakSlider label="Ritmo (zooms y cortes)" value={t.rhythm ?? 1} min={0} max={1.6} step={0.1} onChange={(v) => setTweak('rhythm', v)} />
        <TweakSlider label="Intensidad de sacudida" value={t.shake} min={0} max={1.6} step={0.1} onChange={(v) => setTweak('shake', v)} />
      </TweaksPanel>
    </div>
  );
}
window.CeparioAppV2 = CeparioAppV2;
