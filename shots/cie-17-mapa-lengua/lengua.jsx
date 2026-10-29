// Shot Científico #17 · El mapa de los sabores de la lengua es un mito — NARRADO (N2 mito tachado + N1 "Por dentro": la papila).
// Datos: Hänig 1901, Boring 1942 (Wolfe et al.; Spence 2022; Munger 2017), Chandrashekar et al. 2006. Ver guion.md y verificacion.md.
// Dibujo esquemático: la lengua, las papilas y las gráficas no van a escala. En el centro hay menos papilas que en los bordes.
const LG_PIEL = '#f4889c', LG_OSC = '#d9607a', LG_LUZ = '#ffb3c1';
const SAB = { dulce: KC.pink, salado: KC.cyan, acido: KC.yellow, amargo: '#9b6bff', umami: KC.orange };
const LG_PATH = 'M -272 -330 C -296 -90 -268 150 -170 300 C -105 392 105 392 170 300 C 268 150 296 -90 272 -330 C 160 -398 -160 -398 -272 -330 Z';
const lgAncho = (y) => (y < -100 ? 270 : 270 * Math.sqrt(Math.max(0, 1 - ((y + 100) / 475) ** 2)));
const lgSuave = (a, b, v) => { const t = kclamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
// Papilas: muchas en los bordes y la punta, pocas en el centro (nota del verificador).
const LG_PAP = (() => {
  const g = krng(17), out = []; let n = 0;
  while (out.length < 240 && n++ < 8000) {
    const x = (g() * 2 - 1) * 280, y = -340 + g() * 700, w = lgAncho(y);
    if (Math.abs(x) > w - 20) continue;
    const ex = Math.abs(x) / w, punta = lgSuave(150, 330, y);
    const p = 0.08 + 0.92 * Math.max(lgSuave(0.4, 0.85, ex), punta);
    if (g() > p) continue;
    out.push([x, y, 6 + g() * 5, g()]);
  }
  return out;
})();
const LG_V = [[-172, -212], [-116, -246], [-58, -278], [0, -300], [58, -278], [116, -246], [172, -212]];   // papilas grandes en V (al fondo)
// Zonas del mapa clásico (coordenadas de la lengua).
const LG_ZONAS = [
  ['amargo', 'M -320 -420 H 320 V -170 H -320 Z'],
  ['acido', 'M -320 -170 H -120 V 60 H -320 Z M 120 -170 H 320 V 60 H 120 Z'],
  ['salado', 'M -320 60 H -105 V 240 H -320 Z M 105 60 H 320 V 240 H 105 Z'],
  ['dulce', 'M -320 240 H 320 V 420 H -320 Z'],
];
const LG_FRONT = 'M -300 -170 H 300 M -120 -170 V 60 M 120 -170 V 60 M -300 60 H -105 M 105 60 H 300 M -105 60 V 240 M 105 60 V 240 M -300 240 H 300';
const LG_ETQ = [['AMARGO', 0, -250, 'amargo'], ['ÁCIDO', -200, -50, 'acido'], ['ÁCIDO', 200, -50, 'acido'], ['SALADO', -180, 150, 'salado'], ['SALADO', 180, 150, 'salado'], ['DULCE', 0, 318, 'dulce']];

// La lengua vista desde arriba (punta abajo). mapa/fronteras/etiquetas/papilas/brillo: 0..1.
function Lengua({ id, x, y, s = 1, T = 0, mapa = 0, fronteras = 0, gruesa = false, etiquetas = 0, papilas = 0, brillo = 0, zonasOn, children }) {
  const cid = 'lgc-' + id;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={cid}><path d={LG_PATH} /></clipPath>
      <linearGradient id={cid + 'g'} x1="0" y1="0" x2="1" y2="1">{[SAB.amargo, SAB.acido, SAB.umami, SAB.salado, SAB.dulce].map((c, i) => <stop key={i} offset={i / 4} stopColor={c} />)}</linearGradient></defs>
    <path d={LG_PATH} fill={KC.ink} transform="translate(10 16)" opacity=".35" />
    <path d={LG_PATH} fill={LG_PIEL} />
    <g clipPath={`url(#${cid})`}>
      <ellipse cx={-90} cy={-120} rx={110} ry={200} fill={LG_LUZ} opacity=".35" />
      {mapa > 0.01 && LG_ZONAS.map(([k, d]) => <path key={k} d={d} fill={SAB[k]} opacity={mapa * 0.85 * (zonasOn ? zonasOn(k) : 1)} />)}
      <rect x={-400} y={-400} width={800} height={800} fill={`url(#${cid}g)`} opacity={brillo * (0.35 + 0.1 * Math.sin(T * 5))} />
      <path d="M 0 -330 C -8 -150 8 50 0 250" fill="none" stroke={LG_OSC} strokeWidth={14} strokeLinecap="round" opacity=".8" />
      {papilas > 0 && LG_PAP.map(([px, py, r, u], i) => u < papilas && <circle key={i} cx={px} cy={py} r={r * (brillo > 0.3 ? 1 + 0.25 * Math.sin(T * 6 + i) : 1)}
        fill={brillo > 0.01 ? mixHex(LG_LUZ, KC.gold2, brillo) : LG_LUZ} stroke={LG_OSC} strokeWidth={3} opacity={kprog(papilas, u, u + 0.08)} />)}
      {papilas > 0 && LG_V.map(([px, py], i) => <g key={i} opacity={kprog(papilas, 0.5 + i * 0.05, 0.6 + i * 0.05)}><circle cx={px} cy={py} r={20} fill={LG_OSC} stroke={KC.ink} strokeWidth={3} />
        <circle cx={px} cy={py} r={11} fill={brillo > 0.01 ? mixHex(LG_LUZ, KC.gold2, brillo) : LG_LUZ} /></g>)}
      {fronteras > 0.01 && <path d={LG_FRONT} fill="none" stroke={KC.ink} strokeWidth={gruesa ? 13 : 8} strokeDasharray={gruesa ? 'none' : '24 14'} strokeLinecap="round" opacity={fronteras} />}
    </g>
    <path d={LG_PATH} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {brillo > 0.01 && <path d={LG_PATH} fill="none" stroke={KC.gold2} strokeWidth={22} opacity={brillo * (0.4 + 0.3 * Math.sin(T * 5))} />}
    {etiquetas > 0.01 && LG_ETQ.map(([t, ex, ey, k], i) => <text key={i} x={ex} y={ey} textAnchor="middle" opacity={etiquetas * (zonasOn ? zonasOn(k) : 1)}
      style={{ font:`400 ${t === 'AMARGO' || t === 'DULCE' ? 46 : 34}px ${KF.titulo}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{t}</text>)}
    {children}
  </g>;
}
// Póster escolar con el mapa (gancho y cierre).
function Poster({ x, y, s = 1, children, rot = -2, titulo = 'EL MAPA DE LA LENGUA' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-330} y={-420} width={660} height={840} rx={14} fill={KC.ink} transform="translate(14 16)" />
    <rect x={-330} y={-420} width={660} height={840} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-60} y={-445} width={120} height={46} fill="rgba(255,240,170,.85)" stroke={KC.ink} strokeWidth={4} transform="rotate(-4)" />
    <text x={0} y={-345} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>{titulo}</text>
    {children}
  </g>;
}
// Sello rojo «MITO».
function Sello({ T, at, x, y, s = 1, rot = -14 }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.22, kEase.sale), k = klerp(2.6, 1, e) * s, tiembla = (1 - kprog(T, at + 0.22, at + 0.6)) * Math.sin(T * 60) * 4;
  return <g transform={`translate(${x + tiembla} ${y}) rotate(${rot}) scale(${k})`} opacity={kprog(T, at, at + 0.12)}>
    <rect x={-230} y={-95} width={460} height={190} rx={22} fill="rgba(255,59,47,.12)" stroke={KC.red} strokeWidth={16} />
    <rect x={-205} y={-72} width={410} height={144} rx={12} fill="none" stroke={KC.red} strokeWidth={5} />
    <text x={0} y={52} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}`, letterSpacing:'.08em' }} fill={KC.red}>MITO</text>
  </g>;
}
function Cuchara({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={40} y={-16} width={330} height={32} rx={16} fill="#cfd6e0" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={78} ry={56} fill="#e6ebf2" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-6} cy={-4} rx={52} ry={34} fill="#fff" opacity=".7" />
  </g>;
}
function Cristal({ x, y, r = 12, rot = 0 }) {
  return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx={3} transform={`rotate(${rot} ${x} ${y})`} fill="#fff" stroke={KC.ink} strokeWidth={4} />;
}
// Íconos de los cinco sabores (centrados en 0,0).
function IconoSabor({ k }) {
  if (k === 'dulce') return <g><path d="M -70 -28 L -42 0 L -70 28 Z M 70 -28 L 42 0 L 70 28 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse rx={46} ry={32} fill={KC.pink} stroke={KC.ink} strokeWidth={7} /><path d="M -20 -26 Q 0 0 -20 26 M 6 -30 Q 26 0 6 30" stroke="#fff" strokeWidth={6} fill="none" /></g>;
  if (k === 'salado') return <g><rect x={-32} y={-26} width={64} height={70} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -32 -26 Q -32 -60 0 -60 Q 32 -60 32 -26 Z" fill="#aab4c4" stroke={KC.ink} strokeWidth={7} />
    {[-14, 0, 14].map((cx) => <circle key={cx} cx={cx} cy={-44} r={4} fill={KC.ink} />)}<rect x={-20} y={0} width={40} height={30} rx={6} fill={KC.cyan} opacity=".5" /></g>;
  if (k === 'acido') return <g><circle r={50} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /><circle r={38} fill="#fff6a8" />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={0} x2={Math.cos(i * Math.PI / 4) * 38} y2={Math.sin(i * Math.PI / 4) * 38} stroke={KC.gold} strokeWidth={5} />)}<circle r={7} fill="#fff" /></g>;
  if (k === 'amargo') return <g><path d="M -44 -30 H 40 V 18 Q 40 46 12 46 H -16 Q -44 46 -44 18 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 40 -16 Q 66 -16 66 6 Q 66 26 40 24" fill="none" stroke={KC.ink} strokeWidth={7} /><ellipse cx={-2} cy={-28} rx={38} ry={7} fill="#5a3418" />
    <path d="M -18 -44 Q -26 -58 -16 -70 M 8 -44 Q 0 -58 10 -70" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity=".8" /></g>;
  return <Tazon x={0} y={6} s={0.42} />;
}
function Tazon({ x, y, s = 1, T = 0, vapor = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && [-60, 0, 60].map((dx, i) => <path key={i} d={`M ${dx} -70 Q ${dx - 30} -120 ${dx} -170 Q ${dx + 30} -220 ${dx} -270`} fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round"
      opacity={vapor * (0.4 + 0.4 * Math.sin(T * 3 + i * 2))} transform={`translate(${Math.sin(T * 2 + i) * 8} ${-((T * 30 + i * 20) % 40)})`} />)}
    <ellipse cx={0} cy={-40} rx={170} ry={40} fill="#c9762b" stroke={KC.ink} strokeWidth={9} />
    {[[-70, -44], [10, -30], [70, -48]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={16} fill={i === 1 ? KC.leaf : '#f2c14e'} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -170 -40 Q -160 110 0 120 Q 160 110 170 -40 Q 0 -10 -170 -40 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 10 Q 0 40 150 10" fill="none" stroke={KC.cyan} strokeWidth={10} />
  </g>;
}
function Jitomate({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={150} ry={128} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <path d="M -60 -100 Q 0 -60 60 -100" fill="none" stroke="#c22a20" strokeWidth={7} />
    <ellipse cx={-60} cy={-40} rx={34} ry={22} fill="#fff" opacity=".35" transform="rotate(-30 -60 -40)" />
    <path d="M 0 -118 L -50 -150 L -18 -120 L -40 -96 L 0 -110 L 40 -96 L 18 -120 L 50 -150 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-7} y={-160} width={14} height={44} rx={6} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Gotero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -10 0 L 10 0 L 16 -60 L -16 -60 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-22} y={-200} width={44} height={140} rx={10} fill="#e8f6ff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-16} y={-120} width={32} height={56} fill={KC.cyan} opacity=".7" />
    <rect x={-30} y={-290} width={60} height={96} rx={28} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Bandera({ x, y, color, p = 1 }) {
  if (p <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, p)})`} opacity={p}>
    <line x1={0} y1={0} x2={0} y2={-120} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M 0 -120 L 80 -96 L 0 -70 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Botón gustativo al microscopio (dentro del svg de la Lupa).
function BotonGustativo({ T, r }) {
  const cx = r, cy = r + 40;
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#2a0f1c" />
    <path d={`M 0 ${cy - 150} Q ${r} ${cy - 175} ${r * 2} ${cy - 150} L ${r * 2} ${r * 2} L 0 ${r * 2} Z`} fill="#7a2c45" />
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={i * 56 + 10} cy={cy - 120 + (i % 2) * 30} rx={30} ry={20} fill="#933a57" stroke="#5a1c30" strokeWidth={3} />)}
    <ellipse cx={cx} cy={cy} rx={95} ry={135} fill="#f6b8c8" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => { const a = (i - 4) * 0.2; return <path key={i} d={`M ${cx + Math.sin(a) * 30} ${cy - 120} Q ${cx + Math.sin(a) * 160} ${cy} ${cx + Math.sin(a) * 60} ${cy + 125}`}
      fill={['#ffd6e0', '#ffc2d1', '#ffe3ea'][i % 3]} stroke="#b94a6b" strokeWidth={3} />; })}
    {[-2, -1, 0, 1, 2].map((k) => <line key={k} x1={cx + k * 6} y1={cy - 125} x2={cx + k * 9} y2={cy - 150 - Math.abs(Math.sin(T * 4 + k)) * 8} stroke={KC.gold2} strokeWidth={4} strokeLinecap="round" />)}
    {Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.5 + i / 6) % 1), c = [SAB.dulce, SAB.salado, SAB.acido, SAB.amargo, SAB.umami, SAB.dulce][i];
      return <circle key={i} cx={cx + Math.sin(i * 2.1) * 120 * (1 - f)} cy={klerp(30, cy - 140, f)} r={9} fill={c} stroke={KC.ink} strokeWidth={2} opacity={1 - f * 0.6} />; })}
    {[-50, 0, 50].map((dx, i) => <path key={i} d={`M ${cx + dx * 0.4} ${cy + 120} Q ${cx + dx} ${cy + 170} ${cx + dx * 1.6} ${r * 2}`} fill="none" stroke={KC.gold2} strokeWidth={5}
      strokeDasharray="10 8" strokeDashoffset={T * 40} />)}
  </svg>;
}
// Curvas tipo gráfica (Boring): 4 sabores; estira 1 = casi planas, más = se exageran.
function Grafica({ T, x, y, w = 820, h = 560, estira = 1, p = 1 }) {
  const base = h * 0.62, picos = [0.12, 0.38, 0.62, 0.88], colores = [SAB.dulce, SAB.salado, SAB.acido, SAB.amargo];
  const curva = (c) => { const pts = []; for (let i = 0; i <= 50; i++) { const f = i / 50; const v = 14 * Math.exp(-((f - picos[c]) ** 2) / 0.02);
    pts.push(`${(60 + f * (w - 100)).toFixed(1)},${(base - v * estira).toFixed(1)}`); } return pts.slice(0, Math.max(2, Math.ceil(p * pts.length))).join(' '); };
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={60} y1={40 + i * 55} x2={w - 40} y2={40 + i * 55} stroke="#cfe0ef" strokeWidth={3} />)}
    <line x1={60} y1={30} x2={60} y2={h - 60} stroke={KC.ink} strokeWidth={7} /><line x1={60} y1={h - 60} x2={w - 30} y2={h - 60} stroke={KC.ink} strokeWidth={7} />
    <text x={70} y={h - 20} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>punta</text>
    <text x={w - 40} y={h - 20} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>atrás</text>
    <text x={36} y={h / 2} textAnchor="middle" transform={`rotate(-90 36 ${h / 2})`} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>sensibilidad</text>
    {[0, 1, 2, 3].map((c) => <polyline key={c} points={curva(c)} fill="none" stroke={colores[c]} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />)}
  </g>;
}

const SABORES = ['dulce', 'salado', 'acido', 'amargo', 'umami'];
const NOMBRE = { dulce: 'dulce', salado: 'salado', acido: 'ácido', amargo: 'amargo', umami: 'umami' };
const SPOTS = [[0, 300], [-200, 120], [200, 120], [-200, -120], [200, -120], [-150, -260], [150, -260]];

function Lengua17() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const sab = (i) => K.Todos + 2.9 + i * 0.6;                 // cuándo se dice cada sabor
  const pegar = K.Gancho + 3.9;                               // sello «MITO» («está mal»)
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el mapa de la escuela y el sello MITO */}
      <Escena T={T} a={K.Gancho} b={K.Prueba}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, 0, 0.5, kEase.rebote)) * -900})`}>
            <Poster x={380} y={790} s={0.88}>
              <Lengua id="g" x={0} y={50} s={0.78} T={T} mapa={1} fronteras={1} etiquetas={1}
                zonasOn={(k) => kprog(T, 0.3 + ['amargo', 'acido', 'salado', 'dulce'].indexOf(k) * 0.3, 0.55 + ['amargo', 'acido', 'salado', 'dulce'].indexOf(k) * 0.3)} />
            </Poster>
          </g>
          <Sello T={T} at={pegar} x={380} y={810} />
        </Lienzo>
      </Escena>
      {/* 1 · la prueba: azúcar en un lado */}
      <Escena T={T} a={K.Prueba} b={K.Papilas}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Lengua id="p" x={540} y={820} s={0.85} T={T} fronteras={0.25}>
            {T > K.Prueba + 2.6 && [0, 1, 2].map((i) => { const f = ((T - K.Prueba - 2.6) * 0.8 + i / 3) % 1;
              return <circle key={i} cx={190} cy={60} r={30 + f * 150} fill="none" stroke={KC.pink} strokeWidth={12} opacity={(1 - f) * kprog(T, K.Prueba + 2.6, K.Prueba + 2.9)} />; })}
            {T > K.Prueba + 1.5 && Array.from({ length: 9 }, (_, i) => { const t0 = K.Prueba + 1.5 + i * 0.08, f = kprog(T, t0, t0 + 0.45, (q) => q * q);
              return <Cristal key={i} x={190 + ((i * 37) % 70) - 35} y={klerp(-60, 60 + ((i * 23) % 40) - 20, f)} r={11} rot={i * 33 + f * 90} />; })}
          </Lengua>
          {(() => { const lle = kprog(T, K.Prueba + 0.3, K.Prueba + 1.3, kEase.sale), tilt = kprog(T, K.Prueba + 1.4, K.Prueba + 1.8), va = kprog(T, K.Prueba + 2.6, K.Prueba + 3.4, kEase.suave);
            return <Cuchara x={klerp(1300, 540 + 0.85 * 190 + 90, lle) + va * 600} y={klerp(500, 820 + 0.85 * 60 - 120, lle) - va * 200} rot={-20 + tilt * 35} s={1.1} />; })()}
        </Lienzo>
        <Chip T={T} at={K.Prueba + 2.8} until={K.Papilas - 0.1} texto="dulce ✓" x={330} y={430} tam={56} borde={KC.pink} />
      </Escena>
      {/* 2 · papilas: por toda la lengua, al microscopio */}
      <Escena T={T} a={K.Papilas} b={K.Todos} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <Lengua id="m" x={320} y={930} s={0.74} T={T} papilas={kprog(T, K.Papilas + 0.2, K.Papilas + 2.6)} />
        </Lienzo>
        <Etq T={T} at={K.Papilas + 1.0} until={K.Todos - 0.2} x={40} y={560} texto="papilas gustativas" lado="der" color={KC.gold2} />
        <Lupa T={T} at={K.Papilas + 1.9} until={K.Todos - 0.3} x={800} y={590} r={215} fx={320 + 0.74 * 215} fy={930 + 0.74 * 40} tinte={KC.pink} etiqueta="AL MICROSCOPIO · PAPILA"
          interior={(t, r) => <BotonGustativo T={t} r={r} />} />
        <Etq T={T} at={K.Papilas + 2.8} until={K.Todos - 0.2} x={640} y={920} texto="botón gustativo" lado="der" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Papilas + 3.4} until={K.Todos - 0.2} x={640} y={975} texto="células del gusto" lado="der" color={KC.gold2} tam={30} />
      </Escena>
      {/* 3 · los cinco sabores en todas las zonas */}
      <Escena T={T} a={K.Todos} b={K.Pregunta}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Lengua id="t" x={540} y={950} s={0.72} T={T} papilas={1} brillo={kprog(T, sab(4) + 0.5, sab(4) + 1.2) * 0.6}>
            {SABORES.map((k, i) => T > sab(i) && SPOTS.map(([sx, sy], j) => { const f = kprog(T, sab(i) + j * 0.03, sab(i) + 0.9 + j * 0.03);
              return f < 1 && <circle key={k + j} cx={sx} cy={sy} r={20 + f * 90} fill={SAB[k]} fillOpacity={0.35 * (1 - f)} stroke={SAB[k]} strokeWidth={10} opacity={1 - f} />; }))}
          </Lengua>
          {SABORES.map((k, i) => { const on = kprog(T, sab(i), sab(i) + 0.3, kEase.rebote), cx = 140 + i * 200, cy = 470, ap = kprog(T, K.Todos + 0.3 + i * 0.12, K.Todos + 0.7 + i * 0.12, kEase.sale);
            return <g key={k} transform={`translate(${cx} ${cy}) scale(${ap * (1 + 0.15 * on * (1 - kprog(T, sab(i) + 0.3, sab(i) + 0.8)))})`}>
              <circle r={84} fill={on > 0.5 ? SAB[k] : 'rgba(255,255,255,.55)'} stroke={KC.ink} strokeWidth={8} />
              {on > 0 && <circle r={84 + 30 * kprog(T, sab(i), sab(i) + 0.6)} fill="none" stroke="#fff" strokeWidth={8} opacity={1 - kprog(T, sab(i), sab(i) + 0.6)} />}
              <g opacity={0.45 + 0.55 * on}><IconoSabor k={k} /></g>
              <text y={130} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{NOMBRE[k]}</text>
            </g>; })}
        </Lienzo>
        <Chip T={T} at={K.Todos + 0.5} until={sab(0) - 0.1} texto="zonas con papilas" x={540} y={680} tam={40} borde={KC.gold2} />
      </Escena>
      {/* 4 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Hanig} />
      {/* 5 · Hänig 1901: un poco más sensibles */}
      <Escena T={T} a={K.Hanig} b={K.Boring}>
        <FondoLunares color={KC.yellow} />
        <Lienzo o={kprog(T, K.Hanig + 2.6, K.Hanig + 3.0)}>
          <Lengua id="h" x={540} y={900} s={0.78} T={T} papilas={1}>
            {[[0, 300, 3.2], [-200, 120, 4.1], [200, -150, 5.0]].map(([px, py, dt], i) => { const t0 = K.Hanig + dt, f = kprog(T, t0 + 0.3, t0 + 1.0);
              return T > t0 + 0.3 && <g key={i}><circle cx={px} cy={py} r={26 + f * 60} fill="none" stroke={KC.blue} strokeWidth={8} opacity={1 - f} />
                <text x={px + 46} y={py - 30} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.blue} stroke="#fff" strokeWidth={8} paintOrder="stroke" opacity={kprog(T, t0 + 0.3, t0 + 0.5)}>+</text></g>; })}
          </Lengua>
          {(() => { const ps = [[540, 900 + 0.78 * 300, 3.2], [540 - 0.78 * 200, 900 + 0.78 * 120, 4.1], [540 + 0.78 * 200, 900 - 0.78 * 150, 5.0]];
            let gx = ps[0][0], gy = ps[0][1]; for (let i = 0; i < 3; i++) { const t0 = K.Hanig + ps[i][2]; if (T > t0 - 0.6) { const f = kprog(T, t0 - 0.6, t0 - 0.1, kEase.suave);
              gx = klerp(i ? ps[i - 1][0] : 760, ps[i][0], f); gy = klerp(i ? ps[i - 1][1] : 520, ps[i][1], f); } }
            const toca = [0, 1, 2].some((i) => Math.abs(T - K.Hanig - ps[i][2] - 0.1) < 0.2) ? 18 : 0;
            return <Gotero x={gx} y={gy - 20 + toca} s={1.1} />; })()}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Hanig + 0.2} until={K.Hanig + 2.7} anio="1901" quien="David Hänig · Alemania" revista="midió la sensibilidad por zonas" x={540} y={760} />
        <Chip T={T} at={K.Hanig + 3.4} until={K.Boring - 0.1} texto="apenas un poco más sensibles" x={540} y={420} tam={42} borde={KC.blue} />
      </Escena>
      {/* 6 · Boring 1942: la gráfica exagera */}
      <Escena T={T} a={K.Boring} b={K.Libros}>
        <FondoLunares color={KC.orange} />
        <Lienzo o={kprog(T, K.Boring + 2.7, K.Boring + 3.1)}>
          <Grafica T={T} x={130} y={520} w={820} h={600} p={kprog(T, K.Boring + 2.9, K.Boring + 3.8)} estira={klerp(1, 7, kprog(T, K.Boring + 4.4, K.Boring + 6.0, kEase.suave)) + 0.15 * Math.sin(T * 8) * kprog(T, K.Boring + 4.4, K.Boring + 6)} />
          {T > K.Boring + 4.4 && [300, 480, 690, 860].map((xx, i) => <g key={i} opacity={kprog(T, K.Boring + 4.4, K.Boring + 4.8) * (1 - kprog(T, K.Boring + 6.2, K.Boring + 6.6))}>
            <line x1={xx} y1={770 - Math.sin(T * 9 + i) * 20} x2={xx} y2={700 - Math.sin(T * 9 + i) * 20} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
            <path d={`M ${xx - 20} ${712 - Math.sin(T * 9 + i) * 20} L ${xx} ${680 - Math.sin(T * 9 + i) * 20} L ${xx + 20} ${712 - Math.sin(T * 9 + i) * 20}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>)}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Boring + 0.2} until={K.Boring + 2.8} anio="1942" quien="Edwin Boring · Harvard" revista="psicólogo" x={540} y={760} />
        <Chip T={T} at={K.Boring + 4.6} until={K.Libros - 0.1} texto="las diferencias se ven grandes" x={540} y={430} tam={42} borde={KC.red} />
      </Escena>
      {/* 7 · los libros: zonas con fronteras */}
      <Escena T={T} a={K.Libros} b={K.Umami}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`translate(540 880) scale(${klerp(0.6, 0.92, kprog(T, K.Libros, K.Libros + 0.5, kEase.rebote))}) translate(-540 -880)`}>
            <path d="M 50 520 L 530 560 L 1030 520 L 1030 1220 L 530 1250 L 50 1220 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <path d="M 80 545 Q 300 520 530 575 L 530 1225 Q 300 1180 80 1200 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <path d="M 1000 545 Q 770 520 530 575 L 530 1225 Q 770 1180 1000 1200 Z" fill="#fffaf0" stroke={KC.ink} strokeWidth={8} />
            <text x={300} y={650} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>EL GUSTO</text>
            {Array.from({ length: 10 }, (_, i) => <rect key={i} x={130} y={700 + i * 46} width={i % 4 === 3 ? 200 : 330} height={16} rx={8} fill="#bdb6a8" />)}
            <Lengua id="b" x={765} y={890} s={0.58} T={T} mapa={1} etiquetas={1} gruesa fronteras={kprog(T, K.Libros + 0.6, K.Libros + 1.6)} />
            {[[765, 890 - 0.58 * 270, SAB.amargo], [765 - 0.58 * 210, 890 - 0.58 * 60, SAB.acido], [765 + 0.58 * 190, 890 + 0.58 * 140, SAB.salado], [765, 890 + 0.58 * 300, SAB.dulce]].map(([bx, by, c], i) =>
              <Bandera key={i} x={bx} y={by} color={c} p={kprog(T, K.Libros + 2.6 + i * 0.35, K.Libros + 3.0 + i * 0.35, kEase.rebote)} />)}
          </g>
        </Lienzo>
        <Chip T={T} at={K.Libros + 2.6} until={K.Umami - 0.1} texto="cada sabor, su territorio" x={540} y={420} tam={44} borde={KC.ink} />
      </Escena>
      {/* 8 · el umami no estaba */}
      <Escena T={T} a={K.Umami} b={K.Diferencias}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Umami, K.Umami + 0.5, kEase.sale)) * -300})`}>
            <Lengua id="u" x={290} y={760} s={0.44} T={T} mapa={1} fronteras={1} etiquetas={1} />
            <g transform={`translate(470 ${640})`} opacity={kprog(T, K.Umami + 0.8, K.Umami + 1.2)}>
              <rect x={0} y={0} width={190} height={110} rx={20} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} strokeDasharray="16 10" />
              <text x={95} y={70} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>¿UMAMI?</text>
              {T > K.Umami + 1.4 && <path d="M 20 20 L 170 90 M 170 20 L 20 90" stroke={KC.red} strokeWidth={14 * kprog(T, K.Umami + 1.4, K.Umami + 1.6)} strokeLinecap="round" />}
            </g>
          </g>
          <g transform={`translate(0 ${(1 - kprog(T, K.Umami + 2.0, K.Umami + 2.6, kEase.rebote)) * 700})`}>
            <Tazon x={330} y={1060} s={0.95} T={T} vapor={1} />
            <Jitomate x={770} y={1050} s={0.85} rot={Math.sin(T * 2) * 4} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Umami + 1.4} until={K.Umami + 3.0} texto="no estaba en el mapa" x={370} y={430} tam={42} borde={KC.red} />
        <Chip T={T} at={K.Umami + 3.0} until={K.Diferencias - 0.1} texto="umami" x={540} y={900} tam={58} borde={KC.orange} />
        <Etq T={T} at={K.Umami + 3.2} until={K.Diferencias - 0.2} x={330} y={1195} texto="caldo" lado="izq" tam={30} />
        <Etq T={T} at={K.Umami + 3.6} until={K.Diferencias - 0.2} x={770} y={1195} texto="jitomate maduro" lado="izq" tam={30} />
      </Escena>
      {/* 9 · las diferencias son pequeñitas */}
      <Escena T={T} a={K.Diferencias} b={K.Cierre}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {[['punta', 0.8], ['lado izquierdo', 0.84], ['lado derecho', 0.82], ['atrás', 0.78]].map(([et, v], i) =>
            <g key={i} opacity={kprog(T, K.Diferencias + 0.2 + i * 0.25, K.Diferencias + 0.5 + i * 0.25)}>
              <BarraH x={140} y={580 + i * 150} ancho={800} v={v * kprog(T, K.Diferencias + 0.3 + i * 0.25, K.Diferencias + 1.5 + i * 0.25, kEase.sale)} color={[SAB.dulce, SAB.salado, SAB.acido, SAB.amargo][i]} etiqueta={et} />
            </g>)}
          {(() => { const o = kprog(T, K.Diferencias + 2.0, K.Diferencias + 2.4); const xs = [140 + 800 * 0.78, 140 + 800 * 0.84];
            return <g opacity={o}><line x1={xs[0]} y1={540} x2={xs[0]} y2={1080} stroke={KC.red} strokeWidth={6} strokeDasharray="12 8" />
              <line x1={xs[1]} y1={540} x2={xs[1]} y2={1080} stroke={KC.red} strokeWidth={6} strokeDasharray="12 8" />
              <path d={`M ${xs[0]} 1100 L ${xs[1]} 1100`} stroke={KC.red} strokeWidth={8} /><circle cx={(xs[0] + xs[1]) / 2} cy={1100} r={60 + 6 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={7} /></g>; })()}
          <text x={540} y={1190} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>(barras ilustrativas)</text>
        </Lienzo>
        <Chip T={T} at={K.Diferencias + 2.0} until={K.Cierre - 0.1} texto="sí existen, pero pequeñitas" x={540} y={430} tam={42} borde={KC.red} />
      </Escena>
      {/* 10 · cierre: el mismo mapa, sin fronteras, toda la lengua encendida */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Poster x={380} y={790} s={0.88} titulo="TU LENGUA">
            <Lengua id="c" x={0} y={50} s={0.78} T={T} papilas={kprog(T, K.Cierre + 0.8, K.Cierre + 1.8)}
              mapa={1 - kprog(T, K.Cierre + 0.4, K.Cierre + 1.8)} etiquetas={1 - kprog(T, K.Cierre + 0.2, K.Cierre + 0.8)}
              fronteras={1 - kprog(T, K.Cierre + 0.2, K.Cierre + 1.2)} brillo={kprog(T, K.Cierre + 1.4, K.Cierre + 2.4)} />
          </Poster>
          <g opacity={1 - kprog(T, K.Cierre + 0.2, K.Cierre + 0.8)}><Sello T={T} at={K.Cierre - 1} x={380} y={810} /></g>
          {/* goma que borra las fronteras */}
          {(() => { const f = kprog(T, K.Cierre + 0.2, K.Cierre + 1.3); if (f <= 0 || f >= 1) return null;
            const gx = 380 + Math.sin(f * Math.PI * 6) * 150, gy = klerp(560, 1000, f);
            return <g transform={`translate(${gx} ${gy}) rotate(-25)`}><rect x={-60} y={-34} width={120} height={68} rx={12} fill="#ff9fb0" stroke={KC.ink} strokeWidth={7} /><rect x={10} y={-34} width={50} height={68} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={7} /></g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.0} until={K.Outro - 0.1} texto="toda ella prueba de todo" x={400} y={330} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Prueba - 0.1} texto="Ese mapa de la lengua *está mal.*" />
      <Subtitulo T={T} idx={1} at={K.Prueba + 0.1} until={K.Papilas - 0.1} texto="Azúcar en un lado: *se siente dulce.*" />
      <Subtitulo T={T} idx={2} at={K.Papilas + 0.1} until={K.Todos - 0.1} texto="Papilas *por toda la lengua.*" />
      <Subtitulo T={T} idx={3} at={K.Todos + 0.1} until={K.Pregunta - 0.1} texto="Detectan *los cinco sabores.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Hanig - 0.1} texto="¿De dónde *salió el mapa?*" />
      <Subtitulo T={T} idx={5} at={K.Hanig + 0.1} until={K.Boring - 0.1} texto="1901: *un poco* más sensibles." />
      <Subtitulo T={T} idx={6} at={K.Boring + 0.1} until={K.Libros - 0.1} texto="1942: una gráfica *que exagera.*" />
      <Subtitulo T={T} idx={7} at={K.Libros + 0.1} until={K.Umami - 0.1} texto="Los libros: *zonas separadas.*" />
      <Subtitulo T={T} idx={8} at={K.Umami + 0.1} until={K.Diferencias - 0.1} texto="Sin *umami* en el mapa." />
      <Subtitulo T={T} idx={9} at={K.Diferencias + 0.1} until={K.Cierre - 0.1} texto="Diferencias *pequeñitas.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Toda ella *prueba de todo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_10_serio_molesto', 'gancho'],
        [K.Prueba + 2.6, K.Papilas - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Papilas + 3.0, K.Todos + 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Hanig + 0.15, 'avatar_07_pensativo_puno', 'grande'],
        [K.Hanig + 3.2, K.Boring - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Boring + 3.0, K.Libros - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Umami + 0.4, K.Umami + 4.6, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Diferencias + 0.5, K.Cierre - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="17" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function LenguaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Lengua17 /></CompositionStage></div>;
}
window.LenguaApp = LenguaApp;
