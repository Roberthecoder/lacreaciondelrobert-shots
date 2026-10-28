// Shot Ambiental #06 · La Ciudad de México se hunde (escalones del Ángel, NISAR 2026) — NARRADO (N1 por dentro + N2 el número).
// Datos: NASA JPL, "US-Indian Space Mission Maps Extreme Subsidence in Mexico City" (29 abr 2026) y Yaemsiri et al. (2010) para las uñas.
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// El Ángel de la Independencia (esquemático, no a escala): columna con el ángel dorado y la base.
// El monumento no se mueve: el suelo de alrededor baja y aparecen escalones (esc = 0..14) debajo del pedestal.
const ANG_BASE = 924, ANG_PASO = 14;
const angSuelo = (esc) => ANG_BASE + esc * ANG_PASO;
function Angel({ T, x = 540, esc = 0 }) {
  const pb = ANG_BASE, top = pb - 200;
  return <g transform={`translate(${x} 0)`}>
    <rect x={-560} y={angSuelo(esc)} width={1120} height={1000} fill="#9a9aa2" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 14 }, (_, i) => i < esc ? <rect key={i} x={-160 - i * 7} y={pb + i * ANG_PASO} width={320 + i * 14} height={ANG_PASO} fill={i % 2 ? '#d9d3c6' : '#ebe5d8'} stroke={KC.ink} strokeWidth={3} /> : null)}
    <rect x={-150} y={top} width={300} height={200} fill="#ebe5d8" stroke={KC.ink} strokeWidth={7} />
    <rect x={-45} y={top - 470} width={90} height={470} fill="#f2ede2" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 5 }, (_, i) => <line key={i} x1={-45} y1={top - 80 - i * 80} x2={45} y2={top - 80 - i * 80} stroke={KC.gold} strokeWidth={6} />)}
    <rect x={-70} y={top - 500} width={140} height={34} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(0 ${top - 555})`}>
      <path d="M -10 0 Q -70 -60 -120 -30 Q -80 -10 -14 20 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
      <path d="M 10 0 Q 70 -60 120 -30 Q 80 -10 14 20 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
      <circle cy={-22} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
      <path d="M -16 -6 L 16 -6 L 22 50 L -22 50 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Corte del subsuelo: ciudad arriba, lodo del antiguo lago con agua entre los granos, y un pozo.
function Subsuelo({ T, aplasta = 0, bombea = 0, pozo = true }) {
  const top = 760 + aplasta * 90;                       // la superficie baja cuando el lodo se aplasta
  const r = krng(5);
  const granos = Array.from({ length: 60 }, () => ({ x: r() * KW, y: r(), s: 8 + r() * 10 }));
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill="#9fdcff" />
    {/* edificios */}
    {[[60, 160, 300], [250, 140, 220], [420, 180, 360], [640, 150, 260], [820, 200, 320]].map(([bx, w, h], i) =>
      <g key={i}><rect x={bx} y={top - h} width={w} height={h} fill={[KC.pink, KC.yellow, KC.lilac, KC.orange, KC.mint][i]} stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: Math.floor(h / 70) }, (_, k) => <rect key={k} x={bx + 22} y={top - h + 22 + k * 70} width={w - 44} height={30} fill="#fff" opacity=".55" />)}</g>)}
    {/* lodo del antiguo lago */}
    <rect x={0} y={top} width={KW} height={1300 - top} fill="#8a6a4a" stroke={KC.ink} strokeWidth={6} />
    {granos.map((g, i) => <circle key={i} cx={g.x} cy={top + 30 + g.y * (1240 - top)} r={g.s * (1 - aplasta * 0.15)} fill="#6d523a" />)}
    {/* agua entre los granos: se va vaciando */}
    {Array.from({ length: 30 }, (_, i) => { const rr = krng(50 + i), yy = top + 40 + rr() * (1220 - top);
      return <circle key={i} cx={rr() * KW} cy={yy} r={7} fill="#3aa0ff" opacity={Math.max(0, 0.9 - bombea * 0.8)} />; })}
    {pozo && <g>
      <rect x={950} y={top - 140} width={36} height={1240 - top + 140} fill="#c7ccd6" stroke={KC.ink} strokeWidth={5} />
      <rect x={920} y={top - 170} width={96} height={50} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      {bombea > 0 && Array.from({ length: 6 }, (_, k) => { const u = ((T * 1.2 + k / 6) % 1); return <circle key={k} cx={968} cy={klerp(1220, top - 130, u)} r={10} fill="#3aa0ff" stroke={KC.ink} strokeWidth={2} />; })}
    </g>}
  </g>;
}
// Satélite NISAR esquemático: cuerpo, paneles y el gran reflector (tambor) de radar.
function Satelite({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8) * 4})`}>
    <rect x={-60} y={-40} width={120} height={80} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <rect x={-300} y={-28} width={220} height={56} fill="#2346ff" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 5 }, (_, i) => <line key={i} x1={-300 + i * 44} y1={-28} x2={-300 + i * 44} y2={28} stroke="#9fb4ff" strokeWidth={3} />)}
    <line x1={60} y1={0} x2={150} y2={60} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={200} cy={110} rx={130} ry={46} fill="#e9edf5" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={200} cy={110} rx={90} ry={28} fill="none" stroke="#9aa3b5" strokeWidth={4} />
  </g>;
}
// Mapa esquemático del valle: manchas azules = zonas que bajan más de 2 cm por mes (según NISAR).
function MapaValle({ T, a }) {
  const manchas = [[-180, -60, 120, 70], [60, 40, 160, 90], [190, -120, 90, 60], [-60, 160, 110, 60]];
  return <g transform="translate(560 910) scale(0.8)">
    <path d="M -400 -300 Q -100 -380 200 -320 Q 420 -260 410 0 Q 430 260 180 330 Q -120 380 -360 260 Q -460 0 -400 -300 Z" fill="#f4e6c8" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <line key={'h' + i} x1={-380} y1={-280 + i * 70} x2={400} y2={-280 + i * 70} stroke="#d8c8a6" strokeWidth={3} />)}
    {Array.from({ length: 11 }, (_, i) => <line key={'v' + i} x1={-380 + i * 78} y1={-300} x2={-380 + i * 78} y2={330} stroke="#d8c8a6" strokeWidth={3} />)}
    {manchas.map(([mx, my, rx, ry], i) => { const e = kprog(T, a + 0.6 + i * 0.35, a + 1.2 + i * 0.35, kEase.sale);
      return <ellipse key={i} cx={mx} cy={my} rx={rx * e} ry={ry * e} fill="#1238c4" opacity={0.55 + 0.15 * Math.sin(T * 3 + i)} stroke="#0a1f73" strokeWidth={4} />; })}
    <rect x={40} y={10} width={150} height={40} rx={8} fill="#bbb" stroke={KC.ink} strokeWidth={4} transform="rotate(-20 115 30)" />
    <text x={115} y={-20} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>aeropuerto</text>
    <circle cx={-170} cy={-150} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    <text x={-170} y={-175} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>Ángel</text>
  </g>;
}
// Mano con uña (comparación): crece un poquito mientras la barra del suelo baja.
function Grietas({ T, a }) {
  const g = kprog(T, a + 0.2, a + 2.2, kEase.sale);
  const crack = (x0, y0, pts) => <polyline points={pts.map(([dx, dy], i) => `${x0 + dx * Math.min(1, g * pts.length / (i + 1))},${y0 + dy * Math.min(1, g * pts.length / (i + 1))}`).join(' ')} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />;
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill="#ffe9a8" />
    <rect x={0} y={1000} width={KW} height={300} fill="#8d8f96" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={40 + i * 180} y={1140} width={100} height={16} fill="#fff" />)}
    {crack(200, 1000, [[30, 60], [-10, 120], [40, 200], [10, 300]])}
    {crack(760, 1000, [[-20, 80], [30, 150], [0, 240]])}
    <g transform={`rotate(${3 * g} 300 1000)`}><rect x={180} y={560} width={240} height={440} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 5 }, (_, k) => <rect key={k} x={210} y={590 + k * 80} width={180} height={40} fill="#fff" opacity=".6" />)}
      {crack(260, 600, [[30, 80], [-10, 160], [40, 260]])}</g>
    <rect x={560} y={720} width={420} height={140} rx={40} fill={KC.orange} stroke={KC.ink} strokeWidth={7} transform={`rotate(${-2 * g} 770 860)`} />
    {[620, 760, 900].map((wx) => <rect key={wx} x={wx - 40} y={750} width={80} height={60} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-2 * g} 770 860)`} />)}
    <text x={770} y={705} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Metro</text>
    <rect x={0} y={1210} width={KW} height={30} fill="#c7ccd6" stroke={KC.ink} strokeWidth={4} />
    {g > 0.6 && Array.from({ length: 5 }, (_, k) => { const u = ((T * 1.5 + k / 5) % 1); return <circle key={k} cx={540 + Math.sin(k * 2) * 20} cy={1225 - u * 60} r={8} fill="#3aa0ff" opacity={1 - u} />; })}
  </g>;
}

function HundimientoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lago, B: CUES.Bomba, Es: CUES.Esponja, P: CUES.Pregunta, Sa: CUES.Satelite, Ci: CUES.Cifra, U: CUES.Unas, H: CUES.Historia, Gr: CUES.Grietas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // Gancho: los 14 escalones aparecen uno por uno mientras el suelo baja (desde el cuadro 0).
  const escG = Math.round(14 * kprog(T, K.G + 0.1, K.G + 3.2, kEase.suave));
  const escC = 14;
  const aplasta = kprog(T, K.Es + 0.4, K.Es + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el Ángel y sus escalones */}
      <Escena T={T} a={K.G} b={K.L}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Angel T={T} esc={escG} />
          <line x1={150} y1={ANG_BASE} x2={930} y2={ANG_BASE} stroke={KC.red} strokeWidth={5} strokeDasharray="16 10" opacity={escG > 0 ? 1 : 0} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2–4 · el lago, el pozo y el lodo que se aplasta (corte del subsuelo) */}
      <Escena T={T} a={K.L} b={K.P}>
        {svg(<Subsuelo T={T} aplasta={aplasta} bombea={kprog(T, K.B + 0.3, K.Es + 3.0)} pozo={T > K.B - 0.3} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Es + 0.6} until={K.P - 0.2} x={760} y={540} r={170} fx={540} fy={1000} tinte={KC.yellow} etiqueta="RAYOS X · lodo del lago"
        interior={(t, r) => { const u = kprog(t, K.Es + 0.8, K.Es + 3.2, kEase.suave); const pts = [];
          for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) pts.push([40 + i * 65, klerp(40 + j * 65, 120 + j * 45, u)]);
          return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#5a4330" />
            {pts.map(([px, py], k) => <g key={k}><circle cx={px + 30} cy={py + 25} r={10} fill="#3aa0ff" opacity={1 - u} /><rect x={px} y={py} width={56} height={klerp(40, 26, u)} rx={10} fill="#b08a62" stroke={KC.ink} strokeWidth={3} /></g>)}</svg>; }} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Sa} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={980} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 800)`}>?</text>)}
      </Escena>
      {/* 6 · el satélite NISAR con su radar */}
      <Escena T={T} a={K.Sa} b={K.Ci}>
        <FondoEspacio T={T} />
        {svg(<><path d="M 0 1300 Q 540 1150 1080 1300 L 1080 1920 L 0 1920 Z" fill="#3a8f5a" stroke={KC.ink} strokeWidth={6} />
          {[[200, 1000], [520, 1060], [820, 980]].map(([cx, cy], i) => <g key={i} transform={`translate(${cx + Math.sin(T * 0.6 + i) * 20} ${cy})`}><ellipse rx={130} ry={50} fill="#fff" opacity=".85" /><ellipse cx={-60} cy={-20} rx={70} ry={40} fill="#fff" opacity=".85" /></g>)}
          {kprog(T, K.Sa + 1.6, K.Sa + 2.2) > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.9 + k / 3) % 1); return <path key={k} d={`M ${840 - 120 * u} ${560 + u * 640} Q 840 ${560 + u * 660} ${840 + 120 * u} ${560 + u * 640}`} stroke={KC.yellow} strokeWidth={8} fill="none" opacity={1 - u} />; })}
          <Satelite T={T} x={640} y={460} s={1} /></>)}
        <EscalaFija texto="12 m (reflector)" largo={260} color={KC.texto} />
      </Escena>
      {/* 7 · la cifra en el mapa */}
      <Escena T={T} a={K.Ci} b={K.U}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<MapaValle T={T} a={K.Ci} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · tus uñas contra el suelo */}
      <Escena T={T} a={K.U} b={K.H}>
        <FondoLunares color={KC.mint} />
        <EscalaFija texto="1 cm (barras)" largo={210} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · la historia */}
      <Escena T={T} a={K.H} b={K.Gr}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      {/* 10 · grietas */}
      <Escena T={T} a={K.Gr} b={K.C}>
        {svg(<Grietas T={T} a={K.Gr} />)}
      </Escena>
      {/* 11 · cierre: regreso al Ángel con sus 14 escalones */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Angel T={T} esc={escC} />
          <line x1={150} y1={ANG_BASE} x2={930} y2={ANG_BASE} stroke={KC.red} strokeWidth={5} strokeDasharray="16 10" /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.1} until={K.L - 0.2} valor={14} dur={3.1} etiqueta="escalones agregados" x={275} y={720} tam={120} color={KC.yellow} />
      <Etq T={T} at={K.G + 1.0} until={K.L - 0.2} x={140} y={ANG_BASE} texto="suelo de antes" lado="izq" color={KC.red} tam={24} />
      <Chip T={T} at={K.L + 0.3} until={K.B - 0.2} texto="fondo de un antiguo lago" y={430} x={420} tam={38} borde={KC.cyan} />
      <Chip T={T} at={K.B + 0.3} until={K.Es - 0.2} texto="≈ 20 millones de personas" y={430} x={640} tam={38} borde={KC.yellow} />
      <Etq T={T} at={K.B + 1.2} until={K.Es - 0.2} x={940} y={1180} texto="agua del subsuelo" lado="izq" tam={28} />
      <Chip T={T} at={K.Es + 0.3} until={K.P - 0.2} texto="se aplasta como esponja" y={1420} x={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Sa + 0.3} until={K.Ci - 0.2} texto="NISAR · NASA + India" y={760} x={540} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Sa + 2.2} until={K.Ci - 0.2} x={300} y={1150} texto="radar: atraviesa las nubes" tam={28} />
      <Chip T={T} at={K.Ci + 0.2} until={K.U - 0.2} texto="oct 2025 – ene 2026 · preliminar" y={400} x={640} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ci + 2.0} until={K.U - 0.2} valor={2} dur={0.6} prefijo="+" sufijo=" cm / mes" etiqueta="zonas azules: bajan más de" x={640} y={560} tam={84} color="#2f6dff" />
      <Comparativa T={T} at={K.U + 0.1} until={K.H - 0.2} max={20} y={560} alto={420}
        izq={{ valor: 3.47, texto: '3.5 mm', etiqueta: 'tus uñas', color: KC.pink }} der={{ valor: 20, texto: '+20 mm', etiqueta: 'el suelo', color: '#2f6dff' }} />
      <Chip T={T} at={K.U + 0.5} until={K.H - 0.2} texto="por mes" y={470} x={540} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.H + 0.2} until={K.Gr - 0.3} anio="1925" quien="un ingeniero lo documenta" y={620} x={600} />
      <Chip T={T} at={K.H + 3.6} until={K.Gr - 0.3} texto="años 90: ≈ 35 cm por año" y={1000} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Gr + 0.3} until={K.C - 0.2} texto="calles · edificios · tuberías · Metro" y={430} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="el Ángel no creció: la ciudad bajó" y={1440} tam={34} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="Le agregaron *14 escalones:* la ciudad se hunde." />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.B - 0.1} texto="Sobre el fondo de *un antiguo lago.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.Es - 0.1} texto="20 millones, y se bombea *agua del subsuelo.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.P - 0.1} texto="El lodo se aplasta *como esponja.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.05} until={K.Sa - 0.1} texto="¿Qué tan *rápido?*" />
      <Subtitulo T={T} idx={5} at={K.Sa + 0.1} until={K.Ci - 0.1} texto="NISAR: radar que *atraviesa las nubes.*" />
      <Subtitulo T={T} idx={6} at={K.Ci + 0.1} until={K.U - 0.1} texto="Algunas zonas: *más de 2 cm por mes.*" />
      <Subtitulo T={T} idx={7} at={K.U + 0.1} until={K.H - 0.1} texto="*Más de 5 veces* tus uñas." />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.Gr - 0.1} texto="1925… y en los 90, *35 cm al año.*" />
      <Subtitulo T={T} idx={9} at={K.Gr + 0.1} until={K.C - 0.1} texto="Se cuartean *calles, tuberías y el Metro.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="El Ángel no creció: *la ciudad bajó.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Bomba + 1.0, CUES.Esponja + 0.4, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Satelite + 1.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Satelite + 2.6, CUES.Cifra - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cifra + 2.4, CUES.Unas + 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Unas + 0.6, CUES.Historia - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Historia + 3.4, CUES.Grietas - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HundimientoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HundimientoShot /></CompositionStage></div>;
}
window.HundimientoApp = HundimientoApp;
