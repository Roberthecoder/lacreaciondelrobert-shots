// Shot Científico #38 · Las estrellas no parpadean: es el aire — NARRADO (N1 "Por dentro": el camino de la luz por la atmósfera).
// Datos: EarthSky, Scientific American, ESO, NASA Hubble (ver guion.md y verificacion.md). Sin cifras.
// Dibujo esquemático: capas de aire, ángulos y tamaños NO van a escala; los temblores están exagerados para que se vean.
const EP_CALIDO = '#ffb36b', EP_FRIO = '#7fd4ff', EP_LUZ = '#fff6b0', EP_PLANETA = '#ffb347', EP_PLANETA2 = '#d9772b';

// Temblor pseudo-aleatorio suave en [-1, 1] (suma de senos).
const ruido = (t, s = 0) => 0.5 * Math.sin(t * 7.3 + s * 1.7) + 0.3 * Math.sin(t * 13.1 + s * 3.1) + 0.2 * Math.sin(t * 23.7 + s * 0.7);

// Estrella de cuatro puntas. fuerza 0..1 = cuánto centellea (brinca, crece/encoge y cambia de brillo).
function EstrellaT({ x, y, r = 30, T = 0, seed = 1, fuerza = 1, color = '#ffffff', o = 1 }) {
  const k = 1 + 0.32 * fuerza * ruido(T, seed), b = 0.62 + 0.38 * (1 - fuerza * Math.abs(ruido(T * 1.3, seed + 4)));
  const dx = 7 * fuerza * ruido(T * 0.9, seed + 2), dy = 7 * fuerza * ruido(T * 1.1, seed + 7);
  return <g transform={`translate(${x + dx} ${y + dy}) scale(${k})`} opacity={o * b}>
    <circle r={r * 1.6} fill={color} opacity=".22" />
    <path d={`M 0 ${-r * 1.6} Q ${r * 0.18} ${-r * 0.18} ${r * 1.6} 0 Q ${r * 0.18} ${r * 0.18} 0 ${r * 1.6} Q ${-r * 0.18} ${r * 0.18} ${-r * 1.6} 0 Q ${-r * 0.18} ${-r * 0.18} 0 ${-r * 1.6} Z`}
      fill={color} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.12)} strokeLinejoin="round" />
  </g>;
}
// Planeta: disco chiquito con bandas (se ve como punto a simple vista).
function Planeta({ x, y, r = 40, id = 'a', o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <defs><clipPath id={`epPl${id}`}><circle r={r} /></clipPath></defs>
    <circle r={r * 1.5} fill={EP_PLANETA} opacity=".2" />
    <circle r={r} fill={EP_PLANETA} />
    <g clipPath={`url(#epPl${id})`}>{[-0.55, -0.15, 0.3, 0.62].map((b, i) =>
      <rect key={i} x={-r} y={b * r} width={r * 2} height={r * (i % 2 ? 0.12 : 0.2)} fill={EP_PLANETA2} opacity=".75" />)}</g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={Math.max(3, r * 0.08)} />
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.25} ry={r * 0.13} fill="#fff" opacity=".45" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
  </g>;
}
// Tierra chiquita.
function TierraP({ x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f7dff" stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.5} ${-r * 0.55} q ${r * 0.4} ${-r * 0.2} ${r * 0.6} ${r * 0.2} q ${-r * 0.1} ${r * 0.4} ${-r * 0.5} ${r * 0.3} z`} fill={KC.leaf} />
    <path d={`M ${r * 0.1} ${r * 0.1} q ${r * 0.5} ${-r * 0.1} ${r * 0.5} ${r * 0.4} q ${-r * 0.3} ${r * 0.4} ${-r * 0.5} ${r * 0.1} z`} fill={KC.leaf} />
    <circle r={r * 1.18} fill="none" stroke={EP_FRIO} strokeWidth={10} opacity=".55" />
  </g>;
}
// Capas de aire onduladas (cálida/fría alternadas) entre y0 y y1 que se mueven todo el tiempo.
function CapasAire({ T, y0, y1, n = 6, o = 0.6, x0 = -40, x1 = KW + 40, amp = 16, borde = true }) {
  const h = (y1 - y0) / n;
  const orilla = (i) => { const yy = y0 + i * h; const pts = [];
    for (let x = x0; x <= x1; x += 40) pts.push(`${x} ${yy + (i === 0 || i === n ? 0 : amp * Math.sin(x / 130 + T * (i % 2 ? 1.3 : -1.1) + i * 1.7))}`);
    return pts; };
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const a = orilla(i), b = orilla(i + 1).reverse();
    return <path key={i} d={`M ${a.join(' L ')} L ${b.join(' L ')} Z`} fill={i % 2 ? EP_FRIO : EP_CALIDO} stroke={borde ? 'rgba(22,18,15,.35)' : 'none'} strokeWidth={4} />; })}</g>;
}
// Rizos de viento que cruzan las capas (el aire no deja de moverse).
function Viento({ T, y0, y1, n = 7, seed = 3, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const yy = klerp(y0, y1, g()), v = 120 + g() * 160, dir = i % 2 ? 1 : -1, ph = g() * 1400;
    const x = dir > 0 ? ((T * v + ph) % 1400) - 160 : 1240 - ((T * v + ph) % 1400);
    return <path key={i} d={`M ${x} ${yy} q ${dir * 50} -26 ${dir * 100} 0 t ${dir * 100} 0 q ${dir * 30} -40 ${dir * 6} -50`} fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity=".75" />; })}</g>;
}
// Rayo de luz que baja por las capas. doblez 0..1: cuánto se dobla en cada orilla. Devuelve también dónde «ves» la estrella.
function caminoRayo(T, x0, y0, y1, n, doblez, seed = 0) {
  const h = (y1 - y0) / n, pts = [[x0, y0]]; let x = x0;
  for (let i = 0; i < n; i++) { const a = doblez * 0.32 * ruido(T * 0.55, seed + i * 3.3); x += h * Math.tan(a); pts.push([x, y0 + (i + 1) * h]); }
  return pts;
}
function Rayo({ pts, p = 1, color = EP_LUZ, grosor = 12, o = 1 }) {
  if (p <= 0) return null;
  const total = pts.length - 1, hasta = p * total, vis = [];
  for (let i = 0; i <= total; i++) { if (i <= hasta) vis.push(pts[i]); else { const f = hasta - (i - 1); vis.push([klerp(pts[i - 1][0], pts[i][0], f), klerp(pts[i - 1][1], pts[i][1], f)]); break; } }
  const d = 'M ' + vis.map((q) => q.join(' ')).join(' L ');
  return <g opacity={o}>
    <path d={d} fill="none" stroke={color} strokeWidth={grosor * 3} strokeLinecap="round" strokeLinejoin="round" opacity=".3" />
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={grosor + 6} strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Píldora con texto (dentro de svg), aparece con rebote en `at`.
function Pildora({ T, at, x, y, texto, tam = 40, fondo = KC.paper, color = KC.ink, until = 999 }) {
  if (T < at || T > until + 0.35) return null;
  const s = klerp(0.4, 1, kprog(T, at, at + 0.35, kEase.rebote)), o = kprog(T, at, at + 0.15) * (1 - kprog(T, until, until + 0.35));
  const w = texto.length * tam * 0.6 + 56, h = tam + 34;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={h / 2} fill={KC.ink} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fondo} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={tam * 0.36} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={color}>{texto}</text>
  </g>;
}
// Barra vertical de brillo (dentro de svg). v 0..1.
function BarraBrillo({ x, y, alto = 380, ancho = 70, v = 0.5, color = KC.yellow, etiqueta = 'BRILLO' }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-ancho / 2 - 14} y={-36} width={ancho + 28} height={alto + 100} rx={22} fill="rgba(14,15,18,.75)" />
    <rect x={-ancho / 2} y={0} width={ancho} height={alto} rx={ancho / 2} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={4} />
    <rect x={-ancho / 2} y={alto * (1 - v)} width={ancho} height={alto * v} rx={ancho / 2} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={alto + 46} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>{etiqueta}</text>
  </g>;
}
// Gráfica que se va dibujando con el brillo de los últimos segundos (dentro de svg). f(t) en 0..1.
function Traza({ T, x, y, ancho = 300, alto = 110, f, color = KC.yellow, o = 1 }) {
  const n = 46, pts = Array.from({ length: n }, (_, j) => { const t = T - (n - 1 - j) * 0.045; return `${x + (j / (n - 1)) * ancho} ${y + alto * (1 - f(t))}`; });
  return <g opacity={o}>
    <rect x={x - 18} y={y - 18} width={ancho + 36} height={alto + 36} rx={18} fill="rgba(14,15,18,.7)" />
    <path d={`M ${pts.join(' L ')}`} fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
  </g>;
}
// Cielo nocturno del inicio y del cierre (lila y rosa de la marca). aire 0..1 = se ven las capas de aire.
function CieloInicio({ T, aire = 0, brillo = 0 }) {
  return <g>
    <defs><linearGradient id="epCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d0b4f" /><stop offset=".55" stopColor={KC.violet} /><stop offset="1" stopColor="#b8407a" /></linearGradient></defs>
    <rect width={KW} height={KH} fill="url(#epCielo)" />
    <EstrellasFondo T={T} n={55} seed={38} alto={950} />
    {[[180, 400, 34, 1], [430, 290, 24, 2], [300, 560, 28, 3], [560, 470, 20, 4], [110, 720, 18, 5]].map(([x, y, r, s]) =>
      <EstrellaT key={s} x={x} y={y} r={r} T={T} seed={s} color={s % 2 ? '#ffffff' : '#dbe9ff'} />)}
    {aire > 0.01 && <g>
      <CapasAire T={T} y0={640} y1={980} n={6} o={0.5 * aire} />
      <Viento T={T} y0={660} y1={960} n={6} seed={11} o={aire} />
      {brillo > 0 && <rect x={0} y={640} width={KW} height={340} fill="#fff" opacity={0.12 * brillo * (0.6 + 0.4 * Math.sin(T * 5))} />}
    </g>}
    <path d="M 0 990 Q 260 950 540 985 T 1080 975 L 1080 1920 L 0 1920 Z" fill="#2a1446" stroke={KC.ink} strokeWidth={9} />
    <PersonaSimple x={330} yPies={1160} alto={250} color={KC.cyan} cara="o" />
  </g>;
}

function Estrellas38() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.noche }}>
      {/* 0 · gancho: el cielo titila; aparecen las capas de aire */}
      <Escena T={T} a={K.Gancho} b={K.Lejos} fondo={KC.violet} zoom={0.05} origen="40% 40%">
        <Lienzo>
          <CieloInicio T={T} aire={kprog(T, K.Gancho + 1.4, K.Gancho + 2.4, kEase.suave)} />
          <Pildora T={T} at={K.Gancho + 2.0} x={740} y={820} texto="EL AIRE" tam={52} fondo={KC.yellow} />
          {T > K.Gancho + 2.4 && <FlechaRecta x1={610} y1={790} x2={360} y2={600} p={kprog(T, K.Gancho + 2.4, K.Gancho + 2.9, kEase.sale)} color={KC.yellow} grosor={12} />}
        </Lienzo>
      </Escena>
      {/* 1 · lejos: la estrella se aleja hasta ser un puntito */}
      <Escena T={T} a={K.Lejos} b={K.Aire} fondo={KC.violet} zoom={0}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        <Lienzo>
          <EstrellasFondo T={T} n={45} seed={7} />
          {(() => { const p = kprog(T, K.Lejos - 0.2, K.Lejos + 2.0, kEase.suave);
            return <EstrellaT x={klerp(540, 900, p)} y={klerp(760, 700, p)} r={klerp(150, 9, p)} T={T} seed={9} fuerza={0.3} color={EP_LUZ} />; })()}
          <TierraP x={170} y={760} r={klerp(30, 70, kprog(T, K.Lejos + 0.6, K.Lejos + 1.6, kEase.rebote))} />
          {T > K.Lejos + 1.9 && <g>
            <line x1={260} y1={930} x2={klerp(260, 880, kprog(T, K.Lejos + 1.9, K.Lejos + 2.8, kEase.sale))} y2={930} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 22" />
            <line x1={260} y1={900} x2={260} y2={960} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
          </g>}
          {T > K.Lejos + 2.7 && <TextoSvg x={570} y={1050} tam={74} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Lejos + 2.7, K.Lejos + 3.1, kEase.rebote))}>MUY, MUY LEJOS</TextoSvg>}
          <Pildora T={T} at={K.Lejos + 3.3} x={810} y={590} texto="puntito de luz" tam={38} fondo={KC.paper} />
        </Lienzo>
        <Etq T={T} at={K.Lejos + 1.2} until={K.Aire - 0.2} x={170} y={650} texto="tú" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Lejos + 0.3} until={K.Aire - 0.2} texto="esquema · no está a escala" x={540} y={430} tam={32} borde={KC.lilac} mono />
      </Escena>
      {/* 2 · aire: la luz baja por capas de aire cálidas y frías que se mueven */}
      <Escena T={T} a={K.Aire} b={K.Dobla} fondo={KC.violet} zoom={0.03}>
        <Lienzo>
          <defs><linearGradient id="epCorte" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d0b4f" /><stop offset=".3" stopColor={KC.violet} /><stop offset="1" stopColor="#3a63c9" /></linearGradient></defs>
          <rect width={KW} height={KH} fill="url(#epCorte)" />
          <EstrellasFondo T={T} n={25} seed={12} alto={480} />
          <CapasAire T={T} y0={540} y1={980} n={6} o={kprog(T, K.Aire - 0.3, K.Aire + 0.5)} amp={20} />
          <Viento T={T} y0={560} y1={1020} n={8} seed={5} o={kprog(T, K.Aire + 3.6, K.Aire + 4.2)} />
          <Rayo pts={[[540, 420], [540, 1040]]} p={kprog(T, K.Aire + 0.3, K.Aire + 2.6)} />
          <EstrellaT x={540} y={420} r={26} T={T} seed={3} fuerza={0.25} color={EP_LUZ} />
          <path d="M 0 1030 Q 300 1000 540 1020 T 1080 1015 L 1080 1920 L 0 1920 Z" fill="#2a1446" stroke={KC.ink} strokeWidth={9} />
          <PersonaSimple x={540} yPies={1170} alto={190} color={KC.cyan} cara="o" />
        </Lienzo>
        <Chip T={T} at={K.Aire + 0.8} until={K.Dobla - 0.2} texto="kilómetros de aire" x={540} y={300} tam={40} borde={KC.cyan} />
        <Etq T={T} at={K.Aire + 2.6} until={K.Dobla - 0.2} x={40} y={620} texto="más caliente" lado="der" color={KC.texto} tam={38} />
        <Etq T={T} at={K.Aire + 3.1} until={K.Dobla - 0.2} x={1040} y={705} texto="más fría" lado="izq" color={KC.texto} tam={38} />
        <Etq T={T} at={K.Aire + 3.6} until={K.Dobla - 0.2} x={40} y={880} texto="aire que se mueve" lado="der" color={KC.texto} tam={38} />
      </Escena>
      {/* 3 · dobla: cada capa dobla la luz; el puntito brinca y cambia de brillo */}
      <Escena T={T} a={K.Dobla} b={K.Nombre} fondo={KC.violet} zoom={0.03}>
        <Lienzo>
          <rect width={KW} height={KH} fill="url(#epCorte2)" />
          <defs><linearGradient id="epCorte2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d0b4f" /><stop offset=".3" stopColor={KC.violet} /><stop offset="1" stopColor="#3a63c9" /></linearGradient></defs>
          <EstrellasFondo T={T} n={25} seed={12} alto={480} />
          <CapasAire T={T} y0={540} y1={980} n={6} o={1} amp={20} />
          {(() => {
            const dob = kprog(T, K.Dobla + 0.3, K.Dobla + 1.5, kEase.suave);
            const pts = caminoRayo(T, 440, 540, 980, 6, dob, 2);
            const [xa, ya] = pts[pts.length - 2], [xb, yb] = pts[pts.length - 1];
            const xs = xb + (xa - xb) * (yb - 420) / (yb - ya);      // donde «ves» la estrella: siguiendo el último tramo
            const xap = klerp(440, Math.max(140, Math.min(940, xs)), dob);
            return <g>
              <Rayo pts={[[440, 420], [440, 540]]} p={1} />
              <Rayo pts={pts} p={1} />
              <Rayo pts={[[xb, yb], [xb + (xb - xa) * 0.4, 1040]]} p={1} />
              <EstrellaT x={440} y={420} r={24} T={T} seed={3} fuerza={0} color={EP_LUZ} o={0.35} />
              {dob > 0.05 && <g opacity={dob}>
                <line x1={xb} y1={yb} x2={xap} y2={420} stroke="#fff" strokeWidth={5} strokeDasharray="10 12" opacity=".6" />
                <EstrellaT x={xap} y={420} r={26 * (0.8 + 0.35 * (0.5 + 0.5 * ruido(T * 1.2, 9)))} T={T} seed={5} fuerza={0.4} color="#ffffff" />
              </g>}
              <BarraBrillo x={950} y={560} alto={360} v={0.55 + 0.4 * ruido(T * 1.1, 4) * dob} color={KC.yellow} />
            </g>;
          })()}
          <path d="M 0 1030 Q 300 1000 540 1020 T 1080 1015 L 1080 1920 L 0 1920 Z" fill="#2a1446" stroke={KC.ink} strokeWidth={9} />
          <PersonaSimple x={480} yPies={1170} alto={190} color={KC.cyan} cara="o" />
        </Lienzo>
        <Chip T={T} at={K.Dobla + 0.2} until={K.Nombre - 0.2} texto="cada capa dobla la luz" x={540} y={300} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Dobla + 3.0} until={K.Nombre - 0.2} x={560} y={480} texto="el puntito brinca" lado="der" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Dobla + 4.6} until={K.Nombre - 0.2} x={880} y={930} texto="y cambia de brillo" lado="izq" color={KC.yellow} tam={30} />
      </Escena>
      {/* 4 · nombre: centelleo */}
      <Escena T={T} a={K.Nombre} b={K.Pregunta} fondo={KC.yellow} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {Array.from({ length: 10 }, (_, i) => <line key={i} x1={540} y1={600} x2={540 + Math.cos(i * 0.628 + T * 0.5) * 260} y2={600 + Math.sin(i * 0.628 + T * 0.5) * 260} stroke={KC.white} strokeWidth={10} strokeLinecap="round" opacity={0.3 + 0.3 * Math.sin(T * 6 + i)} />)}
          <g transform={`translate(540 600) scale(${klerp(0.2, 1, kprog(T, K.Nombre - 0.2, K.Nombre + 0.4, kEase.rebote))}) translate(-540 -600)`}>
            <EstrellaT x={540} y={600} r={95} T={T} seed={6} fuerza={1} color="#ffffff" />
          </g>
          <TextoSvg x={540} y={940} tam={150} color={KC.pink} s={klerp(0.4, 1, kprog(T, K.Nombre + 0.3, K.Nombre + 0.7, kEase.rebote))} o={kprog(T, K.Nombre + 0.3, K.Nombre + 0.4)}>CENTELLEO</TextoSvg>
          <Pildora T={T} at={K.Nombre + 0.9} x={540} y={1070} texto="el parpadeo de las estrellas" tam={38} fondo={KC.paper} />
        </Lienzo>
      </Escena>
      {/* 5 · pregunta: ¿y los planetas? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Disco} color={KC.lilac} />
      {T > K.Pregunta - 0.45 && T < K.Disco + 0.45 && <Lienzo z={3} o={kprog(T, K.Pregunta - 0.45, K.Pregunta + 0.05) * (1 - kprog(T, K.Disco - 0.05, K.Disco + 0.45))}>
        <EstrellaT x={700} y={400} r={34} T={T} seed={8} fuerza={1} color="#ffffff" />
        <Planeta x={900} y={400} r={30} id="pr" />
        <Pildora T={T} at={K.Pregunta + 0.5} x={900} y={490} texto="planeta" tam={32} fondo={EP_PLANETA} />
      </Lienzo>}
      {/* 6 · disco: el planeta está más cerca y es un disco chiquito */}
      <Escena T={T} a={K.Disco} b={K.Promedio} fondo={KC.cyan} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <EstrellaT x={250} y={640} r={14} T={T} seed={2} fuerza={0.6} color="#ffffff" />
          <Pildora T={T} at={K.Disco + 0.2} x={250} y={540} texto="ESTRELLA" tam={36} fondo={KC.paper} />
          <Pildora T={T} at={K.Disco + 0.5} x={250} y={740} texto="un punto" tam={32} fondo={KC.white} />
          <circle cx={780} cy={600} r={12} fill={EP_PLANETA} stroke={KC.ink} strokeWidth={4} />
          <Pildora T={T} at={K.Disco + 0.3} x={780} y={500} texto="PLANETA" tam={36} fondo={EP_PLANETA} />
          {T > K.Disco + 2.2 && (() => { const z = kprog(T, K.Disco + 2.2, K.Disco + 2.9, kEase.rebote);
            return <g>
              <line x1={780} y1={612} x2={700} y2={880 - 210 * z} stroke={KC.ink} strokeWidth={6} />
              <circle cx={700} cy={880} r={210 * z} fill={KC.noche} stroke={KC.white} strokeWidth={12} />
              <Planeta x={700} y={880} r={140 * z} id="dz" />
            </g>; })()}
          <Pildora T={T} at={K.Disco + 3.1} x={700} y={1140} texto="DISCO CHIQUITO" tam={44} fondo={KC.yellow} />
          {T > K.Disco + 0.8 && <g>
            <Pildora T={T} at={K.Disco + 0.8} x={780} y={700} texto="más cerca" tam={32} fondo={KC.mint} />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Disco + 0.1} until={K.Promedio - 0.2} texto="esquema · no está a escala" x={540} y={400} tam={32} borde={KC.lilac} mono />
      </Escena>
      {/* 7 · promedio: cada parte del disco tiembla por su lado; juntas se compensan */}
      <Escena T={T} a={K.Promedio} b={K.Truco} fondo={KC.violet} zoom={0.02}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        <Lienzo>
          <CapasAire T={T} y0={620} y1={960} n={5} o={0.45} x0={60} x1={560} amp={14} />
          {(() => { const cols = [KC.yellow, KC.pink, KC.mint, KC.cyan, KC.coral], xs = [-72, -36, 0, 36, 72];
            return <g>
              {xs.map((dx, k) => <Rayo key={k} pts={caminoRayo(T, 300 + dx, 560, 1030, 5, 0.8, k * 7)} p={kprog(T, K.Promedio + 0.2 + k * 0.15, K.Promedio + 1.3 + k * 0.15)} color={cols[k]} grosor={7} />)}
              <Planeta x={300} y={470} r={110} id="pm" />
              {xs.map((dx, k) => <circle key={k} cx={300 + dx} cy={470} r={13} fill={cols[k]} stroke={KC.ink} strokeWidth={4} />)}
              <g opacity={kprog(T, K.Promedio + 1.6, K.Promedio + 2.0)}>
                <text x={620} y={540} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>CADA PARTE</text>
                {xs.map((dx, k) => <BarraH key={k} x={620} y={570 + k * 62} ancho={380} alto={38} v={0.5 + 0.38 * ruido(T * 1.2, k * 5 + 1)} color={cols[k]} />)}
              </g>
              <g opacity={kprog(T, K.Promedio + 3.6, K.Promedio + 4.0)}>
                <text x={620} y={930} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>TODO EL DISCO</text>
                <BarraH x={620} y={955} ancho={380} alto={64} v={0.5 + 0.03 * ruido(T, 3)} color={KC.white} />
              </g>
            </g>; })()}
          <path d="M 0 1030 Q 300 1000 540 1020 T 1080 1015 L 1080 1920 L 0 1920 Z" fill="#2a1446" stroke={KC.ink} strokeWidth={9} />
        </Lienzo>
        <Chip T={T} at={K.Promedio + 4.3} until={K.Truco - 0.2} texto="se compensan: brilla más tranquilo" x={540} y={330} tam={36} borde={KC.mint} />
      </Escena>
      {/* 8 · truco: el punto que no parpadea */}
      <Escena T={T} a={K.Truco} b={K.Telescopios} fondo={KC.violet} zoom={0.03}>
        <Lienzo>
          <rect width={KW} height={KH} fill="url(#epCielo2)" />
          <defs><linearGradient id="epCielo2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d0b4f" /><stop offset=".55" stopColor={KC.violet} /><stop offset="1" stopColor="#b8407a" /></linearGradient></defs>
          <EstrellasFondo T={T} n={50} seed={41} alto={1000} />
          <EstrellaT x={290} y={620} r={34} T={T} seed={10} fuerza={1} color="#dbe9ff" />
          <g transform="translate(790 600)"><circle r={50} fill={EP_PLANETA} opacity=".22" /><circle r={18} fill="#ffe2a8" stroke={KC.ink} strokeWidth={4} /></g>
          <Traza T={T} x={140} y={790} ancho={300} alto={100} f={(t) => 0.5 + 0.45 * ruido(t, 10)} color={KC.cyan} o={kprog(T, K.Truco + 1.2, K.Truco + 1.6)} />
          <Traza T={T} x={640} y={790} ancho={300} alto={100} f={(t) => 0.5 + 0.03 * ruido(t, 2)} color={KC.yellow} o={kprog(T, K.Truco + 2.4, K.Truco + 2.8)} />
          <Pildora T={T} at={K.Truco + 1.0} x={290} y={500} texto="PARPADEA" tam={38} fondo={KC.cyan} />
          <Pildora T={T} at={K.Truco + 2.2} x={790} y={500} texto="NO PARPADEA" tam={38} fondo={KC.yellow} />
          <Pildora T={T} at={K.Truco + 3.6} x={790} y={1000} texto="probablemente un planeta" tam={32} fondo={KC.paper} />
          <path d="M 0 1120 Q 260 1080 540 1110 T 1080 1100 L 1080 1920 L 0 1920 Z" fill="#2a1446" stroke={KC.ink} strokeWidth={9} />
        </Lienzo>
        <Chip T={T} at={K.Truco + 0.1} until={K.Telescopios - 0.2} texto="TRUCO" x={540} y={360} tam={52} borde={KC.yellow} />
      </Escena>
      {/* 9 · telescopios: en montañas altas y secas, y en el espacio */}
      <Escena T={T} a={K.Telescopios} b={K.Cierre} fondo={KC.lilac} zoom={0.03}>
        <Lienzo>
          <defs><linearGradient id="epTel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d0b4f" /><stop offset=".45" stopColor={KC.violet} /><stop offset="1" stopColor={KC.lilac} /></linearGradient></defs>
          <rect width={KW} height={KH} fill="url(#epTel)" />
          <EstrellasFondo T={T} n={40} seed={46} alto={700} />
          <CapasAire T={T} y0={820} y1={1180} n={5} o={0.55} amp={18} />
          <Viento T={T} y0={840} y1={1160} n={6} seed={9} />
          {(() => { const s = kprog(T, K.Telescopios - 0.3, K.Telescopios + 0.6, kEase.sale);
            return <g transform={`translate(0 ${(1 - s) * 500})`}>
              <Montana x={380} y={1240} ancho={820} alto={720} color="#a07a5e" nieve={false} />
              <g transform="translate(380 520)">
                <rect x={-70} y={-10} width={140} height={46} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
                <path d="M -78 -10 A 78 78 0 0 1 78 -10 Z" fill={KC.white} stroke={KC.ink} strokeWidth={7} />
                <path d={`M -10 -86 L 10 -86 L 14 -12 L -14 -12 Z`} fill={KC.ink} transform={`rotate(${Math.sin(T * 0.8) * 20} 0 -10)`} />
              </g>
            </g>; })()}
          {T > K.Telescopios + 2.6 && (() => { const s = kprog(T, K.Telescopios + 2.6, K.Telescopios + 3.4, kEase.sale), x = klerp(1200, 800, s) + Math.sin(T * 0.7) * 10, y = 300 + Math.sin(T * 1.1) * 8;
            return <g transform={`translate(${x} ${y}) rotate(-18)`}>
              <rect x={-150} y={-22} width={90} height={44} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
              <rect x={60} y={-22} width={90} height={44} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
              <line x1={-150} y1={0} x2={150} y2={0} stroke={KC.ink} strokeWidth={4} />
              <rect x={-55} y={-38} width={110} height={76} rx={14} fill="#d8d8d8" stroke={KC.ink} strokeWidth={7} />
              <circle cx={56} cy={0} r={22} fill={KC.ink} />
            </g>; })()}
          <Pildora T={T} at={K.Telescopios + 3.4} x={790} y={420} texto="en el espacio" tam={36} fondo={KC.cyan} />
          <Pildora T={T} at={K.Telescopios + 1.0} x={610} y={600} texto="montaña alta y seca" tam={34} fondo={KC.paper} />
          {T > K.Telescopios + 1.8 && <FlechaRecta x1={720} y1={1150} x2={720} y2={klerp(1150, 860, kprog(T, K.Telescopios + 1.8, K.Telescopios + 2.3, kEase.sale))} color={KC.yellow} grosor={10} />}
          <Pildora T={T} at={K.Telescopios + 2.1} x={850} y={760} texto="menos aire encima" tam={30} fondo={KC.yellow} />
        </Lienzo>
      </Escena>
      {/* 10 · cierre: el mismo cielo del inicio, ahora se ve el aire que tiembla */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.violet} zoom={0.03} origen="40% 40%">
        <Lienzo>
          <CieloInicio T={T} aire={1} brillo={kprog(T, K.Cierre + 1.0, K.Cierre + 2.0)} />
          <Pildora T={T} at={K.Cierre + 0.8} x={430} y={230} texto="no te guiña" tam={40} fondo={KC.paper} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.0} until={K.Outro - 0.1} texto="es tu cielo moviéndose" x={540} y={840} tam={48} borde={KC.mint} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Lejos - 0.1} texto="Las estrellas no parpadean: *es el aire.*" />
      <Subtitulo T={T} idx={1} at={K.Lejos + 0.1} until={K.Aire - 0.1} texto="Están tan lejos que son *puntitos de luz.*" />
      <Subtitulo T={T} idx={2} at={K.Aire + 0.1} until={K.Dobla - 0.1} texto="Su luz cruza *kilómetros de aire.*" />
      <Subtitulo T={T} idx={3} at={K.Dobla + 0.1} until={K.Nombre - 0.1} texto="Cada capa *dobla la luz.*" />
      <Subtitulo T={T} idx={4} at={K.Nombre + 0.1} until={K.Pregunta - 0.1} texto="A eso se le llama *centelleo.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Disco - 0.1} texto="¿Y los planetas? *Casi no parpadean.*" />
      <Subtitulo T={T} idx={6} at={K.Disco + 0.1} until={K.Promedio - 0.1} texto="Están más cerca: son *discos chiquitos.*" />
      <Subtitulo T={T} idx={7} at={K.Promedio + 0.1} until={K.Truco - 0.1} texto="Los temblores *se compensan.*" />
      <Subtitulo T={T} idx={8} at={K.Truco + 0.1} until={K.Telescopios - 0.1} texto="¿No parpadea? *Probablemente es un planeta.*" />
      <Subtitulo T={T} idx={9} at={K.Telescopios + 0.1} until={K.Cierre - 0.1} texto="Telescopios en montañas… *o en el espacio.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No te guiña: *es tu cielo moviéndose.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Lejos - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Aire + 0.6, K.Aire + 5.0, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Dobla + 2.4, K.Nombre + 1.8, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Disco - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Promedio + 1.4, K.Truco - 0.15, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Truco + 1.0, K.Telescopios - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Telescopios + 0.6, K.Cierre - 0.15, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="38" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function EstrellasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Estrellas38 /></CompositionStage></div>;
}
window.EstrellasApp = EstrellasApp;
