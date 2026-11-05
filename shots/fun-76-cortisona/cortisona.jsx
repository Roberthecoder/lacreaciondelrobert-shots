// Shot Fungi Mati #76 · Esa crema para las ronchas no es pura química: un moho le abrió el camino — NARRADO
// (gancho 1 "Esto no es X: es Y" · N1 Por dentro + N5 El experimento). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No es consejo médico.

const CX = { piel:'#f1b48f', piel2:'#d98f6b', roncha:'#e8434a', roncha2:'#ff8a8a', crema:'#fffaf0', tubo:'#f4f1ea', banda:'#2346ff',
  hifa:'#fff4d6', espor:'#1b1410', rizo:'#7a5233', vidrio:'rgba(220,245,255,.55)', caldo:'#f2d27a', oxi:'#ff3b2f', enz:'#b18cff' };

/* ---------- objetos macro ---------- */
// Antebrazo horizontal con una roncha de piquete. roncha 0..1 = qué tan hinchada; crema 0..1 = cuánta crema untada.
function Brazo({ T, y = 1000, roncha = 1, crema = 0, rx = 560 }) {
  const r = 70 * (0.45 + 0.55 * roncha), late = 1 + 0.03 * Math.sin(T * 6) * roncha;
  return <g>
    <path d={`M -40 ${y - 120} Q 540 ${y - 150} 1120 ${y - 105} L 1120 ${y + 125} Q 540 ${y + 150} -40 ${y + 120} Z`} fill={CX.piel} stroke={KC.ink} strokeWidth={9} />
    <path d={`M 40 ${y + 70} Q 540 ${y + 100} 1060 ${y + 80}`} stroke={CX.piel2} strokeWidth={10} fill="none" opacity=".6" strokeLinecap="round" />
    <g transform={`translate(${rx} ${y}) scale(${late})`}>
      <circle r={r * 1.7} fill={CX.roncha2} opacity={0.35 * roncha + 0.1} />
      <circle r={r} fill={mixHex(CX.piel2, CX.roncha, 0.35 + 0.65 * roncha)} stroke={KC.ink} strokeWidth={5} opacity={0.6 + 0.4 * roncha} />
      <circle r={6} fill="#8a1f22" />
      {crema > 0 && <ellipse rx={r * 1.9 * crema} ry={r * 1.1 * crema} fill={CX.crema} opacity={0.55} stroke="#e6dccb" strokeWidth={3} />}
    </g>
  </g>;
}
// Tubo genérico de crema (sin marca real). Boquilla en (x, y), apunta hacia 'rot'. aprieta 0..1. etiqueta extra = children.
function Tubo({ x, y, rot = 0, s = 1, aprieta = 0, children }) {
  const k = 1 - 0.18 * aprieta;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`scale(1 ${k})`}>
      <path d="M -470 -78 L -60 -78 L -10 -34 L -10 34 L -60 78 L -470 78 Z" fill={CX.tubo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <rect x={-500} y={-86} width={40} height={172} rx={6} fill="#d9d2c2" stroke={KC.ink} strokeWidth={7} />
      {[-60, -30, 0, 30, 60].map((d) => <line key={d} x1={-494} y1={d} x2={-466} y2={d} stroke="#a89f8c" strokeWidth={4} />)}
      <rect x={-430} y={-78} width={60} height={156} fill={CX.banda} />
      <rect x={-350} y={-54} width={270} height={108} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={5} />
      <text x={-215} y={-12} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>HIDROCORTISONA</text>
      <text x={-215} y={30} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">crema</text>
      {children}
    </g>
    <rect x={-12} y={-22} width={40} height={44} rx={6} fill="#d9d2c2" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Moho Rhizopus en una superficie: micelio (estolón), rizoides que salen DIRECTO del micelio donde toca la superficie,
// y en ese mismo punto esporangióforos con su esporangio negro redondo. crece 0..1. (No explotan: son microhongos.)
function Rhizopus({ x, y, s = 1, crece = 1, nodos = [-120, 0, 120], color = CX.hifa }) {
  if (crece <= 0) return null;
  const st = kclamp(crece * 2, 0, 1), up = kclamp(crece * 2 - 0.6, 0, 1), cap = kclamp(crece * 2.4 - 1.4, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-170 * st} 0 L ${170 * st} 0`} stroke={color} strokeWidth={8} strokeLinecap="round" />
    {nodos.map((nx, i) => <g key={i} transform={`translate(${nx} 0)`} opacity={st}>
      {[-28, -10, 8, 26].map((d, k) => <path key={k} d={`M 0 0 Q ${d * 0.5} 20 ${d} ${38 + (k % 2) * 10}`} stroke={CX.rizo} strokeWidth={4} fill="none" strokeLinecap="round" />)}
      {[-14, 0, 14].map((d, k) => { const h = (110 + k * 22 - i * 8) * up; return h > 2 ? <g key={k}>
        <path d={`M 0 0 Q ${d * 0.6} ${-h * 0.5} ${d} ${-h}`} stroke={color} strokeWidth={5} fill="none" strokeLinecap="round" />
        {cap > 0 && <circle cx={d} cy={-h - 16 * cap} r={17 * cap} fill={CX.espor} stroke={KC.ink} strokeWidth={3} />}
      </g> : null; })}
    </g>)}
  </g>;
}
// Matraz Erlenmeyer con caldo agitado y micelio SUMERGIDO en bolitas (pellets). Base en (x, y). agita = fase.
function Matraz({ T, x, y, s = 1, pellets = 1, agita = 1 }) {
  const ola = Math.sin(T * 7) * 22 * agita;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <clipPath id="cxMat"><path d="M -60 -420 L -60 -260 L -230 -10 Q -240 0 -220 0 L 220 0 Q 240 0 230 -10 L 60 -260 L 60 -420 Z" /></clipPath>
    <g clipPath="url(#cxMat)">
      <path d={`M -260 ${-190 - ola} Q 0 ${-190 + ola} 260 ${-190 + ola * 0.5} L 260 10 L -260 10 Z`} fill={CX.caldo} />
      {Array.from({ length: 16 }, (_, i) => { const a = i * 2.4 + T * 1.8 * agita, rr = 40 + (i % 5) * 34, px = Math.cos(a) * rr * 1.3, py = -95 + Math.sin(a) * rr * 0.45;
        const k = kEase.rebote(kclamp(pellets * 1.4 - i * 0.03, 0, 1)); return k > 0 ? <g key={i} transform={`translate(${px} ${py}) scale(${k})`}>
          <circle r={18} fill={CX.hifa} stroke="#c9b98a" strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5].map((j) => <line key={j} x1={0} y1={0} x2={Math.cos(j + i) * 24} y2={Math.sin(j + i) * 24} stroke={CX.hifa} strokeWidth={3} />)}
        </g> : null; })}
    </g>
    <path d="M -60 -420 L -60 -260 L -230 -10 Q -240 0 -220 0 L 220 0 Q 240 0 230 -10 L 60 -260 L 60 -420" fill={CX.vidrio} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-74} y={-460} width={148} height={46} rx={10} fill="#f3e6c4" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 -60 L -100 -150" stroke="#fff" strokeWidth={12} opacity=".5" strokeLinecap="round" />
  </g>;
}
// Matraz chiquito (un paso químico).
function MiniMatraz({ x, y, s = 1, color = KC.cyan, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -10 -46 L -10 -26 L -30 0 L 30 0 L 10 -26 L 10 -46 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-14} y={-52} width={28} height={8} rx={3} fill="#f3e6c4" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Silueta del cuerpo con riñones y glándulas suprarrenales (encima de los riñones). brillo 0..1.
function Cuerpo({ x, y, s = 1, brillo = 0, T = 0 }) {
  const g = brillo * (0.75 + 0.25 * Math.sin(T * 6));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-470} r={78} fill="#ffd9c2" stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 -360 Q -175 -100 -120 140 L -60 140 L -40 300 L 40 300 L 60 140 L 120 140 Q 175 -100 150 -360 Q 0 -400 -150 -360 Z" fill="#ffd9c2" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-1, 1].map((sd) => <g key={sd}>
      <path d={`M ${sd * 50} -80 Q ${sd * 100} -100 ${sd * 95} -30 Q ${sd * 92} 30 ${sd * 52} 10 Q ${sd * 70} -35 ${sd * 50} -80 Z`} fill="#b5523b" stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${sd * 48} -86 L ${sd * 74} -128 L ${sd * 96} -92 Z`} fill={mixHex('#e2b25a', '#fff27a', g)} stroke={KC.ink} strokeWidth={4} style={g > 0 ? { filter:`drop-shadow(0 0 ${16 * g}px ${KC.yellow})` } : null} />
    </g>)}
  </g>;
}

/* ---------- moléculas (esquemáticas pero fieles: 3 anillos de 6 + 1 de 5) ---------- */
// Posiciones de los carbonos en el dibujo estándar del esteroide (hexágonos con punta arriba, lado L).
function kEsteroideC(L) {
  const r3 = Math.sqrt(3), C = {};
  const hx = (cx, cy) => ({ top:[cx, cy - L], ur:[cx + r3 / 2 * L, cy - L / 2], lr:[cx + r3 / 2 * L, cy + L / 2], bot:[cx, cy + L], ll:[cx - r3 / 2 * L, cy + L / 2], ul:[cx - r3 / 2 * L, cy - L / 2] });
  const A = hx(0, 0), B = hx(r3 * L, 0), Cc = hx(1.5 * r3 * L, -1.5 * L);
  C[1] = A.top; C[2] = A.ul; C[3] = A.ll; C[4] = A.bot; C[5] = A.lr; C[10] = A.ur;
  C[6] = B.bot; C[7] = B.lr; C[8] = B.ur; C[9] = B.top;
  C[11] = Cc.ul; C[12] = Cc.top; C[13] = Cc.ur; C[14] = Cc.lr;
  const [x13, y13] = C[13], [, y14] = C[14];
  C[15] = [x13 + 0.95 * L, y14 + 0.31 * L]; C[16] = [x13 + 1.54 * L, (y13 + y14) / 2]; C[17] = [x13 + 0.95 * L, y13 - 0.31 * L];
  C[18] = [x13, y13 - 0.85 * L]; C[19] = [C[10][0], C[10][1] - 0.85 * L];
  C[20] = [C[17][0] + 0.45 * L, C[17][1] - 0.8 * L]; C[21] = [C[20][0] + 0.85 * L, C[20][1] - 0.45 * L];
  return C;
}
const ANILLOS = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 10], [10, 1], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [9, 11], [11, 12], [12, 13], [13, 14], [14, 8], [14, 15], [15, 16], [16, 17], [17, 13], [13, 18], [10, 19], [17, 20], [20, 21]];
// variante: 'prog' (progesterona) · '11a' (11α-hidroxiprogesterona, OH punteado) · 'hidro' (hidrocortisona, 11β en cuña).
// p 0..1 = se dibuja; ox 0..1 = se encienden los oxígenos extra; c11 0..1 = resalta el carbono 11; oh11 0..1 = aparece el OH del C11.
function Esteroide({ x, y, L = 56, variante = 'prog', p = 1, ox = 1, c11 = 0, oh11 = 1, color = KC.texto, T = 0, tam = 30 }) {
  const C = kEsteroideC(L), ln = (a, b, w = 7, c = color, extra) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeLinecap="round" {...extra} />;
  const off = (a, b, d) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy); return [[a[0] - dy / n * d, a[1] + dx / n * d], [b[0] - dy / n * d, b[1] + dx / n * d]]; };
  const O = (pt, txt, c, o = 1, key) => <g key={key} opacity={o}><circle cx={pt[0]} cy={pt[1]} r={tam * 0.78} fill={KC.dark} opacity=".85" /><text x={pt[0]} y={pt[1] + tam * 0.36} textAnchor="middle" style={{ font:`700 ${tam}px ${KF.mono}` }} fill={c}>{txt}</text></g>;
  const n = Math.ceil(ANILLOS.length * kclamp(p, 0, 1));
  const O3 = [C[3][0] - 0.9 * L, C[3][1] + 0.5 * L], O20 = [C[20][0] + 0.75 * L, C[20][1] + 0.45 * L];
  const d34 = off(C[4], C[5], -0.2 * L), dO3 = off(C[3], O3, 0.12 * L), dO20 = off(C[20], O20, 0.12 * L);
  const extra = variante !== 'prog';
  const O11 = variante === 'hidro' ? [C[11][0] - 0.75 * L, C[11][1] - 0.6 * L] : [C[11][0] - 0.75 * L, C[11][1] - 0.6 * L];
  const O17 = [C[17][0] + 0.95 * L, C[17][1] + 0.2 * L], O21 = [C[21][0] + 0.85 * L, C[21][1] + 0.4 * L];
  const brillo = 0.6 + 0.4 * Math.sin(T * 8);
  // enlace C11–O: cuña (β) o punteado (α)
  const enlace11 = () => { const [a, b] = [C[11], O11]; const dx = b[0] - a[0], dy = b[1] - a[1], nn = Math.hypot(dx, dy), px = -dy / nn, py = dx / nn, w = 0.16 * L;
    if (variante === 'hidro') return <path d={`M ${a[0]} ${a[1]} L ${b[0] + px * w} ${b[1] + py * w} L ${b[0] - px * w} ${b[1] - py * w} Z`} fill={CX.oxi} opacity={oh11} />;
    return <g opacity={oh11}>{[0.2, 0.36, 0.52, 0.68, 0.84].map((u, i) => { const w2 = w * u; const cx = a[0] + dx * u, cy = a[1] + dy * u; return <line key={i} x1={cx + px * w2} y1={cy + py * w2} x2={cx - px * w2} y2={cy - py * w2} stroke={CX.oxi} strokeWidth={5} strokeLinecap="round" />; })}</g>; };
  return <g transform={`translate(${x} ${y})`}>
    {c11 > 0 && <circle cx={C[11][0]} cy={C[11][1]} r={L * 0.5} fill={KC.yellow} opacity={0.35 * c11 * brillo} />}
    {ANILLOS.slice(0, n).map(([a, b], i) => <g key={i}>{ln(C[a], C[b])}</g>)}
    {p >= 1 && <>
      {ln(d34[0], d34[1], 6)}
      {ln(C[3], O3, 6, color)}{ln(dO3[0], dO3[1], 6, color)}
      {ln(C[20], O20, 6, color)}{ln(dO20[0], dO20[1], 6, color)}
      {O(O3, 'O', color, 1, 'o3')}{O(O20, 'O', color, 1, 'o20')}
      {extra && enlace11()}
      {extra && O(O11, 'OH', CX.oxi, oh11 * (variante === 'hidro' ? ox : 1), 'o11')}
      {variante === 'hidro' && <g opacity={ox}>
        <g>{[0.2, 0.36, 0.52, 0.68, 0.84].map((u, i) => { const a = C[17], b = O17, dx = b[0] - a[0], dy = b[1] - a[1], nn = Math.hypot(dx, dy), w2 = 0.16 * L * u; const cx = a[0] + dx * u, cy = a[1] + dy * u;
          return <line key={i} x1={cx - dy / nn * w2} y1={cy + dx / nn * w2} x2={cx + dy / nn * w2} y2={cy - dx / nn * w2} stroke={CX.oxi} strokeWidth={5} strokeLinecap="round" />; })}</g>
        {ln(C[21], O21, 6, CX.oxi)}
        {O(O17, 'OH', CX.oxi, 1, 'o17')}{O(O21, 'OH', CX.oxi, 1, 'o21')}
      </g>}
    </>}
    {c11 > 0 && <text x={C[11][0] + 0.25 * L} y={C[11][1] + 0.75 * L} style={{ font:`700 ${tam * 0.8}px ${KF.mono}` }} fill={KC.yellow} opacity={c11}>11</text>}
  </g>;
}
// Enzima (esquemática): una "bolsa" que abraza la molécula. abre 0..1.
function Enzima({ T, x, y, s = 1, o = 1 }) {
  const w = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d={`M 0 -120 Q 150 ${-150 + w} 190 -20 Q 210 110 80 140 Q -10 160 -30 90 Q 40 40 -20 -10 Q -70 -60 0 -120 Z`} fill={CX.enz} stroke={KC.ink} strokeWidth={8} opacity=".92" />
    <circle cx={110} cy={-30} r={22} fill="#7a1f1f" stroke={KC.ink} strokeWidth={5} />
    <text x={110} y={-22} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">Fe</text>
  </g>;
}
// Tanque de fermentación (esquemático) con ventana y pellets girando.
function Tanque({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-180} y={-520} width={360} height={560} rx={70} fill="#c9d3dc" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-400} width={240} height={300} rx={40} fill={CX.caldo} stroke={KC.ink} strokeWidth={7} />
    <clipPath id="cxVent"><rect x={-120} y={-400} width={240} height={300} rx={40} /></clipPath>
    <g clipPath="url(#cxVent)">{Array.from({ length: 12 }, (_, i) => { const a = i * 2.2 + T * 2.2, rr = 30 + (i % 4) * 25; return <circle key={i} cx={Math.cos(a) * rr * 1.3} cy={-250 + Math.sin(a) * rr} r={13} fill={CX.hifa} stroke="#c9b98a" strokeWidth={3} />; })}</g>
    <rect x={-20} y={-600} width={40} height={90} fill="#9aa6b2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-150} y={40} width={40} height={90} fill="#9aa6b2" stroke={KC.ink} strokeWidth={6} /><rect x={110} y={40} width={40} height={90} fill="#9aa6b2" stroke={KC.ink} strokeWidth={6} />
    <path d="M 180 -60 L 300 -60 L 300 60" stroke={KC.ink} strokeWidth={22} fill="none" /><path d="M 180 -60 L 300 -60 L 300 60" stroke="#9aa6b2" strokeWidth={12} fill="none" />
  </g>;
}

/* ---------- el shot ---------- */
const PASOS40 = Array.from({ length: 39 }, (_, i) => { const fila = Math.floor(i / 8), c = i % 8; const col = fila % 2 ? 7 - c : c; return [130 + col * 117, 720 + fila * 100]; });
const TRAMO11 = [9, 10, 11, 12, 13, 14];          // tramo ilustrativo: "oxígeno en el carbono 11" (varios pasos)

function CortisonaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cr: CUES.Crema, Co: CUES.Cortisol, Es: CUES.Esqueleto, M: CUES.Merck, P: CUES.Pregunta, E: CUES.Estudio, En: CUES.Enzima, B: CUES.Barato, Pa: CUES.Pan, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const aprieta = kprog(T, K.G + 0.05, K.G + 0.35, kEase.sale) * (1 - kprog(T, K.G + 1.0, K.G + 1.4));
  const chorro = kprog(T, K.G + 0.15, K.G + 0.9, kEase.sale);
  const untada = kprog(T, K.Cr + 0.2, K.Cr + 1.4, kEase.suave);
  const baja = kprog(T, K.Cr + 1.4, K.Cr + 3.6, kEase.suave);
  const pasos = Math.floor(kprog(T, K.M + 0.6, K.M + 5.2) * 39);
  const junta = kprog(T, K.P + 0.6, K.P + 1.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y crema: el tubo sobre la roncha (una sola escena continua) */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Rhizopus x={250} y={790} s={0.75} crece={kprog(T, K.G + 1.4, K.G + 3.2)} nodos={[-90, 30]} />
          <Brazo T={T} y={1040} roncha={1 - 0.6 * baja} crema={untada} rx={600} />
          {chorro > 0 && untada < 1 && <path d={`M 520 925 Q ${540 + 30 * chorro} ${930 + 40 * chorro} ${560 + 40 * chorro} ${960 + 50 * chorro}`} stroke={CX.crema} strokeWidth={30} strokeLinecap="round" fill="none" opacity={1 - untada} />}
          <Tubo x={520} y={900} rot={28} s={0.85} aprieta={aprieta} />
        </>)}
      </Escena>
      {/* 3 · el cortisol que hace tu cuerpo */}
      <Escena T={T} a={K.Co} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Cuerpo x={330} y={1060} s={1.05} brillo={kprog(T, K.Co + 0.5, K.Co + 1.2)} T={T} />)}
      </Escena>
      {/* 4 · por dentro: progesterona vs hidrocortisona */}
      <Escena T={T} a={K.Es} b={K.M} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Esteroide x={170} y={760} L={54} variante="prog" p={kprog(T, K.Es + 0.1, K.Es + 1.1)} color={KC.texto} T={T} />
          <Esteroide x={170} y={1090} L={54} variante="hidro" p={kprog(T, K.Es + 1.0, K.Es + 2.0)} ox={kprog(T, K.Es + 2.2, K.Es + 2.8)} c11={kprog(T, K.Es + 3.2, K.Es + 3.6)} color={KC.texto} T={T} />
        </>)}
      </Escena>
      {/* 5–6 · Merck: casi 40 pasos · re-gancho: el tramo del carbono 11 en un paso */}
      <Escena T={T} a={K.M} b={K.E} zoom={0.04}>
        <FondoLunares color={T < K.P ? KC.yellow : KC.orange} />
        {fsvg(<>
          <g transform="translate(130 640)"><rect x={-60} y={-62} width={120} height={70} rx={14} fill="#c9a54a" stroke={KC.ink} strokeWidth={6} /><text y={-16} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>bilis</text></g>
          {PASOS40.map(([px, py], i) => { if (i >= pasos && T < K.P) return null; const tr = TRAMO11.indexOf(i);
            const on = kprog(T, K.M + 0.6 + i * (4.6 / 39), K.M + 0.9 + i * (4.6 / 39), kEase.rebote);
            const enTramo = tr >= 0 && T > K.P + 0.1;
            const xx = enTramo ? klerp(px, 300, junta) : px, yy = enTramo ? klerp(py, 940, junta) : py;
            const dim = T > K.P + 0.3 && tr < 0 ? 0.35 : 1;
            return <MiniMatraz key={i} x={xx} y={yy} s={on * (enTramo ? klerp(1, 0.4, junta) : 1)} color={enTramo || (tr >= 0 && T > K.M + 5.6) ? KC.red : KC.cyan} o={dim * (enTramo ? 1 - junta * 0.9 : 1)} />; })}
          {T > K.M + 5.0 && <g transform={`translate(880 1130) scale(${kprog(T, K.M + 5.0, K.M + 5.4, kEase.rebote)})`} opacity={T > K.P + 0.3 ? 0.35 : 1}>
            <rect x={-90} y={-20} width={180} height={30} rx={8} fill="#9aa6b2" stroke={KC.ink} strokeWidth={6} /><rect x={-20} y={10} width={40} height={50} fill="#9aa6b2" stroke={KC.ink} strokeWidth={6} />
            <circle cx={0} cy={-34} r={14} fill="#fff" stroke={KC.ink} strokeWidth={4} />
          </g>}
          {junta > 0.6 && <g transform={`translate(300 990) scale(${kprog(T, K.P + 1.2, K.P + 1.6, kEase.rebote) * 2.2})`}><MiniMatraz x={0} y={0} color={KC.red} /></g>}
          {junta > 0.7 && <Interrogacion T={T} x={300} y={820} tam={260} color={KC.yellow} />}
        </>)}
      </Escena>
      {/* 7 · el experimento de Upjohn: progesterona a un moho en un matraz agitado */}
      <Escena T={T} a={K.E} b={K.En} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Matraz T={T} x={330} y={1180} s={1.0} pellets={kprog(T, K.E + 0.3, K.E + 2.0)} />
          {(() => { const g = kprog(T, K.E + 4.2, K.E + 4.9); return g > 0 && g < 1 ? <circle cx={330} cy={klerp(640, 980, g)} r={16} fill={KC.orange} stroke={KC.ink} strokeWidth={4} /> : null; })()}
          {T > K.E + 5.6 && <g opacity={kprog(T, K.E + 5.6, K.E + 6.0)}>
            <rect x={640} y={820} width={380} height={330} rx={24} fill="#fbf3dc" stroke={KC.ink} strokeWidth={7} />
            <rect x={640} y={1080} width={380} height={70} fill="#e3c68e" stroke={KC.ink} strokeWidth={0} />
            <line x1={640} y1={1080} x2={1020} y2={1080} stroke={KC.ink} strokeWidth={5} />
            <Rhizopus x={830} y={1080} s={0.95} crece={kprog(T, K.E + 5.8, K.E + 7.6)} nodos={[-100, 10, 110]} color="#efe3bf" />
          </g>}
        </>)}
      </Escena>
      {/* 8 · por dentro: la enzima pega el OH (11α, punteado) */}
      <Escena T={T} a={K.En} b={K.B} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.En + 0.8, K.En + 1.3)}>
            <path d="M -40 760 Q 300 700 540 780 Q 800 860 1120 790" stroke={CX.hifa} strokeWidth={110} fill="none" strokeLinecap="round" opacity=".9" />
            <path d="M -40 760 Q 300 700 540 780 Q 800 860 1120 790" stroke="#e9dcb4" strokeWidth={70} fill="none" strokeLinecap="round" />
            {[200, 470, 760].map((cx, i) => <ellipse key={i} cx={cx} cy={i === 1 ? 770 : 760 + i * 20} rx={30} ry={18} fill="#c9b98a" />)}
          </g>
          <g opacity={kprog(T, K.En + 0.9, K.En + 1.3)}>
            <Esteroide x={170} y={1000} L={58} variante="11a" p={1} oh11={kprog(T, K.En + 2.4, K.En + 2.7)} c11={kprog(T, K.En + 1.4, K.En + 1.8)} color={KC.texto} T={T} />
            <Enzima T={T} x={klerp(900, 360, kprog(T, K.En + 1.2, K.En + 2.2, kEase.sale))} y={900} s={0.9} o={1 - kprog(T, K.En + 3.2, K.En + 3.8) * 0.6} />
            {T > K.En + 2.4 && T < K.En + 3.2 && <circle cx={170 + 100} cy={1000 - 116} r={60 * kprog(T, K.En + 2.4, K.En + 2.8)} fill="none" stroke={KC.yellow} strokeWidth={8} opacity={1 - kprog(T, K.En + 2.8, K.En + 3.2)} />}
          </g>
        </>)}
      </Escena>
      {/* 9 · con química: 11α-OH → C=O → 11β-OH; ruta más corta y más barata */}
      <Escena T={T} a={K.B} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const u = kprog(T, K.B + 2.4, K.B + 3.4, kEase.sale); return <>
            <rect x={90} y={960} width={760} height={56} rx={28} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} />
            <rect x={90} y={1080} width={klerp(760, 300, u)} height={56} rx={28} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
            <g transform="translate(130 1108) scale(.35)"><Rhizopus x={0} y={40} crece={1} nodos={[0]} color="#fff" /></g>
          </>; })()}
          {T > K.B + 3.4 && <g transform={`translate(${klerp(860, 560, kprog(T, K.B + 3.4, K.B + 3.9, kEase.sale))} 1108)`}>
            <path d="M -50 -40 L 40 -40 L 70 0 L 40 40 L -50 40 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /><circle cx={-25} cy={0} r={9} fill={KC.ink} />
            <path d="M 110 -40 L 110 30 M 85 8 L 110 34 L 135 8" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>}
        </>)}
      </Escena>
      {/* 10 · el moho negro del pan, pariente (mismo género) */}
      <Escena T={T} a={K.Pa} b={K.H} zoom={0.05}>
        <MundoPanMacro T={T} moho={kprog(T, K.Pa + 0.2, K.Pa + 1.8, kEase.sale)} fondo={KC.orange} />
      </Escena>
      {/* 11 · hoy: tanques de fermentación */}
      <Escena T={T} a={K.H} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', left:0, top:1150, width:KW, height:40, background:'#4a4a52', borderTop:`8px solid ${KC.ink}`, borderBottom:`8px solid ${KC.ink}` }}></div>
        {fsvg(<>
          <Tanque T={T} x={300} y={1060} s={0.95} />
          {Array.from({ length: 5 }, (_, i) => { const xx = ((T - K.H) * 140 + i * 170) % 850 + 480; return <g key={i} transform={`translate(${xx} 1140) rotate(-90) scale(.22)`}><Tubo x={0} y={0} rot={0} /></g>; })}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo brazo y la misma crema, ya "leída" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="50% 55%">
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Brazo T={T} y={1040} roncha={0.25} crema={0} rx={600} />
          <Tubo x={520} y={900} rot={28} s={0.85}>
            <g opacity={kprog(T, K.C + 0.6, K.C + 1.2)}>
              <rect x={-350} y={-54} width={270} height={108} rx={10} fill="#fffbe8" stroke={KC.ink} strokeWidth={5} />
              <g transform="translate(-300 34) scale(.28)"><Rhizopus x={0} y={0} crece={1} nodos={[0]} color="#c9b98a" /></g>
              <g transform="translate(-235 22) scale(.36)"><Esteroide x={0} y={0} L={56} variante="hidro" p={1} ox={1} c11={1} color={KC.ink} T={T} tam={34} /></g>
            </g>
          </Tubo>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.6} until={K.Cr - 0.2} texto="no es pura química" x={300} y={470} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.G + 3.0} until={K.Cr - 0.2} x={60} y={560} texto="Rhizopus" it tam={34} color={KC.ink} />
      <Etq T={T} at={K.Cr + 0.4} until={K.Co - 0.3} x={60} y={470} texto="hidrocortisona" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Cr + 0.9} until={K.Co - 0.3} x={60} y={530} texto="corticoide · un esteroide" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Cr + 2.0} until={K.Co - 0.3} texto="baja la hinchazón" x={330} y={640} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Co + 0.2} until={K.Es - 0.3} texto="cortisol = hidrocortisona" x={360} y={430} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Co + 1.0} until={K.Es - 0.3} x={460} y={950} texto="glándulas suprarrenales" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.1} until={K.M - 0.3} texto="POR DENTRO · LA MOLÉCULA" x={420} y={430} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Es + 0.6} until={K.M - 0.3} x={60} y={560} texto="progesterona" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Es + 1.5} until={K.M - 0.3} x={60} y={880} texto="hidrocortisona" tam={34} color={KC.texto} />
      <Chip T={T} at={K.Es + 2.4} until={K.M - 0.3} texto="+3 oxígenos" x={830} y={980} tam={36} borde={CX.oxi} />
      <Etq T={T} at={K.Es + 3.4} until={K.M - 0.3} x={600} y={1080} texto="carbono 11: difícil" tam={30} color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.M + 0.1} until={K.M + 3.4} anio="años 40" quien="Merck · Lewis Sarett" revista="desde un ácido de la bilis" x={540} y={470} />
      <Contador T={T} at={K.M + 3.6} desde={0} hasta={39} dur={1.6} x={300} y={470} tam={64} color={KC.ink} sufijo=" pasos" />
      {T > K.M + 3.6 && T < K.P && <div style={{ position:'absolute', left:50, top:400, zIndex:41, font:`700 30px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.M + 3.6, K.M + 4.0) }}>casi 40 pasos</div>}
      <Etq T={T} at={K.M + 5.4} until={K.P - 0.2} x={960} y={1060} lado="izq" texto="18 mg" tam={44} color={KC.ink} />
      <Chip T={T} at={K.P + 0.3} until={K.E - 0.3} texto="oxígeno en el carbono 11" x={330} y={620} tam={32} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 4.0} anio="1952" quien="Peterson y Murray · Upjohn" revista="publicado en J. Am. Chem. Soc. · patente desde 1950" x={540} y={520} />
      <Etq T={T} at={K.E + 0.9} until={K.E + 4.0} x={60} y={745} texto="Kalamazoo, Michigan" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 4.2} until={K.En - 0.3} x={380} y={600} texto="progesterona" tam={32} color={KC.ink} />
      <Etq T={T} at={K.E + 2.0} until={K.En - 0.3} x={560} y={1010} lado="izq" texto="Rhizopus en bolitas" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 6.0} until={K.En - 0.3} x={640} y={790} texto="en una superficie:" tam={26} color={KC.ink} />
      <Chip T={T} at={K.En + 0.1} until={K.En + 1.0} texto="POR DENTRO · LA HIFA" x={420} y={470} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.En + 0.3} until={K.En + 1.0} x={60} y={600} texto="hifa de Rhizopus" it tam={30} color={KC.texto} />
      <Etq T={T} at={K.En + 1.4} until={K.B - 0.3} x={60} y={590} texto="enzima P450 del hongo" tam={30} color={CX.enz} />
      <Chip T={T} at={K.En + 2.8} until={K.B - 0.3} texto="11α-hidroxiprogesterona · 1 paso" x={540} y={1180} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.B + 0.2} until={K.Pa - 0.3} texto="11α-OH  (moho)" x={540} y={440} tam={34} borde={KC.ink} mono />
      <Chip T={T} at={K.B + 0.8} until={K.Pa - 0.3} texto="C=O  (cortisona)" x={540} y={600} tam={34} borde={KC.ink} mono />
      <Chip T={T} at={K.B + 1.4} until={K.Pa - 0.3} texto="11β-OH  (hidrocortisona)" x={540} y={760} tam={34} borde={KC.ink} mono />
      <Etq T={T} at={K.B + 0.5} until={K.Pa - 0.3} x={560} y={520} texto="↓ química" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 1.1} until={K.Pa - 0.3} x={560} y={680} texto="↓ química" tam={28} color={KC.ink} />
      <Etq T={T} at={K.B + 2.0} until={K.Pa - 0.3} x={70} y={935} texto="solo química" tam={26} color={KC.ink} />
      <Etq T={T} at={K.B + 2.4} until={K.Pa - 0.3} x={70} y={1055} texto="hongo + química" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Pa + 0.8} until={K.H - 0.3} x={60} y={470} texto="moho negro del pan" tam={36} color={KC.ink} />
      <Etq T={T} at={K.Pa + 1.2} until={K.H - 0.3} x={60} y={525} texto="Rhizopus stolonifer" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Pa + 2.0} until={K.H - 0.3} texto="mismo género: Rhizopus" x={540} y={1180} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.H + 0.3} until={K.C - 0.3} texto="biotransformación: hongo + química" x={540} y={430} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.H + 1.0} until={K.C - 0.3} x={520} y={700} texto="tanque de fermentación" tam={28} color={KC.ink} />
      <Etq T={T} at={K.H + 1.6} until={K.C - 0.3} x={600} y={1080} texto="corticoides" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="un moho le abrió el camino" x={360} y={470} tam={36} borde={KC.yellow} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={60} y={560} texto="carbono 11 · Rhizopus" tam={28} color={KC.ink} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={60} y={1520} texto="No es consejo médico." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Co} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Co} until={K.Es} texto="20 cm" largo={140} />
      <BarraEscala T={T} at={K.Es} until={K.M} texto="1 nm · esquemático" largo={150} />
      <BarraEscala T={T} at={K.M} until={K.E} texto="esquemático: 1 matraz = 1 paso" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.En} texto="2 cm" largo={60} />
      <BarraEscala T={T} at={K.En} until={K.En + 1.0} texto="10 µm" largo={110} />
      <BarraEscala T={T} at={K.En + 1.0} until={K.B} texto="1 nm · esquemático" largo={150} />
      <BarraEscala T={T} at={K.B} until={K.Pa} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Pa} until={K.H} texto="2 cm" largo={56} />
      <BarraEscala T={T} at={K.H} until={K.C} texto="2 m · esquemático" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={130} y={1440} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cr - 0.1} texto="Esa crema no es *pura química.*" />
      <Subtitulo T={T} idx={1} at={K.Cr + 0.1} until={K.Co - 0.1} texto="Hidrocortisona: un esteroide que *baja la hinchazón.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.Es - 0.1} texto="La misma molécula que *tu cortisol.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.M - 0.1} texto="Tres oxígenos más; uno, *en el carbono 11.*" />
      <Subtitulo T={T} idx={4} at={K.M + 0.1} until={K.P - 0.1} texto="Casi 40 pasos para *18 miligramos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Ese oxígeno *en un solo paso?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.En - 0.1} texto="1952: progesterona a un moho, *Rhizopus.*" />
      <Subtitulo T={T} idx={7} at={K.En + 0.1} until={K.B - 0.1} texto="Una enzima pega el oxígeno *en el carbono 11.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.Pa - 0.1} texto="Ruta más corta, *cortisona más barata.*" />
      <Subtitulo T={T} idx={9} at={K.Pa + 0.1} until={K.H - 0.1} texto="Pariente del *moho negro del pan.*" />
      <Subtitulo T={T} idx={10} at={K.H + 0.1} until={K.C - 0.1} texto="Hoy, hongos así *fabrican corticoides.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un moho *le abrió el camino.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Co + 0.1, K.Es - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 3.2, K.M - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.M + 3.6, K.P - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.E - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.En + 1.9, K.B - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pa + 0.1, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C - 0.1, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="76" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CortisonaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CortisonaShot /></CompositionStage></div>;
}
window.CortisonaApp = CortisonaApp;
