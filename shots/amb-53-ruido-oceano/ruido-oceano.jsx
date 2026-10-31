// Shot Ambiental #53 · Este mar no está en silencio (el ruido de los barcos y el estrés de las ballenas) — NARRADO (N5 el experimento).
// Datos: Rolland et al. 2012 (Proc. R. Soc. B), McDonald et al. 2006 (JASA), DOSITS (2024) y programa ECHO (2017). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (mapas, ondas y tamaños no están a escala).

const RO_AGUA1 = '#2a9ef0', RO_AGUA2 = '#0b3f8c', RO_CIELO = '#7fdcff', RO_RUIDO = '#ff5a3c', RO_CANTO = '#9ff3ff';

// Ballena franca (Eubalaena) de lado, mirando a la izquierda: cuerpo robusto y negro, SIN aleta dorsal, cabeza enorme con la
// mandíbula superior arqueada, labio inferior grande, callosidades blancas en la cabeza y aletas pectorales anchas como remo.
function BallenaFranca({ x, y, s = 1, T = 0, flip = false, fase = 0, o = 1 }) {
  const c = Math.sin(T * 2.2 + fase), cola = c * 10, aleta = c * 6;
  return <g transform={`translate(${x} ${y + c * 6}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    {/* cola: pedúnculo y aleta caudal ancha con muesca */}
    <g transform={`rotate(${cola} 300 0)`}>
      <path d="M 300 -22 Q 330 -12 350 -4 Q 395 -60 450 -66 Q 425 -20 372 2 Q 425 24 450 70 Q 395 64 350 8 Q 330 14 300 22 Z" fill="#1c1d22" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>
    {/* cuerpo */}
    <path d="M -300 -6 Q -268 -86 -170 -92 Q -40 -104 110 -70 Q 230 -42 310 -18 L 310 20 Q 220 48 110 62 Q -40 96 -175 80 Q -282 62 -300 -6 Z" fill="#1c1d22" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {/* panza un poco más clara */}
    <path d="M -150 78 Q -40 92 100 60 Q 20 74 -150 70 Z" fill="#3a3d46" />
    {/* línea de la boca, muy arqueada */}
    <path d="M -296 2 Q -250 -46 -170 -30 Q -140 -24 -128 0" stroke="#5c606b" strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* labio inferior grande */}
    <path d="M -292 10 Q -240 56 -150 40" stroke="#5c606b" strokeWidth={4} fill="none" />
    {/* ojo */}
    <circle cx={-118} cy={6} r={7} fill="#e9e2cf" /><circle cx={-117} cy={6} r={3.5} fill={KC.ink} />
    {/* callosidades */}
    {[[-272, -50, 14, 9], [-244, -72, 16, 9], [-210, -84, 13, 8], [-178, -88, 10, 6], [-138, -22, 9, 6], [-262, 30, 10, 7], [-232, 46, 9, 6]].map(([a, b, rx, ry], i) =>
      <ellipse key={i} cx={a} cy={b} rx={rx} ry={ry} fill="#e9e2cf" stroke={KC.ink} strokeWidth={2.5} />)}
    {/* espiráculo en V (dos orificios) */}
    <path d="M -150 -94 l 8 -6 M -136 -96 l 6 -7" stroke="#5c606b" strokeWidth={4} strokeLinecap="round" />
    {/* aleta pectoral ancha, tipo remo */}
    <g transform={`rotate(${aleta} -70 48)`}><path d="M -90 44 Q -96 120 -54 142 Q -26 140 -34 100 Q -40 64 -50 46 Z" fill="#26282e" stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}

// Carguero de lado (proa a la izquierda), línea de flotación en y = 0. helice = vueltas por segundo.
function Barco({ x, y, s = 1, T = 0, helice = 3, o = 1 }) {
  const a = T * helice * Math.PI * 2;
  const colores = [KC.red, KC.yellow, KC.cyan, KC.mint, KC.orange, KC.pink, KC.blue, KC.lilac];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {/* hélice y timón bajo el agua */}
    <rect x={262} y={8} width={14} height={34} fill="#555b66" stroke={KC.ink} strokeWidth={4} />
    <g transform="translate(250 34)">
      {[0, 1, 2].map((k) => { const ang = a + k * 2.094; return <ellipse key={k} cx={0} cy={Math.sin(ang) * 14} rx={7} ry={Math.abs(Math.cos(ang)) * 16 + 3} fill="#d9a43a" stroke={KC.ink} strokeWidth={3} />; })}
      <circle r={7} fill="#8a6a2a" stroke={KC.ink} strokeWidth={3} />
    </g>
    <path d="M 290 30 L 312 30 L 312 -10" stroke={KC.ink} strokeWidth={0} fill="none" />
    {/* casco */}
    <path d="M -320 -60 L 300 -60 L 300 10 Q 290 40 240 44 L -250 44 Q -300 30 -320 -60 Z" fill="#c8323a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -320 -60 L 300 -60 L 300 -6 L -296 -6 Q -310 -30 -320 -60 Z" fill="#253248" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {/* contenedores */}
    {Array.from({ length: 2 }, (_, f) => Array.from({ length: 7 }, (_, c) =>
      <rect key={f + '-' + c} x={-260 + c * 62} y={-60 - 40 * (f + 1)} width={58} height={38} fill={colores[(c * 3 + f * 5) % colores.length]} stroke={KC.ink} strokeWidth={4} />))}
    {/* puente y chimenea */}
    <rect x={190} y={-190} width={90} height={130} fill="#f4efe4" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((k) => <rect key={k} x={200 + k * 26} y={-176} width={18} height={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />)}
    <rect x={240} y={-232} width={32} height={44} fill={KC.ink} />
  </g>;
}

// Ondas de ruido que salen de un punto (anillos que crecen). n anillos, R radio máximo, vel = anillos por segundo.
function Anillos({ T, x, y, n = 5, R = 600, vel = 0.9, color = RO_RUIDO, g = 1, ancho = 8 }) {
  if (g <= 0.01) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = ((T * vel + i / n) % 1 + 1) % 1, r = 20 + u * R * g;
    return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={ancho * (0.5 + 0.5 * g)} opacity={(1 - u) * 0.85 * Math.min(1, g * 1.4)} />; })}</g>;
}

// Canto grave de ballena: onda larga que viaja de (x0,y0) a (x1,y1).
function Canto({ T, x0, y0, x1, y1, amp = 26, lam = 220, g = 1, color = RO_CANTO }) {
  if (g <= 0.01) return null;
  const L = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI, n = 60;
  const pts = Array.from({ length: n + 1 }, (_, i) => { const d = (i / n) * L * g; return `${d.toFixed(1)},${(Math.sin((d / lam) * Math.PI * 2 - T * 5) * amp * Math.sin(Math.PI * i / n)).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x0} ${y0}) rotate(${ang})`}><polyline points={pts} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" opacity={0.9} /></g>;
}

// El mar en corte: cielo arriba, superficie con olas en y = sup, agua que se oscurece hacia abajo.
function MarCorte({ T, sup = 700, id = 'm' }) {
  const olas = Array.from({ length: 41 }, (_, i) => { const xx = i * 28; return `${xx},${(sup + Math.sin(xx / 60 + T * 2) * 9).toFixed(1)}`; }).join(' ');
  return <g>
    <defs><linearGradient id={'ag' + id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={RO_AGUA1} /><stop offset="1" stopColor={RO_AGUA2} /></linearGradient></defs>
    <rect x={0} y={sup} width={KW} height={3000} fill={`url(#ag${id})`} />
    <polygon points={`0,${sup + 30} ${olas} ${KW + 40},${sup + 30} ${KW + 40},${sup - 2} 0,${sup - 2}`} fill={RO_AGUA1} opacity={0} />
    <polyline points={olas} fill="none" stroke="#e6fbff" strokeWidth={8} />
    {Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.25 + i / 10) % 1); return <circle key={i} cx={(i * 113) % KW} cy={sup + 1300 - u * 1250} r={4 + (i % 3) * 3} fill="#cdf3ff" opacity={0.35 * (1 - u)} />; })}
  </g>;
}

// Bocina con raya (silencio) para el gancho.
function Silencio({ x, y, s = 1, raya = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={92} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d="M -50 -22 L -22 -22 L 12 -52 L 12 52 L -22 22 L -50 22 Z" fill={KC.ink} />
    <path d="M 28 -24 Q 46 0 28 24 M 42 -40 Q 70 0 42 40" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <line x1={-62} y1={-62} x2={-62 + 124 * raya} y2={-62 + 124 * raya} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
  </g>;
}

// Medidor vertical de decibeles (columna). valor 0..1.
function MedidorDb({ x, y, valor, alto = 460, texto, etiqueta, color = RO_RUIDO }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-alto} width={140} height={alto} rx={20} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-58} y={-alto * valor + 2} width={116} height={Math.max(0, alto * valor - 14)} rx={14} fill={color} />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={-70} y1={-alto * q} x2={-40} y2={-alto * q} stroke={KC.ink} strokeWidth={4} />)}
    {texto && <text x={0} y={-alto - 24} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{texto}</text>}
    {etiqueta && <text x={0} y={58} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{etiqueta}</text>}
  </g>;
}

// Tubo de laboratorio con un nivel (hormonas de estrés medidas en la muestra).
function Tubo({ x, y, nivel = 0.8, color = KC.orange }) {
  const h = 320;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-46} y={-h - 30} width={92} height={30} rx={8} fill="#7a8494" stroke={KC.ink} strokeWidth={5} />
    <path d={`M -38 ${-h} L -38 -40 Q -38 0 0 0 Q 38 0 38 -40 L 38 ${-h} Z`} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
    <path d={`M -31 ${-h * nivel} L -31 -40 Q -31 -7 0 -7 Q 31 -7 31 -40 L 31 ${-h * nivel} Z`} fill={color} />
    <rect x={-31} y={-h * nivel} width={62} height={10} fill="#fff" opacity=".35" />
  </g>;
}

// Velocímetro de barco (nudos esquemáticos, sin cifra). v 0..1.
function Velocimetro({ x, y, v = 1, r = 150 }) {
  const ang = -180 + 180 * v;
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r + 22} 0 A ${r - 22} ${r - 22} 0 0 1 ${-(r - 22) * Math.cos(Math.PI / 3)} ${-(r - 22) * Math.sin(Math.PI / 3)}`} stroke={KC.mint} strokeWidth={18} fill="none" />
    <path d={`M ${(r - 22) * Math.cos(Math.PI / 3)} ${-(r - 22) * Math.sin(Math.PI / 3)} A ${r - 22} ${r - 22} 0 0 1 ${r - 22} 0`} stroke={KC.red} strokeWidth={18} fill="none" />
    <line x1={0} y1={0} x2={(r - 30) * Math.cos(ang * Math.PI / 180)} y2={(r - 30) * Math.sin(ang * Math.PI / 180)} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <circle r={16} fill={KC.ink} />
    <text x={-r + 10} y={40} style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>lento</text>
    <text x={r - 10} y={40} textAnchor="end" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>rápido</text>
  </g>;
}

// Mapa esquemático de la Bahía de Fundy (norte arriba): Nuevo Brunswick al noroeste, Nueva Escocia al sureste; la bahía abre al suroeste.
function MapaFundy({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={0} width={1000} height={560} rx={24} fill="#3db6f2" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 0 L 1000 0 L 1000 130 L 905 150 Q 760 200 560 270 Q 330 350 140 430 L 0 480 Z" fill="#f6e3a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 1000 130 L 1000 560 L 560 560 Q 420 520 300 500 Q 380 450 560 370 Q 760 270 930 180 L 1000 160 Z" fill="#c7e6a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <text x={240} y={120} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Nuevo Brunswick</text>
    <text x={690} y={470} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Nueva Escocia</text>
    <text x={380} y={350} transform="rotate(-21 380 350)" style={{ font:`italic 900 36px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">Bahía de Fundy</text>
    <text x={30} y={540} style={{ font:`700 26px ${KF.mono}` }} fill="#fff">Golfo de Maine</text>
    {children}
  </g>;
}
// Barquito para mapas.
function BarcoMini({ x, y, o = 1, rot = -21 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d="M -34 -6 L 30 -6 L 22 10 L -26 10 Z" fill="#c8323a" stroke={KC.ink} strokeWidth={4} />
    <rect x={-22} y={-20} width={30} height={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
    <rect x={12} y={-26} width={12} height={20} fill={KC.paper} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

function RuidoOceanoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Agua, B: CUES.Ballenas, H: CUES.Helices, P: CUES.Pregunta, E: CUES.Experimento, R: CUES.Resultado, Pr: CUES.Prueba, D: CUES.Decadas, L: CUES.Lento, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;

  // el mar del gancho y del cierre: la cámara baja de la superficie al agua
  const mar = (t0, cierre) => {
    const cam = cierre ? 520 : klerp(0, 520, kprog(T, t0 + 0.15, t0 + 2.2, kEase.suave));
    const sup = 1150;
    const ruido = cierre ? 0.35 : kprog(T, t0 + 1.2, t0 + 2.4);
    const bx = cierre ? klerp(560, 620, kprog(T, t0, t0 + 6)) : klerp(120, 420, kprog(T, t0, t0 + 6));
    return svg(<>
      <defs><clipPath id={'bajo' + (cierre ? 'c' : 'g')}><rect x={0} y={sup - cam + 6} width={KW} height={3000} /></clipPath></defs>
      <g transform={`translate(0 ${-cam})`}>
        <MarCorte T={T} sup={sup} id={cierre ? 'c' : 'g'} />
        <g clipPath={`url(#bajo${cierre ? 'c' : 'g'})`} transform={`translate(0 ${cam})`}><g transform={`translate(0 ${-cam})`}>
          <Anillos T={T} x={bx + 250 * 0.8} y={sup + 34 * 0.8} R={720} g={ruido} vel={cierre ? 0.5 : 0.9} ancho={cierre ? 5 : 9} />
        </g></g>
        <Barco x={bx} y={sup} s={0.8} T={T} helice={cierre ? 1 : 3} />
        <BallenaFranca x={cierre ? 780 : 640} y={sup + 340} s={cierre ? 0.5 : 0.6} T={T} />
        {cierre && <><BallenaFranca x={250} y={sup + 480} s={0.4} T={T} flip fase={1.4} />
          <Canto T={T} x0={600} y0={sup + 360} x1={420} y1={sup + 470} amp={18} lam={110} g={kprog(T, t0 + 0.6, t0 + 1.8)} /></>}
      </g>
    </>);
  };

  // carrera del sonido: aire (≈340 m/s) contra agua (≈1,500 m/s). El agua llega en 1 s; el aire tarda 4.4 veces más.
  const t0c = K.A + 0.3, dAgua = 0.95, dAire = dAgua * 1500 / 340;
  const pAgua = kprog(T, t0c, t0c + dAgua), pAire = kprog(T, t0c, t0c + dAire);
  const pulso = (xx, yy, col) => <g transform={`translate(${xx} ${yy})`}>{[0, 1, 2].map((k) => <path key={k} d={`M ${-k * 22} -46 Q ${24 - k * 22} 0 ${-k * 22} 46`} stroke={col} strokeWidth={9} fill="none" strokeLinecap="round" opacity={1 - k * 0.28} />)}</g>;

  // experimento: 9 barcos → 3
  const posB = [[200, 455], [290, 420], [380, 385], [470, 350], [560, 315], [650, 280], [740, 245], [820, 215], [430, 395]];
  const quedan = [0, 4, 7];
  const baja = kprog(T, K.E + 2.0, K.E + 3.4);

  // resultado: ruido −6 dB y hormonas que bajan
  const dB = klerp(0.82, 0.52, kprog(T, K.R + 0.4, K.R + 1.8, kEase.suave));
  const horm = klerp(0.78, 0.42, kprog(T, K.R + 2.6, K.R + 4.0, kEase.suave));

  // décadas: barras
  const bar2 = kprog(T, K.D + 0.8, K.D + 2.4, kEase.sale);

  // lento: velocidad y ruido
  const vel = klerp(0.88, 0.38, kprog(T, K.L + 0.8, K.L + 3.0, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: un mar "en silencio"… y abajo, ruido */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.03}>
        <FondoLunares color={RO_CIELO} />
        {mar(K.G, false)}
        {svg(<g opacity={1 - kprog(T, K.G + 1.6, K.G + 2.4)}><Silencio x={230} y={420} s={1.1} raya={kprog(T, K.G + 0.1, K.G + 0.6, kEase.sale)} /></g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.paper} />
      </Escena>

      {/* 2 · el sonido en el agua: más de 4 veces más rápido */}
      <Escena T={T} a={K.A} b={K.B}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={60} y={700} width={960} height={180} rx={30} fill="#dff6ff" stroke={KC.ink} strokeWidth={7} />
          <rect x={60} y={910} width={960} height={180} rx={30} fill={RO_AGUA1} stroke={KC.ink} strokeWidth={7} />
          <text x={90} y={750} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>aire</text>
          <text x={90} y={960} style={{ font:`900 36px ${KF.texto}` }} fill="#fff">agua de mar</text>
          <line x1={960} y1={710} x2={960} y2={1080} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" />
          {pulso(150 + 790 * pAire, 800, KC.ink)}
          {pulso(150 + 790 * pAgua, 1010, '#fff')}
          <text x={930} y={750} textAnchor="end" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>≈ 340 m/s</text>
          <text x={930} y={960} textAnchor="end" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">≈ 1,500 m/s</text>
          {pAgua >= 1 && <text x={990} y={1030} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">✓</text>}
        </>)}
      </Escena>

      {/* 3 · las ballenas con barbas se hablan con sonidos graves */}
      <Escena T={T} a={K.B} b={K.H}>
        {svg(<><MarCorte T={T} sup={-20} id="b" />
          <BallenaFranca x={300} y={760} s={0.62} T={T} flip fase={0.3} />
          <BallenaFranca x={800} y={1060} s={0.5} T={T} fase={2} />
          <Canto T={T} x0={500} y0={780} x1={640} y1={1030} amp={24} lam={150} g={kprog(T, K.B + 0.6, K.B + 1.6)} />
          <Canto T={T} x0={620} y0={1080} x1={500} y1={820} amp={24} lam={150} g={kprog(T, K.B + 2.6, K.B + 3.6)} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.paper} />
      </Escena>

      {/* 4 · hélices y motores: ruido grave en las mismas notas */}
      <Escena T={T} a={K.H} b={K.P}>
        <FondoLunares color={RO_CIELO} />
        {svg(<>
          <defs><clipPath id="bajoH"><rect x={0} y={560} width={KW} height={3000} /></clipPath></defs>
          <MarCorte T={T} sup={555} id="h" />
          <g clipPath="url(#bajoH)"><Anillos T={T} x={700 + 250 * 1.1} y={555 + 34 * 1.1} R={900} g={kprog(T, K.H + 0.4, K.H + 1.2)} /></g>
          <Barco x={700} y={555} s={1.1} T={T} helice={3.5} />
          <BallenaFranca x={330} y={1020} s={0.55} T={T} flip />
          <Canto T={T} x0={500} y0={1000} x1={1000} y1={1080} amp={22} lam={150} g={kprog(T, K.H + 1.6, K.H + 2.4)} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1560} color={KC.paper} />
      </Escena>

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 820)`}>?</text>
          <BallenaFranca x={300} y={1120} s={0.4} T={T} flip /></>)}
      </Escena>

      {/* 6 · el experimento accidental: 11 de septiembre de 2001, Bahía de Fundy */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<MapaFundy x={40} y={620} s={1}>
          {posB.map(([a, b], i) => <BarcoMini key={i} x={a} y={b} o={quedan.includes(i) ? 1 : 1 - baja} />)}
        </MapaFundy>)}
      </Escena>

      {/* 7 · resultado: −6 dB y menos hormonas de estrés en la caca */}
      <Escena T={T} a={K.R} b={K.Pr}>
        {svg(<><MarCorte T={T} sup={-20} id="r" />
          <MedidorDb x={220} y={1100} valor={dB} texto={T > K.R + 1.8 ? '−6 dB' : ' '} etiqueta="ruido" />
          {/* muestra de heces flotando y flecha al tubo */}
          <g transform={`translate(500 ${880 + Math.sin(T * 2) * 8})`} opacity={kprog(T, K.R + 1.8, K.R + 2.3)}>
            <path d="M -60 0 Q -50 -40 -6 -36 Q 30 -50 56 -18 Q 74 14 40 30 Q 0 46 -36 30 Q -70 22 -60 0 Z" fill="#b7652e" stroke={KC.ink} strokeWidth={5} />
            <circle cx={-20} cy={-10} r={6} fill="#d98a4e" /><circle cx={18} cy={4} r={5} fill="#d98a4e" />
          </g>
          <path d={`M 580 900 Q 660 860 700 ${klerp(900, 820, kprog(T, K.R + 2.2, K.R + 2.6))}`} stroke="#fff" strokeWidth={7} fill="none" strokeDasharray="14 10" opacity={kprog(T, K.R + 2.2, K.R + 2.6)} />
          <g opacity={kprog(T, K.R + 2.2, K.R + 2.6)}><Tubo x={790} y={1120} nivel={horm} /></g>
        </>)}
      </Escena>

      {/* 8 · la primera evidencia (Rolland et al. 2012) */}
      <Escena T={T} a={K.Pr} b={K.D}>
        {svg(<><MarCorte T={T} sup={-20} id="p" />
          <Anillos T={T} x={980} y={260} R={700} g={0.8} />
          <BallenaFranca x={560} y={1040} s={0.6} T={T} fase={0.8} />
        </>)}
      </Escena>

      {/* 9 · frente a California: el ruido más grave subió casi 3 dB por década */}
      <Escena T={T} a={K.D} b={K.L}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <rect x={360} y={560} width={660} height={620} rx={30} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
          <line x1={420} y1={1100} x2={980} y2={1100} stroke={KC.ink} strokeWidth={6} />
          <rect x={470} y={1100 - 260} width={170} height={260} fill="#7a8494" stroke={KC.ink} strokeWidth={6} />
          <rect x={740} y={1100 - 260 - 220 * bar2} width={170} height={260 + 220 * bar2} fill={RO_RUIDO} stroke={KC.ink} strokeWidth={6} />
          <text x={555} y={1150} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>1964–66</text>
          <text x={825} y={1150} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>2003–04</text>
          <text x={690} y={615} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>ruido de fondo de 30–50 Hz</text>
          {bar2 > 0.9 && <><line x1={660} y1={840} x2={660} y2={620 + 20} stroke={KC.ink} strokeWidth={0} />
            <path d="M 700 840 L 700 630" stroke={KC.ink} strokeWidth={6} markerEnd="" /><path d="M 686 650 L 700 628 L 714 650" stroke={KC.ink} strokeWidth={6} fill="none" />
            <text x={560} y={780} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={RO_RUIDO} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">+10 a 12 dB</text></>}
        </>)}
      </Escena>

      {/* 10 · ir más lento: estrecho de Haro, 2017 */}
      <Escena T={T} a={K.L} b={K.C}>
        <FondoLunares color={RO_CIELO} />
        {svg(<>
          <defs><clipPath id="bajoL"><rect x={0} y={905} width={KW} height={3000} /></clipPath></defs>
          <MarCorte T={T} sup={900} id="l" />
          <g clipPath="url(#bajoL)"><Anillos T={T} x={420 + 250 * 0.9} y={900 + 34 * 0.9} R={800} g={klerp(1, 0.35, kprog(T, K.L + 0.8, K.L + 3.0))} vel={klerp(0.9, 0.5, kprog(T, K.L + 0.8, K.L + 3.0))} /></g>
          <Barco x={420} y={900} s={0.9} T={T} helice={klerp(3.5, 1.2, kprog(T, K.L + 0.8, K.L + 3.0))} />
          <Velocimetro x={250} y={540} v={vel} r={140} />
          <BallenaFranca x={800} y={1120} s={0.4} T={T} flip fase={0.5} />
        </>)}
      </Escena>

      {/* 11 · cierre: el mar del inicio, más callado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <FondoLunares color={RO_CIELO} />
        {mar(K.C, true)}
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.A + 0.4} until={K.B - 0.2} texto="el sonido en el agua: × 4.4" y={600} x={400} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.8} until={K.H - 0.2} x={520} y={560} texto="ballena franca" tam={34} />
      <Etq T={T} at={K.B + 1.2} until={K.H - 0.2} x={520} y={610} texto="Eubalaena glacialis" it tam={30} />
      <Chip T={T} at={K.B + 2.0} until={K.H - 0.2} texto="se detectan a cientos de km" y={1440} x={540} tam={34} borde={RO_CANTO} />
      <Etq T={T} at={K.H + 0.6} until={K.P - 0.2} x={1075} y={600} texto="hélice" lado="izq" tam={32} />
      <Chip T={T} at={K.H + 1.4} until={K.P - 0.2} texto="ruido de barcos: 20–200 Hz" y={1440} x={540} tam={36} borde={RO_RUIDO} />
      <TarjetaEstudio T={T} at={K.E + 0.5} until={K.R - 0.2} anio="2001" quien="Bahía de Fundy, Canadá" revista="tras el 11 de septiembre" x={540} y={400} />
      <Chip T={T} at={K.E + 2.0} until={K.R - 0.2} texto="barcos grandes (2 días): 9 → 3" y={1440} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.R + 2.3} until={K.Pr - 0.2} x={500} y={970} texto="heces" tam={30} />
      <Chip T={T} at={K.R + 3.0} until={K.Pr - 0.2} texto="hormonas de estrés ↓" y={1440} x={540} tam={38} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Pr + 0.7} until={K.D - 0.2} anio="2012" quien="Rolland et al." revista="Proc. R. Soc. B" x={420} y={640} />
      <Chip T={T} at={K.Pr + 1.6} until={K.D - 0.2} texto="primera evidencia: ruido ↔ estrés crónico" y={1440} x={540} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.D + 0.4} until={K.L - 0.2} x={1010} y={520} texto="isla San Nicolás, California" lado="izq" tam={26} color={KC.ink} />
      <Chip T={T} at={K.D + 2.6} until={K.L - 0.2} texto="+2.5 a 3 dB por década (30–50 Hz, un sitio)" y={1440} x={540} tam={28} borde={RO_RUIDO} />
      <Chip T={T} at={K.L + 2.6} until={K.C - 0.2} texto="estrecho de Haro · 2017 · ruido de fondo −2.5 dB" y={1440} x={540} tam={26} borde={KC.mint} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="barcos lentos = mar más callado" y={1440} x={540} tam={34} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Este mar *no está en silencio.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.B - 0.1} texto="En el agua: *4 veces más rápido.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.H - 0.1} texto="Sonidos graves: *cientos de km.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.P - 0.1} texto="Hélices y motores: *las mismas notas.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo sabes *si la estresa?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="Después del 11-S: *menos barcos.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Pr - 0.1} texto="−6 dB y *menos hormonas de estrés.*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.D - 0.1} texto="Ruido de barcos y *estrés crónico.*" />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={K.L - 0.1} texto="Casi *3 dB más cada década.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.C - 0.1} texto="Ir más lento *baja el ruido.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Basta con *levantar el pie.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Agua + 1.4, CUES.Ballenas + 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Helices + 0.6, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Experimento - 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Resultado + 1.2, CUES.Prueba + 0.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Decadas + 1.0, CUES.Decadas + 6.6, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Lento + 2.0, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_08_recostado_mano', 'izq-alto']]} />
      <MarcaAgua T={T} tema="fisica" num="53" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RuidoOceanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RuidoOceanoShot /></CompositionStage></div>;
}
window.RuidoOceanoApp = RuidoOceanoApp;
