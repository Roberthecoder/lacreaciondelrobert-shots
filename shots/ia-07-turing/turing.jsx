// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot IA #07 · ¿Quién es el humano? La IA que pasó la prueba de Turing — NARRADO (N2 "El número" + "Tú contra el de al lado").
// Datos: Jones y Bergen, PNAS 123(21) e2524472123 (2026) y su preprint arXiv:2503.23674 (2025). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff';

// Tarjeta de testigo con silueta, etiqueta y porcentaje que cuenta.
function Testigo({ T, at, x, y, letra, quien, pct, color, gana = false, revela = null, s = 1 }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), g = kprog(T, at + 0.3, at + 1.5, kEase.sale);
  const borde = revela === 'humano' ? KC.leaf : KC.ink;
  // modo cine: tarjeta alta (480×720) con la silueta grande, para que los dos testigos llenen el cuadro
  return <div style={{ position:'absolute', left:x, top:y, width:480, height:720, transform:`translate(-50%,-50%) scale(${e * s})`, zIndex:30,
    background:KC.paper, border:`9px solid ${borde}`, borderRadius:30, boxShadow:`12px 12px 0 ${KC.ink}`, overflow:'hidden' }}>
    <div style={{ background:color, borderBottom:`6px solid ${KC.ink}`, padding:'12px 0', textAlign:'center', font:`900 48px ${KF.texto}`, color:'#0b1020' }}>Testigo {letra}</div>
    <svg width={462} height={380} viewBox="96 14 210 176" style={{ display:'block' }}>
      <defs><linearGradient id={'tgSil' + letra} x1="0" y1="0" x2="0.8" y2="1"><stop offset="0" stopColor="#ebe5d8" /><stop offset="0.55" stopColor="#c9c2b4" /><stop offset="1" stopColor="#8f887a" /></linearGradient>
        <radialGradient id={'tgLuz' + letra} cx="0.5" cy="0.45" r="0.6"><stop offset="0" stopColor={color} stopOpacity="0.28" /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
      <rect x={96} y={14} width={210} height={176} fill={`url(#tgLuz${letra})`} />
      <circle cx={201} cy={70} r={44} fill={`url(#tgSil${letra})`} stroke={KC.ink} strokeWidth={6} />
      <path d="M 120 190 Q 120 120 201 120 Q 282 120 282 190 Z" fill={`url(#tgSil${letra})`} stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={186} cy={52} rx={12} ry={8} fill="#fff" opacity={0.35} />
      {!revela && <text x={201} y={92} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill="#0b1020">?</text>}
      {revela === 'humano' && <text x={201} y={90} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.leaf}>✔</text>}
    </svg>
    <div style={{ textAlign:'center', font:`900 46px ${KF.texto}`, color:KC.ink, marginTop:4 }}>{quien}</div>
    <div style={{ textAlign:'center', font:`400 150px/1 ${KF.titulo}`, color: gana ? KC.orange : AZUL, WebkitTextStroke:`4px ${KC.ink}`, marginTop:10 }}>{Math.round(pct * g)} %</div>
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
    <defs>
      <linearGradient id="tuGorra" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stopColor="#ff9fc0" /><stop offset="0.5" stopColor={KC.pink} /><stop offset="1" stopColor="#a8325e" /></linearGradient>
      <linearGradient id="tuAud" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9c8ff" /><stop offset="1" stopColor="#7d62c4" /></linearGradient>
    </defs>
    <path d="M -140 -110 Q -140 -200 0 -200 Q 140 -200 140 -110 Z" fill="url(#tuGorra)" stroke={KC.ink} strokeWidth={9} />
    <path d="M 0 -200 L 0 -112 M -70 -186 Q -50 -150 -52 -112 M 70 -186 Q 50 -150 52 -112" stroke="#a8325e" strokeWidth={4} fill="none" opacity={0.6} />
    <circle cx={0} cy={-200} r={10} fill="#a8325e" />
    <path d="M -100 -170 Q -60 -192 -20 -192" stroke="#fff" strokeWidth={8} fill="none" opacity={0.35} strokeLinecap="round" />
    <path d="M 100 -112 L 230 -100 Q 240 -88 220 -84 L 100 -90 Z" fill="url(#tuGorra)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -60 Q -150 -230 0 -230 Q 150 -230 150 -60" fill="none" stroke={KC.ink} strokeWidth={14} />
    <rect x={-175} y={-80} width={50} height={90} rx={20} fill="url(#tuAud)" stroke={KC.ink} strokeWidth={7} />
    <rect x={125} y={-80} width={50} height={90} rx={20} fill="url(#tuAud)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Monitor viejo con texto verde (ELIZA).
function MonitorViejo({ T, x, y, at }) {
  const lin = ['> ELIZA', '¿Y cómo te hace', 'sentir eso?'];
  const n = Math.floor(kprog(T, at + 0.5, at + 3.0) * 40);
  let rest = n;
  return <g transform={`translate(${x} ${y})`}>
    <defs>
      <linearGradient id="tuCaja" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#f0e8d0" /><stop offset="0.5" stopColor="#d9cfb4" /><stop offset="1" stopColor="#a89c7c" /></linearGradient>
      <radialGradient id="tuPant" cx="0.5" cy="0.45" r="0.7"><stop offset="0" stopColor="#123a1c" /><stop offset="1" stopColor="#040b06" /></radialGradient>
    </defs>
    <ellipse cx={0} cy={300} rx={330} ry={30} fill="#000" opacity={0.35} />
    <rect x={-300} y={-230} width={600} height={430} rx={40} fill="url(#tuCaja)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-250} y={-185} width={500} height={330} rx={30} fill="url(#tuPant)" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 20 }, (_, i) => <line key={i} x1={-240} x2={240} y1={-175 + i * 16} y2={-175 + i * 16} stroke="#4cff7a" strokeWidth={2} opacity={0.06} />)}
    <rect x={-250} y={-185 + ((T * 160) % 330)} width={500} height={26} fill="#4cff7a" opacity={0.05} />
    <circle cx={240} cy={170} r={9} fill="#4cff7a" opacity={0.5 + 0.5 * Math.sin(T * 4)} />
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
    <div style={{ background:KC.cyan, color:'#0b1020', border:`6px solid ${KC.ink}`, borderRadius:'36px 36px 8px 36px', padding:'18px 34px', font:`900 50px ${KF.texto}`, whiteSpace:'nowrap', boxShadow:`8px 8px 0 ${KC.ink}` }}>{texto}</div>
    {marca && T > at + 0.9 && <div style={{ background:colorMarca, color: colorMarca === KC.paper ? KC.ink : '#0b1020', border:`5px solid ${KC.ink}`, borderRadius:999, padding:'8px 26px', font:`900 34px ${KF.texto}`, whiteSpace:'nowrap', opacity:kprog(T, at + 0.9, at + 1.2) }}>{marca}</div>}
  </div>;
}
// Señal de alerta (triángulo) con texto.
function Alerta({ T, at, x, y, texto }) {
  if (T < at) return null; const e = kprog(T, at, at + 0.4, kEase.rebote), late = 1 + 0.04 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) scale(${e * late})`}>
    <defs><linearGradient id="tuAle" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#fff2a8" /><stop offset="0.5" stopColor={KC.yellow} /><stop offset="1" stopColor="#c99a10" /></linearGradient></defs>
    <path d="M 0 -130 L 140 110 L -140 110 Z" fill="url(#tuAle)" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <text x={0} y={80} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill="#0b1020">!</text>
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
        <Testigo T={T} at={K.G - 0.3} x={306} y={940} s={0.87} letra="A" quien="esta IA" pct={73} color={KC.orange} gana />
        <Testigo T={T} at={K.G - 0.2} x={774} y={940} s={0.87} letra="B" quien="humano real" pct={27} color={KC.cyan} />
      </Escena>
      {/* 2 · el juego: dos chats a la vez, 5 minutos */}
      <Escena T={T} a={K.J} b={K.Tu}>
        <FondoLunares color={KC.mint} />
        {/* modo cine: mismos celulares y misma posición que la escena siguiente (Turing), para que la disolvencia no duplique */}
        <CelularChat T={T} x={280} y={1110} s={0.84} tam={62} mensajes={msg(K.J + 0.3, 'de por aquí jaja')} />
        <CelularChat T={T} x={800} y={1110} s={0.84} tam={62} mensajes={msg(K.J + 0.6, 'ntp, de lejos xd')} />
        {svg(<><text x={280} y={650} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.orange}>Testigo A</text><text x={800} y={650} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.cyan}>Testigo B</text></>)}
      </Escena>
      <Cronometro T={T} at={K.J + 0.2} until={K.Tu - 0.2} inicio={300} factor={-20} x={540} y={370} etiqueta="TIEMPO PARA ADIVINAR" />
      {/* 3 · Turing, 1950 */}
      <Escena T={T} a={K.Tu} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {/* modo cine: el juego de imitación (los dos chats) sigue en pantalla; la tarjeta va chica y arriba */}
        <div style={{ position:'absolute', inset:0, opacity:klerp(1, 0.6, kprog(T, K.Tu + 0.2, K.Tu + 1.2)) }}>
          <CelularChat T={T} x={280} y={1110} s={0.84} tam={62} mensajes={msg(K.J + 0.3, 'de por aquí jaja')} />
          <CelularChat T={T} x={800} y={1110} s={0.84} tam={62} mensajes={msg(K.J + 0.6, 'ntp, de lejos xd')} />
        </div>
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pe} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<g transform="translate(320 1000) scale(1.85) translate(-300 -880)"><text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text></g>)}
      </Escena>
      {/* 5 · el personaje */}
      <Escena T={T} a={K.Pe} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<><ellipse cx={500} cy={1090 + 175 * 2.3} rx={300} ry={36} fill="#000" opacity={0.35} /><Robotito x={500} y={1090} s={2.3} T={T} cara="feliz" /><Disfraz x={500} y={1090 + Math.sin(T * 3) * 6} s={2.3} e={kprog(T, K.Pe + 0.4, K.Pe + 1.0, kEase.sale)} /></>)}
      </Escena>
      {/* 6 · sin personaje */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {/* modo cine: la IA sigue en pantalla; al decir «sin ese personaje» se le cae el disfraz */}
        {(() => { const m = kprog(T, K.S, K.S + 0.9, kEase.suave), rx = klerp(500, 540, m), ry = klerp(1090, 680, m), rs = klerp(2.3, 1.75, m);
          return svg(<><ellipse cx={rx} cy={ry + 175 * rs} rx={130 * rs} ry={16 * rs} fill="#000" opacity={0.35} /><Robotito x={rx} y={ry} s={rs} T={T} cara={T > K.S + 1.6 ? 'duda' : 'feliz'} /><Disfraz x={rx + kprog(T, K.S + 1.2, K.S + 2.0) * 60} y={ry + Math.sin(T * 3) * 6 + kprog(T, K.S + 1.2, K.S + 2.0, kEase.entra) * 220} s={rs} e={1 - 0.999 * kprog(T, K.S + 1.4, K.S + 2.0)} /></>); })()}
      </Escena>
      {/* 7 · el estudio */}
      <Escena T={T} a={K.E} b={K.El}>
        <FondoLunares color={KC.mint} />
        {/* modo cine: las partidas se ven (un celular por partida que se va encendiendo mientras corre el conteo); tarjeta chica y arriba */}
        {svg(Array.from({ length: 60 }, (_, i) => { const cx = 135 + (i % 10) * 90, cy = 905 + Math.floor(i / 10) * 118, on = kprog(T, K.E + 1.6 + i * 0.02, K.E + 1.9 + i * 0.02);
          return <g key={i} transform={`translate(${cx} ${cy})`} opacity={kprog(T, K.E - 0.2, K.E + 0.3) * (0.3 + 0.7 * on)}>
            <rect x={-30} y={-48} width={60} height={96} rx={12} fill="#10131a" stroke={KC.ink} strokeWidth={4} />
            <rect x={-20} y={-34} width={26} height={12} rx={5} fill={i % 2 ? KC.cyan : KC.orange} opacity={on} />
            <rect x={-6} y={-14} width={26} height={12} rx={5} fill="#5a6480" opacity={on} />
            <rect x={-20} y={6} width={22} height={12} rx={5} fill={i % 2 ? KC.cyan : KC.orange} opacity={on} />
          </g>; }))}
      </Escena>
      {/* 8 · ELIZA */}
      <Escena T={T} a={K.El} b={K.Pi}>
        <FondoLunares color={KC.lilac} />
        {svg(<g transform="translate(540 800) scale(1.45)"><MonitorViejo T={T} x={0} y={0} at={K.El} /></g>)}
      </Escena>
      {/* 9 · cómo cacharla */}
      <Escena T={T} a={K.Pi} b={K.R}>
        <FondoLunares color={KC.pink} />
        {/* modo cine: los mensajes se escriben dentro del chat (el celular llena el cuadro) */}
        <CelularChat T={T} x={540} y={900} s={1.3} mensajes={[]} />
      </Escena>
      {/* 10 · el riesgo */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoCircuito T={T} color={KC.red} />
        {/* modo cine: la IA con su personaje está en pantalla desde que empieza la escena; las alertas salen a sus lados */}
        {svg(<><ellipse cx={540} cy={900 + 175 * 1.6} rx={210} ry={26} fill="#000" opacity={0.35} /><Robotito x={540} y={900} s={1.6} T={T} cara="seguro" /><Disfraz x={540} y={900 + Math.sin(T * 3) * 6} s={1.6} e={1} />
          <Alerta T={T} at={K.R + 3.4} x={290} y={1340} texto="engaños" /><Alerta T={T} at={K.R + 4.2} x={790} y={1340} texto="desinformación" /></>)}
      </Escena>
      {/* 11 · cierre: los mismos testigos */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        <Testigo T={T} at={K.C - 0.4} x={290} y={940} s={0.95} letra="A" quien="la IA" pct={73} color={KC.orange} gana />
        <Testigo T={T} at={K.C - 0.4} x={790} y={940} s={0.95} letra="B" quien="humano" pct={27} color={KC.cyan} revela={T > K.C + 2.2 ? 'humano' : null} />      </Escena>

      {/* datos y textos */}
      <Chip T={T} at={K.G + 0.4} until={K.J - 0.2} texto="¿quién es el humano?" x={540} y={440} tam={50} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.Tu + 0.2} until={K.P - 0.2} anio="1950" quien="Alan Turing" revista="«el juego de imitación»" y={440} />
      <Chip T={T} at={K.Tu + 2.2} until={K.P - 0.2} texto="si no los distingues: la máquina pasa" y={620} tam={42} borde={KC.ink} />
      {[['joven', 250, 330], ['reservado', 760, 330], ['sabe de internet', 300, 450], ['habla con jerga', 780, 450]].map(([t, cx, y], i) =>
        <Chip key={t} T={T} at={K.Pe + 2.2 + i * 0.4} until={K.S - 0.2} texto={t} x={cx} y={y} tam={44} borde={KC.pink} />)}
      <BarrasH T={T} at={K.S + 0.3} until={K.E - 0.2} filas={[{ valor: 73, etiqueta: 'GPT-4.5 con personaje', color: KC.orange }, { valor: 36, etiqueta: 'GPT-4.5 sin personaje', color: AZUL, at: K.S + 1.6 }]} top={1040} />
      <Chip T={T} at={K.S + 0.6} until={K.E - 0.2} texto="la misma IA" x={540} y={250} tam={44} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.El - 0.3} anio="2026" quien="UC San Diego" revista="Jones y Bergen · PNAS" y={400} />
      <NumeroGigante T={T} at={K.E + 1.6} until={K.El - 0.3} valor={1023} dur={1.2} etiqueta="partidas analizadas" y={700} tam={150} color={AZUL} />
      <BarrasH T={T} at={K.El + 2.0} until={K.Pi - 0.2} top={1290} filas={[{ valor: 23, etiqueta: 'ELIZA (años sesenta)', color: '#4cff7a' }]} />
      <Burbuja T={T} at={K.Pi + 0.6} until={K.R - 0.2} x={540} y={640} texto="¿pato? qwerty 🦆" marca="✔ de lo que más sirvió" colorMarca={KC.mint} />
      <Burbuja T={T} at={K.Pi + 2.6} until={K.R - 0.2} x={540} y={1030} texto="¿cómo está el clima?" marca="de lo que menos sirvió" colorMarca={KC.paper} />
      <Cronometro T={T} at={K.R + 0.2} until={K.C - 0.3} inicio={900} factor={-20} x={540} y={300} etiqueta="CHATS DE 15 MINUTOS" />
      <Chip T={T} at={K.R + 1.0} until={K.C - 0.3} texto="GPT-5 con personaje: 59 %" x={540} y={445} tam={46} borde={KC.yellow} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="el de al lado ↓" x={790} y={520} tam={44} borde={KC.leaf} />

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
