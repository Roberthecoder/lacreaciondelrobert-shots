// Shot IA #44 · La IA que le pasó los trucos del veterano al nuevo — NARRADO (N2 "El número").
// Datos: Brynjolfsson, Li y Raymond, "Generative AI at Work", Quarterly Journal of Economics 140(2): 889–942 (2025);
// versión de autores arXiv:2304.11771v2 (2024). Contraste: Shot IA #16 (METR 2025). Ver guion.md y verificacion.md. Dibujo esquemático.
const VERDE = '#1fbf6a';

// Agente de call center con diadema. cara: 'panico' | 'feliz' | 'calma'. canas: pelo gris (veterano).
function Agente({ x, y, s = 1, T, cara = 'feliz', piel = '#e8ad7f', pelo = '#2a1c18', playera = KC.pink, canas = false }) {
  const b = Math.sin(T * 2.2 + x) * 3;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -100 0 Q -96 -120 0 -128 Q 96 -120 100 0 Z" fill={playera} stroke={KC.ink} strokeWidth={8} />
    <rect x={-22} y={-160} width={44} height={40} fill={piel} stroke={KC.ink} strokeWidth={6} />
    <circle cy={-215} r={64} fill={piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -64 -215 Q -70 -292 0 -288 Q 70 -292 64 -215 Q 54 -262 0 -258 Q -48 -262 -64 -215 Z" fill={canas ? '#b9b4ad' : pelo} stroke={KC.ink} strokeWidth={6} />
    {/* diadema */}
    <path d="M -70 -215 Q -72 -300 0 -300 Q 72 -300 70 -215" fill="none" stroke={KC.ink} strokeWidth={12} />
    <rect x={-84} y={-240} width={26} height={50} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={5} />
    <rect x={58} y={-240} width={26} height={50} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={5} />
    <path d="M -72 -200 Q -66 -165 -24 -170" fill="none" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={-170} r={8} fill={KC.ink} />
    {/* cara */}
    {cara === 'panico' ? <>
      <circle cx={-22} cy={-222} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={22} cy={-222} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <circle cx={-22} cy={-222} r={5} fill={KC.ink} /><circle cx={22} cy={-222} r={5} fill={KC.ink} />
      <path d="M -36 -246 L -10 -240 M 36 -246 L 10 -240" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={4} cy={-186} rx={12} ry={14} fill={KC.ink} />
      <path d={`M 52 ${-250 + ((T * 40) % 30)} q 10 16 0 24 q -10 -8 0 -24 Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} opacity={0.9} />
    </> : <>
      <circle cx={-22} cy={-222} r={7} fill={KC.ink} /><circle cx={22} cy={-222} r={7} fill={KC.ink} />
      {cara === 'calma' ? <path d="M -16 -190 Q 4 -180 22 -192" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
        : <path d="M -24 -194 Q 0 -170 24 -194" stroke={KC.ink} strokeWidth={6} fill="#fff" strokeLinecap="round" />}
      {canas && <path d="M -40 -244 L -8 -240 M 40 -244 L 8 -240" stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />}
    </>}
  </g>;
}

// Monitor con chats. pend = chats esperando (globito rojo con número). chats = cuántas burbujas se ven.
function Monitor({ x, y, s = 1, T, pend = 0, chats = 3, verde = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={60} fill="#7f8ba3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-60} y={52} width={120} height={18} rx={8} fill="#7f8ba3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-110} y={-150} width={220} height={160} rx={14} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-96} y={-136} width={192} height={132} rx={6} fill="#0d1424" />
    {Array.from({ length: Math.min(4, chats) }, (_, i) => <rect key={i} x={i % 2 ? -10 : -84} y={-124 + i * 30} width={i % 2 ? 94 : 110} height={20} rx={10}
      fill={i % 2 ? (verde ? VERDE : KC.cyan) : '#3a4258'} />)}
    {pend > 0 && <g transform="translate(100 -150)"><circle r={30} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
      <text y={12} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">{pend}</text></g>}
  </g>;
}

// Cubículo: mampara, escritorio, agente y monitor. x,y = centro del borde del escritorio.
function Cubiculo({ x, y, T, quien = 'nuevo', calma = 0, pend = 0, color = KC.paper, robot = 0, taza = false }) {
  const nuevo = quien === 'nuevo';
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-230} y={-470} width={460} height={470} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-230} y={-470} width={460} height={34} rx={14} fill="#7f8ba3" stroke={KC.ink} strokeWidth={6} />
    {/* notitas en la mampara */}
    <rect x={-200} y={-410} width={60} height={56} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform="rotate(-6 -170 -382)" />
    <rect x={150} y={-414} width={56} height={52} fill={nuevo ? KC.pink : KC.mint} stroke={KC.ink} strokeWidth={4} transform="rotate(5 178 -388)" />
    <Agente x={-70} y={0} s={0.9} T={T} cara={nuevo ? (calma > 0.5 ? 'feliz' : 'panico') : 'calma'} playera={nuevo ? KC.pink : KC.blue}
      piel={nuevo ? '#e8ad7f' : '#c98a5e'} canas={!nuevo} />
    <Monitor x={120} y={-120} s={0.85} T={T} pend={pend} chats={nuevo ? 4 : 3} verde={!nuevo || calma > 0.5} />
    <rect x={-250} y={-10} width={500} height={44} rx={10} fill="#b8794a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={30} width={500} height={30} fill="#8a5632" stroke={KC.ink} strokeWidth={6} />
    {taza && <g transform="translate(-190 -50)"><rect x={-26} y={-34} width={52} height={74} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <path d="M 26 -14 Q 50 -14 50 6 Q 50 26 26 26" fill="none" stroke={KC.ink} strokeWidth={5} />
      {[0, 1].map((k) => <path key={k} d={`M ${-8 + k * 16} -46 q 8 -12 0 -24 q -8 -12 0 -24`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.5 + 0.4 * Math.sin(T * 4 + k)} />)}</g>}
    {robot > 0 && <g opacity={robot}><Robotito x={210} y={-330} s={0.36 * klerp(0.5, 1, robot)} T={T} cara="feliz" /></g>}
  </g>;
}

// Globo de "sugerencia" que sale del robotito hacia el monitor.
function Soplo({ T, at, x, y, s = 1 }) {
  const e = kprog(T, at, at + 0.4, kEase.rebote), o = kprog(T, at, at + 0.2);
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${e * s})`} opacity={o}>
    <path d="M -110 -50 h 220 a 22 22 0 0 1 22 22 v 56 a 22 22 0 0 1 -22 22 h -150 l -30 30 v -30 h -40 a 22 22 0 0 1 -22 -22 v -56 a 22 22 0 0 1 22 -22 z"
      fill="#fff" stroke={KC.cyan} strokeWidth={6} strokeDasharray="14 9" />
    {[0, 1].map((k) => <rect key={k} x={-90} y={-26 + k * 26} width={[170, 120][k]} height={14} rx={7} fill={KC.ink} opacity={0.35 + 0.5 * Math.max(0, Math.sin(T * 5 - k))} />)}
    <g transform="translate(96 -48)"><circle r={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /><path d="M -6 18 h 12 v 8 h -12 z" fill="#7f8ba3" stroke={KC.ink} strokeWidth={3} /></g>
  </g>;
}

// Diadema chiquita (un agente del estudio). ia 0..1 la pinta de cian con brillito.
function Diadema({ x, y, s = 1, ia = 0, T }) {
  const c = mixHex('#f4efe4', '#00d2ff', ia);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={26} fill={c} stroke={KC.ink} strokeWidth={5} />
    <path d="M -26 0 Q -28 -40 0 -40 Q 28 -40 26 0" fill="none" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-10} width={12} height={22} rx={5} fill="#2b3445" stroke={KC.ink} strokeWidth={3} />
    <rect x={22} y={-10} width={12} height={22} rx={5} fill="#2b3445" stroke={KC.ink} strokeWidth={3} />
    {ia > 0.5 && <path d={`M 30 -40 l 5 10 l 10 5 l -10 5 l -5 10 l -5 -10 l -10 -5 l 10 -5 z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={2}
      transform={`rotate(${T * 90} 30 -25)`} />}
  </g>;
}

// Barras horizontales con texto libre: filas = [{ at, valor (0..max), texto, etiqueta, color }].
function BarrasH({ T, at, until, filas, max = 35, top = 640, ancho = 560 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink, marginBottom:18 }}>casos resueltos por hora, con IA</div>
    {filas.map((f, i) => { const g = kprog(T, f.at, f.at + 0.8, kEase.sale), w = Math.max(14, ancho * f.valor / max * g);
      return <div key={i} style={{ position:'relative', height:150, opacity: kprog(T, f.at - 0.1, f.at + 0.1) }}>
        <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink }}>{f.etiqueta}</div>
        <div style={{ position:'absolute', top:52, left:0, height:72, width:w, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:14 }}></div>
        <div style={{ position:'absolute', top:44, left:w + 22, font:`400 76px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}`, opacity:g, whiteSpace:'nowrap' }}>{f.texto}</div>
      </div>; })}
  </div>;
}

// Tarjeta de chat (para "los chats de los mejores"): estrella dorada.
function ChatEstrella({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-80} y={-50} width={160} height={100} rx={16} fill="#1a2236" stroke={KC.gold} strokeWidth={5} />
    <rect x={-60} y={-28} width={90} height={12} rx={6} fill={KC.texto} opacity=".75" />
    <rect x={-60} y={-4} width={110} height={12} rx={6} fill={KC.cyan} opacity=".75" />
    <rect x={-60} y={20} width={70} height={12} rx={6} fill={KC.texto} opacity=".5" />
    <path d="M 62 -66 l 10 20 l 22 3 l -16 15 l 4 22 l -20 -11 l -20 11 l 4 -22 l -16 -15 l 22 -3 z" fill={KC.gold} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Tarjeta de la escena "Clientes".
function TarjetaCli({ T, at, x, y, titulo, children }) {
  const e = kprog(T, at, at + 0.45, kEase.rebote), o = kprog(T, at, at + 0.2);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, e)})`} opacity={o}>
    <rect x={-160} y={-170} width={320} height={380} rx={28} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(0 -30)">{children}</g>
    {titulo.map((t, i) => <text key={i} y={140 + i * 44} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{t}</text>)}
  </g>;
}
function CaraCliente({ T, u }) { // u 0..1: enojada → amable
  const boca = klerp(-24, 24, u);
  return <g>
    <circle r={80} fill={mixHex('#ff6b5a', '#ffe11a', u)} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-28} cy={-16} r={9} fill={KC.ink} /><circle cx={28} cy={-16} r={9} fill={KC.ink} />
    <path d={`M -46 ${-44 + u * 10} L -14 ${-34 - u * 6} M 46 ${-44 + u * 10} L 14 ${-34 - u * 6}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <path d={`M -34 30 Q 0 ${30 + boca} 34 30`} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}
function Supervisor({ T, u }) { // u 0..1: el botón se apaga
  return <g>
    <rect x={-120} y={-70} width={240} height={110} rx={20} fill={mixHex('#ff3b2f', '#9aa0aa', u)} stroke={KC.ink} strokeWidth={7} />
    <text y={-22} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff">¡Quiero hablar</text>
    <text y={16} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill="#fff">con tu supervisor!</text>
    <g opacity={u}><line x1={-120} y1={60} x2={120} y2={-80} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /></g>
    <text y={100} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{u > 0.5 ? 'menos veces' : ''}</text>
  </g>;
}
function Puerta({ T, at }) { // muñequitos que salen por la puerta: primero varios, luego menos
  const n = 5, out = [];
  for (let i = 0; i < n; i++) {
    const quedan = i >= 2; // con IA, 3 de 5 se quedan (esquemático)
    const t0 = at + 0.5 + i * 0.25, u = kprog(T, t0, t0 + 0.8, kEase.sale);
    const fx = quedan ? klerp(-90 + i * 30, -100 + i * 40, u) : klerp(-90 + i * 30, 70, u);
    out.push(<g key={i} transform={`translate(${fx} ${quedan ? 60 : 60 - u * 10})`} opacity={quedan ? 1 : 1 - kprog(T, t0 + 0.6, t0 + 0.9)}>
      <circle cy={-50} r={14} fill={['#e8ad7f', '#c98a5e', '#f1c7a0', '#8d5a3b', '#e8ad7f'][i]} stroke={KC.ink} strokeWidth={4} />
      <rect x={-14} y={-36} width={28} height={40} rx={10} fill={[KC.pink, KC.cyan, KC.mint, KC.orange, KC.lilac][i]} stroke={KC.ink} strokeWidth={4} />
    </g>);
  }
  return <g>
    <rect x={40} y={-90} width={90} height={160} fill="#8a5632" stroke={KC.ink} strokeWidth={6} />
    <rect x={50} y={-80} width={70} height={140} fill={KC.ink} />
    <text x={85} y={-100} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>SALIDA</text>
    <line x1={-130} y1={66} x2={140} y2={66} stroke={KC.ink} strokeWidth={6} />
    {out}
  </g>;
}

// Balanza: inclina hacia el lado con más peso. inc -1..1.
function Balanza({ T, x, y, inc = 0 }) {
  const a = inc * 12;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -90 260 L 90 260 L 20 220 L -20 220 Z" fill="#7f8ba3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-14} y={-20} width={28} height={244} fill="#7f8ba3" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${a})`}>
      <rect x={-330} y={-34} width={660} height={24} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
      {[-300, 300].map((px) => <g key={px} transform={`translate(${px} -22) rotate(${-a})`}>
        <line x1={-60} y1={0} x2={-80} y2={110} stroke={KC.ink} strokeWidth={5} /><line x1={60} y1={0} x2={80} y2={110} stroke={KC.ink} strokeWidth={5} />
        <path d="M -110 110 L 110 110 Q 90 160 0 160 Q -90 160 -110 110 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
      </g>)}
    </g>
    <circle cy={-22} r={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function CallCenter() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, S: CUES.Sugerencia, N: CUES.Numeros, P: CUES.Pregunta, M: CUES.Mejores, X: CUES.Expertos, Cl: CUES.Clientes, Co: CUES.Contraste, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const N2 = K.N + 3.9; // segunda línea de "Numeros" (novatos / expertos)
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // chats pendientes del nuevo: se apilan y, con la IA, bajan
  const pend = Math.max(1, Math.min(9, Math.floor(1 + (T - K.G) * 2.6))) - Math.floor(8 * kprog(T, K.G + 4.2, K.G + 7.0));
  const calmaG = kprog(T, K.G + 5.6, K.G + 6.2);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú, nuevo; el de al lado, años */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cubiculo x={290} y={1110} T={T} quien="nuevo" pend={Math.max(0, pend)} calma={calmaG} robot={kprog(T, K.G + 3.2, K.G + 3.7, kEase.rebote)} />
          <Cubiculo x={790} y={1110} T={T} quien="veterano" color="#e9f3ff" taza />
          <Soplo T={T} at={K.G + 3.9} x={330} y={700} s={0.9} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.2} until={K.G + 5.4} texto="tú · primer día" x={290} y={560} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.G + 3.1} until={K.E - 0.2} texto="el de al lado · años" x={790} y={560} tam={38} borde={KC.blue} />
      <Chip T={T} at={K.G + 3.9} until={K.G + 5.6} texto="la IA te sopla respuestas" x={300} y={440} tam={34} borde={KC.cyan} />
      {kvisible(T, K.G + 5.8, K.E - 0.2) && <div style={{ position:'absolute', left:540, top:370, transform:`translate(-50%,-50%) scale(${kentrada(T, K.G + 5.8, K.E - 0.2, 'pop').s})`, zIndex:42,
        opacity:kentrada(T, K.G + 5.8, K.E - 0.2, 'pop').o, display:'flex', alignItems:'center', gap:22 }}>
        <div style={{ background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:24, padding:'12px 26px', textAlign:'center', boxShadow:`8px 8px 0 ${KC.ink}` }}>
          <div style={{ font:`400 92px/1 ${KF.titulo}`, color:KC.cyan, WebkitTextStroke:`3px ${KC.ink}` }}>2 meses</div>
          <div style={{ font:`900 32px ${KF.texto}`, color:KC.ink }}>con IA</div></div>
        <div style={{ font:`400 100px ${KF.titulo}`, color:KC.ink }}>=</div>
        <div style={{ background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:24, padding:'12px 26px', textAlign:'center', boxShadow:`8px 8px 0 ${KC.ink}` }}>
          <div style={{ font:`400 92px/1 ${KF.titulo}`, color:KC.gold, WebkitTextStroke:`3px ${KC.ink}` }}>+6 meses</div>
          <div style={{ font:`900 32px ${KF.texto}`, color:KC.ink }}>sin IA</div></div>
      </div>}

      {/* 2 · el estudio */}
      <Escena T={T} a={K.E} b={K.S}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 40 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8), t0 = K.E + 3.4 + i * 0.04;
          const conIA = [0, 3, 5, 6, 9, 12, 14, 17, 18, 21, 23, 26, 28, 31, 33, 36, 39].includes(i);
          return <g key={i} opacity={kprog(T, t0, t0 + 0.2)}><Diadema x={150 + c * 112} y={800 + f * 86} s={kprog(T, t0, t0 + 0.35, kEase.rebote)} T={T}
            ia={conIA ? kprog(T, K.E + 5.2 + (i % 5) * 0.08, K.E + 5.5 + (i % 5) * 0.08) : 0} /></g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.3} anio="2025" quien="Brynjolfsson, Li y Raymond" revista="Stanford y MIT · Quarterly Journal of Economics" y={760} />
      {T >= K.E + 3.5 && T < K.S + 0.3 && <div style={{ opacity:1 - kprog(T, K.S - 0.2, K.S + 0.2) }}>
        <Contador T={T} at={K.E + 3.5} hasta={5172} dur={1.6} x={340} y={490} tam={110} color={KC.yellow} />
        <Chip T={T} at={K.E + 3.7} until={K.S - 0.25} texto="agentes de soporte" x={340} y={590} tam={34} borde={KC.ink} />
      </div>}
      <Chip T={T} at={K.E + 5.2} until={K.S - 0.25} texto="a una parte le llegó la IA · 2020–2021" x={540} y={700} tam={34} borde={KC.cyan} />

      {/* 3 · la sugerencia: el agente decide */}
      <Escena T={T} a={K.S} b={K.N}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      {kvisible(T, K.S, K.N - 0.2) && (() => { const e = kentrada(T, K.S, K.N - 0.2, 'sube'), sug = kprog(T, K.S + 1.2, K.S + 1.6, kEase.sale),
        cur = kprog(T, K.S + 2.4, K.S + 3.1, kEase.sale), clic = T >= K.S + 3.2, env = kprog(T, K.S + 3.3, K.S + 3.7, kEase.sale);
        return <div style={{ position:'absolute', left:340, top:500, width:690, height:640, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.5}px)`,
          background:'#10131a', border:`10px solid ${KC.ink}`, borderRadius:36, boxShadow:`14px 14px 0 ${KC.ink}`, overflow:'hidden' }}>
          <div style={{ height:70, background:'#2b3445', display:'flex', alignItems:'center', padding:'0 26px', font:`700 30px ${KF.mono}`, color:KC.texto, gap:14 }}>
            <div style={{ width:18, height:18, borderRadius:9, background:VERDE }}></div>chat con cliente</div>
          <div style={{ position:'absolute', left:26, top:100, maxWidth:470, background:'#262c3a', color:KC.texto, borderRadius:'28px 28px 28px 6px', padding:'16px 24px',
            font:`800 32px/1.25 ${KF.texto}`, opacity:kprog(T, K.S + 0.3, K.S + 0.6) }}>No puedo entrar a mi cuenta y ya me urge.</div>
          <div style={{ position:'absolute', right:26, top:260, width:470, opacity:sug * (1 - env), transform:`scale(${klerp(0.7, 1, sug)})`, transformOrigin:'100% 0' }}>
            <div style={{ font:`700 24px ${KF.mono}`, color:KC.cyan, marginBottom:8, textAlign:'right' }}>sugerencia de la IA</div>
            <div style={{ border:`5px dashed ${KC.cyan}`, borderRadius:'28px 28px 6px 28px', padding:'14px 22px', font:`800 30px/1.25 ${KF.texto}`, color:KC.texto }}>
              Lamento la molestia. Te ayudo a recuperar tu acceso paso a paso.</div>
          </div>
          <div style={{ position:'absolute', right:26, top:300, width:470, opacity:env, background:KC.cyan, color:KC.ink, borderRadius:'28px 28px 6px 28px', padding:'14px 22px',
            font:`800 30px/1.25 ${KF.texto}` }}>Lamento la molestia. Te ayudo a recuperar tu acceso paso a paso.</div>
          <div style={{ position:'absolute', left:0, right:0, bottom:40, display:'flex', justifyContent:'center', gap:30, opacity:sug * (1 - env) }}>
            <div style={{ background: clic ? VERDE : '#2b3445', border:`5px solid ${VERDE}`, borderRadius:999, padding:'12px 40px', font:`900 36px ${KF.texto}`, color:KC.texto }}>usar ✔</div>
            <div style={{ background:'#2b3445', border:`5px solid ${KC.red}`, borderRadius:999, padding:'12px 40px', font:`900 36px ${KF.texto}`, color:KC.texto }}>ignorar ✖</div>
          </div>
          {sug > 0 && env < 1 && <svg width={80} height={90} style={{ position:'absolute', left:klerp(560, 190, cur), top:klerp(330, 520, cur), transform:`scale(${clic && T < K.S + 3.4 ? 0.85 : 1})` }}>
            <path d="M 10 6 L 10 70 L 26 56 L 38 82 L 50 76 L 38 52 L 60 52 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></svg>}
        </div>; })()}
      <Chip T={T} at={K.S + 3.3} until={K.N - 0.2} texto="el agente decide" x={690} y={1200} tam={40} borde={VERDE} />

      {/* 4 · los números */}
      <Escena T={T} a={K.N} b={K.P}>
        <FondoLunares color={KC.mint} />
        {T < N2 + 0.3 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, N2 - 0.1, N2 + 0.3) }}>{svg(<>
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.N + 1.6 + i * 0.25, u = kprog(T, t0, t0 + 0.3, kEase.rebote);
            return <g key={i} transform={`translate(${250 + i * 116} 1010) scale(${u})`}><circle r={44} fill={VERDE} stroke={KC.ink} strokeWidth={6} />
              <path d="M -20 0 L -4 16 L 22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
        </>)}</div>}
      </Escena>
      <NumeroGigante T={T} at={K.N + 0.15} until={N2 - 0.2} valor={15} dur={0.9} prefijo="+" sufijo=" %" etiqueta="en promedio" x={640} y={680} tam={260} color={KC.yellow} />
      <Chip T={T} at={K.N + 0.9} until={N2 - 0.2} texto="casos resueltos por hora" x={640} y={880} tam={38} borde={KC.ink} />
      <BarrasH T={T} at={N2} until={K.P - 0.2} top={520} filas={[
        { at: N2 + 0.1, valor: 15, texto: '+15 %', etiqueta: 'promedio', color: KC.yellow },
        { at: N2 + 0.4, valor: 30, texto: '≈ +30 %', etiqueta: 'novatos y menos hábiles', color: VERDE },
        { at: N2 + 2.3, valor: 0.6, texto: 'casi nada', etiqueta: 'los más expertos', color: KC.red }]} />
      <MitoTachado T={T} at={N2 + 3.0} tacharEn={N2 + 3.4} until={K.P - 0.2} texto="la IA ayuda igual a todos" y={1100} tam={40} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 6 · por dentro: aprendió de los mejores */}
      <Escena T={T} a={K.M} b={K.X}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={350} y={560} ancho={380} alto={420} capas={[4, 5, 5, 3]} onda={((T - K.M) * 0.8) % 1} />
        {svg(<>
          {Array.from({ length: 4 }, (_, i) => { const t0 = K.M + 0.6 + i * 0.5, u = kprog(T, t0, t0 + 1.1, kEase.suave);
            return <ChatEstrella key={i} x={klerp(150, 340, u)} y={klerp(620 + i * 110, 770, u)} s={klerp(0.9, 0.3, u)} o={T >= t0 ? 1 - kprog(T, t0 + 0.9, t0 + 1.1) : 0} />; })}
          {Array.from({ length: 4 }, (_, i) => { const t0 = K.M + 2.4 + i * 0.5, u = kprog(T, t0, t0 + 1.0, kEase.suave);
            return <g key={i} opacity={T >= t0 ? 1 - kprog(T, t0 + 0.85, t0 + 1.0) : 0} transform={`translate(${klerp(740, 900, u)} ${klerp(770, 960, u)}) scale(${klerp(0.4, 0.7, u)})`}>
              <path d="M -90 -44 h 180 a 20 20 0 0 1 20 20 v 48 a 20 20 0 0 1 -20 20 h -120 l -26 24 v -24 h -34 a 20 20 0 0 1 -20 -20 v -48 a 20 20 0 0 1 20 -20 z" fill="#fff" stroke={KC.cyan} strokeWidth={6} strokeDasharray="12 8" />
              <rect x={-70} y={-20} width={130} height={12} rx={6} fill={KC.ink} opacity=".5" /><rect x={-70} y={4} width={90} height={12} rx={6} fill={KC.ink} opacity=".5" /></g>; })}
          <g transform="translate(905 1120)"><Agente x={0} y={0} s={0.62} T={T} cara={T > K.M + 3.6 ? 'feliz' : 'panico'} playera={KC.pink} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.M + 0.3} until={K.X - 0.2} texto="según los autores" x={540} y={420} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.M + 0.8} until={K.X - 0.2} x={70} y={540} texto="chats de los mejores ★" color={KC.gold2} />
      <Etq T={T} at={K.M + 2.6} until={K.X - 0.2} x={70} y={1060} texto="sugerencias → al nuevo" color={KC.cyan} />

      {/* 7 · a los mejores, la calidad les bajó un poco */}
      <Escena T={T} a={K.X} b={K.Cl}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cubiculo x={620} y={1110} T={T} quien="veterano" color="#e9f3ff" taza robot={1} />
          <Soplo T={T} at={K.X + 0.3} x={640} y={590} s={0.9} />
        </>)}
      </Escena>
      {kvisible(T, K.X + 0.9, K.Cl - 0.2) && (() => { const e = kentrada(T, K.X + 0.9, K.Cl - 0.2, 'pop'), baja = kprog(T, K.X + 1.4, K.X + 2.2, kEase.sale);
        return <div style={{ position:'absolute', left:70, top:740, width:300, zIndex:42, opacity:e.o, transform:`scale(${e.s})`,
          background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:24, padding:'16px 20px', boxShadow:`8px 8px 0 ${KC.ink}`, textAlign:'center' }}>
          <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink }}>calidad</div>
          <div style={{ position:'relative', height:200, margin:'10px auto 0', width:90, border:`5px solid ${KC.ink}`, borderRadius:14, background:'#fff', overflow:'hidden' }}>
            <div style={{ position:'absolute', left:0, right:0, bottom:0, height:`${klerp(88, 78, baja)}%`, background:VERDE }}></div></div>
          <div style={{ font:`400 60px ${KF.titulo}`, color:KC.red, WebkitTextStroke:`2px ${KC.ink}`, opacity:baja }}>↓ un poco</div>
        </div>; })()}
      <Chip T={T} at={K.X + 0.4} until={K.Cl - 0.2} texto="los mejores agentes" x={700} y={420} tam={38} borde={KC.blue} />

      {/* 8 · clientes más amables, menos supervisor, menos renuncias */}
      <Escena T={T} a={K.Cl} b={K.Co}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <TarjetaCli T={T} at={K.Cl + 0.2} x={190} y={890} titulo={['clientes', 'más amables']}><CaraCliente T={T} u={kprog(T, K.Cl + 0.8, K.Cl + 1.6, kEase.sale)} /></TarjetaCli>
          <TarjetaCli T={T} at={K.Cl + 1.6} x={540} y={890} titulo={['menos piden', 'al supervisor']}><Supervisor T={T} u={kprog(T, K.Cl + 2.4, K.Cl + 2.9, kEase.sale)} /></TarjetaCli>
          <TarjetaCli T={T} at={K.Cl + 3.2} x={890} y={890} titulo={['menos novatos', 'renuncian']}><Puerta T={T} at={K.Cl + 3.4} /></TarjetaCli>
        </>)}
      </Escena>

      {/* 9 · contraste con el Shot IA #16 */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<Balanza T={T} x={540} y={900} inc={-kprog(T, K.Co + 2.4, K.Co + 3.4, kEase.rebote)} />)}
      </Escena>
      {kvisible(T, K.Co + 0.2, K.Co + 2.3) && (() => { const e = kentrada(T, K.Co + 0.2, K.Co + 2.3, 'pop');
        return <div style={{ position:'absolute', left:640, top:560, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-2deg)`, opacity:e.o,
          background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'18px 40px', textAlign:'center', boxShadow:`12px 12px 0 ${KC.ink}` }}>
          <div style={{ font:`700 28px ${KF.mono}`, color:'#5a524a', whiteSpace:'nowrap' }}>otro estudio · Shot IA #16</div>
          <div style={{ font:`900 44px ${KF.texto}`, color:KC.ink, marginTop:6 }}>programadores expertos</div>
          <div style={{ font:`400 78px/1.1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`3px ${KC.ink}` }}>más lentos con IA</div>
        </div>; })()}
      <Chip T={T} at={K.Co + 2.5} until={K.C - 0.2} texto="novatos: ayuda mucho" x={240} y={1110} tam={32} borde={VERDE} />
      <Chip T={T} at={K.Co + 2.8} until={K.C - 0.2} texto="expertos: poco o nada" x={840} y={1030} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Co + 3.6} until={K.C - 0.2} texto="no ayuda igual a todos" x={650} y={560} tam={44} borde={KC.ink} />

      {/* 10 · cierre: los mismos cubículos; los trucos pasan al nuevo */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cubiculo x={290} y={1110} T={T} quien="nuevo" pend={0} calma={1} robot={1} />
          <Cubiculo x={790} y={1110} T={T} quien="veterano" color="#e9f3ff" taza />
          {(() => { const u = kprog(T, K.C + 1.0, K.C + 2.4, kEase.suave);
            return <g opacity={kprog(T, K.C + 0.8, K.C + 1.1)}>
              <path d="M 720 650 Q 620 470 470 580" fill="none" stroke={KC.ink} strokeWidth={12} strokeDasharray="22 14" strokeDashoffset={-T * 60} />
              <path d="M 720 650 Q 620 470 470 580" fill="none" stroke={KC.gold} strokeWidth={6} strokeDasharray="22 14" strokeDashoffset={-T * 60} />
              <g transform={`translate(${klerp(720, 470, u)} ${klerp(650, 580, u) - Math.sin(Math.PI * u) * 130})`}>
                <path d="M 0 -34 l 10 20 l 22 3 l -16 15 l 4 22 l -20 -11 l -20 11 l 4 -22 l -16 -15 l 22 -3 z" fill={KC.gold} stroke={KC.ink} strokeWidth={4} /></g>
            </g>; })()}
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="sus trucos → al nuevo" x={360} y={430} tam={38} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="2 meses con IA *= +6 meses sin IA.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.S - 0.1} texto="5,172 agentes: *a una parte, IA.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.N - 0.1} texto="La IA sugiere; *el agente decide.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={N2 - 0.1} texto="En promedio: *+15 % casos por hora.*" />
      <Subtitulo T={T} idx={4} at={N2 + 0.1} until={K.P - 0.1} texto="Novatos ≈ +30 %. *Expertos, casi nada.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.M - 0.1} texto="¿Por qué ayuda más *al que menos sabe?*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.X - 0.1} texto="Aprendió de *los mejores agentes.*" />
      <Subtitulo T={T} idx={7} at={K.X + 0.1} until={K.Cl - 0.1} texto="A los mejores: *calidad un poco menor.*" />
      <Subtitulo T={T} idx={8} at={K.Cl + 0.1} until={K.Co - 0.1} texto="Clientes más amables, *menos renuncias.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.C - 0.1} texto="Programadores expertos: *más lentos.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Le pasó sus trucos *al nuevo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 3.6, CUES.Sugerencia - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Sugerencia + 0.4, CUES.Numeros - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Numeros + 0.3, CUES.Numeros + 3.7, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Mejores + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Expertos + 0.3, CUES.Clientes - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Clientes + 0.3, CUES.Contraste - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Contraste + 0.5, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="44" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CallCenterApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CallCenter /></CompositionStage></div>;
}
window.CallCenterApp = CallCenterApp;
