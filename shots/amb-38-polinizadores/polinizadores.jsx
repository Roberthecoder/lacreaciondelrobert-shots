// Shot Ambiental #38 · ¿Sin abejas nos morimos de hambre? Lo que le pasa a tu desayuno — NARRADO (N4 la imagen que se vacía).
// Datos: IPBES 2016 (evaluación de polinizadores), Klein et al. 2007, Cooley y Vallejo-Marín 2021, Dymond et al. 2021. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (tamaños y cantidades del plato no son a escala).

const PZ_ROJO = '#e0392b', PZ_AMAR = '#ffd23f', PZ_VERDE = '#3f8f2f', PZ_VERDEO = '#2c5e1d';

// Brillo de resaltado (aro que late) para el plato.
function Aro({ T, x, y, r, on }) {
  if (on <= 0) return null;
  return <circle cx={x} cy={y} r={r + 10 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.pink} strokeWidth={8} opacity={on} strokeDasharray="18 12" />;
}
// "Puf": nube que aparece cuando algo desaparece. p 0..1.
function Puf({ x, y, p, r = 90 }) {
  if (p <= 0 || p >= 1) return null;
  const o = Math.sin(Math.PI * p);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2, d = r * (0.3 + 0.9 * p);
      return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={r * 0.38 * (1 - p * 0.5)} fill="#f2f2f2" stroke={KC.ink} strokeWidth={4} />; })}
    <circle r={r * 0.5 * (1 - p)} fill="#fff" />
  </g>;
}
// Taza vista desde arriba. nivel 0..1 (1 = llena), color del líquido, espuma (chocolate batido).
function Taza({ x, y, s = 1, color = '#5a2f17', nivel = 1, espuma = false, o = 1, T = 0 }) {
  if (o <= 0) return null;
  const r = 46 * (0.55 + 0.45 * nivel);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={84} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={56} y={-14} width={42} height={28} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle r={62} fill="#fbf7ef" stroke={KC.ink} strokeWidth={6} />
    <circle r={r} fill={color} />
    {espuma && <>{[[-14, -10, 12], [12, -16, 9], [16, 12, 11], [-10, 16, 8], [2, 0, 7]].map(([a, b, rr], i) => <circle key={i} cx={a} cy={b} r={rr * (0.9 + 0.1 * Math.sin(T * 3 + i))} fill="#d9b48a" opacity={0.9} />)}</>}
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.35} ry={r * 0.15} fill="#fff" opacity={0.3} />
  </g>;
}
// Flor de calabaza vista desde arriba (5 lóbulos puntiagudos, naranja).
function FlorCalabaza({ x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 34 : 74; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d="M 0 0 L -10 60 L 0 80 L 10 60 Z" fill="#5fae3c" stroke={KC.ink} strokeWidth={4} transform={`rotate(${36 + i * 72})`} />)}
    <polygon points={pts} fill="#ff9f1c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={0} y1={0} x2={0} y2={-58} stroke="#e8740c" strokeWidth={4} transform={`rotate(${i * 72})`} />)}
    <circle r={20} fill={PZ_AMAR} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Medio aguacate visto desde arriba.
function Aguacate({ x, y, s = 1, rot = 0 }) {
  if (s <= 0) return null;
  const d = 'M 0 -78 C 44 -78 62 -22 62 20 C 62 60 34 82 0 82 C -34 82 -62 60 -62 20 C -62 -22 -44 -78 0 -78 Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} fill={PZ_VERDEO} stroke={KC.ink} strokeWidth={6} />
    <path d={d} fill="#b9d86a" transform="scale(.84) translate(0 4)" />
    <path d={d} fill="#e4ee9c" transform="scale(.6) translate(0 14)" />
    <circle cx={0} cy={24} r={26} fill="#8a5a2b" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-8} cy={16} rx={8} ry={5} fill="#fff" opacity={0.35} />
  </g>;
}
// Molcajete con salsa roja vista desde arriba.
function Salsa({ x, y, s = 1 }) {
  if (s <= 0) return null;
  const r = krng(5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={80} fill="#6d6762" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * 72} cy={Math.sin(a) * 72} r={3} fill="#4d4844" />; })}
    <circle r={60} fill="#d8341f" />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={(r() - 0.5) * 80} cy={(r() - 0.5) * 80} r={3 + r() * 4} fill={i % 3 ? '#f7e6c4' : '#3e9b3a'} opacity={0.9} />)}
  </g>;
}
// Pila de tortillas vista desde arriba.
function Tortillas({ x, y, s = 1 }) {
  const r = krng(11);
  const manchas = Array.from({ length: 18 }, () => [(r() - 0.5) * 170, (r() - 0.5) * 170, 4 + r() * 8]).filter(([a, b]) => a * a + b * b < 90 * 90);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[16, 14], [8, 7], [0, 0]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={112} fill={i === 2 ? '#f2d58e' : '#e3c070'} stroke={KC.ink} strokeWidth={6} />)}
    {manchas.map(([a, b, rr], i) => <ellipse key={i} cx={a} cy={b} rx={rr} ry={rr * 0.7} fill="#b9873a" opacity={0.55} />)}
  </g>;
}
// El desayuno completo. Coordenadas: centro del plato en (x, y). hl = índice resaltado (0 tortillas … 5 chocolate).
// choc, flor: 0..1 (visible) · avo, salsa: escala · cafe: 1 = lleno y oscuro, 0 = bajo y pálido.
function Desayuno({ T, x, y, s = 1, choc = 1, flor = 1, avo = 1, salsa = 1, cafe = 1, hl = [] }) {
  const h = (i) => hl[i] || 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={262} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <circle r={226} fill="none" stroke="#e3ddd2" strokeWidth={6} />
    <Tortillas x={-80} y={50} />
    <Salsa x={120} y={-100} s={salsa} />
    <Aguacate x={125} y={115} s={avo} rot={-20} />
    <FlorCalabaza x={-70} y={-140} o={flor} />
    <Taza x={390} y={-170} color={mixHex('#c79a6a', '#3a1f0e', cafe)} nivel={0.45 + 0.55 * cafe} />
    <Taza x={-390} y={-170} color="#5a2f17" espuma o={choc} T={T} />
    <Aro T={T} x={-80} y={50} r={112} on={h(0)} />
    <Aro T={T} x={120} y={-100} r={80} on={h(1)} />
    <Aro T={T} x={125} y={115} r={80} on={h(2)} />
    <Aro T={T} x={-70} y={-140} r={74} on={h(3)} />
    <Aro T={T} x={390} y={-170} r={84} on={h(4)} />
    <Aro T={T} x={-390} y={-170} r={84} on={h(5)} />
  </g>;
}
// Abejorro (Bombus) de perfil, mirando a la derecha: 2 pares de alas, 6 patas, canasta de polen en la pata trasera, antenas acodadas.
function Abejorro({ T, x, y, s = 1, rot = 0, vib = 0, id = 'a' }) {
  const ala = 0.35 + 0.65 * Math.abs(Math.sin(T * 47));
  const jx = vib * Math.sin(T * 120) * 4, jy = vib * Math.cos(T * 97) * 3;
  return <g transform={`translate(${x + jx} ${y + jy}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={'ab' + id}><ellipse cx={-42} cy={8} rx={48} ry={36} /></clipPath></defs>
    {/* patas */}
    {[[-2, 24, -14, 58], [12, 26, 14, 60], [24, 22, 40, 52]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${(a + c) / 2 - 6} ${(b + d) / 2 + 4} L ${c} ${d}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-14} cy={46} rx={11} ry={8} fill="#ff9f1c" stroke={KC.ink} strokeWidth={3} />
    {/* abdomen con franjas */}
    <ellipse cx={-42} cy={8} rx={48} ry={36} fill="#16120f" stroke={KC.ink} strokeWidth={5} />
    <g clipPath={`url(#ab${id})`}>
      <rect x={-62} y={-40} width={20} height={90} fill={PZ_AMAR} />
      <rect x={-96} y={-40} width={16} height={90} fill="#f4efe4" />
    </g>
    <ellipse cx={-42} cy={8} rx={48} ry={36} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="3 5" />
    {/* tórax */}
    <circle cx={6} cy={0} r={30} fill="#16120f" stroke={KC.ink} strokeWidth={5} />
    <path d="M -10 -26 Q 8 -36 26 -22 L 22 -8 Q 6 -18 -8 -12 Z" fill={PZ_AMAR} />
    {/* cabeza */}
    <circle cx={42} cy={8} r={19} fill="#16120f" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={46} cy={2} rx={7} ry={10} fill="#3a3530" />
    <path d="M 50 -6 L 60 -26 L 74 -22" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    {/* alas */}
    <g opacity={0.8}>
      <ellipse cx={-14} cy={-38} rx={42} ry={16 * ala} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform="rotate(-18 -14 -38)" />
      <ellipse cx={-22} cy={-26} rx={30} ry={11 * ala} fill="rgba(220,240,255,.65)" stroke={KC.ink} strokeWidth={3} transform="rotate(-8 -22 -26)" />
    </g>
  </g>;
}
// Abeja de la miel (Apis mellifera): más delgada, dorada con franjas cafés, 2 pares de alas.
function AbejaMiel({ T, x, y, s = 1, rot = 0, id = 'm' }) {
  const ala = 0.35 + 0.65 * Math.abs(Math.sin(T * 53 + 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={'am' + id}><ellipse cx={-38} cy={6} rx={44} ry={22} /></clipPath></defs>
    {[[-2, 16, -12, 44], [10, 18, 12, 46], [20, 14, 34, 40]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${(a + c) / 2 - 4} ${(b + d) / 2 + 3} L ${c} ${d}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-38} cy={6} rx={44} ry={22} fill="#e2a33a" stroke={KC.ink} strokeWidth={5} />
    <g clipPath={`url(#am${id})`}>{[-56, -38, -20].map((a) => <rect key={a} x={a} y={-30} width={9} height={70} fill="#5a3412" />)}</g>
    <ellipse cx={-38} cy={6} rx={44} ry={22} fill="none" stroke={KC.ink} strokeWidth={5} />
    <circle cx={4} cy={0} r={20} fill="#b0772c" stroke={KC.ink} strokeWidth={5} />
    <circle cx={30} cy={4} r={14} fill="#5a3412" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={33} cy={0} rx={5} ry={8} fill="#2a2420" />
    <path d="M 36 -6 L 44 -22 L 54 -20" stroke={KC.ink} strokeWidth={3.5} fill="none" strokeLinecap="round" />
    <g opacity={0.85}>
      <ellipse cx={-12} cy={-28} rx={34} ry={13 * ala} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={3} transform="rotate(-18 -12 -28)" />
      <ellipse cx={-18} cy={-18} rx={24} ry={9 * ala} fill="rgba(220,240,255,.65)" stroke={KC.ink} strokeWidth={3} />
    </g>
  </g>;
}
// Mosca azul (Calliphoridae): cuerpo verde-azul metálico, ojos rojos grandes y UN solo par de alas (díptero).
function Mosca({ T, x, y, s = 1, rot = 0 }) {
  const ala = 0.4 + 0.6 * Math.abs(Math.sin(T * 61));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[[-4, 14, -14, 40], [6, 16, 6, 44], [16, 12, 28, 38]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} L ${(a + c) / 2 - 4} ${(b + d) / 2 + 3} L ${c} ${d}`} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-26} cy={4} rx={30} ry={22} fill="#1d8f86" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-32} cy={-4} rx={12} ry={6} fill="#9ff2e6" opacity={0.6} />
    <circle cx={4} cy={0} r={18} fill="#17706a" stroke={KC.ink} strokeWidth={5} />
    {[-6, 2, 10].map((a) => <line key={a} x1={a} y1={-16} x2={a - 2} y2={-26} stroke={KC.ink} strokeWidth={3} />)}
    <circle cx={26} cy={4} r={14} fill="#2b2522" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={30} cy={0} rx={9} ry={11} fill="#c0302a" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={-14} cy={-24} rx={34} ry={12 * ala} fill="rgba(225,240,255,.7)" stroke={KC.ink} strokeWidth={3} transform="rotate(-12 -14 -24)" />
  </g>;
}
// Planta de maíz: caña con nudos, hojas largas, espiga arriba (flor macho) y elote con pelos (flor hembra).
function PlantaMaiz({ T, x, y, s = 1 }) {
  const m = (k) => Math.sin(T * 1.6 + k) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 Q -6 -380 ${m(0) * 0.5} -760`} stroke="#6aa83a" strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d={`M 0 0 Q -6 -380 ${m(0) * 0.5} -760`} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" opacity={0.0} />
    {[-130, -260, -390, -520, -640].map((h, i) => <line key={h} x1={-15} y1={h} x2={15} y2={h} stroke="#3f7a22" strokeWidth={6} />)}
    {[[-120, 1], [-250, -1], [-380, 1], [-500, -1], [-620, 1]].map(([h, d], i) =>
      <path key={i} d={`M 0 ${h} Q ${d * 160} ${h - 120 + m(i)} ${d * 300} ${h + 10 + m(i) * 2} Q ${d * 170} ${h - 70} 0 ${h - 26} Z`} fill="#5fae3c" stroke={KC.ink} strokeWidth={5} />)}
    {/* espiga */}
    <g transform={`translate(${m(0) * 0.5} -760) rotate(${m(1) * 0.4})`}>
      <path d="M 0 0 L 0 -130" stroke="#c9b25a" strokeWidth={8} />
      {[[-1, -40], [1, -55], [-1, -75], [1, -90], [-1, -105]].map(([d, h], i) => <path key={i} d={`M 0 ${h} Q ${d * 40} ${h - 10} ${d * 70} ${h + 30}`} stroke="#c9b25a" strokeWidth={6} fill="none" strokeLinecap="round" />)}
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={(i % 2 ? 1 : -1) * (10 + (i % 4) * 14)} cy={-30 - i * 8} r={5} fill={PZ_AMAR} stroke={KC.ink} strokeWidth={1.5} />)}
    </g>
    {/* elote con pelos */}
    <g transform="translate(14 -330) rotate(28)">
      <path d="M 0 0 C 30 -30 34 -110 10 -170 C -14 -110 -24 -30 0 0 Z" fill="#7cc04e" stroke={KC.ink} strokeWidth={5} />
      <path d="M 4 -30 C 22 -60 20 -120 10 -150" stroke="#4f8f2c" strokeWidth={4} fill="none" />
      {[-12, -6, 0, 6, 12].map((a, i) => <path key={i} d={`M 10 -168 q ${a} -30 ${a * 2.2 + m(i)} -60`} stroke="#e8b3a0" strokeWidth={4} fill="none" strokeLinecap="round" />)}
    </g>
  </g>;
}
// Granos de polen que el viento lleva de la espiga a los pelos del elote (coordenadas absolutas).
function PolenViento({ T, t0, x0, y0, x1, y1, n = 18 }) {
  if (T < t0) return null;
  const r = krng(21);
  return <g>{Array.from({ length: n }, (_, i) => { const off = r() * 1.4, u = ((T - t0) * 0.45 + off) % 1, w = Math.sin(u * 6 + i) * 30;
    return <circle key={i} cx={klerp(x0, x1, u) + w + r() * 40} cy={klerp(y0, y1, u) + r() * 60} r={6} fill={PZ_AMAR} stroke={KC.ink} strokeWidth={2} opacity={Math.sin(Math.PI * u)} />; })}</g>;
}
// Árbol de cacao: tronco con flores chiquitas y mazorcas pegadas al tronco (caulifloria).
function Cacaotero({ T, x, y, s = 1, flores = 1 }) {
  const flor = (fx, fy, k) => <g key={k} transform={`translate(${fx} ${fy}) scale(${flores})`}>
    {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={0} cy={-9} rx={5} ry={10} fill="#fbeff2" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${i * 72})`} />)}
    <circle r={4} fill="#d65a8a" /></g>;
  const vaina = (vx, vy, rot, c, k) => <g key={k} transform={`translate(${vx} ${vy}) rotate(${rot})`}>
    <line x1={0} y1={-20} x2={0} y2={-46} stroke="#6b4a2a" strokeWidth={8} />
    <ellipse cx={0} cy={70} rx={46} ry={96} fill={c} stroke={KC.ink} strokeWidth={6} />
    {[-24, -8, 8, 24].map((a) => <path key={a} d={`M ${a} -14 Q ${a * 1.25} 70 ${a} 156`} stroke="rgba(0,0,0,.25)" strokeWidth={4} fill="none" />)}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 460 L -56 -420 L 56 -420 L 74 460 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
    {[-300, -150, 20, 180, 330].map((h, i) => <path key={h} d={`M ${-40 + (i % 2) * 20} ${h} q 20 30 4 70`} stroke="#5e3b1f" strokeWidth={5} fill="none" />)}
    {[[-30, -420, -1], [30, -420, 1]].map(([a, b, d], i) => <path key={i} d={`M ${a} ${b} Q ${d * 120} ${b - 60} ${d * 200} ${b - 30}`} stroke="#8a5a33" strokeWidth={22} fill="none" strokeLinecap="round" />)}
    {[[-200, -460, -30], [210, -440, 30], [-120, -500, -10], [120, -520, 15]].map(([a, b, r], i) => <ellipse key={i} cx={a} cy={b} rx={90} ry={34} fill="#3f8a3a" stroke={KC.ink} strokeWidth={5} transform={`rotate(${r} ${a} ${b})`} />)}
    {vaina(-66, -160, 22, '#e8a531', 'v1')}{vaina(64, 60, -18, '#b5482a', 'v2')}{vaina(-70, 210, 14, '#d9c13a', 'v3')}
    {[[-40, -260], [-28, -246], [-46, -240], [30, -100], [44, -88], [26, -80], [-30, 100], [-44, 112], [36, 270], [50, 282], [28, 290]].map(([a, b], i) => flor(a, b, i))}
  </g>;
}
// Rama de café: hojas opuestas brillantes, flores blancas en racimos y cerezas rojas.
function RamaCafe({ T, x, y, s = 1, cerezas = 1, flores = 1 }) {
  const hoja = (hx, hy, rot, k) => <g key={k} transform={`translate(${hx} ${hy}) rotate(${rot})`}>
    <path d="M 0 0 C 30 -40 120 -40 170 0 C 120 40 30 40 0 0 Z" fill="#2f7a2c" stroke={KC.ink} strokeWidth={5} />
    <path d="M 6 0 L 160 0" stroke="#9ad67a" strokeWidth={3} /></g>;
  const nodos = [[-260, 60], [-90, 20], [80, -20], [250, -60]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -380 90 Q 0 0 380 -90" stroke="#6b4a2a" strokeWidth={14} fill="none" strokeLinecap="round" />
    {nodos.map(([a, b], i) => <g key={i}>{hoja(a, b, -70 - 10 * Math.sin(T + i), 'h' + i)}{hoja(a, b, 110 + 10 * Math.sin(T + i), 'g' + i)}</g>)}
    {nodos.map(([a, b], i) => <g key={'c' + i} transform={`translate(${a} ${b})`}>
      {(i % 2 === 0) && [[-18, -10], [0, -22], [18, -8]].map(([c, d], j) => <g key={j} transform={`translate(${c} ${d}) scale(${flores})`}>
        {[0, 1, 2, 3, 4].map((q) => <ellipse key={q} cx={0} cy={-11} rx={5} ry={12} fill="#fff" stroke={KC.ink} strokeWidth={2.5} transform={`rotate(${q * 72})`} />)}<circle r={4} fill={PZ_AMAR} /></g>)}
      {(i % 2 === 1) && [[-16, 12], [4, 20], [22, 8], [-4, -4]].slice(0, Math.max(1, Math.round(4 * cerezas))).map(([c, d], j) => <g key={j}><ellipse cx={c} cy={d} rx={15} ry={17} fill={PZ_ROJO} stroke={KC.ink} strokeWidth={4} /><circle cx={c} cy={d + 12} r={3} fill="#7a1a12" /></g>)}
    </g>)}
  </g>;
}
// Jitomate entero (de frente) con su cáliz verde.
function Jitomate({ x, y, r = 180, rot = 0 }) {
  const cal = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.12 : r * 0.42; return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr * 0.55 - r * 0.86).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={r * 1.08} ry={r} fill={PZ_ROJO} stroke={KC.ink} strokeWidth={9} />
    {[-0.5, 0, 0.5].map((k) => <path key={k} d={`M ${k * r} ${-r * 0.92} Q ${k * r * 1.5} 0 ${k * r} ${r * 0.92}`} stroke="rgba(0,0,0,.14)" strokeWidth={8} fill="none" />)}
    <ellipse cx={-r * 0.45} cy={-r * 0.35} rx={r * 0.25} ry={r * 0.14} fill="#fff" opacity={0.35} transform={`rotate(-30 ${-r * 0.45} ${-r * 0.35})`} />
    <polygon points={cal} fill="#3f9a3a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-8} y={-r * 1.12} width={16} height={r * 0.28} rx={6} fill="#3f9a3a" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Flor de jitomate de lado (cuelga hacia abajo): pétalos amarillos doblados hacia atrás y cono de anteras con el poro en la punta.
function FlorJitomate({ T, x, y, s = 1, vib = 0 }) {
  const j = vib * Math.sin(T * 120) * 2.5;
  return <g transform={`translate(${x + j} ${y}) scale(${s})`}>
    <path d="M 0 -30 Q 10 -140 -60 -230" stroke="#4f9a3a" strokeWidth={12} fill="none" strokeLinecap="round" />
    {[-60, -25, 25, 60].map((a, i) => <path key={i} d={`M 0 -10 L ${a * 1.2} ${-40 - Math.abs(a) * 0.2} L ${a * 0.4} -14 Z`} fill="#4f9a3a" stroke={KC.ink} strokeWidth={3} />)}
    {[-150, -105, -60, 60, 105, 150].slice(0, 6).map((a, i) => <path key={i} d="M 0 0 C 18 -30 18 -90 0 -120 C -18 -90 -18 -30 0 0 Z" fill={PZ_AMAR} stroke={KC.ink} strokeWidth={5} transform={`rotate(${a * 0.62 + (a > 0 ? 0 : 0)})`} />)}
    <path d="M -36 0 L 36 0 L 10 170 L -10 170 Z" fill="#f6c21c" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-18, 0, 18].map((a) => <line key={a} x1={a} y1={4} x2={a * 0.3} y2={166} stroke="#c99a0a" strokeWidth={3} />)}
    <ellipse cx={0} cy={172} rx={7} ry={4} fill={KC.ink} />
  </g>;
}
// Una antera en corte (esquema): tubo con granos de polen adentro y un poro en la punta. vib 0..1 = la sacuden.
function AnteraCorte({ T, r, vib = 0 }) {
  const cx = r, top = r * 0.25, bot = r * 1.62, w = r * 0.42;
  const g = krng(31), granos = Array.from({ length: 26 }, () => [cx + (g() - 0.5) * w * 1.3, top + 20 + g() * (bot - top - 60)]);
  const sale = Array.from({ length: 10 }, (_, i) => { const u = ((T * 1.3 + i / 10) % 1); return [cx + Math.sin(i * 2.3) * 30 * u, bot + u * r * 0.4, 1 - u]; });
  const j = vib * Math.sin(T * 110) * 4;
  return <svg width={r * 2} height={r * 2}>
    <rect width={r * 2} height={r * 2} fill="#0e1622" />
    <g transform={`translate(${j} 0)`}>
      <path d={`M ${cx - w} ${top} Q ${cx - w} ${top - 30} ${cx} ${top - 30} Q ${cx + w} ${top - 30} ${cx + w} ${top} L ${cx + w * 0.5} ${bot} L ${cx + 9} ${bot + 6} L ${cx - 9} ${bot + 6} L ${cx - w * 0.5} ${bot} Z`} fill="#3a2f12" stroke={PZ_AMAR} strokeWidth={6} />
      {granos.map(([a, b], i) => <circle key={i} cx={a + vib * Math.sin(T * 90 + i) * 3} cy={b} r={7} fill={PZ_AMAR} stroke="#7a5a10" strokeWidth={2} />)}
    </g>
    {vib > 0.3 && sale.map(([a, b, o], i) => <circle key={i} cx={a} cy={b} r={7} fill={PZ_AMAR} opacity={o} />)}
    <text x={cx + 40} y={bot + 10} style={{ font:`700 24px ${KF.mono}` }} fill="#fff">poro</text>
    <text x={cx} y={r * 1.95} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill="#9fb3c8">esquema</text>
  </svg>;
}
// Flor de aguacate (chiquita, 6 tépalos verde amarillo).
function FlorAguacate({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={0} cy={-24} rx={12} ry={24} fill="#dfe58a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 60})`} />)}
    <circle r={14} fill="#c8cf52" stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={Math.cos(i) * 9} cy={Math.sin(i) * 9} r={3} fill="#f4c25a" />)}
  </g>;
}
// Cuatro casillas que se llenan ("más de 3/4 de los tipos de cultivo principales").
function Casillas({ T, t0, x = 90, y = 780, lado = 195, gap = 40 }) {
  const fill = (i) => i < 3 ? kprog(T, t0 + i * 0.5, t0 + 0.5 + i * 0.5, kEase.sale) : 0.14 * kprog(T, t0 + 1.6, t0 + 2.0, kEase.sale);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {[0, 1, 2, 3].map((i) => { const X = x + i * (lado + gap), f = fill(i);
      return <g key={i}><rect x={X} y={y} width={lado} height={lado} rx={24} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={7} />
        <rect x={X + 10} y={y + lado - 10 - (lado - 20) * f} width={(lado - 20) * (i < 3 ? 1 : 1)} height={(lado - 20) * f} rx={14} fill={KC.pink} />
        {f > 0.9 && <FlorAguacate x={X + lado / 2} y={y + lado / 2} s={1.3} />}</g>; })}
  </svg>;
}
// Barra de la cosecha mundial por volumen: 60 % no dependen · 35 % dependen en parte · 5 % sin evaluar; y el 5–8 % que se perdería.
function BarraCosecha({ T, t0, x = 90, y = 760, ancho = 900, alto = 150 }) {
  const a = kprog(T, t0, t0 + 0.8, kEase.sale), b = kprog(T, t0 + 2.2, t0 + 3.0, kEase.sale);
  const w60 = ancho * 0.6 * a, w35 = ancho * 0.35 * a, w5 = ancho * 0.05 * a;
  const p0 = x + ancho * 0.6, p5 = ancho * 0.05, p8 = ancho * 0.08;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs><pattern id="pzray" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill={KC.red} /><rect width="7" height="16" fill="#ff8a7a" /></pattern></defs>
    <rect x={x - 6} y={y - 6} width={ancho + 12} height={alto + 12} rx={22} fill={KC.ink} />
    <rect x={x} y={y} width={w60} height={alto} rx={16} fill={KC.gold2} />
    <rect x={x + ancho * 0.6} y={y} width={w35} height={alto} fill={KC.pink} />
    <rect x={x + ancho * 0.95} y={y} width={w5} height={alto} fill="#9aa3ad" />
    {a > 0.6 && <text x={x + ancho * 0.3} y={y + alto / 2 + 30} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink}>60 %</text>}
    {a > 0.6 && <text x={x + ancho * 0.775} y={y + alto / 2 + 22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>35 %</text>}
    {b > 0 && <g opacity={b}>
      <rect x={p0} y={y} width={p5} height={alto} fill="url(#pzray)" stroke={KC.ink} strokeWidth={4} />
      <rect x={p0 + p5} y={y} width={p8 - p5} height={alto} fill="url(#pzray)" opacity={0.5} stroke={KC.ink} strokeWidth={3} strokeDasharray="8 6" />
      <path d={`M ${p0} ${y + alto + 20} L ${p0} ${y + alto + 40} L ${p0 + p8} ${y + alto + 40} L ${p0 + p8} ${y + alto + 20}`} stroke={KC.ink} strokeWidth={6} fill="none" />
      <line x1={p0 + p8 / 2} y1={y + alto + 40} x2={p0 + p8 / 2} y2={y + alto + 80} stroke={KC.ink} strokeWidth={6} />
    </g>}
  </svg>;
}

function PolinizadoresShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pl: CUES.Plato, M: CUES.Maiz, Ca: CUES.Cacao, Cf: CUES.Cafe, P: CUES.Pregunta, Z: CUES.Zumbido, E: CUES.Estudio, To: CUES.Toneladas, Mo: CUES.Moscas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // resaltado de cada alimento cuando la voz lo nombra (Plato)
  const hlT = [0.1, 0.75, 1.85, 2.45, 3.45, 3.95].map((d) => K.Pl + d);
  const hl = hlT.map((t, i) => kprog(T, t, t + 0.2) * (1 - kprog(T, (hlT[i + 1] || K.M - 0.3) + 0.3, (hlT[i + 1] || K.M - 0.3) + 0.5)));
  // vuelo del abejorro en el gancho
  const vu = kprog(T, K.G - 0.4, K.G + 4.6);
  // café que baja y se aclara
  const cafeN = 1 - kprog(T, K.Cf + 0.8, K.Cf + 3.0, kEase.suave);
  // plato transformado en el cierre
  const tr = kprog(T, K.C + 0.3, K.C + 2.2, kEase.suave);
  const vibZ = kprog(T, K.Z + 1.6, K.Z + 2.0) * (1 - kprog(T, K.Z + 5.8, K.Z + 6.2));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el desayuno lleno y un abejorro que pasa */}
      <Escena T={T} a={K.G} b={K.Pl} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Desayuno T={T} x={540} y={930} />
          <Abejorro T={T} id="g" x={klerp(-120, 1200, vu)} y={600 + Math.sin(vu * 14) * 40} s={1.1} rot={Math.sin(vu * 14 + 1) * 10} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el plato: cada alimento se ilumina al nombrarlo */}
      <Escena T={T} a={K.Pl} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {svg(<Desayuno T={T} x={540} y={930} hl={hl} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · maíz: el viento lleva el polen de la espiga a los pelos del elote */}
      <Escena T={T} a={K.M} b={K.Ca}>
        <FondoLunares color={KC.mint} />
        {svg(<><PlantaMaiz T={T} x={330} y={1190} />
          {[0, 1, 2].map((i) => { const u = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${100 + u * 500} ${470 + i * 70} q 60 -24 120 0 t 120 0`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u) * 0.9} />; })}
          <PolenViento T={T} t0={K.M + 0.3} x0={320} y0={400} x1={420} y1={820} />
          <Tortillas x={800} y={1050} s={0.85} />
          {T > K.M + 1.6 && <g transform={`translate(905 935) scale(${kprog(T, K.M + 1.6, K.M + 2.1, kEase.rebote)})`}><circle r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M -20 0 L -4 16 L 22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · cacao y calabaza: desaparecen */}
      <Escena T={T} a={K.Ca} b={K.Cf}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Cacaotero T={T} x={790} y={760} s={0.95} />
          <Taza x={300} y={880} s={1.35} color="#5a2f17" espuma T={T} o={1 - kprog(T, K.Ca + 0.5, K.Ca + 0.8)} />
          <Puf x={300} y={880} p={kprog(T, K.Ca + 0.45, K.Ca + 1.4)} r={110} />
          <FlorCalabaza x={300} y={1110} s={1.15} o={1 - kprog(T, K.Ca + 4.5, K.Ca + 4.8)} />
          <Puf x={300} y={1110} p={kprog(T, K.Ca + 4.45, K.Ca + 5.4)} r={90} />
          {/* insecto diminuto junto a una flor del tronco */}
          <g transform={`translate(${760 + Math.sin(T * 5) * 20} ${660 + Math.cos(T * 7) * 12})`}><circle r={5} fill={KC.ink} /><ellipse cx={-2} cy={-6} rx={7} ry={3} fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={1.5} /></g></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · café: rinde menos o sale peor */}
      <Escena T={T} a={K.Cf} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<><RamaCafe T={T} x={540} y={640} s={1.15} cerezas={0.25 + 0.75 * cafeN} />
          <Taza x={540} y={1060} s={1.4} color={mixHex('#c79a6a', '#3a1f0e', cafeN)} nivel={0.45 + 0.55 * cafeN} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta: ¿y el jitomate? */}
      <Escena T={T} a={K.P} b={K.Z} zoom={0.08}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Jitomate x={290} y={900} r={185} rot={Math.sin(T * 3) * 4} />
          <text x={290} y={640} textAnchor="middle" style={{ font:`400 280px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 540)`}>?</text></>)}
      </Escena>
      {/* 7 · polinización por zumbido (fondo oscuro: de cerca) */}
      <Escena T={T} a={K.Z} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 45%, #1d2a44 0%, #0d1424 70%)' }}></div>
        {svg(<><FlorJitomate T={T} x={470} y={520} s={1.3} vib={vibZ} />
          <Abejorro T={T} id="z" x={klerp(800, 522, kprog(T, K.Z + 0.3, K.Z + 1.4, kEase.sale))} y={klerp(900, 660, kprog(T, K.Z + 0.3, K.Z + 1.4, kEase.sale))} s={1.1} rot={100} vib={vibZ} />
          {vibZ > 0 && [0, 1, 2].map((i) => { const u = ((T * 2 + i / 3) % 1); return <circle key={i} cx={520} cy={660} r={60 + u * 120} fill="none" stroke={KC.yellow} strokeWidth={5} opacity={(1 - u) * vibZ} />; })}
          {vibZ > 0 && Array.from({ length: 10 }, (_, i) => { const u = ((T * 1.5 + i / 10) % 1); return <circle key={i} cx={470 + Math.sin(i * 2.1) * 40 * u} cy={760 + u * 130} r={7} fill={PZ_AMAR} stroke="#7a5a10" strokeWidth={2} opacity={(1 - u) * vibZ} />; })}
          <AbejaMiel T={T} id="z2" x={190 + Math.sin(T * 2) * 20} y={990 + Math.cos(T * 3) * 10} s={1.1} rot={-6} /></>)}
      </Escena>
      <Lupa T={T} at={K.Z + 2.0} until={K.E - 0.3} x={830} y={960} r={140} fx={470} fy={700} tinte={KC.yellow} etiqueta="POR DENTRO · ANTERA"
        interior={(t, r) => <AnteraCorte T={t} r={r} vib={vibZ} />} />
      {/* 8 · el estudio: IPBES 2016 */}
      <Escena T={T} a={K.E} b={K.To}>
        <FondoLunares color={KC.mint} />
        <Casillas T={T} t0={K.E + 3.4} />
      </Escena>
      {/* 9 · en toneladas: 5–8 % */}
      <Escena T={T} a={K.To} b={K.Mo}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <BarraCosecha T={T} t0={K.To + 0.2} />
      </Escena>
      {/* 10 · dato raro: moscas en la flor del aguacate */}
      <Escena T={T} a={K.Mo} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<><path d="M 1100 1150 Q 860 900 820 640" stroke="#6b4a2a" strokeWidth={14} fill="none" strokeLinecap="round" />
          {[[820, 640, 1.3], [700, 760, 1.15], [930, 780, 1.2], [790, 900, 1.05], [960, 960, 1.0]].map(([a, b, s], i) => <g key={i}><line x1={a} y1={b} x2={a + 40} y2={b + 60} stroke="#6b4a2a" strokeWidth={6} /><FlorAguacate x={a} y={b} s={s} /></g>)}
          <AbejaMiel T={T} id="mo" x={700 + Math.sin(T * 3) * 6} y={720} s={0.9} rot={10} />
          <Mosca T={T} x={klerp(1180, 930, kprog(T, K.Mo + 0.3, K.Mo + 1.2, kEase.sale))} y={klerp(560, 742, kprog(T, K.Mo + 0.3, K.Mo + 1.2, kEase.sale))} s={1.6} rot={-8} /></>)}
      </Escena>
      {/* 11 · cierre: el mismo plato, ya transformado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Desayuno T={T} x={540} y={930} choc={1 - tr} flor={1 - tr} avo={1 - 0.4 * tr} salsa={1 - 0.3 * tr} cafe={1 - tr} />
          <Puf x={150} y={760} p={kprog(T, K.C + 0.3, K.C + 1.2)} r={80} /><Puf x={470} y={790} p={kprog(T, K.C + 0.6, K.C + 1.5)} r={70} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.15} tacharEn={K.G + 2.3} until={K.Pl - 0.2} texto="sin abejas = hambre" x={310} y={470} tam={40} />
      <Etq T={T} at={hlT[0]} until={K.M - 0.2} x={338} y={1060} texto="tortillas" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={hlT[1]} until={K.M - 0.2} x={610} y={600} texto="salsa de jitomate" tam={30} color={KC.ink} />
      <Etq T={T} at={hlT[2]} until={K.M - 0.2} x={738} y={1100} texto="aguacate" tam={30} color={KC.ink} />
      <Etq T={T} at={hlT[3]} until={K.M - 0.2} x={398} y={628} texto="flor de calabaza" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={hlT[4]} until={K.M - 0.2} x={850} y={890} texto="café" tam={30} color={KC.ink} />
      <Etq T={T} at={hlT[5]} until={K.M - 0.2} x={262} y={890} texto="chocolate" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 0.4} until={K.Ca - 0.2} x={400} y={440} texto="espiga: polen" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.2} until={K.Ca - 0.2} x={520} y={760} texto="pelos del elote" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 1.8} until={K.Ca - 0.2} texto="se quedan" x={810} y={1170} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Cf - 0.2} x={730} y={500} texto="Theobroma cacao" it lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.2} until={K.Cf - 0.2} x={740} y={600} texto="flores en el tronco" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.6} until={K.Cf - 0.2} texto="sin visitas: casi sin cacao" x={540} y={1440} tam={32} borde={KC.red} />
      <Etq T={T} at={K.Cf + 0.3} until={K.P - 0.2} x={300} y={440} texto="Coffea" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Cf + 1.2} until={K.P - 0.2} texto="rinde menos o peor calidad" x={540} y={1440} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Z + 1.0} until={K.E - 0.3} x={400} y={800} texto="abejorro" lado="izq" tam={30} />
      <Etq T={T} at={K.Z + 3.6} until={K.E - 0.3} x={110} y={1080} texto="abeja de la miel: no vibra" lado="der" tam={26} />
      <Chip T={T} at={K.Z + 1.8} until={K.E - 0.3} texto="bzzz: polinización por zumbido" x={540} y={1440} tam={30} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.9} anio="2016" quien="IPBES · Kuala Lumpur, Malasia" revista="evaluación de polinizadores" x={540} y={560} />
      <Chip T={T} at={K.E + 3.6} until={K.To - 0.2} texto="más de 3/4 de los cultivos principales" x={540} y={1080} tam={32} borde={KC.pink} />
      <Chip T={T} at={K.E + 4.6} until={K.To - 0.2} texto="dependen en algún grado" x={540} y={1160} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.To + 1.3} until={K.Mo - 0.2} texto="cosecha mundial (por volumen)" x={540} y={640} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.To + 1.5} until={K.Mo - 0.2} x={240} y={1040} texto="60 %: no los necesitan" lado="der" tam={26} color={KC.ink} />
      <Etq T={T} at={K.To + 1.9} until={K.Mo - 0.2} x={240} y={1085} texto="(cereales, raíces)" lado="der" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.To + 2.6} until={K.Mo - 0.2} valor={8} desde={5} dur={0.8} prefijo="5–" sufijo=" %" etiqueta="se perdería:" x={540} y={1500} tam={120} color={KC.red} />
      <Etq T={T} at={K.Mo + 0.9} until={K.C - 0.2} x={1060} y={520} texto="mosca azul" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Mo + 1.3} until={K.C - 0.2} x={1040} y={1080} texto="flor de aguacate" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou - 0.1} x={338} y={1060} texto="te quedan" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou - 0.1} texto="vitamina A · hierro · folato" x={360} y={470} tam={30} borde={KC.gold} fondo={`rgba(14,15,18,${0.82 - 0.4 * kprog(T, K.C + 4.0, K.C + 5.0)})`} color={mixHex('#F6F3EC', '#7a7a7a', kprog(T, K.C + 4.0, K.C + 5.0))} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pl - 0.1} texto="¿Sin abejas, *hambre?*" />
      <Subtitulo T={T} idx={1} at={K.Pl + 0.1} until={K.M - 0.1} texto="Tu desayuno: *6 cosas.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.Ca - 0.1} texto="El maíz: *viento o solo.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.Cf - 0.1} texto="El chocolate *desaparece.*" />
      <Subtitulo T={T} idx={4} at={K.Cf + 0.1} until={K.P - 0.1} texto="El café *rinde menos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Z - 0.1} texto="¿Y el *jitomate?*" />
      <Subtitulo T={T} idx={6} at={K.Z + 0.1} until={K.E - 0.1} texto="Abejorros: *lo sacuden.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.To - 0.1} texto="Más de *3/4* de cultivos." />
      <Subtitulo T={T} idx={8} at={K.To + 0.1} until={K.Mo - 0.1} texto="Se perdería *5 a 8 %.*" />
      <Subtitulo T={T} idx={9} at={K.Mo + 0.1} until={K.C - 0.1} texto="Aguacate: *moscas.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="No hambre: *menos sabor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_06_pensativo_menton', 'gancho'],
        [CUES.Maiz + 0.5, CUES.Maiz + 5.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Cacao + 1.0, CUES.Cacao + 5.0, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Zumbido + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Zumbido + 2.6, CUES.Zumbido + 6.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 4.8, CUES.Toneladas + 0.9, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Moscas + 0.1, CUES.Cierre - 0.1, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 1.9, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="38" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PolinizadoresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PolinizadoresShot /></CompositionStage></div>;
}
window.PolinizadoresApp = PolinizadoresApp;
