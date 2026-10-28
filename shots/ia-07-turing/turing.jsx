// Shot IA #07 · ¿Quién es el humano? La IA que pasó la prueba de Turing — NARRADO (N2 "El número" + "Tú contra el de al lado").
// Datos: Jones y Bergen, PNAS 123(21) e2524472123 (2026) y su preprint arXiv:2503.23674 (2025). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff';

// Tarjeta de testigo con silueta, etiqueta y porcentaje que cuenta.
function Testigo({ T, at, x, y, letra, quien, pct, color, gana = false, revela = null }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), g = kprog(T, at + 0.3, at + 1.5, kEase.sale);
  const borde = revela === 'humano' ? KC.leaf : KC.ink;
  return <div style={{ position:'absolute', left:x, top:y, width:420, height:410, transform:`translate(-50%,-50%) scale(${e})`, zIndex:30,
    background:KC.paper, border:`9px solid ${borde}`, borderRadius:30, boxShadow:`12px 12px 0 ${KC.ink}`, overflow:'hidden' }}>
    <div style={{ background:color, borderBottom:`6px solid ${KC.ink}`, padding:'8px 0', textAlign:'center', font:`900 38px ${KF.texto}`, color:KC.ink }}>Testigo {letra}</div>
    <svg width={402} height={190} style={{ display:'block' }}>
      <circle cx={201} cy={70} r={44} fill="#c9c2b4" stroke={KC.ink} strokeWidth={6} />
      <path d="M 120 190 Q 120 120 201 120 Q 282 120 282 190 Z" fill="#c9c2b4" stroke={KC.ink} strokeWidth={6} />
      {!revela && <text x={201} y={92} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>?</text>}
      {revela === 'humano' && <text x={201} y={90} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.leaf}>✔</text>}
    </svg>
    <div style={{ textAlign:'center', font:`900 34px ${KF.texto}`, color:KC.ink, marginTop:-6 }}>{quien}</div>
    <div style={{ textAlign:'center', font:`400 96px/1 ${KF.titulo}`, color: gana ? KC.orange : AZUL, WebkitTextStroke:`3px ${KC.ink}`, marginTop:6 }}>{Math.round(pct * g)} %</div>
  </div>;
}
// Barras horizontales (debajo de Robert, arriba del subtítulo).
function BarrasH({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 40px ${KF.texto}`, color:f.tinta || KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:740 * f.valor / 100 * g, height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 76px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{Math.round(f.valor * g)} %</div>
        </div>
      </div>; })}
  </div>;
}
// Gorra y audífonos para el robotito (el "personaje").
function Disfraz({ x, y, s = 1, e = 1 }) {
  return <g transform={`translate(${x} ${y - (1 - e) * 300}) scale(${s})`} opacity={e}>
    <path d="M -140 -110 Q -140 -200 0 -200 Q 140 -200 140 -110 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
    <path d="M 100 -112 L 230 -100 Q 240 -88 220 -84 L 100 -90 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -60 Q -150 -230 0 -230 Q 150 -230 150 -60" fill="none" stroke={KC.ink} strokeWidth={14} />
    <rect x={-175} y={-80} width={50} height={90} rx={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
    <rect x={125} y={-80} width={50} height={90} rx={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Monitor viejo con texto verde (ELIZA).
function MonitorViejo({ T, x, y, at }) {
  const lin = ['> ELIZA', '¿Y cómo te hace', 'sentir eso?'];
  const n = Math.floor(kprog(T, at + 0.5, at + 3.0) * 40);
  let rest = n;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-230} width={600} height={430} rx={40} fill="#d9cfb4" stroke={KC.ink} strokeWidth={10} />
    <rect x={-250} y={-185} width={500} height={330} rx={30} fill="#0b1a0e" stroke={KC.ink} strokeWidth={6} />
    {lin.map((l, i) => { const k = Math.max(0, Math.min(l.length, rest)); rest -= l.length;
      return <text key={i} x={-215} y={-110 + i * 80} style={{ font:`700 46px ${KF.mono}` }} fill="#4cff7a">{l.slice(0, k)}{k < l.length && k > 0 && Math.sin(T * 12) > 0 ? '▌' : ''}</text>; })}
    <rect x={-80} y={200} width={160} height={50} fill="#bfb497" stroke={KC.ink} strokeWidth={8} />
    <rect x={-200} y={245} width={400} height={40} rx={14} fill="#d9cfb4" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Burbuja de chat con marca (✔ o texto chico).
function Burbuja({ T, at, until, x, y, texto, marca, colorMarca }) {
  if (T < at || T > until + 0.4) return null; const e = kprog(T, at, at + 0.4, kEase.rebote) * (1 - kprog(T, until, until + 0.35));
  return <div style={{ position:'absolute', left:x, top:y, transform:`translate(-50%,-50%) scale(${e})`, zIndex:35, display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
    <div style={{ background:KC.cyan, color:KC.ink, border:`6px solid ${KC.ink}`, borderRadius:'36px 36px 8px 36px', padding:'18px 34px', font:`900 50px ${KF.texto}`, whiteSpace:'nowrap', boxShadow:`8px 8px 0 ${KC.ink}` }}>{texto}</div>
    {marca && T > at + 0.9 && <div style={{ background:colorMarca, color:KC.ink, border:`5px solid ${KC.ink}`, borderRadius:999, padding:'8px 26px', font:`900 34px ${KF.texto}`, whiteSpace:'nowrap', opacity:kprog(T, at + 0.9, at + 1.2) }}>{marca}</div>}
  </div>;
}
// Señal de alerta (triángulo) con texto.
function Alerta({ T, at, x, y, texto }) {
  if (T < at) return null; const e = kprog(T, at, at + 0.4, kEase.rebote), late = 1 + 0.04 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) scale(${e * late})`}>
    <path d="M 0 -130 L 140 110 L -140 110 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>!</text>
    <text x={0} y={180} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={2}>{texto}</text>
  </g>;
}

function Turing() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, J: CUES.Juego, Tu: CUES.Turing, P: CUES.Pregunta, Pe: CUES.Personaje, S: CUES.Sin, E: CUES.Estudio, El: CUES.Eliza, Pi: CUES.Pista, R: CUES.Riesgo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const msg = (a, otro) => [{ at: a, yo: true, texto: 'hola, ¿de dónde eres?' }, { at: a + 1.4, yo: false, texto: otro }, { at: a + 2.8, yo: true, texto: '¿y qué haces?' }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: los dos testigos y sus votos */}
      <Escena T={T} a={K.G} b={K.J}>
        <FondoLunares color={KC.yellow} />
        <Testigo T={T} at={K.G + 0.05} x={280} y={960} letra="A" quien="esta IA" pct={73} color={KC.orange} gana />
        <Testigo T={T} at={K.G + 0.25} x={800} y={960} letra="B" quien="humano real" pct={27} color={KC.cyan} />
      </Escena>
      {/* 2 · el juego: dos chats a la vez, 5 minutos */}
      <Escena T={T} a={K.J} b={K.Tu}>
        <FondoLunares color={KC.mint} />
        <CelularChat T={T} x={280} y={935} s={0.58} tam={62} mensajes={msg(K.J + 0.3, 'de por aquí jaja')} />
        <CelularChat T={T} x={800} y={935} s={0.58} tam={62} mensajes={msg(K.J + 0.6, 'ntp, de lejos xd')} />
        {svg(<><text x={280} y={615} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Testigo A</text><text x={800} y={615} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>Testigo B</text></>)}
      </Escena>
      <Cronometro T={T} at={K.J + 0.2} until={K.Tu - 0.2} inicio={300} factor={-20} x={420} y={440} etiqueta="TIEMPO PARA ADIVINAR" />
      {/* 3 · Turing, 1950 */}
      <Escena T={T} a={K.Tu} b={K.P}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pe} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 5 · el personaje */}
      <Escena T={T} a={K.Pe} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Robotito x={300} y={960} s={1.15} T={T} cara="feliz" /><Disfraz x={300} y={960} s={1.15} e={kprog(T, K.Pe + 0.4, K.Pe + 1.0, kEase.sale)} /></>)}
      </Escena>
      {/* 6 · sin personaje */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      {/* 7 · el estudio */}
      <Escena T={T} a={K.E} b={K.El}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 8 · ELIZA */}
      <Escena T={T} a={K.El} b={K.Pi}>
        <FondoLunares color={KC.lilac} />
        {svg(<MonitorViejo T={T} x={420} y={760} at={K.El} />)}
      </Escena>
      {/* 9 · cómo cacharla */}
      <Escena T={T} a={K.Pi} b={K.R}>
        <FondoLunares color={KC.pink} />
      </Escena>
      {/* 10 · el riesgo */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoCircuito T={T} color={KC.red} />
        {svg(<><Alerta T={T} at={K.R + 3.4} x={300} y={930} texto="engaños" /><Alerta T={T} at={K.R + 4.2} x={780} y={930} texto="desinformación" /></>)}
      </Escena>
      {/* 11 · cierre: los mismos testigos */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        <Testigo T={T} at={K.C - 0.4} x={280} y={960} letra="A" quien="la IA" pct={73} color={KC.orange} gana />
        <Testigo T={T} at={K.C - 0.4} x={800} y={960} letra="B" quien="humano" pct={27} color={KC.cyan} revela={T > K.C + 2.2 ? 'humano' : null} />      </Escena>

      {/* datos y textos */}
      <Chip T={T} at={K.G + 0.4} until={K.J - 0.2} texto="¿quién es el humano?" x={330} y={430} tam={44} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Tu + 0.2} until={K.P - 0.2} anio="1950" quien="Alan Turing" revista="«el juego de imitación»" y={760} />
      <Chip T={T} at={K.Tu + 2.2} until={K.P - 0.2} texto="si no los distingues: la máquina pasa" y={1070} tam={38} borde={KC.ink} />
      {[['joven', 600], ['reservado', 740], ['sabe de internet', 880], ['habla con jerga', 1020]].map(([t, y], i) =>
        <Chip key={t} T={T} at={K.Pe + 2.2 + i * 0.4} until={K.S - 0.2} texto={t} x={790} y={y} tam={40} borde={KC.pink} />)}
      <BarrasH T={T} at={K.S + 0.3} until={K.E - 0.2} filas={[{ valor: 73, etiqueta: 'GPT-4.5 con personaje', color: KC.orange }, { valor: 36, etiqueta: 'GPT-4.5 sin personaje', color: AZUL, at: K.S + 1.6 }]} />
      <Chip T={T} at={K.S + 0.6} until={K.E - 0.2} texto="la misma IA" x={640} y={500} tam={40} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.El - 0.3} anio="2026" quien="UC San Diego" revista="Jones y Bergen · PNAS" y={700} />
      <NumeroGigante T={T} at={K.E + 1.6} until={K.El - 0.3} valor={1023} dur={1.2} etiqueta="partidas analizadas" y={1060} tam={130} color={AZUL} />
      <BarrasH T={T} at={K.El + 2.0} until={K.Pi - 0.2} top={1080} filas={[{ valor: 23, etiqueta: 'ELIZA (años sesenta)', color: '#4cff7a' }]} />
      <Burbuja T={T} at={K.Pi + 0.6} until={K.R - 0.2} x={600} y={650} texto="¿pato? qwerty 🦆" marca="✔ de lo que más sirvió" colorMarca={KC.mint} />
      <Burbuja T={T} at={K.Pi + 2.6} until={K.R - 0.2} x={600} y={1010} texto="¿cómo está el clima?" marca="de lo que menos sirvió" colorMarca={KC.paper} />
      <Cronometro T={T} at={K.R + 0.2} until={K.C - 0.3} inicio={900} factor={-20} x={360} y={440} etiqueta="CHATS DE 15 MINUTOS" />
      <Chip T={T} at={K.R + 1.0} until={K.C - 0.3} texto="GPT-5 con personaje: 59 %" x={430} y={640} tam={46} borde={KC.yellow} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="el de al lado ↓" x={800} y={690} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.J - 0.1} texto="La IA pareció humana *73 de 100 veces.*" />
      <Subtitulo T={T} idx={1} at={K.J + 0.1} until={K.Tu - 0.1} texto="Dos chats: *uno es máquina.*" />
      <Subtitulo T={T} idx={2} at={K.Tu + 0.1} until={K.P - 0.1} texto="Turing, 1950: *si no los distingues, pasa.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Pe - 0.1} texto="¿Cuál fue *el truco?*" />
      <Subtitulo T={T} idx={4} at={K.Pe + 0.1} until={K.S - 0.1} texto="Un personaje: *joven, reservado y con jerga.*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.E - 0.1} texto="Sin personaje: *36 de 100.*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.El - 0.1} texto="San Diego, 2026: *más de mil partidas.*" />
      <Subtitulo T={T} idx={7} at={K.El + 0.1} until={K.Pi - 0.1} texto="ELIZA, de los sesenta: *23 de 100.*" />
      <Subtitulo T={T} idx={8} at={K.Pi + 0.1} until={K.R - 0.1} texto="Para cacharla: *di algo muy raro.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.C - 0.1} texto="Sirve para *engañar y desinformar.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Y si el humano era *el de al lado?*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Juego + 2.5, CUES.Turing - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Turing + 3.0, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Personaje + 2.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Sin + 0.5, CUES.Estudio - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Eliza + 0.5, CUES.Pista - 0.4, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [CUES.Pista + 0.3, CUES.Riesgo - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Riesgo + 1.5, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_11_sorprendido', 'izq-alto']]} />
      <MarcaAgua T={T} tema="ia" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TuringApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Turing /></CompositionStage></div>;
}
window.TuringApp = TuringApp;
