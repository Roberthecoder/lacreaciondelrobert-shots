// Shot Fungi Mati #127 · Ese olor a hongo no es tierra: lo firma una molécula — NARRADO (N1 Por dentro, gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const OH = { tabla:'#d9a86a', tabla2:'#b9864a', mazo:'#8a6a4a', oro:'#F4C25A', ox:'#ff3b2f', vaca:'#f4efe4', mancha:'#2b2420', mosco:'#3a3430' };

// Cadena en zigzag (esqueleto). n carbonos desde (x, y); paso dx; amplitud a. Devuelve puntos.
const zig = (n, x, y, dx = 56, a = 32, dir = 1) => Array.from({ length: n }, (_, i) => [x + i * dx * dir, y - (i % 2 ? a : 0)]);
const linea = (pts) => 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');

// 1-octen-3-ol: 8 carbonos, doble enlace C1=C2, –OH en C3. forma: 'R' (cuña) | 'S' (rayado) | null. p 0..1 se dibuja.
function Octenol({ x, y, s = 1, p = 1, color = KC.ink, oh = OH.ox, brillo = 0, forma = null, espejo = false, num = false }) {
  const pts = zig(8, 0, 0, 56, 32);
  const k = Math.max(1, Math.ceil(8 * kclamp(p, 0, 1)));
  const v = pts.slice(0, k);
  const c3 = pts[2], ohY = c3[1] + 78;
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${18 * brillo}px ${OH.oro})` } : null}>
    <path d={linea(v)} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {k >= 2 && <line x1={pts[0][0] + 6} y1={pts[0][1] - 16} x2={pts[1][0] - 4} y2={pts[1][1] - 18} stroke={color} strokeWidth={8} strokeLinecap="round" />}
    {k >= 3 && (forma === 'S'
      ? Array.from({ length: 6 }, (_, i) => { const u = (i + 1) / 7, w = 4 + 12 * u; return <line key={i} x1={c3[0] - w} y1={c3[1] + 70 * u} x2={c3[0] + w} y2={c3[1] + 70 * u} stroke={color} strokeWidth={6} />; })
      : forma === 'R'
        ? <path d={`M ${c3[0]} ${c3[1]} L ${c3[0] - 16} ${c3[1] + 70} L ${c3[0] + 16} ${c3[1] + 70} Z`} fill={color} />
        : <line x1={c3[0]} y1={c3[1]} x2={c3[0]} y2={c3[1] + 62} stroke={color} strokeWidth={10} strokeLinecap="round" />)}
    {k >= 3 && <g transform={`translate(${c3[0]} ${ohY + 22}) scale(${espejo ? -1 : 1} 1)`}><circle r={34} fill={oh} stroke={KC.ink} strokeWidth={6} />
      <text y={12} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">OH</text></g>}
    {num && pts.slice(0, k).map((q, i) => <text key={i} x={q[0]} y={q[1] - (i % 2 ? 22 : -40)} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={color} opacity=".7" transform={espejo ? `scale(-1 1) translate(${-2 * q[0]} 0)` : null}>{i + 1}</text>)}
  </g>;
}
// Ácido linoleico esquemático: 18 C, COOH a la izquierda, dobles enlaces 9 y 12. corte 0..1 separa los últimos 8 C (cola).
function Linoleico({ T, x, y, dx = 50, p = 1, color = '#eafff7', ox = 0, corte = 0, colaO = 1 }) {
  const pts = zig(18, x, y, dx, 30);
  const k = Math.max(2, Math.ceil(18 * kclamp(p, 0, 1)));
  const cab = pts.slice(0, Math.min(k, 10)), cola = k > 10 ? pts.slice(9, k) : [];
  const dbl = (i) => { const a = pts[i], b = pts[i + 1]; const nx = (b[1] - a[1]), ny = -(b[0] - a[0]), L = Math.hypot(nx, ny); return <line key={i} x1={a[0] + nx / L * 14 + (b[0] - a[0]) * 0.15} y1={a[1] + ny / L * 14 + (b[1] - a[1]) * 0.15} x2={b[0] + nx / L * 14 - (b[0] - a[0]) * 0.15} y2={b[1] + ny / L * 14 - (b[1] - a[1]) * 0.15} stroke={color} strokeWidth={6} strokeLinecap="round" />; };
  const sep = corte * 60;
  return <g>
    <g transform={`translate(${-sep * 0.6} ${sep * 0.5})`} opacity={1 - corte * 0.55}>
      <path d={linea(cab)} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {k > 9 && dbl(8)}
      <g transform={`translate(${pts[0][0] - 46} ${pts[0][1] + 6})`}><rect x={-46} y={-26} width={92} height={52} rx={14} fill="#2a3346" stroke={color} strokeWidth={4} />
        <text y={10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={color}>COOH</text></g>
      {ox > 0 && <g transform={`translate(${pts[9][0]} ${pts[9][1] - 70 * ox})`} opacity={ox}>
        <circle cx={-14} r={20} fill={OH.ox} stroke={KC.ink} strokeWidth={4} /><circle cx={16} r={20} fill={OH.ox} stroke={KC.ink} strokeWidth={4} />
        <line x1={0} y1={22} x2={0} y2={58 * ox} stroke={OH.ox} strokeWidth={6} /></g>}
    </g>
    {cola.length > 1 && <g transform={`translate(${sep} ${-sep * 1.6})`} opacity={colaO} style={corte > 0 ? { filter:`drop-shadow(0 0 ${20 * corte}px ${OH.oro})` } : null}>
      <path d={linea(cola)} stroke={corte > 0.3 ? mixHex(color, OH.oro, corte) : color} strokeWidth={9 + corte * 3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {k > 12 && dbl(11)}
    </g>}
  </g>;
}
// Enzima esquemática (boca de "pac-man"): abre 0..1.
function Enzima({ T, x, y, r = 80, color = KC.lilac, abre = 0.5, rot = 0, texto }) {
  const a = 0.15 + 0.5 * abre + 0.12 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M 0 0 L ${r * Math.cos(a)} ${-r * Math.sin(a)} A ${r} ${r} 0 1 0 ${r * Math.cos(a)} ${r * Math.sin(a)} Z`} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-r * 0.2} cy={-r * 0.45} r={r * 0.1} fill={KC.ink} />
    {texto && <text x={-r * 0.1} y={r + 46} textAnchor="middle" transform={`rotate(${-rot})`} style={{ font:`700 30px ${KF.mono}` }} fill={color}>{texto}</text>}
  </g>;
}
// Tabla de picar.
function Tabla({ x, y, w = 760, h = 120 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={h} rx={26} fill={OH.tabla} stroke={KC.ink} strokeWidth={8} />
    {[30, 62, 92].map((yy, i) => <path key={i} d={`M ${-w / 2 + 40} ${yy} Q 0 ${yy - 10} ${w / 2 - 40} ${yy + 4}`} stroke={OH.tabla2} strokeWidth={5} fill="none" />)}
    <circle cx={w / 2 - 50} cy={h / 2} r={16} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Mazo de mortero: punta en (x, y).
function Mazo({ x, y, rot = -18 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M -46 0 Q -50 -60 -30 -110 L -18 -380 Q 0 -400 18 -380 L 30 -110 Q 50 -60 46 0 Q 0 22 -46 0 Z" fill="#efe6d6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -20 -60 Q -24 -200 -8 -360" stroke="#fff" strokeWidth={8} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
// Champiñón machacado: m 0..1 (0 entero → 1 aplastado con pedacitos).
function ChampMachacado({ T, x, y, s = 1, m = 0 }) {
  const sy = 1 - 0.42 * m, sx = 1 + 0.25 * m, g = krng(9);
  const migas = Array.from({ length: 14 }, () => ({ dx: (g() - 0.5) * 520, dy: -g() * 60, r: 10 + g() * 20, rot: g() * 360 }));
  return <g>
    <g transform={`translate(${x} ${y}) scale(${sx} ${sy}) translate(${-x} ${-y})`}><Champinon x={x} y={y} s={s} crece={1} abre={0.55} /></g>
    {m > 0 && migas.map((q, i) => <ellipse key={i} cx={x + q.dx * m} cy={y + q.dy * m - 8} rx={q.r} ry={q.r * 0.6} transform={`rotate(${q.rot} ${x + q.dx * m} ${y + q.dy * m - 8})`} fill={i % 3 ? '#efe2cc' : '#7a4a3a'} stroke={KC.ink} strokeWidth={4} opacity={kclamp(m * 3, 0, 1)} />)}
  </g>;
}
// Volutas de olor que suben. p 0..1.
function Volutas({ T, x, y, p = 1, n = 4, alto = 380, color = OH.oro }) {
  return <g opacity={p}>{Array.from({ length: n }, (_, i) => { const dx = (i - (n - 1) / 2) * 70, ph = T * 2 + i;
    const d = `M ${x + dx} ${y} C ${x + dx + 40 * Math.sin(ph)} ${y - alto * 0.3}, ${x + dx - 40 * Math.sin(ph + 1)} ${y - alto * 0.6}, ${x + dx + 30 * Math.sin(ph + 2)} ${y - alto * p}`;
    return <path key={i} d={d} stroke={color} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.85} strokeDasharray="40 22" strokeDashoffset={-T * 60} />; })}</g>;
}
// Geosmina esquemática: dos anillos fusionados + OH + metilos.
function Geosmina({ x, y, s = 1, color = KC.ink }) {
  const hexa = (cx) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 52 * Math.cos(a)).toFixed(1)} ${(52 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={hexa(0)} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" /><path d={hexa(90)} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" />
    <line x1={45} y1={-26} x2={45} y2={-80} stroke={color} strokeWidth={8} /><line x1={45} y1={26} x2={45} y2={80} stroke={color} strokeWidth={8} />
    <circle cx={45} cy={108} r={30} fill={OH.ox} stroke={KC.ink} strokeWidth={5} /><text x={45} y={119} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#fff">OH</text>
    <line x1={135} y1={-26} x2={180} y2={-52} stroke={color} strokeWidth={8} />
  </g>;
}
// Tierra con gotas (para el contraste).
function TierraMojada({ T, x, y, w = 360 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} 0 Q 0 -30 ${w / 2} 0 L ${w / 2} 90 L ${-w / 2} 90 Z`} fill="#6b4a32" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4].map((i) => { const u = ((T * 0.9 + i * 0.21) % 1); return <path key={i} d={`M ${-w / 2 + 40 + i * 70} ${-220 + u * 200} q -12 22 0 30 q 12 -8 0 -30 Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.6} />; })}
  </g>;
}
// Mano esquemática (palma de frente, pulgar a un lado). espejo = mano izquierda.
function Mano({ x, y, s = 1, espejo = false, color = '#f2c9a0' }) {
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`}>
    <path d="M -60 80 L -60 -40 Q -60 -60 -44 -60 Q -30 -60 -30 -40 L -30 -110 Q -30 -128 -14 -128 Q 2 -128 2 -110 L 2 -126 Q 2 -144 18 -144 Q 34 -144 34 -126 L 34 -110 Q 34 -126 50 -126 Q 66 -126 66 -108 L 66 -90 Q 66 -104 80 -104 Q 96 -104 96 -86 L 96 20 Q 96 60 70 90 L 70 120 L -40 120 L -40 100 Q -60 90 -60 80 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -10 Q -110 -40 -112 -70 Q -110 -92 -88 -86 Q -60 -60 -50 -40" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Moho (pelusa) y pasto (iconos de olor).
function Moho({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: 7 }, (_, i) => { const a = i * 0.9; return <circle key={i} cx={Math.cos(a) * 30 * (i % 3)} cy={Math.sin(a) * 22 * (i % 3)} r={26 - (i % 3) * 4} fill={i % 2 ? '#9fbf8a' : '#e9efe2'} stroke={KC.ink} strokeWidth={4} />; })}
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={-50 + i * 11} y1={-20} x2={-56 + i * 12} y2={-58 - (i % 3) * 8} stroke="#dfe8d4" strokeWidth={3} />)}</g>;
}
function Pasto({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{Array.from({ length: 7 }, (_, i) => { const bx = -60 + i * 20, sw = Math.sin(T * 2 + i) * 8;
    return <path key={i} d={`M ${bx} 0 Q ${bx + sw} -50 ${bx + 10 + sw * 2} ${-90 - (i % 3) * 20} Q ${bx + 10} -40 ${bx + 14} 0 Z`} fill={i % 2 ? KC.leaf : '#2e9a3a'} stroke={KC.ink} strokeWidth={4} />; })}</g>;
}
// Vaca esquemática de perfil (mira a la izquierda).
function Vaca({ T, x, y, s = 1 }) {
  const c = Math.sin(T * 1.6) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-120, 0], [-70, 6], [90, 0], [140, 6]].map(([lx, d], i) => <rect key={i} x={lx} y={60} width={34} height={130 - d} rx={10} fill={OH.vaca} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-170} y={-70} width={360} height={170} rx={70} fill={OH.vaca} stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 -66 Q -10 -10 -60 40 Q -100 30 -110 -20 Q -90 -60 -40 -66 Z" fill={OH.mancha} /><path d="M 90 -40 Q 140 -20 120 40 Q 70 50 60 0 Q 60 -40 90 -40 Z" fill={OH.mancha} />
    <path d={`M 190 -30 Q 230 ${10 + c} 226 80`} stroke={KC.ink} strokeWidth={8} fill="none" /><circle cx={226} cy={86} r={12} fill={OH.mancha} />
    <g transform={`translate(-190 -60) rotate(${c})`}>
      <rect x={-90} y={-50} width={130} height={120} rx={46} fill={OH.vaca} stroke={KC.ink} strokeWidth={8} />
      <rect x={-104} y={10} width={90} height={66} rx={30} fill="#f3a3a8" stroke={KC.ink} strokeWidth={7} />
      <circle cx={-80} cy={42} r={7} fill={KC.ink} /><circle cx={-46} cy={42} r={7} fill={KC.ink} /><circle cx={-30} cy={-14} r={9} fill={KC.ink} />
      <path d="M -10 -46 L 6 -86 L 20 -44" fill="#e9dcc0" stroke={KC.ink} strokeWidth={6} /><path d="M 10 -20 L 60 -40 L 40 0 Z" fill={OH.vaca} stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}
// Mosca tsetsé (alas plegadas una sobre otra, como tijeras cerradas) vista desde arriba. ang = hacia dónde vuela (grados).
function Tsetse({ T, x, y, s = 1, ang = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 0 -6 L 70 -2 L 70 4 L 0 8 Z" fill="rgba(220,235,255,.75)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${4 + Math.sin(T * 40) * 2})`} />
    <path d="M 0 -6 L 70 -2 L 70 4 L 0 8 Z" fill="rgba(220,235,255,.75)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${-4 - Math.sin(T * 40) * 2})`} />
    <ellipse cx={10} cy={0} rx={30} ry={13} fill="#8a6a3a" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-26} cy={0} r={13} fill="#6a4a2a" stroke={KC.ink} strokeWidth={4} /><line x1={-38} y1={0} x2={-62} y2={0} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Mosco (zancudo) de perfil. ang en grados.
function Mosco({ T, x, y, s = 1, ang = 0, seed = 1 }) {
  const al = Math.sin(T * 60 + seed) * 18;
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    {[-16, -2, 12].map((lx, i) => <path key={i} d={`M ${lx} 6 L ${lx - 14 + i * 8} 46 L ${lx - 22 + i * 12} 70`} stroke={KC.ink} strokeWidth={3} fill="none" />)}
    <ellipse cx={-10} cy={-22} rx={34} ry={12} fill="rgba(220,235,255,.7)" stroke={KC.ink} strokeWidth={3} transform={`rotate(${-20 + al} 0 0)`} />
    <ellipse cx={22} cy={4} rx={36} ry={8} fill={OH.mosco} stroke={KC.ink} strokeWidth={3} transform="rotate(-12 22 4)" />
    <ellipse cx={-14} cy={0} rx={16} ry={11} fill={OH.mosco} stroke={KC.ink} strokeWidth={3} />
    <circle cx={-34} cy={-2} r={9} fill={OH.mosco} stroke={KC.ink} strokeWidth={3} /><line x1={-42} y1={0} x2={-82} y2={10} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Trampa de moscos: cilindro con ventilador, frasquito de octenol y tanque de CO2 a un lado.
function Trampa({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={150} y={-40} width={90} height={250} rx={40} fill="#c9d6e0" stroke={KC.ink} strokeWidth={7} /><text x={195} y={100} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>CO₂</text>
    <path d="M 150 20 Q 90 10 70 -10" stroke={KC.ink} strokeWidth={6} fill="none" />
    <rect x={-80} y={-60} width={160} height={180} rx={20} fill="#3a3f4a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-60} rx={80} ry={22} fill="#59606e" stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => <line key={i} x1={0} y1={-60} x2={60 * Math.cos(T * 9 + i * 2.1)} y2={-60 + 16 * Math.sin(T * 9 + i * 2.1)} stroke="#aab" strokeWidth={6} />)}
    <rect x={-40} y={10} width={80} height={60} rx={10} fill={OH.oro} stroke={KC.ink} strokeWidth={5} /><text x={0} y={50} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>octenol</text>
    <rect x={-50} y={120} width={100} height={140} rx={12} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Brazo con sudor (horizontal) y boca que exhala CO2.
function Brazo({ T, x, y, s = 1, sudor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -60 L 420 -50 Q 470 -48 470 0 Q 470 48 420 50 L -40 60 Z" fill="#e8b48a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 470 -20 q 50 -10 60 10 q 4 22 -40 30" fill="#e8b48a" stroke={KC.ink} strokeWidth={7} />
    {sudor > 0 && [60, 150, 240, 330, 400].map((dx, i) => { const u = ((T * 0.6 + i * 0.3) % 1); return <path key={i} d={`M ${dx} ${-52 + u * 30} q -10 18 0 26 q 10 -8 0 -26 Z`} fill="#9fe0ff" stroke={KC.ink} strokeWidth={3} opacity={sudor * (1 - u * 0.5)} />; })}
  </g>;
}

function OlorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Ge: CUES.Geosmina, Co: CUES.Corte, Gr: CUES.Grasa, Ox: CUES.Oxigenasa, Li: CUES.Liasa, U: CUES.Umbral, P: CUES.Pregunta, E: CUES.Espejo, F: CUES.Formas, Es: CUES.Estudio, M: CUES.Moscos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // golpes del mazo en el gancho y en el corte
  const golpe = (t0) => { const u = (T - t0); if (u < 0 || u > 0.7) return 0; return u < 0.18 ? u / 0.18 : 1 - (u - 0.18) / 0.52; };
  const mazoG = Math.max(golpe(K.G + 0.25), golpe(K.G + 1.05));
  const machG = kprog(T, K.G + 0.35, K.G + 0.5) * 0.45 + kprog(T, K.G + 1.15, K.G + 1.3) * 0.35;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el mazo machaca el champiñón y sube el olor, que se dibuja como una molécula */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={420} y={980} />
          <ChampMachacado T={T} x={420} y={985} s={1.4} m={machG} />
          {T < K.G + 2 && <Mazo x={430 + 30 * (1 - mazoG)} y={klerp(500, 740, mazoG) - 300 * kprog(T, K.G + 1.6, K.G + 2)} />}
          <Volutas T={T} x={420} y={820} p={kprog(T, K.G + 0.5, K.G + 2.2)} alto={200} />
          <g opacity={kprog(T, K.G + 2.0, K.G + 2.6)}><Octenol x={130} y={580} s={1.0} p={kprog(T, K.G + 2.0, K.G + 3.2)} brillo={0.6} /></g>
        </>)}
      </Escena>
      {/* 2 · el nombre: 1-octen-3-ol */}
      <Escena T={T} a={K.N} b={K.Ge} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<><Octenol x={170} y={900} s={1.4} p={1} num brillo={0.5 + 0.2 * Math.sin(T * 3)} /></>)}
      </Escena>
      {/* 3 · contraste: la tierra mojada es geosmina */}
      <Escena T={T} a={K.Ge} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <TierraMojada T={T} x={270} y={1080} w={380} />
          <g opacity={kprog(T, K.Ge + 0.2, K.Ge + 0.7)}><Geosmina x={190} y={820} s={1} /></g>
          <text x={540} y={880} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Ge + 0.8, K.Ge + 1.1)}>≠</text>
          <g opacity={kprog(T, K.Ge + 0.9, K.Ge + 1.4)}><ChampMachacado T={T} x={810} y={1100} s={0.9} m={0} /><Octenol x={650} y={880} s={0.62} p={1} /></g>
        </>)}
      </Escena>
      {/* 4–7 · por dentro: células rotas, ácido linoleico, dioxigenasa, liasa */}
      <Escena T={T} a={K.Co} b={K.U} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.Gr - 0.2, K.Gr + 0.6) }}>
          <HifasMicro T={T} g={0.4 + 0.6 * kprog(T, K.Co - 0.3, K.Co + 1.0)} comida={{ x: -600, y: -600 }} />
        </div>
        {fsvg(<>
          {/* golpe: las paredes de las hifas se rompen */}
          {T < K.Gr + 0.6 && Array.from({ length: 16 }, (_, i) => { const u = kprog(T, K.Co + 1.2, K.Co + 2.6); const a = i * 0.4, r = 40 + u * 260;
            return <circle key={i} cx={520 + Math.cos(a) * r} cy={960 + Math.sin(a) * r * 0.8} r={10 - u * 4} fill={i % 2 ? KC.yellow : '#eafff7'} opacity={u * (1 - kprog(T, K.Gr, K.Gr + 0.6))} />; })}
          {T < K.Gr + 0.6 && <g opacity={kprog(T, K.Co + 1.1, K.Co + 1.3) * (1 - kprog(T, K.Gr, K.Gr + 0.6))}>
            <path d="M 470 900 L 510 950 L 480 990 L 530 1040" stroke={KC.red} strokeWidth={10} fill="none" strokeLinejoin="round" />
            <path d="M 600 860 L 570 920 L 620 960" stroke={KC.red} strokeWidth={10} fill="none" strokeLinejoin="round" /></g>}
          {T > K.Gr - 0.3 && <g opacity={kprog(T, K.Gr - 0.3, K.Gr + 0.3)}>
            <Linoleico T={T} x={150} y={960} p={kprog(T, K.Gr, K.Gr + 1.4)} ox={kprog(T, K.Ox + 0.3, K.Ox + 1.0, kEase.rebote)} corte={kprog(T, K.Li + 1.0, K.Li + 2.0, kEase.sale)} />
          </g>}
          {/* dioxigenasa */}
          {T > K.Gr + 1.6 && <Enzima T={T} x={klerp(1200, 620, kprog(T, K.Gr + 1.6, K.Ox + 0.2, kEase.sale)) + 700 * kprog(T, K.Li, K.Li + 0.8, kEase.suave)} y={780} r={70} color={KC.lilac} rot={180} texto="dioxigenasa" abre={kprog(T, K.Ox, K.Ox + 0.4)} />}
          {/* liasa */}
          {T > K.Li - 0.2 && <Enzima T={T} x={klerp(1250, 680, kprog(T, K.Li - 0.2, K.Li + 0.9, kEase.sale))} y={1080} r={74} color={KC.mint} rot={-150} texto="liasa" abre={1 - kprog(T, K.Li + 0.9, K.Li + 1.1)} />}
          {T > K.Li + 1.1 && <text x={830} y={760} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={OH.oro} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Li + 1.6, K.Li + 2.0)}>8 C</text>}
        </>)}
      </Escena>
      {/* 8 · umbral: una molécula entre mil millones (en agua) */}
      <Escena T={T} a={K.U} b={K.P} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {(() => { const z = kprog(T, K.U + 0.4, K.U + 1.6, kEase.suave), g = krng(3);
            return <g>
              <g opacity={1 - z}><rect x={380} y={760} width={320} height={420} rx={30} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={9} /><rect x={392} y={860} width={296} height={308} rx={22} fill="rgba(80,170,255,.45)" /></g>
              <g opacity={z}>{Array.from({ length: 112 }, (_, i) => { const cx = 120 + (i % 14) * 62, cy = 740 + Math.floor(i / 14) * 52; return <circle key={i} cx={cx + Math.sin(T * 2 + i) * 4} cy={cy + Math.cos(T * 2 + i) * 4} r={14} fill="#bfe8ff" stroke="#2a6fa8" strokeWidth={3} />; })}
                <circle cx={120 + 9 * 62} cy={740 + 5 * 52} r={22} fill={OH.oro} stroke={KC.ink} strokeWidth={5} style={{ filter:'drop-shadow(0 0 16px #F4C25A)' }} /></g>
            </g>; })()}
        </>)}
      </Escena>
      {/* 9 · re-gancho */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Octenol x={110} y={640} s={1.15} p={1} brillo={0.5} /><Interrogacion T={T} x={280} y={1160} tam={300} /></>)}
      </Escena>
      {/* 10–11 · dos formas en espejo: R y S */}
      <Escena T={T} a={K.E} b={K.Es} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <line x1={540} y1={600} x2={540} y2={1200} stroke="#fff" strokeWidth={5} strokeDasharray="18 14" opacity={kprog(T, K.E + 0.2, K.E + 0.6)} />
          <g opacity={kprog(T, K.E + 0.4, K.E + 1.0) * (1 - kprog(T, K.F - 0.2, K.F + 0.3))}><Mano x={350} y={1040} s={1} espejo /><Mano x={730} y={1040} s={1} /></g>
          <g opacity={kprog(T, K.E + 1.2, K.E + 1.8)}>
            <Octenol x={500} y={760} s={0.78} p={1} color={KC.texto} forma="R" espejo />
            <Octenol x={580} y={760} s={0.78} p={1} color={KC.texto} forma="S" />
          </g>
          <text x={440} y={650} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={OH.oro} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.E + 1.8, K.E + 2.2)}>R</text>
          <text x={630} y={650} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.E + 1.8, K.E + 2.2)}>S</text>
          <g opacity={kprog(T, K.F + 0.2, K.F + 0.7)}><Champinon x={280} y={1080} s={0.85} crece={1} abre={0.8} /></g>
          <g opacity={kprog(T, K.F + 1.4, K.F + 1.9)}><Moho x={710} y={1040} s={0.85} /><Pasto T={T} x={870} y={1080} s={0.85} /></g>
        </>)}
      </Escena>
      {/* 12 · el estudio: tsetsé y el olor de las vacas */}
      <Escena T={T} a={K.Es} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Vaca T={T} x={560} y={930} s={1.1} />
          <Volutas T={T} x={330} y={880} n={3} alto={260} p={kprog(T, K.Es + 2.4, K.Es + 3.4)} />
          {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.Es + 3.0 + i * 0.25, K.Es + 5.2 + i * 0.25, kEase.sale); const x0 = -100, y0 = 700 + i * 90, x1 = 230 + i * 40, y1 = 820 + (i % 2) * 70;
            return u > 0 ? <Tsetse key={i} T={T} x={klerp(x0, x1, u) + Math.sin(T * 7 + i) * 10} y={klerp(y0, y1, u) + Math.cos(T * 6 + i) * 10} s={0.9} ang={180} /> : null; })}
        </>)}
      </Escena>
      {/* 13 · moscos: sudor, CO2 del aliento, trampas */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Brazo T={T} x={40} y={720} s={1} sudor={kprog(T, K.M + 0.2, K.M + 0.8)} />
          <g opacity={kprog(T, K.M + 1.6, K.M + 2.2)}>{[0, 1, 2].map((i) => { const u = ((T * 0.5 + i * 0.33) % 1); return <g key={i} transform={`translate(${620 + u * 160} ${760 - u * 60})`} opacity={1 - u}><circle r={34 + u * 30} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={4} /><text y={10} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>CO₂</text></g>; })}</g>
          {[0, 1, 2, 3, 4].map((i) => { const u = kprog(T, K.M + 2.4 + i * 0.2, K.M + 4.2 + i * 0.2, kEase.sale), atrae = i < 3;
            const x0 = 1150, y0 = 520 + i * 80, x1 = atrae ? 300 + i * 110 : 1150, y1 = atrae ? 600 : 940 + (i - 3) * 90;
            return u > 0 ? <Mosco key={i} T={T} seed={i} x={klerp(x0, atrae ? x1 : 880 + (i - 3) * 80, u) + Math.sin(T * 5 + i) * 12} y={klerp(y0, y1, u) + Math.cos(T * 4 + i) * 10} s={0.95} ang={atrae ? 8 : 200} /> : null; })}
          <g opacity={kprog(T, K.M + 4.3, K.M + 4.9)}><Trampa T={T} x={260} y={1000} s={0.75} /></g>
        </>)}
      </Escena>
      {/* 14 · cierre: el mismo champiñón, ya machacado, con su molécula */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={420} y={980} />
          <ChampMachacado T={T} x={420} y={985} s={1.4} m={0.8} />
          <Volutas T={T} x={420} y={820} p={1} alto={200} />
          <Octenol x={130} y={580} s={1.0} p={1} brillo={0.7 + 0.3 * Math.sin(T * 3)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.4} until={K.N - 0.3} texto="olor a tierra" x={300} y={400} tam={44} />
      <Chip T={T} at={K.G + 3.0} until={K.N - 0.3} texto="1 molécula clave" x={760} y={470} tam={40} borde={KC.gold} />
      <div style={{ position:'absolute', left:0, right:0, top:440, zIndex:41, textAlign:'center', opacity:kprog(T, K.N + 0.1, K.N + 0.5) * (1 - kprog(T, K.Ge - 0.3, K.Ge)), font:`400 150px/1 ${KF.titulo}`, color:KC.ink, WebkitTextStroke:`3px ${KC.ink}` }}>{T > K.N - 0.5 && T < K.Ge + 0.5 ? '1-octen-3-ol' : ''}</div>
      <Etq T={T} at={K.N + 1.4} until={K.Ge - 0.3} x={140} y={640} texto="«alcohol de hongo»" tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 2.0} until={K.Ge - 0.3} x={140} y={1140} texto="8 carbonos · 1 doble enlace · OH" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ge + 0.4} until={K.Co - 0.3} x={60} y={640} texto="geosmina = tierra mojada" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ge + 1.1} until={K.Co - 0.3} x={580} y={770} texto="1-octen-3-ol = hongo" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.1} until={K.Gr - 0.2} texto="POR DENTRO · AL MICROSCOPIO" x={420} y={430} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Co + 0.6} until={K.Gr - 0.2} x={420} y={520} texto="hifas del champiñón" tam={32} color={KC.mint} />
      <Etq T={T} at={K.Co + 0.9} until={K.Gr - 0.2} x={420} y={570} texto="Agaricus bisporus" it tam={30} color={KC.texto} />
      <Chip T={T} at={K.Co + 1.3} until={K.Gr - 0.2} texto="¡células rotas!" x={720} y={660} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Gr + 0.4} until={K.U - 0.3} x={60} y={520} texto="ácido linoleico · 18 carbonos" tam={32} color="#eafff7" />
      <Etq T={T} at={K.Gr + 0.9} until={K.U - 0.3} x={60} y={570} texto="un ácido graso de la célula" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Ox + 0.3} until={K.Li + 1.0} texto="+ O₂ en el carbono 10" x={330} y={680} tam={34} borde={OH.ox} />
      <Chip T={T} at={K.Li + 1.6} until={K.U - 0.3} texto="sale un pedazo de 8 carbonos" x={400} y={660} tam={34} borde={KC.gold} />
      <NumeroGigante T={T} at={K.U + 1.4} until={K.P - 0.3} valor={1} dur={0.2} sufijo=" en 1,000,000,000" etiqueta="≈ (en agua)" x={370} y={560} tam={70} color={OH.oro} />
      <Chip T={T} at={K.E + 0.2} until={K.F - 0.2} texto="dos formas en espejo" x={300} y={470} tam={36} borde={KC.cyan} />
      <Etq T={T} at={K.F + 0.4} until={K.Es - 0.3} x={100} y={1150} texto="R: más a hongo" tam={30} color={OH.oro} />
      <Etq T={T} at={K.F + 1.5} until={K.Es - 0.3} x={600} y={1150} texto="S: moho y pasto" tam={30} color={KC.lilac} />
      <Chip T={T} at={K.F + 2.6} until={K.Es - 0.3} texto="los hongos hacen sobre todo la R" x={420} y={470} tam={32} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.6} anio="1984" quien="olor de ganado · moscas tsetsé" revista="Insect Sci. Applic., 1984" x={480} y={560} />
      <Etq T={T} at={K.Es + 3.0} until={K.M - 0.3} x={60} y={620} texto="mosca tsetsé" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.3} until={K.M - 0.3} x={60} y={670} texto="Glossina" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 3.6} until={K.M - 0.3} texto="1-octen-3-ol: olor de las vacas" x={350} y={470} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.M + 0.6} until={K.C - 0.3} x={60} y={850} texto="sudor: también lo trae" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 2.8} until={K.C - 0.3} texto="+ CO₂ = atrae a algunas especies" x={420} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.M + 4.6} until={K.C - 0.3} x={470} y={1150} texto="trampa: octenol + CO₂" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="1-octen-3-ol" x={330} y={400} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1500} texto="El dibujo es esquemático." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="2 cm" largo={70} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.Ge} texto="1 nm (molécula, esquemática)" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.Ge} until={K.Co} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Co} until={K.Gr} texto="10 µm" largo={120} />
      <BarraEscala T={T} at={K.Gr} until={K.U} texto="1 nm (moléculas, esquemáticas)" largo={100} />
      <BarraEscala T={T} at={K.U} until={K.P} texto="5 cm → moléculas (esquemático)" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Es} texto="1 nm (moléculas, esquemáticas)" largo={90} />
      <BarraEscala T={T} at={K.Es} until={K.M} texto="1 m" largo={180} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="10 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={70} color={KC.ink} y={1560} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es tierra: es *una molécula.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Ge - 0.1} texto="1-octen-3-ol: *alcohol de hongo.*" />
      <Subtitulo T={T} idx={2} at={K.Ge + 0.1} until={K.Co - 0.1} texto="Tierra mojada: *geosmina.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Gr - 0.1} texto="Lo machacas: *rompes sus células.*" />
      <Subtitulo T={T} idx={4} at={K.Gr + 0.1} until={K.Ox - 0.1} texto="Un ácido graso: *el linoleico.*" />
      <Subtitulo T={T} idx={5} at={K.Ox + 0.1} until={K.Li - 0.1} texto="Una le pega *oxígeno.*" />
      <Subtitulo T={T} idx={6} at={K.Li + 0.1} until={K.U - 0.1} texto="Otra lo parte: *8 carbonos.*" />
      <Subtitulo T={T} idx={7} at={K.U + 0.1} until={K.P - 0.1} texto="≈ *1 en mil millones* (en agua)." />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.E - 0.1} texto="¿Por qué huele *tanto a hongo?*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.F - 0.1} texto="Dos formas, *como tus manos.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.Es - 0.1} texto="La *R* huele más a hongo." />
      <Subtitulo T={T} idx={11} at={K.Es + 0.1} until={K.M - 0.1} texto="1984: *en el olor de las vacas.*" />
      <Subtitulo T={T} idx={12} at={K.M + 0.1} until={K.C - 0.1} texto="Sudor + CO₂: *atrae moscos.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo arma *cuando rompes sus células.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Ge + 0.3, K.Co - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ox + 0.1, K.Li + 3.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.U + 0.8, K.P - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.F + 2.5, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Es + 2.5, K.M - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.M + 2.5, K.C - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="127" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OlorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OlorShot /></CompositionStage></div>;
}
window.OlorApp = OlorApp;
