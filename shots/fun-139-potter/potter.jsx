// Shot Fungi Mati #139 · Esa acuarela de hongo no es un adorno de cuento — NARRADO (gancho 1 «Esto no es X: es Y» · N1 + N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático: no copia ningún dibujo de Beatrix Potter ni sus personajes.
// Piezas propias (todo SVG, se dibuja desde T). Se carga después de kit-robert.jsx.

const PT = { papel:'#f7efda', papel2:'#e9dcbc', sepia:'#5a3b22', lapiz:'#6b6258', naranja:'#c8642a', naranja2:'#e9a24e', centro:'#8a3a16',
  pieOsc:'#3b2414', pieClaro:'#e8c87a', lam:'#f3e3b8', espora:'#eef6ff', hifa:'#dff3ff', piedra:'#cfc8bd', piedra2:'#a69d90', conejo:'#9a7452', conejo2:'#7a5638' };
const psvg = (c, z = 20) => <svg width={KW} height={KH} viewBox={`0 0 ${KW} ${KH}`} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{c}</svg>;

// Filtro de acuarela (orillas irregulares) — se define una vez por svg.
function DefsAcuarela({ id = 'acu', escala = 7, semilla = 3 }) {
  return <defs>
    <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={semilla} result="r" />
      <feDisplacementMap in="SourceGraphic" in2="r" scale={escala} xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <linearGradient id={id + 'pie'} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={PT.pieOsc} /><stop offset="55%" stopColor="#7a4a26" /><stop offset="100%" stopColor={PT.pieClaro} /></linearGradient>
    <radialGradient id={id + 'som'} cx="50%" cy="40%" r="65%"><stop offset="0%" stopColor={PT.centro} /><stop offset="55%" stopColor={PT.naranja} /><stop offset="100%" stopColor={PT.naranja2} /></radialGradient>
  </defs>;
}

// Un hongo de Flammulina en acuarela: pie curvo aterciopelado (oscuro abajo, claro arriba) y sombrero naranja-miel brillante.
// (x, y) = base del pie; alto, inclinación, ancho del sombrero; 'debajo' = se ven las laminillas.
function HongoAcuarela({ id, x, y, alto = 300, curva = 30, ancho = 150, rot = 0, debajo = false }) {
  const tx = x + curva, ty = y - alto;
  return <g filter={`url(#${id})`}>
    <path d={`M ${x - 13} ${y} Q ${x - 10 + curva * 0.2} ${y - alto * 0.55} ${tx - 9} ${ty + 6} L ${tx + 9} ${ty + 6} Q ${x + 12 + curva * 0.3} ${y - alto * 0.5} ${x + 13} ${y} Z`} fill={`url(#${id}pie)`} opacity=".92" />
    {/* terciopelo del pie */}
    {Array.from({ length: 9 }, (_, i) => { const u = 0.08 + i * 0.07; const px = klerp(x, tx, u * u * 0.6 + u * 0.4) - 8 + (i % 2) * 10; const py = klerp(y, ty, u);
      return <line key={i} x1={px} y1={py} x2={px + 4} y2={py - 10} stroke="#24140a" strokeWidth={2} opacity=".5" />; })}
    <g transform={`translate(${tx} ${ty}) rotate(${rot})`}>
      {debajo
        ? <><path d={`M ${-ancho / 2} 0 Q 0 ${-ancho * 0.42} ${ancho / 2} 0 Q 0 ${ancho * 0.2} ${-ancho / 2} 0 Z`} fill={`url(#${id}som)`} opacity=".92" />
            <path d={`M ${-ancho / 2 + 6} 2 Q 0 ${ancho * 0.24} ${ancho / 2 - 6} 2 Q 0 ${ancho * 0.1} ${-ancho / 2 + 6} 2 Z`} fill={PT.lam} opacity=".95" />
            {Array.from({ length: 11 }, (_, i) => { const u = -0.45 + i * 0.09; return <line key={i} x1={u * ancho * 0.9} y1={4 + Math.abs(u) * 6} x2={0} y2={ancho * 0.12} stroke="#b89a5e" strokeWidth={1.6} />; })}</>
        : <><path d={`M ${-ancho / 2} 6 Q ${-ancho * 0.45} ${-ancho * 0.36} 0 ${-ancho * 0.4} Q ${ancho * 0.45} ${-ancho * 0.36} ${ancho / 2} 6 Q 0 ${ancho * 0.12} ${-ancho / 2} 6 Z`} fill={`url(#${id}som)`} opacity=".92" />
            <path d={`M ${-ancho * 0.25} ${-ancho * 0.26} Q 0 ${-ancho * 0.36} ${ancho * 0.22} ${-ancho * 0.27}`} stroke="#fff" strokeWidth={7} fill="none" opacity=".45" strokeLinecap="round" /></>}
    </g>
  </g>;
}

// Ramito de Flammulina (crecen juntos de un mismo punto). p 0..1 = qué tanto está pintado (de abajo hacia arriba).
function RamitoFlammulina({ id, x, y, s = 1, p = 1, notas = 0 }) {
  if (p <= 0) return null;
  const alto = 520, top = y - alto * p;
  return <g transform={`translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})`}>
    <DefsAcuarela id={id} />
    <clipPath id={id + 'clip'}><rect x={x - 400} y={top} width={800} height={alto + 40} /></clipPath>
    <g clipPath={`url(#${id}clip)`}>
      {/* trozo de madera */}
      <path d={`M ${x - 170} ${y + 20} Q ${x - 60} ${y - 26} ${x + 160} ${y + 6} L ${x + 170} ${y + 34} Q ${x} ${y + 44} ${x - 170} ${y + 40} Z`} fill="#8a6a48" filter={`url(#${id})`} opacity=".8" />
      <HongoAcuarela id={id} x={x - 30} y={y} alto={300} curva={-90} ancho={170} rot={-14} />
      <HongoAcuarela id={id} x={x} y={y} alto={400} curva={20} ancho={200} rot={4} />
      <HongoAcuarela id={id} x={x + 26} y={y} alto={250} curva={120} ancho={150} rot={20} debajo />
      <HongoAcuarela id={id} x={x + 10} y={y} alto={150} curva={-20} ancho={80} rot={-6} />
    </g>
    {notas > 0 && <g opacity={notas} style={{ font:`italic 700 24px ${KF.mono}` }} fill={PT.lapiz}>
      <text x={x - 230} y={y + 66}>Flammulina velutipes</text>
    </g>}
  </g>;
}

// Hoja de papel (de cuaderno de campo). (x, y) = esquina superior izquierda.
function Hoja({ x, y, w, h, rot = -3, children, sombra = true }) {
  return <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
    {sombra && <rect x={x + 16} y={y + 18} width={w} height={h} rx={6} fill="rgba(0,0,0,.25)" />}
    <rect x={x} y={y} width={w} height={h} rx={6} fill={PT.papel} stroke={KC.ink} strokeWidth={6} />
    <rect x={x + 18} y={y + 18} width={w - 36} height={h - 36} rx={2} fill="none" stroke={PT.papel2} strokeWidth={3} />
    {children}
  </g>;
}

// Pincel (la punta en x, y).
function Pincel({ x, y, rot = 35, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d="M 0 0 Q -10 -30 -8 -60 L 8 -60 Q 10 -30 0 0 Z" fill={PT.naranja} stroke={KC.ink} strokeWidth={4} />
    <rect x={-10} y={-100} width={20} height={42} fill="#c9c2b0" stroke={KC.ink} strokeWidth={4} />
    <rect x={-8} y={-330} width={16} height={232} rx={8} fill="#2b5fa8" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Sello rectangular que cae con golpe.
function SelloRect({ T, at, x, y, lineas, color = '#118a3a', rot = -8, tam = 52 }) {
  if (T < at - 0.01) return null;
  const e = kprog(T, at, at + 0.28, kEase.sale), sc = klerp(2.2, 1, e);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={kclamp(e * 2, 0, 1)}>
    <rect x={-230} y={-30 - lineas.length * tam * 0.55} width={460} height={lineas.length * tam * 1.1 + 40} rx={14} fill="rgba(255,255,255,.75)" stroke={color} strokeWidth={9} />
    {lineas.map((l, i) => <text key={i} x={0} y={-lineas.length * tam * 0.55 + tam * 0.75 + i * tam * 1.1} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}`, letterSpacing:'.04em' }} fill={color}>{l}</text>)}
  </g>;
}

// Conejo de campo genérico (sin ropa; NO es ningún personaje). Sentado de perfil, mirando a la izquierda. (x, y) = patas.
function ConejoCampo({ T, x, y, s = 1, olfatea = 1 }) {
  const n = Math.sin(T * 22) * 2.5 * olfatea, oreja = Math.sin(T * 1.6) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={30} cy={-95} rx={105} ry={92} fill={PT.conejo} stroke={KC.ink} strokeWidth={7} />
    <circle cx={125} cy={-70} r={22} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-30} cy={-8} rx={56} ry={18} fill={PT.conejo2} stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${oreja} -40 -210)`}><path d="M -48 -205 Q -70 -330 -30 -350 Q -8 -320 -22 -205 Z" fill={PT.conejo} stroke={KC.ink} strokeWidth={7} /><path d="M -40 -215 Q -54 -310 -32 -330 Q -20 -305 -28 -215 Z" fill="#e8a99a" /></g>
    <g transform={`rotate(${-oreja * 0.7 + 8} -10 -210)`}><path d="M -18 -205 Q -10 -320 30 -335 Q 40 -300 8 -200 Z" fill={PT.conejo2} stroke={KC.ink} strokeWidth={7} /></g>
    <ellipse cx={-55} cy={-170} rx={68} ry={58} fill={PT.conejo} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-72} cy={-182} r={10} fill={KC.ink} /><circle cx={-75} cy={-185} r={3} fill="#fff" />
    <g transform={`translate(${-118} ${-160 + n * 0.3})`}><ellipse rx={10} ry={8} fill="#c46a6a" stroke={KC.ink} strokeWidth={3} />
      {[-1, 1].map((k) => <line key={k} x1={0} y1={4} x2={-40} y2={4 + k * 12 + n} stroke={KC.ink} strokeWidth={2} />)}</g>
  </g>;
}

// Hoja con un hongo distinto (para el abanico de "cientos").
function MiniHoja({ x, y, rot, tipo, s = 1 }) {
  const col = ['#c8642a', '#7a3d8a', '#d9b23a', '#a83a2a', '#6b8a3a', '#b0703a', '#3a6a8a'][tipo % 7];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-150} width={220} height={300} rx={6} fill={PT.papel} stroke={KC.ink} strokeWidth={5} />
    <path d={`M -8 110 Q -4 40 -6 ${tipo === 3 ? -10 : 0} L 8 ${tipo === 3 ? -10 : 0} Q 6 40 10 110 Z`} fill="#e7d6b0" stroke={PT.sepia} strokeWidth={2} />
    {tipo % 4 === 0 && <path d="M -70 0 Q -60 -70 0 -76 Q 60 -70 70 0 Z" fill={col} />}
    {tipo % 4 === 1 && <path d="M -40 0 Q -20 -110 0 -112 Q 20 -110 40 0 Z" fill={col} />}
    {tipo % 4 === 2 && <path d="M -80 -50 Q 0 0 80 -50 Q 40 -10 10 6 L -10 6 Q -40 -10 -80 -50 Z" fill={col} />}
    {tipo % 4 === 3 && <path d="M -80 -8 Q -78 -82 0 -86 Q 78 -82 80 -8 Q 0 4 -80 -8 Z" fill={col} />}
    <line x1={-80} y1={130} x2={40} y2={130} stroke={PT.lapiz} strokeWidth={2} opacity=".6" />
  </g>;
}

// Corte longitudinal de un hongo de laminillas: sombrero, carne, laminillas bajo el sombrero y pie.
function CorteHongo({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <path d="M -24 260 Q -18 120 -22 10 L 22 10 Q 18 120 24 260 Z" fill="#f1e2bf" stroke={PT.sepia} strokeWidth={4} />
    <path d="M -190 20 Q -180 -110 0 -122 Q 180 -110 190 20 Z" fill={PT.naranja} stroke={PT.sepia} strokeWidth={4} />
    <path d="M -168 14 Q -150 -70 0 -82 Q 150 -70 168 14 Z" fill="#f6e7c6" />
    {Array.from({ length: 13 }, (_, i) => { const u = -0.9 + i * 0.15; if (Math.abs(u) < 0.14) return null; return <path key={i} d={`M ${u * 180} 18 L ${u * 160} ${46 - Math.abs(u) * 20} L ${u * 120} 18`} fill={PT.lam} stroke={PT.sepia} strokeWidth={2.5} />; })}
    <line x1={-190} y1={20} x2={190} y2={20} stroke={PT.sepia} strokeWidth={4} />
  </g>;
}

// Cartero (silueta genérica: gorra y morral). (x, y) = pies.
function Cartero({ x, y, s = 1, brazo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 0 L -46 -230 Q -40 -290 0 -292 Q 40 -290 46 -230 L 60 0 Z" fill="#2c3e6b" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-340} r={50} fill="#e9b48c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -56 -360 Q 0 -420 56 -360 L 76 -352 L -56 -350 Z" fill="#1d2a4a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 -322 Q 0 -280 36 -322 Q 30 -296 0 -290 Q -30 -296 -36 -322 Z" fill="#8a8a8a" stroke={KC.ink} strokeWidth={4} />
    <path d="M -46 -260 L 50 -120" stroke="#6b3d1e" strokeWidth={10} />
    <rect x={20} y={-150} width={90} height={80} rx={12} fill="#8a5a2e" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 40 -240 Q ${90 + brazo * 40} ${-260 - brazo * 50} ${120 + brazo * 50} ${-290 - brazo * 40}`} stroke="#2c3e6b" strokeWidth={30} strokeLinecap="round" fill="none" />
  </g>;
}

// Sobre (carta) con estampilla genérica.
function Sobre({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-80} y={-52} width={160} height={104} rx={8} fill="#fffaf0" stroke={KC.ink} strokeWidth={5} />
    <path d="M -80 -52 L 0 10 L 80 -52" fill="none" stroke={KC.ink} strokeWidth={4} />
    <rect x={44} y={-44} width={28} height={32} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Microscopio antiguo de latón. (x, y) = centro de la base.
function Microscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 0 Q -170 -50 -110 -60 L 110 -60 Q 170 -50 170 0 Z" fill="#2a2a2a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-22} y={-260} width={44} height={210} fill="#b8862b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-150} y={-300} width={250} height={26} rx={6} fill="#2a2a2a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-40} cy={-130} r={46} fill="#dfe8ee" stroke={KC.ink} strokeWidth={6} />
    <path d="M 40 -300 Q 140 -420 90 -560" stroke="#b8862b" strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M 40 -300 Q 140 -420 90 -560" stroke={KC.ink} strokeWidth={6} fill="none" opacity=".25" />
    <g transform="rotate(-18 -40 -560)">
      <rect x={-80} y={-720} width={80} height={330} rx={10} fill="#d9a441" stroke={KC.ink} strokeWidth={7} />
      <rect x={-72} y={-700} width={14} height={290} rx={7} fill="#f6d27a" opacity=".7" />
      <rect x={-90} y={-760} width={100} height={50} rx={10} fill="#2a2a2a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-70} y={-400} width={60} height={60} rx={6} fill="#2a2a2a" stroke={KC.ink} strokeWidth={6} />
    </g>
    <circle cx={110} cy={-470} r={34} fill="#b8862b" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

// Espora de Flammulina: elipsoide alargada, lisa y hialina, con un piquito (apículo). 10 µm = 160 px a s = 1.
// Se dibuja en coordenadas µm: largo 8 µm × ancho 3.2 µm.
const PXUM = 16;  // px por µm a escala 1
function Espora({ x, y, rot = 0, s = 1, brillo = 0.6 }) {
  const L = 8 * PXUM / 2, W = 3.2 * PXUM / 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={L} ry={W} fill="rgba(220,240,255,.18)" stroke={PT.espora} strokeWidth={4} />
    <ellipse cx={-L * 0.25} cy={-W * 0.35} rx={L * 0.35} ry={W * 0.22} fill="#fff" opacity={0.25 * brillo} />
    <path d={`M ${-L + 2} ${W * 0.3} q -8 4 -10 12`} stroke={PT.espora} strokeWidth={4} fill="none" strokeLinecap="round" />
    <circle cx={L * 0.15} cy={W * 0.1} r={W * 0.32} fill="rgba(180,220,255,.35)" />
  </g>;
}

// Trazo de crecimiento de hifas: genera polilíneas deterministas (eje principal + ramas). Devuelve {pts, len, nace}.
function genHifa(seed, x0, y0, ang, largo, ramas = 2, nivel = 0) {
  const r = krng(seed); const pts = [[x0, y0]]; let a = ang, x = x0, y = y0; const paso = 14, n = Math.floor(largo / paso);
  for (let i = 0; i < n; i++) { a += (r() - 0.5) * 0.18; x += Math.cos(a) * paso; y += Math.sin(a) * paso; pts.push([x, y]); }
  const out = [{ pts, nace: 0, nivel }];
  if (nivel < 1) for (let k = 0; k < ramas; k++) { const u = 0.35 + k * 0.3 + r() * 0.08, i = Math.floor(n * u), q = pts[i];
    const sub = genHifa(seed * 7 + k + 3, q[0], q[1], a + (k % 2 ? 1 : -1) * (0.7 + r() * 0.4) - (a - ang) * 0, largo * (0.55 - k * 0.1), 1, nivel + 1);
    sub.forEach((h) => { h.nace = u; out.push(h); }); }
  return out;
}
function HifaTrazo({ h, g, grosor = 20, color = PT.hifa }) {
  // g = progreso global 0..1; cada rama empieza cuando el eje pasa por su punto de nacimiento
  const p = kclamp((g - h.nace) / (1 - h.nace) * (h.nivel ? 1.15 : 1), 0, 1); if (p <= 0) return null;
  const k = Math.max(2, Math.ceil(h.pts.length * p)), pts = h.pts.slice(0, k);
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const tip = pts[pts.length - 1];
  return <g>
    <path d={d} stroke="rgba(220,240,255,.18)" strokeWidth={grosor + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".95" transform="translate(0 0)" />
    <path d={d} stroke="rgba(14,20,36,.9)" strokeWidth={grosor - 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="rgba(200,230,255,.16)" strokeWidth={grosor - 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* tabiques (septos) cada ~6 puntos */}
    {pts.map((q, i) => { if (i % 6 !== 5 || i > pts.length - 3) return null; const a = Math.atan2(pts[i + 1][1] - q[1], pts[i + 1][0] - q[0]) + Math.PI / 2;
      return <line key={i} x1={q[0] + Math.cos(a) * (grosor / 2 - 2)} y1={q[1] + Math.sin(a) * (grosor / 2 - 2)} x2={q[0] - Math.cos(a) * (grosor / 2 - 2)} y2={q[1] - Math.sin(a) * (grosor / 2 - 2)} stroke={color} strokeWidth={3} />; })}
    <circle cx={tip[0]} cy={tip[1]} r={grosor / 2 - 1} fill="rgba(230,245,255,.5)" />
  </g>;
}

// Edificio esquemático londinense (columnas, frontón, puerta).
function Edificio({ x, y, w = 820, h = 520, puerta = 0 }) {
  const cols = 6;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M -20 0 L ${w / 2} -130 L ${w + 20} 0 Z`} fill={PT.piedra} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-20} y={0} width={w + 40} height={34} fill={PT.piedra2} stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={34} width={w} height={h - 34} fill="#ddd6ca" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: cols }, (_, i) => { const cx = 40 + i * (w - 80) / (cols - 1); if (i === 2 || i === 3) return null;
      return <g key={i}><rect x={cx - 26} y={40} width={52} height={h - 70} fill="#ece6db" stroke={KC.ink} strokeWidth={5} />
        {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={cx - 10 + k * 20} y1={50} x2={cx - 10 + k * 20} y2={h - 40} stroke={PT.piedra2} strokeWidth={3} />)}</g>; })}
    {/* puerta (se cierra: puerta 0 abierta → 1 cerrada) */}
    <rect x={w / 2 - 80} y={h - 290} width={160} height={290} rx={8} fill="#2a1c12" stroke={KC.ink} strokeWidth={6} />
    <rect x={w / 2 - 80} y={h - 290} width={160 * (0.25 + 0.75 * puerta)} height={290} rx={8} fill="#5a3418" stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={h} width={w + 60} height={30} fill={PT.piedra2} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Siluetas de época (genéricas): mujer con vestido largo y moño; señor con barba y levita. (x, y) = pies.
function Dama({ x, y, s = 1, brazo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 0 Q -70 -150 -34 -250 L 34 -250 Q 70 -150 90 0 Z" fill="#3b4a5a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -34 -250 L -30 -330 Q 0 -350 30 -330 L 34 -250 Z" fill="#3b4a5a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-372} r={40} fill="#efc9a8" stroke={KC.ink} strokeWidth={6} />
    <path d="M -42 -380 Q -40 -420 0 -420 Q 40 -420 42 -380 Q 30 -400 0 -402 Q -30 -400 -42 -380 Z" fill="#5a3a22" stroke={KC.ink} strokeWidth={4} />
    <circle cx={30} cy={-410} r={18} fill="#5a3a22" stroke={KC.ink} strokeWidth={4} />
    <path d={`M 20 -320 Q ${60 + brazo * 30} ${-290 - brazo * 10} ${90 + brazo * 40} ${-300 - brazo * 10}`} stroke="#3b4a5a" strokeWidth={24} strokeLinecap="round" fill="none" />
  </g>;
}
function Senor({ x, y, s = 1, brazo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 0 L -40 -150 L 40 -150 L 34 0 Z" fill="#222" stroke={KC.ink} strokeWidth={6} />
    <path d="M -64 -140 L -50 -320 Q 0 -340 50 -320 L 64 -140 Z" fill="#2b2b33" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-366} r={42} fill="#efc9a8" stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 -360 Q -30 -300 0 -296 Q 30 -300 36 -360 Q 20 -340 0 -340 Q -20 -340 -36 -360 Z" fill="#8a8a8a" stroke={KC.ink} strokeWidth={4} />
    <path d={`M -40 -300 Q ${-80 - brazo * 30} ${-260 - brazo * 20} ${-110 - brazo * 30} ${-280 - brazo * 20}`} stroke="#2b2b33" strokeWidth={24} strokeLinecap="round" fill="none" />
  </g>;
}
// Hoja manuscrita pequeña (el trabajo). perdido 0..1 = se vuelve contorno punteado.
function Manuscrito({ x, y, rot = 0, s = 1, perdido = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-80} width={120} height={160} rx={4} fill={PT.papel} stroke={KC.ink} strokeWidth={5} opacity={1 - perdido} />
    {[-50, -30, -10, 10, 30].map((yy) => <line key={yy} x1={-44} y1={yy} x2={44} y2={yy} stroke={PT.lapiz} strokeWidth={3} opacity={(1 - perdido) * 0.7} />)}
    <ellipse cx={20} cy={52} rx={18} ry={7} fill="none" stroke={PT.lapiz} strokeWidth={3} opacity={1 - perdido} />
    {perdido > 0 && <rect x={-60} y={-80} width={120} height={160} rx={4} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="14 12" opacity={perdido} />}
  </g>;
}
// Enoki cultivado (blanco, largo, delgado, sombrerito diminuto) en un paquete genérico sin marca.
function PaqueteEnoki({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 16 }, (_, i) => { const dx = -70 + i * 9.5, top = -430 + (i % 3) * 22, sw = Math.sin(T * 1.2 + i) * 3;
      return <g key={i}><path d={`M ${dx * 0.5} 0 Q ${dx * 0.8} -200 ${dx + sw} ${top}`} stroke="#f6f1e2" strokeWidth={7} fill="none" />
        <ellipse cx={dx + sw} cy={top - 6} rx={11} ry={8} fill="#fbf6e8" stroke="#bdb39a" strokeWidth={2} /></g>; })}
    <path d="M -120 -260 L 120 -260 L 100 30 L -100 30 Z" fill="rgba(200,230,255,.28)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-100} y={-120} width={200} height={90} rx={10} fill="#ffffff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-62} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>ENOKI</text>
  </g>;
}

function PotterShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Au: CUES.Autora, Ci: CUES.Cientos, Ca: CUES.Cartero, Mi: CUES.Microscopio, P: CUES.Pregunta, V: CUES.Vidrio, Hi: CUES.Hifas,
    E: CUES.Estudio, Ms: CUES.Massee, Pe: CUES.Perdido, En: CUES.Enoki, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caeHoja = kprog(T, K.G, K.G + 0.35, kEase.sale);
  const pinta = kprog(T, K.G + 0.15, K.G + 2.3, kEase.suave);
  // esporas del campo microscópico (posiciones fijas)
  const ESP = [[230, 860, 18], [580, 830, -24], [700, 900, 8], [360, 1060, 40], [640, 1120, -10], [860, 780, 70], [180, 1150, -50], [900, 1060, 20]];
  // espora que germinan en "Hifas" (la 3.ª no brota)
  const GERM = [[260, 820, 10], [600, 760, -150], [460, 1000, 60], [800, 980, -40], [220, 1110, 160], [720, 1160, 120]];
  const HIFAS = GERM.map(([x, y, a], i) => { if (i === 2) return null; const r = a * Math.PI / 180, L = 8 * PXUM / 2;
    return genHifa(11 + i * 5, x + Math.cos(r) * L, y + Math.sin(r) * L, r, 420 + (i % 2) * 120, 2); });
  const gH = kprog(T, K.Hi + 0.3, K.Hi + 4.6, kEase.suave);
  const zH = klerp(1.35, 0.7, kprog(T, K.Hi + 0.6, K.Hi + 4.8, kEase.suave));
  // trayectoria del trabajo (Massee → Perdido)
  const entrega = kprog(T, K.Ms + 2.4, K.Ms + 3.4, kEase.suave), regreso = kprog(T, K.Pe + 0.3, K.Pe + 1.2, kEase.suave);
  const perd = kprog(T, K.Pe + 1.6, K.Pe + 2.6);
  const papX = klerp(klerp(320, 560, entrega), 320, regreso), papY = klerp(klerp(860, 850, entrega), 860, regreso) - Math.sin(Math.PI * (regreso > 0 ? regreso : entrega)) * 90;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: se pinta una acuarela de hongos y le cae el sello DATO CIENTÍFICO */}
      <Escena T={T} a={K.G} b={K.Au} zoom={0.04} origen="30% 50%">
        <FondoLunares color={KC.yellow} />
        {psvg(<g transform={`translate(0 ${(1 - caeHoja) * -700})`}>
          <Hoja x={70} y={380} w={560} h={740} rot={-3}>
            <RamitoFlammulina id="acuG" x={340} y={990} s={1} p={pinta} />
          </Hoja>
          {pinta < 1 && <Pincel x={340 + Math.sin(T * 9) * 70} y={990 - 520 * pinta} rot={30 + Math.sin(T * 9) * 8} o={1 - kprog(T, K.G + 2.2, K.G + 2.4)} />}
          <SelloRect T={T} at={K.G + 2.6} x={350} y={1000} lineas={['DATO', 'CIENTÍFICO']} tam={46} />
        </g>)}
      </Escena>
      {/* 1 · la autora: tarjeta-nombre y un conejo de campo que olfatea la acuarela */}
      <Escena T={T} a={K.Au} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {psvg(<>
          <Hoja x={80} y={700} w={430} h={560} rot={-4}>
            <RamitoFlammulina id="acuA" x={290} y={1150} s={0.72} p={1} notas={1} />
          </Hoja>
          <g transform={`translate(${klerp(500, 0, kprog(T, K.Au + 0.8, K.Au + 1.6, kEase.sale))} 0)`}><ConejoCampo T={T} x={790} y={1230} s={1.05} /></g>
        </>)}
      </Escena>
      {/* 2 · cientos de dibujos; uno en corte: laminillas */}
      <Escena T={T} a={K.Ci} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {psvg(<>
          {Array.from({ length: 7 }, (_, i) => { const e = kprog(T, K.Ci + 0.1 + i * 0.12, K.Ci + 0.5 + i * 0.12, kEase.rebote); if (e <= 0) return null;
            const a = -48 + i * 16; return <MiniHoja key={i} x={430 + Math.sin(a * Math.PI / 180) * 420 * e} y={1180 - Math.cos(a * Math.PI / 180) * 330 * e} rot={a * e} tipo={i} s={0.9} />; })}
          {(() => { const e = kprog(T, K.Ci + 1.4, K.Ci + 2.0, kEase.sale); if (e <= 0) return null;
            return <g transform={`translate(0 ${(1 - e) * 600})`}><Hoja x={150} y={700} w={540} h={430} rot={2}><CorteHongo x={420} y={870} s={0.95} /></Hoja></g>; })()}
        </>)}
      </Escena>
      {/* 3 · el cartero naturalista le manda una carta */}
      <Escena T={T} a={K.Ca} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {psvg(<>
          <Cartero x={230} y={1240} s={1.15} brazo={kprog(T, K.Ca + 0.6, K.Ca + 1.0, kEase.sale)} />
          <Hoja x={600} y={760} w={380} h={460} rot={4}><RamitoFlammulina id="acuC" x={790} y={1140} s={0.55} p={1} /></Hoja>
          {(() => { const u = kprog(T, K.Ca + 0.9, K.Ca + 2.1, kEase.suave); if (u <= 0) return null;
            return <Sobre x={klerp(370, 760, u)} y={klerp(860, 820, u) - Math.sin(Math.PI * u) * 260} rot={u * 360 * 0.15 - 10} s={klerp(0.9, 1.1, u)} />; })()}
        </>)}
      </Escena>
      {/* 4 · al microscopio: la cámara entra por el ocular y aparecen las esporas */}
      <Escena T={T} a={K.Mi} b={K.P} zoom={0.02}>
        <FondoLunares color={KC.orange} />
        {psvg(<>
          <g transform={`translate(0 ${(1 - kprog(T, K.Mi, K.Mi + 0.5, kEase.sale)) * 500})`}><Microscopio x={420} y={1260} s={1.0} /></g>
          {(() => { const r = kprog(T, K.Mi + 1.2, K.Mi + 2.0, kEase.suave) * 1500; if (r <= 0) return null;
            return <><circle cx={326} cy={534} r={r} fill={KC.noche} />
              <g opacity={kprog(T, K.Mi + 1.7, K.Mi + 2.3)}>{ESP.map(([x, y, a], i) => <Espora key={i} x={x + Math.sin(T * 0.6 + i) * 8} y={y + Math.cos(T * 0.5 + i) * 6} rot={a + Math.sin(T * 0.4 + i) * 6} s={1.1} />)}</g>
              {/* su dibujo a lápiz al lado */}
              <g opacity={kprog(T, K.Mi + 2.4, K.Mi + 2.9)} transform="translate(80 400) rotate(-4)">
                <rect x={0} y={0} width={330} height={210} rx={6} fill={PT.papel} stroke={KC.ink} strokeWidth={5} />
                {[[90, 80, 15], [200, 70, -20], [150, 150, 30], [260, 150, 5]].map(([x, y, a], i) => <ellipse key={i} cx={x} cy={y} rx={46 * kprog(T, K.Mi + 2.5 + i * 0.15, K.Mi + 2.8 + i * 0.15)} ry={18} transform={`rotate(${a} ${x} ${y})`} fill="none" stroke={PT.lapiz} strokeWidth={4} />)}
              </g></>; })()}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿y si las ponía a crecer? */}
      <Escena T={T} a={K.P} b={K.V} zoom={0.06} origen="25% 50%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} color="rgba(200,230,255,.18)" />
        {psvg(<>
          <Espora x={280} y={930} rot={-12 + Math.sin(T * 1.5) * 5} s={2.6} />
          <text x={280} y={760} textAnchor="middle" style={{ font:`400 ${200 + Math.sin(T * 4) * 10}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">?</text>
        </>)}
      </Escena>
      {/* 6 · sobre vidrio: las esporas caen del sombrero a una gota en la placa */}
      <Escena T={T} a={K.V} b={K.Hi} zoom={0.08} origen="50% 55%">
        <FondoLunares color={KC.cyan} />
        {psvg(<>
          <DefsAcuarela id="acuV" />
          <path d="M 528 420 Q 520 200 540 0 L 580 0 Q 560 200 556 420 Z" fill="#e8c87a" stroke={KC.ink} strokeWidth={6} />
          <g transform="translate(540 560)"><g transform="rotate(4)">
            <path d="M -210 6 Q -200 -150 0 -164 Q 200 -150 210 6 Z" fill={PT.naranja} stroke={KC.ink} strokeWidth={7} />
            <path d="M -200 6 Q 0 50 200 6 Z" fill={PT.lam} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 13 }, (_, i) => <line key={i} x1={-180 + i * 30} y1={8} x2={-160 + i * 26.6} y2={24 - Math.abs(i - 6) * 2} stroke="#b89a5e" strokeWidth={3} />)}
          </g></g>
          {Array.from({ length: 26 }, (_, i) => { const t0 = K.V + 0.3 + i * 0.09, u = kprog(T, t0, t0 + 1.0); if (u <= 0 || u >= 1) return null;
            return <circle key={i} cx={400 + (i * 37) % 280 + Math.sin(u * 6 + i) * 10} cy={600 + u * 310} r={6} fill="#fff7e0" opacity={0.9} />; })}
          <rect x={150} y={850} width={780} height={150} rx={10} fill="rgba(235,250,255,.55)" stroke={KC.ink} strokeWidth={7} />
          <rect x={170} y={862} width={740} height={22} rx={8} fill="#fff" opacity=".5" />
          <ellipse cx={540} cy={925} rx={120 * kprog(T, K.V, K.V + 0.4, kEase.rebote)} ry={34 * kprog(T, K.V, K.V + 0.4, kEase.rebote)} fill="rgba(160,220,255,.8)" stroke={KC.ink} strokeWidth={4} />
          {Array.from({ length: 12 }, (_, i) => T > K.V + 1.3 + i * 0.09 ? <circle key={i} cx={460 + (i * 41) % 160} cy={912 + (i * 13) % 26} r={3.5} fill="#fff7e0" /> : null)}
        </>)}
      </Escena>
      {/* 7 · las esporas germinan: tubo germinativo → hifas (una no brota) */}
      <Escena T={T} a={K.Hi} b={K.E} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1b2640 0%, ${KC.noche} 70%)` }}></div>
        <Ambiente T={T} n={16} color="rgba(200,230,255,.14)" />
        {psvg(<g transform={`translate(540 960) scale(${zH}) translate(-540 -960)`}>
          {HIFAS.map((hs, i) => hs && hs.map((h, j) => <HifaTrazo key={i + '-' + j} h={h} g={gH} grosor={22} />))}
          {GERM.map(([x, y, a], i) => <Espora key={i} x={x} y={y} rot={a} s={1} brillo={i === 2 ? 0.2 : 0.6} />)}
        </g>)}
      </Escena>
      {/* 8 · el estudio: 1897 */}
      <Escena T={T} a={K.E} b={K.Ms} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {psvg(<>
          {[0, 1, 2].map((i) => <Manuscrito key={i} x={330 + i * 210} y={1000 + (i % 2) * 20} rot={-8 + i * 7} s={1.5 * kprog(T, K.E + 0.8 + i * 0.2, K.E + 1.2 + i * 0.2, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 9–10 · la Sociedad Linneana (aún sin socias mujeres); lo lee Massee, como era costumbre; ella lo retira; se pierde */}
      <Escena T={T} a={K.Ms} b={K.En} zoom={0.03}>
        <FondoLunares color={KC.lilac} punto="rgba(255,255,255,.18)" />
        {psvg(<>
          <Edificio x={190} y={720} w={700} h={420} puerta={kprog(T, K.Ms + 0.6, K.Ms + 1.1, kEase.sale)} />
          <text x={540} y={700} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>SOCIEDAD LINNEANA · LONDRES</text>
          <g transform={`translate(${klerp(-300, 0, kprog(T, K.Ms + 0.1, K.Ms + 0.8, kEase.sale))} 0)`}><Dama x={250} y={1150} s={0.85} brazo={Math.max(entrega * (1 - regreso), 0)} /></g>
          <g opacity={kprog(T, K.Ms + 1.8, K.Ms + 2.3)}><Senor x={640} y={1140} s={0.85} brazo={entrega * (1 - regreso)} /></g>
          <Manuscrito x={papX} y={papY} rot={-10 + entrega * 20 - regreso * 20} s={0.8} perdido={perd} />
          {perd > 0 && T < K.Pe + 3.3 && <text x={320} y={1000} textAnchor="middle" opacity={perd * (1 - kprog(T, K.Pe + 2.9, K.Pe + 3.2))} style={{ font:`400 64px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">PERDIDO</text>}
        </>)}
      </Escena>
      {/* 11 · el hongo del trabajo y su primo, el enoki */}
      <Escena T={T} a={K.En} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {psvg(<>
          <path d="M 40 1100 Q 260 1050 520 1090 L 520 1170 L 40 1170 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
          {[[120, 1072], [300, 1062], [450, 1082]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={46} ry={12} fill="#fff" opacity=".9" />)}
          <g transform={`translate(0 ${(1 - kprog(T, K.En + 0.2, K.En + 0.8, kEase.sale)) * 400})`}>
            <RamitoFlammulina id="acuE" x={290} y={1080} s={0.95} p={1} />
          </g>
          <g transform={`translate(${klerp(500, 0, kprog(T, K.En + 2.2, K.En + 2.9, kEase.sale))} 0)`}><PaqueteEnoki x={820} y={1140} s={0.92} T={T} /></g>
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 83 + T * 20 * (1 + i % 3)) % 1080} cy={(i * 131 + T * 60) % 900 + 400} r={4 + (i % 3)} fill="#fff" opacity=".7" />)}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma acuarela del inicio, ahora cuaderno de científica */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="30% 50%">
        <FondoLunares color={KC.yellow} />
        {psvg(<>
          <Hoja x={70} y={380} w={560} h={740} rot={-3}>
            <RamitoFlammulina id="acuZ" x={340} y={990} s={1} p={1} notas={1} />
            {/* anotaciones de cuaderno científico */}
            <g opacity={kprog(T, K.C + 0.5, K.C + 1.0)}>
              <circle cx={540} cy={520} r={70} fill="#fffdf4" stroke={PT.lapiz} strokeWidth={3} />
              <ellipse cx={520} cy={530} rx={26} ry={10} fill="none" stroke={PT.lapiz} strokeWidth={3} transform="rotate(-10 520 530)" />
              <path d="M 545 526 Q 565 510 580 488" stroke={PT.lapiz} strokeWidth={3} fill="none" strokeDasharray="200" strokeDashoffset={200 * (1 - kprog(T, K.C + 0.8, K.C + 1.6))} />
              <text x={470} y={620} style={{ font:`italic 700 20px ${KF.mono}` }} fill={PT.lapiz}>espora → hifa</text>
              <text x={110} y={450} style={{ font:`italic 700 26px ${KF.mono}` }} fill={PT.lapiz}>1897</text>
              <line x1={420} y1={460} x2={500} y2={460} stroke={PT.lapiz} strokeWidth={3} /><text x={420} y={445} style={{ font:`italic 700 18px ${KF.mono}` }} fill={PT.lapiz}>10 µm (espora)</text>
            </g>
          </Hoja>
          <g transform={`translate(${klerp(500, 0, kprog(T, K.C + 1.6, K.C + 2.4, kEase.sale))} 0)`}><ConejoCampo T={T} x={830} y={1250} s={0.9} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.Au + 0.2} until={K.Ci - 0.3} texto="Beatrix Potter" x={540} y={430} tam={64} borde={KC.ink} />
      <Chip T={T} at={K.Au + 0.5} until={K.Ci - 0.3} texto="1866–1943 · Inglaterra" x={540} y={530} tam={36} borde={KC.gold} mono />
      <Chip T={T} at={K.Au + 1.2} until={K.Ci - 0.3} texto="dibujo esquemático, al estilo de sus estudios" x={540} y={615} tam={24} borde={KC.white} mono />
      <Chip T={T} at={K.Ci + 0.3} until={K.Ca - 0.3} texto="cientos de dibujos de hongos" x={360} y={420} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Ci + 2.0} until={K.Ca - 0.3} x={610} y={900} texto="laminillas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.2} until={K.Ca - 0.3} x={450} y={1060} texto="pie" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.3} until={K.Mi - 0.3} texto="Charles McIntosh" x={540} y={430} tam={54} borde={KC.ink} />
      <Chip T={T} at={K.Ca + 0.7} until={K.Mi - 0.3} texto="cartero y naturalista · Perthshire, Escocia" x={540} y={525} tam={28} borde={KC.gold} mono />
      <Etq T={T} at={K.Mi + 2.2} until={K.P - 0.3} x={150} y={690} texto="esporas" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Mi + 2.5} until={K.P - 0.3} x={150} y={740} texto="Flammulina velutipes" it tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Mi + 2.6} until={K.P - 0.3} x={440} y={640} texto="su dibujo a lápiz" tam={24} color={KC.texto} />
      <Etq T={T} at={K.V + 0.6} until={K.Hi - 0.3} x={150} y={1050} texto="placa de vidrio" tam={30} color={KC.ink} />
      <Etq T={T} at={K.V + 1.0} until={K.Hi - 0.3} x={680} y={925} texto="gota" tam={28} color={KC.ink} />
      <Chip T={T} at={K.V + 0.2} until={K.Hi - 0.3} texto="AL MICROSCOPIO · 1896" x={360} y={420} tam={30} borde={KC.ink} mono />
      <Etq T={T} at={K.Hi + 0.4} until={K.E - 0.3} x={60} y={420} texto="espora" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Hi + 1.4} until={K.E - 0.3} x={60} y={470} texto="tubo germinativo" tam={32} color={KC.cyan} />
      <Etq T={T} at={K.Hi + 2.8} until={K.E - 0.3} x={60} y={520} texto="hifas (con tabiques)" tam={32} color={KC.mint} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ms - 0.3} anio="1897" quien="Beatrix Potter · germinación de esporas" revista="On the germination of the spores of Agaricineae" x={540} y={680} />
      <Chip T={T} at={K.Ms + 0.8} until={K.Pe - 0.2} texto="miembros: solo hombres (hasta 1905)" x={350} y={540} tam={24} borde={KC.red} mono />
      <Chip T={T} at={K.Ms + 2.0} until={K.Pe - 0.2} texto="George Massee · micólogo de Kew" x={360} y={400} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ms + 2.4} until={K.Pe - 0.2} texto="lo leyó el 1 abr 1897" x={360} y={470} tam={28} borde={KC.gold} mono />
      <Chip T={T} at={K.Ms + 4.3} until={K.Pe - 0.2} texto="costumbre: lo leía otra persona" x={300} y={610} tam={20} borde={KC.ink} mono />
      <Chip T={T} at={K.Pe + 0.4} until={K.Pe + 3.0} texto="8 abr 1897 · ella lo retira" x={360} y={430} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Pe + 1.8} until={K.Pe + 3.0} texto="nunca se publicó" x={360} y={515} tam={30} borde={KC.red} mono />
      <TarjetaEstudio T={T} at={K.Pe + 3.1} until={K.En - 0.3} anio="1997" quien="secretario de la Sociedad Linneana:" revista="“la trataron vilmente” (The Sunday Times)" x={540} y={600} />
      <Etq T={T} at={K.En + 0.8} until={K.C - 0.3} x={60} y={430} texto="Flammulina velutipes" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.En + 1.2} until={K.C - 0.3} x={60} y={478} texto="silvestre · en madera, en invierno" tam={24} color={KC.ink} />
      <Etq T={T} at={K.En + 0.9} until={K.C - 0.3} x={60} y={540} texto="el hongo de su trabajo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.En + 3.0} until={K.C - 0.3} x={1040} y={700} texto="enoki · Flammulina filiformis" it tam={28} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.En + 3.8} until={K.C - 0.3} texto="se separaron en 2018 por su ADN" x={700} y={610} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="el cuaderno de una científica" x={380} y={330} tam={34} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscalaP T={T} at={K.G} until={K.Au} texto="5 cm (hoja)" largo={150} />
      <BarraEscalaP T={T} at={K.Au} until={K.Ci} texto="5 cm (hoja)" largo={110} />
      <BarraEscalaP T={T} at={K.Ci} until={K.Ca} texto="5 cm (hoja)" largo={120} />
      <BarraEscalaP T={T} at={K.Ca} until={K.Mi} texto="50 cm" largo={180} />
      <BarraEscalaP T={T} at={K.Mi} until={K.Mi + 1.6} texto="10 cm" largo={150} />
      <BarraEscalaP T={T} at={K.Mi + 1.6} until={K.V} texto="10 µm" largo={176} />
      <BarraEscalaP T={T} at={K.V} until={K.Hi} texto="1 cm" largo={60} />
      <BarraEscalaP T={T} at={K.Hi} until={K.E} texto={zH > 0.95 ? '10 µm' : '20 µm'} largo={zH > 0.95 ? 160 * zH : 320 * zH} />
      <BarraEscalaP T={T} at={K.E} until={K.En} texto="dibujo esquemático" largo={0} />
      <BarraEscalaP T={T} at={K.En} until={K.C} texto="5 cm" largo={140} />
      <BarraEscalaP T={T} at={K.C} until={K.Ou} texto="5 cm (hoja)" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Au - 0.1} texto="No es un adorno: es un *dato científico.*" />
      <Subtitulo T={T} idx={1} at={K.Au + 0.1} until={K.Ci - 0.1} texto="Así pintaba hongos *Beatrix Potter.*" />
      <Subtitulo T={T} idx={2} at={K.Ci + 0.1} until={K.Ca - 0.1} texto="Cientos de hongos, *con sus laminillas.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Mi - 0.1} texto="Un cartero *experto en hongos.*" />
      <Subtitulo T={T} idx={4} at={K.Mi + 0.1} until={K.P - 0.1} texto="Al microscopio *dibujó sus esporas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.V - 0.1} texto="¿Y si las ponía *a crecer?*" />
      <Subtitulo T={T} idx={6} at={K.V + 0.1} until={K.Hi - 0.1} texto="Esporas sembradas *sobre vidrio.*" />
      <Subtitulo T={T} idx={7} at={K.Hi + 0.1} until={K.E - 0.1} texto="Un tubito, luego *hifas.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ms - 0.1} texto="1897: *cómo germinan las esporas.*" />
      <Subtitulo T={T} idx={9} at={K.Ms + 0.1} until={K.Pe - 0.1} texto="Lo leyó Massee, *como era costumbre.*" />
      <Subtitulo T={T} idx={10} at={K.Pe + 0.1} until={K.En - 0.1} texto="Se retiró y *se perdió.*" />
      <Subtitulo T={T} idx={11} at={K.En + 0.1} until={K.C - 0.1} texto="Primo del *enoki del súper.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="El cuaderno de *una científica.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ci + 0.2, K.Ca - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Mi + 0.3, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.V - 0.1, 'avatar_06_pensativo_menton', 'grande'],
        [K.Hi + 1.4, K.E - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ms + 1.0, K.Pe - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pe + 3.1, K.En - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.En + 1.4, K.C - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="139" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Barra de escala fija (texto + barra), debajo del subtítulo.
function BarraEscalaP({ T, texto, largo = 200, x = 60, y = 1430, at = -1, until, color = KC.texto }) {
  if (T < at || (until != null && T > until)) return null;
  const o = kprog(T, at, at + 0.3) * (until != null ? 1 - kprog(T, until - 0.3, until) : 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA, opacity:o }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    {largo > 0 && <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>}
  </div>;
}

function PotterApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PotterShot /></CompositionStage></div>;
}
window.PotterApp = PotterApp;
