// Shot Biotecnológico #18 · El glucómetro por dentro — NARRADO (N1 "Por dentro" + escena del estudio de Clark, 1962).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala entre escenas.
const GOX = '#9b5de5', GDH = '#11a39a', FAD = '#ffd43b', SANGRE = '#d7263d', PIEL = '#f1b48f', ELEC = '#ffe11a', MED = '#4dd4ff';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- MACRO: glucómetro, tira, dedo, lanceta ---------- */
// Glucómetro de frente. Centro en (x, y). pantalla: texto de la pantalla; lleno 0..1 = la tira tiene sangre; brillo 0..1 = corriente por la tira.
function Glucometro({ T, x, y, s = 1, pantalla = '- - -', unidad = '', lleno = 0, brillo = 0, parpadeo = false }) {
  const on = !parpadeo || Math.sin(T * 9) > -0.2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* tira reactiva: sale por arriba del aparato */}
    <g>
      <rect x={-34} y={-560} width={68} height={300} rx={8} fill="#fbfaf6" stroke={KC.ink} strokeWidth={8} />
      <rect x={-34} y={-560} width={68} height={60} rx={8} fill={mixHex('#fbfaf6', SANGRE, lleno)} stroke={KC.ink} strokeWidth={8} />
      <line x1={-12} y1={-500} x2={-12} y2={-262} stroke={KC.gold} strokeWidth={8} />
      <line x1={12} y1={-500} x2={12} y2={-262} stroke={KC.gold} strokeWidth={8} />
      {brillo > 0 && <g opacity={brillo}>
        <line x1={-12} y1={-500} x2={-12} y2={-262} stroke={ELEC} strokeWidth={14} strokeDasharray="18 22" strokeDashoffset={-T * 260} />
        <line x1={12} y1={-500} x2={12} y2={-262} stroke={ELEC} strokeWidth={14} strokeDasharray="18 22" strokeDashoffset={-T * 260 + 20} />
      </g>}
    </g>
    {/* cuerpo */}
    <rect x={-190} y={-280} width={380} height={560} rx={70} fill="#f6f3ec" stroke={KC.ink} strokeWidth={10} />
    <rect x={-190} y={-280} width={380} height={70} rx={35} fill={KC.blue} stroke={KC.ink} strokeWidth={10} />
    <rect x={-60} y={-292} width={120} height={30} rx={10} fill="#2b2f3a" stroke={KC.ink} strokeWidth={6} />
    {/* pantalla */}
    <rect x={-150} y={-180} width={300} height={220} rx={24} fill="#bfe3b4" stroke={KC.ink} strokeWidth={9} />
    <rect x={-136} y={-166} width={272} height={40} rx={10} fill="rgba(255,255,255,.25)" />
    {on && <text x={unidad ? -10 : 0} y={-20} textAnchor="middle" style={{ font:`400 ${unidad ? 128 : 96}px ${KF.titulo}` }} fill="#1d3a1f">{pantalla}</text>}
    {unidad && <text x={112} y={14} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#1d3a1f">{unidad}</text>}
    {/* botones */}
    <circle cx={-70} cy={150} r={44} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <circle cx={70} cy={150} r={44} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    <path d="M -140 -240 Q -60 -262 30 -246" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
}
// Dedo que apunta a la derecha: la yema queda en (x, y). gota 0..1.
function Dedo({ x, y, s = 1, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -700 -70 L -60 -70 Q 40 -70 40 0 Q 40 70 -60 70 L -700 70 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -150 -66 Q -60 -62 -30 -30 Q -10 -6 -40 6 L -150 6 Q -170 -30 -150 -66 Z" fill="#f8d5c2" stroke={KC.ink} strokeWidth={6} />
    {[-300, -330].map((cx) => <path key={cx} d={`M ${cx} -60 Q ${cx - 16} 0 ${cx} 60`} stroke="#c98a6b" strokeWidth={6} fill="none" />)}
    {gota > 0 && <path d={`M 0 ${50} Q ${34 * gota} ${50 + 50 * gota} 0 ${50 + 76 * gota} Q ${-34 * gota} ${50 + 50 * gota} 0 50 Z`} fill={SANGRE} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
function Lanceta({ x, y, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(-60)`} opacity={o}>
    <rect x={-40} y={-300} width={80} height={250} rx={30} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    <rect x={-26} y={-60} width={52} height={40} fill="#e6e6ef" stroke={KC.ink} strokeWidth={6} />
    <path d="M -4 -20 L 0 20 L 4 -20 Z" fill="#c9ccd6" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Chispa({ x, y, r = 16, o = 1, t = '' }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r * 1.9} fill="rgba(255,225,26,.22)" />
    <path d={`M 0 ${-r} L ${r * 0.3} ${-r * 0.3} L ${r} 0 L ${r * 0.3} ${r * 0.3} L 0 ${r} L ${-r * 0.3} ${r * 0.3} L ${-r} 0 L ${-r * 0.3} ${-r * 0.3} Z`} fill={ELEC} stroke={KC.ink} strokeWidth={3} />
    {t && <text x={r * 1.1} y={-r * 0.8} style={{ font:`700 ${r * 1.3}px ${KF.mono}` }} fill={ELEC}>{t}</text>}
  </g>;
}

/* ---------- MICRO: enzimas, glucosa, mediador, electrodo ---------- */
// Glucosa oxidasa: homodímero (dos mitades), cada una con su FAD amarillo. carga 0..1 = el FAD lleva electrones (brilla).
function EnzimaGOx({ x, y, s = 1, rot = 0, carga = 0, color = GOX, dimero = true }) {
  const mitad = (dx, flip) => <g transform={`translate(${dx} 0) scale(${flip} 1)`}>
    <path d="M 0 -70 Q 70 -86 92 -20 Q 106 40 54 72 Q 10 94 0 60 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 20 -48 Q 60 -56 72 -20" stroke="rgba(255,255,255,.45)" strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={46} cy={14} r={16 + carga * 5} fill={mixHex(FAD, '#fff7b0', carga)} stroke={KC.ink} strokeWidth={4} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {carga > 0 && <circle r={120} fill={`rgba(255,225,26,${0.18 * carga})`} />}
    {mitad(2, 1)}{dimero ? mitad(-2, -1) : <path d="M 0 -70 Q -60 -70 -60 0 Q -60 64 0 60 Z" fill={color} stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
function Glucosa({ x, y, r = 26, rot = 0, o = 1 }) {
  if (o <= 0) return null;
  return <g opacity={o}><MoleculaAzucar tipo="glucosa" x={x} y={y} r={r} rot={rot} /></g>;
}
function Mediador({ x, y, r = 22, lleva = false }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={MED} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.28} fill="rgba(255,255,255,.6)" />
    {lleva && <Chispa x={r * 0.9} y={-r * 0.9} r={10} />}
  </g>;
}
function Electrodo({ T, y = 1130, flujo = 0 }) {
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={90} fill="url(#gOro)" stroke={KC.ink} strokeWidth={8} />
    <defs><linearGradient id="gOro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9a0" /><stop offset=".5" stopColor="#e8a62a" /><stop offset="1" stopColor="#9c6a10" /></linearGradient></defs>
    {flujo > 0 && Array.from({ length: 14 }, (_, i) => { const u = ((T * 0.9 + i / 14) % 1); return <Chispa key={i} x={u * (KW + 80) - 40} y={y + 45} r={12} o={flujo} />; })}
  </g>;
}

/* ---------- Aspergillus niger: conidióforo (tallo, vesícula, cadenas de conidios negros) ---------- */
function Aspergillus({ x, y, s = 1, crece = 1, T = 0 }) {
  const h = 220 * crece;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 Q ${Math.sin(T) * 6} ${-h / 2} 0 ${-h}`} stroke="#e8e2d0" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q ${Math.sin(T) * 6} ${-h / 2} 0 ${-h}`} stroke={KC.ink} strokeWidth={4} fill="none" opacity=".5" />
    {crece > 0.6 && <g transform={`translate(0 ${-h})`} opacity={kprog(crece, 0.6, 1)}>
      {Array.from({ length: 22 }, (_, i) => { const a = (i / 22) * Math.PI * 2; return Array.from({ length: 4 }, (_, k) =>
        <circle key={`${i}-${k}`} cx={Math.cos(a) * (40 + k * 17)} cy={Math.sin(a) * (40 + k * 17)} r={9} fill={k % 2 ? '#2a2420' : '#141110'} stroke="#000" strokeWidth={2} />); })}
      <circle r={36} fill="#efe7d2" stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}

/* ---------- Clark 1962: electrodo de oxígeno con la enzima atrapada ---------- */
function ElectrodoClark({ x, y, s = 1, capa = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-420} width={180} height={440} rx={40} fill="rgba(220,240,255,.7)" stroke={KC.ink} strokeWidth={9} />
    <line x1={0} y1={-460} x2={0} y2={-10} stroke="#b9bcc7" strokeWidth={12} />
    <path d="M 0 -500 Q 40 -560 120 -560" stroke={KC.ink} strokeWidth={8} fill="none" />
    <circle cx={0} cy={-6} r={14} fill="#e9eaf2" stroke={KC.ink} strokeWidth={5} />
    <rect x={-100} y={20} width={200} height={12} fill={KC.blue} stroke={KC.ink} strokeWidth={3} />
    <g opacity={capa}>
      <rect x={-100} y={32} width={200} height={34} fill="rgba(155,93,229,.55)" stroke={KC.ink} strokeWidth={3} />
      {Array.from({ length: 7 }, (_, i) => <EnzimaGOx key={i} x={-84 + i * 28} y={49} s={0.11} rot={i * 40 + T * 20} />)}
    </g>
    <rect x={-104} y={66} width={208} height={12} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 6" />
  </g>;
}

/* ---------- México: 100 personas ---------- */
function Persona({ x, y, s = 1, color = '#ffffff', duda = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-18} r={11} fill={color} stroke={KC.ink} strokeWidth={3.5} />
    <path d="M -15 22 Q -15 -4 0 -4 Q 15 -4 15 22 Z" fill={color} stroke={KC.ink} strokeWidth={3.5} />
    {duda && <text x={0} y={18} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>?</text>}
  </g>;
}

/* ---------- Abejas y miel ---------- */
function Panal({ x, y, s = 1, miel = 1 }) {
  const cel = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) cel.push([c * 104 + (r % 2) * 52, r * 90]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cel.map(([cx, cy], i) => { const pts = [0, 60, 120, 180, 240, 300].map((a) => { const t = (a + 30) * Math.PI / 180; return `${(cx + 58 * Math.cos(t)).toFixed(1)},${(cy + 58 * Math.sin(t)).toFixed(1)}`; }).join(' ');
      return <polygon key={i} points={pts} fill={i % 3 === 0 || i < miel * 20 ? '#f2a516' : '#ffd166'} stroke="#8a5a10" strokeWidth={8} />; })}
  </g>;
}
function Abeja({ x, y, s = 1, T = 0, rot = 0 }) {
  const ala = Math.sin(T * 60) * 18;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={-10} cy={-48} rx={44} ry={26} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${-20 + ala} -10 -30)`} />
    <ellipse cx={20} cy={-48} rx={40} ry={24} fill="rgba(255,255,255,.65)" stroke={KC.ink} strokeWidth={4} transform={`rotate(${20 - ala} 20 -30)`} />
    <ellipse cx={0} cy={0} rx={70} ry={44} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    {[-24, 6, 36].map((dx) => <path key={dx} d={`M ${dx} -42 Q ${dx + 10} 0 ${dx} 42`} stroke={KC.ink} strokeWidth={14} fill="none" />)}
    <circle cx={-72} cy={-4} r={30} fill="#2b2420" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-84} cy={-12} r={8} fill="#fff" />
    <path d="M -86 -30 Q -100 -60 -116 -64 M -74 -32 Q -80 -64 -92 -74" stroke={KC.ink} strokeWidth={4} fill="none" />
    <path d="M 70 0 L 92 6 L 70 12 Z" fill={KC.ink} />
  </g>;
}
function Bacilo({ x, y, s = 1, vida = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * klerp(0.6, 1, vida)})`} opacity={klerp(0.35, 1, vida)}>
    <rect x={-60} y={-24} width={120} height={48} rx={24} fill={mixHex('#8a8f99', KC.leaf, vida)} stroke={KC.ink} strokeWidth={5} />
    <path d="M 60 0 q 20 -14 40 0 t 40 0" stroke={KC.ink} strokeWidth={3} fill="none" />
  </g>;
}

function Glucometro18() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Go: CUES.Gota, En: CUES.Enzima, Pr: CUES.Prima, El: CUES.Electrones, Me: CUES.Mediador, Pq: CUES.Pregunta,
    Co: CUES.Corriente, Nu: CUES.Numero, Cl: CUES.Clark, Mx: CUES.Mexico, Ab: CUES.Abejas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const DX = 430, DY = 1000, DS = 0.9;            // centro y escala del glucómetro; punta de la tira en (DX, TIPY)
  const TIPY = DY - 560 * DS;
  // dedo: llega, la lanceta pica, sale la gota, el dedo baja a la punta de la tira
  const pica = kprog(T, K.Go + 0.2, K.Go + 0.55, kEase.sale) * (1 - kprog(T, K.Go + 0.7, K.Go + 1.0));
  const gota = kprog(T, K.Go + 0.7, K.Go + 1.4, kEase.sale);
  const baja = kprog(T, K.Go + 1.5, K.Go + 2.3, kEase.suave);
  const absorbe = kprog(T, K.Go + 2.3, K.Go + 2.8);
  const fx = klerp(-60, DX, kprog(T, K.G + 2.6, K.Go + 0.2, kEase.sale)), fy = klerp(360, TIPY - 118, baja);
  // micro: 6 enzimas en fila; cada glucosa llega, la enzima le quita 2 e⁻, el mediador los baja al electrodo
  const ENZ = [140, 320, 500, 680, 860, 1000].slice(0, 5).map((x, i) => [x + 40, 860 + (i % 2) * 40]);
  const ciclo = (i) => K.El + 0.4 + i * 0.75;
  // número en pantalla
  const cuenta = Math.round(klerp(0, 98, kprog(T, K.Nu + 0.4, K.Nu + 2.2, kEase.sale)));
  const R = krng(18);
  const glucs = Array.from({ length: 12 }, () => [80 + R() * 920, 380 + R() * 260, R() * 360]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–3 · gancho, gota, enzima en la tira (macro rosa con Lupa) */}
      <Escena T={T} a={K.G} b={K.El} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Ambiente T={T} n={24} seed={3} />
        <SvgCapa>
          <Glucometro T={T} x={DX} y={DY} s={DS} pantalla={T < K.Go + 2.8 ? '- - -' : '...'} parpadeo lleno={absorbe} brillo={T < K.Go ? 0.9 : absorbe} />
          {T < K.Go && Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.8 + i / 5) % 1); return <Chispa key={i} x={DX + Math.sin(i * 2 + T * 3) * 30} y={TIPY + 30 + u * 200} r={14} o={Math.sin(Math.PI * u)} t={i === 2 ? 'e⁻' : ''} />; })}
          {T > K.G + 2.6 && <Dedo x={fx} y={fy} gota={gota * (1 - absorbe)} />}
          <Lanceta x={fx + 30 - 60 * pica} y={fy - 40 - 60 * pica} o={kprog(T, K.Go, K.Go + 0.2) * (1 - kprog(T, K.Go + 1.0, K.Go + 1.3))} />
          {T > K.Go + 0.4 && T < K.Go + 0.9 && <Chispa x={fx} y={fy + 30} r={22} o={1} />}
          {/* el moho que fabrica la enzima */}
          {T > K.En + 1.6 && <g opacity={kprog(T, K.En + 1.6, K.En + 2.2) * (1 - kprog(T, K.Pr - 0.3, K.Pr))}>
            <rect x={40} y={1420} width={330} height={330} rx={40} fill="rgba(14,15,18,.8)" stroke={KC.ink} strokeWidth={6} />
            <Aspergillus x={205} y={1720} s={0.95} crece={kprog(T, K.En + 1.8, K.En + 3.0, kEase.sale)} T={T} />
          </g>}
        </SvgCapa>
        <Escala T={T} pxPorMm={6.5} x={720} y={1460} />
        <Lupa T={T} at={K.En + 0.15} until={K.El - 0.2} x={560} y={790} r={260} fx={DX} fy={TIPY + 30} tinte={GOX} etiqueta="POR DENTRO · LA TIRA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <rect width={r * 2} height={r * 2} fill={KC.noche} />
            <rect x={0} y={r * 1.55} width={r * 2} height={r * 0.45} fill="#c58f22" />
            {[[110, 300], [270, 330], [420, 300], [190, 200], [360, 190]].map(([ex, ey], i) => {
              const esGdh = t > K.Pr + 0.6 && i >= 3;
              const o = esGdh ? kprog(t, K.Pr + 0.6, K.Pr + 1.1) : 1;
              return <g key={i} opacity={o}><EnzimaGOx x={ex} y={ey + Math.sin(t * 2 + i) * 6} s={0.62} rot={Math.sin(t + i) * 10} color={esGdh ? GDH : GOX} dimero={!esGdh} carga={0.5 + 0.5 * Math.sin(t * 4 + i)} /></g>; })}
            {[[80, 90], [250, 70], [460, 110]].map(([gx, gy], i) => <Glucosa key={i} x={gx + Math.sin(t + i) * 10} y={gy + ((t * 30 + i * 40) % 60)} r={20} rot={t * 30} />)}
          </svg>} />
      </Escena>

      {/* 4–6 · al microscopio: glucosa → enzima → 2 e⁻ → mediador → electrodo */}
      <Escena T={T} a={K.El} b={K.Co} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, #1b2a44 0%, ${KC.noche} 75%)` }}></div>
        <Ambiente T={T} n={30} seed={9} color="rgba(120,180,255,.25)" />
        <SvgCapa>
          <text x={60} y={380} style={{ font:`700 30px ${KF.mono}` }} fill="#9fb6d8">PLASMA DE TU GOTA</text>
          {glucs.map(([x, y, r], i) => <Glucosa key={i} x={x + Math.sin(T + i) * 14} y={y + Math.cos(T * 0.8 + i) * 10} r={22} rot={r + T * 20} o={0.55} />)}
          <Electrodo T={T} y={1130} flujo={kprog(T, K.Pq, K.Pq + 0.8)} />
          {ENZ.map(([x, y], i) => {
            const c0 = ciclo(i), lleg = kprog(T, c0, c0 + 0.6, kEase.sale), quita = kprog(T, c0 + 0.6, c0 + 0.9);
            const carga = T > K.Me + 0.2 + i * 0.4 ? 0 : quita;
            const m0 = K.Me + 0.2 + i * 0.45, baja = kprog(T, m0, m0 + 1.0, kEase.suave);
            const loops = T > K.Pq ? ((T - K.Pq) * 1.2 + i * 0.2) % 1 : -1;
            return <g key={i}>
              <EnzimaGOx x={x} y={y + Math.sin(T * 2 + i) * 6} s={0.8} rot={Math.sin(T + i) * 8} carga={carga} />
              {T > c0 && quita < 1 && <Glucosa x={x} y={klerp(500, y - 40, lleg)} r={26} rot={T * 40} o={1 - quita} />}
              {T > c0 + 0.6 && T < m0 && [0, 1].map((k) => <Chispa key={k} x={x - 40 + k * 80} y={y - 20 + Math.sin(T * 8 + k) * 6} r={14} t={k ? 'e⁻' : ''} />)}
              {T > m0 - 0.6 && loops < 0 && <Mediador x={x + 90} y={klerp(y + 10, 1100, baja)} lleva={baja < 1} />}
              {loops >= 0 && <Mediador x={x + 90} y={klerp(y + 10, 1100, Math.sin(Math.PI * loops))} lleva={loops < 0.5} />}
            </g>; })}
        </SvgCapa>
        <Etq T={T} at={K.El + 0.6} until={K.Me - 0.2} x={60} y={1010} texto="glucosa oxidasa" color={GOX} tam={36} />
        <Etq T={T} at={K.Me + 0.5} until={K.Pq - 0.1} x={60} y={1060} texto="mediador" color={MED} tam={36} />
        <Etq T={T} at={K.Me + 1.4} until={K.Co} x={1020} y={1095} texto="electrodo" lado="izq" color={KC.gold2} tam={36} />
        <Escala T={T} pxPorMm={2e7} x={60} y={1460} />
      </Escena>

      {/* 7–8 · corriente → número (macro cian) */}
      <Escena T={T} a={K.Co} b={K.Cl} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Ambiente T={T} n={20} seed={4} />
        <SvgCapa>
          <Glucometro T={T} x={DX} y={DY} s={DS} pantalla={T < K.Nu + 0.4 ? '...' : String(cuenta)} unidad={T > K.Nu + 0.4 ? 'mg/dL' : ''} lleno={1} brillo={1} />
          {Array.from({ length: 8 }, (_, i) => { const u = ((T * 0.9 + i / 8) % 1); return <Chispa key={i} x={DX + (i % 2 ? 11 : -11)} y={TIPY + 40 + u * 190} r={12} o={Math.sin(Math.PI * u) * (T < K.Nu + 2.4 ? 1 : 0.4)} />; })}
          {T < K.Nu && Array.from({ length: 6 }, (_, i) => { const t0 = K.Co + 0.8 + i * 0.4, u = kprog(T, t0, t0 + 0.8); return u > 0 && u < 1 ? <Glucosa key={i} x={DX + 160 - u * 160} y={TIPY - 60 + u * 80} r={20} rot={T * 50} o={1 - u * 0.6} /> : null; })}
        </SvgCapa>
        <Medidor T={T} at={K.Co + 1.0} until={K.Nu - 0.1} valor={(t) => klerp(0.15, 0.82, kprog(t, K.Co + 1.0, K.Co + 3.4))} etiqueta="corriente" texto={(v) => (v * 100 > 60 ? 'más azúcar' : 'poco azúcar')} y={460} color={ELEC} />
        <Chip T={T} at={K.Nu + 2.4} until={K.Cl - 0.2} texto="número de ejemplo" x={790} y={1520} tam={32} borde={KC.white} />
        <Escala T={T} pxPorMm={6.5} x={60} y={1460} />
      </Escena>

      {/* 9 · Clark, 1962 (amarillo) */}
      <Escena T={T} a={K.Cl} b={K.Mx} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <ElectrodoClark x={330} y={1060} s={1} capa={kprog(T, K.Cl + 1.4, K.Cl + 2.2)} T={T} />
          {T > K.Cl + 2.2 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.6 + i / 6) % 1); return <Glucosa key={i} x={200 + i * 52} y={1250 - u * 110} r={14} rot={T * 40} o={Math.sin(Math.PI * u)} />; })}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Cl + 0.2} until={K.Cl + 3.2} anio="1962" quien="Clark y Lyons · Alabama" revista="Ann. N. Y. Acad. Sci. · electrodo de enzima" y={400} />
        <Etiqueta T={T} at={K.Cl + 3.5} until={K.Mx - 0.2} x={440} y={800} texto="electrodo de oxígeno" lado="der" color={KC.ink} tam={32} />
        <Etiqueta T={T} at={K.Cl + 4.2} until={K.Mx - 0.2} x={450} y={1110} texto="glucosa oxidasa atrapada" lado="der" color={KC.ink} tam={30} />
        <Chip T={T} at={K.Cl + 4.6} until={K.Mx - 0.2} texto="el primer biosensor" x={540} y={1520} tam={42} borde={GOX} />
      </Escena>

      {/* 10 · México: 17 de cada 100 (menta) */}
      <Escena T={T} a={K.Mx} b={K.Ab} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {Array.from({ length: 100 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10);
            const pinta = i < 17 && T > K.Mx + 0.6 + i * 0.09; const duda = i >= 12 && i < 17 && T > K.Mx + 3.0;
            return <Persona key={i} x={110 + c * 60} y={500 + r * 70} s={1.15} color={pinta ? (duda ? '#ffd0d6' : KC.coral) : '#ffffff'} duda={duda} />; })}
        </SvgCapa>
        <Chip T={T} at={K.Mx + 1.4} until={K.Ab - 0.2} texto="17 de cada 100 adultos" x={540} y={1470} tam={40} borde={KC.coral} />
        <Chip T={T} at={K.Mx + 3.0} until={K.Ab - 0.2} texto="? = no lo sabía (5.4 de 17)" x={540} y={1570} tam={32} borde={KC.white} />
        <Chip T={T} at={K.Mx + 0.4} until={K.Ab - 0.2} texto="Ensanut 2021–2024 · 20 años o más" x={540} y={1670} tam={26} borde={KC.ink} />
      </Escena>

      {/* 11 · abejas (naranja) */}
      <Escena T={T} a={K.Ab} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Panal x={80} y={600} s={1.1} miel={kprog(T, K.Ab + 0.8, K.Ab + 3.0)} />
          <Abeja x={klerp(-120, 330, kprog(T, K.Ab, K.Ab + 1.2, kEase.sale)) + Math.sin(T * 3) * 10} y={460 + Math.sin(T * 5) * 12} s={1.1} T={T} rot={8} />
          {T > K.Ab + 1.2 && T < K.Ab + 2.2 && <circle cx={300} cy={klerp(500, 650, kprog(T, K.Ab + 1.2, K.Ab + 2.0))} r={16} fill="#f2a516" stroke={KC.ink} strokeWidth={4} />}
          {T > K.Ab + 2.4 && Array.from({ length: 10 }, (_, i) => { const u = ((T * 0.7 + i / 10) % 1); return <g key={i} opacity={Math.sin(Math.PI * u)}>
            <circle cx={150 + (i % 5) * 70} cy={1000 - u * 200} r={14 + (i % 3) * 4} fill="rgba(255,255,255,.75)" stroke="#5a8fb8" strokeWidth={3} /></g>; })}
          {T > K.Ab + 2.4 && <text x={110} y={1100} style={{ font:`700 44px ${KF.mono}` }} fill={KC.ink}>H₂O₂</text>}
          <Bacilo x={390} y={1150} s={1.1} vida={1 - kprog(T, K.Ab + 3.6, K.Ab + 5.4)} rot={-12} />
        </SvgCapa>
        <Chip T={T} at={K.Ab + 0.6} until={K.Ab + 3.4} texto="su propia glucosa oxidasa" x={400} y={1490} tam={34} borde={KC.yellow} />
        <Chip T={T} at={K.Ab + 3.6} until={K.Ci - 0.2} texto="agua oxigenada vs. bacterias" x={400} y={1490} tam={34} borde={KC.leaf} />
      </Escena>

      {/* 12 · cierre: el glucómetro del inicio, ya con su número */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <Ambiente T={T} n={24} seed={3} />
        <SvgCapa>
          <Glucometro T={T} x={DX} y={DY} s={DS} pantalla="98" unidad="mg/dL" lleno={1} brillo={1} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.8 + i / 6) % 1); return <Chispa key={i} x={DX + Math.sin(i * 2 + T * 3) * 40} y={TIPY + 30 + u * 200} r={14} o={Math.sin(Math.PI * u)} t={i === 3 ? 'e⁻' : ''} />; })}
        </SvgCapa>
        <Chip T={T} at={K.Ci + 0.8} until={K.Ou - 0.1} texto="enzima → electrones → número" x={540} y={1500} tam={36} borde={ELEC} />
      </Escena>

      {/* textos del gancho y la tira */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.Go - 0.1} texto="¿mide tu sangre?" x={540} y={1500} tam={46} />
      <Chip T={T} at={K.G + 2.0} until={K.Go - 0.1} texto="mide electrones" x={540} y={1610} tam={40} borde={ELEC} />
      <Chip T={T} at={K.En + 0.6} until={K.Pr - 0.2} texto="glucosa oxidasa" x={790} y={1480} tam={36} borde={GOX} />
      <Etq T={T} at={K.En + 2.4} until={K.Pr - 0.3} x={390} y={1640} texto="Aspergillus niger" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pr + 0.4} until={K.El - 0.2} texto="o glucosa deshidrogenasa" x={540} y={1500} tam={36} borde={GDH} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Go - 0.1} texto="No mide tu sangre: *mide electrones.*" />
      <Subtitulo T={T} idx={1} at={K.Go + 0.1} until={K.En - 0.1} texto="Una gota *en la tira.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Pr - 0.1} texto="Glucosa oxidasa: *de un hongo.*" />
      <Subtitulo T={T} idx={3} at={K.Pr + 0.1} until={K.El - 0.1} texto="O glucosa *deshidrogenasa.*" />
      <Subtitulo T={T} idx={4} at={K.El + 0.1} until={K.Me - 0.1} texto="Le quita *dos electrones.*" />
      <Subtitulo T={T} idx={5} at={K.Me + 0.1} until={K.Pq - 0.1} texto="El *mediador* los lleva." />
      <Subtitulo T={T} idx={6} at={K.Pq + 0.1} until={K.Co - 0.1} texto="¿Cómo se vuelve *número?*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.Nu - 0.1} texto="Más azúcar, *más corriente.*" />
      <Subtitulo T={T} idx={8} at={K.Nu + 0.1} until={K.Cl - 0.1} texto="Corriente → *mg/dL.*" />
      <Subtitulo T={T} idx={9} at={K.Cl + 0.1} until={K.Mx - 0.1} texto="1962: *el primer biosensor.*" />
      <Subtitulo T={T} idx={10} at={K.Mx + 0.1} until={K.Ab - 0.1} texto="17 de cada 100: *diabetes tipo 2.*" />
      <Subtitulo T={T} idx={11} at={K.Ab + 0.1} until={K.Ci - 0.1} texto="Las abejas: *agua oxigenada.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Son *electrones de una enzima.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gota + 0.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Enzima + 1.0, CUES.Prima - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Electrones + 0.8, CUES.Mediador + 1.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Corriente + 0.8, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Numero + 0.4, CUES.Clark - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Clark + 3.4, CUES.Mexico - 0.2, 'avatar_02_apuntando_camara', 'izq-alto'],
        [CUES.Mexico + 0.6, CUES.Abejas - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Abejas + 0.4, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="18" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GlucometroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Glucometro18 /></CompositionStage></div>;
}
window.GlucometroApp = GlucometroApp;
