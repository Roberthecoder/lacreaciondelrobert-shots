// Shot Biotecnológico #33 · La medicina de un solo bebé (KJ y la edición de bases) — NARRADO (N1 por dentro + toque N6 en pasos).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos y no están a escala.
// Letras del ADN esquemáticas: la variante corregida es c.1003C>T (Q335X) del gen CPS1; el editor regresa la T a C.

const LIV = '#a8433a', LIV2 = '#7f2e27', NH3 = '#c6e86b', PIEL = '#f1b48f', LNP = '#ffd43b', EDIT = '#b18cff', CAS = '#7fd3ff';

function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- frasquito de medicina ---------- */
function Frasco({ x, y, s = 1, etq, sub, liquido = '#ffc2dc', rot = 0, glow = 0, tapa = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {glow > 0 && <circle r={190} fill={KC.gold2} opacity={0.35 * glow} />}
    <rect x={-62} y={-168} width={124} height={44} rx={10} fill={tapa} stroke={KC.ink} strokeWidth={8} />
    <rect x={-44} y={-128} width={88} height={34} fill="#dfe7ee" stroke={KC.ink} strokeWidth={7} />
    <rect x={-92} y={-100} width={184} height={250} rx={32} fill="rgba(235,245,255,.95)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-80} y={0} width={160} height={138} rx={24} fill={liquido} />
    <rect x={-70} y={-86} width={26} height={200} rx={13} fill="rgba(255,255,255,.7)" />
    {etq && <g>
      <rect x={-88} y={-62} width={176} height={104} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-14} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.ink}>{etq}</text>
      <text x={0} y={26} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.magenta}>{sub}</text>
    </g>}
  </g>;
}

/* ---------- cuna y bebé ---------- */
function Cuna({ x, y, w = 560, h = 300 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={20} fill="rgba(255,255,255,.35)" />
    {Array.from({ length: 11 }, (_, i) => <rect key={i} x={-w / 2 + 16 + i * (w - 40) / 10} y={-h + 20} width={10} height={h - 20} rx={5} fill="#f6f3ec" stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-w / 2 - 20} y={-h - 10} width={w + 40} height={30} rx={15} fill="#e9c46a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2 - 20} y={-12} width={w + 40} height={34} rx={15} fill="#e9c46a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2 - 20} y={-h - 10} width={30} height={h + 80} rx={12} fill="#e9c46a" stroke={KC.ink} strokeWidth={8} />
    <rect x={w / 2 - 10} y={-h - 10} width={30} height={h + 80} rx={12} fill="#e9c46a" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function BebeAcostado({ T, x, y, s = 1, manta = KC.pink }) {
  const r = 1 + Math.sin(T * 2.4) * 0.03;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={40} cy={0} rx={150 * r} ry={70 * r} fill={manta} stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -40 Q 40 -70 160 -30" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth={10} strokeLinecap="round" />
    <circle cx={-140} cy={-20} r={66} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -175 -30 q 10 8 20 0 M -130 -30 q 10 8 20 0" fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    <circle cx={-170} cy={0} r={10} fill="#f28e8e" opacity=".7" /><circle cx={-110} cy={0} r={10} fill="#f28e8e" opacity=".7" />
    <path d="M -150 12 q 10 6 20 0" fill="none" stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />
    <path d="M -170 -78 q 20 -26 40 -4" fill="none" stroke="#7a4a2a" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
function NinoParado({ T, x, y, s = 1, camina = 0 }) {
  const b = Math.abs(Math.sin(T * 5)) * 10 * camina, p = Math.sin(T * 5) * 14 * camina;
  return <g transform={`translate(${x} ${y - b}) scale(${s})`}>
    <rect x={-46} y={-130} width={36} height={130} rx={18} fill="#3a6ea5" stroke={KC.ink} strokeWidth={7} transform={`rotate(${p} -28 -130)`} />
    <rect x={10} y={-130} width={36} height={130} rx={18} fill="#3a6ea5" stroke={KC.ink} strokeWidth={7} transform={`rotate(${-p} 28 -130)`} />
    <rect x={-70} y={-300} width={140} height={190} rx={50} fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
    <path d="M -64 -270 Q -130 -220 -120 -150" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <path d="M -64 -270 Q -130 -220 -120 -150" fill="none" stroke={PIEL} strokeWidth={18} strokeLinecap="round" />
    <path d="M 64 -270 Q 140 -300 150 -360" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <path d="M 64 -270 Q 140 -300 150 -360" fill="none" stroke={PIEL} strokeWidth={18} strokeLinecap="round" />
    <circle cx={0} cy={-370} r={78} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-26} cy={-380} r={9} fill={KC.ink} /><circle cx={26} cy={-380} r={9} fill={KC.ink} />
    <path d="M -28 -340 q 28 26 56 0" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <circle cx={-48} cy={-350} r={12} fill="#f28e8e" opacity=".7" /><circle cx={48} cy={-350} r={12} fill="#f28e8e" opacity=".7" />
    <path d="M -40 -440 q 30 -40 70 -6" fill="none" stroke="#7a4a2a" strokeWidth={10} strokeLinecap="round" />
  </g>;
}

/* ---------- hígado, amoniaco, cerebro ---------- */
function Higado({ x, y, s = 1, color = LIV, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -210 -50 Q -190 -140 -40 -130 Q 130 -125 220 -80 Q 250 -55 205 -25 Q 100 40 -20 95 Q -160 140 -210 40 Z" fill={color} stroke={KC.ink} strokeWidth={9} />
    <path d="M -40 -128 Q -20 -20 -40 90" fill="none" stroke={LIV2} strokeWidth={6} />
    <path d="M -170 -70 Q -120 -110 -60 -105" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth={10} strokeLinecap="round" />
  </g>;
}
function NubeNH3({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[[-30, 0, 34], [10, -18, 40], [44, 4, 30], [6, 16, 34]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={NH3} stroke="#6f8f1f" strokeWidth={4} />)}
    <text x={8} y={12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#2f3d0a">NH₃</text>
  </g>;
}
function Cerebro({ T, x, y, s = 1, alarma = 0 }) {
  const p = 1 + alarma * 0.06 * Math.max(0, Math.sin(T * 9));
  return <g transform={`translate(${x} ${y}) scale(${s * p})`}>
    {alarma > 0 && <circle r={230} fill={KC.red} opacity={0.25 * alarma * (0.6 + 0.4 * Math.sin(T * 9))} />}
    <path d="M -170 30 Q -200 -80 -110 -130 Q -40 -190 40 -150 Q 140 -170 180 -80 Q 220 10 150 70 Q 90 120 0 100 Q -110 120 -170 30 Z" fill="#f7a8c4" stroke={KC.ink} strokeWidth={9} />
    {['M -120 -60 q 40 -30 70 10', 'M -40 -120 q 20 40 60 30', 'M 60 -110 q 10 40 60 40', 'M -130 30 q 50 -20 90 20', 'M 20 0 q 40 -30 90 0', 'M -20 60 q 30 -20 70 10'].map((d, i) =>
      <path key={i} d={d} fill="none" stroke="#c86b8f" strokeWidth={7} strokeLinecap="round" />)}
    <path d="M -10 -150 Q 0 -20 -10 100" fill="none" stroke="#c86b8f" strokeWidth={6} />
  </g>;
}

/* ---------- letras del ADN ---------- */
const LCOL = { A:'#7ee787', T:'#ff6b5a', G:'#ffd43b', C:'#5ec8ff' };
function Ficha({ x, y, letra, s = 1, mala = 0, buena = 0, T = 0 }) {
  const borde = buena > 0.5 ? KC.mint : mala > 0 ? KC.red : KC.ink;
  const blink = mala > 0 && buena < 0.5 ? 0.5 + 0.5 * Math.sin(T * 10) : 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {(mala > 0 || buena > 0) && <rect x={-56} y={-66} width={112} height={132} rx={22} fill={buena > 0.5 ? KC.mint : KC.red} opacity={0.35 * blink} />}
    <rect x={-44} y={-54} width={88} height={108} rx={16} fill="#1b2333" stroke={borde} strokeWidth={7} />
    <text x={0} y={22} textAnchor="middle" style={{ font:`700 66px ${KF.mono}` }} fill={LCOL[letra] || '#fff'}>{letra}</text>
  </g>;
}

/* ---------- editor de bases y tijeras ---------- */
function Tijeras({ x, y, s = 1, abre = 0.5 }) {
  const a = 10 + abre * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * a})`}>
      <path d="M 0 0 L 190 -14 L 190 14 Z" fill="#dfe7ee" stroke={KC.ink} strokeWidth={7} transform={`scale(1 ${k})`} />
      <circle cx={-70} cy={k * 34} r={36} fill="none" stroke={KC.red} strokeWidth={16} />
    </g>)}
    <circle r={12} fill={KC.ink} />
  </g>;
}
function Editor({ x, y, s = 1, T = 0, trabaja = 0 }) {
  const m = Math.sin(T * 6) * 4 * trabaja;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -40 Q -160 -150 -40 -160 Q 90 -170 140 -90 Q 170 -30 120 20 Q 40 70 -60 50 Q -140 40 -150 -40 Z" fill={CAS} stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 -100 Q -60 -140 10 -130" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={9} strokeLinecap="round" />
    <g transform={`translate(${120 + m} ${-120})`}>
      <circle r={62} fill={EDIT} stroke={KC.ink} strokeWidth={8} />
      <circle cx={-16} cy={-14} r={10} fill="#fff" /><circle cx={-14} cy={-14} r={5} fill={KC.ink} />
    </g>
    <path d="M -120 10 Q -20 -30 80 0" fill="none" stroke={KC.pink} strokeWidth={10} strokeLinecap="round" />
  </g>;
}

/* ---------- nanopartícula de lípidos y hepatocito ---------- */
function Nanoparticula({ x, y, r = 46, T = 0, seed = 1, o = 1 }) {
  const n = 16;
  return <g transform={`translate(${x} ${y}) rotate(${T * 30 + seed * 40})`} opacity={o}>
    <circle r={r} fill="rgba(255,212,59,.28)" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return <g key={i}>
      <line x1={Math.cos(a) * (r - 14)} y1={Math.sin(a) * (r - 14)} x2={Math.cos(a) * r} y2={Math.sin(a) * r} stroke="#b08a10" strokeWidth={3} />
      <circle cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={7} fill={LNP} stroke={KC.ink} strokeWidth={2.5} /></g>; })}
    <path d={`M ${-r * 0.5} 0 q ${r * 0.25} ${-r * 0.4} ${r * 0.5} 0 t ${r * 0.5} 0`} fill="none" stroke={KC.pink} strokeWidth={5} strokeLinecap="round" />
  </g>;
}
function Hepatocito({ x, y, s = 1, T = 0, brilla = 0 }) {
  const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${Math.cos(a) * 220},${Math.sin(a) * 200}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brilla > 0 && <polygon points={pts} fill={KC.mint} opacity={0.3 * brilla} transform="scale(1.12)" />}
    <polygon points={pts} fill="#d9786c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={10} cy={0} r={70} fill="#7b3f6e" stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 -10 q 20 -20 40 0 t 40 0" fill="none" stroke="#e3b5d8" strokeWidth={5} />
    {[[-140, -60], [-120, 80], [130, 90], [140, -70], [-30, 140]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={26} ry={12} fill="#f2a593" transform={`rotate(${i * 40} ${a} ${b})`} />)}
  </g>;
}

/* ---------- laboratorio y otros ---------- */
function Hielera({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-120} width={340} height={230} rx={24} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    <rect x={-185} y={-150} width={370} height={52} rx={18} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <rect x={-50} y={-176} width={100} height={30} rx={12} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.red}>ÓRGANO</text>
  </g>;
}
function Reloj({ T, x, y, r = 90 }) {
  const a = T * 220, b = T * 18;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => { const t = i * Math.PI / 6; return <line key={i} x1={Math.cos(t) * r * 0.78} y1={Math.sin(t) * r * 0.78} x2={Math.cos(t) * r * 0.9} y2={Math.sin(t) * r * 0.9} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={0} y1={0} x2={Math.sin(a * Math.PI / 180) * r * 0.75} y2={-Math.cos(a * Math.PI / 180) * r * 0.75} stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(b * Math.PI / 180) * r * 0.5} y2={-Math.cos(b * Math.PI / 180) * r * 0.5} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
  </g>;
}
function Calendario({ T, x, y, a, s = 1 }) {
  const hojas = 6, cada = 0.42;
  const n = kclamp(Math.floor((T - a) / cada), 0, hojas);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-170} width={340} height={360} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-170} width={340} height={90} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-100, 100].map((k) => <rect key={k} x={k - 10} y={-200} width={20} height={60} rx={8} fill={KC.ink} />)}
    <text x={0} y={-108} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff">MES</text>
    <text x={0} y={100} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.ink}>{Math.max(1, n)}</text>
    {Array.from({ length: hojas }, (_, i) => { const t0 = a + i * cada, f = kprog(T, t0, t0 + 0.35, kEase.suave);
      if (f <= 0 || f >= 1) return null;
      return <rect key={i} x={-170} y={-80} width={340} height={270} rx={18} fill="#fffdf4" stroke={KC.ink} strokeWidth={6} opacity={1 - f}
        transform={`translate(${f * 160} ${-f * 260}) rotate(${f * 40})`} />; })}
  </g>;
}
function Gota({ x, y, s = 1, color = LNP }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M 0 -40 Q 30 0 24 18 A 25 25 0 1 1 -24 18 Q -30 0 0 -40 Z" fill={color} stroke={KC.ink} strokeWidth={5} />;
}
function Suero({ T, x, y, s = 1, desde = 0 }) {
  const g = ((T - desde) * 1.6) % 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={-260} x2={0} y2={-330} stroke="#6b7280" strokeWidth={10} />
    <path d="M -90 -260 L 90 -260 L 80 -60 Q 0 -20 -80 -60 Z" fill="rgba(235,245,255,.9)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -84 -170 L 84 -170 L 80 -60 Q 0 -20 -80 -60 Z" fill="rgba(255,212,59,.75)" />
    {[[-40, -110], [20, -130], [50, -90]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={13} fill="none" stroke="#b08a10" strokeWidth={4} />)}
    <rect x={-14} y={-46} width={28} height={50} rx={6} fill="#dfe7ee" stroke={KC.ink} strokeWidth={5} />
    {T > desde && <circle cx={0} cy={klerp(10, 80, g)} r={9} fill={LNP} stroke={KC.ink} strokeWidth={3} />}
    <path d="M 0 4 Q 0 160 -160 220" fill="none" stroke="#9aa4ae" strokeWidth={8} />
  </g>;
}
function Plato({ x, y, s = 1, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={190} ry={70} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <ellipse rx={130} ry={44} fill="#f1f1f1" />
    {[[-60, -10, '#f2c14e'], [0, -24, '#c0662f'], [56, -6, '#f6f3ec'], [-20, 10, '#8a5a3b'], [40, 14, '#f2c14e']].map(([a, b, c], i) =>
      i / 5 < lleno ? <ellipse key={i} cx={a} cy={b} rx={44} ry={24} fill={c} stroke={KC.ink} strokeWidth={5} /> : null)}
  </g>;
}
function FrascoMed({ x, y, s = 1, nivel = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-200} width={160} height={50} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-100} y={-150} width={200} height={300} rx={28} fill="rgba(255,255,255,.9)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-88} y={140 - 270 * nivel} width={176} height={270 * nivel} rx={20} fill="#ffb066" />
    <rect x={-96} y={-60} width={192} height={70} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-14} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>medicina</text>
  </g>;
}
function Huella({ x, y, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <ellipse rx={26} ry={44} fill="#3a6ea5" />
    {[-18, -6, 6, 18].map((k, i) => <circle key={i} cx={k} cy={-58 + Math.abs(k) * 0.4} r={8} fill="#3a6ea5" />)}
  </g>;
}
function Revista({ x, y, s = 1, rot = -4 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-190} y={-250} width={380} height={500} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-190} y={-250} width={380} height={110} fill="#c8102e" stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-176} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff">Nature's 10</text>
    <text x={0} y={-80} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>2025</text>
    {Array.from({ length: 10 }, (_, i) => { const cx = -120 + (i % 5) * 60, cy = 0 + Math.floor(i / 5) * 110, kj = i === 2;
      return <g key={i}><circle cx={cx} cy={cy} r={24} fill={kj ? KC.gold2 : '#c9c2b6'} stroke={KC.ink} strokeWidth={kj ? 6 : 3} />
        <rect x={cx - 26} y={cy + 30} width={52} height={40} rx={18} fill={kj ? KC.gold2 : '#c9c2b6'} stroke={KC.ink} strokeWidth={kj ? 6 : 3} /></g>; })}
    <text x={0} y={220} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">dibujo esquemático</text>
  </g>;
}

function BebeKJ() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, KJ: CUES.KJ, Le: CUES.Letra, Pe: CUES.Peligro, Tr: CUES.Trasplante, Se: CUES.Seis, Ed: CUES.Editor, Bu: CUES.Burbujas,
    Pr: CUES.Pregunta, Ca: CUES.Casgevy, Es: CUES.Estudio, Re: CUES.Resultado, Ex: CUES.Extra, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const R = krng(7);
  const estante = Array.from({ length: 18 }, (_, i) => ({ c: i % 6, f: Math.floor(i / 6), d: R() }));
  const sacude = kprog(T, K.G + 0.15, K.G + 1.2, kEase.sale);
  const letras = ['G', 'A', 'G', 'C', 'T', 'A', 'G', 'G', 'A'];
  const cambia = kprog(T, K.Ed + 2.7, K.Ed + 3.1);
  const editorX = klerp(-160, 540, kprog(T, K.Ed + 1.6, K.Ed + 2.6, kEase.sale));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: miles de frascos se van, queda uno */}
      <Escena T={T} a={K.G} b={K.KJ} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa>
          {estante.map(({ c, f, d }, i) => { const x0 = 120 + c * 168, y0 = 700 + f * 220, dir = c < 3 ? -1 : 1;
            return <Frasco key={i} x={x0 + dir * sacude * (700 + d * 300)} y={y0} s={0.5} rot={dir * sacude * 30} tapa="#c9c2b6" liquido="#e3e3e3" />; })}
          <Frasco x={540} y={klerp(1070, 1010, kprog(T, K.G + 0.8, K.G + 1.6, kEase.rebote))} s={klerp(0.6, 1.25, kprog(T, K.G + 0.8, K.G + 1.6, kEase.rebote))} etq="k-abe" sub="para: KJ" glow={kprog(T, K.G + 1.2, K.G + 1.8)} />
        </Capa>
      </Escena>
      {/* 1 · KJ y su hígado */}
      <Escena T={T} a={K.KJ} b={K.Le} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa><Cuna x={500} y={1180} w={700} h={330} /><BebeAcostado T={T} x={500} y={1030} s={1.25} /></Capa>
      </Escena>
      <Lupa T={T} at={K.KJ + 0.4} until={K.Le - 0.3} x={760} y={600} r={220} fx={560} fy={1010} tinte={KC.mint} etiqueta="POR DENTRO · HÍGADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a1416" />
          <Higado x={r} y={r + 10} s={0.8} />
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.KJ + 0.9 + i * 0.3; return <NubeNH3 key={i} x={r - 130 + (i % 4) * 85 + Math.sin(t + i) * 6} y={r - 60 + Math.floor(i / 4) * 90 + Math.cos(t * 1.3 + i) * 6} s={0.7} o={kprog(t, t0, t0 + 0.4)} />; })}
        </svg>} />
      {/* 2 · las letras equivocadas */}
      <Escena T={T} a={K.Le} b={K.Pe} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          {letras.map((l, i) => { const t0 = K.Le + 0.2 + i * 0.08; return <g key={i} opacity={kprog(T, t0, t0 + 0.3)}>
            <Ficha T={T} x={140 + i * 100} y={820} letra={l} s={0.95} mala={i === 4 ? kprog(T, K.Le + 1.0, K.Le + 1.2) : 0} /></g>; })}
          <path d="M 540 900 L 540 960" stroke={KC.red} strokeWidth={6} strokeDasharray="10 8" opacity={kprog(T, K.Le + 1.2, K.Le + 1.5)} />
          <g opacity={kprog(T, K.Le + 1.6, K.Le + 2.0)} transform={`translate(540 1080) rotate(${Math.sin(T * 2) * 4})`}>
            <path d="M -130 -40 Q -140 -110 -40 -110 L 0 -60 L 30 -110 Q 140 -110 130 -30 Q 120 60 0 70 Q -120 60 -130 -40 Z" fill="#8a8f99" stroke={KC.ink} strokeWidth={8} />
            <path d="M 0 -60 L -16 -10 L 14 20 L -6 70" fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            <text x={0} y={-10} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff" opacity=".9">CPS1</text>
          </g>
        </Capa>
      </Escena>
      {/* 3 · peligro: el amoniaco sube */}
      <Escena T={T} a={K.Pe} b={K.Tr} zoom={0.03}>
        <FondoLunares color={KC.coral} />
        <Capa>
          <g opacity={1 - kprog(T, K.Pe + 2.8, K.Pe + 3.3)}>
            <Cerebro T={T} x={420} y={880} s={1.25} alarma={kprog(T, K.Pe + 0.6, K.Pe + 1.6)} />
            {Array.from({ length: 6 }, (_, i) => <NubeNH3 key={i} x={180 + i * 120} y={1120 - ((T - K.Pe) * 60 + i * 50) % 300} s={0.6} o={kprog(T, K.Pe + i * 0.2, K.Pe + i * 0.2 + 0.4)} />)}
          </g>
        </Capa>
      </Escena>
      {/* 4 · trasplante: hay que crecer */}
      <Escena T={T} a={K.Tr} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <Hielera x={290} y={920} s={1} />
          <Higado x={290} y={740 - Math.abs(Math.sin(T * 2)) * 10} s={0.45} />
          <Cuna x={760} y={1150} w={380} h={220} /><BebeAcostado T={T} x={760} y={1060} s={0.75} />
          <g transform="translate(980 1150)"><rect x={-20} y={-520} width={40} height={520} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 11 }, (_, i) => <line key={i} x1={-20} x2={i % 2 ? 0 : 10} y1={-i * 50} y2={-i * 50} stroke={KC.ink} strokeWidth={4} />)}
            <path d={`M -40 ${-klerp(160, 420, kprog(T, K.Tr + 1.2, K.Se - 0.4))} l 30 0`} stroke={KC.red} strokeWidth={10} strokeLinecap="round" /></g>
          <Reloj T={T} x={760} y={720} r={90} />
        </Capa>
      </Escena>
      {/* 5 · seis meses */}
      <Escena T={T} a={K.Se} b={K.Ed} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          <Calendario T={T} x={360} y={900} a={K.Se + 0.3} s={1.1} />
          <Frasco x={800} y={1010} s={0.8} etq="k-abe" sub="para: KJ" glow={kprog(T, K.Se + 2.6, K.Se + 3.0)} />
          <g opacity={kprog(T, K.Se + 2.4, K.Se + 2.7)}><FlechaCurva x1={560} y1={760} x2={740} y2={840} p={kprog(T, K.Se + 2.4, K.Se + 2.9)} color={KC.ink} T={T} /></g>
        </Capa>
      </Escena>
      {/* 6 · el editor de bases (por dentro) */}
      <Escena T={T} a={K.Ed} b={K.Bu} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <ADNHebra T={T} x={60} y={900} largo={960} alto={130} vueltas={4} vel={0.4} resalta={(u) => u > 0.47 && u < 0.53} />
          <g opacity={kprog(T, K.Ed + 0.2, K.Ed + 0.5) * (1 - kprog(T, K.Ed + 1.4, K.Ed + 1.8))}>
            <Tijeras x={540} y={700} s={1.1} abre={0.5 + 0.5 * Math.sin(T * 8)} />
            <line x1={380} y1={600} x2={700} y2={800} stroke={KC.red} strokeWidth={20} strokeLinecap="round" opacity={kprog(T, K.Ed + 0.9, K.Ed + 1.1)} />
          </g>
          {T > K.Ed + 1.5 && <Editor x={editorX} y={860} s={0.9} T={T} trabaja={kprog(T, K.Ed + 2.5, K.Ed + 2.7)} />}
          {['G', 'A', 'G', 'C', 'X', 'A', 'G', 'G', 'A'].map((l, i) => i === 4
            ? <Ficha key={i} T={T} x={140 + i * 100} y={1110} letra={cambia > 0.5 ? 'C' : 'T'} s={0.9} mala={1} buena={cambia} />
            : <Ficha key={i} T={T} x={140 + i * 100} y={1110} letra={l} s={0.9} />)}
          {cambia > 0.5 && <circle cx={540} cy={1110} r={60 + (T - K.Ed - 3.1) * 140} fill="none" stroke={KC.mint} strokeWidth={6} opacity={Math.max(0, 1 - (T - K.Ed - 3.1) * 1.4)} />}
        </Capa>
      </Escena>
      {/* 7 · burbujitas de grasa al hígado */}
      <Escena T={T} a={K.Bu} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Capa>
          <path d="M -20 640 Q 400 600 700 720 Q 900 800 1100 760 L 1100 900 Q 880 950 680 870 Q 380 750 -20 800 Z" fill="#7a1f2b" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Bu) * 0.35 + i / 6) % 1; return <ellipse key={i} cx={klerp(-40, 1100, u)} cy={klerp(720, 830, u) + Math.sin(u * 9) * 10} rx={34} ry={20} fill="#d7263d" stroke={KC.ink} strokeWidth={4} />; })}
          <Hepatocito x={720} y={1000} s={0.8} T={T} brilla={kprog(T, K.Bu + 1.8, K.Bu + 2.4)} />
          {Array.from({ length: 5 }, (_, i) => { const t0 = K.Bu + i * 0.3, u = kprog(T, t0, t0 + 1.5, kEase.suave);
            const x = u < 0.6 ? klerp(-60, 640, u / 0.6) : klerp(640, 700 + (i - 2) * 50, (u - 0.6) / 0.4), y = u < 0.6 ? klerp(700, 770, u / 0.6) : klerp(770, 990 + (i % 2) * 40, (u - 0.6) / 0.4);
            return <Nanoparticula key={i} x={x} y={y} r={u > 0.9 ? klerp(46, 30, (u - 0.9) * 10) : 46} T={T} seed={i} o={u >= 1 ? 0.5 : 1} />; })}
        </Capa>
      </Escena>
      {/* 8 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ca} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <text x={260} y={1060} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 880)`}>?</text>
          <Higado x={290} y={1130} s={0.55} />
        </Capa>
      </Escena>
      {/* 9 · Casgevy (fuera) vs. KJ (dentro) */}
      <Escena T={T} a={K.Ca} b={K.Es} zoom={0.02}>
        <div style={{ position:'absolute', left:0, top:0, width:KW / 2, height:KH, background:KC.cyan }}></div>
        <div style={{ position:'absolute', left:KW / 2, top:0, width:KW / 2, height:KH, background:KC.mint }}></div>
        <Capa>
          <line x1={540} y1={380} x2={540} y2={1220} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 14" />
          {/* fuera: tubo de sangre → laboratorio → de regreso */}
          <g opacity={kprog(T, K.Ca + 0.2, K.Ca + 0.6)}>
            <rect x={90} y={640} width={70} height={220} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={98} y={720} width={54} height={130} rx={24} fill="#d7263d" />
            <ellipse cx={360} cy={760} rx={110} ry={40} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={7} />
            {[[330, 755], [370, 770], [400, 750]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={14} fill="#d7263d" stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Ca + 1 + i * 0.2, K.Ca + 1.3 + i * 0.2)} />)}
            <FlechaCurva x1={170} y1={680} x2={270} y2={720} p={kprog(T, K.Ca + 0.6, K.Ca + 1.1)} color={KC.ink} T={T} />
            <FlechaCurva x1={380} y1={820} x2={190} y2={960} p={kprog(T, K.Ca + 1.8, K.Ca + 2.4)} color={KC.ink} curva={-60} T={T} />
            <g opacity={kprog(T, K.Ca + 2.6, K.Ca + 3.0)}><Gota x={150} y={1080} s={1.4} color="#ff8a1f" />
              <text x={290} y={1100} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>quimio</text></g>
          </g>
          {/* dentro: burbujitas directo al hígado */}
          <g opacity={kprog(T, K.Ca + 0.8, K.Ca + 1.2)}>
            <Higado x={810} y={1000} s={0.75} />
            {Array.from({ length: 4 }, (_, i) => { const u = ((T - K.Ca) * 0.5 + i / 4) % 1; return <Nanoparticula key={i} x={klerp(640, 800, u)} y={klerp(650, 960, u)} r={30} T={T} seed={i} o={1 - u * 0.6} />; })}
          </g>
        </Capa>
      </Escena>
      {/* 10 · el estudio: primera dosis */}
      <Escena T={T} a={K.Es} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Suero T={T} x={300} y={980} s={1} desde={K.Es + 1.0} />
          <Cuna x={600} y={1200} w={560} h={240} /><BebeAcostado T={T} x={620} y={1080} s={0.95} manta={KC.cyan} />
        </Capa>
      </Escena>
      {/* 11 · resultado */}
      <Escena T={T} a={K.Re} b={K.Ex} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <Capa>
          {['feb', 'mar', 'abr'].map((m, i) => { const t0 = K.Re + 0.2 + i * 0.35; return <g key={i} opacity={kprog(T, t0, t0 + 0.3)} transform={`translate(${380 + i * 160} ${klerp(560, 620, kprog(T, t0, t0 + 0.4, kEase.rebote))})`}>
            <Gota x={0} y={0} s={1.3} /><text x={0} y={90} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{m}</text></g>; })}
          <Plato x={300} y={1040} s={1.1} lleno={klerp(0.4, 1.01, kprog(T, K.Re + 1.2, K.Re + 2.4))} />
          <text x={300} y={1170} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>proteína ↑</text>
          <FrascoMed x={790} y={980} s={0.85} nivel={klerp(1, 0.5, kprog(T, K.Re + 1.6, K.Re + 2.8))} />
          <text x={790} y={1170} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>medicina ↓</text>
        </Capa>
      </Escena>
      {/* 12 · extra: camina, habla, Nature's 10 */}
      <Escena T={T} a={K.Ex} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <Revista x={300} y={850} s={kprog(T, K.Ex + 0.6, K.Ex + 1.2, kEase.rebote)} />
          {Array.from({ length: 6 }, (_, i) => <Huella key={i} x={80 + i * 110} y={1790 - (i % 2) * 40} rot={80} o={kprog(T, K.Ex + 0.3 + i * 0.45, K.Ex + 0.5 + i * 0.45)} />)}
          <NinoParado T={T} x={klerp(120, 720, kprog(T, K.Ex, K.Ci, kEase.suave))} y={1800} s={0.55} camina={1} />
        </Capa>
      </Escena>
      {/* 13 · cierre: la misma cuna, ya de pie */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <Cuna x={430} y={1180} w={620} h={330} />
          <NinoParado T={T} x={430} y={1150} s={1.0} camina={0.25} />
          <Frasco x={830} y={1040} s={0.85} etq="k-abe" sub="para: KJ" glow={0.6 + 0.4 * Math.sin(T * 3)} />
        </Capa>
      </Escena>

      {/* pasos (N6) bajo el logo */}
      <Capitulo T={T} hasta={K.Re} caps={[{ at: K.KJ + 0.3, titulo:'diagnóstico' }, { at: K.Se, titulo:'diseño' }, { at: K.Bu, titulo:'entrega' }, { at: K.Es, titulo:'dosis' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 1.6} until={K.KJ - 0.2} texto="hecha para 1 persona" y={1450} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.KJ + 1.4} until={K.Le - 0.3} x={60} y={1450} texto="amoniaco (NH₃): desecho tóxico" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Le + 0.3} until={K.Pe - 0.3} texto="gen CPS1 · letras esquemáticas" y={470} tam={36} borde={KC.red} mono />
      <Etq T={T} at={K.Le + 1.7} until={K.Pe - 0.3} x={720} y={1080} texto="enzima CPS1" tam={34} color={KC.texto} />
      <Medidor T={T} at={K.Pe + 0.3} until={K.Pe + 2.8} valor={(t) => kprog(t, K.Pe + 0.4, K.Pe + 2.3) * 0.92} etiqueta="amoniaco · primeros 2 días"
        texto={(v) => (v > 0.9 ? 'más de 1,000' : kformato(Math.round(v * 1090))) + ' µmol/L'} x={90} y={1430} color={KC.red} />
      <Chip T={T} at={K.Pe + 1.0} until={K.Pe + 2.8} texto="normal: 9–33 µmol/L" y={1600} tam={32} borde={KC.mint} mono />
      <NumeroGigante T={T} at={K.Pe + 3.0} until={K.Tr - 0.3} valor={50} dur={0.5} sufijo=" %" etiqueta="forma grave" x={430} y={900} tam={280} color={KC.yellow} />
      <Chip T={T} at={K.Pe + 3.3} until={K.Tr - 0.3} texto="mortalidad estimada en los primeros meses" y={1450} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Tr + 0.3} until={K.Se - 0.3} texto="lo usual: trasplante de hígado" y={470} tam={40} borde={KC.blue} />
      <Etq T={T} at={K.Tr + 1.4} until={K.Se - 0.3} x={950} y={1450} texto="hay que crecer" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Se + 0.8} until={K.Ed - 0.3} texto="CHOP + Penn · Filadelfia · ~6 meses" y={1450} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Ed + 0.1} until={K.Bu - 0.3} texto="POR DENTRO · ADN de una célula del hígado" y={470} tam={32} borde={KC.cyan} mono />
      <MitoTachado T={T} at={K.Ed + 0.4} tacharEn={K.Ed + 1.0} until={K.Ed + 1.7} texto="corte doble" x={540} y={1450} tam={44} />
      <Etq T={T} at={K.Ed + 2.4} until={K.Bu - 0.3} x={60} y={1450} texto="editor de bases: T → C" tam={36} color={KC.mint} />
      <Etq T={T} at={K.Bu + 0.6} until={K.Pr - 0.2} x={60} y={560} texto="nanopartículas de lípidos" tam={34} color={LNP} />
      <Etq T={T} at={K.Bu + 1.6} until={K.Pr - 0.2} x={60} y={1450} texto="célula del hígado (hepatocito)" tam={34} color={KC.texto} />
      <Chip T={T} at={K.Bu + 0.3} until={K.Pr - 0.2} texto="esquemático · no a escala" y={1620} tam={28} borde={KC.texto} mono />
      <Chip T={T} at={K.Ca + 0.2} until={K.Es - 0.3} texto="FUERA" x={270} y={470} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Ca + 0.8} until={K.Es - 0.3} texto="DENTRO" x={810} y={470} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 0.4} until={K.Es - 0.3} x={40} y={1450} texto="Casgevy · FDA 2023" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.0} until={K.Es - 0.3} x={1040} y={1450} texto="KJ · 2025" lado="izq" tam={32} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Re - 0.3} anio="2025" quien="CHOP + Penn · Filadelfia" revista="NEJM, mayo · 1ª dosis: febrero" x={350} y={600} />
      <Chip T={T} at={K.Re + 2.0} until={K.Ex - 0.3} texto="tres dosis · sin efectos graves" y={1450} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Ex + 0.3} until={K.Ci - 0.3} texto="CHOP, feb 2026: camina y habla" y={1450} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 0.5} until={K.Ou} texto="seguimiento por años" y={1450} tam={38} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.KJ - 0.1} texto="Hecha para *un solo bebé.*" />
      <Subtitulo T={T} idx={1} at={K.KJ + 0.1} until={K.Le - 0.1} texto="Su hígado no limpiaba *el amoniaco.*" />
      <Subtitulo T={T} idx={2} at={K.Le + 0.1} until={K.Pe - 0.1} texto="Letras *equivocadas* en su ADN." />
      <Subtitulo T={T} idx={3} at={K.Pe + 0.1} until={K.Tr - 0.1} texto="Forma grave: *la mitad* muere de bebé." />
      <Subtitulo T={T} idx={4} at={K.Tr + 0.1} until={K.Se - 0.1} texto="Trasplante… *hay que crecer.*" />
      <Subtitulo T={T} idx={5} at={K.Se + 0.1} until={K.Ed - 0.1} texto="Un editor *solo para él.*" />
      <Subtitulo T={T} idx={6} at={K.Ed + 0.1} until={K.Bu - 0.1} texto="No corta: *cambia la letra.*" />
      <Subtitulo T={T} idx={7} at={K.Bu + 0.1} until={K.Pr - 0.1} texto="*Burbujitas de grasa* al hígado." />
      <Subtitulo T={T} idx={8} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="¿Y si se edita *afuera?*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.Es - 0.1} texto="Casgevy: *fuera del cuerpo.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Re - 0.1} texto="KJ: *dentro del cuerpo.*" />
      <Subtitulo T={T} idx={11} at={K.Re + 0.1} until={K.Ex - 0.1} texto="Más proteína, *menos medicina.*" />
      <Subtitulo T={T} idx={12} at={K.Ex + 0.1} until={K.Ci - 0.1} texto="Camina, habla y *Nature lo nombró.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Una medicina *para una persona.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Peligro + 0.5, CUES.Peligro + 4.6, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Seis + 0.4, CUES.Seis + 3.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Casgevy + 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Estudio + 1.0, CUES.Estudio + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Extra + 0.2, CUES.Extra + 4.9, 'avatar_05_sonriendo_dientes_uniformes', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="33" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BebeKJApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BebeKJ /></CompositionStage></div>;
}
window.BebeKJApp = BebeKJApp;
