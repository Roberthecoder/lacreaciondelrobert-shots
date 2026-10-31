// Shot Biotecnológico #43 · La hamburguesa vegetal que "sangra" (leghemoglobina de soya hecha en levadura) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala entre sí.
const ROJO_CRUDO = '#c4334a', ROJO_OSC = '#8e1f33', DORADO = '#a8743c', DORADO_OSC = '#7a4f26', CAFE = '#6b4226';
const HEMO_FE = '#ff8a1f', NODULO = '#d8b48a', NOD_ROSA = '#ec7d93';

function SvgH({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

/* ---------- la hamburguesa ---------- */
// Torta vista en 3/4. cocido 0..1: rojo crudo → dorada (sin afirmar un café exacto).
const HB_PUNTOS = (() => { const R = krng(43); return Array.from({ length: 46 }, () => [(R() - 0.5) * 2, (R() - 0.5) * 2, 4 + R() * 9]); })();
function Hamburguesa({ x, y, s = 1, cocido = 0, T = 0, gota = 0 }) {
  const top = mixHex(ROJO_CRUDO, DORADO, cocido), lado = mixHex(ROJO_OSC, DORADO_OSC, cocido);
  const rx = 300, ry = 120, alto = 70;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={alto + 8} rx={rx + 10} ry={ry} fill="rgba(0,0,0,.18)" />
    <path d={`M ${-rx} 0 L ${-rx} ${alto} A ${rx} ${ry} 0 0 0 ${rx} ${alto} L ${rx} 0 Z`} fill={lado} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={top} stroke={KC.ink} strokeWidth={9} />
    {HB_PUNTOS.map(([u, v, r], i) => { const px = u * rx * 0.82, py = v * ry * 0.75; if ((px * px) / (rx * rx) + (py * py) / (ry * ry) > 0.62) return null;
      return <ellipse key={i} cx={px} cy={py} rx={r * 1.4} ry={r * 0.8} fill={i % 3 ? mixHex('#e8788a', '#d9a86a', cocido) : mixHex('#7d1628', '#5c3a1c', cocido)} opacity={0.85} />; })}
    {cocido > 0.3 && [-160, -40, 80, 200].map((gx, i) => <path key={i} d={`M ${gx - 40} ${-50} l 80 90`} stroke={mixHex(DORADO_OSC, CAFE, 0.5)} strokeWidth={12} opacity={kprog(cocido, 0.3, 0.8) * 0.8} strokeLinecap="round" />)}
    {gota > 0 && <path d={`M ${rx - 40} ${alto - 6} Q ${rx - 30} ${alto + 30 * gota} ${rx - 44} ${alto + 46 * gota} Q ${rx - 60} ${alto + 30 * gota} ${rx - 52} ${alto - 4} Z`} fill={ROJO_CRUDO} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
function Tabla({ x, y, w = 820, h = 330 }) {
  return <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={60} fill="#e2b276" stroke={KC.ink} strokeWidth={10} />
    {[0.25, 0.45, 0.7].map((k, i) => <path key={i} d={`M ${x - w / 2 + 60} ${y - h / 2 + h * k} q ${w * 0.3} ${-18} ${w * 0.6} 0`} stroke="#c58f52" strokeWidth={6} fill="none" />)}
    <circle cx={x + w / 2 - 70} cy={y} r={22} fill="#c58f52" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Espatula({ x, y, baja = 0 }) {
  const yy = y + baja * 70;
  return <g transform={`translate(${x} ${yy}) rotate(-18)`}>
    <rect x={-150} y={-30} width={300} height={44} rx={10} fill="#cfd8e0" stroke={KC.ink} strokeWidth={8} />
    {[-90, -30, 30, 90].map((sx) => <rect key={sx} x={sx - 8} y={-20} width={16} height={24} rx={6} fill="#9aa4ae" />)}
    <rect x={150} y={-22} width={70} height={28} fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} />
    <rect x={215} y={-30} width={260} height={44} rx={22} fill="#2b2b2b" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function GotaCae({ T, x, y0, y1, a, dur = 0.9 }) {
  const p = kprog(T, a, a + dur, kEase.entra || ((u) => u * u));
  if (T < a || p >= 1) return null;
  const y = klerp(y0, y1, p);
  return <path d={`M ${x} ${y - 30} Q ${x + 22} ${y} ${x} ${y + 16} Q ${x - 22} ${y} ${x} ${y - 30} Z`} fill={ROJO_CRUDO} stroke={KC.ink} strokeWidth={5} />;
}
function Charco({ x, y, f }) {
  if (f <= 0) return null;
  return <ellipse cx={x} cy={y} rx={60 * f} ry={18 * f} fill={ROJO_CRUDO} stroke={KC.ink} strokeWidth={5} opacity={0.95} />;
}
function Sarten({ x, y, w = 760, children }) {
  return <g>
    <rect x={x + w / 2 - 20} y={y - 24} width={360} height={48} rx={24} fill="#2b2b2b" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={x} cy={y + 30} rx={w / 2} ry={150} fill="#3a3d42" stroke={KC.ink} strokeWidth={11} />
    <ellipse cx={x} cy={y + 10} rx={w / 2 - 40} ry={118} fill="#55595f" />
    {children}
  </g>;
}
function Llamas({ T, x, y, n = 7, ancho = 600, f = 1 }) {
  if (f <= 0) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const fx = x - ancho / 2 + (i + 0.5) * ancho / n, h = (60 + 30 * Math.abs(Math.sin(T * 7 + i * 1.7))) * f;
    return <g key={i}><path d={`M ${fx - 26} ${y} Q ${fx - 20} ${y - h * 0.6} ${fx} ${y - h} Q ${fx + 20} ${y - h * 0.6} ${fx + 26} ${y} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${fx - 12} ${y} Q ${fx - 8} ${y - h * 0.35} ${fx} ${y - h * 0.55} Q ${fx + 8} ${y - h * 0.35} ${fx + 12} ${y} Z`} fill={KC.yellow} /></g>; })}</g>;
}
function Vapor({ T, x, y, n = 4, f = 1, color = 'rgba(255,255,255,.8)' }) {
  if (f <= 0) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.6 + i / n) % 1), vx = x - 150 + i * 100;
    return <path key={i} d={`M ${vx} ${y - u * 220} q 24 -30 0 -60 q -24 -30 0 -60`} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" opacity={f * Math.sin(u * Math.PI)} />; })}</g>;
}

/* ---------- el hemo ---------- */
// Porfirina esquemática: 4 anillitos (pirroles) unidos en un anillo grande, 4 nitrógenos y un hierro (Fe) en el centro.
function Hemo({ x, y, s = 1, brillo = 0, T = 0, rot = 0, etiquetaFe = true }) {
  const R = 120, pir = [0, 90, 180, 270];
  const pent = (cx, cy, a) => Array.from({ length: 5 }, (_, i) => { const t = a + Math.PI + i * 2 * Math.PI / 5; return `${(cx + 40 * Math.cos(t)).toFixed(1)},${(cy + 40 * Math.sin(t)).toFixed(1)}`; }).join(' ');
  const late = 1 + 0.08 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <circle r={170} fill={HEMO_FE} opacity={0.22 * brillo} />}
    <circle r={R} fill="none" stroke={KC.ink} strokeWidth={22} />
    <circle r={R} fill="none" stroke="#e8336d" strokeWidth={12} />
    {pir.map((d, i) => { const a = d * Math.PI / 180, cx = Math.cos(a) * R, cy = Math.sin(a) * R;
      return <g key={i}>
        <line x1={0} y1={0} x2={cx * 0.55} y2={cy * 0.55} stroke={KC.ink} strokeWidth={8} />
        <polygon points={pent(cx, cy, a)} fill={KC.pink} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
        <circle cx={cx * 0.62} cy={cy * 0.62} r={15} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
        <line x1={cx * 1.32} y1={cy * 1.32} x2={cx * 1.32 + Math.cos(a + 0.6) * 46} y2={cy * 1.32 + Math.sin(a + 0.6) * 46} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
      </g>; })}
    <circle r={38 * late} fill={HEMO_FE} stroke={KC.ink} strokeWidth={7} />
    {etiquetaFe && <text x={0} y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>Fe</text>}
  </g>;
}
function HemoMini({ x, y, s = 0.25, T = 0 }) { return <Hemo x={x} y={y} s={s} T={T} etiquetaFe={false} />; }

/* ---------- tarjetas: carne, sangre y soya ---------- */
function Filete({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -50 Q -60 -110 40 -90 Q 130 -70 125 10 Q 120 90 20 95 Q -110 100 -130 30 Q -150 -10 -120 -50 Z" fill="#c8323f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -30 Q -20 -60 70 -40 M -90 30 Q 0 10 90 40" stroke="#f3c6c6" strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}
function GlobuloRojo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={110} ry={74} fill="#d7263d" stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={56} ry={30} fill="#a81a2e" />
  </g>;
}
function NoduloIcono({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 -60 Q -20 -40 0 0 Q 30 60 130 70" stroke="#c9a06a" strokeWidth={14} fill="none" strokeLinecap="round" />
    <circle cx={-10} cy={-6} r={58} fill={NODULO} stroke={KC.ink} strokeWidth={8} />
    <path d="M -10 -64 A 58 58 0 0 1 -10 52 Z" fill={NOD_ROSA} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Tarjeta({ x, y, w = 300, h = 470, color, titulo, sub, e = 1, children }) {
  return <g transform={`translate(${x} ${y + (1 - e) * 80})`} opacity={e}>
    <rect x={-w / 2 + 10} y={-h / 2 + 10} width={w} height={h} rx={30} fill={KC.ink} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2} y={-h / 2} width={w} height={80} rx={30} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-h / 2 + 56} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{titulo}</text>
    {children}
    <text x={0} y={h / 2 - 30} textAnchor="middle" style={{ font:`700 27px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
}

/* ---------- la soya y su raíz ---------- */
const SOYA_NOD = [[-60, 120, 20], [40, 170, 24], [-110, 240, 18], [90, 260, 22], [-20, 300, 26], [140, 330, 17], [-150, 360, 20], [60, 400, 22]];
function Soya({ T, x, suelo, cortado = 0 }) {
  const hojas = [[-1, -260], [1, -330], [-1, -420], [0, -500]];
  return <g>
    <path d={`M ${x} ${suelo} Q ${x + mece(T, 3, 0.3) * 10} ${suelo - 250} ${x + mece(T, 4, 0.3) * 18} ${suelo - 480}`} stroke="#3c8f3a" strokeWidth={18} fill="none" strokeLinecap="round" />
    {hojas.map(([lado, dy], i) => { const bx = x + mece(T, i + 7, 0.3) * 14, by = suelo + dy;
      return <g key={i} transform={`translate(${bx} ${by}) rotate(${mece(T, i + 2, 0.4) * 6})`}>
        {[-40, 0, 40].map((a, k) => <ellipse key={k} cx={Math.sin((a + lado * 30) * Math.PI / 180) * 90 * (lado || (k - 1))} cy={-Math.cos(a * Math.PI / 180) * 60} rx={56} ry={34}
          transform={`rotate(${a + lado * 30})`} fill={k === 1 ? '#5cc85a' : KC.leaf} stroke={KC.ink} strokeWidth={6} />)}
      </g>; })}
    <path d={`M ${x} ${suelo} L ${x} ${suelo + 430}`} stroke="#c9a06a" strokeWidth={16} strokeLinecap="round" />
    {[[0, 80, -170, 200], [0, 120, 180, 230], [0, 200, -190, 330], [0, 240, 170, 360], [0, 320, -150, 420], [0, 340, 120, 440]].map(([a, ya, dx, yb], i) =>
      <path key={i} d={`M ${x} ${suelo + ya} Q ${x + dx * 0.5} ${suelo + ya + 10} ${x + dx} ${suelo + yb}`} stroke="#c9a06a" strokeWidth={9} fill="none" strokeLinecap="round" />)}
    {SOYA_NOD.map(([dx, dy, r], i) => <circle key={i} cx={x + dx} cy={suelo + dy} r={r} fill={i === 3 && cortado > 0 ? mixHex(NODULO, NOD_ROSA, cortado) : NODULO} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function NoduloCorte({ T, x, y, r = 170, abre = 1 }) {
  const a = r * abre;
  return <g>
    <circle cx={x} cy={y} r={r} fill={NODULO} stroke={KC.ink} strokeWidth={10} />
    <circle cx={x} cy={y} r={Math.max(1, (r - 22) * abre)} fill={NOD_ROSA} stroke="#b84a62" strokeWidth={5} />
    {abre > 0.5 && Array.from({ length: 18 }, (_, i) => { const g = krng(i * 13 + 3), ang = g() * 6.28, rr = g() * (r - 40);
      return <circle key={i} cx={x + Math.cos(ang) * rr} cy={y + Math.sin(ang) * rr} r={4 + g() * 6} fill="#f6a6b6" opacity={0.8} />; })}
    <path d={`M ${x - a * 0.6} ${y - a * 0.62} A ${a * 0.85} ${a * 0.85} 0 0 1 ${x + a * 0.1} ${y - a * 0.84}`} stroke="rgba(255,255,255,.55)" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Interior del nódulo (para la Lupa): células llenas de bacterias y leghemoglobina que atrapa el oxígeno.
function InteriorNodulo(T, r, t0) {
  const W = 2 * r, cel = [];
  const paso = 150;
  for (let i = -1; i < W / paso + 1; i++) for (let j = -1; j < W / (paso * 0.86) + 1; j++) {
    const cx = i * paso + (j % 2) * paso / 2, cy = j * paso * 0.86;
    cel.push([cx, cy, i * 31 + j * 7]);
  }
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 6 + k * Math.PI / 3; return `${(cx + 82 * Math.cos(a)).toFixed(1)},${(cy + 82 * Math.sin(a)).toFixed(1)}`; }).join(' ');
  return <svg width={W} height={W} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={W} height={W} fill="#2a0d17" />
    {cel.map(([cx, cy, sd], k) => { const R = krng(sd + 100);
      return <g key={k}>
        <polygon points={hex(cx, cy)} fill="#5c1d2e" stroke="#f08aa0" strokeWidth={4} />
        {Array.from({ length: 7 }, (_, b) => { const bx = cx + (R() - 0.5) * 90, by = cy + (R() - 0.5) * 80, rot = R() * 180 + Math.sin(T + b) * 6;
          return <rect key={b} x={bx - 20} y={by - 8} width={40} height={16} rx={8} fill="#f4d3b0" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${rot} ${bx} ${by})`} />; })}
        {Array.from({ length: 6 }, (_, b) => { const bx = cx + (R() - 0.5) * 110, by = cy + (R() - 0.5) * 100;
          return <circle key={'l' + b} cx={bx + Math.sin(T * 2 + b + k) * 6} cy={by + Math.cos(T * 2 + b) * 6} r={8} fill="#ff2d55" stroke="#ffd0da" strokeWidth={2} />; })}
      </g>; })}
    {Array.from({ length: 8 }, (_, i) => { const u = ((T - t0) * 0.35 + i / 8) % 1, ox = (i * 97) % W, oy = (i * 151) % W;
      const px = klerp(ox < W / 2 ? -20 : W + 20, W / 2 + Math.sin(i) * r * 0.5, u), py = klerp(oy, W / 2 + Math.cos(i * 2) * r * 0.5, u);
      return <g key={'o' + i} opacity={Math.sin(u * Math.PI)}><circle cx={px - 9} cy={py} r={11} fill="#bfe8ff" stroke={KC.ink} strokeWidth={3} /><circle cx={px + 9} cy={py} r={11} fill="#bfe8ff" stroke={KC.ink} strokeWidth={3} /></g>; })}
  </svg>;
}
function InteriorHemo(T, r, t0) {
  const W = 2 * r, e = kprog(T, t0, t0 + 0.8, kEase.sale);
  return <svg width={W} height={W} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={W} height={W} fill="#140a10" />
    {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 9); return <circle key={i} cx={g() * W} cy={(g() * W + T * 20) % W} r={3 + g() * 4} fill="rgba(255,120,140,.35)" />; })}
    <Hemo x={r} y={r} s={0.95 * e} brillo={0.5 + 0.5 * Math.sin(T * 4)} T={T} rot={T * 6} />
  </svg>;
}
// Proteína plegada (8 hélices esquemáticas) que se abre al cocinarse y deja expuesto su hemo.
function InteriorSabor(T, r, t0) {
  const W = 2 * r, abre = kprog(T, t0 + 0.6, t0 + 2.2, kEase.suave);
  const N = 8, puntos = Array.from({ length: N }, (_, i) => {
    const a = i / N * Math.PI * 2 + 0.3, plegado = [r + Math.cos(a) * 120, r + Math.sin(a) * 105];
    const abierto = [40 + i * (W - 80) / (N - 1), r + 150 + Math.sin(i * 1.3 + T) * 30];
    return [klerp(plegado[0], abierto[0], abre), klerp(plegado[1], abierto[1], abre), a];
  });
  const cad = 'M ' + puntos.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');
  return <svg width={W} height={W} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={W} height={W} fill="#1d0f08" />
    <path d={cad} stroke="#ffd18a" strokeWidth={10} fill="none" strokeLinejoin="round" opacity={0.8} />
    {puntos.map(([x, y, a], i) => <rect key={i} x={x - 44} y={y - 20} width={88} height={40} rx={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={5}
      transform={`rotate(${klerp(a * 57 + 90, 0, abre)} ${x} ${y})`} />)}
    <Hemo x={r} y={r - 20 * abre} s={0.5} T={T} brillo={abre} />
    {Array.from({ length: 6 }, (_, i) => { const t1 = t0 + 2.0 + i * 0.35, llega = kprog(T, t1, t1 + 0.5, kEase.sale), sube = kprog(T, t1 + 0.55, t1 + 2.2);
      if (T < t1) return null;
      const sx = i % 2 ? W - 30 : 30, sy = 80 + i * 50, hx = r + (i % 2 ? 70 : -70), hy = r - 30;
      return sube <= 0 ? <polygon key={i} points={Array.from({ length: 6 }, (_, k) => { const ang = Math.PI / 6 + k * Math.PI / 3, cx = klerp(sx, hx, llega), cy = klerp(sy, hy, llega); return `${(cx + 20 * Math.cos(ang)).toFixed(1)},${(cy + 20 * Math.sin(ang)).toFixed(1)}`; }).join(' ')}
        fill={i % 2 ? KC.yellow : KC.mint} stroke={KC.ink} strokeWidth={3} />
        : <path key={i} d={`M ${hx} ${hy - sube * 220} q 18 -22 0 -44 q -18 -22 0 -44`} stroke={i % 2 ? KC.gold2 : '#ffb08a'} strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - sube} />;
    })}
  </svg>;
}

function HemoShot() {
  const { T, CUES } = useComposition();
  const K = CUES;
  const FIN = K.Outro + 4;
  const presiona = kprog(T, K.Gancho, K.Gancho + 0.5, kEase.sale) * (1 - kprog(T, K.Gancho + 2.6, K.Gancho + 3.2));
  const gotaF = kprog(T, K.Gancho + 0.2, K.Gancho + 0.7);
  const charco = kprog(T, K.Gancho + 1.3, K.Gancho + 1.8, kEase.sale);
  const cocinado = kprog(T, K.Cocina + 0.3, K.Cocina + 3.0, kEase.suave);
  const tinte = kprog(T, K.Tanque + 0.3, K.Tanque + 3.5);
  const genEntra = kprog(T, K.Levadura + 0.3, K.Levadura + 2.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–2 · la hamburguesa cruda que "sangra" (y el hemo bajo la lupa) */}
      <Escena T={T} a={K.Gancho} b={K.Sangre} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgH>
          <Tabla x={480} y={950} w={780} h={300} />
          <Hamburguesa x={470} y={900} s={0.85} T={T} gota={gotaF} />
          <GotaCae T={T} x={692} y0={975} y1={1060} a={K.Gancho + 0.7} dur={0.6} />
          <GotaCae T={T} x={692} y0={975} y1={1060} a={K.Gancho + 2.2} dur={0.6} />
          <Charco x={696} y={1066} f={charco} />
          <g transform="translate(940 0) scale(-1 1)"><Espatula x={460} y={740} baja={presiona} /></g>
          {T > K.Hamburguesa && <g opacity={kprog(T, K.Hamburguesa, K.Hamburguesa + 0.5)}>
            {[[140, 660, -20], [830, 1110, 25]].map(([lx, ly, rot], i) => <g key={i} transform={`translate(${lx} ${ly}) rotate(${rot + mece(T, i, 0.4) * 8})`}>
              <ellipse rx={70} ry={40} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><line x1={-60} y1={0} x2={60} y2={0} stroke="#2b7a2a" strokeWidth={4} /></g>)}
          </g>}
        </SvgH>
      </Escena>
      {/* 3 · el mismo hemo: carne, sangre y soya */}
      <Escena T={T} a={K.Sangre} b={K.Nodulos} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgH>
          {[[200, 'CARNE', 'mioglobina', '#ff8a7a', (s) => <Filete x={0} y={-30} s={s} />],
            [540, 'SANGRE', 'hemoglobina', '#ff5a6e', (s) => <GlobuloRojo x={0} y={-30} s={s} rot={Math.sin(T) * 6} />],
            [880, 'SOYA', 'leghemoglobina', '#9be38f', (s) => <NoduloIcono x={0} y={-30} s={s} />]].map(([x, t, sub, col, dib], i) => {
            const e = kprog(T, K.Sangre + 0.1 + i * 0.5, K.Sangre + 0.6 + i * 0.5, kEase.sale);
            return <Tarjeta key={i} x={x} y={900} color={col} titulo={t} sub={sub} e={e}>
              {dib(0.9)}
              {i === 1 ? [[-60, 110], [-20, 110], [20, 110], [60, 110]].map(([hx, hy], k) => <g key={k} opacity={kprog(T, K.Sangre + 1.6 + k * 0.25, K.Sangre + 1.8 + k * 0.25)}><HemoMini x={hx} y={hy} s={0.13} T={T} /></g>)
                : <HemoMini x={0} y={110} s={0.22} T={T} />}
            </Tarjeta>; })}
          {[370, 710].map((ex, i) => <text key={i} x={ex} y={1030} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Sangre + 1.2 + i * 0.3, K.Sangre + 1.5 + i * 0.3)}>=</text>)}
        </SvgH>
      </Escena>
      {/* 4–5 · la raíz de la soya y sus nódulos */}
      <Escena T={T} a={K.Nodulos} b={K.Pregunta} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', left:0, top:760, width:KW, height:KH - 760, background:'#8a5a34', backgroundImage:'radial-gradient(circle, rgba(0,0,0,.18) 6px, transparent 7px)', backgroundSize:'46px 46px' }}></div>
        <SvgH>
          <Soya T={T} x={360} suelo={760} cortado={kprog(T, K.Nodulos + 2.0, K.Nodulos + 2.6)} />
          {T > K.Nodulos + 1.8 && <g>
            <line x1={450} y1={1020} x2={660} y2={900} stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" />
            <NoduloCorte T={T} x={790} y={900} r={160} abre={kprog(T, K.Nodulos + 2.0, K.Nodulos + 2.8, kEase.sale)} />
          </g>}
        </SvgH>
      </Escena>
      {/* 6 · ¿de la raíz a tu plato? */}
      <Escena T={T} a={K.Pregunta} b={K.Levadura} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgH>
          <NoduloIcono x={230} y={1080} s={1.3} />
          <g transform="translate(300 760)"><ellipse rx={170} ry={46} fill="#fff" stroke={KC.ink} strokeWidth={8} /><Hamburguesa x={0} y={-30} s={0.42} /></g>
          <FlechaCurva x1={260} y1={990} x2={300} y2={830} p={kprog(T, K.Pregunta + 0.2, K.Pregunta + 1.6)} curva={-120} color={KC.yellow} T={T} />
          <text x={150} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 150 540)`}>?</text>
        </SvgH>
      </Escena>
      {/* 7 · el gen entra a la levadura (microscópico, fondo oscuro) */}
      <Escena T={T} a={K.Levadura} b={K.Tanque} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgH>
          <Levadura x={600} y={820} r={200} brote={0.8} T={T} seed={4} />
          {genEntra < 1 && <g opacity={1 - kprog(genEntra, 0.85, 1)} transform={`translate(${klerp(-560, 380, genEntra)} 0)`}><ADNHebra T={T} x={0} y={820} largo={360} alto={56} vueltas={2.5} resalta={() => true} /></g>}
          {Array.from({ length: 10 }, (_, i) => { const g = krng(i + 70), ang = g() * 6.28, rr = g() * 120, a = K.Levadura + 2.4 + i * 0.12;
            return T > a && <circle key={i} cx={600 + Math.cos(ang) * rr + Math.sin(T * 2 + i) * 5} cy={820 + Math.sin(ang) * rr * 0.8} r={11 * kprog(T, a, a + 0.3, kEase.rebote)} fill="#ff2d55" stroke="#ffd0da" strokeWidth={3} />; })}
        </SvgH>
        <Escala T={T} z={1} pxPorMm={80000} x={60} y={1430} />
      </Escena>
      {/* 8 · tanque de fermentación: el caldo se pone rojo */}
      <Escena T={T} a={K.Tanque} b={K.Sabor} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={0.25} burbujas={1} fondo={KC.cyan} />
        <SvgH>
          <clipPath id="hemoCaldo"><rect x={258} y={700} width={564} height={792} rx={64} /></clipPath>
          <rect x={250} y={690} width={580} height={810} fill={ROJO_CRUDO} opacity={0.7 * tinte} clipPath="url(#hemoCaldo)" />
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 300), lx = 300 + g() * 480, ly = 760 + ((g() * 700 + T * 40) % 700);
            return <ellipse key={i} cx={lx} cy={ly} rx={14} ry={11} fill="#f4dc9a" stroke={KC.ink} strokeWidth={3} opacity={0.9} />; })}
        </SvgH>
      </Escena>
      {/* 9 · al cocinarse: la proteína se abre y el hemo queda expuesto */}
      <Escena T={T} a={K.Sabor} b={K.Estudio} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <SvgH>
          <Llamas T={T} x={400} y={1270} ancho={560} />
          <Sarten x={400} y={1150} w={700}><Hamburguesa x={400} y={1110} s={0.8} cocido={kprog(T, K.Sabor, K.Sabor + 5)} /></Sarten>
          <Vapor T={T} x={420} y={1040} f={kprog(T, K.Sabor + 0.5, K.Sabor + 1.5)} />
        </SvgH>
      </Escena>
      {/* 10 · 2018 y 2019: la FDA */}
      <Escena T={T} a={K.Estudio} b={K.Cocina} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgH>
          <g transform={`translate(300 1150) rotate(-4)`}>
            <rect x={-170} y={-200} width={340} height={420} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 7 }, (_, i) => <rect key={i} x={-130} y={-140 + i * 48} width={i % 3 === 2 ? 160 : 260} height={14} rx={7} fill="#c9c3d6" />)}
            <g opacity={kprog(T, K.Estudio + 3.4, K.Estudio + 3.6)} transform={`translate(80 130) scale(${klerp(1.6, 1, kprog(T, K.Estudio + 3.4, K.Estudio + 3.7, kEase.rebote))}) rotate(-14)`}>
              <circle r={70} fill="none" stroke={KC.red} strokeWidth={10} /><text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.red}>0.8 %</text></g>
          </g>
        </SvgH>
      </Escena>
      {/* 11 · el rojo se pierde al cocinarse */}
      <Escena T={T} a={K.Cocina} b={K.Cierre} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgH>
          <Llamas T={T} x={540} y={1160} ancho={600} f={1} />
          <Sarten x={540} y={1030} w={760}><Hamburguesa x={540} y={990} s={0.9} cocido={cocinado} /></Sarten>
          <Vapor T={T} x={560} y={920} f={cocinado} />
        </SvgH>
        <Medidor T={T} at={K.Cocina + 0.2} until={K.Cierre - 0.2} valor={() => 1 - 0.9 * cocinado} etiqueta="color rojo" texto={(v) => v > 0.5 ? 'crudo' : 'cocido'} x={90} y={1500} color={ROJO_CRUDO} />
      </Escena>
      {/* 12 · cierre: la hamburguesa del inicio, ya cocida, con su origen */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgH>
          <Tabla x={480} y={950} w={780} h={300} />
          <Hamburguesa x={470} y={900} s={0.85} cocido={1} T={T} />
          <FlechaCurva x1={170} y1={1560} x2={300} y2={1060} p={kprog(T, K.Cierre + 0.6, K.Cierre + 1.6)} curva={80} color={KC.mint} T={T} />
          <FlechaCurva x1={900} y1={1560} x2={680} y2={1080} p={kprog(T, K.Cierre + 1.2, K.Cierre + 2.2)} curva={-80} color={KC.yellow} T={T} />
          <g opacity={kprog(T, K.Cierre + 0.4, K.Cierre + 0.8)}><NoduloIcono x={170} y={1650} s={0.8} /></g>
          <g opacity={kprog(T, K.Cierre + 1.0, K.Cierre + 1.4)}><Levadura x={900} y={1650} r={70} brote={0.6} T={T} seed={2} /></g>
        </SvgH>
      </Escena>

      {/* lupas */}
      <Lupa T={T} at={K.Hemo + 0.2} until={K.Sangre - 0.2} x={420} y={760} r={260} fx={696} fy={1066} interior={(t, r) => InteriorHemo(t, r, K.Hemo + 0.2)} tinte={KC.pink} etiqueta="AL MICROSCOPIO · HEMO" />
      <Lupa T={T} at={K.Oxigeno + 0.1} until={K.Pregunta - 0.2} x={560} y={560} r={250} fx={790} fy={900} interior={(t, r) => InteriorNodulo(t, r, K.Oxigeno)} tinte={KC.mint} etiqueta="POR DENTRO · NÓDULO" />
      <Lupa T={T} at={K.Sabor + 0.4} until={K.Estudio - 0.2} x={640} y={620} r={250} fx={420} fy={1100} interior={(t, r) => InteriorSabor(t, r, K.Sabor + 0.4)} tinte={KC.orange} etiqueta="AL MICROSCOPIO · AL COCINAR" />

      {/* textos */}
      <MitoTachado T={T} at={K.Gancho + 0.3} tacharEn={K.Gancho + 1.9} until={K.Hamburguesa - 0.2} texto="¿sangre?" x={300} y={430} tam={56} />
      <Chip T={T} at={K.Hamburguesa + 0.4} until={K.Hemo - 0.2} texto="hamburguesa vegetal · sin carne" y={1500} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.Hemo + 1.0} until={K.Sangre - 0.2} texto="hemo = anillo + hierro (Fe)" y={1500} tam={40} borde={HEMO_FE} />
      <Chip T={T} at={K.Sangre + 1.8} until={K.Nodulos - 0.2} texto="el mismo hemo B" y={1500} tam={44} borde={KC.red} />
      <Etiqueta T={T} at={K.Nodulos + 0.6} until={K.Oxigeno - 0.2} x={480} y={1060} texto="nódulos" lado="der" tam={36} />
      <Etiqueta T={T} at={K.Nodulos + 0.3} until={K.Nodulos + 3.0} x={470} y={560} texto="Glycine max" it lado="der" color={KC.ink} tam={36} />
      <Chip T={T} at={K.Nodulos + 3.0} until={K.Oxigeno - 0.2} texto="rosado = leghemoglobina" y={1560} tam={38} borde={NOD_ROSA} />
      <Etiqueta T={T} at={K.Oxigeno + 0.9} until={K.Pregunta - 0.2} x={60} y={960} texto="bacterias (rizobios)" lado="der" tam={30} />
      <Chip T={T} at={K.Oxigeno + 1.2} until={K.Pregunta - 0.2} texto="leghemoglobina ↔ O₂" y={1500} tam={42} borde="#ff2d55" />
      <Etiqueta T={T} at={K.Levadura + 0.4} until={K.Tanque - 0.2} x={60} y={620} texto="gen de leghemoglobina (soya)" lado="der" tam={30} color={KC.gold2} />
      <Etiqueta T={T} at={K.Levadura + 1.4} until={K.Tanque - 0.2} x={360} y={1070} texto="Pichia pastoris" it lado="der" tam={36} />
      <Etiqueta T={T} at={K.Levadura + 1.8} until={K.Tanque - 0.2} x={360} y={1120} texto="(hoy Komagataella phaffii)" it lado="der" tam={24} />
      <Chip T={T} at={K.Tanque + 0.3} until={K.Sabor - 0.2} texto="fermentación" y={1640} tam={44} borde={ROJO_CRUDO} />
      <Chip T={T} at={K.Sabor + 3.0} until={K.Estudio - 0.2} texto="hemo expuesto → olor a carne" y={1500} tam={38} borde={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 3.1} anio="2018" quien="FDA · Estados Unidos" revista="sin objeciones: para dar sabor (GRAS)" x={500} y={900} />
      <TarjetaEstudio T={T} at={K.Estudio + 3.3} until={K.Cocina - 0.2} anio="2019" quien="FDA · aditivo de color" revista="máx. 0.8 % del producto crudo" x={500} y={900} />
      <Chip T={T} at={K.Cierre + 2.4} until={K.Outro} texto="raíz de soya + levadura" y={1450} tam={40} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Hamburguesa - 0.1} texto="No es sangre: *es soya y levadura.*" />
      <Subtitulo T={T} idx={1} at={K.Hamburguesa + 0.1} until={K.Hemo - 0.1} texto="Algunas hamburguesas *vegetales.*" />
      <Subtitulo T={T} idx={2} at={K.Hemo + 0.1} until={K.Sangre - 0.1} texto="El *hemo:* hierro en un anillo." />
      <Subtitulo T={T} idx={3} at={K.Sangre + 0.1} until={K.Nodulos - 0.1} texto="El mismo hemo *de tu sangre.*" />
      <Subtitulo T={T} idx={4} at={K.Nodulos + 0.1} until={K.Oxigeno - 0.1} texto="Nódulos: *rosados por dentro.*" />
      <Subtitulo T={T} idx={5} at={K.Oxigeno + 0.1} until={K.Pregunta - 0.1} texto="Controla *el oxígeno.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Levadura - 0.1} texto="¿De la raíz *a tu plato?*" />
      <Subtitulo T={T} idx={7} at={K.Levadura + 0.1} until={K.Tanque - 0.1} texto="El gen, *en una levadura.*" />
      <Subtitulo T={T} idx={8} at={K.Tanque + 0.1} until={K.Sabor - 0.1} texto="La levadura *la fabrica.*" />
      <Subtitulo T={T} idx={9} at={K.Sabor + 0.1} until={K.Estudio - 0.1} texto="Hemo expuesto: *olor a carne.*" />
      <Subtitulo T={T} idx={10} at={K.Estudio + 0.1} until={K.Cocina - 0.1} texto="FDA: *2018 sabor, 2019 color.*" />
      <Subtitulo T={T} idx={11} at={K.Cocina + 0.1} until={K.Cierre - 0.1} texto="El rojo *se pierde al cocinar.*" />
      <Subtitulo T={T} idx={12} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Raíz + levadura = *ese rojo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Hemo + 1.0, K.Sangre - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Nodulos + 3.2, K.Oxigeno - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pregunta + 0.05, K.Levadura - 0.25, 'avatar_07_pensativo_puno', 'grande'],
        [K.Levadura + 1.2, K.Tanque + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Sabor + 1.4, K.Estudio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Estudio + 0.6, K.Cocina - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Cocina + 0.5, K.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="43" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HemoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HemoShot /></CompositionStage></div>;
}
window.HemoApp = HemoApp;
