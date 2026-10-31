// cine-cap1b.jsx — capítulo 1 (La semilla), segunda mitad: la mesa de jitomates, mayoreo/menudeo, la papaya y las plantas de colección.
const ILUSC = window.ILUSC;

// Huacal de madera de pino (caja de verdura).
function Huacal({ x, y, w = 260, h = 150, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 + 8} y={-h + 6} width={w - 16} height={h - 10} fill="#2a1d12" opacity={0.6} />
    {children}
    {[0, 1, 2].map((i) => <g key={i}><rect x={-w / 2} y={-h + i * (h / 3) + 6} width={w} height={h / 3 - 14} fill="url(#c-madera-pino)" /><rect x={-w / 2} y={-h + i * (h / 3) + 6} width={w} height={h / 3 - 14} fill="url(#c-arriba)" opacity={0.5} /></g>)}
    {[-1, 1].map((d) => <rect key={d} x={d > 0 ? w / 2 - 18 : -w / 2} y={-h - 6} width={18} height={h + 6} fill="url(#c-madera-pino)" />)}
    {[-1, 1].map((d) => <rect key={'s' + d} x={d > 0 ? w / 2 - 18 : -w / 2} y={-h - 6} width={18} height={h + 6} fill="#000" opacity={0.2} />)}
    {[[-w / 2 + 9, -h + 20], [w / 2 - 9, -h + 20], [-w / 2 + 9, -24], [w / 2 - 9, -24]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={2.5} fill="#555" />)}
  </g>;
}
// Letrero de cartón escrito a mano.
function Carton({ x, y, w, h, lineas, rot = -4, tam = 44 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={4} y={6} width={w} height={h} fill="#000" opacity={0.3} filter="url(#c-b4)" />
    <rect x={0} y={0} width={w} height={h} fill="#c9a067" /><rect x={0} y={0} width={w} height={h} fill="url(#c-papel-a)" />
    <path d={`M 0 ${h * 0.4} L ${w} ${h * 0.45}`} stroke="#9c7440" strokeWidth={2} opacity={0.5} />
    {lineas.map((l, i) => <text key={i} x={w / 2} y={tam + 10 + i * tam * 1.05} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={tam} fill={i === 0 ? '#1d4f9c' : '#2a2018'}>{l}</text>)}
  </g>;
}

/* ---------- la mesa de jitomates y el señor que se las llevó todas ---------- */
ILUSC.mesa_jitomates = {
  cam: { z0: 1.0, z1: 1.08, fx: 900, fy: 640, x0: 20, x1: -30 },
  dibuja: ({ p, tl, capa }) => {
    const n = 8;
    const llega = cpr(p, 0.3, 0.44, kEase.suave), toma = cpr(p, 0.46, 0.86), seva = cpr(p, 0.9, 1, kEase.suave);
    const tomadas = Math.floor(toma * n + 0.001);
    const sx = lerp(2300, 1610, llega) + lerp(0, 900, seva);
    const paso = (llega > 0 && llega < 1) || seva > 0 ? Math.sin(tl * 8) : 0;
    const pots = Array.from({ length: n }, (_, i) => [300 + i * 118, 690]);
    return <g>
      <g transform={capa(0.45)}>
        <rect x={-200} y={-200} width={2320} height={1100} fill="#d9774a" />
        <rect x={-200} y={-200} width={2320} height={1100} fill="url(#c-papel-a)" />
        <Desenfoque b={6}>
          <rect x={80} y={120} width={720} height={600} fill="#1a2430" /><MonitorFondo x={200} y={600} /><MonitorFondo x={420} y={600} /><MonitorFondo x={640} y={600} />
          <rect x={980} y={120} width={720} height={600} fill="#3a2418" /><circle cx={1340} cy={260} r={200} fill="#ffcf8a" opacity={0.35} filter="url(#c-b40)" />
          <rect x={60} y={80} width={1700} height={50} fill="url(#c-acero)" />
        </Desenfoque>
        <rect x={-200} y={700} width={2320} height={60} fill="#cfc3ae" />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={740} width={2320} height={400} fill="#a49a88" /><rect x={-200} y={740} width={2320} height={400} fill="url(#c-papel-a)" opacity={0.7} />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-200 + i * 300} 740 L ${-260 + i * 300} 1140`} stroke="#000" strokeOpacity={0.12} strokeWidth={3} />)}
        {/* el niño detrás de la mesa */}
        <Nene x={1340} y={1000} s={1.15} edad={6} t={tl} playera="#2f6fd0" brazoD={tomadas > 3 ? 40 : 8} brazoI={tomadas > 3 ? 40 : 8}
          mira={[llega > 0.5 ? 1 : -0.6, 0]} boca={tomadas >= n ? 'o' : tomadas > 2 ? 'risa' : 'sonrisa'} seed={4} />
        {/* mesa */}
        <rect x={210} y={700} width={1040} height={26} fill="url(#c-madera-clara)" /><rect x={210} y={700} width={1040} height={6} fill="#fff" opacity={0.3} />
        <rect x={210} y={726} width={1040} height={14} fill="#000" opacity={0.3} />
        {[240, 1200].map((lx, i) => <g key={i}><rect x={lx} y={726} width={22} height={260} fill="url(#c-madera-media)" /><rect x={lx} y={726} width={22} height={260} fill="#000" opacity={0.3} /></g>)}
        <Sombra x={730} y={990} rx={560} ry={18} o={0.4} b="c-b14" />
        {pots.map(([px, py], i) => i >= tomadas && <MacetaC key={i} x={px} y={py + 4} w={92} h={78}><MataJitomate x={0} y={-68} s={0.42} alto={0.75} t={tl + i * 0.7} seed={i + 3} frutos={0} /></MacetaC>)}
        <Carton x={560} y={735} w={300} h={140} lineas={['Plantas de', 'jitomate']} rot={-3} tam={46} />
        {/* el señor del sombrero */}
        <g transform={`translate(0 ${-Math.abs(paso) * 6})`}>
          <Adulto x={sx} y={1010} s={1.0} piel="#9a6340" camisa="#e9e1cf" pantalon="#3b3f52" sombrero="palma" bigote boca={tomadas > 0 && seva === 0 ? 'sonrisa' : 'sonrisa'} mira={[-1, 0.5]}
            brazoD={toma > 0 && toma < 1 ? 40 + 30 * Math.sin(toma * n * Math.PI) : 30} brazoI={-10} t={tl} seed={8}
            carga={<g transform="translate(-40 -200)"><Huacal x={0} y={0} w={240} h={130}>
              {Array.from({ length: tomadas }, (_, i) => <g key={i} transform={`translate(${-80 + (i % 4) * 54} ${-60 - Math.floor(i / 4) * 30})`}><MataJitomate x={0} y={0} s={0.3} alto={0.75} t={tl + i} seed={i + 3} /></g>)}
            </Huacal></g>} />
        </g>
      </g>
      <Polvo n={40} t={tl} seed={52} o={0.45} />
      <Tinte color="#ffb35a" o={0.14} />
      <g opacity={cpop(p, 0.87)}><NotaMano x={300} y={300} texto="¡se las llevó todas!" tl={tl} at={0} tam={74} color="#fff" rot={-5} /></g>
      <g opacity={1 - cpr(p, 0.8, 0.86)}><Rotulo x={120} y={190} arriba="MI PRIMER PUESTO" texto="Plantas de jitomate" tl={tl} at={0.4} tam={52} /></g>
    </g>;
  },
};
function MonitorFondo({ x, y }) { return <g transform={`translate(${x} ${y})`}><rect x={-80} y={-140} width={160} height={130} fill="#d8d2c2" /><rect x={-64} y={-126} width={128} height={96} fill="#4f9ae6" /></g>; }

/* ---------- plantas de olor: mayoreo → menudeo ---------- */
function Charola({ x, y, cols = 6, filas = 4, celda = 62, t = 0, faltan = [], tipo = 'albahaca', seed = 2 }) {
  const w = cols * celda, h = filas * celda * 0.62;
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={10} y={h / 2 + 10} rx={w * 0.6} ry={22} o={0.5} />
    <rect x={-w / 2 - 8} y={-h / 2 - 8} width={w + 16} height={h + 26} rx={6} fill="#141414" />
    {Array.from({ length: filas }, (_, f) => Array.from({ length: cols }, (_, c) => {
      const i = f * cols + c, cx = -w / 2 + c * celda + celda / 2, cy = -h / 2 + f * celda * 0.62 + celda * 0.31;
      return <g key={i}><ellipse cx={cx} cy={cy} rx={celda * 0.42} ry={celda * 0.22} fill="#2a2a2a" /><ellipse cx={cx} cy={cy + 2} rx={celda * 0.36} ry={celda * 0.17} fill="url(#c-tierra)" /></g>;
    }))}
    {Array.from({ length: filas }, (_, f) => Array.from({ length: cols }, (_, c) => {
      const i = f * cols + c, cx = -w / 2 + c * celda + celda / 2, cy = -h / 2 + f * celda * 0.62 + celda * 0.31;
      return !faltan.includes(i) && <HierbaOlor key={'p' + i} x={cx} y={cy} s={0.36} t={t + i * 0.3} seed={seed + i} tipo={tipo} />;
    }))}
  </g>;
}
ILUSC.mayoreo = {
  cam: { z0: 1.0, z1: 1.06, fx: 960, fy: 560, x0: -20, x1: 30 },
  dibuja: ({ p, tl, capa }) => {
    const pasa = cpr(p, 0.3, 0.85);
    const nPas = Math.floor(pasa * 12 + 0.001);
    const destinos = Array.from({ length: 12 }, (_, i) => [1250 + (i % 4) * 150, 470 + Math.floor(i / 4) * 130]);
    const origen = (i) => [520 + ((i % 6) - 2.5) * 78, 690 + (Math.floor(i / 6) - 1.5) * 78 * 0.62];
    const tipos = ['albahaca', 'hierbabuena', 'romero'];
    return <g>
      {/* invernadero con malla sombra: luz difusa, mesas que se pierden al fondo */}
      <g transform={capa(0.3)}>
        <linearGradient id="c-may-luz" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a9b9a0" /><stop offset="1" stopColor="#4a5c40" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={1400} fill="url(#c-may-luz)" />
        {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${-200 + i * 180} -200 L ${960 + (i - 7) * 40} 420`} stroke="#5b6b52" strokeWidth={6} opacity={0.5} />)}
        {Array.from({ length: 8 }, (_, i) => <path key={'h' + i} d={`M -200 ${-120 + i * 70} L 2120 ${-120 + i * 70}`} stroke="#5b6b52" strokeWidth={3} opacity={0.3} />)}
        <Desenfoque b={10}>
          {Array.from({ length: 5 }, (_, i) => <g key={i}><rect x={-200} y={420 + i * 40} width={2320} height={18 + i * 6} fill="#3a4a34" opacity={0.7} />
            {Array.from({ length: 24 }, (_, k) => <circle key={k} cx={-180 + k * 100 + (i % 2) * 50} cy={414 + i * 40} r={16 + i * 4} fill={['#5f9f4a', '#4f8f3e', '#7aa860'][k % 3]} />)}</g>)}
        </Desenfoque>
        <Halo x={960} y={0} r={700} color="#fffbe8" o={0.35} />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={760} width={2320} height={400} fill="url(#c-madera-pino)" /><rect x={-200} y={760} width={2320} height={400} fill="#000" opacity={0.25} />
        <rect x={-200} y={756} width={2320} height={8} fill="#fff" opacity={0.3} />
        {/* mayoreo: la charola con 24 plantitas */}
        <Charola x={520} y={690} cols={6} filas={4} celda={78} t={tl} faltan={Array.from({ length: nPas }, (_, i) => i)} seed={3} />
        {/* menudeo: cada plantita en su maceta, con su etiqueta */}
        {destinos.map(([dx, dy], i) => { if (i >= nPas) return null; const e = cpr(pasa * 12 - i, 0, 1);
          const [ox, oy] = origen(i), x = lerp(ox, dx, e), y = lerp(oy, dy, e) - Math.sin(e * Math.PI) * 160;
          return <g key={i}>
            {e >= 1 ? <MacetaC x={dx} y={dy + 70} w={96} h={80} tipo={i % 3 === 1 ? 'plastico' : 'barro'} color="#2a2a2a"><HierbaOlor x={0} y={-70} s={0.42} t={tl + i} seed={i + 3} tipo={tipos[i % 3]} />
              <g transform="translate(30 -40) rotate(8)"><rect x={0} y={-30} width={34} height={46} fill="#f6f1e4" /><path d={`M 17 16 L 17 40`} stroke="#f6f1e4" strokeWidth={6} /><text x={17} y={-8} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={16} fill="#2a2018">{['alb.', 'h.b.', 'rom.'][i % 3]}</text></g></MacetaC>
              : <HierbaOlor x={x} y={y} s={0.42} t={tl + i} seed={i + 3} tipo={tipos[i % 3]} />}
          </g>; })}
      </g>
      <Polvo n={60} t={tl} seed={61} o={0.6} />
      <g opacity={cpop(p, 0.08)}><Rotulo x={520} y={250} arriba="AL MAYOREO" texto="Una charola" tl={tl} at={0.3} alinear="middle" tam={58} /></g>
      <g opacity={cpop(p, 0.45)}><Rotulo x={1475} y={250} arriba="AL MENUDEO" texto="Una por una" tl={tl} at={0} alinear="middle" tam={58} /></g>
      <g opacity={cpop(p, 0.3)}><path d={`M 900 ${470 + 6 * Math.sin(tl * 3)} Q 1010 ${420 + 6 * Math.sin(tl * 3)} 1120 ${470 + 6 * Math.sin(tl * 3)}`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="14 12" />
        <path d={`M 1100 ${450 + 6 * Math.sin(tl * 3)} L 1124 ${472 + 6 * Math.sin(tl * 3)} L 1096 ${484 + 6 * Math.sin(tl * 3)}`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" /></g>
      <Tinte color="#cfe8b0" o={0.12} />
    </g>;
  },
};

/* ---------- la papaya en el bote de detergente de 20 litros ---------- */
function Papayo({ x, y, s = 1, t = 0, seed = 3 }) {
  const m = mece(t, seed, 0.5) * 4;
  const hojas = [-70, -40, -12, 14, 42, 72, -100, 100];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -16 0 Q -12 -200 ${m * 0.5 - 10} -420 L ${m * 0.5 + 10} -420 Q 14 -200 18 0 Z`} fill="#8a9a6a" />
    <path d={`M -16 0 Q -12 -200 ${m * 0.5 - 10} -420 L ${m * 0.5 + 10} -420 Q 14 -200 18 0 Z`} fill="url(#c-cilindro)" />
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${-14 + i * 0.3} ${-30 - i * 27} q 14 -6 28 0`} stroke="#5f6e48" strokeWidth={3} fill="none" opacity={0.7} />)}
    {hojas.map((a, i) => { const ar = ((a - 90) * Math.PI) / 180, L = 230 + (i % 3) * 30, ex = m * 0.5 + Math.cos(ar) * L, ey = -420 + Math.sin(ar) * L * 0.75 + (Math.abs(a) > 60 ? 70 : 0);
      return <g key={i}>
        <path d={`M ${m * 0.5} -420 Q ${m * 0.5 + Math.cos(ar) * L * 0.5} ${-420 + Math.sin(ar) * L * 0.5 - 30} ${ex} ${ey}`} stroke="#a7b86a" strokeWidth={7} fill="none" />
        <g transform={`translate(${ex} ${ey}) rotate(${a * 0.6 + mece(t, seed + i, 0.7) * 6})`}>
          {[-60, -30, 0, 30, 60].map((l, k) => <Hoja key={k} x={0} y={0} len={110 - Math.abs(l) * 0.6} w={0.4} ang={-90 + l} color={k % 2 ? '#3f8a3a' : '#4c9a42'} venas={4} borde="dentado" />)}
        </g>
      </g>; })}
    {[[-22, -400], [20, -392], [0, -372]].map(([fx, fy], i) => <g key={i}><ellipse cx={fx + m * 0.5} cy={fy} rx={22} ry={36} fill="#7fae3a" /><ellipse cx={fx + m * 0.5} cy={fy} rx={22} ry={36} fill="url(#c-esfera)" /></g>)}
  </g>;
}
function Cubeta({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-300} rx={150} ry={34} fill="url(#c-tierra)" /><ellipse cx={0} cy={-300} rx={150} ry={34} fill="#000" opacity={0.25} />
    {children}
    <path d="M -160 -300 L 160 -300 L 132 0 L -132 0 Z" fill="#f2f2ee" /><path d="M -160 -300 L 160 -300 L 132 0 L -132 0 Z" fill="url(#c-cilindro)" />
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-158 + i * 3} ${-276 + i * 16} L ${158 - i * 3} ${-276 + i * 16}`} stroke="#000" strokeOpacity={0.12} strokeWidth={4} />)}
    <rect x={-112} y={-210} width={224} height={150} rx={8} fill="#1f5fbf" /><rect x={-112} y={-210} width={224} height={150} rx={8} fill="url(#c-cilindro)" opacity={0.6} />
    <path d="M -112 -120 Q 0 -160 112 -120 L 112 -60 L -112 -60 Z" fill="#f4c23a" opacity={0.9} />
    <text x={0} y={-165} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={34} fill="#fff" letterSpacing={2}>DETERGENTE</text>
    <text x={0} y={-80} textAnchor="middle" fontFamily={FUENTE.texto} fontWeight={900} fontSize={44} fill="#1d2a5a">20 L</text>
    <ellipse cx={0} cy={-300} rx={160} ry={14} fill="none" stroke="#dcdcd6" strokeWidth={10} />
    <path d="M -150 -290 Q 0 -470 150 -290" stroke="url(#c-acero)" strokeWidth={6} fill="none" />
  </g>;
}
ILUSC.papaya = {
  cam: { z0: 1.0, z1: 1.12, fx: 1000, fy: 640 },
  dibuja: ({ p, tl, capa }) => {
    const L2 = 0.72;                                  // empieza "la pasión no te salva…"
    // a empujones: avanza a tirones (empuja rápido, se detiene, vuelve a empujar)
    const camina = cpr(p, 0, L2 - 0.04), N = 7, f = camina * N, k = Math.min(N - 1, Math.floor(f)), fr = f - k;
    const tiron = (k + (fr < 0.35 ? kEase.suave(fr / 0.35) : 1)) / N, empujando = p < L2 && fr < 0.35;
    const kx = lerp(420, 980, tiron);
    const papas = cpr(p, 0.32, 0.42), cansado = cpr(p, L2, L2 + 0.08);
    return <g>
      {/* patio: pared con bugambilia, tendedero, piso de cemento */}
      <g transform={capa(0.45)}>
        <linearGradient id="c-pap-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7fb2e0" /><stop offset="1" stopColor="#e9f0e6" /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={600} fill="url(#c-pap-cielo)" />
        <rect x={-200} y={240} width={2320} height={700} fill="#e7d3b0" /><rect x={-200} y={240} width={2320} height={700} fill="url(#c-papel-a)" />
        <rect x={-200} y={230} width={2320} height={16} fill="#cdb895" />
        {Array.from({ length: 70 }, (_, i) => { const r = R(1000 + i); return <circle key={i} cx={1100 + r() * 1000} cy={180 + r() * 320} r={20 + r() * 34} fill={i % 3 ? '#d6267a' : '#3f7f34'} opacity={0.95} />; })}
        <Desenfoque b={2}>
          <path d="M 600 140 Q 950 200 1300 140" stroke="#ddd" strokeWidth={3} fill="none" />
          {[['#e64a5a', 720, 120], ['#3f8fd6', 880, 90], ['#f4c23a', 1040, 140], ['#fff', 1200, 110]].map(([c, cx, h], i) => <path key={i} d={`M ${cx - 60} ${150 + Math.abs(cx - 600) * 0.0} L ${cx + 60} 150 L ${cx + 50 + Math.sin(tl * 1.4 + i) * 10} ${150 + h} L ${cx - 50 + Math.sin(tl * 1.4 + i) * 10} ${150 + h} Z`} fill={c} opacity={0.95} />)}
        </Desenfoque>
        {/* puerta de la casa: ahí aparecen los papás */}
        <rect x={60} y={300} width={300} height={640} fill="#3a2a1e" />
        <g opacity={papas} transform={`translate(${(1 - papas) * -40} 0)`}>
          <Adulto x={170} y={940} s={0.95} camisa="#2f6a8f" boca="o" mira={[1, 0.4]} brazoD={20} t={tl} seed={5} />
          <Adulto x={290} y={940} s={0.92} camisa="#6a4c9c" mujer piel="#eccdb2" boca="o" mira={[1, 0.4]} brazoI={60} brazoD={10} t={tl} seed={2} />
        </g>
        <rect x={40} y={290} width={340} height={20} fill="#8a5a33" /><rect x={40} y={290} width={20} height={650} fill="#8a5a33" /><rect x={360} y={290} width={20} height={650} fill="#8a5a33" />
      </g>
      <g transform={capa(1)}>
        <rect x={-200} y={930} width={2320} height={300} fill="#b9b3a6" /><rect x={-200} y={930} width={2320} height={300} fill="url(#c-papel-a)" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${-200 + i * 420} 930 L ${-320 + i * 420} 1230`} stroke="#000" strokeOpacity={0.12} strokeWidth={3} />)}
        {/* la cubeta con la papaya, en el piso, y el niño empujándola */}
        <g transform={`translate(${kx + 250} 1010)`}><Cubeta x={0} y={0} s={0.62}><g transform={`rotate(${empujando ? 4 : 0})`}><Papayo x={0} y={-300} s={1.25} t={tl} seed={4} /></g></Cubeta>
          {empujando && [0, 1, 2, 3].map((d) => <circle key={d} cx={-70 - d * 30} cy={-6 - d * 4} r={14 + d * 8} fill="#d9cdb8" opacity={0.5 - d * 0.1} />)}</g>
        <g transform={`translate(${kx} 1010) rotate(${p < L2 ? (empujando ? 16 : 9) : lerp(9, 0, cansado)} 0 0)`}>
          <Nene x={0} y={0} s={1.1} edad={6} t={tl} playera="#e8742a" brazoD={p < L2 ? 84 : 20} brazoI={p < L2 ? -64 : -20} mira={[1, p < L2 ? 0 : -0.5]} boca={p < L2 ? (empujando ? 'ay' : 'sonrisa') : 'o'} cejas={empujando ? 1 : 0} seed={6} />
          {cansado > 0 && [0, 1, 2].map((d) => <path key={d} d={`M ${-90 - d * 14} ${-430 + d * 20} q -12 -18 -4 -34`} stroke="#bfe6ff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={cansado} />)}
        </g>
      </g>
      <Tinte color="#ffcf8a" o={0.12} />
      <Polvo n={40} t={tl} seed={71} o={0.5} />
      <Rotulo x={120} y={190} arriba="A LOS CINCO O SEIS AÑOS" texto="Una papaya de 20 litros" tl={tl} at={0.5} tam={52} />
    </g>;
  },
};

/* ---------- plantas de colección: cactus, suculentas y carnívoras ---------- */
function Mammillaria({ x, y, s = 1, t = 0, flor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-70} rx={80} ry={76} fill="#5f8f4a" /><ellipse cx={0} cy={-70} rx={80} ry={76} fill="url(#c-esfera)" />
    {Array.from({ length: 70 }, (_, i) => { const a = i * 2.399, rr = Math.sqrt(i / 70) * 74; const cx = Math.cos(a) * rr, cy = -70 + Math.sin(a) * rr * 0.95;
      return <g key={i}><circle cx={cx} cy={cy} r={4} fill="#eef2e4" />{[0, 1, 2, 3, 4, 5].map((k) => <path key={k} d={`M ${cx} ${cy} l ${Math.cos(k + a) * 9} ${Math.sin(k + a) * 9}`} stroke="#fff" strokeWidth={1} opacity={0.8} />)}</g>; })}
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.28; return <g key={'f' + i} transform={`translate(${Math.cos(a) * 52} ${-118 + Math.sin(a) * 18}) scale(${flor})`}>{[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={0} cy={-8} rx={4} ry={9} fill="#e8467c" transform={`rotate(${k * 72})`} />)}<circle r={3} fill="#f6d02a" /></g>; })}
  </g>;
}
function Echeveria({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[3, 2, 1, 0].map((cap) => Array.from({ length: 9 + cap * 2 }, (_, i) => { const a = (i / (9 + cap * 2)) * 360 + cap * 17, L = 34 + cap * 22;
      return <g key={cap * 30 + i} transform={`translate(0 -40) rotate(${a}) scale(1 0.55)`}>
        <path d={`M 0 0 C ${L * 0.2} ${-L * 0.3} ${L * 0.8} ${-L * 0.3} ${L} 0 C ${L * 0.8} ${L * 0.3} ${L * 0.2} ${L * 0.3} 0 0 Z`} fill={mix('#8fb3ad', '#a9c9c0', cap / 3)} />
        <path d={`M ${L * 0.85} -4 L ${L} 0 L ${L * 0.85} 4 Z`} fill="#d86a8a" />
        <path d={`M 0 0 L ${L} 0`} stroke="#fff" strokeOpacity={0.25} strokeWidth={3} />
      </g>; }))}
  </g>;
}
function Dionaea({ x, y, s = 1, t = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-60, -25, 15, 50, 80].map((a, i) => { const ar = ((a - 90) * Math.PI) / 180, L = 90 + (i % 2) * 20, ex = Math.cos(ar) * L, ey = Math.sin(ar) * L - 10, ab = 0.6 + 0.4 * Math.sin(t * 0.8 + i);
      return <g key={i}>
        <path d={`M 0 -10 L ${ex * 0.7} ${ey * 0.7}`} stroke="#6fae3a" strokeWidth={12} strokeLinecap="round" />
        <g transform={`translate(${ex} ${ey}) rotate(${a})`}>
          {[-1, 1].map((d) => <g key={d} transform={`rotate(${d * 30 * ab})`}>
            <path d={`M 0 0 Q ${d * 34} -10 ${d * 36} -40 Q ${d * 18} -50 0 -44 Z`} fill="#8bbf4a" />
            <path d={`M 0 -4 Q ${d * 26} -12 ${d * 28} -36 Q ${d * 14} -44 0 -40 Z`} fill="#c8233a" />
            {Array.from({ length: 9 }, (_, k) => { const q = k / 8, px = d * lerp(36, 2, q) + d * 2, py = lerp(-40, -46, q) - Math.sin(q * 3) * 4; return <path key={k} d={`M ${px} ${py} l ${d * 10} -8`} stroke="#d9e98a" strokeWidth={2} />; })}
          </g>)}
        </g>
      </g>; })}
  </g>;
}
function Sarracenia({ x, y, s = 1, t = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-26, 0, 24].map((dx, i) => { const h = 260 + i * 30, m = mece(t, i + 3, 0.5) * 4;
      return <g key={i} transform={`rotate(${dx * 0.3 + m} 0 0)`}>
        <path d={`M ${dx - 6} 0 Q ${dx - 10} ${-h * 0.5} ${dx - 22} ${-h} L ${dx + 22} ${-h} Q ${dx + 10} ${-h * 0.5} ${dx + 6} 0 Z`} fill="#9ccf4a" />
        {Array.from({ length: 10 }, (_, k) => <path key={k} d={`M ${dx - 18 + k * 4} ${-h} Q ${dx - 8 + k * 2} ${-h * 0.7} ${dx - 4 + k} ${-h * 0.45}`} stroke="#b0263a" strokeWidth={2} fill="none" opacity={0.7} />)}
        <path d={`M ${dx - 26} ${-h} Q ${dx} ${-h - 70} ${dx + 30} ${-h - 10} Q ${dx + 4} ${-h + 4} ${dx - 26} ${-h} Z`} fill="#d9e98a" />
        <path d={`M ${dx - 22} ${-h} Q ${dx} ${-h - 60} ${dx + 26} ${-h - 12}`} stroke="#b0263a" strokeWidth={3} fill="none" />
        <path d={`M ${dx - 22} ${-h} Q ${dx - 10} ${-h * 0.5} ${dx - 6} 0`} stroke="#fff" strokeOpacity={0.3} strokeWidth={3} fill="none" />
      </g>; })}
  </g>;
}
function Drosera({ x, y, s = 1, t = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * 360, ar = (a * Math.PI) / 180, ex = Math.cos(ar) * 60, ey = -20 + Math.sin(ar) * 22;
      return <g key={i}>
        <path d={`M 0 -10 L ${ex} ${ey}`} stroke="#9cbf5a" strokeWidth={4} />
        <circle cx={ex} cy={ey} r={14} fill="#b8402a" />
        {Array.from({ length: 12 }, (_, k) => { const b = (k / 12) * 6.28, tx = ex + Math.cos(b) * 22, ty = ey + Math.sin(b) * 22, br = 0.5 + 0.5 * Math.sin(t * 2 + i + k);
          return <g key={k}><path d={`M ${ex} ${ey} L ${tx} ${ty}`} stroke="#d0402a" strokeWidth={1.6} /><circle cx={tx} cy={ty} r={3.4} fill="#f6fbff" opacity={0.85} /><circle cx={tx - 1} cy={ty - 1} r={1.2} fill="#fff" opacity={br} /></g>; })}
      </g>; })}
  </g>;
}
function Etiq({ x, y, nombre, comun, rot = -3 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -12 0 L -12 60 L 0 74 L 12 60 L 12 0 Z" fill="#f6f1e4" />
    <rect x={-80} y={-70} width={160} height={74} rx={4} fill="#f6f1e4" /><rect x={-80} y={-70} width={160} height={74} rx={4} fill="url(#c-papel-a)" />
    <text x={0} y={-40} textAnchor="middle" fontFamily={FUENTE.serif} fontStyle="italic" fontWeight={600} fontSize={Math.min(22, 250 / nombre.length)} fill="#1d2a1a">{nombre}</text>
    <text x={0} y={-12} textAnchor="middle" fontFamily={FUENTE.mano} fontWeight={700} fontSize={Math.min(22, 300 / comun.length)} fill="#5a4a3a">{comun}</text>
  </g>;
}
ILUSC.coleccion = {
  cam: { z0: 1.08, z1: 1.08, fx: 960, fy: 600, x0: -560, x1: 720 },
  dibuja: ({ p, tl, capa }) => {
    const grupo = (at) => cpop(p, at, at + 0.1);
    return <g>
      <g transform={capa(0.4)}>
        <linearGradient id="c-col-inv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#c9cfb8" /><stop offset="1" stopColor="#5f7352" /></linearGradient>
        <rect x={-900} y={-200} width={3720} height={1400} fill="url(#c-col-inv)" />
        {Array.from({ length: 22 }, (_, i) => <rect key={i} x={-900 + i * 180} y={-200} width={10} height={760} fill="#c9cdbf" opacity={0.8} />)}
        <Desenfoque b={12}>{Array.from({ length: 30 }, (_, i) => { const r = R(1200 + i); return <circle key={i} cx={-900 + r() * 3700} cy={500 + r() * 120} r={40 + r() * 60} fill={['#6f9f5a', '#8fb36a', '#b8c98a'][i % 3]} />; })}</Desenfoque>
        <Halo x={960} y={60} r={900} color="#fffbe8" o={0.3} />
      </g>
      <Rayos x={600} y={-100} ang={70} abre={30} largo={1500} n={7} ancho={140} o={0.55} t={tl} seed={81} />
      <g transform={capa(1)}>
        <Tablon x={-900} y={760} w={3720} prof={60} grosor={40} madera="clara" />
        <rect x={-900} y={860} width={3720} height={400} fill="#4a3a2c" />
        {/* cactus */}
        <MacetaC x={-260} y={772} w={200} h={170}><Mammillaria x={0} y={-150} s={1.1} t={tl} flor={grupo(0.08)} /></MacetaC>
        <MacetaC x={20} y={772} w={160} h={150}><g transform="translate(0 -140)"><rect x={-30} y={-300} width={60} height={300} rx={30} fill="#4f8f4a" /><rect x={-30} y={-300} width={60} height={300} rx={30} fill="url(#c-cilindro)" />
          {Array.from({ length: 5 }, (_, k) => <path key={k} d={`M ${-22 + k * 11} -290 L ${-22 + k * 11} -6`} stroke="#3a6e36" strokeWidth={3} />)}
          {Array.from({ length: 30 }, (_, k) => <g key={'s' + k}><circle cx={-22 + (k % 5) * 11} cy={-280 + Math.floor(k / 5) * 46} r={3} fill="#f2efe0" /><path d={`M ${-22 + (k % 5) * 11} ${-280 + Math.floor(k / 5) * 46} l -6 -6 M ${-22 + (k % 5) * 11} ${-280 + Math.floor(k / 5) * 46} l 6 -6`} stroke="#fff" strokeWidth={1.2} /></g>)}</g></MacetaC>
        <Etiq x={-120} y={700} nombre="Mammillaria" comun="cactus" />
        {/* suculentas */}
        <MacetaC x={560} y={772} w={200} h={140} tipo="plastico" color="#c9c2b6"><Echeveria x={0} y={-110} s={1.2} /></MacetaC>
        <MacetaC x={830} y={772} w={150} h={130}><g transform="translate(0 -120)">{Array.from({ length: 14 }, (_, k) => { const a = -90 + (k - 6.5) * 13; return <g key={k} transform={`rotate(${a + 90})`}><path d="M -10 0 L 0 -110 L 10 0 Z" fill="#3f6f4a" />{Array.from({ length: 6 }, (_, j) => <path key={j} d={`M -8 ${-12 - j * 16} L 8 ${-12 - j * 16}`} stroke="#e6f0e0" strokeWidth={3} />)}</g>; })}</g></MacetaC>
        <Etiq x={690} y={700} nombre="Echeveria" comun="suculenta" rot={3} />
        {/* carnívoras */}
        <MacetaC x={1350} y={772} w={200} h={150} tipo="plastico" color="#2a2a2a"><g transform="translate(0 -140)"><ellipse cx={0} cy={0} rx={90} ry={20} fill="#7a8f5a" /><Dionaea x={0} y={0} s={1.2} t={tl} /></g></MacetaC>
        <MacetaC x={1640} y={772} w={190} h={150} tipo="plastico" color="#2a2a2a"><Sarracenia x={0} y={-140} s={1} t={tl} /></MacetaC>
        <MacetaC x={1930} y={772} w={170} h={130} tipo="plastico" color="#2a2a2a"><g transform="translate(0 -120)"><ellipse cx={0} cy={0} rx={80} ry={18} fill="#6f8f4a" /><Drosera x={0} y={0} s={1.2} t={tl} /></g></MacetaC>
        <Etiq x={1500} y={700} nombre="Dionaea muscipula" comun="Venus atrapamoscas" />
        <Etiq x={2080} y={700} nombre="Drosera" comun="rocío del sol" rot={4} />
        {/* el niño con su cactus */}
        <Nene x={2340} y={1010} s={1.0} edad={6} t={tl} playera="#3fbf4a" brazoD={100} brazoI={100} mira={[-1, -0.2]} boca="risa" seed={8}
          detalle={<g transform="translate(0 -100)"><MacetaC x={0} y={0} w={70} h={56}><Mammillaria x={0} y={-50} s={0.36} t={tl} /></MacetaC></g>} />
      </g>
      <g transform={capa(1.5)}><Desenfoque b={18} o={0.9}><Mammillaria x={-400} y={1250} s={2.6} t={tl} /><Echeveria x={2500} y={1250} s={2.6} /></Desenfoque></g>
      <Polvo n={70} t={tl} seed={91} o={0.6} />
      <Tinte color="#fff1cf" o={0.1} />
      <g opacity={grupo(0.05) * (1 - cpr(p, 0.3, 0.36))}><Rotulo x={120} y={190} arriba="PLANTAS DE COLECCIÓN" texto="Cactus" tl={tl} at={0.2} tam={64} /></g>
      <g opacity={grupo(0.36) * (1 - cpr(p, 0.6, 0.66))}><Rotulo x={120} y={190} arriba="PLANTAS DE COLECCIÓN" texto="Suculentas" tl={tl} at={0} tam={64} /></g>
      <g opacity={grupo(0.66)}><Rotulo x={120} y={190} arriba="PLANTAS DE COLECCIÓN" texto="Carnívoras" tl={tl} at={0} tam={64} /></g>
    </g>;
  },
};

Object.assign(window, { Huacal, Carton, Charola, Papayo, Cubeta, Mammillaria, Echeveria, Dionaea, Sarracenia, Drosera, Etiq });
