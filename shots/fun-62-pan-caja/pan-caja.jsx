// Shot Fungi Mati #62 · Tu pan de caja no es inmortal: trae un antimoho — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Sin marcas (bolsa genérica).

const PC = { corteza:'#b8682a', corteza2:'#8a4a1c', miga:'#f2d9a4', hoyo:'#dcbc80', caja:'#9c5a26', migaCaja:'#fbf1dc', poro:'#ead9b8',
  tabla:'#a8693a', moho:'#5f8f7a', moho2:'#3e6b5a', blanco:'#f4f6ee', hifa:'#eafff7', cito:'rgba(47,224,168,.16)', acido:'rgba(255,138,31,.28)',
  ap:'#F4C25A', h:'#ff3b2f', anion:'#4dd4ff', engrane:'#b18cff', queso:'#ffd76a', queso2:'#e9b93f', tripa:'#f39ab0', tripa2:'#d9668a', fibra:'#3fbf4a' };

// ---------- piezas macro ----------
// Mancha de moho que crece RADIAL desde su centro: centro oscuro, anillo verde-azul (esporas) y orilla blanca algodonosa (micelio joven).
function MohoRadial({ cx, cy, r, seed = 1, color = PC.moho }) {
  if (r <= 1) return null;
  const g = krng(seed);
  const borde = Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2, rr = r * (0.9 + g() * 0.2); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; });
  const d = 'M ' + borde.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ') + ' Z';
  return <g>
    <path d={d} fill={PC.blanco} opacity=".95" />
    <circle cx={cx} cy={cy} r={r * 0.78} fill={color} />
    <circle cx={cx} cy={cy} r={r * 0.45} fill={PC.moho2} />
    {Array.from({ length: 18 }, (_, i) => { const a = i * 2.4, dd = Math.sqrt(i / 18) * r * 0.7; return <circle key={i} cx={cx + Math.cos(a) * dd} cy={cy + Math.sin(a) * dd} r={1.6 + (i % 3)} fill="#24443a" />; })}
  </g>;
}
// Rebanada de pan de panadería (bolillo/hogaza): domo irregular, corteza gruesa, miga con hoyos grandes. Base en (x, y).
function RebPanaderia({ x, y, s = 1, moho = 0, seed = 4 }) {
  const g = krng(seed);
  const hoyos = Array.from({ length: 26 }, () => ({ x: -150 + g() * 300, y: -330 + g() * 300, rx: 6 + g() * 20, ry: 4 + g() * 12, r: g() * 180 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -185 0 L -190 -170 C -205 -300 -110 -380 0 -385 C 120 -382 210 -300 190 -170 L 185 0 Z" fill={PC.corteza} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -160 -22 L -164 -170 C -176 -282 -96 -350 0 -354 C 106 -350 182 -282 166 -170 L 160 -22 Z" fill={PC.miga} />
    {hoyos.map((h, i) => <ellipse key={i} cx={h.x} cy={h.y} rx={h.rx} ry={h.ry} transform={`rotate(${h.r} ${h.x} ${h.y})`} fill={PC.hoyo} />)}
    <MohoRadial cx={-60} cy={-220} r={95 * kclamp(moho, 0, 1)} seed={seed + 1} />
    <MohoRadial cx={70} cy={-110} r={70 * kclamp(moho * 1.3 - 0.3, 0, 1)} seed={seed + 2} color="#6f9a5a" />
    <MohoRadial cx={90} cy={-280} r={40 * kclamp(moho * 1.5 - 0.5, 0, 1)} seed={seed + 3} />
  </g>;
}
// Rebanada de pan de caja: casi cuadrada, corteza delgada, miga fina y blanca. Base en (x, y).
function RebCaja({ x, y, s = 1, moho = 0, seed = 9 }) {
  const g = krng(seed);
  const poros = Array.from({ length: 70 }, () => ({ x: -140 + g() * 280, y: -320 + g() * 290, r: 2 + g() * 4 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 0 L -170 -300 C -175 -360 -120 -385 -60 -372 C -20 -392 20 -392 60 -372 C 120 -385 175 -360 170 -300 L 170 0 Z" fill={PC.caja} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -154 -14 L -154 -298 C -158 -348 -114 -366 -60 -354 C -20 -372 20 -372 60 -354 C 114 -366 158 -348 154 -298 L 154 -14 Z" fill={PC.migaCaja} />
    {poros.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={PC.poro} />)}
    <MohoRadial cx={40} cy={-160} r={40 * kclamp(moho, 0, 1)} seed={seed + 1} />
  </g>;
}
// Escudo "antimoho" (esquema). gasto 0..1 = se ve gastado.
function Escudo({ x, y, s = 1, o = 1, gasto = 0 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -70 L 62 -48 Q 62 30 0 70 Q -62 30 -62 -48 Z" fill={mixHex('#2fe0a8', '#9fbfae', gasto)} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -24 0 L -6 18 L 28 -20" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {gasto > 0 && <path d="M 30 -44 L 14 -20 L 34 -6" stroke={KC.ink} strokeWidth={4} fill="none" opacity={gasto} />}
  </g>;
}
// Mesa de madera (banda) desde y hacia abajo.
function Mesa({ y = 1120 }) {
  return <g><rect x={-40} y={y} width={1160} height={500} fill={PC.tabla} stroke={KC.ink} strokeWidth={10} />
    {[40, 110, 190].map((d, i) => <path key={i} d={`M -40 ${y + d} Q 540 ${y + d - 18} 1120 ${y + d + 6}`} stroke="#8a5530" strokeWidth={6} fill="none" />)}</g>;
}
// Horno esquemático con un pan dentro (vista por la ventana).
function Horno({ x, y, T, calor = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={470} height={400} rx={30} fill="#4a4e57" stroke={KC.ink} strokeWidth={9} />
    <rect x={40} y={70} width={390} height={260} rx={18} fill={mixHex('#2a1a10', '#ff8a1f', 0.55 * calor + 0.08 * Math.sin(T * 9))} stroke={KC.ink} strokeWidth={7} />
    {[90, 170, 250, 330, 410].map((cx) => <circle key={cx} cx={cx - 40} cy={35} r={12} fill="#c9ccd3" stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 110 300 L 110 210 C 110 160 160 150 235 150 C 310 150 360 160 360 210 L 360 300 Z" fill={PC.corteza} stroke={KC.ink} strokeWidth={6} />
    <line x1={60} y1={302} x2={410} y2={302} stroke="#c9ccd3" strokeWidth={6} />
  </g>;
}
// Pan de caja entero (barra) sobre una rejilla.
function BarraPan({ x, y, s = 1, corte = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 0 L -200 -190 C -200 -240 -150 -250 -100 -240 C -40 -260 40 -260 100 -240 C 150 -250 200 -240 200 -190 L 200 0 Z" fill={PC.caja} stroke={KC.ink} strokeWidth={8} />
    {[-120, -60, 0, 60, 120].map((dx, i) => <line key={i} x1={dx} y1={-225} x2={dx} y2={0} stroke={PC.corteza2} strokeWidth={4} opacity={kclamp(corte * 5 - i, 0, 1)} />)}
    <rect x={-240} y={0} width={480} height={14} rx={6} fill="#c9ccd3" stroke={KC.ink} strokeWidth={4} />
    {[-200, -100, 0, 100, 200].map((dx) => <line key={dx} x1={dx} y1={14} x2={dx} y2={60} stroke="#c9ccd3" strokeWidth={6} />)}
  </g>;
}
// Espora (puntito) que cae con el aire. x0, y0 = de dónde sale; u 0..1 = cuánto cayó.
function EsporaCae({ x0, y0, y1, u, seed = 1 }) {
  if (u <= 0) return null;
  const x = x0 + Math.sin(u * 6 + seed) * 22, y = klerp(y0, y1, kEase.suave(kclamp(u, 0, 1)));
  return <ellipse cx={x} cy={y} rx={7} ry={6} fill={seed % 3 === 0 ? '#2b2a26' : PC.moho} stroke={KC.ink} strokeWidth={2} />;
}

// ---------- piezas micro (morfología esquemática pero correcta) ----------
// Penicillium: conidióforo con ramas en PINCEL y cadenas de conidios redondos.
function Penicillium({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 3, 0, 1)}>
    <path d={`M 0 0 L 0 ${-200 * kclamp(p * 1.5, 0, 1)}`} stroke={PC.hifa} strokeWidth={9} strokeLinecap="round" />
    {p > 0.5 && [-34, -12, 12, 34].map((dx, i) => <g key={i}>
      <path d={`M 0 -200 Q ${dx * 0.5} -225 ${dx} -245`} stroke={PC.hifa} strokeWidth={7} fill="none" strokeLinecap="round" />
      {Array.from({ length: 5 }, (_, j) => <circle key={j} cx={dx * (1 + j * 0.08)} cy={-262 - j * 20} r={9} fill={j < (p - 0.5) * 12 ? '#4f9a8a' : 'none'} stroke={KC.ink} strokeWidth={2.5} opacity={j < (p - 0.5) * 12 ? 1 : 0} />)}
    </g>)}
  </g>;
}
// Aspergillus: conidióforo con VESÍCULA redonda en la punta y conidios en cadenas que irradian.
function Aspergillus({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 3, 0, 1)}>
    <path d={`M 0 0 L 0 ${-200 * kclamp(p * 1.5, 0, 1)}`} stroke={PC.hifa} strokeWidth={10} strokeLinecap="round" />
    {p > 0.5 && <g>
      {Array.from({ length: 9 }, (_, i) => { const a = -Math.PI + (i / 8) * Math.PI; return Array.from({ length: 4 }, (_, j) => { const rr = 50 + j * 18;
        return <circle key={i + '-' + j} cx={Math.cos(a) * rr} cy={-235 + Math.sin(a) * rr} r={8} fill="#c9a23a" stroke={KC.ink} strokeWidth={2.2} opacity={j < (p - 0.5) * 9 ? 1 : 0} />; }); })}
      <circle cx={0} cy={-235} r={38} fill={PC.hifa} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
// Rhizopus: rizoides que salen directo de la hifa en la superficie, esporangióforo y esporangio redondo oscuro (no explota).
function RhizopusEsp({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={kclamp(p * 3, 0, 1)}>
    <path d="M -90 0 Q 0 6 90 0" stroke={PC.hifa} strokeWidth={8} fill="none" strokeLinecap="round" />
    {[-0.9, -0.4, 0.1, 0.6, 1.0].map((k, i) => <path key={i} d={`M 0 4 Q ${k * 20} 30 ${k * 40} ${50 + (i % 2) * 18}`} stroke="#d6b183" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <path d={`M 0 0 C 8 -60 -8 -120 0 ${-210 * kclamp(p * 1.5, 0, 1)}`} stroke={PC.hifa} strokeWidth={9} fill="none" strokeLinecap="round" />
    {p > 0.5 && <g><circle cx={0} cy={-245} r={44 * kEase.sale(kclamp((p - 0.5) * 2, 0, 1))} fill="#1c1b18" stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 8 }, (_, j) => <circle key={j} cx={Math.cos(j * 2.4) * 22 * Math.sqrt(j / 8)} cy={-245 + Math.sin(j * 2.4) * 22 * Math.sqrt(j / 8)} r={4} fill="#4a463e" />)}</g>}
  </g>;
}
// Hifa en corte longitudinal: tubo con pared (gruesa, por fuera) y membrana (delgada, por dentro). Punta redondeada en tipX.
const HY0 = 760, HY1 = 1000;
function HifaTubo({ T, tipX = 980, acido = 0 }) {
  const r = (HY1 - HY0) / 2, cy = (HY0 + HY1) / 2;
  const contorno = (o) => `M -40 ${HY0 - o} L ${tipX - r} ${HY0 - o} A ${r + o} ${r + o} 0 0 1 ${tipX - r} ${HY1 + o} L -40 ${HY1 + o}`;
  return <g>
    <path d={contorno(18) + ' Z'} fill="#1d3a33" />
    <path d={contorno(0) + ' Z'} fill={mixHex('#12352d', '#5a3214', acido)} />
    <path d={contorno(18)} stroke="#8fd9c0" strokeWidth={10} fill="none" />
    <path d={contorno(0)} stroke={PC.hifa} strokeWidth={5} fill="none" strokeDasharray="18 8" />
    {[[200, cy - 30, 48], [560, cy + 34, 40]].map(([x, y, rr], i) => <ellipse key={i} cx={x + Math.sin(T * 0.8 + i) * 6} cy={y} rx={rr} ry={rr * 0.62} fill="rgba(177,140,255,.35)" stroke={KC.lilac} strokeWidth={4} />)}
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={60 + i * 62 + Math.sin(T + i) * 8} cy={cy + Math.sin(i * 2.1) * 80} r={6} fill="rgba(234,255,247,.35)" />)}
  </g>;
}
// Molécula de ácido propiónico (esquema: 3 bolitas de la cadena + el H del ácido). h = el H sigue pegado; carga = muestra "–".
function AcidoP({ x, y, s = 1, h = 1, carga = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <line x1={-34} y1={0} x2={34} y2={0} stroke={KC.ink} strokeWidth={6} />
    {[-34, 0, 34].map((dx, i) => <circle key={i} cx={dx} cy={0} r={i === 2 ? 20 : 16} fill={i === 2 ? '#ff8a6a' : PC.ap} stroke={KC.ink} strokeWidth={4} />)}
    {h > 0 && <g opacity={h}><line x1={50} y1={-8} x2={62} y2={-18} stroke={KC.ink} strokeWidth={4} /><circle cx={68} cy={-22} r={11} fill={KC.white} stroke={KC.ink} strokeWidth={3} /></g>}
    {carga > 0 && <g opacity={carga}><circle cx={44} cy={22} r={15} fill={PC.anion} stroke={KC.ink} strokeWidth={3} /><text x={44} y={30} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>–</text></g>}
  </g>;
}
// Protón H⁺ (bolita roja con +).
function Proton({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle r={15} fill={PC.h} stroke={KC.ink} strokeWidth={3} />
    <text y={8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.white}>+</text></g>;
}
// Engrane (enzima, esquema). gira = ángulo; traba 0..1 = candado.
function Engrane({ x, y, r = 60, gira = 0, color = PC.engrane }) {
  const dientes = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; return <rect key={i} x={-10} y={-r - 16} width={20} height={24} rx={4} fill={color} stroke={KC.ink} strokeWidth={3} transform={`rotate(${(a * 180) / Math.PI})`} />; });
  return <g transform={`translate(${x} ${y}) rotate(${gira})`}>{dientes}<circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} /><circle r={r * 0.35} fill="#1d3a33" stroke={KC.ink} strokeWidth={4} /></g>;
}
function Candado({ x, y, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(1.8, 1, kEase.rebote(kclamp(o, 0, 1)))})`} opacity={kclamp(o * 2, 0, 1)}>
    <path d="M -22 -10 L -22 -32 Q -22 -56 0 -56 Q 22 -56 22 -32 L 22 -10" stroke={KC.ink} strokeWidth={9} fill="none" />
    <path d="M -22 -10 L -22 -32 Q -22 -56 0 -56 Q 22 -56 22 -32 L 22 -10" stroke="#c9ccd3" strokeWidth={5} fill="none" />
    <rect x={-34} y={-12} width={68} height={54} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={12} r={7} fill={KC.ink} />
  </g>;
}
// Pila de ATP que se vacía (nivel 0..1).
function Pila({ x, y, nivel = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={170} height={74} rx={12} fill="#1d1f24" stroke={KC.texto} strokeWidth={5} />
    <rect x={170} y={22} width={14} height={30} rx={4} fill={KC.texto} />
    <rect x={8} y={8} width={154 * kclamp(nivel, 0, 1)} height={58} rx={8} fill={nivel > 0.35 ? KC.mint : KC.red} />
    <text x={85} y={50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>ATP</text>
  </g>;
}
// Bomba de protones en la membrana (esquema). Centro en (x, y).
function Bomba({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-46} width={30} height={92} rx={12} fill="#ff8a1f" stroke={KC.ink} strokeWidth={4} />
    <rect x={4} y={-46} width={30} height={92} rx={12} fill="#ff8a1f" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Queso suizo (cuña) con hoyos.
function QuesoSuizo({ x, y, s = 1, burbuja = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 420 0 L 420 -250 L 0 -110 Z" fill={PC.queso} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 0 -110 L 420 -250 L 380 -280 L -30 -140 Z" fill={PC.queso2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[90, -60, 26], [220, -110, 38], [330, -60, 30], [340, -180, 22], [150, -30, 16], [260, -30, 18]].map(([cx, cy, r], i) =>
      <circle key={i} cx={cx} cy={cy} r={r * klerp(0.4, 1, kclamp(burbuja * 1.5 - i * 0.08, 0, 1))} fill="#d8a52c" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Bacteria en bastón.
function Baston({ x, y, rot = 0, color = '#ff8fb0', s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><rect x={-30} y={-12} width={60} height={24} rx={12} fill={color} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Intestino esquemático (asas) con fibra y bacterias.
function Intestino({ x, y, s = 1, T = 0, p = 1 }) {
  const d = 'M 0 0 C 0 -120 120 -120 120 -40 C 120 40 240 40 240 -40 C 240 -140 360 -140 360 -40 C 360 60 240 120 120 90 C 40 70 0 120 20 180';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} stroke={KC.ink} strokeWidth={78} fill="none" strokeLinecap="round" />
    <path d={d} stroke={PC.tripa} strokeWidth={64} fill="none" strokeLinecap="round" />
    <path d={d} stroke={PC.tripa2} strokeWidth={6} fill="none" strokeDasharray="4 22" />
    {p > 0 && [[60, -90], [180, 20], [300, -110], [250, 95]].map(([a, b], i) => <g key={i} opacity={kclamp(p * 2 - i * 0.2, 0, 1)}>
      <path d={`M ${a - 20} ${b} q 10 -14 20 0 t 20 0`} stroke={PC.fibra} strokeWidth={6} fill="none" />
      <Baston x={a + 8} y={b + 22 + Math.sin(T * 3 + i) * 4} rot={i * 40} s={0.6} color="#7fd3ff" /></g>)}
  </g>;
}

function PanCajaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Horno, M: CUES.Mohos, E: CUES.Etiqueta, En: CUES.Entra, P: CUES.Proton, Ea: CUES.Energia, Q: CUES.Pregunta,
    Es: CUES.Estudio, MM: CUES.MasaMadre, Qu: CUES.Queso, S: CUES.Seguro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caeA = kprog(T, K.G, K.G + 0.35, kEase.rebote), caeB = kprog(T, K.G + 0.15, K.G + 0.5, kEase.rebote);
  // punta de la hifa: crece mientras no hay ácido y se frena en «Energía»
  const tipX = 760 + 160 * kprog(T, K.En - 0.4, K.Ea + 1.5, (p) => 1 - Math.pow(1 - p, 2)) + 10 * kprog(T, K.Ea + 1.5, K.Q);
  // moléculas de la escena Entra: [x, neutra?]
  const MOL = [[150, 1], [330, 0], [480, 1], [640, 1], [800, 0], [900, 1]];
  const acido = kprog(T, K.P + 0.6, K.P + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: dos rebanadas; la de caja trae un antimoho */}
      <Escena T={T} a={-1} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa y={1120} />
          <RebPanaderia x={290} y={klerp(400, 1120, caeA)} s={0.92} />
          <RebCaja x={780} y={klerp(380, 1120, caeB)} s={0.92} />
          <Escudo x={780} y={950} s={0.9} o={kprog(T, K.G + 1.2, K.G + 1.6, kEase.rebote)} />
        </>)}
      </Escena>
      {/* 2 · el horno mata las esporas; al enfriar y rebanar caen otras */}
      <Escena T={T} a={K.H} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Horno x={60} y={640} T={T} calor={1 - kprog(T, K.H + 1.6, K.H + 2.2)} />
          {[[200, 860], [270, 900], [330, 850], [390, 905]].map(([sx, sy], i) => { const tx = kprog(T, K.H + 0.4 + i * 0.15, K.H + 0.7 + i * 0.15);
            return <g key={i} opacity={1 - kprog(T, K.H + 1.6, K.H + 2.0)}><circle cx={sx} cy={sy} r={8} fill={PC.moho} stroke={KC.ink} strokeWidth={2} opacity={1 - tx * 0.6} />
              {tx > 0 && <path d={`M ${sx - 14} ${sy - 14} L ${sx + 14} ${sy + 14} M ${sx + 14} ${sy - 14} L ${sx - 14} ${sy + 14}`} stroke={KC.red} strokeWidth={6} strokeLinecap="round" opacity={tx} />}</g>; })}
          <BarraPan x={800} y={1060} s={0.85} corte={kprog(T, K.H + 2.3, K.H + 3.6)} />
          {T > K.H + 2.3 && <g transform={`translate(${klerp(620, 980, (Math.sin((T - K.H) * 7) + 1) / 2)} ${780})`}>
            <rect x={-6} y={-90} width={12} height={110} rx={4} fill="#c9ccd3" stroke={KC.ink} strokeWidth={3} /></g>}
          {Array.from({ length: 9 }, (_, i) => <EsporaCae key={i} x0={640 + i * 40} y0={680} y1={830 + (i % 3) * 20} u={kprog(T, K.H + 1.8 + i * 0.15, K.H + 3.6 + i * 0.1)} seed={i} />)}
        </>)}
      </Escena>
      {/* 3 · quiénes son: tres mohos del pan (esquema) y la mancha que crece radial */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={60} y={420} width={960} height={430} rx={30} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
          <Penicillium x={210} y={800} s={1.05} p={kprog(T, K.M + 0.1, K.M + 1.2)} />
          <Aspergillus x={540} y={800} s={1.05} p={kprog(T, K.M + 0.6, K.M + 1.7)} />
          <RhizopusEsp x={860} y={790} s={1.05} p={kprog(T, K.M + 1.1, K.M + 2.2)} />
          <RebPanaderia x={300} y={1150} s={0.62} moho={kprog(T, K.M + 2.2, K.M + 4.3)} />
        </>)}
      </Escena>
      {/* 4 · la etiqueta de la bolsa genérica */}
      <Escena T={T} a={K.E} b={K.En} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g transform={`translate(330 1120) rotate(${Math.sin(T * 2) * 2})`}>
          <path d="M -230 0 L -250 -560 Q -250 -600 -200 -600 L 200 -600 Q 250 -600 250 -560 L 230 0 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
          <path d="M -120 -600 L -80 -660 L 80 -660 L 120 -600" fill="#e8336d" stroke={KC.ink} strokeWidth={6} />
          <text x={0} y={-500} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>PAN DE CAJA</text>
          <rect x={-200} y={-440} width={400} height={360} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
          <text x={-180} y={-400} style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>Ingredientes:</text>
          {['harina de trigo, agua,', 'levadura, azúcar, sal,', 'aceite vegetal,', 'propionato de calcio', '(conservador)…'].map((t, i) =>
            <text key={i} x={-180} y={-356 + i * 44} style={{ font:`700 ${i === 3 || i === 4 ? 26 : 22}px ${KF.mono}` }} fill={i === 3 || i === 4 ? KC.red : '#5a524a'}>{t}</text>)}
          {(() => { const h = kprog(T, K.E + 0.6, K.E + 1.1, kEase.sale); return h > 0 ? <rect x={-190} y={-252} width={392 * h} height={84} rx={10} fill="rgba(255,225,26,.45)" /> : null; })()}
          <g transform={`translate(${klerp(420, 250, kprog(T, K.E + 0.1, K.E + 0.7, kEase.sale))} -220)`}>
            <circle r={90} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={12} />
            <line x1={64} y1={64} x2={140} y2={140} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
          </g>
        </g>)}
      </Escena>
      {/* 5–7 · por dentro de la hifa (fondo oscuro) */}
      <Escena T={T} a={K.En} b={K.Q} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <HifaTubo T={T} tipX={tipX} acido={acido} />
          {/* Entra: las neutras cruzan la pared, las que traen carga rebotan */}
          {MOL.map(([mx, neutra], i) => {
            const t0 = K.En + 0.4 + i * 0.35, u = kprog(T, t0, t0 + 1.4, kEase.suave);
            let y;
            if (neutra) y = klerp(560, 880 + (i % 2) * 50, u);
            else { const b = kprog(T, t0, t0 + 0.7, kEase.sale), r = kprog(T, t0 + 0.7, t0 + 1.4, kEase.sale); y = 560 + 150 * b - 140 * r; }
            const suelta = neutra ? kprog(T, K.P + 0.3 + i * 0.12, K.P + 0.8 + i * 0.12) : 0;
            const yy = neutra ? y : y;
            return <g key={i}>
              <AcidoP x={mx} y={yy} s={0.9} h={neutra ? 1 - suelta : 0} carga={neutra ? suelta : 1} rot={Math.sin(T * 2 + i) * 10} />
              {neutra && suelta > 0 && (() => { // el protón suelto: en Energía sale por la bomba
                const sale = kprog(T, K.Ea + 0.3 + i * 0.2, K.Ea + 1.3 + i * 0.2, kEase.suave);
                const px = klerp(mx + 60 + 40 * suelta, 420, sale), py = klerp(yy - 30 - 40 * suelta, 640, sale);
                return <Proton x={px} y={py} o={1 - kprog(T, K.Ea + 1.3 + i * 0.2, K.Ea + 1.6 + i * 0.2)} />; })()}
            </g>; })}
          {/* Energía: bomba que saca H⁺ y gasta ATP; enzimas trabadas por el propionil-CoA (no por el H⁺) */}
          {T > K.Ea - 0.4 && <g opacity={kprog(T, K.Ea - 0.4, K.Ea)}>
            <Bomba x={420} y={760} />
            <Pila x={80} y={1050} nivel={1 - 0.75 * kprog(T, K.Ea + 0.3, K.Ea + 3.0)} />
            <Engrane x={700} y={850} r={48} gira={T < K.Ea + 2.4 ? T * 120 : (K.Ea + 2.4) * 120} />
            <Engrane x={792} y={912} r={40} gira={T < K.Ea + 2.4 ? -T * 144 + 18 : -(K.Ea + 2.4) * 144 + 18} color="#ffb3c9" />
            <Candado x={746} y={890} o={kprog(T, K.Ea + 2.2, K.Ea + 2.7)} />
            {T > K.Ea + 1.6 && <g opacity={kprog(T, K.Ea + 1.6, K.Ea + 2.0)}><rect x={612} y={960} width={260} height={32} rx={10} fill="rgba(14,15,18,.85)" />
              <text x={742} y={984} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.lilac}>propionil-CoA</text></g>}
          </g>}
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿lo mata? No: lo frena */}
      <Escena T={T} a={K.Q} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Interrogacion T={T} x={250} y={960} tam={460} />
          <Sello T={T} at={K.Q + 1.3} x={730} y={720} texto="NO" color={KC.ink} r={120} rot={-10} />
          <rect x={470} y={880} width={540} height={260} rx={26} fill={KC.noche} stroke={KC.ink} strokeWidth={7} />
          <RedHifas T={T} x={740} y={1010} g={0.35 + 0.25 * kprog(T, K.Q + 1.8, K.Es)} seed={7} n={160} escala={0.12} circ />
        </>)}
      </Escena>
      {/* 9–10 · el estudio de Cork: días sin moho */}
      <Escena T={T} a={K.Es} b={K.Qu} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const X0 = 110, D = 55, Y1 = 790, Y2 = 950;
          const b1 = kprog(T, K.Es + 3.4, K.Es + 5.4, kEase.suave), b2 = kprog(T, K.MM + 0.2, K.MM + 2.0, kEase.suave);
          const barra = (y, de, a, p, col) => <g>
            <rect x={X0} y={y} width={D * de * kclamp(p * (a / de), 0, 1)} height={66} rx={10} fill={col} stroke={KC.ink} strokeWidth={6} />
            {p * a > de && <rect x={X0 + D * de} y={y} width={D * (Math.min(p * a, a) - de)} height={66} rx={10} fill={col} opacity=".45" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />}
          </g>;
          return <g opacity={kprog(T, K.Es + 3.2, K.Es + 3.6)}>
            <rect x={60} y={700} width={960} height={480} rx={28} fill="rgba(244,239,228,.92)" stroke={KC.ink} strokeWidth={7} />
            <text x={X0} y={768} style={{ font:`700 27px ${KF.mono}` }} fill={KC.ink}>pan bajo en sal + 0.3 % propionato</text>
            {barra(Y1 + 6, 10, 12, b1, KC.cyan)}
            {b1 > 0.95 && <text x={X0 + D * 12 + 14} y={Y1 + 52} style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>10–12</text>}
            {T > K.MM && <text x={X0} y={Y2 - 22} style={{ font:`700 27px ${KF.mono}` }} fill={KC.ink}>con masa madre seleccionada</text>}
            {T > K.MM && barra(Y2 - 4, 12, 14, b2, KC.mint)}
            {b2 > 0.95 && <text x={X0 + D * 14 + 10} y={Y2 + 42} style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>12–14</text>}
            <line x1={X0} y1={1080} x2={X0 + D * 14} y2={1080} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 8 }, (_, i) => <g key={i}><line x1={X0 + D * i * 2} y1={1072} x2={X0 + D * i * 2} y2={1092} stroke={KC.ink} strokeWidth={4} />
              <text x={X0 + D * i * 2} y={1122} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{i * 2}</text></g>)}
            <text x={X0 + D * 14} y={1160} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>días sin moho</text>
          </g>; })())}
      </Escena>
      {/* 11 · queso suizo e intestino */}
      <Escena T={T} a={K.Qu} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <QuesoSuizo x={60} y={1010} s={1.0} burbuja={kprog(T, K.Qu + 0.3, K.Qu + 2.0)} T={T} />
          {[[120, 940], [210, 880], [300, 930], [380, 860]].map(([a, b], i) => <Baston key={i} x={a} y={b} rot={i * 35 + Math.sin(T * 2 + i) * 8} s={0.7} />)}
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.Qu) * 0.5 + i / 6) % 1; return T > K.Qu + 0.3 ? <circle key={i} cx={140 + i * 50} cy={860 - u * 160} r={9 + (i % 3) * 3} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={2} opacity={1 - u} /> : null; })}
          <AcidoP x={420} y={700} s={0.8} h={1} rot={Math.sin(T) * 12} />
          <Intestino x={620} y={830} s={0.95} T={T} p={kprog(T, K.Qu + 2.0, K.Qu + 3.2)} />
        </>)}
      </Escena>
      {/* 12 · sellos de seguridad */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Sello T={T} at={K.S + 0.4} x={250} y={830} texto="FDA" color={KC.ink} r={130} rot={-10} />
          <Sello T={T} at={K.S + 2.4} x={600} y={850} texto="EFSA" color="#2346ff" r={120} rot={8} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma mesa, una semana después (esquema) */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa y={1120} />
          <RebPanaderia x={290} y={1120} s={0.92} moho={kprog(T, K.C + 0.2, K.C + 2.2)} />
          <RebCaja x={780} y={1120} s={0.92} />
          <Escudo x={780} y={950} s={0.9} o={1} gasto={kprog(T, K.C + 0.8, K.C + 2.0)} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.6} until={K.H - 0.2} texto="no es inmortal" x={290} y={470} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 0.7} until={K.H - 0.2} x={110} y={1160} texto="pan de panadería" tam={30} color={KC.texto} />
      <Etq T={T} at={K.G + 0.9} until={K.H - 0.2} x={620} y={1160} texto="pan de caja" tam={30} color={KC.texto} />
      <Chip T={T} at={K.G + 1.5} until={K.H - 0.2} texto="antimoho" x={780} y={1060} tam={30} borde={KC.mint} mono />
      <Chip T={T} at={K.H + 0.3} until={K.H + 2.2} texto="el horno las mata" x={330} y={520} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.H + 2.3} until={K.M - 0.2} texto="al enfriar y rebanar" x={330} y={520} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.H + 2.6} until={K.M - 0.2} x={60} y={600} texto="esporas del aire →" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 0.1} until={K.E - 0.2} texto="MOHOS DEL PAN · ESQUEMA" x={540} y={380} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.M + 0.5} until={K.E - 0.2} x={95} y={890} texto="Penicillium" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 1.0} until={K.E - 0.2} x={420} y={890} texto="Aspergillus" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 1.5} until={K.E - 0.2} x={750} y={890} texto="Rhizopus" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 2.6} until={K.E - 0.2} texto="en unos días" x={760} y={1050} tam={38} borde={KC.red} />
      <Chip T={T} at={K.E + 1.0} until={K.En - 0.2} texto="antimoho" x={800} y={860} tam={38} borde={KC.mint} mono />
      <Chip T={T} at={K.En + 0.1} until={K.Q - 0.2} texto="POR DENTRO · UNA HIFA" x={330} y={420} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.En + 1.4} until={K.P - 0.2} x={60} y={510} texto="ácido propiónico sin carga: entra" tam={28} color={PC.ap} />
      <Etq T={T} at={K.En + 2.2} until={K.P - 0.2} x={460} y={600} texto="con carga: rebota" tam={26} color={PC.anion} />
      <Etq T={T} at={K.En + 2.0} until={K.Ea - 0.3} x={60} y={1035} texto="pared y membrana" tam={22} color="#8fd9c0" />
      <Etq T={T} at={K.P + 0.6} until={K.Ea - 0.2} x={60} y={520} texto="suelta su protón (H⁺)" tam={30} color={PC.h} />
      <Etq T={T} at={K.P + 1.6} until={K.Ea - 0.2} x={60} y={1100} texto="célula más ácida (teoría clásica)" tam={26} color={KC.orange} />
      <Etq T={T} at={K.Ea + 0.4} until={K.Q - 0.2} x={270} y={1087} texto="sacarlo gasta energía" tam={24} color={KC.mint} />
      <Etq T={T} at={K.Ea + 1.8} until={K.Q - 0.2} x={60} y={520} texto="en mohos: enzimas trabadas" tam={28} color={KC.lilac} />
      <Chip T={T} at={K.Ea + 2.9} until={K.Q - 0.2} texto="casi no crece" x={760} y={680} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Q + 0.1} until={K.Es - 0.2} texto="¿lo mata?" x={300} y={420} tam={48} borde={KC.ink} />
      <Chip T={T} at={K.Q + 1.5} until={K.Es - 0.2} texto="solo lo frena" x={730} y={560} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Q + 2.2} until={K.Es - 0.2} x={480} y={915} texto="algunas cepas lo resisten:" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Q + 2.5} until={K.Es - 0.2} x={480} y={1110} texto="Penicillium roqueforti" it tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.1} anio="2012" quien="University College Cork, Irlanda" revista="Appl. Microbiol. Biotechnol., 2012" x={540} y={760} />
      <Chip T={T} at={K.Es + 3.3} until={K.Qu - 0.2} texto="2012 · Cork, Irlanda" x={320} y={440} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Es + 3.5} until={K.Qu - 0.2} texto="pan de trigo bajo en sal" x={320} y={540} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.MM + 1.0} until={K.Qu - 0.2} x={110} y={1046} texto="con Lactobacillus amylovorus" it tam={24} color="#11734f" />
      <Etq T={T} at={K.Qu + 0.6} until={K.S - 0.2} x={60} y={1060} texto="queso suizo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Qu + 1.0} until={K.S - 0.2} x={60} y={1110} texto="Propionibacterium freudenreichii" it tam={24} color={KC.ink} />
      <Etq T={T} at={K.Qu + 0.9} until={K.S - 0.2} x={310} y={640} texto="ácido propiónico" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Qu + 2.2} until={K.S - 0.2} x={620} y={1080} texto="tu intestino:" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Qu + 2.5} until={K.S - 0.2} x={620} y={1125} texto="bacterias + fibra" tam={26} color={KC.ink} />
      <Chip T={T} at={K.S + 0.7} until={K.C - 0.2} texto="FDA 1984 · reconocido como seguro (GRAS)" x={540} y={1040} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.S + 2.7} until={K.C - 0.2} texto="EFSA 2014 · sin riesgo en las dosis permitidas" x={540} y={1120} tam={28} borde="#2346ff" />
      <Chip T={T} at={K.C + 0.1} until={K.Ou} texto="1 semana después (esquema)" x={320} y={440} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="no es inmortal: va frenado" x={330} y={560} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.C + 0.3} until={K.Ou} x={110} y={1160} texto="pan de panadería" tam={30} color={KC.texto} />
      <Etq T={T} at={K.C + 0.3} until={K.Ou} x={620} y={1160} texto="pan de caja" tam={30} color={KC.texto} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={80} />
      <BarraEscala T={T} at={K.H} until={K.M} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.M} until={K.E} texto="20 µm (esquema)" largo={120} />
      <BarraEscala T={T} at={K.E} until={K.En} texto="10 cm" largo={140} />
      <BarraEscala T={T} at={K.En} until={K.Q} texto="5 µm (esquema)" largo={240} />
      <BarraEscala T={T} at={K.Q} until={K.Es} texto="20 µm (esquema)" largo={100} />
      <BarraEscala T={T} at={K.Qu} until={K.S} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={80} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es inmortal: *trae un antimoho.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.M - 0.1} texto="El horno las mata… *pero caen otras.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.E - 0.1} texto="En unos días: *la mancha.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.En - 0.1} texto="Trae *propionato de calcio.*" />
      <Subtitulo T={T} idx={4} at={K.En + 0.1} until={K.P - 0.1} texto="Sin carga, *se cuela en la hifa.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ea - 0.1} texto="Suelta su protón: *acidifica.*" />
      <Subtitulo T={T} idx={6} at={K.Ea + 0.1} until={K.Q - 0.1} texto="Le cuesta energía: *casi no crece.*" />
      <Subtitulo T={T} idx={7} at={K.Q + 0.1} until={K.Es - 0.1} texto="¿Lo mata? *No: lo frena.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.MM - 0.1} texto="2012: *10 a 12 días* sin moho." />
      <Subtitulo T={T} idx={9} at={K.MM + 0.1} until={K.Qu - 0.1} texto="Con masa madre: *12 a 14.*" />
      <Subtitulo T={T} idx={10} at={K.Qu + 0.1} until={K.S - 0.1} texto="También en el *queso suizo* y tu intestino." />
      <Subtitulo T={T} idx={11} at={K.S + 0.1} until={K.C - 0.1} texto="Seguro *en las dosis permitidas.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es inmortal: *solo va frenado.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.3, K.M + 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 0.4, K.En - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 1.0, K.Ea - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Q + 0.05, K.Es + 0.2, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.Es + 3.3, K.Qu - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Qu + 0.4, K.S - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.S + 1.0, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="62" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PanCajaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PanCajaShot /></CompositionStage></div>;
}
window.PanCajaApp = PanCajaApp;
