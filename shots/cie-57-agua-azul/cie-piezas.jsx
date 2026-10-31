// cie-piezas.jsx — piezas de dibujo de la serie Científico (pedido 300, oct 2026). Copia local en cada shot: se carga
// después de kit-robert.jsx. Todas dibujan dentro de un <svg> salvo las que dicen "escena". Trazo grueso KC.ink, colores de la marca.
const CPIEL = '#f1b48f', CPIEL2 = '#d98f6b', CPELO = '#2a1d17';

// Lienzo SVG de pantalla completa.
function Lienzo({ children, z = 2, o = 1 }) {
  return <svg width={KW} height={KH} viewBox={`0 0 ${KW} ${KH}`} style={{ position:'absolute', left:0, top:0, zIndex:z, opacity:o, overflow:'visible' }}>{children}</svg>;
}

// Cabeza de perfil mirando a la derecha. (x, y) = centro del cráneo. boca 0..1 (abierta), gesto: 'normal' | 'mueca' | 'sonrie'.
// corte: dibuja el cráneo por dentro (hueso, oído interno).
function CabezaPerfil({ x = 0, y = 0, s = 1, boca = 0, gesto = 'normal', corte = 0, pelo = CPELO, piel = CPIEL, ojo = 1, children }) {
  const by = gesto === 'mueca' ? 8 : 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 170 L -40 230 L 90 230 L 80 160 Z" fill={piel} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -150 -40 C -150 -170 -40 -210 40 -190 C 130 -170 175 -100 170 -20 L 200 40 C 205 50 195 58 182 60 L 178 90 C 180 110 170 120 160 120 L 160 150 C 160 175 135 185 100 180 L 40 175 C -40 190 -150 120 -150 -40 Z"
      fill={piel} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {corte > 0 && <g opacity={corte}>
      <path d="M -125 -40 C -125 -150 -40 -185 35 -168 C 110 -152 145 -95 140 -30 L 100 40 L -60 80 C -110 60 -125 20 -125 -40 Z" fill="#f4ecd8" stroke={KC.ink} strokeWidth={7} />
      <path d="M -105 -40 C -105 -130 -35 -158 30 -145 C 95 -132 120 -85 116 -35 L 80 25 L -55 58 C -95 42 -105 10 -105 -40 Z" fill="#f7b7c8" stroke={KC.ink} strokeWidth={5} />
    </g>}
    <path d="M -150 -40 C -160 -140 -60 -225 50 -200 C 120 -185 160 -140 160 -100 C 100 -130 20 -120 -40 -90 C -80 -70 -110 -60 -120 0 Z" fill={pelo} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 -20 C -95 -45 -110 10 -85 40 C -70 60 -50 45 -55 25" fill={piel} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    <path d="M -75 0 C -85 15 -78 30 -66 30" fill="none" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
    {ojo > 0 && <><ellipse cx={110} cy={-30} rx={16} ry={gesto === 'sonrie' ? 9 : 18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <circle cx={116} cy={-28} r={7} fill={KC.ink} />
      <path d={gesto === 'mueca' ? 'M 85 -70 L 140 -58' : 'M 88 -66 Q 112 -78 138 -64'} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" /></>}
    {boca > 0.05
      ? <ellipse cx={150} cy={100 + by} rx={14} ry={6 + 18 * boca} fill="#5a1f22" stroke={KC.ink} strokeWidth={6} />
      : <path d={gesto === 'sonrie' ? 'M 130 92 Q 152 112 170 92' : gesto === 'mueca' ? 'M 132 108 Q 150 92 168 106' : 'M 135 100 L 168 98'} stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />}
    {children}
  </g>;
}

// Persona sencilla de frente (cuerpo completo). (x, yPies) = pies. alto en px.
function PersonaSimple({ x = 0, yPies = 0, alto = 600, color = KC.pink, brazos = 0, piel = CPIEL, cara = 'normal' }) {
  const h = alto - 120, cy = -alto + 60;
  return <g transform={`translate(${x} ${yPies})`}>
    <rect x={-70} y={-h * 0.5} width={60} height={h * 0.5} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={10} y={-h * 0.5} width={60} height={h * 0.5} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-h + 10} width={60} height={h * 0.42} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} transform={`rotate(${20 + brazos * -150} -120 ${-h + 30})`} />
    <rect x={90} y={-h + 10} width={60} height={h * 0.42} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} transform={`rotate(${-20 + brazos * 150} 120 ${-h + 30})`} />
    <rect x={-90} y={-h} width={180} height={h * 0.52} rx={44} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={cy} r={62} fill={piel} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -62 ${cy - 10} Q -60 ${cy - 75} 0 ${cy - 72} Q 60 ${cy - 75} 62 ${cy - 10} Q 30 ${cy - 40} -62 ${cy - 10} Z`} fill={CPELO} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-22} cy={cy + 2} r={7} fill={KC.ink} /><circle cx={22} cy={cy + 2} r={7} fill={KC.ink} />
    <path d={cara === 'sonrie' ? `M -22 ${cy + 26} Q 0 ${cy + 44} 22 ${cy + 26}` : cara === 'o' ? `M -8 ${cy + 30} a 8 10 0 1 0 16 0 a 8 10 0 1 0 -16 0` : `M -20 ${cy + 32} L 20 ${cy + 32}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}

// Celular con pantalla y ondas de audio que saltan.
function Celular({ x = 0, y = 0, s = 1, T = 0, sonando = 1, color = KC.cyan, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-200} width={220} height={400} rx={34} fill="#22252e" stroke={KC.ink} strokeWidth={10} />
    <rect x={-92} y={-170} width={184} height={330} rx={14} fill="#0e1a2b" />
    {Array.from({ length: 11 }, (_, i) => { const h = 18 + sonando * 90 * Math.abs(Math.sin(T * 7 + i * 1.3) * Math.sin(T * 3.1 + i * 0.7));
      return <rect key={i} x={-80 + i * 15} y={-5 - h / 2} width={9} height={h} rx={4} fill={color} />; })}
    <circle cx={0} cy={182} r={9} fill="#555" />
  </g>;
}

// Arcos de sonido que salen de (x, y) hacia `ang` grados. p = fase (0..1 avanza); n arcos.
function OndasArco({ x, y, ang = 0, n = 4, T = 0, vel = 1, color = KC.cyan, abre = 50, largo = 260, grosor = 9, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`} opacity={o}>
    {Array.from({ length: n }, (_, i) => { const f = ((T * vel + i / n) % 1), r = 30 + f * largo, a = abre * Math.PI / 180;
      return <path key={i} d={`M ${r * Math.cos(-a)} ${r * Math.sin(-a)} A ${r} ${r} 0 0 1 ${r * Math.cos(a)} ${r * Math.sin(a)}`} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" opacity={1 - f} />; })}
  </g>;
}

// Flecha gruesa recta que se dibuja (p 0..1).
function FlechaRecta({ x1, y1, x2, y2, p = 1, color = KC.yellow, grosor = 14, punta = 34 }) {
  const X = klerp(x1, x2, p), Y = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  if (p <= 0.01) return null;
  return <g>
    <line x1={x1} y1={y1} x2={X} y2={Y} stroke={KC.ink} strokeWidth={grosor + 8} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={X} y2={Y} stroke={color} strokeWidth={grosor} strokeLinecap="round" />
    <path d={`M 0 0 L ${-punta} ${-punta * 0.6} L ${-punta} ${punta * 0.6} Z`} transform={`translate(${X} ${Y}) rotate(${a * 180 / Math.PI})`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

function Nube({ x, y, s = 1, color = '#fff', borde = KC.ink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 40 C -200 40 -200 -30 -140 -30 C -140 -90 -60 -100 -40 -60 C -20 -120 80 -120 90 -50 C 150 -70 190 0 140 40 Z" fill={color} stroke={borde} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
function Casa({ x, y, s = 1, color = KC.orange, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-160} width={300} height={220} fill={color} stroke={KC.ink} strokeWidth={9} />
    <path d="M -190 -150 L 0 -300 L 190 -150 Z" fill={KC.red} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-110} y={-110} width={90} height={80} fill={luz ? '#ffe9a8' : '#2b3a67'} stroke={KC.ink} strokeWidth={7} />
    <rect x={30} y={-70} width={80} height={130} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
function Montana({ x, y, ancho = 700, alto = 600, color = '#8a7b9e', nieve = true }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-ancho / 2} 0 L 0 ${-alto} L ${ancho / 2} 0 Z`} fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {nieve && <path d={`M ${-ancho * 0.12} ${-alto * 0.76} L 0 ${-alto} L ${ancho * 0.12} ${-alto * 0.76} L ${ancho * 0.05} ${-alto * 0.7} L 0 ${-alto * 0.78} L ${-ancho * 0.05} ${-alto * 0.7} Z`} fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
  </g>;
}
function SolDibujo({ x, y, r = 70, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 10})`}>{Array.from({ length: 10 }, (_, i) => <line key={i} x1={0} y1={-r - 14} x2={0} y2={-r - 44} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 36})`} />)}<circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} /></g>;
}
function EstrellasFondo({ T, n = 70, seed = 9, alto = KH }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const x = g() * KW, y = g() * alto, r = 1.5 + g() * 3;
    return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.35 + 0.6 * Math.abs(Math.sin(T * 0.8 + i))} />; })}</g>;
}
// Señal de alerta (triángulo con !)
function Alerta({ x, y, s = 1, color = KC.yellow }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M 0 -80 L 80 60 L -80 60 Z" fill={color} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" /><rect x={-8} y={-35} width={16} height={55} rx={6} fill={KC.ink} /><circle cx={0} cy={40} r={9} fill={KC.ink} /></g>;
}
// Escena de pregunta: «?» gigante que se mece sobre lunares.
function EscenaPregunta({ T, a, b, color = KC.lilac, signo = '?' }) {
  return <Escena T={T} a={a} b={b} zoom={0.1}>
    <FondoLunares color={color} />
    <Lienzo><text x={330} y={1100} textAnchor="middle" fill={KC.yellow} stroke={KC.ink} strokeWidth={14}
      transform={`rotate(${Math.sin(T * 3) * 6} 330 900) scale(${klerp(0.6, 1, kprog(T, a, a + 0.4, kEase.rebote))})`} style={{ font:`400 560px ${KF.titulo}`, transformOrigin:'330px 900px' }}>{signo}</text></Lienzo>
  </Escena>;
}
// Barra horizontal de calificación con etiqueta (dentro de svg). v 0..1
function BarraH({ x, y, ancho = 700, alto = 70, v = 1, color = KC.yellow, etiqueta, valor }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={ancho} height={alto} rx={alto / 2} fill="rgba(0,0,0,.35)" stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={0} width={Math.max(alto, ancho * v)} height={alto} rx={alto / 2} fill={color} stroke={KC.ink} strokeWidth={6} />
    {etiqueta && <text x={0} y={-18} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{etiqueta}</text>}
    {valor && <text x={ancho} y={-18} textAnchor="end" style={{ font:`400 52px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{valor}</text>}
  </g>;
}
// Texto grande con contorno (dentro de svg).
function TextoSvg({ x, y, children, tam = 80, color = KC.yellow, ancla = 'middle', fuente = 'titulo', rot = 0, o = 1, s = 1 }) {
  return <text x={0} y={0} textAnchor={ancla} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o} style={{ font:`${fuente === 'titulo' ? 400 : 900} ${tam}px ${fuente === 'titulo' ? KF.titulo : KF.texto}` }}
    fill={color} stroke={KC.ink} strokeWidth={tam / 9} paintOrder="stroke" strokeLinejoin="round">{children}</text>;
}
// Onomatopeya que salta (¡CRAC!, ¡BUM!).
function Onomato({ T, at, dur = 1.2, x, y, texto, color = KC.yellow, tam = 150, rot = -8 }) {
  if (T < at || T > at + dur + 0.3) return null;
  const s = klerp(0.3, 1, kprog(T, at, at + 0.25, kEase.rebote)), o = 1 - kprog(T, at + dur, at + dur + 0.3);
  return <TextoSvg x={x} y={y} tam={tam} color={color} rot={rot + Math.sin(T * 30) * 2 * (1 - kprog(T, at, at + 0.6))} s={s} o={o}>{texto}</TextoSvg>;
}

Object.assign(window, { CPIEL, CPIEL2, CPELO, Lienzo, CabezaPerfil, PersonaSimple, Celular, OndasArco, FlechaRecta, Nube, Casa, Montana, SolDibujo, EstrellasFondo, Alerta, EscenaPregunta, BarraH, TextoSvg, Onomato });
