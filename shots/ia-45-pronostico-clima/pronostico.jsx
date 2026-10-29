// Shot IA #45 · La IA que hace el pronóstico de 10 días en menos de un minuto — NARRADO (N2 "El número" + N3 "Capítulos y medidores").
// Datos: Lam et al., "Learning skillful medium-range global weather forecasting", Science 382:1416–1421 (2023) · ECMWF (25 feb 2025, AIFS) · CENAPRED (2026).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const AZUL = '#2f6dff';
const SVGF = ({ children, z }) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;

/* ---------- íconos del tiempo ---------- */
function Sol({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 20})`}>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-34} x2={0} y2={-48} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}
    <circle r={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Nube({ x, y, s = 1, color = '#fff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -44 18 Q -62 18 -60 0 Q -58 -18 -38 -16 Q -32 -40 -6 -38 Q 18 -40 24 -18 Q 48 -22 52 0 Q 56 18 36 18 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
function Lluvia({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-26, 0, 26].map((dx, i) => { const u = ((T * 1.6 + i * 0.33) % 1); return <line key={i} x1={dx - 4} y1={22 + u * 26} x2={dx - 10} y2={36 + u * 26} stroke={AZUL} strokeWidth={6} strokeLinecap="round" opacity={1 - u} />; })}
    <Nube x={0} y={-6} color="#cfd8e6" />
  </g>;
}
const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D', 'L', 'M', 'M'];
const CLIMA = ['sol', 'nube', 'lluvia', 'lluvia', 'nube', 'sol', 'sol', 'nube', 'lluvia', 'sol'];
// Tira de 10 días. rev: cuántos días se ven (0..10, admite fracción).
function TiraClima({ T, x = 60, y = 880, w = 960, rev = 10, fondo = KC.paper }) {
  const cw = w / 10;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-10} y={-20} width={w + 20} height={190} rx={26} fill={fondo} stroke={KC.ink} strokeWidth={7} />
    {DIAS.map((d, i) => { const e = kclamp(rev - i, 0, 1); if (e <= 0) return null; const cx = cw * i + cw / 2;
      return <g key={i} opacity={e} transform={`translate(0 ${(1 - e) * 20})`}>
        <text x={cx} y={20} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{d}</text>
        {CLIMA[i] === 'sol' && <Sol x={cx} y={82} s={0.62} T={T} />}
        {CLIMA[i] === 'nube' && <Nube x={cx} y={84} s={0.66} />}
        {CLIMA[i] === 'lluvia' && <Lluvia x={cx} y={78} s={0.62} T={T} />}
        <text x={cx} y={150} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">{CLIMA[i] === 'sol' ? '28°' : CLIMA[i] === 'nube' ? '24°' : '19°'}</text>
      </g>; })}
  </g>;
}

/* ---------- máquinas ---------- */
// Rack de supercomputadora: torres con lucecitas que parpadean.
function Rack({ x, y, s = 1, T = 0, n = 4 }) {
  const r = krng(7);
  const leds = Array.from({ length: n * 18 }, () => r());
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, k) => <g key={k} transform={`translate(${k * 112} 0)`}>
      <rect x={0} y={0} width={100} height={380} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 18 }, (_, j) => { const v = leds[k * 18 + j], on = Math.sin(T * (4 + v * 9) + v * 20) > 0.1;
        return <g key={j}><rect x={12} y={14 + j * 20} width={76} height={12} rx={3} fill="#1a2030" />
          <circle cx={78} cy={20 + j * 20} r={4} fill={on ? (v > 0.7 ? KC.mint : KC.cyan) : '#3b4558'} /></g>; })}
    </g>)}
  </g>;
}
// Chip TPU con patitas y resplandor.
function ChipIA({ x, y, s = 1, T = 0, brillo = 1 }) {
  const g = 0.5 + 0.5 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={150} fill={KC.mint} opacity={0.18 * brillo * (0.6 + 0.4 * g)} />
    {Array.from({ length: 6 }, (_, i) => <g key={i}>
      <line x1={-75 + i * 30} y1={-95} x2={-75 + i * 30} y2={-120} stroke={KC.ink} strokeWidth={8} />
      <line x1={-75 + i * 30} y1={95} x2={-75 + i * 30} y2={120} stroke={KC.ink} strokeWidth={8} />
      <line x1={-95} y1={-75 + i * 30} x2={-120} y2={-75 + i * 30} stroke={KC.ink} strokeWidth={8} />
      <line x1={95} y1={-75 + i * 30} x2={120} y2={-75 + i * 30} stroke={KC.ink} strokeWidth={8} />
    </g>)}
    <rect x={-100} y={-100} width={200} height={200} rx={22} fill="#1d2b4a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-66} y={-66} width={132} height={132} rx={12} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
    <text y={18} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill={KC.ink}>IA</text>
  </g>;
}
// Barra de carrera: etiqueta, barra que se llena y lo que tardó.
function Carrera({ T, at, until, y, etiqueta, p, color, fin, top = 0 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), v = kclamp(p, 0, 1);
  return <div style={{ position:'absolute', left:70, top:y, width:940, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.4}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', font:`900 34px ${KF.texto}`, color:KC.ink, marginBottom:8 }}>
      <span>{etiqueta}</span><span style={{ font:`400 46px ${KF.titulo}`, color, WebkitTextStroke:`2px ${KC.ink}` }}>{fin}</span>
    </div>
    <div style={{ height:52, borderRadius:26, background:'rgba(255,255,255,.75)', border:`6px solid ${KC.ink}`, overflow:'hidden' }}>
      <div style={{ width:`${v * 100}%`, height:'100%', background:color, borderRight: v > 0 && v < 1 ? `6px solid ${KC.ink}` : 'none' }}></div>
    </div>
  </div>;
}
// Reloj de time-lapse que corre hasta `hasta` segundos simulados.
function Reloj({ T, at, until, x, y, seg, color = KC.texto, etiqueta }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), s = Math.max(0, seg);
  const hh = Math.floor(s / 3600), mm = Math.floor(s / 60) % 60, ss = Math.floor(s) % 60, f2 = (n) => String(n).padStart(2, '0');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`900 26px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{etiqueta}</div>}
    <div style={{ font:`700 58px ${KF.mono}`, color, background:'#10131a', border:`5px solid ${KC.ink}`, borderRadius:16, padding:'4px 20px' }}>{f2(hh)}:{f2(mm)}:{f2(ss)}</div>
  </div>;
}

/* ---------- planeta y mapas ---------- */
// Globo con meridianos que giran y malla de triángulos (como la malla de GraphCast, esquemática).
function Globo({ x, y, r = 300, T = 0, malla = 1, rejilla = 0, paso = 10 }) {
  const rot = (T * 18) % 30;
  const mer = [];
  for (let k = -90; k <= 90; k += 30) { const a = ((k + rot) * Math.PI) / 180; if (Math.abs(a) > Math.PI / 2) continue; mer.push(<ellipse key={'m' + k} cx={0} cy={0} rx={Math.abs(Math.sin(a)) * r} ry={r} fill="none" stroke="rgba(22,18,15,.35)" strokeWidth={3} />); }
  const par = [-60, -30, 0, 30, 60].map((l) => { const yy = r * Math.sin((l * Math.PI) / 180), w = r * Math.cos((l * Math.PI) / 180); return <ellipse key={'p' + l} cx={0} cy={yy} rx={w} ry={w * 0.12} fill="none" stroke="rgba(22,18,15,.3)" strokeWidth={3} />; });
  const tri = [];
  if (malla > 0) { const n = 7; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const px = -r + (2 * r * (i + (j % 2) * 0.5)) / n, py = -r + (2 * r * j) / n, d = r * 2 / n;
    if (px * px + py * py > r * r * 0.82) continue;
    tri.push(<path key={'t' + i + '-' + j} d={`M ${px} ${py} L ${px + d} ${py} L ${px + d / 2} ${py + d} Z`} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={malla * 0.9} />); } }
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="clipGlobo"><circle r={r} /></clipPath></defs>
    <circle r={r} fill="#3aa0ff" stroke={KC.ink} strokeWidth={9} />
    <g clipPath="url(#clipGlobo)">
      <g transform={`translate(${-rot * 6} 0)`}>
        {[[-200, -120, 150, 110], [60, -60, 120, 170], [-120, 120, 110, 90], [220, 140, 130, 80], [420, -40, 140, 150], [-420, 40, 140, 120]].map(([cx, cy, rx, ry], i) =>
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 23} ${cx} ${cy})`} />)}
      </g>
      {mer}{par}
      {rejilla > 0 && <g opacity={rejilla}>{Array.from({ length: Math.ceil((2 * r) / paso) + 1 }, (_, i) => <g key={'g' + i}>
        <line x1={-r + i * paso} y1={-r} x2={-r + i * paso} y2={r} stroke={KC.ink} strokeWidth={2} opacity=".55" />
        <line x1={-r} y1={-r + i * paso} x2={r} y2={-r + i * paso} stroke={KC.ink} strokeWidth={2} opacity=".55" /></g>)}</g>}
      {tri}
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-r * 0.35} cy={-r * 0.45} rx={r * 0.22} ry={r * 0.12} fill="#fff" opacity=".35" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.45})`} />
  </g>;
}
// Hoja de mapa del tiempo pasado (reanálisis): manchas de colores e isobaras, con su año.
function HojaMapa({ x, y, s = 1, anio, seed = 1, rot = 0, o = 1 }) {
  const r = krng(seed);
  const manchas = Array.from({ length: 4 }, () => [r() * 200 - 100, r() * 110 - 55, 30 + r() * 40, [KC.red, KC.orange, KC.cyan, AZUL][Math.floor(r() * 4)]]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-140} y={-100} width={280} height={200} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {manchas.map(([mx, my, mr, c], i) => <g key={i}><circle cx={mx} cy={my} r={mr} fill={c} opacity=".55" /><circle cx={mx} cy={my} r={mr * 0.6} fill="none" stroke={KC.ink} strokeWidth={2.5} opacity=".6" /></g>)}
    <path d="M -120 40 Q -60 10 0 30 T 120 20" stroke={KC.ink} strokeWidth={3} fill="none" opacity=".5" />
    {anio && <g><rect x={-60} y={58} width={120} height={36} rx={10} fill={KC.ink} /><text y={86} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.yellow}>{anio}</text></g>}
  </g>;
}
// Parche de terreno con una cuadrícula encima: paso grande = menos detalle.
function Parche({ x, y, w = 420, h = 420, paso, color = KC.mint, id }) {
  const cols = Math.round(w / paso);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><rect width={w} height={h} rx={20} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect width={w} height={h} fill="#3aa0ff" />
      <path d={`M 0 ${h * 0.35} Q ${w * 0.3} ${h * 0.15} ${w * 0.55} ${h * 0.3} T ${w} ${h * 0.25} L ${w} ${h} L 0 ${h} Z`} fill={KC.leaf} />
      <path d={`M ${w * 0.15} ${h} Q ${w * 0.3} ${h * 0.6} ${w * 0.5} ${h * 0.7} T ${w * 0.9} ${h * 0.55} L ${w} ${h} Z`} fill="#2e9a3a" />
      <path d={`M ${w * 0.55} ${h * 0.62} l ${w * 0.08} ${-h * 0.16} l ${w * 0.08} ${h * 0.16} Z M ${w * 0.66} ${h * 0.62} l ${w * 0.07} ${-h * 0.12} l ${w * 0.07} ${h * 0.12} Z`} fill="#8b6b4a" stroke={KC.ink} strokeWidth={3} />
      {Array.from({ length: cols + 1 }, (_, i) => <g key={i}>
        <line x1={i * paso} y1={0} x2={i * paso} y2={h} stroke={color} strokeWidth={paso > 60 ? 6 : 3} />
        <line x1={0} y1={i * paso} x2={w} y2={i * paso} stroke={color} strokeWidth={paso > 60 ? 6 : 3} /></g>)}
    </g>
    <rect width={w} height={h} rx={20} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Ciclón (espiral que gira).
function Ciclon({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${-T * 160})`}>
    {[0, 120, 240].map((a) => <path key={a} d="M 0 0 C 40 -10 70 -50 60 -100 C 55 -130 20 -150 -20 -150" stroke="#fff" strokeWidth={26} fill="none" strokeLinecap="round" opacity=".92" transform={`rotate(${a})`} />)}
    {[0, 120, 240].map((a) => <path key={'b' + a} d="M 0 0 C 40 -10 70 -50 60 -100 C 55 -130 20 -150 -20 -150" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" opacity=".35" transform={`rotate(${a})`} />)}
    <circle r={20} fill={AZUL} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Satélite.
function Satelite({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 8}) scale(${s}) rotate(-18)`}>
    <rect x={-150} y={-30} width={95} height={60} fill={AZUL} stroke={KC.ink} strokeWidth={6} />
    <rect x={55} y={-30} width={95} height={60} fill={AZUL} stroke={KC.ink} strokeWidth={6} />
    {[-118, -86, 88, 120].map((lx) => <line key={lx} x1={lx} y1={-30} x2={lx} y2={30} stroke={KC.ink} strokeWidth={3} />)}
    <line x1={-55} y1={0} x2={55} y2={0} stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-45} width={80} height={90} rx={12} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={58} r={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Estación meteorológica (veleta y anemómetro).
function Estacion({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={0} y1={0} x2={0} y2={-220} stroke={KC.ink} strokeWidth={9} />
    <rect x={-50} y={-90} width={100} height={70} rx={6} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {[-70, -56, -42].map((ly) => <line key={ly} x1={-40} y1={ly} x2={40} y2={ly} stroke={KC.ink} strokeWidth={3} />)}
    <g transform={`translate(0 -220) rotate(${T * 400})`}>{[0, 120, 240].map((a) => <g key={a} transform={`rotate(${a})`}><line x1={0} y1={0} x2={50} y2={0} stroke={KC.ink} strokeWidth={5} /><circle cx={56} cy={0} r={13} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>)}</g>
    <rect x={-70} y={-6} width={140} height={14} rx={6} fill="#8b6b4a" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Caja "modelo de física" con ecuaciones esquemáticas.
function CajaFisica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-90} width={300} height={180} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <text y={-28} textAnchor="middle" style={{ font:`italic 700 38px ${KF.mono}` }} fill={KC.ink}>∂u/∂t = …</text>
    <text y={22} textAnchor="middle" style={{ font:`italic 700 34px ${KF.mono}` }} fill="#5a524a">F = m·a</text>
    <text y={68} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>modelo de física</text>
  </g>;
}
// Monitor con un mapa y un rótulo.
function Monitor({ x, y, s = 1, T = 0, rotulo, color, ia = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-150} width={400} height={290} rx={22} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-176} y={-126} width={352} height={210} rx={12} fill="#0d1424" />
    <g transform="translate(0 -20) scale(0.95)"><HojaMapa x={0} y={0} s={1} seed={ia ? 5 : 9} /></g>
    {ia ? <g opacity=".9">{[0, 1, 2].map((k) => <circle key={k} cx={-120 + k * 120} cy={70} r={10} fill={k === Math.floor(T * 3) % 3 ? KC.mint : '#3b4558'} />)}</g>
      : <text x={0} y={80} textAnchor="middle" style={{ font:`italic 700 26px ${KF.mono}` }} fill={KC.gold2}>∂u/∂t = …</text>}
    <rect x={-30} y={140} width={60} height={50} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={186} width={240} height={22} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
    <g transform="translate(0 -196)"><rect x={-150} y={-34} width={300} height={68} rx={34} fill={color} stroke={KC.ink} strokeWidth={6} />
      <text y={14} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{rotulo}</text></g>
  </g>;
}
// Flecha que se dibuja de (x1,y1) a (x2,y2).
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.yellow }) {
  if (p <= 0) return null;
  const xe = klerp(x1, x2, p), ye = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  return <g>
    <line x1={x1} y1={y1} x2={xe} y2={ye} stroke={color} strokeWidth={10} strokeLinecap="round" strokeDasharray="22 16" />
    {p > 0.95 && <path d="M 0 0 L -30 -18 L -30 18 Z" fill={color} stroke={KC.ink} strokeWidth={4} transform={`translate(${x2} ${y2}) rotate(${(a * 180) / Math.PI})`} />}
  </g>;
}
// Celular con la tira de 10 días (cierre).
function Celular({ T, x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-420} width={600} height={840} rx={70} fill="#10131a" stroke={KC.ink} strokeWidth={12} />
    <rect x={-270} y={-380} width={540} height={760} rx={44} fill="#bfe8ff" />
    <rect x={-80} y={-404} width={160} height={26} rx={13} fill={KC.ink} />
    {children}
  </g>;
}
// Trayectoria parcial (polilínea que se dibuja hasta p).
function Traza({ pts, p, color, ancho = 10, guion }) {
  const n = pts.length - 1, k = p * n, i = Math.floor(k), f = k - i;
  const vis = pts.slice(0, i + 1);
  if (i < n) vis.push([klerp(pts[i][0], pts[i + 1][0], f), klerp(pts[i][1], pts[i + 1][1], f)]);
  if (vis.length < 2) return null;
  return <polyline points={vis.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={guion} />;
}

function Pronostico() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, A: CUES.Aprende, Cu: CUES.Cuadritos, P: CUES.Pregunta, Pr: CUES.Prueba, Ci: CUES.Ciclones, Eu: CUES.Europa, O: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const iaAt = K.G + 5.8;                                                   // "Esta IA…"
  const pSuper = kprog(T, K.G + 0.2, K.E - 0.3);                            // la supercomputadora avanza todo el gancho
  const pIA = kprog(T, iaAt + 0.4, iaAt + 1.4, kEase.sale);                 // la IA termina en ~1 s
  const segSuper = 3540 * pSuper;                                           // time-lapse hasta ~59 min ("casi una hora")
  const segIA = 55 * pIA;                                                   // < 1 min
  const pasos = Math.round(40 * kprog(T, K.Cu + 4.4, K.Cu + 7.4));          // 40 pasos de 6 h = 10 días
  const verdes = kprog(T, K.Pr + 1.0, K.Pr + 3.6, kEase.suave) * 0.9;       // 90 % de 1,380
  const trayReal = [[140, 1060], [260, 960], [380, 880], [500, 820], [640, 770], [780, 740], [930, 720]];
  const trayIA = [[140, 1060], [262, 968], [388, 892], [512, 836], [652, 790], [790, 764], [940, 748]];
  const trayHRES = [[140, 1060], [268, 985], [400, 925], [530, 885], [670, 860], [810, 850], [950, 846]];
  const pTray = kprog(T, K.Ci + 0.3, K.Ci + 2.4, kEase.suave);
  const ciPt = (() => { const n = trayReal.length - 1, k = pTray * n, i = Math.min(n - 1, Math.floor(k)), f = k - i; return [klerp(trayReal[i][0], trayReal[i + 1][0], f), klerp(trayReal[i][1], trayReal[i + 1][1], f)]; })();
  const mx = K.Ci + 2.5;                                                    // "A México le pegan…"
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la supercomputadora contra el chip */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.cyan} />
        <SVGF>
          <g opacity={1 - 0.55 * kprog(T, iaAt, iaAt + 0.5)}><Rack x={70} y={350} s={0.98} T={T} n={4} /></g>
          <g opacity={kprog(T, iaAt - 0.1, iaAt + 0.3)} transform={`translate(0 ${(1 - kprog(T, iaAt - 0.1, iaAt + 0.4, kEase.sale)) * 120})`}><ChipIA x={800} y={520} s={0.95} T={T} brillo={pIA} /></g>
        </SVGF>
      </Escena>
      <Chip T={T} at={K.G + 0.6} until={K.E - 0.2} texto="usando 11,664 núcleos" x={300} y={790} tam={34} borde={KC.ink} />
      <Reloj T={T} at={K.G + 0.2} until={K.E - 0.2} x={300} y={300} seg={segSuper} color={KC.cyan} />
      <Reloj T={T} at={iaAt} until={K.E - 0.2} x={800} y={300} seg={segIA} color={KC.mint} />
      <Carrera T={T} at={K.G + 0.15} until={K.E - 0.2} y={880} etiqueta="supercomputadora · 10 días" p={pSuper} color={KC.orange} fin={pSuper > 0.97 ? '≈ 1 h' : '…'} />
      <Carrera T={T} at={iaAt + 0.2} until={K.E - 0.2} y={1040} etiqueta="IA en 1 chip · 10 días" p={pIA} color={KC.mint} fin={pIA >= 1 ? '< 1 min ✔' : '…'} />

      {/* 2 · el estudio */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.lilac} />
        <SVGF><Globo x={540} y={1010} r={250} T={T} malla={kprog(T, K.E + 0.8, K.E + 1.6)} /></SVGF>
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.A - 0.3} anio="2023" quien="GraphCast · Google DeepMind" revista="Lam et al. · Science" y={560} />

      {/* 3 · aprende de mapas del tiempo pasado */}
      <Escena T={T} a={K.A} b={K.Cu}>
        <FondoLunares color={KC.mint} />
        <SVGF><rect x={290} y={880} width={500} height={260} rx={30} fill="#0d1424" stroke={KC.ink} strokeWidth={8} /></SVGF>
        <RedNeuronal T={T} x={330} y={895} ancho={420} alto={230} capas={[3, 5, 5, 3]} onda={((T - K.A) * 0.6) % 1} />
        <SVGF>
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.A + 0.3 + i * 0.55, u = kprog(T, t0, t0 + 1.2, kEase.suave);
            const anios = ['1979', '1987', '1995', '2003', '2010', '2017'];
            return <HojaMapa key={i} x={klerp(250, 540, u)} y={klerp(640 + i * 4, 1010, u)} s={klerp(0.95, 0.25, u)} rot={klerp(-8 + i * 3, 0, u)} anio={anios[i]} seed={i + 2} o={u >= 1 ? 0 : 1} />; })}
        </SVGF>
      </Escena>
      <Chip T={T} at={K.A + 0.4} until={K.Cu - 0.2} texto="39 años · 1979 → 2017" x={380} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.A + 2.6} until={K.Cu - 0.2} texto="mapas reconstruidos · ERA5 (ECMWF)" x={370} y={560} tam={26} borde={KC.ink} />

      {/* 4 · cuadritos más grandes */}
      <Escena T={T} a={K.Cu} b={K.P}>
        <FondoLunares color={KC.yellow} />
        <SVGF>
          <g opacity={kprog(T, K.Cu + 0.2, K.Cu + 0.6)}><Parche x={70} y={650} w={430} h={400} paso={86} color={KC.mint} id="pIA" /></g>
          <g opacity={kprog(T, K.Cu + 2.0, K.Cu + 2.4)}><Parche x={580} y={650} w={430} h={400} paso={34.4} color={KC.red} id="pSC" /></g>
        </SVGF>
      </Escena>
      <Chip T={T} at={K.Cu + 0.4} until={K.P - 0.2} texto="IA · ≈ 28 km" x={285} y={1095} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Cu + 2.2} until={K.P - 0.2} texto="supercomputadora · ≈ 11 km" x={795} y={1095} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Cu + 2.6} until={K.Cu + 4.3} texto="más detalle ↓" x={795} y={590} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Cu + 4.4} until={K.P - 0.2} texto={`+6 h × ${pasos} = ${kformato(pasos * 6 / 24, 1)} días`} x={650} y={560} tam={38} mono borde={KC.ink} />
      <Chip T={T} at={K.Cu + 0.4} until={K.Cu + 2.0} texto="esquemático · en el ecuador" x={285} y={590} tam={26} borde={KC.texto} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        <SVGF><text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text></SVGF>
      </Escena>

      {/* 6 · la prueba: 90 % de 1,380 */}
      <Escena T={T} a={K.Pr} b={K.Ci}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      {T > K.Pr - 0.45 && T < K.Ci + 0.45 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.Pr - 0.2, K.Pr + 0.3) * (1 - kprog(T, K.Ci - 0.05, K.Ci + 0.4)) }}>
        <Cuadricula T={T} cols={46} filas={30} llenado={verdes} x={90} y={680} ancho={900} alto={420} vacio="rgba(22,18,15,.14)" lleno={KC.leaf} />
      </div>}
      <Chip T={T} at={K.Pr + 0.3} until={K.Ci - 0.2} texto="1,380 pruebas · contra HRES (ECMWF)" x={380} y={470} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Pr + 3.0} until={K.Ci - 0.2} valor={90} dur={0.6} sufijo=" %" x={540} y={890} tam={220} color={KC.leaf} etiqueta="" />

      {/* 7 · ciclones (esquemático) y México */}
      <Escena T={T} a={K.Ci} b={K.Eu}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2a7fd6, #1b5fb0)' }}></div>
        <SVGF>
          <g opacity={1 - kprog(T, mx - 0.1, mx + 0.4)}>
            <Traza pts={trayReal} p={pTray} color="#fff" ancho={9} guion="18 14" />
            <Traza pts={trayHRES} p={pTray} color={KC.pink} ancho={10} />
            <Traza pts={trayIA} p={pTray} color={KC.mint} ancho={10} />
            <Ciclon x={ciPt[0]} y={ciPt[1]} s={0.75} T={T} />
          </g>
          <g opacity={kprog(T, mx, mx + 0.5)}>
            <MapaMexico x={60} y={540} ancho={960} />
            <Flecha x1={140} y1={1060} x2={420} y2={880} p={kprog(T, mx + 0.3, mx + 0.9)} color={KC.yellow} />
            <Flecha x1={1010} y1={980} x2={830} y2={790} p={kprog(T, mx + 0.6, mx + 1.2)} color={KC.yellow} />
          </g>
        </SVGF>
      </Escena>
      <Chip T={T} at={K.Ci + 0.3} until={mx - 0.1} texto="esquemático · ciclones de todo el mundo" x={540} y={470} tam={30} borde={KC.texto} />
      <Etq T={T} at={K.Ci + 1.0} until={mx - 0.1} x={140} y={1110} texto="real" color="#fff" />
      <Etq T={T} at={K.Ci + 1.2} until={mx - 0.1} x={140} y={1155} texto="IA" color={KC.mint} />
      <Etq T={T} at={K.Ci + 1.4} until={mx - 0.1} x={140} y={1200} texto="supercomputadora" color={KC.pink} />
      <Chip T={T} at={mx + 0.4} until={K.Eu - 0.2} texto="≈ 5 ciclones al año" x={400} y={470} tam={40} borde={KC.yellow} />
      <Chip T={T} at={mx + 0.9} until={K.Eu - 0.2} texto="3 Pacífico" x={250} y={1140} tam={32} borde={KC.yellow} />
      <Chip T={T} at={mx + 1.2} until={K.Eu - 0.2} texto="2 Golfo y Caribe" x={830} y={1140} tam={32} borde={KC.yellow} />

      {/* 8 · el centro europeo ya usa su IA */}
      <Escena T={T} a={K.Eu} b={K.O}>
        <FondoLunares color={KC.lilac} />
        <SVGF>
          <g opacity={kprog(T, K.Eu + 2.0, K.Eu + 2.4)}><Monitor x={290} y={910} s={0.98} T={T} rotulo="IFS · física" color={KC.orange} /></g>
          <g opacity={kprog(T, K.Eu + 2.5, K.Eu + 2.9)}><Monitor x={790} y={910} s={0.98} T={T} rotulo="AIFS · IA" color={KC.mint} ia /></g>
        </SVGF>
      </Escena>
      <TarjetaEstudio T={T} at={K.Eu + 0.15} until={K.Eu + 1.8} anio="2025" quien="ECMWF · AIFS en operación" revista="25 de febrero de 2025" y={620} />
      <Chip T={T} at={K.Eu + 2.4} until={K.O - 0.2} texto="lado a lado · desde el 25 feb 2025" x={640} y={560} tam={30} borde={KC.ink} />

      {/* 9 · ojo: arrancan de mediciones */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoCircuito T={T} />
        <SVGF>
          <g opacity={kprog(T, K.O + 0.4, K.O + 0.8) * (1 - kprog(T, K.O + 4.3, K.O + 4.7))}><Satelite x={220} y={480} s={0.8} T={T} /></g>
          <g opacity={kprog(T, K.O + 0.9, K.O + 1.3)}><Estacion x={540} y={640} s={0.85} T={T} /></g>
          <g opacity={kprog(T, K.O + 2.2, K.O + 2.6)}><CajaFisica x={840} y={500} s={0.75} /></g>
          <Flecha x1={250} y1={580} x2={460} y2={790} p={kprog(T, K.O + 1.4, K.O + 2.0)} color={KC.cyan} />
          <Flecha x1={540} y1={660} x2={540} y2={770} p={kprog(T, K.O + 1.6, K.O + 2.1)} color={KC.cyan} />
          <Flecha x1={820} y1={580} x2={630} y2={790} p={kprog(T, K.O + 2.6, K.O + 3.1)} color={KC.gold2} />
          <g opacity={kprog(T, K.O + 2.0, K.O + 2.4)}><HojaMapa x={540} y={880} s={0.9} seed={11} /></g>
          <Flecha x1={690} y1={880} x2={790} y2={880} p={kprog(T, K.O + 3.6, K.O + 4.0)} color={KC.yellow} />
          <g opacity={kprog(T, K.O + 3.8, K.O + 4.2)}><ChipIA x={900} y={880} s={0.42} T={T} /></g>
        </SVGF>
      </Escena>
      <Chip T={T} at={K.O + 0.9} until={K.O + 4.6} texto="mediciones" x={540} y={400} tam={32} borde={KC.cyan} />
      <MitoTachado T={T} at={K.O + 5.6} tacharEn={K.O + 6.6} until={K.C - 0.2} texto="«ya no hacen falta mediciones»" x={540} y={1060} tam={36} />

      {/* 10 · cierre: el mismo pronóstico, en tu celular */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        <SVGF>
          <Celular T={T} x={540} y={930} s={0.75}>
            <text x={0} y={-300} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Pronóstico · 10 días</text>
            <g transform="translate(-255 -220) scale(0.53)"><TiraClima T={T} x={0} y={0} w={960} rev={10} /></g>
            <g transform="translate(-255 -40) scale(0.53)"><TiraClima T={T + 1} x={0} y={0} w={960} rev={10} fondo="#fff" /></g>
            <g opacity={kprog(T, K.C + 2.4, K.C + 2.8)}>
              <rect x={-240} y={120} width={225} height={200} rx={24} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
              <text x={-128} y={190} textAnchor="middle" style={{ font:`900 20px ${KF.texto}` }} fill={KC.texto}>supercomputadora</text>
              <text x={-128} y={270} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.orange}>≈ 1 h</text>
              <rect x={15} y={120} width={225} height={200} rx={24} fill="#1d2b4a" stroke={KC.ink} strokeWidth={6} />
              <text x={128} y={190} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.texto}>IA</text>
              <text x={128} y={270} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.mint}>&lt; 1 min</text>
            </g>
          </Celular>
        </SVGF>
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={iaAt - 0.1} texto="Supercomputadora: *casi una hora.*" />
      <Subtitulo T={T} idx={1} at={iaAt} until={K.E - 0.1} texto="Esta IA: *menos de un minuto.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.A - 0.1} texto="GraphCast · *Science, 2023*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Cu - 0.1} texto="Aprendió de *39 años* de mapas del tiempo" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.P - 0.1} texto="Cuadritos *más grandes*, de 6 en 6 horas" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Solo rápida, o *le atina?*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ci - 0.1} texto="Mejor en el *90 %* de 1,380 pruebas" />
      <Subtitulo T={T} idx={7} at={K.Ci + 0.1} until={K.Eu - 0.1} texto="Mejor con *los ciclones*" />
      <Subtitulo T={T} idx={8} at={K.Eu + 0.1} until={K.O - 0.1} texto="Europa ya usa *su propia IA*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.C - 0.1} texto="Arranca de mediciones: *no las reemplaza*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una hora… *o un minuto*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Aprende + 2.0, CUES.Cuadritos - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cuadritos + 4.6, CUES.Pregunta - 0.15, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Prueba + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Prueba + 3.6, CUES.Ciclones - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Ciclones + 2.9, CUES.Europa + 1.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Europa + 2.4, CUES.Ojo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Ojo + 4.8, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="45" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PronosticoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pronostico /></CompositionStage></div>;
}
window.PronosticoApp = PronosticoApp;
