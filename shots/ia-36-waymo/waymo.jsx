// Shot IA #36 · Tú contra el auto sin conductor — NARRADO (N2 "El número").
// Datos: Waymo Safety Impact Hub (hasta junio 2026); Di Lillo et al. (Swiss Re + Waymo, preprint dic 2024); NHTSA recall 25E084000 (dic 2025);
// OMS, hoja "Road traffic injuries" (jul 2026). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const ASFALTO = '#3a3f4b', BLANCO = '#fbfaf5';

// Auto visto de lado (mira a la derecha). humano = conductor visible; si no, asiento vacío y sensor giratorio en el techo.
function Auto({ x, y, s = 1, T = 0, color = KC.red, humano = true, vel = 1, o = 1 }) {
  const giro = T * 600 * vel, b = Math.sin(T * 9 + x * 0.01) * 2 * vel;
  const Rueda = ({ cx }) => <g transform={`translate(${cx} 62)`}>
    <circle r={44} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} /><circle r={22} fill="#c9ccd3" stroke={KC.ink} strokeWidth={5} />
    <g transform={`rotate(${giro})`}>{[0, 60, 120].map((a) => <line key={a} x1={-20} y1={0} x2={20} y2={0} transform={`rotate(${a})`} stroke={KC.ink} strokeWidth={4} />)}</g>
  </g>;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={108} rx={210} ry={14} fill="rgba(0,0,0,.25)" />
    <path d="M -205 50 L -205 0 Q -200 -22 -170 -26 L -120 -30 L -80 -92 Q -70 -104 -50 -104 L 70 -104 Q 92 -104 104 -88 L 140 -30 L 182 -22 Q 206 -16 206 10 L 206 50 Q 206 64 192 64 L -192 64 Q -205 64 -205 50 Z"
      fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -66 -36 L -38 -86 L 4 -86 L 4 -36 Z" fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 18 -36 L 18 -86 L 66 -86 Q 76 -86 82 -76 L 106 -36 Z" fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {humano ? <g><circle cx={58} cy={-58} r={17} fill="#f1b48f" stroke={KC.ink} strokeWidth={4} /><path d="M 42 -66 Q 58 -84 74 -66" fill="#3b2a1e" stroke={KC.ink} strokeWidth={3} />
      <line x1={70} y1={-44} x2={92} y2={-38} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" /></g>
      : <g><path d="M 40 -40 L 46 -74 L 58 -74 L 54 -40 Z" fill="#8a8f9c" stroke={KC.ink} strokeWidth={3} /><circle cx={92} cy={-40} r={9} fill="none" stroke={KC.ink} strokeWidth={4} /></g>}
    <line x1={8} y1={-30} x2={8} y2={52} stroke={KC.ink} strokeWidth={4} opacity=".6" />
    <rect x={186} y={-8} width={18} height={14} rx={4} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
    <rect x={-204} y={-6} width={14} height={14} rx={4} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
    {!humano && <g transform="translate(0 -104)">
      <rect x={-34} y={-14} width={68} height={14} rx={4} fill="#d6d9e0" stroke={KC.ink} strokeWidth={5} />
      <path d="M -28 -14 L -24 -52 Q 0 -64 24 -52 L 28 -14 Z" fill="#e9ebf0" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <rect x={-22 + ((T * 70) % 40)} y={-44} width={8} height={26} rx={3} fill={KC.cyan} opacity=".85" />
      <circle cx={-194} cy={96} r={0} />
    </g>}
    {!humano && <g opacity={0.35 + 0.25 * Math.sin(T * 6)}>{[1, 2, 3].map((k) => <path key={k} d={`M ${30 + k * 18} -140 a ${k * 22} ${k * 22} 0 0 1 0 ${k * 30}`} transform={`translate(${-10} 0)`} fill="none" stroke={KC.cyan} strokeWidth={5} strokeLinecap="round" />)}</g>}
    <Rueda cx={-120} /><Rueda cx={124} />
  </g>;
}
// Calle de dos carriles (rayas que corren). y0..y1 = bordes.
function Calle({ T, y0 = 760, y1 = 1180, vel = 1, carriles = 2 }) {
  const off = -((T * 520 * vel) % 160), rayas = [];
  for (let c = 1; c < carriles; c++) { const yy = y0 + (y1 - y0) * c / carriles;
    for (let k = -1; k < 9; k++) rayas.push(<rect key={`${c}-${k}`} x={off + k * 160} y={yy - 7} width={90} height={14} rx={7} fill={KC.yellow} />); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={y0 - 18} width={KW} height={18} fill="#c9c3b6" stroke={KC.ink} strokeWidth={5} />
    <rect x={0} y={y0} width={KW} height={y1 - y0} fill={ASFALTO} />
    <rect x={0} y={y1} width={KW} height={18} fill="#c9c3b6" stroke={KC.ink} strokeWidth={5} />
    {rayas}
  </svg>;
}
// Mapa esquemático de EE. UU. (contorno simplificado) con pines.
const US = [[-124.7,48.4],[-124.1,46.3],[-124.5,42.8],[-124.2,40.4],[-122.4,37.2],[-120.6,34.6],[-117.1,32.5],[-114.7,32.7],[-111,31.3],[-108.2,31.3],[-106.5,31.8],[-104.5,29.6],[-103,29],[-101,29.4],[-99.5,27.5],[-97.2,25.9],[-97.4,27.8],[-94.7,29.4],[-93,29.7],[-89.6,29.2],[-89,30.3],[-85.4,29.7],[-83,29],[-82.7,27.5],[-81.2,25.2],[-80.1,25.8],[-80.6,28.4],[-81.4,30.7],[-79,33.6],[-75.5,35.2],[-76,37],[-74,40.5],[-70,41.6],[-70.7,43],[-67,44.8],[-68.5,47.3],[-69.2,47.4],[-71.5,45],[-75,45],[-76.8,43.6],[-79,43.3],[-79,42.8],[-83,41.8],[-82.4,43],[-84.6,45.9],[-88,48],[-89.6,48],[-95.2,49],[-123,49]];
const usP = (lon, lat, ox, oy, k) => [ox + (lon + 125) * k, oy + (49.5 - lat) * k * 1.25];
function MapaEU({ T, at, ox = 50, oy = 660, k = 16.6, pines = [] }) {
  const d = 'M ' + US.map(([a, b]) => usP(a, b, ox, oy, k).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const e = kprog(T, at, at + 0.6, kEase.sale);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:e }}>
    <path d={d} fill="#fff4c9" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform={`translate(0 ${(1 - e) * 40})`} />
    {pines.map((p, i) => { const [px, py] = usP(p.lon, p.lat, ox, oy, k), g = kprog(T, p.at, p.at + 0.4, kEase.rebote); if (g <= 0) return null;
      return <g key={i} transform={`translate(${px} ${py}) scale(${g * (p.chico ? 0.7 : 1)})`}>
        <path d="M 0 0 C -28 -36 -26 -70 0 -70 C 26 -70 28 -36 0 0 Z" fill={p.color || KC.red} stroke={KC.ink} strokeWidth={5} />
        <circle cx={0} cy={-46} r={10} fill="#fff" stroke={KC.ink} strokeWidth={3} />
        <text x={p.dx || 0} y={p.dy || 40} textAnchor={p.ancla || 'middle'} style={{ font:`900 ${p.chico ? 40 : 34}px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={8} paintOrder="stroke">{p.nombre}</text>
      </g>; })}
  </svg>;
}
// Velocímetro / odómetro del tablero.
function Tablero({ T, x = 540, y = 800, r = 270, aguja = 0 }) {
  const ang = -210 + 240 * aguja, rad = (a) => a * Math.PI / 180;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 26} fill="#1d222c" stroke={KC.ink} strokeWidth={10} />
    <circle r={r} fill="#0d1424" stroke={KC.cyan} strokeWidth={4} strokeOpacity=".5" />
    {Array.from({ length: 13 }, (_, i) => { const a = rad(-210 + i * 20); return <line key={i} x1={Math.cos(a) * (r - 18)} y1={Math.sin(a) * (r - 18)} x2={Math.cos(a) * (r - (i % 2 ? 40 : 60))} y2={Math.sin(a) * (r - (i % 2 ? 40 : 60))} stroke={i > 9 ? KC.red : KC.texto} strokeWidth={i % 2 ? 5 : 9} strokeLinecap="round" />; })}
    <line x1={0} y1={0} x2={Math.cos(rad(ang)) * (r - 70)} y2={Math.sin(rad(ang)) * (r - 70)} stroke={KC.orange} strokeWidth={14} strokeLinecap="round" />
    <circle r={30} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Papelito de reclamo de seguro.
function Reclamo({ x, y, s = 1, color = BLANCO, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-26} y={-34} width={52} height={68} rx={6} fill={color} stroke={KC.ink} strokeWidth={4} />
    <rect x={-18} y={-26} width={22} height={8} fill={KC.red} />
    {[-8, 4, 16].map((ly) => <line key={ly} x1={-18} y1={ly} x2={18} y2={ly} stroke="#2b3a8a" strokeWidth={3} opacity=".7" />)}
  </g>;
}
// Pila de n reclamos en cuadrícula (aparecen uno tras otro desde `at`).
function Pila({ T, at, n, x, y, cols = 6, paso = 60, s = 1, color = BLANCO, dur = 1.4 }) {
  const out = [];
  for (let i = 0; i < n; i++) { const t0 = at + (dur * i) / Math.max(1, n), g = kprog(T, t0, t0 + 0.25, kEase.sale); if (g <= 0) continue;
    const c = i % cols, r = Math.floor(i / cols);
    out.push(<Reclamo key={i} x={x + c * paso} y={y + r * paso * 1.2 - (1 - g) * 60} s={s} color={color} rot={((i * 37) % 11) - 5} o={g} />); }
  return <g>{out}</g>;
}
// Autobús escolar de lado (mira a la derecha), con letrero de ALTO desplegado y luces rojas que parpadean.
function Autobus({ x, y, s = 1, T = 0, alto = 1 }) {
  const luz = Math.sin(T * 10) > 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={118} rx={300} ry={14} fill="rgba(0,0,0,.25)" />
    <path d="M -290 80 L -290 -110 Q -290 -130 -268 -130 L 210 -130 Q 236 -130 244 -104 L 262 -30 L 296 -16 Q 306 -10 306 6 L 306 80 Q 306 92 292 92 L -276 92 Q -290 92 -290 80 Z" fill="#ffc21a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-250, -170, -90, -10, 70, 150].map((wx) => <rect key={wx} x={wx} y={-108} width={64} height={60} rx={8} fill="#bfe8ff" stroke={KC.ink} strokeWidth={5} />)}
    <path d="M 226 -108 L 244 -40 L 230 -40 Z" fill="#bfe8ff" stroke={KC.ink} strokeWidth={4} />
    <rect x={-290} y={-20} width={596} height={16} fill={KC.ink} />
    <rect x={-290} y={30} width={596} height={10} fill={KC.ink} opacity=".7" />
    <text x={-20} y={22} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>ESCOLAR</text>
    <circle cx={-270} cy={-140} r={14} fill={luz ? KC.red : '#5a1a14'} stroke={KC.ink} strokeWidth={4} />
    <circle cx={226} cy={-140} r={14} fill={luz ? KC.red : '#5a1a14'} stroke={KC.ink} strokeWidth={4} />
    {luz && [-270, 226].map((lx) => <circle key={lx} cx={lx} cy={-140} r={30} fill={KC.red} opacity=".25" />)}
    <g transform={`translate(170 -6) scale(1.5) rotate(${(1 - alto) * 90})`}>
      <line x1={0} y1={0} x2={-70} y2={0} stroke={KC.ink} strokeWidth={8} />
      <polygon points="-70,-34 -100,-48 -130,-48 -152,-26 -152,4 -130,26 -100,26 -78,4" transform="translate(-6 11)" fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <text x={-118} y={20} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill="#fff">ALTO</text>
    </g>
    {[-190, 200].map((cx) => <g key={cx} transform={`translate(${cx} 92)`}><circle r={46} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} /><circle r={20} fill="#c9ccd3" stroke={KC.ink} strokeWidth={5} /></g>)}
  </g>;
}
// Sello rojo.
function Sello({ x, y, g, texto, rot = -12, tam = 110 }) {
  if (g <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, g)})`} opacity={Math.min(1, g * 2)}>
    <rect x={-texto.length * tam * 0.3 - 30} y={-tam * 0.62} width={texto.length * tam * 0.6 + 60} height={tam * 1.24} rx={18} fill="rgba(255,59,47,.14)" stroke={KC.red} strokeWidth={10} />
    <text y={tam * 0.36} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.red}>{texto}</text>
  </g>;
}
// Cuaderno de tarea con una cifra escrita.
function Cuaderno({ x, y, s = 1, T = 0, cifra = '−82 %' }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-4)`}>
    <rect x={-220} y={-270} width={440} height={540} rx={16} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 11 }, (_, i) => <circle key={i} cx={-220} cy={-240 + i * 48} r={11} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />)}
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-180} y1={-190 + i * 46} x2={190} y2={-190 + i * 46} stroke="#9fc3ff" strokeWidth={3} />)}
    <text x={-170} y={-210} style={{ font:`italic 700 38px ${KF.mono}` }} fill="#2b3a8a">Tarea: choques</text>
    <text x={0} y={-30} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={5}>{cifra}</text>
    <text x={0} y={70} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill="#2b3a8a">la calificó: Waymo</text>
  </g>;
}
// Lupa simple.
function LupaIcono({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <rect x={-16} y={70} width={32} height={140} rx={14} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
    <circle r={84} fill="rgba(191,232,255,.35)" stroke={KC.ink} strokeWidth={14} />
    <path d="M -46 -30 Q -30 -56 0 -60" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}
// Personita (autor).
function Autor({ x, y, color, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-46} r={26} fill="#f1b48f" stroke={KC.ink} strokeWidth={5} />
    <path d="M -42 40 Q -42 -14 0 -14 Q 42 -14 42 40 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Señal de autopista y copo de nieve, tachados.
function Tachado({ x, y, g, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={120} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    {children}
    <circle r={120} fill="none" stroke={KC.red} strokeWidth={16} opacity={g} />
    <line x1={-84} y1={-84} x2={-84 + 168 * g} y2={-84 + 168 * g} stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
  </g>;
}
function Autopista() {
  return <g><path d="M -70 80 L -18 -80 L 18 -80 L 70 80 Z" fill={ASFALTO} stroke={KC.ink} strokeWidth={6} />
    {[-60, -20, 20, 56].map((yy, i) => <rect key={i} x={-4} y={yy} width={8} height={20} fill={KC.yellow} />)}
    <rect x={-54} y={-96} width={108} height={40} rx={8} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
    <text y={-66} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill="#fff">I-10</text></g>;
}
function Copo() {
  return <g stroke="#2f6dff" strokeWidth={10} strokeLinecap="round">{[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}>
    <line x1={0} y1={-78} x2={0} y2={78} /><path d="M -20 -60 L 0 -40 L 20 -60 M -20 60 L 0 40 L 20 60" fill="none" /></g>)}</g>;
}
// Globo terráqueo esquemático que gira.
function Globo({ x, y, r = 250, T = 0 }) {
  const fase = (T * 0.25) % 1, blobs = [[-0.6, -0.3, 0.32], [-0.2, 0.35, 0.26], [0.35, -0.25, 0.3], [0.7, 0.3, 0.22], [1.15, -0.1, 0.28]];
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="clipGlobo"><circle r={r} /></clipPath></defs>
    <circle r={r} fill="#2f6dff" />
    <g clipPath="url(#clipGlobo)">
      {blobs.map(([bx, by, br], i) => { const px = (((bx + fase * 2) % 2) + 2) % 2 - 1; return <ellipse key={i} cx={px * r * 1.2} cy={by * r} rx={br * r} ry={br * r * 0.8} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />; })}
      {[0.35, 0.7].map((k) => <ellipse key={k} rx={r * k} ry={r} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth={3} />)}
      <line x1={-r} y1={0} x2={r} y2={0} stroke="#fff" strokeOpacity=".25" strokeWidth={3} />
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}

function Waymo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Millas, Ci: CUES.Ciudades, P: CUES.Pregunta, E: CUES.Estudio, Es: CUES.Esperados, O: CUES.Ojo, R: CUES.Recall, Mu: CUES.Mundo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: los dos autos arrancan en el cuadro 0; luego el auto sin conductor se adelanta un poco
  const xH = klerp(-260, 330, kprog(T, K.G, K.G + 1.0, kEase.sale)), xW = klerp(-260, 330, kprog(T, K.G + 0.15, K.G + 1.15, kEase.sale));
  // recall: el auto sin conductor empieza a rebasar al autobús y se congela
  const xR = klerp(-260, 470, kprog(T, K.R + 0.3, K.R + 2.6, kEase.suave)), congela = T > K.R + 2.6;
  const fase2 = T >= K.Es + 3.4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú contra el auto sin nadie */}
      <Escena T={T} a={K.G} b={K.Mi}>
        <FondoLunares color={KC.yellow} />
        <Calle T={T} vel={1} />
        {svg(<>
          <Auto x={xH} y={850} s={0.9} T={T} color={KC.red} humano />
          <Auto x={xW} y={1070} s={0.9} T={T} color={BLANCO} humano={false} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.5} until={K.Mi - 0.2} texto="tú" x={800} y={850} tam={44} borde={KC.red} />
      <Chip T={T} at={K.G + 1.4} until={K.Mi - 0.2} texto="nadie al volante" x={790} y={1070} tam={40} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.G + 4.7} until={K.Mi - 0.2} valor={-82} desde={0} dur={0.9} sufijo=" %" x={540} y={450} tam={230} color={KC.mint} />
      <Chip T={T} at={K.G + 5.3} until={K.Mi - 0.2} texto="choques con heridos · según Waymo" x={540} y={640} tam={34} borde={KC.mint} />
      {/* 2 · millas */}
      <Escena T={T} a={K.Mi} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        {svg(<Tablero T={T} x={540} y={820} r={250} aguja={0.15 + 0.7 * kprog(T, K.Mi + 0.2, K.Mi + 2.2, kEase.sale) + 0.02 * Math.sin(T * 7)} />)}
      </Escena>
      <NumeroGigante T={T} at={K.Mi + 0.3} until={K.Ci - 0.2} valor={271.3} dur={2.0} dec={1} x={540} y={1110} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Mi + 0.8} until={K.Ci - 0.2} texto="millones de millas sin conductor" x={620} y={470} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Mi + 2.2} until={K.Ci - 0.2} texto="hasta junio de 2026" x={620} y={560} tam={32} borde={KC.gold} />
      {/* 3 · ciudades */}
      <Escena T={T} a={K.Ci} b={K.P}>
        <FondoLunares color={KC.mint} />
        <MapaEU T={T} at={K.Ci - 0.2} pines={[
          { nombre: 'San Francisco', lon: -122.4, lat: 37.8, at: K.Ci + 1.6, dx: 10, ancla: 'start', dy: -80 },
          { nombre: 'Los Ángeles', lon: -118.2, lat: 34.05, at: K.Ci + 2.3, dy: 44, ancla: 'start', dx: -40 },
          { nombre: 'Phoenix', lon: -112.1, lat: 33.45, at: K.Ci + 1.0, dy: -80 },
          { nombre: 'Austin', lon: -97.7, lat: 30.3, at: K.Ci + 3.0, chico: true, color: KC.orange },
          { nombre: 'Atlanta', lon: -84.4, lat: 33.75, at: K.Ci + 3.3, chico: true, color: KC.orange }]} />
      </Escena>
      <Chip T={T} at={K.Ci + 0.4} until={K.P - 0.2} texto="vs. conductor promedio local" x={420} y={500} tam={34} borde={KC.ink} />
      {/* 4 · pregunta: ¿quién le revisa la tarea? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Cuaderno x={300} y={830} s={0.95} T={T} />
          <text x={250} y={560} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 470)`}>?</text>
        </>)}
      </Escena>
      {/* 5 · el estudio con la reaseguradora */}
      <Escena T={T} a={K.E} b={K.Es}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <path d="M 300 1100 L 340 1010 L 740 1010 L 780 1100 Z" fill="#8a6a4a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          {[0, 1].map((i) => { const g = kprog(T, K.E + 3.2 + i * 0.6, K.E + 3.7 + i * 0.6, kEase.sale);
            return <Reclamo key={i} x={480 + i * 120} y={klerp(700, 1000, g)} s={1.6} rot={i ? 8 : -6} o={g > 0 ? 1 : 0} />; })}
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Es - 0.2} anio="2024" quien="reaseguradora Swiss Re + Waymo" revista="reclamos de seguro · 25.3 millones de millas" y={560} />
      <Chip T={T} at={K.E + 3.4} until={K.Es - 0.2} texto="reclamos por lesiones: 2" x={540} y={860} tam={40} borde={KC.red} />
      {/* 6 · lo esperado con humanos */}
      <Escena T={T} a={K.Es} b={K.O}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          {!fase2 ? <>
            <Pila T={T} at={K.Es + 0.3} n={26} x={110} y={760} cols={6} paso={62} dur={1.6} />
            <Pila T={T} at={K.Es + 2.0} n={2} x={720} y={760} cols={2} paso={80} color="#e6fbff" dur={0.3} />
          </> : <>
            <Pila T={T} at={K.Es + 3.5} n={78} x={86} y={740} cols={10} paso={40} s={0.62} dur={1.2} />
            <Pila T={T} at={K.Es + 4.6} n={9} x={700} y={740} cols={3} paso={56} s={0.8} color="#e6fbff" dur={0.5} />
          </>}
          <text x={290} y={1150} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{fase2 ? 'humanos: 78 esperados' : 'humanos: 26 esperados'}</text>
          <text x={790} y={1150} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{fase2 ? 'Waymo: 9' : 'Waymo: 2'}</text>
          <line x1={540} y1={720} x2={540} y2={1110} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 12" />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Es + 0.2} until={K.Es + 3.3} valor={-92} dur={0.9} sufijo=" %" etiqueta="reclamos por lesiones" x={380} y={500} tam={180} color={KC.mint} />
      <NumeroGigante T={T} at={K.Es + 3.5} until={K.O - 0.2} valor={-88} dur={0.9} sufijo=" %" etiqueta="daños materiales" x={380} y={500} tam={180} color={KC.cyan} />
      {/* 7 · ojo: quién firma y dónde casi no maneja */}
      <Escena T={T} a={K.O} b={K.R}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={kprog(T, K.O + 0.2, K.O + 0.6)}>
            <rect x={360} y={360} width={660} height={330} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <text x={690} y={420} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>autores del estudio</text>
            {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} opacity={kprog(T, K.O + 0.5 + i * 0.15, K.O + 0.7 + i * 0.15)}><Autor x={440 + i * 100} y={540} color={i < 2 ? KC.gold : KC.cyan} s={1.1} /></g>)}
            <text x={540} y={655} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#7a5a10">2 · Swiss Re</text>
            <text x={840} y={655} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#0a6a86">4 · Waymo</text>
          </g>
          <g opacity={kprog(T, K.O + 2.4, K.O + 2.8)}>
            <Tachado x={300} y={960} g={kprog(T, K.O + 2.9, K.O + 3.3, kEase.sale)}><Autopista /></Tachado>
            <Tachado x={780} y={960} g={kprog(T, K.O + 3.5, K.O + 3.9, kEase.sale)}><Copo /></Tachado>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 2.5} until={K.R - 0.2} texto="dónde casi no maneja" x={540} y={790} tam={38} borde={KC.ink} />
      {/* 8 · recall: el autobús escolar */}
      <Escena T={T} a={K.R} b={K.Mu}>
        <FondoLunares color={KC.cyan} />
        <Calle T={T} vel={congela ? 0 : 0.4 * (1 - kprog(T, K.R + 2.0, K.R + 2.6))} y0={780} y1={1180} />
        {svg(<>
          <Autobus x={640} y={850} s={0.82} T={T} alto={kprog(T, K.R + 0.2, K.R + 0.7, kEase.sale)} />
          <Auto x={xR} y={1080} s={0.78} T={congela ? 0 : T} color={BLANCO} humano={false} vel={congela ? 0 : 1} />
          {T > K.R + 2.6 && T < K.R + 5.0 && <g opacity={Math.sin((T - K.R) * 12) > 0 ? 1 : 0.4}>
            <circle cx={xR + 150} cy={980} r={40} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <text x={xR + 150} y={996} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill="#fff">!</text></g>}
          <g opacity={1 - kprog(T, K.R + 4.8, K.R + 5.1)}><Sello x={360} y={480} g={kprog(T, K.R + 2.8, K.R + 3.2, kEase.sale)} texto="RECALL" tam={120} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.R + 3.4} until={K.Mu - 0.2} texto="NHTSA · 3,067 autos · dic 2025" x={370} y={650} tam={32} borde={KC.red} />
      <Medidor T={T} at={K.R + 5.0} until={K.Mu - 0.2} x={60} y={420} ancho={600} etiqueta="actualizar software" color={KC.mint}
        valor={(t) => kprog(t, K.R + 5.2, K.R + 6.6, kEase.suave)} texto={(v) => v > 0.98 ? 'corregido ✔' : Math.round(v * 100) + ' %'} />
      {/* 9 · el mundo */}
      <Escena T={T} a={K.Mu} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'#46506a' }}></div>
        {svg(<Globo x={620} y={900} r={220} T={T} />)}
      </Escena>
      <NumeroGigante T={T} at={K.Mu + 0.5} until={K.C - 0.2} valor={1.16} dur={1.0} dec={2} sufijo=" millones" etiqueta="muertes al año en el tránsito" x={620} y={480} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.Mu + 1.6} until={K.C - 0.2} texto="OMS · hoja informativa 2026" x={620} y={615} tam={28} borde={KC.texto} />
      {/* 10 · cierre: los mismos dos autos, el de nadie va adelante… con lupa */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        <Calle T={T} vel={1} />
        {svg(<>
          <Auto x={klerp(330, 300, kprog(T, K.C, K.C + 1.5, kEase.suave))} y={850} s={0.9} T={T} color={KC.red} humano />
          <Auto x={klerp(330, 700, kprog(T, K.C + 0.2, K.C + 1.8, kEase.suave))} y={1070} s={0.9} T={T} color={BLANCO} humano={false} />
          <g opacity={kprog(T, K.C + 3.3, K.C + 3.7)}><LupaIcono x={klerp(500, 700, kprog(T, K.C + 3.3, K.C + 4.3, kEase.sale))} y={960} s={0.9} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="en sus calles: va adelante" x={370} y={560} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="¿y sus números? a revisar 🔍" x={370} y={660} tam={34} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="Tú contra un auto *sin nadie al volante*" />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.Ci - 0.1} texto="*271 millones* de millas" />
      <Subtitulo T={T} idx={2} at={K.Ci + 0.1} until={K.P - 0.1} texto="Contra el conductor *promedio*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.E - 0.1} texto="¿Quién le *revisa la tarea?*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.Es - 0.1} texto="Swiss Re, 2024: *solo 2 por lesiones*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.O - 0.1} texto="*−92%* lesiones · *−88%* daños" />
      <Subtitulo T={T} idx={6} at={K.O + 0.1} until={K.R - 0.1} texto="Coautora: Waymo. *Casi sin autopista ni nieve.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.Mu - 0.1} texto="Recall 2025: *autobuses escolares*" />
      <Subtitulo T={T} idx={8} at={K.Mu + 0.1} until={K.C - 0.1} texto="*Más de un millón* de muertes al año" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Va ganando… *pero hay que revisar.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Millas + 1.0, CUES.Ciudades - 0.4, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Ciudades + 1.2, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Esperados + 0.8, CUES.Ojo - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Ojo + 0.4, CUES.Recall - 0.4, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Recall + 3.0, CUES.Mundo - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Mundo + 0.4, CUES.Cierre - 0.4, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 1.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="36" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function WaymoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Waymo /></CompositionStage></div>;
}
window.WaymoApp = WaymoApp;
