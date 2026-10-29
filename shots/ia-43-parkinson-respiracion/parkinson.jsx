// Shot IA #43 · La IA que busca Parkinson en cómo respiras dormido — NARRADO (N1 "Por dentro").
// Datos: Yang et al., "Artificial intelligence-enabled detection and assessment of Parkinson's disease using nocturnal breathing signals",
// Nature Medicine 28: 2207–2215 (2022). MedlinePlus (NIH). Ver guion.md y verificacion.md. Todo es esquemático.

const PIEL = '#f1b48f', PIEL2 = '#d98f6b', COBIJA = '#2f6dff', COBIJA2 = '#1f4fd0';
// Respiración dibujada (lenta a propósito, para que se lea): 1 = pecho arriba.
const kResp = (t) => Math.sin((2 * Math.PI * t) / 3.6);

// La rayita de la respiración: avanza con el tiempo; el punto de la derecha es "ahora".
// ruido 0..1 la vuelve garabato (ventilador/mascota).
function Rayita({ T, x0 = 70, x1 = 1010, y = 800, amp = 70, pxs = 120, ruido = 0, color = KC.white, o = 1, crece = 1, foco = 0 }) {
  const xe = klerp(x0, x1, crece), pts = [];
  for (let x = x0; x <= xe; x += 8) {
    const tt = T - (xe - x) / pxs;
    const n = ruido * (Math.sin(tt * 23.7) * 0.6 + Math.sin(tt * 41.3 + 1) * 0.5 + Math.sin(tt * 67.1 + 2) * 0.4);
    pts.push(`${x.toFixed(1)},${(y - amp * (kResp(tt) * (1 - ruido * 0.5) + n)).toFixed(1)}`);
  }
  if (pts.length < 2) return null;
  const d = 'M ' + pts.join(' L '), yN = y - amp * kResp(T) * (1 - ruido * 0.5);
  return <g opacity={o}>
    <path d={d} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={xe} cy={yN} r={18} fill={foco > 0 ? KC.yellow : color} stroke={KC.ink} strokeWidth={6} />
    {foco > 0 && <circle cx={xe} cy={yN} r={18 + 40 * ((T * 1.2) % 1)} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={foco * (1 - ((T * 1.2) % 1))} />}
  </g>;
}

// Brillito de IA (estrella de 4 puntas).
function Brillito({ x, y, s = 1, color = KC.yellow, o = 1, rot = 0 }) {
  return <path d="M 0 -40 Q 6 -6 40 0 Q 6 6 0 40 Q -6 6 -40 0 Q -6 -6 0 -40 Z" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={5} opacity={o} />;
}

// Lupa simple.
function LupaIcono({ x, y, s = 1, o = 1, rot = -20 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-14} y={70} width={28} height={110} rx={12} fill={KC.ink} />
    <circle r={80} fill="rgba(255,255,255,.28)" stroke={KC.ink} strokeWidth={14} />
    <circle r={80} fill="none" stroke={KC.white} strokeWidth={5} opacity=".7" />
  </g>;
}

// La recámara: cama, persona dormida (el pecho sube y baja con kResp), buró, módem, ventilador y gato opcionales.
function Recamara({ T, pared = KC.lilac, modem = 0, ondas = 0, gato = 0, ventilador = 0, luna = 1 }) {
  const r = kResp(T), pecho = 18 * r;
  const cobija = `M 300 1052 C 330 ${985 - pecho} 470 ${975 - pecho} 520 1000 C 600 1030 760 1010 880 1020 L 900 1060 L 300 1060 Z`;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={KW} height={KH} fill={pared} />
    {Array.from({ length: 18 }, (_, i) => Array.from({ length: 30 }, (_, j) => <circle key={`${i}-${j}`} cx={30 + i * 60 + (j % 2) * 30} cy={20 + j * 60} r={6} fill="rgba(255,255,255,.22)" />))}
    <rect y={1180} width={KW} height={KH - 1180} fill={mixHex(pared, '#16120f', 0.35)} />
    {/* ventana con luna */}
    {luna > 0 && <g opacity={luna}><rect x={110} y={420} width={250} height={250} rx={18} fill="#1c2a6b" stroke={KC.ink} strokeWidth={9} />
      <circle cx={280} cy={500} r={44} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} /><circle cx={300} cy={488} r={40} fill="#1c2a6b" />
      {[[160, 470], [200, 600], [320, 620]].map(([sx, sy], k) => <circle key={k} cx={sx} cy={sy} r={5 + 2 * Math.sin(T * 3 + k)} fill={KC.white} />)}
      <line x1={235} y1={420} x2={235} y2={670} stroke={KC.ink} strokeWidth={7} /><line x1={110} y1={545} x2={360} y2={545} stroke={KC.ink} strokeWidth={7} /></g>}
    {/* cama */}
    <rect x={118} y={880} width={46} height={300} rx={14} fill="#a8653a" stroke={KC.ink} strokeWidth={8} />
    <rect x={150} y={1050} width={770} height={70} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={150} y={1110} width={770} height={40} rx={10} fill="#a8653a" stroke={KC.ink} strokeWidth={8} />
    <rect x={170} y={1145} width={30} height={40} fill="#7c4627" stroke={KC.ink} strokeWidth={6} /><rect x={870} y={1145} width={30} height={40} fill="#7c4627" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={240} cy={1030} rx={95} ry={38} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    {/* cabeza dormida */}
    <g transform={`translate(0 ${-2 * r})`}>
      <circle cx={255} cy={985} r={56} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
      <path d="M 202 975 Q 210 920 262 925 Q 305 930 310 970 Q 280 950 250 958 Q 225 960 202 975 Z" fill="#3a2418" stroke={KC.ink} strokeWidth={6} />
      <path d="M 262 990 q 12 8 24 0" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 268 1012 q 8 4 16 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((k) => { const u = ((T * 0.45 + k / 3) % 1);
        return <text key={k} x={320 + u * 60} y={930 - u * 140} style={{ font:`400 ${40 + k * 8}px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={4} opacity={Math.sin(Math.PI * u)}>z</text>; })}
    </g>
    {/* cobija (el pecho sube y baja) y manos */}
    <path d={cobija} fill={COBIJA} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M 340 1040 C 370 ${1000 - pecho * 0.8} 460 ${995 - pecho * 0.8} 500 1015`} stroke={COBIJA2} strokeWidth={6} fill="none" />
    <g transform={`translate(0 ${-pecho * 0.5})`}><ellipse cx={560} cy={1004} rx={34} ry={20} fill={PIEL} stroke={KC.ink} strokeWidth={6} /></g>
    {/* buró */}
    <rect x={930} y={990} width={130} height={190} rx={12} fill="#c98a52" stroke={KC.ink} strokeWidth={8} />
    <line x1={940} y1={1080} x2={1050} y2={1080} stroke={KC.ink} strokeWidth={6} />
    {/* módem */}
    {modem > 0 && <g opacity={modem} transform={`translate(995 ${990 - 12 * (1 - modem)})`}>
      <line x1={-38} y1={-40} x2={-50} y2={-110} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <line x1={38} y1={-40} x2={50} y2={-110} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      <rect x={-60} y={-46} width={120} height={46} rx={12} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
      {[-30, -10, 10, 30].map((lx, k) => <circle key={lx} cx={lx} cy={-22} r={6} fill={(Math.floor(T * 4) + k) % 3 ? KC.mint : '#9aa'} />)}
    </g>}
    {/* ondas de radio: salen del módem, llegan al pecho y regresan */}
    {ondas > 0 && [0, 1, 2, 3].map((k) => { const u = ((T * 0.7 + k / 4) % 1);
      return <path key={k} d={`M 0 -110 A 110 110 0 0 0 0 110`} transform={`translate(${klerp(940, 470, u)} ${klerp(940, 1000, u)}) scale(${0.5 + u * 0.8})`}
        stroke={KC.cyan} strokeWidth={10} fill="none" strokeLinecap="round" opacity={ondas * Math.sin(Math.PI * u)} />; })}
    {ondas > 0 && [0, 1].map((k) => { const u = ((T * 0.7 + 0.5 + k / 2) % 1);
      return <path key={'r' + k} d={`M 0 -60 A 60 60 0 0 1 0 60`} transform={`translate(${klerp(500, 900, u)} ${klerp(990, 950, u)})`}
        stroke={KC.yellow} strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="14 12" opacity={ondas * 0.9 * Math.sin(Math.PI * u)} />; })}
    {/* ventilador */}
    {ventilador > 0 && <g opacity={ventilador} transform="translate(995 870)">
      <rect x={-8} y={20} width={16} height={100} fill={KC.ink} /><rect x={-50} y={110} width={100} height={14} rx={7} fill={KC.ink} />
      <circle r={78} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={8} />
      <g transform={`rotate(${T * 900})`}>{[0, 120, 240].map((a) => <ellipse key={a} cx={0} cy={-38} rx={20} ry={36} transform={`rotate(${a})`} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />)}</g>
      <circle r={12} fill={KC.ink} />
      {[0, 1, 2].map((k) => <path key={k} d={`M -100 ${-30 + k * 30} q -30 -12 -60 0 q -30 12 -60 0`} stroke={KC.white} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.7 * Math.sin(Math.PI * ((T * 1.5 + k / 3) % 1))} />)}
    </g>}
    {/* gato */}
    {gato > 0 && <g opacity={gato} transform={`translate(780 ${1010 - 30 * (1 - gato)})`}>
      <path d={`M 70 10 q 50 ${-30 + 20 * Math.sin(T * 4)} 40 -80`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M 70 10 q 50 ${-30 + 20 * Math.sin(T * 4)} 40 -80`} stroke={KC.orange} strokeWidth={12} fill="none" strokeLinecap="round" />
      <ellipse cx={20} cy={0} rx={80} ry={50} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
      <circle cx={-50} cy={-40} r={42} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
      <path d="M -84 -62 L -80 -105 L -56 -78 Z M -40 -80 L -18 -110 L -14 -70 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <circle cx={-64} cy={-44} r={6} fill={KC.ink} /><circle cx={-36} cy={-44} r={6} fill={KC.ink} />
      <path d="M -56 -28 q 6 6 12 0" stroke={KC.ink} strokeWidth={4} fill="none" />
    </g>}
  </svg>;
}

// Neurona que suelta pocas bolitas de dopamina.
function Neurona({ T, x, y, s = 1, dopa = 1 }) {
  const ramas = [[-160, -120], [-190, 10], [-140, 130], [-40, -170], [60, -160]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([dx, dy], k) => <path key={k} d={`M 0 0 Q ${dx * 0.5} ${dy * 0.3} ${dx} ${dy}`} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />)}
    {ramas.map(([dx, dy], k) => <path key={'c' + k} d={`M 0 0 Q ${dx * 0.5} ${dy * 0.3} ${dx} ${dy}`} stroke={KC.lilac} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    <path d="M 40 10 C 160 20 220 60 300 140" stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M 40 10 C 160 20 220 60 300 140" stroke={KC.lilac} strokeWidth={18} fill="none" strokeLinecap="round" />
    <circle r={78} fill={KC.lilac} stroke={KC.ink} strokeWidth={9} />
    <circle r={30} fill={KC.violet} />
    <circle cx={320} cy={160} r={38} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    {/* pocas bolitas de dopamina */}
    {[0, 1, 2].map((k) => { const u = ((T * 0.5 + k / 3) % 1);
      return <circle key={k} cx={330 + u * 90} cy={190 + u * 110 + k * 8} r={13} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={dopa * Math.sin(Math.PI * u)} />; })}
  </g>;
}

// Íconos de síntomas.
function ManoTiembla({ T, x, y, s = 1 }) {
  const w = Math.sin(T * 26) * 6;
  return <g transform={`translate(${x + w} ${y}) scale(${s})`}>
    <path d="M -45 60 L -45 -10 Q -45 -30 -30 -30 L -30 -70 Q -30 -85 -17 -85 Q -4 -85 -4 -70 L -4 -95 Q -4 -110 9 -110 Q 22 -110 22 -95 L 22 -80 Q 22 -95 35 -95 Q 48 -95 48 -80 L 48 -60 Q 48 -72 60 -72 Q 72 -72 72 -58 L 72 20 Q 72 60 40 75 L -20 75 Z" fill={PIEL} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-1, 1].map((k) => <path key={k} d={`M ${k * 95} -50 q ${k * 14} 20 0 40 q ${-k * 14} 20 0 40`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />)}
  </g>;
}
function BrazoRigido({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-28} width={160} height={56} rx={26} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={92} cy={0} r={32} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -60 L -40 -40 M 0 -70 L 0 -44 M 60 -60 L 40 -40" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <rect x={-20} y={-36} width={40} height={72} rx={8} fill="#9aa4b8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Tortuga({ T, x, y, s = 1 }) {
  const p = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={-50 + p} cy={40} rx={18} ry={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><ellipse cx={50 - p} cy={40} rx={18} ry={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <circle cx={100} cy={0} r={28} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><circle cx={110} cy={-6} r={5} fill={KC.ink} />
    <path d="M -90 30 Q -90 -70 0 -70 Q 90 -70 90 30 Z" fill="#2f8f3a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -50 L -20 0 L 20 0 L 40 -50 M -70 10 L 70 10" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
// Tubo de ensayo.
function Tubo({ x, y, s = 1, rot = 12 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -45 -170 L -45 120 Q -45 170 0 170 Q 45 170 45 120 L 45 -170" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -45 30 L -45 120 Q -45 170 0 170 Q 45 170 45 120 L 45 30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-190} width={120} height={30} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Luna chiquita (una noche).
function Lunita({ x, y, s = 1, o = 1, color = KC.gold2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 8 -22 A 24 24 0 1 0 22 14 A 18 18 0 1 1 8 -22 Z" fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
// Pulmones con diafragma; debil 0..1 baja el movimiento y vuelve punteadas las flechas.
function Pulmones({ T, x, y, s = 1, debil = 0 }) {
  const r = kResp(T) * (1 - debil * 0.7), sc = 1 + 0.06 * r;
  const lob = 'M -30 -150 C -120 -150 -200 -40 -200 80 C -200 170 -120 190 -40 160 C -20 150 -20 100 -20 -120 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-260} width={44} height={120} rx={18} fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
    <g transform={`scale(${sc})`}>
      <path d={lob} fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
      <path d={lob} transform="scale(-1 1)" fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
      {[-1, 1].map((k) => <path key={k} d={`M ${k * -20} -120 L ${k * 60} -40 M ${k * 60} -40 L ${k * 120} 0 M ${k * 60} -40 L ${k * 90} 60`} stroke="#b0164d" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    </g>
    <path d={`M -240 ${215 - 18 * r} Q 0 ${150 - 30 * r} 240 ${215 - 18 * r}`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d={`M -240 ${215 - 18 * r} Q 0 ${150 - 30 * r} 240 ${215 - 18 * r}`} stroke={KC.coral} strokeWidth={9} fill="none" strokeLinecap="round" />
    {[-1, 1].map((k) => <path key={'f' + k} d={`M ${k * 280} 80 L ${k * 280} ${-10 - 20 * r} M ${k * 260} ${10 - 20 * r} L ${k * 280} ${-14 - 20 * r} L ${k * 300} ${10 - 20 * r}`}
      stroke={KC.mint} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={debil > 0.5 ? '12 14' : 'none'} opacity={1 - debil * 0.45} />)}
  </g>;
}
// Tarjeta de una noche (rayita dentro).
function TarjetaNoche({ T, x, y, w = 420, h = 230, titulo, sel = 0, seed = 0, o = 1 }) {
  return <g opacity={o}>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={24} fill="#1c2a6b" stroke={sel > 0 ? KC.yellow : KC.ink} strokeWidth={sel > 0 ? 12 : 8} />
    <Lunita x={x - w / 2 + 44} y={y - h / 2 + 42} s={0.9} />
    <text x={x - w / 2 + 80} y={y - h / 2 + 54} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>
    <Rayita T={T + seed} x0={x - w / 2 + 30} x1={x + w / 2 - 30} y={y + 30} amp={36} pxs={80} color={KC.mint} />
  </g>;
}
// Edificio de hospital.
function Hospital({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-120} width={300} height={240} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-200} width={120} height={90} rx={10} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    <path d="M -14 -185 h 28 v 22 h 22 v 28 h -22 v 22 h -28 v -22 h -22 v -28 h 22 Z" fill={KC.red} />
    {[-100, -30, 40].map((wx) => [-80, -10].map((wy) => <rect key={`${wx}${wy}`} x={wx} y={wy} width={50} height={44} rx={6} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />))}
    <rect x={95} y={40} width={40} height={80} fill="#a8653a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Estetoscopio.
function Estetoscopio({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 5}) scale(${s})`}>
    <path d="M -80 -140 L -80 -40 Q -80 40 0 40 Q 80 40 80 -40 L 80 -140" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M -80 -140 L -80 -40 Q -80 40 0 40 Q 80 40 80 -40 L 80 -140" stroke="#5a6070" strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 0 40 Q 0 140 110 160" stroke={KC.ink} strokeWidth={14} fill="none" />
    <circle cx={130} cy={165} r={44} fill="#c9cfd8" stroke={KC.ink} strokeWidth={8} /><circle cx={130} cy={165} r={22} fill="#8b93a3" />
    <circle cx={-80} cy={-150} r={14} fill={KC.ink} /><circle cx={80} cy={-150} r={14} fill={KC.ink} />
  </g>;
}
// Fila de palomitas: n de 10 verdes, el resto rojo.
function Palomitas({ T, at, x = 540, y = 1080, buenas = 9, paso = 0.18 }) {
  return <g>{Array.from({ length: 10 }, (_, i) => { const e = kprog(T, at + i * paso, at + i * paso + 0.25, kEase.rebote), cx = x - 405 + i * 90, ok = i < buenas;
    return <g key={i} transform={`translate(${cx} ${y}) scale(${e})`}>
      <circle r={36} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={6} />
      {ok ? <path d="M -16 0 L -4 13 L 18 -12" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M -12 -12 L 12 12 M 12 -12 L -12 12" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />}
    </g>; })}</g>;
}
// Etiqueta de texto en una caja con sombra (para las tarjetas de síntomas).
function TextoCaja({ T, at, until, texto, x, y, tam = 34, fondo = KC.paper, color = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:fondo, color, border:`5px solid ${KC.ink}`,
    borderRadius:16, padding:'8px 20px', font:`900 ${tam}px ${KF.texto}`, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}

// Velocímetro de gravedad (esquemático): v 0..1.
function Velocimetro({ T, x, y, s = 1, v = 0 }) {
  const arco = (a0, a1, c) => { const p = (a) => [Math.cos(Math.PI * (1 - a)) * 260, -Math.sin(Math.PI * (1 - a)) * 260];
    const [x0, y0] = p(a0), [x1, y1] = p(a1); return <path d={`M ${x0} ${y0} A 260 260 0 0 1 ${x1} ${y1}`} stroke={c} strokeWidth={60} fill="none" />; };
  const ang = Math.PI * (1 - v) + Math.sin(T * 9) * 0.015;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 A 300 300 0 0 1 300 0 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {arco(0.02, 0.34, KC.mint)}{arco(0.34, 0.66, KC.yellow)}{arco(0.66, 0.98, KC.red)}
    <path d="M -260 0 A 260 260 0 0 1 260 0" stroke={KC.ink} strokeWidth={6} fill="none" opacity=".25" />
    <text x={-215} y={50} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>leve</text>
    <text x={215} y={50} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>avanzado</text>
    <line x1={0} y1={0} x2={Math.cos(ang) * 220} y2={-Math.sin(ang) * 220} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <circle r={30} fill={KC.ink} /><circle r={12} fill={KC.yellow} />
  </g>;
}

function Parkinson() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Parkinson, A: CUES.Aparato, N: CUES.Noches, Q: CUES.Pregunta, R: CUES.Respuesta, E: CUES.Estudio, M: CUES.Mascota, O: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const dP = K.A - K.P, dE = K.M - K.E;
  const tubo = K.P + dP * 0.62;               // "Y no hay un análisis de laboratorio…"
  const lunasLlenas = Math.round(120 * kprog(T, K.N + 0.4, K.N + 3.2, kEase.suave));
  const lupaX = klerp(140, 860, kprog(T, K.G + 1.6, K.G + 5.0, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú dormido y la rayita de tu respiración */}
      <Escena T={T} a={-1} b={K.P}>
        <Recamara T={T} />
        {svg(<>
          <Rayita T={T} y={790} crece={kprog(T, 0, 0.9, kEase.sale)} />
          {T > K.G + 1.4 && <LupaIcono x={lupaX} y={790 - 70 * kResp(T - (1010 - lupaX) / 120)} s={0.75} o={kprog(T, K.G + 1.4, K.G + 1.8)} />}
          {[[180, 700, 0], [470, 690, 1], [760, 720, 2]].map(([bx, by, k]) => <Brillito key={k} x={bx} y={by} s={0.6 + 0.15 * Math.sin(T * 5 + k)} rot={T * 40 + k * 30} o={kprog(T, K.G + 1.6 + k * 0.2, K.G + 2.0 + k * 0.2)} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 2.6} until={K.P - 0.2} texto="IA: ¿señales de Parkinson?" x={330} y={420} tam={38} borde={KC.yellow} />

      {/* 2 · qué es el Parkinson */}
      <Escena T={T} a={K.P} b={K.A}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={1 - kprog(T, tubo - 0.4, tubo)}>
            <Neurona T={T} x={300} y={640} s={0.95} />
            <g opacity={kprog(T, K.P + 2.2, K.P + 2.6)}><ManoTiembla T={T} x={200} y={960} s={0.9} /></g>
            <g opacity={kprog(T, K.P + 2.8, K.P + 3.2)}><BrazoRigido x={540} y={970} s={0.95} /></g>
            <g opacity={kprog(T, K.P + 3.4, K.P + 3.8)}><Tortuga T={T} x={860} y={975} s={0.85} /></g>
          </g>
          <g opacity={kprog(T, tubo, tubo + 0.4)}><Tubo x={540} y={700} s={1.1} rot={10 + Math.sin(T * 2) * 3} /></g>
        </>)}
      </Escena>
      <TextoCaja T={T} at={K.P + 0.8} until={tubo - 0.4} texto="poca dopamina" x={620} y={760} tam={38} fondo={KC.yellow} />
      <TextoCaja T={T} at={K.P + 2.3} until={tubo - 0.4} texto="temblor" x={200} y={1075} tam={30} />
      <TextoCaja T={T} at={K.P + 2.9} until={tubo - 0.4} texto="rigidez" x={540} y={1075} tam={30} />
      <TextoCaja T={T} at={K.P + 3.5} until={tubo - 0.4} texto="lentitud" x={860} y={1075} tam={30} />
      <MitoTachado T={T} at={tubo + 0.2} tacharEn={tubo + 1.2} until={K.A - 0.2} texto="análisis de laboratorio" y={1000} tam={48} />

      {/* 3 · el aparato tipo módem */}
      <Escena T={T} a={K.A} b={K.N}>
        <Recamara T={T} modem={kprog(T, K.A + 0.2, K.A + 0.7, kEase.rebote)} ondas={kprog(T, K.A + 1.2, K.A + 1.8)} />
        {svg(<Rayita T={T} y={790} color={KC.cyan} o={kprog(T, K.A + 2.6, K.A + 3.2)} crece={kprog(T, K.A + 2.6, K.A + 4.2, kEase.suave)} />)}
      </Escena>
      <Chip T={T} at={K.A + 0.6} until={K.N - 0.2} texto="aparato tipo módem · MIT" x={660} y={440} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.A + 1.4} until={K.N - 0.2} texto="ondas de radio" x={700} y={560} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.A + 4.4} until={K.N - 0.2} texto="sin tocarte ✔" x={540} y={680} tam={40} borde={KC.mint} />

      {/* 4 · las noches */}
      <Escena T={T} a={K.N} b={K.Q}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 120 }, (_, i) => { const c = i % 12, f = Math.floor(i / 12);
          return <g key={i}><Lunita x={110 + c * 78} y={770 + f * 41} s={0.8} o={i < lunasLlenas ? 1 : 0.18} color={i < lunasLlenas ? KC.gold2 : KC.white} /></g>; })}</>)}
      </Escena>
      {T >= K.N + 0.3 && T < K.Q + 0.4 && <NumeroGigante T={T} at={K.N + 0.3} until={K.Q - 0.2} valor={11964} dur={2.8} sufijo="" etiqueta="noches de sueño" y={520} tam={170} color={KC.yellow} />}
      <Chip T={T} at={K.N + 2.2} until={K.Q - 0.2} texto="7,671 personas" x={540} y={700} tam={44} borde={KC.ink} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Pulmones T={T} x={300} y={1000} s={0.75} />
          <text x={290} y={820} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 700)`}>?</text>
        </>)}
      </Escena>

      {/* 6 · respuesta: por dentro */}
      <Escena T={T} a={K.R} b={K.E}>
        <FondoCircuito T={T} color={KC.pink} />
        {svg(<Pulmones T={T} x={540} y={800} s={0.9} debil={kprog(T, K.R + 0.8, K.R + 2.0)} />)}
      </Escena>
      <Chip T={T} at={K.R + 0.9} until={K.E - 0.2} texto="músculos de respirar más débiles" x={540} y={1100} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.R + 2.6} until={K.E - 0.2} texto="problemas al respirar dormido" x={540} y={1100} tam={36} borde={KC.cyan} fondo="rgba(14,15,18,.92)" />
      <Chip T={T} at={K.R + 4.2} until={K.E - 0.2} texto="desde etapas tempranas" x={360} y={560} tam={36} borde={KC.yellow} />

      {/* 7 · el estudio */}
      <Escena T={T} a={K.E} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity={kprog(T, K.E + 2.2, K.E + 2.6) * (1 - kprog(T, K.E + dE * 0.56, K.E + dE * 0.56 + 0.4))}>
            <TarjetaNoche T={T} x={290} y={870} titulo="noche A" sel={T > K.E + 3.6 ? 1 : 0} o={1} />
            <TarjetaNoche T={T} x={790} y={870} titulo="noche B" seed={1.3} o={1} />
            {T > K.E + 3.0 && <g transform={`translate(${klerp(540, 290, kprog(T, K.E + 3.0, K.E + 3.6, kEase.sale))} 700)`}>
              <Brillito x={0} y={0} s={0.9} rot={T * 60} /><Brillito x={46} y={-30} s={0.45} rot={-T * 80} color={KC.white} /></g>}
            <Palomitas T={T} at={K.E + 3.9} y={1090} buenas={9} paso={0.16} />
          </g>
          <g opacity={kprog(T, K.E + dE * 0.56 + 0.2, K.E + dE * 0.56 + 0.6) * (1 - kprog(T, K.E + dE * 0.77, K.E + dE * 0.77 + 0.4))}>
            <Hospital x={300} y={880} s={1.0} />
          </g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.1} until={K.E + 2.2} anio="2022" quien="MIT · Katabi y col." revista="Nature Medicine" y={760} />
      <Chip T={T} at={K.E + 5.6} until={K.E + dE * 0.56} texto="9 de cada 10" x={540} y={1180} tam={44} borde={KC.mint} />
      <TextoCaja T={T} at={K.E + dE * 0.56 + 0.4} until={K.E + dE * 0.77} texto="hospital que no conocía" x={540} y={1100} tam={40} />
      {T >= K.E + dE * 0.56 + 0.8 && T < K.E + dE * 0.77 + 0.6 && <NumeroGigante T={T} at={K.E + dE * 0.56 + 0.8} until={K.E + dE * 0.77} valor={8} desde={8} dur={0.1} prefijo="+ de " sufijo=" de 10" x={740} y={860} tam={110} color={KC.yellow} />}
      {T > K.E + dE * 0.77 && <Escena T={T} a={K.E + dE * 0.79} b={K.M}>{svg(<Velocimetro T={T} x={540} y={1010} s={1.05} v={0.62 * kprog(T, K.E + dE * 0.8 + 0.3, K.E + dE * 0.8 + 1.5, kEase.sale)} />)}</Escena>}
      <Chip T={T} at={K.E + dE * 0.8} until={K.M - 0.2} texto="¿qué tan avanzado?" x={420} y={700} tam={42} borde={KC.orange} />

      {/* 8 · el enemigo: ventilador y mascota */}
      <Escena T={T} a={K.M} b={K.O}>
        <Recamara T={T} pared={KC.yellow} ventilador={kprog(T, K.M + 0.3, K.M + 0.7)} gato={kprog(T, K.M + 1.0, K.M + 1.5, kEase.rebote)} luna={0} />
        {svg(<Rayita T={T} y={770} color={KC.white} ruido={kprog(T, K.M + 0.6, K.M + 1.8)} />)}
      </Escena>
      <Chip T={T} at={K.M + 2.0} until={K.O - 0.2} texto="✘ noche descartada" x={660} y={470} tam={42} borde={KC.red} />

      {/* 9 · ojo: investigación */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <Estetoscopio x={330} y={880} s={1.1} T={T} />
          <g transform={`translate(760 930) rotate(-12) scale(${klerp(1.8, 1, kprog(T, K.O + 0.8, K.O + 1.1, kEase.sale))})`} opacity={kprog(T, K.O + 0.8, K.O + 1.0)}>
            <rect x={-190} y={-70} width={380} height={140} rx={20} fill="rgba(255,59,47,.12)" stroke={KC.red} strokeWidth={10} />
            <text y={28} textAnchor="middle" style={{ font:`400 78px ${KF.titulo}` }} fill={KC.red}>EN ESTUDIO</text>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 0.2} until={K.C - 0.2} texto="investigación ≠ diagnóstico" x={460} y={660} tam={44} borde={KC.red} />

      {/* 10 · cierre: la misma cama, la misma rayita… con un aviso */}
      <Escena T={T} a={K.C} b={FIN}>
        <Recamara T={T} />
        {svg(<Rayita T={T} y={790} foco={kprog(T, K.C + 1.6, K.C + 2.0)} color={T > K.C + 1.6 ? KC.gold2 : KC.white} />)}
      </Escena>
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="💡 ¿un aviso temprano? (quizá)" x={660} y={640} tam={38} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="Esta rayita *eres tú respirando dormido.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.A - 0.1} texto="Poca *dopamina…* y *ningún análisis* lo diagnostica." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.N - 0.1} texto="Ondas de radio que *leen cómo respiras.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.Q - 0.1} texto="*Casi 12 mil noches* de sueño." />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.R - 0.1} texto="¿Qué tiene que ver *respirar?*" />
      <Subtitulo T={T} idx={5} at={K.R + 0.1} until={K.E - 0.1} texto="Respirar cambia *desde etapas tempranas.*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.M - 0.1} texto="Distinguía la noche *9 de cada 10 veces.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.O - 0.1} texto="Su enemigo: *ventilador o mascota.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.C - 0.1} texto="Es *investigación,* no una prueba aprobada." />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Quizá un día *avise antes que tus manos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Parkinson + 1.6, CUES.Parkinson + dP * 0.6, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Aparato + 2.0, CUES.Noches - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Respuesta + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Respuesta + 2.6, CUES.Estudio - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 4.0, CUES.Estudio + dE * 0.55, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Estudio + dE * 0.79, CUES.Mascota - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Mascota + 0.4, CUES.Ojo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Ojo + 0.3, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'izq-alto']]} />
      <MarcaAgua T={T} tema="ia" num="43" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ParkinsonApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Parkinson /></CompositionStage></div>;
}
window.ParkinsonApp = ParkinsonApp;
