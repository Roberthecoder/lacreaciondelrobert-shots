// Shot Fungi Mati #57 · El tronco de 8 metros que quizá no era hongo: Prototaxites — NARRADO (gancho 1 "Esto no es X" + N1/N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (reconstrucción simplificada).

const PX = { tronco:'#cdb68a', tronco2:'#a88f62', fibra:'#8c7550', planta:'#5aa83a', planta2:'#3d7f26', espor:'#d9a441', piedra:'#7d8794', piedra2:'#a9b2bd' };

// Plantita tipo Rhynia: tallos sin hojas que se bifurcan, con esporangios en la punta. Base en (x, y), alto h px.
function Rhynia({ x, y, h = 100, rot = 0, crece = 1 }) {
  if (crece <= 0) return null;
  const H = h * crece, w = Math.max(3, h * 0.06);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 L 0 ${-H * 0.5}`} stroke={PX.planta2} strokeWidth={w + 2} strokeLinecap="round" />
    <path d={`M 0 ${-H * 0.5} Q ${-H * 0.15} ${-H * 0.75} ${-H * 0.2} ${-H}`} stroke={PX.planta} strokeWidth={w} fill="none" strokeLinecap="round" />
    <path d={`M 0 ${-H * 0.5} Q ${H * 0.12} ${-H * 0.7} ${H * 0.22} ${-H * 0.9}`} stroke={PX.planta} strokeWidth={w} fill="none" strokeLinecap="round" />
    <ellipse cx={-H * 0.2} cy={-H - w * 1.4} rx={w * 1.1} ry={w * 2} fill={PX.espor} stroke={KC.ink} strokeWidth={2} />
    <ellipse cx={H * 0.22} cy={-H * 0.9 - w * 1.4} rx={w * 1.1} ry={w * 2} fill={PX.espor} stroke={KC.ink} strokeWidth={2} />
  </g>;
}

// El "tronco" de Prototaxites: columna lisa, sin ramas ni hojas, punta redondeada. Base en (x, y); alto en px.
function Tronco({ x, y, alto, ancho, crece = 1, fibras = true }) {
  if (crece <= 0) return null;
  const H = alto * crece, w = ancho / 2;
  const d = `M ${-w * 1.12} 0 Q ${-w} ${-w * 0.3} ${-w} ${-w * 0.6} L ${-w * 0.86} ${-H + w * 0.9} Q ${-w * 0.8} ${-H} 0 ${-H} Q ${w * 0.8} ${-H} ${w * 0.86} ${-H + w * 0.9} L ${w} ${-w * 0.6} Q ${w} ${-w * 0.3} ${w * 1.12} 0 Z`;
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={PX.tronco} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${w * 0.35} ${-w * 0.4} L ${w * 0.3} ${-H + w}`} stroke={PX.tronco2} strokeWidth={w * 0.35} strokeLinecap="round" opacity=".6" />
    {fibras && [-0.55, -0.15, 0.6].map((k, i) => <path key={i} d={`M ${w * k} ${-w * 0.5} Q ${w * (k + 0.06)} ${-H * 0.5} ${w * k * 0.9} ${-H + w * 1.1}`} stroke={PX.fibra} strokeWidth={3} fill="none" opacity=".7" />)}
    <path d={`M ${-w * 0.5} ${-H + w * 0.35} Q 0 ${-H + w * 0.12} ${w * 0.5} ${-H + w * 0.35}`} stroke="#efe0bd" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}

// Paisaje del Devónico temprano: cielo (FondoLunares, fuera), suelo, plantitas y el tronco. ppm = píxeles por metro.
const PLANTAS_POS = [[60, 0.9], [130, 0.6], [210, 1.0], [300, 0.7], [380, 0.95], [700, 0.8], [780, 1.0], [860, 0.65], [950, 0.9], [1020, 0.7]];
function Paisaje({ T, ppm = 90, suelo = 1180, tx = 560, crece = 1, plantas = 1 }) {
  return <>
    <rect x={-20} y={suelo} width={KW + 40} height={KH - suelo + 20} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={suelo} width={KW + 40} height={18} fill="#7a5532" />
    {PLANTAS_POS.map(([px, k], i) => <Rhynia key={i} x={px} y={suelo + 4} h={0.38 * ppm * k} rot={mece(T, i + 2, 0.25) * 4} crece={plantas} />)}
    <Tronco x={tx} y={suelo + 6} alto={8 * ppm} ancho={1.0 * ppm} crece={crece} />
  </>;
}
// Regla vertical de altura (en metros).
function Regla({ x, y, alto, texto, prog = 1, lado = 'izq' }) {
  if (prog <= 0) return null;
  const h = alto * prog, dx = lado === 'izq' ? -1 : 1;
  return <g>
    <line x1={x} y1={y} x2={x} y2={y - h} stroke={KC.ink} strokeWidth={6} />
    <line x1={x - 16} y1={y} x2={x + 16} y2={y} stroke={KC.ink} strokeWidth={6} />
    <line x1={x - 16} y1={y - h} x2={x + 16} y2={y - h} stroke={KC.ink} strokeWidth={6} />
    {prog > 0.9 && <text x={x + dx * 26} y={y - h + 14} textAnchor={lado === 'izq' ? 'end' : 'start'} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">{texto}</text>}
  </g>;
}
// Silueta humana (1.70 m). Base de los pies en (x, y); h = alto en px.
function Silueta({ x, y, h }) {
  const k = h / 170;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle cx={0} cy={-156} r={14} fill="#6d7a8c" stroke={KC.ink} strokeWidth={3 / k} />
    <path d="M -17 -138 L 17 -138 L 21 -88 L 14 -86 L 12 -60 L 10 0 L 2 0 L 0 -58 L -2 0 L -10 0 L -12 -60 L -14 -86 L -21 -88 Z" fill="#6d7a8c" stroke={KC.ink} strokeWidth={3 / k} />
    <line x1={-30} y1={-48} x2={30} y2={-48} stroke={KC.white} strokeWidth={2 / k} strokeDasharray={`${4 / k} ${3 / k}`} />
  </g>;
}

// Tubos entrelazados de Prototaxites (al microscopio). 3 tipos: delgado (~10 µm), mediano (20–40 µm), grueso de pared gruesa (~40 µm).
// ppu = píxeles por µm. g = 0..1 crecen.
function tubosLista(seed) {
  const r = krng(seed), L = [];
  for (let i = 0; i < 22; i++) {
    const tipo = i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1;
    const y0 = 420 + r() * 900, y1 = y0 + (r() - 0.5) * 360, a = (r() - 0.5) * 260, b = (r() - 0.5) * 260;
    L.push({ tipo, d: `M -60 ${y0} C 300 ${y0 + a} 700 ${y1 + b} 1140 ${y1}`, del: r() * 0.4 });
  }
  return L.sort((p, q) => p.tipo - q.tipo);
}
const TUBOS = tubosLista(57);
function Tubos({ g = 1, ppu = 2, gris = 0 }) {
  const ANCHO = { 1: 10, 2: 30, 3: 40 }, PARED = { 1: 1, 2: 1.5, 3: 4 };
  const col = { 1: '#f3e6c4', 2: '#e8c98a', 3: '#d9a35a' };
  return <g>{TUBOS.map((t, i) => { const u = kclamp((g - t.del) / 0.6, 0, 1); if (u <= 0) return null; const w = ANCHO[t.tipo] * ppu, p = Math.max(3, PARED[t.tipo] * ppu * 1.4);
    const da = `${u * 1600} 2000`;
    return <g key={i} opacity={1 - gris * 0.5}>
      <path d={t.d} stroke={KC.ink} strokeWidth={w + 6} fill="none" strokeDasharray={da} strokeLinecap="round" />
      <path d={t.d} stroke={mixHex(col[t.tipo], '#777777', gris)} strokeWidth={w} fill="none" strokeDasharray={da} strokeLinecap="round" />
      <path d={t.d} stroke="#3a2c1c" strokeWidth={Math.max(2, w - 2 * p)} fill="none" strokeDasharray={da} strokeLinecap="round" opacity=".55" />
    </g>; })}</g>;
}

// Espectro (esquema): curva con picos y bandas sombreadas de la quitina.
function Espectro({ x, y, w = 820, h = 230, picos, bandas = [], prog = 1, color = KC.yellow, titulo, marcaVacia = 0 }) {
  const N = 120, pts = [];
  for (let i = 0; i <= N * prog; i++) { const u = i / N; let v = 0.06 + 0.02 * Math.sin(u * 40); for (const [c, a, s] of picos) v += a * Math.exp(-Math.pow((u - c) / s, 2)); pts.push(`${x + u * w} ${y + h - v * h}`); }
  return <g>
    <rect x={x - 20} y={y - 70} width={w + 40} height={h + 110} rx={22} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={6} />
    {bandas.map(([a, b], i) => <rect key={i} x={x + a * w} y={y} width={(b - a) * w} height={h} fill="rgba(232,166,42,.28)" />)}
    <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke={KC.texto} strokeWidth={3} />
    {pts.length > 1 && <path d={'M ' + pts.join(' L ')} stroke={color} strokeWidth={6} fill="none" strokeLinejoin="round" />}
    <text x={x} y={y - 24} style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto}>{titulo}</text>
    {marcaVacia > 0 && bandas.map(([a, b], i) => <text key={'x' + i} x={x + (a + b) / 2 * w} y={y + 60} textAnchor="middle" style={{ font:`400 ${96 * marcaVacia}px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={3}>✗</text>)}
  </g>;
}
const BANDAS_Q = [[0.28, 0.36], [0.62, 0.7]];

// Cadena de quitina (esquema): anillos de azúcar unidos.
function Quitina({ x, y, n = 6, prog = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: n }, (_, i) => { const on = kclamp(prog * n - i, 0, 1); if (on <= 0) return null;
    const cx = i * 110, hex = Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 3 * k + Math.PI / 6; return `${cx + Math.cos(a) * 38} ${Math.sin(a) * 38 * (i % 2 ? -1 : 1)}`; }).join(' L ');
    return <g key={i} opacity={on}>
      {i > 0 && <line x1={cx - 72} y1={0} x2={cx - 38} y2={0} stroke={KC.texto} strokeWidth={6} />}
      <path d={'M ' + hex + ' Z'} fill="rgba(47,224,168,.25)" stroke={KC.mint} strokeWidth={6} />
      <text x={cx} y={i % 2 ? -56 : 76} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.lilac}>N</text>
    </g>; })}</g>;
}

// Champiñón de cocina (esquema): sombrero blanco, láminas café rosado, anillo.
function Champi({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 0 L -28 -130 L 28 -130 L 34 0 Z" fill="#f4eee2" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 -92 Q -56 -80 -46 -70 Q 0 -78 46 -70 Q 56 -80 30 -92 Z" fill="#f4eee2" stroke={KC.ink} strokeWidth={5} />
    <path d="M -130 -128 Q -120 -260 0 -262 Q 120 -260 130 -128 Q 0 -112 -130 -128 Z" fill="#f7f1e6" stroke={KC.ink} strokeWidth={7} />
    <path d="M -122 -126 Q 0 -100 122 -126 L 110 -116 Q 0 -96 -110 -116 Z" fill="#a06b5c" stroke={KC.ink} strokeWidth={4} />
    <path d="M -70 -220 Q -20 -248 40 -236" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}
function Tabla({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-380} y={0} width={760} height={90} rx={30} fill="#d79b5e" stroke={KC.ink} strokeWidth={8} />
    <rect x={-380} y={70} width={760} height={30} rx={12} fill="#b97a3f" stroke={KC.ink} strokeWidth={6} />
    {[-200, 0, 200].map((dx, i) => <path key={i} d={`M ${dx - 90} 30 Q ${dx} 20 ${dx + 90} 34`} stroke="#b97a3f" strokeWidth={4} fill="none" />)}
  </g>;
}
// Bloque de pedernal (chert) con un trocito de tubos fósiles dentro.
function Pedernal({ T, x, y, s = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 120 L -260 -150 L -60 -220 L 220 -180 L 310 -20 L 250 170 L -120 210 Z" fill={PX.piedra} stroke={KC.ink} strokeWidth={9} />
    <path d="M -230 -110 L -60 -170 L 180 -140" stroke={PX.piedra2} strokeWidth={14} fill="none" strokeLinecap="round" />
    <g style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${KC.yellow})` } : null}>
      <rect x={-90} y={-40} width={170} height={110} rx={30} fill="#d8c08f" stroke={KC.ink} strokeWidth={5} />
      {[-20, 5, 30, 52].map((dy, i) => <path key={i} d={`M -82 ${dy} q 40 ${-8 + Math.sin(T + i) * 3} 80 0 t 80 0`} stroke="#8c6a3a" strokeWidth={i % 2 ? 4 : 7} fill="none" />)}
    </g>
  </g>;
}
// Balanza que no se decide.
function Balanza({ T, x, y, izq, der, ang }) {
  const a = ang * Math.PI / 180, L = 330, yl = -Math.sin(a) * L, yr = Math.sin(a) * L;
  const Plato = ({ px, py, texto, col }) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-90} y2={140} stroke={KC.ink} strokeWidth={4} /><line x1={0} y1={0} x2={90} y2={140} stroke={KC.ink} strokeWidth={4} />
    <path d="M -130 140 L 130 140 Q 100 200 0 200 Q -100 200 -130 140 Z" fill={col} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={128} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink} stroke="#fff" strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 520 L 110 520 L 30 470 L 20 0 L -20 0 L -30 470 Z" fill="#c9a24a" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${ang})`}><rect x={-L - 10} y={-12} width={2 * L + 20} height={24} rx={12} fill="#e8c35e" stroke={KC.ink} strokeWidth={6} /></g>
    <circle r={26} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <Plato px={-Math.cos(a) * L} py={yl} texto={izq} col="#fff1c9" />
    <Plato px={Math.cos(a) * L} py={yr} texto={der} col="#e3d5ff" />
  </g>;
}

function ProtoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Devonico, Pl: CUES.Plantas, Tu: CUES.Tubos, H: CUES.Hongo, Ca: CUES.Carbono, P: CUES.Pregunta, E: CUES.Estudio, Q: CUES.Quitina, S: CUES.Sinhuella, L: CUES.Linaje, De: CUES.Debate, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const crece = kprog(T, K.G + 0.1, K.G + 1.6, kEase.sale);
  const Qm = K.Q + 2.6, Qe = K.Q + 5.0; // quitina: champiñón → pared → espectro
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y Devónico: el tronco de 8 m en su paisaje */}
      <Escena T={T} a={K.G} b={K.Pl} zoom={0.04} origen="50% 70%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Paisaje T={T} crece={crece} plantas={kprog(T, K.G, K.G + 0.8)} />
          <Regla x={460} y={1186} alto={720} texto="8 m" prog={kprog(T, K.G + 0.6, K.G + 1.8, kEase.sale)} />
        </>)}
      </Escena>
      {/* 3 · las plantas no pasaban de 40 cm: vista de cerca de la base */}
      <Escena T={T} a={K.Pl} b={K.Tu} zoom={0.04} origen="50% 80%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={-20} y={1180} width={KW + 40} height={760} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={-20} y={1180} width={KW + 40} height={18} fill="#7a5532" />
          <Tronco x={830} y={1190} alto={2400} ancho={300} />
          <Silueta x={520} y={1184} h={510 * kprog(T, K.Pl + 0.3, K.Pl + 0.9, kEase.sale)} />
          {[40, 120, 210, 300, 380, 620].map((px, i) => <Rhynia key={i} x={px} y={1184} h={[110, 80, 118, 95, 120, 70][i]} rot={mece(T, i, 0.3) * 4} crece={kprog(T, K.Pl + 0.6 + i * 0.12, K.Pl + 1.2 + i * 0.12, kEase.sale)} />)}
          <g opacity={kprog(T, K.Pl + 1.4, K.Pl + 1.8)}>
            <line x1={0} y1={1064} x2={680} y2={1064} stroke={KC.white} strokeWidth={5} strokeDasharray="18 12" />
            <text x={20} y={1046} style={{ font:`700 40px ${KF.mono}` }} fill={KC.white} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">&lt; 40 cm</text>
          </g>
          <Regla x={440} y={1184} alto={510} texto="1.70 m" prog={kprog(T, K.Pl + 0.4, K.Pl + 1.0)} />
        </>)}
      </Escena>
      {/* 4–5 · por dentro: maraña de tubos; Hueber 2001: ¿hongo? */}
      <Escena T={T} a={K.Tu} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <defs><clipPath id="lente57"><circle cx={540} cy={860} r={430} /></clipPath></defs>
          <g clipPath="url(#lente57)">
            <rect x={0} y={400} width={KW} height={900} fill="#20160d" />
            <Tubos g={kprog(T, K.Tu - 0.2, K.Tu + 2.2)} gris={kprog(T, K.H + 2.6, K.H + 3.2) * 0.6} />
            {T > K.H + 2.4 && <g opacity={kprog(T, K.H + 2.6, K.H + 3.2)}><RedHifas T={T} x={540} y={880} g={kprog(T, K.H + 2.6, K.H + 4.4)} seed={7} n={260} escala={0.42} color={FK.hifa} ancho={4} brillo={0.6} /></g>}
          </g>
          <circle cx={540} cy={860} r={430} fill="none" stroke={KC.gold} strokeWidth={16} />
        </>)}
      </Escena>
      {/* 6 · 2007: el carbono dice que no vivía solo de la luz */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1180} width={KW + 40} height={760} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          <g transform={`translate(170 640) rotate(${T * 20})`}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-90} x2={0} y2={-130} stroke={KC.orange} strokeWidth={12} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}<circle r={72} fill={KC.orange} stroke={KC.ink} strokeWidth={7} /></g>
          <Rhynia x={260} y={1184} h={170} />
          <Tronco x={830} y={1190} alto={560} ancho={130} />
          {(() => { const a = kprog(T, K.Ca + 1.6, K.Ca + 2.2, kEase.sale), b = kprog(T, K.Ca + 2.2, K.Ca + 2.8, kEase.sale); return <>
            {a > 0 && <line x1={200} y1={720} x2={klerp(200, 250, a)} y2={klerp(720, 990, a)} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 12" />}
            {b > 0 && <line x1={240} y1={680} x2={klerp(240, 750, b)} y2={klerp(680, 760, b)} stroke={KC.ink} strokeWidth={8} strokeDasharray="20 12" />}
          </>; })()}
          <Sello T={T} at={K.Ca + 2.3} x={340} y={950} texto="✓" color={KC.leaf} r={60} />
          <Sello T={T} at={K.Ca + 2.9} x={830} y={560} texto="✗" color={KC.red} r={60} />
        </>)}
      </Escena>
      {/* 7 · ¿un hongo de ocho metros? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><rect x={-20} y={1180} width={KW + 40} height={760} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} /><Tronco x={200} y={1190} alto={640} ancho={110} /><Interrogacion T={T} x={300} y={760} tam={360} /></>)}
      </Escena>
      {/* 8 · 2026: fósiles de Rhynie, Escocia, en piedra */}
      <Escena T={T} a={K.E} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Pedernal T={T} x={540} y={980} s={1.25} brillo={kprog(T, K.E + 3.0, K.E + 3.6)} />)}
      </Escena>
      {/* 9 · el champiñón de tu cocina → su pared de quitina → la huella química */}
      <Escena T={T} a={K.Q} b={Qm} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<><Tabla x={540} y={1100} /><Champi x={480} y={1110} s={1.5 * kprog(T, K.Q - 0.3, K.Q + 0.4, kEase.rebote)} /></>)}
      </Escena>
      <Escena T={T} a={Qm} b={K.S} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {T < Qe + 0.4 && <g opacity={1 - kprog(T, Qe - 0.2, Qe + 0.3)}>
            <rect x={40} y={600} width={1000} height={220} rx={110} fill="#1d3a33" stroke={KC.mint} strokeWidth={34} />
            {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={120 + (i * 67) % 840} cy={660 + ((i * 37) % 100) + Math.sin(T * 2 + i) * 6} r={8 + (i % 3) * 4} fill="rgba(246,243,236,.35)" />)}
            <text x={540} y={725} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto} opacity=".8">hifa (esquema)</text>
            <circle cx={900} cy={600} r={60} fill="none" stroke={KC.white} strokeWidth={5} strokeDasharray="12 8" opacity={kprog(T, Qm + 0.3, Qm + 0.6)} />
            <line x1={900} y1={660} x2={760} y2={900} stroke={KC.white} strokeWidth={5} strokeDasharray="12 8" opacity={kprog(T, Qm + 0.3, Qm + 0.6)} />
            <Quitina x={130} y={1010} n={8} prog={kprog(T, Qm + 0.5, Qm + 2.0)} s={1.1} />
          </g>}
          {T > Qe - 0.3 && <g opacity={kprog(T, Qe - 0.3, Qe + 0.2)}>
            <Espectro x={130} y={720} picos={[[0.32, 0.75, 0.025], [0.66, 0.6, 0.03], [0.15, 0.2, 0.05], [0.85, 0.25, 0.05]]} bandas={BANDAS_Q} prog={kprog(T, Qe + 0.1, Qe + 1.6)} color={KC.mint} titulo="hongo fósil (misma piedra)" />
          </g>}
        </>)}
      </Escena>
      {/* 10 · en Prototaxites no apareció; su forma no coincide con ningún hongo */}
      <Escena T={T} a={K.S} b={K.L} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.S + 2.3, K.S + 2.7)}>
            <Espectro x={130} y={740} h={150} picos={[[0.32, 0.75, 0.025], [0.66, 0.6, 0.03], [0.15, 0.2, 0.05], [0.85, 0.25, 0.05]]} bandas={BANDAS_Q} prog={1} color={KC.mint} titulo="hongo fósil" />
            <Espectro x={130} y={1010} h={150} picos={[[0.18, 0.55, 0.035], [0.48, 0.7, 0.03], [0.8, 0.45, 0.04]]} bandas={BANDAS_Q} prog={kprog(T, K.S + 0.1, K.S + 1.2)} color={KC.yellow} titulo="Prototaxites" marcaVacia={kprog(T, K.S + 1.2, K.S + 1.5, kEase.rebote)} />
          </g>
          {T > K.S + 2.3 && <g opacity={kprog(T, K.S + 2.3, K.S + 2.8)}>
            <g transform="translate(130 1060) scale(0.85)"><Seta x={0} y={0} crece={1} /></g>
            <g transform="translate(300 1060) scale(0.6)"><Champi x={0} y={0} /></g>
            <RedHifas T={T} x={460} y={940} g={1} seed={4} n={120} escala={0.18} color={FK.hifa} ancho={3} />
            <text x={300} y={1160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>hongos conocidos</text>
            <text x={620} y={980} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.S + 3.0, K.S + 3.3)}>≠</text>
            <g clipPath="url(#lenteS57)"><g transform="translate(560 640) scale(0.42)"><Tubos g={1} /></g></g>
            <defs><clipPath id="lenteS57"><circle cx={860} cy={960} r={150} /></clipPath></defs>
            <circle cx={860} cy={960} r={150} fill="none" stroke={KC.gold} strokeWidth={10} />
            <text x={860} y={1160} textAnchor="middle" style={{ font:`italic 700 30px ${KF.mono}` }} fill={KC.yellow}>Prototaxites</text>
          </g>}
        </>)}
      </Escena>
      {/* 11 · proponen un linaje extinto */}
      <Escena T={T} a={K.L} b={K.De} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {(() => { const p = kprog(T, K.L + 0.1, K.L + 1.2, kEase.sale); const R = [[-340, 'plantas', KC.leaf], [-80, 'animales', KC.pink], [190, 'hongos', KC.yellow]];
            return <g transform="translate(470 1150)">
              <line x1={0} y1={0} x2={0} y2={-260 * p} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
              {R.map(([dx, t, c], i) => <g key={i} opacity={p}><path d={`M 0 -240 Q ${dx * 0.6} -360 ${dx} ${-560}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
                <text x={dx} y={-590} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={c} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{t}</text></g>)}
              {(() => { const q = kprog(T, K.L + 1.0, K.L + 1.8, kEase.sale); return q > 0 && <g>
                <path d={`M 0 -120 Q 200 -180 ${klerp(0, 330, q)} ${klerp(-120, -400, q)}`} stroke="#7a5a2a" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={kprog(T, K.L + 2.0, K.L + 2.4) > 0 ? '30 14' : 'none'} />
                <text x={330} y={-440} textAnchor="middle" style={{ font:`italic 900 40px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke" opacity={q}>Prototaxites</text>
                <text x={340} y={-310} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.L + 2.0, K.L + 2.4)}>✝ extinto</text>
              </g>; })()}
            </g>; })()}
        </>)}
      </Escena>
      {/* 12 · debate abierto */}
      <Escena T={T} a={K.De} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Balanza T={T} x={540} y={780} izq="hongo" der="linaje extinto" ang={9 * Math.sin((T - K.De) * 1.7) * kprog(T, K.De, K.De + 0.6)} />)}
      </Escena>
      {/* 13 · cierre: el mismo tronco del inicio, ahora con un "?" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="50% 70%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Paisaje T={T} />
          <Regla x={460} y={1186} alto={720} texto="8 m" />
          <g opacity={kprog(T, K.C + 0.5, K.C + 1.0)}><Interrogacion T={T} x={300} y={760} tam={300} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.6} until={K.D + 0.4} texto="¿árbol?" x={200} y={370} tam={44} />
      <Chip T={T} at={K.G + 2.2} until={K.D + 0.4} texto="¿hongo?" x={200} y={490} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.D + 0.3} until={K.Pl - 0.3} x={600} y={1110} texto="Prototaxites" it tam={40} color={KC.ink} />
      <NumeroGigante T={T} at={K.D + 1.2} until={K.Pl - 0.3} valor={400} dur={1.2} etiqueta="hace unos" x={220} y={660} tam={160} color={KC.yellow} />
      <Chip T={T} at={K.D + 1.8} until={K.Pl - 0.3} texto="millones de años · Devónico" x={300} y={830} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Pl + 1.0} until={K.Tu - 0.3} x={20} y={985} texto="plantas tipo Rhynia" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pl + 2.0} until={K.Tu - 0.3} texto="él: hasta 8 m" x={330} y={480} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Tu + 0.2} until={K.H - 0.3} texto="POR DENTRO · tubos" x={360} y={360} tam={38} borde={KC.gold} mono />
      <Etq T={T} at={K.Tu + 1.0} until={K.H + 2.4} x={240} y={1462} texto="tubos de ~10 a ~40 µm" tam={30} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.H + 0.2} until={K.H + 2.5} anio="2001" quien="F. Hueber · Smithsonian, Washington" revista="Review of Palaeobotany and Palynology" y={560} />
      <Chip T={T} at={K.H + 3.0} until={K.Ca - 0.3} texto="¿hilos de hongo (hifas)?" x={360} y={360} tam={36} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Ca + 0.1} until={K.Ca + 1.6} anio="2007" quien="Boyce et al. · isótopos de carbono" revista="Geology" y={560} />
      <Etq T={T} at={K.Ca + 2.4} until={K.P - 0.3} x={330} y={1040} texto="planta: vive de la luz" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ca + 3.0} until={K.P - 0.3} texto="Prototaxites: no solo de la luz" x={420} y={430} tam={34} borde={KC.red} />
      <Chip T={T} at={K.P + 0.2} until={K.E - 0.3} texto="¿hongo de 8 m?" x={300} y={360} tam={44} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2026" quien="equipo de Edimburgo" revista="Loron et al. · Science Advances" y={520} />
      <Etq T={T} at={K.E + 3.0} until={K.Q - 0.3} x={240} y={1462} texto="pedernal de Rhynie, Escocia" tam={30} color={KC.ink} />
      <NumeroGigante T={T} at={K.E + 3.2} until={K.Q - 0.3} valor={407} dur={1.0} sufijo=" millones de años" etiqueta="fósiles de" x={370} y={500} tam={70} color={KC.yellow} />
      <Etq T={T} at={K.Q + 0.5} until={Qm - 0.3} x={670} y={980} texto="champiñón" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Q + 0.9} until={Qm - 0.3} x={670} y={1035} texto="Agaricus bisporus" it tam={28} color={KC.ink} />
      <Chip T={T} at={Qm + 0.2} until={Qe - 0.3} texto="AL MICROSCOPIO · pared celular" x={430} y={540} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={Qm + 1.0} until={Qe - 0.3} x={130} y={1150} texto="cadena de quitina (esquema)" tam={30} color={KC.mint} />
      <Etq T={T} at={Qe + 1.6} until={K.S - 0.3} x={120} y={1070} texto="bandas de la quitina" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.S + 1.4} until={K.S + 2.3} texto="otros picos, sin la quitina" x={420} y={430} tam={32} borde={KC.red} />
      <Chip T={T} at={K.S + 2.9} until={K.L - 0.3} texto="forma: no coincide" x={360} y={480} tam={36} borde={KC.red} />
      <Chip T={T} at={K.L + 1.4} until={K.De - 0.3} texto="propuesta · Loron et al. 2026" x={400} y={380} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.De + 1.6} until={K.C - 0.3} texto="solo revisaron 1 especie" x={400} y={380} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.De + 2.0} until={K.C - 0.3} x={300} y={470} texto="P. taiti" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.De + 3.4} until={K.C - 0.3} texto="debate abierto" x={540} y={1440} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="aún no sabemos qué era" x={330} y={360} tam={38} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Pl} texto="1 m" largo={90} />
      <BarraEscala T={T} at={K.Pl} until={K.Tu} texto="1 m" largo={300} />
      <BarraEscala T={T} at={K.Tu} until={K.Ca} texto="50 µm" largo={100} />
      <BarraEscala T={T} at={K.Ca} until={K.P} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.Q} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.Q} until={Qm} texto="5 cm" largo={260} />
      <BarraEscala T={T} at={Qm} until={Qe} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.S + 2.3} until={K.L} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 m" largo={90} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="No es un árbol… *¿ni un hongo?*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.Pl - 0.1} texto="Prototaxites: hace *unos 400 millones de años.*" />
      <Subtitulo T={T} idx={2} at={K.Pl + 0.1} until={K.Tu - 0.1} texto="Plantas de *menos de 40 cm.*" />
      <Subtitulo T={T} idx={3} at={K.Tu + 0.1} until={K.H - 0.1} texto="Por dentro: *tubos microscópicos.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.Ca - 0.1} texto="2001: ¿un *hongo gigante?*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.P - 0.1} texto="No vivía *solo de la luz.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Un hongo de 8 m? *No tan rápido.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Q - 0.1} texto="2026: fósiles de *407 millones de años.*" />
      <Subtitulo T={T} idx={8} at={K.Q + 0.1} until={K.S - 0.1} texto="Los hongos: paredes de *quitina.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.L - 0.1} texto="Aquí *no apareció.*" />
      <Subtitulo T={T} idx={10} at={K.L + 0.1} until={K.De - 0.1} texto="¿Un linaje *ya extinto?*" />
      <Subtitulo T={T} idx={11} at={K.De + 0.1} until={K.C - 0.1} texto="El debate *sigue abierto.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Aún no sabemos *qué era.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.D + 0.5, K.Pl - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pl + 0.8, K.Tu - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 2.8, K.Ca - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.0, K.Q - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Q + 0.8, Qm - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.S + 0.3, K.L - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.De + 0.5, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="57" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PrototaxitesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ProtoShot /></CompositionStage></div>;
}
window.PrototaxitesApp = PrototaxitesApp;
