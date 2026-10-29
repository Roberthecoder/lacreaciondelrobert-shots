// Shot Químico #45 · La punta de tu lápiz no es plomo: es el mismo carbono que un diamante — NARRADO (N1 por dentro + toque N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (átomos como bolitas, distancias no a escala).
const GRAF = '#3c3f46', MADERA = '#f2c48d', DIAM = '#bfeaff', CINTA = 'rgba(255,240,190,.72)';
const AT_C = '#9aa3b3', ENL_C = '#d4dbe8';

// ---------- lápiz (punta en 0,0; el cuerpo sube por -y) ----------
function Lapiz({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -52 -150 L 52 -150 L 16 -48 L -16 -48 Z" fill={MADERA} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -16 -48 L 16 -48 L 0 0 Z" fill={GRAF} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -52 -150 Q -35 -170 -17 -150 Q 0 -170 17 -150 Q 35 -170 52 -150 L 52 -760 L -52 -760 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -17 -158 L -17 -760 M 17 -158 L 17 -760" stroke="#d9a800" strokeWidth={6} />
    <rect x={-56} y={-835} width={112} height={78} fill="#c9ccd2" stroke={KC.ink} strokeWidth={7} />
    <path d="M -56 -812 L 56 -812 M -56 -784 L 56 -784" stroke="#8b9099" strokeWidth={5} />
    <rect x={-50} y={-915} width={100} height={84} rx={18} fill="#ff8fb1" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Hoja de papel con renglones y el trazo gris que va escribiendo (w = 0..1). Devuelve también la punta del trazo.
const LINEA = (u) => [210 + u * 470, 960 + Math.sin(u * 17) * 26 - u * 20];
function Papel({ w = 1 }) {
  const n = Math.max(2, Math.round(60 * w)), pts = Array.from({ length: n }, (_, i) => LINEA((i / (n - 1)) * w));
  return <g>
    <g transform="rotate(-4 380 920)">
      <rect x={120} y={660} width={640} height={500} rx={10} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
      {[760, 840, 920, 1000, 1080].map((yy) => <line key={yy} x1={140} x2={740} y1={yy} y2={yy} stroke="#9fd0ff" strokeWidth={3} />)}
      <line x1={200} x2={200} y1={665} y2={1155} stroke="#ff9aa8" strokeWidth={3} />
    </g>
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#55585f" strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
  </g>;
}
// Diamante tallado (brillante visto de lado) con destellos.
function Diamante({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  const br = 0.5 + 0.5 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, o)})`} opacity={o}>
    <path d="M -150 -40 L -90 -110 L 90 -110 L 150 -40 L 0 150 Z" fill={DIAM} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 -40 L 150 -40 M -90 -110 L -50 -40 L 0 -110 L 50 -40 L 90 -110 M -50 -40 L 0 150 L 50 -40" fill="none" stroke="#5aa9d6" strokeWidth={5} strokeLinejoin="round" />
    <path d="M -90 -110 L -50 -40 L -150 -40 Z" fill="#fff" opacity={0.55} />
    {[[-110, -150, 1], [130, -120, 0.7], [160, 40, 0.8]].map(([dx, dy, k], i) => {
      const r = (14 + 22 * Math.abs(Math.sin(T * 3 + i * 2))) * k;
      return <path key={i} d={`M ${dx} ${dy - r} L ${dx + r * 0.25} ${dy - r * 0.25} L ${dx + r} ${dy} L ${dx + r * 0.25} ${dy + r * 0.25} L ${dx} ${dy + r} L ${dx - r * 0.25} ${dy + r * 0.25} L ${dx - r} ${dy} L ${dx - r * 0.25} ${dy - r * 0.25} Z`} fill="#fff" opacity={0.6 + 0.4 * br} />;
    })}
  </g>;
}

// ---------- hoja de hexágonos (grafeno / capa de grafito) ----------
const _hojas = {};
function redPanal(b, W, H) {
  const k = `${b}|${W}|${H}`; if (_hojas[k]) return _hojas[k];
  const at = [], s3 = Math.sqrt(3);
  for (let m = -20; m <= 20; m++) for (let n = -20; n <= 20; n++) {
    const ax = n * s3 * b + m * s3 / 2 * b, ay = m * 1.5 * b;
    for (const [px, py] of [[ax, ay], [ax, ay + b]]) if (Math.abs(px) <= W && Math.abs(py) <= H) at.push([px, py]);
  }
  const en = [];
  for (let i = 0; i < at.length; i++) for (let j = i + 1; j < at.length; j++) { const d = Math.hypot(at[i][0] - at[j][0], at[i][1] - at[j][1]); if (Math.abs(d - b) < 0.5) en.push([i, j]); }
  return (_hojas[k] = { at, en });
}
// cx, cy = centro en pantalla; tilt aplana la hoja (vista en perspectiva); brillo 0..1 la ilumina en dorado.
function Hoja({ cx, cy, W = 300, H = 230, b = 40, tilt = 0.42, o = 1, brillo = 0, rA = 9, sx = 1 }) {
  if (o <= 0) return null;
  const { at, en } = redPanal(b, W, H);
  const P = ([px, py]) => [cx + px * sx, cy + py * tilt];
  const enl = brillo > 0 ? mixHex('#d4dbe8', '#ffd45a', brillo) : ENL_C, atm = brillo > 0 ? mixHex('#9aa3b3', '#ffc23a', brillo) : AT_C;
  return <g opacity={o}>
    {en.map(([i, j], k) => { const [x1, y1] = P(at[i]), [x2, y2] = P(at[j]); return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={enl} strokeWidth={4} />; })}
    {at.map((p, k) => { const [x, y] = P(p); return <circle key={k} cx={x} cy={y} r={rA} fill={atm} stroke="#1c2230" strokeWidth={2.5} />; })}
  </g>;
}
// Pila de hojas (de abajo hacia arriba). dx(i) corre cada hoja; aparece(i) 0..1.
function Pila({ cx, base, gap = 100, n = 5, W = 300, H = 230, dx = () => 0, aparece = () => 1, debiles = 0, T = 0 }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = aparece(i); if (a <= 0) continue;
    const cy = base - i * gap - (1 - a) * 120;
    if (i > 0 && debiles > 0) {
      out.push(<g key={'d' + i} opacity={debiles * (0.55 + 0.25 * Math.sin(T * 4 + i))}>{[-170, -40, 90, 210].map((ox) =>
        <line key={ox} x1={cx + ox + dx(i - 1)} y1={base - (i - 1) * gap} x2={cx + ox + dx(i)} y2={cy} stroke="#7fd6ff" strokeWidth={4} strokeDasharray="8 10" />)}</g>);
    }
    out.push(<Hoja key={i} cx={cx + dx(i)} cy={cy} W={W} H={H} o={a} />);
  }
  return <g>{out}</g>;
}

// ---------- red del diamante (cúbica de diamante, 2×2×2 celdas) ----------
let _diam = null;
function redDiamante() {
  if (_diam) return _diam;
  const base = [[0, 0, 0], [0, .5, .5], [.5, 0, .5], [.5, .5, 0]], at = [];
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) for (const p of base) for (const off of [0, .25]) {
    const q = [i + p[0] + off, j + p[1] + off, k + p[2] + off];
    if (q.every((v) => v <= 2.001) && !at.some((a) => Math.hypot(a[0] - q[0], a[1] - q[1], a[2] - q[2]) < 0.01)) at.push(q);
  }
  const en = [], d0 = Math.sqrt(3) / 4;
  for (let i = 0; i < at.length; i++) for (let j = i + 1; j < at.length; j++) if (Math.abs(Math.hypot(at[i][0] - at[j][0], at[i][1] - at[j][1], at[i][2] - at[j][2]) - d0) < 0.01) en.push([i, j]);
  // quitar átomos sueltos (sin enlaces)
  const usa = new Set(en.flat());
  const idx = at.map((_, i) => i).filter((i) => usa.has(i)), mapa = {}; idx.forEach((v, k) => (mapa[v] = k));
  const at2 = idx.map((i) => at[i]), en2 = en.map(([i, j]) => [mapa[i], mapa[j]]);
  const centro = at2.findIndex((a) => Math.hypot(a[0] - 1, a[1] - 1, a[2] - 1) < 0.01);
  const vec = new Set(); en2.forEach(([i, j]) => { if (i === centro) vec.add(j); if (j === centro) vec.add(i); });
  return (_diam = { at: at2, en: en2, centro, vec });
}
function RedDiamante({ T, cx, cy, S = 180, ang = 0, tiltG = 22, brillo = 0, o = 1 }) {
  const { at, en, centro, vec } = redDiamante();
  const ca = Math.cos(ang), sa = Math.sin(ang), t = tiltG * Math.PI / 180, ct = Math.cos(t), st = Math.sin(t);
  const P = at.map(([x, y, z]) => { x -= 1; y -= 1; z -= 1; const x1 = x * ca + z * sa, z1 = -x * sa + z * ca; const y2 = y * ct - z1 * st, z2 = y * st + z1 * ct; return [cx + x1 * S, cy + y2 * S, z2]; });
  const esH = (i) => i === centro || vec.has(i);
  const enl = en.map(([i, j], k) => ({ k, i, j, z: (P[i][2] + P[j][2]) / 2, h: (i === centro || j === centro) })).sort((a, b) => a.z - b.z);
  const ats = at.map((_, i) => i).sort((a, b) => P[a][2] - P[b][2]);
  return <g opacity={o}>
    {enl.map(({ k, i, j, h }) => <line key={k} x1={P[i][0]} y1={P[i][1]} x2={P[j][0]} y2={P[j][1]} stroke={h && brillo > 0 ? mixHex('#d4dbe8', '#ffd45a', brillo) : ENL_C} strokeWidth={h && brillo > 0 ? 9 : 5} opacity={h ? 1 : 0.55 + 0.25 * (1 + P[i][2])} />)}
    {ats.map((i) => { const d = 0.75 + 0.25 * P[i][2]; const h = esH(i) && brillo > 0;
      return <circle key={i} cx={P[i][0]} cy={P[i][1]} r={(h ? 20 : 15) * d} fill={h ? mixHex(AT_C, i === centro ? '#ff8a1f' : '#ffc23a', brillo) : AT_C} stroke="#1c2230" strokeWidth={3} opacity={0.6 + 0.4 * d} />; })}
  </g>;
}

// ---------- otras piezas ----------
function Seccion({ T, x, y, nucleo = 1 }) {
  const hex = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${x + Math.cos(a) * 250},${y + Math.sin(a) * 250}`; }).join(' ');
  return <g>
    <polygon points={hex} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle cx={x} cy={y} r={190} fill={MADERA} stroke={KC.ink} strokeWidth={7} />
    {[150, 115].map((r) => <circle key={r} cx={x} cy={y} r={r} fill="none" stroke="#d9a46a" strokeWidth={4} />)}
    <circle cx={x} cy={y} r={75} fill={nucleo > 0 ? GRAF : '#e6b47c'} stroke={KC.ink} strokeWidth={6} opacity={1} />
    {nucleo > 0 && <circle cx={x - 22} cy={y - 24} r={20} fill="#fff" opacity={0.25 * nucleo} />}
  </g>;
}
function Montoncito({ x, y, color, borde = KC.ink, f = 1, seed = 3, brillo = false }) {
  if (f <= 0) return null;
  const R = krng(seed);
  return <g opacity={Math.min(1, f * 1.4)}>{Array.from({ length: 16 }, (_, i) => { const a = R() * Math.PI, d = R() * 110 * f, r = 18 + R() * 16;
    const px = x + Math.cos(a) * d * 1.3 - 0, py = y - Math.sin(a) * d * 0.55;
    return brillo ? <path key={i} d={`M ${px - r} ${py} L ${px - r * 0.2} ${py - r * 0.7} L ${px + r} ${py - r * 0.2} L ${px + r * 0.3} ${py + r * 0.6} Z`} fill={color} stroke={borde} strokeWidth={4} />
      : <circle key={i} cx={px} cy={py} r={r} fill={color} stroke={borde} strokeWidth={4} />; })}</g>;
}
function Teselita({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-80} width={160} height={160} rx={14} fill="#c9ccd2" stroke={KC.ink} strokeWidth={8} />
    <text x={-60} y={-44} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>82</text>
    <text x={0} y={46} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>Pb</text>
  </g>;
}
function Disco({ T, x, y, r = 220 }) {
  const g = (T * 900) % 360;
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${g})`}>
      <circle r={r} fill="#d6dae2" stroke={KC.ink} strokeWidth={9} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={-22} y={-r - 16} width={44} height={34} rx={6} fill={DIAM} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 22.5})`} />)}
      {[0, 120, 240].map((a) => <rect key={a} x={-8} y={-r * 0.7} width={16} height={r * 0.45} rx={8} fill="#aab0bb" transform={`rotate(${a})`} />)}
      <circle r={48} fill="#8b9099" stroke={KC.ink} strokeWidth={7} />
    </g>
  </g>;
}
function Roca({ x, y, corte = 0 }) {
  return <g>
    <path d={`M ${x - 330} ${y + 190} L ${x - 300} ${y - 60} L ${x - 140} ${y - 140} L ${x + 120} ${y - 120} L ${x + 300} ${y - 40} L ${x + 330} ${y + 190} Z`} fill="#8e8a84" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M ${x - 200} ${y - 20} l 60 30 M ${x + 160} ${y + 40} l 50 -20 M ${x - 60} ${y + 120} l 40 10`} stroke="#6c6862" strokeWidth={8} strokeLinecap="round" />
    {corte > 0 && <rect x={x - 14} y={y - 130} width={28} height={200 * corte} fill="#3d3a36" />}
  </g>;
}
function Chispas({ T, x, y, on = 1 }) {
  if (on <= 0) return null;
  const R = krng(11);
  return <g>{Array.from({ length: 22 }, (_, i) => { const a = -Math.PI * (0.15 + R() * 0.7), v = 160 + R() * 260, ph = (T * 2.2 + R()) % 1;
    const px = x + Math.cos(a) * v * ph, py = y + Math.sin(a) * v * ph + 300 * ph * ph;
    return <line key={i} x1={px} y1={py} x2={px - Math.cos(a) * 26} y2={py - Math.sin(a) * 26} stroke={i % 2 ? KC.yellow : KC.orange} strokeWidth={6} strokeLinecap="round" opacity={(1 - ph) * on} />; })}</g>;
}
function Grafito({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -190 60 L -150 -70 L -20 -110 L 160 -80 L 200 40 L 120 110 L -110 110 Z" fill={GRAF} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 -70 L -60 -10 L 160 -80 M -60 -10 L -110 110 M -60 -10 L 120 110" stroke="#5c616b" strokeWidth={5} fill="none" />
    <path d="M -130 -60 L -30 -95 L 40 -88 L -60 -30 Z" fill="#9aa0aa" opacity={0.6} />
  </g>;
}
function Medalla({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.3, 1, o)})`} opacity={o}>
    <path d="M -60 -190 L -20 -80 L 20 -80 L 60 -190" fill="none" stroke="#2346ff" strokeWidth={30} />
    <circle r={110} fill="#E8A62A" stroke={KC.ink} strokeWidth={9} />
    <circle r={86} fill="none" stroke="#f9d27a" strokeWidth={5} />
    <text y={-10} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text y={38} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>FÍSICA</text>
    <text y={70} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>2010</text>
  </g>;
}
// Barra de escala fija (texto propio: el dibujo es esquemático).
function BarraEscala({ T, at, until, texto, largo, x = 60, y = 1430 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, opacity:e.o, color:KC.texto, font:`700 28px ${KF.mono}`, textShadow:KSOMBRA }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    <div style={{ width:largo, height:8, background:KC.texto, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}
function Noche() { return <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1b2742 0%, ${KC.noche} 60%, #070a12 100%)` }}></div>; }

function LapizShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Mina, Ca: CUES.Capas, De: CUES.Desliza, Di: CUES.Diamante, Du: CUES.Duro, Pr: CUES.Pregunta, Es: CUES.Estudio, Gr: CUES.Grafeno, Cu: CUES.Curioso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el lápiz escribe desde el cuadro 0
  const w0 = klerp(0.06, 1, kprog(T, K.G, K.G + 4.2, kEase.suave));
  const [tx0, ty0] = LINEA(w0);
  const diam0 = kprog(T, K.G + 2.2, K.G + 2.7, kEase.rebote);
  // mina
  const caePb = kprog(T, K.Mi + 0.5, K.Mi + 1.1, kEase.rebote), salePb = kprog(T, K.Mi + 2.4, K.Mi + 3.2, kEase.suave);
  const parte = kprog(T, K.Mi + 1.0, K.Mi + 2.0, kEase.sale);
  // desliza
  const slide = kprog(T, K.De + 0.8, K.De + 3.0, kEase.suave), suelta = kprog(T, K.De + 3.4, K.De + 5.2, kEase.suave);
  // estudio: la cinta pega y despega
  const ciclo = Math.max(0, T - (K.Es + 1.0)), veces = Math.min(20, Math.floor(ciclo / 0.28) + (T > K.Es + 1.0 ? 1 : 0));
  const pres = T > K.Es + 1.0 && veces < 20 ? Math.max(0, Math.sin((ciclo / 0.28) * Math.PI)) : 0;
  const mitadCu = K.Cu + 3.4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el lápiz escribe; aparece el diamante */}
      <Escena T={T} a={K.G} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Papel w={w0} />
          <Lapiz x={tx0} y={ty0} s={0.78} rot={-20 + Math.sin(T * 9) * 1.5} />
          <Diamante T={T} x={860} y={1010} s={0.85} o={diam0} />
          {diam0 > 0.5 && <text x={760} y={860} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.G + 2.6, K.G + 3.0)}>=</text>}
        </SvgCapa>
      </Escena>
      {/* 1 · la mina: grafito + arcilla, nada de plomo */}
      <Escena T={T} a={K.Mi} b={K.Ca} zoom={0.12} origen="37% 43%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Seccion T={T} x={400} y={800} nucleo={1 - parte} />
          <Montoncito x={klerp(400, 230, parte)} y={klerp(800, 1130, parte)} color={GRAF} f={parte} seed={4} brillo borde="#0d0f12" />
          <Montoncito x={klerp(400, 590, parte)} y={klerp(800, 1130, parte)} color="#d9a77a" f={parte} seed={9} />
          {salePb < 1 && <Teselita x={klerp(850, 1320, salePb)} y={klerp(-120, 960, caePb) - salePb * 200} rot={salePb * 140 + (1 - caePb) * -20} s={0.95} />}
          <Marca x={850} y={960} ok={false} s={0.9} o={kprog(T, K.Mi + 1.6, K.Mi + 1.9) * (1 - salePb)} />
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: hojas de hexágonos apiladas */}
      <Escena T={T} a={K.Ca} b={K.De}>
        <Noche />
        <SvgCapa>
          <Pila T={T} cx={560} base={1150} gap={130} n={5} H={180} aparece={(i) => kprog(T, K.Ca + 0.3 + i * 0.75, K.Ca + 0.9 + i * 0.75, kEase.sale)} />
          {T > K.Ca + 4.0 && <g opacity={kprog(T, K.Ca + 4.0, K.Ca + 4.4)}>
            <path d="M 905 630 L 925 630 L 925 760 L 905 760" fill="none" stroke={KC.gold2} strokeWidth={6} />
            <text x={1000} y={600} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.gold2}>≈ 0.33 nm</text>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 3 · se resbalan como baraja y una hoja se queda en el papel */}
      <Escena T={T} a={K.De} b={K.Di} zoom={0.03}>
        <Noche />
        <SvgCapa>
          <rect x={90} y={1140} width={900} height={74} rx={8} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.De + 2.6, K.De + 3.1)} />
          <Pila T={T} cx={520} base={1000} gap={120} H={180} n={suelta > 0 ? 3 : 4} debiles={1 - slide * 0.6} dx={(i) => slide * i * 60 + Math.sin(T * 2 + i) * 4} />
          {suelta > 0 && <Hoja cx={klerp(520 + 180, 540, suelta)} cy={klerp(640, 1176, suelta)} W={300} H={180} tilt={klerp(0.42, 0.14, suelta)} />}
        </SvgCapa>
      </Escena>
      {/* 4 · diamante: cada carbono con 4 vecinos, red 3D */}
      <Escena T={T} a={K.Di} b={K.Du}>
        <Noche />
        <SvgCapa>
          <RedDiamante T={T} cx={560} cy={860} S={235} ang={0.5 + (T - K.Di) * 0.35} brillo={kprog(T, K.Di + 1.2, K.Di + 1.8)} />
        </SvgCapa>
      </Escena>
      {/* 5 · durísimo: disco con diamantes corta roca */}
      <Escena T={T} a={K.Du} b={K.Pr} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Roca x={560} y={1000} corte={kprog(T, K.Du + 0.4, K.Du + 2.8)} />
          <Disco T={T} x={560} y={klerp(620, 700, kprog(T, K.Du + 0.2, K.Du + 2.8))} r={210} />
          <Chispas T={T} x={560} y={870} on={kprog(T, K.Du + 0.3, K.Du + 0.6)} />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta: ¿una sola hoja? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <Noche />
        <SvgCapa>
          <Pila T={T} cx={290} base={1100} gap={80} n={3} W={220} H={180} />
          <Hoja cx={290} cy={klerp(860, 760, kprog(T, K.Pr + 0.3, K.Pr + 1.4, kEase.sale))} W={220} H={180} brillo={0.5 + 0.5 * Math.sin(T * 5)} />
          <text x={290} y={620} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 520)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · 2004, Manchester: cinta adhesiva una y otra vez */}
      <Escena T={T} a={K.Es} b={K.Gr} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Grafito x={540} y={1090} s={1.1} />
          <g transform={`translate(0 ${-pres * -120})`}>
            <rect x={250} y={840} width={580} height={110} rx={6} fill={CINTA} stroke={KC.ink} strokeWidth={6} transform={`rotate(${-pres * 0 + Math.sin(T * 3) * 1.5} 540 895)`} />
            <rect x={400} y={865} width={280} height={60} rx={20} fill="#55585f" opacity={0.85 * Math.pow(0.86, veces)} />
          </g>
        </SvgCapa>
        {T > K.Es + 1.0 && <div style={{ position:'absolute', left:880, top:780, transform:'translate(-50%,-50%)', zIndex:41, font:`400 110px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>×{veces}</div>}
      </Escena>
      {/* 8 · grafeno: una sola capa, Nobel 2010 */}
      <Escena T={T} a={K.Gr} b={K.Cu}>
        <Noche />
        <SvgCapa>
          <Hoja cx={540} cy={820 + Math.sin(T * 1.6) * 10} W={380} H={300} tilt={0.42 + Math.sin(T * 0.8) * 0.05} brillo={0.25} />
          <Medalla x={830} y={1090} s={0.9} o={kprog(T, K.Gr + 2.4, K.Gr + 2.9, kEase.rebote)} />
        </SvgCapa>
      </Escena>
      {/* 9 · 1 mm = 3 millones de capas; quizá dejaste una en el papel */}
      <Escena T={T} a={K.Cu} b={mitadCu}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <rect x={150} y={600} width={220} height={520} fill={GRAF} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 52 }, (_, i) => <line key={i} x1={154} x2={366} y1={610 + i * 10} y2={610 + i * 10} stroke="#6b707a" strokeWidth={2} opacity={kprog(T, K.Cu + 0.2 + i * 0.02, K.Cu + 0.4 + i * 0.02)} />)}
          <path d="M 120 600 L 100 600 L 100 1120 L 120 1120" fill="none" stroke={KC.ink} strokeWidth={6} />
          <text x={80} y={870} textAnchor="middle" transform="rotate(-90 80 870)" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>1 mm</text>
        </SvgCapa>
        <Contador T={T} at={K.Cu + 0.5} hasta={3000000} dur={1.8} x={700} y={820} tam={84} color={KC.texto} />
        {T > K.Cu + 0.5 && <div style={{ position:'absolute', left:700, top:930, transform:'translate(-50%,-50%)', zIndex:41, whiteSpace:'nowrap', font:`900 52px ${KF.texto}`, color:KC.ink }}>capas de carbono</div>}
      </Escena>
      <Escena T={T} a={mitadCu} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Papel w={1} /></SvgCapa>
      </Escena>
      {/* 10 · cierre: el lápiz del inicio, ahora por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Papel w={1} />
          <Lapiz x={LINEA(1)[0]} y={LINEA(1)[1]} s={0.78} rot={-20} />
          <Diamante T={T} x={860} y={1010} s={0.85} />
        </SvgCapa>
      </Escena>

      {/* lupas */}
      <Lupa T={T} at={mitadCu + 0.3} until={K.Ci - 0.3} x={430} y={600} r={190} fx={LINEA(0.55)[0]} fy={LINEA(0.55)[1]} tinte={KC.gold2} etiqueta="POR DENTRO · ¿1 capa?"
        interior={(TT, r) => <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#0d1424" /><Hoja cx={r} cy={r} W={150} H={120} b={30} rA={7} tilt={0.5} /></svg>} />
      <Lupa T={T} at={K.Ci + 0.6} until={K.Ou} x={330} y={560} r={170} fx={LINEA(1)[0] - 6} fy={LINEA(1)[1] - 20} tinte={KC.cyan} etiqueta="POR DENTRO · grafito"
        interior={(TT, r) => <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#0d1424" /><Pila T={TT} cx={r} base={r + 95} gap={62} n={4} W={130} H={90} /></svg>} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.G + 2.6} texto="plomo" x={540} y={1500} tam={52} />
      <Chip T={T} at={K.G + 2.8} until={K.Mi - 0.2} texto="grafito = diamante = C" y={1500} tam={46} borde={KC.ink} />
      <Etq T={T} at={K.G + 2.9} until={K.Mi - 0.2} x={1040} y={1170} lado="izq" texto="diamante" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mi + 1.9} until={K.Ca - 0.2} x={40} y={1010} texto="grafito" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Mi + 2.1} until={K.Ca - 0.2} x={1000} y={1010} lado="izq" texto="arcilla" tam={36} color={KC.texto} />
      <Chip T={T} at={K.Mi + 0.2} until={K.Mi + 1.5} texto="corte de la punta" y={1500} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Mi + 2.2} until={K.Ca - 0.2} texto="la mina: grafito + arcilla" y={1500} tam={42} borde={KC.yellow} />
      <BarraEscala T={T} at={K.Mi + 0.3} until={K.Mi + 1.4} texto="1 mm" largo={75} x={60} y={1640} />
      <Chip T={T} at={K.Ca + 0.6} until={K.De - 0.2} texto="carbono en hojas de hexágonos" x={620} y={470} tam={36} borde={KC.gold2} />
      <Chip T={T} at={K.De + 0.6} until={K.De + 3.2} texto="unión débil entre hojas" x={620} y={470} tam={38} borde="#7fd6ff" />
      <Chip T={T} at={K.De + 3.4} until={K.Di - 0.2} texto="una hoja queda en el papel" x={620} y={470} tam={36} borde="#7fd6ff" />
      <Chip T={T} at={K.Di + 0.4} until={K.Du - 0.2} texto="diamante: red en 3D" x={620} y={470} tam={40} borde={DIAM} />
      <Chip T={T} at={K.Di + 1.6} until={K.Du - 0.2} texto="cada C se une a 4" y={1500} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Du + 0.4} until={K.Pr - 0.2} texto="disco con diamantes" y={1500} tam={42} borde={KC.ink} />
      <SvgCapa z={41}><Onomato T={T} at={K.Du + 0.6} until={K.Pr - 0.2} x={850} y={760} texto="¡zzzz!" color={KC.yellow} tam={90} /></SvgCapa>
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.6} anio="2004" quien="Geim y Novoselov" revista="Univ. de Manchester · Science" y={560} />
      <Chip T={T} at={K.Es + 3.8} until={K.Gr - 0.2} texto="cinta adhesiva, otra y otra vez" y={1500} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Gr + 0.4} until={K.Cu - 0.2} texto="grafeno · 1 átomo de grosor" x={620} y={470} tam={38} borde={KC.gold2} />
      <Chip T={T} at={K.Gr + 2.6} until={K.Cu - 0.2} texto="Geim y Novoselov · 2010" y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={mitadCu + 0.2} until={K.Ci - 0.2} texto="quizá… una sola capa" y={1500} tam={42} borde={KC.gold2} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="mismo C · otro acomodo" y={1500} tam={44} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="No es plomo: *es carbono.*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.Ca - 0.1} texto="Grafito con arcilla: *cero plomo.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.De - 0.1} texto="Hojas de *hexágonos* apiladas." />
      <Subtitulo T={T} idx={3} at={K.De + 0.1} until={K.Di - 0.1} texto="Se resbalan *como cartas.*" />
      <Subtitulo T={T} idx={4} at={K.Di + 0.1} until={K.Du - 0.1} texto="Cada carbono, *unido a 4.*" />
      <Subtitulo T={T} idx={5} at={K.Du + 0.1} until={K.Pr - 0.1} texto="Por eso *es durísimo.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y *una sola hoja?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Gr - 0.1} texto="2004: *cinta adhesiva.*" />
      <Subtitulo T={T} idx={8} at={K.Gr + 0.1} until={K.Cu - 0.1} texto="Grafeno: *un solo átomo.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="1 mm: *3 millones de capas.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Mismo carbono, *otro acomodo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mina + 0.8, CUES.Capas - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Capas + 2.0, CUES.Desliza - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Desliza + 1.5, CUES.Diamante - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Diamante + 1.0, CUES.Duro + 2.6, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.8, CUES.Grafeno - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Grafeno + 1.5, CUES.Curioso - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Curioso + 2.0, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="45" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LapizApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LapizShot /></CompositionStage></div>;
}
window.LapizApp = LapizApp;
