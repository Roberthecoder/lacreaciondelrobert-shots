// Shot Ambiental #49 · La abeja maya que no pica — NARRADO (N1 "Por dentro" + estudio a la mitad).
// Datos: Pat Fernández et al. 2018 (Estudios de Cultura Maya 52), Villanueva-Gutiérrez et al. 2013 (J. Kansas Entomol. Soc. 86),
// guía ECOSUR 2023, Moreno y Cardozo 2003, Landa (hacia 1566). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const MEL = { miel:'#e9a21c', polen:'#f2d03b', cera:'#7a4a22', cria:'#d9b98a', tronco:'#9a6a3a', troncoOsc:'#6e4824', disco:'#c99a5e', piel:'#f1c39a' };

// Melipona beecheii de lado, mirando a la derecha (origen en el tórax). ~136 px de largo con s = 1.
// Robusta, tórax con pelitos amarillos, abdomen negro con 5 franjas amarillo verdosas, ojos gris verdoso, alas pardo rojizas.
// muerde 0..1 abre las mandíbulas. vuela 0..1 agita las alas.
function Melipona({ T, x, y, s = 1, rot = 0, muerde = 0, vuela = 1, id = 'a', gris = 0 }) {
  const ala = vuela > 0 ? 0.35 + 0.65 * Math.abs(Math.sin(T * 53 + x)) : 1;
  const m = muerde * 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} style={{ filter: gris ? `grayscale(${gris})` : undefined }}>
    <defs><clipPath id={'mp' + id}><ellipse cx={-42} cy={8} rx={44} ry={27} /></clipPath></defs>
    {[[-4, 18, -16, 46], [8, 20, 8, 50], [18, 16, 32, 44]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${(a + c) / 2 - 4} ${(b + d) / 2 + 3} L ${c} ${d}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-42} cy={8} rx={44} ry={27} fill="#1d1a17" />
    <g clipPath={`url(#mp${id})`}>{[-74, -62, -50, -38, -26].map((a) => <rect key={a} x={a} y={-30} width={5} height={80} fill="#c9cf6a" />)}</g>
    <ellipse cx={-42} cy={8} rx={44} ry={27} fill="none" stroke={KC.ink} strokeWidth={5} />
    <circle cx={4} cy={0} r={25} fill="#d8a531" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const a = -2.6 + i * 0.4; return <line key={i} x1={4 + Math.cos(a) * 20} y1={Math.sin(a) * 20} x2={4 + Math.cos(a) * 31} y2={Math.sin(a) * 31} stroke="#b07f1c" strokeWidth={4} strokeLinecap="round" />; })}
    <circle cx={34} cy={4} r={17} fill="#2a2420" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={36} cy={0} rx={7} ry={10} fill="#8fa39a" stroke={KC.ink} strokeWidth={2} />
    <path d={`M 48 10 q 12 ${-4 - m * 0.3} 16 ${-2 - m * 0.5}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d={`M 48 14 q 12 ${4 + m * 0.3} 16 ${2 + m * 0.5}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M 40 -10 L 48 -28 L 60 -27" stroke={KC.ink} strokeWidth={3.5} fill="none" strokeLinecap="round" />
    <g opacity={0.9}>
      <ellipse cx={-14} cy={-30} rx={38} ry={14 * ala} fill="rgba(165,80,45,.5)" stroke={KC.ink} strokeWidth={3} transform="rotate(-16 -14 -30)" />
      <ellipse cx={-20} cy={-19} rx={26} ry={10 * ala} fill="rgba(165,80,45,.4)" stroke={KC.ink} strokeWidth={3} />
    </g>
  </g>;
}
// Dedo que entra desde abajo a la izquierda; la punta queda en (x, y).
function Dedo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(-28) scale(${s})`}>
    <rect x={-85} y={-40} width={170} height={900} rx={85} fill={MEL.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -50 -10 Q 0 -32 50 -10 L 46 60 Q 0 72 -46 60 Z" fill="#f8dcc3" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 240 q 40 16 80 0 M -40 270 q 40 16 80 0" stroke="#c98f68" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Una ollita de cera (pote de cerumen). tipo 'miel' | 'polen'. s = escala, o = aparición 0..1.
function Ollita({ x, y, s = 1, tipo = 'miel', o = 1, gris = 0 }) {
  if (o <= 0) return null;
  const f = tipo === 'miel' ? MEL.miel : MEL.polen;
  return <g transform={`translate(${x} ${y}) scale(${s * (0.4 + 0.6 * o)})`} opacity={kclamp(o * 2, 0, 1)}>
    <ellipse rx={22} ry={27} fill={gris ? '#9a958c' : f} stroke={MEL.cera} strokeWidth={5} />
    {tipo === 'miel' ? <ellipse cx={-7} cy={-10} rx={6} ry={8} fill="#fff" opacity={0.45} />
      : [[-6, -6], [6, 2], [-2, 10], [8, -12]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3} fill="#c88a14" />)}
  </g>;
}
// Racimo de ollitas (para las puntas del jobón). n ollitas, aparecen con p 0..1.
function Racimo({ x, y, p = 1, n = 9, seed = 3, s = 1 }) {
  const r = krng(seed);
  const pos = Array.from({ length: n }, (_, i) => ({ dx: ((i % 3) - 1) * 44 + (r() - 0.5) * 10, dy: (Math.floor(i / 3) - 1) * 52 + (r() - 0.5) * 8, t: r() < 0.65 ? 'miel' : 'polen' }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{pos.map((q, i) => <Ollita key={i} x={q.dx} y={q.dy} tipo={q.t} o={kclamp(p * n - i, 0, 1)} />)}</g>;
}
// Discos de cría horizontales apilados (centro del jobón).
function DiscosCria({ x, y, p = 1, n = 5, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: n }, (_, i) => {
    const o = kclamp(p * n - i, 0, 1), yy = (i - (n - 1) / 2) * 34;
    return <g key={i} opacity={o} transform={`translate(0 ${yy})`}>
      <ellipse rx={96} ry={16} fill={MEL.cria} stroke={MEL.cera} strokeWidth={4} />
      {Array.from({ length: 9 }, (_, k) => <circle key={k} cx={-72 + k * 18} cy={-2} r={5} fill="#b8935c" />)}
    </g>; })}</g>;
}
// Jobón: tronco hueco horizontal (≈ 50 cm) con discos de madera en las puntas y agujerito de entrada al centro.
// w = largo en px. discos 0..1. corte 0..1 = vista "por dentro" (crías al centro, ollitas en las puntas).
function Jobon({ T = 0, x, y, w = 760, h = 230, discos = 1, corte = 0, pCria = 1, pOllas = 1, gris = 0, s = 1 }) {
  const L = -w / 2, R = w / 2, ry = h / 2, ex = ry * 0.32;
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={{ filter: gris ? `grayscale(${gris}) brightness(${1 - gris * 0.25})` : undefined }}>
    <rect x={L} y={-ry} width={w} height={h} fill={MEL.tronco} stroke={KC.ink} strokeWidth={7} />
    {corte < 1 && Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${L + 40 + i * (w - 80) / 6} ${-ry + 14} q 14 ${ry * 0.6} 0 ${h - 28}`} stroke={MEL.troncoOsc} strokeWidth={5} fill="none" opacity={1 - corte} />)}
    {corte > 0 && <g opacity={corte}>
      <rect x={L + 16} y={-ry + 16} width={w - 32} height={h - 32} rx={18} fill="#2a1a10" stroke="#f4efe4" strokeWidth={3} strokeDasharray="12 8" />
      <DiscosCria x={0} y={0} p={pCria} s={Math.min(1, h / 230)} />
      <Racimo x={L + w * 0.17} y={0} p={pOllas} seed={4} s={Math.min(1, h / 230)} />
      <Racimo x={R - w * 0.17} y={0} p={pOllas} seed={9} s={Math.min(1, h / 230)} />
    </g>}
    <circle cx={0} cy={-ry + 2} r={Math.max(6, h * 0.05)} fill="#1a100a" stroke={KC.ink} strokeWidth={3} opacity={1 - corte * 0.7} />
    {[L, R].map((ax, i) => <g key={i} opacity={discos} transform={`translate(${ax} 0)`}>
      <ellipse rx={ex} ry={ry} fill={MEL.disco} stroke={KC.ink} strokeWidth={7} />
      <ellipse rx={ex * 0.6} ry={ry * 0.6} fill="none" stroke={MEL.troncoOsc} strokeWidth={4} />
      <ellipse rx={ex * 0.25} ry={ry * 0.25} fill="none" stroke={MEL.troncoOsc} strokeWidth={4} />
    </g>)}
  </g>;
}
// Panal hexagonal de abeja europea (para tacharlo).
function Panal({ x, y, s = 1, cols = 5, filas = 3, r = 28 }) {
  const hx = (cx, cy) => Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 3 * k + Math.PI / 6; return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ');
  const w = r * Math.sqrt(3);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: cols * filas }, (_, i) => {
    const c = i % cols, f = Math.floor(i / cols); const cx = (c - (cols - 1) / 2) * w + (f % 2) * w / 2, cy = (f - (filas - 1) / 2) * r * 1.5;
    return <polygon key={i} points={hx(cx, cy)} fill="#f5c542" stroke="#a8740f" strokeWidth={4} />; })}</g>;
}
// Caja de abeja europea (Apis mellifera) con un bastidor de panal hexagonal.
function CajaApis({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-150} width={340} height={300} rx={10} fill="#e8c27a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-190} y={-176} width={380} height={40} rx={8} fill="#cfa25c" stroke={KC.ink} strokeWidth={7} />
    <rect x={-130} y={-110} width={260} height={180} fill="#fff4cf" stroke={KC.ink} strokeWidth={5} />
    <Panal x={0} y={-20} cols={6} filas={4} r={22} />
    <rect x={-50} y={118} width={100} height={14} rx={6} fill="#3a2a1a" />
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${-140 + i * 110 + Math.sin(T * 3 + i) * 30} ${-220 + Math.cos(T * 2.4 + i) * 20}) scale(.55)`}>
      <ellipse cx={-30} cy={4} rx={34} ry={18} fill="#e2a33a" stroke={KC.ink} strokeWidth={5} /><circle cx={6} cy={0} r={16} fill="#b0772c" stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={-10} cy={-24} rx={26} ry={10} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} /></g>)}
  </g>;
}
// Frasco que se llena. lleno 0..1.
function Frasco({ x, y, lleno = 0, s = 1 }) {
  const h = 230 * lleno;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-100} y={-250} width={200} height={250} rx={30} fill="rgba(255,255,255,.65)" stroke={KC.ink} strokeWidth={7} />
    <clipPath id="frc"><rect x={-92} y={-242} width={184} height={234} rx={24} /></clipPath>
    <rect x={-92} y={-8 - h} width={184} height={h} fill={MEL.miel} clipPath="url(#frc)" />
    <rect x={-112} y={-290} width={224} height={46} rx={10} fill="#c0392b" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Casita de palma de las abejas (najil kaab) con jobones apilados. apaga 0..1 = cuántos se apagan.
function NajilKaab({ T, x, y, s = 1, apaga = 0, n = 6 }) {
  const pos = [[-120, 120], [0, 120], [120, 120], [-60, 40], [60, 40], [0, -40]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-240} y={-120} width={18} height={330} fill={MEL.troncoOsc} stroke={KC.ink} strokeWidth={5} />
    <rect x={222} y={-120} width={18} height={330} fill={MEL.troncoOsc} stroke={KC.ink} strokeWidth={5} />
    <path d="M -300 -100 L 0 -260 L 300 -100 Z" fill="#c7a24a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-260 + i * 65} y1={-108} x2={-5 + i * 2} y2={-250} stroke="#8d6d22" strokeWidth={4} />)}
    {pos.slice(0, n).map(([a, b], i) => <Jobon key={i} x={a} y={b} w={110} h={60} gris={kclamp(apaga * n - (n - 1 - i), 0, 1)} />)}
  </g>;
}
// Persona en silueta (mayor con bastón o joven caminando).
function Persona({ x, y, s = 1, mayor = false, paso = 0, color = KC.ink }) {
  const k = Math.sin(paso) * 14;
  return <g transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={color}>
    <circle cx={0} cy={-170} r={26} />
    <path d={mayor ? 'M -18 -140 Q -30 -80 -20 -40 L 20 -40 Q 26 -90 14 -140 Z' : 'M -20 -140 L -22 -40 L 22 -40 L 20 -140 Z'} transform={mayor ? 'rotate(8 0 -40)' : undefined} />
    <line x1={-8} y1={-40} x2={-12 - k} y2={0} strokeWidth={14} strokeLinecap="round" />
    <line x1={8} y1={-40} x2={12 + k} y2={0} strokeWidth={14} strokeLinecap="round" />
    {mayor && <line x1={40} y1={-90} x2={50} y2={0} strokeWidth={8} strokeLinecap="round" />}
    {mayor && <line x1={18} y1={-110} x2={40} y2={-90} strokeWidth={12} strokeLinecap="round" />}
  </g>;
}
// Ciudad al fondo (torres).
function Ciudad({ x, y, s = 1 }) {
  const t = [[0, 300], [70, 420], [150, 250], [210, 360]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{t.map(([a, h], i) => <g key={i}>
    <rect x={a} y={-h} width={64} height={h} fill="#8fa3b8" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: Math.floor(h / 50) }, (_, k) => <rect key={k} x={a + 14} y={-h + 20 + k * 50} width={36} height={22} fill="#fff4b0" />)}
  </g>)}</g>;
}

function MeliponasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, X: CUES.Xunan, J: CUES.Jobon, O: CUES.Ollitas, P: CUES.Pregunta, Ki: CUES.Kilo, A: CUES.Abuelos, E: CUES.Estudio, L: CUES.Landa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;

  // Gancho: la abeja vuela y aterriza en la punta del dedo (antes del segundo 1).
  const ate = kprog(T, K.G, K.G + 0.8, kEase.sale);
  const abX = klerp(900, 430, ate), abY = klerp(520, 905, ate) - Math.sin(ate * Math.PI) * 120;
  const muerde = T > K.G + 3.0 && T < K.X ? Math.max(0, Math.sin((T - K.G - 3.0) * 9)) : 0;
  // Cierre: la abeja camina del dedo a la entrada del jobón.
  const cam = kprog(T, K.C + 0.8, K.C + 3.2, kEase.suave);
  const cbX = klerp(330, 640, cam), cbY = klerp(985, 815, cam) - Math.sin(cam * Math.PI) * 80;
  // mapa de la península
  const mapa = <MapaMexico x={-2230} y={-430} ancho={4000} color="#ffe9a8" centro="#bfe3b4" />;
  // Estudio: 11 jobones, se apagan 7
  const grid = Array.from({ length: 11 }, (_, i) => { const f = Math.floor(i / 4), c = i % 4; const cols = f === 2 ? 3 : 4;
    return { x: 540 + (c - (cols - 1) / 2) * 230, y: 800 + f * 130, g: i >= 4 ? kclamp(kprog(T, K.E + 4.4, K.E + 6.6) * 7 - (10 - i), 0, 1) : 0 }; });
  const enGrid = kprog(T, K.E + 3.3, K.E + 4.0, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la abeja que no pica, en tu dedo */}
      <Escena T={T} a={K.G} b={K.X}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Dedo x={420} y={960} s={1.25} /><Melipona T={T} x={abX} y={abY} s={1.6} rot={ate < 1 ? -10 : 0} muerde={muerde} vuela={ate < 1 ? 1 : 0} id="g" /></>)}
        <EscalaFija texto="1 cm" largo={196} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.G + 1.2} until={K.G + 3.0} x={270} y={560} r={150} fx={300} fy={915} tinte={KC.red} etiqueta="POR DENTRO · AGUIJÓN"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#14100c" />
          <g transform={`translate(${r + 60} ${r - 30}) scale(2.4)`}><ellipse cx={-10} cy={0} rx={44} ry={27} fill="#1d1a17" stroke="#f4efe4" strokeWidth={1.5} />
            {[-46, -34, -22, -10, 2].map((a) => <rect key={a} x={a} y={-22} width={4} height={44} fill="#c9cf6a" />)}
            <path d="M -54 2 l -5 1" stroke="#f4efe4" strokeWidth={2.5} strokeLinecap="round" /></g>
          <line x1={r - 125} y1={r - 55} x2={r - 75} y2={r - 5} stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={kprog(t, K.G + 1.8, K.G + 2.1)} />
          <line x1={r - 75} y1={r - 55} x2={r - 125} y2={r - 5} stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={kprog(t, K.G + 1.9, K.G + 2.2)} />
          <text x={r} y={r + 92} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">atrofiado</text></svg>} />

      {/* 2 · xunán kab: la abeja de los mayas, en la península de Yucatán */}
      <Escena T={T} a={K.X} b={K.J}>
        <FondoLunares color={KC.mint} />
        {svg(<>{mapa}
          <Melipona T={T} x={450} y={880 + Math.sin(T * 3) * 10} s={1.1} id="x" /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 3 · el jobón: tronco hueco de medio metro con discos de madera */}
      <Escena T={T} a={K.J} b={K.O}>
        <FondoLunares color={KC.orange} />
        {svg(<><g transform={`translate(${klerp(-700, 0, kprog(T, K.J, K.J + 0.9, kEase.sale))} 0)`}>
            <Jobon T={T} x={540} y={900} w={760} h={230} discos={kprog(T, K.J + 1.4, K.J + 1.9, kEase.rebote)} /></g>
          <g opacity={kprog(T, K.J + 0.9, K.J + 1.3)}><line x1={160} y1={1080} x2={920} y2={1080} stroke={KC.ink} strokeWidth={6} />
            <line x1={160} y1={1060} x2={160} y2={1100} stroke={KC.ink} strokeWidth={6} /><line x1={920} y1={1060} x2={920} y2={1100} stroke={KC.ink} strokeWidth={6} />
            <text x={540} y={1140} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>≈ 50 cm</text></g>
          {(() => { const u = kprog(T, K.J + 2.4, K.J + 3.6, kEase.suave); return u < 1 ? <Melipona T={T} x={klerp(900, 560, u)} y={klerp(640, 778, u)} s={0.7 * (1 - u * 0.5)} rot={20} id="j" /> : null; })()}</>)}
        <EscalaFija texto="10 cm" largo={152} y={1480} color={KC.ink} />
      </Escena>

      {/* 4 · por dentro: no hay panal de hexágonos; ollitas de cera en las puntas, crías al centro */}
      <Escena T={T} a={K.O} b={K.P} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#0E0F12' }}></div>
        {svg(<>
          <g opacity={1 - kprog(T, K.O + 2.2, K.O + 2.7)}><Panal x={540} y={560} s={1} cols={6} filas={3} r={34} />
            <line x1={360} y1={460} x2={720} y2={660} stroke={KC.red} strokeWidth={16} strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - kprog(T, K.O + 0.9, K.O + 1.3))} />
            <line x1={720} y1={460} x2={360} y2={660} stroke={KC.red} strokeWidth={16} strokeLinecap="round" strokeDasharray="420" strokeDashoffset={420 * (1 - kprog(T, K.O + 1.1, K.O + 1.5))} /></g>
          <Jobon T={T} x={540} y={900} w={900} h={280} corte={kprog(T, K.O + 0.2, K.O + 0.9)} pOllas={kprog(T, K.O + 1.4, K.O + 3.4)} pCria={kprog(T, K.O + 3.4, K.O + 4.6)} /></>)}
        <EscalaFija texto="10 cm" largo={180} y={1480} color={KC.paper} />
      </Escena>

      {/* 5 · pregunta: la casita de las abejas se va apagando */}
      <Escena T={T} a={K.P} b={K.Ki} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<><NajilKaab T={T} x={290} y={900} s={0.85} apaga={kprog(T, K.P + 0.4, K.P + 2.4)} />
          <text x={250} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 250 540)`}>?</text></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 6 · un kilo al año por tronco; la abeja europea rinde más y en parte la desplazó */}
      <Escena T={T} a={K.Ki} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{(() => { const d = kprog(T, K.Ki + 5.6, K.Ki + 7.0, kEase.suave);
          return <><Jobon T={T} x={320 - d * 80} y={680} w={380} h={130} />
            <path d={`M ${320 - d * 80} 770 l 0 90`} stroke={KC.ink} strokeWidth={8} markerEnd="" />
            <path d={`M ${300 - d * 80} 845 l 20 26 l 20 -26`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinejoin="round" />
            <Frasco x={320 - d * 80} y={1170} lleno={kprog(T, K.Ki + 1.4, K.Ki + 3.4, kEase.suave)} s={0.95} />
            <text x={320 - d * 80} y={1000} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Ki + 3.2, K.Ki + 3.6)}>≈ 1 kg</text>
            <g transform={`translate(${klerp(700, 0, kprog(T, K.Ki + 5.0, K.Ki + 6.4, kEase.sale))} 0)`} opacity={kprog(T, K.Ki + 5.0, K.Ki + 5.4)}><CajaApis T={T} x={760} y={960} s={0.9} /></g></>; })()}</>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 7 · quienes la cuidan: edad promedio de más de sesenta; los jóvenes se van a la ciudad */}
      <Escena T={T} a={K.A} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<><Ciudad x={760} y={1150} s={0.9} />
          <Persona x={260} y={1150} s={1.3} mayor />
          <Persona x={420} y={1150} s={1.2} mayor color="#3a2f28" />
          {[0, 1].map((i) => { const u = kprog(T, K.A + 2.6 + i * 0.4, K.A + 5.8 + i * 0.4, kEase.suave);
            return <Persona key={i} x={klerp(520, 780, u) + i * 60} y={1150} s={1.15} paso={T * 9 + i} color="#2a7f6f" />; })}
          <text x={340} y={830} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.A + 0.6, K.A + 1.0)}>+60</text></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 8 · estudio 2011, Zona Maya de Quintana Roo: de ~11 a ~4 colonias por meliponario */}
      <Escena T={T} a={K.E} b={K.L}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g opacity={enGrid}>{grid.map((q, i) => <Jobon key={i} x={q.x} y={q.y} w={190} h={88} gris={q.g} />)}</g>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* 9 · Landa, hacia 1566: «No pican estas abejas» */}
      <Escena T={T} a={K.L} b={K.C}>
        <FondoLunares color={KC.orange} />
        {(() => { const u = kprog(T, K.L + 0.2, K.L + 1.0, kEase.sale);
          return <div style={{ position:'absolute', left:110, top:740, width:860, height:360 * u, overflow:'hidden', background:'#f3e2b8', border:`7px solid ${KC.ink}`, borderRadius:18, boxShadow:`12px 12px 0 ${KC.ink}` }}>
            <div style={{ padding:'36px 40px 0', font:`italic 700 66px/1.1 Georgia, 'Times New Roman', serif`, color:'#3b2410', textAlign:'center' }}>«No pican estas abejas»</div>
            <div style={{ padding:'26px 40px 0', font:`700 30px ${KF.mono}`, color:'#6b4a26', textAlign:'center' }}>— fray Diego de Landa, hacia 1566</div>
            <div style={{ padding:'10px 40px 0', font:`italic 400 26px Georgia, serif`, color:'#6b4a26', textAlign:'center' }}>"vejiguitas como nueces de cera… llenas de la miel"</div>
            <svg width={860} height={120} style={{ position:'absolute', left:0, top:250 }}>{[0, 1, 2, 3, 4].map((i) => <Ollita key={i} x={330 + i * 48} y={50 + (i % 2) * 14} s={0.9} tipo="miel" o={kprog(T, K.L + 1.2 + i * 0.15, K.L + 1.5 + i * 0.15)} />)}</svg>
          </div>; })()}
      </Escena>

      {/* 10 · cierre: la misma abeja del inicio, ahora entra a su jobón */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Jobon T={T} x={760} y={930} w={620} h={230} /><Dedo x={340} y={1040} s={1.1} />
          <Melipona T={T} x={cbX} y={cbY} s={1.3 * (1 - cam * 0.35)} rot={cam > 0 && cam < 1 ? -14 : 0} vuela={cam > 0 && cam < 1 ? 1 : 0} id="c" /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 3.0} until={K.X - 0.2} texto="a lo mucho: un mordisco" y={1440} x={540} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.G + 0.9} until={K.G + 2.9} x={620} y={1010} texto="10–11 mm" tam={32} color={KC.ink} />
      <Etq T={T} at={K.X + 0.4} until={K.J - 0.2} x={610} y={740} texto="xunán kab" tam={40} color={KC.ink} />
      <Etq T={T} at={K.X + 0.9} until={K.J - 0.2} x={610} y={796} texto="Melipona beecheii" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.X + 1.6} until={K.J - 0.2} x={300} y={1010} texto="Campeche" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.X + 1.9} until={K.J - 0.2} x={620} y={1060} texto="Quintana Roo" tam={28} color={KC.ink} />
      <Etq T={T} at={K.X + 2.2} until={K.J - 0.2} x={470} y={680} texto="Yucatán" tam={28} color={KC.ink} />
      <Chip T={T} at={K.X + 2.8} until={K.J - 0.2} texto="crianza maya prehispánica" y={1440} x={540} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.J + 1.9} until={K.O - 0.2} texto="jobón: tronco hueco" y={470} x={420} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.J + 2.2} until={K.O - 0.2} x={130} y={1035} texto="disco de madera" tam={26} color={KC.ink} />
      <Etq T={T} at={K.J + 2.6} until={K.O - 0.2} x={575} y={740} texto="entrada" tam={28} color={KC.ink} />
      <Chip T={T} at={K.O + 0.3} until={K.O + 2.4} texto="¿panal de hexágonos? no" y={410} x={560} tam={34} borde={KC.red} />
      <Etq T={T} at={K.O + 2.6} until={K.P - 0.2} x={200} y={1100} texto="ollitas de cera: miel y polen" tam={30} color={KC.paper} />
      <Etq T={T} at={K.O + 4.0} until={K.P - 0.2} x={640} y={700} texto="crías" tam={32} color={KC.paper} />
      <Chip T={T} at={K.O + 2.8} until={K.P - 0.2} texto="POR DENTRO · el jobón" y={1440} x={540} tam={32} borde={KC.gold} mono />
      <Chip T={T} at={K.Ki + 3.4} until={K.A - 0.2} texto="Los Petenes, Campeche · 2015" y={1440} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ki + 3.6} until={K.Ki + 5.4} x={420} y={1080} texto="por tronco, al año" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ki + 6.4} until={K.A - 0.2} texto="abeja europea: rinde más" y={520} x={360} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.A + 1.0} until={K.E - 0.2} texto="edad promedio: 63 y 62 años" y={1440} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.A + 3.6} until={K.E - 0.2} x={780} y={700} texto="Mérida · Cancún · Campeche" lado="izq" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.1} until={K.E + 3.4} anio="2011" quien="Zona Maya, Quintana Roo" revista="58 meliponicultores · J. Kansas Entomol. Soc. (2013)" y={780} />
      <NumeroGigante T={T} at={K.E + 4.0} until={K.L - 0.2} valor={4} desde={11} dur={2.6} etiqueta="colonias por meliponario" x={340} y={520} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.E + 4.4} until={K.L - 0.2} texto="≈ 11 → ≈ 4 (promedio)" y={1440} x={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.4} until={K.Ou - 0.1} texto="xunán kab: no pica" y={1440} x={540} tam={38} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.X - 0.1} texto="Esta abeja *no pica.*" />
      <Subtitulo T={T} idx={1} at={K.X + 0.1} until={K.J - 0.1} texto="La xunán kab: *abeja de los mayas.*" />
      <Subtitulo T={T} idx={2} at={K.J + 0.1} until={K.O - 0.1} texto="Su casa: *un jobón.*" />
      <Subtitulo T={T} idx={3} at={K.O + 0.1} until={K.P - 0.1} texto="Miel en *ollitas de cera.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ki - 0.1} texto="¿Por qué *se pierde?*" />
      <Subtitulo T={T} idx={5} at={K.Ki + 0.1} until={K.A - 0.1} texto="Un kilo al año *por tronco.*" />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.E - 0.1} texto="Cuidadores de *más de 60.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.L - 0.1} texto="De 11 colonias *a 4.*" />
      <Subtitulo T={T} idx={8} at={K.L + 0.1} until={K.C - 0.1} texto="1566: *«No pican estas abejas».*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una tradición que *necesita quien la cuide.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Xunan + 2.5, CUES.Jobon - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Ollitas + 2.0, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Kilo + 1.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Kilo + 4.4, CUES.Abuelos - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Abuelos + 2.5, CUES.Estudio - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Estudio + 4.0, CUES.Landa - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Landa + 1.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="49" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MeliponasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MeliponasShot /></CompositionStage></div>;
}
window.MeliponasApp = MeliponasApp;
