// Shot Científico #44 · Los astronautas ven 16 amaneceres al día — NARRADO (N2 "El número" + N3 la órbita con su reloj).
// Datos: NASA (Facts and Figures, Spot the Station, Astronaut Exercise, SSLA), ESA Kids, NASA Earth Observatory. Ver guion.md y verificacion.md.
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

/* ---------- PIEZAS DE ESTE SHOT ---------- */
// Globo con día (izquierda, el Sol está a la izquierda) y noche (derecha). noche 0..1.
function GloboDN({ x, y, R, lon0, lat0 = 20, id = 'g', noche = 1, s = 1, halo = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <radialGradient id={id + 'luz'} cx="25%" cy="35%" r="80%"><stop offset="0%" stopColor="#fff" stopOpacity=".35" /><stop offset="55%" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <linearGradient id={id + 'noc'} x1="0" x2="1" y1="0" y2="0"><stop offset="0.45" stopColor="#060a24" stopOpacity="0" /><stop offset="0.55" stopColor="#060a24" stopOpacity=".8" /><stop offset="1" stopColor="#060a24" stopOpacity=".88" /></linearGradient>
      <clipPath id={id + 'clip'}><circle r={R} /></clipPath>
    </defs>
    {halo && <circle r={R + 22} fill="rgba(140,210,255,.38)" />}
    <circle r={R} fill={OCEANO} />
    <g clipPath={`url(#${id}clip)`}>
      {[-60, -30, 0, 30, 60].map((la) => <path key={'p' + la} d={gLinea(gParalelo(la), lon0, lat0, R)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={3} />)}
      {Array.from({ length: 12 }, (_, i) => <path key={'m' + i} d={gLinea(gMeridiano(-180 + i * 30), lon0, lat0, R)} fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={3} />)}
      {G_DENSAS.map(([p, c], i) => { const d = gPoli(p, lon0, lat0, R); return d && <path key={i} d={d} fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />; })}
      <circle r={R} fill={`url(#${id}luz)`} />
      {noche > 0 && <rect x={-R} y={-R} width={2 * R} height={2 * R} fill={`url(#${id}noc)`} opacity={noche} />}
    </g>
    <circle r={R} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
// La Estación Espacial (esquemática): armazón largo, 8 alas de paneles solares y módulos al centro.
// luz 0..1 (0 = en la sombra de la Tierra) · brillo 0..1 (destello del amanecer).
function Estacion({ x, y, s = 1, rot = 0, luz = 1, brillo = 0 }) {
  const panel = (px, py, k) => <g key={k} transform={`translate(${px} ${py})`}>
    <rect x={-32} y={-88} width={64} height={176} rx={4} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
    {[-44, 0, 44].map((v) => <line key={v} x1={-32} y1={v} x2={32} y2={v} stroke="#a0661a" strokeWidth={4} />)}
    <line x1={0} y1={-88} x2={0} y2={88} stroke="#a0661a" strokeWidth={4} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <g opacity={brillo}><circle r={260} fill="#fff3b0" opacity=".35" /><circle r={160} fill="#fff8d6" opacity=".55" /></g>}
    <g style={{ filter:`brightness(${0.35 + 0.65 * luz})` }}>
      <rect x={-215} y={-11} width={430} height={22} rx={6} fill="#d9dde6" stroke={KC.ink} strokeWidth={6} />
      {[-172, -108, 108, 172].map((px, i) => <g key={i}>{panel(px, -104, 'a')}{panel(px, 104, 'b')}</g>)}
      <rect x={-56} y={24} width={26} height={70} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <rect x={30} y={24} width={26} height={70} rx={4} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <rect x={-30} y={-78} width={60} height={156} rx={26} fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
      <rect x={-84} y={-24} width={168} height={48} rx={22} fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
      <rect x={-15} y={-122} width={30} height={50} rx={10} fill="#e6e1d6" stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={0} r={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}
// Solecito para contar amaneceres. e 0..1 (aparece con rebote).
function SolMini({ x, y, r = 18, e = 1 }) {
  if (e <= 0.01) return <circle cx={x} cy={y} r={r} fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.45)" strokeWidth={3} strokeDasharray="5 5" />;
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-r - 5} x2={0} y2={-r - 13} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// n soles encendidos de total (n puede ser fraccionario: el siguiente va apareciendo).
function TiraSoles({ x, y, n, total = 16, cols = 8, paso = 58, r = 18 }) {
  return <g>{Array.from({ length: total }, (_, i) => { const e = kEase.rebote(kclamp((n - i) * 2.5, 0, 1));
    return <SolMini key={i} x={x + (i % cols) * paso} y={y + Math.floor(i / cols) * paso} r={r} e={n > i ? e : 0} />; })}</g>;
}
function luzLinea(dd, k, T, color = KC.yellow, g = 7) {
  return <g key={k}><path d={dd} fill="none" stroke={KC.ink} strokeWidth={g + 8} strokeLinecap="round" /><path d={dd} fill="none" stroke={color} strokeWidth={g} strokeDasharray="22 14" strokeDashoffset={-T * 60} strokeLinecap="round" /></g>;
}
// Órbita vista de lado (inclinada): la mitad de atrás pasa detrás del globo. a = ángulo de la estación.
// El amanecer es cuando cruza al frente de la noche (derecha) al día (izquierda): a = π/2.
function OrbitaInclinada({ T, x = 540, y = 960, R = 240, rx = 380, ry = 110, inc = -10, a, lon0, id, sEst = 0.2 }) {
  const ci = Math.cos(inc * Math.PI / 180), si = Math.sin(inc * Math.PI / 180);
  const pos = (g) => { const px = Math.cos(g) * rx, py = Math.sin(g) * ry; return [x + px * ci - py * si, y + px * si + py * ci]; };
  const arco = (g0, g1) => 'M ' + Array.from({ length: 61 }, (_, i) => pos(klerp(g0, g1, i / 60)).map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const [ex, ey] = pos(a), frente = Math.sin(a) > 0;
  const luz = frente ? kclamp(0.5 - (ex - x) / 50, 0, 1) : (Math.abs(ex - x) > R ? 1 : kclamp(0.5 - (ex - x) / 50, 0, 1));
  const d = ((a - Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const brillo = d < 0.7 ? 1 - d / 0.7 : 0;
  const est = <Estacion x={ex} y={ey} s={sEst} rot={inc} luz={luz} brillo={brillo} />;
  return <g>
    {luzLinea(arco(Math.PI, 2 * Math.PI), 'atras', T)}
    {!frente && est}
    <GloboDN x={x} y={y} R={R} lon0={lon0} lat0={20} id={id} />
    {luzLinea(arco(0, Math.PI), 'frente', T)}
    {frente && est}
  </g>;
}
// Vista desde arriba del polo norte: el Sol a la izquierda, la sombra de la Tierra es una franja a la derecha.
// th = ángulo de la estación (rad, sentido antihorario). rastro: desde qué ángulo se dibuja su camino.
const PO = { x: 540, y: 800, R: 210, r: 310 };
const enSombra = (th) => Math.cos(th) > 0 && Math.abs(Math.sin(th)) * PO.r < PO.R;
function OrbitaPolar({ T, th, noche = 1, rastro, lon0 = 0, id = 'pol', sEst = 0.19, anillo = 1 }) {
  const { x, y, R, r } = PO;
  const pos = (g) => [x + r * Math.cos(g), y - r * Math.sin(g)];
  const [ex, ey] = pos(th);
  const borde = Math.min(Math.abs(Math.abs(ey - y) - R), 60) / 60;
  const luz = noche > 0 && enSombra(th) ? 1 - noche * Math.min(1, borde * 1.4 + 0.2) * 0.9 : 1;
  const tr = rastro != null && th > rastro ? 'M ' + Array.from({ length: 80 }, (_, i) => pos(klerp(rastro, th, i / 79)).map((v) => v.toFixed(1)).join(' ')).join(' L ') : null;
  return <g>
    {noche > 0 && <rect x={x} y={y - R} width={KW - x + 40} height={2 * R} fill="#060a24" opacity={0.42 * noche} />}
    {anillo > 0 && <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={5} strokeDasharray="10 14" opacity={anillo} />}
    {tr && <g><path d={tr} fill="none" stroke={KC.ink} strokeWidth={20} strokeLinecap="round" /><path d={tr} fill="none" stroke={KC.yellow} strokeWidth={11} strokeLinecap="round" /></g>}
    <GloboDN x={x} y={y} R={R} lon0={lon0} lat0={90} id={id} noche={noche} />
    <Estacion x={ex} y={ey} s={sEst} rot={90 - th * 180 / Math.PI} luz={luz} />
  </g>;
}
// Velocímetro sin números (la cifra va en el NumeroGigante). v 0..1.
function Velocimetro({ x, y, r = 120, v = 0, T = 0 }) {
  const ang = klerp(-120, 120, kclamp(v, 0, 1)) + Math.sin(T * 31) * 0.8 * v;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r - 22} 36 A ${r + 22} ${r + 22} 0 1 1 ${r + 22} 36 Z`} fill="#22252e" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 13 }, (_, i) => { const a = (-120 + i * 20) * Math.PI / 180, k = i > 9;
      return <line key={i} x1={Math.sin(a) * (r - 26)} y1={-Math.cos(a) * (r - 26)} x2={Math.sin(a) * (r - 4)} y2={-Math.cos(a) * (r - 4)} stroke={k ? KC.red : '#fff'} strokeWidth={i % 2 ? 5 : 9} strokeLinecap="round" />; })}
    <g transform={`rotate(${ang})`}><path d={`M -10 0 L 0 ${-r + 22} L 10 0 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></g>
    <circle r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Reloj de pared con 12, 3, 6, 9.
function RelojPared({ x, y, r = 190, T = 0 }) {
  const mn = T * 40, hr = 300 + T * 3.3;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 22} fill={KC.ink} /><circle r={r + 12} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 6} x2={0} y2={-r + (i % 3 ? 22 : 36)} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 9} transform={`rotate(${i * 30})`} />)}
    {[['12', 0, -r + 78], ['3', r - 64, 18], ['6', 0, r - 46], ['9', -r + 64, 18]].map(([t, a, b]) => <text key={t} x={a} y={b} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{t}</text>)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.52} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" transform={`rotate(${hr})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${mn})`} />
    <circle r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Ventanilla redonda: afuera amanece y anochece cada ciclo (time-lapse). t = tiempo desde que aparece.
function Ventanilla({ x, y, r = 150, t = 0, ciclo = 1.5, id = 'vent' }) {
  const f = (t / ciclo) % 1, dia = kprog(f, 0.05, 0.2) * (1 - kprog(f, 0.6, 0.75)), sol = kprog(f, 0.02, 0.2, kEase.sale);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath></defs>
    <circle r={r + 30} fill="#9aa3b5" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 4) * (r + 15)} cy={Math.sin(i * Math.PI / 4) * (r + 15)} r={6} fill={KC.ink} />)}
    <g clipPath={`url(#${id})`}>
      <rect x={-r} y={-r} width={2 * r} height={2 * r} fill="#05070f" />
      <rect x={-r} y={-r} width={2 * r} height={2 * r} fill="#4fb6ff" opacity={dia * 0.9} />
      {f < 0.62 && <g opacity={1 - kprog(f, 0.5, 0.62)}><circle cx={-r * 0.35} cy={klerp(r * 0.6, -r * 0.3, sol)} r={34} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /></g>}
      <circle cx={0} cy={r * 3.2} r={r * 2.7} fill={OCEANO} stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={r * 3.2} r={r * 2.7} fill="#060a24" opacity={0.75 * (1 - dia)} />
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Astronauta de perfil (mira a la derecha). (x, y) = cadera. modo: 'corre' | 'pedalea' | 'duerme'.
function Astronauta({ x, y, s = 1, T = 0, modo = 'corre', color = KC.cyan }) {
  const muslo = 95, pierna = 100;
  const pantalon = '#3a3f5c';
  let piernas, brazos;
  if (modo === 'corre') {
    const f = Math.sin(T * 11);
    const p = (ang, k) => <g key={k} transform={`rotate(${ang})`}><rect x={-22} y={-6} width={44} height={muslo + pierna} rx={20} fill={pantalon} stroke={KC.ink} strokeWidth={7} /><ellipse cx={20} cy={muslo + pierna} rx={34} ry={15} fill={KC.ink} /></g>;
    piernas = [p(30 * f, 'a'), p(-30 * f, 'b')];
    const b = (ang, k) => <rect key={k} x={-18} y={0} width={36} height={130} rx={18} fill={color} stroke={KC.ink} strokeWidth={7} transform={`translate(0 -160) rotate(${ang})`} />;
    brazos = [b(-35 * f, 'a'), b(35 * f, 'b')];
  } else {
    const ang = T * 7, cx = 70, cy = 150, cr = 42;
    const pierna2 = (fase, k) => {
      const px = cx + Math.cos(ang + fase) * cr, py = cy + Math.sin(ang + fase) * cr, d = Math.min(Math.hypot(px, py), muslo + pierna - 1);
      const a0 = Math.atan2(py, px), c = Math.acos((muslo * muslo + d * d - pierna * pierna) / (2 * muslo * d));
      const kx = Math.cos(a0 - c) * muslo, ky = Math.sin(a0 - c) * muslo;
      return <g key={k}><path d={`M 0 0 L ${kx} ${ky} L ${px} ${py}`} fill="none" stroke={KC.ink} strokeWidth={50} strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M 0 0 L ${kx} ${ky} L ${px} ${py}`} fill="none" stroke={pantalon} strokeWidth={36} strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx={px + 14} cy={py + 6} rx={30} ry={13} fill={KC.ink} /></g>;
    };
    piernas = [pierna2(Math.PI, 'b'), <g key="biela"><circle cx={cx} cy={cy} r={cr + 8} fill="none" stroke={KC.ink} strokeWidth={6} /><circle cx={cx} cy={cy} r={12} fill={KC.ink} /></g>, pierna2(0, 'a')];
    brazos = [<path key="br" d="M 0 -150 L 120 -110 L 150 -60" fill="none" stroke={KC.ink} strokeWidth={42} strokeLinecap="round" strokeLinejoin="round" />,
      <path key="br2" d="M 0 -150 L 120 -110 L 150 -60" fill="none" stroke={color} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />];
  }
  const inc = modo === 'corre' ? 8 : 18, hy = -230;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {modo === 'corre' ? piernas[1] : piernas[0]}
    {modo === 'corre' && brazos[1]}
    <g transform={`rotate(${inc})`}>
      <rect x={-48} y={-200} width={96} height={210} rx={40} fill={color} stroke={KC.ink} strokeWidth={8} />
      <circle cx={6} cy={hy - 30} r={60} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
      <path d={`M -54 ${hy - 40} Q -50 ${hy - 104} 10 ${hy - 92} Q 62 ${hy - 86} 64 ${hy - 50} Q 20 ${hy - 70} -54 ${hy - 40} Z`} fill={CPELO} stroke={KC.ink} strokeWidth={6} />
      <circle cx={34} cy={hy - 30} r={7} fill={KC.ink} />
      <path d={`M 30 ${hy} Q 44 ${hy + 6} 54 ${hy - 4}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    </g>
    {modo === 'corre' ? [piernas[0], brazos[0]] : [piernas[1], piernas[2], ...brazos]}
  </g>;
}
function Caminadora({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-260} y={0} width={520} height={56} rx={26} fill="#4a4f5e" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const xx = -240 + ((i * 44 - T * 260) % 480 + 480) % 480; return <line key={i} x1={xx} y1={8} x2={xx} y2={48} stroke="rgba(255,255,255,.35)" strokeWidth={5} />; })}
    <circle cx={-232} cy={28} r={22} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} /><circle cx={232} cy={28} r={22} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
    <rect x={-280} y={56} width={560} height={30} rx={10} fill="#2c2f38" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Bici({ x, y }) {   // (x, y) = asiento
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 0 10 L 70 160 L 210 40 L 230 -60" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 0 10 L 70 160 L 210 40 L 230 -60" fill="none" stroke={KC.red} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-50} y={-6} width={90} height={26} rx={12} fill={KC.ink} />
    <rect x={190} y={-76} width={90} height={22} rx={10} fill={KC.ink} />
    <rect x={10} y={210} width={220} height={36} rx={14} fill="#2c2f38" stroke={KC.ink} strokeWidth={7} />
    <line x1={70} y1={160} x2={120} y2={214} stroke={KC.ink} strokeWidth={16} />
  </g>;
}
function Hueso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-70, -16], [-70, 16], [70, -16], [70, 16]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={22} fill="#fff6e0" stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-72} y={-15} width={144} height={30} fill="#fff6e0" />
    <line x1={-56} y1={-15} x2={56} y2={-15} stroke={KC.ink} strokeWidth={6} /><line x1={-56} y1={15} x2={56} y2={15} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Musculo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -100 0 Q -40 -52 0 -50 Q 40 -52 100 0 Q 40 52 0 50 Q -40 52 -100 0 Z" fill="#e8546a" stroke={KC.ink} strokeWidth={6} />
    {[-40, 0, 40].map((v) => <path key={v} d={`M ${v - 30} -30 Q ${v} 0 ${v - 30} 30`} fill="none" stroke="#b8324a" strokeWidth={5} />)}
  </g>;
}
// Bolsa de dormir amarrada a la pared, con el astronauta dormido.
function BolsaDormir({ x, y, T }) {
  const r = mece(T, 3, 0.4);
  return <g transform={`translate(${x} ${y}) rotate(${r * 2})`}>
    <rect x={-120} y={-40} width={240} height={560} rx={110} fill={KC.teal} stroke={KC.ink} strokeWidth={9} />
    <path d="M -90 120 L 90 120" stroke="rgba(0,0,0,.25)" strokeWidth={8} /><path d="M -90 260 L 90 260" stroke="rgba(0,0,0,.25)" strokeWidth={8} />
    <rect x={-150} y={180} width={300} height={22} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <rect x={-150} y={380} width={300} height={22} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-40} r={70} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -50 Q -66 -120 0 -116 Q 66 -120 70 -50 Q 30 -84 -70 -50 Z" fill={CPELO} stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 -34 Q -24 -24 -12 -34" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M 12 -34 Q 24 -24 36 -34" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -10 2 Q 0 8 10 2" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
function Zzz({ x, y, T, o = 1 }) {
  return <g opacity={o}>{[0, 1, 2].map((i) => { const f = ((T * 0.5 + i / 3) % 1);
    return <text key={i} x={x + f * 90} y={y - f * 180} style={{ font:`400 ${40 + 30 * f}px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} paintOrder="stroke" opacity={Math.sin(f * Math.PI)}>Z</text>; })}</g>;
}
// Etiqueta en caja (dentro de <svg>).
function CajaG({ T, at, until = 1e9, x, y, l1, l2, color = KC.yellow, ancho }) {
  const e = kprog(T, at, at + 0.4, kEase.sale) * (1 - kprog(T, until, until + 0.3)); if (e <= 0) return null;
  const w = ancho || Math.max(l1.length * 25, l2 ? l2.length * 23 : 0) + 44;
  return <g opacity={e} transform={`translate(0 ${(1 - e) * 20})`}>
    <rect x={x} y={y} width={w} height={l2 ? 120 : 70} rx={18} fill="rgba(14,15,18,.9)" stroke={color} strokeWidth={5} />
    <text x={x + 22} y={y + 50} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{l1}</text>
    {l2 && <text x={x + 22} y={y + 100} style={{ font:`700 36px ${KF.mono}` }} fill={color}>{l2}</text>}
  </g>;
}
// Horizonte visto por la ventana: del negro a una línea de colores (p 0..1) y luego asoma el Sol.
function HorizonteAmanecer({ x = 540, y = 800, r = 350, p = 0, T = 0, id = 'cup' }) {
  const RT = 1300, cyT = r * 0.35 + RT;   // centro de la Tierra (relativo)
  const capas = [['#8a1022', 0], ['#ff4d1f', 0.18], ['#ffb21f', 0.36], ['#fff1a0', 0.52], ['#7fd4ff', 0.66], ['#2b6cff', 0.8]];
  const sol = kprog(p, 0.82, 1, kEase.sale);
  const g = krng(5);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><circle r={r} /></clipPath>
      <radialGradient id={id + 's'}><stop offset="0%" stopColor="#fffbe6" /><stop offset="35%" stopColor="#ffe48a" stopOpacity=".9" /><stop offset="100%" stopColor="#ffb21f" stopOpacity="0" /></radialGradient></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={-r} y={-r} width={2 * r} height={2 * r} fill="#03040a" />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(g() - 0.5) * 2 * r} cy={(g() - 0.7) * 1.4 * r} r={1.5 + g() * 2.5} fill="#fff" opacity={(0.3 + 0.5 * g()) * (1 - sol)} />)}
      {capas.map(([c, d], i) => { const e = kprog(p, d * 0.8, d * 0.8 + 0.25, kEase.sale); if (e <= 0) return null;
        return <circle key={i} cx={0} cy={cyT} r={RT + 6 + (capas.length - i) * 7 * e} fill="none" stroke={c} strokeWidth={10 * e} opacity={e} />; })}
      <circle cx={0} cy={cyT} r={RT} fill="#0a1430" stroke="#16224a" strokeWidth={4} />
      {sol > 0 && <circle cx={-r * 0.25} cy={r * 0.35 - 8} r={30 + 220 * sol} fill={`url(#${id}s)`} opacity={sol} />}
    </g>
    <circle r={r + 34} fill="none" stroke="#9aa3b5" strokeWidth={50} />
    <circle r={r + 60} fill="none" stroke={KC.ink} strokeWidth={8} /><circle r={r + 8} fill="none" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={Math.cos(i * Math.PI / 3) * (r + 8)} y1={Math.sin(i * Math.PI / 3) * (r + 8)} x2={Math.cos(i * Math.PI / 3) * (r + 60)} y2={Math.sin(i * Math.PI / 3) * (r + 60)} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Tarjeta de comparación del cierre (dentro de <svg>).
function TarjetaCuenta({ x, y, w, h, titulo, e = 1, children }) {
  if (e <= 0) return null;
  return <g opacity={e} transform={`translate(${x} ${y + (1 - e) * 40})`}>
    <rect x={0} y={0} width={w} height={h} rx={28} fill="rgba(14,15,18,.88)" stroke={KC.gold2} strokeWidth={6} />
    <text x={w / 2} y={58} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>
    {children}
  </g>;
}

function Iss() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const lonT = -100 + T * 5;
  const aG = (t) => Math.PI / 2 - 1.2 + t * 2 * Math.PI / 1.7;       // ángulo de la estación en las vistas de lado
  const thV = Math.PI / 2 + 2 * Math.PI * kprog(T, K.Vuelta + 0.2, K.Dia - 0.3, kEase.suave);
  const thD = (-20 + (T - K.Dia) * 80) * Math.PI / 180;
  const vueltasC = 16 * kprog(T, K.Cuenta + 1.4, K.Cuenta + 4.6);
  const pA = kprog(T, K.Rapido + 0.6, K.Rapido + 4.2);
  const altB = kprog(T, K.Altura + 2.4, K.Altura + 2.9);
  const bici = kprog(T, K.Ejercicio + 3.4, K.Ejercicio + 3.9);
  const pers = kprog(T, K.Ventanas + 0.4, K.Ventanas + 1.6, kEase.suave), tono = kprog(T, K.Ventanas + 2.4, K.Ventanas + 4.6, kEase.suave);
  const led = mixHex('#d6ecff', '#ffa24a', tono);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la estación da vueltas y los amaneceres se cuentan */}
      <Escena T={T} a={K.Gancho} b={K.Velocidad} zoom={0.04}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} />
          <SolDibujo x={40} y={960} r={60} T={T} />
          <OrbitaInclinada T={T} a={aG(T)} lon0={lonT} id="gg" />
          <TiraSoles x={88} y={640} n={16 * kprog(T, 0.3, 4.0)} />
        </Lienzo>
        <NumeroGigante T={T} at={K.Gancho + 0.1} until={K.Velocidad - 0.1} valor={16} desde={0} dur={3.7} prefijo="≈ " etiqueta="amaneceres al día" x={300} y={440} tam={190} />
      </Escena>
      {/* 1 · velocidad */}
      <Escena T={T} a={K.Velocidad} b={K.Vuelta} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          {Array.from({ length: 14 }, (_, i) => { const yy = 560 + (i * 37) % 460, xx = KW + 300 - ((T * 1400 + i * 260) % (KW + 700)); return <line key={i} x1={xx} y1={yy} x2={xx + 160 + (i % 3) * 60} y2={yy} stroke="#fff" strokeWidth={8 + (i % 3) * 3} strokeLinecap="round" opacity=".7" />; })}
          <Estacion x={540 + Math.sin(T * 2) * 10} y={760 + Math.sin(T * 1.3) * 8} s={1.1} rot={-6} />
          <Velocimetro x={540} y={1110} r={95} v={kprog(T, K.Velocidad + 0.2, K.Velocidad + 1.4, kEase.sale)} T={T} />
        </Lienzo>
        <NumeroGigante T={T} at={K.Velocidad + 0.2} until={K.Vuelta - 0.1} valor={28000} desde={28000} dur={0.1} prefijo="≈ " sufijo=" km/h" x={540} y={400} tam={130} color={KC.yellow} />
        <Etq T={T} at={K.Velocidad + 1.6} until={K.Vuelta - 0.1} x={600} y={505} texto="Estación Espacial" color={KC.ink} tam={28} />
      </Escena>
      {/* 2 · una vuelta completa: ≈ 90 min (vista desde arriba del polo norte) */}
      <Escena T={T} a={K.Vuelta} b={K.Dia} zoom={0.02}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} seed={3} />
          <OrbitaPolar T={T} th={thV} rastro={Math.PI / 2} noche={0} lon0={lonT} id="pv" />
        </Lienzo>
        <Cronometro T={T} at={K.Vuelta + 0.2} until={K.Dia - 0.1} inicio={0} factor={5400 / (K.Dia - 0.5 - K.Vuelta)} x={540} y={400} etiqueta="UNA VUELTA" />
        <NumeroGigante T={T} at={K.Dia - 1.0} until={K.Dia - 0.05} valor={90} desde={90} dur={0.1} prefijo="≈ " sufijo=" min" x={540} y={800} tam={120} color={KC.yellow} />
      </Escena>
      {/* 3 · lado de día y lado de noche: amanecer y atardecer */}
      <Escena T={T} a={K.Dia} b={K.Cuenta} zoom={0.02}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} seed={3} />
          <SolDibujo x={50} y={800} r={60} T={T} />
          <OrbitaPolar T={T} th={thD} noche={kprog(T, K.Dia - 0.3, K.Dia + 0.4)} lon0={lonT} id="pd" />
          <TextoSvg x={150} y={650} tam={60} color={KC.yellow}>DÍA</TextoSvg>
          <TextoSvg x={962} y={822} tam={56} color="#b9c6ff">NOCHE</TextoSvg>
          <CajaG T={T} at={K.Dia + 0.75} until={K.Dia + 3.0} x={735} y={470} l1="amanecer" color={KC.yellow} ancho={250} />
          <CajaG T={T} at={K.Dia + 4.15} x={720} y={1040} l1="atardecer" color={KC.coral} ancho={270} />
        </Lienzo>
      </Escena>
      {/* 4 · 24 h ÷ 90 min ≈ 16 */}
      <Escena T={T} a={K.Cuenta} b={K.Altura} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <TextoSvg x={190} y={560} tam={110} color={KC.white} s={kEase.rebote(kprog(T, K.Cuenta + 0.1, K.Cuenta + 0.5))}>24 h</TextoSvg>
          <TextoSvg x={540} y={560} tam={110} color={KC.white} s={kEase.rebote(kprog(T, K.Cuenta + 0.9, K.Cuenta + 1.3))}>÷ 90 min</TextoSvg>
          <TextoSvg x={890} y={560} tam={110} color={KC.pink} s={kEase.rebote(kprog(T, K.Cuenta + 2.0, K.Cuenta + 2.4))}>≈ 16</TextoSvg>
          <g opacity={kprog(T, K.Cuenta + 0.6, K.Cuenta + 1.0)}>
            <rect x={80} y={640} width={920} height={110} rx={22} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 16 }, (_, i) => { const on = kclamp(vueltasC - i, 0, 1);
              return <g key={i}><rect x={96 + i * 56.5} y={656} width={50} height={78} rx={10} fill={on > 0 ? KC.mint : 'rgba(255,255,255,.12)'} opacity={0.4 + 0.6 * on} />
                {on > 0 && <SolMini x={121 + i * 56.5} y={695} r={13} e={kEase.rebote(on)} />}</g>; })}
            <text x={86} y={800} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>0 h</text>
            <text x={994} y={800} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>24 h</text>
          </g>
          <g transform="translate(540 990) scale(0.5) translate(-540 -800)" opacity={kprog(T, K.Cuenta + 1.0, K.Cuenta + 1.4)}>
            <OrbitaPolar T={T} th={Math.PI / 2 + vueltasC * 2 * Math.PI} noche={0} lon0={lonT} id="pc" sEst={0.3} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Cuenta + 1.4} until={K.Altura - 0.1} texto="cada cuadro ≈ 90 min" x={540} y={410} tam={38} borde={KC.mint} />
        <Contador T={T} at={K.Cuenta + 1.4} desde={0} hasta={16} dur={3.2} x={860} y={970} tam={72} color={KC.ink} />
        <Etq T={T} at={K.Cuenta + 1.4} until={K.Altura - 0.1} x={860} y={1040} texto="vueltas" color={KC.ink} tam={30} lado="izq" />
      </Escena>
      {/* 5 · ≈ 400 km de altura: bastante cerca */}
      <Escena T={T} a={K.Altura} b={K.Pregunta} zoom={0.03}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={45} seed={8} alto={1100} />
          <g opacity={1 - altB}>
            <GloboDN x={540} y={2500} R={1400} lon0={-100 + T * 2} lat0={20} id="alt" noche={0} />
            <Estacion x={480 + (T - K.Altura) * 30} y={540} s={0.42} rot={-4} />
            <g opacity={kprog(T, K.Altura + 0.4, K.Altura + 0.8)}>
              <line x1={880} y1={1142} x2={880} y2={klerp(1142, 560, kprog(T, K.Altura + 0.4, K.Altura + 1.2, kEase.sale))} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
              <line x1={880} y1={1142} x2={880} y2={klerp(1142, 560, kprog(T, K.Altura + 0.4, K.Altura + 1.2, kEase.sale))} stroke={KC.yellow} strokeWidth={12} strokeLinecap="round" />
              {Array.from({ length: 11 }, (_, i) => <line key={i} x1={862} y1={1142 - i * 58} x2={898} y2={1142 - i * 58} stroke={KC.ink} strokeWidth={6} opacity={T > K.Altura + 0.4 + i * 0.07 ? 1 : 0} />)}
            </g>
            <CajaG T={T} at={K.Altura + 1.0} x={580} y={770} l1="≈ 400 km" l2="de altura" color={KC.yellow} ancho={270} />
          </g>
          {altB > 0 && <g opacity={altB}>
            <GloboDN x={540} y={830} R={300} lon0={-100 + T * 5} lat0={20} id="alt2" noche={0} halo={false} />
            <circle cx={540} cy={830} r={300 * 6771 / 6371} fill="none" stroke={KC.yellow} strokeWidth={6} />
            {(() => { const g = -(T - K.Altura) * 1.2, rr = 300 * 6771 / 6371; return <circle cx={540 + Math.cos(g) * rr} cy={830 + Math.sin(g) * rr} r={13} fill={KC.white} stroke={KC.ink} strokeWidth={5} />; })()}
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Altura + 2.6} until={K.Pregunta - 0.1} texto="bastante cerca (a escala)" x={540} y={410} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Horario} />
      {/* 7 · horario fijo: hora de Greenwich */}
      <Escena T={T} a={K.Horario} b={K.Ventanas} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Horario - 0.3, K.Horario + 0.5, kEase.sale)) * 200})`}><RelojPared x={330} y={790} r={200} T={T} /></g>
          <g opacity={kprog(T, K.Horario + 1.2, K.Horario + 1.6)}><Ventanilla x={830} y={760} r={140} t={Math.max(0, T - K.Horario - 1.2)} ciclo={1.5} /></g>
          <CajaG T={T} at={K.Horario + 1.9} x={690} y={950} l1="afuera:" l2="cada ≈ 90 min" color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Horario + 0.3} until={K.Ventanas - 0.1} texto="hora de Greenwich (UTC)" x={540} y={410} tam={42} borde={KC.ink} />
        <Etq T={T} at={K.Horario + 0.9} until={K.Ventanas - 0.1} x={540} y={1060} texto="Greenwich, Inglaterra" color={KC.ink} tam={30} lado="izq" />
      </Escena>
      {/* 8 · tapan las ventanas y las luces cambian de tono */}
      <Escena T={T} a={K.Ventanas} b={K.Ejercicio} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <rect x={60} y={380} width={960} height={800} rx={60} fill="#efe9f7" stroke={KC.ink} strokeWidth={10} />
          {[540, 720, 900].map((v) => <line key={v} x1={60} y1={v + 120} x2={1020} y2={v + 120} stroke="rgba(0,0,0,.08)" strokeWidth={6} />)}
          <rect x={140} y={410} width={800} height={30} rx={15} fill={led} stroke={KC.ink} strokeWidth={7} />
          <path d="M 140 440 L 940 440 L 1010 1170 L 70 1170 Z" fill={led} opacity={0.22} />
          <g transform="translate(600 520)">
            <rect x={0} y={0} width={340} height={300} rx={40} fill="#4fb6ff" stroke={KC.ink} strokeWidth={10} />
            <circle cx={250} cy={90} r={46} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <path d="M 0 230 Q 170 180 340 230 L 340 300 L 0 300 Z" fill={OCEANO} />
            <path d="M 300 120 L 120 520" stroke="#fff6b0" strokeWidth={110} opacity={0.35 * (1 - pers)} strokeLinecap="round" />
            <g clipPath="url(#pers)"><defs><clipPath id="pers"><rect x={0} y={0} width={340} height={300} rx={40} /></clipPath></defs>
              <rect x={0} y={0} width={340} height={300 * pers} fill="#c9c3d6" />
              {Array.from({ length: 10 }, (_, i) => i * 30 < 300 * pers && <line key={i} x1={0} y1={i * 30 + 28} x2={340} y2={i * 30 + 28} stroke="#8d86a0" strokeWidth={5} />)}
            </g>
            <rect x={0} y={0} width={340} height={300} rx={40} fill="none" stroke={KC.ink} strokeWidth={10} />
            <rect x={140} y={300 * pers - 8} width={60} height={22} rx={10} fill={KC.ink} />
          </g>
          <BolsaDormir x={290} y={640} T={T} />
          <Zzz x={430} y={720} T={T} o={kprog(T, K.Ventanas + 1.6, K.Ventanas + 2.2)} />
          <rect x={0} y={0} width={KW} height={KH} fill="#ff9a3c" opacity={0.12 * tono} />
        </Lienzo>
        <Etq T={T} at={K.Ventanas + 0.6} until={K.Ventanas + 4.0} x={720} y={870} texto="persiana" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Ventanas + 2.6} until={K.Ejercicio - 0.1} x={150} y={480} texto="luz que cambia de tono" color={KC.ink} tam={32} />
      </Escena>
      {/* 9 · ejercicio ≈ 2 h al día: caminadora y bici */}
      <Escena T={T} a={K.Ejercicio} b={K.Rapido} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g opacity={1 - bici}>
            <Caminadora x={540} y={1080} T={T} />
            <Astronauta x={540} y={880} s={1} T={T} modo="corre" />
            <line x1={510} y1={870} x2={330} y2={1090} stroke={KC.yellow} strokeWidth={8} /><line x1={570} y1={870} x2={750} y2={1090} stroke={KC.yellow} strokeWidth={8} />
          </g>
          {bici > 0 && <g opacity={bici}>
            <Bici x={470} y={860} />
            <Astronauta x={470} y={850} s={1} T={T} modo="pedalea" color={KC.pink} />
          </g>}
          <g opacity={kprog(T, K.Ejercicio + 0.3, K.Ejercicio + 0.7)} transform="translate(180 650)">
            <circle r={92} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <path d={`M 0 0 L 0 -84 A 84 84 0 0 1 ${84 * Math.sin(Math.PI / 6 * kprog(T, K.Ejercicio + 0.5, K.Ejercicio + 1.3))} ${-84 * Math.cos(Math.PI / 6 * kprog(T, K.Ejercicio + 0.5, K.Ejercicio + 1.3))} Z`} fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
            <text y={140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>24 h</text>
          </g>
          <g opacity={kprog(T, K.Ejercicio + 4.0, K.Ejercicio + 4.4)}>
            <Hueso x={880} y={620} s={0.8} /><Musculo x={880} y={730} s={0.75} />
          </g>
          {bici > 0 && <g opacity={kprog(T, K.Ejercicio + 5.2, K.Ejercicio + 5.6)}>
            <g transform={`translate(${830 + mece(T, 2, 0.5) * 30} ${880 + mece(T, 5, 0.4) * 30}) rotate(${T * 40})`}><rect x={-60} y={-9} width={120} height={18} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /><path d="M 60 -9 L 84 0 L 60 9 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={5} /></g>
            <circle cx={880 + mece(T, 7, 0.4) * 24} cy={1010 + mece(T, 9, 0.5) * 20} r={30 + Math.sin(T * 5) * 3} fill="rgba(120,200,255,.75)" stroke={KC.ink} strokeWidth={5} />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Ejercicio + 0.3} until={K.Ejercicio + 5.1} texto="≈ 2 h al día" x={540} y={410} tam={52} borde={KC.pink} />
        <Etq T={T} at={K.Ejercicio + 1.0} until={K.Ejercicio + 3.4} x={90} y={505} texto="caminadora" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Ejercicio + 3.9} until={K.Rapido - 0.1} x={90} y={505} texto="bicicleta" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Ejercicio + 4.3} until={K.Rapido - 0.1} x={1040} y={548} texto="huesos y músculos" color={KC.ink} tam={28} lado="izq" />
        <Chip T={T} at={K.Ejercicio + 5.3} until={K.Rapido - 0.1} texto="flotando en microgravedad" x={540} y={410} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 10 · cada amanecer dura unos segundos: del negro a una línea de colores */}
      <Escena T={T} a={K.Rapido} b={K.Cierre} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><HorizonteAmanecer x={540} y={790} r={330} p={pA} T={T} /></Lienzo>
        <Cronometro T={T} at={K.Rapido + 0.6} until={K.Cierre - 0.1} inicio={0} factor={1} x={540} y={330} etiqueta="SEGUNDOS" />
        <Etq T={T} at={K.Rapido + 0.4} until={K.Rapido + 2.0} x={600} y={640} texto="negro" color={KC.texto} tam={34} />
        <Etq T={T} at={K.Rapido + 2.6} until={K.Cierre - 0.1} x={760} y={980} lado="izq" texto="línea de colores" color={KC.texto} tam={32} />
      </Escena>
      {/* 11 · cierre: la misma órbita del inicio, ahora contada: tú 1, ellos 16 */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={-0.03}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} />
          <SolDibujo x={40} y={960} r={60} T={T} />
          <OrbitaInclinada T={T} a={aG(T)} lon0={lonT} id="gc" />
          <TarjetaCuenta x={60} y={350} w={330} h={380} titulo="tú" e={kprog(T, K.Cierre + 0.2, K.Cierre + 0.7, kEase.sale)}>
            <SolMini x={165} y={150} r={40} />
            <TextoSvg x={165} y={330} tam={150} color={KC.yellow}>1</TextoSvg>
          </TarjetaCuenta>
          <TarjetaCuenta x={420} y={350} w={600} h={380} titulo="en la estación" e={kprog(T, K.Cierre + 1.2, K.Cierre + 1.7, kEase.sale)}>
            <TiraSoles x={86} y={110} n={16 * kprog(T, K.Cierre + 1.4, K.Cierre + 2.8)} paso={61} r={17} />
            <TextoSvg x={300} y={340} tam={130} color={KC.pink}>≈ 16</TextoSvg>
          </TarjetaCuenta>
        </Lienzo>
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Velocidad - 0.1} texto="*≈ 16 amaneceres* cada día" />
      <Subtitulo T={T} idx={1} at={K.Velocidad + 0.1} until={K.Vuelta - 0.1} texto="Viaja a *≈ 28,000 km/h*" />
      <Subtitulo T={T} idx={2} at={K.Vuelta + 0.1} until={K.Dia - 0.1} texto="Una vuelta en *≈ 90 minutos*" />
      <Subtitulo T={T} idx={3} at={K.Dia + 0.1} until={K.Cuenta - 0.1} texto="Del día a la noche: *amanecer y atardecer*" />
      <Subtitulo T={T} idx={4} at={K.Cuenta + 0.1} until={K.Altura - 0.1} texto="24 h ÷ 90 min: *≈ 16 vueltas*" />
      <Subtitulo T={T} idx={5} at={K.Altura + 0.1} until={K.Pregunta - 0.1} texto="Va cerca: *≈ 400 km de altura*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.05} until={K.Horario - 0.05} texto="¿Y cómo *duermen?*" />
      <Subtitulo T={T} idx={7} at={K.Horario + 0.1} until={K.Ventanas - 0.1} texto="Horario fijo: *hora de Greenwich*" />
      <Subtitulo T={T} idx={8} at={K.Ventanas + 0.1} until={K.Ejercicio - 0.1} texto="Persianas y *luces que cambian de tono*" />
      <Subtitulo T={T} idx={9} at={K.Ejercicio + 0.1} until={K.Rapido - 0.1} texto="*≈ 2 horas* de ejercicio al día" />
      <Subtitulo T={T} idx={10} at={K.Rapido + 0.1} until={K.Cierre - 0.1} texto="Cada amanecer: *unos segundos*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tú ves uno; *ellos, dieciséis*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Velocidad + 0.8, K.Vuelta + 0.6, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Dia + 0.6, K.Dia + 4.6, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cuenta + 2.2, K.Altura + 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Altura + 2.6, K.Pregunta - 0.15, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Horario + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ventanas + 2.6, K.Ejercicio + 0.6, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Ejercicio + 3.6, K.Rapido - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Rapido + 1.4, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.8, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="44" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function IssApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Iss /></CompositionStage></div>;
}
window.IssApp = IssApp;
