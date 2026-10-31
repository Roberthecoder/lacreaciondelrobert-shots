// Shot Biotecnológico #54 · La pastilla de la presión es nieta de un veneno de víbora (captopril) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala).
const CP = { piel:'#eab48f', pielO:'#c98b66', cafe:'#8a6440', cafeO:'#3f2614', borde:'#e2cc9c', veneno:'#ffb21f', eca:'#9b5de5', zn:'#F4C25A',
  sangre:'#d7263d', pared:'#ff8fa3', bradi:'#2fe0a8', angio:'#ff3b2f', azufre:'#ffe11a', gris:'#9aa3b5' };

function CpSvg({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Jararaca vista desde arriba: cuerpo café con manchas café oscuro de borde claro, subtriangulares/trapezoidales,
// a cada lado, con la punta hacia la línea del lomo; cabeza triangular, franja oscura detrás del ojo, lengua bífida.
function Jararaca({ T, x0 = 120, x1 = 900, y = 1000, amp = 110, ancho = 74, sombra = false, o = 1, lengua = 1 }) {
  const N = 60, pts = [];
  for (let i = 0; i <= N; i++) { const u = i / N; pts.push([klerp(x0, x1, u), y + Math.sin(u * Math.PI * 2.4 - T * 2.2) * amp * (0.35 + 0.65 * u)]); }
  const w = (u) => ancho * (u < 0.12 ? 0.35 + u / 0.12 * 0.65 : u > 0.9 ? 0.8 : 1);
  const L = [], R = [];
  for (let i = 0; i <= N; i++) { const [px, py] = pts[i]; const q = pts[Math.min(N, i + 1)], p = pts[Math.max(0, i - 1)];
    const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy) || 1, nx = -dy / d, ny = dx / d, ww = w(i / N) / 2;
    L.push([px + nx * ww, py + ny * ww]); R.push([px - nx * ww, py - ny * ww]); }
  const cuerpo = 'M ' + L.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' L ' + R.reverse().map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  R.reverse();
  const [hx, hy] = pts[N], [bx, by] = pts[N - 2], ang = Math.atan2(hy - by, hx - bx) * 180 / Math.PI;
  const col = sombra ? 'rgba(20,10,30,.55)' : CP.cafe, bor = sombra ? 'none' : KC.ink;
  const manchas = [];
  if (!sombra) for (let i = 8; i < N - 4; i += 5) {
    const c = pts[i], l = L[i], r = R[i], la = L[i + 2], ra = R[i + 2], lb = L[i - 2], rb = R[i - 2];
    const m = (a, b, k) => [klerp(a[0], b[0], k), klerp(a[1], b[1], k)];
    // trapecio de cada lado: base en el flanco, punta (estrecha) en la línea del lomo
    [[lb, la, l], [rb, ra, r]].forEach(([p1, p2], s) => {
      const q1 = m(p1, c, 0.08), q2 = m(p2, c, 0.08), t1 = m(c, m(p1, p2, 0.5), 0.02);
      const tA = m(t1, q1, 0.18), tB = m(t1, q2, 0.18);
      manchas.push(<path key={i + '-' + s} d={`M ${q1[0]} ${q1[1]} L ${q2[0]} ${q2[1]} L ${tB[0]} ${tB[1]} L ${tA[0]} ${tA[1]} Z`} fill={CP.cafeO} stroke={CP.borde} strokeWidth={4} strokeLinejoin="round" />);
    });
  }
  const lg = Math.max(0, Math.sin(T * 9)) * lengua;
  return <g opacity={o}>
    <path d={cuerpo} fill={col} stroke={bor} strokeWidth={8} strokeLinejoin="round" />
    {manchas}
    <g transform={`translate(${hx} ${hy}) rotate(${ang})`}>
      {lg > 0.05 && !sombra && <path d={`M 70 0 L ${70 + 50 * lg} 0 l 18 -12 M ${70 + 50 * lg} 0 l 18 12`} stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" />}
      {lg > 0.05 && sombra && <path d={`M 70 0 L ${70 + 50 * lg} 0 l 18 -12 M ${70 + 50 * lg} 0 l 18 12`} stroke="rgba(20,10,30,.55)" strokeWidth={6} fill="none" strokeLinecap="round" />}
      <path d="M -30 -50 Q 20 -58 62 -16 Q 80 0 62 16 Q 20 58 -30 50 Q -16 0 -30 -50 Z" fill={col} stroke={bor} strokeWidth={8} strokeLinejoin="round" />
      {!sombra && <g>
        <path d="M 40 -30 L -20 -44 L -20 -34 L 36 -22 Z" fill={CP.cafeO} /><path d="M 40 30 L -20 44 L -20 34 L 36 22 Z" fill={CP.cafeO} />
        <circle cx={34} cy={-26} r={9} fill="#f2c94c" stroke={KC.ink} strokeWidth={3} /><ellipse cx={34} cy={-26} rx={2.5} ry={7} fill={KC.ink} />
        <circle cx={34} cy={26} r={9} fill="#f2c94c" stroke={KC.ink} strokeWidth={3} /><ellipse cx={34} cy={26} rx={2.5} ry={7} fill={KC.ink} />
        <circle cx={60} cy={-10} r={3} fill={KC.ink} /><circle cx={60} cy={10} r={3} fill={KC.ink} />
      </g>}
    </g>
  </g>;
}

// Blíster de captopril con la etiqueta legible desde el cuadro 0; `sale` 0..1 = la pastilla que salta.
function Blister({ T, x, y, s = 1, sale = 0, pril = 0 }) {
  const bur = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    const bx = -195 + c * 130, by = 10 + r * 120, vacio = r === 0 && c === 3 && sale > 0;
    bur.push(<g key={r + '-' + c}><ellipse cx={bx} cy={by} rx={50} ry={46} fill={vacio ? '#c3c9d2' : '#eef3f8'} stroke={KC.ink} strokeWidth={5} />
      {!vacio && <ellipse cx={bx - 14} cy={by - 16} rx={14} ry={9} fill="rgba(255,255,255,.9)" />}
      {!vacio && <ellipse cx={bx} cy={by} rx={30} ry={28} fill="#fffdf7" stroke="#c9c2b4" strokeWidth={3} />}</g>);
  }
  const py = klerp(10, -330, kEase.sale(sale)), px = klerp(195, 260, sale), rot = sale * 300;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-270} y={-150} width={540} height={330} rx={26} fill="#d9dde3" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-136} width={500} height={84} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-76} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.ink}>CAPTO<tspan fill={pril ? KC.pink : KC.ink}>PRIL</tspan> <tspan style={{ font:`700 30px ${KF.mono}` }}>25 mg</tspan></text>
    {bur}
    {sale > 0 && <g transform={`translate(${px} ${py}) rotate(${rot})`}><circle r={34} fill="#fffdf7" stroke={KC.ink} strokeWidth={5} /><line x1={-22} y1={0} x2={22} y2={0} stroke="#c9c2b4" strokeWidth={4} /></g>}
  </g>;
}
// Mano (de la abuela) que sostiene el blíster por abajo: palma, pulgar encima y arrugas.
function Mano({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -330 260 Q -360 120 -250 70 L 120 60 Q 200 70 200 130 Q 190 190 110 190 L -60 200 Q -40 300 -90 420 L -330 420 Z" fill={CP.piel} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[[-250, 150], [-230, 230], [-180, 300]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} q 30 -10 60 0`} stroke={CP.pielO} strokeWidth={5} fill="none" strokeLinecap="round" />)}
  </g>;
}
function Pulgar({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 40 Q -250 -40 -150 -60 Q -80 -70 -70 -30 Q -66 10 -130 20 L -220 70 Z" fill={CP.piel} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -120 -48 q 14 6 18 22" stroke={CP.pielO} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Pedacito de proteína (péptido): cadena de cuentas. n cuentas, `resalta` = índices dorados, `p` 0..1 cuántas se ven.
function Cadena({ x, y, n = 6, r = 16, color = CP.veneno, rot = 0, s = 1, T = 0, resalta = [], p = 1, ondula = 1, seed = 1 }) {
  const k = Math.ceil(n * p);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: k }, (_, i) => { const cx = (i - (n - 1) / 2) * r * 1.8, cy = Math.sin(i * 1.3 + T * 3 + seed) * r * 0.5 * ondula;
      return <circle key={i} cx={cx} cy={cy} r={r} fill={resalta.includes(i) ? KC.gold2 : color} stroke={KC.ink} strokeWidth={Math.max(3, r / 4)} />; })}
  </g>;
}
// ECA: enzima (morado) con su hueco y el zinc en el fondo. traba 0..1 = algo ocupa el hueco (candado).
function ECA({ x, y, s = 1, boca = 0.5, traba = 0, T = 0 }) {
  const a = 18 + boca * 22, c = Math.cos(a * Math.PI / 180) * 110, d = Math.sin(a * Math.PI / 180) * 110;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 10 0 L ${c} ${-d} A 110 110 0 1 0 ${c} ${d} Z`} fill={CP.eca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={-40} cy={-56} r={14} fill="#fff" /><circle cx={-36} cy={-56} r={7} fill={KC.ink} />
    <circle cx={22} cy={0} r={18 + Math.sin(T * 5) * 2} fill={CP.zn} stroke={KC.ink} strokeWidth={4} />
    <text x={22} y={7} textAnchor="middle" style={{ font:`700 18px ${KF.mono}` }} fill={KC.ink}>Zn</text>
    {traba > 0 && <g opacity={traba} transform="translate(-30 60)"><rect x={-22} y={-6} width={44} height={36} rx={6} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /><path d="M -13 -6 v -12 a 13 13 0 0 1 26 0 v 12" fill="none" stroke={KC.ink} strokeWidth={5} /></g>}
  </g>;
}
// Vaso sanguíneo en corte largo (horizontal). abre: radio interior; vel: rapidez de los glóbulos.
function Vaso({ T, y = 950, abre = 1, vel = 1, x0 = -40, x1 = 1120 }) {
  const r = klerp(90, 200, abre), R = krng(4);
  const gl = Array.from({ length: 12 }, (_, i) => [R() * 1300, (R() - 0.5), R() * 360]);
  return <g>
    <rect x={x0} y={y - r - 70} width={x1 - x0} height={70} fill={CP.pared} stroke={KC.ink} strokeWidth={7} />
    <rect x={x0} y={y + r} width={x1 - x0} height={70} fill={CP.pared} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 14 }, (_, i) => <ellipse key={'c' + i} cx={i * 84} cy={y - r - 35} rx={30} ry={14} fill="#ffb3c1" stroke={KC.ink} strokeWidth={3} />)}
    {Array.from({ length: 14 }, (_, i) => <ellipse key={'d' + i} cx={i * 84 + 40} cy={y + r + 35} rx={30} ry={14} fill="#ffb3c1" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={x0} y={y - r} width={x1 - x0} height={2 * r} fill="rgba(120,10,30,.35)" />
    {gl.map(([gx, gy, gr], i) => { const xx = ((gx + T * 220 * vel) % 1300) - 110; return <g key={i} transform={`translate(${xx} ${y + gy * r * 1.3}) rotate(${gr + T * 40})`}>
      <ellipse rx={34} ry={22} fill={CP.sangre} stroke={KC.ink} strokeWidth={4} /><ellipse rx={15} ry={8} fill="#a81a2e" /></g>; })}
  </g>;
}
// Molécula esquemática del inhibidor: anillo de prolina (pentágono) + cadenita + gancho (gris –COOH o "S" amarilla).
function Inhibidor({ x, y, s = 1, azufre = false, rot = 0, o = 1 }) {
  const pent = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${(Math.cos(a) * 50).toFixed(1)} ${(Math.sin(a) * 50).toFixed(1)}`; }).join(' L ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={`M ${pent} Z`} transform="translate(90 0)" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={90} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>Pro</text>
    <path d="M 40 0 L 0 -26 L -44 0 L -88 -26" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={0} cy={-26} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    {azufre ? <g><circle cx={-110} cy={-14} r={30} fill={CP.azufre} stroke={KC.ink} strokeWidth={6} /><text x={-110} y={-4} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>S</text></g>
      : <g><rect x={-172} y={-48} width={96} height={52} rx={14} fill={CP.gris} stroke={KC.ink} strokeWidth={5} /><text x={-124} y={-12} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>COOH</text></g>}
  </g>;
}
function Paloma({ x, y, ok = true, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><circle r={56} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={7} />
    {ok ? <path d="M -26 2 L -6 22 L 28 -20" stroke={KC.ink} strokeWidth={11} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M -22 -22 L 22 22 M 22 -22 L -22 22" stroke={KC.ink} strokeWidth={11} strokeLinecap="round" />}</g>;
}
function Tubo({ x, y, s = 1, nivel = 0.5, color = CP.veneno }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -45 ${-200 + 400 * (1 - nivel) * 0.8} L -45 140 A 45 45 0 0 0 45 140 L 45 ${-200 + 400 * (1 - nivel) * 0.8} Z`} fill={color} opacity={0.85} />
    <path d="M -45 -220 L -45 140 A 45 45 0 0 0 45 140 L 45 -220" fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-236} width={120} height={22} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function Captopril() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, J: CUES.Jararaca, F: CUES.Ferreira, E: CUES.ECA, M: CUES.Manguera, Fr: CUES.Frenar, P: CUES.Pregunta, I: CUES.Intestino,
    S: CUES.Squibb, A: CUES.Azufre, C: CUES.Captopril, Se: CUES.Sesenta, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const salta = kprog(T, K.G + 0.25, K.G + 1.0);
  // vaso: se aprieta con la angiotensina II y se afloja al frenar la ECA
  const corte = kprog(T, K.M + 0.6, K.M + 1.3, kEase.sale);
  const aprieta = kprog(T, K.M + 1.4, K.M + 2.6, kEase.suave), suelta = kprog(T, K.Fr + 0.4, K.Fr + 1.8, kEase.suave);
  const abre = klerp(1, 0.25, aprieta) + (1 - klerp(1, 0.25, aprieta)) * suelta;
  const swap = K.A + 2.2;   // la copia sin azufre → con azufre
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la pastilla de la abuela (y la sombra de la víbora detrás) */}
      <Escena T={T} a={K.G} b={K.J} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <CpSvg>
          <Jararaca T={T} x0={60} x1={klerp(560, 980, kprog(T, 0, 3))} y={780} amp={70} ancho={60} sombra />
          <Mano x={420} y={1020} s={1} />
          <Blister T={T} x={440} y={980} s={1} sale={salta} />
          <Pulgar x={420} y={1020} s={1} />
        </CpSvg>
      </Escena>
      {/* 1 · la jararaca y su presa */}
      <Escena T={T} a={K.J} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <CpSvg>
          <ellipse cx={540} cy={1120} rx={520} ry={70} fill="rgba(0,0,0,.12)" />
          <Jararaca T={T} x0={40} x1={770} y={990} amp={150} ancho={92} />
          <g transform={`translate(930 ${1010 + Math.sin(T * 12) * 3}) rotate(${klerp(0, 80, kprog(T, K.J + 2.2, K.J + 3.0))})`}>
            <ellipse rx={70} ry={42} fill="#b9b2a8" stroke={KC.ink} strokeWidth={6} /><circle cx={-58} cy={-28} r={20} fill="#d8cfc4" stroke={KC.ink} strokeWidth={5} />
            <circle cx={-72} cy={-6} r={6} fill={KC.ink} /><path d="M 66 6 q 60 10 70 50" stroke={KC.ink} strokeWidth={5} fill="none" />
          </g>
        </CpSvg>
      </Escena>
      {/* 2 · 1965: el veneno potencia a la bradicinina */}
      <Escena T={T} a={K.F} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CpSvg>
          <Tubo x={260} y={900} s={1} nivel={0.2 + 0.4 * kprog(T, K.F + 0.4, K.F + 1.4)} />
          <Goteo T={T} x={260} y0={650} y1={880} cada={0.5} color={CP.veneno} desde={K.F + 0.2} hasta={K.F + 1.6} />
          {[0, 1, 2, 3].map((i) => { const p = kprog(T, K.F + 1.4 + i * 0.25, K.F + 2.6 + i * 0.25, kEase.sale);
            return p > 0 && <Cadena key={i} T={T} x={klerp(260, 480 + (i % 2) * 120, p)} y={klerp(820, 700 + i * 60, p)} n={5 + i * 2} r={11} s={0.9} seed={i} />; })}
          <Vaso T={T} y={1080} abre={0.25 + 0.35 * kprog(T, K.F + 3.4, K.F + 5.0, kEase.suave)} vel={1} x0={420} x1={1120} />
          {T > K.F + 3.0 && <Cadena T={T} x={760} y={1080} n={9} r={13} color={CP.bradi} s={klerp(0.7, 1.15, kprog(T, K.F + 3.4, K.F + 5.0))} />}
        </CpSvg>
      </Escena>
      {/* 3 · la ECA: por dentro de tu brazo */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <CpSvg>
          <path d="M -40 1000 Q 300 940 700 960 Q 980 975 1120 1010 L 1120 1260 Q 700 1220 300 1240 Q 100 1250 -40 1260 Z" fill={CP.piel} stroke={KC.ink} strokeWidth={10} />
          <path d="M -40 1110 Q 300 1080 600 1110 Q 860 1135 1120 1100" stroke="#5b7fd6" strokeWidth={14} fill="none" opacity={0.7} strokeLinecap="round" />
        </CpSvg>
      </Escena>
      <Lupa T={T} at={K.E + 0.2} until={K.M - 0.2} x={540} y={720} r={290} fx={600} fy={1110} tinte={KC.mint} etiqueta="POR DENTRO · TU VASO SANGUÍNEO"
        interior={(t) => <svg width={580} height={580}>
          <rect width={580} height={580} fill="#14070c" />
          <rect x={0} y={40} width={580} height={60} fill={CP.pared} stroke={KC.ink} strokeWidth={5} />
          <rect x={0} y={480} width={580} height={60} fill={CP.pared} stroke={KC.ink} strokeWidth={5} />
          <ECA x={250} y={300} s={1.25} boca={0.6 - 0.4 * kprog(t, K.E + 1.8, K.E + 2.3)} traba={kprog(t, K.E + 2.2, K.E + 2.5)} T={t} />
          <Cadena T={t} x={klerp(560, 330, kprog(t, K.E + 0.9, K.E + 2.0, kEase.sale))} y={300} n={5} r={16} />
        </svg>} />
      {/* 4–5 · angiotensina II aprieta el vaso; frenar la ECA lo afloja */}
      <Escena T={T} a={K.M} b={K.P} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <CpSvg>
          <Vaso T={T} y={900} abre={abre} vel={klerp(1, 0.5, aprieta) + suelta} />
          <ECA x={300} y={900} s={1.1} boca={T < K.Fr ? 0.5 + 0.3 * Math.sin(T * 6) : 0.2} traba={kprog(T, K.Fr + 0.2, K.Fr + 0.5)} T={T} />
          {T < K.Fr + 0.2 && <g>
            <Cadena T={T} x={klerp(560, 470, kprog(T, K.M, K.M + 0.6))} y={900} n={10} r={13} color={CP.angio} resalta={[8, 9]} p={1} ondula={0.4} />
          </g>}
          {corte > 0 && T < K.Fr + 0.2 && <Cadena T={T} x={klerp(470, 800, corte)} y={klerp(900, 880, corte)} n={8} r={13} color={CP.angio} ondula={0.4} />}
          {T >= K.Fr && <Cadena T={T} x={klerp(620, 360, kprog(T, K.Fr, K.Fr + 0.3, kEase.sale))} y={900} n={5} r={14} color={CP.veneno} />}
          {[0, 1].map((i) => { const ux = 900 + i * 0, a = aprieta * (1 - suelta); return <g key={i} opacity={a}>
            <path d={`M ${ux} ${700 - i * 0} l 0 ${60} m -24 -24 l 24 24 l 24 -24`} transform={i ? `rotate(180 ${ux} 900)` : ''} stroke={KC.yellow} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
        </CpSvg>
        <Etq T={T} at={K.M + 0.4} until={K.Fr - 0.1} x={440} y={820} texto="angiotensina I (10 eslabones)" color={CP.angio} tam={30} />
        <Etq T={T} at={K.M + 1.4} until={K.Fr - 0.1} x={1030} y={1140} texto="angiotensina II (8): aprieta" lado="izq" color={CP.angio} tam={30} />
        <Etq T={T} at={K.M + 0.2} until={K.P} x={180} y={1130} texto="ECA" color={CP.eca} tam={40} />
        <Medidor T={T} at={K.M + 1.2} until={K.P - 0.2} valor={(t) => 0.55 + 0.35 * kprog(t, K.M + 1.4, K.M + 2.6) - 0.5 * kprog(t, K.Fr + 0.4, K.Fr + 1.8)} etiqueta="presión" texto={(v) => (v > 0.7 ? 'sube' : v < 0.5 ? 'baja' : '')} y={1450} color={KC.red} />
      </Escena>
      {/* 6 · pregunta: ¿tu abuela se toma veneno? */}
      <Escena T={T} a={K.P} b={K.I} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <CpSvg>
          <Mano x={330} y={1020} s={0.9} /><Blister T={T} x={340} y={985} s={0.9} sale={1} /><Pulgar x={330} y={1020} s={0.9} />
          <text x={250} y={760} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 7} 250 660)`}>?</text>
        </CpSvg>
      </Escena>
      {/* 7 · inyectado sí; tragado no pasa del intestino */}
      <Escena T={T} a={K.I} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <CpSvg>
          <g transform="translate(270 960)">
            <rect x={-200} y={60} width={400} height={150} rx={60} fill={CP.piel} stroke={KC.ink} strokeWidth={8} />
            <g transform={`translate(${klerp(-40, 0, kprog(T, K.I + 0.6, K.I + 1.2))} ${klerp(-140, -40, kprog(T, K.I + 0.6, K.I + 1.2))}) rotate(-35)`}>
              <rect x={-30} y={-220} width={60} height={200} rx={8} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
              <rect x={-26} y={klerp(-200, -60, kprog(T, K.I + 1.2, K.I + 2.2))} width={52} height={40} fill={KC.ink} />
              <rect x={-26} y={-160} width={52} height={130} fill={CP.veneno} opacity={0.7 * (1 - kprog(T, K.I + 1.2, K.I + 2.2))} />
              <line x1={0} y1={-20} x2={0} y2={60} stroke={KC.ink} strokeWidth={5} />
            </g>
            <Paloma x={0} y={-230} ok s={1} o={kprog(T, K.I + 1.8, K.I + 2.2)} />
          </g>
          <g transform="translate(790 980)">
            <path d="M -220 120 Q -220 -60 -160 -60 Q -100 -60 -100 60 Q -100 -60 -40 -60 Q 20 -60 20 60 Q 20 -60 80 -60 Q 140 -60 140 60 Q 140 -60 200 -60 Q 230 -60 230 120 Z" fill="#ff9e7a" stroke={KC.ink} strokeWidth={7} />
            {[0, 1, 2].map((i) => { const ph = ((T - K.I - 0.8 - i * 0.5) % 1.6 + 1.6) % 1.6, up = ph < 0.8 ? ph / 0.8 : 2 - ph / 0.8;
              return T > K.I + 0.8 && <Cadena key={i} T={T} x={-140 + i * 140} y={klerp(-330, -110, up)} n={5} r={12} seed={i} />; })}
            <Paloma x={-160} y={-300} ok={false} s={1} o={kprog(T, K.I + 2.6, K.I + 3.0)} />
          </g>
        </CpSvg>
        <Etq T={T} at={K.I + 0.4} until={K.S - 0.2} x={60} y={620} texto="inyectado" tam={32} color={KC.ink} />
        <Etq T={T} at={K.I + 0.8} until={K.S - 0.2} x={560} y={1140} texto="tragado: intestino" tam={32} color={KC.ink} />
      </Escena>
      {/* 8 · 1974, Squibb: dibujaron el hueco de la enzima con su zinc */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <CpSvg>
          <rect x={100} y={660} width={880} height={540} rx={18} fill="#1f4d3a" stroke="#7a4a22" strokeWidth={22} />
          {(() => { const p = kprog(T, K.S + 2.0, K.S + 3.6), L = 1500;
            return <g stroke="#f6f3ec" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 300 760 L 300 1000 Q 300 1110 440 1110 Q 580 1110 580 1000 L 580 760" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
              <path d="M 160 760 L 300 760 M 580 760 L 720 760" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
            </g>; })()}
          <g opacity={kprog(T, K.S + 3.4, K.S + 3.8)}><circle cx={440} cy={1060} r={32} fill={CP.zn} stroke="#f6f3ec" strokeWidth={5} /><text x={440} y={1070} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Zn</text></g>
          <text x={820} y={1130} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#f6f3ec" opacity={kprog(T, K.S + 3.0, K.S + 3.4)}>el hueco</text>
          <text x={820} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#f6f3ec" opacity={kprog(T, K.S + 3.0, K.S + 3.4)}>de la ECA</text>
          <path d={`M ${klerp(900, 600, kprog(T, K.S + 2.0, K.S + 3.6))} ${klerp(820, 1100, kprog(T, K.S + 2.0, K.S + 3.6))} l 30 -14 l 60 -100 l -30 14 Z`} fill="#fff" stroke={KC.ink} strokeWidth={4} opacity={T > K.S + 1.9 && T < K.S + 3.8 ? 1 : 0} />
        </CpSvg>
        <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 1.9} anio="1974" quien="Cushman y Ondetti · Squibb" revista="New Brunswick, Nueva Jersey, EUA" y={900} />
        <Chip T={T} at={K.S + 2.2} until={K.A - 0.2} texto="modelo: una enzima parecida (carboxipeptidasa A)" y={1500} tam={28} borde={CP.zn} />
      </Escena>
      {/* 9 · copiaron la punta del veneno; con azufre, 2,000 veces más potente que su copia sin azufre */}
      <Escena T={T} a={K.A} b={K.C} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <CpSvg>
          <path d="M 120 720 L 220 720 L 220 1000 Q 220 1120 340 1120 Q 460 1120 460 1000 L 460 720 L 560 720 L 560 1220 L 120 1220 Z" fill={CP.eca} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
          <circle cx={340} cy={1080} r={30 + (T > swap ? Math.max(0, 1 - (T - swap) * 2) * 14 : 0)} fill={CP.zn} stroke={KC.ink} strokeWidth={5} />
          <text x={340} y={1090} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>Zn</text>
          {T < K.A + 1.1 && <Cadena T={T} x={360} y={560} n={5} r={18} resalta={kprog(T, K.A + 0.3, K.A + 0.6) > 0 ? [3, 4] : []} />}
          {T >= K.A + 1.1 && T < swap && <Inhibidor x={340} y={klerp(700, 900, kprog(T, K.A + 1.1, K.A + 1.8, kEase.sale))} rot={-90} s={1.1} />}
          {T >= swap && <Inhibidor x={340} y={klerp(860, 940, kprog(T, swap, swap + 0.3, kEase.sale))} rot={-90} s={1.1} azufre />}
          {T >= swap && <circle cx={340} cy={1080} r={70 + (T - swap) * 40} fill="none" stroke={CP.azufre} strokeWidth={6} opacity={Math.max(0, 1 - (T - swap) * 1.5)} />}
        </CpSvg>
        <Etq T={T} at={K.A + 0.4} until={K.A + 1.1} x={500} y={560} texto="Ala-Pro: punta del veneno" color={KC.gold2} tam={30} />
        <Etq T={T} at={K.A + 1.4} until={swap} x={40} y={650} texto="copia sin azufre (–COOH)" color={CP.gris} tam={26} />
        <Etq T={T} at={swap + 0.1} until={K.C - 0.2} x={40} y={650} texto="con azufre (S): al zinc" color={CP.azufre} tam={26} />
        <NumeroGigante T={T} at={swap + 0.4} until={K.C - 0.2} valor={2000} dur={1.0} prefijo="×" etiqueta="vs. su copia sin azufre" y={1530} tam={170} color={CP.azufre} />
      </Escena>
      {/* 10 · así nació el captopril (1981) */}
      <Escena T={T} a={K.C} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <CpSvg>
          <g transform={`translate(540 960) rotate(${T * 12})`} opacity={0.5}>{Array.from({ length: 16 }, (_, i) => <path key={i} d="M 0 0 L 900 -90 L 900 90 Z" fill="#fff" transform={`rotate(${i * 22.5})`} opacity={i % 2 ? 0 : 0.6} />)}</g>
          <Jararaca T={T} x0={60} x1={1000} y={690} amp={50} ancho={56} />
          {(() => { const p = kprog(T, K.C + 0.3, K.C + 1.5, kEase.suave);
            return <g>
              <Inhibidor x={540} y={klerp(860, 980, p)} s={klerp(1.5, 0.2, p)} azufre o={1 - kprog(T, K.C + 1.2, K.C + 1.5)} />
              <g transform={`translate(540 ${klerp(900, 980, p)}) scale(${kprog(T, K.C + 1.2, K.C + 1.6, kEase.rebote)})`}><circle r={120} fill="#fffdf7" stroke={KC.ink} strokeWidth={9} /><line x1={-80} y1={0} x2={80} y2={0} stroke="#c9c2b4" strokeWidth={8} />
                <text x={0} y={-30} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CAPTOPRIL</text></g>
            </g>; })()}
        </CpSvg>
        <Chip T={T} at={K.C + 1.8} until={K.Se - 0.2} texto="1981 · FDA · primer inhibidor de la ECA en pastilla" y={1500} tam={32} borde={KC.blue} />
      </Escena>
      {/* 11 · 2,000 al azar contra 60 con el dibujo */}
      <Escena T={T} a={K.Se} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Comparativa T={T} at={K.Se + 0.3} until={K.Ci - 0.2} max={2000} y={560} alto={420}
        izq={{ valor:2000, etiqueta:'al azar', color:CP.gris, texto:'~2,000' }} der={{ valor:60, etiqueta:'con su dibujo', color:KC.yellow, texto:'~60' }} />
      <Chip T={T} at={K.Se + 1.6} until={K.Ci - 0.2} texto="compuestos probados (Cushman y Ondetti, 1991)" y={1500} tam={28} borde={KC.ink} />
      {/* 12 · cierre: la misma pastilla, ahora con su familia «pril» y la víbora */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <CpSvg>
          <Jararaca T={T} x0={40} x1={940} y={760} amp={60} ancho={60} />
          <Mano x={420} y={1020} s={1} /><Blister T={T} x={440} y={980} s={1} sale={0} pril={1} /><Pulgar x={420} y={1020} s={1} />
        </CpSvg>
        <Chip T={T} at={K.Ci + 0.5} until={K.O} texto="capto·PRIL   enala·PRIL   lisino·PRIL" y={1500} tam={38} borde={KC.pink} />
      </Escena>

      {/* textos fijos */}
      <Chip T={T} at={K.G + 1.2} until={K.J - 0.3} texto="captopril ← veneno de víbora" y={1500} tam={40} borde={CP.veneno} />
      <Etq T={T} at={K.J + 0.5} until={K.F - 0.2} x={70} y={760} texto="jararaca" tam={40} color={KC.ink} />
      <Etq T={T} at={K.J + 0.8} until={K.F - 0.2} x={70} y={815} texto="Bothrops jararaca" it tam={34} color={KC.ink} />
      <Medidor T={T} at={K.J + 1.2} until={K.F - 0.3} valor={(t) => 0.85 - 0.6 * kprog(t, K.J + 1.8, K.J + 3.0, kEase.suave)} etiqueta="presión de la presa" texto={(v) => (v < 0.4 ? 'se desploma' : '')} y={1450} color={KC.red} />
      <Chip T={T} at={K.F + 0.3} until={K.F + 3.0} texto="1965 · Sérgio Ferreira · Brasil" y={1500} tam={40} borde={CP.veneno} />
      <Etq T={T} at={K.F + 1.6} until={K.F + 3.2} x={500} y={640} texto="pedacitos de proteína" tam={30} color={KC.ink} />
      <Etq T={T} at={K.F + 3.3} until={K.E - 0.2} x={1040} y={620} lado="izq" texto="bradicinina: afloja el vaso" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 0.8} until={K.M - 0.2} texto="ECA = enzima convertidora de angiotensina" y={1500} tam={30} borde={CP.eca} />
      <MitoTachado T={T} at={K.I + 0.2} tacharEn={K.I + 2.6} until={K.S - 0.3} texto="¿veneno en pastilla?" x={400} y={480} tam={44} />
      <Chip T={T} at={K.P + 0.3} until={K.I - 0.2} texto="¿veneno?" x={330} y={1500} tam={46} borde={KC.yellow} />
      <Chip T={T} at={K.E + 0.2} until={K.Ci} texto="dibujo esquemático" x={870} y={1820} tam={22} mono borde="rgba(255,255,255,.4)" />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.J - 0.1} texto="Es nieta de *un veneno de víbora.*" />
      <Subtitulo T={T} idx={1} at={K.J + 0.1} until={K.F - 0.1} texto="Su veneno *tumba la presión.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.E - 0.1} texto="Potencia a *la bradicinina.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.M - 0.1} texto="Frena una enzima tuya: *la ECA.*" />
      <Subtitulo T={T} idx={4} at={K.M + 0.1} until={K.Fr - 0.1} texto="Angiotensina II *aprieta tus vasos.*" />
      <Subtitulo T={T} idx={5} at={K.Fr + 0.1} until={K.P - 0.1} texto="La frenas: *la presión baja.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.I - 0.1} texto="¿Tu abuela *se toma veneno?*" />
      <Subtitulo T={T} idx={7} at={K.I + 0.1} until={K.S - 0.1} texto="Tragado, *no pasaba.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.A - 0.1} texto="1974: *el hueco de la enzima.*" />
      <Subtitulo T={T} idx={9} at={K.A + 0.1} until={K.C - 0.1} texto="Con azufre, *su copia: ×2,000.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Se - 0.1} texto="Así nació *el captopril.*" />
      <Subtitulo T={T} idx={11} at={K.Se + 0.1} until={K.Ci - 0.1} texto="2,000 al azar; *con su dibujo, 60.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.O - 0.1} texto="Termina en «pril»: *truco de víbora.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [K.J + 0.7, K.F - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.F + 1.5, K.E - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.M + 1.0, K.Fr - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.I + 0.7, 'avatar_06_pensativo_menton', 'grande'],
        [K.I + 1.3, K.S - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.S + 2.0, K.A - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.A + 1.0, K.C - 0.3, 'avatar_11_sorprendido', 'grande'],
        [K.Se + 0.5, K.Ci - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ci + 0.3, K.O - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="54" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CaptoprilApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Captopril /></CompositionStage></div>;
}
window.CaptoprilApp = CaptoprilApp;
