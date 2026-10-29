// Shot Científico #48 · Los bebés tienen más piezas de hueso que tú — NARRADO (N4 "La imagen que se llena" + N2 300 contra 206).
// Datos: Cleveland Clinic 2024, MedlinePlus 2025, Belcastro 2008, Ogden 1984. Ver guion.md y verificacion.md.
// Dibujos amables: cuerpos con cara sonriente y los huesos vistos por dentro (esquemáticos), nunca calaveras.
const HUESO = '#f4ecd8', CART = '#7fc8ff', MEMB = '#f6b9a2';
const colorPieza = (u) => mixHex(CART, HUESO, kclamp(u, 0, 1));

// Hueso largo de (x1,y1) a (x2,y2): caña + dos extremos. u = 0 extremos separados y de cartílago; 1 = un solo hueso.
function HuesoLargo({ x1, y1, x2, y2, w = 26, u = 1, sep = 18, sw = 5 }) {
  const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), g = sep * (1 - u);
  const caña = mixHex('#e8c9a0', HUESO, u);
  return <g transform={`translate(${x1} ${y1}) rotate(${a * 180 / Math.PI})`}>
    <rect x={w * 0.55} y={-w / 2} width={Math.max(4, L - w * 1.1)} height={w} rx={w / 2.4} fill={caña} stroke={KC.ink} strokeWidth={sw} />
    <ellipse cx={-g} cy={0} rx={w * 0.72} ry={w * 0.85} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={sw} />
    <ellipse cx={L + g} cy={0} rx={w * 0.72} ry={w * 0.85} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={sw} />
  </g>;
}

// Cuerpo con los huesos por dentro. (x, yPies) = pies; alto en px; k: 0 bebé → 1 adulto (proporciones); u: 0 piezas sueltas → 1 unidas.
// sale 0..1: las piezas van apareciendo una a una (gancho). T para el meneo.
function Cuerpo({ x = 0, yPies = 0, alto = 600, k = 0, u = 0, sale = 1, T = 0, piel = CPIEL, o = 1, cara = 1 }) {
  const s = alto / 1000;
  const hr = klerp(185, 82, k), hy = -1000 + hr;                    // cabeza
  const sy = hy + hr + klerp(25, 45, k);                             // hombros
  const hipY = klerp(-360, -500, k), sw = klerp(135, 150, k), hw = klerp(115, 105, k);
  const brazo = klerp(330, 440, k);
  let n = 0; const N = 46;
  const vis = () => { const i = n++; return kclamp((sale * N - i) / 2.5, 0, 1); };     // aparición escalonada
  const P = ({ children, cx = 0, cy = 0 }) => { const v = vis(); if (v <= 0) return null; const e = kEase.rebote(v);
    return <g transform={`translate(${cx} ${cy}) scale(${e}) translate(${-cx} ${-cy})`} opacity={Math.min(1, v * 2)}>{children}</g>; };
  const mv = Math.sin(T * 2.2) * 4;
  // vértebras
  const nv = 9, vert = Array.from({ length: nv }, (_, i) => klerp(sy + 20, hipY - 50, i / (nv - 1)));
  const gap = 10 * (1 - u);
  return <g transform={`translate(${x} ${yPies}) scale(${s})`} opacity={o}>
    {/* silueta de piel (translúcida, para ver por dentro) */}
    <g opacity={0.55}>
      <line x1={-sw + 20} y1={sy + 30} x2={-sw - 40} y2={sy + brazo + mv} stroke={piel} strokeWidth={95} strokeLinecap="round" />
      <line x1={sw - 20} y1={sy + 30} x2={sw + 40} y2={sy + brazo - mv} stroke={piel} strokeWidth={95} strokeLinecap="round" />
      <line x1={-hw + 45} y1={hipY + 40} x2={-hw + 30} y2={-40} stroke={piel} strokeWidth={115} strokeLinecap="round" />
      <line x1={hw - 45} y1={hipY + 40} x2={hw - 30} y2={-40} stroke={piel} strokeWidth={115} strokeLinecap="round" />
      <rect x={-sw - 10} y={sy - 10} width={(sw + 10) * 2} height={hipY - sy + 90} rx={klerp(110, 70, k)} fill={piel} />
    </g>
    <rect x={-sw - 10} y={sy - 10} width={(sw + 10) * 2} height={hipY - sy + 90} rx={klerp(110, 70, k)} fill="none" stroke={KC.ink} strokeWidth={8} opacity={0.5} />
    <circle cx={0} cy={hy} r={hr} fill={piel} stroke={KC.ink} strokeWidth={9} />
    {/* columna */}
    {vert.map((vy, i) => <P key={'v' + i} cx={0} cy={vy}><rect x={-20} y={vy - 11} width={40} height={22} rx={9} fill={HUESO} stroke={KC.ink} strokeWidth={4} /></P>)}
    {/* costillas */}
    {[0, 1, 2, 3, 4].map((i) => { const ry = sy + 45 + i * klerp(34, 42, k), an = sw - 15 - i * 4;
      return <P key={'c' + i} cx={0} cy={ry}><path d={`M -14 ${ry} C ${-an} ${ry - 12} ${-an} ${ry + 30} ${-an * 0.55} ${ry + 38} M 14 ${ry} C ${an} ${ry - 12} ${an} ${ry + 30} ${an * 0.55} ${ry + 38}`}
        fill="none" stroke={KC.ink} strokeWidth={15} strokeLinecap="round" /><path d={`M -14 ${ry} C ${-an} ${ry - 12} ${-an} ${ry + 30} ${-an * 0.55} ${ry + 38} M 14 ${ry} C ${an} ${ry - 12} ${an} ${ry + 30} ${an * 0.55} ${ry + 38}`}
        fill="none" stroke={HUESO} strokeWidth={7} strokeLinecap="round" /></P>; })}
    {/* base de la columna (sacro): 5 piezas → 1 */}
    {[0, 1, 2, 3, 4].map((i) => { const yy = hipY - 30 + i * (18 + gap * 0.6), ww = 46 - i * 7;
      return <P key={'s' + i} cx={0} cy={yy}><rect x={-ww / 2} y={yy} width={ww} height={16 + 2 * u} rx={6} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={4} /></P>; })}
    {/* cadera: 3 piezas por lado → 1 */}
    {[-1, 1].map((d) => <g key={'h' + d}>
      <P cx={d * 70} cy={hipY - 20}><path d={`M ${d * 30} ${hipY - 50} C ${d * 110} ${hipY - 90} ${d * (hw + 30)} ${hipY - 40} ${d * (hw + 5)} ${hipY + 10 - gap} L ${d * 40} ${hipY + 10 - gap} Z`} fill={HUESO} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></P>
      <P cx={d * 70} cy={hipY + 30}><path d={`M ${d * (hw - 5)} ${hipY + 20 + gap} L ${d * 70} ${hipY + 20 + gap} L ${d * 75} ${hipY + 70} C ${d * 95} ${hipY + 80} ${d * hw} ${hipY + 60} ${d * (hw - 5)} ${hipY + 20 + gap} Z`} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></P>
      <P cx={d * 40} cy={hipY + 35}><path d={`M ${d * (60 - gap)} ${hipY + 20 + gap} L ${d * 12} ${hipY + 40} L ${d * 14} ${hipY + 62} L ${d * (66 - gap)} ${hipY + 60} Z`} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></P>
    </g>)}
    {/* brazos */}
    {[-1, 1].map((d) => { const x0 = d * (sw - 10), y0 = sy + 25, x1 = d * (sw + 10), y1 = sy + brazo * 0.5 + (d < 0 ? mv : -mv) * 0.5, x2 = d * (sw + 40), y2 = sy + brazo * 0.95 + (d < 0 ? mv : -mv);
      return <g key={'b' + d}><P cx={(x0 + x1) / 2} cy={(y0 + y1) / 2}><HuesoLargo x1={x0} y1={y0} x2={x1} y2={y1} w={24} u={u} sep={16} /></P>
        <P cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}><HuesoLargo x1={x1 + d * 4} y1={y1 + 30} x2={x2} y2={y2} w={18} u={u} sep={14} /></P>
        <P cx={x2} cy={y2 + 40}><circle cx={x2 + d * 6} cy={y2 + 42} r={20} fill={colorPieza(u * 0.6 + 0.4)} stroke={KC.ink} strokeWidth={4} /></P></g>; })}
    {/* piernas + rótula */}
    {[-1, 1].map((d) => { const x0 = d * (hw - 40), y0 = hipY + 50, x1 = d * (hw - 35), y1 = klerp(hipY + 50, -40, 0.5), x2 = d * (hw - 32), y2 = -60;
      return <g key={'p' + d}><P cx={x0} cy={(y0 + y1) / 2}><HuesoLargo x1={x0} y1={y0 + 20} x2={x1} y2={y1 - 20} w={30} u={u} sep={18} /></P>
        <P cx={x1} cy={y1}><ellipse cx={x1 + d * 0} cy={y1 + 2} rx={20} ry={22} fill={colorPieza(u)} stroke={KC.ink} strokeWidth={4} /></P>
        <P cx={x1} cy={(y1 + y2) / 2}><HuesoLargo x1={x1} y1={y1 + 30} x2={x2} y2={y2} w={26} u={u} sep={16} /></P>
        <P cx={x2} cy={-20}><ellipse cx={x2 + d * 18} cy={-18} rx={42} ry={18} fill={colorPieza(u * 0.5 + 0.5)} stroke={KC.ink} strokeWidth={4} /></P></g>; })}
    {/* cráneo: placas sobre la frente (gajos separados en el bebé) */}
    {[0, 1, 2, 3].map((i) => { const a0 = Math.PI * (1.05 + i * 0.225) + (i ? 0.09 : 0) * (1 - u), a1 = Math.PI * (1.05 + (i + 1) * 0.225) - (i < 3 ? 0.09 : 0) * (1 - u), r = hr * 0.8;
      const d = `M ${Math.cos(a0) * r} ${hy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${Math.cos(a1) * r} ${hy + Math.sin(a1) * r}`;
      return <P key={'k' + i} cx={0} cy={hy - hr * 0.6}><path d={d} fill="none" stroke={KC.ink} strokeWidth={hr * 0.2 + 8} strokeLinecap="round" /><path d={d} fill="none" stroke={HUESO} strokeWidth={hr * 0.2} strokeLinecap="round" /></P>; })}
    {/* cara amable */}
    {cara > 0 && <g>
      <ellipse cx={-hr * 0.36} cy={hy + hr * 0.2} rx={hr * 0.1} ry={hr * 0.13 * (Math.sin(T * 1.3) > 0.97 ? 0.15 : 1)} fill={KC.ink} />
      <ellipse cx={hr * 0.36} cy={hy + hr * 0.2} rx={hr * 0.1} ry={hr * 0.13 * (Math.sin(T * 1.3) > 0.97 ? 0.15 : 1)} fill={KC.ink} />
      <circle cx={-hr * 0.55} cy={hy + hr * 0.45} r={hr * 0.12} fill="#ff8fa3" opacity=".7" /><circle cx={hr * 0.55} cy={hy + hr * 0.45} r={hr * 0.12} fill="#ff8fa3" opacity=".7" />
      <path d={`M ${-hr * 0.2} ${hy + hr * 0.48} Q 0 ${hy + hr * 0.68} ${hr * 0.2} ${hy + hr * 0.48}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
      {k < 0.5 && <path d={`M -10 ${hy - hr + 6} q 30 -40 50 -5`} fill="none" stroke={CPELO} strokeWidth={10} strokeLinecap="round" opacity={1 - k * 2} />}
    </g>}
  </g>;
}

// Cráneo de bebé visto desde arriba (la nariz hacia arriba). u: 0 placas separadas → 1 cerradas.
// aprieta 0..1: las placas se enciman (se acomoda al nacer). cerebro 0..1: se ve el cerebro y la cabeza crece.
// cierraAtras / cierraArriba (0..1) cierran cada fontanela por separado. marca: 'arriba' | 'atras' | null (resalta una).
function CraneoArriba({ x, y, s = 1, T = 0, aprieta = 0, cerebro = 0, cierraAtras = 0, cierraArriba = 0, marca = null, toque = 0 }) {
  const sx = 1 - 0.13 * aprieta + 0.1 * cerebro, sy = 1 + 0.04 * aprieta + 0.08 * cerebro;
  const ga = 1 - cierraArriba, gp = 1 - cierraAtras, su = Math.max(0.15, 1 - aprieta * 0.85);
  const late = 1 + 0.06 * Math.sin(T * 5);
  const sut = (d, w) => <><path d={d} fill="none" stroke={KC.ink} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" /><path d={d} fill="none" stroke={MEMB} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></>;
  const aw = 62 * ga * su, ah = 88 * ga, pw = 34 * gp * su;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* orejas y nariz */}
    <ellipse cx={-300 * sx} cy={-10} rx={38} ry={70} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={300 * sx} cy={-10} rx={38} ry={70} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-365 * sy} rx={46} ry={40} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <g transform={`scale(${sx} ${sy})`}>
      <ellipse cx={0} cy={0} rx={295} ry={350} fill={CPIEL} stroke={KC.ink} strokeWidth={10 / sx} />
      {/* hueso visto por dentro */}
      <ellipse cx={0} cy={0} rx={255} ry={310} fill={HUESO} stroke={KC.ink} strokeWidth={6} opacity={0.95} />
      {cerebro > 0 && <g opacity={cerebro * 0.85}>
        <ellipse cx={0} cy={10} rx={230} ry={285} fill="#f7a8c0" />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-200 + i * 50} -230 q 30 60 0 120 q -30 60 0 120 q 30 60 0 120 q -20 50 0 100`} fill="none" stroke="#d76a8e" strokeWidth={9} strokeLinecap="round" />)}
        <line x1={0} y1={-270} x2={0} y2={290} stroke="#c2577c" strokeWidth={10} />
      </g>}
      {/* suturas */}
      {sut('M 0 -310 L 0 -60', 18 * su)}
      {sut('M 0 -60 L 0 215', 18 * su)}
      {sut('M -250 -10 Q 0 -110 250 -10', 18 * su)}
      {sut('M -232 140 L 0 215 L 232 140', 16 * su)}
      {/* fontanela de arriba (rombo) y de atrás (triángulo) */}
      {ga > 0.02 && <path d={`M 0 ${-60 - ah} L ${aw} -60 L 0 ${-60 + ah} L ${-aw} -60 Z`} fill={MEMB} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round"
        transform={`translate(0 -60) scale(${marca === 'arriba' ? late : 1}) translate(0 60)`} />}
      {gp > 0.02 && <path d={`M 0 ${215 - 18 * gp} L ${pw} ${215 + 30 * gp} L ${-pw} ${215 + 30 * gp} Z`} fill={MEMB} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
      {marca === 'arriba' && ga > 0.02 && <ellipse cx={0} cy={-60} rx={aw + 34} ry={ah + 34} fill="none" stroke={KC.yellow} strokeWidth={9} strokeDasharray="18 12" strokeDashoffset={-T * 40} />}
      {marca === 'atras' && gp > 0.02 && <circle cx={0} cy={222} r={64} fill="none" stroke={KC.yellow} strokeWidth={9} strokeDasharray="18 12" strokeDashoffset={-T * 40} />}
      {/* rizo de pelo */}
      <path d="M -30 -330 q 40 -50 70 -10 q -30 -10 -40 20" fill="none" stroke={CPELO} strokeWidth={12} strokeLinecap="round" />
    </g>
    {/* dedo que toca (con cuidado) la fontanela de arriba */}
    {toque > 0 && <g transform={`translate(${klerp(420, 46, toque)} ${klerp(260, -40, toque)}) rotate(-32)`}>
      <rect x={-34} y={0} width={68} height={300} rx={34} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <path d="M -20 30 q 20 -18 40 0" fill="none" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
      <path d="M -20 150 q 20 -14 40 0 M -20 180 q 20 -14 40 0" fill="none" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
      <rect x={-70} y={240} width={150} height={190} rx={60} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <rect x={-22} y={8} width={44} height={40} rx={16} fill="#ffe4dc" stroke={KC.ink} strokeWidth={4} opacity=".8" />
    </g>}
  </g>;
}

// Pelvis de frente: 3 piezas por lado + sacro de 5 piezas. u 0..1 se van uniendo.
function Pelvis({ x, y, s = 1, u = 0 }) {
  const g = 26 * (1 - u), c = colorPieza(u);
  const hueso = (d, fill = HUESO) => <path d={d} fill={fill} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* vértebras lumbares */}
    {[0, 1, 2].map((i) => <rect key={i} x={-60} y={-330 + i * 70} width={120} height={56} rx={18} fill={HUESO} stroke={KC.ink} strokeWidth={8} />)}
    {/* sacro: 5 piezas */}
    {[0, 1, 2, 3, 4].map((i) => { const w = 150 - i * 24, yy = -110 + i * (44 + g * 0.5);
      return <rect key={'s' + i} x={-w / 2} y={yy} width={w} height={40 + 6 * u} rx={14} fill={c} stroke={KC.ink} strokeWidth={7} />; })}
    {[-1, 1].map((d) => <g key={d}>
      {/* ilion (ala) */}
      {hueso(`M ${d * (95 + g * 0.5)} -110 C ${d * 200} -260 ${d * 420} -230 ${d * 400} -60 C ${d * 390} 0 ${d * 330} 40 ${d * (300)} ${60 - g} L ${d * (170)} ${60 - g} C ${d * 130} 20 ${d * 100} -30 ${d * (95 + g * 0.5)} -110 Z`)}
      {/* isquion */}
      {hueso(`M ${d * 300} ${70 + g} L ${d * 220} ${70 + g} L ${d * 210} 230 C ${d * 250} 300 ${d * 330} 290 ${d * 330} 220 Z`, c)}
      {/* pubis */}
      {hueso(`M ${d * (200 - g)} ${70 + g} L ${d * (30 + g * 0.3)} 150 L ${d * (30 + g * 0.3)} 210 L ${d * (190 - g)} 200 Z`, c)}
      {/* cabeza del fémur en su hueco */}
      <circle cx={d * 255} cy={95} r={44} fill={HUESO} stroke={KC.ink} strokeWidth={8} />
      <path d={`M ${d * 270} 120 L ${d * 330} 260 L ${d * 345} 400`} fill="none" stroke={KC.ink} strokeWidth={70} strokeLinecap="round" />
      <path d={`M ${d * 270} 120 L ${d * 330} 260 L ${d * 345} 400`} fill="none" stroke={HUESO} strokeWidth={54} strokeLinecap="round" />
    </g>)}
  </g>;
}

// Rótula por dentro: cartílago azul que se vuelve hueso desde varios puntos que crecen y se juntan (u 0..1).
function RotulaDentro({ r, u = 0, T = 0 }) {
  const focos = [[-30, -40], [35, -10], [-10, 40], [25, 55]];
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
    <g transform={`translate(${r} ${r})`}>
      <ellipse cx={0} cy={0} rx={r * 0.55} ry={r * 0.7} fill={CART} stroke={KC.ink} strokeWidth={8} />
      <clipPath id="rotclip"><ellipse cx={0} cy={0} rx={r * 0.55} ry={r * 0.7} /></clipPath>
      <g clipPath="url(#rotclip)">{focos.map(([fx, fy], i) => { const rr = kclamp(u * 1.4 - i * 0.12, 0, 1) * r * 0.75;
        return rr > 1 ? <circle key={i} cx={fx * r / 200} cy={fy * r / 200} r={rr} fill={HUESO} /> : null; })}</g>
      <ellipse cx={0} cy={0} rx={r * 0.55} ry={r * 0.7} fill="none" stroke={KC.ink} strokeWidth={8} />
      <text x={0} y={-r * 0.78} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>rótula</text>
    </g>
  </svg>;
}

// Pierna de bebé sentado (de lado): muslo y pierna con la rodilla al frente. (x, y) = rodilla.
function PiernaBebe({ x, y, s = 1, T = 0 }) {
  const p = Math.sin(T * 2) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -520 -40 C -300 -120 -80 -110 0 -40 C 40 0 30 60 0 80 C -120 60 -330 70 -520 140 Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g transform={`rotate(${p} 0 0)`}>
      <path d={`M -40 30 C 20 40 70 60 70 120 L 90 420 C 90 470 30 480 0 460 L -60 120 Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <path d={`M -10 440 C 60 420 170 430 200 470 C 220 510 150 530 60 520 C 0 520 -30 490 -10 440 Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    </g>
    {/* pliegues gorditos */}
    <path d="M -300 -70 q 20 30 0 60 M -180 -80 q 20 30 0 60" fill="none" stroke={CPIEL2} strokeWidth={7} strokeLinecap="round" />
    <rect x={-560} y={-60} width={140} height={210} rx={40} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} opacity=".95" />
  </g>;
}

// Barra de progreso "al crecer" con texto.
function BarraCrece({ T, at, until, p, x = 140, y = 420, ancho = 800, texto, fin, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:41, opacity:e.o, transform:`translateY(${e.y * 0.4}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', font:`900 36px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:10 }}><span>{texto}</span><span>{fin}</span></div>
    <div style={{ height:34, borderRadius:20, background:'rgba(14,15,18,.75)', border:`5px solid ${KC.ink}`, overflow:'hidden' }}>
      <div style={{ width:`${p * 100}%`, height:'100%', background:color }}></div>
    </div>
  </div>;
}

function BebesHuesos() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const uF = kprog(T, K.Fusion + 0.6, K.Fusion + 3.2, kEase.suave);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: bebé (≈ 300 piezas) contra adulto (206) */}
      <Escena T={T} a={K.Gancho} b={K.Cartilago}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Cuerpo x={300} yPies={1170} alto={560} k={0} u={0} sale={kprog(T, K.Gancho, K.Gancho + 2.6)} T={T} />
          <g transform={`translate(${(1 - kprog(T, K.Gancho + 4.2, K.Gancho + 4.9, kEase.sale)) * 600} 0)`}>
            <Cuerpo x={790} yPies={1170} alto={700} k={1} u={1} sale={kprog(T, K.Gancho + 4.3, K.Gancho + 5.6)} T={T} piel="#e9a27c" />
          </g>
        </Lienzo>
        <NumeroGigante T={T} at={K.Gancho + 0.15} until={K.Cartilago - 0.2} valor={300} dur={2.4} prefijo="≈ " etiqueta="piezas · bebé" x={300} y={440} tam={170} color={KC.yellow} />
        <NumeroGigante T={T} at={K.Gancho + 4.4} until={K.Cartilago - 0.2} valor={206} dur={0.9} etiqueta="huesos · adulto" x={790} y={330} tam={170} color={KC.cyan} />
      </Escena>
      {/* 1 · en parte cartílago */}
      <Escena T={T} a={K.Cartilago} b={K.Fusion} zoom={0.08} origen="30% 60%">
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Cuerpo x={260} yPies={1500} alto={1000} k={0} u={0} T={T} />
        </Lienzo>
        <Lupa T={T} at={K.Cartilago + 0.4} until={K.Fusion - 0.15} x={720} y={720} r={230} fx={170} fy={1350} tinte={CART} etiqueta="POR DENTRO · HUESO DE BEBÉ"
          interior={(t, r) => { const dob = Math.sin(t * 3) * 8 * kprog(t, K.Cartilago + 1.6, K.Cartilago + 2.2);
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" />
              <g transform={`translate(${r} ${r}) rotate(${-35 + dob})`}><HuesoLargo x1={-105} y1={0} x2={105} y2={0} w={58} u={0} sep={26} sw={7} /></g>
              <text x={r + 95} y={r - 120} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={CART}>cartílago</text>
              <text x={r - 40} y={r + 110} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={HUESO}>hueso</text></svg>; }} />
        <Chip T={T} at={K.Cartilago + 2.0} until={K.Fusion - 0.15} texto="cartílago: más flexible" x={560} y={1090} tam={40} borde={CART} />
      </Escena>
      {/* 2 · se van uniendo */}
      <Escena T={T} a={K.Fusion} b={K.Craneo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(520 ${830}) rotate(-8)`}>
            <HuesoLargo x1={-300} y1={0} x2={300} y2={0} w={120} u={uF} sep={150} sw={9} />
          </g>
        </Lienzo>
        <BarraCrece T={T} at={K.Fusion + 0.3} until={K.Craneo - 0.15} p={uF} texto="al crecer →" fin={uF > 0.98 ? '1 solo hueso' : 'varias piezas'} x={140} y={1040} />
      </Escena>
      {/* 3 · el cráneo: placas y fontanelas */}
      <Escena T={T} a={K.Craneo} b={K.Parto} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <CraneoArriba x={500} y={800} s={1.05} T={T} marca={T > K.Craneo + 3.6 ? 'arriba' : null}
            toque={kprog(T, K.Craneo + 0.4, K.Craneo + 1.4, kEase.sale) * (1 - kprog(T, K.Craneo + 3.2, K.Craneo + 3.8))} />
        </Lienzo>
        <Chip T={T} at={K.Craneo + 0.3} until={K.Craneo + 3.3} texto="un ejemplo que puedes tocar" x={540} y={400} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Craneo + 2.6} until={K.Craneo + 4.4} x={770} y={640} texto="placas" lado="der" />
        <Chip T={T} at={K.Craneo + 3.6} until={K.Parto - 0.15} texto="fontanelas: puntos blanditos" x={540} y={400} tam={40} borde={MEMB} />
        <Etq T={T} at={K.Craneo + 4.2} until={K.Parto - 0.15} x={565} y={705} texto="de arriba" lado="der" color={KC.yellow} tam={40} />
        <Etq T={T} at={K.Craneo + 4.9} until={K.Parto - 0.15} x={500} y={1050} texto="de atrás" lado="der" color={KC.yellow} tam={40} />
      </Escena>
      {/* 4 · se acomoda al nacer y deja crecer al cerebro */}
      <Escena T={T} a={K.Parto} b={K.Cierra} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {(() => { const ap = kprog(T, K.Parto + 0.3, K.Parto + 1.2, kEase.suave) * (1 - kprog(T, K.Parto + 2.2, K.Parto + 2.8, kEase.suave));
            const ce = kprog(T, K.Parto + 2.6, K.Parto + 4.4, kEase.suave);
            return <g>
              <CraneoArriba x={500} y={800} s={1.0} T={T} aprieta={ap} cerebro={ce} />
              {[-1, 1].map((d) => <path key={d} d={`M ${500 + d * (480 - 60 * ap)} 480 Q ${500 + d * (380 - 70 * ap)} 800 ${500 + d * (480 - 60 * ap)} 1120`} fill="none" stroke={KC.violet} strokeWidth={30} strokeLinecap="round" opacity={ap} />)}
              {ce > 0.05 && [0, 1, 2, 3, 4, 5].map((i) => { const a = i / 6 * Math.PI * 2 + 0.5, f = (T * 0.8 + i / 6) % 1;
                return <g key={i} opacity={ce * (1 - f)}><FlechaRecta x1={500 + Math.cos(a) * 300} y1={800 + Math.sin(a) * 350} x2={500 + Math.cos(a) * (360 + f * 60)} y2={800 + Math.sin(a) * (410 + f * 60)} color={KC.yellow} grosor={10} punta={24} /></g>; })}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Parto + 0.3} until={K.Parto + 2.5} texto="se acomoda al nacer" x={540} y={400} tam={42} borde={KC.yellow} />
        <Chip T={T} at={K.Parto + 2.7} until={K.Cierra - 0.15} texto="espacio para el cerebro" x={540} y={400} tam={42} borde="#f7a8c0" />
      </Escena>
      {/* 5 · calendario de las fontanelas */}
      <Escena T={T} a={K.Cierra} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        {(() => { const X0 = 300, PX = 34, mx = (m) => X0 + m * PX;
          const pa = kprog(T, K.Cierra + 0.4, K.Cierra + 2.0, kEase.sale), pb = kprog(T, K.Cierra + 3.4, K.Cierra + 5.6, kEase.sale);
          const cur = T < K.Cierra + 3.2 ? klerp(0, 2.5, pa) : klerp(7, 19, pb);
          return <Lienzo>
            <rect x={60} y={500} width={960} height={680} rx={40} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={8} />
            {/* fila 1: atrás */}
            <CraneoArriba x={165} y={680} s={0.2} T={T} cierraAtras={pa} marca="atras" />
            <text x={X0} y={600} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>atrás</text>
            <rect x={X0} y={640} width={20 * PX} height={44} rx={22} fill="rgba(255,255,255,.12)" />
            <rect x={X0} y={640} width={Math.max(44, 2.5 * PX * pa)} height={44} rx={22} fill={MEMB} stroke={KC.ink} strokeWidth={5} />
            <text x={X0 + 2.5 * PX + 24} y={676} style={{ font:`700 34px ${KF.mono}` }} fill={MEMB} opacity={kprog(T, K.Cierra + 1.2, K.Cierra + 1.7)}>primeros meses</text>
            {/* fila 2: arriba */}
            <CraneoArriba x={165} y={930} s={0.2} T={T} cierraArriba={pb} marca="arriba" />
            <text x={X0} y={850} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} opacity={kprog(T, K.Cierra + 2.6, K.Cierra + 3.0)}>arriba</text>
            <rect x={X0} y={890} width={20 * PX} height={44} rx={22} fill="rgba(255,255,255,.12)" />
            {pb > 0 && <rect x={mx(7)} y={890} width={Math.max(44, 12 * PX * pb)} height={44} rx={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
            <text x={mx(13)} y={990} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.yellow} opacity={kprog(T, K.Cierra + 4.4, K.Cierra + 4.9)}>7–19 meses</text>
            {/* eje */}
            <line x1={X0} y1={1080} x2={mx(20)} y2={1080} stroke={KC.texto} strokeWidth={5} />
            {[0, 7, 19].map((m) => <g key={m}><line x1={mx(m)} y1={1066} x2={mx(m)} y2={1094} stroke={KC.texto} strokeWidth={5} />
              <text x={mx(m)} y={1140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{m === 0 ? 'al nacer' : m}</text></g>)}
            <text x={mx(20)} y={1062} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.7)">meses →</text>
            <circle cx={mx(cur)} cy={1080} r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          </Lienzo>; })()}
        <Chip T={T} at={K.Cierra + 0.2} until={K.Pregunta - 0.15} texto="¿cuándo se cierran?" x={540} y={420} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Cadera} color={KC.orange} />
      {/* 7 · cadera y base de la columna: hasta la edad adulta */}
      <Escena T={T} a={K.Cadera} b={K.Rodilla} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Pelvis x={540} y={860} s={0.9} u={kprog(T, K.Cadera + 1.2, K.Cadera + 4.8, kEase.suave)} />
        </Lienzo>
        <BarraCrece T={T} at={K.Cadera + 0.6} until={K.Rodilla - 0.15} p={kprog(T, K.Cadera + 1.2, K.Cadera + 4.8, kEase.suave)} texto="al crecer →" fin="edad adulta" x={140} y={420} color={KC.orange} />
        <Etq T={T} at={K.Cadera + 0.9} until={K.Rodilla - 0.15} x={70} y={590} texto="cadera" lado="der" color={KC.orange} tam={40} />
        <Etq T={T} at={K.Cadera + 1.6} until={K.Rodilla - 0.15} x={560} y={1060} texto="base de la columna" lado="der" color={KC.orange} tam={36} />
      </Escena>
      {/* 8 · rótula: casi toda cartílago */}
      <Escena T={T} a={K.Rodilla} b={K.Total} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><g transform="translate(1120 0) scale(-1 1)"><PiernaBebe x={560} y={820} s={0.8} T={T} /></g></Lienzo>
        <Lupa T={T} at={K.Rodilla + 0.4} until={K.Total - 0.15} x={330} y={700} r={210} fx={560} fy={815} tinte={KC.yellow} etiqueta="POR DENTRO · RÓTULA"
          interior={(t, r) => <RotulaDentro r={r} u={kprog(t, K.Rodilla + 2.4, K.Rodilla + 5.2, kEase.suave)} T={t} />} />
        <BarraCrece T={T} at={K.Rodilla + 2.2} until={K.Total - 0.15} p={kprog(T, K.Rodilla + 2.4, K.Rodilla + 5.2, kEase.suave)} texto="durante la infancia →" fin="" x={140} y={410} color={KC.yellow} />
        <Etq T={T} at={K.Rodilla + 1.0} until={K.Rodilla + 2.4} x={560} y={580} texto="casi toda cartílago" lado="der" color={KC.texto} tam={36} />
      </Escena>
      {/* 9 · 206 huesos (puede variar) */}
      <Escena T={T} a={K.Total} b={K.Cierre} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo><Cuerpo x={300} yPies={1180} alto={720} k={1} u={1} T={T} piel="#e9a27c" sale={kprog(T, K.Total, K.Total + 1.2)} /></Lienzo>
        <Chip T={T} at={K.Total + 0.2} until={K.Cierre - 0.15} texto="casi todos los adultos" x={540} y={420} tam={42} borde={KC.ink} />
        <NumeroGigante T={T} at={K.Total + 1.2} until={K.Cierre - 0.15} valor={206} dur={1.2} etiqueta="huesos" x={770} y={700} tam={230} color={KC.cyan} />
        <Chip T={T} at={K.Total + 3.6} until={K.Cierre - 0.15} texto="puede variar" x={770} y={950} tam={40} borde={KC.pink} />
        <Etq T={T} at={K.Total + 4.2} until={K.Cierre - 0.15} x={610} y={1040} texto="de persona a persona" lado="der" color={KC.ink} tam={28} />
      </Escena>
      {/* 10 · cierre: la misma imagen del inicio, ya unida */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        {(() => { const c = kprog(T, K.Cierre + 0.3, K.Cierre + 2.6, kEase.suave);
          return <Lienzo>
            <Cuerpo x={klerp(300, 540, c)} yPies={1170} alto={klerp(560, 760, c)} k={c} u={c} T={T} piel={mixHex(CPIEL, '#e9a27c', c)} />
            <Cuerpo x={790} yPies={1170} alto={700} k={1} u={1} T={T} piel="#e9a27c" o={1 - c} />
          </Lienzo>; })()}
        <Chip T={T} at={K.Cierre + 0.5} until={K.Outro - 0.1} texto="no se perdieron: se fueron uniendo" x={540} y={430} tam={38} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Cartilago - 0.1} texto="Más piezas de hueso *que tú.*" />
      <Subtitulo T={T} idx={1} at={K.Cartilago + 0.1} until={K.Fusion - 0.1} texto="En parte *cartílago:* más flexible." />
      <Subtitulo T={T} idx={2} at={K.Fusion + 0.1} until={K.Craneo - 0.1} texto="Al crecer *se van uniendo.*" />
      <Subtitulo T={T} idx={3} at={K.Craneo + 0.1} until={K.Parto - 0.1} texto="Placas separadas por *fontanelas.*" />
      <Subtitulo T={T} idx={4} at={K.Parto + 0.1} until={K.Cierra - 0.1} texto="Espacio para *que crezca el cerebro.*" />
      <Subtitulo T={T} idx={5} at={K.Cierra + 0.1} until={K.Pregunta - 0.1} texto="Atrás: meses. *Arriba: 7–19 meses.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Cadera - 0.1} texto="¿Cuándo *terminan de unirse?*" />
      <Subtitulo T={T} idx={7} at={K.Cadera + 0.1} until={K.Rodilla - 0.1} texto="Algunos: *hasta la edad adulta.*" />
      <Subtitulo T={T} idx={8} at={K.Rodilla + 0.1} until={K.Total - 0.1} texto="La rótula: *casi toda cartílago.*" />
      <Subtitulo T={T} idx={9} at={K.Total + 0.1} until={K.Cierre - 0.1} texto="Casi todos: *206 huesos.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No los perdiste: *se fueron uniendo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.1, 'avatar_11_sorprendido', 'gancho'],
        [K.Fusion + 0.4, K.Craneo - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Craneo + 3.8, K.Parto - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierra + 2.6, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Cadera + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Cadera + 2.4, K.Rodilla - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Rodilla + 0.6, K.Total - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Total + 2.0, K.Cierre - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="48" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function BebesHuesosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BebesHuesos /></CompositionStage></div>;
}
window.BebesHuesosApp = BebesHuesosApp;
