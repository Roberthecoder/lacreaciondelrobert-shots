// Shot Fungi Mati #112 · «Ya lo comí antes y no me hizo nada»: el paxilo enrollado (Paxillus involutus) — NARRADO
// (gancho 6 "mito peligroso"; formato N1 Por dentro + N5 caso real dibujado). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático. No es guía de identificación.

const PX = { somb:'#8a6436', somb2:'#a87d45', somb3:'#5e4220', pie:'#b48c55', pie2:'#8c6a3c', lam:'#e2c97a', lam2:'#c9a95a', mancha:'#4a2a12',
  carne:'#f1dfa6', plato:'#fbf7ee', sangre:'#3a0d14', globulo:'#d7263d', globulo2:'#a3172a', linfo:'#8f7bff', anti:'#ffd84a', antig:'#b9824a', piel:'#f2c39b' };

// Rebanadas de hongo cocinado en un plato (vistas desde arriba un poco de lado).
function Plato({ T, x, y, s = 1, vapor = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={250} ry={92} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={0} rx={250} ry={92} fill={PX.plato} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-4} rx={175} ry={60} fill="#efe6d2" stroke="#d6cbb2" strokeWidth={4} />
    {[[-90, -10, -20], [-30, 10, 15], [40, -14, -8], [100, 8, 25], [-60, 26, 40], [20, 30, -30], [70, -36, 10]].map(([a, b, r], i) =>
      <g key={i} transform={`translate(${a} ${b}) rotate(${r})`}>
        <path d="M -46 6 Q -40 -26 0 -28 Q 40 -26 46 6 Q 30 -2 18 4 L 12 22 L -12 22 L -18 4 Q -30 -2 -46 6 Z" fill={i % 2 ? PX.somb2 : PX.somb} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M -40 4 Q -38 -2 -46 6" stroke={PX.somb3} strokeWidth={4} fill="none" />
      </g>)}
    {vapor > 0 && [-80, 0, 80].map((dx, i) => { const u = (T * 0.6 + i * 0.33) % 1;
      return <path key={i} d={`M ${dx} ${-40 - u * 160} q 18 -30 0 -60 q -18 -30 0 -60`} stroke="#ffffff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * Math.sin(Math.PI * u) * 0.75} />; })}
  </g>;
}
// "Veces que lo comiste": platitos con ✓; el último con "!".
function Veces({ T, x, y, at, marcas = 3, alerta = true, tachon = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2, 3].map((i) => { const on = kprog(T, at + i * 0.45, at + i * 0.45 + 0.35, kEase.rebote); if (on <= 0) return null;
      const ultimo = i === 3; const lat = ultimo ? 1 + 0.08 * Math.sin(T * 9) : 1;
      return <g key={i} transform={`translate(${i * 125} 0) scale(${on * lat})`}>
        <circle r={52} fill={ultimo ? '#fff1ef' : KC.paper} stroke={ultimo && alerta ? KC.red : KC.ink} strokeWidth={7} />
        <text y={-62} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{['1ª', '2ª', '3ª', '4ª'][i]}</text>
        {!ultimo && i < marcas && <path d="M -22 2 L -6 18 L 24 -16" stroke="#118a3a" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {ultimo && alerta && <text y={22} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.red}>!</text>}
      </g>; })}
    {tachon > 0 && <line x1={-60} y1={0} x2={-60 + 370 * tachon} y2={0} stroke={KC.red} strokeWidth={12} strokeLinecap="round" />}
  </g>;
}
// Paxilo de perfil: sombrero en embudo con el centro hundido y el BORDE ENROLLADO hacia dentro; láminas claras
// que bajan por el pie (decurrentes); pie corto y grueso. Base del pie en (x, y). crece 0..1.
function Paxilo({ T = 0, x, y, s = 1, crece = 1, H = 190, corte = false, manchas = 0 }) {
  if (crece <= 0) return null;
  const p = kEase.sale(kclamp(crece * 1.4, 0, 1)), c = kEase.rebote(kclamp(crece * 1.6 - 0.45, 0, 1));
  const cy = -H * p;
  const sombrero = `M -40 ${cy + 40} Q -150 ${cy + 40} -225 ${cy + 35} Q -266 ${cy + 40} -264 ${cy + 4} Q -252 ${cy - 72} -120 ${cy - 86} Q -40 ${cy - 62} 0 ${cy - 50} Q 40 ${cy - 62} 120 ${cy - 86} Q 252 ${cy - 72} 264 ${cy + 4} Q 266 ${cy + 40} 225 ${cy + 35} Q 150 ${cy + 40} 40 ${cy + 40} Z`;
  const laminas = `M -228 ${cy + 34} Q -120 ${cy + 70} -34 ${cy + 120} L 34 ${cy + 120} Q 120 ${cy + 70} 228 ${cy + 34} Q 150 ${cy + 42} 40 ${cy + 42} L -40 ${cy + 42} Q -150 ${cy + 42} -228 ${cy + 34} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id="pxSomb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={PX.somb2} /><stop offset="100%" stopColor={PX.somb} /></linearGradient>
      <linearGradient id="pxPie" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={PX.pie2} /><stop offset="50%" stopColor={PX.pie} /><stop offset="100%" stopColor={PX.pie2} /></linearGradient>
    </defs>
    {/* pie corto y grueso */}
    <path d={`M -46 0 Q -50 ${cy * 0.5} -38 ${cy + 40} L 38 ${cy + 40} Q 50 ${cy * 0.5} 46 0 Z`} fill={corte ? PX.carne : 'url(#pxPie)'} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {c > 0 && <g transform={`translate(0 ${cy}) scale(${c}) translate(0 ${-cy})`}>
      {/* láminas decurrentes: bajan por el pie */}
      <path d={laminas} fill={PX.lam} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      {Array.from({ length: 15 }, (_, i) => { const u = i / 14 * 2 - 1, xa = u * 214, xb = u * 30;
        return <path key={i} d={`M ${xa} ${cy + 36 + Math.abs(u) * -2} Q ${xa * 0.5} ${cy + 64 + (1 - Math.abs(u)) * 10} ${xb} ${cy + 118}`} stroke={PX.lam2} strokeWidth={4} fill="none" />; })}
      {/* láminas que siguen bajando por el pie */}
      {[-24, -10, 4, 18].map((dx, i) => <line key={i} x1={dx} y1={cy + 118} x2={dx * 0.9} y2={cy + 150} stroke={PX.lam2} strokeWidth={4} />)}
      <path d={sombrero} fill={corte ? PX.carne : 'url(#pxSomb)'} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      {corte && <path d={`M -200 ${cy + 20} Q -100 ${cy - 40} 0 ${cy - 30} Q 100 ${cy - 40} 200 ${cy + 20}`} stroke="#d9c07a" strokeWidth={5} fill="none" />}
      {/* el borde enrollado hacia dentro: la orilla da vuelta hacia abajo y adentro */}
      {[-1, 1].map((k) => <path key={k} d={`M ${k * 226} ${cy + 34} Q ${k * 262} ${cy + 36} ${k * 258} ${cy + 2} Q ${k * 250} ${cy - 20} ${k * 232} ${cy - 18}`} stroke={PX.somb3} strokeWidth={7} fill="none" strokeLinecap="round" />)}
      {!corte && <path d={`M -150 ${cy - 66} Q -80 ${cy - 80} -30 ${cy - 58}`} stroke="#ffffff" strokeWidth={9} fill="none" opacity=".3" strokeLinecap="round" />}
      {!corte && <ellipse cx={0} cy={cy - 52} rx={40} ry={7} fill={PX.somb3} opacity=".5" />}
      {/* manchas cafés donde lo tocan */}
      {manchas > 0 && [[150, 52, 1], [110, 62, 0.8], [182, 46, 0.7], [60, 92, 0.6], [24, 132, 0.7]].map(([mx, my, k], i) =>
        <ellipse key={i} cx={mx} cy={cy + my} rx={30 * k * kclamp(manchas * 1.5 - i * 0.15, 0, 1)} ry={14 * k * kclamp(manchas * 1.5 - i * 0.15, 0, 1)} fill={PX.mancha} opacity=".85" />)}
    </g>}
  </g>;
}
// Suelo de bosque con hojarasca.
function Hojarasca({ y }) {
  return <g>
    <rect x={-20} y={y} width={1120} height={900} fill="#6b4a2a" />
    <path d={`M -20 ${y} Q 270 ${y - 22} 540 ${y - 6} Q 810 ${y + 10} 1100 ${y - 14} L 1100 ${y + 30} L -20 ${y + 30} Z`} fill="#4f8a3a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 16 }, (_, i) => { const hx = 30 + i * 67, hy = y + 14 + (i % 3) * 9;
      return <ellipse key={i} cx={hx} cy={hy} rx={34} ry={12} fill={['#c9772b', '#e0a43c', '#9a5a22'][i % 3]} stroke={KC.ink} strokeWidth={3} transform={`rotate(${(i * 37) % 50 - 25} ${hx} ${hy})`} />; })}
  </g>;
}
// Dedo que toca (entra por la derecha).
function Dedo({ x, y, p = 1 }) {
  const dx = klerp(500, 0, p);
  return <g transform={`translate(${x + dx} ${y}) rotate(-18)`}>
    <rect x={0} y={-38} width={420} height={76} rx={38} fill={PX.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M 14 -26 Q 40 -30 58 -18 L 58 18 Q 40 30 14 26 Q 4 0 14 -26 Z" fill="#f8dccb" stroke={KC.ink} strokeWidth={4} />
    <line x1={140} y1={-30} x2={140} y2={30} stroke="#c99a78" strokeWidth={4} />
  </g>;
}
// Mapa esquemático de Europa con un punto en Europa central.
function MapaEuropa({ x, y, s = 1, punto = 1 }) {
  const contorno = 'M 60 360 Q 40 300 90 260 Q 70 210 120 180 Q 150 120 210 130 Q 230 70 300 60 Q 340 20 400 40 Q 470 30 520 60 Q 600 50 640 100 Q 700 130 690 200 Q 720 260 680 300 Q 640 330 600 320 Q 560 360 520 340 Q 490 400 440 380 Q 420 430 380 410 Q 360 360 320 380 Q 290 420 250 400 Q 200 420 160 390 Q 110 400 60 360 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={contorno} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 220 160 Q 300 140 340 200 M 360 120 Q 420 200 470 210" stroke="#c9a85a" strokeWidth={4} fill="none" strokeDasharray="12 9" />
    {punto > 0 && <g transform={`translate(390 210) scale(${kEase.rebote(punto)})`}>
      <circle r={64} fill="rgba(255,59,47,.25)" />
      <circle r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}
// Olla con paxilos hirviendo. tache 0..1.
function Olla({ T, x, y, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-120} width={300} height={170} rx={26} fill="#8c96a8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-190} y={-100} width={46} height={22} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={6} />
    <rect x={144} y={-100} width={46} height={22} rx={10} fill="#5b6475" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-120} rx={150} ry={30} fill="#c9a36a" stroke={KC.ink} strokeWidth={7} />
    {[[-70, -124], [-10, -130], [55, -120], [20, -112]].map(([a, b], i) => <path key={i} d={`M ${a - 28} ${b + 4} Q ${a} ${b - 22 + Math.sin(T * 6 + i) * 4} ${a + 28} ${b + 4} Z`} fill={PX.somb} stroke={KC.ink} strokeWidth={4} />)}
    {[0, 1, 2, 3, 4].map((i) => { const u = (T * 1.4 + i * 0.21) % 1; return <circle key={i} cx={-100 + i * 50} cy={-130 - u * 40} r={6 + u * 8} fill="none" stroke="#ffffff" strokeWidth={4} opacity={1 - u} />; })}
    {tache > 0 && <path d="M -170 -190 L 170 60 M 170 -190 L -170 60" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={tache} />}
  </g>;
}
// Estómago esquemático; irrita 0..1 = rayitas rojas y temblor.
function Estomago({ T, x, y, s = 1, irrita = 0 }) {
  const tiembla = irrita * Math.sin(T * 40) * 5;
  return <g transform={`translate(${x + tiembla} ${y}) scale(${s})`}>
    <path d="M -40 -220 Q -30 -150 -80 -110 Q -200 -40 -150 80 Q -100 190 40 160 Q 190 120 200 0 Q 210 -90 120 -100 Q 40 -100 20 -160 L 20 -220 Z" fill="#ff9aa8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 200 0 Q 240 20 250 70" stroke={KC.ink} strokeWidth={9} fill="none" />
    {irrita > 0 && [[-90, -20], [-40, 60], [40, 40], [100, -20], [-110, 70], [10, 110]].map(([a, b], i) =>
      <path key={i} d={`M ${a - 20} ${b} l 10 -14 l 10 14 l 10 -14 l 10 14`} stroke={KC.red} strokeWidth={7} fill="none" strokeLinecap="round" opacity={kclamp(irrita * 2 - i * 0.15, 0, 1)} />)}
  </g>;
}
// Anticuerpo en Y (IgG esquemático).
function Anticuerpo({ x, y, s = 1, rot = 0, color = PX.anti, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d="M 0 30 L 0 0 L -22 -26 M 0 0 L 22 -26" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Partícula del hongo (antígeno, esquemática).
function Antigeno({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -16 -6 L -6 -18 L 10 -16 L 18 -2 L 10 14 L -8 16 L -18 6 Z" fill={PX.antig} stroke="#ffe2b8" strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
// Linfocito B: célula redonda con núcleo grande.
function Linfocito({ T, x, y, r = 120, activo = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${1 + 0.03 * Math.sin(T * 3) + activo * 0.05})`} style={activo ? { filter:`drop-shadow(0 0 ${22 * activo}px ${PX.linfo})` } : null}>
    <circle r={r} fill="rgba(143,123,255,.35)" stroke={PX.linfo} strokeWidth={7} />
    <circle cx={-10} cy={4} r={r * 0.72} fill="#5a3fd1" opacity=".85" />
    <circle cx={-30} cy={-20} r={10} fill="#a99bff" /><circle cx={18} cy={24} r={8} fill="#a99bff" />
  </g>;
}
// Glóbulo rojo de frente (disco con el centro hundido). revienta 0..1.
function Globulo({ x, y, r = 70, rev = 0, seed = 1 }) {
  if (rev >= 1) return <g>{Array.from({ length: 9 }, (_, i) => { const a = i * 0.7 + seed; return <circle key={i} cx={x + Math.cos(a) * r * 1.6} cy={y + Math.sin(a) * r * 1.6} r={6} fill={KC.red} opacity=".75" />; })}
    <path d={`M ${x - r * 0.6} ${y} q ${r * 0.3} ${-r * 0.5} ${r * 0.6} 0 q ${r * 0.3} ${r * 0.4} ${r * 0.6} 0`} stroke={PX.globulo2} strokeWidth={6} fill="none" opacity=".6" /></g>;
  const k = 1 + rev * 0.25;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <ellipse rx={r} ry={r * 0.92} fill={PX.globulo} stroke={PX.globulo2} strokeWidth={6} />
    <ellipse rx={r * 0.45} ry={r * 0.4} fill={PX.globulo2} opacity=".7" />
    {rev > 0 && Array.from({ length: 9 }, (_, i) => { const a = i * 0.7 + seed; const d = r * (1 + rev * 0.6); return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={5} fill={KC.red} opacity={rev} />; })}
  </g>;
}
// Grumo (complejo inmune): partícula del hongo con anticuerpos pegados.
function Grumo({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <Antigeno x={0} y={0} s={1.2} />
    {[0, 1, 2, 3].map((i) => <Anticuerpo key={i} x={Math.cos(i * 1.57) * 34} y={Math.sin(i * 1.57) * 34} rot={i * 90 + 90} s={0.7} />)}
  </g>;
}
// Riñón esquemático. apaga 0..1 = se oscurece y salen grietas.
function Rinon({ x, y, s = 1, apaga = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 40 -200 Q -150 -220 -170 -20 Q -180 180 20 200 Q 110 205 120 120 Q 70 60 80 0 Q 70 -60 120 -110 Q 120 -190 40 -200 Z" fill={mixHex('#c24a5a', '#5a2a30', apaga)} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 80 0 Q 140 0 190 -10" stroke={KC.ink} strokeWidth={9} fill="none" />
    {apaga > 0 && <path d="M -90 -90 l 30 30 l -20 30 l 34 26 M -40 60 l 26 20 l -10 40" stroke={KC.ink} strokeWidth={6} fill="none" opacity={apaga} />}
  </g>;
}
// Silueta esquemática (no es retrato). tipo 0 = él (sombrero de época), 1 = ella.
function Silueta({ x, y, s = 1, tipo = 0, color = '#3a3350', apagado = 0 }) {
  const c = mixHex(color, '#8a8698', apagado);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 0 Q -110 -170 0 -180 Q 110 -170 110 0 Z" fill={c} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-250} r={70} fill={c} stroke={KC.ink} strokeWidth={6} />
    {tipo === 0 && <><rect x={-80} y={-336} width={160} height={22} rx={8} fill={c} stroke={KC.ink} strokeWidth={6} /><rect x={-52} y={-392} width={104} height={64} rx={14} fill={c} stroke={KC.ink} strokeWidth={6} /></>}
    {tipo === 1 && <path d="M -72 -260 Q -90 -170 -40 -180 M 72 -260 Q 90 -170 40 -180" stroke={c} strokeWidth={26} fill="none" strokeLinecap="round" />}
  </g>;
}
// Calendario que cuenta días.
function Calendario({ x, y, dia, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-110} y={-110} width={220} height={220} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={-110} width={220} height={56} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text y={-70} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#fff">DÍA</text>
    <text y={80} textAnchor="middle" style={{ font:`400 140px ${KF.titulo}` }} fill={KC.ink}>{dia}</text>
  </g>;
}
// Personita esquemática para la cuadrícula.
function Persona({ x, y, s = 1, color = '#3a3350' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-46} r={18} fill={color} />
    <path d="M -26 0 Q -26 -26 0 -26 Q 26 -26 26 0 Z" fill={color} />
  </g>;
}

// Disposición de las partículas en la sangre (fija, no aleatoria en cada cuadro).
const AG = Array.from({ length: 10 }, (_, i) => [140 + ((i * 263) % 820), 560 + ((i * 157) % 560), (i * 47) % 360]);
const GL = [[220, 640], [520, 560], [820, 690], [330, 940], [700, 980], [480, 780], [900, 1080], [150, 1100]];
const GENTE = Array.from({ length: 32 }, (_, i) => [130 + (i % 8) * 118, 790 + Math.floor(i / 8) * 100]);
const RUTA = [5, 30, 12, 21, 19, 2, 26, 9];

function PaxillusShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, La: CUES.Laminas, Hi: CUES.Historia, Cr: CUES.Crudo, S: CUES.Sensibiliza, P: CUES.Pregunta, He: CUES.Hemolisis,
    R: CUES.Rinon, E: CUES.Estudio, M: CUES.Murio, Ra: CUES.Raro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4.5;
  const entra = kprog(T, K.G - 0.2, K.G + 0.35, kEase.sale);
  const toque = kprog(T, K.La + 0.9, K.La + 1.5, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el plato y las veces que lo comiste */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato T={T} x={klerp(-300, 330, entra)} y={900} s={1.15} vapor={kprog(T, K.G + 0.3, K.G + 1)} />
          <Veces T={T} x={110} y={560} at={K.G + 0.6} />
        </>)}
      </Escena>
      {/* 2–3 · el hongo en el bosque y sus láminas */}
      <Escena T={T} a={K.H} b={K.Hi} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Hojarasca y={1150} />
          {(() => { const z = kprog(T, K.La - 0.3, K.La + 0.5, kEase.suave);
            const zz = klerp(1, 1.45, z), cx = klerp(440, 470, z), cyy = klerp(930, 860, z);
            return <g transform={`translate(${cx} ${cyy}) scale(${zz}) translate(-440 -930)`}>
              <Paxilo T={T} x={440} y={1150} s={1.35} crece={kprog(T, K.H, K.H + 1.6)} manchas={kprog(T, K.La + 1.3, K.La + 2.6)} />
            </g>; })()}
          {T > K.La && <Dedo x={700} y={960} p={toque * (1 - kprog(T, K.La + 1.9, K.La + 2.4))} />}
          {/* flecha al borde enrollado */}
          {T > K.H + 2.4 && T < K.La && <path d="M 110 640 Q 80 760 100 850" stroke={KC.ink} strokeWidth={7} fill="none" strokeDasharray="14 10" opacity={kprog(T, K.H + 2.4, K.H + 2.8)} />}
        </>)}
      </Escena>
      {/* 4 · se comía en Europa central, bien cocido */}
      <Escena T={T} a={K.Hi} b={K.Cr} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <MapaEuropa x={150} y={560} s={1.1} punto={kprog(T, K.Hi + 0.6, K.Hi + 1.0)} />
          <Olla T={T} x={540} y={1120} s={1.05} />
        </>)}
      </Escena>
      {/* 5 · crudo irrita el estómago; lo grave es otra cosa */}
      <Escena T={T} a={K.Cr} b={K.S} zoom={0.06}>
        <FondoLunares color={KC.coral} />
        {fsvg(<>
          <Estomago T={T} x={380} y={880} s={1.2} irrita={kprog(T, K.Cr + 0.3, K.Cr + 1.2)} />
          <rect x={0} y={0} width={KW} height={KH} fill={KC.dark} opacity={0.7 * kprog(T, K.Cr + 1.9, K.Cr + 2.5)} />
          {T > K.Cr + 2.1 && <text x={360} y={1050} textAnchor="middle" style={{ font:`400 ${420 * kprog(T, K.Cr + 2.1, K.Cr + 2.5, kEase.rebote)}px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={10}>!</text>}
        </>)}
      </Escena>
      {/* 6 · por dentro de tu sangre: sensibilización (fondo oscuro) */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:PX.sangre }}></div>
        <Ambiente T={T} n={22} color="rgba(255,140,150,.25)" />
        {fsvg(<>
          {AG.slice(0, 7).map(([ax, ay, r], i) => <Antigeno key={i} x={ax + Math.sin(T * 0.8 + i) * 18} y={ay + Math.cos(T * 0.7 + i) * 14} rot={r + T * 20} s={1.4} />)}
          <Linfocito T={T} x={420} y={880} r={130} activo={kprog(T, K.S + 1.4, K.S + 2.0)} />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.S + 2.0 + i * 0.16; const u = kprog(T, t0, t0 + 1.6, kEase.sale); if (u <= 0) return null;
            const a = i * 0.55 - 0.4; return <Anticuerpo key={i} x={420 + Math.cos(a) * (140 + u * 300)} y={880 + Math.sin(a) * (140 + u * 260)} rot={a * 57 + 90 + T * 30} s={1.2} o={kprog(T, t0, t0 + 0.2)} />; })}
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y la siguiente vez? */}
      <Escena T={T} a={K.P} b={K.He} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Plato T={T} x={300} y={1100} s={0.95} /><Interrogacion T={T} x={300} y={920} tam={380} /></>)}
      </Escena>
      {/* 8 · hemólisis (fondo oscuro) */}
      <Escena T={T} a={K.He} b={K.R} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:PX.sangre }}></div>
        <Ambiente T={T} n={22} color="rgba(255,140,150,.25)" />
        {fsvg(<>
          {GL.map(([gx, gy], i) => { const pega = kprog(T, K.He + 1.6 + i * 0.12, K.He + 2.2 + i * 0.12); const rev = kprog(T, K.He + 3.0 + i * 0.14, K.He + 3.4 + i * 0.14);
            const dx = Math.sin(T * 0.6 + i) * 14; return <g key={i}>
              <Globulo x={gx + dx} y={gy} r={70} rev={rev} seed={i} />
              {pega > 0 && rev < 1 && <Grumo x={gx + dx + klerp(160, 58, pega)} y={gy + klerp(-140, -46, pega)} s={0.9} rot={i * 40} />}
            </g>; })}
          {/* los anticuerpos atrapan al hongo y forman grumos */}
          {T < K.He + 2.0 && AG.slice(0, 6).map(([ax, ay], i) => { const u = kprog(T, K.He + 0.3 + i * 0.1, K.He + 1.1 + i * 0.1, kEase.sale);
            return <g key={i} opacity={1 - kprog(T, K.He + 1.6, K.He + 2.0)}>{u < 1 ? <><Antigeno x={ax} y={ay} s={1.2} />{[0, 1, 2].map((j) => <Anticuerpo key={j} x={ax + Math.cos(j * 2.1) * klerp(140, 34, u)} y={ay + Math.sin(j * 2.1) * klerp(140, 34, u)} rot={j * 120 + 90} s={0.8} />)}</> : <Grumo x={ax} y={ay} s={0.9} />}</g>; })}
        </>)}
      </Escena>
      {/* 9 · riñones; cocerlo no lo evita */}
      <Escena T={T} a={K.R} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Rinon x={300} y={880} s={1.05} apaga={kprog(T, K.R + 0.6, K.R + 1.6)} />
          {Array.from({ length: 10 }, (_, i) => { const u = (T * 0.9 + i * 0.1) % 1; return <circle key={i} cx={540 - u * 300} cy={640 + i * 6 + u * 120} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.R, K.R + 0.4) * (1 - u)} />; })}
          <Olla T={T} x={760} y={1110} s={0.62} tache={kprog(T, K.R + 1.6, K.R + 2.0, kEase.rebote)} />
        </>)}
      </Escena>
      {/* 10–11 · el caso de 1944 (escena dibujada, siluetas esquemáticas) */}
      <Escena T={T} a={K.E} b={K.Ra} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Silueta x={300} y={1040} s={0.8} tipo={0} apagado={kprog(T, K.M + 1.6, K.M + 2.6)} />
          <Silueta x={760} y={1040} s={0.76} tipo={1} color="#4a3a5e" />
          <rect x={120} y={1030} width={840} height={40} rx={10} fill="#7a4a22" stroke={KC.ink} strokeWidth={7} />
          <Plato T={T} x={330} y={1010} s={0.42} vapor={0} />
          <Plato T={T} x={740} y={1010} s={0.42} vapor={0} />
          {T > K.M + 0.2 && <Sello T={T} at={K.M + 0.2} x={760} y={930} texto="✓" color="#118a3a" r={70} rot={0} />}
          {T > K.M + 1.4 && <Calendario x={300} y={580} s={kprog(T, K.M + 1.4, K.M + 1.8, kEase.rebote)} dia={Math.max(1, Math.round(klerp(1, 17, kprog(T, K.M + 1.6, K.M + 3.2, kEase.suave))))} />}
        </>)}
      </Escena>
      {/* 12 · raro, pero muy difícil de predecir */}
      <Escena T={T} a={K.Ra} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {(() => { const k = Math.min(RUTA.length - 1, Math.floor(kprog(T, K.Ra + 0.6, K.Ra + 2.6) * (RUTA.length - 1) + 0.0001)); const fin = T > K.Ra + 2.6;
            const sel = RUTA[k]; return <>
              {GENTE.map(([gx, gy], i) => <Persona key={i} x={gx} y={gy + 50} s={1.3} color={i === sel ? (fin ? KC.red : KC.ink) : '#3a3350'} />)}
              {T > K.Ra + 0.5 && <circle cx={GENTE[sel][0]} cy={GENTE[sel][1] + 20} r={62} fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth={6} />}
              {fin && <text x={GENTE[sel][0]} y={GENTE[sel][1] - 50} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={5}>?</text>}
            </>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo plato del inicio, ya "leído" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato T={T} x={330} y={900} s={1.15} />
          <Veces T={T} x={110} y={560} at={K.C - 2} alerta tachon={kprog(T, K.C + 0.8, K.C + 1.4, kEase.sale)} />
          <g transform="translate(300 900) rotate(-10)" opacity={kprog(T, K.C + 1.0, K.C + 1.2)}>
            <g transform={`scale(${klerp(2, 1, kprog(T, K.C + 1.0, K.C + 1.35, kEase.rebote))})`}>
              <rect x={-250} y={-60} width={500} height={120} rx={16} fill="rgba(255,255,255,.75)" stroke={KC.red} strokeWidth={12} />
              <text y={24} textAnchor="middle" style={{ font:`400 74px ${KF.titulo}` }} fill={KC.red}>NO TE PROTEGE</text>
            </g>
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.6} until={K.H - 0.3} texto="haberlo comido antes = el riesgo" x={540} y={1150} tam={38} borde={KC.red} />
      <Etq T={T} at={K.H + 1.2} until={K.La - 0.3} x={60} y={480} texto="paxilo enrollado" tam={42} color={KC.ink} />
      <Etq T={T} at={K.H + 1.6} until={K.La - 0.3} x={60} y={540} texto="Paxillus involutus" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 2.4} until={K.La - 0.3} x={60} y={610} texto="borde enrollado hacia dentro" tam={30} color={KC.ink} />
      <Chip T={T} at={K.La + 0.2} until={K.Hi - 0.3} texto="láminas que bajan por el pie" x={360} y={470} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.La + 1.6} until={K.Hi - 0.3} texto="se manchan de café al tocarlas" x={360} y={550} tam={30} borde={PX.mancha} />
      <Etq T={T} at={K.Hi + 0.9} until={K.Cr - 0.3} x={600} y={790} texto="Europa central" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Hi + 1.6} until={K.Cr - 0.3} texto="se comía bien cocido" x={540} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Cr + 0.5} until={K.Cr + 1.9} texto="crudo: irrita el estómago" x={380} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Cr + 2.3} until={K.S - 0.3} texto="lo grave es otra cosa" x={380} y={470} tam={36} borde={KC.red} />
      <Chip T={T} at={K.S + 0.1} until={K.P - 0.3} texto="POR DENTRO · TU SANGRE" x={540} y={430} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.S + 0.6} until={K.P - 0.3} x={60} y={520} texto="algo del hongo (antígeno)" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.S + 1.4} until={K.P - 0.3} x={60} y={1110} texto="linfocito B" tam={32} color={KC.lilac} />
      <Etq T={T} at={K.S + 2.4} until={K.P - 0.3} x={600} y={560} texto="anticuerpos (IgG)" tam={32} color={PX.anti} />
      <Chip T={T} at={K.He + 0.4} until={K.R - 0.3} texto="POR DENTRO · LA SIGUIENTE VEZ" x={540} y={430} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.He + 1.2} until={K.He + 3.0} x={60} y={510} texto="complejos inmunes (grumos)" tam={30} color={PX.anti} />
      <Etq T={T} at={K.He + 2.0} until={K.R - 0.3} x={60} y={1150} texto="glóbulo rojo" tam={30} color="#ff8a95" />
      <Chip T={T} at={K.He + 3.4} until={K.R - 0.3} texto="hemólisis" x={540} y={520} tam={46} borde={KC.red} />
      <Chip T={T} at={K.R + 0.9} until={K.E - 0.3} texto="riesgo de falla renal" x={420} y={470} tam={38} borde={KC.red} />
      <Chip T={T} at={K.R + 1.7} until={K.E - 0.3} texto="cocerlo no lo evita" x={720} y={800} tam={36} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.M - 0.2} anio="1944" quien="Julius Schäffer · micólogo alemán" revista="otoño de 1944" x={540} y={560} />
      <Etq T={T} at={K.E + 1.6} until={K.M - 0.2} x={300} y={1100} texto="él" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 1.9} until={K.M - 0.2} x={760} y={1100} texto="ella" tam={30} color={KC.ink} />
      <Chip T={T} at={K.M + 0.4} until={K.Ra - 0.3} texto="ella: sin síntomas" x={790} y={1140} tam={34} borde="#118a3a" />
      <Chip T={T} at={K.M + 2.4} until={K.Ra - 0.3} texto="él: murió 17 días después" x={300} y={1140} tam={28} borde={KC.red} />
      <Etq T={T} at={K.E + 0.5} until={K.Ra - 0.3} x={60} y={1480} texto="dibujo esquemático" tam={24} color={KC.ink} />
      <Etq T={T} at={K.M + 2.6} until={K.Ra - 0.3} x={60} y={1525} texto="su muerte se atribuyó a los paxilos" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Ra + 0.2} until={K.C - 0.3} texto="es raro" x={260} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ra + 1.4} until={K.C - 0.3} texto="muy difícil de predecir" x={330} y={570} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Ra + 0.6} until={K.C - 0.3} x={60} y={1480} texto="esquemático: no es una proporción" tam={24} color={KC.ink} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="ante la duda, no lo comas" x={540} y={1050} tam={38} borde={KC.red} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="¿te sientes mal? → urgencias" x={540} y={1132} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.C + 2.6} until={K.Ou} x={60} y={1500} texto="Este video no es guía de identificación." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={115} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.La} texto="2 cm" largo={140} />
      <BarraEscala T={T} at={K.La} until={K.Hi} texto="1 cm" largo={100} />
      <BarraEscala T={T} at={K.Hi} until={K.Cr} texto="mapa esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Cr} until={K.S} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.P} texto="10 µm" largo={260} />
      <BarraEscala T={T} at={K.P} until={K.He} texto="5 cm" largo={95} color={KC.ink} />
      <BarraEscala T={T} at={K.He} until={K.R} texto="5 µm" largo={93} />
      <BarraEscala T={T} at={K.R} until={K.E} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={115} color={KC.ink} y={1560} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="«Ya lo comí antes…» *No te protege.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.La - 0.1} texto="El paxilo: *borde enrollado.*" />
      <Subtitulo T={T} idx={2} at={K.La + 0.1} until={K.Hi - 0.1} texto="Al tocarlo, *se mancha de café.*" />
      <Subtitulo T={T} idx={3} at={K.Hi + 0.1} until={K.Cr - 0.1} texto="Se comía en *Europa central.*" />
      <Subtitulo T={T} idx={4} at={K.Cr + 0.1} until={K.S - 0.1} texto="Crudo irrita. *Lo grave es otra cosa.*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.P - 0.1} texto="Tu cuerpo hace *anticuerpos* contra él." />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.He - 0.1} texto="¿Y *la siguiente vez?*" />
      <Subtitulo T={T} idx={7} at={K.He + 0.1} until={K.R - 0.1} texto="Revientan tus *glóbulos rojos.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.E - 0.1} texto="Riñones en riesgo: *cocerlo no lo evita.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.M - 0.1} texto="1944: el micólogo *Julius Schäffer.*" />
      <Subtitulo T={T} idx={10} at={K.M + 0.1} until={K.Ra - 0.1} texto="Murió *17 días después.*" />
      <Subtitulo T={T} idx={11} at={K.Ra + 0.1} until={K.C - 0.1} texto="Raro, pero *difícil de predecir.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ante la duda, *no lo comas.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_04_bajando_lentes', 'gancho'],
        [K.H + 0.8, K.Hi - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cr + 0.3, K.S - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.0, K.He + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.2, K.E - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.M + 0.3, K.Ra - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ra + 0.3, K.C - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="112" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PaxillusApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PaxillusShot /></CompositionStage></div>;
}
window.PaxillusApp = PaxillusApp;
window.MiApp = PaxillusApp;
