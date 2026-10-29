// Shot Ambiental #11 · Siete mil cien compras: la bolsa de tela no es verde por arte de magia — NARRADO (N2 el número).
// Datos: Agencia de Protección Ambiental de Dinamarca (2018, cálculo de DTU), Agencia Ambiental de Inglaterra (2011, datos de 2006)
// y Chiba et al., Marine Policy (2018). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const BT = { tela:'#efe2c4', tela2:'#d8c69c', plastico:'rgba(255,255,255,.88)', mar1:'#0f3d6e', mar2:'#06142b', cafe:'#7a5a3a' };

// Bolsa de plástico normal del súper (tipo camiseta, LDPE ~40 µm). Origen: centro de la base.
function BolsaPlastico({ x, y, s = 1, rot = 0, o = 1, arruga = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M -118 0 Q -126 -120 -116 -232 L -112 -338 L -66 -338 L -58 -258 Q 0 -232 58 -258 L 66 -338 L 112 -338 L 116 -232 Q 126 -120 118 0 Q 0 14 -118 0 Z"
      fill={BT.plastico} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[-70, -40, -40, -170], [10, -30, 30, -150], [70, -60, 50, -200]].map(([a, b, c, d], i) =>
      <path key={i} d={`M ${a} ${b} q ${(c - a) / 2 + 12 * Math.sin(arruga + i)} ${(d - b) / 2} ${c - a} ${d - b}`} stroke="rgba(0,0,0,.18)" strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <path d="M -116 -232 Q 0 -214 116 -232" stroke="rgba(0,0,0,.2)" strokeWidth={4} fill="none" />
  </g>;
}
// Bolsa de tela de algodón (tote) con asas largas y costuras. Origen: centro de la base.
function BolsaTela({ x, y, s = 1, rot = 0, o = 1 }) {
  const asa = (dx) => `M ${dx - 34} -300 C ${dx - 40} -500, ${dx + 40} -500, ${dx + 34} -300`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[-62, 62].map((dx) => <g key={dx}><path d={asa(dx)} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d={asa(dx)} stroke={BT.tela2} strokeWidth={14} fill="none" strokeLinecap="round" /></g>)}
    <path d="M -135 -300 L 135 -300 L 128 0 L -128 0 Z" fill={BT.tela} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -118 -282 L 118 -282 L 112 -16 L -112 -16 Z" fill="none" stroke={BT.cafe} strokeWidth={3} strokeDasharray="10 8" opacity={0.7} />
    {/* estampado: cápsula de algodón */}
    <g transform="translate(0 -150)">
      {[[-22, -10], [22, -10], [-12, 20], [14, 20], [0, -2]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={24} fill="#fff" stroke={BT.cafe} strokeWidth={4} />)}
      <path d="M -40 30 L -14 46 L 0 34 L 14 46 L 40 30" stroke={BT.cafe} strokeWidth={6} fill="none" strokeLinejoin="round" />
    </g>
  </g>;
}
// Balanza: la tela a la izquierda y el plástico a la derecha. incl en grados.
function Balanza({ x, y, incl = 0, s = 1, tela = true, plastico = true }) {
  const a = incl * Math.PI / 180, L = 330;
  const ex = Math.cos(a) * L, ey = Math.sin(a) * L;
  const plato = (px, py, hijo) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-110} y2={150} stroke={KC.ink} strokeWidth={4} /><line x1={0} y1={0} x2={110} y2={150} stroke={KC.ink} strokeWidth={4} />
    <path d="M -140 150 Q 0 200 140 150 Z" fill="#c9ced6" stroke={KC.ink} strokeWidth={7} />
    {hijo}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 420 L 110 420 L 30 380 L 14 0 L -14 0 L -30 380 Z" fill="#8d96a3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={-ex} y1={-ey} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={-ex} y1={-ey} x2={ex} y2={ey} stroke="#b5bcc7" strokeWidth={10} strokeLinecap="round" />
    <circle r={20} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    {plato(-ex, -ey, tela && <BolsaTela x={0} y={160} s={0.5} />)}
    {plato(ex, ey, plastico && <BolsaPlastico x={0} y={160} s={0.5} />)}
  </g>;
}
// Tarjeta de estudio angosta (texto que cabe a la izquierda de Robert).
function TarjetaChica({ T, at, until, anio, linea1, linea2, x = 60, y = 330, w = 600 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, zIndex:43, transform:`scale(${e.s}) rotate(-2deg)`, transformOrigin:'0 0', opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'14px 30px 20px', boxShadow:`12px 12px 0 ${KC.ink}`, boxSizing:'border-box' }}>
    <div style={{ font:`400 110px/1 ${KF.titulo}`, color:KC.gold, WebkitTextStroke:`4px ${KC.ink}` }}>{anio}</div>
    <div style={{ font:`900 38px/1.15 ${KF.texto}`, color:KC.ink, marginTop:6 }}>{linea1}</div>
    {linea2 && <div style={{ font:`700 26px/1.3 ${KF.mono}`, color:'#5a524a', marginTop:8 }}>{linea2}</div>}
  </div>;
}
// Íconos de la vida de la bolsa (de la fábrica a la basura).
function Fabrica({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -80 0 L -80 -90 L -40 -60 L -40 -90 L 0 -60 L 0 -90 L 40 -60 L 40 -150 L 70 -150 L 70 -60 L 80 -60 L 80 0 Z" fill="#9aa3b0" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => { const u = (T * 0.6 + i / 3) % 1; return <circle key={i} cx={55 + u * 30} cy={-165 - u * 90} r={14 + u * 18} fill="#dfe3e8" stroke={KC.ink} strokeWidth={4} opacity={1 - u} />; })}
  </g>;
}
function Super({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-85} y={-110} width={170} height={110} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${-95 + i * 38} -110 l 38 0 l 0 22 q -19 18 -38 0 Z`} fill={i % 2 ? '#fff' : KC.red} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-25} y={-60} width={50} height={60} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Casa({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-90} width={140} height={90} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <path d="M -95 -85 L 0 -160 L 95 -85 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-18} y={-50} width={36} height={50} fill={KC.cafe || '#8a5a33'} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Bote({ x, y, s = 1, tapa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 0 L -95 -170 L 95 -170 L 80 0 Z" fill="#5f6b7a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-40, 0, 40].map((d) => <line key={d} x1={d} y1={-145} x2={d * 0.85} y2={-25} stroke={KC.ink} strokeWidth={5} opacity={0.5} />)}
    <g transform={`translate(-105 -175) rotate(${-tapa * 35})`}><rect x={0} y={-22} width={210} height={24} rx={8} fill="#7d8a9a" stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
// Planta de algodón: tallo, hojas lobuladas y una cápsula abierta (4 lóculos de fibra blanca) con brácteas secas.
function Algodonero({ x, y, s = 1, T = 0 }) {
  const hoja = (hx, hy, r, rot) => <g transform={`translate(${hx} ${hy}) rotate(${rot})`}>
    <path d="M 0 0 C -40 -20 -70 -70 -40 -110 C -20 -90 -10 -100 0 -140 C 10 -100 20 -90 40 -110 C 70 -70 40 -20 0 0 Z" transform={`scale(${r})`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6 / r} strokeLinejoin="round" />
    <path d="M 0 0 L 0 -120 M 0 -40 L -30 -90 M 0 -40 L 30 -90" transform={`scale(${r})`} stroke="#2b8a34" strokeWidth={4 / r} fill="none" />
  </g>;
  const capsula = (cx, cy, k) => <g transform={`translate(${cx} ${cy}) scale(${k}) rotate(${Math.sin(T * 1.2 + cx) * 3})`}>
    {[0, 90, 180, 270].map((r) => <path key={r} d="M 0 0 L -26 -70 Q 0 -60 26 -70 Z" transform={`rotate(${r + 45})`} fill={BT.cafe} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    {[[-26, -26], [26, -26], [-26, 26], [26, 26]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={36} fill="#fff" stroke={KC.ink} strokeWidth={5} />)}
    {[[-26, -26], [26, -26], [-26, 26], [26, 26]].map(([a, b], i) => <path key={'l' + i} d={`M ${a - 14} ${b} q 14 -12 28 0`} stroke="#d5d9df" strokeWidth={4} fill="none" />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 C -10 -120 10 -220 0 -360" stroke="#6b4a2b" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M 0 -150 Q 60 -190 110 -250 M 0 -230 Q -60 -260 -110 -310" stroke="#6b4a2b" strokeWidth={9} fill="none" strokeLinecap="round" />
    {hoja(-20, -110, 0.9, -50)}{hoja(25, -190, 0.8, 50)}{hoja(-10, -300, 0.7, -20)}
    {capsula(110, -260, 0.9)}{capsula(-112, -322, 0.8)}{capsula(0, -380, 1)}
  </g>;
}
// Medidor de profundidad (0 a 11,000 m).
function Profundidad({ T, x, y, alto = 760, valor }) {
  const p = valor / 11000;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={0} width={44} height={alto} rx={14} fill="rgba(255,255,255,.15)" stroke="#bfe7ff" strokeWidth={4} />
    <rect x={-14} y={8} width={28} height={Math.max(0, (alto - 16) * p)} rx={8} fill={KC.cyan} />
    {[0, 2000, 4000, 6000, 8000, 10000].map((m) => <g key={m}><line x1={24} y1={alto * m / 11000} x2={44} y2={alto * m / 11000} stroke="#bfe7ff" strokeWidth={3} />
      <text x={52} y={alto * m / 11000 + 9} style={{ font:`700 24px ${KF.mono}` }} fill="#bfe7ff">{kformato(m)}</text></g>)}
    <text x={-10} y={-24} style={{ font:`700 26px ${KF.mono}` }} fill="#fff">profundidad (m)</text>
  </g>;
}

// Los 15 indicadores del estudio danés (método ILCD), en corto.
const BT_IND = ['clima', 'ozono', 'cáncer', 'tóxicos', 'smog', 'radiación', 'partículas', 'acidez', 'eutrof. suelo', 'eutrof. río', 'eutrof. mar', 'ecotóxicos', 'fósiles', 'minerales', 'agua'];
function Tablero({ T, x = 90, y = 760, encendidos = [], tono = KC.ink }) {
  return <g transform={`translate(${x} ${y})`}>
    {BT_IND.map((n, i) => { const c = i % 5, f = Math.floor(i / 5), on = encendidos[i] || 0;
      return <g key={n} transform={`translate(${c * 182} ${f * 128})`}>
        <rect width={168} height={110} rx={18} fill={mixHex('#ffffff', i === 1 ? '#ff3b2f' : '#2fe0a8', on)} stroke={KC.ink} strokeWidth={6} />
        <text x={84} y={66} textAnchor="middle" style={{ font:`900 ${n.length > 10 ? 22 : 26}px ${KF.texto}` }} fill={KC.ink}>{n}</text>
      </g>; })}
  </g>;
}

function BolsaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, F: CUES.Fabrica, P: CUES.Pregunta, Cl: CUES.Clima, O: CUES.Ozono, R: CUES.ReinoUnido, M: CUES.Mar, Co: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const wob = 4 * Math.sin(T * 1.6);
  // vida de la bolsa: fábrica → súper → casa → basura
  const vida = kprog(T, K.E + 0.6, K.F - 0.6, kEase.suave);
  const pasos = [150, 400, 660, 920];
  const xv = klerp(pasos[0], pasos[3], vida);
  // cuadrícula de 131 usos (Reino Unido)
  const n131 = Math.round(131 * kprog(T, K.R + 1.2, K.R + 4.6, kEase.suave));
  // bajada al fondo del mar
  const baja = kprog(T, K.M + 3.2, K.M + 7.6, kEase.suave);
  const prof = 10898 * baja;
  // consejo: reúsos de la tela y la de plástico al bote
  const reusos = Math.floor(kclamp((T - K.Co - 0.6) / 0.35, 0, 12));
  const alBote = kprog(T, K.Co + 3.4, K.Co + 4.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la balanza, tela contra plástico */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(<Balanza x={540} y={760} incl={wob} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 2 · el estudio: de la fábrica a la basura */}
      <Escena T={T} a={K.E} b={K.F}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <line x1={pasos[0]} y1={1010} x2={pasos[3]} y2={1010} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" />
          <line x1={pasos[0]} y1={1010} x2={xv} y2={1010} stroke={KC.gold} strokeWidth={10} strokeLinecap="round" />
          <Fabrica x={pasos[0]} y={1150} T={T} /><Super x={pasos[1]} y={1150} /><Casa x={pasos[2]} y={1150} /><Bote x={pasos[3]} y={1150} s={0.8} />
          <BolsaTela x={xv} y={960} s={0.38} rot={Math.sin(T * 4) * 5} />
          {['fábrica', 'súper', 'casa', 'basura'].map((t, i) => <text key={t} x={pasos[i]} y={800} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={vida >= i / 3 - 0.01 ? 1 : 0.3}>{t}</text>)}
        </>)}
      </Escena>
      <TarjetaChica T={T} at={K.E + 0.2} until={K.F - 0.2} anio="2018" linea1="Agencia de Protección Ambiental de Dinamarca" linea2="cálculo: Universidad Técnica de Dinamarca (DTU)" x={50} y={330} w={620} />
      {/* 3 · fabricarla es lo que más pesa */}
      <Escena T={T} a={K.F} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Algodonero x={270} y={1110} s={1.15} T={T} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T - K.F) * 0.9 + i / 6) % 1; return <path key={i} d="M 0 -18 Q 14 0 0 10 Q -14 0 0 -18 Z" transform={`translate(${130 + i * 50} ${560 + u * 420})`} fill="#3aa0ff" stroke={KC.ink} strokeWidth={3} opacity={T > K.F + 0.4 ? 1 - u * 0.6 : 0} />; })}
          {[['fabricar', 1], ['usar', 0.08], ['tirar', 0.12]].map(([t, v], i) => { const h = 430 * v * kprog(T, K.F + 0.5 + i * 0.25, K.F + 1.6 + i * 0.25, kEase.sale);
            return <g key={t}><rect x={560 + i * 150} y={1090 - h} width={110} height={h} rx={10} fill={i === 0 ? KC.red : KC.yellow} stroke={KC.ink} strokeWidth={6} />
              <text x={615 + i * 150} y={1140} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>; })}
          <text x={765} y={600} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>impacto de la bolsa</text>
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cl} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={960} textAnchor="middle" style={{ font:`400 460px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 800)`}>?</text>
          <BolsaTela x={190} y={1150} s={0.45} rot={-6} /><BolsaPlastico x={360} y={1150} s={0.45} rot={6} arruga={T} /></>)}
      </Escena>
      {/* 5 · solo clima: 52 */}
      <Escena T={T} a={K.Cl} b={K.O}>
        <FondoLunares color={KC.yellow} />
        {svg(<Tablero T={T} y={760} encendidos={[kprog(T, K.Cl + 1.6, K.Cl + 2.0)]} />)}
      </Escena>
      {/* 6 · el ozono dispara el número */}
      <Escena T={T} a={K.O} b={K.R}>
        <FondoLunares color={KC.orange} />
        {svg((() => { const g = kprog(T, K.O + 0.6, K.O + 2.2, kEase.sale), H = 430, base = 1110;
          const hO = H * g, h0 = H * 50 / 7100 * g, h1 = H * 1400 / 7100 * g;
          return <>
            <line x1={90} y1={base} x2={660} y2={base} stroke={KC.ink} strokeWidth={6} />
            <rect x={130} y={base - hO} width={170} height={hO} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <text x={215} y={base - hO - 20} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink} opacity={g}>7,100</text>
            <text x={215} y={base + 46} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>ozono</text>
            {Array.from({ length: 14 }, (_, i) => { const hh = klerp(h0, h1, ((i * 7) % 14) / 13); return <rect key={i} x={340 + i * 22} y={base - hh} width={16} height={hh} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />; })}
            <rect x={334} y={base - h1} width={318} height={h1 - h0} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
            <text x={493} y={base + 46} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>los otros 14</text>
            <Ozono x={215} y={base - hO - 130} s={1} rot={Math.sin(T * 2) * 8} rompe={0} o={g} />
          </>; })())}
        <EscalaFija texto="usos para igualar · esquema a escala" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 7 · Reino Unido: 131 usos solo para el clima */}
      <Escena T={T} a={K.R} b={K.M}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform="translate(110 790)">{Array.from({ length: 140 }, (_, i) => { const c = i % 14, f = Math.floor(i / 14), on = i < n131, ex = i >= 131;
          return ex ? null : <rect key={i} x={c * 62} y={f * 36} width={52} height={28} rx={6} fill={on ? BT.tela : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={on ? 4 : 2} />; })}</g>)}
      </Escena>
      <TarjetaChica T={T} at={K.R + 0.2} until={K.M - 0.2} anio="2011" linea1="Agencia Ambiental de Inglaterra" linea2="(datos de 2006)" x={50} y={330} w={560} />
      {/* 8 · la basura tirada: bajada a la Fosa de las Marianas */}
      <Escena T={T} a={K.M} b={K.Co} fondo={`linear-gradient(${mixHex(BT.mar1, BT.mar2, baja)}, ${BT.mar2})`}>
        {svg(<>
          {Array.from({ length: 18 }, (_, i) => { const u = ((T * 0.25 + i / 18) % 1); return <circle key={i} cx={180 + ((i * 97) % 820)} cy={1200 - u * 900} r={4 + (i % 4) * 2} fill="none" stroke="#bfe7ff" strokeWidth={2} opacity={0.6 * (1 - u)} />; })}
          <path d={`M 160 ${1180 + (1 - baja) * 500} Q 330 ${1110 + (1 - baja) * 500} 470 ${1150 + (1 - baja) * 500} Q 620 ${1190 + (1 - baja) * 500} 760 ${1120 + (1 - baja) * 500} Q 900 ${1090 + (1 - baja) * 500} 1080 ${1160 + (1 - baja) * 500} L 1080 1920 L 160 1920 Z`} fill="#2a2f3a" stroke="#556070" strokeWidth={6} />
          <BolsaPlastico x={540 + Math.sin(T * 1.3) * 30} y={klerp(560, 1150, baja)} s={0.55} rot={Math.sin(T * 1.1) * 14} arruga={T * 2} o={kprog(T, K.M + 2.6, K.M + 3.2)} />
          {T > K.M + 2.6 && <Profundidad T={T} x={90} y={360} alto={760} valor={prof} />}
          {T > K.M + 2.6 && <text x={330} y={1270 - 860} style={{ font:`400 64px ${KF.titulo}` }} fill="#fff">{kformato(prof)} m</text>}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color="#bfe7ff" />
      </Escena>
      {/* 9 · consejo: reúsala y la de plástico al final como bolsa de basura */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <BolsaTela x={280} y={1120} s={0.95} rot={Math.sin(T * 2) * 3} />
          {Array.from({ length: reusos }, (_, i) => { const a = -Math.PI * 0.95 + i * 0.27; return <text key={i} x={280 + Math.cos(a) * 250} y={900 + Math.sin(a) * 250} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={KC.leaf} stroke={KC.ink} strokeWidth={3}>✓</text>; })}
          <Bote x={800} y={1150} s={1.1} tapa={kprog(T, K.Co + 3.0, K.Co + 3.4) * (1 - kprog(T, K.Co + 4.7, K.Co + 5.0))} />
          <BolsaPlastico x={klerp(800, 800, alBote)} y={klerp(860, 1010, alBote)} s={klerp(0.5, 0.42, alBote)} o={1 - kprog(T, K.Co + 4.5, K.Co + 4.7)} arruga={T} />
          {alBote >= 1 && <path d="M 715 965 Q 800 935 885 965" stroke={KC.ink} strokeWidth={6} fill="none" />}
          <text x={800} y={1210} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>al final: bolsa de basura</text>
        </>)}
      </Escena>
      {/* 10 · cierre: regreso a la balanza */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Balanza x={540} y={760} incl={wob} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>

      {/* números y chips */}
      <NumeroGigante T={T} at={K.G + 0.1} until={K.E - 0.2} valor={7100} dur={2.6} etiqueta="compras con tu bolsa:" x={320} y={500} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.G + 3.6} until={K.E - 0.2} texto="algodón vs. plástico · en TODOS los indicadores" y={1450} x={540} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.E + 1.2} until={K.F - 0.2} texto="de la fábrica a la basura" y={1450} x={540} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.F + 0.6} until={K.P - 0.2} x={400} y={760} texto="algodón" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 2.0} until={K.P - 0.2} texto="agua y contaminación al cultivar" y={1450} x={540} tam={32} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.Cl + 1.4} until={K.O - 0.2} valor={52} desde={7100} dur={1.4} etiqueta="solo clima:" x={540} y={490} tam={190} color={KC.mint} />
      <Chip T={T} at={K.Cl + 2.4} until={K.O - 0.2} texto="algodón convencional · solo clima: 52 usos" y={1450} x={540} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.O + 2.4} until={K.R - 0.2} texto="sin el ozono: de 50 a 1,400 usos" y={1450} x={540} tam={32} borde={KC.red} />
      <NumeroGigante T={T} at={K.R + 1.2} until={K.M - 0.2} valor={131} dur={3.4} etiqueta="solo clima:" x={830} y={500} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.R + 2.0} until={K.M - 0.2} texto="vs. bolsa de plástico usada una vez" y={1450} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.3} until={K.M + 3.0} texto="basura tirada: no se midió" y={470} x={680} tam={36} borde={KC.red} />
      <Chip T={T} at={K.M + 6.4} until={K.Co - 0.2} texto="Fosa de las Marianas · 10,898 m" y={1450} x={540} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Co + 1.0} until={K.C - 0.2} texto="reúsa la bolsa que ya tienes" y={1450} x={540} tam={36} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.C + 0.3} until={K.Ou - 0.1} valor={7100} dur={1.6} etiqueta="compras:" x={790} y={500} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="que nunca se quede en casa" y={1450} x={540} tam={36} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="7,100 compras *para empatarle al plástico.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.F - 0.1} texto="Dinamarca, 2018: *de la fábrica a la basura.*" />
      <Subtitulo T={T} idx={2} at={K.F + 0.1} until={K.P - 0.1} texto="Lo que más pesa: *fabricarla.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Cl - 0.1} texto="¿La de tela *es peor?*" />
      <Subtitulo T={T} idx={4} at={K.Cl + 0.1} until={K.O - 0.1} texto="Solo el clima: *52 usos.*" />
      <Subtitulo T={T} idx={5} at={K.O + 0.1} until={K.R - 0.1} texto="Las 7,100 salen *de la capa de ozono.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.M - 0.1} texto="Reino Unido, solo clima: *131 usos.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.Co - 0.1} texto="Una bolsa *a casi 11 km de hondo.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.C - 0.1} texto="La mejor bolsa: *la que ya tienes.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Que tu bolsa *nunca se quede en casa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 1.5, CUES.Fabrica - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Clima + 1.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ozono + 2.5, CUES.ReinoUnido - 0.25, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Mar + 0.3, CUES.Mar + 3.4, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Mar + 5.4, CUES.Consejo - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Consejo + 1.9, CUES.Cierre - 0.25, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BolsaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BolsaShot /></CompositionStage></div>;
}
window.BolsaApp = BolsaApp;
