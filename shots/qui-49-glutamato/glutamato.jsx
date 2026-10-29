// Shot Químico #49 · Ese polvito blanco no es veneno (el mito del glutamato monosódico) — NARRADO (N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md (APROBADO). El dibujo es esquemático.
const ROJO_J = '#e8322b', CARNE_J = '#ff6b5a', GLU = '#E8A62A', CRISTAL = '#ffffff', NA = '#b18cff';

// Glutamato esquemático: cadena de 5 carbonos, un grupo ácido en cada punta y un grupo amino (sin hidrógenos).
const C_ = '#8a8f99';
MOL.glu = { atomos: [
  [-150, 10, 30, C_, 'C'], [-75, -25, 30, C_, 'C'], [0, 10, 30, C_, 'C'], [75, -25, 30, C_, 'C'], [150, 10, 30, C_, 'C'],
  [-205, -30, 27, QA.O, 'O'], [-190, 70, 27, QA.O, 'O'], [205, -30, 27, QA.O, 'O'], [190, 70, 27, QA.O, 'O'], [-75, -105, 29, QA.N, 'N'] ],
  enlaces: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [0, 6], [4, 7], [4, 8], [1, 9]] };

// Medio jitomate visto por el corte.
function Jitomate({ x, y, r = 300, brillo = 0 }) {
  const loc = [0, 1, 2, 3].map((k) => k * 90 + 45);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={ROJO_J} stroke={KC.ink} strokeWidth={r / 28} />
    <circle r={r * 0.88} fill={CARNE_J} />
    {loc.map((a, i) => { const rad = a * Math.PI / 180, cx = Math.cos(rad) * r * 0.48, cy = Math.sin(rad) * r * 0.48;
      return <g key={i}><ellipse cx={cx} cy={cy} rx={r * 0.27} ry={r * 0.2} transform={`rotate(${a} ${cx} ${cy})`} fill="#ffb09a" stroke="#d94b3a" strokeWidth={r / 60} />
        {[-1, 0, 1].map((k) => <ellipse key={k} cx={cx + Math.cos(rad + 1.57) * k * r * 0.1} cy={cy + Math.sin(rad + 1.57) * k * r * 0.1} rx={r * 0.035} ry={r * 0.055} transform={`rotate(${a} ${cx + Math.cos(rad + 1.57) * k * r * 0.1} ${cy + Math.sin(rad + 1.57) * k * r * 0.1})`} fill="#f6e7a1" stroke="#c9a640" strokeWidth={2} />)}</g>; })}
    <circle r={r * 0.2} fill="#ff8f7d" />
    {[0, 90, 180, 270].map((a) => <line key={a} x1={0} y1={0} x2={Math.cos((a) * Math.PI / 180) * r * 0.86} y2={Math.sin((a) * Math.PI / 180) * r * 0.86} stroke="#ff8f7d" strokeWidth={r / 14} />)}
    <path d={`M ${-r * 0.6} ${-r * 0.62} Q ${-r * 0.2} ${-r * 0.86} ${r * 0.25} ${-r * 0.8}`} stroke="#fff" strokeWidth={r / 25} fill="none" opacity={0.45} strokeLinecap="round" />
    {brillo > 0 && <circle r={r * 1.08} fill="none" stroke={GLU} strokeWidth={14} opacity={brillo} strokeDasharray="30 22" />}
  </g>;
}
// Salero de vidrio con tapa de metal. etq = etiqueta.
function Salero({ x, y, s = 1, rot = 0, etq = '', color = '#e8f6ff', tapa = '#c9ccd3' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -80 -120 L 80 -120 L 95 140 Q 95 160 75 160 L -75 160 Q -95 160 -95 140 Z" fill={color} fillOpacity={0.55} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -88 20 L 88 20 L 95 140 Q 95 156 75 156 L -75 156 Q -95 156 -91 140 Z" fill="#fff" opacity={0.95} />
    {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-70 + (i % 7) * 22} y={30 + Math.floor(i / 7) * 30} width={10} height={10} transform={`rotate(45 ${-65 + (i % 7) * 22} ${35 + Math.floor(i / 7) * 30})`} fill="#dfe8f0" />)}
    <path d="M -84 -120 Q -84 -190 0 -195 Q 84 -190 84 -120 Z" fill={tapa} stroke={KC.ink} strokeWidth={8} />
    {[-40, -14, 14, 40].map((dx) => <circle key={dx} cx={dx} cy={-160 + Math.abs(dx) * 0.4} r={6} fill={KC.ink} />)}
    {etq && <g><rect x={-78} y={-80} width={156} height={70} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-32} textAnchor="middle" style={{ font:`400 ${etq.length > 6 ? 26 : 40}px ${KF.titulo}` }} fill={KC.ink}>{etq}</text></g>}
  </g>;
}
// Cristalitos que caen del salero (x0,y0) a una zona (x1±w, y1) y se quedan.
function Cristales({ T, desde, x0, y0, x1, y1, w = 220, n = 26, cada = 0.07, seed = 3 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const t0 = desde + i * cada, dx = (R() - 0.5) * w * 2, dy = (R() - 0.5) * 120, rot = R() * 90, sz = 9 + R() * 7;
    if (T < t0) return null;
    const u = Math.min(1, (T - t0) / 0.55), xx = klerp(x0, x1 + dx, u), yy = klerp(y0, y1 + dy, u * u);
    const chispa = u >= 1 ? 0.5 + 0.5 * Math.sin(T * 5 + i) : 1;
    return <rect key={i} x={xx - sz / 2} y={yy - sz / 2} width={sz} height={sz} transform={`rotate(${rot + (1 - u) * 300} ${xx} ${yy})`} fill={CRISTAL} stroke="#7d8ea3" strokeWidth={2.5} opacity={0.75 + 0.25 * chispa} />; })}</g>;
}
// Cristal grande (zoom).
function CristalGrande({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M 0 -150 L 120 -40 L 80 140 L -80 140 L -120 -40 Z" fill="#f4fbff" stroke="#7d8ea3" strokeWidth={8} strokeLinejoin="round" />
    <path d="M 0 -150 L 20 -20 L 80 140 M 20 -20 L 120 -40 M 20 -20 L -80 140 M 20 -20 L -120 -40" stroke="#b9cadb" strokeWidth={4} fill="none" />
  </g>;
}
// Cadena de proteína (cuentas de colores). glu = índices que son glutamato (dorado). sep = separación extra 0..1.
function Proteina({ T, x, y, n = 10, paso = 80, glu = [3, 7], sep = 0, o = 1, onda = 1 }) {
  const cols = [KC.mint, KC.pink, KC.cyan, KC.lilac, KC.orange, KC.leaf];
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const xx = x + i * paso * (1 + sep * 0.6) - (n - 1) * paso * (1 + sep * 0.6) / 2, yy = y + Math.sin(T * 2 + i * 0.8) * 18 * onda + (sep * ((i * 53) % 7 - 3) * 22);
    const nx = x + (i + 1) * paso * (1 + sep * 0.6) - (n - 1) * paso * (1 + sep * 0.6) / 2, ny = y + Math.sin(T * 2 + (i + 1) * 0.8) * 18 * onda + (sep * ((((i + 1) * 53) % 7) - 3) * 22);
    const g = glu.includes(i);
    return <g key={i}>{i < n - 1 && sep < 0.3 && <line x1={xx} y1={yy} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={8} opacity={1 - sep * 3} />}
      <circle cx={xx} cy={yy} r={30} fill={g ? GLU : cols[i % cols.length]} stroke={KC.ink} strokeWidth={6} />
      {g && <text x={xx} y={yy + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>Glu</text>}</g>; })}</g>;
}
function Queso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 90 L 170 90 L 170 -10 L -170 -110 Z" fill="#ffd23f" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -170 -110 L 170 -10 L 190 -30 L -150 -128 Z" fill="#ffe680" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[-80, 0, 22], [40, 30, 28], [120, 50, 16], [-130, 50, 14]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#e6b52a" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
function Olla({ T, x, y, s = 1, vapor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {vapor > 0 && [-80, 0, 80].map((dx, i) => <path key={i} d={`M ${dx} -150 q 30 -40 0 -80 q -30 -40 0 -80`} stroke="#fff" strokeWidth={12} fill="none" opacity={0.6 * vapor} strokeLinecap="round" transform={`translate(${Math.sin(T * 2 + i) * 10} ${-(T * 40 + i * 30) % 40})`} />)}
    <rect x={-260} y={-150} width={40} height={30} rx={8} fill="#7d828c" stroke={KC.ink} strokeWidth={6} />
    <rect x={220} y={-150} width={40} height={30} rx={8} fill="#7d828c" stroke={KC.ink} strokeWidth={6} />
    <path d="M -230 -150 L 230 -150 L 210 130 Q 205 160 175 160 L -175 160 Q -205 160 -210 130 Z" fill="#a9afb9" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={-150} rx={230} ry={42} fill="#8a6a3a" stroke={KC.ink} strokeWidth={8} />
    {[-120, -30, 70, 140].map((dx, i) => <path key={i} d={`M ${dx - 50} ${-150 + Math.sin(T * 2 + i) * 6} q 30 -20 60 0 q 30 20 60 0`} stroke="#2f5d2a" strokeWidth={18} fill="none" strokeLinecap="round" />)}
  </g>;
}
function Lengua({ T, x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0 && <ellipse cx={0} cy={20} rx={260 + Math.sin(T * 6) * 10} ry={300} fill={GLU} opacity={0.35 * brillo} />}
    <path d="M -200 -200 L 200 -200 Q 220 120 0 260 Q -220 120 -200 -200 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 0 -190 L 0 150" stroke="#e46a7a" strokeWidth={10} strokeLinecap="round" />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={-140 + (i % 4) * 90 + (i % 2) * 20} cy={-140 + Math.floor(i / 4) * 80} r={9} fill="#ffb3c1" />)}
  </g>;
}
// Tubo digestivo esquemático (intestino en onda).
const ix = (u) => 120 + 840 * u, iy = (u) => 960 + 170 * Math.sin(u * Math.PI * 3);
function Intestino({ T }) {
  const pts = Array.from({ length: 61 }, (_, k) => `${ix(k / 60)},${iy(k / 60)}`).join(' ');
  return <g>
    <polyline points={pts} fill="none" stroke={KC.ink} strokeWidth={150} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts} fill="none" stroke="#ff9aa8" strokeWidth={134} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts} fill="none" stroke="#7a1f2b" strokeWidth={70} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
    {Array.from({ length: 30 }, (_, k) => { const u = k / 29; return <circle key={k} cx={ix(u)} cy={iy(u) - 52 + Math.sin(T * 3 + k) * 3} r={8} fill="#ffc2cc" />; })}
  </g>;
}
function Plato({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse rx={150} ry={50} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={100} ry={30} fill="#f1ede4" />
    <ellipse cx={-40} cy={-14} rx={46} ry={24} fill="#8a4a2a" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={30} cy={-18} rx={38} ry={20} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} />
    <circle cx={60} cy={-10} r={18} fill={ROJO_J} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Sobre({ x, y, s = 1, abre = 0, sube = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-40} width={520} height={300} rx={14} fill="#f4e3c3" stroke={KC.ink} strokeWidth={9} />
    <g transform={`translate(0 ${-sube * 300})`}>
      <rect x={-210} y={-60} width={420} height={300} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
      <text x={-180} y={-12} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>To the Editor:</text>
      {[30, 70, 110, 150, 190].map((yy, i) => <rect key={i} x={-180} y={yy} width={i === 4 ? 200 : 360} height={12} rx={6} fill="#c9c2b3" />)}
    </g>
    <path d="M -260 260 L 0 90 L 260 260 Z" fill="#ead2a8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -260 -40 L 0 ${klerp(130, -230, abre)} L 260 -40 Z`} fill="#e3c58f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Silueta (cabeza y hombros) con hormigueo en la nuca y corazón rápido.
function Silueta({ T, x, y, s = 1, f = 1 }) {
  const lat = 1 + 0.12 * Math.max(0, Math.sin(T * 14));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 360 Q -300 120 -110 90 L -70 40 Q -160 -10 -160 -140 Q -160 -300 0 -300 Q 160 -300 160 -140 Q 160 -10 70 40 L 110 90 Q 300 120 300 360 Z" fill="#3b4a6b" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${-120 + k * 80} ${60 + Math.sin(T * 9 + k) * 6} l 20 -24 l 20 24 l 20 -24`} stroke={KC.yellow} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={f * (0.6 + 0.4 * Math.sin(T * 10 + k))} />)}
    <g transform={`translate(110 210) scale(${lat * f})`}><path d="M 0 30 C -70 -20 -50 -80 0 -50 C 50 -80 70 -20 0 30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
function Recorte({ x, y, rot = 0, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * klerp(0.6, 1, o)})`} opacity={o}>
    <rect x={-170} y={-110} width={340} height={220} fill="#f7f4ea" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-40} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>¿GLUTAMATO?</text>
    {[0, 1, 2].map((k) => <rect key={k} x={-140} y={0 + k * 30} width={k === 2 ? 160 : 280} height={12} rx={5} fill="#bdb6a6" />)}
  </g>;
}
function Sello({ x, y, texto, s = 1, o = 1, color = KC.red, rot = -12, tam = 64 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * klerp(1.6, 1, o)})`} opacity={o}>
    <rect x={-texto.length * tam * 0.3 - 30} y={-tam * 0.85} width={texto.length * tam * 0.6 + 60} height={tam * 1.5} rx={16} fill="rgba(255,255,255,.75)" stroke={color} strokeWidth={10} />
    <text x={0} y={tam * 0.32} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}
function GotaLeche({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -380 Q 60 -250 220 -60 Q 330 90 230 230 Q 120 360 0 360 Q -120 360 -230 230 Q -330 90 -220 -60 Q -60 -250 0 -380 Z" fill="#fffaf0" stroke={KC.ink} strokeWidth={12} />
    <path d="M -150 -40 Q -210 60 -170 160" stroke="#fff" strokeWidth={22} fill="none" strokeLinecap="round" />
  </g>;
}
// Vaso de la prueba (A/B).
function VasoPrueba({ x, y, letra, o = 1 }) {
  return <g opacity={o}><VasoLab x={x} y={y} s={0.5} liquido="#d9f2ff" nivel={0.55} marcas={false} />
    <text x={x} y={y - 50} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{letra}</text></g>;
}

function Glutamato() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, U: CUES.Umami, Gr: CUES.Gramos, Pr: CUES.Pregunta, Ca: CUES.Carta, So: CUES.Sospechas, Es: CUES.Estudio, Le: CUES.Leche, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // tiempos internos (tiempo de autor)
  const uOlla = K.U + 2.4, uLengua = K.U + 4.4, grBarras = K.Gr + 3.2;
  const eGrid = K.Es + 2.6, eGlu = K.Es + 5.2, ePla = K.Es + 6.6, eRep = K.Es + 8.4, eMitad = K.Es + 9.3, eComida = K.Es + 10.6;
  const sacude = Math.sin(T * 16) * 10 * (1 - kprog(T, K.G + 2.4, K.G + 2.8));
  // la cuadrícula de 130 personas: orden fijo y aleatorio de quién reacciona
  const R = krng(49);
  const orden = Array.from({ length: 130 }, (_, i) => i).map((i) => [i, R()]).sort((a, b) => a[1] - b[1]).map((p) => p[0]);
  const rol = {}; orden.forEach((id, k) => { rol[id] = k; }); // rol < 50: glutamato · 50..66: placebo
  const malla = Array.from({ length: 130 }, (_, i) => {
    const c = i % 13, f = Math.floor(i / 13), k = rol[i];
    let color = 'rgba(255,255,255,.35)', esc = 1;
    if (k < 50) { const t0 = eGlu + k * 0.02; if (T >= t0) { color = GLU; esc = klerp(1.4, 1, kprog(T, t0, t0 + 0.25)); }
      if (k >= 37 && T >= eRep) color = mixHex(GLU, '#5a6070', kprog(T, eRep, eRep + 0.4));      // 13 que no repitieron la prueba
      if (k >= 19 && k < 37 && T >= eMitad) color = mixHex(GLU, '#5a6070', kprog(T, eMitad + (k - 19) * 0.03, eMitad + 0.3 + (k - 19) * 0.03)); }
    else if (k < 67) { const t0 = ePla + (k - 50) * 0.04; if (T >= t0) { color = KC.cyan; esc = klerp(1.4, 1, kprog(T, t0, t0 + 0.25)); }
      if (T >= eRep) color = mixHex(KC.cyan, '#5a6070', kprog(T, eRep, eRep + 0.4)); }
    const dim = T >= eComida ? 1 - 0.55 * kprog(T, eComida, eComida + 0.5) : 1;
    return <Personita key={i} x={150 + c * 65} y={690 + f * 50} s={0.62 * esc} color={color} o={dim} />;
  });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el salero sobre el jitomate */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Jitomate x={560} y={1000} r={290} />
          <Cristales T={T} desde={K.G + 0.05} x0={330} y0={740} x1={560} y1={980} n={34} />
          <Salero x={280} y={640} s={0.95} rot={150 + sacude} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={8} />
      </Escena>
      {/* 1 · qué es: el cristal se disuelve en sodio + glutamato, el mismo de la proteína */}
      <Escena T={T} a={K.Q} b={K.U} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <CristalGrande x={540} y={860} s={1.3} o={1 - kprog(T, K.Q + 0.6, K.Q + 1.3)} />
          {T > K.Q + 0.6 && <g>
            <Atomo x={klerp(540, 220, kprog(T, K.Q + 0.6, K.Q + 1.6, kEase.sale))} y={760 + Math.sin(T * 2) * 14} r={62} color={NA} letra="Na⁺" tam={42} />
            <Mol tipo="glu" x={klerp(540, 640, kprog(T, K.Q + 0.6, K.Q + 1.6, kEase.sale))} y={820} s={1.35 * kprog(T, K.Q + 0.6, K.Q + 1.2, kEase.sale)} rot={Math.sin(T * 1.3) * 6} />
          </g>}
          <Proteina T={T} x={540} y={1170} n={10} paso={95} glu={[3, 7]} o={kprog(T, K.Q + 2.0, K.Q + 2.6)} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={5.7e8} objetivo={650} />
      </Escena>
      {/* 2 · jitomate y queso → 1908, caldo de alga → umami */}
      <Escena T={T} a={K.U} b={K.Gr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={1 - kprog(T, uOlla - 0.3, uOlla + 0.1)}>
            <Jitomate x={300} y={980} r={170} />
            <Queso x={780} y={1000} s={1} />
            {Array.from({ length: 8 }, (_, i) => { const sube = ((T - K.U) * 0.5 + i / 8) % 1, x0 = i % 2 ? 300 : 780;
              return <Mol key={i} tipo="glu" x={x0 + Math.sin(T * 2 + i) * 60} y={klerp(860, 560, sube)} s={0.32} rot={T * 20 + i * 40} o={Math.sin(sube * Math.PI)} />; })}
          </g>
          {T > uOlla - 0.3 && T < uLengua + 0.2 && <g opacity={kprog(T, uOlla - 0.3, uOlla + 0.1) * (1 - kprog(T, uLengua - 0.2, uLengua + 0.2))}>
            <Olla T={T} x={540} y={1060} s={1} />
            <CristalGrande x={540} y={klerp(900, 720, kprog(T, uOlla + 0.4, uOlla + 1.6, kEase.sale))} s={0.35 * kprog(T, uOlla + 0.4, uOlla + 0.8)} />
          </g>}
          {T > uLengua - 0.2 && <g opacity={kprog(T, uLengua - 0.2, uLengua + 0.2)}>
            <Lengua T={T} x={540} y={980} s={1} brillo={kprog(T, uLengua + 0.3, uLengua + 0.8)} />
            <text x={540} y={1000} textAnchor="middle" style={{ font:`400 ${150 * kprog(T, uLengua + 0.3, uLengua + 0.7, kEase.rebote)}px ${KF.titulo}` }} fill={GLU} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">UMAMI</text>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 3 · al digerir proteína: intestino; 13 g contra 0.55 g */}
      <Escena T={T} a={K.Gr} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <g opacity={1 - kprog(T, grBarras - 0.3, grBarras + 0.1)}>
            <Plato x={160} y={720} s={0.8} />
            <Intestino T={T} />
            {Array.from({ length: 12 }, (_, i) => { const u = klerp(-0.15, 0.95, kprog(T, K.Gr + 0.2, grBarras, kEase.suave)) - i * 0.035 * (1 + 2.2 * kprog(T, K.Gr + 1.2, K.Gr + 2.4));
              if (u < 0 || u > 1) return null; const g = i % 3 === 1;
              return <circle key={i} cx={ix(u)} cy={iy(u)} r={g ? 26 : 22} fill={g ? GLU : [KC.mint, KC.pink, KC.lilac][i % 3]} stroke={KC.ink} strokeWidth={5} />; })}
          </g>
          {T > grBarras - 0.3 && (() => { const g = kprog(T, grBarras, grBarras + 1.2, kEase.sale), o = kprog(T, grBarras - 0.3, grBarras + 0.1);
            const h1 = 430 * g, h2 = 430 * (0.55 / 13) * g, B = 1140;
            return <g opacity={o}>
              <rect x={390} y={B - h1} width={200} height={h1} fill={GLU} stroke={KC.ink} strokeWidth={8} />
              <rect x={720} y={B - h2} width={200} height={Math.max(h2, 4)} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
              <line x1={320} x2={990} y1={B + 2} y2={B + 2} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
              <text x={490} y={B - 20 - h1} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{kformato(13 * g)} g</text>
              <text x={490} y={B - 140 - h1} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, grBarras + 1.0, grBarras + 1.4)}>de tu comida</text>
              <text x={820} y={B - 20 - h2} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{kformato(0.55 * g, 2)} g</text>
              <text x={820} y={B - 120 - h2} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, grBarras + 1.4, grBarras + 1.8)}>añadido</text>
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ca} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <text x={290} y={1020} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <Salero x={290} y={1170} s={0.5} rot={Math.sin(T * 5) * 5} etq="?" />
        </SvgCapa>
      </Escena>
      {/* 5 · 1968: la carta */}
      <Escena T={T} a={K.Ca} b={K.So} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={1 - kprog(T, K.Ca + 3.0, K.Ca + 3.4)}>
            <Sobre x={560} y={900} s={1.1} abre={kprog(T, K.Ca + 0.2, K.Ca + 0.8, kEase.sale)} sube={kprog(T, K.Ca + 0.8, K.Ca + 1.6, kEase.sale)} />
          </g>
          {T > K.Ca + 3.0 && <g opacity={kprog(T, K.Ca + 3.0, K.Ca + 3.4)}><Silueta T={T} x={600} y={900} s={1} f={kprog(T, K.Ca + 3.6, K.Ca + 4.2)} /></g>}
        </SvgCapa>
      </Escena>
      {/* 6 · sospechosos sin pruebas */}
      <Escena T={T} a={K.So} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g opacity={1 - 0.7 * kprog(T, K.So + 3.2, K.So + 3.6)}>
            <Botella x={220} y={1010} s={0.85} color="#5b1a2a" liquido="#8a2440" etiqueta="vino" etqColor={KC.paper} tapa="#3a2a20" />
            <Salero x={540} y={1030} s={0.95} etq="sal" />
            <Salero x={860} y={1030} s={0.95} etq="glutamato" />
            {[220, 540, 860].map((x, i) => { const e = kprog(T, K.So + 0.2 + i * 0.45, K.So + 0.5 + i * 0.45, kEase.rebote);
              return <text key={i} x={x} y={800} textAnchor="middle" style={{ font:`400 ${150 * e}px ${KF.titulo}` }} fill={KC.pink} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">?</text>; })}
            <Sello x={540} y={1000} texto="SIN PRUEBAS" o={kprog(T, K.So + 1.9, K.So + 2.2, kEase.sale)} tam={90} />
          </g>
          {[[300, 760, -10], [760, 900, 8], [420, 1130, -4]].map(([x, y, r], i) => <Recorte key={i} x={x} y={y} rot={r} o={kprog(T, K.So + 3.4 + i * 0.3, K.So + 3.7 + i * 0.3)} />)}
        </SvgCapa>
      </Escena>
      {/* 7 · el estudio de 2000 */}
      <Escena T={T} a={K.Es} b={K.Le} zoom={0.02}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T > eGrid - 0.3 && <g opacity={kprog(T, eGrid - 0.3, eGrid + 0.3)}>
            <VasoPrueba x={220} y={620} letra="A" />
            <VasoPrueba x={400} y={620} letra="B" />
            <Plato x={600} y={590} s={0.7} o={kprog(T, eComida, eComida + 0.4)} />
            {malla}
            {T > eRep && T < eComida && <g transform={`translate(950 520) rotate(${(T - eRep) * 200})`} opacity={kprog(T, eRep, eRep + 0.3)}>
              <path d="M 0 -50 A 50 50 0 1 1 -50 0" stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" /><path d="M -70 -10 L -50 20 L -28 -10 Z" fill={KC.ink} /></g>}
          </g>}
        </SvgCapa>
      </Escena>
      {/* 8 · leche materna */}
      <Escena T={T} a={K.Le} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <GotaLeche x={540} y={900} s={kprog(T, K.Le - 0.3, K.Le + 0.4, kEase.rebote)} />
          {Array.from({ length: 6 }, (_, i) => <Mol key={i} tipo="glu" x={540 + Math.cos(T * 0.8 + i * 1.05) * 150} y={960 + Math.sin(T * 1.1 + i * 1.05) * 170} s={0.32} rot={T * 30 + i * 60} o={kprog(T, K.Le + 0.3 + i * 0.12, K.Le + 0.6 + i * 0.12)} />)}
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: el jitomate del inicio, ya con su etiqueta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Jitomate x={560} y={1000} r={290} brillo={kprog(T, K.Ci + 0.6, K.Ci + 1.2)} />
          <Cristales T={T} desde={K.Ci - 30} x0={330} y0={740} x1={560} y1={980} n={34} />
          {[0, 1, 2, 3, 4].map((i) => <Mol key={i} tipo="glu" x={560 + Math.cos(T * 0.7 + i * 1.25) * 210} y={1000 + Math.sin(T * 0.7 + i * 1.25) * 210} s={0.22} rot={T * 25 + i * 70} o={kprog(T, K.Ci + 0.8 + i * 0.1, K.Ci + 1.2 + i * 0.1)} />)}
          <Sello x={300} y={560} texto="FDA · GRAS" o={kprog(T, K.Ci + 1.4, K.Ci + 1.7, kEase.sale)} color={KC.blue} rot={-8} tam={60} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="☠ ¿veneno?" x={300} y={400} tam={46} />
      <Chip T={T} at={K.G + 3.1} until={K.Q - 0.3} texto="glutamato" x={300} y={400} tam={46} borde={GLU} />
      <Etq T={T} at={K.Q + 1.0} until={K.U - 0.3} x={290} y={630} texto="sodio" lado="der" tam={34} color={NA} />
      <Etq T={T} at={K.Q + 1.3} until={K.U - 0.3} x={640} y={640} texto="glutamato" lado="der" tam={34} color={GLU} />
      <Chip T={T} at={K.Q + 2.2} until={K.U - 0.3} texto="un aminoácido de las proteínas" y={1570} tam={36} borde={GLU} />
      <Chip T={T} at={K.U + 0.3} until={uOlla - 0.3} texto="glutamato natural" y={1500} tam={42} borde={GLU} />
      <TarjetaEstudio T={T} at={uOlla} until={uLengua + 0.2} anio="1908" quien="Kikunae Ikeda · Tokio" revista="caldo de alga (kombu)" y={1580} />
      <Etq T={T} at={uOlla + 0.6} until={uLengua - 0.3} x={780} y={820} texto="Laminaria japonica" it lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={uLengua + 0.6} until={K.Gr - 0.3} texto="el sabor umami" y={1500} tam={44} borde={GLU} />
      <Etq T={T} at={K.Gr + 0.6} until={grBarras - 0.3} x={520} y={700} texto="tu intestino" lado="der" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Gr + 1.2} until={grBarras - 0.3} texto="la proteína suelta glutamato" x={620} y={1500} tam={34} borde={GLU} />
      <Chip T={T} at={grBarras + 0.6} until={K.Pr - 0.3} texto="FDA · adulto promedio, al día" y={1500} tam={36} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.Ca + 0.2} until={K.Ca + 3.0} anio="1968" quien="carta al editor" revista="New England Journal of Medicine" y={1580} />
      <Chip T={T} at={K.Ca + 3.6} until={K.So - 0.3} texto="cuello entumido · palpitaciones" y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={K.So + 3.4} until={K.Es - 0.3} texto="nace la mala fama" y={1500} tam={44} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={eGrid} anio="2000" quien="Geha et al. · Harvard (Boston) y otros centros" revista="doble ciego · J Allergy Clin Immunol" y={760} />
      <Chip T={T} at={eGrid + 0.4} until={eGlu - 0.2} texto="130 personas · 5 g o placebo" y={1500} tam={38} borde={KC.ink} />
      <Chip T={T} at={eGlu + 0.2} until={eRep - 0.2} texto="sin comida · glutamato: 50 de 130" y={1500} tam={34} borde={GLU} />
      <Chip T={T} at={ePla + 0.2} until={eRep - 0.2} texto="placebo: 17 de 130" y={1600} tam={34} borde={KC.cyan} />
      <Chip T={T} at={eRep + 0.1} until={eComida - 0.2} texto="repiten la prueba: 37" y={1500} tam={36} borde={KC.ink} />
      <Chip T={T} at={eMitad + 0.4} until={eComida - 0.2} texto="19 de 37 · la mitad" y={1600} tam={36} borde={GLU} />
      <Chip T={T} at={eComida + 0.2} until={K.Le - 0.3} texto="con comida: nada constante" y={1500} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Le + 0.6} until={K.Ci - 0.3} texto="aminoácido n.º 1 de la leche materna" y={1500} tam={32} borde={GLU} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="glutamato = el de tu jitomate" y={1500} tam={38} borde={GLU} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es veneno: *es glutamato.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.U - 0.1} texto="La sal de *un aminoácido.*" />
      <Subtitulo T={T} idx={2} at={K.U + 0.1} until={K.Gr - 0.1} texto="Jitomate, queso… *y umami.*" />
      <Subtitulo T={T} idx={3} at={K.Gr + 0.1} until={K.Pr - 0.1} texto="*13 gramos* contra medio gramo." />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Ca - 0.1} texto="¿Y *su mala fama?*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.So - 0.1} texto="1968: *una carta.*" />
      <Subtitulo T={T} idx={6} at={K.So + 0.1} until={K.Es - 0.1} texto="Sospechas *sin pruebas.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Le - 0.1} texto="Al repetir, *la mitad ya no.*" />
      <Subtitulo T={T} idx={8} at={K.Le + 0.1} until={K.Ci - 0.1} texto="Está en *la leche materna.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El mismo *de tu jitomate.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Umami + 1.0, CUES.Gramos - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Gramos + 1.8, CUES.Pregunta - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Carta + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Carta + 1.5, CUES.Sospechas - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Sospechas + 0.5, CUES.Estudio - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.2, CUES.Estudio + 11.9, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Leche + 0.3, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="49" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GlutamatoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Glutamato /></CompositionStage></div>;
}
window.GlutamatoApp = GlutamatoApp;
