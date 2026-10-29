// Shot Científico #16 · La Luna se aleja de ti casi 4 cm cada año — NARRADO (N2 "El número" + N3 espejos, láser y mareas).
// Datos: NASA/LPI 1994 (3.8 cm/año), Murphy 2013 (láser lunar, ≈ 2.5 s ida y vuelta), Williams y Boggs 2016, DiKerby 2025 (mareas),
// Yaemsiri et al. 2010 (uñas de las manos). Ver guion.md y verificacion.md. Dibujo esquemático: distancias y alejamiento exagerados.
const LN_CIELO_A = '#101a3c', LN_CIELO_B = '#3b2f6e', LN_LASER = '#39ff6a', LN_AGUA = '#3d8bff', LN_AGUA2 = '#8fd0ff', LN_TIERRA = '#2fb36b';
const lpol = (cx, cy, R, a) => [cx + R * Math.cos(a * Math.PI / 180), cy - R * Math.sin(a * Math.PI / 180)];

// La Luna con cráteres. panel: dibuja el panelito de espejos en su cara.
function LunaDib({ x, y, r = 100, panel = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.35} fill="#fff8d6" opacity={0.12} />
    <circle r={r} fill="#dcd8cf" stroke={KC.ink} strokeWidth={Math.max(5, r / 14)} />
    {[[-0.35, -0.3, 0.22], [0.3, 0.15, 0.16], [-0.1, 0.45, 0.12], [0.45, -0.4, 0.1], [-0.55, 0.2, 0.09]].map(([cx, cy, cr], i) =>
      <circle key={i} cx={cx * r} cy={cy * r} r={cr * r} fill="#b9b3a7" stroke={KC.ink} strokeWidth={Math.max(3, r / 30)} opacity=".9" />)}
    {panel > 0 && <g transform={`translate(${-r * 0.55} ${r * 0.35})`} opacity={panel}>
      <rect x={-r * 0.16} y={-r * 0.1} width={r * 0.32} height={r * 0.2} fill="#9aa4b5" stroke={KC.ink} strokeWidth={3} />
      {brillo > 0 && <circle r={r * 0.35 * brillo} fill={LN_LASER} opacity={0.5 * brillo} />}
    </g>}
  </g>;
}
// Tierra vista desde arriba: océano, continentes que giran (rot, grados) y el agua de las mareas.
// bulto 0..1 estira el agua en dos bultos sobre el eje `ang` (grados): uno hacia ese lado y otro al lado contrario.
function TierraDib({ x, y, r = 160, rot = 0, bulto = 0, ang = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {bulto > 0 && <ellipse rx={r * (1.04 + 0.42 * bulto)} ry={r * (1.04 - 0.02 * bulto)} transform={`rotate(${-ang})`} fill={LN_AGUA2} stroke={KC.ink} strokeWidth={8} />}
    <circle r={r} fill={LN_AGUA} stroke={KC.ink} strokeWidth={9} />
    <g transform={`rotate(${-rot})`}>
      <path d={`M ${-r * 0.55} ${-r * 0.55} C ${-r * 0.2} ${-r * 0.8} ${r * 0.15} ${-r * 0.6} ${r * 0.05} ${-r * 0.3} C ${-r * 0.05} ${-r * 0.05} ${-r * 0.35} ${r * 0.05} ${-r * 0.5} ${-r * 0.2} Z`} fill={LN_TIERRA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${r * 0.25} ${r * 0.05} C ${r * 0.6} ${-r * 0.1} ${r * 0.8} ${r * 0.25} ${r * 0.55} ${r * 0.55} C ${r * 0.35} ${r * 0.75} ${r * 0.1} ${r * 0.45} ${r * 0.25} ${r * 0.05} Z`} fill={LN_TIERRA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${-r * 0.6} ${r * 0.35} C ${-r * 0.45} ${r * 0.25} ${-r * 0.2} ${r * 0.45} ${-r * 0.3} ${r * 0.65} C ${-r * 0.45} ${r * 0.75} ${-r * 0.7} ${r * 0.55} ${-r * 0.6} ${r * 0.35} Z`} fill="#e9c46a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Flecha curva de giro (antihorario visto desde arriba) alrededor de (x, y). a0 = ángulo donde empieza (grados).
function FlechaGiro({ x, y, R, a0 = 0, largo = 110, color = KC.yellow, o = 1 }) {
  const [x1, y1] = lpol(x, y, R, a0), [x2, y2] = lpol(x, y, R, a0 + largo), t = (a0 + largo) * Math.PI / 180;
  const rotD = Math.atan2(-Math.cos(t), -Math.sin(t)) * 180 / Math.PI;
  return <g opacity={o}>
    <path d={`M ${x1} ${y1} A ${R} ${R} 0 0 0 ${x2} ${y2}`} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M ${x1} ${y1} A ${R} ${R} 0 0 0 ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />
    <path d="M 0 0 L -34 -21 L -34 21 Z" transform={`translate(${x2} ${y2}) rotate(${rotD})`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Rayo láser verde entre dos puntos (p = cuánto ya avanzó).
function Laser({ A, B, p = 1, o = 1, grosor = 10 }) {
  if (p <= 0.01 || o <= 0.01) return null;
  const X = klerp(A[0], B[0], p), Y = klerp(A[1], B[1], p);
  return <g opacity={o}>
    <line x1={A[0]} y1={A[1]} x2={X} y2={Y} stroke={LN_LASER} strokeWidth={grosor * 3.5} strokeLinecap="round" opacity=".3" />
    <line x1={A[0]} y1={A[1]} x2={X} y2={Y} stroke={KC.ink} strokeWidth={grosor + 6} strokeLinecap="round" />
    <line x1={A[0]} y1={A[1]} x2={X} y2={Y} stroke={LN_LASER} strokeWidth={grosor} strokeLinecap="round" />
  </g>;
}
// Pulso de luz que viaja de A a B (f 0..1).
function Pulso({ A, B, f, r = 18 }) {
  if (f <= 0 || f >= 1) return null;
  const x = klerp(A[0], B[0], f), y = klerp(A[1], B[1], f);
  return <g><circle cx={x} cy={y} r={r * 2.2} fill={LN_LASER} opacity=".3" /><circle cx={x} cy={y} r={r} fill="#eaffef" stroke={KC.ink} strokeWidth={5} /></g>;
}
// Destello en forma de estrella.
function Destello({ x, y, s = 1, o = 1, color = '#fff' }) {
  if (o <= 0.01) return null;
  return <path d="M 0 -60 L 12 -12 L 60 0 L 12 12 L 0 60 L -12 12 L -60 0 L -12 -12 Z" transform={`translate(${x} ${y}) scale(${s})`} fill={color} stroke={KC.ink} strokeWidth={5} opacity={o} />;
}
// Telescopio (con su cúpula) sobre la superficie. ang = hacia dónde apunta (grados, 0 = derecha).
function Telescopio({ x, y, s = 1, ang = 45 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-40} width={110} height={34} rx={10} fill="#e9e6f2" stroke={KC.ink} strokeWidth={7} transform={`rotate(${-ang} 0 -24)`} />
    <path d="M -70 20 A 70 70 0 0 1 70 20 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={14} width={160} height={40} rx={6} fill="#8a8fa8" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Astronauta sencillo (de frente). (x, y) = pies. brazo 0..1 lo baja para dejar el panel.
function Astronauta({ x, y, s = 1, paso = 0 }) {
  const bote = Math.abs(Math.sin(paso * Math.PI)) * 30;
  return <g transform={`translate(${x} ${y - bote}) scale(${s})`}>
    <rect x={-105} y={-330} width={70} height={170} rx={20} fill="#c9ccd6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-55} y={-150} width={50} height={150} rx={20} fill="#f4f4f4" stroke={KC.ink} strokeWidth={8} transform={`rotate(${Math.sin(paso * Math.PI * 2) * 12} -30 -150)`} />
    <rect x={5} y={-150} width={50} height={150} rx={20} fill="#f4f4f4" stroke={KC.ink} strokeWidth={8} transform={`rotate(${-Math.sin(paso * Math.PI * 2) * 12} 30 -150)`} />
    <rect x={-75} y={-330} width={150} height={200} rx={44} fill="#f4f4f4" stroke={KC.ink} strokeWidth={8} />
    <rect x={-40} y={-290} width={80} height={44} rx={8} fill="#d7dbe6" stroke={KC.ink} strokeWidth={5} />
    <rect x={-48} y={-232} width={96} height={18} rx={6} fill="#e63946" stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-395} r={78} fill="#f4f4f4" stroke={KC.ink} strokeWidth={8} />
    <path d="M -55 -410 Q 0 -460 55 -410 Q 60 -350 0 -345 Q -60 -350 -55 -410 Z" fill="#E8A62A" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 -415 Q -10 -435 15 -428" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".8" />
  </g>;
}
// Panel de espejitos (retrorreflector) en perspectiva: cuadrícula de 10 × 10 celdas redondas.
function PanelEspejos({ x, y, s = 1, T = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-120} y1={40} x2={-130} y2={120} stroke={KC.ink} strokeWidth={10} /><line x1={120} y1={40} x2={130} y2={120} stroke={KC.ink} strokeWidth={10} />
    <g transform="skewX(-12)">
      <rect x={-150} y={-90} width={300} height={140} rx={8} fill="#b8bfcc" stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), b = brillo * (0.5 + 0.5 * Math.sin(T * 6 + i * 1.7));
        return <circle key={i} cx={-135 + c * 30} cy={-78 + f * 13} r={5.4} fill={b > 0.55 ? '#fffbe0' : '#4c5a78'} stroke={KC.ink} strokeWidth={1.5} />; })}
    </g>
  </g>;
}
// Polvo lunar que sale al dejar algo.
function Polvo({ T, at, x, y }) {
  if (T < at || T > at + 1.4) return null;
  const f = kprog(T, at, at + 1.4, kEase.sale);
  return <g opacity={1 - f}>{Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.05 + 0.9 * i / 8);
    return <circle key={i} cx={x + Math.cos(a) * 200 * f * (i % 2 ? 1 : 0.7)} cy={y - Math.sin(a) * 70 * f} r={20 + 22 * f} fill="#cfcac0" />; })}</g>;
}
// Azotea de noche (gancho y cierre): cielo, estrellas, tinaco y una persona.
function Azotea({ T, luna, persona }) {
  return <g>
    <defs><linearGradient id="lnCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={LN_CIELO_A} /><stop offset="1" stopColor={LN_CIELO_B} /></linearGradient></defs>
    <rect width={KW} height={KH} fill="url(#lnCielo)" />
    <EstrellasFondo T={T} n={80} seed={4} alto={1150} />
    {luna}
    {[[60, 1010, 170, 190], [250, 940, 140, 260], [900, 980, 200, 220]].map(([x, y, w, h], i) => <g key={i}>
      <rect x={x} y={y} width={w} height={h + 200} fill="#241c45" stroke={KC.ink} strokeWidth={6} />
      {[0, 1].map((k) => <rect key={k} x={x + 26 + k * 60} y={y + 40} width={34} height={44} fill={(i + k) % 2 ? '#ffd76a' : '#3a3168'} />)}</g>)}
    <rect x={0} y={1180} width={KW} height={KH - 1180} fill="#c9785a" stroke={KC.ink} strokeWidth={10} />
    <rect x={0} y={1150} width={KW} height={44} fill="#e39a72" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(860 1150)">
      <rect x={-70} y={-200} width={140} height={200} rx={26} fill="#1c1c1f" stroke={KC.ink} strokeWidth={8} />
      <rect x={-80} y={-215} width={160} height={36} rx={12} fill="#2a2a2e" stroke={KC.ink} strokeWidth={7} />
      {[-140, -80].map((yy) => <line key={yy} x1={-66} y1={yy} x2={66} y2={yy} stroke="#3a3a40" strokeWidth={6} />)}
    </g>
    {persona}
  </g>;
}
// Regla horizontal (dentro de svg). marcas: [[fracción, texto]].
function ReglaH({ x, y, ancho, marcas = [], color = KC.paper, alto = 46 }) {
  return <g>
    <rect x={x} y={y} width={ancho} height={alto} rx={10} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 21 }, (_, i) => <line key={i} x1={x + ancho * i / 20} y1={y} x2={x + ancho * i / 20} y2={y + (i % 5 ? 16 : 28)} stroke={KC.ink} strokeWidth={4} />)}
    {marcas.map(([f, t], i) => <text key={i} x={x + ancho * f} y={y + alto + 46} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
  </g>;
}
// Mano horizontal (dedo índice hacia la derecha) con la uña que crece `crece` px.
function ManoUna({ x, y, crece = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-420} y={-40} width={300} height={150} rx={40} fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-60} width={210} height={190} rx={60} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {[40, 85].map((yy) => <rect key={yy} x={20} y={yy - 20} width={80} height={46} rx={23} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={20} y={-55} width={230} height={62} rx={31} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M 60 -55 C 70 -95 110 -100 120 -60" fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <rect x={190} y={-50} width={48 + crece} height={30} rx={12} fill="#fff4f0" stroke={KC.ink} strokeWidth={6} />
    <rect x={190} y={-50} width={48} height={30} rx={12} fill="#f7c9c0" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cortaúñas que cierra (c 0..1).
function Cortaunas({ x, y, s = 1, c = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-14} width={160} height={28} rx={12} fill="#c7cbd4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={-14} width={160} height={24} rx={12} fill="#e3e6ec" stroke={KC.ink} strokeWidth={7} transform={`rotate(${-18 + 18 * c} 70 0)`} />
    <rect x={-70} y={-60} width={140} height={22} rx={10} fill="#9aa1ae" stroke={KC.ink} strokeWidth={6} transform={`rotate(${-14 + 10 * c} 60 -30)`} />
  </g>;
}

function Luna() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // azotea: la Luna se aleja un poquito (exagerado)
  const lunaAz = (t0) => { const f = kprog(T, t0, t0 + 3.2, kEase.suave); return { x: klerp(300, 250, f), y: klerp(520, 430, f), r: klerp(118, 96, f), f }; };
  const LG = lunaAz(K.Gancho + 0.3), LC = lunaAz(K.Cierre + 1.6);
  // láser: Tierra abajo a la izquierda, Luna arriba a la derecha
  const E1 = [270, 1030], M1 = [800, 560], A1 = lpol(E1[0], E1[1], 200, 42), B1 = [M1[0] - 70, M1[1] + 50];
  const fire = K.Laser + 0.4, back = K.Laser + 1.5;
  const T0 = K.Tiempo + 0.4, cuenta = kclamp(T - T0, 0, 2.5);
  const ciclo = (t) => { const u = ((T - t) % 2.5 + 2.5) % 2.5; return T < t ? -1 : u; };
  // mareas, giro y empuje: misma vista desde arriba
  const E = [500, 850], RO = 380;
  const amG = 15 * kprog(T, K.Giro, K.Empuje, kEase.suave), lead = 24 * kprog(T, K.Giro + 2.6, K.Giro + 4.0, kEase.sale);
  const fE = kprog(T, K.Empuje + 0.4, K.Empuje + 3.4, kEase.suave), amE = 15 + 30 * kprog(T, K.Empuje, K.Unas, kEase.suave), RE = klerp(RO, 455, fE);
  const giro = (a, b, v0, v1) => { const u = kclamp(T - a, 0, b - a), k = (v1 - v0) / (b - a); return v0 * u + 0.5 * k * u * u; };
  const rotG = 55 * (T - K.Mareas), rotE = 55 * (K.Empuje - K.Mareas) + giro(K.Empuje + 3.4, K.Empuje + 6, 55, 34) + 55 * kclamp(T - K.Empuje, 0, 3.4);
  // uñas
  const L = 300, gU = kprog(T, K.Unas + 2.2, K.Unas + 5.0, kEase.suave);
  // cierre: cortaúñas
  const cortes = [K.Cierre + 0.6, K.Cierre + 1.3];
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.noche }}>
      {/* 0 · gancho: miras la Luna desde tu azotea y se aleja un poquito */}
      <Escena T={T} a={K.Gancho} b={K.Espejos} fondo={KC.noche}>
        <Lienzo>
          <Azotea T={T} luna={<>
            <circle cx={300} cy={520} r={118} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="10 12" opacity={0.5 * LG.f} />
            <LunaDib x={LG.x} y={LG.y} r={LG.r} />
            {LG.f > 0.05 && <FlechaRecta x1={310} y1={570} x2={klerp(310, 225, LG.f)} y2={klerp(570, 470, LG.f) } p={1} color={KC.yellow} grosor={10} punta={24} />}
          </>} persona={<PersonaSimple x={600} yPies={1170} alto={380} color={KC.cyan} cara="o" brazos={0.15} />} />
          <TextoSvg x={230} y={800} tam={110} color={KC.yellow} rot={-5} s={klerp(0.4, 1, kprog(T, K.Gancho + 0.6, K.Gancho + 1.0, kEase.rebote))} o={kprog(T, K.Gancho + 0.6, K.Gancho + 0.7)}>+3.8 CM</TextoSvg>
          <text x={230} y={860} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Gancho + 1.2, K.Gancho + 1.6)}>cada año (exagerado)</text>
        </Lienzo>
      </Escena>
      {/* 1 · 1969: el Apolo 11 deja un panel de espejitos */}
      <Escena T={T} a={K.Espejos} b={K.Laser} fondo={KC.noche}>
        <Lienzo>
          <rect width={KW} height={KH} fill="#05060d" />
          <EstrellasFondo T={T} n={90} seed={12} alto={1000} />
          <TierraDib x={230} y={470} r={70} rot={T * 8} />
          <path d="M 0 1000 Q 300 960 560 1000 T 1080 990 L 1080 1920 L 0 1920 Z" fill="#a9a59c" stroke={KC.ink} strokeWidth={9} />
          {[[200, 1120, 90], [780, 1250, 60], [480, 1200, 40], [950, 1080, 50]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.32} fill="#8e897f" stroke={KC.ink} strokeWidth={6} />)}
          {(() => { const ll = kprog(T, K.Espejos + 0.1, K.Espejos + 2.0, kEase.suave), deja = kprog(T, K.Espejos + 2.0, K.Espejos + 2.5, kEase.sale);
            const ax = klerp(-80, 330, ll), px = ax + 190, py = klerp(860, 1080, deja), fijo = T > K.Espejos + 2.5;
            return <g>
              <Polvo T={T} at={K.Espejos + 2.45} x={fijo ? 520 : px} y={1180} />
              <PanelEspejos x={fijo ? 520 : px} y={fijo ? 1080 : py} s={1} T={T} brillo={kprog(T, K.Espejos + 2.8, K.Espejos + 3.3)} />
              <Astronauta x={ax} y={1200} s={0.95} paso={ll < 1 ? (T - K.Espejos) * 1.6 : 0} />
              {[[400, 1000], [600, 1030], [470, 1060]].map(([x, y], i) => <Destello key={i} x={x} y={y} s={0.4 + 0.15 * Math.sin(T * 7 + i)} o={kprog(T, K.Espejos + 2.9 + i * 0.25, K.Espejos + 3.1 + i * 0.25) * (0.6 + 0.4 * Math.sin(T * 9 + i))} color="#fffbe0" />)}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Espejos + 0.3} until={K.Laser - 0.1} texto="1969 · Apolo 11" x={420} y={640} tam={48} borde={KC.gold} />
        <Etq T={T} at={K.Espejos + 3.2} until={K.Laser - 0.15} x={450} y={940} texto="panel de espejitos" lado="der" color={KC.texto} />
      </Escena>
      {/* 2 · desde la Tierra: láser que llega y rebota */}
      <Escena T={T} a={K.Laser} b={K.Tiempo} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <TierraDib x={E1[0]} y={E1[1]} r={200} rot={20} />
          <Telescopio x={A1[0] - 10} y={A1[1] + 20} s={0.8} ang={40} />
          <LunaDib x={M1[0]} y={M1[1]} r={100} panel={1} brillo={kprog(T, fire + 0.7, fire + 0.9) * (1 - kprog(T, back + 0.8, back + 1.3))} />
          <Laser A={A1} B={B1} p={kprog(T, fire, fire + 0.7)} o={1 - kprog(T, back - 0.1, back + 0.2)} />
          <Laser A={[B1[0] + 14, B1[1] + 14]} B={[A1[0] + 14, A1[1] + 14]} p={kprog(T, back, back + 0.7)} grosor={8} o={1 - kprog(T, K.Tiempo - 0.4, K.Tiempo)} />
          <Destello x={B1[0]} y={B1[1]} s={0.7} o={kprog(T, fire + 0.65, fire + 0.75) * (1 - kprog(T, back + 0.3, back + 0.8))} color={LN_LASER} />
          <Destello x={A1[0]} y={A1[1]} s={0.6} o={kprog(T, fire - 0.1, fire) * (1 - kprog(T, fire + 0.3, fire + 0.6))} color={LN_LASER} />
        </Lienzo>
        <Etq T={T} at={K.Laser + 0.5} until={K.Tiempo - 0.1} x={A1[0] + 70} y={A1[1] + 120} texto="láser" lado="der" color={KC.ink} tam={38} />
        <Etq T={T} at={back} until={K.Tiempo - 0.1} x={M1[0] - 120} y={M1[1] - 140} texto="rebota" lado="izq" color={KC.ink} tam={38} />
      </Escena>
      {/* 3 · ida y vuelta: ≈ 2.5 s */}
      <Escena T={T} a={K.Tiempo} b={K.Resultado} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <TierraDib x={E1[0]} y={E1[1]} r={200} rot={20 + (T - K.Tiempo) * 3} />
          <Telescopio x={A1[0] - 10} y={A1[1] + 20} s={0.8} ang={40} />
          <LunaDib x={M1[0]} y={M1[1]} r={100} panel={1} brillo={ciclo(T0) > 1.1 && ciclo(T0) < 1.5 ? 1 : 0} />
          <line x1={A1[0]} y1={A1[1]} x2={B1[0]} y2={B1[1]} stroke={LN_LASER} strokeWidth={6} strokeDasharray="6 14" opacity=".8" />
          {(() => { const u = ciclo(T0); if (u < 0) return null; return u < 1.25 ? <Pulso A={A1} B={B1} f={u / 1.25} /> : <Pulso A={B1} B={A1} f={(u - 1.25) / 1.25} />; })()}
          <TextoSvg x={330} y={560} tam={150} color={T > T0 + 2.5 ? KC.yellow : KC.texto}>{(T > T0 + 2.5 ? '≈ ' : '') + cuenta.toFixed(1) + ' S'}</TextoSvg>
          {T > T0 + 2.5 && <text x={330} y={640} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, T0 + 2.5, T0 + 2.8)}>ida y vuelta</text>}
          {T > K.Tiempo + 3.6 && <g opacity={kprog(T, K.Tiempo + 3.6, K.Tiempo + 4.0)}>
            <line x1={E1[0] + 230} y1={E1[1] - 60} x2={M1[0] + 120} y2={M1[1] + 140} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 12" />
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Tiempo + 3.8} until={K.Resultado - 0.1} x={E1[0] + 330} y={E1[1] - 40} texto="= la distancia" lado="der" color={KC.ink} tam={38} />
        <Chip T={T} at={K.Tiempo + 4.6} until={K.Resultado - 0.1} texto="con muchísima precisión" x={560} y={330} tam={40} borde={LN_LASER} />
      </Escena>
      {/* 4 · más de 40 años de disparos → 3.8 cm / año */}
      <Escena T={T} a={K.Resultado} b={K.Pregunta} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <TierraDib x={220} y={1040} r={150} rot={(T - K.Resultado) * 40} />
          {(() => { const mv = kprog(T, K.Resultado + 3.0, K.Resultado + 5.0, kEase.suave), mx = klerp(780, 880, mv), my = klerp(860, 800, mv);
            return <g>
              {mv > 0 && <circle cx={780} cy={860} r={80} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="10 10" opacity=".5" />}
              <LunaDib x={mx} y={my} r={80} panel={1} />
              {Array.from({ length: 8 }, (_, i) => { const t = K.Resultado + 0.2 + i * 0.33, u = (T - t) / 0.3;
                return u > 0 && u < 2 ? <Pulso key={i} A={u < 1 ? [330, 940] : [mx - 60, my + 30]} B={u < 1 ? [mx - 60, my + 30] : [330, 940]} f={u < 1 ? u : u - 1} r={12} /> : null; })}
              {T < K.Resultado + 3 && <line x1={330} y1={940} x2={720} y2={890} stroke={LN_LASER} strokeWidth={6} strokeDasharray="6 12" opacity={0.6 + 0.4 * Math.sin(T * 30)} />}
              {mv > 0.05 && <FlechaRecta x1={870} y1={930} x2={klerp(870, 960, mv)} y2={klerp(930, 870, mv)} p={1} color={KC.pink} grosor={12} punta={26} />}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Resultado + 0.2} until={K.Pregunta - 0.1} texto="más de 40 años de disparos" x={540} y={400} tam={42} borde={LN_LASER} />
        <NumeroGigante T={T} at={K.Resultado + 2.9} until={K.Pregunta - 0.1} valor={3.8} desde={3.8} dur={0.1} dec={1} sufijo=" cm / año" x={540} y={600} tam={140} color={KC.pink} />
        <Etq T={T} at={K.Resultado + 4.0} until={K.Pregunta - 0.1} x={800} y={1010} texto="se aleja" lado="izq" color={KC.ink} tam={38} />
      </Escena>
      {/* 5 · ¿y por qué se va? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Mareas} color={KC.orange} />
      {/* 6 · mareas: dos bultos de agua */}
      <Escena T={T} a={K.Mareas} b={K.Giro} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <circle cx={E[0]} cy={E[1]} r={RO} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" opacity=".45" />
          <TierraDib x={E[0]} y={E[1]} r={150} rot={rotG} bulto={kprog(T, K.Mareas + 0.5, K.Mareas + 1.8, kEase.sale)} ang={0} />
          <LunaDib x={E[0] + RO} y={E[1]} r={62} />
          {[0, 1, 2].map((i) => { const f = ((T - K.Mareas) * 0.9 + i / 3) % 1; return T > K.Mareas + 0.2 && <circle key={i} cx={klerp(E[0] + RO - 70, E[0] + 230, f)} cy={E[1]} r={10} fill={KC.ink} opacity={0.8 * (1 - f)} />; })}
        </Lienzo>
        <Chip T={T} at={K.Mareas + 0.3} until={K.Giro - 0.1} texto="la Luna jala el agua" x={540} y={430} tam={42} borde={LN_AGUA} />
        <Etq T={T} at={K.Mareas + 1.6} until={K.Giro - 0.1} x={E[0] + 110} y={E[1] - 170} texto="hacia la Luna" lado="der" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Mareas + 2.1} until={K.Giro - 0.1} x={E[0] - 370} y={E[1] + 200} texto="al lado contrario" lado="der" color={KC.ink} tam={34} />
      </Escena>
      {/* 7 · la Tierra gira más rápido: los bultos se adelantan y jalan a la Luna */}
      <Escena T={T} a={K.Giro} b={K.Empuje} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const [mx, my] = lpol(E[0], E[1], RO, amG), [bx, by] = lpol(E[0], E[1], 150 * 1.46, amG + lead), tg = amG + 90;
            const [fx, fy] = [mx + 140 * Math.cos(tg * Math.PI / 180), my - 140 * Math.sin(tg * Math.PI / 180)];
            return <g>
              <circle cx={E[0]} cy={E[1]} r={RO} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" opacity=".45" />
              <FlechaGiro x={E[0]} y={E[1]} R={RO + 40} a0={amG - 70} largo={50} color={KC.paper} o={0.9} />
              <TierraDib x={E[0]} y={E[1]} r={150} rot={rotG} bulto={1} ang={amG + lead} />
              <FlechaGiro x={E[0]} y={E[1]} R={250} a0={rotG % 360 + 120} largo={120} color={KC.yellow} />
              <LunaDib x={mx} y={my} r={62} />
              {lead > 2 && <line x1={E[0]} y1={E[1]} x2={mx} y2={my} stroke={KC.ink} strokeWidth={4} strokeDasharray="6 10" opacity=".6" />}
              {T > K.Giro + 4.2 && <line x1={bx} y1={by} x2={mx} y2={my} stroke={KC.pink} strokeWidth={8} strokeDasharray="12 10" opacity={kprog(T, K.Giro + 4.2, K.Giro + 4.6)} />}
              <FlechaRecta x1={mx} y1={my} x2={fx} y2={fy} p={kprog(T, K.Giro + 4.8, K.Giro + 5.5, kEase.sale)} color={KC.pink} grosor={14} punta={30} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Giro + 0.3} until={K.Giro + 2.5} texto="la Tierra gira más rápido" x={540} y={430} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Giro + 2.7} until={K.Giro + 4.7} texto="los bultos se adelantan" x={540} y={430} tam={40} borde={LN_AGUA} />
        <Chip T={T} at={K.Giro + 4.8} until={K.Empuje - 0.1} texto="y jalan a la Luna hacia adelante" x={540} y={430} tam={36} borde={KC.pink} />
      </Escena>
      {/* 8 · la Luna sube a una órbita más lejana; el giro de la Tierra se frena muy poquito */}
      <Escena T={T} a={K.Empuje} b={K.Unas} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const [mx, my] = lpol(E[0], E[1], RE, amE);
            return <g>
              <circle cx={E[0]} cy={E[1]} r={RO} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" opacity=".35" />
              {fE > 0.02 && <circle cx={E[0]} cy={E[1]} r={RE} fill="none" stroke={KC.pink} strokeWidth={7} strokeDasharray="16 12" opacity={kprog(T, K.Empuje + 0.4, K.Empuje + 1)} />}
              <TierraDib x={E[0]} y={E[1]} r={150} rot={rotE} bulto={1} ang={amE + 24} />
              <FlechaGiro x={E[0]} y={E[1]} R={250} a0={rotE % 360 + 120} largo={120} color={T > K.Empuje + 3.4 ? KC.orange : KC.yellow} />
              <LunaDib x={mx} y={my} r={62} />
              {T > K.Empuje + 0.4 && T < K.Empuje + 3.4 && <FlechaRecta x1={mx} y1={my} x2={mx + 70 * Math.cos(amE * Math.PI / 180)} y2={my - 70 * Math.sin(amE * Math.PI / 180)} p={1} color={KC.pink} grosor={10} punta={24} />}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Empuje + 0.4} until={K.Empuje + 3.3} texto="órbita más lejana" x={540} y={430} tam={44} borde={KC.pink} />
        <Chip T={T} at={K.Empuje + 3.5} until={K.Unas - 0.1} texto="el giro se frena · muy poquito" x={540} y={430} tam={38} borde={KC.orange} />
        <div style={{ position:'absolute', left:540, top:1190, transform:'translate(-50%,-50%)', zIndex:41, font:`700 26px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.Empuje + 0.8, K.Empuje + 1.2) * (1 - kprog(T, K.Unas - 0.4, K.Unas)) }}>(dibujo exagerado)</div>
      </Escena>
      {/* 9 · 3.8 cm al año ≈ lo que crecen las uñas de tus manos */}
      <Escena T={T} a={K.Unas} b={K.Cierre} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <TextoSvg x={540} y={500} tam={92} color={KC.pink} o={1 - kprog(T, K.Unas + 4.3, K.Unas + 4.6)} s={klerp(0.5, 1, kprog(T, K.Unas + 0.1, K.Unas + 0.5, kEase.rebote))}>¿3.8 CM AL AÑO?</TextoSvg>
          <rect x={380} y={640} width={L + 120} height={16} rx={8} fill="rgba(0,0,0,.15)" />
          <LunaDib x={430 + L * gU} y={648} r={48} />
          <text x={380} y={600} style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>la Luna</text>
          <ManoUna x={250} y={930} crece={L * gU} />
          <text x={380} y={820} style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>tu uña</text>
          <g opacity={kprog(T, K.Unas + 1.8, K.Unas + 2.2)}>
            <ReglaH x={440} y={1010} ancho={L} marcas={[[0, '0'], [1, '3.8 cm']]} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Unas + 4.6} until={K.Cierre - 0.1} texto="≈ lo mismo en un año" x={540} y={400} tam={42} borde={KC.ink} />
        <div style={{ position:'absolute', left:540, top:1190, transform:'translate(-50%,-50%)', zIndex:41, font:`700 28px ${KF.mono}`, color:KC.ink, background:'rgba(255,255,255,.7)', border:`3px solid ${KC.ink}`, borderRadius:10, padding:'4px 14px', whiteSpace:'nowrap',
          opacity:kprog(T, K.Unas + 3.0, K.Unas + 3.4) * (1 - kprog(T, K.Cierre - 0.3, K.Cierre)) }}>uñas de las manos · estudio de 2010</div>
      </Escena>
      {/* 10 · cierre: la misma azotea, te cortas las uñas y la Luna se aleja otro poquito */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.noche}>
        <Lienzo>
          <Azotea T={T} luna={<>
            <circle cx={300} cy={520} r={118} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="10 12" opacity={0.5 * LC.f} />
            <LunaDib x={LC.x} y={LC.y} r={LC.r} />
            {LC.f > 0.05 && <FlechaRecta x1={310} y1={570} x2={klerp(310, 225, LC.f)} y2={klerp(570, 470, LC.f)} p={1} color={KC.yellow} grosor={10} punta={24} />}
          </>} persona={<g>
            <PersonaSimple x={600} yPies={1170} alto={380} color={KC.cyan} cara="sonrie" />
            <Cortaunas x={740} y={960} s={0.8} c={cortes.reduce((a, t) => a + Math.max(0, 1 - Math.abs(T - t) * 6), 0)} />
            {cortes.map((t, i) => T > t && T < t + 1 && <path key={i} d="M 0 0 q 14 -10 28 0" transform={`translate(${800 + (T - t) * 120} ${950 - (T - t) * 160 + (T - t) ** 2 * 400}) rotate(${(T - t) * 400})`} stroke={KC.ink} strokeWidth={6} fill="none" />)}
          </g>} />
          <Onomato T={T} at={cortes[0]} dur={0.5} x={820} y={860} texto="¡CLIC!" tam={80} color={KC.yellow} />
          <Onomato T={T} at={cortes[1]} dur={0.5} x={840} y={850} texto="¡CLIC!" tam={80} color={KC.yellow} />
          <TextoSvg x={230} y={800} tam={110} color={KC.yellow} rot={-5} s={klerp(0.4, 1, kprog(T, K.Cierre + 2.2, K.Cierre + 2.6, kEase.rebote))} o={kprog(T, K.Cierre + 2.2, K.Cierre + 2.3)}>+3.8 CM</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.4} until={K.Outro - 0.1} texto="un poquito más lejos" x={660} y={300} tam={40} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Espejos - 0.1} texto="La Luna *se aleja de ti.*" />
      <Subtitulo T={T} idx={1} at={K.Espejos + 0.1} until={K.Laser - 0.1} texto="*Espejos* en la Luna." />
      <Subtitulo T={T} idx={2} at={K.Laser + 0.1} until={K.Tiempo - 0.1} texto="Un láser *que rebota.*" />
      <Subtitulo T={T} idx={3} at={K.Tiempo + 0.1} until={K.Resultado - 0.1} texto="Ida y vuelta: *≈ 2.5 s.*" />
      <Subtitulo T={T} idx={4} at={K.Resultado + 0.1} until={K.Pregunta - 0.1} texto="Se aleja *3.8 cm al año.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Mareas - 0.1} texto="¿Y *por qué* se va?" />
      <Subtitulo T={T} idx={6} at={K.Mareas + 0.1} until={K.Giro - 0.1} texto="Por las *mareas.*" />
      <Subtitulo T={T} idx={7} at={K.Giro + 0.1} until={K.Empuje - 0.1} texto="Los bultos *se adelantan.*" />
      <Subtitulo T={T} idx={8} at={K.Empuje + 0.1} until={K.Unas - 0.1} texto="*Más lejos*; el giro frena." />
      <Subtitulo T={T} idx={9} at={K.Unas + 0.1} until={K.Cierre - 0.1} texto="Lo que crecen *tus uñas.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="La Luna *también se alejó.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Espejos - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Espejos + 2.6, K.Laser - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Tiempo + 2.9, K.Resultado - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Resultado + 3.0, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Mareas + 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Giro + 2.8, K.Empuje - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Empuje + 3.4, K.Unas - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Unas + 2.4, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="16" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function LunaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Luna /></CompositionStage></div>;
}
window.LunaApp = LunaApp;
