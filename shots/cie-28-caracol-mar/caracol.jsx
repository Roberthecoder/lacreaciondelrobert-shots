// Shot Científico #28 · El mar del caracol no es el mar — NARRADO (N1 "Por dentro" + N5 la prueba del vaso).
// Datos: Vermeij (UC Davis) en HuffPost 2018, Wikipedia «Seashell resonance», California Magazine (Berkeley) 2007. Ver guion.md y verificacion.md.
// Dibujo esquemático: las ondas, la concha en corte y los tamaños no van a escala; no hay cifras.
const CA_ARENA = '#f6d7b0', CA_RAYA = '#c99a66', CA_LABIO = '#f9a8b6', CA_HUECO = '#c4566e', CA_MAR = '#2f8fe0';
const CA_SONIDOS = [KC.cyan, KC.orange, KC.pink, '#ffffff'];

// Caracol de mar visto de lado. (x, y) = centro de la boca (apertura), que es lo que se pega a la oreja.
// La concha se extiende hacia la izquierda (voltea = true la manda a la derecha).
function Caracol({ x, y, s = 1, rot = 0, voltea = false, brillo = 0 }) {
  const tops = [[-100, -75], [-50, -95], [0, -112], [50, -118], [100, -108]];
  const bandas = [[-160, -38, 30], [-115, -70, 55], [-65, -90, 80], [-10, -108, 105]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${voltea ? -s : s} ${s}) translate(-120 -10)`}>
    {brillo > 0 && <ellipse cx={120} cy={10} rx={110} ry={140} fill={KC.yellow} opacity={0.35 * brillo} />}
    {tops.map(([tx, ty], i) => <path key={i} d={`M ${tx - 14} ${ty + 6} L ${tx} ${ty - 30} L ${tx + 14} ${ty + 6} Z`} fill={CA_ARENA} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />)}
    <path d="M -210 -5 C -170 -40 -90 -95 0 -110 C 110 -128 185 -70 195 -5 C 205 70 140 125 40 120 C -50 116 -150 55 -210 -5 Z" fill={CA_ARENA} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {bandas.map(([bx, t, b], i) => <path key={i} d={`M ${bx - 8} ${t + 4} Q ${bx + 26} ${(t + b) / 2} ${bx - 8} ${b - 4}`} fill="none" stroke={CA_RAYA} strokeWidth={7} strokeLinecap="round" />)}
    <path d="M -120 40 Q -40 70 40 60" fill="none" stroke={CA_RAYA} strokeWidth={6} strokeLinecap="round" />
    <ellipse cx={120} cy={10} rx={72} ry={98} fill={CA_LABIO} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={128} cy={14} rx={44} ry={70} fill={CA_HUECO} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Puntos de la espiral de la concha en corte (local). f 0 = boca, 1 = punta del hueco.
const CA_C = [-40, 5];
function caEspiral(f) { const a = f * Math.PI * 3.2, r = 150 * Math.exp(-0.22 * a); return [CA_C[0] + Math.cos(a) * r, CA_C[1] + Math.sin(a) * r, r]; }
// Concha en corte: el hueco curvo por dentro, con sonidos que entran, rebotan y uno que se refuerza (ref 0..1).
function CaracolCorte({ x, y, s = 1, T = 0, ondas = 1, refuerzo = 0 }) {
  const N = 70, seg = [];
  for (let i = 0; i < N; i++) { const a = caEspiral(i / N), b = caEspiral((i + 1) / N); seg.push([a, b]); }
  const pl = Array.from({ length: N + 1 }, (_, i) => caEspiral(i / N)).map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -210 -5 C -170 -40 -90 -95 0 -110 C 110 -128 185 -70 195 -5 C 205 70 140 125 40 120 C -50 116 -150 55 -210 -5 Z" fill="#fbe9d2" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -200 -4 C -160 -30 -100 -70 -60 -80" fill="none" stroke={CA_RAYA} strokeWidth={3} />
    {[-185, -165, -145].map((xx, i) => <ellipse key={i} cx={xx} cy={-2} rx={6 + i * 3} ry={5 + i * 3} fill="#2a1730" stroke={KC.ink} strokeWidth={2} />)}
    {seg.map(([a, b], i) => <line key={'o' + i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={a[2] * 0.42 + 12} strokeLinecap="round" />)}
    {seg.map(([a, b], i) => <line key={'i' + i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#2a1730" strokeWidth={a[2] * 0.42 + 6} strokeLinecap="round" />)}
    {refuerzo > 0.01 && <polyline points={pl} fill="none" stroke={KC.gold2} strokeWidth={3 + 10 * refuerzo} strokeLinecap="round" strokeDasharray="22 18" strokeDashoffset={-T * 90} opacity={refuerzo} />}
    {ondas > 0 && Array.from({ length: 12 }, (_, i) => { const f = (T * 0.22 + i / 12) % 1, g = f < 0.5 ? f * 2 : 2 - f * 2; const p = caEspiral(g * 0.85);
      return <circle key={i} cx={p[0]} cy={p[1]} r={7 + p[2] * 0.04} fill={CA_SONIDOS[i % 4]} stroke={KC.ink} strokeWidth={2} opacity={ondas} />; })}
    {refuerzo > 0.01 && [0, 1, 2].map((i) => { const p = caEspiral(0.32), f = (T * 0.9 + i / 3) % 1;
      return <circle key={'r' + i} cx={p[0]} cy={p[1]} r={10 + f * 70 * refuerzo} fill="none" stroke={KC.gold2} strokeWidth={4} opacity={refuerzo * (1 - f)} />; })}
  </g>;
}

// Ola de mar dibujada (rizo).
function OlaMar({ x, y, s = 1, color = CA_MAR, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -80 34 Q -66 -46 12 -52 Q 74 -54 70 -4 Q 50 -30 22 -22 Q -2 -12 22 34 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 44 -30 Q 60 -26 62 -10" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Mar: franja de olas que se mueven. bravo 0..1 = más altas y rápidas.
function MarFranja({ x0, x1, y, T, bravo = 0, color = CA_MAR, alto = 40 }) {
  const amp = alto * (0.5 + bravo), lam = 140 - 40 * bravo, v = 60 + 220 * bravo, pts = [];
  for (let xx = x0; xx <= x1; xx += 8) pts.push(`${xx},${(y + Math.sin((xx + T * v) / lam * Math.PI * 2) * amp * 0.5).toFixed(1)}`);
  return <g><polygon points={`${x0},${y + amp + 60} ${pts.join(' ')} ${x1},${y + amp + 60}`} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {bravo > 0.3 && Array.from({ length: 6 }, (_, i) => { const xx = x0 + ((i * 97 + T * v) % (x1 - x0)); return <circle key={i} cx={xx} cy={y - amp * 0.6} r={8 + 6 * bravo} fill="#fff" stroke={KC.ink} strokeWidth={3} />; })}</g>;
}
function Refri({ x, y, s = 1 }) {   // (x, y) = base al centro
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-95} y={-470} width={190} height={470} rx={22} fill="#e8f1f6" stroke={KC.ink} strokeWidth={9} />
    <line x1={-95} y1={-320} x2={95} y2={-320} stroke={KC.ink} strokeWidth={7} />
    <rect x={58} y={-430} width={14} height={70} rx={7} fill="#9aa7b4" stroke={KC.ink} strokeWidth={4} />
    <rect x={58} y={-290} width={14} height={110} rx={7} fill="#9aa7b4" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-40} cy={-380} r={14} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Coche({ x, y, s = 1, color = KC.red, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 0 L -150 -50 Q -140 -70 -100 -72 L -60 -120 L 60 -120 L 110 -72 Q 150 -68 155 -40 L 155 0 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -45 -108 L 50 -108 L 85 -74 L -75 -74 Z" fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-90, 95].map((wx) => <g key={wx} transform={`translate(${wx} 4) rotate(${T * 400})`}><circle r={34} fill="#2a2a2a" stroke={KC.ink} strokeWidth={6} /><line x1={-20} y1={0} x2={20} y2={0} stroke="#888" strokeWidth={6} /></g>)}
  </g>;
}
function Globo({ x, y, s = 1, texto = 'bla bla', o = 1, color = '#fff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -110 -50 Q -110 -90 -70 -90 L 70 -90 Q 110 -90 110 -50 L 110 0 Q 110 40 70 40 L -30 40 L -70 80 L -60 40 L -70 40 Q -110 40 -110 0 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
function Viento({ x, y, T, s = 1, color = '#fff', o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{[0, 1, 2].map((i) => { const dx = ((T * 120 + i * 60) % 180) - 90;
    return <path key={i} d={`M ${dx - 80} ${i * 40} Q ${dx} ${i * 40 - 20} ${dx + 60} ${i * 40} Q ${dx + 100} ${i * 40 + 18} ${dx + 80} ${i * 40 - 16}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />; })}</g>;
}
// Onda senoidal (tono): lam = largo de onda en px. Grave = larga, aguda = corta (esquemático).
function Tono({ x0, x1, y, amp = 60, lam = 200, T = 0, vel = 160, color = KC.gold2, p = 1 }) {
  if (p <= 0.01) return null;
  const xe = klerp(x0, x1, p), pts = [];
  for (let xx = x0; xx <= xe; xx += 4) pts.push(`${xx},${(y + Math.sin((xx - T * vel) / lam * Math.PI * 2) * amp).toFixed(1)}`);
  return <g><polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" /></g>;
}
function Corazon({ x, y, s = 1, late = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.14 * late)})`}>
    <path d="M 0 40 C -80 -10 -66 -80 -26 -80 C -8 -80 0 -62 0 -54 C 0 -62 8 -80 26 -80 C 66 -80 80 -10 0 40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -36 -56 Q -46 -40 -40 -26" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity=".7" />
  </g>;
}
// Vaso de lado: la boca en (x, y) pegada a la oreja; el fondo hacia la izquierda.
function VasoOreja({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -80 L -180 -58 L -180 58 L 0 80 Z" fill="rgba(200,240,255,.75)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={16} ry={80} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
    <path d="M -150 -40 L -40 -56" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".8" />
  </g>;
}
// Mano ahuecada sobre la oreja (vista de lado): una «C» de piel con dedos.
function ManoCopa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 10 -95 C -90 -100 -120 -20 -110 30 C -100 90 -40 110 15 95 L 15 70 C -40 78 -78 60 -82 20 C -86 -30 -60 -70 10 -68 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-60, -25, 10].map((yy) => <path key={yy} d={`M -100 ${yy} q -18 6 -16 22`} fill="none" stroke={CPIEL2} strokeWidth={5} strokeLinecap="round" />)}
    <rect x={-150} y={70} width={70} height={190} rx={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} transform="rotate(18 -115 70)" />
  </g>;
}
function Cama({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-160} width={40} height={170} rx={10} fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
    <rect x={-200} y={-70} width={430} height={70} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-90} width={290} height={70} rx={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
    <rect x={-185} y={-120} width={110} height={50} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Panel de espuma (cuarto muy silencioso): cuñas grises.
function Espuma({ x, y, w, h, o = 1 }) {
  const c = 70, filas = Math.ceil(h / c), cols = Math.ceil(w / c);
  return <g opacity={o}><rect x={x} y={y} width={w} height={h} fill="#4c4766" />
    {Array.from({ length: filas * cols }, (_, i) => { const cx = x + (i % cols) * c, cy = y + Math.floor(i / cols) * c, v = (i + Math.floor(i / cols)) % 2;
      return <path key={i} d={v ? `M ${cx} ${cy} L ${cx + c} ${cy} L ${cx + c / 2} ${cy + c} Z` : `M ${cx} ${cy + c} L ${cx + c} ${cy + c} L ${cx + c / 2} ${cy} Z`} fill={v ? '#5d5880' : '#3f3a59'} stroke="#2b2740" strokeWidth={2} />; })}</g>;
}

// Cabeza del inicio y del cierre (perfil a la derecha) con el caracol en la oreja.
const CH = { x: 560, y: 1020, s: 1.25 };
const OREJA = [CH.x - 75 * CH.s, CH.y + 10 * CH.s];

function CaracolMar() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const late = (t) => Math.pow(Math.max(0, Math.sin(t * Math.PI * 2 * 1.1)), 8);   // latido (también en gen-audio)
  const iconos = (t0, sale) => [[Refri, 170, 800, 0.38, t0], [Globo, 230, 640, 0.75, t0 + 0.3], [Coche, 430, 760, 0.55, t0 + 0.6]].map(([C, x, y, s, t], i) => {
    const e = kprog(T, t, t + 0.4, kEase.rebote), m = sale ? kprog(T, t + 0.6, t + 2.2, kEase.suave) : 0;
    const X = klerp(x, OREJA[0] - 120, m), Y = klerp(y, OREJA[1] - 20, m);
    return <g key={i} transform={`translate(${X} ${Y}) scale(${klerp(0.2, 1, e) * (1 - 0.6 * m)})`} opacity={kprog(T, t, t + 0.15)}><C x={0} y={0} s={s} T={T} texto="bla" /></g>; });
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el caracol en la oreja; salen olas… y se tachan: es el ruido del lugar */}
      <Escena T={T} a={K.Gancho} b={K.Ruido}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} />
          {T < K.Gancho + 3.0 && Array.from({ length: 4 }, (_, i) => { const f = ((T - K.Gancho) * 0.45 + i / 4) % 1;
            return <OlaMar key={i} x={OREJA[0] - 260 - f * 160 + i * 20} y={OREJA[1] - 170 - f * 280} s={0.7 + f * 0.4} o={(1 - f) * (1 - kprog(T, K.Gancho + 2.4, K.Gancho + 3.0))} />; })}
          {T > K.Gancho + 2.0 && T < K.Gancho + 3.2 && <g opacity={1 - kprog(T, K.Gancho + 2.8, K.Gancho + 3.2)}>
            {[[-1, 1], [1, 1]].map(([a], i) => <line key={i} x1={OREJA[0] - 420} y1={OREJA[1] - 420 + (a < 0 ? 0 : 0)} x2={klerp(OREJA[0] - 420, OREJA[0] - 120, kprog(T, K.Gancho + 2.05 + i * 0.12, K.Gancho + 2.3 + i * 0.12))}
              y2={klerp(OREJA[1] - 420, OREJA[1] - 140, kprog(T, K.Gancho + 2.05 + i * 0.12, K.Gancho + 2.3 + i * 0.12))} stroke={KC.red} strokeWidth={26} strokeLinecap="round" transform={i ? `rotate(90 ${OREJA[0] - 270} ${OREJA[1] - 280})` : undefined} />)}
          </g>}
          {iconos(K.Gancho + 2.9, true)}
          <Caracol x={OREJA[0] + 6} y={OREJA[1] - 6} s={1.05} rot={-12 + Math.sin(T * 2.4) * 3} brillo={kprog(T, K.Gancho + 4.3, K.Gancho + 4.7)} />
          {T > K.Gancho + 4.2 && [0, 1, 2].map((i) => { const f = ((T * 0.9 + i / 3) % 1); return <circle key={i} cx={OREJA[0] - 140} cy={OREJA[1] - 30} r={30 + f * 150} fill="none" stroke={KC.yellow} strokeWidth={9} opacity={(1 - f) * kprog(T, K.Gancho + 4.2, K.Gancho + 4.6)} />; })}
          <TextoSvg x={320} y={480} tam={110} color={KC.yellow} rot={-5} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.05, K.Gancho + 0.45, kEase.rebote))} o={1 - kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)}>¿EL MAR?</TextoSvg>
          {T > K.Gancho + 2.1 && <line x1={110} y1={445} x2={klerp(110, 540, kprog(T, K.Gancho + 2.1, K.Gancho + 2.35))} y2={klerp(445, 420, kprog(T, K.Gancho + 2.1, K.Gancho + 2.35))} stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={1 - kprog(T, K.Gancho + 2.8, K.Gancho + 3.1)} />}
          <TextoSvg x={320} y={480} tam={92} color={KC.texto} rot={-5} s={klerp(0.5, 1, kprog(T, K.Gancho + 2.9, K.Gancho + 3.3, kEase.rebote))} o={kprog(T, K.Gancho + 2.9, K.Gancho + 3.1)}>¡ES TU RUIDO!</TextoSvg>
        </Lienzo>
        <Etq T={T} at={K.Gancho + 4.3} until={K.Ruido - 0.2} x={OREJA[0] - 170} y={OREJA[1] + 170} texto="rebota adentro" lado="der" color={KC.texto} />
      </Escena>

      {/* 1 · el ruido de siempre: voces, refri, viento, coches */}
      <Escena T={T} a={K.Ruido} b={K.Cavidad}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill="#e0a35a" stroke={KC.ink} strokeWidth={9} />
          <defs><clipPath id="caVentana"><rect x={630} y={420} width={380} height={300} /></clipPath></defs>
          <rect x={630} y={420} width={380} height={300} fill="#9fe3ff" />
          <g clipPath="url(#caVentana)">
            <rect x={630} y={640} width={380} height={80} fill="#555b66" />
            <Coche x={520 + ((T - K.Ruido) * 160) % 620} y={690} s={0.45} T={T} color={KC.red} />
            <Coche x={1100 - ((T - K.Ruido) * 120) % 620} y={700} s={0.4} T={-T} color={KC.blue} />
            <Viento x={760} y={470} T={T} s={0.8} />
            <Nube x={900} y={470} s={0.4} />
          </g>
          <rect x={630} y={420} width={380} height={300} fill="none" stroke={KC.ink} strokeWidth={12} />
          <line x1={820} y1={420} x2={820} y2={720} stroke={KC.ink} strokeWidth={9} />
          <rect x={330} y={700} width={190} height={450} fill="#3a2a22" stroke={KC.ink} strokeWidth={10} />
          <path d="M 330 700 L 400 730 L 400 1180 L 330 1150 Z" fill="#a8703f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <Refri x={170} y={1150} s={0.95} />
          {[0, 1].map((i) => { const f = ((T - K.Ruido) * 0.35 + i / 2) % 1; return <Globo key={i} x={440 + f * 60} y={760 - f * 110} s={0.42} o={(1 - f) * kprog(T, K.Ruido + 0.4, K.Ruido + 0.8)} texto="bla" />; })}
          <PersonaSimple x={740} yPies={1210} alto={470} color={KC.cyan} />
          <Caracol x={808} y={798} s={0.36} voltea rot={8} />
          <OndasArco x={280} y={880} ang={-12} T={T} color={KC.cyan} largo={330} o={0.4 + 0.6 * kprog(T, K.Ruido + 4.1, K.Ruido + 4.4)} />
          <OndasArco x={520} y={780} ang={0} T={T * 0.9} color={KC.pink} largo={200} o={0.4 + 0.6 * kprog(T, K.Ruido + 3.2, K.Ruido + 3.5)} />
          <OndasArco x={780} y={725} ang={95} T={T * 1.1} color="#ffffff" largo={60} n={3} o={0.4 + 0.6 * kprog(T, K.Ruido + 4.7, K.Ruido + 5.0)} />
          <OndasArco x={920} y={725} ang={110} T={T * 1.2} color={KC.orange} largo={90} n={3} o={0.4 + 0.6 * kprog(T, K.Ruido + 5.4, K.Ruido + 5.7)} />
        </Lienzo>
        <Chip T={T} at={K.Ruido + 1.6} until={K.Cavidad - 0.2} texto="aunque no lo notes" x={330} y={470} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Ruido + 3.2} until={K.Cavidad - 0.2} x={520} y={650} texto="voces" lado="izq" color={KC.ink} />
        <Etq T={T} at={K.Ruido + 4.1} until={K.Cavidad - 0.2} x={180} y={1090} texto="refri" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Ruido + 4.7} until={K.Cavidad - 0.2} x={640} y={390} texto="viento" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Ruido + 5.4} until={K.Cavidad - 0.2} x={1010} y={770} texto="coches" lado="izq" color={KC.ink} />
      </Escena>

      {/* 2 · por dentro: el hueco curvo; los tonos rebotan y uno se refuerza */}
      <Escena T={T} a={K.Cavidad} b={K.Mar} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          {[0, 1, 2, 3].map((i) => <OndasArco key={i} x={1120} y={760 + i * 30} ang={180 + (i - 1.5) * 8} T={T * (0.8 + i * 0.15)} color={CA_SONIDOS[i]} largo={170} n={3} o={kprog(T, K.Cavidad + 0.2, K.Cavidad + 0.6)} />)}
          <CaracolCorte x={530} y={800} s={2.2} T={T} ondas={kprog(T, K.Cavidad + 0.6, K.Cavidad + 1.2)} refuerzo={kprog(T, K.Cavidad + 2.8, K.Cavidad + 4.0, kEase.sale)} />
        </Lienzo>
        <Chip T={T} at={K.Cavidad + 0.2} until={K.Mar - 0.2} texto="POR DENTRO · LA CONCHA" x={540} y={440} tam={38} borde={KC.cyan} mono />
        <Etq T={T} at={K.Cavidad + 1.0} until={K.Cavidad + 2.7} x={530 + 120 * 2.2 - 80} y={1090} texto="hueco curvo" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Cavidad + 3.0} until={K.Mar - 0.2} texto="algunos tonos se refuerzan" x={520} y={1165} tam={40} borde={KC.gold2} />
      </Escena>

      {/* 3 · el zumbido reforzado suena a olas */}
      <Escena T={T} a={K.Mar} b={K.Pregunta}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={80} y={660} width={920} height={480} rx={34} fill="rgba(10,12,20,.82)" stroke={KC.ink} strokeWidth={8} />
          {(() => { const pk = kprog(T, K.Mar + 0.3, K.Mar + 1.6, kEase.sale), g = krng(4), pts = [], base = 1040;
            for (let i = 0; i <= 80; i++) { const xx = 130 + i * 10.25, u = i / 80, ruido = 40 + 26 * Math.abs(Math.sin(T * 6 + i * 1.7)) + g() * 20;
              pts.push(`${xx},${(base - ruido - pk * 270 * Math.exp(-Math.pow((u - 0.38) / 0.08, 2))).toFixed(1)}`); }
            return <g><polygon points={`130,${base} ${pts.join(' ')} 950,${base}`} fill="rgba(0,210,255,.25)" />
              <polyline points={pts.join(' ')} fill="none" stroke={KC.cyan} strokeWidth={7} strokeLinejoin="round" />
              <circle cx={130 + 0.38 * 820} cy={base - 66 - pk * 270} r={18 * pk} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} /></g>; })()}
          <line x1={130} y1={1040} x2={950} y2={1040} stroke={KC.texto} strokeWidth={5} />
          <text x={130} y={1095} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>tonos graves</text>
          <text x={950} y={1095} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>agudos</text>
          <text x={980} y={720} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill="rgba(246,243,236,.7)">ruido dentro de la concha</text>
          {T > K.Mar + 3.0 && <MarFranja x0={0} x1={KW} y={600} T={T} bravo={0.2} alto={30 * kprog(T, K.Mar + 3.0, K.Mar + 3.6)} />}
          <Onomato T={T} at={K.Mar + 1.4} dur={1.3} x={300} y={560} texto="shhh…" color={KC.texto} tam={120} />
        </Lienzo>
        <Etq T={T} at={K.Mar + 1.0} until={K.Pregunta - 0.2} x={130 + 0.38 * 820 + 30} y={760} texto="reforzado" lado="der" color={KC.gold2} />
        <Chip T={T} at={K.Mar + 3.0} until={K.Pregunta - 0.1} texto="suena a olas" x={540} y={440} tam={46} borde={CA_MAR} />
      </Escena>

      {/* 4 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Mito} />

      {/* 5 · lo que mucha gente cree: la sangre cerca del oído */}
      <Escena T={T} a={K.Mito} b={K.Sangre}>
        <FondoLunares color={KC.coral} />
        <Lienzo>
          <CabezaPerfil x={600} y={860} s={1.2} />
          <path d="M 600 1120 C 600 1040 500 990 500 920 C 500 860 530 820 570 780" fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" opacity={kprog(T, K.Mito + 0.4, K.Mito + 0.9)} />
          <path d="M 600 1120 C 600 1040 500 990 500 920 C 500 860 530 820 570 780" fill="none" stroke={KC.red} strokeWidth={20} strokeLinecap="round" strokeDasharray="16 14" strokeDashoffset={T * 60} opacity={kprog(T, K.Mito + 0.4, K.Mito + 0.9)} />
          <Caracol x={600 - 75 * 1.2 + 6} y={872 - 6} s={0.8} rot={-12} />
          <Corazon x={700} y={1150} s={0.7} late={late(T)} />
        </Lienzo>
        <Lupa T={T} at={K.Mito + 1.4} until={K.Sangre - 0.2} x={275} y={500} r={140} fx={505} fy={950} tinte={KC.red} etiqueta="POR DENTRO · SANGRE"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a0c14" />
            <rect x={0} y={r - 70} width={r * 2} height={140} fill="#7a1726" />
            {Array.from({ length: 9 }, (_, i) => { const xx = ((t * 120 + i * 50) % (r * 2 + 80)) - 40, yy = r + Math.sin(i * 2.1) * 36;
              return <g key={i}><ellipse cx={xx} cy={yy} rx={30} ry={18} fill="#e8333f" stroke={KC.ink} strokeWidth={3} /><ellipse cx={xx} cy={yy} rx={14} ry={7} fill="#b31f2d" /></g>; })}</svg>} />
        <Chip T={T} at={K.Mito + 3.4} until={K.Sangre + 2.4} texto="no es lo principal" x={760} y={450} tam={42} borde={KC.red} />
      </Escena>

      {/* 6 · la prueba de que no es la sangre: en un cuarto muy silencioso casi no suena */}
      <Escena T={T} a={K.Sangre} b={K.Vaso}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Espuma x={0} y={300} w={KW} h={850} o={kprog(T, K.Sangre + 3.3, K.Sangre + 4.0)} />
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill={T > K.Sangre + 3.6 ? '#3a3552' : '#c7a2e8'} stroke={KC.ink} strokeWidth={9} />
          {[0, 1, 2].map((i) => <OndasArco key={i} x={[100, 980, 540][i]} y={[700, 640, 380][i]} ang={[10, 170, 90][i]} T={T * (1 + i * 0.2)} color={CA_SONIDOS[i]} largo={200} n={3} o={1 - kprog(T, K.Sangre + 3.3, K.Sangre + 3.8)} />)}
          <PersonaSimple x={540} yPies={1210} alto={520} color={KC.pink} />
          <Caracol x={609} y={758} s={0.4} voltea rot={8} />
          <Corazon x={540} y={960} s={0.45} late={late(T)} />
          <Onomato T={T} at={K.Sangre + 5.0} dur={1.4} x={820} y={820} texto="shh…" color={KC.texto} tam={60} />
        </Lienzo>
        <Medidor T={T} at={K.Sangre + 3.6} until={K.Vaso - 0.2} valor={(t) => klerp(0.75, 0.08, kprog(t, K.Sangre + 4.0, K.Sangre + 5.6, kEase.sale))} etiqueta="sonido del caracol"
          texto={(v) => (v > 0.4 ? 'fuerte' : 'casi nada')} x={60} y={560} ancho={590} color={KC.yellow} />
        <Etq T={T} at={K.Sangre + 3.8} until={K.Vaso - 0.2} x={470} y={960} texto="la sangre sigue" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Sangre + 3.6} until={K.Vaso - 0.2} texto="cuarto muy silencioso" x={540} y={440} tam={40} borde={KC.lilac} />
      </Escena>

      {/* 7 · haz la prueba: vaso o mano ahuecada */}
      <Escena T={T} a={K.Vaso} b={K.Tamano}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <CabezaPerfil x={300} y={860} s={0.85} />
          <CabezaPerfil x={800} y={860} s={0.85} />
          <g transform={`translate(${(1 - kprog(T, K.Vaso + 0.6, K.Vaso + 1.1, kEase.rebote)) * -400} 0)`}><VasoOreja x={300 - 64 + 8} y={868} s={0.85} rot={-6} /></g>
          <g transform={`translate(0 ${(1 - kprog(T, K.Vaso + 1.6, K.Vaso + 2.1, kEase.rebote)) * 700})`}><ManoCopa x={800 - 64 + 30} y={866} s={0.85} /></g>
          {[[150, 640], [640, 640]].map(([x, y], i) => [0, 1, 2].map((k) => { const f = ((T - K.Vaso) * 0.5 + k / 3) % 1;
            return <OlaMar key={i + '-' + k} x={x - f * 40 + k * 10} y={y - f * 150} s={0.5 + f * 0.2} o={(1 - f) * kprog(T, K.Vaso + 3.0, K.Vaso + 3.4)} />; }))}
        </Lienzo>
        <Chip T={T} at={K.Vaso + 0.3} until={K.Tamano - 0.2} texto="haz la prueba" x={380} y={440} tam={46} borde={KC.yellow} />
        <Etq T={T} at={K.Vaso + 1.1} until={K.Tamano - 0.2} x={250} y={1110} texto="vaso" lado="izq" color={KC.ink} />
        <Etq T={T} at={K.Vaso + 2.1} until={K.Tamano - 0.2} x={700} y={1110} texto="mano ahuecada" lado="izq" color={KC.ink} />
        <Chip T={T} at={K.Vaso + 3.2} until={K.Tamano - 0.2} texto="tu propio mar" x={790} y={540} tam={40} borde={CA_MAR} />
      </Escena>

      {/* 8 · el tamaño: hueco grande → tonos graves; chico → agudos (esquemático) */}
      <Escena T={T} a={K.Tamano} b={K.Lugar}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`scale(${1})`}><Caracol x={540} y={640} s={klerp(0.3, 1.25, kprog(T, K.Tamano + 0.2, K.Tamano + 0.7, kEase.rebote))} rot={0} /></g>
          <Tono x0={640} x1={1040} y={650} amp={80} lam={320} T={T} vel={140} color={KC.blue} p={kprog(T, K.Tamano + 1.5, K.Tamano + 2.4, kEase.sale)} />
          {T > K.Tamano + 3.6 && <Caracol x={420} y={1040} s={klerp(0.2, 0.55, kprog(T, K.Tamano + 3.6, K.Tamano + 4.0, kEase.rebote))} />}
          <Tono x0={500} x1={1040} y={1045} amp={40} lam={60} T={T} vel={140} color={KC.pink} p={kprog(T, K.Tamano + 3.9, K.Tamano + 4.6, kEase.sale)} />
        </Lienzo>
        <Chip T={T} at={K.Tamano + 0.3} until={K.Lugar - 0.2} texto="cambia con el tamaño" x={540} y={440} tam={42} borde={KC.ink} />
        <Etq T={T} at={K.Tamano + 2.0} until={K.Lugar - 0.2} x={300} y={830} texto="hueco grande → más grave" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Tamano + 4.2} until={K.Lugar - 0.2} x={200} y={1150} texto="hueco chico → más agudo" lado="der" color={KC.ink} />
      </Escena>

      {/* 9 · el lugar: calle con tráfico (mar bravo) contra recámara (mar tranquilo) */}
      <Escena T={T} a={K.Lugar} b={K.Cierre}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <rect x={0} y={810} width={KW} height={430} fill={KC.mint} />
          <line x1={0} y1={810} x2={KW} y2={810} stroke={KC.ink} strokeWidth={10} />
          {[[60, 160, 300], [240, 130, 380], [400, 170, 260], [600, 150, 340]].map(([x, w, h], i) => <g key={i}><rect x={x} y={700 - h} width={w} height={h} fill={['#7d6bb5', '#5b8fd6', '#c96b8b', '#6b9b7d'][i]} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 6 }, (_, k) => <rect key={k} x={x + 22 + (k % 2) * (w / 2)} y={700 - h + 30 + Math.floor(k / 2) * 70} width={w / 2 - 40} height={36} fill="#ffe9a8" stroke={KC.ink} strokeWidth={4} />)}</g>)}
          <rect x={0} y={700} width={KW} height={110} fill="#555b66" stroke={KC.ink} strokeWidth={7} />
          {[0, 1, 2].map((i) => <Coche key={i} x={((T - K.Lugar) * (220 + i * 60) + i * 400) % 1400 - 160} y={790 - (i % 2) * 40} s={0.5} T={T} color={[KC.red, KC.blue, KC.yellow][i]} />)}
          <OndasArco x={300} y={760} ang={-60} T={T * 1.4} color={KC.texto} largo={160} n={4} />
          <Cama x={330} y={1180} s={0.95} />
          <rect x={720} y={980} width={60} height={200} fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
          <path d="M 690 980 L 810 980 L 780 900 L 720 900 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          <g transform="translate(860 440)"><circle r={130} fill="#bfe8ff" stroke={KC.ink} strokeWidth={9} opacity={kprog(T, K.Lugar + 3.0, K.Lugar + 3.4)} />
            <defs><clipPath id="caMar1"><circle r={124} /></clipPath><clipPath id="caMar2"><circle r={104} /></clipPath></defs>
            <g clipPath="url(#caMar1)" opacity={kprog(T, K.Lugar + 3.0, K.Lugar + 3.4)}><MarFranja x0={-140} x1={140} y={20} T={T} bravo={1} alto={60} /></g></g>
          <g transform="translate(900 920)"><circle r={110} fill="#bfe8ff" stroke={KC.ink} strokeWidth={9} opacity={kprog(T, K.Lugar + 4.4, K.Lugar + 4.8)} />
            <g clipPath="url(#caMar2)" opacity={kprog(T, K.Lugar + 4.4, K.Lugar + 4.8)}><MarFranja x0={-120} x1={120} y={30} T={T} bravo={0} alto={22} /></g></g>
        </Lienzo>
        <Chip T={T} at={K.Lugar + 1.6} until={K.Cierre - 0.2} texto="calle con tráfico" x={330} y={290 + 160} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Lugar + 3.2} until={K.Cierre - 0.2} x={990} y={610} texto="mar bravo" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Lugar + 4.4} until={K.Cierre - 0.2} texto="tu recámara" x={330} y={880} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Lugar + 4.6} until={K.Cierre - 0.2} x={790} y={1060} texto="mar tranquilo" lado="izq" color={KC.ink} />
      </Escena>

      {/* 10 · cierre: la misma oreja del inicio; ahora se ve que es el ruido del cuarto, con eco */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} gesto="sonrie" />
          {iconos(K.Cierre + 0.3, true)}
          <Caracol x={OREJA[0] + 6} y={OREJA[1] - 6} s={1.05} rot={-12 + Math.sin(T * 2.4) * 3} brillo={kprog(T, K.Cierre + 1.8, K.Cierre + 2.4)} />
          {T > K.Cierre + 1.8 && [0, 1, 2].map((i) => { const f = ((T * 0.9 + i / 3) % 1); return <circle key={i} cx={OREJA[0] - 140} cy={OREJA[1] - 30} r={30 + f * 150} fill="none" stroke={KC.yellow} strokeWidth={9} opacity={(1 - f) * kprog(T, K.Cierre + 1.8, K.Cierre + 2.2)} />; })}
          {T > K.Cierre + 3.6 && Array.from({ length: 4 }, (_, i) => { const f = ((T - K.Cierre) * 0.4 + i / 4) % 1;
            return <OlaMar key={i} x={OREJA[0] - 260 - f * 160 + i * 20} y={OREJA[1] - 170 - f * 280} s={0.7 + f * 0.4} o={(1 - f) * kprog(T, K.Cierre + 3.6, K.Cierre + 4.0)} />; })}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.8} until={K.Outro - 0.1} texto="tu cuarto + eco" x={320} y={460} tam={46} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Ruido - 0.1} texto="No es el mar: *es tu ruido.*" />
      <Subtitulo T={T} idx={1} at={K.Ruido + 0.1} until={K.Cavidad - 0.1} texto="Siempre hay *ruido* alrededor." />
      <Subtitulo T={T} idx={2} at={K.Cavidad + 0.1} until={K.Mar - 0.1} texto="En el hueco *se refuerza.*" />
      <Subtitulo T={T} idx={3} at={K.Mar + 0.1} until={K.Pregunta - 0.1} texto="Suena *como olas.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Mito - 0.1} texto="¿Y si es *tu sangre?*" />
      <Subtitulo T={T} idx={5} at={K.Mito + 0.1} until={K.Sangre - 0.1} texto="Muchos creen: *es la sangre.*" />
      <Subtitulo T={T} idx={6} at={K.Sangre + 0.1} until={K.Vaso - 0.1} texto="En silencio *casi no suena.*" />
      <Subtitulo T={T} idx={7} at={K.Vaso + 0.1} until={K.Tamano - 0.1} texto="Prueba con *un vaso o tu mano.*" />
      <Subtitulo T={T} idx={8} at={K.Tamano + 0.1} until={K.Lugar - 0.1} texto="Más grande, *más grave.*" />
      <Subtitulo T={T} idx={9} at={K.Lugar + 0.1} until={K.Cierre - 0.1} texto="En la calle, *más bravo.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="El mar *lo traes tú.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Ruido + 0.3, K.Ruido + 3.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Cavidad + 2.4, K.Mar - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Mar + 2.6, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Mito + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Mito + 0.9, K.Mito + 3.4, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Sangre + 0.2, K.Sangre + 3.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Sangre + 4.0, K.Vaso - 0.1, 'avatar_03_aburrido_manos_mejillas', 'bajo-der'],
        [K.Vaso + 0.3, K.Vaso + 2.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Tamano + 2.0, K.Tamano + 4.8, 'avatar_08_recostado_mano', 'bajo-der'],
        [K.Lugar + 3.2, K.Lugar + 5.4, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 3.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="fisica" num="28" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function CaracolApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CaracolMar /></CompositionStage></div>;
}
window.CaracolApp = CaracolApp;
