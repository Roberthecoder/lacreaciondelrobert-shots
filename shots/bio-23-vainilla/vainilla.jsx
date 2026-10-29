// Shot Biotecnológico #23 · La vainilla de tu helado casi nunca salió de una vaina (vainillina) — NARRADO (N2 el número + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no a escala).
const VAINA = '#3a2216', VAINA2 = '#5b3823', VERDE_V = '#6f9e3a', HOJA = '#4fa24a', HOJA2 = '#2f7a35', FLOR = '#eef2a6', FLOR2 = '#f6d75c';
const CREMA = '#fff1c9', GALLETA = '#d9a35b', E1 = '#9b5de5', E2 = '#ff8a1f';

function SvgV({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}

// Cono de helado de vainilla (con puntitos negros de semilla) que gotea. gota 0..1.
function Cono({ T, x, y, s = 1, gota = 0 }) {
  const g = gota * 90;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.3) * 2})`}>
    <ellipse cx={0} cy={430} rx={150} ry={20} fill="rgba(0,0,0,.15)" />
    <path d="M -140 0 L 0 420 L 140 0 Z" fill={GALLETA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[-100, -40, 20, 80].map((a) => <line key={a} x1={a} y1={0} x2={a + 90} y2={270} stroke="#a8743a" strokeWidth={6} />)}
    {[-60, 0, 60, 120].map((a) => <line key={a} x1={a} y1={0} x2={a - 120} y2={270} stroke="#a8743a" strokeWidth={6} />)}
    <path d="M -140 0 L 0 420 L 140 0" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M -170 10 Q -190 -150 -60 -190 Q 0 -260 70 -190 Q 200 -150 170 10 Q 120 40 90 20 L 90 ${30 + g} Q 90 ${55 + g} 70 ${30 + g} L 70 30 Q 0 50 -60 30 Q -120 50 -170 10 Z`} fill={CREMA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -110 -120 Q -80 -170 -30 -175" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" />
    {[[-90, -60], [-30, -120], [40, -80], [100, -40], [-20, -20], [60, -150], [-130, -10], [10, -60]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill={KC.ink} opacity=".75" />)}
  </g>;
}
// Vaina de vainilla (fruto). curada 0..1: verde → negra arrugada.
function Vaina({ x, y, largo = 620, ancho = 46, rot = 0, curada = 1, brillo = 0 }) {
  const c = mixHex(VERDE_V, VAINA, curada), L = largo / 2, w = ancho / 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {brillo > 0 && <ellipse rx={L + 40} ry={w + 40} fill={KC.white} opacity={0.35 * brillo} />}
    <path d={`M ${-L} 0 Q ${-L + 30} ${-w} ${-L + 90} ${-w} Q 0 ${-w - 14} ${L - 60} ${-w + 4} Q ${L} ${-w + 10} ${L + 14} 0 Q ${L} ${w - 4} ${L - 60} ${w} Q 0 ${w + 10} ${-L + 90} ${w} Q ${-L + 30} ${w} ${-L} 0 Z`} fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {curada > 0.3 && [-0.6, -0.3, 0, 0.3, 0.55].map((k, i) => <path key={i} d={`M ${k * L} ${-w + 8} q 14 ${w - 8} 0 ${2 * w - 16}`} stroke={VAINA2} strokeWidth={4} fill="none" opacity={curada} />)}
    <path d={`M ${-L + 80} ${-w + 10} L ${L - 80} ${-w + 12}`} stroke="rgba(255,255,255,.3)" strokeWidth={6} strokeLinecap="round" />
    <path d={`M ${-L - 30} -6 q 18 2 30 6`} stroke={mixHex('#7c9b46', '#4a3020', curada)} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Flor de vainilla (orquídea): 3 sépalos + 2 pétalos angostos y el labelo en forma de trompeta. abre 0..1.
function FlorVainilla({ T = 0, x, y, s = 1, abre = 1, rot = 0 }) {
  const a = kclamp(abre, 0, 1), k = 0.25 + 0.75 * a;
  const pet = (ang, l, c) => <path key={ang} d={`M 0 0 Q ${16 * k} ${-l * 0.5 * k} 0 ${-l * k} Q ${-16 * k} ${-l * 0.5 * k} 0 0 Z`} transform={`rotate(${ang * k})`} fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />;
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, 4, 0.3) * 4}) scale(${s})`}>
    {pet(-150, 150, FLOR)}{pet(150, 150, FLOR)}{pet(0, 160, FLOR)}
    {pet(-70, 140, '#e3ea8f')}{pet(70, 140, '#e3ea8f')}
    {/* labelo: tubo que se abre en una trompeta con borde ondulado */}
    <path d={`M -22 -10 L -${30 + 30 * a} ${70 + 20 * a} Q 0 ${95 + 25 * a} ${30 + 30 * a} ${70 + 20 * a} L 22 -10 Z`} fill={FLOR2} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M -${30 + 30 * a} ${70 + 20 * a} q 15 12 30 4 q 15 10 30 -2 q 15 10 ${30 * a} -2`} stroke={KC.ink} strokeWidth={4} fill="none" />
    <path d={`M -6 ${30} Q 0 ${60 * a + 20} 6 30`} stroke="#c9a52a" strokeWidth={4} fill="none" />
    <rect x={-6} y={-24} width={12} height={34} rx={6} fill="#fff8d0" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Enredadera de vainilla sobre un tronco: tallo verde en zigzag, hojas carnosas alternas y raicitas aéreas. crece 0..1.
function Enredadera({ T, x, y, alto = 760, crece = 1, flor = 0 }) {
  const n = 7, paso = alto / n, vis = Math.floor(n * kclamp(crece, 0, 1) + 0.999);
  const pts = Array.from({ length: n + 1 }, (_, i) => [x + (i % 2 ? 40 : -40), y - i * paso]);
  const d = pts.slice(0, vis + 1).map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  return <g>
    <rect x={x - 70} y={y - alto - 80} width={140} height={alto + 160} rx={40} fill="#8a5a3a" stroke={KC.ink} strokeWidth={9} />
    {[0.2, 0.45, 0.7].map((k, i) => <path key={i} d={`M ${x - 50} ${y - alto * k} q 30 -20 70 0`} stroke="#6b4329" strokeWidth={6} fill="none" />)}
    <path d={d} stroke={HOJA2} strokeWidth={16} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    {pts.slice(1, vis + 1).map(([px, py], i) => { const lado = i % 2 ? 1 : -1, m = mece(T, i + 2, 0.4) * 5;
      return <g key={i}>
        <path d={`M ${px} ${py} q ${lado * 60} ${-40} ${lado * 150} ${-10 + m} q ${-lado * 60} ${50} ${-lado * 150} ${10 - m} Z`} fill={HOJA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d={`M ${px} ${py} q ${lado * 70} ${-20} ${lado * 140} ${-10 + m}`} stroke={HOJA2} strokeWidth={3} fill="none" />
        <path d={`M ${px} ${py} q ${-lado * 20} 10 ${-lado * 30} 30`} stroke="#c8b07a" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>; })}
    {flor > 0 && <FlorVainilla T={T} x={pts[5][0] + 90} y={pts[5][1] + 10} s={0.95} abre={flor} rot={20} />}
  </g>;
}
// Anillo de benceno (hexágono con dobles enlaces) y los grupos de la vainillina o del ácido ferúlico.
// tipo: 'vainillina' (–CHO arriba) | 'ferulico' (cola CH=CH–COOH arriba) | 'coa' (ferúlico con etiqueta CoA). cola 0..1 = cuánto queda de la cola.
function MolV({ x, y, s = 1, rot = 0, tipo = 'vainillina', color = '#fff', brillo = 0, o = 1, cola = 1 }) {
  const R = 40, P = [0, 1, 2, 3, 4, 5].map((i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [R * Math.cos(a), R * Math.sin(a)]; });
  const st = { stroke: KC.ink, strokeWidth: 6, strokeLinecap: 'round', fill: 'none' };
  const tx = (t, px, py, f = 26) => <text x={px} y={py} textAnchor="middle" dominantBaseline="middle" style={{ font:`700 ${f}px ${KF.mono}` }} fill={KC.ink}>{t}</text>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <circle r={110} fill={KC.gold2} opacity={0.45 * brillo} />}
    <polygon points={P.map((p) => p.join(',')).join(' ')} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 2, 4].map((i) => { const a = P[i], b = P[(i + 1) % 6]; return <line key={i} x1={a[0] * 0.72 + b[0] * 0.0 + (b[0] - a[0]) * 0.18} y1={a[1] * 0.72 + (b[1] - a[1]) * 0.18} x2={b[0] * 0.72 - (b[0] - a[0]) * 0.18} y2={b[1] * 0.72 - (b[1] - a[1]) * 0.18} {...st} strokeWidth={5} />; })}
    {/* OCH3 en la posición 3 (abajo a la derecha) y OH en la 4 (abajo) */}
    <line x1={P[2][0]} y1={P[2][1]} x2={P[2][0] + 30} y2={P[2][1] + 18} {...st} />{tx('OCH₃', P[2][0] + 78, P[2][1] + 30, 24)}
    <line x1={P[3][0]} y1={P[3][1]} x2={P[3][0]} y2={P[3][1] + 30} {...st} />{tx('OH', P[3][0], P[3][1] + 50, 24)}
    {tipo === 'vainillina' && <g>
      <line x1={0} y1={-R} x2={0} y2={-R - 34} {...st} />
      <line x1={0} y1={-R - 34} x2={-28} y2={-R - 56} {...st} /><line x1={6} y1={-R - 30} x2={-22} y2={-R - 52} {...st} strokeWidth={0} />
      {tx('O', -40, -R - 66, 26)}{tx('H', 26, -R - 50, 22)}
    </g>}
    {tipo !== 'vainillina' && <g>
      <line x1={0} y1={-R} x2={0} y2={-R - 30} {...st} />
      <g opacity={cola}><line x1={0} y1={-R - 30} x2={30} y2={-R - 50} {...st} /><line x1={6} y1={-R - 20} x2={34} y2={-R - 38} {...st} strokeWidth={4} />
        <line x1={30} y1={-R - 50} x2={30} y2={-R - 82} {...st} />
        {tipo === 'ferulico' ? tx('COOH', 34, -R - 104, 24) : <g><rect x={-14} y={-R - 132} width={92} height={42} rx={21} fill={E1} stroke={KC.ink} strokeWidth={4} />{tx('CoA', 32, -R - 110, 22)}</g>}
      </g>
    </g>}
  </g>;
}
// Barril de petróleo, tronco y fábrica con chimenea (síntesis química).
function Barril({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-120} width={180} height={240} rx={24} fill="#22252b" stroke={KC.ink} strokeWidth={9} />
    {[-70, 0, 70].map((b) => <rect key={b} x={-96} y={b - 8} width={192} height={16} rx={8} fill="#3b4049" stroke={KC.ink} strokeWidth={5} />)}
    <path d="M 0 -40 Q 30 0 0 30 Q -30 0 0 -40 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Tronco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-60} width={300} height={120} rx={20} fill="#a8703f" stroke={KC.ink} strokeWidth={9} />
    {[-80, -10, 60].map((a) => <path key={a} d={`M ${a} -50 q 20 50 0 100`} stroke="#7d4f28" strokeWidth={5} fill="none" />)}
    <ellipse cx={150} cy={0} rx={40} ry={60} fill="#e7c38f" stroke={KC.ink} strokeWidth={8} />
    {[36, 22, 10].map((r) => <ellipse key={r} cx={150} cy={0} rx={r * 0.66} ry={r} fill="none" stroke="#b9874e" strokeWidth={4} />)}
  </g>;
}
function Fabrica({ T, x, y, s = 1, humo = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.5 + i / 5) % 1); return <circle key={i} cx={110 + u * 60 + Math.sin(T * 2 + i) * 10} cy={-330 - u * 220} r={30 + u * 40} fill="#ffffff" opacity={humo * (0.85 - u * 0.8)} stroke="rgba(22,18,15,.25)" strokeWidth={3} />; })}
    <rect x={80} y={-330} width={70} height={200} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
    <path d="M -200 160 L -200 -60 L -100 -130 L -100 -60 L 0 -130 L 0 -60 L 100 -130 L 100 -60 L 200 -130 L 200 160 Z" fill="#d1d6e0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[-140, -40, 60, 140].map((a) => <rect key={a} x={a - 24} y={-20} width={48} height={60} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} opacity={0.6 + 0.4 * Math.abs(Math.sin(T * 3 + a))} />)}
    <rect x={-50} y={70} width={100} height={90} fill="#6b7280" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Montoncito de polvo blanco (vainillina).
function Polvo({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (0.3 + 0.7 * p)})`}>
    <path d="M -130 0 Q -60 -110 0 -120 Q 60 -110 130 0 Z" fill="#fbf8ef" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[[-50, -40], [10, -80], [60, -30], [-10, -20]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} l 6 -14 l 6 14`} stroke="#d9d2bf" strokeWidth={4} fill="none" />)}
  </g>;
}
// Etiqueta de precio colgante.
function Precio({ T, x, y, s = 1, texto, color, sub }) {
  return <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 2 + x) * 4}) scale(${s})`}>
    <line x1={-110} y1={-80} x2={-150} y2={-170} stroke={KC.ink} strokeWidth={5} />
    <path d="M -130 -90 L 160 -90 L 160 90 L -130 90 L -190 0 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={-140} cy={0} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={20} y={-10} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <text x={20} y={50} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
}
// Costal de salvado de arroz.
function Costal({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 2})`}>
    <path d="M -140 -170 Q -170 -200 -120 -220 L 120 -220 Q 170 -200 140 -170 Q 190 40 150 170 Q 0 210 -150 170 Q -190 40 -140 -170 Z" fill="#e8d3a6" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -120 -190 Q 0 -150 120 -190" stroke="#b49768" strokeWidth={8} fill="none" />
    <rect x={-110} y={-60} width={220} height={130} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-8} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>SALVADO</text>
    <text x={0} y={44} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>DE ARROZ</text>
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={-130 + i * 32} cy={-232 - (i % 3) * 8} rx={12} ry={6} fill="#c9a25e" stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Tanque de fermentación chico con burbujas.
function TanqueChico({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-260} width={300} height={500} rx={60} fill="#c9d3dd" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={-120} width={240} height={330} rx={40} fill="#f1d27a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 8 }, (_, i) => { const u = (T * 0.6 + i / 8) % 1; return <circle key={i} cx={-80 + (i * 37) % 160} cy={190 - u * 300} r={8 + (i % 3) * 4} fill="rgba(255,255,255,.75)" stroke="rgba(22,18,15,.4)" strokeWidth={2} />; })}
    <circle cx={0} cy={40} r={70} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-30} y={-310} width={60} height={60} rx={10} fill="#9aa3b5" stroke={KC.ink} strokeWidth={7} />
    <rect x={-160} y={230} width={40} height={60} fill="#6b7280" stroke={KC.ink} strokeWidth={6} /><rect x={120} y={230} width={40} height={60} fill="#6b7280" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Enzima tipo «comecocos» con número.
function Enzima({ x, y, s = 1, color, num, boca = 0, rot = 0 }) {
  const a = 18 + boca * 32, c = Math.cos(a * Math.PI / 180) * 70, sn = Math.sin(a * Math.PI / 180) * 70;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${c} ${-sn} A 70 70 0 1 0 ${c} ${sn} Z`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={-6} cy={-36} r={9} fill="#fff" /><circle cx={-4} cy={-36} r={4} fill={KC.ink} />
    <text x={-26} y={22} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={2}>{num}</text>
  </g>;
}
// Frasco de vainillina con sello «NATURAL».
function FrascoV({ x, y, s = 1, sello = 0 }) {
  const k = kclamp(sello, 0, 1), sc = klerp(2.4, 1, kEase.sale(k));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-200} width={300} height={380} rx={40} fill="rgba(230,245,255,.65)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={-40} width={240} height={200} rx={26} fill="#fbf8ef" />
    <rect x={-120} y={-270} width={240} height={80} rx={18} fill={KC.violet} stroke={KC.ink} strokeWidth={9} />
    <rect x={-110} y={-150} width={220} height={80} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-96} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>vainillina</text>
    {k > 0 && <g transform={`translate(70 80) rotate(-14) scale(${sc})`} opacity={kprog(k, 0, 0.3)}>
      <rect x={-150} y={-46} width={300} height={92} rx={16} fill="none" stroke={KC.leaf} strokeWidth={12} />
      <text x={0} y={22} textAnchor="middle" style={{ font:`400 72px ${KF.titulo}` }} fill={KC.leaf}>NATURAL</text>
    </g>}
  </g>;
}
// Edmond Albius (dibujo esquemático): niño con camisa clara, con una varita en la mano. p 0..1 = la varita se acerca a la flor.
function Nino({ x, y, s = 1, p = 0, T = 0 }) {
  const brazo = klerp(-30, -62, kEase.suave(kclamp(p, 0, 1)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={330} rx={120} ry={18} fill="rgba(0,0,0,.18)" />
    <rect x={-50} y={150} width={40} height={180} rx={18} fill="#6b4a2e" stroke={KC.ink} strokeWidth={7} />
    <rect x={10} y={150} width={40} height={180} rx={18} fill="#6b4a2e" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -40 Q -90 -70 -50 -80 L 50 -80 Q 90 -70 80 -40 L 70 170 L -70 170 Z" fill="#f2ede0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g transform={`translate(60 -50) rotate(${brazo})`}>
      <rect x={0} y={-18} width={150} height={36} rx={18} fill="#5a3a24" stroke={KC.ink} strokeWidth={7} />
      <line x1={140} y1={0} x2={230} y2={-6} stroke="#c8a46a" strokeWidth={8} strokeLinecap="round" />
    </g>
    <rect x={-90} y={-40} width={36} height={150} rx={18} fill="#5a3a24" stroke={KC.ink} strokeWidth={7} transform="rotate(8 -72 -40)" />
    <circle cx={0} cy={-140} r={64} fill="#5a3a24" stroke={KC.ink} strokeWidth={8} />
    <path d="M -60 -170 Q -50 -215 0 -212 Q 50 -215 62 -168 Q 30 -190 -60 -170 Z" fill="#1d1410" />
    <circle cx={24} cy={-146} r={7} fill={KC.ink} /><circle cx={-12} cy={-146} r={7} fill={KC.ink} />
    <path d="M -6 -112 q 16 10 30 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Arco del día con el sol (abre en la mañana, cierra en la tarde). u 0..1.
function ArcoDia({ x, y, r = 300, u = 0 }) {
  const a = Math.PI * (1 - u), sx = x + r * Math.cos(a), sy = y - r * Math.sin(a) * 0.7;
  return <g>
    <path d={`M ${x - r} ${y} A ${r} ${r * 0.7} 0 0 1 ${x + r} ${y}`} stroke="rgba(22,18,15,.5)" strokeWidth={6} strokeDasharray="14 12" fill="none" />
    <circle cx={sx} cy={sy} r={46} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => { const b = i * Math.PI / 4; return <line key={i} x1={sx + Math.cos(b) * 58} y1={sy + Math.sin(b) * 58} x2={sx + Math.cos(b) * 76} y2={sy + Math.sin(b) * 76} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />; })}
    <text x={x - r} y={y + 50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>abre</text>
    <text x={x + r} y={y + 50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>cierra</text>
  </g>;
}

function Vainilla() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, M: CUES.Molecula, E: CUES.Escasa, S: CUES.Sintetica, P: CUES.Precio, Q: CUES.Pregunta, Mi: CUES.Microbios, En: CUES.Enzimas,
    N: CUES.Natural, A: CUES.Albius, F: CUES.Flor, To: CUES.Toneladas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const MI2 = K.Mi + 1.5;                       // del costal al microscopio
  const gotea = kprog(T, K.G + 0.2, K.G + 1.4, kEase.sale);
  const R = krng(23);
  const feru = Array.from({ length: 6 }, (_, i) => [R() * 0.6 + 0.2, 560 + R() * 480, R() * 360, i]);
  // enzimas: la 1 prepara (CoA), la 2 corta la cola, sale vainillina
  const e1 = kprog(T, K.En + 0.1, K.En + 0.8), e2 = kprog(T, K.En + 0.9, K.En + 1.5), sale = kprog(T, K.En + 1.5, K.N, kEase.suave);
  const flores = kprog(T, K.O + 1.6, K.O + 3.2, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el helado y la vaina */}
      <Escena T={T} a={K.G} b={K.O} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgV>
          <Cono T={T} x={330} y={760} s={1.05} gota={gotea} />
          <Vaina x={600} y={1160} largo={760} rot={-6} />
          <Goteo T={T} x={425} y0={820} y1={1100} cada={0.9} color={CREMA} desde={K.G + 1.2} hasta={K.O} />
        </SvgV>
      </Escena>
      {/* 1 · origen: orquídea de México, Papantla */}
      <Escena T={T} a={K.O} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgV>
          <Enredadera T={T} x={240} y={1180} alto={760} crece={kprog(T, K.O - 0.3, K.O + 1.6, kEase.sale)} flor={flores} />
          <g opacity={kprog(T, K.O + 0.6, K.O + 1.2)}>
            <MapaMexico x={480} y={780} ancho={560}>
              {(() => { const [px, py] = mxProy(-97.32, 20.45); const late = 1 + 0.25 * Math.max(0, Math.sin(T * 6)); return <g>
                <circle cx={px} cy={py} r={26 * late} fill="none" stroke={KC.red} strokeWidth={8} />
                <circle cx={px} cy={py} r={12} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>; })()}
            </MapaMexico>
          </g>
        </SvgV>
      </Escena>
      {/* 2 · por dentro de la vaina curada: escarcha de vainillina */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgV><Vaina x={540} y={1120} largo={820} ancho={60} rot={-4} /></SvgV>
      </Escena>
      <Lupa T={T} at={K.M + 0.1} until={K.E - 0.15} x={540} y={680} r={280} fx={560} fy={1110} tinte={KC.gold2} etiqueta="POR DENTRO · VAINA CURADA"
        interior={(t, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#1e120b" />
          {Array.from({ length: 70 }, (_, i) => { const q = krng(i + 3); return <circle key={i} cx={q() * r * 2} cy={q() * r * 2} r={3 + q() * 4} fill="#0a0604" />; })}
          {Array.from({ length: 26 }, (_, i) => { const q = krng(i + 50), cx = q() * r * 2, cy = q() * r * 2, l = 16 + q() * 30, a = q() * 180, on = kprog(t, K.M + 0.3 + i * 0.03, K.M + 0.6 + i * 0.03);
            return <line key={'c' + i} x1={cx} y1={cy} x2={cx + Math.cos(a) * l * on} y2={cy + Math.sin(a) * l * on} stroke="#f7f3e6" strokeWidth={4} strokeLinecap="round" opacity={0.9} />; })}
          <MolV x={r} y={r + 10} s={1.25} tipo="vainillina" color={KC.paper} brillo={kprog(t, K.M + 0.8, K.M + 1.4)} o={kprog(t, K.M + 0.7, K.M + 1.1)} rot={Math.sin(t * 1.2) * 6} />
        </svg>} />
      {/* 3 · 1–2 % del peso de la vaina */}
      <Escena T={T} a={K.E} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgV>
          <Vaina x={560} y={900} largo={860} ancho={70} rot={0} />
          {(() => { const u = kprog(T, K.E + 0.6, K.E + 1.6, kEase.sale); return <g>
            <rect x={130} y={1020} width={860} height={60} rx={30} fill={VAINA} stroke={KC.ink} strokeWidth={7} />
            <rect x={130} y={1020} width={Math.max(0.001, 860 * 0.02 * u)} height={60} rx={8} fill="#fbf8ef" stroke={KC.ink} strokeWidth={4} />
            <path d={`M ${147} 1010 L 147 960`} stroke={KC.ink} strokeWidth={5} opacity={u} />
          </g>; })()}
        </SvgV>
        <div style={{ position:'absolute', left:640, top:600, transform:`translate(-50%,-50%) scale(${klerp(0.4, 1, kprog(T, K.E + 0.4, K.E + 0.9, kEase.rebote))})`, opacity:kprog(T, K.E + 0.4, K.E + 0.7),
          font:`400 230px/1 ${KF.titulo}`, color:KC.paper, WebkitTextStroke:`8px ${KC.ink}`, textShadow:`10px 10px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>1–2 %</div>
      </Escena>
      {/* 4 · la mayoría: química, del petróleo o de la madera */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgV>
          {(() => { const u = kprog(T, K.S + 0.3, K.S + 1.8, kEase.suave); return <g>
            <Barril x={klerp(200, 360, u)} y={620} s={0.9} />
            <Tronco x={klerp(180, 330, u)} y={960} s={0.75} />
          </g>; })()}
          <Fabrica T={T} x={760} y={880} s={0.9} />
          <Polvo x={760} y={1130} s={0.9} p={kprog(T, K.S + 1.8, K.S + 2.8, kEase.sale)} />
        </SvgV>
      </Escena>
      {/* 5 · cien veces más barata */}
      <Escena T={T} a={K.P} b={K.Q} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgV>
          <Precio T={T} x={300} y={760} s={klerp(0.2, 0.62, kprog(T, K.P + 0.2, K.P + 0.7, kEase.rebote))} texto="$" sub="sintética" color={KC.paper} />
          <Precio T={T} x={680} y={900} s={klerp(0.2, 1.3, kprog(T, K.P + 0.6, K.P + 1.3, kEase.rebote))} texto="$$$$$" sub="de vaina" color={KC.yellow} />
        </SvgV>
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Q} b={K.Mi} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgV>
          <g opacity={1 - kprog(T, K.Q + 0.6, K.Q + 2.0)}><FlorVainilla T={T} x={800} y={1000} s={1.1} abre={1} /></g>
          <text x={800} y={880} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 800 700)`}>?</text>
        </SvgV>
      </Escena>
      {/* 7a · salvado de arroz → ácido ferúlico → tanque */}
      <Escena T={T} a={K.Mi} b={MI2} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgV>
          <Costal x={260} y={900} s={0.95} T={T} />
          {Array.from({ length: 4 }, (_, i) => { const u = kprog(T, K.Mi + 0.1 + i * 0.25, K.Mi + 0.9 + i * 0.25, kEase.suave); return u > 0 && u < 1 ?
            <MolV key={i} x={klerp(380, 720, u)} y={klerp(760, 640, u) - Math.sin(u * Math.PI) * 120} s={0.45} tipo="ferulico" color="#bfe8ff" rot={u * 200} /> : null; })}
          <TanqueChico T={T} x={780} y={900} s={0.95} />
        </SvgV>
      </Escena>
      {/* 7b–8 · al microscopio: la bacteria transforma el ácido ferúlico en vainillina */}
      <Escena T={T} a={MI2} b={K.N} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(244,194,90,.22)" />
        <SvgV>
          <Bacteria T={T} x={560} y={830} largo={880} ancho={430} color="#7fd88a" seed={7} nucleoide={false} />
          {/* moléculas que entran antes de las enzimas */}
          {feru.map(([f, yy, rr, i]) => { const u = kprog(T, MI2 + i * 0.25, MI2 + 1.0 + i * 0.25, kEase.suave); return T < K.En + 0.1 ?
            <MolV key={i} x={klerp(-80, 220 + i * 90, u)} y={klerp(yy, 760 + (i % 2) * 120, u)} s={0.5} tipo="ferulico" color="#bfe8ff" rot={rr + T * 30} /> : null; })}
          {T >= K.En - 0.4 && <g>
            <MolV x={540} y={900} s={1.25} tipo={e1 >= 1 ? 'coa' : 'ferulico'} color={e2 >= 1 ? KC.paper : '#bfe8ff'} cola={1 - e2} brillo={e2 >= 1 ? 1 : 0} />
            {e2 >= 1 && <MolV x={540} y={900} s={1.25} tipo="vainillina" color={KC.paper} brillo={0.6 + 0.4 * Math.sin(T * 5)} />}
            {T < K.En + 0.95 && <Enzima x={klerp(260, 430, e1)} y={790} s={1.1} color={E1} num="1" boca={Math.abs(Math.sin(T * 9))} />}
            {T >= K.En + 0.7 && T < K.En + 1.7 && <Enzima x={klerp(880, 650, kprog(T, K.En + 0.7, K.En + 1.0))} y={700} s={1.1} rot={180} color={E2} num="2" boca={Math.abs(Math.sin(T * 10))} />}
            {e2 > 0 && <g transform={`translate(${klerp(600, 980, kprog(T, K.En + 1.5, K.En + 2.6))} ${klerp(700, 500, kprog(T, K.En + 1.5, K.En + 2.6))}) rotate(${T * 90})`} opacity={1 - kprog(T, K.En + 2.2, K.En + 2.7)}>
              <path d="M -30 10 L 0 -10 L 0 -40" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" /><rect x={-10} y={-80} width={92} height={42} rx={21} fill={E1} stroke={KC.ink} strokeWidth={4} /></g>}
          </g>}
          {sale > 0 && [0, 1, 2].map((i) => <MolV key={'v' + i} x={klerp(760, 1180, kprog(T, K.En + 1.8 + i * 0.3, K.En + 3.2 + i * 0.3))} y={980 + i * 50} s={0.45} tipo="vainillina" color={KC.paper} brillo={0.6} />)}
        </SvgV>
      </Escena>
      {/* 9 · cuenta como natural */}
      <Escena T={T} a={K.N} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgV><FrascoV x={540} y={900} s={1.1} sello={kprog(T, K.N + 0.6, K.N + 1.1)} /></SvgV>
      </Escena>
      {/* 10 · 1841, isla Reunión: Edmond Albius poliniza la flor a mano */}
      <Escena T={T} a={K.A} b={K.F} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#f3d9a4' }}></div>
        <SvgV>
          <Enredadera T={T} x={700} y={1180} alto={640} crece={1} flor={0} />
          <FlorVainilla T={T} x={560} y={790} s={1.0} abre={1} rot={-10} />
          <Nino x={300} y={880} s={1.0} p={kprog(T, K.A + 3.6, K.A + 5.2)} T={T} />
          {T > K.A + 5.2 && <circle cx={560} cy={790} r={60 + 30 * Math.abs(Math.sin(T * 4))} fill="none" stroke={KC.gold} strokeWidth={8} opacity={0.8} />}
          <rect x={0} y={0} width={KW} height={KH} fill="rgba(110,80,40,.12)" />
        </SvgV>
      </Escena>
      {/* 11 · cada flor abre un solo día */}
      <Escena T={T} a={K.F} b={K.To} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgV>
          <ArcoDia x={540} y={760} r={320} u={kprog(T, K.F, K.To + 0.3)} />
          <FlorVainilla T={T} x={540} y={1000} s={1.5} abre={1 - kprog(T, K.F + 1.4, K.To + 0.3)} />
        </SvgV>
      </Escena>
      {/* 12 · ≈ 60 000 t (estimado 2024) y de dónde salen */}
      <Escena T={T} a={K.To} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.18)" />
        <SvgV>
          {Array.from({ length: 30 }, (_, i) => { const q = krng(i + 90), u = kprog(T, K.To + 0.3 + i * 0.05, K.To + 0.9 + i * 0.05, kEase.sale); return <Polvo key={i} x={120 + (i % 10) * 92} y={klerp(900, 1100 - Math.floor(i / 10) * 60, u)} s={0.32} p={u} />; })}
          {(() => { const u = kprog(T, K.To + 1.6, K.To + 2.6, kEase.sale), W = 900 * u; return <g>
            <rect x={90} y={1440} width={900} height={70} rx={14} fill="rgba(0,0,0,.35)" stroke={KC.ink} strokeWidth={6} />
            <rect x={90} y={1440} width={W * 0.8} height={70} rx={14} fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} />
            <rect x={90 + W * 0.8} y={1440} width={W * 0.19} height={70} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
            <rect x={90 + W * 0.985} y={1440} width={Math.max(0.001, W * 0.015)} height={70} fill="#e0b48a" stroke={KC.ink} strokeWidth={3} />
          </g>; })()}
        </SvgV>
      </Escena>
      {/* 13 · cierre: el helado del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgV>
          <Cono T={T} x={300} y={760} s={1.05} gota={1} />
          <Vaina x={600} y={1160} largo={760} rot={-6} />
        </SvgV>
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 0.05} until={K.O - 0.3} valor={1} desde={1} dur={0.1} prefijo="< " sufijo=" %" x={330} y={430} tam={190} color={KC.paper} />
      <MitoTachado T={T} at={K.G + 1.0} tacharEn={K.G + 2.4} until={K.O - 0.3} texto="sale de la vaina" x={540} y={1500} tam={46} />
      <Etiqueta T={T} at={K.G + 2.8} until={K.O - 0.3} x={60} y={1630} texto="de la vainillina del mundo" tam={34} color={KC.ink} />
      <Chip T={T} at={K.O + 0.6} until={K.M - 0.3} texto="México · Papantla, Veracruz" y={1500} tam={40} borde={KC.red} />
      <Etiqueta T={T} at={K.O + 1.8} until={K.M - 0.3} x={60} y={1630} texto="Vanilla planifolia · orquídea" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.M + 1.0} until={K.E - 0.3} texto="vainillina: su aroma principal" y={1500} tam={40} borde={KC.gold2} />
      <Etiqueta T={T} at={K.M + 1.6} until={K.E - 0.3} x={60} y={1630} texto="cristales en agujitas (escarcha)" tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 1.2} until={K.S - 0.3} texto="del peso de la vaina curada" y={1500} tam={40} borde={KC.paper} />
      <Etiqueta T={T} at={K.S + 0.6} until={K.P - 0.3} x={540} y={470} texto="petróleo (guayacol)" lado="izq" tam={32} color={KC.ink} />
      <Etiqueta T={T} at={K.S + 1.0} until={K.P - 0.3} x={40} y={1090} texto="madera (lignina)" tam={32} color={KC.ink} />
      <Chip T={T} at={K.S + 1.6} until={K.P - 0.3} texto="la mayoría: síntesis química" y={1500} tam={40} borde={KC.cyan} />
      <Medidor T={T} at={K.P + 1.2} until={K.Q - 0.3} valor={(t) => 0.01 + 0.99 * (1 - kprog(t, K.P + 1.4, K.P + 2.4, kEase.suave))} etiqueta="precio de la sintética" texto={(v) => (v < 0.05 ? '≈ 1/100' : '')} x={90} y={1440} color={KC.yellow} />
      <Chip T={T} at={K.Mi + 0.3} until={MI2 - 0.1} texto="ácido ferúlico" y={1500} tam={42} borde="#bfe8ff" />
      <Chip T={T} at={MI2 + 0.2} until={K.N - 0.3} texto="AL MICROSCOPIO · BACTERIA" y={360} x={600} tam={32} mono borde={KC.mint} />
      <Etiqueta T={T} at={MI2 + 0.6} until={K.En - 0.1} x={60} y={1500} texto="ácido ferúlico" color="#bfe8ff" />
      <Etiqueta T={T} at={K.En + 1.6} until={K.N - 0.3} x={60} y={1500} texto="vainillina" color={KC.gold2} />
      <div style={{ position:'absolute', left:60, top:1640, zIndex:40, font:`700 28px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, opacity:(T > MI2 && T < K.N - 0.2) ? 1 : 0 }}>esquemático · no a escala</div>
      <Chip T={T} at={K.N + 1.2} until={K.A - 0.3} texto="«aroma natural» · UE y EE. UU." y={1500} tam={38} borde={KC.leaf} />
      <TarjetaEstudio T={T} at={K.A + 0.2} until={K.A + 3.4} anio="1841" quien="Edmond Albius, 12 años" revista="isla Reunión · océano Índico" y={470} />
      <Chip T={T} at={K.A + 3.6} until={K.F - 0.3} texto="polinización a mano" y={1500} tam={42} borde={KC.gold} />
      <Etiqueta T={T} at={K.A + 4.0} until={K.F - 0.3} x={60} y={1630} texto="niño esclavizado · dibujo esquemático" tam={30} color={KC.ink} />
      <Chip T={T} at={K.F + 0.2} until={K.To - 0.2} texto="1 flor = 1 día" y={1500} tam={46} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.To + 0.2} until={K.Ci - 0.3} valor={60000} dur={1.2} prefijo="≈ " sufijo=" t" etiqueta="estimado 2024" x={380} y={560} tam={150} color={KC.yellow} />
      {kvisible(T, K.To + 2.0, K.Ci - 0.3) && <div style={{ position:'absolute', left:90, top:1530, width:900, zIndex:41, display:'flex', justifyContent:'space-between', font:`700 28px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, opacity:kprog(T, K.To + 2.0, K.To + 2.4) * (1 - kprog(T, K.Ci - 0.3, K.Ci + 0.1)) }}>
        <span>química</span><span style={{ color:KC.mint }}>microbios</span><span style={{ color:'#e0b48a' }}>vaina &lt;1 %</span></div>}
      <Chip T={T} at={K.Ci + 0.5} until={K.Ou} texto="orquídea" x={760} y={860} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.Ci + 1.1} until={K.Ou} texto="petróleo o madera" x={740} y={960} tam={38} borde="#9aa3b5" />
      <Chip T={T} at={K.Ci + 1.7} until={K.Ou} texto="microbio" x={760} y={1060} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 0.3} until={K.Ou} texto="¿de dónde salió tu vainillina?" y={1500} tam={38} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.05} until={K.O - 0.1} texto="Menos del *1 %* sale de la vaina." />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.M - 0.1} texto="Una orquídea *de México.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.E - 0.1} texto="Su aroma: *la vainillina.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.S - 0.1} texto="Solo el *1 o 2 %* de la vaina." />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="La mayoría: *química.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Q - 0.1} texto="*Cien veces* más barata." />
      <Subtitulo T={T} idx={6} at={K.Q + 0.1} until={K.Mi - 0.1} texto="¿Natural, *sin orquídea?*" />
      <Subtitulo T={T} idx={7} at={K.Mi + 0.1} until={K.En - 0.1} texto="Un microbio y *salvado de arroz.*" />
      <Subtitulo T={T} idx={8} at={K.En + 0.1} until={K.N - 0.1} texto="Dos enzimas: *vainillina.*" />
      <Subtitulo T={T} idx={9} at={K.N + 0.1} until={K.A - 0.1} texto="Y cuenta como *natural.*" />
      <Subtitulo T={T} idx={10} at={K.A + 0.1} until={K.F - 0.1} texto="1841: *Edmond Albius,* 12 años." />
      <Subtitulo T={T} idx={11} at={K.F + 0.1} until={K.To - 0.1} texto="Cada flor: *un solo día.*" />
      <Subtitulo T={T} idx={12} at={K.To + 0.1} until={K.Ci - 0.1} texto="2024: *≈ 60 mil toneladas.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="¿Petróleo *o un microbio?*" />

      <Robert T={T} apariciones={ROBERT_V(CUES)} />
      <MarcaAgua T={T} tema="bioquimica" num="23" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Apariciones de Robert: [at, until, pose, lado]
function ROBERT_V(C) {
  return [
    [C.Gancho - 0.5, C.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
    [C.Origen + 1.5, C.Molecula - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
    [C.Escasa + 0.5, C.Sintetica - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
    [C.Precio + 0.4, C.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
    [C.Pregunta - 0.05, C.Microbios + 0.2, 'avatar_07_pensativo_puno', 'grande-izq'],
    [C.Natural + 0.3, C.Albius - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
    [C.Albius + 3.6, C.Flor - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
    [C.Toneladas + 0.4, C.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
    [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'gancho'],
  ];
}

function VainillaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Vainilla /></CompositionStage></div>;
}
window.VainillaApp = VainillaApp;
