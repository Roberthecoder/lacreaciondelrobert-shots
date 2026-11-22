// Shot Ambiental #22 · Tu casa está hecha de arena: el sólido más extraído del mundo — NARRADO (N2 el número + N1 por dentro).
// Datos: PNUMA/UNEP 2019 y 2022 (comunicado del 26 abr 2022), Neumann y Curbach 2018, Hackney et al. 2020. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (granos, mapa, balanza y corte del río).

// ---------- piezas de este shot ----------
// Contorno de un grano: amp 0 = redondo y liso (pulido por el viento); amp ~0.35 = con aristas (roca triturada).
function granoPath(seed, r, amp, sx = 1, sy = 1) {
  const R = krng(seed), nv = 6 + Math.floor(R() * 3), off = R() * Math.PI * 2;
  const ang = Array.from({ length: nv }, (_, k) => off + ((k + 0.25 + R() * 0.5) / nv) * Math.PI * 2);
  const V = ang.map((a) => { const rr = r * (0.95 + R() * 0.3); return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  const w = kclamp(amp / 0.35, 0, 1), pts = [], M = 8;
  for (let k = 0; k < nv; k++) {
    const A = V[k], B = V[(k + 1) % nv];
    for (let j = 0; j < M; j++) {
      const f = j / M, px = klerp(A[0], B[0], f), py = klerp(A[1], B[1], f);
      const a = Math.atan2(py, px), cx = Math.cos(a) * r, cy = Math.sin(a) * r;
      pts.push(`${(klerp(cx, px, w) * sx).toFixed(1)},${(klerp(cy, py, w) * sy).toFixed(1)}`);
    }
  }
  return 'M ' + pts.join(' L ') + ' Z';
}
function Grano({ x, y, r = 30, seed = 1, amp = 0.35, color = '#e3c26a', rot = 0, brillo = 0, sx = 1, sy = 1, o = 1, trazo = 5 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d={granoPath(seed, r, amp, sx, sy)} fill={color} stroke={KC.ink} strokeWidth={trazo} strokeLinejoin="miter" />
    {brillo > 0 && <ellipse cx={-r * 0.32} cy={-r * 0.36} rx={r * 0.32} ry={r * 0.18} fill="#fff" opacity={0.55 * brillo} transform="rotate(-25)" />}
  </g>;
}
// Interior del concreto (para la Lupa): pasta de cemento gris con piedritas grandes (grava) y granos de arena.
function ConcretoPorDentro({ T, r }) {
  const R = krng(22), gr = Array.from({ length: 9 }, () => ({ x: R() * r * 2, y: R() * r * 2, s: 34 + R() * 26, c: ['#9aa0a6', '#7d838a', '#b3b0a8'][Math.floor(R() * 3)], rot: R() * 360 }));
  const ar = Array.from({ length: 46 }, () => ({ x: R() * r * 2, y: R() * r * 2, s: 8 + R() * 7, rot: R() * 360 }));
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#6f6c66" />
    {gr.map((g, i) => <Grano key={'g' + i} x={g.x} y={g.y} r={g.s} seed={100 + i} amp={0.3} color={g.c} rot={g.rot + Math.sin(T + i) * 2} trazo={4} />)}
    {ar.map((g, i) => <Grano key={'a' + i} x={g.x} y={g.y} r={g.s} seed={300 + i} amp={0.32} color="#e3c26a" rot={g.rot} trazo={2.5} />)}
  </svg>;
}
// Pared de una casa (gris, con textura de concreto y una ventanita).
function Pared({ x, y, w = 480, h = 720 }) {
  const R = krng(5), pts = Array.from({ length: 60 }, () => [R() * w, R() * h, 2 + R() * 4]);
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx={8} fill="#b9b6ae" stroke={KC.ink} strokeWidth={8} />
    {pts.map(([a, b, s], i) => <circle key={i} cx={a} cy={b} r={s} fill="#8f8b83" opacity=".7" />)}
    {[0.33, 0.66].map((q) => <line key={q} x1={0} y1={h * q} x2={w} y2={h * q} stroke="#9c988f" strokeWidth={4} />)}
    <rect x={-20} y={-36} width={w + 40} height={40} rx={6} fill="#8a857c" stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={h} width={w} height={26} fill="#6f6a62" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Barra de 10 partes de una mezcla típica (UK, en volumen): 2.5 arena + 4.5 grava + 1 cemento + 1.85 agua + 0.15 aire.
const MEZCLA = [[2.5, '#e3c26a', 'arena 25 %'], [4.5, '#9aa0a6', 'grava 45 %'], [1.0, '#55595f', 'cemento'], [1.85, '#4aa8e8', 'agua'], [0.15, '#ffffff', '']];
function BarraMezcla({ T, at, x = 90, y = 1060, w = 900, h = 80 }) {
  let acc = 0;
  const k = w / 10;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-6} y={-6} width={w + 12} height={h + 12} rx={16} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
    {MEZCLA.map(([v, c, t], i) => { const x0 = acc * k; acc += v; const p = kprog(T, at + i * 0.35, at + i * 0.35 + 0.5, kEase.sale);
      return <g key={i}><rect x={x0} y={0} width={v * k * p} height={h} fill={c} stroke={KC.ink} strokeWidth={p > 0 ? 3 : 0} />
        {t && p > 0.6 && <text x={x0 + (v * k) / 2} y={h + 46} textAnchor="middle" style={{ font:`700 ${i < 2 ? 32 : 24}px ${KF.mono}` }} fill={KC.ink}>{t}</text>}</g>; })}
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={(i + 1) * k} y1={-6} x2={(i + 1) * k} y2={10} stroke={KC.ink} strokeWidth={3} />)}
    {kprog(T, at + 2.0, at + 2.4) > 0 && <g opacity={kprog(T, at + 2.0, at + 2.4)}>
      <path d={`M 0 -24 L 0 -40 L ${7 * k} -40 L ${7 * k} -24`} fill="none" stroke={KC.ink} strokeWidth={6} />
      <text x={3.5 * k} y={-56} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>7 de 10</text></g>}
  </g>;
}
// Montón de arena.
function Monton({ x, y, w = 300, h = 120, color = '#e3c26a' }) {
  const R = krng(Math.round(w)), pts = Array.from({ length: Math.round(w / 8) }, () => [(R() - 0.5) * w * 0.8, -R() * h * 0.7]);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} 0 Q 0 ${-h * 2} ${w / 2} 0 Z`} fill={color} stroke={KC.ink} strokeWidth={6} />
    {pts.map(([a, b], i) => Math.abs(a) < w * 0.5 * (1 + b / h) && <circle key={i} cx={a} cy={b} r={3} fill="#b8963f" />)}
  </g>;
}
function Banqueta({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -130 60 L -60 -60 L 130 -60 L 150 60 Z" fill="#c9c5bc" stroke={KC.ink} strokeWidth={6} />
    {[-0.33, 0.33].map((q, i) => <line key={i} x1={q * 140 + 5} y1={60} x2={q * 95 + 35} y2={-60} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -130 60 L 150 60 L 150 84 L -130 84 Z" fill="#9a958b" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Ventana({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-95} y={-110} width={190} height={220} rx={10} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-78} y={-93} width={156} height={186} fill="#9fe3ff" stroke={KC.ink} strokeWidth={4} />
    <line x1={0} y1={-93} x2={0} y2={93} stroke={KC.ink} strokeWidth={6} /><line x1={-78} y1={0} x2={78} y2={0} stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 -70 L -30 -80 L -64 -30 Z" fill="#fff" opacity=".7" />
  </g>;
}
function ChipCel({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-120} width={140} height={240} rx={22} fill="#2a2d33" stroke={KC.ink} strokeWidth={7} />
    <rect x={-56} y={-100} width={112} height={190} rx={8} fill="#3a7bd5" />
    <g transform="translate(0 -5)">
      {Array.from({ length: 4 }, (_, i) => [<rect key={'a' + i} x={-48 + i * 26} y={-50} width={10} height={14} fill="#d9d2c0" />, <rect key={'b' + i} x={-48 + i * 26} y={36} width={10} height={14} fill="#d9d2c0" />])}
      <rect x={-50} y={-38} width={100} height={76} rx={8} fill="#1a1c20" stroke="#d9d2c0" strokeWidth={4} />
      <text y={10} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#d9d2c0">Si</text>
    </g>
  </g>;
}
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink }) {
  const x = klerp(x1, x2, p), y = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  if (p <= 0) return null;
  return <g><line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={7} strokeLinecap="round" strokeDasharray="16 12" />
    {p > 0.9 && <path d={`M ${x} ${y} l ${-Math.cos(a - 0.5) * 30} ${-Math.sin(a - 0.5) * 30} M ${x} ${y} l ${-Math.cos(a + 0.5) * 30} ${-Math.sin(a + 0.5) * 30}`} stroke={color} strokeWidth={7} strokeLinecap="round" />}</g>;
}
// La Tierra con un muro de arena alrededor del ecuador (p 0..1 = cuánto muro va).
function TierraMuro({ T, x, y, r = 250, p = 1 }) {
  const rx = r * 1.06, ry = r * 0.26, C = Math.PI * (rx + ry);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-rx} 0 A ${rx} ${ry} 0 0 1 ${rx} 0`} fill="none" stroke="#c9a24a" strokeWidth={30} strokeDasharray={`${C / 2 * kclamp(p * 2 - 1, 0, 1)} ${C}`} />
    <circle r={r} fill="#2f8fd8" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.6} ${-r * 0.5} q 60 -40 120 10 q 30 60 -20 110 q -60 20 -90 -40 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} transform={`translate(${Math.sin(T * 0.3) * 6} 0)`} />
    <path d={`M ${r * 0.15} ${-r * 0.2} q 80 -30 120 30 q 10 90 -60 120 q -50 -30 -60 -150 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`} fill="none" stroke={KC.ink} strokeWidth={40} strokeDasharray={`${C / 2 * kclamp(p * 2, 0, 1)} ${C}`} />
    <path d={`M ${-rx} 0 A ${rx} ${ry} 0 0 0 ${rx} 0`} fill="none" stroke="#e3c26a" strokeWidth={30} strokeDasharray={`${C / 2 * kclamp(p * 2, 0, 1)} ${C}`} />
  </g>;
}
// Corte del muro: 27 m × 27 m junto a una casa de 2 pisos (~6 m) para escala.
function CorteMuro({ x, y, lado = 300, o = 1 }) {
  const m = lado / 27;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={0} y={-lado} width={lado} height={lado} fill="#e3c26a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 37) % lado} cy={-((i * 53) % lado)} r={3} fill="#b8963f" />)}
    <g transform={`translate(${lado + 20} 0)`}><rect x={0} y={-6 * m} width={7 * m} height={6 * m} fill="#ff8a1f" stroke={KC.ink} strokeWidth={4} />
      <path d={`M -4 ${-6 * m} L ${3.5 * m} ${-8.5 * m} L ${7 * m + 4} ${-6 * m} Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>
    <line x1={-26} y1={-lado} x2={-26} y2={0} stroke={KC.ink} strokeWidth={5} />
    <text x={-38} y={-lado / 2 + 12} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>27 m</text>
    <line x1={0} y1={28} x2={lado} y2={28} stroke={KC.ink} strokeWidth={5} />
    <text x={lado / 2} y={72} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>27 m</text>
    <text x={lado + 20 + 3.5 * m} y={36} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>casa</text>
  </g>;
}
// Dunas del desierto.
function Dunas({ T }) {
  return <g>
    <path d={`M 0 980 Q 270 ${820 + Math.sin(T) * 4} 540 960 Q 800 1080 1080 900 L 1080 1920 L 0 1920 Z`} fill="#f2b04a" stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 1120 Q 360 1000 700 1120 Q 900 1190 1080 1100 L 1080 1920 L 0 1920 Z" fill="#e89a32" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.5 + i / 6) % 1); return <path key={i} d={`M ${-100 + u * 1300} ${700 + i * 40} q 60 -14 120 0`} stroke="#fff" strokeWidth={5} fill="none" opacity={0.6} />; })}
  </g>;
}
// Panel pequeño (río, costa, mar) para "Rios".
function PanelExtraccion({ T, x, y, tipo, o = 1 }) {
  const w = 300, h = 380;
  const agua = tipo === 'mar' ? '#1f6fc0' : '#2f8fd8';
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect width={w} height={h} rx={22} fill={tipo === 'costa' ? '#bfe9ff' : '#d8f1ff'} stroke={KC.ink} strokeWidth={7} />
    {tipo === 'rio' && <g><path d={`M 0 200 L ${w} 200 L ${w} ${h - 70} L 0 ${h - 70} Z`} fill={agua} />
      <path d={`M 0 ${h - 70} L ${w} ${h - 70} L ${w} ${h - 8} Q ${w / 2} ${h - 40} 0 ${h - 8} Z`} fill="#e3c26a" />
      <g transform={`translate(${150 + Math.sin(T * 1.5) * 10} 196)`}><rect x={-60} y={-30} width={120} height={30} fill="#ff8a1f" stroke={KC.ink} strokeWidth={5} /><rect x={-20} y={-60} width={40} height={30} fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
        <line x1={50} y1={-10} x2={70} y2={h - 270} stroke={KC.ink} strokeWidth={8} /></g></g>}
    {tipo === 'costa' && <g><path d={`M 0 230 Q ${w / 2} ${210 + Math.sin(T * 2) * 8} ${w} 230 L ${w} ${h - 8} L 0 ${h - 8} Z`} fill={agua} />
      <path d={`M 0 300 Q 150 230 ${w} 260 L ${w} ${h - 8} L 0 ${h - 8} Z`} fill="#e3c26a" stroke={KC.ink} strokeWidth={5} />
      <g transform="translate(110 260)"><rect x={-50} y={-40} width={100} height={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /><circle cx={-30} cy={4} r={14} fill={KC.ink} /><circle cx={30} cy={4} r={14} fill={KC.ink} />
        <path d={`M 50 -30 L 100 ${-80 + Math.sin(T * 3) * 10} L 120 -20`} stroke={KC.ink} strokeWidth={8} fill="none" /></g></g>}
    {tipo === 'mar' && <g><path d={`M 0 140 L ${w} 140 L ${w} ${h - 50} L 0 ${h - 50} Z`} fill={agua} />
      <path d={`M 0 ${h - 50} L ${w} ${h - 50} L ${w} ${h - 8} L 0 ${h - 8} Z`} fill="#c8a95c" />
      <g transform={`translate(${150 + Math.sin(T) * 8} 138)`}><path d="M -80 -30 L 80 -30 L 60 0 L -60 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><rect x={-20} y={-60} width={40} height={30} fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
        <line x1={-40} y1={0} x2={-50} y2={h - 190} stroke={KC.ink} strokeWidth={8} />
        {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.8 + i / 4) % 1); return <circle key={i} cx={-48 + u * 2} cy={h - 190 - u * (h - 190)} r={6} fill="#e3c26a" stroke={KC.ink} strokeWidth={2} />; })}</g></g>}
  </g>;
}
// Costal de arena.
function Costal({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M -26 0 Q -32 -40 -14 -52 L 14 -52 Q 32 -40 26 0 Z" fill="#d9b25a" stroke={KC.ink} strokeWidth={4} /><path d="M -14 -52 L 0 -60 L 14 -52" fill="none" stroke={KC.ink} strokeWidth={4} /></g>;
}
// Balanza: izquierda lo que entra (6), derecha lo que sale (50). incl 0..1 = cuánto se va de lado.
function Balanza({ T, x, y, entra = 6, sale = 50, incl = 1, at = 0 }) {
  const ang = 16 * incl, L = 330, a = (ang * Math.PI) / 180;
  const pl = [x - Math.cos(a) * L, y - Math.sin(a) * L], pr = [x + Math.cos(a) * L, y + Math.sin(a) * L];
  const plato = (cx, cy, n, cols, t0, lbl, sub) => <g transform={`translate(${cx} ${cy})`}>
    <line x1={-110} y1={140} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={110} y1={140} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
    <path d="M -140 140 L 140 140 Q 120 175 0 178 Q -120 175 -140 140 Z" fill="#c9c5bc" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => { const p = kprog(T, t0 + i * (n > 10 ? 0.04 : 0.2), t0 + i * (n > 10 ? 0.04 : 0.2) + 0.2); const c = i % cols, r = Math.floor(i / cols);
      return p > 0 && <Costal key={i} x={-112 + c * (224 / (cols - 1))} y={140 - r * 26} s={n > 10 ? 0.5 : 0.85} />; })}
    <text y={240} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>{lbl}</text>
    <text y={280} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
  return <g>
    <path d={`M ${x - 70} ${y + 380} L ${x + 70} ${y + 380} L ${x + 16} ${y} L ${x - 16} ${y} Z`} fill="#8a857c" stroke={KC.ink} strokeWidth={6} />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <circle cx={x} cy={y} r={16} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    {plato(pl[0], pl[1], entra, 6, at, '~6', 'entra (Mt/año)')}
    {plato(pr[0], pr[1], sale, 10, at + 1.6, '~50', 'sale (Mt/año)')}
  </g>;
}
// Corte de un río: bajada 0..1 = el fondo baja; derrumbe 0..1 = la orilla izquierda se cae (con su casa).
function CorteRio({ T, bajada = 0, derrumbe = 0 }) {
  const fondo = 1000 + 110 * bajada, d = derrumbe;
  return <g>
    <path d={`M 0 640 L 330 640 L 330 1150 L 0 1150 Z`} fill="#a9773f" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 750 700 L 1080 700 L 1080 1150 L 750 1150 Z`} fill="#a9773f" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 330 760 L 750 760 L 750 ${fondo} Q 540 ${fondo + 40} 330 ${fondo} Z`} fill="#2f8fd8" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 330 ${fondo} Q 540 ${fondo + 40} 750 ${fondo} L 750 1150 L 330 1150 Z`} fill="#e3c26a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M ${380 + i * 90 + Math.sin(T * 2 + i) * 8} ${800 + (i % 2) * 40} q 20 -8 40 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
    {/* trozo de orilla que se cae con la casa */}
    <g transform={`translate(${d * 120} ${d * 220}) rotate(${d * 28} 330 640)`}>
      <path d="M 200 640 L 330 640 L 330 900 L 250 860 Z" fill="#b8854a" stroke={KC.ink} strokeWidth={6} />
      <g transform="translate(215 640)"><rect x={0} y={-90} width={100} height={90} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} /><path d="M -10 -90 L 50 -140 L 110 -90 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><rect x={35} y={-50} width={30} height={50} fill="#8a5a2b" /></g>
    </g>
    {d > 0.05 && <path d="M 300 650 L 280 700 L 300 740 L 285 800" stroke={KC.ink} strokeWidth={5} fill="none" opacity={kclamp(1 - d * 2, 0, 1)} />}
    <g transform="translate(70 640)"><rect x={0} y={-80} width={90} height={80} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} /><path d="M -10 -80 L 45 -125 L 100 -80 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}
// Persona sencilla (caricatura).
function Persona({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-250} r={52} fill="#f2c39b" stroke={KC.ink} strokeWidth={6} /><circle cx={-16} cy={-256} r={6} fill={KC.ink} /><circle cx={16} cy={-256} r={6} fill={KC.ink} />
    <path d="M -16 -232 Q 0 -222 16 -232" stroke={KC.ink} strokeWidth={5} fill="none" />
    <path d="M -60 -190 Q 0 -210 60 -190 L 50 -60 L -50 -60 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <rect x={-46} y={-62} width={36} height={62} fill="#2346ff" stroke={KC.ink} strokeWidth={5} /><rect x={10} y={-62} width={36} height={62} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function ArenaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tu: CUES.Tu, N: CUES.Numero, Mu: CUES.Muro, P: CUES.Pregunta, D: CUES.Desierto, Ri: CUES.Rios, Me: CUES.Mekong, Or: CUES.Orillas, Ki: CUES.Kilos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // desierto: el grano se pule (amp 0.38 → 0) mientras rebota con el viento
  const pul = kprog(T, K.D + 0.2, K.D + 2.4, kEase.suave);
  const rebote = Math.abs(Math.sin((T - K.D) * 5)) * 40 * (1 - kprog(T, K.D + 2.4, K.D + 2.8));
  const resbala = kprog(T, K.D + 3.3, K.D + 4.6, kEase.suave);
  // kilos: la pila crece "día por día"
  const dias = Math.floor(kclamp((T - K.Ki - 0.6) / 0.6, 0, 7));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pared y su mezcla */}
      <Escena T={T} a={K.G} b={K.Tu}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Pared x={70} y={330} w={460} h={540} /><BarraMezcla T={T} at={K.G + 2.0} y={985} /></>)}
      </Escena>
      <Lupa T={T} at={K.G + 0.15} until={K.Tu - 0.2} x={300} y={555} r={170} fx={300} fy={640} tinte={KC.yellow} etiqueta="POR DENTRO · concreto"
        interior={(t, r) => <ConcretoPorDentro T={t} r={r} />} />
      {/* 2 · banqueta, ventana y chip salen de la arena */}
      <Escena T={T} a={K.Tu} b={K.N}>
        <FondoLunares color={KC.mint} />
        {svg(<><Monton x={540} y={1130} w={420} h={130} />
          {[[200, 760, 0], [540, 700, 1], [880, 800, 2]].map(([x, y, i]) => { const t0 = K.Tu + 0.3 + i * 0.9, p = kprog(T, t0, t0 + 0.5, kEase.sale);
            return <g key={i}><Flecha x1={540} y1={1010} x2={x} y2={y + 150} p={p} />
              <g transform={`translate(${x} ${y}) scale(${kprog(T, t0 + 0.3, t0 + 0.7, kEase.rebote)}) translate(${-x} ${-y})`}>{i === 0 ? <Banqueta x={x} y={y} /> : i === 1 ? <Ventana x={x} y={y} /> : <ChipCel x={x} y={y} />}</g></g>; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · 50 mil millones de toneladas al año: el sólido #1 */}
      <Escena T={T} a={K.N} b={K.Mu}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Monton x={540} y={1160} w={klerp(200, 900, kprog(T, K.N + 0.3, K.N + 3.5, kEase.sale))} h={klerp(60, 210, kprog(T, K.N + 0.3, K.N + 3.5, kEase.sale))} />
          <g transform={`translate(830 900) scale(${kprog(T, K.N + 4.0, K.N + 4.5, kEase.rebote)})`}><path d="M -40 -150 L 0 -60 L 40 -150" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <circle r={78} fill={KC.gold} stroke={KC.ink} strokeWidth={7} /><text y={30} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>1</text></g></>)}
      </Escena>
      {/* 4 · el muro alrededor de la Tierra */}
      <Escena T={T} a={K.Mu} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<><TierraMuro T={T} x={330} y={700} r={215} p={kprog(T, K.Mu + 0.2, K.Mu + 2.4, kEase.suave)} />
          <CorteMuro x={640} y={1150} lado={220} o={kprog(T, K.Mu + 2.6, K.Mu + 3.0)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · ¿y el desierto? */}
      <Escena T={T} a={K.P} b={K.D} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<><Dunas T={T} /><text x={270} y={900} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 740)`}>?</text></>)}
      </Escena>
      {/* 6 · al microscopio: grano del desierto (redondo y pulido) vs. grano de roca triturada (con aristas) */}
      <Escena T={T} a={K.D} b={K.Ri}>
        <FondoLunares color={KC.noche} punto="rgba(255,255,255,.05)" />
        {svg(<>
          {Array.from({ length: 5 }, (_, i) => { const u = ((T * 1.2 + i / 5) % 1); return <path key={i} d={`M ${-60 + u * 600} ${640 + i * 50} q 50 -12 100 0`} stroke="#9fe3ff" strokeWidth={5} fill="none" opacity={0.6 * (1 - kprog(T, K.D + 2.6, K.D + 3.0))} />; })}
          {resbala > 0 && <g opacity={kprog(T, K.D + 2.8, K.D + 3.2)}>
            <rect x={110} y={560} width={380} height={380} rx={30} fill="#6f6c66" stroke="#d9d2c0" strokeWidth={5} opacity=".85" />
            <rect x={590} y={560} width={380} height={380} rx={30} fill="#6f6c66" stroke="#d9d2c0" strokeWidth={5} opacity=".85" /></g>}
          <Grano x={300} y={750 - rebote + resbala * 130} r={140} seed={7} amp={0.38 * (1 - pul)} color="#f2c45c" rot={(T - K.D) * 40 * (1 - pul)} brillo={pul} sx={1.08} sy={0.95} trazo={7} />
          <Grano x={780} y={750} r={140} seed={11} amp={0.38} color="#c9c2b2" rot={8} trazo={7} />
          {resbala > 0.3 && <Flecha x1={480} y1={820} x2={480} y2={980} p={kprog(T, K.D + 3.6, K.D + 4.2)} color="#ff6b5a" />}
        </>)}
        <EscalaFija texto="0.1 mm · esquema" largo={100} y={1480} color={KC.texto} />
      </Escena>
      {/* 7 · ríos, costas y fondo del mar */}
      <Escena T={T} a={K.Ri} b={K.Me}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{['rio', 'costa', 'mar'].map((tp, i) => { const t0 = K.Ri + 0.2 + i * 0.7, s = kprog(T, t0, t0 + 0.45, kEase.rebote);
          return <g key={tp} transform={`translate(${190 + i * 350} 900) scale(${s}) translate(-150 -190)`}><PanelExtraccion T={T} x={0} y={0} tipo={tp} /></g>; })}</>)}
      </Escena>
      {/* 8 · el estudio del Mekong: entra ~6, sale ~50 */}
      <Escena T={T} a={K.Me} b={K.Or}>
        <FondoLunares color={KC.mint} />
        {svg(<><g transform="translate(70 330)"><rect width={360} height={300} rx={22} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
            <path d={`M 120 0 Q 160 60 130 110 Q 100 170 180 210 Q 250 240 230 300`} fill="none" stroke="#2f8fd8" strokeWidth={14} strokeLinecap="round" />
            <path d="M 200 250 L 300 300 L 160 300 Z" fill="#9fd8a0" stroke={KC.ink} strokeWidth={3} />
            <text x={20} y={140} style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>Camboya</text><text x={240} y={280} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>delta</text>
            <text x={180} y={40} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>río Mekong</text></g>
          <Balanza T={T} x={540} y={760} incl={kprog(T, K.Me + 3.2, K.Me + 4.6, kEase.suave)} at={K.Me + 1.4} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · el fondo baja y la orilla se derrumba */}
      <Escena T={T} a={K.Or} b={K.Ki}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<CorteRio T={T} bajada={kprog(T, K.Or + 0.2, K.Or + 1.6, kEase.suave)} derrumbe={kprog(T, K.Or + 1.9, K.Or + 2.9, kEase.suave)} />)}
        <EscalaFija texto="corte esquemático" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · 18 kg por persona al día */}
      <Escena T={T} a={K.Ki} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<><Persona x={690} y={1150} s={1.15} /><Monton x={920} y={1150} w={120 + dias * 22} h={40 + dias * 12} />
          <g transform="translate(920 880)"><rect x={-70} y={-70} width={140} height={110} rx={12} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} /><rect x={-70} y={-70} width={140} height={32} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <text y={26} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>día {dias + 1}</text></g></>)}
      </Escena>
      {/* 11 · cierre: la misma pared, ahora con el río que se queda sin arena */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Pared x={70} y={330} w={460} h={540} />
          <g transform="translate(600 820)"><rect width={420} height={300} rx={22} fill="#d8f1ff" stroke={KC.ink} strokeWidth={6} />
            <path d="M 0 120 L 420 120 L 420 230 L 0 230 Z" fill="#2f8fd8" />
            <path d={`M 0 230 L 420 230 L 420 ${300 - 60 * kprog(T, K.C + 0.5, K.C + 4, kEase.suave)} L 0 ${300 - 60 * kprog(T, K.C + 0.5, K.C + 4, kEase.suave)} Z`} fill="#e3c26a" stroke={KC.ink} strokeWidth={4} />
            <text x={210} y={60} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>río</text></g>
          <Flecha x1={600} y1={1000} x2={430} y2={900} p={kprog(T, K.C + 0.6, K.C + 1.4)} /></>)}
      </Escena>
      <Lupa T={T} at={K.C + 1.6} until={K.Ou - 0.1} x={300} y={600} r={170} fx={300} fy={640} tinte={KC.yellow} etiqueta="POR DENTRO"
        interior={(t, r) => <ConcretoPorDentro T={t} r={r} />} />

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 3.2} until={K.Tu - 0.2} texto="mezcla típica · en volumen" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Tu + 2.6} until={K.N - 0.2} texto="arena sílica → vidrio y chips" y={1440} x={540} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.N + 0.3} until={K.Mu - 0.2} valor={50} dur={1.4} etiqueta="arena y grava al año:" x={540} y={520} tam={300} color={KC.orange} />
      <Chip T={T} at={K.N + 1.0} until={K.Mu - 0.2} texto="mil millones de toneladas" y={760} x={540} tam={48} borde={KC.orange} />
      <Etq T={T} at={K.N + 4.3} until={K.Mu - 0.2} x={740} y={900} texto="el sólido más extraído" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.N + 0.6} until={K.Mu - 0.2} texto="ONU · 2022 · estimación" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Mu + 0.4} until={K.P - 0.2} texto="un muro alrededor de la Tierra" y={430} x={420} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.D + 0.6} until={K.Ri - 0.2} x={150} y={520} texto="desierto" lado="der" tam={34} />
      <Etq T={T} at={K.D + 0.9} until={K.Ri - 0.2} x={620} y={520} texto="roca triturada" lado="der" tam={34} />
      <Chip T={T} at={K.D + 2.4} until={K.Ri - 0.2} texto="redondo y pulido · con aristas" y={430} x={540} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.D + 3.6} until={K.Ri - 0.2} x={150} y={1090} texto="no se agarra" lado="der" tam={30} color="#ff6b5a" />
      <Etq T={T} at={K.D + 3.8} until={K.Ri - 0.2} x={640} y={1090} texto="se traba" lado="der" tam={30} color={KC.mint} />
      <Etq T={T} at={K.Ri + 0.5} until={K.Me - 0.2} x={60} y={680} texto="río" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ri + 1.2} until={K.Me - 0.2} x={400} y={680} texto="costa" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ri + 1.9} until={K.Me - 0.2} x={750} y={680} texto="mar" lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Me + 0.5} until={K.Or - 0.2} texto="Hackney et al. 2020 · Nature Sustainability" y={1440} x={540} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.Or + 0.8} until={K.Ki - 0.2} x={720} y={1105} texto="el fondo baja" lado="izq" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Or + 2.0} until={K.Ki - 0.2} x={330} y={580} texto="la orilla se cae" lado="der" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ki + 0.3} until={K.C - 0.2} valor={18} dur={1.2} sufijo=" kg" etiqueta="cada día:" x={760} y={470} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Ki + 0.6} until={K.C - 0.2} texto="promedio · cifra de la ONU" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="se usa más rápido de lo que se repone" y={1440} x={540} tam={30} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Tu - 0.1} texto="Esta pared es *arena y piedra.*" />
      <Subtitulo T={T} idx={1} at={K.Tu + 0.1} until={K.N - 0.1} texto="Banqueta, ventana, celular: *arena.*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.Mu - 0.1} texto="50 mil millones de toneladas *al año.*" />
      <Subtitulo T={T} idx={3} at={K.Mu + 0.1} until={K.P - 0.1} texto="Un muro de 27 m *alrededor de la Tierra.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.D - 0.1} texto="¿Y la del *desierto?*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.Ri - 0.1} texto="Redonda y lisa: *no se agarra.*" />
      <Subtitulo T={T} idx={6} at={K.Ri + 0.1} until={K.Me - 0.1} texto="Ríos, costas y *fondo del mar.*" />
      <Subtitulo T={T} idx={7} at={K.Me + 0.1} until={K.Or - 0.1} texto="Mekong: salen ~50, *entran ~6.*" />
      <Subtitulo T={T} idx={8} at={K.Or + 0.1} until={K.Ki - 0.1} texto="Las orillas *se derrumban.*" />
      <Subtitulo T={T} idx={9} at={K.Ki + 0.1} until={K.C - 0.1} texto="18 kilos *por persona al día.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="La usamos más rápido *de lo que se repone.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tu + 0.8, CUES.Numero - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Muro + 1.4, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Desierto + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Rios + 0.3, CUES.Mekong - 0.1, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Mekong + 4.3, CUES.Orillas + 1.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Kilos + 0.4, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="22" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArenaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArenaShot /></CompositionStage></div>;
}
window.ArenaApp = ArenaApp;
