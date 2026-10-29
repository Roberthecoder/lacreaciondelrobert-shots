// Shot IA #24 · Tu cerebro piensa con 20 watts; una tarjeta de IA, con 700 — NARRADO (N2 "El número").
// Datos: Balasubramanian 2021 (PNAS) · Azevedo et al. 2009 · Boyd 2008 (Sci. Am.) · NVIDIA H100 · Llama 3 Herd of Models (2024) ·
// Levy y Calvert 2021 (PNAS) · Intel Hala Point (2024). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// ---------- Ilustraciones propias ----------
const ROSA_CEREBRO = '#ff9fc0';
// Forma del cerebro (vista lateral, frente a la derecha), centrada en (0,0), ~400 × 300.
const CEREBRO_D = 'M -195 10 C -215 -90 -150 -165 -60 -170 C 0 -205 110 -190 160 -130 C 210 -80 215 0 175 45 C 140 85 80 70 50 80 C 20 105 -40 100 -70 85 C -120 95 -180 70 -195 10 Z';
const GIROS = [
  'M -150 -60 q 30 -40 70 -10 q 30 25 60 -15', 'M -170 20 q 40 -30 80 0 q 40 30 80 -10 q 30 -20 60 5',
  'M -60 -140 q 20 40 -10 70 q -20 30 20 60', 'M 40 -160 q -20 40 20 70 q 30 30 0 70', 'M 110 -120 q -10 40 30 60 q 30 20 10 60',
  'M -120 -120 q 30 10 40 40', 'M 60 40 q 30 -20 70 0', 'M -110 60 q 40 -20 80 10',
];
// Zonas (lóbulos esquemáticos) que se encienden en el mito.
const ZONAS = [[-140, -50, 90], [-40, -120, 85], [80, -110, 85], [140, -10, 80], [-60, 30, 90], [40, 20, 80]];
function Cerebro({ x, y, s = 1, T = 0, id = 'c', zonas = -1, brillo = 0, color = ROSA_CEREBRO }) {
  const lat = 1 + 0.012 * Math.sin(T * 3);
  return <g transform={`translate(${x} ${y}) scale(${s * lat})`}>
    <defs><clipPath id={`clip-${id}`}><path d={CEREBRO_D} /></clipPath></defs>
    {brillo > 0 && <ellipse cx={0} cy={-50} rx={260} ry={200} fill={KC.yellow} opacity={0.35 * brillo} filter="blur(0px)" />}
    {/* cerebelo y tallo */}
    <path d="M 40 70 q 70 -10 100 30 q -20 45 -90 30 Z" fill="#e7789f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 20 85 q 5 50 30 90 l 30 -6 q -15 -40 -10 -80 Z" fill="#e7789f" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={CEREBRO_D} fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <g clipPath={`url(#clip-${id})`}>
      {zonas >= 0 && ZONAS.map(([zx, zy, r], i) => { const on = kclamp(zonas * ZONAS.length - i, 0, 1);
        return <circle key={i} cx={zx} cy={zy} r={r} fill={[KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.gold2][i]} opacity={0.85 * on} />; })}
      {GIROS.map((d, i) => <path key={i} d={d} fill="none" stroke="#b8466f" strokeWidth={7} strokeLinecap="round" />)}
    </g>
    <path d={CEREBRO_D} fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
// Cabeza de perfil (mira a la derecha) con el cerebro adentro. brillo 0..1 del cerebro.
function Cabeza({ x, y, s = 1, T = 0, brillo = 0, id = 'cab' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 330 C -150 230 -240 150 -245 10 C -250 -200 -100 -310 40 -310 C 190 -310 265 -200 262 -60 L 300 45 Q 305 60 285 66 L 262 72 L 270 118 Q 258 128 262 145 Q 270 165 255 185 C 240 235 180 245 130 245 L 120 330 Z"
      fill="#f1b48f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -120 330 C -120 280 -150 250 -170 230" fill="none" stroke="#d98f6b" strokeWidth={8} strokeLinecap="round" />
    <ellipse cx={-40} cy={20} rx={30} ry={42} fill="#d98f6b" stroke={KC.ink} strokeWidth={7} />
    <circle cx={205} cy={-30} r={13} fill={KC.ink} />
    <Cerebro x={0} y={-120} s={0.95} T={T} id={id} brillo={brillo} />
  </g>;
}
// Foco: on 0..1 lo enciende (vidrio amarillo, rayos y resplandor).
function Foco({ x, y, s = 1, on = 0, T = 0, watts = '20 W' }) {
  const vib = on > 0.5 ? 1 + 0.03 * Math.sin(T * 18) : 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {on > 0 && <circle cx={0} cy={-70} r={210 * vib} fill={KC.yellow} opacity={0.28 * on} />}
    {on > 0 && Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 - Math.PI / 2; const r0 = 130, r1 = 130 + 60 * on * vib;
      return <line key={i} x1={Math.cos(a) * r0} y1={-70 + Math.sin(a) * r0} x2={Math.cos(a) * r1} y2={-70 + Math.sin(a) * r1} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" opacity={on} />; })}
    <path d="M -100 -70 A 100 100 0 1 1 100 -70 C 100 -20 60 0 50 40 L -50 40 C -60 0 -100 -20 -100 -70 Z" fill={mixHex('#e9f3f7', '#fff27a', on)} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -30 30 L -30 -40 Q 0 -80 30 -40 L 30 30" fill="none" stroke={mixHex('#8a8f99', '#ff8a1f', on)} strokeWidth={8} strokeLinecap="round" />
    <rect x={-52} y={40} width={104} height={26} rx={6} fill="#c9ccd3" stroke={KC.ink} strokeWidth={7} />
    <rect x={-48} y={64} width={96} height={24} rx={6} fill="#aeb2bb" stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 88 L 30 88 L 14 112 L -14 112 Z" fill="#545a66" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text x={0} y={-48} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{watts}</text>
  </g>;
}
// Dona de porcentaje con un cerebrito al centro.
function Dona({ x, y, r = 165, p = 0, color = KC.pink, T = 0, id }) {
  const a = Math.PI * 2 * p - Math.PI / 2, gr = p > 0.5 ? 1 : 0;
  const d = p <= 0 ? '' : p >= 1 ? '' : `M 0 0 L 0 ${-r} A ${r} ${r} 0 ${gr} 1 ${Math.cos(a) * r} ${Math.sin(a) * r} Z`;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fffdf6" stroke={KC.ink} strokeWidth={9} />
    {d && <path d={d} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />}
    <circle r={r * 0.52} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
    <Cerebro x={0} y={14} s={0.19} T={T} id={id} />
  </g>;
}
// Red de neuronas que se encienden (fondo oscuro).
function RedNeuronas({ T, t0, n = 46, seed = 8 }) {
  const r = krng(seed), pts = Array.from({ length: n }, () => ({ x: 60 + r() * 960, y: 380 + r() * 820, f: r() * 6.28, d: r() }));
  const enl = [];
  pts.forEach((p, i) => { pts.forEach((q, j) => { if (j > i && Math.hypot(p.x - q.x, p.y - q.y) < 200) enl.push([p, q, i + j]); }); });
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {enl.map(([p, q, k], i) => { const on = kprog(T, t0 + p.d * 2, t0 + p.d * 2 + 0.4); const u = ((T * 0.8 + k * 0.13) % 1);
      return <g key={i} opacity={on}>
        <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={KC.cyan} strokeOpacity=".35" strokeWidth={4} />
        <circle cx={klerp(p.x, q.x, u)} cy={klerp(p.y, q.y, u)} r={6} fill={KC.yellow} opacity={Math.sin(Math.PI * u)} />
      </g>; })}
    {pts.map((p, i) => { const on = kprog(T, t0 + p.d * 2, t0 + p.d * 2 + 0.3, kEase.rebote), b = 0.5 + 0.5 * Math.sin(T * 5 + p.f);
      return <g key={i} transform={`translate(${p.x} ${p.y}) scale(${on})`}>
        <circle r={26} fill={KC.pink} opacity={0.25 * b} />
        <circle r={15} fill={mixHex('#ff9fc0', '#ffe11a', b)} stroke={KC.ink} strokeWidth={4} />
      </g>; })}
  </svg>;
}
// Cuadrícula de 35 cerebritos que se llena (700 W ÷ 20 W).
function Cerebritos({ T, n, x = 120, y = 990, cols = 7, dx = 140, dy = 46 }) {
  const out = [];
  for (let i = 0; i < 35; i++) { const c = i % cols, f = Math.floor(i / cols), on = kclamp(n - i, 0, 1);
    out.push(<g key={i} opacity={0.15 + 0.85 * on}><Cerebro x={x + c * dx} y={y + f * dy} s={0.11 + 0.02 * on} id={`m${i}`} color={on > 0 ? ROSA_CEREBRO : '#ddd'} /></g>); }
  return <>{out}</>;
}
// Mosaico de tarjetas H100 que se aleja (centro de datos): patrón SVG que se escala.
function MosaicoGPU({ T, z }) {
  const tw = 260, th = 150;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs>
      <pattern id="gpuTile" width={tw} height={th} patternUnits="userSpaceOnUse" patternTransform={`translate(540 760) scale(${z}) translate(${-tw / 2} ${-th / 2})`}>
        <rect x={10} y={10} width={tw - 20} height={th - 30} rx={14} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
        <rect x={30} y={th - 22} width={tw - 90} height={10} fill={KC.gold} />
        <circle cx={tw / 2 - 55} cy={th / 2 - 8} r={36} fill="#151a24" stroke={KC.ink} strokeWidth={5} />
        <circle cx={tw / 2 + 55} cy={th / 2 - 8} r={36} fill="#151a24" stroke={KC.ink} strokeWidth={5} />
        <circle cx={tw / 2 - 55} cy={th / 2 - 8} r={9} fill={KC.cyan} /><circle cx={tw / 2 + 55} cy={th / 2 - 8} r={9} fill={KC.cyan} />
        <circle cx={tw - 30} cy={26} r={6} fill={KC.red} />
      </pattern>
    </defs>
    <rect x={0} y={0} width={KW} height={KH} fill="url(#gpuTile)" />
  </svg>;
}
// Balanza que no se equilibra: cerebro de un lado, tarjeta del otro.
function Balanza({ x, y, T }) {
  const a = Math.sin(T * 1.7) * 0.16, L = 300, ex = Math.cos(a) * L, ey = Math.sin(a) * L;
  const Plato = ({ px, py, children }) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-90} y2={150} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={90} y2={150} stroke={KC.ink} strokeWidth={5} />
    <path d="M -120 150 L 120 150 Q 100 190 0 190 Q -100 190 -120 150 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g transform="translate(0 150)">{children}</g>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-14} y={0} width={28} height={340} fill="#6b5a4a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -130 360 L 130 360 L 100 330 L -100 330 Z" fill="#6b5a4a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={-ex} y1={-ey} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <circle r={20} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <Plato px={-ex} py={-ey}><Cerebro x={0} y={-40} s={0.33} T={T} id="bal" /></Plato>
    <Plato px={ex} py={ey}><TarjetaGPU T={T} x={0} y={-40} s={0.42} etiqueta="" /></Plato>
  </g>;
}
// Dos neuronas: el cuerpo "calcula" (destello) y el axón largo "manda la señal" (pulso que viaja).
const AXON_D = 'M 470 640 C 620 640 640 860 780 880 C 860 890 880 860 930 860';
function Neuronas2({ T, t0 }) {
  const ap = kprog(T, t0, t0 + 1.0, kEase.sale), u = ((T - t0) * 0.7) % 1, chispa = 0.5 + 0.5 * Math.sin(T * 9);
  const dend = [[-1, -0.6], [-0.8, 0.7], [0.1, -1], [-0.2, 1], [-1, 0.1]];
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:ap }}>
    {dend.map(([dx, dy], i) => <path key={i} d={`M 420 640 q ${dx * 50} ${dy * 30} ${dx * 95} ${dy * 85} m ${-dx * 30} ${-dy * 30} l ${dx * 10 - dy * 25} ${dy * 10 + dx * 25}`} fill="none" stroke={ROSA_CEREBRO} strokeWidth={9} strokeLinecap="round" />)}
    <path d={AXON_D} fill="none" stroke={ROSA_CEREBRO} strokeWidth={12} strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900 * (1 - ap)} />
    <path d={AXON_D} fill="none" stroke={KC.ink} strokeWidth={3} strokeOpacity=".4" strokeDasharray="20 18" />
    <circle cx={950} cy={860} r={28} fill={ROSA_CEREBRO} stroke={KC.ink} strokeWidth={6} />
    <circle cx={420} cy={640} r={56} fill={ROSA_CEREBRO} stroke={KC.ink} strokeWidth={8} />
    <circle cx={420} cy={640} r={20} fill={KC.violet} />
    <circle cx={420} cy={640} r={70 + 20 * chispa} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={0.6 * chispa} />
    <AxonPulso T={T} u={u} />
  </svg>;
}
function AxonPulso({ T, u }) {
  // punto sobre la curva cúbica por tramos
  const seg = u < 0.7 ? [[470, 640], [620, 640], [640, 860], [780, 880], u / 0.7] : [[780, 880], [860, 890], [880, 860], [930, 860], (u - 0.7) / 0.3];
  const [p0, p1, p2, p3, t] = seg, b = (i) => (1 - t) ** 3 * p0[i] + 3 * (1 - t) ** 2 * t * p1[i] + 3 * (1 - t) * t * t * p2[i] + t ** 3 * p3[i];
  return <g><circle cx={b(0)} cy={b(1)} r={30} fill={KC.yellow} opacity=".35" /><circle cx={b(0)} cy={b(1)} r={15} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Barras horizontales con valor libre (W).
function BarrasW({ T, at, until, filas, top = 930, max }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:16, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 34px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(16, 640 * f.valor / max * g), height:64, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:14 }}></div>
          <div style={{ font:`400 62px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{f.texto}</div>
        </div>
      </div>; })}
  </div>;
}
// Hala Point esquemático: chasis del tamaño de un microondas lleno de chips que parpadean.
function CajaHala({ x, y, s = 1, T = 0, calor = 0 }) {
  const r = krng(5), leds = [];
  for (let f = 0; f < 6; f++) for (let c = 0; c < 12; c++) leds.push({ f, c, ph: r() * 6.28, v: 2 + r() * 5 });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-250} y={-170} width={500} height={340} rx={22} fill={mixHex('#3a4255', '#7a1f1f', calor)} stroke={KC.ink} strokeWidth={9} />
    <rect x={-220} y={-140} width={440} height={280} rx={10} fill="#141925" />
    {leds.map((l, i) => { const on = 0.5 + 0.5 * Math.sin(T * l.v + l.ph);
      return <g key={i}><rect x={-205 + l.c * 35.5} y={-128 + l.f * 45} width={28} height={34} rx={4} fill="#26324a" stroke="#0b0f18" strokeWidth={2} />
        <circle cx={-191 + l.c * 35.5} cy={-104 + l.f * 45} r={5} fill={on > 0.5 ? KC.mint : '#1f5545'} /></g>; })}
    {calor > 0.05 && [0, 1, 2].map((k) => <path key={k} d={`M ${-120 + k * 120} -190 q 18 -24 0 -48 q -18 -24 0 -48`} stroke={KC.orange} strokeWidth={8} fill="none" strokeLinecap="round" opacity={calor * (0.5 + 0.5 * Math.sin(T * 6 + k))} />)}
  </g>;
}

function CerebroWatts() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Cuerpo, N: CUES.Neuronas, Mi: CUES.Mito, Ta: CUES.Tarjeta, Ml: CUES.Miles, P: CUES.Pregunta, O: CUES.Ojo, E: CUES.Estudio, Co: CUES.Copia, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // el "cable" de luz del cerebro al foco
  const CABLE = 'M 400 700 C 560 640 700 760 790 900';
  const cableG = kprog(T, K.G + 0.25, K.G + 1.0, kEase.sale), focoG = kprog(T, K.G + 0.9, K.G + 1.2, kEase.sale);
  const potGPU = kprog(T, K.Ta + 0.6, K.Ta + 2.2, kEase.sale);
  const zMos = Math.exp(klerp(Math.log(2.4), Math.log(0.16), kprog(T, K.Ml + 0.2, K.Ml + 3.4, kEase.suave)));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu cerebro prende un foco de 20 W */}
      <Escena T={T} a={K.G} b={K.Cu}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Cabeza x={320} y={900} s={0.95} T={T} brillo={cableG} id="cabG" />
          <path d={CABLE} fill="none" stroke={KC.orange} strokeWidth={12} strokeLinecap="round" strokeDasharray="12 22" strokeDashoffset={-T * 60} opacity={cableG} />
          <path d={CABLE} fill="none" stroke={KC.yellow} strokeWidth={22} strokeLinecap="round" strokeDasharray="700" strokeDashoffset={700 * (1 - cableG)} opacity=".5" />
          <Foco x={800} y={1040} s={1.0} on={focoG} T={T} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 1.2} until={K.Cu - 0.2} valor={20} dur={0.8} prefijo="≈" sufijo=" W" x={330} y={440} tam={190} color={KC.orange} />
      {/* 1 · 2 % del peso, 20 % de la energía */}
      <Escena T={T} a={K.Cu} b={K.N}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Dona x={280} y={900} p={0.02 * kprog(T, K.Cu + 0.4, K.Cu + 1.2, kEase.sale)} color={KC.pink} T={T} id="d1" />
          <Dona x={790} y={900} p={0.2 * kprog(T, K.Cu + 2.2, K.Cu + 3.2, kEase.sale)} color={KC.orange} T={T} id="d2" />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Cu + 0.4} until={K.N - 0.2} valor={2} dur={0.6} sufijo=" %" etiqueta="del peso" x={280} y={600} tam={120} color={KC.pink} />
      <NumeroGigante T={T} at={K.Cu + 2.2} until={K.N - 0.2} valor={20} dur={0.8} sufijo=" %" etiqueta="de tu energía" x={790} y={1150} tam={110} color={KC.orange} />
      {/* 2 · 86 mil millones de neuronas (por dentro: fondo oscuro) */}
      <Escena T={T} a={K.N} b={K.Mi} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <RedNeuronas T={T} t0={K.N - 0.3} />
      </Escena>
      <NumeroGigante T={T} at={K.N + 0.5} until={K.Mi - 0.2} valor={86} dur={1.2} prefijo="≈" x={540} y={640} tam={260} color={KC.pink} />
      <Chip T={T} at={K.N + 1.0} until={K.Mi - 0.2} texto="mil millones de neuronas" y={830} tam={50} borde={KC.pink} />
      {/* 3 · el mito del 10 % */}
      <Escena T={T} a={K.Mi} b={K.Ta}>
        <FondoLunares color={KC.lilac} />
        {svg(<Cerebro x={540} y={860} s={1.75} T={T} id="mito" zonas={kprog(T, K.Mi + 1.4, K.Mi + 3.4)} />)}
      </Escena>
      <MitoTachado T={T} at={K.Mi + 0.1} tacharEn={K.Mi + 1.0} until={K.Ta - 0.2} texto="«Solo usas el 10 %»" x={400} y={470} tam={50} />
      <Chip T={T} at={K.Mi + 2.0} until={K.Ta - 0.2} texto="en un día: casi todo se enciende" y={1110} tam={38} borde={KC.ink} />
      {/* 4 · una tarjeta de IA: hasta 700 W */}
      <Escena T={T} a={K.Ta} b={K.Ml}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <TarjetaGPU T={T} x={600} y={640} s={1.3} calor={potGPU} etiqueta="H100 SXM" />
          <Cerebritos T={T} n={35 * kprog(T, K.Ta + 2.6, K.Ta + 4.4)} />
        </>)}
      </Escena>
      <Medidor T={T} at={K.Ta + 0.4} until={K.Ml - 0.2} y={830} etiqueta="potencia máxima" color={KC.red} valor={potGPU} texto={(v) => `${kformato(Math.round(700 * v))} W`} />
      <Chip T={T} at={K.Ta + 2.6} until={K.Ml - 0.2} texto="700 W ÷ 20 W = 35 cerebros" x={660} y={430} tam={36} borde={KC.ink} />
      {/* 5 · Llama 3: hasta 16 000 a la vez */}
      <Escena T={T} a={K.Ml} b={K.P}>
        <FondoCircuito T={T} />
        <MosaicoGPU T={T} z={zMos} />
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, transparent 30%, rgba(13,20,36,.75) 85%)` }}></div>
      </Escena>
      {T >= K.Ml + 0.6 && T < K.P + 0.4 && <div style={{ opacity:kprog(T, K.Ml + 0.6, K.Ml + 0.9) * (1 - kprog(T, K.P - 0.1, K.P + 0.3)) }}>
        <Contador T={T} at={K.Ml + 0.6} desde={1} hasta={16000} dur={2.6} x={540} y={460} tam={130} color={KC.yellow} />
      </div>}
      <Chip T={T} at={K.Ml + 0.9} until={K.P - 0.2} texto="tarjetas H100 a la vez" y={580} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Ml + 1.8} until={K.P - 0.2} texto="Llama 3 405B · Meta · 2024" y={1080} tam={36} borde={KC.cyan} />
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.O} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Cerebro x={270} y={560} s={0.6} T={T} id="preg" />
          <text x={290} y={1130} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 950)`}>?</text>
        </>)}
      </Escena>
      {/* 7 · ojo: no se comparan uno a uno */}
      <Escena T={T} a={K.O} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<Balanza x={540} y={600} T={T} />)}
      </Escena>
      <Aparece T={T} at={K.O + 0.4} until={K.E - 0.2} x={430} y={440}><div style={{ font:`400 200px/1 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`7px ${KC.ink}`, textShadow:`8px 8px 0 ${KC.ink}` }}>≠</div></Aparece>
      <Chip T={T} at={K.O + 2.4} until={K.E - 0.2} texto="la tarjeta: otro tipo de trabajo" y={1020} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.O + 3.8} until={K.E - 0.2} texto="el cerebro: no es una computadora digital" y={1100} tam={34} borde={KC.ink} />
      {/* 8 · el estudio (por dentro de la corteza: fondo oscuro) */}
      <Escena T={T} a={K.E} b={K.Co}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Neuronas2 T={T} t0={K.E + 3.4} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2021" quien="Universidad de Virginia" revista="Levy y Calvert · PNAS" y={700} />
      <Etq T={T} at={K.E + 4.4} until={K.Co - 0.2} x={420} y={530} texto="calcular" lado="der" color={KC.yellow} />
      <Etq T={T} at={K.E + 5.6} until={K.Co - 0.2} x={760} y={780} texto="mandar señales lejos" lado="izq" color={KC.yellow} />
      <BarrasW T={T} at={K.E + 4.6} until={K.Co - 0.2} top={940} max={3.5} filas={[
        { valor: 0.1, texto: '0.1 W', etiqueta: 'calcular', color: KC.mint },
        { valor: 3.5, texto: '3.5 W · ×35', etiqueta: 'mandar señales lejos', color: KC.orange, at: K.E + 6.0 }]} />
      <Chip T={T} at={K.E + 6.6} until={K.Co - 0.2} texto="estimación teórica · corteza humana" y={430} x={600} tam={30} borde={KC.cyan} />
      {/* 9 · la copia: Hala Point */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<CajaHala x={440} y={720} s={0.95} T={T} calor={kprog(T, K.Co + 4.0, K.Co + 5.5)} />)}
      </Escena>
      <Chip T={T} at={K.Co + 0.3} until={K.Co + 5.6} texto="Hala Point · Intel · 2024" x={420} y={450} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.9} until={K.Co + 5.6} texto="prototipo de investigación" x={420} y={530} tam={30} borde={KC.ink} />
      {T >= K.Co + 2.2 && T < K.C + 0.3 && <div style={{ opacity:kprog(T, K.Co + 2.2, K.Co + 2.5) * (1 - kprog(T, K.C - 0.2, K.C + 0.2)) }}>
        <Contador T={T} at={K.Co + 2.2} desde={0} hasta={1150} dur={1.6} sufijo=" millones" x={540} y={950} tam={78} color={KC.texto} />
      </div>}
      <Chip T={T} at={K.Co + 2.6} until={K.C - 0.2} texto="de neuronas artificiales" y={1030} tam={34} borde={KC.ink} />
      <Medidor T={T} at={K.Co + 4.0} until={K.C - 0.2} y={1080} etiqueta="hasta" color={KC.red} valor={kprog(T, K.Co + 4.0, K.Co + 5.5, kEase.sale)} texto={(v) => `${kformato(Math.round(2600 * v))} W`} />
      <Chip T={T} at={K.Co + 5.8} until={K.C - 0.2} texto="tu cerebro: ≈ 86,000 millones con ≈ 20 W" x={540} y={480} tam={32} borde={KC.leaf} />
      {/* 10 · cierre: la misma cabeza y el mismo foco */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity=".85"><TarjetaGPU T={T} x={560} y={420} s={0.55} calor={1} etiqueta="700 W" /></g>
          <Cabeza x={320} y={900} s={0.95} T={T} brillo={1} id="cabC" />
          <path d={CABLE} fill="none" stroke={KC.orange} strokeWidth={12} strokeLinecap="round" strokeDasharray="12 22" strokeDashoffset={-T * 60} />
          <Foco x={800} y={1040} s={1.0} on={1} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="tu cerebro: ≈ 20 W" x={790} y={810} tam={40} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="Tu cerebro gasta *unos 20 watts.*" />
      <Subtitulo T={T} idx={1} at={K.Cu + 0.1} until={K.N - 0.1} texto="2 % de tu peso, *20 % de tu energía.*" />
      <Subtitulo T={T} idx={2} at={K.N + 0.1} until={K.Mi - 0.1} texto="*86 mil millones* de neuronas." />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.Ta - 0.1} texto="¿Solo el 10 %? *Mito.*" />
      <Subtitulo T={T} idx={4} at={K.Ta + 0.1} until={K.Ml - 0.1} texto="Una tarjeta de IA: *hasta 700 W.*" />
      <Subtitulo T={T} idx={5} at={K.Ml + 0.1} until={K.P - 0.1} texto="Llama 3: *16 mil a la vez.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.O - 0.1} texto="¿Tu cabeza *le gana?*" />
      <Subtitulo T={T} idx={7} at={K.O + 0.1} until={K.E - 0.1} texto="No se comparan *uno a uno.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Co - 0.1} texto="Mandar señales cuesta *35 veces más.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.C - 0.1} texto="Hala Point: *hasta 2,600 W.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu foquito de 20 W *da clases de ahorro.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cuerpo + 1.0, CUES.Neuronas - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Mito + 0.8, CUES.Tarjeta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Tarjeta + 2.5, CUES.Miles + 1.0, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Ojo + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ojo + 2.5, CUES.Estudio - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Estudio + 4.5, CUES.Copia - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Copia + 3.5, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="24" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CerebroWattsApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CerebroWatts /></CompositionStage></div>;
}
window.CerebroWattsApp = CerebroWattsApp;
