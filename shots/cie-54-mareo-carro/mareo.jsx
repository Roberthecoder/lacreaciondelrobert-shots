// Shot Científico #54 · Por qué te mareas en el carro — NARRADO (N1 "Por dentro": oído interno contra ojos).
// Datos: conflicto sensorial (CDC Yellow Book 2026; Golding 2006), hipótesis del veneno (Treisman 1977), control del conductor
// (Rolnick y Lubow 1991), consejos y edades (CDC 2026; NHS). Ver guion.md y verificacion.md.
const PVERDE = '#b9d98c', PVERDE2 = '#8fb865', CEREBRO = '#f6a5c0', LIQ = KC.cyan;

// Carro de lado mirando a la derecha. (x, y) = piso entre las llantas. nino: 'mareado' | 'bien'. T mueve llantas.
function Carro({ x, y, s = 1, T = 0, rot = 0, nino = 'mareado', libro = 1, color = KC.yellow }) {
  const g = nino === 'mareado';
  const rueda = (cx) => <g transform={`translate(${cx} -10) rotate(${T * 420})`}>
    <circle r={78} fill="#26262e" stroke={KC.ink} strokeWidth={9} /><circle r={38} fill="#cfd6e0" stroke={KC.ink} strokeWidth={7} />
    {[0, 60, 120].map((a) => <line key={a} x1={-34} y1={0} x2={34} y2={0} stroke={KC.ink} strokeWidth={6} transform={`rotate(${a})`} />)}</g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id="ventTras"><path d="M -262 -190 L -205 -322 L -40 -322 L -40 -190 Z" /></clipPath>
      <clipPath id="ventDel"><path d="M -10 -190 L -10 -322 L 140 -322 L 232 -190 Z" /></clipPath></defs>
    <path d="M -310 -180 L -235 -350 L 160 -350 L 270 -180 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -262 -190 L -205 -322 L -40 -322 L -40 -190 Z" fill="#bfeaff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -10 -190 L -10 -322 L 140 -322 L 232 -190 Z" fill="#bfeaff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g clipPath="url(#ventTras)">
      <CabezaPerfil x={-140} y={-225} s={0.5} piel={g ? PVERDE : CPIEL} gesto={g ? 'mueca' : 'sonrie'} />
      {g && libro > 0 && <g transform="translate(-58 -168) rotate(-25)" opacity={libro}><rect x={-38} y={-52} width={76} height={92} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-50} x2={0} y2={38} stroke={KC.ink} strokeWidth={4} /></g>}
    </g>
    <g clipPath="url(#ventDel)"><CabezaPerfil x={60} y={-225} s={0.45} pelo="#5a3a22" /></g>
    <rect x={-430} y={-200} width={860} height={210} rx={60} fill={color} stroke={KC.ink} strokeWidth={10} />
    <line x1={-25} y1={-190} x2={-25} y2={0} stroke={KC.ink} strokeWidth={6} />
    <rect x={370} y={-150} width={50} height={36} rx={12} fill="#fff6c2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-428} y={-150} width={34} height={40} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {rueda(-250)}{rueda(260)}
  </g>;
}
// Árbol de paisaje que pasa.
function Arbol({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-14} y={-90} width={28} height={100} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-150} r={80} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} /></g>;
}
// Carretera en curvas que avanza (franja abajo) + árboles que pasan.
function Paisaje({ T, y = 1130, vel = 260, arboles = true }) {
  const xs = [0, 1, 2, 3, 4].map((i) => ((i * 300 - T * vel) % 1500 + 1500) % 1500 - 210);
  return <g>
    {arboles && xs.map((ax, i) => <Arbol key={i} x={ax} y={y - 250} s={0.7 + 0.15 * (i % 2)} />)}
    <rect x={-20} y={y - 70} width={KW + 40} height={190} fill="#4a4d5c" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 8 }, (_, i) => { const dx = ((i * 180 - T * vel * 1.6) % 1440 + 1440) % 1440 - 180; return <rect key={i} x={dx} y={y + 18} width={100} height={16} rx={8} fill={KC.yellow} />; })}
  </g>;
}
// Estómago (frijol rosa).
function Estomago({ x, y, s = 1, sacude = 0, T = 0 }) {
  const d = sacude * Math.sin(T * 40) * 6;
  return <g transform={`translate(${x + d} ${y}) scale(${s})`}>
    <path d="M -30 -110 C -30 -60 -10 -50 30 -60 C 110 -80 140 10 90 70 C 40 130 -110 120 -120 40 C -128 -20 -80 -50 -60 -60 C -60 -80 -60 -100 -60 -110 Z" fill="#ff8fab" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -60 10 C -20 40 40 40 70 0" fill="none" stroke="#d65a7d" strokeWidth={7} strokeLinecap="round" />
  </g>;
}
// Cerebro de lado.
function Cerebro({ x, y, s = 1, T = 0, sacude = 0, color = CEREBRO }) {
  const d = sacude * Math.sin(T * 38) * 7;
  return <g transform={`translate(${x + d} ${y}) scale(${s})`}>
    <path d="M -170 10 C -190 -80 -120 -150 -40 -150 C 0 -175 80 -170 120 -130 C 180 -110 200 -40 175 10 C 190 60 150 110 90 105 C 60 135 -10 130 -40 110 C -110 125 -170 80 -170 10 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {['M -120 -40 C -90 -80 -50 -60 -60 -20', 'M -20 -120 C 10 -90 -10 -60 20 -40', 'M 60 -110 C 40 -70 90 -60 80 -20', 'M 130 -40 C 100 -10 140 20 110 50',
      'M -110 50 C -70 30 -40 70 -10 50', 'M 20 20 C 50 0 70 40 40 70'].map((p, i) => <path key={i} d={p} fill="none" stroke="#c9577d" strokeWidth={8} strokeLinecap="round" />)}
    <path d="M 40 110 C 50 150 70 170 60 200" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M 40 110 C 50 150 70 170 60 200" fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" />
  </g>;
}
// Chispas amarillas alrededor de un punto (choque de mensajes).
function Chispas({ T, x, y, r = 230, n = 8, p = 1 }) {
  if (p <= 0) return null;
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2 + 0.3, on = Math.sin(T * 11 + i * 2.1) > -0.2, rr = r + 20 * Math.sin(T * 9 + i);
    return on && <path key={i} d="M 0 -26 L 10 -6 L -6 4 L 4 26" transform={`translate(${x + Math.cos(a) * rr} ${y + Math.sin(a) * rr}) rotate(${a * 57.3 + 90}) scale(1.6)`} fill="none" stroke={KC.yellow} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />; })}</g>;
}
// Ojo de frente. mira: desplazamiento de la pupila.
function OjoIcono({ x, y, s = 1, mira = [0, 0], parpadeo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 Q 0 -90 110 0 Q 0 90 -110 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={mira[0]} cy={mira[1]} r={40} fill={KC.teal} stroke={KC.ink} strokeWidth={6} /><circle cx={mira[0]} cy={mira[1]} r={18} fill={KC.ink} /><circle cx={mira[0] + 12} cy={mira[1] - 12} r={7} fill="#fff" />
    {parpadeo > 0 && <path d={`M -112 0 Q 0 ${-90 + 180 * parpadeo} 112 0 Q 0 -90 -112 0 Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />}
  </g>;
}
// Oreja.
function OrejaIcono({ x, y, s = 1, color = CPIEL }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 90 C -90 60 -90 -20 -70 -60 C -40 -120 60 -120 80 -50 C 95 0 50 20 40 50 C 30 80 20 110 -10 110 C -25 110 -35 100 -40 90 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -30 40 C -50 0 -40 -50 0 -60 C 40 -65 50 -20 20 0 C 0 15 10 40 -10 50" fill="none" stroke={CPIEL2} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Globo de diálogo (svg). cola: 'izq' | 'der' | 'abajo-izq' | 'abajo-der'.
function Globo({ x, y, w = 420, h = 130, texto, color = '#fff', borde = KC.ink, tam = 48, cola = 'abajo-izq', s = 1, rot = 0 }) {
  const cx = cola === 'abajo-der' ? w * 0.25 : -w * 0.25;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M ${cx - 30} ${h / 2 - 4} L ${cx + (cola === 'abajo-der' ? 50 : -50)} ${h / 2 + 70} L ${cx + 40} ${h / 2 - 4} Z`} fill={color} stroke={borde} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={color} stroke={borde} strokeWidth={8} />
    <rect x={cx - 26} y={h / 2 - 14} width={62} height={16} fill={color} />
    <text x={0} y={tam * 0.36} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Oído interno: tres canales semicirculares con líquido que se mece + caracol. (cx, cy) centro; mov = cuánto se mece.
function OidoInterno({ cx, cy, s = 1, T = 0, mov = 1 }) {
  const ola = Math.sin(T * 2.6) * 70 * mov;
  const canal = (d, k) => <g key={k}>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
    <path d={d} fill="none" stroke="#f3dcb4" strokeWidth={22} strokeLinecap="round" />
    <path d={d} fill="none" stroke={LIQ} strokeWidth={12} strokeLinecap="round" strokeDasharray="34 26" strokeDashoffset={ola + k * 17} />
  </g>;
  const pts = []; for (let i = 0; i <= 70; i++) { const a = i / 70 * Math.PI * 4.6, r = 62 * Math.exp(-a * 0.17); pts.push(`${(70 + Math.cos(a) * r).toFixed(1)},${(85 + Math.sin(a) * r).toFixed(1)}`); }
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    {canal('M -40 0 C -60 -150 60 -170 50 -20', 0)}
    {canal('M -40 10 C -190 -10 -170 -140 -60 -90', 1)}
    {canal('M 30 10 C 160 -40 170 80 50 60', 2)}
    <ellipse cx={0} cy={10} rx={62} ry={44} fill="#f3dcb4" stroke={KC.ink} strokeWidth={8} />
    <polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <polyline points={pts.join(' ')} fill="none" stroke="#f7b7c8" strokeWidth={18} strokeLinecap="round" />
  </g>;
}
// Volante con manos. giro en grados.
function Volante({ x, y, r = 230, giro = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={56} /><circle r={r} fill="none" stroke="#3a3f5c" strokeWidth={38} />
    {[90, 210, 330].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * r} y2={Math.sin(a * Math.PI / 180) * r} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />)}
    {[90, 210, 330].map((a) => <line key={'b' + a} x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * (r - 10)} y2={Math.sin(a * Math.PI / 180) * (r - 10)} stroke="#555a75" strokeWidth={20} strokeLinecap="round" />)}
    <circle r={62} fill="#555a75" stroke={KC.ink} strokeWidth={9} />
    {[-1, 1].map((sg) => <g key={sg} transform={`translate(${sg * r * 0.94} ${-r * 0.3})`}>
      <rect x={-48} y={-58} width={96} height={116} rx={40} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      {[-30, -2, 26].map((yy) => <line key={yy} x1={sg * -10} y1={yy} x2={sg * 40} y2={yy} stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />)}
      <rect x={-40} y={50} width={80} height={140} rx={24} fill={KC.blue} stroke={KC.ink} strokeWidth={8} transform={`rotate(${sg * -25} 0 50)`} />
    </g>)}
  </g>;
}
// Carretera vista desde el parabrisas: curva cuya dirección es c (-1..1).
function CaminoFrente({ T, c = 0, y0 = 360, y1 = 860 }) {
  const cxTop = 540 + c * 330, mid = 540 + c * 110;
  const bordeI = `M 120 ${y1} Q ${mid - 160} ${(y0 + y1) / 2} ${cxTop - 26} ${y0}`, bordeD = `M 960 ${y1} Q ${mid + 160} ${(y0 + y1) / 2} ${cxTop + 26} ${y0}`;
  const centro = `M 540 ${y1} Q ${mid} ${(y0 + y1) / 2} ${cxTop} ${y0}`;
  return <g>
    <rect x={0} y={y0 - 260} width={KW} height={260} fill="#9fe3ff" />
    <rect x={0} y={y0} width={KW} height={y1 - y0} fill={KC.leaf} />
    <path d={`${bordeI} L ${cxTop + 26} ${y0} Q ${mid + 160} ${(y0 + y1) / 2} 960 ${y1} Z`} fill="#4a4d5c" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={centro} fill="none" stroke={KC.yellow} strokeWidth={12} strokeDasharray="40 36" strokeDashoffset={-T * 260} />
  </g>;
}
// Barco, avión y lentes de realidad virtual.
function Barco({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2.4) * 14}) rotate(${Math.sin(T * 2.4 + 1) * 8}) scale(${s})`}>
    <line x1={0} y1={-40} x2={0} y2={-260} stroke={KC.ink} strokeWidth={12} />
    <path d="M 10 -250 L 150 -60 L 10 -60 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -10 -220 L -120 -70 L -10 -70 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -200 -40 L 200 -40 L 150 50 L -150 50 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
function Olas({ T, y, color = '#2346ff' }) {
  let d = `M -20 ${y}`; for (let x = -20; x <= KW + 40; x += 20) d += ` L ${x} ${y + Math.sin(x / 60 + T * 3) * 16}`;
  return <path d={`${d} L ${KW + 40} ${y + 170} L -20 ${y + 170} Z`} fill={color} stroke={KC.ink} strokeWidth={8} opacity={0.9} />;
}
function Avion({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 0 L 60 -150 L 100 -150 L 60 0 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -40 10 L 60 150 L 100 150 L 60 10 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -200 -30 L 170 -30 C 230 -30 230 40 170 40 L -200 40 C -230 40 -230 -30 -200 -30 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d="M -200 -30 L -230 -110 L -170 -110 L -140 -30 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-100, -50, 0, 50, 100].map((wx) => <circle key={wx} cx={wx} cy={0} r={11} fill="#bfeaff" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function LentesVR({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 3) * 6}) scale(${s})`}>
    <path d="M -230 -10 C -300 -10 -300 60 -230 60" fill="none" stroke={KC.ink} strokeWidth={18} />
    <path d="M 230 -10 C 300 -10 300 60 230 60" fill="none" stroke={KC.ink} strokeWidth={18} />
    <rect x={-230} y={-90} width={460} height={200} rx={50} fill="#2a2d3a" stroke={KC.ink} strokeWidth={10} />
    <rect x={-200} y={-60} width={400} height={140} rx={36} fill={KC.violet} />
    <circle cx={-90} cy={10} r={42} fill={KC.lilac} opacity={0.6 + 0.4 * Math.sin(T * 6)} /><circle cx={90} cy={10} r={42} fill={KC.lilac} opacity={0.6 + 0.4 * Math.sin(T * 6 + 1)} />
  </g>;
}
function Control({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -50 C -60 -70 60 -70 150 -50 C 210 -30 220 90 160 100 C 110 110 90 40 40 40 L -40 40 C -90 40 -110 110 -160 100 C -220 90 -210 -30 -150 -50 Z" fill="#cfd6e0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-115} y={-20} width={60} height={20} rx={6} fill={KC.ink} /><rect x={-95} y={-40} width={20} height={60} rx={6} fill={KC.ink} />
    {[[90, -30, KC.red], [125, -5, KC.yellow], [90, 20, KC.mint], [55, -5, KC.cyan]].map(([bx, by, c], i) => <circle key={i} cx={bx} cy={by} r={13} fill={c} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Espiral de mareo (sobre la cabeza).
function Espiral({ x, y, T, s = 1, o = 1, color = KC.leaf }) {
  const pts = []; for (let i = 0; i <= 50; i++) { const a = i / 50 * Math.PI * 4, r = 4 + i * 0.9; pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`); }
  return <g transform={`translate(${x} ${y}) rotate(${T * 220}) scale(${s})`} opacity={o}><polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={11} strokeLinecap="round" /><polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" /></g>;
}
// Tarjeta de consejo (svg).
function Consejo({ x, y, p, texto, icono, ok = 0 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x + (1 - p) * 700} ${y})`} opacity={p}>
    <rect x={-470} y={-110} width={940} height={220} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <circle cx={-360} cy={0} r={82} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(-360 0)">{icono}</g>
    <text x={-250} y={18} style={{ font:`900 50px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {ok > 0 && <g transform={`translate(400 0) scale(${ok})`}><circle r={44} fill={KC.mint} stroke={KC.ink} strokeWidth={7} /><path d="M -20 0 L -5 18 L 22 -16" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>}
  </g>;
}

function MareoCarro() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const balanceo = Math.sin(T * 2.3) * 5;
  // dirección de la curva para el conductor: el volante se adelanta a la curva (anticipa)
  const curva = (t) => Math.sin((t - K.Conductor) * 1.3);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: niño leyendo atrás, carro en curvas, cara verde */}
      <Escena T={T} a={K.Gancho} b={K.Oido}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Paisaje T={T} y={1150} />
          <Carro x={540} y={1090} s={1.05} T={T} rot={balanceo} />
          <Espiral x={400} y={690} T={T} s={1.1} o={kprog(T, K.Gancho + 0.2, K.Gancho + 0.6)} />
          <Espiral x={510} y={665} T={T + 1} s={0.8} o={kprog(T, K.Gancho + 0.5, K.Gancho + 0.9)} />
          {T > K.Gancho + 2.4 && <g opacity={kprog(T, K.Gancho + 2.4, K.Gancho + 2.8)}>
            <Estomago x={250} y={440} s={0.9} T={T} sacude={1 - kprog(T, K.Gancho + 3.2, K.Gancho + 3.6)} />
            <g transform={`translate(250 440) scale(${kprog(T, K.Gancho + 3.0, K.Gancho + 3.3, kEase.rebote)})`}><path d="M -110 -110 L 110 110 M 110 -110 L -110 110" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" /><path d="M -110 -110 L 110 110 M 110 -110 L -110 110" stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g>
          </g>}
          {T > K.Gancho + 4.5 && <g opacity={kprog(T, K.Gancho + 4.5, K.Gancho + 4.9)}>
            <Cerebro x={760} y={520} s={0.95} T={T} sacude={0.6} />
            <Chispas T={T} x={760} y={500} r={200} n={7} />
            <FlechaRecta x1={560} y1={760} x2={660} y2={620} p={kprog(T, K.Gancho + 4.9, K.Gancho + 5.3, kEase.sale)} color={LIQ} />
            <FlechaRecta x1={980} y1={780} x2={870} y2={640} p={kprog(T, K.Gancho + 5.2, K.Gancho + 5.6, kEase.sale)} color={KC.yellow} />
          </g>}
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 2.5} tacharEn={K.Gancho + 3.0} until={K.Oido - 0.2} texto="tu estómago" x={250} y={610} tam={42} />
        <Chip T={T} at={K.Gancho + 4.6} until={K.Oido - 0.2} texto="tu cerebro: 2 mensajes" x={700} y={300} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 1 · el oído interno: sistema vestibular */}
      <Escena T={T} a={K.Oido} b={K.Ojos}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g transform={`rotate(${balanceo * 1.2} 470 1100)`}><CabezaPerfil x={470} y={860} s={1.4} piel={PVERDE} gesto="mueca" /></g>
        </Lienzo>
        <Lupa T={T} at={K.Oido + 0.5} until={K.Ojos - 0.25} x={720} y={470} r={210} fx={365} fy={874} tinte={KC.yellow} etiqueta="POR DENTRO · OÍDO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" /><OidoInterno cx={r} cy={r + 20} s={1.15} T={t} /></svg>} />
        <Etq T={T} at={K.Oido + 2.0} until={K.Ojos - 0.3} x={1050} y={1110} texto="sistema vestibular" lado="izq" color={KC.texto} tam={40} />
        <Chip T={T} at={K.Oido + 1.2} until={K.Ojos - 0.3} texto="siente el movimiento" x={330} y={330} tam={38} borde={KC.yellow} />
      </Escena>
      {/* 2 · los ojos ven el libro quieto */}
      <Escena T={T} a={K.Ojos} b={K.Choque}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <rect x={60} y={360} width={960} height={330} rx={40} fill="#9fe3ff" stroke={KC.ink} strokeWidth={10} />
          <g style={{ clipPath:'inset(0)' }}>{[0, 1, 2, 3].map((i) => { const ax = ((i * 300 - T * 520) % 1200 + 1200) % 1200 - 100; return ax > 40 && ax < 1040 ? <Arbol key={i} x={ax} y={670} s={0.75} /> : null; })}</g>
          {[0, 1, 2].map((i) => <line key={i} x1={120 + ((i * 260 + T * 900) % 800)} y1={430 + i * 70} x2={200 + ((i * 260 + T * 900) % 800)} y2={430 + i * 70} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.8} />)}
          <OjoIcono x={380} y={820} s={0.9} mira={[0, 26]} parpadeo={T > K.Ojos + 2.0 && T < K.Ojos + 2.2 ? 1 : 0} />
          <OjoIcono x={700} y={820} s={0.9} mira={[0, 26]} parpadeo={T > K.Ojos + 2.0 && T < K.Ojos + 2.2 ? 1 : 0} />
          <g transform={`translate(540 ${1080 + (1 - kprog(T, K.Ojos + 0.3, K.Ojos + 0.8, kEase.rebote)) * 500})`}>
            <path d="M -260 -100 L 0 -70 L 260 -100 L 260 100 L 0 130 L -260 100 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
            <line x1={0} y1={-70} x2={0} y2={130} stroke={KC.ink} strokeWidth={7} />
            {[-50, -10, 30, 70].map((yy) => <g key={yy}><line x1={-220} y1={yy - 20} x2={-40} y2={yy - 10} stroke="#9a9a9a" strokeWidth={8} /><line x1={40} y1={yy - 10} x2={220} y2={yy - 20} stroke="#9a9a9a" strokeWidth={8} /></g>)}
          </g>
        </Lienzo>
        <Chip T={T} at={K.Ojos + 1.0} until={K.Choque - 0.2} texto="quieto frente a ti" x={540} y={1200} tam={38} borde={KC.ink} />
      </Escena>
      {/* 3 · el choque: oído «nos movemos» / ojos «estamos quietos» */}
      <Escena T={T} a={K.Choque} b={K.Teoria}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Cerebro x={600} y={560} s={1.05} T={T} sacude={kprog(T, K.Choque + 2.2, K.Choque + 2.6)} />
          <Chispas T={T} x={600} y={540} r={240} n={9} p={kprog(T, K.Choque + 2.2, K.Choque + 2.6)} />
          <g transform={`rotate(${balanceo * 1.5} 220 1030)`}><OrejaIcono x={220} y={1030} s={1.1} /></g>
          <OjoIcono x={860} y={1060} s={0.85} />
          {T > K.Choque + 0.2 && <Globo x={280} y={820} w={400} tam={44} texto="¡nos movemos!" s={kprog(T, K.Choque + 0.2, K.Choque + 0.6, kEase.rebote)} cola="abajo-izq" color={LIQ} rot={-3} />}
          {T > K.Choque + 1.3 && <Globo x={800} y={880} w={420} tam={44} texto="estamos quietos" s={kprog(T, K.Choque + 1.3, K.Choque + 1.7, kEase.rebote)} cola="abajo-der" color={KC.yellow} rot={3} />}
        </Lienzo>
      </Escena>
      {/* 4 · la teoría más aceptada: conflicto de sentidos */}
      <Escena T={T} a={K.Teoria} b={K.Pregunta}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <OrejaIcono x={210} y={760} s={1.0} />
          <OjoIcono x={870} y={760} s={0.8} />
          {T > K.Teoria + 0.6 && <g>
            <FlechaRecta x1={300} y1={740} x2={440} y2={700} p={kprog(T, K.Teoria + 0.6, K.Teoria + 1.0, kEase.sale)} color={LIQ} />
            <FlechaRecta x1={760} y1={740} x2={640} y2={700} p={kprog(T, K.Teoria + 0.9, K.Teoria + 1.3, kEase.sale)} color={KC.yellow} />
          </g>}
          <Cerebro x={540} y={620} s={0.6} T={T} sacude={kprog(T, K.Teoria + 3.6, K.Teoria + 4.0)} />
          <Chispas T={T} x={540} y={610} r={150} n={7} p={kprog(T, K.Teoria + 3.6, K.Teoria + 4.0)} />
          <TextoSvg x={540} y={1010} tam={170} color={KC.yellow} s={kprog(T, K.Teoria + 2.2, K.Teoria + 2.6, kEase.rebote)}>≠</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Teoria + 0.3} until={K.Pregunta - 0.15} texto="conflicto de sentidos" x={540} y={1150} tam={50} borde={KC.gold} />
        <Chip T={T} at={K.Teoria + 1.4} until={K.Pregunta - 0.15} texto="(lo más aceptado)" x={540} y={410} tam={38} borde={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Veneno} color={KC.orange} />
      {/* 6 · la hipótesis del veneno */}
      <Escena T={T} a={K.Veneno} b={K.Conductor}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {T > K.Veneno + 1.8 && <g opacity={kprog(T, K.Veneno + 1.8, K.Veneno + 2.2)}>
            <Cerebro x={420} y={720} s={1.0} T={T} />
            {Array.from({ length: 3 }, (_, i) => { const f = ((T * 0.9 + i / 3) % 1); return <circle key={i} cx={420} cy={700} r={200 + f * 140} fill="none" stroke={KC.red} strokeWidth={10} opacity={kprog(T, K.Veneno + 2.4, K.Veneno + 2.8) * (1 - f)} />; })}
            <g transform={`translate(770 560) scale(${kprog(T, K.Veneno + 2.4, K.Veneno + 2.8, kEase.rebote)}) rotate(${Math.sin(T * 14) * 6})`}><Alerta x={0} y={0} s={1.3} color={T % 0.5 < 0.25 ? KC.yellow : KC.red} /></g>
            <FlechaRecta x1={430} y1={930} x2={640} y2={1020} p={kprog(T, K.Veneno + 4.4, K.Veneno + 4.9, kEase.sale)} color={KC.red} />
            {T > K.Veneno + 4.6 && <Estomago x={770} y={1050} s={0.8} T={T} sacude={1} />}
          </g>}
          <Onomato T={T} at={K.Veneno + 5.1} dur={1.2} x={760} y={880} texto="¡GUÁCALA!" color={KC.mint} tam={90} />
        </Lienzo>
        <Chip T={T} at={K.Veneno + 0.1} until={K.Veneno + 1.7} texto="nadie lo sabe con certeza" x={540} y={440} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Veneno + 1.9} until={K.Conductor - 0.15} texto="hipótesis" x={260} y={420} tam={46} borde={KC.pink} />
        <Chip T={T} at={K.Veneno + 2.6} until={K.Conductor - 0.15} texto="¿veneno?" x={770} y={740} tam={44} borde={KC.red} />
      </Escena>
      {/* 7 · el conductor controla el carro y anticipa la curva */}
      <Escena T={T} a={K.Conductor} b={K.Consejo} fondo={KC.dark}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g><rect x={40} y={330} width={1000} height={560} rx={50} fill="#2a2d3a" stroke={KC.ink} strokeWidth={12} />
            <svg x={70} y={360} width={940} height={500} viewBox="70 360 940 500"><CaminoFrente T={T} c={curva(T + 0.6)} y0={520} y1={880} /></svg>
            <rect x={40} y={330} width={1000} height={560} rx={50} fill="none" stroke={KC.ink} strokeWidth={14} /></g>
          <g transform={`translate(${klerp(860, 870, 0)} 450) scale(${kprog(T, K.Conductor + 2.6, K.Conductor + 3.0, kEase.rebote)})`}>
            <path d="M 0 -70 L 70 0 L 0 70 L -70 0 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <path d={curva(T + 1.2) > 0 ? 'M -18 30 L -18 0 Q -18 -20 10 -20 L 10 -32 L 30 -14 L 10 4 L 10 -8 Q -4 -8 -4 0 L -4 30 Z' : 'M 18 30 L 18 0 Q 18 -20 -10 -20 L -10 -32 L -30 -14 L -10 4 L -10 -8 Q 4 -8 4 0 L 4 30 Z'} fill={KC.ink} />
          </g>
          <rect x={0} y={880} width={KW} height={380} fill="#3a3f5c" />
          <Volante x={540} y={985} r={190} giro={curva(T + 0.6) * 38} />
          <Onomato T={T} at={K.Conductor + 4.7} dur={0.9} x={560} y={640} texto="¡FRENÓN!" color={KC.red} tam={90} rot={-6} />
        </Lienzo>
        <Chip T={T} at={K.Conductor + 0.4} until={K.Consejo - 0.15} texto="controla el carro" x={340} y={430} tam={40} borde={KC.mint} />
        <Chip T={T} at={K.Conductor + 2.9} until={K.Consejo - 0.15} texto="sabe cuándo viene la curva" x={540} y={820} tam={38} borde={KC.yellow} />
      </Escena>
      {/* 8 · consejos */}
      <Escena T={T} a={K.Consejo} b={K.Barco}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Consejo x={540} y={500} p={kprog(T, K.Consejo + 0.3, K.Consejo + 0.8, kEase.sale)} ok={kprog(T, K.Consejo + 0.9, K.Consejo + 1.2, kEase.rebote)} texto="mira al horizonte"
            icono={<g><line x1={-60} y1={20} x2={60} y2={20} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" /><path d="M -32 20 A 32 32 0 0 1 32 20" fill={KC.orange} stroke={KC.ink} strokeWidth={6} /></g>} />
          <Consejo x={540} y={770} p={kprog(T, K.Consejo + 1.8, K.Consejo + 2.3, kEase.sale)} ok={kprog(T, K.Consejo + 2.4, K.Consejo + 2.7, kEase.rebote)} texto="asiento de adelante"
            icono={<g><rect x={-30} y={-50} width={44} height={80} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-30} y={20} width={70} height={30} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} /></g>} />
          <Consejo x={540} y={1040} p={kprog(T, K.Consejo + 3.1, K.Consejo + 3.6, kEase.sale)} ok={kprog(T, K.Consejo + 3.7, K.Consejo + 4.0, kEase.rebote)} texto="suelta el celular"
            icono={<g><Celular x={0} y={0} s={0.27} T={T} /><path d="M -55 -55 L 55 55" stroke={KC.red} strokeWidth={12} strokeLinecap="round" /></g>} />
        </Lienzo>
      </Escena>
      {/* 9 · barcos, aviones, videojuegos y realidad virtual */}
      <Escena T={T} a={K.Barco} b={K.Ninos}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {T > K.Barco + 0.2 && <g opacity={kprog(T, K.Barco + 0.2, K.Barco + 0.6)}><Barco x={300} y={640} s={0.95} T={T} /><Olas T={T} y={690} /></g>}
          {T > K.Barco + 1.3 && <g transform={`translate(${klerp(-500, 0, kprog(T, K.Barco + 1.3, K.Barco + 2.0, kEase.sale))} ${Math.sin(T * 2) * 20})`}><Avion x={720} y={470} s={0.85} rot={-8 + Math.sin(T * 2.2) * 6} /></g>}
          {T > K.Barco + 2.6 && <g transform={`translate(0 ${(1 - kprog(T, K.Barco + 2.6, K.Barco + 3.1, kEase.rebote)) * 600})`}><LentesVR x={330} y={930} s={0.85} T={T} /><Control x={830} y={950} s={0.9} /></g>}
        </Lienzo>
        <Etq T={T} at={K.Barco + 0.6} until={K.Ninos - 0.2} x={560} y={820} texto="barcos" lado="der" color={KC.texto} tam={40} />
        <Etq T={T} at={K.Barco + 1.9} until={K.Ninos - 0.2} x={600} y={640} texto="aviones" lado="der" color={KC.texto} tam={40} />
        <Etq T={T} at={K.Barco + 3.2} until={K.Ninos - 0.2} x={100} y={1110} texto="videojuegos y realidad virtual" lado="der" color={KC.texto} tam={36} />
      </Escena>
      {/* 10 · los niños de 7 a 12 años */}
      <Escena T={T} a={K.Ninos} b={K.Cierre}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {[[230, 470, KC.pink, 0.2], [540, 560, KC.cyan, 0.45], [850, 500, KC.orange, 0.7]].map(([nx, alto, c, d], i) =>
            <g key={i} transform={`translate(0 ${(1 - kprog(T, K.Ninos + d, K.Ninos + d + 0.5, kEase.rebote)) * 900})`}>
              <PersonaSimple x={nx} yPies={1190} alto={alto} color={c} piel={PVERDE} cara="o" />
              <Espiral x={nx} y={1190 - alto - 40} T={T + i} s={0.8} />
            </g>)}
        </Lienzo>
        <Chip T={T} at={K.Ninos + 1.2} until={K.Cierre - 0.15} texto="7 a 12 años: se marean más" x={540} y={420} tam={48} borde={KC.pink} />
      </Escena>
      {/* 11 · cierre: el mismo carro, el niño mira por la ventana y está bien */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <SolDibujo x={900} y={560} r={60} T={T} />
          <Paisaje T={T} y={1150} />
          <Carro x={540} y={1090} s={1.05} T={T} rot={balanceo * 0.4} nino="bien" />
          <path d="M 470 830 L 830 600" stroke="#fff" strokeWidth={6} strokeDasharray="14 12" opacity={kprog(T, K.Cierre + 0.8, K.Cierre + 1.3)} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.6} until={K.Outro - 0.1} texto="ojos contra oídos" x={620} y={340} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Oido - 0.1} texto="No es tu estómago: *es tu cerebro.*" />
      <Subtitulo T={T} idx={1} at={K.Oido + 0.1} until={K.Ojos - 0.1} texto="Tu oído *siente el movimiento.*" />
      <Subtitulo T={T} idx={2} at={K.Ojos + 0.1} until={K.Choque - 0.1} texto="Tus ojos ven todo *quieto.*" />
      <Subtitulo T={T} idx={3} at={K.Choque + 0.1} until={K.Teoria - 0.1} texto="Dos mensajes *que no cuadran.*" />
      <Subtitulo T={T} idx={4} at={K.Teoria + 0.1} until={K.Pregunta - 0.1} texto="Oídos contra ojos: *un choque.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Veneno - 0.1} texto="¿Y por qué *da náuseas?*" />
      <Subtitulo T={T} idx={6} at={K.Veneno + 0.1} until={K.Conductor - 0.1} texto="Hipótesis: *¿un veneno?*" />
      <Subtitulo T={T} idx={7} at={K.Conductor + 0.1} until={K.Consejo - 0.1} texto="Quien maneja *controla el carro.*" />
      <Subtitulo T={T} idx={8} at={K.Consejo + 0.1} until={K.Barco - 0.1} texto="Horizonte, adelante, *sin celular.*" />
      <Subtitulo T={T} idx={9} at={K.Barco + 0.1} until={K.Ninos - 0.1} texto="Barcos, aviones *y realidad virtual.*" />
      <Subtitulo T={T} idx={10} at={K.Ninos + 0.1} until={K.Cierre - 0.1} texto="De 7 a 12 años: *se marean más.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Una pelea entre *ojos y oídos.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Oido + 1.2, K.Ojos - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Choque + 0.3, K.Teoria + 0.6, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Veneno + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Veneno + 4.4, K.Conductor - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Conductor + 2.4, K.Conductor + 5.6, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Consejo + 1.2, K.Barco + 0.2, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Barco + 2.6, K.Ninos - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Ninos + 0.4, K.Cierre - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="54" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function MareoCarroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MareoCarro /></CompositionStage></div>;
}
window.MareoCarroApp = MareoCarroApp;
