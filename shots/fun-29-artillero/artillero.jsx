// Shot Fungi Mati #29 · Las manchitas negras de tu coche: el hongo artillero (Sphaerobolus) — NARRADO (gancho 1 "no es X: es Y" + N5/N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Morfología: cuerpos fructíferos esféricos de 1–2.5 mm, crema a naranja; se abren desde la punta en dientes (estrella);
// adentro, una sola bolita oscura (peridiolo, 1–2 mm) sobre una copa interna clara que, al voltearse, la dispara
// y queda como burbuja brillante.

const AR = { naranja:'#f0a23a', naranja2:'#d97f1f', crema:'#f7ead0', crema2:'#e6d2a6', bolita:'#1b1410', madera:['#a0652e', '#c58a4a', '#7a4a22', '#d9a566', '#8c5a2b'], agua:'#5fc8ff', pared:'#f3e2bf', vidrio:'#a9dcff' };

// Astillas de madera del mantillo dentro de un rectángulo.
function Astillas({ x, y, w, h, n = 60, seed = 3, s = 1, caen = 1, fondo = '#5b3a22' }) {
  const r = krng(seed);
  const items = Array.from({ length: n }, () => ({ x: r() * w, y: r() * h, a: r() * 180, l: 40 + r() * 50, g: 12 + r() * 10, c: AR.madera[Math.floor(r() * AR.madera.length)], d: r() }));
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={fondo} />
    {items.map((it, i) => { const k = kclamp(caen * 1.6 - it.d * 0.6, 0, 1); const yy = klerp(it.y - 260, it.y, kEase.sale(k)); return k > 0 ? <rect key={i} opacity={kclamp(k * 3, 0, 1)} x={-it.l * s / 2} y={-it.g * s / 2} width={it.l * s} height={it.g * s} rx={5 * s} fill={it.c} stroke={KC.ink} strokeWidth={2.5} transform={`translate(${x + it.x} ${y + yy}) rotate(${it.a})`} /> : null; })}
  </g>;
}
// Coche blanco de lado. (x, y) = esquina inferior izquierda; w = largo. manchas: [[fx, fy, at]] en fracción del cuerpo.
function Coche({ T, x, y, w, manchas = [], color = '#fbfbf8' }) {
  const u = (fx, fy) => `${x + fx * w} ${y + fy * w}`;
  return <g>
    <path d={`M ${u(0, -0.08)} L ${u(0, -0.2)} Q ${u(0.02, -0.245)} ${u(0.12, -0.25)} L ${u(0.28, -0.27)} L ${u(0.39, -0.39)} Q ${u(0.42, -0.42)} ${u(0.46, -0.42)} L ${u(0.72, -0.42)} Q ${u(0.76, -0.42)} ${u(0.78, -0.39)} L ${u(0.88, -0.27)} Q ${u(1, -0.25)} ${u(1, -0.17)} L ${u(1, -0.08)} Z`} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${u(0.31, -0.27)} L ${u(0.41, -0.38)} L ${u(0.58, -0.38)} L ${u(0.58, -0.27)} Z`} fill={AR.vidrio} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${u(0.61, -0.27)} L ${u(0.61, -0.38)} L ${u(0.74, -0.38)} L ${u(0.84, -0.27)} Z`} fill={AR.vidrio} stroke={KC.ink} strokeWidth={5} />
    <line x1={x + 0.6 * w} y1={y - 0.27 * w} x2={x + 0.6 * w} y2={y - 0.09 * w} stroke="#c9c9c2" strokeWidth={4} />
    <rect x={x + 0.5 * w} y={y - 0.2 * w} width={0.06 * w} height={0.015 * w} rx={4} fill="#9aa3ad" />
    {[0.2, 0.8].map((fx, i) => <g key={i}><circle cx={x + fx * w} cy={y - 0.07 * w} r={0.085 * w} fill="#2a2a2e" stroke={KC.ink} strokeWidth={6} /><circle cx={x + fx * w} cy={y - 0.07 * w} r={0.04 * w} fill="#b8c0c8" /></g>)}
    {manchas.map(([fx, fy, at], i) => { const k = kprog(T, at, at + 0.12, kEase.rebote); return k > 0 ? <ellipse key={i} cx={x + fx * w} cy={y + fy * w} rx={Math.max(4, 0.011 * w) * k * 1.15} ry={Math.max(4, 0.011 * w) * k} fill={AR.bolita} /> : null; })}
  </g>;
}
// Cuerpo fructífero visto desde arriba. abre 0..1 (esfera → estrella), bolita 0/1, burbuja 0..1 (copa interna volteada).
function Estrellita({ x, y, s = 1, abre = 1, bolita = 1, burbuja = 0, rot = 0, n = 7 }) {
  const R = 40 + 18 * abre, r0 = 30;
  const pts = Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2, rr = i % 2 === 0 ? R : r0; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {abre < 0.15 ? <>
      <circle r={40} fill={AR.naranja} stroke={KC.ink} strokeWidth={4} />
      <circle cx={-12} cy={-14} r={10} fill="#ffd38a" />
      {abre > 0.02 && Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return <line key={i} x1={0} y1={0} x2={Math.cos(a) * 40 * abre / 0.15} y2={Math.sin(a) * 40 * abre / 0.15} stroke={KC.ink} strokeWidth={3} />; })}
    </> : <>
      <polygon points={pts} fill={AR.naranja} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      <circle r={r0 - 2} fill="#f6d9a0" stroke={KC.ink} strokeWidth={2} />
      {burbuja > 0 && <><circle r={22 * burbuja} fill="#fff7e6" stroke={KC.ink} strokeWidth={2.5} /><circle cx={-7} cy={-8} r={6 * burbuja} fill="#ffffff" /></>}
      {bolita > 0 && <><circle r={17 * Math.min(1, (abre - 0.15) / 0.5)} fill={AR.bolita} /><circle cx={-6} cy={-6} r={4 * Math.min(1, (abre - 0.15) / 0.5)} fill="#7a6a5a" />{[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={Math.cos(k * 2.5) * 9} cy={Math.sin(k * 2.5) * 8 + 3} r={1.6} fill="#4a3a2c" />)}</>}
    </>}
  </g>;
}
// Copita de lado (para mostrar a dónde apunta). rot en grados: 0 = boca hacia arriba.
function CopaLado({ x, y, s = 1, rot = 0, bolita = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -34 -6 L -42 -26 L -26 -14 L -20 -30 L -10 -14 L 0 -32 L 10 -14 L 20 -30 L 26 -14 L 42 -26 L 34 -6 Q 30 24 0 26 Q -30 24 -34 -6 Z" fill={AR.naranja} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -24 -8 Q 0 10 24 -8" fill="none" stroke={AR.crema} strokeWidth={8} />
    {bolita > 0 && <circle cx={0} cy={-14} r={13} fill={AR.bolita} />}
  </g>;
}
// Corte por dentro (lado): copa externa, capa interna (células alargadas) y la bolita. carga 0..1 hincha la capa; volteo 0..1 la invierte.
function Corte({ T, x, y, s = 1, carga = 0, volteo = 0, lanzo = -1, tiembla = 0 }) {
  const c = klerp(250, -260, volteo), midY = (c - 20) / 2;
  const sw = 34 + 22 * carga;
  const by = lanzo < 0 || T < lanzo ? midY - sw / 2 - 66 : midY - sw / 2 - 66 - 2600 * (T - lanzo);
  const jx = tiembla * Math.sin(T * 60) * 4;
  return <g transform={`translate(${x + jx} ${y}) scale(${s})`}>
    {/* copa externa con dientes */}
    <path d="M -250 -40 Q -262 220 0 232 Q 262 220 250 -40" fill="#c97a1e" stroke={KC.ink} strokeWidth={8} />
    <path d="M -214 -36 Q -222 186 0 196 Q 222 186 214 -36" fill="#3a2414" stroke={KC.ink} strokeWidth={4} />
    {[-1, 1].map((d) => <path key={d} d={`M ${d * 250} -40 L ${d * 300} -120 L ${d * 232} -60 L ${d * 214} -36 Z`} fill={AR.naranja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {/* capa interna (células en empalizada) */}
    <path d={`M -200 -10 Q 0 ${c} 200 -10`} fill="none" stroke={KC.ink} strokeWidth={sw + 10} strokeLinecap="round" />
    <path d={`M -200 -10 Q 0 ${c} 200 -10`} fill="none" stroke={volteo > 0.5 ? '#fff4dc' : AR.crema} strokeWidth={sw} strokeLinecap="round" />
    <path d={`M -200 -10 Q 0 ${c} 200 -10`} fill="none" stroke={AR.crema2} strokeWidth={sw - 8} strokeDasharray="3 15" />
    {volteo > 0.5 && <path d={`M -90 ${midY - 10} Q -40 ${midY - 34} 10 ${midY - 26}`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.9} />}
    {/* la bolita (peridiolo) */}
    <g transform={`translate(0 ${by})`}>
      <circle r={66} fill={AR.bolita} stroke="#f7ead0" strokeWidth={6} />
      <circle cx={-22} cy={-24} r={14} fill="#6d5e50" />
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * 34} cy={Math.sin(i * 2.4) * 30} r={5} fill="#4a3a2c" />)}
    </g>
    {lanzo > 0 && T > lanzo && T < lanzo + 0.5 && [-40, 0, 40].map((dx, i) => <line key={i} x1={dx} y1={by + 80} x2={dx} y2={by + 380} stroke="#ffffff" strokeWidth={8} opacity={1 - (T - lanzo) * 2} strokeLinecap="round" />)}
  </g>;
}
// Juguete de goma (media pelotita que se voltea y salta).
function Juguete({ T, x, y, s = 1, salto }) {
  const v = kprog(T, salto - 0.08, salto, kEase.sale);
  const h = T > salto ? Math.max(0, 900 * (T - salto) - 1500 * (T - salto) * (T - salto)) : 0;
  const c = klerp(-110, 40, v);
  return <g transform={`translate(${x} ${y - h}) scale(${s})`}>
    <path d={`M -90 0 Q 0 ${c * 1.6} 90 0 L 90 6 L -90 6 Z`} fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Persona de pie (escala): alto en px desde los pies (x, y).
function Persona({ x, y, alto = 230 }) {
  const k = alto / 230;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle cx={0} cy={-205} r={25} fill="#f2c29b" stroke={KC.ink} strokeWidth={5} />
    <path d="M -36 -175 Q 0 -185 36 -175 L 30 -95 L -30 -95 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    <path d="M -28 -95 L -22 0 L -4 0 L 0 -70 L 4 0 L 22 0 L 28 -95 Z" fill="#3b3f4a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Sol({ T, x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 12})`}>
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-r - 16} x2={0} y2={-r - 46} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
    {Array.from({ length: 10 }, (_, i) => <line key={'b' + i} x1={0} y1={-r - 16} x2={0} y2={-r - 46} stroke="#ffe11a" strokeWidth={5} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill="#ffe11a" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Casa({ x, y, w, h }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={AR.pared} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: Math.floor(h / 46) }, (_, i) => <line key={i} x1={x} y1={y + 46 * (i + 1)} x2={x + w} y2={y + 46 * (i + 1)} stroke="#dcc79c" strokeWidth={3} />)}
    <rect x={x + w * 0.25} y={y + 70} width={w * 0.5} height={150} fill={AR.vidrio} stroke={KC.ink} strokeWidth={6} />
    <line x1={x + w * 0.5} y1={y + 70} x2={x + w * 0.5} y2={y + 220} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Arco punteado de un tiro (parábola) con la bolita viajando: p 0..1.
function Tiro({ x0, y0, x1, y1, alto, p = 1, color = KC.ink, bolita = true, r = 12 }) {
  const P = (t) => [klerp(x0, x1, t), klerp(y0, y1, t) - alto * 4 * t * (1 - t)];
  const n = 30, m = Math.max(1, Math.round(n * p));
  const d = 'M ' + Array.from({ length: m + 1 }, (_, i) => P((i / n)).map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const [bx, by] = P(p);
  return <g>
    <path d={d} fill="none" stroke={color} strokeWidth={6} strokeDasharray="14 12" strokeLinecap="round" />
    {bolita && p > 0 && p < 1 && <circle cx={bx} cy={by} r={r} fill={AR.bolita} stroke="#fff" strokeWidth={3} />}
  </g>;
}
// Espátula que raspa.
function Espatula({ x, y, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-60} y={-14} width={120} height={28} rx={6} fill="#c8d0d8" stroke={KC.ink} strokeWidth={6} />
    <rect x={60} y={-12} width={170} height={24} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

const MANCHAS_INICIO = [[0.44, -0.2, 0.3], [0.52, -0.16, 0.85], [0.66, -0.21, 1.3], [0.38, -0.14, 1.75], [0.71, -0.13, 2.2]];
const MANCHAS_MAS = [[0.47, -0.23, 0], [0.55, -0.19, 0], [0.62, -0.15, 0], [0.35, -0.22, 0], [0.42, -0.11, 0], [0.69, -0.18, 0], [0.75, -0.22, 0], [0.5, -0.12, 0], [0.3, -0.17, 0], [0.82, -0.2, 0]];

function ArtilleroShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Mantillo, H: CUES.Hongo, Es: CUES.Estrella, Pr: CUES.Presion, D: CUES.Disparo, P: CUES.Pregunta, L: CUES.Luz, Di: CUES.Distancia, Pe: CUES.Pegada, E: CUES.Estudio, V: CUES.Viva, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const LANZA = K.D + 4.2;           // ¡pum!
  const cierreManchas = MANCHAS_INICIO.map(([a, b]) => [a, b, 0]).concat(MANCHAS_MAS.map(([a, b], i) => [a, b, K.C + 0.6 + i * 0.12]));
  const ESTUDIO_T0 = K.E + 3.4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: manchitas en un coche blanco junto a la jardinera */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Astillas x={0} y={1120} w={KW} h={800} n={70} seed={4} />
          <Coche T={T} x={50} y={1120} w={980} manchas={MANCHAS_INICIO} />
          {MANCHAS_INICIO.map(([fx, fy, at], i) => <Tiro key={i} x0={60 + i * 25} y0={1150} x1={50 + fx * 980} y1={1120 + fy * 980} alto={60} p={kprog(T, at - 0.22, at)} color="rgba(0,0,0,0)" r={9} />)}
        </>)}
      </Escena>
      {/* 2 · el mantillo: astillas alrededor de las plantas */}
      <Escena T={T} a={K.Ma} b={K.H} zoom={0.08} origen="50% 80%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={0} y={760} width={KW} height={60} fill="#b8b2a6" stroke={KC.ink} strokeWidth={6} />
          {[[300, 830, 150], [520, 760, 190], [760, 830, 150]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y - mece(T, i + 1, 0.4) * 6} r={r} fill={i === 1 ? '#2f9e44' : KC.leaf} stroke={KC.ink} strokeWidth={7} />)}
          <rect x={505} y={860} width={30} height={120} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
          <Astillas x={0} y={960} w={KW} h={960} n={110} seed={7} s={1.5} caen={kprog(T, K.Ma, K.Ma + 1.4)} />
        </>)}
      </Escena>
      {/* 3 · el hongo artillero entre las astillas (2 mm) */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={-40} y={820} width={1160} height={260} rx={40} fill="#c58a4a" stroke={KC.ink} strokeWidth={9} transform="rotate(-4 540 950)" />
          {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={20} y1={870 + i * 36} x2={1060} y2={850 + i * 36} stroke="#a0652e" strokeWidth={6} transform="rotate(-4 540 950)" />)}
          <rect x={-60} y={1060} width={700} height={140} rx={30} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} transform="rotate(8 300 1130)" />
          {[[420, 860, 0.0], [520, 845, 0.15], [620, 850, 0.3], [470, 930, 0.45], [580, 925, 0.6], [690, 900, 0.75], [370, 940, 0.9], [760, 840, 1.05], [520, 990, 1.2]].map(([x, y, d], i) => {
            const k = kprog(T, K.H + 0.2 + d, K.H + 0.6 + d, kEase.rebote);
            return k > 0 ? <Estrellita key={i} x={x} y={y} s={1.35 * k} abre={0} /> : null; })}
        </>)}
      </Escena>
      {/* 4 · se abre como estrella y muestra la bolita */}
      <Escena T={T} a={K.Es} b={K.Pr} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={-40} y={1060} width={1160} height={500} fill="#c58a4a" stroke={KC.ink} strokeWidth={9} />
          <Estrellita x={540} y={880} s={5} abre={kprog(T, K.Es + 0.3, K.Es + 2.3, kEase.suave)} />
        </>)}
      </Escena>
      {/* 5–6 · por dentro: la presión sube y la capa interna se voltea */}
      <Escena T={T} a={K.Pr} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Corte T={T} x={540} y={880} s={1.3} carga={kprog(T, K.Pr + 0.3, K.D + 1.0)} volteo={kprog(T, LANZA - 0.07, LANZA, kEase.sale)} lanzo={LANZA} tiembla={T > K.D + 0.6 && T < LANZA ? 1 : 0} />
          {T < LANZA + 0.1 && Array.from({ length: 14 }, (_, i) => { const t0 = K.Pr + 0.2 + i * 0.16, u = kprog(T, t0, t0 + 0.9); const a = -0.5 + (i % 7) * 0.17; return u > 0 && u < 1 ? <circle key={i} cx={540 + (i % 2 ? 1 : -1) * klerp(500, 200, u)} cy={klerp(1300, 1010 - (i % 7) * 6, u)} r={14} fill={AR.agua} stroke={KC.ink} strokeWidth={3} /> : null; })}
          {T > K.D + 1.6 && T < LANZA + 0.4 && <g opacity={kprog(T, K.D + 1.6, K.D + 1.9) * (1 - kprog(T, LANZA, LANZA + 0.4))}>
            <circle cx={800} cy={540} r={150} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
            <line x1={690} y1={620} x2={910} y2={620} stroke={KC.ink} strokeWidth={6} />
            <Juguete T={T} x={800} y={600} s={1.0} salto={K.D + 3.0} />
          </g>}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={300} y={1080} /><Coche T={T} x={120} y={1200} w={300} manchas={MANCHAS_INICIO.map(([a, b]) => [a, b, 0])} /></>)}
      </Escena>
      {/* 8 · apunta a la luz y a lo claro */}
      <Escena T={T} a={K.L} b={K.Di} zoom={0.04} origen="50% 70%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Sol T={T} x={150} y={440} />
          <Casa x={0} y={700} w={330} h={420} />
          <Coche T={T} x={460} y={1120} w={620} manchas={[[0.45, -0.18, K.L + 2.6], [0.6, -0.15, K.L + 3.0], [0.52, -0.22, K.L + 3.4]]} />
          <Astillas x={0} y={1120} w={KW} h={800} n={60} seed={9} />
          {[[200, 1150, -30, 0], [380, 1150, 40, 0.3], [600, 1150, 35, 0.6], [820, 1150, 20, 0.9]].map(([x, y, ang, d], i) => {
            const r = klerp(0, ang, kprog(T, K.L + 0.4 + d * 0.5, K.L + 1.2 + d * 0.5, kEase.suave));
            return <CopaLado key={i} x={x} y={y} s={1.3} rot={r} />; })}
          {T > K.L + 1.4 && [[200, 1120, 120, 860, 140], [380, 1120, 760, 1000, 160], [600, 1120, 830, 980, 120]].map(([x0, y0, x1, y1, al], i) =>
            <Tiro key={i} x0={x0} y0={y0} x1={x1} y1={y1} alto={al} p={kprog(T, K.L + 1.5 + i * 0.4, K.L + 2.4 + i * 0.4)} color="rgba(22,18,15,.85)" />)}
        </>)}
      </Escena>
      {/* 9 · hasta ~6 m de lejos y más de 2 m de alto */}
      <Escena T={T} a={K.Di} b={K.Pe} zoom={0.03} origen="50% 70%">
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Astillas x={60} y={1180} w={240} h={700} n={20} seed={11} fondo="#5b3a22" />
          <rect x={300} y={1180} width={780} height={700} fill="#c9ced4" stroke={KC.ink} strokeWidth={6} />
          <Coche T={T} x={780} y={1180} w={300} manchas={[[0.5, -0.2, K.Di + 2.2]]} />
          <Persona x={560} y={1180} alto={233} />
          <Tiro x0={180} y0={1175} x1={930} y1={1120} alto={300} p={kprog(T, K.Di + 0.4, K.Di + 2.2, kEase.suave)} />
          <g opacity={kprog(T, K.Di + 1.0, K.Di + 1.4)}>
            <line x1={180} y1={1140} x2={990} y2={1140} stroke={KC.ink} strokeWidth={7} />
            <path d="M 180 1140 l 22 -14 l 0 28 Z M 990 1140 l -22 -14 l 0 28 Z" fill={KC.ink} />
          </g>
          <g opacity={kprog(T, K.Di + 2.2, K.Di + 2.6)}>
            <line x1={120} y1={1180} x2={120} y2={906} stroke={KC.ink} strokeWidth={7} />
            <path d="M 120 906 l -14 22 l 28 0 Z" fill={KC.ink} />
            <line x1={100} y1={906} x2={700} y2={906} stroke={KC.ink} strokeWidth={3} strokeDasharray="10 10" />
          </g>
        </>)}
      </Escena>
      {/* 10 · se pega en la pintura; rasparla daña y mancha */}
      <Escena T={T} a={K.Pe} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={60} y={700} width={960} height={470} rx={40} fill="#fbfbf8" stroke={KC.ink} strokeWidth={9} />
          <path d="M 100 760 Q 540 720 980 760" stroke="#ffffff" strokeWidth={18} fill="none" opacity={0.8} />
          {(() => { const llega = kprog(T, K.Pe + 0.05, K.Pe + 0.35), raspa = kprog(T, K.Pe + 1.8, K.Pe + 2.4, kEase.suave);
            return <>
              {llega < 1 && <circle cx={klerp(-60, 440, llega)} cy={klerp(1300, 930, llega)} r={60} fill={AR.bolita} />}
              {llega >= 1 && raspa < 0.6 && <g><ellipse cx={440} cy={930} rx={120} ry={105} fill="rgba(214,160,60,.35)" stroke="rgba(150,100,30,.6)" strokeWidth={4} /><ellipse cx={440} cy={930} rx={82} ry={66} fill={AR.bolita} /><ellipse cx={418} cy={910} rx={20} ry={12} fill="#6d5e50" /></g>}
              {raspa > 0.5 && <g opacity={kprog(T, K.Pe + 2.1, K.Pe + 2.5)}><ellipse cx={440} cy={930} rx={96} ry={78} fill="rgba(120,80,40,.55)" />
                {[-40, -15, 10, 35].map((d, i) => <line key={i} x1={350} y1={900 + d} x2={560} y2={930 + d} stroke="#9c8f80" strokeWidth={4} />)}</g>}
              {raspa > 0 && raspa < 1 && <Espatula x={klerp(760, 420, raspa)} y={930 + Math.sin(raspa * 20) * 8} />}
            </>; })()}
        </>)}
      </Escena>
      {/* 11 · el estudio de Penn State: 27 mantillos */}
      <Escena T={T} a={K.E} b={K.V} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {T > ESTUDIO_T0 - 0.4 && Array.from({ length: 27 }, (_, i) => {
            const c = i % 9, f = Math.floor(i / 9), x = 70 + c * 106, y = 790 + f * 140, r = krng(i + 40);
            const vel = 0.55 + r() * 0.45, prog = kprog(T, ESTUDIO_T0 + 0.2, ESTUDIO_T0 + 0.2 + 4.2 / vel);
            const ent = kprog(T, ESTUDIO_T0 - 0.4 + i * 0.03, ESTUDIO_T0 - 0.1 + i * 0.03, kEase.rebote);
            return <g key={i} transform={`translate(${x + 46} ${y + 60}) scale(${ent}) translate(${-x - 46} ${-y - 60})`}>
              <rect x={x} y={y} width={92} height={120} rx={10} fill={AR.madera[i % 5]} stroke={KC.ink} strokeWidth={5} />
              {[0, 1, 2].map((k) => <line key={k} x1={x + 10} y1={y + 30 + k * 30} x2={x + 82} y2={y + 24 + k * 30} stroke="rgba(0,0,0,.25)" strokeWidth={4} />)}
              {Array.from({ length: Math.floor(prog * 9) }, (_, k) => <circle key={k} cx={x + 14 + r() * 64} cy={y + 14 + r() * 92} r={7} fill={AR.bolita} stroke="#fff" strokeWidth={2} />)}
            </g>; })}
        </>)}
      </Escena>
      {/* 12 · viva más de 10 años */}
      <Escena T={T} a={K.V} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={60} y={700} width={960} height={470} rx={40} fill="#fbfbf8" stroke={KC.ink} strokeWidth={9} />
          <ellipse cx={540} cy={960} rx={120} ry={105} fill="rgba(214,160,60,.35)" stroke="rgba(150,100,30,.6)" strokeWidth={4} />
          <ellipse cx={540} cy={960} rx={82} ry={66} fill={AR.bolita} />
          {[0, 1].map((k) => { const u = ((T - K.V) * 0.9 + k * 0.5) % 1; return <circle key={k} cx={540} cy={960} r={90 + u * 120} fill="none" stroke={KC.leaf} strokeWidth={8} opacity={(1 - u) * kprog(T, K.V + 0.4, K.V + 0.8)} />; })}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo coche del inicio, ahora lleno de manchitas, y de dónde salen */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Astillas x={0} y={1120} w={KW} h={800} n={70} seed={4} />
          <Coche T={T} x={50} y={1120} w={980} manchas={cierreManchas} />
          <Sol T={T} x={560} y={430} r={55} />
          {T > K.C + 1.6 && <Tiro x0={110} y0={1150} x1={560} y1={940} alto={160} p={kprog(T, K.C + 1.6, K.C + 2.6)} color={KC.ink} />}
          <CopaLado x={110} y={1160} s={1.6} rot={35} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.4} until={K.Ma - 0.3} texto="¿lodo?" x={260} y={480} tam={54} />
      <Chip T={T} at={K.G + 2.7} until={K.Ma - 0.3} texto="disparos de un hongo" x={330} y={600} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.Ma + 1.4} until={K.H - 0.3} x={60} y={520} texto="mantillo" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Ma + 1.9} until={K.H - 0.3} x={60} y={580} texto="astillas de madera y corteza" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.0} until={K.Es - 0.3} x={60} y={520} texto="hongo artillero" tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.5} until={K.Es - 0.3} x={60} y={580} texto="Sphaerobolus" it tam={36} color={KC.ink} />
      <Etq T={T} at={K.H + 1.9} until={K.Es - 0.3} x={60} y={634} texto={<>(p. ej. <i>S. stellatus</i>)</>} tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 1.6} until={K.Pr - 0.3} texto="se abre como estrella" x={360} y={470} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.Es + 2.6} until={K.Pr - 0.3} texto="peridiolo: bolita con esporas" x={420} y={1110} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Es + 3.4} until={K.Pr - 0.3} x={690} y={760} texto="pegajosa" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Pr + 0.1} until={LANZA + 1.2} texto="POR DENTRO · CORTE" x={330} y={430} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.Pr + 0.6} until={K.D + 1.4} x={60} y={1240 - 60} texto="agua" tam={30} color={AR.agua} />
      <Etq T={T} at={K.Pr + 1.0} until={LANZA - 0.2} x={1040} y={790} lado="izq" texto="capa interna" tam={30} color={AR.crema} />
      <Medidor T={T} at={K.Pr + 0.4} until={LANZA} valor={(t) => kprog(t, K.Pr + 0.4, K.D + 3.6)} etiqueta="presión" texto={(v) => (v > 0.97 ? '¡al tope!' : 'sube…')} x={60} y={540} ancho={420} color={KC.red} />
      <Chip T={T} at={K.D + 2.0} until={LANZA - 0.2} texto="juguete de goma" x={800} y={730} tam={26} borde={KC.pink} />
      <Chip T={T} at={LANZA + 0.05} until={K.P - 0.3} texto="¡PUM!" x={540} y={560} tam={80} borde={KC.red} />
      <Etq T={T} at={LANZA + 0.8} until={K.P - 0.3} x={60} y={760} texto="capa interna volteada" tam={30} color={AR.crema} />
      <Chip T={T} at={K.L + 1.0} until={K.Di - 0.3} texto="apunta a la luz y a lo claro" x={400} y={600} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.L + 2.0} until={K.Di - 0.3} x={20} y={680} texto="casa color crema" tam={26} color={KC.ink} />
      <Etq T={T} at={K.L + 2.4} until={K.Di - 0.3} x={560} y={830} texto="coche blanco" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Di + 1.2} until={K.Pe - 0.3} texto="hasta ~6 m" x={400} y={1075} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Di + 2.4} until={K.Pe - 0.3} texto="más de 2 m de alto" x={330} y={840} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Pe + 0.5} until={K.E - 0.3} texto="seca, queda pegadísima" x={400} y={500} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Pe + 2.6} until={K.E - 0.3} x={560} y={1060} texto="mancha" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pe + 2.9} until={K.E - 0.3} texto="quítala mojada, antes de que se seque" x={540} y={1110} tam={30} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={ESTUDIO_T0 - 0.4} anio="2004" quien="Penn State · EUA" revista="27 mantillos · publicado en 2004" y={760} />
      {T > ESTUDIO_T0 && T < K.V && <div style={{ position:'absolute', left:70, top:600, zIndex:42, font:`900 54px ${KF.texto}`, color:KC.ink, opacity:kprog(T, ESTUDIO_T0, ESTUDIO_T0 + 0.3) * (1 - kprog(T, K.V - 0.3, K.V)) }}>año {Math.min(4, 1 + Math.floor(kprog(T, ESTUDIO_T0 + 0.2, ESTUDIO_T0 + 4.6) * 4))} de ~4</div>}
      <Chip T={T} at={ESTUDIO_T0 + 3.4} until={K.V - 0.3} texto="madera o corteza: todos lo dejaron disparar" x={540} y={740} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.V + 0.4} until={K.C - 0.3} valor={10} dur={0.8} sufijo=" años" etiqueta="puede seguir viva más de" x={360} y={560} tam={150} color={KC.leaf} />
      <MitoTachado T={T} at={K.C + 0.3} tacharEn={K.C + 0.9} until={K.Ou} texto="lodo" x={260} y={480} tam={54} />
      <Chip T={T} at={K.C + 1.3} until={K.Ou} texto="balas de un hongo" x={330} y={600} tam={42} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ma} texto="50 cm" largo={170} />
      <BarraEscala T={T} at={K.Ma} until={K.H} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.H} until={K.Es} texto="2 mm" largo={110} />
      <BarraEscala T={T} at={K.Es} until={K.Pr} texto="1 mm" largo={200} />
      <BarraEscala T={T} at={K.Pr} until={K.P} texto="0.5 mm" largo={180} />
      <BarraEscala T={T} at={K.P} until={K.L} texto="1 m" largo={130} />
      <BarraEscala T={T} at={K.L} until={K.Di} texto="1 m" largo={150} />
      <BarraEscala T={T} at={K.Di} until={K.Pe} texto="1 m" largo={137} />
      <BarraEscala T={T} at={K.Pe} until={K.E} texto="1 mm" largo={90} />
      <BarraEscala T={T} at={K.E} until={K.V} texto="27 parcelas" largo={140} color={KC.ink} />
      <BarraEscala T={T} at={K.V} until={K.C} texto="1 mm" largo={90} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No es lodo: *son disparos.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.H - 0.1} texto="Vienen del *mantillo.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Es - 0.1} texto="El *hongo artillero:* 2 mm" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Pr - 0.1} texto="Una *bolita pegajosa*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.D - 0.1} texto="Agua: *la presión sube.*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.P - 0.1} texto="Se voltea y… *¡pum!*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.L - 0.1} texto="¿Por qué *a tu coche?*" />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.Di - 0.1} texto="Apunta *a la luz.*" />
      <Subtitulo T={T} idx={8} at={K.Di + 0.1} until={K.Pe - 0.1} texto="Hasta *~6 m* de lejos" />
      <Subtitulo T={T} idx={9} at={K.Pe + 0.1} until={K.E - 0.1} texto="Raspar *puede dañar* la pintura." />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.V - 0.1} texto="Sembró el hongo en *27 mantillos.*" />
      <Subtitulo T={T} idx={11} at={K.V + 0.1} until={K.C - 0.1} texto="Viva *más de 10 años.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="*Balas* de un hongo" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.4, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pr + 0.2, K.D + 0.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [LANZA + 0.3, K.P - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.L + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.L + 0.8, K.Di - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pe + 0.5, K.E - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [ESTUDIO_T0, K.V - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.V + 0.3, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="29" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArtilleroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArtilleroShot /></CompositionStage></div>;
}
window.ArtilleroApp = ArtilleroApp;
