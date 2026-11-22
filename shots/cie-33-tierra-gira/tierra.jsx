// Shot Científico #33 · Ahora mismo vas a más de 1,500 km/h — NARRADO (N2 "El número" + mapa del globo).
// Datos: NASA NSSDC Earth Fact Sheet (radio y rotación) + cálculo con cos(latitud); Almanac; Linda Hall (Foucault 1851). Ver guion.md y verificacion.md.
const OCEANO = '#2f7df6', TIERRA = '#7bd36b', TIERRA2 = '#ffe9a8', ORO = KC.gold2;

/* ---------- GLOBO (proyección ortográfica; continentes esquemáticos) ---------- */
const G_NA = [[-125,48],[-124,40],[-117.1,32.5],[-111,31.3],[-106.5,31.8],[-104.5,29.6],[-101,29.4],[-97.5,25.9],[-94,29.5],[-90,29.5],[-84,30],[-82.5,27],[-81,25.2],[-80,27],[-81,31],[-76,35],[-74,40],[-70,42],[-66,44.5],[-60,46.5],[-56,51],[-60,55],[-64,60],[-72,62],[-78,62],[-82,66],[-90,68],[-100,69],[-110,70],[-120,70],[-130,70],[-142,70],[-152,71],[-160,70.5],[-166,68],[-165,62],[-158,58],[-152,58],[-140,59.5],[-134,57],[-130,54],[-125,48]];
const G_BAJA = [[-117.1,32.5],[-116,30.4],[-114.2,28],[-112.1,24.8],[-110,22.9],[-109.4,23.2],[-111.4,25.8],[-112.9,28.5],[-114.8,31.6]];
const G_SA = [[-77.4,7.6],[-75,10.8],[-72,12],[-66,10.6],[-62,10.5],[-57,6],[-52,5],[-50,0],[-44,-2.5],[-35,-6],[-37,-11],[-39,-14],[-41,-22],[-48,-26],[-53,-34],[-58,-38],[-62,-39],[-65,-42],[-67,-46],[-68,-52],[-72,-53],[-74,-50],[-73.5,-42],[-72,-35],[-71.5,-28],[-70.5,-18],[-76,-14],[-79,-8],[-81,-5],[-80,-1],[-78.8,1.5],[-77.4,7.6]];
const G_AF = [[-17,15],[-16,21],[-13,27],[-9.5,30],[-6,35.8],[0,36],[10,37],[11,33],[20,31],[25,31.5],[32,31],[34,28],[39,21],[43,12],[51,11.5],[48,5],[41,-2],[40,-15],[35,-24],[32.5,-28],[28,-33],[20,-35],[18,-32],[14,-24],[12,-17],[13,-8],[9,-1],[9,4],[4,6],[-4,5],[-8,4.5],[-13,8],[-17,15]];
const G_EU = [[-9.5,37],[-9,43],[-2,43.5],[-1.5,46],[-4.5,48.5],[2,51],[8,54],[9,57],[12,56],[20,55],[23,60],[21,63],[25,66],[18,69.5],[28,71],[40,68],[60,70],[60,45],[48,40],[40,41],[29,41],[26,40],[22,37],[21,40],[19,42],[13,45.5],[16,41.5],[16,38],[12,42],[9,44],[3,43],[-1,37],[-5.5,36],[-9.5,37]];
const G_AS = [[60,70],[80,73],[100,78],[115,74],[140,73],[160,70],[180,68],[178,64],[163,60],[155,59],[142,59],[140,52],[135,43],[129,38],[126,35],[121,31],[121,25],[114,22],[107,21],[105,10],[100,13],[98,16],[92,21],[88,22],[80,15],[77,8],[73,17],[70,22],[66,25],[57,25.5],[52,27],[48,30],[48,40],[60,45],[60,70]];
const G_AU = [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-28],[150,-37],[140,-38],[132,-32],[115,-34],[114,-22]];
const G_TIERRAS = [[G_NA, TIERRA], [G_SA, TIERRA], [G_AF, TIERRA], [G_EU, TIERRA], [G_AS, TIERRA], [G_AU, TIERRA], [G_BAJA, TIERRA2], [MX_CONT, TIERRA2], [CA_CONT, '#bfe3b4']];
function gProy(lon, lat, lon0, lat0) {
  const d = Math.PI / 180, dl = (lon - lon0) * d, p = lat * d, p0 = lat0 * d;
  return [Math.cos(p) * Math.sin(dl), -(Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(dl)), Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(dl)];
}
function gDensa(pts, paso = 2) {
  const o = [];
  for (let i = 0; i < pts.length; i++) { const [a, b] = pts[i], [c, e] = pts[(i + 1) % pts.length], n = Math.max(1, Math.ceil(Math.hypot(c - a, e - b) / paso));
    for (let k = 0; k < n; k++) o.push([klerp(a, c, k / n), klerp(b, e, k / n)]); }
  return o;
}
const G_DENSAS = G_TIERRAS.map(([p, c]) => [gDensa(p), c]);
function gPoli(pts, lon0, lat0, R) {
  let vis = 0;
  const s = pts.map(([lo, la]) => { const [x, y, z] = gProy(lo, la, lon0, lat0); if (z > 0) { vis++; return [x * R, y * R]; } const h = Math.hypot(x, y) || 1; return [x / h * R, y / h * R]; });
  return vis ? 'M ' + s.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z' : null;
}
function gLinea(pts, lon0, lat0, R) {   // solo la parte visible
  let d = '', pluma = false;
  pts.forEach(([lo, la]) => { const [x, y, z] = gProy(lo, la, lon0, lat0); if (z > 0) { d += (pluma ? ' L ' : ' M ') + (x * R).toFixed(1) + ' ' + (y * R).toFixed(1); pluma = true; } else pluma = false; });
  return d;
}
const gParalelo = (lat) => Array.from({ length: 121 }, (_, i) => [-180 + i * 3, lat]);
const gMeridiano = (lon) => Array.from({ length: 61 }, (_, i) => [lon, -90 + i * 3]);
// Globo en (x, y) con radio R. lon0/lat0 = punto del centro. ecuador 0..1 = ecuador dorado. children(proy) para pines.
function Globo({ x, y, R, lon0, lat0 = 18, ecuador = 0, s = 1, id = 'g', children }) {
  const pr = (lo, la) => { const [a, b, z] = gProy(lo, la, lon0, lat0); return [a * R, b * R, z]; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><radialGradient id={id + 'luz'} cx="35%" cy="30%" r="75%"><stop offset="0%" stopColor="#fff" stopOpacity=".35" /><stop offset="60%" stopColor="#fff" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity=".35" /></radialGradient>
      <clipPath id={id + 'clip'}><circle r={R} /></clipPath></defs>
    <circle r={R + 18} fill="rgba(255,255,255,.18)" />
    <circle r={R} fill={OCEANO} stroke={KC.ink} strokeWidth={10} />
    <g clipPath={`url(#${id}clip)`}>
      {[-60, -30, 30, 60].map((la) => <path key={'p' + la} d={gLinea(gParalelo(la), lon0, lat0, R)} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={3} />)}
      {Array.from({ length: 12 }, (_, i) => <path key={'m' + i} d={gLinea(gMeridiano(-180 + i * 30), lon0, lat0, R)} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={3} />)}
      {G_DENSAS.map(([p, c], i) => { const d = gPoli(p, lon0, lat0, R); return d && <path key={i} d={d} fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />; })}
      <path d={gLinea(gParalelo(0), lon0, lat0, R)} fill="none" stroke={ORO} strokeWidth={4 + 8 * ecuador} strokeDasharray={ecuador > 0.05 ? 'none' : '14 12'} opacity={0.45 + 0.55 * ecuador} />
      <circle r={R} fill={`url(#${id}luz)`} />
    </g>
    {children && children(pr)}
  </g>;
}
// Pin redondo con halo. (x, y) ya proyectados.
function PinG({ x, y, color = KC.yellow, r = 16, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r + 12 + 5 * Math.sin(T * 6)} fill={color} opacity=".35" /><circle r={r} fill={color} stroke={KC.ink} strokeWidth={6} /></g>;
}
// Flecha curva del giro (de oeste a este, al frente del globo).
function FlechaGiro({ R, p = 1, T = 0, color = KC.yellow }) {
  if (p <= 0.01) return null;
  const pts = []; const n = 40, a0 = Math.PI * 0.92, a1 = klerp(a0, Math.PI * 0.08, p);
  for (let i = 0; i <= n; i++) { const a = klerp(a0, a1, i / n); pts.push([Math.cos(a) * R * 1.18, Math.sin(a) * R * 0.32 + R * 0.25]); }
  const [ex, ey] = pts[n], [px, py] = pts[n - 1], ang = Math.atan2(ey - py, ex - px) * 180 / Math.PI;
  const d = 'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  return <g>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={16} strokeLinecap="round" strokeDasharray="40 18" strokeDashoffset={-T * 90} />
    <path d="M 0 0 L -40 -26 L -40 26 Z" transform={`translate(${ex} ${ey}) rotate(${ang})`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Etiqueta en caja (dentro de <svg>) con línea al punto.
function CajaG({ T, at, until = 1e9, x, y, l1, l2, px, py, color = KC.yellow, ancho }) {
  const e = kprog(T, at, at + 0.4, kEase.sale) * (1 - kprog(T, until, until + 0.3)); if (e <= 0) return null;
  const w = ancho || Math.max(l1.length * 25, l2 ? l2.length * 23 : 0) + 44;
  return <g opacity={e}>
    {px != null && <line x1={px} y1={py} x2={x + w / 2} y2={y + 58} stroke={KC.ink} strokeWidth={6} />}
    <g transform={`translate(0 ${(1 - e) * 20})`}>
      <rect x={x} y={y} width={w} height={l2 ? 120 : 70} rx={18} fill="rgba(14,15,18,.9)" stroke={color} strokeWidth={5} />
      <text x={x + 22} y={y + 50} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{l1}</text>
      {l2 && <text x={x + 22} y={y + 100} style={{ font:`700 38px ${KF.mono}` }} fill={color}>{l2}</text>}
    </g>
  </g>;
}

/* ---------- CUARTO: persona sentada y velocímetro ---------- */
function PersonaSentada({ x, y, s = 1, T = 0, cara = 'normal', color = KC.cyan }) {
  const cy = -330, parp = (T % 3.7) < 0.12 ? 0.15 : 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-360} width={300} height={300} rx={30} fill="#8a5a3a" stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-70} width={340} height={60} rx={18} fill="#a8704a" stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-10} width={30} height={210} fill="#6b4329" stroke={KC.ink} strokeWidth={7} /><rect x={120} y={-10} width={30} height={210} fill="#6b4329" stroke={KC.ink} strokeWidth={7} />
    <rect x={-100} y={-250} width={200} height={200} rx={50} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-230} width={55} height={170} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} /><rect x={95} y={-230} width={55} height={170} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-95} y={-75} width={85} height={70} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} /><rect x={10} y={-75} width={85} height={70} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={-20} width={60} height={200} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} /><rect x={30} y={-20} width={60} height={200} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-70} cy={190} rx={50} ry={22} fill={KC.ink} /><ellipse cx={70} cy={190} rx={50} ry={22} fill={KC.ink} />
    <circle cx={0} cy={cy} r={78} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -78 ${cy - 10} Q -76 ${cy - 95} 0 ${cy - 92} Q 76 ${cy - 95} 78 ${cy - 10} Q 36 ${cy - 50} -78 ${cy - 10} Z`} fill={CPELO} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-28} cy={cy + 4} rx={9} ry={9 * parp} fill={KC.ink} /><ellipse cx={28} cy={cy + 4} rx={9} ry={9 * parp} fill={KC.ink} />
    <path d={cara === 'sonrie' ? `M -26 ${cy + 32} Q 0 ${cy + 54} 26 ${cy + 32}` : `M -22 ${cy + 40} L 22 ${cy + 40}`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
// Velocímetro sin números (la cifra va en el NumeroGigante). v 0..1.
function Velocimetro({ x, y, r = 170, v = 0, T = 0 }) {
  const ang = klerp(-120, 120, kclamp(v, 0, 1)) + Math.sin(T * 31) * 0.8 * v;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r - 24} 40 A ${r + 24} ${r + 24} 0 1 1 ${r + 24} 40 Z`} fill="#22252e" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 13 }, (_, i) => { const a = (-120 + i * 20) * Math.PI / 180, k = i > 9;
      return <line key={i} x1={Math.sin(a) * (r - 30)} y1={-Math.cos(a) * (r - 30)} x2={Math.sin(a) * (r - 4)} y2={-Math.cos(a) * (r - 4)} stroke={k ? KC.red : '#fff'} strokeWidth={i % 2 ? 6 : 10} strokeLinecap="round" />; })}
    <path d={`M ${Math.sin(60 * Math.PI / 180) * (r - 12)} ${-Math.cos(60 * Math.PI / 180) * (r - 12)} A ${r - 12} ${r - 12} 0 0 1 ${Math.sin(120 * Math.PI / 180) * (r - 12)} ${-Math.cos(120 * Math.PI / 180) * (r - 12)}`} fill="none" stroke={KC.red} strokeWidth={8} opacity=".6" />
    <g transform={`rotate(${ang})`}><path d={`M -12 0 L 0 ${-r + 26} L 12 0 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></g>
    <circle r={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={80} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff">km/h</text>
  </g>;
}
// Reloj sin números: la aguja da vueltas y el arco se llena (v en vueltas, 0..1).
function Reloj({ x, y, r = 80, v = 0, color = KC.gold2 }) {
  const a = kclamp(v, 0, 0.999) * Math.PI * 2, ex = Math.sin(a) * r, ey = -Math.cos(a) * r;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 10} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {v > 0.005 && <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={color} opacity=".85" />}
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 4} x2={0} y2={-r + 18} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={ex * 0.85} y2={ey * 0.85} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <circle r={10} fill={KC.ink} />
  </g>;
}
// El cuarto del gancho (y del cierre). curvo 0..1: el piso se vuelve la Tierra que gira.
function Cuarto({ T, curvo = 0, v = 1 }) {
  return <g>
    <rect x={0} y={1140} width={KW} height={800} fill="#c98a5a" opacity={1 - curvo} />
    <line x1={0} y1={1140} x2={KW} y2={1140} stroke={KC.ink} strokeWidth={8} opacity={1 - curvo} />
    {curvo > 0 && <g opacity={curvo}><Globo x={540} y={1140 + 1300} R={1300} lon0={-100 - 40 * T / 61.5} lat0={-30} id="cuarto" /></g>}
    <PersonaSentada x={330} y={950} s={0.95} T={T} cara={curvo > 0.5 ? 'sonrie' : 'normal'} />
    <Velocimetro x={800} y={1000} r={150} v={v} T={T} />
  </g>;
}

/* ---------- GRÁFICAS Y ESCENAS ---------- */
// Gráfica de línea que se dibuja (p 0..1). f(u) → 0..1. (x, y) = esquina sup. izq.
function Grafica({ x, y, w = 820, h = 250, f, p = 1, color = KC.yellow, titulo }) {
  const n = 120, k = Math.max(1, Math.round(n * p)), pts = [];
  for (let i = 0; i <= k; i++) { const u = i / n; pts.push(`${(x + u * w).toFixed(1)},${(y + h - f(u) * h).toFixed(1)}`); }
  return <g>
    <rect x={x - 30} y={y - 70} width={w + 60} height={h + 110} rx={26} fill="rgba(14,15,18,.86)" stroke={KC.ink} strokeWidth={7} />
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="rgba(255,255,255,.5)" strokeWidth={4} />
    <line x1={x} y1={y - 10} x2={x} y2={y + h} stroke="rgba(255,255,255,.5)" strokeWidth={4} />
    <text x={x + 14} y={y - 24} style={{ font:`900 38px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={12} strokeLinejoin="round" strokeLinecap="round" />
  </g>;
}
// Avión por dentro: ventanilla con nubes que pasan y un vaso de agua quieto.
function AvionDentro({ T }) {
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill="#e8e4f0" />
    <path d="M 0 300 Q 540 220 1080 300 L 1080 1300 L 0 1300 Z" fill="#f4f1ea" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(560 640)">
      <rect x={-200} y={-250} width={400} height={500} rx={190} fill="#cfd6e0" stroke={KC.ink} strokeWidth={12} />
      <clipPath id="vent"><rect x={-160} y={-210} width={320} height={420} rx={150} /></clipPath>
      <g clipPath="url(#vent)">
        <rect x={-170} y={-220} width={340} height={440} fill="#7cc8ff" />
        {Array.from({ length: 5 }, (_, i) => { const xx = 260 - ((T * 420 + i * 170) % 850); return <Nube key={i} x={xx} y={-120 + (i % 3) * 110} s={0.45} />; })}
        <rect x={-170} y={150} width={340} height={80} fill="#5fae5a" />
      </g>
      <rect x={-160} y={-210} width={320} height={420} rx={150} fill="none" stroke={KC.ink} strokeWidth={8} />
    </g>
    <rect x={120} y={1010} width={840} height={40} rx={14} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
    <rect x={160} y={1050} width={30} height={160} fill="#6b7080" stroke={KC.ink} strokeWidth={6} />
    <rect x={890} y={1050} width={30} height={160} fill="#6b7080" stroke={KC.ink} strokeWidth={6} />
    <g transform="translate(540 1010)">
      <path d="M -70 -220 L -56 0 L 56 0 L 70 -220 Z" fill="rgba(200,235,255,.55)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -63 -130 L -56 0 L 56 0 L 63 -130 Z" fill="#3fa9f5" opacity=".85" />
      <line x1={-63} y1={-130} x2={63} y2={-130} stroke="#bfe6ff" strokeWidth={6} />
      <path d="M -50 -200 L -42 -20" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
    </g>
  </g>;
}
// Vista desde arriba del polo norte: un punto que viaja y su flecha de dirección que gira despacio.
function PoloArriba({ T, a0, x = 540, y = 800, R = 330 }) {
  const lon0 = -100 - (T - a0) * 22, pr = (lo, la) => { const [a, b] = gProy(lo, la, lon0, 90); return [x + a * R, y + b * R]; };
  const [px, py] = pr(-99.13, 19.43), ang = Math.atan2(py - y, px - x) + Math.PI / 2;   // tangente (giro antihorario)
  const L = 170, ex = px - Math.cos(ang) * L, ey = py - Math.sin(ang) * L;
  return <g>
    <Globo x={x} y={y} R={R} lon0={lon0} lat0={90} id="polo" />
    <path d={`M ${x} ${y} m 0 ${-R - 50} a ${R + 50} ${R + 50} 0 0 0 ${-(R + 50)} ${R + 50}`} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M ${x} ${y} m 0 ${-R - 50} a ${R + 50} ${R + 50} 0 0 0 ${-(R + 50)} ${R + 50}`} fill="none" stroke={KC.yellow} strokeWidth={12} strokeLinecap="round" strokeDasharray="30 16" strokeDashoffset={T * 40} />
    <path d="M 0 0 L -36 -24 L -36 24 Z" transform={`translate(${x - R - 50} ${y + 6}) rotate(90)`} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <FlechaRecta x1={px} y1={py} x2={ex} y2={ey} color={KC.coral} grosor={14} punta={34} />
    <PinG x={px} y={py} color={KC.orange} T={T} />
  </g>;
}
// Péndulo de Foucault: el plano de oscilación queda fijo y el piso (con su círculo de marcas) gira debajo.
function Pendulo({ T, a0 }) {
  const t = T - a0, giro = t * 14, sw = Math.sin(t * 2.4), bx = 540 + sw * 330, by = 1030 - (1 - Math.cos(sw * 0.5)) * 90;
  return <g>
    <rect x={0} y={0} width={KW} height={300} fill="#e9dcc4" />
    <path d="M 340 300 Q 540 120 740 300 Z" fill="#d8c6a6" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(540 1060)">
      <ellipse rx={420} ry={130} fill="#c9b48e" stroke={KC.ink} strokeWidth={9} />
      <ellipse rx={350} ry={104} fill="#e8d7b2" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 24 }, (_, i) => { const a = (i * 15 + giro) * Math.PI / 180, xx = Math.cos(a) * 330, yy = Math.sin(a) * 98;
        return <rect key={i} x={xx - 8} y={yy - 30} width={16} height={30} rx={4} fill={i % 6 === 0 ? KC.red : '#7a5a3a'} stroke={KC.ink} strokeWidth={3} />; })}
      <g transform={`rotate(${giro * 0.3}) scale(1 0.31)`}><line x1={-340} y1={0} x2={340} y2={0} stroke={KC.red} strokeWidth={10} strokeDasharray="20 14" opacity=".55" /></g>
    </g>
    <line x1={340} y1={1060} x2={740} y2={1060} stroke={ORO} strokeWidth={8} strokeDasharray="4 14" strokeLinecap="round" />
    <line x1={540} y1={300} x2={bx} y2={by - 50} stroke={KC.ink} strokeWidth={5} />
    <circle cx={540} cy={300} r={12} fill={KC.ink} />
    <ellipse cx={bx} cy={1078} rx={50} ry={14} fill="rgba(0,0,0,.25)" />
    <g transform={`translate(${bx} ${by})`}><circle r={54} fill={ORO} stroke={KC.ink} strokeWidth={8} /><circle cx={-16} cy={-18} r={14} fill="#fff" opacity=".6" /><path d="M -10 52 L 0 76 L 10 52 Z" fill={KC.ink} /></g>
  </g>;
}

// Mapa de México (cerca del ecuador)
const MAPA = { x: 170, y: 400, ancho: 900 };
const mpt = (lon, lat) => { const [a, b] = mxProy(lon, lat), k = MAPA.ancho / 1000; return [MAPA.x + a * k, MAPA.y + b * k]; };
const GDL = mpt(-103.35, 20.67), CDMX = mpt(-99.13, 19.43), YEC = mpt(-100, 0)[1];

function Tierra() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const vGancho = kprog(T, 0.05, 0.8, kEase.sale);
  const lonG = -70 - 8 * (T - K.Giro);
  const zoomOut = klerp(3.2, 1, kprog(T, K.Giro - 0.45, K.Giro + 1.1, kEase.suave));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: sentado, quieto… y el velocímetro dice otra cosa */}
      <Escena T={T} a={K.Gancho} b={K.Giro} zoom={-0.08}>
        <FondoLunares color={KC.pink} />
        <Lienzo><Cuarto T={T} v={vGancho} /></Lienzo>
        <NumeroGigante T={T} at={K.Gancho + 0.6} until={K.Giro - 0.1} valor={1500} desde={1500} dur={0.1} prefijo="> " sufijo=" km/h" etiqueta="en el centro de México" x={330} y={420} tam={120} />
        <Chip T={T} at={K.Gancho + 4.2} until={K.Giro - 0.1} texto="…y no lo sientes" x={770} y={640} tam={44} borde={KC.yellow} />
      </Escena>
      {/* 1–2 · la cámara se aleja: la Tierra gira; el ecuador */}
      <Escena T={T} a={K.Giro} b={K.Mexico} fondo={KC.violet} zoom={0.03}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} />
          <Globo x={540} y={820} R={330} s={zoomOut} lon0={lonG} lat0={18} ecuador={kprog(T, K.Ecuador, K.Ecuador + 0.8)} id="g1">
            {(pr) => { const [cx, cy, cz] = pr(-99.13, 19.43), [ex, ey, ez] = pr(-78.5, -0.2);
              const estela = Array.from({ length: 20 }, (_, i) => pr(-78.5 - i * 1.6, -0.2)).filter((q) => q[2] > 0);
              return <g>
                {cz > 0 && T < K.Ecuador + 0.5 && <PinG x={cx} y={cy} color={KC.pink} r={14} T={T} />}
                {T > K.Ecuador + 0.6 && estela.length > 1 && <polyline points={estela.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ')} fill="none" stroke={KC.yellow} strokeWidth={14} strokeLinecap="round" opacity={kprog(T, K.Ecuador + 0.6, K.Ecuador + 1.2)} />}
                {T > K.Ecuador + 0.4 && ez > 0 && <PinG x={ex} y={ey} color={KC.yellow} T={T} />}
              </g>; }}
          </Globo>
          <FlechaGiroWrap T={T} p={kprog(T, K.Giro + 1.0, K.Giro + 2.0, kEase.sale)} />
          <g opacity={kprog(T, K.Giro + 2.2, K.Giro + 2.6) * (1 - kprog(T, K.Ecuador - 0.2, K.Ecuador + 0.2))}><Reloj x={900} y={1110} r={70} v={kprog(T, K.Giro + 2.2, K.Ecuador - 0.2)} /></g>
          <CajaG T={T} at={K.Ecuador + 1.0} x={620} y={1010} l1="ecuador" l2="≈ 1,670 km/h" color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Giro + 0.4} until={K.Giro + 2.2} texto="tú, en México" x={540} y={420} tam={42} borde={KC.pink} />
        <Chip T={T} at={K.Giro + 2.3} until={K.Ecuador - 0.1} texto="1 vuelta ≈ 1 día" x={540} y={420} tam={48} borde={KC.gold} />
        <Chip T={T} at={K.Ecuador + 0.2} until={K.Mexico - 0.1} texto="en el ecuador" x={540} y={420} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 3 · México: más lejos del ecuador, un poco más lento */}
      <Escena T={T} a={K.Mexico} b={K.Polos} fondo={KC.cyan} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Mexico - 0.4, K.Mexico + 0.5, kEase.sale)) * 300})`}>
            <MapaMexico x={MAPA.x} y={MAPA.y} ancho={MAPA.ancho} />
            <line x1={0} y1={YEC} x2={KW} y2={YEC} stroke={KC.ink} strokeWidth={16} />
            <line x1={0} y1={YEC} x2={KW} y2={YEC} stroke={ORO} strokeWidth={8} strokeDasharray="30 16" strokeDashoffset={-T * 60} />
            <text x={1040} y={YEC - 22} textAnchor="end" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">ecuador · ≈ 1,670 km/h</text>
            {T > K.Mexico + 0.8 && <g opacity={kprog(T, K.Mexico + 0.8, K.Mexico + 1.3)}>
              <FlechaRecta x1={GDL[0] - 60} y1={YEC - 10} x2={GDL[0] - 60} y2={klerp(YEC - 10, GDL[1] + 30, kprog(T, K.Mexico + 0.8, K.Mexico + 1.8, kEase.sale))} color={KC.coral} grosor={12} punta={30} />
              <text x={GDL[0] - 85} y={YEC - 150} textAnchor="end" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">más lejos</text>
            </g>}
            {T > K.Mexico + 0.5 && <PinG x={GDL[0]} y={GDL[1]} color={KC.yellow} r={15} T={T} />}
            {T > K.Mexico + 4.3 && <PinG x={CDMX[0]} y={CDMX[1]} color={KC.orange} r={15} T={T} />}
            <CajaG T={T} at={K.Mexico + 1.4} x={60} y={GDL[1] - 270} l1="Guadalajara" l2="≈ 1,560 km/h" px={GDL[0]} py={GDL[1]} color={KC.yellow} />
            <CajaG T={T} at={K.Mexico + 4.5} x={600} y={CDMX[1] + 110} l1="CDMX" l2="≈ 1,570 km/h" px={CDMX[0]} py={CDMX[1]} color={KC.orange} />
          </g>
        </Lienzo>
      </Escena>
      {/* 4 · los polos: casi nada, solo das vueltas en tu lugar */}
      <Escena T={T} a={K.Polos} b={K.Pregunta} fondo={KC.violet} zoom={0.04}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} seed={4} />
          <Globo x={540} y={830} R={330} lon0={-100 - 14 * (T - K.Polos)} lat0={62} ecuador={0.6} id="g2">
            {(pr) => { const [nx, ny] = pr(0, 90), giro = (T - K.Polos) * 200;
              return <g transform={`translate(${nx} ${ny})`}>
                <path d="M 0 -70 A 70 70 0 1 1 -66 -24" fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" transform={`rotate(${-giro * 0.5})`} />
                <path d="M 0 -70 A 70 70 0 1 1 -66 -24" fill="none" stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" transform={`rotate(${-giro * 0.5})`} />
                <g transform={`scale(${Math.cos(giro * Math.PI / 180) * 0.9} 0.9)`}><circle cy={-38} r={16} fill={CPIEL} stroke={KC.ink} strokeWidth={5} /><rect x={-14} y={-24} width={28} height={36} rx={10} fill={KC.pink} stroke={KC.ink} strokeWidth={5} /></g>
              </g>; }}
          </Globo>
          <CajaG T={T} at={K.Polos + 0.6} x={600} y={470} l1="polo norte" l2="casi nada" color={KC.mint} />
        </Lienzo>
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Constante} />
      {/* 6 · el cuerpo siente los cambios, no la velocidad */}
      <Escena T={T} a={K.Constante} b={K.Avion} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Grafica x={150} y={520} h={210} p={kprog(T, K.Constante + 0.3, K.Constante + 3.6)} f={(u) => u < 0.62 ? 0.8 : u < 0.7 ? klerp(0.8, 0.15, (u - 0.62) / 0.08) : 0.15} color={KC.yellow} titulo="tu velocidad" />
          <Grafica x={150} y={940} h={190} p={kprog(T, K.Constante + 0.3, K.Constante + 3.6)} f={(u) => u < 0.62 ? 0.08 : u < 0.7 ? 0.08 + 0.85 * Math.sin((u - 0.62) / 0.08 * Math.PI) : 0.08} color={KC.coral} titulo="lo que siente tu cuerpo" />
          <Onomato T={T} at={K.Constante + 2.6} dur={1.4} x={780} y={860} texto="¡FRENÓN!" color={KC.yellow} tam={80} rot={-6} />
        </Lienzo>
        <Chip T={T} at={K.Constante + 1.0} until={K.Constante + 2.5} texto="velocidad constante: no se siente" x={540} y={370} tam={36} borde={KC.yellow} />
        <Chip T={T} at={K.Constante + 2.7} until={K.Avion - 0.1} texto="el cambio sí se siente" x={540} y={370} tam={40} borde={KC.coral} />
      </Escena>
      {/* 7 · el avión que va derechito */}
      <Escena T={T} a={K.Avion} b={K.Lento} zoom={0.04}>
        <Lienzo><AvionDentro T={T} /></Lienzo>
        <Chip T={T} at={K.Avion + 0.4} until={K.Lento - 0.1} texto="cientos de km/h" x={540} y={360} tam={44} borde={KC.cyan} />
        <Etq T={T} at={K.Avion + 2.0} until={K.Lento - 0.1} x={620} y={920} texto="el agua, quieta" color={KC.ink} tam={34} />
      </Escena>
      {/* 8 · la Tierra cambia de dirección muy despacio */}
      <Escena T={T} a={K.Lento} b={K.Pendulo} fondo={KC.orange} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <PoloArriba T={T} a0={K.Lento} />
          <Reloj x={900} y={1110} r={70} v={kprog(T, K.Lento + 0.3, K.Pendulo - 0.2)} />
        </Lienzo>
        <Chip T={T} at={K.Lento + 0.3} until={K.Pendulo - 0.1} texto="tu dirección gira despacio" x={540} y={400} tam={42} borde={KC.coral} />
        <Chip T={T} at={K.Lento + 2.4} until={K.Pendulo - 0.1} texto="1 vuelta ≈ 1 día" x={300} y={1160} tam={36} borde={KC.gold} />
      </Escena>
      {/* 9 · Foucault, 1851, París */}
      <Escena T={T} a={K.Pendulo} b={K.Cierre} fondo={KC.lilac} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Lienzo><g opacity={kprog(T, K.Pendulo + 2.0, K.Pendulo + 2.6)}><Pendulo T={T} a0={K.Pendulo} /></g></Lienzo>
        <TarjetaEstudio T={T} at={K.Pendulo + 0.2} until={K.Pendulo + 2.4} anio="1851" quien="Léon Foucault · París" revista="un péndulo enorme" x={540} y={700} />
        <Chip T={T} at={K.Pendulo + 2.8} until={K.Cierre - 0.1} texto="el piso gira debajo" x={540} y={380} tam={42} borde={KC.red} />
        <Etq T={T} at={K.Pendulo + 3.4} until={K.Cierre - 0.1} x={600} y={560} texto="el péndulo no gira" color={KC.ink} tam={30} />
      </Escena>
      {/* 10 · cierre: la misma silla, ahora sobre la Tierra que gira */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={-0.04}>
        <FondoLunares color={KC.pink} />
        <Lienzo><Cuarto T={T} v={1} curvo={kprog(T, K.Cierre + 0.4, K.Cierre + 1.6, kEase.suave)} /></Lienzo>
        <NumeroGigante T={T} at={K.Cierre + 2.4} until={K.Outro - 0.1} valor={37000} desde={37000} dur={0.1} prefijo="> " sufijo=" km" etiqueta="hoy, sin levantarte" x={360} y={420} tam={120} color={KC.yellow} />
        <Chip T={T} at={K.Cierre + 0.6} until={K.Cierre + 2.3} texto="Guadalajara o CDMX" x={360} y={440} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Giro - 0.1} texto="Vas a *más de 1,500 km/h.*" />
      <Subtitulo T={T} idx={1} at={K.Giro + 0.1} until={K.Ecuador - 0.1} texto="La Tierra gira: *una vuelta al día.*" />
      <Subtitulo T={T} idx={2} at={K.Ecuador + 0.1} until={K.Mexico - 0.1} texto="Ecuador: *≈ 1,670 km/h.*" />
      <Subtitulo T={T} idx={3} at={K.Mexico + 0.1} until={K.Polos - 0.1} texto="Más lejos del ecuador: *más lento.*" />
      <Subtitulo T={T} idx={4} at={K.Polos + 0.1} until={K.Pregunta - 0.1} texto="En los polos: *casi nada.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.05} until={K.Constante - 0.05} texto="¿Por qué *no te mareas?*" />
      <Subtitulo T={T} idx={6} at={K.Constante + 0.1} until={K.Avion - 0.1} texto="Sientes los *cambios de velocidad.*" />
      <Subtitulo T={T} idx={7} at={K.Avion + 0.1} until={K.Lento - 0.1} texto="Como en un *avión derechito.*" />
      <Subtitulo T={T} idx={8} at={K.Lento + 0.1} until={K.Pendulo - 0.1} texto="Cambia de dirección *muy despacio.*" />
      <Subtitulo T={T} idx={9} at={K.Pendulo + 0.1} until={K.Cierre - 0.1} texto="1851: *el péndulo de Foucault.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Hoy recorres *más de 37,000 km.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Giro + 1.6, K.Ecuador + 0.4, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Mexico + 1.2, K.Mexico + 5.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Polos + 0.4, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Constante - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Constante + 2.6, K.Avion - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Avion + 2.4, K.Lento + 1.0, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Lento + 3.0, K.Pendulo + 1.5, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Pendulo + 2.8, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 2.6, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="33" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// La flecha del giro va en las mismas coordenadas del globo (540, 820).
function FlechaGiroWrap({ T, p }) { return <g transform="translate(540 820)"><FlechaGiro R={330} p={p} T={T} /></g>; }
function TierraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Tierra /></CompositionStage></div>;
}
window.TierraApp = TierraApp;
