// Shot Ambiental #10 · Tu suéter se deshace en plástico cada vez que lo lavas (microfibras) — NARRADO (N2 el número + N1 por dentro).
// Datos: Napper y Thompson 2016 (Plymouth), Murphy et al. 2016 (Escocia), Corradini et al. 2019 (Chile), Cotton et al. 2020,
// Kelly et al. 2019, Napper, Barrett y Thompson 2020. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const MF_AZUL = '#2f8fd8', MF_GRIS = '#8d97a3', MF_LODO = '#7a4a22', MF_SUETER = '#ff4f8b';
const MF_HILOS = ['#ff4f8b', '#ffe11a', '#00d2ff', '#b18cff', '#ff8a1f', '#2fe0a8'];

// Hilito (microfibra): línea larga, delgada y ondulada (no una bolita).
function Hilito({ x, y, len = 46, rot = 0, color = MF_SUETER, w = 4, o = 1, T = 0, seed = 1 }) {
  const ond = 6 * Math.sin(T * 2 + seed);
  return <path d={`M ${-len / 2} 0 Q ${-len / 4} ${-8 - ond} 0 0 T ${len / 2} 0`} transform={`translate(${x} ${y}) rotate(${rot})`}
    stroke={color} strokeWidth={w} fill="none" strokeLinecap="round" opacity={o} />;
}
// Nube de hilitos que flotan dentro de un círculo (agua del tambor) de radio r.
function NubeHilos({ T, n = 18, r = 120, seed = 3, o = 1, vel = 1 }) {
  const rr = krng(seed), hs = Array.from({ length: n }, () => ({ a: rr() * 6.28, d: 0.2 + rr() * 0.7, rot: rr() * 180, c: MF_HILOS[Math.floor(rr() * MF_HILOS.length)], v: 0.4 + rr() }));
  return <g opacity={o}>{hs.map((h, i) => { const a = h.a + T * h.v * vel * 0.6; return <Hilito key={i} x={Math.cos(a) * r * h.d} y={Math.sin(a) * r * h.d} len={34} rot={h.rot + T * 40 * h.v} color={h.c} w={3.5} T={T} seed={i} />; })}</g>;
}
// Suéter de punto: cuerpo, mangas, cuello y puños con resorte; trama en "v" del tejido. delgado 0..1 lo encoge un poco.
function Sueter({ x = 0, y = 0, s = 1, rot = 0, color = MF_SUETER, delgado = 0, o = 1 }) {
  const k = 1 - 0.12 * delgado;
  const cuerpo = 'M -62 -112 Q 0 -78 62 -112 L 140 -70 L 196 70 L 140 92 L 104 6 L 104 120 L -104 120 L -104 6 L -140 92 L -196 70 L -140 -70 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k})`} opacity={o}>
    <path d={cuerpo} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-40, 0, 40, 80].map((yy) => [-70, -35, 0, 35, 70].map((xx) => <path key={`${xx}${yy}`} d={`M ${xx - 12} ${yy - 8} L ${xx} ${yy + 6} L ${xx + 12} ${yy - 8}`} stroke="rgba(0,0,0,.25)" strokeWidth={4} fill="none" />))}
    <path d="M -62 -112 Q 0 -60 62 -112" stroke={KC.ink} strokeWidth={7} fill="none" />
    <rect x={-104} y={104} width={208} height={18} fill="rgba(0,0,0,.18)" />
    {[-90, -70, -50, -30, -10, 10, 30, 50, 70, 90].map((xx) => <line key={xx} x1={xx} y1={106} x2={xx} y2={120} stroke="rgba(0,0,0,.3)" strokeWidth={3} />)}
  </g>;
}
// Lavadora de carga frontal. giro = ángulo del suéter adentro; hilos 0..1 = cuántas fibras flotan; agua = color del agua.
function Lavadora({ T, x, y, s = 1, giro = 0, hilos = 1, agua = '#9fd8ff', sueter = true, delgado = 0, id = 'lv', manguera = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}><circle cx={0} cy={40} r={150} /></clipPath></defs>
    <rect x={-210} y={-250} width={420} height={520} rx={34} fill="#f6f7fb" stroke={KC.ink} strokeWidth={8} />
    <rect x={-210} y={-250} width={420} height={92} rx={34} fill="#dfe5ee" stroke={KC.ink} strokeWidth={8} />
    <circle cx={130} cy={-204} r={28} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={130} y1={-204} x2={130 + 20 * Math.cos(T * 0.5)} y2={-204 + 20 * Math.sin(T * 0.5)} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <rect x={-170} y={-224} width={150} height={40} rx={8} fill="#1d2b3a" stroke={KC.ink} strokeWidth={5} />
    <text x={-95} y={-194} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.mint}>LAVAR</text>
    <circle cx={0} cy={40} r={178} fill="#c9d2de" stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#${id})`}>
      <rect x={-160} y={-120} width={320} height={320} fill="#e9f6ff" />
      <path d={`M -160 ${30 + 10 * Math.sin(T * 3)} Q -80 ${10 + 12 * Math.sin(T * 3 + 1)} 0 ${30} T 160 ${30 + 10 * Math.sin(T * 3 + 2)} L 160 200 L -160 200 Z`} fill={agua} opacity={0.9} />
      {sueter && <Sueter x={0} y={50} s={0.55} rot={giro} delgado={delgado} />}
      {hilos > 0 && <g transform="translate(0 40)"><NubeHilos T={T} n={Math.round(22 * hilos)} r={140} seed={5} /></g>}
      <circle cx={-60} cy={-20} r={60} fill="#fff" opacity={0.22} />
    </g>
    <circle cx={0} cy={40} r={150} fill="none" stroke={KC.ink} strokeWidth={8} />
    <rect x={150} y={20} width={22} height={50} rx={8} fill="#dfe5ee" stroke={KC.ink} strokeWidth={5} />
    {manguera && <path d="M 210 220 Q 300 230 330 300" stroke="#6b7785" strokeWidth={26} fill="none" strokeLinecap="round" />}
  </g>;
}
// Punto en una curva cuadrática (para el agua que corre por la manguera).
function mfBez(p0, p1, p2, u) { const a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, c = u * u; return [a * p0[0] + b * p1[0] + c * p2[0], a * p0[1] + b * p1[1] + c * p2[1]]; }
// Corriente de hilitos que viajan por una curva.
function Corriente({ T, p0, p1, p2, n = 10, vel = 0.5, seed = 2, o = 1 }) {
  const rr = krng(seed), hs = Array.from({ length: n }, (_, i) => ({ f: i / n, c: MF_HILOS[Math.floor(rr() * MF_HILOS.length)], rot: rr() * 180 }));
  return <g opacity={o}>{hs.map((h, i) => { const u = (h.f + T * vel) % 1; const [px, py] = mfBez(p0, p1, p2, u); return <Hilito key={i} x={px} y={py} len={26} rot={h.rot + T * 90} color={h.c} w={3.5} T={T} seed={i} />; })}</g>;
}
// Planta de tratamiento en corte (esquema): tres tanques, lodo que se acumula abajo y salida al río.
function Planta({ T, lodo = 0.3, x = 0, y = 0 }) {
  const tanque = (tx, i) => <g key={i} transform={`translate(${tx} 0)`}>
    <rect x={0} y={0} width={230} height={220} rx={16} fill="#9fb6c9" stroke={KC.ink} strokeWidth={7} />
    <rect x={7} y={30 + 6 * Math.sin(T * 2 + i)} width={216} height={183 - 6 * Math.sin(T * 2 + i)} rx={10} fill="#5f9fc9" />
    <rect x={7} y={213 - 70 * lodo} width={216} height={70 * lodo} rx={8} fill={MF_LODO} />
    {Array.from({ length: 6 }, (_, k) => <Hilito key={k} x={30 + k * 34} y={208 - 50 * lodo + (k % 2) * 10} len={22} rot={k * 37} color={MF_HILOS[k]} w={3} T={T} seed={k + i} />)}
    {i === 1 && <g transform={`translate(115 60) rotate(${T * 60})`}><line x1={-60} y1={0} x2={60} y2={0} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-60} x2={0} y2={60} stroke={KC.ink} strokeWidth={6} /></g>}
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-40} y={40} width={90} height={30} fill="#6b7785" stroke={KC.ink} strokeWidth={5} />
    {[0, 300, 600].map((tx, i) => tanque(tx + 40, i))}
    <rect x={270} y={60} width={70} height={24} fill="#6b7785" stroke={KC.ink} strokeWidth={5} />
    <rect x={570} y={60} width={70} height={24} fill="#6b7785" stroke={KC.ink} strokeWidth={5} />
    <path d="M 870 70 L 960 70 L 960 300" stroke="#6b7785" strokeWidth={26} fill="none" />
  </g>;
}
// Río (banda azul ondulada).
function Rio({ T, y, x0 = 0, x1 = KW, alto = 70 }) {
  return <g><path d={`M ${x0} ${y} Q ${(x0 + x1) / 4} ${y - 14 + 6 * Math.sin(T * 2)} ${(x0 + x1) / 2} ${y} T ${x1} ${y} L ${x1} ${y + alto} L ${x0} ${y + alto} Z`} fill={MF_AZUL} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${x0 + 80 + i * 240 + ((T * 60) % 120)} ${y + 30} q 20 -8 40 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}</g>;
}
// Campo de cultivo con surcos y brotes; lodo 0..1 = cuánto ya se esparció (de izquierda a derecha).
function Campo({ T, y = 920, lodo = 0 }) {
  return <g>
    <rect x={0} y={y} width={KW} height={210} fill="#c99a5b" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M 0 ${y + 30 + i * 48} L ${KW} ${y + 30 + i * 48}`} stroke="#a77a43" strokeWidth={10} />)}
    <rect x={0} y={y + 4} width={KW * lodo} height={200} fill={MF_LODO} opacity={0.55} />
    {Array.from({ length: 12 }, (_, i) => <g key={i} transform={`translate(${50 + i * 90} ${y + 26 + (i % 4) * 48})`}><path d="M 0 0 Q -14 -24 -24 -26 M 0 0 Q 12 -22 24 -24 M 0 0 L 0 -30" stroke={KC.leaf} strokeWidth={6} fill="none" strokeLinecap="round" /></g>)}
    {lodo > 0 && Array.from({ length: Math.round(16 * lodo) }, (_, i) => <Hilito key={i} x={30 + i * 60} y={y + 40 + (i % 3) * 52} len={22} rot={i * 47} color={MF_HILOS[i % 6]} w={3} T={T} seed={i} />)}
  </g>;
}
// Tractor que esparce lodo.
function Tractor({ T, x, y }) {
  const r = T * 200;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-80} width={120} height={70} rx={10} fill={MF_LODO} stroke={KC.ink} strokeWidth={6} />
    <rect x={-20} y={-110} width={120} height={100} rx={10} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <rect x={10} y={-160} width={70} height={60} rx={8} fill="#bfe7ff" stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(60 0) rotate(${r})`}><circle r={48} fill="#333" stroke={KC.ink} strokeWidth={6} /><line x1={-30} y1={0} x2={30} y2={0} stroke="#999" strokeWidth={6} /></g>
    <g transform={`translate(-110 10) rotate(${r})`}><circle r={30} fill="#333" stroke={KC.ink} strokeWidth={6} /><line x1={-18} y1={0} x2={18} y2={0} stroke="#999" strokeWidth={5} /></g>
    {Array.from({ length: 6 }, (_, i) => { const u = (T * 1.5 + i / 6) % 1; return <circle key={i} cx={-160 - u * 90} cy={-40 + u * u * 90} r={10} fill={MF_LODO} stroke={KC.ink} strokeWidth={3} opacity={1 - u} />; })}
  </g>;
}
// Persona caminando con el suéter puesto (para "también al traerlo puesto").
function Persona({ T, x, y, s = 1 }) {
  const p = Math.sin(T * 6), bob = Math.abs(Math.cos(T * 6)) * 8;
  return <g transform={`translate(${x} ${y - bob}) scale(${s})`}>
    <line x1={-30} y1={110} x2={-30 - 30 * p} y2={300} stroke="#2346ff" strokeWidth={46} strokeLinecap="round" />
    <line x1={30} y1={110} x2={30 + 30 * p} y2={300} stroke="#2346ff" strokeWidth={46} strokeLinecap="round" />
    <Sueter x={0} y={10} s={0.85} />
    <circle cx={0} cy={-150} r={62} fill="#f1b48f" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 -170 Q -50 -230 0 -222 Q 56 -230 62 -165 Q 30 -195 -60 -170 Z" fill="#3a2a1e" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-20} cy={-150} r={7} fill={KC.ink} /><circle cx={22} cy={-150} r={7} fill={KC.ink} />
    <path d="M -18 -118 Q 0 -106 18 -118" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Filtro en la manguera de desagüe: cilindro transparente que se llena de pelusa. lleno 0..1.
function Filtro({ T, x, y, lleno = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-90} y={-150} width={180} height={300} rx={40} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-74} y={130 - 250 * lleno} width={148} height={250 * lleno} rx={26} fill="#d8c6e8" />
    {Array.from({ length: Math.round(26 * lleno) }, (_, i) => <Hilito key={i} x={-55 + (i * 37) % 110} y={120 - (i * 23) % Math.max(10, 240 * lleno)} len={26} rot={i * 41} color={MF_HILOS[i % 6]} w={3.5} T={T} seed={i} />)}
    <rect x={-100} y={-170} width={200} height={34} rx={12} fill="#6b7785" stroke={KC.ink} strokeWidth={6} />
    <rect x={-100} y={136} width={200} height={34} rx={12} fill="#6b7785" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tarjeta de consejo (Sirve): ícono + texto, con palomita o tache.
function Consejo({ T, at, until, x, y, texto, bien = true, icono }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:440, height:250, zIndex:40, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:30, boxShadow:`10px 10px 0 ${KC.ink}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6 }}>
    <svg width={160} height={130} viewBox="-80 -65 160 130">{icono}</svg>
    <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink }}>{texto}</div>
    <div style={{ position:'absolute', right:-22, top:-22, width:70, height:70, borderRadius:35, background: bien ? KC.leaf : KC.red, border:`6px solid ${KC.ink}`,
      display:'flex', alignItems:'center', justifyContent:'center', font:`900 44px ${KF.texto}`, color:'#fff' }}>{bien ? '✓' : '✗'}</div>
  </div>;
}

function MicrofibrasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Numero, F: CUES.Fibra, D: CUES.Drenaje, Pl: CUES.Planta, P: CUES.Pregunta, Lo: CUES.Lodos, E: CUES.Estudio, S: CUES.Sirve, Fi: CUES.Filtro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const giro = T * 140;                                      // el tambor gira desde el cuadro 0
  const barras = [['acrílico', 728789, MF_SUETER], ['poliéster', 496030, KC.cyan], ['poliéster-algodón', 137951, KC.mint]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el suéter da vueltas y suelta hilitos */}
      <Escena T={T} a={K.G} b={K.N}>
        <FondoLunares color={KC.cyan} />
        {svg(<Lavadora T={T} x={330} y={860} s={1.05} giro={giro} hilos={kprog(T, K.G, K.G + 2.5)} id="lv1" />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el número: más de 700 mil fibras de 6 kg de ropa acrílica */}
      <Escena T={T} a={K.N} b={K.F}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform="translate(0 -70)">
          <rect x={250} y={1080} width={580} height={70} rx={18} fill="#dfe5ee" stroke={KC.ink} strokeWidth={8} />
          <rect x={300} y={1150} width={480} height={30} rx={8} fill="#b9c3cf" stroke={KC.ink} strokeWidth={6} />
          {[0, 1, 2, 3, 4].map((i) => <Sueter key={i} x={390 + (i % 3) * 150} y={1030 - Math.floor(i / 3) * 70} s={0.45} rot={(i - 2) * 8} color={MF_HILOS[i]} />)}
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · la fibra: unos mm de largo y < 0.02 mm de grueso (promedio) */}
      <Escena T={T} a={K.F} b={K.D}>
        <FondoLunares color={KC.lilac} />
        {svg(<Lavadora T={T} x={780} y={880} s={0.7} giro={giro} hilos={1} id="lv2" />)}
      </Escena>
      <Lupa T={T} at={K.F + 0.3} until={K.D - 0.2} x={380} y={720} r={240} fx={780} fy={908} tinte={KC.mint}
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#0E0F12" />
          <defs><linearGradient id="fibg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9fc0" /><stop offset="0.35" stopColor="#fff" /><stop offset="1" stopColor="#c2185b" /></linearGradient></defs>
          <path d={`M -20 ${r * 1.5} Q ${r * 0.8} ${r * 0.9 + 20 * Math.sin(t)} ${r * 2 + 20} ${r * 0.5}`} stroke="url(#fibg)" strokeWidth={30} fill="none" strokeLinecap="round" />
          <path d={`M -20 ${r * 1.5} Q ${r * 0.8} ${r * 0.9 + 20 * Math.sin(t)} ${r * 2 + 20} ${r * 0.5}`} stroke={KC.ink} strokeWidth={30} strokeOpacity={0.25} fill="none" strokeDasharray="2 60" />
          <path d={`M 40 ${r * 0.4} Q ${r} ${r * 0.2} ${r * 2} ${r * 0.9}`} stroke="#7fd8ff" strokeWidth={22} fill="none" strokeLinecap="round" opacity={0.6} />
          <text x={r} y={r * 1.62} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.mint}>esquema</text>
        </svg>} />
      {/* 4 · drenaje */}
      <Escena T={T} a={K.D} b={K.Pl}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g>
          <Lavadora T={T} x={300} y={800} s={0.75} giro={giro} hilos={0.6} id="lv3" />
          <path d="M 460 960 Q 760 980 780 1060" stroke="#6b7785" strokeWidth={34} fill="none" strokeLinecap="round" />
          <path d="M 460 960 Q 760 980 780 1060" stroke="#8d97a3" strokeWidth={20} fill="none" strokeLinecap="round" />
          <Corriente T={T} p0={[460, 960]} p1={[760, 980]} p2={[780, 1060]} n={9} vel={0.8} />
          <ellipse cx={790} cy={1090} rx={130} ry={34} fill="#3a4450" stroke={KC.ink} strokeWidth={7} />
          {[-80, -40, 0, 40, 80].map((d) => <line key={d} x1={790 + d} y1={1066} x2={790 + d} y2={1114} stroke="#9aa5b1" strokeWidth={6} />)}
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · planta de tratamiento en Escocia: atrapa casi todo, pero suelta 65 millones al día */}
      <Escena T={T} a={K.Pl} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<g>
          <Planta T={T} x={40} y={700} lodo={kprog(T, K.Pl + 0.5, K.Pl + 4)} />
          <Rio T={T} y={1000} x0={600} x1={KW + 20} alto={80} />
          <Corriente T={T} p0={[1000, 780]} p1={[1000, 930]} p2={[880, 1030]} n={4} vel={0.6} seed={7} />
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Lo} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={960} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 780)`}>?</text>
          <g transform="translate(70 1010) scale(0.55)"><Planta T={T} lodo={1} /></g></>)}
      </Escena>
      {/* 7 · lodos → abono en el campo; en Chile 9 de cada 10 microplásticos del lodo eran fibras */}
      <Escena T={T} a={K.Lo} b={K.E}>
        <FondoLunares color={KC.orange} />
        {svg(<g>
          <Campo T={T} y={900} lodo={kprog(T, K.Lo + 0.8, K.Lo + 4)} />
          <Tractor T={T} x={klerp(260, 1000, kprog(T, K.Lo + 0.8, K.Lo + 4.2))} y={930} />
          {Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.Lo + 3.8 + i * 0.08, K.Lo + 4.1 + i * 0.08, kEase.sale);
            return <g key={i} transform={`translate(${70 + i * 58} 640) scale(${on})`}><circle r={30} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              {i < 9 ? <Hilito x={0} y={0} len={44} rot={-20} color={MF_SUETER} w={6} T={T} seed={i} /> : <rect x={-12} y={-12} width={24} height={24} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} transform="rotate(20)" />}</g>; })}
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · el estudio de Plymouth (2016): fibras por 6 kg de ropa */}
      <Escena T={T} a={K.E} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<g>{barras.map(([n, v, c], i) => { const g = kprog(T, K.E + 2.2 + i * 0.4, K.E + 3.2 + i * 0.4, kEase.sale), w = 880 * v / 728789 * g;
          return <g key={n} transform={`translate(90 ${750 + i * 115})`}>
            <rect x={0} y={0} width={Math.max(w, 1)} height={64} rx={14} fill={c} stroke={KC.ink} strokeWidth={6} />
            <text x={14} y={-10} style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{n}</text>
            <text x={Math.max(w, 1) - 16} y={48} textAnchor="end" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink} opacity={g > 0.6 ? 1 : 0}>{kformato(v * g)}</text>
          </g>; })}
          <text x={300} y={1024} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.E + 3.4, K.E + 3.8)}>fibras por 6 kg (estimado)</text></g>)}
      </Escena>
      {/* 9 · qué ayuda */}
      <Escena T={T} a={K.S} b={K.Fi}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 10 · filtro en la salida de la lavadora (2020) */}
      <Escena T={T} a={K.Fi} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<g>
          <Lavadora T={T} x={270} y={900} s={0.8} giro={giro} hilos={0.6} id="lv4" />
          <path d="M 440 1060 Q 600 1080 640 900" stroke="#6b7785" strokeWidth={30} fill="none" strokeLinecap="round" />
          <Filtro T={T} x={760} y={900} lleno={kprog(T, K.Fi + 0.5, K.Fi + 4.2)} />
          <path d="M 760 1070 L 760 1160" stroke="#6b7785" strokeWidth={30} fill="none" />
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: el suéter puesto también suelta fibras, y de regreso a la lavadora */}
      <Escena T={T} a={K.C} b={K.C + 2.9}>
        <FondoLunares color={KC.pink} />
        {svg(<g><Persona T={T} x={640} y={860} s={1.1} />
          {Array.from({ length: 8 }, (_, i) => { const u = ((T - K.C) * 0.5 + i / 8) % 1; return <Hilito key={i} x={560 + (i * 53) % 180 + u * 40} y={880 + u * 280} len={28} rot={i * 50 + T * 60} color={MF_HILOS[i % 6]} w={3.5} o={1 - u} T={T} seed={i} />; })}</g>)}
      </Escena>
      <Escena T={T} a={K.C + 2.9} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Lavadora T={T} x={330} y={860} s={1.05} giro={giro} hilos={1} delgado={kprog(T, K.C + 3, K.Ou)} id="lv5" />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.2} until={K.N - 0.2} texto="acrílico · poliéster = plástico" y={440} x={330} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.N + 0.2} until={K.F - 0.2} texto="1 lavada" y={440} x={330} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.N + 0.3} until={K.F - 0.2} valor={700000} dur={1.6} prefijo="+" etiqueta="fibras de plástico" x={470} y={700} tam={140} color={KC.pink} />
      <Chip T={T} at={K.N + 1.4} until={K.F - 0.2} texto="6 kg de ropa acrílica" y={1045} x={540} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.F + 1.0} until={K.D - 0.2} texto="promedio ≈ 5–8 mm de largo" y={1040} x={540} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.F + 2.2} until={K.D - 0.2} texto="promedio < 0.02 mm de grueso" y={1110} x={540} tam={32} borde={KC.mint} />
      <Etq T={T} at={K.D + 0.4} until={K.Pl - 0.2} x={700} y={1010} texto="drenaje" lado="izq" tam={34} color={KC.ink} />
      <Medidor T={T} at={K.Pl + 0.6} until={K.P - 0.2} valor={(t) => 0.9841 * kprog(t, K.Pl + 0.8, K.Pl + 2.6, kEase.sale)} etiqueta="microplásticos atrapados" x={60} y={430} ancho={600} color={KC.leaf}
        texto={(v) => (v > 0.97 ? '98 %' : Math.round(v * 100) + ' %')} />
      <Chip T={T} at={K.Pl + 0.3} until={K.P - 0.2} texto="Escocia · estudio de 2016" y={570} x={360} tam={30} borde={KC.ink} />
      {T < K.P - 0.1 && <Contador T={T} at={K.Pl + 4.0} hasta={65} dur={1.6} sufijo=" millones al día" x={800} y={955} tam={38} color={KC.texto} />}
      <Etq T={T} at={K.Pl + 3.6} until={K.P - 0.2} x={1050} y={1050} texto="al río" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pl + 2.4} until={K.P - 0.2} x={300} y={960} texto="lodo" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Lo + 0.5} until={K.E - 0.2} texto="lodo → abono" y={440} x={330} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Lo + 4.3} until={K.E - 0.2} texto="Chile · 2019: 90 % de los microplásticos del lodo, fibras" y={1090} x={540} tam={25} borde={KC.ink} />
      <Etq T={T} at={K.Lo + 4.5} until={K.E - 0.2} x={90} y={720} texto="9 de 10" tam={36} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.S - 0.2} anio="2016" quien="Napper y Thompson" revista="Universidad de Plymouth" x={340} y={500} />
      <Chip T={T} at={K.S + 0.2} until={K.Fi - 0.2} texto="¿Qué ayuda?" y={440} x={540} tam={48} borde={KC.ink} />
      <Consejo T={T} at={K.S + 1.0} until={K.Fi - 0.2} x={300} y={700} texto="en frío" icono={<g><rect x={-14} y={-55} width={28} height={80} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cy={38} r={22} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} /><rect x={-6} y={0} width={12} height={36} fill={KC.cyan} /></g>} />
      <Consejo T={T} at={K.S + 1.5} until={K.Fi - 0.2} x={780} y={700} texto="ciclo corto" icono={<g><circle r={52} fill="#fff" stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={0} x2={0} y2={-36} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" /><line x1={0} y1={0} x2={26} y2={10} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" /><path d="M 0 -52 A 52 52 0 0 1 45 26 L 0 0 Z" fill={KC.mint} opacity={0.6} /></g>} />
      <Consejo T={T} at={K.S + 2.1} until={K.Fi - 0.2} x={300} y={1010} texto="carga llena" icono={<g><circle r={56} fill="#c9d2de" stroke={KC.ink} strokeWidth={6} /><circle r={44} fill={MF_SUETER} stroke={KC.ink} strokeWidth={4} />{[-20, 0, 20].map((d) => <path key={d} d={`M ${d - 12} ${-10} L ${d} 4 L ${d + 12} -10`} stroke="rgba(0,0,0,.35)" strokeWidth={4} fill="none" />)}</g>} />
      <Consejo T={T} at={K.S + 3.4} until={K.Fi - 0.2} x={780} y={1010} bien={false} texto="ciclo delicado" icono={<g><circle r={56} fill="#c9d2de" stroke={KC.ink} strokeWidth={6} /><circle r={44} fill="#5f9fc9" /><Sueter x={0} y={14} s={0.14} /><path d="M -44 -6 q 22 -12 44 0 t 44 0" stroke="#bfe7ff" strokeWidth={5} fill="none" /></g>} />
      <Medidor T={T} at={K.Fi + 0.6} until={K.C - 0.2} valor={(t) => 0.78 * kprog(t, K.Fi + 0.8, K.Fi + 4.0, kEase.sale)} etiqueta="fibras atrapadas" x={60} y={430} ancho={600} color={KC.pink}
        texto={(v) => (v > 0.77 ? '≈ 78 %' : Math.round(v * 100) + ' %')} />
      <Chip T={T} at={K.Fi + 0.3} until={K.C - 0.2} texto="Plymouth · 2020 · el mejor de 6" y={560} x={360} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Fi + 1.2} until={K.C - 0.2} x={860} y={690} texto="filtro" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.C + 2.8} texto="también al traerlo puesto" y={440} x={360} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.2} until={K.Ou - 0.1} texto="poco a poco, se va con el agua" y={1100} x={540} tam={36} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Tu suéter se deshace en *hilitos de plástico.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.F - 0.1} texto="6 kg de ropa acrílica: *+700 mil fibras.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.D - 0.1} texto="Unos milímetros de largo, *< 0.02 mm de grueso.*" />
      <Subtitulo T={T} idx={3} at={K.D + 0.1} until={K.Pl - 0.1} texto="Se van *al drenaje.*" />
      <Subtitulo T={T} idx={4} at={K.Pl + 0.1} until={K.P - 0.1} texto="Atrapa casi todo… *y suelta 65 millones al día.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Lo - 0.1} texto="¿Y los atrapados *desaparecen?*" />
      <Subtitulo T={T} idx={6} at={K.Lo + 0.1} until={K.E - 0.1} texto="Lodos de abono: *9 de 10 eran fibras.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.S - 0.1} texto="Plymouth, 2016: *la mezcla con algodón soltó menos.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.Fi - 0.1} texto="Frío, corto y *carga llena.*" />
      <Subtitulo T={T} idx={9} at={K.Fi + 0.1} until={K.C - 0.1} texto="Un filtro atrapó *cerca del 78 %.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Poco a poco, *se va con el agua.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Numero + 1.5, CUES.Fibra - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Fibra + 2.4, CUES.Drenaje - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Planta + 3.8, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Lodos + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Lodos + 4.1, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Sirve - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Filtro + 2.5, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.5, CUES.Outro - 0.1, 'avatar_12_perfil_serio', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MicrofibrasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MicrofibrasShot /></CompositionStage></div>;
}
window.MicrofibrasApp = MicrofibrasApp;
