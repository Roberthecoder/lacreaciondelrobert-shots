// Shot Químico #51 · Ese gel no te lava las manos (gel antibacterial y alcohol) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const PIEL = '#f1b48f', PIEL2 = '#d9906b', GEL = '#bfe9ff', GELB = '#6fb6dc', MUGRE = '#8a5a2b', GRASA = '#ffd25a';
const ETANOL = { atomos: [[-56, 8, 30, QA.C, 'C'], [6, -16, 30, QA.C, 'C'], [66, 8, 28, QA.O, 'O'], [104, -14, 17, QA.H, 'H'],
  [-92, -18, 17, QA.H, 'H'], [-80, 46, 17, QA.H, 'H'], [-50, -36, 17, QA.H, 'H'], [0, -62, 17, QA.H, 'H'], [20, 26, 17, QA.H, 'H']],
  enlaces: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]] };
const METANOL = { atomos: [[-26, 0, 34, QA.C, 'C'], [42, 0, 32, QA.O, 'O'], [82, -26, 19, QA.H, 'H'], [-62, -32, 19, QA.H, 'H'], [-62, 32, 19, QA.H, 'H'], [-26, -52, 19, QA.H, 'H']],
  enlaces: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5]] };
const Etanol = (p) => <Molecula {...ETANOL} {...p} />;

// Mano abierta vista de frente (palma), dedos hacia arriba. Origen = centro de la palma.
function Palma({ x, y, s = 1, rot = 0, espejo = false, mugre = 0, gel = 0, brillo = 0, T = 0 }) {
  const dedos = [[-78, -300, 50], [-24, -335, 52], [32, -318, 52], [86, -256, 46]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s}, ${s})`}>
    <rect x={-108} y={120} width={216} height={700} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <rect x={-60} y={-40} width={58} height={190} rx={29} fill={PIEL} stroke={KC.ink} strokeWidth={9} transform="translate(-118 40) rotate(-38)" />
    {dedos.map(([dx, top, w], i) => <rect key={i} x={dx - w / 2} y={top} width={w} height={-top + 10} rx={w / 2} fill={PIEL} stroke={KC.ink} strokeWidth={9} />)}
    <rect x={-128} y={-95} width={250} height={265} rx={80} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -80 -30 Q -10 10 90 -40" stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -60 120 Q -70 40 -20 -10" stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
    {mugre > 0 && <g opacity={mugre}>
      {[[-60, -40, 34, 20], [40, 60, 42, 24], [70, -60, 24, 16], [-30, 100, 30, 18], [-24, -230, 18, 26], [32, -200, 18, 22]].map(([dx, dy, rx, ry], i) =>
        <ellipse key={i} cx={dx} cy={dy} rx={rx} ry={ry} fill={MUGRE} opacity={0.75} />)}
      {[[0, 10, 70, 40], [-80, 60, 30, 50], [86, -150, 18, 60]].map(([dx, dy, rx, ry], i) =>
        <ellipse key={'g' + i} cx={dx} cy={dy} rx={rx} ry={ry} fill={GRASA} opacity={0.5} stroke="#e0a42a" strokeWidth={3} />)}
    </g>}
    {gel > 0 && <g transform={`translate(0 30) scale(${gel})`}>
      <ellipse rx={74} ry={44} fill={GEL} opacity={0.85} stroke={GELB} strokeWidth={5} />
      <ellipse cx={-24} cy={-14} rx={22} ry={9} fill="#fff" opacity={0.9} />
      <circle cx={30} cy={8} r={6} fill="#fff" opacity={0.7} />
    </g>}
    {brillo > 0 && <g opacity={brillo}>
      {[[-70, -60], [50, 40], [-20, 110], [80, -100], [-40, -200]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={26} ry={9} fill="#fff" opacity={0.75} transform={`rotate(-30 ${dx} ${dy})`} />)}
    </g>}
  </g>;
}
// Botella de gel con dosificador. Origen = centro de la base. p = cuánto está apretado (0..1).
function Dosificador({ x, y, s = 1, p = 0, rot = 0 }) {
  const b = 30 * p;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-12} y={-470 + b} width={24} height={80} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} />
    <rect x={-56} y={-500 + b} width={112} height={40} rx={10} fill="#f6f3ec" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 50 ${-494 + b} L 140 ${-494 + b} Q 150 ${-494 + b} 150 ${-482 + b} L 150 ${-470 + b} L 50 ${-470 + b} Z`} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-50} y={-410} width={100} height={52} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <path d="M -110 -340 Q -110 -362 -88 -362 L 88 -362 Q 110 -362 110 -340 L 110 -20 Q 110 0 88 0 L -88 0 Q -110 0 -110 -20 Z" fill="rgba(220,244,255,.95)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -250 L 100 -250 L 100 -24 Q 100 -8 84 -8 L -84 -8 Q -100 -8 -100 -24 Z" fill={GEL} />
    {[[-60, -200, 10], [40, -150, 7], [-20, -90, 12], [62, -60, 6]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeWidth={3} />)}
    <rect x={-84} y={-230} width={168} height={130} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-168} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.blue}>GEL</text>
    <text x={0} y={-124} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>alcohol</text>
    <rect x={-92} y={-330} width={18} height={300} rx={9} fill="#fff" opacity={0.5} />
  </g>;
}
// Cinta de proteína: plegada (resorte, des = 0) o desplegada (estambre suelto, des = 1).
function Liston({ T, x, y, s = 1, des = 0, color = KC.pink, seed = 1, n = 44 }) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = i * 0.95 + seed;
    const fx = (i - n / 2) * 4.2 + Math.cos(a) * 20, fy = Math.sin(a) * 42 + Math.sin(T * 2 + seed) * 3;
    const ux = (i - n / 2) * 11, uy = Math.sin(i * 0.33 + seed) * 36 + Math.sin(i * 0.12 + seed * 2) * 30 + Math.sin(T * 3 + i * 0.4) * 8 * des;
    pts.push([klerp(fx, ux, des), klerp(fy, uy, des)]);
  }
  const d = 'M ' + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} stroke="#000" strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={13} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Bacteria grande (bacilo) en corte, para fondo noche.
function BacGrande({ x, y, w = 760, h = 300, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 0.8) * 2})`}>
    <path d={`M ${-w / 2 - 10} 0 q -40 ${-30 + Math.sin(T * 7) * 14} -90 0 t -90 0`} stroke="#7fffd4" strokeWidth={6} fill="none" strokeLinecap="round" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill="rgba(47,224,168,.18)" stroke="#7fffd4" strokeWidth={9} />
    <rect x={-w / 2 + 18} y={-h / 2 + 18} width={w - 36} height={h - 36} rx={h / 2 - 18} fill="none" stroke="rgba(127,255,212,.35)" strokeWidth={4} />
  </g>;
}
// Norovirus esquemático (icosaedro sin envoltura).
function Norovirus({ x, y, r = 140, rot = 0, golpe = 0 }) {
  const v = Array.from({ length: 6 }, (_, i) => [Math.cos(i * Math.PI / 3) * r, Math.sin(i * Math.PI / 3) * r]);
  const w = Array.from({ length: 3 }, (_, i) => [Math.cos(i * 2 * Math.PI / 3 + Math.PI / 6) * r * 0.48, Math.sin(i * 2 * Math.PI / 3 + Math.PI / 6) * r * 0.48]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${1 + golpe * 0.05})`}>
    <polygon points={v.map((p) => p.join(',')).join(' ')} fill="#ff8fa3" stroke="#ffd1da" strokeWidth={8} strokeLinejoin="round" />
    <polygon points={w.map((p) => p.join(',')).join(' ')} fill="#ff6b8a" stroke="#ffd1da" strokeWidth={5} strokeLinejoin="round" />
    {v.map((p, i) => <line key={i} x1={p[0]} y1={p[1]} x2={w[Math.floor(((i + 1) % 6) / 2)][0]} y2={w[Math.floor(((i + 1) % 6) / 2)][1]} stroke="#ffd1da" strokeWidth={4} />)}
    {v.map((p, i) => <circle key={'k' + i} cx={p[0]} cy={p[1]} r={12} fill="#ffd1da" />)}
  </g>;
}
// Espora con coraza gruesa (C. difficile, esquemática).
function Espora({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={112} ry={170} fill="#b98a4a" stroke="#f3d9a6" strokeWidth={9} />
    <ellipse rx={92} ry={148} fill="none" stroke="#7a5526" strokeWidth={6} strokeDasharray="18 12" />
    <ellipse rx={64} ry={112} fill="#f6e7c1" stroke="#7a5526" strokeWidth={6} />
    <ellipse cx={-14} cy={-30} rx={18} ry={30} fill="#fff" opacity={0.5} />
  </g>;
}
// Llave de agua (de pared) con chorro.
function Llave({ T, x, y, s = 1, agua = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={150} height={50} rx={10} fill="#c9d1dc" stroke={KC.ink} strokeWidth={7} />
    <path d="M 20 -30 L 70 -30 Q 110 -30 110 10 L 110 50 L 70 50 L 70 20 Q 70 20 60 20 L 20 20 Z" fill="#c9d1dc" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-20} y={-80} width={24} height={52} fill="#c9d1dc" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-96} width={104} height={24} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {agua > 0 && <rect x={76} y={52} width={28} height={150 * agua} rx={12} fill="#7fc8ff" stroke="#2f8fd0" strokeWidth={3} opacity={0.85 + Math.sin(T * 20) * 0.1} />}
  </g>;
}
// Barra de jabón.
function Jabon({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-50} width={180} height={100} rx={36} fill="#ff9ec4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-66} y={-34} width={70} height={16} rx={8} fill="#fff" opacity={0.6} />
    {[[-60, -70, 16], [-20, -84, 11], [30, -72, 14], [70, -88, 9]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy - Math.abs(Math.sin(T * 2 + i)) * 10} r={r} fill="rgba(255,255,255,.8)" stroke="#9ec9e8" strokeWidth={3} />)}
  </g>;
}
// Triángulo de alerta (sin emoji, para que se vea en el render).
function Alerta({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -48 L 46 34 L -46 34 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-5} y={-20} width={10} height={30} rx={4} fill={KC.ink} /><circle cx={0} cy={22} r={6} fill={KC.ink} />
  </g>;
}
// Yema de dedo (para los 10 voluntarios), con puntitos de virus.
function Yema({ x, y, s = 1, virus = 1, seed = 1 }) {
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-34} y={-80} width={68} height={190} rx={34} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    <path d="M -18 -40 Q 0 -54 18 -40 M -22 -22 Q 0 -40 22 -22" stroke={PIEL2} strokeWidth={3} fill="none" />
    {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={(R() - 0.5) * 44} cy={-50 + R() * 50} r={6} fill="#ff4f7a" stroke={KC.ink} strokeWidth={2} opacity={virus} />)}
  </g>;
}
// Barra horizontal "más de la mitad" (con la marca de la mitad).
function BarraMitad({ T, at, until, y = 1470 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.2, at + 1.2, kEase.sale);
  return <div style={{ position:'absolute', left:90, top:y, width:900, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', font:`700 26px ${KF.mono}`, color:KC.ink, marginBottom:10 }}>
      <span>muestras 2020 · FDA</span><span style={{ color:KC.red }}>más de la mitad: tóxicos</span>
    </div>
    <div style={{ position:'relative', height:40, borderRadius:20, background:'rgba(255,255,255,.75)', border:`5px solid ${KC.ink}`, overflow:'hidden' }}>
      <div style={{ width:`${56 * g}%`, height:'100%', background:KC.red }}></div>
      <div style={{ position:'absolute', left:'50%', top:-4, bottom:-4, width:6, background:KC.ink }}></div>
    </div>
    <div style={{ position:'absolute', left:450, top:96, transform:'translateX(-50%)', font:`700 26px ${KF.mono}`, color:KC.ink }}>½</div>
  </div>;
}

function Gel() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, P: CUES.Proteinas, A: CUES.Agua, F: CUES.Frotar, Pr: CUES.Pregunta, N: CUES.No, E: CUES.Estudio, Gr: CUES.Grasa, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.2;
  // gancho: aprieta el dosificador y cae la gota
  const aprieta = T < K.G + 0.3 ? kprog(T, K.G - 0.1, K.G + 0.3, kEase.sale) : 1 - kprog(T, K.G + 0.6, K.G + 0.9);
  const cae = kprog(T, K.G + 0.25, K.G + 0.7, (p) => p * p);
  const gelG = kprog(T, K.G + 0.7, K.G + 0.95, kEase.rebote);
  // proteínas
  const zoomIn = kprog(T, K.P - 0.45, K.P + 0.9, kEase.suave);
  const RP = krng(11);
  const etP = Array.from({ length: 8 }, (_, i) => ({ x0: RP() < 0.5 ? -80 : KW + 80, y0: 620 + RP() * 600, tx: 300 + (i % 3) * 220, ty: 820 + RP() * 120, r: RP() * 360 }));
  // agua
  const desL = 0.22 * kprog(T, K.A + 1.0, K.A + 5.8), desR = kprog(T, K.A + 1.4, K.A + 3.4, kEase.suave);
  const RA = krng(21);
  const molsA = Array.from({ length: 12 }, (_, i) => ({ x: RA(), y: RA(), r: RA() * 360, f: RA() * 6 }));
  // frotar
  const seca = kprog(T, K.F + 0.3, K.F + 3.0);
  // no: rebotes del alcohol
  const rebote = (t0, x0, y0, x1, y1) => { const u = (T - t0) / 0.55; if (u < 0) return null; if (u > 2.2) return null;
    return u <= 1 ? [klerp(x0, x1, u * u), klerp(y0, y1, u * u), u] : [klerp(x1, x0 + (x0 - x1) * 0.2, (u - 1) / 1.2), klerp(y1, y0 - 120, (u - 1) / 1.2), u]; };
  const golpes = [[K.N + 1.2, 80, 1200, 230, 960], [K.N + 1.6, 960, 1200, 700, 1000], [K.N + 2.1, 300, 600, 300, 760], [K.N + 2.5, 1000, 640, 860, 780], [K.N + 2.9, 60, 880, 170, 880], [K.N + 3.3, 1020, 1100, 860, 1000]];
  const golpeV = golpes.filter((g, i) => i % 2 === 0).reduce((a, g) => a + Math.max(0, 1 - Math.abs(T - g[0] - 0.55) * 6), 0);
  // estudio
  const yemas = kprog(T, K.E + 3.2, K.E + 3.8, kEase.sale) * (1 - kprog(T, K.E + 5.0, K.E + 5.5));
  const barras = [['gel 62 % etanol', 0.22, K.E + 5.6, '#ff6b5a', false], ['solo agua', 1, K.E + 7.0, '#7fc8ff', true], ['jabón', 0.87, K.E + 7.7, KC.mint, true]];
  // méxico
  const RM = krng(31);
  const botM = Array.from({ length: 5 }, (_, i) => ({ x: 300 + i * 95 + RM() * 30, y0: 980 + RM() * 100, t0: K.M + 0.6 + i * 0.35 }));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la gota de gel cae en la palma */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Palma x={420} y={1000 + mece(T, 2, 0.3) * 6} s={1.15} gel={gelG} brillo={0} T={T} />
          {cae > 0 && cae < 1 && <path d="M 0 -26 Q 18 0 0 18 Q -18 0 0 -26 Z" transform={`translate(${klerp(385, 420, cae)} ${klerp(225, 1030, cae)}) scale(1.4)`} fill={GEL} stroke={GELB} strokeWidth={4} />}
          {T > K.G + 0.7 && T < K.G + 1.5 && <circle cx={420} cy={1034} r={40 + kprog(T, K.G + 0.7, K.G + 1.3) * 120} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - kprog(T, K.G + 0.7, K.G + 1.3)} />}
          <Dosificador x={250} y={610} s={0.9} p={aprieta} />
          <Onomato T={T} at={K.G + 0.7} until={K.G + 1.7} x={650} y={900} texto="¡plop!" tam={80} color={KC.yellow} />
        </SvgCapa>
      </Escena>
      {/* 1 · al menos 60 % */}
      <Escena T={T} a={K.Q} b={K.P}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Dosificador x={260} y={1180} s={0.85} rot={Math.sin((T - K.Q) * 2) * 4} />
          <Etanol x={520} y={470} s={0.9} rot={Math.sin(T * 1.3) * 12} o={kprog(T, K.Q + 0.4, K.Q + 0.8)} />
          <text x={520} y={590} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Q + 0.6, K.Q + 1.0)}>etanol C<tspan dy={8} fontSize={22}>2</tspan><tspan dy={-8}>H</tspan><tspan dy={8} fontSize={22}>5</tspan><tspan dy={-8}>OH</tspan></text>
          {(() => { const top = 560, bot = 1160, h = bot - top, f = 0.6 * kprog(T, K.Q + 1.8, K.Q + 3.4, kEase.sale); return <g>
            <rect x={720} y={top} width={100} height={h} rx={50} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <rect x={734} y={bot - 14 - (h - 28) * f} width={72} height={(h - 28) * f} rx={30} fill={KC.blue} opacity={0.85} />
            {[0, 20, 40, 60, 80, 100].map((v) => <g key={v}><line x1={820} x2={850} y1={bot - 14 - (h - 28) * v / 100} y2={bot - 14 - (h - 28) * v / 100} stroke={KC.ink} strokeWidth={5} />
              <text x={860} y={bot - 4 - (h - 28) * v / 100} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>)}
            <line x1={690} x2={850} y1={bot - 14 - (h - 28) * 0.6} y2={bot - 14 - (h - 28) * 0.6} stroke={KC.gold} strokeWidth={10} opacity={kprog(T, K.Q + 2.6, K.Q + 3.0)} />
            <text x={770} y={top - 24} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>% alcohol</text>
          </g>; })()}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Q + 2.8} until={K.P - 0.3} valor={60} dur={0.6} sufijo=" %" x={545} y={960} tam={140} color={KC.gold2} />
      </Escena>
      {/* 2 · entra a la palma → la bacteria y sus proteínas */}
      <Escena T={T} a={K.P} b={K.A} fondo={KC.noche} zoom={0.03}>
        <SvgCapa>
          <BacGrande x={540} y={900} T={T} />
          {[[330, 880, KC.pink, 1], [540, 930, KC.yellow, 2], [750, 870, KC.cyan, 3]].map(([x, y, c, sd], i) =>
            <Liston key={i} T={T} x={x} y={y} s={0.75} color={c} seed={sd} des={kprog(T, K.P + 1.8 + i * 0.35, K.P + 3.0 + i * 0.35, kEase.suave)} />)}
          {etP.map((m, i) => { const u = kprog(T, K.P + 0.8 + i * 0.12, K.P + 2.4 + i * 0.12, kEase.suave); return <Etanol key={i} x={klerp(m.x0, m.tx, u)} y={klerp(m.y0, m.ty - 110, u)} s={0.42} rot={m.r + T * 40} o={kprog(T, K.P + 0.8, K.P + 1.1)} />; })}
        </SvgCapa>
        {zoomIn < 1 && <div style={{ position:'absolute', inset:0, opacity:1 - zoomIn, transformOrigin:'420px 1034px', transform:`scale(${klerp(1, 9, zoomIn)})` }}>
          <FondoLunares color={KC.mint} /><SvgCapa><Palma x={420} y={1000} s={1.15} gel={1} /></SvgCapa></div>}
        <Etq T={T} at={K.P + 1.0} until={K.P + 2.2} x={330} y={760} texto="proteína plegada" tam={30} color={KC.texto} />
        <Etq T={T} at={K.P + 1.0} until={K.A - 0.3} x={120} y={1110} texto="bacteria (esquema)" tam={28} color="#7fffd4" />
        {T > K.P + 0.6 && T < K.A + 0.2 && <Escala T={T} z={1} pxPorMm={380000} objetivo={380} />}
      </Escena>
      {/* 3 · con agua se desarman más rápido */}
      <Escena T={T} a={K.A} b={K.F} fondo={KC.noche} zoom={0.02}>
        <SvgCapa>
          {[[40, 'alcohol puro', desL, false], [560, 'alcohol + agua', desR, true]].map(([x0, tit, des, agua], k) => <g key={k}>
            <rect x={x0} y={600} width={480} height={560} rx={36} fill="rgba(255,255,255,.05)" stroke={agua ? '#7fc8ff' : KC.texto} strokeWidth={5} />
            <text x={x0 + 240} y={670} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={agua ? '#7fc8ff' : KC.texto}>{tit}</text>
            <Liston T={T} x={x0 + 240} y={880} s={0.7} des={des} color={KC.pink} seed={2 + k} />
            {molsA.map((m, i) => { const mx = x0 + 50 + m.x * 380 + Math.sin(T + m.f) * 14, my = 720 + m.y * 300 + Math.cos(T * 1.2 + m.f) * 14;
              if (!agua && i >= 7) return null;
              return (agua && i % 2 === 1) ? <Mol key={i} tipo="agua" x={mx} y={my} s={0.5} rot={m.r + T * 30} /> : <Etanol key={i} x={mx} y={my} s={0.3} rot={m.r + T * 30} />; })}
            <g transform={`translate(${x0 + 240} ${1080})`}>
              <circle r={44} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <line x1={0} y1={0} x2={Math.sin((T - K.A) * (agua ? 7 : 0.8)) * 32} y2={-Math.cos((T - K.A) * (agua ? 7 : 0.8)) * 32} stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
              <text x={64} y={12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{agua ? 'rápido' : 'lento'}</text>
            </g>
          </g>)}
        </SvgCapa>
        {(() => { const e = kprog(T, K.A + 3.8, K.A + 4.3, kEase.sale); if (e <= 0) return null; return <div style={{ position:'absolute', left:110, top:1440, width:860, opacity:e, zIndex:42 }}>
          <div style={{ position:'relative', height:34, borderRadius:17, background:'rgba(255,255,255,.18)', border:`4px solid ${KC.texto}` }}>
            <div style={{ position:'absolute', left:'60%', width:`${30 * e}%`, top:0, bottom:0, background:KC.gold2, borderRadius:8 }}></div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', font:`700 26px ${KF.mono}`, color:KC.texto, marginTop:8 }}><span>0 %</span><span>alcohol en agua</span><span>100 %</span></div>
          <div style={{ textAlign:'center', font:`900 36px ${KF.texto}`, color:KC.gold2, marginTop:6, textShadow:KSOMBRA }}>lo mejor: 60–90 % (CDC)</div>
        </div>; })()}
      </Escena>
      {/* 4 · frotar hasta que seque */}
      <Escena T={T} a={K.F} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {(() => { const w = Math.sin(T * 14) * 22; return <g>
            <Palma x={470} y={1120 + w} s={1.0} rot={22} brillo={1 - seca} />
            <Palma x={610} y={1120 - w} s={1.0} rot={-22} espejo brillo={1 - seca} />
          </g>; })()}
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.F + 0.6 + i * 0.32, u = kprog(T, t0, t0 + 1.4); if (u <= 0 || u >= 1) return null;
            const x = 400 + i * 45; return <path key={i} d={`M ${x} ${880 - u * 260} q 16 -20 0 -40 t 0 -40`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.8} />; })}
        </SvgCapa>
        <NumeroGigante T={T} at={K.F + 0.3} until={K.Pr - 0.2} valor={20} dur={2.6} sufijo=" s" etiqueta="frota hasta que seque" x={620} y={560} tam={190} color={KC.yellow} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.N} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 6 · norovirus y esporas: el alcohol rebota */}
      <Escena T={T} a={K.N} b={K.E} fondo={KC.noche} zoom={0.03}>
        <SvgCapa>
          <Norovirus x={300} y={900} r={140} rot={T * 6} golpe={golpeV} />
          <Espora x={790} y={900} s={0.95} rot={Math.sin(T) * 4} />
          {golpes.map(([t0, x0, y0, x1, y1], i) => { const p = rebote(t0, x0, y0, x1, y1); if (!p) return null;
            return <g key={i}><Etanol x={p[0]} y={p[1]} s={0.38} rot={T * 90 + i * 50} />
              {p[2] > 0.9 && p[2] < 1.4 && <circle cx={x1} cy={y1} r={30 + (p[2] - 0.9) * 120} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={1 - (p[2] - 0.9) * 2} />}</g>; })}
          <text x={300} y={1110} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#ffd1da" opacity={kprog(T, K.N + 0.6, K.N + 1.0)}>norovirus</text>
          <text x={790} y={1112} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#f3d9a6" opacity={kprog(T, K.N + 2.4, K.N + 2.8)}>espora de</text>
          <text x={790} y={1150} textAnchor="middle" style={{ font:`italic 700 30px ${KF.mono}` }} fill="#f3d9a6" opacity={kprog(T, K.N + 2.4, K.N + 2.8)}>Clostridioides difficile</text>
          {T > K.N + 4.2 && <g opacity={kprog(T, K.N + 4.2, K.N + 4.6)}>
            <Llave T={T} x={230} y={540} s={1.0} agua={0.7 * kprog(T, K.N + 4.4, K.N + 4.9)} />
            <Jabon x={500} y={640} s={0.9} T={T} />
            <Marca x={500} y={510} ok s={0.6} o={kprog(T, K.N + 4.8, K.N + 5.2)} />
          </g>}
        </SvgCapa>
        <Chip T={T} at={K.N + 4.4} until={K.E - 0.3} texto="ganan el agua y el jabón" y={1500} tam={42} borde="#7fc8ff" />
      </Escena>
      {/* 7 · el estudio de 2010 */}
      <Escena T={T} a={K.E} b={K.Gr} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {yemas > 0 && <g opacity={yemas}>{Array.from({ length: 10 }, (_, i) => <Yema key={i} x={118 + i * 94} y={klerp(900, 820, yemas)} s={0.95} seed={i + 3} />)}</g>}
          {T > K.E + 5.3 && <g>
            <text x={570} y={725} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.E + 5.3, K.E + 5.7)}>virus quitado de los dedos</text>
            <line x1={120} x2={960} y1={1150} y2={1150} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.E + 5.3, K.E + 5.7)} />
            {barras.map(([t, v, t0, c, ok], i) => { const x = 270 + i * 270, h = 280 * v * kprog(T, t0, t0 + 0.8, kEase.sale); if (T < t0) return null; return <g key={i}>
              <rect x={x - 80} y={1150 - h} width={160} height={h} fill={c} stroke={KC.ink} strokeWidth={7} />
              <text x={x} y={1196} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{t}</text>
              <Marca x={x} y={1150 - h - 52} ok={ok} s={0.45} o={kprog(T, t0 + 0.7, t0 + 1.0)} />
            </g>; })}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="2010" quien="Liu et al. · Emory, Atlanta" revista="Appl Environ Microbiol · virus Norwalk" x={560} y={820} />
        <Chip T={T} at={K.E + 3.4} until={K.E + 5.2} texto="10 voluntarios" y={1500} tam={46} borde={KC.ink} />
        <Chip T={T} at={K.E + 7.9} until={K.Gr - 0.3} texto="midieron el material genético del virus" y={1500} tam={30} borde={KC.ink} />
      </Escena>
      {/* 8 · manos sucias o grasosas */}
      <Escena T={T} a={K.Gr} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Palma x={540} y={1080} s={1.15} mugre={1} />
          {[[-60, -50], [40, 50], [70, -70], [-30, 90], [0, 10], [-90, 40]].map(([dx, dy], i) => { const u = kprog(T, K.Gr + 0.4 + i * 0.12, K.Gr + 0.7 + i * 0.12, kEase.rebote); return u > 0 &&
            <g key={i} transform={`translate(${540 + dx * 1.15} ${1080 + dy * 1.15 - 12}) scale(${u})`}><circle r={20} fill={GEL} stroke={GELB} strokeWidth={4} opacity={0.9} /><circle cx={-6} cy={-7} r={6} fill="#fff" /></g>; })}
          <Marca x={820} y={760} ok={false} s={0.8} o={kprog(T, K.Gr + 1.2, K.Gr + 1.5)} />
        </SvgCapa>
        <Chip T={T} at={K.Gr + 0.8} until={K.M - 0.3} texto="sucias o grasosas → agua y jabón" y={1500} tam={36} borde={KC.ink} />
      </Escena>
      {/* 9 · México 2021: la alerta de la FDA */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={0} y={520} width={KW} height={230} fill="rgba(255,255,255,.45)" />
          <text x={900} y={730} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>EE. UU.</text>
          <MapaMexico x={200} y={735} ancho={680} />
          <text x={470} y={980} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={0.75}>MÉXICO</text>
          <line x1={0} x2={KW} y1={748} y2={748} stroke={KC.red} strokeWidth={8} strokeDasharray="26 16" opacity={kprog(T, K.M + 1.4, K.M + 1.8)} />
          {botM.map((b, i) => { const u = kprog(T, b.t0, b.t0 + 1.0, kEase.sale); return <g key={i}>
            <Dosificador x={b.x} y={klerp(b.y0, 800, u)} s={0.24} />
            <Alerta x={b.x + 28} y={klerp(b.y0, 800, u) - 150} s={0.55} o={kprog(T, K.M + 2.0 + i * 0.1, K.M + 2.3 + i * 0.1)} />
          </g>; })}
        </SvgCapa>
        <Lupa T={T} at={K.M + 4.0} until={K.C - 0.3} x={330} y={400} r={135} fx={395} fy={720} tinte={KC.red} etiqueta="POR DENTRO · metanol"
          interior={(T, r) => <svg width={2 * r} height={2 * r}><Molecula {...METANOL} x={r - 10} y={r + 8} s={1.25} rot={Math.sin(T * 2) * 10} /></svg>} />
        <Chip T={T} at={K.M + 0.8} until={K.M + 4.0} texto="FDA · enero 2021 · alerta de importación" y={1500} tam={32} borde={KC.red} />
        <Chip T={T} at={K.M + 4.4} until={K.M + 5.6} texto={<span>metanol CH<sub style={{ fontSize:26 }}>3</sub>OH: tóxico</span>} y={1500} tam={40} borde={KC.red} />
        <BarraMitad T={T} at={K.M + 5.8} until={K.C - 0.3} />
      </Escena>
      {/* 10 · cierre: la misma mano, ya desinfectada */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Palma x={420} y={1000} s={1.15} />
          {(() => { const u = kprog(T, K.C + 0.3, K.C + 0.8, kEase.rebote); return <g transform={`translate(420 1034) scale(${u})`}><ellipse rx={60} ry={34} fill={GEL} opacity={0.6} stroke={GELB} strokeWidth={4} strokeDasharray="12 8" /></g>; })()}
          {[[310, 740], [540, 680], [580, 920], [280, 980]].map(([x, y], i) => { const k = Math.max(0, Math.sin(T * 4 + i * 1.7)); return <path key={i} d="M 0 -26 L 7 -7 L 26 0 L 7 7 L 0 26 L -7 7 L -26 0 L -7 -7 Z" transform={`translate(${x} ${y}) scale(${0.6 + k * 0.6})`} fill="#fff" stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.C + 0.6, K.C + 1.0)} />; })}
          {T > K.C + 2.6 && <g opacity={kprog(T, K.C + 2.6, K.C + 3.0)}>
            <Llave T={T} x={800} y={820} s={0.85} agua={1} />
            <Jabon x={840} y={1080} s={0.8} T={T} />
          </g>}
        </SvgCapa>
        <Chip T={T} at={K.C + 0.5} until={K.C + 2.6} texto="alcohol ≥ 60 % → desarma proteínas" y={1500} tam={34} borde={KC.blue} />
        <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="¿hay agua y jabón? mejor" y={1500} tam={42} borde="#7fc8ff" />
      </Escena>

      {/* textos del gancho */}
      <Etq T={T} at={K.G + 0.9} until={K.Q - 0.3} x={580} y={1060} texto="gel con alcohol" tam={32} color={KC.ink} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.5} texto="lavar las manos" x={540} y={1500} tam={44} />
      <Chip T={T} at={K.G + 2.7} until={K.Q - 0.3} texto="desinfectar" y={1500} tam={50} borde={KC.blue} />
      {T < K.Q && <Escala T={T} z={1} pxPorMm={20} objetivo={200} color={KC.ink} />}
      <Chip T={T} at={K.Q + 3.2} until={K.P - 0.3} texto="CDC: mínimo 60 %" y={1500} tam={46} borde={KC.gold} />
      <Chip T={T} at={K.P + 3.2} until={K.A - 0.3} texto="desnaturalizada = ya no sirve" y={1500} tam={38} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No te lava: *te desinfecta.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.P - 0.1} texto="Mínimo *60 % de alcohol.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.1} until={K.A - 0.1} texto="Desdobla *sus proteínas.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.F - 0.1} texto="Con agua *mata mejor.*" />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.Pr - 0.1} texto="Frota hasta secar: *20 segundos.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.N - 0.1} texto="¿Entonces *mata todo?*" />
      <Subtitulo T={T} idx={6} at={K.N + 0.1} until={K.E - 0.1} texto="Norovirus y esporas: *agua y jabón.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Gr - 0.1} texto="El gel *casi no lo quitó.*" />
      <Subtitulo T={T} idx={8} at={K.Gr + 0.1} until={K.M - 0.1} texto="Sucias o grasosas: *funciona peor.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="Más de la mitad: *traía tóxicos.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No lava: *desinfecta.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Proteinas - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Proteinas + 1.5, CUES.Agua - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Frotar + 0.2, CUES.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.No + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.No + 2.0, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Grasa - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Mexico + 0.8, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="51" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GelApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gel /></CompositionStage></div>;
}
window.GelApp = GelApp;
