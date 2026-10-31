// Shot IA #08 · Menos lecturas, más cáncer encontrado: la IA en las mamografías — NARRADO (N2 "El número").
// Datos: ensayo MASAI (Lång et al., Lancet Oncol 2023; Hernström et al., Lancet Digit Health 2025; Gommers et al., Lancet 2026). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff', VERDE = '#3fbf4a';

// Mamografía esquemática (imagen de rayos X en grises). spot: 0..1 punto brillante chiquito.
function Mamo({ x, y, s = 1, spot = 0, seed = 3, borde = KC.ink }) {
  const r = krng(seed);
  const fibras = Array.from({ length: 16 }, (_, i) => { const a = -0.9 + i * 0.12 + r() * 0.05, l = 120 + r() * 120; return <path key={i} d={`M 10 200 Q ${70 + Math.cos(a) * l * 0.6} ${200 + Math.sin(a) * l * 0.6} ${10 + Math.cos(a) * l * 1.3} ${200 + Math.sin(a) * l * 1.3}`} stroke="#d9dde6" strokeOpacity={0.18 + r() * 0.2} strokeWidth={3 + r() * 4} fill="none" />; });
  return <g transform={`translate(${x - 150 * s} ${y - 200 * s}) scale(${s})`}>
    <rect x={0} y={0} width={300} height={400} rx={14} fill="#05070a" stroke={borde} strokeWidth={8} />
    <path d="M 8 20 Q 250 60 262 210 Q 250 360 8 390 Z" fill="#7d8494" opacity={0.55} />
    <path d="M 8 50 Q 210 90 220 210 Q 210 330 8 360 Z" fill="#aab1bf" opacity={0.35} />
    {fibras}
    {spot > 0 && <><circle cx={168} cy={176} r={9} fill="#ffffff" opacity={spot} /><circle cx={168} cy={176} r={22} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={spot} /></>}
    <text x={276} y={34} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill="#cfd6e3">MLO</text>
  </g>;
}
// Radiólogo esquemático (cabeza con lentes y bata).
function Radiologo({ x, y, s = 1, color = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 170 Q -90 70 0 70 Q 90 70 90 170 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -10 72 L 0 120 L 10 72" fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={0} r={58} fill="#e7b48f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -58 -10 Q -50 -70 0 -66 Q 50 -70 58 -10 Q 30 -40 -58 -10 Z" fill="#3a2a20" />
    <circle cx={-22} cy={4} r={16} fill="none" stroke={KC.ink} strokeWidth={5} /><circle cx={22} cy={4} r={16} fill="none" stroke={KC.ink} strokeWidth={5} />
    <line x1={-6} y1={4} x2={6} y2={4} stroke={KC.ink} strokeWidth={5} />
    <path d="M -14 30 Q 0 38 14 30" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Dos columnas que pasan de "sin IA" a "con IA": lecturas (baja) y cánceres encontrados (sube).
function DosColumnas({ T, at, until, morf }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), m = morf;
  const lect = klerp(109692, 61248, m), canc = klerp(262, 338, m);
  const H = 320, hL = H * lect / 109692, hC = H * canc / 338;
  const Col = ({ cx, h, color, valor, etiqueta, flecha }) => <div style={{ position:'absolute', left:cx - 150, bottom:0, width:300, textAlign:'center' }}>
    <div style={{ font:`400 66px ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}` }}>{valor}{flecha}</div>
    <div style={{ height:h, margin:'8px 40px 0', background:color, border:`7px solid ${KC.ink}`, borderRadius:'18px 18px 0 0' }}></div>
    <div style={{ marginTop:10, font:`900 36px/1.1 ${KF.texto}`, color:KC.ink }}>{etiqueta}</div>
  </div>;
  return <div style={{ position:'absolute', left:0, top:700, width:KW, height:560, zIndex:35, opacity:e.o }}>
    <div style={{ position:'absolute', left:0, right:0, bottom:90 }}>
      <Col cx={300} h={hL} color={KC.orange} valor={kformato(lect)} etiqueta="lecturas de mamografías" flecha={m > 0.5 ? ' ↓' : ''} />
      <Col cx={780} h={hC} color={VERDE} valor={kformato(canc)} etiqueta="cánceres encontrados" flecha={m > 0.5 ? ' ↑' : ''} />
    </div>
  </div>;
}
// Barras horizontales con decimales.
function BarrasDec({ T, at, until, filas, top = 760, max = 8, dec = 1, unidad = '' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:24, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 40px ${KF.texto}`, color:f.tinta || KC.texto, textShadow: f.tinta ? 'none' : KSOMBRA, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:640 * f.valor / max * g, height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 76px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{kformato(f.valor * g, dec)}{unidad}</div>
        </div>
      </div>; })}
  </div>;
}

const TRIAGE = [3, 7, 1, 10, 5, 9];

function Mamografias() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Mamo, D: CUES.Doble, Tr: CUES.Triage, P: CUES.Pregunta, N: CUES.Numero, E: CUES.Estudio, Ch: CUES.Chicos, I: CUES.Intervalo, O: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: menos lecturas, más cánceres */}
      <Escena T={T} a={K.G} b={K.M}>
        <FondoLunares color={KC.pink} />
      </Escena>
      <DosColumnas T={T} at={K.G + 0.05} until={K.M - 0.2} morf={kprog(T, K.G + 0.9, K.G + 3.2, kEase.suave)} />
      {/* 2 · qué es una mamografía */}
      <Escena T={T} a={K.M} b={K.D}>
        <FondoLunares color={KC.cyan} />
        {svg(<Mamo x={380} y={880} s={1.35} />)}
      </Escena>
      {/* 3 · doble lectura */}
      <Escena T={T} a={K.D} b={K.Tr}>
        <FondoLunares color={KC.mint} />
        {svg(<><Mamo x={540} y={760} s={0.85} />
          <g opacity={kprog(T, K.D + 0.2, K.D + 0.5)}><Radiologo x={230} y={1040} s={1.1} /></g>
          <g opacity={kprog(T, K.D + 0.8, K.D + 1.1)}><Radiologo x={850} y={1040} s={1.1} color={KC.yellow} /></g></>)}
      </Escena>
      {/* 4 · la IA califica del 1 al 10 y reparte */}
      <Escena T={T} a={K.Tr} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={0} y={700} width={KW} height={26} fill="#5a524a" />
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x={((i * 80 + T * 160) % 1120) - 40} y={704} width={30} height={18} fill="#8a8f99" />)}
          <Robotito x={540} y={520} s={0.62} T={T} cara="seguro" />
          <rect x={90} y={1010} width={380} height={170} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
          <text x={280} y={1080} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>1 radiólogo</text>
          <text x={280} y={1140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">calificación 1–9</text>
          <rect x={610} y={1010} width={380} height={170} rx={24} fill={KC.paper} stroke={KC.red} strokeWidth={9} />
          <text x={800} y={1080} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>2 radiólogos</text>
          <text x={800} y={1140} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">calificación 10</text>
          {TRIAGE.map((sc, i) => { const t0 = K.Tr + 0.4 + i * 0.9; if (T < t0) return null;
            const u1 = kprog(T, t0, t0 + 0.45, kEase.sale), u2 = kprog(T, t0 + 0.75, t0 + 1.2, kEase.suave), alto = sc === 10;
            const x = klerp(klerp(-120, 540, u1), alto ? 800 : 280, u2), y = klerp(640, 960, u2), sc2 = klerp(0.32, 0.22, u2), op = 1 - kprog(T, t0 + 1.25, t0 + 1.5);
            return <g key={i} opacity={op}><Mamo x={x} y={y} s={sc2} seed={i + 4} />
              {T > t0 + 0.45 && <g transform={`translate(${x + 40} ${y - 70})`}><circle r={34} fill={alto ? KC.red : KC.mint} stroke={KC.ink} strokeWidth={5} /><text y={13} textAnchor="middle" style={{ font:`400 38px ${KF.titulo}` }} fill={KC.ink}>{sc}</text></g>}</g>; })}
        </>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.N} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · el número */}
      <Escena T={T} a={K.N} b={K.E}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      {/* 7 · el estudio */}
      <Escena T={T} a={K.E} b={K.Ch}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 8 · cánceres chicos y falsas alarmas (rayos X) */}
      <Escena T={T} a={K.Ch} b={K.I}>
        <FondoLunares color={KC.cyan} />
        {svg(<Mamo x={330} y={850} s={1.2} spot={kprog(T, K.Ch + 0.8, K.Ch + 1.2)} />)}
      </Escena>
      <Lupa T={T} at={K.Ch + 0.9} until={K.I - 0.3} x={790} y={760} r={190} fx={350} fy={790} tinte={KC.yellow} etiqueta="ZOOM · cáncer pequeño"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#05070a" />
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${-20 + i * 40} 400 Q ${60 + i * 30} 200 ${i * 36} 0`} stroke="#c9d0dc" strokeOpacity=".25" strokeWidth={6} fill="none" />)}
          <circle cx={r} cy={r} r={18 + 3 * Math.sin(t * 5)} fill="#fff" /><circle cx={r} cy={r} r={46} fill="none" stroke={KC.yellow} strokeWidth={5} strokeDasharray="10 8" /></svg>} />
      {/* 9 · cánceres de intervalo (2026) */}
      <Escena T={T} a={K.I} b={K.O}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <line x1={150} y1={700} x2={930} y2={700} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          {[150, 930].map((xx, i) => <g key={i}><circle cx={xx} cy={700} r={34} fill={KC.paper} stroke={KC.ink} strokeWidth={8} /><text x={xx} y={780} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>revisión</text></g>)}
          <text x={540} y={665} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>hasta 2 años</text>
          <circle cx={klerp(150, 930, kprog(T, K.I + 0.2, K.I + 2.2, kEase.suave))} cy={700} r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
        </>)}
      </Escena>
      {/* 10 · ojo: dónde y con qué */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <path d="M 140 620 Q 300 520 520 560 Q 760 520 930 640 Q 960 820 860 960 Q 700 1080 520 1040 Q 300 1080 180 960 Q 90 800 140 620 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={8} />
          {[['Malmö', 300, 900], ['Lund', 520, 760], ['Landskrona', 400, 640], ['Trelleborg', 720, 940]].map(([n, px, py], i) => { const e = kprog(T, K.O + 0.3 + i * 0.3, K.O + 0.6 + i * 0.3, kEase.rebote);
            return <g key={n} transform={`translate(${px} ${py}) scale(${e})`}><path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cy={-55} r={11} fill="#fff" /><text y={46} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{n}</text></g>; })}
          <text x={540} y={1120} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>(mapa esquemático · sur de Suecia)</text>
        </>)}
      </Escena>
      {/* 11 · cierre: la misma imagen del inicio */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
      </Escena>
      <DosColumnas T={T} at={K.C + 0.1} until={K.Ou} morf={kprog(T, K.C + 0.4, K.C + 1.6, kEase.suave)} />

      {/* datos y textos */}
      <Chip T={T} at={K.G + 0.2} until={K.M - 0.2} texto={T > K.G + 2.0 ? 'con IA: −44 % lecturas' : 'sin IA'} x={330} y={470} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.M + 0.6} until={K.D - 0.2} x={590} y={760} texto="rayos X de la mama" color={KC.ink} tam={30} />
      <Etq T={T} at={K.M + 1.4} until={K.D - 0.2} x={590} y={880} texto="busca cáncer a tiempo" color={KC.ink} tam={30} />
      <Chip T={T} at={K.D + 0.4} until={K.Tr - 0.2} texto="Suecia: 2 lecturas por mamografía" y={430} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Tr + 0.2} until={K.P - 0.2} texto="la IA califica del 1 al 10" x={540} y={400} tam={40} borde={KC.ink} />
      <BarrasDec T={T} at={K.N + 0.4} until={K.E - 0.2} top={720} max={8} unidad="" filas={[{ valor: 6.4, etiqueta: 'con IA', color: VERDE, tinta: KC.ink }, { valor: 5.0, etiqueta: 'sin IA', color: AZUL, tinta: KC.ink, at: K.N + 2.6 }]} />
      <Chip T={T} at={K.N + 0.6} until={K.E - 0.2} texto="cánceres por cada 1,000 mujeres" x={600} y={500} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ch - 0.3} anio="MASAI" quien="Suecia · Universidad de Lund" revista="Kristina Lång y equipo · 2021–2022" y={700} />
      <NumeroGigante T={T} at={K.E + 1.5} until={K.Ch - 0.3} valor={105934} dur={1.2} etiqueta="mujeres" y={1060} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.Ch + 1.4} until={K.I - 0.3} texto="pequeños · sin llegar a ganglios" x={560} y={1010} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Ch + 3.4} until={K.I - 0.3} texto="falsas alarmas: casi iguales" x={560} y={1110} tam={38} borde={KC.leaf} />
      <BarrasDec T={T} at={K.I + 2.4} until={K.O - 0.2} top={830} max={2.2} dec={2} filas={[{ valor: 1.55, etiqueta: 'con IA', color: VERDE, tinta: KC.ink }, { valor: 1.76, etiqueta: 'sin IA', color: AZUL, tinta: KC.ink, at: K.I + 3.2 }]} />
      <Chip T={T} at={K.I + 4.4} until={K.O - 0.2} texto="por cada 1,000 · no aumentaron ✔" x={650} y={585} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.O + 1.8} until={K.C - 0.2} texto="1 programa de IA (Transpara)" x={540} y={460} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="la IA no trabajó sola ✔" x={650} y={470} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="44 % menos lecturas… *y más cáncer encontrado.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.D - 0.1} texto="Mamografía: *rayos X de la mama.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.Tr - 0.1} texto="En Suecia: *dos radiólogos.*" />
      <Subtitulo T={T} idx={3} at={K.Tr + 0.1} until={K.P - 0.1} texto="Del 1 al 9: *uno.* El 10: *dos.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.N - 0.1} texto="¿Se les *escaparía* más?" />
      <Subtitulo T={T} idx={5} at={K.N + 0.1} until={K.E - 0.1} texto="Con IA: *6.4 por cada mil.* Sin IA: 5." />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.Ch - 0.1} texto="Más de *100 mil mujeres* en Suecia." />
      <Subtitulo T={T} idx={7} at={K.Ch + 0.1} until={K.I - 0.1} texto="Cánceres *pequeños.* Falsas alarmas: *iguales.*" />
      <Subtitulo T={T} idx={8} at={K.I + 0.1} until={K.O - 0.1} texto="Entre revisiones: *no aumentaron.*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.C - 0.1} texto="Ojo: *4 centros, 1 programa.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Menos lecturas, *más cánceres a tiempo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mamo + 1.0, CUES.Doble - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Triage + 3.5, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Numero + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Numero + 2.5, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Chicos + 0.5, CUES.Chicos + 4.0, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Intervalo + 1.2, CUES.Ojo - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Ojo + 0.3, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'izq-alto']]} />
      <MarcaAgua T={T} tema="ia" num="08" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MamografiasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Mamografias /></CompositionStage></div>;
}
window.MamografiasApp = MamografiasApp;
