// Shot Científico #09 · El atardecer azul de Marte — NARRADO (N1 "Por dentro" de la luz + N2; gancho #7 "algo que tus ojos nunca van a ver": nadie lo ha visto en persona).
// Datos: NASA/JPL PIA19400 (Curiosity, sol 956, 15 abr 2015), NASA Space Place "Why Is the Sky Blue?", NASA APOD "Martian Sunset"
// (10 ene 2009 y 2 mar 2014). Ver guion.md y verificacion.md.
const OXIDO = '#b5532a', OXIDO2 = '#7e3418', CIELO_MARTE = '#d9a066', AZUL_HALO = '#7fb8ff';

// Paisaje. tipo 'marte' | 'tierra'. sol = 0 (alto) … 1 (en el horizonte). halo 0..1 (azul alrededor del Sol, en Marte).
function Paisaje({ tipo = 'marte', sol = 0, halo = 0, x = 0, w = KW, rSol = 70 }) {
  const marte = tipo === 'marte';
  const cieloArriba = marte ? mixHex('#c98a55', '#3a2a3a', sol * 0.8) : mixHex('#4fa8ff', '#2a2f6a', sol * 0.8);
  const cieloAbajo = marte ? mixHex(CIELO_MARTE, '#8a5a4a', sol * 0.6) : mixHex('#bfe6ff', '#ff7a3a', sol);
  const sx = x + w * 0.55, sy = klerp(560, 1060, sol);
  const id = 'g' + tipo + Math.round(x);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={cieloArriba} /><stop offset="1" stopColor={cieloAbajo} /></linearGradient>
      <radialGradient id={id + 'h'}><stop offset="0" stopColor={AZUL_HALO} stopOpacity={0.95 * halo} /><stop offset="0.5" stopColor={AZUL_HALO} stopOpacity={0.5 * halo} /><stop offset="1" stopColor={AZUL_HALO} stopOpacity="0" /></radialGradient>
    </defs>
    <rect x={x} y={0} width={w} height={1180} fill={`url(#${id})`} />
    {halo > 0 && <ellipse cx={sx} cy={sy} rx={330} ry={260} fill={`url(#${id}h)`} />}
    <circle cx={sx} cy={sy} r={rSol} fill={marte ? '#f4f7ff' : '#fff3b0'} opacity={0.95} />
    <path d={`M ${x} 1100 Q ${x + w * 0.25} 1040 ${x + w * 0.5} 1090 T ${x + w} 1070 L ${x + w} 1180 L ${x} 1180 Z`} fill={marte ? OXIDO2 : '#2f6b3a'} />
    <rect x={x} y={1180} width={w} height={800} fill={marte ? OXIDO : '#3f8f4a'} />
    {marte && [[120, 1300, 40], [420, 1420, 26], [760, 1340, 34], [930, 1500, 22]].map(([a, b, r], i) => <ellipse key={i} cx={x + a * w / KW} cy={b} rx={r * 1.6} ry={r} fill={OXIDO2} />)}
  </svg>;
}
// Rayos de colores que salen del Sol y se desvían (dispersión). modo 'dia' o 'tarde'.
function Rayos({ T, modo = 'dia' }) {
  const largo = modo === 'tarde';
  const sol = largo ? [100, 1000] : [160, 420], ojo = [860, 1150];
  const molec = Array.from({ length: 40 }, (_, i) => [140 + ((i * 97) % 820), 560 + ((i * 53) % 560)]);
  const ray = (color, k) => { const u = ((T * 0.45 + k * 0.17) % 1);
    if (color === KC.blue) { const m = molec[(k * 7) % molec.length]; const p1 = [klerp(sol[0], m[0], kclamp(u * 2, 0, 1)), klerp(sol[1], m[1], kclamp(u * 2, 0, 1))];
      const dir = (k * 1.7) % (Math.PI * 2), p2 = [m[0] + Math.cos(dir) * 300 * kclamp(u * 2 - 1, 0, 1), m[1] + Math.sin(dir) * 300 * kclamp(u * 2 - 1, 0, 1)];
      return <polyline key={k} points={`${sol[0]},${sol[1]} ${p1[0]},${p1[1]} ${u > 0.5 ? p2[0] + ',' + p2[1] : ''}`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={largo ? 0.7 : 1} />; }
    return <line key={k} x1={sol[0]} y1={sol[1]} x2={klerp(sol[0], ojo[0], u)} y2={klerp(sol[1], ojo[1], u)} stroke={color} strokeWidth={9} strokeLinecap="round" opacity={largo ? 1 : 0.6} />; };
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {molec.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} fill="rgba(255,255,255,.55)" />)}
    <circle cx={sol[0]} cy={sol[1]} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3].map((k) => ray(KC.blue, k))}
    {[0, 1].map((k) => ray(KC.red, k + 5))}{[0, 1].map((k) => ray(KC.yellow, k + 8))}
    <g transform={`translate(${ojo[0]} ${ojo[1]})`}><ellipse rx={70} ry={42} fill="#fff" stroke={KC.ink} strokeWidth={7} /><circle r={26} fill="#5a3a22" /><circle r={12} fill={KC.ink} /></g>
  </svg>;
}
// Polvo marciano: partículas finas flotando; la luz azul sigue de frente, la roja se dispersa a lo ancho.
function PolvoMarte({ T, frente = 0 }) {
  const g = krng(21);
  const ps = Array.from({ length: 60 }, () => [g() * KW, 450 + g() * 700, 3 + g() * 5, g() * 9]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {ps.map(([x, y, r, f], i) => <circle key={i} cx={x + Math.sin(T * 0.6 + f) * 12} cy={y + Math.cos(T * 0.5 + f) * 8} r={r} fill="#e8b27a" opacity=".8" />)}
    {frente > 0 && <>
      {[0, 1, 2].map((k) => { const u = (T * 0.5 + k / 3) % 1; return <line key={k} x1={120} y1={700 + k * 30} x2={klerp(120, 960, u)} y2={700 + k * 30 + u * 40} stroke={AZUL_HALO} strokeWidth={12} strokeLinecap="round" opacity={frente} />; })}
      {[0, 1, 2, 3].map((k) => { const u = (T * 0.5 + k / 4) % 1, a = -1.2 + k * 0.8; return <line key={'r' + k} x1={540} y1={760} x2={540 + Math.cos(a) * 380 * u} y2={760 + Math.sin(a) * 380 * u} stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={frente * 0.8} />; })}
      <circle cx={120} cy={730} r={60} fill="#f4f7ff" stroke={KC.ink} strokeWidth={6} />
    </>}
  </svg>;
}
function Rover({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-90} width={400} height={110} rx={16} fill="#e9e4da" stroke={KC.ink} strokeWidth={8} />
    {[-160, -20, 120].map((dx, i) => <g key={i}><line x1={dx + 20} y1={20} x2={dx + 20} y2={60} stroke={KC.ink} strokeWidth={8} /><circle cx={dx + 20} cy={80} r={42} fill="#555" stroke={KC.ink} strokeWidth={8} /></g>)}
    <rect x={110} y={-300} width={20} height={210} fill="#ccc" stroke={KC.ink} strokeWidth={6} />
    <rect x={70} y={-360} width={110} height={70} rx={12} fill="#e9e4da" stroke={KC.ink} strokeWidth={7} />
    <circle cx={100} cy={-325} r={18} fill={KC.ink} /><circle cx={150} cy={-325} r={18} fill={KC.ink} />
    <rect x={-170} y={-150} width={120} height={60} rx={8} fill="#c9c4b8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function Marte() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ti: CUES.Tierra, D: CUES.Dispersa, Ro: CUES.Rojo, Q: CUES.Pregunta, P: CUES.Polvo, Pa: CUES.Pasa, H: CUES.Halo, E: CUES.Estudio, Ca: CUES.Camara, S: CUES.Sol, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const solG = klerp(0.45, 0.85, kprog(T, K.G, K.G + 4, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: atardecer en Marte, el halo azul crece desde el cuadro 0 */}
      <Escena T={T} a={K.G} b={K.Ti}>
        <Paisaje tipo="marte" sol={solG} halo={kprog(T, K.G + 0.1, K.G + 2.5)} rSol={46} />
      </Escena>
      {/* 2 · en la Tierra: de día azul, al atardecer rojo */}
      <Escena T={T} a={K.Ti} b={K.D}>
        <Paisaje tipo="tierra" sol={kprog(T, K.Ti + 0.8, K.Ti + 3.6, kEase.suave)} rSol={70} />
      </Escena>
      {/* 3–4 · por qué: el azul se desvía; al atardecer la luz cruza más aire */}
      <Escena T={T} a={K.D} b={K.Q} fondo={KC.noche}>
        <Rayos T={T} modo={T < K.Ro ? 'dia' : 'tarde'} />
        {T >= K.Ro && svg(<path d="M 0 1080 Q 540 980 1080 1080" stroke="rgba(255,255,255,.35)" strokeWidth={6} fill="none" strokeDasharray="16 12" />)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.P} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<><circle cx={300} cy={860} r={210} fill={OXIDO} stroke={KC.ink} strokeWidth={12} /><circle cx={240} cy={800} r={40} fill={OXIDO2} /><circle cx={360} cy={930} r={28} fill={OXIDO2} /></>)}
      </Escena>
      {/* 6–7 · el polvo de Marte */}
      <Escena T={T} a={K.P} b={K.H}>
        <Paisaje tipo="marte" sol={0.2} rSol={40} />
        <PolvoMarte T={T} frente={kprog(T, K.Pa + 0.4, K.Pa + 1.2)} />
      </Escena>
      {/* 8 · el halo azul */}
      <Escena T={T} a={K.H} b={K.E}>
        <Paisaje tipo="marte" sol={0.85} halo={kprog(T, K.H + 0.3, K.H + 1.8)} rSol={46} />
      </Escena>
      {/* 9 · Curiosity, sol 956 */}
      <Escena T={T} a={K.E} b={K.Ca}>
        <Paisaje tipo="marte" sol={0.8} halo={1} rSol={46} />
        {svg(<Rover x={320} y={1620} s={0.8} />)}
      </Escena>
      {/* 10 · la cámara y el ojo */}
      <Escena T={T} a={K.Ca} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g transform="translate(320 900)"><rect x={-150} y={-90} width={300} height={180} rx={24} fill="#e9e4da" stroke={KC.ink} strokeWidth={9} /><circle cx={-60} cy={0} r={50} fill={KC.ink} /><circle cx={70} cy={0} r={50} fill={KC.ink} /><circle cx={-70} cy={-12} r={12} fill="#fff" /><circle cx={60} cy={-12} r={12} fill="#fff" /></g>
          <text x={540} y={920} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>≈</text>
          <g transform="translate(780 900)"><ellipse rx={150} ry={90} fill="#fff" stroke={KC.ink} strokeWidth={9} /><circle r={60} fill="#5a3a22" /><circle r={28} fill={KC.ink} /><circle cx={-18} cy={-18} r={10} fill="#fff" /></g>
        </>)}
      </Escena>
      {/* 11 · el Sol desde Marte: 2/3 */}
      <Escena T={T} a={K.S} b={K.C} fondo="#070b1e">
        {svg(<>
          <circle cx={310} cy={860} r={180} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
          <circle cx={790} cy={860} r={180 * 2 / 3 * kprog(T, K.S + 0.6, K.S + 1.4, kEase.rebote) || 0.01} fill="#f4f7ff" stroke={KC.ink} strokeWidth={8} />
          <text x={310} y={1120} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>desde la Tierra</text>
          <text x={790} y={1120} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>desde Marte</text>
        </>)}
      </Escena>
      {/* 12 · cierre: tu atardecer rojo y el de Marte, azul junto al Sol (regresa la imagen del inicio) */}
      <Escena T={T} a={K.C} b={FIN}>
        <Paisaje tipo="tierra" sol={0.85} x={0} w={540} rSol={50} />
        <Paisaje tipo="marte" sol={0.85} halo={kprog(T, K.C + 0.8, K.C + 2.4)} x={540} w={540} rSol={34} />
        {svg(<line x1={540} y1={0} x2={540} y2={KH} stroke={KC.ink} strokeWidth={8} />)}
      </Escena>

      {/* datos */}
      <Chip T={T} at={K.G + 0.4} until={K.Ti - 0.2} texto="atardecer en Marte" x={330} y={440} tam={42} borde={AZUL_HALO} />
      <Chip T={T} at={K.Ti + 0.3} until={K.D - 0.2} texto="Tierra: cielo azul, atardecer rojo" x={540} y={1500} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.D + 0.6} until={K.Ro - 0.2} texto="el aire desvía más el azul" x={540} y={440} tam={40} borde={KC.blue} />
      <Chip T={T} at={K.Ro + 0.6} until={K.Q - 0.2} texto="más aire: llegan rojo y amarillo" x={540} y={440} tam={38} borde={KC.red} />
      <Chip T={T} at={K.P + 0.6} until={K.Pa - 0.2} texto="polvo finísimo → cielo rojizo" x={540} y={1500} tam={38} borde={OXIDO} />
      <Chip T={T} at={K.Pa + 0.6} until={K.H - 0.2} texto="el azul sigue de frente, cerca del Sol" x={540} y={1500} tam={34} borde={AZUL_HALO} />
      <Etq T={T} at={K.H + 1.6} until={K.E - 0.2} x={700} y={1180} texto="halo azul" lado="der" color={AZUL_HALO} tam={40} />
      <Etq T={T} at={K.H + 2.4} until={K.E - 0.2} x={80} y={430} texto="cielo rojizo" lado="der" tam={38} />
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.Ca - 0.3} anio="2015" quien="15 abr · cráter Gale · Curiosity" revista="NASA/JPL · PIA19400 · sol 956" x={600} y={560} />
      <Chip T={T} at={K.Ca + 1.4} until={K.S - 0.2} texto="un poco menos sensible al azul" x={540} y={1500} tam={38} borde={KC.blue} />
      <NumeroGigante T={T} at={K.S + 1.6} until={K.C - 0.2} valor={2} sufijo="/3" etiqueta="del tamaño" x={790} y={500} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou - 0.1} texto="junto al Sol" x={380} y={440} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ti - 0.1} texto="Un atardecer *azul:* el de Marte." />
      <Subtitulo T={T} idx={1} at={K.Ti + 0.1} until={K.D - 0.1} texto="Aquí: cielo azul, *atardecer rojo.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.Ro - 0.1} texto="El aire *desvía el azul.*" />
      <Subtitulo T={T} idx={3} at={K.Ro + 0.1} until={K.Q - 0.1} texto="Más aire: *llegan rojo y amarillo.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.P - 0.1} texto="¿Y *en Marte?*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Pa - 0.1} texto="Polvo finísimo: *cielo rojizo.*" />
      <Subtitulo T={T} idx={6} at={K.Pa + 0.1} until={K.H - 0.1} texto="El azul *pasa cerca del Sol.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.E - 0.1} texto="Al atardecer: *un halo azul.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ca - 0.1} texto="Curiosity, *15 de abril de 2015.*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.S - 0.1} texto="Ve casi *como tus ojos.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.C - 0.1} texto="Desde Marte: *el Sol, 2/3.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Marte: *azul junto al Sol.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.7, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tierra + 0.6, CUES.Dispersa - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Rojo + 2.6, CUES.Pregunta - 0.1, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Polvo + 2.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Halo + 2.2, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Camara - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Camara + 0.3, CUES.Sol - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Sol + 1.8, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MarteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Marte /></CompositionStage></div>;
}
window.MarteApp = MarteApp;
