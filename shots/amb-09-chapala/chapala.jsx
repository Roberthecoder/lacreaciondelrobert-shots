// Shot Ambiental #09 · Seis de cada diez litros de Guadalajara salen de un lago de 8 m (Chapala) — NARRADO (N2 el número + N4 la imagen que se llena).
// Datos: Comisión Estatal del Agua de Jalisco (CEA), página "Lago de Chapala" y nivel diario del 27 oct 2026. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (la silueta del lago es aproximada).

// Silueta esquemática del lago (79 × 28 km) en una caja de ancho w. ciénega 0..1 = el lóbulo del oriente que se secó (1902-1910).
const CH_PATH = 'M 0 150 Q 20 80 120 70 Q 230 40 330 70 Q 420 30 520 50 Q 640 30 760 60 Q 860 70 900 130 Q 880 210 780 230 Q 700 300 600 290 Q 520 320 430 290 Q 330 310 240 270 Q 130 270 60 230 Q 0 210 0 150 Z';
function Lago({ x, y, w = 900, nivel = 1, cienega = 0, T = 0, reparto = 0, color = '#2f8fd8' }) {
  const s = w / 900;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cienega > 0 && <path d="M 880 100 Q 980 60 1060 110 Q 1100 190 1020 240 Q 940 260 880 200 Z" fill={mixHex('#2f8fd8', '#7cc46a', kclamp(cienega * 2 - 1, 0, 1))} stroke={KC.ink} strokeWidth={6 / s} opacity={kclamp(cienega * 3, 0, 1)} />}
    {cienega > 0.5 && Array.from({ length: 6 }, (_, i) => <line key={i} x1={900 + i * 28} y1={120} x2={900 + i * 28} y2={230} stroke="#4f9a44" strokeWidth={4 / s} opacity={kclamp(cienega * 2 - 1, 0, 1)} />)}
    {cienega > 0 && <line x1={885} y1={95} x2={880} y2={220} stroke={KC.ink} strokeWidth={10 / s} strokeLinecap="round" opacity={kclamp(cienega * 2 - 0.6, 0, 1)} />}
    <path d={CH_PATH} fill="#d9c79a" stroke={KC.ink} strokeWidth={8 / s} />
    <g transform={`translate(450 175) scale(${0.35 + 0.65 * nivel}) translate(-450 -175)`}>
      <path d={CH_PATH} fill={color} opacity={0.95} />
      {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M ${150 + i * 140} ${150 + (i % 2) * 40} q 20 ${-8 + Math.sin(T * 2 + i) * 4} 40 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
    </g>
    {reparto > 0 && <g opacity={reparto}><path d="M 560 300 Q 640 230 780 230 Q 700 300 600 290 Z" fill={KC.orange} opacity={0.8} />
      <path d="M 540 315 Q 640 220 800 222" stroke={KC.ink} strokeWidth={6 / s} strokeDasharray="14 10" fill="none" /></g>}
  </g>;
}
// Botella de un litro que se llena. lleno 0..1, color del agua.
function Litro({ x, y, lleno = 0, color = '#2f8fd8', s = 1 }) {
  const h = 200 * lleno;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-200} width={80} height={200} rx={16} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-6 - h + 6} width={68} height={Math.max(0, h - 6)} rx={10} fill={color} />
    <rect x={-20} y={-232} width={40} height={34} rx={6} fill="#e9eef5" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Indicador de nivel del lago (columna vertical con porcentaje).
function Nivel({ T, x, y, valor, etiqueta, color = '#2f8fd8', alto = 520, numero = true }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-alto} width={140} height={alto} rx={20} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-alto * valor + 10 - 10} width={120} height={Math.max(0, alto * valor - 10)} rx={14} fill={color} />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={-70} y1={-alto * q} x2={-40} y2={-alto * q} stroke={KC.ink} strokeWidth={4} />)}
    {numero && <text x={0} y={-alto - 24} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{kformato(valor * 100, 0)} %</text>}
    {etiqueta && <text x={0} y={60} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

function ChapalaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lago, Pl: CUES.Plano, P: CUES.Pregunta, Es: CUES.Estiaje, M: CUES.Minimo, Ci: CUES.Cienega, H: CUES.Hoy, R: CUES.Reparto, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const litros = (t0) => Array.from({ length: 10 }, (_, i) => { const lleno = kprog(T, t0 + 0.1 + i * 0.12, t0 + 0.6 + i * 0.12, kEase.sale);
    return <Litro key={i} x={100 + i * 98} y={1110} lleno={lleno} color={i < 6 ? '#2f8fd8' : '#b8c4cf'} s={0.6} />; });
  // nivel que sube y baja (lluvias y secas) en "Estiaje"
  const osc = 0.55 + 0.25 * Math.sin((T - K.Es) * 2.2);
  const nivM = klerp(0.7, 954 / 7897, kprog(T, K.M + 0.3, K.M + 2.0, kEase.suave));
  const nivH = klerp(954 / 7897, 0.7018, kprog(T, K.H + 0.3, K.H + 2.0, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 10 litros, 6 de Chapala */}
      <Escena T={T} a={K.G} b={K.L}>
        <FondoLunares color={KC.cyan} />
        {svg(litros(K.G))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el lago visto desde arriba: 79 × 28 km */}
      <Escena T={T} a={K.L} b={K.Pl}>
        <FondoLunares color={KC.mint} />
        {svg(<><Lago x={90} y={620} w={900} T={T} />
          <line x1={90} y1={560} x2={990} y2={560} stroke={KC.ink} strokeWidth={6} /><text x={540} y={540} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>79 km</text>
          <line x1={1010} y1={620 + 30} x2={1010} y2={620 + 320} stroke={KC.ink} strokeWidth={6} /><text x={1000} y={620 + 360} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>28 km</text></>)}
        <EscalaFija texto="10 km" largo={Math.round(900 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · si lo dibujaras de un metro: una décima de milímetro de hondo */}
      <Escena T={T} a={K.Pl} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><line x1={90} y1={900} x2={90 + 900 * kprog(T, K.Pl + 0.1, K.Pl + 1.0, kEase.sale)} y2={900} stroke="#2f8fd8" strokeWidth={2} />
          <line x1={90} y1={880} x2={90} y2={920} stroke={KC.ink} strokeWidth={5} /><line x1={990} y1={880} x2={990} y2={920} stroke={KC.ink} strokeWidth={5} />
          <text x={540} y={860} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>1 m de largo</text></>)}
        <EscalaFija texto="10 cm" largo={90} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Pl + 1.4} until={K.P - 0.2} x={700} y={560} r={180} fx={520} fy={900} zoom={8} tinte={KC.cyan} etiqueta="AUMENTADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#f4efe4" /><rect x={0} y={r - 4} width={r * 2} height={8} fill="#2f8fd8" />
          <text x={r} y={r - 30} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>0.1 mm</text></svg>} />
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={300} y={980} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 800)`}>?</text>
          <Litro x={300} y={1180} lleno={0.6} s={0.6} /></>)}
      </Escena>
      {/* 5 · sube con las lluvias y baja en secas */}
      <Escena T={T} a={K.Es} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Nivel T={T} x={300} y={1150} valor={osc} etiqueta="nivel del lago" numero={false} />
          <g transform="translate(720 600)" opacity={osc > 0.55 ? 1 : 0.25}><ellipse rx={150} ry={60} fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} />{Array.from({ length: 5 }, (_, i) => { const u = ((T * 1.4 + i / 5) % 1); return <line key={i} x1={-80 + i * 40} y1={60 + u * 160} x2={-90 + i * 40} y2={90 + u * 160} stroke="#2f8fd8" strokeWidth={6} />; })}</g>
          <g opacity={osc <= 0.55 ? 1 : 0.25}><Sol T={T} x={760} y={980} r={80} /></g></>)}
      </Escena>
      {/* 6 · el mínimo de 1955 */}
      <Escena T={T} a={K.M} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        {svg(<><Nivel T={T} x={250} y={1150} valor={nivM} etiqueta="jun 1955" /><Lago x={420} y={660} w={600} nivel={kclamp(nivM / 0.7, 0.12, 1)} T={T} /></>)}
        <EscalaFija texto="10 km" largo={Math.round(600 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · la Ciénega: 50 mil hectáreas convertidas en cultivo */}
      <Escena T={T} a={K.Ci} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<Lago x={40} y={640} w={780} cienega={1 - kprog(T, K.Ci + 1.5, K.Ci + 4.0)} T={T} />)}
        <EscalaFija texto="10 km" largo={Math.round(780 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · hoy: 70 % (27 oct 2026) */}
      <Escena T={T} a={K.H} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Nivel T={T} x={250} y={1150} valor={nivH} etiqueta="27 oct 2026" /><Lago x={420} y={660} w={600} nivel={kclamp(nivH / 0.7, 0.12, 1)} T={T} /></>)}
        <EscalaFija texto="10 km" largo={Math.round(600 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · Jalisco 86 %, Michoacán 14 % */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Lago x={90} y={640} w={900} T={T} reparto={kprog(T, K.R + 0.6, K.R + 1.4)} />)}
        <EscalaFija texto="10 km" largo={Math.round(900 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: regreso a los 10 litros */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(litros(K.C - 0.6))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.L - 0.2} valor={6} dur={1.2} sufijo=" de 10" etiqueta="litros en Guadalajara:" x={300} y={620} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.G + 3.2} until={K.L - 0.2} texto="lleno: 8 m en lo más hondo" y={1440} x={540} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.L + 0.3} until={K.Pl - 0.2} texto="Lago de Chapala · el más grande de México" y={1170} x={540} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Pl + 0.4} until={K.P - 0.2} texto="1 m de largo → 0.1 mm de hondo" y={1440} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.3} until={K.M - 0.2} texto="lluvias: sube · secas: baja" y={430} x={600} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.M + 2.0} until={K.Ci - 0.2} texto="954 millones de m³ (12 %)" y={430} x={400} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.3} until={K.H - 0.2} texto="1902–1910: 50 mil ha a cultivo" y={430} x={660} tam={28} borde={KC.leaf} />
      <Etq T={T} at={K.Ci + 2.0} until={K.H - 0.2} x={1050} y={600} texto="Ciénega de Chapala" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.H + 2.2} until={K.R - 0.2} texto="CEA Jalisco: 70.18 % de su capacidad" y={430} x={400} tam={26} borde={KC.cyan} />
      <Etq T={T} at={K.R + 1.2} until={K.C - 0.2} x={200} y={1060} texto="Jalisco 86 %" tam={34} color={KC.ink} />
      <Etq T={T} at={K.R + 1.6} until={K.C - 0.2} x={640} y={1060} texto="Michoacán 14 %" tam={34} color={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="enorme, pero muy bajito" y={470} x={420} tam={36} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="6 de cada 10 litros: *un lago de 8 metros.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.Pl - 0.1} texto="Chapala: *79 km de largo.*" />
      <Subtitulo T={T} idx={2} at={K.Pl + 0.1} until={K.P - 0.1} texto="De 1 metro de largo: *0.1 mm de hondo.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Aguanta *a una ciudad?*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.M - 0.1} texto="Sube con lluvias, *baja en secas.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Ci - 0.1} texto="Junio de 1955: *menos de 1/8.*" />
      <Subtitulo T={T} idx={6} at={K.Ci + 0.1} until={K.H - 0.1} texto="50 mil hectáreas: *casi un tercio.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.R - 0.1} texto="27 de octubre de 2026: *70 %.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.C - 0.1} texto="Jalisco y *Michoacán (14 %).*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un lago enorme, *pero muy bajito.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Lago + 2.6, CUES.Plano + 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estiaje + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Minimo + 2.6, CUES.Cienega - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cienega + 4.4, CUES.Hoy - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Hoy + 3.6, CUES.Reparto - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Reparto + 2.2, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChapalaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ChapalaShot /></CompositionStage></div>;
}
window.ChapalaApp = ChapalaApp;
