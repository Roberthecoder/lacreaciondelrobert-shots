// Shot Fungi Mati #18 · El cacahuate arrugado del fondo de la bolsa: aflatoxinas — NARRADO (gancho 6 "¿Por qué NO…?" + N2 "El número" + "qué sí sirve").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.
// Viaje: bolsa de cacahuates (macro) → moho y ADN (micro) → la misma bolsa, y el arrugado a la basura (macro).

/* ---------- geometría: polígono regular de n lados sobre la arista PQ, del lado contrario a "lejos" ---------- */
function afNgon(P, Q, n, lejos) {
  const mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2, dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy);
  const ap = L / (2 * Math.tan(Math.PI / n));
  let nx = -dy / L, ny = dx / L;
  if (Math.hypot(mx + nx * ap - lejos[0], my + ny * ap - lejos[1]) < Math.hypot(mx - nx * ap - lejos[0], my - ny * ap - lejos[1])) { nx = -nx; ny = -ny; }
  const cx = mx + nx * ap, cy = my + ny * ap, R = Math.hypot(P[0] - cx, P[1] - cy);
  const a0 = Math.atan2(P[1] - cy, P[0] - cx), a1 = Math.atan2(Q[1] - cy, Q[0] - cx);
  let d = a1 - a0; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  const st = Math.sign(d) * 2 * Math.PI / n;
  return { c: [cx, cy], v: Array.from({ length: n }, (_, k) => [cx + R * Math.cos(a0 + st * k), cy + R * Math.sin(a0 + st * k)]) };
}
// Aflatoxina B1, esquemática: dos furanos + benceno + lactona + ciclopentenona (5 anillos fusionados).
const AF_ANILLOS = (() => {
  const H1v = [30, 90, 150, 210, 270, 330].map((a) => [30 * Math.cos(a * Math.PI / 180), 30 * Math.sin(a * Math.PI / 180)]);
  const H1 = { c: [0, 0], v: H1v };
  const F1 = afNgon(H1v[2], H1v[3], 5, H1.c);
  const F2 = afNgon(F1.v[2], F1.v[3], 5, F1.c);
  const H2 = afNgon(H1v[5], H1v[0], 6, H1.c);
  const C5 = afNgon(H2.v[2], H2.v[3], 5, H2.c);
  return { anillos: [F2, F1, H1, H2, C5], H2, C5 };
})();
function Molecula({ x, y, s = 1, rot = 0, color = KC.yellow, fantasma = 0, reactiva = 0, o = 1 }) {
  const { anillos, H2, C5 } = AF_ANILLOS;
  const pts = (v) => v.map((p) => p.map((q) => q.toFixed(1)).join(',')).join(' ');
  const dash = fantasma ? '7 7' : undefined, trazo = fantasma ? 'rgba(255,255,255,.9)' : KC.ink;
  const relleno = fantasma ? 'rgba(255,255,255,.08)' : mixHex(color, KC.red, reactiva);
  const oxo = (A, B, c) => { const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = mx - c[0], dy = my - c[1], L = Math.hypot(dx, dy); return <line x1={mx} y1={my} x2={mx + dx / L * 26} y2={my + dy / L * 26} stroke={trazo} strokeWidth={6} strokeLinecap="round" strokeDasharray={dash} />; };
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {anillos.map((r, i) => <polygon key={i} points={pts(r.v)} fill={relleno} stroke={trazo} strokeWidth={5} strokeLinejoin="round" strokeDasharray={dash} />)}
    {oxo(H2.v[3], H2.v[4], H2.c)}{oxo(C5.v[2], C5.v[3], C5.c)}
    {reactiva > 0 && (() => { const F2 = anillos[0]; const A = F2.v[2], B = F2.v[3], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = mx - F2.c[0], dy = my - F2.c[1], L = Math.hypot(dx, dy);
      return <g opacity={reactiva}><polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${mx + dx / L * 30},${my + dy / L * 30}`} fill={KC.red} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        <circle cx={mx + dx / L * 30} cy={my + dy / L * 30} r={9} fill={KC.white} stroke={KC.ink} strokeWidth={4} /></g>; })()}
  </g>;
}

/* ---------- piezas de este shot ---------- */
// Cacahuate pelado (grano). malo 0..1: arrugado, oscuro y con manchas de moho amarillo verdoso.
function Cacahuate({ x, y, s = 1, rot = 0, malo = 0 }) {
  const fill = mixHex('#e8bb78', '#9a7440', malo);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s} ${s * (1 - 0.14 * malo)})`}>
    <path d="M -58 0 C -58 -34 -20 -40 10 -36 C 44 -32 60 -18 60 4 C 60 28 36 38 4 36 C -30 34 -58 30 -58 0 Z" fill={fill} stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 -18 Q -6 -28 26 -20" stroke="#fff3d6" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7 * (1 - malo)} />
    <path d="M 44 -10 Q 52 2 46 14" stroke={KC.ink} strokeWidth={4} fill="none" opacity=".5" />
    {malo > 0 && <g opacity={malo}>
      {['M -44 -8 Q -30 0 -40 14', 'M -18 -24 Q -6 -8 -16 8 Q -8 20 -18 30', 'M 6 -30 Q 16 -14 8 0', 'M 20 6 Q 32 16 22 28'].map((d, i) => <path key={i} d={d} stroke="#5a3f1c" strokeWidth={4} fill="none" strokeLinecap="round" />)}
      {[[-30, 12, 11], [14, -14, 9], [34, 14, 7], [-6, 20, 6]].map(([cx, cy, r], i) => <g key={i}><circle cx={cx} cy={cy} r={r + 4} fill="#d6e05a" opacity=".55" /><circle cx={cx} cy={cy} r={r} fill="#9db83a" stroke="#4f6b1c" strokeWidth={2} /></g>)}
    </g>}
  </g>;
}
// Bolsita transparente de cacahuates. Boca en (0, -220) local.
function Bolsa({ x, y, s = 1, rot = 0, llena = 1 }) {
  const g = krng(31);
  const dentro = Array.from({ length: 16 }, (_, i) => [-100 + (i % 4) * 66 + g() * 16, 170 - Math.floor(i / 4) * 62 + g() * 12, g() * 360]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 -200 L 150 -200 L 160 200 Q 0 222 -160 200 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    {dentro.slice(0, Math.round(16 * llena)).map(([px, py, r], i) => <Cacahuate key={i} x={px} y={py} s={0.55} rot={r} />)}
    <path d="M -150 -200 L 150 -200 L 150 -170 L -150 -170 Z" fill="#ff8a1f" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M ${-150 + i * 30} -200 l 15 -16 l 15 16`} fill="#ff8a1f" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    <rect x={-128} y={-60} width={256} height={84} rx={16} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-4} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.white}>CACAHUATES</text>
  </g>;
}
// Conidióforo de Aspergillus flavus: estipe rugoso, vesícula redonda, fiálides y cadenas de esporas (conidios) amarillo verdosas.
function Conidioforo({ x, y, s = 1, crece = 1, T = 0, seed = 1 }) {
  if (crece <= 0) return null;
  const alto = 520 * kEase.sale(kclamp(crece * 1.5, 0, 1)), cab = kclamp(crece * 2 - 0.9, 0, 1), cad = kclamp(crece * 2 - 1.1, 0, 1);
  const g = krng(seed), n = 17, R = 66;
  const rug = Array.from({ length: 14 }, (_, i) => [((i % 2) ? 1 : -1) * 13, -i * (alto / 14) - 10]);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.8 + seed) * 1.5})`}>
    <path d={`M -12 0 L -10 ${-alto} L 10 ${-alto} L 12 0 Z`} fill="#f4f1e2" stroke={KC.ink} strokeWidth={5} />
    {rug.map(([rx, ry], i) => -ry < alto - 10 && <circle key={i} cx={rx} cy={ry} r={3} fill="#b9b39a" />)}
    {cab > 0 && <g transform={`translate(0 ${-alto - R * 0.75})`}>
      {Array.from({ length: n }, (_, i) => { const a = Math.PI * (1.05 + 0.9 * i / (n - 1)) - Math.PI * 0.22 + (i / (n - 1)) * Math.PI * 0.44; const ca = Math.cos(a), sa = Math.sin(a);
        const largo = Math.round(6 * cad * (0.7 + 0.3 * g()));
        return <g key={i}>
          <line x1={ca * R * 0.9} y1={sa * R * 0.9} x2={ca * (R + 26) * cab} y2={sa * (R + 26) * cab} stroke={KC.ink} strokeWidth={13} strokeLinecap="round" />
          <line x1={ca * R * 0.9} y1={sa * R * 0.9} x2={ca * (R + 26) * cab} y2={sa * (R + 26) * cab} stroke="#e9f0c4" strokeWidth={7} strokeLinecap="round" />
          {Array.from({ length: largo }, (_, k) => <circle key={k} cx={ca * (R + 42 + k * 19)} cy={sa * (R + 42 + k * 19)} r={10} fill={k % 2 ? '#c4d64a' : '#a9c23c'} stroke={KC.ink} strokeWidth={3} />)}
        </g>; })}
      <circle r={R * cab} fill="#f4f1e2" stroke={KC.ink} strokeWidth={6} />
    </g>}
  </g>;
}
// Costal con contenido arriba.
function Costal({ x, y, texto, tipo, moho = 0, s = 1 }) {
  const arriba = { maiz: (i) => <ellipse key={i} cx={-60 + i * 24} cy={-150 + (i % 2) * 8} rx={12} ry={15} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />,
    cacahuate: (i) => <Cacahuate key={i} x={-55 + i * 22} y={-150 + (i % 2) * 10} s={0.36} rot={i * 50} />,
    nueces: (i) => <g key={i}><circle cx={-55 + i * 22} cy={-150 + (i % 2) * 10} r={15} fill="#a8743a" stroke={KC.ink} strokeWidth={3} /><path d={`M ${-55 + i * 22} ${-163 + (i % 2) * 10} v 26`} stroke={KC.ink} strokeWidth={2} /></g>,
    chiles: (i) => <path key={i} d={`M ${-62 + i * 22} ${-140} q 6 -30 18 -36 q 2 22 -12 40 z`} fill="#8e1b14" stroke={KC.ink} strokeWidth={3} /> }[tipo];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 6 }, (_, i) => arriba(i))}
    <path d="M -95 -140 Q -110 0 -100 110 Q 0 130 100 110 Q 110 0 95 -140 Q 0 -126 -95 -140 Z" fill="#d9c08a" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -60 Q 0 -50 80 -60 M -84 40 Q 0 50 84 40" stroke="#b39a64" strokeWidth={5} fill="none" />
    <text x={0} y={10} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
    {moho > 0 && [[-50, -90, 18], [40, 70, 22], [60, -30, 12], [-40, 80, 14]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r * kclamp(moho * 1.6 - i * 0.2, 0, 1)} fill="#a9c23c" stroke="#4f6b1c" strokeWidth={3} opacity=".9" />)}
  </g>;
}
function Termometro({ x, y, v = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-24} y={-300} width={48} height={320} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-12} y={-280 + 260 * (1 - v)} width={24} height={300 - 260 * (1 - v)} rx={10} fill={KC.red} />
    <circle cx={0} cy={30} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {[-240, -180, -120, -60].map((ty, i) => <line key={i} x1={24} y1={ty} x2={42} y2={ty} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
function Llamas({ T, x, y, ancho = 300, n = 5 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const dx = x - ancho / 2 + (i + 0.5) * ancho / n; return <path key={i} d={`M ${dx - 26} ${y} Q ${dx} ${y - 70 - 26 * Math.abs(Math.sin(T * 7 + i))} ${dx + 26} ${y} Z`} fill={i % 2 ? KC.yellow : KC.red} stroke={KC.ink} strokeWidth={4} />; })}</g>;
}
// Hígado (vista de frente): lóbulo derecho grande a la izquierda del espectador.
function Higado({ x, y, s = 1, nodulo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -40 C -250 -150 -60 -170 120 -140 C 230 -125 290 -90 280 -40 C 270 10 120 40 40 80 C -40 120 -140 150 -200 110 C -250 80 -265 20 -260 -40 Z" fill="#a8432f" stroke={KC.ink} strokeWidth={8} />
    <path d="M 10 -150 Q 30 -40 0 70" stroke="#7a2d1f" strokeWidth={6} fill="none" />
    <path d="M -200 -100 Q -120 -140 -40 -130" stroke="#d9705a" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={-40} cy={95} rx={30} ry={20} fill="#3fa34d" stroke={KC.ink} strokeWidth={5} />
    {nodulo > 0 && <g transform={`translate(-130 10) scale(${nodulo})`}><circle r={38} fill="#e9d7b8" stroke={KC.ink} strokeWidth={5} /><circle cx={-10} cy={-8} r={10} fill="#cdb894" /></g>}
  </g>;
}
// Personita del conteo. amarillo 0..1 = piel amarilla (ictericia). apagada 0..1.
function Personita({ x, y, s = 1, amarillo = 0, apagada = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - 0.7 * apagada}>
    <circle cx={0} cy={-14} r={9} fill={mixHex(mixHex('#c98d63', '#f0d43a', amarillo), '#7d8088', apagada)} stroke={KC.ink} strokeWidth={2.5} />
    <path d="M -12 12 Q -12 -3 0 -3 Q 12 -3 12 12 Z" fill={mixHex('#2346ff', '#7d8088', apagada)} stroke={KC.ink} strokeWidth={2.5} />
  </g>;
}
// Pavito (cría de pavo): plumón café claro, cabeza pequeña con pico. cae 0..1 = se acuesta.
function Pavito({ T, x, y, s = 1, cae = 0, seed = 1 }) {
  const paso = (1 - cae) * Math.sin(T * 8 + seed) * 6;
  return <g transform={`translate(${x} ${y + paso * 0.3}) scale(${s}) rotate(${cae * 80})`} opacity={1 - 0.35 * cae}>
    <line x1={-8} y1={20} x2={-12 - paso} y2={44} stroke="#c98b2b" strokeWidth={5} /><line x1={10} y1={20} x2={12 + paso} y2={44} stroke="#c98b2b" strokeWidth={5} />
    <ellipse cx={0} cy={0} rx={38} ry={30} fill="#c9a676" stroke={KC.ink} strokeWidth={5} />
    <path d="M -20 -6 Q 0 10 20 -4" stroke="#a5835a" strokeWidth={5} fill="none" />
    <circle cx={30} cy={-30} r={18} fill="#d8b98b" stroke={KC.ink} strokeWidth={5} />
    <path d="M 46 -32 L 60 -28 L 46 -24 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={3} />
    {cae < 0.5 ? <circle cx={36} cy={-34} r={4} fill={KC.ink} /> : <path d="M 32 -38 l 8 8 M 40 -38 l -8 8" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
function Sol({ T, x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 20})`}>
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-r - 14} x2={0} y2={-r - 44} stroke={KC.orange} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Frasco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-110} width={140} height={190} rx={26} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={-42 + (i % 4) * 28} cy={50 - Math.floor(i / 4) * 30} rx={12} ry={15} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-80} y={-140} width={160} height={36} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Bote({ x, y, s = 1, tapa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -110 L 90 -110 L 72 120 L -72 120 Z" fill="#8a96a3" stroke={KC.ink} strokeWidth={7} />
    {[-40, 0, 40].map((dx) => <line key={dx} x1={dx} y1={-80} x2={dx * 0.85} y2={95} stroke="#5f6a76" strokeWidth={8} strokeLinecap="round" />)}
    <g transform={`translate(-100 -120) rotate(${-55 * (1 - tapa)})`}>
      <rect x={0} y={-22} width={200} height={26} rx={10} fill="#a9b4bf" stroke={KC.ink} strokeWidth={6} />
      <rect x={80} y={-40} width={40} height={20} rx={8} fill="#a9b4bf" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Doble hélice horizontal (esquemática). pegado: índice del escalón donde se pega la molécula.
function Helice({ T, x0 = 90, x1 = 990, y = 940, A = 90, pegado = -1, brillo = 0 }) {
  const N = 22, fase = T * 0.8, pts = (sg) => Array.from({ length: 60 }, (_, i) => { const u = i / 59, xx = klerp(x0, x1, u); return `${i ? 'L' : 'M'} ${xx.toFixed(1)} ${(y + sg * A * Math.sin(u * Math.PI * 4 + fase)).toFixed(1)}`; }).join(' ');
  const colores = [KC.mint, KC.pink, KC.cyan, KC.orange];
  return <g>
    {Array.from({ length: N }, (_, i) => { const u = (i + 0.5) / N, xx = klerp(x0, x1, u), sn = Math.sin(u * Math.PI * 4 + fase), ya = y + A * sn, yb = y - A * sn, ym = (ya + yb) / 2;
      const on = i === pegado;
      return <g key={i}>
        <line x1={xx} y1={ya} x2={xx} y2={ym} stroke={on ? '#ffffff' : colores[i % 4]} strokeWidth={on ? 14 : 10} opacity={on ? 1 : 0.85} />
        <line x1={xx} y1={ym} x2={xx} y2={yb} stroke={colores[(i + 2) % 4]} strokeWidth={10} opacity=".85" />
        {on && brillo > 0 && <circle cx={xx} cy={ya} r={26 + 20 * brillo} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={1 - brillo * 0.6} />}
      </g>; })}
    <path d={pts(1)} stroke="#9ad7ff" strokeWidth={12} fill="none" /><path d={pts(-1)} stroke="#d6a6ff" strokeWidth={12} fill="none" />
  </g>;
}
function Lluvia({ T, on = 1, x0 = 0, x1 = KW, y0 = 380, y1 = 1180 }) {
  if (on <= 0) return null;
  const g = krng(7);
  return <g opacity={on}>{Array.from({ length: 46 }, (_, i) => { const x = klerp(x0, x1, g()), v = 900 + g() * 400, ph = g(); const yy = y0 + ((T * v / 1000 + ph) % 1) * (y1 - y0);
    return <line key={i} x1={x} y1={yy} x2={x - 10} y2={yy + 40} stroke="#2346ff" strokeWidth={5} strokeLinecap="round" opacity=".7" />; })}</g>;
}
function Milpa({ x, y, s = 1, T = 0, seed = 1 }) {
  const m = Math.sin(T * 1.6 + seed) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m})`}>
    <path d="M 0 0 L 0 -400" stroke="#3a8a2c" strokeWidth={12} />
    {[[-1, -120], [1, -190], [-1, -260], [1, -320]].map(([sg, yy], i) => <path key={i} d={`M 0 ${yy} q ${sg * 70} -40 ${sg * 130} 10`} stroke="#3fbf4a" strokeWidth={14} fill="none" strokeLinecap="round" />)}
    <ellipse cx={14} cy={-230} rx={16} ry={44} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 -400 l -14 -36 M 0 -400 l 14 -36 M 0 -400 l 0 -40" stroke="#c98b2b" strokeWidth={5} />
  </g>;
}
function Troje({ x, y, moho = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -170 -170 L 0 -290 L 170 -170 Z" fill="#a0602a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-150} y={-170} width={300} height={260} fill="#c98b4a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 12 }, (_, i) => { const cx = -105 + (i % 4) * 70, cy = -110 + Math.floor(i / 4) * 70; return <g key={i}>
      <ellipse cx={cx} cy={cy} rx={30} ry={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
      {moho > 0 && i % 3 !== 1 && <circle cx={cx + 8} cy={cy - 4} r={11 * kclamp(moho * 2 - (i % 4) * 0.25, 0, 1)} fill="#a9c23c" stroke="#4f6b1c" strokeWidth={2} />}</g>; })}
  </g>;
}

/* ---------- el shot ---------- */
function AflatoxinasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, I: CUES.Invisible, Mo: CUES.Moho, Co: CUES.Cocinar, P: CUES.Pregunta, AD: CUES.ADN, Ca: CUES.Cancer, Es: CUES.Estudio, Nu: CUES.Numero, Br: CUES.Brote, Pa: CUES.Pavos, Si: CUES.Sirve, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const MICRO = K.Mo + 2.7; // del conidióforo (micro) a la bodega (macro)
  // bolsa que se voltea y cacahuates que caen (gancho); se repite igual en el cierre
  const giro = klerp(15, 68, kprog(T, K.G + 0.05, K.G + 0.6, kEase.sale));
  const bocaX = 330 + 220 * Math.sin(giro * Math.PI / 180), bocaY = 860 - 220 * Math.cos(giro * Math.PI / 180);
  const CAEN = [[470, 1135, 20], [610, 1150, -30], [720, 1130, 70], [540, 1175, 110], [820, 1165, -10], [670, 1190, 40], [900, 1140, 150], [760, 1200, -60]];
  const ARR = [600, 1120]; // el cacahuate arrugado
  const Mesa = ({ cierre }) => <>
    <rect x={0} y={1160} width={KW} height={800} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={1160} width={KW} height={20} fill="#a8703a" />
    {CAEN.map(([x, y, r], i) => { const t0 = K.G + 0.15 + i * 0.1, u = cierre ? 1 : kprog(T, t0, t0 + 0.45, kEase.suave);
      return u > 0 ? <Cacahuate key={i} x={klerp(bocaX, x, u)} y={klerp(bocaY, y - 25, u) - Math.sin(u * Math.PI) * 120} s={0.8} rot={r * u} /> : null; })}
  </>;
  const arrU = kprog(T, K.G + 1.0, K.G + 1.55, kEase.suave);
  const vuela = kprog(T, K.Ci + 0.5, K.Ci + 1.4, kEase.suave);
  const PERSONAS = 317, MUERTES = 125;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: se voltea la bolsita y sale el cacahuate arrugado del fondo */}
      <Escena T={T} a={K.G} b={K.I} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa />
          <Bolsa x={330} y={860} rot={giro} llena={1 - 0.4 * kprog(T, K.G, K.G + 1)} />
          {arrU > 0 && <Cacahuate x={klerp(bocaX, ARR[0], arrU)} y={klerp(bocaY, ARR[1] - 20, arrU) - Math.sin(arrU * Math.PI) * 160} s={0.8 + 0.3 * kprog(T, K.G + 1.6, K.G + 2.4, kEase.sale)} rot={-15 * arrU} malo={1} />}
          {T > K.G + 1.7 && <circle cx={ARR[0]} cy={ARR[1] - 20} r={110 + 8 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray="20 14" />}
        </>)}
      </Escena>
      {/* 2 · sin olor, sabor ni color: la lupa sobre el arrugado; las moléculas no se ven */}
      <Escena T={T} a={K.I} b={K.Mo} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <circle cx={540} cy={800} r={330} fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={16} />
          <line x1={780} y1={1030} x2={930} y2={1180} stroke={KC.ink} strokeWidth={40} strokeLinecap="round" />
          <Cacahuate x={540} y={800} s={kprog(T, K.I - 0.4, K.I + 0.4, kEase.sale) * 3.6 + 0.6} rot={-15 + Math.sin(T) * 3} malo={1} />
          {[[440, 760, 10], [600, 720, -20], [560, 880, 40], [430, 860, -50], [660, 830, 15]].map(([x, y, r], i) => <Molecula key={i} x={x} y={y + Math.sin(T * 2 + i) * 6} s={0.75} rot={r + T * 10} fantasma={1} o={kprog(T, K.I + 0.5 + i * 0.12, K.I + 0.9 + i * 0.12) * (0.55 + 0.25 * Math.sin(T * 3 + i))} />)}
        </>)}
      </Escena>
      {/* 3a · micro: del cacahuate brotan los conidióforos de Aspergillus flavus */}
      <Escena T={T} a={K.Mo} b={MICRO} zoom={0.08} origen="50% 40%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} />
        {fsvg(<>
          <path d="M -20 1180 Q 540 1080 1100 1180 L 1100 1960 L -20 1960 Z" fill="#9a7440" stroke={KC.ink} strokeWidth={8} />
          <path d="M 60 1150 Q 300 1110 520 1120 M 600 1118 Q 820 1112 1020 1150" stroke="#5a3f1c" strokeWidth={6} fill="none" />
          <RedHifas T={T} x={540} y={1130} g={kprog(T, K.Mo, K.Mo + 1.2)} seed={18} n={140} escala={0.55} color="#e9f0c4" ancho={4} />
          <Conidioforo T={T} x={640} y={1120} s={1.05} crece={kprog(T, K.Mo + 0.1, K.Mo + 1.6)} seed={3} />
          <Conidioforo T={T} x={170} y={1150} s={0.5} crece={kprog(T, K.Mo + 0.4, K.Mo + 1.9)} seed={5} />
          <Conidioforo T={T} x={960} y={1150} s={0.45} crece={kprog(T, K.Mo + 0.6, K.Mo + 2.1)} seed={8} />
        </>)}
      </Escena>
      {/* 3b · macro: la bodega con calor y humedad */}
      <Escena T={T} a={MICRO} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1160} width={KW} height={800} fill="#8a6a45" stroke={KC.ink} strokeWidth={8} />
          {[['maíz', 'maiz', 165], ['cacahuate', 'cacahuate', 405], ['nueces', 'nueces', 645], ['chiles', 'chiles', 885]].map(([t, tipo, x], i) => { const on = kprog(T, MICRO + 0.15 + i * 0.3, MICRO + 0.5 + i * 0.3, kEase.rebote);
            return on > 0 ? <g key={i} transform={`translate(${x} 1060) scale(${on}) translate(${-x} -1060)`}><Costal x={x} y={1060} texto={t} tipo={tipo} s={0.92} moho={kprog(T, K.Co - 1.4 + i * 0.15, K.Co - 0.3)} /></g> : null; })}
          <Termometro x={110} y={780} v={0.25 + 0.7 * kprog(T, MICRO + 1.6, MICRO + 2.6, kEase.sale)} />
          {kprog(T, MICRO + 1.7, MICRO + 2) > 0 && Array.from({ length: 8 }, (_, i) => { const u = ((T - MICRO - 1.7) * 0.9 + i / 8) % 1; return <path key={i} d="M 0 -18 Q 12 0 0 10 Q -12 0 0 -18 Z" transform={`translate(${240 + (i * 97) % 780} ${560 + u * 340})`} fill="#7fd0ff" stroke={KC.ink} strokeWidth={3} opacity={1 - u * 0.6} />; })}
        </>)}
      </Escena>
      {/* 4 · cocinar: tostar en el comal o freír no las quita del todo */}
      <Escena T={T} a={K.Co} b={K.P}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Llamas T={T} x={380} y={1080} ancho={460} n={6} />
          <ellipse cx={380} cy={990} rx={290} ry={70} fill="#3b3b40" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 9 }, (_, i) => <Cacahuate key={i} x={200 + (i % 5) * 85 + (i > 4 ? 40 : 0)} y={970 + (i > 4 ? 30 : 0) + Math.sin(T * 9 + i) * 3} s={0.5} rot={i * 37 + T * 40 * (i % 2 ? 1 : -1)} />)}
          <g transform="translate(830 1000)">
            <Llamas T={T + 0.3} x={0} y={80} ancho={200} n={3} />
            <rect x={110} y={-18} width={160} height={26} rx={12} fill="#2a2a2e" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={0} rx={120} ry={40} fill="#2f2f34" stroke={KC.ink} strokeWidth={7} />
            <ellipse cx={0} cy={-6} rx={100} ry={26} fill="#f2c43a" opacity=".85" />
            {Array.from({ length: 6 }, (_, i) => { const u = ((T * 1.8 + i / 6) % 1); return <circle key={i} cx={-70 + i * 28} cy={-10 - u * 30} r={5 + u * 6} fill="#fff8d0" opacity={1 - u} />; })}
          </g>
          {Array.from({ length: 5 }, (_, i) => { const on = kprog(T, K.Co + 0.9 + i * 0.12, K.Co + 1.2 + i * 0.12, kEase.rebote); return on > 0 ? <Molecula key={i} x={220 + i * 120 + (i === 4 ? 360 : 0)} y={(i === 4 ? 860 : 860) - Math.abs(Math.sin(T * 4 + i)) * 40} s={0.7 * on} rot={T * 25 + i * 50} color={KC.yellow} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.AD} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 6 · en tu cuerpo se vuelve un epóxido que se pega al ADN (a una guanina) */}
      <Escena T={T} a={K.AD} b={K.Ca}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <circle cx={540} cy={900} r={560} fill="rgba(194,91,74,.18)" stroke="rgba(255,255,255,.25)" strokeWidth={6} />
          <Helice T={T} pegado={11} brillo={kprog(T, K.AD + 2.2, K.AD + 3.0)} />
          {(() => { const llega = kprog(T, K.AD + 1.3, K.AD + 2.2, kEase.suave); const ent = kprog(T, K.AD + 0.1, K.AD + 0.6, kEase.sale);
            const xx = klerp(860, 559, llega), yy = klerp(560, 940 + 90 * Math.sin((11.5 / 22) * Math.PI * 4 + T * 0.8) - 70, llega);
            return <Molecula x={xx + (1 - ent) * 300} y={yy} s={1.1} rot={klerp(20, -10, llega) + (1 - llega) * Math.sin(T * 2) * 8} reactiva={kprog(T, K.AD + 0.8, K.AD + 1.2)} />; })()}
        </>)}
      </Escena>
      {/* 7 · grupo 1 de la IARC: ligadas al cáncer de hígado */}
      <Escena T={T} a={K.Ca} b={K.Es}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform={`translate(540 900) scale(${kprog(T, K.Ca, K.Ca + 0.6, kEase.rebote)}) translate(-540 -900)`}>
            <Higado x={560} y={900} s={1.4} nodulo={kprog(T, K.Ca + 4.4, K.Ca + 4.9, kEase.rebote)} />
            {false && <g />
          </g>
          <SelloGrupo T={T} at={K.Ca + 1.7} x={830} y={1040} />
        </>)}
      </Escena>
      {/* 8 · Kenia 2004: cosecha en plenas lluvias y maíz guardado húmedo */}
      <Escena T={T} a={K.Es} b={K.Nu}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1160} width={KW} height={800} fill="#7a5532" stroke={KC.ink} strokeWidth={8} />
          {[90, 200, 310, 420].map((x, i) => <Milpa key={i} T={T} x={x} y={1170} s={0.9 + (i % 2) * 0.1} seed={i} />)}
          <g opacity={kprog(T, K.Es + 2.0, K.Es + 2.5)}><Troje x={760} y={1070} moho={kprog(T, K.Es + 3.0, K.Es + 4.2)} /></g>
          <Lluvia T={T} on={kprog(T, K.Es + 0.6, K.Es + 1.0)} />
        </>)}
      </Escena>
      {/* 9 · el número: hasta 8,000 ppb contra un límite de 20 */}
      <Escena T={T} a={K.Nu} b={K.Br} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <line x1={80} y1={1160} x2={1000} y2={1160} stroke={KC.ink} strokeWidth={8} />
          <rect x={180} y={1160 - 12} width={150} height={12} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} />
          {(() => { const h = 1300 * kprog(T, K.Nu + 0.4, K.Nu + 1.8, kEase.suave); return <rect x={640} y={1160 - h} width={220} height={h} fill={KC.red} stroke={KC.ink} strokeWidth={7} />; })()}
        </>)}
      </Escena>
      {/* 10 · el brote: 317 enfermos con piel amarilla; 125 muertos */}
      <Escena T={T} a={K.Br} b={K.Pa}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {Array.from({ length: PERSONAS }, (_, i) => { const c = i % 20, f = Math.floor(i / 20); const on = kprog(T, K.Br + 0.2 + f * 0.06, K.Br + 0.45 + f * 0.06, kEase.sale);
            if (on <= 0) return null;
            const am = kprog(T, K.Br + 1.5 + (c + f) * 0.02, K.Br + 1.9 + (c + f) * 0.02);
            const ap = i < MUERTES ? kprog(T, K.Br + 3.1 + i * 0.006, K.Br + 3.4 + i * 0.006) : 0;
            return <Personita key={i} x={112 + c * 45} y={545 + f * 35} s={on * 1.05} amarillo={am} apagada={ap} />; })}
        </>)}
      </Escena>
      {/* 11 · cómo se descubrieron: pavitos en Inglaterra y harina de cacahuate mohosa */}
      <Escena T={T} a={K.Pa} b={K.Si}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={800} fill="#6fae4a" stroke={KC.ink} strokeWidth={8} />
          <g transform="translate(190 960)">
            <path d="M -110 -150 Q -125 0 -115 120 Q 0 140 115 120 Q 125 0 110 -150 Q 0 -136 -110 -150 Z" fill="#e4d2a6" stroke={KC.ink} strokeWidth={7} />
            <text x={0} y={-30} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>HARINA DE</text>
            <text x={0} y={8} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>CACAHUATE</text>
            {[[-60, -100, 20], [50, 70, 24], [70, -110, 14], [-50, 80, 16], [10, 50, 10]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r * kprog(T, K.Pa + 1.0 + i * 0.15, K.Pa + 1.4 + i * 0.15)} fill="#a9c23c" stroke="#4f6b1c" strokeWidth={3} />)}
          </g>
          {Array.from({ length: 10 }, (_, i) => { const c = i % 5, f = Math.floor(i / 5); const camina = kprog(T, K.Pa, K.Pa + 2.6, kEase.sale);
            return <Pavito key={i} T={T} x={klerp(1150 + c * 60, 420 + c * 125, camina) + f * 50} y={930 + f * 105} s={0.95} seed={i} cae={kprog(T, K.Pa + 3.0 + i * 0.12, K.Pa + 3.5 + i * 0.12, kEase.suave)} />; })}
        </>)}
      </Escena>
      {/* 12 · lo que sí sirve */}
      <Escena T={T} a={K.Si} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const a = kprog(T, K.Si + 0.6, K.Si + 1.0, kEase.rebote); return a > 0 && <g transform={`translate(200 820) scale(${a})`}>
            <Sol T={T} x={0} y={-90} r={56} />
            <rect x={-150} y={20} width={300} height={70} rx={10} fill="#e0c27a" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={-115 + (i % 5) * 58} cy={42 + Math.floor(i / 5) * 26} rx={13} ry={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
          </g>; })()}
          {(() => { const a = kprog(T, K.Si + 1.8, K.Si + 2.2, kEase.rebote); return a > 0 && <g transform={`translate(540 850) scale(${a})`}><Frasco x={0} y={0} s={0.9} /></g>; })()}
          {(() => { const a = kprog(T, K.Si + 3.2, K.Si + 3.6, kEase.rebote); const cae = kprog(T, K.Si + 3.7, K.Si + 4.4, kEase.suave); return a > 0 && <g>
            <g transform={`translate(870 870) scale(${a * 0.8})`}><Bote x={0} y={0} tapa={kprog(T, K.Si + 4.5, K.Si + 4.8)} /></g>
            {cae < 1 && <Cacahuate x={klerp(640, 860, cae)} y={klerp(700, 760, cae) - Math.sin(cae * Math.PI) * 90} s={0.7} rot={cae * 200} malo={1} />}</g>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma bolsita; el arrugado va al bote */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Mesa cierre />
          <Bolsa x={330} y={860} rot={68} llena={0.6} />
          <g transform="translate(900 1060) scale(0.85)"><Bote x={0} y={0} tapa={kprog(T, K.Ci + 1.5, K.Ci + 1.8)} /></g>
          {vuela < 1 && <Cacahuate x={klerp(ARR[0], 900, vuela)} y={klerp(ARR[1] - 20, 940, vuela) - Math.sin(vuela * Math.PI) * 280} s={1.1 - 0.3 * vuela} rot={vuela * 360} malo={1} />}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.7} until={K.I - 0.3} texto="¿este también?" x={330} y={560} tam={42} borde={KC.red} />
      {['olor', 'sabor', 'color'].map((t, i) => <MitoTachado key={i} T={T} at={K.I + 1.2 + i * 0.35} tacharEn={K.I + 1.7 + i * 0.45} until={K.Mo - 0.3} texto={'sin ' + t} x={200 + i * 340} y={1185} tam={40} />)}
      <Etq T={T} at={K.I + 0.9} until={K.Mo - 0.3} x={1040} y={460} lado="izq" texto="aflatoxinas (no se ven)" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.5} until={MICRO - 0.3} x={40} y={400} texto="Aspergillus flavus" it tam={40} />
      <Etq T={T} at={K.Mo + 0.9} until={MICRO - 0.3} x={40} y={455} texto="moho amarillo verdoso" tam={28} />
      <Etq T={T} at={K.Mo + 1.6} until={MICRO - 0.3} x={790} y={350} texto="esporas" tam={30} color={KC.yellow} />
      <Chip T={T} at={MICRO + 1.6} until={K.Co - 0.3} texto="calor + humedad" x={400} y={480} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Co + 0.4} until={K.P - 0.3} texto="el calor de la cocina no basta" x={540} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.Co + 1.3} until={K.P - 0.3} x={60} y={680} texto="aflatoxinas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.AD + 0.3} until={K.Ca - 0.3} x={60} y={1120} texto="tu ADN" tam={34} color="#9ad7ff" />
      <Etq T={T} at={K.AD + 0.4} until={K.AD + 1.1} x={1040} y={460} lado="izq" texto="aflatoxina B1" tam={32} color={KC.yellow} />
      <Etq T={T} at={K.AD + 1.2} until={K.Ca - 0.3} x={1040} y={460} lado="izq" texto="tu cuerpo la vuelve epóxido" tam={30} color={KC.red} />
      <Etq T={T} at={K.AD + 2.2} until={K.Ca - 0.3} x={600} y={1090} texto="se pega a una G (guanina)" tam={28} color={KC.white} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Ca + 2.3} texto="IARC: la agencia contra el cáncer de la OMS" x={540} y={480} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 0.4} until={K.Es - 0.3} x={1040} y={1160} lado="izq" texto="hígado" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ca + 3.1} until={K.Es - 0.3} texto="cancerígenas para humanos" x={400} y={1120} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Ca + 4.6} until={K.Es - 0.3} x={330} y={640} texto="cáncer de hígado" tam={32} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.3} anio="2004" quien="Kenia · brote por maíz" revista="MMWR (CDC), 2004" y={560} />
      <Chip T={T} at={K.Es + 2.5} until={K.Nu - 0.3} texto="maíz guardado húmedo" x={420} y={500} tam={38} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Nu + 0.4} until={K.Br - 0.3} valor={8000} dur={1.4} etiqueta="hasta" x={380} y={500} tam={230} color={KC.red} />
      <Chip T={T} at={K.Nu + 1.2} until={K.Br - 0.3} texto="partes por mil millones (ppb)" x={380} y={700} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Nu + 2.3} until={K.Br - 0.3} texto="aflatoxina B1 · comida de las casas" x={400} y={800} tam={28} borde={KC.red} />
      <Etq T={T} at={K.Nu + 3.2} until={K.Br - 0.3} x={340} y={1120} texto="límite: 20" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Br + 0.6} until={K.Pa - 0.3} texto="317 enfermos" x={290} y={440} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Br + 3.0} until={K.Pa - 0.3} texto="125 muertos" x={790} y={440} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 0.4} until={K.Si - 0.3} texto="Inglaterra, hacia 1960" x={380} y={480} tam={36} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Pa + 1.6} until={K.Si - 0.3} valor={100000} dur={1.2} etiqueta="pavitos muertos" x={380} y={700} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Si + 0.7} until={K.Ci - 0.3} texto="✓ secar el grano" x={540} y={1000} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.Si + 1.9} until={K.Ci - 0.3} texto="✓ guardarlo seco y fresco" x={540} y={1085} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.Si + 3.3} until={K.Ci - 0.3} texto="✓ tirar lo mohoso, arrugado o descolorido" x={540} y={1170} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="el arrugado, a la basura" x={400} y={560} tam={40} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.I} texto="2 cm" largo={90} />
      <BarraEscala T={T} at={K.I} until={K.Mo} texto="5 mm" largo={135} />
      <BarraEscala T={T} at={K.Mo} until={MICRO} texto="50 µm" largo={190} />
      <BarraEscala T={T} at={MICRO} until={K.Co} texto="50 cm" largo={200} />
      <BarraEscala T={T} at={K.Co} until={K.P} texto="10 cm" largo={190} />
      <BarraEscala T={T} at={K.AD} until={K.Ca} texto="2 nm" largo={180} />
      <BarraEscala T={T} at={K.Ca} until={K.Es} texto="10 cm" largo={340} />
      <BarraEscala T={T} at={K.Es} until={K.Nu} texto="1 m" largo={200} />
      <BarraEscala T={T} at={K.Pa} until={K.Si} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Si} until={K.Ci} texto="10 cm" largo={100} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="2 cm" largo={90} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.I - 0.1} texto="¿El cacahuate *arrugado?*" />
      <Subtitulo T={T} idx={1} at={K.I + 0.1} until={K.Mo - 0.1} texto="Sin olor, sabor *ni color.*" />
      <Subtitulo T={T} idx={2} at={K.Mo + 0.1} until={K.Co - 0.1} texto="Con *calor y humedad.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.P - 0.1} texto="Tostar o freír: *no basta.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.AD - 0.1} texto="¿Y adentro *de ti?*" />
      <Subtitulo T={T} idx={5} at={K.AD + 0.1} until={K.Ca - 0.1} texto="Se pegan *a tu ADN.*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.Es - 0.1} texto="Cancerígenas: *grupo 1.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Nu - 0.1} texto="Kenia, 2004: *maíz húmedo.*" tam={56} />
      <Subtitulo T={T} idx={8} at={K.Nu + 0.1} until={K.Br - 0.1} texto="Hasta *8,000.* Límite: 20." />
      <Subtitulo T={T} idx={9} at={K.Br + 0.1} until={K.Pa - 0.1} texto="317 enfermos, *125 muertos.*" tam={54} />
      <Subtitulo T={T} idx={10} at={K.Pa + 0.1} until={K.Si - 0.1} texto="*100,000 pavitos.*" />
      <Subtitulo T={T} idx={11} at={K.Si + 0.1} until={K.Ci - 0.1} texto="Secar, guardar *y tirar.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El arrugado: *a la basura.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [MICRO + 0.5, K.Co - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.AD + 0.5, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ca + 2.5, K.Es - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Nu + 1.6, K.Br - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pa + 1.0, K.Si - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Si + 0.3, K.Ci - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="18" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AflatoxinasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AflatoxinasShot /></CompositionStage></div>;
}
window.AflatoxinasApp = AflatoxinasApp;
