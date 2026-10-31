// Shot Ambiental #28 · Novecientos litros por metro cuadrado: la lluvia de la CDMX que se va a la coladera — NARRADO (N4 la imagen que se llena + N2).
// Datos: SEGIAGUA (925.38 mm, 1 ene – 30 sep 2026), Gaceta Oficial CDMX 2025 (284 colonias con tandeo), Sedema (73 mil sistemas desde 2019),
// estudio Tellman et al. con Isla Urbana y la UNAM (2020), fichas técnicas de Isla Urbana. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

const AGUA = '#2f8fd8', AGUA2 = '#7cc7ff', NEGRA = '#7a5230', SUCIA = '#a07a4a';

// Lluvia: rayitas que caen en una caja (x0..x1, y0..y1).
function Lluvia({ T, x0 = 0, x1 = KW, y0 = 0, y1 = KH, n = 40, seed = 3, vel = 1.6, color = '#ffffff', o = 0.75, largo = 46 }) {
  const r = krng(seed), g = Array.from({ length: n }, () => ({ x: x0 + r() * (x1 - x0), p: r(), v: vel * (0.8 + r() * 0.4) }));
  const H = y1 - y0;
  return <g opacity={o}>{g.map((d, i) => { const y = y0 + (((T * d.v + d.p) % 1) * (H + largo)) - largo;
    return <line key={i} x1={d.x} y1={y} x2={d.x - 8} y2={y + largo} stroke={color} strokeWidth={5} strokeLinecap="round" />; })}</g>;
}

// Cubo de vidrio de 1 m × 1 m × 1 m (isométrico) que se llena de agua. (x, y) = esquina frontal de abajo a la izquierda.
function Cubo({ T, x, y, s = 380, nivel = 0, color = AGUA }) {
  const dx = s * 0.42, dy = -s * 0.3, h = s * nivel;
  const P = (pts) => pts.map((p) => p.join(',')).join(' ');
  const ond = (i) => 6 * Math.sin(T * 3 + i);
  return <g transform={`translate(${x} ${y})`}>
    {/* aristas de atrás */}
    <polyline points={P([[dx, dy], [dx, dy - s], [s + dx, dy - s]])} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={0.5} />
    <line x1={0} y1={0} x2={dx} y2={dy} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" opacity={0.5} />
    <rect x={dx} y={dy - s} width={s} height={s} fill="rgba(255,255,255,.18)" />
    {h > 1 && <>
      <polygon points={P([[s, 0], [s + dx, dy], [s + dx, dy - h], [s, -h]])} fill={mixHex(color, '#0b3d91', 0.35)} />
      <rect x={0} y={-h} width={s} height={h} fill={color} opacity={0.92} />
      <polygon points={P([[0, -h], [s, -h], [s + dx, dy - h], [dx, dy - h]])} fill={AGUA2} />
      {[0, 1, 2].map((i) => <ellipse key={i} cx={s * 0.3 + i * s * 0.25 + dx * 0.5} cy={-h + dy * 0.5 + ond(i) * 0.3} rx={18 + ((T * 1.5 + i * 0.33) % 1) * 30} ry={6 + ((T * 1.5 + i * 0.33) % 1) * 9}
        fill="none" stroke="#fff" strokeWidth={3} opacity={1 - ((T * 1.5 + i * 0.33) % 1)} />)}
    </>}
    {/* caras de enfrente (vidrio) */}
    <rect x={0} y={-s} width={s} height={s} fill="rgba(255,255,255,.14)" stroke={KC.ink} strokeWidth={7} />
    <polygon points={P([[s, 0], [s + dx, dy], [s + dx, dy - s], [s, -s]])} fill="rgba(255,255,255,.1)" stroke={KC.ink} strokeWidth={7} />
    <polygon points={P([[0, -s], [s, -s], [s + dx, dy - s], [dx, dy - s]])} fill="rgba(255,255,255,.12)" stroke={KC.ink} strokeWidth={7} />
    <line x1={14} y1={-s + 16} x2={14} y2={-s * 0.55} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.6} />
    {/* medidas */}
    <text x={s / 2} y={46} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>1 m</text>
    <text x={-18} y={-s / 2} textAnchor="end" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>1 m</text>
    <text x={s + dx / 2 + 16} y={dy / 2 + 40} textAnchor="start" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>1 m</text>
  </g>;
}

// Botella de un litro (puede inclinarse para verter).
function Botella({ x, y, lleno = 1, rot = 0, s = 1 }) {
  const h = 200 * lleno;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-40} y={-200} width={80} height={200} rx={16} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
    {h > 6 && <rect x={-34} y={-h} width={68} height={h - 6} rx={10} fill={AGUA} />}
    <rect x={-20} y={-232} width={40} height={34} rx={6} fill="#e9eef5" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-80} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">1 L</text>
  </g>;
}

// Tinaco negro de azotea (cilindro con tapa de domo). corte = ventana que deja ver el nivel (esquema). (x, y) = centro de abajo.
function Tinaco({ x, y, s = 1, lleno = 0, corte = true, o = 1 }) {
  const w = 120, h = 150;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={18} fill="#2b2d31" stroke={KC.ink} strokeWidth={6} />
    {[0.3, 0.6].map((q) => <line key={q} x1={-w / 2 + 4} y1={-h * q} x2={w / 2 - 4} y2={-h * q} stroke="#45484f" strokeWidth={5} />)}
    <path d={`M ${-w / 2 + 8} ${-h + 4} Q 0 ${-h - 46} ${w / 2 - 8} ${-h + 4} Z`} fill="#3a3d43" stroke={KC.ink} strokeWidth={6} />
    <rect x={-16} y={-h - 30} width={32} height={14} rx={4} fill="#3a3d43" stroke={KC.ink} strokeWidth={4} />
    {corte && <g>
      <rect x={-w / 2 + 18} y={-h + 18} width={w - 36} height={h - 34} rx={8} fill="#cfe4f3" stroke={KC.ink} strokeWidth={4} />
      {lleno > 0.01 && <rect x={-w / 2 + 20} y={-16 - (h - 36) * lleno} width={w - 40} height={(h - 36) * lleno} rx={6} fill={AGUA} />}
    </g>}
  </g>;
}

// Casita de azotea plana (CDMX) con tinaco. (x, y) = esquina de abajo a la izquierda.
function Casa({ x, y, w = 300, h = 220, pared = KC.pink, tinaco = true, lleno = 0, s = 1, o = 1, tin = 0.6 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={0} y={-h} width={w} height={h} fill={pared} stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-h - 18} width={w + 24} height={22} fill="#d9d2c4" stroke={KC.ink} strokeWidth={6} />
    <rect x={w * 0.14} y={-h * 0.62} width={w * 0.26} height={h * 0.3} fill="#bfe7ff" stroke={KC.ink} strokeWidth={6} />
    <rect x={w * 0.58} y={-h * 0.55} width={w * 0.24} height={h * 0.55} fill="#8a5a3c" stroke={KC.ink} strokeWidth={6} />
    {tinaco && <Tinaco x={w * 0.78} y={-h - 18} s={tin} lleno={lleno} />}
  </g>;
}

// Separador de primeras lluvias + filtro de hojas + tinaco (corte esquemático).
function SistemaCaptacion({ T, t0 }) {
  const sucio = kprog(T, t0 + 0.4, t0 + 2.0, kEase.suave);          // el separador se llena con el agua sucia
  const limpio = kprog(T, t0 + 2.1, t0 + 4.8, kEase.suave);         // luego el agua limpia va al tinaco
  const flujo = (T * 60) % 40;
  const hoja = (i) => { const u = kclamp((T - t0 - 2.2 - i * 0.5) / 0.8, 0, 1); return u; };
  return <g transform="translate(-130 0)">
    {/* techo y canaleta */}
    <rect x={-100} y={430} width={660} height={40} fill="#d9d2c4" stroke={KC.ink} strokeWidth={7} />
    <rect x={-100} y={470} width={660} height={130} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <path d="M 560 470 L 640 470 L 640 500 L 560 500 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    {/* bajante */}
    <rect x={600} y={500} width={34} height={230} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <line x1={617} y1={500} x2={617} y2={730} stroke={sucio < 1 ? SUCIA : AGUA} strokeWidth={14} strokeDasharray="20 20" strokeDashoffset={-flujo} />
    {/* separador (contenedor) */}
    <rect x={520} y={730} width={200} height={340} rx={24} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
    <rect x={528} y={1062 - 320 * sucio} width={184} height={320 * sucio} rx={18} fill={SUCIA} />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={545 + (i * 23) % 160} cy={1050 - ((i * 37) % 280) * sucio} r={6} fill="#5a3d1e" opacity={sucio} />)}
    <circle cx={620} cy={1050 - 300 * sucio} r={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    {/* desvío al filtro y al tinaco */}
    <rect x={634} y={735} width={170} height={28} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    {limpio > 0 && <line x1={640} y1={749} x2={800} y2={749} stroke={AGUA} strokeWidth={12} strokeDasharray="20 20" strokeDashoffset={-flujo} />}
    {/* filtro de hojas (canasta) */}
    <path d="M 790 730 L 900 730 L 880 820 L 810 820 Z" fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 5 }, (_, i) => <line key={i} x1={800 + i * 22} y1={735} x2={815 + i * 14} y2={815} stroke={KC.ink} strokeWidth={3} />)}
    {[0, 1, 2].map((i) => { const u = hoja(i); return u > 0 && <ellipse key={i} cx={820 + i * 25} cy={klerp(700, 790 - i * 6, u)} rx={18} ry={9} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} transform={`rotate(${20 + i * 40} ${820 + i * 25} ${klerp(700, 790, u)})`} />; })}
    <rect x={830} y={820} width={30} height={90} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    {limpio > 0 && <line x1={845} y1={822} x2={845} y2={905} stroke={AGUA} strokeWidth={12} strokeDasharray="20 20" strokeDashoffset={-flujo} />}
    <Tinaco x={845} y={1170} s={1.5} lleno={limpio * 0.85} />
  </g>;
}

// Contorno esquemático de la CDMX (aproximado) y puntos de colonias dentro.
const CDMX_PTS = [[250, 0], [330, 30], [350, 140], [420, 190], [470, 300], [520, 330], [500, 420], [430, 470], [420, 560], [380, 650], [300, 680], [200, 640], [130, 560], [60, 480], [20, 390], [70, 300], [150, 250], [190, 150], [200, 60]];
function dentro(px, py, pts) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j];
  if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) c = !c; } return c; }
const CDMX_COL = (() => { const r = krng(28), out = []; while (out.length < 284) { const x = r() * 520, y = r() * 680; if (dentro(x, y, CDMX_PTS)) out.push([x, y]); } return out; })();
function MapaCDMX({ T, x, y, s = 1, encendidas = 0 }) {
  const k = Math.floor(encendidas * CDMX_COL.length);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points={CDMX_PTS.map((p) => p.join(',')).join(' ')} fill="#fff6d6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {CDMX_COL.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={i < k ? 9 : 5} fill={i < k ? KC.red : 'rgba(0,0,0,.18)'} stroke={i < k ? KC.ink : 'none'} strokeWidth={2} />)}
  </g>;
}

// Llave que gotea (o se seca).
function Llave({ T, x, y, gotea = 1 }) {
  const u = (T * 1.2) % 1;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-30} width={140} height={44} rx={10} fill="#b9c2cc" stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={-30} width={44} height={90} rx={10} fill="#b9c2cc" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-70} width={30} height={42} rx={6} fill="#b9c2cc" stroke={KC.ink} strokeWidth={6} />
    <rect x={-90} y={-82} width={90} height={18} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    {gotea > 0.05 && <path d={`M 22 ${70 + u * 160} q -14 22 0 30 q 14 -8 0 -30 Z`} fill={AGUA} stroke={KC.ink} strokeWidth={3} opacity={gotea * (1 - u * 0.6)} />}
  </g>;
}

// Íconos de usos.
function IconoUso({ x, y, tipo, ok = true, e = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${e})`}>
    <circle r={120} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {tipo === 'vaso' && <g><path d="M -45 -60 L 45 -60 L 32 70 L -32 70 Z" fill="#dff1ff" stroke={KC.ink} strokeWidth={6} /><path d="M -40 -10 L 40 -10 L 32 70 L -32 70 Z" fill={AGUA} /></g>}
    {tipo === 'baño' && <g><rect x={-30} y={-80} width={70} height={60} rx={8} fill="#eef3f8" stroke={KC.ink} strokeWidth={6} /><path d="M -60 -15 L 60 -15 Q 60 40 0 45 Q -60 40 -60 -15 Z" fill="#eef3f8" stroke={KC.ink} strokeWidth={6} /><rect x={-22} y={44} width={44} height={36} fill="#eef3f8" stroke={KC.ink} strokeWidth={6} /></g>}
    {tipo === 'ropa' && <g><rect x={-62} y={-75} width={124} height={150} rx={14} fill="#eef3f8" stroke={KC.ink} strokeWidth={6} /><circle cy={12} r={42} fill={AGUA2} stroke={KC.ink} strokeWidth={6} /><path d="M -25 12 q 12 -14 25 0 t 25 0" stroke="#fff" strokeWidth={5} fill="none" /><circle cx={-38} cy={-55} r={7} fill={KC.ink} /></g>}
    {tipo === 'trapear' && <g><line x1={30} y1={-85} x2={-10} y2={45} stroke="#8a5a3c" strokeWidth={12} strokeLinecap="round" /><path d="M -60 40 L 40 40 L 30 75 L -50 75 Z" fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} />{[0, 1, 2, 3].map((i) => <line key={i} x1={-45 + i * 22} y1={75} x2={-48 + i * 22} y2={92} stroke={KC.ink} strokeWidth={5} />)}</g>}
    <g transform="translate(82 -82)">
      <circle r={38} fill={ok ? KC.leaf : KC.red} stroke={KC.ink} strokeWidth={6} />
      {ok ? <path d="M -16 2 L -4 14 L 18 -12" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        : <g stroke="#fff" strokeWidth={9} strokeLinecap="round"><line x1={-13} y1={-13} x2={13} y2={13} /><line x1={13} y1={-13} x2={-13} y2={13} /></g>}
    </g>
  </g>;
}

// Monito (persona) para contar.
function Persona({ x, y, s = 1, color = KC.orange, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle cy={-62} r={18} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -24 0 L -24 -26 Q -24 -42 0 -42 Q 24 -42 24 -26 L 24 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function LluviaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mi: CUES.Milimetro, D: CUES.Drenaje, Ta: CUES.Tandeo, P: CUES.Pregunta, Te: CUES.Techo, Pr: CUES.Programa, E: CUES.Estudio, Tr: CUES.Truco, U: CUES.Usos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // 1 · el metro cuadrado: el cubo se llena hasta 0.925 m (925 L) — gancho y cierre
  const nivG = 0.925 * kprog(T, K.G + 0.05, K.G + 4.2, kEase.suave);
  // 2 · un litro sobre un metro cuadrado = 1 mm; pluviómetro hasta 925 mm
  const vierte = kprog(T, K.Mi + 0.3, K.Mi + 1.3, kEase.suave), capa = kprog(T, K.Mi + 0.8, K.Mi + 2.2, kEase.suave);
  const pluvio = 925.38 * kprog(T, K.Mi + 3.6, K.Mi + 5.6, kEase.suave);
  const fase2 = kprog(T, K.Mi + 3.1, K.Mi + 3.6);
  // 5 · techo de 50 m² y 42 tinacos
  const techo = kprog(T, K.Te + 0.2, K.Te + 2.2);
  const litrosTecho = 46250 * kprog(T, K.Te + 0.3, K.Te + 4.4, kEase.suave);
  // 6 · casitas con su sistema
  const casas = Array.from({ length: 24 }, (_, i) => ({ c: i % 6, r: Math.floor(i / 6), t: K.Pr + 0.4 + i * 0.12, pared: [KC.pink, KC.yellow, KC.orange, KC.lilac, KC.cyan, '#ffd2a8'][(i * 7) % 6] }));
  const tiles = Array.from({ length: 16 }, (_, i) => i);
  const encendida = (i) => [1, 3, 4, 6, 9, 11, 12, 14].includes(i);   // esquema: no son alcaldías reales

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 1 m² que junta más de 900 litros */}
      <Escena T={T} a={K.G} b={K.Mi}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Lluvia T={T} x0={40} x1={1040} y0={300} y1={1180} n={46} seed={5} />
          <Cubo T={T} x={90} y={1100} s={350} nivel={nivG} /></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · un litro en un metro cuadrado = 1 mm; luego el pluviómetro */}
      <Escena T={T} a={K.Mi} b={K.D}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g>
          <g opacity={1 - fase2}>
            <polygon points="100,1000 620,1000 840,860 320,860" fill="#e9e3d6" stroke={KC.ink} strokeWidth={7} />
            <polygon points="100,1000 620,1000 840,860 320,860" fill={AGUA} opacity={0.75 * capa} />
            <polygon points="100,1000 620,1000 620,1020 100,1020" fill="#cfc6b4" stroke={KC.ink} strokeWidth={6} />
            <text x={360} y={1080} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>1 m × 1 m</text>
            {vierte > 0.3 && capa < 0.98 && <path d={`M 505 ${640} Q 500 760 470 930`} stroke={AGUA} strokeWidth={18} fill="none" strokeLinecap="round" opacity={0.9} />}
            <Botella x={470} y={640} rot={klerp(0, 120, vierte)} lleno={1 - capa} s={0.9} />
          </g>
          <g opacity={fase2}>
            <rect x={300} y={430} width={170} height={720} rx={24} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={7} />
            <rect x={310} y={1140 - 700 * pluvio / 1000} width={150} height={700 * pluvio / 1000} rx={16} fill={AGUA} />
            {[0, 250, 500, 750, 1000].map((m) => <g key={m}><line x1={300} y1={1140 - m * 0.7} x2={250} y2={1140 - m * 0.7} stroke={KC.ink} strokeWidth={5} />
              <text x={240} y={1150 - m * 0.7} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{m}</text></g>)}
            <path d="M 280 430 L 490 430 L 440 380 L 330 380 Z" fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} />
            <text x={500} y={1010} style={{ font:`400 110px ${KF.titulo}` }} fill={AGUA} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">{kformato(pluvio, 0)} mm</text>
            <text x={385} y={360} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>pluviómetro</text>
          </g>
        </g>)}
      </Escena>
      <Lupa T={T} at={K.Mi + 1.6} until={K.Mi + 3.1} x={820} y={560} r={170} fx={610} fy={1004} tinte={KC.blue} etiqueta="AUMENTADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#e9e3d6" /><rect x={0} y={r - 6} width={r * 2} height={60} fill="#cfc6b4" />
          <rect x={0} y={r - 46} width={r * 2} height={40} fill={AGUA} /><line x1={r * 1.55} y1={r - 46} x2={r * 1.55} y2={r - 6} stroke={KC.ink} strokeWidth={5} />
          <text x={r * 0.75} y={r - 66} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>1 mm</text></svg>} />
      {/* 3 · la lluvia de techos y calles va a la coladera y al drenaje combinado */}
      <Escena T={T} a={K.D} b={K.Ta}>
        <FondoLunares color={KC.mint} />
        {svg(<g>
          <Lluvia T={T} x0={20} x1={1060} y0={300} y1={900} n={44} seed={9} />
          <rect x={0} y={900} width={KW} height={330} fill="#5b3a22" />
          <rect x={0} y={880} width={KW} height={24} fill="#8f9399" stroke={KC.ink} strokeWidth={5} />
          <Casa x={60} y={880} w={330} h={260} pared={KC.yellow} tinaco={false} />
          <rect x={400} y={640} width={26} height={240} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
          <line x1={413} y1={640} x2={413} y2={876} stroke={AGUA} strokeWidth={10} strokeDasharray="18 16" strokeDashoffset={-T * 70} />
          <line x1={430} y1={884} x2={640} y2={884} stroke={AGUA} strokeWidth={10} strokeDasharray="18 16" strokeDashoffset={-T * 70} />
          <rect x={620} y={874} width={90} height={22} fill="#3a3d43" stroke={KC.ink} strokeWidth={4} />
          {[0, 1, 2, 3].map((i) => <line key={i} x1={632 + i * 20} y1={876} x2={632 + i * 20} y2={894} stroke="#8f9399" strokeWidth={4} />)}
          {/* tubo de lluvia (azul) y de la casa (café) que se juntan */}
          <path d="M 665 904 L 665 1060" stroke={KC.ink} strokeWidth={46} fill="none" />
          <path d="M 665 904 L 665 1060" stroke={AGUA} strokeWidth={32} fill="none" />
          <path d="M 220 904 L 220 1080 L 650 1080" stroke={KC.ink} strokeWidth={46} fill="none" strokeLinejoin="round" />
          <path d="M 220 904 L 220 1080 L 650 1080" stroke={NEGRA} strokeWidth={32} fill="none" strokeLinejoin="round" />
          <path d="M 640 1080 L 1080 1080" stroke={KC.ink} strokeWidth={78} fill="none" />
          <path d="M 640 1080 L 1080 1080" stroke={mixHex(NEGRA, AGUA, 0.35)} strokeWidth={62} fill="none" />
          <line x1={650} y1={1080} x2={1080} y2={1080} stroke="rgba(255,255,255,.35)" strokeWidth={10} strokeDasharray="30 30" strokeDashoffset={-T * 90} />
          <line x1={220} y1={1080} x2={640} y2={1080} stroke="rgba(255,255,255,.25)" strokeWidth={8} strokeDasharray="24 26" strokeDashoffset={-T * 70} />
        </g>)}
      </Escena>
      {/* 4 · 284 colonias con agua por tandeo (2025) */}
      <Escena T={T} a={K.Ta} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<g><MapaCDMX T={T} x={70} y={560} s={0.9} encendidas={kprog(T, K.Ta + 0.3, K.Ta + 2.6)} />
          <Llave T={T} x={880} y={760} gotea={1 - kprog(T, K.Ta + 2.0, K.Ta + 3.0)} /></g>)}
        <EscalaFija texto="esquema (mapa aproximado)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Te} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<g>
          <text x={380} y={620} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 380 520)`}>?</text>
          <g transform={`translate(230 ${790 + Math.sin(T * 2.5) * 12})`}><path d="M 0 -130 Q 90 -10 90 40 A 90 90 0 0 1 -90 40 Q -90 -10 0 -130 Z" fill={AGUA} stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={-35} cy={10} rx={18} ry={30} fill="#fff" opacity={0.6} /></g>
          <Casa x={80} y={1170} w={320} h={200} pared={KC.orange} tinaco={false} />
        </g>)}
      </Escena>
      {/* 6 · techo de 50 m² y más de 40 tinacos */}
      <Escena T={T} a={K.Te} b={K.Pr}>
        <FondoLunares color={KC.cyan} />
        {svg(<g>
          {Array.from({ length: 50 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), on = i < Math.floor(techo * 50);
            return <rect key={i} x={90 + c * 62} y={420 + r * 62} width={58} height={58} rx={6} fill={on ? AGUA : '#d9d2c4'} stroke={KC.ink} strokeWidth={4} />; })}
          <Lluvia T={T} x0={90} x1={710} y0={380} y1={730} n={22} seed={12} />
          <text x={870} y={560} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">50 m²</text>
          <text x={870} y={610} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>techo (visto</text>
          <text x={870} y={645} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>desde arriba)</text>
          {Array.from({ length: 42 }, (_, i) => { const c = i % 14, r = Math.floor(i / 14), t = K.Te + 0.6 + i * 0.085;
            return <Tinaco key={i} x={110 + c * 66} y={900 + r * 115} s={0.42} lleno={kprog(T, t, t + 0.4)} o={kprog(T, t - 0.2, t)} />; })}
        </g>)}
      </Escena>
      {/* 7 · más de 73 mil sistemas de Cosecha de Lluvia */}
      <Escena T={T} a={K.Pr} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<g>{casas.map((h, i) => { const e = kprog(T, h.t, h.t + 0.35, kEase.rebote);
          return <Casa key={i} x={70 + h.c * 160} y={860 + h.r * 105} w={130} h={70} pared={h.pared} s={1} o={kprog(T, h.t, h.t + 0.15)} lleno={kprog(T, h.t + 0.3, h.t + 1.2)} tin={0.32 * kclamp(e, 0, 1.2)} />; })}</g>)}
      </Escena>
      {/* 8 · el estudio (2020) */}
      <Escena T={T} a={K.E} b={K.Tr}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g opacity={kprog(T, K.E + 2.9, K.E + 3.3)}>
          {tiles.map((i) => { const c = i % 4, r = Math.floor(i / 4), on = encendida(i) && T > K.E + 3.4 + i * 0.05;
            return <rect key={i} x={430 + c * 120} y={400 + r * 95} width={108} height={84} rx={14} fill={on ? KC.gold : '#d9d2c4'} stroke={KC.ink} strokeWidth={5} />; })}
          {Array.from({ length: 10 }, (_, i) => <Persona key={i} x={130 + i * 90} y={1170} s={1.1} color={[KC.orange, KC.pink, KC.cyan, KC.lilac, KC.leaf][i % 5]} o={kprog(T, K.E + 5.4 + i * 0.08, K.E + 5.6 + i * 0.08)} />)}
        </g>)}
        <EscalaFija texto="esquema: 16 alcaldías" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · el truco: separador de primeras lluvias + filtro */}
      <Escena T={T} a={K.Tr} b={K.U}>
        <FondoLunares color={KC.orange} />
        {svg(<SistemaCaptacion T={T} t0={K.Tr} />)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · usos */}
      <Escena T={T} a={K.U} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<g>
          <IconoUso x={700} y={560} tipo="vaso" ok={false} e={kprog(T, K.U + 0.1, K.U + 0.5, kEase.rebote)} />
          <IconoUso x={210} y={960} tipo="baño" e={kprog(T, K.U + 1.2, K.U + 1.6, kEase.rebote)} />
          <IconoUso x={540} y={1000} tipo="ropa" e={kprog(T, K.U + 1.7, K.U + 2.1, kEase.rebote)} />
          <IconoUso x={870} y={960} tipo="trapear" e={kprog(T, K.U + 2.2, K.U + 2.6, kEase.rebote)} />
        </g>)}
      </Escena>
      {/* 11 · cierre: el mismo metro cuadrado, ahora con el agua hacia un tinaco */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<g><Lluvia T={T} x0={40} x1={1040} y0={300} y1={1180} n={40} seed={5} />
          <Cubo T={T} x={110} y={1150} s={360} nivel={0.925 * (1 - 0.5 * kprog(T, K.C + 1.0, K.C + 4.0, kEase.suave))} />
          <path d="M 470 1120 L 640 1120 L 640 1180 L 860 1180 L 860 1150" stroke={KC.ink} strokeWidth={34} fill="none" strokeLinejoin="round" />
          <path d="M 470 1120 L 640 1120 L 640 1180 L 860 1180 L 860 1150" stroke={AGUA} strokeWidth={20} fill="none" strokeLinejoin="round" strokeDasharray="22 18" strokeDashoffset={-T * 70} />
          <Tinaco x={860} y={1150} s={1.5} lleno={0.15 + 0.7 * kprog(T, K.C + 1.0, K.C + 4.0, kEase.suave)} /></g>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.15} until={K.Mi - 0.2} valor={900} dur={3.6} sufijo="+ L" etiqueta="este año, por cada m²:" x={330} y={470} tam={140} color={KC.yellow} />
      <Chip T={T} at={K.G + 2.6} until={K.Mi - 0.2} texto="CDMX · 1 ene – 30 sep 2026" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Mi + 0.4} until={K.Mi + 3.0} texto="1 L sobre 1 m² = capa de 1 mm" y={430} x={420} tam={34} borde={KC.blue} />
      <Chip T={T} at={K.Mi + 4.0} until={K.D - 0.2} texto="1 ene – 30 sep 2026 · SEGIAGUA" y={1440} x={540} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.D + 1.0} until={K.Ta - 0.2} x={700} y={990} texto="lluvia" tam={32} color={KC.texto} />
      <Etq T={T} at={K.D + 1.8} until={K.Ta - 0.2} x={240} y={990} texto="aguas negras" tam={32} color={KC.texto} />
      <Chip T={T} at={K.D + 2.6} until={K.Ta - 0.2} texto="drenaje combinado · esquema" y={1440} x={540} tam={34} borde={NEGRA} />
      <NumeroGigante T={T} at={K.Ta + 0.3} until={K.P - 0.2} valor={284} dur={2.3} sufijo=" colonias" etiqueta="con agua por tandeo:" x={540} y={440} tam={110} color={KC.red} />
      <Chip T={T} at={K.Ta + 1.6} until={K.P - 0.2} texto="Gaceta Oficial CDMX · 2025 · 10 alcaldías" y={1440} x={540} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Te + 0.6} until={K.Pr - 0.2} x={400} y={480} texto="1 m²" tam={30} color={KC.ink} />
      {kvisible(T, K.Te + 0.4, K.Pr - 0.2) && (() => { const e = kentrada(T, K.Te + 0.4, K.Pr - 0.2, 'pop');
        return <div style={{ position:'absolute', left:540, top:1460, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center',
          background:'rgba(14,15,18,.85)', border:`4px solid ${KC.cyan}`, borderRadius:30, padding:'12px 34px' }}>
          <div style={{ font:`700 52px ${KF.mono}`, color:KC.texto, whiteSpace:'nowrap' }}>{kformato(litrosTecho, 0)} L ≈ {Math.floor(litrosTecho / 1100)} tinacos</div>
          <div style={{ font:`900 32px ${KF.texto}`, color:KC.gold2, marginTop:4 }}>tinacos de 1,100 L</div>
        </div>; })()}
      <Chip T={T} at={K.Te + 2.0} until={K.Pr - 0.2} texto="en teoría" y={1600} x={540} tam={34} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.Pr + 0.3} until={K.E - 0.2} valor={73000} dur={2.4} sufijo="+" etiqueta="sistemas en casas:" x={340} y={520} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Pr + 1.6} until={K.E - 0.2} texto="Cosecha de Lluvia · Sedema · desde 2019" y={1440} x={540} tam={30} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2020" quien="Isla Urbana + UNAM" revista="estudio dirigido por E. Tellman" y={720} />
      <Chip T={T} at={K.E + 3.6} until={K.Tr - 0.2} texto="8 alcaldías con más falta de agua" y={810} x={670} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.E + 4.2} until={K.Tr - 0.2} texto="287 comunidades" y={890} x={670} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.E + 4.6} until={K.Tr - 0.2} valor={105000} dur={1.0} etiqueta="sistemas:" x={300} y={1010} tam={80} color={KC.cyan} />
      <NumeroGigante T={T} at={K.E + 5.2} until={K.Tr - 0.2} valor={415000} dur={1.2} etiqueta="personas:" x={780} y={1010} tam={80} color={KC.orange} />
      <Etq T={T} at={K.Tr + 0.6} until={K.U - 0.2} x={375} y={880} texto="separador de" lado="izq" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Tr + 0.6} until={K.U - 0.2} x={375} y={920} texto="primeras lluvias" lado="izq" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Tr + 1.2} until={K.U - 0.2} texto="se tiran ~2 L por m² de techo" y={1440} x={540} tam={32} borde={SUCIA} />
      <Etq T={T} at={K.Tr + 2.4} until={K.U - 0.2} x={765} y={775} texto="filtro de hojas" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Tr + 3.0} until={K.U - 0.2} x={850} y={1040} texto="tinaco" tam={28} color={KC.texto} />
      <Chip T={T} at={K.U + 0.4} until={K.C - 0.2} texto="no es para beber" y={760} x={700} tam={32} borde={KC.red} />
      <Chip T={T} at={K.C + 0.5} until={K.Ou - 0.1} texto="900+ L por m² · ¿coladera o tinaco?" y={1440} x={540} tam={32} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Mi - 0.1} texto="Más de *900 litros por m²* este año." />
      <Subtitulo T={T} idx={1} at={K.Mi + 0.1} until={K.D - 0.1} texto="1 mm = 1 litro por m²: *925 mm.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.Ta - 0.1} texto="A la coladera, *con aguas negras.*" />
      <Subtitulo T={T} idx={3} at={K.Ta + 0.1} until={K.P - 0.1} texto="2025: *284 colonias* con tandeo." />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Te - 0.1} texto="¿Y si la *juntaras?*" />
      <Subtitulo T={T} idx={5} at={K.Te + 0.1} until={K.Pr - 0.1} texto="Un techo de 50 m²: *+40 tinacos.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.E - 0.1} texto="Sedema: *más de 73 mil* sistemas." />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Tr - 0.1} texto="105 mil sistemas: *+400 mil personas.*" />
      <Subtitulo T={T} idx={8} at={K.Tr + 0.1} until={K.U - 0.1} texto="Lo primero *lava el techo* y se tira." />
      <Subtitulo T={T} idx={9} at={K.U + 0.1} until={K.C - 0.1} texto="No para beber: *baño, lavar, trapear.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Cuántos se fueron *por tu coladera?*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Milimetro + 3.7, CUES.Drenaje - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Drenaje + 2.6, CUES.Tandeo - 0.15, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Techo + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Programa + 1.3, CUES.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.Truco - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Truco + 2.2, CUES.Usos - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Usos + 0.2, CUES.Cierre - 0.15, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="28" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LluviaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LluviaShot /></CompositionStage></div>;
}
window.LluviaApp = LluviaApp;
