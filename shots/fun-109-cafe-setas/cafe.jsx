// Shot Fungi Mati #109 · Tu café usado puede dar setas — NARRADO (gancho 1 "Esto no es X: es Y" · N5 El experimento + N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CF = { poso:'#3b2416', poso2:'#5a3a22', poso3:'#24160d', paja:'#e9c45a', paja2:'#c99a2e', olivo:'#7a8a3a', olivo2:'#5d6b2a',
  pulpa:'#b8322a', pulpa2:'#5a2a1a', seta:'#d8cfbf', setaOsc:'#a99c86', papel:'#f1e2c0', madera:'#c98a4a', madera2:'#8a5a2b' };
const OSTRA = { color: CF.seta, oscuro: CF.setaOsc };

// Taza de café de lado (base sobre el plato en x, y). lleno: café visible en el borde. vapor 0..1.
function Taza({ T, x, y, s = 1, vapor = 1, lleno = 0, banda = KC.pink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={8} rx={160} ry={28} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <path d="M 100 -150 Q 178 -150 168 -95 Q 158 -48 92 -52" fill="none" stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
    <path d="M 100 -150 Q 178 -150 168 -95 Q 158 -48 92 -52" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" />
    <path d="M -112 -175 L 112 -175 Q 106 -12 62 0 L -62 0 Q -106 -12 -112 -175 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -109 -120 L 109 -120 L 104 -86 L -104 -86 Z" fill={banda} opacity=".9" />
    <path d="M -80 -160 Q -84 -60 -50 -14" stroke="#e8e2d6" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={-175} rx={112} ry={22} fill={lleno ? '#5a3a22' : '#ece6da'} stroke={KC.ink} strokeWidth={7} />
    {vapor > 0 && [-45, 0, 45].map((dx, i) => { const f = (T * 0.8 + i * 0.33) % 1;
      return <path key={i} d={`M ${dx} -200 Q ${dx + 22} -235 ${dx} -270 Q ${dx - 22} -305 ${dx} -340`} transform={`translate(0 ${-f * 40})`} fill="none" stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={vapor * 0.75 * Math.sin(Math.PI * f)} />; })}
  </g>;
}
// Filtro de papel (cono) con posos. Gira alrededor de su centro para vaciarse.
function Filtro({ x, y, s = 1, rot = 0, lleno = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -120 -120 L 120 -120 L 34 80 L -34 80 Z" fill={CF.papel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-60, 0, 60].map((d) => <line key={d} x1={d} y1={-116} x2={d * 0.3} y2={76} stroke="#d9c49a" strokeWidth={4} />)}
    {lleno > 0 && <path d={`M ${-112 * lleno} -112 Q 0 ${-150 * lleno} ${112 * lleno} -112 L ${70 * lleno} -30 L ${-70 * lleno} -30 Z`} fill={CF.poso} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}
// Montón de posos (base en x, y). p 0..1 = cuánto ha caído. paja 0..1 = mezclado con paja.
function Monton({ x, y, s = 1, p = 1, paja = 0, seed = 4 }) {
  if (p <= 0) return null;
  const w = 250 * (0.4 + 0.6 * p), h = 190 * p, g = krng(seed);
  const granos = Array.from({ length: 70 }, () => ({ u: g() * 2 - 1, v: g(), r: 3 + g() * 5, c: g() < 0.5 ? CF.poso2 : CF.poso3 }));
  const tallos = Array.from({ length: 16 }, () => ({ u: g() * 1.6 - 0.8, v: 0.15 + g() * 0.6, a: g() * 180, l: 50 + g() * 60 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={w + 20} ry={22} fill="rgba(0,0,0,.18)" />
    <path d={`M ${-w} 0 Q ${-w * 0.55} ${-h * 1.25} 0 ${-h} Q ${w * 0.55} ${-h * 1.25} ${w} 0 Z`} fill={CF.poso} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {granos.map((q, i) => { const xx = q.u * w * 0.85, top = -h * (1 - (xx / w) * (xx / w)) * 0.95; const yy = top * q.v;
      return <circle key={i} cx={xx} cy={yy - 4} r={q.r} fill={q.c} />; })}
    {paja > 0 && tallos.map((t, i) => { const xx = t.u * w, yy = -h * (1 - (xx / w) * (xx / w)) * t.v * 0.9;
      return <rect key={i} x={xx - t.l / 2} y={yy - 4} width={t.l * paja} height={9} rx={4} fill={CF.paja} stroke={CF.paja2} strokeWidth={2} transform={`rotate(${t.a} ${xx} ${yy})`} />; })}
  </g>;
}
// Bolsa de cultivo con sustrato. Modo mezcla: frac = fracción de posos (granos oscuros) y el resto aserrín/paja.
// Modo capas: capas = [{ c, c2 }] de abajo hacia arriba, en partes iguales.
function BolsaMix({ T = 0, x, y, w = 360, h = 520, frac = 1, capas, seed = 7, col = 0 }) {
  const g = krng(seed), top = -h * 0.42, alto = h * 0.92;
  const granos = Array.from({ length: 150 }, () => ({ x: (g() - 0.5) * w * 0.86, y: top + 8 + g() * (alto - 16), r: 7 + g() * 10, a: g() * 180, u: g(), k: g() }));
  const color = (q) => { if (capas) { const i = Math.min(capas.length - 1, Math.floor((1 - (q.y - top) / alto) * capas.length)); return q.k < 0.5 ? capas[i].c : capas[i].c2; }
    return q.u < frac ? (q.k < 0.5 ? CF.poso : CF.poso3) : (q.k < 0.5 ? '#d8b47a' : '#c49a5a'); };
  return <g transform={`translate(${x} ${y}) rotate(${mece(T, seed, 0.1) * 1.2})`}>
    <path d={`M ${-w / 2} ${top} Q ${-w / 2 - 10} ${h * 0.45} ${-w * 0.42} ${h / 2} L ${w * 0.42} ${h / 2} Q ${w / 2 + 10} ${h * 0.45} ${w / 2} ${top} Z`} fill={capas ? capas[0].c2 : mixHex('#c49a5a', CF.poso, frac)} />
    {granos.map((q, i) => <rect key={i} x={q.x - q.r} y={q.y - q.r * 0.45} width={q.r * 2} height={q.r * 0.9} rx={3} transform={`rotate(${q.a} ${q.x} ${q.y})`} fill={color(q)} />)}
    {col > 0 && granos.slice(0, 50).map((q, i) => (i / 50) < col ? <circle key={'m' + i} cx={q.x} cy={q.y} r={14 + q.k * 20} fill="#fbf7ee" opacity={0.7} /> : null)}
    <path d={`M ${-w / 2 - 6} ${-h / 2} L ${w / 2 + 6} ${-h / 2} Q ${w / 2 + 22} ${h * 0.45} ${w * 0.44} ${h / 2 + 6} L ${-w * 0.44} ${h / 2 + 6} Q ${-w / 2 - 22} ${h * 0.45} ${-w / 2 - 6} ${-h / 2} Z`} fill="rgba(230,245,255,.22)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w * 0.36} ${-h * 0.38} L ${-w * 0.3} ${h * 0.36}`} stroke="#fff" strokeWidth={12} strokeLinecap="round" opacity=".35" />
    <rect x={-w * 0.2} y={-h / 2 - 50} width={w * 0.4} height={56} rx={14} fill="rgba(230,245,255,.4)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Racimo de Pleurotus gris-crema que sale de (x, y).
function Setas({ T, x, y, s = 1, abre = 1, n = 7, seed = 3, gris = 0 }) {
  if (abre <= 0) return null;
  const c = mixHex(CF.seta, '#8c8a86', gris), o = mixHex(CF.setaOsc, '#6c6a66', gris);
  return <RacimoOstra T={T} x={x} y={y} s={s} abre={abre} n={n} seed={seed} color={c} oscuro={o} />;
}
// Balanza de platos. ang > 0: baja el plato derecho. izq/der: contenido (se dibuja sobre cada plato, base en 0,0).
function Balanza({ x, y, L = 160, ang = 0, izq, der, tIzq, tDer }) {
  const a = ang * Math.PI / 180, pl = [-1, 1].map((k) => [x + k * L * Math.cos(a), y + k * L * Math.sin(a)]);
  return <g>
    <rect x={x - 14} y={y} width={28} height={250} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
    <rect x={x - 90} y={y + 240} width={180} height={30} rx={10} fill="#5a5f6b" stroke={KC.ink} strokeWidth={6} />
    <line x1={pl[0][0]} y1={pl[0][1]} x2={pl[1][0]} y2={pl[1][1]} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <line x1={pl[0][0]} y1={pl[0][1]} x2={pl[1][0]} y2={pl[1][1]} stroke="#c9ccd2" strokeWidth={8} strokeLinecap="round" />
    <circle cx={x} cy={y} r={16} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    {pl.map(([px, py], k) => <g key={k}>
      <line x1={px} y1={py} x2={px - 60} y2={py + 110} stroke={KC.ink} strokeWidth={4} /><line x1={px} y1={py} x2={px + 60} y2={py + 110} stroke={KC.ink} strokeWidth={4} />
      <path d={`M ${px - 80} ${py + 110} Q ${px} ${py + 150} ${px + 80} ${py + 110} Z`} fill="#c9ccd2" stroke={KC.ink} strokeWidth={6} />
      <g transform={`translate(${px} ${py + 110})`}>{k ? der : izq}</g>
      <text x={px} y={py + 182} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{k ? tDer : tIzq}</text>
    </g>)}
  </g>;
}
// Costal (base en x, y).
function Costal({ x, y, s = 1, color = '#d9c08a', texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 Q -84 -90 -56 -150 L -30 -168 Q 0 -150 30 -168 L 56 -150 Q 84 -90 70 0 Z" fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -34 -160 Q 0 -140 34 -160" stroke={KC.ink} strokeWidth={6} fill="none" />
    {[-40, 0, 40].map((d) => <line key={d} x1={d} y1={-130} x2={d * 1.1} y2={-10} stroke="rgba(0,0,0,.15)" strokeWidth={4} />)}
    {texto && <text x={0} y={-60} textAnchor="middle" style={{ font:`400 30px ${KF.titulo}` }} fill={CF.pulpa2}>{texto}</text>}
  </g>;
}
// Caja de setas (base en x, y).
function Caja({ x, y, s = 1, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(p)})`}>
    {[-40, 0, 40].map((d, i) => <ellipse key={i} cx={d} cy={-62} rx={30} ry={16} fill={CF.seta} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-60} y={-60} width={120} height={60} rx={6} fill={CF.madera} stroke={KC.ink} strokeWidth={5} />
    <line x1={-60} y1={-30} x2={60} y2={-30} stroke={CF.madera2} strokeWidth={5} />
  </g>;
}
// Taza de espresso chiquita.
function Espresso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={110} ry={20} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <path d="M 70 -90 Q 120 -90 112 -55 Q 104 -26 62 -30" fill="none" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <path d="M -76 -110 L 76 -110 Q 70 -8 40 0 L -40 0 Q -70 -8 -76 -110 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-110} rx={76} ry={16} fill="#c98a4a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-10} cy={-112} rx={40} ry={7} fill="#e2b25a" opacity=".8" />
  </g>;
}
// Cereza de café partida: cáscara roja, pulpa y dos granos.
function Cereza({ x, y, r = 170, p = 1, rot = 0 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${kEase.rebote(p)})`}>
    <ellipse rx={r} ry={r * 0.92} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={r * 0.86} ry={r * 0.79} fill="#f2a07a" />
    {[-1, 1].map((k) => <g key={k} transform={`translate(${k * r * 0.3} 0)`}>
      <ellipse rx={r * 0.27} ry={r * 0.56} fill="#f4ecd0" stroke={KC.ink} strokeWidth={5} />
      <ellipse rx={r * 0.22} ry={r * 0.5} fill="#cfc79a" stroke="#8a7a4a" strokeWidth={3} />
      <path d={`M ${-k * r * 0.06} ${-r * 0.4} Q ${k * r * 0.06} 0 ${-k * r * 0.06} ${r * 0.4}`} stroke="#7a6a3a" strokeWidth={5} fill="none" />
    </g>)}
    <path d={`M ${-r * 0.5} ${-r * 0.62} Q 0 ${-r * 0.82} ${r * 0.5} ${-r * 0.62}`} stroke="#fff" strokeWidth={10} fill="none" opacity=".4" strokeLinecap="round" />
  </g>;
}
// Granito de café (pedazo irregular, visto al microscopio).
function Granito({ x, y, r, seed = 1, rot = 0 }) {
  const g = krng(seed), n = 9, pts = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, k = 0.7 + g() * 0.35; return [Math.cos(a) * r * k, Math.sin(a) * r * k]; });
  const d = 'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={d} fill="#4a2c18" stroke="#1b0f08" strokeWidth={6} strokeLinejoin="round" />
    <path d={d} fill="none" stroke="#7a4a2a" strokeWidth={3} transform="scale(.7)" />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={(g() - 0.5) * r} cy={(g() - 0.5) * r} r={4 + g() * 8} fill="#2a180c" opacity=".7" />)}
  </g>;
}
// Cafeína → xantina (esquema): anillo de 6 + anillo de 5; quita = cuántos metilos (0..3) ya se fueron, con su avance.
function Cafeina({ T, x, y, s = 1, q = [0, 0, 0] }) {
  const C5 = [60.6, -35], C6 = [0, -70], N1 = [-60.6, -35], C2 = [-60.6, 35], N3 = [0, 70], C4 = [60.6, 35], N7 = [127, -57], C8 = [168, 0], N9 = [127, 57];
  const anillo = [C5, C6, N1, C2, N3, C4], cinco = [C5, N7, C8, N9, C4];
  const d = (p) => 'M ' + p.map((z) => z.join(' ')).join(' L ') + ' Z';
  const metilos = [[N1, [-120, -70]], [N3, [0, 140]], [N7, [152, -122]]];
  const atomo = (p, t, c) => <g><circle cx={p[0]} cy={p[1]} r={22} fill={c} stroke={KC.ink} strokeWidth={4} /><text x={p[0]} y={p[1] + 9} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#fff">{t}</text></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d(anillo)} fill="rgba(47,224,168,.10)" stroke={KC.mint} strokeWidth={8} strokeLinejoin="round" />
    <path d={d(cinco)} fill="rgba(47,224,168,.10)" stroke={KC.mint} strokeWidth={8} strokeLinejoin="round" />
    <line x1={C6[0]} y1={C6[1]} x2={0} y2={-128} stroke={KC.mint} strokeWidth={7} /><line x1={C2[0]} y1={C2[1]} x2={-112} y2={66} stroke={KC.mint} strokeWidth={7} />
    {atomo([0, -128], 'O', KC.red)}{atomo([-112, 66], 'O', KC.red)}
    {metilos.map(([n, m], i) => { const u = q[i], out = kEase.sale(u), mx = klerp(m[0], m[0] + (m[0] - n[0]) * 2.2, out), my = klerp(m[1], m[1] + (m[1] - n[1]) * 2.2, out);
      return <g key={i}>
        {u < 1 && <line x1={n[0]} y1={n[1]} x2={klerp(m[0], n[0], out)} y2={klerp(m[1], n[1], out)} stroke={KC.mint} strokeWidth={7} opacity={1 - out} />}
        {u < 1 && <g opacity={1 - out}><circle cx={mx} cy={my} r={32} fill="#8a8f9a" stroke={KC.ink} strokeWidth={4} /><text x={mx} y={my + 8} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#fff">CH₃</text></g>}
        {u > 0.5 && <g opacity={kprog(u, 0.5, 1)}><line x1={n[0]} y1={n[1]} x2={klerp(n[0], m[0], 0.55)} y2={klerp(n[1], m[1], 0.55)} stroke={KC.mint} strokeWidth={6} />
          <circle cx={klerp(n[0], m[0], 0.55)} cy={klerp(n[1], m[1], 0.55)} r={15} fill="#fff" stroke={KC.ink} strokeWidth={3} />
          <text x={klerp(n[0], m[0], 0.55)} y={klerp(n[1], m[1], 0.55) + 7} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>H</text></g>}
      </g>; })}
    {[N1, N3, N7, N9].map((p, i) => <g key={i}>{atomo(p, 'N', KC.blue)}</g>)}
  </g>;
}
// Globo terráqueo esquemático.
function Globo({ T, x, y, r = 230 }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="glc"><circle r={r} /></clipPath></defs>
    <circle r={r} fill="#2f7fe0" stroke={KC.ink} strokeWidth={8} />
    <g clipPath="url(#glc)" transform={`translate(${((T * 20) % 200) - 100} 0)`}>
      {[[-180, -80, 120, 70], [-60, 60, 90, 120], [90, -60, 140, 80], [150, 90, 70, 60], [-300, 40, 90, 110], [300, -40, 120, 90]].map(([a, b, c, d], i) =>
        <ellipse key={i} cx={a} cy={b} rx={c} ry={d} fill="#4fc35a" stroke="#2a7a34" strokeWidth={5} transform={`rotate(${i * 23} ${a} ${b})`} />)}
    </g>
    <path d={`M ${-r * 0.6} ${-r * 0.6} A ${r} ${r} 0 0 1 ${r * 0.2} ${-r * 0.92}`} stroke="#fff" strokeWidth={14} fill="none" opacity=".4" strokeLinecap="round" />
  </g>;
}
// Sol con rayos que giran.
function Sol({ T, x, y, r = 70 }) {
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${T * 20})`}>{Array.from({ length: 10 }, (_, i) => <rect key={i} x={r + 14} y={-7} width={42} height={14} rx={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 36})`} />)}</g>
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Maceta de barro con bolsa negra y posos (el intento de Robert).
function Maceta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -260 L 150 -260 L 110 0 L -110 0 Z" fill="#d0703a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-172} y={-300} width={344} height={56} rx={10} fill="#e0824a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -160 -300 Q -170 -340 -120 -330 Q -60 -350 0 -334 Q 60 -352 120 -332 Q 172 -340 160 -300 Z" fill="#1b1b1f" stroke={KC.ink} strokeWidth={6} />
    <path d="M -130 -312 Q 0 -350 130 -312 L 130 -300 L -130 -300 Z" fill={CF.poso} />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={-115 + i * 15} cy={-312 - (i % 3) * 6} r={5} fill={CF.poso3} />)}
  </g>;
}
// Petate con pulpa secándose al sol. seco 0..1.
function Petate({ x, y, w = 560, seco = 0, seed = 9 }) {
  const g = krng(seed), c = mixHex(CF.pulpa, CF.pulpa2, seco);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 L ${w} 0 L ${w - 40} 80 L -40 80 Z`} fill="#e2c48a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * w / 8} y1={0} x2={i * w / 8 - 40} y2={80} stroke="#c9a868" strokeWidth={4} />)}
    {Array.from({ length: 34 }, (_, i) => <ellipse key={'p' + i} cx={20 + g() * (w - 60)} cy={14 + g() * 52} rx={(16 + g() * 12) * (1 - seco * 0.25)} ry={9 * (1 - seco * 0.25)} fill={c} stroke={KC.ink} strokeWidth={2} transform={`rotate(${g() * 40 - 20})`} />)}
  </g>;
}

function CafeShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Robert, O: CUES.Ojo, D: CUES.Dato, M: CUES.Mezcla, H: CUES.Hifas, Ca: CUES.Cafeina, P: CUES.Pregunta,
    E: CUES.Espresso, Mx: CUES.Mexico, X: CUES.Xalapa, Mu: CUES.Mundo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el filtro se voltea y caen los posos
  const tilt = kprog(T, K.G + 0.05, K.G + 0.55, kEase.sale), monton = kprog(T, K.G + 0.35, K.G + 1.4, kEase.sale);
  const g7 = krng(77), gotas = Array.from({ length: 34 }, () => ({ d: g7() * 0.9, dx: (g7() - 0.5) * 120, r: 6 + g7() * 8 }));
  // dato: % de posos en la mezcla
  const frac = klerp(0.1, 0.5, kprog(T, K.D + 1.0, K.D + 4.2, kEase.suave)), freno = kclamp((frac - 0.3) / 0.12, 0, 1);
  const veracruz = mxProy(-96.92, 19.54);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: "esto no es tierra" — los posos caen del filtro junto a la taza */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Taza T={T} x={820} y={1090} s={0.9} vapor={1} />
          <Monton x={360} y={1090} p={monton} />
          {gotas.map((q, i) => { const t = T - K.G - 0.3 - q.d * 0.6; if (t < 0 || t > 0.55) return null; const u = t / 0.55;
            return <circle key={i} cx={360 + q.dx * u + 30 * (1 - u)} cy={600 + u * u * 420} r={q.r} fill={i % 2 ? CF.poso : CF.poso3} />; })}
          <g opacity={1 - kprog(T, K.G + 1.4, K.G + 1.9)}><Filtro x={360} y={480 - tilt * 30} rot={tilt * 150} lleno={1 - kprog(T, K.G + 0.3, K.G + 1.0)} /></g>
        </>)}
      </Escena>
      {/* 1 · Robert a los 10 años: maceta con posos que no dio */}
      <Escena T={T} a={K.R} b={K.O} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Maceta x={290} y={1100} s={1.05} />
          {(() => { const p = kprog(T, K.R + 1.2, K.R + 1.6, kEase.rebote); return p > 0 ? <g transform={`translate(290 940) scale(${p})`}>
            <path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
            <path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g> : null; })()}
        </>)}
      </Escena>
      {/* 2 · ojo: bolsa con puros posos, setas que casi no salen */}
      <Escena T={T} a={K.O} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <BolsaMix T={T} x={360} y={860} w={380} h={500} frac={1} />
          <Setas T={T} x={330} y={900} s={0.55} n={3} abre={0.22 * kprog(T, K.O + 0.6, K.O + 1.6)} gris={0.6} seed={5} />
          <Sello T={T} at={K.O + 0.15} x={760} y={900} texto="OJO" color={KC.red} r={120} rot={-10} />
        </>)}
      </Escena>
      {/* 3 · dato: más de 30 % de posos frena las setas */}
      <Escena T={T} a={K.D} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <BolsaMix T={T} x={540} y={880} w={380} h={420} frac={frac} seed={11} />
          <Setas T={T} x={540} y={890} s={0.9} abre={klerp(1, 0.38, freno) * kprog(T, K.D + 0.6, K.D + 1.6)} gris={freno * 0.7} seed={8} />
          <Sello T={T} at={K.D + 0.15} x={170} y={760} texto="DATO" color="#118a3a" r={90} rot={8} />
          <rect x={120} y={1110} width={840} height={38} rx={19} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
          <rect x={126} y={1116} width={(828 * frac / 0.6)} height={26} rx={13} fill={freno > 0 ? KC.red : CF.poso} />
          <line x1={120 + 840 * 0.5} y1={1094} x2={120 + 840 * 0.5} y2={1164} stroke={KC.ink} strokeWidth={6} strokeDasharray="10 6" />
          <text x={120 + 840 * 0.5 + 12} y={1092} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>30 %</text>
          <text x={120} y={1092} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{`posos: ${Math.round(frac * 100)} %`}</text>
        </>)}
      </Escena>
      {/* 4 · mezcla en tercios: casi su peso seco en setas frescas */}
      <Escena T={T} a={K.M} b={K.H} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <BolsaMix T={T} x={260} y={850} w={330} h={480} capas={[{ c: CF.poso, c2: CF.poso3 }, { c: CF.paja, c2: CF.paja2 }, { c: CF.olivo, c2: CF.olivo2 }]} seed={13} col={kprog(T, K.M + 1.2, K.M + 3.0)} />
          <Setas T={T} x={260} y={900} s={0.65} abre={kprog(T, K.M + 2.4, K.M + 3.6)} seed={4} />
          <g opacity={kprog(T, K.M + 2.8, K.M + 3.2)}>
            <Balanza x={770} y={830} L={150} ang={-2 * kprog(T, K.M + 3.0, K.M + 3.8, kEase.rebote)}
              izq={<Costal x={0} y={-4} s={0.5} color={mixHex(CF.poso2, '#d8b47a', 0.4)} />} tIzq="sustrato seco"
              der={<Setas T={T} x={0} y={-10} s={0.45} n={5} abre={1} seed={6} />} tDer="setas frescas" />
          </g>
        </>)}
      </Escena>
      {/* 5–6 · por dentro: hifas entre granitos de café; la cafeína pierde sus metilos */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        <div style={{ position:'absolute', inset:0, opacity:1 - 0.75 * kprog(T, K.Ca - 0.2, K.Ca + 0.4) }}>
          {fsvg(<>
            <Granito x={150} y={690} r={170} seed={2} />
            <Granito x={640} y={600} r={160} seed={5} rot={30} />
            <Granito x={470} y={1250} r={130} seed={8} />
            <Granito x={930} y={900} r={150} seed={3} rot={60} />
            <Granito x={150} y={1050} r={100} seed={9} />
          </>, 0)}
          <HifasMicro T={T} g={kprog(T, K.H + 0.2, K.H + 3.2)} ancho={16} comida={{ x: -800, y: -800 }} />
        </div>
        {fsvg(<g opacity={kprog(T, K.Ca, K.Ca + 0.4)}>
          <Cafeina T={T} x={360} y={770} s={1.8} q={[0, 1, 2].map((i) => kprog(T, K.Ca + 0.9 + i * 0.6, K.Ca + 1.5 + i * 0.6))} />
        </g>)}
      </Escena>
      {/* 7 · re-gancho: ¿salen con cafeína? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Setas T={T} x={360} y={1060} s={1.45} abre={1} seed={3} /><Interrogacion T={T} x={300} y={820} tam={380} /></>)}
      </Escena>
      {/* 8 · 250 kg de setas frescas = la cafeína de un espresso */}
      <Escena T={T} a={K.E} b={K.Mx} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Espresso x={210} y={1110} s={0.9} />
          <text x={210} y={1170} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>1 espresso</text>
          {Array.from({ length: 20 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4); return <Caja key={i} x={530 + c * 130} y={1130 - r * 72} p={kprog(T, K.E + 0.8 + i * 0.09, K.E + 1.1 + i * 0.09)} />; })}
        </>)}
      </Escena>
      {/* 9 · México: pulpa de café para cultivar setas (Veracruz, años 80) */}
      <Escena T={T} a={K.Mx} b={K.X} zoom={0.04}>
        <FondoLunares color="#8fe08a" />
        {fsvg(<>
          <Cereza x={280} y={680} r={160} p={kprog(T, K.Mx + 0.05, K.Mx + 0.5)} rot={-8} />
          {(() => { const p = kprog(T, K.Mx + 1.5, K.Mx + 2.0, kEase.sale); return <g opacity={p}>
            <path d={`M 280 860 L 280 ${860 + 40 * p}`} stroke={KC.ink} strokeWidth={10} /><path d="M 262 892 L 280 914 L 298 892" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <BolsaMix T={T} x={280} y={1050} w={200} h={240} capas={[{ c: CF.pulpa, c2: CF.pulpa2 }]} seed={21} col={kprog(T, K.Mx + 2.0, K.Mx + 3.4)} />
            <Setas T={T} x={280} y={1060} s={0.5} n={5} abre={kprog(T, K.Mx + 3.4, K.Mx + 4.6)} seed={9} />
          </g>; })()}
          <g opacity={kprog(T, K.Mx + 2.0, K.Mx + 2.5)}>
            <MapaMexico x={500} y={620} ancho={540}>
              {(() => { const [vx, vy] = veracruz, pu = kprog(T, K.Mx + 2.6, K.Mx + 3.0, kEase.rebote); return <g>
                <circle cx={vx} cy={vy} r={(40 + 20 * Math.sin(T * 5)) * pu} fill={KC.red} opacity=".3" />
                <circle cx={vx} cy={vy} r={22 * pu} fill={KC.red} stroke={KC.ink} strokeWidth={8} /></g>; })()}
            </MapaMexico>
          </g>
        </>)}
      </Escena>
      {/* 10 · Xalapa: pulpa secada al sol y guardada 2 años → más setas frescas que su peso seco */}
      <Escena T={T} a={K.X} b={K.Mu} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Sol T={T} x={190} y={560} r={60} />
          <Petate x={330} y={600} w={330} seco={kprog(T, K.X + 0.3, K.X + 2.2)} />
          {[0, 1, 2].map((i) => { const p = kprog(T, K.X + 2.0 + i * 0.2, K.X + 2.4 + i * 0.2, kEase.rebote); return p > 0 ? <Costal key={i} x={140 + i * 150} y={930} s={0.85 * p} texto={i === 1 ? '2 AÑOS' : ''} /> : null; })}
          <g opacity={kprog(T, K.X + 3.0, K.X + 3.4)}>
            <Balanza x={800} y={800} L={140} ang={12 * kprog(T, K.X + 3.4, K.X + 4.4, kEase.rebote)}
              izq={<Costal x={0} y={-4} s={0.45} color={CF.pulpa2} />} tIzq="pulpa seca"
              der={<Setas T={T} x={0} y={-10} s={0.5} n={6} abre={1} seed={12} />} tDer="setas frescas" />
          </g>
        </>)}
      </Escena>
      {/* 11 · el mundo deja unos 6 millones de toneladas de posos al año */}
      <Escena T={T} a={K.Mu} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Globo T={T} x={540} y={960} r={210} />
          <Monton x={540} y={770} s={0.8} p={kprog(T, K.Mu + 0.6, K.Mu + 3.2, kEase.sale)} seed={6} />
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo montón del inicio, ahora mezclado con paja y con setas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Taza T={T} x={820} y={1090} s={0.9} vapor={1} />
          <Monton x={360} y={1090} p={1} paja={kprog(T, K.C + 0.2, K.C + 1.0)} />
          <Setas T={T} x={340} y={950} s={1.05} n={7} abre={kprog(T, K.C + 0.8, K.C + 2.6)} seed={3} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.3} until={K.G + 2.0} texto="¿tierra?" x={360} y={760} tam={52} />
      <Chip T={T} at={K.G + 1.9} until={K.R - 0.3} texto="posos de café usados" x={360} y={790} tam={38} borde={CF.poso} />
      <Chip T={T} at={K.R + 0.3} until={K.O - 0.3} texto="Robert · 10 años" x={290} y={560} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.R + 1.6} until={K.O - 0.3} x={60} y={1500} texto="mi sustrato de café" tam={26} color={KC.ink} />
      <Chip T={T} at={K.O + 0.4} until={K.D - 0.3} texto="100 % posos" x={360} y={520} tam={40} borde={CF.poso} />
      <Etq T={T} at={K.O + 1.4} until={K.D - 0.3} x={590} y={1090} texto="casi no salen" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.D + 0.4} until={K.D + 3.2} anio="2021" quien="Malasia · Chai y col." revista="Future Foods, 2021" x={540} y={420} />
      <Chip T={T} at={K.D + 3.6} until={K.M - 0.3} texto="más de 30 %: se frenan" x={540} y={470} tam={38} borde={KC.red} />
      <Etq T={T} at={K.M + 0.3} until={K.M + 2.2} x={450} y={680} texto="ramas de olivo · 1/3" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 0.7} until={K.M + 2.2} x={450} y={830} texto="paja · 1/3" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.1} until={K.M + 2.2} x={450} y={980} texto="posos · 1/3" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 3.4} until={K.H - 0.3} texto="eficiencia biológica 95 %" x={360} y={470} tam={34} borde="#118a3a" />
      <Etq T={T} at={K.M + 3.8} until={K.H - 0.3} x={60} y={1500} texto="2021 · setas frescas ÷ sustrato seco" tam={24} color={KC.ink} />
      <Chip T={T} at={K.H + 0.1} until={K.Ca - 0.3} texto="POR DENTRO · AL MICROSCOPIO" x={400} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.H + 1.0} until={K.Ca - 0.3} x={60} y={880} texto="granito de café" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.H + 1.8} until={K.Ca - 0.3} x={560} y={1010} texto="hifas de Pleurotus" it tam={30} color={KC.mint} />
      <Etq T={T} at={K.Ca + 0.3} until={K.Ca + 2.4} x={60} y={440} texto="cafeína" tam={44} color={KC.texto} />
      <Etq T={T} at={K.Ca + 2.5} until={K.P - 0.3} x={60} y={440} texto="xantina" tam={44} color={KC.yellow} />
      <Chip T={T} at={K.Ca + 1.0} until={K.P - 0.3} texto="el micelio rompe solo una parte · 2019" x={540} y={1128} tam={30} borde={KC.mint} />
      <Etq T={T} at={K.P + 0.3} until={K.E - 0.3} x={60} y={430} texto="Pleurotus ostreatus" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.E + 0.1} until={K.E + 1.2} texto="sí: trazas de cafeína" x={540} y={470} tam={40} borde={KC.ink} />
      <NumeroGigante T={T} at={K.E + 1.3} until={K.E + 4.1} valor={250} prefijo="≈ " sufijo=" kg" etiqueta="de setas frescas" x={340} y={560} tam={140} color={CF.seta} />
      <TarjetaEstudio T={T} at={K.E + 4.3} until={K.Mx - 0.3} anio="2019" quien="Carrasco-Cabrera, Bell y Kertesz" revista="Appl. Microbiol. Biotechnol., 2019" x={540} y={470} />
      <Etq T={T} at={K.Mx + 0.6} until={K.Mx + 2.4} x={460} y={560} texto="pulpa" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Mx + 0.9} until={K.Mx + 2.4} x={460} y={700} texto="grano" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Mx + 3.0} until={K.X - 0.3} texto="años 80 · INIREB, Xalapa" x={740} y={1010} tam={32} borde={KC.red} />
      <Chip T={T} at={K.X + 0.2} until={K.Mu - 0.3} texto="Xalapa, Veracruz · 1987" x={360} y={430} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.X + 0.8} until={K.X + 3.2} x={360} y={525} texto="pulpa secada al sol" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.X + 3.6} until={K.Mu - 0.3} valor={100} desde={100} prefijo="> " sufijo=" %" etiqueta="eficiencia biológica" x={300} y={1080} tam={100} color={KC.mint} />
      <Etq T={T} at={K.X + 4.0} until={K.Mu - 0.3} x={60} y={1500} texto="setas frescas (con agua) ÷ sustrato seco" tam={24} color={KC.ink} />
      <NumeroGigante T={T} at={K.Mu + 0.3} until={K.C - 0.3} valor={6} dur={0.6} sufijo=" millones" etiqueta="de toneladas de posos al año" x={540} y={490} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Mu + 1.6} until={K.C - 0.3} texto="estimación 2022 · en todo el mundo" x={540} y={1215} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="de residuo a comida" x={360} y={560} tam={40} borde="#118a3a" />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={1500} texto="Pleurotus ostreatus · el dibujo es esquemático" it tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="5 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.R} until={K.O} texto="10 cm" largo={150} y={1580} color={KC.ink} />
      <BarraEscala T={T} at={K.O} until={K.H} texto="10 cm" largo={160} y={1580} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.Ca} texto="100 µm" largo={220} />
      <BarraEscala T={T} at={K.Ca} until={K.P} texto="0.5 nm (esquema)" largo={220} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={140} y={1580} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.Mx} texto="50 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.Mx} until={K.X} texto="cereza: 1 cm · mapa esquemático" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.X} until={K.Mu} texto="50 cm" largo={150} y={1580} color={KC.ink} />
      <BarraEscala T={T} at={K.Mu} until={K.C} texto="dibujo esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1580} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Esto no es tierra: *es café usado.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.O - 0.1} texto="A mí, a los 10 años, *no me funcionó.*" />
      <Subtitulo T={T} idx={2} at={K.O + 0.1} until={K.D - 0.1} texto="Con puros posos, *muchas veces no salen.*" />
      <Subtitulo T={T} idx={3} at={K.D + 0.1} until={K.M - 0.1} texto="Más de *30 % de posos:* se frenaron." />
      <Subtitulo T={T} idx={4} at={K.M + 0.1} until={K.H - 0.1} texto="1/3 de posos: casi su *peso seco* en setas frescas." tam={60} />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.Ca - 0.1} texto="Las hifas se cuelan *entre los granitos.*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.P - 0.1} texto="Rompe parte de la cafeína: *xantina.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Las setas salen *con cafeína?*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Mx - 0.1} texto="Trazas: *250 kg de setas* = 1 espresso." />
      <Subtitulo T={T} idx={9} at={K.Mx + 0.1} until={K.X - 0.1} texto="Veracruz, años 80: *setas en pulpa de café.*" />
      <Subtitulo T={T} idx={10} at={K.X + 0.1} until={K.Mu - 0.1} texto="Xalapa: *más setas que su peso seco.*" />
      <Subtitulo T={T} idx={11} at={K.Mu + 0.1} until={K.C - 0.1} texto="Cada año: *6 millones de toneladas* de posos." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es tierra: *es tu café, hecho comida.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.2, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.1, K.O - 0.1, 'avatar_12_perfil_serio', 'grande'],
        [K.O + 0.3, K.D + 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.M + 2.8, K.H - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 0.3, K.Ca - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_06_pensativo_menton', 'grande'],
        [K.E + 1.5, K.E + 4.0, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Mx + 2.5, K.X - 0.2, 'avatar_07_pensativo_puno', 'arriba-der'],
        [K.X + 3.4, K.Mu - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="109" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CafeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CafeShot /></CompositionStage></div>;
}
window.CafeApp = CafeApp;
