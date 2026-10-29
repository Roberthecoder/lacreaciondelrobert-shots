// Shot IA #39 · El dibujo escondido en el canto de un pájaro — NARRADO (N1 "Por dentro": canto → espectrograma → red).
// Datos: Kahl et al., Ecological Informatics 61:101236 (2021); Wood et al., PLOS Biology 20(6):e3001670 (2022);
// Cornell Chronicle (23 jun 2021); lista de etiquetas BirdNET V2.4 (2023). Ver guion.md y verificacion.md.
// Los trazos del espectrograma y los cantos son ilustrativos (esquemáticos).

// ---------- eventos de canto (los mismos tiempos los usa gen-audio.mjs) ----------
const AV_TIPOS = ['curva', 'rayitas', 'puntitos', 'curva'];
function avEventos(t0, t1, paso = 0.75) {
  const out = []; let i = 0;
  for (let t = t0; t < t1; t += paso, i++) { const r = krng(i * 7 + 3);
    out.push({ t, tipo: AV_TIPOS[i % 4], f0: 0.3 + r() * 0.25, f1: 0.62 + r() * 0.28, d: 0.35 + r() * 0.2, k: r() }); }
  return out;
}

// Traza de un sonido dentro del espectrograma (x crece con el tiempo, y = agudo arriba).
function AvTraza({ e, h, vel, fuerza = 1 }) {
  const L = e.d * vel, Y = (f) => h * (1 - f);
  const capa = (d, w, c, o) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" opacity={o * fuerza} />;
  if (e.tipo === 'curva') {
    const d = `M 0 ${Y(e.f0)} Q ${L * 0.55} ${Y(e.f0 - 0.05)} ${L} ${Y(e.f1)}`, d2 = `M 0 ${Y(e.f0 * 1.9 > 0.95 ? 0.95 : e.f0 * 1.6)} Q ${L * 0.55} ${Y(e.f0 * 1.5)} ${L} ${Y(Math.min(0.97, e.f1 * 1.15))}`;
    return <g>{capa(d, 26, KC.orange, 0.25)}{capa(d, 11, KC.yellow, 0.95)}{capa(d, 3, '#fff', 1)}{capa(d2, 6, KC.orange, 0.45)}</g>;
  }
  if (e.tipo === 'rayitas') {
    return <g>{Array.from({ length: 5 }, (_, j) => { const x = j * 13, a = Y(0.18 + (j % 2) * 0.05), b = Y(0.8 - (j % 3) * 0.06), d = `M ${x} ${a} L ${x} ${b}`;
      return <g key={j}>{capa(d, 14, KC.coral, 0.3)}{capa(d, 5, KC.yellow, 0.85)}</g>; })}</g>;
  }
  return <g>{Array.from({ length: 6 }, (_, j) => <g key={j}>
    <circle cx={j * 24} cy={Y(e.f0 + 0.1)} r={13} fill={KC.orange} opacity={0.3 * fuerza} />
    <circle cx={j * 24} cy={Y(e.f0 + 0.1)} r={7} fill={KC.yellow} opacity={fuerza} />
    <circle cx={j * 24} cy={Y(Math.min(0.95, e.f0 * 2 + 0.1))} r={5} fill={KC.orange} opacity={0.6 * fuerza} />
  </g>)}</g>;
}

// Espectrograma que corre de derecha a izquierda: el borde derecho es "ahora".
function Espectrograma({ T, x, y, w, h, vel = 170, eventos, rejilla = true, fondo = '#05070d', borde = true }) {
  const vis = eventos.filter((e) => T >= e.t && T <= e.t + w / vel + e.d + 0.2);
  return <g>
    <svg x={x} y={y} width={w} height={h} overflow="hidden">
      <rect width={w} height={h} fill={fondo} />
      {rejilla && Array.from({ length: 5 }, (_, i) => <line key={i} x1={0} x2={w} y1={(h * (i + 1)) / 6} y2={(h * (i + 1)) / 6} stroke="#2a3a5c" strokeWidth={2} strokeDasharray="6 10" />)}
      {rejilla && Array.from({ length: 9 }, (_, i) => { const xx = ((i * 120 - (T * vel) % 120) + w * 2) % (w + 120) - 60;
        return <line key={'v' + i} x1={xx} x2={xx} y1={0} y2={h} stroke="#1c2840" strokeWidth={2} />; })}
      {vis.map((e, i) => <g key={i} transform={`translate(${w - (T - e.t) * vel} 0)`}><AvTraza e={e} h={h} vel={vel} fuerza={0.75 + 0.25 * e.k} /></g>)}
      <rect x={w - 4} width={4} height={h} fill={KC.mint} opacity={0.5 + 0.5 * Math.sin(T * 8)} />
    </svg>
    {borde && <rect x={x} y={y} width={w} height={h} rx={10} fill="none" stroke={KC.ink} strokeWidth={8} />}
  </g>;
}

// ---------- aves (esquemáticas) ----------
// Zanate mexicano (Quiscalus mexicanus), macho: negro con brillo morado-azul, ojo amarillo, cola larga en quilla. Mira a la izquierda.
function Zanate({ x, y, s = 1, T = 0, canta = 0 }) {
  const bob = Math.sin(T * 2.2) * 4, ab = canta * 16, ink = KC.ink;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -14 -14 L -20 6 M 16 -14 L 12 6" stroke={ink} strokeWidth={7} strokeLinecap="round" />
    <g transform={`translate(0 ${bob})`}>
      <path d="M 40 -52 L 205 -2 Q 214 -30 196 -48 L 176 -58 Z" fill="#141225" stroke={ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M 44 -62 L 186 -66 L 202 -84 Z" fill="#221d46" stroke={ink} strokeWidth={5} strokeLinejoin="round" />
      <ellipse cx={0} cy={-62} rx={74} ry={46} fill="#16132c" stroke={ink} strokeWidth={6} />
      <path d="M -44 -90 Q 0 -106 44 -84" stroke="#6a55e8" strokeWidth={9} fill="none" opacity=".65" strokeLinecap="round" />
      <path d="M -24 -74 Q 30 -96 76 -58 Q 34 -40 -12 -52 Z" fill="#231f4a" stroke={ink} strokeWidth={5} />
      <path d="M 0 -70 Q 30 -80 56 -62" stroke="#3fb7ff" strokeWidth={4} fill="none" opacity=".55" />
      <circle cx={-62} cy={-112} r={36} fill="#16132c" stroke={ink} strokeWidth={6} />
      <path d="M -82 -132 Q -62 -146 -40 -134" stroke="#6a55e8" strokeWidth={6} fill="none" opacity=".7" strokeLinecap="round" />
      <path d={`M -90 -122 L -148 ${-114 - ab * 0.35} L -92 -108 Z`} fill="#2a2a33" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <path d={`M -92 -106 L -142 ${-104 + ab} L -88 -96 Z`} fill="#2a2a33" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      <circle cx={-70} cy={-120} r={10} fill={KC.yellow} stroke={ink} strokeWidth={3} />
      <circle cx={-72} cy={-120} r={4} fill={ink} />
    </g>
  </g>;
}
// Gorrión doméstico (Passer domesticus), macho: corona gris, mejilla clara, babero negro, dorso café rayado.
function Gorrion({ x, y, s = 1, T = 0 }) {
  const ink = KC.ink, bob = Math.sin(T * 3 + 1) * 3;
  return <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
    <path d="M -10 -8 L -14 8 M 12 -8 L 8 8" stroke={ink} strokeWidth={6} strokeLinecap="round" />
    <path d="M 50 -40 L 110 -30 L 104 -12 L 46 -24 Z" fill="#6b4a2b" stroke={ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={-40} rx={62} ry={42} fill="#d9c7a8" stroke={ink} strokeWidth={6} />
    <path d="M -10 -70 Q 40 -86 66 -44 Q 30 -26 -6 -40 Z" fill="#8a5a33" stroke={ink} strokeWidth={5} />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${6 + k * 16} -62 l 10 14`} stroke={ink} strokeWidth={4} strokeLinecap="round" />)}
    <path d="M 4 -36 Q 40 -40 58 -30" stroke="#f4efe4" strokeWidth={6} fill="none" />
    <circle cx={-48} cy={-84} r={32} fill="#e8dcc4" stroke={ink} strokeWidth={6} />
    <path d="M -76 -98 Q -50 -122 -22 -100 Q -46 -96 -76 -98 Z" fill="#8f949c" stroke={ink} strokeWidth={4} />
    <path d="M -34 -104 Q -16 -96 -20 -78" stroke="#8a5a33" strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M -70 -74 Q -54 -48 -36 -62 Q -44 -40 -66 -50 Z" fill="#1d1d22" stroke={ink} strokeWidth={3} />
    <path d="M -78 -90 L -100 -84 L -78 -78 Z" fill="#3a3a40" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-58} cy={-90} r={5} fill={ink} />
  </g>;
}
// Tortolita cola larga (Columbina inca): paloma chica gris-café con plumas "escamadas" y cola larga con bordes blancos.
function Tortolita({ x, y, s = 1, T = 0 }) {
  const ink = KC.ink, bob = Math.sin(T * 2.6 + 2) * 3;
  return <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
    <path d="M -10 -8 L -14 8 M 12 -8 L 8 8" stroke="#c9675b" strokeWidth={6} strokeLinecap="round" />
    <path d="M 46 -44 L 150 -22 L 144 -2 L 40 -26 Z" fill="#9c8e7c" stroke={ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 60 -22 L 146 -8" stroke="#ffffff" strokeWidth={5} />
    <ellipse cx={0} cy={-40} rx={64} ry={40} fill="#bfae99" stroke={ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M ${-30 + (k % 5) * 20} ${-60 + Math.floor(k / 5) * 18} q 8 8 16 0`} stroke="#5a4c3e" strokeWidth={3.5} fill="none" />)}
    <path d="M -6 -66 Q 40 -78 64 -40 Q 30 -28 -2 -40 Z" fill="#a89580" stroke={ink} strokeWidth={5} />
    {Array.from({ length: 6 }, (_, k) => <path key={'a' + k} d={`M ${8 + (k % 3) * 16} ${-62 + Math.floor(k / 3) * 14} q 7 7 14 0`} stroke="#4a3e33" strokeWidth={3.5} fill="none" />)}
    <circle cx={-50} cy={-74} r={24} fill="#c4b4a0" stroke={ink} strokeWidth={6} />
    <path d="M -72 -76 L -90 -72 L -72 -68 Z" fill="#3a3a40" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={-56} cy={-78} r={6} fill="#c9443a" stroke={ink} strokeWidth={2} /><circle cx={-56} cy={-78} r={2.5} fill={ink} />
  </g>;
}
// Grulla en vuelo (silueta esquemática), mira a la derecha.
function GrullaVuelo({ x, y, s = 1, T = 0 }) {
  const ala = Math.sin(T * 7) * 26, ink = KC.ink;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -10 0 Q -30 ${-40 - ala} -70 ${-56 - ala} Q -30 ${-24 - ala * 0.4} 0 -4 Z`} fill="#9aa3ad" stroke={ink} strokeWidth={4} />
    <path d="M -60 4 L 40 -2 L 40 6 L -60 10 Z" fill="#b8c0c8" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 40 0 L 74 -6" stroke={ink} strokeWidth={6} strokeLinecap="round" />
    <circle cx={78} cy={-7} r={8} fill="#1d1d22" stroke={ink} strokeWidth={3} /><circle cx={80} cy={-12} r={3} fill={KC.red} />
    <path d="M 84 -7 L 100 -5" stroke={ink} strokeWidth={4} strokeLinecap="round" />
    <path d="M -60 8 L -110 14" stroke={ink} strokeWidth={4} strokeLinecap="round" />
  </g>;
}

// ---------- escenario de la ventana (inicio y cierre) ----------
function Ventana({ T, x = 50, y = 440, w = 560, h = 580, children }) {
  return <g>
    <rect x={x - 22} y={y - 22} width={w + 44} height={h + 44} rx={26} fill="#f4efe4" stroke={KC.ink} strokeWidth={9} />
    <svg x={x} y={y} width={w} height={h} overflow="hidden">
      <rect width={w} height={h} fill="#8fd9ff" />
      <circle cx={w - 110} cy={110} r={60} fill="#fff3a8" opacity=".9" />
      {[0, 1].map((k) => { const nx = ((T * 14 + k * 300) % (w + 260)) - 200; return <g key={k} transform={`translate(${nx} ${90 + k * 120})`} opacity=".85">
        <ellipse cx={0} cy={0} rx={70} ry={26} fill="#fff" /><ellipse cx={40} cy={-14} rx={46} ry={24} fill="#fff" /></g>; })}
      <path d={`M -20 ${h - 150} Q ${w * 0.4} ${h - 190} ${w + 20} ${h - 120}`} stroke="#7a4a22" strokeWidth={26} fill="none" strokeLinecap="round" />
      {[0.2, 0.55, 0.85].map((u, k) => <ellipse key={k} cx={w * u} cy={h - 175 - k * 6} rx={34} ry={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`rotate(${-20 + k * 25} ${w * u} ${h - 175})`} />)}
      {children}
    </svg>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={KC.ink} strokeWidth={7} />
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#f4efe4" strokeWidth={16} />
    <line x1={x} y1={y + h * 0.42} x2={x + w} y2={y + h * 0.42} stroke="#f4efe4" strokeWidth={16} />
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={KC.ink} strokeWidth={4} opacity=".4" />
  </g>;
}
// Ondas de sonido que salen del pico.
function Ondas({ T, x, y, t0 = 0, color = KC.ink, n = 3 }) {
  return <g>{Array.from({ length: n }, (_, k) => { const u = ((T - t0) * 0.9 + k / n) % 1; if (T < t0) return null;
    return <path key={k} d={`M ${x - 20 - u * 120} ${y - 30 - u * 40} Q ${x - 40 - u * 150} ${y} ${x - 20 - u * 120} ${y + 30 + u * 40}`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" opacity={1 - u} />; })}</g>;
}
// Celular sostenido por una mano, con el espectrograma en la pantalla.
function CelularAves({ T, x, y, s = 1, rot = -8, eventos }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 120 Q -190 40 -150 -20 L -120 -10 L -120 200 Q -150 200 -150 120 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <rect x={-130} y={-230} width={260} height={480} rx={40} fill="#10131a" stroke={KC.ink} strokeWidth={9} />
    <rect x={-40} y={-214} width={80} height={14} rx={7} fill="#2a2f3a" />
    <text x={0} y={-160} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.texto}>escuchando…</text>
    <Espectrograma T={T} x={-112} y={-130} w={224} h={250} vel={70} eventos={eventos} borde={false} />
    <circle cx={0} cy={180} r={30} fill={KC.red} stroke={KC.texto} strokeWidth={5} opacity={0.75 + 0.25 * Math.sin(T * 6)} />
    <path d="M 110 -40 Q 175 -10 150 80 Q 140 120 110 130 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

// ---------- otras piezas ----------
// Tarjeta "polaroid" con una forma de canto.
function Huella({ T, x, y, tipo, at, etiqueta, s = 1 }) {
  if (T < at - 0.01) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), ev = { t: 0, tipo, f0: 0.38, f1: 0.82, d: 1.0, k: 1 };
  return <g transform={`translate(${x} ${y}) scale(${s * e}) rotate(${tipo === 'rayitas' ? -4 : tipo === 'curva' ? 3 : -2})`}>
    <rect x={-140} y={-150} width={280} height={330} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
    <svg x={-118} y={-128} width={236} height={230} overflow="hidden">
      <rect width={236} height={230} fill="#05070d" />
      <g transform={tipo === 'curva' ? 'translate(30 0)' : tipo === 'rayitas' ? 'translate(88 0)' : 'translate(58 0)'}><AvTraza e={{ ...ev, d: tipo === 'curva' ? 1.0 : 0.5 }} h={230} vel={175} /></g>
    </svg>
    <text x={0} y={152} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
// Visor de cámara (cuatro esquinas) que se cierra sobre algo.
function Visor({ x, y, w, h, p = 1, color = KC.yellow }) {
  const g = klerp(1.5, 1, p), W = w * g, H = h * g, L = 60;
  const esq = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  return <g opacity={Math.min(1, p * 3)}>{esq.map(([sx, sy], i) => { const cx = x + sx * W / 2, cy = y + sy * H / 2;
    return <path key={i} d={`M ${cx} ${cy - sy * L} L ${cx} ${cy} L ${cx - sx * L} ${cy}`} stroke={color} strokeWidth={12} fill="none" strokeLinecap="round" />; })}</g>;
}
// Pila de capas de una red (cada placa = una capa).
function Capas({ x, y, n, total = 157, ancho = 380 }) {
  const out = [], dy = 2.6;
  for (let i = 0; i < n; i++) { const yy = y - i * dy, c = i % 2 ? '#1f8fd6' : '#26b3ff';
    out.push(<path key={i} d={`M ${x} ${yy} L ${x + ancho / 2} ${yy - 46} L ${x + ancho} ${yy} L ${x + ancho / 2} ${yy + 46} Z`} fill={c} stroke={KC.ink} strokeWidth={i === n - 1 ? 6 : 1.2} />); }
  if (n > 0) { const yy = y - (n - 1) * dy; out.push(<g key="t">{[0.25, 0.5, 0.75].map((u, k) => <circle key={k} cx={x + ancho * u} cy={yy} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}</g>); }
  return <g>{out}</g>;
}
// Globo terráqueo esquemático con puntitos (grabaciones) que se encienden.
function Globo({ T, cx = 540, cy = 840, r = 300, at, n = 90 }) {
  const rr = krng(11), pts = Array.from({ length: n }, (_, i) => { const a = rr() * Math.PI * 2, d = Math.sqrt(rr()) * r * 0.9; return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, t: at + 0.2 + i * 0.035 + rr() * 0.3 }; });
  return <g>
    <circle cx={cx} cy={cy} r={r} fill="#2f6dff" stroke={KC.ink} strokeWidth={9} />
    <svg x={cx - r} y={cy - r} width={r * 2} height={r * 2} overflow="hidden">
      <g transform={`translate(${-((T * 22) % (r * 2))} 0)`}>
        {[0, r * 2].map((ox) => <g key={ox} transform={`translate(${ox} 0)`}>
          <path d={`M ${r * 0.25} ${r * 0.55} q 60 -70 140 -30 q 40 60 -10 120 q -40 70 -20 140 q -60 10 -90 -60 q -40 -80 -20 -170 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
          <path d={`M ${r * 1.05} ${r * 0.4} q 90 -40 170 10 q 30 50 -30 80 q -20 40 20 110 q -40 60 -80 10 q -50 -60 -80 -100 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
          <path d={`M ${r * 1.5} ${r * 1.15} q 50 -10 70 30 q -10 40 -60 30 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
        </g>)}
      </g>
      {[0.35, 0.7].map((k, i) => <ellipse key={i} cx={r} cy={r} rx={r * k} ry={r} fill="none" stroke="#ffffff" strokeOpacity=".25" strokeWidth={3} />)}
      {[0.5, 1, 1.5].map((k, i) => <line key={'l' + i} x1={0} x2={r * 2} y1={r * k} y2={r * k} stroke="#ffffff" strokeOpacity=".25" strokeWidth={3} />)}
    </svg>
    {pts.map((p, i) => { if (T < p.t) return null; const u = kprog(T, p.t, p.t + 0.6);
      return <g key={i}><circle cx={p.x} cy={p.y} r={6 + 22 * u} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={1 - u} />
        <circle cx={p.x} cy={p.y} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>; })}
    <circle cx={cx - r * 0.35} cy={cy - r * 0.4} r={r * 0.18} fill="#fff" opacity=".18" />
  </g>;
}
// Mapa esquemático de Europa (lon, lat → px) y la ruta de la grulla común.
const EU_X0 = 100, EU_Y0 = 600;
const euP = (lon, lat) => [EU_X0 + (lon + 12) * 20, EU_Y0 + (72 - lat) * 15.5];
const euPath = (pts) => 'M ' + pts.map(([lo, la]) => euP(lo, la).map((v) => v.toFixed(0)).join(' ')).join(' L ') + ' Z';
const EU_TIERRA = [
  [[-9, 43.2], [-9.3, 38.8], [-8.9, 37], [-6, 36.2], [-2, 36.7], [0, 38.8], [0.9, 41], [3.2, 42.2], [3, 43.4], [6.5, 43.1], [8.8, 44.4], [10.2, 43.9], [12.3, 41.7], [15.6, 40.1], [15.7, 38.2], [16.6, 38.5], [17, 39.9], [18.5, 40.2], [16, 41.4], [13.6, 43.6], [12.3, 44.8], [13.6, 45.7], [15, 44.4], [17.6, 42.9], [19.5, 41.5], [19.4, 40.3], [21, 38.4], [22.9, 36.6], [23.2, 38], [24, 38.4], [22.9, 40.4], [26, 40.8], [28.8, 41], [28, 43.4], [30, 45.2], [33, 46], [33, 60], [30, 60.3], [28, 59.5], [23.5, 59.3], [24.2, 57.8], [21.4, 57.4], [21, 56], [21.1, 55.2], [19.9, 54.6], [18.5, 54.8], [14.2, 53.9], [12, 54.4], [10.9, 54], [8.6, 54.9], [8.1, 56.6], [10.6, 57.7], [10.5, 56.2], [12.5, 56], [12.1, 54.9], [9, 53.9], [8.4, 53.5], [7, 53.4], [4.8, 52.9], [3.5, 51.4], [1.6, 50.9], [1.5, 50.1], [-1.6, 49.7], [-1.9, 48.7], [-4.6, 48.6], [-4.3, 47.8], [-2.2, 47.1], [-1.2, 46], [-1.4, 44.5], [-1.8, 43.4], [-4.5, 43.4], [-8, 43.7]],
  [[5.3, 58.8], [5, 61.5], [6.5, 62.8], [10.5, 64.5], [14.5, 67.5], [18, 69.6], [23, 70.5], [28, 71], [31, 70], [29, 69], [28.8, 66.5], [30, 63], [28, 60.6], [24.5, 60.1], [22.5, 60.2], [21.4, 61], [21.5, 63.5], [25.4, 65], [24.5, 65.8], [22, 65.7], [21.2, 64.5], [19, 63.5], [17.6, 62.4], [17.1, 61], [18.6, 60.1], [18.4, 59.2], [16.7, 58.5], [16.5, 57], [15.8, 56.1], [14.2, 55.4], [12.8, 55.4], [12.6, 56.4], [11.9, 57.7], [11.2, 59], [10.5, 59.4], [8, 58.1]],
  [[-5.6, 50.1], [-3, 50.6], [1.3, 51.1], [1.7, 52.7], [0.3, 53.4], [-0.3, 54.5], [-1.5, 55.6], [-2, 57.6], [-3.3, 58.6], [-5, 58.6], [-6.2, 57.5], [-5.6, 56.3], [-6.2, 55.3], [-4.8, 54.8], [-3.2, 54.1], [-3, 53.3], [-4.6, 52.8], [-5.1, 51.7], [-3.2, 51.4], [-4.3, 51.2]],
  [[-6, 52.1], [-6, 53.8], [-5.6, 55.2], [-7.5, 55.3], [-10, 54.2], [-10, 52.1], [-8.5, 51.6]],
];
const EU_RUTA = [[-6.2, 38.9], [-3, 41.4], [0.2, 44.3], [3, 46.5], [4.8, 48.6], [8.5, 51.2], [13.4, 54.4], [14.2, 56.4], [13.6, 58.3], [16.5, 60.4], [21, 62.2], [25.5, 63.6]];
function MapaEuropa({ T, at, rutaP = 0 }) {
  const pts = EU_RUTA.map(([lo, la]) => euP(lo, la));
  const seg = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rest = L * rutaP, px = pts[0][0], py = pts[0][1], ang = 0;
  for (let i = 1; i < pts.length; i++) { const d = seg[i - 1]; ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]);
    if (rest <= d) { const u = rest / d; px = klerp(pts[i - 1][0], pts[i][0], u); py = klerp(pts[i - 1][1], pts[i][1], u); break; } rest -= d; px = pts[i][0]; py = pts[i][1]; }
  const ruta = 'M ' + pts.map((p) => p.map((v) => v.toFixed(0)).join(' ')).join(' L ');
  return <g opacity={kprog(T, at, at + 0.5)}>
    <svg x={60} y={590} width={960} height={600} overflow="hidden">
      <rect width={960} height={600} fill="#9fd8ff" />
      <g transform="translate(-60 -590)">
        {EU_TIERRA.map((p, i) => <path key={i} d={euPath(p)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
        <path d={ruta} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${L * rutaP} ${L * 2}`} opacity=".25" />
        <path d={ruta} stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${L * rutaP} ${L * 2}`} />
        <circle cx={pts[0][0]} cy={pts[0][1]} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
        {rutaP > 0.98 && <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />}
        {rutaP > 0.01 && <g transform={`translate(${px} ${py - 30}) rotate(${(ang * 180) / Math.PI * 0.35})`}><GrullaVuelo x={0} y={0} s={0.8} T={T} /></g>}
      </g>
    </svg>
    <rect x={60} y={590} width={960} height={600} rx={8} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Celulares chiquitos que se encienden (usuarios de la app).
function Celulares({ T, at, x0 = 300, y0 = 760, cols = 6, filas = 3 }) {
  const out = [];
  for (let i = 0; i < cols * filas; i++) { const t = at + i * 0.09, c = i % cols, f = Math.floor(i / cols); if (T < t) continue;
    const e = kprog(T, t, t + 0.35, kEase.rebote), px = x0 + c * 120, py = y0 + f * 150;
    out.push(<g key={i} transform={`translate(${px} ${py}) scale(${e})`}>
      <rect x={-38} y={-62} width={76} height={124} rx={14} fill="#10131a" stroke={KC.ink} strokeWidth={5} />
      <rect x={-28} y={-46} width={56} height={84} rx={6} fill="#05070d" />
      <path d={`M -22 ${10 - (i % 3) * 8} Q 0 ${-20 - (i % 4) * 5} 22 ${-14 - (i % 2) * 12}`} stroke={KC.yellow} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>); }
  return <g>{out}</g>;
}
// Puntitos: cada uno = 10 especies.
function Puntitos({ T, n1, n2, x = 100, y = 690, cols = 25, paso = 36 }) {
  const out = [];
  for (let i = 0; i < 300; i++) { const c = i % cols, f = Math.floor(i / cols), on1 = i < n1, on2 = i < n2;
    out.push(<circle key={i} cx={x + c * paso + paso / 2} cy={y + f * paso + paso / 2} r={on1 || on2 ? 13 : 8}
      fill={on1 ? KC.yellow : on2 ? KC.pink : 'rgba(255,255,255,.35)'} stroke={on1 || on2 ? KC.ink : 'none'} strokeWidth={3} />); }
  return <g>{out}</g>;
}
// Tarjeta de un ave del jardín.
function FichaAve({ T, at, until, x, y, nombre, cientifico, children }) {
  if (T < at - 0.01 || T > until + 0.5) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote) * (1 - kprog(T, until, until + 0.45, kEase.suave));
  return <div style={{ position:'absolute', left:x, top:y, width:310, height:400, transform:`translate(-50%,-50%) scale(${e})`, zIndex:30,
    background:'#fffdf6', border:`7px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, overflow:'hidden' }}>
    <svg width={310} height={270} style={{ display:'block', background:'#bfefff' }}>{children}</svg>
    <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, textAlign:'center', marginTop:8 }}>{nombre}</div>
    <div style={{ font:`italic 700 24px ${KF.mono}`, color:'#5a524a', textAlign:'center', marginTop:4 }}>{cientifico}</div>
  </div>;
}
// Rótulo con una parte en cursiva (nombre científico).
function Rotulo({ T, at, until, normal, it, x = KW / 2, y = 470, tam = 40 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, whiteSpace:'nowrap',
    background:'rgba(14,15,18,.85)', border:`4px solid ${KC.gold}`, borderRadius:999, padding:'12px 32px', font:`900 ${tam}px ${KF.texto}`, color:KC.texto }}>
    {normal} <span style={{ fontStyle:'italic', font:`italic 700 ${tam * 0.9}px ${KF.mono}`, color:KC.gold2 }}>{it}</span></div>;
}

function Aves() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Espectro, F: CUES.Foto, P: CUES.Pregunta, V: CUES.Voluntarios, Es: CUES.Estudio, Cr: CUES.Crece, Ge: CUES.Gente, J: CUES.Jardin, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const EVG = avEventos(K.G + 0.25, K.E + 1.0, 0.7);       // cantos del gancho (celular)
  const EVE = avEventos(K.E + 1.2, K.F + 0.6, 0.75);       // cantos en el espectrograma grande
  const EVC = avEventos(K.C + 0.3, FIN, 0.9);              // cantos del cierre
  const cantaG = EVG.some((e) => T >= e.t && T < e.t + e.d) ? 1 : 0, cantaC = EVC.some((e) => T >= e.t && T < e.t + e.d) ? 1 : 0;
  const empuje = kprog(T, K.E - 0.9, K.E + 0.45, kEase.suave);          // la cámara entra al celular
  const onda = kprog(T, K.E + 0.1, K.E + 1.6, kEase.sale);
  const red = kprog(T, K.F + 3.0, K.P - 0.2);
  const n157 = Math.round(157 * kprog(T, K.Es + 3.4, K.Es + 5.6, kEase.suave));
  const n1 = Math.round(98 * kprog(T, K.Cr + 0.4, K.Cr + 2.8, kEase.suave)), n2 = Math.round(300 * kprog(T, K.Cr + 3.7, K.Cr + 5.6, kEase.suave));
  const ruta = kprog(T, K.Ge + 4.4, K.Ge + 7.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el zanate en tu ventana y tu celular escuchando */}
      <Escena T={T} a={K.G} b={K.E} zoom={0}>
        <div style={{ position:'absolute', inset:0, transform:`scale(${1 + 2.2 * empuje})`, transformOrigin:'74% 47%' }}>
          <FondoLunares color={KC.mint} />
          {svg(<>
            <Ventana T={T}>
              <Zanate x={330} y={392} s={1.05} T={T} canta={cantaG} />
              <Ondas T={T} x={170} y={278} t0={K.G + 0.2} />
            </Ventana>
            <CelularAves T={T} x={800} y={900} s={0.8} eventos={EVG} />
          </>)}
        </div>
      </Escena>
      <Etq T={T} at={K.G + 1.6} until={K.E - 0.9} x={110} y={1110} texto="Quiscalus mexicanus" it lado="der" tam={30} />
      {/* 2 · por dentro del celular: el espectrograma */}
      <Escena T={T} a={K.E} b={K.F} zoom={0.03}>
        <FondoCircuito T={T} color={KC.mint} />
        {svg(<>
          <g opacity={1 - kprog(T, K.E + 1.4, K.E + 2.2)}>
            <path d={Array.from({ length: 181 }, (_, i) => { const xx = 90 + i * 5, a = Math.sin(i * 0.9 + T * 9) * 120 * Math.sin(Math.PI * i / 180) * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.13 + T)));
              return `${i ? 'L' : 'M'} ${xx} ${900 + a * onda}`; }).join(' ')} stroke={KC.yellow} strokeWidth={7} fill="none" strokeLinejoin="round" />
          </g>
          <g opacity={kprog(T, K.E + 1.2, K.E + 2.0)}>
            <Espectrograma T={T} x={100} y={680} w={880} h={470} vel={170} eventos={EVE} />
            <text x={130} y={730} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>↑ agudo</text>
            <text x={130} y={1130} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>↓ grave</text>
            <text x={950} y={1130} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>tiempo →</text>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.E + 0.3} until={K.E + 1.6} texto="la onda del sonido…" x={380} y={560} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.E + 1.8} until={K.F - 0.2} texto="ESPECTROGRAMA" x={350} y={430} tam={50} borde={KC.mint} />
      <Chip T={T} at={K.E + 4.4} until={K.F - 0.2} texto="más brillante = más fuerte" x={380} y={560} tam={34} borde={KC.yellow} />
      {/* 3 · cada canto, una forma; la IA la lee como foto */}
      <Escena T={T} a={K.F} b={K.P}>
        <FondoCircuito T={T} />
        {svg(<>
          <g opacity={1 - kprog(T, K.F + 2.9, K.F + 3.3)}>
            <Huella T={T} x={190} y={880} tipo="rayitas" at={K.F + 0.9} etiqueta="rayitas" s={0.95} />
            <Huella T={T} x={540} y={880} tipo="curva" at={K.F + 1.4} etiqueta="curvas" s={0.95} />
            <Huella T={T} x={890} y={880} tipo="puntitos" at={K.F + 1.9} etiqueta="puntitos" s={0.95} />
            <Visor x={540} y={870} w={300} h={350} p={kprog(T, K.F + 2.4, K.F + 2.9, kEase.sale)} />
          </g>
          <g opacity={red}>
            <Huella T={T} x={170} y={880} tipo="curva" at={K.F + 3.0} etiqueta="foto" s={0.62} />
          </g>
        </>)}
        <RedNeuronal T={T} x={360} y={660} ancho={560} alto={440} capas={[5, 7, 7, 7, 3]} onda={T > K.F + 3.2 ? ((T - K.F - 3.2) * 0.7) % 1.2 : null} o={red} color={KC.mint} />
      </Escena>
      <Chip T={T} at={K.F + 3.3} until={K.P - 0.2} texto="la IA la lee como una foto" x={650} y={590} tam={36} borde={KC.cyan} />
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.V} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={280} y={1100} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text>)}
      </Escena>
      {/* 5 · los voluntarios */}
      <Escena T={T} a={K.V} b={K.Es}>
        <FondoLunares color={KC.lilac} />
        {svg(<Globo T={T} at={K.V + 0.4} cy={850} r={290} />)}
      </Escena>
      <Chip T={T} at={K.V + 0.4} until={K.Es - 0.2} texto="miles de voluntarios" x={540} y={420} tam={44} borde={KC.yellow} />
      <Chip T={T} at={K.V + 1.6} until={K.Es - 0.2} texto="millones de grabaciones de aves" x={540} y={510} tam={36} borde={KC.ink} />
      {/* 6 · el estudio: BirdNET */}
      <Escena T={T} a={K.Es} b={K.Cr}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.Es + 3.2, K.Es + 3.6)}><Capas x={620} y={1130} n={n157} /></g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="BirdNET" quien="Cornell + Univ. Técnica de Chemnitz" revista="Kahl, Wood, Eibl y Klinck · Ecological Informatics (2021)" y={640} />
      <Chip T={T} at={K.Es + 1.2} until={K.Es + 3.2} texto="EE. UU. + Alemania" x={540} y={930} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Es + 3.4} until={K.Cr - 0.2} valor={157} dur={2.2} etiqueta="" sufijo="" x={810} y={520} tam={170} color={KC.cyan} />
      <Chip T={T} at={K.Es + 3.8} until={K.Cr - 0.2} texto="capas" x={810} y={660} tam={44} borde={KC.cyan} />
      {/* 7 · de 984 a más de 3 000 */}
      <Escena T={T} a={K.Cr} b={K.Ge}>
        <FondoLunares color={KC.cyan} />
        {svg(<Puntitos T={T} n1={n1} n2={Math.max(n1, n2)} />)}
      </Escena>
      <NumeroGigante T={T} at={K.Cr + 0.3} until={K.Cr + 3.4} valor={984} dur={2.4} etiqueta="especies de aves (2018–2020)" x={540} y={470} tam={190} color={KC.yellow} />
      <NumeroGigante T={T} at={K.Cr + 3.6} until={K.Ge - 0.2} valor={3000} desde={984} dur={1.9} prefijo="+" etiqueta="inicios de 2021" x={400} y={470} tam={190} color={KC.pink} />
      <Chip T={T} at={K.Cr + 1.0} until={K.Ge - 0.2} texto="cada puntito = 10 especies" x={540} y={1160} tam={30} borde={KC.ink} />
      {/* 8 · la gente y la grulla */}
      <Escena T={T} a={K.Ge} b={K.J}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={1 - kprog(T, K.Ge + 3.6, K.Ge + 4.1)}><Celulares T={T} at={K.Ge + 0.5} x0={240} y0={780} /></g>
          {T > K.Ge + 3.6 && <MapaEuropa T={T} at={K.Ge + 3.6} rutaP={ruta} />}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ge + 0.3} until={K.Ge + 3.6} valor={1.1} dec={1} dur={1.2} prefijo="+" sufijo=" millones" etiqueta="personas en 2020" x={650} y={540} tam={110} color={KC.yellow} />
      <Rotulo T={T} at={K.Ge + 4.0} until={K.J - 0.2} normal="grulla común" it="Grus grus" y={440} />
      <Chip T={T} at={K.Ge + 5.6} until={K.J - 0.2} texto="igual a su ruta ya conocida" x={540} y={525} tam={32} borde={KC.red} />
      {/* 9 · el modelo de 2023 y tu jardín */}
      <Escena T={T} a={K.J} b={K.C}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <NumeroGigante T={T} at={K.J + 0.3} until={K.C - 0.2} valor={6000} dur={1.6} prefijo="+" etiqueta="modelo mundial · 2023" x={390} y={470} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.J + 1.4} until={K.C - 0.2} texto="especies: aves y otros animales" x={390} y={640} tam={28} borde={KC.ink} />
      <FichaAve T={T} at={K.J + 3.2} until={K.C - 0.2} x={195} y={930} nombre="zanate" cientifico="Quiscalus mexicanus"><Zanate x={170} y={250} s={0.62} T={T} /></FichaAve>
      <FichaAve T={T} at={K.J + 3.8} until={K.C - 0.2} x={540} y={930} nombre="gorrión" cientifico="Passer domesticus"><Gorrion x={160} y={235} s={1.2} T={T} /></FichaAve>
      <FichaAve T={T} at={K.J + 4.4} until={K.C - 0.2} x={885} y={930} nombre="tortolita" cientifico="Columbina inca"><Tortolita x={140} y={225} s={1.15} T={T} /></FichaAve>
      {/* 10 · cierre: la misma ventana; el canto ya se ve como dibujo */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Ventana T={T}>
            <Zanate x={330} y={392} s={1.05} T={T} canta={cantaC} />
          </Ventana>
          {EVC.filter((e) => T >= e.t).map((e, i) => { const u = kprog(T, e.t, e.t + 2.6), ox = 560 + u * 300, oy = 900 + (i % 2) * 70 - u * 40;
            return <g key={i} transform={`translate(${ox} ${oy - 150}) scale(${0.7 + u * 0.4})`} opacity={1 - kprog(T, e.t + 2.0, e.t + 2.6)}><AvTraza e={{ ...e, d: 0.8 }} h={230} vel={150} /></g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou - 0.1} texto="una foto en cada canto" x={330} y={360} tam={38} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} tam={60} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Un dibujo *en su canto.*" />
      <Subtitulo T={T} tam={60} idx={1} at={K.E + 0.1} until={K.E + 3.6} texto="Lo vuelve *una imagen.*" />
      <Subtitulo T={T} tam={60} idx={2} at={K.E + 3.7} until={K.F - 0.1} texto="Tono, fuerza *y duración.*" />
      <Subtitulo T={T} tam={60} idx={3} at={K.F + 0.1} until={K.P - 0.1} texto="La IA lo ve *como foto.*" />
      <Subtitulo T={T} tam={60} idx={4} at={K.P + 0.1} until={K.V - 0.1} texto="¿Quién le *enseñó?*" />
      <Subtitulo T={T} tam={60} idx={5} at={K.V + 0.1} until={K.Es - 0.1} texto="*Millones* de grabaciones." />
      <Subtitulo T={T} tam={60} idx={6} at={K.Es + 0.1} until={K.Cr - 0.1} texto="BirdNET: *157 capas.*" />
      <Subtitulo T={T} tam={60} idx={7} at={K.Cr + 0.1} until={K.Ge - 0.1} texto="*984*… y luego *+3 000.*" />
      <Subtitulo T={T} tam={60} idx={8} at={K.Ge + 0.1} until={K.J - 0.1} texto="*1 millón*… y la *grulla.*" />
      <Subtitulo T={T} tam={60} idx={9} at={K.J + 0.1} until={K.C - 0.1} texto="*+6 000* y tu *zanate.*" />
      <Subtitulo T={T} tam={60} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una *foto escondida.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Espectro + 3.3, CUES.Foto - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Foto + 0.6, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Voluntarios + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.4, CUES.Crece - 0.15, 'avatar_04_bajando_lentes', 'grande-izq'],
        [CUES.Crece + 3.6, CUES.Gente - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Gente + 0.4, CUES.Gente + 3.5, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Jardin + 3.0, CUES.Cierre - 0.15, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="ia" num="39" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AvesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Aves /></CompositionStage></div>;
}
window.AvesApp = AvesApp;
