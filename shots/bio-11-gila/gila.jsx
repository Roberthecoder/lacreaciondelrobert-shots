// Shot Biotecnológico #11 · La saliva del lagarto que abrió el camino al Ozempic — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. Todos los dibujos son esquemáticos y no están a escala entre sí.
// Secuencias reales (primeros 8 aminoácidos): GLP-1 activo H-A-E-G-T-F-T-S… · exendina-4 H-G-E-G-T-F-T-S…

const GNEGRO = '#1d1714', GROSA = '#f48a6a', GROSA2 = '#ffb48f', GLP = '#2fe0a8', EXE = '#ff8a1f', DPP = '#9b5de5', INSU = '#5ec8ff';
const SEMA = '#7ee787';

// capa SVG de pantalla completa
function Capa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- monstruo de Gila (Heloderma suspectum), de lado, mirando a la derecha ----------
   cuerpo robusto, cola gruesa (guarda grasa), patas cortas con garras, piel de escamas en cuentas
   negras con bandas y manchas rosa-naranja, lengua bífida oscura. lengua: 0..1 */
function Gila({ T, x, y, s = 1, lengua = 0, paso = 0 }) {
  const mov = Math.sin(T * 2.2) * 4 * paso;
  const Pata = ({ px, py, f = 1, fase = 0 }) => { const a = Math.sin(T * 4 + fase) * 6 * paso;
    return <g transform={`translate(${px} ${py}) rotate(${a})`}>
      <path d={`M -34 -10 Q -40 40 ${-20 * f} 70 L ${30 * f} 74 Q 30 40 34 -10 Z`} fill={GNEGRO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <ellipse cx={-8 * f + 6} cy={60} rx={14} ry={9} fill={GROSA} opacity={0.9} />
      {[-30, -15, 0, 15, 30].map((dx, i) => <path key={i} d={`M ${dx * f + 5 * f} 72 l ${8 * f} 16`} stroke="#f2e6d0" strokeWidth={5} strokeLinecap="round" />)}
    </g>; };
  const R = krng(11);
  const cuentas = Array.from({ length: 90 }, () => [-200 + R() * 400, -70 + R() * 140, 4 + R() * 4]);
  const ln = kclamp(lengua, 0, 1);
  return <g transform={`translate(${x} ${y + mov}) scale(${s})`}>
    {/* sombra */}
    <ellipse cx={-20} cy={118} rx={420} ry={22} fill="rgba(0,0,0,.18)" />
    {/* patas de atrás (lado lejano) */}
    <Pata px={-150} py={40} f={-1} fase={1.4} />
    <Pata px={170} py={40} f={1} fase={0} />
    {/* cola gruesa */}
    <path d="M -170 -60 Q -330 -70 -470 -10 Q -490 4 -470 14 Q -330 60 -170 70 Z" fill={GNEGRO} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[[-230, 46], [-300, 38], [-370, 28], [-430, 18]].map(([cx, h], i) => <path key={i} d={`M ${cx - 16} ${-h} Q ${cx} 0 ${cx - 16} ${h} L ${cx + 16} ${h - 4} Q ${cx + 30} 0 ${cx + 16} ${-h + 4} Z`} fill={i % 2 ? GROSA2 : GROSA} stroke={KC.ink} strokeWidth={3} />)}
    {/* cuerpo */}
    <ellipse cx={0} cy={0} rx={230} ry={88} fill={GNEGRO} stroke={KC.ink} strokeWidth={9} />
    {[[-150, -10, 40, 70, -8], [-60, -30, 46, 48, 14], [-70, 40, 38, 30, -20], [30, -10, 50, 62, 6], [120, -30, 40, 40, -10], [120, 40, 34, 26, 20], [-150, 50, 24, 22, 0]].map(([cx, cy, rx, ry, r], i) =>
      <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={i % 2 ? GROSA2 : GROSA} transform={`rotate(${r} ${cx} ${cy})`} stroke={KC.ink} strokeWidth={3} />)}
    {cuentas.map(([cx, cy, r], i) => ((cx * cx) / (228 * 228) + (cy * cy) / (86 * 86) < 0.9) && <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth={2} />)}
    {/* patas de adelante (lado cercano) */}
    <Pata px={-120} py={60} f={-1} fase={3} />
    <Pata px={200} py={56} f={1} fase={2} />
    {/* cuello y cabeza */}
    <path d="M 190 -60 Q 260 -80 300 -60 L 300 60 Q 250 76 190 66 Z" fill={GNEGRO} stroke={KC.ink} strokeWidth={8} />
    <path d="M 270 -66 Q 380 -82 430 -30 Q 452 0 428 24 Q 380 58 270 56 Z" fill={GNEGRO} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={330} cy={-30} rx={34} ry={16} fill={GROSA} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={240} cy={-20} rx={22} ry={26} fill={GROSA2} stroke={KC.ink} strokeWidth={3} />
    <path d="M 300 24 Q 370 34 428 16" fill="none" stroke="#0a0806" strokeWidth={5} strokeLinecap="round" />
    <circle cx={372} cy={-22} r={13} fill="#3a2a22" stroke="#f2e6d0" strokeWidth={4} /><circle cx={374} cy={-22} r={5} fill="#000" />
    <circle cx={430} cy={-10} r={4} fill="#000" />
    {/* lengua bífida, oscura */}
    {ln > 0 && <path d={`M 432 12 L ${432 + 70 * ln} 14 L ${452 + 82 * ln} ${2 - 10 * ln} M ${432 + 70 * ln} 14 L ${452 + 82 * ln} ${26 + 10 * ln}`} fill="none" stroke="#3b1f45" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />}
  </g>;
}

/* ---------- pluma de inyección genérica (sin marca) ---------- */
function Pluma({ x, y, s = 1, rot = 0, color = INSU, clic = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-260} y={-34} width={420} height={68} rx={30} fill="#f4f6fa" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-20} width={150} height={40} rx={12} fill={color} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-100 + i * 36} y1={-20} x2={-100 + i * 36} y2={-6} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={160 - clic * 12} y={-28} width={80} height={56} rx={14} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -260 -22 L -320 -14 L -320 14 L -260 22 Z" fill="#c9d1dc" stroke={KC.ink} strokeWidth={6} />
    <line x1={-320} y1={0} x2={-370} y2={0} stroke="#8a93a0" strokeWidth={5} strokeLinecap="round" />
  </g>;
}

/* ---------- perlas = aminoácidos ---------- */
function Perla({ x, y, r = 26, color = GLP, letra, o = 1, borde = KC.ink }) {
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={color} stroke={borde} strokeWidth={Math.max(3, r * 0.18)} />
    <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.25} fill="rgba(255,255,255,.55)" />
    {letra && <text x={x} y={y + r * 0.36} textAnchor="middle" style={{ font:`700 ${r * 1.05}px ${KF.mono}` }} fill={KC.ink}>{letra}</text>}
  </g>;
}
// cadena ondulada de n perlas. colores: función (i) → color. arma: 0..1 cuántas perlas ya están
function Cadena({ T, x, y, n = 30, paso = 30, r = 13, color = () => GLP, arma = 1, onda = 14, fase = 0, quita = 0, nquita = 2 }) {
  const k = Math.round(kclamp(arma, 0, 1) * n);
  return <g>{Array.from({ length: k }, (_, i) => { const cortada = i < nquita && quita > 0;
    const dx = cortada ? -quita * 140 : 0, dy = cortada ? quita * (80 + i * 30) : 0;
    return <Perla key={i} x={x + i * paso + dx} y={y + Math.sin(i * 0.7 + T * 2 + fase) * onda + dy} r={r} color={color(i)} o={cortada ? 1 - quita * 0.6 : 1} />; })}
  </g>;
}

/* ---------- DPP-4 como tijera-enzima ---------- */
function Tijera({ x, y, s = 1, abre = 0.5, rot = 0 }) {
  const a = 6 + kclamp(abre, 0, 1) * 30;
  const Hoja = ({ sg }) => <g transform={`rotate(${sg * a})`}>
    <path d={`M 0 0 L 150 ${-sg * 8} Q 160 0 150 ${sg * 10} Z`} fill="#e6e9ef" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={-60} cy={sg * 22} rx={44} ry={26} fill="none" stroke={DPP} strokeWidth={16} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={-50} cy={0} rx={110} ry={86} fill={DPP} stroke={KC.ink} strokeWidth={7} opacity={0.35} />
    <Hoja sg={-1} /><Hoja sg={1} />
    <circle r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-92} cy={-44} r={10} fill="#fff" /><circle cx={-90} cy={-44} r={5} fill={KC.ink} />
  </g>;
}

/* ---------- célula beta del páncreas con receptores-cerradura ---------- */
function CelulaBeta({ T, x, y, abiertos = [0, 0], insulina = 0 }) {
  const R = krng(4);
  const granos = Array.from({ length: 26 }, () => [(R() - 0.5) * 520, 40 + R() * 200, R()]);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -380 0 Q -380 -40 -300 -40 L 300 -40 Q 380 -40 380 0 L 380 330 L -380 330 Z" fill="#ffd6e0" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={210} rx={120} ry={80} fill="#e88aa6" stroke={KC.ink} strokeWidth={6} />
    {granos.map(([gx, gy, p], i) => { const sale = kclamp(insulina * 1.6 - p, 0, 1);
      return <g key={i} transform={`translate(${gx + Math.sin(T * 2 + i) * 4} ${gy - sale * (gy + 220) })`} opacity={1 - sale * 0.2}>
        <polygon points="0,-14 12,-7 12,7 0,14 -12,7 -12,-7" fill={INSU} stroke={KC.ink} strokeWidth={3} /></g>; })}
    {[-170, 170].map((rx, i) => { const ab = kclamp(abiertos[i], 0, 1);
      return <g key={i} transform={`translate(${rx} -40)`}>
        <path d="M -54 30 L -54 -40 Q -54 -70 -24 -70 L -24 -10 L 24 -10 L 24 -70 Q 54 -70 54 -40 L 54 30 Z" fill={ab > 0.5 ? KC.yellow : '#c9b8ff'} stroke={KC.ink} strokeWidth={6} />
        <circle cx={0} cy={8} r={10} fill={KC.ink} />
        {ab > 0.5 && <circle cx={0} cy={-30} r={60 + Math.sin(T * 8) * 6} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={0.6} />}
      </g>; })}
  </g>;
}

/* ---------- huevo (comida del lagarto) ---------- */
function Huevo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -150 C 90 -150 120 -20 110 40 C 100 110 50 140 0 140 C -50 140 -100 110 -110 40 C -120 -20 -90 -150 0 -150 Z" fill="#fbf4e4" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-36} cy={-70} rx={18} ry={30} fill="rgba(255,255,255,.8)" />
  </g>;
}

/* ---------- matraz donde se arma la cadena sintética ---------- */
function Matraz({ T, x, y, s = 1, p = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -50 -230 L -50 -110 L -190 120 Q -205 160 -160 160 L 160 160 Q 205 160 190 120 L 50 -110 L 50 -230 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -120 20 L 120 20 L 185 128 Q 196 150 160 150 L -160 150 Q -196 150 -185 128 Z" fill="rgba(255,138,31,.45)" />
    <rect x={-66} y={-250} width={132} height={26} rx={8} fill="#c9d1dc" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={-100 + i * 40 + Math.sin(T * 3 + i) * 6} cy={120 - ((T * 60 + i * 37) % 110)} r={7} fill="rgba(255,255,255,.8)" />)}
  </g>;
}

/* ---------- Sonora (esquemático) ---------- */
const SONORA = [[-114.8,32.5],[-111,31.33],[-109.05,31.33],[-108.6,30.4],[-108.8,29],[-108.5,27.8],[-108.9,26.9],[-109.4,26.5],[-109.9,27.1],[-110.6,27.8],[-111.2,28.4],[-112.2,29.3],[-112.9,30.3],[-113.6,31.2],[-114.6,31.7]];
const RANGO_GILA = [[-115.6,36.4],[-113.9,37.3],[-112.6,36.8],[-111.2,35.0],[-109.0,33.6],[-107.9,32.6],[-108.2,31.3],[-108.4,29.6],[-108.3,27.6],[-108.0,26.0],[-108.8,25.6],[-109.6,26.4],[-111.0,28.0],[-112.6,29.6],[-114.2,31.2],[-115.0,33.0],[-115.9,34.8]];
const ptsMx = (L) => L.map(([lo, la]) => mxProy(lo, la).join(',')).join(' ');

function Gila11() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lagarto, H: CUES.Hormona, Ti: CUES.Tijera, P: CUES.Pregunta, E: CUES.Eng, Ce: CUES.Cerradura,
    A: CUES.Aminoacido, X: CUES.Exenatida, F: CUES.Fabrica, O: CUES.Ozempic, Co: CUES.Comida, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const lengua = (t0) => Math.max(0, Math.sin((T - t0) * 5)) * (Math.floor((T - t0) / 1.3) % 2 === 0 ? 1 : 0.2);
  const GLP_SEQ = 'HAEGTFTS', EXE_SEQ = 'HGEGTFTS';
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO: el lagarto en la arena + la pluma */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.05} origen="50% 60%">
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1180, bottom:0, background:'#f2c879' }}></div>
        <Ambiente T={T} n={16} seed={3} color="rgba(255,255,255,.5)" tam={[4, 10]} />
        <Capa>
          {[[120, 1230, 1], [930, 1260, 0.8]].map(([cx, cy, k], i) => <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}>
            <path d="M -14 0 L -14 -150 Q -14 -170 0 -170 Q 14 -170 14 -150 L 14 0 Z M 14 -90 Q 50 -90 50 -120 L 50 -140" fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} /></g>)}
          <Gila T={T} x={560} y={985} s={1.0} lengua={lengua(K.G + 0.1)} paso={0.5} />
          <Pluma x={klerp(-300, 330, kprog(T, K.G + 0.8, K.G + 1.5, kEase.sale))} y={700} s={0.8} rot={-8} clic={kprog(T, K.G + 2.4, K.G + 2.6)} />
        </Capa>
      </Escena>

      {/* 1 · LAGARTO: dónde vive (México: Sonora) */}
      <Escena T={T} a={K.L} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <MapaMexico x={40} y={640} ancho={1000}>
            <polygon points={ptsMx(RANGO_GILA)} fill="rgba(244,138,106,.35)" stroke={GROSA} strokeWidth={6} strokeDasharray="14 10" opacity={kprog(T, K.L + 0.4, K.L + 1.2)} />
            <polygon points={ptsMx(SONORA)} fill={GROSA} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.L + 1.0, K.L + 1.6)} />
            <line x1={mxProy(-117.1, 32.6)[0]} y1={mxProy(-117.1, 32.6)[1]} x2={mxProy(-106.5, 31.8)[0]} y2={mxProy(-106.5, 31.8)[1]} stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
          </MapaMexico>
          <g opacity={kprog(T, K.L + 1.6, K.L + 2.2)}><Gila T={T} x={250} y={1110} s={0.36} lengua={lengua(K.L + 1.6)} /></g>
        </Capa>
        <Etiqueta T={T} at={K.L + 1.2} until={K.H - 0.2} x={250} y={770} texto="Sonora" color={KC.ink} tam={40} />
        <Etiqueta T={T} at={K.L + 0.6} until={K.H - 0.2} x={250} y={560} texto="EE. UU. (suroeste)" color={KC.ink} tam={30} />
        <Chip T={T} at={K.L + 0.3} until={K.H - 0.3} texto="monstruo de Gila · Heloderma suspectum" y={1500} tam={36} borde={GROSA} />
        <Chip T={T} at={K.L + 1.8} until={K.H - 0.3} texto="mide unos 50 cm" x={300} y={1200} tam={30} borde={KC.ink} />
      </Escena>

      {/* 2 · HORMONA: comes → el intestino suelta GLP-1 → el páncreas suelta insulina */}
      <Escena T={T} a={K.H} b={K.Ti} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <g transform="translate(330 -60)">
            <circle cx={0} cy={880} r={70} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
            <path d="M -150 1260 L -130 990 Q -120 950 -60 950 L 60 950 Q 120 950 130 990 L 150 1260 Z" fill="#ff6b5a" stroke={KC.ink} strokeWidth={8} />
            <path d="M -80 1170 q 30 -40 60 0 t 60 0 t 60 0 M -80 1210 q 30 -40 60 0 t 60 0 t 60 0" fill="none" stroke="#ffd6a8" strokeWidth={22} strokeLinecap="round" />
            <path d="M 20 1080 q 50 -20 90 0 q -10 30 -90 20 Z" fill="#e88aa6" stroke={KC.ink} strokeWidth={5} />
            <g transform={`translate(${-150} ${880 + Math.sin(T * 6) * 8}) rotate(-20)`}>
              <path d="M -60 0 A 60 60 0 0 1 60 0 Z" fill="#f2d16b" stroke={KC.ink} strokeWidth={6} /><path d="M -46 -6 q 46 -40 92 0" fill="none" stroke="#3fbf4a" strokeWidth={10} />
            </g>
          </g>
        </Capa>
        <Lupa T={T} at={K.H + 0.8} until={K.Ti - 0.1} x={730} y={600} r={220} fx={310} fy={1110} tinte={GLP}
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill="#11202a" />
            {Array.from({ length: 6 }, (_, i) => <g key={i}>
              <path d={`M ${i * 82 - 10} ${r * 2} L ${i * 82 - 10} ${r * 1.25} Q ${i * 82 + 31} ${r * 1.12} ${i * 82 + 72} ${r * 1.25} L ${i * 82 + 72} ${r * 2} Z`} fill={i === 2 ? '#2a9d76' : '#e88aa6'} stroke={KC.ink} strokeWidth={4} />
              <circle cx={i * 82 + 31} cy={r * 1.6} r={14} fill="#7a3550" /></g>)}
            {Array.from({ length: 10 }, (_, i) => { const u = ((t - K.H) * 0.6 + i * 0.1) % 1;
              return <circle key={i} cx={2 * 82 + 31 + u * 160 + Math.sin(i * 3) * 30} cy={r * 1.2 - u * r * 0.95} r={13} fill={GLP} stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.4} />; })}
            <text x={r} y={58} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={GLP}>célula L → GLP-1</text>
          </svg>} etiqueta="POR DENTRO · TU INTESTINO" />
        <Chip T={T} at={K.H + 2.6} until={K.Ti - 0.3} texto="GLP-1 → «páncreas: suelta insulina»" y={1500} tam={38} borde={GLP} />
      </Escena>

      {/* 3 · TIJERA: la DPP-4 corta el GLP-1 en ~2 min */}
      <Escena T={T} a={K.Ti} b={K.P} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} seed={7} color="rgba(47,224,168,.25)" tam={[3, 8]} />
        <Capa>
          {[0, 1, 2, 3, 4, 5].map((j) => { const t0 = K.Ti + 0.6 + j * 0.45, cut = j % 2 === 0 ? kprog(T, t0 + 0.4, t0 + 1.2, kEase.sale) : 0;
            return <g key={j}>
              <Cadena T={T} x={300} y={560 + j * 120} n={18} paso={34} r={14} color={(i) => (i < 2 ? KC.yellow : GLP)} quita={cut} fase={j} />
              {j % 2 === 0 && T > t0 - 0.4 && T < t0 + 1.4 && <Tijera x={klerp(130, 300, kprog(T, t0 - 0.4, t0 + 0.3))} y={560 + j * 120} s={0.55} rot={0} abre={Math.abs(Math.sin((T - t0) * 9))} />}
            </g>; })}
        </Capa>
        <Cronometro T={T} at={K.Ti + 0.4} until={K.P - 0.2} factor={120 / 3.2} y={1520} etiqueta="VIDA MEDIA DEL GLP-1 ≈ 2 MIN" />
        <Etiqueta T={T} at={K.Ti + 0.8} until={K.P - 0.2} x={120} y={470} texto="DPP-4 (la enzima)" color={DPP} tam={34} />
      </Escena>

      {/* 4 · PREGUNTA */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <Capa>
          <text x={300} y={1080} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 880)`}>?</text>
          <Tijera x={330} y={1180} s={0.9} abre={Math.abs(Math.sin(T * 7))} rot={-12} />
          <Cadena T={T} x={60} y={1230} n={12} paso={40} r={16} color={(i) => (i < 2 ? KC.yellow : EXE)} />
        </Capa>
      </Escena>

      {/* 5 · ENG 1992: la exendina-4 en la saliva del lagarto (39 aminoácidos) */}
      <Escena T={T} a={K.E} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <Capa>
          <Gila T={T} x={360} y={1020} s={0.62} lengua={lengua(K.E)} />
          <g transform={`translate(800 ${900})`}>
            <rect x={-46} y={-200} width={92} height={300} rx={40} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={8} />
            <rect x={-38} y={-10} width={76} height={100} rx={34} fill="rgba(240,230,190,.9)" />
            <rect x={-56} y={-220} width={112} height={34} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
          </g>
          {Array.from({ length: 39 }, (_, i) => { const on = kprog(T, K.E + 2.6 + i * 0.065, K.E + 2.9 + i * 0.065, kEase.sale);
            const fila = Math.floor(i / 13), col = i % 13;
            return on > 0 && <Perla key={i} x={110 + (fila % 2 ? 12 - col : col) * 44} y={klerp(1180, 560 + fila * 54, on)} r={19} color={i === 1 ? KC.yellow : EXE} o={on} />; })}
        </Capa>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="1992" quien="John Eng · hospital de veteranos" revista="Bronx, Nueva York · J Biol Chem" y={560} />
        <Chip T={T} at={K.E + 3.0} until={K.Ce - 0.3} texto="exendina-4 · 39 aminoácidos" y={1500} tam={42} borde={EXE} />
      </Escena>

      {/* 6 · CERRADURA: la exendina-4 abre el mismo receptor que tu GLP-1 */}
      <Escena T={T} a={K.Ce} b={K.A} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          <CelulaBeta T={T} x={540} y={900} abiertos={[kprog(T, K.Ce + 1.0, K.Ce + 1.3), kprog(T, K.Ce + 1.8, K.Ce + 2.1)]} insulina={kprog(T, K.Ce + 2.0, K.A, kEase.suave)} />
          {[[370, GLP, K.Ce + 0.2, K.Ce + 1.1], [710, EXE, K.Ce + 0.9, K.Ce + 1.9]].map(([kx, c, t0, t1], i) => { const p = kprog(T, t0, t1, kEase.sale);
            return <g key={i} transform={`translate(${kx} ${klerp(380, 760, p)}) rotate(90)`}><Cadena T={T} x={-100} y={0} n={6} paso={26} r={13} color={(j) => (j < 2 ? KC.yellow : c)} onda={3} /></g>; })}
        </Capa>
        <Etiqueta T={T} at={K.Ce + 0.4} until={K.A - 0.2} x={320} y={430} texto="tu GLP-1" color={GLP} tam={34} lado="izq" />
        <Etiqueta T={T} at={K.Ce + 1.0} until={K.A - 0.2} x={760} y={430} texto="exendina-4" color={EXE} tam={34} />
        <Chip T={T} at={K.Ce + 1.8} until={K.A - 0.3} texto="misma cerradura: el receptor del GLP-1" y={1500} tam={34} borde={KC.yellow} />
        <Etiqueta T={T} at={K.Ce + 2.2} until={K.A - 0.2} x={180} y={1180} texto="insulina" color={INSU} tam={32} />
      </Escena>

      {/* 7 · AMINOÁCIDO: A → G en la posición 2, la tijera casi no puede */}
      <Escena T={T} a={K.A} b={K.X} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Capa>
          {[[GLP_SEQ, GLP, 840, 'GLP-1'], [EXE_SEQ, EXE, 1110, 'exendina-4']].map(([seq, c, yy, nom], j) => {
            const cut = j === 0 ? kprog(T, K.A + 1.6, K.A + 2.2, kEase.sale) : 0;
            return <g key={j}>
              <text x={90} y={yy - 70} style={{ font:`900 40px ${KF.texto}` }} fill={c}>{nom}</text>
              {seq.split('').map((l, i) => <Perla key={i} x={150 + i * 112 - (i < 2 ? cut * 60 : 0)} y={yy + (i < 2 ? cut * 60 : 0) + Math.sin(T * 2 + i) * 5} r={44} letra={l}
                color={i === 1 ? KC.yellow : c} o={i < 2 ? 1 - cut * 0.5 : 1} />)}
            </g>; })}
          {(() => { const t0 = K.A + 0.9; const enA = T < K.A + 2.4; const xx = enA ? klerp(-80, 262, kprog(T, t0, t0 + 0.7)) : 262 + Math.sin((T - K.A) * 14) * 16;
            return <Tijera x={xx} y={enA ? 840 : 1110} s={0.7} abre={enA ? Math.abs(Math.sin((T - t0) * 8)) : 0.8} rot={enA ? 0 : 18} />; })()}
          {T > K.A + 2.6 && [0, 1, 2].map((i) => <path key={i} d={`M ${300 + i * 22} ${1050 - i * 8} l 18 -26`} stroke={KC.yellow} strokeWidth={6} strokeLinecap="round" opacity={Math.abs(Math.sin(T * 10 + i))} />)}
        </Capa>
        <Etiqueta T={T} at={K.A + 0.5} until={K.X - 0.2} x={262} y={690} texto="posición 2: A → G" color={KC.yellow} tam={34} />
        <Chip T={T} at={K.A + 2.8} until={K.X - 0.3} texto="la DPP-4 casi no la puede cortar" y={1500} tam={38} borde={EXE} />
      </Escena>

      {/* 8 · EXENATIDA: FDA 2005, vida media 2.4 h contra ~2 min */}
      <Escena T={T} a={K.X} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <TarjetaEstudio T={T} at={K.X + 0.1} until={K.F - 0.2} anio="2005" quien="FDA · Byetta (exenatida)" revista="el primero de la familia" y={520} />
        <Comparativa T={T} at={K.X + 1.4} until={K.F - 0.2} max={144} y={780} alto={330}
          izq={{ valor: 2, texto: '≈ 2 min', etiqueta: 'GLP-1', color: GLP }} der={{ valor: 144, texto: '2.4 h', etiqueta: 'exenatida', color: KC.yellow }} />
        <Chip T={T} at={K.X + 2.0} until={K.F - 0.3} texto="vida media en sangre" y={1500} tam={38} borde={KC.yellow} />
      </Escena>

      {/* 9 · FÁBRICA: no se ordeñan lagartos, es sintética */}
      <Escena T={T} a={K.F} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Capa>
          <Gila T={T} x={300} y={760} s={0.42} lengua={lengua(K.F)} />
          <g transform="translate(300 940)"><path d="M -70 -40 L 70 -40 L 54 70 L -54 70 Z" fill="#c9d1dc" stroke={KC.ink} strokeWidth={7} /><path d="M -70 -40 Q 0 -110 70 -40" fill="none" stroke={KC.ink} strokeWidth={6} /></g>
          <g opacity={kprog(T, K.F + 0.6, K.F + 0.9)} transform={`translate(300 950) scale(0.55) scale(${klerp(1.6, 1, kprog(T, K.F + 0.6, K.F + 0.9, kEase.rebote))})`}>
            <path d="M -170 -170 L 170 170 M 170 -170 L -170 170" stroke={KC.red} strokeWidth={34} strokeLinecap="round" /></g>
          <Matraz T={T} x={780} y={950} s={0.95} />
          {Array.from({ length: 39 }, (_, i) => { const on = kprog(T, K.F + 1.0 + i * 0.05, K.F + 1.2 + i * 0.05);
            const ang = i * 0.5, rr = 40 + i * 2.2;
            return on > 0 && <Perla key={i} x={780 + Math.cos(ang + T * 0.6) * rr * 0.9} y={1030 + Math.sin(ang + T * 0.6) * rr * 0.35 - i * 1.5} r={11} color={EXE} o={on} />; })}
        </Capa>
        <Chip T={T} at={K.F + 1.2} until={K.O - 0.3} texto="exenatida: péptido sintético" y={1500} tam={40} borde={EXE} />
      </Escena>

      {/* 10 · OZEMPIC: no sale del lagarto, es un GLP-1 humano retocado */}
      <Escena T={T} a={K.O} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <Capa>
          <g transform="translate(0 0)">
            <text x={90} y={790} style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>semaglutida (GLP-1 humano retocado)</text>
            <Cadena T={T} x={110} y={900} n={31} paso={28} r={13} onda={18} color={(i) => (i === 1 || i === 27 ? KC.pink : SEMA)} arma={kprog(T, K.O + 1.0, K.O + 2.0)} />
            <g opacity={kprog(T, K.O + 2.0, K.O + 2.5)}>
              <path d={`M ${110 + 19 * 28} ${900 + Math.sin(19 * 0.7 + T * 2) * 18} q 20 60 -10 110 q -30 50 10 100`} fill="none" stroke="#f2c14e" strokeWidth={14} strokeLinecap="round" />
              <text x={110 + 19 * 28 + 40} y={1090} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>colita de grasa</text>
            </g>
          </g>
        </Capa>
        <MitoTachado T={T} at={K.O + 0.1} tacharEn={K.O + 1.0} until={K.O + 2.6} texto="Ozempic = saliva de lagarto" x={370} y={560} tam={40} />
        <Chip T={T} at={K.O + 2.7} until={K.Co - 0.3} texto="94 % igual al GLP-1 humano · 2017" x={380} y={560} tam={32} borde={SEMA} />
        <Etiqueta T={T} at={K.O + 2.2} until={K.Co - 0.2} x={140} y={1010} texto="2 cambios" color={KC.pink} tam={30} />
      </Escena>

      {/* 11 · COMIDA: hasta un tercio de su peso */}
      <Escena T={T} a={K.Co} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1180, bottom:0, background:'#f2c879' }}></div>
        <Capa>
          <Gila T={T} x={380} y={1070} s={0.62} lengua={lengua(K.Co)} />
          <Huevo x={klerp(1300, 860, kprog(T, K.Co + 0.3, K.Co + 1.0, kEase.rebote))} y={1030} s={1.0} />
        </Capa>
        <Medidor T={T} at={K.Co + 1.2} until={K.Ci - 0.2} etiqueta="UNA COMIDA" valor={(t) => kprog(t, K.Co + 1.4, K.Co + 2.6) / 3} texto={() => 'hasta ⅓ de su peso'} y={1480} color={GROSA} />
        <Chip T={T} at={K.Co + 0.4} until={K.Ci - 0.3} texto="come pocas veces" x={330} y={720} tam={38} borde={GROSA} />
      </Escena>

      {/* 12 · CIERRE: el mismo lagarto del inicio, ahora con la etiqueta */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="50% 60%">
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', left:0, right:0, top:1180, bottom:0, background:'#f2c879' }}></div>
        <Capa>
          {[[120, 1230, 1], [930, 1260, 0.8]].map(([cx, cy, k], i) => <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}>
            <path d="M -14 0 L -14 -150 Q -14 -170 0 -170 Q 14 -170 14 -150 L 14 0 Z M 14 -90 Q 50 -90 50 -120 L 50 -140" fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} /></g>)}
          <Gila T={T} x={560} y={985} s={1.0} lengua={lengua(K.Ci + 0.2)} paso={0.5} />
          <Pluma x={330} y={700} s={0.8} rot={-8} color={EXE} />
        </Capa>
        <Chip T={T} at={K.Ci + 0.8} until={K.Ou} texto="el primero de la familia: exenatida" y={1500} tam={38} borde={EXE} />
      </Escena>

      {/* textos del gancho */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 3.2} texto="¿solo venenoso?" x={330} y={520} tam={46} />
      <Chip T={T} at={K.G + 3.3} until={K.L - 0.3} texto="1ª medicina tipo Ozempic" x={330} y={520} tam={36} borde={EXE} />
      <Etiqueta T={T} at={K.G + 1.6} until={K.L - 0.3} x={300} y={1500} texto="Heloderma suspectum" it color={KC.ink} tam={36} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="No es solo venenoso: *su saliva* trajo una medicina." />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.H - 0.1} texto="Vive también en *Sonora.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Ti - 0.1} texto="Comes → tu intestino suelta *GLP-1.*" />
      <Subtitulo T={T} idx={3} at={K.Ti + 0.1} until={K.P - 0.1} texto="En ~2 minutos, *la mitad cortada.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y una que *no se corte?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Ce - 0.1} texto="1992: *exendina-4.*" />
      <Subtitulo T={T} idx={6} at={K.Ce + 0.1} until={K.A - 0.1} texto="Abre *la misma cerradura.*" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.X - 0.1} texto="Un aminoácido distinto: *casi no la corta.*" />
      <Subtitulo T={T} idx={8} at={K.X + 0.1} until={K.F - 0.1} texto="Exenatida: *horas, no minutos.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.O - 0.1} texto="Sin lagartos: *de laboratorio.*" />
      <Subtitulo T={T} idx={10} at={K.O + 0.1} until={K.Co - 0.1} texto="Ozempic: *GLP-1 humano* retocado." />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.Ci - 0.1} texto="Come poco… pero *un tercio de su peso.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El primero salió *de un lagarto.*" />

      <Robert T={T} apariciones={ROBERT11(CUES)} />
      <MarcaAgua T={T} tema="bioquimica" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// apariciones de Robert [entra, sale, pose, lado] (tiempos de autor, atados a las escenas)
const ROBERT11 = (C) => [
  [C.Gancho - 0.45, C.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
  [C.Lagarto + 0.5, C.Hormona - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
  [C.Hormona + 1.4, C.Tijera - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
  [C.Pregunta + 0.05, C.Eng - 0.1, 'avatar_06_pensativo_menton', 'grande'],
  [C.Eng + 2.7, C.Cerradura - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
  [C.Aminoacido + 1.0, C.Exenatida - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
  [C.Exenatida + 0.6, C.Fabrica - 0.3, 'avatar_11_sorprendido', 'bajo-der'],
  [C.Ozempic + 0.3, C.Comida - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
  [C.Comida + 0.4, C.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
  [C.Cierre + 0.4, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho'],
];

function GilaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gila11 /></CompositionStage></div>;
}
window.GilaApp = GilaApp;
