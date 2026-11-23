// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Festivo #02 · Día de Muertos · Biotecnológico: el hongo que infla el pan de muerto — NARRADO (N1 "Por dentro": pan → masa al microscopio → pan partido).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (tamaños y número de levaduras, burbujas y cromosomas no son reales).
const PAN = { costra:'#d98a2b', costraClara:'#f2b552', costraOscura:'#a85a17', miga:'#f7e3b4', hoyo:'#c79550', borde:'#7a4310' };
const svgFull = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

// Papel picado: tira de banderitas de colores que se mecen arriba de la pantalla.
function PapelPicado({ T, y = 0, n = 6, colores = [KC.pink, KC.violet, KC.mint, KC.yellow, KC.cyan, KC.orange] }) {
  const w = KW / n;
  return <svg width={KW} height={230} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 22 Q ${KW / 2} 52 ${KW} 22`} stroke={KC.ink} strokeWidth={5} fill="none" />
    {Array.from({ length: n }, (_, i) => { const x = i * w + 8, r = Math.sin(T * 2.2 + i) * 3;
      return <g key={i} transform={`rotate(${r} ${x + w / 2} 30)`}>
        <path d={`M ${x} 30 L ${x + w - 16} 30 L ${x + w - 16} 170 L ${x + (w - 16) * 0.75} 150 L ${x + (w - 16) / 2} 170 L ${x + (w - 16) / 4} 150 L ${x} 170 Z`} fill={colores[i % colores.length]} stroke={KC.ink} strokeWidth={4} />
        <circle cx={x + (w - 16) / 2} cy={80} r={18} fill="rgba(0,0,0,.28)" />
        <path d={`M ${x + 20} 120 l 14 -14 l 14 14 M ${x + w - 66} 120 l 14 -14 l 14 14`} stroke="rgba(0,0,0,.28)" strokeWidth={8} fill="none" />
      </g>; })}
  </svg>;
}

// Mesa de madera oscura: el escenario de las escenas a escala real (el pan ya no flota en el vacío).
function Mesa({ y = 1270 }) {
  return <g>
    <rect x={0} y={y} width={KW} height={KH - y} fill="#1f130b" />
    {[1, 2, 3, 4].map((k) => <line key={k} x1={0} x2={KW} y1={y + k * 150} y2={y + k * 150} stroke="#2c1b10" strokeWidth={5} />)}
    {[[180, 0], [640, 1], [400, 2], [860, 3], [240, 4]].map(([x, k]) => <line key={x} x1={x} x2={x} y1={y + k * 150} y2={y + (k + 1) * 150} stroke="#2c1b10" strokeWidth={5} />)}
    <rect x={0} y={y} width={KW} height={9} fill="#5a3a20" />
  </g>;
}

// Pan de muerto (vista de frente). infla: 0..1 (sube y se redondea). partido: 0..1 (se abre y muestra la miga). brillo: los hoyitos brillan.
function PanMuerto({ T, x, y, s = 1, infla = 1, partido = 0, brillo = 0, seed = 7 }) {
  const sy = klerp(0.55, 1, infla), sx = klerp(0.92, 1, infla);
  const r = krng(seed), azucar = Array.from({ length: 70 }, () => [klerp(-230, 230, r()), klerp(-140, 140, r()), 3 + r() * 5]).filter(([a, b]) => (a * a) / (250 * 250) + ((b + 10) * (b + 10)) / (160 * 160) < 1);
  const rh = krng(seed + 3), hoyos = Array.from({ length: 46 }, () => [klerp(-210, 210, rh()), klerp(-110, 130, rh()), 6 + rh() * 18]).filter(([a, b, q]) => (a * a) / (225 * 225) + ((b - 10) * (b - 10)) / (150 * 150) < 0.8);
  const domo = 'M -260 150 C -275 20 -170 -150 0 -150 C 170 -150 275 20 260 150 Z';
  const hueso = (x2, y2, k) => { const d = `M 0 -150 Q ${x2 * 0.55} ${-150 + (y2 + 150) * 0.15} ${x2} ${y2}`;
    return <g key={k}><path d={d} stroke={PAN.borde} strokeWidth={34} fill="none" strokeLinecap="round" /><path d={d} stroke={PAN.costraClara} strokeWidth={24} fill="none" strokeLinecap="round" />
      {[0.3, 0.55, 0.8].map((u) => { const px = 2 * (1 - u) * u * x2 * 0.55 + u * u * x2, py = (1 - u) * (1 - u) * -150 + 2 * (1 - u) * u * (-150 + (y2 + 150) * 0.15) + u * u * y2;
        return <circle key={u} cx={px} cy={py} r={18} fill={PAN.costraClara} stroke={PAN.borde} strokeWidth={5} />; })}</g>; };
  const abre = kEase.suave(partido);
  return <g transform={`translate(${x} ${y}) scale(${s * sx} ${s * sy})`}>
    <ellipse cx={0} cy={165} rx={290} ry={30} fill="rgba(0,0,0,.25)" />
    {partido < 0.02 ? <>
      <path d={domo} fill={PAN.costra} stroke={PAN.borde} strokeWidth={9} />
      <ellipse cx={-60} cy={-60} rx={140} ry={60} fill={PAN.costraClara} opacity={0.55} />
      {hueso(-240, 95, 'a')}{hueso(240, 95, 'b')}{hueso(-105, 150, 'c')}{hueso(105, 150, 'd')}
      <circle cx={0} cy={-160} r={44} fill={PAN.costraClara} stroke={PAN.borde} strokeWidth={7} />
      {azucar.map(([a, b, q], i) => <circle key={i} cx={a} cy={b} r={q} fill={i % 5 ? '#fff' : KC.pink} opacity={0.9} />)}
    </> : <>
      {/* la otra mitad se aleja a la derecha */}
      <g transform={`translate(${abre * 310} ${-abre * 10}) rotate(${abre * 8})`} opacity={1 - abre * 0.15}>
        <path d={domo} fill={PAN.costra} stroke={PAN.borde} strokeWidth={9} clipPath="none" />
        {hueso(240, 95, 'b2')}
      </g>
      {/* cara del corte: la miga con sus hoyitos */}
      <g transform={`translate(${-abre * 120} 0)`}>
        <path d={domo} fill={PAN.costraOscura} stroke={PAN.borde} strokeWidth={9} />
        <path d="M -232 140 C -245 25 -150 -122 0 -122 C 150 -122 245 25 232 140 Z" fill={PAN.miga} />
        {hoyos.map(([a, b, q], i) => <g key={i}>
          <ellipse cx={a} cy={b} rx={q} ry={q * 0.8} fill={PAN.hoyo} opacity={0.85} />
          {brillo > 0 && <ellipse cx={a} cy={b} rx={q * 1.5} ry={q * 1.2} fill={KC.yellow} opacity={brillo * (0.35 + 0.35 * Math.sin(T * 5 + i))} />}
        </g>)}
      </g>
    </>}
  </g>;
}

// Levadura esquemática (célula ovalada ~5 µm). brote 0..1 = gemación. vida 0..1 (0 = muerta, gris). come = boca abierta (vacuola).
function Levadura({ x, y, s = 1, rot = 0, brote = 0, vida = 1, T = 0, seed = 1 }) {
  const late = 1 + 0.03 * Math.sin(T * 3 + seed), tr = Math.min(1, 1.5 / s);   // el contorno no engorda al agrandar la célula
  const c = vida > 0.5 ? '#f3dfa6' : mixHex('#f3dfa6', '#8a8f99', 1 - vida * 2);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * late})`} opacity={0.35 + 0.65 * vida}>
    {brote > 0 && <ellipse cx={58 + 24 * brote} cy={-6} rx={30 * brote} ry={25 * brote} fill={c} stroke={KC.ink} strokeWidth={5 * tr} />}
    <ellipse cx={0} cy={0} rx={64} ry={50} fill={c} stroke={KC.ink} strokeWidth={6 * tr} />
    <ellipse cx={-16} cy={-14} rx={22} ry={13} fill="#fff" opacity=".45" />
    <circle cx={10} cy={8} r={17} fill="#c9a46a" stroke={KC.ink} strokeWidth={4 * tr} />
    <circle cx={-26} cy={16} r={10} fill="#e9f3ff" stroke="rgba(0,0,0,.35)" strokeWidth={3 * tr} />
  </g>;
}
function Burbuja({ x, y, r, o = 1, etiqueta }) {
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill="rgba(190,235,255,.28)" stroke="#bfefff" strokeWidth={Math.max(3, r * 0.08)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#fff" opacity=".7" />
    {etiqueta && <text x={x} y={y + r * 0.2} textAnchor="middle" style={{ font:`700 ${Math.max(16, r * 0.42)}px ${KF.mono}` }} fill="#eaffff">{etiqueta}</text>}
  </g>;
}
function Cubito({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><rect x={-16} y={-16} width={32} height={32} rx={5} fill="#fff" stroke={KC.ink} strokeWidth={4} /><path d="M -8 -6 L 6 -10" stroke="#cfd6e0" strokeWidth={4} /></g>;
}
// Red de gluten: nodos que se apartan de las burbujas (se estira como globo).
function RedGluten({ T, burbujas, color = '#f1d08a' }) {
  const cols = 12, filas = 16, dx = KW / (cols - 1), dy = 1100 / (filas - 1);
  const pos = (i, j) => { let px = i * dx + Math.sin(j * 1.3 + i) * 18 + Math.sin(T + i * 0.7) * 6, py = 380 + j * dy + Math.cos(i * 1.1 + j) * 18;
    for (const [bx, by, br] of burbujas) { const vx = px - bx, vy = py - by, d = Math.hypot(vx, vy) || 1, lim = br + 26; if (d < lim) { px = bx + vx / d * lim; py = by + vy / d * lim; } }
    return [px, py]; };
  const P = Array.from({ length: cols }, (_, i) => Array.from({ length: filas }, (_, j) => pos(i, j)));
  const lines = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < filas; j++) {
    if (i < cols - 1) lines.push(<line key={`h${i}-${j}`} x1={P[i][j][0]} y1={P[i][j][1]} x2={P[i + 1][j][0]} y2={P[i + 1][j][1]} stroke={color} strokeWidth={7} strokeLinecap="round" opacity=".8" />);
    if (j < filas - 1) lines.push(<line key={`v${i}-${j}`} x1={P[i][j][0]} y1={P[i][j][1]} x2={P[i][j + 1][0]} y2={P[i][j + 1][1]} stroke={color} strokeWidth={7} strokeLinecap="round" opacity=".8" />);
  }
  return <g>{lines}</g>;
}
// Horno con resistencias que brillan.
function Horno({ T, calor = 0 }) {
  return <g>
    <rect x={110} y={520} width={860} height={760} rx={40} fill="#3a3f4b" stroke={KC.ink} strokeWidth={10} />
    <rect x={160} y={580} width={760} height={600} rx={24} fill={mixHex('#1a1d24', '#5a1d0d', calor)} stroke={KC.ink} strokeWidth={8} />
    {[0, 1].map((k) => <path key={k} d={`M 190 ${k ? 1150 : 610} q 40 ${k ? -20 : 20} 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 70 0`} stroke={mixHex('#55301f', '#ff5a1f', calor * (0.8 + 0.2 * Math.sin(T * 9 + k)))} strokeWidth={12} fill="none" strokeLinecap="round" />)}
    <rect x={110} y={1230} width={860} height={50} rx={12} fill="#2a2e37" />
    {[0, 1, 2].map((k) => <circle key={k} cx={760 + k * 60} cy={1255} r={14} fill={KC.texto} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Termómetro: nivel 0..1.
function Termometro({ x, y, nivel }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-260} width={44} height={280} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-12} y={-250 + 250 * (1 - nivel)} width={24} height={250 * nivel + 10} rx={12} fill={KC.red} />
    <circle cx={0} cy={40} r={42} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cromosoma en X.
function Cromosoma({ x, y, s = 1, color = KC.pink, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[-1, 1].map((k) => <path key={k} d={`M ${-30 * k} -60 Q 0 0 ${30 * k} 60`} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" fill="none" />)}
    {[-1, 1].map((k) => <path key={k} d={`M ${-30 * k} -60 Q 0 0 ${30 * k} 60`} stroke={color} strokeWidth={20} strokeLinecap="round" fill="none" />)}
    <circle r={12} fill={KC.ink} />
  </g>;
}

function PanDeMuerto() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Levadura, Co: CUES.Come, S: CUES.Suelta, Gl: CUES.Gluten, P: CUES.Pregunta, H: CUES.Horno, M: CUES.Miga, E: CUES.Estudio, Ge: CUES.Genoma, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.5;
  // gancho: el pan se infla desde el cuadro 0
  const infla = kprog(T, K.G, K.G + 1.1, kEase.rebote);
  // levaduras del microscopio (posiciones fijas)
  const rl = krng(41), levs = Array.from({ length: 9 }, (_, i) => ({ x: 190 + (i % 3) * 350 + (rl() - 0.5) * 90, y: 540 + Math.floor(i / 3) * 340 + (rl() - 0.5) * 70, rot: rl() * 360, s: (0.9 + rl() * 0.4) * 1.5, ph: rl() }));
  // burbujas de la red de gluten que crecen
  const gb = [[300, 760], [720, 640], [560, 1020], [230, 1120], [860, 1000]].map(([x, y], i) => [x, y, klerp(26, 130 + (i % 2) * 40, kprog(T, K.Gl + 0.2 + i * 0.25, K.Gl + 3.8, kEase.suave))]);
  const calor = kprog(T, K.H + 0.3, K.H + 2.0);
  const muere = kprog(T, K.H + 2.4, K.H + 3.6);
  const cambio = kprog(T, K.D + 3.2, K.D + 4.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el pan de muerto se infla */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <PapelPicado T={T} />
        {svgFull(<>
          <Mesa />
          <PanMuerto T={T} x={540} y={1000} s={1.9} infla={infla} />
          {[0, 1, 2, 3, 4].map((k) => { const t0 = K.G + 0.2 + k * 0.18, u = kprog(T, t0, t0 + 0.9); return u > 0 && u < 1 ? <Burbuja key={k} x={300 + k * 120} y={740 - u * 320} r={22 + k * 5} o={1 - u} /> : null; })}
        </>)}
        {/* antes del segundo 3 ya se ve hacia dónde va la historia: las levaduras que viven en la masa */}
        <Lupa T={T} at={K.G + 2.7} until={K.L - 0.2} x={815} y={500} r={165} fx={620} fy={900} tinte={KC.yellow}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><circle cx={r} cy={r} r={r} fill="#1a130c" />
            {[[-52, -38, 20], [50, -22, 140], [-8, 56, 260]].map(([a, b, ro], i) => <Levadura key={i} T={t} seed={i} x={r + a} y={r + b} s={0.72} rot={ro} brote={i === 1 ? 0.5 : 0} />)}</svg>} />
      </Escena>
      {/* 2 · al microscopio: levaduras que brotan */}
      <Escena T={T} a={K.L} b={K.Co} fondo={KC.noche} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #2a1e12 0%, ${KC.noche} 75%)` }}></div>
        <Ambiente T={T} n={30} seed={8} color="rgba(255,230,180,.25)" />
        {svgFull(<>
          {/* entrada: el pan se acerca y desaparece */}
          {T < K.L + 1.2 && <g opacity={1 - kprog(T, K.L + 0.5, K.L + 1.2)}><PanMuerto T={T} x={540} y={1000} s={klerp(1.9, 10, kprog(T, K.L - 0.4, K.L + 1.2, kEase.suave))} /></g>}
          {levs.map((l, i) => { const a = K.L + 0.5 + i * 0.08; return T > a ? <Levadura key={i} T={T} seed={i} x={l.x} y={l.y} rot={l.rot} s={l.s * kprog(T, a, a + 0.4, kEase.rebote)} brote={kprog(T, K.L + 2 + l.ph, K.L + 4.5 + l.ph)} /> : null; })}
        </>)}
        <Escala T={T} z={1.5} pxPorMm={24000} x={60} y={1430} />
      </Escena>
      {/* 3 · come azúcar */}
      <Escena T={T} a={K.Co} b={K.S} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #2a1e12 0%, ${KC.noche} 75%)` }}></div>
        {svgFull(<>
          <Levadura T={T} x={510} y={900} s={5} brote={0.4} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.Co + 0.1 + i * 0.32, u = kprog(T, t0, t0 + 1.1, kEase.suave), ang = i * 2.4, R = 640;
            return u > 0 && u < 1 ? <Cubito key={i} x={510 + Math.cos(ang) * R * (1 - u)} y={900 + Math.sin(ang) * R * 0.95 * (1 - u)} s={2.6 * (1 - u * 0.6)} o={1 - kprog(u, 0.85, 1)} /> : null; })}
        </>)}
        <Escala T={T} z={5} pxPorMm={24000} x={60} y={1430} />
      </Escena>
      {/* 4 · suelta CO2 y alcohol */}
      <Escena T={T} a={K.S} b={K.Gl} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #2a1e12 0%, ${KC.noche} 75%)` }}></div>
        {svgFull(<>
          <Levadura T={T} x={510} y={900} s={5} brote={0.4} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.S + 0.1 + i * 0.3, u = kprog(T, t0, t0 + 1.6), lado = i % 2 ? 1 : -1;
            return u > 0 && u < 1 ? (i % 3 === 2
              ? <g key={i} opacity={1 - kprog(u, 0.8, 1)} transform={`translate(${510 + lado * (300 + u * 180)} ${700 - u * 330}) scale(3)`}><path d="M 0 -18 q 14 18 0 30 q -14 -12 0 -30 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={1.2} /></g>
              : <Burbuja key={i} x={510 + lado * (330 + u * 150)} y={860 - u * 480} r={52 + u * 40} o={1 - kprog(u, 0.85, 1)} etiqueta="CO₂" />) : null; })}
        </>)}
        <Escala T={T} z={5} pxPorMm={24000} x={60} y={1430} />
      </Escena>
      {/* 5 · red de gluten que atrapa el gas */}
      <Escena T={T} a={K.Gl} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 60% at 50% 48%, #2a1a0c 0%, #140d08 70%, #0a0806 100%)' }}></div>
        {svgFull(<>
          <RedGluten T={T} burbujas={gb} />
          {gb.map(([x, y, r], i) => <Burbuja key={i} x={x} y={y} r={r} etiqueta={r > 60 ? 'CO₂' : null} />)}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svgFull(<>
          <PanMuerto T={T} x={540} y={1150} s={1.55} />
          <text x={540} y={800} textAnchor="middle" style={{ font:`400 330px ${KF.titulo}` }} fill={KC.yellow} stroke="#0b1020" strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 540 700)`}>?</text>
        </>)}
      </Escena>
      {/* 7 · el horno */}
      <Escena T={T} a={K.H} b={K.M}>
        <FondoLunares color={KC.coral} />
        {svgFull(<g transform="translate(0 120)">
          <Horno T={T} calor={calor} />
          <PanMuerto T={T} x={470} y={1005} s={1.15} infla={1} />
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.H + 0.8 + i * 0.4, u = kprog(T, t0, t0 + 1.8); return u > 0 && u < 1 ? <path key={i} d={`M ${350 + i * 40} ${790 - u * 110} q 18 -25 0 -50 q -18 -25 0 -50`} stroke="#e8e2ff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.9} /> : null; })}
          <Termometro x={872} y={1060} nivel={0.15 + 0.8 * calor} />
          <g transform="translate(540 395)">
            <circle r={142} fill={KC.noche} stroke={KC.texto} strokeWidth={6} /><text y={-158} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>levaduras</text>
            {[[-56, -36], [56, -24], [-12, 58]].map(([a, b], i) => <Levadura key={i} T={T} x={a} y={b} s={0.7} rot={i * 50} vida={1 - muere} />)}
          </g>
        </g>)}
      </Escena>
      {/* 8 · la miga: burbujas fijas = hoyitos */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {svgFull(<><Mesa y={1190} /><PanMuerto T={T} x={610} y={990} s={1.4} partido={kprog(T, K.M - 0.2, K.M + 1.0)} brillo={kprog(T, K.M + 1.4, K.M + 2.2) * 0.6} /></>)}
      </Escena>
      {/* 9 · el estudio de 1996: unos 600 científicos */}
      <Escena T={T} a={K.E} b={K.Ge}>
        <FondoLunares color={KC.cyan} />
        {svgFull(Array.from({ length: 600 }, (_, i) => { const c = i % 30, r = Math.floor(i / 30), at = K.E + 0.2 + i * 0.006; return T > at ? <circle key={i} cx={75 + c * 32} cy={520 + r * 30} r={11 * kprog(T, at, at + 0.2)} fill={[KC.violet, KC.blue, KC.pink][Math.floor(c / 10)]} opacity=".7" /> : null; }))}
        {svgFull(<Levadura T={T} x={520} y={1390} s={3.1} brote={0.4} />)}
      </Escena>
      {/* 10 · el genoma: primer ser con núcleo leído completo */}
      <Escena T={T} a={K.Ge} b={K.D} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svgFull(<>
          <g transform="translate(530 870) scale(1.3)" opacity={1 - kprog(T, K.D - 0.05, K.D + 0.3)}>
            <ellipse rx={360} ry={280} fill="#f3dfa6" stroke={KC.ink} strokeWidth={6} />
            <circle cx={30} cy={10} r={170} fill="#d9b880" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 8 }, (_, i) => { const at = K.Ge + 0.05 + i * 0.12; return <Cromosoma key={i} x={30 + Math.cos(i * 0.8) * 95} y={10 + Math.sin(i * 1.3) * 95} s={0.55 * kprog(T, at, at + 0.4, kEase.rebote)} rot={i * 40 + T * 10} color={[KC.pink, KC.mint, KC.blue, KC.orange][i % 4]} />; })}
          </g>
        </>)}
      </Escena>
      {/* 11 · tú vs. la levadura, y el gen humano que funciona */}
      <Escena T={T} a={K.D} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svgFull(<g opacity={0.5 + 0.5 * kprog(T, K.D + 2.7, K.D + 3.3)}>
          <g transform={`translate(540 ${klerp(1240, 860, kprog(T, K.D + 2.5, K.D + 3.3, kEase.suave))}) scale(${klerp(0.95, 1.2, kprog(T, K.D + 2.5, K.D + 3.3, kEase.suave))})`}>
            <ellipse rx={420} ry={260} fill="#f3dfa6" stroke={KC.ink} strokeWidth={6} />
            <rect x={-330} y={-30} width={660} height={60} rx={30} fill="#d9b880" stroke={KC.ink} strokeWidth={6} />
            {[-260, -160, 60, 160, 260].map((gx, i) => <rect key={i} x={gx - 40} y={-24} width={80} height={48} rx={12} fill={[KC.pink, KC.lilac, KC.yellow, KC.cyan, KC.coral][i]} stroke={KC.ink} strokeWidth={4} />)}
            <rect x={-80} y={-24 - cambio * 220} width={110} height={48} rx={12} fill={KC.orange} stroke={KC.ink} strokeWidth={5} opacity={1 - cambio * 0.7} />
            {T > K.D + 2.9 && <rect x={-80} y={-24 + (1 - cambio) * 380} width={110} height={48} rx={12} fill={KC.blue} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.D + 2.9, K.D + 3.2)} />}
            {T > K.D + 4.5 && <path d="M -330 -150 l 40 40 l 80 -90" stroke={KC.leaf} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.D + 4.5, K.D + 4.8)} />}
          </g>
        </g>)}
      </Escena>
      {/* 12 · cierre: el mismo pan del inicio, partido, con sus hoyitos brillando */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <PapelPicado T={T} />
        {svgFull(<><Mesa /><PanMuerto T={T} x={klerp(540, 640, kprog(T, K.C + 1.2, K.C + 2.2, kEase.suave))} y={1030} s={1.6} partido={kprog(T, K.C + 1.2, K.C + 2.2)} brillo={kprog(T, K.C + 2.2, K.C + 3.0)} /></>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.L - 0.3} texto="Especial Día de Muertos" x={330} y={330} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.G + 1.0} until={K.G + 2.3} x={70} y={550} texto="¿aire?" tam={44} />
      <Etq T={T} at={K.G + 2.8} until={K.L - 0.3} x={70} y={550} texto="un hongo vivo" tam={44} color={KC.yellow} />
      <Etq T={T} at={K.L + 1.4} until={K.Co - 0.3} x={330} y={1440} texto="Saccharomyces cerevisiae" it tam={36} color={KC.yellow} />
      <Etq T={T} at={K.L + 2.4} until={K.Co - 0.3} x={120} y={705} texto="brota (gemación)" tam={34} />
      <Chip T={T} at={K.L + 3.0} until={K.Co - 0.3} texto="miles de millones por cucharadita" y={1530} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Co + 0.5} until={K.S - 0.3} texto="azúcar que le pusieron" x={340} y={440} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Co + 2.0} until={K.S - 0.3} texto="+ azúcar del almidón de la harina" y={1400} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.S + 0.6} until={K.Gl - 0.3} x={80} y={1340} texto="CO₂ (gas)" tam={40} color={KC.cyan} />
      <Etq T={T} at={K.S + 1.0} until={K.Gl - 0.3} x={1000} y={1340} texto="alcohol (C₂H₅OH)" lado="izq" tam={40} color={KC.lilac} />
      <Chip T={T} at={K.Gl + 0.4} until={K.P - 0.3} texto="red de gluten (elástica)" x={540} y={300} tam={38} borde={'#f1d08a'} />
      <Chip T={T} at={K.P + 0.3} until={K.H - 0.2} texto="¿alcohol?" x={540} y={400} tam={56} borde={KC.yellow} />
      <Etq T={T} at={K.H + 1.2} until={K.M - 0.3} x={600} y={800} texto="vapor de alcohol" tam={32} color={KC.texto} />
      <Etq T={T} at={K.H + 2.4} until={K.M - 0.3} x={1000} y={1490} texto="+50 °C: mueren" lado="izq" tam={42} color={KC.yellow} />
      <Etq T={T} at={K.M + 1.3} until={K.E - 0.3} x={60} y={640} texto="hoyitos = burbujas de CO₂" tam={40} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.Ge - 0.3} anio="1996" quien="Goffeau et al. · unos 600 científicos" revista="Europa, Norteamérica y Japón · Science" y={335} />
      <Etq T={T} at={K.E + 1.4} until={K.Ge - 0.3} x={70} y={1150} texto="cada punto: un científico (esquemático)" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ge + 0.4} until={K.D - 0.3} texto="1.er genoma completo de un ser con núcleo" y={420} tam={36} borde={KC.mint} />
      <NumeroGigante T={T} at={K.Ge + 1.6} until={K.D - 0.3} valor={6000} dur={1.6} etiqueta="genes de la levadura" y={1410} tam={160} color={KC.mint} />
      <Comparativa T={T} at={K.D + 0.1} until={K.D + 2.8} izq={{ valor:6000, texto:'≈6,000', etiqueta:'levadura', color:KC.yellow }} der={{ valor:20000, texto:'≈20,000', etiqueta:'tú', color:KC.pink }} max={20000} y={330} alto={440} />
      <Etq T={T} at={K.D + 3.3} until={K.D + 4.3} x={585} y={1316} texto="gen humano" tam={38} color="#9dbcff" />
      <Chip T={T} at={K.D + 4.6} until={K.C - 0.3} texto="¡funciona! · Kachroo et al. 2015" y={1440} tam={36} borde={KC.leaf} />
      <Etq T={T} at={K.D + 4.9} until={K.C - 0.3} x={110} y={1530} texto="casi la mitad de 414 genes probados" tam={32} color={KC.ink} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="cada hoyito: CO₂ de una levadura" y={1440} tam={36} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="No lo infló el aire: *un hongo vivo.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.Co - 0.1} texto="La levadura: *miles de millones.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.S - 0.1} texto="Se come *el azúcar.*" />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.Gl - 0.1} texto="Suelta *gas y alcohol.*" />
      <Subtitulo T={T} idx={4} at={K.Gl + 0.1} until={K.P - 0.1} texto="El gluten atrapa el gas: *se infla.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Tiene *alcohol?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.M - 0.1} texto="Pan dulce empacado: *>1 g por 100 g.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.E - 0.1} texto="Las burbujas: *los hoyitos.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ge - 0.1} texto="1996: *todo su ADN.*" />
      <Subtitulo T={T} idx={9} at={K.Ge + 0.1} until={K.D - 0.1} texto="Unos *6,000 genes.*" />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.C - 0.1} texto="Genes humanos *que funcionan en ella.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Cada hoyito: *el suspiro de un hongo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Levadura + 1.3, CUES.Levadura + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Suelta + 0.3, CUES.Gluten + 2.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Horno + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Miga + 0.4, CUES.Miga + 3.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Genoma + 0.8, CUES.Genoma + 5.0, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Dato + 3.1, CUES.Dato + 6.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" serie="Festivo" num="02" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PanDeMuertoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PanDeMuerto /></CompositionStage></div>;
}
window.PanDeMuertoApp = PanDeMuertoApp;
