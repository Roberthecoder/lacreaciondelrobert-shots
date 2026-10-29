// Shot Científico #39 · Los niños moken veían mejor bajo el agua — NARRADO (N5 "El experimento" Gislén 2003 + N1 "Por dentro": el ojo bajo el agua).
// Datos: Gislén et al. 2003 (Current Biology) y 2006 (Vision Research). Ver guion.md y verificacion.md.
// Todo es esquemático: el ojo, el mapa, el barco y los niños. Las barras respetan la proporción del estudio (6.06 vs. 2.95 ciclos/grado).
const AGUA1 = '#16c9f0', AGUA2 = '#0b5fa8', ARENA = '#f3d9a0', ARENA2 = '#e2bd76';
const PIEL_MK = '#a8694a', PELO_MK = '#1b1410', PIEL_EU = '#f3c6a5', PELO_EU = '#a8743f';
const RMK = 6.06 / 6.06, REU = 2.95 / 6.06;   // agudeza bajo el agua, relativa a la de los niños moken (Gislén 2003)

// ---------- piezas del mar ----------
// Fondo de agua con haces de luz que se mecen.
function AguaFondo({ T, y0 = 0 }) {
  return <g>
    <defs><linearGradient id="agf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={AGUA1} /><stop offset="1" stopColor={AGUA2} /></linearGradient></defs>
    <rect x={-50} y={y0} width={KW + 100} height={KH - y0 + 50} fill="url(#agf)" />
    {[0, 1, 2, 3, 4].map((i) => { const x = 80 + i * 240 + 40 * Math.sin(T * 0.6 + i * 1.3), w = 70 + 30 * Math.sin(T * 0.9 + i);
      return <path key={i} d={`M ${x} ${y0} L ${x + w} ${y0} L ${x + w * 2.4 - 160} ${y0 + 1100} L ${x - 160} ${y0 + 1100} Z`} fill="#fff" opacity={0.09 + 0.04 * Math.sin(T * 1.3 + i)} />; })}
  </g>;
}
// Burbujas que suben desde (x, y).
function Burbujas({ T, x, y, n = 6, alto = 380, vel = 0.7, seed = 1, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const f = ((T * vel + i / n + seed * 0.37) % 1), bx = x + Math.sin(T * 3 + i * 2) * 14 + (i % 3 - 1) * 10;
    return <circle key={i} cx={bx} cy={y - f * alto} r={6 + (i % 3) * 4} fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth={3} opacity={1 - f} />; })}</g>;
}
function Erizo({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2, l = 58 + 6 * Math.sin(T * 2 + i);
      return <line key={i} x1={0} y1={0} x2={Math.cos(a) * l} y2={Math.sin(a) * l * 0.8 - 6} stroke="#2a1838" strokeWidth={5} strokeLinecap="round" />; })}
    <ellipse rx={30} ry={24} fill="#4a2a63" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function Concha({ x, y, s = 1, color = '#ff9fb6', rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -46 0 Q -50 -50 0 -56 Q 50 -50 46 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {[-30, -15, 0, 15, 30].map((a) => <line key={a} x1={0} y1={-2} x2={a} y2={-50 + Math.abs(a) * 0.3} stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-14} y={-4} width={28} height={12} rx={4} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Estrella({ x, y, s = 1, rot = 0, color = KC.orange }) {
  const p = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 18 : 46; return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><polygon points={p.join(' ')} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={Math.cos(i * 1.2566 - 1.57) * 22} cy={Math.sin(i * 1.2566 - 1.57) * 22} r={3.5} fill="#fff" opacity=".7" />)}</g>;
}
function Alga({ x, y, alto = 200, T = 0, seed = 0, color = KC.leaf }) {
  const pts = []; for (let i = 0; i <= 8; i++) { const u = i / 8; pts.push(`${(x + Math.sin(T * 1.4 + seed + u * 3) * 22 * u).toFixed(1)},${(y - u * alto).toFixed(1)}`); }
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />;
}
function Pez({ x, y, s = 1, color = KC.yellow, T = 0, dir = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
    <path d={`M -40 0 L -64 ${-20 + 4 * Math.sin(T * 12)} L -64 ${20 + 4 * Math.sin(T * 12)} Z`} fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <ellipse rx={42} ry={22} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -6 -20 Q 2 0 -6 20" fill="none" stroke={KC.ink} strokeWidth={3} opacity=".5" />
    <circle cx={22} cy={-5} r={6} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={24} cy={-5} r={3} fill={KC.ink} />
  </g>;
}
// Fondo del mar: arena, rocas, erizos, conchas, estrellas y algas. y = línea de la arena.
function FondoMar({ T, y = 1150 }) {
  return <g>
    <path d={`M -40 ${y} C 200 ${y - 40} 380 ${y + 20} 560 ${y - 10} S 900 ${y - 40} 1120 ${y} L 1120 ${KH + 40} L -40 ${KH + 40} Z`} fill={ARENA} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={(i * 211) % 1080} cy={y + 80 + (i * 97) % 600} r={5 + (i % 3) * 3} fill={ARENA2} />)}
    <path d={`M 700 ${y + 10} q 30 -110 130 -100 q 90 10 100 100 Z`} fill="#8d8aa6" stroke={KC.ink} strokeWidth={7} />
    <path d={`M 30 ${y + 5} q 20 -80 100 -80 q 80 0 90 80 Z`} fill="#7d7a96" stroke={KC.ink} strokeWidth={7} />
    <Alga x={90} y={y - 60} alto={230} T={T} seed={0} /><Alga x={130} y={y - 60} alto={170} T={T} seed={2} color="#2aa36b" />
    <Alga x={960} y={y - 70} alto={260} T={T} seed={1} /><Alga x={1010} y={y - 60} alto={190} T={T} seed={3} color="#2aa36b" />
    <Erizo x={330} y={y - 6} T={T} /><Erizo x={600} y={y + 4} s={0.8} T={T + 1} />
    <Concha x={460} y={y + 20} color="#ff9fb6" rot={-8} /><Concha x={790} y={y + 30} s={0.8} color={KC.yellow} rot={10} />
    <Estrella x={230} y={y + 40} rot={T * 4} /><Estrella x={880} y={y + 60} s={0.8} rot={-12} color={KC.coral} />
  </g>;
}
// Filtro de desenfoque (la vista borrosa). Devuelve <filter>.
function Borr({ id, d }) {
  return <filter id={id} filterUnits="userSpaceOnUse" x={-300} y={-300} width={KW + 600} height={KH + 600}><feGaussianBlur stdDeviation={Math.max(0.01, d)} /></filter>;
}

// Niño nadando de lado, mirando a la derecha, con los ojos abiertos y sin visor. (x, y) = centro del cuerpo.
function NinoNadando({ x, y, s = 1, rot = 0, T = 0, piel = PIEL_MK, pelo = PELO_MK, playera = KC.orange, short = '#2b4f8a', brazo = 1, seed = 0 }) {
  const k = Math.sin(T * 7 + seed), k2 = Math.sin(T * 7 + seed + Math.PI);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {/* piernas que patalean */}
    <g transform={`rotate(${8 * k} -70 10)`}><rect x={-250} y={-2} width={180} height={40} rx={20} fill={piel} stroke={KC.ink} strokeWidth={7} /><ellipse cx={-252} cy={18} rx={20} ry={26} fill={piel} stroke={KC.ink} strokeWidth={6} /></g>
    <g transform={`rotate(${8 * k2} -70 22)`}><rect x={-250} y={14} width={180} height={40} rx={20} fill={piel} stroke={KC.ink} strokeWidth={7} /><ellipse cx={-252} cy={34} rx={20} ry={26} fill={piel} stroke={KC.ink} strokeWidth={6} /></g>
    {/* short y playera */}
    <rect x={-110} y={-30} width={80} height={86} rx={22} fill={short} stroke={KC.ink} strokeWidth={7} />
    <rect x={-50} y={-40} width={160} height={92} rx={36} fill={playera} stroke={KC.ink} strokeWidth={7} />
    {/* brazo de atrás (pegado al cuerpo) */}
    <rect x={-20} y={34} width={120} height={30} rx={15} fill={piel} stroke={KC.ink} strokeWidth={6} transform={`rotate(${-6 + 6 * k2} 90 48)`} />
    {/* cabeza */}
    <circle cx={160} cy={-6} r={56} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <path d={`M 108 -24 C 104 -70 150 -80 190 -62 C 208 -54 214 -40 210 -34 C 180 -44 150 -40 132 -20 C 124 0 116 12 106 14 C ${96 + 4 * Math.sin(T * 3)} 0 ${84 + 6 * Math.sin(T * 3)} -10 108 -24 Z`} fill={pelo} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 132 2 C 124 -6 120 6 128 14" fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    {/* ojo abierto, sin visor */}
    <ellipse cx={186} cy={-14} rx={13} ry={15} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={191} cy={-13} r={6.5} fill={KC.ink} />
    <path d="M 172 -36 Q 188 -42 202 -34" fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    <path d="M 196 24 Q 204 22 210 18" fill="none" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    {/* brazo de adelante: se estira hacia el fondo */}
    <g transform={`rotate(${klerp(-25, 30, brazo) + 5 * k} 70 -10)`}><rect x={60} y={-26} width={170} height={32} rx={16} fill={piel} stroke={KC.ink} strokeWidth={6} /><circle cx={232} cy={-10} r={20} fill={piel} stroke={KC.ink} strokeWidth={6} /></g>
  </g>;
}
// Círculo de "lo que ves": recorta el fondo del mar visto de cerca, con desenfoque d.
function VistaBurbuja({ T, x, y, r = 150, d = 0, etiqueta, color = KC.white, id = 'vb', p = 1 }) {
  if (p <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.3, 1, p)})`} opacity={Math.min(1, p * 1.5)}>
    <defs><clipPath id={`cl-${id}`}><circle r={r} /></clipPath><Borr id={`bl-${id}`} d={d} /></defs>
    <circle r={r + 16} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#cl-${id})`}>
      <rect x={-r} y={-r} width={2 * r} height={2 * r} fill={AGUA1} />
      <g filter={`url(#bl-${id})`} transform={`scale(${r / 150}) translate(-430 -1150) scale(1)`}>
        <rect x={0} y={900} width={900} height={500} fill={AGUA1} />
        <FondoMar T={T} y={1180} />
      </g>
    </g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={6} />
    {etiqueta && <TextoSvg x={0} y={r + 70} tam={46} color={color} fuente="texto">{etiqueta}</TextoSvg>}
  </g>;
}

// ---------- el ojo en corte, de perfil, mirando a la derecha ----------
// m: 0 = aire (los rayos se juntan en la retina) → 1 = agua (se juntan detrás del ojo: borroso). brilloC = brillo de la córnea. lente = cristalino abombado.
function OjoLado({ cx, cy, R = 260, T = 0, m = 0, rayos = 0, brilloC = 0, lente = 0, iris = '#7a4a2a', id = 'o' }) {
  const L = 0.6 * R, Rr = R - 20, xRet = -R + 26, Fx = klerp(xRet, -R - 330, m);
  return <g transform={`translate(${cx} ${cy})`}>
    <path d={`M ${-R + 20} -40 L ${-R - 130} -54 L ${-R - 130} 54 L ${-R + 20} 40 Z`} fill="#f4c99c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {brilloC > 0 && <path d={`M ${0.74 * R} ${-0.66 * R} Q ${1.32 * R} 0 ${0.74 * R} ${0.66 * R}`} fill="none" stroke={KC.yellow} strokeWidth={30} opacity={brilloC * (0.75 + 0.25 * Math.sin(T * 6))} strokeLinecap="round" />}
    <path d={`M ${0.74 * R} ${-0.66 * R} Q ${1.32 * R} 0 ${0.74 * R} ${0.66 * R}`} fill="rgba(210,245,255,.85)" stroke={KC.ink} strokeWidth={9} />
    <circle r={R} fill="#fffaf3" stroke={KC.ink} strokeWidth={11} />
    <circle r={R - 30} fill="rgba(175,228,255,.45)" />
    <path d={`M ${Rr * Math.cos(1.05)} ${-Rr * Math.sin(1.05)} A ${Rr} ${Rr} 0 1 0 ${Rr * Math.cos(1.05)} ${Rr * Math.sin(1.05)}`} fill="none" stroke={KC.coral} strokeWidth={18} strokeLinecap="round" />
    {[-1, 1].map((sg) => <line key={sg} x1={0.8 * R} y1={sg * 0.17 * R} x2={0.8 * R} y2={sg * 0.6 * R} stroke={iris} strokeWidth={20} strokeLinecap="round" />)}
    <ellipse cx={L} cy={0} rx={0.14 * R * (1 + 0.6 * lente)} ry={0.34 * R * (1 - 0.08 * lente)} fill="rgba(255,236,190,.95)" stroke={KC.ink} strokeWidth={8} />
    {rayos > 0 && <g opacity={rayos}>{[-2, -1, 1, 2].map((j) => {
      const yIn = j * 0.16 * R, xC = 1.0 * R, yL = yIn * klerp(0.58, 0.93, m);
      const u = (xRet - L) / (Fx - L), yR = yL * (1 - u), largo = kprog(rayos, 0, 1);
      const pts = `${2.5 * R},${yIn} ${xC},${yIn} ${L},${yL} ${xRet},${yR.toFixed(1)}`;
      return <g key={j}>
        <polyline points={pts} fill="none" stroke={KC.ink} strokeWidth={15} strokeLinejoin="round" opacity=".3" />
        <polyline points={pts} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="30 16" strokeDashoffset={T * 110} strokeLinejoin="round" opacity={largo} />
        {m > 0.05 && <line x1={xRet} y1={yR} x2={Fx} y2={0} stroke={KC.yellow} strokeWidth={5} strokeDasharray="8 12" opacity={0.6 * m} />}
      </g>; })}
      {/* lo que llega a la retina: un punto nítido (aire) o una mancha (agua) */}
      <ellipse cx={xRet + 4} cy={0} rx={14 + 10 * m} ry={14 + 0.27 * R * m} fill={m > 0.4 ? 'rgba(255,90,90,.85)' : KC.yellow} stroke={KC.ink} strokeWidth={4} />
      {m > 0.05 && <g opacity={m}><circle cx={Fx} cy={0} r={12} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>}
    </g>}
  </g>;
}
// Rótulo con línea (dentro de svg).
function Rotulo({ x, y, tx, ty, texto, p = 1, ancla = 'middle', color = KC.white, tam = 42 }) {
  if (p <= 0.01) return null;
  return <g opacity={p}><line x1={x} y1={y} x2={tx} y2={ty + 10} stroke={KC.ink} strokeWidth={6} /><circle cx={x} cy={y} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    <TextoSvg x={tx} y={ty} tam={tam} color={color} ancla={ancla} fuente="texto">{texto}</TextoSvg></g>;
}

// ---------- mapa del mar de Andamán (esquemático) ----------
const MP = (lon, lat) => [(lon - 91.5) * 85 + 40, (18 - lat) * 85 + 330];
const mpPath = (pts) => 'M ' + pts.map(([a, b]) => MP(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
// tierra firme de Birmania y Tailandia (de la costa del mar de Andamán al golfo de Tailandia)
const TIERRA = [[92.6, 24], [93.6, 20.5], [94.4, 18.3], [94.25, 17.2], [94.2, 16.05], [94.7, 15.85], [95.3, 15.8], [95.8, 16.1], [96.3, 16.6], [96.9, 16.4], [97.6, 16.6], [97.7, 15.6], [97.9, 14.9],
  [98.15, 14.1], [98.4, 13.2], [98.6, 12.4], [98.75, 11.6], [98.6, 10.7], [98.55, 10.0], [98.45, 9.3], [98.3, 8.6], [98.3, 7.9], [98.6, 7.6], [99.1, 7.2], [99.4, 6.6], [99.9, 5.8],
  [100.6, 5.8], [100.4, 6.9], [100.1, 7.6], [100.3, 8.4], [99.9, 9.3], [99.2, 9.6], [99.2, 10.4], [99.5, 11.4], [99.8, 12.0], [99.95, 12.7], [100.0, 13.4], [100.6, 13.5], [100.95, 13.2],
  [100.9, 12.7], [101.6, 12.6], [102.4, 12.1], [102.9, 11.6], [103.6, 10.6], [104.6, 10.5], [104.6, 24]];
// frontera Birmania–Tailandia (aprox.)
const FRONTERA = [[98.6, 10.0], [98.8, 10.5], [99.2, 11.2], [99.5, 12.0], [99.2, 12.9], [99.1, 13.8], [98.6, 14.8], [98.5, 15.5], [98.6, 16.3], [97.9, 17.4], [98.0, 24]];
const ANDAMAN = [[[92.7, 13.6], [92.95, 13.2], [93.05, 12.4], [92.9, 11.7], [92.7, 11.5], [92.55, 12.2], [92.65, 12.9]], [[92.55, 11.3], [92.75, 10.9], [92.5, 10.5], [92.35, 10.8]]];
const MERGUI = [[98.1, 12.6], [98.0, 12.2], [98.3, 11.9], [98.2, 11.5], [98.45, 11.1], [98.1, 10.9], [98.3, 10.5], [97.9, 11.7]];
function MapaAndaman({ T, p = 1, zona = 0 }) {
  const [bx, by] = MP(97.6, 9.2);
  return <g opacity={p}>
    <rect x={-20} y={-20} width={KW + 40} height={KH + 40} fill="#5fd3f3" />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${60 + i * 60} ${1050 + i * 30} q 20 -14 40 0 t 40 0`} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={5} strokeLinecap="round" transform={`translate(${12 * Math.sin(T * 1.5 + i)} 0)`} />)}
    <path d={mpPath(TIERRA)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={mpPath(FRONTERA).replace(/ Z$/, '')} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="16 12" opacity=".7" />
    {ANDAMAN.map((isla, i) => <path key={i} d={mpPath(isla)} fill="#bfe3b4" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    {MERGUI.map(([a, b], i) => { const [x, y] = MP(a, b); return <ellipse key={i} cx={x} cy={y} rx={9 + (i % 3) * 4} ry={7 + (i % 2) * 4} fill="#bfe3b4" stroke={KC.ink} strokeWidth={4} />; })}
    {/* zona de los moken: costa e islas, del archipiélago de Mergui a Tailandia */}
    {zona > 0 && <g opacity={zona}><path d={`M ${MP(97.7, 13.4).join(' ')} Q ${MP(97.2, 11).join(' ')} ${MP(97.9, 8.0).join(' ')} L ${MP(98.55, 8.0).join(' ')} Q ${MP(98.9, 11).join(' ')} ${MP(98.4, 13.4).join(' ')} Z`}
      fill="rgba(255,45,120,.28)" stroke={KC.pink} strokeWidth={7} strokeDasharray="18 10" strokeDashoffset={-T * 30} /></g>}
    <TextoSvg x={MP(95.3, 12.4)[0]} y={MP(95.3, 12.4)[1]} tam={50} color={KC.white} fuente="texto" rot={-8} o={kprog(p, 0.3, 1)}>Mar de</TextoSvg>
    <TextoSvg x={MP(95.3, 11.75)[0]} y={MP(95.3, 11.75)[1]} tam={50} color={KC.white} fuente="texto" rot={-8} o={kprog(p, 0.3, 1)}>Andamán</TextoSvg>
    <TextoSvg x={MP(102.2, 9.3)[0]} y={MP(102.2, 9.3)[1]} tam={30} color="#e9fbff" fuente="texto" o={0.85}>golfo de Tailandia</TextoSvg>
    {zona > 0 && <g transform={`translate(${bx} ${by}) scale(${0.32 * zona})`}><Kabang T={T} /></g>}
  </g>;
}
// Barco moken (kabang): casco de madera chico con techo de hojas. Origen = línea del agua, centro.
function Kabang({ T = 0, s = 1 }) {
  return <g transform={`scale(${s}) rotate(${2.5 * Math.sin(T * 1.6)})`}>
    <path d="M -230 -40 L 230 -40 Q 210 30 140 50 L -140 50 Q -210 30 -230 -40 Z" fill="#9b5d33" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -215 -18 L 215 -18" stroke="#6e3d1e" strokeWidth={6} /><path d="M -185 14 L 185 14" stroke="#6e3d1e" strokeWidth={6} />
    <path d="M -150 -40 Q -140 -170 0 -170 Q 140 -170 150 -40 Z" fill="#e8c77a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-110, -60, -10, 40, 90].map((x) => <path key={x} d={`M ${x} -48 Q ${x + 10} -120 ${x + 25} -160`} fill="none" stroke="#b8923f" strokeWidth={5} />)}
    <rect x={-6} y={-260} width={12} height={220} fill="#6e3d1e" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Tarjeta con rayas (la prueba de agudeza): rayas más finas = detalle más fino.
function Rayas({ x, y, w = 260, h = 200, n = 8, d = 0, id = 'ry', marco = KC.white }) {
  const paso = w / n;
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={`c-${id}`}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} /></clipPath>{d > 0 && <Borr id={`b-${id}`} d={d} />}</defs>
    <rect x={-w / 2 - 14} y={-h / 2 - 14} width={w + 28} height={h + 28} rx={18} fill={marco} stroke={KC.ink} strokeWidth={7} />
    <g clipPath={`url(#c-${id})`}><g filter={d > 0 ? `url(#b-${id})` : undefined}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#fff" />
      {Array.from({ length: n }, (_, i) => i % 2 === 0 && <rect key={i} x={-w / 2 + i * paso} y={-h / 2} width={paso} height={h} fill={KC.ink} />)}
    </g></g>
  </g>;
}
// Diafragma de cámara: aro oscuro con una abertura hexagonal de radio a (0..1).
function Diafragma({ x, y, r = 150, a = 1, T = 0 }) {
  const ra = r * 0.85 * a, rot = (1 - a) * 50;
  const hex = Array.from({ length: 6 }, (_, i) => { const t = (i / 6) * Math.PI * 2 + rot * Math.PI / 180; return [Math.cos(t) * ra, Math.sin(t) * ra]; });
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 22} fill="#2a2d36" stroke={KC.ink} strokeWidth={8} />
    <circle r={r} fill="#3b3f4b" />
    <polygon points={hex.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')} fill="#bfe9ff" stroke={KC.ink} strokeWidth={5} />
    {hex.map(([hx, hy], i) => { const t = Math.atan2(hy, hx) + 1.1; return <line key={i} x1={hx} y1={hy} x2={hx + Math.cos(t) * r} y2={hy + Math.sin(t) * r} stroke="#1c1e25" strokeWidth={5} />; })}
    <circle r={r} fill="none" stroke="#5c6170" strokeWidth={6} />
  </g>;
}
// Ojo de frente: almendra con iris y pupila de radio rp.
function OjoFrente({ x, y, s = 1, rp = 60, iris = '#7a4a2a' }) {
  const w = 230, h = 120;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M ${-w} 0 Q 0 ${-2 * h} ${w} 0 Q 0 ${2 * h} ${-w} 0 Z`} fill="#fffaf3" stroke={KC.ink} strokeWidth={10} />
    <clipPath id="almf"><path d={`M ${-w} 0 Q 0 ${-2 * h} ${w} 0 Q 0 ${2 * h} ${-w} 0 Z`} /></clipPath>
    <g clipPath="url(#almf)">
      <circle r={112} fill={iris} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 24 }, (_, i) => { const a = i / 24 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * (rp + 6)} y1={Math.sin(a) * (rp + 6)} x2={Math.cos(a) * 104} y2={Math.sin(a) * 104} stroke="#5a3218" strokeWidth={4} />; })}
      <circle r={rp} fill="#0b0b0e" />
      <circle cx={-34} cy={-36} r={16} fill="#fff" opacity=".85" />
    </g>
  </g>;
}
// Calendario de unas 4 semanas con el año arriba; marcados = días de entrenamiento que ya pasaron.
const DIAS_ENT = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24];   // 11 sesiones en 1 mes (Gislén 2006), repartidas en el dibujo
function Calendario({ T, x, y, p = 1, marc = 0 }) {
  const cw = 112, ch = 86, w = cw * 7;
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, p)})`} opacity={Math.min(1, p * 1.4)}>
    <rect x={-w / 2 - 20} y={-70} width={w + 40} height={ch * 4 + 130} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-w / 2 - 20} y={-70} width={w + 40} height={96} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-260, 260].map((ax) => <rect key={ax} x={ax - 12} y={-100} width={24} height={60} rx={12} fill="#555" stroke={KC.ink} strokeWidth={5} />)}
    <text x={0} y={8} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">2006</text>
    {Array.from({ length: 28 }, (_, i) => { const c = i % 7, f = Math.floor(i / 7), cx = -w / 2 + c * cw + cw / 2, cy = 44 + f * ch + ch / 2;
      const k = DIAS_ENT.indexOf(i), on = k >= 0 && marc > k;
      return <g key={i}>
        <rect x={cx - cw / 2 + 5} y={cy - ch / 2 + 5} width={cw - 10} height={ch - 10} rx={10} fill={on ? '#c9f3ff' : '#f4f1ea'} stroke="#c9c2b3" strokeWidth={3} />
        {on && <g transform={`translate(${cx} ${cy}) scale(${klerp(0.3, 1, kclamp((marc - k) * 2, 0, 1))})`}>
          <path d="M -26 2 L -8 20 L 28 -20" fill="none" stroke={KC.teal} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" /></g>}
      </g>; })}
  </g>;
}

function Moken() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el niño moken entra nadando hacia el fondo
  const ninoX = (t) => klerp(-260, 470, kprog(t, K.Gancho - 0.4, K.Gancho + 1.6, kEase.sale)) + 14 * Math.sin(t * 1.3);
  const mEye = kprog(T, K.Agua + 0.5, K.Agua + 2.4, kEase.suave);                 // del aire al agua
  const subeAgua = kprog(T, K.Agua - 0.2, K.Agua + 0.9, kEase.suave);
  // Pueblo: del mapa al barco
  const aBarco = kprog(T, K.Pueblo + 4.3, K.Pueblo + 4.9, kEase.suave);
  const zuma = kprog(T, K.Pueblo + 3.4, K.Pueblo + 4.6, kEase.suave);
  const buceo = kprog(T, K.Pueblo + 5.2, K.Pueblo + 7.4, kEase.suave);
  // Pupila
  const rp = klerp(78, 34, kprog(T, K.Pupila + 0.3, K.Pupila + 2.0, kEase.suave));
  const lente = kprog(T, K.Pupila + 2.3, K.Pupila + 3.6, kEase.suave);
  const apert = klerp(1, 0.38, kprog(T, K.Pupila + 4.0, K.Pupila + 5.4, kEase.suave));
  const nitido = kprog(T, K.Pupila + 4.8, K.Pupila + 6.6, kEase.suave);
  // Entrenar: la barra de los niños europeos sube hasta la de los moken
  const marc = klerp(0, 11.2, kprog(T, K.Entrenar + 0.7, K.Entrenar + 3.2));
  const vEU = klerp(REU, RMK, kprog(T, K.Entrenar + 3.3, K.Entrenar + 4.8, kEase.suave));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: un niño moken bucea sin visor y ve claro; tu vista, borrosa */}
      <Escena T={T} a={K.Gancho} b={K.Borroso} zoom={0.04} fondo={AGUA1}>
        <Lienzo>
          <AguaFondo T={T} />
          <FondoMar T={T} y={1150} />
          <Pez x={(T * 90) % 1400 - 200} y={960} s={0.8} T={T} color={KC.yellow} />
          <Pez x={1200 - (T * 70) % 1400} y={1060} s={0.6} T={T} color={KC.pink} dir={-1} />
          <NinoNadando x={ninoX(T)} y={880} rot={18} T={T} brazo={kprog(T, K.Gancho + 1.2, K.Gancho + 2.2, kEase.suave)} />
          <Burbujas T={T} x={ninoX(T) + 200} y={850} alto={420} />
          <VistaBurbuja T={T} x={250} y={530} r={140} d={12 + 2 * Math.sin(T * 2)} etiqueta="tu vista" id="g1" p={kprog(T, K.Gancho + 2.7, K.Gancho + 3.2, kEase.rebote)} />
        </Lienzo>
        <Chip T={T} at={K.Gancho + 0.3} until={K.Gancho + 2.2} texto="sin visor" x={300} y={470} tam={48} borde={KC.yellow} />
        <Etq T={T} at={K.Gancho + 3.6} until={K.Borroso - 0.1} x={120} y={1040} texto="niño moken" lado="der" tam={38} />
      </Escena>

      {/* 1 · tú abres los ojos bajo el agua: todo borroso */}
      <Escena T={T} a={K.Borroso} b={K.Cornea} zoom={0.06} fondo={AGUA1}>
        <Lienzo>
          <defs><Borr id="bor1" d={klerp(2, 16, kprog(T, K.Borroso + 0.2, K.Borroso + 1.2, kEase.sale)) + 1.5 * Math.sin(T * 2.5)} /></defs>
          <g filter="url(#bor1)" transform="translate(540 1000) scale(1.5) translate(-540 -1000)">
            <AguaFondo T={T} />
            <FondoMar T={T} y={1110} />
            <Pez x={(T * 80) % 1400 - 200} y={880} s={0.9} T={T} color={KC.yellow} />
          </g>
          <Burbujas T={T} x={200} y={1200} alto={800} n={8} seed={2} />
          <Burbujas T={T} x={880} y={1200} alto={800} n={8} seed={5} />
          {/* párpados que se abren */}
          {(() => { const ab = kprog(T, K.Borroso - 0.2, K.Borroso + 0.6, kEase.sale); return <g>
            <path d={`M -20 -20 L 1100 -20 L 1100 ${klerp(980, 120, ab)} Q 540 ${klerp(1000, 40, ab)} -20 ${klerp(980, 120, ab)} Z`} fill="#0b0b10" />
            <path d={`M -20 1940 L 1100 1940 L 1100 ${klerp(980, 1840, ab)} Q 540 ${klerp(960, 1900, ab)} -20 ${klerp(980, 1840, ab)} Z`} fill="#0b0b10" /></g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Borroso + 1.0} until={K.Cornea - 0.1} texto="todo borroso" x={540} y={470} tam={56} borde={KC.cyan} />
      </Escena>

      {/* 2 · por dentro: en el aire, la córnea junta los rayos en la retina */}
      <Escena T={T} a={K.Cornea} b={K.Agua} zoom={0.03} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(470 860) scale(${klerp(0.4, 1, kprog(T, K.Cornea - 0.3, K.Cornea + 0.5, kEase.rebote))}) translate(-470 -860)`}>
            <OjoLado cx={470} cy={860} R={250} T={T} rayos={kprog(T, K.Cornea + 2.2, K.Cornea + 3.0)} brilloC={kprog(T, K.Cornea + 1.2, K.Cornea + 1.7)} />
          </g>
          <Rotulo x={470 + 1.03 * 250} y={860 - 120} tx={850} ty={560} texto="córnea" p={kprog(T, K.Cornea + 1.2, K.Cornea + 1.5)} />
          <Rotulo x={470 - 250 + 22} y={860 + 150} tx={220} ty={1180} texto="retina" p={kprog(T, K.Cornea + 3.0, K.Cornea + 3.3)} />
          <TextoSvg x={930} y={1180} tam={72} color={KC.white} o={kprog(T, K.Cornea + 3.6, K.Cornea + 4.0)} s={klerp(0.5, 1, kprog(T, K.Cornea + 3.6, K.Cornea + 4.0, kEase.rebote))}>AIRE</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Cornea + 3.3} until={K.Agua - 0.1} texto="se juntan en la retina: nítido" x={540} y={430} tam={40} borde={KC.leaf} />
      </Escena>

      {/* 3 · el mismo ojo bajo el agua: la córnea casi pierde su poder; los rayos se juntan detrás del ojo */}
      <Escena T={T} a={K.Agua} b={K.Pueblo} zoom={0.03} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <rect x={-20} y={klerp(KH, -20, subeAgua)} width={KW + 40} height={KH + 40} fill="#2bb8e8" opacity=".92" />
          <path d={`M -20 ${klerp(KH, -20, subeAgua)} q 70 -24 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0 t 140 0`} fill="none" stroke="#fff" strokeWidth={8} opacity={1 - subeAgua} transform={`translate(${-40 * T % 140} 0)`} />
          <Burbujas T={T} x={980} y={1200} alto={800} n={7} seed={3} o={subeAgua} />
          <Burbujas T={T} x={120} y={1200} alto={700} n={6} seed={7} o={subeAgua} />
          <OjoLado cx={470} cy={860} R={250} T={T} m={mEye} rayos={1} brilloC={1 - 0.85 * mEye} />
          <TextoSvg x={930} y={1180} tam={72} color={KC.white} s={1}>{subeAgua > 0.5 ? 'AGUA' : 'AIRE'}</TextoSvg>
        </Lienzo>
        <Medidor T={T} at={K.Agua + 0.4} until={K.Pueblo - 0.1} x={90} y={360} ancho={900} color={KC.yellow} etiqueta="poder de la córnea"
          valor={(t) => 1 - 0.87 * kprog(t, K.Agua + 0.5, K.Agua + 2.4, kEase.suave)} texto={(v) => (v > 0.6 ? 'mucho' : 'casi nada')} />
        <Chip T={T} at={K.Agua + 2.5} until={K.Pueblo - 0.1} texto="fuera de foco" x={540} y={520} tam={48} borde={KC.red} />
      </Escena>

      {/* 4 · el pueblo moken: mapa del mar de Andamán → barco → el niño bucea por comida */}
      <Escena T={T} a={K.Pueblo} b={K.Estudio} zoom={0} fondo="#5fd3f3">
        <Lienzo>
          {aBarco < 1 && <g opacity={1 - aBarco} transform={`translate(${MP(98.2, 10.5)[0]} ${MP(98.2, 10.5)[1]}) scale(${klerp(klerp(0.9, 1, kprog(T, K.Pueblo - 0.3, K.Pueblo + 0.8, kEase.sale)), 2.6, zuma)}) translate(${-MP(98.2, 10.5)[0]} ${-MP(98.2, 10.5)[1]})`}>
            <MapaAndaman T={T} p={kprog(T, K.Pueblo - 0.3, K.Pueblo + 0.4)} zona={kprog(T, K.Pueblo + 1.0, K.Pueblo + 1.6)} />
            {(() => { const [x1, y1] = MP(96.3, 17.6), [x2, y2] = MP(101.2, 15.2), e = kprog(T, K.Pueblo + 2.3, K.Pueblo + 2.7, kEase.rebote), f = kprog(T, K.Pueblo + 2.8, K.Pueblo + 3.2, kEase.rebote);
              return <g><TextoSvg x={x1} y={y1} tam={58} color={KC.orange} s={klerp(0.3, 1, e)} o={kprog(T, K.Pueblo + 2.3, K.Pueblo + 2.5)}>BIRMANIA</TextoSvg>
                <TextoSvg x={x2} y={y2} tam={58} color={KC.pink} s={klerp(0.3, 1, f)} o={kprog(T, K.Pueblo + 2.8, K.Pueblo + 3.0)}>TAILANDIA</TextoSvg></g>; })()}
          </g>}
          {aBarco > 0 && <g opacity={aBarco}>
            <rect x={-20} y={-20} width={KW + 40} height={680} fill="#ffd36b" />
            <SolDibujo x={880} y={420} r={80} T={T} />
            <AguaFondo T={T} y0={640} />
            <FondoMar T={T} y={1170} />
            <path d={`M -20 640 ${Array.from({ length: 9 }, (_, i) => `q 65 ${i % 2 ? 18 : -18} 130 0`).join(' ')}`} fill="none" stroke="#fff" strokeWidth={8} transform={`translate(${-(T * 30) % 130} 0)`} />
            <g transform={`translate(400 ${650 + 6 * Math.sin(T * 1.6)})`}><Kabang T={T} s={0.95} /></g>
            {buceo > 0 && <><NinoNadando x={klerp(700, 640, buceo)} y={klerp(600, 970, buceo)} rot={klerp(80, 25, buceo)} s={0.82} T={T} seed={1} brazo={kprog(T, K.Pueblo + 6.6, K.Pueblo + 7.4)} />
              <Burbujas T={T} x={klerp(700, 640, buceo)} y={klerp(600, 930, buceo)} alto={300} n={5} seed={4} /></>}
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Pueblo + 4.6} until={K.Estudio - 0.1} texto="viven del mar" x={300} y={440} tam={46} borde={KC.yellow} />
        <Etq T={T} at={K.Pueblo + 5.4} until={K.Estudio - 0.1} x={130} y={770} texto="barco moken (kabang)" lado="der" tam={32} />
      </Escena>

      {/* 5 · el estudio de 2003 */}
      <Escena T={T} a={K.Estudio} b={K.Doble} zoom={0.03} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {(() => { const e = kprog(T, K.Estudio + 2.3, K.Estudio + 2.9, kEase.sale); return <g opacity={e} transform={`translate(0 ${(1 - e) * 300})`}>
            <rect x={60} y={720} width={960} height={390} rx={30} fill="#2bb8e8" stroke={KC.ink} strokeWidth={9} />
            <path d={`M 60 750 ${Array.from({ length: 8 }, (_, i) => `q 60 ${i % 2 ? 14 : -14} 120 0`).join(' ')}`} fill="none" stroke="#fff" strokeWidth={6} transform={`translate(${-(T * 30) % 120} 0)`} />
            <line x1={60} y1={905} x2={1020} y2={905} stroke="#fff" strokeWidth={5} strokeDasharray="20 16" opacity=".7" />
            <NinoNadando x={290} y={800} s={0.62} rot={4} T={T} brazo={0.3} />
            <NinoNadando x={290} y={995} s={0.62} rot={4} T={T} seed={2} piel={PIEL_EU} pelo={PELO_EU} playera={KC.mint} short="#7a2b5e" brazo={0.3} />
            <Rayas x={860} y={805} w={150} h={110} n={8} id="e1" />
            <TextoSvg x={420} y={885} tam={34} color={KC.white} fuente="texto">niños moken</TextoSvg>
            <Rayas x={860} y={1005} w={150} h={110} n={8} id="e2" />
            <TextoSvg x={420} y={1085} tam={34} color={KC.white} fuente="texto">niños europeos</TextoSvg>
          </g>; })()}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Doble - 0.1} anio="2003" quien="Anna Gislén" revista="Universidad de Lund, Suecia" x={540} y={500} />
      </Escena>

      {/* 6 · el resultado: detalles más de dos veces más finos */}
      <Escena T={T} a={K.Doble} b={K.Pregunta} zoom={0.03} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {(() => { const e1 = kprog(T, K.Doble + 0.3, K.Doble + 0.7, kEase.rebote), e2 = kprog(T, K.Doble + 0.6, K.Doble + 1.0, kEase.rebote); return <g>
            <g transform={`translate(290 640) scale(${e1})`}><Rayas x={0} y={0} w={300} h={220} n={16} id="d1" marco={KC.yellow} /></g>
            <g transform={`translate(790 640) scale(${e2})`}><Rayas x={0} y={0} w={300} h={220} n={8} id="d2" marco="#fff" /></g>
            <TextoSvg x={290} y={810} tam={38} color={KC.white} fuente="texto" o={e1}>niños moken</TextoSvg>
            <TextoSvg x={790} y={810} tam={38} color={KC.white} fuente="texto" o={e2}>niños europeos</TextoSvg>
            <BarraH x={140} y={920} ancho={800} alto={64} v={RMK * kprog(T, K.Doble + 1.2, K.Doble + 2.0, kEase.sale)} color={KC.yellow} etiqueta="niños moken" />
            <BarraH x={140} y={1070} ancho={800} alto={64} v={REU * kprog(T, K.Doble + 1.2, K.Doble + 2.0, kEase.sale)} color="#fff" etiqueta="niños europeos" />
          </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Doble + 1.6} until={K.Pregunta - 0.1} texto="más de 2 veces más fino" x={540} y={430} tam={50} borde={KC.yellow} />
      </Escena>

      {/* 7 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Pupila} color={KC.pink} />

      {/* 8 · cómo lo hacen: pupila chiquita + cristalino abombado, como el diafragma de una cámara */}
      <Escena T={T} a={K.Pupila} b={K.Entrenar} zoom={0.03} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g transform={`translate(0 0) scale(1)`} opacity={kprog(T, K.Pupila - 0.2, K.Pupila + 0.3)}>
            <OjoFrente x={280} y={600} s={0.95} rp={rp} />
            <Rotulo x={280} y={600 + rp * 0.95} tx={280} ty={800} texto="pupila" p={kprog(T, K.Pupila + 0.6, K.Pupila + 0.9)} />
          </g>
          <g opacity={kprog(T, K.Pupila + 2.0, K.Pupila + 2.4)}>
            <OjoLado cx={830} cy={600} R={140} T={T} lente={lente} />
            <Rotulo x={830 + 0.6 * 140} y={600 + 0.3 * 140} tx={840} ty={800} texto="cristalino" p={kprog(T, K.Pupila + 2.4, K.Pupila + 2.7)} />
            {lente > 0.05 && [-1, 1].map((sg) => <path key={sg} d={`M ${830 + 84 + sg * 70} ${600 - 75} l ${-sg * 26} 0`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={lente} />)}
          </g>
          <g opacity={kprog(T, K.Pupila + 3.8, K.Pupila + 4.2)}>
            <Diafragma x={280} y={1030} r={130} a={apert} T={T} />
            <g transform="translate(780 1030)">
              <defs><clipPath id="foto"><rect x={-180} y={-125} width={360} height={250} rx={12} /></clipPath><Borr id="bfoto" d={klerp(14, 0, nitido)} /></defs>
              <rect x={-196} y={-141} width={392} height={282} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={8} />
              <g clipPath="url(#foto)"><g filter="url(#bfoto)" transform="translate(-180 -125) scale(0.42) translate(-80 -900)">
                <rect x={0} y={800} width={1080} height={700} fill={AGUA1} /><FondoMar T={T} y={1150} /></g></g>
            </g>
            <FlechaRecta x1={430} y1={1030} x2={560} y2={1030} p={kprog(T, K.Pupila + 4.4, K.Pupila + 4.9)} color={KC.yellow} grosor={12} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Pupila + 5.6} until={K.Entrenar - 0.1} texto="más nítido" x={780} y={880} tam={42} borde={KC.leaf} />
      </Escena>

      {/* 9 · 2006: niños europeos entrenados un mes también lo lograron */}
      <Escena T={T} a={K.Entrenar} b={K.Cierre} zoom={0.03} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform="translate(540 400) scale(0.85) translate(-540 -400)"><Calendario T={T} x={540} y={420} p={kprog(T, K.Entrenar - 0.2, K.Entrenar + 0.5, kEase.rebote)} marc={marc} /></g>
          <BarraH x={140} y={950} ancho={800} alto={64} v={RMK} color={KC.yellow} etiqueta="niños moken" />
          <BarraH x={140} y={1100} ancho={800} alto={64} v={vEU} color={vEU > 0.97 ? KC.yellow : '#fff'} etiqueta="niños europeos entrenados" />
        </Lienzo>
        <Chip T={T} at={K.Entrenar + 0.9} until={K.Entrenar + 3.4} texto="un mes" x={880} y={360} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Entrenar + 4.8} until={K.Cierre - 0.1} texto="¡también lo lograron!" x={540} y={850} tam={44} borde={KC.leaf} />
      </Escena>

      {/* 10 · cierre: el mismo mar del inicio, ahora dos niños ven claro */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.04} fondo={AGUA1}>
        <Lienzo>
          <AguaFondo T={T} />
          <FondoMar T={T} y={1150} />
          <Pez x={(T * 90) % 1400 - 200} y={760} s={0.8} T={T} color={KC.yellow} />
          <NinoNadando x={470 + 14 * Math.sin(T * 1.3)} y={850} rot={18} T={T} brazo={0.8} />
          <NinoNadando x={klerp(-300, 560, kprog(T, K.Cierre + 0.4, K.Cierre + 2.2, kEase.sale)) + 12 * Math.sin(T * 1.1)} y={1050} rot={12} s={0.85} T={T} seed={2} piel={PIEL_EU} pelo={PELO_EU} playera={KC.mint} short="#7a2b5e" brazo={0.9} />
          <Burbujas T={T} x={680} y={820} alto={380} />
          <VistaBurbuja T={T} x={230} y={530} r={125} d={klerp(12, 0, kprog(T, K.Cierre + 1.6, K.Cierre + 3.0, kEase.suave))} etiqueta="se aprende" color={KC.yellow} id="c1" p={kprog(T, K.Cierre + 1.0, K.Cierre + 1.5, kEase.rebote)} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 3.0} until={K.Outro - 0.1} texto="un niño lo puede aprender" x={600} y={300} tam={46} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Borroso - 0.1} texto="Veían bajo el agua *mejor que tú.*" />
      <Subtitulo T={T} idx={1} at={K.Borroso + 0.1} until={K.Cornea - 0.1} texto="Abres los ojos: *todo borroso.*" />
      <Subtitulo T={T} idx={2} at={K.Cornea + 0.1} until={K.Agua - 0.1} texto="La córnea enfoca *gracias al aire.*" />
      <Subtitulo T={T} idx={3} at={K.Agua + 0.1} until={K.Pueblo - 0.1} texto="Bajo el agua: *fuera de foco.*" />
      <Subtitulo T={T} idx={4} at={K.Pueblo + 0.1} until={K.Estudio - 0.1} texto="Los moken: *un pueblo del mar.*" />
      <Subtitulo T={T} idx={5} at={K.Estudio + 0.1} until={K.Doble - 0.1} texto="2003: *moken vs. europeos.*" />
      <Subtitulo T={T} idx={6} at={K.Doble + 0.1} until={K.Pregunta - 0.1} texto="Detalles *más de 2 veces* más finos." />
      <Subtitulo T={T} idx={7} at={K.Pregunta + 0.1} until={K.Pupila - 0.1} texto="¿Cómo *lo hacen?*" />
      <Subtitulo T={T} idx={8} at={K.Pupila + 0.1} until={K.Entrenar - 0.1} texto="Pupila chiquita: *como una cámara.*" />
      <Subtitulo T={T} idx={9} at={K.Entrenar + 0.1} until={K.Cierre - 0.1} texto="2006: *en un mes lo lograron.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No es superpoder: *se aprende.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 5.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Cornea + 0.6, K.Agua - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Agua + 1.4, K.Pueblo - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Pueblo + 4.6, K.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Estudio + 3.2, K.Doble - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Doble + 0.8, K.Pregunta - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Pupila + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pupila + 3.4, K.Entrenar - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Entrenar + 0.3, K.Cierre - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="39" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function MokenApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Moken /></CompositionStage></div>;
}
window.MokenApp = MokenApp;
