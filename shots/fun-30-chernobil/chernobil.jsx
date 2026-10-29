// Shot Fungi Mati #30 · Esa mancha negra no es hollín: los hongos de Chernóbil — NARRADO (gancho 1 "Esto no es X: es Y", N1 Por dentro + tramo N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CH = { concreto:'#b9b4aa', concreto2:'#9c968b', grieta:'#6f6a61', negro:'#16110d', negro2:'#2c2620', oliva:'#3a3a2a', agar:'#f5e7b8', piel:'#e0a57c', piel2:'#b9774f', mela:'#4a2a14' };

// Mancha negra de hongo (colonia melanizada) sobre una superficie: muchos grumos oscuros con borde afelpado.
function Mancha({ T, x, y, r = 160, crece = 1, seed = 7, armadura = 0 }) {
  if (crece <= 0) return null;
  const g = krng(seed), R = r * crece;
  const grumos = Array.from({ length: 46 }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 0.85; return [Math.cos(a) * d, Math.sin(a) * d * 0.8, 0.18 + g() * 0.22, g()]; });
  const pelos = Array.from({ length: 70 }, () => { const a = g() * Math.PI * 2, d = 0.7 + g() * 0.3; return [a, d, 0.08 + g() * 0.1]; });
  return <g transform={`translate(${x} ${y})`}>
    {armadura > 0 && <ellipse rx={R * 1.12} ry={R * 0.95} fill="none" stroke={KC.gold2} strokeWidth={10 + 6 * Math.sin(T * 5)} opacity={armadura * 0.85} />}
    {pelos.map(([a, d, l], i) => <line key={'p' + i} x1={Math.cos(a) * R * d} y1={Math.sin(a) * R * d * 0.8} x2={Math.cos(a) * R * (d + l)} y2={Math.sin(a) * R * (d + l) * 0.8} stroke={CH.negro2} strokeWidth={3} strokeLinecap="round" opacity=".8" />)}
    {grumos.map(([gx, gy, gr, c], i) => <circle key={i} cx={gx * R} cy={gy * R} r={gr * R} fill={c < 0.5 ? CH.negro : CH.negro2} />)}
    {grumos.slice(0, 12).map(([gx, gy, gr], i) => <circle key={'b' + i} cx={gx * R - gr * R * 0.3} cy={gy * R - gr * R * 0.3} r={gr * R * 0.25} fill="#4d463c" opacity=".7" />)}
    {armadura > 0 && grumos.slice(0, 18).map(([gx, gy], i) => <circle key={'a' + i} cx={gx * R} cy={gy * R} r={5} fill={KC.gold2} opacity={armadura * (0.5 + 0.5 * Math.sin(T * 6 + i))} />)}
  </g>;
}
// Pared de concreto con juntas y grietas.
function Muro({ x = 60, y = 420, w = 960, h = 680 }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={12} fill={CH.concreto} stroke={KC.ink} strokeWidth={9} />
    {[1, 2].map((i) => <line key={i} x1={x} y1={y + (h / 3) * i} x2={x + w} y2={y + (h / 3) * i} stroke={CH.concreto2} strokeWidth={6} />)}
    {[0, 1, 2].map((f) => [0, 1, 2].map((c) => <line key={f + '-' + c} x1={x + w / 3 * c + (f % 2) * w / 6} y1={y + h / 3 * f} x2={x + w / 3 * c + (f % 2) * w / 6} y2={y + h / 3 * (f + 1)} stroke={CH.concreto2} strokeWidth={6} />))}
    <path d={`M ${x + 120} ${y + 40} l 30 60 l -20 40 l 40 70`} stroke={CH.grieta} strokeWidth={5} fill="none" />
    <path d={`M ${x + w - 160} ${y + h - 60} l -40 -50 l 20 -40`} stroke={CH.grieta} strokeWidth={5} fill="none" />
  </g>;
}
// Símbolo de radiación (trébol).
function Trebol({ x, y, r = 60, rot = 0, fondo = KC.yellow }) {
  const hoja = (a) => { const a1 = (a - 30) * Math.PI / 180, a2 = (a + 30) * Math.PI / 180, ri = r * 0.28, re = r * 0.92;
    return `M ${Math.cos(a1) * ri} ${Math.sin(a1) * ri} L ${Math.cos(a1) * re} ${Math.sin(a1) * re} A ${re} ${re} 0 0 1 ${Math.cos(a2) * re} ${Math.sin(a2) * re} L ${Math.cos(a2) * ri} ${Math.sin(a2) * ri} A ${ri} ${ri} 0 0 0 ${Math.cos(a1) * ri} ${Math.sin(a1) * ri} Z`; };
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <circle r={r * 1.18} fill={fondo} stroke={KC.ink} strokeWidth={7} />
    {[-90, 30, 150].map((a) => <path key={a} d={hoja(a)} fill={KC.ink} />)}
    <circle r={r * 0.18} fill={KC.ink} />
  </g>;
}
// Rayo de radiación ondulado que viaja de (x1,y1) a (x2,y2); p = avance 0..1.
function Rayo({ x1, y1, x2, y2, p = 1, color = KC.yellow, fase = 0 }) {
  if (p <= 0) return null;
  const n = 26, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const pts = Array.from({ length: n + 1 }, (_, i) => { const u = (i / n) * p, w = Math.sin(u * L / 22 + fase) * 12; return `${(x1 + dx * u + nx * w).toFixed(1)} ${(y1 + dy * u + ny * w).toFixed(1)}`; });
  return <path d={'M ' + pts.join(' L ')} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />;
}
// El "sarcófago" sobre el reactor 4 (esquemático) con la chimenea de franjas.
function Sarcofago({ x = 540, y = 1150 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={140} y={-640} width={70} height={420} fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={140} y={-640 + i * 84} width={70} height={42} fill={KC.red} stroke={KC.ink} strokeWidth={4} />)}
    <path d="M -420 0 L -420 -260 L -300 -260 L -300 -360 L 120 -360 L 200 -300 L 380 -300 L 420 -180 L 420 0 Z" fill="#8e9298" stroke={KC.ink} strokeWidth={9} />
    {[-360, -240, -120, 0, 120, 240].map((dx, i) => <line key={i} x1={dx} y1={-350 + (i < 1 ? 90 : 0)} x2={dx} y2={-10} stroke="#6d7177" strokeWidth={6} />)}
    <rect x={-460} y={0} width={920} height={30} fill="#6b6f74" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Persona con traje de protección (blanco) y máscara.
function Traje({ x, y, s = 1, paso = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-14} y1={0} x2={-14 - paso * 12} y2={60} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={14} y1={0} x2={14 + paso * 12} y2={60} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <line x1={-14} y1={0} x2={-14 - paso * 12} y2={60} stroke="#f7f7f2" strokeWidth={14} strokeLinecap="round" />
    <line x1={14} y1={0} x2={14 + paso * 12} y2={60} stroke="#f7f7f2" strokeWidth={14} strokeLinecap="round" />
    <path d="M -40 10 Q -44 -90 0 -92 Q 44 -90 40 10 Z" fill="#f7f7f2" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-120} r={32} fill="#f7f7f2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-22} y={-132} width={44} height={22} rx={8} fill="#7fd3ff" stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-100} r={9} fill="#5b6066" stroke={KC.ink} strokeWidth={3} />
    <rect x={30} y={-60} width={30} height={46} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Hifa de Cladosporium (esquemática): tubo con septos, pared gruesa café oscuro con gránulos de melanina,
// y cadenas ramificadas de conidios redondos (sphaerospermum = esporas esféricas).
function Hifa({ T, x = 0, y = 0, s = 1, crece = 1, conidios = 1, seed = 4 }) {
  const g = krng(seed), L = 760 * crece;
  const gran = Array.from({ length: 60 }, () => [g(), g() < 0.5 ? -1 : 1, g()]);
  const ramas = [[0.62, -1], [0.9, 1]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={-50} width={L} height={100} rx={50} fill={CH.mela} stroke={KC.ink} strokeWidth={6} />
    <rect x={18} y={-32} width={Math.max(0, L - 36)} height={64} rx={32} fill="#e9d9b8" />
    {[0.22, 0.44, 0.66, 0.88].filter((u) => u * 760 < L - 40).map((u, i) => <line key={i} x1={u * 760} y1={-32} x2={u * 760} y2={32} stroke={CH.mela} strokeWidth={10} />)}
    {gran.filter(([u]) => u * 760 < L - 20).map(([u, lado, c], i) => <circle key={i} cx={u * 760} cy={lado * (41 + c * 4)} r={4 + c * 3} fill={c < 0.5 ? '#1b0f07' : '#7a4a22'} />)}
    {[0.15, 0.5, 0.78].filter((u) => u * 760 < L - 40).map((u, i) => <circle key={'n' + i} cx={u * 760 + 50} cy={4} r={14} fill="#c9b48e" stroke="#8b7a5a" strokeWidth={3} />)}
    {conidios > 0 && crece >= 1 && ramas.map(([u, lado], k) => <g key={k} transform={`translate(${u * 760} ${lado * 50})`}>
      {Array.from({ length: 4 }, (_, j) => { const on = kclamp(conidios * 5 - j - k * 0.5, 0, 1); return on > 0 ? <circle key={j} cx={j * 40 * 0.6} cy={lado * (40 + j * 74)} r={34 * on} fill="#6b4a2b" stroke={KC.ink} strokeWidth={5} /> : null; })}
    </g>)}
    {conidios > 0 && crece >= 1 && <g transform={`translate(${L} 0)`}>{Array.from({ length: 3 }, (_, j) => { const on = kclamp(conidios * 4 - j - 1, 0, 1); return on > 0 ? <circle key={j} cx={30 + j * 72} cy={-j * 18} r={34 * on} fill="#6b4a2b" stroke={KC.ink} strokeWidth={5} /> : null; })}</g>}
  </g>;
}
// Antebrazo (piel) con gránulos de melanina.
function Brazo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 260 Q -80 40 -50 -150 Q -30 -230 20 -240 Q 80 -235 80 -170 Q 90 40 70 260 Z" fill={CH.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 -230 Q -70 -300 -40 -330 Q -10 -340 0 -300 L 10 -250" fill={CH.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M 20 -240 Q 30 -330 60 -330 Q 85 -320 70 -230" fill={CH.piel} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 22 }, (_, i) => { const g = krng(30 + i); return <circle key={i} cx={-40 + g() * 100} cy={-120 + g() * 340} r={4 + g() * 4} fill={CH.piel2} opacity=".8" />; })}
  </g>;
}
// Hoja de planta.
function Hoja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 140 L 0 60" stroke="#2c7a2c" strokeWidth={12} strokeLinecap="round" />
    <path d="M 0 80 Q -130 -20 0 -170 Q 130 -20 0 80 Z" fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 70 L 0 -140 M 0 -10 L -50 -60 M 0 -50 L 45 -95 M 0 20 L 50 -20" stroke="#2c7a2c" strokeWidth={5} fill="none" />
  </g>;
}
// Estación Espacial (esquemática): armazón, módulos y paneles solares.
function Estacion({ x, y, s = 1 }) {
  const panel = (px, py) => <g transform={`translate(${px} ${py})`}><rect x={-40} y={-150} width={80} height={300} fill="#c88a2a" stroke={KC.ink} strokeWidth={5} />
    {[-100, -50, 0, 50, 100].map((dy) => <line key={dy} x1={-40} y1={dy} x2={40} y2={dy} stroke="#8a5a14" strokeWidth={3} />)}</g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-380} y={-14} width={760} height={28} fill="#d6d9de" stroke={KC.ink} strokeWidth={5} />
    {[-330, -230, 230, 330].map((px) => panel(px, 0))}
    <rect x={-70} y={-110} width={140} height={60} rx={26} fill="#eef0f3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-40} y={14} width={80} height={170} rx={30} fill="#eef0f3" stroke={KC.ink} strokeWidth={5} />
    <rect x={-120} y={70} width={240} height={56} rx={26} fill="#eef0f3" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Caja de Petri con colonia negra que crece (r) — colonia melanizada o albina.
function PetriColonia({ x, y, r = 170, col = 0, albina = false, seed = 2 }) {
  return <Petri x={x} y={y} r={r} medio={CH.agar}>
    {col > 0 && (albina ? <Colonia cx={0} cy={0} r={col} color="#fffaf0" seed={seed} /> : <Mancha x={0} y={0} r={col} seed={seed} />)}
  </Petri>;
}

// Sello rectangular (para palabras largas como HIPÓTESIS).
function SelloRect({ T, at, x, y, texto, color = KC.red, rot = -8 }) {
  if (T < at) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${klerp(2.2, 1, k)})`} opacity={kprog(T, at, at + 0.15)}>
    <rect x={-250} y={-75} width={500} height={150} rx={18} fill="rgba(255,255,255,.85)" stroke={color} strokeWidth={14} />
    <text y={34} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={color}>{texto}</text>
  </g>;
}

function ChernobilShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Reactor, E: CUES.Especies, O: CUES.Oscuros, Pi: CUES.Piel, Pa: CUES.Pared, P: CUES.Pregunta, Es: CUES.Estudio, Cr: CUES.Crecen, Co: CUES.Colonias, H: CUES.Hipotesis, Sp: CUES.Espacio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const lupaEntra = kprog(T, K.G + 0.1, K.G + 0.8, kEase.sale);
  const rayos = (t0, n, xs, ys, xe, ye, dur = 0.7, cada = 0.45) => Array.from({ length: n }, (_, i) => { const u = ((T - t0 - i * cada) / dur); return u > 0 && u < 1.6 ? <Rayo key={i} x1={xs[i % xs.length]} y1={ys} x2={xe[i % xe.length]} y2={ye} p={kclamp(u, 0, 1)} fase={T * 8} /> : null; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mancha negra en la pared; la lupa revela que es afelpada (hongo) */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Muro />
          <Trebol x={170} y={1010} r={50} rot={Math.sin(T) * 3} />
          <Mancha T={T} x={460} y={760} r={210 + 8 * Math.sin(T * 2)} seed={7} />
          <Mancha T={T} x={780} y={960} r={80} seed={9} />
          <g transform={`translate(${klerp(1250, 560, lupaEntra)} ${klerp(1300, 740, lupaEntra)})`} opacity={1 - kprog(T, K.G + 4.2, K.G + 4.8)}>
            <circle r={150} fill="rgba(200,240,255,.25)" stroke={KC.ink} strokeWidth={14} />
            {lupaEntra > 0.9 && Array.from({ length: 16 }, (_, i) => { const a = i * 0.39; return <path key={i} d={`M ${Math.cos(a) * 30} ${Math.sin(a) * 30} q ${Math.cos(a + 0.6) * 50} ${Math.sin(a + 0.6) * 50} ${Math.cos(a) * 110} ${Math.sin(a) * 110}`} stroke="#4d463c" strokeWidth={6} fill="none" opacity={kprog(T, K.G + 0.8, K.G + 1.4)} />; })}
            <line x1={106} y1={106} x2={220} y2={220} stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
          </g>
          <Sello T={T} at={K.G + 2.5} x={290} y={580} texto="HONGO" color={KC.leaf} r={115} />
        </>)}
      </Escena>
      {/* 1 · los micólogos entran al edificio que cubre el reactor dañado */}
      <Escena T={T} a={K.R} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1060} width={KW} height={900} fill="#7b8a5a" stroke={KC.ink} strokeWidth={8} />
          <Sarcofago x={540} y={1060} />
          <Trebol x={900} y={960} r={46} />
          <Traje x={klerp(-80, 330, kprog(T, K.R + 0.3, K.R + 3.2))} y={1110} s={0.9} paso={Math.sin(T * 9)} />
          <Traje x={klerp(-220, 190, kprog(T, K.R + 0.5, K.R + 3.4))} y={1120} s={0.85} paso={Math.sin(T * 9 + 1.5)} />
        </>)}
      </Escena>
      {/* 2 · 37 especies */}
      <Escena T={T} a={K.E} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {Array.from({ length: 37 }, (_, i) => { const on = kprog(T, K.E + 0.1 + i * 0.045, K.E + 0.35 + i * 0.045, kEase.rebote); if (on <= 0) return null;
            const cx = 120 + (i % 7) * 140, cy = 610 + Math.floor(i / 7) * 100; const cols = ['#16110d', '#2c2620', '#f3f0e6', '#7fae5a', '#3b7a4a', '#e0c96a', '#9b8c7a'];
            return <g key={i} transform={`translate(${cx} ${cy}) scale(${on})`}><circle r={46} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={4} /><circle r={38} fill={CH.agar} /><Colonia cx={0} cy={0} r={22 + (i % 3) * 5} color={cols[(i * 3) % 7]} seed={i + 2} /></g>; })}
        </>)}
      </Escena>
      {/* 3 · donde había más radiación dominaban los oscuros */}
      <Escena T={T} a={K.O} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <defs><radialGradient id="calor"><stop offset="0" stopColor={KC.red} stopOpacity=".85" /><stop offset=".6" stopColor={KC.yellow} stopOpacity=".55" /><stop offset="1" stopColor={KC.yellow} stopOpacity="0" /></radialGradient></defs>
          <Muro y={480} h={620} />
          <circle cx={720} cy={780} r={kprog(T, K.O + 0.2, K.O + 1.0) * 300} fill="url(#calor)" />
          <circle cx={260} cy={980} r={kprog(T, K.O + 0.2, K.O + 1.0) * 120} fill="url(#calor)" opacity=".5" />
          {[[700, 760, 90, 3], [800, 870, 60, 4], [620, 880, 50, 5], [780, 660, 45, 6]].map(([x, y, r, s], i) => <Mancha key={i} T={T} x={x} y={y} r={r} seed={s} crece={kprog(T, K.O + 1.0 + i * 0.25, K.O + 1.6 + i * 0.25, kEase.sale)} />)}
          {[[230, 960, '#f3f0e6'], [330, 620, '#7fae5a'], [200, 740, '#e0c96a']].map(([x, y, c], i) => <Colonia key={i} cx={x} cy={y} r={34} color={c} seed={i + 11} />)}
          <Trebol x={140} y={540} r={40} />
        </>)}
      </Escena>
      {/* 4 · melanina: la misma familia de pigmentos que tu piel */}
      <Escena T={T} a={K.Pi} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Brazo x={260} y={790} s={1.0} />
          <PetriColonia x={770} y={820} r={180} col={130} seed={7} />
          <path d={`M 360 ${720} Q 540 ${620} 650 ${720}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray={`${400 * kprog(T, K.Pi + 0.8, K.Pi + 1.6)} 999`} />
        </>)}
      </Escena>
      {/* 5 · al microscopio: la pared del hongo, una armadura negra contra la radiación */}
      <Escena T={T} a={K.Pa} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Hifa T={T} x={60} y={860} s={1.0} crece={kprog(T, K.Pa, K.Pa + 1.2, kEase.sale)} conidios={kprog(T, K.Pa + 1.0, K.Pa + 2.2)} />
          {rayos(K.Pa + 1.6, 6, [980, 900, 1040], 560, [420, 560, 300, 680, 500, 360].map((v) => v + 60), 810, 0.6, 0.45)}
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.Pa + 1.6 + i * 0.45 + 0.6, k = kprog(T, t0, t0 + 0.25); const xs = [420, 560, 300, 680, 500, 360]; return k > 0 && k < 1 ? <circle key={i} cx={xs[i] + 60} cy={808} r={10 + k * 30} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={1 - k} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · ¿solo se protege, o la aprovecha? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<><g opacity=".35"><Hifa T={T} x={60} y={860} s={1.0} conidios={1} /></g><Interrogacion T={T} x={300} y={1080} /></>)}
      </Escena>
      {/* 7–8 · el experimento de 2007: radiación ×500 y dos cajas */}
      <Escena T={T} a={K.Es} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={60} y={1080} width={960} height={40} rx={10} fill="#d9d4c7" stroke={KC.ink} strokeWidth={7} />
          {T > K.Es + 2.6 && <g opacity={kprog(T, K.Es + 2.6, K.Es + 3.0)}>
            <rect x={420} y={570} width={240} height={100} rx={16} fill="#5b6066" stroke={KC.ink} strokeWidth={7} />
            <Trebol x={540} y={620} r={34} />
            {rayos(K.Es + 3.0, 14, [480, 540, 600], 680, [300, 780, 360, 720], 840, 0.5, 0.35)}
          </g>}
          {T > K.Es + 2.6 && <g opacity={kprog(T, K.Es + 2.6, K.Es + 3.0)}>
            <PetriColonia x={300} y={900} r={160} col={T < K.Cr ? 50 : klerp(50, 140, kprog(T, K.Cr + 0.2, K.Cr + 2.4, kEase.sale))} seed={7} />
            <PetriColonia x={780} y={900} r={160} col={T < K.Cr ? 50 : klerp(50, 62, kprog(T, K.Cr + 0.2, K.Cr + 2.4))} albina seed={8} />
          </g>}
        </>)}
      </Escena>
      {/* 9 · 2.5 veces más colonias que sin radiación (ambas con melanina, con poca comida) */}
      <Escena T={T} a={K.Co} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <line x1={140} y1={1080} x2={940} y2={1080} stroke={KC.ink} strokeWidth={8} />
          {[[280, 1, 'sin radiación'], [600, 2.5, 'con radiación']].map(([x, v, t], i) => { const h = 170 * v * kprog(T, K.Co + 0.3 + i * 0.5, K.Co + 1.3 + i * 0.5, kEase.sale);
            return <g key={i}>
              <rect x={x - 110} y={1080 - h} width={220} height={h} fill={i ? KC.yellow : '#f4efe4'} stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: Math.floor(h / 50) * 3 }, (_, j) => <circle key={j} cx={x - 70 + (j % 3) * 70} cy={1055 - Math.floor(j / 3) * 50} r={17} fill={CH.negro} stroke="#4d463c" strokeWidth={3} />)}
              <text x={x} y={1130} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{t}</text>
              {h > 20 && <text x={x} y={1080 - h - 24} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{i ? '2.5×' : '1×'}</text>}
            </g>; })}
        </>)}
      </Escena>
      {/* 10 · hipótesis: ¿como una planta usa la luz? */}
      <Escena T={T} a={K.H} b={K.Sp} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <circle cx={220} cy={600} r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + T; return <line key={i} x1={220 + Math.cos(a) * 90} y1={600 + Math.sin(a) * 90} x2={220 + Math.cos(a) * 120} y2={600 + Math.sin(a) * 120} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}
          {rayos(K.H + 0.3, 8, [250, 270], 690, [260, 300], 800, 0.6, 0.6)}
          <Hoja x={270} y={920} s={1.0} />
          <g transform="translate(540 900)"><text textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>≈</text></g>
          <Trebol x={820} y={600} r={56} />
          {rayos(K.H + 1.2, 8, [800, 840], 690, [780, 850], 790, 0.6, 0.6)}
          <PetriColonia x={820} y={930} r={140} col={100} seed={7} />
          {T > K.H + 1.8 && <text x={990} y={800} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} opacity={kprog(T, K.H + 1.8, K.H + 2.2)}>?</text>}
          <SelloRect T={T} at={K.H + 3.6} x={540} y={760} texto="HIPÓTESIS" />
        </>)}
      </Escena>
      {/* 11 · 2018: en la Estación Espacial, un poquito menos de radiación debajo del hongo */}
      <Escena T={T} a={K.Sp} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={40} tam={[2, 6]} vel={6} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.Sp + 2.0, K.Sp + 2.5)}><Estacion x={540} y={760} s={klerp(0.7, 1.05, kprog(T, K.Sp, K.Sp + 2.2))} /></g>
          {T > K.Sp + 2.0 && <g opacity={kprog(T, K.Sp + 2.0, K.Sp + 2.5)}><g transform="translate(-80 0)">
            <circle cx={540} cy={700} r={230} fill="rgba(255,255,255,.3)" stroke={KC.ink} strokeWidth={8} />
            <circle cx={540} cy={700} r={216} fill={CH.agar} stroke={KC.ink} strokeWidth={4} />
            <clipPath id="mitadIzq"><rect x={300} y={460} width={240} height={480} /></clipPath>
            <g clipPath="url(#mitadIzq)"><Mancha T={T} x={430} y={700} r={200} seed={12} /></g>
            <line x1={540} y1={480} x2={540} y2={920} stroke={KC.ink} strokeWidth={8} />
            {rayos(K.Sp + 2.4, 10, [400, 680, 460, 620], 300, [400, 680, 460, 620], 500, 0.4, 0.3)}
            </g>
            {[[0, 0.93, 'debajo del hongo', KC.orange], [1, 1, 'sin hongo', KC.red]].map(([k, v, t, c]) => { const w = 420 * v * kprog(T, K.Sp + 3.0, K.Sp + 3.8, kEase.sale), y = 1010 + k * 60; return <g key={k}>
              <rect x={170} y={y - 22} width={w} height={44} rx={10} fill={c} stroke={KC.ink} strokeWidth={5} />
              <text x={170 + w + 16} y={y + 10} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{t}</text>
            </g>; })}
          </g>}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma pared del inicio; la mancha ahora con su armadura de melanina */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Muro />
          <Trebol x={170} y={1010} r={50} rot={Math.sin(T) * 3} />
          <Mancha T={T} x={460} y={760} r={210 + 8 * Math.sin(T * 2)} seed={7} armadura={kprog(T, K.C + 0.6, K.C + 1.6)} />
          <Mancha T={T} x={780} y={960} r={80} seed={9} armadura={kprog(T, K.C + 0.9, K.C + 1.9)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.2} until={K.R - 0.3} texto="¿hollín?" x={300} y={440} tam={52} />
      <Chip T={T} at={K.G + 3.2} until={K.R - 0.3} texto="Chernóbil · reactor 4" x={400} y={1110} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.R + 0.4} until={K.E - 0.3} texto="1997–1998" x={300} y={440} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.R + 1.2} until={K.E - 0.3} x={60} y={540} texto="edificio que cubre el reactor 4" tam={30} color={KC.texto} />
      <NumeroGigante T={T} at={K.E + 0.1} until={K.O - 0.3} valor={37} dur={1.7} etiqueta="especies de hongos" x={380} y={470} tam={170} color={KC.yellow} />
      <Etq T={T} at={K.E + 1.4} until={K.O - 0.3} x={620} y={470} texto="de 19 géneros" tam={30} color={KC.ink} />
      <Chip T={T} at={K.O + 0.6} until={K.Pi - 0.3} texto="más radiación" x={380} y={460} tam={42} borde={KC.red} />
      <Etq T={T} at={K.O + 1.8} until={K.Pi - 0.3} x={300} y={1000} texto="hongos con melanina" tam={32} color={KC.texto} />
      <Etq T={T} at={K.O + 2.2} until={K.Pi - 0.3} x={240} y={1050} texto={<>p. ej. <i>Cladosporium sphaerospermum</i></>} tam={30} color={KC.texto} />
      <Chip T={T} at={K.Pi + 1.4} until={K.Pa - 0.3} texto="melanina" x={390} y={440} tam={48} borde={KC.ink} />
      <Etq T={T} at={K.Pi + 0.6} until={K.Pa - 0.3} x={340} y={1060} texto="tu piel" tam={32} />
      <Etq T={T} at={K.Pi + 0.9} until={K.Pa - 0.3} x={660} y={1060} texto="el hongo" tam={32} />
      <Chip T={T} at={K.Pi + 2.2} until={K.Pa - 0.3} texto="no idéntica: de la misma familia" x={390} y={540} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 0.2} until={K.P - 0.3} texto="AL MICROSCOPIO · pared del hongo" x={430} y={460} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Pa + 1.0} until={K.P - 0.3} x={60} y={560} texto="Cladosporium sphaerospermum" it tam={30} color={KC.texto} />
      <Etq T={T} at={K.Pa + 1.4} until={K.P - 0.3} x={300} y={960} texto="pared con melanina" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Pa + 2.0} until={K.P - 0.3} x={700} y={1060} texto="esporas redondas" lado="izq" tam={28} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="2007" quien="Nueva York" revista="Dadachova et al., PLoS ONE" y={700} />
      <NumeroGigante T={T} at={K.Es + 3.0} until={K.Cr - 0.3} valor={500} dur={1.0} prefijo="≈" sufijo="×" etiqueta="la radiación normal" x={540} y={430} tam={110} color={KC.yellow} />
      <Etq T={T} at={K.Es + 3.2} until={K.Co - 0.3} x={170} y={700} texto="con melanina" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.4} until={K.Co - 0.3} x={650} y={700} texto="sin melanina" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cr + 1.2} until={K.Co - 0.3} texto="con melanina: crece más" x={400} y={420} tam={36} borde={KC.leaf} />
      <Etq T={T} at={K.Co + 0.3} until={K.H - 0.3} x={60} y={440} texto="Cryptococcus neoformans" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Co + 1.0} until={K.H - 0.3} texto="poca comida" x={300} y={600} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Co + 1.6} until={K.H - 0.3} x={60} y={530} texto="las dos, con melanina" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 0.4} until={K.Sp - 0.3} x={120} y={1100} texto="luz → energía" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 1.4} until={K.Sp - 0.3} x={600} y={1100} texto="¿radiación → energía?" tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 4.4} until={K.Sp - 0.3} texto="no está comprobado" x={420} y={430} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Sp + 0.3} until={K.C - 0.3} texto="2018 · Estación Espacial" x={400} y={440} tam={38} borde={KC.cyan} />
      <Etq T={T} at={K.Sp + 2.4} until={K.C - 0.3} x={60} y={950} texto="Cladosporium sphaerospermum" it tam={30} color={KC.texto} />
      <Chip T={T} at={K.Sp + 3.8} until={K.C - 0.3} texto="un poquito menos" x={540} y={1140} tam={36} borde={KC.orange} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="hongo blindado con melanina" x={420} y={440} tam={38} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="50 cm" largo={180} />
      <BarraEscala T={T} at={K.R} until={K.E} texto="10 m" largo={160} y={1580} />
      <BarraEscala T={T} at={K.E} until={K.O} texto="5 cm" largo={110} y={1580} />
      <BarraEscala T={T} at={K.O} until={K.Pi} texto="50 cm" largo={180} y={1600} />
      <BarraEscala T={T} at={K.Pi} until={K.Pa} texto="5 cm" largo={110} y={1580} />
      <BarraEscala T={T} at={K.Pa} until={K.Es} texto="5 µm" largo={150} y={1580} />
      <BarraEscala T={T} at={K.Es} until={K.H} texto="5 cm" largo={110} y={1580} />
      <BarraEscala T={T} at={K.H} until={K.Sp} texto="5 cm" largo={110} y={1580} />
      <BarraEscala T={T} at={K.Sp} until={K.Sp + 2.2} texto="20 m" largo={160} y={1580} />
      <BarraEscala T={T} at={K.Sp + 2.2} until={K.C} texto="5 cm" largo={110} y={1580} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="50 cm" largo={180} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="No es hollín: *es un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.E - 0.1} texto="Entraron al *reactor dañado.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.O - 0.1} texto="*37 especies* de hongos." />
      <Subtitulo T={T} idx={3} at={K.O + 0.1} until={K.Pi - 0.1} texto="Más radiación: *hongos oscuros.*" />
      <Subtitulo T={T} idx={4} at={K.Pi + 0.1} until={K.Pa - 0.1} texto="Melanina, *como en tu piel.*" />
      <Subtitulo T={T} idx={5} at={K.Pa + 0.1} until={K.P - 0.1} texto="Una *armadura negra.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Se protege, *o la aprovecha?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Cr - 0.1} texto="2007: *500 veces* más radiación." />
      <Subtitulo T={T} idx={8} at={K.Cr + 0.1} until={K.Co - 0.1} texto="Con melanina, *crecieron más.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.H - 0.1} texto="*2.5 veces* más colonias." />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.Sp - 0.1} texto="Es una hipótesis: *no está comprobado.*" />
      <Subtitulo T={T} idx={11} at={K.Sp + 0.1} until={K.C - 0.1} texto="En el espacio: *un poquito menos.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un hongo *blindado con melanina.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.8, K.E + 2.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pi + 0.4, K.Pa - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Cr + 0.3, K.Co + 4.6, 'avatar_11_sorprendido', 'arriba-der'],
        [K.H + 0.5, K.H + 6.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Sp + 1.0, K.Sp + 5.5, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="30" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChernobilApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ChernobilShot /></CompositionStage></div>;
}
window.ChernobilApp = ChernobilApp;
