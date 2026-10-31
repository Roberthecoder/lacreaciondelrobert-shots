// Shot Científico #42 · Los gemelos idénticos no tienen las mismas huellas — NARRADO (N1 "Por dentro" + N2 comparación).
// Datos: Wertheim 2011 (Fingerprint Sourcebook cap. 3), MedlinePlus 2022, Jain et al. 2002, Henneberg et al. 1997. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (útero, bebé, huellas y flechas de tensión).
const HPIEL = '#f6d3bd', HKOALA = '#9aa3ad';

/* ---------- HUELLA: crestas + minucias (finales y bifurcaciones) ----------
   La forma general depende de `tipo` (remolino, presilla, presilla2, arco); los detalles finos (dónde se corta o se divide
   cada cresta) dependen de `seed`. Mismo tipo + distinta semilla = dibujo general parecido, detalles distintos. */
const H_CACHE = {};
function hRng(seed) { let s = (seed * 9301 + 49297) % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
function hCrestas(tipo) {
  const R = [], N = 80;
  if (tipo === 'remolino') for (let k = 1; k <= 13; k++) { const pts = [], rx = 8.6 * k + 3, ry = 11.5 * k + 3;
    for (let i = 0; i <= N; i++) { const a = i / N * Math.PI * 2 + k * 0.4; pts.push([rx * Math.cos(a) + k * 0.9, ry * Math.sin(a) - 10 + k * 1.4]); } R.push({ pts, cerrada: true }); }
  else if (tipo === 'arco') for (let k = -13; k <= 13; k++) { const pts = [], amp = Math.max(4, 52 - Math.abs(k + 4) * 3.2);
    for (let i = 0; i <= N; i++) { const u = i / N; pts.push([-170 + 340 * u, 11 * k + 25 - amp * Math.sin(Math.PI * u)]); } R.push({ pts }); }
  else { const d = tipo === 'presilla2' ? -1 : 1, an = d * 0.38, ca = Math.cos(an), sa = Math.sin(an);
    for (let k = 1; k <= 15; k++) { const pts = [], a = 9.5 * k, L = 230;
      for (let i = 0; i <= N; i++) { const u = i / N * 2.6; let x, y;
        if (u < 0.8) { x = -a; y = L * (0.8 - u) / 0.8; } else if (u < 1.8) { const t = Math.PI + Math.PI * (u - 0.8); x = a * Math.cos(t); y = a * 1.25 * Math.sin(t); } else { x = a; y = L * (u - 1.8) / 0.8; }
        pts.push([x * ca - y * sa - d * 20, x * sa + y * ca - 15]); }
      R.push({ pts }); } }
  return R;
}
function hDatos(tipo, seed) {
  const key = tipo + seed; if (H_CACHE[key]) return H_CACHE[key];
  const rng = hRng(seed + 7), base = hCrestas(tipo), piezas = [], ramas = [], min = [];
  const dentro = ([x, y]) => (x * x) / (95 * 95) + (y * y) / (128 * 128) < 1;
  base.forEach((c, k) => {
    const n = c.pts.length; const corta = rng() < 0.6, g = 6 + Math.floor(rng() * (n - 14)), w = 3 + Math.floor(rng() * 3);
    if (corta) { if (c.cerrada) piezas.push({ k, pts: c.pts.slice(g + w).concat(c.pts.slice(1, g)) }); else { piezas.push({ k, pts: c.pts.slice(0, g) }); piezas.push({ k, pts: c.pts.slice(g + w) }); }
      [c.pts[g], c.pts[g + w]].forEach((p) => dentro(p) && min.push({ x: p[0], y: p[1], t: 'fin', o: rng() })); }
    else piezas.push({ k, pts: c.pts });
    if (k < base.length - 1 && rng() < 0.5) { const b = 8 + Math.floor(rng() * (n - 20)), P = c.pts[b], Q = base[k + 1].pts[Math.min(n - 1, b + 4)];
      ramas.push({ k, P, Q }); dentro(P) && min.push({ x: P[0], y: P[1], t: 'div', o: rng() }); }
  });
  min.sort((a, b) => a.o - b.o);
  return (H_CACHE[key] = { piezas, ramas, min, n: base.length });
}
function Huella({ x = 0, y = 0, s = 1, sx = 1, rot = 0, tipo = 'remolino', seed = 1, p = 1, id = 'h', tinta = KC.ink, fondo = HPIEL, marcas = 0, nMarcas = 4, colorMarca = KC.red,
  doblar = 0, T = 0, grosor = 5.5, borde = true, o = 1, brillo = 0 }) {
  const D = hDatos(tipo, seed), lim = Math.ceil(kclamp(p, 0, 1) * D.n);
  const wp = ([px, py]) => (doblar ? [px + doblar * 7 * Math.sin(py * 0.05 + T * 2), py + doblar * 5 * Math.sin(px * 0.045 + T * 1.6)] : [px, py]);
  const d = (pts) => pts.map((q, i) => { const [a, b] = wp(q); return `${i ? 'L' : 'M'}${a.toFixed(1)} ${b.toFixed(1)}`; }).join('');
  const orden = (k) => (tipo === 'arco' ? Math.abs(k - (D.n >> 1)) : k);
  const lista = D.min.slice(0, nMarcas);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * sx} ${s})`} opacity={o}>
    <defs><clipPath id={`hc-${id}`}><ellipse rx={110} ry={145} /></clipPath></defs>
    {brillo > 0 && <ellipse rx={140} ry={175} fill={KC.yellow} opacity={0.5 * brillo} />}
    <ellipse rx={110} ry={145} fill={fondo} stroke={borde ? KC.ink : 'none'} strokeWidth={8} />
    <g clipPath={`url(#hc-${id})`} fill="none" stroke={tinta} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round">
      {D.piezas.filter((c) => orden(c.k) < lim).map((c, i) => <path key={i} d={d(c.pts)} />)}
      {D.ramas.filter((r) => orden(r.k) < lim).map((r, i) => { const [a, b] = wp(r.P), [c2, d2] = wp(r.Q); return <path key={'r' + i} d={`M${a} ${b} Q${(a + c2) / 2 + 4} ${(b + d2) / 2 - 4} ${c2} ${d2}`} />; })}
    </g>
    {marcas > 0 && lista.map((m, i) => { const e = kclamp(marcas * lista.length - i, 0, 1); const [a, b] = wp([m.x, m.y]);
      return <circle key={'m' + i} cx={a} cy={b} r={13 + 10 * (1 - e)} fill="none" stroke={colorMarca} strokeWidth={6} opacity={e} />; })}
  </g>;
}

// Útero (esquema) con un bebé de pocos meses enroscado. mano = punto de la yema del dedo (para la lupa).
const UTERO = { x: 540, y: 820 }, MANO_BEBE = [UTERO.x + 70, UTERO.y - 40];
function Utero({ T }) {
  const { x, y } = UTERO, lat = 1 + 0.015 * Math.sin(T * 4);
  return <g>
    <path d={`M ${x - 330} ${y - 300} C ${x - 260} ${y - 420} ${x + 260} ${y - 420} ${x + 330} ${y - 300} C ${x + 380} ${y - 120} ${x + 230} ${y + 220} ${x + 70} ${y + 300} L ${x + 60} ${y + 400} L ${x - 60} ${y + 400} L ${x - 70} ${y + 300} C ${x - 230} ${y + 220} ${x - 380} ${y - 120} ${x - 330} ${y - 300} Z`}
      fill="#f28aa5" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={x} cy={y - 40} rx={250} ry={270} fill="#ffe4d6" stroke={KC.ink} strokeWidth={6} opacity=".95" />
    <g transform={`translate(${x} ${y - 30}) scale(${lat})`}>
      <path d="M -60 -40 C -150 20 -120 170 10 190 C 120 200 160 110 120 40" fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <path d="M 10 190 C -40 220 -110 150 -60 120" fill="none" stroke={KC.ink} strokeWidth={9} />
      <circle cx={10} cy={-90} r={115} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
      <circle cx={60} cy={-100} r={9} fill={KC.ink} />
      <path d="M 90 -50 Q 100 -40 92 -30" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={`M 60 20 Q ${80 + 6 * Math.sin(T * 3)} -10 70 -10`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" fill="none" />
      <path d={`M 60 20 Q ${80 + 6 * Math.sin(T * 3)} -10 70 -10`} stroke={CPIEL} strokeWidth={12} strokeLinecap="round" fill="none" />
      <path d="M -10 160 Q -50 210 -30 230" stroke={KC.ink} strokeWidth={8} fill="none" />
    </g>
    <path d={`M ${x - 40} ${y + 200} q -30 60 0 110`} stroke="#e65c80" strokeWidth={12} fill="none" />
  </g>;
}
// Óvulo + espermatozoide (esquema).
function Ovulo({ x, y, r = 120, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * (r + 22)} cy={Math.sin(a) * (r + 22)} r={14} fill="#ffd27a" stroke={KC.ink} strokeWidth={4} />; })}
    <circle r={r} fill="#ffe0ec" stroke={KC.ink} strokeWidth={8} />
    <circle r={r * 0.32} cx={-r * 0.15} cy={-r * 0.1} fill="#f7a8c5" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Esperma({ x, y, rot = 0, T = 0, s = 1 }) {
  const cola = Array.from({ length: 14 }, (_, i) => `${-30 - i * 14},${Math.sin(T * 14 - i * 0.7) * (4 + i * 1.2)}`).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <polyline points={`0,0 ${cola}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <polyline points={`0,0 ${cola}`} fill="none" stroke="#e8f0ff" strokeWidth={4} strokeLinecap="round" />
    <ellipse rx={30} ry={20} fill="#e8f0ff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Koala (esquema) abrazado a una rama; devuelve la yema de su dedo en DEDO_KOALA.
const DEDO_KOALA = [640, 700];
function Koala({ T }) {
  const r = mece(T, 3, 0.3) * 3;
  return <g transform={`rotate(${r} 540 1100)`}>
    <path d="M 140 1180 L 980 420" stroke="#6b4423" strokeWidth={70} strokeLinecap="round" />
    <path d="M 140 1180 L 980 420" stroke={KC.ink} strokeWidth={70} strokeLinecap="round" opacity=".0" />
    <path d="M 140 1180 L 980 420" fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="1 0" opacity=".35" />
    <ellipse cx={720} cy={420} rx={70} ry={30} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} transform="rotate(-30 720 420)" />
    <ellipse cx={860} cy={520} rx={70} ry={28} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} transform="rotate(25 860 520)" />
    <ellipse cx={430} cy={930} rx={170} ry={210} fill={HKOALA} stroke={KC.ink} strokeWidth={10} />
    <path d="M 500 840 C 580 780 620 730 650 700" stroke={KC.ink} strokeWidth={60} strokeLinecap="round" fill="none" />
    <path d="M 500 840 C 580 780 620 730 650 700" stroke={HKOALA} strokeWidth={46} strokeLinecap="round" fill="none" />
    <circle cx={655} cy={695} r={34} fill="#3b3f46" stroke={KC.ink} strokeWidth={6} />
    {[[230, 560], [530, 560]].map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={78} fill={HKOALA} stroke={KC.ink} strokeWidth={9} /><circle cx={a} cy={b} r={46} fill="#f2eee8" /></g>)}
    <circle cx={380} cy={660} r={160} fill={HKOALA} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={395} cy={700} rx={44} ry={60} fill="#2a2d33" stroke={KC.ink} strokeWidth={6} />
    <circle cx={320} cy={635} r={13} fill={KC.ink} /><circle cx={465} cy={635} r={13} fill={KC.ink} />
  </g>;
}
// Lupa de detective (dentro de svg).
function LupaDetective({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-22} y={120} width={44} height={200} rx={18} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
    <circle r={130} fill="rgba(200,240,255,.25)" stroke={KC.ink} strokeWidth={30} />
    <circle r={130} fill="none" stroke={KC.gold2} strokeWidth={16} />
    <path d="M -70 -60 A 90 90 0 0 1 -10 -95" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Gel de ADN: dos carriles con las mismas bandas.
function GelADN({ x, y, p = 1 }) {
  const b = [40, 95, 120, 190, 235, 300];
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-190} y={-30} width={380} height={380} rx={24} fill="#1c2440" stroke={KC.ink} strokeWidth={9} />
    {[-90, 90].map((cx, j) => <g key={j}>{b.map((yy, i) => <rect key={i} x={cx - 60} y={yy - 10} width={120} height={18} rx={8} fill={KC.cyan} opacity={kclamp(p * b.length - i, 0, 1)} />)}</g>)}
    <text x={-90} y={-48} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>gemelo 1</text>
    <text x={90} y={-48} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>gemelo 2</text>
  </g>;
}
// Vidrio de la ventana (cierre).
function Vidrio({ x, y, w, h }) {
  return <g><rect x={x} y={y} width={w} height={h} rx={10} fill="rgba(210,245,255,.55)" stroke={KC.ink} strokeWidth={12} />
    <path d={`M ${x + 40} ${y + 120} L ${x + 140} ${y + 30} M ${x + 40} ${y + 200} L ${x + 220} ${y + 40}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".8" /></g>;
}
const TIPOS10 = ['remolino', 'presilla', 'arco', 'presilla2', 'remolino', 'presilla2', 'remolino', 'presilla', 'presilla', 'arco'];

function HuellasGemelos() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const sube = (a, d = 0.45) => kprog(T, a, a + d, kEase.rebote);
  const gem = (x, col, b, seed, cara, yp = 1180, al = 560) => <PersonaSimple x={x} yPies={yp} alto={al} color={col} brazos={b} cara={cara} />;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: dos gemelos idénticos levantan la mano; sus huellas salen y no coinciden */}
      <Escena T={T} a={K.Gancho} b={K.ADN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - sube(0.05)) * 300})`}>{gem(190, KC.cyan, 0.7 * kprog(T, 0.25, 0.7, kEase.rebote), 1, 'o')}</g>
          <g transform={`translate(0 ${(1 - sube(0.15)) * 300})`}>{gem(470, KC.cyan, 0.7 * kprog(T, 0.35, 0.8, kEase.rebote), 2, 'o')}</g>
          <Huella id="g1" x={klerp(150, 170, kprog(T, 1.6, 2.4, kEase.sale))} y={klerp(700, 440, kprog(T, 0.8, 1.4, kEase.sale))} s={klerp(0.2, 0.85, kprog(T, 0.8, 1.4, kEase.rebote))} tipo="remolino" seed={3} rot={-6}
            marcas={kprog(T, 2.6, 3.6)} nMarcas={3} o={kprog(T, 0.8, 1.0)} />
          <Huella id="g2" x={klerp(500, 490, kprog(T, 1.6, 2.4, kEase.sale))} y={klerp(700, 440, kprog(T, 0.9, 1.5, kEase.sale))} s={klerp(0.2, 0.85, kprog(T, 0.9, 1.5, kEase.rebote))} tipo="remolino" seed={11} rot={6}
            marcas={kprog(T, 2.6, 3.6)} nMarcas={3} colorMarca={KC.blue} o={kprog(T, 0.9, 1.1)} />
          <TextoSvg x={330} y={480} tam={150} color={KC.yellow} s={sube(1.9)} o={kprog(T, 1.9, 2.0)}>≠</TextoSvg>
          <TextoSvg x={540} y={1130} tam={60} color={KC.texto} s={sube(3.4)} o={kprog(T, 3.4, 3.5)}>ADN ≈ casi igual</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 1 · mismo óvulo y mismo espermatozoide → se divide en dos embriones con casi el mismo ADN */}
      <Escena T={T} a={K.ADN} b={K.Formacion} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={22} color="rgba(255,255,255,.12)" />
        <Lienzo>
          {(() => { const t = T - K.ADN, div = kprog(t, 1.9, 2.9, kEase.suave), une = kprog(t, 0.2, 1.4, kEase.sale);
            return <g>
              {div < 0.02 && <Ovulo x={540} y={720} r={170} />}
              {div >= 0.02 && <><Ovulo x={540 - 230 * div} y={720} r={klerp(170, 140, div)} /><Ovulo x={540 + 230 * div} y={720} r={klerp(170, 140, div)} /></>}
              {une < 1 && <Esperma x={klerp(40, 340, une)} y={klerp(1060, 840, une)} rot={-36} T={T} s={1.6} />}
              {une >= 1 && div < 0.3 && <circle cx={540} cy={720} r={200 + 50 * kprog(t, 1.4, 1.9)} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={1 - kprog(t, 1.4, 1.9)} />}
              <g opacity={kprog(t, 3.0, 3.5)}>
                <ADNHebra T={T} x={120} y={1010} largo={380} alto={90} vueltas={2.4} grosor={9} />
                <ADNHebra T={T} x={580} y={1010} largo={380} alto={90} vueltas={2.4} grosor={9} resalta={(u) => Math.abs(u - 0.62) < 0.03} />
              </g>
            </g>; })()}
        </Lienzo>
        <Etq T={T} at={K.ADN + 0.3} until={K.ADN + 1.8} x={720} y={520} texto="óvulo" lado="der" color={KC.texto} />
        <Etq T={T} at={K.ADN + 0.5} until={K.ADN + 1.8} x={300} y={990} texto="espermatozoide" lado="der" color={KC.texto} />
        <Chip T={T} at={K.ADN + 2.0} until={K.Formacion - 0.2} texto="1 → 2 embriones" x={540} y={460} tam={42} borde={KC.cyan} />
        <Chip T={T} at={K.ADN + 3.2} until={K.Formacion - 0.1} texto="casi el mismo ADN" x={540} y={1120} tam={42} borde={KC.gold} />
      </Escena>
      {/* 2 · las huellas se forman antes de nacer: útero (esquema) y zoom a la yema del dedo */}
      <Escena T={T} a={K.Formacion} b={K.Presion} zoom={0.12} origen={`${MANO_BEBE[0]}px ${MANO_BEBE[1]}px`}>
        <FondoLunares color={KC.lilac} />
        <Lienzo><g transform={`translate(0 ${(1 - sube(K.Formacion - 0.2, 0.6)) * 200})`}><Utero T={T} /></g></Lienzo>
        <Chip T={T} at={K.Formacion + 0.3} until={K.Formacion + 1.3} texto="antes de nacer" x={540} y={400} tam={44} borde={KC.pink} />
        <Chip T={T} at={K.Formacion + 1.5} until={K.Formacion + 2.9} texto="primeros meses del embarazo" x={540} y={400} tam={38} borde={KC.gold} />
      </Escena>
      <Lupa T={T} at={K.Formacion + 3.0} until={K.Presion - 0.15} x={790} y={500} r={165} fx={MANO_BEBE[0]} fy={MANO_BEBE[1]} tinte={KC.yellow} etiqueta="POR DENTRO · LA YEMA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a1830" />
            <Huella id="lf" x={r} y={r + 10} s={1.0} tipo="remolino" seed={5} p={kprog(t, K.Formacion + 3.2, K.Presion, kEase.suave)} /></svg>} />
      {/* 3 · presión: la yema crece y se estira; flechas de tensión; las crestas se doblan */}
      <Escena T={T} a={K.Presion} b={K.Dos} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={26} color="rgba(255,190,210,.18)" tam={[8, 26]} vel={10} />
        <Lienzo>
          {(() => { const t = T - K.Presion, crece = kprog(t, 0, 6.5, kEase.suave), sx = 1 + 0.18 * kprog(t, 1.2, 5.5, kEase.suave), S = klerp(1.9, 2.3, crece), pulso = 0.5 + 0.5 * Math.sin(T * 5);
            const R = [[1, 0], [0.8, -0.6], [-0.8, -0.6], [-1, 0], [-0.8, 0.6], [0.8, 0.6]];
            return <g>
              <Huella id="pr" x={540} y={760} s={S} sx={sx} tipo="remolino" seed={5} p={kprog(t, 0, 2.2)} doblar={kprog(t, 1.4, 4)} T={T} grosor={4.5} />
              {R.map(([dx, dy], i) => { const ini = 1.0 + i * 0.25, rx = 110 * S * sx, ry = 145 * S;
                const L = 110 + 50 * pulso, x1 = 540 + dx * (rx + 20), y1 = 760 + dy * (ry + 20);
                return <FlechaRecta key={i} x1={x1} y1={y1} x2={x1 + dx * L} y2={y1 + dy * L} p={kprog(t, ini, ini + 0.5, kEase.sale)} color={KC.yellow} grosor={18} punta={40} />; })}
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Presion + 1.0} until={K.Presion + 4.6} texto="crece y se estira" x={540} y={420} tam={44} borde={KC.yellow} />
        <Chip T={T} at={K.Presion + 4.7} until={K.Dos - 0.1} texto="ambiente dentro del útero" x={540} y={420} tam={40} borde={KC.pink} />
        <Etq T={T} at={K.Presion + 2.2} until={K.Presion + 6.5} x={200} y={1150} texto="crestas de la piel" lado="der" color={KC.texto} tam={30} />
      </Escena>
      {/* 4 · nunca idénticas: diez yemas distintas, cinco por gemelo */}
      <Escena T={T} a={K.Dos} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {TIPOS10.map((tp, i) => { const fila = Math.floor(i / 5), c = i % 5, at = K.Dos + 0.3 + i * 0.22;
            return <Huella key={i} id={'d' + i} x={140 + c * 200} y={620 + fila * 420} s={0.72 * sube(at)} tipo={tp} seed={20 + i * 3} o={kprog(T, at, at + 0.1)} grosor={6} />; })}
          {T > K.Dos + 3.2 && <TextoSvg x={240} y={650} tam={110} color={KC.yellow} s={sube(K.Dos + 3.2)}>≠</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Dos + 0.2} until={K.Pregunta - 0.1} texto="gemelo 1" x={180} y={430} tam={36} borde={KC.cyan} />
        <Chip T={T} at={K.Dos + 1.3} until={K.Pregunta - 0.1} texto="gemelo 2" x={180} y={850} tam={36} borde={KC.pink} />
        <Chip T={T} at={K.Dos + 2.4} until={K.Pregunta - 0.1} texto="nunca idénticas" x={720} y={1175} tam={40} borde={KC.gold} />
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Parecidas} color={KC.orange} />
      {/* 6 · dibujo general parecido, detalles finos distintos (finales y bifurcaciones) */}
      <Escena T={T} a={K.Parecidas} b={K.Policia} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Huella id="pa" x={290} y={790} s={1.55} tipo="remolino" seed={3} marcas={kprog(T, K.Parecidas + 3.4, K.Parecidas + 4.6)} nMarcas={4} brillo={kprog(T, K.Parecidas + 0.6, K.Parecidas + 1.2) * (1 - kprog(T, K.Parecidas + 3.0, K.Parecidas + 3.4))} />
          <Huella id="pb" x={790} y={790} s={1.55} tipo="remolino" seed={11} marcas={kprog(T, K.Parecidas + 3.8, K.Parecidas + 5.0)} nMarcas={4} colorMarca={KC.blue} brillo={kprog(T, K.Parecidas + 0.6, K.Parecidas + 1.2) * (1 - kprog(T, K.Parecidas + 3.0, K.Parecidas + 3.4))} />
        </Lienzo>
        <Chip T={T} at={K.Parecidas + 0.5} until={K.Parecidas + 3.2} texto="dibujo general: parecido" x={540} y={430} tam={42} borde={KC.mint} />
        <Chip T={T} at={K.Parecidas + 3.3} until={K.Policia - 0.1} texto="detalles finos: diferentes" x={540} y={430} tam={42} borde={KC.red} />
        <Lupa T={T} at={K.Parecidas + 5.0} until={K.Policia - 0.2} x={540} y={945} r={110} fx={290} fy={790} tinte={KC.yellow} etiqueta="AL MICROSCOPIO · CRESTAS"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={HPIEL} />
            <g fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round">
              <path d={`M -10 ${r - 70} Q ${r} ${r - 100} ${r * 2 + 10} ${r - 70}`} />
              <path d={`M -10 ${r} Q ${r * 0.7} ${r - 20} ${r} ${r - 10} Q ${r * 1.4} ${r - 5} ${r * 2 + 10} ${r - 10}`} />
              <path d={`M ${r} ${r - 10} Q ${r * 1.4} ${r + 30} ${r * 2 + 10} ${r + 50}`} />
              <path d={`M -10 ${r + 80} Q ${r * 0.6} ${r + 70} ${r * 0.9} ${r + 90}`} />
              <path d={`M ${r * 1.25} ${r + 120} Q ${r * 1.6} ${r + 115} ${r * 2 + 10} ${r + 130}`} />
            </g>
            <circle cx={r} cy={r - 10} r={34} fill="none" stroke={KC.red} strokeWidth={6} />
            <circle cx={r * 0.9} cy={r + 90} r={30} fill="none" stroke={KC.blue} strokeWidth={6} /></svg>} />
        <Etq T={T} at={K.Parecidas + 5.6} until={K.Policia - 0.2} x={665} y={900} texto="se divide" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Parecidas + 6.0} until={K.Policia - 0.2} x={415} y={1060} texto="se corta" lado="izq" color={KC.texto} />
      </Escena>
      {/* 7 · las huellas sí los distinguen; una prueba común de ADN no */}
      <Escena T={T} a={K.Policia} b={K.Koala} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Huella id="p1" x={200} y={650} s={0.9} tipo="remolino" seed={3} marcas={1} nMarcas={3} />
          <Huella id="p2" x={480} y={650} s={0.9} tipo="remolino" seed={11} marcas={1} nMarcas={3} colorMarca={KC.blue} />
          {(() => { const t = T - K.Policia, u = kprog(t, 0.2, 2.6, kEase.suave); return <LupaDetective x={klerp(130, 500, u)} y={630 + Math.sin(u * Math.PI * 2) * 40} s={0.8} rot={-35} />; })()}
          {T > K.Policia + 2.4 && <TextoSvg x={340} y={930} tam={140} color={KC.leaf} s={sube(K.Policia + 2.4)}>✓</TextoSvg>}
          <g opacity={kprog(T, K.Policia + 2.8, K.Policia + 3.2)} transform={`translate(0 ${(1 - sube(K.Policia + 2.8)) * 200})`}>
            <GelADN x={810} y={650} p={kprog(T, K.Policia + 3.0, K.Policia + 4.0)} />
            <TextoSvg x={810} y={860} tam={110} color={KC.yellow}>=</TextoSvg>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Policia + 0.4} until={K.Koala - 0.1} texto="las huellas sí los distinguen" x={540} y={420} tam={42} borde={KC.leaf} />
        <Chip T={T} at={K.Policia + 3.4} until={K.Koala - 0.1} texto="prueba común de ADN" x={790} y={1100} tam={32} borde={KC.cyan} />
      </Escena>
      {/* 8 · dato raro: koalas con huellas casi idénticas, también al microscopio (Henneberg 1997) */}
      <Escena T={T} a={K.Koala} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g opacity={1 - kprog(T, K.Koala + 2.6, K.Koala + 3.2)}><Koala T={T} /></g>
          <g opacity={kprog(T, K.Koala + 2.6, K.Koala + 3.2)}>
            <Huella id="kh" x={290} y={680} s={1.1} tipo="presilla" seed={41} fondo="#cfd4da" />
            <Huella id="hh" x={790} y={680} s={1.1} tipo="presilla" seed={47} />
            <TextoSvg x={540} y={715} tam={120} color={KC.yellow} s={sube(K.Koala + 3.2)}>≈</TextoSvg>
          </g>
        </Lienzo>
        <Etq T={T} at={K.Koala + 0.4} until={K.Koala + 2.6} x={60} y={400} texto="koala" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Koala + 0.6} until={K.Koala + 2.6} x={60} y={445} texto="Phascolarctos cinereus" it lado="der" color={KC.ink} tam={30} />
        <Lupa T={T} at={K.Koala + 0.9} until={K.Koala + 2.6} x={830} y={900} r={130} fx={DEDO_KOALA[0] + 15} fy={DEDO_KOALA[1] - 5} tinte={KC.yellow} etiqueta="AL MICROSCOPIO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#cfd4da" />
            {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M -10 ${i * 36 + 6} Q ${r} ${i * 36 - 22} ${r * 2 + 10} ${i * 36 + 10}`} fill="none" stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />)}</svg>} />
        {[[290, 'koala', '#cfd4da', 0], [790, 'humano', HPIEL, 1]].map(([lx, nom, bg, j]) => <Lupa key={nom} T={T} at={K.Koala + 4.3 + j * 0.3} until={K.Cierre - 0.15} x={lx} y={1060} r={100} fx={lx} fy={680} tinte={KC.yellow}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={bg} />
            {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M -10 ${i * 34 + 4} Q ${r} ${i * 34 - 26 + j * 4} ${r * 2 + 10} ${i * 34 + 8}`} fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />)}
            {Array.from({ length: 7 }, (_, i) => <circle key={'p' + i} cx={30 + i * 26} cy={i * 34 - 6 + 0.25 * r} r={3} fill="#fff" />)}</svg>} />)}
        <Chip T={T} at={K.Koala + 4.6} until={K.Cierre - 0.1} texto="al microscopio" x={540} y={1060} tam={30} borde={KC.yellow} mono />
        <Chip T={T} at={K.Koala + 3.0} until={K.Cierre - 0.1} texto="koala" x={290} y={470} tam={38} borde={HKOALA} />
        <Chip T={T} at={K.Koala + 3.1} until={K.Cierre - 0.1} texto="humano" x={790} y={470} tam={38} borde={KC.pink} />
        <Chip T={T} at={K.Koala + 3.4} until={K.Cierre - 0.1} texto="casi idénticas" x={540} y={905} tam={44} borde={KC.gold} />
        <Chip T={T} at={K.Koala + 3.8} until={K.Cierre - 0.1} texto="Henneberg y colegas · 1997" x={540} y={385} tam={26} borde={KC.ink} mono />
      </Escena>
      {/* 9 · cierre: los mismos gemelos dejan huellas distintas en un vidrio */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Vidrio x={90} y={360} w={640} h={420} />
          <Huella id="c1" x={260} y={570} s={0.62 * kprog(T, K.Cierre + 0.7, K.Cierre + 1.1, kEase.rebote)} tipo="remolino" seed={3} fondo="rgba(255,255,255,.35)" tinta="#3a3f5c" borde={false} brillo={kprog(T, K.Cierre + 1.0, K.Cierre + 1.6)} />
          <Huella id="c2" x={560} y={570} s={0.62 * kprog(T, K.Cierre + 1.1, K.Cierre + 1.5, kEase.rebote)} tipo="remolino" seed={11} fondo="rgba(255,255,255,.35)" tinta="#3a3f5c" borde={false} brillo={kprog(T, K.Cierre + 1.4, K.Cierre + 2.0)} />
          {gem(260, KC.cyan, kprog(T, K.Cierre + 0.2, K.Cierre + 0.7, kEase.rebote) * (1 - kprog(T, K.Cierre + 1.6, K.Cierre + 2.2)), 1, 'sonrie')}
          {gem(560, KC.cyan, kprog(T, K.Cierre + 0.5, K.Cierre + 1.0, kEase.rebote) * (1 - kprog(T, K.Cierre + 1.9, K.Cierre + 2.5)), 2, 'sonrie')}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 2.2} until={K.Outro - 0.1} texto="su propia firma" x={720} y={300} tam={46} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.ADN - 0.1} texto="Casi el mismo ADN, *distintas huellas.*" />
      <Subtitulo T={T} idx={1} at={K.ADN + 0.1} until={K.Formacion - 0.1} texto="Mismo óvulo, *mismo espermatozoide.*" />
      <Subtitulo T={T} idx={2} at={K.Formacion + 0.1} until={K.Presion - 0.1} texto="Se forman *antes de nacer.*" />
      <Subtitulo T={T} idx={3} at={K.Presion + 0.1} until={K.Dos - 0.1} texto="La yema *crece y se estira.*" />
      <Subtitulo T={T} idx={4} at={K.Dos + 0.1} until={K.Pregunta - 0.1} texto="Nunca *idénticas.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Parecidas - 0.1} texto="¿Totalmente *distintas?*" />
      <Subtitulo T={T} idx={6} at={K.Parecidas + 0.1} until={K.Policia - 0.1} texto="Dibujo parecido, *detalles distintos.*" />
      <Subtitulo T={T} idx={7} at={K.Policia + 0.1} until={K.Koala - 0.1} texto="Las huellas *sí los distinguen.*" />
      <Subtitulo T={T} idx={8} at={K.Koala + 0.1} until={K.Cierre - 0.1} texto="Koalas: *casi como las nuestras.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Cada quien, *su propia firma.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Formacion + 0.2, K.Formacion + 2.5, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Presion + 3.0, K.Dos - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Dos + 3.0, K.Pregunta - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Pregunta + 0.05, K.Parecidas + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Parecidas + 3.4, K.Policia - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Policia + 2.0, K.Koala - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Koala + 0.2, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="42" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function HuellasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HuellasGemelos /></CompositionStage></div>;
}
window.HuellasApp = HuellasApp;
