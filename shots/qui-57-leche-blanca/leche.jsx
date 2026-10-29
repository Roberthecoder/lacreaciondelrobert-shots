// Shot Químico #57 · Lo blanco de tu leche no es un pigmento (micelas de caseína, grasa y luz rebotando) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const LECHE = '#fbfaf3', DESC = '#e2ebff', GRASA = '#fff1b8', CASEINA = '#f4efe4', AZUL = '#4f8bff', ROJO = '#ff4d3a', VERDE = '#3fdf6a';

// ---------- utilidades de trazo ----------
// Polilínea recortada a la fracción p de su largo total.
function kTrazo(pts, p) {
  if (p <= 0) return [pts[0]];
  const L = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let falta = tot * Math.min(1, p); const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (falta >= L[i - 1]) { out.push(pts[i]); falta -= L[i - 1]; continue; }
    const u = falta / L[i - 1]; out.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); break;
  }
  return out;
}
// Fracción del largo a la que llega cada vértice (para las chispas de cada rebote).
function kFracs(pts) {
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return L.map((v) => v / L[L.length - 1]);
}
// Rayo de luz que avanza rebotando: p = 0..1 del recorrido; chispa en cada vértice al llegar.
function RayoLuz({ T, pts, t0, t1, color = '#fffbe6', ancho = 10, brillo = true, chispas = true, o = 1 }) {
  if (T < t0 || o <= 0) return null;
  const p = kprog(T, t0, t1);
  const vis = kTrazo(pts, p), fr = kFracs(pts);
  const d = vis.map((q, i) => `${i ? 'L' : 'M'} ${q[0]} ${q[1]}`).join(' ');
  return <g opacity={o}>
    {brillo && <path d={d} stroke={color} strokeWidth={ancho * 3.2} opacity={0.25} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {chispas && fr.slice(1, -1).map((f, i) => { const tl = t0 + f * (t1 - t0); if (T < tl) return null; const u = kprog(T, tl, tl + 0.45);
      return <g key={i}><circle cx={pts[i + 1][0]} cy={pts[i + 1][1]} r={10 + u * 46} fill="none" stroke={color} strokeWidth={6 * (1 - u)} opacity={1 - u} />
        <circle cx={pts[i + 1][0]} cy={pts[i + 1][1]} r={9} fill={color} /></g>; })}
  </g>;
}

// ---------- dibujos de cocina ----------
// Vaso de vidrio (origen = centro del fondo). nivel 0..1 de leche.
function Vaso({ x, y, s = 1, nivel = 1, leche = LECHE, halo, children }) {
  const h = 380 * nivel, wTop = (yy) => klerp(120, 150, yy / 380);
  const id = `vs${Math.round(x)}_${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={14} rx={150} ry={22} fill="rgba(0,0,0,.18)" />
    {halo && <path d="M -150 -380 L 150 -380 L 120 0 L -120 0 Z" fill="none" stroke={halo} strokeWidth={34} opacity={0.35} strokeLinejoin="round" />}
    <clipPath id={id}><path d="M -146 -376 L 146 -376 L 117 -4 L -117 -4 Z" /></clipPath>
    <g clipPath={`url(#${id})`}>
      <rect x={-160} y={-h} width={320} height={h} fill={leche} />
      {nivel > 0.02 && <ellipse cx={0} cy={-h} rx={wTop(h)} ry={18} fill={mixHex(leche, '#ffffff', 0.6)} stroke="rgba(0,0,0,.12)" strokeWidth={3} />}
      {children}
    </g>
    <path d="M -150 -380 L 150 -380 L 120 0 L -120 0 Z" fill="rgba(255,255,255,.12)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -118 -350 L -96 -40" stroke="#fff" strokeWidth={12} opacity={0.6} strokeLinecap="round" />
  </g>;
}
// Envase de cartón de leche (origen = centro del cuerpo). inclina en grados (vierte hacia la derecha).
function Carton({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d="M -90 -120 L 0 -200 L 90 -120 Z" fill="#e9f3ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-14} y={-232} width={28} height={36} rx={4} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-90} y={-120} width={180} height={300} rx={10} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-90} y={40} width={180} height={140} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>LECHE</text>
    <path d="M -60 110 Q -30 80 0 110 T 60 110" stroke="#fff" strokeWidth={8} fill="none" />
  </g>;
}
// Sol de ventana con rayos.
function SolVentana({ T, x, y, o = 1 }) {
  return <g opacity={o} transform={`translate(${x} ${y})`}>
    {Array.from({ length: 10 }, (_, i) => { const a = i * 36 + T * 20; return <line key={i} x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * 110} y2={Math.sin(a * Math.PI / 180) * 110} stroke={KC.orange} strokeWidth={12} strokeLinecap="round" />; })}
    <circle r={62} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// ---------- mundo microscópico ----------
// Gotita de grasa (glóbulo): pálido amarillo con brillo.
function Grasa({ x, y, r }) {
  return <g><circle cx={x} cy={y} r={r} fill={GRASA} stroke={KC.ink} strokeWidth={6} />
    <circle cx={x} cy={y} r={r - 9} fill="none" stroke="#f3d67a" strokeWidth={5} opacity={0.7} />
    <ellipse cx={x - r * 0.35} cy={y - r * 0.38} rx={r * 0.26} ry={r * 0.16} fill="#fff" opacity={0.85} /></g>;
}
// Micela de caseína: racimo tipo frambuesa; iones = puntitos de calcio y fosfato.
function Micela({ x, y, r = 28, iones = false, o = 1 }) {
  const sub = Array.from({ length: 8 }, (_, i) => [Math.cos(i * 0.785) * r * 0.55, Math.sin(i * 0.785) * r * 0.55]);
  return <g opacity={o} transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#e8dcc6" stroke={KC.ink} strokeWidth={Math.max(3, r / 9)} />
    {sub.map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r={r * 0.36} fill={CASEINA} stroke="#b9a98d" strokeWidth={Math.max(1.5, r / 22)} />)}
    <circle r={r * 0.34} fill={CASEINA} stroke="#b9a98d" strokeWidth={Math.max(1.5, r / 22)} />
    {iones && sub.map(([dx, dy], i) => <circle key={'i' + i} cx={dx * 0.62 + (i % 2 ? 4 : -4)} cy={dy * 0.62} r={r * 0.09} fill={i % 2 ? KC.cyan : KC.orange} />)}
  </g>;
}
// Partículas del mundo micro (fijas, se mecen). 1 µm ≈ 300 px: micelas ~0.17 µm, gotitas de grasa ~0.6–1 µm (Gedzelman 2008).
const R57 = krng(57);
const GRASAS = [[170, 640, 105], [860, 1050, 120], [300, 1120, 90], [960, 600, 80], [620, 520, 70], [80, 960, 75], [700, 1210, 70]];
const MICELAS = Array.from({ length: 46 }, () => [40 + R57() * 1000, 420 + R57() * 860, 22 + R57() * 12]);
// Puntos de rebote del rayo blanco (sobre micelas y gotitas).
const REB = [[-40, 760], [300, 735], [470, 930], [300, 1040], [560, 1120], [740, 960], [610, 780], [820, 700], [930, 860]];
const REB_MIC = REB.slice(1, -1);
// Ojo dibujado.
function Ojo({ x, y, s = 1, T }) {
  const parp = Math.abs(Math.sin(T * 0.8)) > 0.985 ? 0.15 : 1;
  return <g transform={`translate(${x} ${y}) scale(${s} ${s * parp})`}>
    <path d="M -110 0 Q 0 -90 110 0 Q 0 90 -110 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle r={44} fill="#5aa0ff" stroke={KC.ink} strokeWidth={6} /><circle r={20} fill={KC.ink} /><circle cx={-12} cy={-14} r={9} fill="#fff" />
  </g>;
}
// Tanque del experimento (vista de frente). turb 0..1 = leche agregada.
function Tanque({ x0 = 180, x1 = 860, y0 = 820, y1 = 1140, turb = 0, azul = 0 }) {
  return <g>
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#cfeeff" opacity={0.8} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#ffffff" opacity={0.42 * turb} />
    <rect x={x0} y={(y0 + y1) / 2 - 42} width={x1 - x0} height={84} fill={AZUL} opacity={0.55 * azul} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="none" stroke={KC.ink} strokeWidth={10} />
    <line x1={x0 + 20} y1={y0 + 30} x2={x0 + 20} y2={y1 - 30} stroke="#fff" strokeWidth={10} opacity={0.6} strokeLinecap="round" />
  </g>;
}
function Lampara({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-60} width={110} height={120} rx={16} fill="#2a2f3a" stroke={KC.ink} strokeWidth={8} />
    <path d="M 40 -50 L 70 -70 L 70 70 L 40 50 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <rect x={-40} y={60} width={50} height={90} fill="#2a2f3a" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Medidor de luz (espectrorradiómetro) con su gráfica. az, ro = alto de la curva en azul y en rojo.
function Medidor({ x, y, az = 0, ro = 0 }) {
  const w = 520, h = 210;
  const curva = Array.from({ length: 41 }, (_, i) => { const u = i / 40; const v = 0.25 + az * 0.7 * Math.exp(-Math.pow((u - 0.18) / 0.12, 2)) + ro * 0.7 * Math.exp(-Math.pow((u - 0.85) / 0.13, 2));
    return [x - w / 2 + 40 + u * (w - 80), y + h / 2 - 34 - v * (h - 80)]; });
  return <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={22} fill="#20242e" stroke={KC.ink} strokeWidth={8} />
    <defs><linearGradient id="espectro57" x1="0" x2="1"><stop offset="0" stopColor="#7a5cff" /><stop offset=".25" stopColor={AZUL} /><stop offset=".5" stopColor={VERDE} /><stop offset=".72" stopColor={KC.yellow} /><stop offset="1" stopColor={ROJO} /></linearGradient></defs>
    <rect x={x - w / 2 + 40} y={y + h / 2 - 30} width={w - 80} height={12} rx={6} fill="url(#espectro57)" />
    <path d={curva.map((q, i) => `${i ? 'L' : 'M'} ${q[0]} ${q[1]}`).join(' ')} stroke="#fff" strokeWidth={6} fill="none" strokeLinejoin="round" />
    <text x={x} y={y - h / 2 + 34} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#cfd6e6">espectrorradiómetro</text>
  </g>;
}
function Monitor({ x0 = 140, x1 = 940, y0 = 740, y1 = 1150, children }) {
  return <g>
    <rect x={(x0 + x1) / 2 - 50} y={y1} width={100} height={60} fill="#3a4050" stroke={KC.ink} strokeWidth={8} />
    <rect x={(x0 + x1) / 2 - 170} y={y1 + 56} width={340} height={26} rx={10} fill="#3a4050" stroke={KC.ink} strokeWidth={8} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={26} fill="#2a2f3a" stroke={KC.ink} strokeWidth={10} />
    <rect x={x0 + 26} y={y0 + 26} width={x1 - x0 - 52} height={y1 - y0 - 52} rx={10} fill={KC.noche} />
    {children}
  </g>;
}
// Zigzag denso dentro del vaso (muchos rebotes), determinista.
function zigzagVaso(cx, cy, w, h, n, seed) {
  const R = krng(seed); const pts = [[cx - w / 2 - 260, cy - h * 0.1]];
  for (let i = 0; i < n; i++) pts.push([cx + (R() - 0.5) * w, cy + (R() - 0.5) * h]);
  pts.push([cx + w / 2 + 300, cy - h * 0.55]);
  return pts;
}
const ZZ_MON = zigzagVaso(540, 975, 230, 250, 46, 11);
const ZZ_CIERRE = zigzagVaso(400, 990, 210, 270, 22, 4);
const ZZ_GANCHO = [[-40, 1000], [330, 990], [430, 1090], [360, 900], [470, 960], [410, 1130], [520, 860], [1100, 640]];

function Leche() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Bo: CUES.Bolitas, Re: CUES.Rebote, Bl: CUES.Blanco, Pr: CUES.Pregunta, Az: CUES.Azul, Es: CUES.Estudio, Rs: CUES.Resultado, Ro: CUES.Rojo, Ra: CUES.Rayo, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const vierte = kprog(T, K.G - 0.3, K.G + 0.25, kEase.sale) * (1 - kprog(T, K.G + 2.3, K.G + 2.8));
  const nivel = klerp(0.15, 0.82, kprog(T, K.G, K.G + 2.4, kEase.suave));
  const mece2 = (i) => [Math.sin(T * 0.7 + i) * 6, Math.cos(T * 0.6 + i * 1.3) * 6];
  // micro: la grasa se va al descremar
  const sale = kprog(T, K.Az + 0.3, K.Az + 2.2, kEase.suave);
  const mundoMicro = (conGrasa, iones) => <g>
    {conGrasa && GRASAS.map(([x, y, r], i) => { const [dx, dy] = mece2(i); return <g key={i} transform={`translate(0 ${-sale * (1500 + i * 80)})`} opacity={1 - sale}><Grasa x={x + dx} y={y + dy} r={r} /></g>; })}
    {MICELAS.map(([x, y, r], i) => { const [dx, dy] = mece2(i + 9); return <Micela key={i} x={x + dx} y={y + dy} r={r} iones={iones} />; })}
    {REB_MIC.map(([x, y], i) => <Micela key={'b' + i} x={x} y={y} r={30} iones={iones} />)}
  </g>;
  // rayos de colores hacia el ojo
  const OJO = [905, 1080];
  const colores = [[ROJO, [610, 780]], [VERDE, [740, 960]], [AZUL, [560, 1120]]];
  // azul vs rojo en la descremada
  const zzAzul = [[-40, 700], [250, 690], [380, 880], [230, 990], [470, 1060], [600, 860], [760, 1000], [690, 1180], [900, 1090], [1120, 1150]];
  const rectoRojo = [[-40, 600], [520, 610], [1120, 640]];
  const mitadRo = K.Ro + 1.9;
  const turb = kprog(T, K.Es + 3.2, K.Es + 5.6);
  const azulTanque = kprog(T, K.Rs + 0.1, K.Rs + 0.9);
  const rojoPant = kprog(T, K.Ro + 0.2, K.Ro + 1.1);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el vaso de leche y la luz que entra */}
      <Escena T={T} a={K.G} b={K.Bo} zoom={0.12} origen="37% 52%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <SolVentana T={T} x={90} y={1440} o={kprog(T, K.G + 2.2, K.G + 2.6)} />
          <Vaso x={400} y={1180} nivel={nivel} />
          <Chorro T={T} x0={318} y0={655} x1={400} y1={1170 - nivel * 380} color={LECHE} o={vierte} ancho={22} />
          <Carton x={210} y={680} s={0.8} inclina={klerp(30, 110, kprog(T, K.G - 0.3, K.G + 0.3, kEase.sale)) - 80 * kprog(T, K.G + 2.4, K.G + 3.0)} />
          <RayoLuz T={T} pts={ZZ_GANCHO} t0={K.G + 2.7} t1={K.G + 4.6} color="#fff6c4" ancho={9} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={3.8} y={1430} x={620} />
      </Escena>
      {/* 1–3 · al microscopio: grasa y micelas, el rayo rebota, todos los colores = blanco */}
      <Escena T={T} a={K.Bo} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(180,200,255,.25)" tam={[2, 6]} vel={10} />
        <SvgCapa>
          {mundoMicro(true, T > K.Bo + 3.6)}
          {T > K.Bo + 3.6 && T < K.Re && <g opacity={kprog(T, K.Bo + 3.6, K.Bo + 4.1) * (1 - kprog(T, K.Re - 0.4, K.Re))}>
            <circle cx={540} cy={860} r={190} fill="rgba(13,20,36,.92)" stroke={KC.gold2} strokeWidth={8} />
            <Micela x={540} y={860} r={150 * kprog(T, K.Bo + 3.6, K.Bo + 4.2, kEase.rebote)} iones={true} />
          </g>}
          <RayoLuz T={T} pts={REB} t0={K.Re + 0.3} t1={K.Re + 4.6} color="#fffbe6" o={1 - kprog(T, K.Bl + 0.2, K.Bl + 0.8)} />
          {T > K.Bl && colores.map(([c, p0], i) => <RayoLuz key={i} T={T} pts={[[p0[0], p0[1]], [klerp(p0[0], OJO[0], 0.5) + (i - 1) * 40, klerp(p0[1], OJO[1], 0.5) - 60], OJO]} t0={K.Bl + 0.3 + i * 0.25} t1={K.Bl + 1.6 + i * 0.25} color={c} ancho={9} chispas={false} />)}
          {T > K.Bl && <Ojo x={OJO[0]} y={OJO[1]} s={0.85} T={T} />}
          {T > K.Bl + 2.0 && <circle cx={OJO[0]} cy={OJO[1]} r={40 + 70 * kprog(T, K.Bl + 2.0, K.Bl + 2.6, kEase.sale)} fill="#fff" opacity={0.55 * (1 - 0.5 * kprog(T, K.Bl + 2.6, K.Bl + 3.4))} />}
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={300000} y={1430} x={60} />
      </Escena>
      {/* 4 · pregunta: entera vs descremada */}
      <Escena T={T} a={K.Pr} b={K.Az} zoom={0.06} origen="30% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Vaso x={170} y={1150} s={0.72} nivel={0.85} />
          <Vaso x={400} y={1150} s={0.72} nivel={0.85} leche={DESC} halo={AZUL} />
          <text x={170} y={1210} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>entera</text>
          <text x={400} y={1210} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>descremada</text>
          <text x={285} y={760} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 285 660)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · descremar: se va la grasa, quedan micelas; el azul rebota más */}
      <Escena T={T} a={K.Az} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(180,200,255,.25)" tam={[2, 6]} vel={10} />
        <SvgCapa>
          {mundoMicro(true, false)}
          <RayoLuz T={T} pts={rectoRojo} t0={K.Az + 2.4} t1={K.Az + 3.3} color={ROJO} ancho={10} chispas={false} />
          <RayoLuz T={T} pts={zzAzul} t0={K.Az + 2.6} t1={K.Az + 5.4} color={AZUL} ancho={10} />
          {sale > 0 && sale < 1 && <g opacity={1 - sale}><path d="M 540 760 L 540 520" stroke={KC.gold2} strokeWidth={16} strokeLinecap="round" /><path d="M 500 560 L 540 500 L 580 560" stroke={KC.gold2} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={300000} y={1430} x={60} />
      </Escena>
      {/* 6–8 · 2008, Granada: el tanque */}
      <Escena T={T} a={K.Es} b={mitadRo + 0.2} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <rect x={120} y={955} width={850} height={60} fill="#fff7d6" opacity={0.35 + 0.2 * kprog(T, K.Es + 1.0, K.Es + 1.6)} />
          <Tanque turb={turb} azul={azulTanque} />
          <Lampara x={90} y={985} />
          <rect x={950} y={860} width={50} height={250} rx={8} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
          <ellipse cx={952} cy={985} rx={18} ry={60} fill={mixHex('#fff7d6', '#ff6a2a', rojoPant)} opacity={0.4 + 0.6 * kprog(T, K.Es + 1.0, K.Es + 1.6)} />
          <g transform={`translate(520 ${klerp(560, 700, kprog(T, K.Es + 2.4, K.Es + 3.0, kEase.sale))})`}>
            <rect x={-16} y={-150} width={32} height={130} rx={8} fill="#ffffff" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={-160} rx={34} ry={24} fill={KC.blue} stroke={KC.ink} strokeWidth={5} /></g>
          <Goteo T={T} x={520} y0={690} y1={830} cada={0.35} color="#ffffff" desde={K.Es + 3.0} hasta={K.Es + 5.6} />
          <Medidor x={540} y={1560} az={kprog(T, K.Rs + 0.2, K.Rs + 1.2)} ro={rojoPant * 0.6} />
        </SvgCapa>
      </Escena>
      {/* 8b · igual que el cielo y el atardecer */}
      <Escena T={T} a={mitadRo} b={K.Ra} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#2f6bff 0%,#5aa0ff 30%,#ffb36b 52%,#ff7a3a 59.9%,#3a2a3a 60%,#241a28 100%)' }}></div>
        <SvgCapa>
          <circle cx={700} cy={1152} r={kprog(T, mitadRo + 0.2, mitadRo + 1.2, kEase.sale) * 130} fill="#ff5a2a" stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={1152} width={KW} height={770} fill="#241a28" />
          {[[200, 640], [420, 560], [820, 700]].map(([x, y], i) => <g key={i} transform={`translate(${x + Math.sin(T * 0.3 + i) * 20} ${y})`}><ellipse rx={110} ry={34} fill="#fff" opacity={0.8} /><ellipse cx={50} cy={-20} rx={70} ry={30} fill="#fff" opacity={0.8} /></g>)}
        </SvgCapa>
      </Escena>
      {/* 9 · 2007: la simulación */}
      <Escena T={T} a={K.Ra} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Monitor>
            <g transform="translate(0 0)"><Vaso x={540} y={1110} s={0.82} nivel={0.9} /></g>
            <RayoLuz T={T} pts={ZZ_MON} t0={K.Ra + 3.0} t1={K.Ci - 0.2} color="#fff3a0" ancho={4} brillo={false} />
          </Monitor>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el vaso del inicio, ahora entendido */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="37% 52%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <SolVentana T={T} x={90} y={1440} />
          <Vaso x={400} y={1180} nivel={0.82} />
          <RayoLuz T={T} pts={ZZ_CIERRE} t0={K.Ci + 0.2} t1={K.Ci + 3.2} color="#ffd34d" ancho={7} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={3.8} y={1430} x={620} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.6} texto="¿pintura blanca?" x={330} y={400} tam={44} />
      <Chip T={T} at={K.G + 2.9} until={K.Bo - 0.3} texto="luz rebotando" x={300} y={400} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.Bo + 0.6} until={K.Bo + 3.5} x={285} y={650} texto="gotita de grasa" tam={34} color={GRASA} />
      <Etq T={T} at={K.Bo + 1.9} until={K.Bo + 3.5} x={505} y={930} texto="micela de caseína" tam={34} color={CASEINA} />
      <Etq T={T} at={K.Bo + 4.2} until={K.Re - 0.3} x={745} y={730} texto="Ca  ·  PO₄" tam={36} color={KC.cyan} />
      <Chip T={T} at={K.Bo + 3.8} until={K.Re - 0.3} texto="proteína + calcio + fosfato" y={1500} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.Re + 0.4} until={K.Bl - 0.2} texto={`rebotes: ${Math.min(7, Math.floor(kprog(T, K.Re + 0.3, K.Re + 4.6) * 7.99))}`} y={1500} tam={44} borde="#fffbe6" mono />
      <Chip T={T} at={K.Bl + 1.0} until={K.Pr - 0.2} texto="rojo + verde + azul = blanco" y={1500} tam={38} borde="#ffffff" />
      <Chip T={T} at={K.Az + 0.3} until={K.Az + 2.2} texto="descremar = quitar la grasa" x={540} y={1500} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.Az + 2.6} until={K.Es - 0.2} texto="más chica → desvía más el azul" y={1500} tam={38} borde={AZUL} />
      <Etq T={T} at={K.Az + 3.2} until={K.Es - 0.3} x={90} y={500} texto="rojo: pasa casi derecho" tam={30} color={ROJO} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="2008" quien="Univ. de Granada (España) + EE. UU." revista="Applied Optics · leche descremada en agua" y={560} />
      <Etq T={T} at={K.Es + 3.0} until={K.Rs - 0.2} x={560} y={760} texto="leche descremada" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Rs + 0.3} until={K.Ro - 0.1} x={860} y={1180} texto="de lado: azul" lado="izq" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Ro + 0.4} until={mitadRo} x={930} y={800} texto="lo que cruza: rojizo" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={mitadRo + 0.3} until={K.Ra - 0.2} texto="cielo azul · sol rojo" y={1500} tam={44} borde={KC.orange} />
      <TarjetaEstudio T={T} at={K.Ra + 0.2} until={K.Ra + 2.7} anio="2007" quien="Dinamarca + California" revista="ACM SIGGRAPH · leche simulada" y={560} />
      <Chip T={T} at={K.Ra + 3.6} until={K.Ci - 0.2} texto="un rayo: miles de rebotes" y={1500} tam={42} borde="#fff3a0" />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="luz rebotando = blanco" x={300} y={400} tam={42} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Bo - 0.1} texto="No es pigmento: *es luz.*" />
      <Subtitulo T={T} idx={1} at={K.Bo + 0.1} until={K.Re - 0.1} texto="Grasa y *micelas de caseína.*" />
      <Subtitulo T={T} idx={2} at={K.Re + 0.1} until={K.Bl - 0.1} texto="La luz *rebota y rebota.*" />
      <Subtitulo T={T} idx={3} at={K.Bl + 0.1} until={K.Pr - 0.1} texto="Todos los colores: *blanco.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Az - 0.1} texto="¿Por qué la descremada *se ve azul?*" />
      <Subtitulo T={T} idx={5} at={K.Az + 0.1} until={K.Es - 0.1} texto="Chiquitas: *desvían más el azul.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Rs - 0.1} texto="2008: *leche en un tanque.*" />
      <Subtitulo T={T} idx={7} at={K.Rs + 0.1} until={K.Ro - 0.1} texto="De lado: *luz azul.*" />
      <Subtitulo T={T} idx={8} at={K.Ro + 0.1} until={K.Ra - 0.1} texto="Al cruzar: *luz rojiza.*" />
      <Subtitulo T={T} idx={9} at={K.Ra + 0.1} until={K.Ci - 0.1} texto="Miles de rebotes *por rayo.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Ese blanco *es luz rebotando.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Bolitas + 1.0, CUES.Rebote - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Rebote + 1.0, CUES.Blanco - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Blanco + 0.4, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Azul + 1.0, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Azul + 1.5, CUES.Estudio - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Resultado - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Resultado + 0.2, CUES.Rayo - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Rayo + 3.0, CUES.Cierre - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="57" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LecheApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Leche /></CompositionStage></div>;
}
window.LecheApp = LecheApp;
