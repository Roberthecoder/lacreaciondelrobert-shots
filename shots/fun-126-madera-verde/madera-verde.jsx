// Shot Fungi Mati #126 · Esa madera verde no está pintada: la tiñe un hongo — NARRADO (N1 Por dentro + N5 el estudio de 1992).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Morfología: Chlorociboria = copitas (apotecios) en forma de platito, verde azulado por dentro y por fuera, 2–8 mm,
// pie corto central o un poco de lado, sobre madera dura muerta sin corteza (sobre todo roble). El micelio tiñe la madera.

const MV = { verde:'#1aa89b', verde2:'#3fd3c4', verde3:'#0c6f67', verdeHondo:'#0a4f4a', madera:'#e6c48f', madera2:'#cfa66b', veta:'#b88a4f',
  roble:'#a8773f', roble2:'#8a5d2c', alamo:'#efd9ad', hifa:'#fff4d6', celda:'#2a2218', pared:'#c9a978', fibra:'#3a2e20' };

// Tabla de madera clara vista de frente y su canto (grosor) abajo. verde 0..1 = cuánto se ven las vetas verdes.
// adentro 0..1 = el canto muestra que el verde atraviesa la madera.
function Tabla({ T = 0, x, y, w = 760, h = 420, verde = 1, adentro = 1, rot = 0, s = 1, copita = 0 }) {
  const vetas = [0.16, 0.3, 0.47, 0.62, 0.78, 0.9];
  const manchas = [[0.18, 0.28, 0.26, 0.09], [0.55, 0.46, 0.34, 0.11], [0.3, 0.7, 0.22, 0.08], [0.78, 0.22, 0.18, 0.07], [0.72, 0.78, 0.25, 0.09]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={0} y={0} width={w} height={h} rx={14} fill={MV.madera} stroke={KC.ink} strokeWidth={8} />
    {vetas.map((v, i) => <path key={i} d={`M 20 ${h * v} Q ${w * 0.3} ${h * v - 18} ${w * 0.55} ${h * v + 6} T ${w - 20} ${h * v - 4}`} stroke={MV.veta} strokeWidth={5} fill="none" opacity=".75" />)}
    {manchas.map(([a, b, c, d], i) => <ellipse key={i} cx={w * a} cy={h * b} rx={w * c * (0.6 + 0.4 * verde)} ry={h * d} fill={MV.verde} opacity={0.85 * verde} transform={`rotate(-4 ${w * a} ${h * b})`} />)}
    {manchas.map(([a, b, c, d], i) => <ellipse key={'b' + i} cx={w * a - 10} cy={h * b - 4} rx={w * c * 0.55} ry={h * d * 0.45} fill={MV.verde2} opacity={0.5 * verde} transform={`rotate(-4 ${w * a} ${h * b})`} />)}
    {/* canto (grosor): el verde sigue adentro */}
    <path d={`M 0 ${h - 4} L ${w} ${h - 4} L ${w - 18} ${h + 60} L 18 ${h + 60} Z`} fill={MV.madera2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {adentro > 0 && [0.18, 0.55, 0.3, 0.78, 0.72].map((a, i) => <rect key={i} x={w * a - 34} y={h + 6} width={68 * adentro} height={46} rx={10} fill={MV.verde3} opacity={0.9 * adentro} />)}
    {copita > 0 && <Copita T={T} x={130} y={30} s={0.9} crece={copita} />}
  </g>;
}
// Una copita (apotecio) de Chlorociboria vista de lado y un poco desde arriba: platito con pie corto. Base en (x, y). 1 = ~5 mm a escala de la rama.
function Copita({ T = 0, x, y, s = 1, crece = 1, inclina = 0 }) {
  if (crece <= 0) return null;
  const c = kEase.rebote(kclamp(crece, 0, 1)), w = mece(T, x * 0.01 + y * 0.003, 0.6) * 2;
  return <g transform={`translate(${x} ${y}) rotate(${inclina + w}) scale(${s * c})`}>
    {/* pie corto, un poco de lado */}
    <path d="M -9 0 Q -12 -20 -4 -34 L 8 -34 Q 10 -18 9 0 Z" fill={MV.verde3} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    {/* cara externa del platito */}
    <path d="M -54 -40 Q -40 -18 0 -16 Q 40 -18 54 -40 Z" fill={MV.verde} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {/* cara interna (himenio), un poco más clara */}
    <ellipse cx={0} cy={-42} rx={54} ry={14} fill={MV.verde2} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-14} cy={-45} rx={20} ry={4} fill="#ffffff" opacity=".35" />
  </g>;
}
// Rama caída SIN corteza, con manchas verde azulado. Cara del corte a la izquierda.
function Rama({ x, y, w = 820, h = 150, verde = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={0} y={0} width={w} height={h} rx={h / 2} fill={MV.madera2} stroke={KC.ink} strokeWidth={7} />
    {[0.28, 0.5, 0.72].map((v, i) => <path key={i} d={`M 70 ${h * v} Q ${w * 0.45} ${h * v - 12} ${w - 40} ${h * v + 4}`} stroke={MV.veta} strokeWidth={5} fill="none" />)}
    {[[0.3, 0.45, 0.16], [0.62, 0.55, 0.2], [0.85, 0.4, 0.1]].map(([a, b, c], i) => <ellipse key={i} cx={w * a} cy={h * b} rx={w * c * verde} ry={h * 0.3} fill={MV.verde} opacity={0.85 * verde} />)}
    <ellipse cx={0} cy={h / 2} rx={42} ry={h / 2} fill={MV.madera} stroke={KC.ink} strokeWidth={7} />
    {[0.66, 0.36].map((k, i) => <ellipse key={i} cx={0} cy={h / 2} rx={42 * k} ry={h / 2 * k} fill="none" stroke={MV.veta} strokeWidth={4} />)}
    <path d={`M -10 ${h * 0.3} Q 14 ${h * 0.5} -6 ${h * 0.75}`} stroke={MV.verde3} strokeWidth={14} fill="none" opacity={0.9 * verde} strokeLinecap="round" />
  </g>;
}
// Madera al microscopio (corte esquemático): fibras (celditas), vasos (grandes) y radios (filas horizontales de parénquima).
// hifas 0..1 = cuánto han avanzado; tinte 0..1 = cuánto se tiñen las células por donde pasan. Cuadro de 960 × 640 en (x, y).
const MV_CELDAS = (() => {
  const r = krng(126), c = [];
  for (let j = 0; j < 14; j++) for (let i = 0; i < 22; i++) {
    const cx = 22 + i * 43 + (j % 2) * 10, cy = 24 + j * 46;
    if (j === 4 || j === 9) continue; // radios
    c.push({ cx, cy, w: 34 + r() * 6, h: 36 + r() * 6, vaso: false });
  }
  return c;
})();
const MV_VASOS = [[170, 150], [520, 120], [790, 300], [330, 400], [640, 520], [120, 560]];
const MV_RUTA = [[-20, 210], [140, 230], [260, 205], [400, 228], [560, 210], [700, 232], [860, 214], [990, 226]]; // por el radio 1
const MV_RUTA2 = [[480, -20], [470, 120], [500, 230], [470, 330], [492, 440], [470, 560], [500, 660]];          // atraviesa fibras
const MV_RUTA3 = [[-20, 440], [120, 452], [300, 436], [520, 454], [720, 438], [990, 450]];                    // radio 2
function rutaParcial(pts, p) {
  if (p <= 0) return '';
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let falta = tot * kclamp(p, 0, 1), s = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) { const d = L[i - 1]; if (falta >= d) { s += ` L ${pts[i][0]} ${pts[i][1]}`; falta -= d; } else { const k = falta / d; s += ` L ${(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k).toFixed(1)} ${(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k).toFixed(1)}`; break; } }
  return s;
}
function cercaRuta(cx, cy, pts, p, dist = 60) {
  // ¿ya pasó la hifa cerca de esta célula? devuelve 0..1
  let tot = 0; const L = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let acc = 0, best = 0;
  for (let i = 1; i < pts.length; i++) {
    for (let k = 0; k <= 8; k++) { const u = k / 8, px = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, py = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u;
      const q = (acc + L[i - 1] * u) / tot; if (q <= p && Math.hypot(px - cx, py - cy) < dist) best = 1; }
    acc += L[i - 1];
  }
  return best;
}
function MaderaMicro({ T = 0, x = 60, y = 520, hifas = 1, tinte = 0, s = 1, antigua = false }) {
  const rutas = [MV_RUTA, MV_RUTA2, MV_RUTA3];
  const pr = [kclamp(hifas * 1.4, 0, 1), kclamp(hifas * 1.4 - 0.25, 0, 1), kclamp(hifas * 1.4 - 0.4, 0, 1)];
  const tinta = (cx, cy) => tinte > 0 ? Math.max(...rutas.map((r, i) => cercaRuta(cx, cy, r, pr[i], 62))) * tinte : 0;
  const fondoCelda = antigua ? '#2e2519' : MV.celda;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={`mvClip${antigua ? 'a' : 'n'}${x}`}><rect x={0} y={0} width={960} height={640} rx={26} /></clipPath></defs>
    <g clipPath={`url(#mvClip${antigua ? 'a' : 'n'}${x})`}>
      <rect x={0} y={0} width={960} height={640} fill={MV.fibra} />
      {MV_CELDAS.map((c, i) => { const enVaso = MV_VASOS.some(([vx, vy]) => Math.hypot(vx - c.cx, vy - c.cy) < 70); if (enVaso) return null;
        const t = tinta(c.cx, c.cy);
        return <rect key={i} x={c.cx - c.w / 2} y={c.cy - c.h / 2} width={c.w} height={c.h} rx={9} fill={mixHex(fondoCelda, MV.verde3, t)} stroke={MV.pared} strokeWidth={4} />; })}
      {/* radios: filas de células de parénquima */}
      {[210, 440].map((ry, j) => <g key={j}>{Array.from({ length: 16 }, (_, i) => { const cx = 30 + i * 62, t = tinta(cx, ry);
        return <rect key={i} x={cx - 28} y={ry - 18} width={58} height={36} rx={6} fill={mixHex('#3a2c1c', MV.verde, t)} stroke={MV.pared} strokeWidth={4} />; })}</g>)}
      {/* vasos */}
      {MV_VASOS.map(([vx, vy], i) => { const t = tinta(vx, vy); return <g key={i}>
        <circle cx={vx} cy={vy} r={56} fill={mixHex('#17120c', MV.verdeHondo, t)} stroke={MV.pared} strokeWidth={6} />
        <circle cx={vx} cy={vy} r={56} fill="none" stroke={mixHex(MV.pared, MV.verde2, t)} strokeWidth={3} opacity=".6" /></g>; })}
      {/* hifas: hilos blancos que avanzan por la punta */}
      {rutas.map((r, i) => pr[i] > 0 && <g key={i}>
        <path d={rutaParcial(r, pr[i])} stroke={MV.hifa} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter:'drop-shadow(0 0 6px rgba(255,244,214,.6))' }} />
        <path d={rutaParcial(r.map(([a, b], k) => [a + 14, b + (k % 2 ? 26 : -22)]), pr[i] * 0.85)} stroke={MV.hifa} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".8" />
      </g>)}
    </g>
    <rect x={0} y={0} width={960} height={640} rx={26} fill="none" stroke={antigua ? KC.gold : MV.verde2} strokeWidth={6} />
  </g>;
}
// Molécula esquemática de xilindeína (anillos fusionados; el dibujo es esquemático, no la estructura exacta).
function Xilindeina({ x, y, s = 1, p = 1, rot = 0 }) {
  const hexa = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 36 * Math.cos(a)).toFixed(1)} ${(cy + 36 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const C = [[0, 0], [62, 0], [124, 0], [31, 54], [93, 54], [155, 54], [62, 108], [124, 108]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={{ filter:`drop-shadow(0 0 12px ${MV.verde2})` }}>
    {C.map(([a, b], i) => <path key={i} d={hexa(a, b)} fill="rgba(63,211,196,.18)" stroke={MV.verde2} strokeWidth={7} strokeLinejoin="round" opacity={kclamp(p * 8 - i, 0, 1)} />)}
    {[[-40, -20], [200, 80], [-10, 140]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={11} fill={KC.red} opacity={p} />)}
  </g>;
}
// Panel de taracea (marquetería con piezas de madera): una perspectiva sencilla con piezas verdes. Esquemático.
function Taracea({ x, y, s = 1, verde = 1 }) {
  const piezas = [];
  for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) piezas.push([i, j]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-20} width={440} height={520} rx={10} fill="#6b4220" stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={0} width={400} height={480} fill="#e8cf9c" stroke={KC.ink} strokeWidth={5} />
    {/* piso en perspectiva */}
    {piezas.map(([i, j], k) => { const y0 = 300 + j * 34, y1 = y0 + 34, sc0 = 0.5 + j * 0.12, sc1 = sc0 + 0.12, x0 = 200 + (i - 2.5) * 80 * sc0, x1 = 200 + (i - 1.5) * 80 * sc0, x2 = 200 + (i - 1.5) * 80 * sc1, x3 = 200 + (i - 2.5) * 80 * sc1;
      const col = (i + j) % 2 ? '#5a3418' : MV.alamo; return <path key={k} d={`M ${x0} ${y0} L ${x1} ${y0} L ${x2} ${y1} L ${x3} ${y1} Z`} fill={col} stroke={KC.ink} strokeWidth={2} />; })}
    {/* repisa con un libro y una jarra (motivos típicos de la taracea), con piezas verdes */}
    <rect x={40} y={110} width={320} height={22} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
    <rect x={70} y={40} width={70} height={70} fill={mixHex(MV.alamo, MV.verde, verde)} stroke={KC.ink} strokeWidth={4} />
    <rect x={150} y={58} width={40} height={52} fill="#8a5d2c" stroke={KC.ink} strokeWidth={4} />
    <path d="M 250 110 Q 230 70 255 50 L 295 50 Q 320 70 300 110 Z" fill={mixHex(MV.alamo, MV.verde, verde)} stroke={KC.ink} strokeWidth={4} />
    <rect x={40} y={160} width={320} height={110} fill={mixHex('#d8b57a', MV.verde3, verde * 0.8)} stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={40 + i * 80} y1={160} x2={40 + i * 80} y2={270} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Microscopio esquemático.
function Microscopio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={240} height={50} rx={14} fill="#3b4150" stroke={KC.ink} strokeWidth={7} />
    <path d="M 60 -30 Q 110 -160 40 -290" stroke="#3b4150" strokeWidth={46} fill="none" strokeLinecap="round" />
    <rect x={-110} y={-150} width={200} height={26} rx={8} fill="#5b6275" stroke={KC.ink} strokeWidth={6} />
    <g transform="rotate(-18 -10 -300)"><rect x={-40} y={-380} width={60} height={200} rx={14} fill="#e9ecf2" stroke={KC.ink} strokeWidth={7} /><rect x={-30} y={-420} width={40} height={50} rx={8} fill="#3b4150" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
// Medidor de rayos X (microanálisis): barra de "metales" que apenas sube.
function MedidorMetales({ T, x, y, at }) {
  const p = kprog(T, at, at + 0.9, kEase.sale);
  if (T < at) return null;
  return <g transform={`translate(${x} ${y})`} opacity={kprog(T, at, at + 0.3)}>
    <rect x={0} y={0} width={420} height={70} rx={35} fill="rgba(14,15,18,.85)" stroke={KC.cyan} strokeWidth={5} />
    <rect x={14} y={14} width={392} height={42} rx={21} fill="#20242c" />
    <rect x={14} y={14} width={Math.max(10, 392 * 0.05 * p)} height={42} rx={21} fill={KC.cyan} />
    {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={14 + 392 * k} y1={18} x2={14 + 392 * k} y2={52} stroke="#5a6070" strokeWidth={3} />)}
  </g>;
}
// Cajita de Tunbridge ware: tapa con mosaico de teselas (una flor y una cenefa), con verde de roble teñido. Esquemático.
const MV_MOSAICO = (() => { const c = []; const N = 13;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const dx = i - 6, dy = j - 6, r = Math.hypot(dx, dy);
    let col = (i + j) % 2 ? '#d9b780' : '#c49a5e';
    if (i === 0 || j === 0 || i === N - 1 || j === N - 1) col = (i + j) % 2 ? MV.verde : '#5a3418';
    else if (r < 1.2) col = KC.yellow; else if (r < 2.6) col = '#c83a2a'; else if (r < 3.6 && (i === 6 || j === 6)) col = MV.verde;
    c.push({ i, j, col, k: i * 0.7 + j * 0.37 }); }
  return c; })();
function CajitaTunbridge({ T, x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -20 460 L 500 460 L 470 620 L 10 620 Z" fill="#6b4220" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-20} y={-20} width={520} height={500} rx={16} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
    {MV_MOSAICO.map((c, n) => { const e = kprog(p * 14, c.k, c.k + 1.2, kEase.rebote); if (e <= 0) return null;
      return <rect key={n} x={10 + c.i * 35 + (1 - e) * 15} y={10 + c.j * 35 + (1 - e) * 15} width={33 * e} height={33 * e} fill={c.col} stroke={KC.ink} strokeWidth={1.5} />; })}
  </g>;
}
// Frasquito (vial) con líquido de color; destiñe 0..1.
function Vial({ x, y, s = 1, color = MV.verde, destine = 0, etiqueta }) {
  const c = mixHex(color, '#d8d4c8', destine);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-50} y={-210} width={100} height={210} rx={22} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-42} y={-140} width={84} height={132} rx={16} fill={c} />
    <rect x={-56} y={-250} width={112} height={46} rx={10} fill="#3b4150" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-196} width={14} height={160} rx={7} fill="#fff" opacity=".4" />
    {etiqueta && <text x={0} y={60} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Chip electrónico con película de pigmento entre dos electrodos; chispa = corriente.
function ChipPelicula({ T, x, y, s = 1, pel = 1, chispa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-120} width={520} height={240} rx={20} fill="#2c3340" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 8 }, (_, i) => <g key={i}><rect x={-230 + i * 62} y={-150} width={22} height={34} fill="#c9ccd4" stroke={KC.ink} strokeWidth={4} /><rect x={-230 + i * 62} y={116} width={22} height={34} fill="#c9ccd4" stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-200} y={-60} width={110} height={120} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
    <rect x={90} y={-60} width={110} height={120} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
    <rect x={-90} y={-46} width={180 * pel} height={92} fill={MV.verde} stroke={KC.ink} strokeWidth={4} opacity={pel > 0 ? 1 : 0} />
    {chispa > 0 && Array.from({ length: 5 }, (_, i) => { const u = ((T * 1.6 + i / 5) % 1); return <circle key={i} cx={-90 + u * 180} cy={Math.sin(u * 12 + i) * 18} r={9} fill={KC.yellow} opacity={chispa * Math.sin(u * Math.PI)} style={{ filter:'drop-shadow(0 0 8px #ffe11a)' }} />; })}
  </g>;
}
// Reloj de arena.
function RelojArena({ T, x, y, s = 1, p = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 3) * 3})`}>
    <rect x={-90} y={-170} width={180} height={24} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <rect x={-90} y={146} width={180} height={24} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <path d="M -70 -146 L 70 -146 Q 70 -60 8 0 Q 70 60 70 146 L -70 146 Q -70 60 -8 0 Q -70 -60 -70 -146 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-60 + p * 40} ${-130 + p * 100} L ${60 - p * 40} ${-130 + p * 100} L 6 -8 L -6 -8 Z`} fill={MV.verde} opacity={1 - p * 0.9} />
    <path d={`M -60 140 L 60 140 L ${40 - 30 * p} ${140 - 90 * p} L ${-40 + 30 * p} ${140 - 90 * p} Z`} fill={MV.verde} />
  </g>;
}
// Báscula: oblea de silicio vs. copita verde.
function Bascula({ T, x, y, s = 1, inc = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 260 L 40 260 L 14 0 L -14 0 Z" fill="#5b6275" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${inc})`}>
      <rect x={-330} y={-14} width={660} height={28} rx={12} fill="#7a8095" stroke={KC.ink} strokeWidth={6} />
      <g transform="translate(-280 -14)"><ellipse cx={0} cy={-30} rx={110} ry={30} fill="#9aa3b8" stroke={KC.ink} strokeWidth={6} />
        {[-60, -20, 20, 60].map((d) => <line key={d} x1={d} y1={-52} x2={d} y2={-8} stroke="#5b6275" strokeWidth={3} />)}
        <ellipse cx={-30} cy={-38} rx={40} ry={8} fill="#fff" opacity=".45" /></g>
      <g transform="translate(280 -14)"><Copita T={T} x={0} y={0} s={1.2} /></g>
    </g>
  </g>;
}

function MaderaVerdeShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Hi: CUES.Hifas, Pi: CUES.Pigmento, Co: CUES.Comun, P: CUES.Pregunta, E: CUES.Estudio, M: CUES.Met,
    Pa: CUES.Patron, Tu: CUES.Tunbridge, R: CUES.Raro, L: CUES.Luz, S: CUES.Silicio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const brocha = kprog(T, K.G + 0.05, K.G + 0.9, kEase.sale);     // la brocha entra antes del segundo 1
  const giro = kprog(T, K.G + 1.6, K.G + 2.6, kEase.suave);        // la tabla se inclina y se ve el canto
  const semanas = kprog(T, K.L + 0.4, K.L + 3.4, kEase.suave);    // 0 → 25 semanas (en la escena, ~3 días = 0.12 semanas)
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: no es pintura (macro) */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla T={T} x={60} y={660 - giro * 40} w={660} h={400} rot={-3 + giro * 2} adentro={giro} />
          {/* brocha que entra y se tacha */}
          <g transform={`translate(${klerp(1200, 640, brocha)} ${klerp(500, 760, brocha)}) rotate(${klerp(-50, -30, brocha)})`} opacity={1 - kprog(T, K.G + 1.6, K.G + 2.0)}>
            <rect x={-30} y={-260} width={60} height={200} rx={18} fill="#c83a2a" stroke={KC.ink} strokeWidth={7} />
            <rect x={-44} y={-70} width={88} height={40} rx={6} fill="#c9ccd4" stroke={KC.ink} strokeWidth={6} />
            <path d="M -44 -30 L 44 -30 L 36 50 Q 0 70 -36 50 Z" fill="#f0e2c2" stroke={KC.ink} strokeWidth={6} />
            {T > K.G + 0.9 && <path d="M -90 -150 L 90 60 M 90 -150 L -90 60" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.G + 0.9, K.G + 1.1)} />}
          </g>
        </>)}
      </Escena>
      {/* 2 · el hongo: copitas verde azulado sobre una rama sin corteza */}
      <Escena T={T} a={K.H} b={K.Hi} zoom={0.08} origen="40% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rama x={150} y={930} w={820} h={170} />
          {[[300, 935, 1.0, -8], [380, 932, 0.75, 6], [460, 936, 1.15, -2], [560, 934, 0.7, 10], [640, 936, 0.95, -6], [720, 933, 0.6, 4], [520, 940, 0.55, 0]].map(([cx, cy, cs, ci], i) =>
            <Copita key={i} T={T} x={cx} y={cy} s={cs * 1.3} inclina={ci} crece={kprog(T, K.H + 0.4 + i * 0.18, K.H + 1.0 + i * 0.18)} />)}
        </>)}
      </Escena>
      {/* 3–4 · por dentro: hifas por las células de la madera; se tiñen */}
      <Escena T={T} a={K.Hi} b={K.Co} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <MaderaMicro T={T} x={156} y={570} s={0.8} hifas={kprog(T, K.Hi + 0.2, K.Pi + 0.6)} tinte={kprog(T, K.Pi + 0.1, K.Pi + 1.8)} />
          {T > K.Pi + 0.4 && <Xilindeina x={700} y={1100} s={0.42} p={kprog(T, K.Pi + 0.4, K.Pi + 1.4)} rot={Math.sin(T) * 4} />}
        </>)}
      </Escena>
      {/* 5 · en el bosque: mucha madera verde, pocas copitas */}
      <Escena T={T} a={K.Co} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={980} width={KW} height={190} fill="#7a5a34" opacity=".55" />
          {[[60, 680, 520, 0.9, -6], [520, 760, 480, 1, 5], [140, 870, 600, 0.8, 3], [600, 950, 420, 0.9, -4], [40, 1020, 460, 1, 2]].map(([rx, ry, rw, v, rr], i) =>
            <g key={i} opacity={kprog(T, K.Co + 0.1 + i * 0.15, K.Co + 0.4 + i * 0.15)}><Rama x={rx} y={ry} w={rw} h={86} verde={v} rot={rr} /></g>)}
          <Copita T={T} x={720} y={953} s={0.9} crece={kprog(T, K.Co + 1.2, K.Co + 1.6)} />
          <Copita T={T} x={770} y={956} s={0.6} crece={kprog(T, K.Co + 1.35, K.Co + 1.75)} />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿cuánto dura ese verde? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Tabla T={T} x={60} y={760} w={430} h={260} rot={-6} /><RelojArena T={T} x={300} y={620} s={0.9} p={kprog(T, K.P, K.E + 0.4)} /></>)}
      </Escena>
      {/* 7 · el estudio de 1992: dos taraceas al microscopio */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.E + 2.4, K.E + 2.9)}><Taracea x={80} y={700} s={0.95} /></g>
          <g opacity={kprog(T, K.E + 3.4, K.E + 3.9)}><Microscopio x={800} y={1110} s={1.1} /></g>
        </>)}
      </Escena>
      {/* 8 · el verde era álamo con hifas; sin tintes minerales (al microscopio, fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.Pa} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <MaderaMicro T={T} x={204} y={660} s={0.7} hifas={kprog(T, K.M + 1.2, K.M + 2.6)} tinte={kprog(T, K.M + 1.6, K.M + 3.0)} antigua />
          <MedidorMetales T={T} x={330} y={1010} at={K.M + 3.4} />
        </>)}
      </Escena>
      {/* 9 · el mismo patrón: madera de hoy vs. panel antiguo */}
      <Escena T={T} a={K.Pa} b={K.Tu} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        {fsvg(<>
          <MaderaMicro T={T} x={40} y={720} s={0.52} hifas={1} tinte={1} />
          <g opacity={kprog(T, K.Pa + 0.5, K.Pa + 0.9)}><MaderaMicro T={T} x={550} y={720} s={0.52} hifas={1} tinte={1} antigua /></g>
          <path d={`M 540 700 L 540 1070`} stroke={KC.gold} strokeWidth={4} strokeDasharray="12 10" />
        </>)}
      </Escena>
      {/* 10 · Tunbridge Wells: mosaicos con roble teñido */}
      <Escena T={T} a={K.Tu} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Rama x={560} y={1040} w={460} h={120} rot={-4} />
          <CajitaTunbridge T={T} x={70} y={560} s={0.9} p={kprog(T, K.Tu + 0.6, K.Tu + 3.4)} />
        </>)}
      </Escena>
      {/* 11 · Oregon: el pigmento como semiconductor */}
      <Escena T={T} a={K.R} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Vial x={200} y={1000} s={1.1} />
          {(() => { const g = kprog(T, K.R + 1.0, K.R + 1.8); return g > 0 && g < 1 ? <circle cx={klerp(200, 560, g)} cy={klerp(820, 860, g) - Math.sin(g * Math.PI) * 120} r={16} fill={MV.verde} stroke={KC.ink} strokeWidth={4} /> : null; })()}
          <ChipPelicula T={T} x={680} y={900} s={0.72} pel={kprog(T, K.R + 1.6, K.R + 2.3)} chispa={kprog(T, K.R + 2.5, K.R + 2.9)} />
        </>)}
      </Escena>
      {/* 12 · 25 semanas de luz y aire */}
      <Escena T={T} a={K.L} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g transform={`translate(540 560)`}><path d="M -160 0 L 160 0 L 110 -90 L -110 -90 Z" fill="#3b4150" stroke={KC.ink} strokeWidth={7} />
            <rect x={-150} y={-4} width={300} height={22} rx={10} fill="#fff7c2" stroke={KC.ink} strokeWidth={5} />
            <path d="M -150 30 L -330 520 L 330 520 L 150 30 Z" fill="#fff7c2" opacity={0.28 + 0.06 * Math.sin(T * 6)} /></g>
          <Vial x={250} y={1000} s={1.05} color="#3d6be0" destine={kprog(T, K.L + 0.45, K.L + 0.75)} etiqueta="TIPS-Pn" />
          <Vial x={540} y={1000} s={1.05} color="#c83a8a" destine={kprog(T, K.L + 0.9, K.L + 2.4)} etiqueta="diF TES-ADT" />
          <Vial x={830} y={1000} s={1.05} color={MV.verde} destine={0} etiqueta="xilindeína" />
        </>)}
      </Escena>
      {/* 13 · no le gana al silicio */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Bascula T={T} x={540} y={840} s={1.1} inc={-8 * kprog(T, K.S + 0.3, K.S + 1.2, kEase.rebote)} />)}
      </Escena>
      {/* 14 · cierre: la misma tabla del inicio, ya explicada */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Tabla T={T} x={90} y={600} w={720} h={400} rot={-1} adentro={1} copita={kprog(T, K.C + 0.5, K.C + 1.2)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.0} until={K.H - 0.3} texto="✗ no es pintura" x={330} y={540} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 2.3} until={K.H - 0.3} x={60} y={1160} texto="el verde sigue por dentro" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.Hi - 0.3} x={60} y={560} texto="copitas verdes" tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.7} until={K.Hi - 0.3} x={60} y={620} texto="Chlorociboria" it tam={42} color={KC.ink} />
      <Etq T={T} at={K.H + 2.4} until={K.Hi - 0.3} x={60} y={700} texto="2–8 mm · pie corto" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 2.9} until={K.Hi - 0.3} x={60} y={1160} texto="madera muerta, sin corteza" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Hi + 0.05} until={K.Pi - 0.2} texto="AL MICROSCOPIO · LA MADERA" x={400} y={470} tam={32} borde={MV.verde2} mono />
      <Etq T={T} at={K.Hi + 0.8} until={K.Pi - 0.2} x={60} y={1120} texto="hifas = hilos del hongo" tam={28} color={MV.hifa} />
      <Etq T={T} at={K.Pi + 0.6} until={K.Co - 0.3} x={60} y={1115} texto="xilindeína" tam={38} color={MV.verde2} />
      <Etq T={T} at={K.Pi + 0.9} until={K.Co - 0.3} x={60} y={1160} texto="pigmento · esquemático" tam={22} color={KC.texto} />
      <Etq T={T} at={K.Pi + 0.1} until={K.Co - 0.3} x={60} y={440} texto="se tiñen las células" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Pi + 0.2} until={K.Co - 0.3} x={60} y={478} texto="por donde pasan las hifas" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Pi + 0.3} until={K.Co - 0.3} x={60} y={516} texto="(vasos, fibras y parénquima)" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Co + 1.0} until={K.P - 0.2} texto="se ve más la madera que el hongo" x={430} y={560} tam={34} borde={MV.verde3} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.3} anio="1992" quien="Blanchette, Wilmering y Baumeister" revista="U. de Minnesota · Holzforschung, 1992" x={540} y={820} />
      <Chip T={T} at={K.E + 2.6} until={K.E + 4.1} texto="taracea = dibujo con piezas de madera" x={480} y={560} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.M - 0.3} texto="Renacimiento italiano · siglo XV" x={400} y={470} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.1} until={K.Pa - 0.3} texto="studiolo de Gubbio · Met, Nueva York" x={420} y={470} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.M + 0.6} until={K.Pa - 0.3} texto="Fra Giovanni da Verona · c. 1500" x={420} y={550} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.M + 1.4} until={K.M + 3.9} x={60} y={612} texto="madera: álamo (Populus)" tam={28} color={KC.texto} />
      <Etq T={T} at={K.M + 3.5} until={K.Pa - 0.3} x={240} y={985} texto="metales: casi nada" tam={26} color={KC.cyan} />
      <Chip T={T} at={K.M + 4.1} until={K.Pa - 0.3} texto="→ no es tinte mineral" x={420} y={625} tam={32} borde={KC.cyan} />
      <Etq T={T} at={K.Pa + 0.2} until={K.Tu - 0.3} x={60} y={680} texto="hoy" tam={34} color={MV.verde2} />
      <Etq T={T} at={K.Pa + 0.7} until={K.Tu - 0.3} x={570} y={680} texto="panel del siglo XV" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Pa + 1.2} until={K.Tu - 0.3} texto="mismo patrón" x={540} y={1110} tam={40} borde={KC.gold} />
      <NumeroGigante T={T} at={K.Pa + 2.0} until={K.Tu - 0.3} valor={500} dur={1.2} sufijo=" años" etiqueta="obras de" x={360} y={500} tam={130} color={MV.verde2} />
      <Chip T={T} at={K.Tu + 0.3} until={K.R - 0.3} texto="Tunbridge Wells, Inglaterra · siglo XIX" x={540} y={470} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Tu + 1.6} until={K.R - 0.3} x={600} y={1000} texto="roble caído teñido" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Tu + 2.2} until={K.R - 0.3} x={560} y={640} texto="mosaico de madera" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.R + 0.2} until={K.L - 0.3} anio="2018–19" quien="Universidad Estatal de Oregon" revista="MRS Advances 2018 · ACS Omega 2019" x={420} y={560} />
      <Etq T={T} at={K.R + 2.4} until={K.L - 0.3} x={440} y={1060} texto="semiconductor" tam={32} color={KC.ink} />
      <Etq T={T} at={K.L + 0.8} until={K.S - 0.3} x={110} y={1110} texto="se degrada en 3 días" tam={20} color={KC.ink} />
      <Etq T={T} at={K.L + 2.1} until={K.S - 0.3} x={420} y={1110} texto="en semanas" tam={20} color={KC.ink} />
      <Chip T={T} at={K.L + 0.1} until={K.S - 0.3} texto="en solución · luz y aire" x={330} y={470} tam={32} borde={KC.ink} />
      {T < K.S - 0.2 && <Contador T={T} at={K.L + 0.4} hasta={25} dur={3.0} sufijo=" semanas" x={540} y={690} tam={64} color={KC.ink} />}
      <Chip T={T} at={K.S + 0.2} until={K.C - 0.2} texto="funciona, pero no es un gran semiconductor" x={540} y={1110} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.5} until={K.C - 0.2} x={60} y={640} texto="silicio" tam={32} color={KC.ink} />
      <Etq T={T} at={K.C + 1.2} until={K.Ou} x={60} y={1080} texto="hifas · xilindeína · 500 años" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="no es pintura: es un hongo" x={360} y={520} tam={38} borde={MV.verde3} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.Hi} texto="5 mm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.Hi} until={K.Co} texto="50 µm · esquemático" largo={75} />
      <BarraEscala T={T} at={K.Co} until={K.P} texto="10 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="10 cm" largo={100} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.M} texto="panel esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.Tu} texto="50 µm · esquemático" largo={75} />
      <BarraEscala T={T} at={K.Tu} until={K.R} texto="5 cm" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.L} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.L} until={K.S} texto="frascos: 2 cm" largo={50} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.C} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={150} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No está pintada: *la tiñó un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Hi - 0.1} texto="Copitas verde azulado *de milímetros.*" />
      <Subtitulo T={T} idx={2} at={K.Hi + 0.1} until={K.Pi - 0.1} texto="Sus hifas avanzan *por la madera.*" />
      <Subtitulo T={T} idx={3} at={K.Pi + 0.1} until={K.Co - 0.1} texto="Dejan un pigmento: *la xilindeína.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.P - 0.1} texto="Se ve más *la madera teñida.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuánto dura *ese verde?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.M - 0.1} texto="1992: taraceas *al microscopio.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.Pa - 0.1} texto="Álamo con hifas, *sin tintes minerales.*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.Tu - 0.1} texto="Un hongo en obras *de 500 años.*" />
      <Subtitulo T={T} idx={9} at={K.Tu + 0.1} until={K.R - 0.1} texto="Mosaicos con *roble teñido.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.L - 0.1} texto="El pigmento, *como semiconductor.*" />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.S - 0.1} texto="25 semanas de luz *sin degradarse.*" />
      <Subtitulo T={T} idx={12} at={K.S + 0.1} until={K.C - 0.1} texto="No le gana al silicio, *pero es de un hongo.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo que lleva *siglos dando color.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.3, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.0, K.Hi - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pi + 0.1, K.Co + 0.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.E + 0.15, 'avatar_06_pensativo_menton', 'grande'],
        [K.E + 4.3, K.M - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pa + 0.3, K.Pa + 4.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.R + 2.3, K.L + 0.8, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.L + 3.3, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="126" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MaderaVerdeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MaderaVerdeShot /></CompositionStage></div>;
}
window.MaderaVerdeApp = MaderaVerdeApp;
