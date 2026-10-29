// Shot Químico #18 · Esa sal no calienta el hielo: lo obliga a robarle calor a tu helado — NARRADO (N5 experimento con termómetro + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const HIELO = '#dff4ff', HIELO2 = '#a9dcf5', SALMUERA = '#7fc8ff', CREMA = '#ffe3c2', CALOR = '#ff8a1f', NA = '#b18cff', CL = '#b6e33a', LATA = '#c9ced8';

// ---------- piezas ----------
// Granos de sal que caen de (x, y0) a y1 entre t0 y t1.
function LluviaSal({ T, x, y0, y1, t0, t1, w = 120, n = 40, seed = 3 }) {
  if (T < t0 || T > t1 + 0.8) return null;
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const dx = (R() - 0.5) * w, ts = t0 + R() * (t1 - t0), u = (T - ts) / 0.7;
    if (u < 0 || u > 1) return null;
    const yy = klerp(y0, y1, u * u), xx = x + dx * (0.3 + u);
    return <rect key={i} x={xx - 6} y={yy - 6} width={12} height={12} rx={2} fill="#fff" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${i * 37} ${xx} ${yy})`} />; })}</g>;
}
// Salero que se sacude (x, y = centro).
function Salero({ T, x, y, s = 1, rot = 150 }) {
  const sac = Math.sin(T * 22) * 6;
  return <g transform={`translate(${x} ${y + sac}) rotate(${rot}) scale(${s})`}>
    <path d="M -55 -90 L 55 -90 L 70 90 L -70 90 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-58} y={-130} width={116} height={44} rx={14} fill={LATA} stroke={KC.ink} strokeWidth={8} />
    {[-28, 0, 28].map((dx) => <circle key={dx} cx={dx} cy={-108} r={6} fill={KC.ink} />)}
    <text x={0} y={22} textAnchor="middle" transform={`rotate(${180} 0 0)`} style={{ font:`400 60px ${KF.titulo}` }} fill={KC.blue}>SAL</text>
  </g>;
}
// Hielo picado (trozos) dentro de un rectángulo.
function HieloPicado({ x, y, w, h, seed = 4, n = 26, f = 1 }) {
  const R = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const cx = x + R() * w, cy = y + R() * h, r = 22 + R() * 22, a = R() * 90;
    if (i / n > f) return null;
    return <rect key={i} x={cx - r} y={cy - r * 0.8} width={r * 2} height={r * 1.6} rx={10} fill={HIELO} stroke="#5aa8d0" strokeWidth={4} transform={`rotate(${a} ${cx} ${cy})`} />; })}</g>;
}
// Cubeta de madera con hielo y sal, y el bote metálico de la crema en medio. tapa: 0..1 (1 = destapado y el helado sale).
function CubetaHelado({ T, x, y, s = 1, sal = 0, helado = 0, destapa = 0, flecha = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -170 L 300 -170 L 250 260 L -250 260 Z" fill="#c98a4b" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[-180, -60, 60, 180].map((dx) => <line key={dx} x1={dx} y1={-170} x2={dx * 0.84} y2={260} stroke="#8a5a2b" strokeWidth={6} />)}
    <rect x={-310} y={-80} width={620} height={26} fill="#6d6f78" stroke={KC.ink} strokeWidth={6} />
    <rect x={-275} y={160} width={550} height={24} fill="#6d6f78" stroke={KC.ink} strokeWidth={6} />
    <HieloPicado x={-270} y={-200} w={130} h={90} seed={4} n={7} />
    <HieloPicado x={140} y={-200} w={130} h={90} seed={9} n={7} />
    {sal > 0 && Array.from({ length: 30 }, (_, i) => { const R = krng(40 + i); const sx = (R() < 0.5 ? -270 + R() * 130 : 140 + R() * 130), sy = -205 + R() * 60;
      return i / 30 < sal ? <rect key={i} x={sx} y={sy} width={10} height={10} fill="#fff" stroke={KC.ink} strokeWidth={2} /> : null; })}
    {/* bote metálico */}
    <rect x={-120} y={-260} width={240} height={420} rx={14} fill={LATA} stroke={KC.ink} strokeWidth={9} />
    <rect x={-100} y={-240} width={30} height={380} rx={10} fill="#fff" opacity={0.45} />
    {helado > 0 && <g opacity={helado}>{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-80 + (i % 3) * 70} ${-150 + Math.floor(i / 3) * 90} l 14 -14 l 14 14 l -14 14 Z`} fill="#fff" stroke="#9fc9e6" strokeWidth={3} />)}</g>}
    <g transform={`translate(0 ${-260 - destapa * 150}) rotate(${-destapa * 18})`}>
      <rect x={-135} y={-30} width={270} height={34} rx={10} fill="#9aa1ad" stroke={KC.ink} strokeWidth={8} />
      <rect x={-20} y={-80} width={40} height={52} rx={8} fill="#9aa1ad" stroke={KC.ink} strokeWidth={7} />
    </g>
    {destapa > 0 && <g transform={`translate(0 ${-262 - destapa * 40})`} opacity={kclamp(destapa * 2, 0, 1)}>
      <path d="M -110 10 Q -120 -70 -40 -80 Q 0 -130 50 -80 Q 125 -70 110 10 Z" fill={CREMA} stroke={KC.ink} strokeWidth={8} />
      <circle cx={-40} cy={-40} r={8} fill="#7a4a22" /><circle cx={30} cy={-60} r={7} fill="#7a4a22" /><circle cx={60} cy={-20} r={6} fill="#7a4a22" />
      <g transform="translate(70 -70) rotate(35)"><rect x={-14} y={-150} width={28} height={130} rx={10} fill={LATA} stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={-10} rx={34} ry={26} fill={LATA} stroke={KC.ink} strokeWidth={6} /></g>
    </g>}
    {flecha > 0 && <g opacity={flecha}>
      <path d={`M 110 -60 Q 190 -120 ${110 + 150 * flecha} -10`} fill="none" stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
      <path d={`M ${110 + 150 * flecha - 30} -40 L ${110 + 150 * flecha + 6} 0 L ${110 + 150 * flecha - 46} 4 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <path d={`M -110 -60 Q -190 -120 ${-110 - 150 * flecha} -10`} fill="none" stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
      <path d={`M ${-110 - 150 * flecha + 30} -40 L ${-110 - 150 * flecha - 6} 0 L ${-110 - 150 * flecha + 46} 4 Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    </g>}
  </g>;
}
// Termómetro vertical. x = centro, y = parte de arriba del tubo, h = largo del tubo. temp en °C (o en la unidad que digan las marcas).
function Termo({ x, y, h = 600, tmin = -25, tmax = 10, temp = 0, paso = 5, marcas = true, ancho = 46, color = KC.red, unidad = '°', antiguo = false, marcaTxt }) {
  const yT = (t) => y + h - 40 - ((t - tmin) / (tmax - tmin)) * (h - 80);
  const yc = yT(kclamp(temp, tmin, tmax));
  const tubo = antiguo ? '#f3ead2' : '#ffffff';
  return <g>
    <rect x={x - ancho / 2} y={y} width={ancho} height={h} rx={ancho / 2} fill={tubo} stroke={KC.ink} strokeWidth={8} />
    <rect x={x - ancho / 4} y={yc} width={ancho / 2} height={y + h - yc} fill={color} />
    <circle cx={x} cy={y + h + 26} r={ancho * 0.95} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={x - ancho / 4} y={y + h - 30} width={ancho / 2} height={50} fill={color} />
    {marcas && Array.from({ length: Math.floor((tmax - tmin) / paso) + 1 }, (_, i) => { const t = tmin + i * paso, yy = yT(t);
      return <g key={i}><line x1={x + ancho / 2} x2={x + ancho / 2 + (t === 0 ? 40 : 24)} y1={yy} y2={yy} stroke={KC.ink} strokeWidth={t === 0 ? 7 : 5} />
        <text x={x + ancho / 2 + 50} y={yy + 11} style={{ font:`700 ${t === 0 ? 34 : 28}px ${KF.mono}` }} fill={KC.ink}>{t}{unidad}</text></g>; })}
    {marcaTxt && <g><line x1={x - ancho / 2 - 30} x2={x - ancho / 2} y1={yc} y2={yc} stroke={KC.ink} strokeWidth={6} />
      <text x={x - ancho / 2 - 40} y={yc + 12} textAnchor="end" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{marcaTxt}</text></g>}
  </g>;
}
// Lectura grande de temperatura.
function Lectura({ x, y, temp, dec = 0, tam = 130, color = KC.white, sufijo = ' °C' }) {
  const v = Number(temp.toFixed(dec)); const txt = (v < 0 ? '−' : '') + kformato(Math.abs(v), dec) + sufijo;
  return <text x={x} y={y} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={tam / 14} paintOrder="stroke">{txt}</text>;
}
// Vaso con hielo y agua (y sal disuelta si sal > 0).
function VasoHielo({ T, x, y, s = 1, sal = 0, seed = 5 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-300} width={300} height={300} rx={14} fill={mixHex('#bfe6ff', '#8fd0ff', sal)} opacity={0.85} />
    <HieloPicado x={-130} y={-290} w={240} h={230} seed={seed} n={9} />
    <path d="M -165 -380 L -150 -370 L -150 -12 Q -150 0 -138 0 L 138 0 Q 150 0 150 -12 L 150 -380" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
// Molécula de agua chiquita (para la red del hielo).
function AguaMini({ x, y, s = 1, rot = 0, o = 1 }) { return <Mol tipo="agua" x={x} y={y} s={s} rot={rot} o={o} />; }
function Ion({ x, y, r = 30, carga = '+', color = NA, txt = 'Na⁺' }) {
  return <g><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={x} y={y + 10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{txt}</text></g>;
}
// Congelador de casa (refri con puerta del congelador abierta).
function Congelador({ x, y, s = 1, temp = -18 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-260} width={300} height={520} rx={26} fill="#f4f6fb" stroke={KC.ink} strokeWidth={10} />
    <line x1={-150} x2={150} y1={-60} y2={-60} stroke={KC.ink} strokeWidth={8} />
    <rect x={-130} y={-240} width={260} height={160} rx={12} fill="#cfeaff" stroke={KC.ink} strokeWidth={6} />
    {[[-80, -170], [0, -150], [70, -180]].map(([dx, dy], i) => <rect key={i} x={dx - 30} y={dy - 24} width={60} height={48} rx={6} fill={['#ff6b5a', '#ffe11a', '#2fe0a8'][i]} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={110} y={-30} width={16} height={120} rx={8} fill={LATA} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-290} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>congelador</text>
  </g>;
}
// Frasco con agua y n cucharadas de sal + su mini termómetro.
function FrascoSal({ x, y, n, temp }) {
  return <g>
    <rect x={x - 70} y={y - 200} width={140} height={200} rx={16} fill={mixHex('#d6f0ff', '#79c2f2', n / 4)} stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 76} y={y - 226} width={152} height={30} rx={8} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => <rect key={i} x={x - 50 + i * 26} y={y - 30} width={14} height={14} fill="#fff" stroke={KC.ink} strokeWidth={2} />)}
    <text x={x} y={y + 50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{n} cda.</text>
    <Termo x={x} y={y - 500} h={250} tmin={-20} tmax={5} temp={temp} marcas={false} ancho={30} />
  </g>;
}
// Camión que esparce sal.
function Camion({ x, y, s = 1, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-220} y={-150} width={260} height={130} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={40} y={-120} width={120} height={100} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    <rect x={80} y={-105} width={60} height={40} rx={6} fill="#bfe8ff" stroke={KC.ink} strokeWidth={5} />
    {[-150, 0, 110].map((dx) => <g key={dx} transform={`translate(${dx} -10) rotate(${T * 400})`}><circle r={36} fill={KC.ink} /><circle r={14} fill={LATA} /><line x1={-14} x2={14} stroke={KC.ink} strokeWidth={4} /></g>)}
    <path d="M -220 -60 l -40 30 l 0 20 l 40 0 Z" fill={LATA} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function Helado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Te: CUES.Termometro, Sa: CUES.Sal, Ca: CUES.Calor, Cr: CUES.Crema, Pr: CUES.Pregunta, Li: CUES.Limite, Es: CUES.Estudio, Car: CUES.Carretera, Fa: CUES.Fahrenheit, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // 1 · termómetro: 0 °C y luego baja al echar sal
  const salTe = K.Te + 2.4;
  const tempTe = T < salTe + 0.4 ? 0 + Math.sin(T * 3) * 0.1 : -9 * kprog(T, salTe + 0.4, K.Sa + 0.3, kEase.suave);
  // 6 · límite
  const tempLi = klerp(-9, -21, kprog(T, K.Pr, K.Li + 1.6, kEase.sale));
  const congOn = kprog(T, K.Li + 2.4, K.Li + 2.9, kEase.sale);
  // 7 · Blagden: frascos
  const fr = (i) => -4.5 * (i + 1) * kprog(T, K.Es + 3.4 + i * 0.6, K.Es + 4.0 + i * 0.6, kEase.sale);
  // 8 · carretera
  const camX = klerp(1300, -300, kprog(T, K.Car + 0.2, K.Car + 3.0));
  const derrite = kprog(T, K.Car + 1.2, K.Car + 2.6);
  const frio = kprog(T, K.Car + 3.0, K.Car + 4.0, kEase.suave);
  const tempCar = klerp(-3, -9, frio);
  // 9 · Fahrenheit
  const tempFa = klerp(60, 0, kprog(T, K.Fa + 2.6, K.Fa + 4.6, kEase.suave));
  // 2 · red del hielo (moléculas)
  const red = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) red.push([140 + c * 88 + (r % 2) * 44, 760 + r * 82, r * 4 + c]);
  const Rq = krng(11);
  const libres = Array.from({ length: 9 }, () => [600 + Rq() * 380, 760 + Rq() * 420, Rq() * 6.28]);
  const iones = [[640, 820, '+'], [880, 900, '-'], [720, 1060, '-'], [930, 1120, '+'], [820, 760, '+'], [600, 1150, '-']];
  // 3 · chispas de calor
  const chispas = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la sal sobre el hielo de la cubeta */}
      <Escena T={T} a={K.G} b={K.Te} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <CubetaHelado T={T} x={480} y={960} s={1} sal={kprog(T, K.G + 0.2, K.G + 2.4)} flecha={kprog(T, K.G + 2.6, K.G + 3.4, kEase.sale)} />
          <Salero T={T} x={kprog(T, K.G, K.G + 2.4) < 1 ? klerp(250, 690, kprog(T, K.G, K.G + 2.4, kEase.suave)) : 690} y={560} s={0.8} rot={150} />
          <LluviaSal T={T} x={klerp(270, 690, kprog(T, K.G, K.G + 2.4, kEase.suave))} y0={640} y1={770} t0={K.G} t1={K.G + 2.6} n={60} />
        </SvgCapa>
      </Escena>
      {/* 1 · termómetro en vivo */}
      <Escena T={T} a={K.Te} b={K.Sa} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <VasoHielo T={T} x={400} y={1200} s={1} sal={kprog(T, salTe, salTe + 1)} />
          <Salero T={T} x={470} y={700} s={0.6} rot={kprog(T, salTe - 0.4, salTe) > 0 && T < salTe + 1.6 ? 150 : 200} />
          <LluviaSal T={T} x={440} y0={770} y1={980} t0={salTe} t1={salTe + 1.4} n={34} w={160} seed={8} />
          <Termo x={820} y={560} h={640} tmin={-25} tmax={10} temp={tempTe} />
          <Lectura x={400} y={780} temp={tempTe} tam={140} color={tempTe < -0.5 ? '#bfe8ff' : KC.white} />
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: la sal le estorba a la red del hielo */}
      <Escena T={T} a={K.Sa} b={K.Ca} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa><g transform="translate(0 50)">
          <rect x={90} y={720} width={420} height={520} rx={20} fill="rgba(169,220,245,.14)" stroke={HIELO2} strokeWidth={4} strokeDasharray="14 10" />
          {red.map(([x, y, k], i) => { const sale = (i % 4 === 3) ? kprog(T, K.Sa + 2.2 + (i / 4) * 0.45, K.Sa + 3.4 + (i / 4) * 0.45, kEase.suave) : 0;
            return <AguaMini key={i} x={x + sale * (160 + (i % 3) * 40)} y={y + sale * Math.sin(T * 2 + i) * 40} s={0.62} rot={sale * 200 + (sale ? T * 40 : 0)} />; })}
          {libres.map(([x, y, p], i) => { const ch = (T * 0.9 + p) % 2; const xx = x - 60 * Math.sin(Math.PI * Math.min(1, ch)); return <AguaMini key={i} x={xx} y={y + Math.sin(T * 1.5 + p) * 20} s={0.55} rot={T * 50 + p * 60} />; })}
          {iones.map(([x, y, c], i) => { const on = kprog(T, K.Sa + 0.3 + i * 0.15, K.Sa + 0.7 + i * 0.15, kEase.rebote);
            return on > 0 ? <g key={i} transform={`translate(${x + Math.sin(T * 2 + i) * 14} ${y + Math.cos(T * 1.7 + i) * 14}) scale(${on})`}><Ion x={0} y={0} r={c === '+' ? 30 : 38} color={c === '+' ? NA : CL} txt={c === '+' ? 'Na⁺' : 'Cl⁻'} /></g> : null; })}
          <text x={300} y={700} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={HIELO2}>hielo</text>
          <text x={790} y={700} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={SALMUERA}>agua con sal</text>
        </g></SvgCapa>
      </Escena>
      {/* 3 · el calor sale de la crema */}
      <Escena T={T} a={K.Ca} b={K.Cr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={650} width={470} height={620} fill={CREMA} />
          <rect x={470} y={650} width={60} height={620} fill={LATA} stroke={KC.ink} strokeWidth={8} />
          <rect x={530} y={650} width={550} height={620} fill="#3f86b8" />
          <HieloPicado x={580} y={680} w={420} h={520} seed={12} n={Math.round(klerp(12, 6, kprog(T, K.Ca, K.Cr)))} />
          {chispas.map((i) => { const t0 = K.Ca + 0.6 + i * 0.3, u = kprog(T, t0, t0 + 1.6, kEase.suave); if (u <= 0 || u >= 1) return null;
            const yy = 720 + ((i * 97) % 480), xx = klerp(160, 860, u);
            return <g key={i} transform={`translate(${xx} ${yy + Math.sin(T * 8 + i) * 10})`}><path d="M 0 -22 L 8 -6 L 24 0 L 8 6 L 0 22 L -8 6 L -24 0 L -8 -6 Z" fill={CALOR} stroke={KC.ink} strokeWidth={3} /></g>; })}
          <rect x={95} y={1130} width={280} height={64} rx={14} fill="rgba(14,15,18,.8)" /><text x={235} y={1175} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={CREMA}>tu crema</text>
          <text x={500} y={1310} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={LATA}>bote</text>
          <rect x={655} y={1130} width={300} height={64} rx={14} fill="rgba(14,15,18,.8)" /><text x={805} y={1175} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={HIELO}>hielo + sal</text>
        </SvgCapa>
      </Escena>
      {/* 4 · la crema: con puro hielo no, con sal sí */}
      <Escena T={T} a={K.Cr} b={K.Pr} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g><CubetaHelado T={T} x={290} y={1020} s={0.62} helado={0} /><Termo x={110} y={700} h={300} tmin={-15} tmax={5} temp={0} marcas={false} ancho={30} />
            <Lectura x={290} y={760} temp={0} tam={80} /><Marca x={290} y={1260} ok={false} s={0.7} o={kprog(T, K.Cr + 2.6, K.Cr + 3.0)} />
            <text x={290} y={1380} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>solo hielo</text></g>
          <g><CubetaHelado T={T} x={800} y={1020} s={0.62} sal={1} helado={kprog(T, K.Cr + 3.2, K.Cr + 4.6)} /><Termo x={990} y={700} h={300} tmin={-15} tmax={5} temp={-10 * kprog(T, K.Cr + 3.0, K.Cr + 4.0)} marcas={false} ancho={30} />
            <text x={800} y={760} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">bajo 0 °C</text>
            <Marca x={800} y={1260} ok s={0.7} o={kprog(T, K.Cr + 4.2, K.Cr + 4.6)} />
            <text x={800} y={1380} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>hielo + sal</text></g>
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Li} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Termo x={200} y={420} h={820} tmin={-25} tmax={10} temp={tempLi} />
          <text x={400} y={1140} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 400 940)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · límite: −21 °C contra el congelador de −18 °C */}
      <Escena T={T} a={K.Li} b={K.Es} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Termo x={440} y={430} h={820} tmin={-25} tmax={10} temp={tempLi} marcaTxt={T > K.Li + 1.6 ? '−21 °C' : null} />
          <g opacity={congOn} transform={`translate(${(1 - congOn) * 300} 0)`}><Congelador x={830} y={900} s={0.75} />
            <Termo x={830} y={980} h={240} tmin={-25} tmax={10} temp={-18} marcas={false} ancho={28} color={KC.blue} />
            <Lectura x={830} y={1330} temp={-18} tam={90} color={KC.white} /></g>
        </SvgCapa>
      </Escena>
      {/* 7 · Blagden, 1788: más sal, más baja */}
      <Escena T={T} a={K.Es} b={K.Car} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {[0, 1, 2, 3].map((i) => <FrascoSal key={i} x={180 + i * 240} y={1200} n={i + 1} temp={fr(i)} />)}
          {T > K.Es + 6.0 && <path d={`M 180 ${1200 - 500 + 250 - 40 - ((fr(0) + 20) / 25) * 170} L 900 ${1200 - 500 + 250 - 40 - ((fr(3) + 20) / 25) * 170}`} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" opacity={kprog(T, K.Es + 6.0, K.Es + 6.5)} />}
        </SvgCapa>
      </Escena>
      {/* 8 · carretera con hielo */}
      <Escena T={T} a={K.Car} b={K.Fa} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#bfe8ff, #eaf6ff 45%, #dfe8ef 45%)' }}></div>
        <SvgCapa>
          <path d="M 0 1260 L 1080 1260 L 1080 860 L 0 860 Z" fill="#4a4f5a" stroke={KC.ink} strokeWidth={8} />
          {[80, 380, 680, 980].map((x) => <rect key={x} x={x} y={1052} width={140} height={16} fill={KC.yellow} />)}
          {[[200, 960], [560, 1150], [860, 990], [380, 1060]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={150} ry={44} fill={mixHex('#e8f8ff', '#2f4d66', T < K.Car + 3.0 ? derrite : 1)} opacity={0.95} stroke={mixHex('#9fd0ee', '#1f3346', derrite)} strokeWidth={5} />)}
          {T > K.Car + 3.0 && [[220, 940], [540, 1130], [880, 975]].map(([x, y], i) => <ellipse key={'n' + i} cx={x} cy={y} rx={130} ry={40} fill="#e8f8ff" opacity={frio} stroke="#9fd0ee" strokeWidth={5} />)}
          {T > K.Car + 3.4 && Array.from({ length: 18 }, (_, i) => <rect key={i} x={160 + (i * 53) % 760} y={930 + (i * 71) % 220} width={12} height={12} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={frio} />)}
          <LluviaSal T={T} x={camX - 240} y0={900} y1={1000} t0={K.Car + 0.2} t1={K.Car + 3.0} n={50} w={80} seed={21} />
          <Camion T={T} x={camX} y={900} s={0.9} />
          <g opacity={kprog(T, K.Car + 2.8, K.Car + 3.2)}><Termo x={920} y={420} h={380} tmin={-15} tmax={5} temp={tempCar} marcas={false} ancho={32} />
            <Lectura x={720} y={600} temp={tempCar} tam={100} /></g>
        </SvgCapa>
      </Escena>
      {/* 9 · Fahrenheit, 1724: el cero salió de hielo, agua y sal */}
      <Escena T={T} a={K.Fa} b={K.Ci} zoom={0.03}>
        <FondoLunares color="#e9d9b0" punto="rgba(255,255,255,.28)" />
        <SvgCapa>
          <VasoHielo T={T} x={400} y={1200} s={1.15} sal={1} seed={14} />
          <Termo x={560} y={560} h={560} tmin={0} tmax={100} paso={32} temp={tempFa} unidad=" °F" antiguo marcas={false} />
          <text x={620} y={1080} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Fa + 4.4, K.Fa + 4.8)}>← 0 °F</text>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la cubeta del inicio, ya con helado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><CubetaHelado T={T} x={480} y={960} s={1} sal={1} helado={1} destapa={kprog(T, K.Ci + 0.6, K.Ci + 1.8, kEase.sale)} flecha={kprog(T, K.Ci + 1.8, K.Ci + 2.5, kEase.sale)} /></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.Te - 0.3} texto="¿la sal calienta?" x={300} y={470} tam={44} />
      <Etq T={T} at={K.G + 3.0} until={K.Te - 0.3} x={30} y={700} texto="calor" lado="der" tam={40} color={KC.red} />
      <Chip T={T} at={K.Te + 0.4} until={salTe} texto="hielo + agua = 0 °C" x={540} y={1500} tam={44} borde={KC.blue} />
      <Chip T={T} at={salTe + 0.5} until={K.Sa - 0.3} texto="+ sal → baja" x={540} y={1500} tam={46} borde={KC.red} />
      <Chip T={T} at={K.Sa + 1.0} until={K.Ca - 0.3} texto="punto de congelación ↓" x={540} y={1500} tam={42} borde={NA} />
      <Etq T={T} at={K.Sa + 0.8} until={K.Ca - 0.3} x={560} y={1620} texto="iones de sal: Na⁺ y Cl⁻" tam={32} color={CL} />
      <Chip T={T} at={K.Ca + 1.6} until={K.Cr - 0.3} texto="derretir hielo: 6 kJ por mol" x={540} y={1500} tam={40} borde={CALOR} />
      <Etq T={T} at={K.Ca + 0.8} until={K.Cr - 0.3} x={300} y={1620} texto="calor →" tam={40} color={CALOR} />
      <Chip T={T} at={K.Cr + 0.5} until={K.Pr - 0.3} texto="la crema se congela bajo 0 °C" x={540} y={1500} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Li + 1.6} until={K.Es - 0.3} texto="límite: agua + sal" x={540} y={1500} tam={44} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="1788" quien="Charles Blagden" revista="Real Sociedad de Londres · Phil. Trans." x={540} y={640} />
      <Chip T={T} at={K.Es + 6.0} until={K.Car - 0.3} texto="casi en proporción" x={540} y={1500} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Car + 0.6} until={K.Car + 2.8} texto="sal en carreteras con hielo" x={540} y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.Car + 3.6} until={K.Fa - 0.3} texto="abajo de −9 °C: casi no derrite" x={540} y={1500} tam={36} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Fa + 0.2} until={K.Fa + 2.5} anio="1724" quien="Fahrenheit lo publica" revista="Phil. Trans. · hielo + agua + sal = 0 °F" x={540} y={640} />
      <Chip T={T} at={K.Fa + 4.8} until={K.Ci - 0.3} texto="0 °F ≈ −18 °C" x={540} y={1500} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.Ci + 2.4} until={K.Ou} x={1050} y={370} lado="izq" texto="calor: crema → hielo" tam={36} color={KC.red} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="la sal no calienta: el hielo roba calor" x={540} y={1500} tam={32} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Te - 0.1} texto="Le *roba el calor* a tu helado." />
      <Subtitulo T={T} idx={1} at={K.Te + 0.1} until={K.Sa - 0.1} texto="Cero grados… *y baja.*" />
      <Subtitulo T={T} idx={2} at={K.Sa + 0.1} until={K.Ca - 0.1} texto="Se congela *bajo cero.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Cr - 0.1} texto="Derretir hielo *cuesta calor.*" />
      <Subtitulo T={T} idx={4} at={K.Cr + 0.1} until={K.Pr - 0.1} texto="Con puro hielo *no alcanza.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Li - 0.1} texto="¿Hasta dónde *puede bajar?*" />
      <Subtitulo T={T} idx={6} at={K.Li + 0.1} until={K.Es - 0.1} texto="Hasta *menos 21 grados.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Car - 0.1} texto="Más sal, *más baja.*" />
      <Subtitulo T={T} idx={8} at={K.Car + 0.1} until={K.Fa - 0.1} texto="Bajo −9 °C *casi no derrite.*" />
      <Subtitulo T={T} idx={9} at={K.Fa + 0.1} until={K.Ci - 0.1} texto="El *cero Fahrenheit:* hielo y sal." />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La sal *no calienta nada.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Termometro + 1.0, CUES.Sal - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Sal + 1.5, CUES.Calor - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Calor + 1.0, CUES.Crema - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Crema + 1.0, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Limite + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Limite + 2.0, CUES.Estudio - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Estudio + 3.6, CUES.Carretera - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Carretera + 3.4, CUES.Fahrenheit - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Fahrenheit + 2.8, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="18" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HeladoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Helado /></CompositionStage></div>;
}
window.HeladoApp = HeladoApp;
