// Shot Científico #56 · En el espacio nadie oye las explosiones — NARRADO (N1 "Por dentro" + N5 "El experimento" de Boyle 1660).
// Datos: NASA Science (sonido = onda mecánica, no viaja en el vacío; radio = onda electromagnética, familia de la luz),
// Boyle 1660 (reloj en el recipiente vacío), NASA 2022 (sonificación del cúmulo de Perseo). Ver guion.md y verificacion.md.

const PANT = { x: 60, y: 690, w: 960, h: 450 };          // la "pantalla de cine" del gancho y del cierre
const AIRE = '#ffffff';

// Nave de película (mira a la derecha).
function Nave({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 -40 L -150 -95 L -40 -42 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -90 40 L -150 95 L -40 42 Z" fill={KC.red} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -120 -38 L 70 -38 Q 150 -30 170 0 Q 150 30 70 38 L -120 38 Z" fill="#dfe4ee" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={70} cy={0} r={20} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-12} width={110} height={24} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d="M -122 -22 L -170 0 L -122 22 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Explosión (estrella de picos en capas). p 0..1 crece; T anima los picos.
function Explosion({ x, y, r = 200, p = 1, T = 0, seed = 3 }) {
  if (p <= 0.01) return null;
  const g = krng(seed), picos = Array.from({ length: 16 }, () => 0.7 + g() * 0.5);
  const capa = (k, color) => { const R = r * p * k; return <path d={picos.map((q, i) => { const a = i / picos.length * Math.PI * 2, rr = (i % 2 ? 0.62 : 1) * q * R * (1 + 0.05 * Math.sin(T * 9 + i));
    return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z'} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />; };
  const g2 = krng(seed + 7);
  return <g transform={`translate(${x} ${y}) rotate(${T * 6})`}>
    {Array.from({ length: 10 }, (_, i) => { const a = g2() * Math.PI * 2, d = r * p * (1.05 + g2() * 0.6);
      return <rect key={i} x={Math.cos(a) * d - 12} y={Math.sin(a) * d - 8} width={24} height={16} rx={4} fill="#9aa3b5" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 40 + T * 90} ${Math.cos(a) * d} ${Math.sin(a) * d})`} />; })}
    {capa(1, KC.red)}{capa(0.74, KC.orange)}{capa(0.48, KC.yellow)}{capa(0.22, '#fff8d6')}
  </g>;
}
// Bocina tachada (silencio).
function Mudo({ x, y, s = 1, color = KC.white }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={78} fill={KC.ink} opacity=".85" />
    <path d="M -46 -20 L -22 -20 L 8 -46 L 8 46 L -22 20 L -46 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 24 -22 L 56 22 M 56 -22 L 24 22" stroke={KC.red} strokeWidth={11} strokeLinecap="round" />
  </g>;
}
// Pantalla de cine: marco con el espacio adentro (recorta a sus hijos).
function PantallaCine({ T, id, children, sacude = 0 }) {
  const { x, y, w, h } = PANT, dx = Math.sin(T * 70) * 10 * sacude, dy = Math.cos(T * 63) * 8 * sacude;
  return <g transform={`translate(${dx} ${dy})`}>
    <defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={26} /></clipPath></defs>
    <rect x={x - 16} y={y - 16} width={w + 32} height={h + 32} rx={36} fill="#2a1a3a" stroke={KC.ink} strokeWidth={10} />
    <g clipPath={`url(#${id})`}>
      <rect x={x} y={y} width={w} height={h} fill="#070b1c" />
      <g transform={`translate(${x} ${y})`}>{Array.from({ length: 46 }, (_, i) => { const g = krng(i + 40); const sx = g() * w, sy = g() * h;
        return <circle key={i} cx={(sx - T * 40 * (0.4 + g())) % w + (sx - T * 40 * (0.4 + g()) < 0 ? w : 0)} cy={sy} r={1.5 + g() * 3} fill="#fff" opacity={0.4 + 0.5 * g()} />; })}</g>
      {children}
    </g>
    <rect x={x} y={y} width={w} height={h} rx={26} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Bolitas de aire con una onda que las empuja (onda longitudinal). Dentro de svg.
function OndaBolitas({ T, x, y, w, h, cols = 13, filas = 6, amp = 22, lambda = 330, vel = 1, r = 16, color = AIRE, resalta = KC.yellow, o = 1, sepX }) {
  const dx = sepX || w / cols, dy = h / filas;
  return <g opacity={o}>{Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols);
    const x0 = x + dx * (c + 0.5), fase = 2 * Math.PI * (x0 / lambda - T * vel);
    const d = amp * Math.sin(fase), comp = -Math.cos(fase);
    return <circle key={i} cx={x0 + d} cy={y + dy * (f + 0.5) + Math.sin(i * 1.7 + T * 2) * 3} r={r} fill={comp > 0.55 ? resalta : color} stroke={KC.ink} strokeWidth={5} />; })}</g>;
}
// Cadena de bolitas: el empujón viaja de una a la siguiente (p 0..1 = dónde va el empujón).
function CadenaBolitas({ x1, x2, y, n = 9, p = 0, r = 26, empuje = 28 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const xi = klerp(x1, x2, i / (n - 1)), q = p * (n + 1) - i, d = q > 0 && q < 1.6 ? Math.sin(Math.min(1, q / 1.6) * Math.PI) * empuje : 0;
    const activa = q > 0 && q < 1.6;
    return <circle key={i} cx={xi + d} cy={y} r={r} fill={activa ? KC.yellow : AIRE} stroke={KC.ink} strokeWidth={6} />; })}</g>;
}
function Planeta({ x, y, r, color, sombra, anillo = false, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {anillo && <ellipse rx={r * 1.8} ry={r * 0.45} fill="none" stroke={KC.gold2} strokeWidth={10} />}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${r * 0.2} ${-r * 0.98} A ${r} ${r} 0 0 1 ${r * 0.2} ${r * 0.98} A ${r * 0.8} ${r} 0 0 0 ${r * 0.2} ${-r * 0.98} Z`} fill={sombra} opacity=".55" />
    {anillo && <path d={`M ${-r * 1.8} 0 A ${r * 1.8} ${r * 0.45} 0 0 0 ${r * 1.8} 0`} fill="none" stroke={KC.gold2} strokeWidth={10} />}
  </g>;
}
// Astronauta flotando con antena de radio en la mochila. (x, y) = centro del cuerpo.
function AstroRadio({ x, y, s = 1, rot = 0, T = 0, color = KC.cyan, voltea = false }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.3 + x) * 12}) rotate(${rot + Math.sin(T * 0.9 + x) * 4}) scale(${voltea ? -s : s} ${s})`}>
    <line x1={-70} y1={-60} x2={-110} y2={-190} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <circle cx={-110} cy={-190} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <rect x={-110} y={-70} width={60} height={150} rx={18} fill="#c9ccd6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={60} width={44} height={120} rx={18} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} transform="rotate(12 -40 60)" />
    <rect x={10} y={60} width={44} height={120} rx={18} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} transform="rotate(-18 30 60)" />
    <rect x={-70} y={-80} width={140} height={170} rx={42} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} />
    <rect x={40} y={-60} width={40} height={120} rx={18} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} transform="rotate(-40 60 -50)" />
    <rect x={-34} y={-40} width={68} height={36} rx={8} fill="#d7dbe6" stroke={KC.ink} strokeWidth={5} />
    <rect x={-40} y={10} width={80} height={14} rx={5} fill={color} stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-140} r={70} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} />
    <path d="M -50 -150 Q 0 -195 50 -150 Q 55 -95 0 -92 Q -55 -95 -50 -150 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    <path d="M -28 -155 Q -10 -172 12 -166" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity=".8" />
  </g>;
}
// Onda de radio (senoide) entre dos puntos que avanza. p 0..1 cuánto se ha dibujado.
function OndaRadio({ x1, y1, x2, y2, T, p = 1, amp = 34, ciclos = 6, color = KC.yellow }) {
  if (p <= 0.01) return null;
  const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1), n = 90, pts = [];
  for (let i = 0; i <= n * p; i++) { const u = i / n; pts.push(`${(u * L).toFixed(1)},${(amp * Math.sin(u * ciclos * 2 * Math.PI - T * 9)).toFixed(1)}`); }
  return <g transform={`translate(${x1} ${y1}) rotate(${a * 180 / Math.PI})`}>
    <polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Interior de un módulo de la Estación Espacial (esquemático).
function ModuloEstacion({ T }) {
  return <g>
    <rect x={40} y={420} width={1000} height={740} rx={120} fill="#e9eef5" stroke={KC.ink} strokeWidth={12} />
    <rect x={110} y={490} width={860} height={600} rx={80} fill="#cfd9e6" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((i) => <rect key={i} x={150 + i * 280} y={530} width={220} height={120} rx={14} fill="#f6f8fb" stroke={KC.ink} strokeWidth={6} />)}
    {[0, 1, 2, 3].map((i) => <rect key={'b' + i} x={150 + i * 205} y={990} width={170} height={70} rx={12} fill="#f6f8fb" stroke={KC.ink} strokeWidth={6} />)}
    {[0, 1, 2].map((i) => <g key={'l' + i}><circle cx={190 + i * 280} cy={590} r={10} fill={[KC.mint, KC.red, KC.yellow][i]} stroke={KC.ink} strokeWidth={3} />
      <rect x={215 + i * 280} y={575} width={110} height={12} rx={6} fill="#9fb0c6" /><rect x={215 + i * 280} y={600} width={80} height={12} rx={6} fill="#9fb0c6" /></g>)}
    <line x1={150} y1={700} x2={930} y2={700} stroke={KC.gold} strokeWidth={14} strokeLinecap="round" />
    <line x1={150} y1={950} x2={930} y2={950} stroke={KC.gold} strokeWidth={14} strokeLinecap="round" />
    <circle cx={900} cy={820} r={60} fill="#0a1024" stroke={KC.ink} strokeWidth={10} />
    {[0, 1, 2, 3].map((i) => <circle key={'s' + i} cx={870 + i * 18} cy={820 + (i % 2) * 40} r={3} fill="#fff" opacity={0.5 + 0.5 * Math.sin(T * 2 + i)} />)}
  </g>;
}
// Persona flotando sin casco (dentro de la estación) — de frente, girada.
function Flotador({ x, y, rot = 0, s = 1, color = KC.pink, boca = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 1.1 + x) * 14}) rotate(${rot + Math.sin(T * 0.7 + x) * 3}) scale(${s})`}>
    <PersonaSimple x={0} yPies={300} alto={600} color={color} brazos={0.35} cara={boca > 0.4 ? 'o' : 'sonrie'} />
  </g>;
}
// Experimento de Boyle: recipiente de vidrio sobre la bomba, con un reloj colgado de un hilo.
// aire 0..1 (cuánto aire queda) · bombeo = fase de la palanca.
function Boyle1660({ T, aire = 1, bombeo = 0, x = 400, y = 1060 }) {
  const g = krng(66), n = 34;
  const tick = Math.sin(T * Math.PI * 4) > 0 ? 6 : -6;
  return <g transform={`translate(${x} ${y})`}>
    {/* base y tubo a la bomba */}
    <rect x={-260} y={0} width={520} height={46} rx={14} fill="#8a5a2b" stroke={KC.ink} strokeWidth={8} />
    <rect x={240} y={8} width={170} height={26} rx={10} fill="#b98a4a" stroke={KC.ink} strokeWidth={6} />
    {/* bomba: cilindro de latón con pistón y palanca */}
    <g transform="translate(450 0)">
      <rect x={-50} y={-330} width={100} height={340} rx={18} fill="#d9a441" stroke={KC.ink} strokeWidth={8} />
      <rect x={-12} y={-430 + bombeo * 110} width={24} height={150} rx={8} fill="#6b6f7a" stroke={KC.ink} strokeWidth={6} />
      <line x1={0} y1={-430 + bombeo * 110} x2={-90} y2={-470 + bombeo * 150} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
      <line x1={0} y1={-430 + bombeo * 110} x2={-90} y2={-470 + bombeo * 150} stroke="#8a5a2b" strokeWidth={13} strokeLinecap="round" />
      <rect x={-70} y={0} width={140} height={46} rx={12} fill="#8a5a2b" stroke={KC.ink} strokeWidth={7} />
    </g>
    {/* recipiente de vidrio (campana) */}
    <path d="M -220 0 L -220 -360 Q -220 -520 0 -540 Q 220 -520 220 -360 L 220 0 Z" fill="rgba(190,235,255,.35)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-30} y={-570} width={60} height={40} rx={10} fill="#b98a4a" stroke={KC.ink} strokeWidth={6} />
    {/* aire adentro: se va yendo */}
    {Array.from({ length: n }, (_, i) => { const px = -190 + g() * 380, py = -40 - g() * 420, vis = i / n < aire;
      return vis ? <circle key={i} cx={px + Math.sin(T * 3 + i) * 8} cy={py + Math.cos(T * 2.4 + i) * 8} r={11} fill="#fff" stroke={KC.ink} strokeWidth={4} /> : null; })}
    {/* reloj colgado del hilo */}
    <line x1={0} y1={-530} x2={0} y2={-330} stroke={KC.ink} strokeWidth={4} />
    <g transform={`translate(0 -250) rotate(${Math.sin(T * 1.2) * 4})`}>
      <circle cx={0} cy={-78} r={14} fill="none" stroke={KC.gold} strokeWidth={7} />
      <circle r={78} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} />
      <circle r={60} fill="#fffaf0" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-52} x2={0} y2={-44} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />)}
      <line x1={0} y1={0} x2={0} y2={-30} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" transform="rotate(60)" />
      <line x1={0} y1={0} x2={0} y2={-46} stroke={KC.red} strokeWidth={4} strokeLinecap="round" transform={`rotate(${Math.floor(T * 2) * 6 + tick * 0})`} />
      <circle r={6} fill={KC.ink} />
    </g>
  </g>;
}
// Boyle (esquemático): cabeza con peluca larga de su época.
function CabezaBoyle({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={110} width={240} height={200} rx={70} fill="#5b3b2a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 110 L 0 160 L 30 110 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[-1, 1].map((k) => <g key={k}>{[0, 1, 2, 3].map((i) => <circle key={i} cx={k * (92 - i * 4)} cy={-30 + i * 52} r={42} fill="#efe6d4" stroke={KC.ink} strokeWidth={6} />)}</g>)}
    <ellipse cx={0} cy={0} rx={78} ry={96} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -86 -30 Q -90 -120 0 -118 Q 90 -120 86 -30 Q 50 -80 0 -78 Q -50 -80 -86 -30 Z" fill="#efe6d4" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-28} cy={0} r={8} fill={KC.ink} /><circle cx={28} cy={0} r={8} fill={KC.ink} />
    <path d="M -24 46 Q 0 58 24 46" fill="none" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Cúmulo de galaxias con gas caliente y ondas (anillos) que salen del centro.
function Cumulo({ T, x, y, s = 1, ondas = 1 }) {
  const g = krng(56);
  const gal = Array.from({ length: 26 }, () => ({ a: g() * Math.PI * 2, d: 60 + g() * 300, rx: 10 + g() * 26, k: 0.4 + g() * 0.5, rot: g() * 180, c: g() > 0.5 ? '#ffe6a8' : '#f6f3ec' }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><radialGradient id="gas56"><stop offset="0%" stopColor="#ff7ad9" stopOpacity=".95" /><stop offset="45%" stopColor="#b18cff" stopOpacity=".55" /><stop offset="100%" stopColor="#2b0f63" stopOpacity="0" /></radialGradient></defs>
    <circle r={380} fill="url(#gas56)" />
    {[0, 1, 2, 3].map((i) => { const f = ((T * 0.35 + i / 4) % 1); return <circle key={i} r={40 + f * 320} fill="none" stroke="#ffd6f4" strokeWidth={10 * (1 - f) + 2} opacity={ondas * (1 - f) * 0.9} />; })}
    {gal.map((e, i) => <ellipse key={i} cx={Math.cos(e.a) * e.d} cy={Math.sin(e.a) * e.d * 0.8} rx={e.rx} ry={e.rx * e.k} fill={e.c} stroke={KC.ink} strokeWidth={3} transform={`rotate(${e.rot} ${Math.cos(e.a) * e.d} ${Math.sin(e.a) * e.d * 0.8})`} />)}
    <ellipse rx={52} ry={40} fill="#fff3c4" stroke={KC.ink} strokeWidth={5} />
    <circle r={16} fill={KC.ink} />
  </g>;
}
// Escalera de octavas: la onda sube escalón por escalón hasta que se oye. p 0..1.
function EscaleraOctavas({ x, y, p = 0, T = 0, pasos = 9, alto = 640, ancho = 380 }) {
  const dy = alto / pasos, k = p * pasos;
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: pasos }, (_, i) => { const on = k > i; return <rect key={i} x={i * ancho / pasos * 0.6} y={-(i + 1) * dy} width={ancho - i * ancho / pasos * 0.6} height={dy - 10} rx={12}
      fill={on ? klerpColor(i / pasos) : 'rgba(255,255,255,.12)'} stroke={KC.ink} strokeWidth={5} />; })}
    {(() => { const i = Math.min(pasos - 1, Math.floor(k)), cx = i * ancho / pasos * 0.6 + 40, cy = -(i + 1) * dy + dy / 2 - 5;
      return <g transform={`translate(${cx} ${cy})`}><circle r={24} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
        <path d={`M -14 0 Q -7 ${-12 - 4 * Math.sin(T * 12)} 0 0 Q 7 ${12 + 4 * Math.sin(T * 12)} 14 0`} fill="none" stroke={KC.ink} strokeWidth={4} /></g>; })()}
  </g>;
}
function klerpColor(u) { const c = [KC.violet, KC.blue, KC.cyan, KC.mint, KC.yellow, KC.orange, KC.pink]; return c[Math.min(c.length - 1, Math.floor(u * c.length))]; }
// Oreja grande (para "ya se oye").
function OrejaIcono({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -80 C 40 -120 100 -40 60 30 C 40 60 20 60 10 100 C 0 130 -50 130 -55 95" fill={CPIEL} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -20 -40 C 30 -60 50 -10 25 20" fill="none" stroke={CPIEL2} strokeWidth={8} strokeLinecap="round" />
  </g>;
}

function Espacio() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const habla = (a, b) => (T > a && T < b ? 0.5 + 0.5 * Math.sin(T * 17) : 0);
  // gancho: la nave cruza y explota en +0.6
  const naveX = klerp(160, 520, kprog(T, K.Gancho - 0.5, K.Gancho + 0.6));
  const boom = kprog(T, K.Gancho + 0.6, K.Gancho + 1.1, kEase.sale);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la explosión de película hace ¡BOOM!… y se tacha */}
      <Escena T={T} a={K.Gancho} b={K.Sonido}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <PantallaCine T={T} id="cine0" sacude={kprog(T, K.Gancho + 0.6, K.Gancho + 0.75) * (1 - kprog(T, K.Gancho + 1.0, K.Gancho + 1.6))}>
            {boom < 0.3 && <Nave x={naveX} y={PANT.y + 240} s={1} rot={-6} />}
            <Explosion x={540} y={PANT.y + 230} r={190} p={boom} T={T} />
          </PantallaCine>
          {T > K.Gancho + 0.6 && <g>
            <TextoSvg x={330} y={PANT.y - 60} tam={150} color={KC.yellow} rot={-6} s={klerp(0.3, 1, kprog(T, K.Gancho + 0.6, K.Gancho + 0.9, kEase.rebote))}
              o={1 - 0.55 * kprog(T, K.Gancho + 2.6, K.Gancho + 3.0)}>¡BOOM!</TextoSvg>
            {(() => { const q = kprog(T, K.Gancho + 2.5, K.Gancho + 2.9, kEase.sale); return q > 0 && <g>
              <line x1={110} y1={PANT.y - 170} x2={110 + 460 * q} y2={PANT.y - 170 + 130 * q} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
              <line x1={110} y1={PANT.y - 170} x2={110 + 460 * q} y2={PANT.y - 170 + 130 * q} stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g>; })()}
          </g>}
          {T > K.Gancho + 3.2 && <g transform={`translate(${PANT.x + PANT.w - 110} ${PANT.y + 110}) scale(${klerp(0.3, 1, kprog(T, K.Gancho + 3.2, K.Gancho + 3.6, kEase.rebote))})`}><Mudo x={0} y={0} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Gancho + 0.2} until={K.Gancho + 3.0} texto="en la película" x={290} y={420} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Gancho + 3.2} until={K.Sonido - 0.1} texto="en el espacio: sin sonido" x={340} y={420} tam={40} borde={KC.red} />
      </Escena>

      {/* 1 · el sonido = vibración que empuja partículas (aire, agua, sólido) */}
      <Escena T={T} a={K.Sonido} b={K.Cadena} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={60} y={470} width={960} height={300} rx={40} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={9} />
          {/* bocina que vibra a la izquierda */}
          <g transform={`translate(${110 + Math.sin(T * 30) * 6} 620)`}>
            <path d="M -40 -50 L 0 -50 L 40 -100 L 40 100 L 0 50 L -40 50 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          </g>
          <OndaBolitas T={T} x={170} y={490} w={820} h={260} cols={12} filas={4} amp={24} lambda={300} vel={1.1} r={17} o={kprog(T, K.Sonido, K.Sonido + 0.4)} />
          {[['aire', 5, 3, 14, 0], ['agua', 8, 5, 12, 1], ['sólido', 10, 7, 10, 2]].map(([nom, c, f, r, i]) => { const at = K.Sonido + 3.0 + i * 0.6, e = kprog(T, at, at + 0.4, kEase.rebote);
            if (e <= 0) return null; const bx = 70 + i * 320;
            return <g key={nom} transform={`translate(${bx + 145} 920) scale(${e}) translate(${-(bx + 145)} -920)`}>
              <rect x={bx} y={810} width={290} height={230} rx={28} fill={['#e8f9ff', '#3aa0ff', '#c9a27a'][i]} stroke={KC.ink} strokeWidth={8} />
              <OndaBolitas T={T} x={bx + 10} y={850} w={270} h={180} cols={c} filas={f} amp={i === 2 ? 6 : 12} lambda={180} vel={1.4} r={r} />
              <text x={bx + 145} y={844} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{nom}</text>
            </g>; })}
        </Lienzo>
        <Chip T={T} at={K.Sonido + 0.4} until={K.Cadena - 0.1} texto="sonido = vibración que empuja" x={540} y={420} tam={40} borde={KC.yellow} />
      </Escena>

      {/* 2 · la cadena: tu voz empuja el aire hasta un oído */}
      <Escena T={T} a={K.Cadena} b={K.Vacio} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <CabezaPerfil x={190} y={760} s={0.95} boca={habla(K.Cadena + 0.2, K.Cadena + 2.4)} />
          <g transform="translate(900 760) scale(-0.95 0.95)"><CabezaPerfil x={0} y={0} s={1} /></g>
          <CadenaBolitas x1={360} x2={820} y={850} n={8} p={(T - K.Cadena - 0.4) / 3.2 % 1.15} />
          <OndasArco x={340} y={850} ang={0} T={T} color={KC.pink} largo={90} n={3} o={1 - kprog(T, K.Cadena + 3.5, K.Cadena + 4)} />
          {/* el oído que recibe */}
          {T > K.Cadena + 3.3 && <circle cx={900 + 75 * 0.95} cy={760 + 10 * 0.95} r={60 + ((T * 1.5) % 1) * 50} fill="none" stroke={KC.pink} strokeWidth={8} opacity={1 - ((T * 1.5) % 1)} />}
        </Lienzo>
        <Chip T={T} at={K.Cadena + 0.3} until={K.Vacio - 0.1} texto="empuja · empuja · empuja" x={540} y={420} tam={40} borde={KC.pink} />
        <Etq T={T} at={K.Cadena + 1.2} until={K.Vacio - 0.2} x={400} y={1000} texto="aire" lado="der" color={KC.ink} />
        <Etq T={T} at={K.Cadena + 3.3} until={K.Vacio - 0.2} x={975} y={600} texto="oído" lado="izq" color={KC.ink} />
      </Escena>

      {/* 3 · el espacio entre planetas: casi vacío */}
      <Escena T={T} a={K.Vacio} b={K.Pregunta} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, #1d1f5e 0%, ${KC.noche} 75%)` }}></div>
        <Lienzo>
          <EstrellasFondo T={T} n={60} />
          <Planeta x={170} y={1060} r={110} color={KC.blue} sombra={KC.ink} />
          <Planeta x={900} y={1080} r={80} color={KC.orange} sombra={KC.ink} />
          {/* en el Vacío: 3 partículas muy separadas; en Nada: la onda se apaga */}
          {T < K.Nada + 0.2 && [[420, 640], [700, 880], [560, 1060]].map(([px, py], i) => <circle key={i} cx={px + Math.sin(T + i) * 18} cy={py + Math.cos(T * 0.8 + i) * 14} r={14}
            fill={AIRE} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Vacio + 1.2 + i * 0.3, K.Vacio + 1.6 + i * 0.3)} />)}
          {T > K.Nada - 0.2 && <g>
            <CadenaBolitas x1={190} x2={320} y={760} n={3} p={((T - K.Nada) / 1.2) % 1.3} />
            {[0, 1, 2, 3].map((i) => { const f = ((T - K.Nada) * 0.5 + i / 4) % 1; return <path key={i} d={`M ${360 + f * 520} ${700 - 60 * (1 - f)} Q ${400 + f * 520} 760 ${360 + f * 520} ${820 + 60 * (1 - f)}`}
              fill="none" stroke={KC.cyan} strokeWidth={10} strokeLinecap="round" opacity={(1 - f) * (1 - f) * 0.9} />; })}
          </g>}
        </Lienzo>
        <Lupa T={T} at={K.Vacio + 0.5} until={K.Nada - 0.2} x={540} y={760} r={210} fx={560} fy={860} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · ENTRE PLANETAS"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#070b1c" />
            {[[0.3, 0.35], [0.72, 0.6]].map(([u, v], i) => <circle key={i} cx={u * r * 2 + Math.sin(t + i) * 10} cy={v * r * 2 + Math.cos(t + i) * 10} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} />)}</svg>} />
        <Chip T={T} at={K.Vacio + 0.3} until={K.Nada - 0.1} texto="casi vacío" x={300} y={420} tam={44} borde={KC.cyan} />
        <Chip T={T} at={K.Vacio + 2.0} until={K.Nada - 0.1} texto="poquísimas partículas" x={400} y={520} tam={38} borde={KC.cyan} />
        <Chip T={T} at={K.Nada + 0.4} until={K.Pregunta - 0.1} texto="sin nada que empujar" x={340} y={420} tam={40} borde={KC.red} />
        <Etq T={T} at={K.Nada + 1.0} until={K.Pregunta - 0.2} x={330} y={900} texto="el sonido se apaga" lado="der" color={KC.texto} />
      </Escena>

      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Radio} />

      {/* 6 · por radio: ondas de la familia de la luz que sí cruzan el vacío */}
      <Escena T={T} a={K.Radio} b={K.Estacion} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 55%, #2b0f63 0%, ${KC.noche} 80%)` }}></div>
        <Lienzo>
          <EstrellasFondo T={T} n={60} seed={4} />
          <AstroRadio x={200} y={1000} s={0.95} rot={-12} T={T} />
          <AstroRadio x={880} y={900} s={0.95} rot={10} T={T} voltea />
          <OndaRadio x1={150} y1={810} x2={950} y2={700} T={T} p={kprog(T, K.Radio + 0.4, K.Radio + 1.6, kEase.sale)} color={KC.yellow} />
          {/* familia: radio … luz */}
          {(() => { const e = kprog(T, K.Radio + 2.0, K.Radio + 2.5, kEase.sale); if (e <= 0) return null;
            return <g opacity={e} transform={`translate(0 ${(1 - e) * 30})`}>
              <rect x={90} y={500} width={900} height={110} rx={55} fill="rgba(14,15,18,.85)" stroke={KC.white} strokeWidth={5} />
              <polyline points={Array.from({ length: 60 }, (_, i) => `${130 + i * 6},${555 + 30 * Math.sin(i / 60 * Math.PI * 3 - T * 4)}`).join(' ')} fill="none" stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
              <defs><linearGradient id="arco56"><stop offset="0" stopColor="#ff3b2f" /><stop offset=".2" stopColor="#ff8a1f" /><stop offset=".4" stopColor="#ffe11a" /><stop offset=".6" stopColor="#2fe0a8" /><stop offset=".8" stopColor="#2346ff" /><stop offset="1" stopColor="#b18cff" /></linearGradient></defs>
              <rect x={690} y={525} width={260} height={60} rx={30} fill="url(#arco56)" stroke={KC.ink} strokeWidth={5} />
              <text x={300} y={665} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">ondas de radio</text>
              <text x={820} y={665} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">luz</text>
              <text x={555} y={570} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.texto}>=</text>
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Radio + 0.3} until={K.Radio + 2.0} texto="por radio" x={260} y={420} tam={44} borde={KC.yellow} />
        <Chip T={T} at={K.Radio + 2.2} until={K.Estacion - 0.1} texto="misma familia que la luz" x={540} y={420} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Radio + 3.5} until={K.Estacion - 0.1} texto="sí cruzan el vacío" x={540} y={1170} tam={38} borde={KC.mint} />
      </Escena>

      {/* 7 · dentro de la Estación Espacial: hay aire, sí se oye */}
      <Escena T={T} a={K.Estacion} b={K.Boyle} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <ModuloEstacion T={T} />
          <OndaBolitas T={T} x={130} y={710} w={700} h={230} cols={11} filas={4} amp={14} lambda={260} vel={0.9} r={11} color="rgba(255,255,255,.9)" resalta={KC.yellow} o={kprog(T, K.Estacion + 1.0, K.Estacion + 1.6)} />
          <Flotador x={330} y={720} rot={-18} s={0.62} color={KC.pink} boca={habla(K.Estacion + 0.4, K.Estacion + 2.5)} T={T} />
          <Flotador x={720} y={700} rot={14} s={0.62} color={KC.orange} T={T} />
          <OndasArco x={400} y={640} ang={-10} T={T} color={KC.pink} largo={220} o={kprog(T, K.Estacion + 0.4, K.Estacion + 0.8)} />
        </Lienzo>
        <Chip T={T} at={K.Estacion + 0.2} until={K.Boyle - 0.1} texto="Estación Espacial" x={300} y={360} tam={38} borde={KC.ink} />
        <Chip T={T} at={K.Estacion + 1.2} until={K.Boyle - 0.1} texto="llena de aire: sí se oye" x={540} y={1110} tam={40} borde={KC.mint} />
      </Escena>

      {/* 8 · 1660: Boyle saca el aire del frasco y el tic tac se hace chiquito */}
      <Escena T={T} a={K.Boyle} b={K.Galaxias} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {T > K.Boyle + 2.0 && (() => { const aire = 1 - kprog(T, K.Boyle + 3.0, K.Boyle + 6.8), bom = Math.abs(Math.sin((T - K.Boyle) * Math.PI * 1.6)) * kprog(T, K.Boyle + 2.6, K.Boyle + 3.0) * (aire > 0.02 ? 1 : 0);
            const tam = klerp(18, 96, aire);
            return <g opacity={kprog(T, K.Boyle + 2.0, K.Boyle + 2.4)}>
              <Boyle1660 T={T} aire={aire} bombeo={bom} x={370} y={1150} />
              {[0, 1].map((i) => { const ph = (T * 2 + i * 0.5) % 1; return <text key={i} x={370 + (i ? 120 : -120)} y={640 - ph * 60} textAnchor="middle" opacity={(1 - ph) * (0.25 + 0.75 * aire)}
                style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={tam / 9} paintOrder="stroke">{i ? 'TAC' : 'TIC'}</text>; })}
            </g>; })()}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Boyle + 0.2} until={K.Boyle + 2.1} anio="1660" quien="Robert Boyle" revista="frasco · reloj · bomba de aire" x={540} y={760} />
        <Chip T={T} at={K.Boyle + 2.6} until={K.Boyle + 5.6} texto="saca el aire" x={760} y={420} tam={40} borde={KC.ink} />
        <Chip T={T} at={K.Boyle + 5.7} until={K.Galaxias - 0.1} texto="tic tac… casi no se oye" x={540} y={420} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Boyle + 2.4} until={K.Galaxias - 0.3} x={880} y={1110} texto="bomba de aire" lado="izq" color={KC.ink} tam={30} />
      </Escena>

      {/* 9 · NASA 2022: ondas del gas de un cúmulo de galaxias, subidas muchísimas octavas */}
      <Escena T={T} a={K.Galaxias} b={K.Cierre} fondo={KC.noche}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 40% 45%, #2b0f63 0%, ${KC.noche} 78%)` }}></div>
        <Lienzo>
          <EstrellasFondo T={T} n={50} seed={12} />
          {(() => { const q = kprog(T, K.Galaxias + 3.6, K.Galaxias + 4.4, kEase.suave);
            return <Cumulo T={T} x={klerp(540, 290, q)} y={klerp(800, 600, q)} s={klerp(1, 0.48, q)} ondas={kprog(T, K.Galaxias + 1.0, K.Galaxias + 1.6)} />; })()}
          {T > K.Galaxias + 4.2 && <g opacity={kprog(T, K.Galaxias + 4.2, K.Galaxias + 4.6)}>
            <EscaleraOctavas x={70} y={1150} p={kprog(T, K.Galaxias + 4.6, K.Galaxias + 7.4)} T={T} alto={350} ancho={420} pasos={9} />
            <OrejaIcono x={470} y={760} s={0.6} />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Galaxias + 0.3} until={K.Cierre - 0.1} texto="NASA 2022" x={260} y={420} tam={46} borde={KC.lilac} />
        <Etq T={T} at={K.Galaxias + 1.2} until={K.Galaxias + 3.8} x={1020} y={1150} texto="cúmulo de galaxias" lado="izq" color={KC.texto} tam={32} />
        <Etq T={T} at={K.Galaxias + 1.8} until={K.Galaxias + 3.8} x={620} y={560} texto="ondas en el gas" lado="der" color="#ffd6f4" tam={32} />
        <Chip T={T} at={K.Galaxias + 4.6} until={K.Cierre - 0.1} texto="↑ muchísimas octavas" x={300} y={760} tam={36} borde={KC.yellow} />
      </Escena>

      {/* 10 · cierre: la misma explosión, enorme… y en silencio */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <PantallaCine T={T} id="cine1">
            <Explosion x={540} y={PANT.y + 230} r={190} p={0.35 + 0.65 * kprog(T, K.Cierre + 0.2, K.Cierre + 1.6, kEase.sale)} T={T} />
          </PantallaCine>
          {/* se sale de la pantalla: enorme */}
          <g opacity={kprog(T, K.Cierre + 1.2, K.Cierre + 1.8)}><Explosion x={540} y={PANT.y + 230} r={430} p={kprog(T, K.Cierre + 1.2, K.Cierre + 3.2, kEase.sale)} T={T} seed={5} /></g>
          {T > K.Cierre + 3.0 && <g transform={`translate(540 ${PANT.y + 230}) scale(${klerp(0.3, 1.5, kprog(T, K.Cierre + 3.0, K.Cierre + 3.4, kEase.rebote))})`}><Mudo x={0} y={0} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} texto="enorme…" x={260} y={420} tam={46} borde={KC.yellow} />
        <Chip T={T} at={K.Cierre + 3.0} until={K.Outro - 0.1} texto="…y en silencio" x={340} y={520} tam={46} borde={KC.red} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Sonido - 0.1} texto="En las películas suena… *es un error.*" />
      <Subtitulo T={T} idx={1} at={K.Sonido + 0.1} until={K.Cadena - 0.1} texto="El sonido *empuja partículas.*" />
      <Subtitulo T={T} idx={2} at={K.Cadena + 0.1} until={K.Vacio - 0.1} texto="Aire empuja *al aire de al lado.*" />
      <Subtitulo T={T} idx={3} at={K.Vacio + 0.1} until={K.Nada - 0.1} texto="Entre planetas: *casi vacío.*" />
      <Subtitulo T={T} idx={4} at={K.Nada + 0.1} until={K.Pregunta - 0.1} texto="Sin aire: *no tiene por dónde viajar.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Radio - 0.1} texto="¿Cómo hablan *los astronautas?*" />
      <Subtitulo T={T} idx={6} at={K.Radio + 0.1} until={K.Estacion - 0.1} texto="Por radio: *familia de la luz.*" />
      <Subtitulo T={T} idx={7} at={K.Estacion + 0.1} until={K.Boyle - 0.1} texto="En la Estación *sí se oye.*" />
      <Subtitulo T={T} idx={8} at={K.Boyle + 0.1} until={K.Galaxias - 0.1} texto="1660: el tic tac *casi se apagó.*" />
      <Subtitulo T={T} idx={9} at={K.Galaxias + 0.1} until={K.Cierre - 0.1} texto="NASA 2022: *muchísimas octavas.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Enorme… y *totalmente silenciosa.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Sonido + 2.6, K.Cadena - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Vacio + 0.6, K.Nada - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Nada + 0.4, K.Pregunta - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pregunta + 0.05, K.Radio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Estacion + 0.8, K.Boyle - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Boyle + 3.0, K.Galaxias - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Galaxias + 4.4, K.Cierre - 0.1, 'avatar_11_sorprendido', 'grande'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="56" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function EspacioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Espacio /></CompositionStage></div>;
}
window.EspacioApp = EspacioApp;
