// Shot Fungi Mati #106 · Esto no es tierra: es estiércol cocinado — NARRADO (N1 «Por dentro», gancho 1 "Esto no es X: es Y").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CH = { compo:'#5a3a22', compo2:'#3f2716', paja:'#f0c95a', paja2:'#c99a2e', turba:'#2e1d12', caliza:'#f4f1e8', madera:'#c98a4a', madera2:'#8a5a2b',
  barro:'#d0693a', barro2:'#9e4a26', tierra:'#6b4a32', tierra2:'#4e3424', octenol:'#b18cff', mic:'#fbf7ee', bact:'#5fd36f' };

// Composta en un rectángulo (dentro de un <svg>): café oscuro con paja y grumos. micelio 0..1 = manchas blancas que la llenan.
function Composta({ x, y, w, h, seed = 3, micelio = 0, id = 'cp' }) {
  const g = krng(seed);
  const pajas = Array.from({ length: Math.round(w * h / 2400) }, () => ({ x: g() * w, y: g() * h, l: 16 + g() * 30, a: g() * 180, c: g() < 0.5 ? CH.paja : CH.paja2 }));
  const grumos = Array.from({ length: Math.round(w * h / 4200) }, () => ({ x: g() * w, y: g() * h, r: 5 + g() * 11 }));
  const blancos = Array.from({ length: Math.round(w * h / 2600) }, () => ({ x: g() * w, y: g() * h, r: 14 + g() * 26, u: g() * 0.85 }));
  return <g>
    <defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={x} y={y} width={w} height={h} fill={CH.compo} />
      {grumos.map((q, i) => <circle key={i} cx={x + q.x} cy={y + q.y} r={q.r} fill={CH.compo2} />)}
      {pajas.map((p, i) => <line key={i} x1={x + p.x} y1={y + p.y} x2={x + p.x + Math.cos(p.a) * p.l} y2={y + p.y + Math.sin(p.a) * p.l} stroke={p.c} strokeWidth={5} strokeLinecap="round" />)}
      {micelio > 0 && blancos.map((b, i) => b.u < micelio ? <circle key={i} cx={x + b.x} cy={y + b.y} r={b.r * kclamp((micelio - b.u) * 5, 0, 1)} fill={CH.mic} opacity={0.82} /> : null)}
    </g>
  </g>;
}
// Capa de cobertura (turba con caliza): franja café muy oscura con puntitos blancos.
function Cobertura({ x, y, w, h = 52, seed = 9 }) {
  const g = krng(seed);
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={CH.turba} />
    {Array.from({ length: Math.round(w / 9) }, (_, i) => <circle key={i} cx={x + g() * w} cy={y + 6 + g() * (h - 12)} r={2.5 + g() * 3.5} fill={CH.caliza} opacity={0.9} />)}
    {Array.from({ length: Math.round(w / 30) }, (_, i) => <line key={'f' + i} x1={x + g() * w} y1={y + g() * h} x2={x + g() * w * 0.02 + 8} y2={y + g() * h} stroke="#4a3020" strokeWidth={3} />)}
  </g>;
}
// Cama de cultivo en corte (charola de madera). (x, y) = esquina sup. izq. de la composta. cob 0..1 = la cobertura cae.
// prim 0..1 = primordios (cabecitas de alfiler) en la superficie. champs = [[dx, crece, abre, s]] champiñones sobre la cama.
function Cama({ x, y, w = 900, h = 260, seed = 3, micelio = 0, cob = 0, prim = 0, champs = [], id = 'cama', T = 0 }) {
  const hc = 52, c = kEase.sale(kclamp(cob, 0, 1)), sup = cob > 0 ? y - hc : y;
  const g = krng(seed + 40), pins = Array.from({ length: Math.round(w / 34) }, () => ({ x: 20 + g() * (w - 40), u: g(), r: 6 + g() * 5 }));
  return <g>
    <Composta x={x} y={y} w={w} h={h} seed={seed} micelio={micelio} id={id} />
    {cob > 0 && <g transform={`translate(0 ${(1 - c) * -320})`} opacity={kclamp(cob * 4, 0, 1)}><Cobertura x={x} y={y - hc} w={w} h={hc} seed={seed + 2} /></g>}
    {/* charola: costados y fondo de madera */}
    <rect x={x - 26} y={y - hc - 18} width={26} height={h + hc + 44} fill={CH.madera} stroke={KC.ink} strokeWidth={7} />
    <rect x={x + w} y={y - hc - 18} width={26} height={h + hc + 44} fill={CH.madera} stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 26} y={y + h} width={w + 52} height={26} fill={CH.madera2} stroke={KC.ink} strokeWidth={7} />
    <rect x={x} y={y - hc - 18 + (cob > 0 ? 0 : hc)} width={w} height={h + 18 + (cob > 0 ? hc : 0)} fill="none" stroke={KC.ink} strokeWidth={7} />
    {prim > 0 && pins.map((p, i) => { const k = kEase.rebote(kclamp((prim - p.u * 0.7) * 3.3, 0, 1)); return k > 0 ? <g key={i}>
      <rect x={x + p.x - p.r * 0.45} y={sup - p.r * 1.3 * k} width={p.r * 0.9} height={p.r * 1.3 * k} fill={CH.mic} stroke={KC.ink} strokeWidth={2.5} />
      <circle cx={x + p.x} cy={sup - p.r * 1.3 * k} r={p.r * k} fill={CH.mic} stroke={KC.ink} strokeWidth={3} /></g> : null; })}
    {champs.map(([dx, cr, ab, s], i) => <Champinon key={i} x={x + dx} y={sup + 4} s={s || 0.5} crece={cr} abre={ab} rot={mece(T, i + 3, 0.15) * 2} />)}
  </g>;
}
// Maceta de barro. (x, y) = centro del borde superior. relleno: 'tierra' | 'composta'. bolsa 0..1 = la bolsa negra se levanta.
function Maceta({ x, y, s = 1, relleno = 'tierra', bolsa = -1, T = 0, children }) {
  const g = krng(12), piedras = Array.from({ length: 14 }, () => ({ x: -130 + g() * 260, y: 6 + g() * 26, r: 4 + g() * 6 }));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 40 L -112 330 Q -110 344 -94 344 L 94 344 Q 110 344 112 330 L 150 40 Z" fill={CH.barro} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 60 L -92 320" stroke="#f0a070" strokeWidth={14} strokeLinecap="round" opacity=".45" />
    {relleno === 'tierra' ? <g>
      <rect x={-162} y={-2} width={324} height={44} fill={CH.tierra} />
      {piedras.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={CH.tierra2} />)}
    </g> : <g>
      <Composta x={-162} y={14} w={324} h={28} seed={5} micelio={1} id="cpMac" />
      <Cobertura x={-162} y={-22} w={324} h={36} seed={6} />
    </g>}
    <rect x={-178} y={-6} width={356} height={52} rx={10} fill="none" stroke={KC.ink} strokeWidth={8} />
    <rect x={-178} y={40} width={356} height={14} fill={CH.barro2} stroke={KC.ink} strokeWidth={6} />
    {children}
    {bolsa >= 0 && bolsa < 1 && <g transform={`translate(${bolsa * 60} ${-kEase.suave(bolsa) * 640}) rotate(${bolsa * 18})`} opacity={1 - kprog(bolsa, 0.6, 1)}>
      <path d="M -200 360 Q -230 80 -170 -120 Q -60 -200 0 -170 Q 80 -210 170 -120 Q 230 80 200 360 Z" fill="#17161a" stroke={KC.ink} strokeWidth={8} />
      <path d="M -130 -60 Q -150 100 -120 300" stroke="#55545c" strokeWidth={16} fill="none" strokeLinecap="round" opacity=".6" />
    </g>}
  </g>;
}
// Pala de jardín que vacía composta.
function Pala({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-210} y={-16} width={150} height={32} rx={14} fill={CH.madera} stroke={KC.ink} strokeWidth={7} />
    <path d="M -64 -26 L 10 -40 Q 120 -36 150 0 Q 120 36 10 40 L -64 26 Z" fill="#c9ced6" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -20 -18 Q 60 -26 110 -6" stroke="#fff" strokeWidth={8} fill="none" opacity=".6" strokeLinecap="round" />
  </g>;
}
// Grumo de composta que cae (con una paja).
function Grumo({ x, y, r = 22, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={`M ${-r} 0 Q ${-r} ${-r} 0 ${-r} Q ${r} ${-r * 1.1} ${r} 0 Q ${r * 0.9} ${r} 0 ${r * 0.9} Q ${-r} ${r} ${-r} 0 Z`} fill={CH.compo} stroke={KC.ink} strokeWidth={4} />
    <line x1={-r * 0.9} y1={-r * 0.2} x2={r * 1.3} y2={-r * 0.6} stroke={CH.paja} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Ingrediente en un círculo: 0 paja · 1 estiércol de caballo (herradura) · 2 gallinaza (gallina) · 3 yeso (costal).
function Ingrediente({ x, y, tipo, k = 1 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(k, 0, 1))})`}>
    <circle r={96} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {tipo === 0 && <g>{Array.from({ length: 9 }, (_, i) => <line key={i} x1={-50 + i * 12} y1={-58} x2={-30 + i * 8} y2={58} stroke={i % 2 ? CH.paja2 : CH.paja} strokeWidth={9} strokeLinecap="round" />)}
      <rect x={-46} y={-8} width={92} height={18} rx={6} fill={CH.madera2} stroke={KC.ink} strokeWidth={4} /></g>}
    {tipo === 1 && <g>
      <path d="M -46 40 L -46 -6 Q -46 -58 0 -58 Q 46 -58 46 -6 L 46 40" fill="none" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
      <path d="M -46 40 L -46 -6 Q -46 -58 0 -58 Q 46 -58 46 -6 L 46 40" fill="none" stroke="#9aa3ad" strokeWidth={22} strokeLinecap="round" />
      {[[-24, 56], [6, 62], [30, 54]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={18} ry={12} fill={CH.compo} stroke={KC.ink} strokeWidth={4} />)}</g>}
    {tipo === 2 && <g>
      <ellipse cx={8} cy={20} rx={50} ry={38} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <circle cx={-34} cy={-22} r={24} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <path d="M -48 -44 q 6 -18 14 -4 q 6 -16 14 0 q 8 -10 10 6" fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <path d="M -58 -22 L -76 -16 L -58 -12 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={4} />
      <circle cx={-38} cy={-26} r={4} fill={KC.ink} />
      <path d="M 50 4 q 22 -10 20 18 q -10 -4 -18 4" fill="#fff" stroke={KC.ink} strokeWidth={5} /></g>}
    {tipo === 3 && <g>
      <path d="M -50 -56 Q 0 -70 50 -56 L 58 56 Q 0 68 -58 56 Z" fill="#eee8da" stroke={KC.ink} strokeWidth={6} />
      <text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>YESO</text></g>}
  </g>;
}
// Pila de composta (montículo) con vapor. calor 0..1, vivos 0..1 = microbios encendidos.
function Pila({ T, x, y, w = 620, h = 330, calor = 0, vivos = 1, quimica = 0 }) {
  const g = krng(31), paja = Array.from({ length: 90 }, () => { const u = g() * 2 - 1, v = g(); return { x: u * w * 0.46, y: -v * h * Math.sqrt(1 - u * u) * 0.92, a: g() * 3.14, l: 14 + g() * 22 }; });
  const mic = Array.from({ length: 22 }, () => { const u = g() * 1.6 - 0.8, v = 0.15 + g() * 0.6; return { x: u * w * 0.5, y: -v * h * Math.sqrt(1 - u * u), r: g() * 6 }; });
  return <g transform={`translate(${x} ${y})`}>
    {calor > 0 && [-0.3, 0, 0.3].map((u, i) => <path key={i} d={`M ${u * w * 0.6} ${-h - 10} q 30 -50 0 -100 q -30 -50 0 -100`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round"
      opacity={calor * (0.35 + 0.25 * Math.sin(T * 3 + i))} transform={`translate(${Math.sin(T * 2 + i) * 14} ${-((T * 60 + i * 40) % 60)})`} />)}
    <path d={`M ${-w / 2} 0 Q ${-w * 0.45} ${-h * 1.1} 0 ${-h} Q ${w * 0.45} ${-h * 1.1} ${w / 2} 0 Z`} fill={mixHex(CH.compo, '#8a3a1a', calor * 0.55)} stroke={KC.ink} strokeWidth={8} />
    {paja.map((p, i) => <line key={i} x1={p.x} y1={p.y - 6} x2={p.x + Math.cos(p.a) * p.l} y2={p.y - 6 + Math.sin(p.a) * p.l * 0.5} stroke={i % 2 ? CH.paja : CH.paja2} strokeWidth={5} strokeLinecap="round" />)}
    {mic.map((m, i) => <rect key={'m' + i} x={m.x - 13} y={m.y - 6} width={26} height={12} rx={6} transform={`rotate(${m.r * 30} ${m.x} ${m.y})`}
      fill={vivos > 0.5 ? CH.bact : '#8a8f99'} stroke={KC.ink} strokeWidth={3} opacity={0.35 + 0.65 * vivos} />)}
    {quimica > 0 && [[-140, -150], [40, -220], [170, -120], [-40, -90]].map(([a, b], i) => { const q = kclamp(quimica * 2 - i * 0.25, 0, 1);
      return <g key={'q' + i} opacity={q} transform={`translate(${a} ${b}) rotate(${T * 20 + i * 40})`}>
        <path d="M -22 0 L -11 -19 L 11 -19 L 22 0 L 11 19 L -11 19 Z" fill="rgba(255,225,26,.25)" stroke={KC.yellow} strokeWidth={6} />
        <line x1={22} y1={0} x2={22 + 30 * q} y2={0} stroke={KC.yellow} strokeWidth={6} />
        <circle cx={22 + 34 * q} cy={0} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={3} /></g>; })}
  </g>;
}
// Reloj (para "por lo menos 2 horas").
function Reloj({ T, x, y, r = 80, giro = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={Math.sin(a) * r * 0.78} y1={-Math.cos(a) * r * 0.78} x2={Math.sin(a) * r * 0.9} y2={-Math.cos(a) * r * 0.9} stroke={KC.ink} strokeWidth={5} />; })}
    <path d={`M 0 0 L 0 ${-r * 0.82} A ${r * 0.82} ${r * 0.82} 0 ${giro > 0.5 ? 1 : 0} 1 ${Math.sin(giro * 2 * Math.PI) * r * 0.82} ${-Math.cos(giro * 2 * Math.PI) * r * 0.82} Z`} fill={KC.yellow} opacity=".55" />
    <line x1={0} y1={0} x2={Math.sin(giro * 2 * Math.PI) * r * 0.7} y2={-Math.cos(giro * 2 * Math.PI) * r * 0.7} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(giro * 24 * Math.PI) * r * 0.5} y2={-Math.cos(giro * 24 * Math.PI) * r * 0.5} stroke={KC.red} strokeWidth={5} strokeLinecap="round" />
    <circle r={9} fill={KC.ink} />
  </g>;
}
// Grano de cereal con micelio (pelusa blanca).
function Grano({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={22} ry={13} fill="#d9a85a" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={Math.cos(a) * 18} y1={Math.sin(a) * 10} x2={Math.cos(a) * 30} y2={Math.sin(a) * 20} stroke={CH.mic} strokeWidth={4} strokeLinecap="round" />; })}
  </g>;
}
// Hifa al microscopio: tubo con septos (tabiques) y núcleos que crece por la punta. pts = puntos de la ruta, g 0..1.
function HifaTubo({ pts, g = 1, ancho = 30, color = '#eafff7' }) {
  const seg = []; let L = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rest = L * kclamp(g, 0, 1); const vis = [pts[0]];
  for (let i = 1; i < pts.length && rest > 0; i++) { const d = seg[i - 1], u = Math.min(1, rest / d); vis.push([klerp(pts[i - 1][0], pts[i][0], u), klerp(pts[i - 1][1], pts[i][1], u)]); rest -= d; }
  if (vis.length < 2) return null;
  const dd = 'M ' + vis.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L ');
  const marcas = []; let acc = 0;
  for (let i = 1; i < vis.length; i++) { const dx = vis[i][0] - vis[i - 1][0], dy = vis[i][1] - vis[i - 1][1], d = Math.hypot(dx, dy); if (!d) continue;
    for (let s = 70 - (acc % 70); s < d; s += 70) { const px = vis[i - 1][0] + dx * s / d, py = vis[i - 1][1] + dy * s / d, nx = -dy / d, ny = dx / d, k = Math.round((acc + s) / 70);
      marcas.push(k % 2 ? <line key={'s' + marcas.length} x1={px + nx * ancho * 0.45} y1={py + ny * ancho * 0.45} x2={px - nx * ancho * 0.45} y2={py - ny * ancho * 0.45} stroke="#7aa898" strokeWidth={4} />
        : <ellipse key={'n' + marcas.length} cx={px} cy={py} rx={7} ry={5} fill="#7fb8ff" opacity=".8" />); }
    acc += d; }
  return <g>
    <path d={dd} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={dd} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".92" />
    {marcas}
  </g>;
}
// Nubecita de 1-octen-3-ol.
function Nube({ T, x, y, s = 1, o = 1, seed = 1 }) {
  if (o <= 0 || s <= 0) return null;
  return <g transform={`translate(${x + mece(T, seed, 0.3) * 10} ${y + mece(T, seed + 2, 0.25) * 8}) scale(${s})`} opacity={o}>
    {[[-24, 4, 26], [6, -12, 30], [32, 6, 24], [4, 14, 24]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill={CH.octenol} opacity=".55" />)}
    <circle cx={2} cy={0} r={11} fill="#d9c7ff" />
  </g>;
}
// Nudo de hifas (primordio en formación). k = tamaño, candado 0..1 (1 = cerrado, 0 = abierto).
function Nudo({ T, x, y, k = 1, candado = 0 }) {
  const g = krng(77), cs = Array.from({ length: 16 }, () => ({ a: g() * 6.28, d: g() * 40, r: 14 + g() * 14 }));
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    {cs.map((c, i) => <circle key={i} cx={Math.cos(c.a) * c.d} cy={Math.sin(c.a) * c.d * 0.8} r={c.r} fill={CH.mic} stroke={KC.ink} strokeWidth={3 / Math.max(k, 0.3)} />)}
    {candado > 0 && <g transform={`translate(0 -100) scale(${1 / Math.max(k, 0.5)})`} opacity={kclamp(candado * 3, 0, 1)}>
      <path d={`M -22 0 L -22 -26 Q -22 -48 0 -48 Q 22 -48 22 -26 L 22 ${candado > 0.5 ? 0 : -18}`} fill="none" stroke={KC.gold2} strokeWidth={9} transform={candado > 0.5 ? '' : 'translate(0 -16)'} />
      <rect x={-34} y={-4} width={68} height={52} rx={10} fill={candado > 0.5 ? KC.red : KC.mint} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Ventilador.
function Ventilador({ T, x, y, r = 90, on = 0 }) {
  const a = on * T * 900;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-14} y={r} width={28} height={70} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={r + 66} width={140} height={22} rx={10} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    <circle r={r} fill="#e9eef3" stroke={KC.ink} strokeWidth={8} />
    <g transform={`rotate(${a})`}>{[0, 120, 240].map((d) => <ellipse key={d} cx={0} cy={-r * 0.45} rx={r * 0.2} ry={r * 0.42} transform={`rotate(${d})`} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />)}</g>
    <circle r={14} fill={KC.ink} />
    {on > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${-r - 30} ${-40 + i * 40} q -40 -14 -80 0`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={on * (0.5 + 0.5 * Math.sin(T * 8 + i))} />)}
  </g>;
}
// Gráfica de pastel (94 % champiñón).
function Pastel({ x, y, r = 130, p = 1, pct = 0.94 }) {
  const a = 2 * Math.PI * pct * p, ex = Math.sin(a) * r, ey = -Math.cos(a) * r;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#c9a06a" stroke={KC.ink} strokeWidth={8} />
    {p > 0 && <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${ex} ${ey} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Rutas de las hifas al microscopio (fondo oscuro).
const HIFAS_R = [
  [[-40, 1180], [200, 1110], [420, 1080], [560, 990], [640, 900]],
  [[1120, 1150], [900, 1100], [740, 1010], [640, 930]],
  [[-40, 820], [180, 860], [360, 900], [520, 940], [610, 920]],
  [[1120, 820], [930, 870], [780, 900], [680, 920]],
  [[300, 1220], [380, 1100], [480, 1000], [600, 950]],
];
const NUBES = [[300, 760], [760, 760], [220, 1000], [880, 1010], [500, 700], [420, 880]];

function ChampinonShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Maceta, R: CUES.Receta, F1: CUES.FaseI, F2: CUES.FaseII, S: CUES.Siembra, P: CUES.Pregunta, Cb: CUES.Cobertura,
    O: CUES.Octenol, B: CUES.Bacterias, E: CUES.Estudio, Mx: CUES.Mexico, Co: CUES.Cosecha, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, PRIM = K.B + 2.7;
  // gancho: la pala vacía composta (cuadro 0.1) y cae
  const pala = kprog(T, K.G + 0.05, K.G + 0.6, kEase.sale), palaFuera = kprog(T, K.G + 1.1, K.G + 1.6, kEase.suave);
  const caen = Array.from({ length: 7 }, (_, i) => { const t0 = K.G + 0.15 + i * 0.06, u = kprog(T, t0, t0 + 0.65); return { u, x: 380 + i * 34 + u * (i - 3) * 30, y: klerp(470, 900, u * u), r: 18 + (i % 3) * 7, rot: u * 300 * (i % 2 ? 1 : -1) }; });
  // fase I: temperatura y días
  const temp = klerp(22, 79, kprog(T, K.F1 + 0.4, K.F1 + 3.2, kEase.suave));
  const dia = Math.max(1, Math.min(6, Math.floor(1 + 5.99 * kprog(T, K.F1 + 0.3, K.F1 + 3.2))));
  const temp2 = klerp(79, 60, kprog(T, K.F2 + 0.2, K.F2 + 1.4, kEase.suave));
  // octenol y bacterias
  const comen = (i) => kprog(T, K.B + 0.5 + i * 0.25, K.B + 1.0 + i * 0.25, kEase.suave);
  const cand = T < K.B + 1.9 ? 1 : 0.3 - kprog(T, K.B + 1.9, K.B + 2.2) * 0.3;
  const nudo = T < K.B + 1.9 ? 0.55 + 0.04 * Math.sin(T * 6) : klerp(0.59, 1.15, kprog(T, K.B + 1.9, K.B + 2.6, kEase.rebote));
  // estudio: ventilador
  const vent = kprog(T, K.E + 3.4, K.E + 3.8), sopla = kprog(T, K.E + 3.6, K.E + 4.6, kEase.suave);
  // cosecha: dos oleadas
  const ola1 = kprog(T, K.Co + 0.2, K.Co + 1.3, kEase.sale), corta = kprog(T, K.Co + 1.9, K.Co + 2.3), ola2 = kprog(T, K.Co + 2.4, K.Co + 3.5, kEase.sale);
  const OLA = [70, 190, 310, 430, 550, 670, 790];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: esto no es tierra */}
      <Escena T={T} a={K.G} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Cama x={110} y={860} w={860} h={220} seed={3} id="cG" T={T} champs={[[430, kprog(T, K.G + 2.0, K.G + 3.4, kEase.sale), kprog(T, K.G + 3.0, K.G + 4.2) * 0.35, 0.9]]} />
          {caen.map((c, i) => c.u > 0 && c.u < 1 ? <Grumo key={i} x={c.x} y={c.y} r={c.r} rot={c.rot} /> : null)}
          {palaFuera < 1 && <g opacity={1 - palaFuera}><Pala x={klerp(220, 440, pala) - palaFuera * 300} y={460 - palaFuera * 200} rot={klerp(-10, 55, pala)} /></g>}
          <Sello T={T} at={K.G + 0.95} x={250} y={640} texto="¡NO!" color={KC.red} r={110} rot={-10} />
        </>)}
      </Escena>
      {/* 1 · la maceta de Robert: tierra normal y bolsa negra… nada */}
      <Escena T={T} a={K.M} b={K.R} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Maceta x={380} y={760} s={1.05} relleno="tierra" bolsa={kprog(T, K.M + 1.2, K.M + 2.2)} T={T} />
          {T > K.M + 2.3 && <g opacity={kprog(T, K.M + 2.3, K.M + 2.6)}><Interrogacion T={T} x={380} y={700 + kprog(T, K.M + 2.6, K.M + 3.6, kEase.suave) * 40} tam={190} color={KC.paper} /></g>}
        </>)}
      </Escena>
      {/* 2 · la receta: paja, estiércol de caballo, gallinaza y yeso */}
      <Escena T={T} a={K.R} b={K.F1} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pila T={T} x={540} y={1130} w={klerp(200, 700, kprog(T, K.R + 0.7, K.R + 3.0, kEase.sale))} h={klerp(60, 330, kprog(T, K.R + 0.7, K.R + 3.0, kEase.sale))} vivos={0} />
          {[0.25, 0.75, 1.75, 2.35].map((t0, i) => { const k = kprog(T, K.R + t0, K.R + t0 + 0.4), baja = kprog(T, K.R + t0 + 1.2, K.R + t0 + 1.7, kEase.suave);
            return <g key={i} opacity={1 - baja}><Ingrediente x={klerp(150 + i * 260, 540, baja)} y={klerp(620, 1000, baja)} tipo={i} k={k * (1 - baja * 0.6)} /></g>; })}
        </>)}
      </Escena>
      {/* 3 · fase I: la pila se calienta (~79 °C); arriba de 70 °C, química */}
      <Escena T={T} a={K.F1} b={K.F2} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Pila T={T} x={600} y={1130} w={700} h={340} calor={kprog(T, K.F1 + 0.3, K.F1 + 3.0)} vivos={temp < 70 ? 1 : 0} quimica={kprog(T, K.F1 + 3.0, K.F1 + 4.2)} />)}
        <Termometro x={150} y={540} alto={540} valor={temp} max={100} rango={[70, 100]} marcas={[0, 50, 70, 100]} />
      </Escena>
      {/* 4 · fase II: pasteurizar a 60 °C, ≥ 2 h */}
      <Escena T={T} a={K.F2} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={300} y={640} width={720} height={500} rx={20} fill="#dfe8ee" stroke={KC.ink} strokeWidth={8} />
          <rect x={300} y={640} width={720} height={60} rx={20} fill="#b9c6cf" stroke={KC.ink} strokeWidth={8} />
          <Cama x={360} y={940} w={600} h={150} seed={4} id="cF2" />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${480 + i * 180} 870 q 20 -40 0 -80 q -20 -40 0 -70`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6 * (0.5 + 0.5 * Math.sin(T * 3 + i))} />)}
          <Reloj T={T} x={850} y={500} r={92} giro={kprog(T, K.F2 + 1.4, K.F2 + 3.3, kEase.suave) * 0.99} />
        </>)}
        <Termometro x={150} y={540} alto={540} valor={temp2} max={100} rango={[59, 61]} marcas={[0, 60, 100]} />
      </Escena>
      {/* 5 · siembra: granos con micelio; el micelio llena la composta */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Cama x={90} y={820} w={900} h={260} seed={7} id="cS" micelio={kprog(T, K.S + 1.0, K.S + 3.6, kEase.suave)} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.S + 0.15 + i * 0.05, u = kprog(T, t0, t0 + 0.6); if (u <= 0) return null;
            return <Grano key={i} x={130 + i * 62} y={klerp(460, 810 + (i % 3) * 8, u * u)} rot={u * 200 + i * 30} s={1.1} />; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿por qué no sale ni un champiñón? */}
      <Escena T={T} a={K.P} b={K.Cb} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cama x={70} y={880} w={470} h={220} seed={7} id="cP" micelio={1} />
          <Interrogacion T={T} x={300} y={780} tam={360} />
        </>)}
      </Escena>
      {/* 7 · la capa de cobertura: turba con caliza encima de la composta */}
      <Escena T={T} a={K.Cb} b={K.O} zoom={0.12} origen="50% 52%">
        <FondoLunares color={KC.mint} />
        {fsvg(<Cama x={90} y={860} w={900} h={230} seed={7} id="cCb" micelio={1} cob={kprog(T, K.Cb + 0.3, K.Cb + 1.2)} />)}
      </Escena>
      {/* 8–9 · por dentro (fondo oscuro): el octenol frena; las bacterias se lo comen */}
      <Escena T={T} a={K.O} b={PRIM} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1b2333 0%, ${KC.dark} 72%)` }}></div>
        <Ambiente T={T} n={22} color="rgba(177,140,255,.25)" />
        {fsvg(<>
          {HIFAS_R.map((r, i) => <HifaTubo key={i} pts={r} g={kprog(T, K.O - 0.4 + i * 0.12, K.O + 1.2 + i * 0.12)} ancho={30} />)}
          {NUBES.map(([nx, ny], i) => { const sale = kprog(T, K.O + 0.6 + i * 0.15, K.O + 1.1 + i * 0.15, kEase.sale), c = comen(i);
            return <Nube key={i} T={T} x={nx} y={ny - sale * 30} s={sale * (1 - c)} o={1 - c * 0.8} seed={i + 1} />; })}
          {NUBES.map(([nx, ny], i) => { const ent = kprog(T, K.B + 0.1 + i * 0.12, K.B + 0.6 + i * 0.12, kEase.sale); if (ent <= 0) return null;
            const bx = klerp(nx + (i % 2 ? 260 : -260), nx - 40, ent), by = klerp(ny + 140, ny + 20, ent);
            return <Bacteria key={i} T={T} x={bx} y={by} largo={96} ancho={40} rot={i % 2 ? 160 : 20} color={CH.bact} seed={i + 5} />; })}
          <Nudo T={T} x={640} y={920} k={nudo} candado={T > K.O + 1.6 ? cand : 0} />
        </>)}
      </Escena>
      {/* 9b · a escala real: brotan los primordios (cabecitas de alfiler) */}
      <Escena T={T} a={PRIM} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Cama x={90} y={880} w={900} h={220} seed={7} id="cPr" micelio={1} cob={1} prim={kprog(T, PRIM + 0.1, PRIM + 1.4)} />)}
      </Escena>
      {/* 10 · el estudio: Noble et al. 2009; sin bacterias, solo con ventilación */}
      <Escena T={T} a={K.E} b={K.Mx} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cama x={110} y={880} w={620} h={170} seed={11} id="cE" micelio={1} cob={1} prim={kprog(T, K.E + 4.5, K.E + 5.4)} />
          {T > K.E + 2.4 && [[260, 760], [420, 730], [580, 770]].map(([nx, ny], i) => <Nube key={i} T={T} x={nx - sopla * 520} y={ny} s={1.6 * kprog(T, K.E + 2.4, K.E + 2.9, kEase.sale)} o={1 - sopla} seed={i + 9} />)}
          {T > K.E + 2.9 && <Ventilador T={T} x={900} y={780} r={95} on={vent} />}
        </>)}
      </Escena>
      {/* 11 · México: 94 % de los hongos cultivados son champiñón (INECOL, 2012) */}
      <Escena T={T} a={K.Mx} b={K.Co} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MapaMexico x={40} y={500} ancho={620} conCA={false} color="#fff4c2">
            {(() => { const [mx, my] = mxProy(-99.1, 19.4); return <Champinon x={mx} y={my + 40} s={0.5 / 0.62} crece={kprog(T, K.Mx + 0.3, K.Mx + 1.2, kEase.sale)} abre={0.2} />; })()}
          </MapaMexico>
          <Pastel x={810} y={950} r={120} p={kprog(T, K.Mx + 2.4, K.Mx + 3.6, kEase.suave)} />
        </>)}
      </Escena>
      {/* 12 · cosecha: oleadas cada 7–10 días */}
      <Escena T={T} a={K.Co} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Cama x={90} y={900} w={900} h={190} seed={7} id="cCo" micelio={1} cob={1} T={T}
            champs={[...OLA.map((dx, i) => [dx, ola1 * (1 - corta), 0.15 + (i % 3) * 0.1, 0.62]), ...OLA.map((dx, i) => [dx + 55, ola2, 0.1 + (i % 2) * 0.15, 0.58])]} />
          {corta > 0 && corta < 1 && <line x1={60 + corta * 960} y1={820} x2={60 + corta * 960 + 120} y2={820} stroke="#fff" strokeWidth={10} strokeLinecap="round" />}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma maceta, ahora con composta, cobertura y champiñones */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Maceta x={380} y={770} s={1.05} relleno="composta" T={T}>
          {[[-95, 0.85, 0.15, 0.62], [95, 0.9, 0.25, 0.6], [-10, 1, 0.92, 0.82], [-140, 0.6, 0.1, 0.42], [140, 0.55, 0, 0.42]].map(([dx, cr, ab, s], i) => <Champinon key={i} x={dx} y={-18} s={s}
            crece={cr * kprog(T, K.C + 0.2 + i * 0.15, K.C + 1.2 + i * 0.15, kEase.sale)} abre={ab} lam={i === 2 ? '#e7a3a0' : '#7a4a3a'} rot={dx * 0.08} />)}
        </Maceta>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.6} until={K.M - 0.3} x={990} y={790} lado="izq" texto="paja + estiércol" tam={30} />
      <Chip T={T} at={K.M + 0.3} until={K.R - 0.3} texto="a los 10 años · tutorial de internet" x={400} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.M + 2.4} until={K.R - 0.3} x={590} y={780} texto="tierra normal" tam={32} />
      {['paja', 'estiércol de caballo', 'gallinaza', 'yeso'].map((t, i) => { const t0 = [0.25, 0.75, 1.75, 2.35][i];
        return <Chip key={i} T={T} at={K.R + t0 + 0.1} until={K.R + t0 + 1.1} texto={t} x={150 + i * 260} y={750} tam={i === 1 ? 24 : 30} borde={KC.ink} />; })}
      <Chip T={T} at={K.R + 0.4} until={K.F1 - 0.3} texto="COMPOSTA" x={540} y={460} tam={44} borde={KC.gold} />
      <Chip T={T} at={K.F1 + 0.3} until={K.F2 - 0.3} texto={`fase I · día ${dia}`} x={500} y={460} tam={36} borde={KC.ink} mono />
      <Chip T={T} at={K.F1 + 0.5} until={K.F2 - 0.3} texto={`${Math.round(temp)} °C`} x={400} y={560} tam={44} borde={KC.red} />
      <Chip T={T} at={K.F1 + 3.1} until={K.F2 - 0.3} texto="> 70 °C: química, no microbios" x={560} y={730} tam={32} borde={KC.yellow} />
      <Chip T={T} at={K.F2 + 0.2} until={K.S - 0.3} texto="fase II · pasteurizar" x={520} y={430} tam={36} borde={KC.ink} mono />
      <Chip T={T} at={K.F2 + 1.0} until={K.S - 0.3} texto="60 °C" x={420} y={600} tam={44} borde={KC.red} />
      <Chip T={T} at={K.F2 + 1.6} until={K.S - 0.3} texto="≥ 2 h" x={850} y={630} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.6} until={K.S + 2.2} x={70} y={600} texto="granos con micelio" tam={32} />
      <Chip T={T} at={K.S + 1.6} until={K.P - 0.3} texto="2 a 3 semanas" x={360} y={470} tam={38} borde={KC.ink} mono />
      <Etq T={T} at={K.S + 2.2} until={K.P - 0.3} x={520} y={1010} texto="micelio" tam={32} />
      <Etq T={T} at={K.Cb + 1.1} until={K.O - 0.3} x={110} y={660} texto="capa de cobertura" tam={34} />
      <Etq T={T} at={K.Cb + 1.5} until={K.O - 0.3} x={110} y={710} texto="turba + caliza" tam={30} />
      <Etq T={T} at={K.Cb + 1.9} until={K.O - 0.3} x={110} y={1130} texto="composta con micelio" tam={28} />
      <Chip T={T} at={K.O + 0.1} until={PRIM - 0.3} texto="POR DENTRO · LA COBERTURA" x={380} y={440} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.O + 0.8} until={K.B - 0.1} x={70} y={560} texto="1-octen-3-ol" tam={34} color={CH.octenol} />
      <Etq T={T} at={K.O + 1.2} until={K.B - 0.1} x={70} y={605} texto="(parte del olor a champiñón)" tam={24} color={CH.octenol} />
      <Etq T={T} at={K.O + 0.4} until={PRIM - 0.3} x={150} y={1150} texto="hifas" tam={28} color="#eafff7" />
      <Etq T={T} at={K.O + 1.7} until={K.B + 1.9} x={1040} y={1070} lado="izq" texto="primordio frenado" tam={26} color={KC.red} />
      <Etq T={T} at={K.B + 0.4} until={PRIM - 0.3} x={70} y={560} texto="Pseudomonas putida" it tam={34} color={CH.bact} />
      <Etq T={T} at={K.B + 0.8} until={PRIM - 0.3} x={70} y={605} texto="bacterias de la cobertura" tam={24} color={CH.bact} />
      <Etq T={T} at={K.B + 2.0} until={PRIM - 0.3} x={1040} y={1070} lado="izq" texto="¡a crecer!" tam={30} color={KC.mint} />
      <Chip T={T} at={PRIM + 0.4} until={K.E - 0.3} texto="primordios" x={400} y={620} tam={40} borde={KC.ink} />
      <Etq T={T} at={PRIM + 0.6} until={K.E - 0.3} x={110} y={720} texto="cabecitas de alfiler" tam={28} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2009" quien="Noble et al. · Reino Unido" revista="Mycologia, 2009" x={400} y={600} />
      <Chip T={T} at={K.E + 2.6} until={K.Mx - 0.3} texto="sin bacterias" x={420} y={1120} tam={30} borde={KC.red} />
      <Etq T={T} at={K.E + 2.8} until={K.E + 3.9} x={130} y={640} texto="1-octen-3-ol y otros" tam={28} />
      <Chip T={T} at={K.E + 4.6} until={K.Mx - 0.3} texto="ayudan, al menos en parte" x={360} y={470} tam={28} borde={KC.mint} />
      <Chip T={T} at={K.E + 5.0} until={K.Mx - 0.3} texto="ventilación → primordios" x={360} y={560} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Mx + 1.8} until={K.Co - 0.3} valor={94} dur={1.2} sufijo=" %" x={330} y={950} tam={200} color={KC.paper} />
      <Etq T={T} at={K.Mx + 3.4} until={K.Co - 0.3} x={700} y={790} texto="champiñón" tam={28} />
      <Chip T={T} at={K.Mx + 2.2} until={K.Co - 0.3} texto="de los hongos cultivados en México · dato de 2012 (INECOL)" x={540} y={1120} tam={22} borde={KC.ink} mono />
      <Chip T={T} at={K.Co + 0.2} until={K.C - 0.3} texto="15–21 días tras la cobertura" x={540} y={450} tam={32} borde={KC.ink} mono />
      <Chip T={T} at={K.Co + 1.0} until={K.C - 0.3} texto="oleadas cada 7–10 días" x={540} y={535} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Co + 0.8} until={K.Co + 2.0} x={70} y={620} texto="1.ª oleada" tam={30} />
      <Etq T={T} at={K.Co + 2.8} until={K.C - 0.3} x={70} y={620} texto="2.ª oleada" tam={30} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="estiércol cocinado" x={330} y={460} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="+ cobertura + bacterias" x={330} y={540} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={590} y={720} texto="Agaricus bisporus" it tam={30} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.M} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.M} until={K.R} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.R} until={K.F2} texto="1 m" largo={260} />
      <BarraEscala T={T} at={K.F2} until={K.S} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.S} until={K.O} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.O} until={PRIM} texto="10 µm (esquemático)" largo={160} />
      <BarraEscala T={T} at={PRIM} until={K.E} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.E} until={K.Mx} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Mx} until={K.Co} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Co} until={K.Ou} texto="5 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="No es tierra: *estiércol cocinado.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.R - 0.1} texto="Yo a los 10 años… *y nada.*" />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.F1 - 0.1} texto="Paja, estiércol, *gallinaza, yeso.*" />
      <Subtitulo T={T} idx={3} at={K.F1 + 0.1} until={K.F2 - 0.1} texto="Arriba de 70 °C: *química.*" />
      <Subtitulo T={T} idx={4} at={K.F2 + 0.1} until={K.S - 0.1} texto="Pasteurizar: *60 °C, 2 h.*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.P - 0.1} texto="El micelio *lo llena todo.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Cb - 0.1} texto="¿Y *por qué no sale?*" />
      <Subtitulo T={T} idx={7} at={K.Cb + 0.1} until={K.O - 0.1} texto="Falta la *capa de cobertura.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.B - 0.1} texto="El octenol *lo frena.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.E - 0.1} texto="Bacterias: *se lo comen.*" />
      <Subtitulo T={T} idx={10} at={K.E + 0.1} until={K.Mx - 0.1} texto="Sin bacterias: *ventilando.*" />
      <Subtitulo T={T} idx={11} at={K.Mx + 0.1} until={K.Co - 0.1} texto="México: *94 % en 2012.*" />
      <Subtitulo T={T} idx={12} at={K.Co + 0.1} until={K.C - 0.1} texto="Oleadas cada *7 a 10 días.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Le faltaba *estiércol cocinado.*" tam={58} />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.M + 0.2, K.R - 0.2, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [K.F1 + 1.0, K.F2 - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S + 1.2, K.P - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.Cb + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.O + 0.6, K.B + 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [PRIM - 0.1, K.E - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.E + 3.2, K.Mx - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Mx + 0.8, K.Co - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="106" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChampinonApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ChampinonShot /></CompositionStage></div>;
}
window.ChampinonApp = ChampinonApp;
