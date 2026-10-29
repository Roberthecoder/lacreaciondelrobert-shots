// Shot Científico #26 · Tu microondas no calienta de adentro hacia afuera — NARRADO (N1 "Por dentro": la comida en corte con su mapa de calor).
// Datos: FDA "Microwave Ovens"; NC State Extension 2024; Tang 2015 (J. Food Sci.); USDA FSIS. Ver guion.md y verificacion.md.
// El dibujo es esquemático: las ondas no se ven y los colores del corte son un mapa de calor ilustrativo.
const MFRIO = '#3b6dff', MTIBIO = '#ffb02e', MCALIENTE = '#ff3b2f', MCOMIDA = '#c98a4b', MONDA = KC.cyan;
function mHex(a, b, t) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(klerp(v, B[i], kclamp(t, 0, 1))).toString(16).padStart(2, '0')).join(''); }
// mapa de calor: 0 frío (azul) · 0.5 tibio (naranja) · 1 caliente (rojo)
const mCalor = (c) => (c < 0.5 ? mHex(MFRIO, MTIBIO, c / 0.5) : mHex(MTIBIO, MCALIENTE, (c - 0.5) / 0.5));
// ondas onduladas dentro de una caja (recortadas). vert: también verticales. llena 0..1: cuántas líneas ya entraron.
function OndasCaja({ id, x0, y0, w, h, T, n = 5, amp = 16, lam = 90, o = 1, llena = 1, vert = false, color = MONDA, grosor = 7 }) {
  const linea = (k, v) => { const pts = []; const L = v ? h : w; for (let s = 0; s <= L; s += 8) { const off = Math.sin((s / lam) * 2 * Math.PI - T * 7 + k) * amp;
    pts.push(v ? `${(x0 + (k + 0.5) * w / n + off).toFixed(1)},${(y0 + s).toFixed(1)}` : `${(x0 + s).toFixed(1)},${(y0 + (k + 0.5) * h / n + off).toFixed(1)}`); } return pts.join(' '); };
  return <g opacity={o}><defs><clipPath id={id}><rect x={x0} y={y0} width={w} height={h} rx={12} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>{Array.from({ length: n }, (_, k) => <g key={k} opacity={kclamp(llena * n - k, 0, 1)}>
      <polyline points={linea(k, false)} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" opacity=".85" />
      {vert && <polyline points={linea(k, true)} fill="none" stroke={color} strokeWidth={grosor * 0.7} strokeLinecap="round" opacity=".5" />}</g>)}</g></g>;
}
// pedazo de comida visto de frente: borde/centro = calor 0..1 (el borde se pinta como una banda de calor).
function PiezaFrente({ x, y, w = 200, h = 90, borde = 0, centro = 0, vapor = 0, T = 0 }) {
  const rim = Math.min(w, h) * 0.22;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h * 0.4} fill={centro > 0.02 ? mHex(MCOMIDA, mCalor(centro), 0.75) : MCOMIDA} stroke={KC.ink} strokeWidth={7} />
    {borde > 0.02 && <rect x={-w / 2 + rim / 2} y={-h / 2 + rim / 2} width={w - rim} height={h - rim} rx={h * 0.32} fill="none" stroke={mCalor(borde)} strokeWidth={rim} opacity={0.9} />}
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h * 0.4} fill="none" stroke={KC.ink} strokeWidth={7} />
    {vapor > 0 && [-0.3, 0, 0.3].map((f, i) => { const k = ((T * 0.7 + i * 0.33) % 1);
      return <path key={i} d={`M ${f * w} ${-h / 2 - 10 - k * 90} q 18 -20 0 -40 q -18 -20 0 -40`} fill="none" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={vapor * (1 - k)} />; })}
  </g>;
}
// Horno de microondas de frente. (x, y) = centro. luz 0..1 (encendido), giro = ángulo del plato, puerta 0..1 (abierta).
function Microondas({ x, y, s = 1, T = 0, luz = 0, giro = 0, puerta = 0, borde = 0, centro = 0, vapor = 0, id = 'mo', ondas = 1, children }) {
  const cx0 = -315, cy0 = -190, cw = 445, ch = 380, dx = Math.sin(giro) * 45;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={215} width={60} height={22} rx={8} fill={KC.ink} /><rect x={240} y={215} width={60} height={22} rx={8} fill={KC.ink} />
    <rect x={-345} y={-222} width={690} height={444} rx={36} fill="#eef1f5" stroke={KC.ink} strokeWidth={12} />
    {/* cavidad */}
    <rect x={cx0} y={cy0} width={cw} height={ch} rx={14} fill={mHex('#3a3f4a', '#b98a3a', luz * 0.7)} stroke={KC.ink} strokeWidth={8} />
    {luz > 0 && <rect x={cx0} y={cy0} width={cw} height={ch} rx={14} fill="#ffe08a" opacity={0.28 * luz} />}
    {luz > 0 && ondas > 0 && <OndasCaja id={id + 'w'} x0={cx0} y0={cy0} w={cw} h={ch - 60} T={T} n={4} amp={14} lam={80} o={luz * ondas * 0.8} grosor={6} />}
    <ellipse cx={cx0 + cw / 2} cy={140} rx={180} ry={32} fill="#dfe6ee" stroke={KC.ink} strokeWidth={7} />
    <circle cx={cx0 + cw / 2 + Math.sin(giro + 1.2) * 160} cy={140 + Math.cos(giro + 1.2) * 22} r={8} fill={KC.ink} opacity=".5" />
    <PiezaFrente x={cx0 + cw / 2 + dx} y={88} w={200 - Math.abs(Math.sin(giro)) * 30} h={92} borde={borde} centro={centro} vapor={vapor} T={T} />
    {children}
    {/* puerta (se abre desde la bisagra izquierda) */}
    <g transform={`translate(-345 0) scale(${1 - 0.86 * puerta} 1) translate(345 0)`}>
      <path d={`M -345 -222 H 150 V 222 H -345 Z M ${cx0 + 12} ${cy0 + 12} V ${cy0 + ch - 12} H ${cx0 + cw - 12} V ${cy0 + 12} Z`} fill="#dfe3ea" fillRule="evenodd" stroke={KC.ink} strokeWidth={8} opacity={puerta > 0.02 ? 1 : 0} />
      <rect x={cx0 + 12} y={cy0 + 12} width={cw - 24} height={ch - 24} rx={10} fill="rgba(25,35,50,.18)" stroke={KC.ink} strokeWidth={6} />
      <line x1={cx0 + 40} y1={cy0 + 40} x2={cx0 + 140} y2={cy0 + 40} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".55" />
      <rect x={128} y={-150} width={16} height={300} rx={8} fill="#aab3c0" stroke={KC.ink} strokeWidth={6} />
    </g>
    {/* panel */}
    <rect x={172} y={-188} width={148} height={64} rx={10} fill="#10261a" stroke={KC.ink} strokeWidth={6} />
    {luz > 0.5 ? <g>{[0, 1, 2, 3].map((i) => <rect key={i} x={190 + i * 30} y={-170} width={18} height={28} rx={4} fill="#4dff9a" opacity={0.35 + 0.65 * ((Math.floor(T * 4) + i) % 4 === 0 ? 1 : 0.4)} />)}</g>
      : <text x={246} y={-143} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#4dff9a" opacity=".7">--:--</text>}
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={182 + (i % 3) * 46} y={-100 + Math.floor(i / 3) * 46} width={34} height={32} rx={8} fill="#cfd6e0" stroke={KC.ink} strokeWidth={5} />)}
    <circle cx={246} cy={130} r={46} fill="#cfd6e0" stroke={KC.ink} strokeWidth={7} />
    <line x1={246} y1={130} x2={246 + Math.cos(-1.2 + giro * 0.2) * 34} y2={130 + Math.sin(-1.2 + giro * 0.2) * 34} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Corte de la comida con su mapa de calor. banda = hasta dónde entran las ondas (px); frente = hasta dónde llegó el calor por conducción (px).
function Corte({ x, y, w, h, banda = 55, frente = 0, mo = 1, M = 20 }) {
  const half = Math.min(w, h) / 2;
  const calor = (d) => { const mw = mo * (d <= banda ? 1 - 0.2 * d / banda : kclamp(1 - (d - banda) / 16, 0, 1) * 0.8);
    const cd = frente <= 0 ? 0 : d <= frente ? klerp(0.85, 0.55, d / Math.max(frente, 1)) : kclamp(1 - (d - frente) / 28, 0, 1) * 0.55;
    return Math.max(mw, cd); };
  const g = krng(26);
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: M }, (_, i) => { const ins = (i / M) * half, d = ins + half / M / 2;
      return <rect key={i} x={-w / 2 + ins} y={-h / 2 + ins} width={Math.max(2, w - 2 * ins)} height={Math.max(2, h - 2 * ins)} rx={Math.max(6, 70 - ins * 0.4)} fill={mCalor(calor(d))} />; })}
    {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={(g() - 0.5) * (w - 80)} cy={(g() - 0.5) * (h - 80)} r={4 + g() * 7} fill={KC.ink} opacity=".12" />)}
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={70} fill="none" stroke={KC.ink} strokeWidth={11} />
  </g>;
}
// flechitas de calor que avanzan desde el borde hacia adentro (de `desde` a `hasta` px de profundidad)
function FlechasCalor({ x, y, w, h, desde, hasta, T, o = 1, color = KC.yellow }) {
  if (o <= 0.01 || hasta <= desde) return null;
  const out = [];
  [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([sx, sy], lado) => [-1, 0, 1].forEach((k) => {
    const f = (T * 0.8 + k * 0.33 + lado * 0.17) % 1, d = klerp(desde, hasta, f);
    const px = sx ? sx * (w / 2 - d) : k * w * 0.28, py = sy ? sy * (h / 2 - d) : k * h * 0.25, rot = sx ? (sx > 0 ? 180 : 0) : (sy > 0 ? 270 : 90);
    out.push(<path key={lado + '-' + k} d="M -16 -20 L 8 0 L -16 20" transform={`translate(${x + px} ${y + py}) rotate(${rot})`} fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={o * Math.sin(Math.PI * f)} />);
    out.push(<path key={lado + '+' + k} d="M -16 -20 L 8 0 L -16 20" transform={`translate(${x + px} ${y + py}) rotate(${rot})`} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={o * Math.sin(Math.PI * f)} />);
  }));
  return <g>{out}</g>;
}
// ondas que llegan desde afuera y se apagan al cruzar la banda
function OndasEntrando({ x, y, w, h, banda, T, o = 1 }) {
  if (o <= 0.01) return null;
  const top = y - h / 2, izq = x - w / 2, der = x + w / 2;
  const vert = (xx, k) => { const pts = []; for (let s = -200; s <= banda; s += 8) pts.push(`${xx + Math.sin(s / 30 - T * 8 + k) * 12},${top + s}`); return pts.join(' '); };
  const hor = (yy, k, sgn) => { const pts = []; for (let s = -170; s <= banda; s += 8) pts.push(`${(sgn > 0 ? izq + s : der - s)},${yy + Math.sin(s / 30 - T * 8 + k) * 12}`); return pts.join(' '); };
  return <g opacity={o}>
    {[-0.36, -0.12, 0.12, 0.36].map((f, k) => <polyline key={'v' + k} points={vert(x + f * w, k)} fill="none" stroke={MONDA} strokeWidth={8} strokeLinecap="round" />)}
    {[-0.2, 0.2].map((f, k) => <polyline key={'i' + k} points={hor(y + f * h, k, 1)} fill="none" stroke={MONDA} strokeWidth={8} strokeLinecap="round" />)}
    {[-0.2, 0.2].map((f, k) => <polyline key={'d' + k} points={hor(y + f * h, k + 2, -1)} fill="none" stroke={MONDA} strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// molécula de agua (O rojo, dos H blancos)
function MolAgua({ x, y, r = 26, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[-52, 52].map((a) => <circle key={a} cx={Math.cos((a - 90) * Math.PI / 180) * r * 1.15} cy={Math.sin((a - 90) * Math.PI / 180) * r * 1.15} r={r * 0.6} fill="#f4f6fb" stroke={KC.ink} strokeWidth={5} />)}
    <circle r={r} fill="#ff4d5e" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function CopoFrio({ x, y, s = 1, o = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 20) * 3}) scale(${s})`} opacity={o}>
    {[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}><line x1={0} y1={-70} x2={0} y2={70} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" /><line x1={0} y1={-70} x2={0} y2={70} stroke="#e8f6ff" strokeWidth={11} strokeLinecap="round" />
      {[-1, 1].map((sy) => [-1, 1].map((sx) => <line key={sx + '' + sy} x1={0} y1={sy * 42} x2={sx * 22} y2={sy * 62} stroke="#e8f6ff" strokeWidth={9} strokeLinecap="round" />))}</g>)}
  </g>;
}
function Reloj({ x, y, r = 90, T = 0, vel = 1.6, o = 1 }) {
  const a = T * vel;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-24} y={-r - 34} width={48} height={26} rx={8} fill={KC.ink} />
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <path d={`M 0 0 L 0 ${-r + 12} A ${r - 12} ${r - 12} 0 ${(a % (2 * Math.PI)) > Math.PI ? 1 : 0} 1 ${Math.sin(a % (2 * Math.PI)) * (r - 12)} ${-Math.cos(a % (2 * Math.PI)) * (r - 12)} Z`} fill={KC.yellow} opacity=".7" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 10} x2={0} y2={-r + 24} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={Math.sin(a) * (r - 22)} y2={-Math.cos(a) * (r - 22)} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />
    <circle r={10} fill={KC.ink} />
  </g>;
}
// estufa: sartén sobre la llama (el calor entra desde abajo, poco a poco)
function Estufa({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={40} width={260} height={50} rx={12} fill="#cfd6e0" stroke={KC.ink} strokeWidth={8} />
    {[-50, -20, 10, 40].map((xx, i) => <path key={i} d={`M ${xx} 40 q -14 -26 6 -${44 + 10 * Math.sin(T * 12 + i)} q 16 24 6 44 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={5} />)}
    <path d="M -120 -20 L 120 -20 L 100 20 L -100 20 Z" fill="#3a3f4a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={118} y={-14} width={110} height={18} rx={9} fill="#3a3f4a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-50} width={160} height={34} rx={14} fill={mCalor(0.6)} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Router({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-90, 90].map((xx, i) => <g key={i} transform={`rotate(${i ? 10 : -10} ${xx} -50)`}><rect x={xx - 12} y={-230} width={24} height={190} rx={12} fill="#2a2f3a" stroke={KC.ink} strokeWidth={7} /></g>)}
    <rect x={-170} y={-70} width={340} height={130} rx={28} fill="#2a2f3a" stroke={KC.ink} strokeWidth={10} />
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={-110 + i * 50} cy={0} r={11} fill="#4dff9a" opacity={0.35 + 0.65 * ((Math.floor(T * 6) + i) % 3 === 0 ? 1 : 0.3)} />)}
    <rect x={-150} y={60} width={300} height={16} rx={8} fill={KC.ink} />
  </g>;
}
// onda senoidal etiquetada (para comparar)
function OndaSeno({ x0, x1, y, lam, T, color, amp = 44, o = 1, etiqueta }) {
  const pts = []; for (let s = 0; s <= x1 - x0; s += 6) pts.push(`${x0 + s},${y + Math.sin((s / lam) * 2 * Math.PI - T * 6) * amp}`);
  return <g opacity={o}>
    <polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" />
    {etiqueta && <TextoSvg x={x0} y={y - amp - 24} tam={48} color={color} ancla="start" fuente="texto">{etiqueta}</TextoSvg>}
  </g>;
}

function MicroondasShot() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const MW = { x: 400, y: 960, s: 0.95 };           // microondas del inicio y del cierre
  const giro = T * 1.7;
  // corte de la comida (escenas por dentro)
  const C = { x: 540, y: 860, w: 840, h: 500 };
  const halfC = 250, BANDA = 58;
  const frenteCentro = klerp(BANDA, 150, kprog(T, K.Centro + 0.6, K.Pregunta - 0.2, kEase.suave));
  const gruesa = klerp(300, 620, kprog(T, K.Frio + 0.2, K.Frio + 1.4, kEase.rebote));
  const frenteReposo = klerp(BANDA, 280, kprog(T, K.Reposo + 0.8, K.Plato - 0.6, kEase.suave));
  // plato visto desde arriba
  const P = { x: 580, y: 900, L: 600 };
  const spots = []; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) spots.push([i, j, Math.sin(i * 1.9 + 0.6) * Math.cos(j * 1.7 + 0.4)]);
  const angPlato = T * 1.6, rP = 135;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el microondas se enciende; «de adentro hacia afuera» se tacha */}
      <Escena T={T} a={K.Gancho} b={K.Ondas}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Microondas {...MW} T={T} id="g" luz={kprog(T, 0.05, 0.4)} giro={giro} borde={kprog(T, K.Gancho + 3.6, K.Gancho + 5.2)}>
            {/* flechas «adentro → afuera» (se tachan) y luego «por fuera» (hacia adentro) */}
            {T < K.Gancho + 3.6 && [[-1, 0], [1, 0], [0, -1]].map(([sx, sy], i) => <FlechaRecta key={i} x1={-92} y1={88} x2={-92 + sx * 190} y2={88 + sy * 150}
              p={kprog(T, 0.6 + i * 0.15, 1.1 + i * 0.15, kEase.sale)} color={KC.yellow} grosor={12} punta={28} />)}
            {T >= K.Gancho + 2.6 && T < K.Gancho + 3.6 && <g transform="translate(-92 70)" opacity={1 - kprog(T, K.Gancho + 3.3, K.Gancho + 3.6)}>
              <line x1={-170 * kprog(T, K.Gancho + 2.6, K.Gancho + 2.9)} y1={-130 * kprog(T, K.Gancho + 2.6, K.Gancho + 2.9)} x2={170 * kprog(T, K.Gancho + 2.6, K.Gancho + 2.9)} y2={130 * kprog(T, K.Gancho + 2.6, K.Gancho + 2.9)} stroke={KC.red} strokeWidth={30} strokeLinecap="round" />
              <line x1={170 * kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)} y1={-130 * kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)} x2={-170 * kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)} y2={130 * kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)} stroke={KC.red} strokeWidth={30} strokeLinecap="round" /></g>}
            {T >= K.Gancho + 3.6 && [[-1, 0], [1, 0], [0, -1]].map(([sx, sy], i) => <FlechaRecta key={'in' + i} x1={-92 + sx * 220} y1={88 + sy * 170} x2={-92 + sx * 115} y2={88 + sy * 60}
              p={kprog(T, K.Gancho + 3.6 + i * 0.12, K.Gancho + 4.1 + i * 0.12, kEase.sale)} color={KC.red} grosor={12} punta={28} />)}
          </Microondas>
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 0.5} tacharEn={K.Gancho + 2.7} until={K.Gancho + 3.5} texto="de adentro hacia afuera" x={330} y={600} tam={38} />
        <Chip T={T} at={K.Gancho + 3.7} until={K.Ondas - 0.15} texto="por fuera" x={300} y={600} tam={56} borde={KC.red} />
        <Etq T={T} at={K.Gancho + 4.6} until={K.Ondas - 0.15} x={110} y={700} texto="unos cuantos cm" tam={40} lado="der" color={KC.texto} />
      </Escena>

      {/* 1 · ondas: la caja se llena de microondas */}
      <Escena T={T} a={K.Ondas} b={K.Agua} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={80} y={570} width={920} height={600} rx={40} fill="#cfd6e0" stroke={KC.ink} strokeWidth={12} />
          <rect x={120} y={610} width={840} height={520} rx={22} fill="#2f3440" stroke={KC.ink} strokeWidth={8} />
          <rect x={900} y={700} width={40} height={140} rx={8} fill="#8c96a5" stroke={KC.ink} strokeWidth={6} />
          <OndasCaja id="ond" x0={120} y0={610} w={840} h={420} T={T} n={6} amp={22} lam={120} llena={kprog(T, K.Ondas + 0.2, K.Ondas + 2.2)} vert={T > K.Ondas + 1.4} grosor={9} />
          <ellipse cx={540} cy={1080} rx={300} ry={40} fill="#dfe6ee" stroke={KC.ink} strokeWidth={8} />
          <PiezaFrente x={540 + Math.sin(giro) * 50} y={1025} w={300} h={110} />
        </Lienzo>
        <Chip T={T} at={K.Ondas + 0.3} until={K.Ondas + 2.6} texto="ondas invisibles" x={400} y={450} tam={46} borde={MONDA} />
        <Chip T={T} at={K.Ondas + 2.7} until={K.Agua - 0.15} texto="prima de la luz" x={400} y={450} tam={52} borde={KC.yellow} />
      </Escena>

      {/* 2 · agua: al microscopio, las moléculas se agitan */}
      <Escena T={T} a={K.Agua} b={K.Profundidad} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <OndasArco x={300} y={760} ang={90} T={T} color={MONDA} largo={180} n={4} grosor={10} />
          <ellipse cx={300} cy={1085} rx={250} ry={38} fill="#dfe6ee" stroke={KC.ink} strokeWidth={8} />
          <PiezaFrente x={300} y={1030} w={320} h={120} borde={0.6 * kprog(T, K.Agua + 3, K.Agua + 5.5)} />
        </Lienzo>
        <Lupa T={T} at={K.Agua + 0.8} until={K.Profundidad - 0.3} x={640} y={700} r={270} fx={300} fy={1020} tinte={KC.orange} etiqueta="AL MICROSCOPIO · AGUA"
          interior={(t, r) => { const g = krng(7), calor = kprog(t, K.Agua + 3, K.Agua + 5.5);
            return <svg width={r * 2} height={r * 2}><defs><radialGradient id="glw"><stop offset="0" stopColor={KC.orange} stopOpacity={0.7 * calor} /><stop offset="1" stopColor={KC.red} stopOpacity={0.15 * calor} /></radialGradient></defs>
              <rect width={r * 2} height={r * 2} fill="#0b1626" /><rect width={r * 2} height={r * 2} fill="url(#glw)" />
              <OndasCaja id="lupw" x0={0} y0={0} w={r * 2} h={r * 2} T={t} n={3} amp={18} lam={110} o={0.45} grosor={6} />
              {Array.from({ length: 13 }, (_, i) => { const x = 60 + g() * (r * 2 - 120), y = 60 + g() * (r * 2 - 120), b = g() * 360, v = 0.4 + 0.6 * kprog(t, K.Agua + 1.2, K.Agua + 2.5);
                return <MolAgua key={i} x={x + Math.sin(t * 17 + i) * 9 * v} y={y + Math.cos(t * 15 + i * 2) * 9 * v} r={24} rot={b + Math.sin(t * 9 + i) * 70 * v + t * 140 * v * (i % 2 ? 1 : -1)} />; })}</svg>; }} />
      </Escena>

      {/* 3–4 · por dentro: corte de la comida con su mapa de calor */}
      <Escena T={T} a={K.Profundidad} b={K.Pregunta} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <Corte {...C} banda={BANDA} frente={T > K.Centro ? frenteCentro : 0} mo={kprog(T, K.Profundidad + 0.3, K.Profundidad + 1.6)} />
          <OndasEntrando {...C} banda={BANDA} T={T} o={kprog(T, K.Profundidad, K.Profundidad + 0.4) * (1 - kprog(T, K.Centro + 0.3, K.Centro + 1))} />
          <FlechasCalor {...C} desde={BANDA - 10} hasta={frenteCentro + 10} T={T} o={kprog(T, K.Centro + 0.6, K.Centro + 1.2)} />
          {/* marca de la banda: solo unos cm */}
          {T > K.Profundidad + 1.8 && T < K.Centro + 0.2 && <g opacity={kprog(T, K.Profundidad + 1.8, K.Profundidad + 2.2) * (1 - kprog(T, K.Centro - 0.2, K.Centro + 0.2))}>
            <path d={`M ${C.x - 160} ${C.y - C.h / 2 - 20} h -10 v ${BANDA + 20} h 10`} fill="none" stroke={KC.yellow} strokeWidth={8} />
            <line x1={C.x - 190} y1={C.y - C.h / 2 + BANDA / 2} x2={C.x - 260} y2={540} stroke={KC.yellow} strokeWidth={6} />
          </g>}
          {T > K.Centro + 1.2 && T < K.Pregunta + 0.2 && <Estufa x={850} y={470} s={0.75} T={T} />}
        </Lienzo>
        <Chip T={T} at={K.Profundidad + 0.2} until={K.Profundidad + 1.9} texto="la comida por dentro" x={540} y={450} tam={44} borde={MONDA} />
        <Chip T={T} at={K.Profundidad + 2.0} until={K.Centro - 0.1} texto="solo unos cm" x={280} y={500} tam={48} borde={KC.yellow} />
        <Etq T={T} at={K.Profundidad + 2.6} until={K.Centro + 0.6} x={C.x + 20} y={C.y} texto="centro: aún frío" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Centro + 1.2} until={K.Pregunta - 0.1} texto="como en una estufa" x={380} y={470} tam={44} borde={KC.orange} />
        <Etq T={T} at={K.Centro + 0.5} until={K.Pregunta - 0.2} x={C.x} y={C.y} texto="poco a poco" lado="der" color={KC.yellow} />
      </Escena>

      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Frio} />

      {/* 6 · pieza gruesa: el centro sigue frío */}
      <Escena T={T} a={K.Frio} b={K.Reposo} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Corte x={540} y={860} w={760} h={gruesa} banda={50} frente={0} mo={1} />
          <CopoFrio x={540} y={860} s={klerp(0.2, 1, kprog(T, K.Frio + 1.6, K.Frio + 2.1, kEase.rebote))} o={kprog(T, K.Frio + 1.6, K.Frio + 1.8)} T={T} />
        </Lienzo>
        <Chip T={T} at={K.Frio + 0.3} until={K.Reposo - 0.1} texto="pieza gruesa" x={540} y={440} tam={50} borde={KC.ink} />
        <Etq T={T} at={K.Frio + 2.2} until={K.Reposo - 0.2} x={640} y={860} texto="centro frío" lado="der" color={KC.texto} tam={40} />
      </Escena>

      {/* 7 · reposo: el calor sigue entrando */}
      <Escena T={T} a={K.Reposo} b={K.Plato} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <ellipse cx={540} cy={1160} rx={460} ry={46} fill="#f4f6fb" stroke={KC.ink} strokeWidth={9} />
          <Corte x={540} y={880} w={760} h={560} banda={50} frente={frenteReposo} mo={1} />
          <FlechasCalor x={540} y={880} w={760} h={560} desde={40} hasta={frenteReposo + 10} T={T} o={kprog(T, K.Reposo + 0.6, K.Reposo + 1.2) * (1 - kprog(T, K.Plato - 0.8, K.Plato - 0.3))} />
          <CopoFrio x={540} y={880} s={1 - 0.6 * kprog(T, K.Reposo + 2.5, K.Plato - 1.2)} o={1 - kprog(T, K.Reposo + 3.2, K.Plato - 1.2)} T={T} />
          <Reloj x={330} y={450} r={85} T={T - K.Reposo} o={kprog(T, K.Reposo + 0.2, K.Reposo + 0.6)} />
        </Lienzo>
        <Chip T={T} at={K.Reposo + 0.4} until={K.Plato - 0.1} texto="reposo" x={560} y={450} tam={52} borde={KC.ink} />
        <Etq T={T} at={K.Plato - 1.6} until={K.Plato - 0.2} x={600} y={880} texto="ya llegó" lado="der" color={KC.texto} tam={40} />
      </Escena>

      {/* 8 · el plato gira: puntos con más y menos ondas (vista desde arriba) */}
      <Escena T={T} a={K.Plato} b={K.Wifi} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <rect x={P.x - P.L / 2 - 30} y={P.y - P.L / 2 - 30} width={P.L + 60} height={P.L + 60} rx={40} fill="#cfd6e0" stroke={KC.ink} strokeWidth={12} />
          <rect x={P.x - P.L / 2} y={P.y - P.L / 2} width={P.L} height={P.L} rx={22} fill="#2f3440" stroke={KC.ink} strokeWidth={8} />
          {spots.map(([i, j, v], k) => Math.abs(v) < 0.25 ? null : <circle key={k} cx={P.x - P.L / 2 + (i + 0.5) * P.L / 5} cy={P.y - P.L / 2 + (j + 0.5) * P.L / 5} r={(40 + 20 * Math.abs(v)) * (0.9 + 0.1 * Math.sin(T * 6 + k))}
            fill={v > 0 ? MCALIENTE : MFRIO} opacity={0.75 * kprog(T, K.Plato + 0.2 + k * 0.03, K.Plato + 0.7 + k * 0.03)} />)}
          <g transform={`rotate(${angPlato * 57.3} ${P.x} ${P.y})`}>
            <circle cx={P.x} cy={P.y} r={240} fill="rgba(240,244,250,.35)" stroke="#f4f6fb" strokeWidth={10} strokeDasharray="30 20" />
            <rect x={P.x + rP - 80} y={P.y - 60} width={160} height={120} rx={44} fill={mHex(MCOMIDA, mCalor(0.15 + 0.4 * kprog(T, K.Plato + 0.8, K.Wifi)), 0.8)} stroke={KC.ink} strokeWidth={8} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Plato + 0.3} until={K.Wifi - 0.1} texto="vista desde arriba" x={640} y={430} tam={38} borde={KC.ink} mono />
        <Chip T={T} at={K.Plato + 1.0} until={K.Wifi - 0.1} texto="más ondas" x={500} y={525} tam={40} borde={MCALIENTE} />
        <Chip T={T} at={K.Plato + 1.6} until={K.Wifi - 0.1} texto="menos ondas" x={845} y={525} tam={40} borde={MFRIO} />
      </Escena>

      {/* 9 · dato raro: casi la misma frecuencia que el wifi */}
      <Escena T={T} a={K.Wifi} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <TextoSvg x={540} y={470} tam={96} color={KC.yellow} rot={-4} s={klerp(0.4, 1, kprog(T, K.Wifi + 0.05, K.Wifi + 0.45, kEase.rebote))}>¡DATO RARO!</TextoSvg>
          <OndaSeno x0={90} x1={990} y={650} lam={150} amp={38} T={T} color={MONDA} o={kprog(T, K.Wifi + 1.6, K.Wifi + 2.1)} etiqueta="wifi" />
          <OndaSeno x0={90} x1={990} y={840} lam={148} amp={38} T={T} color={KC.pink} o={kprog(T, K.Wifi + 2.1, K.Wifi + 2.6)} etiqueta="microondas" />
          <Router x={190} y={1130} s={0.62} T={T} />
          <OndasArco x={190} y={990} ang={-90} T={T} color={MONDA} largo={60} n={3} grosor={8} />
          <Microondas x={850} y={1120} s={0.38} T={T} id="w" luz={1} giro={giro} />
        </Lienzo>
        <Chip T={T} at={K.Wifi + 2.8} until={K.Cierre - 0.1} texto="casi la misma frecuencia" x={540} y={975} tam={44} borde={KC.ink} />
      </Escena>

      {/* 10 · cierre: el mismo microondas, la puerta se abre y la comida sale pareja */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Microondas {...MW} T={T} id="c" luz={1 - kprog(T, K.Cierre + 0.2, K.Cierre + 0.6)} giro={T < K.Cierre + 0.6 ? giro : (K.Cierre + 0.6) * 1.7} puerta={kprog(T, K.Cierre + 0.5, K.Cierre + 1.3, kEase.suave)}
            borde={0.85} centro={kprog(T, K.Cierre + 1.0, K.Cierre + 3.0) * 0.55} vapor={kprog(T, K.Cierre + 1.2, K.Cierre + 2)}>
            {T > K.Cierre + 2.4 && [[-1, 0], [1, 0], [0, -1]].map(([sx, sy], i) => <FlechaRecta key={i} x1={-92 + sx * 220} y1={88 + sy * 170} x2={-92 + sx * 115} y2={88 + sy * 60}
              p={kprog(T, K.Cierre + 2.4 + i * 0.12, K.Cierre + 2.9 + i * 0.12, kEase.sale)} color={KC.red} grosor={12} punta={28} />)}
          </Microondas>
          <Reloj x={880} y={720} r={75} T={T - K.Cierre} o={kprog(T, K.Cierre + 3.4, K.Cierre + 3.8)} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 3.0} until={K.Outro - 0.1} texto="por fuera + paciencia" x={400} y={560} tam={48} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Ondas - 0.1} texto="No de adentro: *por fuera.*" />
      <Subtitulo T={T} idx={1} at={K.Ondas + 0.1} until={K.Agua - 0.1} texto="Ondas *primas de la luz.*" />
      <Subtitulo T={T} idx={2} at={K.Agua + 0.1} until={K.Profundidad - 0.1} texto="El agua se mueve: *calor.*" />
      <Subtitulo T={T} idx={3} at={K.Profundidad + 0.1} until={K.Centro - 0.1} texto="Entran *pocos centímetros.*" />
      <Subtitulo T={T} idx={4} at={K.Centro + 0.1} until={K.Pregunta - 0.1} texto="El centro: *poco a poco.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Frio - 0.1} texto="¿Por qué *frío en medio?*" />
      <Subtitulo T={T} idx={6} at={K.Frio + 0.1} until={K.Reposo - 0.1} texto="Pieza gruesa: *centro frío.*" />
      <Subtitulo T={T} idx={7} at={K.Reposo + 0.1} until={K.Plato - 0.1} texto="Reposo: *el calor sigue.*" />
      <Subtitulo T={T} idx={8} at={K.Plato + 0.1} until={K.Wifi - 0.1} texto="*Más y menos* ondas." />
      <Subtitulo T={T} idx={9} at={K.Wifi + 0.1} until={K.Cierre - 0.1} texto="Casi como *el wifi.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Por fuera *+ paciencia.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Ondas + 0.5, K.Agua - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Agua + 3.2, K.Profundidad - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.Profundidad + 1.2, K.Centro - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Pregunta + 0.05, K.Frio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Frio + 1.0, K.Reposo - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Reposo + 2.0, K.Plato - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Plato + 0.6, K.Wifi - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Wifi + 0.6, K.Cierre - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.8, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="26" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function MicroondasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MicroondasShot /></CompositionStage></div>;
}
window.MicroondasApp = MicroondasApp;
