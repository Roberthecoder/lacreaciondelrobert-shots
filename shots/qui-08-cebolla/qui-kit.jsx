// qui-kit.jsx — piezas de química para la serie Shot Químico (28 oct 2026, rama claude/igualar-quimico).
// Se carga después de kit-robert.jsx. Todo devuelve <g> de SVG (usar dentro de un <svg>), salvo SvgCapa.
// El dibujo es esquemático.

// Capa SVG de pantalla completa.
function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Botella de limpieza/cocina con etiqueta. inclina en grados (vierte hacia la derecha si > 0).
function Botella({ x, y, s = 1, color = '#f6f3ec', liquido = '#cfe9ff', etiqueta = '', etqColor = KC.cyan, inclina = 0, tapa = KC.blue, nivel = 0.7 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <rect x={-26} y={-250} width={52} height={40} rx={8} fill={tapa} stroke={KC.ink} strokeWidth={7} />
    <path d="M -34 -210 L 34 -210 L 40 -170 Q 95 -150 95 -90 L 95 120 Q 95 150 65 150 L -65 150 Q -95 150 -95 120 L -95 -90 Q -95 -150 -40 -170 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <clipPath id={`bt${Math.round(x)}${Math.round(y)}`}><path d="M -91 -90 L 91 -90 L 91 120 Q 91 146 65 146 L -65 146 Q -91 146 -91 120 Z" /></clipPath>
    <rect x={-95} y={150 - 240 * nivel} width={190} height={240 * nivel} fill={liquido} opacity={0.75} clipPath={`url(#bt${Math.round(x)}${Math.round(y)})`} />
    {etiqueta && <g><rect x={-80} y={-40} width={160} height={110} rx={12} fill={etqColor} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={30} textAnchor="middle" style={{ font:`400 ${etiqueta.length > 7 ? 30 : 40}px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Chorro que cae de (x0,y0) a (x1,y1). o = opacidad (0 = no hay chorro).
function Chorro({ T, x0, y0, x1, y1, color = '#cfe9ff', o = 1, ancho = 16 }) {
  if (o <= 0) return null;
  const w = Math.sin(T * 18) * 4;
  return <path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + 30 + w} ${y0 + 20} ${x1 + w} ${y1}`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" opacity={o} />;
}
// Cubeta (balde) con líquido.
function Cubeta({ x, y, s = 1, liquido = '#9fd8ff', nivel = 0.6, color = '#ff6b5a' }) {
  const top = -150, bot = 150;
  const yl = klerp(bot - 10, top + 20, nivel);
  const ancho = (yy) => klerp(190, 150, (yy - top) / (bot - top));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -200 ${top} Q 0 ${top - 150} 200 ${top}`} fill="none" stroke={KC.ink} strokeWidth={9} />
    <path d={`M -190 ${top} L 190 ${top} L 150 ${bot} L -150 ${bot} Z`} fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={`M ${-ancho(yl) + 8} ${yl} L ${ancho(yl) - 8} ${yl} L 146 ${bot - 4} L -146 ${bot - 4} Z`} fill={liquido} opacity={0.9} />
    <ellipse cx={0} cy={top} rx={190} ry={30} fill="#3b2a25" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={top + 4} rx={170} ry={20} fill={liquido} />
  </g>;
}
// Nube de gas que crece y se mece. f = 0..1 tamaño/opacidad.
function Nube({ T, x, y, f = 1, r = 160, color = '#c8e65a', seed = 3, n = 9 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  const bs = Array.from({ length: n }, () => [R() * 2 - 1, R() * 2 - 1, 0.5 + R() * 0.6, R() * 6]);
  return <g opacity={0.82 * Math.min(1, f * 1.5)}>
    {bs.map(([u, v, k, ph], i) => <circle key={i} cx={x + u * r * f + Math.sin(T * 0.9 + ph) * 18} cy={y + v * r * 0.6 * f - (T * 12 % 30)} r={r * 0.55 * k * f} fill={color} stroke="rgba(0,0,0,.25)" strokeWidth={4} />)}
  </g>;
}
// Átomo esquemático (círculo con letra).
function Atomo({ x, y, r = 40, color = KC.mint, letra = '', tam }) {
  return <g><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, r / 8)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#fff" opacity={0.45} />
    {letra && <text x={x} y={y + (tam || r * 0.8) * 0.36} textAnchor="middle" style={{ font:`700 ${tam || r * 0.8}px ${KF.mono}` }} fill={KC.ink}>{letra}</text>}</g>;
}
// Molécula: atomos = [[dx, dy, r, color, letra]], enlaces = [[i, j]]. rot en grados.
function Molecula({ x, y, s = 1, rot = 0, atomos = [], enlaces = [], o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {enlaces.map(([i, j], k) => <line key={k} x1={atomos[i][0]} y1={atomos[i][1]} x2={atomos[j][0]} y2={atomos[j][1]} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />)}
    {atomos.map(([dx, dy, r, c, l], i) => <Atomo key={i} x={dx} y={dy} r={r} color={c} letra={l} />)}
  </g>;
}
// Colores de átomos (convención CPK simplificada).
const QA = { H: '#ffffff', O: '#ff3b2f', C: '#3a3a3a', N: '#2346ff', Cl: '#b6e33a', Na: '#b18cff', S: '#ffe11a', Ca: '#d9d2c5' };
// Moléculas listas
const MOL = {
  agua: { atomos: [[0, 0, 34, QA.O, 'O'], [-40, 30, 22, QA.H, 'H'], [40, 30, 22, QA.H, 'H']], enlaces: [[0, 1], [0, 2]] },
  cl2: { atomos: [[-30, 0, 38, QA.Cl, 'Cl'], [30, 0, 38, QA.Cl, 'Cl']], enlaces: [[0, 1]] },
  hipoclorito: { atomos: [[-26, 0, 38, QA.Cl, 'Cl'], [32, 0, 34, QA.O, 'O']], enlaces: [[0, 1]] },
  cloramina: { atomos: [[0, 0, 34, QA.N, 'N'], [56, 0, 38, QA.Cl, 'Cl'], [-34, -32, 22, QA.H, 'H'], [-34, 32, 22, QA.H, 'H']], enlaces: [[0, 1], [0, 2], [0, 3]] },
  co2: { atomos: [[0, 0, 34, QA.C, 'C'], [-60, 0, 32, QA.O, 'O'], [60, 0, 32, QA.O, 'O']], enlaces: [[0, 1], [0, 2]] },
  o2: { atomos: [[-28, 0, 34, QA.O, 'O'], [28, 0, 34, QA.O, 'O']], enlaces: [[0, 1]] },
  h2o2: { atomos: [[-30, 0, 32, QA.O, 'O'], [30, 0, 32, QA.O, 'O'], [-62, 26, 20, QA.H, 'H'], [62, -26, 20, QA.H, 'H']], enlaces: [[0, 1], [0, 2], [1, 3]] },
};
function Mol({ tipo, ...p }) { return <Molecula {...MOL[tipo]} {...p} />; }
// Burbujas que suben dentro de un rectángulo (x, y = esquina sup. izq.). f = intensidad 0..1.
function Burbujas({ T, x, y, w, h, n = 24, f = 1, color = 'rgba(255,255,255,.75)', vel = 160, seed = 7, rmax = 14 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const bx = R() * w, ph = R() * 10, r = 4 + R() * rmax, v = vel * (0.6 + R() * 0.8);
    if (i / n > f) return null;
    const yy = h - ((T * v + ph * 100) % h);
    return <circle key={i} cx={x + bx + Math.sin(T * 4 + ph) * 6} cy={y + yy} r={r} fill="none" stroke={color} strokeWidth={3} />; })}</g>;
}
// Vaso de precipitados con líquido. x, y = centro de la base.
function VasoLab({ x, y, s = 1, liquido = '#9fd8ff', nivel = 0.6, ancho = 220, alto = 300, marcas = true, children }) {
  const top = -alto, yl = -alto * nivel;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-ancho / 2} y={yl} width={ancho} height={-yl} rx={10} fill={liquido} opacity={0.85} />
    {children}
    <path d={`M ${-ancho / 2 - 14} ${top} L ${-ancho / 2} ${top + 10} L ${-ancho / 2} ${-8} Q ${-ancho / 2} 0 ${-ancho / 2 + 10} 0 L ${ancho / 2 - 10} 0 Q ${ancho / 2} 0 ${ancho / 2} -8 L ${ancho / 2} ${top}`} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {marcas && [0.25, 0.5, 0.75].map((m) => <line key={m} x1={-ancho / 2 + 8} x2={-ancho / 2 + 40} y1={-alto * m} y2={-alto * m} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Llama de estufa (fuego azul).
function Llama({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[-60, -30, 0, 30, 60].map((dx, i) => { const h = 50 + Math.sin(T * 14 + i) * 10; return <path key={i} d={`M ${dx - 12} 0 Q ${dx} ${-h * 1.2} ${dx + 12} 0 Z`} fill={i % 2 ? '#5fc6ff' : '#2346ff'} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Personita esquemática (para conteos "35 de cada 100").
function Personita({ x, y, s = 1, color = KC.yellow, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={0} cy={-34} r={16} fill={color} stroke={KC.ink} strokeWidth={4} />
    <path d="M -22 20 Q -22 -14 0 -14 Q 22 -14 22 20 Z" fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Casita esquemática.
function Casita({ x, y, s = 1, color = KC.orange, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -30 0 L 0 -26 L 30 0 L 30 30 L -30 30 Z" fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <rect x={-8} y={10} width={16} height={20} fill={KC.ink} />
  </g>;
}
// Palomita o tache grande.
function Marca({ x, y, ok = true, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.5, 1, o)})`} opacity={o}>
    <circle r={70} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={8} />
    {ok ? <path d="M -34 0 L -10 26 L 36 -26" stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -28 -28 L 28 28 M 28 -28 L -28 28" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />}
  </g>;
}
// Texto onomatopeya que brinca ("¡cof!", "¡pss!").
function Onomato({ T, at, until, x, y, texto, color = KC.yellow, tam = 90, rot = -8 }) {
  if (T < at || T > until) return null;
  const e = kprog(T, at, at + 0.3, kEase.rebote), o = 1 - kprog(T, until - 0.25, until);
  return <text x={x} y={y} textAnchor="middle" transform={`rotate(${rot} ${x} ${y}) translate(${x * (1 - e)} ${y * (1 - e)}) scale(${e})`} opacity={o}
    style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{texto}</text>;
}
// Cuadrícula de 100 íconos (10 × 10) donde los primeros `k` se encienden escalonados desde `at`.
function Cien({ T, at, k, x = 120, y = 560, paso = 84, icono = 'persona', on = KC.yellow, off = 'rgba(255,255,255,.18)', dt = 0.025 }) {
  const out = [];
  for (let i = 0; i < 100; i++) {
    const c = i % 10, r = Math.floor(i / 10), cx = x + c * paso, cy = y + r * paso;
    const lit = i < k && T >= at + i * dt;
    const s = lit ? klerp(1.35, 1, kprog(T, at + i * dt, at + i * dt + 0.25, kEase.sale)) : 1;
    out.push(icono === 'casa' ? <Casita key={i} x={cx} y={cy} s={0.9 * s} color={lit ? on : off} />
      : <Personita key={i} x={cx} y={cy + 10} s={0.95 * s} color={lit ? on : off} />);
  }
  return <g>{out}</g>;
}

Object.assign(window, { SvgCapa, Botella, Chorro, Cubeta, Nube, Atomo, Molecula, QA, MOL, Mol, Burbujas, VasoLab, Llama, Personita, Casita, Marca, Onomato, Cien });
