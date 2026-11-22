// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Ambiental #08 · Las vaquitas que quedan se cuentan con los dedos (crucero 2025) — NARRADO (N2 el número + N1 por dentro).
// Datos: "Informe del Crucero de Observación Vaquita Marina 2025" (IUCN-CSG, feb 2026); NOAA Fisheries (especie vaquita);
// NOAA SWFSC, "Abundance and Trends" (567 en 1997, 59 en 2015). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// Vaquita de perfil (gris, con anillos oscuros en los ojos y la boca). aleta: 'normal' o 'doblada' (Frida). s=1 → 300 px ≈ 1.5 m.
function Vaquita({ x, y, s = 1, T = 0, flip = false, aleta = 'normal', fase = 0 }) {
  const ond = Math.sin(T * 4 + fase) * 6;
  return <g transform={`translate(${x} ${y + ond}) scale(${flip ? -s : s} ${s})`}>
    <path d="M -150 0 Q -120 -48 -20 -50 Q 100 -50 150 -8 Q 120 20 40 30 Q -60 40 -150 0 Z" fill="#8f9aa6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -110 10 Q -40 34 60 24" fill="none" stroke="#c9d1da" strokeWidth={10} strokeLinecap="round" />
    {aleta === 'doblada'
      ? <path d="M -20 -48 Q 10 -100 40 -92 Q 20 -84 22 -50 Z" fill="#6c7782" stroke={KC.ink} strokeWidth={5} />
      : <path d="M -20 -48 L 10 -98 L 30 -50 Z" fill="#6c7782" stroke={KC.ink} strokeWidth={5} />}
    <path d={`M -150 0 L -205 ${-30 + ond * 0.6} L -195 0 L -205 ${30 + ond * 0.6} Z`} fill="#6c7782" stroke={KC.ink} strokeWidth={5} />
    <path d="M 40 20 Q 60 50 30 60 Q 10 40 20 22 Z" fill="#6c7782" stroke={KC.ink} strokeWidth={4} />
    <circle cx={104} cy={-18} r={16} fill={KC.ink} /><circle cx={108} cy={-21} r={4} fill="#fff" />
    <path d="M 128 4 Q 140 8 148 -4" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Totoaba (pez grande) de perfil. vejiga: muestra la vejiga natatoria.
function Totoaba({ x, y, s = 1, T = 0, vejiga = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 3) * 5}) scale(${s})`}>
    <path d="M -170 0 Q -100 -60 40 -55 Q 140 -40 170 0 Q 140 40 40 50 Q -100 55 -170 0 Z" fill="#b9b49a" stroke={KC.ink} strokeWidth={6} />
    <path d={`M -170 0 L -230 -45 L -215 0 L -230 45 Z`} fill="#9d977a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -55 L 0 -90 L 60 -52 Z" fill="#9d977a" stroke={KC.ink} strokeWidth={5} />
    <circle cx={120} cy={-12} r={12} fill={KC.ink} />
    {vejiga > 0 && <ellipse cx={-10} cy={0} rx={90 * vejiga} ry={22 * vejiga} fill="#f5e6b8" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Mano abierta con dedos que se encienden (cuenta). n = dedos encendidos (0..5), tenue = dedos posibles (dashed).
function Mano({ x, y, n = 0, posibles = 0, espejo = false, s = 1 }) {
  const dedos = [[-70, -150, -14], [-30, -190, -5], [10, -200, 0], [50, -185, 6], [100, -60, 40]];
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`}>
    <rect x={-95} y={-80} width={185} height={170} rx={60} fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    {dedos.map(([dx, dy, rot], i) => { const on = i < n, pos = !on && i < n + posibles;
      return <g key={i} transform={`translate(${dx} ${dy}) rotate(${rot})`}>
        <rect x={-18} y={-10} width={36} height={i === 4 ? 100 : 150} rx={18} fill={on ? KC.yellow : '#f1b48f'} stroke={pos ? KC.ink : KC.ink} strokeWidth={pos ? 5 : 7} strokeDasharray={pos ? '10 8' : 'none'} />
        {on && <circle cx={0} cy={10} r={9} fill={KC.ink} />}
      </g>; })}
  </g>;
}
// Bloque de concreto con ganchos en el fondo del mar.
function Bloque({ x, y, T, red = false }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-50} width={140} height={60} rx={6} fill="#a8a8a8" stroke={KC.ink} strokeWidth={6} />
    {[-40, 0, 40].map((gx) => <path key={gx} d={`M ${gx} -50 L ${gx} -90 Q ${gx + 16} -100 ${gx + 18} -82`} stroke={KC.ink} strokeWidth={6} fill="none" />)}
    {red && <path d={`M -120 -150 Q -40 ${-90 + Math.sin(T * 2) * 6} 0 -88 Q 60 -80 140 -140`} stroke="#e6e0c8" strokeWidth={4} fill="none" strokeDasharray="6 6" />}
  </g>;
}

function VaquitaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Quien, P: CUES.Pregunta, To: CUES.Totoaba, V: CUES.Vejiga, Ca: CUES.Caida, E: CUES.Estudio, Cr: CUES.Crias, B: CUES.Bloques, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const mar = (oscuro = 0) => <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex('#38c6e8', '#0b2a4a', 0.95 + 0.05 * oscuro)}, ${mixHex('#127ea8', '#061a30', 0.8 + 0.2 * oscuro)})` }} />;
  // gancho: los dedos se encienden uno por uno hasta 7; luego 3 más punteados (hasta 10)
  const cuenta = Math.floor(kprog(T, K.G + 0.2, K.G + 3.2) * 7 + 0.001);
  const manos = (n, extra) => <><Mano x={290} y={1010} s={2.1} n={Math.min(5, n)} posibles={n >= 5 ? 0 : 0} espejo />
    <Mano x={790} y={1010} s={2.1} n={Math.max(0, n - 5)} posibles={extra} /></>;
  const vx = klerp(-260, 1340, kprog(T, K.G - 0.3, K.G + 5.5));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: cuéntalas con los dedos */}
      <Escena T={T} a={K.G} b={K.Q}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{manos(cuenta, cuenta >= 7 ? 3 : 0)}<Vaquita x={vx} y={1400} s={1.0} T={T} flip /></>)}
      </Escena>
      {/* 2 · quién es y dónde vive */}
      <Escena T={T} a={K.Q} b={K.P}>
        {mar(0)}
        {svg(<><Vaquita x={590} y={680} s={2.2} T={T} />
          <line x1={590 - 2.2 * 205} y1={880} x2={590 + 2.2 * 150} y2={880} stroke="#fff" strokeWidth={6} />
          <text x={590 - 60} y={928} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke">≈ 1.5 m</text>
          <g opacity={kprog(T, K.Q + 3.0, K.Q + 3.6)}>
            <MapaMexico x={250} y={975} ancho={760} conCA={false}><circle cx={mxProy(-114.6, 31.2)[0]} cy={mxProy(-114.6, 31.2)[1]} r={34} fill={KC.red} opacity={0.75} stroke={KC.ink} strokeWidth={8} /></MapaMexico></g></>)}
        <EscalaFija texto="50 cm" largo={Math.round(2.2 * 355 / 1.5 * 0.5)} y={1480} color={KC.texto} />
      </Escena>
      {/* 3 · pregunta */}
      <Escena T={T} a={K.P} b={K.To} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<g transform="translate(320 1000) scale(1.45) translate(-300 -860)"><text x={300} y={980} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 800)`}>?</text>
          <Vaquita x={300} y={1100} s={0.6} T={T} /></g>)}
      </Escena>
      {/* 4–5 · la totoaba, su vejiga y las redes */}
      <Escena T={T} a={K.To} b={K.Ca}>
        {mar(0.2)}
        {svg(<g transform="translate(0 130)"><Totoaba x={570} y={700} s={1.9} T={T} vejiga={kprog(T, K.V + 0.3, K.V + 1.0)} />
          <Vaquita x={590} y={1130} s={1.5} T={T} fase={1} />
          {T > K.To + 2.0 && <g opacity={kprog(T, K.To + 2.0, K.To + 2.8)}>{Array.from({ length: 12 }, (_, i) => <line key={'v' + i} x1={89 + i * 82} y1={460} x2={89 + i * 82} y2={1300} stroke="#e6e0c8" strokeWidth={3} />)}
            {Array.from({ length: 10 }, (_, i) => <line key={'h' + i} x1={89} y1={460 + i * 93.3} x2={991} y2={460 + i * 93.3} stroke="#e6e0c8" strokeWidth={3} />)}</g>}</g>)}
        <EscalaFija texto="50 cm" largo={Math.round(1.5 * 355 / 1.5 * 0.5)} y={1480} color={KC.texto} />
      </Escena>
      {/* 6 · la caída: 1997, 2015 y 2025 */}
      <Escena T={T} a={K.Ca} b={K.E}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g opacity={0.5}><Vaquita x={560} y={1225} s={1.6} T={T} /></g>)}
      </Escena>
      {/* 7 · el crucero: dos barcos, binoculares gigantes y micrófonos bajo el agua */}
      <Escena T={T} a={K.E} b={K.Cr}>
        {mar(0.1)}
        {svg(<><rect x={0} y={0} width={KW} height={900} fill="#182634" /><g transform="translate(0 130)">
          {[[285, 740], [800, 728]].map(([bx, by], i) => <g key={i} transform={`translate(${bx} ${by + Math.sin(T * 1.5 + i) * 6}) scale(1.45)`}>
            <path d="M -170 0 L 170 0 L 130 70 L -130 70 Z" fill={i ? '#3a475c' : '#2346ff'} stroke={KC.ink} strokeWidth={6} />
            <rect x={-80} y={-90} width={140} height={90} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-60} y={-120} width={50} height={22} rx={8} fill={KC.ink} /><circle cx={-14} cy={-109} r={12} fill="#9fdcff" stroke={KC.ink} strokeWidth={4} />
          </g>)}
          {[200, 540, 880].map((mx, i) => <g key={i} transform={`translate(${mx} 1190) scale(1.4)`}>
            <line x1={0} y1={-120} x2={0} y2={60} stroke="#e6e0c8" strokeWidth={4} /><rect x={-18} y={-30} width={36} height={60} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            {[0, 1, 2].map((k) => { const u = ((T * 0.8 + k / 3 + i * 0.2) % 1); return <circle key={k} r={30 + u * 120} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={1 - u} />; })}
          </g>)}</g></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 8 · crías: Frida y su cría */}
      <Escena T={T} a={K.Cr} b={K.B}>
        {mar(0.1)}
        {svg(<><Vaquita x={560} y={900} s={1.9} T={T} aleta="doblada" /><Vaquita x={600} y={1270} s={0.95} T={T} fase={0.6} /></>)}
        <EscalaFija texto="50 cm" largo={Math.round(1.9 * 355 / 1.5 * 0.5)} y={1480} color={KC.texto} />
      </Escena>
      {/* 9 · bloques con ganchos */}
      <Escena T={T} a={K.B} b={K.C}>
        {mar(0.35)}
        {svg(<><rect x={-10} y={1250} width={KW + 20} height={800} fill="#2b261d" stroke={KC.ink} strokeWidth={6} />
          {[200, 540, 880].map((bx, i) => <g key={i} transform={`translate(${bx} 1250) scale(1.5)`}><Bloque x={0} y={0} T={T} red={i === 1} /></g>)}
          <Vaquita x={klerp(300, 780, (Math.sin(T * 0.6) + 1) / 2)} y={700} s={1.25} T={T} flip={Math.cos(T * 0.6) < 0} /><Vaquita x={430} y={960} s={1.05} T={T} fase={2} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 10 · cierre: regreso a las manos, ahora con las crías */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{manos(7, 3)}<Vaquita x={klerp(1340, -300, kprog(T, K.C, K.Ou + 2))} y={1390} s={1.0} T={T} /><Vaquita x={klerp(1560, -80, kprog(T, K.C, K.Ou + 2))} y={1480} s={0.55} T={T} fase={1} /></>)}
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.Q - 0.2} valor={7} dur={3.0} sufijo=" a 10" etiqueta="vaquitas vistas en 2025" x={540} y={390} tam={110} color={KC.yellow} />
      <Etq T={T} at={K.Q + 0.4} until={K.P - 0.2} x={150} y={400} texto="vaquita · Phocoena sinus" it tam={30} />
      <Chip T={T} at={K.Q + 3.2} until={K.P - 0.2} texto="solo en el norte del Golfo de California" y={1440} tam={30} borde={KC.red} />
      <Etq T={T} at={K.To + 0.4} until={K.Ca - 0.2} x={170} y={1035} texto="totoaba · Totoaba macdonaldi" it tam={28} />
      <Chip T={T} at={K.To + 2.2} until={K.V - 0.1} texto="redes ilegales" y={380} x={540} tam={36} borde={KC.red} />
      <Chip T={T} at={K.V + 0.6} until={K.Ca - 0.2} texto="vejiga natatoria → China (sopa)" y={380} x={540} tam={32} borde={KC.yellow} />
      <Comparativa T={T} at={K.Ca + 0.1} until={K.E - 0.2} max={567} y={340} alto={600}
        izq={{ valor: 567, texto: '567', etiqueta: '1997', color: KC.blue }} der={{ valor: 59, texto: '59', etiqueta: '2015', color: KC.red }} />
      <Chip T={T} at={K.Ca + 3.6} until={K.E - 0.2} texto="2025: entre 7 y 10 vistas" y={1440} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2025" quien="crucero de observación" revista="septiembre · 2 barcos · detectores acústicos" y={340} x={540} />
      <Etq T={T} at={K.E + 3.8} until={K.Cr - 0.2} x={250} y={620} texto="binoculares de 25 aumentos" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 4.6} until={K.Cr - 0.2} x={330} y={1070} texto="micrófonos bajo el agua" tam={28} />
      <Chip T={T} at={K.Cr + 0.4} until={K.B - 0.2} texto="Frida: aleta doblada" y={440} x={640} tam={36} borde={KC.pink} />
      <Etq T={T} at={K.Cr + 1.4} until={K.B - 0.2} x={800} y={1270} texto="cría" tam={32} />
      <Chip T={T} at={K.B + 0.3} until={K.C - 0.2} texto="bloques con ganchos: atrapan las redes" y={420} x={540} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="pueden recuperarse si se quitan las redes" y={420} x={540} tam={26} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="Se cuentan con los dedos: *entre 7 y 10.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.P - 0.1} texto="Metro y medio, *solo en el Golfo de California.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.05} until={K.To - 0.1} texto="¿Por qué *casi desaparece?*" />
      <Subtitulo T={T} idx={3} at={K.To + 0.1} until={K.V - 0.1} texto="La totoaba: *pesca ilegal con redes.*" />
      <Subtitulo T={T} idx={4} at={K.V + 0.1} until={K.Ca - 0.1} texto="En esas redes *se enredan y se ahogan.*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.E - 0.1} texto="1997: 567. *2015: 59.*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.Cr - 0.1} texto="Septiembre de 2025: *barcos y micrófonos.*" />
      <Subtitulo T={T} idx={7} at={K.Cr + 0.1} until={K.B - 0.1} texto="Vieron crías: *una es de Frida.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.C - 0.1} texto="En 2025: *8 de cada 10 junto a los bloques.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Pocas, pero *siguen teniendo crías.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Quien + 4.0, CUES.Pregunta - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Totoaba + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Vejiga + 2.6, CUES.Caida - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Caida + 3.6, CUES.Estudio - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 3.8, CUES.Crias - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Crias + 0.3, CUES.Bloques - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Bloques + 1.6, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VaquitaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VaquitaShot /></CompositionStage></div>;
}
window.VaquitaApp = VaquitaApp;
