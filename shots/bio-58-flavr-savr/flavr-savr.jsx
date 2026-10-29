// Shot Biotecnológico #58 · El primer transgénico del súper fue un jitomate (Flavr Savr, 1994) — NARRADO (N1 por dentro + N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VERDE = '#7cc24a', NARANJA = '#f39a2b', ROJO = '#e8361f', PG = '#9b5de5', MADERA = '#c98a4b', MADERA2 = '#a86a33';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
function colorTom(m) { return m < 0.5 ? mixHex(VERDE, NARANJA, m * 2) : mixHex(NARANJA, ROJO, (m - 0.5) * 2); }

// Jitomate de frente: m = madurez (0 verde → 1 rojo), aplasta 0..1, machucado 0..1.
function Jitomate({ x, y, r = 100, m = 1, aplasta = 0, machucado = 0, rot = 0, sudor = 0, T = 0 }) {
  const sx = 1 + aplasta * 0.35, sy = 1 - aplasta * 0.45, c = colorTom(m);
  return <g transform={`translate(${x} ${y + r * aplasta * 0.45}) rotate(${rot}) scale(${sx} ${sy})`}>
    <path d={`M 0 ${-r * 0.82} C ${r * 0.55} ${-r * 1.02} ${r * 1.12} ${-r * 0.62} ${r * 1.08} ${r * 0.02} C ${r * 1.04} ${r * 0.7} ${r * 0.55} ${r * 0.95} 0 ${r * 0.95}
      C ${-r * 0.55} ${r * 0.95} ${-r * 1.04} ${r * 0.7} ${-r * 1.08} ${r * 0.02} C ${-r * 1.12} ${-r * 0.62} ${-r * 0.55} ${-r * 1.02} 0 ${-r * 0.82} Z`}
      fill={c} stroke={KC.ink} strokeWidth={Math.max(4, r * 0.07)} />
    <path d={`M ${-r * 0.45} ${-r * 0.7} Q ${-r * 0.62} 0 ${-r * 0.3} ${r * 0.8}`} fill="none" stroke={mixHex(c, '#000000', 0.18)} strokeWidth={r * 0.05} strokeLinecap="round" />
    <path d={`M ${r * 0.45} ${-r * 0.7} Q ${r * 0.62} 0 ${r * 0.3} ${r * 0.8}`} fill="none" stroke={mixHex(c, '#000000', 0.18)} strokeWidth={r * 0.05} strokeLinecap="round" />
    <ellipse cx={-r * 0.45} cy={-r * 0.35} rx={r * 0.18} ry={r * 0.3} fill="#fff" opacity={0.45} transform={`rotate(25 ${-r * 0.45} ${-r * 0.35})`} />
    {machucado > 0 && <ellipse cx={r * 0.3} cy={r * 0.35} rx={r * 0.38} ry={r * 0.26} fill="#6b1d12" opacity={0.55 * machucado} />}
    {/* cáliz: cinco sépalos y el tallito */}
    {[0, 1, 2, 3, 4].map((k) => { const a = -90 + k * 72; return <path key={k} transform={`translate(0 ${-r * 0.8}) rotate(${a + 90})`}
      d={`M 0 0 Q ${r * 0.1} ${-r * 0.18} 0 ${-r * 0.42} Q ${-r * 0.1} ${-r * 0.18} 0 0 Z`} fill="#3f9b35" stroke={KC.ink} strokeWidth={Math.max(3, r * 0.04)} strokeLinejoin="round" />; })}
    <rect x={-r * 0.06} y={-r * 1.08} width={r * 0.12} height={r * 0.3} rx={r * 0.05} fill="#3f9b35" stroke={KC.ink} strokeWidth={Math.max(3, r * 0.04)} />
    {sudor > 0 && [0, 1].map((k) => { const ph = ((T * 0.9 + k * 0.5) % 1); return <path key={k} transform={`translate(${r * (0.85 + k * 0.15)} ${-r * 0.4 + ph * r * 0.6})`}
      d={`M 0 ${-r * 0.16} Q ${r * 0.1} 0 0 ${r * 0.08} Q ${-r * 0.1} 0 0 ${-r * 0.16} Z`} fill="#bfe8ff" stroke={KC.ink} strokeWidth={4} opacity={sudor * (1 - ph)} />; })}
  </g>;
}
// Mazorca con hojas.
function Mazorca({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 120 Q -120 20 -70 -150 Q -40 -60 -20 120 Z" fill="#5cb85c" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-20} rx={62} ry={170} fill="#ffd23f" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 8 }, (_, i) => <line key={'h' + i} x1={-58} x2={58} y1={-150 + i * 38} y2={-150 + i * 38} stroke="#d9a400" strokeWidth={5} />)}
    {[-30, 0, 30].map((dx) => <line key={dx} x1={dx} x2={dx} y1={-180} y2={140} stroke="#d9a400" strokeWidth={5} />)}
    <path d="M 40 120 Q 120 20 70 -150 Q 40 -60 20 120 Z" fill="#6fcf5f" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Caja de madera del súper con jitomates. m = madurez (número o función del índice).
function Caja({ x, y, s = 1, m = 1, T = 0, n = 5, cae }) {
  const mm = (i) => (typeof m === 'function' ? m(i) : m);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => <Jitomate key={i} x={-220 + i * 110} y={-70 + (i % 2) * 14} r={78} m={mm(i)} rot={(i * 23) % 20 - 10} />)}
    {cae && cae}
    <rect x={-320} y={-40} width={640} height={230} rx={14} fill={MADERA} stroke={KC.ink} strokeWidth={10} />
    {[0, 1, 2].map((k) => <rect key={k} x={-300} y={-20 + k * 70} width={600} height={46} rx={8} fill={k % 2 ? MADERA2 : '#d99a5a'} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Letrero de precio clavado en una varita.
function Letrero({ x, y, s = 1, rot = 0, texto = 'FLAVR SAVR', sub = 'jitomate', o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-8} y={0} width={16} height={190} fill="#8a5a2b" stroke={KC.ink} strokeWidth={5} />
    <rect x={-170} y={-120} width={340} height={130} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-48} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={ROJO}>{texto}</text>
    <text x={0} y={-12} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
}
// California esquemática con un alfiler en Davis.
function California({ x, y, s = 1, T = 0, pin = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 180 0 L 180 200 L 430 470 L 420 520 L 400 570 L 280 575 L 268 525 L 200 470 L 120 420 L 90 330 L 40 250 L 18 140 Z" fill="#ffe8a3" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g transform={`translate(118 205) scale(${pin}) translate(0 ${-Math.abs(Math.sin(T * 4)) * 10})`}>
      <path d="M 0 0 C -30 -40 -36 -60 -36 -76 A 36 36 0 1 1 36 -76 C 36 -60 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-76} r={13} fill="#fff" />
    </g>
  </g>;
}
// Camión de lado.
function Camion({ x, y, T = 0, children }) {
  const bote = Math.abs(Math.sin(T * 7)) * 14;
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`translate(0 ${-bote})`}>
      <rect x={-380} y={-40} width={560} height={60} fill="#6f7a84" stroke={KC.ink} strokeWidth={9} />
      {children}
      <path d="M 190 -40 L 190 -230 L 330 -230 L 400 -130 L 400 20 L 190 20 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
      <path d="M 220 -200 L 318 -200 L 366 -130 L 220 -130 Z" fill="#bfe8ff" stroke={KC.ink} strokeWidth={6} />
    </g>
    {[-270, -120, 300].map((wx) => <g key={wx} transform={`translate(${wx} 40) rotate(${T * 400})`}>
      <circle r={54} fill="#2b2b2b" stroke={KC.ink} strokeWidth={8} /><circle r={20} fill="#9aa3b5" />
      <line x1={-40} x2={40} y1={0} y2={0} stroke="#555" strokeWidth={6} /></g>)}
  </g>;
}
// Nube de etileno.
function Gas({ T, x, y, o = 1, w = 600, seed = 3 }) {
  if (o <= 0) return null;
  const R = krng(seed);
  return <g opacity={o}>{Array.from({ length: 14 }, (_, i) => { const bx = (R() - 0.5) * w, by = (R() - 0.5) * 260, r = 40 + R() * 50, p = R() * 6;
    return <g key={i} transform={`translate(${x + bx + Math.sin(T * 0.8 + p) * 26} ${y + by + Math.cos(T * 0.6 + p) * 18})`}>
      <circle r={r} fill="rgba(255,255,255,.45)" stroke="rgba(255,255,255,.8)" strokeWidth={3} />
      {i % 4 === 0 && <text y={10} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#2d6a4f">C₂H₄</text>}
    </g>; })}</g>;
}
// Tijerita de enzima PG.
function Tijera({ x, y, s = 1, abre = 0, rot = 0 }) {
  const a = 12 + abre * 22;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a * Math.PI / 180) * 46} ${-Math.sin(a * Math.PI / 180) * 46} A 46 46 0 1 0 ${Math.cos(a * Math.PI / 180) * 46} ${Math.sin(a * Math.PI / 180) * 46} Z`} fill={PG} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-6} cy={-22} r={7} fill="#fff" /><circle cx={-4} cy={-22} r={3.5} fill={KC.ink} />
  </g>;
}
// Interior del fruto para la Lupa: células pegadas con pectina; corte = 0..1 (la PG corta el pegamento).
function Celulas({ T, r, corte = 0, tijeras = 0 }) {
  const D = r * 2, cw = 104, ch = 90, cells = [];
  for (let j = -1; j < D / ch + 1; j++) for (let i = -1; i < D / cw + 1; i++) {
    const cx = i * cw + (j % 2 ? cw / 2 : 0) + 20, cy = j * ch + 30, g = krng(i * 31 + j * 7 + 99);
    const sep = corte * 9, ox = (g() - 0.5) * sep * 2 + Math.sin(T * 1.4 + i + j) * 2 * corte, oy = (g() - 0.5) * sep * 2;
    cells.push({ cx: cx + ox, cy: cy + oy, k: (i * 7 + j * 3) % 4, g: g() });
  }
  const ruta = (u) => ({ x: r + Math.cos(u * 6.28) * r * 0.55, y: r + Math.sin(u * 12.56) * r * 0.4 });
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#120a12" />
    <rect width={D} height={D} fill={KC.gold2} opacity={0.85 * (1 - corte * 0.85)} />
    {cells.map((c, i) => { const w = cw - 14 - corte * 10, h = ch - 14 - corte * 10;
      return <g key={i} transform={`translate(${c.cx} ${c.cy})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={22 + corte * 12} fill="#ff6b5a" stroke="#ffd0c8" strokeWidth={6} />
        <ellipse cx={-6} cy={4} rx={w * 0.3} ry={h * 0.26} fill="#ff9a8a" opacity={0.8} />
        <circle cx={w * 0.22} cy={-h * 0.18} r={8} fill="#7a1f2b" />
      </g>; })}
    {tijeras > 0 && Array.from({ length: 5 }, (_, i) => { const u = (T * 0.08 + i / 5) % 1, p = ruta(u), q = ruta((u + 0.01) % 1);
      return <Tijera key={i} x={p.x} y={p.y} s={0.75} abre={Math.abs(Math.sin(T * 9 + i))} rot={Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI} />; })}
  </svg>;
}
// Hebra de ARN (una sola), ondulada.
function ARN({ x, y, largo = 520, color = KC.mint, T = 0, fase = 0, alto = 18 }) {
  const n = 40, d = Array.from({ length: n + 1 }, (_, i) => { const u = i / n; return `${i ? 'L' : 'M'} ${(x + u * largo).toFixed(1)} ${(y + Math.sin(u * 18 + T * 3 + fase) * alto).toFixed(1)}`; }).join(' ');
  return <g><path d={d} stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" /><path d={d} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" /></g>;
}
// Ribosoma (dos lóbulos).
function Ribosoma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-34} rx={74} ry={50} fill="#4cc9f0" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={36} rx={56} ry={36} fill="#3a86ff" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Mata de jitomate con frutos que maduran.
function Mata({ T, x, y, m = 1, frutos = 3, s = 1 }) {
  const sw = Math.sin(T * 1.3) * 3;
  const pos = [[-120, -330], [110, -470], [-60, -610]].slice(0, frutos);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 Q ${-20 + sw} -300 ${10 + sw} -720`} stroke="#2f7d32" strokeWidth={22} fill="none" strokeLinecap="round" />
    {[[-1, -220], [1, -380], [-1, -520], [1, -650]].map(([d, yy], i) => <path key={i} transform={`translate(${sw * 0.5} ${yy}) rotate(${d * (35 + Math.sin(T * 1.6 + i) * 6)})`}
      d={`M 0 0 Q ${d * 90} -60 ${d * 190} -10 Q ${d * 100} 30 0 0 Z`} fill="#4caf50" stroke={KC.ink} strokeWidth={7} />)}
    {pos.map(([px, py], i) => <g key={i}>
      <path d={`M ${sw * 0.5} ${py - 40} Q ${px * 0.6} ${py - 60} ${px} ${py - 70}`} stroke="#2f7d32" strokeWidth={9} fill="none" />
      <Jitomate x={px} y={py} r={70} m={typeof m === 'function' ? m(i) : m} rot={Math.sin(T * 1.3 + i) * 5} /></g>)}
  </g>;
}
// Prensa que baja sobre un jitomate.
function Prensa({ x, y, baja = 0 }) {
  const yy = klerp(y - 260, y - 92, baja);
  return <g>
    <rect x={x - 60} y={yy - 230} width={120} height={60} rx={14} fill="#6f7a84" stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 14} y={yy - 172} width={28} height={150} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 100} y={yy - 26} width={200} height={30} rx={8} fill="#6f7a84" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function FlavrSavr() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Calgene, Cm: CUES.Camion, V: CUES.Verde, Pe: CUES.Pectina, En: CUES.Enzima, Ar: CUES.AlReves, Ap: CUES.Apaga,
    Ma: CUES.Mata, F: CUES.FDA, Pr: CUES.Pregunta, Es: CUES.Estudio, Fr: CUES.Fracaso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la mazorca entra, se tacha y se va; cae el jitomate
  const entra = kprog(T, K.G, K.G + 0.45, kEase.sale), seVa = kprog(T, K.G + 1.9, K.G + 2.4, kEase.suave);
  const cae = kprog(T, K.G + 2.1, K.G + 2.7, kEase.rebote);
  const clava = kprog(T, K.Ca + 0.1, K.Ca + 0.5, kEase.rebote);
  // camión
  const aplast = kprog(T, K.Cm + 1.2, K.Cm + 3.0);
  // verde → rojo con etileno
  const madura = (t0) => (i) => kprog(T, t0 + i * 0.25, t0 + 2.6 + i * 0.25, kEase.suave);
  // dentro
  const corte = kprog(T, K.En + 0.6, K.En + 3.8);
  // gen al revés
  const gira = kprog(T, K.Ar + 0.6, K.Ar + 2.0, kEase.suave);
  const pega = kprog(T, K.Ap + 0.3, K.Ap + 1.3, kEase.sale);
  // estudio
  const prensa = kprog(T, K.Es + 4.2, K.Es + 5.2, kEase.suave);
  const f1 = K.Fr, f2 = K.Fr + 1.7, f3 = K.Fr + 3.4;
  const letreroCae = kprog(T, f3 + 0.3, f3 + 1.2, kEase.suave);
  const letreroCierre = kprog(T, K.Ci + 0.4, K.Ci + 1.2, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0–1 · gancho y Calgene: la caja del súper */}
      <Escena T={T} a={K.G} b={K.Cm} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {seVa < 1 && <Mazorca x={klerp(-200, 300, entra) - seVa * 600} y={740} s={1.1} rot={-20 + seVa * -40} />}
          {T > K.G + 1.4 && seVa < 1 && <g opacity={1 - seVa}><line x1={170} y1={560} x2={430} y2={920} stroke={KC.red} strokeWidth={30} strokeLinecap="round" /><line x1={430} y1={560} x2={170} y2={920} stroke={KC.red} strokeWidth={30} strokeLinecap="round" /></g>}
          <Caja x={540} y={1000} T={T} m={1} n={4} cae={T > K.G + 2.1 ? <Jitomate x={-220 + 4 * 110} y={klerp(-1300, -70, cae)} r={78} m={1} rot={-8} /> : null} />
          {T > K.Ca && <Letrero x={740} y={klerp(400, 800, clava)} rot={6} />}
          {T > K.Ca + 1.0 && <California x={60} y={420} s={0.62} T={T} pin={kprog(T, K.Ca + 1.2, K.Ca + 1.6, kEase.rebote)} />}
        </SvgCapa>
      </Escena>
      {/* 2 · el camión aplasta */}
      <Escena T={T} a={K.Cm} b={K.V}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <g transform={`translate(${klerp(80, -40, kprog(T, K.Cm, K.V))} 0)`}>
            <Camion x={560} y={1060} T={T}>
              <g transform="translate(-100 -40) scale(0.72)">
                {[0, 1, 2, 3, 4].map((i) => <Jitomate key={i} x={-240 + i * 120} y={-72} r={70} m={1} aplasta={aplast * (0.6 + (i % 2) * 0.3)} machucado={aplast} />)}
                {[0, 1, 2, 3].map((i) => <Jitomate key={'b' + i} x={-180 + i * 120} y={-180} r={70} m={1} rot={i * 9} />)}
                <rect x={-320} y={-40} width={640} height={40} rx={8} fill={MADERA} stroke={KC.ink} strokeWidth={8} />
              </g>
            </Camion>
            {aplast > 0.2 && [0, 1, 2, 3, 4, 5].map((i) => { const ph = (T * 1.6 + i / 6) % 1; return <circle key={i} cx={300 + i * 60 + ph * 40} cy={1010 + ph * 160} r={12 * (1 - ph)} fill={ROJO} stroke={KC.ink} strokeWidth={3} />; })}
          </g>
        </SvgCapa>
      </Escena>
      {/* 3 · Florida: verdes y etileno */}
      <Escena T={T} a={K.V} b={K.Pe}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Caja x={540} y={1000} T={T} m={madura(K.V + 1.4)} n={5} />
          <Gas T={T} x={540} y={760} o={kprog(T, K.V + 0.8, K.V + 1.6)} w={760} />
        </SvgCapa>
      </Escena>
      {/* 4–5 · por dentro: pectina y la enzima que la corta */}
      <Escena T={T} a={K.Pe} b={K.Ar} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Jitomate x={540} y={1060} r={170} m={1} rot={Math.sin(T) * 3} /></SvgCapa>
        <Lupa T={T} at={K.Pe + 0.2} until={K.Ar - 0.3} x={560} y={810} r={290} fx={580} fy={1080} tinte={KC.gold2} etiqueta="AL MICROSCOPIO · JITOMATE"
          interior={(Tl, r) => <Celulas T={Tl} r={r} corte={corte} tijeras={kprog(Tl, K.En + 0.3, K.En + 0.6)} />} />
      </Escena>
      {/* 6–7 · el gen al revés */}
      <Escena T={T} a={K.Ar} b={K.Ma}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(180,200,255,.25)" />
        <SvgCapa>
          <ADNHebra T={T} x={250} y={700} largo={600} alto={80} vueltas={3} />
          <g opacity={kprog(T, K.Ar + 0.2, K.Ar + 0.6)} transform={`rotate(${gira * 180} 550 ${klerp(860, 860, 1)})`}>
            <ADNHebra T={T} x={250} y={860} largo={600} alto={80} vueltas={3} colores={[KC.gold2, KC.orange, KC.gold2, KC.coral]} />
            <path d="M 820 860 l 40 -20 l 0 40 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
          </g>
          {T > K.Ap - 0.2 && <g opacity={kprog(T, K.Ap - 0.2, K.Ap + 0.2)}>
            <ARN x={270} y={klerp(760, 1000, kprog(T, K.Ap - 0.2, K.Ap + 0.4))} largo={540} color={KC.mint} T={T} />
            <ARN x={270} y={klerp(900, 1000, pega) + 22 * pega} largo={540} color={KC.gold2} T={T} fase={Math.PI} />
            {pega > 0.5 && Array.from({ length: 14 }, (_, i) => <line key={i} x1={290 + i * 38} x2={290 + i * 38} y1={995} y2={1027} stroke="#fff" strokeWidth={5} opacity={(pega - 0.5) * 2} />)}
            <g transform={`translate(${klerp(140, 230, kprog(T, K.Ap + 1.0, K.Ap + 1.5)) - 30 * kprog(T, K.Ap + 1.5, K.Ap + 1.9, kEase.rebote)} 1010)`}><Ribosoma x={0} y={0} s={0.9} /></g>
            {T > K.Ap + 1.6 && <g transform="translate(210 880)"><line x1={-36} y1={-36} x2={36} y2={36} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /><line x1={36} y1={-36} x2={-36} y2={36} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /></g>}
          </g>}
        </SvgCapa>
        <Medidor T={T} at={K.Ap + 0.8} until={K.Ma - 0.3} valor={(t) => 1 - 0.92 * kprog(t, K.Ap + 1.4, K.Ap + 2.6)} etiqueta="enzima PG" texto={(v) => (v < 0.2 ? 'casi nada' : 'normal')} y={1470} color={PG} />
      </Escena>
      {/* 8 · madurar en la mata */}
      <Escena T={T} a={K.Ma} b={K.F}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Mata T={T} x={540} y={1240} m={madura(K.Ma + 0.4)} /></SvgCapa>
      </Escena>
      {/* 9 · FDA, mayo de 1994, y el anaquel */}
      <Escena T={T} a={K.F} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.F + 2.2 && <g opacity={kprog(T, K.F + 2.2, K.F + 2.6)}>
            <rect x={90} y={1050} width={900} height={36} fill="#8a5a2b" stroke={KC.ink} strokeWidth={8} />
            {[0, 1, 2, 3, 4, 5].map((i) => <Jitomate key={i} x={180 + i * 140} y={990} r={62} m={1} rot={(i * 17) % 14 - 7} />)}
            <Letrero x={540} y={klerp(700, 870, kprog(T, K.F + 2.4, K.F + 2.8, kEase.rebote))} s={0.8} sub="nuevo · 1994" />
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.F + 0.2} until={K.F + 2.2} anio="1994" quien="FDA · mayo" revista="visto bueno al jitomate Flavr Savr" y={900} />
      </Escena>
      {/* 10 · ¿y sí aguantó? */}
      <Escena T={T} a={K.Pr} b={K.Es + 1.4} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Jitomate x={760} y={880} r={210} m={1} rot={Math.sin(T * 3) * 6} sudor={1} T={T} />
          <text x={760} y={560} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} transform={`rotate(${Math.sin(T * 3) * 8} 760 500)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 11 · el estudio de 1997 */}
      <Escena T={T} a={K.Es + 1.4} b={K.Fr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.Es + 3.4 && <g opacity={kprog(T, K.Es + 3.4, K.Es + 3.8)}>
            {[[400, 0.45, 'normal', 0.5], [760, 0.36, 'PG apagada (<1 %)', 0.58]].map(([x, ap, et, firm], i) => <g key={i}>
              <Prensa x={x} y={960} baja={prensa} />
              <Jitomate x={x} y={960} r={100} m={1} aplasta={ap * prensa} />
              <text x={x} y={1120} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{et}</text>
              <rect x={x + 125} y={1060 - 300 * firm * kprog(T, K.Es + 5.0, K.Es + 6.0)} width={50} height={300 * firm * kprog(T, K.Es + 5.0, K.Es + 6.0)} fill={i ? PG : '#8a8f99'} stroke={KC.ink} strokeWidth={6} />
            </g>)}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 1.5} until={K.Es + 3.3} anio="1997" quien="Universidad de California, Davis" revista="Plant Physiology · Brummell y Labavitch" y={860} />
      </Escena>
      {/* 12 · el fracaso, en tres golpes */}
      <Escena T={T} a={K.Fr} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          {T < f2 + 0.2 && <g opacity={1 - kprog(T, f2 - 0.1, f2 + 0.2)}><Caja x={540} y={1000} T={T} m={1} n={5} />
            <Jitomate x={560} y={790} r={110} m={1} aplasta={0.4 * kprog(T, f1 + 0.3, f1 + 0.7)} machucado={1} rot={10} /></g>}
          {T > f2 - 0.1 && T < f3 + 0.2 && <g opacity={kprog(T, f2 - 0.1, f2 + 0.2) * (1 - kprog(T, f3 - 0.1, f3 + 0.2))}><Mata T={T} x={540} y={1240} m={1} frutos={1} /></g>}
          {T > f3 - 0.1 && <g opacity={kprog(T, f3 - 0.1, f3 + 0.2)}>
            <rect x={90} y={1050} width={900} height={36} fill="#8a5a2b" stroke={KC.ink} strokeWidth={8} />
            <Letrero x={540 + letreroCae * 120} y={870 + letreroCae * 700} s={0.8} rot={letreroCae * 70} sub="1994 → 1997" o={1 - letreroCae * 0.6} />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 13 · cierre: la caja del inicio, ahora verde y con gas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Caja x={540} y={1000} T={T} m={madura(K.Ci + 1.4)} n={5} />
          {letreroCierre < 1 && <Letrero x={740 + letreroCierre * 150} y={800 + letreroCierre * 800} rot={6 + letreroCierre * 80} />}
          <Gas T={T} x={540} y={760} o={kprog(T, K.Ci + 0.9, K.Ci + 1.6)} w={760} seed={7} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.4} until={K.G + 2.3} texto="¿el maíz?" x={300} y={520} tam={50} />
      <Chip T={T} at={K.G + 2.7} until={K.Ca - 0.2} texto="1er alimento entero transgénico" y={1500} tam={40} borde={ROJO} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Cm - 0.3} x={60} y={395} texto="Calgene · Davis, California" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Cm - 0.2} texto="Flavr Savr · Calgene" y={1500} tam={44} borde={ROJO} />
      <Medidor T={T} at={K.Cm + 0.5} until={K.V - 0.3} valor={(t) => 1 - 0.8 * kprog(t, K.Cm + 1.2, K.Cm + 3.0)} etiqueta="firmeza" texto={(v) => (v < 0.4 ? 'aplastado' : 'firme')} y={1470} color={ROJO} />
      <Chip T={T} at={K.V + 0.3} until={K.Pe - 0.2} texto="Florida · se cortan verdes" y={1500} tam={44} borde={VERDE} />
      <Etq T={T} at={K.V + 1.6} until={K.Pe - 0.3} x={1020} y={1650} texto="etileno: hormona de la maduración" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pe + 0.8} until={K.En - 0.1} texto="pectina = el pegamento" y={1500} tam={44} borde={KC.gold2} />
      <Chip T={T} at={K.En + 0.4} until={K.Ar - 0.3} texto="poligalacturonasa (PG)" y={1500} tam={44} borde={PG} />
      <Chip T={T} at={K.Ar + 0.5} until={K.Ap - 0.1} texto="gen antisentido (al revés)" y={1500} tam={44} borde={KC.gold2} />
      <Etq T={T} at={K.Ar + 0.3} until={K.Ap - 0.2} x={250} y={610} texto="gen de la PG" tam={32} />
      <Etq T={T} at={K.Ap + 0.4} until={K.Ma - 0.3} x={820} y={1090} texto="mensaje + copia al revés" lado="izq" tam={30} />
      <Chip T={T} at={K.Ma + 0.4} until={K.F - 0.2} texto="la idea: madurar en la mata" y={1500} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.F + 2.6} until={K.Pr - 0.2} texto="a los 3 días: a la venta" y={1500} tam={44} borde={ROJO} />
      <Chip T={T} at={K.Es + 5.6} until={K.Fr - 0.2} texto="apenas un poco más firme" y={1500} tam={44} borde={PG} />
      <Chip T={T} at={f1 + 0.3} until={f2 - 0.1} texto="se maltrataba en el viaje" y={1500} tam={44} borde={ROJO} />
      <Chip T={T} at={f2 + 0.2} until={f3 - 0.1} texto="su variedad rendía poco" y={1500} tam={44} borde={KC.leaf} />
      <Chip T={T} at={f3 + 0.3} until={K.Ci - 0.2} texto="menos de 3 años en el súper" y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="cortado verde + etileno" y={1500} tam={44} borde={VERDE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="El primer transgénico: *un jitomate.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.Cm - 0.1} texto="Flavr Savr, de *Calgene.*" />
      <Subtitulo T={T} idx={2} at={K.Cm + 0.1} until={K.V - 0.1} texto="Maduro, *se aplasta.*" />
      <Subtitulo T={T} idx={3} at={K.V + 0.1} until={K.Pe - 0.1} texto="Verdes, y luego *etileno.*" />
      <Subtitulo T={T} idx={4} at={K.Pe + 0.1} until={K.En - 0.1} texto="Pegadas con *pectina.*" />
      <Subtitulo T={T} idx={5} at={K.En + 0.1} until={K.Ar - 0.1} texto="La enzima *corta el pegamento.*" />
      <Subtitulo T={T} idx={6} at={K.Ar + 0.1} until={K.Ap - 0.1} texto="Una copia del gen *al revés.*" />
      <Subtitulo T={T} idx={7} at={K.Ap + 0.1} until={K.Ma - 0.1} texto="La enzima *casi no se fabrica.*" />
      <Subtitulo T={T} idx={8} at={K.Ma + 0.1} until={K.F - 0.1} texto="Madurar *en la mata.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.Pr - 0.1} texto="Mayo de 1994: *a la venta.*" />
      <Subtitulo T={T} idx={10} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Y sí *aguantó?*" />
      <Subtitulo T={T} idx={11} at={K.Es + 0.1} until={K.Fr - 0.1} texto="Apenas *un poco más firme.*" />
      <Subtitulo T={T} idx={12} at={K.Fr + 0.1} until={K.Ci - 0.1} texto="En menos de 3 años, *se fue.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Lo que quedó: *verde y gas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Calgene + 0.7, CUES.Camion - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Camion + 0.6, CUES.Verde - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Enzima + 0.9, CUES.AlReves - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Apaga + 0.3, CUES.Mata - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.FDA + 1.0, CUES.Pregunta - 0.25, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta - 0.1, CUES.Estudio + 1.4, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Estudio + 4.3, CUES.Fracaso - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Fracaso + 0.4, CUES.Cierre - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="58" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FlavrSavrApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><FlavrSavr /></CompositionStage></div>;
}
window.FlavrSavrApp = FlavrSavrApp;
