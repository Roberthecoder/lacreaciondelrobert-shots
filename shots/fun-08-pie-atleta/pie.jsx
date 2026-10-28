// Shot Fungi Mati #08 · Pie de atleta (Trichophyton) — NARRADO (N1 "Por dentro" + N2 "qué sí sirve").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (no es un caso clínico real).
const PIEL = '#f2b48f', PIEL2 = '#d9906b';
const HUECO = { x: 525, y: 910 };   // el pie se dibuja corrido (-210, +150)   // entre el 4.º y el 5.º dedo

// Pie visto desde arriba. parche 0..1 = piel blanca que se pela entre el 4.º y 5.º dedo.
function Pie({ T, parche = 0, brilla = 0 }) {
  const dedos = [[370, 640, 78], [500, 610, 56], [600, 625, 50], [685, 655, 46], [775, 700, 40]];
  return fsvg(<><g transform="translate(-210 150)">
    <path d="M 290 760 Q 260 1100 330 1450 Q 380 1750 560 1760 Q 760 1760 800 1450 Q 850 1100 830 760 Q 700 690 540 700 Q 380 700 290 760 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    {dedos.map(([x, y, r], i) => <g key={i}>
      <ellipse cx={x} cy={y} rx={r} ry={r * 1.35} fill={PIEL} stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={x} cy={y - r * 0.6} rx={r * 0.55} ry={r * 0.5} fill="#ffe3d6" stroke={KC.ink} strokeWidth={4} />
    </g>)}
    </g>{parche > 0 && <g opacity={parche}>
      <path d={`M ${HUECO.x - 26} ${HUECO.y - 60} Q ${HUECO.x - 40} ${HUECO.y + 20} ${HUECO.x - 10} ${HUECO.y + 70} Q ${HUECO.x + 30} ${HUECO.y + 40} ${HUECO.x + 22} ${HUECO.y - 50} Z`} fill="#f7f4ee" stroke="#b9b1a6" strokeWidth={4} />
      {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${HUECO.x - 20 + k * 10} ${HUECO.y - 40 + k * 22} l 14 6`} stroke="#9c8f80" strokeWidth={3} />)}
      {[0, 1, 2].map((k) => { const u = ((T * 0.5 + k / 3) % 1); return <path key={'f' + k} d="M 0 0 l 16 -4 l 4 10 l -14 6 z" transform={`translate(${HUECO.x + 30 + u * 60} ${HUECO.y - 20 + k * 25 - u * 40}) rotate(${u * 90})`} fill="#fbfaf6" stroke="#b9b1a6" strokeWidth={2} opacity={1 - u} />; })}
    </g>}
    {brilla > 0 && <circle cx={HUECO.x} cy={HUECO.y} r={95 + 10 * Math.sin(T * 5)} fill="none" stroke={KC.yellow} strokeWidth={10} opacity={brilla} />}
  </>);
}
// Corte de la piel (microscopio): capa córnea (tejas de queratina) sobre la piel viva. hifas 0..1, digiere 0..1.
function Corte({ T, hifas = 0, digiere = 0 }) {
  const Y0 = 700, H = 120;
  const tejas = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) { const x = c * 130 - (r % 2) * 65 + 10, y = Y0 + r * (H / 5);
    const cerca = Math.abs(y - (Y0 + 50)) < 40 && x < 160 + hifas * 900;
    tejas.push(<rect key={r + '-' + c} x={x} y={y} width={122} height={H / 5 - 4} rx={8} fill="#f3d9a4" stroke="#a88b55" strokeWidth={3} opacity={1 - (cerca ? digiere * 0.75 : 0)} />); }
  return fsvg(<>
    <rect x={0} y={Y0 + H} width={KW} height={420} fill="#f2a8a0" />
    {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(i % 8) * 140 + 60 + (Math.floor(i / 8) % 2) * 70} cy={Y0 + H + 70 + Math.floor(i / 8) * 120} r={50} fill="#f7c0b6" stroke="#c97a70" strokeWidth={4} />)}
    {tejas}
    {[0, 1, 2, 3].map((k) => <Cordon key={k} x1={-20} y1={Y0 + 20 + k * 26} x2={1100} y2={Y0 + 30 + k * 22} p={kprog(hifas, k * 0.12, 0.6 + k * 0.12)} onda={10} ancho={6} color={KC.gold2} punta="#fff" />)}
    {digiere > 0 && Array.from({ length: 30 }, (_, i) => { const u = ((T * 0.7 + i / 30) % 1); return <circle key={'e' + i} cx={(i * 37) % 1000 + 40} cy={Y0 + 20 + (i % 5) * 22 + Math.sin(T * 3 + i) * 8} r={5} fill={KC.cyan} opacity={digiere * (1 - u)} />; })}
  </>);
}
// Zapato de perfil (corte) con su "clima" adentro.
function Zapato({ x, y, s = 1, calor = 0, T }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 60 L -260 -110 Q -240 -170 -150 -170 L -40 -170 Q 40 -90 180 -70 Q 290 -50 290 30 L 290 60 Z" fill={mixHex('#4a6fd8', '#d8584a', calor)} stroke={KC.ink} strokeWidth={8} />
    <rect x={-270} y={60} width={570} height={36} rx={12} fill="#2b2b2b" stroke={KC.ink} strokeWidth={6} />
    <path d="M -230 -100 Q -100 -60 120 -40" stroke="rgba(255,255,255,.4)" strokeWidth={10} fill="none" />
    {calor > 0.3 && [0, 1, 2].map((k) => <path key={k} d={`M ${-120 + k * 90} ${-190 - ((T * 40 + k * 20) % 60)} q 10 -15 0 -30 q -10 -15 0 -30`} stroke={KC.red} strokeWidth={6} fill="none" opacity={calor * 0.8} />)}
  </g>;
}

function PieDeAtleta() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Q: CUES.Queratina, En: CUES.Enzimas, L: CUES.Lugar, P: CUES.Pregunta, E: CUES.Estudio, Hu: CUES.Humedad, R: CUES.Resultado, Co: CUES.Contagio, S: CUES.Sirve, D: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const lupaInterior = (Tl, r) => <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#3a1f1a" />
    {Array.from({ length: 4 }, (_, k) => <rect key={k} x={0} y={60 + k * 34} width={r * 2} height={28} fill="#f3d9a4" opacity=".55" />)}
    <RedHifas T={Tl} x={r * 0.4} y={r} g={kprog(Tl, K.G + 2.6, K.G + 5)} seed={21} n={160} escala={0.16} ancho={3} color={KC.gold2} circ={true} />
  </svg>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: el pie con la piel blanca entre los dedos y la lupa de rayos X */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06} origen="48% 47%">
        <FondoLunares color={KC.pink} />
        <Pie T={T} parche={kprog(T, K.G + 0.2, K.G + 1.0)} />
      </Escena>
      <Lupa T={T} at={K.G + 2.4} until={K.Q - 0.4} x={800} y={940} r={140} fx={HUECO.x} fy={HUECO.y} interior={lupaInterior} tinte={KC.yellow} etiqueta="hongo en la piel" />
      {/* 3–4 · por dentro: la queratina y las enzimas */}
      <Escena T={T} a={K.Q} b={K.L}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Corte T={T} hifas={kprog(T, K.En - 0.4, K.L - 0.5, kEase.suave)} digiere={kprog(T, K.En + 0.8, K.L)} />
      </Escena>
      {/* 5 · su lugar favorito */}
      <Escena T={T} a={K.L} b={K.P} zoom={0.05} origen="48% 47%">
        <FondoLunares color={KC.pink} />
        <Pie T={T} parche={1} brilla={kprog(T, K.L + 0.4, K.L + 1.0)} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7–9 · el estudio: el clima dentro del zapato */}
      <Escena T={T} a={K.E} b={K.Co}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {T < K.R && <Zapato x={540} y={1000} s={1.25} calor={kprog(T, K.E + 2.6, K.Hu)} T={T} />}
          {T < K.R && kprog(T, K.E + 2.6, K.E + 3.0) > 0 && <g opacity={kprog(T, K.E + 2.6, K.E + 3.0)}>
            <rect x={360} y={850} width={110} height={70} rx={14} fill="#222" stroke={KC.ink} strokeWidth={5} />
            <text x={415} y={895} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.mint}>32°C</text>
          </g>}
          {T >= K.Hu && T < K.R && Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.6 + i / 10) % 1); return <path key={i} d="M 0 -14 Q 10 0 0 10 Q -10 0 0 -14 Z" transform={`translate(${380 + i * 34} ${960 - u * 120})`} fill={KC.cyan} stroke={KC.ink} strokeWidth={2} opacity={1 - u} />; })}
          {T >= K.R && <>
            <Zapato x={280} y={1040} s={0.8} calor={1} T={T} />
            <Zapato x={800} y={1040} s={0.8} calor={0} T={T} />
            {Array.from({ length: 7 }, (_, i) => kprog(T, K.R + 0.8 + i * 0.15, K.R + 1.0 + i * 0.15) > 0 ? <g key={i} transform={`translate(${170 + (i % 4) * 70} ${820 - Math.floor(i / 4) * 60})`}><RedHifas T={T} x={0} y={0} g={1} seed={i + 3} n={30} escala={0.07} ancho={3} color={KC.gold} circ={true} /></g> : null)}
            {Array.from({ length: 2 }, (_, i) => kprog(T, K.R + 1.6 + i * 0.2, K.R + 1.8 + i * 0.2) > 0 ? <g key={'b' + i} transform={`translate(${760 + i * 80} ${820})`}><RedHifas T={T} x={0} y={0} g={1} seed={i + 13} n={30} escala={0.07} ancho={3} color={KC.gold} circ={true} /></g> : null)}
          </>}
        </>)}
      </Escena>
      {/* 10 · contagio: regadera, alberca, vestidor, casa */}
      <Escena T={T} a={K.Co} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {[['🚿', 'regaderas'], ['🏊', 'albercas'], ['🩴', 'vestidores'], ['🏠', 'en casa']].map(([e, t], i) => { const on = kprog(T, K.Co + 0.2 + i * 0.5, K.Co + 0.6 + i * 0.5, kEase.rebote); const x = 270 + (i % 2) * 540, y = 770 + Math.floor(i / 2) * 250;
            return on > 0 ? <g key={i} transform={`translate(${x} ${y}) scale(${on})`}>
              <circle r={105} fill="#fff" stroke={KC.ink} strokeWidth={7} />
              <text y={40} textAnchor="middle" style={{ font:`110px sans-serif` }}>{e}</text>
              <text y={145} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>{t}</text>
            </g> : null; })}
        </>)}
      </Escena>
      {/* 11 · lo que sí sirve */}
      <Escena T={T} a={K.S} b={K.D}>
        <FondoLunares color={KC.mint} />
        <Pie T={T} parche={1} />
        {fsvg(<g transform={`translate(${klerp(1100, HUECO.x + 30, kprog(T, K.S + 0.2, K.S + 1.0, kEase.sale)) + Math.sin(T * 10) * 18 * kprog(T, K.S + 1, K.S + 1.2)} ${HUECO.y - 40})`}>
          <rect x={0} y={-60} width={300} height={120} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={7} />
          {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={20 + k * 60} y1={-50} x2={20 + k * 60} y2={50} stroke={KC.cyan} strokeWidth={8} />)}
        </g>)}
      </Escena>
      {/* 12 · casi la mitad de los pacientes de esa clínica */}
      <Escena T={T} a={K.D} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Cuadricula T={T} cols={10} filas={10} x={60} y={700} ancho={480} alto={400} llenado={(t) => 0.492 * kprog(t, K.D + 1.0, K.D + 3.0)} lleno={KC.gold2} vacio="rgba(255,255,255,.15)" />
      </Escena>
      {/* 13 · cierre: el mismo pie del inicio y el hongo "cenando" en la lupa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="48% 47%">
        <FondoLunares color={KC.pink} />
        <Pie T={T} parche={1} brilla={kprog(T, K.C + 0.4, K.C + 1.0)} />
      </Escena>
      <Lupa T={T} at={K.C + 1.0} until={K.Ou - 0.2} x={800} y={940} r={140} fx={HUECO.x} fy={HUECO.y} interior={(Tl, r) => lupaInterior(Tl + 100, r)} tinte={KC.yellow} etiqueta="queratina = su cena" />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.2} until={K.G + 4.6} texto="¿solo humedad?" x={330} y={420} />
      <Etq T={T} at={K.N + 0.4} until={K.Q - 0.3} x={60} y={470} texto="pie de atleta (tinea pedis)" tam={34} color={KC.ink} />
      <Etq T={T} at={K.N + 1.2} until={K.Q - 0.3} x={60} y={530} texto="Trichophyton rubrum" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.N + 1.8} until={K.Q - 0.3} x={60} y={580} texto="Trichophyton interdigitale" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.Q + 0.6} until={K.L - 0.3} x={60} y={620} texto="capa córnea: queratina" tam={34} color={KC.yellow} />
      <Etq T={T} at={K.Q + 1.2} until={K.L - 0.3} x={60} y={1100} texto="piel viva" tam={30} />
      <Etq T={T} at={K.En + 0.4} until={K.L - 0.3} x={60} y={560} texto="hifas del hongo + enzimas" tam={32} color={KC.gold2} />
      <Chip T={T} at={K.L + 0.4} until={K.P - 0.2} texto="entre el 4.º y el 5.º dedo" x={400} y={480} tam={38} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.5} anio="2019" quien="Sasagawa · Osaka, Japón" revista="J. Dermatol. · datos 2011–2014" y={560} />
      <NumeroGigante T={T} at={K.E + 2.6} until={K.Hu - 0.3} valor={420} dur={1.2} etiqueta="pacientes" x={360} y={520} tam={150} />
      <Medidor T={T} at={K.Hu + 0.2} until={K.R - 0.3} valor={(t) => 0.8 * kprog(t, K.Hu + 0.4, K.Hu + 2.0)} etiqueta="humedad entre los dedos" x={90} y={460} ancho={560} color={KC.cyan} />
      <Etq T={T} at={K.Hu + 1.0} until={K.R - 0.3} x={60} y={600} texto="verano · 10 hombres" tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 0.4} until={K.Co - 0.3} texto="caliente y húmedo" x={280} y={1170} tam={32} borde={KC.red} />
      <Chip T={T} at={K.R + 0.4} until={K.Co - 0.3} texto="fresco y seco" x={800} y={1170} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.R + 1.4} until={K.Co - 0.3} texto="más pie de atleta" x={330} y={560} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Co + 2.4} until={K.S - 0.2} texto="esporas y pedacitos de piel" x={540} y={560} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.3} until={K.D - 0.3} texto="prevenir: ✓ seca entre los dedos" x={360} y={470} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.8} until={K.D - 0.3} texto="✓ calzado que respire" x={360} y={560} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.8} until={K.D - 0.3} texto="¿ya lo tienes? antimicótico; si no mejora, al médico" x={420} y={1120} tam={28} borde={KC.orange} />
      <NumeroGigante T={T} at={K.D + 0.3} until={K.C - 0.3} valor={49} dur={1.4} sufijo="%" etiqueta="pacientes de esa clínica" x={330} y={500} tam={160} />
      <Etq T={T} at={K.D + 2.4} until={K.C - 0.3} x={60} y={1140} texto="con hongos en pies o uñas" tam={30} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="¿un hongo cenando?" x={340} y={480} tam={42} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Q} texto="2 cm" largo={180} />
      <BarraEscala T={T} at={K.Q} until={K.L} texto="50 µm" largo={100} />
      <BarraEscala T={T} at={K.L} until={K.P} texto="2 cm" largo={180} />
      <BarraEscala T={T} at={K.S} until={K.D} texto="2 cm" largo={180} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={180} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Puede ser un hongo *comiendo queratina.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Q - 0.1} texto="Pie de atleta: *sobre todo Trichophyton.*" />
      <Subtitulo T={T} idx={2} at={K.Q + 0.1} until={K.En - 0.1} texto="Tu piel de afuera: *queratina.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.L - 0.1} texto="La digiere *con enzimas.*" />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.P - 0.1} texto="Entre el *4.º y el 5.º dedo.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por qué *justo ahí?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.Hu - 0.1} texto="2019, Japón: *el clima del zapato.*" />
      <Subtitulo T={T} idx={7} at={K.Hu + 0.1} until={K.R - 0.1} texto="Entre los dedos: *80 % de humedad.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Co - 0.1} texto="Más calor y humedad: *más hongo.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.S - 0.1} texto="Se pega *en lugares húmedos.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.D - 0.1} texto="Para prevenirlo: *sécate entre los dedos.*" />
      <Subtitulo T={T} idx={11} at={K.D + 0.1} until={K.C - 0.1} texto="Casi la mitad *de esos pacientes.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Puede ser un hongo *cenando entre tus dedos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 2.4, K.Q + 0.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.En + 0.6, K.L - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Hu + 0.6, K.R + 2.6, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [K.Co + 0.3, K.S - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S + 0.6, K.D - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.D + 0.6, K.C - 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PieApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PieDeAtleta /></CompositionStage></div>;
}
window.PieApp = PieApp;
