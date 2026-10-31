// Shot Ambiental #52 · El atardecer de Yucatán viene del Sahara — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: NASA (2015, CALIPSO 2007–2013), Yu et al. 2015 (GRL) y Conagua/SMN (comunicado 0397-22, 2022). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (mapa simplificado a mano, nube, satélite y átomos).

// ---------- mapa del Atlántico (proyección simple: 9 px por grado) ----------
const SH_K = 9, SH_LON0 = -100, SH_LAT0 = 35, SH_Y0 = 720;
const shP = (lon, lat) => [(lon - SH_LON0) * SH_K, (SH_LAT0 - lat) * SH_K];
const shPath = (pts) => 'M ' + pts.map(([a, b]) => shP(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
const SH_AFRICA = [[-6, 35.8], [-9.5, 32], [-10, 29.5], [-13, 27.5], [-16, 24], [-17, 21], [-16.5, 19], [-17.4, 14.7], [-16.7, 12], [-15, 11], [-13, 9], [-11, 7], [-7.5, 4.5], [-3, 5], [2, 6.3], [5, 4.5], [8.5, 4.5], [9.7, 3], [9.5, -1], [12, -5], [13.5, -11], [12, -17], [12.5, -20], [25, -20], [25, 37], [10, 37], [10, 34], [0, 35.6]];
const SH_SUDAM = [[-77, 8.5], [-75, 10.8], [-71.5, 12.4], [-68, 10.6], [-63, 10.7], [-61, 9], [-57, 6], [-52, 5], [-50, 1.5], [-48, -1], [-44, -2.5], [-39, -3.5], [-35, -5.5], [-35, -9], [-37, -12], [-39, -15], [-40, -20], [-82, -20], [-81, -6], [-80.5, -2], [-80, 1], [-78.7, 2], [-77.4, 4], [-77.5, 7]];
const SH_EUA = [[-101, 36], [-75, 36], [-76, 35], [-77, 34.6], [-79, 33.2], [-80.8, 32], [-81.4, 30.5], [-80.5, 28], [-80, 26.5], [-80.4, 25.2], [-81.5, 25.3], [-82.7, 27.5], [-83, 29], [-85, 29.7], [-87, 30.4], [-89, 30.3], [-90, 29.2], [-92, 29.6], [-94.5, 29.5], [-96.5, 28.2], [-97.5, 26], [-99.1, 26.4], [-101, 29]];
const SH_CUBA = [[-85, 21.9], [-82, 22.7], [-80, 23.1], [-77, 21.8], [-74.2, 20.2], [-77, 19.9], [-78, 20.7], [-81.5, 21.7]];
const SH_LAESP = [[-74.4, 19.8], [-72.8, 19.9], [-70, 19.7], [-68.4, 18.6], [-71, 18.2], [-74.4, 18.4]];
const SH_AMAZ = [[-74, -1], [-70, 1.5], [-64, 2.5], [-58, 1.5], [-52, 0.5], [-50, -1], [-52, -5], [-56, -9], [-62, -12], [-68, -12], [-73, -9], [-76, -5]];
// Rutas del polvo (lon, lat): de África al Caribe y al Golfo de México; y la rama que baja al Amazonas.
const SH_RUTA = [[-12, 19], [-25, 17], [-40, 15], [-55, 14], [-68, 15], [-78, 17], [-87, 20], [-93, 23.5]];
const SH_RUTA_AM = [[-14, 15], [-30, 11], [-42, 6], [-50, 1], [-58, -3], [-65, -5]];

function shRuta(pts, u) { // punto a una fracción u de la ruta (en píxeles del mapa)
  const xy = pts.map(([a, b]) => shP(a, b)); const L = [0];
  for (let i = 1; i < xy.length; i++) L.push(L[i - 1] + Math.hypot(xy[i][0] - xy[i - 1][0], xy[i][1] - xy[i - 1][1]));
  const d = kclamp(u, 0, 1) * L[L.length - 1];
  for (let i = 1; i < xy.length; i++) if (d <= L[i]) { const f = (d - L[i - 1]) / (L[i] - L[i - 1] || 1); return [klerp(xy[i - 1][0], xy[i][0], f), klerp(xy[i - 1][1], xy[i][1], f)]; }
  return xy[xy.length - 1];
}
// Nube de polvo: manchas ocre a lo largo de la ruta hasta "avance".
function NubePolvo({ T, ruta = SH_RUTA, avance = 1, seed = 3, n = 46, ancho = 1, o = 1, color = '#d9a441' }) {
  const r = krng(seed);
  const bl = Array.from({ length: n }, (_, i) => ({ u: i / (n - 1), dx: (r() - 0.5) * 40, dy: (r() - 0.5) * 34 * ancho, rx: 30 + r() * 30, ry: 14 + r() * 12, f: r() * 6 }));
  return <g opacity={o}>{bl.filter((b) => b.u <= avance).map((b, i) => { const [x, y] = shRuta(ruta, b.u); const fresco = kclamp((avance - b.u) * 8, 0, 1);
    return <ellipse key={i} cx={x + b.dx + Math.sin(T * 0.8 + b.f) * 6} cy={y + b.dy + Math.cos(T * 0.7 + b.f) * 4} rx={b.rx * (0.5 + 0.5 * fresco) * ancho} ry={b.ry * (0.5 + 0.5 * fresco) * ancho} fill={color} opacity={0.42} />; })}</g>;
}
function MapaAtlantico({ T, y = SH_Y0, amazonas = 0, children, etiquetas = true }) {
  const tierra = '#ffe9a8', borde = KC.ink;
  return <g transform={`translate(0 ${y})`}>
    <path d={shPath(SH_SUDAM)} fill={tierra} stroke={borde} strokeWidth={5} strokeLinejoin="round" />
    {amazonas > 0 && <path d={shPath(SH_AMAZ)} fill={KC.leaf} opacity={amazonas} stroke={borde} strokeWidth={3} strokeDasharray="10 8" />}
    <path d={shPath(SH_AFRICA)} fill={tierra} stroke={borde} strokeWidth={5} strokeLinejoin="round" />
    <path d={shPath([[-17, 30], [-6, 31], [10, 31], [25, 31], [25, 15], [10, 14], [-5, 15], [-16.5, 16]])} fill="#e9b96a" opacity={0.8} />
    <path d={shPath(SH_EUA)} fill={tierra} stroke={borde} strokeWidth={5} strokeLinejoin="round" />
    <path d={shPath(CA_CONT)} fill={tierra} stroke={borde} strokeWidth={5} strokeLinejoin="round" />
    <path d={shPath(MX_CONT)} fill={tierra} stroke={borde} strokeWidth={5} strokeLinejoin="round" />
    <path d={shPath(SH_CUBA)} fill={tierra} stroke={borde} strokeWidth={4} />
    <path d={shPath(SH_LAESP)} fill={tierra} stroke={borde} strokeWidth={4} />
    {[[-66.5, 18.2], [-61.5, 16.2], [-61, 14.5], [-61.2, 13.2], [-59.6, 13.1], [-61.5, 10.5]].map(([a, b], i) => { const [x, yy] = shP(a, b); return <circle key={i} cx={x} cy={yy} r={5} fill={tierra} stroke={borde} strokeWidth={3} />; })}
    {etiquetas && <>
      <text x={shP(-42, 26)[0]} y={shP(-42, 26)[1]} textAnchor="middle" style={{ font:`italic 700 34px ${KF.mono}` }} fill="rgba(14,15,18,.55)">Atlántico</text>
      <text x={shP(5, 23)[0]} y={shP(5, 23)[1]} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>SAHARA</text>
    </>}
    {children}
  </g>;
}
// ---------- atardecer en la playa (Yucatán) ----------
function Atardecer({ T, rojo = 0, solY = 0.3, hilo = 0, seed = 2 }) {
  const cielo1 = mixHex('#ffd23f', '#ff6a3d', rojo), cielo2 = mixHex('#fff1a8', '#ffb067', rojo), cielo0 = mixHex('#7fd6ff', '#c2477a', rojo);
  const sy = klerp(560, 900, solY), r = krng(seed);
  const motas = Array.from({ length: 70 }, () => ({ x: r() * KW, y: 250 + r() * 780, s: 2 + r() * 4, v: 10 + r() * 30 }));
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs><linearGradient id="shCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={cielo0} /><stop offset="60%" stopColor={cielo1} /><stop offset="100%" stopColor={cielo2} /></linearGradient></defs>
    <rect width={KW} height={1060} fill="url(#shCielo)" />
    <circle cx={560} cy={sy} r={120} fill={mixHex('#fff6c2', '#ffe08a', rojo)} stroke={KC.ink} strokeWidth={7} />
    {motas.map((m, i) => <circle key={i} cx={(m.x - T * m.v + KW * 4) % KW} cy={m.y} r={m.s} fill="#b9772c" opacity={0.15 + 0.45 * rojo} />)}
    <rect x={0} y={960} width={KW} height={200} fill={mixHex('#1fa6d8', '#7b3f73', rojo * 0.7)} />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={560 - 90 + i * 8 + Math.sin(T * 3 + i) * 10} y={990 + i * 26} width={180 - i * 16} height={8} rx={4} fill={mixHex('#fff6c2', '#ffb067', rojo)} opacity={0.75} />)}
    <path d="M 0 1130 Q 300 1080 600 1120 Q 860 1150 1080 1100 L 1080 1920 L 0 1920 Z" fill="#f3d9a0" stroke={KC.ink} strokeWidth={7} />
    <g transform={`translate(200 1150) rotate(${Math.sin(T * 1.2) * 2})`}>
      <path d="M 0 0 Q 30 -200 80 -380" stroke="#7a4a22" strokeWidth={34} fill="none" strokeLinecap="round" />
      <path d="M 0 0 Q 30 -200 80 -380" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="4 30" />
      {[-60, -20, 25, 70, 120].map((a, i) => <path key={i} d="M 0 0 Q 70 -50 160 10" transform={`translate(80 -380) rotate(${a + 180 * (i < 2 ? 1 : 0) + Math.sin(T * 1.5 + i) * 4})`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />)}
    </g>
    {hilo > 0 && <path d={`M 1080 420 Q 800 330 560 ${sy - 130}`} stroke="#d9a441" strokeWidth={22} strokeLinecap="round" fill="none" strokeDasharray={`${hilo * 900} 2000`} opacity={0.8} />}
  </svg>;
}
// ---------- desierto visto de lado: el viento levanta el polvo ----------
function DesiertoLado({ T, t0 }) {
  const u = kprog(T, t0, t0 + 3.5), r = krng(11);
  const gr = Array.from({ length: 90 }, () => ({ x: 80 + r() * 900, d: r(), s: 3 + r() * 6, f: r() * 6 }));
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <path d="M 0 1060 Q 200 960 380 1040 Q 560 940 760 1030 Q 920 970 1080 1020 L 1080 1920 L 0 1920 Z" fill="#e9b96a" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 1130 Q 260 1060 520 1120 Q 800 1060 1080 1110 L 1080 1920 L 0 1920 Z" fill="#d79a4a" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => { const x = ((T - t0) * 260 + i * 380) % 1300 - 160; return <g key={i} transform={`translate(${x} ${980 - i * 40})`} opacity={0.8}>
      <path d="M -120 0 Q -40 -20 20 0 Q 70 30 40 50 Q 0 60 -10 30" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" /></g>; })}
    {gr.map((g, i) => { const k = kclamp(u * 1.4 - g.d * 0.4, 0, 1); return <circle key={i} cx={g.x + Math.sin(T * 2 + g.f) * 14 - k * 60} cy={1020 - k * (220 + g.d * 520)} r={g.s * 1.4} fill="#9c5a14" opacity={k > 0 ? 0.9 : 0} />; })}
    <g opacity={kprog(T, t0 + 1.2, t0 + 1.8)}>
      <line x1={110} y1={1000} x2={110} y2={1000 - 560 * kprog(T, t0 + 1.2, t0 + 2.6, kEase.sale)} stroke={KC.ink} strokeWidth={8} />
      <path d={`M 90 ${1020 - 560 * kprog(T, t0 + 1.2, t0 + 2.6, kEase.sale)} l 20 -30 l 20 30 Z`} fill={KC.ink} />
    </g>
  </svg>;
}
// ---------- camión de volteo (para la pregunta) ----------
function Camion({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -90 L 40 -90 L 60 -10 L -150 -10 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <path d="M -140 -90 Q -60 -150 30 -90 Z" fill="#d9a441" stroke={KC.ink} strokeWidth={6} />
    <path d="M 60 -70 L 120 -70 L 150 -30 L 150 -10 L 60 -10 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
    <rect x={78} y={-62} width={34} height={26} fill="#bfe7ff" stroke={KC.ink} strokeWidth={4} />
    {[-110, -40, 110].map((cx) => <circle key={cx} cx={cx} cy={0} r={26} fill="#333" stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}
// ---------- satélite con láser (lidar) ----------
function Satelite({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-26} width={110} height={52} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
    <rect x={60} y={-26} width={110} height={52} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
    {[-140, -110, -80, 90, 120, 150].map((lx) => <line key={lx} x1={lx} y1={-26} x2={lx} y2={26} stroke="#9fb4ff" strokeWidth={3} />)}
    <line x1={-60} y1={0} x2={60} y2={0} stroke={KC.ink} strokeWidth={6} />
    <rect x={-46} y={-46} width={92} height={92} rx={10} fill="#d7dbe3" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={46} r={16} fill="#555" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// ---------- ciclón (espiral de nubes) ----------
function Ciclon({ T, x, y, s = 1, deshace = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (1 - 0.45 * deshace)}) rotate(${-T * 90 * (1 - 0.7 * deshace)})`} opacity={1 - 0.6 * deshace}>
    {[0, 1, 2, 3].map((i) => <path key={i} d="M 0 0 Q 40 -10 60 -50 Q 70 -100 20 -120" transform={`rotate(${i * 90})`} stroke="#fff" strokeWidth={26 * (1 - 0.6 * deshace)} fill="none" strokeLinecap="round" strokeDasharray={deshace > 0 ? `${60 - 40 * deshace} ${20 + 40 * deshace}` : 'none'} />)}
    <circle r={16} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function SaharaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, V: CUES.Viaje, P: CUES.Pregunta, S: CUES.Satelite, D: CUES.PorDia, A: CUES.Amazonas, F: CUES.Fosforo, H: CUES.Huracanes, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const km1000 = Math.round(SH_K * 1000 / 107);   // 1° de longitud ≈ 107 km a 15° N
  // avance de la nube en el viaje: primero al Caribe y Sudamérica, luego el pulso a Yucatán y al Golfo
  const avV = klerp(0, 0.62, kprog(T, K.V + 0.2, K.V + 4.2, kEase.suave)) + 0.38 * kprog(T, K.V + 4.6, K.V + 6.6, kEase.suave);
  const avAm = kprog(T, K.V + 0.6, K.V + 4.6, kEase.suave);
  const [yx, yy] = shP(-89, 20.5);
  // Amazonas: el mapa se acerca a Sudamérica
  const zA = klerp(1, 2.1, kprog(T, K.A - 0.4, K.A + 1.2, kEase.suave)), [ax, ay] = shP(-60, -4);
  const camA = `translate(${420 - ax * zA + ax * 0 } ${960 - (SH_Y0 + ay) * zA}) scale(${zA})`;
  const rA = krng(17), lluviaA = Array.from({ length: 60 }, () => ({ lon: -74 + rA() * 22, lat: -11 + rA() * 13, d: rA() }));
  // Fósforo: granos con P que entran al suelo y P que se va por el río
  const rF = krng(23), granos = Array.from({ length: 10 }, (_, i) => ({ x: 120 + i * 62 + rF() * 30, d: rF() * 2.4 }));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: atardecer rojizo en Yucatán */}
      <Escena T={T} a={K.G} b={K.O} zoom={0.08} origen="50% 30%">
        <Atardecer T={T} rojo={kprog(T, K.G, K.G + 2.4, kEase.suave)} solY={kprog(T, K.G, K.O, kEase.suave) * 0.5} />
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el viento levanta el polvo del desierto */}
      <Escena T={T} a={K.O} b={K.V}>
        <FondoLunares color={KC.orange} />
        <DesiertoLado T={T} t0={K.O} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · cruza el Atlántico y llega a Yucatán y al Golfo */}
      <Escena T={T} a={K.V} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaAtlantico T={T}>
          <NubePolvo T={T} ruta={SH_RUTA_AM} avance={avAm} seed={5} n={30} ancho={0.9} />
          <NubePolvo T={T} avance={avV} seed={3} />
          {T > K.V + 6.4 && <circle cx={yx} cy={yy} r={20 + 70 * ((T - K.V - 6.4) % 1)} fill="none" stroke={KC.red} strokeWidth={6} opacity={1 - ((T - K.V - 6.4) % 1)} />}
        </MapaAtlantico>)}
        <EscalaFija texto="1,000 km · esquema" largo={km1000} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · pregunta: ¿unos cuantos camiones? */}
      <Escena T={T} a={K.P} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={900} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 740)`}>?</text>
          <Camion x={270} y={1130} s={0.95} /></>)}
      </Escena>
      {/* 5 · el satélite CALIPSO mide la nube con láser */}
      <Escena T={T} a={K.S} b={K.D}>
        <FondoEspacio T={T} />
        {svg(<>
          <circle cx={540} cy={2700} r={1720} fill="#1f6fd1" stroke={KC.ink} strokeWidth={8} />
          <path d="M -200 1070 Q 540 900 1280 1070" stroke="#d9a441" strokeWidth={70} fill="none" opacity={0.75} strokeLinecap="round" />
          {(() => { const sx = klerp(-150, 1230, kprog(T, K.S, K.D)); return <>
            {Array.from({ length: 6 }, (_, i) => { const u = ((T * 2.2 + i / 6) % 1); return <rect key={i} x={sx - 5} y={400 + u * 560} width={10} height={40} rx={5} fill="#3dff6e" opacity={0.9} />; })}
            <line x1={sx} y1={400} x2={sx} y2={990} stroke="#3dff6e" strokeWidth={3} opacity={0.5} />
            <Satelite T={T} x={sx} y={350} /></>; })()}
        </>)}
        <Etq T={T} at={K.S + 0.8} until={K.D - 0.2} x={760} y={1010} texto="capa de polvo" lado="izq" tam={30} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 6 · casi medio millón de toneladas cada día */}
      <Escena T={T} a={K.D} b={K.A}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g transform="translate(280 900) rotate(-4)">
            <rect x={-170} y={-150} width={340} height={300} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <rect x={-170} y={-150} width={340} height={80} rx={22} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
            <text x={0} y={-92} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff">DÍA</text>
            <text x={0} y={95} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{1 + Math.floor(kprog(T, K.D + 0.2, K.A - 0.3) * 364)}</text>
          </g>
          {(() => { const h = kprog(T, K.D + 0.2, K.A - 0.3); return <path d={`M 560 1150 Q 780 ${1150 - 80 - 300 * h} 1040 1150 Z`} fill="#d9a441" stroke={KC.ink} strokeWidth={7} />; })()}
          <Goteo T={T} x={800} y0={500} y1={1000 - 250 * kprog(T, K.D + 0.2, K.A - 0.3)} cada={0.18} color="#d9a441" desde={K.D + 0.2} hasta={K.A} r={14} />
        </>)}
      </Escena>
      {/* 7 · casi 28 millones de toneladas caen sobre el Amazonas */}
      <Escena T={T} a={K.A} b={K.F} zoom={0}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform={camA}>
          <MapaAtlantico T={T} amazonas={kprog(T, K.A + 0.6, K.A + 1.4)} etiquetas={false}>
            <NubePolvo T={T} ruta={SH_RUTA_AM} avance={1} seed={5} n={30} ancho={0.9} o={0.8} />
            {lluviaA.map((g, i) => { const u = ((T * 0.7 + g.d) % 1); const [x, y] = shP(g.lon, g.lat + 4 * (1 - u)); return <circle key={i} cx={x} cy={y} r={2.2} fill="#9c5a14" opacity={T > K.A + 1.2 ? 0.9 * Math.sin(u * Math.PI) : 0} />; })}
          </MapaAtlantico></g>)}
        <Etq T={T} at={K.A + 1.4} until={K.F - 0.2} x={180} y={930} texto="cuenca del Amazonas" tam={30} color={KC.ink} />
        <EscalaFija texto="1,000 km · esquema" largo={Math.round(km1000 * 2.1)} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · el polvo trae fósforo: casi lo mismo que la selva pierde con la lluvia */}
      <Escena T={T} a={K.F} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={1000} width={KW} height={920} fill="#7a4a22" />
          <path d="M 0 1000 L 1080 1000" stroke={KC.ink} strokeWidth={7} />
          {[150, 330, 520].map((x, i) => <g key={i} transform={`translate(${x} 1000)`}>
            <rect x={-16} y={-260} width={32} height={260} fill="#5b3a1e" stroke={KC.ink} strokeWidth={5} />
            <circle cx={0} cy={-300} r={95} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
            <circle cx={-60} cy={-250} r={60} fill="#34a83e" stroke={KC.ink} strokeWidth={5} />
            <path d="M 0 0 q -30 60 -70 90 M 0 0 q 25 70 60 100" stroke="#c99a6a" strokeWidth={6} fill="none" />
          </g>)}
          {/* río a la derecha que se lleva fósforo */}
          <path d="M 700 1000 Q 760 1080 880 1100 Q 1000 1120 1080 1090 L 1080 1180 Q 980 1200 860 1180 Q 720 1150 680 1000 Z" fill="#2f8fd8" stroke={KC.ink} strokeWidth={6} />
          {granos.map((g, i) => { const u = ((T - K.F + g.d) % 2.4) / 2.4, y = klerp(560, 1060, kclamp(u * 1.3, 0, 1)); return T < K.F + 0.3 ? null : <g key={i} opacity={u > 0.9 ? (1 - u) * 10 : 1}>
            <circle cx={g.x} cy={y} r={20} fill="#d9a441" stroke={KC.ink} strokeWidth={4} />
            <Atomo x={g.x + 14} y={y - 14} r={13} color={KC.orange} letra="P" /></g>; })}
          {[0, 1, 2, 3].map((i) => { const u = ((T * 0.45 + i / 4) % 1); return T < K.F + 2 ? null : <Atomo key={i} x={760 + u * 340} y={1100 + Math.sin(u * 6) * 14} r={14} color={KC.orange} letra="P" />; })}
          <Goteo T={T} x={880} y0={620} y1={1000} cada={0.22} color="#7fd6ff" desde={K.F + 2} hasta={K.H} r={10} />
          <Goteo T={T} x={980} y0={600} y1={1000} cada={0.27} color="#7fd6ff" desde={K.F + 2.1} hasta={K.H} r={10} />
          {/* balanza: entra ≈ sale */}
          <g transform="translate(420 600)" opacity={kprog(T, K.F + 3.4, K.F + 3.9)}>
            <rect x={-150} y={-60} width={300} height={70} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={-12} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>entra ≈ sale</text>
          </g>
        </>)}
        <Etq T={T} at={K.F + 2.2} until={K.H - 0.2} x={1060} y={900} texto="la lluvia se lo lleva" lado="izq" tam={26} color={KC.ink} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 9 · el aire seco puede frenar a los ciclones */}
      <Escena T={T} a={K.H} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaAtlantico T={T}>
          {(() => { const [cx, cy] = shP(-52, 18); const d = kprog(T, K.H + 1.6, K.H + 4.6, kEase.suave); return <>
            <Ciclon T={T} x={cx} y={cy} s={1.1} deshace={d} />
            <NubePolvo T={T} avance={klerp(0.15, 0.75, kprog(T, K.H, K.H + 4.2, kEase.suave))} seed={8} ancho={1.4} /></>; })()}
        </MapaAtlantico>)}
        <EscalaFija texto="1,000 km · esquema" largo={km1000} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: regreso al atardecer, ahora con el hilo de polvo que viene de lejos */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="50% 30%">
        <Atardecer T={T} rojo={1} solY={0.35 + 0.15 * kprog(T, K.C, K.Ou)} hilo={kprog(T, K.C + 0.4, K.C + 2.6, kEase.suave)} />
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* mini mapa del cierre: del Sahara a la selva */}
      {T > K.C + 2 && T < K.Ou + 0.5 && (() => { const o = kprog(T, K.C + 2, K.C + 2.6) * (1 - kprog(T, K.Ou, K.Ou + 0.5)); return <div style={{ position:'absolute', left:60, top:330, width:340, height:340, borderRadius:'50%', overflow:'hidden', border:`8px solid ${KC.ink}`, background:KC.cyan, opacity:o, zIndex:30, boxShadow:'0 14px 30px rgba(0,0,0,.4)' }}>
        <svg width={340} height={340}><g transform={`translate(${170 - shP(-40, 5)[0] * 0.38} ${170 - shP(-40, 5)[1] * 0.38}) scale(0.38)`}><MapaAtlantico T={T} y={0} amazonas={1} etiquetas={false}>
          <NubePolvo T={T} ruta={SH_RUTA_AM} avance={1} seed={5} n={30} ancho={1.6} />
        </MapaAtlantico></g></svg></div>; })()}

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.9} tacharEn={K.G + 2.4} until={K.G + 4.0} texto="¿humo de un incendio?" x={400} y={460} tam={42} />
      <Chip T={T} at={K.G + 3.2} until={K.O - 0.2} texto="polvo del Sahara" y={460} x={380} tam={48} borde={KC.yellow} />
      <Etq T={T} at={K.G + 1.2} until={K.O - 0.2} x={700} y={1240 - 140} texto="Yucatán" tam={34} color={KC.ink} />
      <Etq T={T} at={K.O + 0.6} until={K.V - 0.2} x={160} y={700} texto="desierto del Sahara · África" tam={30} color={KC.ink} />
      <Chip T={T} at={K.O + 1.8} until={K.V - 0.2} texto="↑ muy alto" y={500} x={300} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.V + 1.0} until={K.P - 0.2} x={shP(-60, -5)[0]} y={SH_Y0 + shP(-60, -5)[1]} texto="Sudamérica" tam={26} color={KC.ink} />
      <Etq T={T} at={K.V + 3.4} until={K.P - 0.2} x={shP(-70, 13)[0]} y={SH_Y0 + shP(-70, 13)[1] + 10} texto="Caribe" tam={26} color={KC.ink} />
      <Etq T={T} at={K.V + 5.4} until={K.P - 0.2} x={shP(-93, 25.5)[0]} y={SH_Y0 + shP(-93, 25.5)[1]} texto="Golfo · Yucatán" tam={24} color={KC.ink} />
      <Chip T={T} at={K.V + 0.5} until={K.P - 0.2} texto="primavera · verano" y={470} x={380} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.V + 5.6} until={K.P - 0.2} texto="SMN: aviso de polvo del Sahara" y={590} x={360} tam={28} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.S + 1.2} until={K.S + 4.2} anio="2015" quien="Yu et al. · NASA (CALIPSO)" revista="Geophysical Research Letters" x={540} y={640} />
      <NumeroGigante T={T} at={K.S + 4.4} until={K.D - 0.2} valor={182} dur={1.2} sufijo=" millones" etiqueta="de toneladas de polvo al año salían del Sahara" x={680} y={640} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.S + 4.8} until={K.D - 0.2} texto="promedio 2007–2013" y={800} x={680} tam={30} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.D + 0.3} until={K.A - 0.2} valor={500} dur={1} prefijo="≈ " sufijo=" mil t" etiqueta="de polvo cada día" x={700} y={420} tam={120} color={KC.red} />
      <Chip T={T} at={K.A + 1.0} until={K.F - 0.2} texto="≈ 27.7 millones de t al año" y={470} x={400} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.F + 0.6} until={K.H - 0.2} texto="≈ 22 mil t de fósforo al año" y={470} x={380} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.H + 1.8} until={K.C - 0.2} texto="aire seco: puede frenarlos un tiempo" y={470} x={640} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.H + 0.8} until={K.C - 0.2} x={shP(-52, 18)[0] + 90} y={SH_Y0 + shP(-52, 18)[1] - 160} texto="ciclón" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 2.8} until={K.Ou - 0.1} texto="un desierto que abona una selva" y={1060} x={540} tam={34} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="No es humo: *es polvo del Sahara.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.V - 0.1} texto="El viento lo sube *muy alto.*" />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={K.P - 0.1} texto="Llega a *Yucatán y al Golfo.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.S - 0.1} texto="¿Cuánto *polvo es?*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.D - 0.1} texto="*182 millones* de toneladas al año." />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.A - 0.1} texto="Casi *medio millón* al día." />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.F - 0.1} texto="Casi *28 millones* al Amazonas." />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.H - 0.1} texto="*Fósforo* para la selva." />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.C - 0.1} texto="Aire seco que *puede frenar ciclones.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="El polvo que *abona la selva.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Origen + 1.0, CUES.Viaje - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Viaje + 5.6, CUES.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Satelite + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Satelite + 4.5, CUES.PorDia - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Amazonas + 1.0, CUES.Fosforo - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Fosforo + 2.6, CUES.Huracanes - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Huracanes + 1.0, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="52" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SaharaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SaharaShot /></CompositionStage></div>;
}
window.SaharaApp = SaharaApp;
