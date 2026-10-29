// Shot Científico #21 · El hipo: tu diafragma con un tic — NARRADO (N1 "Por dentro": pecho en corte, diafragma y glotis + N2 el récord).
// Datos: MedlinePlus y Cleveland Clinic (hipo, diafragma, glotis), Straus et al. 2003 y Howes 2012 (BioEssays, hipótesis),
// Guinness World Records (Charles Osborne). Ver guion.md y verificacion.md. Dibujo esquemático: órganos y tamaños no van a escala.
const HP = { pulmon:'#ff8fab', traquea:'#f6c9d3', cart:'#f3dcae', musculo:'#d63b3b', panza:'#f4c48e', dentro:'#3b1626', higado:'#a8463c', estomago:'#f59a9a', aire:KC.cyan };
const HTORSO = 'M -95 -268 C -190 -262 -248 -238 -255 -170 L -238 300 C -120 332 120 332 238 300 L 255 -170 C 248 -238 190 -262 95 -268 Z';
const HCUELLO = 'M -50 -372 L -50 -255 L 50 -255 L 50 -372 Z';
// Punto local del cuerpo → pantalla.
const cp = (C, lx, ly) => [C.x + lx * C.s, C.y + ly * C.s];
// Sacudida de hipo: 1 justo en t y se apaga.
const sacude = (T, ts, k = 6) => Math.min(1, ts.reduce((a, t) => a + (T >= t ? Math.exp(-(T - t) * k) : 0), 0));

// Persona de frente. (x, y) = centro del pecho. dentro 0..1 deja ver por dentro (pulmones, diafragma, laringe con la glotis).
// baja 0..1 = el diafragma se contrae y baja · cierra 0..1 = la glotis se cierra · boca 0..1 · lleno 0..1 = estómago inflado.
function Cuerpo({ x = 0, y = 0, s = 1, uid = 'c', dentro = 0, baja = 0, cierra = 0, boca = 0, cara = 'normal', camisa = KC.yellow, glowD = 0, glowG = 0, lleno = 0, salto = 0 }) {
  const yP = 95 + 70 * baja, ctrl = 2 * yP - 175, gap = 2 + 20 * (1 - cierra), pul = 1 + 0.07 * baja;
  const diaf = `M -262 175 Q 0 ${ctrl} 262 175`;
  const sorpresa = boca > 0.3;
  return <g transform={`translate(${x} ${y - salto}) scale(${s})`}>
    <rect x={-215} y={280} width={200} height={640} rx={40} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <rect x={15} y={280} width={200} height={640} rx={40} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <g transform="rotate(6 -279 -215)"><rect x={-318} y={-235} width={78} height={470} rx={39} fill={camisa} stroke={KC.ink} strokeWidth={9} /></g>
    <g transform="rotate(-6 279 -215)"><rect x={240} y={-235} width={78} height={470} rx={39} fill={camisa} stroke={KC.ink} strokeWidth={9} /></g>
    <circle cx={-326} cy={250} r={42} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <circle cx={326} cy={250} r={42} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d={HCUELLO} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <path d={HTORSO} fill={camisa} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {dentro > 0.01 && <g opacity={dentro}>
      <clipPath id={`hcl${uid}`}><path d={HTORSO} /><path d={HCUELLO} /></clipPath>
      <g clipPath={`url(#hcl${uid})`}>
        <rect x={-300} y={-400} width={600} height={760} fill={HP.dentro} />
        {[1, -1].map((k) => <path key={k} transform={`scale(${k} 1) translate(0 -215) scale(${pul}) translate(0 215)`}
          d="M -40 -215 C -100 -250 -215 -215 -225 -90 C -232 10 -228 120 -215 205 L -35 205 C -45 80 -30 -80 -40 -215 Z" fill={HP.pulmon} stroke={KC.ink} strokeWidth={7} />)}
        {[1, -1].map((k) => <g key={k} transform={`scale(${k} 1)`}>{[0, 1, 2].map((i) => <path key={i} d={`M -${70 + i * 40} ${-120 + i * 70} q -30 20 -60 10`} fill="none" stroke="#e2667f" strokeWidth={5} strokeLinecap="round" />)}</g>)}
        <path d="M 0 -125 L -95 -55 M 0 -125 L 95 -55" stroke={KC.ink} strokeWidth={32} strokeLinecap="round" fill="none" />
        <path d="M 0 -125 L -95 -55 M 0 -125 L 95 -55" stroke={HP.traquea} strokeWidth={20} strokeLinecap="round" fill="none" />
        <rect x={-21} y={-292} width={42} height={175} fill={HP.traquea} stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-19} y1={-276 + i * 18} x2={19} y2={-276 + i * 18} stroke="#d58b9c" strokeWidth={5} />)}
        <path d={`M -275 175 Q 0 ${ctrl} 275 175 L 275 380 L -275 380 Z`} fill={HP.panza} />
        <ellipse cx={-125} cy={238} rx={118} ry={58} fill={HP.higado} stroke={KC.ink} strokeWidth={6} />
        <g transform={`translate(125 238) scale(${1 + 0.35 * lleno}) translate(-125 -238)`}>
          <path d="M 70 192 C 130 160 210 182 205 242 C 200 302 108 312 76 272 C 56 246 46 208 70 192 Z" fill={HP.estomago} stroke={KC.ink} strokeWidth={6} /></g>
        {glowD > 0.01 && <path d={diaf} fill="none" stroke={KC.yellow} strokeWidth={56} strokeLinecap="round" opacity={glowD * 0.55} />}
        <path d={diaf} fill="none" stroke={KC.ink} strokeWidth={32} strokeLinecap="round" />
        <path d={diaf} fill="none" stroke={HP.musculo} strokeWidth={20} strokeLinecap="round" />
        {[-150, -75, 0, 75, 150].map((xx) => { const t = (xx + 262) / 524, yy = (1 - t) * (1 - t) * 175 + 2 * t * (1 - t) * ctrl + t * t * 175;
          return <line key={xx} x1={xx - 8} y1={yy - 6} x2={xx + 8} y2={yy + 6} stroke="#8e1f22" strokeWidth={4} />; })}
        {/* laringe con la glotis: la puerta entre las cuerdas vocales */}
        <rect x={-52} y={-356} width={104} height={66} rx={22} fill={HP.cart} stroke={KC.ink} strokeWidth={7} />
        <rect x={-25} y={-356} width={50} height={66} fill="#5a1f2a" />
        <path d={`M -25 -342 L -25 -298 L ${-gap} -318 Z`} fill="#fbe3ea" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d={`M 25 -342 L 25 -298 L ${gap} -318 Z`} fill="#fbe3ea" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      </g>
      {glowG > 0.01 && <circle cx={0} cy={-322} r={52} fill="none" stroke={KC.yellow} strokeWidth={9} opacity={glowG} />}
      <path d={HTORSO} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <path d={HCUELLO} fill="none" stroke={KC.ink} strokeWidth={9} />
    </g>}
    <circle cx={-112} cy={-462} r={24} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={112} cy={-462} r={24} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-472} r={112} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -112 -470 Q -118 -590 0 -588 Q 118 -590 112 -470 Q 70 -540 -112 -470 Z" fill={CPELO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {sorpresa ? <>{[-38, 38].map((ex) => <g key={ex}><circle cx={ex} cy={-478} r={15} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={ex} cy={-478} r={6} fill={KC.ink} /></g>)}
      <path d="M -60 -512 Q -38 -526 -18 -514 M 18 -514 Q 38 -526 60 -512" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /></>
      : <><circle cx={-38} cy={-478} r={9} fill={KC.ink} /><circle cx={38} cy={-478} r={9} fill={KC.ink} />
        <path d="M -58 -505 L -20 -502 M 20 -502 L 58 -505" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /></>}
    {boca > 0.05 ? <ellipse cx={0} cy={-420} rx={15} ry={6 + 16 * boca} fill="#5a1f22" stroke={KC.ink} strokeWidth={6} />
      : <path d={cara === 'sonrie' ? 'M -26 -428 Q 0 -404 26 -428' : 'M -20 -422 L 20 -422'} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
    {dentro > 0.01 && <rect x={-16} y={-412} width={32} height={58} rx={14} fill="#5a1f2a" opacity={dentro * 0.75} />}
  </g>;
}
// Aire (puntitos cian) que baja desde la boca hasta `hasta` (y local). p = intensidad.
function AireBaja({ C, T, p = 1, hasta = -340, n = 9, vel = 1.3 }) {
  if (p <= 0.01) return null;
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const f = ((T * vel + i / n) % 1), e = 1 - Math.pow(1 - f, 2);
    const [x, y] = cp(C, Math.sin(i * 2.3 + T * 3) * 9, klerp(-430, hasta, e));
    return <circle key={i} cx={x} cy={y} r={7 + 4 * C.s * (1 - f)} fill={HP.aire} stroke={KC.ink} strokeWidth={3} opacity={f > 0.85 ? (1 - f) / 0.15 : 1} />; })}</g>;
}
// Las cuerdas vocales vistas desde arriba (dentro de la Lupa): la glotis es el hueco en V entre ellas.
function Pliegues({ r, cierra = 0, T = 0, aire = 0 }) {
  const cx = r, cy = r + 10, w = 4 + 78 * (1 - cierra);
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#b9506a" />
    <circle cx={cx} cy={cy} r={r * 0.95} fill="#cc6680" />
    <path d={`M ${cx - 150} ${cy - 150} Q ${cx} ${cy - 235} ${cx + 150} ${cy - 150} Q ${cx} ${cy - 185} ${cx - 150} ${cy - 150} Z`} fill="#e98aa0" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${cx} ${cy - 140} L ${cx - w} ${cy + 120} L ${cx + w} ${cy + 120} Z`} fill="#170a0f" />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${cx - w * 0.55} ${cy + 40 + i * 26} Q ${cx} ${cy + 26 + i * 26} ${cx + w * 0.55} ${cy + 40 + i * 26}`} stroke="#7a3446" strokeWidth={4} fill="none" opacity={kclamp((w - 12) / 40, 0, 1)} />)}
    {[1, -1].map((k) => <path key={k} transform={`translate(${cx} 0) scale(${k} 1) translate(${-cx} 0)`} d={`M ${cx - 3} ${cy - 142} L ${cx - w - 46} ${cy + 124} L ${cx - w} ${cy + 124} Z`} fill="#f7eef0" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    <ellipse cx={cx - w - 30} cy={cy + 152} rx={50} ry={32} fill="#e98aa0" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={cx + w + 30} cy={cy + 152} rx={50} ry={32} fill="#e98aa0" stroke={KC.ink} strokeWidth={5} />
    {aire > 0.01 && Array.from({ length: 7 }, (_, i) => { const f = ((T * 1.4 + i / 7) % 1);
      return <circle key={i} cx={cx + Math.sin(i * 2.1) * 60} cy={cy - 30} r={10 + 30 * f} fill="none" stroke={HP.aire} strokeWidth={6} opacity={aire * (1 - f)} />; })}
  </svg>;
}
function Renacuajo({ x, y, s = 1, T = 0 }) {
  const top = [], bot = [];
  for (let i = 0; i <= 14; i++) { const f = i / 14, xx = -55 - f * 190, yy = Math.sin(T * 9 - f * 4) * 28 * f, w = 34 * (1 - f) + 3;
    top.push(`${xx.toFixed(1)},${(yy - w).toFixed(1)}`); bot.unshift(`${xx.toFixed(1)},${(yy + w).toFixed(1)}`); }
  const branq = (k) => <g transform={`scale(1 ${k})`}>{[0, 1, 2].map((i) => { const bx = -10 + i * 22, a = -55 - i * 12 + Math.sin(T * 5 + i) * 6;
    return <g key={i} transform={`translate(${bx} -40) rotate(${a + 90})`}><line x1={0} y1={0} x2={0} y2={-58} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><line x1={0} y1={0} x2={0} y2={-58} stroke="#ff6f96" strokeWidth={6} strokeLinecap="round" />
      {[14, 28, 42].map((d) => <path key={d} d={`M 0 ${-d} l -12 -10 M 0 ${-d} l 12 -10`} stroke="#ff6f96" strokeWidth={4} strokeLinecap="round" />)}</g>; })}</g>;
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 10}) scale(${s})`}>
    <polygon points={[...top, ...bot].join(' ')} fill="#6c7a3a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {branq(1)}{branq(-1)}
    <ellipse cx={0} cy={0} rx={78} ry={56} fill="#55632a" stroke={KC.ink} strokeWidth={8} />
    <circle cx={44} cy={-16} r={15} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={49} cy={-16} r={6} fill={KC.ink} />
    <path d="M 62 18 Q 70 24 76 16" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Bebé de frente tomando leche (biberón desde la izquierda); panza en corte con el estómago y una burbuja de aire.
function Bebe({ x, y, s = 1, T = 0, burbuja = 0, mama = 1 }) {
  const by = klerp(80, -150, kEase.suave(kclamp(burbuja, 0, 1)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-20} width={240} height={250} rx={90} fill="#bfe7ff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-175} y={0} width={70} height={150} rx={35} fill="#bfe7ff" stroke={KC.ink} strokeWidth={8} transform="rotate(20 -140 10)" />
    <rect x={105} y={0} width={70} height={150} rx={35} fill="#bfe7ff" stroke={KC.ink} strokeWidth={8} transform="rotate(-20 140 10)" />
    <circle cx={0} cy={95} r={78} fill={HP.dentro} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 70 C 0 40 60 55 55 105 C 50 150 -10 155 -35 125 C -50 105 -55 82 -40 70 Z" fill={HP.estomago} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 112 C -10 104 30 116 53 106 C 48 148 -10 154 -34 126 Z" fill="#fffaf0" opacity=".95" />
    <circle cx={-118} cy={-170} r={30} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={118} cy={-170} r={30} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-170} r={125} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -10 -295 q 20 -30 30 0" stroke={CPELO} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -55 -185 q 15 -12 30 0 M 25 -185 q 15 -12 30 0" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <circle cx={-70} cy={-140} r={18} fill="#ff9aa2" opacity=".6" /><circle cx={70} cy={-140} r={18} fill="#ff9aa2" opacity=".6" />
    <circle cx={0} cy={-108} r={13} fill="#5a1f22" stroke={KC.ink} strokeWidth={5} />
    {mama > 0.01 && <g opacity={mama} transform={`translate(-20 -112) rotate(${-38 + Math.sin(T * 6) * 3})`}>
      <path d="M 0 0 q -8 -14 -20 -10 l -14 0 q -10 -2 -10 10 q 0 12 10 10 l 14 0 q 12 4 20 -10 z" fill="#e7b25b" stroke={KC.ink} strokeWidth={5} transform="translate(-6 0)" />
      <rect x={-250} y={-40} width={200} height={80} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={8} />
      <rect x={-244} y={-34} width={150} height={68} rx={20} fill="#fffaf0" />
      <rect x={-60} y={-30} width={22} height={60} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    </g>}
    {burbuja > 0 && burbuja < 1.15 && <g opacity={1 - kprog(burbuja, 0.95, 1.15)}><circle cx={18 * Math.sin(burbuja * 9)} cy={by} r={24} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={5} /><circle cx={18 * Math.sin(burbuja * 9) - 8} cy={by - 8} r={6} fill="#fff" /></g>}
  </g>;
}
function Calendario({ x, y, n, cambio, T, etiqueta = 'años' }) {
  const flap = kprog(T, cambio, cambio + 0.12);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-160} width={300} height={330} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-160} width={300} height={80} rx={22} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-80, 0, 80].map((xx) => <rect key={xx} x={xx - 9} y={-185} width={18} height={50} rx={9} fill="#888" stroke={KC.ink} strokeWidth={5} />)}
    <text x={0} y={70} textAnchor="middle" transform={`translate(0 20) scale(${1.18 - 0.18 * flap}) translate(0 -20)`} style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{n}</text>
    <text x={0} y={135} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
function Reloj({ x, y, r = 190, vueltas = 0 }) {
  const a = vueltas * Math.PI * 2;
  return <g>
    <circle cx={x} cy={y} r={r + 14} fill={KC.paper} stroke={KC.ink} strokeWidth={12} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={x + Math.sin(i * Math.PI / 6) * (r - 6)} y1={y - Math.cos(i * Math.PI / 6) * (r - 6)} x2={x + Math.sin(i * Math.PI / 6) * (r - 34)} y2={y - Math.cos(i * Math.PI / 6) * (r - 34)} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 10} />)}
    <line x1={x} y1={y} x2={x + Math.sin(a / 12) * (r * 0.5)} y2={y - Math.cos(a / 12) * (r * 0.5)} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <line x1={x} y1={y} x2={x + Math.sin(a) * (r - 40)} y2={y - Math.cos(a) * (r - 40)} stroke={KC.pink} strokeWidth={10} strokeLinecap="round" />
    <circle cx={x} cy={y} r={18} fill={KC.ink} />
  </g>;
}
function Maletin({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -110 L -50 -140 Q -50 -160 -30 -160 L 30 -160 Q 50 -160 50 -140 L 50 -110" fill="none" stroke={KC.ink} strokeWidth={16} />
    <rect x={-150} y={-115} width={300} height={210} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <rect x={-22} y={-75} width={44} height={130} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <rect x={-65} y={-32} width={130} height={44} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tarjeta de causa (dentro de svg): icono a la izquierda y texto.
function Causa({ T, at, y, texto, children }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote);
  return <g transform={`translate(540 ${y}) scale(${klerp(0.5, 1, e)}) translate(-540 ${-y})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={110} y={y - 112} width={860} height={224} rx={36} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <g transform={`translate(260 ${y})`}>{children}</g>
    <text x={420} y={y + 18} style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Etiqueta de varias líneas con línea punteada al punto (px, py) (dentro de svg).
function NotaSvg({ T, at, until, px, py, x, y, lineas, ancho = 440, color = KC.gold2 }) {
  if (T < at || T > until + 0.4) return null;
  const o = kprog(T, at, at + 0.3) * (1 - kprog(T, until, until + 0.35)), d = kprog(T, at, at + 0.5, kEase.sale);
  const alto = 30 + lineas.length * 46;
  return <g opacity={o}>
    <line x1={px} y1={py} x2={klerp(px, x, d)} y2={klerp(py, y + 20, d)} stroke={color} strokeWidth={6} strokeDasharray="14 10" strokeLinecap="round" />
    <circle cx={px} cy={py} r={10} fill={color} />
    <rect x={x} y={y - 6} width={ancho} height={alto} rx={22} fill="rgba(14,15,18,.88)" stroke={color} strokeWidth={5} />
    {lineas.map((l, i) => <text key={i} x={x + 24} y={y + 38 + i * 46} style={{ font:`${i === 0 ? 900 : 700} ${i === 0 ? 40 : 34}px ${i === 0 ? KF.texto : KF.mono}` }} fill={i === 0 ? color : KC.texto}>{l}</text>)}
  </g>;
}

function Hipo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho y cierre: la misma persona, con hipos
  const HG = [0.25, 2.6, 5.0].map((t) => K.Gancho + t), HC = [0.5, 2.7].map((t) => K.Cierre + t);
  const CG = { x: 380, y: 1000, s: 0.9 };
  const jG = sacude(T, HG), jC = sacude(T, HC);
  // por dentro (Espasmo → Sonido): una sola escena, la cámara baja del pecho a la laringe
  const tE = K.Espasmo + 0.9, tCierra = K.Glotis + 3.9, tHip = K.Sonido + 0.9;
  const cam = kprog(T, K.Glotis - 0.2, K.Glotis + 1.1, kEase.suave);
  const CI = { x: klerp(540, 360, cam), y: klerp(950, 1453, cam), s: klerp(1.35, 2.2, cam) };
  const bajaE = kprog(T, tE, tE + 0.12) * (1 - kprog(T, tE + 0.9, tE + 2.2)) + kprog(T, tCierra - 0.25, tCierra - 0.1) * (1 - kprog(T, tCierra + 0.6, tCierra + 1.6));
  const cierraI = kprog(T, tCierra, tCierra + 0.08) * (1 - kprog(T, K.Sonido + 2.6, K.Sonido + 3.0));
  const LAR = cp(CI, 0, -322);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: ¡HIP! y salta; no es solo la garganta: es un músculo bajo los pulmones */}
      <Escena T={T} a={K.Gancho} b={K.Diafragma}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Cuerpo x={CG.x} y={CG.y} s={CG.s} uid="g" salto={jG * 45} boca={jG} camisa={KC.yellow}
            dentro={kprog(T, K.Gancho + 3.6, K.Gancho + 4.4)} baja={sacude(T, [HG[2]], 4)} glowD={kprog(T, K.Gancho + 4.0, K.Gancho + 4.5) * (0.6 + 0.4 * Math.sin(T * 8))} />
          {T > K.Gancho + 1.8 && T < K.Gancho + 3.6 && <circle cx={CG.x} cy={CG.y - 0.9 * 310} r={60 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="16 10" opacity={kprog(T, K.Gancho + 1.8, K.Gancho + 2.1)} />}
          {HG.map((t, i) => <Onomato key={i} T={T} at={t} dur={1.3} x={i % 2 ? 300 : 380} y={410} texto="¡HIP!" tam={150} color={KC.yellow} rot={i % 2 ? 7 : -8} />)}
        </Lienzo>
        <Etq T={T} at={K.Gancho + 1.9} until={K.Gancho + 3.5} x={CG.x - 70} y={CG.y - 0.9 * 310} texto="¿garganta?" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Gancho + 4.0} until={K.Diafragma - 0.1} x={CG.x + 250} y={CG.y + 0.9 * 110} texto="un músculo" lado="der" color={KC.yellow} />
      </Escena>
      {/* 1 · el diafragma: con él respiras */}
      <Escena T={T} a={K.Diafragma} b={K.Espasmo}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Cuerpo x={300} y={CG.y} s={CG.s} uid="d" dentro={1} camisa={KC.yellow} baja={0.5 + 0.5 * Math.sin((T - K.Diafragma) * 2.6 - 1.57)} glowD={0.5} />
        </Lienzo>
        <Lupa T={T} at={K.Diafragma + 0.2} until={K.Espasmo - 0.25} x={760} y={690} r={250} fx={300} fy={CG.y + 0.9 * 120} tinte={KC.yellow} etiqueta="POR DENTRO · PECHO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a0d14" />
            <g transform={`translate(${r} ${r - 20}) scale(1.15)`}><Cuerpo uid="dl" dentro={1} camisa={KC.yellow} baja={0.5 + 0.5 * Math.sin((t - K.Diafragma) * 2.6 - 1.57)} /></g>
            <text x={r} y={r * 2 - 40} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">diafragma</text>
            <text x={r - 120} y={r - 10} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">pulmón</text>
            <text x={r + 120} y={r - 10} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">pulmón</text></svg>} />
        <Chip T={T} at={K.Diafragma + 0.9} until={K.Espasmo - 0.2} texto="con él respiras" x={760} y={1140} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 2–4 · por dentro: el diafragma baja de golpe, entra aire, la glotis se cierra y suena el hip */}
      <Escena T={T} a={K.Espasmo} b={K.Causas} fondo={KC.noche} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Cuerpo x={CI.x} y={CI.y} s={CI.s} uid="i" dentro={1} camisa="#6b7a99" baja={bajaE} cierra={cierraI} boca={T > tE && T < tE + 1.5 ? 0.7 : (T > tHip - 0.3 && T < tHip + 0.8 ? 0.5 : 0)}
            glowD={kprog(T, tE, tE + 0.1) * (1 - kprog(T, tE + 1.2, tE + 2))} glowG={kprog(T, tCierra, tCierra + 0.1) * (1 - kprog(T, K.Sonido + 2.2, K.Sonido + 2.8))} />
          <AireBaja C={CI} T={T} p={kprog(T, tE + 0.3, tE + 0.6) * (1 - kprog(T, K.Glotis + 0.4, K.Glotis + 1.0))} hasta={-90} n={11} />
          <AireBaja C={CI} T={T} p={kprog(T, K.Sonido + 0.1, K.Sonido + 0.4) * (1 - kprog(T, K.Causas - 0.6, K.Causas))} hasta={-345} n={8} vel={1.8} />
          {T < K.Glotis && <FlechaRecta x1={230} y1={300} x2={470} y2={CI.y - CI.s * 425} p={kprog(T, tE + 0.4, tE + 0.8, kEase.sale) * (1 - kprog(T, K.Glotis - 0.6, K.Glotis - 0.2))} color={HP.aire} grosor={14} />}
          {T < K.Glotis && <FlechaRecta x1={540} y1={CI.y + CI.s * 60} x2={540} y2={CI.y + CI.s * 165} p={kprog(T, tE, tE + 0.15) * (1 - kprog(T, tE + 1.4, tE + 1.8))} color={KC.yellow} grosor={12} punta={28} />}
          <Onomato T={T} at={tE} dur={1.0} x={830} y={1120} texto="¡TIC!" tam={110} color={KC.yellow} rot={6} />
          {T > tHip && T < K.Causas && <><OndasArco x={LAR[0] + 60} y={LAR[1]} ang={0} T={T} color={KC.yellow} largo={300} o={1 - kprog(T, K.Causas - 0.6, K.Causas)} />
            <OndasArco x={LAR[0] - 60} y={LAR[1]} ang={180} T={T} color={KC.yellow} largo={220} o={1 - kprog(T, K.Causas - 0.6, K.Causas)} /></>}
          <Onomato T={T} at={tHip} dur={2.2} x={780} y={600} texto="¡HIP!" tam={190} color={KC.yellow} rot={-6} />
          {T > tCierra && T < tCierra + 0.25 && <circle cx={LAR[0]} cy={LAR[1]} r={60 + 400 * (T - tCierra)} fill="none" stroke="#fff" strokeWidth={8} opacity={1 - (T - tCierra) * 4} />}
          <NotaSvg T={T} at={K.Glotis + 1.4} until={K.Sonido - 0.15} px={LAR[0] + 30} py={LAR[1] + 8} x={590} y={985} ancho={450} lineas={['glotis', 'la puerta entre', 'tus cuerdas vocales']} />
        </Lienzo>
        <Etq T={T} at={K.Espasmo + 0.3} until={K.Glotis - 0.3} x={CI.x + CI.s * 70} y={CI.y + CI.s * 125} texto="diafragma" lado="der" color={KC.yellow} />
        <Etq T={T} at={tE + 0.6} until={K.Glotis - 0.3} x={CI.x - CI.s * 90} y={CI.y - CI.s * 40} texto="pulmón" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Glotis + 1.0} until={K.Sonido - 0.15} x={LAR[0] - 130} y={LAR[1]} texto="laringe" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Glotis + 1.2} until={K.Sonido - 0.15} x={LAR[0] - 70} y={LAR[1] + 230} texto="tráquea" lado="izq" color={KC.texto} />
        <Lupa T={T} at={K.Glotis + 0.6} until={K.Sonido - 0.2} x={800} y={640} r={225} fx={LAR[0]} fy={LAR[1]} tinte={KC.gold2} etiqueta="POR DENTRO · LARINGE"
          interior={(t, r) => <Pliegues r={r} T={t} cierra={kprog(t, tCierra, tCierra + 0.08)} />} />
      </Escena>
      {/* 5 · qué lo dispara */}
      <Escena T={T} a={K.Causas} b={K.Pregunta}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Causa T={T} at={K.Causas + 0.7} y={540} texto="comer muy rápido">
            <ellipse cx={0} cy={45} rx={115} ry={36} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <path d="M -70 40 Q -40 -10 0 0 Q 40 -15 70 40 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
            <g transform={`translate(70 ${-60 - 34 * Math.abs(Math.sin(T * 16))}) rotate(25)`}><rect x={-7} y={-20} width={14} height={110} rx={6} fill="#bbb" stroke={KC.ink} strokeWidth={5} />
              {[-12, 0, 12].map((xx) => <rect key={xx} x={xx - 3} y={-60} width={6} height={44} fill="#bbb" stroke={KC.ink} strokeWidth={3} />)}</g>
            {[0, 1, 2].map((i) => <line key={i} x1={-120} y1={-40 + i * 25} x2={-150} y2={-40 + i * 25} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" opacity={0.5 + 0.5 * Math.sin(T * 20 + i)} />)}
          </Causa>
          <Causa T={T} at={K.Causas + 2.0} y={800} texto="bebidas con gas">
            <path d="M -60 -90 L 60 -90 L 48 90 L -48 90 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
            <path d="M -55 -50 L 55 -50 L 48 84 L -48 84 Z" fill="#7a3b1c" />
            {Array.from({ length: 9 }, (_, i) => { const f = ((T * 0.9 + i / 9) % 1); return <circle key={i} cx={-35 + (i * 23) % 70} cy={80 - f * 128} r={5 + (i % 3) * 2} fill="#fff" opacity={0.9 - f * 0.5} />; })}
            <rect x={14} y={-140} width={14} height={110} rx={6} fill={KC.pink} stroke={KC.ink} strokeWidth={4} transform="rotate(14 21 -85)" />
          </Causa>
          <Causa T={T} at={K.Causas + 3.3} y={1060} texto="estómago muy lleno">
            <g transform={`scale(${1 + 0.12 * kprog(T, K.Causas + 3.5, K.Causas + 4.3, kEase.rebote) + 0.03 * Math.sin(T * 7)})`}>
              <path d="M -60 -70 C 20 -110 120 -70 110 10 C 100 100 -20 115 -65 55 C -95 15 -100 -50 -60 -70 Z" fill={HP.estomago} stroke={KC.ink} strokeWidth={7} />
              <path d="M -80 -100 L -60 -70" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
              <path d="M -50 20 C 0 0 60 30 100 10 C 95 80 -10 100 -50 50 Z" fill={KC.orange} opacity=".8" />
            </g>
          </Causa>
        </Lienzo>
      </Escena>
      {/* 6 · ¿para qué sirve? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Hipotesis} />
      {/* 7 · hipótesis 1: las branquias de los renacuajos */}
      <Escena T={T} a={K.Hipotesis} b={K.Bebes}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {T > K.Hipotesis + 2.6 && <g opacity={kprog(T, K.Hipotesis + 2.6, K.Hipotesis + 3.0)} transform={`translate(330 830) scale(${klerp(0.5, 1, kprog(T, K.Hipotesis + 2.6, K.Hipotesis + 3.1, kEase.rebote))}) translate(-330 -830)`}>
            <circle cx={330} cy={830} r={240} fill="#7fd4f2" stroke={KC.ink} strokeWidth={10} />
            {Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.4 + i / 6) % 1); return <circle key={i} cx={210 + i * 45} cy={1010 - f * 340} r={8 + i % 3 * 3} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - f} />; })}
            <Renacuajo x={370} y={840} s={1.05} T={T} />
          </g>}
          {T > K.Hipotesis + 4.6 && <g>
            <path d="M 560 760 Q 640 640 700 760" fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={-T * 40} opacity={kprog(T, K.Hipotesis + 4.6, K.Hipotesis + 5.0)} />
            <TextoSvg x={630} y={640} tam={80} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Hipotesis + 4.8, K.Hipotesis + 5.2, kEase.rebote))}>?</TextoSvg>
          </g>}
          {T > K.Hipotesis + 4.4 && <g opacity={kprog(T, K.Hipotesis + 4.4, K.Hipotesis + 4.8)}>
            <Cuerpo x={830} y={1000} s={0.5} uid="h" dentro={1} camisa={KC.pink} baja={sacude(T, [K.Hipotesis + 5.4, K.Hipotesis + 7.0])} cierra={sacude(T, [K.Hipotesis + 5.45, K.Hipotesis + 7.05], 4)} boca={sacude(T, [K.Hipotesis + 5.4, K.Hipotesis + 7.0])} salto={sacude(T, [K.Hipotesis + 5.4, K.Hipotesis + 7.0]) * 20} /></g>}
          {T < K.Hipotesis + 2.6 && <TextoSvg x={540} y={900} tam={260} color={KC.paper} rot={Math.sin(T * 3) * 4} s={klerp(0.6, 1, kprog(T, K.Hipotesis + 0.1, K.Hipotesis + 0.5, kEase.rebote))} o={1 - kprog(T, K.Hipotesis + 2.2, K.Hipotesis + 2.6)}>¿ ?</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Hipotesis + 0.2} until={K.Hipotesis + 2.1} texto="nadie lo sabe con certeza" x={540} y={460} tam={44} borde={KC.ink} />
        <Chip T={T} at={K.Hipotesis + 2.3} until={K.Bebes - 0.1} texto="hipótesis" x={540} y={460} tam={52} borde={KC.lilac} />
        <Etq T={T} at={K.Hipotesis + 5.6} until={K.Bebes - 0.2} x={385} y={935} texto="branquias" lado="der" color={KC.ink} />
      </Escena>
      {/* 8 · hipótesis 2: sacar el aire que traga el bebé */}
      <Escena T={T} a={K.Bebes} b={K.Record}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Bebe x={500} y={820} s={1.15} T={T} burbuja={kprog(T, K.Bebes + 2.0, K.Bebes + 3.2)} mama={1 - kprog(T, K.Bebes + 1.7, K.Bebes + 2.0)} />
          {T > K.Bebes + 1.9 && <path d={`M 500 ${820 + 1.15 * 80} L 500 ${820 - 1.15 * 110}`} stroke="#fff" strokeWidth={6} strokeDasharray="10 12" opacity={0.7 * (1 - kprog(T, K.Bebes + 3.2, K.Bebes + 3.6))} />}
          <Onomato T={T} at={K.Bebes + 3.15} dur={0.9} x={680} y={640} texto="¡HIP!" tam={110} color={KC.yellow} rot={8} />
        </Lienzo>
        <Chip T={T} at={K.Bebes + 0.2} until={K.Record - 0.1} texto="hipótesis" x={540} y={460} tam={52} borde={KC.lilac} />
        <Etq T={T} at={K.Bebes + 2.0} until={K.Record - 0.2} x={500 + 1.15 * 80} y={820 + 1.15 * 95} texto="aire tragado" lado="der" color={KC.ink} />
      </Escena>
      {/* 9 · el récord: Charles Osborne, ≈ 68 años */}
      <Escena T={T} a={K.Record} b={K.Remedios}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {(() => { const at = K.Record + 4.6, n = Math.max(1, Math.round(68 * kprog(T, at, at + 1.6, kEase.sale))), cam = at + (n / 68) * 1.6;
            return T > K.Record + 0.6 && <g opacity={kprog(T, K.Record + 0.6, K.Record + 1.0)}><Calendario x={290} y={910} n={T < at ? 1 : n} cambio={T < at ? K.Record + 0.6 : (n === 68 ? at + 1.6 : T - 0.06)} T={T} etiqueta={T < at + 0.1 ? 'año' : 'años'} /></g>; })()}
          {T > K.Record + 2.0 && <g opacity={kprog(T, K.Record + 2.0, K.Record + 2.4)} transform={`translate(0 ${(1 - kprog(T, K.Record + 2.0, K.Record + 2.5, kEase.rebote)) * 200})`}>
            <PersonaSimple x={790} yPies={1210} alto={460} color={KC.blue} cara="o" />
            <rect x={700} y={733} width={180} height={22} rx={8} fill="#3a2a1f" stroke={KC.ink} strokeWidth={5} />
            <rect x={735} y={680} width={110} height={60} rx={10} fill="#3a2a1f" stroke={KC.ink} strokeWidth={5} /></g>}
          {[2.8, 3.8, 5.0, 6.2].map((t, i) => <Onomato key={i} T={T} at={K.Record + t} dur={0.7} x={i % 2 ? 930 : 640} y={760} texto="hip" tam={64} color={KC.yellow} rot={i % 2 ? 10 : -10} />)}
        </Lienzo>
        <Chip T={T} at={K.Record + 0.3} until={K.Record + 4.4} texto="el hipo más largo registrado" x={540} y={460} tam={42} borde={KC.ink} />
        <NumeroGigante T={T} at={K.Record + 4.6} until={K.Remedios - 0.15} valor={68} desde={1} dur={1.6} prefijo="≈ " sufijo=" años" x={540} y={470} tam={150} color={KC.yellow} />
        <Chip T={T} at={K.Record + 3.2} until={K.Remedios - 0.15} texto="Charles Osborne · EE. UU." x={540} y={620} tam={40} borde={KC.blue} />
      </Escena>
      {/* 10 · se quita solo en minutos; más de 2 días → médico */}
      <Escena T={T} a={K.Remedios} b={K.Cierre}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Reloj x={300} y={800} r={190} vueltas={4 * kprog(T, K.Remedios + 0.3, K.Remedios + 2.3, kEase.suave)} />
          {[0.4, 1.0, 1.6].map((t, i) => <Onomato key={i} T={T} at={K.Remedios + t} dur={0.5} x={300 + (i - 1) * 140} y={530} texto="hip" tam={70 - i * 14} color={KC.yellow} rot={-6 + i * 6} />)}
          {T > K.Remedios + 2.3 && <g transform={`translate(300 800) scale(${klerp(0.3, 1, kprog(T, K.Remedios + 2.3, K.Remedios + 2.7, kEase.rebote))})`}>
            <circle r={70} fill={KC.mint} stroke={KC.ink} strokeWidth={8} /><path d="M -32 2 L -8 26 L 34 -22" fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" /></g>}
          {T > K.Remedios + 2.9 && <g opacity={kprog(T, K.Remedios + 2.9, K.Remedios + 3.2)}>
            {[0, 1].map((i) => { const e = kprog(T, K.Remedios + 2.9 + i * 0.35, K.Remedios + 3.25 + i * 0.35, kEase.rebote);
              return <g key={i} transform={`translate(${700 + i * 190} 700) scale(${klerp(0.4, 1, e)})`}>
                <rect x={-80} y={-90} width={160} height={180} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
                <rect x={-80} y={-90} width={160} height={46} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
                <text x={0} y={52} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
                <text x={0} y={84} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>día</text></g>; })}
          </g>}
          {T > K.Remedios + 3.9 && <g opacity={kprog(T, K.Remedios + 3.9, K.Remedios + 4.2)}><Maletin x={795} y={1010} s={klerp(0.4, 0.9, kprog(T, K.Remedios + 3.9, K.Remedios + 4.3, kEase.rebote))} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Remedios + 0.4} until={K.Remedios + 2.7} texto="se quita en unos minutos" x={540} y={440} tam={42} borde={KC.mint} />
        <Chip T={T} at={K.Remedios + 2.9} until={K.Cierre - 0.1} texto="más de 2 días → médico" x={540} y={440} tam={50} borde={KC.red} />
      </Escena>
      {/* 11 · cierre: la misma persona, ahora vista por dentro */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Cuerpo x={CG.x} y={CG.y} s={CG.s} uid="c" salto={jC * 40} boca={jC} camisa={KC.yellow} dentro={kprog(T, K.Cierre + 0.1, K.Cierre + 0.8)}
            baja={jC} cierra={sacude(T, HC.map((t) => t + 0.08), 3)} glowD={jC} glowG={sacude(T, HC.map((t) => t + 0.08), 3)} />
          {HC.map((t, i) => <Onomato key={i} T={T} at={t} dur={1.4} x={i % 2 ? 300 : 380} y={410} texto="¡HIP!" tam={150} color={KC.yellow} rot={i % 2 ? 7 : -8} />)}
        </Lienzo>
        <Etq T={T} at={K.Cierre + 0.9} until={K.Outro - 0.1} x={CG.x + 0.9 * 60} y={CG.y - 0.9 * 322} texto="glotis: cierra la puerta" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} x={CG.x + 0.9 * 262} y={CG.y + 0.9 * 165} texto="diafragma: un tic" lado="der" color={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Diafragma - 0.1} texto="Lo empieza *un músculo.*" />
      <Subtitulo T={T} idx={1} at={K.Diafragma + 0.1} until={K.Espasmo - 0.1} texto="Es el *diafragma.*" />
      <Subtitulo T={T} idx={2} at={K.Espasmo + 0.1} until={K.Glotis - 0.1} texto="Se contrae y *jalas aire.*" />
      <Subtitulo T={T} idx={3} at={K.Glotis + 0.1} until={K.Sonido - 0.1} texto="La *glotis* se cierra." />
      <Subtitulo T={T} idx={4} at={K.Sonido + 0.1} until={K.Causas - 0.1} texto="Aire contra la puerta: *¡hip!*" />
      <Subtitulo T={T} idx={5} at={K.Causas + 0.1} until={K.Pregunta - 0.1} texto="Prisa, *gas* o panza llena." />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Hipotesis - 0.1} texto="¿Para qué *sirve?*" />
      <Subtitulo T={T} idx={7} at={K.Hipotesis + 0.1} until={K.Bebes - 0.1} texto="Hipótesis: *las branquias.*" />
      <Subtitulo T={T} idx={8} at={K.Bebes + 0.1} until={K.Record - 0.1} texto="Otra: *sacar el aire.*" />
      <Subtitulo T={T} idx={9} at={K.Record + 0.1} until={K.Remedios - 0.1} texto="Récord: *≈ 68 años.*" />
      <Subtitulo T={T} idx={10} at={K.Remedios + 0.1} until={K.Cierre - 0.1} texto="Más de 2 días: *al médico.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Un *tic* y la puerta: *hip.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Espasmo + 0.5, K.Glotis - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Sonido + 0.4, K.Causas - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Hipotesis + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Hipotesis + 2.6, K.Bebes - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Bebes + 0.5, K.Record - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Record + 4.6, K.Remedios - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Remedios + 2.9, K.Cierre - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="21" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function HipoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hipo /></CompositionStage></div>;
}
window.HipoApp = HipoApp;
