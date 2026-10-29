// Shot Biotecnológico #15 · Tu detergente trae enzimas de microbios — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (las moléculas no están a escala).
const PROT = '#ff5d8f', ALM = '#ffd43b', GRASA = '#ffb347', ENZ_P = '#b18cff', ENZ_A = '#2fe0a8', ENZ_L = '#ff8a1f';
const GRANO_ENZ = '#e8d6a8';   // granitos de enzima: blanquecinos/beige (los puntitos de color de los detergentes NO son enzimas)

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{children}</svg>;
}
// Mancha irregular (contorno suave con ruido por semilla).
function kBlob(cx, cy, r, seed = 1, n = 10, amp = 0.28) {
  const g = krng(seed), pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (1 - amp / 2 + g() * amp); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; });
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M ${mid(pts[n - 1], pts[0]).join(' ')}`;
  for (let i = 0; i < n; i++) { const p = pts[i], m = mid(p, pts[(i + 1) % n]); d += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + ' Z';
}
// Camisa de botones vista de frente. manchas = { huevo, choco, grasa } de 0 a 1 (0 = limpia).
function Camisa({ T = 0, x, y, s = 1, huevo = 0, choco = 0, grasa = 0, brilla = 0, mece: m = 0 }) {
  const rot = m * Math.sin(T * 1.6) * 3;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <line x1={-520} y1={-352} x2={520} y2={-352} stroke={KC.ink} strokeWidth={8} />
    <path d="M -36 -352 q 36 -60 72 0" fill="none" stroke="#9aa4ae" strokeWidth={10} />
    <path d="M -170 -330 L -360 -262 L -476 -10 L -356 40 L -292 -96 L -292 390 L 292 390 L 292 -96 L 356 40 L 476 -10 L 360 -262 L 170 -330 Q 0 -262 -170 -330 Z" fill="#fbfbf7" stroke={KC.ink} strokeWidth={11} strokeLinejoin="round" />
    <path d="M -292 -96 L -292 390" stroke="#e3e4dc" strokeWidth={30} />
    <path d="M -170 -330 L -36 -196 L -6 -300 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 170 -330 L 36 -196 L 6 -300 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={0} y1={-220} x2={0} y2={388} stroke="#d9dbd2" strokeWidth={6} />
    {[-150, -40, 70, 180, 290].map((by, i) => <circle key={i} cx={14} cy={by} r={10} fill="#e9e6da" stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-236} y={-160} width={130} height={120} rx={10} fill="none" stroke={KC.ink} strokeWidth={6} />
    {/* manchas */}
    {grasa > 0 && <g opacity={grasa}><path d={kBlob(-90, 236, 92, 7, 11, 0.3)} fill="rgba(222,190,90,.35)" stroke="rgba(170,130,40,.55)" strokeWidth={8} /></g>}
    {choco > 0 && <g opacity={choco}><path d={kBlob(150, 110, 78, 3, 10, 0.4)} fill="#6b3e1f" /><circle cx={214} cy={170} r={14} fill="#6b3e1f" /><circle cx={98} cy={196} r={9} fill="#6b3e1f" /></g>}
    {huevo > 0 && <g opacity={huevo}><path d={kBlob(-120, -10, 74, 11, 10, 0.35)} fill="#f2c230" stroke="#d99a1a" strokeWidth={6} /><path d={kBlob(-136, -24, 30, 4, 8, 0.3)} fill="#ffe27a" /></g>}
    {brilla > 0 && [[-200, -200], [210, -120], [-60, 120], [180, 300]].map(([bx, by], i) => { const k = Math.max(0, Math.sin(T * 4 + i * 1.7)) * brilla;
      return <path key={i} d={`M ${bx} ${by - 34 * k} L ${bx + 8} ${by - 8} L ${bx + 34 * k} ${by} L ${bx + 8} ${by + 8} L ${bx} ${by + 34 * k} L ${bx - 8} ${by + 8} L ${bx - 34 * k} ${by} L ${bx - 8} ${by - 8} Z`} fill="#fff" stroke={KC.gold2} strokeWidth={3} />; })}
  </g>;
}
// Caja de detergente en polvo (genérica). inclina en grados.
function CajaPolvo({ x, y, s = 1, inclina = 0, texto = 'DETERGENTE', color = KC.blue, banda = KC.yellow }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <rect x={-150} y={-210} width={300} height={420} rx={18} fill={color} stroke={KC.ink} strokeWidth={10} />
    <path d="M -150 -210 L -110 -260 L 110 -260 L 150 -210 Z" fill="#c9d3ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-150} y={-60} width={300} height={110} fill={banda} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={14} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <circle cx={0} cy={130} r={46} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -22 130 q 22 -36 44 0 q -22 36 -44 0" fill={KC.cyan} />
  </g>;
}
// Polvo: granos blancos con algunos granitos de enzima (beige). Chorro que cae + montón.
function Polvo({ T, x0, y0, x1, y1, f = 1, n = 70, seed = 4, monton = 1, nube = 0 }) {
  const R = krng(seed);
  const granos = Array.from({ length: n }, (_, i) => ({ u: R(), dx: (R() - 0.5) * 60, r: 6 + R() * 7, enz: i % 7 === 0, v: 0.6 + R() * 0.6 }));
  const mont = Array.from({ length: 64 }, (_, i) => { const a = R() * Math.PI, rr = Math.sqrt(R()); return { x: x1 + Math.cos(a) * 190 * rr, y: y1 - Math.sin(a) * 80 * rr * monton, r: 7 + R() * 7, enz: i % 5 === 0 }; });
  const Gr = ({ cx, cy, r, enz }) => <circle cx={cx} cy={cy} r={r} fill={enz ? GRANO_ENZ : '#ffffff'} stroke={enz ? '#a8915c' : '#b9c2cc'} strokeWidth={enz ? 3 : 2} />;
  return <g>
    {monton > 0 && <ellipse cx={x1} cy={y1 + 6} rx={200} ry={30} fill="rgba(0,0,0,.12)" />}
    {mont.map((g2, i) => (i / 64 < monton ? <Gr key={'m' + i} cx={g2.x} cy={g2.y} r={g2.r} enz={g2.enz} /> : null))}
    {f > 0 && granos.map((g2, i) => { const p = ((T * g2.v + g2.u) % 1); return <g key={i} opacity={f}><Gr cx={klerp(x0, x1, p) + g2.dx * p} cy={klerp(y0, y1, p * p)} r={g2.r * 0.8} enz={g2.enz} /></g>; })}
    {nube > 0 && Array.from({ length: 14 }, (_, i) => { const g = krng(i + 40), px = x1 + (g() - 0.5) * 360 + Math.sin(T + i) * 20, py = y1 - 80 - g() * 260 - ((T * 30 + g() * 100) % 120);
      return <circle key={'n' + i} cx={px} cy={py} r={30 + g() * 40} fill="rgba(240,236,224,.55)" opacity={nube} />; })}
  </g>;
}
// Enzima esquemática: "boca" que abre y cierra (sitio activo).
function Enzima({ x, y, s = 1, color = ENZ_P, boca = 0.5, rot = 0 }) {
  const a = (16 + boca * 34) * Math.PI / 180;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a) * 52} ${-Math.sin(a) * 52} A 52 52 0 1 0 ${Math.cos(a) * 52} ${Math.sin(a) * 52} Z`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={-8} cy={-24} r={7} fill="#fff" /><circle cx={-6} cy={-24} r={3.5} fill={KC.ink} />
  </g>;
}
function Hexa({ x, y, r = 22, color = ALM, o = 1 }) {
  const p = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)}`; }).join(' ');
  return <polygon points={p} fill={color} stroke={KC.ink} strokeWidth={4} opacity={o} />;
}
// Fibra de algodón (cinta aplanada y retorcida). Ancho ≈ 150 px = 15 µm (10 px por µm).
function Fibra({ T, y = 1080, ancho = 150 }) {
  const pts = (sig) => Array.from({ length: 23 }, (_, i) => { const x = -40 + i * 54; const w = ancho / 2 * (0.55 + 0.45 * Math.abs(Math.cos(i * 0.55 + 0.4))); return `${x},${(y + sig * w + Math.sin(i * 0.8 + T * 0.4) * 6).toFixed(1)}`; });
  const top = pts(-1), bot = pts(1).reverse();
  return <g>
    <polygon points={[...top, ...bot].join(' ')} fill="#e8eef8" stroke="#9fb0c8" strokeWidth={5} opacity={0.92} />
    {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M ${-30 + i * 54} ${y - 50} q 30 50 0 100`} stroke="#c6d2e4" strokeWidth={4} fill="none" />)}
  </g>;
}
// Lo que hay en la mancha, a escala molecular (esquemático). cortes: tiempos de cada corte de la proteasa; ta/tl: amilasa/lipasa.
const CORTES = [5, 11, 17];
function MicroMancha({ T, K, enzimas = true }) {
  const t0 = K.Pt + 0.6, tc = CORTES.map((_, i) => t0 + 0.4 + i * 1.0);
  const ta = K.Am + 0.5, tl = K.Am + 1.7, lleva = kprog(T, K.Am + 2.6, K.Pr + 0.4, kEase.suave);
  const segDe = (i) => CORTES.filter((c) => i > c).length;
  const libre = (s) => (s === 0 ? kprog(T, tc[0], tc[0] + 1.6, kEase.sale) : kprog(T, tc[s - 1], tc[s - 1] + 1.6, kEase.sale));
  // proteína: cadena de cuentas pegada a la fibra
  const prot = Array.from({ length: 23 }, (_, i) => { const s = segDe(i), p = libre(s), sube = p * 70 + lleva * 420;
    return <circle key={i} cx={130 + i * 36 + (s - 1.5) * 26 * p + Math.sin(T * 2 + s) * 4 * p} cy={960 + Math.sin(i * 0.9) * 22 - sube} r={15} fill={['#ff5d8f', '#ff8fb1', '#e8336d'][i % 3]} stroke={KC.ink} strokeWidth={4} opacity={1 - lleva * 0.8} />; });
  const px = T < tc[0] ? klerp(60, 130 + CORTES[0] * 36 + 18, kprog(T, t0 - 0.2, tc[0])) : T < tc[1] ? klerp(130 + CORTES[0] * 36 + 18, 130 + CORTES[1] * 36 + 18, kprog(T, tc[0] + 0.2, tc[1])) : klerp(130 + CORTES[1] * 36 + 18, 130 + CORTES[2] * 36 + 18, kprog(T, tc[1] + 0.2, tc[2]));
  // almidón: cadena de anillos con una rama
  const pa = kprog(T, ta, ta + 1.2, kEase.sale);
  const alm = Array.from({ length: 9 }, (_, i) => { const lado = i < 5 ? -1 : 1, d = pa * 50 * lado, sube = lleva * 380 + pa * 30;
    return <Hexa key={i} x={150 + i * 44 + d} y={810 - sube + (i % 2) * 12} r={21} o={1 - lleva * 0.8} />; });
  const rama = [0, 1, 2].map((k) => <Hexa key={'r' + k} x={326 + k * 30} y={770 - k * 34 - lleva * 380} r={19} o={1 - lleva * 0.8} />);
  // grasa: una gota que la lipasa parte en gotitas
  const pl = kprog(T, tl, tl + 1.0, kEase.sale);
  const gotas = pl < 1 ? <circle cx={790} cy={830 - lleva * 300} r={74 * (1 - pl * 0.4)} fill={GRASA} stroke={KC.ink} strokeWidth={5} opacity={0.92} /> : null;
  const gotitas = pl > 0 ? [[-50, -30], [40, -50], [60, 30], [-30, 50], [0, 0]].map(([dx, dy], i) => <circle key={i} cx={790 + dx * (0.4 + pl) + Math.sin(T * 3 + i) * 5} cy={830 + dy * (0.4 + pl) - lleva * 420} r={24} fill={GRASA} stroke={KC.ink} strokeWidth={4} opacity={pl * (1 - lleva * 0.8)} />) : null;
  return <g>
    <Fibra T={T} y={1050} />
    {alm}{rama}{gotas}{gotitas}{prot}
    {enzimas && T > t0 - 0.3 && T < tc[2] + 1.5 && <Enzima x={px} y={960 + Math.sin(T * 5) * 6} s={0.9} color={ENZ_P} boca={Math.abs(Math.sin(T * 9))} />}
    {enzimas && T > ta - 0.5 && T < ta + 2.0 && <Enzima x={klerp(60, 344, kprog(T, ta - 0.5, ta))} y={850} s={0.75} color={ENZ_A} boca={Math.abs(Math.sin(T * 9))} />}
    {enzimas && T > tl - 0.5 && T < tl + 2.0 && <Enzima x={klerp(1020, 870, kprog(T, tl - 0.5, tl))} y={860} s={0.75} color={ENZ_L} boca={Math.abs(Math.sin(T * 9))} rot={180} />}
    {lleva > 0 && Array.from({ length: 6 }, (_, i) => <path key={'w' + i} d={`M ${120 + i * 160} ${1000 - ((T * 160 + i * 90) % 500)} q 20 -30 0 -60`} stroke="rgba(127,200,255,.6)" strokeWidth={6} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Lavadora de carga frontal con su ventana.
function Lavadora({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-320} width={520} height={640} rx={36} fill="#f4f6f8" stroke={KC.ink} strokeWidth={11} />
    <rect x={-260} y={-320} width={520} height={120} rx={36} fill="#dfe5ea" stroke={KC.ink} strokeWidth={8} />
    <circle cx={150} cy={-260} r={34} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={150} y1={-260} x2={150 + Math.cos(-1.2) * 26} y2={-260 + Math.sin(-1.2) * 26} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <rect x={-220} y={-282} width={140} height={44} rx={10} fill="#c9d3ff" stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={60} r={190} fill="#9aa4ae" stroke={KC.ink} strokeWidth={10} />
    <circle cx={0} cy={60} r={150} fill="#7fc8ff" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${T * 120} 0 60)`}>
      <path d="M -80 40 q 40 -60 100 -20 q 30 40 -20 70 Z" fill="#fbfbf7" stroke={KC.ink} strokeWidth={5} />
      <path d="M 20 110 q 60 -10 70 40 q -50 30 -80 -10 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
      {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={Math.cos(k * 1.3) * 100} cy={60 + Math.sin(k * 1.3) * 100} r={10} fill="rgba(255,255,255,.8)" />)}
    </g>
    <path d="M -90 -40 A 110 110 0 0 1 40 -70" stroke="rgba(255,255,255,.7)" strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}
function CopoNieve({ x, y, r = 50, rot = 0, color = '#bfe8ff' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} stroke={color} strokeWidth={9} strokeLinecap="round">
    {[0, 60, 120].map((a) => <g key={a} transform={`rotate(${a})`}><line x1={-r} y1={0} x2={r} y2={0} /><line x1={r * 0.6} y1={0} x2={r * 0.85} y2={-r * 0.25} /><line x1={r * 0.6} y1={0} x2={r * 0.85} y2={r * 0.25} /><line x1={-r * 0.6} y1={0} x2={-r * 0.85} y2={-r * 0.25} /><line x1={-r * 0.6} y1={0} x2={-r * 0.85} y2={r * 0.25} /></g>)}
  </g>;
}
// Fábrica de detergente (años sesenta): tolva que suelta polvo fino y un obrero.
function Fabrica({ T, nube = 1, tos = 0 }) {
  const R = krng(9);
  const polvo = Array.from({ length: 40 }, () => [R(), R(), 10 + R() * 30]);
  return <g>
    <rect x={0} y={1180} width={KW} height={300} fill="#8a7f95" />
    <path d="M 120 520 L 520 520 L 420 820 L 220 820 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={260} y={820} width={80} height={120} fill="#7a848e" stroke={KC.ink} strokeWidth={8} />
    <rect x={80} y={1060} width={520} height={130} rx={14} fill="#6f7a84" stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2, 3].map((k) => <circle key={k} cx={130 + ((T * 90 + k * 140) % 560)} cy={1125} r={22} fill="#cfd8e0" stroke={KC.ink} strokeWidth={5} />)}
    {Array.from({ length: 12 }, (_, i) => <circle key={'c' + i} cx={300 + Math.sin(i * 2) * 20} cy={940 + ((T * 140 + i * 13) % 120)} r={7} fill="#f3eedf" />)}
    {polvo.map(([u, v, r], i) => { const px = 160 + u * 760 + Math.sin(T * 0.8 + i) * 30, py = 540 + v * 560 - ((T * 25 + i * 9) % 60);
      return <circle key={i} cx={px} cy={py} r={r} fill="rgba(245,240,226,.55)" opacity={nube} />; })}
    {/* obrero */}
    <g transform={`translate(800 1000) rotate(${tos * Math.sin(T * 14) * 4})`}>
      <rect x={-70} y={-40} width={140} height={230} rx={40} fill="#2346ff" stroke={KC.ink} strokeWidth={9} />
      <circle cx={0} cy={-110} r={70} fill="#f1b48f" stroke={KC.ink} strokeWidth={9} />
      <path d="M -70 -140 Q 0 -210 70 -140 L 70 -128 L -70 -128 Z" fill="#6f7a84" stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={-30} cy={-82} rx={22} ry={tos ? 14 : 6} fill={KC.ink} />
      <path d="M -60 20 Q -120 -30 -60 -90" stroke="#f1b48f" strokeWidth={30} fill="none" strokeLinecap="round" />
      {tos > 0 && [0, 1, 2].map((k) => <path key={k} d={`M ${-110 - k * 30} ${-110 + k * 20} q -20 -10 -40 0`} stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" opacity={tos * Math.max(0, Math.sin(T * 7 + k))} />)}
    </g>
  </g>;
}
function Pulmones({ x, y, s = 1, rojo = 0 }) {
  const c = mixHex('#ff9eb5', '#d7263d', rojo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -120 L 0 -20" stroke="#f4efe4" strokeWidth={22} strokeLinecap="round" />
    <path d="M -14 -30 Q -150 -110 -170 40 Q -180 150 -60 150 Q -20 120 -14 -30 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    <path d="M 14 -30 Q 150 -110 170 40 Q 180 150 60 150 Q 20 120 14 -30 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    {[[-90, 30], [-110, 90], [90, 30], [110, 90], [-60, 80], [60, 80]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={10} fill="#fff" opacity={0.35 + rojo * 0.3} />)}
  </g>;
}
// Granito de enzima por dentro (capas): núcleo con enzima + cubierta.
function GranitoCorte({ T, cx, cy, r }) {
  return <g>
    <circle cx={cx} cy={cy} r={r} fill="#fbf7ee" stroke={KC.ink} strokeWidth={6} />
    <circle cx={cx} cy={cy} r={r * 0.78} fill="#efe6cf" stroke="#b9a676" strokeWidth={4} strokeDasharray="10 8" />
    <circle cx={cx} cy={cy} r={r * 0.55} fill={GRANO_ENZ} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((k) => { const a = k * 1.25 + T * 0.3; return <Enzima key={k} x={cx + Math.cos(a) * r * 0.3} y={cy + Math.sin(a) * r * 0.3} s={0.38} color={[ENZ_P, ENZ_A, ENZ_L][k % 3]} boca={0.4 + 0.3 * Math.sin(T * 4 + k)} rot={a * 57} />; })}
  </g>;
}
// Silueta del cuerpo con estómago, páncreas e intestino.
function CuerpoPancreas({ T, x, y, s = 1, luz = 1, flujo = 0 }) {
  const ruta = (u) => [klerp(40, -20, u), klerp(60, 210, u)];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-470} r={110} fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
    <path d="M -60 -370 L 60 -370 L 70 -330 Q 230 -320 250 -200 L 230 360 Q 0 420 -230 360 L -250 -200 Q -230 -320 -70 -330 Z" fill="#f6c9a8" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -10 -150 Q 150 -190 150 -80 Q 140 10 30 -10 Q -40 -30 -10 -150 Z" fill="#ff9eb5" stroke={KC.ink} strokeWidth={6} />
    <path d={`M -150 40 Q -40 -10 60 30 Q 130 50 150 20`} stroke={mixHex('#e0a050', '#ffd43b', luz)} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d={`M -150 40 Q -40 -10 60 30 Q 130 50 150 20`} stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="2 14" opacity={0.4} />
    {luz > 0 && <circle cx={0} cy={30} r={120 + Math.sin(T * 5) * 10} fill="rgba(255,225,26,.18)" />}
    <path d="M -140 120 q 70 -50 140 0 t 140 0 M -140 200 q 70 -50 140 0 t 140 0 M -140 280 q 70 -50 140 0 t 140 0" stroke="#e8b0a0" strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M -140 120 q 70 -50 140 0 t 140 0 M -140 200 q 70 -50 140 0 t 140 0 M -140 280 q 70 -50 140 0 t 140 0" stroke={KC.ink} strokeWidth={4} fill="none" opacity={0.5} />
    {flujo > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.45 + k / 3) % 1); const [ex, ey] = ruta(u); return <Enzima key={k} x={ex + (k - 1) * 60} y={ey} s={0.55} color={[ENZ_P, ENZ_A, ENZ_L][k]} boca={Math.abs(Math.sin(T * 8 + k))} rot={90} />; })}
  </g>;
}
// Bacilo con enzimas que salen al medio.
function BacilosEnzimas({ T, at, x = 540, y = 900 }) {
  const salen = Array.from({ length: 9 }, (_, i) => { const t0 = at + 0.4 + i * 0.35, p = kprog(T, t0, t0 + 2.4, kEase.sale), a = -2.6 + i * 0.6;
    return p > 0 ? <Enzima key={i} x={x + Math.cos(a) * (60 + p * 330)} y={y + Math.sin(a) * (40 + p * 300)} s={0.5} color={[ENZ_P, ENZ_A][i % 2]} boca={Math.abs(Math.sin(T * 7 + i))} rot={a * 57} /> : null; });
  return <g>
    {salen}
    {[-1, 0, 1].map((k) => <Bacteria key={k} T={T} x={x + k * 300} y={y + k * 10} largo={290} ancho={110} rot={k * 4} color="#7fd88a" flagelo={false} seed={k + 3} />)}
  </g>;
}

function Detergente() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Mancha, Ja: CUES.Jabon, Mi: CUES.Microscopio, Pt: CUES.Proteasa, Am: CUES.Amilasa, Pr: CUES.Pregunta, Fr: CUES.Frio,
    Ta: CUES.Tanque, Bi: CUES.Biotex, Es: CUES.Estudio, Gr: CUES.Granitos, Pa: CUES.Pancreas, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const vierte = kprog(T, K.G, K.G + 0.3, kEase.sale);
  const huevo = kprog(T, K.Ma + 0.2, K.Ma + 0.6), choco = kprog(T, K.Ma + 0.9, K.Ma + 1.3), grasa = kprog(T, K.Ma + 1.6, K.Ma + 2.0);
  const talla = kprog(T, K.Ja + 0.3, K.Ja + 2.6);
  const termo = klerp(60, 12, kprog(T, K.Pr + 0.3, K.Pr + 2.2, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el polvo cae desde el cuadro 0 */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Polvo T={T} x0={350} y0={640} x1={460} y1={1080} f={vierte} monton={klerp(0.35, 1, kprog(T, K.G, K.G + 3.5))} />
          <CajaPolvo x={250} y={520} s={0.9} inclina={klerp(30, 118, vierte)} />
          {/* lupita en un granito de enzima */}
          <circle cx={560} cy={1040} r={46 + Math.sin(T * 6) * 4} fill="none" stroke={KC.ink} strokeWidth={7} opacity={kprog(T, K.G + 1.0, K.G + 1.4)} />
        </SvgCapa>
      </Escena>
      {/* 1–3 · la camisa manchada, el jabón y la lupa */}
      <Escena T={T} a={K.Ma} b={K.Pt} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Camisa T={T} x={540} y={900} s={0.95} huevo={huevo} choco={choco * (1 - talla * 0.55)} grasa={grasa * (1 - talla * 0.6)} />
          {T > K.Ja && Array.from({ length: 26 }, (_, i) => { const g = krng(i + 70), bx = 330 + g() * 440, by = 1180 - ((T - K.Ja) * (90 + g() * 80) + g() * 500) % 700, r = 14 + g() * 26;
            return <circle key={i} cx={bx + Math.sin(T * 2 + i) * 12} cy={by} r={r} fill="rgba(255,255,255,.55)" stroke="#7fc8ff" strokeWidth={4} opacity={1 - kprog(T, K.Mi, K.Mi + 0.6)} />; })}
        </SvgCapa>
        <Escala T={T} pxPorMm={1.7} z={1} x={60} y={1430} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Mi + 0.1} until={K.Pt - 0.2} x={540} y={700} r={340} fx={540 - 114} fy={900 - 10} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · LA MANCHA"
        interior={(t) => <svg width={680} height={680} viewBox="100 600 880 880" style={{ position:'absolute', left:0, top:0 }}><rect x={0} y={0} width={KW} height={KH} fill="#0d1424" /><MicroMancha T={t} K={K} enzimas={false} /></svg>} />
      {/* 4–5 · al microscopio: las enzimas cortan */}
      <Escena T={T} a={K.Pt} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(127,200,255,.25)" />
        <SvgCapa><MicroMancha T={T} K={K} /></SvgCapa>
        <Escala T={T} pxPorMm={10000} z={1} objetivo={100} x={60} y={1430} />
      </Escena>
      {/* 6 · pregunta: agua fría */}
      <Escena T={T} a={K.Pr} b={K.Fr} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Lavadora T={T} x={500} y={960} s={1} />
          <CopoNieve x={500} y={1020} r={60 * kprog(T, K.Pr + 1.6, K.Pr + 2.2, kEase.rebote)} rot={T * 30} color="#ffffff" />
        </SvgCapa>
        <Termometro x={900} y={560} alto={480} valor={termo} max={60} marcas={[0, 20, 40, 60]} color={termo > 30 ? KC.red : KC.cyan} />
      </Escena>
      {/* 7 · bacterias que sueltan enzimas */}
      <Escena T={T} a={K.Fr} b={K.Ta} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <BacilosEnzimas T={T} at={K.Fr} x={540} y={960} />
          <CopoNieve x={180} y={1560} r={46} rot={T * 20} />
          <CopoNieve x={900} y={1580} r={36} rot={-T * 25} />
        </SvgCapa>
      </Escena>
      {/* 8 · tanque de fermentación */}
      <Escena T={T} a={K.Ta} b={K.Bi} zoom={0.04}>
        <MundoBiorreactor T={T} turbio={0.7} burbujas={1} fondo={KC.cyan} etiquetaTanque="tanque de fermentación" />
      </Escena>
      <Lupa T={T} at={K.Ta + 0.8} until={K.Bi - 0.3} x={300} y={700} r={190} fx={540} fy={1010} tinte={KC.mint} etiqueta="AL MICROSCOPIO · EL CALDO"
        interior={(t) => <svg width={380} height={380} viewBox="160 620 760 760" style={{ position:'absolute', left:0, top:0 }}><rect x={0} y={0} width={KW} height={KH} fill="#2a2210" /><BacilosEnzimas T={t} at={K.Ta + 0.6} x={540} y={1000} /></svg>} />
      {/* 9 · 1963 */}
      <Escena T={T} a={K.Bi} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <CajaPolvo x={300} y={960} s={1.0} inclina={-6 + Math.sin(T * 1.5) * 2} texto="REMOJO" color={KC.teal} banda={KC.paper} />
          <path d="M 560 900 L 980 900 L 940 1100 L 600 1100 Z" fill="#cfd8e0" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          <path d={`M 575 940 Q 770 ${920 + Math.sin(T * 3) * 10} 965 940 L 948 1080 L 594 1080 Z`} fill="#7fc8ff" opacity={0.85} />
          <path d={`M 640 960 q 60 -40 120 0 q 60 40 120 0`} stroke="#fbfbf7" strokeWidth={30} fill="none" strokeLinecap="round" />
        </SvgCapa>
      </Escena>
      {/* 10 · 1969: el polvo de enzima en la fábrica */}
      <Escena T={T} a={K.Es} b={K.Gr} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><Fabrica T={T} nube={1} tos={kprog(T, K.Es + 2.2, K.Es + 2.6)} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Es + 3.0} until={K.Gr - 0.3} x={820} y={1560} r={150} fx={780} fy={1050} tinte={KC.red} etiqueta="POR DENTRO · PULMONES"
        interior={(t) => <svg width={300} height={300} viewBox="-200 -200 400 400" style={{ position:'absolute', left:0, top:0 }}><rect x={-200} y={-200} width={400} height={400} fill="#2b0f1a" /><Pulmones x={0} y={-10} s={0.95} rojo={kprog(t, K.Es + 3.4, K.Es + 5.0)} /></svg>} />
      {/* 11 · granitos que casi no sueltan polvo */}
      <Escena T={T} a={K.Gr} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Polvo T={T} x0={300} y0={1100} x1={300} y1={1560} f={0} monton={1} seed={6} /></SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Gr + 0.4} until={K.Pa - 0.3} x={540} y={800} r={230} fx={300 + 30} fy={1500} tinte={KC.gold} etiqueta="AL MICROSCOPIO · UN GRANITO"
        interior={(t, r) => <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}><rect width={2 * r} height={2 * r} fill="#1d2a24" /><GranitoCorte T={t} cx={r} cy={r} r={r * 0.78} /></svg>} />
      {/* 12 · tu páncreas */}
      <Escena T={T} a={K.Pa} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><CuerpoPancreas T={T} x={290} y={930} s={0.95} luz={kprog(T, K.Pa + 0.3, K.Pa + 0.9)} flujo={kprog(T, K.Pa + 0.9, K.Pa + 1.3)} /></SvgCapa>
      </Escena>
      {/* 13 · cierre: la misma camisa, limpia */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Camisa T={T} x={540} y={880} s={0.95} brilla={kprog(T, K.Ci + 0.4, K.Ci + 1.0)} mece={1} />
          <Polvo T={T} x0={0} y0={0} x1={190} y1={1600} f={0} monton={0.8} seed={8} />
        </SvgCapa>
        <Escala T={T} pxPorMm={1.7} z={1} x={820} y={1650} color={KC.ink} />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.Ma - 0.3} texto="enzimas de microbios" y={1500} tam={44} borde={KC.mint} />
      <Etiqueta T={T} at={K.G + 1.4} until={K.Ma - 0.3} x={610} y={1010} texto="granito de enzima" color={KC.ink} tam={32} />
      <Etiqueta T={T} at={K.Ma + 0.3} until={K.Mi - 0.2} x={300} y={890} texto="huevo" lado="izq" color={KC.ink} tam={34} />
      <Etiqueta T={T} at={K.Ma + 1.0} until={K.Mi - 0.2} x={780} y={1000} texto="chocolate" color={KC.ink} tam={34} />
      <Etiqueta T={T} at={K.Ma + 1.7} until={K.Mi - 0.2} x={330} y={1130} texto="grasa" lado="izq" color={KC.ink} tam={34} />
      <MitoTachado T={T} at={K.Ja + 0.3} tacharEn={K.Ja + 2.0} until={K.Mi - 0.2} texto="solo jabón" x={380} y={470} tam={44} />
      <Chip T={T} at={K.Mi + 0.8} until={K.Pt - 0.3} texto="proteína · almidón · grasa" y={1500} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Pt + 0.2} until={K.Pr - 0.3} texto="esquemático · no a escala" x={330} y={420} tam={28} borde="#9aa3b5" mono />
      <Etiqueta T={T} at={K.Pt + 0.3} until={K.Pr - 0.3} x={1040} y={1140} texto="fibra de algodón" lado="izq" tam={30} color="#cfe0f5" />
      <Etiqueta T={T} at={K.Pt + 0.5} until={K.Am - 0.2} x={60} y={1010} texto="proteasa" tam={34} color={ENZ_P} />
      <Etiqueta T={T} at={K.Am + 0.3} until={K.Pr - 0.3} x={60} y={700} texto="amilasa → almidón" tam={32} color={ENZ_A} />
      <Etiqueta T={T} at={K.Am + 1.5} until={K.Pr - 0.3} x={1040} y={980} texto="lipasa → grasa" lado="izq" tam={32} color={ENZ_L} />
      <Chip T={T} at={K.Pr + 2.3} until={K.Fr - 0.3} texto="¿agua fría?" y={1500} tam={52} borde="#bfe8ff" />
      <Etiqueta T={T} at={K.Fr + 0.4} until={K.Ta - 0.3} x={150} y={830} texto="Bacillus" it tam={40} color="#7fd88a" />
      <Chip T={T} at={K.Fr + 1.6} until={K.Ta - 0.3} texto="mejoradas para el agua fría" y={1500} tam={40} borde="#bfe8ff" />
      <Chip T={T} at={K.Fr + 0.3} until={K.Ta - 0.3} texto="esquemático · no a escala" x={330} y={420} tam={28} borde="#9aa3b5" mono />
      <Chip T={T} at={K.Ta + 1.6} until={K.Bi - 0.3} texto="las bacterias sueltan la enzima al caldo" y={1500} tam={32} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.Bi + 0.2} until={K.Es - 0.3} anio="1963" quien="Bio-tex · Alcalase" revista="proteasa de bacteria en un polvo para remojar" x={560} y={620} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.8} anio="1969" quien="Inglaterra · The Lancet" revista="obreros de fábrica · polvo de enzima" x={620} y={430} />
      <Chip T={T} at={K.Es + 3.2} until={K.Gr - 0.3} texto="polvo de enzima → enfermedad pulmonar" x={540} y={470} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Gr + 0.9} until={K.Pa - 0.3} texto="casi no sueltan polvo" y={440} tam={44} borde={KC.gold} />
      <Etiqueta T={T} at={K.Gr + 1.4} until={K.Pa - 0.3} x={780} y={660} texto="cubierta" tam={32} color={KC.ink} />
      <Etiqueta T={T} at={K.Gr + 1.8} until={K.Pa - 0.3} x={780} y={860} texto="enzima" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Pa + 0.5} until={K.Ci - 0.3} texto="páncreas: corta proteína, almidón y grasa" y={1500} tam={32} borde={KC.yellow} />
      <Etiqueta T={T} at={K.Pa + 0.4} until={K.Ci - 0.3} x={20} y={790} texto="páncreas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="enzimas de microbios" y={1500} tam={44} borde={KC.mint} />
      <Etiqueta T={T} at={K.Ci + 1.4} until={K.Ou} x={400} y={1560} texto="granitos de enzima" tam={30} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No es solo jabón: *trae enzimas.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.Ja - 0.1} texto="Huevo, chocolate *y grasa.*" />
      <Subtitulo T={T} idx={2} at={K.Ja + 0.1} until={K.Mi - 0.1} texto="Hay manchas que *se agarran.*" />
      <Subtitulo T={T} idx={3} at={K.Mi + 0.1} until={K.Pt - 0.1} texto="Proteína, almidón *y grasa.*" />
      <Subtitulo T={T} idx={4} at={K.Pt + 0.1} until={K.Am - 0.1} texto="La proteasa *corta la proteína.*" />
      <Subtitulo T={T} idx={5} at={K.Am + 0.1} until={K.Pr - 0.1} texto="Amilasa, lipasa… *y el agua se lo lleva.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Fr - 0.1} texto="¿Y en *agua fría?*" />
      <Subtitulo T={T} idx={7} at={K.Fr + 0.1} until={K.Ta - 0.1} texto="Enzimas *de bacterias.*" />
      <Subtitulo T={T} idx={8} at={K.Ta + 0.1} until={K.Bi - 0.1} texto="Crecen en *tanques de fermentación.*" />
      <Subtitulo T={T} idx={9} at={K.Bi + 0.1} until={K.Es - 0.1} texto="1963: *una proteasa de bacteria.*" />
      <Subtitulo T={T} idx={10} at={K.Es + 0.1} until={K.Gr - 0.1} texto="1969: *el polvo los enfermaba.*" />
      <Subtitulo T={T} idx={11} at={K.Gr + 0.1} until={K.Pa - 0.1} texto="Granitos que *casi no sueltan polvo.*" />
      <Subtitulo T={T} idx={12} at={K.Pa + 0.1} until={K.Ci - 0.1} texto="Tu páncreas *hace lo mismo.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La lavan *enzimas de microbios.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Mancha - 0.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Jabon + 0.3, CUES.Microscopio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Proteasa + 0.6, CUES.Amilasa - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Frio - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Frio + 0.6, CUES.Tanque - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Estudio + 0.5, CUES.Estudio + 4.4, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Granitos + 0.4, CUES.Pancreas - 0.4, 'avatar_02_apuntando_camara', 'bajo-der'],
        [CUES.Pancreas + 0.1, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'grande'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.2, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DetergenteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Detergente /></CompositionStage></div>;
}
window.DetergenteApp = DetergenteApp;
