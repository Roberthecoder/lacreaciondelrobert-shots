// Shot Fungi Mati #117 · Esa mazorca no está nevada: la moniliasis del cacao (Moniliophthora roreri) — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CC = { verde:'#8cc43c', verde2:'#5f9a24', amarillo:'#f5b62a', amarillo2:'#d98e12', cafe:'#5a3418', cafe2:'#3b210f',
  crema:'#f6eedb', crema2:'#e9dcb6', pulpa:'#fbf6ea', grano:'#e7c9c0', grano2:'#b98f86', tronco:'#7a5233', tronco2:'#5b3b22',
  hoja:'#2f9e44', hoja2:'#1f7a32', espora:'#f3e3a8', espora2:'#d9c27a', hifa:'#fff4d6' };

// Media anchura de la mazorca a lo largo (t 0 = arriba, 1 = punta).
const mzHW = (t, W) => W / 2 * Math.pow(Math.max(0, Math.sin(Math.PI * kclamp(t, 0, 1))), 0.7) * (1 - 0.38 * Math.pow(t, 3)) * (t < 0.12 ? 0.75 + 2.1 * t : 1);
function mzPath(L, W, gib = 0) {
  const N = 44, der = [], izq = [];
  for (let i = 0; i <= N; i++) { const t = i / N, y = -L / 2 + t * L;
    const g = gib * (Math.exp(-Math.pow((t - 0.38) / 0.06, 2)) * 0.10 + Math.exp(-Math.pow((t - 0.62) / 0.05, 2)) * 0.07);
    der.push([mzHW(t, W) * (1 + g), y]); izq.push([-mzHW(t, W) * (1 + g * 0.8), y]); }
  const pts = der.concat(izq.reverse());
  return 'M ' + pts.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join(' L ') + ' Z';
}
let MZ_ID = 0;
// Mazorca de cacao colgando (pedúnculo arriba). mancha 0..1 (lesión café), escarcha 0..1 (felpa blanca de esporas), gib 0..1 (abultada).
function Mazorca({ x, y, L = 420, W = 210, rot = 0, color = 'amarillo', mancha = 0, escarcha = 0, gib = 0, mpos = [0.1, 0.55], seed = 3 }) {
  const id = React.useMemo(() => 'mz' + (MZ_ID++), []);
  const c1 = CC[color], c2 = CC[color + '2'];
  const d = mzPath(L, W, gib);
  const g = krng(seed);
  const manchas = [[0, 0, 1], [0.35, -0.25, 0.7], [-0.3, 0.3, 0.75], [0.2, 0.45, 0.6], [-0.4, -0.35, 0.55]];
  const mx = mpos[0] * W, my = -L / 2 + mpos[1] * L, R = L * 0.62;
  const puntos = Array.from({ length: 70 }, () => [g() * 2 - 1, g() * 2 - 1, g()]).filter(([a, b]) => a * a + b * b < 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-13} y={-L / 2 - 46} width={26} height={60} rx={10} fill={CC.verde2} stroke={KC.ink} strokeWidth={6} />
    <clipPath id={id}><path d={d} /></clipPath>
    <path d={d} fill={c1} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g clipPath={`url(#${id})`}>
      <path d={`M ${-W * 0.28} ${-L * 0.38} Q ${-W * 0.36} 0 ${-W * 0.16} ${L * 0.38}`} stroke="rgba(255,255,255,.35)" strokeWidth={W * 0.12} fill="none" strokeLinecap="round" />
      {mancha > 0 && <g transform={`translate(${mx} ${my})`}>
        {manchas.map(([a, b, k], i) => <circle key={i} cx={a * R * mancha} cy={b * R * mancha} r={R * 0.55 * k * kEase.sale(kclamp(mancha * 1.3 - i * 0.12, 0, 1))} fill={i % 2 ? CC.cafe : CC.cafe2} />)}
      </g>}
      {escarcha > 0 && <g transform={`translate(${mx} ${my})`}>
        {manchas.map(([a, b, k], i) => <circle key={i} cx={a * R * 0.9} cy={b * R * 0.9} r={R * 0.5 * k * kEase.sale(kclamp(escarcha * 1.3 - i * 0.12, 0, 1))} fill={CC.crema} />)}
        {puntos.map(([a, b, q], i) => <circle key={'p' + i} cx={a * R * 0.95} cy={b * R * 0.95} r={3 + q * 5} fill={q > 0.5 ? CC.crema2 : '#fffaf0'} opacity={kprog(escarcha, 0.3 + q * 0.4, 0.7 + q * 0.3)} />)}
      </g>}
      {[-0.62, -0.3, 0.02, 0.34, 0.66].map((f, k) => { const pts = []; for (let i = 2; i <= 40; i++) { const t = i / 42; pts.push(`${(f * mzHW(t, W)).toFixed(1)} ${(-L / 2 + t * L).toFixed(1)}`); }
        return <path key={k} d={'M ' + pts.join(' L ')} stroke={c2} strokeWidth={6} fill="none" opacity={0.75} strokeLinecap="round" />; })}
    </g>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}

// Tronco con hojas arriba (el fruto del cacao sale directo del tronco).
function Tronco({ x, y0 = -50, y1 = 2000, ancho = 110, T = 0, hojas = true }) {
  return <g>
    <path d={`M ${x - ancho / 2} ${y1} L ${x - ancho / 2 + 8} ${y0} L ${x + ancho / 2 - 8} ${y0} L ${x + ancho / 2} ${y1} Z`} fill={CC.tronco} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M ${x - 26 + (i % 3) * 22} ${y0 + 160 + i * 270} q 8 60 -4 120`} stroke={CC.tronco2} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    {hojas && [[-210, 140, -30], [200, 90, 25], [-150, 300, -55], [170, 260, 50]].map(([dx, dy, r], i) =>
      <g key={'h' + i} transform={`translate(${x + dx} ${y0 + dy}) rotate(${r + mece(T, i + 2, 0.3) * 4})`}>
        <path d="M -120 0 Q 0 -60 120 0 Q 0 60 -120 0 Z" fill={i % 2 ? CC.hoja : CC.hoja2} stroke={KC.ink} strokeWidth={6} />
        <line x1={-110} y1={0} x2={110} y2={0} stroke="rgba(255,255,255,.35)" strokeWidth={4} />
      </g>)}
  </g>;
}

// Espora globosa de pared gruesa (vista al microscopio). r en px; elip > 1 = elipsoide.
function Espora({ x, y, r = 26, elip = 1, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <ellipse rx={r} ry={r * elip} fill={CC.espora2} stroke={KC.ink} strokeWidth={4} />
    <ellipse rx={r * 0.74} ry={r * elip - r * 0.26} fill={CC.espora} />
    <ellipse cx={-r * 0.25} cy={-r * 0.3 * elip} rx={r * 0.2} ry={r * 0.14} fill="#fffbe6" opacity={0.8} />
  </g>;
}

// Felpa al microscopio: tapete de hifas abajo y cadenas de esporas que crecen hacia arriba (las nuevas salen de la base).
function FelpaMicro({ T, a }) {
  const g = krng(21);
  const cadenas = Array.from({ length: 9 }, (_, i) => ({ x: 130 + i * 102 + (g() - 0.5) * 30, n: 4 + Math.floor(g() * 7), d: g() * 0.8, inc: (g() - 0.5) * 10 }));
  const base = 1240;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: 16 }, (_, i) => { const y = base + 20 + (i % 4) * 24, x0 = -40 + i * 75;
      return <path key={i} d={`M ${x0} ${y} q 60 ${-20 + (i % 3) * 14} 130 ${-6} t 120 ${8}`} stroke={CC.hifa} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.85} />; })}
    {cadenas.map((c, i) => { const k = kprog(T, a + 0.1 + c.d, a + 2.2 + c.d); const n = Math.round(c.n * k);
      return <g key={i} transform={`rotate(${c.inc} ${c.x} ${base})`}>
        <line x1={c.x} y1={base} x2={c.x} y2={base - 30} stroke={CC.hifa} strokeWidth={9} strokeLinecap="round" />
        {Array.from({ length: n }, (_, j) => { const el = (i * 7 + j) % 5 === 0 ? 1.45 : 1; const rr = 24 + ((i + j) % 3) * 3;
          return <Espora key={j} x={c.x} y={base - 58 - j * 54 - (el > 1 ? 6 : 0)} r={rr} elip={el} />; })}
      </g>; })}
  </svg>;
}

// Corte a lo largo: cáscara, pulpa blanca y semillas (granos). podre 0..1: las semillas se oscurecen y se pegan.
function CorteMazorca({ x, y, L = 760, W = 380, podre = 0, hifas = 0 }) {
  const d = mzPath(L, W), din = mzPath(L * 0.86, W * 0.74);
  const granos = [];
  for (let c = -2; c <= 2; c++) for (let r = 0; r < 7; r++) { const t = 0.2 + r * 0.1; const hw = mzHW(t, W * 0.74);
    const gx = c * hw * 0.36, gy = -L * 0.43 + t * L * 0.86; if (Math.abs(gx) + 26 < hw) granos.push([gx, gy, (r + c + 7) / 13]); }
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={CC.amarillo} stroke={KC.ink} strokeWidth={9} />
    <path d={din} fill={CC.pulpa} stroke={CC.amarillo2} strokeWidth={6} />
    {podre > 0 && <path d={din} fill={CC.cafe} opacity={0.55 * kprog(podre, 0.3, 1)} />}
    {granos.map(([gx, gy, q], i) => { const pp = kprog(podre, q * 0.5, q * 0.5 + 0.45);
      return <ellipse key={i} cx={gx} cy={gy} rx={30 + pp * 6} ry={42 + pp * 8} fill={mixHex(CC.grano, CC.cafe2, pp)} stroke={mixHex(CC.grano2, CC.cafe2, pp)} strokeWidth={5} />; })}
    {hifas > 0 && Array.from({ length: 10 }, (_, i) => { const g = krng(i + 40); const x0 = (g() - 0.5) * W * 0.4, y0 = -L * 0.3 + g() * L * 0.6;
      const len = 120 * kprog(hifas, i * 0.05, i * 0.05 + 0.5);
      return <path key={'h' + i} d={`M ${x0} ${y0} q ${len * 0.5} ${-len * 0.3} ${len} ${len * 0.1}`} stroke={CC.hifa} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
  </g>;
}

// Nube de esporas que se lleva el viento (hacia la derecha).
function NubeViento({ T, x, y, p, n = 70, seed = 9, lejos = 700 }) {
  if (p <= 0) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const d0 = g(), u = kclamp(p * 1.4 - d0 * 0.4, 0, 1); if (u <= 0) return null;
    const sx = x + u * lejos * (0.5 + g() * 0.7), sy = y + (g() - 0.6) * 260 * u + Math.sin(T * 3 + i) * 12;
    return <circle key={i} cx={sx} cy={sy} r={4 + g() * 6} fill={g() > 0.4 ? CC.crema : CC.espora} stroke="rgba(0,0,0,.35)" strokeWidth={1.5} opacity={1 - u * 0.5} />; })}</g>;
}
function Viento({ T, x = 100, y = 800, o = 1 }) {
  return <g opacity={o}>{[0, 1, 2].map((i) => { const u = ((T * 0.8 + i / 3) % 1);
    return <path key={i} d={`M ${x + u * 500} ${y + i * 110} q 80 -40 160 0 t 160 0`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI) * 0.9} />; })}</g>;
}
// Tableta de chocolate.
function Chocolate({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-80} width={240} height={160} rx={14} fill="#6b3a1e" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2].map((c) => [0, 1].map((r) => <rect key={c + '' + r} x={-104 + c * 72} y={-64 + r * 70} width={60} height={58} rx={6} fill="#7d4524" stroke="#4a2410" strokeWidth={4} />))}
    <path d="M -120 20 L 120 -10 L 120 80 L -120 80 Z" fill="#e9e2d0" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Calendario de 4 semanas: cada semana se marca el corte.
function Semanas({ T, a, x = 540, y = 1150 }) {
  return <div style={{ position:'absolute', left:x, top:y, transform:'translate(-50%,-50%)', zIndex:40, display:'flex', gap:16 }}>
    {[0, 1, 2, 3].map((i) => { const on = kprog(T, a + i * 0.45, a + i * 0.45 + 0.3, kEase.rebote);
      return <div key={i} style={{ width:170, height:120, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:16, textAlign:'center', boxShadow:`6px 6px 0 ${KC.ink}`, opacity:kprog(T, a - 0.6 + i * 0.1, a - 0.3 + i * 0.1) }}>
        <div style={{ font:`700 24px ${KF.mono}`, color:KC.ink, marginTop:6 }}>semana {i + 1}</div>
        <div style={{ font:`900 54px ${KF.texto}`, color:KC.red, transform:`scale(${on})` }}>✂</div>
      </div>; })}
  </div>;
}

function CacaoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, En: CUES.Entra, Es: CUES.Escondido, Se: CUES.Semillas, M: CUES.Mancha, Ex: CUES.Escarcha,
    Q: CUES.Pregunta, N: CUES.Numero, St: CUES.Estudio, Ma: CUES.Manejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caen = (t0, dur) => { const g = krng(77); return Array.from({ length: 34 }, (_, i) => { const x = g() * 1080, v = 140 + g() * 160, ph = g() * 1600;
    const y = ((T - t0) * v + ph) % 1700 + 150; return <circle key={i} cx={x + Math.sin(T * 1.5 + i) * 20} cy={y} r={5 + g() * 6} fill={CC.crema} stroke="rgba(0,0,0,.3)" strokeWidth={1.5} opacity={kprog(T, t0, t0 + 0.3) * (1 - kprog(T, t0 + dur - 0.4, t0 + dur))} />; }); };
  const viento = kprog(T, K.N + 0.6, K.N + 3.4);
  const mzSemana = kprog(T, K.Ma + 1.0, K.Ma + 1.7, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mazorca "nevada" en el tronco */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.04} origen="45% 55%">
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={250} T={T} />
          <Mazorca x={470} y={1000 + mece(T, 3, 0.3) * 6} L={440} W={230} rot={-8 + mece(T, 2, 0.4) * 2} color="amarillo" mancha={1} escarcha={1} mpos={[0.05, 0.5]} />
          <NubeViento T={T} x={520} y={980} p={kprog(T, K.G + 0.2, K.G + 5.5)} n={40} seed={4} lejos={420} />
          {caen(K.G, K.H - K.G + 0.4)}
        </svg>
      </Escena>
      {/* 1 · el hongo: solo ataca los frutos */}
      <Escena T={T} a={K.H} b={K.En} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={540} T={T} ancho={130} />
          <Mazorca x={360} y={880} L={300} W={150} rot={12} color="amarillo" mancha={1} escarcha={1} mpos={[0, 0.45]} seed={5} />
          <Mazorca x={720} y={1010} L={320} W={160} rot={-10} color="amarillo" seed={6} mancha={kprog(T, K.H + 1.2, K.H + 3.4)} mpos={[0.1, 0.6]} />
          <Mazorca x={380} y={1240} L={260} W={130} rot={8} color="verde" seed={7} />
          {[[360, 880], [720, 1010], [380, 1240]].map(([px, py], i) => { const on = kprog(T, K.H + 2.6 + i * 0.2, K.H + 3.0 + i * 0.2, kEase.rebote);
            return <circle key={i} cx={px} cy={py} r={Math.max(0.01, 175 * on)} fill="none" stroke={KC.red} strokeWidth={9} strokeDasharray="20 12" opacity={on > 0 ? 1 : 0} />; })}
        </svg>
      </Escena>
      {/* 2 · una espora cae en una mazorca joven y se mete */}
      <Escena T={T} a={K.En} b={K.Se} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={150} T={T} hojas={false} ancho={140} />
          <Mazorca x={500} y={960} L={560} W={290} rot={-6} color="verde" seed={8} gib={kprog(T, K.Es + 1.0, K.Es + 4.0)} />
          {T < K.Es + 0.5 && <g opacity={1 - kprog(T, K.Es + 0.1, K.Es + 0.5)}>
            <Espora x={klerp(860, 640, kprog(T, K.En + 0.2, K.En + 1.3, kEase.sale))} y={klerp(560, 820, kprog(T, K.En + 0.2, K.En + 1.3, kEase.sale))} r={34} />
            <path d={`M 640 840 q -20 ${30 * kprog(T, K.En + 1.4, K.En + 2.4)} ${-50 * kprog(T, K.En + 1.4, K.En + 2.4)} ${70 * kprog(T, K.En + 1.4, K.En + 2.4)}`} stroke={CC.hifa} strokeWidth={10} fill="none" strokeLinecap="round" />
          </g>}
        </svg>
      </Escena>
      {/* 4 · corte: las semillas se pudren */}
      <Escena T={T} a={K.Se} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <CorteMazorca x={480} y={930} L={700} W={360} podre={kprog(T, K.Se + 0.3, K.Se + 2.6)} hifas={kprog(T, K.Se - 0.2, K.Se + 1.6)} />
        </svg>
      </Escena>
      {/* 5 · la mancha "chocolate" */}
      <Escena T={T} a={K.M} b={K.Ex + 1.8} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={140} T={T} hojas={false} ancho={140} />
          <Mazorca x={500} y={980} L={580} W={300} rot={-6} color="amarillo" seed={9} mancha={kprog(T, K.M + 0.2, K.M + 3.0)} escarcha={kprog(T, K.Ex + 0.1, K.Ex + 1.7)} mpos={[0.05, 0.55]} />
        </svg>
      </Escena>
      {/* 6 · al microscopio: esporas en cadenitas */}
      <Escena T={T} a={K.Ex + 1.8} b={K.Q} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1b2333 0%, ${KC.dark} 72%)` }}></div>
        <FelpaMicro T={T} a={K.Ex + 1.6} />
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.Q} b={K.N} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Mazorca x={300} y={900} L={500} W={260} rot={-6} color="amarillo" mancha={1} escarcha={1} seed={10} mpos={[0.05, 0.5]} />
          <text x={300} y={600} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Q + 0.2, K.Q + 0.5)}>?</text>
        </svg>
      </Escena>
      {/* 8 · millones de esporas, y el viento se las lleva */}
      <Escena T={T} a={K.N} b={K.St} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Mazorca x={230} y={1080} L={420} W={220} rot={-6} color="amarillo" mancha={1} escarcha={1} seed={11} mpos={[0.05, 0.5]} />
          <Viento T={T} x={60} y={900} o={kprog(T, K.N + 0.5, K.N + 1.0)} />
          <NubeViento T={T} x={290} y={1060} p={viento} n={120} seed={12} lejos={900} />
        </svg>
        <div style={{ position:'absolute', left:0, right:0, top:720, textAlign:'center', zIndex:41, transform:`scale(${klerp(0.6, 1, kprog(T, K.N + 0.05, K.N + 0.5, kEase.rebote))})`, opacity:kprog(T, K.N, K.N + 0.2) }}>
          <div style={{ font:`400 190px/0.95 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`6px ${KC.ink}`, textShadow:`8px 8px 0 ${KC.ink}` }}>MILLONES</div>
          <div style={{ font:`900 46px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:10 }}>de esporas por mazorca</div>
        </div>
      </Escena>
      {/* 9 · el estudio: México 2005 → Tabasco y Chiapas 2011–2012 */}
      <Escena T={T} a={K.St} b={K.Ma} zoom={0.02}>
        <FondoLunares color={KC.cyan} />
        {T < K.St + 2.9 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:1 - kprog(T, K.St + 2.5, K.St + 2.9) }}>
          <MapaMexico x={-1150} y={-80} ancho={2400}>
            {[[-93.0, 17.0, 'Chiapas'], [-92.9, 18.0, 'Tabasco']].map(([lo, la], i) => { const [px, py] = mxProy(lo, la); const on = kprog(T, K.St + 0.4 + i * 0.3, K.St + 0.8 + i * 0.3, kEase.rebote);
              return <circle key={i} cx={px} cy={py} r={Math.max(0.01, 9 * on)} fill={KC.red} stroke={KC.ink} strokeWidth={2} />; })}
          </MapaMexico>
        </svg>}
        {T > K.St + 7.3 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:kprog(T, K.St + 7.3, K.St + 7.8) }}>
          {Array.from({ length: 4 }, (_, r) => Array.from({ length: 6 }, (_, c) => { const i = r * 6 + c; const enf = i < 18;
            return <Mazorca key={i} x={150 + c * 156} y={830 + r * 150} L={120} W={64} rot={0} color="amarillo" seed={20 + i} mancha={enf ? kprog(T, K.St + 8.0 + i * 0.05, K.St + 8.6 + i * 0.05) : 0} mpos={[0, 0.5]} />; }))}
        </svg>}
      </Escena>
      {/* 10 · manejo: cortar cada semana y variedades tolerantes */}
      <Escena T={T} a={K.Ma} b={K.C} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={540} T={T} ancho={120} />
          <Mazorca x={330} y={760} L={260} W={130} rot={10} color="amarillo" seed={30} />
          <Mazorca x={750} y={820} L={280} W={140} rot={-8} color="verde" seed={31} />
          <g transform={`translate(0 ${mzSemana * 900})`} opacity={1 - kprog(T, K.Ma + 1.5, K.Ma + 1.8)}>
            <Mazorca x={350} y={1000} L={240} W={120} rot={8 + mzSemana * 70} color="amarillo" mancha={1} seed={32} mpos={[0, 0.5]} />
          </g>
          <line x1={300} y1={850} x2={420} y2={880} stroke={KC.red} strokeWidth={10} strokeLinecap="round" opacity={kprog(T, K.Ma + 0.8, K.Ma + 0.9) * (1 - kprog(T, K.Ma + 1.2, K.Ma + 1.4))} />
        </svg>
        <Semanas T={T} a={K.Ma + 0.8} y={1130} />
      </Escena>
      {/* 11 · cierre: la misma mazorca, ahora soltando esporas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 55%">
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Tronco x={250} T={T} />
          <Mazorca x={470} y={1000 + mece(T, 3, 0.3) * 6} L={440} W={230} rot={-8 + mece(T, 2, 0.4) * 2} color="amarillo" mancha={1} escarcha={1} mpos={[0.05, 0.5]} />
          <Viento T={T} x={420} y={800} o={kprog(T, K.C + 0.5, K.C + 1.0)} />
          <NubeViento T={T} x={540} y={980} p={kprog(T, K.C + 0.4, K.C + 5.0)} n={90} seed={14} lejos={560} />
          <g opacity={kprog(T, K.C + 2.4, K.C + 2.9)} transform={`translate(0 ${(1 - kprog(T, K.C + 2.4, K.C + 2.9, kEase.sale)) * 60})`}>
            <Chocolate x={820} y={1180} s={0.8} />
          </g>
        </svg>
      </Escena>

      {/* lupa POR DENTRO: el hongo crece mientras la mazorca se ve sana */}
      <Lupa T={T} at={K.Es + 0.4} until={K.Se - 0.2} x={760} y={1010} r={200} fx={540} fy={980} tinte={KC.cyan} etiqueta="POR DENTRO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1c1410" />
          {[[0.3, 0.3], [0.7, 0.35], [0.3, 0.72], [0.7, 0.75], [0.5, 0.52]].map(([u, v], i) => <ellipse key={i} cx={u * r * 2} cy={v * r * 2} rx={r * 0.2} ry={r * 0.26} fill={CC.grano} stroke={CC.grano2} strokeWidth={5} />)}
          {Array.from({ length: 12 }, (_, i) => { const g = krng(i + 60); const x0 = g() * r * 2, y0 = g() * r * 2, ang = g() * 6.28; const len = r * 0.9 * kprog(t, K.Es + 0.6 + i * 0.12, K.Es + 2.4 + i * 0.12);
            return <path key={'h' + i} d={`M ${x0} ${y0} q ${Math.cos(ang) * len * 0.5 + 20} ${Math.sin(ang) * len * 0.5} ${Math.cos(ang) * len} ${Math.sin(ang) * len}`} stroke={CC.hifa} strokeWidth={6} fill="none" strokeLinecap="round" />; })}
        </svg>} />

      {/* textos: gancho */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 2.0} until={K.H - 0.3} texto="¿nieve?" x={300} y={480} tam={56} />
      <Etq T={T} at={K.G + 2.4} until={K.H - 0.3} x={640} y={890} texto="esporas de un hongo" tam={32} color={KC.ink} />
      {/* hongo */}
      <Etq T={T} at={K.H + 0.4} until={K.En - 0.3} x={60} y={560} texto="moniliasis del cacao" tam={34} color={KC.ink} />
      <Etq T={T} at={K.H + 0.8} until={K.En - 0.3} x={60} y={615} texto="Moniliophthora roreri" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.H + 2.6} until={K.En - 0.3} texto="solo ataca los frutos" x={540} y={1440} tam={40} borde={KC.red} />
      <Chip T={T} at={K.H + 3.4} until={K.En - 0.3} texto="cacao y parientes cercanos" x={540} y={1530} tam={30} borde={KC.ink} />
      {/* entra */}
      <Etq T={T} at={K.En + 0.3} until={K.Es - 0.2} x={60} y={560} texto="mazorca joven" tam={34} color={KC.ink} />
      <Etq T={T} at={K.En + 0.8} until={K.Es - 0.2} x={1030} y={520} lado="izq" texto="espora" tam={32} color={KC.ink} />
      <Chip T={T} at={K.En + 0.6} until={K.Es - 0.2} texto="esquemático, sin proporción" x={360} y={1470} tam={24} borde={KC.ink} />
      {/* escondido */}
      <Chip T={T} at={K.Es + 0.2} until={K.Se - 0.3} texto="por fuera: se ve sana" x={330} y={470} tam={36} borde={KC.leaf} />
      <Medidor T={T} at={K.Es + 1.2} until={K.Se - 0.3} valor={(t) => kprog(t, K.Es + 1.4, K.Es + 4.2)} etiqueta="sin síntomas" texto={(v) => 'hasta ' + Math.max(1, Math.round(v * 3)) + ' meses'} x={80} y={1440} ancho={920} color={KC.yellow} />
      <Etq T={T} at={K.Es + 2.4} until={K.Se - 0.3} x={560} y={1250} texto="hifas del hongo" tam={28} color={KC.ink} />
      {/* semillas */}
      <Chip T={T} at={K.Se + 0.1} until={K.M - 0.3} texto="POR DENTRO · corte" x={330} y={470} tam={30} mono borde={KC.ink} />
      <Etq T={T} at={K.Se + 0.4} until={K.M - 0.3} x={640} y={760} texto="semillas = granos de cacao" tam={28} color={KC.ink} />
      {/* mancha */}
      <Chip T={T} at={K.M + 1.2} until={K.Ex - 0.2} texto="le dicen: «chocolate»" x={360} y={470} tam={40} borde={CC.cafe} />
      <Etq T={T} at={K.Ex + 0.5} until={K.Ex + 1.6} x={680} y={1000} texto="felpa blanca" tam={30} color={KC.ink} />
      {/* escarcha al microscopio */}
      <Chip T={T} at={K.Ex + 1.9} until={K.Q - 0.3} texto="AL MICROSCOPIO" x={330} y={470} tam={32} mono borde={KC.cyan} />
      <Etq T={T} at={K.Ex + 2.4} until={K.Q - 0.3} x={60} y={600} texto="esporas en cadena" tam={30} color={CC.espora} />
      <Etq T={T} at={K.Ex + 2.8} until={K.Q - 0.3} x={60} y={655} texto="pared gruesa · 5–10 µm" tam={26} color={KC.texto} />
      {/* número */}
      <Etq T={T} at={K.N + 1.4} until={K.St - 0.3} x={60} y={1420} texto="el viento se las lleva" tam={30} color={KC.ink} />
      {/* estudio */}
      <Chip T={T} at={K.St + 0.3} until={K.St + 2.5} texto="2005 · llega a Chiapas y Tabasco" x={430} y={470} tam={34} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.St + 2.9} until={K.St + 7.1} anio="2011–2012" quien="Tabasco y norte de Chiapas" revista="Torres-de la Cruz et al. · Rev. Fitotec. Mex., 2020" x={540} y={830} />
      <Chip T={T} at={K.St + 4.4} until={K.St + 7.1} texto="10,621 mazorcas · 6 huertas" x={540} y={1110} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.St + 5.2} until={K.St + 7.1} texto="UJAT y Colegio de Postgraduados" x={540} y={1200} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.St + 7.4} until={K.Ma - 0.3} texto="huertas casi sin manejo" x={360} y={470} tam={34} borde={KC.ink} />
      <Medidor T={T} at={K.St + 7.6} until={K.Ma - 0.3} valor={(t) => 0.758 * kprog(t, K.St + 7.8, K.St + 9.2, kEase.suave)} etiqueta="mazorcas enfermas (promedio)" texto={(v) => v.toFixed(3).replace(/^0\./, '').replace(/(\d\d)(\d)$/, '$1.$2') + ' %'} x={80} y={1440} ancho={920} color={CC.cafe} />
      <Chip T={T} at={K.St + 9.4} until={K.Ma - 0.3} texto="según la huerta: 54.49–88.73 %" x={540} y={1560} tam={28} borde={KC.ink} />
      {/* manejo */}
      <Chip T={T} at={K.Ma + 0.4} until={K.C - 0.3} texto="cortar las enfermas cada semana" x={430} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Ma + 2.6} until={K.C - 0.3} texto="antes de que salga la felpa blanca" x={430} y={550} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ma + 4.4} until={K.C - 0.3} texto="+ variedades más tolerantes" x={540} y={1440} tam={36} borde={KC.leaf} />
      {/* cierre */}
      <Chip T={T} at={K.C + 2.6} until={K.Ou - 0.1} texto="el cacao de tu chocolate" x={700} y={1440} tam={34} borde={CC.cafe} />

      {/* barras de escala (aprox.: una mazorca mide de 15 a 25 cm) */}
      <BarraEscalaC T={T} at={K.G} until={K.H} texto="10 cm" largo={200} />
      <BarraEscalaC T={T} at={K.H} until={K.En} texto="10 cm" largo={140} y={1640} />
      <BarraEscalaC T={T} at={K.En} until={K.Se} texto="5 cm" largo={130} y={1600} />
      <BarraEscalaC T={T} at={K.Se} until={K.M} texto="5 cm" largo={170} />
      <BarraEscalaC T={T} at={K.M} until={K.Ex + 1.8} texto="5 cm" largo={135} />
      <BarraEscalaC T={T} at={K.Ex + 1.8} until={K.Q} texto="10 µm" largo={65} color={KC.texto} />
      <BarraEscalaC T={T} at={K.Q} until={K.N} texto="10 cm" largo={225} />
      <BarraEscalaC T={T} at={K.N} until={K.St} texto="10 cm" largo={190} y={1520} />
      <BarraEscalaC T={T} at={K.St} until={K.St + 2.8} texto="mapa esquemático" largo={0} />
      <BarraEscalaC T={T} at={K.Ma} until={K.C} texto="10 cm" largo={120} y={1620} />
      <BarraEscalaC T={T} at={K.C} until={K.Ou} texto="10 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No está nevada: *son esporas.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.En - 0.1} texto="Moniliophthora roreri: *solo los frutos.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Es - 0.1} texto="Una espora *se mete.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Se - 0.1} texto="Se ve sana… *pero el hongo crece dentro.*" />
      <Subtitulo T={T} idx={4} at={K.Se + 0.1} until={K.M - 0.1} texto="Las semillas *se pudren.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Ex - 0.1} texto="Una mancha café: *«chocolate».*" />
      <Subtitulo T={T} idx={6} at={K.Ex + 0.1} until={K.Q - 0.1} texto="Esporas en cadenitas: *la nieve.*" />
      <Subtitulo T={T} idx={7} at={K.Q + 0.1} until={K.N - 0.1} texto="¿Cuántas *esporas?*" />
      <Subtitulo T={T} idx={8} at={K.N + 0.1} until={K.St - 0.1} texto="Millones, *y el viento se las lleva.*" />
      <Subtitulo T={T} idx={9} at={K.St + 0.1} until={K.Ma - 0.1} texto="Más de 10 mil mazorcas: *más del 75 % enfermas.*" />
      <Subtitulo T={T} idx={10} at={K.Ma + 0.1} until={K.C - 0.1} texto="Cortarlas *cada semana.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Está sembrando *el hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.6, K.H + 3.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.3, K.Es + 3.6, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.M + 0.3, K.M + 3.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Q + 0.05, K.N + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.N + 0.6, K.N + 3.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.St + 7.5, K.Ma - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ma + 2.4, K.Ma + 6.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="117" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Barra de escala fija (local; el kit tiene Escala con zoom, aquí basta una fija).
function BarraEscalaC({ T, texto, largo = 200, x = 60, y = 1680, at = -1, until, color = KC.ink }) {
  if (T < at || (until != null && T > until)) return null;
  const o = kprog(T, at, at + 0.3) * (until != null ? 1 - kprog(T, until - 0.3, until) : 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, opacity:o, textShadow: color === KC.ink ? '0 2px 0 rgba(255,255,255,.6)' : KSOMBRA }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    {largo > 0 && <div style={{ width:largo, height:8, background:color, borderRadius:4 }}></div>}
  </div>;
}

function CacaoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CacaoShot /></CompositionStage></div>;
}
window.CacaoApp = CacaoApp;
