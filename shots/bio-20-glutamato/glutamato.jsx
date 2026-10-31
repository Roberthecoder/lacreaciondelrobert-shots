// Shot Biotecnológico #20 · El glutamato de tu sopa lo hace una bacteria — NARRADO (N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos.
// Corynebacterium glutamicum: bastón con forma de mazo (un extremo más grueso), SIN flagelo (no se mueve sola),
// ~1 µm de ancho y 2–5 µm de largo; las hijas quedan en "V" al dividirse (VAAM 2025).
const GLU = '#2fe0a8', GLUC = '#ffd43b', CORY = '#ffb35c', CANAL = '#9b5de5';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- moléculas esquemáticas ---------- */
// Glutamato: cadena de 5 carbonos en zigzag, un grupo ácido en cada punta (O rojos) y el amino (N azul) en el 2.º carbono.
function GluMol({ x = 0, y = 0, s = 1, rot = 0, o = 1, brillo = 0 }) {
  if (o <= 0) return null;
  const P = [[-80, 0], [-40, -22], [0, 0], [40, -22], [80, 0]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle r={110} fill={GLU} opacity={0.35 * brillo} />}
    <polyline points={P.map((p) => p.join(',')).join(' ')} fill="none" stroke={KC.ink} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
    <polyline points={P.map((p) => p.join(',')).join(' ')} fill="none" stroke={GLU} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
    {P.map(([px, py], i) => <circle key={i} cx={px} cy={py} r={11} fill="#3b3f46" stroke={KC.ink} strokeWidth={4} />)}
    {[[-110, -18], [-106, 26], [110, -18], [106, 26]].map(([px, py], i) => <circle key={'o' + i} cx={px} cy={py} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />)}
    <line x1={-40} y1={-22} x2={-40} y2={-60} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-40} cy={-66} r={15} fill="#3a7bff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Glucosa: anillo de 6 (5 carbonos + 1 oxígeno), amarillo.
function Glucosa({ x = 0, y = 0, s = 1, rot = 0, o = 1 }) {
  if (o <= 0) return null;
  const pts = [0, 1, 2, 3, 4, 5].map((i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [34 * Math.cos(a), 34 * Math.sin(a)]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={GLUC} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={pts[4][0]} cy={pts[4][1]} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Cristalito de glutamato monosódico: prisma blanco alargado.
function Cristal({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -7 -18 L 7 -18 L 11 -10 L 11 12 L 7 18 L -7 18 L -11 12 L -11 -10 Z" fill="#ffffff" stroke="#6b8aa6" strokeWidth={3} strokeLinejoin="round" />
    <line x1={-3} y1={-14} x2={-3} y2={14} stroke="#cfe3f2" strokeWidth={3} />
  </g>;
}

/* ---------- la bacteria: bastón en forma de mazo, sin flagelo ---------- */
function corPath(L, W) {
  const a = W * 0.36, b = W * 0.5;
  return `M ${-L / 2 + a} ${-a} L ${L / 2 - b} ${-b} A ${b} ${b} 0 0 1 ${L / 2 - b} ${b} L ${-L / 2 + a} ${a} A ${a} ${a} 0 0 1 ${-L / 2 + a} ${-a} Z`;
}
function Coryne({ T = 0, x = 0, y = 0, largo = 240, ancho = 100, rot = 0, color = CORY, seed = 1, adentro, tension = 0, o = 1 }) {
  const L = largo, W = ancho, g = krng(seed);
  const granos = Array.from({ length: 8 }, () => [(g() - 0.5) * (L - W), (g() - 0.5) * W * 0.5, 3 + g() * 5]);
  const pulso = 1 + tension * 0.025 * Math.sin(T * 9);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.3) * 2}) scale(1 ${pulso})`} opacity={o}>
    <path d={corPath(L + 14, W + 14)} fill="none" stroke={mixHex('#3b2a18', KC.orange, tension)} strokeWidth={8 + tension * 6} />
    <path d={corPath(L, W)} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-L / 2 + W * 0.4} ${-W * 0.2} L ${L / 2 - W * 0.6} ${-W * 0.3}`} stroke="#fff" strokeWidth={W * 0.12} strokeLinecap="round" opacity=".3" />
    {granos.map(([gx, gy, gr], i) => <circle key={i} cx={gx} cy={gy} r={gr} fill={KC.ink} opacity=".15" />)}
    <path d={`M ${-L * 0.25} 0 C ${-L * 0.15} ${-W * 0.25}, ${-L * 0.05} ${W * 0.25}, ${L * 0.05} 0 S ${L * 0.18} ${-W * 0.25}, ${L * 0.26} 0`} stroke="#7a3d12" strokeWidth={5} fill="none" opacity=".5" />
    {adentro && adentro(L, W)}
  </g>;
}
// Par de hijas recién divididas, en "V".
function ParV({ T, x, y, s = 1, rot = 0, seed = 1 }) {
  const ab = 14 + mece(T, seed, 0.4) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Coryne T={T} x={-62} y={-20} largo={140} ancho={56} rot={-ab} seed={seed} />
    <Coryne T={T} x={62} y={-20} largo={140} ancho={56} rot={180 + ab} seed={seed + 3} />
  </g>;
}

/* ---------- objetos de la cocina y del laboratorio ---------- */
function VasoSopa({ T, x, y, s = 1, montoncito = 0, sello = 0 }) {
  const R = krng(4);
  const crist = Array.from({ length: 26 }, () => [(R() - 0.5) * 120 * (0.4 + R() * 0.6), -R() * 36, R() * 180]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((k) => { const ph = (T * 0.5 + k / 3) % 1; return <path key={k} d={`M ${-90 + k * 90} ${-260 - ph * 180} q 30 -40 0 -80 t 0 -80`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.65 * Math.sin(ph * Math.PI)} />; })}
    <path d="M -220 -230 L 220 -230 L 175 230 L -175 230 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <path d="M -205 -110 L 205 -110 L 195 -20 L -196 -20 Z" fill={KC.red} />
    <text x={0} y={-48} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff" letterSpacing="4">SOPA</text>
    <path d="M -186 80 L 186 80" stroke="#e2d9c6" strokeWidth={8} />
    <ellipse cx={0} cy={-230} rx={220} ry={46} fill="#e9a54b" stroke={KC.ink} strokeWidth={12} />
    {[-120, -60, 0, 60, 120].map((dx, i) => <path key={i} d={`M ${dx - 40} -236 q 20 ${-14 + i % 2 * 24} 40 0 t 40 0`} stroke="#ffe7a6" strokeWidth={9} fill="none" strokeLinecap="round" />)}
    <circle cx={-110} cy={-222} r={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} /><circle cx={130} cy={-240} r={12} fill={KC.orange} stroke={KC.ink} strokeWidth={3} />
    {montoncito > 0 && crist.map(([cx, cy, r], i) => i / crist.length < montoncito ? <Cristal key={i} x={cx} y={-238 + cy} s={0.85} rot={r} /> : null)}
    {sello > 0 && <g transform={`translate(0 -250) rotate(-10) scale(${klerp(2.2, 1, kEase.sale(sello))})`} opacity={kclamp(sello * 2, 0, 1)}>
      <circle r={128} fill="rgba(255,255,255,.88)" stroke={KC.red} strokeWidth={12} />
      <circle r={108} fill="none" stroke={KC.red} strokeWidth={4} strokeDasharray="10 8" />
      <text y={-12} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.red}>HECHO POR</text>
      <text y={38} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>BACTERIAS</text>
    </g>}
  </g>;
}
function Sobre({ x, y, rot = 0, rasga = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-90} y={-130} width={180} height={240} rx={12} fill={KC.orange} stroke={KC.ink} strokeWidth={9} />
    <rect x={-70} y={-60} width={140} height={90} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-5} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>sazón</text>
    <g transform={`translate(${rasga * 120} ${-rasga * 160}) rotate(${rasga * 50} 0 -140)`} opacity={1 - kprog(rasga, 0.7, 1)}>
      <path d="M -90 -130 L 90 -130 L 90 -170 L -90 -170 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={9} />
    </g>
  </g>;
}
function Olla({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3].map((k) => { const ph = (T * 0.45 + k / 4) % 1; return <path key={k} d={`M ${-160 + k * 100} ${-200 - ph * 220} q 34 -40 0 -80 t 0 -80`} stroke="#fff" strokeWidth={13} fill="none" strokeLinecap="round" opacity={0.6 * Math.sin(ph * Math.PI)} />; })}
    {/* tira de alga kombu: lámina ancha, café verdosa, con orilla ondulada */}
    <path d={`M -120 -150 C -200 -330, -40 -380, -110 -540 C -60 -${520 + mece(T, 2, 0.3) * 20}, 10 -420, -30 -300 C -20 -240, -50 -190, -40 -150 Z`} fill="#5b6b2e" stroke={KC.ink} strokeWidth={9} />
    <path d="M -100 -200 C -120 -300, -60 -380, -90 -480" stroke="#8a9a4a" strokeWidth={7} fill="none" opacity=".7" />
    <path d="M -280 -150 L 280 -150 L 250 150 Q 0 210 -250 150 Z" fill="#7d8792" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <ellipse cx={0} cy={-150} rx={280} ry={50} fill="#c9a86a" stroke={KC.ink} strokeWidth={12} />
    <rect x={-350} y={-120} width={80} height={34} rx={14} fill="#4a525c" stroke={KC.ink} strokeWidth={8} />
    <rect x={270} y={-120} width={80} height={34} rx={14} fill="#4a525c" stroke={KC.ink} strokeWidth={8} />
    <path d="M -230 -90 L -200 120" stroke="#a6b0ba" strokeWidth={16} strokeLinecap="round" opacity=".6" />
    {[-160, -60, 40, 140].map((dx, i) => <path key={i} d={`M ${dx} 210 q 20 -50 0 -90`} stroke={i % 2 ? KC.orange : KC.yellow} strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.7 + 0.3 * Math.sin(T * 8 + i)} />)}
  </g>;
}
function Cana({ x, y, h = 620, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, 3, 0.3) * 2})`}>
    <rect x={-22} y={-h} width={44} height={h} rx={14} fill="#a7c957" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-22} x2={22} y1={-h + 70 + i * (h / 6.4)} y2={-h + 70 + i * (h / 6.4)} stroke={KC.ink} strokeWidth={6} />)}
    <path d={`M 0 ${-h} q -90 -60 -150 -40 M 0 ${-h} q 80 -90 150 -60 M 0 ${-h + 60} q 90 -30 140 10`} stroke="#3fbf4a" strokeWidth={16} fill="none" strokeLinecap="round" />
  </g>;
}
function Mazorca({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={56} ry={150} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={-30 + (i % 3) * 30} cy={-120 + Math.floor(i / 3) * 26} r={10} fill="#ffcf2e" stroke="#c9961a" strokeWidth={3} />)}
    <path d="M -60 40 Q -110 140 -20 180 L 0 120 Z M 60 40 Q 110 140 20 180 L 0 120 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Matraz({ T, x, y, rompe = 0 }) {
  const R = krng(9);
  const beads = Array.from({ length: 10 }, (_, i) => [i, R()]);
  const col = [KC.pink, KC.cyan, GLU, KC.yellow, KC.lilac];
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -60 -330 L -60 -140 L -250 170 Q -270 220 -220 220 L 220 220 Q 270 220 250 170 L 60 -140 L 60 -330 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <path d="M -150 20 L 150 20 L 240 175 Q 255 205 220 205 L -220 205 Q -255 205 -240 175 Z" fill="#d6f5a2" />
    <rect x={-80} y={-350} width={160} height={30} rx={10} fill="#cfd8e0" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 10 }, (_, i) => { const ph = (T * 0.8 + i * 0.13) % 1; return <circle key={i} cx={-150 + i * 33} cy={200 - ph * 170} r={7 + (i % 3) * 3} fill="none" stroke="#fff" strokeWidth={3} opacity={1 - ph} />; })}
    {beads.map(([i, r]) => { const bx = -180 + i * 40, by = 120 + Math.sin(i * 1.3 + T * 2) * 12, sep = rompe * (r - 0.5) * 120;
      return <g key={i}>
        {i < 9 && <line x1={bx} y1={by} x2={bx + 40} y2={120 + Math.sin((i + 1) * 1.3 + T * 2) * 12} stroke={KC.ink} strokeWidth={6} opacity={1 - rompe} />}
        <circle cx={bx + sep * 0.3} cy={by + sep - rompe * 20} r={16} fill={col[i % 5]} stroke={KC.ink} strokeWidth={5} />
      </g>; })}
  </g>;
}
function Trigo({ x, y, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, 5, 0.3) * 3})`}>
    <path d="M 0 0 L 0 -420" stroke="#c9961a" strokeWidth={10} />
    {Array.from({ length: 7 }, (_, i) => [-1, 1].map((l) => <ellipse key={i + '_' + l} cx={l * 20} cy={-300 - i * 26} rx={14} ry={26} transform={`rotate(${l * 25} ${l * 20} ${-300 - i * 26})`} fill="#f4c25a" stroke={KC.ink} strokeWidth={5} />))}
  </g>;
}
function Gotero({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-200} width={68} height={70} rx={30} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <path d="M -24 -132 L 24 -132 L 12 0 L -12 0 Z" fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Pajaro({ T, x, y, s = 1 }) {
  const ala = Math.sin(T * 14) * 40;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={90} ry={56} fill="#9aa8c2" stroke={KC.ink} strokeWidth={8} />
    <circle cx={78} cy={-36} r={40} fill="#9aa8c2" stroke={KC.ink} strokeWidth={8} />
    <circle cx={92} cy={-44} r={8} fill={KC.ink} />
    <path d="M 114 -34 L 150 -26 L 114 -18 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -90 -6 L -150 -30 L -140 20 Z" fill="#7d8aa6" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -20 -20 Q -40 ${-90 - ala} 40 ${-110 - ala * 0.5} Q 30 -40 20 -20 Z`} fill="#7d8aa6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
function Costal({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -90 Q -100 0 -90 80 Q 0 100 90 80 Q 100 0 80 -90 Q 0 -110 -80 -90 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 -100 L 0 -130 L 30 -100" stroke={KC.ink} strokeWidth={8} fill="none" />
    <text x={0} y={20} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.red}>GLU</text>
  </g>;
}
function Tomate({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <path d="M -34 -60 L 0 -46 L 34 -60 L 12 -70 L 0 -92 L -12 -70 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={-26} cy={-20} rx={16} ry={10} fill="#fff" opacity=".4" />
  </g>;
}
function Queso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 50 L 90 50 L 90 -10 L -90 -60 Z" fill="#ffd43b" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={-30} cy={10} r={13} fill="#e8a62a" /><circle cx={40} cy={25} r={9} fill="#e8a62a" /><circle cx={50} cy={-5} r={7} fill="#e8a62a" />
  </g>;
}
function Colonias({ tipo, n = 18, seed = 1, crece = 1 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = R() * 6.28, d = Math.sqrt(R()) * 110, r = (tipo === 'hongo' ? 16 + R() * 14 : tipo === 'levadura' ? 9 + R() * 7 : 5 + R() * 5) * crece;
    const cx = Math.cos(a) * d, cy = Math.sin(a) * d;
    if (tipo === 'hongo') return <g key={i}><circle cx={cx} cy={cy} r={r} fill="#d8f0c8" stroke="#7aa35a" strokeWidth={3} strokeDasharray="3 3" /><circle cx={cx} cy={cy} r={r * 0.35} fill="#5a8f3a" /></g>;
    return <circle key={i} cx={cx} cy={cy} r={r} fill={tipo === 'levadura' ? '#fff6e0' : '#ffb35c'} stroke={KC.ink} strokeWidth={2} />; })}</g>;
}

/* ---------- el shot ---------- */
function Glutamato() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ko: CUES.Kombu, Ta: CUES.Tanque, PD: CUES.PorDentro, Bi: CUES.Biotina, Ca: CUES.Canal, Pr: CUES.Pregunta, An: CUES.Antes, Es: CUES.Estudio, Cm: CUES.Campeona, Cc: CUES.Caca, Nu: CUES.Numero, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const V = MUNDO_BIORREACTOR.ventana;
  // bacteria grande "por dentro": centro y medidas
  const BX = 540, BY = 930, BL = 860, BW = 380;
  const canales = [-250, -80, 90, 250];
  const abre = kprog(T, K.Ca + 0.3, K.Ca + 1.0, kEase.sale);
  const tension = kprog(T, K.Bi + 1.4, K.Bi + 2.6) * (1 - 0.5 * abre);
  // moléculas que entran (glucosa) y se vuelven glutamato
  const NMOL = 9;
  const mol = (i) => {
    const t0 = K.PD + 0.4 + i * 0.45, u = (T - t0) / 3.2;                 // 0..1 viaje adentro
    const fy = BY + ((i * 53) % 160 - 80);
    if (u < 0) return null;
    if (u < 1) {
      const xx = klerp(BX - BL / 2 - 140, BX + 120, kEase.suave(kclamp(u, 0, 1)));
      const cambia = kprog(u, 0.45, 0.65);
      return <g key={i}><Glucosa x={xx} y={fy} s={0.8} rot={T * 40 + i * 30} o={1 - cambia} /><GluMol x={xx} y={fy} s={0.45} rot={mece(T, i, 0.5) * 20} o={cambia} brillo={cambia * 0.5} /></g>;
    }
    // ya es glutamato: espera adentro; cuando se abren los canales, sale por el más cercano
    const cx0 = BX + 120 + ((i * 71) % 220 - 110), cy0 = fy + mece(T, i, 0.4) * 30;
    const ch = canales[i % 4], arriba = i % 2 === 0;
    const sal = kprog(T, K.Ca + 0.6 + (i % 5) * 0.35, K.Ca + 2.0 + (i % 5) * 0.35, kEase.suave);
    const px = BX + ch, py = BY + (arriba ? -BW / 2 - 6 : BW / 2 + 6), dest = arriba ? py - 300 : py + 260;
    const xx = sal < 0.5 ? klerp(cx0, px, sal * 2) : px + mece(T, i, 0.7) * 30;
    const yy = sal < 0.5 ? klerp(cy0, py, sal * 2) : klerp(py, dest, (sal - 0.5) * 2);
    return <GluMol key={i} x={xx} y={yy} s={0.45} rot={mece(T, i, 0.5) * 30} brillo={0.5} />;
  };
  // Gancho y cierre: el sobre suelta cristalitos sobre la sopa
  const rasga = kprog(T, K.G, K.G + 0.5, kEase.sale);
  const R = krng(12);
  const caida = Array.from({ length: 22 }, (_, i) => [R(), R(), R()]);
  const montoncito = kprog(T, K.G + 0.6, K.G + 3.4);
  // Campeona: 4 glucosas → 1 glutamato, en ciclo
  const ciclo = ((T - K.Cm - 0.6) / 1.6);
  const fase = ciclo - Math.floor(ciclo);
  // Caca de pájaro
  const pajX = klerp(-200, 1300, kprog(T, K.Cc - 0.3, K.Cc + 2.6));
  const plop = kprog(T, K.Cc + 0.5, K.Cc + 0.95, (p) => p * p);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el sobre de la sopa suelta cristalitos de glutamato */}
      <Escena T={T} a={K.G} b={K.Ko} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <VasoSopa T={T} x={400} y={1110} s={1} montoncito={montoncito} />
          {caida.map(([a, b, c], i) => { const t0 = K.G + 0.35 + a * 2.6, p = kprog(T, t0, t0 + 0.6, (q) => q * q);
            return p > 0 && p < 1 ? <Cristal key={i} x={330 + (b - 0.5) * 50 + p * 30} y={klerp(700, 880, p)} s={0.9} rot={c * 360 + T * 200} /> : null; })}
          <Sobre x={290} y={640} rot={klerp(0, 150, kprog(T, K.G + 0.2, K.G + 0.6, kEase.sale))} rasga={rasga} />
        </SvgCapa>
      </Escena>
      {/* 1 · Ikeda, 1908: el caldo de alga kombu */}
      <Escena T={T} a={K.Ko} b={K.Ta} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Olla T={T} x={540} y={1060} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.Ko + 1.0 + i * 0.22, p = kprog(T, t0, t0 + 1.4, kEase.sale);
            return p > 0 ? <Cristal key={i} x={540 + (i % 7 - 3) * 60 + Math.sin(T * 2 + i) * 10} y={klerp(900, 640 + (i % 3) * 40, p)} s={1.3} rot={i * 47 + T * 30} o={kprog(T, t0, t0 + 0.3)} /> : null; })}
          {T > K.Ko + 2.6 && <GluMol x={720} y={760} s={1} rot={mece(T, 3, 0.4) * 10} o={kprog(T, K.Ko + 2.6, K.Ko + 3.0)} brillo={0.6} />}
        </SvgCapa>
      </Escena>
      {/* 2 · el tanque: la bacteria come azúcar */}
      <Escena T={T} a={K.Ta} b={K.PD} zoom={0.03}>
        <MundoBiorreactor T={T} turbio={0.6} burbujas={1} rpm={100} fondo={KC.cyan} />
        <SvgCapa>
          <Cana x={110} y={1420} h={640} T={T} />
          <Mazorca x={975} y={1150} s={0.9} rot={12} />
          {Array.from({ length: 10 }, (_, i) => { const izq = i % 2 === 0, t0 = K.Ta + 0.4 + i * 0.32, p = kprog(T, t0, t0 + 1.1, kEase.suave);
            const x0 = izq ? 150 : 940, y0 = izq ? 760 : 960, x1 = 540 + (i % 3 - 1) * 90, y1 = 760;
            return p > 0 && p < 1 ? <Glucosa key={i} x={klerp(x0, x1, p)} y={klerp(y0, y1, p) - Math.sin(p * Math.PI) * 220} s={0.8} rot={T * 90 + i * 20} /> : null; })}
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Ta + 2.0} until={K.PD - 0.1} x={540} y={760} r={240} fx={V.x} fy={V.y} tinte={KC.orange}
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1a1206" />
          <g transform={`translate(${r} ${r})`}>
            <ParV T={t} x={-60} y={-40} s={0.95} rot={-10} seed={2} />
            <Coryne T={t} x={90} y={110} largo={150} ancho={60} rot={20} seed={7} />
            <Coryne T={t} x={-120} y={140} largo={130} ancho={54} rot={-160} seed={9} />
            {[0, 1, 2, 3].map((i) => <Glucosa key={i} x={-150 + i * 100 + mece(t, i, 0.5) * 20} y={-150 + (i % 2) * 30} s={0.5} rot={t * 60} />)}
          </g>
        </svg>} etiqueta="AL MICROSCOPIO · el caldo" />
      {/* 3–5 · POR DENTRO de la bacteria: azúcar → glutamato · biotina · canales */}
      <Escena T={T} a={K.PD} b={K.Pr} zoom={0.02}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Coryne T={T} x={BX} y={BY} largo={BL} ancho={BW} seed={4} tension={tension}
            adentro={(L, W) => <g>{canales.map((cx, i) => [-1, 1].map((l) => { const yy = l * (W / 2 + 4), g = 6 + abre * 22;
              return <g key={i + '_' + l}><rect x={cx - g - 18} y={yy - 22} width={18} height={44} rx={6} fill={CANAL} stroke={KC.ink} strokeWidth={4} />
                <rect x={cx + g} y={yy - 22} width={18} height={44} rx={6} fill={CANAL} stroke={KC.ink} strokeWidth={4} /></g>; }))}</g>} />
          {Array.from({ length: NMOL }, (_, i) => mol(i))}
          {T < K.Bi + 0.2 && T > K.PD + 0.2 && <g opacity={kprog(T, K.PD + 1.2, K.PD + 1.6) * (1 - kprog(T, K.Bi - 0.2, K.Bi + 0.2))}>
            <Tomate x={190} y={470} s={0.9} /><Queso x={360} y={480} s={0.9} />
            <GluMol x={520} y={470} s={0.55} brillo={0.6} rot={mece(T, 8, 0.4) * 10} />
          </g>}
          {T > K.Bi && T < K.Ca + 0.5 && <g opacity={kprog(T, K.Bi, K.Bi + 0.3) * (1 - kprog(T, K.Ca, K.Ca + 0.5))}>
            <Gotero x={540} y={600} />
            {(() => { const p = kprog(T, K.Bi + 0.7, K.Bi + 1.3, (q) => q * q); return p < 1 ? <path d={`M 540 ${klerp(600, 730, p) - 22} q 14 22 0 30 q -14 -8 0 -30 Z`} fill="#ff6b9a" stroke={KC.ink} strokeWidth={4} opacity={T > K.Bi + 0.6 ? 1 : 0} /> : <circle cx={540} cy={740} r={26 * (1 - kprog(T, K.Bi + 1.3, K.Bi + 1.8))} fill="none" stroke="#ff6b9a" strokeWidth={5} />; })()}
          </g>}
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={BL / 0.0022} objetivo={400} y={1440} />
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.Pr} b={K.An} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Coryne T={T} x={790} y={980} largo={360} ancho={150} rot={-15} seed={5} />
          <text x={790} y={820} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 790 700)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · antes: proteínas de plantas + ácido */}
      <Escena T={T} a={K.An} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Trigo x={150} y={1180} T={T} />
          <Matraz T={T} x={580} y={960} rompe={kprog(T, K.An + 1.4, K.An + 3.4, kEase.suave)} />
        </SvgCapa>
      </Escena>
      {/* 8 · 1957: prueban bacterias, levaduras y hongos */}
      <Escena T={T} a={K.Es} b={K.Cm} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[['bacterias', 'bacteria', 200], ['levaduras', 'levadura', 540], ['hongos', 'hongo', 880]].map(([t, tipo, x], i) => {
            const at = K.Es + 0.6 + i * 0.7, e = kprog(T, at, at + 0.4, kEase.rebote);
            return e > 0 ? <g key={i} transform={`translate(${x} 860) scale(${e})`}>
              <PlacaPetri x={0} y={0} r={150} id={'pp' + i}><Colonias tipo={tipo} seed={i + 3} crece={kprog(T, at + 0.2, at + 2.5)} /></PlacaPetri>
              <text x={0} y={210} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{t}</text>
            </g> : null; })}
        </SvgCapa>
      </Escena>
      {/* 9 · la campeona: de cada 4 glucosas, 1 glutamato */}
      <Escena T={T} a={K.Cm} b={K.Cc} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <circle cx={600} cy={820} r={280 + Math.sin(T * 4) * 10} fill="#fff6b0" opacity=".55" />
          <PlacaPetri x={600} y={820} r={240} id="ppc"><Colonias tipo="bacteria" n={30} seed={21} />
            <ParV T={T} x={0} y={10} s={0.8} seed={11} /></PlacaPetri>
          <g transform={`translate(830 590) rotate(${Math.sin(T * 3) * 8})`} opacity={kprog(T, K.Cm + 0.3, K.Cm + 0.6)}>
            <circle r={62} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} /><text y={24} textAnchor="middle" style={{ font:`400 72px ${KF.titulo}` }} fill={KC.ink}>1</text>
          </g>
          {T > K.Cm + 0.6 && <g>
            {[0, 1, 2, 3].map((i) => { const llega = kprog(fase, 0, 0.45, kEase.suave), x0 = 120 + i * 105;
              return <Glucosa key={i} x={klerp(x0, 600, llega)} y={klerp(1560, 1560, llega)} s={1.1} rot={T * 60} o={1 - kprog(fase, 0.4, 0.5)} />; })}
            <path d="M 560 1560 L 640 1560" stroke={KC.ink} strokeWidth={0} />
            <GluMol x={klerp(600, 860, kprog(fase, 0.5, 0.8, kEase.sale))} y={1560} s={0.8} o={kprog(fase, 0.45, 0.55)} brillo={0.7} />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 10 · tierra con caca de pájaro */}
      <Escena T={T} a={K.Cc} b={K.Nu} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <rect x={0} y={1060} width={KW} height={900} fill="#8b5a2b" />
          <path d="M 0 1060 Q 270 1030 540 1060 T 1080 1060" fill="#6b4220" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={(i * 137) % 1080} cy={1110 + (i * 53) % 120} r={10 + (i % 3) * 6} fill="#6b4220" />)}
          <Pajaro T={T} x={pajX} y={560} s={1} />
          {plop > 0 && plop < 1 && <ellipse cx={720} cy={klerp(600, 1060, plop)} rx={14} ry={20} fill="#fff" stroke={KC.ink} strokeWidth={4} />}
          {plop >= 1 && <g transform="translate(720 1062)"><path d="M -60 0 Q -40 -34 0 -30 Q 44 -36 62 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle cx={-6} cy={-30} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} /></g>}
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Cc + 1.2} until={K.Nu - 0.1} x={780} y={1500} r={150} fx={720} fy={1050} tinte={KC.orange}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a1206" />
          <g transform={`translate(${r} ${r})`}><ParV T={t} x={0} y={10} s={0.8} seed={13} /></g></svg>} etiqueta="AL MICROSCOPIO" />
      {/* 11 · el número */}
      <Escena T={T} a={K.Nu} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {Array.from({ length: 12 }, (_, i) => { const fila = i < 5 ? 0 : i < 9 ? 1 : 2, k = [0, 5, 9][fila], n = [5, 4, 3][fila];
            const x = 540 + (i - k - (n - 1) / 2) * 170, y = 1210 - fila * 115, at = K.Nu + 0.5 + i * 0.18, e = kprog(T, at, at + 0.3, kEase.rebote);
            return e > 0 ? <Costal key={i} x={x} y={y - (1 - e) * 200} s={0.9} /> : null; })}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Nu + 0.2} until={K.Ci - 0.2} valor={3.5} dec={1} dur={1.4} etiqueta="más de" y={500} tam={280} color={KC.yellow} />
      </Escena>
      {/* 12 · cierre: la sopa del inicio, ahora con sello */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><VasoSopa T={T} x={400} y={1110} s={1} montoncito={1} sello={kprog(T, K.Ci + 0.7, K.Ci + 1.2)} /></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.2} until={K.Ko - 0.3} texto="¿de un alga?" x={330} y={370} tam={46} />
      <Etiqueta T={T} at={K.G + 1.2} until={K.Ko - 0.3} x={340} y={780} texto="glutamato" lado="izq" color={KC.ink} tam={38} />
      <Chip T={T} at={K.Ko + 0.4} until={K.Ko + 2.8} texto="1908 · Kikunae Ikeda" y={1500} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.Ko + 3.0} until={K.Ta - 0.3} texto="umami = «sabroso»" y={1500} tam={52} borde={GLU} />
      <Etiqueta T={T} at={K.Ko + 0.8} until={K.Ta - 0.3} x={380} y={500} texto="alga kombu" lado="izq" color={KC.ink} tam={36} />
      <Etiqueta T={T} at={K.Ko + 2.8} until={K.Ta - 0.3} x={600} y={860} texto="glutamato" color={KC.ink} tam={34} />
      <Chip T={T} at={K.Ta + 0.5} until={K.Ta + 2.0} texto="come azúcar" y={300} x={600} tam={44} borde={GLUC} />
      <Etiqueta T={T} at={K.Ta + 2.6} until={K.PD - 0.2} x={130} y={1680} texto="Corynebacterium glutamicum" it color={KC.ink} tam={40} />
      <Chip T={T} at={K.PD + 0.5} until={K.Bi - 0.2} texto="azúcar → glutamato" y={1560} tam={46} borde={GLU} />
      <Etiqueta T={T} at={K.PD + 1.6} until={K.Bi - 0.3} x={580} y={470} texto="igual en tomate y queso" color={KC.texto} tam={28} />
      <Medidor T={T} at={K.Bi + 0.6} until={K.Ca - 0.2} valor={0.07} etiqueta="biotina (vitamina) en el caldo" texto={() => 'muy poca'} y={1530} color="#ff6b9a" />
      <Etiqueta T={T} at={K.Bi + 2.0} until={K.Ca - 0.2} x={1000} y={1185} texto="la membrana cambia" lado="izq" color={KC.orange} tam={30} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Pr - 0.2} texto="se abren canales: sale el glutamato" y={1560} tam={36} borde={CANAL} />
      <Chip T={T} at={K.An + 0.4} until={K.Es - 0.3} texto="desde 1909 · proteína de plantas + ácido" y={1500} tam={34} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Cm - 0.3} anio="1957" quien="Kinoshita, Udaka y Shimono · Tokio" revista="J Gen Appl Microbiol · publicado en 1957" y={1620} />
      <Chip T={T} at={K.Cm + 0.4} until={K.Cc - 0.3} texto="bacteria nueva · la campeona" y={1140} x={600} tam={38} borde={KC.gold} />
      <Etiqueta T={T} at={K.Cm + 0.8} until={K.Cc - 0.3} x={970} y={1650} texto="4 glucosas → 1 glutamato" lado="izq" color={KC.ink} tam={34} />
      <Etiqueta T={T} at={K.Cc + 0.3} until={K.Nu - 0.2} x={pajX < 900 ? 560 : 560} y={430} texto="probablemente paloma" color={KC.ink} tam={32} />
      <Chip T={T} at={K.Nu + 1.0} until={K.Ci - 0.2} texto="millones de toneladas al año" y={715} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Nu + 1.6} until={K.Ci - 0.2} texto="de glutamato de sodio" y={800} tam={38} borde={GLU} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou - 0.1} texto="el glutamato: hecho por bacterias" y={1500} tam={40} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ko - 0.1} texto="No salió de un alga: *lo hizo una bacteria.*" />
      <Subtitulo T={T} idx={1} at={K.Ko + 0.1} until={K.Ta - 0.1} texto="Ikeda, 1908: *umami.*" />
      <Subtitulo T={T} idx={2} at={K.Ta + 0.1} until={K.PD - 0.1} texto="Una bacteria *en forma de mazo.*" />
      <Subtitulo T={T} idx={3} at={K.PD + 0.1} until={K.Bi - 0.1} texto="Azúcar → *glutamato.*" />
      <Subtitulo T={T} idx={4} at={K.Bi + 0.1} until={K.Ca - 0.1} texto="Muy poquita *biotina.*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.Pr - 0.1} texto="Se abren *canalitos.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.An - 0.1} texto="¿Quién *la descubrió?*" />
      <Subtitulo T={T} idx={7} at={K.An + 0.1} until={K.Es - 0.1} texto="Antes: *proteína + ácido.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Cm - 0.1} texto="1957: *bacterias, levaduras y hongos.*" />
      <Subtitulo T={T} idx={9} at={K.Cm + 0.1} until={K.Cc - 0.1} texto="4 glucosas → *1 glutamato.*" />
      <Subtitulo T={T} idx={10} at={K.Cc + 0.1} until={K.Nu - 0.1} texto="Tierra con *caca de pájaro.*" />
      <Subtitulo T={T} idx={11} at={K.Nu + 0.1} until={K.Ci - 0.1} texto="Más de 3.5 millones *de toneladas al año.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No viene del mar: *viene de una bacteria.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Kombu + 1.2, CUES.Tanque - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Tanque + 0.6, CUES.Tanque + 4.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Biotina + 0.4, CUES.Canal - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Antes - 0.1, 'avatar_06_pensativo_menton', 'grande-izq'],
        [CUES.Antes + 0.6, CUES.Estudio - 0.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.Campeona - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Campeona + 0.6, CUES.Caca - 0.4, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Caca + 0.1, CUES.Numero - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [CUES.Numero + 0.5, CUES.Cierre - 0.3, 'avatar_04_bajando_lentes', 'bajo-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="20" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GlutamatoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Glutamato /></CompositionStage></div>;
}
window.GlutamatoApp = GlutamatoApp;
