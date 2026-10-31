// Shot Ambiental #51 · Esto no es nieve: es espuma del río Santiago (El Salto y Juanacatlán) — NARRADO (N1 "Por dentro").
// Datos: CNDH Recomendación 134/2022 (IMTA 2011, inspección 2021), CIDH Res. 7/2020, Gobierno de Jalisco (Revivamos el Río Santiago).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático; no aparece ninguna empresa.

const RS_AGUA = '#2f8fd8', RS_SUCIA = '#7a6a3a', RS_ESPUMA = '#fbfaf4';

// ---------- mapa (Jalisco–Nayarit, esquemático) ----------
const RS_MS = 9.45, RS_X0 = -2610, RS_Y0 = -2101;
function rsP(lon, lat) { const [a, b] = mxProy(lon, lat); return [RS_X0 + a * RS_MS, RS_Y0 + b * RS_MS]; }
const RS_RIO = [[-102.77,20.36],[-102.93,20.39],[-103.1,20.47],[-103.18,20.52],[-103.22,20.62],[-103.2,20.8],[-103.3,20.95],[-103.55,21.1],[-103.9,21.2],[-104.3,21.3],[-104.65,21.45],[-105.0,21.55],[-105.3,21.62],[-105.62,21.62]].map(([a, b]) => rsP(a, b));
const RS_RIO_LARGO = RS_RIO.reduce((s, p, i) => i ? s + Math.hypot(p[0] - RS_RIO[i - 1][0], p[1] - RS_RIO[i - 1][1]) : 0, 0);
function MapaRio({ T, traza = 1, salto = 0 }) {
  const d = 'M ' + RS_RIO.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const [lx, ly] = rsP(-103.05, 20.22), [gx, gy] = rsP(-103.35, 20.67), [sx, sy] = rsP(-103.18, 20.52);
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill="#7fd0f5" />
    {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${40 + (i % 3) * 60} ${520 + i * 90} q 20 -10 40 0 t 40 0`} stroke="#d4f1ff" strokeWidth={5} fill="none" opacity={0.6 + 0.3 * Math.sin(T * 2 + i)} />)}
    <MapaMexico x={RS_X0} y={RS_Y0} ancho={1000 * RS_MS} color="#ffe9a8" conCA={false} />
    <text x={60} y={1420} style={{ font:`700 34px ${KF.mono}` }} fill="#0b4d73">Océano Pacífico</text>
    <path d={d} stroke={RS_AGUA} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={RS_RIO_LARGO} strokeDashoffset={RS_RIO_LARGO * (1 - traza)} />
    <path d={d} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={RS_RIO_LARGO} strokeDashoffset={RS_RIO_LARGO * (1 - traza)} opacity={0.35} />
    <ellipse cx={lx} cy={ly} rx={85} ry={30} fill={RS_AGUA} stroke={KC.ink} strokeWidth={6} />
    <circle cx={gx} cy={gy} r={12} fill={KC.ink} />
    <text x={gx - 20} y={gy - 18} textAnchor="end" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>Guadalajara</text>
    {salto > 0 && <g opacity={salto}><circle cx={sx} cy={sy} r={22 + 6 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={7} /><circle cx={sx} cy={sy} r={8} fill={KC.red} /></g>}
  </g>;
}

// ---------- copos de espuma ("nieve") ----------
function Copos({ T, n = 70, seed = 11, y0 = -40, y1 = 1300, vel = 120, o = 1 }) {
  const r = krng(seed);
  const cs = Array.from({ length: n }, () => ({ x: r() * KW, f: r(), s: 6 + r() * 16, v: 0.6 + r() * 0.8, w: r() * 6 }));
  return <g opacity={o}>{cs.map((c, i) => { const h = y1 - y0, y = y0 + (((T * vel * c.v) + c.f * h) % h), x = c.x + Math.sin(T * 1.3 + c.w) * 24;
    return <circle key={i} cx={x} cy={y} r={c.s} fill={RS_ESPUMA} stroke="rgba(0,0,0,.25)" strokeWidth={2} />; })}</g>;
}

// ---------- la cascada (esquemática). espuma 0..1, sucia 0..1, lavadora 0..1 ----------
function Cascada({ T, espuma = 1, sucia = 1, lavadora = 0, y = 760 }) {
  const agua = mixHex(RS_AGUA, RS_SUCIA, sucia);
  const r = krng(5);
  const bolas = Array.from({ length: 46 }, () => ({ x: 90 + r() * 900, y: r() * 120, s: 30 + r() * 50, f: r() * 6 }));
  return <g>
    {/* cerros y cielo bajo */}
    <path d={`M 0 ${y - 160} Q 200 ${y - 260} 420 ${y - 170} Q 640 ${y - 280} 860 ${y - 180} Q 980 ${y - 230} 1080 ${y - 170} L 1080 ${y} L 0 ${y} Z`} fill="#9fd57a" stroke={KC.ink} strokeWidth={6} />
    {/* río arriba de la caída */}
    <path d={`M 0 ${y - 70} L 1080 ${y - 70} L 1080 ${y} L 0 ${y} Z`} fill={agua} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${((i * 190 + T * 90) % 1180) - 100} ${y - 38} q 25 -10 50 0`} stroke="rgba(255,255,255,.55)" strokeWidth={5} fill="none" />)}
    {/* paredón de roca */}
    <path d={`M 0 ${y} L 1080 ${y} L 1080 ${y + 340} L 0 ${y + 340} Z`} fill="#8a7a66" stroke={KC.ink} strokeWidth={6} />
    {/* cortina de agua */}
    <path d={`M 110 ${y} Q 540 ${y - 14} 970 ${y} L 990 ${y + 330} L 90 ${y + 330} Z`} fill={agua} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 22 }, (_, i) => { const x = 130 + i * 39, u = ((T * 1.6 + i * 0.37) % 1);
      return <line key={i} x1={x} y1={y + 10 + u * 200} x2={x + 2} y2={y + 70 + u * 200} stroke="rgba(255,255,255,.5)" strokeWidth={6} strokeLinecap="round" />; })}
    {/* poza */}
    <path d={`M 0 ${y + 320} L 1080 ${y + 320} L 1080 ${y + 1300} L 0 ${y + 1300} Z`} fill={agua} stroke={KC.ink} strokeWidth={6} />
    {/* lavadora: remolinos que giran en la base */}
    {lavadora > 0 && [220, 540, 860].map((cx, i) => <g key={i} transform={`translate(${cx} ${y + 380}) rotate(${T * 260 * (i % 2 ? -1 : 1)})`} opacity={lavadora}>
      <circle r={70} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={8} strokeDasharray="60 30" />
      <circle r={38} fill="none" stroke="rgba(255,255,255,.6)" strokeWidth={6} strokeDasharray="30 20" /></g>)}
    {/* espuma */}
    {bolas.map((b, i) => { const s = b.s * espuma * (1 + 0.08 * Math.sin(T * 3 + b.f));
      return s > 2 && <circle key={i} cx={b.x} cy={y + 300 + b.y * espuma - 40 * espuma} r={s} fill={RS_ESPUMA} stroke="rgba(22,18,15,.55)" strokeWidth={3} />; })}
  </g>;
}
// recuadro sepia: "antes"
function CascadaAntes({ T, x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(-3)`} opacity={o}>
    <rect x={0} y={0} width={400} height={320} rx={14} fill="#efe1c2" stroke={KC.ink} strokeWidth={7} />
    <rect x={18} y={18} width={364} height={200} fill="#e2cfa6" stroke="#6b5434" strokeWidth={3} />
    <path d="M 18 100 L 382 100 L 382 218 L 18 218 Z" fill="#b39a6b" />
    <path d="M 60 100 L 340 100 L 350 200 L 50 200 Z" fill="#f6efe0" stroke="#6b5434" strokeWidth={3} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={75 + i * 30} y1={104 + ((T * 60 + i * 13) % 60)} x2={75 + i * 30} y2={130 + ((T * 60 + i * 13) % 60)} stroke="#a58c5f" strokeWidth={4} />)}
    <text x={200} y={252} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill="#4a3a22">antes:</text><text x={200} y={292} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill="#4a3a22">«el Niágara mexicano»</text>
  </g>;
}

// ---------- el barrio, el corredor y los tubos ----------
function Casa({ x, y, c = '#ff9db5' }) {
  return <g transform={`translate(${x} ${y})`}><rect x={-40} y={-60} width={80} height={60} fill={c} stroke={KC.ink} strokeWidth={5} />
    <path d="M -50 -58 L 0 -100 L 50 -58 Z" fill="#d9534f" stroke={KC.ink} strokeWidth={5} /><rect x={-12} y={-32} width={24} height={32} fill="#6b4a2b" stroke={KC.ink} strokeWidth={3} /></g>;
}
function Nave({ x, y, w = 200, c = '#c9d3dd' }) {
  const dientes = Math.round(w / 50);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-110} width={w} height={110} fill={c} stroke={KC.ink} strokeWidth={6} />
    <path d={'M 0 -110 ' + Array.from({ length: dientes }, (_, i) => `L ${i * (w / dientes)} -150 L ${(i + 1) * (w / dientes)} -110`).join(' ')} fill="#aebbc8" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: dientes }, (_, i) => <rect key={i} x={14 + i * (w / dientes)} y={-80} width={24} height={30} fill="#7fd0f5" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
function Tubo({ T, x, y0, y1, color = RS_SUCIA, desde = 0 }) {
  return <g><rect x={x - 11} y={y0} width={22} height={y1 - y0 - 10} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
    <Goteo T={T} x={x} y0={y1 - 10} y1={y1 + 50} cada={0.35} color={color} desde={desde} r={10} /></g>;
}

// ---------- micro: burbuja forrada de detergente ----------
function Burbuja({ T, cx = 540, cy = 820, R = 300, n = 30, aparece = 1 }) {
  return <g>
    <circle cx={cx} cy={cy} r={R} fill="rgba(180,230,255,.10)" stroke="rgba(180,230,255,.6)" strokeWidth={4} />
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + T * 0.08, k = kclamp(aparece * n - i, 0, 1);
      const hx = cx + Math.cos(a) * (R + 22), hy = cy + Math.sin(a) * (R + 22);
      const pts = Array.from({ length: 6 }, (_, j) => { const rr = R + 4 - j * 12, off = (j % 2 ? 9 : -9);
        return `${(cx + Math.cos(a) * rr - Math.sin(a) * off).toFixed(1)},${(cy + Math.sin(a) * rr + Math.cos(a) * off).toFixed(1)}`; }).join(' ');
      return <g key={i} opacity={k}><polyline points={pts} fill="none" stroke={KC.yellow} strokeWidth={6} strokeLinejoin="round" />
        <circle cx={hx} cy={hy} r={17} fill={KC.pink} stroke={KC.ink} strokeWidth={4} /></g>; })}
  </g>;
}

// ---------- gota de agua ----------
const RS_GOTA = 'M 0 -330 C 60 -230 230 -60 230 90 C 230 220 125 300 0 300 C -125 300 -230 220 -230 90 C -230 -60 -60 -230 0 -330 Z';
function Gota({ x, y, s = 1, relleno = 'rgba(47,143,216,.25)', borde = '#7fd0f5', children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d={RS_GOTA} fill={relleno} stroke={borde} strokeWidth={8 / s} />{children}</g>;
}
function Puntos({ T, n, seed = 3, lleno = 1 }) {
  const r = krng(seed), cols = [KC.pink, KC.yellow, KC.mint, KC.orange, KC.lilac, KC.cyan];
  const ps = []; while (ps.length < n) { const x = (r() * 2 - 1) * 210, y = -250 + r() * 530; const dy = y < 90 ? (y + 330) / 420 * 210 : 210 - (y - 90) / 210 * 90; if (Math.abs(x) < dy) ps.push({ x, y, c: cols[ps.length % cols.length], s: 6 + r() * 8 }); }
  return <g>{ps.map((p, i) => i < n * lleno && <circle key={i} cx={p.x + Math.sin(T * 2 + i) * 3} cy={p.y + Math.cos(T * 1.7 + i) * 3} r={p.s} fill={p.c} stroke={KC.ink} strokeWidth={2} />)}</g>;
}

// ---------- riñón ----------
function Rinon({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 20 -160 C 150 -170 190 -40 160 60 C 130 170 20 190 -40 130 C -80 90 -20 40 -40 0 C -60 -40 -110 -60 -90 -110 C -70 -150 -20 -158 20 -160 Z" fill="#c9505a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 -10 C 10 -30 40 -10 60 20" stroke="#8e2f38" strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={60} cy={-90} rx={30} ry={14} fill="#fff" opacity=".35" />
  </g>;
}

// ---------- planta de tratamiento (esquema) ----------
function Planta({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-20} y={-40} width={620} height={250} rx={20} fill="#dfe6ea" stroke={KC.ink} strokeWidth={6} />
    {[120, 360].map((cx, i) => <g key={i} transform={`translate(${cx} 80)`}>
      <ellipse rx={100} ry={100} fill="#8fc7a8" stroke={KC.ink} strokeWidth={7} />
      <ellipse rx={78} ry={78} fill="#5fb3d9" stroke={KC.ink} strokeWidth={4} />
      <g transform={`rotate(${T * 40 * (i ? -1 : 1)})`}><rect x={-90} y={-7} width={180} height={14} rx={6} fill="#5b6470" stroke={KC.ink} strokeWidth={3} /></g>
      <circle r={14} fill="#5b6470" stroke={KC.ink} strokeWidth={3} /></g>)}
    <rect x={480} y={10} width={100} height={150} rx={10} fill="#5fb3d9" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 6 }, (_, i) => { const u = (T * 0.9 + i / 6) % 1; return <circle key={i} cx={500 + (i % 3) * 30} cy={150 - u * 130} r={6} fill="#fff" opacity={1 - u} />; })}
  </g>;
}

function RioSantiagoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, Co: CUES.Corredor, Ca: CUES.Cascada, B: CUES.Burbujas, P: CUES.Pregunta, E: CUES.Estudio, M: CUES.Microbios, S: CUES.Salud, Pl: CUES.Planta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const S2 = K.S + 5.4;                                   // mitad de "Salud": del mapa al riñón
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: empieza pegado a la espuma (parece nieve) y se aleja hasta ver la cascada
  const zG = klerp(2.6, 1, kprog(T, K.G + 0.2, K.G + 2.2, kEase.suave));
  const sucioCo = kprog(T, K.Co + 0.8, K.Co + 3.8, kEase.suave);
  const barra = (t0) => kprog(T, t0, t0 + 1.0, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: ¿nieve? no: espuma de la cascada */}
      <Escena T={T} a={K.G} b={K.O} zoom={0}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${zG})`, transformOrigin:'540px 1080px' }}>
          {svg(<Cascada T={T} espuma={1} sucia={1} lavadora={0.6} />)}
        </div>
        {svg(<Copos T={T} n={60} />)}
      </Escena>
      {/* 1 · nace en Chapala y corre más de 560 km hasta el mar */}
      <Escena T={T} a={K.O} b={K.Co}>
        {svg(<MapaRio T={T} traza={kprog(T, K.O + 0.3, K.O + 3.2, kEase.suave)} />)}
        <EscalaFija texto="100 km · esquema" largo={216} y={1470} color={KC.ink} />
      </Escena>
      {/* 2 · aguas residuales de la ciudad y del corredor industrial */}
      <Escena T={T} a={K.Co} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={0} y={660} width={KW} height={330} fill="#bfe3b4" stroke={KC.ink} strokeWidth={6} />
          {[[110, 860, '#ff9db5'], [220, 830, '#9de0ff'], [330, 870, '#ffd36b'], [160, 950, '#b8f0c8'], [290, 960, '#ffb38a'], [410, 940, '#d6c2ff']].map(([x, y, c], i) =>
            <g key={i} opacity={kprog(T, K.Co + 0.1 + i * 0.08, K.Co + 0.4 + i * 0.08)}><Casa x={x} y={y} c={c} /></g>)}
          {[[560, 900, 190], [770, 880, 220], [610, 980, 160], [800, 975, 200]].map(([x, y, w], i) =>
            <g key={i} opacity={kprog(T, K.Co + 1.2 + i * 0.1, K.Co + 1.5 + i * 0.1)}><Nave x={x} y={y} w={w} /></g>)}
          <rect x={0} y={1000} width={KW} height={130} fill={mixHex(RS_AGUA, RS_SUCIA, sucioCo)} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${((i * 170 + T * 120) % 1240) - 120} 1060 q 25 -10 50 0`} stroke="rgba(255,255,255,.5)" strokeWidth={5} fill="none" />)}
          <Tubo T={T} x={250} y0={960} y1={1000} desde={K.Co + 0.6} />
          <Tubo T={T} x={450} y0={950} y1={1000} desde={K.Co + 0.8} />
          <Tubo T={T} x={700} y0={980} y1={1000} desde={K.Co + 1.6} />
          <Tubo T={T} x={930} y0={980} y1={1000} desde={K.Co + 1.8} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · la cascada: antes "el Niágara mexicano"; hoy la caída bate el agua como lavadora */}
      <Escena T={T} a={K.Ca} b={K.B}>
        <FondoLunares color={KC.mint} />
        {svg(<><Cascada T={T} espuma={kprog(T, K.Ca + 2.0, K.Ca + 4.0, kEase.sale)} sucia={1} lavadora={kprog(T, K.Ca + 2.2, K.Ca + 2.8)} />
          <CascadaAntes T={T} x={60} y={340} o={kprog(T, K.Ca + 0.3, K.Ca + 0.8)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · micro: el detergente forra la burbuja */}
      <Escena T={T} a={K.B} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 42%, #18324a 0%, ${KC.noche} 70%)` }}></div>
        {svg(<><Burbuja T={T} aparece={kprog(T, K.B + 0.6, K.B + 2.6)} />
          {Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.25 + i / 10) % 1); return <circle key={i} cx={90 + (i * 97) % 900} cy={1180 - u * 800} r={14 + (i % 3) * 8} fill="none" stroke="rgba(180,230,255,.45)" strokeWidth={4} />; })}
          <text x={540} y={830} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill="#bfe7ff">aire</text>
          <text x={70} y={1110} style={{ font:`900 46px ${KF.texto}` }} fill="#7fd0f5">agua</text></>)}
        <Etq T={T} at={K.B + 1.4} until={K.P - 0.2} x={760} y={573} texto="detergente" lado="der" tam={26} color={KC.yellow} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<Gota x={300} y={820} s={0.85} relleno={mixHex(RS_AGUA, RS_SUCIA, 0.7)} borde={KC.ink}>
          <text x={0} y={190} textAnchor="middle" style={{ font:`400 420px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 0 0)`}>?</text></Gota>)}
      </Escena>
      {/* 6 · IMTA 2011: 1,090 sustancias y metales */}
      <Escena T={T} a={K.E} b={K.M}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #18324a 0%, ${KC.noche} 70%)` }}></div>
        {svg(<Gota x={540} y={880} s={1.15}><Puntos T={T} n={170} lleno={kprog(T, K.E + 0.8, K.E + 4.3, kEase.suave)} /></Gota>)}
        <Contador T={T} at={K.E + 0.8} desde={0} hasta={1090} dur={3.5} x={540} y={960} tam={150} color={KC.yellow} />
        <Chip T={T} at={K.E + 2.0} until={K.M - 0.2} texto="sustancias y metales" y={1110} x={540} tam={36} borde={KC.yellow} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.0} anio="2011" quien="IMTA · río Santiago" revista="Instituto Mexicano de Tecnología del Agua (federal)" y={500} />
      {/* 7 · arsénico y plomo sobre la norma de entonces; microbios en todo el río */}
      <Escena T={T} a={K.M} b={K.S}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #18324a 0%, ${KC.noche} 70%)` }}></div>
        {svg(<>
          {[[600, 'As', KC.lilac, K.M + 0.2], [840, 'Pb', '#9aa3ad', K.M + 0.7]].map(([x, l, c, t0], i) => { const h = 380 * barra(t0);
            return <g key={i}><rect x={x - 60} y={980 - h} width={120} height={h} rx={10} fill={c} stroke={KC.ink} strokeWidth={6} />
              <Atomo x={x} y={980 - h - 60} r={50} color={c} letra={l} o={kprog(T, t0, t0 + 0.3)} /></g>; })}
          <line x1={470} y1={700} x2={980} y2={700} stroke={KC.red} strokeWidth={7} strokeDasharray="22 14" />
          <text x={980} y={465} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.red}>raya roja: norma de entonces (1996)</text>
          <line x1={470} y1={980} x2={980} y2={980} stroke={KC.texto} strokeWidth={5} />
          <rect x={0} y={1040} width={KW} height={140} fill={RS_SUCIA} opacity={kprog(T, K.M + 2.6, K.M + 3.0)} />
          {Array.from({ length: 7 }, (_, i) => <Bacteria key={i} T={T} seed={i} x={((i * 170 + (T - K.M) * 90) % 1300) - 110} y={1090 + (i % 2) * 40} rot={(i % 3 - 1) * 10} s={0.55}
            color={[KC.mint, KC.pink, KC.yellow][i % 3]} vida={kprog(T, K.M + 2.7 + i * 0.12, K.M + 3.0 + i * 0.12)} />)}
        </>)}
        <Etq T={T} at={K.M + 3.0} until={K.S - 0.2} x={1020} y={1010} texto="microbios en todo el río" lado="izq" tam={30} color={KC.mint} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 8a · CIDH 2020: hasta 5 km del río en El Salto y Juanacatlán */}
      <Escena T={T} a={K.S} b={S2}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <path d="M -40 860 C 200 760 360 960 560 860 C 760 760 900 900 1120 820 L 1120 1120 C 900 1200 760 1060 560 1160 C 360 1260 200 1060 -40 1160 Z" fill={KC.red} opacity={0.18 * kprog(T, K.S + 0.8, K.S + 1.6)} />
          <path d="M -40 1010 C 200 910 360 1110 560 1010 C 760 910 900 1050 1120 970" stroke={RS_SUCIA} strokeWidth={36} fill="none" />
          <path d="M -40 1010 C 200 910 360 1110 560 1010 C 760 910 900 1050 1120 970" stroke={KC.ink} strokeWidth={4} fill="none" opacity={0.4} />
          {[[120, 900], [300, 930], [470, 900], [700, 880], [880, 900], [150, 1110], [380, 1150], [640, 1090], [860, 1080]].map(([x, y], i) =>
            <g key={i} opacity={kprog(T, K.S + 1.2 + i * 0.08, K.S + 1.5 + i * 0.08)} transform={`translate(${x} ${y}) scale(0.6)`}><Casa x={0} y={0} c={['#ff9db5', '#9de0ff', '#ffd36b'][i % 3]} /></g>)}
          <line x1={1000} y1={820} x2={1000} y2={970} stroke={KC.ink} strokeWidth={5} /><path d="M 990 830 L 1000 815 L 1010 830" stroke={KC.ink} strokeWidth={5} fill="none" />
        </>)}
        <Etq T={T} at={K.S + 1.8} until={S2 - 0.2} x={990} y={760} texto="hasta 5 km" lado="izq" tam={30} color={KC.ink} />
        <Etq T={T} at={K.S + 2.2} until={S2 - 0.2} x={100} y={720} texto="El Salto" lado="der" tam={34} color={KC.ink} />
        <Etq T={T} at={K.S + 2.4} until={S2 - 0.2} x={480} y={1210} texto="Juanacatlán" lado="der" tam={34} color={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Chip T={T} at={K.S + 0.4} until={S2 - 0.2} texto="CIDH · 2020: proteger su salud" y={500} x={380} tam={30} borde={KC.red} />
      {/* 8b · el vínculo con la enfermedad renal no estaba probado (CNDH 2022) */}
      <Escena T={T} a={S2} b={K.Pl}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <path d="M 120 1060 C 200 1010 260 1110 340 1060" stroke={RS_SUCIA} strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d="M 380 1040 Q 470 960 540 930" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="16 12" strokeDashoffset={-T * 30} />
          <g transform={`translate(0 ${Math.sin(T * 2) * 6})`}><Rinon x={720} y={820} s={1.15} /></g>
          <text x={720} y={600} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, S2 + 0.8, S2 + 1.2)}>¿?</text>
        </>)}
        <Etq T={T} at={S2 + 0.6} until={K.Pl - 0.2} x={120} y={1120} texto="río" lado="der" tam={32} color={KC.ink} />
      </Escena>
      <Chip T={T} at={S2 + 1.4} until={K.Pl - 0.2} texto="vínculo no probado (hasta 2022)" y={1440} x={540} tam={32} borde={KC.ink} />
      {/* 9 · planta El Ahogado: hasta 3,250 L/s */}
      <Escena T={T} a={K.Pl} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={1040} width={KW} height={130} fill={RS_SUCIA} stroke={KC.ink} strokeWidth={6} />
          <rect x={640} y={1040} width={440} height={130} fill={mixHex(RS_SUCIA, RS_AGUA, 0.55 * kprog(T, K.Pl + 1.5, K.Pl + 3.5))} />
          <path d="M 0 1040 L 1080 1040 M 0 1170 L 1080 1170" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${((i * 170 + T * 120) % 1240) - 120} 1100 q 25 -10 50 0`} stroke="rgba(255,255,255,.5)" strokeWidth={5} fill="none" />)}
          <Planta T={T} x={90} y={720} />
          <rect x={600} y={880} width={26} height={160} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
          <Goteo T={T} x={613} y0={1030} y1={1080} cada={0.25} color={RS_AGUA} desde={K.Pl + 1.0} r={10} />
        </>)}
        <Etq T={T} at={K.Pl + 0.8} until={K.C - 0.2} x={100} y={660} texto="planta El Ahogado (esquema)" lado="der" tam={30} color={KC.ink} />
        <NumeroGigante T={T} at={K.Pl + 1.2} until={K.C - 0.2} desde={2250} valor={3250} dur={1.8} sufijo=" L/s" etiqueta="ya ampliada, hasta:" x={400} y={470} tam={120} color={KC.yellow} />
      </Escena>
      {/* 10 · cierre: la misma cascada, la misma "nieve" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Cascada T={T} espuma={1} sucia={1} lavadora={0.6} /><Copos T={T} n={60} seed={11} /></>)}
      </Escena>

      {/* datos y etiquetas generales */}
      <Chip T={T} at={K.G + 1.6} until={K.O - 0.2} texto="espuma, no nieve" y={1440} x={540} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.O + 0.5} until={K.Co - 0.2} texto="nace en el Lago de Chapala" y={430} x={360} tam={30} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.O + 1.6} until={K.Co - 0.2} valor={562} dur={1.6} sufijo=" km" etiqueta="largo del río:" x={300} y={560} tam={110} color={KC.yellow} />
      <Etq T={T} at={K.Co + 0.6} until={K.Ca - 0.2} x={80} y={600} texto="ciudad" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Co + 1.6} until={K.Ca - 0.2} x={1000} y={600} texto="corredor industrial" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Co + 2.4} until={K.Ca - 0.2} texto="aguas residuales → río" y={1440} x={540} tam={34} borde={RS_SUCIA} />
      <Chip T={T} at={K.Ca + 2.4} until={K.B - 0.2} texto="la caída lo bate como lavadora" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.B + 0.3} until={K.P - 0.2} texto="una burbuja de espuma, por dentro" y={420} x={460} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="espuma, no nieve" y={470} x={680} tam={40} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="Esto no es nieve: *es espuma.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.Co - 0.1} texto="Nace en Chapala: *más de 560 km.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.Ca - 0.1} texto="Aguas residuales: *ciudad e industria.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.B - 0.1} texto="El *Niágara mexicano,* como lavadora." />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.P - 0.1} texto="Detergentes: *atrapan burbujas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y qué más *viene en esa agua?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.M - 0.1} texto="2011: *1,090 sustancias y metales.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.S - 0.1} texto="Arsénico, plomo *y microbios.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.Pl - 0.1} texto="Hasta 5 km del río: *proteger su salud.*" />
      <Subtitulo T={T} idx={9} at={K.Pl + 0.1} until={K.C - 0.1} texto="El Ahogado: *hasta 3,250 L/s.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Con agua sucia, *seguirá nevando.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Origen + 1.5, CUES.Corredor + 0.5, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cascada + 2.4, CUES.Burbujas + 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.2, CUES.Microbios + 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Microbios + 3.0, CUES.Salud + 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Salud + 0.5, CUES.Salud + 3.8, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Salud + 6.0, CUES.Planta + 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Planta + 2.2, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_04_bajando_lentes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="51" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RioSantiagoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RioSantiagoShot /></CompositionStage></div>;
}
window.RioSantiagoApp = RioSantiagoApp;
