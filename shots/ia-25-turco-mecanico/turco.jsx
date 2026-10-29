// Shot IA #25 · El "robot" que jugaba ajedrez era una persona escondida — NARRADO (N1 "Por dentro").
// El Turco de Kempelen (muñeco sentado TRAS una caja, tablero encima de la caja) y el Mechanical Turk de Amazon (2005–2026).
// Fuentes y verificación: guion.md y verificacion.md. Todo el dibujo es esquemático.

const MADERA = '#9a5b2e', MADERA2 = '#6e3d1c', MADERA3 = '#c27c45', PIEL = '#e7b98a', TELA = '#1f7a6a';

// Engrane con dientes.
function Engrane({ x, y, r, n = 10, ang = 0, color = KC.gold }) {
  const d = [];
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.22; d.push(`${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`); }
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={'M ' + d.join(' L ') + ' Z'} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle r={r * 0.45} fill="none" stroke={KC.ink} strokeWidth={4} /><circle r={r * 0.14} fill={KC.ink} />
  </g>;
}
// Punto (u, v) del tablero en perspectiva sobre la caja (u: izq→der, v: fondo→frente).
function tab(u, v) { const hw = 180 + 40 * v; return [-hw + 2 * hw * u, -62 + 62 * v]; }
// Peón / caballo esquemáticos.
function Pieza({ x, y, s = 1, negra = false, caballo = false, rot = 0 }) {
  const f = negra ? '#2a2420' : '#fff4dc';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={14} ry={5} fill={f} stroke={KC.ink} strokeWidth={3} />
    {caballo ? <path d="M -9 0 L -7 -18 Q -10 -30 -2 -38 L 10 -32 L 6 -26 L 9 -18 L 8 0 Z" fill={f} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
      : <><path d="M -8 0 L -4 -16 L 4 -16 L 8 0 Z" fill={f} stroke={KC.ink} strokeWidth={3} /><circle cx={0} cy={-21} r={7} fill={f} stroke={KC.ink} strokeWidth={3} /></>}
  </g>;
}
const PIEZAS = [[0.06, 0.15, 1], [0.19, 0.15, 1], [0.44, 0.12, 1], [0.69, 0.15, 1], [0.81, 0.12, 1], [0.31, 0.3, 1],
  [0.12, 0.85, 0], [0.31, 0.85, 0], [0.56, 0.85, 0], [0.81, 0.88, 0], [0.69, 0.7, 0]];
// El Turco: muñeco sentado detrás del gabinete, tablero encima de la caja.
// mano: [x, y] local de la mano derecha (lado izquierdo de la pantalla). puertas 0..1. vuelan 0..1 (piezas que salen volando).
// caballo: [u, v] del caballo; enMano: el caballo va pegado a la mano. robot: en lugar del muñeco va el robotito de la IA.
function Automata({ x, y, s = 1, T = 0, mano = [-150, -30], puertas = 0, vuelan = 0, caballo = [0.4, 0.62], enMano = false, robot = false, ojos = 0 }) {
  const r = krng(7), cab = enMano ? [mano[0] + 4, mano[1] + 6] : tab(caballo[0], caballo[1]);
  const hombro = [-88, -212], codo = [klerp(hombro[0], mano[0], 0.5) - 46, klerp(hombro[1], mano[1], 0.5) + 10];
  const piezas = PIEZAS.map(([u, v, n], i) => { const [px, py] = tab(u, v), vx = (r() - 0.5) * 900, vy = -500 - r() * 400, t = vuelan;
    return <Pieza key={i} x={px + vx * t} y={py + vy * t + 1400 * t * t} rot={t * (r() - 0.5) * 900} negra={!n} s={1} />; });
  const puerta = (x0, w, abre) => { const p = kprog(abre, 0, 1);
    return <g>
      <rect x={x0} y={22} width={w} height={186} fill="#1a0f08" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${x0} 22 L ${x0 - w * 0.55 * p} ${22 - 16 * p} L ${x0 - w * 0.55 * p} ${208 + 16 * p} L ${x0} 208 Z`} fill={MADERA3} stroke={KC.ink} strokeWidth={4} opacity={p > 0.02 ? 1 : 0} />
      <rect x={x0 + w * p} y={22} width={w * (1 - p)} height={186} fill={MADERA} stroke={KC.ink} strokeWidth={5} />
      {p < 0.6 && <rect x={x0 + w * p + w * (1 - p) * 0.15} y={44} width={w * (1 - p) * 0.7} height={142} rx={6} fill="none" stroke={MADERA2} strokeWidth={4} />}
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={318} rx={300} ry={26} fill="rgba(0,0,0,.25)" />
    {/* muñeco (detrás de la caja) */}
    {robot ? <Robotito x={0} y={-190} s={0.95} T={T} cara="feliz" /> : <g>
      <path d="M -120 0 L -96 -228 Q 0 -262 96 -228 L 120 0 Z" fill={TELA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -20 -250 L -30 0 M 20 -250 L 30 0" stroke="#fff" strokeWidth={14} />
      {[-200, -160, -120, -80, -40].map((yy) => <g key={yy}><circle cx={-27} cy={yy} r={3} fill={KC.ink} /><circle cx={27} cy={yy} r={3} fill={KC.ink} /></g>)}
      <rect x={-110} y={-110} width={220} height={22} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
      {/* brazo izquierdo con la pipa larga */}
      <path d="M 88 -212 Q 150 -160 150 -70" stroke={TELA} strokeWidth={46} fill="none" strokeLinecap="round" />
      <path d="M 88 -212 Q 150 -160 150 -70" stroke={KC.ink} strokeWidth={54} fill="none" strokeLinecap="round" opacity="0" />
      <circle cx={150} cy={-64} r={22} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
      <line x1={150} y1={-64} x2={262} y2={-196} stroke="#3b2414" strokeWidth={9} strokeLinecap="round" />
      <path d="M 252 -196 l 22 -6 l 6 22 l -18 6 Z" fill="#3b2414" stroke={KC.ink} strokeWidth={4} />
      {/* cabeza y turbante */}
      <rect x={-22} y={-262} width={44} height={30} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={-300} r={52} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
      <path d="M -40 -270 Q 0 -230 40 -270 Q 30 -236 0 -232 Q -30 -236 -40 -270 Z" fill="#2a1a10" stroke={KC.ink} strokeWidth={4} />
      <path d="M -34 -282 Q -16 -294 0 -284 Q 16 -294 34 -282 Q 18 -276 0 -280 Q -18 -276 -34 -282 Z" fill="#1a100a" />
      <circle cx={-19 + ojos * 6} cy={-308} r={6} fill={KC.ink} /><circle cx={19 + ojos * 6} cy={-308} r={6} fill={KC.ink} />
      <path d="M -32 -322 l 22 -4 M 32 -322 l -22 -4" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={0} cy={-352} rx={72} ry={42} fill="#fbf6ea" stroke={KC.ink} strokeWidth={7} />
      <path d="M -66 -346 Q 0 -324 66 -346 M -60 -364 Q 0 -342 60 -364" stroke="#d8cdb6" strokeWidth={5} fill="none" />
      <path d="M -30 -384 Q 0 -414 30 -384 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={-346} r={10} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    </g>}
    {/* caja (gabinete) */}
    <rect x={-262} y={0} width={524} height={300} rx={8} fill={MADERA} stroke={KC.ink} strokeWidth={8} />
    {puerta(-240, 150, 0)}
    {puerta(-80, 150, puertas)}
    {puerta(80, 160, puertas)}
    {puertas > 0.05 && <g opacity={kprog(puertas, 0.2, 0.6)}>
      <Engrane x={-28} y={80} r={34} ang={T * 90} /><Engrane x={30} y={130} r={26} n={8} ang={-T * 120} color={KC.orange} /><Engrane x={-20} y={170} r={20} n={7} ang={T * 160} color={KC.mint} />
      <Engrane x={130} y={70} r={24} n={8} ang={-T * 110} color={KC.cyan} /><Engrane x={190} y={140} r={36} ang={T * 70} /><Engrane x={120} y={175} r={18} n={7} ang={-T * 150} color={KC.orange} />
      <path d="M 100 40 L 220 190 M 220 40 L 100 190" stroke="#bfbfbf" strokeWidth={6} />
      <path d="M -60 40 L 60 200" stroke="#bfbfbf" strokeWidth={6} />
    </g>}
    <rect x={-240} y={222} width={480} height={62} rx={6} fill={MADERA3} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={253} r={9} fill={KC.gold} stroke={KC.ink} strokeWidth={3} />
    {/* tablero encima de la caja */}
    <path d={`M ${tab(0, 0)} L ${tab(1, 0)} L ${tab(1, 1)} L ${tab(0, 1)} Z`} fill="#f2e2c0" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 64 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8); if ((c + f) % 2 === 0) return null;
      const a = tab(c / 8, f / 8), b = tab((c + 1) / 8, f / 8), cc = tab((c + 1) / 8, (f + 1) / 8), d = tab(c / 8, (f + 1) / 8);
      return <path key={i} d={`M ${a} L ${b} L ${cc} L ${d} Z`} fill={MADERA2} />; })}
    <path d={`M ${tab(0, 1)} L ${tab(1, 1)} L ${tab(1, 1)[0]} 8 L ${tab(0, 1)[0]} 8 Z`} fill={MADERA2} stroke={KC.ink} strokeWidth={5} />
    {piezas}
    <Pieza x={cab[0] + (vuelan ? -300 * vuelan : 0)} y={cab[1] + (vuelan ? -600 * vuelan + 1400 * vuelan * vuelan : 0)} caballo s={1.25} rot={vuelan * 400} />
    {/* brazo derecho que juega */}
    {!robot && <g>
      <path d={`M ${hombro} Q ${codo} ${mano}`} stroke={TELA} strokeWidth={44} fill="none" strokeLinecap="round" />
      <path d={`M ${mano[0] - 16} ${mano[1] - 30} L ${mano[0] + 16} ${mano[1] - 30}`} stroke="#fff" strokeWidth={12} />
      <circle cx={mano[0]} cy={mano[1] - 8} r={20} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Mano del Turco moviendo el caballo: devuelve {mano, enMano, caballo} para un movimiento entre t0 y t0 + 1.6 s.
function jugada(T, t0, desde = [0.4, 0.62], hasta = [0.56, 0.42]) {
  const reposo = [-150, -30], A = tab(...desde), B = tab(...hasta);
  const a = kprog(T, t0, t0 + 0.45, kEase.suave), b = kprog(T, t0 + 0.5, t0 + 1.1, kEase.suave), c = kprog(T, t0 + 1.15, t0 + 1.6, kEase.suave);
  const lev = Math.sin(Math.PI * b) * 40;
  let mano = reposo;
  if (T < t0 + 0.5) mano = [klerp(reposo[0], A[0], a), klerp(reposo[1], A[1] - 14, a)];
  else if (T < t0 + 1.15) mano = [klerp(A[0], B[0], b), klerp(A[1] - 14, B[1] - 14, b) - lev];
  else mano = [klerp(B[0], reposo[0], c), klerp(B[1] - 14, reposo[1], c)];
  const enMano = T >= t0 + 0.5 && T < t0 + 1.15;
  return { mano, enMano, caballo: T >= t0 + 1.15 ? hasta : desde };
}
// Por dentro de la caja: el ajedrecista escondido con su vela, los imanes bajo el tablero y la palanca del brazo (cuadro 400 × 400).
function Escondido({ T, s = 1, varios = false }) {
  const fl = 1 + 0.12 * Math.sin(T * 17) + 0.08 * Math.sin(T * 29), cola = Math.sin(T * 2.2);
  if (varios) return <svg width={400 * s} height={400 * s} viewBox="0 0 400 400">
    <rect width={400} height={400} fill="#0b1626" />
    {[[90, 220, KC.pink], [200, 250, KC.mint], [310, 220, KC.yellow]].map(([x, y, c], i) => <g key={i}>
      <circle cx={x} cy={y - 70} r={28} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${x - 40} ${y + 50} Q ${x - 40} ${y - 30} ${x} ${y - 36} Q ${x + 40} ${y - 30} ${x + 40} ${y + 50} Z`} fill={c} stroke={KC.ink} strokeWidth={5} />
      <rect x={x - 46} y={y + 10} width={92} height={56} rx={6} fill="#2b3445" stroke={KC.ink} strokeWidth={5} />
      <rect x={x - 38} y={y + 17} width={76} height={40} fill={KC.cyan} opacity={0.5 + 0.3 * Math.sin(T * 3 + i)} />
      <text x={x} y={y - 120 - 6 * Math.sin(T * 2 + i)} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={i === 1 ? KC.red : KC.mint}>{i === 1 ? 'no ✘' : 'gato ✔'}</text>
    </g>)}
  </svg>;
  return <svg width={400 * s} height={400 * s} viewBox="0 0 400 400">
    <rect width={400} height={400} fill="#0b1626" />
    <radialGradient id="velaLuz"><stop offset="0" stopColor="#ffcf5a" stopOpacity=".55" /><stop offset="1" stopColor="#ffcf5a" stopOpacity="0" /></radialGradient>
    <circle cx={96} cy={250} r={150 * fl} fill="url(#velaLuz)" />
    {/* tablero visto por abajo, con los imanes colgando */}
    <rect x={20} y={40} width={360} height={22} fill={MADERA} stroke={KC.ink} strokeWidth={5} />
    {[60, 105, 150, 195, 240, 285, 330].map((x, i) => { const baja = i === 4 ? 6 + 10 * Math.max(0, Math.sin(T * 3)) : 6;
      return <g key={x}><line x1={x} y1={62} x2={x} y2={62 + baja} stroke="#ccc" strokeWidth={3} /><circle cx={x} cy={70 + baja} r={9} fill={i === 4 ? KC.gold : '#9aa3b2'} stroke={KC.ink} strokeWidth={3} /></g>; })}
    {/* palanca (pantógrafo) hacia el brazo del muñeco */}
    <path d={`M 262 ${160 + cola * 6} L 300 62`} stroke="#bfbfbf" strokeWidth={8} strokeLinecap="round" />
    <path d="M 300 62 L 300 20" stroke="#bfbfbf" strokeWidth={8} strokeDasharray="10 8" />
    {/* el ajedrecista sentado */}
    <rect x={160} y={330} width={110} height={18} rx={6} fill={MADERA2} stroke={KC.ink} strokeWidth={4} />
    <path d="M 150 330 Q 150 236 210 228 Q 268 236 268 330 Z" fill="#6b4a8a" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 245 250 Q 270 ${200 + cola * 4} 262 ${160 + cola * 6}`} stroke="#6b4a8a" strokeWidth={22} fill="none" strokeLinecap="round" />
    <circle cx={262} cy={160 + cola * 6} r={12} fill={PIEL} stroke={KC.ink} strokeWidth={4} />
    <circle cx={208} cy={190} r={32} fill={PIEL} stroke={KC.ink} strokeWidth={5} />
    <path d="M 178 182 Q 186 150 214 152 Q 240 156 240 182 Q 222 166 196 172 Z" fill="#3a2414" />
    <circle cx={214} cy={186} r={4} fill={KC.ink} /><circle cx={228} cy={186} r={4} fill={KC.ink} />
    {/* tablerito propio en las piernas */}
    <path d="M 150 292 L 236 292 L 248 312 L 140 312 Z" fill="#f2e2c0" stroke={KC.ink} strokeWidth={4} />
    <path d="M 172 292 L 168 312 M 194 292 L 194 312 M 216 292 L 220 312" stroke={MADERA2} strokeWidth={4} />
    {/* vela */}
    <rect x={86} y={262} width={20} height={56} fill="#fff4dc" stroke={KC.ink} strokeWidth={4} />
    <path d={`M 96 ${262} q ${-10 * fl} -18 0 ${-34 * fl} q ${10 * fl} 16 0 ${34 * fl} Z`} fill={KC.yellow} stroke={KC.orange} strokeWidth={3} />
    <rect x={76} y={316} width={40} height={10} rx={4} fill="#9aa3b2" stroke={KC.ink} strokeWidth={3} />
  </svg>;
}
// Napoleón esquemático (bicornio, casaca azul).
function Napoleon({ x, y, s = 1, brazo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 260 L -60 120 L 60 120 L 70 260 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    <path d="M -90 130 Q -96 -10 0 -24 Q 96 -10 90 130 Z" fill="#23346e" stroke={KC.ink} strokeWidth={7} />
    <path d="M -22 -20 L 0 60 L 22 -20" fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
    <rect x={-92} y={96} width={184} height={18} fill="#f4efe4" stroke={KC.ink} strokeWidth={4} />
    <path d={`M 80 0 Q ${150 + brazo * 20} ${-10 - brazo * 30} ${190 + brazo * 40} ${-30 - brazo * 10}`} stroke="#23346e" strokeWidth={34} fill="none" strokeLinecap="round" />
    <circle cx={190 + brazo * 40} cy={-30 - brazo * 10} r={16} fill={PIEL} stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-70} r={46} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    <circle cx={14} cy={-74} r={5} fill={KC.ink} />
    <path d="M -110 -96 Q 0 -190 110 -96 Q 0 -120 -110 -96 Z" fill="#16120f" stroke={KC.ink} strokeWidth={6} />
    <circle cx={50} cy={-118} r={10} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Fotos dibujadas para etiquetar.
function Foto({ x, y, w = 250, h = 170, tipo = 'gato', etq = 0, ok = true }) {
  const cx = w / 2, cy = h / 2 + 6;
  const dib = {
    gato: <g><path d={`M ${cx - 46} ${cy - 20} L ${cx - 40} ${cy - 62} L ${cx - 14} ${cy - 38} L ${cx + 14} ${cy - 38} L ${cx + 40} ${cy - 62} L ${cx + 46} ${cy - 20} Q ${cx + 50} ${cy + 40} ${cx} ${cy + 44} Q ${cx - 50} ${cy + 40} ${cx - 46} ${cy - 20} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
      <circle cx={cx - 18} cy={cy} r={6} fill={KC.ink} /><circle cx={cx + 18} cy={cy} r={6} fill={KC.ink} /><path d={`M ${cx - 6} ${cy + 14} l 6 6 l 6 -6 M ${cx - 60} ${cy + 14} l 34 -4 M ${cx + 60} ${cy + 14} l -34 -4`} stroke={KC.ink} strokeWidth={4} fill="none" /></g>,
    perro: <g><ellipse cx={cx} cy={cy} rx={44} ry={42} fill="#c89a5e" stroke={KC.ink} strokeWidth={5} /><ellipse cx={cx - 46} cy={cy - 6} rx={14} ry={32} fill="#7a5530" stroke={KC.ink} strokeWidth={4} /><ellipse cx={cx + 46} cy={cy - 6} rx={14} ry={32} fill="#7a5530" stroke={KC.ink} strokeWidth={4} />
      <circle cx={cx - 15} cy={cy - 8} r={6} fill={KC.ink} /><circle cx={cx + 15} cy={cy - 8} r={6} fill={KC.ink} /><ellipse cx={cx} cy={cy + 14} rx={12} ry={8} fill={KC.ink} /></g>,
    coche: <g><path d={`M ${cx - 80} ${cy + 20} L ${cx - 80} ${cy - 4} L ${cx - 44} ${cy - 10} L ${cx - 24} ${cy - 40} L ${cx + 34} ${cy - 40} L ${cx + 56} ${cy - 8} L ${cx + 80} ${cy - 2} L ${cx + 80} ${cy + 20} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={cx - 44} cy={cy + 22} r={16} fill={KC.ink} /><circle cx={cx + 44} cy={cy + 22} r={16} fill={KC.ink} /></g>,
    flor: <g>{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={cx + Math.cos(a * Math.PI / 180) * 26} cy={cy - 8 + Math.sin(a * Math.PI / 180) * 26} r={20} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />)}
      <circle cx={cx} cy={cy - 8} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /><path d={`M ${cx} ${cy + 18} L ${cx} ${cy + 60}`} stroke={KC.leaf} strokeWidth={8} /></g>,
  }[tipo];
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
    {dib}
    {etq > 0 && <g transform={`translate(${w - 20} 18) scale(${klerp(1.8, 1, etq)})`} opacity={Math.min(1, etq * 2)}>
      <rect x={-118} y={-4} width={128} height={44} rx={22} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={4} />
      <text x={-54} y={27} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{ok ? 'gato ✔' : 'no ✘'}</text>
    </g>}
  </g>;
}
// Navegador genérico con tarjetitas de tareas; persiana 0..1 la cierra.
function Navegador({ T, at, until, y = 700, persiana = 0, turbante = 0 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kprog(T, at, at + 0.5, kEase.sale) * (until == null ? 1 : 1 - kprog(T, until, until + 0.35, kEase.suave));
  const tareas = ['¿Qué hay en esta foto?', 'Escribe lo que dice este audio', '¿Este texto es una reseña buena o mala?'];
  return <div style={{ position:'absolute', left:110, width:860, top:y, zIndex:20, opacity:e, transform:`translateY(${(1 - e) * 60}px)`,
    background:'#f6f3ec', border:`8px solid ${KC.ink}`, borderRadius:28, overflow:'hidden', boxShadow:`14px 14px 0 ${KC.ink}` }}>
    <div style={{ height:58, background:'#2b3445', display:'flex', alignItems:'center', gap:12, padding:'0 22px' }}>
      {[KC.red, KC.yellow, KC.mint].map((c) => <div key={c} style={{ width:20, height:20, borderRadius:10, background:c }}></div>)}
      <div style={{ marginLeft:16, flex:1, height:30, borderRadius:15, background:'#10131a' }}></div>
    </div>
    <div style={{ padding:'20px 30px 26px', position:'relative' }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, font:`400 64px ${KF.titulo}`, color:KC.ink }}>
        <svg width={70} height={60} viewBox="-75 -60 150 90" style={{ opacity:turbante, transform:`scale(${klerp(2, 1, turbante)})` }}>
          <ellipse cx={0} cy={0} rx={70} ry={40} fill="#fbf6ea" stroke={KC.ink} strokeWidth={8} /><path d="M -30 -30 Q 0 -60 30 -30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle r={11} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
        </svg>
        Mechanical Turk
      </div>
      {tareas.map((t, i) => { const a = kprog(T, at + 0.9 + i * 0.6, at + 1.3 + i * 0.6, kEase.sale);
        return <div key={i} style={{ marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', border:`5px solid ${KC.ink}`, borderRadius:18, padding:'14px 20px',
          opacity:a, transform:`translateX(${(1 - a) * 80}px)`, font:`800 32px ${KF.texto}`, color:KC.ink }}>
          <span>{t}</span><span style={{ font:`700 26px ${KF.mono}`, background:KC.yellow, border:`3px solid ${KC.ink}`, borderRadius:12, padding:'4px 12px' }}>tarea</span>
        </div>; })}
      {persiana > 0 && <div style={{ position:'absolute', left:0, right:0, top:0, height:`${persiana * 100}%`, background:'repeating-linear-gradient(#9aa3b2 0 34px, #6f7889 34px 40px)', borderBottom:`8px solid ${KC.ink}` }}>
        <div style={{ position:'absolute', left:'50%', bottom:40, transform:`translateX(-50%) rotate(-4deg)`, opacity:kprog(persiana, 0.85, 1), background:KC.red, color:'#fff', border:`6px solid ${KC.ink}`,
          borderRadius:16, padding:'10px 30px', font:`400 70px ${KF.titulo}`, whiteSpace:'nowrap' }}>CERRADO</div>
      </div>}
    </div>
  </div>;
}

function Turco() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tu: CUES.Turco, Pu: CUES.Puertas, A: CUES.Adentro, N: CUES.Napoleon, P: CUES.Pregunta, Am: CUES.Amazon, E: CUES.Etiquetas, Ce: CUES.Cerro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const j0 = jugada(T, K.G + 0.05), j1 = jugada(T, K.Tu + 1.6, [0.56, 0.42], [0.31, 0.55]);
  // barrido de Napoleón: la mano cruza el tablero y las piezas vuelan
  const barre = kprog(T, K.N + 4.6, K.N + 5.1, kEase.sale), vuela = kprog(T, K.N + 4.8, K.N + 6.4);
  const manoN = T < K.N + 4.6 ? [-150, -30] : [klerp(-200, 220, barre), -40 - Math.sin(Math.PI * barre) * 20];
  const jC = jugada(T, K.C + 0.2, [0.31, 0.55], [0.5, 0.4]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el Turco juega... y adentro hay alguien */}
      <Escena T={T} a={K.G} b={K.Tu}>
        <FondoLunares color={KC.yellow} />
        {svg(<Automata x={330} y={850} s={0.95} T={T} {...j0} />)}
      </Escena>
      <Lupa T={T} at={K.G + 1.7} until={K.Tu - 0.3} x={330} y={990} r={180} fx={330} fy={990} tinte={KC.cyan} linea={false} interior={(t, r) => <Escondido T={t} s={(2 * r) / 400} />} />
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.Tu - 0.3} texto="robot" x={330} y={1480} tam={54} />
      <Chip T={T} at={K.G + 1.9} until={K.Tu - 0.3} texto="una persona escondida" x={540} y={1590} tam={40} borde={KC.red} />

      {/* 2 · el Turco: muñeco sentado tras la caja */}
      <Escena T={T} a={K.Tu} b={K.Pu}>
        <FondoLunares color={KC.pink} />
        {svg(<Automata x={430} y={880} s={1.1} T={T} {...j1} ojos={Math.sin(T) * 0.6} />)}
      </Escena>
      <Etq T={T} at={K.Tu + 0.5} until={K.Tu + 2.8} x={510} y={455} texto="turbante" />
      <Etq T={T} at={K.Tu + 1.0} until={K.Pu - 0.2} x={640} y={720} texto="muñeco de madera" />
      <Etq T={T} at={K.Tu + 3.2} until={K.Pu - 0.2} x={700} y={860} texto="tablero" />
      <Etq T={T} at={K.Tu + 3.6} until={K.Pu - 0.2} x={730} y={1060} texto="caja" />

      {/* 3 · abren las puertas: engranes */}
      <Escena T={T} a={K.Pu} b={K.A} zoom={0.12} origen="45% 55%">
        <FondoLunares color={KC.orange} />
        {svg(<Automata x={470} y={840} s={1.1} T={T} puertas={kprog(T, K.Pu + 0.4, K.Pu + 1.6, kEase.sale)} caballo={[0.31, 0.55]} />)}
      </Escena>
      <Etq T={T} at={K.Pu + 2.0} until={K.A - 0.2} x={720} y={960} texto="engranes" />
      <Etq T={T} at={K.Pu + 2.8} until={K.A - 0.2} x={720} y={1040} texto="palancas" />
      <Chip T={T} at={K.Pu + 0.6} until={K.A - 0.2} texto="antes de jugar" x={540} y={1470} tam={40} borde={KC.ink} />

      {/* 4 · por dentro: el maestro de ajedrez escondido */}
      <Escena T={T} a={K.A} b={K.N}>
        <FondoCircuito T={T} color={KC.gold} />
        <div style={{ position:'absolute', left:250, top:530, width:600, height:600, borderRadius:40, overflow:'hidden', border:`10px solid ${KC.gold}`, boxShadow:`0 0 60px ${KC.gold}66` }}>
          <Escondido T={T} s={600 / 400} />
        </div>
      </Escena>
      <Chip T={T} at={K.A + 0.3} until={K.N - 0.2} texto="POR DENTRO · esquemático" x={700} y={440} tam={32} borde={KC.gold} mono />
      <Etq T={T} at={K.A + 1.0} until={K.N - 0.2} x={600} y={960} texto="maestro de ajedrez" tam={30} />
      <Etq T={T} at={K.A + 2.4} until={K.N - 0.2} x={330} y={700} texto="imanes bajo el tablero" tam={30} />
      <Etq T={T} at={K.A + 4.2} until={K.N - 0.2} x={700} y={760} texto="palanca → brazo" tam={30} />

      {/* 5 · Napoleón y la trampa (según los relatos) */}
      <Escena T={T} a={K.N} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Automata x={680} y={930} s={0.82} T={T} mano={manoN} vuelan={vuela} caballo={[0.5, 0.4]} />
          <g opacity={kprog(T, K.N + 2.6, K.N + 3.1)}><Napoleon x={170} y={930} s={0.85} brazo={kprog(T, K.N + 3.2, K.N + 3.8, kEase.sale)} /></g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.N + 0.2} until={K.N + 2.6} anio="1809" quien="Viena · palacio de Schönbrunn" revista="según los relatos" y={760} />
      <Chip T={T} at={K.N + 3.0} until={K.P - 0.2} texto="leyenda · según los relatos" x={540} y={1460} tam={32} borde={KC.ink} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Am} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>

      {/* 7 · Amazon Mechanical Turk (2005) */}
      <Escena T={T} a={K.Am} b={K.E}>
        <FondoCircuito T={T} />
      </Escena>
      <Chip T={T} at={K.Am + 0.2} until={K.E - 0.2} texto="2005 · Amazon" x={700} y={560} tam={46} borde={KC.cyan} />
      <Navegador T={T} at={K.Am + 0.6} until={K.E - 0.3} y={640} turbante={kprog(T, K.Am + 6.4, K.Am + 6.9, kEase.rebote)} />
      <Chip T={T} at={K.Am + 6.9} until={K.E - 0.2} texto="= «el Turco mecánico»" x={540} y={1470} tam={44} borde={KC.gold} />

      {/* 8 · personas etiquetan datos */}
      <Escena T={T} a={K.E} b={K.Ce}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {[['gato', true], ['perro', false], ['gato', true], ['coche', false], ['gato', true], ['flor', false]].map(([tp, ok], i) =>
            <Foto key={i} x={110 + (i % 3) * 300} y={720 + Math.floor(i / 3) * 210} tipo={tp} ok={ok} etq={kprog(T, K.E + 1.4 + i * 0.35, K.E + 1.7 + i * 0.35, kEase.sale)} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.E + 0.3} until={K.Ce - 0.2} texto="personas etiquetan · la IA aprende" x={540} y={1490} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.E + 0.6} until={K.Ce - 0.2} texto="ejemplo ilustrativo" x={540} y={1580} tam={26} borde={KC.texto} />

      {/* 9 · Amazon la cerró (30 sep 2026) */}
      <Escena T={T} a={K.Ce} b={K.C}>
        <FondoCircuito T={T} color={KC.red} />
      </Escena>
      <Navegador T={T} at={K.Ce + 0.1} until={K.C - 0.3} y={640} turbante={1} persiana={kprog(T, K.Ce + 1.2, K.Ce + 2.4, kEase.suave)} />
      <Chip T={T} at={K.Ce + 2.2} until={K.C - 0.2} texto="30 de septiembre de 2026" x={540} y={1460} tam={40} borde={KC.red} />

      {/* 10 · cierre: la misma caja, ahora con la IA encima… y personas adentro */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<Automata x={330} y={850} s={0.95} T={T} robot caballo={jC.caballo} />)}
      </Escena>
      <Lupa T={T} at={K.C + 1.6} until={K.Ou} x={330} y={990} r={180} fx={330} fy={990} tinte={KC.pink} linea={false} interior={(t, r) => <Escondido T={t} s={(2 * r) / 400} varios />} />
      <MitoTachado T={T} at={K.C + 0.3} tacharEn={K.C + 2.4} until={K.Ou} texto="magia" x={330} y={1480} tam={54} />
      <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="detrás: personas" x={540} y={1590} tam={40} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Tu - 0.1} texto="No es un robot: *es una persona escondida.*" />
      <Subtitulo T={T} idx={1} at={K.Tu + 0.1} until={K.Pu - 0.1} texto="El Turco: *un muñeco tras una caja.*" />
      <Subtitulo T={T} idx={2} at={K.Pu + 0.1} until={K.A - 0.1} texto="Abrían la caja: *engranes y palancas.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.N - 0.1} texto="Adentro: *un maestro de ajedrez.*" />
      <Subtitulo T={T} idx={4} at={K.N + 0.1} until={K.P - 0.1} texto="Napoleón hizo trampa… *y voló el tablero.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Am - 0.1} texto="¿Y qué tiene que ver *con tu IA?*" />
      <Subtitulo T={T} idx={6} at={K.Am + 0.1} until={K.E - 0.1} texto="2005: *Mechanical Turk.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Ce - 0.1} texto="Personas *etiquetaban datos.*" />
      <Subtitulo T={T} idx={8} at={K.Ce + 0.1} until={K.C - 0.1} texto="En 2026: *cerrado.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Detrás de la IA *hubo personas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Turco + 3.0, CUES.Puertas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Adentro + 0.5, CUES.Adentro + 4.4, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Napoleon + 2.8, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Amazon + 1.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Amazon + 4.6, CUES.Etiquetas - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Etiquetas + 1.2, CUES.Cerro - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cerro + 0.3, CUES.Cierre - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_10_serio_molesto', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="25" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TurcoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Turco /></CompositionStage></div>;
}
window.TurcoApp = TurcoApp;
