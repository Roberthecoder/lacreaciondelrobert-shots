// Shot Científico #19 · La piel de gallina: músculos diminutos que jalan tus pelos — NARRADO (N1 "Por dentro").
// Datos: Shwartz et al. 2020 (Cell, Harvard, en ratones) y fisiología del músculo erector del pelo. Ver guion.md y verificacion.md.
// El corte de piel es ESQUEMÁTICO (folículo, vello, músculo erector en diagonal, nervio, células madre).
const GMUS = '#e2474f', GNERV = KC.yellow, GMADRE = KC.lilac, GDERMIS = '#f8d9c8', GPELO2 = '#3a2a20';

// ---------- Brazo (antebrazo horizontal con mano a la derecha). erizo 0..1: bolitas + vellos parados ----------
function Brazo({ x, y, s = 1, erizo = 0, T = 0, seed = 3, halo = 0 }) {
  const g = krng(seed);
  const pts = Array.from({ length: 46 }, (_, i) => { const c = i % 23, f = Math.floor(i / 23);
    return [-400 + c * 34 + g() * 18, -60 + f * 70 + g() * 40, g()]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {halo > 0 && <rect x={-470} y={-160} width={940} height={320} rx={160} fill="none" stroke={KC.white} strokeWidth={10} strokeDasharray="6 22" strokeLinecap="round" opacity={halo} />}
    <rect x={-560} y={-120} width={1000} height={240} rx={110} fill={CPIEL} stroke={KC.ink} strokeWidth={10} />
    <rect x={-540} y={40} width={960} height={60} rx={30} fill={CPIEL2} opacity=".35" />
    {/* mano */}
    <path d="M 400 -110 C 470 -130 560 -110 600 -60 L 660 -70 C 690 -72 700 -40 670 -30 L 610 -10 C 640 10 640 60 600 80 C 540 120 450 120 400 100 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {pts.map(([px, py, r], i) => { const e = kclamp(erizo * 1.6 - r * 0.6, 0, 1), ang = klerp(72, 8, e) * (i % 2 ? 1 : 0.9);
      return <g key={i} transform={`translate(${px} ${py})`}>
        {e > 0.02 && <circle r={4 + 9 * e} fill={CPIEL2} stroke={KC.ink} strokeWidth={3} opacity={0.4 + 0.6 * e} />}
        <line x1={0} y1={0} x2={Math.sin(ang * Math.PI / 180) * 34} y2={-Math.cos(ang * Math.PI / 180) * 34} stroke={GPELO2} strokeWidth={4} strokeLinecap="round" />
      </g>; })}
  </g>;
}

// ---------- Corte de piel esquemático ----------
// contra 0..1 (músculo contraído), senal 0..1 (chispas por el nervio), madre 0..1 (células madre encendidas), nuevo 0..1 (pelo nuevo),
// rama 0..1 (rama del nervio a las células madre).
const CE = [60, -300];                         // salida del pelo (local)
function corteGeo(contra) {
  const a = klerp(32, 10, contra) * Math.PI / 180;
  const P = (d) => [CE[0] + d * Math.sin(a), CE[1] + d * Math.cos(a)];
  const A = [-250, -235], S = P(220);
  return { a, P, A, S, M: [(S[0] + A[0]) / 2, (S[1] + A[1]) / 2] };
}
const bez = (p0, p1, p2, p3, t) => { const u = 1 - t; return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]); };
function Corte({ x, y, s = 1, T = 0, contra = 0, senal = 0, madre = 0, nuevo = 0, rama = 0, clip = true }) {
  const G = corteGeo(contra), ad = G.a * 180 / Math.PI, hairAng = klerp(64, 6, contra);
  const bump = (px) => 62 * contra * Math.exp(-Math.pow((px - 10) / 125, 2));
  const xs = Array.from({ length: 45 }, (_, i) => -460 + i * (920 / 44));
  const sup = xs.map((px) => `${px.toFixed(1)},${(-300 - bump(px)).toFixed(1)}`).join(' L ');
  const inf = xs.slice().reverse().map((px) => `${px.toFixed(1)},${(-245 - bump(px) * 0.8).toFixed(1)}`).join(' L ');
  const N0 = [-460, 330], N1 = [-260, 300], N2 = [-160, 60], N3 = G.M;
  const R0 = G.M, R3 = [G.S[0] + 18, G.S[1] + 30];
  const adentro = 560 * kclamp(nuevo * 2, 0, 1), afuera = 240 * kclamp(nuevo * 2 - 1, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {clip && <defs><clipPath id="corteClip"><rect x={-460} y={-640} width={920} height={1090} rx={46} /></clipPath></defs>}
    <g clipPath={clip ? 'url(#corteClip)' : undefined}>
      <rect x={-460} y={-300} width={920} height={760} fill={GDERMIS} />
      {/* fibras de la dermis */}
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -460 ${-150 + i * 62} q 230 ${i % 2 ? 26 : -26} 460 0 t 460 0`} fill="none" stroke="#efc1ab" strokeWidth={5} />)}
      {/* folículo */}
      <g transform={`translate(${CE[0]} ${CE[1]}) rotate(${-ad})`}>
        <path d="M -38 0 L -40 500 C -80 520 -78 600 0 604 C 78 600 80 520 40 500 L 38 0 Z" fill="#f3b9a6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
        <ellipse cx={0} cy={566} rx={26} ry={24} fill="#d9607a" stroke={KC.ink} strokeWidth={5} />
        <line x1={0} y1={0} x2={0} y2={540} stroke={CPELO} strokeWidth={18} strokeLinecap="round" />
        {/* pelo nuevo: sale del bulbo */}
        {nuevo > 0.01 && <line x1={10} y1={560} x2={10} y2={560 - adentro} stroke={KC.gold2} strokeWidth={14} strokeLinecap="round" />}
        {/* células madre (en el abultamiento donde se pega el músculo) */}
        {Array.from({ length: 6 }, (_, i) => { const yy = 180 + i * 18, xx = i % 2 ? 50 : 62, gl = madre * (0.6 + 0.4 * Math.sin(T * 8 + i));
          return <g key={i}>{madre > 0.02 && <circle cx={xx} cy={yy} r={16 + 12 * gl} fill={GMADRE} opacity={0.35 * gl} />}
            <circle cx={xx} cy={yy} r={11} fill={madre > 0.02 ? klerpColor('#c9b7e8', '#9d6bff', madre) : '#c9b7e8'} stroke={KC.ink} strokeWidth={4} /></g>; })}
      </g>
      {/* músculo erector del pelo (diagonal) */}
      {(() => { const [sx, sy] = G.S, [ax, ay] = G.A, L = Math.hypot(sx - ax, sy - ay), ang = Math.atan2(sy - ay, sx - ax) * 180 / Math.PI, w = 34 + 22 * contra;
        return <g transform={`translate(${ax} ${ay}) rotate(${ang})`}>
          <path d={`M 0 0 C ${L * 0.3} ${-w} ${L * 0.7} ${-w} ${L} 0 C ${L * 0.7} ${w} ${L * 0.3} ${w} 0 0 Z`} fill={GMUS} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
          {[0.25, 0.4, 0.55, 0.7].map((f) => <line key={f} x1={L * f} y1={-w * 0.55} x2={L * f + 12} y2={w * 0.55} stroke="#9c1f2a" strokeWidth={4} opacity=".7" />)}
        </g>; })()}
      {/* nervio */}
      <path d={`M ${N0[0]} ${N0[1]} C ${N1[0]} ${N1[1]} ${N2[0]} ${N2[1]} ${N3[0]} ${N3[1]}`} fill="none" stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
      <path d={`M ${N0[0]} ${N0[1]} C ${N1[0]} ${N1[1]} ${N2[0]} ${N2[1]} ${N3[0]} ${N3[1]}`} fill="none" stroke={GNERV} strokeWidth={10} strokeLinecap="round" />
      {rama > 0.01 && (() => { const pts = Array.from({ length: 21 }, (_, i) => bez(R0, [R0[0] + 40, R0[1] + 120], [R3[0] - 120, R3[1] + 90], R3, i / 20 * rama));
        const d = 'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ');
        return <><path d={d} fill="none" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" /><path d={d} fill="none" stroke={GNERV} strokeWidth={7} strokeLinecap="round" /></>; })()}
      {senal > 0.01 && Array.from({ length: 4 }, (_, i) => { const f = ((T * 1.1 + i / 4) % 1); const [px, py] = bez(N0, N1, N2, N3, f);
        return <g key={i} opacity={senal}><circle cx={px} cy={py} r={20} fill={KC.white} opacity=".55" /><circle cx={px} cy={py} r={11} fill={KC.white} stroke={GNERV} strokeWidth={5} /></g>; })}
      {senal > 0.01 && rama > 0.9 && Array.from({ length: 2 }, (_, i) => { const f = ((T * 1.1 + i / 2) % 1); const [px, py] = bez(R0, [R0[0] + 40, R0[1] + 120], [R3[0] - 120, R3[1] + 90], R3, f);
        return <circle key={i} cx={px} cy={py} r={10} fill={KC.white} stroke={GNERV} strokeWidth={5} opacity={senal} />; })}
      {/* epidermis (con la bolita) */}
      <path d={`M ${sup} L ${inf} Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {/* vello afuera */}
      <g transform={`translate(${CE[0]} ${CE[1] - bump(CE[0]) * 0.6}) rotate(${-hairAng})`}>
        <path d="M 0 30 C 4 -100 -6 -200 6 -300" fill="none" stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
        <path d="M 0 30 C 4 -100 -6 -200 6 -300" fill="none" stroke={GPELO2} strokeWidth={16} strokeLinecap="round" />
      </g>
      {nuevo > 0.01 && <g transform={`translate(${CE[0] + 14} ${CE[1] - bump(CE[0]) * 0.6}) rotate(${-hairAng + 12})`}>
        <line x1={0} y1={20} x2={0} y2={20 - afuera} stroke={KC.gold2} strokeWidth={14} strokeLinecap="round" />
      </g>}
    </g>
    {clip && <rect x={-460} y={-640} width={920} height={1090} rx={46} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth={4} />}
  </g>;
}
// color intermedio (#rrggbb)
function klerpColor(c1, c2, p) {
  const h = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)); const a = h(c1), b = h(c2);
  return '#' + a.map((v, i) => Math.round(klerp(v, b[i], kclamp(p, 0, 1))).toString(16).padStart(2, '0')).join('');
}
// world coords de un punto local del corte
const CX = 540, CY = 860, CS = 0.95;
const cw = (p) => [CX + p[0] * CS, CY + p[1] * CS];

function Copo({ x, y, r = 26, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>{[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}>
    <line x1={-r} y1={0} x2={r} y2={0} stroke="#fff" strokeWidth={6} strokeLinecap="round" />
    <path d={`M ${r * 0.55} ${-r * 0.3} L ${r * 0.75} 0 L ${r * 0.55} ${r * 0.3} M ${-r * 0.55} ${-r * 0.3} L ${-r * 0.75} 0 L ${-r * 0.55} ${r * 0.3}`} fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" /></g>)}</g>;
}
function Nieve({ T, n = 14, y0 = 200, y1 = 560, seed = 4, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = 60 + g() * 960, v = 40 + g() * 50, ph = g();
    const yy = y0 + ((T * v / (y1 - y0) + ph) % 1) * (y1 - y0);
    return <Copo key={i} x={x + Math.sin(T * 1.5 + i) * 18} y={yy} r={14 + g() * 14} rot={T * 40 + i * 20} />; })}</g>;
}
// Carita emocionada (ojos de estrella)
function CaraEmocion({ x, y, s = 1, T = 0 }) {
  const est = (cx) => <path transform={`translate(${cx} -10) rotate(${T * 60})`} d="M 0 -16 L 5 -5 L 16 -5 L 7 3 L 10 15 L 0 8 L -10 15 L -7 3 L -16 -5 L -5 -5 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    {est(-26)}{est(26)}
    <path d="M -32 22 Q 0 60 32 22 Z" fill="#5a1f22" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

// ---------- Gato de perfil. eriza 0..1 (pelo parado, lomo arqueado) ----------
function Gato({ x, y, s = 1, eriza = 0, T = 0, color = '#f0a24a', aire = 0, mira = 1 }) {
  const arco = eriza * 70, L = 1 + eriza * 0.35;
  const n = 40, base = (th) => { const rx = 190, ry = 95 + arco * Math.max(0, -Math.sin(th)) * 0.9; return [Math.cos(th) * rx, Math.sin(th) * ry]; };
  const piel = Array.from({ length: n * 2 }, (_, i) => { const th = i / (n * 2) * Math.PI * 2, [bx, by] = base(th), k = i % 2 ? 1 : 0, pelo = 10 + 46 * eriza + 4 * Math.sin(T * 6 + i);
    const nx = Math.cos(th), ny = Math.sin(th) * 1.4, nn = Math.hypot(nx, ny); return [bx + k * pelo * nx / nn, by + k * pelo * ny / nn]; });
  const d = 'M ' + piel.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s * mira} ${s})`}>
    {aire > 0.01 && <ellipse cx={0} cy={-20 - arco * 0.3} rx={270 + 60 * eriza} ry={180 + 60 * eriza} fill="#bfefff" opacity={0.55 * aire} stroke={KC.cyan} strokeWidth={6} strokeDasharray="16 12" strokeDashoffset={-T * 30} />}
    {/* cola */}
    <path d={`M -170 -20 C -260 -60 -250 ${-180 - eriza * 40} -200 ${-230 - eriza * 30}`} fill="none" stroke={KC.ink} strokeWidth={38 + 30 * eriza} strokeLinecap="round" />
    <path d={`M -170 -20 C -260 -60 -250 ${-180 - eriza * 40} -200 ${-230 - eriza * 30}`} fill="none" stroke={color} strokeWidth={26 + 30 * eriza} strokeLinecap="round" strokeDasharray={eriza > 0.3 ? '6 5' : 'none'} />
    {/* patas */}
    {[-120, -60, 70, 130].map((px, i) => <rect key={i} x={px - 20} y={40} width={40} height={130 + eriza * 40} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />)}
    <g transform={`translate(0 ${-eriza * 30}) scale(${L} ${1 + eriza * 0.2})`}>
      <path d={d} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {[-90, -20, 50].map((px) => <path key={px} d={`M ${px} -80 q 18 30 0 60`} fill="none" stroke="#c8722a" strokeWidth={12} strokeLinecap="round" />)}
    </g>
    {/* cabeza */}
    <g transform={`translate(${210 + eriza * 30} ${-90 - eriza * 30})`}>
      <path d="M -70 -50 L -60 -140 L -10 -80 Z M 70 -50 L 60 -140 L 10 -80 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <circle r={90} fill={color} stroke={KC.ink} strokeWidth={8} />
      <ellipse cx={-30} cy={-10} rx={14} ry={eriza > 0.5 ? 20 : 16} fill="#fff" stroke={KC.ink} strokeWidth={5} /><ellipse cx={40} cy={-10} rx={14} ry={eriza > 0.5 ? 20 : 16} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-26} cy={-8} r={7} fill={KC.ink} /><circle cx={44} cy={-8} r={7} fill={KC.ink} />
      <path d="M 0 22 L 10 30 L 20 22 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
      {eriza > 0.5 ? <path d="M -10 50 Q 10 30 30 50 L 25 60 L 10 52 L -5 60 Z" fill="#5a1f22" stroke={KC.ink} strokeWidth={5} />
        : <path d="M -5 42 Q 10 54 25 42" fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />}
      {[-1, 1].map((k) => <g key={k}><line x1={50} y1={30 + k * 8} x2={130} y2={20 + k * 22} stroke={KC.ink} strokeWidth={4} /><line x1={-20} y1={30 + k * 8} x2={-100} y2={20 + k * 22} stroke={KC.ink} strokeWidth={4} /></g>)}
    </g>
  </g>;
}
// Perro sencillo de perfil mirando a la derecha.
function Perro({ x, y, s = 1, T = 0, color = '#9a7b5c' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -170 -40 Q -230 ${-100 + Math.sin(T * 10) * 20} -250 ${-150 + Math.sin(T * 10) * 25}`} fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <path d={`M -170 -40 Q -230 ${-100 + Math.sin(T * 10) * 20} -250 ${-150 + Math.sin(T * 10) * 25}`} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" />
    {[-130, -70, 70, 130].map((px, i) => <rect key={i} x={px - 22} y={20} width={44} height={170} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />)}
    <rect x={-190} y={-110} width={380} height={170} rx={80} fill={color} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(200 -150)">
      <rect x={-20} y={0} width={190} height={90} rx={40} fill={color} stroke={KC.ink} strokeWidth={8} />
      <circle r={90} fill={color} stroke={KC.ink} strokeWidth={8} />
      <path d="M -60 -50 C -120 -30 -110 60 -70 70 C -50 40 -40 -10 -40 -50 Z" fill="#6b5038" stroke={KC.ink} strokeWidth={7} />
      <circle cx={30} cy={-20} r={12} fill={KC.ink} />
      <ellipse cx={170} cy={20} rx={18} ry={14} fill={KC.ink} />
      <path d="M 70 80 L 150 80" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    </g>
  </g>;
}
// Ratón sencillo (para «en ratones»).
function Raton({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -90 10 C -160 20 -170 ${-30 + Math.sin(T * 4) * 10} -220 -10`} fill="none" stroke="#e79aa8" strokeWidth={9} strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={100} ry={62} fill="#d8d3cc" stroke={KC.ink} strokeWidth={8} />
    <circle cx={60} cy={-58} r={34} fill="#d8d3cc" stroke={KC.ink} strokeWidth={7} /><circle cx={60} cy={-58} r={18} fill="#f3a9b8" />
    <path d="M 70 -30 C 130 -30 150 0 150 10 C 120 30 90 30 70 20 Z" fill="#d8d3cc" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={150} cy={10} r={9} fill={KC.pink} stroke={KC.ink} strokeWidth={3} /><circle cx={105} cy={-8} r={7} fill={KC.ink} />
  </g>;
}
// Termómetro frío sin números.
function TermoFrio({ x, y, s = 1, nivel = 0.2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-220} width={60} height={240} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-14} y={20 - 200 * nivel} width={28} height={200 * nivel + 10} rx={14} fill={KC.cyan} />
    <circle cx={0} cy={50} r={50} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    <Copo x={70} y={-180} r={30} />
  </g>;
}
// Calendario cuyas hojas pasan (sin números: «mucho tiempo»).
function Calendario({ x, y, s = 1, T = 0, at = 0 }) {
  const k = Math.max(0, T - at) * 3, f = k % 1, hoja = Math.floor(k);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-100} width={220} height={210} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={-100} width={220} height={56} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={-80 + (i % 3) * 60} y={-24 + Math.floor(i / 3) * 42} width={40} height={28} rx={6} fill={(i + hoja) % 4 === 0 ? KC.cyan : '#e5e1d8'} />)}
    {T > at && <g transform={`translate(0 -100) scale(1 ${1 - f})`} opacity={1 - f}><rect x={-110} y={0} width={220} height={210} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={6} /></g>}
    {[-60, 60].map((px) => <rect key={px} x={px - 8} y={-120} width={16} height={44} rx={8} fill="#666" stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Ancestro peludo → persona: pelaje que se desvanece (pelo 1..0).
function Ancestro({ x, yPies, alto = 760, pelo = 1, T = 0 }) {
  const g = krng(11), h = alto;
  const mechones = Array.from({ length: 70 }, () => [(g() - 0.5) * 300, -g() * (h - 40), g()]);
  return <g>
    <PersonaSimple x={x} yPies={yPies} alto={h} color={klerpColor('#7a5230', '#2fe0a8', 1 - pelo)} piel={klerpColor('#a8774f', CPIEL, 1 - pelo)} cara={pelo < 0.5 ? 'sonrie' : 'normal'} />
    {pelo > 0.01 && <g opacity={pelo}>{mechones.map(([mx, my, r], i) => <path key={i} d={`M ${x + mx} ${yPies + my} l ${8 + r * 10} ${-18 - r * 14}`} stroke="#4a2f1a" strokeWidth={7} strokeLinecap="round" transform={`rotate(${Math.sin(T * 3 + i) * 6} ${x + mx} ${yPies + my})`} />)}</g>}
  </g>;
}
// Bufanda imaginaria (contorno punteado que envuelve el brazo).
function Bufanda({ x, y, p = 1, T = 0 }) {
  if (p <= 0.01) return null;
  return <g transform={`translate(${x} ${y})`} opacity={p}>
    {[-200, -40, 120].map((px, i) => <g key={i} transform={`translate(${px} 0) rotate(-14) scale(1 ${kprog(p, i * 0.2, i * 0.2 + 0.5, kEase.sale)})`}>
      <rect x={-60} y={-150} width={120} height={300} rx={34} fill={i % 2 ? 'rgba(255,225,26,.55)' : 'rgba(0,210,255,.55)'} stroke={KC.white} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={-T * 30} />
    </g>)}
  </g>;
}

function Gallina() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // bolitas del brazo del gancho: time-lapse antes del segundo 1
  const erizoG = kprog(T, 0.15, 1.3, kEase.sale);
  const contraT = kprog(T, K.Frio + 3.6, K.Bolita + 1.2, kEase.suave) * (1 - kprog(T, K.Bolita + 3.6, K.Animales, kEase.suave));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el brazo se pone chinito */}
      <Escena T={T} a={K.Gancho} b={K.Musculo + 1.9} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Brazo x={500} y={930} s={1} erizo={erizoG + 0.06 * Math.sin(T * 9) * erizoG} T={T} />
          <Onomato T={T} at={0.3} dur={1.6} x={300} y={640} texto="¡BRRR!" color={KC.yellow} tam={130} />
          {T > K.Gancho + 4.4 && T < K.Musculo + 1 && [[-330, -40], [-160, 20], [20, -50], [190, 10]].map(([px, py], i) => <FlechaRecta key={i} x1={500 + px} y1={740}
            x2={500 + px} y2={930 + py - 20} p={kprog(T, K.Gancho + 4.4 + i * 0.12, K.Gancho + 4.8 + i * 0.12, kEase.sale)} color={GMUS} grosor={10} punta={24} />)}
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 1.4} tacharEn={K.Gancho + 2.6} until={K.Gancho + 4.2} texto="piel encogiéndose" x={330} y={520} tam={42} />
        <Chip T={T} at={K.Gancho + 4.3} until={K.Musculo + 0.6} texto="músculos jalando pelos" x={540} y={600} tam={44} borde={GMUS} />
        <Etq T={T} at={K.Gancho + 2.2} until={K.Gancho + 4.2} x={200} y={1100} texto="muchos al mismo tiempo" color={KC.texto} />
      </Escena>
      <Lupa T={T} at={K.Musculo + 0.1} until={K.Musculo + 1.7} x={540} y={600} r={250} fx={540} fy={900} tinte={KC.yellow} etiqueta="POR DENTRO · PIEL"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={GDERMIS} /><Corte x={r - 20} y={r + 20} s={0.42} T={t} clip={false} /></svg>} />

      {/* 1–3 · por dentro: el corte de piel */}
      <Escena T={T} a={K.Musculo + 1.9} b={K.Animales} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Nieve T={T} o={kprog(T, K.Frio + 0.1, K.Frio + 0.6) * (1 - kprog(T, K.Bolita - 0.2, K.Bolita + 0.3))} y0={330} y1={520} />
          <Corte x={CX} y={CY} s={CS} T={T} contra={contraT} senal={kprog(T, K.Frio + 2.1, K.Frio + 2.5) * (1 - kprog(T, K.Bolita + 2, K.Bolita + 2.6))} />
          {T > K.Frio + 1.3 && T < K.Bolita && <g opacity={kprog(T, K.Frio + 1.3, K.Frio + 1.7)}><CaraEmocion x={170} y={430} s={0.9} T={T} /></g>}
          {/* destello en el músculo al contraerse */}
          {T > K.Frio + 3.6 && T < K.Bolita + 1.4 && (() => { const [mx, my] = cw(corteGeo(contraT).M), f = ((T - K.Frio - 3.6) * 2) % 1;
            return <circle cx={mx} cy={my} r={40 + f * 120} fill="none" stroke={GMUS} strokeWidth={8} opacity={1 - f} />; })()}
        </Lienzo>
        <Chip T={T} at={K.Musculo + 2.4} until={K.Frio - 0.1} texto="músculo erector del pelo" x={540} y={1140} tam={42} borde={GMUS} />
        <Etq T={T} at={K.Musculo + 2.0} until={K.Frio + 1.2} x={cw([-80, -380])[0]} y={cw([-80, -380])[1]} texto="vello" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Musculo + 2.3} until={K.Frio + 1.2} x={cw([215, -40])[0]} y={cw([215, -40])[1]} texto="folículo" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Frio + 1.9} until={K.Bolita - 0.1} x={cw([-420, 140])[0]} y={cw([-420, 140])[1]} texto="nervio" lado="der" color={GNERV} />
        <Chip T={T} at={K.Frio + 0.3} until={K.Bolita - 0.1} texto="frío o emoción" x={640} y={430} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Frio + 3.7} until={K.Bolita + 0.6} texto="¡se contrae!" x={540} y={1140} tam={44} borde={GMUS} />
        <Etq T={T} at={K.Bolita + 0.3} until={K.Animales - 0.2} x={560} y={380} texto="el pelo se para" lado="izq" color={KC.gold2} />
        <Etq T={T} at={K.Bolita + 1.3} until={K.Animales - 0.2} x={cw([200, -340])[0]} y={cw([200, -340])[1]} texto="bolita" lado="der" color={KC.texto} />
      </Escena>

      {/* 4 · gatos: el pelo parado atrapa aire caliente */}
      <Escena T={T} a={K.Animales} b={K.Grande} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Nieve T={T} seed={8} y0={200} y1={1200} n={18} />
          <Gato x={460} y={900} s={1.25} T={T} eriza={0.45 * kprog(T, K.Animales + 1.6, K.Animales + 2.6, kEase.sale)} aire={kprog(T, K.Animales + 3.0, K.Animales + 3.8)} />
          {T > K.Animales + 3.4 && [[-150, -60], [0, -150], [160, -80]].map(([px, py], i) => <path key={i} d={`M ${460 + px} ${880 + py} q 14 -20 0 -40 q -14 -20 0 -40`} fill="none" stroke={KC.orange} strokeWidth={8} strokeLinecap="round"
            opacity={0.5 + 0.5 * Math.sin(T * 5 + i)} transform={`translate(0 ${-((T * 30 + i * 15) % 30)})`} />)}
        </Lienzo>
        <Etq T={T} at={K.Animales + 0.8} until={K.Grande - 0.2} x={760} y={560} texto="gato" lado="izq" color={KC.ink} />
        <Chip T={T} at={K.Animales + 3.2} until={K.Grande - 0.1} texto="capa de aire caliente" x={540} y={430} tam={42} borde={KC.orange} />
      </Escena>

      {/* 5 · con miedo se ve más grande */}
      <Escena T={T} a={K.Grande} b={K.Pregunta} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Perro x={140} y={1000} s={0.62} T={T} />
          {(() => { const e = kprog(T, K.Grande + 0.5, K.Grande + 1.4, kEase.rebote);
            return <><g opacity={kprog(T, K.Grande + 1.2, K.Grande + 1.6) * 0.8}><ellipse cx={700} cy={900} rx={210} ry={150} fill="none" stroke={KC.white} strokeWidth={7} strokeDasharray="16 12" /></g>
              <Gato x={700} y={960} s={0.72 + 0.23 * e} T={T} eriza={e} mira={-1} /></>; })()}
          <Onomato T={T} at={K.Grande + 0.6} dur={1.4} x={790} y={620} texto="¡FFFF!" color={KC.yellow} tam={120} />
        </Lienzo>
        <Chip T={T} at={K.Grande + 2.1} until={K.Pregunta - 0.1} texto="se ve más grande" x={540} y={430} tam={44} borde={KC.ink} />
      </Escena>

      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Inutil} />

      {/* 7 · herencia de ancestros peludos */}
      <Escena T={T} a={K.Inutil} b={K.Harvard} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <Ancestro x={540} yPies={1180} alto={640} pelo={1 - kprog(T, K.Inutil + 1.8, K.Inutil + 3.4, kEase.suave)} T={T} />
        </Lienzo>
        <MitoTachado T={T} at={K.Inutil + 0.2} tacharEn={K.Inutil + 1.3} until={K.Inutil + 2.4} texto="¿para abrigarte?" x={540} y={400} tam={44} />
        <Chip T={T} at={K.Inutil + 2.5} until={K.Harvard - 0.1} texto="herencia" x={540} y={400} tam={52} borde={KC.ink} />
        <Etq T={T} at={K.Inutil + 0.6} until={K.Inutil + 2.6} x={700} y={620} texto="ancestro peludo" lado="der" color={KC.ink} tam={28} />
      </Escena>

      {/* 8 · Harvard 2020, en ratones */}
      <Escena T={T} a={K.Harvard} b={K.Harvard + 2.7} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo><Raton x={540} y={1080} s={1.3} T={T} /></Lienzo>
        <TarjetaEstudio T={T} at={K.Harvard + 0.2} until={K.Harvard + 2.4} anio="2020" quien="Harvard · en ratones" revista="Shwartz et al. · Cell" x={540} y={640} />
      </Escena>
      <Escena T={T} a={K.Harvard + 2.7} b={K.Cierre} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Corte x={CX} y={CY} s={CS} T={T} contra={0.35 * kprog(T, K.Harvard + 3.3, K.Harvard + 4.0)} senal={kprog(T, K.Harvard + 3.0, K.Harvard + 3.4)}
            rama={kprog(T, K.Harvard + 4.4, K.Harvard + 5.2, kEase.sale)} madre={kprog(T, K.Harvard + 5.3, K.Harvard + 6.0)} nuevo={kprog(T, K.Pelo + 1.6, K.Cierre - 0.6, kEase.suave)} />
          {T > K.Pelo + 0.2 && <g opacity={kprog(T, K.Pelo + 0.2, K.Pelo + 0.6)}>
            <TermoFrio x={830} y={420} s={0.62} nivel={0.2} />
            <Calendario x={960} y={420} s={0.45} T={T} at={K.Pelo + 0.5} /></g>}
          <g opacity={kprog(T, K.Harvard + 2.8, K.Harvard + 3.2)}><Raton x={190} y={440} s={0.55} T={T} /></g>
        </Lienzo>
        <Chip T={T} at={K.Harvard + 2.9} until={K.Cierre - 0.1} texto="en ratones" x={420} y={360} tam={40} borde={KC.gold} />
        <Etq T={T} at={K.Harvard + 3.0} until={K.Pelo + 0.1} x={cw([-420, 140])[0]} y={cw([-420, 140])[1]} texto="nervio" lado="der" color={GNERV} />
        <Etq T={T} at={K.Harvard + 3.6} until={K.Pelo + 0.1} x={cw([-380, -180])[0]} y={cw([-380, -180])[1] - 40} texto="músculo" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Harvard + 5.4} until={K.Pelo + 0.2} texto="células madre" x={540} y={1140} tam={42} borde={GMADRE} />
        <Etq T={T} at={K.Pelo + 2.0} until={K.Cierre - 0.2} x={575} y={520} texto="pelo nuevo" lado="der" color={KC.gold2} />
        <Chip T={T} at={K.Pelo + 0.4} until={K.Cierre - 0.1} texto="frío por mucho tiempo" x={540} y={1140} tam={40} borde={KC.cyan} />
      </Escena>

      {/* 10 · cierre: el mismo brazo, ahora abrigado */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Brazo x={500} y={930} s={1} erizo={kprog(T, K.Cierre + 0.2, K.Cierre + 1.2, kEase.sale)} T={T} halo={kprog(T, K.Cierre + 2.6, K.Cierre + 3.4)} />
          <Bufanda x={500} y={930} p={kprog(T, K.Cierre + 3.8, K.Cierre + 5.0)} T={T} />
        </Lienzo>
        <MitoTachado T={T} at={K.Cierre + 0.4} tacharEn={K.Cierre + 1.8} until={K.Cierre + 3.0} texto="solo un susto" x={330} y={520} tam={42} />
        <Chip T={T} at={K.Cierre + 3.1} until={K.Outro - 0.1} texto="pelaje imaginario" x={540} y={560} tam={44} borde={KC.white} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Musculo - 0.1} texto="No es tu piel: *son músculos.*" />
      <Subtitulo T={T} idx={1} at={K.Musculo + 0.1} until={K.Frio - 0.1} texto="El *músculo erector* del pelo." />
      <Subtitulo T={T} idx={2} at={K.Frio + 0.1} until={K.Bolita - 0.1} texto="Frío o emoción: *se contrae.*" />
      <Subtitulo T={T} idx={3} at={K.Bolita + 0.1} until={K.Animales - 0.1} texto="El pelo se para: *bolita.*" />
      <Subtitulo T={T} idx={4} at={K.Animales + 0.1} until={K.Grande - 0.1} texto="Atrapa *aire caliente.*" />
      <Subtitulo T={T} idx={5} at={K.Grande + 0.1} until={K.Pregunta - 0.1} texto="Con miedo: *más grandes.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Inutil - 0.1} texto="¿Y a ti *de qué te sirve?*" />
      <Subtitulo T={T} idx={7} at={K.Inutil + 0.1} until={K.Harvard - 0.1} texto="Una *herencia* de ancestros peludos." />
      <Subtitulo T={T} idx={8} at={K.Harvard + 0.1} until={K.Pelo - 0.1} texto="El nervio despierta *células madre.*" />
      <Subtitulo T={T} idx={9} at={K.Pelo + 0.1} until={K.Cierre - 0.1} texto="Frío largo: *pelo nuevo.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu cuerpo *tratando de abrigarte.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.1, 'avatar_11_sorprendido', 'gancho'],
        [K.Musculo + 2.6, K.Frio - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Bolita + 0.3, K.Animales - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Animales + 2.6, K.Grande - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Grande + 0.6, K.Pregunta - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Pregunta + 0.05, K.Inutil + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Inutil + 2.4, K.Harvard - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Harvard + 5.2, K.Pelo - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pelo + 1.8, K.Cierre - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cierre + 3.2, K.Outro - 0.1, 'avatar_06_pensativo_menton', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="19" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function GallinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Gallina /></CompositionStage></div>;
}
window.GallinaApp = GallinaApp;
