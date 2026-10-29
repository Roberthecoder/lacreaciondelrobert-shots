// Shot IA #34 · El libro quemado por un volcán que la IA leyó sin abrirlo — NARRADO (N1 "Por dentro": Lupa sobre el rollo).
// Datos: Vesuvius Challenge (scrollprize.org/grandprize 2024, /firstletters 2023), U. de Kentucky 2019, CNN/Bodleian 2025. Ver guion.md y verificacion.md.
// Todo es esquemático: el texto griego de las columnas es de adorno; ΠΟΡΦΥΡΑϹ y ΦΙΛΟΔΗΜΟΥ ΠΕΡΙ ΚΑΚΙΩΝ son las palabras reales.
const CARBON = '#2b2420', CARBON2 = '#1a1512', GRIETA = '#6a5848', PURPURA = '#7a1f7e';
const GRIEGO = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡϹΤΥΦΧΩ';

// Espiral apachurrada (capas del rollo vistas de canto). letras 0..1 = letras doradas sobre las capas.
function Espiral({ cx, cy, R, vueltas = 7, seed = 3, color = '#4a3f36', ancho = 9, letras = 0, aplasta = 0.82, T = 0, tam = 22 }) {
  const r = krng(seed), N = vueltas * 60, pts = [];
  const ruido = Array.from({ length: 13 }, () => r() * 2 - 1);
  for (let i = 8; i <= N; i++) {
    const th = (i / 60) * Math.PI * 2, rr = R * (i / N) * (1 + 0.05 * ruido[i % 13]);
    pts.push([cx + Math.cos(th) * rr, cy + Math.sin(th) * rr * aplasta, th]);
  }
  const d = pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const glifos = [];
  if (letras > 0) for (let i = 40; i < pts.length; i += 11) {
    const [x, y, th] = pts[i], k = (i * 7) % GRIEGO.length, vis = kclamp(letras * 1.6 - (i / pts.length) * 0.6, 0, 1);
    if (vis <= 0) continue;
    glifos.push(<text key={i} x={x} y={y} transform={`rotate(${(th * 180) / Math.PI + 90} ${x} ${y})`} textAnchor="middle" dominantBaseline="middle"
      style={{ font:`700 ${tam}px ${KF.mono}` }} fill={KC.gold2} opacity={vis * (0.75 + 0.25 * Math.sin(T * 3 + i))}>{GRIEGO[k]}</text>);
  }
  return <g>
    <path d={d} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" />
    {glifos}
  </g>;
}

// Rollo carbonizado de lado: tronquito negro, rugoso y agrietado; a la izquierda se ve su espiral.
function Rollo({ x, y, s = 1, rot = 0, L = 520, R = 95, seed = 7, brillo = 0, T = 0, color = CARBON }) {
  const r = krng(seed), n = 14;
  const arriba = Array.from({ length: n + 1 }, (_, i) => [-L / 2 + (L * i) / n, -R + (r() * 2 - 1) * 9]);
  const abajo = Array.from({ length: n + 1 }, (_, i) => [L / 2 - (L * i) / n, R + (r() * 2 - 1) * 9]);
  const d = `M ${arriba.map((p) => p.join(' ')).join(' L ')} Q ${L / 2 + R * 0.55} 0 ${abajo[0].join(' ')} L ${abajo.map((p) => p.join(' ')).join(' L ')} Z`;
  const manchas = Array.from({ length: 9 }, () => [-L / 2 + 60 + r() * (L - 100), (r() * 2 - 1) * R * 0.6, 20 + r() * 40]);
  const grietas = Array.from({ length: 10 }, () => { const x0 = -L / 2 + 70 + r() * (L - 120), y0 = (r() * 2 - 1) * R * 0.7; return `M ${x0} ${y0} l ${10 + r() * 30} ${(r() * 2 - 1) * 26} l ${10 + r() * 30} ${(r() * 2 - 1) * 20}`; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {manchas.map(([mx, my, mr], i) => <ellipse key={i} cx={mx} cy={my} rx={mr} ry={mr * 0.55} fill={CARBON2} opacity=".7" />)}
    {grietas.map((g, i) => <path key={i} d={g} stroke={GRIETA} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".8" />)}
    <path d={`M ${-L / 2 + 40} ${-R * 0.55} Q 0 ${-R * 0.75} ${L / 2 - 40} ${-R * 0.5}`} stroke="#4d4038" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".7" />
    <ellipse cx={-L / 2} cy={0} rx={R * 0.48} ry={R} fill="#3a302a" stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(${-L / 2} 0) scale(0.48 1)`}><Espiral cx={0} cy={0} R={R * 0.9} vueltas={6} seed={seed} color="#15110e" ancho={5} aplasta={1} /></g>
    {brillo > 0 && <g opacity={brillo}>
      <ellipse cx={-L / 2} cy={0} rx={R * 0.6} ry={R * 1.15} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={0.5 + 0.3 * Math.sin(T * 4)} />
      {grietas.slice(0, 6).map((g, i) => <path key={i} d={g} stroke={KC.gold2} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.6 + 0.4 * Math.sin(T * 3 + i)} />)}
    </g>}
  </g>;
}

// Mano que sostiene el rollo por abajo (los dedos quedan enfrente).
function Mano({ x, y, s = 1, rot = 0 }) {
  const piel = '#f1b48f', sombra = '#d98f6b';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 40 Q -170 160 -120 260 L 120 260 Q 170 160 140 40 Z" fill={piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 260 L -130 380 M 120 260 L 128 380" stroke={KC.ink} strokeWidth={8} />
    <path d="M -128 262 L -130 380 L 128 380 L 120 262 Z" fill={piel} />
    {[-105, -40, 25, 90].map((fx, i) => <rect key={i} x={fx - 4} y={-28 - (i === 1 || i === 2 ? 8 : 0)} width={62} height={120} rx={30} fill={piel} stroke={KC.ink} strokeWidth={7} />)}
    {[-105, -40, 25, 90].map((fx, i) => <path key={'u' + i} d={`M ${fx + 10} ${-6 - (i === 1 || i === 2 ? 8 : 0)} q 18 -10 36 0`} stroke={sombra} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <path d="M -150 60 Q -230 10 -200 -60 Q -170 -80 -130 -20" fill={piel} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}

// Interior de la Lupa: las capas del rollo (sin letras o con letras doradas).
const interiorRollo = (letras) => (T, r) => <svg width={r * 2} height={r * 2}>
  <rect width={r * 2} height={r * 2} fill="#120e0c" />
  <g transform={`rotate(${T * 6} ${r} ${r})`}><Espiral cx={r} cy={r} R={r * 0.92} vueltas={7} seed={11} color="#55483e" ancho={10} letras={letras} T={T} /></g>
</svg>;

// Vesubio con columna de ceniza (p 0..1) y villa romana al pie.
function Vesubio({ T, p = 0 }) {
  const r = krng(5);
  const nubes = Array.from({ length: 14 }, (_, i) => ({ dx: (r() * 2 - 1) * (40 + i * 16), dy: -i * 46, rr: 50 + i * 9 + r() * 20 }));
  return <g>
    <rect x={0} y={1120} width={KW} height={300} fill="#c7a46a" />
    <path d="M -40 1130 L 380 590 Q 450 560 520 600 L 560 590 Q 640 560 700 600 L 1120 1130 Z" fill="#7a5a48" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 380 590 L 300 700 M 700 600 L 790 720 M 520 600 L 470 760" stroke="#5b4334" strokeWidth={10} fill="none" strokeLinecap="round" />
    {p > 0 && <path d={`M 520 600 q -20 ${120 * p} -60 ${240 * p} M 600 590 q 30 ${110 * p} 70 ${230 * p}`} stroke={KC.orange} strokeWidth={14} fill="none" strokeLinecap="round" />}
    {nubes.map((n, i) => { const k = kclamp(p * 14 - i, 0, 1); if (k <= 0) return null;
      return <circle key={i} cx={560 + n.dx + Math.sin(T * 0.8 + i) * 8} cy={560 + n.dy * (0.6 + 0.4 * p)} r={n.rr * k} fill={i % 3 ? '#5c5552' : '#47403d'} stroke={KC.ink} strokeWidth={6} />; })}
    {Array.from({ length: 26 }, (_, i) => { const ax = (i * 97) % KW, ay = ((T * 120 + i * 71) % 900) + 200; return <circle key={'c' + i} cx={ax} cy={ay} r={5} fill="#3c3634" opacity={0.6 * p} />; })}
    {/* villa */}
    <g transform="translate(250 1150)">
      <rect x={-170} y={-110} width={340} height={110} fill="#f4e6c8" stroke={KC.ink} strokeWidth={7} />
      <path d="M -195 -110 L 0 -190 L 195 -110 Z" fill="#c4553a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {[-130, -65, 0, 65, 130].map((cx) => <rect key={cx} x={cx - 13} y={-110} width={26} height={110} fill="#fffaf0" stroke={KC.ink} strokeWidth={5} />)}
    </g>
  </g>;
}

// Estantes con rollos de canto (los que hoy se guardan en Nápoles).
function Estantes({ T, p = 1 }) {
  const out = [];
  [640, 860, 1080].forEach((yy, f) => {
    out.push(<rect key={'t' + f} x={80} y={yy} width={920} height={34} rx={6} fill="#a86f3c" stroke={KC.ink} strokeWidth={6} />);
    for (let i = 0; i < 13; i++) for (let k = 0; k < 2; k++) {
      const idx = f * 26 + i * 2 + k, vis = kclamp(p * 80 - idx, 0, 1); if (vis <= 0) continue;
      const cx = 125 + i * 68 + k * 34, cy = yy - 34 - k * 58, rr = 30 + ((idx * 13) % 7);
      out.push(<g key={idx} transform={`translate(${cx} ${cy}) scale(${vis})`}>
        <circle r={rr} fill={CARBON} stroke={KC.ink} strokeWidth={5} />
        <Espiral cx={0} cy={0} R={rr * 0.8} vueltas={3} seed={idx} color="#0f0c0a" ancho={3} aplasta={0.9} />
      </g>);
    }
  });
  return <g>{out}</g>;
}

function Pesa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -90 Q 0 -140 40 -90" stroke={KC.ink} strokeWidth={16} fill="none" />
    <path d="M -80 -80 L 80 -80 L 100 60 L -100 60 Z" fill="#4a4f5c" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <text y={15} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.texto}>KG</text>
  </g>;
}
function Matraz({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -28 -110 L -28 -30 L -95 70 Q -100 90 -80 90 L 80 90 Q 100 90 95 70 L 28 -30 L 28 -110 Z" fill="#e9f7ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -62 20 L 62 20 L 92 72 Q 94 84 80 84 L -80 84 Q -94 84 -92 72 Z" fill={KC.leaf} />
    {[0, 1, 2].map((k) => <circle key={k} cx={-30 + k * 30} cy={50 - ((T * 60 + k * 20) % 50)} r={8} fill="#bff5c8" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-40} y={-124} width={80} height={20} rx={6} fill="#e9f7ff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function NubeGas({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-60, 10, 55], [0, -25, 70], [60, 10, 55], [0, 35, 55]].map(([cx, cy, rr], i) => <circle key={i} cx={cx + Math.sin(T * 2 + i) * 6} cy={cy} r={rr} fill="#b6f0a0" stroke={KC.ink} strokeWidth={7} opacity=".95" />)}
    <text y={20} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>GAS</text>
  </g>;
}

// Hojuelas negras que caen cuando el rollo se desmorona (c 0..1).
function Hojuelas({ cx, cy, c }) {
  const r = krng(41);
  return <g>{Array.from({ length: 46 }, (_, i) => {
    const x0 = cx + (r() * 2 - 1) * 250, y0 = cy + (r() * 2 - 1) * 80, vx = (r() * 2 - 1) * 160, rot = r() * 360, w = 18 + r() * 26;
    const xx = x0 + vx * c, yy = y0 + 520 * c * c + 40 * c;
    return <path key={i} d={`M ${-w / 2} 0 L 0 ${-w / 3} L ${w / 2} ${w / 6} L ${-w / 6} ${w / 3} Z`} transform={`translate(${xx} ${yy}) rotate(${rot + c * 300})`} fill={i % 3 ? CARBON : CARBON2} stroke={KC.ink} strokeWidth={3} opacity={1 - kclamp((c - 0.75) * 4, 0, 1)} />;
  })}</g>;
}

// Tomógrafo: anillo con un haz que gira y el rollo de canto adentro.
function Tomografo({ T, x = 540, y = 680, R = 270 }) {
  const a = T * 1.6;
  const sx = x + Math.cos(a) * R, sy = y + Math.sin(a) * R, ox = x - Math.cos(a) * R, oy = y - Math.sin(a) * R, px = -Math.sin(a) * 120, py = Math.cos(a) * 120;
  return <g>
    <circle cx={x} cy={y} r={R} fill="#0b1220" stroke="#c9d3e6" strokeWidth={70} />
    <circle cx={x} cy={y} r={R + 35} fill="none" stroke={KC.ink} strokeWidth={8} />
    <circle cx={x} cy={y} r={R - 35} fill="none" stroke={KC.ink} strokeWidth={8} />
    <polygon points={`${sx},${sy} ${ox + px},${oy + py} ${ox - px},${oy - py}`} fill={KC.cyan} opacity=".18" />
    <circle cx={sx} cy={sy} r={22} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <circle cx={x} cy={y} r={150} fill="#2a2a2a" stroke={KC.ink} strokeWidth={6} />
    <Espiral cx={x} cy={y} R={140} vueltas={7} seed={11} color="#8a8a8a" ancho={6} aplasta={0.85} />
  </g>;
}

// Hoja "desenrollada" en la computadora; un recuadro la recorre y la tinta aparece en puntitos (p 0..1). solido 0..1 = letras llenas.
function HojaVirtual({ T, x = 110, y = 430, w = 860, h = 360, p = 0, solido = 0, palabra = 'ΠΟΡΦΥΡΑϹ', tam = 150 }) {
  const r = krng(9), barrido = x + 40 + (w - 80) * p;
  const fibras = Array.from({ length: 26 }, (_, i) => ({ y: y + 10 + i * (h / 26), o: 0.15 + r() * 0.2 }));
  const fv = Array.from({ length: 14 }, (_, i) => ({ x: x + 20 + i * (w / 14) + r() * 20, o: 0.08 + r() * 0.1 }));
  return <g>
    <defs>
      <pattern id="hc-puntos" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="4" fill={KC.gold2} /></pattern>
      <clipPath id="hc-barrido"><rect x={x} y={y} width={Math.max(0, barrido - x)} height={h} /></clipPath>
    </defs>
    <rect x={x} y={y} width={w} height={h} rx={14} fill="#5b5149" stroke={KC.ink} strokeWidth={8} />
    {fibras.map((f, i) => <line key={i} x1={x + 10} y1={f.y} x2={x + w - 10} y2={f.y + 3} stroke="#3e3630" strokeWidth={3} opacity={f.o * 3} />)}
    {fv.map((f, i) => <line key={'v' + i} x1={f.x} y1={y + 10} x2={f.x + 4} y2={y + h - 10} stroke="#3e3630" strokeWidth={2} opacity={f.o * 3} />)}
    <g clipPath="url(#hc-barrido)">
      <text x={x + w / 2} y={y + h / 2 + tam * 0.36} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:'.04em' }} fill="url(#hc-puntos)" opacity={1 - solido}>{palabra}</text>
      {solido > 0 && <text x={x + w / 2} y={y + h / 2 + tam * 0.36} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:'.04em' }} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} opacity={solido}>{palabra}</text>}
    </g>
    {p > 0 && p < 1 && <g>
      <rect x={barrido - 60} y={y - 14} width={120} height={h + 28} rx={10} fill={KC.cyan} fillOpacity=".12" stroke={KC.cyan} strokeWidth={6} />
      <line x1={barrido} y1={y - 14} x2={barrido} y2={y + h + 14} stroke={KC.cyan} strokeWidth={4} />
    </g>}
  </g>;
}

// Columnas de texto griego (adorno esquemático) que se van llenando (p 0..1).
function Columnas({ p = 0, x = 90, y = 430, w = 900, h = 360 }) {
  const r = krng(23), cols = 3, filas = 9, cw = (w - 40) / cols;
  const out = [];
  for (let c = 0; c < cols; c++) for (let f = 0; f < filas; f++) {
    const idx = c * filas + f, vis = kclamp(p * cols * filas - idx, 0, 1); if (vis <= 0) continue;
    let s = ''; for (let k = 0; k < 11; k++) s += GRIEGO[Math.floor(r() * GRIEGO.length)];
    out.push(<text key={idx} x={x + 30 + c * cw} y={y + 50 + f * ((h - 60) / (filas - 1))} style={{ font:`700 30px ${KF.mono}`, letterSpacing:'.08em' }} fill={KC.gold2} opacity={vis}>{s}</text>);
  }
  return <g>
    <rect x={x} y={y} width={w} height={h + 20} rx={16} fill="#3a322c" stroke={KC.ink} strokeWidth={8} />
    {out}
  </g>;
}

function Papirologo({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -110 200 Q -110 60 0 60 Q 110 60 110 200 Z" fill={AZUL_P} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={0} r={62} fill="#e8a77f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -62 -10 Q -60 -70 0 -70 Q 60 -70 62 -10 Q 30 -40 -62 -10 Z" fill="#3b2a20" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={4} r={7} fill={KC.ink} /><circle cx={22} cy={4} r={7} fill={KC.ink} />
    <path d="M -18 30 Q 0 40 18 30" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <g transform="translate(90 40) rotate(-20)">
      <line x1={0} y1={40} x2={0} y2={120} stroke="#6b3f1f" strokeWidth={16} strokeLinecap="round" />
      <circle cx={0} cy={0} r={48} fill="rgba(180,230,255,.45)" stroke={KC.ink} strokeWidth={10} />
    </g>
  </g>;
}
const AZUL_P = '#2f6dff';

function Filosofo({ x, y, s = 1, T = 0 }) {
  const r = krng(3);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={170} width={240} height={60} rx={8} fill="#e9e1d0" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 170 Q -140 40 0 40 Q 140 40 150 170 Z" fill="#fbf7ee" stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 170 Q -40 90 60 50" stroke="#d8cfbd" strokeWidth={10} fill="none" />
    <circle cx={0} cy={-40} r={78} fill="#e8a77f" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * (i / 11)); return <circle key={i} cx={Math.cos(a) * 70} cy={-20 + Math.sin(a) * 70} r={22 + r() * 6} fill="#dcdcdc" stroke={KC.ink} strokeWidth={5} />; })}
    {Array.from({ length: 8 }, (_, i) => <circle key={'p' + i} cx={-70 + i * 20} cy={-108 + Math.abs(i - 3.5) * 5} r={20} fill="#dcdcdc" stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={-26} cy={-46} r={7} fill={KC.ink} /><circle cx={26} cy={-46} r={7} fill={KC.ink} />
    <path d={`M -20 -6 Q 0 ${4 + Math.sin(T * 3) * 4} 20 -6`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
function Lira({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 2) * 5})`}>
    <path d="M -80 -100 Q -120 40 -40 90 L 40 90 Q 120 40 80 -100" fill="none" stroke={KC.gold} strokeWidth={22} strokeLinecap="round" />
    <path d="M -80 -100 Q -120 40 -40 90 L 40 90 Q 120 40 80 -100" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <line x1={-90} y1={-80} x2={90} y2={-80} stroke="#8a5a2b" strokeWidth={14} strokeLinecap="round" />
    {[-36, -12, 12, 36].map((sx, i) => <line key={i} x1={sx} y1={-80} x2={sx + Math.sin(T * 20 + i) * 1.5} y2={88} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
function Comida({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={40} cy={40} rx={110} ry={60} fill="#d9973f" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${-10 + k * 45} 10 q 15 20 0 50`} stroke="#9c5f1f" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {[[-90, -40], [-60, -40], [-30, -40], [-75, -12], [-45, -12], [-60, 16]].map(([gx, gy], i) => <circle key={i} cx={gx} cy={gy} r={20} fill="#7b3fa0" stroke={KC.ink} strokeWidth={5} />)}
    <path d="M -60 -62 q 30 -30 60 -10 q -30 10 -60 10 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function SolFeliz({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${T * 20})`}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-72} x2={0} y2={-100} stroke={KC.orange} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}</g>
    <circle r={62} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-20} cy={-12} r={7} fill={KC.ink} /><circle cx={20} cy={-12} r={7} fill={KC.ink} />
    <path d="M -28 14 Q 0 40 28 14" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}

// Tarjeta con dibujo + texto (para el matiz IA / papirólogos).
function Tarjeta({ T, at, until, x, y, w = 440, h = 430, titulo, color, children }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, height:h, zIndex:30, transform:`scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:28, boxShadow:`12px 12px 0 ${KC.ink}`, overflow:'hidden' }}>
    <svg width={w} height={h - 110} style={{ position:'absolute', left:0, top:0 }}>{children}</svg>
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:110, background:color, borderTop:`6px solid ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center',
      font:`900 38px/1.1 ${KF.texto}`, color:KC.ink, textAlign:'center', padding:'0 16px' }}>{titulo}</div>
  </div>;
}

// Placa con el título del rollo (griego, esquemático en forma, palabras reales).
function PlacaTitulo({ T, at, until, x = 400, y = 600 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), g = 0.6 + 0.4 * Math.sin(T * 4);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:'#1a1512', border:`7px solid ${KC.ink}`,
    borderRadius:24, padding:'22px 40px', textAlign:'center', boxShadow:`0 0 ${40 * g}px ${KC.gold}88, 10px 10px 0 ${KC.ink}` }}>
    <div style={{ font:`700 58px/1.15 ${KF.mono}`, color:KC.gold2, letterSpacing:'.06em' }}>ΦΙΛΟΔΗΜΟΥ</div>
    <div style={{ font:`700 58px/1.15 ${KF.mono}`, color:KC.gold2, letterSpacing:'.06em' }}>ΠΕΡΙ ΚΑΚΙΩΝ</div>
  </div>;
}

function Herculano() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Volcan, A: CUES.Abrir, X: CUES.RayosX, P: CUES.Pregunta, I: CUES.IA, Pa: CUES.Palabra, Pr: CUES.Premio, M: CUES.Matiz, Pl: CUES.Placeres, Ti: CUES.Titulo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const gira = (t0) => Math.sin((T - t0) * 1.3) * 6 + (T - t0) * 1.5;   // el rollo gira despacito desde el cuadro 0
  const crumble = kprog(T, K.A + 2.4, K.A + 4.2, kEase.suave);
  const scan = kprog(T, K.I + 1.0, K.I + 5.2, kEase.suave);
  const caracteres = Math.round(2000 * kprog(T, K.Pr + 0.6, K.Pr + 2.6, kEase.sale));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el carbón en la mano; la lupa entra y no hay letras */}
      <Escena T={T} a={K.G} b={K.V}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Rollo x={470} y={980} rot={-8 + gira(K.G)} seed={7} T={T} />
          <Mano x={540} y={1080} s={0.9} rot={-6 + Math.sin(T * 1.3) * 3} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.G + 1.0} until={K.V - 0.3} x={330} y={560} r={210} fx={240} fy={950} interior={interiorRollo(0)} tinte={KC.cyan} etiqueta="POR DENTRO · capas" />
      <Chip T={T} at={K.G + 2.4} until={K.V - 0.2} texto="papiro carbonizado" x={720} y={1170} tam={36} borde={KC.ink} />

      {/* 2 · el volcán y los cientos de rollos */}
      <Escena T={T} a={K.V} b={K.A}>
        <FondoLunares color={KC.coral} />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.V + 2.3, K.V + 2.8) }}>{svg(<Vesubio T={T} p={kprog(T, K.V - 0.2, K.V + 2.0, kEase.sale)} />)}</div>
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.V + 2.3, K.V + 2.8) }}>{svg(<Estantes T={T} p={kprog(T, K.V + 2.4, K.V + 4.0)} />)}</div>
      </Escena>
      <Chip T={T} at={K.V + 0.3} until={K.V + 2.3} texto="Vesubio · Herculano · año 79" x={540} y={420} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.V + 2.6} until={K.A - 0.2} texto="cientos de rollos · hoy en Nápoles" x={540} y={420} tam={36} borde={KC.ink} />

      {/* 3 · intentaron abrirlos */}
      <Escena T={T} a={K.A} b={K.X}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={1 - crumble}><Rollo x={470} y={780} rot={-4 + Math.sin(T * 9) * (T > K.A + 1.9 ? 1.5 : 0)} seed={8} T={T} /></g>
          {crumble > 0 && <Hojuelas cx={470} cy={780} c={crumble} />}
          <g opacity={kprog(T, K.A + 0.2, K.A + 0.5) * (1 - crumble)}><Pesa x={220} y={1090 - 80 * kprog(T, K.A + 0.3, K.A + 1.0, kEase.sale)} s={0.9} /></g>
          <g opacity={kprog(T, K.A + 0.8, K.A + 1.1) * (1 - crumble)}><Matraz x={520} y={1100 - 80 * kprog(T, K.A + 0.9, K.A + 1.6, kEase.sale)} s={0.9} T={T} /></g>
          <g opacity={kprog(T, K.A + 1.4, K.A + 1.7) * (1 - crumble)}><NubeGas x={830} y={1090 - 80 * kprog(T, K.A + 1.5, K.A + 2.2, kEase.sale)} s={0.9} T={T} /></g>
        </>)}
      </Escena>

      {/* 4 · rayos X: se ven las capas, no la tinta */}
      <Escena T={T} a={K.X} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }} />
        {svg(<>
          <Tomografo T={T} x={540} y={680} R={260} />
          <g opacity={kprog(T, K.X + 2.6, K.X + 3.0)}>
            <rect x={150} y={980} width={300} height={130} rx={18} fill="#4a4a4a" stroke={KC.texto} strokeWidth={6} />
            <rect x={630} y={980} width={300} height={130} rx={18} fill="#4a4a4a" stroke={KC.texto} strokeWidth={6} />
            <text x={540} y={1068} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.gold2}>=</text>
            <text x={300} y={1058} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>tinta</text>
            <text x={780} y={1040} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto}>papiro</text>
            <text x={780} y={1082} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto}>quemado</text>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.X + 0.3} until={K.P - 0.2} texto="tomografía (rayos X)" x={600} y={340} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.X + 3.4} until={K.P - 0.2} texto="los dos son carbón" x={540} y={1170} tam={38} borde={KC.gold} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.I} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity=".35"><Espiral cx={540} cy={860} R={420} vueltas={8} seed={11} color={KC.ink} ancho={10} /></g>
          <text x={300} y={1090} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>
        </>)}
      </Escena>

      {/* 6 · la IA encuentra la tinta, punto por punto */}
      <Escena T={T} a={K.I} b={K.Pa}>
        <FondoCircuito T={T} />
        {svg(<>
          <g opacity={kprog(T, K.I + 0.2, K.I + 0.7)}><HojaVirtual T={T} p={scan} /></g>
          <RedNeuronal T={T} x={200} y={900} ancho={680} alto={230} capas={[4, 5, 5, 3]} onda={T > K.I + 1 ? ((T - K.I) * 0.8) % 1 : null} o={kprog(T, K.I + 0.6, K.I + 1.1)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.I + 0.4} until={K.Pa - 0.2} texto="el rollo, «desenrollado» en la compu" x={560} y={360} tam={32} borde={KC.cyan} />

      {/* 7 · la primera palabra: púrpura */}
      <Escena T={T} a={K.Pa} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        {svg(<g opacity={kprog(T, K.Pa + 3.0, K.Pa + 3.4)}>
          <HojaVirtual T={T} p={1} solido={kprog(T, K.Pa + 3.2, K.Pa + 3.8)} y={440} h={300} />
          <circle cx={250} cy={850} r={44} fill={PURPURA} stroke={KC.ink} strokeWidth={7} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Pa + 0.2} until={K.Pa + 2.9} anio="2023" quien="Vesuvius Challenge" revista="Luke Farritor · 21 años" y={860} />
      <Chip T={T} at={K.Pa + 3.6} until={K.Pr - 0.2} texto="porphyras = púrpura" x={580} y={850} tam={46} borde={PURPURA} />
      <Chip T={T} at={K.Pa + 4.4} until={K.Pr - 0.2} texto="la IA mostró la tinta · la leyeron papirólogos" x={540} y={1050} tam={30} borde={KC.ink} />

      {/* 8 · el gran premio */}
      <Escena T={T} a={K.Pr} b={K.M}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Columnas p={kprog(T, K.Pr + 0.3, K.Pr + 2.6)} y={410} h={340} />)}
      </Escena>
      <Chip T={T} at={K.Pr + 0.6} until={K.Pr + 3.6} texto={`más de ${kformato(caracteres)} caracteres`} x={540} y={850} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Pr + 4.0} until={K.M - 0.2} texto="≈ 5 % del rollo (2023)" x={540} y={850} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Pr + 3.0} until={K.M - 0.2} valor={700000} prefijo="$" dur={1.0} x={540} y={1000} tam={150} color={KC.mint} />
      <Chip T={T} at={K.Pr + 3.6} until={K.M - 0.2} texto="Youssef Nader · Luke Farritor · Julian Schilliger" x={540} y={1150} tam={27} borde={KC.ink} />
      <div style={{ position:'absolute', right:110, top:765, zIndex:20, font:`700 22px ${KF.mono}`, color:'#5a524a', opacity:kprog(T, K.Pr + 0.5, K.Pr + 0.9) * (1 - kprog(T, K.M - 0.2, K.M + 0.3)) }}>texto esquemático</div>

      {/* 9 · el matiz: la IA marca, los expertos leen */}
      <Escena T={T} a={K.M} b={K.Pl}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Tarjeta T={T} at={K.M + 0.3} until={K.Pl - 0.2} x={70} y={740} titulo="la IA: dónde hay tinta ✔" color={KC.cyan}>
        <Robotito x={220} y={190} s={0.8} T={T} cara="feliz" />
      </Tarjeta>
      <Tarjeta T={T} at={K.M + 1.6} until={K.Pl - 0.2} x={570} y={740} titulo="papirólogos: qué dice ✔" color={KC.yellow}>
        <Papirologo x={200} y={130} s={0.95} T={T} />
      </Tarjeta>
      <Chip T={T} at={K.M + 0.2} until={K.Pl - 0.2} texto="¿quién lee?" x={680} y={560} tam={44} borde={KC.ink} />

      {/* 10 · qué decía: placeres */}
      <Escena T={T} a={K.Pl} b={K.Ti}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Filosofo x={300} y={900} s={1.05} T={T} />
          <g opacity={kprog(T, K.Pl + 1.2, K.Pl + 1.5)}><Lira x={790} y={640} s={0.9} T={T} /></g>
          <g opacity={kprog(T, K.Pl + 2.0, K.Pl + 2.3)}><Comida x={790} y={890} s={0.85} /></g>
          <g opacity={kprog(T, K.Pl + 2.8, K.Pl + 3.1)}><SolFeliz x={640} y={1080} s={0.75} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Pl + 0.3} until={K.Ti - 0.2} texto="el primer rollo leído" x={700} y={420} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Pl + 1.4} until={K.Ti - 0.2} x={900} y={760} texto="música" lado="izq" />
      <Etq T={T} at={K.Pl + 2.2} until={K.Ti - 0.2} x={960} y={990} texto="comida" lado="izq" />
      <Etq T={T} at={K.Pl + 3.0} until={K.Ti - 0.2} x={730} y={1080} texto="disfrutar la vida" lado="der" />

      {/* 11 · 2025: el título de otro rollo */}
      <Escena T={T} a={K.Ti} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<Rollo x={540} y={930} rot={6} seed={19} L={560} R={100} T={T} color="#33291f" brillo={kprog(T, K.Ti + 0.6, K.Ti + 1.2)} />)}
      </Escena>
      <PlacaTitulo T={T} at={K.Ti + 0.8} until={K.C - 0.2} x={380} y={560} />
      <Chip T={T} at={K.Ti + 1.6} until={K.C - 0.2} texto="Filodemo · «Sobre los vicios»" x={420} y={730} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ti + 2.2} until={K.C - 0.2} texto="2025 · PHerc. 172 · Oxford" x={540} y={1130} tam={34} borde={KC.ink} />

      {/* 12 · cierre: el mismo carbón, cerrado… con letras por dentro */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Rollo x={470} y={980} rot={-8 + gira(K.C)} seed={7} T={T} brillo={kprog(T, K.C + 0.8, K.C + 1.6)} />
          <Mano x={540} y={1080} s={0.9} rot={-6 + Math.sin(T * 1.3) * 3} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.2} until={K.Ou + 0.2} x={330} y={560} r={210} fx={240} fy={950} interior={interiorRollo(kprog(T, K.C + 0.6, K.C + 2.2))} tinte={KC.gold} etiqueta="POR DENTRO · letras" />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="Este carbón es *un libro enrollado.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.A - 0.1} texto="Vesubio, Herculano: *cientos así.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.X - 0.1} texto="Al abrirlos, *muchos se destruyeron.*" />
      <Subtitulo T={T} idx={3} at={K.X + 0.1} until={K.P - 0.1} texto="Tinta de carbón: *casi no se nota.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.I - 0.1} texto="¿Cómo *lees* lo que no se ve?" />
      <Subtitulo T={T} idx={5} at={K.I + 0.1} until={K.Pa - 0.1} texto="Una IA *encuentra la tinta.*" />
      <Subtitulo T={T} idx={6} at={K.Pa + 0.1} until={K.Pr - 0.1} texto="2023: aparece *«púrpura».*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.M - 0.1} texto="Más de 2,000 caracteres: *700 mil dólares.*" />
      <Subtitulo T={T} idx={8} at={K.M + 0.1} until={K.Pl - 0.1} texto="La IA marca; *los expertos leen.*" />
      <Subtitulo T={T} idx={9} at={K.Pl + 0.1} until={K.Ti - 0.1} texto="Música, comida *y disfrutar la vida.*" />
      <Subtitulo T={T} idx={10} at={K.Ti + 0.1} until={K.C - 0.1} texto="2025: *«Sobre los vicios».*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Sigue cerrado… *pero ya no está mudo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Abrir + 1.0, CUES.RayosX - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.IA + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Palabra + 0.4, CUES.Palabra + 2.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Premio + 3.0, CUES.Matiz - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Matiz + 0.5, CUES.Placeres - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Placeres + 0.5, CUES.Titulo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Titulo + 1.0, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="34" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HerculanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Herculano /></CompositionStage></div>;
}
window.HerculanoApp = HerculanoApp;
