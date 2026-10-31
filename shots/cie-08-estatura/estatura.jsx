// Shot Científico #08 · En la noche mides menos (y en el espacio, más) — NARRADO (N2 "El número" + N1 "Por dentro": la columna).
// Datos: Tyrrell, Reilly y Troup 1985 (Spine), Roberts et al. 1998 (Clin Anat, Liverpool), Paajanen et al. 1994 (J Orthop Res),
// NASA (Spinal Ultrasound, ISS) y Green y Scott 2017 (Front Physiol, revisión). Ver guion.md y verificacion.md.
const PIEL = '#f1b48f', HUESO = '#f4ecd8', DISCO = '#7fc8ff';

// Persona de frente; alto en px (la cabeza mide fijo, se estira el cuerpo).
function Persona({ x, yPies, alto = 700, color = KC.blue, acostado = false }) {
  const h = alto - 120;
  return <g transform={`translate(${x} ${yPies}) ${acostado ? 'rotate(-90)' : ''}`}>
    <circle cx={0} cy={-alto + 60} r={60} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={-h} width={160} height={h * 0.5} rx={40} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-70} y={-h * 0.5} width={60} height={h * 0.5} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={10} y={-h * 0.5} width={60} height={h * 0.5} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Regla({ x, yBase, alto = 900, marca }) {
  return <g transform={`translate(${x} ${yBase})`}>
    <rect x={0} y={-alto} width={70} height={alto} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: Math.floor(alto / 30) + 1 }, (_, i) => <line key={i} x1={0} y1={-i * 30} x2={i % 5 ? 22 : 44} y2={-i * 30} stroke={KC.ink} strokeWidth={4} />)}
    {marca != null && <line x1={-40} y1={-marca} x2={110} y2={-marca} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />}
  </g>;
}
// Columna: vértebras con discos entre ellas. aplaste 0..1 adelgaza los discos.
function Columna({ x, y, s = 1, aplaste = 0, n = 7, brillo = 0, T = 0 }) {
  const hv = 70, hd = klerp(34, 14, aplaste), els = [];
  let yy = 0;
  for (let i = 0; i < n; i++) {
    els.push(<rect key={'v' + i} x={-90} y={yy} width={180} height={hv} rx={16} fill={HUESO} stroke={KC.ink} strokeWidth={7} />);
    yy += hv;
    if (i < n - 1) { els.push(<ellipse key={'d' + i} cx={0} cy={yy + hd / 2} rx={klerp(86, 96, aplaste)} ry={hd / 2} fill={DISCO} stroke={KC.ink} strokeWidth={6} opacity={1} />);
      if (brillo > 0) els.push(<ellipse key={'b' + i} cx={0} cy={yy + hd / 2} rx={110} ry={hd} fill={KC.yellow} opacity={0.35 * brillo * (0.6 + 0.4 * Math.sin(T * 5 + i))} />); yy += hd; }
  }
  return <g transform={`translate(${x} ${y - yy * s / 2}) scale(${s})`}>{els}</g>;
}
function Sol({ x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={-r - 15} x2={0} y2={-r - 45} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 45})`} />)}<circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} /></g>;
}
function Luna({ x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill="#fff6c8" stroke={KC.ink} strokeWidth={8} /><circle cx={r * 0.45} cy={-r * 0.2} r={r * 0.85} fill={KC.noche} /></g>;
}
function Astronauta({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-90} y={-60} width={180} height={230} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-30} width={70} height={150} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} transform="rotate(25 -115 45)" />
    <rect x={80} y={-30} width={70} height={150} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} transform="rotate(-25 115 45)" />
    <rect x={-80} y={150} width={70} height={170} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={10} y={150} width={70} height={170} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-130} r={90} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-125} rx={62} ry={50} fill="#2b3a67" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-20} cy={-140} rx={16} ry={10} fill="#fff" opacity=".6" />
  </g>;
}
function Estrellas({ T }) {
  const g = krng(9);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{Array.from({ length: 70 }, (_, i) => { const x = g() * KW, y = g() * KH, r = 1.5 + g() * 3;
    return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.4 + 0.6 * Math.abs(Math.sin(T * 0.8 + i))} />; })}</svg>;
}

function Estatura() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Discos, A: CUES.Agua, E: CUES.Estudio, H: CUES.Hora, N: CUES.Noche, L: CUES.Liverpool, Q: CUES.Pregunta, Es: CUES.Espacio, Cu: CUES.Cuenta, R: CUES.Regreso, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: el sol cruza el cielo (mañana → noche) y la persona baja un poquito (exagerado ×4 para que se vea; se dice en guion)
  const dia = kprog(T, K.G + 0.1, K.G + 4.2, kEase.suave);
  const encoge = 32 * dia;
  const apl = kprog(T, K.D + 0.6, K.D + 2.4, kEase.suave) * (1 - kprog(T, K.N + 0.3, K.N + 2.4, kEase.suave));
  const estira = kprog(T, K.Es + 1.0, K.Es + 3.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: de la mañana a la noche, mides menos */}
      <Escena T={T} a={K.G} b={K.D} fondo={`linear-gradient(${mixHex('#8fd8ff', '#1b2350', dia)}, ${mixHex('#d6f3ff', '#3b3f7a', dia)})`}>
        {svg(<>
          {dia < 0.7 ? <Sol x={klerp(120, 560, dia / 0.7)} y={klerp(900, 520, dia / 0.7)} /> : <Luna x={560} y={520} />}
          <Regla x={620} yBase={1180} alto={760} marca={700} />
          <Persona x={430} yPies={1180} alto={700 - encoge} color={KC.pink} />
          <rect x={0} y={1180} width={KW} height={800} fill="#6bbf59" />
        </>)}
        <Escala T={T} z={1} pxPorMm={0.4} y={1430} x={60} />
      </Escena>
      {/* 2–3 · la columna: los discos se aplastan */}
      <Escena T={T} a={K.D} b={K.E} fondo={KC.noche}>
        <Ambiente T={T} n={24} color="rgba(255,255,255,.16)" />
        {svg(<Columna x={330} y={860} s={1} aplaste={apl} />)}
        <Lupa T={T} at={K.A + 0.2} until={K.E - 0.3} x={780} y={820} r={190} fx={330} fy={800} tinte={DISCO} etiqueta="DISCO"
          interior={(t, r) => { const u = kprog(t, K.A + 0.6, K.A + 3.5); const g = krng(4);
            return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b2340" /><ellipse cx={r} cy={r} rx={r * 0.85} ry={klerp(r * 0.55, r * 0.32, u)} fill={DISCO} stroke="#fff" strokeWidth={4} />
              {Array.from({ length: 10 }, (_, i) => { const a = g() * Math.PI * 2, d = (0.4 + u * 1.2 + (t * 0.5 + i * 0.1) % 0.3) * r * 0.7; return <path key={i} d="M 0 -12 Q 9 0 0 9 Q -9 0 0 -12 Z" transform={`translate(${r + Math.cos(a) * d} ${r + Math.sin(a) * d * 0.6})`} fill="#bfe9ff" stroke="#fff" strokeWidth={2} opacity={u > 0.05 ? 1 : 0} />; })}</svg>; }} />
        <Etq T={T} at={K.D + 0.8} until={K.A - 0.2} x={460} y={700} texto="disco (cojín)" lado="der" color={DISCO} />
        <Etq T={T} at={K.D + 1.2} until={K.A - 0.2} x={460} y={1000} texto="vértebra" lado="der" />
        <Escala T={T} z={1} pxPorMm={2.6} y={1430} x={60} />
      </Escena>
      {/* 4 · el estudio de 1985 */}
      <Escena T={T} a={K.E} b={K.H}>
        <FondoLunares color={KC.orange} />
      </Escena>
      {/* 5 · la primera hora */}
      <Escena T={T} a={K.H} b={K.N}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform="translate(540 900)">
          <circle r={230} fill="#fff" stroke={KC.ink} strokeWidth={10} />
          <path d={`M 0 0 L 0 -210 A 210 210 0 ${0.54 * kprog(T, K.H + 0.4, K.H + 1.8) > 0.5 ? 1 : 0} 1 ${Math.sin(0.54 * kprog(T, K.H + 0.4, K.H + 1.8) * Math.PI * 2) * 210} ${-Math.cos(0.54 * kprog(T, K.H + 0.4, K.H + 1.8) * Math.PI * 2) * 210} Z`} fill={KC.red} opacity=".85" />
          <circle r={14} fill={KC.ink} />
        </g>)}
      </Escena>
      {/* 6 · en la noche se vuelven a inflar */}
      <Escena T={T} a={K.N} b={K.L} fondo={KC.noche}>
        <Estrellas T={T} />
        {svg(<><Luna x={820} y={500} /><Columna x={330} y={880} s={0.9} aplaste={apl} brillo={1} T={T} /></>)}
      </Escena>
      {/* 7 · Liverpool: resonancia */}
      <Escena T={T} a={K.L} b={K.Q}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform="translate(540 1000)">
          <rect x={-330} y={-210} width={660} height={420} rx={200} fill="#e6ecf2" stroke={KC.ink} strokeWidth={10} />
          <circle r={140} fill="#2b3a67" stroke={KC.ink} strokeWidth={9} />
          <rect x={-420} y={40} width={840} height={60} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={8} />
          <g transform={`translate(${klerp(-380, -60, kprog(T, K.L + 0.4, K.L + 2.0, kEase.suave))} 20) rotate(-90)`}><circle r={40} fill={PIEL} stroke={KC.ink} strokeWidth={6} /></g>
        </g>)}
      </Escena>
      {/* 8 · pregunta */}
      <Escena T={T} a={K.Q} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 9–11 · el espacio */}
      <Escena T={T} a={K.Es} b={K.C} fondo="#070b1e">
        <Estrellas T={T} />
        {svg(<>
          {T < K.R + 1.5 ? <Astronauta x={380} y={900 + Math.sin(T * 1.2) * 20} s={1.1} rot={Math.sin(T * 0.7) * 8} />
            : <g><circle cx={540} cy={2300} r={1200} fill="#2e7dd7" stroke={KC.ink} strokeWidth={10} /><path d="M 200 1200 q 120 -60 260 -10 q 80 30 200 -20" stroke="#6bbf59" strokeWidth={60} fill="none" strokeLinecap="round" /><Astronauta x={420} y={850} s={1} /></g>}
          {T < K.R + 1.5 && <Columna x={830} y={900} s={0.65} aplaste={-0.6 * estira} />}
        </>)}
        {T > K.R + 2.6 && svg(<path d="M 330 860 l 30 -30 l 20 30 l 30 -30 l 20 30" stroke={KC.red} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
      </Escena>
      {/* 12 · cierre: la misma escena del inicio, ahora en la mañana */}
      <Escena T={T} a={K.C} b={FIN} fondo="linear-gradient(#8fd8ff, #d6f3ff)">
        {svg(<>
          <Sol x={160} y={860} />
          <Regla x={620} yBase={1180} alto={760} marca={700} />
          <Persona x={430} yPies={1180} alto={700} color={KC.pink} />
          <rect x={0} y={1180} width={KW} height={800} fill="#6bbf59" />
          <g transform={`translate(${klerp(1200, 880, kprog(T, K.C + 3.2, K.C + 4.6, kEase.sale))} ${klerp(1100, 600, kprog(T, K.C + 3.2, K.C + 6.5))}) rotate(30)`}>
            <path d="M 0 -90 Q 40 -40 40 40 L -40 40 Q -40 -40 0 -90 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <circle cx={0} cy={-20} r={16} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
            <path d="M -30 40 L 0 100 L 30 40 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
          </g>
        </>)}
        <Escala T={T} z={1} pxPorMm={0.4} y={1430} x={60} />
      </Escena>

      {/* datos */}
      <NumeroGigante T={T} at={K.G + 0.6} until={K.D - 0.2} valor={2} prefijo="≈ −" sufijo=" cm" etiqueta="mañana → noche" x={330} y={430} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.A + 0.6} until={K.E - 0.3} texto="se adelgazan y, muy probablemente, pierden agua" x={540} y={1500} tam={30} borde={DISCO} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="1985" quien="8 jóvenes · al milímetro" revista="Tyrrell, Reilly y Troup · Spine" x={620} y={760} />
      <NumeroGigante T={T} at={K.E + 2.8} until={K.H - 0.2} valor={19} sufijo=" mm" etiqueta="perdidos al día (promedio)" x={540} y={820} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.H + 0.4} until={K.N - 0.2} texto="54 % en la primera hora" x={540} y={1500} tam={42} borde={KC.red} />
      <Etq T={T} at={K.N + 0.6} until={K.L - 0.2} x={460} y={700} texto="se vuelven a inflar" lado="der" color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.L + 2.4} until={K.Q - 0.2} anio="1998" quien="Liverpool · resonancia" revista="Roberts et al. · Clin. Anat." x={620} y={560} />
      <NumeroGigante T={T} at={K.Es + 1.2} until={K.Cu - 0.2} valor={3} prefijo="+" sufijo=" %" etiqueta="hasta (NASA)" x={760} y={470} tam={140} color={KC.mint} />
      <Chip T={T} at={K.Es + 2.6} until={K.Cu - 0.2} texto="nada aplasta su columna" x={540} y={1500} tam={40} borde={KC.mint} />
      <NumeroGigante T={T} at={K.Cu + 0.3} until={K.R - 0.2} valor={5} prefijo="≈ +" sufijo=" cm" etiqueta="en 1.70 m" x={760} y={470} tam={130} color={KC.mint} />
      <Chip T={T} at={K.R + 0.3} until={K.R + 2.4} texto="de vuelta: estatura normal" x={540} y={1500} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.R + 2.6} until={K.C - 0.2} texto="queja común: dolor de espalda" x={540} y={1500} tam={38} borde={KC.red} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou - 0.1} texto="mídete en la mañana" x={330} y={440} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="En la noche: *casi 2 cm menos.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.A - 0.1} texto="Se aplastan *los discos.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.E - 0.1} texto="Con tu peso: *se adelgazan.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.H - 0.1} texto="1985: *19 mm al día.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.N - 0.1} texto="Más de la mitad: *la primera hora.*" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.L - 0.1} texto="En la noche: *se vuelven a inflar.*" />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.Q - 0.1} texto="Resonancia: *ganan volumen al dormir.*" />
      <Subtitulo T={T} idx={7} at={K.Q + 0.1} until={K.Es - 0.1} texto="¿Y *sin peso?*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Cu - 0.1} texto="Astronautas: *hasta 3 % más altos.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.R - 0.1} texto="En 1.70 m: *unos 5 cm.*" />
      <Subtitulo T={T} idx={10} at={K.R + 0.1} until={K.C - 0.1} texto="En la Tierra: *estatura normal.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Mídete *en la mañana.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Discos + 1.6, CUES.Agua - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Hora - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Noche + 0.3, CUES.Liverpool + 2.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Espacio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Espacio + 1.4, CUES.Cuenta - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Regreso + 2.6, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EstaturaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Estatura /></CompositionStage></div>;
}
window.EstaturaApp = EstaturaApp;
