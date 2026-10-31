// Shot Ambiental #23 · Esta tierra no está muerta (un centímetro de suelo tarda hasta mil años) — NARRADO (N1 por dentro).
// Datos: FAO (World Soil Day; DG 2012; IYS 2015), Borrelli et al. 2017 (Nature Communications), FAO/ITPS 2015 (SWSR),
// Anthony et al. 2023 (PNAS), FAO et al. 2020 (State of knowledge of soil biodiversity). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

const SU = { tierra:'#7a4a26', tierra2:'#5b3519', tierraOsc:'#2a1a10', grano:'#a8784a', pasto:'#3fbf4a', hoja:'#c9a04a', raiz:'#e9d6a8' };

// Pedacitos de suelo (granos irregulares) dentro de una caja w×h. seed fija el dibujo.
function Granos({ w, h, n = 60, seed = 3, color = SU.grano, o = 1, tam = [10, 34] }) {
  const r = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => {
    const cx = r() * w, cy = r() * h, s = tam[0] + r() * (tam[1] - tam[0]), k = 5 + Math.floor(r() * 3);
    const pts = Array.from({ length: k }, (_, j) => { const a = (j / k) * Math.PI * 2, rr = s * (0.65 + r() * 0.45); return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
    return <polygon key={i} points={pts} fill={i % 3 === 0 ? mixHex(color, '#ffffff', 0.15) : color} stroke="rgba(0,0,0,.45)" strokeWidth={3} />;
  })}</g>;
}
// Franja de suelo en corte (de y0 a y1) con pasto arriba.
function FranjaSuelo({ T, y0, y1, seed = 5, pasto = true }) {
  return <g>
    <rect x={-20} y={y0} width={KW + 40} height={y1 - y0} fill={SU.tierra} stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 ${y0 + 10})`}><Granos w={KW} h={y1 - y0 - 20} n={70} seed={seed} color={SU.grano} tam={[6, 18]} o={0.7} /></g>
    {pasto && Array.from({ length: 46 }, (_, i) => { const x = i * 24 + 6, m = mece(T, i, 0.4) * 6;
      return <path key={i} d={`M ${x} ${y0 + 2} q ${4 + m} -26 ${10 + m * 1.5} -44 M ${x + 10} ${y0 + 2} q ${-2 + m} -18 ${-8 + m} -30`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />; })}
    {pasto && Array.from({ length: 46 }, (_, i) => { const x = i * 24 + 6, m = mece(T, i, 0.4) * 6;
      return <path key={i} d={`M ${x} ${y0 + 2} q ${4 + m} -26 ${10 + m * 1.5} -44 M ${x + 10} ${y0 + 2} q ${-2 + m} -18 ${-8 + m} -30`} stroke={SU.pasto} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Pala que se clava (p 0..1: baja) y levanta un terrón (l 0..1).
function Pala({ x, y, p = 0, l = 0 }) {
  const dy = klerp(-260, 0, p) - l * 110, rot = -12 + l * 10;
  return <g transform={`translate(${x} ${y + dy}) rotate(${rot})`}>
    <rect x={-14} y={-560} width={28} height={420} rx={10} fill="#b07a3c" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-600} width={120} height={46} rx={20} fill="#b07a3c" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -150 L 80 -150 L 70 -20 Q 0 50 -70 -20 Z" fill="#c9d1da" stroke={KC.ink} strokeWidth={8} />
    <path d="M -50 -130 L -45 -40" stroke="#fff" strokeWidth={8} opacity=".5" strokeLinecap="round" />
    {l > 0.05 && <path d="M -85 -95 Q -60 -170 0 -165 Q 70 -175 88 -100 Q 60 -60 0 -70 Q -60 -60 -85 -95 Z" fill={SU.tierra} stroke={KC.ink} strokeWidth={6} opacity={kclamp(l * 3, 0, 1)} />}
  </g>;
}
// Cuchara con su montoncito de tierra. lleno 0..1.
function Cuchara({ x, y, s = 1, lleno = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={120} y={-16} width={300} height={32} rx={16} fill="#d7dde4" stroke={KC.ink} strokeWidth={7} transform="rotate(8)" />
    <ellipse cx={0} cy={0} rx={150} ry={80} fill="#d7dde4" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={6} rx={124} ry={58} fill="#aeb7c1" />
    {lleno > 0 && <g transform={`translate(0 0) scale(1 ${lleno})`}>
      <path d="M -125 8 Q -110 -70 -30 -88 Q 40 -104 100 -62 Q 140 -30 125 10 Q 0 50 -125 8 Z" fill={SU.tierra} stroke={KC.ink} strokeWidth={7} />
      <g transform="translate(-110 -80)"><Granos w={220} h={80} n={18} seed={9} tam={[6, 12]} o={0.8} /></g>
    </g>}
  </g>;
}
// Coco (bacteria redonda) y bacilo: usa Bacteria del kit para bacilos.
function Coco({ x, y, r = 20, color = '#ff9ec7' }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} /><circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.3} fill="#fff" opacity=".4" /></g>;
}
// Hifas: ramas que crecen por la punta, con septos. g 0..1 crecimiento.
function kRamasHifa(seed, x0, y0, ang, n = 3) {
  const r = krng(seed), ramas = [];
  const crece = (x, y, a, largo, nivel) => {
    const pts = [[x, y]]; let cx = x, cy = y, ca = a;
    for (let i = 0; i < largo; i++) { ca += (r() - 0.5) * 0.35; cx += Math.cos(ca) * 28; cy += Math.sin(ca) * 28; pts.push([cx, cy]);
      if (nivel < 2 && i > 3 && r() < 0.12) crece(cx, cy, ca + (r() < 0.5 ? 0.9 : -0.9), Math.floor(largo * 0.55), nivel + 1); }
    ramas.push({ pts, inicio: nivel * 0.25 + (pts.length ? 0 : 0) });
  };
  for (let k = 0; k < n; k++) crece(x0, y0, ang + (k - (n - 1) / 2) * 0.5, 22, 0);
  return ramas;
}
function Hifas({ ramas, g = 1, color = '#f2e7c9', grosor = 22 }) {
  return <g>{ramas.map((b, i) => {
    const u = kclamp((g - b.inicio) / (1 - b.inicio), 0, 1), m = Math.max(2, Math.ceil(b.pts.length * u)); if (u <= 0) return null;
    const pts = b.pts.slice(0, m), d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
    const [tx, ty] = pts[pts.length - 1];
    return <g key={i}>
      <path d={d} stroke={KC.ink} strokeWidth={grosor + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, j) => (j > 0 && j % 4 === 0 && j < pts.length - 1) ? (() => { const [ax, ay] = pts[j - 1], a = Math.atan2(p[1] - ay, p[0] - ax) + Math.PI / 2, h = grosor * 0.5;
        return <line key={j} x1={p[0] + Math.cos(a) * h} y1={p[1] + Math.sin(a) * h} x2={p[0] - Math.cos(a) * h} y2={p[1] - Math.sin(a) * h} stroke="rgba(0,0,0,.55)" strokeWidth={4} />; })() : null)}
      <circle cx={tx} cy={ty} r={grosor * 0.62} fill={mixHex(color, '#ffffff', 0.4)} stroke={KC.ink} strokeWidth={4} />
    </g>;
  })}</g>;
}
// Pedazo de hoja muerta con nervaduras; come 0..1 le abre hoyos y la achica.
function HojaMuerta({ x, y, s = 1, come = 0, rot = 0 }) {
  const hoyos = [[-60, -20, 40], [40, 30, 50], [100, -40, 34], [-140, 40, 30], [10, -70, 28], [-30, 60, 36]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 - come * 0.3)})`}>
    <defs><clipPath id={'hm' + Math.round(x)}><path d="M -230 0 Q -150 -150 40 -120 Q 200 -90 240 0 Q 170 110 0 120 Q -170 120 -230 0 Z" /></clipPath></defs>
    <path d="M -230 0 Q -150 -150 40 -120 Q 200 -90 240 0 Q 170 110 0 120 Q -170 120 -230 0 Z" fill={SU.hoja} stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#hm${Math.round(x)})`}>
      <path d="M -230 0 L 240 0 M -120 0 L -60 -90 M -120 0 L -60 90 M 0 0 L 60 -100 M 0 0 L 60 100 M 110 0 L 160 -70 M 110 0 L 160 70" stroke="#8a6a2a" strokeWidth={7} fill="none" />
      {hoyos.map(([hx, hy, hr], i) => { const k = kclamp(come * 6 - i, 0, 1); return k > 0 ? <circle key={i} cx={hx} cy={hy} r={hr * k} fill={SU.tierraOsc} stroke={KC.ink} strokeWidth={5} /> : null; })}
    </g>
  </g>;
}
// Ácaro oribátido (vista de arriba): cuerpo redondeado oscuro, 8 patas (4 pares), gnatosoma al frente. s=1 → ~150 px.
function Acaro({ x, y, s = 1, T = 0, rot = 0, pata: cp = KC.ink }) {
  const pata = (lado, i) => { const a = (35 + i * 38) * Math.PI / 180, m = Math.sin(T * 10 + i * 1.7 + (lado > 0 ? 0 : Math.PI)) * 0.12;
    const bx = 22 - i * 16, by = lado * 26, kx = bx + Math.cos(a + m) * 52, ky = by + lado * Math.sin(a + m) * 52;
    const px = kx + Math.cos(a + m + 0.35) * 40, py = ky + lado * Math.sin(a + m + 0.35) * 40;
    return <polyline key={`${lado}${i}`} points={`${bx},${by} ${kx.toFixed(1)},${ky.toFixed(1)} ${px.toFixed(1)},${py.toFixed(1)}`} fill="none" stroke={cp} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2, 3].map((i) => pata(1, i))}{[0, 1, 2, 3].map((i) => pata(-1, i))}
    <path d="M 52 -14 L 84 0 L 52 14 Z" fill="#7a3b1c" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={62} ry={48} fill="#6e2f15" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-12} cy={-16} rx={28} ry={14} fill="#fff" opacity=".28" />
    <path d="M 40 -20 q 20 -24 34 -26 M 40 20 q 20 24 34 26" stroke={cp} strokeWidth={4} fill="none" />
  </g>;
}
// Colémbolo (de lado): cabeza con antenas de 4 artejos, tórax con 3 pares de patas, abdomen y fúrcula plegada.
// salto 0..1 = la fúrcula se suelta hacia atrás. s=1 → ~360 px.
function Colembolo({ x, y, s = 1, T = 0, salto = 0, flip = false, pata: cp = KC.ink }) {
  const furA = klerp(-150, 30, salto), seg = [[130, 0, 44, 40], [80, -4, 30, 42], [40, -6, 30, 44], [0, -6, 30, 46], [-40, -4, 30, 44], [-80, 0, 30, 40], [-118, 6, 28, 34]];
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    {/* antenas */}
    <polyline points={`150,-24 186,-62 214,-80 238,-104 260,-112`} fill="none" stroke={cp} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${Math.sin(T * 4) * 4} 150 -24)`} />
    {[186, 214, 238].map((ax, i) => <circle key={i} cx={ax} cy={[-62, -80, -104][i]} r={7} fill={cp} />)}
    {/* patas (3 pares bajo el tórax) */}
    {[80, 40, 0].map((px, i) => { const m = Math.sin(T * 9 + i) * 8;
      return <polyline key={i} points={`${px},20 ${px + 14 + m},52 ${px + 4 + m},80`} fill="none" stroke={cp} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />; })}
    {/* fúrcula (cola saltadora) */}
    <g transform={`translate(-100 24) rotate(${furA})`}><path d="M 0 0 L 110 6 M 60 4 L 112 -10" stroke={cp} strokeWidth={10} fill="none" strokeLinecap="round" /></g>
    {/* cuerpo segmentado */}
    {seg.map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx + 10} ry={ry * 0.6} fill={i === 0 ? '#9b8fe0' : '#8173cf'} stroke={KC.ink} strokeWidth={6} />)}
    <circle cx={148} cy={-10} r={8} fill={KC.ink} />
    <ellipse cx={20} cy={-22} rx={70} ry={8} fill="#fff" opacity=".3" />
  </g>;
}
// Lombriz de tierra: cuerpo de anillos con clitelo (banda más gruesa cerca de la cabeza). Avanza hacia la derecha.
function Lombriz({ x, y, largo = 640, T = 0, avance = 0, A = 26 }) {
  const n = 46, pts = Array.from({ length: n }, (_, i) => { const u = i / (n - 1), sx = x + avance - largo + u * largo; return [sx, y + Math.sin(u * 7 - T * 4) * A]; });
  const d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const cl = pts.slice(Math.floor(n * 0.66), Math.floor(n * 0.76)), dc = 'M ' + cl.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const [hx, hy] = pts[n - 1];
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={58} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="#e98a8a" strokeWidth={44} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {pts.map((p, i) => (i > 0 && i < n - 1 && i % 2 === 0) ? (() => { const [ax, ay] = pts[i - 1], a = Math.atan2(p[1] - ay, p[0] - ax) + Math.PI / 2;
      return <line key={i} x1={p[0] + Math.cos(a) * 20} y1={p[1] + Math.sin(a) * 20} x2={p[0] - Math.cos(a) * 20} y2={p[1] - Math.sin(a) * 20} stroke="rgba(120,30,30,.5)" strokeWidth={3} />; })() : null)}
    <path d={dc} stroke={KC.ink} strokeWidth={70} fill="none" strokeLinecap="round" />
    <path d={dc} stroke="#f6b9a0" strokeWidth={56} fill="none" strokeLinecap="round" />
    <circle cx={hx} cy={hy} r={23} fill="#e98a8a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Grumo (agregado) de tierra: bola irregular con poros.
function Grumo({ x, y, r = 40, seed = 1, o = 1, s = 1 }) {
  const q = krng(seed), k = 9, pts = Array.from({ length: k }, (_, j) => { const a = (j / k) * Math.PI * 2, rr = r * (0.82 + q() * 0.3); return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <polygon points={pts} fill="#9a6236" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={-r * 0.3} cy={-r * 0.2} r={r * 0.12} fill={SU.tierraOsc} /><circle cx={r * 0.25} cy={r * 0.2} r={r * 0.1} fill={SU.tierraOsc} />
    <circle cx={-r * 0.3} cy={-r * 0.4} r={r * 0.18} fill="#fff" opacity=".2" />
  </g>;
}
// Nube de lluvia con gotas. lluvia 0..1 intensidad.
function NubeLluvia({ T, x, y, s = 1, lluvia = 1, largo = 300 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {lluvia > 0 && Array.from({ length: 10 }, (_, i) => { const u = ((T * 1.6 + i * 0.37) % 1); return <line key={i} x1={-120 + i * 26} y1={50 + u * largo} x2={-128 + i * 26} y2={80 + u * largo} stroke="#2f8fd8" strokeWidth={7} strokeLinecap="round" opacity={lluvia * (1 - u * 0.5)} />; })}
    <path d="M -160 40 Q -190 -10 -130 -30 Q -110 -90 -40 -70 Q 10 -120 70 -70 Q 140 -80 150 -20 Q 200 10 160 40 Z" fill="#cfd8e3" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Mundo microscópico de la cucharada (para la Lupa): fondo café oscuro, granos, hifas, bacterias y un ácaro.
const SU_HIFA_LUPA = kRamasHifa(17, 20, 260, -0.4, 2);
function InteriorCucharada(T, r) {
  const w = r * 2;
  return <svg width={w} height={w}>
    <rect width={w} height={w} fill={SU.tierraOsc} />
    <Granos w={w} h={w} n={14} seed={4} color="#6b4a2c" tam={[22, 40]} />
    <g transform={`scale(${w / 520})`}><Hifas ramas={SU_HIFA_LUPA} g={0.4 + 0.6 * kclamp((T % 20) / 6, 0, 1)} grosor={14} /></g>
    {Array.from({ length: 9 }, (_, i) => { const a = T * (0.5 + i * 0.07) + i, cx = r + Math.cos(a) * (r * 0.55) * ((i % 3) / 3 + 0.4), cy = r + Math.sin(a * 1.3) * (r * 0.5);
      return i % 3 === 0 ? <Coco key={i} x={cx} y={cy} r={10} /> : <Bacteria key={i} T={T} seed={i} x={cx} y={cy} rot={a * 40} s={0.28} color={i % 2 ? KC.mint : KC.yellow} />; })}
    <Acaro x={r * 1.35} y={r * 1.45} s={0.45} T={T} rot={-30 + Math.sin(T) * 10} pata="#e9d6a8" />
  </svg>;
}
// Raíz de frijol con nódulos (para la Lupa): nódulos rosados con bacterias (Rhizobium) adentro y N₂ que entra.
function InteriorNodulo(T, r) {
  const w = r * 2;
  return <svg width={w} height={w}>
    <rect width={w} height={w} fill={SU.tierraOsc} />
    <Granos w={w} h={w} n={10} seed={6} color="#6b4a2c" tam={[18, 30]} />
    <path d={`M ${-10} ${r * 0.3} Q ${r} ${r * 0.9} ${w + 10} ${r * 1.5}`} stroke={KC.ink} strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d={`M ${-10} ${r * 0.3} Q ${r} ${r * 0.9} ${w + 10} ${r * 1.5}`} stroke={SU.raiz} strokeWidth={42} fill="none" strokeLinecap="round" />
    {[[r * 0.45, r * 0.62, 34], [r * 1.05, r * 1.0, 58], [r * 1.62, r * 1.34, 30]].map(([nx, ny, nr], i) => <g key={i}>
      <circle cx={nx} cy={ny + nr * 0.6} r={nr} fill="#f08aa6" stroke={KC.ink} strokeWidth={6} />
      {i === 1 && Array.from({ length: 7 }, (_, j) => { const a = j * 0.9 + T * 0.8; return <Bacteria key={j} T={T} seed={j} x={nx + Math.cos(a) * nr * 0.5} y={ny + nr * 0.6 + Math.sin(a) * nr * 0.45} rot={a * 50} s={0.16} color="#c2185b" flagelo={false} />; })}
    </g>)}
    {Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.6 + i * 0.25) % 1), xx = r * 1.05 - 120 + i * 50, yy = 30 + u * (r * 1.0 - 30);
      return <g key={i} opacity={1 - u * 0.6}><text x={xx} y={yy} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#bfe7ff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">N₂</text></g>; })}
  </svg>;
}
// Milpa: maíz con su espiga y su mazorca, frijol que se enreda (hojas de 3 folíolos y vainas) y calabaza al pie. g 0..1 crece.
function Maiz({ x, y, h = 620, g = 1, T = 0 }) {
  const H = h * g, m = mece(T, 3, 0.3) * 6;
  const hojas = [0.25, 0.42, 0.58, 0.74].map((u, i) => ({ u, lado: i % 2 ? 1 : -1 }));
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 Q ${m} ${-H / 2} ${m * 1.5} ${-H}`} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q ${m} ${-H / 2} ${m * 1.5} ${-H}`} stroke="#6fbf3a" strokeWidth={18} fill="none" strokeLinecap="round" />
    {hojas.map(({ u, lado }, i) => g > u ? <path key={i} d={`M ${m * u} ${-H * u} q ${lado * 120} ${-60 + m} ${lado * 210} ${40 + m}`} stroke={KC.ink} strokeWidth={6} fill="#5cb83a" strokeLinejoin="round" transform={`scale(${kclamp((g - u) * 4, 0, 1)})`} style={{ transformOrigin:`${m * u}px ${-H * u}px` }} /> : null)}
    {g > 0.6 && <g transform={`translate(${16 + m} ${-H * 0.55}) rotate(18)`} opacity={kclamp((g - 0.6) * 4, 0, 1)}>
      <ellipse rx={26} ry={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      <path d="M -24 -10 Q -40 40 -10 76 M 24 -10 Q 40 40 10 76" stroke={KC.ink} strokeWidth={5} fill="#7cc46a" />
      <path d="M 0 -70 q -10 -30 -30 -40 M 0 -70 q 4 -34 18 -46" stroke="#b5651d" strokeWidth={5} fill="none" />
    </g>}
    {g > 0.9 && <g transform={`translate(${m * 1.5} ${-H})`} opacity={kclamp((g - 0.9) * 10, 0, 1)}>
      {[-50, -20, 10, 40].map((a, i) => <path key={i} d={`M 0 0 q ${a * 0.4} -40 ${a} -70`} stroke="#c9a04a" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    </g>}
  </g>;
}
function Frijol({ x, y, h = 520, g = 1 }) {
  const n = 24, pts = Array.from({ length: n }, (_, i) => { const u = i / (n - 1); return [x + Math.sin(u * 12) * 26, y - u * h * g]; });
  const d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const hoja = (px, py, lado, k) => <g key={k} transform={`translate(${px} ${py}) scale(${lado} 1)`}>
    {[[38, -10, -20], [70, 4, 10], [50, 26, 40]].map(([hx, hy, rot], j) => <ellipse key={j} cx={hx} cy={hy} rx={24} ry={15} transform={`rotate(${rot} ${hx} ${hy})`} fill="#3f9a2f" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d={d} stroke="#3f9a2f" strokeWidth={6} fill="none" strokeLinecap="round" />
    {pts.map((p, i) => (i % 5 === 3) ? hoja(p[0], p[1], i % 10 === 3 ? 1 : -1, i) : null)}
    {g > 0.7 && [[pts[9][0] + 20, pts[9][1] + 10], [pts[15][0] - 24, pts[15][1] + 12]].map(([vx, vy], i) => <path key={'v' + i} d={`M ${vx} ${vy} q 12 40 4 80 q -10 -40 -4 -80 Z`} fill="#8bc34a" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function Calabaza({ x, y, g = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${g})`}>
    <path d="M -140 -10 Q -170 -110 -60 -100 Q -20 -170 40 -110 Q 130 -130 120 -30" fill="#4caf3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 -100 L -40 -20 M 40 -110 L 20 -20" stroke="#2e7d32" strokeWidth={5} />
    <ellipse cx={40} cy={-36} rx={90} ry={50} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
    <path d="M 40 -86 L 40 14 M 0 -80 Q -10 -36 4 10 M 80 -80 Q 92 -36 76 10" stroke="rgba(0,0,0,.3)" strokeWidth={5} fill="none" />
  </g>;
}
// La Tierra con lluvia y escurrimiento café (erosión por lluvia, esquema).
function TierraErosion({ T, x, y, r = 230, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f8fd8" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.7} ${-r * 0.3} Q ${-r * 0.4} ${-r * 0.8} ${-r * 0.05} ${-r * 0.55} Q ${r * 0.1} ${-r * 0.2} ${-r * 0.3} ${r * 0.1} Q ${-r * 0.6} ${r * 0.2} ${-r * 0.7} ${-r * 0.3} Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${r * 0.2} ${-r * 0.1} Q ${r * 0.6} ${-r * 0.4} ${r * 0.75} ${0} Q ${r * 0.6} ${r * 0.55} ${r * 0.25} ${r * 0.6} Q ${r * 0.05} ${r * 0.3} ${r * 0.2} ${-r * 0.1} Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => { const a = -2.4 + i * 0.55, u = ((T * 0.7 + i * 0.17) % 1) * p, x0 = Math.cos(a) * r * 0.6, y0 = Math.sin(a) * r * 0.6 + 40;
      return <path key={i} d={`M ${x0} ${y0} q ${10} ${50 * u} ${-4} ${120 * u}`} stroke="#8a5a2b" strokeWidth={14} fill="none" strokeLinecap="round" opacity={0.9 * p} />; })}
  </g>;
}
// Íconos de especies (esquemas): bajo = viven en el suelo.
function Especie({ tipo, x, y, s = 1 }) {
  const c = { stroke: KC.ink, strokeWidth: 6 };
  const f = {
    hongo: <g><rect x={-14} y={-10} width={28} height={50} rx={8} fill="#f4efe4" {...c} /><path d="M -60 -6 Q -50 -70 0 -72 Q 50 -70 60 -6 Z" fill={KC.red} {...c} /><circle cx={-20} cy={-40} r={8} fill="#fff" /><circle cx={18} cy={-30} r={6} fill="#fff" /></g>,
    lombriz: <path d="M -60 10 q 20 -40 40 0 t 40 0 t 40 -10" fill="none" stroke="#e98a8a" strokeWidth={22} strokeLinecap="round" />,
    escarabajo: <g><ellipse rx={36} ry={46} fill="#3b5bdb" {...c} /><line x1={0} y1={-44} x2={0} y2={44} {...c} /><circle cy={-52} r={16} fill={KC.ink} />{[-20, 0, 20].map((yy, i) => <path key={i} d={`M -34 ${yy} l -24 ${-6} M 34 ${yy} l 24 ${-6}`} {...c} />)}</g>,
    bacteria: <g><rect x={-48} y={-20} width={96} height={40} rx={20} fill={KC.mint} {...c} /><circle cx={-60} cy={36} r={16} fill={KC.yellow} {...c} /></g>,
    acaro: <g transform="scale(.55)"><Acaro x={0} y={0} s={1} /></g>,
    planta: <g><path d="M 0 40 L 0 -40" {...c} stroke="#2e7d32" strokeWidth={10} /><ellipse cx={-26} cy={-30} rx={28} ry={14} fill="#5cb83a" {...c} /><ellipse cx={26} cy={-50} rx={28} ry={14} fill="#5cb83a" {...c} /></g>,
    ave: <g><ellipse rx={48} ry={30} fill={KC.yellow} {...c} /><circle cx={40} cy={-24} r={20} fill={KC.yellow} {...c} /><path d="M 58 -24 l 20 6 l -20 6 Z" fill={KC.orange} {...c} /><path d="M -10 -10 q -30 -40 -50 -10" fill={KC.orange} {...c} /></g>,
    pez: <g><path d="M -50 0 Q 0 -40 50 0 Q 0 40 -50 0 Z" fill={KC.cyan} {...c} /><path d="M -50 0 l -26 -24 l 0 48 Z" fill={KC.cyan} {...c} /><circle cx={28} cy={-6} r={6} fill={KC.ink} /></g>,
    mariposa: <g><ellipse cx={-30} cy={-14} rx={30} ry={24} fill={KC.pink} {...c} /><ellipse cx={30} cy={-14} rx={30} ry={24} fill={KC.pink} {...c} /><ellipse cx={-22} cy={22} rx={20} ry={16} fill={KC.lilac} {...c} /><ellipse cx={22} cy={22} rx={20} ry={16} fill={KC.lilac} {...c} /><rect x={-6} y={-30} width={12} height={64} rx={6} fill={KC.ink} /></g>,
    flor: <g><path d="M 0 40 L 0 -10" stroke="#2e7d32" strokeWidth={10} />{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-38} rx={14} ry={24} fill={KC.coral} {...c} transform={`rotate(${a} 0 -20)`} />)}<circle cy={-20} r={14} fill={KC.yellow} {...c} /></g>,
  }[tipo];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{f}</g>;
}
// Bloque de tierra (para el tercio degradado): gris y agrietado con deg 0..1.
function Bloque({ x, y, w = 280, deg = 0, seed = 2 }) {
  const col = mixHex(SU.tierra, '#9a958c', deg);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={w * 0.8} rx={18} fill={col} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(10 10)"><Granos w={w - 20} h={w * 0.8 - 20} n={14} seed={seed} color={mixHex(SU.grano, '#c9c4bb', deg)} tam={[8, 16]} o={0.7} /></g>
    {deg < 0.5 && Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${16 + i * 34} 2 q 4 -22 10 -36`} stroke={SU.pasto} strokeWidth={8} strokeLinecap="round" fill="none" opacity={1 - deg * 2} />)}
    {deg > 0.3 && <path d={`M ${w * 0.2} 0 L ${w * 0.35} ${w * 0.3} L ${w * 0.25} ${w * 0.5} L ${w * 0.4} ${w * 0.8} M ${w * 0.35} ${w * 0.3} L ${w * 0.7} ${w * 0.4} L ${w * 0.8} ${w * 0.8} M ${w * 0.7} ${w * 0.4} L ${w} ${w * 0.2}`} stroke={KC.ink} strokeWidth={7} fill="none" opacity={kclamp(deg * 2 - 0.6, 0, 1)} />}
  </g>;
}

const SU_HIFAS_MICRO = kRamasHifa(5, -40, 700, -0.15, 3);
const SU_ESPECIES = ['hongo', 'lombriz', 'escarabajo', 'bacteria', 'acaro', 'planta', 'ave', 'pez', 'mariposa', 'flor'];

function SueloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Microbios, Ac: CUES.Acaros, Lo: CUES.Lombrices, P: CUES.Pregunta, Si: CUES.Siglos, Es: CUES.Estudio,
    De: CUES.Degradado, Ep: CUES.Especies, Mil: CUES.Milpa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho y cierre: misma imagen (pala, tierra y cucharada)
  const portada = (t0, lluvia) => svg(<>
    <FranjaSuelo T={T} y0={1010} y1={1220} seed={5} />
    <Pala x={790} y={1060} p={kprog(T, t0, t0 + 0.5, kEase.sale)} l={kprog(T, t0 + 0.6, t0 + 1.2, kEase.suave)} />
    <Cuchara x={330} y={930} s={1} lleno={kprog(T, t0 + 0.9, t0 + 1.5, kEase.rebote)} />
    {lluvia > 0 && <NubeLluvia T={T} x={760} y={430} s={1} lluvia={lluvia} largo={420} />}
  </>);
  // re-gancho: columna de suelo con 1 cm marcado
  const cm = kprog(T, K.P + 0.4, K.P + 1.4, kEase.sale);
  // siglos: el centímetro se llena despacio y la lluvia lo barre
  const llena = kprog(T, K.Si + 0.2, K.Si + 2.6, kEase.suave), barre = kprog(T, K.Si + 2.9, K.Si + 3.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: una cucharada de tierra viva */}
      <Escena T={T} a={K.G} b={K.Mi}>
        <FondoLunares color={KC.yellow} />
        {portada(K.G - 0.2, 0)}
      </Escena>
      <Lupa T={T} at={K.G + 2.0} until={K.Mi - 0.3} x={330} y={560} r={190} fx={330} fy={880} tinte={KC.mint} etiqueta="AL MICROSCOPIO · esquema" interior={InteriorCucharada} />

      {/* 1 · bacterias y hongos se comen la hoja muerta (fondo oscuro, µm) */}
      <Escena T={T} a={K.Mi} b={K.Ac} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #2a1c12 0%, ${KC.dark} 75%)` }}></div>
        {svg(<>
          <g transform="translate(0 380)"><Granos w={KW} h={840} n={16} seed={12} color="#4a3220" tam={[40, 70]} /></g>
          <HojaMuerta x={560} y={800} s={1.5} come={kprog(T, K.Mi + 0.8, K.Mi + 4.6)} rot={-8} />
          <Hifas ramas={SU_HIFAS_MICRO} g={kprog(T, K.Mi - 0.3, K.Mi + 3.5, kEase.suave)} grosor={34} />
          {Array.from({ length: 14 }, (_, i) => { const a = T * (0.4 + (i % 5) * 0.05) + i * 2.1, cx = 560 + Math.cos(a) * (220 + (i % 4) * 40), cy = 800 + Math.sin(a * 1.2) * 130;
            return i % 3 === 0 ? <Coco key={i} x={cx} y={cy} r={24} /> : <Bacteria key={i} T={T} seed={i} x={cx} y={cy} rot={a * 30} s={0.55} color={i % 2 ? KC.mint : KC.yellow} />; })}
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.Mi + 1.6 + i * 0.25, u = kprog(T, t0, t0 + 2.4); if (u <= 0) return null;
            return <circle key={i} cx={480 + (i % 6) * 40 + Math.sin(T * 2 + i) * 14} cy={790 - u * 300} r={13} fill={[KC.cyan, KC.pink, KC.gold2][i % 3]} stroke={KC.ink} strokeWidth={4} opacity={1 - u * 0.4} />; })}
        </>)}
        <EscalaFija texto="10 µm (esquema)" largo={290} y={1440} color={KC.texto} />
      </Escena>
      <Chip T={T} at={K.Mi + 0.6} until={K.Ac - 0.3} texto="hongos (hifas)" x={300} y={420} tam={30} borde="#f2e7c9" />
      <Chip T={T} at={K.Mi + 1.2} until={K.Ac - 0.3} texto="bacterias" x={280} y={1100} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.Mi + 1.8} until={K.Ac - 0.3} x={860} y={980} texto="hoja muerta" lado="izq" color={KC.texto} />
      <Chip T={T} at={K.Mi + 2.6} until={K.Ac - 0.3} texto="→ nutrientes" x={760} y={1100} tam={30} borde={KC.cyan} />

      {/* 2 · ácaros y colémbolos (escala 1 mm) */}
      <Escena T={T} a={K.Ac} b={K.Lo} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #2a1c12 0%, ${KC.dark} 75%)` }}></div>
        {svg(<>
          <g transform="translate(0 420)"><Granos w={KW} h={800} n={12} seed={21} color="#4a3220" tam={[30, 60]} /></g>
          <HojaMuerta x={540} y={930} s={0.9} come={0.6 + 0.4 * kprog(T, K.Ac, K.Lo)} rot={12} />
          <Acaro x={klerp(250, 380, kprog(T, K.Ac, K.Lo))} y={780} s={1.3} T={T} rot={20} pata="#e9d6a8" />
          <Colembolo x={600} y={1010 - 260 * Math.sin(Math.PI * kprog(T, K.Ac + 1.6, K.Ac + 2.4))} s={1.1} T={T} salto={kprog(T, K.Ac + 1.5, K.Ac + 1.7)} pata="#e9d6a8" />
        </>)}
        <EscalaFija texto="1 mm (esquema)" largo={300} y={1440} color={KC.texto} />
      </Escena>
      <Etq T={T} at={K.Ac + 0.3} until={K.Lo - 0.2} x={150} y={560} texto="ácaro (8 patas)" color={KC.texto} />
      <Etq T={T} at={K.Ac + 0.7} until={K.Lo - 0.2} x={1040} y={1160} texto="colémbolo (6 patas)" lado="izq" color={KC.texto} />

      {/* 3 · lombrices y grumos (escala 1 cm) */}
      <Escena T={T} a={K.Lo} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <FranjaSuelo T={T} y0={560} y1={1220} seed={8} />
          <path d={`M -40 900 Q 300 ${880 + Math.sin(1) * 20} ${klerp(100, 1000, kprog(T, K.Lo, K.P))} 900`} stroke={SU.tierraOsc} strokeWidth={70} fill="none" strokeLinecap="round" opacity=".75" />
          {Array.from({ length: 7 }, (_, i) => { const xg = 60 + i * 120, t0 = K.Lo + 0.3 + i * 0.35; return <Grumo key={i} x={xg} y={1060 + (i % 2) * 60} r={44} seed={i + 3} o={kprog(T, t0, t0 + 0.3)} s={klerp(0.6, 1, kprog(T, t0, t0 + 0.4, kEase.rebote))} />; })}
          <Lombriz x={0} y={900} largo={640} T={T} avance={klerp(380, 1060, kprog(T, K.Lo - 0.5, K.P + 0.4))} />
          <NubeLluvia T={T} x={300} y={330} s={0.9} lluvia={kprog(T, K.Lo + 1.6, K.Lo + 2.2)} largo={200} />
        </>)}
        <EscalaFija texto="1 cm" largo={100} y={1440} color={KC.ink} />
      </Escena>
      <Etq T={T} at={K.Lo + 0.6} until={K.P - 0.2} x={760} y={780} texto="clitelo" color={KC.ink} lado="izq" />
      <Etq T={T} at={K.Lo + 1.2} until={K.P - 0.2} x={760} y={1150} texto="grumos" color={KC.texto} />

      {/* 4 · re-gancho: ¿cuánto tarda 1 cm? */}
      <Escena T={T} a={K.P} b={K.Si} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <rect x={70} y={640} width={200} height={540} rx={14} fill={SU.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={70} y={640} width={200} height={110} rx={14} fill="#3a2414" stroke={KC.ink} strokeWidth={8} />
          <g transform="translate(80 660)"><Granos w={180} h={500} n={22} seed={31} tam={[6, 14]} o={0.7} /></g>
          <rect x={60} y={1080 - 100 * cm} width={220} height={100 * cm} fill={KC.yellow} opacity=".55" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 6 }, (_, i) => <line key={i} x1={270} y1={680 + i * 100} x2={300} y2={680 + i * 100} stroke={KC.ink} strokeWidth={6} />)}
          <text x={312} y={1048} style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink} opacity={cm}>1 cm</text>
          <text x={420} y={940} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 420 800)`}>?</text>
        </>)}
      </Escena>

      {/* 5 · cientos de años, hasta mil… y se pierde en minutos */}
      <Escena T={T} a={K.Si} b={K.Es}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={300} y={760} width={480} height={360} rx={20} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={8} />
          <rect x={312} y={1108 - 100 * llena * (1 - barre)} width={456} height={100 * llena * (1 - barre)} fill={SU.tierra} />
          <line x1={300} y1={1008} x2={780} y2={1008} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />
          <text x={800} y={1020} style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>1 cm</text>
          {barre > 0 && <NubeLluvia T={T} x={540} y={560} s={1.1} lluvia={1} largo={500} />}
          {barre > 0 && Array.from({ length: 6 }, (_, i) => <circle key={i} cx={klerp(540, 980 + i * 30, barre)} cy={1080 + i * 6} r={14} fill={SU.tierra} stroke={KC.ink} strokeWidth={4} opacity={1 - barre * 0.5} />)}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <NumeroGigante T={T} at={K.Si + 0.2} until={K.Si + 2.7} valor={1000} desde={1000} dur={0.1} sufijo=" años" etiqueta="cientos de años… hasta" x={400} y={500} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.Si + 3.0} until={K.Es - 0.2} texto="se puede perder en minutos" x={540} y={640} tam={36} borde={KC.red} />

      {/* 6 · el estudio: erosión por lluvia en 2012 */}
      <Escena T={T} a={K.Es} b={K.De}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <TierraErosion T={T} x={600} y={960} r={230} p={kprog(T, K.Es + 3.0, K.Es + 4.0)} />
          <NubeLluvia T={T} x={600} y={640} s={0.8} lluvia={kprog(T, K.Es + 2.8, K.Es + 3.4)} largo={140} />
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2017" quien="Basilea (Suiza) e Ispra (Italia)" revista="Borrelli et al. · Nature Communications" y={760} />
      <NumeroGigante T={T} at={K.Es + 3.6} until={K.De - 0.2} valor={35.9} dec={1} dur={1.2} etiqueta="2012 · erosión por lluvia" x={380} y={470} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.Es + 4.2} until={K.De - 0.2} texto="mil millones de toneladas" x={380} y={640} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.Es + 4.6} until={K.De - 0.2} texto="estimación con un modelo · Borrelli et al. 2017" x={540} y={1440} tam={28} borde={KC.ink} />

      {/* 7 · un tercio de las tierras degradado (FAO 2015) */}
      <Escena T={T} a={K.De} b={K.Ep}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          {[0, 1, 2].map((i) => <Bloque key={i} x={60 + i * 330} y={820} w={300} deg={i === 2 ? kprog(T, K.De + 1.0, K.De + 2.4) : 0} seed={i + 4} />)}
          <text x={540} y={1150} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.De + 2.2, K.De + 2.8)}>erosión · sal · compactación · acidez · contaminación</text>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.De + 0.3} until={K.Ep - 0.2} valor={33} dur={1.0} sufijo=" %" etiqueta="de las tierras, degradadas" x={340} y={560} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.De + 1.6} until={K.Ep - 0.2} texto="FAO 2015 · de moderada a muy degradada" x={540} y={1440} tam={28} borde={KC.ink} />

      {/* 8 · cerca de 6 de cada 10 especies viven en el suelo (estudio suizo 2023) */}
      <Escena T={T} a={K.Ep} b={K.Mil}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <FranjaSuelo T={T} y0={900} y1={1220} seed={14} />
          {SU_ESPECIES.map((tipo, i) => { const baja = i < 6, t0 = K.Ep + 2.6 + i * 0.22, u = baja ? kprog(T, t0, t0 + 0.6, kEase.suave) : 0;
            const ap = kprog(T, K.Ep + 1.9 + i * 0.05, K.Ep + 2.3 + i * 0.05);
            return <g key={tipo} opacity={ap}><Especie tipo={tipo} x={baja ? 120 + i * 168 : 300 + (i - 6) * 170} y={baja ? klerp(640, 1010 + (i % 2) * 110, u) : 780} s={0.9} /></g>; })}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Ep + 0.2} until={K.Ep + 2.4} anio="2023" quien="Zúrich (Suiza)" revista="Anthony et al. · PNAS" y={700} />
      <Chip T={T} at={K.Ep + 3.6} until={K.Mil - 0.2} texto="≈ 59 % (± 15 %) · estimación" x={600} y={470} tam={34} borde={KC.ink} />

      {/* 9 · la milpa: 95 % de la comida sale del suelo; nódulos en la raíz del frijol */}
      <Escena T={T} a={K.Mil} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <FranjaSuelo T={T} y0={1040} y1={1220} seed={22} />
          <path d="M 560 1046 q -10 60 -40 110 M 560 1046 q 20 50 60 100" stroke={SU.raiz} strokeWidth={10} fill="none" />
          <Maiz x={560} y={1046} h={640} g={kprog(T, K.Mil - 0.3, K.Mil + 1.6, kEase.sale)} T={T} />
          <Frijol x={600} y={1046} h={520} g={kprog(T, K.Mil + 0.2, K.Mil + 2.0, kEase.sale)} />
          <Calabaza x={860} y={1040} g={kprog(T, K.Mil + 0.4, K.Mil + 1.4, kEase.rebote)} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Mil + 0.3} until={K.Mil + 3.4} valor={95} dur={1.0} sufijo=" %" etiqueta="de nuestra comida sale del suelo" x={330} y={520} tam={190} color={KC.yellow} />
      <Lupa T={T} at={K.Mil + 3.6} until={K.C - 0.3} x={290} y={640} r={200} fx={600} fy={1140} tinte={KC.pink} etiqueta="AL MICROSCOPIO · nódulos" interior={InteriorNodulo} />
      <Etq T={T} at={K.Mil + 4.4} until={K.C - 0.3} x={150} y={400} texto="Rhizobium" it color={KC.ink} />

      {/* 10 · cierre: regreso a la cucharada, ahora con lluvia encima */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {portada(K.C - 0.6, kprog(T, K.C + 2.4, K.C + 3.2))}
      </Escena>
      <Lupa T={T} at={K.C + 0.8} until={K.Ou - 0.1} x={330} y={560} r={190} fx={330} fy={880} tinte={KC.mint} etiqueta="AL MICROSCOPIO · esquema" interior={InteriorCucharada} />

      {/* datos del gancho */}
      <Chip T={T} at={K.G + 0.9} until={K.Mi - 0.3} texto="1 cucharada de suelo" x={330} y={1110} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.Mi - 0.3} texto="más seres vivos que personas en la Tierra" x={540} y={1440} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.C + 3.4} until={K.Ou - 0.1} texto="no está muerta: está viva" x={540} y={1440} tam={36} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="Esta tierra *no está muerta.*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.Ac - 0.1} texto="Bacterias y hongos: *se comen lo muerto.*" />
      <Subtitulo T={T} idx={2} at={K.Ac + 0.1} until={K.Lo - 0.1} texto="Ácaros y *colémbolos.*" />
      <Subtitulo T={T} idx={3} at={K.Lo + 0.1} until={K.P - 0.1} texto="Lombrices: *grumos que aguantan.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Si - 0.1} texto="¿Cuánto tarda *1 centímetro?*" />
      <Subtitulo T={T} idx={5} at={K.Si + 0.1} until={K.Es - 0.1} texto="Cientos de años, hasta mil. *Se pierde en minutos.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.De - 0.1} texto="2012: *36 mil millones de toneladas.*" />
      <Subtitulo T={T} idx={7} at={K.De + 0.1} until={K.Ep - 0.1} texto="FAO 2015: *un tercio degradado.*" />
      <Subtitulo T={T} idx={8} at={K.Ep + 0.1} until={K.Mil - 0.1} texto="Cerca de *6 de cada 10 especies.*" />
      <Subtitulo T={T} idx={9} at={K.Mil + 0.1} until={K.C - 0.1} texto="95 % de tu comida: *del suelo.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No está muerta: *está viva.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Microbios + 2.4, CUES.Acaros + 1.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Siglos + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.2, CUES.Estudio + 7.6, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Degradado + 1.2, CUES.Degradado + 4.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Especies + 2.6, CUES.Especies + 5.8, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Milpa + 3.8, CUES.Milpa + 7.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="23" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SueloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SueloShot /></CompositionStage></div>;
}
window.SueloApp = SueloApp;
