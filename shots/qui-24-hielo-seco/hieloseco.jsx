// Shot Químico #24 · Ese humo no es humo (hielo seco y sublimación) — NARRADO (N1 por dentro + mito peligroso).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
// Regla de la verificación (opción A): el hielo seco va SIEMPRE en un vaso VACÍO (sin agua): la niebla sale de la humedad del aire.
const HIELO = '#f4fbff', HIELO_B = '#9fc3d6', NIEBLA = 'rgba(255,255,255,.62)', MESA = '#d9a066', CO2C = '#5b6170';
const VX = 420, VB = 1150, VW = 250, VH = 300;   // vaso: centro x, base y, ancho, alto

// Trozo de hielo seco (bloque blanco con escarcha).
function Trozo({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -40 -26 L 30 -32 L 44 18 L -10 30 L -46 14 Z" fill={HIELO} stroke={HIELO_B} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -26 -14 L 10 -18 M -20 6 L 20 0" stroke="#d6ecf6" strokeWidth={5} strokeLinecap="round" />
  </g>;
}
// Mesa (cubierta de madera) desde y hasta el fondo.
function Mesa({ y = VB }) {
  return <g><rect x={-20} y={y} width={KW + 40} height={KH - y} fill={MESA} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={y} width={KW + 40} height={26} fill="#b77d45" /></g>;
}
// Vaso de vidrio vacío.
function VasoVacio({ x = VX, y = VB, w = VW, h = VH }) {
  return <g>
    <path d={`M ${x - w / 2} ${y - h} L ${x - w / 2 + 16} ${y} L ${x + w / 2 - 16} ${y} L ${x + w / 2} ${y - h}`} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={x} cy={y - h} rx={w / 2} ry={16} fill="none" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${x - w / 2 + 26} ${y - h + 30} L ${x - w / 2 + 38} ${y - 30}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />
  </g>;
}
// Niebla que sale del borde, rebosa y cae por fuera hasta la mesa. f = intensidad 0..1.
function Niebla({ T, x = VX, y = VB - VH, w = VW, piso = VB, f = 1, n = 46, seed = 11, color = NIEBLA }) {
  if (f <= 0) return null;
  const R = krng(seed);
  const out = [];
  for (let i = 0; i < n; i++) {
    const lado = R() < 0.5 ? -1 : 1, ph = R(), vel = 0.28 + R() * 0.14, r0 = 22 + R() * 26, dx0 = (R() - 0.5) * w * 0.7;
    if (i / n > f) continue;
    const u = (T * vel + ph) % 1;
    let px, py;
    if (u < 0.3) { const k = u / 0.3; px = x + klerp(dx0, lado * (w / 2 + 10), k); py = y + 30 - Math.sin(k * Math.PI) * 55 - k * 20; }
    else { const k = (u - 0.3) / 0.7; px = x + lado * (w / 2 + 10 + 40 * k + 170 * k * k); py = klerp(y + 10, piso - 18, Math.pow(k, 0.8)); }
    const r = r0 * (1 + u * 0.9), o = Math.min(1, u * 6) * (1 - Math.pow(u, 3));
    out.push(<circle key={i} cx={px} cy={py} r={r} fill={color} opacity={o} />);
  }
  // capa densa dentro del vaso
  return <g>
    <ellipse cx={x} cy={y + 40} rx={w / 2 - 10} ry={46 * f} fill={color} />
    {out}
  </g>;
}
// Termómetro con columna que baja. frac 0..1 = altura de la columna.
function Termometro({ x, y0 = 620, y1 = 1100, frac = 1, color = '#2a6cff' }) {
  const h = (y1 - y0 - 40) * frac;
  return <g>
    <rect x={x - 40} y={y0 - 20} width={80} height={y1 - y0 + 50} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 12} y={y1 - 20 - h} width={24} height={h + 20} rx={10} fill={color} />
    <circle cx={x} cy={y1 + 10} r={34} fill={color} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={x + 18} x2={x + 36} y1={y0 + 20 + i * (y1 - y0 - 60) / 6} y2={y0 + 20 + i * (y1 - y0 - 60) / 6} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Báscula de cocina.
function Bascula({ x, y }) {
  return <g><rect x={x - 130} y={y - 30} width={260} height={70} rx={16} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 150} y={y - 50} width={300} height={22} rx={10} fill="#c9d2dc" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 70} y={y - 14} width={140} height={40} rx={6} fill="#20323f" />
    <text x={x} y={y + 16} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#7dffb0">0.45 kg</text></g>;
}
// Globo transparente que se infla (r en px).
function Globo({ x, y, r }) {
  if (r <= 2) return null;
  return <g><path d={`M ${x} ${y} L ${x} ${y - 30}`} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={x} cy={y - 30 - r * 1.1} rx={r} ry={r * 1.1} fill="rgba(220,240,255,.45)" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={x - r * 0.4} cy={y - 30 - r * 1.5} rx={r * 0.18} ry={r * 0.3} fill="#fff" opacity={0.7} />
    <path d={`M ${x - 12} ${y - 24} L ${x + 12} ${y - 24} L ${x} ${y - 36} Z`} fill={KC.ink} /></g>;
}
// Mano abierta (palma).
function Mano({ x, y, s = 1, color = '#f1b48f', guante = false }) {
  const c = guante ? '#3a7bd5' : color;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-54, -18, 18, 54].map((dx, i) => <rect key={i} x={dx - 16} y={-150 + (i === 0 || i === 3 ? 30 : 0)} width={32} height={120} rx={16} fill={c} stroke={KC.ink} strokeWidth={6} />)}
    <rect x={-104} y={-40} width={30} height={100} rx={15} fill={c} stroke={KC.ink} strokeWidth={6} transform="rotate(-35 -90 10)" />
    <rect x={-74} y={-60} width={148} height={150} rx={46} fill={c} stroke={KC.ink} strokeWidth={6} />
    {guante && <rect x={-80} y={70} width={160} height={50} rx={10} fill="#2a5aa0" stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Frasco con tapa de rosca.
function Frasco({ x, y, s = 1, tapaY = 0, tapaRot = 0, vapor = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -120 L 70 -120 Q 110 -100 110 -40 L 110 90 Q 110 120 80 120 L -80 120 Q -110 120 -110 90 L -110 -40 Q -110 -100 -70 -120 Z" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={8} />
    {vapor > 0 && <g opacity={vapor}>{[[-50, 40], [20, 20], [50, 70], [-20, -30], [40, -50], [-60, -60]].map(([dx, dy], i) => <circle key={i} cx={dx + Math.sin(T * 3 + i) * 8} cy={dy} r={42} fill="rgba(235,240,245,.85)" />)}</g>}
    <Trozo x={-30} y={96} s={0.7} rot={10} /><Trozo x={36} y={98} s={0.6} rot={-20} />
    <g transform={`translate(0 ${tapaY}) rotate(${tapaRot})`}>
      <rect x={-80} y={-170} width={160} height={52} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      {[-50, -20, 10, 40].map((dx) => <line key={dx} x1={dx + 6} x2={dx + 6} y1={-164} y2={-124} stroke={KC.ink} strokeWidth={4} />)}
    </g>
  </g>;
}
// Matraz antiguo (1835) con tapón de corcho.
function Matraz({ x, y, s = 1, tapon = { dy: 0, rot: 0 }, nieve = 1, vapor = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -220 L 40 -220 L 40 -110 Q 150 -60 150 40 Q 150 150 0 150 Q -150 150 -150 40 Q -150 -60 -40 -110 Z" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {vapor > 0 && <g opacity={vapor}>{[[-70, 40], [0, 10], [70, 50], [-30, -60], [30, -90], [0, -170]].map(([dx, dy], i) => <circle key={i} cx={dx + Math.sin(T * 2 + i) * 10} cy={dy} r={dy < -100 ? 30 : 56} fill="rgba(240,240,240,.85)" />)}</g>}
    <path d={`M -120 110 Q 0 ${150 - 70 * nieve} 120 110 Q 0 160 -120 110 Z`} fill="#fff" stroke="#c8d6de" strokeWidth={4} />
    <g transform={`translate(0 ${tapon.dy}) rotate(${tapon.rot} 0 -240)`}>
      <path d="M -50 -270 L 50 -270 L 40 -205 L -40 -205 Z" fill="#c08a4a" stroke={KC.ink} strokeWidth={7} />
    </g>
  </g>;
}
// Hielera de unicel abierta (tapa recargada a un lado).
function Hielera({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 -90 L 130 -90 L 115 90 L -115 90 Z" fill="#fbfbf7" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-80, -40], [-20, 10], [50, -30], [80, 40], [-60, 50], [20, 60]].map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r={5} fill="#d5d5cc" />)}
    <rect x={150} y={-160} width={34} height={240} rx={8} fill="#fbfbf7" stroke={KC.ink} strokeWidth={7} transform="rotate(14 167 -40)" />
    <Trozo x={-40} y={-96} s={0.6} /><Trozo x={30} y={-100} s={0.55} rot={30} />
  </g>;
}
// Pickup de lado. puerta 0..1 (se abre), ruedas giran con giro (grados).
function Pickup({ x, y, giro = 0, puerta = 0, cabeza = 0, T = 0, aire = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -380 -40 L -380 60 L 380 60 L 380 -40 L 60 -40 L 60 -200 L -150 -200 L -220 -40 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={70} y={-80} width={300} height={30} fill="#e0503f" stroke={KC.ink} strokeWidth={6} />
    {/* ventana con interior */}
    <path d="M -190 -60 L -130 -180 L 40 -180 L 40 -60 Z" fill="#cfefff" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${cabeza * 35} -60 -95)`}><circle cx={-60} cy={-125} r={30} fill="#8a5a3c" stroke={KC.ink} strokeWidth={5} /></g>
    <rect x={-80} y={-95} width={45} height={36} fill="#8a5a3c" stroke={KC.ink} strokeWidth={4} />
    {[-20, 2, 24].map((dx, i) => <rect key={i} x={dx - 4} y={-118 + (i % 2) * 6} width={22} height={58 - (i % 2) * 6} fill="#b98a55" stroke={KC.ink} strokeWidth={4} />)}
    {/* aire que da vueltas dentro (recircula) */}
    <g transform={`translate(-40 -120) rotate(${(T * 160) % 360})`} opacity={0.85 * (1 - aire)}>
      <path d="M 50 0 A 50 50 0 1 1 0 -50" fill="none" stroke={KC.blue} strokeWidth={6} strokeDasharray="12 10" />
      <path d="M 0 -50 l 16 -10 l -2 20 Z" fill={KC.blue} />
    </g>
    {/* puerta que se abre */}
    <g transform={`translate(-200 0) scale(${1 - puerta * 0.75} 1)`}><rect x={0} y={-40} width={190} height={96} fill={KC.coral} stroke={KC.ink} strokeWidth={8} /><rect x={140} y={-20} width={36} height={12} rx={6} fill={KC.ink} /></g>
    {aire > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${-420 + aire * 140 + i * 10} ${-150 + i * 40} l 90 0 m -24 -14 l 24 14 l -24 14`} fill="none" stroke={KC.blue} strokeWidth={7} strokeLinecap="round" opacity={aire} />)}
    {[-250, 250].map((wx) => <g key={wx} transform={`translate(${wx} 60) rotate(${giro})`}><circle r={70} fill="#2b2b2b" stroke={KC.ink} strokeWidth={8} /><circle r={30} fill="#bbb" /><rect x={-4} y={-30} width={8} height={60} fill="#777" /></g>)}
  </g>;
}

function HieloSeco() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Su: CUES.Sublima, In: CUES.Invisible, Nu: CUES.Nube, Pr: CUES.Pregunta, Ri: CUES.Riesgo, Es: CUES.Estudio, Th: CUES.Thilorier, Re: CUES.Regla, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: pinzas sueltan 3 trozos, niebla crece
  const baja = kprog(T, K.G, K.G + 0.35, kEase.sale);
  const caida = (i) => kprog(T, K.G + 0.3 + i * 0.06, K.G + 0.6 + i * 0.06, (p) => p * p);
  const niebla0 = kprog(T, K.G + 0.5, K.G + 2.2);
  const trozos = [[-50, 8], [20, -14], [60, 22]];
  const TrozosVaso = ({ cae }) => trozos.map(([dx, r], i) => <Trozo key={i} x={VX + dx} y={klerp(620, VB - 34 - (i === 1 ? 20 : 0), cae ? caida(i) : 1)} s={0.8} rot={r} />);
  // termómetro
  const enfria = kprog(T, K.Q + 1.0, K.Q + 3.0, kEase.suave);
  // red de CO2
  const red = [];
  for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) red.push([170 + c * 150 + (f % 2) * 75, 1150 - f * 130, (c + f) % 2 ? 90 : 0, f * 6 + c]);
  const sueltaT = (k) => K.Su + 1.2 + ((k * 7) % 11) * 0.25;
  // nube: moléculas de agua que se juntan
  const R2 = krng(31);
  const centros = [[450, 960], [690, 1010], [570, 830]];
  const aguas = Array.from({ length: 15 }, (_, i) => [300 + R2() * 520, 700 + R2() * 380, R2() * 6, centros[i % 3]]);
  const junta = kprog(T, K.Nu + 0.8, K.Nu + 3.0, kEase.suave), gota = kprog(T, K.Nu + 2.6, K.Nu + 3.3, kEase.rebote);
  const aleja = kprog(T, K.Nu + 4.0, K.Nu + 5.2, kEase.suave);
  // riesgo
  const rA = K.Ri, rB = K.Ri + 2.6, rC = K.Ri + 5.2;
  const globo = Math.sqrt(kprog(T, rA + 0.6, rA + 2.3, kEase.sale)) * 150;
  const sube = kprog(T, rB + 0.2, rB + 2.4, kEase.suave);
  // estudio
  const maneja = T < K.Es + 6.0 ? (T - K.Es) * 420 : 6.0 * 420;
  const desmayo = kprog(T, K.Es + 5.6, K.Es + 6.4, kEase.suave) * (1 - kprog(T, K.Es + 8.0, K.Es + 8.8, kEase.suave));
  const abre = kprog(T, K.Es + 7.6, K.Es + 8.1, kEase.sale);
  const o2 = T < K.Es + 7.6 ? klerp(1, 0.25, kprog(T, K.Es + 3.2, K.Es + 6.0)) : klerp(0.25, 1, kprog(T, K.Es + 7.7, K.Es + 9.0, kEase.sale));
  // Thilorier
  const vap = kprog(T, K.Th + 2.6, K.Th + 3.6);
  const tiembla = T > K.Th + 3.6 && T < K.Th + 4.7 ? Math.sin(T * 60) * 4 : 0;
  const vuela = kprog(T, K.Th + 4.7, K.Th + 5.6, kEase.sale);
  // regla
  const cambio = K.Re + 2.0;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: hielo seco en un vaso VACÍO, la niebla rebosa */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Mesa />
          <VasoVacio />
          <TrozosVaso cae />
          <Niebla T={T} f={niebla0} />
          <g transform={`translate(${VX + 10} ${klerp(260, 560, baja) - kprog(T, K.G + 0.5, K.G + 1.2) * 300})`}>
            <path d="M -14 0 L -34 -320 M 14 0 L 34 -320" stroke="#8b96a3" strokeWidth={16} strokeLinecap="round" />
            <path d="M -34 -320 L 34 -320" stroke="#8b96a3" strokeWidth={16} strokeLinecap="round" />
          </g>
        </SvgCapa>
        <Escala T={T} pxPorMm={3.2} objetivo={200} x={60} y={1400} color={KC.ink} />
      </Escena>
      {/* 1 · qué es: CO2 sólido a −78.5 °C */}
      <Escena T={T} a={K.Q} b={K.Su}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Trozo x={400} y={930} s={3.2} rot={-6} />
          <Mol tipo="co2" x={400} y={930} s={0.9 * kprog(T, K.Q + 0.4, K.Q + 0.9, kEase.rebote)} rot={Math.sin(T * 2) * 8} />
          <Termometro x={820} y0={640} y1={1090} frac={klerp(0.82, 0.08, enfria)} />
          <text x={820} y={600} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.blue} stroke={KC.ink} strokeWidth={3} paintOrder="stroke">{kformato(klerp(20, -78.5, enfria), 1)} °C</text>
          {enfria > 0.6 && [[760, 700], [880, 820], [770, 960], [870, 1040]].map(([fx, fy], i) => <path key={i} d={`M ${fx - 14} ${fy} l 28 0 M ${fx} ${fy - 14} l 0 28 M ${fx - 10} ${fy - 10} l 20 20 M ${fx + 10} ${fy - 10} l -20 20`} stroke="#fff" strokeWidth={4} opacity={kprog(T, K.Q + 2.2 + i * 0.1, K.Q + 2.6 + i * 0.1)} />)}
        </SvgCapa>
      </Escena>
      {/* 2–3 · sublimación: las moléculas se sueltan y se vuelven invisibles */}
      <Escena T={T} a={K.Su} b={K.Nu}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={60} y={1080} width={960} height={140} fill="rgba(160,210,240,.10)" />
          {red.map(([x, y, r, k], i) => {
            const t0 = sueltaT(k), fila = Math.round((1150 - y) / 130), libre = fila >= 2;
            const p = libre ? kprog(T, t0, t0 + 2.6, kEase.sale) : 0;
            const invis = kprog(T, K.In + 0.2, K.In + 1.2);
            const mx = x + p * (((k * 53) % 200) - 100) + (libre && p > 0 ? Math.sin(T * 3 + k) * 10 : Math.sin(T * 8 + k) * 3);
            const my = y - p * (520 + (k % 3) * 90);
            return <g key={i}>
              {p > 0 && invis > 0 && <circle cx={mx} cy={my} r={70} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={4} strokeDasharray="10 10" opacity={invis} />}
              <Mol tipo="co2" x={mx} y={my} s={0.62} rot={r + p * 200 + (p > 0 ? T * 40 : 0)} o={p > 0 ? 1 - 0.85 * invis : 1} />
            </g>;
          })}
        </SvgCapa>
        <Escala T={T} pxPorMm={2.68e8} objetivo={300} x={60} y={1400} />
      </Escena>
      {/* 4 · nube: el vapor de agua del aire se condensa en gotitas */}
      <Escena T={T} a={K.Nu} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:'#14294a' }}></div>
        <SvgCapa>
          <g opacity={1 - aleja}>
            <rect x={0} y={1080} width={KW} height={200} fill="rgba(120,200,255,.18)" />
            {[180, 420, 660, 900].map((x, i) => <Mol key={i} tipo="co2" x={x + Math.sin(T * 2 + i) * 14} y={1150} s={0.5} rot={T * 30 + i * 40} o={0.35} />)}
            {aguas.map(([x, y, ph, [cx, cy]], i) => {
              const ang = i * 2.39, px = klerp(x + Math.sin(T * 1.6 + ph) * 40, cx + Math.cos(ang) * 46, junta), py = klerp(y + Math.cos(T * 1.3 + ph) * 40, cy + Math.sin(ang) * 46, junta);
              return <Mol key={i} tipo="agua" x={px} y={py} s={0.75} rot={T * (60 - junta * 55) + ph * 50} o={1 - gota * 0.75} />;
            })}
            {centros.map(([cx, cy], i) => <g key={i} opacity={gota}><circle cx={cx} cy={cy} r={70 * gota} fill="rgba(255,255,255,.88)" stroke="#bfe8ff" strokeWidth={5} /><circle cx={cx - 22} cy={cy - 24} r={14 * gota} fill="#fff" /></g>)}
          </g>
          {aleja > 0 && <g opacity={aleja}>
            <rect x={0} y={0} width={KW} height={KH} fill={KC.mint} />
            <Mesa /><VasoVacio /><TrozosVaso /><Niebla T={T} f={1} />
            <circle cx={VX + 150} cy={VB - VH - 10} r={70} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="12 10" />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ri} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <g transform="translate(-120 40)"><Mesa y={VB} /><VasoVacio /><TrozosVaso /><Niebla T={T} f={1} /></g>
          <text x={300} y={820} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 700)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · riesgo: 250 L de gas · desplaza el oxígeno · quema por frío */}
      <Escena T={T} a={K.Ri} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T < rB && <g>
            <Bascula x={300} y={1100} />
            <Trozo x={300} y={1020} s={1.4} />
            <Globo x={300} y={980} r={globo} />
          </g>}
          {T >= rB && T < rC && <g>
            <rect x={170} y={640} width={560} height={480} fill="#fff7e8" stroke={KC.ink} strokeWidth={10} />
            <rect x={175} y={1115 - 330 * sube} width={550} height={330 * sube} fill="rgba(91,97,112,.35)" />
            {Array.from({ length: 6 }, (_, i) => <Mol key={i} tipo="co2" x={230 + i * 90} y={1080 - (i % 2) * 70 * sube - 120 * sube * ((i * 3) % 4) / 3} s={0.42} rot={T * 50 + i * 30} />)}
            {Array.from({ length: 6 }, (_, i) => { const y0 = 760 + (i % 3) * 110, yT = 680 + (i % 2) * 40; return <Mol key={i} tipo="o2" x={240 + i * 85 + Math.sin(T * 3 + i) * 10} y={klerp(y0, yT, sube)} s={0.42} rot={T * 40 + i * 50} />; })}
            <Personita x={640} y={1080} s={2.2} color={KC.yellow} />
            <Trozo x={300} y={1100} s={0.9} />
          </g>}
          {T >= rC && <g>
            <Mano x={440} y={1060} s={1.5} />
            <Trozo x={440} y={1020} s={1.2} />
            {[[360, 940], [520, 960], [430, 900]].map(([fx, fy], i) => <path key={i} d={`M ${fx - 16} ${fy} l 32 0 M ${fx} ${fy - 16} l 0 32 M ${fx - 11} ${fy - 11} l 22 22 M ${fx + 11} ${fy - 11} l -22 22`} stroke="#fff" strokeWidth={5} opacity={kprog(T, rC + 0.4 + i * 0.15, rC + 0.8 + i * 0.15)} />)}
            <Marca x={720} y={830} ok={false} s={1} o={kprog(T, rC + 0.6, rC + 1.0)} />
          </g>}
        </SvgCapa>
        {T >= rB && T < rC && <Etq T={T} at={rB + 0.6} until={rC - 0.3} x={740} y={720} texto="O₂ arriba" color={KC.ink} tam={34} />}
        {T >= rB && T < rC && <Etq T={T} at={rB + 1.2} until={rC - 0.3} x={740} y={1060} texto="CO₂ abajo" color={KC.ink} tam={34} />}
        {T < rB && globo > 10 && <Contador T={T} at={rA + 0.6} hasta={250} dur={1.7} sufijo=" L" x={300} y={560} tam={86} />}
      </Escena>
      {/* 7 · 2004, Alabama: la camioneta cerrada */}
      <Escena T={T} a={K.Es} b={K.Th}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill="#4a4a52" />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={((i * 260 - maneja) % 2080 + 2080) % 2080 - 300} y={1200} width={140} height={16} fill="#ffe11a" />)}
          <Pickup x={540} y={1050} giro={maneja * 0.8} puerta={abre} cabeza={desmayo} T={T} aire={abre * (1 - kprog(T, K.Th - 0.6, K.Th))} />
          {desmayo > 0.5 && <text x={480} y={820} style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink} opacity={desmayo}>z z z</text>}
        </SvgCapa>
        {T > K.Es + 3.0 && <div style={{ position:'absolute', left:190, top:1460, width:700, zIndex:41 }}>
          <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink, marginBottom:8 }}>oxígeno en la cabina (esquema)</div>
          <div style={{ height:36, borderRadius:18, background:'rgba(255,255,255,.6)', border:`5px solid ${KC.ink}`, overflow:'hidden' }}>
            <div style={{ width:`${o2 * 100}%`, height:'100%', background: o2 < 0.5 ? KC.red : KC.mint }}></div>
          </div>
        </div>}
      </Escena>
      {/* 8 · 1835, París: Thilorier y el tapón disparado */}
      <Escena T={T} a={K.Th} b={K.Re}>
        <FondoLunares color="#e9cf8f" punto="rgba(255,255,255,.25)" />
        <SvgCapa>
          <Mesa y={1150} />
          <g transform={`translate(${tiembla} 0)`}><Matraz x={520} y={1000} s={1.1} nieve={1} vapor={vap} T={T} tapon={{ dy: -vuela * 620, rot: vuela * 540 }} /></g>
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(120,80,30,.10)" />
        </SvgCapa>
        <SvgCapa z={42}><Onomato T={T} at={K.Th + 4.7} until={K.Re - 0.2} x={300} y={560} texto="¡PUM!" tam={130} color={KC.yellow} /></SvgCapa>
      </Escena>
      {/* 9 · la regla */}
      <Escena T={T} a={K.Re} b={K.Ci}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T < cambio ? <g>
            <Frasco x={330} y={1000} s={1.1} />
            <Mano x={770} y={1050} s={1.2} /><Trozo x={770} y={1010} s={1} />
            <Marca x={330} y={760} ok={false} o={kprog(T, K.Re + 0.3, K.Re + 0.7)} />
            <Marca x={770} y={760} ok={false} o={kprog(T, K.Re + 1.2, K.Re + 1.6)} />
          </g> : <g>
            <Hielera x={330} y={1010} s={1.1} />
            <Mano x={770} y={1050} s={1.2} guante /><Trozo x={770} y={1010} s={1} />
            <Marca x={330} y={760} ok o={kprog(T, cambio + 0.2, cambio + 0.6)} />
            <Marca x={770} y={760} ok o={kprog(T, cambio + 0.4, cambio + 0.8)} />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el mismo vaso del inicio, ahora explicado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Mesa /><VasoVacio /><TrozosVaso /><Niebla T={T} f={1} />
          {Array.from({ length: 4 }, (_, i) => { const u = (T * 0.35 + i / 4) % 1; return <g key={i} opacity={kprog(T, K.Ci + 1.4, K.Ci + 2.0) * (1 - u)}>
            <circle cx={VX + 170 + u * 140} cy={VB - VH + 40 + u * 230} r={56} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 9" />
            <text x={VX + 170 + u * 140} y={VB - VH + 50 + u * 230} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>CO₂</text></g>; })}
        </SvgCapa>
        <Escala T={T} pxPorMm={3.2} objetivo={200} x={60} y={1400} color={KC.ink} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿humo?" x={330} y={470} tam={56} />
      <Chip T={T} at={K.G + 3.1} until={K.Q - 0.3} texto="agua del aire, hecha nube" x={360} y={470} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Q + 0.3} until={K.Su - 0.3} texto="hielo seco = CO₂ sólido" x={540} y={1500} tam={46} borde={KC.blue} />
      <Etq T={T} at={K.Q + 0.9} until={K.Su - 0.3} x={260} y={1170} texto="dióxido de carbono" color={KC.ink} tam={32} />
      <Chip T={T} at={K.Su + 0.4} until={K.In - 0.2} texto="sólido → gas: sublimación" x={540} y={1500} tam={42} borde={KC.cyan} />
      <MitoTachado T={T} at={K.Su + 1.0} tacharEn={K.Su + 2.0} until={K.In - 0.2} texto="líquido" x={540} y={470} tam={48} />
      <Chip T={T} at={K.In + 0.3} until={K.Nu - 0.2} texto="sin color" x={340} y={1500} tam={44} borde={KC.mint} />
      <Chip T={T} at={K.In + 0.9} until={K.Nu - 0.2} texto="sin olor" x={740} y={1500} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.Nu + 0.4} until={K.Nu + 2.6} x={300} y={1230 - 600} texto="vapor de agua (H₂O)" color="#bfe8ff" tam={34} />
      <Chip T={T} at={K.Nu + 2.8} until={K.Nu + 3.9} texto="se condensan: gotitas" x={540} y={1500} tam={44} borde="#bfe8ff" />
      <Chip T={T} at={K.Nu + 4.4} until={K.Pr - 0.2} texto="millones de gotitas = niebla" x={540} y={1500} tam={40} borde="#bfe8ff" />
      <Chip T={T} at={K.Ri + 0.3} until={K.Ri + 2.4} texto="casi medio kilo → 250 litros de gas" x={540} y={1500} tam={36} borde={KC.blue} />
      <Chip T={T} at={K.Ri + 2.9} until={K.Ri + 5.0} texto="lugar cerrado: desplaza el oxígeno" x={540} y={1500} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ri + 5.5} until={K.Es - 0.3} texto="en la piel: quemadura por frío" x={540} y={1500} tam={38} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.0} anio="2004" quien="Mobile, Alabama · EUA" revista="CDC · MMWR 53(50)" x={540} y={600} />
      <Chip T={T} at={K.Es + 3.2} until={K.Es + 5.4} texto="45 kg de hielo seco · cabina cerrada" x={540} y={470} tam={34} borde={KC.coral} />
      <Chip T={T} at={K.Es + 5.6} until={K.Es + 7.5} texto="aire recirculando → se desmaya" x={540} y={470} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Es + 7.7} until={K.Th - 0.3} texto="abren la puerta → despierta" x={540} y={470} tam={36} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Th + 0.2} until={K.Th + 2.6} anio="1835" quien="Thilorier · París" revista="Comptes rendus · Académie des sciences" x={540} y={1560} />
      <Chip T={T} at={K.Th + 2.8} until={K.Th + 4.6} texto="frasco bien tapado…" x={540} y={1560} tam={42} borde={KC.orange} />
      <Chip T={T} at={K.Th + 4.8} until={K.Re - 0.3} texto="¡el tapón salió disparado!" x={540} y={1560} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Re + 0.3} until={cambio - 0.1} texto="nunca en frasco cerrado" x={540} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={cambio + 0.1} until={K.Ci - 0.2} texto="unicel sin cerrar · guantes gruesos" x={540} y={1500} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="lo blanco: gotitas de agua del aire" x={540} y={1500} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.Ci + 1.6} until={K.Ou} texto="CO₂: el gas que no ves" x={540} y={1620} tam={36} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es humo: *es agua del aire.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Su - 0.1} texto="CO₂ sólido: *−78.5 °C.*" />
      <Subtitulo T={T} idx={2} at={K.Su + 0.1} until={K.In - 0.1} texto="De sólido *directo a gas.*" />
      <Subtitulo T={T} idx={3} at={K.In + 0.1} until={K.Nu - 0.1} texto="Ese gas *no se ve.*" />
      <Subtitulo T={T} idx={4} at={K.Nu + 0.1} until={K.Pr - 0.1} texto="Lo blanco: *gotitas de agua.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Ri - 0.1} texto="¿Entonces *es inofensivo?*" />
      <Subtitulo T={T} idx={6} at={K.Ri + 0.1} until={K.Es - 0.1} texto="Encerrado, *desplaza el oxígeno.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Th - 0.1} texto="2004: *terminó desmayado.*" />
      <Subtitulo T={T} idx={8} at={K.Th + 0.1} until={K.Re - 0.1} texto="1835: *el tapón salió disparado.*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Ci - 0.1} texto="Nunca *en frasco cerrado.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es *tu aire hecho nube.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Sublima - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Invisible + 0.2, CUES.Nube + 1.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Nube + 3.0, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Riesgo + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Riesgo + 3.0, CUES.Estudio - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.5, CUES.Thilorier - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Thilorier + 1.0, CUES.Regla - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Regla + 0.3, CUES.Cierre - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="24" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HieloSecoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HieloSeco /></CompositionStage></div>;
}
window.HieloSecoApp = HieloSecoApp;
