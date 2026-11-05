// Shot Fungi Mati #64 · En México se comen 425 hongos silvestres… — NARRADO (gancho 4 "un número que contradice").
// Viaje: puesto del mercado → bajo el suelo (micelio, raíz con ectomicorriza) → el mismo puesto, "leído".
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Nunca comas hongos silvestres sin un experto.

const HM = {
  yemaC:'#e2401c', yemaC2:'#ff6a2a', yemaL:'#ffd23a', yemaP:'#f7c430', anillo:'#f5a623', volva:'#fbf7ee',
  azul:'#2f4fb8', azul2:'#5b7fe0', azul3:'#1c2f78', durazno:'#f6a623', durazno2:'#ffc65a',
  ench:'#e8501e', ench2:'#ff7a3a', blanco:'#fbfaf5', blanco2:'#e6e2d6', mimbre:'#b9803f', mimbre2:'#8a5a28',
  madera:'#8a5a2b', suelo:'#3a2414', suelo2:'#24160c', raiz:'#9c6a3c', raiz2:'#c99a64', celula:'#e9c99a',
  oro:'#ffd43b', agua:'#4dc3ff', rojoOsc:'#3a0d14',
};
const HM_ITAL = { fontStyle:'italic' };

/* ---------------- hongos (perfil; base del pie en x, y; alto en px a s = 1 ≈ 300) ---------------- */
// Yema: Amanita grupo caesarea. Sombrero naranja-rojo liso con margen estriado, láminas y pie amarillos,
// anillo amarillo-naranja (faldita) y volva blanca en saco.
function Yema({ x, y, s = 1, rot = 0, crece = 1, marcas = 0 }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (0.4 + 0.6 * k)})`}>
    {/* pie */}
    <path d="M -22 -40 L -18 -230 Q 0 -238 18 -230 L 22 -40 Z" fill={HM.yemaP} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* anillo (pañuelito) */}
    <path d="M -24 -196 Q -44 -168 -36 -150 Q 0 -140 36 -150 Q 44 -168 24 -196 Z" fill={HM.anillo} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {/* volva (botita) */}
    <path d="M -40 0 Q -50 -50 -30 -78 L -20 -52 L -8 -72 L 4 -50 L 18 -74 L 26 -50 L 34 -76 Q 52 -46 40 0 Z" fill={HM.volva} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* láminas */}
    <path d="M -118 -232 Q 0 -212 118 -232 L 100 -244 L -100 -244 Z" fill={HM.yemaL} stroke={KC.ink} strokeWidth={5} />
    {/* sombrero liso (sin "ajonjolí") */}
    <path d="M -124 -236 Q -128 -320 -50 -350 Q 0 -364 50 -350 Q 128 -320 124 -236 Q 0 -250 -124 -236 Z" fill={HM.yemaC} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-104, -80, -56, -32, 32, 56, 80, 104].map((dx, i) => <line key={i} x1={dx} y1={-240 + Math.abs(dx) * 0.03} x2={dx * 1.02} y2={-262 - (120 - Math.abs(dx)) * 0.08} stroke="#9a2408" strokeWidth={3} opacity=".7" />)}
    <path d="M -70 -326 Q -20 -350 40 -340" stroke="#ffffff" strokeWidth={10} fill="none" opacity=".35" strokeLinecap="round" />
    {marcas > 0 && <SenasMarcas p={marcas} />}
  </g>;
}
// Amanita mortal (sección Phalloideae, p. ej. A. bisporigera): toda blanca, también lisa, con anillo y volva.
function AmanitaBlanca({ x, y, s = 1, crece = 1, marcas = 0 }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * (0.4 + 0.6 * k)})`}>
    <path d="M -18 -40 L -15 -240 Q 0 -246 15 -240 L 18 -40 Z" fill={HM.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -20 -214 Q -42 -186 -34 -168 Q 0 -158 34 -168 Q 42 -186 20 -214 Z" fill={HM.blanco} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -38 0 Q -48 -48 -28 -76 L -18 -52 L -6 -70 L 6 -50 L 18 -72 L 26 -50 L 32 -74 Q 50 -44 38 0 Z" fill={HM.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -104 -242 Q 0 -224 104 -242 L 90 -252 L -90 -252 Z" fill={HM.blanco2} stroke={KC.ink} strokeWidth={5} />
    <path d="M -110 -244 Q -112 -320 -40 -350 Q 0 -360 40 -350 Q 112 -320 110 -244 Q 0 -258 -110 -244 Z" fill={HM.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -60 -326 Q -16 -346 36 -338" stroke="#d9d4c4" strokeWidth={8} fill="none" strokeLinecap="round" />
    {marcas > 0 && <SenasMarcas p={marcas} />}
  </g>;
}
// Las 3 señas (sombrero liso, anillo, volva) marcadas con círculos punteados. p 0..1 (una tras otra).
function SenasMarcas({ p }) {
  const zonas = [[0, -300, 110, 46], [0, -178, 56, 34], [0, -36, 60, 46]];
  return <g>{zonas.map(([cx, cy, rx, ry], i) => { const u = kclamp(p * 3 - i, 0, 1); return u > 0 ?
    <ellipse key={i} cx={cx} cy={cy} rx={rx + 16} ry={ry + 12} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="14 10" opacity={u} transform={`scale(${klerp(1.3, 1, u)})`} style={{ transformOrigin:`${cx}px ${cy}px` }} /> : null; })}</g>;
}
// Hongo azul: Lactarius indigo. Sombrero hundido al centro con zonas concéntricas, láminas azules, pie corto. latex 0..1 = gota.
function HongoAzul({ x, y, s = 1, rot = 0, latex = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -26 0 L -24 -120 Q 0 -126 24 -120 L 26 0 Z" fill={HM.azul2} stroke={KC.ink} strokeWidth={6} />
    {[[-10, -40], [8, -80], [-6, -100]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={6} ry={4} fill={HM.azul3} opacity=".6" />)}
    <path d="M -116 -150 Q 0 -112 116 -150 L 100 -132 Q 0 -108 -100 -132 Z" fill={HM.azul2} stroke={KC.ink} strokeWidth={5} />
    {[-80, -50, -20, 20, 50, 80].map((dx, i) => <line key={i} x1={dx} y1={-136 + Math.abs(dx) * 0.08} x2={dx * 0.3} y2={-122} stroke={HM.azul3} strokeWidth={3} />)}
    <path d="M -126 -150 Q -120 -198 -60 -200 Q -20 -200 0 -184 Q 20 -200 60 -200 Q 120 -198 126 -150 Q 0 -120 -126 -150 Z" fill={HM.azul} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.75, 0.5].map((q, i) => <path key={i} d={`M ${-120 * q} ${-160 - 30 * q} Q 0 ${-150 + 10 * (1 - q)} ${120 * q} ${-160 - 30 * q}`} stroke={HM.azul3} strokeWidth={5} fill="none" opacity=".75" />)}
    {latex > 0 && <path d={`M 60 ${-134 + latex * 50} q 9 14 0 22 q -9 -8 0 -22 Z`} fill={mixHex('#1f3fd0', '#2f8f6a', kclamp((latex - 0.6) * 2.5, 0, 1) * 0.6)} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Duraznillo: Cantharellus grupo cibarius. Embudo de orilla ondulada, color durazno, falsas láminas (pliegues) que bajan por el pie.
function Duraznillo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -30 0 Q -34 -70 -70 -150 L 70 -150 Q 34 -70 30 0 Z" fill={HM.durazno} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-50, -30, -10, 10, 30, 50].map((dx, i) => <path key={i} d={`M ${dx * 1.3} -150 Q ${dx * 0.7} -100 ${dx * 0.35} -40`} stroke="#c97a10" strokeWidth={4} fill="none" />)}
    <path d="M -120 -168 Q -100 -196 -60 -182 Q -30 -206 0 -186 Q 30 -206 64 -184 Q 104 -200 122 -170 Q 80 -146 0 -152 Q -80 -146 -120 -168 Z" fill={HM.durazno2} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -70 -168 Q 0 -150 70 -168" stroke="#c97a10" strokeWidth={5} fill="none" />
  </g>;
}
// Enchilado: Hypomyces lactifluorum (un hongo que cubre a otro): forma retorcida, costra naranja-roja con granitos.
function Enchilado({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 0 Q -50 -60 -40 -110 Q -110 -120 -120 -160 Q -90 -200 -30 -186 Q 0 -214 50 -196 Q 120 -196 118 -150 Q 100 -112 44 -110 Q 52 -50 40 0 Z" fill={HM.ench} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -90 -160 Q -30 -140 20 -160 Q 60 -170 96 -150" stroke="#a32a08" strokeWidth={5} fill="none" />
    {Array.from({ length: 26 }, (_, i) => { const r = krng(i + 7); return <circle key={i} cx={-100 + r() * 200} cy={-190 + r() * 160 * (r() > 0.5 ? 1 : 0.4)} r={3} fill={HM.ench2} opacity=".9" />; })}
  </g>;
}
// Champiñón blanco cultivado (Agaricus bisporus, botón).
function Champi({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -26 0 L -24 -70 L 24 -70 L 26 0 Q 0 8 -26 0 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    <path d="M -80 -66 Q -84 -150 0 -156 Q 84 -150 80 -66 Q 0 -54 -80 -66 Z" fill="#fbf8f0" stroke={KC.ink} strokeWidth={6} />
    <path d="M -46 -124 Q -10 -146 30 -138" stroke="#ffffff" strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}
// Mini hongo para la cuadrícula de 425.
function MiniHongo({ x, y, c, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-2.5} y={-7} width={5} height={8} fill="#f4efe4" />
    <path d="M -8 -6 Q -8 -15 0 -15 Q 8 -15 8 -6 Z" fill={c} stroke={KC.ink} strokeWidth={1.4} />
  </g>;
}
// Canasta tejida; children = hongos encima. Base en (x, y), ancho w.
function Canasta({ x, y, w = 220, children, brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <g>{children}</g>
    <path d={`M ${-w / 2} -110 L ${w / 2} -110 L ${w / 2 - 22} 0 L ${-w / 2 + 22} 0 Z`} fill={HM.mimbre} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round"
      style={brillo ? { filter:`drop-shadow(0 0 ${18 * brillo}px #fff6c0)` } : null} />
    {[-80, -55, -30].map((yy, i) => <line key={i} x1={-w / 2 + 8 + i * 4} y1={yy} x2={w / 2 - 8 - i * 4} y2={yy} stroke={HM.mimbre2} strokeWidth={5} />)}
    {Array.from({ length: 9 }, (_, i) => { const u = -w / 2 + 20 + i * (w - 40) / 8; return <line key={i} x1={u} y1={-108} x2={u * 0.86} y2={-2} stroke={HM.mimbre2} strokeWidth={4} />; })}
    <rect x={-w / 2 - 8} y={-124} width={w + 16} height={20} rx={10} fill={HM.mimbre2} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Puesto del mercado: toldo de rayas y mesa. lluvia = gotas sobre el toldo.
function Puesto({ T, lluvia = 0 }) {
  const rayas = Array.from({ length: 9 }, (_, i) => i);
  return <g>
    {lluvia > 0 && <g opacity={lluvia}>{Array.from({ length: 40 }, (_, i) => { const r = krng(i + 3); const x0 = r() * 1080, sp = 0.6 + r() * 0.5, t0 = r();
      const u = ((T * sp + t0) % 1); return <line key={i} x1={x0} y1={120 + u * 300} x2={x0 - 8} y2={150 + u * 300} stroke="#ffffff" strokeWidth={4} opacity=".7" />; })}</g>}
    <rect x={70} y={430} width={20} height={680} fill={HM.madera} stroke={KC.ink} strokeWidth={6} />
    <rect x={990} y={430} width={20} height={680} fill={HM.madera} stroke={KC.ink} strokeWidth={6} />
    {rayas.map((i) => <path key={i} d={`M ${40 + i * 111.1} 400 L ${151.1 + i * 111.1} 400 L ${151.1 + i * 111.1} 470 Q ${95.5 + i * 111.1} 500 ${40 + i * 111.1} 470 Z`} fill={i % 2 ? '#ffffff' : '#ff2d78'} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    <rect x={40} y={1090} width={1000} height={36} rx={8} fill={HM.madera} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Honguera (figura esquemática, sin rostro): rebozo, falda y canasta al brazo. Pies en (x, y).
function Honguera({ T = 0, x, y, s = 1, camina = 0, color = '#2346ff', rebozo = '#b18cff' }) {
  const b = camina ? Math.abs(Math.sin(T * 6)) * 8 : 0, pa = camina ? Math.sin(T * 6) * 14 : 0;
  return <g transform={`translate(${x} ${y - b}) scale(${s})`}>
    <line x1={-14} y1={-60} x2={-14 + pa} y2={0} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <line x1={14} y1={-60} x2={14 - pa} y2={0} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <path d="M -50 -60 L -30 -190 L 30 -190 L 50 -60 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -44 -170 Q 0 -240 44 -170 L 52 -120 Q 0 -100 -52 -120 Z" fill={rebozo} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={0} cy={-232} r={30} fill="#a8683c" stroke={KC.ink} strokeWidth={6} />
    <path d="M -34 -236 Q -30 -272 0 -270 Q 34 -272 34 -236 Q 40 -200 26 -196 Q 30 -236 0 -244 Q -30 -236 -26 -196 Q -40 -200 -34 -236 Z" fill="#1b1410" />
    <g transform="translate(58 -110) scale(.36)"><Canasta x={0} y={0} w={200}><Yema x={-40} y={-100} s={0.5} rot={-12} /><HongoAzul x={40} y={-104} s={0.55} rot={10} /></Canasta></g>
    <path d="M 40 -160 Q 70 -180 70 -150" stroke={KC.ink} strokeWidth={8} fill="none" />
  </g>;
}
// Maceta.
function Maceta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -170 L 110 -170 L 84 0 L -84 0 Z" fill="#d2693c" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-124} y={-200} width={248} height={40} rx={8} fill="#e07a48" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-196} rx={104} ry={14} fill="#4a2c18" />
  </g>;
}
// Charola de cultivo de champiñón: sustrato café con botones blancos.
function Charola({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-90} width={420} height={90} rx={10} fill="#6b4a2c" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 30 }, (_, i) => { const r = krng(i + 40); return <circle key={i} cx={-196 + r() * 392} cy={-80 + r() * 66} r={4} fill="#4b321c" />; })}
    {[-150, -80, -10, 60, 130, -115, 25, 165].map((dx, i) => <Champi key={i} x={dx} y={-80 + (i > 4 ? 6 : 0)} s={0.42 + (i % 3) * 0.06} rot={(i % 2 ? 1 : -1) * 6} />)}
    <rect x={-226} y={-10} width={452} height={26} rx={8} fill="#c8ccd2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Olla hirviendo con vapor.
function Olla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => { const u = ((T * 0.7 + i / 3) % 1); return <path key={i} d={`M ${-40 + i * 40} ${-130 - u * 120} q 16 -20 0 -40 q -16 -20 0 -40`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={(1 - u) * 0.7} strokeLinecap="round" />; })}
    <path d="M -110 -120 L 110 -120 L 96 0 L -96 0 Z" fill="#8c96a3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-126} y={-136} width={252} height={28} rx={10} fill="#a7b0bc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-160} y={-112} width={40} height={18} rx={8} fill={KC.ink} /><rect x={120} y={-112} width={40} height={18} rx={8} fill={KC.ink} />
  </g>;
}
// Calavera simple (veneno que no se va).
function Calavera({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 10 Q -52 -50 0 -56 Q 52 -50 40 10 L 26 14 L 26 34 L -26 34 L -26 14 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={-17} cy={-12} r={11} fill={KC.ink} /><circle cx={17} cy={-12} r={11} fill={KC.ink} />
    <path d="M 0 2 L -6 14 L 6 14 Z" fill={KC.ink} />
    {[-14, 0, 14].map((dx) => <line key={dx} x1={dx} y1={20} x2={dx} y2={34} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Manzana chiquita (para "el fruto").
function Manzana({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -60 Q -60 -90 -70 -30 Q -74 40 -10 50 Q 0 44 10 50 Q 74 40 70 -30 Q 60 -90 0 -60 Z" fill="#ff3b2f" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -60 Q 2 -84 12 -96" stroke="#5a3416" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 10 -84 Q 40 -104 54 -80 Q 30 -70 10 -84 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Triángulo de advertencia.
function Advertencia({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -70 L 70 52 L -70 52 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-7} y={-30} width={14} height={50} rx={6} fill={KC.ink} /><circle cx={0} cy={36} r={8} fill={KC.ink} />
  </g>;
}
// Punta de raíz de pino vista de lado (ampliada), con manto de hifas y red de Hartig (esquemática).
const RAIZ = { x0: 40, x1: 760, y: 850, h: 190 };
function PuntaRaiz({ T, manto = 0, hartig = 0, hifas = 0 }) {
  const { x0, x1, y, h } = RAIZ, top = y - h / 2;
  const cuerpo = `M ${x0} ${top} L ${x1} ${top} Q ${x1 + 110} ${y} ${x1} ${top + h} L ${x0} ${top + h} Z`;
  const cels = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 15; c++) { const cw = 48, ch = h / 4; const cx = x0 + 10 + c * cw + (r % 2) * 20; if (cx + cw > x1 + 20) continue; cels.push([cx, top + r * ch, cw, ch, r]); }
  return <g>
    <path d={cuerpo} fill={HM.raiz} stroke={KC.ink} strokeWidth={7} />
    {cels.map(([cx, cy, cw, ch, r], i) => <rect key={i} x={cx + 3} y={cy + 3} width={cw - 6} height={ch - 6} rx={8} fill={HM.celula} opacity={0.85} />)}
    {/* red de Hartig: hifas ENTRE las células de las capas externas */}
    {hartig > 0 && cels.filter((c) => c[4] === 0 || c[4] === 3).map(([cx, cy, cw, ch], i) => <path key={i} d={`M ${cx} ${cy} L ${cx} ${cy + ch} M ${cx} ${cy + (cy < y ? ch : 0)} L ${cx + cw} ${cy + (cy < y ? ch : 0)}`} stroke={FK.hifa} strokeWidth={4} opacity={kclamp(hartig * 2 - i / 20, 0, 1)} />)}
    {/* manto */}
    {manto > 0 && <path d={cuerpo} fill="none" stroke={FK.hifa} strokeWidth={30 * manto} strokeLinejoin="round" opacity={0.9} strokeDasharray={manto < 1 ? `${manto * 2400} 4000` : null} />}
    {manto > 0.6 && <path d={cuerpo} fill="none" stroke="#d8ccb0" strokeWidth={4} strokeDasharray="6 10" opacity={(manto - 0.6) * 2.5} />}
    {/* hifas que salen del manto al suelo */}
    {hifas > 0 && Array.from({ length: 14 }, (_, i) => { const r = krng(i + 11); const sx = x0 + 40 + r() * (x1 - x0), arriba = i % 2 === 0, sy = arriba ? top - 14 : top + h + 14;
      const L = (120 + r() * 200) * hifas, ang = (arriba ? -1 : 1) * (Math.PI / 2) + (r() - 0.5) * 1.2;
      return <path key={i} d={`M ${sx} ${sy} q ${Math.cos(ang) * L * 0.5 + 20} ${Math.sin(ang) * L * 0.5} ${Math.cos(ang) * L} ${Math.sin(ang) * L}`} stroke={FK.hifa} strokeWidth={4} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Puntos que viajan (azúcares hacia afuera, agua hacia adentro) sobre las hifas.
function Trueque({ T, a, p }) {
  if (p <= 0) return null;
  const { x0, x1, y, h } = RAIZ, top = y - h / 2;
  return <g>{Array.from({ length: 14 }, (_, i) => { const r = krng(i + 11); const sx = x0 + 40 + r() * (x1 - x0), arriba = i % 2 === 0, sy = arriba ? top - 14 : top + h + 14;
    const L = 120 + r() * 200, ang = (arriba ? -1 : 1) * (Math.PI / 2) + (r() - 0.5) * 1.2;
    const ex = sx + Math.cos(ang) * L, ey = sy + Math.sin(ang) * L;
    const u1 = ((T - a) * 0.6 + i * 0.13) % 1, u2 = ((T - a) * 0.6 + i * 0.13 + 0.5) % 1;
    return <g key={i} opacity={p}>
      <circle cx={klerp(sx, ex, u1)} cy={klerp(sy, ey, u1)} r={9} fill={HM.oro} stroke={KC.ink} strokeWidth={2} />
      <path d={`M 0 -12 Q 9 0 0 8 Q -9 0 0 -12 Z`} transform={`translate(${klerp(ex, sx, u2)} ${klerp(ey, sy, u2)})`} fill={HM.agua} stroke={KC.ink} strokeWidth={2} />
    </g>; })}</g>;
}

// Subtítulo con *resaltado* y _cursiva_ (para nombres científicos). Mismo lugar y tiempos que el Subtitulo del kit.
function SubtituloIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:45, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Etiqueta de dos renglones (nombre común + científico en cursiva) en SVG, con línea a su objeto.
function EtqDoble({ T, at, until, x, y, comun, cientifico, hastaY, color = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <g opacity={e.o} transform={`translate(${x} ${y + e.y * 0.3})`}>
    {hastaY != null && <line x1={0} y1={44} x2={0} y2={klerp(44, hastaY - y, kprog(T, at, at + 0.4, kEase.sale))} stroke={color} strokeWidth={4} strokeDasharray="8 6" />}
    <text x={0} y={0} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={color} stroke="#ffffff" strokeWidth={8} paintOrder="stroke">{comun}</text>
    <text x={0} y={34} textAnchor="middle" style={{ font:`italic 700 23px ${KF.mono}` }} fill={color} stroke="#ffffff" strokeWidth={6} paintOrder="stroke">{cientifico}</text>
  </g>;
}

// canastas del puesto (x de su centro) y su contenido
const CAN_X = [170, 400, 660, 905];
function ContenidoCanasta({ i }) {
  if (i === 0) return <><Yema x={-50} y={-96} s={0.42} rot={-14} /><Yema x={44} y={-100} s={0.46} rot={10} /><Yema x={0} y={-92} s={0.36} /></>;
  if (i === 1) return <><HongoAzul x={-46} y={-100} s={0.58} rot={-12} /><HongoAzul x={48} y={-102} s={0.62} rot={12} latex={1} /></>;
  if (i === 2) return <><Duraznillo x={-48} y={-98} s={0.6} rot={-10} /><Duraznillo x={46} y={-100} s={0.64} rot={12} /><Duraznillo x={0} y={-94} s={0.5} /></>;
  return <><Enchilado x={-40} y={-98} s={0.56} rot={-8} /><Enchilado x={46} y={-100} s={0.6} rot={14} /></>;
}
const ETQ_CAN = [
  ['yemas', 'Amanita gpo. caesarea', 205, 610], ['hongo azul', 'Lactarius indigo', 400, 760],
  ['duraznillos', 'Cantharellus gpo. cibarius', 660, 610], ['enchilados', 'Hypomyces lactifluorum', 880, 760],
];
const MINI_COL = [HM.yemaC, HM.azul, HM.durazno, HM.ench, '#b18cff', '#2fe0a8', '#8a5a2b', '#ff2d78', '#f4efe4', '#ffe11a'];

function HongosMercadoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Me: CUES.Mercado, F: CUES.Fruto, Mi: CUES.Micelio, R: CUES.Raiz, Tr: CUES.Trueque, P: CUES.Pregunta, B: CUES.Bosque, E: CUES.Estudio, S: CUES.Senas, A: CUES.Aviso, X: CUES.Experto, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G + 0.05, K.G + 0.55);
  const rebote = Math.abs(Math.sin(kprog(T, K.G + 0.55, K.G + 1.1) * Math.PI)) * 40 * (1 - kprog(T, K.G + 0.55, K.G + 1.1));
  const nMini = Math.floor(425 * kprog(T, K.G + 0.4, K.G + 3.2, kEase.suave));
  const puestoCanastas = (on, brillo) => CAN_X.map((cx, i) => { const k = on ? on(i) : 1; return k > 0 ? <g key={i} transform={`translate(${cx} 1090) scale(${k}) translate(${-cx} -1090)`}>
    <Canasta x={cx} y={1090} w={220} brillo={brillo ? brillo(i) : 0}><ContenidoCanasta i={i} /></Canasta></g> : null; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: 425 hongos silvestres… y un champiñón solito en el plato */}
      <Escena T={T} a={K.G} b={K.Me} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={T > K.G + 3.4 ? klerp(1, 0.35, kprog(T, K.G + 3.4, K.G + 3.9)) : 1}>
            {Array.from({ length: nMini }, (_, i) => <MiniHongo key={i} x={62 + (i % 25) * 20.4} y={358 + Math.floor(i / 25) * 23} c={MINI_COL[(i * 7) % MINI_COL.length]} s={1.15} />)}
          </g>
          <ellipse cx={780} cy={1040} rx={200} ry={44} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
          <ellipse cx={780} cy={1034} rx={140} ry={26} fill="#efe9dc" />
          <Champi x={780} y={klerp(880, 1030, caida * caida) - rebote} s={1.1} rot={(1 - caida) * 30} />
        </>)}
      </Escena>
      {/* 1 · el puesto del mercado en temporada de lluvias */}
      <Escena T={T} a={K.Me} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Puesto T={T} lluvia={1 - kprog(T, K.Me + 3.6, K.Me + 4.4)} />
          {puestoCanastas((i) => kprog(T, K.Me + 0.2 + i * 0.7, K.Me + 0.6 + i * 0.7, kEase.rebote), (i) => kclamp(1 - Math.abs(T - (K.Me + 0.5 + i * 0.7)) * 2, 0, 1))}
          {ETQ_CAN.map(([c, n, ex, ey], i) => <EtqDoble key={i} T={T} at={K.Me + 0.4 + i * 0.7} until={K.F - 0.3} x={ex} y={ey} comun={c} cientifico={n} hastaY={i % 2 ? 900 : 760} />)}
        </>)}
      </Escena>
      {/* 2 · lo que compras es solo el fruto */}
      <Escena T={T} a={K.F} b={K.Mi} zoom={0.06} origen="50% 70%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Yema x={470} y={1110} s={1.55} crece={kprog(T, K.F - 0.3, K.F + 0.5)} />
          <g opacity={kprog(T, K.F + 0.9, K.F + 1.3)}><Manzana x={160} y={820} s={1.0} /></g>
        </>)}
      </Escena>
      {/* 3 · bajo el suelo: el micelio (fondo oscuro) */}
      <Escena T={T} a={K.Mi} b={K.R} zoom={0.05} origen="50% 35%">
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(${KC.mint} 0px, ${KC.mint} 600px, ${HM.suelo} 600px, ${HM.suelo2} 1920px)` }}></div>
        {fsvg(<>
          {Array.from({ length: 30 }, (_, i) => { const r = krng(i + 90); const x0 = r() * 1080; return <line key={i} x1={x0} y1={596 - r() * 14} x2={x0 + 30 + r() * 20} y2={600 - r() * 10} stroke="#a8743c" strokeWidth={5} strokeLinecap="round" />; })}
          <g transform="translate(540 600) scale(1.55) translate(0 -0)"><g transform="translate(0 0)"><path d="M -22 -40 L -18 -150 L 18 -150 L 22 -40 Z" fill={HM.yemaP} stroke={KC.ink} strokeWidth={6} />
            <path d="M -40 0 Q -50 -50 -30 -78 L -20 -52 L -8 -72 L 4 -50 L 18 -74 L 26 -50 L 34 -76 Q 52 -46 40 0 Z" fill={HM.volva} stroke={KC.ink} strokeWidth={6} /></g></g>
          <RedHifas T={T} x={540} y={640} g={kprog(T, K.Mi + 0.2, K.Mi + 3.4)} seed={64} n={320} escala={1.05} ancho={3.2} brillo={0.6} />
          <path d={`M -20 1050 Q 300 980 ${klerp(-20, 1100, kprog(T, K.Mi + 2.2, K.Mi + 3.6))} 1010`} stroke={HM.raiz} strokeWidth={26} fill="none" strokeLinecap="round" />
        </>)}
        <Ambiente T={T} n={16} area={{ x: 0, y: 620, w: KW, h: 1300 }} color="rgba(255,240,210,.25)" />
      </Escena>
      {/* 4–5 · la raíz con su manto de hifas y el trueque (microscópico, oscuro) */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <PuntaRaiz T={T} manto={kprog(T, K.R + 0.3, K.R + 1.8, kEase.suave)} hartig={kprog(T, K.R + 1.8, K.R + 3.2)} hifas={kprog(T, K.R + 1.2, K.R + 3.0, kEase.sale)} />
          <Trueque T={T} a={K.Tr} p={kprog(T, K.Tr + 0.1, K.Tr + 0.6)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué no los siembran como al champiñón? */}
      <Escena T={T} a={K.P} b={K.B} zoom={0.08} origen="25% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<><Charola x={270} y={1020} s={1.0} T={T} /><Interrogacion T={T} x={270} y={820} tam={300} /></>)}
      </Escena>
      {/* 7 · no se cultivan: la maceta no da nada → al bosque */}
      <Escena T={T} a={K.B} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(#9fe6ff, #d9f6ff 60%, #7fcf6a 60%, #5fae4a)` }}></div>
        {fsvg(<>
          <g opacity={kprog(T, K.B + 1.2, K.B + 2.2)}>
            {[[90, 1150, 0.95, 1], [300, 1120, 0.8, 2], [560, 1160, 1.05, 3], [800, 1120, 0.85, 4], [1010, 1150, 0.95, 5]].map(([x, y, s, sd], i) => <Conifera key={i} T={T} x={x} y={y} s={s} seed={sd} />)}
            <path d="M -20 1120 Q 400 1060 1100 1110" stroke="#c9a46a" strokeWidth={34} fill="none" opacity=".8" />
            {Array.from({ length: 30 }, (_, i) => { const r = krng(i + 300); const x0 = r() * 1080, u = ((T * (0.8 + r() * 0.5) + r()) % 1); return <line key={i} x1={x0} y1={300 + u * 800} x2={x0 - 8} y2={330 + u * 800} stroke="#ffffff" strokeWidth={4} opacity=".55" />; })}
            <Honguera T={T} x={klerp(80, 520, kprog(T, K.B + 1.6, K.E))} y={1108} s={0.9} camina={1} />
          </g>
          <g opacity={1 - kprog(T, K.B + 1.6, K.B + 2.2)}>
            <Maceta x={540} y={1060} s={1.3} />
            <g opacity={1 - kprog(T, K.B + 0.4, K.B + 1.0)}><Yema x={540} y={800} s={0.5} crece={1} /></g>
            {T > K.B + 0.9 && <path d="M 450 640 L 630 820 M 630 640 L 450 820" stroke={KC.red} strokeWidth={26} strokeLinecap="round" opacity={kprog(T, K.B + 0.9, K.B + 1.1)} />}
          </g>
        </>)}
      </Escena>
      {/* 8 · el estudio de Acaxochitlán, Hidalgo (2009) */}
      <Escena T={T} a={K.E} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g opacity={kprog(T, K.E + 2.6, K.E + 3.1)}>
          <MapaMexico x={40} y={680} ancho={620} conCA={false}>
            {(() => { const [hx, hy] = mxProy(-98.2, 20.2); const pu = 1 + 0.2 * Math.sin(T * 6); return <g><circle cx={hx} cy={hy} r={26 * pu} fill={KC.red} stroke={KC.ink} strokeWidth={6} /></g>; })()}
          </MapaMexico>
          <Honguera T={T} x={800} y={1090} s={0.8} color="#ff2d78" rebozo="#2346ff" />
          <Honguera T={T} x={960} y={1090} s={0.74} color="#ff8a1f" rebozo="#11a39a" />
        </g>)}
      </Escena>
      {/* 9 · las señas de las hongueras */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Yema x={300} y={1100} s={1.35} marcas={kprog(T, K.S + 0.2, K.S + 2.6)} />
          {[[K.S + 0.3, 1100 - 300 * 1.35, 'sin «ajonjolí»', '(verrugas): liso', 720], [K.S + 1.1, 1100 - 178 * 1.35, '«pañuelito»', '(anillo)', 870], [K.S + 1.9, 1100 - 36 * 1.35, '«botita»', '(volva)', 1040]].map(([at, fy, a, b, ly], i) => {
            const u = kprog(T, at, at + 0.4, kEase.sale); if (u <= 0) return null;
            return <g key={i} opacity={u}>
              <line x1={300 + 90} y1={fy} x2={klerp(390, 560, u)} y2={ly - 10} stroke={KC.ink} strokeWidth={5} />
              <text x={575} y={ly} style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{a}</text>
              <text x={575} y={ly + 40} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{b}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 10 · aviso: la Amanita mortal TAMBIÉN es lisa, con pañuelito y botita; cocinarla no quita el veneno */}
      <Escena T={T} a={K.A} b={K.X} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 60%, #6a1422, ${HM.rojoOsc})` }}></div>
        {fsvg(<>
          <Yema x={260} y={1070} s={1.05} marcas={1} />
          <AmanitaBlanca x={720} y={1070} s={1.05} crece={kprog(T, K.A + 0.2, K.A + 0.8)} marcas={kprog(T, K.A + 0.9, K.A + 2.2)} />
          {T > K.A + 2.0 && <Sello T={T} at={K.A + 2.3} x={720} y={830} texto="MORTAL" color={KC.red} r={124} rot={-10} />}
          <g opacity={kprog(T, K.A + 3.1, K.A + 3.6)}><Olla T={T} x={140} y={600} s={0.7} /><g transform={`translate(140 ${500 - 8 * Math.sin(T * 4)})`}><Calavera x={0} y={0} s={0.8} /></g></g>
        </>)}
      </Escena>
      {/* 11 · nunca sin un experto */}
      <Escena T={T} a={K.X} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Advertencia x={540} y={760} s={kprog(T, K.X, K.X + 0.4, kEase.rebote) * 1.2} />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo puesto, ahora con su bosque y su honguera */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.6)}>
            {[[170, 1090, 0.78, 1], [420, 1090, 0.9, 2], [660, 1090, 0.82, 3], [905, 1090, 0.9, 4]].map(([x, y, s, sd], i) => <Conifera key={i} T={T} x={x} y={y} s={s} seed={sd} />)}
          </g>
          <Puesto T={T} lluvia={0} />
          <g opacity={kprog(T, K.C + 1.4, K.C + 2.4)}>
            {CAN_X.map((cx, i) => <path key={i} d={`M ${cx} 1000 Q ${cx + (i % 2 ? 40 : -40)} 1040 ${cx} 1088`} stroke={FK.hifa} strokeWidth={6} fill="none" style={{ filter:'drop-shadow(0 0 8px #fff6c0)' }} />)}
          </g>
          {puestoCanastas(null, (i) => kprog(T, K.C + 1.4 + i * 0.2, K.C + 1.8 + i * 0.2) * 0.8)}
        </>)}
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 3.4} until={K.Me - 0.3} valor={425} dur={0.6} x={310} y={560} tam={230} color={KC.yellow} />
      <Etq T={T} at={K.G + 3.7} until={K.Me - 0.3} x={60} y={725} texto="hongos silvestres" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.9} until={K.Me - 0.3} x={60} y={772} texto="que se comen en México" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 4.1} until={K.Me - 0.3} x={60} y={815} texto="(conteo de 2025)" tam={24} color={KC.ink} />
      <Chip T={T} at={K.G + 1.4} until={K.Me - 0.3} texto="champiñón: cultivado" x={780} y={1130} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Me + 3.2} until={K.F - 0.3} texto="lluvias: de junio a noviembre, según la región" x={540} y={530} tam={28} borde={KC.pink} />
      <Etq T={T} at={K.F + 0.3} until={K.Mi - 0.3} x={60} y={470} texto="cuerpo fructífero = el «fruto»" tam={27} color={KC.ink} />
      <Etq T={T} at={K.F + 1.1} until={K.Mi - 0.3} x={40} y={930} texto="como una manzana" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Mi + 0.2} until={K.R - 0.3} texto="BAJO EL SUELO DEL BOSQUE" x={540} y={680} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Mi + 1.2} until={K.R - 0.3} x={60} y={1120} texto="micelio · red de hifas" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Mi + 2.6} until={K.R - 0.3} x={600} y={940} texto="raíz de un árbol" tam={26} color={HM.raiz2} />
      <NumeroGigante T={T} at={K.R + 0.4} until={K.Tr - 0.2} valor={65} dur={0.7} sufijo=" %" x={300} y={530} tam={170} color={KC.mint} />
      <Etq T={T} at={K.R + 0.8} until={K.Tr - 0.2} x={60} y={1035} texto="de las especies que se comen en México:" tam={24} color={KC.texto} />
      <Etq T={T} at={K.R + 1.2} until={K.Tr - 0.2} x={60} y={1075} texto="viven abrazadas a una raíz (ectomicorriza)" tam={24} color={KC.mint} />
      <Etq T={T} at={K.R + 1.9} until={K.Tr - 0.2} x={60} y={680} texto="manto de hifas" tam={28} color={FK.hifa} />
      <Etq T={T} at={K.R + 2.4} until={K.Tr - 0.2} x={260} y={980} texto="hifas entre las células (red de Hartig)" tam={22} color={FK.hifa} />
      <Etq T={T} at={K.Tr + 0.3} until={K.P - 0.3} x={60} y={520} texto="● azúcares: árbol → hongo" tam={30} color={HM.oro} />
      <Etq T={T} at={K.Tr + 1.2} until={K.P - 0.3} x={60} y={575} texto="● agua y nutrientes: hongo → árbol" tam={30} color={HM.agua} />
      <Chip T={T} at={K.P + 0.3} until={K.B - 0.3} texto="champiñón: se siembra" x={270} y={1150} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.B + 0.9} until={K.B + 1.9} texto="sin su árbol, no da fruto" x={540} y={520} tam={34} borde={KC.red} />
      <Chip T={T} at={K.B + 2.2} until={K.E - 0.3} texto="se recolectan en el bosque" x={540} y={470} tam={36} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2009" quien="mercado de Acaxochitlán, Hidalgo" revista="U. Autónoma del Edo. de Hidalgo · Etnobiología, 2010" x={540} y={620} />
      <Etq T={T} at={K.E + 3.2} until={K.S - 0.3} x={60} y={520} texto="Acaxochitlán, Hidalgo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.E + 3.6} until={K.S - 0.3} x={60} y={570} texto="entrevistas a las hongueras" tam={28} color={KC.ink} />
      <Chip T={T} at={K.S + 3.0} until={K.A - 0.3} texto="saber náhuatl · lo guardan las hongueras" x={350} y={480} tam={25} borde={KC.ink} />
      <Chip T={T} at={K.A + 0.3} until={K.X - 0.3} texto="yema" x={260} y={1118} tam={28} borde={KC.mint} />
      <Chip T={T} at={K.A + 0.6} until={K.X - 0.3} texto="mortal" x={720} y={1118} tam={28} borde={KC.red} />
      <Etq T={T} at={K.A + 1.0} until={K.X - 0.3} x={520} y={662} texto="Amanita sección Phalloideae" it tam={20} color={KC.texto} />
      <Etq T={T} at={K.A + 1.6} until={K.X - 0.3} x={250} y={580} texto="mismas 3 señas" tam={28} color={KC.yellow} lado="der" />
      <Etq T={T} at={K.A + 3.4} until={K.X - 0.3} x={250} y={470} texto="cocinarla no quita el veneno" tam={26} color={KC.texto} />
      <Etq T={T} at={K.A + 3.8} until={K.X - 0.3} x={250} y={512} texto="(amatoxinas)" tam={22} color={KC.texto} />
      <div style={{ position:'absolute', left:90, right:90, top:900, zIndex:42, textAlign:'center', opacity: T > K.X - 0.1 && T < K.C + 0.2 ? kprog(T, K.X + 0.3, K.X + 0.7) * (1 - kprog(T, K.C - 0.2, K.C + 0.2)) : 0,
        background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:28, padding:'22px 26px', boxShadow:`12px 12px 0 ${KC.ink}`, font:`900 50px/1.12 ${KF.texto}`, color:KC.ink }}>
        Nunca recolectes ni comas hongos silvestres <span style={{ background:KC.yellow, padding:'0 .2em', borderRadius:8 }}>sin un experto</span>
      </div>
      <NumeroGigante T={T} at={K.C + 2.4} until={K.Ou} valor={425} dur={0.4} desde={424} x={290} y={590} tam={130} color={KC.yellow} />
      <Etq T={T} at={K.C + 2.6} until={K.Ou} x={60} y={690} texto="hongos silvestres en la mesa" tam={28} color={KC.ink} />
      <Etq T={T} at={K.C + 0.8} until={K.Ou} x={60} y={1500} texto="Nunca comas hongos silvestres sin un experto." tam={24} color={KC.texto} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Me} texto="5 cm" largo={60} />
      <BarraEscala T={T} at={K.Me} until={K.F} texto="10 cm" largo={73} />
      <BarraEscala T={T} at={K.F} until={K.Mi} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.Mi} until={K.R} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="100 µm" largo={66} />
      <BarraEscala T={T} at={K.P} until={K.B} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.B} until={K.E} texto="dibujo esquemático" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.S} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.S} until={K.A} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.A} until={K.X} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={73} y={1560} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubtituloIt T={T} idx={0} at={K.G + 0.1} until={K.Me - 0.1} texto="En México se comen *425 hongos silvestres*" />
      <SubtituloIt T={T} idx={1} at={K.Me + 0.1} until={K.F - 0.1} texto="Yemas, hongo azul, *duraznillos, enchilados*" />
      <SubtituloIt T={T} idx={2} at={K.F + 0.1} until={K.Mi - 0.1} texto="Lo que compras es *solo el fruto*" />
      <SubtituloIt T={T} idx={3} at={K.Mi + 0.1} until={K.R - 0.1} texto="El hongo vive abajo: *el micelio*" />
      <SubtituloIt T={T} idx={4} at={K.R + 0.1} until={K.Tr - 0.1} texto="Casi 2 de cada 3 *abrazan una raíz*" />
      <SubtituloIt T={T} idx={5} at={K.Tr + 0.1} until={K.P - 0.1} texto="Azúcares por *agua y nutrientes*" />
      <SubtituloIt T={T} idx={6} at={K.P + 0.1} until={K.B - 0.1} texto="¿Por qué *no los siembran?*" />
      <SubtituloIt T={T} idx={7} at={K.B + 0.1} until={K.E - 0.1} texto="La mayoría *aún no se puede cultivar*" />
      <SubtituloIt T={T} idx={8} at={K.E + 0.1} until={K.S - 0.1} texto="2009: *Acaxochitlán, Hidalgo*" />
      <SubtituloIt T={T} idx={9} at={K.S + 0.1} until={K.A - 0.1} texto="Un saber de *las mujeres nahuas*" />
      <SubtituloIt T={T} idx={10} at={K.A + 0.1} until={K.X - 0.1} texto="Hay *_Amanitas_ mortales* con pañuelito y botita" />
      <SubtituloIt T={T} idx={11} at={K.X + 0.1} until={K.C - 0.1} texto="*Nunca* sin un experto" />
      <SubtituloIt T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No vende solo hongos: *vende un bosque*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.F + 0.2, K.Mi, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 0.4, K.Tr - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.B - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.0, K.S - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.S + 2.6, K.A - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.A + 0.3, K.X - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.X + 0.2, K.C - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.C + 1.0, K.Ou - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="64" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HongosMercadoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HongosMercadoShot /></CompositionStage></div>;
}
window.HongosMercadoApp = HongosMercadoApp;
