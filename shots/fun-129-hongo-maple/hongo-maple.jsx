// Shot Fungi Mati #129 · Este hongo huele a hot cakes con miel de maple — NARRADO (gancho 1 "Esto no es X: es Y"; N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es guía de recolección.

const HM = {
  cafe:'#a4502a', cafe2:'#c4703c', cafe3:'#6e3018', seco:'#6b351c', seco2:'#8a4a26', lam:'#f6dcc0', pie:'#b8693c',
  masa:'#e9b25e', masa2:'#c98634', borde:'#a8641f', jarabe:'#b5651d', jarabe2:'#d98b2b', mant:'#fff1a8', helado:'#f6e7c8',
  fenog:'#d9a63a', fenog2:'#b88324', vidrio:'rgba(220,240,255,.28)', helvus:'#b07a52',
};

// Pila de hot cakes. Centro abajo en (x, y). chorro 0..1 = jarabe que cae y escurre.
function HotCakes({ T, x, y, s = 1, chorro = 1, mantequilla = 1 }) {
  const capas = [0, 1, 2, 3];
  const esc = kclamp(chorro * 1.4 - 0.3, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={16} rx={290} ry={46} fill="#f4f1ea" stroke={KC.ink} strokeWidth={8} />
    {capas.map((i) => { const cy = -i * 52; return <g key={i}>
      <path d={`M -230 ${cy} Q -240 ${cy - 30} -200 ${cy - 44} L 200 ${cy - 44} Q 240 ${cy - 30} 230 ${cy} Q 0 ${cy + 26} -230 ${cy} Z`} fill={HM.masa} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M -218 ${cy - 8} Q 0 ${cy + 14} 218 ${cy - 8}`} stroke={HM.borde} strokeWidth={6} fill="none" opacity=".7" />
    </g>; })}
    {/* cara de arriba */}
    <ellipse cx={0} cy={-200} rx={205} ry={34} fill={HM.masa2} stroke={KC.ink} strokeWidth={7} />
    {/* jarabe en la cara de arriba y escurriendo por el borde */}
    {esc > 0 && <g opacity={esc}>
      <ellipse cx={-10} cy={-202} rx={150 * esc} ry={24 * esc} fill={HM.jarabe} stroke={KC.ink} strokeWidth={4} />
      {[[-150, 90], [-60, 150], [70, 120], [160, 70]].map(([dx, l], i) => <path key={i} d={`M ${dx - 14} -196 L ${dx - 14} ${-196 + l * esc} Q ${dx} ${-180 + l * esc} ${dx + 14} ${-196 + l * esc} L ${dx + 14} -196 Z`} fill={HM.jarabe} stroke={KC.ink} strokeWidth={4} />)}
      <ellipse cx={-50} cy={-208} rx={50 * esc} ry={8 * esc} fill="#fff" opacity=".35" />
    </g>}
    {mantequilla > 0 && <g transform={`translate(20 ${-228}) scale(${mantequilla})`}>
      <rect x={-46} y={-30} width={92} height={40} rx={8} fill={HM.mant} stroke={KC.ink} strokeWidth={6} />
      <rect x={-46} y={-30} width={92} height={12} rx={6} fill="#fffbe0" />
    </g>}
  </g>;
}
// Chorro de jarabe que cae desde (x, y0) hasta y1. p 0..1 = cuánto ha bajado.
function Chorro({ T, x, y0, y1, p = 1, ancho = 22 }) {
  if (p <= 0) return null;
  const yb = klerp(y0, y1, kclamp(p, 0, 1)), w = ancho + Math.sin(T * 9) * 3;
  return <g>
    <path d={`M ${x - w / 2} ${y0} Q ${x - w / 2 + Math.sin(T * 5) * 6} ${(y0 + yb) / 2} ${x - w / 3} ${yb} L ${x + w / 3} ${yb} Q ${x + w / 2 + Math.sin(T * 5) * 6} ${(y0 + yb) / 2} ${x + w / 2} ${y0} Z`} fill={HM.jarabe2} stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${x - 4} ${y0 + 10} L ${x - 4} ${yb - 10}`} stroke="#fff" strokeWidth={4} opacity=".4" />
  </g>;
}
// Ondas de olor (vapor) que suben desde (x, y).
function Ondas({ T, x, y, n = 3, alto = 260, color = '#fff', o = 1, sep = 70 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = ((T * 0.6 + i / n) % 1), yy = y - f * alto, a = Math.sin(f * Math.PI);
    return <path key={i} d={`M ${x + (i - (n - 1) / 2) * sep} ${yy + 60} q 22 -20 0 -40 q -22 -20 0 -40 q 22 -20 0 -40`} stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" opacity={a * 0.85} />; })}</g>;
}
// Candy cap de perfil: sombrero de convexo a plano con centro un poco hundido (embudo poco hondo), café rojizo;
// láminas anaranjado muy pálido; pie del mismo color. seco 0..1: se encoge, se arruga y se oscurece. Base del pie en (x, y).
function CandyCap({ T = 0, x, y, s = 1, crece = 1, seco = 0, rot = 0, corte = 0 }) {
  if (crece <= 0) return null;
  const c = kEase.rebote(kclamp(crece, 0, 1)), k = 1 - seco * 0.22;
  const col = mixHex(HM.cafe, HM.seco, seco), col2 = mixHex(HM.cafe2, HM.seco2, seco), pie = mixHex(HM.pie, HM.seco2, seco), lam = mixHex(HM.lam, '#d9a77c', seco);
  const h = 170 * c, a = 250;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k} ${s * k * (1 - seco * 0.06)})`}>
    {/* pie */}
    <path d={`M -22 0 Q -26 ${-h * 0.5} -18 ${-h} L 18 ${-h} Q 26 ${-h * 0.5} 22 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -8 -10 Q -10 ${-h * 0.5} -6 ${-h + 10}`} stroke="#fff" strokeWidth={4} opacity=".25" fill="none" />
    {c > 0.2 && <g transform={`translate(0 ${-h})`}>
      {/* láminas (vistas por debajo) */}
      <path d={`M ${-a / 2} -4 Q 0 34 ${a / 2} -4 Q 0 6 ${-a / 2} -4 Z`} fill={lam} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 13 }, (_, i) => { const u = -1 + (2 * i) / 12; return <line key={i} x1={u * a / 2 * 0.95} y1={-2} x2={u * 14} y2={16} stroke={mixHex(lam, HM.cafe3, 0.35)} strokeWidth={2.5} />; })}
      {/* sombrero: convexo con el centro apenas hundido */}
      <path d={`M ${-a / 2} -4 Q ${-a / 2 - 8} -46 ${-a / 4} -66 Q -24 -76 0 -64 Q 24 -76 ${a / 4} -66 Q ${a / 2 + 8} -46 ${a / 2} -4 Q 0 8 ${-a / 2} -4 Z`} fill={col} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${-a / 2 + 26} -22 Q ${-a / 4} -58 -30 -60`} stroke={col2} strokeWidth={12} fill="none" strokeLinecap="round" opacity=".8" />
      {seco > 0.3 && [[-80, -30], [-30, -44], [30, -42], [80, -28], [0, -24]].map(([u, v], i) => <path key={i} d={`M ${u - 18} ${v} q 9 -8 18 0 q 9 8 18 0`} stroke={HM.cafe3} strokeWidth={4} fill="none" opacity={(seco - 0.3) * 1.4} />)}
      {/* gota de látex aguado en una lámina cortada */}
      {corte > 0 && <g opacity={corte}><circle cx={-60} cy={22 + 18 * corte} r={11} fill="rgba(235,245,255,.9)" stroke={KC.ink} strokeWidth={3} /></g>}
    </g>}
  </g>;
}
// Frasco de vidrio con hongos secos.
function FrascoSecos({ T, x, y, s = 1, rot = 0, tapa = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={-330} width={300} height={330} rx={44} fill={HM.vidrio} stroke={KC.ink} strokeWidth={8} />
    {[[-80, -40, 0.32, -20], [10, -30, 0.36, 15], [80, -50, 0.3, 40], [-40, -120, 0.34, 60], [50, -130, 0.3, -35], [-90, -190, 0.28, 10], [20, -200, 0.33, -60], [90, -190, 0.26, 25]].map(([dx, dy, k, r], i) =>
      <CandyCap key={i} x={dx} y={dy} s={k} seco={1} rot={r} />)}
    <rect x={-120} y={-310} width={26} height={280} rx={13} fill="#fff" opacity=".35" />
    <g transform={`translate(${tapa * 60} ${-330 - tapa * 80}) rotate(${tapa * 24})`}>
      <rect x={-120} y={-50} width={240} height={56} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    </g>
  </g>;
}
// Molécula esquemática de 2(5H)-furanona: anillo de 5 (O, C2=O, C3–X, C4–CH3, C5–CH3). grupo: 'NH₂' o 'OH'.
function Furanona({ T, x, y, s = 1, grupo = 'NH₂', p = 1, brillo = 0, color = KC.texto, colorGrupo = KC.yellow, rot = 0 }) {
  if (p <= 0) return null;
  const R = 70, P = [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [R * Math.cos(a), R * Math.sin(a)]; });
  // P0 = O del anillo (arriba), P1 = C2 (carbonilo), P2 = C3 (grupo), P3 = C4 (metilo), P4 = C5 (metilo)
  const ext = (i, L) => [P[i][0] * (1 + L / R), P[i][1] * (1 + L / R)];
  const [ox, oy] = ext(1, 70), [gx, gy] = ext(2, 80), [m1x, m1y] = ext(3, 80), [m2x, m2y] = ext(4, 70);
  const sw = 8, f = (t) => <text style={{ font:`700 40px ${KF.mono}` }} textAnchor="middle" dominantBaseline="middle">{t}</text>;
  const ap = (i) => kclamp(p * 6 - i, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {P.map((q, i) => { const r = P[(i + 1) % 5]; return <line key={i} x1={q[0]} y1={q[1]} x2={r[0]} y2={r[1]} stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={ap(i * 0.6)} />; })}
    {/* doble enlace C3=C4 (dentro del anillo) */}
    <line x1={P[2][0] * 0.72} y1={P[2][1] * 0.72} x2={P[3][0] * 0.72} y2={P[3][1] * 0.72} stroke={color} strokeWidth={sw - 2} strokeLinecap="round" opacity={ap(3)} />
    {/* O del anillo */}
    <circle cx={P[0][0]} cy={P[0][1]} r={26} fill={KC.noche} stroke={KC.red} strokeWidth={5} opacity={ap(1)} />
    <g fill={KC.red} transform={`translate(${P[0][0]} ${P[0][1] + 2})`} opacity={ap(1)}>{f('O')}</g>
    {/* C=O */}
    <line x1={P[1][0]} y1={P[1][1]} x2={ox} y2={oy} stroke={color} strokeWidth={sw} opacity={ap(3)} />
    <line x1={P[1][0] + 10} y1={P[1][1] - 12} x2={ox + 10} y2={oy - 12} stroke={color} strokeWidth={sw - 2} opacity={ap(3)} />
    <g fill={KC.red} transform={`translate(${ox + 22} ${oy})`} opacity={ap(3)}>{f('O')}</g>
    {/* grupo que cambia (NH₂ / OH) */}
    <line x1={P[2][0]} y1={P[2][1]} x2={gx * 0.8} y2={gy * 0.8} stroke={color} strokeWidth={sw} opacity={ap(4)} />
    <g transform={`translate(${gx + 10} ${gy + 14})`} opacity={ap(4)} style={brillo ? { filter:`drop-shadow(0 0 ${18 * brillo}px ${colorGrupo})` } : null}>
      <circle r={46 + 8 * brillo} fill="rgba(0,0,0,.35)" stroke={colorGrupo} strokeWidth={4 + 3 * brillo} />
      <g fill={colorGrupo}>{f(grupo)}</g>
    </g>
    {/* metilos */}
    <line x1={P[3][0]} y1={P[3][1]} x2={m1x * 0.86} y2={m1y * 0.86} stroke={color} strokeWidth={sw} opacity={ap(5)} />
    <g fill={color} transform={`translate(${m1x - 6} ${m1y + 16})`} opacity={ap(5)}>{f('CH₃')}</g>
    <line x1={P[4][0]} y1={P[4][1]} x2={m2x * 0.86} y2={m2y * 0.86} stroke={color} strokeWidth={sw} opacity={ap(5)} />
    <g fill={color} transform={`translate(${m2x - 30} ${m2y - 8})`} opacity={ap(5)}>{f('CH₃')}</g>
  </g>;
}
// Fibra de microextracción (SPME): una jeringa que entra al frasco y atrapa moléculas del aire.
function Fibra({ x, y, s = 1, baja = 1 }) {
  return <g transform={`translate(${x} ${y + (1 - baja) * -220}) scale(${s})`}>
    <rect x={-26} y={-330} width={52} height={190} rx={10} fill="#c9d3dc" stroke={KC.ink} strokeWidth={6} />
    <rect x={-40} y={-350} width={80} height={26} rx={8} fill="#8a96a3" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={-140} x2={0} y2={0} stroke="#dfe7ee" strokeWidth={8} />
    <rect x={-8} y={-70} width={16} height={70} rx={6} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Cromatograma: línea base con un pico que crece.
function Cromatograma({ T, x, y, w = 760, h = 260, p = 1 }) {
  const N = 90, pts = Array.from({ length: N + 1 }, (_, i) => { const u = i / N; const pico = Math.exp(-Math.pow((u - 0.62) / 0.025, 2)) * h * 0.92 + Math.exp(-Math.pow((u - 0.3) / 0.02, 2)) * h * 0.18 + Math.exp(-Math.pow((u - 0.82) / 0.02, 2)) * h * 0.12;
    return [x + u * w, y - pico * kclamp(p * 1.2, 0, 1) - Math.sin(i * 1.7) * 3]; });
  const k = Math.ceil(N * kclamp(p * 1.5, 0, 1));
  return <g>
    <rect x={x - 20} y={y - h - 30} width={w + 40} height={h + 60} rx={18} fill="rgba(0,0,0,.45)" stroke={KC.texto} strokeWidth={3} />
    <path d={'M ' + pts.slice(0, k + 1).map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={KC.mint} strokeWidth={6} fill="none" strokeLinejoin="round" />
  </g>;
}
// Galleta y cono de helado.
function Galleta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={90} fill="#d9a35a" stroke={KC.ink} strokeWidth={7} />
    {[[-30, -30], [30, -20], [0, 30], [-40, 30], [40, 40]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={10} fill={HM.seco} />)}
  </g>;
}
function Helado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 L 0 200 L 70 0 Z" fill="#d79a4e" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -50 30 L 30 120 M -20 10 L 50 70 M 40 20 L -30 110" stroke="#b5762f" strokeWidth={4} />
    <circle cx={0} cy={-30} r={82} fill={HM.helado} stroke={KC.ink} strokeWidth={7} />
    {[[-30, -60], [20, -40], [-10, -10], [40, -70]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={7} fill={HM.seco2} />)}
  </g>;
}
// Persona en silueta simple (estudiante / profesor).
function Persona({ x, y, s = 1, color = '#2346ff', lentes = false, mano = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 0 Q -90 -160 0 -170 Q 90 -160 80 0 Z" fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-230} r={60} fill="#e7b48a" stroke={KC.ink} strokeWidth={7} />
    {lentes && <g><circle cx={-22} cy={-232} r={16} fill="none" stroke={KC.ink} strokeWidth={5} /><circle cx={22} cy={-232} r={16} fill="none" stroke={KC.ink} strokeWidth={5} /><line x1={-6} y1={-232} x2={6} y2={-232} stroke={KC.ink} strokeWidth={5} /></g>}
    {mano > 0 && <path d={`M 60 -120 L ${90 + mano * 10} ${-200 - mano * 60}`} stroke={color} strokeWidth={26} strokeLinecap="round" />}
  </g>;
}
// Semillas de fenogreco (amarillas, angulosas) en un montoncito.
function Fenogreco({ x, y, s = 1, n = 26, seed = 4 }) {
  const r = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const a = r() * Math.PI, d = Math.sqrt(r()) * 120, px = Math.cos(a) * d * 1.4 - 0, py = -Math.sin(a) * d * 0.7;
      return <path key={i} d="M -14 -9 L 10 -12 L 16 4 L -4 12 L -16 4 Z" fill={i % 3 ? HM.fenog : HM.fenog2} stroke={KC.ink} strokeWidth={3} transform={`translate(${px} ${py}) rotate(${r() * 180})`} />; })}
  </g>;
}
// Botella genérica de jarabe de maple (sin marca).
function BotellaMaple({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 0 L -90 -220 Q -90 -260 -40 -270 L -30 -330 L 30 -330 L 40 -270 Q 90 -260 90 -220 L 90 0 Z" fill={HM.jarabe} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-36} y={-372} width={72} height={46} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <rect x={-70} y={-190} width={140} height={110} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-124} textAnchor="middle" style={{ font:`400 42px ${KF.titulo}` }} fill={KC.ink}>MAPLE</text>
    <rect x={-70} y={-250} width={20} height={230} rx={10} fill="#fff" opacity=".25" />
  </g>;
}
// Taza de té con vapor.
function Taza({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -160 L 110 -160 L 90 0 Q 0 20 -90 0 Z" fill="#f4f1ea" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 104 -120 Q 170 -120 160 -70 Q 150 -30 96 -40" stroke={KC.ink} strokeWidth={10} fill="none" />
    <ellipse cx={0} cy={-160} rx={110} ry={18} fill="#c99a3a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={10} rx={170} ry={22} fill="#f4f1ea" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Portapapeles médico con el diagnóstico.
function Diagnostico({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(4)`}>
    <rect x={-210} y={-290} width={420} height={520} rx={22} fill="#b5763a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-180} y={-250} width={360} height={450} rx={10} fill="#fffdf6" stroke={KC.ink} strokeWidth={5} />
    <rect x={-70} y={-306} width={140} height={46} rx={10} fill="#9aa4ad" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-190} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>DIAGNÓSTICO</text>
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-150} y1={-120 + i * 60} x2={-150 + 300 * kclamp(p * 2 - i * 0.25, 0, 1)} y2={-120 + i * 60} stroke="#9aa4ad" strokeWidth={8} strokeLinecap="round" />)}
  </g>;
}
// Señal de mano (alto).
function Alto({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points="-62,-150 62,-150 150,-62 150,62 62,150 -62,150 -150,62 -150,-62" fill={KC.red} stroke={KC.ink} strokeWidth={10} />
    <text y={36} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill="#fff">¡OJO!</text>
  </g>;
}
// Cuenta de aminoácido.
function Amino({ x, y, r = 22, color = KC.mint }) { return <circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={4} />; }

// Bosque esquemático del fondo (troncos y hojarasca).
function Bosque({ T }) {
  return <g>
    {[[-60, 0.9], [800, 1], [1010, 0.8]].map(([bx, k], i) => <g key={i} transform={`translate(${bx} 1180) scale(${k})`}>
      <rect x={-30} y={-700} width={60} height={700} fill="#6a4a2a" stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={-700} r={150} fill="#2f9a52" stroke={KC.ink} strokeWidth={6} />
    </g>)}
    <rect x={0} y={1150} width={1080} height={300} fill="#5b3a22" />
    {Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx={(i * 67) % 1080} cy={1160 + (i % 3) * 12} rx={36} ry={10} fill={i % 2 ? '#c9772b' : '#a85c22'} stroke={KC.ink} strokeWidth={3} transform={`rotate(${(i * 37) % 40 - 20} ${(i * 67) % 1080} ${1160 + (i % 3) * 12})`} />)}
  </g>;
}

// Año que corre (sin separador de miles).
function AnioCuenta({ T, at, until, desde, hasta, dur = 1.5, etiqueta, x, y, tam = 200 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = Math.round(klerp(desde, hasta, kprog(T, at, at + dur, kEase.sale)));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`900 44px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:6 }}>{etiqueta}</div>}
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}` }}>{v}</div>
  </div>;
}

function MapleShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Fr: CUES.Fresco, S: CUES.Seco, P: CUES.Pregunta, Es: CUES.Estudiante, A: CUES.Anios, Ga: CUES.Gas,
    Hi: CUES.Hipotesis, Ge: CUES.Gemela, So: CUES.Sotolon, Pr: CUES.Primo, O: CUES.Orina, Cu: CUES.Cuidado, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const chorroG = kprog(T, K.G, K.G + 0.9, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: hot cakes con jarabe… y el frasco de hongos secos */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HotCakes T={T} x={400} y={1130} s={1.05} chorro={kprog(T, K.G + 0.2, K.G + 1.4)} />
          <Chorro T={T} x={380} y0={460} y1={890} p={chorroG * (1 - kprog(T, K.G + 1.6, K.G + 2.0))} />
          <Ondas T={T} x={400} y={820} n={3} o={kprog(T, K.G + 0.3, K.G + 0.9)} color="#fff" />
          {(() => { const e = kprog(T, K.G + 1.8, K.G + 2.4, kEase.rebote); return e > 0 ? <FrascoSecos T={T} x={klerp(1300, 860, e)} y={1140} s={0.8} rot={Math.sin(T * 4) * 2} /> : null; })()}
        </>)}
      </Escena>
      {/* 2–4 · el candy cap en el bosque, fresco y luego seco */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Bosque T={T} />
          {(() => { const sec = kprog(T, K.S, K.S + 1.4, kEase.suave), sale = kprog(T, K.S + 1.2, K.S + 1.8, kEase.suave);
            return <>
              <CandyCap T={T} x={klerp(540, 330, sale)} y={klerp(1160, 1100, sale)} s={klerp(1.9, 1.3, sale)} crece={kprog(T, K.H - 0.2, K.H + 0.9)} seco={sec} rot={Math.sin(T * 1.3) * 1.5} corte={kprog(T, K.Fr + 0.2, K.Fr + 0.7) * (1 - sec)} />
              {sale > 0 && <g opacity={sale}><Galleta x={720} y={1030} s={0.9} /><Helado x={860} y={930} s={0.8} /></g>}
              <Ondas T={T} x={klerp(540, 330, sale)} y={klerp(780, 880, sale)} n={3} o={kprog(T, K.S + 0.6, K.S + 1.4)} color={HM.jarabe} sep={60} />
            </>; })()}
        </>)}
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><CandyCap T={T} x={300} y={1150} s={1.5} seco={1} rot={Math.sin(T * 4) * 3} /><Interrogacion T={T} x={300} y={760} tam={300} /></>)}
      </Escena>
      {/* 6–7 · la pregunta de 1985 y los 27 años */}
      <Escena T={T} a={K.Es} b={K.Ga}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Persona x={250} y={1180} s={1.0} color={KC.blue} mano={kprog(T, K.Es + 0.6, K.Es + 1.0, kEase.rebote)} />
          <Persona x={760} y={1180} s={1.1} color="#5a5248" lentes />
          <g opacity={kprog(T, K.Es + 0.4, K.Es + 0.8)}><FrascoSecos T={T} x={510} y={1180} s={0.5} /></g>
        </>)}
      </Escena>
      {/* 8–10 · por dentro: el gas, la molécula y su gemela (fondo oscuro) */}
      <Escena T={T} a={K.Ga} b={K.So} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} />
        {fsvg(<>
          {(() => { const fuera = kprog(T, K.Ga + 3.0, K.Ga + 3.6, kEase.suave);
            return <g opacity={1 - fuera}>
              <FrascoSecos T={T} x={300} y={1160} s={0.9} />
              <Fibra x={300} y={950} s={1} baja={kprog(T, K.Ga + 0.2, K.Ga + 0.9, kEase.sale)} />
              {Array.from({ length: 14 }, (_, i) => { const u = ((T - K.Ga) * 0.7 + i / 14) % 1, xx = 300 + Math.sin(i * 2.3 + T) * 110 * (1 - u), yy = 1100 - u * 220;
                return T > K.Ga + 0.6 ? <circle key={i} cx={xx} cy={yy} r={9} fill={KC.gold2} opacity={Math.sin(u * Math.PI)} /> : null; })}
              <Cromatograma T={T} x={540} y={1180} w={460} h={200} p={kprog(T, K.Ga + 1.2, K.Ga + 2.6)} />
            </g>; })()}
          {(() => { const sol = kprog(T, K.Ge, K.Ge + 0.8, kEase.suave);
            return <>
              <Furanona T={T} x={klerp(540, 300, sol)} y={kprog(T, K.Ga + 3.2, K.Ga + 3.2) ? 900 : 900} s={klerp(1.5, 1.05, sol)} grupo="NH₂" p={kprog(T, K.Ga + 3.2, K.Ga + 4.4)} brillo={kprog(T, K.Ge + 1.4, K.Ge + 1.8)} />
              {T < K.Ge + 0.2 && Array.from({ length: 6 }, (_, i) => { const j = kprog(T, K.Hi + 0.3 + i * 0.12, K.Hi + 1.8, kEase.suave), a = i * Math.PI / 3 + T * 0.4;
                return T > K.Hi ? <Amino key={i} x={klerp(540 + Math.cos(a) * 340, 540, j)} y={klerp(900 + Math.sin(a) * 300, 900, j)} r={26 * (1 - j * 0.6)} color={[KC.mint, KC.pink, KC.cyan][i % 3]} /> : null; })}
              {sol > 0 && <Furanona T={T} x={790} y={900} s={1.05} grupo="OH" p={kprog(T, K.Ge + 0.5, K.Ge + 1.3)} colorGrupo={KC.mint} brillo={kprog(T, K.Ge + 1.4, K.Ge + 1.8)} />}
            </>; })()}
        </>)}
      </Escena>
      {/* 11 · el sotolón: fenogreco y jarabe de maple */}
      <Escena T={T} a={K.So} b={K.Pr}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Fenogreco x={290} y={1130} s={1.4} />
          <BotellaMaple x={800} y={1150} s={1.0} />
          {(() => { const u = kprog(T, K.So + 2.4, K.So + 3.6, kEase.suave); return <Furanona T={T} x={klerp(290, 800, u)} y={660 - Math.sin(u * Math.PI) * 80} s={0.7} grupo="OH" colorGrupo={KC.mint} color={KC.ink} p={kprog(T, K.So + 0.6, K.So + 1.4)} />; })()}
        </>)}
      </Escena>
      {/* 12 · el primo europeo, más grande y tóxico */}
      <Escena T={T} a={K.Pr} b={K.O}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <line x1={80} y1={1160} x2={1000} y2={1160} stroke={KC.ink} strokeWidth={8} />
          <CandyCap T={T} x={260} y={1160} s={0.9} crece={kprog(T, K.Pr, K.Pr + 0.6)} />
          <g transform="translate(660 1160)"><g transform="scale(1.9)">
            {(() => { const c = kprog(T, K.Pr + 0.8, K.Pr + 1.6); return c > 0 ? <g opacity={1}><CandyCap T={T} x={0} y={0} s={1} crece={c} /></g> : null; })()}
          </g></g>
          {(() => { const w = kprog(T, K.Pr + 3.2, K.Pr + 3.7, kEase.rebote); return w > 0 ? <g transform={`translate(880 560) scale(${w * 0.55})`}><Alto x={0} y={0} /></g> : null; })()}
        </>)}
      </Escena>
      {/* 13 · el té de hierbas y el falso diagnóstico */}
      <Escena T={T} a={K.O} b={K.Cu}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Taza T={T} x={250} y={1130} s={1.1} />
          <Ondas T={T} x={250} y={900} n={3} o={0.8} color="#fff" sep={55} />
          <g opacity={kprog(T, K.O + 2.2, K.O + 2.7)}><Diagnostico x={720} y={900} s={0.95} p={kprog(T, K.O + 2.4, K.O + 3.6)} /></g>
          <Sello T={T} at={K.O + 4.6} x={720} y={960} texto="FALSO" color={KC.red} r={120} rot={-14} />
        </>)}
      </Escena>
      {/* 14 · cuidado */}
      <Escena T={T} a={K.Cu} b={K.C}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Bosque T={T} />
          {[[160, 0.8, -6], [420, 1.0, 4], [640, 0.7, -3], [900, 0.9, 6]].map(([bx, k, r], i) => <Seta key={i} x={bx} y={1160} s={k} rot={r} crece={kprog(T, K.Cu + i * 0.12, K.Cu + 0.6 + i * 0.12)} sombrero={['#c9772b', '#b5562a', '#d4a056', '#8a4a26'][i]} escamas={false} anillo={false} />)}
          {(() => { const w = kprog(T, K.Cu + 0.6, K.Cu + 1.1, kEase.rebote); return w > 0 ? <g transform={`translate(540 760) scale(${w * 0.9})`}><Alto x={0} y={0} /></g> : null; })()}
        </>)}
      </Escena>
      {/* 15 · cierre: los mismos hot cakes, ya explicados */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <HotCakes T={T} x={400} y={1130} s={1.05} chorro={1} />
          <Ondas T={T} x={400} y={820} n={3} o={1} color="#fff" />
          <FrascoSecos T={T} x={860} y={1140} s={0.8} tapa={kprog(T, K.C + 0.4, K.C + 1.0, kEase.sale)} />
          <Furanona T={T} x={400} y={600 - Math.sin(T) * 14} s={0.62} grupo="NH₂" color={KC.ink} colorGrupo={KC.orange} p={kprog(T, K.C + 1.0, K.C + 2.0)} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.0} until={K.H - 0.3} texto="no es miel: es un hongo seco" x={420} y={820} tam={38} borde={HM.jarabe2} />
      <Etq T={T} at={K.H + 0.5} until={K.Fr - 0.2} x={60} y={470} texto="candy cap" tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.Fr - 0.2} x={60} y={530} texto="Lactarius rubidus" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.Fr - 0.2} x={60} y={590} texto="sombrero de 2 a 8 cm" tam={28} color={KC.ink} />
      <Medidor T={T} at={K.Fr + 0.1} until={K.P - 0.3} valor={(t) => 0.06 + 0.9 * kprog(t, K.S + 0.2, K.S + 1.4, kEase.suave)} etiqueta="olor a maple" texto={(v) => (v < 0.2 ? 'casi nada' : v < 0.8 ? 'subiendo…' : '¡fuertísimo!')} x={60} y={470} ancho={560} color={HM.jarabe2} />
      <Etq T={T} at={K.Fr + 0.6} until={K.S - 0.1} x={60} y={640} texto="látex aguado" tam={28} color={KC.ink} />
      <Chip T={T} at={K.S + 0.2} until={K.P - 0.3} texto="seco" x={200} y={640} tam={40} borde={HM.seco} />
      <Etq T={T} at={K.S + 1.8} until={K.P - 0.3} x={60} y={760} texto="galletas y helado" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.9} until={K.A - 0.2} anio="1985" quien="Humboldt State University" revista="California · un estudiante pregunta" x={540} y={600} />
      <AnioCuenta T={T} at={K.A + 0.1} until={K.Ga - 0.3} desde={1985} hasta={2012} dur={1.6} etiqueta="de 1985 a…" x={400} y={560} tam={200} />
      <Chip T={T} at={K.A + 1.6} until={K.Ga - 0.3} texto="27 años" x={400} y={740} tam={56} borde={KC.yellow} />
      <Chip T={T} at={K.Ga + 0.1} until={K.Hi - 0.3} texto="POR DENTRO · EL GAS DEL HONGO SECO" x={540} y={400} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ga + 0.8} until={K.Ga + 3.0} x={60} y={475} texto="microextracción en fase sólida" tam={26} color={KC.gold2} />
      <TarjetaEstudio T={T} at={K.Ga + 1.0} until={K.Ga + 3.0} anio="2012" quien="Wood y su equipo" revista="Biochem. Syst. Ecol., 2012" x={640} y={730} />
      <Etq T={T} at={K.Ga + 3.6} until={K.Ge - 0.2} x={60} y={620} texto="quabalactona III" tam={40} color={KC.yellow} />
      <Etq T={T} at={K.Ga + 4.0} until={K.Ge - 0.2} x={60} y={675} texto="la que, creen, da el olor" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Hi + 0.4} until={K.Ge - 0.3} texto="hipótesis: nace de aminoácidos al secarse" x={540} y={480} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.Ge + 0.4} until={K.So - 0.2} x={60} y={1175} texto="quabalactona III" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.Ge + 0.9} until={K.So - 0.2} x={600} y={1175} texto="sotolón" tam={30} color={KC.mint} />
      <Chip T={T} at={K.Ge + 1.6} until={K.So - 0.3} texto="NH₂ ↔ OH: solo eso cambia" x={420} y={520} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.So + 0.8} until={K.Pr - 0.2} x={60} y={520} texto="sotolón" tam={44} color={KC.ink} />
      <Etq T={T} at={K.So + 1.4} until={K.Pr - 0.2} x={60} y={940} texto="fenogreco (alholva)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.So + 2.2} until={K.Pr - 0.2} x={600} y={760} texto="jarabe de maple" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pr + 0.4} until={K.O - 0.2} x={60} y={1210} texto="candy cap · 2–8 cm" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Pr + 1.2} until={K.O - 0.2} x={60} y={480} texto="Lactarius helvus" it tam={42} color={KC.ink} />
      <Etq T={T} at={K.Pr + 1.6} until={K.O - 0.2} x={60} y={540} texto="Europa · sombrero de 4 a 15 cm" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Pr + 3.3} until={K.O - 0.3} texto="puede intoxicarte" x={330} y={640} tam={40} borde={KC.red} />
      <Etq T={T} at={K.O + 0.4} until={K.Cu - 0.2} x={60} y={860} texto="té de hierbas" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.O + 0.6} until={K.O + 2.2} anio="1999" quien="un falso diagnóstico" revista="N Engl J Med, 1999" x={540} y={560} />
      <Etq T={T} at={K.O + 3.0} until={K.Cu - 0.2} x={60} y={470} texto="«enfermedad de la orina con" tam={28} color={KC.ink} />
      <Etq T={T} at={K.O + 3.0} until={K.Cu - 0.2} x={60} y={515} texto="olor a jarabe de maple»" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cu + 1.0} until={K.C - 0.3} texto="hay parecidos tóxicos" x={540} y={1000} tam={40} borde={KC.red} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="olor a maple… de un hongo" x={360} y={430} tam={34} borde={HM.jarabe2} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={1500} texto="No comas hongos silvestres sin un experto:" tam={22} color={KC.ink} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={1535} texto="hay parecidos tóxicos. El dibujo es esquemático." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.S + 1.4} texto="2 cm" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="2 cm" largo={70} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.Ga} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ga} until={K.Ga + 3.2} texto="5 cm" largo={60} />
      <BarraEscala T={T} at={K.Ga + 3.2} until={K.So} texto="0.1 nm (esquemático)" largo={40} />
      <BarraEscala T={T} at={K.So} until={K.Pr} texto="2 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.Pr} until={K.O} texto="5 cm" largo={84} color={KC.ink} />
      <BarraEscala T={T} at={K.O} until={K.Cu} texto="5 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.Cu} until={K.C} texto="esquema" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={60} y={1600} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es miel: *es un hongo seco.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Fr - 0.1} texto="Candy cap: *Lactarius rubidus.*" />
      <Subtitulo T={T} idx={2} at={K.Fr + 0.1} until={K.S - 0.1} texto="Fresco, *casi no huele.*" />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.P - 0.1} texto="Seco: *galletas y helado.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Es - 0.1} texto="¿De dónde *sale ese olor?*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.A - 0.1} texto="1985: *un estudiante pregunta.*" />
      <Subtitulo T={T} idx={6} at={K.A + 0.1} until={K.Ga - 0.1} texto="La respuesta: *27 años después.*" />
      <Subtitulo T={T} idx={7} at={K.Ga + 0.1} until={K.Hi - 0.1} texto="2012: *quabalactona III.*" />
      <Subtitulo T={T} idx={8} at={K.Hi + 0.1} until={K.Ge - 0.1} texto="Nacería *al secarse.*" />
      <Subtitulo T={T} idx={9} at={K.Ge + 0.1} until={K.So - 0.1} texto="Casi gemela *del sotolón.*" />
      <Subtitulo T={T} idx={10} at={K.So + 0.1} until={K.Pr - 0.1} texto="Sotolón: *fenogreco y maple.*" />
      <Subtitulo T={T} idx={11} at={K.Pr + 0.1} until={K.O - 0.1} texto="*Lactarius helvus:* puede intoxicarte." />
      <Subtitulo T={T} idx={12} at={K.O + 0.1} until={K.Cu - 0.1} texto="1999: un té, *un falso diagnóstico.*" />
      <Subtitulo T={T} idx={13} at={K.Cu + 0.1} until={K.C - 0.1} texto="Nunca *sin un experto.*" />
      <Subtitulo T={T} idx={14} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ese olor, a veces, *es un hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.S + 0.3, K.P - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.P + 0.05, K.Es + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.A + 0.2, K.Ga - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ge + 0.2, K.So - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Pr + 0.4, K.O - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.O + 0.5, K.Cu - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Cu + 0.2, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="129" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MapleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MapleShot /></CompositionStage></div>;
}
window.MapleApp = MapleApp;
