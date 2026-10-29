// Shot Ambiental #41 · El polvo de la ciudad que tus ojos nunca van a ver (PM2.5) — NARRADO (N1 por dentro + N2 el número).
// Datos: EPA "PM Basics" (tamaño, fuentes, gráfica de la arena de 90 µm), OMS 2021 (guía anual 5 µg/m³), SEDEMA Informe anual 2023
// (promedio PM2.5 = 20 µg/m³; 1 ene 2023 contingencia por pirotecnia), CAMe 1 ene 2026 (recomendaciones). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

const PM_GRIS = ['#6f6a66', '#8d7a66', '#4c4642', '#a08a72', '#5a5f66'];
// Partícula irregular (hollín, polvo, gotita): blob de 7 puntas.
function Particula({ x, y, r = 10, seed = 1, color, o = 1, rot = 0 }) {
  const q = krng(seed * 7 + 3), c = color || PM_GRIS[seed % PM_GRIS.length];
  const pts = Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2, rr = r * (0.75 + q() * 0.45); return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <polygon points={pts} fill={c} stroke={KC.ink} strokeWidth={Math.max(1.5, r * 0.18)} strokeLinejoin="round" />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.22} fill="#fff" opacity=".3" />
  </g>;
}
// Nube de partículas que flota en un rectángulo (w × h), se mueve siempre.
function NubePM({ T, w, h, n = 60, seed = 4, rmin = 6, rmax = 18, o = 1 }) {
  const q = krng(seed);
  const ps = Array.from({ length: n }, (_, i) => ({ x: q() * w, y: q() * h, r: rmin + q() * (rmax - rmin), vx: (q() - 0.5) * 40, vy: (q() - 0.5) * 30, f: 0.5 + q() }));
  return <g opacity={o}>{ps.map((p, i) => {
    const x = ((p.x + T * p.vx + Math.sin(T * p.f + i) * 14) % w + w) % w, y = ((p.y + T * p.vy + Math.cos(T * p.f * 1.3 + i) * 12) % h + h) % h;
    return <Particula key={i} x={x} y={y} r={p.r} seed={i + seed} rot={T * 30 * p.f + i * 20} />; })}</g>;
}
// Coche caricatura (de lado).
function Coche({ x, y, s = 1, color = KC.red, T = 0, humo = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {humo && Array.from({ length: 4 }, (_, i) => { const u = ((T * 1.2 + i / 4) % 1); return <circle key={i} cx={-120 - u * 90} cy={-30 - u * 40} r={10 + u * 18} fill="#9a958f" opacity={0.55 * (1 - u)} />; })}
    <path d="M -110 -20 L -110 -60 Q -100 -75 -70 -78 L -40 -118 Q -30 -128 0 -128 L 50 -128 Q 70 -128 85 -105 L 105 -78 Q 125 -74 125 -55 L 125 -20 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -30 -80 L -8 -112 L 20 -112 L 20 -80 Z M 32 -80 L 32 -112 L 58 -112 L 78 -80 Z" fill="#cdeeff" stroke={KC.ink} strokeWidth={5} />
    {[-60, 75].map((wx) => <g key={wx} transform={`translate(${wx} -18) rotate(${T * 400})`}><circle r={28} fill={KC.ink} /><circle r={12} fill="#cfd3d8" /><line x1={-12} y1={0} x2={12} y2={0} stroke={KC.ink} strokeWidth={4} /></g>)}
    <rect x={-122} y={-34} width={18} height={10} rx={4} fill="#555" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Calle de ciudad con edificios, sol y un rayo de luz (donde la Lupa encuentra las partículas).
function Calle({ T, tono = 0, nube = 1 }) {
  const ed = [[0, 520, 170, '#7a8bb0'], [160, 600, 150, '#94a3c4'], [300, 450, 190, '#6e7fa6'], [480, 640, 130, '#a6b3cf'], [600, 500, 170, '#7f90b5'], [760, 580, 150, '#95a4c6'], [900, 470, 180, '#7083a9']];
  const cielo = mixHex('#8fd8ff', '#c9c2b0', tono);
  return <g>
    <rect x={0} y={0} width={KW} height={KH} fill={cielo} />
    <Sol T={T} x={170} y={420} r={70} />
    {ed.map(([x, top, w, c], i) => <g key={i}><rect x={x} y={top} width={w} height={1100 - top} fill={c} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: Math.floor((1060 - top) / 80) }, (_, r) => Array.from({ length: Math.floor((w - 20) / 50) }, (_, k) => <rect key={r + '-' + k} x={x + 18 + k * 50} y={top + 24 + r * 80} width={26} height={40} rx={4} fill="#ffe9a6" stroke={KC.ink} strokeWidth={3} opacity={0.9} />))}</g>)}
    {/* rayo de sol entre los edificios */}
    <polygon points="210,470 330,470 760,1100 520,1100" fill="#fff6c2" opacity={0.42 + 0.08 * Math.sin(T * 2)} />
    <rect x={0} y={1100} width={KW} height={KH - 1100} fill="#5d6068" />
    <rect x={0} y={1100} width={KW} height={18} fill="#c9ccd2" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={((i * 200 - T * 260) % 1400 + 1400) % 1400 - 200} y={1470} width={110} height={16} rx={8} fill="#f3f0e6" />)}
    <Coche x={((T * 240) % 1500) - 200} y={1240} s={0.95} color={KC.red} T={T} />
    <Coche x={1300 - ((T * 180 + 600) % 1500)} y={1400} s={0.8} color={KC.blue} T={T} />
  </g>;
}
// Grano de arena fina (90 µm): facetado e irregular, como en la gráfica de la EPA. w = ancho en px.
function GranoArena({ x, y, w = 900 }) {
  const s = w / 900;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -450 40 L -380 -160 L -180 -250 L 80 -240 L 300 -200 L 450 -40 L 410 150 L 200 250 L -120 245 L -360 180 Z" fill="#e3b65e" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -380 -160 L -150 -60 L 80 -240 M -150 -60 L 60 60 L 300 -200 M 60 60 L 200 250 M -150 -60 L -360 180 M 60 60 L 450 -40" stroke="#b9853a" strokeWidth={6} fill="none" />
    <path d="M -180 -250 L -150 -60 L -380 -160 Z" fill="#f2cf85" opacity=".7" />
    <path d="M 300 -200 L 450 -40 L 60 60 Z" fill="#c99446" opacity=".5" />
  </g>;
}
// Obra (montón de tierra + grúa), calle de tierra y fogata: emisiones directas.
function Obra({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 0 Q -40 -120 40 -20 Q 80 -60 120 0 Z" fill="#b8874a" stroke={KC.ink} strokeWidth={6} />
    <rect x={60} y={-300} width={20} height={300} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <rect x={-60} y={-312} width={220} height={20} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <line x1={-40} y1={-292} x2={-40} y2={-200 + Math.sin(T * 2) * 10} stroke={KC.ink} strokeWidth={3} />
    <rect x={-58} y={-200 + Math.sin(T * 2) * 10} width={36} height={24} fill="#888" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Fogata({ x, y, T, s = 1 }) {
  const f = (k) => 1 + 0.12 * Math.sin(T * 13 + k);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-14} width={120} height={22} rx={10} fill="#7b4a26" stroke={KC.ink} strokeWidth={5} transform="rotate(12)" />
    <rect x={-60} y={-14} width={120} height={22} rx={10} fill="#8d5a2e" stroke={KC.ink} strokeWidth={5} transform="rotate(-12)" />
    <path d={`M -40 -10 Q -50 ${-70 * f(1)} 0 ${-120 * f(2)} Q 50 ${-70 * f(3)} 40 -10 Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    <path d={`M -18 -10 Q -22 ${-45 * f(4)} 0 ${-75 * f(5)} Q 22 ${-45 * f(6)} 18 -10 Z`} fill={KC.yellow} />
  </g>;
}
function Fabrica({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -120 0 L -120 -140 L -60 -100 L -60 -140 L 0 -100 L 0 -140 L 60 -100 L 60 0 Z" fill="#c57b5a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={70} y={-300} width={44} height={300} fill="#9b6b55" stroke={KC.ink} strokeWidth={6} />
    {[0, 1].map((k) => <rect key={k} x={70} y={-260 + k * 30} width={44} height={10} fill="#fff" />)}
  </g>;
}
function PlantaLuz({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -80 0 Q -50 -120 -70 -260 L 70 -260 Q 50 -120 80 0 Z" fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
    <path d="M 120 -40 L 140 -200 M 160 -40 L 140 -200 M 128 -110 L 152 -110" stroke={KC.ink} strokeWidth={6} />
    <path d="M 140 -200 L 240 -190" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Gas (SO₂ / NOₓ) que sube como nubecita de color y, arriba, se condensa en partículas. u 0..1 = avance.
function GasSube({ T, x0, y0, color, seed = 1, n = 5, alto = 520 }) {
  return <g>{Array.from({ length: n }, (_, i) => {
    const u = ((T * 0.28 + i / n + seed * 0.13) % 1), y = y0 - u * alto, x = x0 + Math.sin(u * 6 + seed + i) * 40;
    const gas = u < 0.6;
    return gas ? <circle key={i} cx={x} cy={y} r={18 + u * 30} fill={color} opacity={0.55 * (1 - u * 0.6)} stroke={KC.ink} strokeWidth={2} strokeDasharray="6 6" />
      : <Particula key={i} x={x} y={y} r={9 + (u - 0.6) * 12} seed={i + seed * 5} o={Math.min(1, (u - 0.6) * 6) * (1 - kprog(u, 0.9, 1))} />;
  })}</g>;
}
function Directas({ T, x0, y0, seed = 1, n = 6, alto = 380 }) {
  return <g>{Array.from({ length: n }, (_, i) => {
    const u = ((T * 0.35 + i / n + seed * 0.21) % 1);
    return <Particula key={i} x={x0 + Math.sin(u * 5 + i + seed) * 50 + (i % 2 ? 20 : -20) * u} y={y0 - u * alto} r={10 + (i % 3) * 3} seed={i + seed * 9} o={1 - kprog(u, 0.8, 1)} rot={u * 200} />;
  })}</g>;
}
// Pulmones en esquema con tráquea y bronquios; las partículas bajan. corazón al centro-izquierda.
function Pulmones({ T, a }) {
  const lob = (s) => `M ${540 + s * 30} 620 Q ${540 + s * 250} 540 ${540 + s * 290} 880 Q ${540 + s * 280} 1120 ${540 + s * 120} 1110 Q ${540 + s * 40} 1060 ${540 + s * 30} 880 Z`;
  const lat = 1 + 0.08 * Math.max(0, Math.sin(T * 7.5));
  return <g>
    <path d={lob(-1)} fill="#ff8fa3" stroke={KC.ink} strokeWidth={8} /><path d={lob(1)} fill="#ff8fa3" stroke={KC.ink} strokeWidth={8} />
    <rect x={520} y={380} width={40} height={250} rx={14} fill="#ffd0d8" stroke={KC.ink} strokeWidth={6} />
    {[-1, 1].map((s) => <g key={s}><path d={`M 540 630 Q ${540 + s * 60} 690 ${540 + s * 150} 760`} stroke="#ffd0d8" strokeWidth={22} fill="none" strokeLinecap="round" />
      <path d={`M ${540 + s * 150} 760 l ${s * 70} 90 M ${540 + s * 150} 760 l ${s * 100} -10 M ${540 + s * 110} 735 l ${s * 30} 140 M ${540 + s * 220} 850 l ${s * 20} 80`} stroke="#ffd0d8" strokeWidth={10} fill="none" strokeLinecap="round" />
      {[[220, 850], [250, 750], [140, 875], [240, 930]].map(([dx, dy], k) => <circle key={k} cx={540 + s * dx} cy={dy} r={16} fill="#ffc2cd" stroke="#e86b84" strokeWidth={4} />)}</g>)}
    <g transform={`translate(560 1000) scale(${lat})`}><path d="M 0 40 C -90 -10 -70 -90 -20 -80 C 0 -76 0 -60 0 -55 C 0 -60 0 -76 20 -80 C 70 -90 90 -10 0 40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} /></g>
    {Array.from({ length: 12 }, (_, i) => { const u = ((T - a) * 0.5 + i / 12) % 1, s = i % 2 ? 1 : -1;
      const x = u < 0.5 ? 540 : 540 + s * (u - 0.5) * 2 * 210, y = u < 0.5 ? 340 + u * 2 * 300 : 640 + (u - 0.5) * 2 * 220;
      return <Particula key={i} seed={i + 40} x={x} y={y} r={9} />; })}
  </g>;
}
// Interior de la Lupa: racimo de alvéolos con partículas pegadas a la pared (esquema).
function AlveolosInt({ T, a, r }) {
  const c = [[r * 0.7, r * 0.75], [r * 1.25, r * 0.7], [r * 0.95, r * 1.2], [r * 1.45, r * 1.25], [r * 0.55, r * 1.3]];
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1b0f18" />
    <path d={`M ${r} 0 L ${r} ${r * 0.5}`} stroke="#ffc2cd" strokeWidth={26} />
    {c.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={r * 0.32} fill="#ffc2cd" fillOpacity=".25" stroke="#ff8fa3" strokeWidth={7} />)}
    <path d={`M 0 ${r * 1.75} C ${r * 0.6} ${r * 1.6} ${r * 1.3} ${r * 1.9} ${r * 2} ${r * 1.7}`} stroke="#c92a3a" strokeWidth={22} fill="none" />
    {Array.from({ length: 9 }, (_, i) => { const [cx, cy] = c[i % 5], ang = i * 2.1, u = kprog(T, a + 0.6 + i * 0.15, a + 1.6 + i * 0.15, kEase.suave);
      return <Particula key={i} x={klerp(r, cx + Math.cos(ang) * r * 0.3, u)} y={klerp(r * 0.2, cy + Math.sin(ang) * r * 0.3, u)} r={8} seed={i + 70} />; })}
  </svg>;
}
// Cubo de aire de 1 m³ (isométrico) con partículas adentro. n = cuántas.
function CuboAire({ T, x, y, s = 1, n = 10, seed = 3 }) {
  const q = krng(seed);
  const ps = Array.from({ length: 40 }, () => [q() * 220 - 110, q() * 200 - 70]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -60 L 0 -140 L 150 -60 L 0 20 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -150 -60 L 0 20 L 0 220 L -150 140 Z" fill="#c9e6fb" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 150 -60 L 0 20 L 0 220 L 150 140 Z" fill="#acd6f5" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {ps.slice(0, n).map(([px, py], i) => <Particula key={i} x={px * 0.9 + Math.sin(T * 1.5 + i) * 6} y={py + 20 + Math.cos(T * 1.2 + i) * 6} r={7} seed={i + 11} />)}
    <text x={0} y={280} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>1 m³ de aire</text>
  </g>;
}
// Barra vertical con su valor (µg/m³). px por unidad = k.
function Barra({ x, base = 1100, valor, k = 26, color, titulo, o = 1, ancho = 170 }) {
  const h = valor * k;
  return <g opacity={o}>
    <rect x={x - ancho / 2} y={base - h} width={ancho} height={h} rx={14} fill={color} stroke={KC.ink} strokeWidth={7} />
    <text x={x} y={base - h - 22} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{kformato(valor, 0)}</text>
    <text x={x} y={base + 48} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>
  </g>;
}
// Silueta de ciudad (CDMX esquemática: edificios, el Ángel, volcanes al fondo) con estaciones de monitoreo.
function Skyline({ T, y = 1150, estaciones = 1 }) {
  return <g>
    <path d={`M 0 ${y - 260} L 160 ${y - 470} L 260 ${y - 440} L 420 ${y - 260} Z`} fill="#b7c4d6" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 620 ${y - 260} L 820 ${y - 520} L 1080 ${y - 300} L 1080 ${y - 260} Z`} fill="#c3cfde" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 790 ${y - 480} l 30 -40 l 30 40 Z`} fill="#fff" />
    {[[0, 200, 150], [140, 300, 120], [250, 230, 130], [370, 330, 110], [470, 250, 140], [600, 360, 100], [690, 210, 160], [840, 280, 120], [950, 240, 130]].map(([x, h, w], i) =>
      <rect key={i} x={x} y={y - h} width={w} height={h} fill={i % 2 ? '#8796b4' : '#7484a6'} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={555} y={y - 420} width={14} height={160} fill="#d8c08a" stroke={KC.ink} strokeWidth={4} />
    <circle cx={562} cy={y - 432} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
    {[[90, y - 210], [300, y - 240], [430, y - 340], [650, y - 370], [760, y - 220], [990, y - 250]].map(([x, yy], i) => { const o = kprog(estaciones, i / 6, i / 6 + 0.15);
      return <g key={i} opacity={o}><circle cx={x} cy={yy} r={13 + 3 * Math.sin(T * 5 + i)} fill={KC.mint} stroke={KC.ink} strokeWidth={4} /></g>; })}
  </g>;
}
// Cohete de Año Nuevo que sube y estalla en el instante t0.
function Cohete({ T, t0, x, y, color, alto = 520 }) {
  const u = kprog(T, t0, t0 + 0.7, kEase.sale), e = kprog(T, t0 + 0.7, t0 + 1.6);
  if (T < t0) return null;
  return <g>
    {u < 1 && <g><line x1={x} y1={y - alto * u} x2={x} y2={y - alto * u + 60} stroke={KC.yellow} strokeWidth={6} /><circle cx={x} cy={y - alto * u} r={8} fill="#fff" /></g>}
    {u >= 1 && e < 1 && Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2, d = 40 + e * 150;
      return <circle key={i} cx={x + Math.cos(a) * d} cy={y - alto + Math.sin(a) * d + e * e * 40} r={9 * (1 - e) + 2} fill={color} opacity={1 - e} />; })}
    {u >= 1 && Array.from({ length: 6 }, (_, i) => { const a = i * 1.1, v = Math.min(1, (T - t0 - 0.7) * 0.25);
      return <Particula key={i} x={x + Math.cos(a) * (60 + v * 120)} y={y - alto + Math.sin(a) * 50 + v * 260} r={8} seed={i + Math.round(x)} o={Math.min(1, (T - t0 - 0.9) * 2)} />; })}
  </g>;
}
// Celular con la escala del índice AIRE y SALUD (NOM-172-SEMARNAT-2019). nivel 0..4 = categoría marcada.
const IAS = [['Buena', '#3fbf4a'], ['Aceptable', '#ffe11a'], ['Mala', '#ff8a1f'], ['Muy mala', '#ff3b2f'], ['Extremadamente mala', '#8b2fd6']];
function Celular({ T, x, y, s = 1, nivel = 1, o = 1 }) {
  const n = Math.round(kclamp(nivel, 0, 4));
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-190} y={-360} width={380} height={720} rx={50} fill="#1d2230" stroke={KC.ink} strokeWidth={8} />
    <rect x={-165} y={-320} width={330} height={640} rx={26} fill="#f7f9fc" />
    <rect x={-40} y={-345} width={80} height={12} rx={6} fill="#444" />
    <text x={0} y={-262} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>Aire y Salud</text>
    <circle cx={0} cy={-150} r={78} fill={IAS[n][1]} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-138} textAnchor="middle" style={{ font:`900 ${n === 4 ? 20 : 30}px ${KF.texto}` }} fill={KC.ink}>{n === 4 ? 'Extrem. mala' : IAS[n][0]}</text>
    {IAS.map(([t, c], i) => <g key={i} transform={`translate(-140 ${-30 + i * 64})`}>
      <rect width={280} height={50} rx={12} fill={c} stroke={KC.ink} strokeWidth={i === n ? 7 : 3} opacity={i === n ? 1 : 0.55} />
      <text x={140} y={34} textAnchor="middle" style={{ font:`900 ${i === 4 ? 22 : 27}px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>)}
  </g>;
}
// Ventana que se cierra (cierre 0..1) con partículas que se quedan afuera.
function Ventana({ T, x, y, cierre = 0 }) {
  const hoja = 150 * (1 - cierre);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-200} width={340} height={400} rx={10} fill="#9fdcff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-160} y={-190} width={160} height={380} fill="#cdeeff" stroke={KC.ink} strokeWidth={5} opacity={0.9} />
    <rect x={hoja} y={-190} width={160} height={380} fill="#cdeeff" stroke={KC.ink} strokeWidth={5} opacity={0.9} />
    <rect x={-200} y={200} width={400} height={24} rx={8} fill="#e9dcc4" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <Particula key={i} x={200 + 30 + (i % 2) * 40 + Math.sin(T * 2 + i) * 10} y={-160 + i * 60} r={10} seed={i + 90} />)}
  </g>;
}
// Señal de "no correr afuera": tenis con raya roja.
function NoEjercicio({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={110} fill="#fff" stroke={KC.red} strokeWidth={16} />
    <path d="M -70 20 Q -60 -40 -10 -30 Q 10 -10 40 -5 Q 80 0 80 30 L 80 45 L -70 45 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <rect x={-72} y={40} width={154} height={14} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <line x1={-78} y1={-78} x2={78} y2={78} stroke={KC.red} strokeWidth={16} strokeLinecap="round" />
  </g>;
}

function ParticulasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ta: CUES.Tamano, O: CUES.Origen, Pu: CUES.Pulmon, P: CUES.Pregunta, Gu: CUES.Guia, Ci: CUES.Ciudad, A: CUES.AnoNuevo, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // partículas que entran en fila al grano de arena (36 × 2.5 µm = 90 µm; 10 px = 1 µm)
  const fila = Array.from({ length: 36 }, (_, i) => { const t0 = K.Ta + 0.5 + i * 0.075, u = kprog(T, t0, t0 + 0.45, kEase.sale);
    if (T < t0) return null; const q = krng(i + 5);
    return <Particula key={i} x={klerp(540 + (q() - 0.5) * 900, 102.5 + i * 25, u)} y={klerp(380 + q() * 120, 900, u)} r={12} seed={i + 1} color={'#d84a3a'} />; });
  const nFila = Math.round(36 * kprog(T, K.Ta + 0.5, K.Ta + 0.5 + 35 * 0.075 + 0.45));
  const g5 = klerp(10, 5, kprog(T, K.Gu + 2.2, K.Gu + 3.4, kEase.suave));            // guía: de 10 (2005) a 5 (2021)
  const cd = klerp(0, 20, kprog(T, K.Ci + 1.0, K.Ci + 2.6, kEase.sale));                // CDMX 2023: 20
  const humoNY = kprog(T, K.A + 1.0, K.A + 5.5);                                        // neblina de Año Nuevo
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: calle de ciudad; el aire parece limpio */}
      <Escena T={T} a={K.G} b={K.Ta}>
        {svg(<Calle T={T} />)}
      </Escena>
      <Lupa T={T} at={K.G + 0.2} until={K.Ta - 0.3} x={330} y={640} r={230} fx={470} fy={860} tinte={KC.yellow} etiqueta="AUMENTADO · PM2.5"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2a20" /><rect width={r * 2} height={r * 2} fill="#fff6c2" opacity=".12" />
          <NubePM T={t} w={r * 2} h={r * 2} n={46} seed={4} rmin={5} rmax={15} /></svg>} />

      {/* 2 · tamaño: más de 30 en fila a lo ancho de un granito de arena fina */}
      <Escena T={T} a={K.Ta} b={K.O} fondo="#0E0F12">
        {svg(<><GranoArena x={540} y={900} w={900} />{fila}
          <line x1={90} y1={1200} x2={990} y2={1200} stroke={KC.texto} strokeWidth={5} /><line x1={90} y1={1180} x2={90} y2={1220} stroke={KC.texto} strokeWidth={5} /><line x1={990} y1={1180} x2={990} y2={1220} stroke={KC.texto} strokeWidth={5} /></>)}
        <EscalaFija texto="10 µm" largo={100} y={1480} />
        <div style={{ position:'absolute', right:60, top:1455, font:`700 26px ${KF.mono}`, color:'rgba(246,243,236,.75)' }}>esquema</div>
      </Escena>
      <NumeroGigante T={T} at={K.Ta + 0.5} until={K.O - 0.2} valor={nFila} dur={0.01} etiqueta="en fila:" x={300} y={470} tam={150} color={KC.yellow} />
      <Etq T={T} at={K.Ta + 3.6} until={K.O - 0.2} x={100} y={1150} texto="arena fina · 90 µm" lado="der" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ta + 1.2} until={K.O - 0.2} x={100} y={600} texto="PM2.5 · hasta 2.5 µm" lado="der" tam={28} color={KC.gold2} />

      {/* 3 · de dónde salen */}
      <Escena T={T} a={K.O} b={K.Pu}>
        <FondoLunares color={KC.yellow} />
        {svg(<><rect x={0} y={1100} width={KW} height={KH - 1100} fill="#8a7a64" /><rect x={0} y={1100} width={KW} height={14} fill={KC.ink} />
          <Obra x={140} y={1100} T={T} /><Directas T={T} x0={140} y0={1040} seed={1} />
          <path d="M 260 1100 L 330 1100 L 300 1180 L 220 1180 Z" fill="#b8874a" opacity=".0" />
          <Fogata x={330} y={1095} T={T} s={0.8} /><Directas T={T} x0={330} y0={990} seed={2} />
          <Coche x={560} y={1100} s={0.75} color={KC.red} T={T} humo={false} /><GasSube T={T} x0={460} y0={1060} color="#b18cff" seed={1} />
          <Fabrica x={760} y={1100} T={T} /><GasSube T={T} x0={852} y0={790} color="#ff8a1f" seed={2} alto={420} />
          <PlantaLuz x={960} y={1100} /><GasSube T={T} x0={960} y0={830} color="#2fe0a8" seed={3} alto={440} /></>)}
      </Escena>
      <Chip T={T} at={K.O + 0.4} until={K.Pu - 0.2} texto="directas: obras, tierra, fuego" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.O + 3.4} until={K.Pu - 0.2} texto="la mayoría: se forman en el aire" y={1530} x={540} tam={32} borde={KC.orange} />
      <Etq T={T} at={K.O + 4.2} until={K.Pu - 0.2} x={540} y={420} texto="gases → partículas" lado="der" tam={30} color={KC.ink} />

      {/* 4 · pulmones (por dentro, esquema) */}
      <Escena T={T} a={K.Pu} b={K.P} fondo="#151822">
        {svg(<Pulmones T={T} a={K.Pu} />)}
        <div style={{ position:'absolute', right:60, top:1455, font:`700 26px ${KF.mono}`, color:'rgba(246,243,236,.75)' }}>esquema</div>
      </Escena>
      <Lupa T={T} at={K.Pu + 0.8} until={K.P - 0.2} x={830} y={470} r={170} fx={780} fy={870} tinte={KC.pink} etiqueta="POR DENTRO · alvéolos"
        interior={(t, r) => <AlveolosInt T={t} a={K.Pu + 0.8} r={r} />} />
      <Etq T={T} at={K.Pu + 2.6} until={K.P - 0.2} x={500} y={1000} texto="corazón" lado="izq" tam={30} color={KC.texto} />

      {/* 5 · re-gancho: ¿cuánto es demasiado? */}
      <Escena T={T} a={K.P} b={K.Gu} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={940} textAnchor="middle" style={{ font:`400 460px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 780)`}>?</text>
          <CuboAire T={T} x={270} y={1000} s={0.55} n={14} /></>)}
      </Escena>

      {/* 6 · guía OMS 2021: 5 µg/m³ (antes 10) */}
      <Escena T={T} a={K.Gu} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {svg(<><CuboAire T={T} x={290} y={820} s={1} n={Math.round(g5 * 2)} />
          <g opacity={kprog(T, K.Gu + 1.2, K.Gu + 1.7)}>
            <rect x={690} y={1150 - 25 * 26} width={190} height={25 * 26} rx={16} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
            <rect x={700} y={1150 - g5 * 26} width={170} height={g5 * 26} rx={12} fill={g5 > 6 ? KC.orange : KC.leaf} stroke={KC.ink} strokeWidth={5} />
            <text x={785} y={1150 - g5 * 26 - 24} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>{kformato(g5, 0)}</text>
            <text x={785} y={1205} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>µg/m³ al año</text>
            {T > K.Gu + 2.2 && <g opacity={0.6}><line x1={660} y1={1150 - 260} x2={910} y2={1150 - 260} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />
              <text x={655} y={1150 - 270} textAnchor="end" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>2005: 10</text></g>}
          </g></>)}
      </Escena>
      <Chip T={T} at={K.Gu + 1.4} until={K.Ci - 0.2} texto="OMS 2021: guía anual de PM2.5" y={420} x={600} tam={32} borde={KC.leaf} />

      {/* 7 · CDMX 2023: promedio 20 = 4 veces la guía */}
      <Escena T={T} a={K.Ci} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<><g opacity={0.55}><Skyline T={T} y={1150} estaciones={kprog(T, K.Ci + 0.1, K.Ci + 1.2)} /></g>
          <Barra x={200} valor={5} color={KC.leaf} titulo="OMS" />
          <Barra x={450} valor={cd} color={KC.red} titulo="CDMX 2023" />
          {[0, 1, 2, 3].map((i) => { const o = kprog(T, K.Ci + 3.0 + i * 0.3, K.Ci + 3.3 + i * 0.3, kEase.sale);
            return <g key={i} opacity={o}><rect x={620} y={1100 - (i + 1) * 100 + 4} width={150} height={92} rx={12} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
              <text x={695} y={1100 - i * 100 - 28} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>5</text></g>; })}
          <text x={900} y={1040} textAnchor="middle" opacity={kprog(T, K.Ci + 4.2, K.Ci + 4.5)} style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>×4</text></>)}
      </Escena>
      <Chip T={T} at={K.Ci + 0.4} until={K.A - 0.2} texto="SEDEMA · promedio anual 2023" y={420} x={370} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.2} until={K.A - 0.2} texto="µg/m³ de PM2.5" y={1440} x={540} tam={30} borde={KC.ink} />

      {/* 8 · 1 de enero de 2023: contingencia por cohetes y fogatas */}
      <Escena T={T} a={K.A} b={K.S} fondo="#0d1424">
        {svg(<><rect x={0} y={0} width={KW} height={KH} fill="#0d1424" />
          {Array.from({ length: 40 }, (_, i) => { const q = krng(i + 3); return <circle key={i} cx={q() * KW} cy={q() * 800} r={2 + q() * 2} fill="#fff" opacity={0.3 + 0.4 * Math.abs(Math.sin(T * 2 + i))} />; })}
          <g opacity={0.8}><Skyline T={T} y={1150} estaciones={0} /></g>
          {[[0.2, 260, KC.pink], [0.8, 720, KC.yellow], [1.4, 480, KC.mint], [2.1, 880, KC.cyan], [2.7, 200, KC.orange], [3.3, 600, KC.pink], [3.9, 380, KC.yellow], [4.5, 820, KC.lilac]].map(([d, x, c], i) =>
            <Cohete key={i} T={T} t0={K.A + d} x={x} y={1100} color={c} alto={480 + (i % 3) * 80} />)}
          <Fogata x={160} y={1170} T={T} s={0.9} /><Fogata x={900} y={1180} T={T} s={0.8} />
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill="#23262e" />
          <rect x={0} y={1150 - humoNY * 700} width={KW} height={humoNY * 700 + 20} fill="#8d8a86" opacity={0.45 * humoNY} /></>)}
      </Escena>
      <Chip T={T} at={K.A + 1.0} until={K.S - 0.2} texto="1 ene 2023 · contingencia por PM2.5" y={1440} x={540} tam={32} borde={KC.pink} />

      {/* 9 · qué sí sirve: índice AIRE y SALUD; en contingencia, ventanas cerradas y nada de ejercicio afuera */}
      <Escena T={T} a={K.S} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><Celular T={T} x={300} y={820} s={0.95} nivel={kclamp(Math.floor((T - K.S - 0.5) * 1.4), 0, 4)} />
          <g opacity={kprog(T, K.S + 3.0, K.S + 3.4)}><Ventana T={T} x={790} y={930} cierre={kprog(T, K.S + 3.3, K.S + 4.2, kEase.suave)} /></g>
          <NoEjercicio x={790} y={500} s={0.9} o={kprog(T, K.S + 4.6, K.S + 5.0)} /></>)}
      </Escena>
      <Chip T={T} at={K.S + 3.2} until={K.C - 0.2} texto="en contingencia" y={1440} x={540} tam={32} borde={KC.red} />

      {/* 10 · cierre: la misma calle, ahora con el índice en el celular */}
      <Escena T={T} a={K.C} b={FIN}>
        {svg(<><Calle T={T} tono={0.15} /><Celular T={T} x={830} y={980} s={0.5} nivel={1} /></>)}
      </Escena>
      <Lupa T={T} at={K.C + 0.4} until={K.Ou - 0.1} x={330} y={640} r={230} fx={470} fy={860} tinte={KC.yellow} etiqueta="AUMENTADO · PM2.5"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2a20" /><rect width={r * 2} height={r * 2} fill="#fff6c2" opacity=".12" />
          <NubePM T={t} w={r * 2} h={r * 2} n={46} seed={4} rmin={5} rmax={15} /></svg>} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ta - 0.1} texto="Nunca *las vas a ver.*" tam={56} />
      <Subtitulo T={T} idx={1} at={K.Ta + 0.1} until={K.O - 0.1} texto="Más de 30 *en un granito.*" tam={56} />
      <Subtitulo T={T} idx={2} at={K.O + 0.1} until={K.Pu - 0.1} texto="Se forman *en el aire.*" tam={56} />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={K.P - 0.1} texto="Muy adentro *del pulmón.*" tam={56} />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Gu - 0.1} texto="¿Cuánto es *demasiado?*" tam={56} />
      <Subtitulo T={T} idx={5} at={K.Gu + 0.1} until={K.Ci - 0.1} texto="OMS 2021: *5 al año.*" tam={56} />
      <Subtitulo T={T} idx={6} at={K.Ci + 0.1} until={K.A - 0.1} texto="CDMX: *20. Cuatro veces.*" tam={56} />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.S - 0.1} texto="1 de enero: *contingencia.*" tam={56} />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.C - 0.1} texto="Revisa *Aire y Salud.*" tam={56} />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una por una: *invisibles.*" tam={56} />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Tamano + 2.5, CUES.Origen - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Origen + 3.5, CUES.Origen + 6.8, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Guia + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Ciudad + 2.5, CUES.AnoNuevo - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.AnoNuevo + 2.6, CUES.Sirve - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Sirve + 1.4, CUES.Sirve + 4.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="41" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ParticulasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ParticulasShot /></CompositionStage></div>;
}
window.ParticulasApp = ParticulasApp;
