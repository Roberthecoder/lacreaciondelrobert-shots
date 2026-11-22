// Shot Químico #15 · Ese ardor no es calor (el chile, el agua y la leche) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const NARANJA = '#ff7a12', VERDE_CH = '#2f9e3a', TRP = '#9b5de5', LECHE = '#fbfaf4', LABIO = '#c8323f';

// Habanero: farolito naranja arrugado con tallo verde. mordida 0..1 = mordisco en la punta.
function Habanero({ x, y, s = 1, rot = 0, mordida = 0, color = NARANJA }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -10 -110 Q -30 -150 0 -170 Q 30 -175 40 -150" fill="none" stroke={VERDE_CH} strokeWidth={16} strokeLinecap="round" />
    <path d="M -60 -100 Q 0 -130 60 -100 Q 30 -120 0 -112 Q -30 -120 -60 -100 Z" fill={VERDE_CH} stroke={KC.ink} strokeWidth={6} />
    <path d="M -80 -90 Q -120 -40 -100 30 Q -80 100 -30 130 Q 0 150 20 120 Q 50 140 80 100 Q 120 40 100 -30 Q 90 -90 60 -100 Q 0 -120 -80 -90 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -40 -80 Q -60 0 -30 110 M 20 -95 Q 30 0 10 115 M 70 -70 Q 90 0 60 90" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth={6} />
    <ellipse cx={-50} cy={-40} rx={14} ry={34} fill="#fff" opacity={0.35} />
    {mordida > 0 && <g opacity={mordida}>
      <path d="M -40 100 Q -30 70 -10 92 Q 5 62 25 90 Q 45 66 60 96 L 90 160 L -60 170 Z" fill="#fff6c9" stroke={KC.ink} strokeWidth={6} />
      {[[-10, 120], [20, 128], [5, 140]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={8} ry={5} fill="#f6e3a1" stroke={KC.ink} strokeWidth={2} />)}
    </g>}
  </g>;
}
// Jalapeño: chile verde alargado.
function Jalapeno({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -10 -150 Q -20 -190 10 -200" fill="none" stroke="#2c6b23" strokeWidth={16} strokeLinecap="round" />
    <path d="M -50 -140 Q 0 -165 50 -140 Q 70 0 30 140 Q 10 190 -10 150 Q -60 20 -50 -140 Z" fill={VERDE_CH} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={-20} cy={-60} rx={10} ry={40} fill="#fff" opacity={0.3} />
  </g>;
}
// Llamita "de ardor" (dibujada, cálida).
function Flamita({ T, x, y, s = 1, o = 1, seed = 1 }) {
  if (o <= 0.01) return null;
  const h = 1 + Math.sin(T * 12 + seed * 2) * 0.12;
  return <g transform={`translate(${x} ${y}) scale(${s * o} ${s * o * h})`} opacity={Math.min(1, o * 1.4)}>
    <path d="M 0 0 Q -46 -10 -36 -60 Q -28 -96 0 -130 Q 8 -96 30 -80 Q 50 -50 36 -16 Q 26 0 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -6 Q -24 -12 -18 -46 Q -10 -70 2 -86 Q 8 -60 20 -48 Q 28 -24 16 -10 Z" fill={KC.orange} />
    <path d="M 0 -10 Q -10 -16 -6 -34 Q 0 -46 4 -52 Q 8 -36 12 -28 Q 14 -16 0 -10 Z" fill={KC.yellow} />
  </g>;
}
// Boca abierta de frente con lengua. x, y = centro.
function BocaLengua({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={20} rx={360} ry={280} fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
    <path d="M -270 -20 Q 0 -190 270 -20 Q 0 250 -270 -20 Z" fill={LABIO} stroke={KC.ink} strokeWidth={10} />
    <path d="M -235 -20 Q 0 -150 235 -20 Q 0 200 -235 -20 Z" fill="#5c1420" />
    <path d="M -200 -50 Q 0 -150 200 -50 L 190 -24 Q 0 -110 -190 -24 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -170 40 Q 0 -20 170 40 Q 120 150 0 160 Q -120 150 -170 40 Z" fill="#ef7a8a" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 10 L 0 120" stroke="#c9505f" strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Termómetro chico que no se mueve: "normal".
function TermoChico({ x, y, s = 1, alerta = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-26} y={-220} width={52} height={240} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-90} width={24} height={110} rx={12} fill={KC.red} />
    <circle cx={0} cy={40} r={46} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[-190, -150, -110, -70].map((yy) => <line key={yy} x1={26} x2={46} y1={yy} y2={yy} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-70} y={100} width={140} height={46} rx={23} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={133} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>normal</text>
    {alerta > 0 && <text x={0} y={-240} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={alerta}>?</text>}
  </g>;
}
// Capsaicina esquemática: anillo + OH/OCH3 + amida + cola larga (grasosa). Ancho ≈ 560 a s = 1.
function Capsa({ x, y, s = 1, rot = 0, o = 1, cola = '#f2b705', dobla = 0 }) {
  const hx = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
  const pts = Array.from({ length: 9 }, (_, i) => { const t = i / 8, ang = dobla * t * 2.6; const r = 260 * t;
    return [ -10 + (dobla ? Math.sin(ang) / 2.6 * 260 : r) , (i % 2 ? -26 : 26) + (dobla ? (1 - Math.cos(ang)) / 2.6 * 260 : 0)]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={KC.ink} strokeWidth={30} strokeLinejoin="round" strokeLinecap="round" />
    <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={cola} strokeWidth={18} strokeLinejoin="round" strokeLinecap="round" />
    <line x1={-150} y1={0} x2={-10} y2={26} stroke={KC.ink} strokeWidth={12} />
    <polygon points={hx(-210, 0, 62)} fill="#e9eef7" stroke={KC.ink} strokeWidth={10} />
    <circle cx={-210} cy={0} r={30} fill="none" stroke={KC.ink} strokeWidth={6} />
    <line x1={-240} y1={-54} x2={-260} y2={-96} stroke={KC.ink} strokeWidth={10} />
    <line x1={-180} y1={-54} x2={-160} y2={-96} stroke={KC.ink} strokeWidth={10} />
    <Atomo x={-264} y={-110} r={24} color={QA.O} letra="O" />
    <Atomo x={-156} y={-110} r={24} color={QA.O} letra="O" />
    <Atomo x={-80} y={14} r={26} color={QA.N} letra="N" />
    <Atomo x={-40} y={-50} r={24} color={QA.O} letra="O" />
  </g>;
}
// Membrana con canales TRPV1 (aberturas 0..1). y = centro de la membrana.
function Membrana({ T, y, canales = [], abre = [] }) {
  return <g>
    {Array.from({ length: 28 }, (_, i) => { const x = i * 40 + 10; if (canales.some((c) => Math.abs(c - x) < 70)) return null;
      return <g key={i}><line x1={x} y1={y - 26} x2={x} y2={y + 26} stroke="#f7d27a" strokeWidth={4} />
        <circle cx={x} cy={y - 30} r={15} fill="#ffcf4d" stroke={KC.ink} strokeWidth={3} /><circle cx={x} cy={y + 30} r={15} fill="#ffcf4d" stroke={KC.ink} strokeWidth={3} /></g>; })}
    {canales.map((c, k) => { const a = abre[k] || 0, g = 6 + a * 34; return <g key={k}>
      <rect x={c - g - 52} y={y - 58} width={52} height={116} rx={22} fill={TRP} stroke={KC.ink} strokeWidth={6} />
      <rect x={c + g} y={y - 58} width={52} height={116} rx={22} fill={TRP} stroke={KC.ink} strokeWidth={6} />
      {a > 0.3 && Array.from({ length: 4 }, (_, i) => { const p = ((T * 1.6 + i / 4) % 1); return <circle key={i} cx={c + Math.sin(i * 2 + T * 5) * 6} cy={y - 90 + p * 180} r={9} fill={KC.cyan} opacity={a} />; })}
    </g>; })}
  </g>;
}
// Nervio (rama amarilla) con rayo que viaja. p 0..1 = avance de la señal.
function Nervio({ T, x0, y0, x1, y1, p = -1 }) {
  const d = `M ${x0} ${y0} C ${x0} ${y0 + 220} ${x1} ${y1 - 260} ${x1} ${y1}`;
  const pt = (t) => { const u = 1 - t; const cx = u * u * u * x0 + 3 * u * u * t * x0 + 3 * u * t * t * x1 + t * t * t * x1; const cy = u * u * u * y0 + 3 * u * u * t * (y0 + 220) + 3 * u * t * t * (y1 - 260) + t * t * t * y1; return [cx, cy]; };
  return <g>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
    <path d={d} fill="none" stroke="#ffe38a" strokeWidth={32} strokeLinecap="round" />
    {p >= 0 && p <= 1 && [0, 0.06, 0.12].map((dd, i) => { const [cx, cy] = pt(kclamp(p - dd, 0, 1)); return <circle key={i} cx={cx} cy={cy} r={26 - i * 7} fill={KC.yellow} stroke={KC.orange} strokeWidth={4} opacity={1 - i * 0.3} />; })}
  </g>;
}
// Cerebro esquemático.
function Cerebro({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -150 20 Q -170 -80 -90 -110 Q -40 -150 20 -125 Q 90 -140 130 -90 Q 180 -40 150 30 Q 140 90 60 95 Q 0 110 -60 95 Q -140 90 -150 20 Z" fill="#ff9ec4" stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -40 Q -60 -80 -20 -40 Q 20 0 60 -50 Q 100 -80 120 -20 M -110 30 Q -60 0 -20 40 Q 30 70 80 20" fill="none" stroke="#d45a8a" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Vaso de bebida (x, y = centro de la base).
function Vaso({ x, y, s = 1, liquido = '#cfe9ff', nivel = 0.75, espuma = false, codigo, o = 1, rot = 0 }) {
  const h = 200, wt = 74, wb = 56, yl = -h * nivel, wl = wb + (wt - wb) * nivel;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M ${-wb} 0 L ${-wl} ${yl} L ${wl} ${yl} L ${wb} 0 Z`} fill={liquido} />
    {espuma && <path d={`M ${-wl} ${yl} Q ${-wl / 2} ${yl - 26} 0 ${yl - 8} Q ${wl / 2} ${yl - 30} ${wl} ${yl} Z`} fill="#fffbe8" stroke={KC.ink} strokeWidth={4} />}
    <path d={`M ${-wt} ${-h} L ${-wb} 0 L ${wb} 0 L ${wt} ${-h}`} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {codigo && <g><rect x={-40} y={-80} width={80} height={36} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={3} />
      <text x={0} y={-53} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{codigo}</text></g>}
  </g>;
}
const BEBIDAS = [
  { n: 'agua', c: '#cfe9ff', cod: '418' }, { n: 'con gas', c: '#e3f6ff', cod: '273', gas: 1 }, { n: 'cola', c: '#4a2210', cod: '935', gas: 1 },
  { n: 'cerveza*', c: '#e0a032', cod: '611', espuma: 1 }, { n: 'agua de sabor', c: '#e2264a', cod: '782' },
  { n: 'descremada', c: '#f4f8ff', cod: '154' }, { n: 'entera', c: LECHE, cod: '369' },
];
// Medalla dorada.
function Medalla({ x, y, s = 1, o = 1, T = 0 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.6, 1, o)}) rotate(${Math.sin(T * 2) * 3})`} opacity={o}>
    <path d="M -90 -330 L -30 -150 L 30 -150 L 90 -330 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 -330 L 0 -240 L 30 -330 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle r={190} fill={KC.gold} stroke={KC.ink} strokeWidth={10} />
    <circle r={150} fill={KC.gold2} stroke="#b07a10" strokeWidth={6} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>2021</text>
  </g>;
}

function Chile() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Se: CUES.Sensor, En: CUES.Engano, Ag: CUES.Agua, Pr: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Resultado, Pt: CUES.Proteina, No: CUES.Nobel, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho
  const llega = kprog(T, K.G, K.G + 0.4, kEase.sale);
  const mord = kprog(T, K.G + 0.4, K.G + 0.55);
  const fuego = kprog(T, K.G + 0.6, K.G + 1.4, kEase.sale);
  // micro: membrana y canales
  const MY = 640, C1 = 300, C2 = 640;
  const llamaO = kprog(T, K.Se + 0.8, K.Se + 1.4) * (1 - kprog(T, K.En - 0.4, K.En));
  const abreCalor = kprog(T, K.Se + 1.6, K.Se + 2.0);
  const dock = kprog(T, K.En + 0.3, K.En + 1.4, kEase.suave);
  const abreCaps = kprog(T, K.En + 1.4, K.En + 1.7);
  const abre = T < K.En ? abreCalor : abreCaps;
  const senal = T < K.En ? kprog(T, K.Se + 2.0, K.Se + 3.6) : (kprog(T, K.En + 1.7, K.En + 3.2) + (T > K.Ag ? kprog(T, K.Ag + 0.5, K.Ag + 2.0) : 0)) % 1.0001;
  const enjuague = kprog(T, K.Ag + 0.2, K.Ag + 2.6);
  // ardor
  const ardorAg = klerp(0.9, 0.76, kprog(T, K.Ag + 1.4, K.Ag + 3.2, kEase.suave));
  const ardorCi = klerp(0.9, 0.35, kprog(T, K.Ci + 1.2, K.Ci + 3.6, kEase.suave));
  // resultado: valores esquemáticos (área bajo la curva relativa; agua = referencia)
  const VAL = [1.0, 0.74, 0.79, 0.77, 0.76, 0.57, 0.53, 0.54];
  const NOM = ['sin\nnada', 'agua', 'con\ngas', 'cola', 'cerveza*', 'agua de\nsabor', 'leche\ndescr.', 'leche\nentera'];
  const COL = ['#9aa3b5', '#7fc8ff', '#e3f6ff', '#4a2210', '#e0a032', '#e2264a', '#f4f8ff', LECHE];
  const crece = kprog(T, K.Re + 0.3, K.Re + 1.6, kEase.sale), brilla = kprog(T, K.Re + 2.2, K.Re + 2.7);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mordida al habanero */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <BocaLengua x={560} y={900} s={0.95} />
          {[[480, 915, 0.9], [560, 890, 1.2], [640, 920, 0.95], [525, 950, 0.75], [600, 955, 0.8]].map(([x, y, s], i) => <Flamita key={i} T={T} x={x} y={y} s={s} o={fuego} seed={i} />)}
          <Habanero x={klerp(1180, 860, llega)} y={klerp(700, 860, llega)} s={1.0} rot={klerp(30, -35, llega)} mordida={mord} />
          <TermoChico x={130} y={900} s={0.9} alerta={kprog(T, K.G + 2.0, K.G + 2.4)} />
        </SvgCapa>
        <Onomato T={T} at={K.G + 0.42} until={K.G + 1.3} x={760} y={1120} texto="¡crunch!" color={KC.orange} tam={80} />
      </Escena>
      {/* 1 · la capsaicina: lo que pica en los chiles */}
      <Escena T={T} a={K.Q} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Habanero x={330} y={960} s={1.15} rot={-8 + Math.sin(T * 1.5) * 3} />
          <g opacity={kprog(T, K.Q + 2.4, K.Q + 2.9)} transform={`translate(0 ${klerp(80, 0, kprog(T, K.Q + 2.4, K.Q + 3.0, kEase.sale))})`}><Jalapeno x={790} y={950} s={1.1} rot={18 + Math.sin(T * 1.3) * 3} /></g>
          {[0, 1, 2].map((i) => { const t0 = K.Q + 0.4 + i * 0.5, p = kprog(T, t0, t0 + 1.2, kEase.sale);
            return T > t0 ? <Capsa key={i} x={klerp(330, [560, 300, 820][i], p)} y={klerp(900, [620, 800, 800][i], p)} s={i === 0 ? klerp(0.2, 0.75, p) : klerp(0.1, 0.32, p)} rot={i === 0 ? Math.sin(T) * 5 : T * 20 + i * 90} /> : null; })}
          {T > K.Q + 2.6 && [0, 1].map((i) => { const p = kprog(T, K.Q + 2.8 + i * 0.4, K.Q + 3.8 + i * 0.4, kEase.sale); return <Capsa key={'j' + i} x={klerp(790, [860, 930][i], p)} y={klerp(880, [470, 560][i], p)} s={klerp(0.1, 0.3, p)} rot={-T * 25 + i * 70} />; })}
        </SvgCapa>
        <Etq T={T} at={K.Q + 0.8} until={K.Se - 0.3} x={340} y={1170} texto="habanero" lado="der" tam={32} color={KC.ink} />
        <Etq T={T} at={K.Q + 3.0} until={K.Se - 0.3} x={1020} y={1170} texto="jalapeño" lado="izq" tam={32} color={KC.ink} />
        <Etq T={T} at={K.Q + 1.6} until={K.Se - 0.3} x={640} y={700} texto="cola de carbonos" lado="der" tam={30} color={KC.ink} />
      </Escena>
      {/* 2–4 · por dentro: el sensor TRPV1, la capsaicina y el agua */}
      <Escena T={T} a={K.Se} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={0} width={KW} height={MY - 60} fill="#2a1830" />
          <Nervio T={T} x0={C1} y0={MY + 60} x1={130} y1={1180} p={-1} />
          <Nervio T={T} x0={C2} y0={MY + 60} x1={130} y1={1180} p={senal > 0 && senal < 1 ? senal : -1} />
          <Membrana T={T} y={MY} canales={[C1, C2]} abre={[abre, abre]} />
          <Llama T={T} x={klerp(-120, C1 - 10, kprog(T, K.Se + 0.8, K.Se + 1.5, kEase.sale))} y={MY - 90} s={1.3} o={llamaO} />
          {/* capsaicinas que se pegan a los canales */}
          {T > K.En - 0.2 && [C1, C2].map((c, i) => <Capsa key={i} x={klerp(c + 260 - i * 520, c, dock)} y={klerp(260, MY - 110, dock)} s={0.28} rot={klerp(140, 90, dock) + (dock < 1 ? Math.sin(T * 3) * 10 : 0)} />)}
          {/* capsaicinas sueltas que el agua sí arrastra */}
          {T > K.En && [[820, 300], [900, 450], [470, 360]].map(([x, y], i) => { const p = enjuague; return <Capsa key={'s' + i} x={x - p * 900} y={y + Math.sin(T * 2 + i) * 14 + p * 120} s={0.24} rot={T * 30 + i * 60} o={1 - kprog(p, 0.7, 1)} />; })}
          {T > K.Ag && Array.from({ length: 22 }, (_, i) => { const t0 = K.Ag + 0.2 + i * 0.1, p = kprog(T, t0, t0 + 1.0); return p > 0 && p < 1 ? <circle key={'g' + i} cx={980 - i * 40 - p * 200} cy={140 + p * 400} r={18} fill="#7fc8ff" stroke={KC.ink} strokeWidth={4} opacity={0.9} /> : null; })}
          {/* el cerebro siente fuego */}
          <g opacity={kprog(T, K.En + 2.4, K.En + 2.9) * (1 - kprog(T, K.Ag - 0.2, K.Ag + 0.3))}>
            <Cerebro x={780} y={1080} s={1.1} />
            <circle cx={900} cy={880} r={80} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <Flamita T={T} x={900} y={920} s={0.8} />
            <text x={980} y={830} style={{ font:`400 80px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4}>?</text>
          </g>
          {/* la gota: la capsaicina no se mezcla */}
          <g opacity={kprog(T, K.Ag + 1.0, K.Ag + 1.5)}>
            <path d="M 760 820 Q 900 960 900 1060 A 140 140 0 0 1 620 1060 Q 620 960 760 820 Z" fill="#7fc8ff" stroke={KC.ink} strokeWidth={7} opacity={0.95} />
            {Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2 + T * 0.6; return <Mol key={i} tipo="agua" x={760 + Math.cos(a) * 95} y={1060 + Math.sin(a) * 85} s={0.38} rot={a * 57} />; })}
            <Capsa x={760} y={1050} s={0.22} rot={T * 10} dobla={1} />
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Se + 0.5} until={K.Ag - 0.3} x={C2 + 70} y={MY + 120} texto="TRPV1" lado="der" tam={40} color={TRP === '#9b5de5' ? '#d6b8ff' : TRP} />
        <Etq T={T} at={K.Se + 0.9} until={K.En - 0.3} x={250} y={1000} texto="nervio" lado="der" tam={34} color="#ffe38a" />
        <Etq T={T} at={K.Ag + 1.6} until={K.Pr - 0.2} x={600} y={800} texto="casi insoluble en agua" lado="izq" tam={30} color={KC.texto} />
      </Escena>
      {/* 5 · ¿entonces qué te tomas? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {BEBIDAS.filter((_, i) => i !== 5).map((b, i) => { const x = 120 + i * 140 + (i > 3 ? 0 : 0), p = kprog(T, K.Pr + i * 0.12, K.Pr + 0.4 + i * 0.12, kEase.sale);
            return <Vaso key={i} x={[150, 330, 150, 330, 240, 420][i]} y={[580, 580, 840, 840, 1100, 1100][i] + Math.sin(T * 2 + i) * 10} s={0.9} liquido={b.c} espuma={!!b.espuma} o={p} rot={Math.sin(T * 1.5 + i) * 6} />; })}
          <text x={600} y={1060} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 600 1000)`} opacity={kprog(T, K.Pr, K.Pr + 0.3)}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · 2019, Penn State: 72 personas, siete bebidas */}
      <Escena T={T} a={K.Es} b={K.Re}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={40} y={1080} width={1000} height={40} rx={10} fill="#c98f52" stroke={KC.ink} strokeWidth={7} />
          <Vaso x={110} y={1080} s={0.85} liquido="#d1342b" nivel={0.7} />
          {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={90 + i * 12} cy={940 - (i % 2) * 14} r={7} fill={KC.orange} />)}
          {BEBIDAS.map((b, i) => { const x = 250 + i * 122, t0 = K.Es + 3.0 + i * 0.55, on = kprog(T, t0, t0 + 0.25), prob = kprog(T, t0 + 0.25, t0 + 0.5);
            return <g key={i}>
              <Vaso x={x} y={1080} s={0.72} liquido={b.c} espuma={!!b.espuma} codigo={b.cod} o={klerp(0.35, 1, on)} />
              {on > 0 && <Marca x={x} y={880} ok={true} s={0.4} o={prob} />}
            </g>; })}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.8} anio="2019" quien="Penn State · Nolden, Lenart y Hayes" revista="Physiology & Behavior" x={560} y={640} />
        <NumeroGigante T={T} at={K.Es + 3.0} until={K.Re - 0.3} valor={72} dur={1.0} etiqueta="personas" x={560} y={600} tam={210} color={KC.yellow} />
        <Etq T={T} at={K.Es + 0.6} until={K.Es + 3.0} x={180} y={860} texto="jugo picante" lado="der" tam={30} color={KC.ink} />
      </Escena>
      {/* 7 · resultado: barras de ardor */}
      <Escena T={T} a={K.Re} b={K.Pt}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {(() => { const base = 1100, H = 520, yAgua = base - H * VAL[1] * crece; return <g>
            {VAL.map((v, i) => { const x = 100 + i * 120, h = H * v * crece, gana = i >= 5;
              return <g key={i}>
                <rect x={x - 46} y={base - h} width={92} height={h} fill={COL[i]} stroke={gana && brilla > 0 ? KC.mint : KC.ink} strokeWidth={gana ? 7 + brilla * 5 : 7} />
                <text x={x} y={base + 40} textAnchor="middle" style={{ font:`700 21px ${KF.mono}` }} fill={KC.ink}>{NOM[i].split('\n').map((l, j) => <tspan key={j} x={x} dy={j ? 24 : 0}>{l}</tspan>)}</text>
              </g>; })}
            <line x1={40} x2={1040} y1={yAgua} y2={yAgua} stroke={KC.blue} strokeWidth={5} strokeDasharray="16 12" opacity={kprog(T, K.Re + 1.6, K.Re + 2.0)} />
            <text x={60} y={base - H - 30} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>ardor total (2 min)</text>
            <text x={60} y={base - H - 72} textAnchor="start" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>*sin alcohol · barras esquemáticas</text>
          </g>; })()}
        </SvgCapa>
        <Chip T={T} at={K.Re + 2.4} until={K.Pt - 0.3} texto="solo la leche y el agua de sabor le ganaron al agua" y={1500} tam={28} borde={KC.mint} />
      </Escena>
      {/* 8 · entera = descremada; hipótesis: la proteína */}
      <Escena T={T} a={K.Pt} b={K.No}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Vaso x={250} y={1070} s={1.0} liquido={LECHE} nivel={0.8} />
          <Vaso x={830} y={1070} s={1.0} liquido="#f4f8ff" nivel={0.8} />
          <text x={540} y={1050} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Pt + 0.6, K.Pt + 1.0)}>=</text>
          <g opacity={kprog(T, K.Pt + 2.4, K.Pt + 2.9)}>
            <circle cx={560} cy={660} r={220} fill={KC.noche} stroke={KC.white} strokeWidth={10} />
            {[[430, 580], [660, 550], [520, 780], [680, 740]].map(([x, y], i) => <circle key={i} cx={x + Math.sin(T + i) * 6} cy={y} r={34} fill="#ffe7a0" stroke={KC.ink} strokeWidth={4} />)}
            {[[520, 600], [620, 660], [460, 700]].map(([x, y], i) => <g key={'c' + i} transform={`translate(${x + Math.cos(T * 0.8 + i) * 8} ${y})`}>
              {[[0, 0], [22, 10], [-18, 14], [6, -20], [-10, -14]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r={16} fill="#fff" stroke={KC.ink} strokeWidth={3} />)}
              <Capsa x={30} y={-24} s={0.12} rot={T * 15 + i * 100} o={kprog(T, K.Pt + 3.2 + i * 0.3, K.Pt + 3.6 + i * 0.3)} /></g>)}
          </g>
        </SvgCapa>
        <Etq T={T} at={K.Pt + 0.3} until={K.No - 0.3} x={250} y={1120} texto="entera" lado="der" tam={34} color={KC.ink} />
        <Etq T={T} at={K.Pt + 0.5} until={K.No - 0.3} x={830} y={1120} texto="descremada" lado="izq" tam={34} color={KC.ink} />
        <Etq T={T} at={K.Pt + 3.0} until={K.No - 0.3} x={790} y={600} texto="caseína" lado="der" tam={30} color={KC.texto} />
        <Etq T={T} at={K.Pt + 3.3} until={K.No - 0.3} x={790} y={800} texto="grasa" lado="der" tam={30} color="#ffe7a0" />
        <Chip T={T} at={K.Pt + 3.4} until={K.No - 0.3} texto="hipótesis de los autores" y={1500} tam={38} borde={KC.orange} />
      </Escena>
      {/* 9 · Julius, 1997 · Nobel 2021 */}
      <Escena T={T} a={K.No} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <g opacity={1 - kprog(T, K.No + 3.0, K.No + 3.4)}>
            <Habanero x={300} y={1000} s={0.9} rot={-15} />
            <path d="M 420 980 L 560 980" stroke={KC.ink} strokeWidth={10} /><path d="M 540 960 L 570 980 L 540 1000" fill="none" stroke={KC.ink} strokeWidth={10} />
            <rect x={620} y={910} width={70} height={150} rx={26} fill={TRP} stroke={KC.ink} strokeWidth={7} />
            <rect x={730} y={910} width={70} height={150} rx={26} fill={TRP} stroke={KC.ink} strokeWidth={7} />
            <text x={710} y={1120} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>TRPV1</text>
          </g>
          <Medalla T={T} x={540} y={900} s={1} o={kprog(T, K.No + 3.2, K.No + 3.7, kEase.sale)} />
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.No + 0.2} until={K.No + 3.0} anio="1997" quien="David Julius · San Francisco" revista="Nature · el receptor de la capsaicina" x={540} y={600} />
        <Chip T={T} at={K.No + 3.8} until={K.Ci - 0.3} texto="Nobel de Fisiología o Medicina (compartido)" y={1500} tam={30} borde={KC.gold} />
      </Escena>
      {/* 10 · cierre: la misma boca, ahora con leche */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <BocaLengua x={560} y={900} s={0.95} />
          {[[480, 915, 0.9], [560, 890, 1.2], [640, 920, 0.95], [525, 950, 0.75], [600, 955, 0.8]].map(([x, y, s], i) => <Flamita key={i} T={T} x={x} y={y} s={s} o={1 - 0.75 * kprog(T, K.Ci + 1.2 + i * 0.2, K.Ci + 3.0 + i * 0.2)} seed={i} />)}
          <Habanero x={860} y={860} s={1.0} rot={-35} mordida={1} />
          <Chorro T={T} x0={330} y0={600} x1={500} y1={880} color={LECHE} o={kprog(T, K.Ci + 0.9, K.Ci + 1.2) * (1 - kprog(T, K.Ci + 3.4, K.Ci + 3.8))} ancho={22} />
          <Vaso x={klerp(-100, 260, kprog(T, K.Ci + 0.2, K.Ci + 0.9, kEase.sale))} y={640} s={1.0} liquido={LECHE} nivel={0.7} rot={klerp(0, 95, kprog(T, K.Ci + 0.6, K.Ci + 1.0))} />
          <TermoChico x={130} y={900} s={0.9} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 2.9} texto="es calor" x={330} y={470} tam={46} />
      <Chip T={T} at={K.G + 3.0} until={K.Q - 0.3} texto="es capsaicina" x={330} y={470} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Q + 0.4} until={K.Se - 0.3} texto="capsaicina: lo que pica" y={1500} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.Se + 1.6} until={K.En - 0.3} texto="TRPV1: se abre con calor que quema" y={1500} tam={34} borde={TRP} />
      <Chip T={T} at={K.En + 1.5} until={K.Ag - 0.3} texto="la capsaicina abre el mismo sensor" y={1500} tam={34} borde={TRP} />
      <Medidor T={T} at={K.Ag + 1.2} until={K.Pr - 0.2} valor={ardorAg} etiqueta="ardor" texto={() => 'baja poquito'} y={1460} color={KC.red} />
      <Chip T={T} at={K.Es + 4.0} until={K.Re - 0.3} texto="cada persona probó las 7, una por ronda" y={1500} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.Ci + 3.2} until={K.Ou} texto="capsaicina + TRPV1 = ardor sin fuego" y={1500} tam={36} borde={KC.orange} />
      <Medidor T={T} at={K.Ci + 1.0} until={K.Ci + 3.0} valor={ardorCi} etiqueta="ardor" texto={() => 'baja con leche'} y={1460} color={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es calor: *es capsaicina.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Se - 0.1} texto="La molécula *que pica.*" />
      <Subtitulo T={T} idx={2} at={K.Se + 0.1} until={K.En - 0.1} texto="TRPV1: *sensor del calor.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.Ag - 0.1} texto="Tu cerebro *siente fuego.*" />
      <Subtitulo T={T} idx={4} at={K.Ag + 0.1} until={K.Pr - 0.1} texto="Casi no *se disuelve en agua.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Entonces *qué te tomas?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Re - 0.1} texto="72 personas, *siete bebidas.*" />
      <Subtitulo T={T} idx={7} at={K.Re + 0.1} until={K.Pt - 0.1} texto="La leche *le ganó al agua.*" />
      <Subtitulo T={T} idx={8} at={K.Pt + 0.1} until={K.No - 0.1} texto="Entera = descremada: *¿la proteína?*" />
      <Subtitulo T={T} idx={9} at={K.No + 0.1} until={K.Ci - 0.1} texto="1997: TRPV1. *2021: Nobel.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La leche *lo calma mejor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.4, CUES.Sensor - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Engano + 1.6, CUES.Agua - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Agua + 0.4, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.2, CUES.Resultado - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Resultado + 1.0, CUES.Proteina - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Proteina + 1.4, CUES.Nobel - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Nobel + 3.4, CUES.Cierre - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChileApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Chile /></CompositionStage></div>;
}
window.ChileApp = ChileApp;
