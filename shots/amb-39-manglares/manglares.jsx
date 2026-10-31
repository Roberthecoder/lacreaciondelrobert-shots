// Shot Ambiental #39 · Este lodo es una bodega de carbono (manglares y carbono azul) — NARRADO (N1 "Por dentro").
// Datos: Donato et al. 2011 (Nature Geoscience), CONABIO (SMMM 2025, página "Manglares", folleto "Manglares de México"),
// Conservation International, Simpson et al. 2023, NOAA. Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const MG_BASE = 1062;                       // superficie del lodo en la orilla
const MG_HOJA = '#3f9b4a', MG_HOJA2 = '#5cbf5f', MG_HOJA_N = '#6f9a62', MG_LODO = '#4a3222', MG_LODO2 = '#6b4a33', MG_AGUA = '#2f9fc8';

// Copa de hojas elípticas (racimos).
function MgCopa({ x, y, w = 340, color = MG_HOJA, color2 = MG_HOJA2, T = 0, seed = 3 }) {
  const r = krng(seed), bolas = Array.from({ length: 9 }, (_, i) => ({ dx: (r() - 0.5) * w * 0.8, dy: (r() - 0.5) * 120, rx: w * (0.18 + r() * 0.1), ry: 46 + r() * 22 }));
  const m = Math.sin(T * 1.3 + seed) * 4;
  return <g transform={`translate(${x + m} ${y})`}>
    {bolas.map((b, i) => <ellipse key={i} cx={b.dx} cy={b.dy} rx={b.rx} ry={b.ry} fill={i % 3 === 0 ? color2 : color} stroke={KC.ink} strokeWidth={5} />)}
    {bolas.slice(0, 6).map((b, i) => <ellipse key={'h' + i} cx={b.dx - b.rx * 0.3} cy={b.dy - b.ry * 0.3} rx={b.rx * 0.28} ry={b.ry * 0.22} fill="#fff" opacity=".22" />)}
  </g>;
}
// Mangle rojo (Rhizophora mangle): tronco sostenido por raíces arqueadas (zancudas) que bajan al lodo. raices 0..1 = cuánto se han dibujado.
function MangleRojo({ x, base = MG_BASE, top = 700, raices = 1, T = 0, s = 1 }) {
  const R = [[70, 880], [118, 850], [165, 815], [210, 782]];
  const raiz = (side, dx, y0, k) => `M ${x + side * 9} ${y0} Q ${x + side * dx * 0.82} ${y0 - 70 - k * 12} ${x + side * dx} ${base + 4}`;
  const paths = []; R.forEach(([dx, y0], k) => { paths.push(raiz(-1, dx * s, y0, k)); paths.push(raiz(1, dx * s, y0, k)); });
  return <g>
    <path d={`M ${x - 16} ${top} L ${x + 16} ${top} L ${x + 13} 890 L ${x - 13} 890 Z`} fill="#7a4e33" stroke={KC.ink} strokeWidth={6} />
    {paths.map((d, i) => <g key={i}>
      <path d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - raices} stroke={KC.ink} strokeWidth={15} fill="none" strokeLinecap="round" />
      <path d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - raices} stroke="#9a6440" strokeWidth={8} fill="none" strokeLinecap="round" /></g>)}
    <MgCopa x={x} y={top - 40} w={380 * s} T={T} seed={3} />
  </g>;
}
// Mangle negro (Avicennia germinans): tronco recto y neumatóforos (raíces que salen del lodo hacia arriba para respirar).
function MangleNegro({ x, base = MG_BASE, top = 770, neumato = 1, T = 0 }) {
  const r = krng(11), ps = Array.from({ length: 22 }, () => { const dx = -190 + r() * 380; return { dx: Math.abs(dx) < 30 ? dx + 60 : dx, h: 26 + r() * 22 }; });
  return <g>
    <path d={`M ${x - 18} ${top} L ${x + 18} ${top} L ${x + 26} ${base + 4} L ${x - 26} ${base + 4} Z`} fill="#6e5a48" stroke={KC.ink} strokeWidth={6} />
    {ps.map((p, i) => { const h = p.h * kclamp(neumato * 1.4 - i / 40, 0, 1); return h > 1 ? <rect key={i} x={x + p.dx - 5} y={base + 2 - h} width={10} height={h + 4} rx={5} fill="#b09670" stroke={KC.ink} strokeWidth={4} /> : null; })}
    <MgCopa x={x} y={top - 40} w={330} color={MG_HOJA_N} color2="#8bb67b" T={T} seed={7} />
  </g>;
}
// Bota de hule que pisa el lodo. y = suela.
function Bota({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -38 -230 L 38 -230 L 40 -60 Q 110 -50 112 -14 L 112 0 L -40 0 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-46} y={-246} width={92} height={26} rx={10} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -8 L 112 -8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Salpicadura de lodo desde (x, y) que empieza en t0.
function Salpica({ T, t0, x, y }) {
  const u = (T - t0) / 0.7; if (u < 0 || u > 1) return null;
  return <g>{Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.12 + 0.76 * i / 8), v = 160 + (i % 3) * 50;
    return <circle key={i} cx={x + Math.cos(a) * v * u * (i % 2 ? 1 : -1)} cy={y - Math.sin(a) * v * u * 1.3 + 260 * u * u} r={10 - 5 * u} fill={MG_LODO2} stroke={KC.ink} strokeWidth={3} />; })}</g>;
}
// Hojas que caen del manglar al agua y se hunden hasta el lodo.
function HojasCaen({ T, t0, n = 7 }) {
  const r = krng(21);
  return <g>{Array.from({ length: n }, (_, i) => {
    const x0 = i % 2 ? 180 + r() * 240 : 640 + r() * 260, s0 = t0 + i * 0.45, u = T - s0; if (u < 0) return null;
    const agua = 980, yA = klerp(700, agua, kclamp(u / 1.1, 0, 1)), y = u < 1.1 ? yA : klerp(agua, MG_BASE + 8, kclamp((u - 1.1) / 1.0, 0, 1));
    const x = x0 + Math.sin(u * 4 + i) * (u < 1.1 ? 40 : 8), rot = u < 1.1 ? Math.sin(u * 5 + i) * 50 : 10;
    return <ellipse key={i} cx={x} cy={y} rx={18} ry={8} transform={`rotate(${rot} ${x} ${y})`} fill={u > 1.6 ? '#7d6a3a' : '#5fae4a'} stroke={KC.ink} strokeWidth={3} />;
  })}</g>;
}
// Pececitos y camaroncitos entre las raíces (crías).
function Crias({ T, o = 1 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: 6 }, (_, i) => {
    const x = 150 + ((T * 45 + i * 97) % 300), y = 1000 + (i % 3) * 18, d = i % 2 ? 1 : -1;
    if (i % 3 === 2) return <path key={i} d={`M ${x} ${y} q 14 -16 30 -2 q -6 10 -18 10`} fill="#ff9db3" stroke={KC.ink} strokeWidth={3} />;
    return <g key={i} transform={`translate(${x} ${y}) scale(${d} 1)`}><ellipse rx={18} ry={9} fill={KC.orange} stroke={KC.ink} strokeWidth={3} /><path d="M -16 0 L -30 -10 L -30 10 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={3} /><circle cx={9} cy={-2} r={2.5} fill={KC.ink} /></g>;
  })}</g>;
}
// Viento y oleaje de tormenta que llegan por la derecha y pierden fuerza al cruzar el manglar (esquema).
function Oleaje({ T, o = 1 }) {
  if (o <= 0) return null;
  const pts = []; for (let x = 1080; x >= 560; x -= 20) { const A = 70 * (x - 560) / 520; pts.push(`${x},${975 - A * (0.6 + 0.4 * Math.sin(x / 40 - T * 6))}`); }
  return <g opacity={o}>
    <polyline points={pts.join(' ')} fill="none" stroke="#e8f8ff" strokeWidth={10} strokeLinecap="round" />
    {Array.from({ length: 6 }, (_, i) => { const x = 1080 - ((T * 420 + i * 110) % 560), a = kclamp((x - 520) / 500, 0, 1); const y = 800 + (i % 3) * 50;
      return <g key={i} opacity={a}><path d={`M ${x} ${y} l ${-90 * a - 20} 0`} stroke="#fff" strokeWidth={8} strokeLinecap="round" /><path d={`M ${x - 90 * a - 20} ${y} l 18 -12 M ${x - 90 * a - 20} ${y} l 18 12`} stroke="#fff" strokeWidth={6} strokeLinecap="round" /></g>; })}
  </g>;
}
// La orilla completa (de lado): agua con marea, lodo, mangle rojo y mangle negro.
function Orilla({ T, raices = 1, neumato = 1, marea = 0.5, bota = null, hojas = null, crias = 0, ola = 0 }) {
  const nivel = 975 + 16 * Math.sin(T * 1.1) * marea;
  const sup = Array.from({ length: 28 }, (_, i) => `${i * 40},${MG_BASE + Math.sin(i * 1.7) * 5}`).join(' ');
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={nivel} width={KW} height={KH - nivel} fill={MG_AGUA} />
    <MangleNegro x={800} neumato={neumato} T={T} />
    <path d={`M ${300 - 16} 700 L ${300 + 16} 700 L ${300 + 13} 890 L ${300 - 13} 890 Z`} fill="none" />
    {bota && <Bota x={bota.x} y={bota.y} />}
    <polygon points={`0,${KH} ${sup} 1080,${MG_BASE} 1080,${KH}`} fill={MG_LODO} />
    <polyline points={sup} fill="none" stroke={MG_LODO2} strokeWidth={14} />
    {[180, 330, 500].map((d, i) => <rect key={i} x={0} y={MG_BASE + d} width={KW} height={KH} fill="rgba(0,0,0,.14)" />)}
    <MangleRojo x={300} raices={raices} T={T} />
    {hojas != null && <HojasCaen T={T} t0={hojas} />}
    <Crias T={T} o={crias} />
    <rect x={0} y={nivel} width={KW} height={MG_BASE - nivel + 4} fill={MG_AGUA} opacity={0.38} />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${60 + i * 180} ${nivel + 4} q 22 ${-6 + Math.sin(T * 2 + i) * 3} 44 0`} stroke="#c9f1ff" strokeWidth={5} fill="none" />)}
    <Oleaje T={T} o={ola} />
    {ola > 0 && <g transform={`translate(930 640) rotate(${-T * 160})`} opacity={ola}>{[0, 120, 240].map((a) => <path key={a} d="M 0 0 Q 50 -10 70 -60" transform={`rotate(${a})`} stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" />)}<circle r={18} fill="#fff" stroke={KC.ink} strokeWidth={5} /></g>}
    {bota && <Salpica T={T} t0={bota.golpe} x={bota.x + 30} y={MG_BASE} />}
  </svg>;
}
// Columna de suelo en capas con carbono (puntos oscuros). capas = cuántas capas hay (puede ser fracción: la última va bajando).
function Columna({ x, y, w, h, n = 8, capas = 8, T = 0, raices = true }) {
  const hh = h / n, r = krng(5);
  const puntos = Array.from({ length: n }, () => Array.from({ length: Math.round(w / 34) }, () => ({ x: r() * (w - 24) + 12, y: r() * (hh - 18) + 9, s: 4 + r() * 5 })));
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={18} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="12 10" />
    {Array.from({ length: n }, (_, k) => {
      const vis = kclamp(capas - k, 0, 1); if (vis <= 0) return null;
      const yk = y + h - (k + 1) * hh - (1 - kEase.sale(vis)) * 260;
      return <g key={k} opacity={kclamp(vis * 2, 0, 1)}>
        <rect x={x} y={yk} width={w} height={hh + 1} fill={mixHex('#24170f', '#7a5638', k / (n - 1))} stroke={KC.ink} strokeWidth={3} />
        {puntos[k].map((p, i) => <circle key={i} cx={x + p.x} cy={yk + p.y} r={p.s} fill="#0b0b0b" stroke={KC.gold} strokeWidth={1.6} />)}
      </g>;
    })}
    {raices && capas >= n - 0.01 && Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${x + 40 + i * (w - 80) / 6} ${y} q ${(i % 2 ? 18 : -18)} ${hh * 0.6} ${(i % 2 ? -6 : 6)} ${hh * 1.3}`} stroke="#c8a27a" strokeWidth={5} fill="none" opacity=".8" />)}
  </g>;
}
// Reloj de arena: p 0..1 = arena que ya cayó.
function Reloj({ x, y, p = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-130} width={140} height={16} rx={6} fill="#c08a4a" stroke={KC.ink} strokeWidth={5} />
    <rect x={-70} y={114} width={140} height={16} rx={6} fill="#c08a4a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -56 -114 L 56 -114 L 8 0 L 56 114 L -56 114 L -8 0 Z" fill="rgba(220,240,255,.25)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-44 * (1 - p)} ${-6 - 100 * (1 - p)} L ${44 * (1 - p)} ${-6 - 100 * (1 - p)} L 4 -6 L -4 -6 Z`} fill={KC.gold2} />
    <path d={`M -50 110 L 50 110 L ${50 - 40 * p} ${110 - 90 * p} L ${-50 + 40 * p} ${110 - 90 * p} Z`} fill={KC.gold2} />
    <line x1={0} y1={-4} x2={0} y2={108 - 90 * p} stroke={KC.gold2} strokeWidth={3} strokeDasharray="4 8" />
  </g>;
}
// Pedazo de hoja muerta (de cerca) con nervaduras; mordida 0..1 = cuánto le han comido.
function HojaMuerta({ x, y, s = 1, mordida = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-18)`}>
    <path d="M -230 0 Q -120 -120 60 -110 Q 200 -90 240 0 Q 200 90 60 110 Q -120 120 -230 0 Z" fill="#7d6a3a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -230 0 L 240 0" stroke="#5a4a26" strokeWidth={6} />
    {[-150, -70, 10, 90, 160].map((vx, i) => <g key={i}><path d={`M ${vx} 0 Q ${vx + 30} -40 ${vx + 50} -80`} stroke="#5a4a26" strokeWidth={4} fill="none" /><path d={`M ${vx} 0 Q ${vx + 30} 40 ${vx + 50} 80`} stroke="#5a4a26" strokeWidth={4} fill="none" /></g>)}
    {[[-160, -40], [120, 60], [40, -80]].map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={8 + 22 * mordida} fill={KC.dark} />)}
  </g>;
}
// Interior del lodo para la Lupa: oxígeno solo arriba, abajo nada.
function LodoAdentro(t, r, conCapas = false) {
  const R = r * 2, rg = krng(31);
  return <svg width={R} height={R}>
    <defs><linearGradient id={'lg' + r} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6b4a33" /><stop offset="30%" stopColor="#3a271a" /><stop offset="100%" stopColor="#1a110b" /></linearGradient></defs>
    <rect width={R} height={R} fill={`url(#lg${r})`} />
    {conCapas && Array.from({ length: 6 }, (_, k) => <g key={k}><line x1={0} y1={R * 0.22 + k * R * 0.13} x2={R} y2={R * 0.22 + k * R * 0.13} stroke="rgba(0,0,0,.45)" strokeWidth={4} />
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={rg() * R} cy={R * 0.24 + k * R * 0.13 + rg() * R * 0.1} r={4 + rg() * 4} fill="#0b0b0b" stroke={KC.gold} strokeWidth={1.5} />)}</g>)}
    {!conCapas && Array.from({ length: 8 }, (_, i) => { const u = ((t * 0.35 + i / 8) % 1); const y = R * 0.06 + u * R * 0.5, o = kclamp(1 - u * 1.9, 0, 1);
      return <g key={i} opacity={o}><circle cx={R * (0.12 + 0.11 * i)} cy={y} r={14} fill="#bfefff" stroke={KC.ink} strokeWidth={3} /><text x={R * (0.12 + 0.11 * i)} y={y + 5} textAnchor="middle" style={{ font:`900 13px ${KF.texto}` }} fill={KC.ink}>O₂</text></g>; })}
    {!conCapas && [[0.3, 0.7, 20], [0.62, 0.62, -30], [0.5, 0.85, 60]].map(([a, b, rot], i) => <ellipse key={i} cx={R * a} cy={R * b} rx={30} ry={12} transform={`rotate(${rot} ${R * a} ${R * b})`} fill="#7d6a3a" stroke={KC.ink} strokeWidth={3} />)}
  </svg>;
}
// Puntos de manglar en el mapa (esquema: zonas costeras aproximadas).
const MG_SITIOS = [[-105.5, 22.2], [-105.9, 22.9], [-106.9, 24.0], [-108.1, 25.1], [-109.2, 26.3], [-112.0, 24.7], [-110.4, 24.2], [-93.4, 15.5], [-92.6, 14.8], [-94.8, 16.2], [-97.5, 21.6], [-95.3, 18.6], [-93.1, 18.45], [-91.7, 18.65], [-90.6, 19.7], [-90.4, 20.6], [-89.7, 21.25], [-88.4, 21.45], [-87.2, 21.2], [-87.5, 20.1], [-87.6, 19.3], [-88.0, 18.6]];

function ManglaresShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Raices, L: CUES.Lodo, Mi: CUES.Microbios, Ca: CUES.Capas, P: CUES.Pregunta, E: CUES.Estudio, S: CUES.Suelo, Mx: CUES.Mexico, X: CUES.Extra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const pisada = (t0) => ({ x: 520, y: klerp(760, MG_BASE + 34, kprog(T, t0, t0 + 0.45, kEase.entra || ((p) => p * p))), golpe: t0 + 0.42 });
  // proporción en el suelo: 49 % ↔ 98 % (oscila entre los dos extremos del estudio)
  const suelo = kprog(T, K.S + 0.4, K.S + 1.4) * (0.735 + 0.245 * Math.sin((T - K.S - 1.4) * 1.6 - Math.PI / 2));
  const fr = kclamp(suelo, 0, 0.98);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la bota pisa el lodo bajo el manglar */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.06} origen="50% 60%">
        <FondoLunares color={KC.cyan} />
        <Orilla T={T} bota={pisada(K.G + 0.05)} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 2 · raíces: zancudas del mangle rojo y neumatóforos del mangle negro */}
      <Escena T={T} a={K.R} b={K.L} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Orilla T={T} raices={0.15 + 0.85 * kprog(T, K.R + 0.2, K.R + 1.8, kEase.sale)} neumato={kprog(T, K.R + 2.6, K.R + 4.2)} marea={1} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 3 · hojas que caen a un suelo empapado, casi sin oxígeno */}
      <Escena T={T} a={K.L} b={K.Mi} zoom={0.05} origen="50% 70%">
        <FondoLunares color={KC.cyan} />
        <Orilla T={T} hojas={K.L + 0.1} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      <Lupa T={T} at={K.L + 2.2} until={K.Mi - 0.15} x={540} y={600} r={220} fx={540} fy={MG_BASE + 30} tinte={KC.yellow} etiqueta="POR DENTRO · EL LODO"
        interior={(t, r) => LodoAdentro(t, r)} />
      {/* 4 · microbios lentísimos (al microscopio, fondo oscuro) */}
      <Escena T={T} a={K.Mi} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #2a1d14 0%, #0E0F12 75%)' }}></div>
        <Ambiente T={T} n={30} color="rgba(255,220,180,.18)" vel={4} />
        {svg(<><HojaMuerta x={560} y={880} s={1.25} mordida={kprog(T, K.Mi, K.Ca + 0.4) * 0.35} />
          {Array.from({ length: 7 }, (_, i) => { const a = i / 7 * Math.PI * 2 + (T - K.Mi) * 0.06; return <Bacteria key={i} T={T * 0.15} seed={i} x={560 + Math.cos(a) * 330} y={880 + Math.sin(a) * 190} rot={a * 57 + 90} s={0.9} color={i % 2 ? KC.mint : KC.coral} />; })}
          <Reloj x={180} y={520} p={0.05 + 0.08 * kprog(T, K.Mi, K.Ca)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 5 · capa sobre capa: el carbono se queda enterrado */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#0E0F12' }}></div>
        {svg(<Columna x={140} y={520} w={600} h={680} capas={kprog(T, K.Ca + 0.1, K.Ca + 4.0) * 8} T={T} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Columna x={70} y={760} w={380} h={400} capas={8} T={T} />
          <text x={260} y={760} textAnchor="middle" style={{ font:`400 400px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 620)`}>?</text></>)}
      </Escena>
      {/* 7 · el estudio de 2011 y la hectárea que se llena */}
      <Escena T={T} a={K.E} b={K.S}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg((() => { const ll = kprog(T, K.E + 3.4, K.E + 6.4, kEase.suave), n = 100, x0 = 100, y0 = 440, L = 400;
          return <g opacity={kprog(T, K.E + 3.1, K.E + 3.5)}>
            <rect x={x0} y={y0} width={L} height={L} fill="#d8f1c9" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: n }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), on = i < ll * n;
              return on ? <rect key={i} x={x0 + 6 + c * 38.8} y={y0 + L - 6 - (f + 1) * 38.8} width={35} height={35} rx={6} fill="#2a2420" stroke={KC.gold} strokeWidth={2} /> : null; })}
            <text x={x0 + L / 2} y={y0 - 20} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>100 m</text>
            <text x={x0 + L + 20} y={y0 + L / 2} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>100 m</text>
            <text x={x0 + L + 20} y={y0 + L - 20} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>= 1 hectárea</text>
          </g>; })())}
      </Escena>
      {/* 8 · del 49 al 98 % está en el suelo */}
      <Escena T={T} a={K.S} b={K.Mx}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={60} y={900} width={560} height={300} rx={20} fill={MG_LODO} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 40 }, (_, i) => { const r = krng(50 + i); return <circle key={i} cx={80 + r() * 520} cy={920 + r() * 260} r={4 + r() * 5} fill="#0b0b0b" stroke={KC.gold} strokeWidth={1.6} />; })}
          <MangleRojo x={340} base={902} top={560} raices={1} T={T} s={0.95} />
          <g transform="translate(690 690)">
            <rect x={0} y={0} width={150} height={500} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={7} y={7} width={136} height={486 * (1 - fr)} rx={10} fill={MG_HOJA2} />
            <rect x={7} y={7 + 486 * (1 - fr)} width={136} height={486 * fr} rx={10} fill={MG_LODO} />
            <text x={75} y={7 + 486 * (1 - fr) + 486 * fr / 2 + 18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill="#fff">{kformato(fr * 100, 0)} %</text>
          </g></>)}
        <Etq T={T} at={K.S + 1.0} until={K.Mx - 0.2} x={845} y={720} texto="árbol" tam={30} color={KC.ink} />
        <Etq T={T} at={K.S + 1.0} until={K.Mx - 0.2} x={845} y={1150} texto="suelo" tam={30} color={KC.ink} />
      </Escena>
      {/* 9 · México: 877,464 ha de manglar (CONABIO 2025) */}
      <Escena T={T} a={K.Mx} b={K.X}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={40} y={600} ancho={1000} centro="#d9d4c8">
          {MG_SITIOS.map(([lo, la], i) => { const [px, py] = mxProy(lo, la), e = kprog(T, K.Mx + 0.5 + i * 0.06, K.Mx + 0.8 + i * 0.06, kEase.sale);
            return <circle key={i} cx={px} cy={py} r={13 * e} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />; })}
        </MapaMexico>)}
        <EscalaFija texto="esquema: zonas de manglar aproximadas" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · barrera contra huracanes y guardería de crías */}
      <Escena T={T} a={K.X} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <Orilla T={T} ola={kprog(T, K.X + 0.2, K.X + 0.8)} crias={kprog(T, K.X + 2.4, K.X + 3.0)} marea={0.6} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 11 · cierre: la misma pisada, ahora sabiendo lo que hay abajo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.06} origen="50% 60%">
        <FondoLunares color={KC.cyan} />
        <Orilla T={T} bota={pisada(K.C - 0.2)} />
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      <Lupa T={T} at={K.C + 1.0} until={K.Ou - 0.1} x={300} y={560} r={200} fx={560} fy={MG_BASE + 40} tinte={KC.gold} etiqueta="POR DENTRO · CARBONO"
        interior={(t, r) => LodoAdentro(t, r, true)} />

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 1.6} until={K.R - 0.2} texto="lodo = bodega de carbono" y={440} x={330} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.R + 0.8} until={K.L - 0.2} x={40} y={1115} texto="mangle rojo" tam={30} />
      <Etq T={T} at={K.R + 1.0} until={K.L - 0.2} x={40} y={1165} texto="Rhizophora mangle" it tam={28} />
      <Etq T={T} at={K.R + 2.8} until={K.L - 0.2} x={590} y={1115} texto="mangle negro" tam={30} />
      <Etq T={T} at={K.R + 3.0} until={K.L - 0.2} x={590} y={1165} texto="Avicennia germinans" it tam={28} />
      <Chip T={T} at={K.R + 0.6} until={K.R + 2.7} texto="raíces arqueadas, como patas" y={440} x={400} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.R + 3.0} until={K.L - 0.2} texto="raíces para respirar" y={440} x={330} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.L + 0.3} until={K.L + 2.1} texto="hojas y raíces muertas → lodo" y={440} x={540} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.L + 3.0} until={K.Mi - 0.2} texto="casi sin oxígeno" y={1100} x={540} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.Mi + 0.6} until={K.Ca - 0.2} x={300} y={1110} texto="bacterias" tam={30} />
      <Chip T={T} at={K.Mi + 0.4} until={K.Ca - 0.2} texto="sin oxígeno: lentísimo" y={740} x={330} tam={32} borde={KC.coral} />
      <Chip T={T} at={K.Ca + 0.3} until={K.P - 0.2} texto="capa sobre capa" y={420} x={540} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Ca + 3.6} until={K.P - 0.2} x={750} y={560} texto="capa nueva" tam={28} />
      <Etq T={T} at={K.Ca + 1.0} until={K.P - 0.2} x={750} y={1160} texto="miles de años" tam={28} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.E + 0.7} until={K.E + 3.2} anio="2011" quien="25 manglares del Indo-Pacífico" revista="Donato et al. · Nature Geoscience" y={760} />
      <NumeroGigante T={T} at={K.E + 3.5} until={K.S - 0.2} valor={1023} dur={2.9} sufijo=" t" etiqueta="carbono por hectárea" x={540} y={1010} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.S + 0.4} until={K.Mx - 0.2} texto="49–98 % en el suelo" y={440} x={330} tam={36} borde={KC.gold} />
      <NumeroGigante T={T} at={K.Mx + 0.2} until={K.X - 0.2} valor={877464} dur={1.6} sufijo=" ha" etiqueta="manglar en México" x={540} y={440} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.Mx + 1.6} until={K.X - 0.2} texto="CONABIO · 2025" y={1100} x={540} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.X + 0.5} until={K.X + 2.6} texto="barrera contra huracanes" y={440} x={660} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.X + 2.6} until={K.C - 0.2} texto="guardería de crías" y={440} x={660} tam={32} borde={KC.orange} />
      <Etq T={T} at={K.X + 2.8} until={K.C - 0.2} x={460} y={1150} texto="peces y crustáceos" tam={28} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou - 0.1} texto="estás sobre una bodega" y={1095} x={540} tam={36} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Este lodo: *una bodega de carbono.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.L - 0.1} texto="Raíces como patas y *raíces para respirar.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.Mi - 0.1} texto="Un suelo empapado, *casi sin oxígeno.*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.Ca - 0.1} texto="Sin oxígeno, los microbios: *lentísimo.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.P - 0.1} texto="Capa sobre capa: *miles de años.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuánto *cabe?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.S - 0.1} texto="Más de *mil toneladas por hectárea.*" />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={K.Mx - 0.1} texto="Del 49 al 98 %: *en el suelo.*" />
      <Subtitulo T={T} idx={8} at={K.Mx + 0.1} until={K.X - 0.1} texto="México: *877 mil hectáreas.*" />
      <Subtitulo T={T} idx={9} at={K.X + 0.1} until={K.C - 0.1} texto="Barrera contra huracanes y *guardería.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Estás parado *sobre una bodega.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Raices + 3.0, CUES.Lodo + 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Microbios + 0.4, CUES.Capas - 0.2, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [CUES.Pregunta - 0.4, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.2, CUES.Suelo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Suelo + 2.8, CUES.Mexico - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Extra + 1.6, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 1.4, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="39" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ManglaresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ManglaresShot /></CompositionStage></div>;
}
window.ManglaresApp = ManglaresApp;
