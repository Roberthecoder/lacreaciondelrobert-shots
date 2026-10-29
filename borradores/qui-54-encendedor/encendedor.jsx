// Shot Químico #54 · Ese encendedor no está lleno de gas (butano líquido a presión) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (moléculas, válvula, rueda, cristal y llama).
const PLAST = '#ff2d78', LIQ = '#dff3ff', METAL = '#c9ced6', PIEL = '#f1b48f', CHISPA = '#ffb21a';
const kTri = (u) => { const f = ((u % 2) + 2) % 2; return f < 1 ? f : 2 - f; };

// Llama de encendedor: base azul, cuerpo amarillo-naranja que titila. Origen = boquilla.
function Flama({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  const h = 1 + Math.sin(T * 17) * 0.05 + Math.sin(T * 7.3) * 0.04, b = Math.sin(T * 11) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.3, 1, o)})`} opacity={Math.min(1, o * 1.4)}>
    <path d={`M 0 0 C -46 -18 -52 ${-110 * h} ${b} ${-230 * h} C 52 ${-110 * h} 46 -18 0 0 Z`} fill="#ffb21a" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 -10 C -26 -24 -28 ${-90 * h} ${b * 0.6} ${-160 * h} C 28 ${-90 * h} 26 -24 0 -10 Z`} fill="#ffe86b" />
    <ellipse cx={0} cy={-26} rx={22} ry={30} fill="#2f6bff" opacity={0.9} />
  </g>;
}

// Encendedor desechable de bolsillo. Origen = centro de la base. nivel = altura del líquido (0..1), ola = chapoteo,
// boton = 0..1 palanca apretada, rueda = ángulo, llama = 0..1, guarda = lámina de seguridad, frio = 0..1 (se pone azul).
function Encendedor({ T, x, y, s = 1, rot = 0, nivel = 0.62, ola = 0, boton = 0, rueda = 0, llama = 0, guarda = false, frio = 0, id = 'a', escarcha = 0 }) {
  const W = 100, H = 440, yl = -H * nivel;
  const pts = [];
  for (let i = 0; i <= 12; i++) { const xx = -W + (i * 2 * W) / 12; pts.push(`${xx} ${yl + Math.sin(T * 9 + i * 0.7) * ola * 12 + (xx / W) * ola * 34 * Math.sin(T * 7)}`); }
  const cuerpo = mixHex(PLAST, '#7fc8ff', frio);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <clipPath id={`clE${id}`}><rect x={-W + 8} y={-H + 8} width={2 * W - 16} height={H - 16} rx={34} /></clipPath>
    <rect x={-W} y={-H} width={2 * W} height={H} rx={42} fill={cuerpo} opacity={0.45} />
    <path d={`M ${pts.join(' L ')} L ${W} 0 L ${-W} 0 Z`} fill={LIQ} opacity={0.92} clipPath={`url(#clE${id})`} />
    <path d={`M ${pts.join(' L ')}`} fill="none" stroke="#7fc8ff" strokeWidth={6} clipPath={`url(#clE${id})`} />
    {/* tubo de mecha que lleva el líquido a la válvula */}
    <rect x={30} y={-H} width={14} height={H - 30} fill="rgba(255,255,255,.35)" stroke="rgba(0,0,0,.35)" strokeWidth={3} />
    <rect x={-W + 22} y={-H + 34} width={20} height={H - 90} rx={10} fill="#fff" opacity={0.4} />
    {escarcha > 0 && [[-60, -80], [50, -150], [-30, -300], [70, -340], [-70, -220], [10, -60]].map(([a, b], i) => <path key={i} d={`M ${a - 14} ${b} L ${a + 14} ${b} M ${a} ${b - 14} L ${a} ${b + 14} M ${a - 10} ${b - 10} L ${a + 10} ${b + 10} M ${a + 10} ${b - 10} L ${a - 10} ${b + 10}`} stroke="#fff" strokeWidth={4} opacity={escarcha} strokeLinecap="round" />)}
    <rect x={-W} y={-H} width={2 * W} height={H} rx={42} fill="none" stroke={KC.ink} strokeWidth={9} />
    {/* cabeza: palanca (botón), boquilla, rueda y capuchón de metal */}
    <g transform={`translate(0 ${boton * 14})`}>
      <path d={`M -10 ${-H - 8} L ${W + 18} ${-H - 8} Q ${W + 30} ${-H - 30} ${W + 6} ${-H - 44} L -10 ${-H - 44} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <rect x={30} y={-H - 92} width={22} height={52} rx={5} fill="#8a8f99" stroke={KC.ink} strokeWidth={5} />
    </g>
    <path d={`M ${-W + 4} ${-H - 8} L ${-W + 4} ${-H - 150} Q ${-W + 4} ${-H - 170} ${-W + 24} ${-H - 170} L ${W - 30} ${-H - 170} L ${W - 30} ${-H - 104} L 10 ${-H - 104} L 10 ${-H - 8} Z`} fill={METAL} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => <circle key={i} cx={-W + 30} cy={-H - 40 - i * 34} r={9} fill="#6b7280" />)}
    <g transform={`translate(-30 ${-H - 120}) rotate(${rueda})`}>
      <circle r={46} fill="#9aa1ac" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-44} x2={0} y2={-26} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />)}
      <circle r={12} fill={KC.ink} />
    </g>
    {guarda && <rect x={-86} y={-H - 186} width={120} height={22} rx={6} fill="#e7e9ee" stroke={KC.ink} strokeWidth={5} />}
    <Flama T={T} x={41} y={-H - 96 + boton * 14} s={0.9} o={llama} />
  </g>;
}

// Mano que sostiene el encendedor (dedos por delante, pulgar arriba). Origen = base del encendedor.
function ManoAtras({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 -320 Q -230 -200 -200 40 L -180 360 L 120 360 L 140 40 Q 150 -120 110 -260 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
function ManoDedos({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-330, -250, -170, -90].map((dy, i) => <rect key={i} x={-150} y={dy} width={200 - i * 6} height={74} rx={37} fill={PIEL} stroke={KC.ink} strokeWidth={8} />)}
    {[-330, -250, -170, -90].map((dy, i) => <path key={'u' + i} d={`M ${36 - i * 6} ${dy + 18} q 10 18 0 38`} stroke="#c98a6a" strokeWidth={5} fill="none" />)}
  </g>;
}
function Pulgar({ x, y, s = 1, baja = 0 }) {
  return <g transform={`translate(${x} ${y + baja * 18}) scale(${s})`}>
    <path d="M -160 120 Q -170 0 -60 -30 Q 40 -50 80 -10 Q 100 30 40 40 Q -40 50 -60 140 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 30 -30 Q 70 -24 78 4" stroke="#c98a6a" strokeWidth={5} fill="none" />
  </g>;
}

// Moléculas en el encendedor (puntitos que vibran abajo y rebotan arriba). x, y = esquina sup. izq.
function Particulas({ T, x, y, w, h, nivel = 0.55, nLiq = 60, nVap = 7, vel = 1, seed = 4, r = 16, escapan = 0, t0 = 0, col = '#7fc8ff' }) {
  const R = krng(seed), yl = y + h * (1 - nivel), out = [];
  const cols = Math.round(Math.sqrt(nLiq * w / (h * nivel)));
  for (let i = 0; i < nLiq; i++) {
    const c = i % cols, f = Math.floor(i / cols), px = x + (c + 0.5) * (w / cols), py = y + h - (f + 0.5) * (r * 2.3), ph = R() * 6;
    if (py < yl + r) continue;
    let X = px + Math.sin(T * 9 * vel + ph) * 4 * vel, Y = py + Math.cos(T * 8 * vel + ph) * 4 * vel;
    const sube = escapan && i % Math.max(2, Math.round(10 / escapan)) === 0 ? kprog(((T - t0) * 0.6 + ph / 6) % 1.6, 0, 1.2) : 0;
    if (sube > 0 && py < yl + r * 5) { Y = klerp(Y, y - 40, sube); X += Math.sin(T * 5 + ph) * 20 * sube; }
    out.push(<circle key={'l' + i} cx={X} cy={Y} r={r} fill={col} stroke={KC.ink} strokeWidth={3} opacity={sube > 0.9 ? 1 - (sube - 0.9) * 10 : 1} />);
  }
  for (let i = 0; i < nVap; i++) {
    const a = R(), b = R(), va = 0.25 + R() * 0.35, vb = 0.2 + R() * 0.3;
    const X = x + r + kTri(a * 2 + T * va * vel) * (w - 2 * r), Y = y + r + kTri(b * 2 + T * vb * vel) * (yl - y - 3 * r);
    out.push(<circle key={'v' + i} cx={X} cy={Y} r={r} fill="#ffe86b" stroke={KC.ink} strokeWidth={3} />);
  }
  return <g>{out}</g>;
}
// Manómetro: aguja de 0 a max atm.
function Manometro({ x, y, r = 120, val = 1, max = 6, txt = '' }) {
  const ang = (v) => -210 + (v / max) * 240;
  const pol = (a, rr) => [x + Math.cos(a * Math.PI / 180) * rr, y + Math.sin(a * Math.PI / 180) * rr];
  const [nx, ny] = pol(ang(val), r * 0.78);
  return <g>
    <circle cx={x} cy={y} r={r} fill="#f6f3ec" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: max + 1 }, (_, i) => { const [a1, b1] = pol(ang(i), r * 0.86), [a2, b2] = pol(ang(i), r * 0.7), [tx, ty] = pol(ang(i), r * 0.54);
      return <g key={i}><line x1={a1} y1={b1} x2={a2} y2={b2} stroke={KC.ink} strokeWidth={5} /><text x={tx} y={ty + 10} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{i}</text></g>; })}
    <line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    <circle cx={x} cy={y} r={14} fill={KC.ink} />
    <text x={x} y={y + r * 0.62} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>atm</text>
    {txt && <text x={x} y={y + r + 50} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{txt}</text>}
  </g>;
}
// Termómetro vertical. val en °C entre min y max.
function Termo({ x, y, alto = 380, val = 20, min = -10, max = 60, marcas = [], color = KC.red }) {
  const f = (v) => y - 40 - ((v - min) / (max - min)) * (alto - 80);
  return <g>
    <rect x={x - 28} y={y - alto} width={56} height={alto} rx={28} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 14} y={f(val)} width={28} height={y - 20 - f(val)} fill={color} />
    <circle cx={x} cy={y + 20} r={46} fill={color} stroke={KC.ink} strokeWidth={8} />
    {marcas.map((m) => <g key={m}><line x1={x + 28} x2={x + 52} y1={f(m)} y2={f(m)} stroke={KC.ink} strokeWidth={5} />
      <text x={x + 62} y={f(m) + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{m} °C</text></g>)}
  </g>;
}
// Butano, isobutano y propano (esqueleto de carbonos con algunos H).
const BUTANO = { atomos: [[-150, 20, 40, QA.C, 'C'], [-50, -30, 40, QA.C, 'C'], [50, 20, 40, QA.C, 'C'], [150, -30, 40, QA.C, 'C'], [-200, 80, 22, QA.H, 'H'], [-210, -20, 22, QA.H, 'H'], [-50, -100, 22, QA.H, 'H'], [50, 90, 22, QA.H, 'H'], [210, 10, 22, QA.H, 'H'], [170, -100, 22, QA.H, 'H']],
  enlaces: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [1, 6], [2, 7], [3, 8], [3, 9]] };
const ISOBUTANO = { atomos: [[0, 0, 40, QA.C, 'C'], [-100, 50, 40, QA.C, 'C'], [100, 50, 40, QA.C, 'C'], [0, -110, 40, QA.C, 'C'], [0, 70, 22, QA.H, 'H'], [-160, 0, 22, QA.H, 'H'], [160, 0, 22, QA.H, 'H'], [-60, -150, 22, QA.H, 'H'], [60, -150, 22, QA.H, 'H']],
  enlaces: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 7], [3, 8]] };
const PROPANO = { atomos: [[-90, 20, 40, QA.C, 'C'], [0, -30, 40, QA.C, 'C'], [90, 20, 40, QA.C, 'C'], [-140, 80, 22, QA.H, 'H'], [140, 80, 22, QA.H, 'H'], [0, -100, 22, QA.H, 'H']],
  enlaces: [[0, 1], [1, 2], [0, 3], [2, 4], [1, 5]] };
// Chispas que saltan desde (x, y) hacia un lado.
function Chispas({ T, x, y, desde, hasta, n = 18, dir = 1, color = CHISPA, seed = 9, largo = 260 }) {
  if (T < desde || T > hasta + 0.6) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const t0 = desde + R() * Math.max(0.1, hasta - desde), a = (-70 + R() * 60) * Math.PI / 180, v = 0.5 + R() * 0.7, u = (T - t0) / 0.5;
    if (u < 0 || u > 1) return null;
    const px = x + dir * Math.cos(a) * largo * v * u, py = y + Math.sin(a) * largo * v * u + 120 * u * u;
    return <g key={i}><line x1={px} y1={py} x2={px - dir * Math.cos(a) * 30} y2={py - Math.sin(a) * 30} stroke={color} strokeWidth={8} strokeLinecap="round" opacity={1 - u} />
      <circle cx={px} cy={py} r={7} fill="#fff6c8" opacity={1 - u} /></g>; })}</g>;
}
// Panel redondo (ventana de acercamiento).
function Panel({ x, y, r = 180, fondo = KC.noche, borde = KC.white, children, id }) {
  return <g>
    <clipPath id={`pn${id}`}><circle cx={x} cy={y} r={r} /></clipPath>
    <circle cx={x} cy={y} r={r} fill={fondo} />
    <g clipPath={`url(#pn${id})`}>{children}</g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={borde} strokeWidth={12} />
    <circle cx={x} cy={y} r={r + 8} fill="none" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Sol({ T, x, y, r = 110, o = 1 }) {
  if (o <= 0) return null;
  return <g opacity={o} transform={`rotate(${T * 20} ${x} ${y})`}>
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${x - 18} ${y - r - 20} L ${x} ${y - r - 80} L ${x + 18} ${y - r - 20} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30} ${x} ${y})`} />)}
    <circle cx={x} cy={y} r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Fuego({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * o})`}>
    <path d={`M -20 0 C -30 -20 -10 -40 ${Math.sin(T * 12) * 4} -60 C 10 -40 30 -20 20 0 Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />
    <path d="M -8 0 C -10 -12 0 -22 0 -30 C 4 -20 10 -12 8 0 Z" fill={KC.yellow} />
  </g>;
}

function EncendedorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, P: CUES.Presion, V: CUES.Valvula, Ch: CUES.Chispa, F: CUES.Frio, Pr: CUES.Pregunta, S: CUES.Sol, Es: CUES.Estudio, Pi: CUES.Piedra, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sacude = (1 - kprog(T, K.G + 2.6, K.G + 3.6)) * Math.sin(T * 13);
  const presSol = klerp(2.05, 4.88, kprog(T, K.S + 0.8, K.S + 3.0, kEase.suave));
  const tSol = klerp(20, 50, kprog(T, K.S + 0.8, K.S + 3.0, kEase.suave));
  const R = krng(12);
  const casas = Array.from({ length: 12 }, (_, i) => [170 + (i % 6) * 148, 1080 + Math.floor(i / 6) * 140, R()]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mano sacude el encendedor y el líquido chapotea */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <g transform={`rotate(${sacude * 9} 540 1300)`}>
            <ManoAtras x={540} y={1300} s={1.05} />
            <Encendedor T={T} x={540} y={1300} s={1.05} ola={Math.abs(sacude) * 1.2 + 0.15} id="g" />
            <ManoDedos x={540} y={1300} s={1.05} />
          </g>
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={7.8} x={60} y={1430} color={KC.ink} />
      </Escena>
      {/* 1 · qué es: butano, isobutano, propano; hierve a ≈ −0.5 °C */}
      <Escena T={T} a={K.Q} b={K.P}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, K.Q + 0.1, K.Q + 0.5)}><Molecula {...BUTANO} x={600} y={610} s={1.05} rot={Math.sin(T * 1.3) * 5} /></g>
          <g opacity={kprog(T, K.Q + 1.0, K.Q + 1.4)}><Molecula {...ISOBUTANO} x={360} y={960} s={0.85} rot={Math.sin(T * 1.1) * 6} /></g>
          <g opacity={kprog(T, K.Q + 1.6, K.Q + 2.0)}><Molecula {...PROPANO} x={800} y={930} s={0.7} rot={Math.sin(T * 1.5) * 6} /></g>
          <text x={600} y={760} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Q + 0.3, K.Q + 0.7)}>BUTANO · C₄H₁₀</text>
          <text x={360} y={1090} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Q + 1.0, K.Q + 1.4)}>isobutano</text>
          <text x={800} y={1050} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Q + 1.6, K.Q + 2.0)}>propano (mezcla)</text>
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: líquido apretado y vapor que empuja */}
      <Escena T={T} a={K.P} b={K.V} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={120} y={600} width={840} height={640} rx={40} fill="rgba(255,45,120,.10)" stroke={PLAST} strokeWidth={14} />
          <Particulas T={T} x={140} y={620} w={800} h={600} nivel={0.55} nLiq={110} nVap={9} r={17} seed={3} />
          <line x1={140} x2={940} y1={620 + 600 * 0.45 - 10} y2={620 + 600 * 0.45 - 10} stroke="#7fc8ff" strokeWidth={4} strokeDasharray="16 12" />
          <Manometro x={300} y={440} r={110} val={klerp(0, 2.05, kprog(T, K.P + 1.4, K.P + 2.6, kEase.sale))} max={6} />
        </SvgCapa>
        <Etq T={T} at={K.P + 0.5} until={K.V - 0.2} x={960} y={720} texto="vapor" lado="izq" tam={34} color="#ffe86b" />
        <Etq T={T} at={K.P + 0.8} until={K.V - 0.2} x={960} y={1080} texto="líquido" lado="izq" tam={34} color="#7fc8ff" />
        <Escala T={T} z={1} pxPorMm={1e8} x={60} y={1430} />
      </Escena>
      {/* 3 · la válvula: el pulgar aprieta, baja la presión, hierve y sale el gas */}
      <Escena T={T} a={K.V} b={K.Ch} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <ManoAtras x={540} y={1560} s={1.25} />
          <Encendedor T={T} x={540} y={1560} s={1.25} boton={kprog(T, K.V + 0.4, K.V + 0.8)} ola={0.1} id="v" />
          <ManoDedos x={540} y={1560} s={1.25} />
          <Pulgar x={720} y={940} s={1.1} baja={kprog(T, K.V + 0.4, K.V + 0.8)} />
          <Burbujas T={T} x={430} y={1080} w={190} h={180} n={18} f={kprog(T, K.V + 0.8, K.V + 1.4)} color="rgba(30,90,160,.8)" vel={220} />
          {T > K.V + 0.9 && Array.from({ length: 10 }, (_, i) => { const u = ((T - K.V - 0.9) * 1.2 + i / 10) % 1; return <circle key={i} cx={591 + Math.sin(i * 2 + T * 6) * 18 * u} cy={890 - u * 380} r={12 + u * 10} fill="#ffe86b" stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
        </SvgCapa>
        <Etq T={T} at={K.V + 1.0} until={K.Ch - 0.2} x={640} y={600} texto="gas que sale" lado="der" tam={34} color={KC.ink} />
      </Escena>
      {/* 4 · la chispa: rueda + piedrita, o cristal piezoeléctrico; el gas arde */}
      <Escena T={T} a={K.Ch} b={K.F} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Encendedor T={T} x={540} y={1300} s={0.95} rueda={-(T - K.Ch) * 260 * kprog(T, K.Ch + 0.2, K.Ch + 0.5)} boton={kprog(T, K.Ch + 2.4, K.Ch + 2.6)} llama={kprog(T, K.Ch + 2.7, K.Ch + 3.1)} id="c" />
          <Panel x={230} y={900} r={175} id="r">
            <g transform={`translate(230 830) rotate(${-(T - K.Ch) * 300})`}>
              <circle r={120} fill="#9aa1ac" stroke={KC.ink} strokeWidth={8} />
              {Array.from({ length: 20 }, (_, i) => <line key={i} x1={0} y1={-118} x2={0} y2={-84} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 18})`} />)}
            </g>
            <rect x={196} y={952} width={68} height={140} rx={10} fill="#6b6f78" stroke={KC.ink} strokeWidth={6} />
            <Chispas T={T} x={250} y={950} desde={K.Ch + 0.3} hasta={K.Ch + 2.8} n={26} dir={1} largo={200} />
          </Panel>
          <Panel x={850} y={900} r={175} id="p">
            <g transform={`translate(0 ${klerp(-60, 0, kprog(T, K.Ch + 1.2, K.Ch + 1.35))})`}><rect x={800} y={760} width={100} height={70} rx={10} fill="#8a8f99" stroke={KC.ink} strokeWidth={6} /></g>
            <path d="M 850 840 L 900 868 L 900 924 L 850 952 L 800 924 L 800 868 Z" fill="#cfe9ff" stroke={KC.ink} strokeWidth={6} />
            {T > K.Ch + 1.35 && T < K.Ch + 2.4 && <path d="M 830 960 L 870 1000 L 836 1010 L 880 1060" stroke="#7fdcff" strokeWidth={10} fill="none" strokeLinejoin="round" opacity={0.6 + 0.4 * Math.sin(T * 50)} />}
          </Panel>
          <text x={230} y={1130} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>rueda + piedrita</text>
          <text x={850} y={1130} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>cristal piezo</text>
        </SvgCapa>
      </Escena>
      {/* 5 · se enfría: el líquido que hierve le roba calor a la pared */}
      <Escena T={T} a={K.F} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={120} y={600} width={840} height={640} rx={40} fill="rgba(127,200,255,.10)" stroke={mixHex(PLAST, '#7fc8ff', kprog(T, K.F + 0.8, K.F + 2.6))} strokeWidth={14} />
          <Particulas T={T} x={140} y={620} w={800} h={600} nivel={0.5} nLiq={100} nVap={9} r={17} seed={3} escapan={3} t0={K.F} />
          {[[150, 1000, 1], [930, 1050, -1], [150, 1150, 1], [930, 900, -1]].map(([x, y, d], i) => { const u = ((T - K.F) * 0.8 + i * 0.25) % 1;
            return <path key={i} d={`M ${x + d * u * 140} ${y} l ${-d * 40} -26 m ${d * 40} 26 l ${-d * 40} 26 M ${x + d * u * 140} ${y} l ${-d * 90} 0`} stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" opacity={1 - u} />; })}
          {[[200, 650], [880, 680], [180, 1200], [900, 1190], [540, 630]].map(([a, b], i) => <path key={i} d={`M ${a - 20} ${b} L ${a + 20} ${b} M ${a} ${b - 20} L ${a} ${b + 20}`} stroke="#fff" strokeWidth={5} opacity={kprog(T, K.F + 1.4 + i * 0.2, K.F + 1.8 + i * 0.2)} strokeLinecap="round" />)}
        </SvgCapa>
        <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH }}>
          <svg width={KW} height={KH} style={{ position:'absolute' }}><Termo x={330} y={500} alto={220} val={klerp(22, 8, kprog(T, K.F + 0.8, K.F + 3.0))} min={0} max={30} color="#4aa8ff" /></svg>
        </div>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Sol T={T} x={260} y={620} r={100} />
          <text x={280} y={1250} textAnchor="middle" style={{ font:`400 500px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 1050)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · al sol: tablero del coche, sube la temperatura y la presión */}
      <Escena T={T} a={K.S} b={K.Es} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fd8ff 0%, #ffe9a8 55%, #3b3f48 55%)' }}></div>
        <SvgCapa>
          <Sol T={T} x={860} y={500} r={90} o={1} />
          <path d="M 0 1056 Q 540 980 1080 1056 L 1080 1120 L 0 1120 Z" fill="#2a2d34" stroke={KC.ink} strokeWidth={8} />
          <Encendedor T={T} x={330} y={1040} s={0.7} rot={-78} id="s" />
          <Manometro x={760} y={830} r={130} val={presSol} max={6} />
          <Termo x={560} y={1380} alto={300} val={tSol} min={0} max={60} marcas={[20, 50]} />
        </SvgCapa>
        <Chip T={T} at={K.S + 0.6} until={K.S + 3.0} texto={`butano: ${Math.round(tSol)} °C ≈ ${kformato(presSol, 1)} atm`} x={540} y={1500} tam={40} borde={KC.orange} mono />
      </Escena>
      {/* 8 · el estudio: la norma para que los niños no lo prendan */}
      <Escena T={T} a={K.Es} b={K.Pi}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {casas.map(([x, y, r], i) => { const off = kprog(T, K.Es + 4.2 + i * 0.18, K.Es + 4.5 + i * 0.18);
            return <g key={i} opacity={kprog(T, K.Es + 3.6, K.Es + 4.0)}><Casita x={x} y={y} s={1.7} color={mixHex(KC.orange, KC.white, off * 0.5)} /><Fuego T={T + r * 3} x={x + 10} y={y - 30} s={1.4} o={1 - off} /></g>; })}
          <g opacity={kprog(T, K.Es + 0.2, K.Es + 0.6) * (1 - kprog(T, K.Es + 3.4, K.Es + 3.8))}><Encendedor T={T} x={300} y={1320} s={0.8} guarda id="n" /></g>
        </SvgCapa>
        <NumeroGigante T={T} at={K.Es + 4.4} until={K.Pi - 0.3} valor={3300} dur={1.6} prefijo="≈ " etiqueta="incendios evitados en 1998 (EE. UU.)" y={760} tam={150} color={KC.yellow} />
        <Etq T={T} at={K.Es + 1.0} until={K.Es + 3.4} x={360} y={980} texto="seguro para niños" lado="der" tam={34} color={KC.ink} />
      </Escena>
      {/* 9 · la piedrita: ferrocerio en la red cristalina */}
      <Escena T={T} a={K.Pi} b={K.Ci} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {Array.from({ length: 48 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8), k = (i * 7) % 10, tipo = k < 4 ? 'Ce' : k < 7 ? 'Fe' : k < 9 ? 'La' : 'Ce';
            const col = { Ce: '#b6e33a', Fe: '#ff8a1f', La: '#7fa8ff' }[tipo], x = 150 + c * 112 + (f % 2) * 56, y = 640 + f * 100;
            return <g key={i} opacity={kprog(T, K.Pi + 0.2 + i * 0.02, K.Pi + 0.5 + i * 0.02)}><Atomo x={x + Math.sin(T * 6 + i) * 3} y={y} r={42} color={col} letra={tipo} tam={30} /></g>; })}
          {/* la rueda arranca virutas que se encienden con el aire */}
          {T > K.Pi + 4.6 && <g>
            <g transform={`translate(540 560) rotate(${-(T - K.Pi) * 220})`}><circle r={120} fill="#9aa1ac" stroke={KC.ink} strokeWidth={8} />
              {Array.from({ length: 20 }, (_, i) => <line key={i} x1={0} y1={-118} x2={0} y2={-84} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 18})`} />)}</g>
            <Chispas T={T} x={620} y={660} desde={K.Pi + 4.8} hasta={K.Ci - 0.2} n={40} dir={1} largo={330} seed={4} />
          </g>}
        </SvgCapa>
        <Etq T={T} at={K.Pi + 2.6} until={K.Pi + 4.6} x={80} y={1290} texto="Ce · cerio" tam={32} color="#b6e33a" />
        <Etq T={T} at={K.Pi + 2.9} until={K.Pi + 4.6} x={420} y={1290} texto="Fe · hierro" tam={32} color="#ff8a1f" />
        <Etq T={T} at={K.Pi + 3.2} until={K.Pi + 4.6} x={760} y={1290} texto="La…" tam={32} color="#7fa8ff" />
      </Escena>
      {/* 10 · cierre: la mano del inicio, ahora por dentro y con la llama */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ManoAtras x={700} y={1300} s={1.05} />
          <Encendedor T={T} x={700} y={1300} s={1.05} ola={0.15} llama={kprog(T, K.Ci + 0.2, K.Ci + 0.6)} id="f" />
          <ManoDedos x={700} y={1300} s={1.05} />
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.6} until={FIN} x={280} y={820} r={210} fx={700} fy={1100} tinte={KC.cyan} etiqueta="POR DENTRO · LÍQUIDO A PRESIÓN"
          interior={(TT, r) => <svg width={2 * r} height={2 * r}><Particulas T={TT} x={20} y={20} w={2 * r - 40} h={2 * r - 40} nivel={0.55} nLiq={40} nVap={5} r={14} seed={6} /></svg>} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.G + 2.6} texto="¿lleno de gas?" x={330} y={470} tam={48} />
      <Chip T={T} at={K.G + 2.7} until={K.Q - 0.2} texto="trae LÍQUIDO" x={330} y={470} tam={52} borde="#7fc8ff" />
      <Chip T={T} at={K.Q + 2.4} until={K.P - 0.2} texto="el butano hierve a ≈ −0.5 °C" x={540} y={1500} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.P + 1.4} until={K.V - 0.2} texto="butano puro: 20 °C → ≈ 2 atm · aire: 1 atm" x={540} y={1500} tam={32} borde="#7fc8ff" />
      <Chip T={T} at={K.V + 0.9} until={K.Ch - 0.2} texto="baja la presión → hierve" x={540} y={1500} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Ch + 2.8} until={K.F - 0.2} texto="gas + oxígeno del aire → llama" x={540} y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.F + 0.8} until={K.Pr - 0.2} texto="hervir roba calor → se enfría" x={540} y={1500} tam={40} borde="#7fc8ff" />
      <Chip T={T} at={K.S + 3.1} until={K.Es - 0.2} texto="Empaque: no más de 50 °C ni sol prolongado" x={540} y={1500} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.4} anio="2002" quien="Smith, Greene y Singh · CPSC, EE. UU." revista="Injury Prevention · norma vigente desde 1994" x={620} y={700} />
      <Chip T={T} at={K.Es + 4.6} until={K.Pi - 0.3} texto="norma vigente desde 1994 · niños menores de 5" x={540} y={1500} tam={32} borde={KC.lilac} />
      <MitoTachado T={T} at={K.Pi + 0.3} tacharEn={K.Pi + 1.4} until={K.Pi + 2.4} texto="pedernal" x={480} y={470} tam={52} />
      <Chip T={T} at={K.Pi + 2.5} until={K.Pi + 4.6} texto="ferrocerio = Fe + Ce + La…" x={540} y={1500} tam={46} borde="#b6e33a" />
      <TarjetaEstudio T={T} at={K.Pi + 4.7} until={K.Ci - 0.3} anio="1903" quien="Carl Auer von Welsbach · Austria" revista="aleación de Auer, 1903: Fe + Ce" x={540} y={1060} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="butano líquido · ≈ 2 atm (butano puro)" x={540} y={1500} tam={34} borde="#7fc8ff" />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es gas: *es líquido.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.P - 0.1} texto="Al aire libre, *son gases.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.1} until={K.V - 0.1} texto="Apretado, *sigue líquido.*" />
      <Subtitulo T={T} idx={3} at={K.V + 0.1} until={K.Ch - 0.1} texto="Baja la presión: *hierve.*" />
      <Subtitulo T={T} idx={4} at={K.Ch + 0.1} until={K.F - 0.1} texto="Una chispa y *el gas arde.*" />
      <Subtitulo T={T} idx={5} at={K.F + 0.1} until={K.Pr - 0.1} texto="Al hervir, *roba calor.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.S - 0.1} texto="¿Por qué *no al sol?*" />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={K.Es - 0.1} texto="A 50 °C: *más del doble.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Pi - 0.1} texto="Unos *3,300 incendios* evitados." />
      <Subtitulo T={T} idx={9} at={K.Pi + 0.1} until={K.Ci - 0.1} texto="No es pedernal: *es ferrocerio.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Un *líquido apretado.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Presion - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Presion + 1.0, CUES.Valvula - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Chispa + 0.8, CUES.Frio - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Frio + 0.8, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Sol + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Sol + 1.2, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Estudio + 1.4, CUES.Piedra - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Piedra + 0.9, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="54" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EncendedorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EncendedorShot /></CompositionStage></div>;
}
window.EncendedorApp = EncendedorApp;
