// Shot Fungi Mati #103 · Esta seta no nació de una semilla: así se crea una cepa — NARRADO (gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Textos en pantalla: todos en el bloque TX de abajo (fácil de corregir tras la verificación).

const CP = { rosa:'#f59ab0', rosa2:'#d9668a', carne:'#fde3ea', piel:'#f2c29b', piel2:'#d99a6c', agar:'#f1d27a', micelio:'#fffaf0',
  azul:'#4ea8ff', oro:'#ffc23a', moho:'#3fae6a', metal:'#c9ccd2', papel:'#15161b', tupper:'#d8eef7' };

const TX = {
  etqSeta: 'seta rosa', etqSetaCi: 'Pleurotus djamor',
  semilla: 'semilla', pedacito: 'una cepa · hecha a mano',
  adentro: 'adentro: limpio', afuera: 'afuera: polvo y microbios', mm: 'pedacito de 2–5 mm',
  flama: 'se flamean las pinzas', flujo: 'campana de flujo · aire filtrado', sinAire: 'o una caja sin corrientes de aire', pda: 'agar de papa y dextrosa',
  dia: 'DÍA', punta: 'crecen solo por la punta', lupaHifas: 'HIFAS · AL MICROSCOPIO',
  tirar: 'contaminada: se tira', clon: 'clon = misma genética', sella: 'las cajas se sellan con película',
  nuevo: 'micelio nuevo', nueva: '¿una seta nueva?',
  impresion: 'impresión de esporas', horas: 'unas horas', lupaEsporas: 'ESPORAS',
  mono: 'monocarión · un tipo de núcleo', sinGrapas: 'sin grapas', esquema: 'esquema · no a escala',
  di: 'dicarión · 2 núcleos', fibula: 'fíbula (conexión en grapa)', reparte: 'reparte los dos núcleos', daSetas: '→ da setas',
  oaxaca: 'Huajuapan de León, Oaxaca', varDj: 'var. djamor', varRo: 'var. roseus', padres: 'silvestres · 2010',
  hibridas: 'cepas híbridas', masRapido: 'una creció más rápido que sus dos padres', sinEsporas: 'separaron los dos núcleos del micelio, sin esporas',
  codigo: 'PDJ-R-01', resembrar: 'resembrar', tropical: 'la rosa es tropical: no va al refri', agua: 'agua estéril', congelada: 'congelada',
  liofilizar: 'liofilizar: no sirve para la mayoría de estos hongos',
  casero: 'mi laboratorio casero', tupperEtq: 'tupper con agar',
  copia: 'copia ← tejido', cruza: 'cruza ← esporas', noSemilla: 'no nació de una semilla', cepaEtq: 'cepa · PDJ-R-01',
};

/* ---------- piezas propias ---------- */
// Mano que sostiene algo desde abajo (palma + pulgar), centro de la palma en (x, y).
function Mano({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 260 L -120 40 Q -110 -10 -60 -20 L 80 -24 Q 130 -20 140 20 L 150 260 Z" fill={CP.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-70, -20, 30, 80].map((dx, i) => <path key={i} d={`M ${dx - 26} -14 Q ${dx - 30} -78 ${dx} -84 Q ${dx + 30} -78 ${dx + 24} -14`} fill={CP.piel} stroke={KC.ink} strokeWidth={7} />)}
    <path d="M -110 60 Q -190 20 -200 -40 Q -196 -76 -160 -60 Q -120 -20 -70 10" fill={CP.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 120 Q 10 140 90 112" stroke={CP.piel2} strokeWidth={6} fill="none" />
  </g>;
}
// Semilla de caricatura.
function Semilla({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -70 Q 52 -40 44 20 Q 30 70 0 72 Q -30 70 -44 20 Q -52 -40 0 -70 Z" fill="#b07a3c" stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -50 Q 14 0 0 52" stroke="#7a4f22" strokeWidth={6} fill="none" />
  </g>;
}
const Tache = ({ x, y, p = 1, r = 80 }) => p > 0 ? <path d={`M ${x - r} ${y - r} L ${x + r} ${y + r} M ${x + r} ${y - r} L ${x - r} ${y + r}`} stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={p} transform={`translate(${x} ${y}) scale(${klerp(1.5, 1, p)}) translate(${-x} ${-y})`} /> : null;
// Cuadrito de tejido.
const Cubito = ({ x, y, s = 1, c = CP.carne }) => <rect x={x - 14 * s} y={y - 14 * s} width={28 * s} height={28 * s} rx={5 * s} fill={c} stroke={KC.ink} strokeWidth={4} />;
// Pinzas de punta fina: punta en (x, y), abiertas a = 0..1.
function Pinzas({ x, y, ang = -55, a = 0, s = 1 }) {
  const ab = 6 + a * 18;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d={`M 0 ${-2} L 420 ${-ab - 16} L 420 ${-ab + 2} Z`} fill={CP.metal} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 0 2 L 420 ${ab + 16} L 420 ${ab - 2} Z`} fill={CP.metal} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={380} y={-ab - 18} width={60} height={ab * 2 + 36} rx={10} fill="#8d939c" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Bisturí: punta en (x, y).
function Bisturi({ x, y, ang = -40, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 0 0 Q 40 -34 110 -26 L 110 4 Z" fill="#e7eaee" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={106} y={-18} width={320} height={26} rx={10} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Seta ostra (Pleurotus djamor) partida a lo largo, vista de lado: sombrero en abanico/concha, láminas por debajo que bajan
// por un pie corto y lateral. abre 0..1: la mitad de atrás se separa y la de adelante muestra la cara del corte (carne maciza).
// hueco 0..1: falta el cuadrito que se llevaron las pinzas (centro de la carne, en (40, -70) del dibujo).
const SP_CONT = 'M -262 172 Q -236 90 -176 18 Q -130 -140 50 -160 Q 236 -152 302 8 Q 150 -14 -58 12 Q -98 60 -196 184 Z';
const spU = (x) => 10 - 26 * Math.sin(Math.PI * kclamp((x + 60) / 362, 0, 1));
function SPLaminas({ color }) {
  return <g>{Array.from({ length: 11 }, (_, i) => { const x0 = -60 + i * 33, yu = spU(x0), yu2 = spU(x0 + 33), d = 62 * (1 - i / 13) + 8;
    return <path key={i} d={`M ${x0} ${yu} L ${x0 + 16} ${yu + d} L ${x0 + 33} ${yu2} Z`} fill={color} stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />; })}
    {/* láminas decurrentes: bajan por el pie */}
    {[0, 1, 2].map((k) => { const ax = -70 - k * 34, ay = 26 + k * 40; return <path key={'d' + k} d={`M ${ax} ${ay} L ${ax + 22} ${ay + 18} L ${ax - 8} ${ay + 34} Z`} fill={color} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
function SetaPartida({ x, y, s = 1, abre = 0, hueco = 0 }) {
  const exterior = (o) => <g opacity={o}><path d={SP_CONT} fill={CP.rosa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /><SPLaminas color={CP.rosa2} />
    <path d="M -110 -112 Q 40 -150 200 -110" stroke="#fff" strokeWidth={12} fill="none" opacity=".4" strokeLinecap="round" /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* mitad de atrás: se separa hacia arriba a la derecha */}
    <g transform={`translate(${abre * 70} ${-abre * 90}) rotate(${abre * 8})`}>{exterior(1)}</g>
    {/* mitad de adelante: primero se ve por fuera, luego la cara del corte */}
    {exterior(1 - abre)}
    <g opacity={abre}>
      <SPLaminas color="#f7b9c8" />
      <path d={SP_CONT} fill={CP.carne} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {/* piel rosa del sombrero (solo una capa delgada arriba) */}
      <path d="M -176 18 Q -130 -140 50 -160 Q 236 -152 302 8" stroke={CP.rosa} strokeWidth={14} fill="none" strokeLinecap="round" />
      {/* fibras de la carne, a lo largo */}
      {[[-200, 150, -120, 20], [-150, 140, -80, 0], [-120, -60, 120, -110], [-100, -20, 200, -60], [-40, 0, 240, -20]].map(([a, b, c, d], k) => <path key={k} d={`M ${a} ${b} Q ${(a + c) / 2} ${Math.min(b, d) - 20} ${c} ${d}`} stroke="#f2c6d2" strokeWidth={4} fill="none" />)}
      {hueco > 0 && <rect x={26} y={-84} width={28} height={28} rx={4} fill="#e9b3c3" stroke={KC.ink} strokeWidth={3} opacity={hueco} />}
    </g>
  </g>;
}
// Colonia de micelio con borde algodonoso. r en px.
function ColoniaHifas({ cx = 0, cy = 0, r, seed = 1, color = CP.micelio }) {
  if (r <= 2) return null;
  const g = krng(seed), n = 60;
  return <g>
    <Colonia cx={cx} cy={cy} r={r} color={color} seed={seed} />
    {Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + g() * 0.1, r0 = r * 0.82, r1 = r * (1.02 + g() * 0.08);
      return <line key={i} x1={cx + Math.cos(a) * r0} y1={cy + Math.sin(a) * r0} x2={cx + Math.cos(a) * r1} y2={cy + Math.sin(a) * r1} stroke={color} strokeWidth={3} opacity=".9" />; })}
    <circle cx={cx} cy={cy} r={r * 0.25} fill="#f3ead4" opacity=".8" />
  </g>;
}
// Hifa en tubo (horizontal, de izquierda a derecha), de x0 a x0 + largo·p; septos cada 'paso'; núcleos (colores) por compartimento.
function Hifa({ x0, y, largo, p = 1, ancho = 46, paso = 210, nucleos = [CP.azul], fibulas = false, T = 0, brillaPunta = true, color = '#eaf6ff' }) {
  const L = largo * kclamp(p, 0, 1); if (L < 4) return null;
  const n = Math.floor(L / paso);
  return <g>
    <rect x={x0} y={y - ancho / 2} width={L} height={ancho} rx={ancho / 2} fill={color} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => { const sx = x0 + (i + 1) * paso; return <g key={i}>
      <line x1={sx} y1={y - ancho / 2 + 4} x2={sx} y2={y + ancho / 2 - 4} stroke={KC.ink} strokeWidth={5} />
      {fibulas && <path d={`M ${sx - 34} ${y - ancho / 2 + 2} Q ${sx - 30} ${y - ancho / 2 - 38} ${sx} ${y - ancho / 2 - 36} Q ${sx + 22} ${y - ancho / 2 - 34} ${sx + 20} ${y - ancho / 2 + 2}`} fill={color} stroke={KC.ink} strokeWidth={5} />}
    </g>; })}
    {Array.from({ length: n + 1 }, (_, i) => { const c0 = x0 + i * paso, c1 = Math.min(x0 + (i + 1) * paso, x0 + L), cx = (c0 + c1) / 2; if (c1 - c0 < 60) return null;
      return nucleos.map((col, k) => <circle key={i + '-' + k} cx={cx + (k - (nucleos.length - 1) / 2) * 44} cy={y} r={13} fill={col} stroke={KC.ink} strokeWidth={3} />); })}
    {brillaPunta && p < 1 && <circle cx={x0 + L - ancho * 0.3} cy={y} r={ancho * 0.42} fill="#fff" opacity={0.55 + 0.35 * Math.sin(T * 9)} style={{ filter:'drop-shadow(0 0 12px #fff)' }} />}
  </g>;
}
// Espora oblongo-cilíndrica (unas 2.2 veces más larga que ancha), lisa.
const Espora = ({ x, y, s = 1, rot = 0, color = '#f7e9ec' }) => <ellipse cx={x} cy={y} rx={26 * s} ry={12 * s} fill={color} stroke={KC.ink} strokeWidth={4} transform={`rotate(${rot} ${x} ${y})`} />;
// Interior de la Lupa: hifas que crecen por la punta (fondo oscuro).
function LupaHifas(T, r, at) {
  const p = kclamp((T - at) / 3.5, 0, 1);
  const ramas = [[0.05, 0.5, 0.95, 0.42, 0], [0.05, 0.7, 0.9, 0.82, 0.15], [0.35, 0.47, 0.75, 0.22, 0.35], [0.5, 0.78, 0.92, 0.62, 0.5], [0.1, 0.3, 0.6, 0.12, 0.25]];
  const D = r * 2;
  return <svg width={D} height={D}>{ramas.map(([ax, ay, bx, by, t0], i) => { const u = kclamp((p - t0) / (1 - t0), 0, 1); if (u <= 0) return null;
    const ex = klerp(ax, bx, u) * D, ey = klerp(ay, by, u) * D;
    return <g key={i}><line x1={ax * D} y1={ay * D} x2={ex} y2={ey} stroke="#eafff7" strokeWidth={16} strokeLinecap="round" />
      {[0.3, 0.6].map((q) => q < u ? <line key={q} x1={klerp(ax, bx, q) * D - 8} y1={klerp(ay, by, q) * D - 8} x2={klerp(ax, bx, q) * D + 8} y2={klerp(ay, by, q) * D + 8} stroke="#0d1424" strokeWidth={4} /> : null)}
      {u < 1 && <circle cx={ex} cy={ey} r={12} fill="#fff" style={{ filter:'drop-shadow(0 0 10px #fff)' }} opacity={0.6 + 0.4 * Math.sin(T * 10 + i)} />}</g>; })}</svg>;
}
// Interior de la Lupa: esporas oblongas.
function LupaEsporas(T, r) {
  const D = r * 2, g = krng(9);
  return <svg width={D} height={D}>{Array.from({ length: 9 }, (_, i) => { const x = (0.2 + g() * 0.6) * D, y = (0.2 + g() * 0.6) * D;
    return <Espora key={i} x={x + Math.sin(T + i) * 4} y={y} s={1.3} rot={g() * 180} />; })}</svg>;
}
// Tazón (para la impresión de esporas), boca abajo; centro de la base en (x, y).
const Tazon = ({ x, y, s = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M -260 0 Q -250 -230 0 -240 Q 250 -230 260 0 Z" fill="rgba(200,230,255,.55)" stroke={KC.ink} strokeWidth={8} />
  <path d="M -180 -60 Q -170 -170 -40 -190" stroke="#fff" strokeWidth={14} fill="none" opacity=".6" strokeLinecap="round" />
</g>;
// Sombrero de seta ostra visto desde arriba (abanico). centro del punto de unión en (x, y).
const SombreroArriba = ({ x, y, s = 1, color = CP.rosa }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <path d="M 0 0 Q -230 -40 -250 -190 Q -150 -330 0 -330 Q 150 -330 250 -190 Q 230 -40 0 0 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  <path d="M -120 -250 Q 0 -300 120 -250" stroke="#fff" strokeWidth={10} fill="none" opacity=".4" strokeLinecap="round" />
</g>;
// Impresión de esporas (abanico de rayitas radiales) en (x, y). p = 0..1.
function Impresion({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <path d="M 0 0 Q -230 -40 -250 -190 Q -150 -330 0 -330 Q 150 -330 250 -190 Q 230 -40 0 0 Z" fill="rgba(245,225,215,.18)" />
    {Array.from({ length: 46 }, (_, i) => { const a = (-160 + (i / 45) * 140) * Math.PI / 180; return <line key={i} x1={Math.cos(a) * 40} y1={Math.sin(a) * 40} x2={Math.cos(a) * 300} y2={Math.sin(a) * 300 * 1.02} stroke="#f3dcd3" strokeWidth={5} opacity=".85" />; })}
  </g>;
}
// Tubo con agua estéril y vial congelado (íconos).
const TuboAgua = ({ x, y, s = 1, on = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`} opacity={on}>
  <path d="M -40 -260 L 40 -260 L 40 -40 Q 40 0 0 0 Q -40 0 -40 -40 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
  <path d="M -36 -150 L 36 -150 L 36 -40 Q 36 -4 0 -4 Q -36 -4 -36 -40 Z" fill="#7cc8ff" opacity=".8" />
  <rect x={-50} y={-300} width={100} height={46} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
  <rect x={-10} y={-80} width={20} height={20} fill={CP.micelio} stroke={KC.ink} strokeWidth={3} />
</g>;
const VialFrio = ({ x, y, s = 1, on = 1, T = 0 }) => <g transform={`translate(${x} ${y}) scale(${s})`} opacity={on}>
  <rect x={-44} y={-230} width={88} height={230} rx={22} fill="#dff3ff" stroke={KC.ink} strokeWidth={7} />
  <rect x={-52} y={-280} width={104} height={56} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
  {[[-20, -180], [18, -120], [-14, -60], [22, -200]].map(([a, b], i) => <path key={i} d={`M ${a - 10} ${b} L ${a + 10} ${b} M ${a} ${b - 10} L ${a} ${b + 10}`} stroke="#fff" strokeWidth={4} />)}
  <path d={`M -60 -300 Q -40 ${-330 - 10 * Math.sin(T * 2)} -10 -310`} stroke="#fff" strokeWidth={6} fill="none" opacity=".7" />
</g>;
// Tupper con agar y micelio (vista de 3/4).
const Tupper = ({ x, y, s = 1, col = 1 }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
  <rect x={-200} y={-120} width={400} height={170} rx={34} fill={CP.tupper} stroke={KC.ink} strokeWidth={8} />
  <rect x={-180} y={-60} width={360} height={90} rx={22} fill={CP.agar} opacity=".9" />
  <ellipse cx={-20} cy={-20} rx={120 * col} ry={34 * col} fill={CP.micelio} stroke="rgba(0,0,0,.2)" strokeWidth={3} />
  <rect x={-214} y={-150} width={428} height={44} rx={20} fill="#7fd3ff" stroke={KC.ink} strokeWidth={7} />
</g>;
// Etiqueta colgante con código.
const Tag = ({ x, y, texto, s = 1, rot = 8 }) => <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
  <line x1={0} y1={-60} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
  <rect x={-130} y={0} width={260} height={74} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
  <circle cx={-104} cy={37} r={9} fill="none" stroke={KC.ink} strokeWidth={4} />
  <text x={14} y={50} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
</g>;

// 56 cajitas del estudio (8 × 7).
const H56 = Array.from({ length: 56 }, (_, i) => [130 + (i % 8) * 117, 935 + Math.floor(i / 8) * 37]);

function CepaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Corte, A: CUES.Agar, H: CUES.Hifas, Pa: CUES.Pasar, P: CUES.Pregunta, E: CUES.Esporas, M: CUES.Monocarion, D: CUES.Dicarion, Es: CUES.Estudio, Gu: CUES.Guardar, R: CUES.Robert, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const racimo = (abre = 1) => <><Mano x={430} y={1010} s={0.85} /><RacimoOstra T={T} x={440} y={950} s={1.55} abre={abre} n={7} seed={4} /></>;
  // hifas monocarióticas (escena Monocarion) — se reutilizan en Dicarion
  const pMonoA = kprog(T, K.M + 0.5, K.M + 3.2), pMonoB = kprog(T, K.M + 0.9, K.M + 3.6);
  // dicarión
  const fus = kprog(T, K.D + 0.2, K.D + 1.0, kEase.sale);
  const pDi = kprog(T, K.D + 1.0, K.D + 3.6);
  // colonias
  const rH = klerp(16, 200, kprog(T, K.H + 0.2, K.H + 3.8, kEase.suave));
  const tapaA = kprog(T, K.A + 1.2, K.A + 1.8) * (1 - kprog(T, K.A + 2.8, K.A + 3.4));
  const caeCubo = kprog(T, K.A + 1.6, K.A + 2.6, kEase.suave), flamea = kprog(T, K.A + 0.2, K.A + 0.5) * (1 - kprog(T, K.A + 1.3, K.A + 1.6));
  const dia = 1 + Math.floor(6 * kprog(T, K.H + 0.2, K.H + 3.8));
  const corta = kprog(T, K.Pa + 1.2, K.Pa + 1.6), lleva = kprog(T, K.Pa + 1.6, K.Pa + 2.5, kEase.suave), nuevaR = klerp(0, 60, kprog(T, K.Pa + 2.6, K.Pa + 3.8));
  const tira = kprog(T, K.Pa + 0.6, K.Pa + 1.2, kEase.suave);
  const tazon = kprog(T, K.E + 1.2, K.E + 1.9, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la seta en la mano; la semilla se tacha y aparece la cepa (caja con micelio) */}
      <Escena T={T} a={-1} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform={`rotate(${Math.sin(T * 2.2) * 4} 440 950)`}>{racimo(klerp(0.75, 1, kprog(T, 0, 0.8)))}</g>
          <Semilla x={170} y={600} s={1.1} />
          <Tache x={170} y={600} p={kprog(T, K.G + 0.6, K.G + 1.0, kEase.rebote)} r={70} />
          {T > K.G + 1.8 && <g opacity={kprog(T, K.G + 1.8, K.G + 2.2)}>
            <PlacaPetri x={420} y={560} r={60} agar={CP.agar} id="pG0"><ColoniaHifas r={44} seed={2} color="#fbd3de" /></PlacaPetri>
            <path d="M 420 600 Q 430 700 430 780" stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="14 10" strokeDashoffset={-T * 40} />
            <path d="M 410 760 L 430 800 L 452 762" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>}
        </>)}
      </Escena>
      {/* 1 · corte: se abre la seta y las pinzas toman tejido de adentro */}
      <Escena T={T} a={K.Co} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <SetaPartida x={440} y={860} s={1.3} abre={kprog(T, K.Co + 0.2, K.Co + 1.2, kEase.sale)} hueco={kprog(T, K.Co + 2.4, K.Co + 2.6)} />
          {/* polvo y microbios en la superficie de afuera */}
          {T > K.Co + 1.6 && [[180, 700], [260, 640], [700, 620], [820, 700], [150, 820], [860, 820], [330, 600]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7 + (i % 3) * 3} fill={i % 2 ? '#6b8f3a' : '#8a6a4a'} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.Co + 1.6 + i * 0.06, K.Co + 1.9 + i * 0.06)} />)}
          {(() => { const ent = kprog(T, K.Co + 1.3, K.Co + 2.2, kEase.sale), sale = kprog(T, K.Co + 2.6, K.Co + 3.6, kEase.suave);
            const px = klerp(980, 492, ent) + sale * 200, py = klerp(560, 769, ent) - sale * 260;
            return <>{T > K.Co + 2.4 && <Cubito x={px - 2} y={py} s={1} />}<Pinzas x={px} y={py} ang={-35} a={T > K.Co + 2.4 ? 0 : 1 - ent * 0.6} s={1} /></>; })()}
        </>)}
      </Escena>
      {/* 2 · agar: flama, campana de flujo y la caja Petri */}
      <Escena T={T} a={K.A} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {/* campana de flujo laminar: filtro arriba y aire que baja */}
          <rect x={300} y={360} width={720} height={70} rx={14} fill="#dfe7ee" stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 10 }, (_, i) => <line key={i} x1={330 + i * 70} y1={374} x2={330 + i * 70} y2={416} stroke="#9aa4ae" strokeWidth={5} />)}
          {Array.from({ length: 6 }, (_, i) => { const yy = 460 + ((T * 160 + i * 60) % 300); return <g key={i} opacity=".6"><line x1={380 + i * 110} y1={yy} x2={380 + i * 110} y2={yy + 50} stroke="#fff" strokeWidth={6} strokeLinecap="round" /><path d={`M ${368 + i * 110} ${yy + 38} L ${380 + i * 110} ${yy + 54} L ${392 + i * 110} ${yy + 38}`} stroke="#fff" strokeWidth={5} fill="none" /></g>; })}
          <Mechero T={T} x={150} y={1170} s={0.85} />
          {flamea > 0 && <g opacity={flamea}><Pinzas x={150} y={880} ang={-150} a={0.2} /><circle cx={150} cy={880} r={26} fill={KC.orange} opacity={0.4 + 0.2 * Math.sin(T * 20)} /></g>}
          <PlacaPetri x={640} y={930} r={250} agar={CP.agar} id="pA" tapa={0}>
            {caeCubo >= 1 && <Cubito x={0} y={0} s={1.2} />}
          </PlacaPetri>
          {/* tapa que se levanta apenas */}
          {tapaA > 0 && <ellipse cx={640 + tapaA * 150} cy={930 - tapaA * 30} rx={262} ry={262} fill="rgba(220,240,246,.35)" stroke={KC.ink} strokeWidth={6} />}
          {caeCubo > 0 && caeCubo < 1 && <><Cubito x={klerp(860, 640, caeCubo)} y={klerp(600, 930, caeCubo)} s={1.2} /><Pinzas x={klerp(860, 640, caeCubo) + 6} y={klerp(600, 930, caeCubo)} ang={-40} a={caeCubo > 0.9 ? 1 : 0} /></>}
        </>)}
      </Escena>
      {/* 3 · hifas: la colonia crece en círculo; Lupa en la orilla */}
      <Escena T={T} a={K.H} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<PlacaPetri x={560} y={990} r={240} agar={CP.agar} id="pH"><ColoniaHifas r={rH} seed={3} /><Cubito x={0} y={0} s={0.9} /></PlacaPetri>)}
      </Escena>
      {/* 4 · pasar: la contaminada se tira; de la limpia, un cuadrito de micelio nuevo a otra caja */}
      <Escena T={T} a={K.Pa} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* bote */}
          <path d="M 90 1060 L 110 1230 L 300 1230 L 320 1060 Z" fill="#5a5f6b" stroke={KC.ink} strokeWidth={7} /><rect x={74} y={1040} width={262} height={30} rx={10} fill="#777e8a" stroke={KC.ink} strokeWidth={6} />
          <g transform={`translate(${klerp(250, 205, tira)} ${klerp(760, 1080, tira)}) scale(${klerp(1, 0.45, tira)}) rotate(${tira * 40})`} opacity={1 - kprog(T, K.Pa + 1.1, K.Pa + 1.3)}>
            <PlacaPetri x={0} y={0} r={170} agar={CP.agar} id="pC"><ColoniaHifas r={110} seed={5} /><circle cx={60} cy={-50} r={34} fill={CP.moho} stroke={KC.ink} strokeWidth={3} /><circle cx={-70} cy={60} r={20} fill="#e8e0a0" stroke={KC.ink} strokeWidth={3} /></PlacaPetri>
            <Tache x={0} y={0} p={kprog(T, K.Pa + 0.25, K.Pa + 0.55, kEase.rebote)} r={110} />
          </g>
          <PlacaPetri x={760} y={760} r={170} agar={CP.agar} id="pL"><ColoniaHifas r={150} seed={7} />{corta > 0 && lleva === 0 && <rect x={-14} y={-146} width={28} height={28} fill="none" stroke={KC.red} strokeWidth={4} />}</PlacaPetri>
          <PlacaPetri x={560} y={1090} r={150} agar={CP.agar} id="pN"><ColoniaHifas r={nuevaR} seed={8} /></PlacaPetri>
          {(() => { const bx = klerp(760, 560, lleva), by = klerp(614, 1090, lleva);
            return <>{lleva > 0 && <rect x={bx - 14} y={by - 14} width={28} height={28} rx={4} fill={CP.micelio} stroke={KC.ink} strokeWidth={3} />}
              {T > K.Pa + 0.9 && T < K.Pa + 2.7 && <Bisturi x={bx + 10} y={by} ang={-40} />}</>; })()}
        </>)}
      </Escena>
      {/* 5 · re-gancho: dos clones y un signo de interrogación */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <RacimoOstra T={T} x={170} y={1130} s={1.15} n={6} seed={4} />
          <RacimoOstra T={T} x={400} y={1130} s={1.15} n={6} seed={4} />
          <Interrogacion T={T} x={290} y={880} tam={380} color={KC.pink} />
        </>)}
      </Escena>
      {/* 6 · esporas: sombrero boca abajo, tazón, impresión; Lupa con esporas oblongas */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={120} y={640} width={840} height={560} rx={18} fill={CP.papel} stroke={KC.ink} strokeWidth={8} />
          <Impresion x={540} y={1120} s={1.25} p={kprog(T, K.E + 1.9, K.E + 2.3)} />
          {/* sombrero (láminas abajo): se ve desde arriba; al final se levanta */}
          <g transform={`translate(0 ${-tazon * 0 - kprog(T, K.E + 2.0, K.E + 2.6, kEase.suave) * 700})`} opacity={1 - kprog(T, K.E + 2.3, K.E + 2.6)}>
            <SombreroArriba x={540} y={1120} s={1.25} />
          </g>
          <g transform={`translate(0 ${-tazon * 800})`} opacity={1 - kprog(T, K.E + 1.6, K.E + 1.9)}><Tazon x={540} y={1150} s={1.45} /></g>
        </>)}
      </Escena>
      {/* 7–8 · al microscopio: monocariones y dicarión (fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.Es} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {(() => { const f = 1 - fus;   // los monocariones se desvanecen al fusionarse
            return <g opacity={T < K.D ? 1 : klerp(1, 0.0, kprog(T, K.D + 0.9, K.D + 1.5))}>
              <Espora x={110} y={620} s={1.6} rot={0} />
              <Hifa x0={140} y={620} largo={470 + 60 * fus} p={pMonoA} nucleos={[CP.azul]} T={T} paso={200} />
              <Espora x={110} y={880} s={1.6} rot={0} />
              <Hifa x0={140} y={880} largo={470 + 60 * fus} p={pMonoB} nucleos={[CP.oro]} T={T} paso={200} />
              {/* las puntas se curvan y se tocan */}
              {fus > 0 && <path d={`M 660 620 Q ${720} ${750} 660 880`} stroke="#eaf6ff" strokeWidth={46} fill="none" opacity={fus} strokeLinecap="round" />}
              {fus > 0.8 && <circle cx={705} cy={750} r={40 + 10 * Math.sin(T * 8)} fill="#fff" opacity={0.5 * (1 - kprog(T, K.D + 1.0, K.D + 1.6))} style={{ filter:'drop-shadow(0 0 20px #fff)' }} />}
              {void f}
            </g>; })()}
          {/* dicarión: hifa con un núcleo azul y uno dorado por compartimento y fíbulas en cada tabique */}
          {T > K.D + 0.9 && <Hifa x0={60} y={900} largo={960} p={pDi} nucleos={[CP.azul, CP.oro]} fibulas T={T} paso={300} ancho={80} />}
          {T > K.D + 3.4 && <g opacity={kprog(T, K.D + 3.4, K.D + 3.9)}><SetaOstra x={860} y={1130} s={1.1} abre={kprog(T, K.D + 3.4, K.D + 4.4)} /></g>}
        </>)}
      </Escena>
      {/* 9 · estudio: Oaxaca, dos cepas silvestres, 56 híbridas */}
      <Escena T={T} a={K.Es} b={K.Gu} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={kprog(T, K.Es + 1.6, K.Es + 2.0) * (1 - kprog(T, K.Es + 4.4, K.Es + 4.8))}>
            <MapaMexico x={30} y={380} ancho={600} conCA={false}>
              {(() => { const [hx, hy] = mxProy(-97.78, 17.81); const k = kprog(T, K.Es + 2.0, K.Es + 2.4, kEase.rebote); return <g transform={`translate(${hx} ${hy}) scale(${1 / 0.6})`}><circle r={18 * k} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle r={34 * k + 6 * Math.sin(T * 5)} fill="none" stroke={KC.red} strokeWidth={4} opacity=".6" /></g>; })()}
            </MapaMexico>
          </g>
          {/* las dos cepas silvestres (padres) */}
          {[[700, CP.micelio, 'pDj'], [940, '#fbd3de', 'pRo']].map(([px, col, id], i) => { const k = kprog(T, K.Es + 2.4 + i * 0.3, K.Es + 2.8 + i * 0.3, kEase.rebote);
            return k > 0 ? <g key={id} transform={`translate(${px} 520) scale(${k})`}><PlacaPetri x={0} y={0} r={62} agar={CP.agar} id={id}><ColoniaHifas r={48} seed={11 + i} color={col} /></PlacaPetri></g> : null; })}
          {T > K.Es + 2.7 && <g opacity={kprog(T, K.Es + 2.7, K.Es + 3.0)} style={{ font:`700 24px ${KF.mono}` }}><text x={700} y={612} textAnchor="middle" fontStyle="italic" fill={KC.ink}>{TX.varDj}</text><text x={940} y={612} textAnchor="middle" fontStyle="italic" fill={KC.ink}>{TX.varRo}</text><text x={820} y={438} textAnchor="middle" fill={KC.ink}>{TX.padres}</text></g>}
          {T > K.Es + 3.0 && <text x={820} y={540} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Es + 3.0, K.Es + 3.3)}>×</text>}
          {H56.map(([hx, hy], i) => { const k = kprog(T, K.Es + 3.2 + i * 0.03, K.Es + 3.45 + i * 0.03, kEase.rebote); if (k <= 0) return null;
            return <g key={i} transform={`translate(${hx} ${hy}) scale(${k})`}><circle r={17} fill="#dfeef2" stroke={KC.ink} strokeWidth={4} /><circle r={12} fill={CP.agar} /><rect x={-9} y={-4} width={8} height={8} fill={CP.micelio} stroke={KC.ink} strokeWidth={1.5} /><rect x={1} y={-4} width={8} height={8} fill="#f59ab0" stroke={KC.ink} strokeWidth={1.5} /></g>; })}
        </>)}
      </Escena>
      {/* 10 · guardar: código y tres formas */}
      <Escena T={T} a={K.Gu} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <PlacaPetri x={280} y={630} r={140} agar={CP.agar} id="pG"><ColoniaHifas r={112} seed={13} color="#fbd3de" /></PlacaPetri>
          {T > K.Gu + 0.4 && <g opacity={kprog(T, K.Gu + 0.4, K.Gu + 0.7)}><Tag x={530} y={560} texto={TX.codigo} s={0.9} rot={10} /></g>}
          <g opacity={kprog(T, K.Gu + 2.8, K.Gu + 3.1)}><PlacaPetri x={200} y={1010} r={80} agar={CP.agar} id="pR1"><ColoniaHifas r={60} seed={21} color="#fbd3de" /></PlacaPetri><path d="M 290 1010 L 330 1010" stroke={KC.ink} strokeWidth={6} /></g>
          <TuboAgua x={540} y={1100} s={0.75} on={kprog(T, K.Gu + 1.2, K.Gu + 1.5)} />
          <VialFrio x={880} y={1100} s={0.75} T={T} on={kprog(T, K.Gu + 1.9, K.Gu + 2.2)} />
        </>)}
      </Escena>
      {/* 11 · Robert: su impresión de esporas y su tupper */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={70} y={520} width={400} height={300} rx={14} fill={CP.papel} stroke={KC.ink} strokeWidth={7} />
          <Impresion x={270} y={790} s={0.6} />
          <Tupper x={270} y={1080} s={0.95} col={kprog(T, K.R + 1.2, K.R + 3.0)} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma seta del inicio, ahora con su código */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform={`rotate(${Math.sin(T * 2.2) * 4} 440 950)`}>{racimo(1)}</g>
          {T > K.C + 0.5 && <g opacity={kprog(T, K.C + 0.5, K.C + 0.9)}><Tag x={600} y={900} texto={TX.codigo} s={0.85} rot={-8} /></g>}
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.5} until={K.Co - 0.3} x={600} y={1090} texto={TX.etqSeta} tam={36} color={KC.ink} />
      <Etq T={T} at={K.G + 0.8} until={K.Co - 0.3} x={600} y={1140} texto={TX.etqSetaCi} it tam={36} color={KC.ink} />
      <Chip T={T} at={K.G + 0.9} until={K.Co - 0.3} texto={TX.semilla} x={170} y={720} tam={32} borde={KC.red} />
      <Chip T={T} at={K.G + 2.0} until={K.Co - 0.3} texto={TX.pedacito} x={420} y={460} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Co + 1.4} until={K.A - 0.3} texto={TX.adentro} x={470} y={1170} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Co + 1.9} until={K.A - 0.3} texto={TX.afuera} x={470} y={480} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Co + 2.6} until={K.A - 0.3} texto={TX.mm} x={800} y={1060} tam={32} borde={KC.gold} mono />
      <Etq T={T} at={K.A + 0.4} until={K.A + 1.8} x={40} y={720} texto={TX.flama} tam={26} color={KC.ink} />
      <Chip T={T} at={K.A + 1.0} until={K.H - 0.3} texto={TX.sinAire} x={660} y={560} tam={24} borde={KC.ink} />
      <Chip T={T} at={K.A + 0.6} until={K.H - 0.3} texto={TX.flujo} x={660} y={485} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.A + 2.2} until={K.H - 0.3} texto={TX.pda} x={640} y={1215} tam={30} borde={KC.gold} />
      {T > K.H + 0.2 && T < K.Pa - 0.2 && <div style={{ position:'absolute', left:880, top:800, transform:'translate(-50%,-50%)', zIndex:42, font:`700 52px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.6)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'2px 22px', opacity:kprog(T, K.H + 0.2, K.H + 0.5) }}>{TX.dia} {dia}</div>}
      <Lupa T={T} at={K.H + 0.8} until={K.Pa - 0.4} x={300} y={540} r={170} fx={560 - 0.7 * (rH + 4)} fy={990 - 0.7 * (rH + 4)} interior={(t, r) => LupaHifas(t, r, K.H + 0.9)} etiqueta={TX.lupaHifas} tinte={KC.mint} />
      <Chip T={T} at={K.Pa + 0.3} until={K.P - 0.3} texto={TX.tirar} x={250} y={540} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Pa + 1.0} until={K.P - 0.3} x={940} y={560} texto={TX.nuevo} lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pa + 2.6} until={K.P - 0.3} texto={TX.clon} x={540} y={430} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.E + 0.3} until={K.M - 0.3} texto={TX.impresion} x={540} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.E + 0.8} until={K.E + 1.9} texto={TX.horas} x={540} y={570} tam={30} borde={KC.ink} mono />
      <Lupa T={T} at={K.E + 2.4} until={K.M - 0.35} x={800} y={560} r={150} fx={600} fy={900} interior={(t, r) => LupaEsporas(t, r)} etiqueta={TX.lupaEsporas} tinte={KC.yellow} />
      <Etq T={T} at={K.M + 1.2} until={K.D - 0.2} x={60} y={500} texto={TX.mono} tam={30} color={CP.azul} />
      <Chip T={T} at={K.M + 2.4} until={K.D - 0.2} texto={TX.sinGrapas} x={360} y={1010} tam={30} borde={KC.lilac} mono />
      <Etq T={T} at={K.D + 1.6} until={K.Es - 0.3} x={60} y={760} texto={TX.fibula} tam={30} color={KC.gold2} />
      <Etq T={T} at={K.D + 1.2} until={K.Es - 0.3} x={60} y={500} texto={TX.di} tam={34} color={KC.texto} />
      <Chip T={T} at={K.D + 2.6} until={K.Es - 0.3} texto={TX.reparte} x={430} y={1060} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.D + 3.6} until={K.Es - 0.3} x={820} y={1120} texto={TX.daSetas} lado="izq" tam={30} color={KC.pink} />
      <TarjetaEstudio T={T} at={K.Es + 0.1} until={K.Es + 1.7} anio="2014" quien="U. Tecnológica de la Mixteca · IPN · UNAM" revista="Brazilian Journal of Microbiology, 2014" x={540} y={680} />
      <Etq T={T} at={K.Es + 2.2} until={K.Es + 4.4} x={60} y={720} texto={TX.oaxaca} tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.Es + 4.4} until={K.Gu - 0.3} valor={56} dur={1.2} etiqueta={TX.hibridas} x={270} y={640} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Es + 5.3} until={K.Gu - 0.3} texto={TX.masRapido} x={540} y={860} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Es + 2.8} until={K.Es + 5.1} texto={TX.sinEsporas} x={540} y={860} tam={27} borde={KC.lilac} />
      <Chip T={T} at={K.Gu + 2.9} until={K.R - 0.3} texto={TX.resembrar} x={200} y={880} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.Gu + 3.3} until={K.R - 0.3} texto={TX.tropical} x={560} y={440} tam={26} borde={KC.red} />
      <Chip T={T} at={K.Gu + 2.1} until={K.R - 0.3} texto={TX.agua} x={540} y={790} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.Gu + 2.1} until={K.R - 0.3} texto={TX.congelada} x={880} y={790} tam={28} borde={KC.cyan} />
      <Chip T={T} at={K.Gu + 0.9} until={K.Gu + 3.1} texto={TX.liofilizar} x={560} y={440} tam={24} borde={KC.red} />
      <Chip T={T} at={K.R + 0.3} until={K.C - 0.3} texto={TX.casero} x={270} y={450} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.R + 0.8} until={K.C - 0.3} x={70} y={860} texto={TX.impresion} tam={24} color={KC.ink} />
      <Etq T={T} at={K.R + 1.4} until={K.C - 0.3} x={70} y={950} texto={TX.tupperEtq} tam={24} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto={TX.copia} x={250} y={480} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.C + 1.5} until={K.Ou} texto={TX.cruza} x={250} y={790} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto={TX.noSemilla} x={540} y={1200} tam={32} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Co} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Co} until={K.A} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="1 cm" largo={60} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={90} />
      <BarraEscala T={T} at={K.E} until={K.M} texto="1 cm" largo={100} />
      <BarraEscala T={T} at={K.M} until={K.Es} texto={TX.esquema} largo={0} />
      <BarraEscala T={T} at={K.Es} until={K.Gu} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Gu} until={K.C} texto="1 cm" largo={70} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.05} until={K.Co - 0.1} texto="No nació de una semilla: *nació de una cepa.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.A - 0.1} texto="Tejido *de adentro,* limpio." />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.H - 0.1} texto="En campana de flujo: *a la caja con agar.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.Pa - 0.1} texto="Las hifas crecen *por la punta.*" />
      <Subtitulo T={T} idx={4} at={K.Pa + 0.1} until={K.P - 0.1} texto="Un cuadrito a otra caja: *un clon.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y una seta *nueva?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.M - 0.1} texto="Boca abajo: *un polvo de esporas.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.D - 0.1} texto="Cada espora: *un solo tipo de núcleo.*" />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={K.Es - 0.1} texto="Dos se fusionan: *el dicarión.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.Gu - 0.1} texto="Estudio mexicano, 2014: *56 híbridas.*" />
      <Subtitulo T={T} idx={10} at={K.Gu + 0.1} until={K.R - 0.1} texto="*Agua, congelada o resembrada.*" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.C - 0.1} texto="Mis primeras cajas Petri: *tuppers.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una copia *o una cruza.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Co + 0.4, K.Co + 3.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.7, K.Pa - 0.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.M + 0.8, K.D - 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Es + 1.0, K.Es + 6.0, 'avatar_11_sorprendido', 'bajo-der'],
        [K.R + 0.05, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande'],
        [K.C + 0.7, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="103" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CepaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CepaShot /></CompositionStage></div>;
}
window.CepaApp = CepaApp;
