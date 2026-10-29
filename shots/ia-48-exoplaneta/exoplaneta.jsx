// Shot IA #48 · El planeta escondido que encontró una red neuronal — NARRADO (N1 "Por dentro" de una curva de luz).
// Datos: NASA, comunicado 17-098 (14 dic 2017); Shallue y Vanderburg, The Astronomical Journal 155:94 (2018);
// NASA Exoplanet Archive (consulta del 29 oct 2026). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const ROCA = '#b5562b', ROCA2 = '#7a3416', LAVA = '#ffb02e';

// Estrella con brillo que late. apaga 0..1 = cuánto baja su brillo (exagerado para que se note).
function Estrella({ x, y, r = 200, T = 0, apaga = 0, color = KC.yellow, id = 'e' }) {
  const late = 1 + 0.025 * Math.sin(T * 2.4), b = 1 - apaga;
  return <g transform={`translate(${x} ${y})`}>
    <defs>
      <radialGradient id={`halo-${id}`}><stop offset="0.45" stopColor={color} stopOpacity={0.55 * b} /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient>
      <radialGradient id={`disco-${id}`} cx="0.42" cy="0.4"><stop offset="0" stopColor="#fffbe0" /><stop offset="0.6" stopColor={color} /><stop offset="1" stopColor={KC.orange} /></radialGradient>
    </defs>
    <circle r={r * 1.9 * late} fill={`url(#halo-${id})`} />
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2 + T * 0.15, l = r * (1.18 + 0.08 * Math.sin(T * 3 + i));
      return <line key={i} x1={Math.cos(a) * r * 1.06} y1={Math.sin(a) * r * 1.06} x2={Math.cos(a) * l} y2={Math.sin(a) * l} stroke={color} strokeWidth={r * 0.05} strokeLinecap="round" opacity={0.7 * b} />; })}
    <circle r={r * late} fill={`url(#disco-${id})`} stroke={KC.ink} strokeWidth={Math.max(4, r * 0.035)} />
    <circle r={r * late} fill="#000" opacity={apaga * 0.5} />
  </g>;
}
// Cielo nocturno con estrellitas que titilan.
function Cielo({ T, n = 90, seed = 7, fondo = KC.noche }) {
  const r = krng(seed), est = Array.from({ length: n }, () => ({ x: r() * KW, y: r() * KH, s: 2 + r() * 4, f: 1 + r() * 3, ph: r() * 6 }));
  return <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 35%, #1b2550 0%, ${fondo} 70%)` }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {est.map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={e.s} fill="#fff" opacity={0.35 + 0.45 * Math.abs(Math.sin(T * e.f + e.ph))} />)}
    </svg>
  </div>;
}
// Valor de brillo de una curva (1 = normal) en u 0..1, con caídas en forma de "U" y ruido.
function brilloEn(u, caidas, ruido, seed) {
  let v = 1;
  for (const c of caidas) { const d = Math.abs(u - c.c) / c.w; if (d < 1) v -= c.d * (d < 0.6 ? 1 : 1 - (d - 0.6) / 0.4); }
  const n = Math.sin(u * 173 + seed) * 0.5 + Math.sin(u * 391 + seed * 3) * 0.3 + Math.sin(u * 911 + seed * 7) * 0.2;
  return v + n * ruido;
}
// Panel de curva de luz: brillo contra tiempo. prog 0..1 = hasta dónde se dibuja; marca = caída resaltada.
function CurvaLuz({ x, y, w, h, prog = 1, caidas = [], ruido = 0.004, seed = 1, color = KC.yellow, fondo = 'rgba(10,14,30,.88)', ejes = true, marca = null, grosor = 6, escala = 0.2 }) {
  const N = 220, pts = [];
  for (let i = 0; i <= N * prog; i++) { const u = i / N, v = brilloEn(u, caidas, ruido, seed); pts.push(`${(x + 30 + u * (w - 60)).toFixed(1)},${(y + h * 0.3 + (1 - v) / escala * h * 0.6).toFixed(1)}`); }
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={22} fill={fondo} stroke={KC.ink} strokeWidth={6} />
    {ejes && <><text x={x + 26} y={y + 38} style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.7)">brillo</text>
      <text x={x + w - 26} y={y + h - 16} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill="rgba(246,243,236,.6)">tiempo →</text></>}
    {marca && <rect x={x + 30 + (marca.c - marca.w * 1.6) * (w - 60)} y={y + 14} width={marca.w * 3.2 * (w - 60)} height={h - 28} rx={14} fill="none" stroke={marca.color || KC.mint} strokeWidth={6} strokeDasharray="14 10" opacity={marca.o == null ? 1 : marca.o} />}
    {pts.length > 1 && <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={grosor} strokeLinejoin="round" strokeLinecap="round" />}
    {pts.length > 1 && prog < 1 && <circle cx={+pts[pts.length - 1].split(',')[0]} cy={+pts[pts.length - 1].split(',')[1]} r={11} fill="#fff" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}
// Telescopio espacial Kepler (dibujo esquemático): tubo con parasol cortado en diagonal y panel solar.
function Telescopio({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 1.6) * 6;
  return <g transform={`translate(${x} ${y + b}) rotate(-28) scale(${s})`}>
    <rect x={-60} y={-250} width={120} height={330} fill="#e9edf5" stroke={KC.ink} strokeWidth={8} />
    <path d="M -60 -250 L 60 -300 L 60 -250 Z" fill="#c9d0de" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-250} rx={60} ry={14} fill="#1d2b4a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-75} y={80} width={150} height={90} rx={8} fill="#c9a43a" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(-75 120)"><rect x={-170} y={-50} width={150} height={100} fill="#1f3c8c" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2].map((k) => <line key={k} x1={-170 + 50 * k + 50} y1={-50} x2={-170 + 50 * k + 50} y2={50} stroke="#7fa2ff" strokeWidth={3} />)}
      <line x1={-170} y1={0} x2={-20} y2={0} stroke="#7fa2ff" strokeWidth={3} /><line x1={-20} y1={0} x2={0} y2={0} stroke={KC.ink} strokeWidth={8} /></g>
    <g transform="translate(75 120)"><rect x={20} y={-50} width={150} height={100} fill="#1f3c8c" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2].map((k) => <line key={k} x1={20 + 50 * k} y1={-50} x2={20 + 50 * k} y2={50} stroke="#7fa2ff" strokeWidth={3} />)}
      <line x1={20} y1={0} x2={170} y2={0} stroke="#7fa2ff" strokeWidth={3} /><line x1={0} y1={0} x2={20} y2={0} stroke={KC.ink} strokeWidth={8} /></g>
  </g>;
}
// Cuadrícula de 100 × 100 = 10 000 "focos" (patrón CSS) con uno solo apagado.
function Focos({ T, at, until, x, y, lado = 600, apaga }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), c = lado / 100, off = kprog(T, apaga, apaga + 0.3, kEase.sale), anillo = kprog(T, apaga + 0.2, apaga + 0.9, kEase.sale);
  const fx = x + 63 * c, fy = y + 41 * c;
  return <div style={{ position:'absolute', left:x, top:y, width:lado, height:lado, zIndex:30, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'50% 50%',
    background:KC.yellow, backgroundImage:`radial-gradient(circle, #fff6b0 ${c * 0.22}px, ${KC.yellow} ${c * 0.3}px, #b88a00 ${c * 0.5}px)`, backgroundSize:`${c}px ${c}px`,
    border:`7px solid ${KC.ink}`, borderRadius:12, boxShadow:'0 0 60px rgba(255,225,26,.55)' }}>
    <div style={{ position:'absolute', left:63 * c, top:41 * c, width:c, height:c, background:'#000', opacity:off }}></div>
    <div style={{ position:'absolute', left:fx - x + c / 2, top:fy - y + c / 2, width:120, height:120, marginLeft:-60, marginTop:-60, borderRadius:'50%', border:`6px solid ${KC.red}`,
      opacity:anillo, transform:`scale(${klerp(3, 1, anillo)})`, boxShadow:'0 0 0 4px #000' }}></div>
  </div>;
}
// Mini curva para el montón de señales (tarjeta con etiqueta).
function MiniCurva({ x, y, w = 420, h = 110, caidas, ruido, seed, etiqueta, colorEt = KC.mint, o = 1, color = KC.yellow }) {
  return <g opacity={o}>
    <CurvaLuz x={x} y={y} w={w} h={h} caidas={caidas} ruido={ruido} seed={seed} ejes={false} grosor={4} escala={0.12} color={color} />
    {etiqueta && <g transform={`translate(${x + w - 16} ${y + 8})`}><rect x={-150} y={0} width={150} height={40} rx={12} fill={colorEt} stroke={KC.ink} strokeWidth={4} />
      <text x={-75} y={29} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Planeta (círculo con trazo grueso); lava = grietas brillantes.
function Planeta({ x, y, r, color, anillo = false, lava = false, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {anillo && <ellipse rx={r * 1.8} ry={r * 0.45} fill="none" stroke="#e6cf8f" strokeWidth={Math.max(3, r * 0.18)} transform="rotate(-18)" />}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, Math.min(8, r * 0.12))} />
    {lava && <g opacity={0.75 + 0.25 * Math.sin(T * 5)}>
      <path d={`M ${-r * 0.7} ${-r * 0.2} L ${-r * 0.3} ${-r * 0.05} L ${-r * 0.1} ${-r * 0.4} L ${r * 0.35} ${-r * 0.3}`} stroke={LAVA} strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
      <path d={`M ${-r * 0.5} ${r * 0.45} L ${-r * 0.05} ${r * 0.25} L ${r * 0.3} ${r * 0.5} L ${r * 0.65} ${r * 0.15}`} stroke={LAVA} strokeWidth={r * 0.06} fill="none" strokeLinecap="round" />
      <circle cx={r * 0.35} cy={r * 0.0} r={r * 0.12} fill={ROCA2} stroke={LAVA} strokeWidth={r * 0.03} />
      <circle cx={-r * 0.45} cy={-r * 0.55} r={r * 0.08} fill={ROCA2} stroke={LAVA} strokeWidth={r * 0.025} />
    </g>}
    <path d={`M ${-r * 0.55} ${-r * 0.55} A ${r} ${r} 0 0 1 ${r * 0.2} ${-r * 0.9}`} stroke="rgba(255,255,255,.45)" strokeWidth={Math.max(2, r * 0.08)} fill="none" strokeLinecap="round" />
  </g>;
}
// Fila de un sistema planetario: estrella (media) a la izquierda y ocho planetas a escala de radio (raíz para que quepan).
function Sistema({ T, at, y, nombre, estrella, planetas, colorEt }) {
  const e = kprog(T, at, at + 0.5, kEase.sale);
  const xs = [270, 345, 420, 505, 600, 705, 830, 975];
  return <g opacity={e}>
    <path d={`M 0 ${y - 150} A 150 150 0 0 1 0 ${y + 150} Z`} transform={`translate(${-60 + 60 * e} 0)`} fill={estrella} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={y} r={150} fill="none" />
    {planetas.map((p, i) => { const r = 9 + Math.sqrt(p.r) * 15, ap = kprog(T, at + 0.3 + i * 0.12, at + 0.6 + i * 0.12, kEase.rebote);
      return <g key={i} transform={`translate(${xs[i]} ${y}) scale(${ap})`}><Planeta x={0} y={0} r={r} color={p.c} anillo={p.anillo} lava={p.lava} T={T} />
        {p.etq && <text x={0} y={r + 34} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{p.etq}</text>}</g>; })}
    <g transform={`translate(190 ${y - 120})`}><rect x={0} y={-34} width={nombre.length * 24 + 50} height={52} rx={14} fill={colorEt} stroke={KC.ink} strokeWidth={5} />
      <text x={25} y={3} style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{nombre}</text></g>
  </g>;
}
// Radios (en radios terrestres): Sistema Solar y Kepler-90 (NASA Exoplanet Archive, KOI-351; orden por periodo b, c, i, d, e, f, g, h).
const SOL = [{ r: 0.38, c: '#9c8f86' }, { r: 0.95, c: '#e8c27a' }, { r: 1, c: '#3a8dde' }, { r: 0.53, c: '#d2603a' }, { r: 11.2, c: '#d9a066' }, { r: 9.4, c: '#e6cf8f', anillo: true }, { r: 4, c: '#8fd8e8' }, { r: 3.9, c: '#4d6fe0' }];
const K90 = [{ r: 1.31, c: '#c98a5a' }, { r: 1.19, c: '#b07a55' }, { r: 1.32, c: ROCA, lava: true, etq: '90i' }, { r: 2.87, c: '#7fb0c9' }, { r: 2.66, c: '#93c4a8' }, { r: 2.88, c: '#a49ad6' }, { r: 7.72, c: '#d9b07a' }, { r: 11.25, c: '#c98f5a' }];

function Exoplaneta() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Tr: CUES.Transito, Ke: CUES.Kepler, Ru: CUES.Ruido, P: CUES.Pregunta, En: CUES.Entrena, Bu: CUES.Busca, H: CUES.Hallazgo, Em: CUES.Empate, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, H2 = K.H + 3.9;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho y cierre: la misma estrella con su curva de luz (la caída se exagera para que se vea)
  const CA = [{ c: 0.55, w: 0.07, d: 0.11 }];
  const progG = kprog(T, K.G + 0.05, K.Tr + 0.2), progC = kprog(T, K.C + 0.1, K.Ou - 0.4);
  const cruce = (p, c) => kclamp((p - c.c) / (c.w * 1.1), -1.6, 1.6);
  const apagaG = Math.max(0, 1 - Math.abs(progG - 0.55) / 0.07) * 0.18, apagaC = Math.max(0, 1 - Math.abs(progC - 0.55) / 0.07) * 0.18;
  // tránsito en grande
  const pT = kprog(T, K.Tr + 0.1, K.Tr + 2.6, kEase.suave);
  // red neuronal
  const onda = T > K.En + 1.2 ? ((T - K.En - 1.2) / 1.1) % 1 : null;
  // búsqueda en 670 estrellas
  const scan = kprog(T, K.Bu + 2.6, K.H - 0.3);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la estrella que parpadea */}
      <Escena T={T} a={K.G} b={K.Tr} zoom={0.04} origen="30% 35%">
        <Cielo T={T} />
        {svg(<>
          <Estrella x={330} y={620} r={190} T={T} apaga={apagaG} id="g" />
          <circle cx={330 + cruce(progG, CA[0]) * 190} cy={640} r={7} fill="#05060a" opacity={Math.abs(cruce(progG, CA[0])) < 1.05 ? 1 : 0} />
          <CurvaLuz x={60} y={920} w={960} h={260} prog={progG} caidas={CA} seed={2} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 1.2} until={K.Tr - 0.2} texto="planeta: invisible" x={330} y={400} tam={36} borde={KC.red} />
      {/* 2 · el tránsito de cerca y los 10 000 focos */}
      <Escena T={T} a={K.Tr} b={K.Ke} zoom={0.03}>
        <Cielo T={T} seed={9} />
        {svg(<g opacity={1 - kprog(T, K.Tr + 2.6, K.Tr + 3.1)}>
          <Estrella x={540} y={700} r={330} T={T} apaga={0.06 * Math.sin(Math.PI * pT)} id="t" />
          <circle cx={klerp(160, 920, pT)} cy={760} r={10} fill="#05060a" />
          <line x1={klerp(160, 920, pT)} y1={772} x2={330} y2={1110} stroke={KC.texto} strokeWidth={4} />
        </g>)}
      </Escena>
      <Etq T={T} at={K.Tr + 0.5} until={K.Tr + 2.6} x={330} y={1120} texto="planeta (dibujo exagerado)" tam={30} />
      <Focos T={T} at={K.Tr + 2.7} until={K.Ke - 0.2} x={440} y={500} lado={540} apaga={K.Tr + 3.6} />
      <Chip T={T} at={K.Tr + 3.9} until={K.Ke - 0.2} texto="solo 1 se apaga" x={710} y={1100} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Tr + 2.9} until={K.Ke - 0.2} texto="10 000 focos" x={710} y={440} tam={34} borde={KC.ink} />
      {/* 3 · el telescopio Kepler */}
      <Escena T={T} a={K.Ke} b={K.Ru}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <circle cx={720} cy={640} r={250} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 70 }, (_, i) => { const r = krng(40 + i), a = r() * Math.PI * 2, d = Math.sqrt(r()) * 225, on = kprog(T, K.Ke + 1.0 + i * 0.035, K.Ke + 1.2 + i * 0.035);
            return <circle key={i} cx={720 + Math.cos(a) * d} cy={640 + Math.sin(a) * d} r={4 + r() * 4} fill={KC.yellow} opacity={0.25 + 0.75 * on} />; })}
          <Telescopio x={270} y={1000} s={0.85} T={T} />
          <line x1={370} y1={830} x2={560} y2={720} stroke={KC.yellow} strokeWidth={5} strokeDasharray="16 12" opacity={kprog(T, K.Ke + 0.6, K.Ke + 1.0)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ke + 0.4} until={K.Ru - 0.2} texto="telescopio Kepler · NASA" x={330} y={430} tam={32} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ke + 1.4} until={K.Ru - 0.2} valor={150000} dur={1.6} prefijo="+" etiqueta="" x={720} y={980} tam={110} color={KC.yellow} />
      <Chip T={T} at={K.Ke + 2.0} until={K.Ru - 0.2} texto="estrellas · 4 años" x={760} y={1085} tam={34} borde={KC.yellow} />
      {/* 4 · 35 000 señales, las débiles se pierden */}
      <Escena T={T} a={K.Ru} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          {[[{ c: 0.4, w: 0.05, d: 0.06 }], [], [{ c: 0.7, w: 0.04, d: 0.012 }], [], [{ c: 0.3, w: 0.03, d: 0.01 }]].map((ca, i) => {
            const o = kprog(T, K.Ru + 0.4 + i * 0.25, K.Ru + 0.7 + i * 0.25), debil = i >= 2;
            return <MiniCurva key={i} x={i % 2 ? 560 : 80} y={630 + i * 96} w={440} h={88} caidas={ca} ruido={debil ? 0.009 : 0.004} seed={i + 3} o={o}
              color={debil ? '#9aa3b8' : KC.yellow} etiqueta={i === 0 ? 'clara ✔' : debil ? '¿?' : ''} colorEt={debil ? '#d7d2c6' : KC.mint} />; })}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ru + 0.2} until={K.P - 0.2} valor={35000} dur={1.4} etiqueta="" x={380} y={450} tam={130} color={KC.cyan} />
      <Chip T={T} at={K.Ru + 0.9} until={K.P - 0.2} texto="señales posibles" x={380} y={560} tam={34} borde={KC.cyan} />
            {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.En} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · entrenar la red neuronal */}
      <Escena T={T} a={K.En} b={K.Bu}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={420} y={640} ancho={560} alto={460} capas={[4, 6, 6, 3, 2]} onda={onda} />
        {svg(<>
          {Array.from({ length: 4 }, (_, i) => { const ciclo = 1.6, t0 = K.En + 0.8 + i * ciclo, u = kprog(T, t0, t0 + ciclo * 0.9, kEase.suave), planeta = i % 2 === 0;
            if (T < t0 || T > t0 + ciclo) return null;
            return <g key={i} transform={`translate(${klerp(-380, 30, Math.min(1, u * 1.6))} ${720 + (i % 2) * 150}) scale(${klerp(1, 0.6, Math.max(0, u * 2 - 1))})`} opacity={1 - Math.max(0, u * 3 - 2)}>
              <MiniCurva x={0} y={0} w={340} h={100} caidas={planeta ? [{ c: 0.5, w: 0.06, d: 0.07 }] : [{ c: 0.5, w: 0.2, d: 0.05 }, { c: 0.2, w: 0.04, d: -0.03 }]} ruido={0.004} seed={i + 9}
                etiqueta={planeta ? 'planeta ✔' : 'falsa alarma'} colorEt={planeta ? KC.mint : KC.coral} />
            </g>; })}
        </>, 25)}
      </Escena>
      <Chip T={T} at={K.En + 0.3} until={K.En + 4.2} texto="Christopher Shallue · Google" x={540} y={420} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.En + 0.9} until={K.En + 4.2} texto="Andrew Vanderburg · astrónomo" x={540} y={510} tam={36} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.En + 4.2} until={K.Bu - 0.2} valor={15000} dur={1.2} prefijo="+" etiqueta="señales ya revisadas" x={380} y={470} tam={110} color={KC.mint} />
      {/* 7 · el estudio y la búsqueda en 670 estrellas */}
      <Escena T={T} a={K.Bu} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<g opacity={kprog(T, K.Bu + 2.3, K.Bu + 2.8)}>
          <rect x={360} y={470} width={660} height={640} rx={26} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 670 }, (_, i) => { const c = i % 26, rr = Math.floor(i / 26), u = (rr + c / 26) / 26, hecho = scan > u;
            return <circle key={i} cx={392 + c * 23.8} cy={495 + rr * 23} r={hecho ? 6 : 4.5} fill={hecho ? KC.yellow : '#55607a'} />; })}
          <rect x={372} y={488 + scan * 600} width={636} height={14} rx={7} fill={KC.cyan} opacity={scan > 0 && scan < 1 ? 0.8 : 0} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Bu + 0.15} until={K.Bu + 2.3} anio="2017" quien="Google + Univ. de Texas en Austin" revista="Shallue y Vanderburg · The Astronomical Journal (2018)" y={760} />
      <Chip T={T} at={K.Bu + 2.9} until={K.H - 0.2} texto="670 estrellas con señales de planetas" x={690} y={420} tam={32} borde={KC.ink} />
      {/* 8 · el hallazgo: Kepler-90i */}
      <Escena T={T} a={K.H} b={H2}>
        <Cielo T={T} seed={13} />
        {svg(<>
          <CurvaLuz x={60} y={430} w={960} h={300} prog={kprog(T, K.H + 0.1, K.H + 1.4)} caidas={[{ c: 0.62, w: 0.035, d: 0.022 }]} ruido={0.007} seed={21} escala={0.12}
            marca={T > K.H + 1.5 ? { c: 0.62, w: 0.035, o: kprog(T, K.H + 1.5, K.H + 1.8) } : null} />
          <g opacity={kprog(T, K.H + 1.9, K.H + 2.4)}>
            <Estrella x={540} y={980} r={110} T={T} id="k90" />
            {[150, 175, 205].map((ro, i) => <ellipse key={i} cx={540} cy={980} rx={ro} ry={ro * 0.32} fill="none" stroke="rgba(246,243,236,.35)" strokeWidth={3} />)}
            <ellipse cx={540} cy={980} rx={175} ry={56} fill="none" stroke={KC.mint} strokeWidth={6} strokeDasharray="12 8" opacity={kprog(T, K.H + 2.5, K.H + 2.9)} />
            <g opacity={kprog(T, K.H + 2.5, K.H + 2.9)}><Planeta x={540 + Math.cos(T * 1.4) * 175} y={980 + Math.sin(T * 1.4) * 56} r={20} color={ROCA} T={T} lava /></g>
          </g>
        </>)}
      </Escena>
      <Etq T={T} at={K.H + 2.0} until={H2 - 0.2} x={560} y={850} texto="estrella Kepler-90" tam={30} />
      <Chip T={T} at={K.H + 2.7} until={H2 - 0.2} texto="¡nuevo: Kepler-90i!" x={540} y={1170} tam={44} borde={KC.mint} />
      <Escena T={T} a={H2} b={K.Em}>
        <FondoLunares color={KC.coral} />
        {svg(<>
          <Planeta x={400} y={690} r={200 * kprog(T, H2 - 0.1, H2 + 0.5, kEase.rebote)} color={ROCA} T={T} lava />
        </>)}
      </Escena>
      <Chip T={T} at={H2 + 0.3} until={K.Em - 0.2} texto="probablemente rocoso" x={400} y={430} tam={36} borde={KC.ink} />
      <Chip T={T} at={H2 + 1.6} until={K.Em - 0.2} texto="1 vuelta = 14.4 días" x={540} y={960} tam={40} borde={KC.yellow} />
      <Chip T={T} at={H2 + 3.0} until={K.Em - 0.2} texto="> 400 °C (estimado)" x={540} y={1040} tam={40} borde={KC.red} />
      <Chip T={T} at={H2 + 3.8} until={K.Em - 0.2} texto="≈ 30 % más grande que la Tierra" x={540} y={1120} tam={30} borde={KC.ink} />
      {/* 9 · empate: 8 = 8 */}
      <Escena T={T} a={K.Em} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Sistema T={T} at={K.Em + 0.3} y={830} nombre="Sistema Solar · 8" estrella={KC.orange} planetas={SOL} colorEt={KC.cyan} />
          <Sistema T={T} at={K.Em + 1.4} y={1075} nombre="Kepler-90 · 8" estrella={'#ffd84a'} planetas={K90} colorEt={KC.mint} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Em + 2.4} until={K.C - 0.2} valor={8} desde={8} dur={0.1} prefijo="8 = " etiqueta="" x={380} y={480} tam={150} color={KC.pink} />
      <Chip T={T} at={K.Em + 3.6} until={K.C - 0.2} texto="ninguna otra estrella conocida con 8 · NASA, oct 2026" x={540} y={575} tam={26} borde={KC.ink} />
      {/* 10 · cierre: la misma estrella, ahora sabemos qué la apaga */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="30% 35%">
        <Cielo T={T} />
        {svg(<>
          <Estrella x={330} y={620} r={190} T={T} apaga={apagaC} id="c" />
          <ellipse cx={330} cy={640} rx={250} ry={40} fill="none" stroke={KC.mint} strokeWidth={4} strokeDasharray="12 8" opacity={0.7} />
          <Planeta x={330 + cruce(progC, CA[0]) * 160} y={640 + (Math.abs(cruce(progC, CA[0])) > 1.2 ? 0 : 0)} r={16} color={ROCA} T={T} lava />
          <CurvaLuz x={60} y={920} w={960} h={260} prog={progC} caidas={CA} seed={2} marca={progC > 0.6 ? { c: 0.55, w: 0.07, o: kprog(T, K.C + 2.0, K.C + 2.4) } : null} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="un mundo pasando enfrente" x={330} y={400} tam={36} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Tr - 0.1} texto="Tus ojos nunca lo verán: *su estrella se apaga.*" />
      <Subtitulo T={T} idx={1} at={K.Tr + 0.1} until={K.Ke - 0.1} texto="De unos 10 000 focos, *se apaga uno.*" />
      <Subtitulo T={T} idx={2} at={K.Ke + 0.1} until={K.Ru - 0.1} texto="Kepler: *+150 000 estrellas,* 4 años." />
      <Subtitulo T={T} idx={3} at={K.Ru + 0.1} until={K.P - 0.1} texto="35 000 señales: *las débiles se perdían.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.En - 0.1} texto="¿Y si *una máquina* lo hallaba?" />
      <Subtitulo T={T} idx={5} at={K.En + 0.1} until={K.Bu - 0.1} texto="Una *red neuronal* aprendió de +15 000 señales." />
      <Subtitulo T={T} idx={6} at={K.Bu + 0.1} until={K.H - 0.1} texto="2017: *670 estrellas* a revisar." />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={H2 - 0.1} texto="Escondido: *Kepler-90i.*" />
      <Subtitulo T={T} idx={8} at={H2 + 0.1} until={K.Em - 0.1} texto="Probablemente rocoso: *14 días por vuelta.*" />
      <Subtitulo T={T} idx={9} at={K.Em + 0.1} until={K.C - 0.1} texto="Ocho planetas: *igual que el Sol.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es falla: *es un mundo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Transito + 2.8, CUES.Kepler - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Ruido + 0.5, CUES.Pregunta - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Entrena + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Entrena + 4.2, CUES.Busca - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Busca + 3.0, CUES.Hallazgo - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Hallazgo + 4.2, CUES.Empate - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Empate + 0.4, CUES.Empate + 3.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="48" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ExoplanetaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Exoplaneta /></CompositionStage></div>;
}
window.ExoplanetaApp = ExoplanetaApp;
