// Shot Ambiental #29 · El mar no se vuelve ácido: se vuelve menos básico — NARRADO (N1 por dentro + N5 el experimento).
// Datos: NOAA (Ocean acidification, 2026), EEA (indicador Ocean acidification, 2026), NOAA PMEL (A primer on pH) y
// Bednaršek et al. 2012 (Nature Geoscience). Ver guion.md y verificacion.md. Moléculas, mapa y mariposa de mar son esquemas.

const AC_AGUA = '#1f7fc9', AC_AGUA2 = '#5fb6ef', AC_H = '#ffe11a';
// color de la escala de pH (0 rojo → 7 verde → 14 violeta)
function acColorPH(ph) {
  const P = [[0, '#e8322a'], [3, '#ff8a1f'], [5, '#ffe11a'], [7, '#3fbf4a'], [9, '#00b4d8'], [11, '#2346ff'], [14, '#6a1fb8']];
  for (let i = 0; i < P.length - 1; i++) if (ph <= P[i + 1][0]) return mixHex(P[i][1], P[i + 1][1], (ph - P[i][0]) / (P[i + 1][0] - P[i][0]));
  return P[P.length - 1][1];
}

// Medidor de pH de carátula (semicírculo 0–14). ph = valor de la aguja.
function AcMedidor({ x, y, r = 230, ph = 8.1 }) {
  const ang = (v) => Math.PI - (v / 14) * Math.PI, pt = (v, rr) => [x + rr * Math.cos(ang(v)), y - rr * Math.sin(ang(v))];
  const segs = Array.from({ length: 28 }, (_, i) => { const a = i / 2, b = (i + 1) / 2; const [x1, y1] = pt(a, r), [x2, y2] = pt(b, r);
    return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`} stroke={acColorPH(a + 0.25)} strokeWidth={46} fill="none" />; });
  const [nx, ny] = pt(ph, r - 40);
  return <g>
    <path d={`M ${x - r - 40} ${y + 20} A ${r + 40} ${r + 40} 0 0 1 ${x + r + 40} ${y + 20} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {segs}
    <path d={`M ${pt(0, r + 23)[0]} ${pt(0, r + 23)[1]} A ${r + 23} ${r + 23} 0 0 1 ${pt(14, r + 23)[0]} ${pt(14, r + 23)[1]}`} stroke={KC.ink} strokeWidth={6} fill="none" />
    {[0, 7, 14].map((v) => { const [tx, ty] = pt(v, r - 62); return <text key={v} x={tx} y={ty + 12} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{v}</text>; })}
    <text x={pt(2.6, r - 100)[0]} y={pt(2.6, r - 100)[1]} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill="#b8231c">ácido</text>
    <text x={pt(11.4, r - 100)[0]} y={pt(11.4, r - 100)[1]} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill="#1d36c9">básico</text>
    <line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <circle cx={x} cy={y} r={20} fill={KC.ink} />
    <rect x={x - 120} y={y + 34} width={240} height={86} rx={20} fill={KC.white} stroke={KC.ink} strokeWidth={6} />
    <text x={x} y={y + 100} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.ink}>pH {ph.toFixed(ph < 8.095 ? 2 : 1)}</text>
  </g>;
}

// Concha en espiral de la mariposa de mar (Limacina: enrollada a la izquierda) con dos parapodios ("alas").
// dis 0..1 = cuánto se ha disuelto (hoyos, opaca, contorno roto). alas 0..1 visibles. aleteo en radianes.
function AcPteropodo({ x, y, s = 1, dis = 0, alas = 1, T = 0, seed = 3, rot = 0 }) {
  const pts = [];
  for (let i = 0; i <= 120; i++) { const th = (i / 120) * Math.PI * 4.2, rr = 6 + 13 * th; pts.push([-rr * Math.cos(th), -rr * Math.sin(th) * 0.92]); }
  const espiral = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const R = 6 + 13 * Math.PI * 4.2;
  const rnd = krng(seed), hoyos = Array.from({ length: 26 }, () => { const a = rnd() * Math.PI * 2, d = rnd() * R * 0.85; return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.92, r: 5 + rnd() * 11, u: rnd() }; });
  const flap = Math.sin(T * 9) * 0.35;
  const ala = (sgn) => <g transform={`translate(${R * 0.95} ${sgn * 18}) rotate(${sgn * (28 + flap * 40)})`} opacity={alas}>
    <path d={`M 0 0 C 40 ${sgn * -30} 150 ${sgn * -80} 190 ${sgn * -20} C 200 ${sgn * 20} 120 ${sgn * 40} 0 ${sgn * 14} Z`} fill="rgba(255,190,140,.75)" stroke={KC.ink} strokeWidth={5} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {ala(-1)}{ala(1)}
    <ellipse cx={0} cy={0} rx={R + 6} ry={(R + 6) * 0.92} fill={mixHex('#f3e7c8', '#cfc3a6', dis)} opacity={1 - dis * 0.35} stroke={KC.ink} strokeWidth={7} strokeDasharray={dis > 0.45 ? `${60 - dis * 40} ${dis * 30}` : 'none'} />
    <path d={espiral} fill="none" stroke="#8a6a3c" strokeWidth={6} opacity={1 - dis * 0.5} />
    <ellipse cx={R * 0.62} cy={4} rx={R * 0.36} ry={R * 0.5} fill="#5b3f2a" opacity={0.85} stroke={KC.ink} strokeWidth={5} />
    {hoyos.filter((h) => h.u < dis).map((h, i) => <ellipse key={i} cx={h.x} cy={h.y} rx={h.r} ry={h.r * 0.7} fill="#6b5a46" opacity={0.75} />)}
    <ellipse cx={-R * 0.4} cy={-R * 0.45} rx={R * 0.25} ry={R * 0.1} fill="#fff" opacity={0.55 * (1 - dis)} transform={`rotate(-30 ${-R * 0.4} ${-R * 0.45})`} />
  </g>;
}

// Moléculas (esquema): átomos con Atomo de amb-kit.
const AC_O = '#ff4b4b', AC_C = '#4a4f5c', AC_HB = '#ffffff';
function AcCO2({ x, y, s = 1, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={-60} y1={-6} x2={60} y2={-6} stroke={KC.texto} strokeWidth={5} /><line x1={-60} y1={6} x2={60} y2={6} stroke={KC.texto} strokeWidth={5} />
    <Atomo x={-62} y={0} r={30} color={AC_O} letra="O" /><Atomo x={0} y={0} r={32} color={AC_C} letra="C" /><Atomo x={62} y={0} r={30} color={AC_O} letra="O" />
  </g>;
}
function AcH2O({ x, y, s = 1, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={-44} y2={36} stroke={KC.texto} strokeWidth={6} /><line x1={0} y1={0} x2={44} y2={36} stroke={KC.texto} strokeWidth={6} />
    <Atomo x={0} y={0} r={32} color={AC_O} letra="O" /><Atomo x={-46} y={38} r={20} color={AC_HB} letra="H" /><Atomo x={46} y={38} r={20} color={AC_HB} letra="H" />
  </g>;
}
// ion H+ que brilla
function AcHmas({ x, y, s = 1, o = 1, T = 0 }) {
  const b = 1 + 0.12 * Math.sin(T * 10);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={34 * b} fill={AC_H} opacity={0.3} /><circle r={22} fill={AC_H} stroke={KC.ink} strokeWidth={4} />
    <text y={8} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>H⁺</text>
  </g>;
}
// carbonato CO3 2- (triángulo de 3 O). atrapado 0..1 = un H se le pega y se apaga (pasa a HCO3-).
function AcCO3({ x, y, s = 1, o = 1, atrapado = 0, rot = 0 }) {
  const c = atrapado > 0.5 ? '#8a8f99' : AC_O;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[90, 210, 330].map((a) => <line key={a} x1={0} y1={0} x2={44 * Math.cos(a * Math.PI / 180)} y2={-44 * Math.sin(a * Math.PI / 180)} stroke={KC.texto} strokeWidth={5} />)}
    {[90, 210, 330].map((a) => <Atomo key={a} x={46 * Math.cos(a * Math.PI / 180)} y={-46 * Math.sin(a * Math.PI / 180)} r={20} color={c} letra="O" />)}
    <Atomo x={0} y={0} r={22} color={AC_C} letra="C" />
    {atrapado > 0 && <Atomo x={0} y={-46 - 30 * (1 - atrapado) - 26} r={15} color={AC_H} letra="H" o={kclamp(atrapado * 2, 0, 1)} />}
  </g>;
}
// ácido carbónico H2CO3 (esquema)
function AcH2CO3({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[90, 210, 330].map((a) => <line key={a} x1={0} y1={0} x2={50 * Math.cos(a * Math.PI / 180)} y2={-50 * Math.sin(a * Math.PI / 180)} stroke={KC.texto} strokeWidth={5} />)}
    <Atomo x={0} y={-52} r={26} color={AC_O} letra="O" /><Atomo x={-45} y={26} r={26} color={AC_O} letra="O" /><Atomo x={45} y={26} r={26} color={AC_O} letra="O" />
    <Atomo x={0} y={0} r={28} color={AC_C} letra="C" />
    <Atomo x={-80} y={46} r={17} color={AC_HB} letra="H" /><Atomo x={80} y={46} r={17} color={AC_HB} letra="H" />
  </g>;
}

// El mar visto de lado: cielo cian, olas y agua. tope = y de la superficie.
function AcMar({ T, tope = 880 }) {
  const ola = (y0, amp, fase, color) => { let d = `M 0 ${KH} L 0 ${y0}`; for (let x = 0; x <= KW; x += 30) d += ` L ${x} ${y0 + Math.sin(x / 90 + T * 2 + fase) * amp}`; return <path d={d + ` L ${KW} ${KH} Z`} fill={color} />; };
  return <>{ola(tope - 14, 16, 0, AC_AGUA2)}{ola(tope + 10, 12, 1.7, AC_AGUA)}
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${80 + i * 170} ${tope + 120 + (i % 2) * 90} q 25 ${-10 + Math.sin(T * 2 + i) * 5} 50 0`} stroke="#bfe7ff" strokeWidth={6} fill="none" />)}</>;
}
// Fábrica con chimeneas en la orilla
function AcFabrica({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-30} width={420} height={80} fill="#c9b48a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-170} y={-170} width={230} height={140} fill="#9aa3ad" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-320} width={44} height={150} fill="#c44" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-280} width={44} height={110} fill="#c44" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((i) => <rect key={i} x={-150 + i * 66} y={-120} width={40} height={40} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} />)}
    <g transform="translate(150 -40)"><rect x={-60} y={-40} width={120} height={46} rx={14} fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><circle cx={-32} cy={10} r={16} fill={KC.ink} /><circle cx={32} cy={10} r={16} fill={KC.ink} /></g>
  </g>;
}
// Nube de CO2
function AcNube({ x, y, s = 1, o = 1, color = '#8f98a3' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cx={-40} cy={10} r={42} fill={color} stroke={KC.ink} strokeWidth={6} /><circle cx={10} cy={-14} r={52} fill={color} stroke={KC.ink} strokeWidth={6} /><circle cx={56} cy={12} r={40} fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={4} width={150} height={44} fill={color} /><line x1={-80} y1={50} x2={95} y2={50} stroke={KC.ink} strokeWidth={6} />
    <text x={8} y={30} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.white}>CO₂</text>
  </g>;
}
// Barra de pH 0..14 (de x0 a x1) con números
function AcRegla({ x0 = 90, x1 = 990, y = 760, alto = 80, desde = 0, hasta = 14, paso = 1, dec = 0 }) {
  const px = (v) => x0 + (v - desde) / (hasta - desde) * (x1 - x0);
  const n = Math.round((hasta - desde) / paso);
  const segs = Array.from({ length: 60 }, (_, i) => { const a = desde + (hasta - desde) * i / 60; return <rect key={i} x={px(a)} y={y} width={(x1 - x0) / 60 + 1} height={alto} fill={acColorPH(a + (hasta - desde) / 120)} />; });
  return <g>{segs}<rect x={x0} y={y} width={x1 - x0} height={alto} fill="none" stroke={KC.ink} strokeWidth={7} rx={6} />
    {Array.from({ length: n + 1 }, (_, i) => { const v = desde + i * paso; return <g key={i}><line x1={px(v)} y1={y + alto} x2={px(v)} y2={y + alto + 18} stroke={KC.ink} strokeWidth={4} />
      <text x={px(v)} y={y + alto + 52} textAnchor="middle" style={{ font:`700 ${dec ? 26 : 32}px ${KF.mono}` }} fill={KC.ink}>{v.toFixed(dec)}</text></g>; })}</g>;
}
// Marca (triángulo + texto) sobre la regla
function AcMarca({ x, y, texto, color = KC.ink, arriba = true, tam = 32, o = 1 }) {
  return <g opacity={o}><path d={arriba ? `M ${x} ${y} l -18 -30 l 36 0 Z` : `M ${x} ${y} l -18 30 l 36 0 Z`} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text x={x} y={arriba ? y - 44 : y + 66} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={color}>{texto}</text></g>;
}
// Frasco con n puntos H+ (esquema)
function AcFrasco({ x, y, n, T, seed = 1, etiqueta, mostrar = 1 }) {
  const r = krng(seed), pts = Array.from({ length: 130 }, () => [-130 + r() * 260, -330 + r() * 300, r() * 6]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-160} y={-380} width={320} height={380} rx={34} fill="rgba(95,182,239,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-420} width={240} height={48} rx={10} fill="#e9eef5" stroke={KC.ink} strokeWidth={6} />
    {pts.slice(0, Math.round(n * mostrar)).map((p, i) => <circle key={i} cx={p[0] + Math.sin(T * 2 + p[2]) * 4} cy={p[1] + Math.cos(T * 2 + p[2]) * 4} r={9} fill={AC_H} stroke={KC.ink} strokeWidth={2.5} />)}
    <text x={0} y={-440} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
// Ostión (concha rugosa) y coral (ramificado)
function AcOstion({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 20 C -160 -60 -60 -110 30 -100 C 120 -95 170 -40 150 20 C 120 70 -110 80 -150 20 Z" fill="#cbbfa8" stroke={KC.ink} strokeWidth={7} />
    {[-90, -40, 10, 60, 105].map((dx, i) => <path key={i} d={`M ${dx - 20} ${-80 + Math.abs(dx) * 0.2} Q ${dx} -10 ${dx + 10} 50`} stroke="#8d7f68" strokeWidth={5} fill="none" />)}
    <path d="M -140 18 C -80 50 80 50 145 18" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
function AcCoral({ x, y, s = 1, T = 0 }) {
  const ramas = [[0, 0, 0, -170], [0, -90, -80, -190], [0, -110, 85, -210], [-40, -140, -110, -250], [45, -160, 120, -280], [0, -170, 10, -290]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ramas.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={KC.ink} strokeWidth={42} strokeLinecap="round" />)}
    {ramas.map(([a, b, c, d], i) => <line key={'c' + i} x1={a} y1={b} x2={c} y2={d} stroke="#ff8a6b" strokeWidth={30} strokeLinecap="round" />)}
    {ramas.map(([a, b, c, d], i) => <circle key={'p' + i} cx={c} cy={d} r={8 + Math.sin(T * 3 + i) * 2} fill="#ffd0b8" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Antártida (esquema) con el océano Austral alrededor
function AcAntartida({ x, y, r = 150, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.55} fill={AC_AGUA} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-r} 0 C ${-r} ${-r * 0.8} ${-r * 0.3} ${-r} ${r * 0.2} ${-r * 0.9} C ${r * 0.9} ${-r * 0.8} ${r * 1.05} ${-r * 0.1} ${r * 0.8} ${r * 0.4} C ${r * 0.6} ${r * 0.9} ${-r * 0.2} ${r * 0.95} ${-r * 0.6} ${r * 0.7} C ${-r * 0.75} ${r * 0.5} ${-r * 1.3} ${r * 0.4} ${-r} 0 Z`} fill="#f4fbff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-r * 1.1} cy={-r * 0.9} r={16 + 4 * Math.sin(T * 6)} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function AcidificacionShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ab: CUES.Absorbe, Ac: CUES.Acido, Es: CUES.Escala, Me: CUES.Medicion, P: CUES.Pregunta, Po: CUES.Porcentaje, Ca: CUES.Carbonato, Et: CUES.Estudio, Ex: CUES.Experimento, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: la aguja baja de 8.2 a 8.1 y se queda en "básico"; la concha flota y se le nota un borde picado
  const phG = klerp(8.2, 8.1, kprog(T, K.G + 0.2, K.G + 2.6, kEase.suave)) + Math.sin(T * 7) * 0.05 * (1 - kprog(T, K.G, K.G + 1));
  const flota = (t) => Math.sin(t * 1.6) * 14;
  // absorbe: 4 nubes, la cuarta se hunde en el mar
  const nubeX = [190, 400, 610, 820];
  // ácido: el CO2 y el agua chocan
  const choque = kprog(T, K.Ac + 0.3, K.Ac + 1.5, kEase.suave), forma = kprog(T, K.Ac + 1.5, K.Ac + 1.9), suelta = kprog(T, K.Ac + 2.2, K.Ac + 3.2, kEase.sale);
  // medición: 8.11 → 8.04
  const phM = klerp(8.11, 8.04, kprog(T, K.Me + 1.2, K.Me + 2.6, kEase.suave));
  const pxM = (v) => 140 + (v - 8.0) / 0.2 * 800;
  // carbonato: 6 iones que bajan a las conchas; 4 se topan con un H+
  const iones = [[200, 0.2, true], [420, 0.7, true], [620, 1.2, false], [300, 1.7, true], [760, 2.2, true], [520, 2.7, false]];
  // experimento: 0 → 45 días, la concha se disuelve
  const disE = kprog(T, K.Ex + 0.8, K.Ex + 6.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el mar, el medidor de pH y una mariposa de mar */}
      <Escena T={T} a={K.G} b={K.Ab}>
        <FondoLunares color={KC.cyan} />
        {svg(<><AcMar T={T} tope={960} /><AcMedidor x={320} y={740} r={240} ph={phG} />
          <AcPteropodo x={760} y={1000 + flota(T)} s={0.6} dis={0.18 * kprog(T, K.G + 2.8, K.G + 5)} T={T} rot={-10} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el mar se traga ~1/4 del CO2 que emitimos */}
      <Escena T={T} a={K.Ab} b={K.Ac}>
        <FondoLunares color={KC.cyan} />
        {svg(<><path d="M 0 900 L 380 900 L 440 1000 L 0 1000 Z" fill="#c9b48a" stroke={KC.ink} strokeWidth={6} />
          <AcMar T={T} tope={960} />
          <AcFabrica x={170} y={900} />
          {nubeX.map((nx, i) => { const t0 = K.Ab + 0.2 + i * 0.45, ap = kprog(T, t0, t0 + 0.4, kEase.rebote);
            const baja = i === 3 ? kprog(T, K.Ab + 2.2, K.Ab + 3.4, kEase.suave) : 0, sube = i < 3 ? kprog(T, K.Ab + 2.2, K.Ab + 4.5) * 60 : 0;
            return <AcNube key={i} x={nx + (i === 3 ? -40 * baja : 0)} y={600 - sube + baja * 520} s={0.8 * ap} o={i === 3 ? 1 - 0.6 * kprog(T, K.Ab + 3.0, K.Ab + 3.6) : 1} color={i === 3 ? '#4f8fd0' : '#8f98a3'} />; })}
          <path d={`M 820 690 L 820 ${690 + 180 * kprog(T, K.Ab + 2.0, K.Ab + 2.6)}`} stroke={KC.ink} strokeWidth={10} strokeDasharray="20 14" opacity={1 - kprog(T, K.Ab + 3.4, K.Ab + 3.8)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · por dentro del agua: CO2 + H2O → H2CO3 → H+ + HCO3- */}
      <Escena T={T} a={K.Ac} b={K.Es} zoom={0.12}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 45%, #13305a 0%, #0d1424 75%)' }}></div>
        <Ambiente T={T} n={36} color="rgba(150,210,255,.25)" />
        {svg(<>{forma < 1 && <><AcCO2 x={klerp(190, 440, choque)} y={790} s={1.4} o={1 - forma} rot={Math.sin(T * 2) * 8} /><AcH2O x={klerp(880, 650, choque)} y={760} s={1.4} o={1 - forma} /></>}
          {forma > 0 && <><AcH2CO3 x={540} y={790} o={forma * (1 - suelta)} s={1.5} />
            {suelta > 0 && <><g opacity={suelta}><AcCO3 x={540 + 120 * suelta} y={820 + 60 * suelta} s={1.4} atrapado={1} /></g><AcHmas x={540 - 250 * suelta} y={790 - 200 * suelta} s={1.6} T={T} o={suelta} /></>}</>}
          <text x={540} y={1090} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Ac + 0.4, K.Ac + 0.8)}>CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻</text></>)}
        <EscalaFija texto="esquema de moléculas" largo={0} y={1480} />
      </Escena>
      <Etq T={T} at={K.Ac + 0.4} until={K.Ac + 1.4} x={60} y={900} texto="dióxido de carbono" tam={30} />
      <Etq T={T} at={K.Ac + 0.4} until={K.Ac + 1.4} x={1000} y={900} texto="agua" lado="izq" tam={30} />
      <Etq T={T} at={K.Ac + 1.7} until={K.Ac + 2.4} x={300} y={950} texto="ácido carbónico" tam={30} />
      <Etq T={T} at={K.Ac + 2.8} until={K.Es - 0.1} x={340} y={700} texto="ion de hidrógeno" tam={30} color={AC_H} />
      {/* 4 · la escala de pH: 7 neutro; antes de la Revolución Industrial, 8.2 */}
      <Escena T={T} a={K.Es} b={K.Me}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><AcRegla y={820} />
          <text x={180} y={760} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#b8231c">ÁCIDO</text>
          <text x={900} y={760} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#1d36c9">BÁSICO</text>
          <AcMarca x={540} y={1010} texto="7 = neutro" arriba={false} o={kprog(T, K.Es + 0.4, K.Es + 0.8)} />
          <AcMarca x={90 + 8.2 / 14 * 900} y={800} texto="8.2" color={KC.blue} tam={52} o={kprog(T, K.Es + 2.4, K.Es + 2.8)} /></>)}
      </Escena>
      <Chip T={T} at={K.Es + 2.8} until={K.Me - 0.2} texto="el mar antes de la Revolución Industrial" y={1130} x={540} tam={30} borde={KC.blue} />
      {/* 5 · 1985: 8.11 → 2024: 8.04 */}
      <Escena T={T} a={K.Me} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<><AcRegla x0={140} x1={940} y={820} desde={8.0} hasta={8.2} paso={0.05} dec={2} />
          <AcMarca x={pxM(8.2)} y={800} texto="antes" tam={28} o={0.6} />
          <AcMarca x={pxM(8.11)} y={800} texto="1985" tam={36} o={kprog(T, K.Me + 0.3, K.Me + 0.7) * (T > K.Me + 2.6 ? 0.45 : 1)} />
          {T > K.Me + 1.2 && <AcMarca x={pxM(phM)} y={1010} texto={`${phM.toFixed(2)}`} arriba={false} color={KC.red} tam={48} />}
          {T > K.Me + 2.6 && <text x={pxM(8.04)} y={1140} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.red}>2024</text>}</>)}
        <EscalaFija texto="pH promedio de la superficie del mar (EEA 2026)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · re-gancho: 0.07 y la escala ×10 */}
      <Escena T={T} a={K.P} b={K.Po} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[[8, 1], [7, 10], [6, 100]].map(([ph, n], i) => { const x0 = 50 + i * 155, o = kprog(T, K.P + 1.6 + i * 0.5, K.P + 2.0 + i * 0.5);
          return <g key={i} opacity={o}><rect x={x0} y={820} width={140} height={260} rx={18} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: n }, (_, k) => <circle key={k} cx={n === 1 ? x0 + 70 : x0 + 16 + (k % 10) * 12.2} cy={n === 1 ? 950 : n === 10 ? 950 : 850 + Math.floor(k / 10) * 22} r={n === 100 ? 5 : 9} fill={AC_H} stroke={KC.ink} strokeWidth={n === 100 ? 1.5 : 3} />)}
            <text x={x0 + 70} y={1130} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>pH {ph}</text>
            {i > 0 && <text x={x0 - 8} y={800} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>×10</text>}</g>; })}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.P + 0.1} until={K.Po - 0.2} valor={0.07} desde={0.07} dec={2} sufijo="?" x={290} y={560} tam={190} color={KC.yellow} />
      {/* 7 · +18 % de acidez (1985 → 2024) */}
      <Escena T={T} a={K.Po} b={K.Ca}>
        <FondoLunares color={KC.mint} />
        {svg(<><AcFrasco x={290} y={1150} n={100} T={T} seed={4} etiqueta="1985" mostrar={kprog(T, K.Po + 0.1, K.Po + 0.8)} />
          <AcFrasco x={790} y={1150} n={118} T={T} seed={4} etiqueta="2024" mostrar={kprog(T, K.Po + 0.5, K.Po + 1.3)} /></>)}
        <EscalaFija texto="esquema: cada punto = H⁺" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <NumeroGigante T={T} at={K.Po + 0.9} until={K.Ca - 0.2} valor={18} dur={0.8} prefijo="+" sufijo=" %" etiqueta="más acidez" x={540} y={470} tam={170} color={KC.yellow} />
      {/* 8 · el H+ atrapa al carbonato: menos material para conchas */}
      <Escena T={T} a={K.Ca} b={K.Et}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #12305a 0%, #0d1424 75%)' }}></div>
        <Ambiente T={T} n={30} color="rgba(150,210,255,.22)" />
        {svg(<><AcOstion x={290} y={1040} s={1.1} /><AcCoral x={790} y={1090} s={1.0} T={T} />
          {iones.map(([ix, d, atrapa], i) => { const t0 = K.Ca + d, p = kprog(T, t0, t0 + 2.4, kEase.suave);
            const destino = ix < 540 ? 290 : 790, AJ = 0, at = atrapa ? kprog(T, t0 + 1.0, t0 + 1.4) : 0;
            const pp = atrapa ? Math.min(p, 0.42) : p;
            const xx = klerp(ix, destino, pp) + (atrapa ? at * (ix < 540 ? -60 : 60) * kprog(T, t0 + 1.4, t0 + 3) : 0), yy = klerp(640, destino === 290 ? 940 : 860, pp) - (atrapa ? 40 * kprog(T, t0 + 1.4, t0 + 3) : 0);
            const hx = klerp(ix + (ix < 540 ? -260 : 260), xx, kprog(T, t0 + 0.3, t0 + 1.0, kEase.suave));
            return <g key={i} opacity={kprog(T, t0, t0 + 0.3) * (atrapa ? 1 - 0.4 * kprog(T, t0 + 2.0, t0 + 3) : 1 - kprog(T, t0 + 2.3, t0 + 2.6))}>
              <AcCO3 x={xx} y={yy} s={1.05} atrapado={at} />
              {atrapa && at < 1 && <AcHmas x={hx} y={yy - 90} T={T} s={1.1} />}</g>; })}</>)}
        <EscalaFija texto="esquema de moléculas" largo={0} y={1480} />
      </Escena>
      <Etq T={T} at={K.Ca + 0.6} until={K.Et - 0.2} x={120} y={920} texto="ostión" tam={30} />
      <Etq T={T} at={K.Ca + 1.0} until={K.Et - 0.2} x={1010} y={1000} texto="coral" lado="izq" tam={30} />
      <Chip T={T} at={K.Ca + 0.3} until={K.Et - 0.2} texto="el H⁺ atrapa al carbonato (CO₃²⁻)" y={470} x={400} tam={30} borde={AC_H} />
      {/* 9 · el estudio de 2012: mariposas de mar vivas cerca de la Antártida */}
      <Escena T={T} a={K.Et} b={K.Ex}>
        <FondoLunares color={KC.cyan} />
        {svg(<><AcAntartida x={250} y={1030} r={120} T={T} />
          <g opacity={kprog(T, K.Et + 2.4, K.Et + 2.9)}><circle cx={730} cy={960} r={250} fill="#06121c" stroke={KC.white} strokeWidth={10} />
            <AcPteropodo x={700} y={960} s={0.95} dis={0.15 + 0.6 * kprog(T, K.Et + 3.0, K.Et + 5.5)} T={T} seed={7} /></g></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <TarjetaEstudio T={T} at={K.Et + 0.2} until={K.Et + 2.6} anio="2012" quien="Bednaršek y colegas" revista="Nature Geoscience · océano Austral" x={600} y={560} />
      <Etq T={T} at={K.Et + 0.8} until={K.Ex - 0.2} x={200} y={790} texto="Antártida" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Et + 3.0} until={K.Ex - 0.2} x={330} y={680} texto="Limacina helicina antarctica" it tam={28} color={KC.white} />
      <Chip T={T} at={K.Et + 4.6} until={K.Ex - 0.2} texto="al microscopio: concha muy disuelta" y={470} x={660} tam={28} borde={KC.red} />
      {/* 10 · el experimento: agua como la esperada para 2100, 45 días */}
      <Escena T={T} a={K.Ex} b={K.C}>
        <FondoLunares color={KC.orange} />
        {svg(<><rect x={0} y={1120} width={KW} height={800} fill="#9a6b45" stroke={KC.ink} strokeWidth={8} />
          <rect x={300} y={560} width={480} height={560} rx={40} fill="rgba(95,182,239,.6)" stroke={KC.ink} strokeWidth={9} />
          <rect x={340} y={520} width={400} height={54} rx={12} fill="#e9eef5" stroke={KC.ink} strokeWidth={7} />
          <rect x={360} y={1000} width={360} height={70} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
          <text x={540} y={1046} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>agua «año 2100»</text>
          <text x={540} y={640} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>concha de mariposa de mar</text>
          <AcPteropodo x={540} y={810 + flota(T) * 0.5} s={0.85} dis={disE} alas={0} T={T} seed={11} /></>)}
      </Escena>
      {kvisible(T, K.Ex, K.C) && (() => { const d = Math.round(45 * kprog(T, K.Ex + 0.8, K.Ex + 6.6)); return <div style={{ position:'absolute', left:760, top:430, zIndex:41, transform:'translate(-50%,-50%)', font:`700 80px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, whiteSpace:'nowrap', opacity:kprog(T, K.Ex, K.Ex + 0.4) * (1 - kprog(T, K.C, K.C + 0.4)) }}>{d} {d === 1 ? 'día' : 'días'}</div>; })()}
            <Chip T={T} at={K.Ex + 2.0} until={K.C - 0.2} texto="experimento que muestra la NOAA" y={1170} x={540} tam={28} borde={KC.ink} />
      {/* 11 · cierre: el mismo mar y el mismo medidor, la concha ya picada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><AcMar T={T} tope={960} /><AcMedidor x={320} y={740} r={240} ph={8.04} />
          <AcPteropodo x={760} y={1000 + flota(T)} s={0.6} dis={0.7} T={T} rot={-10} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* chips del gancho y el cierre */}
      <Chip T={T} at={K.G + 1.2} until={K.Ab - 0.2} texto="pH arriba de 7 = básico" y={420} x={330} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ab + 0.3} until={K.Ac - 0.2} texto="≈ 1/4 del CO₂ que emitimos" y={420} x={540} tam={38} borde={AC_AGUA} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="básico… pero menos" y={420} x={330} tam={36} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ab - 0.1} texto="No se vuelve ácido: *se vuelve menos básico.*" />
      <Subtitulo T={T} idx={1} at={K.Ab + 0.1} until={K.Ac - 0.1} texto="Se traga *¼ del CO₂* que emitimos." />
      <Subtitulo T={T} idx={2} at={K.Ac + 0.1} until={K.Es - 0.1} texto="CO₂ + agua = *ácido carbónico.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Me - 0.1} texto="Antes de la industria: *pH 8.2.*" />
      <Subtitulo T={T} idx={4} at={K.Me + 0.1} until={K.P - 0.1} texto="1985: 8.11 · *2024: 8.04*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Po - 0.1} texto="Cada punto de pH: *×10.*" />
      <Subtitulo T={T} idx={6} at={K.Po + 0.1} until={K.Ca - 0.1} texto="*18 % más acidez* (1985–2024)" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.Et - 0.1} texto="Menos carbonato *para sus conchas.*" />
      <Subtitulo T={T} idx={8} at={K.Et + 0.1} until={K.Ex - 0.1} texto="2012: conchas *muy disueltas.*" />
      <Subtitulo T={T} idx={9} at={K.Ex + 0.1} until={K.C - 0.1} texto="Agua de 2100: *45 días.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Sigue básico, *pero ya se nota.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Acido + 0.6, CUES.Escala - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Medicion + 0.5, CUES.Pregunta - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Porcentaje - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Carbonato + 2.3, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.Experimento - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Experimento + 3.8, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.7, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="29" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AcidificacionApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AcidificacionShot /></CompositionStage></div>;
}
window.AcidificacionApp = AcidificacionApp;
