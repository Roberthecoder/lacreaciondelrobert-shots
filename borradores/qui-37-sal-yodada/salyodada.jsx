// Shot Químico #37 · Ese «yodada» en tu sal no es adorno (yodo, tiroides y bocio) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (tiroides, hipófisis, moléculas, bebé).
const YODO = '#8e44ad', YODO2 = '#c39bd3', PIEL = '#f1b48f', PIEL2 = '#d98f6c', TIRO = '#e8505b';

// ---------- piezas del shot ----------
// Paquete de sal genérico (sin marca). hl = brillo de la palabra «yodada».
function PaqueteSal({ x, y, s = 1, hl = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-190} y={-250} width={380} height={500} rx={22} fill="#f6f3ec" stroke={KC.ink} strokeWidth={10} />
    <rect x={-190} y={-250} width={380} height={130} rx={22} fill={KC.blue} stroke={KC.ink} strokeWidth={10} />
    <text x={0} y={-150} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill="#fff">SAL</text>
    <text x={0} y={-62} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>de mesa</text>
    {hl > 0 && <rect x={-170 - hl * 8} y={-30 - hl * 6} width={340 + hl * 16} height={96 + hl * 12} rx={20} fill={KC.yellow} opacity={hl * (0.75 + 0.25 * Math.sin(T * 8))} />}
    <rect x={-160} y={-22} width={320} height={80} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={36} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff">YODADA</text>
    <text x={0} y={120} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>FLUORURADA</text>
    {[-120, -40, 40, 120].map((dx, i) => <rect key={i} x={dx - 22} y={168} width={44} height={44} rx={8} fill="#fff" stroke="#c9c2b4" strokeWidth={4} transform={`rotate(${i * 17} ${dx} 190)`} />)}
  </g>;
}
// Salero de vidrio con tapa de metal. inclina en grados.
function Salero({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d="M -80 -90 L 80 -90 L 70 130 Q 0 150 -70 130 Z" fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -72 0 L 72 0 L 68 126 Q 0 144 -68 126 Z" fill="#fff" />
    {Array.from({ length: 22 }, (_, i) => <rect key={i} x={-60 + (i * 37) % 120} y={14 + (i * 23) % 100} width={7} height={7} fill="#d8d2c6" />)}
    <path d="M -84 -90 L -74 -160 Q 0 -190 74 -160 L 84 -90 Z" fill="#b8c0cc" stroke={KC.ink} strokeWidth={8} />
    {[-30, 0, 30].map((dx) => <circle key={dx} cx={dx} cy={-160 + Math.abs(dx) * 0.1} r={6} fill={KC.ink} />)}
    <rect x={-50} y={-60} width={14} height={160} rx={7} fill="#fff" opacity={0.6} />
  </g>;
}
function Plato({ x, y, s = 1, granos = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={220} ry={56} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-4} rx={150} ry={34} fill="#eef3f8" />
    {granos > 0 && <ellipse cx={0} cy={-8} rx={40 + 60 * granos} ry={10 + 12 * granos} fill="#fbfaf6" stroke="#cfc8bb" strokeWidth={3} />}
  </g>;
}
// Granos que caen del salero.
function Granos({ T, x, y0, y1, desde, hasta, n = 3 }) {
  const out = [];
  for (let k = 0; k < 60; k++) { const t0 = desde + k * 0.06; if (t0 > T || t0 > hasta) break; const u = (T - t0) / 0.45; if (u > 1) continue;
    for (let j = 0; j < n; j++) out.push(<rect key={k + '-' + j} x={x + (j - 1) * 14 + Math.sin(k * 7 + j) * 10} y={klerp(y0, y1, u * u)} width={9} height={9} fill="#fff" stroke="#9a948a" strokeWidth={2} transform={`rotate(${k * 33 + j * 20} ${x} ${y0})`} />); }
  return <g>{out}</g>;
}
// Tiroides esquemática en forma de mariposa. s = tamaño, c = color.
function Mariposa({ x, y, s = 1, c = TIRO, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -8 -10 C -40 -90 -120 -100 -128 -20 C -134 50 -70 92 -10 30 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 8 -10 C 40 -90 120 -100 128 -20 C 134 50 70 92 10 30 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-26} y={-4} width={52} height={34} rx={14} fill={c} stroke={KC.ink} strokeWidth={7} />
    <path d="M -96 -40 Q -80 -60 -60 -56" stroke="#fff" strokeWidth={8} fill="none" opacity={0.5} strokeLinecap="round" />
  </g>;
}
// Busto de frente (persona esquemática, gesto neutro). Origen = centro del cuello. bocio 0..1 = cuello abultado (sin exagerar).
function Busto({ x, y, s = 1, bocio = 0, dentro = 0, crece = 0, hipo = 0, T = 0, pelo = '#3a2618', ropa = KC.teal }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 330 Q -290 120 -120 90 L -60 60 L 60 60 L 120 90 Q 290 120 300 330 Z" fill={ropa} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -64 -120 L -64 70 Q 0 100 64 70 L 64 -120 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    {bocio > 0 && <ellipse cx={0} cy={22} rx={56 + 40 * bocio} ry={26 + 22 * bocio} fill={PIEL} stroke={KC.ink} strokeWidth={8} />}
    {bocio > 0 && <path d={`M ${-30 - 20 * bocio} ${30} Q 0 ${44 + 14 * bocio} ${30 + 20 * bocio} 30`} stroke={PIEL2} strokeWidth={5} fill="none" opacity={0.7} />}
    <ellipse cx={0} cy={-250} rx={130} ry={150} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -132 -260 Q -140 -420 0 -410 Q 140 -420 132 -260 Q 120 -340 0 -350 Q -110 -345 -132 -260 Z" fill={pelo} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-46} cy={-250} r={12} fill={KC.ink} /><circle cx={46} cy={-250} r={12} fill={KC.ink} />
    <path d="M -40 -170 Q 0 -150 40 -170" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    {dentro > 0 && <g opacity={dentro}>
      <rect x={-22} y={-110} width={44} height={170} rx={16} fill="#f3d9cf" stroke="#9a6a5a" strokeWidth={4} />
      {[-90, -60, -30, 0, 30].map((yy) => <line key={yy} x1={-20} y1={yy} x2={20} y2={yy} stroke="#c49a8c" strokeWidth={5} />)}
      <Mariposa x={0} y={20} s={0.42 * (1 + 0.55 * crece)} />
    </g>}
    {hipo > 0 && <g opacity={hipo}>
      <circle cx={0} cy={-235} r={60} fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth={4} strokeDasharray="10 8" />
      <circle cx={0} cy={-210} r={20} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
      {[0, 1, 2].map((k) => { const u = ((T * 0.9) + k / 3) % 1; return <path key={k} d={`M ${-40 - 10 * u} ${-190 + u * 200} Q 0 ${-170 + u * 210} ${40 + 10 * u} ${-190 + u * 200}`} stroke={KC.orange} strokeWidth={8} fill="none" opacity={1 - u} strokeLinecap="round" />; })}
    </g>}
  </g>;
}
// Átomo de yodo (grande: el yodo es un átomo pesado).
function AtI({ x, y, r = 40, o = 1 }) {
  if (o <= 0) return null;
  return <g opacity={Math.min(1, o)} transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, Math.min(1, o))})`}><Atomo x={0} y={0} r={r} color={YODO} letra="I" tam={r * 0.95} />
    <text x={0} y={r * 0.33} textAnchor="middle" style={{ font:`700 ${r * 0.95}px ${KF.mono}` }} fill="#fff">I</text></g>;
}
// Tiroxina (T4) esquemática: 2 anillos, puente de oxígeno, 4 yodos y la cola de aminoácido. on = cuántos yodos (0..4, con decimales).
function Tiroxina({ x, y, s = 1, on = 4, resto = 1, rot = 0 }) {
  const hexa = (cx) => Array.from({ length: 6 }, (_, k) => { const a = (k * 60) * Math.PI / 180; return `${cx + 70 * Math.cos(a)},${70 * Math.sin(a)}`; }).join(' ');
  const yodos = [[-235, -122], [-235, 122], [-5, -122], [-5, 122]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g opacity={resto}>
      <line x1={-270} y1={0} x2={-330} y2={0} stroke={KC.ink} strokeWidth={12} />
      <line x1={-130} y1={0} x2={-10} y2={0} stroke={KC.ink} strokeWidth={12} />
      <line x1={130} y1={0} x2={200} y2={0} stroke={KC.ink} strokeWidth={12} />
      <line x1={200} y1={0} x2={260} y2={-50} stroke={KC.ink} strokeWidth={12} /><line x1={260} y1={-50} x2={330} y2={-10} stroke={KC.ink} strokeWidth={12} />
      <line x1={260} y1={-50} x2={260} y2={-120} stroke={KC.ink} strokeWidth={12} />
      <polygon points={hexa(-200)} fill="#2b2f3a" stroke={KC.ink} strokeWidth={10} /><circle cx={-200} cy={0} r={36} fill="none" stroke="#9aa3b5" strokeWidth={6} />
      <polygon points={hexa(60)} fill="#2b2f3a" stroke={KC.ink} strokeWidth={10} /><circle cx={60} cy={0} r={36} fill="none" stroke="#9aa3b5" strokeWidth={6} />
      <Atomo x={-70} y={0} r={30} color={QA.O} letra="O" />
      <Atomo x={-340} y={0} r={30} color={QA.O} letra="O" /><Atomo x={-382} y={-26} r={18} color={QA.H} letra="H" />
      <Atomo x={200} y={0} r={22} color={QA.C} /><Atomo x={260} y={-50} r={22} color={QA.C} />
      <Atomo x={260} y={-124} r={28} color={QA.N} letra="N" />
      <Atomo x={334} y={-8} r={22} color={QA.C} /><Atomo x={380} y={-50} r={24} color={QA.O} letra="O" /><Atomo x={380} y={36} r={24} color={QA.O} letra="O" />
      {yodos.map(([ix, iy], i) => <line key={i} x1={ix + (i < 2 ? 35 : 30)} y1={iy * 0.5} x2={ix} y2={iy} stroke={KC.ink} strokeWidth={12} opacity={kclamp(on - i, 0, 1)} />)}
    </g>
    {yodos.map(([ix, iy], i) => <AtI key={i} x={ix} y={iy} r={46} o={kclamp((on - i) * 1.6, 0, 1)} />)}
  </g>;
}
// Silueta de una embarazada de perfil (esquemática).
function Embarazada({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -250 Q 40 -260 40 -170 L 30 -100 Q 150 -40 150 80 Q 140 170 40 180 L 40 420 L -60 420 L -70 180 Q -90 40 -60 -100 L -70 -170 Q -100 -250 -40 -250 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <circle cx={-10} cy={-330} r={80} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <path d="M -90 -340 Q -80 -430 10 -415 Q 70 -400 60 -360 Q 0 -390 -50 -350 Q -60 -260 -110 -250 Q -120 -300 -90 -340 Z" fill="#3a2618" stroke={KC.ink} strokeWidth={6} />
    <circle cx={40} cy={-340} r={8} fill={KC.ink} />
    <path d="M -20 -40 Q 40 -10 60 60" stroke={PIEL} strokeWidth={26} fill="none" strokeLinecap="round" />
  </g>;
}
// Bebé en el vientre (esquemático) con su cerebro que se enciende (luz 0..1).
function Bebe({ cx, cy, s = 1, luz = 0, T = 0 }) {
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <ellipse cx={20} cy={50} rx={110} ry={80} fill="#f5c1a5" stroke={KC.ink} strokeWidth={6} transform="rotate(-30 20 50)" />
    <circle cx={-50} cy={-60} r={78} fill="#f5c1a5" stroke={KC.ink} strokeWidth={6} />
    <path d="M -110 -80 Q -100 -140 -40 -136 Q 20 -136 20 -80 Q 10 -50 -50 -48 Q -110 -50 -110 -80 Z" fill={mixHex('#6b5b7a', '#ffd23f', luz)} stroke={KC.ink} strokeWidth={4} />
    {[[-90, -96, -60, -110], [-60, -110, -30, -96], [-30, -96, 0, -110], [-80, -70, -40, -78], [-40, -78, -4, -70]].map(([a, b, c, d], i) =>
      <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${b - 14} ${c} ${d}`} stroke={luz > i / 5 ? '#fff' : 'rgba(255,255,255,.35)'} strokeWidth={4} fill="none" />)}
    <circle cx={-20} cy={-56} r={6} fill={KC.ink} />
    <path d="M 60 110 Q 110 130 130 90" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
function Diente({ x, y, s = 1, brillo = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -90 Q -100 -150 -40 -150 Q 0 -130 40 -150 Q 100 -150 90 -90 Q 84 -20 60 40 Q 50 110 30 110 Q 10 110 6 40 Q 0 20 -6 40 Q -10 110 -30 110 Q -50 110 -60 40 Q -84 -20 -90 -90 Z" fill="#fffdf6" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {brillo > 0 && [[-110, -150], [110, -120], [0, -190]].map(([dx, dy], i) => { const k = brillo * (0.7 + 0.3 * Math.sin(T * 7 + i * 2)); return <path key={i} transform={`translate(${dx} ${dy}) scale(${k})`} d="M 0 -30 L 8 -8 L 30 0 L 8 8 L 0 30 L -8 8 L -30 0 L -8 -8 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />; })}
    <path d="M -60 -110 Q -50 -126 -30 -122" stroke={KC.cyan} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * brillo} />
  </g>;
}
function Bascula({ x, y, s = 1, carga = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={40} width={400} height={110} rx={24} fill="#e9eef4" stroke={KC.ink} strokeWidth={9} />
    <rect x={-90} y={70} width={180} height={56} rx={10} fill="#0d1424" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={113} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.mint}>{(carga).toFixed(3)} kg</text>
    <rect x={-230} y={22} width={460} height={26} rx={12} fill="#b8c0cc" stroke={KC.ink} strokeWidth={7} />
    <g opacity={Math.min(1, carga * 1.5)} transform={`translate(0 ${(1 - carga) * -200})`}>
      <path d="M -150 20 L -130 -260 Q 0 -290 130 -260 L 150 20 Z" fill="#fbfaf6" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      <rect x={-110} y={-200} width={220} height={70} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-150} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill="#fff">1 kg</text>
      <text x={0} y={-60} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>SAL</text>
    </g>
  </g>;
}
function Frasco({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <rect x={-60} y={-110} width={120} height={180} rx={18} fill="#f3e9ff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-10} width={120} height={80} rx={14} fill={YODO2} />
    <rect x={-34} y={-150} width={68} height={44} rx={8} fill={KC.ink} />
    <rect x={-52} y={-90} width={104} height={56} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-52} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={YODO}>NaI</text>
  </g>;
}
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink, w = 12 }) {
  if (p <= 0) return null;
  const X = klerp(x1, x2, p), Y = klerp(y1, y2, p), a = Math.atan2(Y - y1, X - x1);
  return <g><path d={`M ${x1} ${y1} Q ${(x1 + X) / 2 + 60} ${(y1 + Y) / 2} ${X} ${Y}`} stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray="22 16" />
    <path d={`M ${X} ${Y} l ${-34 * Math.cos(a - 0.5)} ${-34 * Math.sin(a - 0.5)} M ${X} ${Y} l ${-34 * Math.cos(a + 0.5)} ${-34 * Math.sin(a + 0.5)}`} stroke={color} strokeWidth={w} strokeLinecap="round" /></g>;
}

function SalYodada() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ti: CUES.Tiroides, Tx: CUES.Tiroxina, Bo: CUES.Bocio, Em: CUES.Embarazo, Pr: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Resultado, Mx: CUES.Mexico, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sacude = Math.sin(T * 18) * 10 * (1 - kprog(T, K.G + 2.4, K.G + 2.8));
  const granosG = kprog(T, K.G + 0.1, K.G + 2.6);
  const hlG = kprog(T, K.G + 1.0, K.G + 1.5);
  const crece = kprog(T, K.Bo + 2.6, K.Bo + 5.0, kEase.suave);
  const yodoNum = Math.max(0, kprog(T, K.Tx + 0.6, K.Tx + 3.0) * 4);
  // puntitos de yodo que viajan por un vaso y entran a la tiroides (interior de la Lupa)
  const interiorTiro = (t, r) => <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#2a0f1a" />
    <path d={`M 0 ${r * 1.55} Q ${r} ${r * 1.35} ${r * 2} ${r * 1.55}`} stroke="#a3172f" strokeWidth={46} fill="none" />
    <rect x={r - 34} y={0} width={68} height={r * 2} rx={20} fill="#f3d9cf" stroke="#9a6a5a" strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={r - 32} y1={i * r / 4} x2={r + 32} y2={i * r / 4} stroke="#c49a8c" strokeWidth={6} />)}
    <Mariposa x={r} y={r * 1.0} s={1.2} />
    {Array.from({ length: 10 }, (_, i) => { const u = ((t - K.Ti) * 0.45 + i / 10) % 1; const lado = i % 2 ? 1 : -1;
      const px = u < 0.5 ? klerp(i % 2 ? r * 2 : 0, r + lado * 60, u * 2) : r + lado * klerp(60, 90, (u - 0.5) * 2);
      const py = u < 0.5 ? klerp(r * 1.55, r * 1.45, u * 2) : klerp(r * 1.45, r * 1.0, (u - 0.5) * 2);
      return <g key={i} opacity={u < 0.85 ? 1 : (1 - u) / 0.15}><circle cx={px} cy={py} r={15} fill={YODO} stroke="#fff" strokeWidth={3} /><text x={px} y={py + 6} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill="#fff">I</text></g>; })}
  </svg>;
  const interiorBebe = (t, r) => <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#3a1020" />
    <circle cx={r} cy={r} r={r * 0.92} fill="#7a2a3e" />
    <Bebe cx={r + 10} cy={r + 30} s={1.0} luz={kprog(t, K.Em + 1.2, K.Em + 4.6)} T={t} />
    {Array.from({ length: 8 }, (_, i) => { const u = ((t - K.Em) * 0.5 + i / 8) % 1; const px = klerp(r * 2 - 10, r - 40, u), py = klerp(r * 0.2 + i * 30, r - 50, u);
      return <circle key={i} cx={px} cy={py} r={12} fill={YODO} stroke="#fff" strokeWidth={3} opacity={u < 0.85 ? 1 : (1 - u) / 0.15} />; })}
  </svg>;
  const R = krng(37);
  const ninas = Array.from({ length: 24 }, (_, i) => ({ x: 170 + (i % 8) * 106, y: 980 + Math.floor(i / 8) * 110, c: [KC.pink, KC.yellow, KC.mint, KC.orange, KC.lilac][Math.floor(R() * 5)] }));
  const barras = kprog(T, K.Re + 0.6, K.Re + 2.0, kEase.sale);
  const balanza = -14 * kprog(T, K.Da + 1.4, K.Da + 2.4, kEase.rebote);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el salero y la palabra «yodada» */}
      <Escena T={T} a={K.G} b={K.Ti} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={0} y={1250} width={KW} height={670} fill="#e7a35a" /><rect x={0} y={1250} width={KW} height={14} fill={KC.ink} />
          <PaqueteSal x={330} y={1000} s={1} hl={hlG} T={T} />
          <Plato x={770} y={1200} s={0.9} granos={granosG} />
          <Granos T={T} x={770} y0={830} y1={1190} desde={K.G + 0.1} hasta={K.G + 2.5} />
          <Salero x={770 + sacude * 0.6} y={820 + Math.abs(sacude)} s={0.95} inclina={170 + sacude} />
        </SvgCapa>
      </Escena>
      {/* 1 · tu tiroides (Lupa por dentro del cuello) */}
      <Escena T={T} a={K.Ti} b={K.Tx}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Busto x={330} y={1120} s={0.95} dentro={kprog(T, K.Ti + 0.3, K.Ti + 0.9)} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Ti + 0.8} until={K.Tx - 0.4} x={740} y={720} r={250} fx={330} fy={1140} interior={interiorTiro} tinte={KC.pink} etiqueta="POR DENTRO · TU CUELLO" />
      {/* 2 · la tiroxina (molecular) */}
      <Escena T={T} a={K.Tx} b={K.Bo}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(195,155,211,.35)" />
        <SvgCapa>
          <Tiroxina x={560} y={860} s={1.15} on={yodoNum} rot={Math.sin(T * 0.8) * 3} />
          {[0, 1, 2, 3].map((i) => T > K.Tx + 0.6 + i * 0.6 && <text key={i} x={300 + i * 160} y={560} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={yodoNum > i ? YODO2 : 'rgba(255,255,255,.2)'} stroke={KC.ink} strokeWidth={4}>{i + 1}</text>)}
        </SvgCapa>
      </Escena>
      {/* 3 · bocio: la hipófisis manda más señal y la tiroides crece */}
      <Escena T={T} a={K.Bo} b={K.Em} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Busto x={480} y={1110} s={1.15} bocio={crece} dentro={0.95} crece={crece} hipo={kprog(T, K.Bo + 1.0, K.Bo + 1.5)} T={T} /></SvgCapa>
      </Escena>
      {/* 4 · embarazo */}
      <Escena T={T} a={K.Em} b={K.Pr}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Embarazada x={300} y={900} s={1.05} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Em + 0.5} until={K.Pr - 0.4} x={760} y={700} r={240} fx={400} fy={960} interior={interiorBebe} tinte={KC.yellow} etiqueta="POR DENTRO · EL BEBÉ" />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Mariposa x={270} y={1050} s={1.3 + 0.05 * Math.sin(T * 5)} />
          <text x={270} y={880} textAnchor="middle" style={{ font:`400 460px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 700)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · Akron, 1917–1919 */}
      <Escena T={T} a={K.Es} b={K.Re}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={90} y={890} width={900} height={360} rx={30} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
          {ninas.map((n, i) => { const e = kprog(T, K.Es + 2.4 + i * 0.04, K.Es + 2.8 + i * 0.04, kEase.rebote); const gota = kprog(T, K.Es + 3.6 + (i % 8) * 0.12, K.Es + 4.0 + (i % 8) * 0.12);
            return e > 0 && <g key={i}><Personita x={n.x} y={n.y + 10} s={1.5 * e} color={n.c} />{gota > 0 && <circle cx={n.x} cy={n.y - 60} r={9} fill={YODO} stroke="#fff" strokeWidth={2} opacity={gota} />}</g>; })}
          {T > K.Es + 3.0 && <Frasco x={klerp(1150, 860, kprog(T, K.Es + 3.0, K.Es + 3.5, kEase.sale))} y={760} s={1} inclina={-25 * kprog(T, K.Es + 3.5, K.Es + 3.8)} />}
        </SvgCapa>
      </Escena>
      {/* 7 · resultado: 27.6 % contra 0.2 % */}
      <Escena T={T} a={K.Re} b={K.Mx}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={0} y={1180} width={KW} height={12} fill={KC.ink} />
          {[[300, 27.6, KC.red, 'sin yodo'], [760, 0.2, KC.mint, 'con yodo']].map(([cx, v, c, et], i) => { const h = Math.max(6, v * 20 * barras);
            return <g key={i}>
              <rect x={cx - 120} y={1180 - h} width={240} height={h} rx={14} fill={c} stroke={KC.ink} strokeWidth={8} />
              <text x={cx} y={1180 - h - 30} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={c} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">{(v * barras).toFixed(1)} %</text>
              <text x={cx} y={1240} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{et}</text>
            </g>; })}
          {[0, 1, 2, 3].map((i) => { const e = kprog(T, K.Re + 2.4 + i * 0.15, K.Re + 2.7 + i * 0.15, kEase.rebote); return e > 0 && <g key={i}><Personita x={210 + i * 60} y={500} s={1.3 * e} color={i === 0 ? KC.red : '#fff'} /></g>; })}
          {T > K.Re + 4.6 && <text x={760} y={1030} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Re + 4.6, K.Re + 5.0)}>2 de cada mil</text>}
        </SvgCapa>
      </Escena>
      {/* 8 · México: NOM-040 */}
      <Escena T={T} a={K.Mx} b={K.Da}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Bascula x={330} y={1060} s={1} carga={kprog(T, K.Mx + 0.3, K.Mx + 1.0, kEase.sale)} T={T} />
          {T > K.Mx + 1.2 && Array.from({ length: 6 }, (_, i) => { const e = kprog(T, K.Mx + 1.2 + i * 0.12, K.Mx + 1.5 + i * 0.12, kEase.rebote); return <AtI key={i} x={230 + (i % 3) * 100} y={720 - Math.floor(i / 3) * 90 + Math.sin(T * 3 + i) * 6} r={30} o={e} />; })}
          {T > K.Mx + 3.4 && <Diente x={790} y={900} s={1.25 * kprog(T, K.Mx + 3.4, K.Mx + 3.9, kEase.rebote)} brillo={kprog(T, K.Mx + 4.0, K.Mx + 4.6)} T={T} />}
        </SvgCapa>
      </Escena>
      {/* 9 · dato: la tiroxina en una balanza */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(195,155,211,.3)" />
        <SvgCapa>
          <path d="M 540 780 L 480 1180 L 600 1180 Z" fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
          <g transform={`rotate(${balanza} 540 780)`}>
            <rect x={160} y={768} width={760} height={24} rx={12} fill="#c8cdd6" stroke={KC.ink} strokeWidth={7} />
            <g transform={`rotate(${-balanza} 260 780)`}>
              <line x1={260} y1={780} x2={260} y2={930} stroke={KC.ink} strokeWidth={6} /><path d="M 130 930 L 390 930 Q 260 1000 130 930 Z" fill="#c8cdd6" stroke={KC.ink} strokeWidth={7} />
              {[[200, 885], [260, 885], [320, 885], [260, 830]].map(([ax, ay], i) => <AtI key={i} x={ax} y={ay} r={34} o={kprog(T, K.Da + 0.3 + i * 0.15, K.Da + 0.6 + i * 0.15)} />)}
            </g>
            <g transform={`rotate(${-balanza} 820 780)`}>
              <line x1={820} y1={780} x2={820} y2={930} stroke={KC.ink} strokeWidth={6} /><path d="M 690 930 L 950 930 Q 820 1000 690 930 Z" fill="#c8cdd6" stroke={KC.ink} strokeWidth={7} />
              {[[740, 900, QA.C], [790, 900, QA.C], [840, 900, QA.C], [890, 900, QA.O], [765, 860, QA.N], [815, 860, QA.C], [865, 860, QA.O]].map(([ax, ay, c], i) =>
                <g key={i} opacity={kprog(T, K.Da + 0.5 + i * 0.08, K.Da + 0.8 + i * 0.08)}><Atomo x={ax} y={ay} r={22} color={c} /></g>)}
              <text x={820} y={820} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>todo lo demás</text>
            </g>
          </g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el mismo salero, ya explicado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={0} y={1250} width={KW} height={670} fill="#e7a35a" /><rect x={0} y={1250} width={KW} height={14} fill={KC.ink} />
          <PaqueteSal x={330} y={1000} s={1} hl={1} T={T} />
          <Plato x={770} y={1200} s={0.9} granos={1} />
          <Salero x={770} y={1010} s={0.95} inclina={0} />
          <Flecha x1={430} y1={960} x2={690} y2={660} p={kprog(T, K.Ci + 0.6, K.Ci + 1.4, kEase.sale)} color={YODO} />
          {T > K.Ci + 1.2 && <Mariposa x={560} y={560} s={0.9 * kprog(T, K.Ci + 1.2, K.Ci + 1.7, kEase.rebote)} c={KC.mint} />}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.9} until={K.G + 2.9} texto="¿adorno?" x={330} y={470} tam={52} />
      <Chip T={T} at={K.G + 3.0} until={K.Ti - 0.2} texto="yodo → tu cuello" x={330} y={470} tam={46} borde={YODO} />
      <Etq T={T} at={K.Ti + 1.6} until={K.Tx - 0.4} x={760} y={1060} texto="tiroides" lado="der" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ti + 2.2} until={K.Tx - 0.3} texto="atrapa el yodo (I) de tu sangre" y={1500} tam={38} borde={YODO} />
      <Chip T={T} at={K.Tx + 0.3} until={K.Bo - 0.2} texto="tiroxina (T4) · C₁₅H₁₁I₄NO₄" y={1500} tam={40} borde={YODO2} mono />
      <Chip T={T} at={K.Bo + 0.2} until={K.Bo + 2.4} texto="poco yodo" x={540} y={460} tam={46} borde={KC.red} />
      <Etq T={T} at={K.Bo + 1.2} until={K.Em - 0.3} x={330} y={760} texto="hipófisis" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Bo + 1.6} until={K.Em - 0.3} texto="señal TSH ↑ → la tiroides crece" y={1500} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Bo + 4.6} until={K.Em - 0.3} texto="bocio" x={820} y={1060} tam={54} borde={KC.red} />
      <Chip T={T} at={K.Em + 1.0} until={K.Pr - 0.3} texto="OMS: yodo → desarrollo del cerebro" y={1500} tam={36} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="1917–1919" quien="Marine y Kimball · Akron, Ohio" revista="Arch Intern Med, 1920" x={600} y={720} />
      <Chip T={T} at={K.Es + 2.8} until={K.Re - 0.3} texto="yoduro de sodio · primavera y otoño" x={540} y={1500} tam={36} borde={YODO} />
      <Chip T={T} at={K.Re + 0.3} until={K.Mx - 0.3} texto="niñas con tiroides normal al inicio" y={1500} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Re + 2.8} until={K.Mx - 0.3} x={470} y={500} texto="1 de cada 4" lado="der" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Mx + 1.0} until={K.Mx + 3.6} texto="20–40 mg de yodo por kilo" x={430} y={470} tam={44} borde={YODO} />
      <Etq T={T} at={K.Mx + 1.6} until={K.Da - 0.3} x={120} y={1210} texto="NOM-040-SSA1-1993" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Mx + 3.8} until={K.Mx + 5.4} texto="flúor → contra la caries" x={430} y={470} tam={44} borde={KC.cyan} />
      <Chip T={T} at={K.Mx + 5.0} until={K.Da - 0.3} texto="no se vende donde el agua ya trae más de 0.7 mg/L de flúor" y={1500} tam={28} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.Da + 1.6} until={K.Ci - 0.3} valor={65} dur={1.2} prefijo="≈ " sufijo=" %" etiqueta="del peso de la tiroxina es yodo" y={1520} tam={130} color={YODO2} />
      <Chip T={T} at={K.Ci + 1.8} until={K.Ou} texto="yodo (I) → tiroxina → tu tiroides" y={1500} tam={38} borde={YODO} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ti - 0.1} texto="«Yodada» *no es adorno.*" />
      <Subtitulo T={T} idx={1} at={K.Ti + 0.1} until={K.Tx - 0.1} texto="Tu tiroides *atrapa el yodo.*" />
      <Subtitulo T={T} idx={2} at={K.Tx + 0.1} until={K.Bo - 0.1} texto="Tiroxina: *4 átomos de yodo.*" />
      <Subtitulo T={T} idx={3} at={K.Bo + 0.1} until={K.Em - 0.1} texto="Sin yodo crece: *el bocio.*" />
      <Subtitulo T={T} idx={4} at={K.Em + 0.1} until={K.Pr - 0.1} texto="Clave para *el cerebro del bebé.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cómo *lo supieron?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Re - 0.1} texto="Akron, 1917: *yodo a niñas.*" />
      <Subtitulo T={T} idx={7} at={K.Re + 0.1} until={K.Mx - 0.1} texto="27.6 % contra *0.2 %.*" />
      <Subtitulo T={T} idx={8} at={K.Mx + 0.1} until={K.Da - 0.1} texto="México: *20 a 40 mg por kilo.*" />
      <Subtitulo T={T} idx={9} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Casi *2/3 son yodo.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Química *para tu cuello.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tiroides + 1.2, CUES.Tiroxina - 0.4, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Bocio + 0.8, CUES.Embarazo - 0.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 1.1, CUES.Resultado - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Resultado + 0.9, CUES.Mexico - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Mexico + 0.9, CUES.Dato - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 0.3, CUES.Cierre - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="37" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SalYodadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SalYodada /></CompositionStage></div>;
}
window.SalYodadaApp = SalYodadaApp;
