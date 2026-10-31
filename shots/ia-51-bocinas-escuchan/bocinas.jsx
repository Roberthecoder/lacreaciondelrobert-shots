// Shot IA #51 · Tu bocina inteligente se despierta sola con la tele — NARRADO (N5 "El experimento" + N2 "El número").
// Datos: Dubois, Kolcun, Mandalari, Paracha, Choffnes y Haddadi, "When Speakers Are All Ears", PoPETs 2020(4) (PETS 2020). Ver guion.md y verificacion.md.
// Todo es esquemático; las bocinas no llevan marca.
const AZUL = '#2f6dff', ANILLO = '#3fd0ff';
const svgL = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

// Halo de luz de activación.
function Halo({ x, y, rx, ry, luz, color = ANILLO }) {
  if (luz <= 0.01) return null;
  return <g opacity={luz}>
    <ellipse cx={x} cy={y} rx={rx * 1.9} ry={ry * 2.6} fill={color} opacity=".18" />
    <ellipse cx={x} cy={y} rx={rx * 1.4} ry={ry * 1.8} fill={color} opacity=".28" />
  </g>;
}
// Bocina inteligente esquemática. tipo: 'disco' (bajita con anillo arriba), 'tela' (disco de tela con luces), 'alta' (redonda y alta), 'torre' (cilindro).
// luz 0..1 = anillo encendido; color = color del anillo.
function Bocina({ x, y, s = 1, tipo = 'disco', luz = 0, color = ANILLO, T = 0, mic = false }) {
  const pulso = 0.8 + 0.2 * Math.sin(T * 9);
  const anillo = mic ? KC.red : mixHex('#3a4150', color, luz);
  if (tipo === 'alta') return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Halo x={0} y={-150} rx={60} ry={30} luz={luz * pulso} color={color} />
    <path d="M -95 -150 Q -100 -170 0 -172 Q 100 -170 95 -150 L 98 -10 Q 100 12 0 14 Q -100 12 -98 -10 Z" fill="#c9ccd3" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-90} y1={-130 + i * 22} x2={90} y2={-130 + i * 22} stroke="#9aa0ab" strokeWidth={3} />)}
    <ellipse cx={0} cy={-158} rx={70} ry={12} fill={anillo} stroke={KC.ink} strokeWidth={5} />
  </g>;
  if (tipo === 'torre') return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Halo x={0} y={-230} rx={60} ry={24} luz={luz * pulso} color={color} />
    <path d="M -62 -230 L -62 0 Q 0 22 62 0 L 62 -230 Z" fill="#2b2f38" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-56} y1={-205 + i * 22} x2={56} y2={-205 + i * 22} stroke="#4a505c" strokeWidth={3} />)}
    <ellipse cx={0} cy={-230} rx={62} ry={18} fill={anillo} stroke={KC.ink} strokeWidth={6} />
  </g>;
  if (tipo === 'tela') return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Halo x={0} y={-40} rx={90} ry={26} luz={luz * pulso} color={color} />
    <path d="M -100 -40 Q -100 -64 0 -66 Q 100 -64 100 -40 L 96 0 Q 0 16 -96 0 Z" fill="#e7e2d8" stroke={KC.ink} strokeWidth={8} />
    {[-36, -12, 12, 36].map((d) => <circle key={d} cx={d} cy={-48} r={8} fill={mic ? KC.red : luz > 0.3 ? color : '#bdb6a8'} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Halo x={0} y={-62} rx={100} ry={26} luz={luz * pulso} color={color} />
    <path d="M -110 -62 L -110 -8 Q 0 22 110 -8 L 110 -62 Z" fill="#2e3440" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 3 }, (_, i) => <path key={i} d={`M -100 ${-46 + i * 13} Q 0 ${-28 + i * 13} 100 ${-46 + i * 13}`} stroke="#4a5262" strokeWidth={3} fill="none" />)}
    <ellipse cx={0} cy={-62} rx={110} ry={26} fill="#3a4150" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-62} rx={92} ry={19} fill="none" stroke={anillo} strokeWidth={10} />
    <circle cx={-32} cy={-64} r={7} fill="#20252e" /><circle cx={32} cy={-64} r={7} fill="#20252e" />
  </g>;
}
// Tele con una escena simple (dos personajes que platican) y subtítulo opcional.
function Tele({ x, y, s = 1, T = 0, sub = '', habla = 1 }) {
  const b = Math.sin(T * 10) * 6 * habla;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-250} y={-160} width={500} height={320} rx={22} fill="#1d1d22" stroke={KC.ink} strokeWidth={9} />
    <rect x={-228} y={-140} width={456} height={262} rx={10} fill="#7fd1ff" />
    <rect x={-228} y={40} width={456} height={82} fill="#4aa86b" />
    <circle cx={-90} cy={-30 + b * 0.3} r={34} fill="#f1b48f" stroke={KC.ink} strokeWidth={5} />
    <path d="M -140 70 Q -90 -10 -40 70 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-90} cy={-14} rx={10} ry={3 + Math.abs(b)} fill={KC.ink} />
    <circle cx={90} cy={-24} r={34} fill="#c98a5e" stroke={KC.ink} strokeWidth={5} />
    <path d="M 40 70 Q 90 -10 140 70 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <rect x={-60} y={160} width={120} height={28} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    {sub && <g><rect x={-200} y={80} width={400} height={40} rx={6} fill="rgba(0,0,0,.75)" />
      <text x={0} y={110} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#fff">{sub}</text></g>}
  </g>;
}
// Globo de diálogo (sale de la tele).
function Globo({ x, y, w = 360, h = 120, texto, o = 1, s = 1, tam = 40, cola = 'abajo', mono = false, color = KC.paper }) {
  const cx = cola === 'abajo' ? -w * 0.2 : w * 0.25;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2.4} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${cx - 24} ${h / 2 - 4} L ${cx - 40} ${h / 2 + 50} L ${cx + 18} ${h / 2 - 4} Z`} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={cx - 22} y={h / 2 - 12} width={36} height={14} fill={color} />
    <text x={0} y={tam * 0.36} textAnchor="middle" style={{ font:`${mono ? 700 : 900} ${tam}px ${mono ? KF.mono : KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Mueble de la sala.
function Mueble({ y = 1060 }) {
  return <g>
    <rect x={30} y={y} width={1020} height={46} rx={10} fill="#b4703f" stroke={KC.ink} strokeWidth={8} />
    <rect x={70} y={y + 46} width={940} height={150} fill="#8f552d" stroke={KC.ink} strokeWidth={8} />
    <line x1={540} y1={y + 46} x2={540} y2={y + 196} stroke={KC.ink} strokeWidth={6} />
    <circle cx={500} cy={y + 120} r={9} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /><circle cx={580} cy={y + 120} r={9} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Ondas de sonido que salen de (x,y) hacia la derecha (o hacia arriba con dir='arriba').
function Ondas({ T, x, y, n = 3, dir = 'der', color = KC.ink, o = 1, r0 = 30 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, k) => { const u = ((T * 0.9 + k / n) % 1), r = r0 + u * 90;
    const a = dir === 'der' ? 0 : -90;
    return <path key={k} d={`M ${r * Math.cos((a - 35) * Math.PI / 180)} ${r * Math.sin((a - 35) * Math.PI / 180)} A ${r} ${r} 0 0 1 ${r * Math.cos((a + 35) * Math.PI / 180)} ${r * Math.sin((a + 35) * Math.PI / 180)}`}
      transform={`translate(${x} ${y})`} stroke={color} strokeWidth={8} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />; })}</g>;
}
// Sala completa: tele + mueble + bocina. luz = anillo; globo = texto del globo de la tele.
function Sala({ T, luz = 0, globo, globoO = 0, fondo = KC.mint }) {
  return <>
    <FondoLunares color={fondo} />
    {svgL(<>
      <rect x={0} y={1060} width={KW} height={KH - 1060} fill="#e9c79a" />
      <Mueble y={1060} />
      <Tele x={330} y={870} s={0.95} T={T} />
      <Ondas T={T} x={590} y={860} />
      <Bocina x={820} y={1066} s={1.05} T={T} luz={luz} />
      <Sofa T={T} />
      {globo && <Globo x={300} y={560} w={420} h={120} texto={globo} o={globoO} s={klerp(0.6, 1, globoO)} tam={44} />}
    </>)}
  </>;
}
// Sofá con "tú" viendo la tele, de espaldas.
function Sofa({ T }) {
  const b = Math.sin(T * 1.3) * 3;
  return <g>
    <ellipse cx={540} cy={1500} rx={520} ry={70} fill="#d4a876" opacity=".7" />
    <circle cx={430} cy={1515 + b} r={95} fill="#3b2a20" stroke={KC.ink} strokeWidth={8} />
    <path d="M 340 1500 Q 430 1440 520 1500" fill="#2a1d16" />
    <path d="M 60 1600 Q 60 1560 110 1560 L 970 1560 Q 1020 1560 1020 1600 L 1020 1920 L 60 1920 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <path d="M 20 1650 Q 20 1610 70 1610 L 130 1610 L 130 1920 L 20 1920 Z M 950 1610 L 1010 1610 Q 1060 1610 1060 1650 L 1060 1920 L 950 1920 Z" fill="#1c33c9" stroke={KC.ink} strokeWidth={8} />
    <line x1={540} y1={1580} x2={540} y2={1920} stroke="#1c33c9" strokeWidth={8} />
    <path d="M 300 1600 Q 430 1560 560 1600 L 560 1700 L 300 1700 Z" fill="#c33b2f" stroke={KC.ink} strokeWidth={7} />
    <text x={810} y={1700} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={2}>tú</text>
  </g>;
}
// Nube.
function Nube({ x, y, s = 1, color = '#ffffff', o = 1, candado = null }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -150 50 Q -210 50 -200 0 Q -195 -50 -140 -45 Q -130 -110 -60 -105 Q -20 -150 40 -115 Q 100 -140 130 -80 Q 200 -80 200 -15 Q 205 50 140 50 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {candado != null && <g transform="translate(0 -20)">
      <path d={candado ? 'M -22 -10 L -22 -34 Q 0 -60 22 -34 L 22 -10' : 'M -22 -10 L -22 -34 Q 0 -60 22 -34 L 22 -26'} stroke={KC.ink} strokeWidth={8} fill="none" transform={candado ? '' : 'translate(14 -12) rotate(20)'} />
      <rect x={-34} y={-12} width={68} height={52} rx={10} fill={candado ? KC.gold2 : KC.mint} stroke={KC.ink} strokeWidth={6} />
    </g>}
  </g>;
}
// Cámara con punto rojo de grabación.
function CamaraRec({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-55} width={180} height={110} rx={18} fill="#2b2f38" stroke={KC.ink} strokeWidth={8} />
    <circle cx={10} cy={0} r={40} fill="#11151c" stroke={KC.ink} strokeWidth={6} /><circle cx={10} cy={0} r={18} fill="#2f6dff" opacity=".8" />
    <circle cx={-62} cy={-32} r={10} fill={KC.red} opacity={(T % 1) < 0.6 ? 1 : 0.2} />
    <path d="M 50 55 L 100 160 M -30 55 L -80 160" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Reloj que da la vuelta (p 0..1).
function Reloj({ x, y, r = 120, p = 0, etq = '1 hora' }) {
  const a = p * 360 - 90;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <path d={`M 0 0 L 0 ${-r + 12} A ${r - 12} ${r - 12} 0 ${p > 0.5 ? 1 : 0} 1 ${(r - 12) * Math.cos(a * Math.PI / 180)} ${(r - 12) * Math.sin(a * Math.PI / 180)} Z`} fill={KC.yellow} opacity={p > 0.002 ? 0.8 : 0} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 10} x2={0} y2={-r + 26} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={(r - 30) * Math.cos(a * Math.PI / 180)} y2={(r - 30) * Math.sin(a * Math.PI / 180)} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
    <text y={r * 0.5} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{etq}</text>
  </g>;
}
// Subtítulo de serie (estilo closed caption) con "≈" y la palabra de activación.
function Confusion({ T, at, y, dice, parece, tipo, ancho = 940 }) {
  if (T < at - 0.01) return null;
  const e = kprog(T, at, at + 0.35, kEase.sale), eq = kprog(T, at + 0.5, at + 0.8, kEase.sale), luz = kprog(T, at + 0.8, at + 1.0);
  return <>
    <div style={{ position:'absolute', left:60, top:y, zIndex:40, opacity:e, transform:`translateX(${(1 - e) * -60}px)`, display:'flex', alignItems:'center', gap:22 }}>
      <div style={{ background:'rgba(0,0,0,.85)', color:'#fff', font:`700 50px ${KF.mono}`, padding:'14px 26px', borderRadius:10, border:`4px solid ${KC.ink}` }}>{dice}</div>
      <div style={{ font:`400 90px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, opacity:eq, transform:`scale(${klerp(1.6, 1, eq)})` }}>≈</div>
      <div style={{ background:KC.paper, color:KC.ink, font:`900 46px ${KF.texto}`, padding:'12px 24px', borderRadius:999, border:`5px solid ${KC.ink}`, opacity:eq }}>«{parece}»</div>
    </div>
    {svgL(<Bocina x={tipo === 'alta' ? 900 : 900} y={y + (tipo === 'alta' ? 250 : 210)} s={tipo === 'alta' ? 0.75 : 0.8} tipo={tipo} T={T} luz={luz} />, 39)}
  </>;
}

function Bocinas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Es: CUES.Escucha, Ex: CUES.Experimento, Nu: CUES.Numero, Pa: CUES.Palabras, P: CUES.Pregunta, D: CUES.Duracion, Nb: CUES.Nube, Ca: CUES.Calma, Na: CUES.Narcos, Co: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const S2 = window.SUBS && window.SUBS[3] ? window.SUBS[3].at : K.Ex + 6.8;   // "Una cámara vigilaba su luz."
  const S2D = K.D + 1.9;   // "Pero en una…" (misma línea 7)
  // duraciones esquemáticas (segundos) de 10 activaciones: casi todas cortas; la décima, 10 s (HomePod).
  const DURS = [2, 3, 4, 2, 3, 5, 3, 4, 2];
  const largo = kprog(T, S2D + 0.4, S2D + 1.8, kEase.sale);
  const tipos = ['disco', 'disco', 'disco', 'disco', 'tela', 'alta', 'torre'];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la tele habla y la bocina se prende */}
      <Escena T={T} a={K.G} b={K.Es} zoom={0.04} origen="75% 60%">
        <Sala T={T} luz={kprog(T, K.G + 0.5, K.G + 0.8)} globo="bla bla bla…" globoO={kprog(T, K.G + 0.05, K.G + 0.4, kEase.sale)} />
      </Escena>
      <Chip T={T} at={K.G + 2.6} until={K.Es - 0.2} texto="nadie la llamó" x={300} y={760} tam={38} borde={KC.red} />
      {/* 2 · escucha su nombre: por dentro */}
      <Escena T={T} a={K.Es} b={K.Ex}>
        <FondoCircuito T={T} />
        {svgL(<>
          <circle cx={540} cy={1000} r={250} fill="#141c30" stroke={ANILLO} strokeWidth={6} strokeOpacity=".5" />
          <Ondas T={T} x={160} y={1000} n={4} color={KC.texto} />
          <path d="M 400 1215 L 470 1560 M 680 1215 L 610 1560" stroke={ANILLO} strokeWidth={5} strokeOpacity=".5" strokeDasharray="14 12" />
          <Bocina x={540} y={1760} s={2.0} T={T} luz={T > K.Es + 3.6 ? 1 : 0.25} />
          <Nube x={330} y={640} s={0.8} o={kprog(T, K.Es + 1.6, K.Es + 2.1)} candado={T < K.Es + 3.6} color="#dfe8ff" />
          <path d={`M 540 760 L 420 ${klerp(760, 700, kprog(T, K.Es + 3.6, K.Es + 4.2))}`} stroke={KC.mint} strokeWidth={10} strokeDasharray="20 14" opacity={kprog(T, K.Es + 3.6, K.Es + 4.0)} />
        </>)}
        <RedNeuronal T={T} x={400} y={900} ancho={280} alto={200} capas={[3, 4, 4, 2]} onda={((T - K.Es) * 0.7) % 1} />
      </Escena>
      <Chip T={T} at={K.Es + 0.4} until={K.Ex - 0.2} texto="busca su nombre aquí adentro" x={540} y={700} tam={34} borde={ANILLO} />
      <Chip T={T} at={K.Es + 3.6} until={K.Ex - 0.2} texto="¿oyó su nombre? → internet" x={420} y={470} tam={36} borde={KC.mint} />
      {/* 3 · el experimento: 7 bocinas, series y una cámara */}
      <Escena T={T} a={K.Ex} b={K.Nu}>
        <FondoLunares color={KC.lilac} />
        {svgL(<>
          <rect x={0} y={1640} width={KW} height={KH - 1640} fill="#8a6fd1" />
          <rect x={20} y={1620} width={1040} height={34} rx={8} fill="#b4703f" stroke={KC.ink} strokeWidth={7} />
          {tipos.map((t, i) => <g key={i} opacity={kprog(T, K.Ex + 2.2 + i * 0.18, K.Ex + 2.5 + i * 0.18)}>
            <Bocina x={330 + i * 112} y={1624} s={t === 'alta' ? 0.55 : t === 'torre' ? 0.6 : 0.5} tipo={t} T={T + i} luz={T > K.Ex + 7.4 && i === 4 ? kprog(T, K.Ex + 7.4, K.Ex + 7.6) : 0} />
          </g>)}
          <g opacity={kprog(T, K.Ex + 3.0, K.Ex + 3.4)}>
            <rect x={50} y={1380} width={170} height={240} rx={16} fill="#2b2f38" stroke={KC.ink} strokeWidth={7} />
            <circle cx={135} cy={1445} r={34} fill="#11151c" stroke={KC.ink} strokeWidth={5} /><circle cx={135} cy={1545} r={50} fill="#11151c" stroke={KC.ink} strokeWidth={5} />
            <Ondas T={T} x={225} y={1500} n={3} color={KC.ink} r0={20} />
          </g>
          <g opacity={kprog(T, S2, S2 + 0.4)}><CamaraRec x={660} y={1000} s={1.0} T={T} />
            <path d="M 700 1050 L 300 1560 L 1060 1560 Z" fill="#ff3b2f" opacity={0.10 + 0.05 * Math.sin(T * 6)} /></g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Ex + 0.2} until={K.Ex + 3.6} anio="2020" quien="Boston y Londres" revista="Dubois et al. · PETS 2020" y={640} />
      <Chip T={T} at={K.Ex + 3.9} until={S2 - 0.2} texto="7 bocinas · 134 horas de series" x={540} y={880} tam={40} borde={KC.ink} />
      <Chip T={T} at={S2 + 0.3} until={K.Nu - 0.2} texto="¿se prende su luz?" x={540} y={820} tam={38} borde={KC.red} />
      {/* 4 · el número */}
      <Escena T={T} a={K.Nu} b={K.Pa}>
        <FondoLunares color={KC.yellow} />
        {svgL(<>
          <Reloj x={330} y={1610} r={170} p={kprog(T, K.Nu + 0.6, K.Nu + 3.4, kEase.suave)} />
          <Bocina x={790} y={1720} s={1.2} T={T} luz={kprog(T, K.Nu + 3.4, K.Nu + 3.6)} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Nu + 0.3} until={K.Pa - 0.2} valor={0.95} dec={2} dur={1.2} etiqueta="activaciones solas por hora" x={640} y={700} tam={300} color={KC.red} />
      <Chip T={T} at={K.Nu + 1.6} until={K.Pa - 0.2} texto="hasta 0.95 por hora · 1 bocina con 1 serie" x={540} y={1010} tam={32} borde={KC.ink} />
      {/* 5 · las palabras que la despiertan */}
      <Escena T={T} a={K.Pa} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svgL(<Tele x={540} y={1640} s={1.15} T={T} sub={T < K.Pa + 1.8 ? "I'm sorry" : 'I messed up'} />)}
      </Escena>
      {kvisible(T, K.Pa, K.P) && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.P - 0.1, K.P + 0.3) }}>
        <Confusion T={T} at={K.Pa + 0.2} y={520} dice="I'm sorry" parece="Hey Siri" tipo="alta" />
        <Confusion T={T} at={K.Pa + 1.9} y={850} dice="I messed up" parece="Alexa" tipo="disco" />
      </div>}
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.D} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svgL(<>
          <text x={300} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 820)`}>?</text>
          <Bocina x={540} y={1760} s={1.8} T={T} luz={1} />
        </>)}
      </Escena>
      {/* 7 · cuánto dura */}
      <Escena T={T} a={K.D} b={K.Nb}>
        <FondoLunares color={KC.cyan} />
        {svgL(<><Reloj x={330} y={1640} r={170} p={((T - K.D) / 10) % 1} etq="segundos" /><Bocina x={790} y={1740} s={1.2} T={T} luz={1} /></>)}
      </Escena>
      {kvisible(T, K.D, K.Nb) && <div style={{ position:'absolute', left:70, top:700, width:940, zIndex:40, opacity:1 - kprog(T, K.Nb - 0.1, K.Nb + 0.3) }}>
        {DURS.map((d, i) => { const g = kprog(T, K.D + 0.3 + i * 0.12, K.D + 0.7 + i * 0.12, kEase.sale);
          return <div key={i} style={{ height:26, width:Math.max(4, 88 * d * g), marginBottom:7, background:KC.mint, border:`4px solid ${KC.ink}`, borderRadius:10, opacity:g > 0 ? 1 : 0 }}></div>; })}
        <div style={{ position:'relative', height:42, width:Math.max(4, 88 * klerp(3, 10, largo) * kprog(T, K.D + 1.4, K.D + 1.8)), background:largo > 0.05 ? KC.red : KC.mint, border:`4px solid ${KC.ink}`, borderRadius:10 }}>
          {largo > 0.6 && <div style={{ position:'absolute', left:20, top:2, font:`900 30px ${KF.texto}`, color:'#fff', whiteSpace:'nowrap', opacity:kprog(T, S2D + 1.4, S2D + 1.8) }}>HomePod · 10 s o más</div>}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', width:880, marginTop:10, font:`700 26px ${KF.mono}`, color:KC.ink }}><span>0 s</span><span>5 s</span><span>10 s</span></div>
      </div>}
      <Chip T={T} at={K.D + 0.3} until={S2D} texto="casi siempre: unos segundos" x={380} y={590} tam={36} borde={KC.ink} />
      <Chip T={T} at={S2D + 0.2} until={K.Nb - 0.2} texto="1 de cada 10 · en una bocina" x={380} y={590} tam={36} borde={KC.red} />
      {/* 8 · a la nube */}
      <Escena T={T} a={K.Nb} b={K.Ca}>
        <FondoLunares color={KC.lilac} />
        {svgL(<>
          <Nube x={600} y={650} s={1.1} />
          {Array.from({ length: 5 }, (_, k) => { const u = ((T - K.Nb) * 0.8 + k / 5) % 1;
            return <g key={k} opacity={Math.sin(Math.PI * u) * kprog(T, K.Nb + 0.4, K.Nb + 0.7)}><path d={`M ${560 + Math.sin(k * 2) * 40} ${1560 - u * 760} q 20 -14 40 0 q 20 14 40 0`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" /></g>; })}
          <Bocina x={600} y={1720} s={1.8} T={T} luz={1} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Nb + 0.8} until={K.Ca - 0.2} texto="casi todas las activaciones" x={680} y={500} tam={36} borde={KC.ink} />
      {/* 9 · lo que NO encontraron */}
      <Escena T={T} a={K.Ca} b={K.Na}>
        <FondoLunares color={KC.mint} />
        {svgL(<><Bocina x={540} y={1740} s={1.8} T={T} luz={0} />
          {[0, 1, 2].map((k) => { const u = ((T * 0.5 + k / 3) % 1); return <text key={k} x={700 + u * 120} y={1520 - u * 160} style={{ font:`400 ${50 + u * 40}px ${KF.titulo}` }} fill={KC.ink} opacity={Math.sin(Math.PI * u)}>z</text>; })}</>)}
      </Escena>
      <Chip T={T} at={K.Ca + 0.3} until={K.Na - 0.2} texto="no hallaron pruebas de…" x={400} y={600} tam={40} borde={KC.leaf} />
      <MitoTachado T={T} at={K.Ca + 0.8} tacharEn={K.Ca + 2.0} until={K.Na - 0.2} texto="grabar todo el tiempo" x={430} y={800} />
      <MitoTachado T={T} at={K.Ca + 2.4} tacharEn={K.Ca + 3.6} until={K.Na - 0.2} texto="palabras secretas" x={430} y={1000} />
      {/* 10 · Narcos y el español */}
      <Escena T={T} a={K.Na} b={K.Co}>
        <FondoLunares color={KC.orange} />
        {svgL(<>
          <Tele x={330} y={900} s={0.9} T={T} sub="(diálogo en español)" />
          <Globo x={330} y={600} w={300} h={110} texto="¿…?" tam={54} o={kprog(T, K.Na + 1.0, K.Na + 1.4)} />
          <Bocina x={760} y={1760} s={1.6} T={T} luz={kprog(T, K.Na + 2.6, K.Na + 2.8)} />
          <text x={960} y={1660} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Na + 2.8, K.Na + 3.0)}>?!</text>
        </>)}
      </Escena>
      <Chip T={T} at={K.Na + 0.3} until={K.Co - 0.2} texto="Narcos" x={330} y={1100} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Na + 3.4} until={K.Co - 0.2} texto="6.21 activaciones por cada 10 000 palabras" x={540} y={1450} tam={32} borde={KC.red} />
      {/* 11 · el botón de micrófono */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svgL(<>
          <Bocina x={540} y={1760} s={2.4} T={T} mic={T > K.Co + 1.0} luz={0} />
          <g transform={`translate(0 ${klerp(540, 600, kprog(T, K.Co + 0.5, K.Co + 1.0, kEase.sale))})`} opacity={kprog(T, K.Co + 0.3, K.Co + 0.6)}>
            <path d="M 470 860 q 0 -40 30 -40 q 30 0 30 40 l 0 60 q 50 -10 60 30 l 0 90 q 0 50 -60 60 l -60 0 q -40 -10 -50 -60 l -10 -70 q 0 -30 30 -20 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Co + 1.1} until={K.C - 0.2} texto="micrófono apagado" x={600} y={900} tam={42} borde={KC.red} />
      {/* 12 · cierre: la misma sala */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="75% 60%">
        <Sala T={T} luz={kprog(T, K.C + 0.6, K.C + 0.9)} globo="bla bla bla…" globoO={kprog(T, K.C + 0.2, K.C + 0.5, kEase.sale)} />
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="fue la tele, no tú" x={380} y={420} tam={42} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Es - 0.1} texto="No la llamaste: *la prendió la tele.*" />
      <Subtitulo T={T} idx={1} at={K.Es + 0.1} until={K.Ex - 0.1} texto="Siempre atenta *a su nombre.*" />
      <Subtitulo T={T} idx={2} at={K.Ex + 0.1} until={S2 - 0.1} texto="2020: *7 bocinas, 134 horas de series.*" />
      <Subtitulo T={T} idx={3} at={S2 + 0.05} until={K.Nu - 0.1} texto="Una cámara *vigilaba su luz.*" />
      <Subtitulo T={T} idx={4} at={K.Nu + 0.1} until={K.Pa - 0.1} texto="Peor caso: *casi 1 vez por hora.*" />
      <Subtitulo T={T} idx={5} at={K.Pa + 0.1} until={K.P - 0.1} texto="Frases que *suenan parecido.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.D - 0.1} texto="¿Cuánto oye *cuando se despierta sola?*" />
      <Subtitulo T={T} at={(window.SUBS && window.SUBS[7] ? window.SUBS[7].at : K.D) + 0.1} until={S2D - 0.1} texto="Casi siempre, *unos segundos.*" />
      <Subtitulo T={T} at={S2D + 0.05} until={window.SUBS && window.SUBS[7] ? window.SUBS[7].until : K.Nb - 0.1} texto="En una: *1 de cada 10, 10 s o más.*" />
      <Subtitulo T={T} idx={8} at={K.Nb + 0.1} until={K.Ca - 0.1} texto="Casi todas: *audio a la nube.*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.Na - 0.1} texto="Sin pruebas de que *graben todo el tiempo.*" />
      <Subtitulo T={T} idx={10} at={K.Na + 0.1} until={K.Co - 0.1} texto="Narcos: *diálogos en español.*" />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.C - 0.1} texto="Botón de *micrófono apagado.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="A veces *es la tele.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Escucha + 1.9, CUES.Experimento - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Experimento + 4.0, CUES.Experimento + 7.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Numero + 0.3, CUES.Palabras - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Duracion - 0.45, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Duracion + 1.0, CUES.Nube - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Nube + 0.3, CUES.Calma - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Calma + 0.5, CUES.Narcos - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Narcos + 0.6, CUES.Consejo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Consejo + 0.3, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="51" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BocinasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Bocinas /></CompositionStage></div>;
}
window.BocinasApp = BocinasApp;
