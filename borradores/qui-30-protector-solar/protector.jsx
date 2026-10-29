// Shot Químico #30 · Esa crema no es un espejo: es una esponja (cómo funciona el protector solar) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const UV = '#8a3ffc', UVB = '#c13bd6', PIEL = '#eaa27a', PIEL2 = '#d98a63', CREMA = '#fffaf0', CALOR = '#ff7a1f';

// ---------- utilidades de dibujo ----------
// Línea ondulada de (x0,y0) a (x1,y1), dibujada de la fracción a a la b, con punta de flecha en b.
function Onda({ x0, y0, x1, y1, a = 0, b = 1, amp = 12, lon = 46, fase = 0, color = UV, ancho = 9, punta = true, o = 1 }) {
  if (b <= a || o <= 0) return null;
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, px = -uy, py = ux;
  const pts = []; const n = Math.max(6, Math.round((b - a) * L / 8));
  for (let i = 0; i <= n; i++) { const u = a + (b - a) * i / n, d = u * L, w = Math.sin(d / lon * Math.PI * 2 + fase) * amp;
    pts.push(`${(x0 + dx * u + px * w).toFixed(1)} ${(y0 + dy * u + py * w).toFixed(1)}`); }
  const hx = x0 + dx * b, hy = y0 + dy * b;
  return <g opacity={o}>
    <path d={'M ' + pts.join(' L ')} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {punta && <path d={`M ${hx + ux * 20} ${hy + uy * 20} L ${hx - ux * 6 + px * 16} ${hy - uy * 6 + py * 16} L ${hx - ux * 6 - px * 16} ${hy - uy * 6 - py * 16} Z`} fill={color} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Destello al llegar (absorbido = dorado, en la piel = rojo).
function Destello({ x, y, q, color = KC.yellow, r = 50 }) {
  if (q <= 0 || q >= 1) return null;
  return <g opacity={1 - q}>
    <circle cx={x} cy={y} r={10 + r * q} fill="none" stroke={color} strokeWidth={8} />
    <circle cx={x} cy={y} r={12 * (1 - q)} fill={color} />
  </g>;
}
// Lluvia de rayos UV: cada rayo viaja de su inicio a su fin en `per` s y al llegar destella.
function Lluvia({ T, t0, t1 = 1e9, rayos, per = 1.0, desf = 0.37, color = UV, ancho = 9 }) {
  if (T < t0) return null;
  return <g>{rayos.map((r, i) => {
    const loc = T - t0 - i * desf * per; if (loc < 0) return null;
    const ciclo = Math.floor(loc / (per * 1.35)); if (t0 + i * desf * per + ciclo * per * 1.35 > t1) return null;
    const ph = (loc % (per * 1.35)) / per;
    if (ph <= 1) return <Onda key={i} x0={r.x0} y0={r.y0} x1={r.x1} y1={r.y1} a={Math.max(0, ph - 0.32)} b={ph} fase={-T * 10} color={r.color || color} ancho={ancho} />;
    return <Destello key={i} x={r.x1} y={r.y1} q={(ph - 1) / 0.35} color={r.golpe || KC.yellow} />;
  })}</g>;
}
// Ondas de calor que suben.
function Calor({ T, x, y, f = 1, s = 1 }) {
  if (f <= 0) return null;
  return <g opacity={f}>{[-28, 0, 28].map((dx, i) => { const sube = ((T * 0.9 + i * 0.33) % 1);
    return <Onda key={i} x0={x + dx * s} y0={y - 20 * s - sube * 60 * s} x1={x + dx * s} y1={y - 110 * s - sube * 60 * s} amp={8 * s} lon={34 * s} fase={T * 8 + i} color={CALOR} ancho={7 * s} punta={false} o={1 - sube * 0.7} />; })}</g>;
}
function Sol({ T, x, y, r = 85, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 12})`} opacity={o}>
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${r + 14} -12 L ${r + 56 + (i % 2) * 18} 0 L ${r + 14} 12 Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" transform={`rotate(${i * 30})`} />)}
    <circle r={r} fill="#ffcf1a" stroke={KC.ink} strokeWidth={9} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.25} fill="#fff" opacity={0.45} />
  </g>;
}
// Antebrazo horizontal (sale por la izquierda) con la mano a la derecha. crema = fracción untada; grosor = espesor de la capa.
function Brazo({ y = 1030, crema = 0, grosor = 26, fin = 880 }) {
  const top = y - 110, x0 = 40;
  return <g>
    <path d={`M -60 ${top} L 860 ${top - 6} Q 930 ${top - 10} 980 ${top + 20} L 1060 ${top + 40} Q 1100 ${top + 70} 1060 ${top + 100} L 990 ${top + 110} Q 1070 ${top + 140} 1040 ${top + 190} L 900 ${y + 112} L -60 ${y + 110} Z`} fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M 120 ${y + 60} Q 400 ${y + 80} 760 ${y + 62}`} stroke={PIEL2} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} />
    {[[220, -60], [380, -40], [560, -66], [700, -46]].map(([vx, vy], i) => <path key={i} d={`M ${vx} ${y + vy} q 8 -14 16 -2`} stroke={PIEL2} strokeWidth={4} fill="none" />)}
    {crema > 0 && <g>
      <rect x={x0} y={top - grosor + 4} width={(fin - x0) * crema} height={grosor + 4} rx={grosor / 2} fill={CREMA} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: Math.floor(crema * 9) }, (_, i) => <path key={i} d={`M ${x0 + 40 + i * 90} ${top - grosor * 0.45} q 24 -8 48 0`} stroke="#d9d2c5" strokeWidth={4} fill="none" strokeLinecap="round" />)}
    </g>}
  </g>;
}
function Dedo({ x, y, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-34} y={-240} width={68} height={250} rx={34} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -20 -14 Q 0 -44 20 -14" fill="#ffd9c7" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={6} rx={44} ry={14} fill={CREMA} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Espejo({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-14} y={70} width={28} height={110} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <ellipse rx={92} ry={112} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={72} ry={92} fill="#bfe8ff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -50 L 10 -80 M -46 -16 L 30 -62" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
  </g>;
}
function Esponja({ T = 0, x, y, s = 1, o = 1, brillo = 0 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + Math.sin(T * 5) * 0.03 * brillo)})`} opacity={o}>
    {brillo > 0 && <circle r={150} fill={KC.yellow} opacity={0.35 * brillo} />}
    <rect x={-110} y={-70} width={220} height={140} rx={26} fill="#ffd23f" stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={-70} width={220} height={36} rx={18} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />
    {[[-60, 10, 14], [-10, 30, 10], [40, 0, 16], [70, 40, 9], [-80, 46, 8], [10, -2, 8]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#d9a400" />)}
  </g>;
}
// Hexágono (anillo de benceno, esquemático).
const hexD = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => `${k ? 'L' : 'M'} ${(cx + r * Math.cos(k * Math.PI / 3)).toFixed(1)} ${(cy + r * Math.sin(k * Math.PI / 3)).toFixed(1)}`).join(' ') + ' Z';
function AtomoQ({ x, y, l, c }) { return <g><circle cx={x} cy={y} r={20} fill={c} stroke={KC.ink} strokeWidth={4} /><text x={x} y={y + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={l === 'N' ? '#fff' : KC.ink}>{l}</text></g>; }
// Filtros orgánicos esquemáticos. brillo 0..1 = cargado de energía (vibra).
function MolFiltro({ T, x, y, s = 1, tipo = 'avo', brillo = 0, rot = 0, o = 1 }) {
  if (o <= 0) return null;
  const vib = brillo * Math.sin(T * 60) * 5, L = '#e8f6ff';
  const sk = { stroke: L, strokeWidth: 8, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round' };
  return <g transform={`translate(${x + vib} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle r={190} fill={KC.yellow} opacity={0.28 * brillo} />}
    {brillo > 0 && <circle r={130} fill={KC.yellow} opacity={0.25 * brillo} />}
    {tipo === 'avo' ? <g>
      <path d={hexD(-140, 0, 52)} {...sk} /><circle cx={-140} cy={0} r={26} {...sk} strokeWidth={5} />
      <path d={hexD(140, 0, 52)} {...sk} /><circle cx={140} cy={0} r={26} {...sk} strokeWidth={5} />
      <path d="M -88 0 L -46 -24 L 0 0 L 46 -24 L 88 0" {...sk} />
      <path d="M -46 -24 L -46 -64 M 46 -24 L 46 -64" {...sk} />
      <path d="M -192 0 L -232 0 M -232 0 L -256 -30 M -232 0 L -256 30 M -232 0 L -232 -36" {...sk} />
      <path d="M 192 0 L 226 0" {...sk} />
      <AtomoQ x={-46} y={-80} l="O" c={QA.O} /><AtomoQ x={46} y={-80} l="O" c={QA.O} /><AtomoQ x={242} y={0} l="O" c={QA.O} />
    </g> : <g>
      <path d={hexD(-120, -70, 50)} {...sk} /><circle cx={-120} cy={-70} r={25} {...sk} strokeWidth={5} />
      <path d={hexD(-120, 80, 50)} {...sk} /><circle cx={-120} cy={80} r={25} {...sk} strokeWidth={5} />
      <path d="M -95 -27 L -40 0 L -95 37" {...sk} />
      <path d="M -40 0 L 40 0 M -40 -12 L 40 -12" {...sk} />
      <path d="M 40 -6 L 90 -50 M 40 -6 L 100 30 L 100 76 M 100 30 L 150 10 L 200 36 L 250 10" {...sk} />
      <AtomoQ x={104} y={-62} l="N" c={QA.N} /><AtomoQ x={100} y={92} l="O" c={QA.O} /><AtomoQ x={150} y={10} l="O" c={QA.O} />
    </g>}
  </g>;
}
// Partícula mineral (racimo de esferitas blancas).
function Mineral({ x, y, s = 1, seed = 4, o = 1, color = '#f6f3ec' }) {
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{Array.from({ length: 9 }, (_, i) => { const a = R() * 6.28, d = R() * 50;
    return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={22 + R() * 14} fill={color} stroke="#7d7a86" strokeWidth={5} />; })}</g>;
}
function Personita2({ x, y, s = 1, o = 1, color }) { return <Personita x={x} y={y} s={s} o={o} color={color} />; }

function Protector() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Fi: CUES.Filtros, Ab: CUES.Absorbe, Ca: CUES.Calor, Pr: CUES.Pregunta, Es: CUES.Esfera, Fp: CUES.FPS, La: CUES.Lab, Pl: CUES.Playa, Me: CUES.Menos, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // 0 · el dedo unta la crema
  const unta = kprog(T, K.G, K.G + 2.2, kEase.suave), CF = 40 + 840 * unta;
  const raysG = [150, 280, 410, 540, 670, 800].map((x1) => ({ x0: 430, y0: 450, x1, y1: x1 <= CF ? 894 : 920, golpe: x1 <= CF ? KC.yellow : KC.red }));
  // 1–3 · moléculas
  const AVO = [330, 830], OCT = [740, 900];
  const golpeO = K.Ab + 0.9, golpeA = K.Ab + 2.3;
  const brO = kprog(T, golpeO, golpeO + 0.2) * (1 - kprog(T, K.Ca + 0.2, K.Ca + 1.6)) + (T > K.Ca + 2.6 ? kprog(T, K.Ca + 2.6, K.Ca + 2.75) * (1 - kprog(T, K.Ca + 2.9, K.Ca + 3.8)) : 0);
  const brA = kprog(T, golpeA, golpeA + 0.2) * (1 - kprog(T, K.Ca + 0.4, K.Ca + 1.8));
  // 5 · esfera integradora: 20 rayos, ~1 rebota, 2 pasan, el resto se apaga
  const SX = 620, SY = 920, SR = 280, MY = 905;
  const esf = Array.from({ length: 20 }, (_, i) => ({ t: K.Es + 3.6 + i * 0.17, tipo: i === 6 ? 'rebota' : (i === 11 || i === 17) ? 'pasa' : 'abs', dx: ((i * 37) % 9 - 4) * 22 }));
  // 6 · rejilla de 100 rayos UVB
  const pasan = [23, 58, 86];
  // 9 · comparación
  const rayCmp = (y0, y1, xs, color) => xs.map((x, i) => ({ x0: x, y0, x1: x, y1, color, golpe: color }));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu brazo, la crema y el sol */}
      <Escena T={T} a={K.G} b={K.Fi} zoom={0.12} origen="45% 48%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Sol T={T} x={430} y={450} />
          <Brazo crema={unta} />
          <Lluvia T={T} t0={K.G + 0.15} rayos={raysG} per={0.8} />
          <Dedo x={CF} y={894} o={1 - kprog(T, K.G + 2.3, K.G + 2.7)} />
          <Espejo x={170} y={720} s={0.9} o={kprog(T, K.G + 0.9, K.G + 1.2) * (1 - kprog(T, K.G + 3.0, K.G + 3.3))} />
          <Marca x={250} y={640} ok={false} s={0.7} o={kprog(T, K.G + 2.3, K.G + 2.6) * (1 - kprog(T, K.G + 3.0, K.G + 3.3))} />
          <Esponja T={T} x={180} y={720} s={0.8} o={kprog(T, K.G + 3.3, K.G + 3.7)} brillo={kprog(T, K.G + 3.6, K.G + 4.2)} />
          {T > K.G + 3.6 && [0, 1, 2].map((i) => { const q = ((T - K.G - 3.6) * 0.9 + i / 3) % 1; return <Onda key={i} x0={380} y0={500} x1={200} y1={700} a={Math.max(0, q - 0.3)} b={q} fase={-T * 10} color={UV} ancho={7} />; })}
          <g transform="translate(70 1196)"><line x1={0} y1={0} x2={180} y2={0} stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={-14} x2={0} y2={14} stroke={KC.ink} strokeWidth={8} /><line x1={180} y1={-14} x2={180} y2={14} stroke={KC.ink} strokeWidth={8} />
            <text x={90} y={-18} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>5 cm</text></g>
        </SvgCapa>
      </Escena>

      {/* 1–3 · por dentro de la capa: filtros que se tragan el UV y lo sueltan como calor */}
      <Escena T={T} a={K.Fi} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={560} width={KW} height={500} fill="rgba(255,250,240,.10)" />
          <line x1={0} y1={560} x2={KW} y2={560} stroke="rgba(255,250,240,.5)" strokeWidth={4} strokeDasharray="18 14" />
          {Array.from({ length: 14 }, (_, i) => { const R = krng(30 + i); const x = R() * KW, y = 600 + R() * 420; return <circle key={i} cx={(x + T * 14) % KW} cy={y + Math.sin(T + i) * 8} r={10 + R() * 16} fill="rgba(255,250,240,.16)" />; })}
          {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={70 + i * 135} cy={1140} rx={62} ry={44} fill={mixHex('#f2a0a8', '#f2a0a8', 0)} stroke={KC.ink} strokeWidth={5} />)}
          {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={70 + i * 135} cy={1140} r={14} fill="#a8456a" />)}
          <MolFiltro T={T} x={AVO[0]} y={AVO[1]} s={0.85} tipo="avo" rot={Math.sin(T * 0.8) * 6} brillo={brA} o={kprog(T, K.Fi + 0.3, K.Fi + 0.7)} />
          <MolFiltro T={T} x={OCT[0]} y={OCT[1]} s={0.85} tipo="oct" rot={Math.sin(T * 0.7 + 1) * 6} brillo={brO} o={kprog(T, K.Fi + 1.4, K.Fi + 1.8)} />
          <text x={AVO[0]} y={AVO[1] + 120} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.gold2} opacity={kprog(T, K.Fi + 0.6, K.Fi + 1.0)}>avobenzona</text>
          <text x={OCT[0]} y={OCT[1] + 150} textAnchor="middle" style={{ font:`700 38px ${KF.mono}` }} fill={KC.gold2} opacity={kprog(T, K.Fi + 1.7, K.Fi + 2.1)}>octocrileno</text>
          {/* rayos que llegan y se apagan */}
          <Onda x0={OCT[0] + 40} y0={300} x1={OCT[0]} y1={OCT[1] - 40} a={Math.max(0, kprog(T, K.Ab + 0.2, golpeO) - 0.4)} b={kprog(T, K.Ab + 0.2, golpeO)} o={1 - kprog(T, golpeO, golpeO + 0.05)} fase={-T * 10} />
          <Onda x0={AVO[0] - 30} y0={300} x1={AVO[0]} y1={AVO[1] - 40} a={Math.max(0, kprog(T, K.Ab + 1.6, golpeA) - 0.4)} b={kprog(T, K.Ab + 1.6, golpeA)} o={1 - kprog(T, golpeA, golpeA + 0.05)} fase={-T * 10} />
          <Destello x={OCT[0]} y={OCT[1] - 40} q={kprog(T, golpeO, golpeO + 0.5)} r={110} />
          <Destello x={AVO[0]} y={AVO[1] - 40} q={kprog(T, golpeA, golpeA + 0.5)} r={110} />
          {/* medidores de energía */}
          {[[OCT, brO], [AVO, brA]].map(([[mx, my], b], i) => T > K.Ab && T < K.Pr ? <g key={i} transform={`translate(${mx + (i ? -250 : 230)} ${my - 60})`}>
            <rect x={-16} y={-90} width={32} height={180} rx={10} fill="rgba(255,255,255,.12)" stroke={L_(0)} strokeWidth={4} />
            <rect x={-12} y={86 - 172 * b} width={24} height={172 * b} rx={8} fill={KC.yellow} />
            <text x={0} y={-104} textAnchor="middle" style={{ font:'26px sans-serif' }}>⚡</text></g> : null)}
          {/* calor */}
          <Calor T={T} x={OCT[0]} y={OCT[1] - 120} f={kprog(T, K.Ca, K.Ca + 0.4) * (1 - kprog(T, K.Pr - 0.4, K.Pr))} />
          <Calor T={T} x={AVO[0]} y={AVO[1] - 110} f={kprog(T, K.Ca + 0.2, K.Ca + 0.6) * (1 - kprog(T, K.Pr - 0.4, K.Pr))} />
          {/* el siguiente rayo: también se lo traga */}
          <Onda x0={OCT[0] - 60} y0={300} x1={OCT[0]} y1={OCT[1] - 40} a={Math.max(0, kprog(T, K.Ca + 1.9, K.Ca + 2.6) - 0.4)} b={kprog(T, K.Ca + 1.9, K.Ca + 2.6)} o={1 - kprog(T, K.Ca + 2.6, K.Ca + 2.65)} fase={-T * 10} />
          <text x={60} y={1236} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} opacity={0.85}>tu piel</text>
          <text x={1020} y={600} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} opacity={0.75}>capa de crema</text>
        </SvgCapa>
      </Escena>

      {/* 4 · ¿y los minerales? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Espejo x={250} y={600} s={1.05} o={kprog(T, K.Pr + 1.6, K.Pr + 2.0)} />
          <text x={440} y={640} textAnchor="middle" style={{ font:`400 230px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} paintOrder="stroke" opacity={kprog(T, K.Pr + 2.0, K.Pr + 2.3)} transform={`rotate(${Math.sin(T * 3) * 8} 440 560)`}>?</text>
          <Mineral x={170} y={990} s={kprog(T, K.Pr + 0.1, K.Pr + 0.5, kEase.rebote)} seed={4} />
          <Mineral x={400} y={1000} s={kprog(T, K.Pr + 0.6, K.Pr + 1.0, kEase.rebote)} seed={9} color="#ffffff" />
          <text x={170} y={1135} textAnchor="middle" style={{ font:`700 46px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Pr + 0.3, K.Pr + 0.6)}>ZnO</text>
          <text x={400} y={1135} textAnchor="middle" style={{ font:`700 46px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Pr + 0.8, K.Pr + 1.1)}>TiO₂</text>
        </SvgCapa>
      </Escena>

      {/* 5 · 2016, Nueva Jersey: la esfera integradora */}
      <Escena T={T} a={K.Es} b={K.Fp} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <circle cx={SX} cy={SY} r={SR + 14} fill="#e9e4f7" stroke={KC.ink} strokeWidth={10} />
          <circle cx={SX} cy={SY} r={SR - 10} fill="#fbfaff" />
          <circle cx={SX - 90} cy={SY - 100} r={120} fill="#fff" opacity={0.8} />
          <rect x={SX - 40} y={SY - SR - 90} width={80} height={110} fill="#e9e4f7" stroke={KC.ink} strokeWidth={8} />
          <rect x={SX - 26} y={SY - SR - 92} width={52} height={120} fill="#fbfaff" />
          <rect x={SX - 130} y={MY} width={260} height={30} rx={8} fill="#cfc8e0" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={SX - 112 + i * 25} cy={MY + 15} r={11} fill="#fff" stroke="#7d7a86" strokeWidth={3} />)}
          <text x={SX} y={MY + 80} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>muestra: ZnO / TiO₂</text>
          {esf.map((r, i) => { const x = SX + r.dx, y0 = SY - SR - 140;
            const lleg = kprog(T, r.t, r.t + 0.45);
            if (T < r.t) return null;
            if (lleg < 1) return <Onda key={i} x0={x} y0={y0} x1={x} y1={MY} a={Math.max(0, lleg - 0.35)} b={lleg} fase={-T * 10} ancho={8} />;
            const q = kprog(T, r.t + 0.45, r.t + 0.95);
            if (r.tipo === 'abs') return <Destello key={i} x={x} y={MY} q={q} r={40} />;
            if (r.tipo === 'pasa') return <g key={i}><Onda x0={x} y0={MY + 30} x1={x} y1={SY + SR - 20} a={Math.max(0, q - 0.4)} b={q} color={UV} ancho={8} fase={-T * 10} /><Destello x={x} y={SY + SR - 20} q={kprog(T, r.t + 0.95, r.t + 1.4)} r={30} color={UV} /></g>;
            return <g key={i}><Onda x0={x} y0={MY} x1={SX + 230} y1={SY - 180} a={Math.max(0, q - 0.4)} b={q} color={KC.yellow} ancho={9} fase={-T * 10} /><Destello x={SX + 230} y={SY - 180} q={kprog(T, r.t + 0.95, r.t + 1.5)} r={50} color={KC.yellow} /></g>; })}
        </SvgCapa>
        {T > K.Es + 3.8 && <div style={{ position:'absolute', left:150, top:1440, width:780, zIndex:41 }}>
          {[['reflejado (rebota): 4–5 %', 0.05, KC.yellow, 0], ['absorbido', 0.86, '#6b3fd6', 0.4]].map(([t, v, c, d], i) => { const p = kprog(T, K.Es + 4.0 + d, K.Es + 5.0 + d, kEase.sale);
            return <div key={i} style={{ marginBottom:16, opacity:kprog(T, K.Es + 3.8 + d, K.Es + 4.1 + d) }}>
              <div style={{ font:`700 32px ${KF.mono}`, color:KC.ink, marginBottom:6 }}>{t}</div>
              <div style={{ height:40, width:780, background:'rgba(255,255,255,.55)', border:`5px solid ${KC.ink}`, borderRadius:12 }}><div style={{ height:'100%', width:`${v * p * 100}%`, background:c, borderRadius:7 }}></div></div>
            </div>; })}
        </div>}
      </Escena>

      {/* 6 · FPS 30: 97 de cada 100 */}
      <Escena T={T} a={K.Fp} b={K.La} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Botella x={210} y={930} s={1.0} color="#ffffff" tapa={KC.orange} liquido="#fff1c9" etiqueta="FPS 30" etqColor={KC.yellow} inclina={Math.sin(T * 2) * 3} />
          <text x={400} y={690} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>100 rayos UVB</text>
          {Array.from({ length: 100 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), x = 430 + c * 56, y = 740 + r * 48;
            const ap = kprog(T, K.Fp + 0.3 + i * 0.006, K.Fp + 0.5 + i * 0.006); const pasa = pasan.includes(i);
            const abs = pasa ? 0 : kprog(T, K.Fp + 1.4 + i * 0.018, K.Fp + 1.6 + i * 0.018);
            if (ap <= 0) return null;
            if (pasa && T > K.Fp + 3.3) return <g key={i}><circle cx={x} cy={y} r={26} fill={KC.red} opacity={0.35 + 0.25 * Math.sin(T * 8)} /><path d={`M ${x} ${y - 18} L ${x} ${y + 10} M ${x - 10} ${y + 2} L ${x} ${y + 16} L ${x + 10} ${y + 2}`} stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
            return abs < 1 ? <path key={i} d={`M ${x} ${y - 18} L ${x} ${y + 10} M ${x - 10} ${y + 2} L ${x} ${y + 16} L ${x + 10} ${y + 2}`} stroke={UVB} strokeWidth={6} fill="none" strokeLinecap="round" opacity={ap * (1 - abs)} />
              : <circle key={i} cx={x} cy={y} r={9} fill={CREMA} stroke={KC.ink} strokeWidth={3} />; })}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Fp + 2.2} until={K.La - 0.2} valor={97} dur={1.2} sufijo=" %" etiqueta="de los rayos UVB, filtrados" y={1560} tam={150} color={KC.yellow} />
      </Escena>

      {/* 7 · en laboratorio: 2 mg por cada cm² */}
      <Escena T={T} a={K.La} b={K.Pl} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {(() => { const capa = kprog(T, K.La + 2.9, K.La + 4.0, kEase.suave), cae = kprog(T, K.La + 2.2, K.La + 2.9, kEase.suave), mg = kprog(T, K.La + 0.8, K.La + 2.0);
            return <g>
              <rect x={300} y={720} width={460} height={460} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
              {[[360, 800], [520, 900], [660, 780], [420, 1060], [640, 1080]].map(([px, py], i) => <circle key={i} cx={px} cy={py} r={5} fill={PIEL2} />)}
              {capa > 0 && <g>
                <rect x={300} y={720 - 50 * capa} width={460} height={50 * capa + 8} fill={CREMA} stroke={KC.ink} strokeWidth={6} />
                <path d={`M 300 ${720 - 50 * capa} L 340 ${690 - 50 * capa} L 800 ${690 - 50 * capa} L 760 ${720 - 50 * capa} Z`} fill="#fffef8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
                <path d={`M 760 ${720 - 50 * capa} L 800 ${690 - 50 * capa} L 800 ${698} L 760 ${728} Z`} fill="#efe6d4" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
              </g>}
              {cae > 0 && cae < 1 && <ellipse cx={530} cy={klerp(560, 700, cae)} rx={50} ry={38} fill={CREMA} stroke={KC.ink} strokeWidth={6} />}
              {/* reglas de 1 cm */}
              <g><line x1={300} y1={1215} x2={760} y2={1215} stroke={KC.ink} strokeWidth={7} />
                {Array.from({ length: 11 }, (_, i) => <line key={i} x1={300 + i * 46} y1={1215} x2={300 + i * 46} y2={1215 - (i % 5 ? 14 : 26)} stroke={KC.ink} strokeWidth={5} />)}
                <text x={790} y={1226} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>1 cm</text></g>
              <g><line x1={262} y1={720} x2={262} y2={1180} stroke={KC.ink} strokeWidth={7} />
                {Array.from({ length: 11 }, (_, i) => <line key={i} x1={262} y1={720 + i * 46} x2={262 + (i % 5 ? 14 : 26)} y2={720 + i * 46} stroke={KC.ink} strokeWidth={5} />)}</g>
              {/* báscula */}
              <g transform="translate(830 480)">
                <rect x={-140} y={-20} width={280} height={150} rx={22} fill="#f6f3ec" stroke={KC.ink} strokeWidth={8} />
                <rect x={-160} y={-44} width={320} height={30} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
                <rect x={-110} y={20} width={220} height={74} rx={10} fill="#16302a" stroke={KC.ink} strokeWidth={5} />
                <text x={0} y={76} textAnchor="middle" style={{ font:`700 50px ${KF.mono}` }} fill="#5cff9d">{(2 * mg).toFixed(1)} mg</text>
                {cae <= 0 && mg > 0 && <ellipse cx={0} cy={-62} rx={50 * mg} ry={30 * mg} fill={CREMA} stroke={KC.ink} strokeWidth={5} />}
              </g>
              {cae > 0 && cae < 1 && <path d={`M 830 420 Q 700 ${380} 560 ${klerp(560, 680, cae)}`} stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" fill="none" opacity={1 - cae} />}
            </g>; })()}
        </SvgCapa>
      </Escena>

      {/* 8 · 1992: investigadores de Copenhague midieron a 42 personas en una playa */}
      <Escena T={T} a={K.Pl} b={K.Me} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(${KC.cyan} 0 760px, #2a7fff 760px 860px, #ffd977 860px)` }}></div>
        <SvgCapa>
          <Sol T={T} x={560} y={420} r={60} />
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${i * 200 - 40 + (T * 30) % 200} 800 q 50 -24 100 0`} stroke="#bfe8ff" strokeWidth={6} fill="none" />)}
          {Array.from({ length: 42 }, (_, i) => { const c = i % 7, r = Math.floor(i / 7), on = kprog(T, K.Pl + 0.8 + i * 0.05, K.Pl + 1.0 + i * 0.05, kEase.rebote), fuera = 1 - kprog(T, K.Pl + 3.4, K.Pl + 3.8);
            return on > 0 ? <Personita key={i} x={110 + c * 80} y={930 + r * 50} s={0.9 * on} o={fuera} color={[KC.pink, KC.orange, KC.mint, KC.lilac, KC.cyan][i % 5]} /> : null; })}
          {(() => { const o2 = kprog(T, K.Pl + 3.6, K.Pl + 4.1), pie = kprog(T, K.Pl + 4.3, K.Pl + 5.2, kEase.sale);
            if (o2 <= 0) return null;
            const ang = pie * Math.PI / 2;
            return <g opacity={o2}>
              <rect x={150} y={900} width={320} height={300} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
              <rect x={150} y={888} width={320} height={16} fill={CREMA} stroke={KC.ink} strokeWidth={5} />
              <text x={310} y={870} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>0.5 mg / cm²</text>
              <circle cx={790} cy={1050} r={140} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={8} />
              <path d={`M 790 1050 L 790 910 A 140 140 0 0 1 ${790 + 140 * Math.sin(ang)} ${1050 - 140 * Math.cos(ang)} Z`} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
              <text x={790} y={880} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>¼</text>
            </g>; })()}
        </SvgCapa>
        <div style={{ position:'absolute', left:850, top:1030, transform:'translate(-50%,-50%)', zIndex:41, textAlign:'center', opacity:kprog(T, K.Pl + 0.8, K.Pl + 1.1) * (1 - kprog(T, K.Pl + 3.4, K.Pl + 3.8)) }}>
          <div style={{ font:`400 150px/1 ${KF.titulo}`, color:KC.texto, WebkitTextStroke:`5px ${KC.ink}` }}>{Math.min(42, Math.max(0, Math.floor((T - K.Pl - 0.8) / 0.05) + 1))}</div>
          <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink }}>personas</div>
        </div>
      </Escena>

      {/* 9 · con menos crema, menos protección */}
      <Escena T={T} a={K.Me} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {[[420, 44, '2 mg / cm²', false], [810, 12, '0.5 mg / cm²', true]].map(([y, gr, t, delgada], i) => {
            const enrojece = delgada ? kprog(T, K.Me + 1.2, K.Me + 3.5) : 0;
            const xs = [110, 210, 310, 410];
            const ray = xs.map((x, j) => { const pasa = delgada && j % 2 === 0; return { x0: x, y0: y + 30, x1: x, y1: pasa ? y + 230 : y + 196 - gr, color: UV, golpe: pasa ? KC.red : KC.yellow }; });
            return <g key={i}>
              <rect x={50} y={y} width={440} height={330} rx={24} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} />
              <rect x={70} y={y + 200} width={400} height={110} fill={mixHex(PIEL, '#ff5a5a', enrojece * 0.6)} stroke={KC.ink} strokeWidth={6} />
              <rect x={70} y={y + 200 - gr} width={400} height={gr + 4} fill={CREMA} stroke={KC.ink} strokeWidth={5} />
              <Lluvia T={T} t0={K.Me + 0.3 + i * 0.2} rayos={ray} per={0.7} desf={0.3} ancho={7} />
              <text x={270} y={y + 290} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text>
            </g>; })}
          <g transform={`translate(360 870) rotate(${Math.sin(T * 22) * 4 * kprog(T, K.Me + 1.5, K.Me + 1.8)})`}>
            <rect x={-110} y={-36} width={220} height={60} rx={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={10} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>FPS 30 ¿?</text>
          </g>
        </SvgCapa>
      </Escena>

      {/* 10 · cierre: el mismo brazo, ahora con la capa completa (esponja) */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Sol T={T} x={430} y={450} />
          <Brazo crema={1} grosor={42} />
          <Lluvia T={T} t0={K.Ci + 0.1} rayos={[150, 280, 410, 540, 670, 800].map((x1) => ({ x0: 430, y0: 450, x1, y1: 880 }))} per={0.8} />
          {[200, 450, 700].map((x, i) => <Calor key={i} T={T} x={x} y={870} f={kprog(T, K.Ci + 0.9 + i * 0.2, K.Ci + 1.3 + i * 0.2)} s={0.8} />)}
          <Esponja T={T} x={180} y={720} s={0.8} o={kprog(T, K.Ci + 1.0, K.Ci + 1.4)} brillo={1} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.4} until={K.G + 3.3} texto="un espejo que rebota el sol" y={1500} tam={42} />
      <Chip T={T} at={K.G + 3.5} until={K.Fi - 0.2} texto="una esponja de luz UV" y={1500} tam={44} borde={UV} />
      <Chip T={T} at={K.Fi + 0.4} until={K.Ab - 0.2} texto="filtros orgánicos" y={1500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Ab + 1.0} until={K.Ca - 0.2} texto="absorben el UV → energía" y={1500} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Pr - 0.2} texto="energía → un poquito de calor" y={1500} tam={40} borde={CALOR} />
      <Chip T={T} at={K.Pr + 0.3} until={K.Es - 0.2} texto="óxido de zinc · dióxido de titanio" y={1500} tam={36} borde={KC.texto} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.3} anio="2016" quien="Cole, Shyr y Ou-Yang" revista="Nueva Jersey, EUA · esfera integradora" y={1590} />
      <MitoTachado T={T} at={K.Es + 3.7} tacharEn={K.Es + 5.0} until={K.Fp - 0.2} texto="minerales = espejitos" y={1700} tam={40} />
      <Chip T={T} at={K.La + 3.6} until={K.Pl - 0.2} texto="así se mide la etiqueta (FDA)" y={1500} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.La + 0.6} until={K.La + 3.4} texto="2 mg en cada cm² de piel" y={1500} tam={42} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Pl + 0.2} until={K.Pl + 3.1} anio="1992" quien="Bech-Thomsen y Wulf" revista="investigadores de Copenhague, Dinamarca" y={1590} />
      <Chip T={T} at={K.Pl + 3.9} until={K.Me - 0.2} texto="¼ de lo del laboratorio" y={1500} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.Me + 0.6} until={K.Ci - 0.2} texto="menos crema = menos protección" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="absorbe UV → lo suelta como calor" y={1500} tam={38} borde={UV} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Fi - 0.1} texto="No es espejo: *es esponja.*" />
      <Subtitulo T={T} idx={1} at={K.Fi + 0.1} until={K.Ab - 0.1} texto="Trae *filtros* moleculares." />
      <Subtitulo T={T} idx={2} at={K.Ab + 0.1} until={K.Ca - 0.1} texto="Se tragan *el rayo UV.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Pr - 0.1} texto="Lo sueltan *como calor.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Zinc y titanio: *espejitos?*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Fp - 0.1} texto="Solo reflejan *4 a 5 %.*" />
      <Subtitulo T={T} idx={6} at={K.Fp + 0.1} until={K.La - 0.1} texto="FPS 30: *filtra 97 %.*" />
      <Subtitulo T={T} idx={7} at={K.La + 0.1} until={K.Pl - 0.1} texto="En laboratorio: *2 mg/cm².*" />
      <Subtitulo T={T} idx={8} at={K.Pl + 0.1} until={K.Me - 0.1} texto="Playa: *la cuarta parte.*" />
      <Subtitulo T={T} idx={9} at={K.Me + 0.1} until={K.Ci - 0.1} texto="Con menos: *protege menos.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Esponja: *ponle suficiente.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Filtros + 0.5, CUES.Calor - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Calor + 0.6, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Esfera + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Esfera + 1.0, CUES.FPS - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.FPS + 0.8, CUES.Lab - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Lab + 1.0, CUES.Playa - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Playa + 0.3, CUES.Menos - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Menos + 0.05, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="30" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function L_() { return 'rgba(232,246,255,.6)'; }

function ProtectorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Protector /></CompositionStage></div>;
}
window.ProtectorApp = ProtectorApp;
