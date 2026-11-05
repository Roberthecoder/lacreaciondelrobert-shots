// Shot Fungi Mati #137 · Ese champiñón no es una verdura — NARRADO (gancho 1 "esto no es X: es Y" + 4 pistas, formato N3 + N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const RN = { verde:'#3fbf4a', verde2:'#1f8f3a', verdeClaro:'#9be36a', naranja:'#ff8a1f', cafe:'#7a4a22', paja:'#e9c46a', paja2:'#c99a2e',
  higado:'#9b2f3a', higado2:'#c2475a', papa:'#d9a75a', papa2:'#b5823c', dorado:'#E8A62A', estante:'#c98b4a', estante2:'#8a5a2b' };
const svgR = (c, z = 20) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z, overflow:'visible' }}>{c}</svg>;

/* ---------- SÚPER ---------- */
function Lechuga({ x, y, s = 1, T = 0, verde = RN.verde }) {
  const hojas = [[-70, -40, 80, -25], [70, -40, 80, 25], [-40, -90, 75, -10], [40, -95, 75, 12], [0, -60, 85, 0], [0, -120, 60, 0]];
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, x, 0.2) * 1.5})`}>
    {hojas.map(([dx, dy, r, rot], i) => <g key={i} transform={`translate(${dx} ${dy}) rotate(${rot})`}>
      <path d={`M ${-r} 0 Q ${-r} ${-r * 1.1} 0 ${-r * 1.05} Q ${r} ${-r * 1.1} ${r} 0 Q ${r * 0.6} ${r * 0.55} 0 ${r * 0.5} Q ${-r * 0.6} ${r * 0.55} ${-r} 0 Z`}
        fill={i % 2 ? verde : mixHex(verde, '#d6ff8a', 0.35)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M 0 ${r * 0.4} L 0 ${-r * 0.8} M 0 ${-r * 0.2} L ${-r * 0.4} ${-r * 0.6} M 0 ${-r * 0.2} L ${r * 0.4} ${-r * 0.6}`} stroke="#e9ffd0" strokeWidth={4} fill="none" opacity=".8" />
    </g>)}
  </g>;
}
function Zanahorias({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-40, -8], [0, 0], [40, -12]].map(([dx, r], i) => <g key={i} transform={`translate(${dx} 0) rotate(${r + mece(T, i + 4, 0.3) * 2})`}>
      <path d="M -10 -200 Q -30 -240 -20 -270 M 0 -200 Q 0 -250 8 -280 M 10 -200 Q 30 -240 34 -262" stroke={RN.verde2} strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M -28 -200 Q 0 -212 28 -200 L 4 -10 Q 0 0 -4 -10 Z" fill={RN.naranja} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      {[-150, -100, -60].map((yy) => <line key={yy} x1={-14} y1={yy} x2={2} y2={yy + 4} stroke="#b85a10" strokeWidth={4} />)}
    </g>)}
  </g>;
}
// Charola con 3 champiñones blancos (Agaricus bisporus: sombrero blanco liso, pie corto). Base en (x, y).
function Charola({ x, y, s = 1, salto = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -70 L 200 -70 L 176 0 L -176 0 Z" fill="#2d6cdf" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <Champinon x={-110} y={-60} s={0.55} rot={-8} sombrero="#f7f2e8" sombra="#ddd3bf" lam="#c99a8a" />
    <Champinon x={110} y={-60} s={0.55} rot={8} sombrero="#f7f2e8" sombra="#ddd3bf" lam="#c99a8a" />
    <g transform={`translate(0 ${-salto * 90}) rotate(${salto * 8})`}><Champinon x={0} y={-60} s={0.68} sombrero="#fbf8f1" sombra="#ddd3bf" lam="#c99a8a" /></g>
    <path d="M -200 -70 L 200 -70" stroke="rgba(255,255,255,.7)" strokeWidth={5} />
    <rect x={-190} y={-150} width={380} height={80} rx={10} fill="rgba(220,240,255,.18)" stroke="rgba(255,255,255,.5)" strokeWidth={3} />
  </g>;
}
function Letrero({ x, y, w, texto, fondo = RN.verde2, color = '#fff', tam = 64, borde = KC.ink }) {
  return <div style={{ position:'absolute', left:x, top:y, width:w, zIndex:15, background:fondo, border:`7px solid ${borde}`, borderRadius:18, textAlign:'center',
    font:`400 ${tam}px/1.25 ${KF.titulo}`, color, letterSpacing:'.04em', boxShadow:`8px 8px 0 ${KC.ink}` }}>{texto}</div>;
}
function Repisa({ x, y, w, color = RN.estante, color2 = RN.estante2 }) {
  return <g><rect x={x} y={y} width={w} height={34} fill={color} stroke={KC.ink} strokeWidth={7} /><rect x={x} y={y + 34} width={w} height={22} fill={color2} stroke={KC.ink} strokeWidth={6} /></g>;
}

/* ---------- LIBRO DE LINNEO (esquemático) ---------- */
function Musgo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{[-30, -15, 0, 15, 30].map((dx, i) => <g key={i}>
    <path d={`M ${dx} 0 L ${dx + (i - 2) * 3} ${-50 - (i % 2) * 15}`} stroke="#3b7d2a" strokeWidth={6} />
    {[0.3, 0.55, 0.8].map((k) => <path key={k} d={`M ${dx + (i - 2) * 3 * k} ${-50 * k} l -9 -6 M ${dx + (i - 2) * 3 * k} ${-50 * k} l 9 -6`} stroke="#5aa83a" strokeWidth={4} />)}
    {i % 2 === 0 && <><path d={`M ${dx} -50 Q ${dx + 6} -80 ${dx + 2} -95`} stroke="#8a5a2b" strokeWidth={3} fill="none" /><ellipse cx={dx + 2} cy={-99} rx={4} ry={7} fill="#8a5a2b" /></>}
  </g>)}</g>;
}
function Helecho({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 Q -10 -80 10 -160" stroke="#2f7d32" strokeWidth={6} fill="none" />
    {Array.from({ length: 9 }, (_, i) => { const t = i / 9, yy = -t * 150, xx = Math.sin(t * 2) * 6, L = 46 * (1 - t * 0.8);
      return <g key={i}><path d={`M ${xx} ${yy} q ${-L * 0.6} ${-8} ${-L} ${-18}`} stroke="#3f9e44" strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d={`M ${xx} ${yy} q ${L * 0.6} ${-8} ${L} ${-18}`} stroke="#3f9e44" strokeWidth={9} fill="none" strokeLinecap="round" /></g>; })}
  </g>;
}
function Alga({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{[-20, 0, 20].map((dx, i) =>
    <path key={i} d={`M ${dx} 0 Q ${dx - 25 + mece(T, i, 0.4) * 8} -40 ${dx + 5} -80 Q ${dx + 30} -110 ${dx} -150`} stroke={['#c0392b', '#8e5a2b', '#2e8b57'][i]} strokeWidth={10} fill="none" strokeLinecap="round" />)}</g>;
}
function LibroLinneo({ T, at, x = 540, y = 960 }) {
  const ab = kprog(T, at, at + 0.6, kEase.sale);
  const d = (k) => kprog(T, at + 0.6 + k * 0.55, at + 1.0 + k * 0.55, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.7, 1, ab)})`} opacity={ab}>
    <path d="M -470 -330 Q -240 -370 0 -320 Q 240 -370 470 -330 L 470 250 Q 240 210 0 260 Q -240 210 -470 250 Z" fill="#7a3a1a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -450 -315 Q -230 -350 -6 -305 L -6 240 Q -230 195 -450 230 Z" fill="#f6ead0" stroke={KC.ink} strokeWidth={5} />
    <path d="M 450 -315 Q 230 -350 6 -305 L 6 240 Q 230 195 450 230 Z" fill="#f6ead0" stroke={KC.ink} strokeWidth={5} />
    <line x1={0} y1={-310} x2={0} y2={250} stroke="#b89a6a" strokeWidth={6} />
    <text x={-228} y={-262} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>SPECIES PLANTARUM</text>
    <text x={-228} y={-222} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#7a5a3a">Linneo · 1753</text>
    <text x={228} y={-262} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>CRYPTOGAMIA</text>
    {[-180, 175].map((yy) => <line key={yy} x1={-420} y1={yy} x2={-40} y2={yy - 4} stroke="#d9c7a0" strokeWidth={3} />)}
    {d(0) > 0 && <Musgo x={-330} y={-40} s={1.1 * d(0)} />}
    {d(0) > 0 && <text x={-330} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a4a3a" opacity={d(0)}>musgos</text>}
    {d(1) > 0 && <g opacity={Math.min(1, d(1))}><Helecho x={-140} y={-30} s={0.95 * d(1)} /></g>}
    {d(1) > 0 && <text x={-140} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a4a3a" opacity={d(1)}>helechos</text>}
    {d(2) > 0 && <g opacity={Math.min(1, d(2))}><Alga T={T} x={140} y={-30} s={0.9 * d(2)} /></g>}
    {d(2) > 0 && <text x={140} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a4a3a" opacity={d(2)}>algas</text>}
    {d(3) > 0 && <Champinon x={330} y={-30} s={0.62 * d(3)} sombrero="#c9925a" sombra="#a8743c" lam="#6b3a22" pie="#efe0c4" />}
    {d(3) > 0 && <text x={330} y={10} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a4a3a" opacity={d(3)}>hongos</text>}
    {d(3) > 0 && <text x={228} y={140} textAnchor="middle" style={{ font:`italic 700 30px ${KF.mono}` }} fill={KC.ink} opacity={d(3)}>Agaricus <tspan fontStyle="normal">(Linneo, 1753)</tspan></text>}
  </g>;
}

/* ---------- MICROSCOPIO ---------- */
// Hifa: tubo con pared, septos y núcleos, de (x0, y) a la punta (x1, y). p 0..1 = cuánto ha crecido. pared = grosor del borde.
function Hifa({ T, x0, x1, y, ancho = 90, p = 1, pared = 10, color = '#eafff7', paredColor = '#9fd9c4', septos = 260, children, onda = 18 }) {
  const xt = klerp(x0, x1, p), N = 30;
  const yy = (x) => y + Math.sin(x / 170 + 0.6) * onda;
  const xs = Array.from({ length: N + 1 }, (_, i) => klerp(x0, xt, i / N));
  const arriba = xs.map((x) => `${x.toFixed(1)} ${(yy(x) - ancho / 2).toFixed(1)}`), abajo = xs.map((x) => `${x.toFixed(1)} ${(yy(x) + ancho / 2).toFixed(1)}`).reverse();
  const cuerpo = 'M ' + arriba.join(' L ') + ` A ${ancho / 2} ${ancho / 2} 0 0 1 ` + abajo[0] + ' L ' + abajo.join(' L ');
  const sp = []; for (let x = x0 + septos; x < xt - 60; x += septos) sp.push(x);
  return <g>
    <path d={cuerpo + ' Z'} fill="rgba(47,224,168,.18)" stroke="rgba(47,224,168,.25)" strokeWidth={ancho * 0.5} strokeLinejoin="round" />
    <path d={cuerpo + ' Z'} fill={color} stroke={KC.ink} strokeWidth={pared + 8} strokeLinejoin="round" />
    <path d={cuerpo + ' Z'} fill="none" stroke={paredColor} strokeWidth={pared} strokeLinejoin="round" />
    {sp.map((x) => <line key={x} x1={x} y1={yy(x) - ancho / 2 + 4} x2={x} y2={yy(x) + ancho / 2 - 4} stroke="#7fb8a6" strokeWidth={6} />)}
    {sp.map((x, i) => <ellipse key={'n' + x} cx={x - septos * 0.5} cy={yy(x - septos * 0.5) + mece(T, i, 0.3) * 4} rx={13} ry={10} fill="#b18cff" stroke={KC.ink} strokeWidth={3} />)}
    {children && children(yy, xt)}
    {p < 1 && <circle cx={xt} cy={yy(xt)} r={ancho * 0.35} fill="#fff" opacity={0.4 + 0.4 * Math.sin(T * 6)} />}
  </g>;
}
// Fibras de paja (restos vegetales) que se van deshaciendo: q 0..1 = cuánto queda.
function Paja({ x, y, q = 1, T = 0 }) {
  const fib = [[0, 0, 420, -8], [20, 70, 380, 6], [-10, 140, 400, -4], [30, 210, 340, 10]];
  return <g transform={`translate(${x} ${y})`}>{fib.map(([dx, dy, L, r], i) => { const l = L * (0.25 + 0.75 * q);
    return <g key={i} transform={`translate(${dx + (L - l) * 0.5} ${dy}) rotate(${r + mece(T, i, 0.2) * 2})`}>
      <rect x={0} y={-18} width={l} height={36} rx={14} fill={RN.paja} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: Math.floor(l / 40) }, (_, k) => <line key={k} x1={20 + k * 40} y1={-12} x2={20 + k * 40} y2={12} stroke={RN.paja2} strokeWidth={4} />)}
      {q < 0.95 && <><circle cx={-8} cy={-6} r={8} fill={RN.paja} stroke={KC.ink} strokeWidth={3} /><circle cx={-22} cy={10} r={6} fill={RN.paja} stroke={KC.ink} strokeWidth={3} /></>}
    </g>; })}</g>;
}
// Gránulo de glucógeno esquemático: muy ramificado (centro + ramas con cuentas).
function Glucogeno({ x, y, s = 1, on = 1, color = '#ff9ec2' }) {
  if (on <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(on, 0, 1))})`} style={{ filter:`drop-shadow(0 0 ${8 * on}px ${color})` }}>
    {[0, 60, 120, 180, 240, 300].map((a) => { const r = a * Math.PI / 180, c = Math.cos(r), sn = Math.sin(r);
      return <g key={a}><line x1={0} y1={0} x2={c * 20} y2={sn * 20} stroke={color} strokeWidth={3} />
        <circle cx={c * 20} cy={sn * 20} r={5} fill={color} />
        <line x1={c * 20} y1={sn * 20} x2={c * 28 - sn * 8} y2={sn * 28 + c * 8} stroke={color} strokeWidth={2.5} /><circle cx={c * 28 - sn * 8} cy={sn * 28 + c * 8} r={3.5} fill={color} /></g>; })}
    <circle r={6} fill="#fff" />
  </g>;
}
function Higado({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -200 -40 Q -180 -130 -40 -120 Q 120 -130 200 -90 Q 230 -60 170 -10 Q 60 70 -80 90 Q -190 100 -210 30 Z" fill={RN.higado} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -10 -118 Q 0 -40 -30 40" stroke="#6e1f28" strokeWidth={5} fill="none" opacity=".7" />
    <path d="M -150 -70 Q -100 -100 -40 -95" stroke={RN.higado2} strokeWidth={12} fill="none" strokeLinecap="round" opacity=".7" />
    {children}
  </g>;
}
function Papa({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -190 -10 Q -200 -110 -60 -120 Q 90 -140 180 -70 Q 230 -10 170 60 Q 60 120 -80 100 Q -180 80 -190 -10 Z" fill={RN.papa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-100, -60], [40, -90], [120, 20], [-30, 50]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill={RN.papa2} />)}
    {children}
  </g>;
}
// Granos de almidón (ovalados, con anillos), esquemáticos.
function GranoAlmidon({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={30} ry={22} fill="#fff6dc" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-6} rx={18} ry={12} fill="none" stroke="#d9b56a" strokeWidth={3} />
    <ellipse cx={-10} rx={8} ry={5} fill="none" stroke="#d9b56a" strokeWidth={3} />
  </g>;
}
// Célula vegetal (lechuga) con pared de celulosa (fibras rectas) y cloroplastos.
function CelulaLechuga({ x, y, w = 400, h = 520, T = 0, fibras = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={40} fill="#2b5a26" stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2 + 26} y={-h / 2 + 26} width={w - 52} height={h - 52} rx={26} fill="#173a14" />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-w / 2 + 6} y1={-h / 2 + 30 + i * (h - 60) / 8} x2={klerp(-w / 2 + 6, w / 2 - 6, fibras)} y2={-h / 2 + 30 + i * (h - 60) / 8} stroke="#b7f28a" strokeWidth={4} opacity=".85" />)}
    {[[-90, -150], [60, -170], [110, -40], [-110, 10], [20, 60], [-60, 150], [100, 150]].map(([a, b], i) =>
      <ellipse key={i} cx={a + mece(T, i, 0.2) * 6} cy={b} rx={44} ry={24} fill="#3fbf4a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 25} ${a} ${b})`} />)}
  </g>;
}
// Pila con "?" (re-gancho).
function Pila({ x, y, s = 1, T = 0, nivel = 0.3 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 3) * 4})`}>
    <rect x={-90} y={-170} width={180} height={340} rx={30} fill="#26303f" stroke={KC.ink} strokeWidth={9} />
    <rect x={-40} y={-200} width={80} height={36} rx={8} fill="#c9d1dc" stroke={KC.ink} strokeWidth={7} />
    <rect x={-66} y={146 - 290 * nivel} width={132} height={290 * nivel} rx={14} fill={KC.mint} />
    <text y={40} textAnchor="middle" style={{ font:`400 190px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6}>?</text>
  </g>;
}
// Iconos de "cómo comen".
function IconoNutricion({ x, y, tipo, on = 1, T = 0, brillo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(on, 0, 1))})`} opacity={on > 0 ? 1 : 0}>
    <circle r={112} fill={brillo ? KC.gold2 : KC.paper} stroke={KC.ink} strokeWidth={8} style={brillo ? { filter:`drop-shadow(0 0 ${24 * brillo}px ${KC.gold2})` } : null} />
    {tipo === 'planta' && <g>
      <circle cx={-46} cy={-46} r={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1={-46 + Math.cos(a * Math.PI / 180) * 34} y1={-46 + Math.sin(a * Math.PI / 180) * 34} x2={-46 + Math.cos(a * Math.PI / 180) * 44} y2={-46 + Math.sin(a * Math.PI / 180) * 44} stroke={KC.ink} strokeWidth={4} />)}
      <path d="M -20 70 Q -30 0 40 -30 Q 60 40 -20 70 Z" fill={RN.verde} stroke={KC.ink} strokeWidth={6} /><path d="M -20 70 Q 10 20 40 -30" stroke="#e9ffd0" strokeWidth={4} fill="none" />
    </g>}
    {tipo === 'animal' && <g>
      <path d="M -60 -10 Q 0 -70 60 -10 Q 0 30 -60 -10 Z" fill="#ff7a8a" stroke={KC.ink} strokeWidth={6} />
      <path d="M -60 -10 Q 0 60 60 -10" fill="#7a1f2e" stroke={KC.ink} strokeWidth={6} />
      <circle cx={0} cy={-62 + ((T * 1.2) % 1) * 70} r={18} fill={RN.naranja} stroke={KC.ink} strokeWidth={4} opacity={1 - ((T * 1.2) % 1)} />
    </g>}
    {tipo === 'hongo' && <g>
      <path d="M -90 20 Q -40 10 10 22" stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d="M -90 20 Q -40 10 10 22" stroke="#eafff7" strokeWidth={20} fill="none" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, k) => { const u = ((T * 0.6 + k / 6) % 1); return <circle key={k} cx={klerp(70, 16, u)} cy={22 + Math.sin(k * 2) * 30 * (1 - u)} r={8} fill={k % 2 ? KC.yellow : KC.mint} stroke={KC.ink} strokeWidth={2} />; })}
      <rect x={40} y={-60} width={50} height={18} rx={8} fill={RN.paja} stroke={KC.ink} strokeWidth={4} transform="rotate(-20 65 -51)" />
    </g>}
  </g>;
}
function Persona({ x, y, s = 1, color = '#ffb37a' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-90} r={30} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d="M -45 0 Q -45 -55 0 -55 Q 45 -55 45 0 Z" fill="#2346ff" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Caja de reino.
function CajaReino({ x, y, w = 188, h = 112, texto, color, on = 1, brillo = 0 }) {
  if (on <= 0) return null;
  const e = kEase.rebote(kclamp(on, 0, 1));
  return <div style={{ position:'absolute', left:x - w / 2, top:y - h / 2, width:w, height:h, zIndex:30, transform:`scale(${e})`, background:color, border:`6px solid ${KC.ink}`, borderRadius:20,
    display:'flex', alignItems:'center', justifyContent:'center', font:`900 30px ${KF.texto}`, color:KC.ink, boxShadow: brillo ? `0 0 ${40 * brillo}px ${KC.gold2}, 8px 8px 0 ${KC.ink}` : `8px 8px 0 ${KC.ink}` }}>{texto}</div>;
}
// Libros de texto apilados con los 5 reinos en el lomo.
function Libros({ x, y, s = 1, on = 1 }) {
  if (on <= 0) return null;
  const cols = ['#ff2d78', '#00d2ff', '#ffe11a'], colR = ['#9be36a', '#b18cff', '#3fbf4a', '#E8A62A', '#ff8a1f'];
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(on, 0, 1))})`}>
    {cols.map((c, i) => <g key={i} transform={`translate(${(i % 2) * 18 - 9} ${-i * 64}) rotate(${(i - 1) * 2})`}>
      <rect x={-200} y={-60} width={400} height={60} rx={8} fill={c} stroke={KC.ink} strokeWidth={6} />
      <text x={-180} y={-18} style={{ font:`400 32px ${KF.titulo}` }} fill={KC.ink}>BIOLOGÍA</text>
      {colR.map((cc, k) => <rect key={k} x={40 + k * 28} y={-44} width={22} height={28} rx={4} fill={cc} stroke={KC.ink} strokeWidth={3} />)}
    </g>)}
  </g>;
}
// Libro del código de nomenclatura (portada esquemática).
function LibroCodigo({ T, at, x, y }) {
  const t1 = kprog(T, at + 1.3, at + 1.7, kEase.sale), t2 = kprog(T, at + 1.8, at + 2.6);
  return <div style={{ position:'absolute', left:x - 250, top:y - 330, width:500, height:660, zIndex:20, background:'#1f3a6b', border:`9px solid ${KC.ink}`, borderRadius:22,
    boxShadow:`16px 16px 0 ${KC.ink}`, transform:`rotate(${-2 + mece(T, 3, 0.2)}deg)`, textAlign:'center', color:'#f6e7b8', padding:'60px 34px 0', boxSizing:'border-box' }}>
    <div style={{ position:'absolute', left:20, top:0, bottom:0, width:14, background:'rgba(0,0,0,.25)' }}></div>
    <div style={{ font:`900 32px/1.25 ${KF.texto}` }}>CÓDIGO INTERNACIONAL DE NOMENCLATURA</div>
    <div style={{ position:'relative', display:'inline-block', marginTop:40, font:`400 92px/1 ${KF.titulo}`, color:KC.gold2, opacity:1 - t1 * 0.5 }}>BOTÁNICA
      <div style={{ position:'absolute', left:-14, top:'52%', height:14, width:`calc(${t1 * 100}% + 28px)`, background:KC.red, borderRadius:7, transform:'rotate(-5deg)' }}></div>
    </div>
    <div style={{ marginTop:34, font:`italic 700 46px/1.2 ${KF.mono}`, color:'#fff', opacity:t2, transform:`translateY(${(1 - t2) * 20}px)` }}>para algas,<br/>hongos y plantas</div>
  </div>;
}

/* ---------- EL SHOT ---------- */
function ReinoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Linneo, Pa: CUES.Parecia, P1: CUES.Pista1, P2: CUES.Pista2, P3: CUES.Pista3, Pr: CUES.Pregunta, P4: CUES.Pista4,
    W: CUES.Whittaker, Ci: CUES.Cinco, A: CUES.ADN, Co: CUES.Codigo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const salto = (T > K.G + 0.1 && T < K.G + 1.0) ? Math.sin(kprog(T, K.G + 0.1, K.G + 0.7) * Math.PI) : 0;
  const sol = kprog(T, K.P1 + 0.1, K.P1 + 0.8, kEase.sale);
  const muda = kprog(T, K.C + 0.8, K.C + 2.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el champiñón en el pasillo de verduras */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.05} origen="50% 60%">
        <FondoLunares color={KC.yellow} />
        <Letrero x={60} y={470} w={460} texto="VERDURAS" />
        {svgR(<>
          <Repisa x={-20} y={1120} w={1120} />
          <Lechuga T={T} x={170} y={1120} s={1.15} />
          <Zanahorias T={T} x={910} y={1120} s={1.0} />
          <Charola T={T} x={540} y={1120} s={1.3} salto={salto} />
          {T > K.G + 0.35 && <text x={575} y={760 - 10 * Math.sin(T * 6)} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={7}
            opacity={kprog(T, K.G + 0.35, K.G + 0.6)} transform={`rotate(${Math.sin(T * 4) * 6} 540 700)`}>?</text>}
        </>)}
      </Escena>
      {/* 1 · Linneo: el libro de las plantas */}
      <Escena T={T} a={K.L} b={K.Pa} zoom={0.06}>
        <FondoLunares color="#f3d9a4" />
        {svgR(<LibroLinneo T={T} at={K.L + 0.1} x={540} y={900} />)}
      </Escena>
      {/* 2–3 · parecía planta · pista 1: sin clorofila */}
      <Escena T={T} a={K.Pa} b={K.P2} zoom={0.04} origen="50% 70%">
        <FondoLunares color={T < K.P1 ? KC.mint : mixHex('#2fe0a8', '#00d2ff', sol)} />
        {svgR(<>
          {sol > 0 && <g transform="translate(540 560)" opacity={sol}>
            <circle r={70 + 6 * Math.sin(T * 4)} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6 + T * 0.4; return <line key={i} x1={Math.cos(a) * 90} y1={Math.sin(a) * 90} x2={Math.cos(a) * 120} y2={Math.sin(a) * 120} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}
          </g>}
          {sol > 0 && [[-1, 300], [1, 780]].map(([d, tx], i) => <line key={i} x1={540 + d * 90} y1={640} x2={klerp(540, tx, sol)} y2={klerp(640, 920, sol)} stroke={KC.yellow} strokeWidth={14} strokeDasharray="22 16" strokeDashoffset={-T * 60} opacity={0.9} />)}
          <Repisa x={-20} y={1150} w={1120} />
          <Champinon x={300} y={1150} s={1.25} sombrero="#fbf8f1" sombra="#ddd3bf" lam="#c99a8a" rot={mece(T, 2, 0.3) * 2} />
          <Lechuga T={T} x={790} y={1150} s={1.7} verde={mixHex('#3fbf4a', '#21d84a', kprog(T, K.P1 + 0.8, K.P1 + 1.4))} />
          {T > K.P1 + 1.0 && Array.from({ length: 10 }, (_, k) => { const u = ((T - K.P1 - 1.0) * 0.6 + k / 10) % 1;
            return <g key={k} opacity={Math.sin(Math.PI * u) * kprog(T, K.P1 + 1.0, K.P1 + 1.4)}><circle cx={700 + (k % 5) * 45 + Math.sin(T * 2 + k) * 10} cy={940 - u * 260} r={18} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={3} />
              <text x={700 + (k % 5) * 45 + Math.sin(T * 2 + k) * 10} y={947 - u * 260} textAnchor="middle" style={{ font:`700 15px ${KF.mono}` }} fill={KC.ink}>O₂</text></g>; })}
          {T < K.P1 + 0.2 && <text x={545} y={1010} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Pa + 1.6, K.Pa + 2.0) * (1 - kprog(T, K.P1 - 0.1, K.P1 + 0.2))}
            transform={`translate(${Math.sin(T * 30) * 4} 0)`}>=</text>}
        </>)}
      </Escena>
      {/* 4 · pista 2: digiere afuera y absorbe (microscopio) */}
      <Escena T={T} a={K.P2} b={K.P3} zoom={0.05} origen="45% 45%">
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {svgR(<>
          <Paja T={T} x={600} y={720} q={1 - 0.6 * kprog(T, K.P2 + 1.0, K.P2 + 3.6)} />
          <Hifa T={T} x0={-60} x1={560} y={830} ancho={92} p={kprog(T, K.P2 - 0.3, K.P2 + 0.9, kEase.sale)} />
          {T > K.P2 + 0.7 && Array.from({ length: 40 }, (_, k) => { const ida = k % 2 === 0, u = ((T - K.P2) * 0.5 + k / 40) % 1;
            const tx = 640 + (k * 37) % 360, ty = 720 + ((k * 53) % 4) * 70;
            const x = ida ? klerp(600, tx, u) : klerp(tx, 590, u), y = ida ? klerp(830, ty, u) : klerp(ty, 830, u);
            const o = Math.sin(Math.PI * u) * (ida ? kprog(T, K.P2 + 0.7, K.P2 + 1.1) : kprog(T, K.P2 + 2.0, K.P2 + 2.5));
            return <circle key={k} cx={x + mece(T, k, 0.5) * 8} cy={y + mece(T, k + 5, 0.5) * 8} r={ida ? 11 : 8} fill={ida ? KC.yellow : KC.mint} stroke={KC.ink} strokeWidth={2} opacity={o} />; })}
        </>)}
      </Escena>
      {/* 5 · pista 3: la pared (lechuga vs hongo) */}
      <Escena T={T} a={K.P3} b={K.Pr} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        {svgR(<>
          <CelulaLechuga T={T} x={275} y={860} w={410} h={560} fibras={kprog(T, K.P3 + 0.2, K.P3 + 1.0)} />
          <g opacity={kprog(T, K.P3 + 0.6, K.P3 + 1.0)}>
            <rect x={565} y={580} width={470} height={560} rx={40} fill="#14202a" stroke="#9fd9c4" strokeWidth={6} />
            <Hifa T={T} x0={565} x1={1000} y={700} ancho={110} pared={22} paredColor={KC.gold2} onda={6} septos={210} />
            <line x1={800} y1={760} x2={800} y2={850} stroke={KC.gold2} strokeWidth={4} strokeDasharray="10 8" />
            {[0, 1].map((r) => <CadenaAnillos key={r} x={620} y={920 + r * 90} n={4} s={0.62} paso={118} color={r === 1 ? '#7fd8ff' : KC.gold2} T={T} ondula={0.15} p={kprog(T, K.P3 + 1.0 + r * 0.25, K.P3 + 1.9 + r * 0.25)} />)}
          </g>
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿dónde guarda su energía? */}
      <Escena T={T} a={K.Pr} b={K.P4} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {svgR(<><Hifa T={T} x0={-80} x1={520} y={1080} ancho={120} onda={10} /><Pila T={T} x={280} y={760} s={1.1} nivel={0.25 + 0.1 * Math.sin(T * 3)} /></>)}
      </Escena>
      {/* 7 · pista 4: glucógeno, como tu hígado; no almidón como la papa */}
      <Escena T={T} a={K.P4} b={K.W} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={14} />
        {svgR(<>
          <Hifa T={T} x0={-60} x1={640} y={640} ancho={130} onda={10} septos={300}>{(yy) => [60, 150, 230, 330, 420, 500, 560, 120, 280, 460].map((gx, i) =>
            <Glucogeno key={i} x={gx} y={yy(gx) + ((i % 3) - 1) * 30} s={0.75} on={kprog(T, K.P4 + 0.6 + i * 0.12, K.P4 + 1.0 + i * 0.12)} />)}</Hifa>
          <Higado x={270} y={1010} s={0.95}>{[[-120, -40], [-40, -70], [60, -60], [130, -60], [-90, 30], [10, 10], [-10, -20]].map(([a, b], i) =>
            <Glucogeno key={i} x={a} y={b} s={0.6} on={kprog(T, K.P4 + 1.6 + i * 0.1, K.P4 + 2.0 + i * 0.1)} />)}</Higado>
          <Papa x={800} y={1010} s={0.95}>{[[-110, -50], [-20, -70], [80, -40], [-60, 30], [40, 30], [130, 10]].map(([a, b], i) =>
            <GranoAlmidon key={i} x={a} y={b} s={0.9} rot={i * 30} />)}</Papa>
          {(() => { const t = kprog(T, K.P4 + 3.0, K.P4 + 3.4, kEase.sale); return t > 0 && <path d={`M 640 900 L ${klerp(640, 960, t)} ${klerp(900, 1110, t)} M 960 900 L ${klerp(960, 640, t)} ${klerp(900, 1110, t)}`} stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity=".9" />; })()}
        </>)}
      </Escena>
      {/* 8 · Whittaker 1959: un reino por cómo comen */}
      <Escena T={T} a={K.W} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {svgR(<>
          <IconoNutricion T={T} x={190} y={950} tipo="planta" on={kprog(T, K.W + 1.6, K.W + 2.0)} />
          <IconoNutricion T={T} x={540} y={950} tipo="animal" on={kprog(T, K.W + 2.1, K.W + 2.5)} />
          <IconoNutricion T={T} x={890} y={950} tipo="hongo" on={kprog(T, K.W + 2.6, K.W + 3.0)} brillo={kprog(T, K.W + 4.2, K.W + 4.7)} />
        </>)}
      </Escena>
      {/* 9 · 1969: cinco reinos en Science, y a los libros de texto */}
      <Escena T={T} a={K.Ci} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {[['Monera', '#9be36a'], ['Protista', '#00d2ff'], ['Plantae', '#3fbf4a'], ['Fungi', KC.gold2], ['Animalia', '#ff8a1f']].map(([t, c], i) =>
          <CajaReino key={t} x={118 + i * 211} y={850} texto={t} color={c} on={kprog(T, K.Ci + 1.2 + i * 0.18, K.Ci + 1.6 + i * 0.18)} brillo={i === 3 ? kprog(T, K.Ci + 2.3, K.Ci + 2.8) : 0} />)}
        {svgR(<Libros x={420} y={1150} s={0.85} on={kprog(T, K.Ci + 2.9, K.Ci + 3.4)} />, 25)}
      </Escena>
      {/* 10 · el ADN: más parientes de los animales que de las plantas */}
      <Escena T={T} a={K.A} b={K.Co} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {svgR(<>
          <ADNHebra T={T} x={420} y={470} largo={600} alto={70} vueltas={3} resalta={(u) => u < kprog(T, K.A + 0.2, K.A + 2.0)} />
          {(() => { const p = kprog(T, K.A + 1.4, K.A + 2.6, kEase.sale), q = kprog(T, K.A + 2.4, K.A + 3.4, kEase.sale);
            return <g strokeLinecap="round" fill="none">
              <path d={`M 540 1170 L 540 ${klerp(1170, 1060, p)}`} stroke={KC.texto} strokeWidth={12} />
              <path d={`M 540 1060 L ${klerp(540, 200, p)} ${klerp(1060, 870, p)}`} stroke={RN.verde} strokeWidth={12} />
              <path d={`M 540 1060 L ${klerp(540, 720, p)} ${klerp(1060, 960, p)}`} stroke={KC.texto} strokeWidth={12} />
              <path d={`M 720 960 L ${klerp(720, 560, q)} ${klerp(960, 870, q)}`} stroke={KC.gold2} strokeWidth={12} />
              <path d={`M 720 960 L ${klerp(720, 880, q)} ${klerp(960, 870, q)}`} stroke={KC.gold2} strokeWidth={12} />
              {q > 0 && <circle cx={720} cy={960} r={16 + 4 * Math.sin(T * 5)} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} style={{ filter:`drop-shadow(0 0 12px ${KC.gold2})` }} />}
            </g>; })()}
          <g opacity={kprog(T, K.A + 2.0, K.A + 2.4)}><Lechuga T={T} x={200} y={860} s={0.7} /></g>
          <g opacity={kprog(T, K.A + 3.0, K.A + 3.4)}><Champinon x={560} y={860} s={0.62} sombrero="#fbf8f1" sombra="#ddd3bf" lam="#c99a8a" /></g>
          <g opacity={kprog(T, K.A + 3.2, K.A + 3.6)}><Persona x={880} y={860} s={1.2} /></g>
        </>)}
      </Escena>
      {/* 11 · el código que les pone nombre */}
      <Escena T={T} a={K.Co} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <LibroCodigo T={T} at={K.Co} x={360} y={860} />
      </Escena>
      {/* 12 · cierre: el champiñón se muda a su propio reino */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="50% 60%">
        <FondoLunares color={KC.yellow} />
        <Letrero x={30} y={560} w={440} texto="VERDURAS" tam={58} />
        <Letrero x={560} y={560} w={490} texto="REINO FUNGI" fondo={KC.gold} color={KC.ink} tam={58} />
        {svgR(<>
          <Repisa x={-20} y={1120} w={530} />
          <Repisa x={530} y={1120} w={570} color={KC.gold2} color2={KC.gold} />
          <rect x={530} y={700} width={560} height={420} fill="rgba(244,194,90,.25)" />
          <Lechuga T={T} x={130} y={1120} s={1.15} />
          <Zanahorias T={T} x={380} y={1120} s={0.85} />
          <Charola T={T} x={klerp(270, 805, muda)} y={1120 - Math.sin(muda * Math.PI) * 160} s={1.2} />
          {muda >= 1 && Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4, r = 150 + 40 * kprog(T, K.C + 2.2, K.C + 2.8);
            return <circle key={k} cx={800 + Math.cos(a) * r} cy={980 + Math.sin(a) * r * 0.6} r={9} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} opacity={1 - kprog(T, K.C + 2.4, K.C + 3.0)} />; })}
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.0} until={K.L - 0.3} x={40} y={660} texto="champiñón" tam={40} color={KC.ink} />
      <Etq T={T} at={K.G + 1.4} until={K.L - 0.3} x={40} y={712} texto="Agaricus bisporus" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.L + 2.8} until={K.Pa - 0.3} texto="Cryptogamia: plantas sin flor" x={540} y={470} tam={38} borde={RN.verde2} />
      <Chip T={T} at={K.Pa + 0.4} until={K.P1 - 0.2} texto="no se mueve ✓" x={330} y={520} tam={38} borde={RN.verde} />
      <Chip T={T} at={K.Pa + 1.2} until={K.P1 - 0.2} texto="células con pared ✓" x={330} y={610} tam={38} borde={RN.verde} />
      <Capitulo T={T} hasta={K.W - 0.1} caps={[{ at:K.P1, titulo:'Pista: clorofila' }, { at:K.P2, titulo:'Pista: cómo come' }, { at:K.P3, titulo:'Pista: la pared' }, { at:K.P4, titulo:'Pista: la reserva' }]} />
      <Chip T={T} at={K.P1 + 1.2} until={K.P2 - 0.2} texto="0 clorofila" x={300} y={760} tam={40} borde={KC.red} />
      <Etq T={T} at={K.P1 + 1.5} until={K.P2 - 0.2} x={660} y={700} texto="fotosíntesis" tam={30} color={KC.ink} />
      <Chip T={T} at={K.P2 + 0.6} until={K.P3 - 0.2} texto="1 · digiere afuera (enzimas)" x={420} y={480} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.P2 + 2.1} until={K.P3 - 0.2} texto="2 · absorbe" x={330} y={1060} tam={36} borde={KC.mint} />
      <Etq T={T} at={K.P2 + 0.5} until={K.P3 - 0.2} x={60} y={930} texto="hifa" tam={32} color={KC.texto} />
      <Etq T={T} at={K.P2 + 1.0} until={K.P3 - 0.2} x={640} y={620} texto="paja (composta)" tam={28} color={RN.paja} />
      <Chip T={T} at={K.P3 + 0.3} until={K.Pr - 0.2} texto="LECHUGA" x={275} y={500} tam={36} borde={RN.verde} mono />
      <Chip T={T} at={K.P3 + 0.7} until={K.Pr - 0.2} texto="HONGO" x={800} y={500} tam={36} borde={KC.gold2} mono />
      <Etq T={T} at={K.P3 + 0.9} until={K.Pr - 0.2} x={95} y={1170} texto="pared de celulosa" tam={28} color={'#b7f28a'} />
      <Chip T={T} at={K.P3 + 2.0} until={K.Pr - 0.2} texto="quitina (+ glucanos)" x={800} y={1085} tam={30} borde={KC.gold2} />
      <MitoTachado T={T} at={K.P3 + 1.1} tacharEn={K.P3 + 1.8} until={K.Pr - 0.2} texto="celulosa" x={800} y={810} tam={32} />
      <Chip T={T} at={K.P4 + 0.3} until={K.W - 0.2} texto="glucógeno = como los animales" x={360} y={460} tam={34} borde={'#ff9ec2'} />
      <Etq T={T} at={K.P4 + 0.8} until={K.W - 0.2} x={60} y={740} texto="hifa con glucógeno" tam={26} color={'#ff9ec2'} />
      <Etq T={T} at={K.P4 + 1.7} until={K.W - 0.2} x={130} y={1150} texto="tu hígado" tam={32} color={KC.texto} />
      <Etq T={T} at={K.P4 + 2.5} until={K.W - 0.2} x={630} y={1150} texto="almidón (papa)" tam={32} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.W + 0.2} until={K.Ci - 0.2} anio="1959" quien="Robert H. Whittaker · ecólogo" revista="Quarterly Review of Biology · 4 reinos" x={540} y={650} />
      {[['1753 · Linneo', 'plantas'], ['Haeckel', 'Protista'], ['1956 · Copeland', 'Protoctista'], ['1959 · Whittaker', 'Fungi']].map(([a, b], i) =>
        <div key={i} style={{ position:'absolute', left:20 + i * 262, top:318, width:250, zIndex:42, textAlign:'center', opacity:kprog(T, K.W + 0.6 + i * 0.25, K.W + 0.9 + i * 0.25) * (1 - kprog(T, K.Ci - 0.3, K.Ci)),
          background: i === 3 ? KC.gold2 : 'rgba(14,15,18,.8)', color: i === 3 ? KC.ink : KC.texto, border:`4px solid ${KC.ink}`, borderRadius:16, padding:'6px 4px', font:`700 22px/1.2 ${KF.mono}` }}>{a}<br/><b style={{ font:`900 26px ${KF.texto}` }}>{b}</b></div>)}
      {[['plantas', 'fotosíntesis', 190], ['animales', 'ingieren', 540], ['hongos', 'absorben', 890]].map(([a, b, x], i) =>
        <div key={a} style={{ position:'absolute', left:x - 150, top:1075, width:300, zIndex:42, textAlign:'center', opacity:kprog(T, K.W + 1.8 + i * 0.5, K.W + 2.2 + i * 0.5) * (1 - kprog(T, K.Ci - 0.3, K.Ci)),
          font:`900 34px/1.1 ${KF.texto}`, color:KC.ink }}>{a}<br/><span style={{ font:`700 28px ${KF.mono}`, color: i === 2 ? KC.ink : '#1d3d4a', background: i === 2 ? KC.gold2 : 'transparent', padding:'0 8px', borderRadius:8 }}>{b}</span></div>)}
      <TarjetaEstudio T={T} at={K.Ci + 0.1} until={K.A - 0.2} anio="1969" quien="R. H. Whittaker · Universidad Cornell" revista="Science 163: 150–160 · cinco reinos" x={540} y={560} />
      <Etq T={T} at={K.Ci + 3.2} until={K.A - 0.2} x={650} y={1080} texto="libros de texto" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ci + 3.5} until={K.A - 0.2} x={650} y={1125} texto="años 80 y 90" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 0.3} until={K.Co - 0.2} x={420} y={570} texto="leyendo ADN…" tam={28} color={KC.lilac} />
      <Etq T={T} at={K.A + 2.0} until={K.Co - 0.2} x={140} y={700} texto="plantas" tam={30} color={RN.verde} />
      <Etq T={T} at={K.A + 3.0} until={K.Co - 0.2} x={480} y={700} texto="hongos" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.A + 3.2} until={K.Co - 0.2} x={800} y={700} texto="animales" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.A + 3.5} until={K.Co - 0.2} x={740} y={1010} texto="opistocontos" tam={24} color={KC.gold2} />
      <Chip T={T} at={K.Co + 0.3} until={K.C - 0.2} texto="hasta 2011" x={330} y={460} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Co + 2.0} until={K.C - 0.2} texto="Melbourne, 2011" x={810} y={900} tam={30} borde={KC.gold2} mono />
      {[['sin clorofila', 0], ['absorbe', 1], ['quitina', 2], ['glucógeno', 3]].map(([t, i]) =>
        <div key={t} style={{ position:'absolute', left:40 + (i % 2) * 500, top:380 + Math.floor(i / 2) * 80, width:480, zIndex:42, display:'flex', alignItems:'center', gap:12,
          opacity:kprog(T, K.C + 2.4 + i * 0.25, K.C + 2.7 + i * 0.25), transform:`scale(${klerp(1.3, 1, kprog(T, K.C + 2.4 + i * 0.25, K.C + 2.8 + i * 0.25, kEase.rebote))})` }}>
          <div style={{ width:54, height:54, borderRadius:27, background:KC.gold, border:`4px solid ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center', font:`400 34px ${KF.titulo}`, color:KC.ink }}>{i + 1}</div>
          <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, background:'rgba(255,255,255,.85)', border:`4px solid ${KC.ink}`, borderRadius:14, padding:'2px 14px' }}>{t}</div>
        </div>)}
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="más cerca de ti" x={800} y={760} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscalaR T={T} at={K.G} until={K.L} texto="5 cm" largo={90} />
      <BarraEscalaR T={T} at={K.L} until={K.Pa} texto="libro esquemático" largo={0} />
      <BarraEscalaR T={T} at={K.Pa} until={K.P2} texto="5 cm" largo={110} />
      <BarraEscalaR T={T} at={K.P2} until={K.P3} texto="10 µm" largo={130} />
      <BarraEscalaR T={T} at={K.P3} until={K.Pr} texto="esquemático (no a escala)" largo={0} />
      <BarraEscalaR T={T} at={K.Pr} until={K.P4} texto="10 µm" largo={110} />
      <BarraEscalaR T={T} at={K.P4} until={K.W} texto="esquemático (no a escala)" largo={0} />
      <BarraEscalaR T={T} at={K.A} until={K.Co} texto="árbol simplificado" largo={0} />
      <BarraEscalaR T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="Ese champiñón *no es una verdura.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.Pa - 0.1} texto="Linneo lo puso con las *plantas sin flor.*" />
      <Subtitulo T={T} idx={2} at={K.Pa + 0.1} until={K.P1 - 0.1} texto="Parecía lógico: *no se mueve, tiene pared.*" />
      <Subtitulo T={T} idx={3} at={K.P1 + 0.1} until={K.P2 - 0.1} texto="Pista 1: *no tiene clorofila.*" />
      <Subtitulo T={T} idx={4} at={K.P2 + 0.1} until={K.P3 - 0.1} texto="Pista 2: *digiere afuera* y absorbe." />
      <Subtitulo T={T} idx={5} at={K.P3 + 0.1} until={K.Pr - 0.1} texto="Pista 3: pared de *quitina,* no de celulosa." />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.P4 - 0.1} texto="¿Dónde guarda *su energía?*" />
      <Subtitulo T={T} idx={7} at={K.P4 + 0.1} until={K.W - 0.1} texto="Pista 4: *glucógeno,* como tu hígado." />
      <Subtitulo T={T} idx={8} at={K.W + 0.1} until={K.Ci - 0.1} texto="1959: Whittaker les da *reino propio.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.A - 0.1} texto="1969: *cinco reinos* en Science." />
      <Subtitulo T={T} idx={10} at={K.A + 0.1} until={K.Co - 0.1} texto="Más parientes *de los animales.*" />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.C - 0.1} texto="Su código se llamó *botánico* hasta 2011." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tiene *su propio reino,* más cerca de ti." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Pa + 0.1, K.P1 + 0.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P1 + 0.3, K.P2 - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P3 + 0.8, K.Pr - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pr + 0.05, K.P4 + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.P4 + 1.2, K.W - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.W + 1.0, K.Ci - 0.4, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.A + 0.3, K.Co - 0.4, 'avatar_02_apuntando_camara', 'izq-alto'],
        [K.Co + 0.4, K.C - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.6, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="137" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Barra de escala fija (texto + barra; largo 0 = solo texto).
function BarraEscalaR({ T, texto, largo = 200, x = 60, y = 1430, at = -1, until, color = KC.texto }) {
  if (T < at || (until != null && T > until)) return null;
  const o = kprog(T, at, at + 0.3) * (until != null ? 1 - kprog(T, until - 0.3, until) : 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, color, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA, opacity:o }}>
    <div style={{ marginBottom:8 }}>{texto}</div>
    {largo > 0 && <div style={{ width:largo, height:8, background:color, borderRadius:4, boxShadow:'0 3px 0 rgba(0,0,0,.7)' }}></div>}
  </div>;
}

function ReinoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ReinoShot /></CompositionStage></div>;
}
window.ReinoApp = ReinoApp;
