// Biotecnológico #02 · Las vacas viven de microbios — versión NARRADA (N1 "Por dentro").
// Viaje: vaca en el pasto (macro) → rayos X del estómago → rumen al microscopio → la misma vaca, ya por dentro.

// Cadena de celulosa: glucosas unidas (para la Lupa sobre la hoja de pasto).
function Celulosa({ T, r }) {
  const D = r * 2;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#10301a" />
    {[0, 1, 2].map((f) => <g key={f} transform={`translate(${-60 + ((T * 30) % 104)} ${r - 110 + f * 110})`}>
      {Array.from({ length: 9 }, (_, i) => <Molecula key={i} x={i * 104} y={0} s={0.8} rot={i % 2 ? 180 : 0} color={i % 2 ? '#b8e986' : '#9ccf5a'} />)}
      {Array.from({ length: 9 }, (_, i) => <line key={'l' + i} x1={i * 104 + 26} y1={0} x2={i * 104 + 78} y2={0} stroke="#16120f" strokeWidth={6} />)}
    </g>)}
  </svg>;
}
// Pared del rumen con papilas: los ácidos entran y se van por la sangre.
function Pared({ T, a, agv }) {
  const g = krng(5), mol = Array.from({ length: 14 }, () => [g(), g(), Math.floor(g() * 3)]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={1010} width={KW} height={400} fill="#c96a6a" />
    {Array.from({ length: 9 }, (_, i) => { const x = 60 + i * 120, h = 220 + (i % 3) * 30 + mece(T, i, 0.3) * 10;
      return <path key={i} d={`M ${x - 40} 1020 C ${x - 44} ${1020 - h}, ${x + 44} ${1020 - h}, ${x + 40} 1020 Z`} fill="#e39a9a" stroke={KC.ink} strokeWidth={6} />; })}
    <path d="M 0 1010 L 1080 1010" stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={1180} width={KW} height={70} fill="#e23b3b" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => <ellipse key={'g' + i} cx={((T * 160 + i * 140) % 1200) - 60} cy={1215} rx={26} ry={16} fill="#ff8a8a" stroke={KC.ink} strokeWidth={4} />)}
    {mol.map(([x0, f0, tipo], i) => { const vis = kclamp(agv * 14 - i, 0, 1); if (vis <= 0) return null;
      const f = ((T - a) * 0.22 + f0) % 1, x = 60 + Math.round(x0 * 8) * 120;
      const y = f < 0.7 ? klerp(560, 1180, f / 0.7) : 1215, xx = f < 0.7 ? x : x + (f - 0.7) * 900;
      return <AGV key={i} x={xx} y={y} tipo={tipo} s={0.95} rot={T * 40 + i * 30} />; })}
  </svg>;
}
// Microbios que bajan por el intestino y se vuelven aminoácidos.
function Intestino({ T, a }) {
  const g = krng(9), mic = Array.from({ length: 12 }, () => [g(), g()]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <path d="M -40 600 C 300 560, 400 900, 700 860 S 1000 1000, 1120 1050" stroke="#e39a9a" strokeWidth={250} fill="none" strokeLinecap="round" />
    <path d="M -40 600 C 300 560, 400 900, 700 860 S 1000 1000, 1120 1050" stroke="#3b1d24" strokeWidth={200} fill="none" strokeLinecap="round" />
    {mic.map(([f0, k], i) => { const f = ((T - a) * 0.12 + f0) % 1, x = -40 + f * 1160, y = 600 + Math.sin(f * 3.2) * 150 + f * 300 + (k - 0.5) * 80;
      const dig = kprog(f, 0.45, 0.75);
      return dig < 1 ? <g key={i} opacity={1 - dig}><Bacteria T={T} x={x} y={y} largo={80} ancho={34} rot={f * 200 + i * 30} color={KC.mint} seed={i} flagelo={false} nucleoide={false} /></g>
        : <g key={i}>{Array.from({ length: 5 }, (_, j) => <circle key={j} cx={x + j * 16 - 32} cy={y + Math.sin(j + T * 3) * 6} r={9} fill={['#ff6b5a', KC.yellow, KC.cyan, KC.lilac, KC.mint][j]} stroke={KC.ink} strokeWidth={3} />)}</g>; })}
  </svg>;
}

function VacasNarrado() {
  const { T, CUES: C } = useComposition();
  const FIN = C.Outro + 4;
  const masca = T * 2 * Math.PI;                                    // ~1 masticada por segundo
  const vacaGancho = (extra = {}) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Vaca T={T} x={500} y={880} s={0.9} mastica={masca} {...extra} /></svg>;
  // bocado del gancho: la cabeza baja y sube con pasto en la boca antes del segundo 1
  const baja = kprog(T, C.Gancho, C.Gancho + 0.35, kEase.sale) * (1 - kprog(T, C.Gancho + 0.6, C.Gancho + 1.1, kEase.suave));
  const microF = (t) => kprog(t, C.Micro + 0.2, C.Micro + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* GANCHO: la vaca come pasto (macro) */}
      <Escena T={T} a={C.Gancho} b={C.Enzimas} zoom={0.04}>
        <Pastizal T={T} horizonte={1100} />
        {vacaGancho({ cabezaAbajo: baja })}
        {T > C.Gancho + 0.5 && T < C.Gancho + 2.4 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><g transform={`translate(${885 - kprog(T, C.Gancho + 0.5, C.Gancho + 2.4) * 20} ${835 + Math.sin(T * 12) * 3})`}>{[-20, 0, 20].map((d) => <path key={d} d={`M ${d} 0 l ${d * 0.6} -50`} stroke={PASTO2} strokeWidth={8} strokeLinecap="round" />)}</g></svg>}
      </Escena>

      {/* ENZIMAS: la hoja de pasto por dentro (celulosa) */}
      <Escena T={T} a={C.Enzimas} b={C.Rumen}>
        <FondoMarca T={T} color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <path d={`M 540 1500 C ${520 + mece(T, 1, 0.2) * 20} 1100, 580 900, ${600 + mece(T, 2, 0.2) * 30} 640`} stroke={KC.ink} strokeWidth={70} fill="none" strokeLinecap="round" />
          <path d={`M 540 1500 C ${520 + mece(T, 1, 0.2) * 20} 1100, 580 900, ${600 + mece(T, 2, 0.2) * 30} 640`} stroke={PASTO} strokeWidth={56} fill="none" strokeLinecap="round" />
        </svg>
        <Lupa T={T} at={C.Enzimas + 0.2} until={C.Rumen - 0.3} x={540} y={720} r={250} fx={575} fy={1000} interior={(t, r) => <Celulosa T={t} r={r} />} etiqueta="RAYOS X · hoja de pasto" tinte={KC.yellow} />
        <Etq T={T} at={C.Enzimas + 0.8} until={C.Rumen - 0.3} x={800} y={600} texto="celulosa" color={KC.yellow} />
        <MitoTachado T={T} at={C.Enzimas + 2.0} tacharEn={C.Enzimas + 2.6} until={C.Rumen - 0.3} texto="enzimas de vaca" y={1110} />
      </Escena>

      {/* RUMEN: rayos X del estómago */}
      <Escena T={T} a={C.Rumen} b={C.Micro} zoom={0.03}>
        <Pastizal T={T} horizonte={1100} />
        {vacaGancho({ brillo: kprog(T, C.Rumen + 0.2, C.Rumen + 0.8) })}
        <Lupa T={T} at={C.Rumen + 0.15} until={C.Micro - 0.2} x={560} y={450} r={220} fx={446} fy={889} interior={(t, r) => <Estomago T={t} r={r} />} etiqueta="RAYOS X · estómago" />
        <Etq T={T} at={C.Rumen + 0.8} until={C.Micro - 0.2} x={330} y={380} texto="rumen" lado="izq" color={KC.yellow} />
        <Chip T={T} at={C.Rumen + 1.8} until={C.Micro - 0.2} texto="tibio · sin oxígeno" x={330} y={1490} borde={KC.cyan} tam={38} />
      </Escena>

      {/* MICRO + PREGUNTA: adentro del rumen */}
      <Escena T={T} a={C.Micro} b={C.Acidos} zoom={0.06} origen="50% 55%">
        <MundoRumen T={T} microbios={microF(T)} romper={kprog(T, C.Micro + 5.2, C.Micro + 7.8, kEase.suave)} agv={kprog(T, C.Micro + 6.5, C.Pregunta + 1.4)} />
        <Escala T={T} z={1} pxPorMm={35000} y={1440} />
        <Etq T={T} at={C.Micro + 0.8} until={C.Micro + 5.0} x={110} y={470} texto="bacterias" color={KC.mint} />
        <Etq T={T} at={C.Micro + 1.4} until={C.Micro + 5.0} x={600} y={660} texto="hongos" color={KC.gold2} />
        <Etq T={T} at={C.Micro + 2.0} until={C.Micro + 5.0} x={760} y={440} texto="protozoarios" color={KC.lilac} lado="izq" />
        <Etq T={T} at={C.Micro + 2.6} until={C.Micro + 5.0} x={300} y={600} texto="arqueas" color="#c9a6ff" />
        <Chip T={T} at={C.Micro + 3.2} until={C.Micro + 5.2} texto="miles de millones por mililitro" y={1120} borde={KC.mint} tam={36} />
        <Etq T={T} at={C.Micro + 6.8} until={C.Acidos - 0.2} x={160} y={1320} texto="ácidos grasos volátiles" color={KC.yellow} tam={30} />
        <Chip T={T} at={C.Pregunta + 0.05} until={C.Acidos - 0.2} texto="¿y la vaca?" y={420} borde={KC.coral} tam={48} />
      </Escena>

      {/* ÁCIDOS: la pared del rumen los absorbe */}
      <Escena T={T} a={C.Acidos} b={C.Proteina} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 35%, #3b1d24 0%, #1a0d12 75%)' }}></div>
        <Pared T={T} a={C.Acidos} agv={kprog(T, C.Acidos + 0.2, C.Acidos + 2.5)} />
        <Etq T={T} at={C.Acidos + 1.0} until={C.Proteina - 0.2} x={180} y={880} texto="pared del rumen" color={KC.texto} />
        <Etq T={T} at={C.Acidos + 1.8} until={C.Proteina - 0.2} x={640} y={1300} texto="sangre" color={KC.coral} />
        <Medidor T={T} at={C.Acidos + 2.4} until={C.Proteina - 0.2} etiqueta="ENERGÍA DE LA VACA" valor={(t) => 0.7 * kprog(t, C.Acidos + 2.6, C.Acidos + 4.6, kEase.sale)} texto={(v) => Math.round(v * 100) + ' %'} y={430} color={KC.yellow} />
      </Escena>

      {/* PROTEÍNA: los microbios bajan al intestino y se digieren */}
      <Escena T={T} a={C.Proteina} b={C.Estudio}>
        <FondoMarca T={T} color={KC.coral} patron="rayas" />
        <Intestino T={T} a={C.Proteina} />
        <Etq T={T} at={C.Proteina + 0.6} until={C.Estudio - 0.2} x={140} y={440} texto="intestino" color={KC.ink} />
        <Chip T={T} at={C.Proteina + 2.4} until={C.Estudio - 0.2} texto="microbios = su proteína" y={1110} borde={KC.ink} tam={40} />
      </Escena>

      {/* ESTUDIO: Bergman 1990, y tú contra la vaca */}
      <Escena T={T} a={C.Estudio} b={C.Metano}>
        <FondoMarca T={T} color={KC.yellow} />
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 2.8} anio="1990" quien="Edward N. Bergman" revista="Physiological Reviews 70: 567–590" y={700} />
        <Comparativa T={T} at={C.Estudio + 3.0} until={C.Metano - 0.2} y={480} alto={520} max={80} izq={{ valor: 70, texto: '70 %', etiqueta: 'vaca', color: KC.mint }} der={{ valor: 10, texto: '~10 %', etiqueta: 'tú', color: KC.coral }} />
        <Chip T={T} at={C.Estudio + 3.2} until={C.Metano - 0.2} texto="energía que viene de microbios" y={420} tam={36} borde={KC.ink} />
      </Escena>

      {/* METANO: el eructo */}
      <Escena T={T} a={C.Metano} b={C.Biorreactor} zoom={0.04}>
        <Pastizal T={T} horizonte={1100} />
        {vacaGancho({ eructo: kprog(T, C.Metano + 1.6, C.Metano + 3.6) })}
        <Chip T={T} at={C.Metano + 0.5} until={C.Biorreactor - 0.2} texto="arqueas → metano" y={430} borde="#8b4dff" tam={40} />
        <MitoTachado T={T} at={C.Metano + 2.6} tacharEn={C.Metano + 3.3} until={C.Biorreactor - 0.2} texto="pedos" x={300} y={1500} />
      </Escena>

      {/* BIORREACTOR CON PATAS */}
      <Escena T={T} a={C.Biorreactor} b={C.Cierre}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Vaca T={T} x={500} y={820} s={0.9} mastica={masca} brillo={0.6} />
          <ellipse cx={445} cy={830} rx={260} ry={150} fill="none" stroke={KC.ink} strokeWidth={7} strokeDasharray="22 14" strokeDashoffset={-T * 40} />
          <FlechaCurva T={T} x1={1000} y1={520} x2={850} y2={740} p={kprog(T, C.Biorreactor + 0.4, C.Biorreactor + 1.0)} color={PASTO} curva={-60} />
        </svg>
        <Etq T={T} at={C.Biorreactor + 0.6} until={C.Cierre - 0.2} x={1000} y={480} texto="medio de cultivo" lado="izq" color={KC.ink} />
        <Etq T={T} at={C.Biorreactor + 3.2} until={C.Cierre - 0.2} x={330} y={830} texto="fábrica: microbios" color={KC.texto} />
        <Chip T={T} at={C.Biorreactor + 0.2} until={C.Cierre - 0.2} texto="BIORREACTOR CON PATAS" y={420} tam={46} borde={KC.ink} />
      </Escena>

      {/* CIERRE: la misma vaca del inicio, ya por dentro */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <Pastizal T={T} horizonte={1100} />
        {vacaGancho({ brillo: 0.7 + 0.3 * Math.sin(T * 3) })}
        <Lupa T={T} at={C.Cierre + 0.1} x={720} y={440} r={180} fx={446} fy={889} interior={(t, r) => <Estomago T={t} r={r} />} etiqueta="sus microbios" tinte={KC.mint} />
      </Escena>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Enzimas - 0.1} texto="No se alimenta de pasto: *de los microbios de su panza.*" />
      <Subtitulo T={T} idx={1} at={C.Enzimas + 0.1} until={C.Rumen - 0.1} texto="No puede digerir *la celulosa.*" />
      <Subtitulo T={T} idx={2} at={C.Rumen + 0.1} until={C.Micro - 0.1} texto="El rumen: *un tanque tibio y sin oxígeno.*" />
      <Subtitulo T={T} idx={3} at={C.Micro + 0.1} until={C.Micro + 5.0} texto="Bacterias, hongos, protozoarios *y arqueas.*" />
      <Subtitulo T={T} idx={4} at={C.Micro + 5.1} until={C.Pregunta - 0.1} texto="Rompen la fibra *y fermentan la celulosa.*" />
      <Subtitulo T={T} idx={5} at={C.Pregunta + 0.05} until={C.Acidos - 0.1} texto="¿Y la vaca *qué gana?*" />
      <Subtitulo T={T} idx={6} at={C.Acidos + 0.1} until={C.Proteina - 0.1} texto="Ácidos que le dan *~70 % de su energía.*" />
      <Subtitulo T={T} idx={7} at={C.Proteina + 0.1} until={C.Estudio - 0.1} texto="Se digiere a los microbios: *su principal proteína.*" />
      <Subtitulo T={T} idx={8} at={C.Estudio + 0.1} until={C.Metano - 0.1} texto="Vacas y borregos: 70 %. *Tú: cerca de 10.*" />
      <Subtitulo T={T} idx={9} at={C.Metano + 0.1} until={C.Biorreactor - 0.1} texto="Metano: casi todo *sale en eructos.*" />
      <Subtitulo T={T} idx={10} at={C.Biorreactor + 0.1} until={C.Cierre - 0.1} texto="El pasto es el medio; *los microbios, la fábrica.*" />
      <Subtitulo T={T} idx={11} at={C.Cierre + 0.1} until={C.Outro - 0.1} texto="Come pasto… *pero vive de sus microbios.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.6, 'avatar_11_sorprendido', 'gancho'],
        [C.Rumen + 0.4, C.Micro - 0.3, 'avatar_13_senalando_arriba', 'abajo-der'],
        [C.Pregunta, C.Acidos + 1.8, 'avatar_07_pensativo_puno', 'arriba-der'],
        [C.Proteina + 0.5, C.Proteina + 3.5, 'avatar_05_sonriendo_dientes_uniformes', 'abajo-der'],
        [C.Estudio + 3.2, C.Metano - 0.3, 'avatar_04_bajando_lentes', 'abajo-izq'],
        [C.Metano + 1.4, C.Biorreactor - 0.2, 'avatar_11_sorprendido', 'presentador'],
        [C.Biorreactor + 3.0, C.Cierre - 0.3, 'avatar_08_recostado_mano', 'abajo-der'],
        [C.Cierre + 0.2, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'abajo-izq'],
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="02" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VacasNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <VacasNarrado />
      </CompositionStage>
    </div>
  );
}
Object.assign(window, { Celulosa, Pared, Intestino });
window.VacasNarradoApp = VacasNarradoApp;
