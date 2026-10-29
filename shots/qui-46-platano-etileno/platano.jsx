// Shot Químico #46 · El plátano que madura a la fruta de al lado (etileno) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VERDE = '#7cc242', AMAR = '#ffd23f', CAFE = '#6b3f1d', PAPEL = '#c99a5b';

// Plátano: mad 0 = verde, 1 = amarillo con pecas cafés.
function Platano({ x, y, s = 1, mad = 1, rot = 0, corona = 0 }) {
  const c = mad < 0.5 ? mixHex(VERDE, '#d8d93a', mad * 2) : mixHex('#d8d93a', AMAR, (mad - 0.5) * 2);
  const pecas = kclamp((mad - 0.6) / 0.4, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -170 -36 Q 0 190 172 -44 L 172 -30 Q 0 200 -170 -24 Z" fill="rgba(0,0,0,.18)" />
    <path d="M -170 -50 Q 0 170 170 -60 Q 160 -78 150 -76 Q 0 60 -150 -62 Q -164 -60 -170 -50 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -140 -40 Q 0 120 150 -52" fill="none" stroke="rgba(0,0,0,.15)" strokeWidth={5} />
    <path d="M 156 -70 L 192 -102 L 204 -90 L 170 -56 Z" fill={mixHex('#5b7d2a', CAFE, mad)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -170 -50 L -182 -46 L -176 -38 Z" fill={KC.ink} stroke={KC.ink} strokeWidth={5} />
    {pecas > 0 && [[-110, -14], [-60, 14], [-20, 30], [30, 28], [80, 8], [-80, 0], [50, 18]].map(([px, py], i) =>
      <ellipse key={i} cx={px} cy={py} rx={7} ry={5} fill={CAFE} opacity={pecas} />)}
    {corona > 0 && <g transform={`translate(-10 -40) scale(${corona})`}>
      <path d="M -60 0 L -60 -60 L -30 -30 L 0 -75 L 30 -30 L 60 -60 L 60 0 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={0} cy={-18} r={9} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}
// Aguacate: mad 0 = verde y duro, 1 = casi negro (maduro).
function Aguacate({ x, y, s = 1, mad = 0, rot = 0, hundido = 0 }) {
  const c = mixHex('#5d9e2f', '#2e2230', mad);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -130 Q 58 -130 66 -44 Q 116 30 92 104 Q 0 172 -92 104 Q -116 30 -66 -44 Q -58 -130 0 -130 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-30, -60], [20, -20], [-40, 30], [40, 60], [-10, 90], [50, -80], [-60, 80], [10, 40]].map(([px, py], i) =>
      <circle key={i} cx={px} cy={py} r={4} fill="rgba(0,0,0,.25)" />)}
    <path d="M -6 -130 L -2 -150 L 8 -150 L 6 -128" fill={CAFE} stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -70 Q -60 -20 -50 30" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={10} strokeLinecap="round" />
    {hundido > 0 && <ellipse cx={30} cy={40} rx={34 * hundido} ry={22 * hundido} fill="rgba(0,0,0,.35)" />}
  </g>;
}
function Manzana({ x, y, s = 1, color = '#e5262f' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -60 Q 40 -100 82 -60 Q 118 -10 90 60 Q 60 120 20 100 Q 0 92 -20 100 Q -60 120 -90 60 Q -118 -10 -82 -60 Q -40 -100 0 -60 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -50 -40 Q -70 0 -60 40" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth={10} strokeLinecap="round" />
    <path d="M 0 -60 Q 4 -90 16 -108" fill="none" stroke={CAFE} strokeWidth={9} strokeLinecap="round" />
    <path d="M 14 -96 Q 50 -124 74 -98 Q 44 -78 14 -96 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Uvas({ x, y, s = 1, color = '#b6e05a' }) {
  const pts = [[-50, -40], [0, -48], [50, -40], [-28, 0], [26, 0], [-50, 40], [0, 40], [48, 36], [-24, 78], [24, 78], [0, 114]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -70 Q 4 -100 -10 -120" fill="none" stroke={CAFE} strokeWidth={9} strokeLinecap="round" />
    {pts.map(([px, py], i) => <g key={i}><circle cx={px} cy={py} r={30} fill={color} stroke={KC.ink} strokeWidth={6} />
      <circle cx={px - 9} cy={py - 10} r={7} fill="#fff" opacity={0.5} /></g>)}
  </g>;
}
function Fresa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -40 Q 0 -70 70 -40 Q 70 40 0 100 Q -70 40 -70 -40 Z" fill="#ff3b4f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[-30, -10], [10, -20], [36, 6], [-10, 24], [20, 44], [-30, 40], [0, 70]].map(([px, py], i) => <ellipse key={i} cx={px} cy={py} rx={4} ry={6} fill={KC.yellow} />)}
    <path d="M -60 -46 L -30 -76 L -10 -54 L 10 -82 L 26 -54 L 56 -72 L 50 -40 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
function Citrico({ x, y, s = 1, color = '#ff9f1c', limon = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {limon ? <path d="M -96 0 Q -80 -66 0 -66 Q 80 -66 96 0 Q 80 66 0 66 Q -80 66 -96 0 Z" fill="#c7e83a" stroke={KC.ink} strokeWidth={7} />
      : <circle r={72} fill={color} stroke={KC.ink} strokeWidth={7} />}
    {[[-20, -20], [20, 10], [-10, 30], [30, -30]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={3} fill="rgba(0,0,0,.25)" />)}
    <circle cx={-26} cy={-30} r={12} fill="#fff" opacity={0.35} />
  </g>;
}
function Frutero({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={150} rx={300} ry={26} fill="rgba(0,0,0,.18)" />
    <path d="M -330 0 Q -300 150 0 150 Q 300 150 330 0 Z" fill="#c9773f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -300 40 Q 0 90 300 40" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth={10} />
    <rect x={-336} y={-14} width={672} height={26} rx={13} fill="#e08a4e" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Molécula de etileno: dos carbonos con doble enlace y cuatro hidrógenos. f = armado 0..1 (aparecen C y luego H).
function MolEt({ x, y, s = 1, rot = 0, o = 1, f = 1 }) {
  if (o <= 0) return null;
  const H = [[-72, -42], [-72, 42], [72, -42], [72, 42]];
  const hOn = (i) => kclamp((f - 0.3 - i * 0.15) / 0.12, 0, 1);
  const cOn = kclamp(f / 0.3, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {H.map(([hx, hy], i) => hOn(i) > 0 && <line key={i} x1={hx > 0 ? 34 : -34} y1={0} x2={hx} y2={hy} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" opacity={hOn(i)} />)}
    {cOn > 0 && <g opacity={cOn}><line x1={-34} y1={-9} x2={34} y2={-9} stroke={KC.ink} strokeWidth={10} /><line x1={-34} y1={9} x2={34} y2={9} stroke={KC.ink} strokeWidth={10} /></g>}
    {H.map(([hx, hy], i) => hOn(i) > 0 && <g key={'h' + i} transform={`translate(${hx} ${hy}) scale(${hOn(i)})`}><Atomo x={0} y={0} r={22} color={QA.H} letra="H" /></g>)}
    {cOn > 0 && <g transform={`scale(${cOn})`}><Atomo x={-34} y={0} r={34} color="#4a4a4a" letra="" /><Atomo x={34} y={0} r={34} color="#4a4a4a" letra="" />
      <text x={-34} y={11} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">C</text>
      <text x={34} y={11} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">C</text></g>}
  </g>;
}
// Gas: moléculas de etileno que viajan de (x0,y0) a (x1,y1) en ciclo, con bamboleo.
function Gas({ T, x0, y0, x1, y1, n = 8, desde = 0, hasta = Infinity, vel = 0.45, seed = 4, s = 0.32, ancho = 70, rebota = false }) {
  if (T < desde || T > hasta + 0.4) return null;
  const R = krng(seed);
  const fin = 1 - kprog(T, hasta, hasta + 0.4);
  return <g>{Array.from({ length: n }, (_, i) => {
    const ph = R(), w = R() * 6, dv = (R() - 0.5) * ancho;
    let u = ((T - desde) * vel + ph) % 1;
    if (rebota && u > 0.6) u = 0.6 - (u - 0.6) * 1.2;
    const xx = klerp(x0, x1, u) + Math.sin(T * 2 + w) * 22 + dv * 0.6, yy = klerp(y0, y1, u) + Math.cos(T * 1.7 + w) * 18 + dv;
    const o = Math.min(1, (T - desde) * 3, ((T - desde) * vel + ph) < 1 ? u * 6 : 1) * fin;
    return <MolEt key={i} x={xx} y={yy} s={s} rot={T * 60 + w * 50} o={Math.max(0, o)} />;
  })}</g>;
}
// Gas encerrado: moléculas que se mecen dentro de un rectángulo.
function GasCaja({ T, x, y, w, h, n = 10, f = 1, seed = 9, s = 0.26 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const px = R(), py = R(), a = R() * 6, on = i / n < f;
    return on ? <MolEt key={i} x={x + w * (0.1 + 0.8 * (0.5 + 0.45 * Math.sin(T * 0.8 + a + px * 6)))} y={y + h * (0.1 + 0.8 * (0.5 + 0.45 * Math.cos(T * 0.7 + a * 2 + py * 6)))} s={s} rot={T * 50 + a * 60} /> : null; })}</g>;
}
function BolsaPapel({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -200 L 170 -200 L 190 200 L -190 200 Z" fill={PAPEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -170 -200 L -150 -240 L 150 -240 L 170 -200" fill="#b5864a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-130} y={-140} width={260} height={300} rx={20} fill="rgba(255,248,230,.55)" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />
    {children}
    {[[-150, -120], [150, -60], [-140, 120], [160, 140]].map(([px, py], i) => <path key={i} d={`M ${px} ${py} l ${i % 2 ? -20 : 20} 14`} stroke="rgba(0,0,0,.25)" strokeWidth={5} />)}
  </g>;
}
// Plántula de chícharo: crece (g 0..1) y se dobla de lado (lado 0..1).
function Chicharo({ x, y, g = 1, lado = 1, dir = 1 }) {
  const top = y - 70 * g, ex = x + dir * 150 * lado * g, ey = klerp(y - 260 * g, y - 110 * g, lado);
  const cy = klerp(y - 200 * g, y - 130 * g, lado);
  return <g>
    <path d={`M ${x} ${y} L ${x} ${top} Q ${x} ${cy} ${ex} ${ey}`} fill="none" stroke={KC.ink} strokeWidth={22 + lado * 8} strokeLinecap="round" />
    <path d={`M ${x} ${y} L ${x} ${top} Q ${x} ${cy} ${ex} ${ey}`} fill="none" stroke="#e6e7a8" strokeWidth={12 + lado * 8} strokeLinecap="round" />
    <path d={`M ${ex} ${ey} q ${dir * 18 * (1 - lado) + dir * 26 * lado} ${-30 * (1 - lado) + 4 * lado} ${dir * 6} ${-40 * (1 - lado) + 26 * lado}`} fill="none" stroke="#c9d36b" strokeWidth={12} strokeLinecap="round" />
  </g>;
}
function Caja({ x, y, mad, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={240} height={90} rx={8} fill="#d9a05b" stroke={KC.ink} strokeWidth={7} />
    <Platano x={-40} y={-40} s={0.42} mad={mad} rot={-6} /><Platano x={50} y={-44} s={0.42} mad={mad} rot={4} />
    <rect x={-120} y={-10} width={240} height={70} rx={8} fill="#e2ad6a" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={42} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>BANANAS</text>
  </g>;
}

function Capa({ dy = -130, children }) { return <SvgCapa><g transform={`translate(0 ${dy})`}>{children}</g></SvgCapa>; }

function Platanos() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, H: CUES.Hormona, Ca: CUES.Cadena, B: CUES.Bolsa, P: CUES.Pregunta, Ti: CUES.Tipos, N: CUES.Neljubov, Ga: CUES.Gane, Cu: CUES.Cuarto, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const dur6 = (K.N - K.Ti) * 0.62; // la línea 7 ("El plátano…") empieza ≈ al 62 % de Tipos
  const T7 = K.Ti + dur6;
  const ripeG = kprog(T, K.G + 0.8, K.G + 4.5, kEase.suave);
  const cadena = kprog(T, K.Ca + 0.2, K.Ca + 3.8, kEase.suave);
  const bolsaMad = kprog(T, K.B + 1.0, K.B + 3.6, kEase.suave);
  const corta = kprog(T, K.Ti + 2.4, K.Ti + 2.9, kEase.sale);
  const derMad = kprog(T, T7 + 0.4, K.N - 0.6, kEase.suave);
  const recto = kprog(T, K.N + 3.9, K.N + 5.2, kEase.suave);
  const crece = klerp(0.45, 1, kprog(T, K.N - 0.4, K.N + 3.6, kEase.suave));
  const ventana = kprog(T, K.N + 3.5, K.N + 4.0, kEase.sale);
  const llena = kprog(T, K.Cu + 2.4, K.Cu + 3.6);
  const cuartoMad = kprog(T, K.Cu + 3.2, K.Cu + 5.4, kEase.suave);
  const entra = kprog(T, K.Cu + 0.2, K.Cu + 1.6, kEase.sale);
  const dia = Math.floor(Math.max(0, T - (K.B + 0.9)) / 0.55);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el frutero; el plátano suelta gas hacia el aguacate */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06} origen="45% 55%">
        <FondoLunares color={KC.yellow} />
        <Capa dy={-170}>
          <Frutero x={470} y={1120} s={1.15} />
          <Uvas x={720} y={1010} s={0.95} />
          <Aguacate x={520} y={980} s={0.95} mad={ripeG * 0.45} rot={8} />
          <Platano x={300} y={1040} s={1.1} mad={0.9} rot={-8 + Math.sin(T * 3) * 2} />
          <Gas T={T} x0={300} y0={960} x1={520} y1={900} n={9} desde={K.G} hasta={K.Q} vel={0.5} ancho={90} />
        </Capa>
      </Escena>
      {/* 1 · qué es: la molécula C₂H₄ se arma */}
      <Escena T={T} a={K.Q} b={K.H} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Capa dy={-120}>
          {[...Array(14)].map((_, i) => <circle key={i} cx={(i * 173) % 1080} cy={420 + (i * 271) % 1100} r={3 + (i % 3)} fill="rgba(255,255,255,.18)" />)}
          <MolEt x={540} y={960} s={3} rot={Math.sin(T * 0.8) * 10} f={kprog(T, K.Q + 0.1, K.Q + 1.6)} />
          <g opacity={kprog(T, K.Q + 3.4, K.Q + 3.8)}>
            <line x1={300} y1={1160} x2={780} y2={1160} stroke={KC.gold2} strokeWidth={8} />
            <line x1={300} y1={1140} x2={300} y2={1180} stroke={KC.gold2} strokeWidth={8} /><line x1={780} y1={1140} x2={780} y2={1180} stroke={KC.gold2} strokeWidth={8} />
            <text x={540} y={1220} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.gold2}>≈ 0.4 nm</text>
          </g>
        </Capa>
      </Escena>
      {/* 2 · hormona: llega a la célula de la otra fruta y da la orden */}
      <Escena T={T} a={K.H} b={K.Ca} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Capa dy={-120}>
          <rect x={160} y={800} width={760} height={420} rx={70} fill="#1f4a33" stroke={KC.mint} strokeWidth={10} />
          <circle cx={700} cy={1060} r={80} fill="#2c6b48" stroke={KC.mint} strokeWidth={6} />
          <path d="M 500 800 L 500 760 Q 500 730 540 730 Q 580 730 580 760 L 580 800" fill="none" stroke={KC.gold2} strokeWidth={16} strokeLinecap="round" />
          <Gas T={T} x0={540} y0={420} x1={540} y1={760} n={6} desde={K.H - 0.2} hasta={K.Ca} vel={0.55} ancho={160} s={0.4} />
          <MolEt x={540} y={klerp(500, 770, kprog(T, K.H + 0.3, K.H + 1.5, kEase.sale))} s={0.55} rot={0} o={kprog(T, K.H + 0.2, K.H + 0.5)} />
          {T > K.H + 1.5 && <circle cx={540} cy={770} r={60 + 40 * kprog(T, K.H + 1.5, K.H + 2.1)} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={1 - kprog(T, K.H + 1.5, K.H + 2.1)} />}
          <g opacity={kprog(T, K.H + 2.0, K.H + 2.3)} transform={`translate(400 1010) scale(${klerp(0.6, 1, kprog(T, K.H + 2.0, K.H + 2.4, kEase.rebote))})`}>
            <text x={0} y={30} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">¡MADURA!</text>
          </g>
        </Capa>
      </Escena>
      {/* 3 · la reacción en cadena: respira, color, se ablanda, más etileno */}
      <Escena T={T} a={K.Ca} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <Capa dy={-130}>
          <Aguacate x={650} y={1000} s={1.4} mad={cadena} hundido={kprog(T, K.Ca + 2.0, K.Ca + 2.5)} />
          {T > K.Ca + 0.3 && [0, 1, 2].map((i) => { const u = ((T - K.Ca - 0.3) * 0.5 + i / 3) % 1; return <Mol key={i} tipo="co2" x={570 + i * 60} y={klerp(760, 560, u)} s={0.55} o={Math.min(1, (1 - u) * 3) * kprog(T, K.Ca + 0.3, K.Ca + 0.6)} />; })}
          {T > K.Ca + 1.9 && <g transform={`translate(${klerp(1000, 740, kprog(T, K.Ca + 1.9, K.Ca + 2.3, kEase.sale))} 1060) rotate(-30)`}>
            <rect x={-30} y={-60} width={60} height={130} rx={30} fill="#f1b48f" stroke={KC.ink} strokeWidth={7} /></g>}
          <Gas T={T} x0={700} y0={940} x1={980} y1={800} n={7} desde={K.Ca + 2.9} hasta={K.B} vel={0.6} ancho={120} />
          <Gas T={T} x0={560} y0={1080} x1={300} y1={1260} n={6} desde={K.Ca + 3.0} hasta={K.B} vel={0.6} ancho={120} seed={8} />
        </Capa>
      </Escena>
      {/* 4 · el experimento: bolsa de papel con una manzana madura */}
      <Escena T={T} a={K.B} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Capa dy={-150}>
          <Aguacate x={230} y={1090} s={0.85} mad={0.05} />
          <BolsaPapel x={700} y={1020} s={1.0}>
            <Aguacate x={-50} y={40} s={0.62} mad={bolsaMad * 0.85} />
            <Manzana x={70} y={80} s={0.6} />
            <GasCaja T={T} x={-125} y={-135} w={250} h={290} n={10} f={kprog(T, K.B + 0.4, K.B + 2.0)} />
          </BolsaPapel>
          <g transform="translate(540 700)">
            <circle r={58} fill={dia % 2 ? '#2b2f6b' : KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.B + 0.8, K.B + 1.1)} />
            {dia % 2 ? <path d="M -14 -30 A 32 32 0 1 0 18 26 A 26 26 0 1 1 -14 -30 Z" fill="#f4efe4" opacity={kprog(T, K.B + 0.8, K.B + 1.1)} /> : null}
          </g>
          <Marca x={860} y={760} ok={true} s={0.8} o={kprog(T, K.B + 3.4, K.B + 3.8)} />
        </Capa>
      </Escena>
      {/* 5 · pregunta: ¿y las uvas? */}
      <Escena T={T} a={K.P} b={K.Ti} zoom={0.08} origen="30% 55%">
        <FondoLunares color={KC.cyan} />
        <Capa dy={-150}>
          <Uvas x={300} y={1060} s={1.6} />
          <Gas T={T} x0={120} y0={600} x1={300} y1={960} n={7} desde={K.P - 0.3} hasta={K.Ti} vel={0.8} rebota={true} ancho={120} />
          <text x={300} y={820} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 6} 300 720)`} opacity={kprog(T, K.P + 0.3, K.P + 0.6)}>?</text>
        </Capa>
      </Escena>
      {/* 6–7 · dos tipos de fruta */}
      <Escena T={T} a={K.Ti} b={K.N} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Capa dy={-100}>
          <line x1={540} y1={760} x2={540} y2={1200} stroke="rgba(22,18,15,.4)" strokeWidth={8} strokeDasharray="20 16" />
          {/* izquierda: maduran en la planta */}
          <path d="M 70 790 Q 280 760 500 795" fill="none" stroke={CAFE} strokeWidth={16} strokeLinecap="round" />
          {[[160, 930, 'uvas'], [380, 930, 'fresa'], [160, 1120, 'limon'], [380, 1120, 'naranja']].map(([fx, fy, t], i) => {
            const cae = corta * 30, hy = 790 + (fy - 790) * 0.3;
            return <g key={i}>
              {corta < 1 && <line x1={fx} y1={790} x2={fx} y2={fy - 80} stroke={KC.leaf} strokeWidth={8} opacity={1 - corta} />}
              <g transform={`translate(0 ${cae})`} opacity={1 - corta * 0.15}>
                {t === 'uvas' ? <Uvas x={fx} y={fy} s={0.62} /> : t === 'fresa' ? <Fresa x={fx} y={fy} s={0.85} /> : t === 'limon' ? <Citrico x={fx} y={fy} s={0.8} limon={true} /> : <Citrico x={fx} y={fy} s={0.85} />}
              </g>
            </g>; })}
          {corta > 0 && <g opacity={corta}><circle cx={270} cy={1030} r={50} fill="rgba(14,15,18,.75)" stroke={KC.texto} strokeWidth={5} />
            <rect x={250} y={1005} width={14} height={50} fill={KC.texto} /><rect x={276} y={1005} width={14} height={50} fill={KC.texto} /></g>}
          {/* derecha: siguen madurando */}
          <g opacity={kprog(T, T7 - 0.2, T7 + 0.3)}>
            <Platano x={720} y={930} s={0.7} mad={derMad} rot={-10} />
            <Aguacate x={930} y={950} s={0.7} mad={derMad * 0.85} />
            <Manzana x={800} y={1120} s={0.85} color={mixHex('#9bc23a', '#e5262f', derMad)} />
          </g>
        </Capa>
      </Escena>
      {/* 8 · Neljubov 1901: chícharos de lado por el gas de alumbrado */}
      <Escena T={T} a={K.N} b={K.Ga} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#c9b58e' }}></div>
        <Capa dy={-120}>
          <rect x={70} y={420} width={300} height={360} fill={mixHex('#3a3048', '#8fd8ff', ventana)} stroke={KC.ink} strokeWidth={10} />
          <line x1={220} y1={420} x2={220} y2={780} stroke={KC.ink} strokeWidth={8} /><line x1={70} y1={600} x2={370} y2={600} stroke={KC.ink} strokeWidth={8} />
          <rect x={940} y={940} width={20} height={240} fill="#5b5f6b" stroke={KC.ink} strokeWidth={6} />
          <path d="M 900 940 L 1000 940 L 980 860 L 920 860 Z" fill="rgba(255,240,180,.85)" stroke={KC.ink} strokeWidth={7} />
          <path d={`M 950 ${920 - Math.sin(T * 12) * 6} Q 935 895 950 875 Q 965 895 950 ${920 - Math.sin(T * 12) * 6} Z`} fill={KC.orange} />
          <Gas T={T} x0={900} y0={900} x1={520} y1={960} n={7} desde={K.N - 0.3} hasta={K.N + 3.8} vel={0.5} ancho={90} s={0.28} />
          <rect x={260} y={1100} width={600} height={110} rx={16} fill="#8a5a33" stroke={KC.ink} strokeWidth={9} />
          {[320, 420, 520, 620, 720].map((sx, i) => <Chicharo key={i} x={sx} y={1110} g={crece} lado={1 - recto} dir={1} />)}
          <rect x={260} y={1100} width={600} height={30} fill="#5b3a20" />
        </Capa>
      </Escena>
      {/* 9 · Gane 1934: el gas de muchas manzanas */}
      <Escena T={T} a={K.Ga} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.coral} />
        <Capa dy={-120}>
          {[[260, 1150], [380, 1150], [500, 1150], [320, 1050], [440, 1050], [380, 950], [200, 1170], [560, 1170]].map(([ax, ay], i) => <Manzana key={i} x={ax} y={ay} s={0.62} />)}
          <path d="M 470 900 Q 600 760 760 840" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
          <path d="M 470 900 Q 600 760 760 840" fill="none" stroke="#e8f6ff" strokeWidth={12} strokeLinecap="round" />
          <Gas T={T} x0={420} y0={930} x1={790} y1={1060} n={6} desde={K.Ga + 0.6} hasta={K.Cu} vel={0.5} ancho={40} s={0.24} />
          <VasoLab x={820} y={1200} s={1} liquido="rgba(200,230,255,.5)" nivel={0.85} ancho={220} alto={300} />
          <g opacity={kprog(T, K.Ga + 3.4, K.Ga + 3.8)}><MolEt x={820} y={1050} s={0.9} rot={Math.sin(T) * 10} /></g>
          <Marca x={960} y={880} ok={true} s={0.7} o={kprog(T, K.Ga + 3.8, K.Ga + 4.2)} />
        </Capa>
      </Escena>
      {/* 10 · cuartos de maduración con etileno */}
      <Escena T={T} a={K.Cu} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa dy={-110}>
          <rect x={260} y={760} width={780} height={470} fill="#dfe3ea" stroke={KC.ink} strokeWidth={10} />
          <rect x={260} y={760} width={780} height={470} fill={`rgba(255,225,26,${0.18 * llena})`} />
          <rect x={880} y={830} width={110} height={220} rx={50} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
          <text x={935} y={960} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>C₂H₄</text>
          <GasCaja T={T} x={290} y={790} w={580} h={300} n={14} f={llena} seed={21} s={0.28} />
          {[[460, 1130], [720, 1130], [590, 1020]].map(([cx, cy], i) => <Caja key={i} x={klerp(-200 - i * 140, cx, entra)} y={cy} mad={cuartoMad} s={0.95} />)}
          <rect x={60} y={1060} width={200} height={170} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
        </Capa>
      </Escena>
      {/* 11 · cierre: el mismo frutero, ya transformado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="45% 55%">
        <FondoLunares color={KC.yellow} />
        <Capa dy={-170}>
          <Frutero x={470} y={1120} s={1.15} />
          <Uvas x={720} y={1010} s={0.95} />
          <Aguacate x={520} y={980} s={0.95} mad={0.9} rot={8} />
          <Platano x={300} y={1040} s={1.1} mad={1} rot={-8 + Math.sin(T * 3) * 2} corona={kprog(T, K.Ci + 0.8, K.Ci + 1.3, kEase.rebote)} />
          <Gas T={T} x0={300} y0={960} x1={560} y1={860} n={9} desde={K.Ci - 0.3} hasta={FIN} vel={0.5} ancho={120} />
        </Capa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.8} texto="¿quieto?" x={270} y={560} tam={56} />
      <Chip T={T} at={K.G + 2.9} until={K.Q - 0.3} texto="suelta gas → madura al de al lado" y={1500} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.8} x={130} y={1480} texto="plátano maduro" lado="der" tam={34} />
      <Chip T={T} at={K.Q + 0.4} until={K.Q + 3.2} texto="etileno · C₂H₄" y={1500} tam={52} borde={KC.gold2} mono />
      <Chip T={T} at={K.Q + 3.4} until={K.H - 0.3} texto="la hormona vegetal más simple" y={1500} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Q + 1.0} until={K.Q + 3.2} x={800} y={700} texto="hidrógeno" lado="der" tam={30} />
      <Etq T={T} at={K.Q + 0.6} until={K.Q + 3.2} x={760} y={860} texto="carbono" lado="der" tam={30} />
      <Etq T={T} at={K.H + 0.6} until={K.Ca - 0.3} x={600} y={620} texto="receptor" lado="der" tam={34} color={KC.gold2} />
      <Chip T={T} at={K.H + 2.5} until={K.Ca - 0.3} texto="una hormona en el aire" y={1500} tam={42} borde={KC.mint} />
      <Etq T={T} at={K.Ca + 0.4} until={K.B - 0.3} x={30} y={780} texto="1 · respira más" lado="der" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.2} until={K.B - 0.3} x={30} y={880} texto="2 · cambia de color" lado="der" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.0} until={K.B - 0.3} x={1050} y={1110} texto="3 · se ablanda" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.9} until={K.B - 0.3} texto="4 · más etileno → más etileno" y={1500} tam={40} borde={KC.gold2} />
      <Etq T={T} at={K.B + 0.5} until={K.P - 0.3} x={120} y={1100} texto="solo: duro" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 0.3} until={K.P - 0.3} texto="bolsa de papel + manzana madura" y={1500} tam={38} borde={PAPEL} />
      <Etq T={T} at={K.B + 1.0} until={K.B + 3.3} x={470} y={550} texto="time-lapse" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ti + 0.3} until={K.N - 0.3} texto="en la planta" x={270} y={1480} tam={38} borde={KC.leaf} />
      <Chip T={T} at={T7} until={K.N - 0.3} texto="siguen" x={820} y={1480} tam={38} borde={KC.gold2} />
      <Etq T={T} at={K.Ti + 3.0} until={K.N - 0.3} x={60} y={1600} texto="cortadas: casi no maduran" lado="der" tam={28} />
      <Etq T={T} at={T7 + 0.8} until={K.N - 0.3} x={1020} y={1600} texto="climatéricas" lado="izq" tam={28} />
      <TarjetaEstudio T={T} at={K.N + 0.2} until={K.N + 3.0} anio="1901" quien="D. Neljubov · San Petersburgo" revista="plántulas de chícharo y gas de alumbrado" y={1600} />
      <Etq T={T} at={K.N + 3.1} until={K.Ga - 0.3} x={900} y={1060} texto="Pisum sativum" it lado="izq" tam={30} />
      <Chip T={T} at={K.N + 3.2} until={K.N + 4.6} texto="C₂H₄ del gas de alumbrado" y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.N + 4.7} until={K.Ga - 0.3} texto="aire de afuera: crecen derechos" y={1500} tam={36} borde="#8fd8ff" />
      <TarjetaEstudio T={T} at={K.Ga + 0.2} until={K.Ga + 3.0} anio="1934" quien="R. Gane · Cambridge, Inglaterra" revista="Nature 134:1008" y={1600} />
      <Chip T={T} at={K.Ga + 3.4} until={K.Cu - 0.3} texto="la fruta fabrica etileno" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Cu + 0.3} until={K.Cu + 2.6} texto="exportación: se cortan verdes" y={1500} tam={40} borde={VERDE} />
      <Chip T={T} at={K.Cu + 2.8} until={K.Ci - 0.3} texto="cuarto de maduración + etileno" y={1500} tam={38} borde={KC.yellow} />
      <Etq T={T} at={K.Cu + 3.4} until={K.Ci - 0.3} x={60} y={1620} texto="EFSA, 2021 · plátano importado a la UE" lado="der" tam={26} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="el etileno manda en tu frutero" y={1500} tam={40} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Suelta *un gas que madura.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.H - 0.1} texto="Se llama *etileno.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Ca - 0.1} texto="La recibe *como orden: madura.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.B - 0.1} texto="Y suelta *más etileno.*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.P - 0.1} texto="Bolsa de papel *+ manzana.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ti - 0.1} texto="¿Y tus *uvas?*" />
      <Subtitulo T={T} idx={6} at={K.Ti + 0.1} until={T7 - 0.1} texto="Uvas, fresas, cítricos: *en la planta.*" />
      <Subtitulo T={T} idx={7} at={T7 + 0.1} until={K.N - 0.1} texto="Plátano y aguacate: *sí siguen.*" />
      <Subtitulo T={T} idx={8} at={K.N + 0.1} until={K.Ga - 0.1} texto="1901: *chícharos de lado.*" />
      <Subtitulo T={T} idx={9} at={K.Ga + 0.1} until={K.Cu - 0.1} texto="1934: *la fruta lo fabrica.*" />
      <Subtitulo T={T} idx={10} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="Cuartos *con etileno.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El *jefe de tu frutero.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Hormona - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cadena + 0.5, CUES.Bolsa - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Tipos + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Tipos + 3.4, CUES.Neljubov - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Neljubov + 1.4, CUES.Gane - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Gane + 1.4, CUES.Cuarto - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cuarto + 0.5, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="46" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlatanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Platanos /></CompositionStage></div>;
}
window.PlatanoApp = PlatanoApp;
