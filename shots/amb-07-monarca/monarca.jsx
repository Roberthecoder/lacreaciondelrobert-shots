// Shot Ambiental #07 · Las monarcas caben en cuatro canchas (temporada 2025-2026) — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: WWF/CONANP, "Monitoreo Mariposa Monarca en México 2025-2026" y "Análisis del cambio forestal … RBMM 2024-2025";
// revisión "Eastern North American Monarch Butterfly Conservation Needs and Opportunities" (2026, PMC13027080);
// FIFA, Football Stadiums Guidelines (cancha de 105 × 68 m). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// Mariposa monarca (vista desde arriba): alas naranjas con venas negras y puntitos blancos. aleteo 0..1.
function Monarca({ x, y, s = 1, ang = 0, T = 0, fase = 0, o = 1 }) {
  const a = 0.35 + 0.65 * Math.abs(Math.sin(T * 9 + fase));
  const ala = (lado) => <g transform={`scale(${lado * a} 1)`}>
    <path d="M 0 -4 Q 30 -46 58 -34 Q 66 -10 40 6 Q 18 10 0 4 Z" fill="#f08a1c" stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 6 Q 26 12 44 30 Q 34 50 12 40 Q 2 26 0 10 Z" fill="#f5a03a" stroke={KC.ink} strokeWidth={4} />
    <path d="M 4 0 L 50 -28 M 6 4 L 36 30" stroke={KC.ink} strokeWidth={3} />
    <circle cx={52} cy={-24} r={3} fill="#fff" /><circle cx={42} cy={0} r={3} fill="#fff" /><circle cx={30} cy={38} r={3} fill="#fff" />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`} opacity={o}>
    {ala(1)}{ala(-1)}
    <ellipse rx={5} ry={26} fill={KC.ink} />
  </g>;
}
// Cancha de fútbol vista desde arriba (105 × 68 m). lleno 0..1 = cuánto la cubren las mariposas.
function Cancha({ x, y, w, lleno = 0, T = 0, seed = 1, contorno = false }) {
  const h = w * 68 / 105, r = krng(seed);
  const mar = [];
  const n = Math.round(lleno * 26);
  for (let i = 0; i < n; i++) mar.push(<Monarca key={i} x={x + 12 + r() * (w - 24)} y={y + 12 + r() * (h - 24)} s={0.22 * w / 220} ang={r() * 360} T={T} fase={i} />);
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={contorno ? 'none' : '#3fae4a'} stroke={contorno ? 'rgba(255,255,255,.7)' : '#fff'} strokeWidth={contorno ? 3 : 4} strokeDasharray={contorno ? '8 6' : 'none'} />
    {!contorno && <><line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#fff" strokeWidth={3} /><circle cx={x + w / 2} cy={y + h / 2} r={h * 0.14} fill="none" stroke="#fff" strokeWidth={3} />
      <rect x={x} y={y + h * 0.3} width={w * 0.12} height={h * 0.4} fill="none" stroke="#fff" strokeWidth={3} /><rect x={x + w * 0.88} y={y + h * 0.3} width={w * 0.12} height={h * 0.4} fill="none" stroke="#fff" strokeWidth={3} />
      {lleno > 0 && <rect x={x} y={y} width={w} height={h} fill="#f08a1c" opacity={0.45 * lleno} />}</>}
    {mar}
  </g>;
}
// Oyamel con racimos de monarcas.
function Oyamel({ x, y, s = 1, T, lleno = 1 }) {
  const r = krng(11), puntos = Array.from({ length: 70 }, () => [r() * 2 - 1, r()]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-40} width={44} height={560} fill="#6b4a2e" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M ${-260 + k * 30} ${80 + k * 90} L 0 ${-140 + k * 90} L ${260 - k * 30} ${80 + k * 90} Z`} fill="#2f6b3f" stroke={KC.ink} strokeWidth={6} />)}
    {puntos.slice(0, Math.round(70 * lleno)).map(([u, v], i) => { const yy = -100 + v * 520, ancho = 40 + v * 210;
      return <Monarca key={i} x={u * ancho} y={yy} s={0.3} ang={(i * 47) % 360} T={T * 0.3} fase={i} />; })}
  </g>;
}
// Algodoncillo (Asclepias) con una oruga de rayas; marchita 0..1 (herbicida).
function Algodoncillo({ x, y, T, marchita = 0 }) {
  const verde = mixHex('#3fae4a', '#9a8a5a', marchita);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 Q ${10 * marchita} -200 ${30 * marchita} -420`} stroke={verde} strokeWidth={14} fill="none" />
    {[[-1, -120], [1, -180], [-1, -260], [1, -320]].map(([l, yy], i) => <ellipse key={i} cx={l * 70} cy={yy + marchita * 40} rx={78} ry={28} fill={verde} stroke={KC.ink} strokeWidth={5} transform={`rotate(${l * (-20 - 40 * marchita)} ${l * 70} ${yy})`} />)}
    <g transform={`translate(${20 * marchita} -440)`}>{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={(i - 2) * 16} cy={-Math.abs(i - 2) * 8} r={12} fill={mixHex('#ff9ec4', '#b9a8a0', marchita)} stroke={KC.ink} strokeWidth={3} />)}</g>
    {marchita < 0.5 && <g transform={`translate(${-70 + Math.sin(T * 2) * 6} -140) rotate(-20)`}>
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={i * 16} y={-14} width={16} height={28} fill={['#f7e04a', '#16120f', '#fff'][i % 3]} stroke={KC.ink} strokeWidth={2} />)}
      <circle cx={-6} cy={0} r={12} fill={KC.ink} />
    </g>}
  </g>;
}

function MonarcaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Viaje, R: CUES.Racimos, Ci: CUES.Cifra, A: CUES.Antes, P: CUES.Pregunta, Al: CUES.Algodoncillo, Cl: CUES.Clima, E: CUES.Estudio, M: CUES.Meta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // 4 canchas (2×2) que se llenan desde el cuadro 0; escala: cancha de 105 m = 400 px.
  const CW = 400, CH = CW * 68 / 105;
  const llenaG = kprog(T, K.G + 0.05, K.G + 2.2, kEase.sale);
  const canchas4 = (lleno, ox = 130, oy = 650) => [0, 1, 2, 3].map((i) => <Cancha key={i} x={ox + (i % 2) * (CW + 20)} y={oy + Math.floor(i / 2) * (CH + 20)} w={CW} T={T} seed={i + 2}
    lleno={i < 4 ? kclamp(lleno * 4.1 - i, 0, 1) : 0} />);
  // Viaje: de Canadá/EE. UU. (arriba del mapa) a la Región Monarca (Michoacán/Edomex ≈ 19.6 N, 100.3 O).
  const [mx, my] = mxProy(-100.3, 19.6);
  const viaje = kprog(T, K.V + 0.3, K.R - 0.3, kEase.suave);
  // Cierre: 25 canchas (lo de 1996-1997) y solo 4 llenas (lo de hoy).
  const CW2 = 130, CH2 = CW2 * 68 / 105;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: cuatro canchas que se llenan de monarcas */}
      <Escena T={T} a={K.G} b={K.V}>
        <FondoLunares color={KC.yellow} />
        {svg(canchas4(llenaG))}
        <EscalaFija texto="50 m" largo={CW * 50 / 105} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el viaje en el mapa */}
      <Escena T={T} a={K.V} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={40} y={520} ancho={1000} conCA={false}>
          <path d={`M ${mx + 260} -400 Q ${mx + 120} ${my - 300} ${mx} ${my}`} stroke={KC.orange} strokeWidth={10} fill="none" strokeDasharray="22 14" opacity={viaje > 0 ? 1 : 0} />
          {Array.from({ length: 6 }, (_, k) => { const u = kclamp(viaje * 1.3 - k * 0.06, 0, 1), t = u; const px = (1 - t) * (1 - t) * (mx + 260) + 2 * (1 - t) * t * (mx + 120) + t * t * mx, py = (1 - t) * (1 - t) * -400 + 2 * (1 - t) * t * (my - 300) + t * t * my;
            return <Monarca key={k} x={px + k * 14} y={py - k * 10} s={0.45} ang={160} T={T} fase={k} />; })}
          <circle cx={mx} cy={my} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} opacity={viaje > 0.9 ? 1 : 0} />
        </MapaMexico>)}
        <EscalaFija texto="500 km (aprox.)" largo={Math.round(500 / 111 * (1000 / 42))} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · racimos en el oyamel */}
      <Escena T={T} a={K.R} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {svg(<Oyamel x={540} y={620} s={1.1} T={T} lleno={kprog(T, K.R + 0.2, K.R + 2.5)} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4–5 · la cifra y el récord de 1996-1997 */}
      <Escena T={T} a={K.Ci} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Al} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={300} y={980} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 800)`}>?</text>
          <Monarca x={300} y={1080} s={1.2} T={T} ang={-10} /></>)}
      </Escena>
      {/* 7 · algodoncillo y herbicida */}
      <Escena T={T} a={K.Al} b={K.Cl}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Algodoncillo x={460} y={1180} T={T} marchita={kprog(T, K.Al + 2.4, K.Cl - 0.3)} />
          {kprog(T, K.Al + 2.0, K.Cl) > 0 && <g transform="translate(800 560) rotate(-20)"><rect x={-40} y={-120} width={80} height={170} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-14} y={-160} width={28} height={44} fill="#999" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 10 }, (_, k) => { const u = ((T * 1.4 + k / 10) % 1); return <circle key={k} cx={-30 - u * 260} cy={-150 + u * 260 + Math.sin(k) * 30} r={6} fill="#c9e86a" opacity={1 - u} />; })}</g>}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · clima, tala, incendio y sequía */}
      <Escena T={T} a={K.Cl} b={K.E}>
        <FondoLunares color={KC.orange} />
        {svg(<g transform="translate(0 40)">
          {[180, 380, 580, 780, 940].map((tx, i) => { const cort = i === 1 || i === 3, quem = i === 4;
            return <g key={i} transform={`translate(${tx} 1000)`}>
              {cort ? <><rect x={-22} y={-60} width={44} height={60} fill="#6b4a2e" stroke={KC.ink} strokeWidth={5} /><ellipse cx={0} cy={-60} rx={22} ry={8} fill="#d8b98a" stroke={KC.ink} strokeWidth={4} /></>
                : <><rect x={-16} y={-120} width={32} height={120} fill="#6b4a2e" stroke={KC.ink} strokeWidth={5} /><path d="M -110 -100 L 0 -360 L 110 -100 Z" fill={quem ? '#3b2b22' : '#2f6b3f'} stroke={KC.ink} strokeWidth={5} />
                  {quem && [0, 1, 2].map((k) => <path key={k} d={`M ${-40 + k * 40} -100 q 20 -50 0 -90 q -20 -40 10 -80`} stroke={KC.red} strokeWidth={10} fill="none" opacity={0.6 + 0.4 * Math.sin(T * 8 + k)} />)}</>}
            </g>; })}
          <g transform="translate(860 520)"><rect x={-24} y={-150} width={48} height={260} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle cy={130} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-10} y={-120 + 160 * (1 - kprog(T, K.Cl + 0.2, K.Cl + 1.6))} width={20} height={250 - 160 * (1 - kprog(T, K.Cl + 0.2, K.Cl + 1.6))} fill={KC.red} /></g>
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · el estudio */}
      <Escena T={T} a={K.E} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {svg(<Oyamel x={260} y={760} s={0.7} T={T} lleno={1} />)}
      </Escena>
      {/* 10 · la meta: seis hectáreas */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 11 · cierre: 25 canchas de 1996-1997, solo 4 llenas hoy */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(Array.from({ length: 25 }, (_, i) => <Cancha key={i} x={200 + (i % 5) * (CW2 + 6)} y={745 + Math.floor(i / 5) * (CH2 + 8)} w={CW2} T={T} seed={i + 2}
          lleno={i < 4 ? (i < 3 ? 1 : 0.1) : 0} contorno={i >= 4 && T < K.C + 0.8 + i * 0.06} />))}
        <EscalaFija texto="50 m" largo={CW2 * 50 / 105} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.4} until={K.V - 0.2} texto="≈ 4 canchas de fútbol" y={430} x={360} tam={40} borde={KC.orange} />
      <Etq T={T} at={K.G + 2.4} until={K.V - 0.2} x={420} y={1440} texto="cancha FIFA: 105 × 68 m" tam={26} color={KC.ink} />
      <Chip T={T} at={K.V + 0.4} until={K.R - 0.2} texto="del sur de Canadá y EE. UU." y={420} x={620} tam={32} borde={KC.orange} />
      <Etq T={T} at={K.V + 3.6} until={K.R - 0.2} x={mx + 40 + 40} y={my * 1 + 520 - 2} texto="Michoacán y Edomex" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 0.4} until={K.Ci - 0.2} x={380} y={1440} texto="Danaus plexippus en un oyamel" it tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.R + 1.2} until={K.Ci - 0.2} valor={20} dur={1.0} prefijo="≈ " sufijo=" millones" etiqueta="por hectárea" y={430} x={640} tam={80} color={KC.orange} />
      <NumeroGigante T={T} at={K.Ci + 0.2} until={K.A - 0.2} valor={2.93} dec={2} dur={1.0} sufijo=" ha" etiqueta="invierno 2025-2026" y={640} tam={200} color={KC.orange} />
      <Chip T={T} at={K.Ci + 2.2} until={K.A - 0.2} texto="+64 % (antes: 1.79 ha)" y={900} tam={44} borde={KC.leaf} />
      <Comparativa T={T} at={K.A + 0.1} until={K.P - 0.1} max={18.19} y={420} alto={600}
        izq={{ valor: 18.19, texto: '18.19 ha', etiqueta: '1996-1997', color: KC.orange }} der={{ valor: 2.93, texto: '2.93 ha', etiqueta: '2025-2026', color: KC.yellow }} />
      <Etq T={T} at={K.Al + 0.6} until={K.Cl - 0.2} x={560} y={760} texto="algodoncillo (Asclepias)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Al + 2.2} until={K.Cl - 0.2} texto="herbicidas en sus zonas de cría" y={430} x={560} tam={32} borde={KC.red} />
      <NumeroGigante T={T} at={K.Cl + 2.2} until={K.E - 0.2} valor={2.55} dec={2} dur={1.0} sufijo=" ha" etiqueta="bosque dañado (feb 2024–feb 2025)" y={560} x={460} tam={150} color={KC.red} />
      <Chip T={T} at={K.Cl + 3.6} until={K.E - 0.2} texto="tala · incendio · sequía" y={1440} tam={40} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="2004" quien="CONANP + WWF" revista="monitoreo cada invierno, colonia por colonia" x={660} y={640} />
      <Medidor T={T} at={K.M + 0.3} until={K.C - 0.2} valor={(t) => klerp(0, 2.93 / 6, kprog(t, K.M + 0.4, K.M + 1.6, kEase.sale))} etiqueta="hoy: 2.93 ha" texto={() => 'meta ≈ 6 ha'} y={760} color={KC.orange} />
      <Chip T={T} at={K.M + 2.0} until={K.C - 0.2} texto="el doble de hoy" y={960} tam={44} borde={KC.orange} />
      <Chip T={T} at={K.C + 0.3} until={K.Ou - 0.1} texto="1996-97: ≈ 25 canchas · hoy: ≈ 4" y={440} x={440} tam={28} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="Todas caben en *4 canchas de fútbol.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.R - 0.1} texto="De Canadá y EE. UU. *a Michoacán y Edomex.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Ci - 0.1} texto="Por hectárea: *unos 20 millones.*" />
      <Subtitulo T={T} idx={3} at={K.Ci + 0.1} until={K.A - 0.1} texto="2.93 hectáreas: *64 % más.*" />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="En 1996: *más de 18.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.05} until={K.Al - 0.1} texto="¿Qué *les pasó?*" />
      <Subtitulo T={T} idx={6} at={K.Al + 0.1} until={K.Cl - 0.1} texto="Sus orugas comen *algodoncillo.*" />
      <Subtitulo T={T} idx={7} at={K.Cl + 0.1} until={K.E - 0.1} texto="Tala, incendio, sequía: *2.55 hectáreas.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.M - 0.1} texto="Lo miden *cada invierno desde 2004.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.C - 0.1} texto="La meta: *unas 6 hectáreas.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Hoy 4 canchas; *en 1996, 25.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Racimos + 0.4, CUES.Cifra - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Antes + 1.2, CUES.Pregunta - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Algodoncillo + 1.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Clima + 0.3, CUES.Clima + 2.1, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Estudio + 0.4, CUES.Meta - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Meta + 1.4, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MonarcaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MonarcaShot /></CompositionStage></div>;
}
window.MonarcaApp = MonarcaApp;
