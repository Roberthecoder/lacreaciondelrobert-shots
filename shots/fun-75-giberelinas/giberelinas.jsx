// Shot Fungi Mati #75 · Esas uvas sin semilla no se inflaron solas — NARRADO (N1 Por dentro + N5 El experimento).
// Gancho #1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const GB = { uva:'#c3d65a', uva2:'#9fb83a', uva3:'#e4ef9c', tallo:'#7b8a2e', semilla:'#7a4a1e', pulpa:'#e9f2b4', pulpa2:'#d4e48a',
  arroz:'#46b04a', arroz2:'#2f8a35', boba:'#c4cf55', boba2:'#a2ad3c', agua:'#5cc6e8', agua2:'#3aa5cc', lodo:'#8a6a3a',
  acero:'#b9c2cc', acero2:'#8a96a3', acero3:'#e6ebf0', caldo:'#e8c46a', ga:'#F4C25A', della:'#ff3b2f', hifa:'#fff4d6' };

// ---------- racimo de uvas sin semilla (granos alargados, verde-amarillo, tipo 'Thompson Seedless') ----------
const UVAS = (() => { const filas = [5, 6, 6, 5, 5, 4, 3, 2, 1], out = [];
  filas.forEach((n, r) => { for (let i = 0; i < n; i++) out.push([(i - (n - 1) / 2) * 60 + (r % 2 ? 6 : -6), 90 + r * 64, r]); });
  return out; })();
const UVA_GRANDE = 13; // la uva que se infla en el cuadro 0 (fila 2, al centro)
function Grano({ x, y, s = 1, rot = 0, brillo = 0, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={30} ry={42} fill={GB.uva} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={8} cy={10} rx={16} ry={24} fill={GB.uva2} opacity=".45" />
    <ellipse cx={-11} cy={-16} rx={8} ry={13} fill={GB.uva3} opacity=".9" transform="rotate(-18 -11 -16)" />
    {brillo > 0 && <ellipse cx={0} cy={0} rx={38} ry={50} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={brillo} />}
    {gota > 0 && <path d="M 14 -46 Q 26 -28 14 -20 Q 2 -28 14 -46 Z" fill={GB.ga} stroke={KC.ink} strokeWidth={3} opacity={gota} />}
  </g>;
}
function RacimoUva({ T, x, y, s = 1, infla = () => 1, brillo = () => 0, gota = 0 }) {
  const m = mece(T, 3, 0.35) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${m}) scale(${s})`}>
    <path d="M 0 -40 Q 6 -10 0 40 L 0 600" stroke={GB.tallo} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d="M 0 -40 Q -30 -70 -60 -64" stroke={GB.tallo} strokeWidth={10} fill="none" strokeLinecap="round" />
    {UVAS.map(([dx, dy], i) => <line key={'p' + i} x1={0} y1={dy - 50} x2={dx} y2={dy - 20} stroke={GB.tallo} strokeWidth={5} />)}
    {UVAS.map(([dx, dy, r], i) => i === UVA_GRANDE ? null : <Grano key={i} x={dx} y={dy} s={infla(i)} rot={(i % 3 - 1) * 8} brillo={brillo(i)} gota={gota} />)}
    {(() => { const [dx, dy] = UVAS[UVA_GRANDE]; return <Grano x={dx} y={dy} s={infla(UVA_GRANDE)} brillo={brillo(UVA_GRANDE)} gota={gota} />; })()}
  </g>;
}
// Uva partida a lo largo. semillas: true = con semillas de verdad; false = solo rastros diminutos. brillos 0..1 = giberelina.
function UvaCorte({ T, x, y, s = 1, semillas = false, brillos = 0 }) {
  const g = krng(semillas ? 7 : 9);
  const pts = Array.from({ length: semillas ? 16 : 4 }, () => [klerp(-60, 60, g()), klerp(-80, 80, g()), g() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={96} ry={130} fill={GB.uva} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={82} ry={116} fill={GB.pulpa} />
    <ellipse cx={0} cy={0} rx={50} ry={80} fill={GB.pulpa2} opacity=".7" />
    {semillas ? [[-22, -30, -14], [22, -24, 14], [0, 34, 0]].map(([a, b, r], i) =>
      <path key={i} d="M 0 -30 Q 18 -10 14 14 Q 0 30 -14 14 Q -18 -10 0 -30 Z" transform={`translate(${a} ${b}) rotate(${r})`} fill={GB.semilla} stroke={KC.ink} strokeWidth={4} />)
      : [[-8, -20], [10, 4], [-4, 26]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={5} ry={7} fill="#b7a46a" stroke={KC.ink} strokeWidth={2} />)}
    {brillos > 0 && pts.map(([a, b, f], i) => { const o = brillos * (0.5 + 0.5 * Math.sin(T * 4 + f));
      return <path key={'b' + i} d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" transform={`translate(${a} ${b}) scale(${1 + 0.3 * Math.sin(T * 5 + f)})`} fill={GB.ga} stroke={KC.ink} strokeWidth={1.5} opacity={o} />; })}
  </g>;
}
// ---------- arroz ----------
// Plántula de arroz: tallo + hojas largas y delgadas. alto en px; boba 0..1 = enferma (más alta, flaca, amarillenta).
function Plantula({ T, x, y, alto = 240, boba = 0, seed = 1 }) {
  const col = mixHex(GB.arroz, GB.boba, boba), col2 = mixHex(GB.arroz2, GB.boba2, boba);
  const w = klerp(10, 6, boba), m = mece(T, seed, 0.3) * klerp(4, 9, boba);
  const top = -alto, hojas = [[0.35, -1, 0.55], [0.55, 1, 0.5], [0.75, -1, 0.42], [0.9, 1, 0.3]];
  return <g transform={`translate(${x} ${y}) rotate(${m})`}>
    {hojas.map(([k, lado, l], i) => { const hy = top * k, L = alto * l * klerp(1, 0.75, boba);
      return <path key={i} d={`M 0 ${hy} Q ${lado * L * 0.35} ${hy - L * 0.55} ${lado * L * 0.55} ${hy - L * 0.6} Q ${lado * L * 0.3} ${hy - L * 0.42} 0 ${hy + 8} Z`} fill={col} stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" />; })}
    <path d={`M 0 0 L 0 ${top}`} stroke={KC.ink} strokeWidth={w + 6} strokeLinecap="round" />
    <path d={`M 0 0 L 0 ${top}`} stroke={col2} strokeWidth={w} strokeLinecap="round" />
    <path d={`M 0 ${top} Q ${-alto * 0.1} ${top - alto * 0.22} ${-alto * 0.06} ${top - alto * 0.3} Q 0 ${top - alto * 0.12} 0 ${top} Z`} fill={col} stroke={KC.ink} strokeWidth={3.5} />
  </g>;
}
// Arrozal: agua y lodo con una fila de plántulas. enferma = índice de la plántula boba (o -1); boba 0..1; altoBoba px.
function Arrozal({ T, y = 1080, enferma = -1, boba = 0, altoBoba = 600, n = 7, x0 = 110, paso = 140, crece = 1, rociado = 0 }) {
  return <g>
    <rect x={0} y={y} width={KW} height={140} fill={GB.agua} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${-40 + ((T * 30 + k * 160) % 200)} ${y + 30 + k * 34} q 40 -10 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} stroke="#ffffff" strokeWidth={4} fill="none" opacity=".35" />)}
    <rect x={0} y={y + 140} width={KW} height={80} fill={GB.lodo} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => { const es = i === enferma; const alto = klerp(240, es ? altoBoba : 240, es ? boba : 0) * crece + rociado * 0;
      return <Plantula key={i} T={T} x={x0 + i * paso} y={y + 20} alto={alto} boba={es ? boba : 0} seed={i + 2} />; })}
  </g>;
}
// Espiga de arroz con granos vacíos (estéril).
function EspigaVacia({ x, y, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 160 Q 10 60 60 0" stroke={GB.boba2} strokeWidth={8} fill="none" strokeLinecap="round" />
    {[[10, 120, -30], [20, 80, -40], [34, 48, -46], [50, 18, -50], [24, 130, 40], [36, 92, 36], [52, 58, 30]].map(([a, b, r], i) =>
      <ellipse key={i} cx={a} cy={b} rx={9} ry={20} transform={`rotate(${r} ${a} ${b})`} fill="#f0ebc8" stroke={KC.ink} strokeWidth={3} strokeDasharray="5 4" />)}
    {tache > 0 && <path d="M -10 20 L 90 120 M 90 20 L -10 120" stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={tache} />}
  </g>;
}
// ---------- hongo al microscopio (dentro de la Lupa): hifas tabicadas y microconidios ovalados o en mazo ----------
function MicroFusarium({ T, r }) {
  const D = r * 2, k = D / 400;
  const hifas = ['M -20 300 Q 120 260 200 210 Q 280 160 420 150', 'M 60 420 Q 110 330 170 250', 'M 200 210 Q 230 120 210 20', 'M 300 175 Q 340 260 330 420'];
  const sept = [[60, 279], [130, 254], [255, 178], [350, 157], [100, 350], [140, 290], [222, 140], [215, 70], [325, 230], [333, 330]];
  // conidióforos: punta (x, y) y dirección; cadena = microconidios en fila · cabezuela = grupo en la punta
  // conidióforos: base sobre la hifa, ángulo y largo; en la punta, microconidios en cadena corta o en cabezuela
  const conid = [{ bx: 225, by: 120, a: -100, tipo: 'cadena' }, { bx: 130, by: 254, a: -125, tipo: 'cabezuela' }, { bx: 300, by: 166, a: -55, tipo: 'cadena' },
    { bx: 325, by: 262, a: 15, tipo: 'cabezuela' }, { bx: 113, by: 333, a: 170, tipo: 'cadena' }];
  return <svg width={D} height={D} viewBox="0 0 400 400" style={{ position:'absolute', left:0, top:0 }}>
    <rect width={400} height={400} fill="#0b1a24" />
    {hifas.map((d, i) => <path key={i} d={d} stroke={GB.hifa} strokeWidth={9} fill="none" strokeLinecap="round" opacity=".92" />)}
    {sept.map(([a, b], i) => <circle key={'s' + i} cx={a} cy={b} r={3} fill="#0b1a24" />)}
    {conid.map((c, i) => { const ca = Math.cos(c.a * Math.PI / 180), sa = Math.sin(c.a * Math.PI / 180), x = c.bx + ca * 34, y = c.by + sa * 34;
      const conidio = (cx, cy, ang, rx, ry, k) => <ellipse key={k} cx={cx} cy={cy} rx={rx} ry={ry} transform={`rotate(${ang} ${cx} ${cy})`} fill="#fffdf2" stroke="#7fe0ff" strokeWidth={3.5} />;
      return <g key={'c' + i}>
        <line x1={c.bx} y1={c.by} x2={x} y2={y} stroke={GB.hifa} strokeWidth={5} strokeLinecap="round" />
        {c.tipo === 'cadena'
          ? [0, 1, 2].map((j) => { const d = 18 + j * 32 + Math.sin(T * 1.5 + i + j) * 1.5; return conidio(x + ca * d, y + sa * d, c.a, j === 2 ? 17 : 15, 6.5, j); })
          : [-50, -15, 20, 55].map((da, j) => { const aa = (c.a + da) * Math.PI / 180, d = 20 + (j % 2) * 6; return conidio(x + Math.cos(aa) * d, y + Math.sin(aa) * d, c.a + da, j === 1 ? 17 : 13, 6.5, j); })}
      </g>; })}
    {/* barra de 10 µm (1 µm ≈ 6 px en este recuadro) */}
    <rect x={150} y={360} width={60} height={7} rx={3} fill="#fff" />
    <text x={180} y={350} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#fff">10 µm</text>
  </svg>;
}
// ---------- laboratorio de Kurosawa ----------
function Matraz({ x, y, s = 1, caldo = GB.caldo, hongo = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 -220 L -34 -130 L -120 0 Q -126 14 -110 14 L 110 14 Q 126 14 120 0 L 34 -130 L 34 -220 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -86 -50 L 86 -50 L 118 0 Q 122 10 110 10 L -110 10 Q -122 10 -118 0 Z" fill={caldo} stroke={KC.ink} strokeWidth={4} />
    {hongo > 0 && [[-60, -30], [-10, -40], [40, -28], [70, -12], [-80, -8]].map(([a, b], i) =>
      <circle key={i} cx={a} cy={b} r={(16 + (i % 2) * 8) * hongo} fill="#fbf2ea" stroke="#d8b8c8" strokeWidth={3} opacity=".95" />)}
    <rect x={-44} y={-240} width={88} height={26} rx={8} fill="#e6dccb" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Embudo({ x, y, s = 1, gotea = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -120 L 90 -120 L 14 -20 L 14 40 L -14 40 L -14 -20 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -76 -112 L 76 -112 L 0 -30 Z" fill="#fffdf6" stroke={KC.ink} strokeWidth={3} />
    {[-40, 0, 40].map((d) => <line key={d} x1={d * 0.9} y1={-110} x2={d * 0.2} y2={-40} stroke="#d9cfb8" strokeWidth={2} />)}
  </g>;
}
function Frasco({ x, y, s = 1, nivel = 1, color = '#f7e6a6', etiqueta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-170} width={140} height={170} rx={20} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-62} y={-8 - 150 * nivel} width={124} height={150 * nivel} rx={12} fill={color} />
    <rect x={-50} y={-196} width={100} height={30} rx={8} fill="#e6dccb" stroke={KC.ink} strokeWidth={5} />
    {etiqueta && <text x={0} y={-60} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Atomizador con chorro de gotitas hacia la izquierda (ang en grados). spray 0..1 = intensidad; T para mover las gotas.
function Atomizador({ T, x, y, s = 1, spray = 0, ang = 200, color = '#f7e6a6' }) {
  const a = ang * Math.PI / 180;
  return <g>
    {spray > 0 && Array.from({ length: 18 }, (_, i) => { const u = ((T * 1.8 + i / 18) % 1), d = 30 + u * 260, abre = (i % 5 - 2) * 0.09;
      return <circle key={i} cx={x + Math.cos(a + abre) * d * s} cy={y - 40 * s + Math.sin(a + abre) * d * s} r={(5 + (i % 3) * 2) * s} fill={color} stroke={KC.ink} strokeWidth={1.5} opacity={spray * (1 - u)} />; })}
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-50} y={-10} width={100} height={150} rx={22} fill="#7fd6ff" stroke={KC.ink} strokeWidth={6} />
      <rect x={-22} y={-60} width={44} height={56} fill="#e9eef3" stroke={KC.ink} strokeWidth={6} />
      <path d="M -22 -56 L -64 -48 L -64 -34 L -22 -36 Z" fill="#e9eef3" stroke={KC.ink} strokeWidth={5} />
      <path d="M 22 -40 Q 50 -30 40 10" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
  </g>;
}
// Molécula de giberelina, esquemática: esqueleto de cuatro anillos (6-5-6-5, ent-giberelano). p 0..1 dibuja.
function MoleculaGA({ x, y, s = 1, p = 1, color = KC.yellow, rot = 0 }) {
  const poli = (pts) => 'M ' + pts.map((q) => q.join(' ')).join(' L ') + ' Z';
  const hexa = (cx, cy) => poli(Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return [(cx + 44 * Math.cos(a)).toFixed(1), (cy + 44 * Math.sin(a)).toFixed(1)]; }));
  const A = hexa(0, 0), B = poli([[38.1, -22], [38.1, 22], [80, 36], [106, 0], [80, -36]]), C = hexa(144, 0), D = poli([[182.1, -22], [182.1, 22], [222, 34], [246, 0], [222, -34]]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[A, B, C, D].map((d, i) => <path key={i} d={d} fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" opacity={kclamp(p * 4 - i, 0, 1)} />)}
    <path d="M -38 -22 L -70 -40 M 0 44 L 0 80 M 222 -34 L 236 -66" stroke={color} strokeWidth={7} opacity={kclamp(p * 4 - 3, 0, 1)} />
    <circle cx={-78} cy={-46} r={11} fill={KC.red} opacity={kclamp(p * 4 - 3, 0, 1)} />
    <circle cx={0} cy={90} r={11} fill={KC.red} opacity={kclamp(p * 4 - 3, 0, 1)} />
  </g>;
}
// ---------- célula de tallo con frenos (proteínas DELLA) ----------
function Candado({ x, y, s = 1, roto = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - roto * 0.85}>
    <g transform={`translate(${roto * -14} ${roto * -26}) rotate(${roto * -35})`}><path d="M -14 -6 L -14 -22 Q -14 -38 0 -38 Q 14 -38 14 -22 L 14 -6" stroke={KC.ink} strokeWidth={6} fill="none" /></g>
    <g transform={`translate(${roto * 10} ${roto * 18}) rotate(${roto * 20})`}><rect x={-22} y={-8} width={44} height={34} rx={6} fill={GB.della} stroke={KC.ink} strokeWidth={4} />
      <circle cx={0} cy={8} r={5} fill={KC.ink} /></g>
  </g>;
}
// Columna de 3 células: alarga 0..1 (de 150 a 230 px de alto cada una); rotos 0..1.
function CelulasTallo({ T, x, y, alarga = 0, rotos = 0 }) {
  const h = klerp(150, 230, alarga), w = 250;
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((i) => { const yy = -h * (i + 1);
      return <g key={i}>
        <rect x={0} y={yy} width={w} height={h} rx={26} fill="rgba(63,191,74,.25)" stroke="#7fe08a" strokeWidth={7} />
        <ellipse cx={w * 0.3} cy={yy + h * 0.5} rx={26} ry={20} fill="rgba(177,140,255,.5)" stroke="#c9b3ff" strokeWidth={4} />
        {[[0.66, 0.32], [0.62, 0.7]].map(([a, b], j) => <Candado key={j} x={w * a} y={yy + h * b} s={0.95} roto={kclamp(rotos * 2 - (i * 2 + j) * 0.18, 0, 1)} />)}
      </g>; })}
  </g>;
}
// Partículas de giberelina (hexágonos dorados) que llegan desde la izquierda. p 0..1.
function LluviaGA({ T, p = 0, x1 = 120, y0 = 500, y1 = 1100, n = 14 }) {
  if (p <= 0) return null;
  return <g>{Array.from({ length: n }, (_, i) => { const u = kclamp(p * 1.6 - i / n * 0.6, 0, 1), yy = klerp(y0, y1, (i * 0.37) % 1);
    const xx = klerp(-60, x1 + (i % 4) * 60, kEase.sale(u)) + Math.sin(T * 3 + i) * 6;
    return <path key={i} d="M 0 -12 L 10 -6 L 10 6 L 0 12 L -10 6 L -10 -6 Z" transform={`translate(${xx} ${yy}) rotate(${T * 40 + i * 20})`} fill={GB.ga} stroke={KC.ink} strokeWidth={2.5} opacity={u > 0 ? 1 : 0} />; })}</g>;
}
// ---------- báscula ----------
function Bascula({ x, y, s = 1, peso = 0, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={0} width={300} height={90} rx={18} fill="#e6ebf0" stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={22} width={180} height={46} rx={8} fill="#1d2b22" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={58} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#7dff9a">{peso > 0 ? `+${Math.round(peso)} %` : '0 %'}</text>
    <rect x={-120} y={-18} width={240} height={20} rx={8} fill={GB.acero2} stroke={KC.ink} strokeWidth={5} />
    {children}
  </g>;
}
// ---------- rejilla de células de pulpa (mismo número; tam = lado en px) ----------
function Rejilla({ x, y, tam = 92, cols = 4, filas = 5, color = '#ff8fb8', p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), o = kclamp(p * cols * filas - i, 0, 1);
      return <g key={i} opacity={o}><rect x={c * tam} y={f * tam} width={tam - 6} height={tam - 6} rx={tam * 0.28} fill={`${color}55`} stroke={color} strokeWidth={5} />
        <circle cx={c * tam + tam * 0.36} cy={f * tam + tam * 0.42} r={tam * 0.1} fill="rgba(177,140,255,.8)" /></g>; })}
  </g>;
}
// ---------- tanque de fermentación ----------
function Tanque({ T, x, y, s = 1, giro = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-520} width={340} height={560} rx={60} fill={GB.acero} stroke={KC.ink} strokeWidth={8} />
    <path d="M -170 -460 Q 0 -620 170 -460" fill={GB.acero3} stroke={KC.ink} strokeWidth={8} />
    <rect x={-140} y={-500} width={40} height={500} rx={20} fill="#ffffff" opacity=".35" />
    {/* ventana con el caldo, el micelio y burbujas */}
    <rect x={-110} y={-400} width={220} height={300} rx={26} fill={GB.caldo} stroke={KC.ink} strokeWidth={6} />
    <g style={{ clipPath:'inset(0)' }}>
      {Array.from({ length: 7 }, (_, i) => { const a = T * giro * 1.6 + i * 0.9, cx = Math.cos(a) * (40 + (i % 3) * 18), cy = -250 + Math.sin(a * 0.8 + i) * 90;
        return <g key={i} transform={`translate(${cx} ${cy}) rotate(${a * 40})`}>
          <path d="M -26 0 Q -10 -16 0 0 T 26 0 M 0 0 Q 6 14 -4 24 M 10 -2 Q 20 -16 14 -26" stroke="#fbf2ea" strokeWidth={5} fill="none" strokeLinecap="round" /></g>; })}
      {Array.from({ length: 9 }, (_, i) => { const u = (T * 0.7 + i / 9) % 1; return <circle key={'b' + i} cx={-90 + (i * 23) % 180} cy={-110 - u * 280} r={5 + (i % 3) * 3} fill="none" stroke="#ffffff" strokeWidth={3} opacity={1 - u} />; })}
    </g>
    <line x1={0} y1={-560} x2={0} y2={-120} stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 -150) scale(${Math.cos(T * giro * 6)} 1)`}><rect x={-60} y={-8} width={120} height={16} rx={6} fill={GB.acero2} stroke={KC.ink} strokeWidth={4} /></g>
    <rect x={-150} y={40} width={50} height={60} fill={GB.acero2} stroke={KC.ink} strokeWidth={6} /><rect x={100} y={40} width={50} height={60} fill={GB.acero2} stroke={KC.ink} strokeWidth={6} />
    <path d="M 170 -300 L 300 -300 L 300 -235" stroke={KC.ink} strokeWidth={22} fill="none" /><path d="M 170 -300 L 300 -300 L 300 -235" stroke={GB.acero2} strokeWidth={12} fill="none" />
  </g>;
}
function Vial({ x, y, s = 1, nivel = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-48} y={-150} width={96} height={150} rx={14} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-42} y={-6 - 110 * nivel} width={84} height={110 * nivel} rx={10} fill="#fff7d8" />
    <rect x={-52} y={-176} width={104} height={30} rx={8} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    <rect x={-44} y={-110} width={88} height={50} rx={6} fill={KC.paper} stroke={KC.ink} strokeWidth={3} />
    <text x={0} y={-76} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>GA3</text>
  </g>;
}
// ---------- mapas esquemáticos (contornos simplificados a mano) ----------
const proy = (lon0, lat0, k) => ([lon, lat]) => [((lon - lon0) * k).toFixed(1), ((lat0 - lat) * k * 1.25).toFixed(1)];
const IBERIA = [[-9.3,43.0],[-8.0,43.7],[-5.7,43.6],[-3.8,43.45],[-1.8,43.4],[0.0,42.7],[3.2,42.4],[3.0,41.8],[2.2,41.3],[0.9,41.0],[0.2,40.1],[-0.3,39.4],[0.2,38.8],[-0.5,38.3],[-0.7,37.6],[-1.6,37.0],[-2.1,36.7],[-4.4,36.7],[-5.6,36.0],[-6.3,36.5],[-7.4,37.2],[-8.9,37.0],[-8.8,38.5],[-9.5,38.8],[-8.9,40.2],[-8.7,41.8]];
const PORTUGAL = [[-8.9,42.0],[-6.2,41.9],[-6.9,41.0],[-7.0,39.6],[-7.5,39.6],[-7.0,38.2],[-7.5,37.2]];
function MapaEspana({ x, y, ancho = 380, punto = 0 }) {
  const k = ancho / 13, P = proy(-9.6, 43.9, k), d = (pts, z) => 'M ' + pts.map((q) => P(q).join(' ')).join(' L ') + (z ? ' Z' : '');
  const [ax, ay] = P([-0.7, 38.38]);
  return <g transform={`translate(${x} ${y})`}>
    <path d={d(IBERIA, true)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={d(PORTUGAL, false)} stroke="#b89a5a" strokeWidth={4} fill="none" strokeDasharray="10 8" />
    {punto > 0 && <><circle cx={ax} cy={ay} r={18 * kEase.rebote(punto)} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <circle cx={ax} cy={ay} r={18 + 20 * ((punto * 3) % 1)} fill="none" stroke={KC.red} strokeWidth={4} opacity={1 - ((punto * 3) % 1)} /></>}
  </g>;
}
const CALIF = [[-124.2,42.0],[-120.0,42.0],[-120.0,39.0],[-114.6,35.0],[-114.6,32.7],[-117.1,32.5],[-118.5,34.0],[-120.6,34.6],[-121.9,36.6],[-122.5,37.8],[-123.8,39.7],[-124.4,40.4]];
function MapaCalifornia({ x, y, alto = 420, valle = 0 }) {
  const k = alto / (9.5 * 1.25), P = proy(-124.6, 42.2, k);
  const d = 'M ' + CALIF.map((q) => P(q).join(' ')).join(' L ') + ' Z';
  const V = [[-122.2, 39.8], [-121.2, 38.0], [-119.6, 36.4], [-118.9, 35.2]].map(P);
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {valle > 0 && <path d={'M ' + V.map((q) => q.join(' ')).join(' L ')} stroke="#5fbf4a" strokeWidth={34 * valle} strokeLinecap="round" fill="none" opacity=".85" />}
  </g>;
}
// Fila de viñedo en perspectiva simple, con gotitas (rocío) 0..1.
function Vinedo({ T, x, y, w = 540, filas = 4, rocio = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: filas }, (_, f) => { const yy = f * 100, r = kclamp(rocio * filas - f, 0, 1);
      return <g key={f}>
        <line x1={0} y1={yy} x2={w} y2={yy} stroke="#6a4a24" strokeWidth={6} />
        {Array.from({ length: 7 }, (_, i) => <g key={i}><circle cx={30 + i * 80} cy={yy - 26} r={34} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
          <ellipse cx={42 + i * 80} cy={yy + 4} rx={10} ry={16} fill={GB.uva} stroke={KC.ink} strokeWidth={3} />
          {r > 0 && [0, 1, 2].map((j) => { const u = (T * 1.4 + j / 3 + i * 0.13) % 1; return <circle key={j} cx={18 + i * 80 + j * 14} cy={yy - 90 + u * 70} r={5} fill="#bfefff" stroke={KC.ink} strokeWidth={1.5} opacity={r * (1 - u)} />; })}</g>)}
      </g>; })}
  </g>;
}

function GiberelinasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, S: CUES.Sintomas, Ku: CUES.Kurosawa, Y: CUES.Yabuta, F: CUES.Freno, P: CUES.Pregunta, Se: CUES.Semilla,
    E: CUES.Estudio, Ce: CUES.Celulas, Ta: CUES.Tanque, Ca: CUES.California, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // cuadro 0: una uva se infla de golpe
  const inflaG = (i) => (i === UVA_GRANDE ? klerp(0.7, 1.5, kprog(T, K.G + 0.15, K.G + 0.75, kEase.rebote)) : 1);
  const bobaS = kprog(T, K.S + 0.2, K.S + 2.6, kEase.suave);
  const filtro = kprog(T, K.Ku + 1.6, K.Ku + 2.6);
  const spray = kprog(T, K.Ku + 2.8, K.Ku + 3.1) * (1 - kprog(T, K.Ku + 4.4, K.Ku + 4.7));
  const estiraKu = kprog(T, K.Ku + 3.2, K.Ku + 4.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: racimo de uvas sin semilla; una se infla */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <RacimoUva T={T} x={360} y={470} s={1.15} infla={inflaG} brillo={(i) => (i === UVA_GRANDE ? 0.6 + 0.4 * Math.sin(T * 6) : 0) * kprog(T, K.G + 0.6, K.G + 0.9)} />
          <g opacity={kprog(T, K.G + 2.6, K.G + 3.0)}><UvaCorte T={T} x={830} y={900} s={0.95} semillas={false} /></g>
        </>)}
      </Escena>
      {/* 2–3 · el hongo en el arroz: Fusarium fujikuroi y la plántula boba */}
      <Escena T={T} a={K.H} b={K.Ku} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Arrozal T={T} y={1040} enferma={3} boba={bobaS} altoBoba={600} />
          <g opacity={kprog(T, K.S + 2.6, K.S + 3.0)}><EspigaVacia x={90} y={600} s={1.0} tache={kprog(T, K.S + 3.0, K.S + 3.3)} /></g>
        </>)}
      </Escena>
      {/* 4 · el experimento de Kurosawa: caldo filtrado, ya sin hongo, rociado sobre arroz sano */}
      <Escena T={T} a={K.Ku} b={K.Y} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Matraz T={T} x={170} y={1000} s={0.85} hongo={1} />
          <g opacity={kprog(T, K.Ku + 1.2, K.Ku + 1.5)}>
            <Embudo x={420} y={880} s={0.8} />
            <Frasco x={420} y={1030} s={0.75} nivel={0.15 + 0.7 * filtro} etiqueta="sin hongo" />
            {filtro > 0 && filtro < 1 && <circle cx={420} cy={914 + ((T * 4) % 1) * 30} r={7} fill={GB.caldo} stroke={KC.ink} strokeWidth={2} />}
          </g>
          {[0, 1, 2].map((i) => <Plantula key={i} T={T} x={720 + i * 110} y={1080} alto={klerp(200, 330, estiraKu)} seed={i + 9} />)}
          <rect x={640} y={1080} width={380} height={50} rx={10} fill="#8a6a3a" stroke={KC.ink} strokeWidth={6} />
          <g opacity={kprog(T, K.Ku + 2.5, K.Ku + 2.8) * (1 - kprog(T, K.Ku + 4.6, K.Ku + 5.0))}><Atomizador T={T} x={620} y={930} s={0.7} spray={spray} ang={-14} /></g>
        </>)}
      </Escena>
      {/* 5 · Yabuta: la sustancia purificada, la giberelina */}
      <Escena T={T} a={K.Y} b={K.F} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Frasco x={200} y={1100} s={1} nivel={0} />
          {Array.from({ length: 9 }, (_, i) => { const o = kprog(T, K.Y + 0.5 + i * 0.08, K.Y + 0.8 + i * 0.08, kEase.rebote);
            return <path key={i} d="M 0 -16 L 12 0 L 0 16 L -12 0 Z" transform={`translate(${150 + (i % 5) * 26} ${1080 - Math.floor(i / 5) * 26}) scale(${o})`} fill="#fffbe8" stroke={KC.ink} strokeWidth={3} />; })}
          <MoleculaGA x={430} y={950} s={1.45} p={kprog(T, K.Y + 0.9, K.Y + 2.2)} color={KC.ink} rot={Math.sin(T) * 2} />
        </>)}
      </Escena>
      {/* 6 · por dentro: la giberelina rompe los frenos (DELLA) y la célula se estira */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <CelulasTallo T={T} x={130} y={1170} alarga={kprog(T, K.F + 2.7, K.F + 4.6, kEase.suave)} rotos={kprog(T, K.F + 1.7, K.F + 2.9)} />
          <LluviaGA T={T} p={kprog(T, K.F + 0.6, K.F + 2.0)} x1={150} y0={560} y1={1120} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y tus uvas? */}
      <Escena T={T} a={K.P} b={K.Se} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><RacimoUva T={T} x={280} y={640} s={0.95} /><Interrogacion T={T} x={300} y={600} tam={300} /></>)}
      </Escena>
      {/* 8 · con semilla vs sin semilla */}
      <Escena T={T} a={K.Se} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={kprog(T, K.Se, K.Se + 0.4)}><UvaCorte T={T} x={290} y={830} s={1.3} semillas brillos={kprog(T, K.Se + 0.6, K.Se + 1.2)} /></g>
          <g opacity={kprog(T, K.Se + 0.4, K.Se + 0.8)}><UvaCorte T={T} x={770} y={870} s={klerp(1.1, 0.95, kprog(T, K.Se + 2.0, K.Se + 2.8, kEase.suave))} brillos={0.35 * kprog(T, K.Se + 1.0, K.Se + 1.6)} /></g>
        </>)}
      </Escena>
      {/* 9 · el estudio publicado en 2009 (Alicante, España): uva sin semilla rociada, pesa más */}
      <Escena T={T} a={K.E} b={K.Ce} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={kprog(T, K.E + 0.6, K.E + 1.0)}><MapaEspana x={60} y={780} ancho={400} punto={kprog(T, K.E + 1.0, K.E + 3.0)} /></g>
          {(() => { const pe = kprog(T, K.E + 3.4, K.E + 5.4, kEase.suave), on = kprog(T, K.E + 2.4, K.E + 2.8);
            return <g opacity={on}>
              <Bascula x={760} y={1080} s={1.05} peso={pe * 90}>
                <Grano x={0} y={-62} s={klerp(1.0, 1.37, pe)} gota={pe} />
              </Bascula>
              <Atomizador T={T} x={990} y={860} s={0.6} spray={kprog(T, K.E + 2.8, K.E + 3.0) * (1 - kprog(T, K.E + 4.6, K.E + 4.9))} ang={200} />
            </g>; })()}
        </>)}
      </Escena>
      {/* 10 · mismas células, más grandes (fondo oscuro: lo microscópico) */}
      <Escena T={T} a={K.Ce} b={K.Ta} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Rejilla x={80} y={590} tam={92} p={kprog(T, K.Ce + 0.2, K.Ce + 1.0)} color="#9fd7ef" />
          <Rejilla x={560} y={590} tam={92 * 124 / 116} p={kprog(T, K.Ce + 0.6, K.Ce + 1.4)} color={KC.gold2} />
        </>)}
      </Escena>
      {/* 11 · hoy: se fabrica criando el hongo en tanques */}
      <Escena T={T} a={K.Ta} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Tanque T={T} x={360} y={1120} s={1} />
          {(() => { const u = kprog(T, K.Ta + 1.6, K.Ta + 3.4); return <>
            <Goteo T={T} x={660} y0={900} y1={960} cada={0.35} color="#fff7d8" desde={K.Ta + 1.4} hasta={K.Ta + 3.4} r={9} />
            <Vial x={660} y={1130} s={1.1} nivel={u} />
          </>; })()}
        </>)}
      </Escena>
      {/* 12 · para 1962, casi todas las Thompson Seedless de mesa de California se rociaban */}
      <Escena T={T} a={K.Ca} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={kprog(T, K.Ca + 1.6, K.Ca + 2.0)}><MapaCalifornia x={60} y={760} alto={400} valle={kprog(T, K.Ca + 2.2, K.Ca + 3.0)} /></g>
          <g opacity={kprog(T, K.Ca + 1.8, K.Ca + 2.2)}><Vinedo T={T} x={470} y={830} w={560} filas={4} rocio={kprog(T, K.Ca + 2.4, K.Ca + 4.2)} /></g>
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo racimo del inicio, ahora "leído" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.4)}><Plantula T={T} x={620} y={1120} alto={560} boba={1} seed={4} /></g>
          <RacimoUva T={T} x={360} y={470} s={1.15} infla={(i) => (i === UVA_GRANDE ? 1.5 : 1)}
            brillo={(i) => (i === UVA_GRANDE ? 0.6 + 0.4 * Math.sin(T * 6) : 0)} gota={kprog(T, K.C + 1.6, K.C + 2.4)} />
          <UvaCorte T={T} x={830} y={900} s={0.95} brillos={kprog(T, K.C + 2.4, K.C + 3.0)} />
        </>)}
      </Escena>

      {/* ---------- textos ---------- */}
      {/* gancho */}
      <Etq T={T} at={K.G + 3.0} until={K.H - 0.3} x={700} y={1070} texto="sin semilla" tam={30} color={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.H - 0.3} texto="¿la agrandó un hongo?" x={330} y={420} tam={36} borde={KC.gold} />
      {/* hongo */}
      <Etq T={T} at={K.H + 0.4} until={K.S - 0.3} x={50} y={440} texto="Fusarium fujikuroi" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.H + 0.9} until={K.S - 0.3} texto="bakanae · «plántula boba»" x={290} y={530} tam={32} borde={KC.gold} />
      <Lupa T={T} at={K.H + 0.5} until={K.S - 0.25} x={770} y={640} r={200} fx={530} fy={1010} tinte={KC.cyan} interior={(t, r) => <MicroFusarium T={t} r={r} />} etiqueta="hifas y microconidios" />
      {/* síntomas */}
      <Etq T={T} at={K.S + 1.2} until={K.Ku - 0.3} x={515} y={520} lado="izq" texto="enferma" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 1.5} until={K.Ku - 0.3} x={515} y={570} lado="izq" texto="alta, flaca, amarillenta" tam={24} color={KC.ink} />
      <Etq T={T} at={K.S + 1.6} until={K.Ku - 0.3} x={950} y={760} texto="sana" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.S + 3.0} until={K.Ku - 0.3} x={200} y={690} texto="espiga vacía" tam={28} color={KC.ink} />
      {/* Kurosawa */}
      <TarjetaEstudio T={T} at={K.Ku + 0.2} until={K.Y - 0.3} anio="1926" quien="Eiichi Kurosawa" revista="el caldo filtrado del hongo" x={330} y={560} />
      <Chip T={T} at={K.Ku + 3.7} until={K.Y - 0.3} texto="lo que estiraba al arroz era algo que el hongo soltaba" x={540} y={760} tam={27} borde={KC.gold} />
      {/* Yabuta */}
      <TarjetaEstudio T={T} at={K.Y + 0.2} until={K.F - 0.3} anio="1935" quien="Teijiro Yabuta · U. de Tokio" revista="la purificó y la llamó giberelina" x={540} y={560} />
      <Etq T={T} at={K.Y + 1.8} until={K.F - 0.3} x={560} y={820} texto="giberelina (esquema)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Y + 2.2} until={K.F - 0.3} x={340} y={1120} texto="nombre viejo del hongo:" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Y + 2.4} until={K.F - 0.3} x={340} y={1165} texto="Gibberella fujikuroi" it tam={28} color={KC.ink} />
      {/* freno */}
      <Chip T={T} at={K.F + 0.1} until={K.P - 0.3} texto="las plantas también la hacen" x={340} y={420} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.F + 0.7} until={K.P - 0.3} x={400} y={760} texto="giberelina" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.F + 1.3} until={K.P - 0.3} x={400} y={860} texto="DELLA = freno" tam={30} color={GB.della} />
      <Etq T={T} at={K.F + 3.2} until={K.P - 0.3} x={400} y={960} texto="la célula se estira" tam={30} color="#7fe08a" />
      {/* semilla */}
      <Chip T={T} at={K.Se + 0.5} until={K.E - 0.3} texto="con semilla" x={290} y={1080} tam={32} borde={GB.semilla} />
      <Chip T={T} at={K.Se + 1.0} until={K.E - 0.3} texto="sin semilla: poca giberelina" x={720} y={1080} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Se + 2.2} until={K.E - 0.3} texto="suele quedarse chica" x={720} y={600} tam={32} borde={KC.red} />
      {/* estudio */}
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.3} anio="2009" quien="Casanova y col. · España" revista="Span. J. Agric. Res. · uva 'Emperatriz'" x={540} y={560} />
      <Etq T={T} at={K.E + 1.4} until={K.Ce - 0.3} x={300} y={1010} texto="Alicante" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.E + 2.6} until={K.Ce - 0.3} valor={90} desde={50} dur={2.2} prefijo="+50 a " sufijo=" %" etiqueta="más peso por uva" x={360} y={560} tam={110} color={KC.leaf} />
      <Chip T={T} at={K.E + 4.6} until={K.Ce - 0.3} texto="según el año" x={360} y={700} tam={30} borde={KC.ink} />
      {/* células */}
      <Chip T={T} at={K.Ce + 0.1} until={K.Ta - 0.3} texto="POR DENTRO · LA PULPA" x={540} y={430} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ce + 0.5} until={K.Ta - 0.3} x={80} y={540} texto="sin tratar · 116 µm" tam={28} color="#9fd7ef" />
      <Etq T={T} at={K.Ce + 0.9} until={K.Ta - 0.3} x={560} y={540} texto="con GA3 · 124 µm" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Ce + 1.6} until={K.Ta - 0.3} texto="mismo número · células más grandes" x={540} y={1130} tam={30} borde={KC.gold} />
      {/* tanque */}
      <Chip T={T} at={K.Ta + 0.3} until={K.Ca - 0.3} texto="como la penicilina" x={330} y={430} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Ta + 0.8} until={K.Ca - 0.3} x={1040} y={700} lado="izq" texto="Fusarium fujikuroi" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ta + 1.1} until={K.Ca - 0.3} x={1040} y={750} lado="izq" texto="en caldo, en un tanque" tam={24} color={KC.ink} />
      {/* California */}
      <TarjetaEstudio T={T} at={K.Ca + 0.1} until={K.Ca + 1.8} anio="1957" quien="Robert J. Weaver · UC Davis" revista="primeras pruebas en uvas" x={540} y={560} />
      <Chip T={T} at={K.Ca + 2.0} until={K.C - 0.3} texto="1962: casi todas" x={330} y={560} tam={54} borde={KC.gold} />
      <Etq T={T} at={K.Ca + 2.4} until={K.C - 0.3} x={60} y={680} texto="Thompson Seedless de mesa" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.6} until={K.C - 0.3} x={150} y={1200} texto="California" tam={28} color={KC.ink} />
      {/* cierre */}
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="la hormona de un hongo" x={330} y={420} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={640} y={1090} texto="la plántula boba" tam={26} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={230} y={1430} />
      <BarraEscala T={T} at={K.H} until={K.Ku} texto="10 cm" largo={160} y={1430} />
      <BarraEscala T={T} at={K.Ku} until={K.Y} texto="10 cm" largo={160} y={1430} />
      <BarraEscala T={T} at={K.Y} until={K.F} texto="molécula esquemática" largo={0} y={1430} />
      <BarraEscala T={T} at={K.F} until={K.P} texto="20 µm" largo={130} y={1430} />
      <BarraEscala T={T} at={K.P} until={K.Se} texto="5 cm" largo={190} y={1430} />
      <BarraEscala T={T} at={K.Se} until={K.E} texto="1 cm" largo={110} y={1430} />
      <BarraEscala T={T} at={K.E} until={K.Ce} texto="mapa esquemático" largo={0} y={1430} />
      <BarraEscala T={T} at={K.Ce} until={K.Ta} texto="100 µm" largo={79} y={1430} />
      <BarraEscala T={T} at={K.Ta} until={K.Ca} texto="tanque esquemático" largo={0} y={1430} />
      <BarraEscala T={T} at={K.Ca} until={K.C} texto="mapa esquemático" largo={0} y={1430} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={230} y={1430} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No se inflaron solas: *la hormona de un hongo.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.S - 0.1} texto="_Fusarium fujikuroi:_ la *plántula boba.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.Ku - 0.1} texto="Altas, flacas y *estériles.*" />
      <Subtitulo T={T} idx={3} at={K.Ku + 0.1} until={K.Y - 0.1} texto="1926: el caldo filtrado *también las estiró.*" />
      <Subtitulo T={T} idx={4} at={K.Y + 0.1} until={K.F - 0.1} texto="1935: la llamó *giberelina.*" />
      <Subtitulo T={T} idx={5} at={K.F + 0.1} until={K.P - 0.1} texto="Rompe el freno y *la célula se estira.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Se - 0.1} texto="¿Y *tus uvas?*" />
      <Subtitulo T={T} idx={7} at={K.Se + 0.1} until={K.E - 0.1} texto="Sin semillas, *poca giberelina.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Ce - 0.1} texto="Rociadas: *de 50 a 90 % más peso.*" />
      <Subtitulo T={T} idx={9} at={K.Ce + 0.1} until={K.Ta - 0.1} texto="No más células: *células más grandes.*" />
      <Subtitulo T={T} idx={10} at={K.Ta + 0.1} until={K.Ca - 0.1} texto="Se fabrica *criando al hongo.*" />
      <Subtitulo T={T} idx={11} at={K.Ca + 0.1} until={K.C - 0.1} texto="1962: *casi todas* ya se rociaban." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Las infló *la hormona de un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.S + 1.0, K.Ku - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ku + 1.5, K.Y - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.F + 1.0, K.P - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Se + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.6, K.Ce - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ta + 0.5, K.Ca - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ca + 2.0, K.C - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="75" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GiberelinasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GiberelinasShot /></CompositionStage></div>;
}
window.GiberelinasApp = GiberelinasApp;
