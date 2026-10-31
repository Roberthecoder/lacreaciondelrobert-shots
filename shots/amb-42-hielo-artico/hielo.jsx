// Shot Ambiental #42 · El hielo del Ártico en septiembre, medido en Méxicos — NARRADO (N4 la imagen que se llena).
// Datos: NSIDC (Sea Ice Today, 23 sep y 7 oct 2026; Quick facts; Why sea ice matters), NASA Earth Observatory, SRE/INEGI.
// Ver guion.md y verificacion.md. El mapa es ESQUEMÁTICO; las áreas del hielo y de México sí están a la misma escala entre sí.

// Escala de áreas: Q px² por millón de km² (con el mapa de radio 320 px).
const HA_Q = 26000;
const HA_MX_AREA = 105880;   // área (px²) de la silueta de MapaMexico (sin Centroamérica) con ancho 1000
const HA_MX = 1.964375;      // millones de km² (SRE/INEGI)
const HA_PROM = 6.22, HA_2026 = 4.60, HA_2012 = 3.39;   // NSIDC: 4.60 + 1.62 = promedio 1981–2010 del mínimo

// Forma del hielo: r(θ) = R·f(θ). Área de la forma con R = 1 (se calcula una vez).
const haF = (a) => 1 + 0.07 * Math.sin(2 * a + 1) + 0.05 * Math.sin(3 * a + 2);
const HA_N = 72;
const HA_A1 = (() => { let s = 0; for (let i = 0; i < HA_N; i++) { const a = (i / HA_N) * Math.PI * 2, b = ((i + 1) / HA_N) * Math.PI * 2;
  s += 0.5 * haF(a) * haF(b) * Math.sin(b - a); } return s; })();
function haPathHielo(cx, cy, R) {
  let d = '';
  for (let i = 0; i < HA_N; i++) { const a = (i / HA_N) * Math.PI * 2, r = R * haF(a); d += (i ? ' L ' : 'M ') + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1); }
  return d + ' Z';
}
const haR = (valor, Ro) => Math.sqrt(valor * HA_Q * (Ro / 320) ** 2 / HA_A1);

// Mapa del Ártico visto desde arriba (esquemático): tierra alrededor, océano oscuro, hielo blanco.
// valor = millones de km² de hielo; contorno = millones de km² dibujados con línea punteada; hueco = 0..1 pinta la diferencia.
function ArticoMapa({ T, cx = 440, cy = 845, Ro = 320, valor = HA_PROM, contorno, hueco = 0, etiquetas = true, polo = true }) {
  const id = 'am' + Math.round(cx + cy + Ro);
  const ocR = (a) => { let r = 0.87; const atl = Math.exp(-((a - 0.1) ** 2) / 0.05), ber = Math.exp(-((a + 2.1) ** 2) / 0.01);
    return Ro * (r + (1.05 - r) * Math.max(atl, ber)); };
  let oc = ''; for (let i = 0; i <= 120; i++) { const a = -Math.PI + (i / 120) * Math.PI * 2, r = ocR(a); oc += (i ? ' L ' : 'M ') + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1); }
  const R = haR(valor, Ro), Rc = contorno ? haR(contorno, Ro) : 0;
  const k = Ro / 320;
  // Groenlandia: lóbulo en la parte de abajo a la derecha
  const gr = `M ${cx + 205 * k} ${cy + 300 * k} Q ${cx + 150 * k} ${cy + 250 * k} ${cx + 195 * k} ${cy + 215 * k} Q ${cx + 245 * k} ${cy + 175 * k} ${cx + 290 * k} ${cy + 150 * k} Q ${cx + 330 * k} ${cy + 220 * k} ${cx + 280 * k} ${cy + 300 * k} Z`;
  const islas = [[-190, 190, 30], [-140, 235, 26], [-235, 135, 22]];
  return <g>
    <defs><clipPath id={id}><circle cx={cx} cy={cy} r={Ro} /></clipPath>
      <radialGradient id={id + 'o'} cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#1d4f8c" /><stop offset="100%" stopColor="#0b2347" /></radialGradient></defs>
    <circle cx={cx} cy={cy} r={Ro + 18} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={14} />
    <g clipPath={`url(#${id})`}>
      <rect x={cx - Ro} y={cy - Ro} width={Ro * 2} height={Ro * 2} fill="#cdb98a" />
      <path d={oc} fill={`url(#${id}o)`} />
      {/* olitas del mar abierto */}
      {Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, r = (0.3 + (i % 5) * 0.12) * Ro; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        return <path key={i} d={`M ${x - 16} ${y} q 8 ${-6 + Math.sin(T * 2 + i) * 3} 16 0 t 16 0`} stroke="#3f7cc4" strokeWidth={3} fill="none" />; })}
      {hueco > 0 && contorno && <path d={haPathHielo(cx, cy, Rc)} fill="#061529" opacity={0.9 * hueco} />}
      <path d={haPathHielo(cx, cy, R)} fill="#f4fbff" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 7 }, (_, i) => { const a = i * 0.9 + 0.3, r1 = R * 0.15, r2 = R * 0.75;
        return <line key={i} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a + 0.2) * r2} y2={cy + Math.sin(a + 0.2) * r2} stroke="#b9dcf2" strokeWidth={3} />; })}
      {contorno && <path d={haPathHielo(cx, cy, Rc)} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="16 12" strokeDashoffset={-T * 30} />}
      <path d={gr} fill="#e9eef3" stroke={KC.ink} strokeWidth={5} />
      {islas.map(([x, y, r], i) => <ellipse key={i} cx={cx + x * k} cy={cy + y * k} rx={r * k} ry={r * 0.6 * k} fill="#cdb98a" stroke={KC.ink} strokeWidth={4} />)}
    </g>
    <circle cx={cx} cy={cy} r={Ro} fill="none" stroke={KC.ink} strokeWidth={8} />
    {polo && <g><circle cx={cx} cy={cy} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>}
    {etiquetas && <g style={{ font:`700 ${Math.round(24 * k)}px ${KF.mono}` }} fill={KC.ink}>
      <text x={cx - 175 * k} y={cy - 238 * k} textAnchor="middle">Alaska</text>
      <text x={cx + 90 * k} y={cy - 286 * k} textAnchor="middle">Rusia</text>
      <text x={cx - 150 * k} y={cy + 296 * k} textAnchor="middle">Canadá</text>
      <text x={cx + 245 * k} y={cy + 335 * k} textAnchor="middle" fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">Groenlandia</text>
    </g>}
  </g>;
}
// Silueta de México con el área real a la escala del mapa (Ro). (mx, my) = centro de la silueta.
function MexicoEscala({ mx, my, Ro = 320, o = 1, color = '#3fbf4a' }) {
  const s = Math.sqrt(HA_MX * HA_Q * (Ro / 320) ** 2 / HA_MX_AREA);
  return <g opacity={o}><MapaMexico x={mx - 382 * s} y={my - 241 * s} ancho={1000 * s} conCA={false} color={color} /></g>;
}
// Fila de íconos de México que se llenan: n = cuántos Méxicos (con fracción). total = íconos a dibujar.
function FilaMexicos({ T, n, total = 4, x = 110, y = 350, paso = 145, s = 0.18, aparece = 1 }) {
  return <g>{Array.from({ length: total }, (_, i) => { const f = kclamp(n - i, 0, 1), id = 'fm' + i + Math.round(x);
    const w = (743 - 21) * s, x0 = x + i * paso;
    return <g key={i} opacity={kclamp(aparece * total - i, 0, 1)}>
      <defs><clipPath id={id}><rect x={x0 + 21 * s} y={y - 10} width={w * f} height={200} /></clipPath></defs>
      <g opacity={0.5}><MapaMexico x={x0} y={y} ancho={1000 * s} conCA={false} color="rgba(255,255,255,.6)" /></g>
      <g clipPath={`url(#${id})`}><MapaMexico x={x0} y={y} ancho={1000 * s} conCA={false} color="#3fbf4a" /></g>
    </g>; })}</g>;
}
// Vaso con agua y un cubo de hielo que se derrite; la raya del nivel no se mueve.
function VasoHielo({ T, x = 540, y = 1150, derrite = 0 }) {
  const lado = 120 * (1 - 0.85 * derrite);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -200 -480 L -165 0 L 165 0 L 200 -480" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -186 -300 L -165 0 L 165 0 L 186 -300 Z" fill="#59b7ff" opacity={0.85} />
    <g transform={`translate(${-20} ${-300 - lado * 0.1}) rotate(${8 + derrite * 10})`}>
      <rect x={-lado / 2} y={-lado / 2} width={lado} height={lado} rx={14 + derrite * 20} fill="#eefaff" stroke={KC.ink} strokeWidth={6} opacity={1 - derrite * 0.6} />
      <rect x={-lado / 2 + 12} y={-lado / 2 + 12} width={lado * 0.3} height={lado * 0.15} rx={5} fill="#fff" />
    </g>
    <line x1={-240} y1={-300} x2={240} y2={-300} stroke={KC.red} strokeWidth={6} strokeDasharray="18 12" />
  </g>;
}
// Satélite simple.
function Satelite({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-90} y={-22} width={60} height={44} fill="#2346ff" stroke={KC.ink} strokeWidth={4} />
    <rect x={30} y={-22} width={60} height={44} fill="#2346ff" stroke={KC.ink} strokeWidth={4} />
    <line x1={-60} y1={-22} x2={-60} y2={22} stroke="#9fb3ff" strokeWidth={3} /><line x1={60} y1={-22} x2={60} y2={22} stroke="#9fb3ff" strokeWidth={3} />
    <rect x={-30} y={-30} width={60} height={60} rx={8} fill="#d8d8d8" stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={36} r={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function HieloArticoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Mapa, A: CUES.Antes, H: CUES.Hoy, Hu: CUES.Hueco, P: CUES.Pregunta, E: CUES.Espejo, C: CUES.Circulo, Es: CUES.Estudio, R: CUES.Record, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: el hielo se encoge en time-lapse (de "antes de 2007" al de 2026)
  const vG = klerp(HA_PROM, HA_2026, kprog(T, K.G + 0.2, K.G + 2.6, kEase.suave));
  const vH = klerp(HA_PROM, HA_2026, kprog(T, K.H + 0.3, K.H + 2.4, kEase.suave));
  const vR = klerp(HA_2026, HA_2012, kprog(T, K.R + 0.2, K.R + 1.6, kEase.suave));
  const vida = kprog(T, K.G + 0.1, K.G + 3.0, kEase.sale);
  const RS = K.R + 2.7;   // cambio al vaso
  // rayos del espejo (posición 0..1 a lo largo de cada tramo)
  const ray = (i) => ((T - K.E) * 0.9 + i / 4) % 1;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho */}
      <Escena T={T} a={K.G} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} cx={400} cy={870} Ro={290} valor={vG} />
          <g transform="translate(90 380)">
            <rect x={0} y={0} width={500} height={44} rx={22} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={5} />
            <rect x={6} y={6} width={488 * vida} height={32} rx={16} fill={KC.pink} />
            <text x={0} y={-16} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>tu vida: menos de 20 años</text>
            <text x={0} y={80} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>2007</text>
            <text x={500} y={80} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>2026</text>
          </g></>)}
        <EscalaFija texto="esquema · hielo de septiembre" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 2 · un México como regla */}
      <Escena T={T} a={K.M} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={HA_PROM} />
          <g transform={`translate(0 ${-(1 - kprog(T, K.M + 0.3, K.M + 1.0, kEase.rebote)) * 500})`}><MexicoEscala mx={440} my={835} o={0.85 * kprog(T, K.M + 0.3, K.M + 0.6)} /></g></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 3 · antes: más de tres Méxicos */}
      <Escena T={T} a={K.A} b={K.H}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={HA_PROM} />
          <FilaMexicos T={T} n={klerp(0, HA_PROM / HA_MX, kprog(T, K.A + 0.6, K.A + 3.2, kEase.suave))} /></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 4 · hoy: poco más de dos */}
      <Escena T={T} a={K.H} b={K.Hu}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={vH} />
          <FilaMexicos T={T} n={vH / HA_MX} /></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 5 · el hueco: del tamaño de Alaska */}
      <Escena T={T} a={K.Hu} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={HA_2026} contorno={HA_PROM} hueco={kprog(T, K.Hu + 0.3, K.Hu + 1.2)} />
          <FilaMexicos T={T} n={(HA_PROM - HA_2026) / HA_MX * kprog(T, K.Hu + 1.6, K.Hu + 3.0, kEase.suave)} total={1} x={300} /></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={260} y={900} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 720)`}>?</text>
          <ArticoMapa T={T} cx={260} cy={1060} Ro={110} valor={HA_2026} etiquetas={false} polo={false} /></>)}
      </Escena>
      {/* 7 · el espejo: hielo 50–70 %, mar 6 % */}
      <Escena T={T} a={K.E} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fdcff 0%, #c9f1ff 55%, #c9f1ff 100%)' }}></div>
        {svg(<>
          <Sol T={T} x={300} y={470} r={80} />
          {/* hielo (izquierda) y mar (derecha) */}
          <path d="M 40 960 L 520 960 L 520 1180 L 40 1180 Z" fill="#0b2347" />
          <path d="M 40 930 L 150 915 L 300 935 L 420 918 L 520 930 L 520 1000 L 40 1000 Z" fill="#f4fbff" stroke={KC.ink} strokeWidth={6} />
          <path d="M 560 960 L 1040 960 L 1040 1180 L 560 1180 Z" fill="#0b2347" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${590 + i * 75} ${985 + (i % 2) * 30} q 14 ${-8 + Math.sin(T * 2 + i) * 3} 28 0 t 28 0`} stroke="#3f7cc4" strokeWidth={4} fill="none" />)}
          <rect x={560} y={960} width={480} height={220} fill={KC.red} opacity={0.35 * kprog(T, K.E + 2.0, K.E + 5.5)} />
          <rect x={40} y={1000} width={480} height={180} fill="none" stroke={KC.ink} strokeWidth={6} />
          {/* rayos: al hielo y de regreso (muchos) */}
          {[0, 1, 2, 3].map((i) => { const u = ray(i), x0 = 300, y0 = 560, x1 = 200 + i * 70, y1 = 925;
            const ida = u < 0.5, p = ida ? u * 2 : (u - 0.5) * 2;
            const px = ida ? klerp(x0, x1, p) : klerp(x1, x1 - 120 + i * 30, p), py = ida ? klerp(y0, y1, p) : klerp(y1, 560, p);
            return <g key={i} opacity={kprog(T, K.E + 0.3, K.E + 0.8)}><line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KC.gold} strokeWidth={5} strokeDasharray="10 10" opacity={0.5} />
              <circle cx={px} cy={py} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>; })}
          {/* rayos al mar: se hunden (casi ninguno regresa) */}
          {[0, 1, 2, 3].map((i) => { const u = ray(i + 0.5), x0 = 330, y0 = 560, x1 = 640 + i * 100, y1 = 1060;
            return <g key={i} opacity={kprog(T, K.E + 2.0, K.E + 2.5)}><line x1={x0} y1={y0} x2={x1} y2={y1} stroke={KC.orange} strokeWidth={5} strokeDasharray="10 10" opacity={0.5} />
              <circle cx={klerp(x0, x1, u)} cy={klerp(y0, y1, u)} r={14} fill={KC.orange} stroke={KC.ink} strokeWidth={4} opacity={u > 0.85 ? (1 - u) / 0.15 : 1} /></g>; })}
        </>)}
      </Escena>
      {/* 8 · el círculo vicioso */}
      <Escena T={T} a={K.C} b={K.Es}>
        <FondoLunares color={KC.orange} />
        {svg(<g transform="translate(560 800) scale(0.88)">
          <g transform={`rotate(${(T - K.C) * 40})`}>{[0, 1, 2, 3].map((i) => <path key={i} d="M 0 -250 A 250 250 0 0 1 177 -177" transform={`rotate(${i * 90 + 20})`} stroke={KC.ink} strokeWidth={12} fill="none" markerEnd="" />)}
            {[0, 1, 2, 3].map((i) => <polygon key={'p' + i} points="0,-22 26,0 0,22" fill={KC.ink} transform={`rotate(${i * 90 + 65}) translate(0 -250) rotate(0)`} />)}</g>
          {[['menos hielo', 0, -250, '#f4fbff'], ['mar oscuro', 250, 0, '#0b2347'], ['absorbe más sol', 0, 250, KC.yellow], ['se calienta', -250, 0, KC.red]].map(([t, x, y, c], i) =>
            <g key={i} opacity={kprog(T, K.C + 0.2 + i * 0.4, K.C + 0.5 + i * 0.4)}>
              <circle cx={x} cy={y} r={70} fill={c} stroke={KC.ink} strokeWidth={7} />
              <text x={x} y={y + 112} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{t}</text></g>)}
        </g>)}
      </Escena>
      {/* 9 · el estudio: satélites desde 1979 (NSIDC, Colorado); los 20 años con menos hielo son los últimos 20 */}
      <Escena T={T} a={K.Es} b={K.R}>
        <FondoLunares color={KC.noche} punto="rgba(255,255,255,.08)" />
        {svg(<>
          <g opacity={1 - kprog(T, K.Es + 2.6, K.Es + 3.0)}>
            <ArticoMapa T={T} cx={440} cy={870} Ro={260} valor={HA_2026} />
            <ellipse cx={440} cy={870} rx={380} ry={120} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth={4} strokeDasharray="12 10" />
            <Satelite x={440 + Math.cos((T - K.Es) * 1.6) * 380} y={870 + Math.sin((T - K.Es) * 1.6) * 120} rot={(T - K.Es) * 20} />
          </g>
          <g opacity={kprog(T, K.Es + 2.8, K.Es + 3.2)}>
            {Array.from({ length: 48 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8), on = i >= 28 && T > K.Es + 3.4 + (i - 28) * 0.06;
              return <rect key={i} x={90 + c * 84} y={740 + f * 72} width={74} height={60} rx={12} fill={on ? KC.red : 'rgba(244,251,255,.85)'} stroke={KC.ink} strokeWidth={4} />; })}
            <text x={127} y={779} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>1979</text>
            <text x={715} y={1139} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">2026</text>
            <text x={127} y={995} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">2007</text>
          </g></>)}
      </Escena>
      {/* 10 · récord 2012, y el vaso: ya flota */}
      <Escena T={T} a={K.R} b={RS}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={vR} /><FilaMexicos T={T} n={vR / HA_MX} total={3} /></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>
      <Escena T={T} a={RS} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {svg(<VasoHielo T={T} x={420} y={1160} derrite={kprog(T, RS + 0.4, K.Ci - 0.2, kEase.suave)} />)}
      </Escena>
      {/* 11 · cierre: el mapa del inicio, con el hielo de antes solo dibujado */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ArticoMapa T={T} valor={HA_2026} contorno={HA_PROM} /><FilaMexicos T={T} n={HA_PROM / HA_MX} aparece={kprog(T, K.Ci + 0.5, K.Ci + 2.0)} /></>)}
        <EscalaFija texto="esquema · áreas a la misma escala" largo={0} y={1440} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 2.8} until={K.M - 0.2} texto="hoy: menos hielo que cualquier año antes de 2007" y={1530} x={540} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.M + 1.0} until={K.A - 0.2} texto="México = 1.96 millones de km²" y={470} x={400} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.A + 0.5} until={K.H - 0.2} texto="≈ 6.2 millones de km² · promedio 1981–2010" y={490} x={420} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.H + 2.4} until={K.Hu - 0.2} texto="4.60 millones de km² · 12 sep 2026" y={490} x={420} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.Hu + 1.0} until={K.P - 0.2} texto="faltan 1.62 millones de km² ≈ Alaska" y={490} x={420} tam={28} borde={KC.yellow} />
      <Etq T={T} at={K.Hu + 1.8} until={K.P - 0.2} x={440} y={385} texto="¾ de México" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 0.8} until={K.C - 0.2} texto="hielo: refleja 50–70 %" y={850} x={280} tam={30} borde={KC.white} />
      <Chip T={T} at={K.E + 2.4} until={K.C - 0.2} texto="mar: refleja 6 %" y={900} x={800} tam={30} borde={KC.orange} />
      <Chip T={T} at={K.Es + 0.3} until={K.Es + 2.8} texto="satélites desde 1979" y={410} x={400} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.Es + 0.7} until={K.Es + 2.8} texto="NSIDC · Boulder, Colorado" y={500} x={420} tam={30} borde={KC.white} />
      <Chip T={T} at={K.Es + 3.4} until={K.R - 0.2} texto="los 20 con menos hielo: 2007–2026" y={470} x={420} tam={28} borde={KC.red} />
      <Chip T={T} at={K.R + 0.8} until={RS - 0.2} texto="17 sep 2012 · 3.39 millones de km² · récord" y={490} x={440} tam={26} borde={KC.red} />
      <Chip T={T} at={RS + 0.3} until={K.Ci - 0.2} texto="ya flota: no sube el mar" y={470} x={420} tam={34} borde={KC.ink} />
      <Etq T={T} at={RS + 0.8} until={K.Ci - 0.2} x={660} y={860} texto="nivel: igual" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou - 0.1} texto="el de antes: solo dibujado" y={490} x={420} tam={30} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="Menos de 20: *nunca visto.*" tam={58} />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.A - 0.1} texto="Medido *en Méxicos.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.H - 0.1} texto="1981–2010: *más de 3.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Hu - 0.1} texto="Sep 2026: *poco más de 2.*" tam={54} />
      <Subtitulo T={T} idx={4} at={K.Hu + 0.1} until={K.P - 0.1} texto="Falta *¾ de México.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y a ti *qué te importa?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.C - 0.1} texto="Hielo 50–70 %, *mar 6 %*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.Es - 0.1} texto="Un *círculo vicioso.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.R - 0.1} texto="20 peores: *los últimos 20.*" tam={54} />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Ci - 0.1} texto="Flota: *no sube el mar.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Ese Ártico: *solo dibujado.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mapa + 1.0, CUES.Antes + 1.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Hoy + 2.5, CUES.Hueco - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Espejo + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Espejo + 3.2, CUES.Circulo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Circulo + 0.5, CUES.Estudio + 0.8, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Record + 0.6, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Record + 3.6, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="42" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HieloArticoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HieloArticoShot /></CompositionStage></div>;
}
window.HieloArticoApp = HieloArticoApp;
