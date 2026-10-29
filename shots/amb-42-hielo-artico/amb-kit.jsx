// amb-kit.jsx — piezas de la serie Shot Ambiental (lote igualar-ambiental, 28 oct 2026). Se carga después de kit-robert.jsx.
// Todo es esquemático y función del tiempo T, como el resto del motor. Devuelven <g> (para dentro de un <svg>) salvo los que dicen "div".

// (div) Fondo de espacio con estrellas que titilan.
function FondoEspacio({ T, n = 70, seed = 9, fondo = '#070b1d' }) {
  const r = krng(seed), est = Array.from({ length: n }, () => ({ x: r() * KW, y: r() * KH, s: 1.5 + r() * 3.5, f: 0.5 + r() * 2, p: r() * 6 }));
  return <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, #16224a 0%, ${fondo} 70%)` }}>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {est.map((e, i) => <circle key={i} cx={e.x} cy={e.y} r={e.s} fill="#fff" opacity={0.35 + 0.45 * Math.abs(Math.sin(T * e.f + e.p))} />)}
    </svg>
  </div>;
}
// (div) Barra de escala fija con texto (para mapas y esquemas grandes: km, m…). largo en px.
function EscalaFija({ T, texto, largo = 200, x = 60, y = 1430, color = KC.texto, o = 1 }) {
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA, opacity:o }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>
  </div>;
}
// Átomo como bolita con letra.
function Atomo({ x, y, r = 34, color = '#ff4b4b', letra = 'O', s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.28} fill="#fff" opacity=".45" />
    <text y={r * 0.38} textAnchor="middle" style={{ font:`900 ${r * 1.05}px ${KF.texto}` }} fill={KC.ink}>{letra}</text>
  </g>;
}
// Molécula de ozono (O3, doblada) u oxígeno (O2). rompe 0..1 separa el tercer oxígeno.
function Ozono({ x, y, s = 1, rot = 0, rompe = 0, o = 1, r = 30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={-r * 1.3} y1={r * 0.6} x2={0} y2={0} stroke={KC.ink} strokeWidth={8} />
    {rompe < 0.5 && <line x1={0} y1={0} x2={r * 1.3} y2={r * 0.6} stroke={KC.ink} strokeWidth={8} />}
    <Atomo x={-r * 1.3} y={r * 0.6} r={r} />
    <Atomo x={0} y={0} r={r} />
    <Atomo x={r * 1.3 + rompe * 90} y={r * 0.6 + rompe * 40} r={r} />
  </g>;
}
// Molécula de CFC esquemática: carbono al centro, 2 cloros (verde) y 2 flúor (amarillo). suelta 0..1 libera un cloro.
function CFC({ x, y, s = 1, rot = 0, suelta = 0, o = 1 }) {
  const r = 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {[[0, -1], [1, 0], [0, 1], [-1, 0]].map(([a, b], i) => (i === 0 && suelta > 0.3) ? null : <line key={i} x1={0} y1={0} x2={a * 62} y2={b * 62} stroke={KC.ink} strokeWidth={7} />)}
    <Atomo x={0} y={0} r={r} color="#555b66" letra="C" />
    <Atomo x={0 + suelta * 40} y={-62 - suelta * 120} r={r} color={KC.leaf} letra="Cl" />
    <Atomo x={62} y={0} r={r} color={KC.leaf} letra="Cl" />
    <Atomo x={0} y={62} r={r * 0.85} color={KC.yellow} letra="F" />
    <Atomo x={-62} y={0} r={r * 0.85} color={KC.yellow} letra="F" />
  </g>;
}
// La Tierra vista desde el polo sur (como las imágenes de la NASA): Antártida al centro y el agujero de ozono encima.
// hueco 0..1 = tamaño del agujero (esquemático).
function TierraPolo({ T, x = 540, y = 820, r = 380, hueco = 1, etiqueta = true }) {
  const id = 'tp' + Math.round(x + y);
  const ant = 'M -95 -40 Q -60 -105 10 -95 Q 80 -110 110 -50 Q 150 0 105 50 Q 120 100 40 105 Q -20 125 -70 85 Q -130 70 -120 15 Q -140 -10 -95 -40 Z';
  const k = r / 380, w = (i) => 1 + 0.06 * Math.sin(T * 1.3 + i);
  const hp = Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2, rr = 175 * hueco * w(i) * k; return `${(Math.cos(a) * rr * 1.12).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y})`}>
    <defs><radialGradient id={id} cx="45%" cy="40%" r="65%"><stop offset="0%" stopColor="#3aa0ff" /><stop offset="100%" stopColor="#0b3d91" /></radialGradient></defs>
    <circle r={r + 26} fill="none" stroke="#7fe3ff" strokeOpacity=".35" strokeWidth={22} />
    <circle r={r} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={8} />
    {/* puntas de los continentes del sur (esquemático) */}
    <path d={`M ${-0.62 * r} ${-0.86 * r} q 40 70 10 150 q -30 40 -60 -20 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.55 * r} ${-0.72 * r} q 60 30 90 120 q -60 30 -110 -40 Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${0.5 * r} ${0.55 * r} q 90 -10 110 70 q -50 60 -130 10 Z`} fill="#c9a256" stroke={KC.ink} strokeWidth={5} />
    <g transform={`scale(${k * 1.45})`}><path d={ant} fill="#f4f8ff" stroke={KC.ink} strokeWidth={4} /></g>
    {hueco > 0.02 && <polygon points={hp} fill="#8b2fd6" fillOpacity=".62" stroke="#d9a6ff" strokeWidth={5} strokeDasharray="14 10" />}
    {etiqueta && hueco > 0.15 && <text y={-175 * hueco * k - 22} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">agujero de ozono</text>}
  </g>;
}
// Sol con rayos que giran.
function Sol({ T, x, y, r = 90 }) {
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${T * 20})`}>{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-8} y={-r - 50} width={16} height={36} rx={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30})`} />)}</g>
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-25} cy={-10} r={8} fill={KC.ink} /><circle cx={25} cy={-10} r={8} fill={KC.ink} />
    <path d="M -25 25 Q 0 45 25 25" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}

Object.assign(window, { FondoEspacio, EscalaFija, Atomo, Ozono, CFC, TierraPolo, Sol });
