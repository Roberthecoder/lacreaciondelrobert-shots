// Shot 003 · Las semillas que viajaron a la Luna — versión NARRADA (N1 "Por dentro" + N5 "El experimento").
// Escenas y subtítulos se ajustan a la voz con narrar.mjs (window.SUBS); sin voz usan los tiempos estimados.
// Guion y fuentes: guion.md. El dibujo es esquemático.

const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const AVS = (n) => 'assets/stickers/' + n + '.png';
const VERDE = '#1d7a45', VERDE2 = '#34b765', TRONCO = '#8a5a3b', ALA = '#d9b98a', CAFE = '#5a3a22';

// Opacidad de una escena con fundido cruzado (nunca corte seco) y un empujoncito de cámara.
function Escena({ T, a, b, fondo, children, zoom = 0.05 }) {
  if (T < a - 0.45 || T > b + 0.45) return null;
  const o = kprog(T, a - 0.45, a + 0.05) * (1 - kprog(T, b - 0.05, b + 0.45));
  const s = 1 + zoom * kprog(T, a - 0.45, b + 0.45, kEase.suave);
  return <div style={{ position:'absolute', inset:0, opacity:o, background:fondo, overflow:'hidden' }}>
    <div style={{ position:'absolute', inset:0, transform:`scale(${s})`, transformOrigin:'50% 45%' }}>{children}</div>
  </div>;
}

// Etiqueta con línea (igual que en el shot 002).
function Etq({ T, at, until, x, y, texto, it = false, lado = 'der', color = KC.texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:70 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>
    <div style={{ font:`700 34px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}

/* ---------- dibujos ---------- */
// Semilla de pino con ala (Pinus taeda): semilla abajo (0,0), ala hacia arriba.
function SemillaAla({ x = 0, y = 0, rot = 0, s = 1, ala = ALA, cuerpo = CAFE, borde = 3 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -8 -6 C -24 -40, -14 -80, 6 -88 C 22 -70, 18 -30, 8 -6 Z" fill={ala} stroke="#7a5634" strokeWidth={borde} strokeLinejoin="round" />
    <path d="M 0 -10 C -4 -40, 0 -66, 6 -82 M 4 -12 C 6 -40, 10 -60, 10 -76" stroke="#b08a5a" strokeWidth={borde * 0.6} fill="none" />
    <ellipse cx="0" cy="0" rx="10" ry="14" fill={cuerpo} stroke={KC.ink} strokeWidth={borde} />
  </g>;
}

// Pino esquemático. Base en (x, y); s = escala (1 = 900 px de alto); ancho = factor de copa.
function Pino({ T, x, y, s = 1, ancho = 1, seed = 1 }) {
  const sway = mece(T, seed, 0.22) * 1.3;
  const niveles = [0, 1, 2, 3, 4, 5].map((i) => ({ y: -800 + i * 118, w: (80 + i * 44) * ancho }));
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${sway})`}>
    <path d="M -30 0 L -16 -830 L 16 -830 L 30 0 Z" fill={TRONCO} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {niveles.slice().reverse().map((n, i) => (
      <g key={i}>
        <ellipse cx={-n.w * 0.55} cy={n.y} rx={n.w * 0.6} ry={68} fill={VERDE} stroke={KC.ink} strokeWidth={7} />
        <ellipse cx={n.w * 0.55} cy={n.y + 6} rx={n.w * 0.6} ry={66} fill={VERDE} stroke={KC.ink} strokeWidth={7} />
        <ellipse cx={0} cy={n.y - 22} rx={n.w * 0.5} ry={72} fill={VERDE} stroke={KC.ink} strokeWidth={7} />
        <ellipse cx={-n.w * 0.25} cy={n.y - 46} rx={n.w * 0.28} ry={24} fill={VERDE2} />
        <ellipse cx={n.w * 0.7} cy={n.y - 20} rx={n.w * 0.2} ry={18} fill={VERDE2} />
        {i % 2 === 0 && <ellipse cx={n.w * 0.35} cy={n.y + 50} rx={13} ry={22} fill="#a8703f" stroke={KC.ink} strokeWidth={4} />}
      </g>
    ))}
    <ellipse cx={0} cy={-860} rx={62 * ancho} ry={78} fill={VERDE} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-14} cy={-890} rx={22 * ancho} ry={20} fill={VERDE2} />
  </g>;
}

// Parque con el pino protagonista. orbita: 0..1 (la lunita que da vueltas a la copa).
function Parque({ T, orbita = 0, semillaEn }) {
  const O = { x: 540, y: 690, rx: 330, ry: 78 };
  const th = T * 2.4, mx = O.x + O.rx * Math.cos(th), my = O.y + O.ry * Math.sin(th), frente = Math.sin(th) > 0;
  const luna = (o) => <g opacity={o * orbita}><circle cx={mx} cy={my} r={26} fill="#e9e4f3" stroke={KC.ink} strokeWidth={5} /><circle cx={mx - 8} cy={my - 6} r={6} fill="#c3bbd6" /><circle cx={mx + 9} cy={my + 7} r={4} fill="#c3bbd6" /></g>;
  // semilla que cae girando (acción antes del segundo 1)
  let sem = null;
  if (semillaEn != null && T >= semillaEn - 0.01) {
    const p = kprog(T, semillaEn, semillaEn + 3.4);
    const sx = 650 + 110 * p + 40 * Math.sin(p * 9), sy = klerp(930, 1462, p);
    sem = <SemillaAla x={sx} y={sy} rot={p < 1 ? (T - semillaEn) * 720 : 70} s={1.6} />;
  }
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff 0%, #00d2ff 70%, #7fe0c8 100%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={880} cy={300} r={88} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      {[[180, 330, 90], [330, 260, 60]].map(([x, y, r], i) => <g key={i} transform={`translate(${mece(T, i + 4, 0.05) * 30} 0)`}><ellipse cx={x} cy={y} rx={r * 1.5} ry={r * 0.6} fill="#fff" stroke={KC.ink} strokeWidth={6} /></g>)}
      <rect x={0} y={1450} width={KW} height={470} fill={KC.leaf} />
      <path d="M0 1450 Q 270 1420 540 1450 T 1080 1450" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${40 + i * 75} 1560 l 10 -26 l 10 26`} stroke="#2a9a3c" strokeWidth={6} fill="none" />)}
      <ellipse cx={O.x} cy={O.y} rx={O.rx} ry={O.ry} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="16 14" strokeDashoffset={-T * 50} opacity={0.45 * orbita} transform={`rotate(-8 ${O.x} ${O.y})`} />
      {!frente && <g transform={`rotate(-8 ${O.x} ${O.y})`}>{luna(0.8)}</g>}
      <Pino T={T} x={540} y={1460} s={0.95} />
      {frente && <g transform={`rotate(-8 ${O.x} ${O.y})`}>{luna(1)}</g>}
      {sem}
      {/* regla: 2 m */}
      <g transform="translate(70 1700)"><rect width={86} height={10} rx={5} fill={KC.texto} stroke={KC.ink} strokeWidth={3} /></g>
    </svg>
    <div style={{ position:'absolute', left:70, top:1650, font:`700 26px ${KF.mono}`, color:KC.texto, textShadow:SOMBRA }}>≈ 2 m</div>
    <Ambiente T={T} n={18} seed={9} color="rgba(255,255,230,.7)" tam={[4, 9]} vel={10} />
  </>;
}

// Bote metálico del equipaje personal de Roosa, con las bolsitas.
function Equipaje({ T, a }) {
  const tapa = kprog(T, a + 0.4, a + 1.1, kEase.sale);
  const bolsas = [[250, 720], [830, 720], [260, 1060], [820, 1060]];
  return <>
    <div style={{ position:'absolute', inset:0, background:KC.yellow, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.35) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {bolsas.map(([bx, by], i) => {
        const p = kprog(T, a + 0.9 + i * 0.18, a + 1.7 + i * 0.18, kEase.rebote);
        const x = klerp(540, bx, p), y = klerp(700, by, p) + mece(T, i + 2, 0.4) * 6;
        if (p <= 0) return null;
        return <g key={i} transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, p)}) rotate(${mece(T, i, 0.3) * 4})`}>
          <rect x={-85} y={-100} width={170} height={200} rx={22} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
          <line x1={-70} y1={-80} x2={70} y2={-80} stroke={KC.ink} strokeWidth={5} />
          {[[-30, -20], [25, -10], [-10, 30], [35, 45], [-40, 55], [5, 75]].map(([sx, sy], k) => <SemillaAla key={k} x={sx} y={sy + 20} rot={k * 55} s={0.55} borde={4} />)}
        </g>;
      })}
      <g>
        <rect x={390} y={640} width={300} height={470} rx={40} fill="#c3cbd3" stroke={KC.ink} strokeWidth={10} />
        {[740, 860, 980].map((y) => <line key={y} x1={392} y1={y} x2={688} y2={y} stroke="#9aa4ae" strokeWidth={8} />)}
        <rect x={420} y={680} width={40} height={400} rx={16} fill="#e6ebef" opacity=".7" />
        <g transform={`translate(${tapa * 160} ${-tapa * 150}) rotate(${tapa * 28} 540 630)`}>
          <rect x={375} y={598} width={330} height={74} rx={22} fill="#9aa4ae" stroke={KC.ink} strokeWidth={10} />
        </g>
      </g>
    </svg>
  </>;
}

// Cinco tarjetas: la semilla real de cada especie.
const ESPECIES = [
  { n: 'Pino taeda', c: 'Pinus taeda', d: (s) => <SemillaAla s={1.5} y={40} /> },
  { n: 'Sicomoro', c: 'Platanus occidentalis', d: () => <g transform="translate(0 0) rotate(-20)">{Array.from({ length: 9 }, (_, i) => <line key={i} x1={0} y1={44} x2={-34 + i * 8.5} y2={92} stroke="#c9a46a" strokeWidth={3} />)}<path d="M -7 -60 C -12 -10, -9 30, 0 46 C 9 30, 12 -10, 7 -60 Z" fill="#a7743f" stroke={KC.ink} strokeWidth={4} /></g> },
  { n: 'Liquidámbar', c: 'Liquidambar styraciflua', d: () => <SemillaAla s={1.1} y={30} rot={15} ala="#c9a06c" cuerpo="#4a2d1a" /> },
  { n: 'Secuoya', c: 'Sequoia sempervirens', d: () => <g><ellipse cx={0} cy={0} rx={36} ry={26} fill="#e2c595" stroke="#7a5634" strokeWidth={4} /><ellipse cx={0} cy={0} rx={18} ry={14} fill="#6b4024" stroke={KC.ink} strokeWidth={4} /></g> },
  { n: 'Abeto Douglas', c: 'Pseudotsuga menziesii', d: () => <SemillaAla s={1.45} y={40} rot={-12} ala="#e0b07a" cuerpo="#6a3a1e" /> },
];
function Especies({ T, a }) {
  const pos = [[200, 625], [540, 625], [880, 625], [370, 965], [710, 965]];
  return <>
    <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
    {ESPECIES.map((e, i) => {
      const at = a + 0.4 + i * 0.62, k = kentrada(T, at, null, 'pop');
      if (T < at) return null;
      const [x, y] = pos[i];
      return <div key={i} style={{ position:'absolute', left:x - 150, top:y - 165, width:300, height:330, opacity:k.o, transform:`scale(${k.s}) rotate(${(i % 2 ? 2 : -2) + mece(T, i, 0.2)}deg)`,
        background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, textAlign:'center' }}>
        <svg width={300} height={200} style={{ display:'block' }}><g transform={`translate(150 105) rotate(${mece(T, i + 7, 0.3) * 6})`}>{e.d()}</g></svg>
        <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, marginTop:-4 }}>{e.n}</div>
        <div style={{ font:`italic 700 20px ${KF.mono}`, color:'#5a524a', marginTop:6 }}>{e.c}</div>
      </div>;
    })}
  </>;
}

// La Luna, el módulo lunar en la superficie y la nave de Roosa en órbita.
function Orbita({ T, a, b }) {
  const g = krng(31), est = Array.from({ length: 90 }, () => [g() * KW, g() * 1300, 1 + g() * 3, g() * 6]);
  const R = { x: 540, y: 940, rx: 480, ry: 112 };
  const th = 0.35 + (T - a) * 2.4, cx = R.x + R.rx * Math.cos(th), cy = R.y + R.ry * Math.sin(th), frente = Math.sin(th) > 0;
  const ang = Math.atan2(R.ry * Math.cos(th), -R.rx * Math.sin(th)) * 180 / Math.PI;
  const nave = <g transform={`translate(${cx} ${cy}) rotate(${ang}) scale(${frente ? 1.15 : 0.85})`} opacity={frente ? 1 : 0.7}>
    <circle r={46} fill={KC.cyan} opacity=".25" />
    <rect x={-40} y={-16} width={46} height={32} rx={6} fill="#dfe5ea" stroke={KC.ink} strokeWidth={5} />
    <path d="M 6 -16 L 40 0 L 6 16 Z" fill="#f2f5f8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -40 -10 L -54 -16 L -54 16 L -40 10 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={4} />
  </g>;
  const vuelta = Math.round(klerp(1, 34, kprog(T, a + 0.6, b - 0.4, kEase.suave)));
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0d1424, #1d1150)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {est.map(([x, y, r, f], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + 0.5 * (0.5 + 0.5 * Math.sin(T * 2 + f))} />)}
      <g><circle cx={910} cy={330} r={70} fill="#2f7fff" stroke={KC.ink} strokeWidth={6} /><path d="M 870 300 q 30 -20 50 10 q 20 30 -10 40 q -30 0 -40 -50 Z" fill={KC.leaf} /><circle cx={910} cy={330} r={84} fill="none" stroke="#8fd3ff" strokeWidth={4} opacity=".6" /></g>
      <path d={`M ${R.x - R.rx} ${R.y} A ${R.rx} ${R.ry} 0 0 1 ${R.x + R.rx} ${R.y}`} fill="none" stroke={KC.cyan} strokeWidth={5} strokeDasharray="16 14" opacity=".45" />
      {!frente && nave}
      <circle cx={540} cy={1500} r={660} fill="#cfc8dc" stroke={KC.ink} strokeWidth={10} />
      {[[300, 1030, 60], [760, 1080, 80], [520, 1200, 50], [880, 1260, 40], [200, 1280, 70], [640, 930, 34]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.45} fill="#b4abc6" stroke="#9a90b0" strokeWidth={4} />)}
      {/* módulo lunar Antares y dos astronautas */}
      <g transform="translate(470 848)">
        <path d="M -40 30 L -26 6 M 40 30 L 26 6 M -14 30 L -8 8 M 14 30 L 8 8" stroke={KC.ink} strokeWidth={5} />
        <rect x={-30} y={-22} width={60} height={30} rx={4} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
        <path d="M -22 -22 L -16 -46 L 16 -46 L 22 -22 Z" fill="#dfe5ea" stroke={KC.ink} strokeWidth={5} />
      </g>
      {[[575, 858], [622, 862]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y + Math.abs(Math.sin(T * 3 + i)) * -8})`}><circle cx={0} cy={-26} r={9} fill="#fff" stroke={KC.ink} strokeWidth={4} /><rect x={-8} y={-18} width={16} height={22} rx={5} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>)}
      <path d={`M ${R.x - R.rx} ${R.y} A ${R.rx} ${R.ry} 0 0 0 ${R.x + R.rx} ${R.y}`} fill="none" stroke={KC.cyan} strokeWidth={6} strokeDasharray="16 14" opacity=".9" />
      {frente && nave}
    </svg>
    <div style={{ position:'absolute', left:0, right:0, top:400, textAlign:'center', font:`700 58px ${KF.mono}`, color:KC.texto, textShadow:SOMBRA }}>vuelta <span style={{ color:KC.yellow }}>{vuelta}</span> / 34</div>
    <Etq T={T} at={a + 1.2} until={b} x={cx + (cx > 540 ? -60 : 60)} y={cy - 95} lado={cx > 540 ? 'izq' : 'der'} texto="Roosa, solo" color={KC.cyan} />
    <Etq T={T} at={a + 2.0} until={b} x={600} y={770} texto="Shepard y Mitchell" color={KC.texto} />
  </>;
}

// Corte de la semilla visto con la Lupa de rayos X.
function SemillaCorte({ T, r }) {
  const D = r * 2, c = r, late = 0.75 + 0.25 * Math.sin(T * 1.1);
  return <svg width={D} height={D}>
    <ellipse cx={c} cy={c} rx={r * 0.62} ry={r * 0.86} fill="#6b4024" stroke="#3a2214" strokeWidth={6} />
    <ellipse cx={c} cy={c} rx={r * 0.53} ry={r * 0.76} fill="#f2e2ae" />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={c + Math.cos(i * 2.4) * r * 0.35} cy={c + Math.sin(i * 1.7) * r * 0.55} r={6} fill="#e3cd8c" />)}
    <g opacity={late}>
      <path d={`M ${c - r * 0.07} ${c + r * 0.62} C ${c - r * 0.1} ${c}, ${c - r * 0.09} ${c - r * 0.3}, ${c - r * 0.05} ${c - r * 0.42} L ${c + r * 0.05} ${c - r * 0.42} C ${c + r * 0.09} ${c - r * 0.3}, ${c + r * 0.1} ${c}, ${c + r * 0.07} ${c + r * 0.62} Z`} fill="#b8e986" stroke="#4f8a2a" strokeWidth={4} />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => <line key={k} x1={c} y1={c - r * 0.4} x2={c + k * r * 0.06} y2={c - r * 0.66} stroke="#7cc24a" strokeWidth={8} strokeLinecap="round" />)}
      <circle cx={c} cy={c} r={r * 0.2} fill="#d8ffb0" opacity={0.25 * late} />
    </g>
  </svg>;
}

// Escena de la semilla grande (re-gancho + por dentro).
function SemillaGrande({ T, P, D }) {
  const s = klerp(0.35, 1, kprog(T, P, P + 2.2, kEase.suave));
  return <>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 55%, #1b2333 0%, #0E0F12 70%)' }}></div>
    <Ambiente T={T} n={34} seed={12} color="rgba(234,255,247,.4)" tam={[3, 8]} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <g transform={`translate(540 1090) scale(${s}) rotate(${mece(T, 3, 0.15) * 4})`}><SemillaAla s={8} borde={1.2} /></g>
    </svg>
    <Escala T={T} z={s} pxPorMm={37} />
  </>;
}

// Cámara de limpieza: las bolsas revientan y las semillas flotan en el vacío.
function Vacio({ T, a }) {
  const rev = a + 1.0, g = krng(55);
  const sem = Array.from({ length: 28 }, (_, i) => ({ vx: (g() - 0.5) * 760, vy: (g() - 0.5) * 560, r0: g() * 360, vr: (g() - 0.5) * 140, t: i % 3, s: 0.7 + g() * 0.5 }));
  const u = T - rev, k = u > 0 ? 1 - Math.exp(-u * 1.6) : 0;
  return <>
    <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 24px, transparent 24px 48px)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <rect x={110} y={440} width={860} height={760} rx={60} fill="#151924" stroke={KC.ink} strokeWidth={12} />
      <rect x={130} y={460} width={820} height={720} rx={46} fill="none" stroke="#3b4255" strokeWidth={6} />
      {[[150, 480], [930, 480], [150, 1160], [930, 1160]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={12} fill="#9aa4ae" stroke={KC.ink} strokeWidth={4} />)}
      {u < 0.4 && [-150, 0, 150].map((dx, i) => <g key={i} transform={`translate(${540 + dx + (u > 0 ? (i - 1) * u * 200 : 0)} ${820 + mece(T, i, 0.5) * 6}) scale(${1 + Math.max(0, -u) * 0 + (u > -0.4 && u < 0 ? (0.4 + u) * 0.4 : 0)})`} opacity={u > 0 ? 1 - u / 0.4 : 1}>
        <rect x={-62} y={-80} width={124} height={160} rx={18} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} />
      </g>)}
      {sem.map((p, i) => {
        const x = 540 + (i % 3 - 1) * 150 * (1 - k) + p.vx * k + mece(T, i, 0.2) * 14 * k, y = 820 + p.vy * k + mece(T, i + 30, 0.2) * 14 * k;
        const rot = p.r0 + p.vr * (u > 0 ? u : 0);
        if (u < 0) return null;
        return p.t === 0 ? <SemillaAla key={i} x={x} y={y} rot={rot} s={0.9 * p.s} />
          : p.t === 1 ? <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${0.55 * p.s})`}>{ESPECIES[1].d()}</g>
          : <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${0.6 * p.s})`}>{ESPECIES[3].d()}</g>;
      })}
    </svg>
    <Chip T={T} at={rev - 0.2} texto="VACÍO" y={380} borde={KC.cyan} tam={52} mono />
  </>;
}

// Plántula de pino: tallito y verticilo de agujas (con la cáscara de la semilla en la punta).
function Plantula({ x, y, p }) {
  if (p <= 0) return null;
  const h = 170 * p;
  return <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={0} x2={0} y2={-h} stroke="#7cc24a" strokeWidth={10} strokeLinecap="round" />
    {[-3, -2, -1, 0, 1, 2, 3].map((k) => <line key={k} x1={0} y1={-h} x2={k * 18 * p} y2={-h - 60 * p + Math.abs(k) * 8 * p} stroke="#34b765" strokeWidth={8} strokeLinecap="round" />)}
    <ellipse cx={0} cy={-h - 58 * p} rx={10 * p} ry={14 * p} fill={CAFE} stroke={KC.ink} strokeWidth={3} opacity={1 - kclamp((p - 0.7) / 0.3, 0, 1)} />
  </g>;
}
function Maceta({ x, y, texto, color }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -130 0 L 130 0 L 100 190 L -100 190 Z" fill="#d9744a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-145} y={-36} width={290} height={46} rx={10} fill="#e5865c" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-12} rx={124} ry={14} fill="#5a3a22" />
    <text x={0} y={120} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={3}>{texto}</text>
  </g>;
}
function Estudio({ T, a, b }) {
  const brota = kprog(T, b - 2.4, b - 0.6, kEase.sale), m = kentrada(T, a + 3.3, null, 'pop');
  return <>
    <div style={{ position:'absolute', inset:0, background:KC.yellow, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.35) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
    {T >= a + 3.3 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:m.o }}>
      <g transform={`translate(0 ${(1 - m.s) * 200})`}>
        <Plantula x={300} y={990} p={brota} /><Plantula x={780} y={990} p={brota} />
        <Maceta x={300} y={1000} texto="LUNA" color={KC.lilac} /><Maceta x={780} y={1000} texto="TIERRA" color={KC.cyan} />
      </g>
    </svg>}
    <TarjetaEstudio T={T} at={a + 0.3} until={a + 3.3} anio="1972" quien="Servicio Forestal de EE. UU." revista="Gulfport (Misisipi) · Placerville (California)" y={700} />
  </>;
}

// Los dos pinos crecen igual: el lunar y su gemelo terrestre.
function Igual({ T, a }) {
  const s = klerp(0.14, 0.82, kprog(T, a + 0.1, a + 3.0, kEase.suave)), top = 1460 - 900 * s;
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff, #00d2ff)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <rect x={0} y={1450} width={KW} height={470} fill={KC.leaf} />
      <path d="M0 1450 Q 270 1420 540 1450 T 1080 1450" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
      <Pino T={T} x={300} y={1460} s={s} ancho={0.62} seed={2} />
      <Pino T={T} x={790} y={1460} s={s} ancho={0.62} seed={5} />
      <line x1={80} y1={top - 70 * s} x2={1000} y2={top - 70 * s} stroke={KC.ink} strokeWidth={6} strokeDasharray="20 14" opacity={kprog(T, a + 2.8, a + 3.3)} />
    </svg>
    <Chip T={T} at={a + 3.0} texto="40+ años: sin diferencia" y={420} borde={KC.gold} tam={44} />
    <Chip T={T} at={a + 0.6} texto="lunar" x={300} y={1530} borde={KC.lilac} tam={38} />
    <Chip T={T} at={a + 0.8} texto="terrestre" x={790} y={1530} borde={KC.cyan} tam={38} />
  </>;
}

// ~40 árboles por todos lados, varios "perdidos".
function Lista({ T, a }) {
  const g = krng(404), arb = [];
  while (arb.length < 40) { const x = 70 + g() * 940, y = 720 + g() * 1100; if (y > 1180 && y < 1420) continue; arb.push([x, y, g() < 0.25]); }
  return <>
    <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {arb.sort((p, q) => p[1] - q[1]).map(([x, y, q], i) => {
        const e = kentrada(T, a + 0.3 + i * 0.07, null, 'pop'); if (T < a + 0.3 + i * 0.07) return null;
        return <g key={i} transform={`translate(${x} ${y}) scale(${e.s}) rotate(${mece(T, i, 0.25) * 3})`} opacity={e.o}>
          <rect x={-6} y={-10} width={12} height={30} fill={TRONCO} stroke={KC.ink} strokeWidth={3} />
          <path d="M 0 -78 L 30 -28 L 18 -28 L 40 6 L -40 6 L -18 -28 L -30 -28 Z" fill={VERDE} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
          {q && <g transform="translate(30 -82)"><circle r={22} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /><text y={11} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>?</text></g>}
        </g>;
      })}
    </svg>
    <NumeroGigante T={T} at={a + 0.2} valor={40} prefijo="~" etiqueta="estados con árboles lunares" y={500} tam={200} />
  </>;
}

/* ---------- el shot ---------- */
function LunaNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Viaje, E: CUES.Especies, O: CUES.Orbita, P: CUES.Pregunta, D: CUES.Dentro, Va: CUES.Vacio, Es: CUES.Estudio, I: CUES.Igual, L: CUES.Lista, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.G} b={K.V}><Parque T={T} orbita={kprog(T, K.G + 1.2, K.G + 2)} semillaEn={K.G + 0.25} /></Escena>
      <Escena T={T} a={K.V} b={K.E}><Equipaje T={T} a={K.V} /></Escena>
      <Escena T={T} a={K.E} b={K.O}><Especies T={T} a={K.E} /></Escena>
      <Escena T={T} a={K.O} b={K.P} zoom={0.03}><Orbita T={T} a={K.O} b={K.P} /></Escena>
      <Escena T={T} a={K.P} b={K.Va} zoom={0.02}><SemillaGrande T={T} P={K.P} D={K.D} /></Escena>
      <Escena T={T} a={K.Va} b={K.Es}><Vacio T={T} a={K.Va} /></Escena>
      <Escena T={T} a={K.Es} b={K.I}><Estudio T={T} a={K.Es} b={K.I} /></Escena>
      <Escena T={T} a={K.I} b={K.L}><Igual T={T} a={K.I} /></Escena>
      <Escena T={T} a={K.L} b={K.C}><Lista T={T} a={K.L} /></Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}><Parque T={T} orbita={1} /></Escena>

      {/* gancho y cierre: ×34 */}
      {T < K.V - 0.2 && <Contador T={T} at={K.G + 1.3} hasta={34} desde={0} dur={2.2} sufijo="×" x={540} y={430} tam={120} color={KC.yellow} />}
      <Chip T={T} at={K.G + 2.2} until={K.V - 0.3} texto="vueltas a la Luna" y={540} tam={40} />
      <Etq T={T} at={K.G + 1.0} until={K.V - 0.3} x={600} y={1040} texto="Pinus taeda" it color={KC.texto} />
      {T >= K.C && <Contador T={T} at={K.C} desde={34} hasta={34} dur={0.1} sufijo="×" x={540} y={430} tam={120} color={KC.yellow} />}
      <Chip T={T} at={K.C + 0.6} until={K.Ou} texto="34 vueltas a la Luna" y={540} tam={40} />

      {/* viaje */}
      <Chip T={T} at={K.V + 0.2} until={K.E - 0.2} texto="Stuart Roosa · Apolo 14 · 1971" y={430} tam={40} />
      <Chip T={T} at={K.V + 2.3} until={K.E - 0.2} texto="exbombero forestal" y={1490} borde={KC.red} tam={40} />
      <Etq T={T} at={K.V + 1.2} until={K.E - 0.2} x={700} y={900} texto="equipaje" color={KC.ink} />
      {/* especies */}
      <Chip T={T} at={K.E + 0.1} until={K.O - 0.2} texto="5 árboles" y={395} tam={44} />
      {/* órbita */}
      <Chip T={T} at={K.O + 0.6} until={K.P - 0.2} texto="no pisaron la Luna" y={520} borde={KC.red} tam={40} />
      {/* por dentro (Lupa en modo rayos X) */}
      <Lupa T={T} at={K.D + 0.1} until={K.Va - 0.3} x={380} y={630} r={250} fx={540} fy={1090} interior={(t, r) => <SemillaCorte T={t} r={r} />} etiqueta="RAYOS X · semilla" />
      <Etq T={T} at={K.D + 0.9} until={K.Va - 0.3} x={650} y={480} texto="cubierta" />
      <Etq T={T} at={K.D + 1.3} until={K.Va - 0.3} x={650} y={620} texto="reserva" color={KC.gold2} />
      <Etq T={T} at={K.D + 1.7} until={K.Va - 0.3} x={650} y={760} texto="embrión" color="#b8e986" />
      <Medidor T={T} at={K.D + 3.6} until={K.Va - 0.3} etiqueta="AGUA EN LA SEMILLA" valor={(t) => 0.08 * kprog(t, K.D + 3.8, K.D + 4.6)} texto={() => 'muy poca'} y={1560} color={KC.cyan} />
      {/* vacío → germinaron */}
      <MitoTachado T={T} at={K.Va + 3.6} tacharEn={K.I - 1.4} until={K.I - 0.3} texto="¿Muertas?" y={1560} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.V - 0.1} texto="No es un árbol cualquiera: *34 vueltas a la Luna.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.E - 0.1} texto="Se la llevó *Stuart Roosa,* exbombero forestal." />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.O - 0.1} texto="Cientos de semillas de *cinco árboles.*" />
      <Subtitulo T={T} idx={3} at={K.O + 0.1} until={K.P - 0.1} texto="No pisaron la Luna: *Roosa daba vueltas solo.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.D - 0.1} texto="¿Qué le hace el espacio *a una semilla?*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.D + 3.5} texto="Un *embrión dormido* con su comida y su cubierta." />
      <Subtitulo T={T} idx={6} at={K.D + 3.6} until={K.Va - 0.1} texto="Casi seca, *no gasta casi nada.*" />
      <Subtitulo T={T} idx={7} at={K.Va + 0.1} until={K.Va + 3.5} texto="Las bolsas reventaron: *al vacío.*" />
      <Subtitulo T={T} idx={8} at={K.Va + 3.6} until={K.Es - 0.1} texto="Creyeron que *estaban muertas.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.I - 0.1} texto="Junto a semillas terrestres… *germinaron.*" />
      <Subtitulo T={T} idx={10} at={K.I + 0.1} until={K.L - 0.1} texto="40 años después: *ninguna diferencia.*" />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.C - 0.1} texto="Unos 40 estados… *y nadie hizo la lista.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Nada raro… *salvo 34 vueltas a la Luna.*" />

      {/* stickers de reacción */}
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={K.P + 0.1} until={K.D - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={K.Va + 3.6} until={K.Es - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_04_bajando_lentes')} at={K.L + 2.4} until={K.C - 0.2} lado="abajo-der" />

      <MarcaAgua T={T} tema="biologia" num="03" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Audio sincronizado al tiempo de reproducción.
function AudioPista({ src }) {
  const { time, playing } = useComposition();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a || !src) return;
    if (playing) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(a.currentTime - time) > 0.25) a.currentTime = time; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - time) > 0.05) a.currentTime = time; }
  });
  return src ? <audio ref={ref} src={src} preload="auto" style={{ display:'none' }} /> : null;
}

function LunaNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <LunaNarrado />
      </CompositionStage>
    </div>
  );
}
window.AudioPista = AudioPista;
window.LunaNarradoApp = LunaNarradoApp;
