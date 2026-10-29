// Shot Científico #41 · Tu cerebro no se congela: es tu paladar — NARRADO (N1 "Por dentro" + N5 el popote de 2012).
// Datos: ICHD-3 4.5, Harvard Health, Cleveland Clinic, Serrador et al. 2012 (Experimental Biology, resumen de congreso),
// Kaczorowski y Kaczorowski 2002 (BMJ). Ver guion.md y verificacion.md. Dibujo esquemático: vasos, nervio y arteria no van a escala.
const HFRIO = KC.cyan, HDOLOR = KC.red, HTIBIO = KC.orange, HSANGRE = '#d8263a';

// Cabeza del gancho y del cierre (misma imagen al inicio y al final).
const CG = { x: 360, y: 950, s: 1.3 };
const gpt = (c, lx, ly) => [c.x + lx * c.s, c.y + ly * c.s];
// puntos de la cabeza (coordenadas locales de CabezaPerfil)
const L_PALADAR = [100, 72], L_FRENTE = [128, -112], L_GANGLIO = [-5, 15], L_BOCA = [170, 98];

// Helado de cono. (x, y) = centro de la bola; rot en grados (0 = cono hacia abajo). mordida 0..1 (despacio = mordidita).
function Helado({ x, y, s = 1, rot = 0, mordida = 0, mano = true, gotea = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -62 28 L 62 28 L 0 250 Z" fill="#e3a54a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-1, 0, 1, 2].map((i) => <line key={'a' + i} x1={-50 + i * 34} y1={30} x2={-10 + i * 34} y2={150} stroke="#b27426" strokeWidth={5} />)}
    {[-1, 0, 1, 2].map((i) => <line key={'b' + i} x1={50 - i * 34} y1={30} x2={10 - i * 34} y2={150} stroke="#b27426" strokeWidth={5} />)}
    <path d="M -80 30 C -100 -40 -60 -92 0 -92 C 60 -92 100 -40 80 30 C 60 46 40 26 20 44 C 0 58 -20 30 -40 46 C -60 56 -70 40 -80 30 Z" fill="#ffb3cf" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -46 -50 C -30 -70 0 -76 18 -70" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".8" />
    {gotea > 0 && <path d={`M 52 36 C 50 ${50 + 40 * gotea} 66 ${50 + 40 * gotea} 64 36`} fill="#ffb3cf" stroke={KC.ink} strokeWidth={6} />}
    {mordida > 0 && <circle cx={-30} cy={-86} r={36 * mordida} fill="none" />}
    {mordida > 0 && <path d={`M ${-70} ${-60} C ${-60} ${-60 + 40 * mordida} ${-20} ${-50 + 44 * mordida} ${10} ${-90}`} fill="#ffd9e8" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />}
    {mano && <g><ellipse cx={0} cy={150} rx={58} ry={50} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
      {[-24, 0, 24].map((d) => <line key={d} x1={-40} y1={150 + d} x2={-6} y2={150 + d} stroke={CPIEL2} strokeWidth={5} strokeLinecap="round" />)}</g>}
  </g>;
}
// Manga del brazo que sostiene el helado (en coordenadas de pantalla).
function Manga({ x, y, hasta = [1000, 1500], color = KC.blue }) {
  return <g>
    <line x1={x} y1={y} x2={hasta[0]} y2={hasta[1]} stroke={KC.ink} strokeWidth={96} strokeLinecap="round" />
    <line x1={x} y1={y} x2={hasta[0]} y2={hasta[1]} stroke={color} strokeWidth={80} strokeLinecap="round" />
  </g>;
}
// Punto de la mano del Helado en pantalla.
function manoDe(x, y, s, rot) { const a = rot * Math.PI / 180; return [x - Math.sin(a) * 150 * s, y + Math.cos(a) * 150 * s]; }

// Rayo de dolor.
function Rayo({ x, y, s = 1, o = 1, color = KC.yellow, rot = 0 }) {
  if (o <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -10 -72 L 34 -72 L 10 -16 L 38 -16 L -22 78 L -4 12 L -32 12 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Anillos de dolor que laten.
function Latidos({ x, y, T, o = 1, color = HDOLOR, r0 = 30, r1 = 120 }) {
  if (o <= 0.01) return null;
  return <g>{[0, 1, 2].map((i) => { const f = ((T * 1.4 + i / 3) % 1); return <circle key={i} cx={x} cy={y} r={r0 + f * (r1 - r0)} fill="none" stroke={color} strokeWidth={10} opacity={o * (1 - f)} />; })}</g>;
}
// Brillo suave (frío o tibio).
function Halo({ x, y, r = 60, color = HFRIO, o = 1 }) {
  if (o <= 0.01) return null;
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={color} opacity=".25" /><circle cx={x} cy={y} r={r * 0.6} fill={color} opacity=".35" /></g>;
}
// Copo de nieve.
function Copo({ x, y, s = 1, color = '#fff', rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}><line x1={0} y1={-30} x2={0} y2={30} stroke={KC.ink} strokeWidth={11} strokeLinecap="round" />
      <line x1={0} y1={-30} x2={0} y2={30} stroke={color} strokeWidth={5} strokeLinecap="round" />
      <path d="M -9 -22 L 0 -13 L 9 -22 M -9 22 L 0 13 L 9 22" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" /></g>)}
  </g>;
}
// Cerebro con hielo (lo que NO pasa). tacha 0..1 = X roja.
function CerebroHielo({ x, y, s = 1, tacha = 0, hielo = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 20 C -140 -60 -80 -112 -20 -100 C 20 -130 92 -112 110 -60 C 150 -30 140 40 100 60 C 60 92 -60 92 -120 20 Z" fill="#f7a8c0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -90 0 C -70 -30 -40 0 -20 -30 C 0 -60 30 -20 50 -50 M -60 50 C -40 20 0 50 20 20 C 40 -5 70 30 100 10 M -20 -100 C -10 -70 -30 -60 -20 -40" fill="none" stroke="#c9577c" strokeWidth={7} strokeLinecap="round" />
    {hielo > 0 && <g opacity={hielo}>
      {[[-70, -78, -12], [-10, -104, 8], [55, -88, 18]].map(([cx, cy, r], i) => <rect key={i} x={cx - 30} y={cy - 30} width={60} height={60} rx={10} transform={`rotate(${r} ${cx} ${cy})`} fill="#c9f3ff" stroke={KC.ink} strokeWidth={6} opacity=".95" />)}
      {[-80, -40, 0, 40, 80].map((ix, i) => <path key={i} d={`M ${ix - 12} ${62 + (i % 2) * 8} L ${ix} ${100 + (i % 2) * 20} L ${ix + 12} ${62 + (i % 2) * 8} Z`} fill="#c9f3ff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    </g>}
    {tacha > 0 && <g>
      <line x1={-140} y1={-120} x2={-140 + 280 * kprog(tacha, 0, 0.5)} y2={-120 + 240 * kprog(tacha, 0, 0.5)} stroke={KC.red} strokeWidth={26} strokeLinecap="round" />
      {tacha > 0.5 && <line x1={140} y1={-120} x2={140 - 280 * kprog(tacha, 0.5, 1)} y2={-120 + 240 * kprog(tacha, 0.5, 1)} stroke={KC.red} strokeWidth={26} strokeLinecap="round" />}
    </g>}
  </g>;
}
// Globo de pensamiento con un cerebro congelado tachado. o = opacidad.
function GloboCerebro({ x, y, T, tacha = 0, o = 1, s = 1, hacia }) {
  if (o <= 0.01) return null;
  return <g opacity={o}>
    {hacia && [0.35, 0.6, 0.82].map((f, i) => <circle key={i} cx={klerp(x, hacia[0], f)} cy={klerp(y + 120 * s, hacia[1], f)} r={(22 - i * 6) * s} fill="#fff" stroke={KC.ink} strokeWidth={6} />)}
    <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.02 * Math.sin(T * 3))})`}>
      <ellipse cx={0} cy={0} rx={190} ry={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
      <CerebroHielo x={0} y={8} s={0.95} tacha={tacha} />
    </g>
  </g>;
}

// Boca por dentro (coordenadas locales de CabezaPerfil). frio 0..1 en paladar y garganta, vasos: ancho relativo (1 normal),
// lengua 0..1 (sube al paladar), tibio 0..1 (calor en el paladar), bocado: helado dentro tocando el paladar.
function BocaCorte({ T, frio = 0, garganta = 0, vasos = 1, lengua = 0, tibio = 0, bocado = 0, popote = 0 }) {
  const pal = 'M 168 90 C 140 70 60 64 30 80';
  return <g>
    <path d="M 172 92 C 150 66 60 60 28 76 C 8 88 4 120 6 232 L 52 232 C 50 160 60 132 172 114 Z" fill="#5a1f22" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* garganta */}
    <path d="M 18 120 C 14 160 16 200 18 232" fill="none" stroke="#8a2f35" strokeWidth={10} strokeLinecap="round" />
    {/* lengua */}
    <path d={`M 150 ${118 - lengua * 30} C 120 ${100 - lengua * 34} 60 ${100 - lengua * 30} 40 ${124 - lengua * 16} C 40 140 140 140 160 122 Z`} fill="#e86a7c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* paladar */}
    <path d={pal} fill="none" stroke="#f7a8b8" strokeWidth={14} strokeLinecap="round" />
    {/* vasos del paladar */}
    {[[48, 60, 92, 54], [96, 54, 142, 60]].map(([a, b, c, d], i) => <g key={i}>
      <path d={`M ${a} ${b} Q ${(a + c) / 2} ${b - 12} ${c} ${d}`} fill="none" stroke={KC.ink} strokeWidth={6 * vasos + 5} strokeLinecap="round" />
      <path d={`M ${a} ${b} Q ${(a + c) / 2} ${b - 12} ${c} ${d}`} fill="none" stroke={HSANGRE} strokeWidth={6 * vasos} strokeLinecap="round" /></g>)}
    {frio > 0 && <path d={pal} fill="none" stroke={HFRIO} strokeWidth={14 + 10 * Math.sin(T * 6) ** 2} strokeLinecap="round" opacity={frio * 0.9} />}
    {garganta > 0 && <path d="M 22 92 C 10 120 12 170 16 210" fill="none" stroke={HFRIO} strokeWidth={14} strokeLinecap="round" opacity={garganta * 0.8} />}
    {tibio > 0 && <path d={pal} fill="none" stroke={HTIBIO} strokeWidth={18} strokeLinecap="round" opacity={tibio * 0.95} />}
    {bocado > 0 && <g opacity={bocado}><path d="M 82 84 C 90 70 140 72 168 86 C 160 104 110 108 86 100 Z" fill="#ffb3cf" stroke={KC.ink} strokeWidth={5} />
      <circle cx={112} cy={88} r={5} fill="#fff" /></g>}
    {popote > 0 && <g opacity={popote}><path d="M 260 150 L 176 104 L 108 78" fill="none" stroke={KC.ink} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 150 L 176 104 L 108 78" fill="none" stroke="#fff" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 150 L 176 104 L 108 78" fill="none" stroke={KC.red} strokeWidth={12} strokeDasharray="10 14" strokeLinejoin="round" /></g>}
  </g>;
}
// Nervio trigémino (local): ganglio delante de la oreja y tres ramas. p 0..1 se dibuja; pulso = señales que viajan.
const RAMAS = [
  'M -5 15 C 30 -10 60 -60 95 -80 C 110 -88 125 -95 140 -100',   // V1 frente
  'M -5 15 C 40 20 80 40 110 50 C 130 56 150 58 170 58',          // V2 mejilla y paladar
  'M -5 15 C 20 60 50 110 90 135 C 110 146 130 150 150 150',      // V3 mandíbula
];
function Trigemino({ T, p = 1, pulso = 0, rama = -1 }) {
  return <g>
    {RAMAS.map((d, i) => <g key={i}>
      <path d={d} fill="none" stroke={KC.ink} strokeWidth={15} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
      <path d={d} fill="none" stroke={i === rama ? KC.yellow : KC.gold2} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${p} 1`} />
      {pulso > 0 && <path d={d} fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray="0.08 0.3" strokeDashoffset={T * 0.9} opacity={pulso} />}
    </g>)}
    <path d="M 108 78 C 90 66 60 50 30 34" fill="none" stroke={KC.gold2} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${p} 1`} pathLength={1} />
    <ellipse cx={-5} cy={15} rx={20 * p} ry={14 * p} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cara que siente el trigémino (sombreado, local). Deja fuera el ángulo de la mandíbula.
function CaraZona({ o = 1 }) {
  return <path d="M -20 -140 C 60 -185 150 -130 168 -30 L 198 40 L 182 60 L 178 92 C 180 110 170 120 160 120 L 160 150 C 160 175 135 185 100 180 L 60 176 C 70 130 40 90 10 60 C -10 30 -24 -60 -20 -140 Z"
    fill={KC.yellow} opacity={0.45 * o} stroke={KC.yellow} strokeWidth={6} strokeDasharray="14 10" />;
}
// Vaso de agua helada.
function Vaso({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -150 L 90 -150 L 70 150 L -70 150 Z" fill="rgba(200,240,255,.55)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -84 -90 L 84 -90 L 70 145 L -70 145 Z" fill="#7fd8ff" opacity=".8" />
    {[[-40, -60, 10], [25, -40, -14], [-10, 10, 24]].map(([cx, cy, r], i) => <rect key={i} x={cx - 26} y={cy - 26 + Math.sin(T * 2 + i) * 4} width={52} height={52} rx={10} transform={`rotate(${r} ${cx} ${cy})`} fill="#e9fbff" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Taza tibia con vapor suave.
function Taza({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-30, 10, 50].map((dx, i) => <path key={i} d={`M ${dx} -110 C ${dx - 20} -140 ${dx + 20} -160 ${dx} -190`} fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(T * 3 + i)} transform={`translate(0 ${-((T * 20 + i * 10) % 20)})`} />)}
    <path d="M 70 -40 C 130 -40 130 40 70 40" fill="none" stroke={KC.ink} strokeWidth={26} />
    <path d="M 70 -40 C 130 -40 130 40 70 40" fill="none" stroke="#fff" strokeWidth={14} />
    <path d="M -90 -90 L 90 -90 L 76 70 C 70 90 -70 90 -76 70 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={-88} rx={88} ry={16} fill="#c27a3c" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-20} width={120} height={36} rx={12} fill={HTIBIO} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>tibio</text>
  </g>;
}
// Reloj: la manecilla avanza hasta p (fracción de la vuelta). La marca roja de «2 min» va en `marca`.
function Reloj({ x, y, r = 240, p = 0, marca = 0.85, dolor = 1 }) {
  const ang = (f) => f * Math.PI * 2 - Math.PI / 2, px = (f, rr) => x + Math.cos(ang(f)) * rr, py = (f, rr) => y + Math.sin(ang(f)) * rr;
  const arco = (f) => `M ${x} ${y} L ${px(0, r - 26)} ${py(0, r - 26)} A ${r - 26} ${r - 26} 0 ${f > 0.5 ? 1 : 0} 1 ${px(f, r - 26)} ${py(f, r - 26)} Z`;
  return <g>
    <rect x={x - 34} y={y - r - 60} width={68} height={50} rx={12} fill="#cfd6e0" stroke={KC.ink} strokeWidth={8} />
    <circle cx={x} cy={y} r={r} fill="#fff" stroke={KC.ink} strokeWidth={14} />
    {p > 0.001 && <path d={arco(Math.min(p, 0.999))} fill={KC.mint} opacity=".55" />}
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={px(i / 12, r - 18)} y1={py(i / 12, r - 18)} x2={px(i / 12, r - 46)} y2={py(i / 12, r - 46)} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />)}
    <line x1={px(marca, r - 10)} y1={py(marca, r - 10)} x2={px(marca, r - 70)} y2={py(marca, r - 70)} stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
    <text x={px(marca, r + 62)} y={py(marca, r + 62) + 14} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>2 min</text>
    <line x1={x} y1={y} x2={px(p, r - 60)} y2={py(p, r - 60)} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <circle cx={x} cy={y} r={20} fill={KC.ink} />
    <Rayo x={x + 4} y={y + 110} s={0.8 * dolor + 0.01} o={dolor} />
  </g>;
}
// Palomita verde.
function Palomita({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, kEase.rebote(p))})`} opacity={kprog(p, 0, 0.3)}>
    <circle r={58} fill={KC.leaf} stroke={KC.ink} strokeWidth={9} />
    <path d="M -28 2 L -8 24 L 32 -22" fill="none" stroke="#fff" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Tarjeta del estudio de 2002: rápido vs. despacio (sin cifras: solo la dirección del resultado).
function PanelComer({ x, y, T, p = 1, titulo, rapido }) {
  if (p <= 0) return null;
  const e = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.5, 1, e)})`} opacity={kprog(p, 0, 0.3)}>
    <rect x={-210} y={-250} width={420} height={500} rx={36} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-180} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={rapido ? KC.red : KC.leaf} stroke={KC.ink} strokeWidth={3}>{titulo}</text>
    {rapido && [-40, 0, 40].map((dy, i) => <line key={i} x1={-180 + ((T * 300 + i * 40) % 60)} y1={dy + 40} x2={-110 + ((T * 300 + i * 40) % 60)} y2={dy + 40} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />)}
    <g transform={`translate(${rapido ? Math.sin(T * 30) * 6 : 0} 0)`}><Helado x={20} y={0} s={0.62} rot={rapido ? 20 : -8} mano={false} mordida={rapido ? 0.9 : 0.35} /></g>
    {rapido ? <Rayo x={140} y={-80} s={0.7} rot={10} /> : <Palomita x={140} y={-80} s={0.8} p={kprog(p, 0.4, 1)} />}
  </g>;
}

function Helado41() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el cono llega a la boca antes del segundo 1
  const llega = kprog(T, K.Gancho, K.Gancho + 0.45, kEase.sale);
  const hx = klerp(900, 650, llega), hy = klerp(1200, 1060, llega), hrot = -50;
  const [mx0, my0] = manoDe(hx, hy, 1, hrot);
  const pal0 = gpt(CG, ...L_PALADAR), fre0 = gpt(CG, ...L_FRENTE);
  const ay = kprog(T, K.Gancho + 0.85, K.Gancho + 1.1);
  // cabeza grande en corte (Paladar, Lengua)
  const CC = { x: 400, y: 900, s: 1.5 };
  // cabeza de las escenas del nervio y la frente
  const CN = { x: 440, y: 900, s: 1.5 }, CF = { x: 420, y: 950, s: 1.45 };
  // estudio
  const CE = { x: 330, y: 960, s: 1.2 };
  // resultado: ancho de la arteria y dolor (los dos al mismo tiempo)
  const sube = kprog(T, K.Resultado + 1.4, K.Resultado + 2.8, kEase.suave), baja = kprog(T, K.Resultado + 4.6, K.Resultado + 6.2, kEase.suave);
  const ancho = sube * (1 - baja), dolorR = ancho;
  const RC = { x: 540, y: 600 };
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: mordida → rayo en la frente → el cerebro congelado se tacha */}
      <Escena T={T} a={K.Gancho} b={K.Paladar} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Manga x={mx0} y={my0} hasta={[1060, 1560]} />
          <CabezaPerfil x={CG.x} y={CG.y} s={CG.s} gesto={ay > 0.5 ? 'mueca' : 'normal'} boca={T < K.Gancho + 0.6 ? 0.6 : 0} />
          <Helado x={hx} y={hy} rot={hrot} mordida={kprog(T, K.Gancho + 0.45, K.Gancho + 0.6)} />
          <Halo x={pal0[0] + 40} y={pal0[1]} r={80} o={kprog(T, K.Gancho + 4.6, K.Gancho + 5.2)} />
          {T > K.Gancho + 4.6 && <Copo x={pal0[0] + 40} y={pal0[1]} s={0.9} rot={T * 30} />}
          <Latidos x={fre0[0]} y={fre0[1]} T={T} o={ay * (1 - kprog(T, K.Gancho + 2.4, K.Gancho + 2.9)) + kprog(T, K.Gancho + 6.0, K.Gancho + 6.5)} />
          <Rayo x={fre0[0] + 20} y={fre0[1] - 30} s={0.9 + 0.08 * Math.sin(T * 20)} o={ay * (1 - kprog(T, K.Gancho + 2.4, K.Gancho + 2.9)) + kprog(T, K.Gancho + 6.0, K.Gancho + 6.4)} />
          <Onomato T={T} at={K.Gancho + 0.85} dur={1.4} x={280} y={640} texto="¡AY!" color={KC.yellow} tam={170} />
          <GloboCerebro x={250} y={500} T={T} s={0.85} hacia={[CG.x - 40, CG.y - 230]} o={kprog(T, K.Gancho + 2.5, K.Gancho + 2.9) * (1 - kprog(T, K.Gancho + 4.6, K.Gancho + 5.0))}
            tacha={kprog(T, K.Gancho + 3.4, K.Gancho + 4.0)} />
        </Lienzo>
        <Chip T={T} at={K.Gancho + 4.9} until={K.Paladar - 0.1} texto="❄ el frío: tu paladar" x={760} y={430} tam={40} borde={HFRIO} />
        <Chip T={T} at={K.Gancho + 6.1} until={K.Paladar - 0.1} texto="⚡ el dolor: tu frente" x={760} y={530} tam={40} borde={HDOLOR} />
      </Escena>

      {/* 1 · por dentro: el frío toca el paladar y los vasos reaccionan */}
      <Escena T={T} a={K.Paladar} b={K.Nervio} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <Helado x={CC.x + 270} y={CC.y + 170} rot={-70} s={0.9} mano={false} />
          <CabezaPerfil x={CC.x} y={CC.y} s={CC.s} corte={1}>
            <BocaCorte T={T} bocado={kprog(T, K.Paladar + 1.0, K.Paladar + 1.4)} frio={kprog(T, K.Paladar + 1.5, K.Paladar + 2.2)} garganta={kprog(T, K.Paladar + 2.4, K.Paladar + 3.0)}
              vasos={1 - 0.6 * kprog(T, K.Paladar + 4.0, K.Paladar + 4.5) + 1.2 * kprog(T, K.Paladar + 4.9, K.Paladar + 5.5)} />
          </CabezaPerfil>
        </Lienzo>
        <Chip T={T} at={K.Paladar + 0.3} until={K.Nervio - 0.1} texto="idea más aceptada" x={600} y={420} tam={42} borde={KC.gold} />
        <Etq T={T} at={K.Paladar + 1.6} until={K.Nervio - 0.2} x={735} y={1015} texto="paladar" lado="der" color={HFRIO} />
        <Etq T={T} at={K.Paladar + 2.6} until={K.Nervio - 0.2} x={400} y={1150} texto="garganta" lado="izq" color={HFRIO} />
        <Lupa T={T} at={K.Paladar + 3.7} until={K.Nervio - 0.3} x={810} y={690} r={165} fx={CC.x + 95 * CC.s} fy={CC.y + 57 * CC.s} tinte={HSANGRE} etiqueta="POR DENTRO · PALADAR"
          interior={(t, r) => { const w = 1 - 0.6 * kprog(t, K.Paladar + 4.0, K.Paladar + 4.5) + 1.0 * kprog(t, K.Paladar + 4.9, K.Paladar + 5.5); const h = 60 * w;
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a0f18" />
              <rect x={0} y={r * 1.45} width={r * 2} height={r} fill="#f7a8b8" /><rect x={0} y={r * 1.45} width={r * 2} height={14} fill={HFRIO} opacity=".8" />
              <rect x={-10} y={r - h / 2 - 8} width={r * 2 + 20} height={h + 16} rx={h / 2 + 8} fill="#a3364a" stroke={KC.ink} strokeWidth={5} />
              <rect x={-10} y={r - h / 2} width={r * 2 + 20} height={h} rx={h / 2} fill={HSANGRE} />
              {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx={((t * 90 * (0.6 + w * 0.4) + i * 70) % (r * 2 + 40)) - 20} cy={r + Math.sin(i * 2) * h * 0.2} rx={18 * Math.min(1, w + 0.2)} ry={10 * Math.min(1, w + 0.2)} fill="#ff6b7d" stroke="#7a1422" strokeWidth={3} />)}
            </svg>; }} />
      </Escena>

      {/* 2 · el nervio trigémino lleva la señal */}
      <Escena T={T} a={K.Nervio} b={K.Frente} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CabezaPerfil x={CN.x} y={CN.y} s={CN.s}>
            <CaraZona o={kprog(T, K.Nervio + 2.3, K.Nervio + 2.9)} />
            <Trigemino T={T} p={kprog(T, K.Nervio + 0.1, K.Nervio + 1.3, kEase.sale)} pulso={kprog(T, K.Nervio + 1.0, K.Nervio + 1.5)} rama={1} />
            <Halo x={L_PALADAR[0] + 8} y={L_PALADAR[1]} r={26} o={1} />
          </CabezaPerfil>
        </Lienzo>
        <Chip T={T} at={K.Nervio + 0.4} until={K.Frente - 0.1} texto="nervio trigémino" x={540} y={420} tam={44} borde={KC.yellow} />
        <Etq T={T} at={K.Nervio + 1.2} until={K.Frente - 0.2} x={CN.x - 5 * CN.s - 30} y={CN.y + 15 * CN.s} texto="3 ramas" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Nervio + 2.6} until={K.Frente - 0.1} texto="siente casi toda tu cara" x={540} y={515} tam={40} borde={KC.yellow} />
      </Escena>

      {/* 3 · el cerebro la ubica en la frente: dolor que se siente lejos */}
      <Escena T={T} a={K.Frente} b={K.Estudio} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <CabezaPerfil x={CF.x} y={CF.y} s={CF.s} gesto={T > K.Frente + 1.2 ? 'mueca' : 'normal'}>
            <Trigemino T={T} p={1} pulso={0.6} rama={0} />
          </CabezaPerfil>
          {(() => { const [a, b] = gpt(CF, ...L_PALADAR), [c, d] = gpt(CF, ...L_FRENTE);
            return <g>
              <Halo x={a + 30} y={b} r={50} />
              <FlechaCurva x1={a + 120} y1={b - 10} x2={c + 90} y2={d + 30} curva={-150} p={kprog(T, K.Frente + 0.3, K.Frente + 1.2, kEase.sale)} color={KC.red} grosor={12} T={T} />
              <Latidos x={c} y={d} T={T} o={kprog(T, K.Frente + 1.2, K.Frente + 1.5)} />
              <Rayo x={c + 30} y={d - 40} s={0.85 + 0.08 * Math.sin(T * 20)} o={kprog(T, K.Frente + 1.2, K.Frente + 1.4)} />
            </g>; })()}
        </Lienzo>
        <Etq T={T} at={K.Frente + 0.4} until={K.Estudio - 0.2} x={720} y={1130} texto="empieza aquí" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Frente + 1.4} until={K.Estudio - 0.2} x={690} y={830} texto="lo sientes aquí" lado="der" color={KC.ink} tam={30} />
        <Chip T={T} at={K.Frente + 2.6} until={K.Estudio - 0.1} texto="dolor que se siente lejos" x={370} y={440} tam={36} borde={KC.red} />
      </Escena>

      {/* 4 · el estudio de 2012: agua helada con popote al paladar */}
      <Escena T={T} a={K.Estudio} b={K.Resultado} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        {T > K.Estudio + 2.3 && <Lienzo o={kprog(T, K.Estudio + 2.3, K.Estudio + 2.7)}>
          <Vaso x={790} y={1060} s={0.9} T={T} />
          <path d={`M 800 960 L 800 860 L ${CE.x + 200 * CE.s} ${CE.y + 105 * CE.s}`} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinejoin="round" strokeLinecap="round" />
          <path d={`M 800 960 L 800 860 L ${CE.x + 200 * CE.s} ${CE.y + 105 * CE.s}`} fill="none" stroke="#fff" strokeWidth={13} strokeLinejoin="round" strokeLinecap="round" />
          <path d={`M 800 960 L 800 860 L ${CE.x + 200 * CE.s} ${CE.y + 105 * CE.s}`} fill="none" stroke={KC.red} strokeWidth={13} strokeDasharray="10 14" strokeDashoffset={-T * 40} strokeLinejoin="round" />
          <CabezaPerfil x={CE.x} y={CE.y} s={CE.s} boca={0.3} />
        </Lienzo>}
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.3} anio="2012" quien="Harvard · Jorge Serrador" revista="presentado en un congreso" x={540} y={720} />
        <Chip T={T} at={K.Estudio + 2.6} until={K.Resultado - 0.1} texto="voluntarios · agua helada" x={540} y={420} tam={42} borde={KC.ink} />
        <Lupa T={T} at={K.Estudio + 3.4} until={K.Resultado - 0.3} x={800} y={640} r={160} fx={CE.x + 190 * CE.s} fy={CE.y + 100 * CE.s} tinte={HFRIO} etiqueta="POR DENTRO · POPOTE"
          interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="40 20 160 160"><rect x={0} y={0} width={300} height={300} fill="#f1b48f" />
            <BocaCorte T={t} popote={1} frio={kprog(t, K.Estudio + 3.9, K.Estudio + 4.4)} /></svg>} />
      </Escena>

      {/* 5 · resultado: una arteria del cerebro se ensancha cuando empieza el dolor y se cierra cuando se va */}
      <Escena T={T} a={K.Resultado} b={K.Pregunta} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <g transform={`translate(${RC.x} ${RC.y}) scale(1.5)`}>
            <path d="M -120 20 C -140 -60 -80 -112 -20 -100 C 20 -130 92 -112 110 -60 C 150 -30 140 40 100 60 C 60 92 -60 92 -120 20 Z" fill="#f7a8c0" stroke={KC.ink} strokeWidth={8} />
            <path d="M -90 0 C -70 -30 -40 0 -20 -30 C 0 -60 30 -20 50 -50 M -60 50 C -40 20 0 50 20 20 C 40 -5 70 30 100 10" fill="none" stroke="#c9577c" strokeWidth={6} strokeLinecap="round" />
            <path d="M -30 70 C 20 40 80 0 95 -55 C 100 -80 60 -100 20 -100" fill="none" stroke={KC.ink} strokeWidth={10 + 8 * ancho} strokeLinecap="round" />
            <path d="M -30 70 C 20 40 80 0 95 -55 C 100 -80 60 -100 20 -100" fill="none" stroke={HSANGRE} strokeWidth={5 + 8 * ancho} strokeLinecap="round" />
          </g>
          {/* el tubo de cerca */}
          {(() => { const h = 70 + 90 * ancho, y0 = 1000;
            return <g opacity={kprog(T, K.Resultado + 0.6, K.Resultado + 1.1)}>
              <rect x={60} y={y0 - h / 2 - 12} width={960} height={h + 24} rx={(h + 24) / 2} fill="#a3364a" stroke={KC.ink} strokeWidth={8} />
              <rect x={60} y={y0 - h / 2} width={960} height={h} rx={h / 2} fill={HSANGRE} />
              {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={80 + ((T * (140 + 160 * ancho) + i * 85) % 920)} cy={y0 + Math.sin(i * 2.3) * h * 0.25} rx={24} ry={13} fill="#ff6b7d" stroke="#7a1422" strokeWidth={3} />)}
              {[-1, 1].map((sg) => <g key={sg}><path d={`M 540 ${y0 + sg * (h / 2 + 30)} l 0 ${sg * 50 * ancho + sg * 0.01}`} stroke={KC.texto} strokeWidth={8} markerEnd="" />
                {ancho > 0.2 && <path d={`M 520 ${y0 + sg * (h / 2 + 30 + 50 * ancho) - sg * 18} L 540 ${y0 + sg * (h / 2 + 30 + 50 * ancho)} L 560 ${y0 + sg * (h / 2 + 30 + 50 * ancho) - sg * 18}`} fill="none" stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />}</g>)}
            </g>; })()}
          <Rayo x={RC.x + 270} y={RC.y - 40} s={0.8} o={dolorR} />
          <Latidos x={RC.x + 270} y={RC.y - 40} T={T} o={dolorR} r1={100} />
        </Lienzo>
        <Etq T={T} at={K.Resultado + 0.7} until={K.Pregunta - 0.2} x={600} y={800} texto="una arteria del cerebro" lado="izq" color={KC.texto} tam={30} />
        <Medidor T={T} at={K.Resultado + 1.0} until={K.Pregunta - 0.1} valor={() => 0.3 + 0.7 * ancho} etiqueta="arteria" texto={() => (ancho > 0.5 ? 'se ensancha' : baja > 0.5 ? 'se cierra' : 'normal')} x={90} y={1420} ancho={620} color={HSANGRE} />
        <Medidor T={T} at={K.Resultado + 1.0} until={K.Pregunta - 0.1} valor={() => dolorR} etiqueta="dolor" texto={() => (dolorR > 0.5 ? '¡duele!' : baja > 0.5 ? 'se quita' : 'nada')} x={90} y={1540} ancho={620} color={KC.yellow} />
        <Chip T={T} at={K.Resultado + 2.6} until={K.Resultado + 4.5} texto="¡al mismo tiempo!" x={540} y={420} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Lengua} />

      {/* 7 · lo que se recomienda: lengua al paladar o algo tibio */}
      <Escena T={T} a={K.Lengua} b={K.Rapido} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <CabezaPerfil x={CC.x} y={CC.y} s={CC.s} corte={1}>
            <BocaCorte T={T} frio={1 - kprog(T, K.Lengua + 2.2, K.Lengua + 3.2)} lengua={kprog(T, K.Lengua + 1.3, K.Lengua + 2.2, kEase.sale)} tibio={kprog(T, K.Lengua + 2.2, K.Lengua + 3.2)} />
          </CabezaPerfil>
          <g transform={`translate(0 ${(1 - kprog(T, K.Lengua + 4.0, K.Lengua + 4.5, kEase.rebote)) * 900})`}><Taza x={880} y={1080} s={0.95} T={T} /></g>
        </Lienzo>
        <Chip T={T} at={K.Lengua + 0.2} until={K.Rapido - 0.1} texto="lo que se recomienda" x={540} y={420} tam={44} borde={KC.gold} />
        <Etq T={T} at={K.Lengua + 1.8} until={K.Rapido - 0.2} x={490} y={1175} texto="lengua al paladar" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Lengua + 4.4} until={K.Rapido - 0.1} texto="o algo tibio" x={860} y={850} tam={40} borde={HTIBIO} />
      </Escena>

      {/* 8 · menos de 2 minutos */}
      <Escena T={T} a={K.Rapido} b={K.Despacio} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform={`translate(540 800) scale(${klerp(0.6, 1, kprog(T, K.Rapido - 0.2, K.Rapido + 0.3, kEase.rebote))}) translate(-540 -800)`}>
            <Reloj x={540} y={800} r={250} p={0.8 * kprog(T, K.Rapido + 0.2, K.Rapido + 2.6, kEase.suave)} dolor={1 - kprog(T, K.Rapido + 1.6, K.Rapido + 2.6)} />
          </g>
          <TextoSvg x={540} y={470} tam={110} color={KC.yellow} s={klerp(0.5, 1, kprog(T, K.Rapido + 0.3, K.Rapido + 0.7, kEase.rebote))}>MENOS DE 2 MIN</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Rapido + 1.0} until={K.Despacio - 0.1} texto="casi siempre se quita solo" x={540} y={1150} tam={40} borde={KC.mint} />
      </Escena>

      {/* 9 · 2002, Canadá: comer despacio ayuda */}
      <Escena T={T} a={K.Despacio} b={K.Cierre} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <PanelComer x={300} y={830} T={T} p={kprog(T, K.Despacio + 2.3, K.Despacio + 2.8)} titulo="RÁPIDO" rapido />
          <PanelComer x={780} y={830} T={T} p={kprog(T, K.Despacio + 2.8, K.Despacio + 3.3)} titulo="DESPACIO" />
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Despacio + 0.2} until={K.Despacio + 2.2} anio="2002" quien="Canadá" revista="BMJ" x={540} y={760} />
        <Chip T={T} at={K.Despacio + 3.4} until={K.Cierre - 0.1} texto="comer despacio ayuda" x={540} y={420} tam={44} borde={KC.leaf} />
      </Escena>

      {/* 10 · cierre: el mismo helado, ahora despacio */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          {(() => { const r = -50, x = 690 + 10 * Math.sin(T * 1.5), y = 1080; const [mx, my] = manoDe(x, y, 1, r);
            return <g><Manga x={mx} y={my} hasta={[1060, 1560]} /><CabezaPerfil x={CG.x} y={CG.y} s={CG.s} gesto="sonrie" />
              <Helado x={x} y={y} rot={r} mordida={0.35} /></g>; })()}
          <GloboCerebro x={250} y={500} T={T} s={0.85} hacia={[CG.x - 40, CG.y - 230]} o={kprog(T, K.Cierre, K.Cierre + 0.3) * (1 - kprog(T, K.Cierre + 2.0, K.Cierre + 2.4))} tacha={1} />
          {(() => { const p = kprog(T, K.Cierre + 2.2, K.Cierre + 3.0, kEase.sale);
            return <g><Halo x={pal0[0] + 40} y={pal0[1]} r={60} color={HFRIO} o={p} />
              <FlechaCurva x1={pal0[0] + 120} y1={pal0[1] - 10} x2={fre0[0] + 80} y2={fre0[1] + 20} curva={-130} p={p} color={KC.yellow} grosor={11} T={T} />
              <Halo x={fre0[0]} y={fre0[1]} r={50} color={KC.yellow} o={p * (0.6 + 0.4 * Math.sin(T * 8))} /></g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.4} until={K.Outro - 0.1} texto="la alarma del paladar" x={400} y={420} tam={42} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Paladar - 0.1} texto="Tu cerebro *no se congela.*" />
      <Subtitulo T={T} idx={1} at={K.Paladar + 0.1} until={K.Nervio - 0.1} texto="Frío en el paladar: *los vasos reaccionan.*" />
      <Subtitulo T={T} idx={2} at={K.Nervio + 0.1} until={K.Frente - 0.1} texto="La señal va por *el trigémino.*" />
      <Subtitulo T={T} idx={3} at={K.Frente + 0.1} until={K.Estudio - 0.1} texto="Pero lo sientes *en la frente.*" />
      <Subtitulo T={T} idx={4} at={K.Estudio + 0.1} until={K.Resultado - 0.1} texto="2012: *agua helada* con popote." />
      <Subtitulo T={T} idx={5} at={K.Resultado + 0.1} until={K.Pregunta - 0.1} texto="Una arteria *se ensanchaba.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Lengua - 0.1} texto="¿Y cómo *se quita?*" />
      <Subtitulo T={T} idx={7} at={K.Lengua + 0.1} until={K.Rapido - 0.1} texto="Calienta tu *paladar.*" />
      <Subtitulo T={T} idx={8} at={K.Rapido + 0.1} until={K.Despacio - 0.1} texto="Menos de *2 minutos.*" />
      <Subtitulo T={T} idx={9} at={K.Despacio + 0.1} until={K.Cierre - 0.1} texto="Cómelo *despacio.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu paladar *manda la alarma.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Paladar + 0.6, K.Paladar + 3.6, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Frente + 0.6, K.Frente + 4.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Resultado + 2.9, K.Pregunta - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Pregunta + 0.05, K.Lengua + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Rapido + 0.3, K.Despacio - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Despacio + 2.5, K.Cierre - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="41" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function HeladoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Helado41 /></CompositionStage></div>;
}
window.HeladoApp = HeladoApp;
