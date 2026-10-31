// Shot Ambiental #30 · Tu noche en la ciudad es más caliente que la del rancho (isla de calor urbana) — NARRADO (N2 el número + N1 por dentro).
// Datos: EPA de EE. UU. ("What Are Heat Islands?", "Benefits of Trees and Vegetation") y Jáuregui (1997), Atmospheric Environment 31(22).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático (la "cámara térmica" y el mapa del Valle de México son esquemas).

const IC = { asfalto:'#34373f', concreto:'#b9b2a6', techo:'#3b3b44', calor:'#ff3b2f', frio:'#3a7bff', piel:'#f1b48f', adobe:'#d9a066', noche:'#1b2550' };

// Termómetro: tubo con bulbo. valor 0..1. (y = base del tubo)
function Termometro({ x, y, alto = 300, valor = 0.5, color = IC.calor, etiqueta, s = 1, tam = 30 }) {
  const h = alto * kclamp(valor, 0, 1);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-24} y={-alto - 20} width={48} height={alto + 30} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-h} width={24} height={h + 10} rx={10} fill={color} />
    <circle cy={34} r={42} fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-12} cy={22} r={10} fill="#fff" opacity=".5" />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={24} y1={-alto * q} x2={44} y2={-alto * q} stroke={KC.ink} strokeWidth={5} />)}
    {etiqueta && <text y={112} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{etiqueta}</text>}
  </g>;
}
// Ventilador de pedestal con aspas que giran.
function Ventilador({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={0} width={16} height={130} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
    <ellipse cy={135} rx={50} ry={14} fill="#9aa3ad" stroke={KC.ink} strokeWidth={5} />
    <circle r={70} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${T * 720})`}>{[0, 120, 240].map((a) => <ellipse key={a} cx={0} cy={-36} rx={20} ry={34} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}</g>
    <circle r={12} fill={KC.ink} />
  </g>;
}
// Persona dormida en una cama. suda: gotas de sudor. cobija: duerme tapado (fresco).
function Cama({ T, x, y, s = 1, suda = 0, cobija = 0, seed = 1 }) {
  const gotas = Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.9 + i / 4) % 1); return { x: -140 + i * 18, y: -60 + u * 70, o: suda * (1 - u) }; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={-110} width={26} height={150} rx={8} fill="#8a5a33" stroke={KC.ink} strokeWidth={5} />
    <rect x={-180} y={-30} width={380} height={50} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <rect x={-175} y={20} width={14} height={40} fill="#8a5a33" stroke={KC.ink} strokeWidth={4} />
    <rect x={180} y={20} width={14} height={40} fill="#8a5a33" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-125} cy={-42} rx={50} ry={22} fill="#e9eef5" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-120} cy={-72} r={36} fill={IC.piel} stroke={KC.ink} strokeWidth={5} />
    <path d="M -150 -100 Q -120 -125 -88 -98" stroke="#3a2a1e" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -134 -72 q 6 5 12 0 M -112 -72 q 6 5 12 0" stroke={KC.ink} strokeWidth={4} fill="none" />
    {cobija > 0
      ? <g><path d="M -90 -60 Q 40 -95 195 -55 L 195 -20 L -95 -20 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-50 + i * 55} y1={-78 + Math.abs(2 - i) * 4} x2={-50 + i * 55} y2={-22} stroke={KC.yellow} strokeWidth={10} />)}
          {[0, 1, 2].map((i) => { const u = ((T * 0.5 + i / 3) % 1); return <text key={i} x={-90 + u * 60} y={-130 - u * 90} style={{ font:`900 ${30 + i * 8}px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke" opacity={1 - u}>z</text>; })}</g>
      : <g><path d="M -90 -48 Q 40 -62 195 -46 L 195 -22 L -95 -22 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} opacity=".9" />
          <path d="M -60 -50 Q 10 -80 80 -48" fill={IC.piel} stroke={KC.ink} strokeWidth={5} /></g>}
    {gotas.map((g, i) => <path key={i} d={`M ${g.x} ${g.y} q -8 14 0 20 q 8 -6 0 -20 Z`} fill="#7fd3ff" stroke={KC.ink} strokeWidth={2.5} opacity={g.o} />)}
  </g>;
}
// Cuarto de ciudad o de rancho (panel de la pantalla partida). x,y = esquina; w,h tamaño. termico 0..1 = tinte de cámara térmica.
function Cuarto({ T, x, y, w = 495, h = 440, tipo = 'ciudad', temp = 0.5, termico = 0, rotulo }) {
  const ciudad = tipo === 'ciudad', id = 'cu' + tipo + Math.round(x);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id={id}><rect width={w} height={h} rx={26} /></clipPath>
      <radialGradient id={id + 'g'} cx="50%" cy="55%" r="70%"><stop offset="0%" stopColor="#ffe11a" /><stop offset="45%" stopColor="#ff8a1f" /><stop offset="100%" stopColor="#d62828" /></radialGradient></defs>
    <g clipPath={`url(#${id})`}>
      <rect width={w} height={h} fill={ciudad ? '#f2c38b' : '#c7d8f0'} />
      {!ciudad && Array.from({ length: 7 }, (_, i) => <rect key={i} x={0} y={i * 64} width={w} height={4} fill="rgba(0,0,0,.06)" />)}
      {/* ventana */}
      <rect x={w - 200} y={40} width={170} height={150} rx={10} fill={IC.noche} stroke={KC.ink} strokeWidth={7} />
      {ciudad
        ? <g>{[[0, 70], [40, 100], [85, 60], [120, 90]].map(([bx, bh], i) => <g key={i}><rect x={w - 196 + bx} y={186 - bh} width={36} height={bh} fill="#4b5470" />
            {Array.from({ length: Math.floor(bh / 22) }, (_, k) => <rect key={k} x={w - 190 + bx} y={194 - bh + k * 22} width={10} height={8} fill={KC.yellow} opacity={(i + k) % 3 ? 1 : 0.3} />)}</g>)}</g>
        : <g><path d={`M ${w - 196} 186 Q ${w - 140} 120 ${w - 90} 150 Q ${w - 60} 130 ${w - 34} 160 L ${w - 34} 186 Z`} fill="#3d4f3a" />
            {[[30, 30], [70, 60], [120, 40], [150, 75], [95, 95]].map(([sx, sy], i) => <circle key={i} cx={w - 200 + sx} cy={40 + sy} r={3 + (i % 2) * 2} fill="#fff" opacity={0.5 + 0.5 * Math.abs(Math.sin(T * 2 + i))} />)}
            <circle cx={w - 60} cy={72} r={18} fill="#fff6c8" /></g>}
      <line x1={w - 115} y1={40} x2={w - 115} y2={190} stroke={KC.ink} strokeWidth={6} />
      {/* piso */}
      <rect y={h - 70} width={w} height={70} fill={ciudad ? '#c99a6a' : '#b08560'} />
      <Cama T={T} x={w / 2 + 10} y={h - 90} s={0.82} suda={ciudad ? 1 : 0} cobija={ciudad ? 0 : 1} />
      {ciudad && <Ventilador T={T} x={70} y={h - 230} s={0.75} />}
      {termico > 0 && <rect width={w} height={h} fill={`url(#${id}g)`} opacity={0.55 * termico} style={{ mixBlendMode:'multiply' }} />}
      <Termometro x={ciudad ? 160 : 70} y={180} alto={120} valor={temp} color={ciudad ? IC.calor : IC.frio} s={0.8} />
    </g>
    <rect width={w} height={h} rx={26} fill="none" stroke={KC.ink} strokeWidth={9} />
    {rotulo && <g transform={`translate(${ciudad ? 24 : 24} ${h - 18})`}><text style={{ font:`900 40px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{rotulo}</text></g>}
  </g>;
}
// Vista aérea en "cámara térmica" (esquema): campo fresco alrededor y la ciudad como mancha caliente. calor 0..1.
function MapaTermico({ T, x = 60, y = 630, w = 960, h = 510, calor = 1 }) {
  const cx = w / 2, cy = h / 2;
  const pts = Array.from({ length: 28 }, (_, i) => { const a = i / 28 * Math.PI * 2; const r = (1 + 0.16 * Math.sin(a * 3 + 1) + 0.08 * Math.sin(a * 5) + 0.02 * Math.sin(T * 2 + i)) * 190 * (0.55 + 0.45 * calor);
    return `${(cx + Math.cos(a) * r * 1.35).toFixed(1)},${(cy + Math.sin(a) * r * 0.95).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y})`}>
    <defs><radialGradient id="mtc" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#fff3a0" /><stop offset="35%" stopColor="#ffd21a" /><stop offset="70%" stopColor="#ff7a1f" /><stop offset="100%" stopColor="#e3262f" /></radialGradient>
      <linearGradient id="mtf" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2c5fd6" /><stop offset="50%" stopColor="#20a6c9" /><stop offset="100%" stopColor="#2b8f6a" /></linearGradient>
      <clipPath id="mtclip"><rect width={w} height={h} rx={30} /></clipPath></defs>
    <g clipPath="url(#mtclip)">
      <rect width={w} height={h} fill="url(#mtf)" />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={i * 90 - 40} y1={0} x2={i * 90 + 60} y2={h} stroke="rgba(255,255,255,.12)" strokeWidth={14} />)}
      <polygon points={pts} fill="url(#mtc)" stroke="#fff" strokeWidth={4} strokeDasharray="12 10" />
      {Array.from({ length: 6 }, (_, i) => Array.from({ length: 8 }, (_, j) => { const bx = cx - 230 + j * 60, by = cy - 150 + i * 55; const d = Math.hypot((bx - cx) / 1.35, by - cy);
        return d < 170 * (0.55 + 0.45 * calor) ? <rect key={i + '-' + j} x={bx} y={by} width={40} height={36} fill="rgba(120,20,10,.22)" /> : null; }))}
    </g>
    <rect width={w} height={h} rx={30} fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Barra de colores de la cámara térmica.
function Leyenda({ x = 240, y = 1430, w = 600 }) {
  return <g transform={`translate(${x} ${y})`}>
    <defs><linearGradient id="lyg"><stop offset="0%" stopColor="#2c5fd6" /><stop offset="40%" stopColor="#20a6c9" /><stop offset="65%" stopColor="#ffd21a" /><stop offset="100%" stopColor="#e3262f" /></linearGradient></defs>
    <rect width={w} height={34} rx={17} fill="url(#lyg)" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={80} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>más fresco</text>
    <text x={w} y={80} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>más caliente</text>
  </g>;
}
// Árbol caricatura. crece 0..1. suda = gotitas de evapotranspiración que suben.
function Arbol({ T, x, y, s = 1, crece = 1, suda = 0, tinte = 0 }) {
  if (crece <= 0.01) return null;
  const k = s * kEase.rebote(kclamp(crece, 0, 1));
  const verde = mixHex('#3fbf4a', '#3a6fd6', tinte), verde2 = mixHex('#2f9a3a', '#2a4fa6', tinte);
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <ellipse cx={0} cy={6} rx={90} ry={16} fill="rgba(0,0,0,.25)" />
    <path d="M -14 0 L -10 -110 L 10 -110 L 14 0 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-50} cy={-140} r={55} fill={verde2} stroke={KC.ink} strokeWidth={6} />
    <circle cx={50} cy={-140} r={55} fill={verde2} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-185} r={70} fill={verde} stroke={KC.ink} strokeWidth={6} />
    {suda > 0 && Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.7 + i / 5) % 1); return <path key={i} d={`M ${-60 + i * 30} ${-220 - u * 120} q -7 12 0 17 q 7 -5 0 -17 Z`} fill="#9fe2ff" stroke={KC.ink} strokeWidth={2.5} opacity={suda * (1 - u)} />; })}
  </g>;
}
// Calle en corte (por dentro): edificio de concreto con techo, banqueta, asfalto y subsuelo.
// dia 0..1 (noche → día), carga 0..1 (calor guardado en los materiales), suelta 0..1 (ondas de calor de noche),
// blanco 0..1 (techo claro), arboles 0..1, campo 0..1 (a la derecha, pasto y árbol que se enfrían).
function Calle({ T, x = 40, y = 630, w = 1000, h = 520, dia = 1, carga = 0, suelta = 0, blanco = 0, arboles = 0, campo = 0, rayos = 0 }) {
  const cielo = mixHex(IC.noche, '#8fd8ff', dia), suelo = h - 110;
  const techoC = mixHex(IC.techo, '#f4f4f0', blanco);
  const glow = (o) => `rgba(255,59,47,${(o * carga).toFixed(3)})`;
  const ondas = (x0, y0, n, i0) => Array.from({ length: n }, (_, i) => { const u = ((T * 0.45 + i / n + i0 * 0.13) % 1);
    return <path key={i0 + '-' + i} d={`M ${x0 + i * 46} ${y0 - u * 160} q 12 -18 0 -36 q -12 -18 0 -36`} stroke={KC.orange} strokeWidth={7} fill="none" strokeLinecap="round" opacity={suelta * Math.sin(Math.PI * u) * carga * 1.4} />; });
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="calleclip"><rect width={w} height={h} rx={30} /></clipPath></defs>
    <g clipPath="url(#calleclip)">
      <rect width={w} height={h} fill={cielo} />
      {dia < 0.6 && Array.from({ length: 14 }, (_, i) => <circle key={i} cx={(i * 137) % w} cy={20 + (i * 53) % 140} r={3} fill="#fff" opacity={(1 - dia / 0.6) * (0.5 + 0.5 * Math.abs(Math.sin(T * 2 + i)))} />)}
      {dia > 0.05 && <g opacity={dia}><circle cx={w - 120} cy={90} r={52} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
        <g transform={`translate(${w - 120} 90) rotate(${T * 25})`}>{Array.from({ length: 10 }, (_, i) => <rect key={i} x={-6} y={-90} width={12} height={26} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 36})`} />)}</g></g>}
      {dia < 0.5 && <circle cx={w - 120} cy={90} r={40} fill="#fff6c8" opacity={1 - dia * 2} />}
      {/* edificio de concreto */}
      <rect x={80} y={170} width={360} height={suelo - 170} fill={mixHex(IC.concreto, '#ff7a5a', carga * 0.35)} stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 3 }, (_, i) => Array.from({ length: 4 }, (_, j) => <rect key={i + '-' + j} x={110 + j * 82} y={210 + i * 62} width={50} height={36} fill={dia > 0.5 ? '#bfe7ff' : KC.yellow} stroke={KC.ink} strokeWidth={4} />))}
      <rect x={66} y={146} width={388} height={30} fill={techoC} stroke={KC.ink} strokeWidth={7} />
      <rect x={66} y={146} width={388} height={30} fill={glow(0.85 * (1 - blanco))} />
      <rect x={80} y={176} width={360} height={suelo - 176} fill={glow(0.35)} />
      {/* casa chica */}
      <rect x={490} y={250} width={200} height={suelo - 250} fill={mixHex('#e8b27a', '#ff7a5a', carga * 0.3)} stroke={KC.ink} strokeWidth={7} />
      <rect x={476} y={230} width={228} height={26} fill={techoC} stroke={KC.ink} strokeWidth={7} />
      <rect x={476} y={230} width={228} height={26} fill={glow(0.85 * (1 - blanco))} />
      <rect x={560} y={suelo - 80} width={50} height={80} fill="#8a5a33" stroke={KC.ink} strokeWidth={5} />
      {/* banqueta, asfalto y subsuelo */}
      <rect x={0} y={suelo} width={w} height={18} fill="#d6d2c8" stroke={KC.ink} strokeWidth={5} />
      <rect x={0} y={suelo + 18} width={w} height={56} fill={IC.asfalto} />
      <rect x={0} y={suelo + 18} width={w} height={56} fill={glow(0.8)} />
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={20 + i * 150} y={suelo + 42} width={80} height={8} fill={KC.yellow} />)}
      <rect x={0} y={suelo + 74} width={w} height={60} fill="#7a5233" />
      {/* campo a la derecha (se enfría rápido de noche) */}
      {campo > 0 && <g opacity={campo}>
        <rect x={760} y={suelo - 4} width={w - 760} height={140} fill={mixHex('#58b85c', '#3a6fd6', 1 - dia)} stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${775 + i * 28} ${suelo} l 6 -24 l 6 24`} fill="none" stroke={mixHex('#2f8a35', '#1d3f9a', 1 - dia)} strokeWidth={5} />)}
        <Arbol T={T} x={890} y={suelo} s={0.9} tinte={1 - dia} />
      </g>}
      {/* árboles de banqueta */}
      <Arbol T={T} x={460} y={suelo + 8} s={1.0} crece={arboles} suda={arboles} />
      <Arbol T={T} x={760} y={suelo + 8} s={0.95} crece={kclamp(arboles * 1.3 - 0.3, 0, 1)} suda={arboles} />
      {/* rayos de sol: bajan; con techo claro, rebotan */}
      {rayos > 0 && [150, 300, 560, 860].map((rx, i) => { const u = ((T * 1.2 + i * 0.25) % 1); const yb = rx < 470 ? 146 : rx < 720 ? 230 : suelo + 18;
        const reb = (rx < 720) ? blanco : 0;
        return <g key={i} opacity={rayos}>
          <line x1={rx + 140} y1={20} x2={rx} y2={yb} stroke={KC.yellow} strokeWidth={9} strokeDasharray="26 18" strokeDashoffset={-u * 88} />
          {reb > 0.05 && <line x1={rx} y1={yb} x2={rx - 120} y2={yb - 180} stroke="#fff" strokeWidth={8} strokeDasharray="22 16" strokeDashoffset={-u * 76} opacity={reb} />}
        </g>; })}
      {/* ondas de calor que suben de noche */}
      {suelta > 0 && <g>{ondas(110, 140, 7, 0)}{ondas(500, 225, 4, 1)}{ondas(40, suelo + 10, 15, 2)}</g>}
    </g>
    <rect width={w} height={h} rx={30} fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Tarjeta con un dibujo (causas extra).
function Tarjeta({ T, x, y, w = 310, h = 440, at, texto, color = KC.paper, children }) {
  const e = kprog(T, at, at + 0.5, kEase.rebote);
  if (e <= 0) return null;
  return <g transform={`translate(${x + w / 2} ${y + h / 2}) scale(${e}) translate(${-w / 2} ${-h / 2})`}>
    <rect width={w} height={h} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} />
    {children}
    <text x={w / 2} y={h - 30} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{texto}</text>
  </g>;
}
// Coche visto de lado.
function Coche({ x, y, s = 1, color = KC.red }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 L -110 -40 Q -100 -60 -60 -62 L -30 -100 L 50 -100 L 80 -62 Q 115 -58 115 -30 L 115 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -22 -90 L 42 -90 L 64 -64 L -40 -64 Z" fill="#bfe7ff" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-60} cy={2} r={24} fill="#333" stroke={KC.ink} strokeWidth={5} /><circle cx={70} cy={2} r={24} fill="#333" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Aparato de aire acondicionado (mini split exterior) con ventilador que gira.
function Clima({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-60} width={160} height={120} rx={12} fill="#e9eef5" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-15} cy={0} r={42} fill="#cfd8e3" stroke={KC.ink} strokeWidth={5} />
    <g transform={`translate(-15 0) rotate(${T * 600})`}>{[0, 90, 180, 270].map((a) => <ellipse key={a} cy={-20} rx={9} ry={18} fill="#9aa3ad" stroke={KC.ink} strokeWidth={3} transform={`rotate(${a})`} />)}</g>
    {[0, 1, 2].map((i) => <line key={i} x1={42} y1={-30 + i * 22} x2={66} y2={-30 + i * 22} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function OndasCalor({ T, x, y, n = 3, dir = 'arriba', s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${dir === 'arriba' ? 0 : dir === 'der' ? 90 : -90})`}>
    {Array.from({ length: n }, (_, i) => { const u = ((T * 0.8 + i / n) % 1);
      return <path key={i} d={`M ${(i - (n - 1) / 2) * 34} ${-u * 70} q 10 -14 0 -28 q -10 -14 0 -28`} stroke={KC.orange} strokeWidth={7} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />; })}
  </g>;
}
// Mapa esquemático del Valle de México: cuenca con montañas, la mancha urbana, el Centro y Plan Texcoco.
function ValleMexico({ T, x = 60, y = 630, w = 960, h = 520, pines = 1 }) {
  const pc = kprog(pines, 0, 0.5, kEase.rebote), pt = kprog(pines, 0.4, 0.9, kEase.rebote);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="vmclip"><rect width={w} height={h} rx={30} /></clipPath></defs>
    <g clipPath="url(#vmclip)">
      <rect width={w} height={h} fill="#7fbf6a" />
      <path d={`M 90 80 Q 300 40 520 70 Q 760 50 880 140 Q 920 300 840 430 Q 600 500 380 470 Q 140 470 80 340 Q 50 200 90 80 Z`} fill="#ecdca8" stroke={KC.ink} strokeWidth={6} />
      {/* montañas alrededor */}
      {[[40, 120], [30, 300], [70, 470], [300, 520], [560, 530], [820, 500], [930, 330], [920, 140], [700, 30], [420, 20], [180, 30]].map(([mx, my], i) =>
        <path key={i} d={`M ${mx - 70} ${my + 40} L ${mx} ${my - 50} L ${mx + 70} ${my + 40} Z`} fill={i % 2 ? '#7a6248' : '#8d7458'} stroke={KC.ink} strokeWidth={5} />)}
      {/* mancha urbana */}
      <path d="M 170 150 Q 330 110 470 170 Q 540 260 480 360 Q 360 430 230 390 Q 140 300 170 150 Z" fill="#a9a6a0" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 5 }, (_, i) => <line key={'h' + i} x1={190} y1={190 + i * 45} x2={480} y2={190 + i * 45} stroke="rgba(0,0,0,.18)" strokeWidth={4} />)}
      {Array.from({ length: 6 }, (_, i) => <line key={'v' + i} x1={210 + i * 50} y1={160} x2={210 + i * 50} y2={400} stroke="rgba(0,0,0,.18)" strokeWidth={4} />)}
      {/* campo de Texcoco (oriente) */}
      <path d="M 600 200 Q 700 170 790 220 Q 820 320 740 370 Q 640 380 600 310 Z" fill="#b7d98a" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 5 }, (_, i) => <line key={'c' + i} x1={620 + i * 34} y1={230} x2={610 + i * 34} y2={350} stroke="#7fae4f" strokeWidth={5} />)}
    </g>
    <rect width={w} height={h} rx={30} fill="none" stroke={KC.ink} strokeWidth={9} />
    {pc > 0 && <g transform={`translate(330 280) scale(${pc})`}>
      <path d="M 0 0 C -40 -50 -40 -100 0 -100 C 40 -100 40 -50 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <rect x={-18} y={-82} width={36} height={26} fill="#f4efe4" stroke={KC.ink} strokeWidth={3} /><path d="M -22 -82 L 0 -96 L 22 -82 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={3} />
    </g>}
    {pt > 0 && <g transform={`translate(700 290) scale(${pt})`}>
      <path d="M 0 0 C -40 -50 -40 -100 0 -100 C 40 -100 40 -50 0 0 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={-68} r={16} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} />
    </g>}
    {pt > 0.5 && <path d={`M 380 250 Q 515 ${200 + Math.sin(T * 3) * 6} 650 255`} stroke={KC.ink} strokeWidth={7} strokeDasharray="16 12" fill="none" />}
  </g>;
}
// Luna o sol en un círculo (las 4 veces: 3 de noche y 1 de día).
function Turno({ x, y, r = 70, noche = true, e = 1, prendido = 1 }) {
  if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${e})`} opacity={0.35 + 0.65 * prendido}>
    <circle r={r} fill={noche ? IC.noche : '#8fd8ff'} stroke={KC.ink} strokeWidth={7} />
    {noche ? <g><circle cx={-6} cy={0} r={r * 0.45} fill="#fff6c8" /><circle cx={12} cy={-10} r={r * 0.4} fill={IC.noche} />
        <circle cx={r * 0.45} cy={r * 0.4} r={3} fill="#fff" /><circle cx={-r * 0.5} cy={-r * 0.45} r={3} fill="#fff" /></g>
      : <g><circle r={r * 0.4} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}
// Hoja de calendario.
function Calendario({ x, y, mes = 'FEB', s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-100} y={-110} width={200} height={220} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-100} y={-110} width={200} height={70} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <text y={-58} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill="#fff">{mes}</text>
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-80 + (i % 4) * 42} y={-20 + Math.floor(i / 4) * 40} width={30} height={26} rx={5} fill={i === 6 ? IC.noche : '#e3e7ee'} />)}
  </g>;
}

function IslaCalorShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, I: CUES.Isla, Te: CUES.Techos, N: CUES.Noche, E: CUES.Extra, P: CUES.Pregunta, Es: CUES.Estudio, F: CUES.Febrero, A: CUES.Arboles, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const partida = (t0, termico) => <>
    <Cuarto T={T} x={30} y={700} tipo="ciudad" temp={klerp(0.35, 0.82, kprog(T, t0 + 0.1, t0 + 2.2, kEase.sale))} termico={termico} rotulo="ciudad" />
    <Cuarto T={T} x={555} y={700} tipo="rancho" temp={klerp(0.6, 0.3, kprog(T, t0 + 0.1, t0 + 2.2, kEase.sale))} rotulo="rancho" />
  </>;
  // Techos: el sol carga los materiales
  const cargaTe = kprog(T, K.Te + 0.3, K.Te + 3.0, kEase.suave);
  // Noche: atardece, sueltan el calor
  const diaN = 1 - kprog(T, K.N - 0.2, K.N + 1.0, kEase.suave);
  const cargaN = 1 - 0.45 * kprog(T, K.N + 0.6, K.N + 3.6, kEase.suave);
  // Árboles y techos claros
  const blanco = kprog(T, K.A + 0.9, K.A + 2.2, kEase.suave), crecen = kprog(T, K.A + 1.6, K.A + 3.6, kEase.sale);
  const cargaA = 1 - 0.6 * Math.max(blanco, crecen) * 0.5 - 0.3 * crecen;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: pantalla partida, tú en la ciudad vs. tu primo en el rancho */}
      <Escena T={T} a={K.G} b={K.I}>
        <FondoLunares color={KC.pink} />
        {svg(partida(K.G, 0))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 2 · isla de calor vista desde arriba (cámara térmica esquemática) */}
      <Escena T={T} a={K.I} b={K.Te} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        {svg(<><MapaTermico T={T} calor={kprog(T, K.I + 0.1, K.I + 1.6, kEase.sale)} /><Leyenda /></>)}
        <EscalaFija texto="esquema tipo cámara térmica" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 3 · de día: asfalto y concreto se tragan el sol; techo vs. aire */}
      <Escena T={T} a={K.Te} b={K.N}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Calle T={T} dia={1} carga={cargaTe} rayos={kprog(T, K.Te, K.Te + 0.6)} />
          <Termometro x={260} y={750} alto={110} valor={klerp(0.3, 0.95, cargaTe)} etiqueta="techo" s={0.85} tam={34} />
          <Termometro x={640} y={730} alto={110} valor={0.35} color={KC.orange} etiqueta="aire" s={0.85} tam={34} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 4 · de noche: lo sueltan lento; el campo ya se enfrió */}
      <Escena T={T} a={K.N} b={K.E}>
        <FondoLunares color={KC.orange} />
        {svg(<Calle T={T} dia={diaN} carga={cargaN} suelta={kprog(T, K.N + 0.5, K.N + 1.2)} campo={1} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 5 · más causas: pocos árboles, edificios que tapan el viento, coches y climas */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Tarjeta T={T} x={30} y={740} at={K.E + 0.2} texto="pocos árboles">
            <rect x={20} y={300} width={270} height={40} fill={IC.asfalto} /><circle cx={230} cy={90} r={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <path d="M 120 300 L 125 250 L 150 250 L 155 300 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={5} /><ellipse cx={138} cy={250} rx={18} ry={6} fill="#c8955f" stroke={KC.ink} strokeWidth={4} />
            <OndasCalor T={T} x={80} y={290} n={3} s={0.8} />
          </Tarjeta>
          <Tarjeta T={T} x={385} y={740} at={K.E + 1.3} texto="sin viento">
            <rect x={40} y={90} width={90} height={250} fill="#7d8597" stroke={KC.ink} strokeWidth={5} /><rect x={180} y={60} width={90} height={280} fill="#5f6779" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 5 }, (_, i) => <g key={i}><rect x={58} y={110 + i * 44} width={20} height={20} fill={KC.yellow} /><rect x={198} y={84 + i * 48} width={20} height={20} fill={KC.yellow} /></g>)}
            <path d={`M -10 ${150 + Math.sin(T * 4) * 4} L 30 150`} stroke={KC.blue} strokeWidth={10} strokeLinecap="round" />
            <path d="M 30 150 l -18 -14 m 18 14 l -18 14" stroke={KC.blue} strokeWidth={10} strokeLinecap="round" />
            <path d={`M 34 175 q -24 20 -6 40`} stroke={KC.blue} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="10 10" />
          </Tarjeta>
          <Tarjeta T={T} x={740} y={740} at={K.E + 2.6} texto="coches y climas">
            <Coche x={140} y={330} s={0.9} />
            <OndasCalor T={T} x={30} y={300} n={2} s={0.8} />
            <Clima T={T} x={180} y={140} s={0.9} />
            <OndasCalor T={T} x={260} y={110} n={2} s={0.8} />
          </Tarjeta></>)}
      </Escena>
      {/* 6 · re-gancho: ¿cuánto? de uno a casi tres grados de noche (EPA) */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <g opacity={1 - kprog(T, K.P + 1.5, K.P + 1.9)}><text x={270} y={1080} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 900)`}>?</text></g>
          <g opacity={kprog(T, K.P + 1.7, K.P + 2.2)}>
            <Termometro x={150} y={990} alto={300} valor={klerp(0.4, 0.72, kprog(T, K.P + 1.9, K.P + 3.2, kEase.sale))} etiqueta="ciudad" />
            <Termometro x={390} y={990} alto={300} valor={0.4} color={IC.frio} etiqueta="afuera" />
            <path d={`M 205 ${990 - 300 * klerp(0.4, 0.72, kprog(T, K.P + 1.9, K.P + 3.2, kEase.sale))} L 230 ${990 - 300 * klerp(0.4, 0.72, kprog(T, K.P + 1.9, K.P + 3.2, kEase.sale))} L 230 870 L 335 870`} stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="12 8" />
          </g></>)}
      </Escena>
      {/* 7 · el estudio: Jáuregui, UNAM, Centro contra Texcoco (1994-1995) */}
      <Escena T={T} a={K.Es} b={K.F}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<ValleMexico T={T} pines={kprog(T, K.Es + 1.6, K.Es + 3.6)} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 8 · 3 de cada 4: de noche · febrero: hasta 7.8 °C más */}
      <Escena T={T} a={K.F} b={K.A}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          {[0, 1, 2, 3].map((i) => <Turno key={i} x={150 + i * 170} y={740} r={64} noche={i < 3} e={kprog(T, K.F + 0.2 + i * 0.3, K.F + 0.6 + i * 0.3, kEase.rebote)} prendido={i < 3 ? 1 : 0.4} />)}
          <g opacity={kprog(T, K.F + 3.0, K.F + 3.5)}><Calendario x={200} y={970} s={0.95} /></g></>)}
      </Escena>
      {/* 9 · lo que sí ayuda: techos claros y árboles */}
      <Escena T={T} a={K.A} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<Calle T={T} dia={1} carga={cargaA} blanco={blanco} arboles={crecen} rayos={1} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: la pantalla partida del inicio, ahora en cámara térmica */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(partida(K.C - 1.0, kprog(T, K.C + 0.8, K.C + 2.0)))}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1620} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.3} until={K.I - 0.2} texto="tu noche vs. la de tu primo" x={330} y={520} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.I + 0.3} until={K.Te - 0.2} texto="isla de calor urbana" x={540} y={470} tam={44} borde={KC.red} />
      <Etq T={T} at={K.I + 1.2} until={K.Te - 0.2} x={500} y={900} texto="ciudad" lado="der" tam={34} color={KC.ink} />
      <Etq T={T} at={K.I + 1.5} until={K.Te - 0.2} x={140} y={700} texto="campo" lado="der" tam={34} color="#fff" />
      <NumeroGigante T={T} at={K.Te + 2.4} until={K.N - 0.2} valor={36} dur={1.0} prefijo="+" sufijo=" °C" etiqueta="techo vs. aire" x={330} y={470} tam={150} color={KC.red} />
      <Chip T={T} at={K.Te + 2.8} until={K.N - 0.2} texto="techo común · día caluroso" y={1440} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.E - 0.2} x={110} y={680} texto="el concreto suelta calor" lado="der" tam={30} color="#fff" />
      <Chip T={T} at={K.N + 1.4} until={K.E - 0.2} texto="campo: ya se enfrió" y={1440} x={540} tam={34} borde={KC.blue} />
      <NumeroGigante T={T} at={K.P + 2.2} until={K.Es - 0.2} valor={2.8} dec={1} dur={1.0} prefijo="+1 a " sufijo=" °C" etiqueta="de noche, en EE. UU." x={500} y={440} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.P + 2.6} until={K.Es - 0.2} texto="EPA, EE. UU. · revisión 2017" y={1440} x={540} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.3} until={K.F - 0.2} texto="Jáuregui · UNAM" x={360} y={470} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.Es + 2.0} until={K.F - 0.2} x={390} y={1010} texto="Centro" lado="izq" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Es + 2.6} until={K.F - 0.2} x={760} y={1010} texto="Texcoco" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Es + 2.4} until={K.F - 0.2} texto="mayo 1994 – abril 1995" y={1440} x={540} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.F + 1.4} until={K.A - 0.2} texto="3 de cada 4: de noche" x={360} y={520} tam={40} borde={IC.noche} />
      <NumeroGigante T={T} at={K.F + 3.4} until={K.A - 0.2} valor={7.8} dec={1} dur={1.0} prefijo="+" sufijo=" °C" etiqueta="máximo nocturno" x={680} y={960} tam={150} color={KC.red} />
      <Chip T={T} at={K.F + 3.8} until={K.A - 0.2} texto="Centro vs. Texcoco · noches despejadas" y={1440} x={540} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.4} until={K.C - 0.2} x={470} y={735} texto="techo claro" lado="izq" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.A + 4.6} until={K.C - 0.2} valor={1.6} dec={1} dur={1.0} prefijo="−" sufijo=" °C" etiqueta="bosque urbano" x={700} y={470} tam={140} color={KC.leaf} />
      <Chip T={T} at={K.A + 5.0} until={K.C - 0.2} texto="−1.6 °C en promedio (308 estudios, 2021)" y={1440} x={540} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="isla de calor" x={330} y={520} tam={44} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.I - 0.1} texto="Tu noche: *más caliente que en el rancho.*" />
      <Subtitulo T={T} idx={1} at={K.I + 0.1} until={K.Te - 0.1} texto="Isla de calor: *una mancha tibia.*" />
      <Subtitulo T={T} idx={2} at={K.Te + 0.1} until={K.N - 0.1} texto="Un techo: *+36 °C sobre el aire.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.E - 0.1} texto="De noche *lo suelta lento.*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.P - 0.1} texto="Sin árboles ni viento, *con coches y climas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Es - 0.1} texto="*De 1 a casi 3 °C* más de noche." />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.F - 0.1} texto="Jáuregui: *Centro vs. Texcoco.*" />
      <Subtitulo T={T} idx={7} at={K.F + 0.1} until={K.A - 0.1} texto="Febrero: *hasta 7.8 °C más.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.C - 0.1} texto="Techos claros y *árboles.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Sudas y tu primo no? *Isla de calor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Techos + 2.5, CUES.Noche - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Extra + 0.5, CUES.Pregunta - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Pregunta + 5.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Febrero - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Febrero + 3.5, CUES.Arboles - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Arboles + 4.0, CUES.Arboles + 8.9, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.6, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="30" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function IslaCalorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><IslaCalorShot /></CompositionStage></div>;
}
window.IslaCalorApp = IslaCalorApp;
