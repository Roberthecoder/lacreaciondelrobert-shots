// Shot Ambiental #33 · Tu pantalón de mezclilla lleva 189 garrafones de agua — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: Levi Strauss & Co. (2015), "The Life Cycle of a Jean" (estudio de la propia empresa) y Chapagain et al. (2006),
// Ecological Economics 60. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

/* ---------- PANTALÓN DE MEZCLILLA (vista de frente) ----------
   Origen = centro de la pretina. Mide 564 × 1000 a escala 1. Por dentro es "de vidrio": se llena de agua o de garrafones. */
const PZ_POLY = [[-250, 0], [250, 0], [282, 330], [268, 1000], [40, 1000], [0, 370], [-40, 1000], [-268, 1000], [-282, 330]];
const PZ_PATH = 'M ' + PZ_POLY.map((p) => p.join(' ')).join(' L ') + ' Z';
const PZ_CW = 42, PZ_CH = 52, PZ_N = 189;
const PZ_CELDAS = (() => {
  const dentro = (x, y) => { let c = false; for (let i = 0, j = PZ_POLY.length - 1; i < PZ_POLY.length; j = i++) { const [xi, yi] = PZ_POLY[i], [xj, yj] = PZ_POLY[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
  const out = [], m = 4;
  for (let y = 1000 - PZ_CH; y >= 60; y -= PZ_CH) for (let x = -282; x <= 282 - PZ_CW; x += PZ_CW)
    if (dentro(x + m, y + m) && dentro(x + PZ_CW - m, y + m) && dentro(x + m, y + PZ_CH - m) && dentro(x + PZ_CW - m, y + PZ_CH - m)) out.push([x + PZ_CW / 2, y + PZ_CH / 2]);
  return out.slice(0, PZ_N); // de abajo hacia arriba
})();
// Reparto por fase del estudio de Levi's (en garrafones de 20 L): fibra 128 · tela 12 + costura 2 + accesorios 4 = 18 · en casa 43.
const PZ_FIBRA = 128, PZ_FABRICA = 18;
const AGUA = '#6cc4ff', C_FIBRA = KC.leaf, C_FABRICA = '#c9b28a', C_CASA = KC.blue, DENIM = '#3d63b0', COSTURA = '#f0a33a';

// Garrafón de 20 L (como los de México), centrado en (x, y), dentro de una celda de 42 × 52.
function Garrafon({ x, y, color = AGUA, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-15} y={-14} width={30} height={34} rx={9} fill={color} stroke={KC.ink} strokeWidth={3} />
    <path d={`M -9 -14 Q -9 -20 -4 -21 L 4 -21 Q 9 -20 9 -14 Z`} fill={color} stroke={KC.ink} strokeWidth={3} />
    <rect x={-5} y={-25} width={10} height={5} rx={2} fill="#fff" stroke={KC.ink} strokeWidth={2.5} />
    <line x1={-14} y1={-2} x2={14} y2={-2} stroke="rgba(0,0,0,.25)" strokeWidth={2} />
    <line x1={-14} y1={8} x2={14} y2={8} stroke="rgba(0,0,0,.25)" strokeWidth={2} />
    <rect x={-11} y={-10} width={5} height={22} rx={2.5} fill="#fff" opacity=".45" />
  </g>;
}
// Pantalón. agua 0..1 = nivel del agua; garr 0..1 = garrafones que ya aparecieron; colorDe(i) = color del garrafón i;
// capas = [{ h: fracción, color }] (agua por capas, de abajo hacia arriba); gastado 0..1 = parches y desgaste de años de uso.
function Pantalon({ T, x, y, s = 1, id, agua = 0, aguaO = 1, garr = 0, colorDe, capas, gastado = 0, o = 1 }) {
  const n = Math.floor(garr * PZ_N + 0.0001), fase = (T * 90) % 160;
  const yl = 1000 - 1000 * agua;
  const ola = `M ${-320 - fase} ${yl} ` + Array.from({ length: 8 }, () => 'q 40 -14 80 0 t 80 0').join(' ') + ` L 400 1010 L -320 1010 Z`;
  let acum = 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <defs><clipPath id={id}><path d={PZ_PATH} /></clipPath></defs>
    <path d={PZ_PATH} fill="#eef5ff" opacity={0.7} /><path d={PZ_PATH} fill={DENIM} opacity={0.22} />
    <g clipPath={`url(#${id})`}>
      {/* textura de mezclilla: diagonales finas (tejido de sarga) */}
      {Array.from({ length: 34 }, (_, i) => <line key={i} x1={-320 + i * 40} y1={0} x2={-320 + i * 40 - 400} y2={1000} stroke={DENIM} strokeWidth={3} opacity={0.18} />)}
      {agua > 0 && aguaO > 0 && <g opacity={aguaO}><path d={ola} fill={AGUA} opacity={0.9} />
        {Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.6 + i / 7) % 1); const by = 1000 - u * 1000 * agua; return by > yl + 10 ? <circle key={i} cx={-200 + i * 66} cy={by} r={7 + (i % 3) * 3} fill="none" stroke="#e6f6ff" strokeWidth={3} /> : null; })}</g>}
      {capas && capas.map((c, i) => { const y1 = 1000 - 1000 * (acum + c.h); acum += c.h; return <rect key={i} x={-300} y={y1} width={600} height={1000 * c.h} fill={c.color} stroke={KC.ink} strokeWidth={3} />; })}
      {PZ_CELDAS.slice(0, n).map(([cx, cy], i) => { const ent = kclamp((garr * PZ_N - i) / 6, 0, 1);
        return <Garrafon key={i} x={cx} y={cy} color={colorDe ? colorDe(i) : AGUA} s={0.4 + 0.6 * kEase.rebote(ent)} />; })}
    </g>
    {/* costuras y detalles (encima del contenido) */}
    <path d={PZ_PATH} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -250 0 L 250 0 L 255 58 L -255 58 Z" fill={DENIM} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={-248} y1={46} x2={248} y2={46} stroke={COSTURA} strokeWidth={3} strokeDasharray="10 7" />
    {[-205, -95, 95, 205].map((bx) => <rect key={bx} x={bx - 9} y={-10} width={18} height={76} rx={5} fill={DENIM} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={0} cy={29} r={14} fill="#c98b3c" stroke={KC.ink} strokeWidth={4} />
    <path d="M 26 58 L 26 270 Q 26 318 0 345" fill="none" stroke={COSTURA} strokeWidth={4} strokeDasharray="10 7" />
    <path d="M 0 58 L 0 345" stroke={KC.ink} strokeWidth={4} />
    <path d="M -232 58 Q -215 185 -278 222" fill="none" stroke={KC.ink} strokeWidth={5} />
    <path d="M 232 58 Q 215 185 278 222" fill="none" stroke={KC.ink} strokeWidth={5} />
    <path d="M -214 58 Q -196 200 -279 240" fill="none" stroke={COSTURA} strokeWidth={3} strokeDasharray="9 6" />
    <path d="M 214 58 Q 196 200 279 240" fill="none" stroke={COSTURA} strokeWidth={3} strokeDasharray="9 6" />
    <rect x={150} y={70} width={58} height={62} rx={6} fill="none" stroke={COSTURA} strokeWidth={3} strokeDasharray="8 6" />
    {[[-232, 64], [232, 64], [-276, 224], [276, 224]].map(([rx, ry], i) => <circle key={i} cx={rx} cy={ry} r={7} fill="#d9a04a" stroke={KC.ink} strokeWidth={3} />)}
    <line x1={-262} y1={960} x2={-46} y2={960} stroke={COSTURA} strokeWidth={4} strokeDasharray="10 7" />
    <line x1={46} y1={960} x2={262} y2={960} stroke={COSTURA} strokeWidth={4} strokeDasharray="10 7" />
    {gastado > 0 && <g opacity={gastado}>
      <g transform="translate(-150 640) rotate(-8)"><rect x={-58} y={-46} width={116} height={92} rx={10} fill="#ff8a1f" stroke={KC.ink} strokeWidth={5} />
        <rect x={-48} y={-36} width={96} height={72} rx={6} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="8 6" /></g>
      <g transform="translate(150 700) rotate(6)"><rect x={-50} y={-40} width={100} height={80} rx={10} fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
        <rect x={-40} y={-30} width={80} height={60} rx={6} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="8 6" /></g>
      {[-230, -200, 200, 230].map((fx, i) => <line key={i} x1={fx} y1={985} x2={fx + 6} y2={1012} stroke={KC.ink} strokeWidth={3} />)}
      <path d="M -150 380 q 20 -12 40 0 M 110 420 q 20 -12 40 0" stroke="#fff" strokeWidth={4} fill="none" opacity={0.7} />
    </g>}
  </g>;
}
const colorFases = (fib, fab, casa) => (i) => {
  if (i < PZ_FIBRA) return i < fib * PZ_FIBRA ? C_FIBRA : AGUA;
  if (i < PZ_FIBRA + PZ_FABRICA) return (i - PZ_FIBRA) < fab * PZ_FABRICA ? C_FABRICA : AGUA;
  return (i - PZ_FIBRA - PZ_FABRICA) < casa * (PZ_N - PZ_FIBRA - PZ_FABRICA) ? C_CASA : AGUA;
};

/* ---------- PLANTA DE ALGODÓN (Gossypium) ---------- */
// Cápsula abierta: la pared seca se abre en `lob` valvas puntiagudas (4–5 lóculos) y de cada lóculo sale un mechón de fibra blanca.
function CapsulaAbierta({ x, y, r = 56, lob = 5, rot = 0, abre = 1 }) {
  const a0 = -90 + rot;
  return <g transform={`translate(${x} ${y})`}>
    {/* brácteas verdes-secas de abajo */}
    <path d={`M ${-r * 0.7} ${r * 0.5} q ${r * 0.2} ${r * 0.5} ${r * 0.7} ${r * 0.55} q ${r * 0.5} ${-r * 0.05} ${r * 0.7} ${-r * 0.55}`} fill="#8a9a3c" stroke={KC.ink} strokeWidth={4} />
    {/* valvas cafés (la pared de la cápsula abierta) */}
    {Array.from({ length: lob }, (_, i) => { const a = (a0 + i * 360 / lob + 180 / lob) * Math.PI / 180, L = r * (0.75 + 0.45 * abre);
      const px = Math.cos(a) * L, py = Math.sin(a) * L, nx = -Math.sin(a) * r * 0.22, ny = Math.cos(a) * r * 0.22;
      return <path key={'v' + i} d={`M ${nx} ${ny} Q ${px * 0.6 + nx} ${py * 0.6 + ny} ${px} ${py} Q ${px * 0.6 - nx} ${py * 0.6 - ny} ${-nx} ${-ny} Z`} fill="#8b5a2b" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />; })}
    {/* mechones de fibra (uno por lóculo) */}
    {Array.from({ length: lob }, (_, i) => { const a = (a0 + i * 360 / lob) * Math.PI / 180, d = r * 0.42 * abre, cx = Math.cos(a) * d, cy = Math.sin(a) * d, k = 0.5 + 0.5 * abre;
      return <g key={'m' + i} transform={`translate(${cx} ${cy}) scale(${k})`}>
        <circle cx={-r * 0.16} cy={0} r={r * 0.3} fill="#fff" stroke={KC.ink} strokeWidth={3.5} />
        <circle cx={r * 0.16} cy={-r * 0.06} r={r * 0.3} fill="#fff" stroke={KC.ink} strokeWidth={3.5} />
        <circle cx={0} cy={r * 0.14} r={r * 0.28} fill="#fbfbf6" />
      </g>; })}
  </g>;
}
// Cápsula cerrada (verde, con brácteas dentadas).
function CapsulaCerrada({ x, y, r = 40, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 ${-r * 1.15} Q ${r * 0.95} ${-r * 0.5} ${r * 0.8} ${r * 0.3} Q ${r * 0.5} ${r * 0.9} 0 ${r * 0.9} Q ${-r * 0.5} ${r * 0.9} ${-r * 0.8} ${r * 0.3} Q ${-r * 0.95} ${-r * 0.5} 0 ${-r * 1.15} Z`} fill="#7cc44f" stroke={KC.ink} strokeWidth={4} />
    <path d={`M 0 ${-r * 1.1} L 0 ${r * 0.8}`} stroke="rgba(0,0,0,.25)" strokeWidth={3} />
    <path d={`M ${-r * 0.95} ${r * 0.1} l ${r * 0.2} ${r * 0.3} l ${r * 0.1} ${-r * 0.25} l ${r * 0.15} ${r * 0.35} l ${r * 0.12} ${-r * 0.2} l ${r * 0.3} ${r * 0.55} L ${-r * 0.3} ${r * 1.0} Z`} fill="#4f9a2e" stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" />
    <path d={`M ${r * 0.95} ${r * 0.1} l ${-r * 0.2} ${r * 0.3} l ${-r * 0.1} ${-r * 0.25} l ${-r * 0.15} ${r * 0.35} l ${-r * 0.12} ${-r * 0.2} l ${-r * 0.3} ${r * 0.55} L ${r * 0.3} ${r * 1.0} Z`} fill="#4f9a2e" stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" />
  </g>;
}
// Hoja palmeada de 3–5 lóbulos (como la del algodonero).
function HojaAlgodon({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 0 C -30 -10 -70 -20 -78 -55 C -60 -60 -40 -55 -32 -50 C -48 -80 -40 -110 -12 -130 C 0 -110 2 -100 0 -92 C 4 -100 6 -112 14 -130 C 40 -110 48 -80 32 -50 C 40 -56 60 -60 78 -55 C 70 -20 30 -10 0 0 Z" fill="#58b85c" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 0 0 L 0 -110 M 0 -20 L -55 -50 M 0 -20 L 55 -50" stroke="#2f7a35" strokeWidth={3} fill="none" />
  </g>;
}
function Algodonero({ T, x, y, s = 1, abre = 1 }) {
  const m = Math.sin(T * 1.6) * 2;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m})`}>
    <path d="M 0 0 C -6 -150 8 -300 0 -520" stroke="#6b4a2b" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M 0 -150 C -60 -180 -120 -200 -170 -260" stroke="#6b4a2b" strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 2 -230 C 60 -260 120 -280 170 -350" stroke="#6b4a2b" strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M 0 -360 C -50 -390 -90 -400 -130 -450" stroke="#6b4a2b" strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M 2 -420 C 40 -440 70 -460 95 -500" stroke="#6b4a2b" strokeWidth={7} fill="none" strokeLinecap="round" />
    <HojaAlgodon x={-80} y={-185} s={0.9} rot={-60} />
    <HojaAlgodon x={90} y={-262} s={0.9} rot={55} />
    <HojaAlgodon x={-60} y={-385} s={0.75} rot={-50} />
    <HojaAlgodon x={4} y={-515} s={0.7} rot={5} />
    <HojaAlgodon x={30} y={-90} s={0.8} rot={70} />
    <CapsulaAbierta x={-178} y={-282} r={58} lob={5} abre={abre} />
    <CapsulaAbierta x={176} y={-372} r={56} lob={4} rot={20} abre={abre} />
    <CapsulaAbierta x={-138} y={-470} r={48} lob={5} rot={10} abre={abre} />
    <CapsulaCerrada x={100} y={-520} r={30} rot={20} />
  </g>;
}
// Surco de riego con agua que corre.
function Surco({ T, y, agua = 1 }) {
  const f = (T * 120) % 120;
  return <g>
    <rect x={0} y={y} width={KW} height={260} fill="#a8743e" />
    <path d={`M 0 ${y + 40} L ${KW} ${y + 40}`} stroke="#7a5228" strokeWidth={8} />
    <rect x={0} y={y + 70} width={KW} height={46} fill={AGUA} opacity={agua} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M ${i * 120 - f} ${y + 93} q 20 -8 40 0`} stroke="#e6f6ff" strokeWidth={4} fill="none" opacity={agua} />)}
  </g>;
}

/* ---------- CASA: lavadora, secadora, tendedero ---------- */
function Lavadora({ T, x, y, s = 1, gira = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-130} width={220} height={260} rx={22} fill="#f4f6fa" stroke={KC.ink} strokeWidth={7} />
    <line x1={-110} y1={-80} x2={110} y2={-80} stroke={KC.ink} strokeWidth={5} />
    <circle cx={60} cy={-105} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><rect x={-90} y={-114} width={80} height={18} rx={6} fill="#cfd8e3" stroke={KC.ink} strokeWidth={3} />
    <circle cx={0} cy={20} r={80} fill="#cfd8e3" stroke={KC.ink} strokeWidth={7} />
    <clipPath id="lavvent"><circle cx={0} cy={20} r={66} /></clipPath>
    <g clipPath="url(#lavvent)"><rect x={-70} y={-46} width={140} height={140} fill="#bfe7ff" />
      <path d={`M -70 ${30 + Math.sin(T * 6) * 6} q 35 -14 70 0 t 70 0 L 70 90 L -70 90 Z`} fill={AGUA} />
      <g transform={`translate(0 20) rotate(${T * 260 * gira})`}><path d="M -30 -20 L 30 -20 L 34 30 L 6 30 L 0 0 L -6 30 L -34 30 Z" fill={DENIM} stroke={KC.ink} strokeWidth={4} /></g></g>
    <circle cx={0} cy={20} r={66} fill="none" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Secadora({ x, y, s = 1, tacha = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-100} y={-120} width={200} height={240} rx={20} fill="#e9eef5" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={15} r={70} fill="#9aa6b5" stroke={KC.ink} strokeWidth={7} />
    {[-30, 0, 30].map((dx) => <path key={dx} d={`M ${dx - 8} -20 q 8 -12 0 -24 q -8 -12 0 -24`} stroke="#ff6b5a" strokeWidth={5} fill="none" transform="translate(0 70)" />)}
    <text x={0} y={-82} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>secadora</text>
    {tacha > 0 && <g opacity={kclamp(tacha * 2, 0, 1)}>
      <line x1={-120} y1={-140} x2={-120 + 240 * tacha} y2={-140 + 280 * tacha} stroke={KC.red} strokeWidth={20} strokeLinecap="round" />
      <line x1={120} y1={-140} x2={120 - 240 * kclamp(tacha * 2 - 1, 0, 1)} y2={-140 + 280 * kclamp(tacha * 2 - 1, 0, 1)} stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g>}
  </g>;
}
// Mini pantalón (ícono de una "puesta").
function MiniPantalon({ x, y, s = 1, color = DENIM }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={PZ_PATH} fill={color} stroke={KC.ink} strokeWidth={22} strokeLinejoin="round" />
    <path d="M -250 0 L 250 0 L 255 70 L -255 70 Z" fill="#2c4a8a" stroke={KC.ink} strokeWidth={18} />
  </g>;
}

// Texto libre (div) con entrada.
function TextoD({ T, at, until, x, y, children, ancho = 420, alinear = 'center' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x - ancho / 2, top:y, width:ancho, zIndex:41, textAlign:alinear, opacity:e.o, transform:`scale(${e.s})` }}>{children}</div>;
}
const tGrande = (tam, color = KC.yellow) => ({ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' });
const tChico = (tam = 30, color = KC.ink) => ({ font:`900 ${tam}px/1.15 ${KF.texto}`, color });
function Tarjeta({ T, at, until, x, y, lineas, ancho = 400 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x - ancho / 2, top:y, width:ancho, zIndex:42, opacity:e.o, transform:`scale(${e.s}) rotate(-2deg)`,
    background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:20, padding:'12px 16px', textAlign:'center', boxShadow:`8px 8px 0 ${KC.ink}` }}>
    {lineas.map((l, i) => <div key={i} style={{ font:`${i === 0 ? 700 : 900} ${i === 0 ? 22 : 30}px/1.2 ${i === 0 ? KF.mono : KF.texto}`, color: i === 0 ? '#7a5228' : KC.ink }}>{l}</div>)}
  </div>;
}

// Barra (div) legible sobre fondos brillantes: tarjeta oscura con texto grande.
function BarraD({ T, at, until, valor, etiqueta, texto, x, y, ancho = 600, color = KC.leaf }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), v = kclamp(valor, 0, 1);
  return <div style={{ position:'absolute', left:x, top:y, width:ancho, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.5}px)`, boxSizing:'border-box',
    background:'rgba(14,15,18,.85)', border:`4px solid ${color}`, borderRadius:22, padding:'12px 20px 16px' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:8 }}>
      <span style={{ font:`900 26px ${KF.texto}`, color:KC.texto, whiteSpace:'nowrap' }}>{etiqueta}</span><span style={{ font:`400 46px ${KF.titulo}`, color, whiteSpace:'nowrap', marginLeft:16 }}>{texto(v)}</span></div>
    <div style={{ height:30, borderRadius:15, background:'rgba(255,255,255,.15)', overflow:'hidden' }}><div style={{ width:`${v * 100}%`, height:'100%', background:color, borderRadius:15 }}></div></div>
  </div>;
}
// Barras de carbono por fase (Levi's 2015, 33.4 kg CO2e).
const FASES_CO2 = [['en casa (lavar, secar…)', 37, KC.red], ['hacer la tela', 27, '#8a6bd6'], ['transporte y tiendas', 11, '#7f8c99'], ['algodón (fibra)', 9, C_FIBRA], ['corte y costura', 8, C_FABRICA], ['accesorios y empaque', 5, '#d9a04a'], ['fin de vida', 3, '#555b66']];

function MezclillaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ga: CUES.Garrafones, Al: CUES.Algodon, P: CUES.Pregunta, Ca: CUES.Carbono, Co: CUES.Contraste, La: CUES.Lavar, Se: CUES.Secar, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // pantalón principal (de Gancho a Pregunta): posición y escala
  const mA = kprog(T, K.Al - 0.2, K.Al + 0.8, kEase.suave), mP = kprog(T, K.P - 0.2, K.P + 0.6, kEase.suave);
  const pzX = klerp(klerp(380, 230, mA), 290, mP), pzY = klerp(klerp(420, 540, mA), 480, mP), pzS = klerp(klerp(0.72, 0.55, mA), 0.62, mP);
  const pzO = 1 - kprog(T, K.Ca - 0.4, K.Ca + 0.1);
  const agua = kprog(T, K.G + 0.05, K.G + 2.6, kEase.suave), aguaO = 1 - kprog(T, K.Ga + 0.3, K.Ga + 1.6);
  const garr = kprog(T, K.Ga + 0.2, K.Ga + 3.2);
  const fib = kprog(T, K.Al + 0.4, K.Al + 2.4), fab = kprog(T, K.P + 0.2, K.P + 0.8), casa = kprog(T, K.P + 0.5, K.P + 1.8);
  // contraste: los dos pantalones
  const cA = kprog(T, K.Co + 3.0, K.Co + 4.2, kEase.suave), cB = kprog(T, K.Co + 3.6, K.Co + 5.6, kEase.suave);
  const capasB = [{ h: 4900 / 10850 * cB, color: '#2f8fd8' }, { h: 4450 / 10850 * cB, color: '#9fdcff' }, { h: 1500 / 10850 * cB, color: '#a89a7a' }];
  // lavar: 10 puestas y una lavada
  const puestas = Math.floor(kclamp((T - K.La - 0.3) / 0.22, 0, 10));
  const bajaLav = kprog(T, K.La + 3.4, K.La + 5.0, kEase.suave);
  const bajaSec = kprog(T, K.Se + 2.6, K.Se + 4.0, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y garrafones: fondo cian */}
      <Escena T={T} a={K.G} b={K.Al} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · el campo de algodón */}
      <Escena T={T} a={K.Al} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Surco T={T} y={1150} /><Algodonero T={T} x={740} y={1170} s={1.05} abre={kprog(T, K.Al + 0.6, K.Al + 1.8, kEase.sale)} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Ca}>
        <FondoLunares color={KC.lilac} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* pantalón principal */}
      {pzO > 0 && T < K.Ca + 0.2 && svg(<>
        <Pantalon T={T} id="pzA" x={pzX} y={pzY} s={pzS} agua={agua} aguaO={aguaO} garr={garr} colorDe={colorFases(fib, fab, casa)} o={pzO} />
        {T > K.P && <g opacity={kprog(T, K.P + 0.6, K.P + 1.0) * pzO}><Lavadora T={T} x={455} y={1070} s={0.45} gira={1} /></g>}
      </>, 20)}

      {/* 5 · carbono por fase */}
      <Escena T={T} a={K.Ca} b={K.Co}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{FASES_CO2.map(([nom, v, col], i) => { const g = kprog(T, K.Ca + 0.4 + i * 0.12, K.Ca + 1.2 + i * 0.12, kEase.sale), y = 690 + i * 60, w = 460 * v / 37 * g, foco = i === 0 ? kprog(T, K.Ca + 1.8, K.Ca + 2.4) : 0;
          return <g key={i}>
            <text x={420} y={y + 36} textAnchor="end" style={{ font:`${i === 0 ? 900 : 700} ${i === 0 ? 30 : 26}px ${i === 0 ? KF.texto : KF.mono}` }} fill={KC.ink}>{nom}</text>
            <rect x={440} y={y + 6} width={Math.max(0, w)} height={44} rx={10} fill={col} stroke={KC.ink} strokeWidth={4 + foco * 3} />
            <text x={450 + w} y={y + 40} style={{ font:`400 ${i === 0 ? 40 + foco * 10 : 32}px ${KF.titulo}` }} fill={KC.ink}>{Math.round(v * g)} %</text>
          </g>; })}</>)}
      </Escena>

      {/* 6 · contraste con la UNESCO-IHE (2006) */}
      <Escena T={T} a={K.Co} b={K.La}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Pantalon T={T} id="pzC1" x={220} y={650} s={0.5} agua={3781 / 10850 * cA} o={cA} />
          <Pantalon T={T} id="pzC2" x={560} y={650} s={0.5} capas={capasB} o={cA} />
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 7 · lavar menos */}
      <Escena T={T} a={K.La} b={K.Se}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 10 }, (_, i) => { const cx = 120 + (i % 5) * 112, cy = 470 + Math.floor(i / 5) * 190, ok = i < puestas;
          return <g key={i}><rect x={cx - 48} y={cy - 12} width={96} height={170} rx={16} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={5} />
            <MiniPantalon x={cx} y={cy + 8} s={0.12} />
            <text x={cx} y={cy + 150} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{i + 1}</text>
            {ok && <path d={`M ${cx - 26} ${cy + 70} l 18 20 l 36 -44`} stroke={KC.leaf} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />}</g>; })}
          {T > K.La + 2.5 && <g opacity={kprog(T, K.La + 2.5, K.La + 2.9)}><Lavadora T={T} x={820} y={950} s={0.85} gira={1} /></g>}
        </>)}
      </Escena>

      {/* 8 · secar al aire */}
      <Escena T={T} a={K.Se} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Sol T={T} x={950} y={360} r={58} />
          <line x1={330} y1={740} x2={1060} y2={740} stroke={KC.ink} strokeWidth={6} />
          <rect x={320} y={720} width={18} height={500} rx={6} fill="#8b5a2b" stroke={KC.ink} strokeWidth={4} />
          <g transform={`rotate(${Math.sin(T * 2) * 2} 700 740)`}><MiniPantalon x={700} y={742} s={0.4} />
            <rect x={612} y={724} width={14} height={40} rx={4} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /><rect x={774} y={724} width={14} height={40} rx={4} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>
          {[0, 1, 2].map((i) => { const u = ((T * 0.7 + i / 3) % 1); return <path key={i} d={`M ${640 + i * 50} ${1100 - u * 80} q 10 -15 0 -30 q -10 -15 0 -30`} stroke="#fff" strokeWidth={5} fill="none" opacity={1 - u} />; })}
          <Secadora x={170} y={1040} s={0.8} tacha={kprog(T, K.Se + 1.0, K.Se + 1.8)} />
        </>)}
      </Escena>

      {/* 9 · cierre: el mismo pantalón lleno, ya con años de uso */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {svg(<Pantalon T={T} id="pzZ" x={380} y={420} s={0.72} garr={kprog(T, K.C - 0.3, K.C + 1.6)} gastado={kprog(T, K.C + 1.4, K.C + 2.4)} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <TextoD T={T} at={K.G + 0.1} until={K.Ga - 0.1} x={830} y={830}>
        <div style={tGrande(108)}>{kformato(3781 * kprog(T, K.G + 0.1, K.G + 2.6, kEase.sale))} L</div>
        <div style={{ ...tChico(30), marginTop:14 }}>de agua en toda su vida</div>
      </TextoD>
      <TextoD T={T} at={K.Ga + 0.2} until={K.Al - 0.2} x={830} y={720}>
        <div style={tGrande(130)}>{Math.round(PZ_N * garr)}</div>
        <div style={{ ...tChico(30), marginTop:10 }}>garrafones de 20 L</div>
      </TextoD>
      <Tarjeta T={T} at={K.Ga + 2.0} until={K.Al - 0.2} x={830} y={960} ancho={400} lineas={['estudio de la propia empresa', 'Levi Strauss & Co.', '2015 · jeans 501']} />
      <Chip T={T} at={K.Al + 0.6} until={K.P - 0.2} texto="algodón: 68 % · 2,565 L" y={440} x={400} tam={32} borde={C_FIBRA} />
      <Etq T={T} at={K.Al + 1.6} until={K.P - 0.2} x={640} y={676} texto="cápsula abierta" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Al + 2.0} until={K.P - 0.2} x={760} y={1110} texto="Gossypium" it lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.P + 0.6} until={K.Ca - 0.2} texto="en tu casa: 23 % · 860 L" y={420} x={560} tam={34} borde={C_CASA} />
      <Chip T={T} at={K.Ca + 0.2} until={K.Co - 0.2} texto="33.4 kg CO₂e en toda su vida" y={450} x={680} tam={30} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Co + 0.15} until={K.Co + 2.8} anio="2006" quien="Chapagain et al. · UNESCO-IHE" revista="Ecological Economics · datos de 1997–2001" y={720} />
      <TextoD T={T} at={K.Co + 3.0} until={K.La - 0.2} x={220} y={480} ancho={320}>
        <div style={tChico(26)}>Levi's 2015</div><div style={tGrande(64, AGUA)}>3,781 L</div>
      </TextoD>
      <TextoD T={T} at={K.Co + 3.6} until={K.La - 0.2} x={560} y={480} ancho={380}>
        <div style={{ ...tChico(24), whiteSpace:'nowrap' }}>UNESCO-IHE 2006 · 1 kg</div><div style={tGrande(64, KC.yellow)}>10,850 L</div>
      </TextoD>
      <Etq T={T} at={K.Co + 4.4} until={K.La - 0.2} x={710} y={1080} texto="riego 4,900" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Co + 4.8} until={K.La - 0.2} x={710} y={930} texto="lluvia 4,450" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Co + 5.2} until={K.La - 0.2} x={710} y={840} texto="dilución 1,500" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 5.6} until={K.La - 0.2} texto="miden cosas distintas" y={405} x={400} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.La + 0.2} until={K.La + 3.0} texto="1 lavada cada 10 puestas" y={920} x={360} tam={32} borde={KC.leaf} />
      <BarraD T={T} at={K.La + 3.2} until={K.Se - 0.2} valor={1 - 0.8 * bajaLav} etiqueta="agua y energía del lavado" texto={(v) => v > 0.99 ? '100 %' : `hasta −${Math.round((1 - v) * 100)} %`} x={60} y={880} ancho={620} color={KC.leaf} />
      <BarraD T={T} at={K.Se + 2.4} until={K.C - 0.2} valor={1 - 0.67 * bajaSec} etiqueta="carbono de cuidarlo (EUA)" texto={(v) => v > 0.99 ? '100 %' : `−${Math.round((1 - v) * 100)} %`} x={360} y={545} ancho={680} color={KC.yellow} />
      <Chip T={T} at={K.Se + 0.3} until={K.C - 0.2} texto="al aire, no en secadora" y={470} x={560} tam={34} borde={KC.yellow} />
      <TextoD T={T} at={K.C + 0.3} until={K.Ou - 0.1} x={830} y={1000}>
        <div style={tGrande(90)}>3,781 L</div>
        <div style={{ ...tChico(32), marginTop:10 }}>más años = más vale cada litro</div>
      </TextoD>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ga - 0.1} texto="Tu pantalón, lleno de su agua: *3,781 litros.*" />
      <Subtitulo T={T} idx={1} at={K.Ga + 0.1} until={K.Al - 0.1} texto="189 garrafones: *estudio de Levi Strauss, 2015.*" />
      <Subtitulo T={T} idx={2} at={K.Al + 0.1} until={K.P - 0.1} texto="7 de cada 10 litros: *el campo de algodón.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Ca - 0.1} texto="Casi 1/4: *en tu lavadora.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.Co - 0.1} texto="En carbono, lavar y secar: *37 %.*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.La - 0.1} texto="UNESCO-IHE, 2006: *casi 11 mil litros.*" />
      <Subtitulo T={T} idx={6} at={K.La + 0.1} until={K.Se - 0.1} texto="Cada 10 puestas: *hasta −80 %.*" />
      <Subtitulo T={T} idx={7} at={K.Se + 0.1} until={K.C - 0.1} texto="Al aire: *−2/3 de carbono (EUA).*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={K.Ou - 0.1} texto="Úsalo años: *más vale cada litro.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Garrafones + 0.3, CUES.Garrafones + 2.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Algodon + 2.6, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Carbono + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Carbono + 2.6, CUES.Contraste - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Contraste + 5.0, CUES.Lavar - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Lavar + 3.0, CUES.Secar - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Secar + 2.6, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 1.6, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="33" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MezclillaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MezclillaShot /></CompositionStage></div>;
}
window.MezclillaApp = MezclillaApp;
