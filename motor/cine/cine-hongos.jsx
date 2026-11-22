// cine-hongos.jsx — hongos y laboratorio con detalle real: setas (Pleurotus), champiñón (Agaricus), micelio, cajas Petri, moho verde (Trichoderma).
// Morfología: Pleurotus = sombreros en repisa/abanico con láminas decurrentes y pie corto lateral; Agaricus = sombrero redondo, láminas libres rosas→cafés, anillo en el pie.

// Un sombrero de seta tipo "oreja" (Pleurotus). (x,y) = punto donde nace del pie. ang = hacia dónde abre. g = crecimiento 0..1.
function Sombrero({ x, y, ang = -20, tam = 120, color = '#f28bb0', g = 1, seed = 1, laminas = true, borde }) {
  const s = tam * g, r = R(seed), ond = Array.from({ length: 9 }, () => (r() - 0.5) * 0.16);
  const b = borde || cla(color, 0.35);
  // contorno en abanico con orilla ondulada
  let d = 'M 0 0 ';
  for (let i = 0; i <= 8; i++) { const a = (-70 + i * 17.5) * Math.PI / 180, rr = s * (1 + ond[i]); d += `${i === 0 ? 'L' : 'Q'} ${i === 0 ? '' : `${Math.cos(a - 0.15) * rr * 1.04} ${Math.sin(a - 0.15) * rr * 0.62 * 1.04} `}${Math.cos(a) * rr} ${Math.sin(a) * rr * 0.62} `; }
  d += 'Z';
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={d} fill={color} />
    {laminas && Array.from({ length: 24 }, (_, i) => { const a = (-66 + i * 5.6) * Math.PI / 180; return <path key={i} d={`M ${s * 0.06} 0 L ${Math.cos(a) * s * 0.96} ${Math.sin(a) * s * 0.6}`} stroke={osc(color, 0.25)} strokeWidth={Math.max(0.8, s * 0.012)} opacity={0.55} />; })}
    <path d={d} fill="url(#c-esfera)" opacity={0.55} />
    <path d={d} fill="none" stroke={b} strokeWidth={Math.max(1.5, s * 0.03)} opacity={0.8} />
    <ellipse cx={s * 0.15} cy={0} rx={s * 0.16} ry={s * 0.08} fill={cla(color, 0.5)} opacity={0.5} />
  </g>;
}
// Racimo de setas (Pleurotus) saliendo de un punto (una rajada en la bolsa o un tronco).
function Racimo({ x, y, n = 7, tam = 110, color = '#f28bb0', g = 1, t = 0, seed = 3, abre = 1, dir = 0 }) {
  const r = R(seed);
  const items = Array.from({ length: n }, (_, i) => ({ a: dir + (-70 + (140 * i) / Math.max(1, n - 1)) * abre + (r() - 0.5) * 16, k: 0.6 + r() * 0.55, d: 10 + r() * 26, gi: kclamp(g * (1.2 - r() * 0.4), 0, 1) }));
  items.sort((a, b) => Math.abs(b.a - dir) - Math.abs(a.a - dir));
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={6} rx={tam * 0.5} ry={tam * 0.12} fill="#000" opacity={0.25} filter="url(#c-b8)" />
    {items.map((it, i) => { const ar = (it.a - 90) * Math.PI / 180, px = Math.cos(ar) * it.d * it.gi, py = Math.sin(ar) * it.d * it.gi;
      return <g key={i}>
        <path d={`M 0 0 L ${px} ${py}`} stroke={cla(color, 0.45)} strokeWidth={tam * 0.12 * it.gi} strokeLinecap="round" />
        {it.gi < 0.25
          ? <circle cx={px} cy={py} r={tam * 0.12 * (0.4 + it.gi * 3)} fill={color} />
          : <Sombrero x={px} y={py} ang={it.a - 90 + mece(t, i + seed, 0.3) * 2} tam={tam * it.k} color={color} g={it.gi} seed={seed * 10 + i} />}
      </g>; })}
  </g>;
}
// Primordios: bolitas apiñadas que anuncian las setas.
function Primordios({ x, y, n = 18, r0 = 8, color = '#7d8ea3', seed = 4, g = 1 }) {
  const r = R(seed);
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => { const a = r() * 6.28, d = Math.sqrt(r()) * r0 * 4, rr = r0 * (0.6 + r() * 0.7) * g;
    return <g key={i}><circle cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.6} r={rr} fill={color} /><circle cx={Math.cos(a) * d} cy={Math.sin(a) * d * 0.6} r={rr} fill="url(#c-esfera)" /></g>; })}</g>;
}
// Champiñón (Agaricus bisporus). corte = muestra láminas por debajo.
function Champinon({ x, y, s = 1, rot = 0, tono = '#f1ebe0' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={8} cy={6} rx={90} ry={16} fill="#000" opacity={0.3} filter="url(#c-b8)" />
    <path d="M -34 0 Q -38 -60 -30 -110 L 30 -110 Q 38 -60 34 0 Z" fill="#f4efe4" /><path d="M -34 0 Q -38 -60 -30 -110 L 30 -110 Q 38 -60 34 0 Z" fill="url(#c-cilindro)" />
    <path d="M -36 -96 Q 0 -80 36 -96 L 32 -84 Q 0 -70 -32 -84 Z" fill="#e9e1d2" />
    <path d="M -100 -110 Q -96 -122 -80 -126 L 80 -126 Q 96 -122 100 -110 Z" fill="#a8746a" />
    {Array.from({ length: 30 }, (_, i) => <path key={i} d={`M ${-92 + i * 6.2} -112 L ${-60 + i * 4} -124`} stroke="#6b4038" strokeWidth={1.5} opacity={0.6} />)}
    <path d="M -104 -112 Q -110 -230 0 -236 Q 110 -230 104 -112 Q 60 -126 0 -126 Q -60 -126 -104 -112 Z" fill={tono} />
    <path d="M -104 -112 Q -110 -230 0 -236 Q 110 -230 104 -112 Q 60 -126 0 -126 Q -60 -126 -104 -112 Z" fill="url(#c-esfera)" opacity={0.6} />
    {Array.from({ length: 10 }, (_, i) => { const r = R(40 + i); return <ellipse key={i} cx={-60 + r() * 120} cy={-200 + r() * 60} rx={6 + r() * 8} ry={3 + r() * 3} fill="#c9b8a0" opacity={0.35} />; })}
  </g>;
}
// Micelio: hifas blancas que crecen en abanico/radial desde un punto. g = radio relativo.
function Micelio({ x, y, r = 200, g = 1, seed = 5, n = 34, color = '#f6f3ea', o = 0.9, aplastado = 1, ang0 = 0, abre = 360 }) {
  const rr = R(seed), segs = [];
  const rama = (px, py, a, L, prof) => {
    if (prof > 4 || L < 4) return;
    const ex = px + Math.cos(a) * L, ey = py + Math.sin(a) * L * aplastado;
    segs.push([px, py, ex, ey, prof]);
    rama(ex, ey, a + (rr() - 0.5) * 0.5, L * (0.7 + rr() * 0.2), prof + 1);
    if (rr() < 0.7) rama(ex, ey, a + (rr() < 0.5 ? -1 : 1) * (0.4 + rr() * 0.5), L * 0.6, prof + 1);
  };
  for (let i = 0; i < n; i++) rama(0, 0, ((ang0 + (abre * (i + rr() * 0.6)) / n) * Math.PI) / 180, r * 0.32, 0);
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r * g * 0.55} fill={color} opacity={0.35} filter="url(#c-b8)" transform={`scale(1 ${aplastado})`} />
    {segs.map(([a, b, c, d, pr], i) => { const dist = Math.hypot(c, d / aplastado); if (dist > r * g) return null;
      return <path key={i} d={`M ${a} ${b} L ${c} ${d}`} stroke={color} strokeWidth={Math.max(0.6, 2.4 - pr * 0.45)} opacity={0.75} />; })}
  </g>;
}
// Caja Petri vista desde arriba en ángulo (elipse). medio = color del medio de cultivo. children = colonias (en coordenadas del centro).
function Petri({ x, y, r = 220, medio = '#e9d9a6', inclina = 0.55, children, id = 'p', tapa = true, derretido = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={14} cy={r * inclina * 0.25 + 14} rx={r * 1.04} ry={r * inclina * 1.04} fill="#000" opacity={0.4} filter="url(#c-b14)" />
    <ellipse cx={0} cy={18} rx={r} ry={r * inclina} fill="#cfe3e0" opacity={0.25} />
    <ellipse cx={0} cy={0} rx={r} ry={r * inclina} fill="#dff0ee" opacity={0.18} />
    <clipPath id={`c-petri-${id}`}><ellipse cx={0} cy={4} rx={r * 0.97} ry={r * inclina * 0.97} /></clipPath>
    <g clipPath={`url(#c-petri-${id})`}>
      <ellipse cx={0} cy={4} rx={r} ry={r * inclina} fill={medio} opacity={0.88} />
      {derretido > 0 && <ellipse cx={-r * 0.1 * derretido} cy={r * inclina * 0.3 * derretido} rx={r * 0.9} ry={r * inclina * 0.5} fill={cla(medio, 0.3)} opacity={0.5 * derretido} />}
      <g transform={`scale(1 ${inclina})`}>{children}</g>
      <ellipse cx={-r * 0.3} cy={-r * inclina * 0.4} rx={r * 0.4} ry={r * inclina * 0.16} fill="#fff" opacity={0.25} />
    </g>
    <ellipse cx={0} cy={0} rx={r} ry={r * inclina} fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={3} />
    <ellipse cx={0} cy={18} rx={r} ry={r * inclina} fill="none" stroke="#fff" strokeOpacity={0.3} strokeWidth={2} />
    {tapa && <g><ellipse cx={0} cy={-10} rx={r * 1.03} ry={r * inclina * 1.03} fill="#fff" opacity={0.06} /><ellipse cx={0} cy={-10} rx={r * 1.03} ry={r * inclina * 1.03} fill="none" stroke="#fff" strokeOpacity={0.4} strokeWidth={2} />
      <path d={`M ${-r * 0.8} ${-r * inclina * 0.5} Q ${-r * 0.4} ${-r * inclina * 0.95} ${r * 0.2} ${-r * inclina * 1.0}`} stroke="#fff" strokeOpacity={0.55} strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
  </g>;
}
// Colonias de bacterias (puntitos cremosos y brillantes).
function Colonias({ n = 40, r = 200, seed = 6, g = 1, color = '#f2e6c4' }) {
  const rr = R(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = rr() * 6.28, d = Math.sqrt(rr()) * r * 0.9, cr = (3 + rr() * 12) * g;
    return <g key={i}><circle cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={cr} fill={color} /><circle cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={cr} fill="url(#c-esfera)" /><circle cx={Math.cos(a) * d - cr * 0.3} cy={Math.sin(a) * d - cr * 0.3} r={cr * 0.25} fill="#fff" opacity={0.7} /></g>; })}</g>;
}
// Moho verde (Trichoderma): anillos concéntricos de verde oscuro a verde claro con borde blanco que avanza.
function Moho({ x, y, r = 120, g = 1, seed = 2, aplastado = 1 }) {
  const rr = R(seed), R0 = r * g;
  if (R0 <= 1) return null;
  return <g transform={`translate(${x} ${y}) scale(1 ${aplastado})`}>
    <circle r={R0} fill="#f2f2ea" opacity={0.8} filter="url(#c-b4)" />
    <circle r={R0 * 0.86} fill="#9cc93a" />
    <circle r={R0 * 0.62} fill="#4f9a2a" />
    <circle r={R0 * 0.36} fill="#2e6a1e" />
    {Array.from({ length: 40 }, (_, i) => { const a = rr() * 6.28, d = rr() * R0 * 0.85; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={1.5 + rr() * 3} fill="#1f4f14" opacity={0.6} />; })}
    <circle r={R0 * 0.86} fill="url(#c-esfera)" opacity={0.5} />
  </g>;
}
// Bolsa de cultivo (sustrato colonizado) con filtro y una rajada por donde salen las setas.
function BolsaCultivo({ x, y, w = 220, h = 320, sustrato = '#c9a46a', colonizado = 1, filtro = true, children, tex = 'aserrin' }) {
  return <g transform={`translate(${x} ${y})`}>
    <Sombra x={10} y={4} rx={w * 0.6} ry={16} o={0.5} b="c-b8" />
    <path d={`M ${-w / 2} 0 L ${-w / 2} ${-h} Q 0 ${-h - 40} ${w / 2} ${-h} L ${w / 2} 0 Z`} fill={`url(#c-${tex})`} />
    <path d={`M ${-w / 2} 0 L ${-w / 2} ${-h} Q 0 ${-h - 40} ${w / 2} ${-h} L ${w / 2} 0 Z`} fill={sustrato} opacity={0.35} />
    <path d={`M ${-w / 2} 0 L ${-w / 2} ${-h} Q 0 ${-h - 40} ${w / 2} ${-h} L ${w / 2} 0 Z`} fill="#fbfaf4" opacity={0.85 * colonizado} />
    {Array.from({ length: 26 }, (_, i) => { const r = R(3000 + i); return <ellipse key={i} cx={(r() - 0.5) * w * 0.85} cy={-r() * h * 0.95} rx={8 + r() * 26} ry={5 + r() * 14} fill={sustrato} opacity={0.5 * (1.1 - colonizado)} filter="url(#c-b2)" />; })}
    <path d={`M ${-w / 2} 0 L ${-w / 2} ${-h} Q 0 ${-h - 40} ${w / 2} ${-h} L ${w / 2} 0 Z`} fill="url(#c-cilindro)" opacity={0.5} />
    {/* plástico */}
    <path d={`M ${-w / 2 - 6} 6 L ${-w / 2 - 8} ${-h - 10} Q 0 ${-h - 60} ${w / 2 + 8} ${-h - 10} L ${w / 2 + 6} 6 Z`} fill="#fff" opacity={0.12} />
    <path d={`M ${-w / 2 + 12} ${-h + 20} L ${-w / 2 + 16} -20`} stroke="#fff" strokeWidth={8} opacity={0.4} strokeLinecap="round" />
    <path d={`M ${-w / 2 - 6} ${-h - 10} Q 0 ${-h - 60} ${w / 2 + 6} ${-h - 10} L ${w / 2 - 20} ${-h - 90} L ${-w / 2 + 20} ${-h - 90} Z`} fill="#fff" opacity={0.18} />
    {filtro && <rect x={-30} y={-h - 80} width={60} height={34} rx={4} fill="#f6f1e4" opacity={0.9} />}
    {children}
  </g>;
}

Object.assign(window, { Sombrero, Racimo, Primordios, Champinon, Micelio, Petri, Colonias, Moho, BolsaCultivo });
