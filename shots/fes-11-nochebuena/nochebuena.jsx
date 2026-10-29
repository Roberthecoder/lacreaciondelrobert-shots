// Shot Festivo #11 · Navidad · Biotecnológico: tu nochebuena es frondosa porque tiene una bacteria — NARRADO (N3 capítulos y medidores + N4 imagen que se llena).
// Guion y fuentes: guion.md (verificacion.md: APROBADO). El dibujo es esquemático: fitoplasmas, floema, hormonas y los puntitos que viajan están simplificados.
const ROJO = '#d7182a', ROJO2 = '#a80f22', VENA = '#7d0a1a', VERDE = '#2f8a3a', VERDE2 = '#1f6a2b', VENAV = '#7fcf6a', TALLO = '#4f7d2a', LENO = '#7a5a3c';
const AMARILLO = '#ffd21a', CIATIO = '#6e9b2e', BARRO = '#b4643a', BARRO2 = '#8f4a26', FITO = '#c79bff', CUSCUTA = '#ff9a1f', VINCA = '#ff6fb0';

const lerp2 = (a, b, t) => [klerp(a[0], b[0], t), klerp(a[1], b[1], t)];
const qpt = (p0, p1, p2, t) => lerp2(lerp2(p0, p1, t), lerp2(p1, p2, t), t);
// Curva cuadrática dibujada solo hasta g (0..1): para tallos que crecen
function qparcial(p0, p1, p2, g) { const c = lerp2(p0, p1, g), e = qpt(p0, p1, p2, g); return { d: `M ${p0[0]} ${p0[1]} Q ${c[0]} ${c[1]} ${e[0]} ${e[1]}`, e }; }

// Bráctea u hoja lanceolada (base en 0,0, apunta hacia arriba). Nervadura pinnada.
function forma(L, w) {
  return `M 0 0 C ${w * 0.9} ${-L * 0.1} ${w * 1.05} ${-L * 0.42} ${w * 0.6} ${-L * 0.7} C ${w * 0.32} ${-L * 0.86} ${w * 0.1} ${-L * 0.95} 0 ${-L} C ${-w * 0.1} ${-L * 0.95} ${-w * 0.32} ${-L * 0.86} ${-w * 0.6} ${-L * 0.7} C ${-w * 1.05} ${-L * 0.42} ${-w * 0.9} ${-L * 0.1} 0 0 Z`;
}
function Hoja({ L = 150, w = 52, rot = 0, color = ROJO, vena = VENA, x = 0, y = 0, venas = 1, borde = 4, lobulos = false }) {
  const vs = [0.18, 0.32, 0.46, 0.6, 0.74];
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d={forma(L, w)} fill={color} stroke={KC.ink} strokeWidth={borde} strokeLinejoin="round" />
    {lobulos && [-1, 1].map((k) => <path key={k} d={`M ${k * w * 0.82} ${-L * 0.36} q ${k * 22} ${-6} ${k * 6} ${-30}`} fill={color} stroke={KC.ink} strokeWidth={borde * 0.8} strokeLinejoin="round" />)}
    <g opacity={venas}>
      <path d={`M 0 ${-L * 0.03} L 0 ${-L * 0.94}`} stroke={vena} strokeWidth={borde * 0.9} strokeLinecap="round" />
      {vs.map((t, i) => [-1, 1].map((k) => <path key={i + '' + k} d={`M 0 ${-L * t} Q ${k * w * 0.35} ${-L * (t + 0.05)} ${k * w * (0.72 - t * 0.5)} ${-L * (t + 0.13)}`} stroke={vena} strokeWidth={borde * 0.6} fill="none" strokeLinecap="round" />))}
    </g>
  </g>;
}
// Racimo de ciatios: copitas verdes con su glándula amarilla de néctar a un lado (las "bolitas amarillas")
function Ciatios({ s = 1, T = 0, brillo = 0 }) {
  const pos = [[0, 0], [-22, -14], [22, -12], [-16, 18], [18, 18], [0, -28], [-30, 6], [30, 6]];
  return <g transform={`scale(${s})`}>
    {pos.map(([px, py], i) => <g key={i} transform={`translate(${px} ${py}) rotate(${i * 47})`}>
      <ellipse cx={0} cy={0} rx={11} ry={12} fill={CIATIO} stroke={KC.ink} strokeWidth={2.6} />
      <ellipse cx={0} cy={0} rx={5} ry={5.5} fill="#3d5e18" />
      <path d="M 4 -12 q 9 -4 12 3 q -5 5 -12 -3 Z" fill={AMARILLO} stroke={KC.ink} strokeWidth={2} />
      <circle cx={-3} cy={-2} r={2.2} fill={ROJO} />
    </g>)}
    {brillo > 0 && pos.map(([px, py], i) => <circle key={'b' + i} cx={px + 10} cy={py - 12} r={10} fill={AMARILLO} opacity={brillo * 0.35 * (0.5 + 0.5 * Math.sin(T * 6 + i))} />)}
  </g>;
}
// Una "flor" de nochebuena: estrella de brácteas (lanceoladas) + hojas verdes debajo + ciatios al centro. rojo 0..1 (verde → rojo).
function Cabeza({ x, y, s = 1, rojo = 1, T = 0, verdes = true, giro = 0, sinBractea = -1, brillo = 0 }) {
  const c1 = mixHex(VERDE, ROJO, rojo), c2 = mixHex(VERDE2, ROJO2, rojo), cv = mixHex(VENAV, VENA, rojo);
  const sway = Math.sin(T * 1.3 + x * 0.01) * 2;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${giro + sway})`}>
    {verdes && [150, 205, 255].map((a, i) => <Hoja key={'v' + i} L={190} w={62} rot={a} color={VERDE} vena={VENAV} lobulos />)}
    {Array.from({ length: 7 }, (_, i) => i === sinBractea ? null : <Hoja key={'o' + i} L={150} w={50} rot={i * (360 / 7) + 10} color={c1} vena={cv} />)}
    {Array.from({ length: 6 }, (_, i) => <Hoja key={'i' + i} L={98} w={34} rot={i * 60 + 38} color={c2} vena={cv} borde={3} />)}
    <Ciatios T={T} brillo={brillo} />
  </g>;
}
function Maceta({ x = 0, y = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -140 0 L 140 0 L 105 175 L -105 175 Z" fill={BARRO} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-158} y={-14} width={316} height={46} rx={10} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <path d="M -120 70 L 120 70" stroke={BARRO2} strokeWidth={6} opacity=".6" /><path d="M -112 120 L 112 120" stroke={BARRO2} strokeWidth={6} opacity=".6" />
    <ellipse cx={0} cy={-12} rx={140} ry={14} fill="#4a3020" />
  </g>;
}
// Ramas laterales de la planta de maceta: nodo en el tallo → punta con su cabeza
const LATERALES = [
  { n: [0, -105], t: [-215, -335] }, { n: [0, -135], t: [215, -355] },
  { n: [0, -200], t: [-120, -455] }, { n: [0, -225], t: [130, -465] },
  { n: [0, -80], t: [-270, -215] }, { n: [0, -95], t: [270, -230] },
];
const TOPE = [0, -540];
// Planta: un tallo principal (siempre) + ramas laterales que brotan según `ramas` (0..1). puntos 0..1: fitoplasmas (esquemáticos) viajando por los tallos.
function Planta({ T, x, y, s = 1, ramas = 1, rojo = 1, puntos = 0, maceta = true, tope = 1, brillo = 0, sinBractea = -1, nRamas = 6 }) {
  const n = Math.min(nRamas, LATERALES.length);
  const tallos = LATERALES.slice(0, n).map((L, i) => {
    const g = kclamp(ramas * n - i, 0, 1), p1 = [L.t[0] * 0.75, L.n[1] - 30];
    return { ...qparcial(L.n, p1, L.t, kEase.sale(g)), g, L, p1 };
  });
  const tp = qparcial([0, 0], [8, TOPE[1] * 0.5], TOPE, tope);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={tp.d} stroke={TALLO} strokeWidth={22} fill="none" strokeLinecap="round" />
    {tallos.map((t, i) => t.g > 0 && <path key={i} d={t.d} stroke={TALLO} strokeWidth={16} fill="none" strokeLinecap="round" />)}
    {/* yemas laterales que despiertan */}
    {tallos.map((t, i) => t.g > 0 && t.g < 0.35 && <circle key={'y' + i} cx={t.L.n[0]} cy={t.L.n[1]} r={14 * (1 + t.g * 2)} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />)}
    {puntos > 0 && Array.from({ length: 10 }, (_, k) => { const u = ((T * 0.35 + k / 10) % 1); const p = qpt([0, 0], [8, TOPE[1] * 0.5], TOPE, u * tope);
      return <circle key={'p' + k} cx={p[0]} cy={p[1]} r={9} fill={FITO} stroke={KC.ink} strokeWidth={2.5} opacity={puntos} />; })}
    {puntos > 0 && tallos.map((t, i) => t.g > 0.6 && [0, 0.5].map((o) => { const p = qpt(t.L.n, t.p1, t.L.t, (T * 0.4 + o + i * 0.13) % 1); return <circle key={'q' + i + o} cx={p[0]} cy={p[1]} r={8} fill={FITO} stroke={KC.ink} strokeWidth={2.5} opacity={puntos} />; }))}
    {tallos.map((t, i) => t.g > 0.55 && <Cabeza key={'c' + i} T={T} x={t.e[0]} y={t.e[1]} s={0.72 * kEase.rebote(kprog(t.g, 0.55, 1))} rojo={rojo} brillo={brillo} />)}
    {tope > 0.6 && <Cabeza T={T} x={tp.e[0]} y={tp.e[1]} s={0.86 * kEase.rebote(kprog(tope, 0.6, 1))} rojo={rojo} brillo={brillo} sinBractea={sinBractea} />}
    {maceta && <Maceta />}
  </g>;
}
// Nochebuena silvestre: arbusto alto (~3 m), tallos leñosos largos, pocas ramas, brácteas chicas en las puntas
function Silvestre({ T, x, y, h = 1050, crece = 1, s = 1 }) {
  const tallos = [
    { p0: [0, 0], p1: [-40, -h * 0.5], p2: [-120, -h], hoj: [0.35, 0.55, 0.72] },
    { p0: [10, 0], p1: [60, -h * 0.45], p2: [150, -h * 0.86], hoj: [0.4, 0.62] },
    { p0: [-5, 0], p1: [-140, -h * 0.3], p2: [-250, -h * 0.62], hoj: [0.5] },
  ];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {tallos.map((t, i) => { const g = kclamp(crece * 1.3 - i * 0.15, 0, 1), q = qparcial(t.p0, t.p1, t.p2, kEase.sale(g));
      return <g key={i}>
        <path d={q.d} stroke={LENO} strokeWidth={20 - i * 3} fill="none" strokeLinecap="round" />
        {t.hoj.map((u, k) => u < g && (() => { const p = qpt(t.p0, t.p1, t.p2, u); return <Hoja key={k} x={p[0]} y={p[1]} L={120} w={40} rot={k % 2 ? 60 : -60} color={VERDE} vena={VENAV} borde={3} lobulos />; })())}
        {g > 0.9 && <Cabeza T={T} x={q.e[0]} y={q.e[1]} s={0.5 * kEase.rebote(kprog(g, 0.9, 1))} />}
      </g>; })}
  </g>;
}
// Persona en silueta (para escala), pies en 0,0, alto h
function Persona({ x, y, h }) {
  const k = h / 340;
  return <g transform={`translate(${x} ${y}) scale(${k})`} opacity=".85">
    <circle cx={0} cy={-305} r={34} fill="#3a2a40" />
    <path d="M -46 -262 L 46 -262 L 58 -140 L 32 -140 L 30 0 L 6 0 L 0 -120 L -6 0 L -30 0 L -32 -140 L -58 -140 Z" fill="#3a2a40" />
  </g>;
}
// Fitoplasma: célula sin pared (solo membrana), de forma variable
function Fito({ x, y, r = 30, T = 0, seed = 1, o = 1 }) {
  const g = krng(seed), ph = g() * 6, pts = Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * Math.PI * 2; const rr = r * (0.78 + 0.32 * Math.sin(a * 2 + ph + T * 1.4) + 0.12 * g()); return [Math.cos(a) * rr, Math.sin(a) * rr * 0.86]; });
  const d = 'M ' + pts.map((p, i) => { const q = pts[(i + 1) % pts.length]; return `${p[0].toFixed(1)} ${p[1].toFixed(1)} Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`; }).join(' T ') + ' Z';
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <path d={d} fill={FITO} fillOpacity=".75" stroke="#efe2ff" strokeWidth={3} />
    {[0, 1, 2, 3].map((k) => <circle key={k} cx={(g() - 0.5) * r} cy={(g() - 0.5) * r * 0.8} r={2.6} fill="#5b2a9a" />)}
  </g>;
}
// Tubo del floema visto de lado (escala micro): paredes, placa cribosa y savia que fluye
function Floema({ T, fitos = 1, x0 = 160, x1 = 920 }) {
  const g = krng(31);
  const savia = Array.from({ length: 34 }, () => [x0 + 30 + g() * (x1 - x0 - 60), g() * 1920, 2 + g() * 4]);
  return <g>
    <rect x={x0 - 70} y={0} width={70} height={1920} fill="#1f5a3a" /><rect x={x1} y={0} width={70} height={1920} fill="#1f5a3a" />
    <line x1={x0} y1={0} x2={x0} y2={1920} stroke="#7fe0b0" strokeWidth={5} /><line x1={x1} y1={0} x2={x1} y2={1920} stroke="#7fe0b0" strokeWidth={5} />
    <rect x={x0} y={0} width={x1 - x0} height={1920} fill="#123a3a" opacity=".55" />
    {[380, 1640].map((py) => <g key={py}><rect x={x0} y={py - 12} width={x1 - x0} height={24} fill="#7fe0b0" opacity=".85" />
      {Array.from({ length: 9 }, (_, k) => <rect key={k} x={x0 + 30 + k * ((x1 - x0 - 60) / 8) - 14} y={py - 13} width={28} height={26} fill="#123a3a" />)}</g>)}
    {savia.map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={(sy + T * 70) % 1920} r={r} fill="#9ff0ff" opacity=".35" />)}
    {Array.from({ length: 14 }, (_, i) => { const a = krng(i + 5), fx = x0 + 70 + a() * (x1 - x0 - 140), fy = 470 + a() * 1080 + Math.sin(T * 0.8 + i) * 18;
      return <Fito key={i} x={fx + Math.cos(T * 0.6 + i) * 10} y={fy} r={26 + a() * 22} T={T} seed={i + 1} o={kclamp(fitos * 14 - i, 0, 1)} />; })}
  </g>;
}
// Reloj de 24 h: la noche (oscuro) ocupa `horas`
function Reloj24({ x, y, r = 170, horas = 0 }) {
  const a = (horas / 24) * Math.PI * 2, ex = Math.sin(a) * r, ey = -Math.cos(a) * r;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 14} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <circle r={r} fill={KC.yellow} />
    {horas > 0.05 && <path d={`M 0 0 L 0 ${-r} A ${r} ${r} 0 ${horas > 12 ? 1 : 0} 1 ${ex} ${ey} Z`} fill="#1b2350" />}
    {Array.from({ length: 24 }, (_, i) => { const b = (i / 24) * Math.PI * 2; return <line key={i} x1={Math.sin(b) * (r - 2)} y1={-Math.cos(b) * (r - 2)} x2={Math.sin(b) * (r - (i % 6 ? 14 : 28))} y2={-Math.cos(b) * (r - (i % 6 ? 14 : 28))} stroke={KC.ink} strokeWidth={i % 6 ? 3 : 6} />; })}
    <line x1={0} y1={0} x2={ex * 0.9} y2={ey * 0.9} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={12} fill={KC.ink} />
    <text x={0} y={r + 76} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">{Math.round(horas)} h de noche</text>
  </g>;
}
function Foco({ x, y, on = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <line x1={0} y1={-400} x2={0} y2={-70} stroke={KC.ink} strokeWidth={6} />
    {on > 0 && <circle cx={0} cy={0} r={260} fill={KC.yellow} opacity={0.22 * on} />}
    {on > 0 && <circle cx={0} cy={0} r={140} fill={KC.yellow} opacity={0.3 * on} />}
    <rect x={-28} y={-78} width={56} height={44} rx={8} fill="#9aa4b2" stroke={KC.ink} strokeWidth={5} />
    <path d="M -24 -36 C -70 -10 -60 60 0 66 C 60 60 70 -10 24 -36 Z" fill={on > 0.5 ? '#fff6b0' : '#d9dde6'} stroke={KC.ink} strokeWidth={6} />
    {on > 0.5 && [0, 1, 2, 3, 4, 5, 6, 7].map((k) => { const b = (k / 8) * Math.PI * 2; return <line key={k} x1={Math.cos(b) * 95} y1={10 + Math.sin(b) * 95} x2={Math.cos(b) * 135} y2={10 + Math.sin(b) * 135} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />; })}
  </g>;
}
function Calendario({ x, y, texto = '24 DIC', sub = '¿?', s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-120} width={260} height={250} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-130} y={-120} width={260} height={70} rx={22} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    {[-70, 70].map((cx) => <rect key={cx} x={cx - 8} y={-140} width={16} height={44} rx={6} fill={KC.ink} />)}
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <text x={0} y={104} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.red}>{sub}</text>
  </g>;
}
// Vinca (Catharanthus roseus): 5 pétalos rosas en molinete con ojo oscuro; hojas ovaladas brillantes en pares
function Vinca({ T, x, y, s = 1 }) {
  const flor = (fx, fy, k) => <g key={k} transform={`translate(${fx} ${fy}) rotate(${k * 30 + Math.sin(T + k) * 3})`}>
    {Array.from({ length: 5 }, (_, i) => <path key={i} d="M 0 0 C 18 -10 40 -30 30 -52 C 18 -64 2 -48 0 0 Z" fill={VINCA} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 72})`} />)}
    <circle r={12} fill="#b0125e" stroke={KC.ink} strokeWidth={2} /><circle r={4} fill="#fff" />
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 0 -300 M 0 -160 Q -50 -200 -80 -260 M 0 -190 Q 50 -230 85 -280" stroke={TALLO} strokeWidth={12} fill="none" strokeLinecap="round" />
    {[[-70, -60], [-60, -130], [-60, -200]].map(([hx, hy], i) => <g key={i}>
      <ellipse cx={hx} cy={hy} rx={58} ry={24} fill={VERDE2} stroke={KC.ink} strokeWidth={4} transform={`rotate(-20 ${hx} ${hy})`} />
      <ellipse cx={-hx} cy={hy - 10} rx={58} ry={24} fill={VERDE2} stroke={KC.ink} strokeWidth={4} transform={`rotate(20 ${-hx} ${hy - 10})`} />
      <path d={`M ${hx - 40} ${hy + 10} L ${hx + 40} ${hy - 12}`} stroke={VENAV} strokeWidth={3} /></g>)}
    {flor(0, -310, 0)}{flor(-82, -268, 1)}{flor(88, -288, 2)}
    <ellipse cx={0} cy={6} rx={110} ry={16} fill="rgba(0,0,0,.2)" />
  </g>;
}
// Termómetro sin números (solo "sube")
function Termo({ x, y, nivel = 0 }) {
  const h = klerp(40, 500, nivel);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-40} y={-560} width={80} height={600} rx={40} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={60} r={66} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={40 - h} width={40} height={h + 20} rx={20} fill={KC.red} />
    {[0, 1, 2, 3, 4].map((k) => <line key={k} x1={40} y1={-60 - k * 100} x2={70} y2={-60 - k * 100} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Balanza de hormonas que se ladea
function Balanza({ x, y, lado = 0 }) {
  const a = lado * 16;
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -70 160 L 70 160 L 14 0 L -14 0 Z" fill="#9aa4b2" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${a})`}>
      <rect x={-230} y={-12} width={460} height={24} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
      {[-1, 1].map((k) => <g key={k} transform={`translate(${k * 210} 0) rotate(${-a})`}>
        <line x1={-50} y1={90} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} /><line x1={50} y1={90} x2={0} y2={0} stroke={KC.ink} strokeWidth={4} />
        <path d="M -70 90 L 70 90 Q 60 130 0 130 Q -60 130 -70 90 Z" fill={k < 0 ? KC.cyan : KC.orange} stroke={KC.ink} strokeWidth={5} />
        {Array.from({ length: k < 0 ? 2 : 5 }, (_, i) => <circle key={i} cx={-36 + (i % 3) * 36} cy={74 - Math.floor(i / 3) * 30} r={16} fill={k < 0 ? '#9fe8ff' : '#ffc27a'} stroke={KC.ink} strokeWidth={3} />)}
      </g>)}
    </g>
    <circle r={16} fill={KC.ink} />
  </g>;
}
// Interior de un ciatio (corte): flor femenina al centro (ovario con estilos) y masculinas (estambres) alrededor; glándula a un lado
function CorteCiatio({ T }) {
  return <g>
    <path d="M -150 -40 C -160 120 -60 170 0 170 C 60 170 160 120 150 -40" fill={CIATIO} stroke={KC.ink} strokeWidth={8} />
    <path d="M 120 -60 q 80 -40 110 20 q -50 50 -110 -20 Z" fill={AMARILLO} stroke={KC.ink} strokeWidth={6} />
    {[-100, -70, -40, 40, 70, 100].map((sx, i) => <g key={i}>
      <path d={`M ${sx * 0.6} 130 Q ${sx} 40 ${sx} ${-30 - (i % 2) * 20}`} stroke="#f2e4a0" strokeWidth={7} fill="none" />
      <ellipse cx={sx} cy={-40 - (i % 2) * 20} rx={14} ry={10} fill={ROJO} stroke={KC.ink} strokeWidth={3} />
    </g>)}
    <path d={`M 0 140 L 0 ${-60 + Math.sin(T * 2) * 4}`} stroke="#7cc04a" strokeWidth={10} />
    <ellipse cx={0} cy={-80} rx={30} ry={26} fill="#7cc04a" stroke={KC.ink} strokeWidth={4} />
    {[-1, 0, 1].map((k) => <path key={k} d={`M ${k * 8} -100 q ${k * 20} -30 ${k * 30} -40`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <text x={0} y={-160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">♀ al centro · ♂ alrededor</text>
  </g>;
}
// Estrellitas doradas de Navidad
function Estrellas({ T, n = 14, seed = 4, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = g() * 1080, y = 260 + g() * 1500, r = 10 + g() * 14, f = g() * 6, k = 0.4 + 0.6 * Math.max(0, Math.sin(T * 2.5 + f));
    return <path key={i} d={`M ${x} ${y - r} L ${x + r * 0.28} ${y - r * 0.28} L ${x + r} ${y} L ${x + r * 0.28} ${y + r * 0.28} L ${x} ${y + r} L ${x - r * 0.28} ${y + r * 0.28} L ${x - r} ${y} L ${x - r * 0.28} ${y - r * 0.28} Z`} fill={KC.gold2} opacity={k} />; })}</g>;
}
// Cerros de selva seca
function Cerros() {
  return <g>
    <path d="M 0 1250 Q 200 1080 420 1210 Q 640 1050 860 1190 Q 980 1120 1080 1180 L 1080 1920 L 0 1920 Z" fill="#e0a65a" opacity=".8" />
    <path d="M 0 1420 Q 260 1300 520 1420 Q 800 1320 1080 1410 L 1080 1920 L 0 1920 Z" fill="#c98a3e" />
    <rect x={0} y={1700} width={1080} height={220} fill="#9b6a2e" />
  </g>;
}

function Nochebuena() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Br: CUES.Bracteas, Ct: CUES.Ciatios, No: CUES.Noches, Fo: CUES.Foco, Si: CUES.Silvestre, P: CUES.Pregunta, Fi: CUES.Fitoplasma, Ho: CUES.Hormonas, E: CUES.Estudio, In: CUES.Injerto, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // bráctea que se desprende en el gancho
  const suelta = kprog(T, K.G + 0.35, K.G + 1.3, kEase.suave);
  const semanas = kprog(T, K.No + 1.6, K.No + 5.2, kEase.suave);
  const focoOn = kprog(T, K.Fo + 0.6, K.Fo + 0.75);
  // estudio: cuscuta de puente (nochebuena infectada → vinca → nochebuena sana)
  const cus1 = [[300, 1180], [380, 920], [510, 1080]], cus2 = [[570, 1060], [690, 900], [800, 1160]];
  const viajan = kprog(T, K.E + 2.6, K.E + 5.6);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la nochebuena llega; una "pétalo" se desprende: es una hoja */}
      <Escena T={T} a={K.G} b={K.Br} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Estrellas T={T} />
          <Planta T={T} x={400} y={1430} s={klerp(0.8, 1.02, kprog(T, K.G, K.G + 0.6, kEase.rebote))} ramas={1} sinBractea={0} />
          {(() => { const px = klerp(400 + 4, 760, suelta), py = klerp(1430 - 540 * 1.02, 760, suelta) - Math.sin(suelta * Math.PI) * 160;
            return <Hoja x={px} y={py} L={150 * klerp(0.88, 1.6, suelta)} w={50 * klerp(0.88, 1.6, suelta)} rot={10 + suelta * 340} color={ROJO} vena={VENA} borde={5} />; })()}
        </>)}
      </Escena>
      {/* 1 · brácteas: la bráctea roja tiene las mismas nervaduras que una hoja verde */}
      <Escena T={T} a={K.Br} b={K.Ct}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Hoja x={320} y={1150} L={520} w={170} rot={-8} color={ROJO} vena={VENA} borde={8} venas={kprog(T, K.Br + 0.6, K.Br + 1.6)} />
          <Hoja x={770} y={1150} L={520} w={170} rot={8} color={VERDE} vena={VENAV} borde={8} venas={kprog(T, K.Br + 0.6, K.Br + 1.6)} lobulos />
          <text x={540} y={880} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Br + 1.6, K.Br + 2.0)}>=</text>
        </>)}
      </Escena>
      {/* 2 · las flores de verdad: los ciatios del centro */}
      <Escena T={T} a={K.Ct} b={K.No} zoom={0.08} origen="50% 48%">
        <FondoLunares color={KC.lilac} />
        {svg(<Cabeza T={T} x={540} y={900} s={klerp(1.6, 2.3, kprog(T, K.Ct, K.Ct + 1.2, kEase.suave))} brillo={kprog(T, K.Ct + 0.6, K.Ct + 1.4)} verdes />)}
        <Lupa T={T} at={K.Ct + 1.7} until={K.No - 0.25} x={560} y={1560} r={200} fx={540} fy={900} tinte={KC.yellow} etiqueta="un ciatio por dentro"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r + 30}) scale(.95)`}><CorteCiatio T={Tl} /></g></svg>} />
      </Escena>
      {/* 3 · noches largas: 14 h de oscuridad, de 7 a 10 semanas; las brácteas pasan de verde a rojo */}
      <Escena T={T} a={K.No} b={K.Fo}>
        <div style={{ position:'absolute', inset:0, background:'#1d2a6e', backgroundImage:'radial-gradient(circle, rgba(255,255,255,.16) 6px, transparent 7px)', backgroundSize:'52px 52px' }}></div>
        {svg(<>
          <Estrellas T={T} n={10} seed={9} />
          <Reloj24 x={300} y={720} r={170} horas={14 * kprog(T, K.No + 0.2, K.No + 1.5, kEase.suave)} />
          <Planta T={T} x={760} y={1500} s={0.62} ramas={1} rojo={semanas} />
        </>)}
      </Escena>
      {/* 4 · un foco interrumpe la noche: se queda verde */}
      <Escena T={T} a={K.Fo} b={K.Si}>
        <div style={{ position:'absolute', inset:0, background:mixHex('#1d2a6e', '#4a4f7a', focoOn), backgroundImage:'radial-gradient(circle, rgba(255,255,255,.16) 6px, transparent 7px)', backgroundSize:'52px 52px' }}></div>
        {svg(<>
          <Foco x={540} y={560} on={focoOn} />
          <Planta T={T} x={420} y={1520} s={0.62} ramas={1} rojo={klerp(0.55, 0.12, kprog(T, K.Fo + 0.8, K.Fo + 2.0))} />
          <g opacity={kprog(T, K.Fo + 2.2, K.Fo + 2.6)}><Calendario x={850} y={1560} s={kEase.rebote(kprog(T, K.Fo + 2.2, K.Fo + 2.7))} /></g>
        </>)}
      </Escena>
      {/* 5 · la silvestre: arbusto de unos tres metros, pocas ramas */}
      <Escena T={T} a={K.Si} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Cerros />
          <Silvestre T={T} x={560} y={1760} h={1050} crece={kprog(T, K.Si + 0.1, K.Si + 2.2)} />
          <Persona x={830} y={1760} h={595} />
          <g opacity={kprog(T, K.Si + 2.2, K.Si + 2.6)}>
            <line x1={150} y1={1760} x2={150} y2={710} stroke={KC.ink} strokeWidth={8} />
            {[0, 1, 2, 3].map((m) => <g key={m}><line x1={130} y1={1760 - m * 350} x2={170} y2={1760 - m * 350} stroke={KC.ink} strokeWidth={8} />
              <text x={190} y={1772 - m * 350} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{m} m</text></g>)}
          </g>
        </>)}
      </Escena>
      {/* 6 · pregunta: la silvestre flaca contra la de tu casa, llena de ramas */}
      <Escena T={T} a={K.P} b={K.Fi} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <text x={800} y={760} textAnchor="middle" style={{ font:`400 420px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 800 600)`}>?</text>
          <Silvestre T={T} x={700} y={1820} h={760} s={0.62} crece={1} />
          <Planta T={T} x={880} y={1650} s={0.5} ramas={1} />
        </>)}
      </Escena>
      {/* 7 · por dentro: un fitoplasma en el floema (oscuro: escala micro) */}
      <Escena T={T} a={K.Fi} b={K.Ho} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<Floema T={T} fitos={kprog(T, K.Fi + 1.4, K.Fi + 4.0)} />)}
      </Escena>
      {/* 8 · desequilibra las hormonas: brotan ramas por todos lados */}
      <Escena T={T} a={K.Ho} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g transform="translate(0 0)"><Balanza x={540} y={640} lado={kprog(T, K.Ho + 0.2, K.Ho + 1.0, kEase.rebote)} /></g>
          <Planta T={T} x={540} y={1560} s={0.7} ramas={kprog(T, K.Ho + 1.0, K.Ho + 4.4)} puntos={1} />
        </>)}
      </Escena>
      {/* 9 · el estudio: 1997, Maryland — cuscuta de puente: nochebuena infectada → vinca → nochebuena sana */}
      <Escena T={T} a={K.E} b={K.In}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Planta T={T} x={200} y={1440} s={0.45} ramas={1} puntos={1} />
          <Vinca T={T} x={540} y={1300} s={0.95} />
          <Planta T={T} x={880} y={1440} s={0.45} ramas={kprog(T, K.E + 5.0, K.E + 6.8)} puntos={kprog(T, K.E + 4.8, K.E + 5.2)} />
          {(() => { const dib = kprog(T, K.E + 1.8, K.E + 2.8);
            const camino = (c) => { const q = qparcial(c[0], c[1], c[2], dib); return <g><path d={q.d} stroke={CUSCUTA} strokeWidth={9} fill="none" strokeLinecap="round" /><path d={q.d} stroke="#ffd08a" strokeWidth={3} fill="none" strokeDasharray="6 14" /></g>; };
            return <g>{camino(cus1)}{camino(cus2)}
              {viajan > 0 && Array.from({ length: 6 }, (_, k) => { const u = viajan * 1.6 - k * 0.12; if (u < 0 || u > 2) return null;
                const p = u < 1 ? qpt(cus1[0], cus1[1], cus1[2], u) : qpt(cus2[0], cus2[1], cus2[2], u - 1);
                return <circle key={k} cx={p[0]} cy={p[1]} r={12} fill={FITO} stroke={KC.ink} strokeWidth={3} />; })}
            </g>; })()}
        </>)}
      </Escena>
      {/* 10 · injerto: una rama infectada vuelve frondosa a una de pocas ramas */}
      <Escena T={T} a={K.In} b={K.Da}>
        <FondoLunares color={KC.cyan} />
        {svg((() => { const llega = kprog(T, K.In + 0.3, K.In + 1.4, kEase.suave), cinta = kprog(T, K.In + 1.4, K.In + 1.9);
          return <>
            <Planta T={T} x={540} y={1560} s={0.78} ramas={kprog(T, K.In + 2.4, K.In + 5.2)} puntos={kprog(T, K.In + 1.9, K.In + 2.4)} />
            <g transform={`translate(${klerp(900, 560, llega)} ${klerp(820, 1255, llega)}) rotate(${klerp(-30, -38, llega)})`}>
              <path d="M 0 0 L 0 -170" stroke={TALLO} strokeWidth={15} strokeLinecap="round" />
              <Cabeza T={T} x={0} y={-170} s={0.42} />
              {[0.3, 0.7].map((u, k) => <circle key={k} cx={0} cy={-170 * u} r={8} fill={FITO} stroke={KC.ink} strokeWidth={2.5} />)}
            </g>
            {cinta > 0 && <rect x={520} y={1260} width={80 * cinta} height={34} rx={8} fill={KC.white} stroke={KC.ink} strokeWidth={5} transform="rotate(-38 560 1277)" />}
          </>; })())}
      </Escena>
      {/* 11 · dato: con mucho calor puede perder la bacteria y ramifica poco */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Termo x={170} y={1160} nivel={kprog(T, K.Da + 0.2, K.Da + 1.6, kEase.suave)} />
          <Planta T={T} x={600} y={1580} s={0.72} ramas={klerp(1, 0, kprog(T, K.Da + 1.7, K.Da + 2.4))} nRamas={6} puntos={1 - kprog(T, K.Da + 1.2, K.Da + 1.8)} />
          {T > K.Da + 2.4 && <Planta T={T} x={600} y={1580} s={0.72} ramas={kprog(T, K.Da + 2.5, K.Da + 4.2) * 0.34} nRamas={6} />}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma nochebuena del inicio, ahora con su bacteria a la vista */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Estrellas T={T} o={kprog(T, K.Ci + 0.3, K.Ci + 1.0)} n={22} />
          <Planta T={T} x={400} y={1430} s={1.02} ramas={1} brillo={kprog(T, K.Ci + 0.4, K.Ci + 1.2)} puntos={kprog(T, K.Ci + 1.4, K.Ci + 2.0)} />
        </>)}
        <Lupa T={T} at={K.Ci + 1.2} until={K.Ou - 0.2} x={830} y={1560} r={180} fx={404} fy={1300} tinte={FITO} etiqueta="fitoplasmas en el floema"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(.42) translate(-540 -1000)`}><Floema T={Tl} fitos={1} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Br, titulo: 'La hoja roja' }, { at: K.No, titulo: 'La noche larga' }, { at: K.Fi, titulo: 'El inquilino' }, { at: K.In, titulo: 'El injerto' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Br - 0.2} texto="Especial Navidad" x={540} y={1560} tam={42} borde={KC.red} />
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.5} until={K.G + 2.4} texto="¿pétalo?" x={790} y={600} tam={52} />
      <Etq T={T} at={K.G + 2.2} until={K.Br - 0.3} x={700} y={560} texto="hoja" tam={46} color={KC.ink} />
      <Etq T={T} at={K.Br + 0.3} until={K.Ct - 0.3} x={110} y={500} texto="bráctea" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Br + 0.5} until={K.Ct - 0.3} x={640} y={500} texto="hoja verde" tam={40} color={KC.ink} />
      <Chip T={T} at={K.Br + 1.4} until={K.Ct - 0.3} texto="bráctea = hoja modificada" x={540} y={1560} tam={44} borde={KC.red} />
      <Etq T={T} at={K.Ct + 0.9} until={K.Ct + 1.9} x={600} y={500} texto="ciatios" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Ct + 2.3} until={K.No - 0.3} x={640} y={1430} texto="glándula de néctar" tam={28} color={KC.ink} />
      <Medidor T={T} at={K.No + 1.5} until={K.Fo - 0.3} y={1500} x={60} ancho={460} etiqueta="semanas" valor={(t) => 0.3 + 0.7 * semanas} texto={(v) => Math.round(v * 10) + ''} color={KC.red} />
      <Chip T={T} at={K.No + 3.4} until={K.Fo - 0.3} texto="de 7 a 10 semanas" x={300} y={1680} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Fo + 1.0} until={K.Si - 0.3} texto="¡clic! se corta la noche" x={540} y={950} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Si + 0.6} until={K.P - 0.3} texto="cuetlaxóchitl" x={420} y={520} tam={48} borde={KC.leaf} />
      <Etq T={T} at={K.Si + 1.0} until={K.P - 0.3} x={250} y={600} texto="Euphorbia pulcherrima" it tam={32} color={KC.ink} />
      <Chip T={T} at={K.Si + 2.6} until={K.P - 0.3} texto="silvestre: ≈ 3 m" x={400} y={1560} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.Si + 2.8} until={K.P - 0.3} x={960} y={1300} texto="1.7 m" tam={30} color={KC.ink} lado="izq" />
      {T > K.Fi - 0.3 && T < K.Ho + 0.2 && <Escala T={T} z={1} pxPorMm={90000} x={60} y={1500} />}
      <Etq T={T} at={K.Fi + 0.4} until={K.Ho - 0.3} x={300} y={300} texto="floema (tubo de savia)" tam={32} color="#9ff0e0" />
      <Etq T={T} at={K.Fi + 2.0} until={K.Ho - 0.3} x={420} y={1080} texto="fitoplasma" tam={40} color={FITO} />
      <Chip T={T} at={K.Fi + 3.6} until={K.Ho - 0.3} texto="bacteria sin pared" x={620} y={1660} tam={42} borde={FITO} />
      <Etq T={T} at={K.Ho + 0.3} until={K.Ho + 2.6} x={360} y={480} texto="hormonas" tam={38} color={KC.ink} />
      <Chip T={T} at={K.Ho + 2.4} until={K.E - 0.3} texto="ramas por todos lados" x={540} y={1680} tam={42} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="1997" quien="Ing-Ming Lee y equipo · Maryland" revista="Nature Biotechnology" x={540} y={620} />
      <Etq T={T} at={K.E + 2.0} until={K.In - 0.3} x={330} y={830} texto="cuscuta (parásita)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 2.5} until={K.In - 0.3} x={470} y={1450} texto="vinca · Catharanthus roseus" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.In - 0.3} x={40} y={1580} texto="infectada" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.E + 5.0} x={1040} y={1580} texto="sana" tam={30} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.E + 5.4} until={K.In - 0.3} texto="¡se ramificó!" x={800} y={560} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.In + 1.5} until={K.In + 3.6} x={640} y={1320} texto="injerto" tam={36} color={KC.ink} />
      <Chip T={T} at={K.In + 2.6} until={K.Da - 0.3} texto="se contagia por injerto" x={540} y={1690} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.Da + 0.3} until={K.Da + 2.2} x={250} y={700} texto="mucho calor" tam={36} color={KC.ink} />
      <Chip T={T} at={K.Da + 2.8} until={K.Ci - 0.3} texto="ramifica poco" x={620} y={1690} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou} texto="hojas rojas + una bacteria" x={540} y={520} tam={42} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Br - 0.1} texto="No son pétalos: *son hojas.*" />
      <Subtitulo T={T} idx={1} at={K.Br + 0.1} until={K.Ct - 0.1} texto="Brácteas: *hojas de color.*" />
      <Subtitulo T={T} idx={2} at={K.Ct + 0.1} until={K.No - 0.1} texto="Las flores: *los ciatios.*" />
      <Subtitulo T={T} idx={3} at={K.No + 0.1} until={K.Fo - 0.1} texto="14 horas de noche, *de 7 a 10 semanas.*" />
      <Subtitulo T={T} idx={4} at={K.Fo + 0.1} until={K.Si - 0.1} texto="Un foco y *no se pinta.*" />
      <Subtitulo T={T} idx={5} at={K.Si + 0.1} until={K.P - 0.1} texto="Silvestre: *3 metros, pocas ramas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Fi - 0.1} texto="¿Por qué la tuya *tiene tantas ramas?*" />
      <Subtitulo T={T} idx={7} at={K.Fi + 0.1} until={K.Ho - 0.1} texto="En su savia: *un fitoplasma.*" />
      <Subtitulo T={T} idx={8} at={K.Ho + 0.1} until={K.E - 0.1} texto="Hormonas revueltas: *más ramas.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.In - 0.1} texto="1997: la pasaron *por un puente parásito.*" />
      <Subtitulo T={T} idx={10} at={K.In + 0.1} until={K.Da - 0.1} texto="Con un injerto *se contagia.*" />
      <Subtitulo T={T} idx={11} at={K.Da + 0.1} until={K.Ci - 0.1} texto="Con calor *pierde la bacteria.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Hojas rojas *y una bacteria.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Bracteas, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Ciatios + 0.3, CUES.Ciatios + 3.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Foco + 0.8, CUES.Foco + 4.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Fitoplasma + 0.9, 'avatar_07_pensativo_puno', 'grande-izq'],
        [CUES.Hormonas + 0.4, CUES.Hormonas + 4.6, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Estudio + 2.6, CUES.Injerto - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Dato + 0.3, CUES.Dato + 4.6, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="bioquimica" serie="Festivo" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NochebuenaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Nochebuena /></CompositionStage></div>;
}
window.NochebuenaApp = NochebuenaApp;
