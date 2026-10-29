// Shot Químico #44 · Ese brillo de tu jarrito puede ser plomo (barro vidriado con greta) — NARRADO (N1 por dentro + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Barro sí, plomo no: respeto a los alfareros.
const BARRO = '#c8642f', BARRO_OSC = '#9c4520', CRUDO = '#d9a27a', CAFE = '#5b2e14', PB = '#9aa3ad', HMAS = '#5fe3ff', SALSA = '#d7351f';

// Jarrito de barro. vidrio 0..1 = cuánto esmalte tiene (0 = crudo, mate), cafe 0..1 = nivel de café, destello 0..1 = brillo que recorre.
function Jarrito({ x, y, s = 1, vidrio = 1, cafe = 0, destello = -1, sello = 0, id = 'j' }) {
  const cuerpo = 'M -150 -170 Q -175 -60 -150 60 Q -125 160 -80 175 L 80 175 Q 125 160 150 60 Q 175 -60 150 -170 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 140 -110 Q 260 -110 250 0 Q 240 100 135 95" fill="none" stroke={KC.ink} strokeWidth={46} strokeLinecap="round" />
    <path d="M 140 -110 Q 260 -110 250 0 Q 240 100 135 95" fill="none" stroke={mixHex(CRUDO, BARRO, vidrio)} strokeWidth={30} strokeLinecap="round" />
    <clipPath id={id + 'c'}><path d={cuerpo} /></clipPath>
    <path d={cuerpo} fill={CRUDO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <g clipPath={`url(#${id}c)`}>
      <rect x={-200} y={175 - 360 * vidrio} width={400} height={360 * vidrio} fill={BARRO} />
      {vidrio > 0.95 && [-90, -30, 30, 90].map((dx, i) => <g key={i} transform={`translate(${dx} ${20 + (i % 2) * 40})`}>
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-14} rx={8} ry={14} fill="#fff4dc" transform={`rotate(${a})`} />)}
        <circle r={7} fill={KC.yellow} /></g>)}
      {vidrio > 0.95 && <path d="M -150 -100 Q 0 -80 150 -100" stroke="#fff4dc" strokeWidth={8} fill="none" strokeDasharray="4 18" strokeLinecap="round" />}
      {vidrio > 0.3 && <path d="M -110 -150 Q -135 -40 -110 90" stroke="#fff" strokeWidth={20} fill="none" opacity={0.35 * vidrio} strokeLinecap="round" />}
      {destello >= 0 && destello <= 1 && <rect x={-260 + destello * 520} y={-220} width={50} height={440} fill="#fff" opacity={0.75} transform="skewX(-20)" />}
    </g>
    <ellipse cx={0} cy={-170} rx={152} ry={34} fill={mixHex(CRUDO, BARRO_OSC, vidrio)} stroke={KC.ink} strokeWidth={10} />
    {cafe > 0 && <ellipse cx={0} cy={-170 + 6} rx={128 * cafe + 10} ry={24 * cafe + 3} fill={CAFE} />}
    {sello > 0 && <g transform={`translate(0 40) rotate(-12) scale(${klerp(1.8, 1, kclamp(sello, 0, 1))})`} opacity={kclamp(sello * 2, 0, 1)}>
      <rect x={-135} y={-50} width={270} height={100} rx={18} fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
      <text x={0} y={22} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>SIN PLOMO</text></g>}
  </g>;
}
// Olla de barro para servir el café (inclina en grados).
function Olla({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <ellipse cx={-150} cy={-40} rx={30} ry={18} fill="none" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={150} cy={-40} rx={30} ry={18} fill="none" stroke={KC.ink} strokeWidth={10} />
    <path d="M -120 -110 Q -200 -20 -140 80 Q -60 150 0 150 Q 60 150 140 80 Q 200 -20 120 -110 Z" fill={BARRO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={0} cy={-110} rx={122} ry={26} fill={BARRO_OSC} stroke={KC.ink} strokeWidth={9} />
    <path d="M -90 -60 Q -120 0 -90 60" stroke="#fff" strokeWidth={14} opacity={0.3} fill="none" strokeLinecap="round" />
  </g>;
}
// Costal de polvo (greta o sílice).
function Costal({ x, y, s = 1, inclina = 0, color = '#f4efe4', polvo = '#ccc', texto, sub }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <path d="M -110 -150 L 110 -150 Q 140 0 120 150 L -120 150 Q -140 0 -110 -150 Z" fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -110 -150 Q 0 -190 110 -150" fill={polvo} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-10} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <text x={0} y={50} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>{sub}</text>
  </g>;
}
// Chorro de polvo (granitos que caen).
function Polvo({ T, x0, y0, x1, y1, color, o = 1, seed = 1 }) {
  if (o <= 0) return null;
  const R = krng(seed);
  return <g opacity={o}>{Array.from({ length: 26 }, (_, i) => { const ph = R(), u = (T * 1.6 + ph) % 1, dx = (R() - 0.5) * 30;
    return <circle key={i} cx={klerp(x0, x1, u) + dx * u} cy={klerp(y0, y1, u * u)} r={5 + R() * 5} fill={color} stroke={KC.ink} strokeWidth={2} />; })}</g>;
}
// Cazuela con esmalte.
function Cazuela({ x, y, s = 1, liquido = '#e8e2d0', T = 0, mezcla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -40 Q -190 110 0 120 Q 190 110 200 -40 Z" fill={BARRO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={0} cy={-40} rx={200} ry={44} fill={BARRO_OSC} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={-36} rx={176} ry={34} fill={liquido} />
    {mezcla > 0 && <path d={`M ${-90} -36 Q 0 ${-70 + Math.sin(T * 8) * 14} 90 -36`} stroke="rgba(0,0,0,.25)" strokeWidth={6} fill="none" />}
  </g>;
}
// Horno de leña tradicional (domo de adobe).
function Horno({ T, x, y, s = 1, fuego = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 200 L -300 0 Q -300 -260 0 -270 Q 300 -260 300 0 L 300 200 Z" fill="#b5713f" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    {[[-200, -60], [-80, -160], [60, -120], [190, -40], [-150, 80], [150, 90]].map(([a, b], i) => <rect key={i} x={a - 45} y={b - 20} width={90} height={40} rx={8} fill="#a3622f" stroke="rgba(0,0,0,.25)" strokeWidth={4} />)}
    <path d="M -130 200 L -130 60 Q -130 -40 0 -40 Q 130 -40 130 60 L 130 200 Z" fill="#2b1308" stroke={KC.ink} strokeWidth={10} />
    {fuego > 0 && [-80, -40, 0, 40, 80].map((dx, i) => { const h = (90 + Math.sin(T * 13 + i * 1.7) * 26) * fuego; return <path key={i} d={`M ${dx - 26} 195 Q ${dx - 10} ${195 - h * 0.6} ${dx} ${195 - h} Q ${dx + 10} ${195 - h * 0.6} ${dx + 26} 195 Z`} fill={i % 2 ? KC.yellow : KC.orange} stroke={KC.ink} strokeWidth={4} />; })}
  </g>;
}
// Termómetro de horno: valor 0..1 contra la marca "lo justo".
function TermoHorno({ x, y, valor = 0, marca = 0.78, alto = 560, ok = false }) {
  const yv = alto * valor, ym = alto * marca;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-34} y={-alto - 20} width={68} height={alto + 40} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-18} y={-yv} width={36} height={yv + 10} rx={12} fill={ok ? KC.mint : KC.red} />
    <circle cx={0} cy={40} r={56} fill={ok ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={9} />
    <line x1={-70} x2={70} y1={-ym} y2={-ym} stroke={KC.ink} strokeWidth={8} strokeDasharray="14 10" />
    <text x={-84} y={-ym + 12} textAnchor="end" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>lo justo</text>
  </g>;
}
// Red de vidrio (sílice) esquemática: nodos Si con O entre ellos. Coordenadas locales (0..w, 0..h).
const RED = (() => {
  const R = krng(11), paso = 120, nodos = [], idx = {};
  for (let f = 0; f < 15; f++) for (let c = 0; c < 11; c++) { const x = c * paso + (f % 2) * paso / 2 + (R() - 0.5) * 30, y = f * paso * 0.87 + (R() - 0.5) * 30; idx[f + ',' + c] = nodos.length; nodos.push([x, y]); }
  const enl = [];
  for (let f = 0; f < 15; f++) for (let c = 0; c < 11; c++) { const a = idx[f + ',' + c];
    const vec = [[f, c + 1], [f + 1, c + (f % 2)], [f + 1, c - 1 + (f % 2)]];
    vec.forEach(([g, d]) => { const b = idx[g + ',' + d]; if (b != null && R() > 0.12) enl.push([a, b]); }); }
  // sitios de plomo (huecos de la red)
  const pb = [[2, 3], [3, 7], [5, 1], [6, 5], [7, 9], [9, 3], [10, 6], [12, 2], [12, 8], [4, 4]].map(([f, c]) => { const a = nodos[idx[f + ',' + c]], b = nodos[idx[f + ',' + (c + 1)]], d = nodos[idx[(f + 1) + ',' + c]]; return [(a[0] + b[0] + d[0]) / 3, (a[1] + b[1] + d[1]) / 3]; });
  return { nodos, enl, pb, w: 11 * paso, h: 15 * paso * 0.87 };
})();
// sal[i] = 0..1 cuánto ha salido el plomo i (sube y se va). h = 0..1 llegada de H⁺. cerrada = sin plomo (red completa).
function RedVidrio({ T, x = 0, y = 0, s = 1, sal = [], h = [], conPb = true, cerrada = false }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {RED.enl.map(([a, b], i) => <line key={i} x1={RED.nodos[a][0]} y1={RED.nodos[a][1]} x2={RED.nodos[b][0]} y2={RED.nodos[b][1]} stroke="#7fd3ff" strokeWidth={7} opacity={0.55} />)}
    {RED.enl.map(([a, b], i) => <circle key={'o' + i} cx={(RED.nodos[a][0] + RED.nodos[b][0]) / 2} cy={(RED.nodos[a][1] + RED.nodos[b][1]) / 2} r={11} fill={QA.O} stroke={KC.ink} strokeWidth={3} />)}
    {RED.nodos.map(([nx, ny], i) => <circle key={'n' + i} cx={nx} cy={ny} r={20} fill="#c9b8ff" stroke={KC.ink} strokeWidth={4} />)}
    {conPb && RED.pb.map(([px, py], i) => { const u = sal[i] || 0, hh = h[i] || 0, j = Math.sin(T * 9 + i * 2) * 6;
      const X = px + j + u * (i % 2 ? 60 : -60), Y = py - u * (py + 260);
      return <g key={'p' + i}>
        {hh > 0 && hh < 1 && <g><circle cx={klerp(px + 40, px + 10, hh)} cy={klerp(-200, py - 30, hh)} r={16} fill={HMAS} stroke={KC.ink} strokeWidth={4} />
          <text x={klerp(px + 40, px + 10, hh)} y={klerp(-200, py - 30, hh) - 22} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={HMAS}>H⁺</text></g>}
        <circle cx={X} cy={Y} r={34} fill={PB} stroke={u > 0 ? KC.red : KC.ink} strokeWidth={u > 0 ? 7 : 5} />
        <text x={X} y={Y + 11} textAnchor="middle" style={{ font:`700 ${u > 0 ? 26 : 30}px ${KF.mono}` }} fill={KC.ink}>{u > 0 ? 'Pb²⁺' : 'Pb'}</text>
      </g>; })}
    {cerrada && RED.pb.map(([px, py], i) => <circle key={'c' + i} cx={px} cy={py} r={14} fill="#c9b8ff" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Barra de escala esquemática (siempre visible).
function BarraEscala({ texto, x = 60, y = 1830, largo = 160, color = KC.ink }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:30, display:'flex', alignItems:'center', gap:14 }}>
    <div style={{ width:largo, height:10, background:color, borderLeft:`4px solid ${color}`, borderRight:`4px solid ${color}`, borderRadius:3 }}></div>
    <div style={{ font:`700 30px ${KF.mono}`, color }}>{texto}</div>
  </div>;
}
// Estufa con flama.
function Estufa({ T, x, y, s = 1, fuego = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={0} width={600} height={60} rx={12} fill="#e9eef3" stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-16} width={340} height={20} rx={6} fill="#3a3a3a" stroke={KC.ink} strokeWidth={6} />
    <Llama T={T} x={0} y={-16} s={1.3} o={fuego} />
  </g>;
}
// Limón partido.
function Limon({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 0 A 70 70 0 0 1 70 0 Z" fill="#9be15d" stroke={KC.ink} strokeWidth={8} />
    <path d="M -56 -4 A 56 56 0 0 1 56 -4 Z" fill="#e8f7a8" />
    {[-60, -30, 0, 30, 60].map((a) => <line key={a} x1={0} y1={-4} x2={Math.sin(a * Math.PI / 180) * 50} y2={-4 - Math.cos(a * Math.PI / 180) * 50} stroke="#9be15d" strokeWidth={4} />)}
  </g>;
}
// Niño sonriente con rayos X en la cabeza: cerebro con conexiones que se apagan (apaga 0..1).
const NEUR = (() => { const R = krng(4); const n = Array.from({ length: 14 }, () => [(R() - 0.5) * 300, (R() - 0.5) * 170]); const e = []; n.forEach((a, i) => n.forEach((b, j) => { if (j > i && Math.hypot(a[0] - b[0], a[1] - b[1]) < 120) e.push([i, j]); })); return { n, e }; })();
function Nino({ T, x, y, s = 1, rayos = 0, apaga = 0, pbIn = 0 }) {
  const R = krng(9);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 330 Q -200 230 -90 215 L 90 215 Q 200 230 200 330 L 200 420 L -200 420 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={10} />
    <rect x={-50} y={170} width={100} height={70} fill="#e9b48a" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={0} r={230} fill="#e9b48a" stroke={KC.ink} strokeWidth={10} />
    <path d="M -228 -30 Q -230 -240 0 -235 Q 230 -240 228 -30 Q 160 -150 0 -140 Q -160 -150 -228 -30 Z" fill="#3a2414" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-80} cy={40} r={20} fill={KC.ink} /><circle cx={80} cy={40} r={20} fill={KC.ink} />
    <circle cx={-74} cy={33} r={6} fill="#fff" /><circle cx={86} cy={33} r={6} fill="#fff" />
    <path d="M -80 110 Q 0 175 80 110" stroke={KC.ink} strokeWidth={10} fill="#a02020" strokeLinecap="round" />
    <circle cx={-140} cy={95} r={26} fill="#ff9c8a" opacity={0.6} /><circle cx={140} cy={95} r={26} fill="#ff9c8a" opacity={0.6} />
    {rayos > 0 && <g opacity={rayos}>
      <ellipse cx={0} cy={-95} rx={200} ry={120} fill={KC.noche} stroke={KC.white} strokeWidth={6} />
      <path d="M -170 -90 Q -170 -195 -40 -200 Q 0 -215 40 -200 Q 170 -195 170 -90 Q 165 -20 0 -15 Q -165 -20 -170 -90 Z" fill="#ff9fc0" opacity={0.85} stroke="#ffd1e1" strokeWidth={5} />
      <path d="M 0 -205 L 0 -20" stroke="#d76a95" strokeWidth={5} />
      {NEUR.e.map(([a, b], i) => { const off = (i % 3 === 0) ? apaga : 0; return <line key={i} x1={NEUR.n[a][0]} y1={NEUR.n[a][1] - 105} x2={NEUR.n[b][0]} y2={NEUR.n[b][1] - 105} stroke={off > 0.5 ? '#5d5f66' : KC.yellow} strokeWidth={5} opacity={1 - off * 0.6} />; })}
      {NEUR.n.map(([a, b], i) => <circle key={i} cx={a} cy={b - 105} r={10} fill={(i % 3 === 0 && apaga > 0.5) ? '#5d5f66' : KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
      {pbIn > 0 && Array.from({ length: 6 }, (_, i) => { const u = kclamp(pbIn * 1.4 - i * 0.08, 0, 1); return u > 0 ? <circle key={'p' + i} cx={Math.sin(i * 2.1) * 110 * u} cy={klerp(120, -100 + (i % 3) * 30, u)} r={16} fill={PB} stroke={KC.red} strokeWidth={5} /> : null; })}
    </g>}
  </g>;
}
// Lector portátil de plomo en sangre + dedo con gota.
function Lector({ x, y, s = 1, lee = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-230} width={340} height={460} rx={40} fill="#f4efe4" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={-180} width={240} height={150} rx={14} fill="#123" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-90} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.mint}>{lee > 0.99 ? 'Pb' : '·'.repeat(1 + Math.floor((T * 4) % 3))}</text>
    <text x={0} y={-48} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.mint}>µg/dL</text>
    <rect x={-90} y={40} width={180} height={34} rx={10} fill="#ccc" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-60} cy={150} r={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} /><circle cx={60} cy={150} r={30} fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Dedo({ x, y, s = 1, gota = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -60 260 L -60 -40 Q -60 -110 0 -110 Q 60 -110 60 -40 L 60 260 Z" fill="#e9b48a" stroke={KC.ink} strokeWidth={9} />
    <path d="M -36 -70 Q 0 -96 36 -70 L 36 -30 L -36 -30 Z" fill="#f6d6c0" stroke={KC.ink} strokeWidth={5} />
    {gota > 0 && <path d={`M 0 ${-112 - 44 * gota} Q ${26 * gota} -112 0 ${-112 + 4} Q ${-26 * gota} -112 0 ${-112 - 44 * gota} Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} transform="rotate(180 0 -112)" />}
  </g>;
}
// Cuadrícula 10×10 de personitas; las primeras k se encienden.
function Cien100({ T, at, k, x, y, paso = 42, on = KC.red, off = 'rgba(22,18,15,.18)' }) {
  const out = [];
  for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), lit = i < k && T >= at + i * 0.03;
    out.push(<Personita key={i} x={x + c * paso} y={y + r * paso + 8} s={0.55 * (lit ? klerp(1.4, 1, kprog(T, at + i * 0.03, at + i * 0.03 + 0.25)) : 1)} color={lit ? on : off} />); }
  return <g>{out}</g>;
}
// Ajo (medio diente / cabeza partida).
function Ajo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -80 0 Q -90 -90 0 -120 Q 90 -90 80 0 Z" fill="#f7f1e3" stroke={KC.ink} strokeWidth={8} />
    {[-50, -16, 18, 52].map((dx) => <path key={dx} d={`M ${dx - 16} 0 Q ${dx} -70 ${dx + 16} 0`} fill="#efe3c6" stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 0 -120 L 0 -150" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Mano esquemática que sostiene un pincel.
function ManoPincel({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-10} y={-220} width={20} height={200} rx={8} fill="#c99a5b" stroke={KC.ink} strokeWidth={6} />
    <path d="M -16 -230 Q 0 -290 16 -230 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    <path d="M -70 0 Q -80 -70 -20 -80 L 30 -80 Q 80 -70 70 0 Q 60 70 0 80 Q -60 70 -70 0 Z" fill="#b97a50" stroke={KC.ink} strokeWidth={8} />
    <path d="M -20 -80 Q -30 -40 -10 -20" stroke={KC.ink} strokeWidth={5} fill="none" />
  </g>;
}
// Repisa con olla "de adorno" y florecitas.
function Repisa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={120} width={340} height={26} rx={6} fill="#8a5a2b" stroke={KC.ink} strokeWidth={7} />
    <Olla x={0} y={20} s={0.62} />
    {[-50, 0, 50].map((dx, i) => <g key={i}><path d={`M ${dx} -55 Q ${dx + 6} -110 ${dx + (i - 1) * 20} -150`} stroke={KC.leaf} strokeWidth={8} fill="none" />
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={dx + (i - 1) * 20} cy={-150 - 16} rx={10} ry={18} fill={[KC.pink, KC.yellow, KC.lilac][i]} stroke={KC.ink} strokeWidth={3} transform={`rotate(${a} ${dx + (i - 1) * 20} -150)`} />)}
      <circle cx={dx + (i - 1) * 20} cy={-150} r={9} fill={KC.orange} /></g>)}
  </g>;
}

function Barro() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Gr: CUES.Greta, Ho: CUES.Horno, Ac: CUES.Acido, Ce: CUES.Cerebro, Pr: CUES.Pregunta, Es: CUES.Estudio, Co: CUES.Comparacion, Cu: CUES.Curado, Al: CUES.Alternativa, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const microHo = K.Ho + 2.3;                     // del horno al vidrio por dentro
  const vierte = kprog(T, K.G, K.G + 0.35, kEase.sale);
  const cafe = kprog(T, K.G + 0.1, K.G + 2.4);
  const dest = (t0) => ((T - t0) % 2.4) / 1.2;   // destello que recorre el jarrito cada 2.4 s
  // plomo que sale (escena Ácido): cada Pb tiene su H⁺ y luego se suelta
  const sal = RED.pb.map((_, i) => kprog(T, K.Ac + 1.2 + i * 0.32, K.Ac + 2.6 + i * 0.32, kEase.suave));
  const hh = RED.pb.map((_, i) => kprog(T, K.Ac + 0.5 + i * 0.32, K.Ac + 1.2 + i * 0.32));
  const salCu = RED.pb.map((_, i) => 0);
  const tarjCu = K.Cu + 3.0, barraCu = K.Cu + 4.6;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: café de olla en el jarrito brillante */}
      <Escena T={T} a={K.G} b={K.Gr} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Jarrito x={560} y={1030} s={1.35} vidrio={1} cafe={cafe} destello={dest(K.G + 0.2)} id="j0" />
          <Chorro T={T} x0={330} y0={700} x1={540} y1={800} color={CAFE} ancho={22} o={vierte * (1 - kprog(T, K.G + 2.4, K.G + 2.8))} />
          <Olla x={240} y={640} s={0.75} inclina={klerp(10, 55, vierte) - 55 * kprog(T, K.G + 2.5, K.G + 3.0)} />
        </SvgCapa>
        <BarraEscala texto="5 cm" largo={150} />
      </Escena>
      {/* 1 · greta + sílice → esmalte → se pinta la pieza */}
      <Escena T={T} a={K.Gr} b={K.Ho}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {T < K.Gr + 2.6 ? <g>
            <Costal x={300} y={780} s={0.9} inclina={klerp(0, 35, kprog(T, K.Gr + 0.1, K.Gr + 0.6))} polvo="#f0c419" texto="GRETA" sub="PbO" color="#ffe9a8" />
            <Costal x={800} y={780} s={0.9} inclina={klerp(0, -35, kprog(T, K.Gr + 0.6, K.Gr + 1.1))} polvo="#f4f4f4" texto="SÍLICE" sub="SiO₂" />
            <Polvo T={T} x0={390} y0={720} x1={500} y1={1060} color="#f0c419" o={kprog(T, K.Gr + 0.5, K.Gr + 0.7) * (1 - kprog(T, K.Gr + 2.2, K.Gr + 2.5))} seed={3} />
            <Polvo T={T} x0={710} y0={720} x1={590} y1={1060} color="#f4f4f4" o={kprog(T, K.Gr + 1.0, K.Gr + 1.2) * (1 - kprog(T, K.Gr + 2.2, K.Gr + 2.5))} seed={4} />
            <Cazuela x={540} y={1120} s={1.1} T={T} mezcla={kprog(T, K.Gr + 1.2, K.Gr + 1.5)} liquido={mixHex('#e8e2d0', '#f2dc8a', kprog(T, K.Gr + 0.6, K.Gr + 2.2))} />
          </g> : <g>
            <Cazuela x={300} y={1150} s={0.8} T={T} liquido="#f2dc8a" />
            <Jarrito x={700} y={1000} s={1.05} vidrio={kprog(T, K.Gr + 2.8, K.Ho - 0.3)} id="j1" />
            <ManoPincel x={klerp(560, 820, 0.5 + 0.5 * Math.sin(T * 7))} y={klerp(1180, 860, kprog(T, K.Gr + 2.8, K.Ho - 0.3))} s={0.9} rot={-30} />
          </g>}
        </SvgCapa>
        <BarraEscala texto="10 cm" largo={150} />
      </Escena>
      {/* 2a · horno que no llega a lo justo */}
      <Escena T={T} a={K.Ho} b={microHo} zoom={0.12} origen="45% 55%">
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Horno T={T} x={430} y={1000} s={1.05} fuego={1} />
          <TermoHorno x={900} y={1180} valor={klerp(0.1, 0.62, kprog(T, K.Ho + 0.2, K.Ho + 1.8, kEase.sale)) + Math.sin(T * 5) * 0.01} marca={0.8} alto={520} />
        </SvgCapa>
        <BarraEscala texto="1 m" largo={170} />
      </Escena>
      {/* 2b · por dentro: el plomo suelto en la red de vidrio */}
      <Escena T={T} a={microHo} b={K.Ac}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <RedVidrio T={T} x={-60} y={560} s={0.95} />
        </SvgCapa>
        <BarraEscala texto="≈ 1 nm · esquemático" largo={110} color={KC.texto} />
      </Escena>
      {/* 3 · ácido: salsa y limón en la estufa; la lupa muestra el plomo saliendo */}
      <Escena T={T} a={K.Ac} b={K.Ce}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Estufa T={T} x={600} y={1230} s={1} />
          <Jarrito x={600} y={1030} s={0.95} vidrio={1} id="j3" />
          <ellipse cx={600} cy={1030 - 170 * 0.95 + 6} rx={128} ry={24} fill={SALSA} />
          {[0, 1, 2].map((i) => <circle key={i} cx={560 + i * 40} cy={1030 - 160 + Math.sin(T * 8 + i) * 4} r={8} fill="#ff7a5c" />)}
          <Limon x={klerp(980, 760, kprog(T, K.Ac + 0.3, K.Ac + 1.0))} y={760} s={1} rot={150} />
          <Goteo T={T} x={740} y0={790} y1={860} cada={0.35} color="#e8f7a8" desde={K.Ac + 1.0} hasta={K.Ac + 3.0} r={9} />
          <line x1={430} y1={890} x2={520} y2={960} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.Ac + 0.2, K.Ac + 0.6)} />
          <g opacity={kprog(T, K.Ac + 0.1, K.Ac + 0.6)}>
            <clipPath id="lupaAc"><circle cx={310} cy={640} r={270} /></clipPath>
            <circle cx={310} cy={640} r={276} fill={KC.noche} />
            <g clipPath="url(#lupaAc)">
              <rect x={40} y={370} width={540} height={150} fill={SALSA} opacity={0.55} />
              <RedVidrio T={T} x={40} y={540} s={0.55} sal={sal} h={hh} />
            </g>
            <circle cx={310} cy={640} r={276} fill="none" stroke={KC.white} strokeWidth={14} />
            <circle cx={310} cy={640} r={290} fill="none" stroke={KC.ink} strokeWidth={8} />
            <text x={310} y={410} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">comida ácida</text>
          </g>
        </SvgCapa>
        <BarraEscala texto="5 cm" largo={150} />
      </Escena>
      {/* 4 · el plomo llega al cerebro (sin síntomas) */}
      <Escena T={T} a={K.Ce} b={K.Pr}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Nino T={T} x={610} y={900} s={1.15} rayos={kprog(T, K.Ce + 1.0, K.Ce + 1.6)} pbIn={kprog(T, K.Ce + 1.6, K.Ce + 3.4)} apaga={kprog(T, K.Ce + 3.0, K.Ce + 3.8)} />
          <g transform={`translate(${klerp(1000, 760, kprog(T, K.Ce, K.Ce + 0.8, kEase.sale))} ${1060}) rotate(-20)`} opacity={1 - kprog(T, K.Ce + 1.2, K.Ce + 1.6)}>
            <ellipse cx={0} cy={0} rx={60} ry={34} fill="#d8dde3" stroke={KC.ink} strokeWidth={7} /><ellipse cx={0} cy={-4} rx={44} ry={22} fill={SALSA} />
            <rect x={50} y={-10} width={220} height={22} rx={10} fill="#d8dde3" stroke={KC.ink} strokeWidth={7} />
          </g>
        </SvgCapa>
        <BarraEscala texto="20 cm" largo={140} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <MapaMexico x={110} y={300} ancho={560} conCA={false}>
            {Array.from({ length: 22 }, (_, i) => { const R = krng(30 + i); const lon = -110 + R() * 22, lat = 17 + R() * 9; const [px, py] = mxProy(lon, lat); const t0 = K.Pr + 0.2 + i * 0.08;
              return T > t0 ? <circle key={i} cx={px} cy={py} r={14 * kprog(T, t0, t0 + 0.2, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={4} /> : null; })}
          </MapaMexico>
          <text x={280} y={1180} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 1000)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · el estudio del INSP: piquete y lector */}
      <Escena T={T} a={K.Es} b={K.Co}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > K.Es + 3.0 && <g>
            <Dedo x={330} y={klerp(1300, 1120, kprog(T, K.Es + 3.0, K.Es + 3.5, kEase.sale))} s={1} gota={kprog(T, K.Es + 3.6, K.Es + 4.1)} />
            <Lector x={730} y={klerp(1400, 960, kprog(T, K.Es + 3.1, K.Es + 3.6, kEase.sale))} s={0.95} lee={kprog(T, K.Es + 4.4, K.Es + 5.0)} T={T} />
          </g>}
        </SvgCapa>
        <BarraEscala texto="5 cm" largo={150} />
      </Escena>
      {/* 7 · 44 de cada 100 vs. casi 10 */}
      <Escena T={T} a={K.Co} b={K.Cu}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={60} y={720} width={460} height={470} rx={26} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
          <rect x={560} y={720} width={460} height={470} rx={26} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
          <Cien100 T={T} at={K.Co + 0.6} k={44} x={102} y={760} />
          <Cien100 T={T} at={K.Co + 3.4} k={10} x={602} y={760} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.Co + 1.2} until={K.Cu - 0.3} valor={44} dur={1.2} sufijo=" %" x={290} y={1490} tam={150} color={KC.red} />
        <NumeroGigante T={T} at={K.Co + 3.6} until={K.Cu - 0.3} valor={9.8} dec={1} dur={0.8} sufijo=" %" x={790} y={1490} tam={150} color={KC.mint} />
        <Etq T={T} at={K.Co + 1.4} until={K.Cu - 0.3} x={60} y={1620} texto="usaban seguido barro con plomo" tam={26} color={KC.ink} />
        <Etq T={T} at={K.Co + 3.8} until={K.Cu - 0.3} x={1030} y={1680} lado="izq" texto="no lo usaban" tam={26} color={KC.ink} />
        <BarraEscala texto="niños de 1 a 4 años" largo={60} />
      </Escena>
      {/* 8 · el curado con ajo y vinagre */}
      <Escena T={T} a={K.Cu} b={K.Al}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T < barraCu ? <g>
            <Estufa T={T} x={540} y={1230} s={1} />
            <Jarrito x={540} y={1030} s={0.95} vidrio={1} id="j8" />
            <ellipse cx={540} cy={1030 - 170 * 0.95 + 6} rx={128} ry={24} fill="#f1f0e0" opacity={kprog(T, K.Cu + 1.6, K.Cu + 2.0)} />
            <Ajo x={klerp(240, 380, 0.5 + 0.5 * Math.sin(T * 6))} y={980} s={0.9} rot={-20} />
            <Botella x={860} y={760} s={0.55} inclina={klerp(0, -110, kprog(T, K.Cu + 1.2, K.Cu + 1.6))} color="#f6f3ec" liquido="#f7f3d0" etiqueta="VINAGRE" etqColor={KC.yellow} tapa={KC.red} />
            <Nube T={T} x={540} y={760} f={kprog(T, K.Cu + 2.0, K.Cu + 3.0)} r={140} color="rgba(255,255,255,.85)" seed={5} />
          </g> : <g>
            <rect x={300} y={600} width={480} height={0} />
            {(() => { const h = 560 * kprog(T, barraCu + 0.1, barraCu + 1.3, kEase.sale), lim = 160; return <g>
              <rect x={420} y={1180 - h} width={240} height={h} fill={KC.red} stroke={KC.ink} strokeWidth={8} rx={10} />
              <line x1={300} x2={780} y1={1180 - lim} y2={1180 - lim} stroke={KC.ink} strokeWidth={10} strokeDasharray="22 14" />
              <text x={790} y={1180 - lim + 12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>límite</text>
              <text x={790} y={1180 - lim + 46} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>NOM-231</text>
              <line x1={300} x2={780} y1={1180} y2={1180} stroke={KC.ink} strokeWidth={10} />
              <Jarrito x={220} y={1080} s={0.42} vidrio={1} id="j8b" />
            </g>; })()}
          </g>}
        </SvgCapa>
        <BarraEscala texto="5 cm" largo={150} />
      </Escena>
      {/* 9 · la alternativa: barro sin plomo */}
      <Escena T={T} a={K.Al} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Cazuela x={250} y={1170} s={0.75} T={T} liquido="#cfe9ff" />
          <text x={250} y={1300} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>esmalte sin plomo</text>
          <Jarrito x={640} y={1010} s={1.0} vidrio={kprog(T, K.Al + 0.3, K.Al + 2.4)} id="j9" />
          <ManoPincel x={klerp(520, 760, 0.5 + 0.5 * Math.sin(T * 7))} y={klerp(1170, 880, kprog(T, K.Al + 0.3, K.Al + 2.4))} s={0.9} rot={-30} />
          <g opacity={kprog(T, K.Al + 2.4, K.Al + 2.9)}>
            <clipPath id="lupaAl"><circle cx={300} cy={760} r={180} /></clipPath>
            <circle cx={300} cy={760} r={184} fill={KC.noche} />
            <g clipPath="url(#lupaAl)"><RedVidrio T={T} x={120} y={580} s={0.4} conPb={false} cerrada={true} /></g>
            <circle cx={300} cy={760} r={184} fill="none" stroke={KC.white} strokeWidth={12} />
            <Marca x={440} y={630} ok={true} s={0.6} o={kprog(T, K.Al + 2.9, K.Al + 3.3)} />
          </g>
        </SvgCapa>
        <BarraEscala texto="10 cm" largo={150} />
      </Escena>
      {/* 10 · cierre: el jarrito del inicio, ahora sin plomo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Jarrito x={600} y={1030} s={1.35} vidrio={1} cafe={1} destello={dest(K.Ci + 0.2)} sello={kprog(T, K.Ci + 0.8, K.Ci + 1.3)} id="j10" />
          <g opacity={kprog(T, K.Ci + 2.6, K.Ci + 3.1)}><Repisa x={190} y={760} s={0.8} /></g>
        </SvgCapa>
        <Etq T={T} at={K.Ci + 3.0} until={K.Ou} x={70} y={920} texto="de adorno" tam={30} color={KC.ink} />
        <BarraEscala texto="5 cm" largo={150} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.G + 3.0} texto="¿barniz?" x={300} y={470} tam={50} />
      <Chip T={T} at={K.G + 3.1} until={K.Gr - 0.3} texto="vidrio + plomo" x={300} y={470} tam={44} borde={PB} />
      <Etq T={T} at={K.Gr + 0.6} until={K.Gr + 2.4} x={540} y={1500} texto="greta = óxido de plomo" tam={36} color={KC.ink} lado="der" />
      <Chip T={T} at={K.Gr + 2.8} until={K.Ho - 0.3} texto="esmalte con plomo" y={1500} tam={42} borde={KC.orange} />
      <Chip T={T} at={K.Ho + 0.8} until={microHo - 0.2} texto="no llega a lo justo" y={1500} tam={42} borde={KC.red} />
      <Etq T={T} at={microHo + 0.3} until={K.Ac - 0.2} x={540} y={470} texto="vidrio: Si + O" tam={32} color="#c9b8ff" />
      <Etq T={T} at={microHo + 0.8} until={K.Ac - 0.2} x={540} y={520} texto="plomo suelto (Pb)" tam={32} color={PB} />
      <Chip T={T} at={K.Ac + 1.6} until={K.Ce - 0.3} texto="ácido → sale Pb²⁺" y={1500} tam={42} borde={HMAS} />
      <Chip T={T} at={K.Ce + 2.0} until={K.Pr - 0.3} texto="sin síntomas claros" y={1480} tam={40} borde={KC.lilac} />
      <Etq T={T} at={K.Ce + 3.6} until={K.Pr - 0.3} x={540} y={1600} lado="der" texto="OMS: no hay nivel seguro conocido" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.9} anio="2022–23" quien="INSP · Ensanut Continua" revista="Salud Publica Mex 2024 · 1 747 niños de 1 a 4 años" y={820} />
      <Chip T={T} at={K.Es + 3.4} until={K.Co - 0.3} texto="plomo en sangre · 1 a 4 años" y={1500} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Co + 4.4} until={K.Cu - 0.3} x={540} y={1760} lado="der" texto="de más = 5 µg/dL o más (NOM-199)" tam={22} color={KC.ink} />
      <MitoTachado T={T} at={K.Cu + 0.4} tacharEn={barraCu + 1.4} until={K.Al - 0.3} texto="curar quita el plomo" x={660} y={470} tam={42} />
      <TarjetaEstudio T={T} at={tarjCu} until={barraCu - 0.1} anio="2025" quien="estudio de laboratorio" revista="Processes · INSP, Ibero, Tec de Monterrey" y={1520} />
      <Chip T={T} at={barraCu + 1.5} until={K.Al - 0.3} texto="sigue soltando plomo" y={1500} tam={42} borde={KC.red} />
      <Chip T={T} at={K.Al + 0.4} until={K.Ci - 0.3} texto="FONART · desde 1994" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="barro sí, plomo no" y={1500} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Gr - 0.1} texto="No es barniz: *es plomo.*" />
      <Subtitulo T={T} idx={1} at={K.Gr + 0.1} until={K.Ho - 0.1} texto="Greta: *óxido de plomo.*" />
      <Subtitulo T={T} idx={2} at={K.Ho + 0.1} until={K.Ac - 0.1} texto="El plomo *no queda atrapado.*" />
      <Subtitulo T={T} idx={3} at={K.Ac + 0.1} until={K.Ce - 0.1} texto="Lo ácido *lo suelta.*" />
      <Subtitulo T={T} idx={4} at={K.Ce + 0.1} until={K.Pr - 0.1} texto="Daña *sin dar síntomas.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cuántos niños *lo traen?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Co - 0.1} texto="INSP: *niños de 1 a 4.*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.Cu - 0.1} texto="*44 de cada 100.*" />
      <Subtitulo T={T} idx={8} at={K.Cu + 0.1} until={K.Al - 0.1} texto="Curarlo *no lo quita.*" />
      <Subtitulo T={T} idx={9} at={K.Al + 0.1} until={K.Ci - 0.1} texto="Barro *sin plomo.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Pide barro *sin plomo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Greta + 0.8, CUES.Horno - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Acido + 1.0, CUES.Cerebro - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cerebro + 0.6, CUES.Pregunta - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Comparacion + 1.0, CUES.Curado - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Curado + 0.8, CUES.Alternativa - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Alternativa + 0.3, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="44" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BarroApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Barro /></CompositionStage></div>;
}
window.BarroApp = BarroApp;
