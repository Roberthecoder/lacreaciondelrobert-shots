// Shot Científico #25 · El Sol que ves es el de hace 8 minutos — NARRADO (N3 "Capítulos y medidores" + N4 el cielo como máquina del tiempo).
// Datos: NASA (1 UA ≈ 150 millones de km, 8 min 20 s), BIPM/NIST (≈ 300,000 km/s), NASA Moon Facts (≈ 1.3 s), NASA/Hubble (Sirio ≈ 8.6 años luz),
// AAO (no mirar el Sol). Ver guion.md y verificacion.md. Dibujo esquemático: tamaños y distancias NO van a escala; el Sol que se apaga es un experimento mental.
const SO_SOL = '#ffd23a', SO_SOL2 = '#ff9a1f', SO_LUZ = '#fff6b0', SO_TIERRA = '#2f7dff', SO_VERDE = '#3fbf4a';
const f2 = (n) => String(n).padStart(2, '0');
const mmss = (s) => `${f2(Math.floor(s / 60))}:${f2(Math.floor(s) % 60)}`;

// Sol con brillo. apagado 0..1 (1 = apagado, esquema). blur: fantasma difuminado.
function Sol({ x, y, r = 150, T = 0, apagado = 0, o = 1, id = 'a' }) {
  const vivo = 1 - apagado;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <defs><radialGradient id={`soGlow${id}`}><stop offset="0" stopColor={SO_LUZ} stopOpacity=".95" /><stop offset=".55" stopColor={SO_SOL} stopOpacity=".45" /><stop offset="1" stopColor={SO_SOL2} stopOpacity="0" /></radialGradient></defs>
    {vivo > 0.01 && <circle r={r * (1.9 + 0.06 * Math.sin(T * 3))} fill={`url(#soGlow${id})`} opacity={vivo} />}
    {vivo > 0.01 && <g transform={`rotate(${T * 12})`} opacity={vivo}>{Array.from({ length: 12 }, (_, i) =>
      <path key={i} d={`M ${-r * 0.13} ${-r - 16} L 0 ${-r - 26 - r * 0.32 - 10 * Math.sin(T * 4 + i)} L ${r * 0.13} ${-r - 16} Z`} fill={SO_SOL} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" transform={`rotate(${i * 30})`} />)}</g>}
    <circle r={r} fill={mixHex(SO_SOL, '#3a2b2b', apagado)} stroke={KC.ink} strokeWidth={9} />
    <circle r={r * 0.72} fill={mixHex(SO_SOL2, '#2a2020', apagado)} opacity=".35" />
    <ellipse cx={-r * 0.35} cy={-r * 0.38} rx={r * 0.28} ry={r * 0.16} fill="#fff" opacity={0.45 * vivo} transform={`rotate(-30 ${-r * 0.35} ${-r * 0.38})`} />
  </g>;
}
// Tierra con continentes; luz 0..1 = cuánto la ilumina el Sol (desde la izquierda).
function Tierra({ x, y, r = 60, luz = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={`soTc${r}`}><circle r={r} /></clipPath></defs>
    <circle r={r} fill={SO_TIERRA} />
    <g clipPath={`url(#soTc${r})`}>
      <g transform={`translate(${((T * 8) % (r * 2)) - r} 0)`}>{[-2, 0, 2].map((k) => <g key={k} transform={`translate(${k * r} 0)`}>
        <path d={`M ${-r * 0.5} ${-r * 0.6} q ${r * 0.4} ${-r * 0.2} ${r * 0.6} ${r * 0.2} q ${-r * 0.1} ${r * 0.4} ${-r * 0.5} ${r * 0.3} z`} fill={SO_VERDE} />
        <path d={`M ${r * 0.1} ${r * 0.1} q ${r * 0.5} ${-r * 0.1} ${r * 0.5} ${r * 0.4} q ${-r * 0.3} ${r * 0.4} ${-r * 0.5} ${r * 0.1} z`} fill={SO_VERDE} />
      </g>)}</g>
      <rect x={-r * 0.1 + r * 0.9 * luz} y={-r} width={r * 2.2} height={r * 2} fill="#071030" opacity=".55" />
      <rect x={-r} y={-r} width={r * 2} height={r * 2} fill="#071030" opacity={0.6 * (1 - luz)} />
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={Math.max(5, r * 0.09)} />
  </g>;
}
function Luna({ x, y, r = 60 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r * 1.5} fill="#fff" opacity=".18" />
    <circle r={r} fill="#e6e2d6" stroke={KC.ink} strokeWidth={Math.max(5, r * 0.1)} />
    {[[-0.3, -0.25, 0.22], [0.35, 0.1, 0.16], [-0.1, 0.4, 0.13], [0.2, -0.45, 0.1]].map(([a, b, c], i) => <circle key={i} cx={a * r} cy={b * r} r={c * r} fill="#c9c3b3" stroke="rgba(0,0,0,.25)" strokeWidth={3} />)}
  </g>;
}
// Estrella de cuatro puntas que titila.
function Estrella({ x, y, r = 40, T = 0, color = '#fff', seed = 1, o = 1 }) {
  const k = 1 + 0.12 * Math.sin(T * 5 + seed * 2);
  return <g transform={`translate(${x} ${y}) scale(${k})`} opacity={o}>
    <circle r={r * 1.3} fill={color} opacity=".18" />
    <path d={`M 0 ${-r * 1.6} Q ${r * 0.18} ${-r * 0.18} ${r * 1.6} 0 Q ${r * 0.18} ${r * 0.18} 0 ${r * 1.6} Q ${-r * 0.18} ${r * 0.18} ${-r * 1.6} 0 Q ${-r * 0.18} ${-r * 0.18} 0 ${-r * 1.6} Z`} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.12)} strokeLinejoin="round" />
  </g>;
}
// Reloj de pared chiquito con manecillas que giran.
function RelojIcono({ x, y, r = 46, T = 0, vel = 1, color = KC.paper }) {
  const a1 = T * vel * 360, a2 = T * vel * 30;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 4 }, (_, i) => <line key={i} x1={0} y1={-r + 6} x2={0} y2={-r + 16} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 90})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.72} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${a1})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={KC.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${a2})`} />
    <circle r={6} fill={KC.ink} />
  </g>;
}
// Píldora con texto (dentro de svg), aparece con rebote en `at`.
function Pildora({ T, at, x, y, texto, tam = 40, fondo = KC.paper, color = KC.ink, borde = KC.ink, until = 999 }) {
  if (T < at || T > until + 0.35) return null;
  const s = klerp(0.4, 1, kprog(T, at, at + 0.35, kEase.rebote)), o = kprog(T, at, at + 0.15) * (1 - kprog(T, until, until + 0.35));
  const w = texto.length * tam * 0.62 + 56, h = tam + 34;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2 + 6} y={-h / 2 + 8} width={w} height={h} rx={h / 2} fill={KC.ink} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fondo} stroke={borde} strokeWidth={6} />
    <text x={0} y={tam * 0.36} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={color}>{texto}</text>
  </g>;
}
// Rayo de luz que viaja de (x0,y0) a (x1,y1): p 0..1 = dónde va la cabeza. cola = largo de la estela (fracción).
function Foton({ x0, y0, x1, y1, p, cola = 0.25, grosor = 16, color = SO_LUZ }) {
  if (p <= 0 || p > 1.3) return null;
  const pc = Math.min(1, p), pt = Math.max(0, p - cola);
  const X = klerp(x0, x1, pc), Y = klerp(y0, y1, pc), Xt = klerp(x0, x1, Math.min(1, pt)), Yt = klerp(y0, y1, Math.min(1, pt));
  return <g opacity={1 - kprog(p, 1, 1.3)}>
    <line x1={Xt} y1={Yt} x2={X} y2={Y} stroke={color} strokeWidth={grosor * 3} strokeLinecap="round" opacity=".3" />
    <line x1={Xt} y1={Yt} x2={X} y2={Y} stroke={color} strokeWidth={grosor} strokeLinecap="round" />
    {p < 1 && <circle cx={X} cy={Y} r={grosor * 1.2} fill="#fff" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Fotones que viajan sin parar por una línea (puntos que avanzan).
function Corriente({ T, x0, y0, x1, y1, n = 7, vel = 0.35, color = SO_LUZ, r = 9, desde = -99, o = 1 }) {
  if (T < desde) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = ((T - desde) * vel + i / n) % 1;
    return <circle key={i} cx={klerp(x0, x1, f)} cy={klerp(y0, y1, f)} r={r} fill={color} stroke={KC.ink} strokeWidth={3} opacity={Math.min(1, f * 6, (1 - f) * 6)} />; })}</g>;
}
// Ojo de frente. abierto 0..1.
function Ojo({ x, y, s = 1, abierto = 1, mira = 0 }) {
  const h = 70 * abierto;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -130 0 Q 0 ${-h * 1.9} 130 0 Q 0 ${h * 1.9} -130 0 Z`} fill="#fff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {abierto > 0.15 && <><circle cx={mira * 30} cy={0} r={52 * Math.min(1, abierto * 1.3)} fill="#5a3a1e" stroke={KC.ink} strokeWidth={7} />
      <circle cx={mira * 30} cy={0} r={24 * Math.min(1, abierto * 1.3)} fill={KC.ink} /><circle cx={mira * 30 + 14} cy={-16} r={9} fill="#fff" /></>}
    {[-60, -20, 20, 60].map((a, i) => <line key={i} x1={a * 1.3} y1={-h * 0.95 - 4} x2={a * 1.6} y2={-h * 0.95 - 34} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// Regla larga para distancias (dentro de svg).
function ReglaSol({ x0, x1, y, p = 1 }) {
  const X = klerp(x0, x1, p);
  return <g>
    <line x1={x0} y1={y} x2={X} y2={y} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
    <line x1={x0} y1={y - 26} x2={x0} y2={y + 26} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />
    {p > 0.98 && <line x1={x1} y1={y - 26} x2={x1} y2={y + 26} stroke={KC.texto} strokeWidth={8} strokeLinecap="round" />}
    {Array.from({ length: 15 }, (_, i) => { const xx = klerp(x0, x1, (i + 1) / 16); return xx < X && <line key={i} x1={xx} y1={y - 12} x2={xx} y2={y + 12} stroke={KC.texto} strokeWidth={5} />; })}
  </g>;
}
// Atardecer del cuadro 0 y del cierre. extra 0..1: el cielo se oscurece y salen Luna y estrellas (cierre transformado).
function Atardecer({ T, extra = 0, solY = 820 }) {
  return <g>
    <defs><linearGradient id="soCielo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={mixHex(KC.pink, '#2a1f6b', extra)} /><stop offset=".55" stopColor={mixHex(KC.orange, '#c2477a', extra * 0.7)} /><stop offset="1" stopColor={KC.yellow} /></linearGradient></defs>
    <rect width={KW} height={KH} fill="url(#soCielo)" />
    {extra > 0.01 && <g opacity={extra}><EstrellasFondo T={T} n={40} seed={4} alto={700} /></g>}
    <Sol x={330} y={solY} r={165} T={T} id="at" />
    <path d="M 0 1060 Q 220 990 470 1050 T 1080 1030 L 1080 1920 L 0 1920 Z" fill="#7a2c5a" stroke={KC.ink} strokeWidth={9} />
    <path d="M 0 1150 Q 300 1100 620 1150 T 1080 1140 L 1080 1920 L 0 1920 Z" fill="#4a1f45" />
    <PersonaSimple x={820} yPies={1215} alto={300} color={KC.cyan} cara="o" />
  </g>;
}

function Sol8() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const t0Ap = K.Apaga + 0.5, dApaga = 4.8;            // el Sol se apaga y corre el cronómetro (time-lapse a 8:20)
  const sApaga = 500 * kprog(T, t0Ap, t0Ap + dApaga);
  const t0Cu = K.Cuenta + 0.6, dCuenta = 3.2, sCuenta = 500 * kprog(T, t0Cu, t0Cu + dCuenta);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.noche }}>
      {/* 0 · gancho: atardecer; el Sol marca «hace 8 min», tú «ahora» */}
      <Escena T={T} a={K.Gancho} b={K.Distancia} fondo={KC.orange} zoom={0.04}>
        <Lienzo>
          <Atardecer T={T} solY={820 + T * 6} />
          <Corriente T={T} x0={420} y0={880} x1={790} y1={950} n={6} vel={0.7} desde={0} />
          <g transform={`translate(330 ${500 + T * 6})`}>
            <RelojIcono x={-150} y={0} r={52} T={T} vel={0.6} />
            <Pildora T={T} at={0.25} x={60} y={0} texto="HACE 8 MIN" tam={52} fondo={KC.yellow} />
          </g>
          <RelojIcono x={680} y={790} r={40} T={T} vel={1} color={KC.white} />
          <Pildora T={T} at={0.8} x={830} y={790} texto="AHORA" tam={40} fondo={KC.mint} />
        </Lienzo>
      </Escena>
      {/* 1 · distancia: la cámara se aleja; ≈ 150 millones de km */}
      <Escena T={T} a={K.Distancia} b={K.Luz} fondo={KC.violet} zoom={0}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        <Lienzo>
          <EstrellasFondo T={T} n={50} seed={21} />
          <g transform={`translate(160 780) scale(${klerp(2.4, 1, kprog(T, K.Distancia - 0.3, K.Distancia + 1.6, kEase.suave))}) translate(-160 -780)`}>
            <Sol x={160} y={780} r={130} T={T} id="di" />
            <Tierra x={930} y={780} r={42} T={T} />
          </g>
          <ReglaSol x0={160} x1={930} y={1000} p={kprog(T, K.Distancia + 1.4, K.Distancia + 2.4, kEase.sale)} />
          {T > K.Distancia + 2.2 && <TextoSvg x={545} y={1120} tam={74} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Distancia + 2.2, K.Distancia + 2.6, kEase.rebote))}>≈ 150 MILLONES DE KM</TextoSvg>}
        </Lienzo>
        <Etq T={T} at={K.Distancia + 1.5} until={K.Luz - 0.2} x={930} y={700} texto="tú" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Distancia + 0.4} until={K.Luz - 0.2} texto="no está a escala" x={540} y={430} tam={32} borde={KC.lilac} mono />
      </Escena>
      {/* 2 · luz: un rayo sale del Sol a ≈ 300,000 km/s; nada es más rápido */}
      <Escena T={T} a={K.Luz} b={K.Cuenta} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {Array.from({ length: 5 }, (_, i) => <line key={i} x1={300 + ((T * 900 + i * 180) % 600)} y1={700 + i * 50} x2={380 + ((T * 900 + i * 180) % 600)} y2={700 + i * 50} stroke="rgba(22,18,15,.25)" strokeWidth={8} strokeLinecap="round" opacity={T > K.Luz + 0.4 ? 1 : 0} />)}
          <Sol x={20} y={820} r={210} T={T} id="lu" />
          <Tierra x={960} y={820} r={58} T={T} />
          {[0, 1, 2, 3].map((k) => <Foton key={k} x0={250} y0={820} x1={895} y1={820} p={(T - K.Luz - 0.3 - k * 1.25) / 0.9} grosor={16} color={KC.white} />)}
          {T > K.Luz + 2.9 && <g transform={`translate(560 1080) scale(${klerp(0.3, 1, kprog(T, K.Luz + 2.9, K.Luz + 3.3, kEase.rebote))})`}>
            <rect x={-330} y={-50} width={660} height={100} rx={50} fill={KC.ink} />
            <text x={0} y={18} textAnchor="middle" style={{ font:`900 48px ${KF.texto}` }} fill={KC.yellow}>nada viaja más rápido</text>
          </g>}
        </Lienzo>
        <NumeroGigante T={T} at={K.Luz + 0.6} until={K.Cuenta - 0.15} valor={300000} desde={0} dur={1.3} prefijo="≈ " sufijo="" x={540} y={520} tam={150} color={KC.white} etiqueta="la luz viaja a" />
        <Chip T={T} at={K.Luz + 1.7} until={K.Cuenta - 0.15} texto="km por segundo" x={540} y={650} tam={40} borde={KC.ink} />
      </Escena>
      {/* 3 · la cuenta: 150 millones ÷ 300,000 → ≈ 8 min 20 s */}
      <Escena T={T} a={K.Cuenta} b={K.Pasado} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <TextoSvg x={540} y={460} tam={66} color={KC.texto}>150 MILLONES KM</TextoSvg>
          <TextoSvg x={540} y={540} tam={66} color={KC.texto} o={kprog(T, K.Cuenta + 0.3, K.Cuenta + 0.6)}>÷ 300,000 KM/S</TextoSvg>
          <g transform="translate(540 800)">
            <rect x={-40} y={-262} width={80} height={50} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <circle r={200} fill={KC.paper} stroke={KC.ink} strokeWidth={12} />
            {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-186} x2={0} y2={i % 3 ? -168 : -150} stroke={KC.ink} strokeWidth={i % 3 ? 5 : 9} transform={`rotate(${i * 30})`} />)}
            <path d={`M 0 0 L 0 -180 A 180 180 0 ${sCuenta / 500 > 0.5 ? 1 : 0} 1 ${Math.sin(sCuenta / 500 * 6.283) * 180} ${-Math.cos(sCuenta / 500 * 6.283) * 180} Z`} fill={KC.cyan} opacity={sCuenta > 1 ? 0.55 : 0} />
            <line x1={0} y1={0} x2={0} y2={-170} stroke={KC.red} strokeWidth={9} strokeLinecap="round" transform={`rotate(${sCuenta * 6})`} />
            <circle r={14} fill={KC.ink} />
            <text x={0} y={95} textAnchor="middle" style={{ font:`700 78px ${KF.mono}` }} fill={KC.ink}>{mmss(sCuenta)}</text>
          </g>
          <Sol x={110} y={1120} r={42} T={T} id="cu" />
          <Ojo x={975} y={1120} s={0.42} />
          <line x1={170} y1={1120} x2={910} y2={1120} stroke="rgba(22,18,15,.3)" strokeWidth={6} strokeDasharray="14 12" />
          <Foton x0={170} y0={1120} x1={910} y1={1120} p={kprog(T, t0Cu, t0Cu + dCuenta)} cola={0.18} grosor={12} color={KC.white} />
        </Lienzo>
        <Chip T={T} at={t0Cu + dCuenta + 0.1} until={K.Pasado - 0.15} texto="≈ 8 min 20 s" x={540} y={1020} tam={54} borde={KC.yellow} />
      </Escena>
      {/* 4 · pasado: el Sol que ves vs. el de ahorita (difuminado) */}
      <Escena T={T} a={K.Pasado} b={K.Pregunta} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <defs><filter id="soBlur"><feGaussianBlur stdDeviation="14" /></filter></defs>
          <g opacity={kprog(T, K.Pasado + 0.2, K.Pasado + 0.5)}>
            <Sol x={290} y={790} r={140} T={T} id="pv" />
            <Pildora T={T} at={K.Pasado + 0.3} x={290} y={500} texto="EL QUE VES" tam={46} fondo={KC.yellow} />
            <Pildora T={T} at={K.Pasado + 0.9} x={290} y={1040} texto="hace 8 min" tam={40} fondo={KC.paper} />
          </g>
          {T > K.Pasado + 2.4 && <g opacity={kprog(T, K.Pasado + 2.4, K.Pasado + 2.9)}>
            <g filter="url(#soBlur)" opacity={0.5 + 0.15 * Math.sin(T * 4)} transform={`translate(${Math.sin(T * 3) * 8} 0)`}><Sol x={790} y={790} r={140} T={T} id="pa" /></g>
            <circle cx={790} cy={790} r={150} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="22 16" />
            <TextoSvg x={790} y={830} tam={150} color={KC.white}>?</TextoSvg>
            <Pildora T={T} at={K.Pasado + 2.5} x={790} y={500} texto="EL DE AHORITA" tam={46} fondo={KC.white} />
            <Pildora T={T} at={K.Pasado + 3.1} x={790} y={1040} texto="no lo puedes ver" tam={40} fondo={KC.paper} />
          </g>}
        </Lienzo>
      </Escena>
      {/* 5 · pregunta: ¿y si el Sol se apagara? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Apaga} color={KC.lilac} />
      {T > K.Pregunta - 0.45 && T < K.Apaga + 0.45 && <Lienzo z={3} o={kprog(T, K.Pregunta - 0.45, K.Pregunta + 0.05) * (1 - kprog(T, K.Apaga - 0.05, K.Apaga + 0.45))}>
        <Sol x={330} y={500} r={90} T={T} apagado={Math.sin(T * 9) > 0.6 ? 0.8 : 0} id="pr" />
      </Lienzo>}
      {/* 6 · apaga (esquema): el Sol se apaga y su última luz sigue viajando 8:20 */}
      <Escena T={T} a={K.Apaga} b={K.Luna} fondo={KC.noche} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <EstrellasFondo T={T} n={60} seed={33} />
          <Sol x={150} y={800} r={140} T={T} apagado={kprog(T, t0Ap, t0Ap + 0.5)} id="ap" />
          {(() => { const cola = klerp(300, 870, kprog(T, t0Ap, t0Ap + dApaga)), luz = T < t0Ap + dApaga ? 1 : 0;
            return cola < 868 && <g>
              <rect x={cola} y={765} width={870 - cola} height={70} fill={SO_LUZ} opacity=".25" />
              <rect x={cola} y={785} width={870 - cola} height={30} fill={SO_LUZ} opacity=".9" />
              <Corriente T={T} x0={cola} y0={800} x1={870} y1={800} n={5} vel={0.9} r={10} color="#fff" />
              {T > t0Ap && <circle cx={cola} cy={800} r={18} fill="#fff" stroke={KC.ink} strokeWidth={4} />}
            </g>; })()}
          <Tierra x={930} y={800} r={70} T={T} luz={1 - kprog(T, t0Ap + dApaga, t0Ap + dApaga + 0.4)} />
          {T > t0Ap - 0.1 && <g transform="translate(540 590)">
            <text x={0} y={-60} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>DESDE QUE SE APAGÓ</text>
            <rect x={-150} y={-42} width={300} height={90} rx={16} fill="rgba(0,0,0,.6)" stroke={KC.texto} strokeWidth={4} />
            <text x={0} y={26} textAnchor="middle" style={{ font:`700 68px ${KF.mono}` }} fill={KC.texto}>{mmss(sApaga)}</text>
          </g>}
          <Onomato T={T} at={t0Ap} dur={0.9} x={210} y={600} texto="¡CLIC!" tam={90} color={KC.yellow} />
        </Lienzo>
        <Chip T={T} at={K.Apaga + 0.1} until={K.Luna - 0.2} texto="esquema · experimento mental" x={540} y={420} tam={34} borde={KC.lilac} mono />
        <Etq T={T} at={t0Ap + 0.8} until={t0Ap + dApaga - 0.1} x={850} y={940} texto="aún lo ves brillar" lado="izq" color={KC.yellow} />
        <Etq T={T} at={t0Ap + dApaga + 0.2} until={K.Luna - 0.2} x={850} y={940} texto="ahora sí: oscuridad" lado="izq" color={KC.texto} />
      </Escena>
      {/* 7 · Luna: ≈ 1.3 s */}
      <Escena T={T} a={K.Luna} b={K.Estrellas} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Tierra x={190} y={880} r={120} T={T} />
          <Luna x={880} y={880} r={62} />
          {[0, 1, 2, 3].map((k) => <Foton key={k} x0={815} y0={880} x1={315} y1={880} p={(T - K.Luna - 0.3 - k * 1.3) / 1.3} grosor={12} color={KC.white} cola={0.3} />)}
        </Lienzo>
        <NumeroGigante T={T} at={K.Luna + 0.5} until={K.Estrellas - 0.15} valor={1.3} desde={0} dec={1} dur={1.0} prefijo="≈ " sufijo=" s" x={420} y={560} tam={170} color={KC.white} etiqueta="la luz de la Luna tarda" />
        <Chip T={T} at={K.Luna + 2.6} until={K.Estrellas - 0.15} texto="Sol ≈ 8 min 20 s · Luna ≈ 1.3 s" x={540} y={1100} tam={38} borde={KC.yellow} />
      </Escena>
      {/* 8 · estrellas: hace años, siglos o miles de años */}
      <Escena T={T} a={K.Estrellas} b={K.Sirio} fondo={KC.noche}>
        <Lienzo>
          <defs><linearGradient id="soNoche" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b0f2a" /><stop offset="1" stopColor="#2b2a6e" /></linearGradient></defs>
          <rect width={KW} height={KH} fill="url(#soNoche)" />
          <EstrellasFondo T={T} n={90} seed={44} alto={1100} />
          {[[230, 560, 'HACE AÑOS', 0.8, 34], [820, 470, 'HACE SIGLOS', 1.9, 26], [560, 760, 'HACE MILES DE AÑOS', 3.0, 20]].map(([x, y, txt, t, r], i) => <g key={i}>
            {T > K.Estrellas + t && <line x1={x} y1={y} x2={klerp(x, 520, kprog(T, K.Estrellas + t, K.Estrellas + t + 0.6))} y2={klerp(y, 1010, kprog(T, K.Estrellas + t, K.Estrellas + t + 0.6))} stroke={KC.yellow} strokeWidth={5} strokeDasharray="12 10" opacity=".7" />}
            <Estrella x={x} y={y} r={r * (T > K.Estrellas + t ? 1.3 : 1)} T={T} seed={i} color={i === 2 ? '#ffd9a8' : '#e8f0ff'} />
            <Pildora T={T} at={K.Estrellas + t} x={Math.min(Math.max(x, 260), 820)} y={y + 90} texto={txt} tam={36} fondo={KC.yellow} />
          </g>)}
          <path d="M 0 1110 Q 260 1060 540 1100 T 1080 1090 L 1080 1920 L 0 1920 Z" fill="#141a33" stroke={KC.ink} strokeWidth={8} />
          <g transform="translate(520 1210) rotate(0)"><PersonaSimple x={0} yPies={0} alto={250} color={KC.pink} cara="o" /></g>
        </Lienzo>
      </Escena>
      {/* 9 · Sirio: la más brillante de la noche, ≈ 8.6 años */}
      <Escena T={T} a={K.Sirio} b={K.Ojo} fondo={KC.violet}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.08)" />
        <Lienzo>
          <EstrellasFondo T={T} n={60} seed={55} />
          {Array.from({ length: 8 }, (_, i) => <line key={i} x1={640} y1={830} x2={640 + Math.cos(i * 0.785 + T * 0.3) * 330} y2={830 + Math.sin(i * 0.785 + T * 0.3) * 330} stroke="#cfe6ff" strokeWidth={6} strokeLinecap="round" opacity={0.25 + 0.2 * Math.sin(T * 4 + i)} />)}
          <g transform={`translate(640 830) scale(${klerp(0.2, 1, kprog(T, K.Sirio - 0.2, K.Sirio + 0.5, kEase.rebote))}) translate(-640 -830)`}>
            <Estrella x={640} y={830} r={120} T={T} color="#e6f3ff" seed={3} />
          </g>
          <TextoSvg x={640} y={1080} tam={96} color={KC.white} o={kprog(T, K.Sirio + 0.3, K.Sirio + 0.6)}>SIRIO</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Sirio + 0.9} until={K.Ojo - 0.15} texto="la estrella más brillante de la noche" x={540} y={1170} tam={34} borde={KC.cyan} />
        <NumeroGigante T={T} at={K.Sirio + 2.4} until={K.Ojo - 0.15} valor={8.6} desde={0} dec={1} dur={1.0} prefijo="≈ " sufijo=" años" x={660} y={500} tam={120} color={KC.cyan} etiqueta="la ves como era hace" />
      </Escena>
      {/* 10 · nunca mires el Sol directo */}
      <Escena T={T} a={K.Ojo} b={K.Cierre} fondo={KC.yellow}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform={`translate(540 600) scale(${klerp(0.4, 1, kprog(T, K.Ojo + 0.2, K.Ojo + 0.6, kEase.rebote))})`}>
            <Sol x={0} y={0} r={120} T={T} id="oj" />
            <circle r={200} fill="none" stroke={KC.red} strokeWidth={34} />
            <line x1={-141} y1={-141} x2={141} y2={141} stroke={KC.red} strokeWidth={34} strokeLinecap="round" />
          </g>
          <Ojo x={540} y={1000} s={1.15} abierto={T < K.Ojo + 1.4 ? 1 : 0.25 + 0.75 * Math.abs(Math.cos((T - K.Ojo - 1.4) * 2.2))} mira={0} />
          {T > K.Ojo + 1.0 && <><Alerta x={140} y={620} s={klerp(0.3, 0.9, kprog(T, K.Ojo + 1.0, K.Ojo + 1.3, kEase.rebote))} /><Alerta x={940} y={620} s={klerp(0.3, 0.9, kprog(T, K.Ojo + 1.1, K.Ojo + 1.4, kEase.rebote))} /></>}
        </Lienzo>
        <Chip T={T} at={K.Ojo + 0.6} until={K.Cierre - 0.15} texto="nunca lo mires directo" x={540} y={1150} tam={48} borde={KC.red} />
      </Escena>
      {/* 11 · cierre: el mismo atardecer, ahora con Luna y estrellas: todo es pasado */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.orange} zoom={0.03}>
        <Lienzo>
          <Atardecer T={T} extra={kprog(T, K.Cierre, K.Cierre + 1.5, kEase.suave)} solY={850} />
          <Luna x={830} y={640} r={46} />
          <Estrella x={600} y={300} r={18} T={T} seed={2} o={kprog(T, K.Cierre + 1.0, K.Cierre + 1.4)} />
          <Corriente T={T} x0={420} y0={900} x1={790} y1={950} n={6} vel={0.7} desde={K.Cierre} />
          <Pildora T={T} at={K.Cierre + 0.3} x={330} y={580} texto="HACE 8 MIN" tam={46} fondo={KC.yellow} />
          <Pildora T={T} at={K.Cierre + 0.8} x={830} y={540} texto="HACE 1.3 S" tam={34} fondo={KC.paper} />
          <Pildora T={T} at={K.Cierre + 1.3} x={600} y={380} texto="HACE AÑOS" tam={30} fondo={KC.paper} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.8} until={K.Outro - 0.1} texto="ves el pasado" x={540} y={1110} tam={52} borde={KC.mint} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Distancia - 0.1} texto="Ese Sol es el de *hace 8 minutos.*" />
      <Subtitulo T={T} idx={1} at={K.Distancia + 0.1} until={K.Luz - 0.1} texto="Está a *≈ 150 millones de km.*" />
      <Subtitulo T={T} idx={2} at={K.Luz + 0.1} until={K.Cuenta - 0.1} texto="Su luz: *≈ 300,000 km/s.*" />
      <Subtitulo T={T} idx={3} at={K.Cuenta + 0.1} until={K.Pasado - 0.1} texto="Tarda *≈ 8 min 20 s.*" />
      <Subtitulo T={T} idx={4} at={K.Pasado + 0.1} until={K.Pregunta - 0.1} texto="Lo ves *como era,* no como está." />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Apaga - 0.1} texto="¿Y si *se apagara?*" />
      <Subtitulo T={T} idx={6} at={K.Apaga + 0.1} until={K.Luna - 0.1} texto="Lo verías brillar *≈ 8 minutos más.*" />
      <Subtitulo T={T} idx={7} at={K.Luna + 0.1} until={K.Estrellas - 0.1} texto="La Luna: *poco más de 1 segundo.*" />
      <Subtitulo T={T} idx={8} at={K.Estrellas + 0.1} until={K.Sirio - 0.1} texto="Estrellas: *años, siglos o miles.*" />
      <Subtitulo T={T} idx={9} at={K.Sirio + 0.1} until={K.Ojo - 0.1} texto="Sirio: *casi 9 años.*" />
      <Subtitulo T={T} idx={10} at={K.Ojo + 0.1} until={K.Cierre - 0.1} texto="*Nunca* mires el Sol directo." />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Mirar el cielo es *ver el pasado.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Distancia - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Luz + 2.8, K.Cuenta - 0.15, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cuenta + 0.4, K.Pasado - 0.15, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Pasado + 1.2, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Apaga - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Apaga + 2.6, K.Luna - 0.15, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Luna + 2.4, K.Estrellas - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Sirio + 0.3, K.Ojo - 0.15, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Ojo + 0.5, K.Cierre - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="25" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function SolApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Sol8 /></CompositionStage></div>;
}
window.SolApp = SolApp;
