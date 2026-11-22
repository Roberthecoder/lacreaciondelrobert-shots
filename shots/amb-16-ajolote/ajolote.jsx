// Shot Ambiental #16 · Hay ajolotes en todo el mundo, menos en su casa (Xochimilco) — NARRADO (N4 la imagen que se llena, al revés).
// Datos: Gaceta UNAM (2024), Voss, Woodcock y Zambrano (2015, BioScience), Zambrano et al. (2010, Biological Invasions), AP (2025).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático (canales, cuadrícula, canchas y peces no van a escala).

const AJ_COL = {
  rosa:    { cuerpo:'#ffb3c6', panza:'#ffd6e0', bran:'#ff3f73', aleta:'rgba(255,196,212,.8)', mancha:null },
  silvestre: { cuerpo:'#6c6a3c', panza:'#97915f', bran:'#b2445e', aleta:'rgba(150,145,95,.75)', mancha:'#3f3d22' },
};
// Ajolote de perfil, mirando a la derecha (origen al centro del cuerpo, largo ≈ 420 px con s = 1).
// Morfología: cabeza ancha con boca en sonrisa, 3 pares de branquias externas plumosas, aleta dorsal que corre hasta la cola,
// cola aplanada con aleta, patas delanteras de 4 dedos y traseras de 5. tipo: 'rosa' (de pecera, leucístico) o 'silvestre' (oscuro).
function Ajolote({ x, y, s = 1, rot = 0, T = 0, seed = 1, tipo = 'silvestre', flip = false, o = 1, nado = 1 }) {
  const P = AJ_COL[tipo] || AJ_COL.silvestre;
  const cola = mece(T, seed, 0.8) * 9 * nado;
  const gill = (bx, by, dx, dy, L, i, lejos) => {
    const a = Math.atan2(dy, dx) + mece(T, seed + i * 3.1, 0.55) * 0.12;
    const ex = bx + Math.cos(a) * L, ey = by + Math.sin(a) * L, nx = -Math.sin(a), ny = Math.cos(a);
    const fil = [];
    for (let k = 1; k <= 7; k++) { const u = k / 8, px = bx + (ex - bx) * u, py = by + (ey - by) * u, l = 19 * (1 - u * 0.45);
      const bx2 = -Math.cos(a) * 5, by2 = -Math.sin(a) * 5;
      fil.push(<line key={'a' + k} x1={px} y1={py} x2={px + nx * l + bx2} y2={py + ny * l + by2} stroke={P.bran} strokeWidth={4.5} strokeLinecap="round" />);
      fil.push(<line key={'b' + k} x1={px} y1={py} x2={px - nx * l + bx2} y2={py - ny * l + by2} stroke={P.bran} strokeWidth={4.5} strokeLinecap="round" />); }
    return <g key={i} opacity={lejos ? 0.6 : 1}>
      <line x1={bx} y1={by} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={11} strokeLinecap="round" />
      <line x1={bx} y1={by} x2={ex} y2={ey} stroke={P.bran} strokeWidth={6} strokeLinecap="round" />{fil}</g>;
  };
  const branquias = (lejos) => [
    gill(96, -34, -0.25, -1, 84, 0, lejos), gill(90, -20, -0.85, -0.75, 80, 1, lejos), gill(86, -6, -1, -0.05, 72, 2, lejos)];
  const pata = (pts, dedos, ang0, ang1) => {
    const d = 'M ' + pts.map((p) => p.join(' ')).join(' L ');
    const [fx, fy] = pts[pts.length - 1];
    const ds = Array.from({ length: dedos }, (_, k) => { const a = (ang0 + (ang1 - ang0) * (k / (dedos - 1))) * Math.PI / 180;
      return <line key={k} x1={fx} y1={fy} x2={fx + Math.cos(a) * 17} y2={fy + Math.sin(a) * 17} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />; });
    const dsc = Array.from({ length: dedos }, (_, k) => { const a = (ang0 + (ang1 - ang0) * (k / (dedos - 1))) * Math.PI / 180;
      return <line key={'c' + k} x1={fx} y1={fy} x2={fx + Math.cos(a) * 16} y2={fy + Math.sin(a) * 16} stroke={P.cuerpo} strokeWidth={4} strokeLinecap="round" />; });
    return <g>{ds}<path d={d} stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={P.cuerpo} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />{dsc}</g>;
  };
  const pd = mece(T, seed + 7, 0.7) * 4 * nado;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    {branquias(true).map((g, i) => <g key={i} transform="translate(10 -6)">{g}</g>)}
    {/* cola con aleta (aplanada de lado) */}
    <g transform={`rotate(${cola} -60 0)`}>
      <path d="M -40 -34 Q -150 -64 -238 -6 Q -150 46 -40 32 Z" fill={P.aleta} stroke={KC.ink} strokeWidth={5} />
      <path d="M -50 -20 Q -150 -22 -232 -4 Q -150 16 -50 20 Z" fill={P.cuerpo} stroke={KC.ink} strokeWidth={5} />
    </g>
    {/* aleta dorsal que corre por el lomo */}
    <path d="M 70 -34 Q 10 -66 -60 -40 L -40 -26 Q 10 -40 70 -28 Z" fill={P.aleta} stroke={KC.ink} strokeWidth={5} />
    {pata([[-38, 22], [-56 + pd, 52], [-40 + pd, 70]], 5, 10, 120)}
    <ellipse cx={10} cy={2} rx={88} ry={36} fill={P.cuerpo} stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 18 Q 10 40 90 22" stroke={P.panza} strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={122} cy={-2} rx={64} ry={48} fill={P.cuerpo} stroke={KC.ink} strokeWidth={6} />
    {P.mancha && [[-30, -10, 7], [20, -18, 6], [-60, 6, 5], [60, -6, 6], [130, -26, 5], [0, 12, 5]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={P.mancha} />)}
    {branquias(false)}
    {pata([[78, 26], [92 - pd, 56], [108 - pd, 68]], 4, 0, 110)}
    <circle cx={152} cy={-16} r={8} fill={KC.ink} /><circle cx={154} cy={-19} r={2.5} fill="#fff" />
    <path d="M 146 20 Q 168 18 182 4" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Carpa común (Cyprinus carpio), mirando a la derecha: cuerpo alto, escamas grandes y 2 pares de barbillas.
function Carpa({ x, y, s = 1, T = 0, seed = 1, flip = false, o = 1 }) {
  const c = mece(T, seed, 1.1) * 8;
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <g transform={`rotate(${c} -110 0)`}><path d="M -110 -4 L -178 -52 Q -158 -4 -178 44 Z" fill="#b9822e" stroke={KC.ink} strokeWidth={5} /></g>
    <path d="M 40 -52 Q -10 -96 -78 -48 Z" fill="#b9822e" stroke={KC.ink} strokeWidth={5} />
    <path d="M 118 2 Q 86 -58 -10 -60 Q -92 -52 -120 -6 Q -92 42 -10 46 Q 86 46 118 2 Z" fill="#d6a043" stroke={KC.ink} strokeWidth={6} />
    {[-70, -40, -10, 20, 50].map((a, i) => [-28, -4, 20].map((b, j) => <path key={i + '-' + j} d={`M ${a} ${b - 12} q 14 12 0 24`} stroke="#9c6a22" strokeWidth={3.5} fill="none" />))}
    <path d="M 30 30 L 10 58 L -6 34 Z" fill="#b9822e" stroke={KC.ink} strokeWidth={4} />
    <circle cx={86} cy={-14} r={8} fill={KC.ink} />
    <path d="M 114 8 q 8 16 -4 28" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    <path d="M 108 12 q 2 14 -10 22" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}
// Tilapia del Nilo (Oreochromis niloticus), mirando a la derecha: aleta dorsal larga con espinas y barras verticales.
function Tilapia({ x, y, s = 1, T = 0, seed = 2, flip = false, o = 1 }) {
  const c = mece(T, seed, 1.2) * 8;
  const esp = Array.from({ length: 9 }, (_, i) => { const xx = 60 - i * 17; return `L ${xx} ${-62 - (i % 2 ? 0 : 14)} L ${xx - 8} -50`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <g transform={`rotate(${c} -100 0)`}><path d="M -100 -6 L -160 -40 L -160 34 Z" fill="#6f8a72" stroke={KC.ink} strokeWidth={5} /></g>
    <path d={`M 68 -46 ${esp} L -100 -24 Z`} fill="#7e9a80" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 110 4 Q 80 -54 -10 -54 Q -88 -46 -108 -4 Q -88 40 -10 46 Q 80 46 110 4 Z" fill="#9db39b" stroke={KC.ink} strokeWidth={6} />
    {[-60, -30, 0, 30].map((a, i) => <path key={i} d={`M ${a} -44 Q ${a + 6} 0 ${a} 40`} stroke="#5f765f" strokeWidth={7} fill="none" opacity=".55" />)}
    <path d="M -10 40 L -40 66 L -60 38 Z" fill="#6f8a72" stroke={KC.ink} strokeWidth={4} />
    <circle cx={78} cy={-12} r={10} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={80} cy={-12} r={5} fill={KC.ink} />
    <path d="M 108 8 l -12 4" stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />
  </g>;
}
// Pecera con un ajolote rosa adentro. p 0..1 = aparece.
function Pecera({ x, y, p = 1, T = 0, seed = 1, w = 120 }) {
  if (p <= 0) return null;
  const k = kEase.rebote(kclamp(p, 0, 1)), h = w * 0.72;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill="rgba(210,245,255,.85)" stroke={KC.ink} strokeWidth={5} />
    <rect x={-w / 2 + 5} y={-h / 2 + 14} width={w - 10} height={h - 19} rx={6} fill="#7fd6f2" />
    <rect x={-w / 2 + 6} y={h / 2 - 14} width={w - 12} height={9} rx={3} fill="#e7d3a1" />
    <Ajolote x={0} y={2} s={w / 560} T={T} seed={seed} tipo="rosa" flip={seed % 2 === 0} />
  </g>;
}
// La Tierra (esquema) con continentes de colores planos.
function Globo({ x, y, r = 220, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f8fd8" stroke={KC.ink} strokeWidth={8} />
    <g transform={`scale(${r / 220})`}>
      <path d="M -150 -110 Q -90 -160 -40 -120 Q -20 -70 -70 -40 Q -60 10 -100 40 Q -140 20 -160 -30 Q -175 -80 -150 -110 Z" fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
      <path d="M -60 40 Q -20 50 -30 110 Q -50 170 -80 150 Q -90 90 -60 40 Z" fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
      <path d="M 20 -150 Q 90 -170 150 -110 Q 180 -50 120 -40 Q 80 -10 40 -40 Q 0 -90 20 -150 Z" fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
      <path d="M 40 0 Q 100 10 110 70 Q 90 140 50 130 Q 20 70 40 0 Z" fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
    </g>
    <ellipse cx={-r * 0.35} cy={-r * 0.45} rx={r * 0.22} ry={r * 0.1} fill="#fff" opacity=".25" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.45})`} />
  </g>;
}
// Peceras alrededor del globo (posiciones fijas).
const AJ_PECERAS = [[-250, -170], [40, -300], [270, -150], [300, 110], [-300, 90], [-80, 290], [190, 290], [-170, -300]];
function GloboPeceras({ x, y, T, t0, r = 200, w = 110 }) {
  return <g>
    <Globo x={x} y={y} r={r} T={T} />
    {AJ_PECERAS.map(([a, b], i) => <Pecera key={i} x={x + a * r / 220} y={y + b * r / 220} p={kprog(T, t0 + i * 0.22, t0 + i * 0.22 + 0.45)} T={T} seed={i + 1} w={w} />)}
  </g>;
}
// 1 km² visto desde arriba: 6,000 celdas (75 × 80). vivos = cuántas siguen encendidas; se apagan en orden aleatorio fijo.
const AJ_N = 6000, AJ_COLS = 75, AJ_FILAS = 80;
const AJ_RANGO = (() => { const r = krng(16); const idx = Array.from({ length: AJ_N }, (_, i) => i); for (let i = AJ_N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const rango = new Array(AJ_N); idx.forEach((c, k) => { rango[c] = k; }); return rango; })();
function KmCuadrado({ x, y, lado = 500, vivos = 6000, T = 0, resalta = 0 }) {
  const cw = lado / AJ_COLS, ch = lado / AJ_FILAS;
  let d = '';
  const grandes = [];
  for (let i = 0; i < AJ_N; i++) { if (AJ_RANGO[i] >= vivos) continue; const c = i % AJ_COLS, f = Math.floor(i / AJ_COLS);
    const px = c * cw, py = f * ch;
    if (resalta > 0 && AJ_RANGO[i] < 36) grandes.push([px + cw / 2, py + ch / 2, AJ_RANGO[i]]);
    d += `M${(px + cw * 0.1).toFixed(1)} ${(py + ch * 0.1).toFixed(1)}h${(cw * 0.8).toFixed(1)}v${(ch * 0.8).toFixed(1)}h${(-cw * 0.8).toFixed(1)}Z`; }
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-10} y={-10} width={lado + 20} height={lado + 20} rx={14} fill="#123c52" stroke={KC.ink} strokeWidth={8} />
    <path d={d} fill="#ff8fb0" />
    {grandes.map(([a, b, k]) => <circle key={k} cx={a} cy={b} r={9 * resalta * (1 + 0.15 * Math.sin(T * 4 + k))} fill="#ff4f86" stroke={KC.ink} strokeWidth={3} />)}
    <text x={lado / 2} y={-26} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>1 km² de canal</text>
  </g>;
}
// Cancha de fútbol vista desde arriba (esquema, 105 × 68 m).
function Cancha({ x, y, w = 210, p = 1 }) {
  const h = w * 68 / 105;
  return <g transform={`translate(${x} ${y})`} opacity={p}>
    <rect x={0} y={0} width={w} height={h} fill="#4fb95a" stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((i) => i % 2 ? <rect key={i} x={i * w / 5} y={3} width={w / 5} height={h - 6} fill="#45a94f" /> : null)}
    <rect x={8} y={8} width={w - 16} height={h - 16} fill="none" stroke="#fff" strokeWidth={3} />
    <line x1={w / 2} y1={8} x2={w / 2} y2={h - 8} stroke="#fff" strokeWidth={3} />
    <circle cx={w / 2} cy={h / 2} r={h * 0.16} fill="none" stroke="#fff" strokeWidth={3} />
    <rect x={8} y={h * 0.3} width={w * 0.15} height={h * 0.4} fill="none" stroke="#fff" strokeWidth={3} />
    <rect x={w - 8 - w * 0.15} y={h * 0.3} width={w * 0.15} height={h * 0.4} fill="none" stroke="#fff" strokeWidth={3} />
  </g>;
}
// Canales y chinampas de Xochimilco vistos desde arriba (esquema).
function Canales({ x, y, w = 1000, h = 520, T = 0 }) {
  const hc = [150, 340], vc = [260, 600, 860];
  const chin = [];
  const xs = [0, ...vc, w], ys = [0, ...hc, h];
  for (let i = 0; i < xs.length - 1; i++) for (let j = 0; j < ys.length - 1; j++) {
    const x0 = xs[i] + 22, x1 = xs[i + 1] - 22, y0 = ys[j] + 22, y1 = ys[j + 1] - 22;
    chin.push(<g key={i + '-' + j}><rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={10} fill={(i + j) % 2 ? '#7cc46a' : '#93d27a'} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: Math.floor((y1 - y0 - 10) / 26) }, (_, k) => <line key={k} x1={x0 + 14} y1={y0 + 18 + k * 26} x2={x1 - 14} y2={y0 + 18 + k * 26} stroke="#4f9a44" strokeWidth={5} strokeDasharray="10 8" />)}
      {[0.2, 0.8].map((q, k) => <circle key={'h' + k} cx={x0 + (x1 - x0) * q} cy={y0 + 4} r={10} fill="#3f8a3a" stroke={KC.ink} strokeWidth={3} />)}</g>);
  }
  const bx = ((T * 60) % (w + 200)) - 100;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} fill="#3aa6c9" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${(i * 97) % w} ${hc[i % 2] + (i % 3 - 1) * 8} q 14 -6 28 0`} stroke="#bfeaf7" strokeWidth={4} fill="none" />)}
    {chin}
    {/* trajinera */}
    <g transform={`translate(${bx} ${hc[0]})`}>
      <rect x={-70} y={-18} width={140} height={36} rx={18} fill="#e8463c" stroke={KC.ink} strokeWidth={5} />
      <rect x={-56} y={-12} width={112} height={24} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={-50 + k * 26} y={-12} width={12} height={24} fill={[KC.pink, KC.cyan, KC.mint, KC.orange][k]} />)}
    </g>
  </g>;
}
// Edificio que crece desde abajo (p 0..1).
function Edificio({ x, y, w = 120, h = 300, p = 1, color = '#c7c2d6' }) {
  const hh = h * p;
  if (hh < 2) return null;
  return <g>
    <rect x={x} y={y - hh} width={w} height={hh} fill={color} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: Math.floor(hh / 46) }, (_, r) => [0, 1].map((c) => <rect key={r + '-' + c} x={x + 18 + c * (w / 2 - 6)} y={y - hh + 16 + r * 46} width={w / 2 - 30} height={24} fill="#fff6c2" stroke={KC.ink} strokeWidth={3} />))}
  </g>;
}
// Juncos / tule del humedal (desaparecen con p → 0).
function Tule({ x, y, T = 0, p = 1, n = 6, seed = 1 }) {
  if (p <= 0.02) return null;
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const xx = x + i * 22, a = mece(T, seed + i, 0.4) * 8, hh = (90 + (i % 3) * 30) * p;
    return <g key={i}><path d={`M ${xx} ${y} q ${a} ${-hh / 2} ${a * 1.6} ${-hh}`} stroke="#3f8a3a" strokeWidth={8} fill="none" strokeLinecap="round" />
      {i % 2 === 0 && <ellipse cx={xx + a * 1.6} cy={y - hh - 10} rx={7} ry={18} fill="#7a4a22" stroke={KC.ink} strokeWidth={3} />}</g>; })}</g>;
}
// Huevo de ajolote: embrión oscuro dentro de su cápsula de gelatina (se pega uno por uno a las plantas). vivo 0..1.
function Huevo({ x, y, vivo = 1, T = 0, i = 0 }) {
  if (vivo <= 0.02) return null;
  return <g transform={`translate(${x} ${y}) scale(${vivo})`}>
    <circle r={20} fill="rgba(220,240,255,.35)" stroke="rgba(220,240,255,.8)" strokeWidth={3} />
    <circle r={9} fill="#3a2c1c" /><circle cx={-3} cy={-3} r={3} fill="#8a7a5a" />
  </g>;
}
// Larva (cría) de ajolote recién nacida: cuerpo delgado, branquias cortas y todavía sin patas.
function Cria({ x, y, s = 1, T = 0, seed = 3, flip = false, o = 1 }) {
  const c = mece(T, seed, 1.4) * 10;
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <g transform={`rotate(${c} -20 0)`}><path d="M -10 -10 Q -70 -22 -110 0 Q -70 22 -10 10 Z" fill="rgba(160,150,110,.7)" stroke={KC.ink} strokeWidth={4} /></g>
    <ellipse cx={10} cy={0} rx={40} ry={14} fill="#8e8758" stroke={KC.ink} strokeWidth={4} />
    {[[-0.4, -1], [-0.9, -0.6], [-1, 0]].map(([a, b], i) => <line key={i} x1={30} y1={-6 + i * 5} x2={30 + a * 22} y2={-6 + i * 5 + b * 22} stroke="#b2445e" strokeWidth={5} strokeLinecap="round" />)}
    <circle cx={40} cy={-3} r={4} fill={KC.ink} />
  </g>;
}
// Doble hélice que gira (ADN ambiental).
function Helice({ x, y, alto = 380, T = 0, brillo = 1 }) {
  const n = 14, a = [], b = [], rungs = [];
  for (let k = 0; k <= n; k++) { const u = k / n, yy = -alto / 2 + u * alto, ph = u * Math.PI * 3 + T * 2.2, x1 = Math.sin(ph) * 60, x2 = Math.sin(ph + Math.PI) * 60;
    a.push(`${x1.toFixed(1)} ${yy.toFixed(1)}`); b.push(`${x2.toFixed(1)} ${yy.toFixed(1)}`);
    rungs.push(<line key={k} x1={x1} y1={yy} x2={x2} y2={yy} stroke={k % 2 ? KC.yellow : KC.pink} strokeWidth={7} strokeLinecap="round" />); }
  return <g transform={`translate(${x} ${y})`} opacity={brillo}>
    <circle r={alto * 0.55} fill={KC.yellow} opacity={0.18 + 0.08 * Math.sin(T * 5)} />
    {rungs}
    <path d={'M ' + a.join(' L ')} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={'M ' + a.join(' L ')} stroke={KC.mint} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={'M ' + b.join(' L ')} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={'M ' + b.join(' L ')} stroke={KC.cyan} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Red de pesca (aro con malla y palo). sube 0..1 = sale del agua.
function Red({ x, y, sube = 0, T = 0 }) {
  const yy = y + (1 - sube) * 260, gotas = [];
  for (let k = 0; k < 6; k++) { const u = ((T * 1.3 + k / 6) % 1); gotas.push(<circle key={k} cx={-60 + k * 24} cy={yy + 70 + u * 160} r={6} fill="#7fd6f2" opacity={sube > 0.6 ? 1 - u : 0} />); }
  return <g>
    <line x1={x + 120} y1={yy - 20} x2={x + 330} y2={yy - 330} stroke="#8a5a2b" strokeWidth={16} strokeLinecap="round" />
    <line x1={x + 120} y1={yy - 20} x2={x + 330} y2={yy - 330} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" opacity=".4" />
    <g transform={`translate(${x} ${yy})`}>
      <path d="M -130 -20 Q 0 150 130 -20" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 7 }, (_, i) => <path key={'v' + i} d={`M ${-120 + i * 40} -20 Q ${-90 + i * 30} 60 ${-30 + i * 10} 100`} stroke="#f4efe4" strokeWidth={3} fill="none" />)}
      {Array.from({ length: 3 }, (_, i) => <path key={'h' + i} d={`M ${-110 + i * 18} ${20 + i * 30} Q 0 ${60 + i * 34} ${110 - i * 18} ${20 + i * 30}`} stroke="#f4efe4" strokeWidth={3} fill="none" />)}
      <ellipse cx={0} cy={-20} rx={130} ry={24} fill="none" stroke={KC.ink} strokeWidth={12} />
      <ellipse cx={0} cy={-20} rx={130} ry={24} fill="none" stroke="#8a5a2b" strokeWidth={6} />
    </g>
    {gotas}
  </g>;
}
// Frasco de muestra con agua del canal y filtro.
function Frasco({ x, y, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))})`}>
    <rect x={-70} y={-120} width={140} height={200} rx={22} fill="rgba(220,245,255,.7)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-62} y={-60} width={124} height={132} rx={16} fill="#7c8d5a" opacity=".85" />
    <rect x={-56} y={-150} width={112} height={36} rx={8} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -150 L 0 -210 L 40 -150 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={30} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">agua</text>
  </g>;
}
// Caja del envío de 1863 con flechas que se ramifican a peceras.
function Envio({ x, y, T, t0 }) {
  const e = kEase.rebote(kprog(T, t0, t0 + 0.5));
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <rect x={-170} y={-110} width={340} height={220} rx={12} fill="#c98f4f" stroke={KC.ink} strokeWidth={7} />
    <line x1={-170} y1={-50} x2={170} y2={-50} stroke={KC.ink} strokeWidth={5} /><line x1={-170} y1={55} x2={170} y2={55} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-64} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>1863</text>
    <text x={0} y={34} textAnchor="middle" style={{ font:`400 88px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={4}>34</text>
    <text x={0} y={94} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>ajolotes → París</text>
  </g>;
}
function Rama({ x1, y1, x2, y2, p }) {
  if (p <= 0) return null;
  const xm = klerp(x1, x2, p), ym = klerp(y1, y2, p);
  return <path d={`M ${x1} ${y1} L ${xm} ${ym}`} stroke={KC.ink} strokeWidth={7} strokeDasharray="16 10" fill="none" strokeLinecap="round" />;
}

function AjoloteShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Casa, A: CUES.Antes, Cd: CUES.Caida, Cn: CUES.Cancha, P: CUES.Pregunta, Cs: CUES.Causas, Pe: CUES.Peces, R: CUES.Refugio, Rd: CUES.Redes, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const G2 = K.G + 3.0; // "pero en su casa…"
  // ajolotes por km² a lo largo de los censos
  const vivos = (() => {
    if (T < K.Cd + 0.2) return Math.round(klerp(0, 6000, kprog(T, K.A + 0.3, K.A + 2.3, kEase.suave)));
    if (T < K.Cd + 2.2) return Math.round(Math.exp(klerp(Math.log(6000), Math.log(100), kprog(T, K.Cd + 0.2, K.Cd + 1.4, kEase.suave))));
    return Math.round(Math.exp(klerp(Math.log(100), Math.log(36), kprog(T, K.Cd + 2.2, K.Cd + 3.0, kEase.suave))));
  })();
  const sucia = kprog(T, K.Cs + 2.2, K.Cs + 3.8, kEase.suave);
  const agua = mixHex('#5cc3e6', '#6f7a3e', sucia);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: peceras en todo el mundo… y 36 en un km² de su casa */}
      <Escena T={T} a={K.G} b={G2}>
        <FondoLunares color={KC.cyan} />
        {svg(<GloboPeceras x={330} y={900} T={T} t0={K.G + 0.05} r={210} w={120} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Escena T={T} a={G2} b={K.Ca}>
        <FondoLunares color={KC.mint} />
        {svg(<KmCuadrado x={160} y={720} lado={410} vivos={36} T={T} resalta={1} />)}
        <EscalaFija texto="1 km² · esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · su casa: canales y chinampas de Xochimilco */}
      <Escena T={T} a={K.Ca} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<Canales x={40} y={660} w={1000} h={520} T={T} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Ca + 1.0} until={K.A - 0.25} x={330} y={880} r={190} fx={600} fy={810} tinte={KC.yellow}
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2d7f8f" />
          {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${30 + k * 90} ${r * 2} q ${mece(t, k, 0.4) * 10} -70 ${mece(t, k + 3, 0.4) * 16} -140`} stroke="#3f8a3a" strokeWidth={9} fill="none" strokeLinecap="round" />)}
          <Ajolote x={r} y={r + 10} s={0.72} T={t} seed={4} tipo="silvestre" /></svg>} />
      {/* 3–4 · 1998: 6,000 por km²; 2008: 100; 2014: 36 */}
      <Escena T={T} a={K.A} b={K.Cn}>
        <FondoLunares color={KC.yellow} />
        {svg(<KmCuadrado x={290} y={660} lado={500} vivos={vivos} T={T} resalta={kprog(T, K.Cd + 2.6, K.Cd + 3.2)} />)}
        <EscalaFija texto="1 km² · esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · casi cuatro canchas para cada uno */}
      <Escena T={T} a={K.Cn} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{[[0, 0], [1, 0], [0, 1], [1, 1]].map(([i, j], k) => <Cancha key={k} x={196 + i * 344} y={660 + j * 224} w={340} p={kprog(T, K.Cn + 0.2 + k * 0.25, K.Cn + 0.5 + k * 0.25)} />)}
          <rect x={186} y={650} width={708} height={458} fill="none" stroke={KC.pink} strokeWidth={10} strokeDasharray="22 12" rx={8} />
          <Ajolote x={540} y={880} s={0.28} T={T} seed={5} tipo="silvestre" /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cs} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={290} y={1100} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      {/* 7 · causas: ciudad sobre el humedal, agua salada y sucia, carpas y tilapias */}
      <Escena T={T} a={K.Cs} b={K.Pe}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <rect x={0} y={880} width={KW} height={320} fill={agua} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${60 + i * 170} ${910 + (i % 2) * 20} q 20 -8 40 0`} stroke="#ffffff" strokeOpacity={0.6 - sucia * 0.4} strokeWidth={5} fill="none" />)}
          <rect x={0} y={800} width={260} height={84} fill="#9a7a4a" stroke={KC.ink} strokeWidth={6} />
          <rect x={820} y={800} width={260} height={84} fill="#9a7a4a" stroke={KC.ink} strokeWidth={6} />
          <Tule x={40} y={800} T={T} p={1 - kprog(T, K.Cs + 0.3, K.Cs + 1.6)} n={9} seed={1} />
          <Tule x={850} y={800} T={T} p={1 - kprog(T, K.Cs + 0.5, K.Cs + 1.8)} n={9} seed={5} />
          <Edificio x={20} y={800} w={110} h={260} p={kprog(T, K.Cs + 0.4, K.Cs + 1.4, kEase.sale)} />
          <Edificio x={140} y={800} w={110} h={200} p={kprog(T, K.Cs + 0.7, K.Cs + 1.7, kEase.sale)} color="#e3b7a0" />
          <Edificio x={830} y={800} w={110} h={220} p={kprog(T, K.Cs + 0.6, K.Cs + 1.6, kEase.sale)} color="#b7d0e3" />
          <Edificio x={950} y={800} w={110} h={290} p={kprog(T, K.Cs + 0.9, K.Cs + 1.9, kEase.sale)} />
          {sucia > 0.3 && Array.from({ length: 10 }, (_, i) => <circle key={i} cx={100 + i * 92} cy={1000 + ((i * 37) % 150)} r={6 + (i % 3) * 3} fill="#3e3a1e" opacity={sucia * 0.6} />)}
          <Carpa x={klerp(-200, 380, kprog(T, K.Cs + 4.0, K.Cs + 5.2, kEase.sale))} y={1060} s={0.8} T={T} seed={1} />
          <Tilapia x={klerp(1280, 720, kprog(T, K.Cs + 4.4, K.Cs + 5.6, kEase.sale))} y={1000} s={0.8} T={T} seed={2} flip /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · bajo el agua: los peces se comen huevos y crías */}
      <Escena T={T} a={K.Pe} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#1c4b52, #0d1f24)' }}></div>
        {svg(<>
          <path d={`M 200 1200 Q ${200 + mece(T, 2, 0.3) * 12} 1000 ${190 + mece(T, 3, 0.3) * 20} 760`} stroke="#3f8a3a" strokeWidth={14} fill="none" strokeLinecap="round" />
          {[[180, 1120], [220, 1060], [176, 990], [224, 930], [182, 860], [214, 800]].map(([a, b], i) => <ellipse key={'h' + i} cx={a} cy={b} rx={36} ry={12} fill="#4f9a44" stroke={KC.ink} strokeWidth={3} transform={`rotate(${i % 2 ? -30 : 30} ${a} ${b})`} />)}
          {[[226, 1100], [176, 1040], [232, 980], [168, 910], [230, 850], [178, 780]].map(([a, b], i) => <Huevo key={'e' + i} x={a} y={b} T={T} i={i} vivo={1 - kprog(T, K.Pe + 1.4 + i * 0.3, K.Pe + 1.6 + i * 0.3)} />)}
          <Cria x={600} y={1060} s={1.1} T={T} seed={6} o={1 - kprog(T, K.Pe + 3.0, K.Pe + 3.4)} />
          <Carpa x={klerp(900, 400, kprog(T, K.Pe + 0.2, K.Pe + 1.8, kEase.suave))} y={930} s={0.85} T={T} seed={3} flip />
          <Tilapia x={klerp(1200, 760, kprog(T, K.Pe + 1.6, K.Pe + 3.1, kEase.suave))} y={1100} s={0.75} T={T} seed={4} flip />
          <Carpa x={klerp(1250, 880, kprog(T, K.Pe + 0.6, K.Pe + 2.4, kEase.suave))} y={760} s={0.6} T={T} seed={7} flip />
          <Tilapia x={klerp(-200, 480, kprog(T, K.Pe + 0.4, K.Pe + 2.2, kEase.suave))} y={720} s={0.55} T={T} seed={8} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 9 · refugio en la chinampa: filtro que frena a los peces; cubren 0.5 % de los canales */}
      <Escena T={T} a={K.R} b={K.Rd}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={760} width={KW} height={60} fill="#9a7a4a" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${520 + i * 60} 760 q 6 -40 0 -70`} stroke="#3f8a3a" strokeWidth={9} fill="none" strokeLinecap="round" />)}
          <text x={560} y={682} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>chinampa</text>
          <rect x={0} y={820} width={440} height={380} fill="#6f7a3e" stroke={KC.ink} strokeWidth={6} />
          <rect x={440} y={820} width={640} height={380} fill="#6fd0e8" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M ${560 + i * 140} 1200 q ${mece(T, i, 0.4) * 10} -80 ${mece(T, i + 2, 0.4) * 18} -150`} stroke="#3f8a3a" strokeWidth={10} fill="none" strokeLinecap="round" />)}
          {/* filtro */}
          <rect x={425} y={820} width={30} height={380} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={5} />
          {Array.from({ length: 13 }, (_, i) => <line key={i} x1={425} y1={840 + i * 28} x2={455} y2={840 + i * 28} stroke={KC.ink} strokeWidth={3} />)}
          <line x1={440} y1={820} x2={440} y2={1200} stroke={KC.ink} strokeWidth={3} />
          <Ajolote x={730} y={960} s={0.5} T={T} seed={8} tipo="silvestre" />
          <Ajolote x={900} y={1110} s={0.42} T={T} seed={9} tipo="silvestre" flip />
          {(() => { const u = kprog(T, K.R + 0.8, K.R + 2.0, kEase.sale), reb = kprog(T, K.R + 2.0, K.R + 2.8, kEase.sale);
            return <Carpa x={klerp(-180, 300, u) - reb * 120} y={980} s={0.62} T={T} seed={10} />; })()}
          <Tilapia x={klerp(-220, 250, kprog(T, K.R + 1.6, K.R + 2.8, kEase.sale)) - kprog(T, K.R + 2.8, K.R + 3.6, kEase.sale) * 90} y={1130} s={0.5} T={T} seed={11} />
          {T > K.R + 2.0 && T < K.R + 2.6 && <text x={410} y={950} textAnchor="end" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={3}>¡TOC!</text>}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* barra: 0.5 % de los canales */}
      {(() => { if (T < K.R + 4.0 || T > K.Rd + 0.4) return null; const e = kprog(T, K.R + 4.0, K.R + 4.5, kEase.sale), o = 1 - kprog(T, K.Rd - 0.1, K.Rd + 0.3);
        return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:38, opacity:e * o }}>
          <rect x={40} y={420} width={620} height={190} rx={24} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={5} />
          <text x={70} y={470} style={{ font:`900 32px ${KF.texto}` }} fill={KC.texto}>canales de Xochimilco</text>
          <rect x={70} y={500} width={560} height={60} rx={10} fill="#3aa6c9" stroke={KC.texto} strokeWidth={4} />
          <rect x={70} y={500} width={2.8 * kprog(T, K.R + 4.4, K.R + 5.0)} height={60} fill={KC.yellow} />
          <line x1={72} y1={560} x2={72} y2={590} stroke={KC.yellow} strokeWidth={5} />
          <text x={90} y={598} style={{ font:`700 28px ${KF.mono}` }} fill={KC.yellow}>← refugios: 0.5 %</text>
        </svg>; })()}
      {/* 10 · redes vacías, ADN en el agua */}
      <Escena T={T} a={K.Rd} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={0} y={1000} width={KW} height={200} fill="#4f8f8f" stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(${-560 * kprog(T, K.Rd + 2.8, K.Rd + 3.6, kEase.suave)} 0)`}><Red x={260} y={740} sube={kprog(T, K.Rd + 0.3, K.Rd + 1.6, kEase.sale)} T={T} /></g>
          <Frasco x={620} y={900} p={kprog(T, K.Rd + 3.2, K.Rd + 3.7)} />
          {T > K.Rd + 3.6 && <Helice x={330} y={790} alto={300} T={T} brillo={kprog(T, K.Rd + 3.8, K.Rd + 4.4)} />}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: 34 ajolotes a París en 1863 → peceras del mundo; y regreso al globo y al km² */}
      <Escena T={T} a={K.C} b={K.C + 4.3}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {[[150, 1010], [340, 1050], [540, 1065], [740, 1050], [930, 1010]].map(([a, b], i) => <g key={i}><Rama x1={540} y1={830} x2={a} y2={b - 50} p={kprog(T, K.C + 1.2 + i * 0.15, K.C + 1.8 + i * 0.15)} />
            <Pecera x={a} y={b} p={kprog(T, K.C + 1.7 + i * 0.15, K.C + 2.1 + i * 0.15)} T={T} seed={i + 2} w={140} /></g>)}
          <Envio x={540} y={710} T={T} t0={K.C + 0.2} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Escena T={T} a={K.C + 4.3} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><GloboPeceras x={300} y={860} T={T} t0={K.C + 4.0} r={170} w={100} />
          <KmCuadrado x={650} y={790} lado={340} vivos={36} T={T} resalta={0.8} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={G2 + 0.2} until={K.Ca - 0.2} valor={36} dur={1.0} etiqueta="ajolotes por km²" x={300} y={470} tam={170} color={KC.pink} />
      <Chip T={T} at={G2 + 1.4} until={K.Ca - 0.2} texto="último censo completo: 2014" y={1450} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.G + 0.5} until={G2 - 0.2} texto="peceras de todo el mundo" y={1450} x={540} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.Ca + 0.2} until={K.A - 0.2} texto="Xochimilco · Ciudad de México" y={430} x={360} tam={32} borde={KC.mint} />
      <Etq T={T} at={K.Ca + 1.6} until={K.A - 0.3} x={540} y={1000} texto="ajolote" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.8} until={K.A - 0.3} x={540} y={1045} texto="Ambystoma mexicanum" it tam={30} color={KC.ink} />
      {T >= K.A + 0.3 && T < K.Cn && <div style={{ position:'absolute', left:540, top:470, transform:'translate(-50%,-50%)', zIndex:42, font:`700 130px ${KF.mono}`, color: T > K.Cd + 2.2 ? KC.pink : KC.texto, textShadow:KSOMBRA }}>{kformato(vivos, 0)}</div>}
      <Chip T={T} at={K.A + 0.6} until={K.Cd + 0.1} texto="1998 · censo de la UAM" y={1450} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Cd + 0.3} until={K.Cd + 2.1} texto="2008 · quedaban 100" y={1450} x={540} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.Cd + 2.3} until={K.Cn - 0.2} texto="2014 · UNAM: 36 → 6 de cada 1,000" y={1450} x={540} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Cn + 0.6} until={K.P - 0.15} texto="1 km² ÷ 36 ≈ 27,800 m² cada uno" y={470} x={540} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Cn + 1.2} until={K.P - 0.15} texto="≈ 4 canchas de fútbol" y={1450} x={540} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Cs + 0.4} until={K.Cs + 2.1} texto="la ciudad sobre el humedal" y={470} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Cs + 2.3} until={K.Cs + 3.9} texto="agua salada y sucia" y={470} x={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Cs + 4.1} until={K.Pe - 0.2} texto="carpa y tilapia: traídas para criar" y={470} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Cs + 5.0} until={K.Pe - 0.2} x={260} y={1150} texto="carpa" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cs + 5.4} until={K.Pe - 0.2} x={830} y={1080} texto="tilapia" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pe + 0.5} until={K.Pe + 2.6} x={250} y={690} texto="huevos de ajolote" tam={30} />
      <Etq T={T} at={K.Pe + 1.0} until={K.Pe + 3.0} x={660} y={1010} texto="cría" tam={30} />
      <Chip T={T} at={K.Pe + 0.3} until={K.R - 0.2} texto="se comen huevos y crías" y={470} x={420} tam={32} borde={KC.red} />
      <Chip T={T} at={K.R + 0.3} until={K.R + 3.8} texto="chinampa-refugio · UNAM y chinamperos" y={470} x={540} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.R + 1.0} until={K.R + 3.8} x={470} y={870} texto="filtro" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Rd + 0.4} until={K.Rd + 3.0} texto="2025 · primera etapa del censo" y={470} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Rd + 1.4} until={K.Rd + 3.2} x={420} y={880} texto="red vacía" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Rd + 3.8} until={K.C - 0.2} texto="ADN ambiental: siguen ahí" y={1450} x={540} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.C + 0.5} until={K.C + 4.1} texto="Xochimilco → París · 1863" y={470} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.0} until={K.C + 4.1} texto="la mayoría de los de pecera" y={1450} x={540} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.C + 4.6} until={K.Ou - 0.1} texto="en todo el mundo… menos en su casa" y={1450} x={540} tam={32} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="En su casa: *36 por km².*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.A - 0.1} texto="Xochimilco: *casi su único hogar libre.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Cd - 0.1} texto="1998: *6,000 por km².*" />
      <Subtitulo T={T} idx={3} at={K.Cd + 0.1} until={K.Cn - 0.1} texto="2008: 100. 2014: *36.*" />
      <Subtitulo T={T} idx={4} at={K.Cn + 0.1} until={K.P - 0.1} texto="Casi *4 canchas* para cada uno." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Cs - 0.1} texto="¿Qué le pasó *a su casa?*" />
      <Subtitulo T={T} idx={6} at={K.Cs + 0.1} until={K.Pe - 0.1} texto="Ciudad, agua sucia *y peces de fuera.*" />
      <Subtitulo T={T} idx={7} at={K.Pe + 0.1} until={K.R - 0.1} texto="Se comen *sus huevos y sus crías.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Rd - 0.1} texto="Refugios con filtro: *0.5 % de los canales.*" />
      <Subtitulo T={T} idx={9} at={K.Rd + 0.1} until={K.C - 0.1} texto="Redes vacías: *solo su ADN.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="En todo el mundo, *menos en su casa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Casa + 1.4, CUES.Antes - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Caida + 2.4, CUES.Cancha + 0.6, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Causas + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Peces + 1.6, CUES.Refugio - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Refugio + 4.6, CUES.Redes - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Redes + 3.6, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 4.5, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="16" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AjoloteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AjoloteShot /></CompositionStage></div>;
}
window.AjoloteApp = AjoloteApp;
