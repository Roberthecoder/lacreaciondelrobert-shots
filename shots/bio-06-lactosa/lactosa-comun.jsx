// Shot bio-06 · Dibujos que comparten la versión narrada y el gemelo mudo.
// Todo es esquemático (no está a escala entre sí) y se dibuja desde el tiempo T.
// Fuentes y correcciones: guion.md.

const LSOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const LAVS = (n) => 'assets/stickers/' + n + '.png';
const LECHE = '#f7f3ea', LECHE2 = '#e4ddcd', CAPSIDE = '#8e7bff', CAPSIDE2 = '#6b56e0', GEN = '#7cf08a';

// Virus adeno-asociado esquemático: cápside icosaédrica (hexágono con facetas) y el gen adentro.
// gen: 0..1 brillo del hilito de ADN · suelta: 0..1 el gen sale por abajo.
function VirusAAV({ T, x = 0, y = 0, s = 1, rot = 0, gen = 1, suelta = 0, r = 100 }) {
  const pt = (a, rr) => [rr * Math.cos((a - 90) * Math.PI / 180), rr * Math.sin((a - 90) * Math.PI / 180)];
  const bordes = [0, 60, 120, 180, 240, 300].map((a) => pt(a, r));
  const hilo = `M -${r * 0.42} ${r * 0.2} ` + Array.from({ length: 7 }, (_, i) =>
    `Q ${-r * 0.42 + (i + 0.5) * r * 0.12} ${r * 0.2 - (i % 2 ? 1 : -1) * r * 0.24} ${-r * 0.42 + (i + 1) * r * 0.12} ${r * 0.2}`).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={r * 1.25} fill={CAPSIDE} opacity={0.18} />
    <polygon points={bordes.map((p) => p.join(',')).join(' ')} fill={CAPSIDE} stroke={KC.ink} strokeWidth={r * 0.075} strokeLinejoin="round" />
    {bordes.map((p, i) => <polygon key={i} points={`0,0 ${p.join(',')} ${bordes[(i + 1) % 6].join(',')}`}
      fill={i % 2 ? CAPSIDE2 : CAPSIDE} stroke={KC.ink} strokeWidth={r * 0.035} strokeLinejoin="round" opacity={0.95} />)}
    {[0, 120, 240].map((a) => { const p = pt(a + 30, r * 0.62);
      return <circle key={a} cx={p[0]} cy={p[1]} r={r * 0.11} fill="rgba(255,255,255,.45)" />; })}
    <g opacity={gen} transform={`translate(0 ${suelta * r * 1.9})`}>
      <path d={hilo} fill="none" stroke={GEN} strokeWidth={r * 0.085} strokeLinecap="round"
        style={{ filter:`drop-shadow(0 0 ${r * 0.12}px ${GEN})` }} />
    </g>
  </g>;
}

// Vaso de leche (la imagen que abre y cierra el shot). lleno: 0..1
function VasoLeche({ T, x = 0, y = 0, s = 1, lleno = 0.78, seed = 2 }) {
  // El vaso es un trapecio: media anchura wy(t) = de w/2 arriba a 0.38w abajo. La leche se dibuja
  // con su propio trapecio (sin clipPath, que se confunde entre varios vasos en la misma pantalla).
  const w = 150, h = 250, nivel = h * (1 - kclamp(lleno, 0, 1)), on = mece(T, seed, 0.5) * 4;
  const wy = (t) => klerp(w / 2, w * 0.38, t / h);
  const wn = wy(nivel);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={h + 16} rx={w * 0.78} ry={18} fill="rgba(0,0,0,.2)" />
    <path d={`M ${-wn} ${nivel} Q 0 ${nivel + 14 + on} ${wn} ${nivel} L ${w * 0.38} ${h} L ${-w * 0.38} ${h} Z`} fill={LECHE} />
    <path d={`M ${-wn} ${nivel} Q 0 ${nivel - 12 + on} ${wn} ${nivel}`} fill="none" stroke={LECHE2} strokeWidth={7} />
    <path d={`M ${-wn * 0.72} ${nivel + 26} L ${-w * 0.27} ${h - 14}`} stroke="rgba(255,255,255,.85)" strokeWidth={16} strokeLinecap="round" />
    <path d={`M ${-w / 2} 0 L ${w / 2} 0 L ${w * 0.38} ${h} L ${-w * 0.38} ${h} Z`} fill="rgba(255,255,255,.14)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={w / 2} ry={16} fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}

// Biberón (escena del bebé).
function Biberon({ T, x = 0, y = 0, s = 1, seed = 3 }) {
  const on = mece(T, seed, 0.4) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${on}) scale(${s})`}>
    <rect x={-80} y={-40} width={160} height={290} rx={46} fill="rgba(255,255,255,.3)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-62} y={40} width={124} height={190} rx={30} fill={LECHE} />
    <rect x={-56} y={-72} width={112} height={40} rx={14} fill="#ffd1dc" stroke={KC.ink} strokeWidth={8} />
    <path d="M -28 -72 C -30 -130, 30 -130, 28 -72 Z" fill="#ffb3c6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[0, 1, 2].map((k) => <line key={k} x1={-74} y1={70 + k * 50} x2={-46} y2={70 + k * 50} stroke={KC.ink} strokeWidth={6} opacity={0.5} />)}
  </g>;
}

// Enzima lactasa suelta (la misma cuña del borde del intestino, para pastillas y escenas macro).
// abre: 0..1 qué tan abierta está la "tijera" · corta: pulso de corte.
function Enzima({ T, x = 0, y = 0, s = 1, rot = 0, fase = 0, color = KC.mint }) {
  const ab = 16 + 11 * Math.max(0, Math.sin(T * 5 + fase));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L 26 ${-ab} L 31 ${-ab + 8} L 11 0 L 31 ${ab - 8} L 26 ${ab} Z`} fill={color} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <circle cx={4} cy={0} r={5} fill={KC.ink} opacity={0.5} />
  </g>;
}

// Rata esquemática de laboratorio (escena del estudio de 1998).
function Rata({ T, x = 0, y = 0, s = 1, seed = 1, mira = 1 }) {
  const b = mece(T, seed, 0.6) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s * mira} ${s}) rotate(${b * 0.4})`}>
    <path d={`M 120 -18 q 70 ${10 + b * 3} 96 -46`} fill="none" stroke="#f0b8c8" strokeWidth={11} strokeLinecap="round" />
    <ellipse cx={30} cy={-40} rx={104} ry={62} fill="#f4f1ee" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-72} cy={-62} r={48} fill="#f8f6f4" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-74} cy={-108} r={23} fill="#ffc9d6" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-100} cy={-70} r={8} fill={KC.ink} />
    <circle cx={-114} cy={-50} r={6} fill="#ff9cb3" />
    {[0, 1, 2].map((k) => <line key={k} x1={-112} y1={-52} x2={-150} y2={-66 + k * 16} stroke={KC.ink} strokeWidth={4} />)}
    {[[-20, 20], [78, 20]].map(([px, py], i) => <line key={i} x1={px} y1={py} x2={px} y2={py + 34} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />)}
  </g>;
}

// Pastilla de lactasa que se abre y suelta enzimas.
function Pastilla({ T, x = 0, y = 0, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(${-abre * 58} ${-abre * 16}) rotate(${-abre * 12})`}>
      <path d="M 0 -52 L -96 -52 A 52 52 0 0 0 -96 52 L 0 52 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d="M -72 -34 A 34 34 0 0 0 -72 34" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={10} strokeLinecap="round" />
    </g>
    <g transform={`translate(${abre * 58} ${abre * 16}) rotate(${abre * 12})`}>
      <path d="M 0 -52 L 96 -52 A 52 52 0 0 1 96 52 L 0 52 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>
  </g>;
}

// Marco de video (el autoexperimento se conoce solo por un video).
function MarcoVideo({ T, x = 0, y = 0, w = 640, h = 380, titulo, pie }) {
  const late = 1 + 0.06 * Math.max(0, Math.sin(T * 3));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={28} fill="#12161f" stroke={KC.ink} strokeWidth={10} />
    <rect x={-w / 2 + 14} y={-h / 2 + 14} width={w - 28} height={h - 76} rx={18} fill="#1d2433" stroke="#3b4255" strokeWidth={5} />
    <g transform={`scale(${late})`}>
      <circle cy={-22} r={62} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={7} />
      <path d="M -22 -50 L 32 -22 L -22 6 Z" fill={KC.texto} />
    </g>
    <rect x={-w / 2 + 30} y={h / 2 - 48} width={(w - 60) * (0.15 + 0.7 * ((T * 0.18) % 1))} height={10} rx={5} fill={KC.red} />
    <rect x={-w / 2 + 30} y={h / 2 - 48} width={w - 60} height={10} rx={5} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} />
    {titulo && <text y={h / 2 - 76} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>}
    {pie && <text y={h / 2 + 62} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{pie}</text>}
  </g>;
}

// Fondo de lunares de la marca (se repite en las escenas macro).
function FondoLunares({ color = KC.pink, paso = 52 }) {
  return <div style={{ position:'absolute', inset:0, background:color,
    backgroundImage:'radial-gradient(circle, rgba(255,255,255,.32) 7px, transparent 8px)', backgroundSize:`${paso}px ${paso}px` }}></div>;
}

Object.assign(window, { LSOMBRA, LAVS, LECHE, CAPSIDE, GEN, VirusAAV, VasoLeche, Biberon, Enzima, Rata, Pastilla, MarcoVideo, FondoLunares });
