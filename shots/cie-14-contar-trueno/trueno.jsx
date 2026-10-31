// Shot Científico #14 · Cuenta los segundos entre el rayo y el trueno — NARRADO (N3 "Capítulos y medidores" + participación).
// Datos: NOAA/NWS (Thunder, Lightning Safety, hoja 2018), velocidad del sonido ≈ 343 m/s. Ver guion.md y verificacion.md.
// Dibujo esquemático: el rayo, la onda y las distancias no van a escala.
const TR_CIELO_A = '#0a0f22', TR_CIELO_B = '#2a3763', TR_NUBE = '#3b4466', TR_LUZ = '#fff7c2', TR_SON = KC.cyan;

// Puntos de un rayo en zigzag de (x0,y0) a (x1,y1).
function rayoPts(x0, y0, x1, y1, seed = 1, n = 12, amp = 110) {
  const g = krng(seed), pts = [];
  for (let i = 0; i <= n; i++) { const f = i / n; pts.push([klerp(x0, x1, f) + (i && i < n ? (g() - 0.5) * amp : 0), klerp(y0, y1, f) + (i && i < n ? (g() - 0.5) * 30 : 0)]); }
  return pts;
}
// Rayo con brillo. p 0..1 = cuánto ya bajó; o = opacidad.
function Rayo({ x0, y0, x1, y1, seed = 1, p = 1, o = 1, grosor = 10, amp = 110, rama = true }) {
  if (o <= 0.01 || p <= 0.01) return null;
  const pts = rayoPts(x0, y0, x1, y1, seed, 12, amp), k = Math.max(2, Math.ceil(p * pts.length));
  const s = pts.slice(0, k).map((q) => q.join(',')).join(' ');
  const r0 = pts[4], g = krng(seed + 7), rm = [r0]; for (let i = 1; i <= 4; i++) rm.push([r0[0] + i * (40 + g() * 30) * (seed % 2 ? 1 : -1), r0[1] + i * 70]);
  const sr = rm.map((q) => q.join(',')).join(' ');
  return <g opacity={o}>
    <polyline points={s} fill="none" stroke="#9fd8ff" strokeWidth={grosor * 5} strokeLinejoin="round" strokeLinecap="round" opacity=".3" />
    {rama && p > 0.5 && <polyline points={sr} fill="none" stroke={TR_LUZ} strokeWidth={grosor * 0.5} strokeLinejoin="round" opacity=".8" />}
    <polyline points={s} fill="none" stroke={TR_LUZ} strokeWidth={grosor * 1.8} strokeLinejoin="round" strokeLinecap="round" opacity=".7" />
    <polyline points={s} fill="none" stroke="#fff" strokeWidth={grosor} strokeLinejoin="round" strokeLinecap="round" />
  </g>;
}
// Brillo de un destello que se apaga (con un parpadeo).
const destello = (T, t) => (T < t ? 0 : Math.exp(-(T - t) * 4.5) * (0.75 + 0.25 * Math.cos((T - t) * 40)));
// Visibilidad de un rayo que cae en t (baja en 0.12 s y dura ~0.7 s).
const rayoEn = (T, t) => ({ p: kprog(T, t, t + 0.12), o: T < t ? 0 : 1 - kprog(T, t + 0.45, t + 0.8) });

function Lluvia({ T, n = 90, seed = 3, color = '#a9c4f2', o = 0.55 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x0 = g() * 1300, y0 = g() * KH, v = 1300 + g() * 500;
    const y = (y0 + T * v) % (KH + 80) - 40, x = ((x0 - T * v * 0.18) % 1300 + 1300) % 1300 - 110;
    return <line key={i} x1={x} y1={y} x2={x - 9} y2={y + 46} stroke={color} strokeWidth={4} strokeLinecap="round" />; })}</g>;
}
// La noche de tormenta (cuadro 0 y cierre). rayos: [[t, x, seed]]. persona: dibuja a alguien afuera contando.
function Tormenta({ T, rayos = [], persona = true }) {
  const fl = Math.min(1, rayos.reduce((a, [t]) => a + destello(T, t), 0));
  return <g>
    <defs><linearGradient id="trCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={TR_CIELO_A} /><stop offset="1" stopColor={TR_CIELO_B} /></linearGradient></defs>
    <rect width={KW} height={KH} fill="url(#trCielo)" />
    <rect width={KW} height={KH} fill="#cfe2ff" opacity={fl * 0.45} />
    {rayos.map(([t, x, sd], i) => { const r = rayoEn(T, t); return <Rayo key={i} x0={x + 40} y0={420} x1={x} y1={1450} seed={sd} p={r.p} o={r.o} grosor={9} />; })}
    {[[180, 330, 1.5], [560, 260, 1.8], [930, 360, 1.4], [360, 470, 1.2], [780, 500, 1.3]].map(([x, y, s], i) =>
      <Nube key={i} x={x + Math.sin(T * 0.3 + i) * 14} y={y} s={s} color={fl > 0.25 ? '#6b75a0' : TR_NUBE} borde="#121628" />)}
    <path d="M 0 1470 Q 260 1390 540 1460 T 1080 1440 L 1080 1920 L 0 1920 Z" fill="#17263a" stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 1560 Q 300 1510 620 1560 T 1080 1550 L 1080 1920 L 0 1920 Z" fill="#1d3346" />
    <Casa x={830} y={1545} s={0.55} luz={1} />
    {persona && <PersonaSimple x={420} yPies={1650} alto={300} color={KC.pink} cara="o" />}
    <Lluvia T={T} />
  </g>;
}
// Termómetro sencillo (dentro de svg). v 0..1
function TermoSvg({ x, y, alto = 520, v = 0, color = KC.red }) {
  return <g>
    <rect x={x - 42} y={y} width={84} height={alto} rx={42} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={x - 22} y={y + 20 + (alto - 20) * (1 - v)} width={44} height={(alto - 20) * v + 30} rx={22} fill={color} />
    <circle cx={x} cy={y + alto + 50} r={76} fill={color} stroke={KC.ink} strokeWidth={9} />
    {[0.25, 0.5, 0.75].map((f) => <line key={f} x1={x + 42} y1={y + alto * (1 - f)} x2={x + 72} y2={y + alto * (1 - f)} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// Regla horizontal (dentro de svg). marcas: [[fracción, texto]].
function Regla({ x, y, ancho, marcas = [], color = KC.paper, alto = 46 }) {
  return <g>
    <rect x={x} y={y} width={ancho} height={alto} rx={10} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 21 }, (_, i) => <line key={i} x1={x + ancho * i / 20} y1={y} x2={x + ancho * i / 20} y2={y + (i % 5 ? 16 : 28)} stroke={KC.ink} strokeWidth={4} />)}
    {marcas.map(([f, t], i) => <text key={i} x={x + ancho * f} y={y + alto + 46} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
  </g>;
}
// Frente de onda de sonido (arcos que avanzan) en x.
function FrenteSonido({ x, y, T, color = TR_SON, alto = 90 }) {
  return <g>{[0, 1, 2].map((i) => { const dx = -i * 34, r = alto - i * 14;
    return <path key={i} d={`M ${x + dx - r * 0.35} ${y - r} Q ${x + dx + r * 0.45} ${y} ${x + dx - r * 0.35} ${y + r}`} fill="none" stroke={i ? color : KC.ink} strokeWidth={i ? 10 : 14} strokeLinecap="round" opacity={1 - i * 0.28} />; })}
    <path d={`M ${x - alto * 0.35} ${y - alto} Q ${x + alto * 0.45} ${y} ${x - alto * 0.35} ${y + alto}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" /></g>;
}
// Reloj de 30 minutos que se vacía (dentro de svg). v 1..0 = cuánto falta.
function Reloj30({ x, y, r = 250, v = 1, T = 0 }) {
  const a = Math.PI * v; // media vuelta = 30 min
  const sx = x, sy = y - r + 20, ex = x + Math.sin(a) * (r - 20), ey = y - Math.cos(a) * (r - 20);
  return <g>
    <circle cx={x} cy={y} r={r + 14} fill={KC.paper} stroke={KC.ink} strokeWidth={12} />
    {v > 0.005 && <path d={`M ${x} ${y} L ${sx} ${sy} A ${r - 20} ${r - 20} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />}
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={x + Math.sin(i * Math.PI / 6) * (r - 4)} y1={y - Math.cos(i * Math.PI / 6) * (r - 4)} x2={x + Math.sin(i * Math.PI / 6) * (r - 34)} y2={y - Math.cos(i * Math.PI / 6) * (r - 34)} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 10} />)}
    <line x1={x} y1={y} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <circle cx={x} cy={y} r={18} fill={KC.ink} />
  </g>;
}
// Número que salta en cada cambio (dentro de svg).
function NumSalta({ T, n, cambio, x, y, tam = 300, color = KC.yellow }) {
  const s = klerp(1.25, 1, kprog(T, cambio, cambio + 0.18, kEase.sale));
  return <TextoSvg x={x} y={y} tam={tam} color={color} s={s}>{n}</TextoSvg>;
}
// Onda dibujada (crujido seco o retumbo largo). tipo 'seco' | 'largo'. p 0..1 = cuánto se dibujó.
function OndaForma({ x, y, ancho, tipo, p, T, color }) {
  const pts = []; const N = 160;
  for (let i = 0; i <= N * p; i++) { const f = i / N, t = f * 10;
    const a = tipo === 'seco' ? 120 * Math.exp(-((f - 0.12) ** 2) / 0.0012) * Math.sin(t * 22) : 70 * Math.sin(Math.PI * kclamp(f / 0.95, 0, 1)) * (0.6 + 0.4 * Math.sin(t * 1.3 + 1)) * Math.sin(t * 9 + Math.sin(t * 2));
    pts.push(`${(x + f * ancho).toFixed(1)},${(y - a).toFixed(1)}`); }
  return <g><line x1={x} y1={y} x2={x + ancho} y2={y} stroke="rgba(255,255,255,.25)" strokeWidth={4} />
    {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />}</g>;
}
// Pared de un cuarto con ventana (el cierre): la noche se ve por la ventana.
function ParedVentana({ x0 = 130, y0 = 330, x1 = 950, y1 = 980 }) {
  return <g>
    <path d={`M 0 0 H ${KW} V ${KH} H 0 Z M ${x0} ${y0} V ${y1} H ${x1} V ${y0} Z`} fill="#f0a15a" fillRule="evenodd" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={i * 100 - 20} y1={0} x2={i * 100 - 20} y2={KH} stroke="rgba(255,255,255,.12)" strokeWidth={30} />)}
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" stroke="#7a4a22" strokeWidth={34} />
    <line x1={(x0 + x1) / 2} y1={y0} x2={(x0 + x1) / 2} y2={y1} stroke="#7a4a22" strokeWidth={22} />
    <line x1={x0} y1={(y0 + y1) / 2} x2={x1} y2={(y0 + y1) / 2} stroke="#7a4a22" strokeWidth={22} />
    <rect x={x0 - 40} y={y1} width={x1 - x0 + 80} height={40} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

function Trueno() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: rayo en 0.2 s, se cuenta 1…5 y en 5.1 s llega el trueno
  const R0 = 0.2, C0 = 0.6, TRUENO = 5.1;
  const cuenta = Math.min(5, Math.max(1, Math.floor(T - C0) + 1));
  // pregunta: cuenta rápida hasta 9
  const P0 = K.Pregunta + 0.2, cuentaP = Math.min(9, Math.max(1, Math.floor((T - P0) / 0.22) + 1));
  // cierre: rayo por la ventana y cuenta desde adentro
  const RC = K.Cierre + 0.2, cuentaC = Math.min(3, Math.max(1, Math.floor((T - RC - 0.4) / 0.7) + 1));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.noche }}>
      {/* 0 · gancho: noche de tormenta, cae un rayo y cuentas */}
      <Escena T={T} a={K.Gancho} b={K.Calor} fondo={KC.noche}>
        <Lienzo>
          <Tormenta T={T} rayos={[[R0, 230, 3]]} />
          {T > C0 && <>
            <TextoSvg x={330} y={600} tam={84} color={KC.texto}>CUENTA</TextoSvg>
            <NumSalta T={T} n={cuenta} cambio={C0 + cuenta - 1} x={330} y={960} tam={360} color={T > TRUENO ? KC.pink : KC.yellow} />
            <TextoSvg x={330} y={1050} tam={56} fuente="texto" color={KC.texto}>{cuenta === 1 ? 'segundo' : 'segundos'}</TextoSvg>
          </>}
          <Onomato T={T} at={TRUENO} dur={1.2} x={730} y={1000} texto="¡BRRUM!" tam={110} color={KC.cyan} />
        </Lienzo>
      </Escena>
      {/* 1 · calor: el canal del rayo por dentro, ≈ 28,000 °C, ×5 el Sol */}
      <Escena T={T} a={K.Calor} b={K.Onda} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <Rayo x0={250} y0={-40} x1={210} y1={1960} seed={5} p={kprog(T, K.Calor, K.Calor + 0.3)} grosor={22 + 4 * Math.sin(T * 30)} amp={150} rama={false} />
          {Array.from({ length: 46 }, (_, i) => { const g = krng(40 + i), bx = 60 + g() * 380, by = 300 + g() * 1050, calor = kprog(T, K.Calor + 0.6, K.Calor + 3), j = 3 + 22 * calor;
            return <circle key={i} cx={bx + Math.sin(T * (12 + i) + i) * j} cy={by + Math.cos(T * (10 + i) + i * 2) * j} r={10} fill={calor > 0.5 ? KC.orange : KC.cyan} stroke={KC.ink} strokeWidth={3} opacity={0.85} />; })}
          <TermoSvg x={900} y={560} alto={520} v={kprog(T, K.Calor + 0.6, K.Calor + 2.6, kEase.sale)} />
          {T > K.Calor + 3.4 && <g transform={`translate(600 990) scale(${klerp(0.3, 1, kprog(T, K.Calor + 3.4, K.Calor + 3.8, kEase.rebote))})`}>
            <SolDibujo x={0} y={0} r={62} T={T} />
            <text x={0} y={150} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>superficie del Sol</text>
          </g>}
          <Onomato T={T} at={K.Calor + 4.0} dur={20} x={610} y={830} texto="×5" tam={170} color={KC.yellow} rot={-6} />
        </Lienzo>
        <NumeroGigante T={T} at={K.Calor + 0.6} until={K.Onda - 0.2} valor={28000} desde={0} dur={1.2} prefijo="≈ " sufijo=" °C" x={620} y={440} tam={130} color={KC.orange} etiqueta="el aire del rayo" />
        <Etq T={T} at={K.Calor + 1.2} until={K.Calor + 3.3} x={430} y={1120} texto="aire calentísimo" lado="der" color={KC.orange} />
      </Escena>
      {/* 2 · onda: el aire se expande de golpe → ¡BUM! */}
      <Escena T={T} a={K.Onda} b={K.Luz} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          {Array.from({ length: 4 }, (_, i) => { const f = ((T - K.Onda - 0.3) * 0.55 + i / 4) % 1; if (T < K.Onda + 0.3 + i * 0.45) return null;
            return <ellipse key={i} cx={540} cy={880} rx={70 + f * 560} ry={220 + f * 640} fill="none" stroke={KC.ink} strokeWidth={14 * (1 - f) + 3} opacity={1 - f} />; })}
          {Array.from({ length: 60 }, (_, i) => { const g = krng(90 + i), ang = g() * Math.PI * 2, d0 = 140 + g() * 380, f = ((T - K.Onda) * 0.55) % 1, emp = 90 * Math.exp(-((d0 - f * 560) ** 2) / 6000) * kprog(T, K.Onda + 0.3, K.Onda + 0.8);
            const d = d0 + emp; return <circle key={i} cx={540 + Math.cos(ang) * d} cy={880 + Math.sin(ang) * d * 1.3} r={11} fill="#fff" stroke={KC.ink} strokeWidth={4} />; })}
          <g transform={`translate(540 0) scale(${1 + 0.5 * kprog(T, K.Onda + 0.2, K.Onda + 0.9, kEase.sale) + 0.08 * Math.sin(T * 25)} 1) translate(-540 0)`}>
            <Rayo x0={560} y0={-40} x1={520} y1={1960} seed={8} grosor={24} amp={90} rama={false} />
          </g>
          <Onomato T={T} at={K.Onda + 2.4} dur={1.4} x={720} y={640} texto="¡BUM!" tam={190} color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Onda + 0.6} until={K.Onda + 2.3} texto="el aire se expande" x={660} y={430} tam={40} borde={KC.ink} />
        <Chip T={T} at={K.Onda + 3.3} until={K.Luz - 0.1} texto="trueno = onda de choque" x={640} y={430} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 3 · la luz llega casi al instante */}
      <Escena T={T} a={K.Luz} b={K.Sonido} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Rayo x0={250} y0={640} x1={230} y1={1180} seed={11} p={kprog(T, K.Luz + 0.1, K.Luz + 0.2)} grosor={10} />
          <Nube x={260} y={620} s={1.25} color={TR_NUBE} />
          <Casa x={810} y={1130} s={0.95} luz={T > K.Luz + 0.35 ? 1 : 0} />
          <line x1={150} y1={1190} x2={1000} y2={1190} stroke={KC.ink} strokeWidth={10} />
          {T > K.Luz + 0.25 && <g opacity={1 - 0.6 * kprog(T, K.Luz + 0.8, K.Luz + 1.6)}>
            <line x1={330} y1={760} x2={700} y2={960} stroke="#fff" strokeWidth={46} strokeLinecap="round" opacity=".55" />
            <FlechaRecta x1={330} y1={760} x2={700} y2={960} p={kprog(T, K.Luz + 0.25, K.Luz + 0.32)} color="#fff" grosor={16} />
          </g>}
          {Array.from({ length: 8 }, (_, i) => <line key={i} x1={810} y1={980} x2={810 + Math.cos(i * 0.785) * 200} y2={980 + Math.sin(i * 0.785) * 200} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={destello(T, K.Luz + 0.32) * 0.9} />)}
        </Lienzo>
        <Medidor T={T} at={K.Luz + 0.05} until={K.Sonido - 0.15} valor={(t) => kprog(t, K.Luz + 0.25, K.Luz + 0.32)} etiqueta="luz del rayo" texto={(v) => (v < 1 ? '…' : 'casi instantáneo')} x={90} y={420} ancho={900} color={KC.white} />
      </Escena>
      {/* 4 · el sonido: lento, ≈ 340 m cada segundo */}
      <Escena T={T} a={K.Sonido} b={K.Tres} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <text x={110} y={650} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>luz</text>
          <rect x={200} y={620} width={790} height={40} rx={20} fill="rgba(0,0,0,.18)" />
          <rect x={200} y={620} width={790 * kprog(T, K.Sonido + 0.3, K.Sonido + 0.36)} height={40} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={6} />
          <text x={80} y={880} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>sonido</text>
          <FrenteSonido x={250 + 700 * kprog(T, K.Sonido + 0.8, K.Sonido + 4.4)} y={880} T={T} color={KC.violet} />
          <Regla x={110} y={1000} ancho={860} marcas={[[0, '0 m'], [0.5, '170'], [1, '340 m']]} />
        </Lienzo>
        <NumeroGigante T={T} at={K.Sonido + 1.6} until={K.Tres - 0.15} valor={340} desde={0} dur={1.2} prefijo="≈ " sufijo=" m/s" x={380} y={440} tam={120} color={KC.yellow} />
        <Chip T={T} at={K.Sonido + 4.4} until={K.Tres - 0.15} texto="1 segundo" x={760} y={1170} tam={36} borde={KC.violet} />
      </Escena>
      {/* 5 · 1 km ≈ 3 segundos */}
      <Escena T={T} a={K.Tres} b={K.Pregunta} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <TextoSvg x={540} y={600} tam={130} color={KC.yellow}>1 KM ≈ 3 S</TextoSvg>
          <Regla x={110} y={860} ancho={860} marcas={[[0, '0'], [1, '1 km']]} />
          {[1, 2, 3].map((k) => { const at = K.Tres + 0.3 + k * 0.85, e = kprog(T, at, at + 0.3, kEase.rebote), xx = 110 + 860 * k / 3;
            return <g key={k} opacity={kprog(T, at, at + 0.1)} transform={`translate(${xx} 800) scale(${klerp(0.3, 1, e)})`}>
              <rect x={-62} y={-70} width={124} height={64} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <text x={0} y={-24} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink}>{k} s</text>
              <line x1={0} y1={-6} x2={0} y2={60} stroke={KC.ink} strokeWidth={8} /></g>; })}
          <FrenteSonido x={110 + 860 * kprog(T, K.Tres + 0.3, K.Tres + 2.85)} y={1020} T={T} color={KC.violet} alto={70} />
        </Lienzo>
      </Escena>
      {/* 6 · ¿contaste 9? → ≈ 3 km */}
      <Escena T={T} a={K.Pregunta} b={K.Retumbo} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <TextoSvg x={300} y={450} tam={70} color={KC.texto}>¿CONTASTE…</TextoSvg>
          {T > P0 && <NumSalta T={T} n={cuentaP} cambio={P0 + (cuentaP - 1) * 0.22} x={300} y={790} tam={330} color={KC.yellow} />}
          {T > K.Pregunta + 2.3 && <>
            <FlechaRecta x1={300} y1={830} x2={300} y2={930} p={kprog(T, K.Pregunta + 2.3, K.Pregunta + 2.6)} color={KC.paper} />
            <TextoSvg x={265} y={1100} tam={145} color={KC.cyan} s={klerp(0.4, 1, kprog(T, K.Pregunta + 2.5, K.Pregunta + 2.9, kEase.rebote))}>≈ 3 KM</TextoSvg>
          </>}
        </Lienzo>
      </Escena>
      {/* 7 · crujido seco (cerca) vs retumbo largo (lejos) */}
      <Escena T={T} a={K.Retumbo} b={K.Cuidado} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <rect x={70} y={420} width={940} height={330} rx={36} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
          <text x={110} y={490} style={{ font:`900 44px ${KF.texto}` }} fill={KC.yellow}>¡CRAC! seco → cerca</text>
          <OndaForma x={110} y={640} ancho={860} tipo="seco" p={kprog(T, K.Retumbo + 0.4, K.Retumbo + 1.0)} T={T} color={KC.yellow} />
          <rect x={70} y={800} width={940} height={330} rx={36} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
          <text x={110} y={870} style={{ font:`900 44px ${KF.texto}` }} fill={KC.cyan}>brrruuum largo → lejos</text>
          <OndaForma x={110} y={1010} ancho={860} tipo="largo" p={kprog(T, K.Retumbo + 2.3, K.Retumbo + 4.6)} T={T} color={KC.cyan} />
        </Lienzo>
      </Escena>
      {/* 8 · cuidado: puede caer a ≈ 16 km o más de la tormenta */}
      <Escena T={T} a={K.Cuidado} b={K.Regla} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <circle cx={540} cy={820} r={360 * kprog(T, K.Cuidado + 0.5, K.Cuidado + 1.4, kEase.sale)} fill="rgba(255,225,26,.35)" stroke={KC.ink} strokeWidth={8} strokeDasharray="26 18" />
          {T > K.Cuidado + 3.6 && <circle cx={540} cy={820} r={360 + 40 * kprog(T, K.Cuidado + 3.6, K.Cuidado + 4.4)} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray="10 16" opacity={0.6 + 0.4 * Math.sin(T * 6)} />}
          <Nube x={540} y={830} s={1.3} color={TR_NUBE} />
          {[[0.6, -0.5, 1.9], [-0.95, 0.15, 2.6], [0.3, 0.95, 3.2]].map(([cx, cy, t], i) => { const r = rayoEn(T, K.Cuidado + t), px = 540 + cx * 330, py = 820 + cy * 330;
            return <g key={i}><Rayo x0={px + 10} y0={py - 170} x1={px} y1={py} seed={20 + i} p={r.p} o={r.o} grosor={8} amp={60} rama={false} />
              {T > K.Cuidado + t && <circle cx={px} cy={py} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />}</g>; })}
          {T > K.Cuidado + 1.2 && <g opacity={kprog(T, K.Cuidado + 1.2, K.Cuidado + 1.6)}>
            <line x1={540} y1={830} x2={900} y2={830} stroke={KC.ink} strokeWidth={8} strokeDasharray="14 10" />
            <TextoSvg x={720} y={790} tam={56} fuente="texto" color={KC.texto}>≈ 16 km</TextoSvg>
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Cuidado + 3.6} until={K.Regla - 0.1} texto="≈ 16 km o más" x={540} y={420} tam={48} borde={KC.red} />
      </Escena>
      {/* 9 · la regla: si truena, métete */}
      <Escena T={T} a={K.Regla} b={K.Espera} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Nube x={560} y={650} s={1.1} color={TR_NUBE} />
          <Rayo x0={590} y0={690} x1={550} y1={1010} seed={31} p={rayoEn(T, K.Regla + 0.2).p} o={rayoEn(T, K.Regla + 0.2).o} grosor={9} amp={70} rama={false} />
          <OndasArco x={590} y={820} ang={20} T={T} color={KC.ink} largo={300} o={1 - kprog(T, K.Regla + 3, K.Regla + 3.5)} />
          <line x1={60} y1={1160} x2={1020} y2={1160} stroke={KC.ink} strokeWidth={10} />
          <Casa x={830} y={1100} s={0.9} luz={T > K.Regla + 5.0 ? 1 : 0} />
          {(() => { const run = kprog(T, K.Regla + 2.6, K.Regla + 4.9, kEase.suave), x = klerp(500, 860, run), o = 1 - kprog(T, K.Regla + 4.8, K.Regla + 5.0);
            return o > 0 && <g opacity={o} transform={`translate(0 ${-Math.abs(Math.sin(T * 14)) * 22 * (run > 0 && run < 1 ? 1 : 0)})`}><PersonaSimple x={x} yPies={1160} alto={320} color={KC.pink} cara="o" brazos={run > 0 && run < 1 ? 0.25 : 0} /></g>; })()}
          {T > K.Regla + 0.8 && T < K.Regla + 2.8 && <Alerta x={430} y={800} s={klerp(0.4, 1, kprog(T, K.Regla + 0.8, K.Regla + 1.1, kEase.rebote))} />}
        </Lienzo>
        <Chip T={T} at={K.Regla + 0.8} until={K.Regla + 2.7} texto="lo oyes = estás a su alcance" x={600} y={430} tam={36} borde={KC.red} />
        <Chip T={T} at={K.Regla + 3.0} until={K.Espera - 0.1} texto="si truena, métete" x={640} y={430} tam={50} borde={KC.yellow} />
      </Escena>
      {/* 10 · espera 30 min tras el último trueno */}
      <Escena T={T} a={K.Espera} b={K.Cierre} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Reloj30 x={630} y={830} r={240} v={1 - kprog(T, K.Espera + 0.9, K.Espera + 3.8, kEase.suave)} T={T} />
          <TextoSvg x={630} y={1170} tam={110} color={KC.cyan}>30 MIN</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Espera + 0.2} until={K.Cierre - 0.1} texto="después del último trueno" x={640} y={430} tam={40} borde={KC.ink} />
      </Escena>
      {/* 11 · cierre: la misma noche, vista desde adentro */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.noche}>
        <Lienzo>
          <Tormenta T={T} rayos={[[RC, 330, 3]]} persona={false} />
          <ParedVentana y1={900} />
          <CabezaPerfil x={250} y={1000} s={0.9} gesto="sonrie" boca={T > RC + 0.4 && T < RC + 2.4 ? 0.5 + 0.5 * Math.sin(T * 15) : 0} />
          {T > RC + 0.4 && <g>
            <rect x={470} y={930} width={260} height={130} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <path d="M 480 1010 L 430 1030 L 490 1040 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
            <text x={600} y={1020} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>{Array.from({ length: cuentaC }, (_, i) => i + 1).join(', ')}…</text>
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.5} until={K.Outro - 0.1} texto="desde adentro" x={540} y={250} tam={44} borde={KC.mint} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Calor - 0.1} texto="Cuenta los segundos: *rayo → trueno.*" />
      <Subtitulo T={T} idx={1} at={K.Calor + 0.1} until={K.Onda - 0.1} texto="Aire a casi *28,000 °C.*" />
      <Subtitulo T={T} idx={2} at={K.Onda + 0.1} until={K.Luz - 0.1} texto="El trueno: *la onda de la expansión.*" />
      <Subtitulo T={T} idx={3} at={K.Luz + 0.1} until={K.Sonido - 0.1} texto="La luz llega *casi al instante.*" />
      <Subtitulo T={T} idx={4} at={K.Sonido + 0.1} until={K.Tres - 0.1} texto="El sonido: *≈ 340 m cada segundo.*" />
      <Subtitulo T={T} idx={5} at={K.Tres + 0.1} until={K.Pregunta - 0.1} texto="*≈ 3 segundos* por kilómetro." />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Retumbo - 0.1} texto="¿9 segundos? *≈ 3 km.*" />
      <Subtitulo T={T} idx={7} at={K.Retumbo + 0.1} until={K.Cuidado - 0.1} texto="Seco: *cerca.* Retumbo: *lejos.*" />
      <Subtitulo T={T} idx={8} at={K.Cuidado + 0.1} until={K.Regla - 0.1} texto="Puede caer a *≈ 16 km o más.*" />
      <Subtitulo T={T} idx={9} at={K.Regla + 0.1} until={K.Espera - 0.1} texto="Si truena, *métete.*" />
      <Subtitulo T={T} idx={10} at={K.Espera + 0.1} until={K.Cierre - 0.1} texto="Espera *media hora.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Cuenta *desde adentro.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Calor - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Calor + 3.4, K.Onda - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Onda + 2.4, K.Luz - 0.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Sonido + 0.6, K.Tres - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pregunta + 0.05, K.Retumbo - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Cuidado + 0.3, K.Regla - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Regla + 1.4, K.Espera - 0.1, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Espera + 0.9, K.Cierre - 0.1, 'avatar_03_aburrido_manos_mejillas', 'izq-alto'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="14" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function TruenoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Trueno /></CompositionStage></div>;
}
window.TruenoApp = TruenoApp;
