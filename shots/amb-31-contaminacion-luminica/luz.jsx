// Shot Ambiental #31 · La Vía Láctea que tus ojos nunca van a ver desde tu casa (contaminación lumínica) — NARRADO (N4 al revés: las estrellas se apagan).
// Datos: Falchi et al. 2016 (Science Advances), Kyba et al. 2023 (Science), FWC Florida, Van Doren et al. 2017 (PNAS). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (cielo, Vía Láctea, globo, playa, columnas de luz).

const LZ_AMBAR = '#ffb347', LZ_FRIA = '#e6f4ff', LZ_NARANJA = '#ff9a3c';

// Estrellas fijas (misma semilla siempre): las más débiles se apagan primero.
const LZ_EST = (() => { const r = krng(31); const a = Array.from({ length: 230 }, () => ({ x: r() * KW, y: r() * 1500, b: Math.pow(r(), 2.2), f: 0.6 + r() * 2.2, p: r() * 6 }));
  a.sort((p, q) => q.b - p.b); return a; })();
// Puntitos de la Vía Láctea (dentro de una franja diagonal).
const LZ_VIA = (() => { const r = krng(77); return Array.from({ length: 420 }, () => { const u = r(), v = (r() + r() + r() - 1.5) / 1.5; return { u, v, s: 0.8 + r() * 2 }; }); })();

// (div) Cielo de noche. via 0..1 = Vía Láctea visible · estrellas 0..1 = fracción de estrellas visibles · domo 0..1 = resplandor naranja de la ciudad.
function CieloNoche({ T, via = 1, estrellas = 1, domo = 0, children }) {
  const n = Math.round(LZ_EST.length * kclamp(estrellas, 0, 1));
  // franja: de (−100, 1150) a (1180, 150)
  const ax = -100, ay = 1150, bx = 1180, by = 150, L = Math.hypot(bx - ax, by - ay), ang = Math.atan2(by - ay, bx - ax) * 180 / Math.PI;
  return <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, #050816 0%, #0b1433 55%, ${mixHex('#1a2350', '#7a4a2a', domo * 0.8)} 100%)` }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <defs>
        <filter id="lzBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="28" /></filter>
        <radialGradient id="lzDomo" cx="50%" cy="100%" r="75%"><stop offset="0%" stopColor={LZ_NARANJA} stopOpacity="0.95" /><stop offset="55%" stopColor="#d9783a" stopOpacity="0.45" /><stop offset="100%" stopColor="#d9783a" stopOpacity="0" /></radialGradient>
      </defs>
      {via > 0.01 && <g opacity={via} transform={`translate(${ax} ${ay}) rotate(${ang})`}>
        <ellipse cx={L / 2} cy={0} rx={L / 2} ry={130} fill="#c9d6ff" opacity={0.45} filter="url(#lzBlur)" />
        <ellipse cx={L * 0.45} cy={10} rx={L * 0.35} ry={70} fill="#fff4e0" opacity={0.6} filter="url(#lzBlur)" />
        <ellipse cx={L * 0.55} cy={6} rx={L * 0.3} ry={18} fill="#1b1430" opacity={0.55} filter="url(#lzBlur)" />
        {LZ_VIA.map((d, i) => <circle key={i} cx={d.u * L} cy={d.v * 110} r={d.s} fill="#fff" opacity={0.5 + 0.4 * Math.abs(Math.sin(T * 1.3 + i))} />)}
      </g>}
      {LZ_EST.slice(0, n).map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={1.4 + e.b * 4.2} fill="#fff" opacity={0.45 + 0.5 * Math.abs(Math.sin(T * e.f + e.p))} />)}
      {domo > 0.01 && <rect x={-200} y={500} width={KW + 400} height={KH - 500} fill="url(#lzDomo)" opacity={domo} />}
    </svg>
    {children}
  </div>;
}
// Casa (base al centro en x, y). luz = ventanas prendidas.
function Casa({ x, y, s = 1, luz = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-180} width={260} height={180} fill="#e7d3b0" stroke={KC.ink} strokeWidth={8} />
    <path d="M -160 -175 L 0 -300 L 160 -175 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={70} y={-290} width={40} height={70} fill="#a35a3a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-35} y={-110} width={70} height={110} rx={6} fill="#7a4a2a" stroke={KC.ink} strokeWidth={6} />
    {[-90, 90].map((wx) => <g key={wx}><rect x={wx - 32} y={-150} width={64} height={60} fill={mixHex('#2a3550', '#ffd36b', luz)} stroke={KC.ink} strokeWidth={6} />
      <line x1={wx} y1={-150} x2={wx} y2={-90} stroke={KC.ink} strokeWidth={4} /><line x1={wx - 32} y1={-120} x2={wx + 32} y2={-120} stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}
// Farol de calle. tipo 'malo' = globo que tira luz para todos lados (también hacia arriba) · 'bueno' = con tapa, luz cálida solo hacia abajo.
function Farol({ x, y, h = 420, tipo = 'malo', on = 1, T = 0, id = 'f' }) {
  const top = y - h;
  if (tipo === 'bueno') return <g>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={LZ_AMBAR} stopOpacity={0.75 * on} /><stop offset="100%" stopColor={LZ_AMBAR} stopOpacity="0" /></linearGradient></defs>
    <polygon points={`${x + 60},${top + 30} ${x + 120},${top + 30} ${x + 260},${y} ${x - 80},${y}`} fill={`url(#${id})`} />
    <rect x={x - 8} y={top} width={16} height={h} fill="#3a3f48" stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${x} ${top + 8} Q ${x + 10} ${top - 20} ${x + 60} ${top - 10}`} stroke="#3a3f48" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={`M ${x + 30} ${top + 30} L ${x + 50} ${top - 18} L ${x + 130} ${top - 18} L ${x + 150} ${top + 30} Z`} fill="#3a3f48" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={x + 55} y={top + 26} width={70} height={10} rx={5} fill={mixHex('#555', LZ_AMBAR, on)} />
  </g>;
  return <g>
    <defs><radialGradient id={id}><stop offset="0%" stopColor={LZ_FRIA} stopOpacity={0.9 * on} /><stop offset="45%" stopColor="#bfe0ff" stopOpacity={0.35 * on} /><stop offset="100%" stopColor="#bfe0ff" stopOpacity="0" /></radialGradient></defs>
    <circle cx={x} cy={top - 30} r={230} fill={`url(#${id})`} />
    {on > 0.05 && Array.from({ length: 9 }, (_, i) => { const a = -Math.PI + (i / 8) * Math.PI; return <line key={i} x1={x + Math.cos(a) * 50} y1={top - 30 + Math.sin(a) * 50} x2={x + Math.cos(a) * (150 + 20 * Math.sin(T * 3 + i))} y2={top - 30 + Math.sin(a) * (150 + 20 * Math.sin(T * 3 + i))} stroke={LZ_FRIA} strokeWidth={6} strokeLinecap="round" opacity={0.7 * on} />; })}
    <rect x={x - 8} y={top} width={16} height={h} fill="#3a3f48" stroke={KC.ink} strokeWidth={4} />
    <circle cx={x} cy={top - 30} r={36} fill={mixHex('#9aa3ad', '#ffffff', on)} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Silueta de ciudad (base en y). luz 0..1 ventanas.
function Ciudad({ y = 1920, luz = 1, seed = 4, color = '#1c2233' }) {
  const r = krng(seed); const ed = []; let x = -20;
  while (x < KW + 20) { const w = 80 + r() * 90, h = 220 + r() * 380; ed.push({ x, w, h, v: Array.from({ length: 30 }, () => r()) }); x += w + 6; }
  return <g>{ed.map((e, i) => <g key={i}>
    <rect x={e.x} y={y - e.h} width={e.w} height={e.h} fill={color} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor((e.h - 40) / 46) * 2 }, (_, k) => { const col = k % 2, row = Math.floor(k / 2); const on = e.v[k % 30] < 0.75 * luz;
      return <rect key={k} x={e.x + 14 + col * (e.w / 2 - 4)} y={y - e.h + 24 + row * 46} width={e.w / 2 - 24} height={22} fill={on ? '#ffd36b' : '#2a3247'} />; })}
  </g>)}</g>;
}
// Persona (ícono). sinVia = tachita de "no ve la Vía Láctea".
function Persona({ x, y, s = 1, color = KC.white, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-62} r={18} fill={color} stroke={KC.ink} strokeWidth={4} />
    <path d="M -24 0 L -24 -26 Q -24 -42 0 -42 Q 24 -42 24 -26 L 24 0 Z" fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
// Satélite.
function Satelite({ x, y, s = 1, rot = -15 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-26} width={100} height={52} fill="#3b6fd8" stroke={KC.ink} strokeWidth={5} />
    <rect x={50} y={-26} width={100} height={52} fill="#3b6fd8" stroke={KC.ink} strokeWidth={5} />
    {[-125, -100, -75, 75, 100, 125].map((lx) => <line key={lx} x1={lx} y1={-26} x2={lx} y2={26} stroke={KC.ink} strokeWidth={3} />)}
    <line x1={-50} y1={0} x2={50} y2={0} stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-40} width={68} height={80} rx={10} fill="#d9dde3" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={52} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Globo terráqueo de noche con luces de ciudades (esquemático).
function GloboNoche({ T, x, y, r = 260, luces = 1 }) {
  const R = krng(5), pts = Array.from({ length: 70 }, () => { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * 0.88; return [Math.cos(a) * d * r, Math.sin(a) * d * r, R()]; });
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 18} fill="none" stroke="#7fe3ff" strokeOpacity=".35" strokeWidth={16} />
    <circle r={r} fill="#14306b" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-0.7 * r} ${-0.4 * r} q ${0.3 * r} ${-0.4 * r} ${0.7 * r} ${-0.2 * r} q ${0.2 * r} ${0.3 * r} ${-0.1 * r} ${0.6 * r} q ${-0.4 * r} ${0.2 * r} ${-0.6 * r} ${-0.4 * r} Z`} fill="#2d5a3a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.15 * r} ${0.15 * r} q ${0.4 * r} ${-0.1 * r} ${0.55 * r} ${0.25 * r} q ${-0.1 * r} ${0.4 * r} ${-0.45 * r} ${0.35 * r} q ${-0.2 * r} ${-0.3 * r} ${-0.1 * r} ${-0.6 * r} Z`} fill="#2d5a3a" stroke={KC.ink} strokeWidth={5} />
    {pts.map(([px, py, k], i) => <circle key={i} cx={px} cy={py} r={3 + k * 6} fill="#ffd36b" opacity={kclamp(luces * 1.4 - k * 0.6, 0, 1) * (0.7 + 0.3 * Math.sin(T * 3 + i))} />)}
  </g>;
}
// Cría de tortuga marina vista desde arriba (caparazón con escudos, aletas delanteras largas). ang en grados (0 = hacia arriba).
function Tortuga({ T, x, y, ang = 0, s = 1, seed = 0 }) {
  const al = Math.sin(T * 9 + seed) * 22;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M -18 -14 Q -60 -10 -70 20 Q -50 10 -22 4 Z" fill="#3b332c" stroke={KC.ink} strokeWidth={4} transform={`rotate(${al} -18 -8)`} />
    <path d="M 18 -14 Q 60 -10 70 20 Q 50 10 22 4 Z" fill="#3b332c" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-al} 18 -8)`} />
    <path d="M -14 22 L -30 38 L -10 32 Z" fill="#3b332c" stroke={KC.ink} strokeWidth={3} />
    <path d="M 14 22 L 30 38 L 10 32 Z" fill="#3b332c" stroke={KC.ink} strokeWidth={3} />
    <circle cx={0} cy={-38} r={11} fill="#4a4038" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={2} rx={24} ry={32} fill="#5a4e43" stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -26 L 0 28 M -12 -14 L 12 -14 M -14 2 L 14 2 M -12 16 L 12 16" stroke="#2a231d" strokeWidth={3} />
  </g>;
}
// Ave (silueta en V que aletea).
function Ave({ T, x, y, s = 1, seed = 0, o = 1 }) {
  const a = Math.sin(T * 12 + seed) * 10;
  return <path d={`M -18 ${-a} Q -8 ${-4 - a / 2} 0 4 Q 8 ${-4 - a / 2} 18 ${-a}`} transform={`translate(${x} ${y}) scale(${s})`} stroke={KC.ink} strokeWidth={4} fill="#f4efe4" opacity={o} strokeLinejoin="round" />;
}
// Foco: frio 1 = blanco-azul, 0 = cálido ámbar.
function Foco({ x, y, s = 1, frio = 1 }) {
  const c = mixHex(LZ_AMBAR, '#dff3ff', frio);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={110} fill={c} opacity={0.35} />
    <path d="M -50 10 Q -70 -40 -40 -75 Q 0 -110 40 -75 Q 70 -40 50 10 Q 30 30 26 50 L -26 50 Q -30 30 -50 10 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-28} y={50} width={56} height={44} rx={6} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <path d="M -28 64 L 28 64 M -28 80 L 28 80" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Apagador. on 0..1.
function Apagador({ x, y, s = 1, on = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-90} width={120} height={180} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={-24} y={-50} width={48} height={100} rx={10} fill="#d9dde3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-20} y={klerp(0, -46, on)} width={40} height={46} rx={8} fill={on > 0.5 ? KC.yellow : '#6b7280'} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Palomita.
function Palomita({ x, y, p = 1, s = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.5, 1, p)})`} opacity={p}>
    <circle r={38} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M -18 0 L -4 14 L 20 -14" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function LuzShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Resplandor, A: CUES.Atlas, M: CUES.Mexico, P: CUES.Pregunta, C: CUES.Conteo, N: CUES.Nino, Tt: CUES.Tortugas, Av: CUES.Aves, S: CUES.Solucion, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;

  // Gancho → Resplandor: la Vía Láctea se desvanece cuando se prende la ciudad.
  const prende = kprog(T, K.G + 3.0, K.G + 6.0, kEase.suave);
  const viaG = 1 - 0.9 * prende;
  const domoR = klerp(0.35, 1, kprog(T, K.R, K.R + 2.5, kEase.suave));
  const estR = klerp(0.75, 0.3, kprog(T, K.R + 0.5, K.R + 3.5, kEase.suave));
  // Nino: 250 → 100 estrellas
  const cuenta = klerp(250, 100, kprog(T, K.N + 1.0, K.N + 5.3, kEase.suave));
  const edad = klerp(0, 18, kprog(T, K.N + 1.0, K.N + 5.3, kEase.suave));
  // Cierre: vuelve la Vía Láctea
  const vuelve = kprog(T, K.Ci + 0.6, K.Ci + 3.2, kEase.suave);

  // fotones que rebotan en el aire (Resplandor)
  const fot = Array.from({ length: 16 }, (_, i) => { const R = krng(100 + i); const x0 = 120 + R() * 840, y0 = 1460, x1 = x0 + (R() - 0.5) * 300, y1 = 760 + R() * 380, x2 = x1 + (R() - 0.5) * 500, y2 = y1 + (R() - 0.3) * 300;
    const u = ((T - K.R) * 0.7 + i / 16) % 1; const q = u < 0.5 ? u * 2 : (u - 0.5) * 2;
    const px = u < 0.5 ? klerp(x0, x1, q) : klerp(x1, x2, q), py = u < 0.5 ? klerp(y0, y1, q) : klerp(y1, y2, q);
    return { px, py, x1, y1, o: Math.sin(Math.PI * u) }; });

  // aves alrededor de las columnas de luz
  const apaga = kprog(T, K.Av + 5.4, K.Av + 5.8);
  const aves = Array.from({ length: 46 }, (_, i) => { const R = krng(300 + i); const rx = 60 + R() * 300, ry = 30 + R() * 90, cy = 420 + R() * 760, w = (0.6 + R() * 0.9) * (R() < 0.5 ? 1 : -1), ph = R() * 6;
    const a = (T - K.Av) * w + ph; let x = 540 + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
    const sale = Math.max(0, T - (K.Av + 5.5)); const dx = Math.cos(ph) * 420 * sale, dy = -Math.abs(Math.sin(ph)) * 160 * sale;
    const llega = kprog(T, K.Av + R() * 2.2, K.Av + 0.6 + R() * 2.2);
    return { x: x + dx, y: y + dy, s: 0.8 + R() * 0.8, seed: i * 1.7, o: llega }; });

  // tortugas: salen del nido hacia el mar (izquierda) y luego voltean a las luces (derecha)
  const tort = Array.from({ length: 9 }, (_, i) => { const R = krng(500 + i); const t0 = K.Tt + 0.4 + i * 0.18; const u = Math.max(0, T - t0);
    const gira = kprog(T, K.Tt + 2.0 + R() * 0.4, K.Tt + 2.8 + R() * 0.4, kEase.suave);
    const angMar = -90 + (i - 4) * 14, angLuz = 95 + (i - 4) * 8, ang = klerp(angMar, angLuz, gira);
    const ux = 560 + (i % 3 - 1) * 120, uy = 950 + (Math.floor(i / 3) - 1) * 110; const v = 150;
    const dMar = Math.min(u, 0.8 + R() * 0.2) * v, dLuz = Math.max(0, u - 2.0) * v * 1.2;
    const rad = (d) => d * Math.PI / 180;
    return { x: ux + Math.sin(rad(angMar)) * dMar + Math.sin(rad(angLuz)) * dLuz, y: uy - Math.cos(rad(angMar)) * dMar - Math.cos(rad(angLuz)) * dLuz, ang, o: kprog(T, t0, t0 + 0.3), seed: i }; });

  // barras de brillo del cielo 2011..2022 (esquema con el promedio mundial, 9.6 % al año)
  const barras = Array.from({ length: 12 }, (_, i) => ({ i, h: 160 * Math.pow(1.096, i), p: kprog(T, K.C + 1.4 + i * 0.32, K.C + 1.9 + i * 0.32, kEase.sale) }));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la Vía Láctea sobre tu casa */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.04}>
        <CieloNoche T={T} via={viaG} estrellas={klerp(1, 0.75, prende)} domo={0.35 * prende}>
          {svg(<><rect x={0} y={1560} width={KW} height={360} fill="#1f2a1c" />
            <Ciudad y={1600} luz={prende} seed={8} color="#202638" />
            <rect x={0} y={1590} width={KW} height={330} fill="#24321f" stroke={KC.ink} strokeWidth={6} />
            <Casa x={330} y={1640} s={0.95} luz={0.4 + 0.6 * kprog(T, 0.3, 0.6)} />
            <Farol x={780} y={1660} h={460} tipo="malo" on={kprog(T, 0.5, 0.7) * (0.6 + 0.4 * Math.abs(Math.sin(T * 25)) * (T < 1.0 ? 1 : 0) + (T >= 1.0 ? 0.4 : 0))} T={T} id="fg" /></>)}
        </CieloNoche>
      </Escena>
      {/* 2 · resplandor: la luz rebota en el aire */}
      <Escena T={T} a={K.R} b={K.A} zoom={0.06} origen="50% 80%">
        <CieloNoche T={T} via={0.1 * (1 - kprog(T, K.R, K.R + 2))} estrellas={estR} domo={domoR}>
          {svg(<><Ciudad y={1920} luz={1} seed={11} />
            {[220, 540, 860].map((fx, k) => <Farol key={fx} x={fx} y={1700} h={300} tipo="malo" on={1} T={T} id={'fr' + k} />)}
            {fot.map((f, i) => <g key={i}><circle cx={f.x1} cy={f.y1} r={5} fill="#ffcf9a" opacity={0.6} /><circle cx={f.px} cy={f.py} r={9} fill="#fff1c9" opacity={f.o} stroke={LZ_NARANJA} strokeWidth={3} /></g>)}</>)}
        </CieloNoche>
      </Escena>
      {/* 3 · atlas satelital: más de 1 de cada 3 personas */}
      <Escena T={T} a={K.A} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<><GloboNoche T={T} x={540} y={830} r={250} luces={kprog(T, K.A + 0.3, K.A + 1.8)} />
          <Satelite x={klerp(-200, 1280, kprog(T, K.A, K.A + 5.5))} y={500} s={0.9} />
          {[0, 1, 2].map((k) => { const sin = k === 0 ? kprog(T, K.A + 2.6, K.A + 3.2) : 0, cx = 270 + k * 270;
            return <g key={k} opacity={kprog(T, K.A + 1.8 + k * 0.2, K.A + 2.2 + k * 0.2)}>
              <rect x={cx - 100} y={1400} width={200} height={130} rx={18} fill={mixHex('#0b1433', '#7a6a5a', sin)} stroke={KC.ink} strokeWidth={6} />
              <path d={`M ${cx - 90} ${1505} Q ${cx} ${1440} ${cx + 90} ${1425}`} stroke="#e8eeff" strokeWidth={22} strokeLinecap="round" opacity={0.75 * (1 - sin)} fill="none" />
              {sin > 0 && <line x1={cx - 70} y1={1420} x2={cx + 70} y2={1510} stroke={KC.red} strokeWidth={12 * sin} strokeLinecap="round" />}
              <Persona x={cx} y={1700} s={1.6} color={k === 0 ? KC.yellow : KC.white} /></g>; })}</>)}
      </Escena>
      {/* 4 · México: 58 de cada 100 */}
      <Escena T={T} a={K.M} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{Array.from({ length: 100 }, (_, i) => { const col = i % 10, row = Math.floor(i / 10); const sin = i < Math.round(58 * kprog(T, K.M + 0.5, K.M + 2.2)) ;
            return <Persona key={i} x={135 + col * 90} y={710 + row * 50} s={0.5} color={sin ? '#5b6170' : KC.white} />; })}
          <MapaMexico x={300} y={1440} ancho={480} conCA={false} color={KC.paper} /></>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.C} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={290} y={1010} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>)}
      </Escena>
      {/* 6 · Globe at Night: el cielo se aclara 7–10 % al año */}
      <Escena T={T} a={K.C} b={K.N}>
        <FondoLunares color={KC.mint} />
        {svg(<><rect x={90} y={640} width={900} height={560} rx={30} fill="#0b1433" stroke={KC.ink} strokeWidth={8} />
          {barras.map((b) => { const bx = 130 + b.i * 72, bh = b.h * b.p; return <g key={b.i}>
            <rect x={bx} y={1160 - bh} width={52} height={bh} rx={8} fill={mixHex('#3a5bd8', LZ_NARANJA, b.i / 11)} stroke={KC.ink} strokeWidth={4} />
            {(b.i === 0 || b.i === 11) && <text x={bx + 26} y={1190} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff" opacity={b.p}>{2011 + b.i}</text>}</g>; })}
          <text x={130} y={690} style={{ font:`700 28px ${KF.mono}` }} fill="#fff">brillo del cielo (esquema)</text>
          <Persona x={160} y={1620} s={1.5} color={KC.white} />
          <g transform={`translate(250 1470) rotate(-12)`}><rect x={0} y={0} width={120} height={90} rx={8} fill="#0b1433" stroke={KC.ink} strokeWidth={5} />
            {[[20, 25], [45, 40], [70, 20], [95, 55], [55, 70]].map(([sx, sy], k) => <circle key={k} cx={sx} cy={sy} r={5} fill="#fff" />)}</g></>)}
      </Escena>
      {/* 7 · un niño: de 250 a 100 estrellas a los 18 */}
      <Escena T={T} a={K.N} b={K.Tt}>
        <CieloNoche T={T} via={0} estrellas={(cuenta / 250) * 0.9} domo={0.35 + 0.4 * kprog(T, K.N + 1, K.N + 5.3)}>
          {svg(<><rect x={0} y={1590} width={KW} height={330} fill="#24321f" stroke={KC.ink} strokeWidth={6} />
            <Casa x={760} y={1640} s={0.85} luz={1} />
            <Persona x={330} y={1640} s={klerp(0.9, 2.3, edad / 18)} color={KC.yellow} /></>)}
        </CieloNoche>
      </Escena>
      {/* 8 · tortugas recién nacidas que van hacia las luces */}
      <Escena T={T} a={K.Tt} b={K.Av}>
        <div style={{ position:'absolute', inset:0, background:'#c9b48a' }} />
        {svg(<><defs><radialGradient id="lzEdif" cx="100%" cy="50%" r="70%"><stop offset="0%" stopColor="#ffd36b" stopOpacity=".75" /><stop offset="100%" stopColor="#ffd36b" stopOpacity="0" /></radialGradient></defs>
          <path d={`M 0 0 L 300 0 Q ${330 + Math.sin(T * 2) * 14} 480 300 960 Q ${270 + Math.sin(T * 2 + 1) * 14} 1440 300 1920 L 0 1920 Z`} fill="#1f5f9a" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${240 + Math.sin(T * 2 + i) * 18} ${200 + i * 300} q 30 40 0 80`} stroke="#bfe7ff" strokeWidth={6} fill="none" />)}
          <rect x={540} y={0} width={540} height={KH} fill="url(#lzEdif)" />
          {[200, 520, 840, 1160, 1480].map((by, k) => <g key={k}><rect x={930} y={by} width={170} height={240} fill="#2a3247" stroke={KC.ink} strokeWidth={6} />
            {[0, 1, 2, 3].map((w) => <rect key={w} x={950 + (w % 2) * 70} y={by + 30 + Math.floor(w / 2) * 100} width={50} height={60} fill="#ffd36b" />)}</g>)}
          <ellipse cx={540} cy={950} rx={90} ry={60} fill="#a8905f" stroke={KC.ink} strokeWidth={5} />
          <g opacity={kprog(T, K.Tt + 0.8, K.Tt + 1.2) * (1 - kprog(T, K.Tt + 2.2, K.Tt + 2.6))}>
            <path d="M 400 850 L 330 850" stroke={KC.leaf} strokeWidth={12} strokeDasharray="22 14" strokeLinecap="round" /><path d="M 345 825 L 315 850 L 345 875" stroke={KC.leaf} strokeWidth={12} fill="none" strokeLinecap="round" /></g>
          <g opacity={kprog(T, K.Tt + 2.4, K.Tt + 2.8)}>
            <path d="M 700 960 L 900 960" stroke={KC.red} strokeWidth={12} strokeDasharray="22 14" strokeLinecap="round" /></g>
          {tort.map((t, i) => <g key={i} opacity={t.o}><Tortuga T={T} x={t.x} y={t.y} ang={t.ang} s={1.15} seed={t.seed} /></g>)}</>)}
      </Escena>
      {/* 9 · aves migratorias en las columnas de luz de Nueva York */}
      <Escena T={T} a={K.Av} b={K.S}>
        <CieloNoche T={T} via={0} estrellas={0.25} domo={0.7}>
          {svg(<><defs><linearGradient id="lzHaz" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#dff3ff" stopOpacity=".9" /><stop offset="100%" stopColor="#dff3ff" stopOpacity=".15" /></linearGradient></defs>
            <g opacity={1 - apaga}>{[470, 610].map((hx) => <polygon key={hx} points={`${hx - 26},1560 ${hx + 26},1560 ${hx + 40},0 ${hx - 40},0`} fill="url(#lzHaz)" />)}</g>
            {aves.map((a, i) => <Ave key={i} T={T} x={a.x} y={a.y} s={a.s} seed={a.seed} o={a.o} />)}
            <Ciudad y={1920} luz={1} seed={21} /></>)}
        </CieloNoche>
      </Escena>
      {/* 10 · lo que sirve: luz hacia abajo, cálida y apagada si nadie la usa */}
      <Escena T={T} a={K.S} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        {svg(<>{(() => { const p1 = kprog(T, K.S + 0.4, K.S + 1.2, kEase.sale), p2 = kprog(T, K.S + 1.9, K.S + 2.7, kEase.sale), p3 = kprog(T, K.S + 3.4, K.S + 4.0, kEase.sale);
            return <>
              <rect x={40} y={760} width={1000} height={420} rx={34} fill="#0b1433" stroke={KC.ink} strokeWidth={8} />
              <g opacity={kprog(T, K.S, K.S + 0.4)}>{p1 < 0.5 ? <Farol x={200} y={1150} h={300} tipo="malo" on={1} T={T} id="fs1" /> : <Farol x={150} y={1150} h={300} tipo="bueno" on={1} T={T} id="fs2" />}</g>
              <g opacity={kprog(T, K.S + 1.5, K.S + 1.9)}><Foco x={540} y={960} s={1} frio={1 - p2} /></g>
              <g opacity={kprog(T, K.S + 3.0, K.S + 3.4)}><Apagador x={870} y={970} s={1} on={1 - p3} /></g>
              {[["hacia abajo", 200, K.S + 1.2], ["cálida", 540, K.S + 2.7], ["apagada", 870, K.S + 4.0]].map(([tx, lx, ta]) => <text key={tx} x={lx} y={1450} textAnchor="middle" opacity={kprog(T, ta, ta + 0.3)} style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink}>{tx}</text>)}
              <Palomita x={200} y={820} p={kprog(T, K.S + 1.2, K.S + 1.5)} /><Palomita x={540} y={820} p={kprog(T, K.S + 2.7, K.S + 3.0)} /><Palomita x={870} y={820} p={kprog(T, K.S + 4.0, K.S + 4.3)} /></>; })()}</>)}
      </Escena>
      {/* 11 · cierre: la misma casa, ahora con luz bien puesta, y vuelve la Vía Láctea */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <CieloNoche T={T} via={0.1 + 0.9 * vuelve} estrellas={klerp(0.6, 1, vuelve)} domo={0.6 * (1 - vuelve)}>
          {svg(<><Ciudad y={1600} luz={1 - 0.6 * vuelve} seed={8} color="#202638" />
            <rect x={0} y={1590} width={KW} height={330} fill="#24321f" stroke={KC.ink} strokeWidth={6} />
            <Casa x={330} y={1640} s={0.95} luz={1} />
            <Farol x={700} y={1660} h={460} tipo="bueno" on={1} T={T} id="fc" /></>)}
        </CieloNoche>
      </Escena>

      {/* datos y etiquetas */}
      <Etq T={T} at={K.G + 0.5} until={K.G + 3.6} x={110} y={760} texto="Vía Láctea" tam={36} />
      <Chip T={T} at={K.G + 3.4} until={K.R - 0.2} texto="ciudad de noche" y={1490} x={540} tam={32} borde={LZ_NARANJA} />
      <Etq T={T} at={K.R + 0.8} until={K.A - 0.2} x={1000} y={760} lado="izq" texto="resplandor del cielo" tam={34} color="#ffe1b8" />
      <Chip T={T} at={K.A + 0.4} until={K.M - 0.2} texto="Falchi et al. 2016 · Science Advances" y={420} x={600} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.A + 2.8} until={K.M - 0.2} texto="más de 1 de cada 3 no la ve" y={1800} x={540} tam={36} borde={KC.red} />
      <NumeroGigante T={T} at={K.M + 0.3} until={K.P - 0.2} valor={58} dur={1.8} sufijo=" de 100" etiqueta="México:" x={360} y={540} tam={130} color={KC.white} />
      <Chip T={T} at={K.C + 0.4} until={K.N - 0.2} texto="Kyba et al. 2023 · Science" y={420} x={600} tam={28} borde={KC.ink} />
      {T < K.N + 0.2 && <Contador T={T} at={K.C + 0.3} desde={0} hasta={51351} dur={1.6} sufijo=" conteos" x={540} y={540} tam={64} color={KC.white} />}
      <Chip T={T} at={K.C + 4.0} until={K.N - 0.2} texto="+7 a 10 % al año" y={1480} x={640} tam={44} borde={LZ_NARANJA} />
      <NumeroGigante T={T} at={K.N + 0.3} until={K.Tt - 0.2} valor={Math.round(cuenta)} desde={Math.round(cuenta)} dur={0.01} etiqueta="estrellas visibles" x={360} y={560} tam={170} color={KC.white} />
      <Chip T={T} at={K.N + 0.6} until={K.Tt - 0.2} texto={`edad: ${Math.round(edad)} años`} y={1060} x={360} tam={38} borde={KC.yellow} />
      <Etq T={T} at={K.Tt + 1.0} until={K.Av - 0.2} x={900} y={560} lado="izq" texto="crías de tortuga marina" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Tt + 2.6} until={K.Av - 0.2} texto="Florida: miles de crías al año" y={1480} x={540} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Av + 0.6} until={K.S - 0.2} texto="≈ 1.1 millones de aves" y={430} x={360} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Av + 1.6} until={K.S - 0.2} texto="7 noches · 2008–2016" y={1450} x={540} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Av + 2.4} until={K.S - 0.2} texto="Van Doren et al. 2017 · PNAS" y={1550} x={540} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.2} until={K.Ci - 0.2} texto="lo que sí sirve" y={450} x={690} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou - 0.1} x={110} y={760} texto="Vía Láctea" tam={36} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="La Vía Láctea *sobre tu casa.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.A - 0.1} texto="La luz rebota y *tapa las estrellas.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.M - 0.1} texto="Más de *1 de cada 3* no la ve." />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.P - 0.1} texto="México: *58 de cada 100.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.C - 0.1} texto="¿Se ve *peor cada año?*" />
      <Subtitulo T={T} idx={5} at={K.C + 0.1} until={K.N - 0.1} texto="El cielo se aclara *7 a 10 % al año.*" />
      <Subtitulo T={T} idx={6} at={K.N + 0.1} until={K.Tt - 0.1} texto="250 estrellas → *100 a los 18.*" />
      <Subtitulo T={T} idx={7} at={K.Tt + 0.1} until={K.Av - 0.1} texto="Florida: *miles de tortugas* al año." />
      <Subtitulo T={T} idx={8} at={K.Av + 0.1} until={K.S - 0.1} texto="Nueva York: *cerca de 1 millón de aves.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.Ci - 0.1} texto="Hacia abajo, *cálida y apagada.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La Vía Láctea *puede volver.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Resplandor + 1.2, CUES.Atlas - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Mexico + 0.4, CUES.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Conteo + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Nino + 2.0, CUES.Tortugas - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Tortugas + 2.5, CUES.Aves - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Aves + 3.5, CUES.Solucion - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Solucion + 2.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="31" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LuzApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LuzShot /></CompositionStage></div>;
}
window.LuzApp = LuzApp;
