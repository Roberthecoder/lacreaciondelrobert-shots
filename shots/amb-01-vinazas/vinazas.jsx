// Ambiental #01 · Vinazas del tequila — versión NARRADA (N2 "El número" + N1 "Por dentro") y gemelo MUDO (M1 "La música son los datos").
// Guion y fuentes: guion.md. El dibujo es esquemático.
const AVS = (n) => 'assets/stickers/' + n + '.png';
const VIN = '#6b3d1c', VIN2 = '#8a5228', TEQ = '#ffd36b', AGUA = '#2fb6ff', AGAVE = '#4f9d8b', AGAVE2 = '#7cc3a9', SETA = '#efe6d2', SETA2 = '#cbbd9e';

/* ---------- dibujos ---------- */
// Caballito (vaso tequilero). Base en (x, y). lleno 0..1.
function Caballito({ x, y, s = 1, lleno = 1, T = 0, color = TEQ }) {
  const h = 260, wb = 70, wt = 100, lv = h * 0.85 * lleno, ola = Math.sin(T * 4) * 4;
  const wAt = (yy) => klerp(wb, wt, yy / h);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {lleno > 0.01 && <path d={`M ${-wb + 8} -10 L ${-wAt(lv) + 8} ${-lv + ola} Q 0 ${-lv - ola} ${wAt(lv) - 8} ${-lv + ola} L ${wb - 8} -10 Z`} fill={color} />}
    <path d={`M ${-wb} 0 L ${-wt} ${-h} L ${wt} ${-h} L ${wb} 0 Z`} fill="rgba(255,255,255,.28)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-wb - 6} y={-14} width={(wb + 6) * 2} height={22} rx={8} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-wt + 22} ${-h + 20} L ${-wb + 18} -30`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".6" />
  </g>;
}
// Garrafa de 1 L. nivel 0..1. icono opcional (lo que se saca de la vinaza).
function Garrafa({ x, y, s = 1, nivel = 1, color = VIN, icono, T = 0 }) {
  const ola = Math.sin(T * 3 + x) * 3, top = 150 * nivel;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={`gf${Math.round(x)}_${Math.round(y)}`}><path d="M -50 0 L -50 -120 Q -50 -150 -20 -160 L -20 -190 L 20 -190 L 20 -160 Q 50 -150 50 -120 L 50 0 Z" /></clipPath></defs>
    <g clipPath={`url(#gf${Math.round(x)}_${Math.round(y)})`}>{nivel > 0 && <rect x={-60} y={-top + ola} width={120} height={top + 10} fill={color} />}</g>
    <path d="M -50 0 L -50 -120 Q -50 -150 -20 -160 L -20 -190 L 20 -190 L 20 -160 Q 50 -150 50 -120 L 50 0 Z" fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-24} y={-206} width={48} height={20} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d="M -36 -110 L -36 -30" stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity=".45" />
    {icono && <g transform="translate(0 -70)">{icono}</g>}
  </g>;
}
// Alambique de cobre: olla, cuello de cisne y serpentín. Vapor que sube, gota de tequila al vaso y la vinaza que queda abajo.
function Alambique({ T, a }) {
  const g = krng(7), vap = Array.from({ length: 16 }, () => [g(), g()]);
  const vin = kprog(T, a + 1.4, a + 3.8, kEase.suave);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><g transform="translate(0 -150)">
    {/* fuego */}
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${300 + i * 40} 1300 q -18 -40 0 -${70 + 20 * Math.abs(Math.sin(T * 7 + i))} q 18 40 0 ${70 + 20 * Math.abs(Math.sin(T * 7 + i))}`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
    {/* olla */}
    <path d="M 200 1240 Q 180 900 380 860 Q 580 900 560 1240 Z" fill="#d07a3a" stroke={KC.ink} strokeWidth={10} />
    <clipPath id="olla"><path d="M 200 1240 Q 180 900 380 860 Q 580 900 560 1240 Z" /></clipPath>
    <g clipPath="url(#olla)"><rect x={180} y={klerp(980, 1150, vin)} width={400} height={300} fill={VIN} /><path d={`M 180 ${klerp(980, 1150, vin)} q 50 -10 100 0 t 100 0 t 100 0 t 100 0`} fill={VIN2} /></g>
    <path d="M 230 1100 Q 230 960 330 920" stroke="#f2a76a" strokeWidth={14} fill="none" strokeLinecap="round" opacity=".7" />
    {/* cuello de cisne */}
    <path d="M 380 860 L 380 760 Q 380 700 460 700 L 700 760" stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M 380 860 L 380 760 Q 380 700 460 700 L 700 760" stroke="#d07a3a" strokeWidth={30} fill="none" strokeLinecap="round" />
    {/* serpentín en agua fría */}
    <rect x={660} y={760} width={220} height={330} rx={26} fill="rgba(47,182,255,.45)" stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={770} cy={820 + i * 70} rx={80} ry={22} fill="none" stroke="#b5642c" strokeWidth={12} />)}
    <path d="M 770 1090 L 770 1150" stroke="#b5642c" strokeWidth={14} />
    {/* vapor (lo que sí se vuelve tequila) */}
    {vap.map(([p, q], i) => { const u = ((T * 0.4 + p) % 1); return <circle key={i} cx={klerp(390, 690, u) + q * 18} cy={klerp(820, 750, u) - Math.sin(u * 3) * 50} r={9 + q * 8} fill="#fff" opacity={0.6 * Math.sin(Math.PI * u)} />; })}
    <Goteo T={T} x={770} y0={1160} y1={1560} cada={0.7} color={TEQ} desde={a + 0.3} />
    <Caballito x={770} y={1720} s={0.55} lleno={0.3 + 0.5 * kprog(T, a, a + 5)} T={T} />
    {/* llave de la vinaza */}
    <path d="M 200 1200 L 120 1200" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" /><path d="M 200 1200 L 120 1200" stroke="#d07a3a" strokeWidth={18} strokeLinecap="round" />
    <Goteo T={T} x={110} y0={1220} y1={1700} cada={0.25} color={VIN} desde={a + 1.4} r={14} />
  </g></svg>;
}
// Escala de pH (0–14) con marcador. y = centro de la barra.
function EscalaPH({ T, at, y = 760, marcas = [] }) {
  const e = kentrada(T, at, null, 'sube'); if (T < at) return null;
  const x0 = 90, w = 900, X = (ph) => x0 + w * ph / 14;
  return <div style={{ position:'absolute', left:0, top:y - 60, width:KW, height:300, opacity:e.o, transform:`translateY(${e.y * 0.5}px)`, zIndex:40 }}>
    <svg width={KW} height={300}>
      <defs><linearGradient id="ph" x1="0" x2="1"><stop offset="0" stopColor="#ff2d2d" /><stop offset=".3" stopColor="#ff9a1f" /><stop offset=".5" stopColor="#3fbf4a" /><stop offset=".75" stopColor="#2346ff" /><stop offset="1" stopColor="#6b2bd9" /></linearGradient></defs>
      <rect x={x0} y={60} width={w} height={56} rx={28} fill="url(#ph)" stroke={KC.ink} strokeWidth={7} />
      {[0, 7, 14].map((p) => <text key={p} x={X(p)} y={160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{p}</text>)}
      <text x={x0} y={40} style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>ÁCIDO</text>
      <text x={x0 + w} y={40} textAnchor="end" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>BÁSICO</text>
      {marcas.map((m, i) => { if (T < m.at) return null; const k = kprog(T, m.at, m.at + 0.5, kEase.rebote), x = X(m.ph);
        return <g key={i} transform={`translate(${x} ${m.arriba ? 54 : 122}) scale(${k})`}>
          {m.rango && <rect x={X(m.rango[0]) - x} y={m.arriba ? -2 : -66} width={X(m.rango[1]) - X(m.rango[0])} height={68} rx={10} fill="none" stroke={KC.ink} strokeWidth={6} strokeDasharray="10 8" />}
          <path d={m.arriba ? 'M 0 0 L -18 -26 L 18 -26 Z' : 'M 0 0 L -18 26 L 18 26 Z'} fill={KC.ink} />
          <text y={m.arriba ? -38 : 66} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={m.color || KC.ink}>{m.texto}</text>
        </g>; })}
    </svg>
  </div>;
}
function Naranja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={46} fill={KC.orange} stroke={KC.ink} strokeWidth={6} /><circle r={30} fill="#ffb04d" /><path d="M 0 -30 L 0 30 M -26 -15 L 26 15 M -26 15 L 26 -15" stroke="#ffd79a" strokeWidth={5} /><path d="M 4 -46 q 18 -22 36 -10 q -16 14 -36 10" fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Pez esquemático. boquea 0..1 (sin oxígeno: boca abierta y de lado).
function Pez({ x, y, s = 1, T = 0, seed = 1, boquea = 0, color = KC.orange }) {
  const cola = Math.sin(T * (8 - 6 * boquea) + seed) * 12, rot = boquea * 160 + mece(T, seed, 0.3) * 6 * (1 - boquea);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={1 - boquea * 0.35}>
    <path d={`M 50 0 L 86 ${-26 + cola} L 86 ${26 + cola} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={60} ry={32} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -10 -30 q 14 -20 30 0" fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-34} cy={-8} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={-36} cy={-8} r={3.5} fill={KC.ink} />
    <ellipse cx={-58} cy={8} rx={4 + boquea * 6} ry={2 + boquea * 8} fill={KC.ink} />
  </g>;
}
// Río en corte. cafe 0..1 = cuánta vinaza llegó; o2 0..1 = oxígeno disuelto.
function Rio({ T, cafe = 0, o2 = 1 }) {
  const agua = mixHex('#2fb6ff', '#6b4a22', cafe * 0.85), g = krng(17);
  const bur = Array.from({ length: 26 }, () => [g() * KW, g(), 6 + g() * 10]);
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#9feaff, #00d2ff)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <path d="M 0 560 Q 300 520 540 560 T 1080 560 L 1080 1920 L 0 1920 Z" fill={agua} stroke={KC.ink} strokeWidth={8} />
      <path d="M 0 1500 Q 300 1450 540 1500 T 1080 1490 L 1080 1920 L 0 1920 Z" fill="#c9a26a" stroke={KC.ink} strokeWidth={8} />
      {bur.map(([x, p, r], i) => { const u = ((T * 0.18 + p) % 1); return <circle key={i} cx={x + Math.sin(T * 2 + i) * 10} cy={klerp(1460, 600, u)} r={r} fill="none" stroke="#fff" strokeWidth={4} opacity={o2 * 0.8 * Math.sin(Math.PI * u)} />; })}
      {cafe > 0 && <path d={`M 0 600 C 200 ${700 + 40 * Math.sin(T)}, 300 ${900 + 30 * Math.sin(T * 1.3)}, ${200 + 900 * cafe} 1200 L ${200 + 900 * cafe} 1460 L 0 1460 Z`} fill={VIN} opacity={0.35 * cafe} />}
      <Pez x={420 + mece(T, 2, 0.1) * 60} y={900} T={T} seed={1} boquea={kclamp((0.45 - o2) / 0.35, 0, 1)} />
      <Pez x={760 + mece(T, 5, 0.1) * 50} y={1150} s={0.8} T={T} seed={4} boquea={kclamp((0.55 - o2) / 0.35, 0, 1)} color={KC.yellow} />
      <Pez x={250 + mece(T, 8, 0.1) * 40} y={1320} s={0.7} T={T} seed={7} boquea={kclamp((0.35 - o2) / 0.3, 0, 1)} color={KC.pink} />
      {[160, 330, 860, 980].map((x, i) => <path key={i} d={`M ${x} 1500 q ${-10 + mece(T, i, 0.3) * 14} -80 ${4} -170`} stroke={KC.leaf} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    </svg>
  </>;
}
// Lo que pasa dentro del río (Lupa de rayos X): bacterias que se comen la materia orgánica y "respiran" el oxígeno.
function RioMicro({ T, r, t0 }) {
  const D = r * 2, g = krng(3), n = Math.min(18, 3 + Math.floor(Math.max(0, T - t0) * 4));
  const bs = Array.from({ length: 18 }, () => [g() * D, g() * D, g() * 360]);
  const o2 = Array.from({ length: 14 }, () => [g() * D, g() * D]);
  const quedan = Math.max(0, 14 - Math.floor(Math.max(0, T - t0 - 0.5) * 4));
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#3a2a16" />
    {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={(i * 97) % D} cy={(i * 61) % D} r={10 + (i % 4) * 4} fill={VIN2} opacity=".7" />)}
    {o2.slice(0, quedan).map(([x, y], i) => <g key={i} transform={`translate(${x + mece(T, i, 0.4) * 10} ${y})`}><circle r={14} fill="none" stroke="#9fe8ff" strokeWidth={4} /><text y={7} textAnchor="middle" style={{ font:`700 16px ${KF.mono}` }} fill="#9fe8ff">O₂</text></g>)}
    {bs.slice(0, n).map(([x, y, rr], i) => <Bacteria key={i} x={x} y={y} rot={rr + T * 20} s={0.42} T={T} seed={i} color={KC.mint} />)}
  </svg>;
}
// Interior del reactor (sin aire): microbios que se comen la carga y sueltan biogás.
function ReactorInterior({ T, a }) {
  const g = krng(21), part = Array.from({ length: 30 }, () => [g() * KW, 700 + g() * 700, g()]);
  const bur = Array.from({ length: 40 }, () => [180 + g() * 720, g(), 10 + g() * 18]);
  const come = kprog(T, a + 0.5, a + 5);
  return <>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 60%, #2a1e12 0%, #0E0F12 75%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <rect x={150} y={560} width={780} height={900} rx={70} fill="#24170c" stroke="#8c96a3" strokeWidth={16} />
      {part.map(([x, y, p], i) => (p > come ? <circle key={i} cx={kclamp(x, 200, 880)} cy={y} r={10 + p * 12} fill={VIN2} /> : null))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => { const x = 250 + i * 95 + mece(T, i, 0.2) * 30, y = 900 + (i % 3) * 170 + mece(T, i + 9, 0.2) * 30;
        return <g key={i} transform={`translate(${x} ${y}) rotate(${T * 30 + i * 50})`}><circle r={30} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} /><circle r={30} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="6 8" opacity=".5" /></g>; })}
      {bur.map(([x, p, r], i) => { const u = ((T * 0.35 + p) % 1); if (T < a + 0.6 + p) return null; return <g key={i} transform={`translate(${x + Math.sin(T * 3 + i) * 8} ${klerp(1400, 600, u)})`} opacity={Math.sin(Math.PI * u)}><circle r={r} fill="rgba(180,240,255,.25)" stroke="#b4f0ff" strokeWidth={3} /></g>; })}
      {/* tubo y flama de biogás */}
      <path d="M 540 560 L 540 470" stroke="#8c96a3" strokeWidth={30} />
      {T > a + 1.5 && [0, 1, 2].map((i) => <path key={i} d={`M ${520 + i * 20} 470 q -26 -50 0 -${90 + 30 * Math.abs(Math.sin(T * 8 + i))} q 26 50 0 ${90 + 30 * Math.abs(Math.sin(T * 8 + i))}`} fill={i === 1 ? '#7fd3ff' : '#2346ff'} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, a + 1.5, a + 2)} />)}
    </svg>
  </>;
}
// Piña de agave, cortada a la mitad (o deshebrada en bagazo con fibra 0..1).
function Pina({ x, y, s = 1, fibra = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fibra < 1 && <g opacity={1 - fibra}>
      <ellipse cx={0} cy={0} rx={170} ry={150} fill="#f1d08a" stroke={KC.ink} strokeWidth={9} />
      {[-120, -60, 0, 60, 120].map((dx, i) => <path key={i} d={`M ${dx} -140 q ${dx * 0.3} 140 0 280`} stroke="#d1a65a" strokeWidth={6} fill="none" />)}
      {[-1, 1].map((k) => [0, 1, 2].map((i) => <path key={k + '' + i} d={`M ${k * (40 + i * 50)} -120 L ${k * (60 + i * 70)} -${210 - i * 30} L ${k * (90 + i * 60)} -110`} fill={AGAVE} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />))}
    </g>}
    {fibra > 0 && <g opacity={fibra}>{Array.from({ length: 70 }, (_, i) => { const a1 = i * 2.39, r1 = 30 + (i * 37) % 150; return <path key={i} d={`M ${Math.cos(a1) * r1 * 1.2} ${Math.sin(a1) * r1 * 0.5 + 40} q ${20 + (i % 5) * 10} ${-20 + (i % 7) * 6} ${60 + (i % 4) * 14} ${(i % 3) * 10 - 10}`} stroke={i % 3 ? '#e2c27d' : '#c79f55'} strokeWidth={7} fill="none" strokeLinecap="round" />; })}</g>}
  </g>;
}
// Seta Pleurotus: sombrero en abanico lateral, con láminas que bajan por el pie corto. Crece de lado (k 0..1).
function SetaOstra({ x, y, s = 1, k = 1, rot = 0 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * kEase.sale(Math.min(1, k))})`}>
    <path d="M 0 0 C 30 -10 60 -40 110 -50 C 150 -55 170 -20 160 10 C 150 40 100 50 60 36 C 30 26 10 14 0 0 Z" fill={SETA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[0.25, 0.4, 0.55, 0.7, 0.85].map((f, i) => <path key={i} d={`M 8 6 Q ${70 * f} ${30 + 6 * i} ${150 * f + 20} ${34 - i * 8}`} stroke={SETA2} strokeWidth={3} fill="none" />)}
    <path d="M 60 -40 C 100 -48 140 -48 150 -20" stroke="#fff" strokeWidth={6} fill="none" opacity=".6" />
  </g>;
}
// Bolsa de cultivo con bagazo y racimos de setas que salen por los cortes. crece 0..1.
function BolsaSetas({ x, y, s = 1, crece = 0, seed = 1 }) {
  const g = krng(seed), pts = Array.from({ length: 26 }, () => [-80 + g() * 160, -230 + g() * 220, g() * 180]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -100 0 L -110 -250 Q -100 -290 -60 -300 L 60 -300 Q 100 -290 110 -250 L 100 0 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {pts.map(([px, py, a1], i) => <path key={i} d={`M ${px} ${py} l ${Math.cos(a1) * 26} ${Math.sin(a1) * 10}`} stroke={i % 2 ? '#d9b46a' : '#bf9448'} strokeWidth={6} strokeLinecap="round" />)}
    <path d="M -60 -300 Q 0 -340 60 -300" fill="none" stroke={KC.ink} strokeWidth={7} />
    {[[90, -200, -10], [-95, -130, 190], [90, -70, 8]].map(([sx, sy, r0], i) => <g key={i}>
      {[0, 1, 2].map((j) => <SetaOstra key={j} x={sx} y={sy + j * 16} s={0.5 + j * 0.08} rot={r0 + (j - 1) * 18} k={kprog(crece, i * 0.2 + j * 0.06, i * 0.2 + j * 0.06 + 0.5)} />)}
    </g>)}
  </g>;
}
// Repisas de la granja de hongos.
function Granja({ T, crece }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {[700, 1100].map((y, f) => <g key={f}>
      <rect x={60} y={y} width={960} height={26} rx={8} fill="#a8703f" stroke={KC.ink} strokeWidth={7} />
      {[0, 1, 2, 3].map((i) => <BolsaSetas key={i} x={170 + i * 245} y={y} s={0.78} crece={kclamp(crece * 1.3 - (f * 4 + i) * 0.06, 0, 1)} seed={f * 4 + i + 2} />)}
    </g>)}
    {[90, 990].map((x) => <rect key={x} x={x - 13} y={460} width={26} height={1100} fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />)}
  </svg>;
}

// Icono chiquito de lo que se le saca a la vinaza.
const ICONOS = {
  flama: <g><path d="M 0 30 q -30 -30 0 -70 q 30 40 0 70" fill="#7fd3ff" stroke={KC.ink} strokeWidth={4} /></g>,
  h2: <text y={14} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={2}>H₂</text>,
  agua: <path d="M 0 -30 Q 26 4 0 26 Q -26 4 0 -30 Z" fill={AGUA} stroke={KC.ink} strokeWidth={4} />,
  seta: <g transform="translate(-30 0)"><SetaOstra x={0} y={0} s={0.42} /></g>,
  prot: <text y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={2}>PROT</text>,
};

// Bar con el caballito y las 12 garrafas (gancho y cierre). n = garrafas visibles (0..12), conIconos al final.
function Barra({ T, n = 12, a = 0, conIconos = false, lleno = 1 }) {
  const ic = ['flama', 'h2', 'prot', 'agua', 'seta', 'flama', 'h2', 'agua', 'prot', 'seta', 'flama', 'h2'];
  return <>
    <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <rect x={0} y={1200} width={KW} height={720} fill="#a8703f" />
      <rect x={0} y={1180} width={KW} height={40} fill="#c98a4f" stroke={KC.ink} strokeWidth={8} />
      <rect x={60} y={940} width={960} height={22} rx={6} fill="#c98a4f" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => {
        const at = a + i * 0.16; if (i >= n || T < at) return null;
        const p = kprog(T, at, at + 0.4, kEase.rebote), fila = i < 6 ? 0 : 1, col = i % 6;
        const x = 140 + col * 160, y = fila ? 1180 : 940;
        return <g key={i} transform={`translate(0 ${(1 - p) * 60})`} opacity={kprog(T, at, at + 0.15)}><Garrafa x={x} y={y} s={0.82} T={T} nivel={1} icono={conIconos ? ICONOS[ic[i]] : null} /></g>;
      })}
      {n === 0 && <Caballito x={540} y={1180} s={1.5} lleno={lleno} T={T} />}
    </svg>
  </>;
}

/* ---------- versión narrada ---------- */
function VinazasNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Al: CUES.Alambique, D: CUES.Doce, A: CUES.Acida, R: CUES.Rio, P: CUES.Pregunta, Re: CUES.Reactor, E: CUES.Estudio, B: CUES.Bagazo, S: CUES.Setas, Gr: CUES.Granja, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el caballito se sirve (acción en 0.1 s) y se aleja; detrás aparecen las 12 garrafas
  const sirve = kprog(T, K.G + 0.05, K.G + 0.9, kEase.sale);
  const aleja = kprog(T, K.G + 1.6, K.G + 2.6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.G} b={K.Al} zoom={0}>
        <Barra T={T} n={12} a={K.G + 2.4} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 1180) scale(${klerp(1.6, 0.0001, aleja)})`} opacity={1 - aleja}>
            <Caballito x={0} y={0} lleno={sirve} T={T} />
            {sirve < 1 && <path d={`M 160 -560 Q 60 -400 0 ${-260 * sirve - 20}`} stroke={TEQ} strokeWidth={22} fill="none" strokeLinecap="round" />}
          </g>
        </svg>
      </Escena>
      <Escena T={T} a={K.Al} b={K.D}><FondoLunares color={KC.yellow} /><Alambique T={T} a={K.Al} /></Escena>
      <Escena T={T} a={K.D} b={K.A}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Caballito x={190} y={1060} s={0.9} T={T} />
          <text x={190} y={1135} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>1 L</text>
          {Array.from({ length: 12 }, (_, i) => { const at = K.D + 0.6 + i * 0.22; if (T < at) return null; const p = kprog(T, at, at + 0.35, kEase.rebote);
            return <g key={i} transform={`translate(${430 + (i % 4) * 160} ${740 + Math.floor(i / 4) * 200}) scale(${0.62 * p})`}><Garrafa x={0} y={0} T={T} /></g>; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.A} b={K.R}>
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Naranja x={300} y={520} s={kentrada(T, K.A + 0.8, null, 'pop').s * (T > K.A + 0.8 ? 1 : 0)} />
          {/* 1 litro de vinaza que ensucia 20 litros de agua */}
          {Array.from({ length: 20 }, (_, i) => { const at = K.A + 2.4 + i * 0.07; const c = kprog(T, at, at + 0.4); const x = 150 + (i % 10) * 82, y = 920 + Math.floor(i / 10) * 130;
            return T > K.A + 2.2 ? <g key={i} transform={`translate(${x} ${y})`}><rect x={-34} y={-55} width={68} height={110} rx={10} fill={mixHex('#2fb6ff', '#6b4a22', c * 0.9)} stroke={KC.ink} strokeWidth={5} /></g> : null; })}
        </svg>
        <EscalaPH T={T} at={K.A + 0.1} y={640} marcas={[{ at: K.A + 0.5, ph: 4, rango: [3.4, 4.5], texto: 'vinaza 3.4–4.5', color: VIN }, { at: K.A + 0.9, ph: 3.6, arriba: true, texto: 'jugo de naranja', color: KC.ink }]} />
      </Escena>
      <Escena T={T} a={K.R} b={K.P}>
        <Rio T={T} cafe={kprog(T, K.R + 0.3, K.R + 2)} o2={1 - kprog(T, K.R + 1.8, K.P - 0.6)} />
      </Escena>
      <Escena T={T} a={K.P} b={K.Re} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 1180) scale(${klerp(1.3, 1.9, kprog(T, K.P, K.Re))}) rotate(${mece(T, 2, 0.3) * 4})`}><Garrafa x={0} y={0} T={T} /></g>
          <text x={540} y={760} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.P + 0.3, K.P + 0.7)}>?</text>
        </svg>
      </Escena>
      <Escena T={T} a={K.Re} b={K.E} zoom={0.03}><ReactorInterior T={T} a={K.Re} /></Escena>
      <Escena T={T} a={K.E} b={K.B}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {['flama', 'h2', 'prot', 'agua'].map((k, i) => { const at = K.E + 2.0 + i * 0.5; if (T < at) return null; const p = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={k} transform={`translate(${190 + i * 233} ${980 + mece(T, i, 0.3) * 8}) scale(${1.25 * p})`}><Garrafa x={0} y={90} s={0.75} T={T} icono={ICONOS[k]} /></g>; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.B} b={K.S}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Pina x={540} y={900} s={1.6} fibra={kprog(T, K.B + 1.6, K.B + 3.2, kEase.suave)} T={T} />
          {/* molino que exprime */}
          {[0, 1].map((i) => <g key={i} transform={`translate(${380 + i * 320} ${560}) rotate(${(i ? -1 : 1) * T * 120})`} opacity={kprog(T, K.B + 0.8, K.B + 1.3) * (1 - kprog(T, K.B + 3.4, K.B + 4))}><circle r={80} fill="#9aa4ae" stroke={KC.ink} strokeWidth={8} />{[0, 60, 120].map((r) => <line key={r} x1={-80} y1={0} x2={80} y2={0} transform={`rotate(${r})`} stroke={KC.ink} strokeWidth={6} />)}</g>)}
          <Goteo T={T} x={540} y0={1050} y1={1300} cada={0.2} color={TEQ} desde={K.B + 1.2} hasta={K.B + 3.4} />
        </svg>
      </Escena>
      <Escena T={T} a={K.S} b={K.Gr}>
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <BolsaSetas x={540} y={1190} s={1.6} crece={kprog(T, K.S + 0.8, K.Gr - 0.2)} seed={4} />
        </svg>
      </Escena>
      <Escena T={T} a={K.Gr} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2b0f63, #0d1424)' }}></div>
        <Granja T={T} crece={kprog(T, K.Gr + 0.2, K.C)} />
        <Ambiente T={T} n={30} seed={8} color="rgba(255,255,230,.5)" tam={[3, 8]} />
      </Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}><Barra T={T} n={12} a={K.C - 1} conIconos={T > K.C + 2.2} /></Escena>

      {/* número y chips */}
      {T > K.G + 2.3 && T < K.Al - 0.2 && <NumeroGigante T={T} at={K.G + 2.3} until={K.Al - 0.4} valor={12} sufijo=" L" etiqueta="por cada caballito… de vinaza" y={600} tam={240} />}
      <Chip T={T} at={K.Al + 0.3} until={K.D - 0.3} texto="alambique · destilación" y={420} tam={40} />
      <Etq T={T} at={K.Al + 1.6} until={K.D - 0.3} x={140} y={1460} texto="vinaza" color={KC.ink} />
      <Etq T={T} at={K.Al + 0.8} until={K.D - 0.3} x={820} y={1520} texto="tequila" color={KC.ink} />
      <NumeroGigante T={T} at={K.D + 0.4} until={K.A - 0.3} valor={12} prefijo="×" etiqueta="litros de vinaza por litro" y={470} tam={190} />
      <Chip T={T} at={K.A + 2.4} until={K.R - 0.3} texto="1 L de vinaza → 20 L de agua" y={1150} tam={40} borde={VIN2} />
      <Medidor T={T} at={K.R + 1.4} until={K.P - 0.3} etiqueta="OXÍGENO EN EL AGUA" valor={(t) => 1 - kprog(t, K.R + 1.8, K.P - 0.6)} y={400} color={KC.cyan} />
      <Lupa T={T} at={K.R + 0.9} until={K.P - 0.3} x={700} y={800} r={190} fx={330} fy={1000} interior={(t, r) => <RioMicro T={t} r={r} t0={K.R + 1} />} etiqueta="RAYOS X · bacterias" tinte={KC.mint} />
      <Chip T={T} at={K.Re + 0.4} until={K.E - 0.3} texto="reactor anaerobio (sin aire)" y={400} tam={38} borde={KC.lilac} mono />
      <Etq T={T} at={K.Re + 1.8} until={K.E - 0.3} x={600} y={440} texto="biogás (metano)" color="#7fd3ff" />
      <Etq T={T} at={K.Re + 0.9} until={K.E - 0.3} x={560} y={1500} texto="microbios" color={KC.lilac} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 4.6} anio="2025" quien="CIATEJ · Jalisco" revista="De la Torre-Anguiano, Flores-Cosío y Amaya-Delgado" y={640} />
      <Etq T={T} at={K.B + 0.3} until={K.S - 0.3} x={120} y={1160} texto="Agave tequilana" it color={KC.ink} />
      <Etq T={T} at={K.B + 2.6} until={K.S - 0.3} x={700} y={1080} texto="bagazo" color={KC.ink} />
      <TarjetaEstudio T={T} at={K.S + 0.1} until={K.S + 2.6} anio="2024" quien="CU Lagos · UdeG" revista="Larios-Ulloa y Ramírez-Muñoz · Rev. Mex. Cienc. Agríc." y={520} />
      <Etq T={T} at={K.S + 2.4} until={K.Gr - 0.3} x={110} y={560} texto="Pleurotus ostreatus" it color={KC.ink} />
      <Chip T={T} at={K.Gr + 0.6} until={K.C - 0.3} texto="la granja de Robert · próximamente" y={400} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="materia prima" y={500} tam={56} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Al - 0.1} texto="No deja un vaso sucio: *deja 12 litros.*" />
      <Subtitulo T={T} idx={1} at={K.Al + 0.1} until={K.D - 0.1} texto="Lo que queda en el alambique: *vinaza.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.A - 0.1} texto="Por cada litro de tequila, *12 de vinaza.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.R - 0.1} texto="Ácida, y 1 litro *ensucia 20 de agua.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="Las bacterias *se acaban el oxígeno.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Re - 0.1} texto="¿Y si la ponemos *a trabajar?*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.E - 0.1} texto="Microbios sin aire *sueltan biogás.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.B - 0.1} texto="También *hidrógeno, proteína y enzimas.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.S - 0.1} texto="El otro residuo: *el bagazo.*" />
      <Subtitulo T={T} idx={9} at={K.S + 0.1} until={K.Gr - 0.1} texto="Sobre bagazo crecen *hongos seta.*" />
      <Subtitulo T={T} idx={10} at={K.Gr + 0.1} until={K.C - 0.1} texto="Mi granja de hongos: *pronto.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es basura: *es materia prima.*" />

      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={K.A + 2.6} until={K.R - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={K.P + 0.1} until={K.Re - 0.2} lado="abajo-der" />
      <Sticker T={T} src={AVS('avatar_02_apuntando_camara')} at={K.Gr + 1.0} until={K.C - 0.2} lado="abajo-izq" />

      <MarcaAgua T={T} tema="quimica" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo mudo (M1: la música son los datos) ---------- */
// 1 caballito → 12 garrafas (12 notas graves y tapadas) → pH 3.4–4.5 → río sin oxígeno (la música se ahoga)
// → reactor (cada burbuja de biogás, una nota libre) → bagazo → setas (cada seta, una nota que sube) → caballito otra vez.
function VinazasMudo() {
  const { T, CUES } = useComposition();
  const K = { C: CUES.Caballito, D: CUES.Doce, A: CUES.Acido, R: CUES.Rio, Re: CUES.Reactor, B: CUES.Bagazo, S: CUES.Setas, L: CUES.Loop };
  const FIN = K.L + 6.5;
  const sirve = kprog(T, K.C + 0.05, K.C + 1.0, kEase.sale);
  const vuelve = kprog(T, K.L + 1.5, FIN - 0.6, kEase.suave);   // el último cuadro = el primero
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.C} b={K.D} zoom={0}>
        <Barra T={T} n={0} lleno={sirve} />
        {sirve < 1 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><path d={`M 700 440 Q 600 700 540 ${1180 - 380 * sirve}`} stroke={TEQ} strokeWidth={24} fill="none" strokeLinecap="round" /></svg>}
      </Escena>
      <Escena T={T} a={K.D} b={K.A} zoom={0.02}><Barra T={T} n={12} a={K.D + 0.4} /></Escena>
      <Escena T={T} a={K.A} b={K.R}>
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Naranja x={300} y={520} s={T > K.A + 1.6 ? kentrada(T, K.A + 1.6, null, 'pop').s : 0} /><g transform="translate(540 1150) scale(1.3)"><Garrafa x={0} y={0} T={T} /></g></svg>
        <EscalaPH T={T} at={K.A + 0.2} y={640} marcas={[{ at: K.A + 0.8, ph: 4, rango: [3.4, 4.5], texto: 'pH 3.4–4.5', color: VIN }, { at: K.A + 1.6, ph: 3.6, arriba: true, texto: 'naranja', color: KC.ink }]} />
      </Escena>
      <Escena T={T} a={K.R} b={K.Re}><Rio T={T} cafe={kprog(T, K.R + 0.5, K.R + 3)} o2={1 - kprog(T, K.R + 2.5, K.Re - 1)} /></Escena>
      <Escena T={T} a={K.Re} b={K.B} zoom={0.03}><ReactorInterior T={T} a={K.Re} /></Escena>
      <Escena T={T} a={K.B} b={K.S}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Pina x={540} y={900} s={1.6} fibra={kprog(T, K.B + 2, K.B + 4.5, kEase.suave)} T={T} /></svg>
      </Escena>
      <Escena T={T} a={K.S} b={K.L}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2b0f63, #0d1424)' }}></div>
        <Granja T={T} crece={kprog(T, K.S + 0.3, K.L - 0.5)} />
      </Escena>
      <Escena T={T} a={K.L} b={FIN + 1} zoom={0}>
        <Barra T={T} n={0} lleno={vuelve < 1 ? 1 - kprog(T, K.L + 0.2, K.L + 1.5) : 0} />
      </Escena>

      {/* poco texto: título fijo + números */}
      <Chip T={T} at={K.C + 0.6} until={K.D - 0.3} texto="1 L de tequila" y={430} tam={50} />
      {T < K.A + 0.2 && <Contador T={T} at={K.D + 0.4} desde={0} hasta={12} dur={1.9} sufijo=" L de vinaza" x={540} y={560} tam={72} color={KC.yellow} />}
      <Chip T={T} at={K.A + 3} until={K.R - 0.3} texto="1 L de vinaza → 20 L de agua" y={1480} tam={40} borde={VIN2} />
      <Medidor T={T} at={K.R + 1.8} until={K.Re - 0.3} etiqueta="O₂" valor={(t) => 1 - kprog(t, K.R + 2.5, K.Re - 1)} y={400} color={KC.cyan} />
      <Chip T={T} at={K.Re + 1.2} until={K.B - 0.3} texto="biogás" y={360} tam={50} borde="#7fd3ff" />
      <Chip T={T} at={K.B + 2.5} until={K.S - 0.3} texto="bagazo de agave" y={430} tam={46} />
      <Etq T={T} at={K.S + 2} until={K.L - 0.3} x={110} y={560} texto="Pleurotus ostreatus" it />
      <Chip T={T} at={K.L + 1.4} until={FIN - 1.4} texto="♪ cada nota es un dato" y={430} tam={40} borde={KC.mint} />

      <MarcaAgua T={T} tema="quimica" num="01" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VinazasNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VinazasNarrado /></CompositionStage></div>;
}
function VinazasMudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VinazasMudo /></CompositionStage></div>;
}
window.VinazasNarradoApp = VinazasNarradoApp;
window.VinazasMudoApp = VinazasMudoApp;
