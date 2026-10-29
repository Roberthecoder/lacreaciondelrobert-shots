// Shot IA #50 · Detrás de tu IA hay personas etiquetando — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Russakovsky et al., IJCV 2015 (ImageNet, agosto de 2014) y Perrigo, TIME, 18 ene 2023 (Sama/OpenAI en Kenia). Ver guion.md y verificacion.md.
const PIEL = '#c98b5e', PIEL2 = '#a86d45';

// Punto sobre el perímetro de un rectángulo (p 0..1), para que el marcador "dibuje" el cuadrito.
function kPerim(x, y, w, h, p) {
  const L = 2 * (w + h); let d = L * kclamp(p, 0, 1);
  if (d <= w) return [x + d, y]; d -= w;
  if (d <= h) return [x + w, y + d]; d -= h;
  if (d <= w) return [x + w - d, y + h]; d -= w;
  return [x, y + h - d];
}
// Cuadrito de etiqueta que se dibuja (p 0..1) con su etiqueta (etq 0..1).
function Cuadrito({ x, y, w, h, p = 1, etq = 0, texto = 'gato', color = KC.mint, tam = 40, duda = false }) {
  const L = 2 * (w + h), lw = texto.length * tam * 0.62 + 34;
  return <g>
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={KC.ink} strokeWidth={14} strokeDasharray={`${L * p} ${L}`} strokeLinejoin="round" />
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${L * p} ${L}`} strokeLinejoin="round" />
    {etq > 0 && <g transform={`translate(${x - 4} ${y - 4}) scale(${kEase.rebote ? klerp(0.6, 1, etq) : 1})`} opacity={Math.min(1, etq * 2)}>
      <rect x={0} y={-tam * 1.35} width={lw} height={tam * 1.35} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
      <text x={lw / 2} y={-tam * 0.38} textAnchor="middle" style={{ font:`700 ${tam}px ${KF.mono}` }} fill={KC.ink}>{texto}</text>
    </g>}
    {duda && <text x={x + w - 10} y={y + 70} textAnchor="end" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={5}>?</text>}
  </g>;
}
// Marcador que sigue la punta del cuadrito.
function Marcador({ x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(-35)`} opacity={o}>
    <rect x={-14} y={-150} width={28} height={130} rx={8} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
    <rect x={-14} y={-150} width={28} height={36} rx={8} fill={KC.ink} />
    <path d="M -14 -20 L 14 -20 L 4 0 L -4 0 Z" fill={KC.ink} />
  </g>;
}
// Gato dibujado (tipo 'gato' anaranjado con rayas o 'birmano': crema con cara, orejas y cola oscuras y ojos azules).
function Gato({ x, y, s = 1, T = 0, tipo = 'gato' }) {
  const bir = tipo === 'birmano', pelo = bir ? '#f3e6cc' : '#ff9d3a', punta = bir ? '#5b4334' : '#d9701c', ojo = bir ? '#3fa8ff' : '#7ac943';
  const cola = Math.sin(T * 2.2) * 10, parp = (T % 3.7) < 0.12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 90 120 Q 190 ${90 + cola} 170 ${10 + cola}`} stroke={KC.ink} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d={`M 90 120 Q 190 ${90 + cola} 170 ${10 + cola}`} stroke={bir ? punta : pelo} strokeWidth={22} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={110} rx={120} ry={90} fill={pelo} stroke={KC.ink} strokeWidth={8} />
    {!bir && [-50, 0, 50].map((k) => <path key={k} d={`M ${k} 30 q 10 30 0 60`} stroke={punta} strokeWidth={10} fill="none" strokeLinecap="round" />)}
    <ellipse cx={-50} cy={190} rx={34} ry={20} fill={bir ? '#fff' : pelo} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={50} cy={190} rx={34} ry={20} fill={bir ? '#fff' : pelo} stroke={KC.ink} strokeWidth={7} />
    <path d="M -95 -60 L -80 -150 L -25 -95 Z" fill={bir ? punta : pelo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 95 -60 L 80 -150 L 25 -95 Z" fill={bir ? punta : pelo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={0} cy={-40} r={105} fill={pelo} stroke={KC.ink} strokeWidth={8} />
    {bir && <ellipse cx={0} cy={-20} rx={62} ry={58} fill={punta} opacity=".85" />}
    {!bir && <path d="M -30 -140 q 30 20 60 0 M -20 -120 q 20 12 40 0" stroke={punta} strokeWidth={8} fill="none" strokeLinecap="round" />}
    {parp ? <><line x1={-55} y1={-50} x2={-20} y2={-50} stroke={KC.ink} strokeWidth={7} /><line x1={20} y1={-50} x2={55} y2={-50} stroke={KC.ink} strokeWidth={7} /></>
      : <><ellipse cx={-38} cy={-50} rx={20} ry={24} fill={ojo} stroke={KC.ink} strokeWidth={6} /><ellipse cx={38} cy={-50} rx={20} ry={24} fill={ojo} stroke={KC.ink} strokeWidth={6} />
        <ellipse cx={-38} cy={-48} rx={6} ry={16} fill={KC.ink} /><ellipse cx={38} cy={-48} rx={6} ry={16} fill={KC.ink} /></>}
    <path d="M -12 -12 L 12 -12 L 0 2 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 2 q -14 18 -28 8 M 0 2 q 14 18 28 8" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    {[-1, 1].map((sg) => [0, 14].map((dy) => <line key={`${sg}${dy}`} x1={sg * 40} y1={-4 + dy} x2={sg * 120} y2={-14 + dy * 1.6} stroke={KC.ink} strokeWidth={4} />))}
  </g>;
}
// Foto tipo polaroid con un gato y su cuadrito.
function FotoGato({ x, y, s = 1, T = 0, tipo = 'gato', caja = 0, etq = 0, texto = 'gato', rot = -3, marcador = false }) {
  const bx = -165, by = -205, bw = 330, bh = 400, pt = kPerim(bx, by, bw, bh, caja);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-230} y={-270} width={460} height={580} rx={12} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-200} y={-240} width={400} height={440} fill={tipo === 'birmano' ? '#ffd6e6' : '#bfe9ff'} stroke={KC.ink} strokeWidth={5} />
    <rect x={-200} y={130} width={400} height={70} fill={tipo === 'birmano' ? '#e8a6c4' : '#8fd18a'} />
    <Gato x={-10} y={-10} s={0.92} T={T} tipo={tipo} />
    {caja > 0 && <Cuadrito x={bx} y={by} w={bw} h={bh} p={caja} etq={etq} texto={texto} />}
    {marcador && caja > 0 && caja < 1 && <Marcador x={pt[0]} y={pt[1]} />}
  </g>;
}
// Persona que etiqueta: audífonos, playera, laptop. saluda 0..1 levanta la mano.
function Persona({ x, y, s = 1, T = 0, saluda = 0, playera = KC.cyan, laptop = true, pelo = '#2a1a12', seed = 1 }) {
  const b = Math.sin(T * 2 + seed) * 3, brazo = klerp(0, 1, saluda), ola = Math.sin(T * 9) * 18 * saluda;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -110 230 Q -110 90 0 90 Q 110 90 110 230 Z" fill={playera} stroke={KC.ink} strokeWidth={8} />
    {saluda > 0 && <g transform={`rotate(${-brazo * 150 + ola} 85 120)`}>
      <path d="M 85 120 L 85 230" stroke={KC.ink} strokeWidth={36} strokeLinecap="round" /><path d="M 85 120 L 85 230" stroke={playera} strokeWidth={24} strokeLinecap="round" />
      <circle cx={85} cy={245} r={24} fill={PIEL} stroke={KC.ink} strokeWidth={6} /></g>}
    <rect x={-22} y={60} width={44} height={40} fill={PIEL2} />
    <circle cx={0} cy={0} r={78} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -78 -10 Q -80 -90 0 -86 Q 80 -90 78 -10 Q 60 -50 0 -52 Q -50 -50 -78 -10 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-28} cy={6} r={9} fill={KC.ink} /><circle cx={28} cy={6} r={9} fill={KC.ink} />
    <path d="M -24 34 Q 0 50 24 34" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -86 0 Q -90 -110 0 -112 Q 90 -110 86 0" stroke={KC.ink} strokeWidth={12} fill="none" />
    <rect x={-104} y={-24} width={30} height={56} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <rect x={74} y={-24} width={30} height={56} rx={12} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <path d="M -92 30 Q -80 70 -30 66" stroke={KC.ink} strokeWidth={6} fill="none" /><circle cx={-28} cy={66} r={9} fill={KC.ink} />
    {laptop && <g transform="translate(0 200)">
      <path d="M -150 -90 L 150 -90 L 130 40 L -130 40 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <circle cx={0} cy={-25} r={16} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <rect x={-190} y={40} width={380} height={24} rx={10} fill="#9aa1ae" stroke={KC.ink} strokeWidth={7} />
    </g>}
  </g>;
}
// Miniaturas que se llenan: íconos sencillos (gato, perro, coche, flor, taza) con palomita al verificarse.
function Icono({ tipo, s = 1 }) {
  if (tipo === 0) return <g transform={`scale(${s})`}><path d="M -26 -6 L -22 -30 L -8 -16 Z M 26 -6 L 22 -30 L 8 -16 Z" fill="#ff9d3a" stroke={KC.ink} strokeWidth={3} /><circle r={24} fill="#ff9d3a" stroke={KC.ink} strokeWidth={3} /><circle cx={-8} cy={-3} r={3} fill={KC.ink} /><circle cx={8} cy={-3} r={3} fill={KC.ink} /></g>;
  if (tipo === 1) return <g transform={`scale(${s})`}><ellipse cx={-22} cy={0} rx={9} ry={20} fill="#8a5a3a" stroke={KC.ink} strokeWidth={3} /><ellipse cx={22} cy={0} rx={9} ry={20} fill="#8a5a3a" stroke={KC.ink} strokeWidth={3} /><circle r={22} fill="#d9a066" stroke={KC.ink} strokeWidth={3} /><circle cx={0} cy={8} r={5} fill={KC.ink} /></g>;
  if (tipo === 2) return <g transform={`scale(${s})`}><path d="M -34 8 L -26 -10 L 20 -10 L 34 8 L 34 16 L -34 16 Z" fill={KC.red} stroke={KC.ink} strokeWidth={3} /><circle cx={-18} cy={18} r={8} fill={KC.ink} /><circle cx={18} cy={18} r={8} fill={KC.ink} /></g>;
  if (tipo === 3) return <g transform={`scale(${s})`}>{[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos(a * Math.PI / 180) * 14} cy={Math.sin(a * Math.PI / 180) * 14 - 4} r={11} fill={KC.pink} stroke={KC.ink} strokeWidth={3} />)}<circle cx={0} cy={-4} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /><line x1={0} y1={10} x2={0} y2={30} stroke={KC.leaf} strokeWidth={5} /></g>;
  return <g transform={`scale(${s})`}><path d="M -18 -18 L 18 -18 L 14 22 L -14 22 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><path d="M 18 -8 q 16 0 12 14 q -4 8 -14 6" stroke={KC.ink} strokeWidth={4} fill="none" /></g>;
}
function Miniaturas({ T, at, dur, cols = 8, filas = 5, x = 80, y = 690, w = 104, h = 82, gx = 12, gy = 12 }) {
  const n = cols * filas, r = krng(9), tipos = Array.from({ length: n }, () => Math.floor(r() * 5));
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {tipos.map((tp, i) => { const c = i % cols, f = Math.floor(i / cols), t0 = at + (i / n) * dur, e = kprog(T, t0, t0 + 0.25, kEase.sale), ok = kprog(T, t0 + 0.3, t0 + 0.45);
      if (e <= 0) return null;
      const px = x + c * (w + gx), py = y + f * (h + gy);
      return <g key={i} transform={`translate(${px} ${py})`} opacity={e}>
        <rect width={w} height={h} rx={10} fill="#fffdf6" stroke={KC.ink} strokeWidth={4} />
        <g transform={`translate(${w / 2} ${h / 2})`}><Icono tipo={tp} s={0.95} /></g>
        {ok > 0 && <g transform={`translate(${w - 14} 14) scale(${ok})`}><circle r={15} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} /><path d="M -7 0 L -2 6 L 8 -6" stroke="#fff" strokeWidth={4} fill="none" strokeLinecap="round" /></g>}
      </g>; })}
  </svg>;
}
// Voto: cabecita con globo de palomita.
function Voto({ x, y, e, playera, seed }) {
  if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, e)})`} opacity={Math.min(1, e * 2)}>
    <Persona x={0} y={0} s={0.42} laptop={false} playera={playera} seed={seed} pelo={['#2a1a12', '#6b3b1f', '#111', '#a0522d', '#3a2a20'][seed % 5]} />
    <g transform="translate(40 -80)"><circle r={30} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} /><path d="M -13 0 L -3 11 L 15 -11" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" /></g>
  </g>;
}
// Foca (gris, sobre una roca) y nutria marina (café, flotando panza arriba).
function Foca({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <ellipse cx={0} cy={130} rx={170} ry={40} fill="#8d8f96" stroke={KC.ink} strokeWidth={6} />
    <path d="M -130 110 Q -150 30 -60 -10 Q 0 -60 40 -100 Q 80 -130 110 -100 Q 130 -70 100 -30 Q 70 40 90 110 Z" fill="#9aa6b2" stroke={KC.ink} strokeWidth={7} />
    {[[-60, 40], [-20, 70], [20, 10], [-90, 80]].map(([a, c], i) => <circle key={i} cx={a} cy={c} r={8} fill="#6f7c88" />)}
    <path d="M -10 60 q 40 30 70 20" stroke={KC.ink} strokeWidth={6} fill="#7d8996" />
    <circle cx={75} cy={-95} r={9} fill={KC.ink} /><ellipse cx={112} cy={-74} rx={10} ry={7} fill={KC.ink} />
    {[0, 10].map((d) => <line key={d} x1={100} y1={-66 + d} x2={140} y2={-74 + d * 1.6} stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -130 110 L -175 90 L -165 125 Z" fill="#7d8996" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Nutria({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 1.6) * 6;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -190 60 q 40 -14 80 0 t 80 0 t 80 0 t 80 0 t 80 0" stroke="#fff" strokeWidth={8} fill="none" opacity=".8" />
    <ellipse cx={0} cy={20} rx={150} ry={56} fill="#7a4a2a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-10} cy={6} rx={90} ry={30} fill="#9c6a45" />
    <path d="M 140 30 q 50 10 60 -20" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" /><path d="M 140 30 q 50 10 60 -20" stroke="#7a4a2a" strokeWidth={12} fill="none" strokeLinecap="round" />
    <circle cx={-150} cy={-14} r={58} fill="#d8c3a5" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-178} cy={-58} r={14} fill="#7a4a2a" stroke={KC.ink} strokeWidth={5} /><circle cx={-118} cy={-62} r={14} fill="#7a4a2a" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-168} cy={-22} r={7} fill={KC.ink} /><circle cx={-132} cy={-24} r={7} fill={KC.ink} /><ellipse cx={-150} cy={-4} rx={11} ry={8} fill={KC.ink} />
    {[-1, 1].map((sg) => <line key={sg} x1={-150 + sg * 14} y1={4} x2={-150 + sg * 54} y2={-2} stroke={KC.ink} strokeWidth={3} />)}
    <ellipse cx={-60} cy={-24} rx={28} ry={20} fill="#e8d4b0" stroke={KC.ink} strokeWidth={5} />
    <path d="M -84 -24 L -36 -24" stroke={KC.ink} strokeWidth={3} />
    <circle cx={-86} cy={-14} r={14} fill="#5e3820" stroke={KC.ink} strokeWidth={5} /><circle cx={-34} cy={-14} r={14} fill="#5e3820" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tarjeta con un animal, su cuadrito y una etiqueta con duda.
function TarjetaAnimal({ x, y, T, e, caja, etq, texto, animal, color }) {
  if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.7, 1, e)}) rotate(${animal === 'foca' ? -3 : 3})`} opacity={Math.min(1, e * 2)}>
    <rect x={-235} y={-230} width={470} height={460} rx={18} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-210} y={-205} width={420} height={410} fill={color} stroke={KC.ink} strokeWidth={5} />
    {animal === 'foca' ? <Foca x={-10} y={-10} s={0.9} T={T} /> : <Nutria x={30} y={20} s={0.88} T={T} />}
    <Cuadrito x={-195} y={-150} w={390} h={300} p={caja} etq={etq} texto={texto} tam={34} color={KC.yellow} duda={etq > 0.9} />
  </g>;
}
// África esquemática con un pin en Nairobi.
function Africa({ x, y, s = 1, T = 0, pin = 0 }) {
  const d = 'M 150 20 L 260 0 L 330 30 L 365 40 L 385 95 L 420 170 L 500 190 L 470 260 L 432 320 L 412 380 L 372 432 L 334 520 L 282 542 L 252 502 L 222 402 L 204 332 L 182 272 L 140 252 L 62 242 L 20 182 L 0 132 L 40 72 L 100 30 Z';
  const pul = 1 + 0.25 * Math.sin(T * 5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={460} cy={430} rx={20} ry={50} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} transform="rotate(20 460 430)" />
    {pin > 0 && <g transform={`translate(405 292)`} opacity={Math.min(1, pin * 2)}>
      <circle r={34 * pul} fill={KC.red} opacity=".25" />
      <g transform={`translate(0 ${(1 - pin) * -120})`}><path d="M 0 0 C -30 -40 -30 -80 0 -80 C 30 -80 30 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={-55} r={11} fill="#fff" stroke={KC.ink} strokeWidth={4} /></g>
    </g>}
  </g>;
}
// Equipos de trabajo: 3 equipos de 12 personitas frente a pantallas con texto pixelado (nunca contenido real).
function Equipos({ T, at, x = 70, y = 560 }) {
  const out = [], cols = ['#2fe0a8', '#ffe11a', '#ff8a1f'];
  for (let eq = 0; eq < 3; eq++) for (let i = 0; i < 12; i++) {
    const c = i % 4, f = Math.floor(i / 4), k = eq * 12 + i, e = kprog(T, at + k * 0.04, at + k * 0.04 + 0.3, kEase.sale);
    if (e <= 0) continue;
    const px = x + eq * 320 + c * 74 + 40, py = y + f * 180;
    out.push(<g key={k} transform={`translate(${px} ${py}) scale(${e})`}>
      <rect x={-32} y={-48} width={64} height={46} rx={6} fill="#20263a" stroke={KC.ink} strokeWidth={4} />
      {[0, 1, 2].map((l) => <rect key={l} x={-24} y={-40 + l * 12} width={48 - (((k + l) * 7) % 20)} height={7} fill={KC.red} opacity={0.4 + 0.4 * Math.sin(T * 6 + k + l)} />)}
      <circle cx={0} cy={22} r={18} fill={[PIEL, '#8a5a3a', '#6b4228', '#b07850'][k % 4]} stroke={KC.ink} strokeWidth={4} />
      <path d="M -24 70 Q -24 40 0 40 Q 24 40 24 70 Z" fill={cols[eq]} stroke={KC.ink} strokeWidth={4} />
    </g>);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {[0, 1, 2].map((eq) => <rect key={eq} x={x + eq * 320 + 2} y={y - 70} width={300} height={520} rx={22} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={4} opacity={kprog(T, at, at + 0.3)} />)}
    {out}
  </svg>;
}
// Escudo (el detector) que rebota los textos tóxicos.
function Escudo({ x, y, s = 1, T = 0, golpe = 0 }) {
  const sac = Math.exp(-golpe * 5) * Math.sin(golpe * 30) * 8 * (golpe > 0 ? 1 : 0);
  return <g transform={`translate(${x + sac} ${y}) scale(${s})`}>
    <path d="M 0 -150 L 120 -110 Q 120 60 0 150 Q -120 60 -120 -110 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M 0 -110 L 85 -82 Q 85 40 0 108 Q -85 40 -85 -82 Z" fill="#9ff2d4" />
    <path d="M -45 0 L -10 35 L 50 -40" stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
function Toxico({ x, y, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <rect x={-90} y={-40} width={180} height={80} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-70 + i * 24} y={-14 + (i % 2) * 8} width={18} height={18} fill="#7a0f0a" />)}
  </g>;
}
// Calendario 2022 con meses tachados.
function Calendario({ T, at, until, x = 620, y = 640 }) {
  if (!kvisible(T, at, until)) return null;
  const M = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return <div style={{ position:'absolute', left:x, top:y, width:400, zIndex:40, opacity:kprog(T, at, at + 0.3) * (1 - kprog(T, until, until + 0.35)), background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:22, padding:'16px 18px', boxShadow:`10px 10px 0 ${KC.ink}` }}>
    <div style={{ font:`400 54px ${KF.titulo}`, color:KC.ink, textAlign:'center', marginBottom:8 }}>2022</div>
    <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
      {M.map((m, i) => { const tach = i >= 2 && i <= 9 ? kprog(T, at + 0.6 + (i - 2) * 0.18, at + 0.75 + (i - 2) * 0.18) : 0, corte = i === 1;
        return <div key={i} style={{ position:'relative', height:62, borderRadius:12, border:`4px solid ${KC.ink}`, background: corte ? KC.yellow : '#fff', font:`900 30px/54px ${KF.texto}`, textAlign:'center', color:KC.ink }}>
          {m}
          {tach > 0 && <div style={{ position:'absolute', left:6, right:6, top:26, height:8, background:KC.red, borderRadius:4, transform:`rotate(-18deg) scaleX(${tach})`, transformOrigin:'0 50%' }}></div>}
        </div>; })}
    </div>
  </div>;
}
// Balanza de dos platos con texto.
function Balanza({ T, x, y, s = 1, izq, der, inclina = 0 }) {
  const a = inclina * 10 + Math.sin(T * 1.8) * 3, r = (a * Math.PI) / 180, dx = 260 * Math.cos(r), dy = 260 * Math.sin(r);
  const plato = (px, py, txt, col) => <g transform={`translate(${px} ${py})`}>
    <line x1={0} y1={0} x2={-110} y2={150} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={110} y2={150} stroke={KC.ink} strokeWidth={5} />
    <path d="M -150 150 L 150 150 Q 120 200 0 200 Q -120 200 -150 150 Z" fill={col} stroke={KC.ink} strokeWidth={7} />
    <foreignObject x={-150} y={210} width={300} height={140}><div style={{ font:`900 34px/1.1 ${KF.texto}`, color:KC.ink, textAlign:'center', background:'rgba(255,255,255,.85)', border:`4px solid ${KC.ink}`, borderRadius:16, padding:'8px 6px' }}>{txt}</div></foreignObject>
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 420 L 90 420 L 40 380 L -40 380 Z" fill="#8a6a3a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-14} y={0} width={28} height={385} fill="#b08850" stroke={KC.ink} strokeWidth={6} />
    <line x1={-dx} y1={-dy} x2={dx} y2={dy} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" /><line x1={-dx} y1={-dy} x2={dx} y2={dy} stroke={KC.gold} strokeWidth={12} strokeLinecap="round" />
    <circle cx={0} cy={0} r={24} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
    {plato(-dx, -dy, izq, KC.mint)}{plato(dx, dy, der, KC.coral)}
  </g>;
}
function Cita({ T, at, until, texto, quien, y = 1000 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:90, right:90, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'22px 34px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ font:`900 58px/1.15 ${KF.texto}`, color:KC.ink }}>{texto}</div>
    <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:12 }}>{quien}</div>
  </div>;
}

function Etiquetadores() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Ejemplos, I: CUES.ImageNet, V: CUES.Votos, P: CUES.Pregunta, Ke: CUES.Kenia, D: CUES.Detector, Pa: CUES.Paga, To: CUES.Tortura, B: CUES.Balance, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, V2 = K.V + (K.P - K.V) * 0.55;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const sube = (a, d = 0.4) => kprog(T, a, a + d, kEase.sale);
  // tarjetas de ejemplos que entran a la red
  const ejemplos = Array.from({ length: 6 }, (_, i) => { const t0 = K.E + 0.15 + i * 0.4, u = kprog(T, t0, t0 + 1.2, kEase.suave);
    return { i, u, gato: i % 2 === 0, o: u <= 0 ? 0 : u < 0.85 ? 1 : 1 - (u - 0.85) / 0.15 }; });
  // textos tóxicos que chocan con el escudo
  const tox = [0, 1, 2].map((i) => { const t0 = K.D + 0.9 + i * 1.2, u = kprog(T, t0, t0 + 0.6, kEase.entra || ((p) => p * p)), reb = kprog(T, t0 + 0.6, t0 + 1.1, kEase.sale);
    return { i, t0, x: klerp(1160, 930, u) + reb * 220, y: 620 + i * 170 + reb * -60, o: T < t0 ? 0 : 1 - reb, rot: reb * 40 }; });
  const ultimoGolpe = tox.reduce((g, t) => (T >= t.t0 + 0.6 ? T - (t.t0 + 0.6) : g), 0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el cuadrito «gato» y la persona que lo puso */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.G + 1.6, K.G + 2.2)}><Persona x={800} y={880} s={0.85} T={T} saluda={0} /></g>
          <FotoGato x={330} y={800} s={1} T={T} caja={kprog(T, K.G + 0.1, K.G + 1.3, kEase.suave)} etq={kprog(T, K.G + 1.3, K.G + 1.6, kEase.sale)} marcador />
        </>)}
      </Escena>
      {/* 2 · aprender con ejemplos etiquetados */}
      <Escena T={T} a={K.E} b={K.I}>
        <FondoLunares color={KC.mint} />
        <RedNeuronal T={T} x={440} y={640} ancho={560} alto={440} capas={[4, 5, 5, 3]} onda={((T - K.E) * 0.6) % 1} color={KC.ink} acento={KC.yellow} />
        {svg(<>{ejemplos.map((e) => e.o > 0 && <g key={e.i} transform={`translate(${klerp(160, 440, e.u)} ${klerp(700 + (e.i % 3) * 150, 860, e.u)}) scale(${klerp(1, 0.4, e.u)})`} opacity={e.o}>
          <rect x={-110} y={-60} width={220} height={120} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
          <g transform="translate(-55 0)"><Icono tipo={e.gato ? 0 : [1, 4, 2][e.i % 3]} s={1.4} /></g>
          <text x={45} y={14} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={e.gato ? KC.leaf : KC.red}>{e.gato ? 'gato' : 'no'}</text>
        </g>)}</>)}
      </Escena>
      <Chip T={T} at={K.E + 0.3} until={K.I - 0.2} texto="miles de ejemplos etiquetados" x={540} y={1120} tam={36} borde={KC.ink} />
      {/* 3 · ImageNet: más de 14 millones */}
      <Escena T={T} a={K.I} b={K.V}>
        <FondoLunares color={KC.cyan} />
        <Miniaturas T={T} at={K.I + 1.2} dur={4.2} />
      </Escena>
      <NumeroGigante T={T} at={K.I + 0.1} until={K.V - 0.2} valor={14197122} dur={1.6} etiqueta="imágenes en ImageNet" x={540} y={470} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.I + 1.0} until={K.V - 0.2} texto="verificadas por personas · agosto de 2014" x={540} y={620} tam={32} borde={KC.ink} />
      {/* 4 · varias personas votan cada foto (gato birmano) */}
      <Escena T={T} a={K.V} b={V2}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <FotoGato x={320} y={720} s={0.8} T={T} tipo="birmano" caja={kprog(T, K.V + 0.2, K.V + 1.0, kEase.suave)} etq={sube(K.V + 1.0, 0.3)} texto="gato birmano" rot={2} />
          {[0, 1, 2, 3, 4].map((i) => <Voto key={i} x={140 + i * 180} y={1040} e={sube(K.V + 1.6 + i * 0.5, 0.35)} playera={[KC.pink, KC.orange, KC.cyan, KC.yellow, KC.mint][i]} seed={i + 2} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.V + 1.6} until={V2 - 0.2} texto={`votos: ${Math.min(5, Math.max(0, Math.floor((T - K.V - 1.6) / 0.5) + 1))}`} x={800} y={820} tam={44} borde={KC.leaf} />
      {/* 4b · al dibujar cuadritos: foca o nutria marina */}
      <Escena T={T} a={V2} b={K.P}>
        <FondoLunares color={KC.teal} />
        {svg(<>
          <TarjetaAnimal x={290} y={820} T={T} e={sube(V2 + 0.1)} caja={kprog(T, V2 + 0.3, V2 + 1.0, kEase.suave)} etq={sube(V2 + 1.0, 0.3)} texto="¿nutria marina?" animal="foca" color="#bfe9ff" />
          <TarjetaAnimal x={790} y={900} T={T} e={sube(V2 + 0.6)} caja={kprog(T, V2 + 0.8, V2 + 1.5, kEase.suave)} etq={sube(V2 + 1.5, 0.3)} texto="¿foca?" animal="nutria" color="#9fd8ff" />
        </>)}
      </Escena>
      <Chip T={T} at={V2 + 2.0} until={K.P - 0.2} texto="foca  ↔  nutria marina" x={540} y={470} tam={40} borde={KC.yellow} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Ke} zoom={0.1}>
        <FondoLunares color={KC.orange} punto="rgba(0,0,0,.08)" />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · Kenia: unas tres docenas de personas */}
      <Escena T={T} a={K.Ke} b={K.D}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, K.Ke + 2.8, K.Ke + 3.3) }}>
          {svg(<Africa x={290} y={420} s={1.0} T={T} pin={sube(K.Ke + 0.6, 0.5)} />)}
        </div>
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.Ke + 3.0, K.Ke + 3.4) }}><Equipos T={T} at={K.Ke + 3.0} /></div>
      </Escena>
      <Chip T={T} at={K.Ke + 1.1} until={K.Ke + 3.0} texto="Nairobi, Kenia · desde nov. 2021" x={540} y={1060} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Ke + 3.4} until={K.D - 0.2} texto="unas 3 docenas · 3 equipos" x={540} y={420} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Ke + 4.6} until={K.D - 0.2} texto="vía Sama, empresa contratista" x={540} y={1130} tam={32} borde={KC.ink} />
      {/* 7 · el detector dentro de ChatGPT (por dentro de la máquina) */}
      <Escena T={T} a={K.D} b={K.Pa}>
        <FondoCircuito T={T} />
        <CelularChat T={T} x={520} y={800} s={0.62} tam={46} mensajes={[{ at: K.D + 0.4, yo: true, texto: 'Hola 👋' }, { at: K.D + 1.0, yo: false, texto: '¡Hola! ¿En qué te ayudo?' }]} />
        {svg(<>
          <Escudo x={860} y={800} s={0.9} T={T} golpe={ultimoGolpe} />
          {tox.map((t) => t.o > 0 && <Toxico key={t.i} x={t.x} y={t.y} o={t.o} rot={t.rot} />)}
        </>)}
      </Escena>
      <Chip T={T} at={K.D + 0.6} until={K.Pa - 0.2} texto="detector de contenido tóxico · según OpenAI" x={540} y={1150} tam={30} borde={KC.mint} />
      {/* 8 · la paga, según TIME */}
      <Escena T={T} a={K.Pa} b={K.To}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
      </Escena>
      <TarjetaEstudio T={T} at={K.Pa + 0.1} until={K.Pa + 2.4} anio="2023" quien="revista TIME" revista="Billy Perrigo · 18 ene 2023" y={700} />
      {T > K.Pa + 2.5 && T < K.To + 0.5 && <div style={{ position:'absolute', left:0, right:0, top:760, zIndex:41, textAlign:'center', transform:`translateY(-50%) scale(${kentrada(T, K.Pa + 2.5, K.To - 0.2, 'pop').s})`, opacity:kentrada(T, K.Pa + 2.5, K.To - 0.2, 'pop').o }}>
        <div style={{ font:`900 44px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>sueldo neto, según TIME</div>
        <div style={{ font:`400 190px/0.95 ${KF.titulo}`, color:KC.red, WebkitTextStroke:`6px ${KC.ink}`, textShadow:`8px 8px 0 ${KC.ink}` }}>1.32–2</div>
        <div style={{ font:`900 54px ${KF.texto}`, color:KC.ink, marginTop:6 }}>dólares por hora</div>
      </div>}
      <Chip T={T} at={K.Pa + 3.4} until={K.To - 0.2} texto="Sama dice: 1.46–3.74 USD/h" x={540} y={1070} tam={36} borde={KC.ink} />
      {/* 9 · «tortura» y el contrato cortado */}
      <Escena T={T} a={K.To} b={K.B}>
        <FondoLunares color={KC.coral} punto="rgba(255,255,255,.25)" />
      </Escena>
      <Cita T={T} at={K.To + 0.2} until={K.B - 0.2} y={430} texto="«That was torture.»" quien="«Eso fue tortura», dijo un trabajador de Sama a TIME (2023)" />
      <Calendario T={T} at={K.To + 1.4} until={K.B - 0.2} x={600} y={620} />
      <Chip T={T} at={K.To + 2.6} until={K.B - 0.2} texto="se canceló en feb. · 8 meses antes" x={800} y={1150} tam={30} borde={KC.ink} />
      {/* 10 · balance */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<Balanza T={T} x={540} y={660} s={1} izq="IA más segura (OpenAI)" der="paga baja y trauma (TIME)" inclina={Math.sin(Math.min(1, (T - K.B) / 2.5) * Math.PI * 2) * (1 - kprog(T, K.B, K.B + 3))} />)}
      </Escena>
      <Chip T={T} at={K.B + 2.8} until={K.C - 0.2} texto="ambas pueden ser ciertas" x={540} y={1150} tam={40} borde={KC.gold} />
      {/* 11 · cierre: el mismo cuadrito, ahora con la persona completa */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Persona x={800} y={880} s={0.85} T={T} saluda={kprog(T, K.C + 1.0, K.C + 1.5, kEase.sale)} />
          <FotoGato x={330} y={800} s={1} T={T} caja={1} etq={1} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="alguien se lo enseñó ✔" x={540} y={1160} tam={42} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="No lo puso una máquina: *lo puso una persona.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.I - 0.1} texto="Así aprenden muchas IA: *ejemplos etiquetados.*" />
      <Subtitulo T={T} idx={2} at={K.I + 0.1} until={K.V - 0.1} texto="ImageNet, 2014: *más de 14 millones.*" />
      <Subtitulo T={T} idx={3} at={K.V + 0.1} until={V2 - 0.1} texto="Varias personas *votaban cada foto.*" />
      <Subtitulo T={T} idx={4} at={V2 + 0.1} until={K.P - 0.1} texto="Al dibujar cuadritos: *¿foca o nutria marina?*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ke - 0.1} texto="¿Y quién etiqueta *lo horrible?*" />
      <Subtitulo T={T} idx={6} at={K.Ke + 0.1} until={K.D - 0.1} texto="Nairobi, Kenia: *violencia y odio.*" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.Pa - 0.1} texto="Un detector *que terminó en ChatGPT.*" />
      <Subtitulo T={T} idx={8} at={K.Pa + 0.1} until={K.To - 0.1} texto="TIME, 2023: *1.32 a 2 dólares por hora.*" />
      <Subtitulo T={T} idx={9} at={K.To + 0.1} until={K.B - 0.1} texto="«Tortura». *Ocho meses antes.*" />
      <Subtitulo T={T} idx={10} at={K.B + 0.1} until={K.C - 0.1} texto="*Ambas cosas* pueden ser ciertas." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Alguien *se lo enseñó.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Ejemplos + 0.3, CUES.ImageNet + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Votos + 0.8, CUES.Votos + 4.8, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Kenia - 0.2, 'avatar_10_serio_molesto', 'grande'],
        [CUES.Detector + 0.8, CUES.Paga - 0.2, 'avatar_07_pensativo_puno', 'izq-alto'],
        [CUES.Paga + 2.6, CUES.Tortura - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Tortura + 0.3, CUES.Balance - 0.2, 'avatar_12_perfil_serio', 'grande-izq'],
        [CUES.Balance + 0.5, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="50" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EtiquetadoresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Etiquetadores /></CompositionStage></div>;
}
window.EtiquetadoresApp = EtiquetadoresApp;
