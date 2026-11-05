// Shot Fungi Mati #141 · ¿Por qué NO comer cualquier hongo crudo? — NARRADO (gancho 6 «¿Por qué NO…?», formato N3 capítulos + N1 por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const CR = { plato:'#fbf7ee', plato2:'#e3dccb', lechuga:'#5fc94a', lechuga2:'#3c9a32', jitomate:'#e8432f', tabla:'#c98a4b', tabla2:'#a86c34',
  champ:'#f1e6d2', champ2:'#d9c6a4', lam:'#8a5a48', morCresta:'#d8b98a', morHoyo:'#6b4325', morPie:'#f3ead6', shii:'#7a4a2a', shii2:'#5a3218',
  arroz:'#fdfbf4', nori:'#1d2b22', salmon:'#ff8a6a', sarten:'#2b2d33', aceite:'#f2c14e', piel:'#f1bf96', piel2:'#d99a72', raya:'#d8352a' };

/* ---------- piezas del shot ---------- */
// Rebanada de champiñón crudo (corte vertical: sombrero, laminillas oscuras abajo, pie). tost 0..1 = dorada.
function Rebanada({ x, y, s = 1, rot = 0, tost = 0 }) {
  const c = mixHex(CR.champ, '#b9783a', tost), l = mixHex(CR.lam, '#4a2a18', tost);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -60 0 Q -62 -46 0 -50 Q 62 -46 60 0 Q 40 6 18 4 L 16 46 Q 0 52 -16 46 L -18 4 Q -40 6 -60 0 Z" fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -54 -2 Q -30 8 -18 4 M 54 -2 Q 30 8 18 4" stroke={l} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M -30 -34 Q 0 -42 30 -34" stroke="#fff" strokeWidth={5} fill="none" opacity={0.5 * (1 - tost)} strokeLinecap="round" />
  </g>;
}
// Plato de ensalada visto un poco desde arriba, con lechuga, jitomate y rebanadas de champiñón crudo.
function PlatoEnsalada({ T, x, y, s = 1, champ = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={300} ry={112} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={0} rx={300} ry={110} fill={CR.plato} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-6} rx={220} ry={76} fill={CR.plato2} opacity=".6" />
    {[[-140, -20, -20], [-60, -40, 10], [40, -36, -8], [130, -18, 22], [-90, 10, 30], [90, 14, -26]].map(([a, b, r], i) =>
      <path key={i} d="M -70 0 Q -40 -46 0 -40 Q 46 -40 70 0 Q 30 26 0 18 Q -40 28 -70 0 Z" transform={`translate(${a} ${b}) rotate(${r + Math.sin(T * 2 + i) * 2})`} fill={i % 2 ? CR.lechuga : CR.lechuga2} stroke={KC.ink} strokeWidth={5} />)}
    {[[-30, -10], [150, -30]].map(([a, b], i) => <g key={i}><circle cx={a} cy={b} r={30} fill={CR.jitomate} stroke={KC.ink} strokeWidth={5} /><circle cx={a - 8} cy={b - 8} r={7} fill="#fff" opacity=".5" /></g>)}
    {champ > 0 && [[-150, -40, -14], [-60, -6, 10], [60, -44, -6], [110, 6, 18], [-10, -60, 4]].map(([a, b, r], i) =>
      <g key={i} opacity={kprog(champ, i * 0.12, i * 0.12 + 0.3)}><Rebanada x={a} y={b} s={0.62} rot={r} /></g>)}
  </g>;
}
// Tabla de picar.
function Tabla({ x, y, w = 420, h = 150 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={CR.tabla} stroke={KC.ink} strokeWidth={8} />
    {[-0.25, 0, 0.25].map((k, i) => <path key={i} d={`M ${-w / 2 + 30} ${k * h} Q 0 ${k * h - 8} ${w / 2 - 30} ${k * h + 4}`} stroke={CR.tabla2} strokeWidth={5} fill="none" />)}
    <circle cx={w / 2 - 34} cy={0} r={14} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tenedor que cae.
function Tenedor({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-10} y={0} width={20} height={220} rx={10} fill="#cfd6de" stroke={KC.ink} strokeWidth={5} />
    <path d="M -34 0 L -34 -70 M -12 0 L -12 -76 M 12 0 L 12 -76 M 34 0 L 34 -70" stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <path d="M -34 0 L -34 -70 M -12 0 L -12 -76 M 12 0 L 12 -76 M 34 0 L 34 -70" stroke="#cfd6de" strokeWidth={7} strokeLinecap="round" />
    <path d="M -38 0 Q 0 30 38 0" stroke={KC.ink} strokeWidth={5} fill="#cfd6de" />
  </g>;
}
// Morilla (Morchella): sombrero cónico con celdillas como panal (crestas claras, hoyos oscuros), pegado al pie por la base.
// Base del pie en (x, y). corte 0..1 = se ve partida a la mitad: un solo hueco que va del sombrero al pie. tost 0..1 = dorada.
function Morilla({ x, y, s = 1, rot = 0, corte = 0, tost = 0, id = 'm' }) {
  const cres = mixHex(CR.morCresta, '#a8662a', tost), hoyo = mixHex(CR.morHoyo, '#3e2412', tost), pie = mixHex(CR.morPie, '#d9a35a', tost);
  const cap = 'M -86 -150 Q -100 -260 -48 -360 Q -10 -420 0 -424 Q 10 -420 48 -360 Q 100 -260 86 -150 Q 0 -136 -86 -150 Z';
  const celdas = [];
  for (let r = 0; r < 7; r++) for (let c = -3; c <= 3; c++) {
    const cy = -170 - r * 38, cx = c * 30 + (r % 2 ? 15 : 0) + Math.sin(r * 3 + c) * 4;
    celdas.push(<path key={`${r}_${c}`} d={`M ${cx - 11} ${cy + 14} Q ${cx - 14} ${cy - 2} ${cx - 8} ${cy - 15} Q ${cx} ${cy - 20} ${cx + 9} ${cy - 15} Q ${cx + 14} ${cy - 1} ${cx + 11} ${cy + 14} Q ${cx} ${cy + 18} ${cx - 11} ${cy + 14} Z`} fill={hoyo} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={`mc_${id}`}><path d={cap} /></clipPath></defs>
    <path d="M -70 -150 Q -84 -60 -64 0 Q 0 12 64 0 Q 84 -60 70 -150 Z" fill={pie} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-40, -10, 22, 46].map((dx, i) => <path key={i} d={`M ${dx} -140 Q ${dx + 6} -80 ${dx - 2} -12`} stroke="#d8ccb0" strokeWidth={4} fill="none" />)}
    <path d={cap} fill={cres} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g clipPath={`url(#mc_${id})`}>{celdas}</g>
    <path d={cap} fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {corte > 0 && <g opacity={corte}>
      {/* la mitad cortada: hueco único del sombrero al pie */}
      <path d="M -60 -170 Q -66 -260 -30 -340 Q 0 -390 30 -340 Q 66 -260 60 -170 L 46 -140 Q 52 -70 40 -20 Q 0 -10 -40 -20 Q -52 -70 -46 -140 Z" fill="#fff6e4" stroke={KC.ink} strokeWidth={5} />
      <path d="M -40 -180 Q -44 -250 -18 -310 Q 0 -340 18 -310 Q 44 -250 40 -180 L 28 -150 Q 32 -80 22 -36 Q 0 -30 -22 -36 Q -32 -80 -28 -150 Z" fill="#3a2414" opacity=".85" />
    </g>}
  </g>;
}
// Shiitake (Lentinula edodes) de perfil: sombrero café con escamitas claras en la orilla, láminas blancas, pie fibroso.
function Shiitake({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -26 0 Q -30 -70 -20 -120 L 20 -120 Q 30 -70 26 0 Q 0 8 -26 0 Z" fill="#efe4cf" stroke={KC.ink} strokeWidth={6} />
    {[-10, 4, 14].map((d, i) => <path key={i} d={`M ${d} -110 Q ${d + 4} -60 ${d - 2} -6`} stroke="#c9b48e" strokeWidth={3} fill="none" />)}
    <path d="M -150 -118 Q 0 -96 150 -118 L 140 -126 Q 0 -110 -140 -126 Z" fill="#f6efe0" stroke={KC.ink} strokeWidth={5} />
    <path d="M -156 -120 Q -150 -240 0 -246 Q 150 -240 156 -120 Q 0 -136 -156 -120 Z" fill={CR.shii} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -100 -200 Q -20 -236 80 -214" stroke={CR.shii2} strokeWidth={12} fill="none" opacity=".6" strokeLinecap="round" />
    {[[-130, -140], [-100, -172], [-60, -196], [70, -198], [110, -170], [136, -142], [-20, -218], [30, -222]].map(([a, b], i) =>
      <path key={i} d={`M ${a - 9} ${b} l 9 -7 l 9 7 z`} fill="#f2e6cf" stroke="#3a2010" strokeWidth={2} />)}
  </g>;
}
// Antebrazo con rayas rojas esquemáticas (dermatitis flagelada).
function BrazoRayas({ x, y, s = 1, p = 1 }) {
  const rayas = [[-150, -20, 40, 60], [-90, -40, 90, 30], [-30, -30, 160, 50], [40, -44, 230, 20], [100, -26, 300, 46]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -60 Q 0 -90 340 -50 Q 380 0 340 50 Q 0 80 -260 60 Z" fill={CR.piel} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -220 30 Q 40 50 320 26" stroke={CR.piel2} strokeWidth={6} fill="none" opacity=".6" />
    {rayas.map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${b - 14} ${c} ${d}`} stroke={CR.raya} strokeWidth={10} fill="none" strokeLinecap="round"
      strokeDasharray="400" strokeDashoffset={400 * (1 - kclamp(p * 1.6 - i * 0.15, 0, 1))} opacity=".85" />)}
  </g>;
}
// Molécula de agaritina, esquemática: anillo de benceno, CH2OH de un lado, hidrazina (N–N) y cola de glutamato del otro.
function Agaritina({ x, y, s = 1, p = 1, color = KC.yellow, rot = 0 }) {
  const hexa = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(46 * Math.cos(a)).toFixed(1)} ${(46 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const o = (k) => kclamp(p * 4 - k, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={hexa} fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" opacity={o(0)} />
    <circle r={22} fill="none" stroke={color} strokeWidth={5} opacity={o(0) * 0.7} />
    <g opacity={o(1)}><line x1={-46} y1={0} x2={-96} y2={0} stroke={color} strokeWidth={8} /><text x={-110} y={12} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={color}>CH₂OH</text></g>
    <g opacity={o(2)}><line x1={46} y1={0} x2={90} y2={0} stroke={color} strokeWidth={8} />
      <circle cx={106} cy={0} r={18} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><text x={106} y={9} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>N</text>
      <line x1={124} y1={0} x2={150} y2={0} stroke={color} strokeWidth={8} />
      <circle cx={166} cy={0} r={18} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} /><text x={166} y={9} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>N</text></g>
    <g opacity={o(3)}><path d="M 184 0 L 220 -24 L 256 0 L 292 -24 L 328 0" stroke={color} strokeWidth={8} fill="none" strokeLinejoin="round" />
      <circle cx={220} cy={-24} r={9} fill={KC.red} /><circle cx={328} cy={0} r={9} fill={KC.red} /><circle cx={292} cy={-24} r={9} fill={KC.cyan} /></g>
  </g>;
}
// Basidio de Agaricus bisporus: célula en forma de mazo con 2 esterigmas y 2 esporas (cafés, elípticas). esp 0..1 = crecen.
function Basidio({ x, y, s = 1, esp = 1, brillo = 0 }) {
  const e = kEase.rebote(kclamp(esp, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${10 * brillo}px ${KC.gold2})` } : null}>
    <path d="M -16 0 Q -20 -60 -30 -100 Q -34 -140 0 -144 Q 34 -140 30 -100 Q 20 -60 16 0 Z" fill="#eafff7" stroke="#9fe8d0" strokeWidth={4} />
    <path d="M -14 -140 Q -22 -160 -26 -172 M 14 -140 Q 22 -160 26 -172" stroke="#9fe8d0" strokeWidth={5} fill="none" strokeLinecap="round" />
    {e > 0 && [-1, 1].map((d) => <ellipse key={d} cx={d * 30} cy={-196} rx={14 * e} ry={22 * e} transform={`rotate(${d * 14} ${d * 30} -196)`} fill="#7a4a2a" stroke="#f4c25a" strokeWidth={3} />)}
  </g>;
}
// Sartén vista desde arriba (un poco inclinada) con rebanadas que se doran. tost 0..1.
function Sarten({ T, x, y, s = 1, tost = 0, chispa = 0, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={250} y={-26} width={330} height={52} rx={26} fill="#3b3e46" stroke={KC.ink} strokeWidth={8} transform="rotate(-8)" />
    <ellipse cx={0} cy={0} rx={300} ry={190} fill={CR.sarten} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={0} rx={262} ry={160} fill="#3a3c43" />
    <ellipse cx={0} cy={6} rx={240} ry={140} fill={CR.aceite} opacity={0.35 + 0.1 * Math.sin(T * 9)} />
    {children}
    {chispa > 0 && Array.from({ length: 14 }, (_, i) => { const a = i * 2.4 + T * 3, r = 60 + ((i * 53 + T * 140) % 170);
      return <circle key={i} cx={Math.cos(a) * r * 1.3} cy={Math.sin(a) * r * 0.75} r={4 + (i % 3) * 2} fill="#fff8d0" opacity={chispa * (0.4 + 0.6 * ((Math.sin(T * 17 + i * 1.7) + 1) / 2))} />; })}
  </g>;
}
// Mapa esquemático de EE. UU. (48 estados) con Montana marcado.
function MapaEEUU({ x, y, s = 1, mt = 1 }) {
  const contorno = 'M 30 60 L 120 40 L 330 50 L 470 60 L 560 70 L 610 40 L 660 90 L 720 70 L 760 110 L 740 160 L 700 200 L 690 260 L 640 300 L 610 360 L 580 340 L 520 330 L 470 380 L 420 340 L 330 330 L 250 300 L 180 290 L 120 250 L 60 200 L 30 140 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={contorno} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 130 44 L 300 48 L 300 140 L 160 140 Q 150 100 130 44 Z" fill={mixHex('#ffe9a8', KC.red, mt)} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={215} cy={118} r={14 * mt} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Mapa esquemático de Francia (el «hexágono»).
function MapaFrancia({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 150 0 L 250 40 L 330 60 L 320 150 L 300 220 L 330 300 L 260 340 L 180 330 L 90 350 L 60 280 L 80 200 L 0 140 L 40 90 L 110 80 Z" fill="#cfe0ff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 360 300 Q 372 330 362 360 Q 350 340 360 300 Z" fill="#cfe0ff" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Rollo de sushi (corte) con un pedazo de morilla encima.
function Sushi({ x, y, s = 1, morilla = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={60} rx={120} ry={24} fill="rgba(0,0,0,.2)" />
    <circle cx={0} cy={0} r={110} fill={CR.nori} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={0} r={94} fill={CR.arroz} />
    {Array.from({ length: 22 }, (_, i) => { const a = i * 0.9, r = 30 + (i * 37) % 56; return <ellipse key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} rx={9} ry={5} transform={`rotate(${i * 40} ${Math.cos(a) * r} ${Math.sin(a) * r})`} fill="#ece6d6" />; })}
    <path d="M -36 -20 Q 0 -44 36 -20 Q 40 20 0 30 Q -40 20 -36 -20 Z" fill={CR.salmon} stroke={KC.ink} strokeWidth={4} />
    {morilla > 0 && <g opacity={morilla} transform="translate(0 -96) scale(.36)"><Morilla x={0} y={0} id="sushi" /></g>}
  </g>;
}
// Personita esquemática. estado: 0 normal · 1 enferma (verde) · 2 hospital (cruz) · 3 murió (gris).
function Persona({ x, y, s = 1, estado = 0 }) {
  const col = estado === 3 ? '#8b8f96' : estado ? '#8fd16a' : '#ffffff';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-46} r={16} fill={col} stroke={KC.ink} strokeWidth={4} />
    <path d="M -22 0 Q -22 -28 0 -28 Q 22 -28 22 0 Z" fill={col} stroke={KC.ink} strokeWidth={4} />
    {estado === 2 && <g transform="translate(18 -60)"><circle r={13} fill="#fff" stroke={KC.ink} strokeWidth={3} /><path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke={KC.red} strokeWidth={5} /></g>}
  </g>;
}
// Caja de cultivo («importadas») y tubo de laboratorio con lupa.
function Caja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -100 L 170 -100 L 150 100 L -150 100 Z" fill="#d9a86a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-60, 0, 60].map((d, i) => <line key={i} x1={-160} y1={d * 0.7} x2={160} y2={d * 0.7} stroke="#a8743c" strokeWidth={5} />)}
    {[-100, -30, 40, 110].map((d, i) => <g key={i} transform={`translate(${d} -96) scale(.3)`}><Morilla x={0} y={0} id={`caja${i}`} rot={(i - 1.5) * 8} /></g>)}
  </g>;
}
function Tubo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -34 -200 L -34 60 Q -34 100 0 100 Q 34 100 34 60 L 34 -200" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 -10 L -30 60 Q -30 96 0 96 Q 30 96 30 60 L 30 -10 Z" fill="#c9a0ff" opacity=".8" />
    <rect x={-46} y={-220} width={92} height={28} rx={8} fill="#e8eef5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Lupa2({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={90} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={12} />
    <line x1={64} y1={64} x2={150} y2={150} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
    <text y={30} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.red}>?</text>
  </g>;
}
// Cajones de la escala actual de la IARC (1, 2A, 2B, 3). luz = índice que se ilumina.
const IARC = [['1', 'cancerígeno'], ['2A', 'probablemente'], ['2B', 'posiblemente'], ['3', 'no clasificable']];
function Cajones({ T, x, y, p = 1, luz = -1, brilla = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {IARC.map(([n, t], i) => { const on = kEase.rebote(kclamp(p * 3 - i * 0.4, 0, 1)), es = i === luz;
      return <g key={i} transform={`translate(${i * 236} 0) scale(${on})`}>
        <rect x={-100} y={-90} width={200} height={180} rx={20} fill={es ? mixHex(KC.paper, KC.gold2, brilla) : KC.paper} stroke={KC.ink} strokeWidth={es ? 10 : 7} />
        <text x={0} y={22} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill={KC.ink}>{n}</text>
        <text x={0} y={136} textAnchor="middle" style={{ font:`700 25px ${KF.mono}` }} fill={KC.ink}>{t}</text>
      </g>; })}
  </g>;
}

// 51 personas: 9 columnas × 6 filas (la última con 6). Los 3 del hospital y los 2 que murieron, posiciones ilustrativas.
const P51 = Array.from({ length: 51 }, (_, i) => [150 + (i % 9) * 98, 720 + Math.floor(i / 9) * 80]);
const HOSP = [12, 30, 44], MUR = [21, 38];

function CrudosShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.Depende, A: CUES.Agaritina, G3: CUES.Grupo3, S: CUES.Sarten, P: CUES.Pregunta, Mo: CUES.Montana, E: CUES.Enfermos,
    Cr: CUES.Crudas, Cu: CUES.Cultivo, F: CUES.Francia, Sh: CUES.Shiitake, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caeTen = kprog(T, K.G, K.G + 0.55, kEase.sale);
  const fry = kprog(T, K.S + 0.6, K.S + 5.2);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el champiñón crudo de la ensalada ≠ la morilla cruda */}
      <Escena T={T} a={K.G} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoEnsalada T={T} x={330} y={900} s={0.92} champ={kprog(T, K.G + 0.1, K.G + 1.2)} />
          <Tenedor x={klerp(560, 470, caeTen)} y={klerp(320, 800, caeTen)} rot={klerp(-60, 30, caeTen) + (caeTen >= 1 ? Math.sin((T - K.G - 0.55) * 30) * 6 * Math.exp(-(T - K.G - 0.55) * 6) : 0)} s={0.8} />
          <g opacity={kprog(T, K.G + 1.6, K.G + 2.2)}>
            <Tabla x={800} y={1050} w={380} h={120} />
            <g transform={`translate(800 ${1040 - 40 * (1 - kprog(T, K.G + 1.6, K.G + 2.3, kEase.rebote))})`}><Morilla x={0} y={0} s={0.85} rot={Math.sin(T * 2) * 3} id="g" /></g>
          </g>
          <text x={655} y={940} textAnchor="middle" style={{ font:`400 ${150 * kEase.rebote(kprog(T, K.G + 3.2, K.G + 3.6))}px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={8}>≠</text>
        </>)}
      </Escena>
      {/* 2 · depende de lo que trae cada uno: el champiñón entero */}
      <Escena T={T} a={K.D} b={K.A} zoom={0.12} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<Champinon x={400} y={1150} s={1.8} crece={1} abre={kprog(T, K.D, K.D + 1.4, kEase.sale) * 0.7 + 0.3} rot={Math.sin(T * 1.5) * 2} />)}
      </Escena>
      {/* 3 · al microscopio: laminilla, basidios con 2 esporas, agaritina */}
      <Escena T={T} a={K.A} b={K.G3} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <path d="M -20 1184 Q 300 1160 540 1176 Q 800 1194 1100 1170 L 1100 1400 L -20 1400 Z" fill="#1d3a33" stroke="#9fe8d0" strokeWidth={4} />
          {[110, 260, 410, 560, 710, 860].map((bx, i) => <Basidio key={i} x={bx} y={1180} s={1.3} esp={kprog(T, K.A + 0.3 + i * 0.18, K.A + 0.9 + i * 0.18)} brillo={i === 2 ? 1 : 0} />)}
          <Agaritina x={300} y={680} s={1.05} p={kprog(T, K.A + 1.5, K.A + 2.8)} rot={Math.sin(T) * 3} />
        </>)}
      </Escena>
      {/* 4 · grupo 3 de la IARC: la agaritina, no el hongo */}
      <Escena T={T} a={K.G3} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Cajones T={T} x={186} y={900} p={kprog(T, K.G3 + 1.4, K.G3 + 2.2)} luz={3} brilla={kprog(T, K.G3 + 3.1, K.G3 + 3.4)} />
          {(() => { const u = kprog(T, K.G3 + 2.4, K.G3 + 3.1, kEase.entra || ((v) => v * v)); return <Agaritina x={klerp(360, 850, u)} y={klerp(680, 780, u)} s={klerp(0.7, 0.3, u)} p={1} color={KC.ink} />; })()}
        </>)}
      </Escena>
      {/* 5 · cocinar la baja: otro champiñón de cultivo (A. hortensis) frito 5 min en aceite */}
      <Escena T={T} a={K.S} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Sarten T={T} x={460} y={830} s={1.05} chispa={kprog(T, K.S + 0.5, K.S + 1)}>
          {[[-150, -40, -14], [-60, 30, 10], [40, -60, -6], [130, 20, 18], [-10, -10, 4], [80, 90, -20], [-120, 80, 26]].map(([a, b, r], i) =>
            <Rebanada key={i} x={a} y={b + Math.sin(T * 8 + i) * 3} s={0.78} rot={r} tost={fry} />)}
        </Sarten>)}
      </Escena>
      {/* 6 · re-gancho: ¿y la morilla? */}
      <Escena T={T} a={K.P} b={K.Mo} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Morilla x={300} y={1180} s={1.45} rot={Math.sin(T * 3) * 4} corte={kprog(T, K.P + 0.9, K.P + 1.5)} id="p" />
        </>)}
      </Escena>
      {/* 7–9 · Montana 2023: sushi con morillas crudas o apenas cocidas; 51 enfermos */}
      <Escena T={T} a={K.Mo} b={K.Cu}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {T < K.E + 0.3 && <g opacity={1 - kprog(T, K.E - 0.2, K.E + 0.3)}>
            <MapaEEUU x={160} y={640} s={0.98} mt={kprog(T, K.Mo + 0.4, K.Mo + 1.2)} />
            <Sushi x={200} y={1100} s={0.75 * kEase.rebote(kprog(T, K.Mo + 1.6, K.Mo + 2.2))} morilla={1} />
            <Sushi x={480} y={1100} s={0.75 * kEase.rebote(kprog(T, K.Mo + 2.2, K.Mo + 2.8))} morilla={1} rot={8} />
          </g>}
          {T > K.E - 0.3 && T < K.Cr + 0.3 && <g opacity={kprog(T, K.E - 0.3, K.E + 0.1) * (1 - kprog(T, K.Cr - 0.2, K.Cr + 0.3))}>
            {P51.map(([px, py], i) => { const on = kprog(T, K.E + 0.2 + i * 0.03, K.E + 0.4 + i * 0.03, kEase.rebote); if (on <= 0) return null;
              const est = MUR.includes(i) && T > K.E + 3.4 ? 3 : HOSP.includes(i) && T > K.E + 2.6 ? 2 : 1;
              return <Persona key={i} x={px} y={py} s={on} estado={est} />; })}
          </g>}
          {T > K.Cr - 0.3 && <g opacity={kprog(T, K.Cr - 0.3, K.Cr + 0.2)}>
            <Sushi x={300} y={980} s={1.25} morilla={1} />
            <g opacity=".45"><Sushi x={780} y={1030} s={0.8} morilla={1} rot={10} /></g>
            <circle cx={300} cy={930} r={klerp(260, 200, kprog(T, K.Cr + 0.2, K.Cr + 0.7, kEase.rebote))} fill="none" stroke={KC.red} strokeWidth={12} strokeDasharray="30 16" opacity={kprog(T, K.Cr + 0.2, K.Cr + 0.5)} />
          </g>}
        </>)}
      </Escena>
      {/* 10 · de cultivo; toxina no identificada */}
      <Escena T={T} a={K.Cu} b={K.F} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Caja x={300} y={1080} s={1.05} />
          <Tubo x={760} y={1060} s={1.1} />
          <g transform={`translate(${klerp(1150, 720, kprog(T, K.Cu + 1.2, K.Cu + 2.0, kEase.sale))} 900)`}><Lupa2 x={0} y={0} s={0.9} /></g>
        </>)}
      </Escena>
      {/* 11 · Francia 2010–2020: 446 casos reportados */}
      <Escena T={T} a={K.F} b={K.Sh}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaFrancia x={540} y={760} s={1.25} />
          {Array.from({ length: 40 }, (_, i) => { const on = kprog(T, K.F + 2.6 + i * 0.05, K.F + 2.8 + i * 0.05); const g = krng(i + 7);
            return on > 0 ? <circle key={i} cx={640 + g() * 260} cy={850 + g() * 300} r={9 * on} fill={KC.red} stroke={KC.ink} strokeWidth={2} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · el shiitake (ya lo vimos) */}
      <Escena T={T} a={K.Sh} b={K.C} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Shiitake x={300} y={980} s={1.25} rot={Math.sin(T * 2) * 3} />
          <BrazoRayas x={520} y={1130} s={1.0} p={kprog(T, K.Sh + 1.6, K.Sh + 3.4)} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma mesa del inicio; la morilla ya en la sartén, dorada */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <PlatoEnsalada T={T} x={330} y={900} s={0.92} champ={1} />
          <Tenedor x={470} y={800} rot={30} s={0.8} />
          <Tabla x={800} y={1050} w={380} h={120} />
          <g opacity={1 - kprog(T, K.C + 0.4, K.C + 1.0)}><Morilla x={800} y={1040} s={0.85} id="c0" /></g>
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.2)}>
            <Sarten T={T} x={790} y={1000} s={0.55} chispa={1}><g transform="rotate(-80) translate(130 0)"><Morilla x={0} y={0} s={0.55} rot={0} tost={kprog(T, K.C + 1.0, K.C + 3.0)} id="c1" /></g></Sarten>
          </g>
          <Sello T={T} at={K.C + 1.8} x={820} y={760} texto="COCIDOS" color="#118a3a" r={110} rot={-10} />
        </>)}
      </Escena>

      {/* capítulos bajo el logo */}
      <Capitulo T={T} hasta={K.C} caps={[{ at: K.D, titulo: 'CHAMPIÑÓN' }, { at: K.P, titulo: 'MORILLA' }, { at: K.Sh, titulo: 'SHIITAKE' }]} />

      {/* textos */}
      <Etq T={T} at={K.G + 0.9} until={K.D - 0.3} x={60} y={1150} texto="champiñón crudo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 2.2} until={K.D - 0.3} x={620} y={1150} texto="morilla cruda" tam={34} color={KC.ink} />
      <Etq T={T} at={K.D + 0.4} until={K.A - 0.2} x={560} y={1010} texto="champiñón" tam={40} color={KC.ink} />
      <Etq T={T} at={K.D + 0.8} until={K.A - 0.2} x={560} y={1070} texto="Agaricus bisporus" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.A + 0.1} until={K.G3 - 0.3} texto="AL MICROSCOPIO · LAMINILLA" x={330} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.A + 0.9} until={K.G3 - 0.3} x={60} y={865} texto="bisporus: 2 esporas por basidio" it tam={30} color={KC.gold2} />
      <Etq T={T} at={K.A + 1.8} until={K.G3 - 0.3} x={60} y={560} texto="agaritina (molécula agrandada)" tam={30} color={KC.yellow} />
      <Chip T={T} at={K.A + 2.6} until={K.G3 - 0.3} texto="todavía se estudia" x={300} y={790} tam={36} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.G3 + 0.15} until={K.G3 + 2.3} anio="IARC" quien="agencia de la OMS contra el cáncer" revista="evaluación de 1987" x={420} y={600} />
      <Chip T={T} at={K.G3 + 3.2} until={K.S - 0.3} texto="grupo 3 · no clasificable como cancerígeno en humanos" x={540} y={1150} tam={27} borde={KC.gold} />
      <Chip T={T} at={K.G3 + 3.8} until={K.S - 0.3} texto="la agaritina, no el hongo" x={330} y={700} tam={38} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 2.9} anio="2002" quien="Praga, Chequia" revista="Schulzová et al., Food Addit. Contam." x={540} y={470} />
      <Etq T={T} at={K.S + 1.4} until={K.P - 0.3} x={60} y={1110} texto="otro champiñón de cultivo: Agaricus hortensis" it tam={31} color={KC.ink} />
      <Cronometro T={T} at={K.S + 3.0} until={K.S + 5.6} factor={300 / 3.2} x={300} y={500} etiqueta="FRITO EN ACEITE" />
      <Medidor T={T} at={K.S + 3.0} until={K.P - 0.3} x={60} y={590} ancho={600} etiqueta="agaritina que queda" valor={(t) => klerp(1, 0.343, kprog(t, K.S + 3.1, K.S + 5.6, kEase.suave))} texto={(v) => Math.round(v * 100) + ' %'} color={KC.yellow} />
      <Etq T={T} at={K.P + 0.3} until={K.Mo - 0.2} x={60} y={470} texto="morilla" tam={44} color={KC.ink} />
      <Etq T={T} at={K.P + 0.6} until={K.Mo - 0.2} x={60} y={530} texto="Morchella" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.P + 1.2} until={K.Mo - 0.2} x={60} y={1260} texto="hueca por dentro" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Mo + 0.2} until={K.E - 0.3} anio="2023" quien="Bozeman, Montana (EE. UU.)" revista="CDC · MMWR, 2024" x={540} y={490} />
      <Chip T={T} at={K.Mo + 2.0} until={K.E - 0.3} texto="crudas" x={830} y={1010} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Mo + 2.6} until={K.E - 0.3} texto="apenas cocidas" x={830} y={1100} tam={36} borde={KC.orange} />
      <NumeroGigante T={T} at={K.E + 0.2} until={K.Cr - 0.3} valor={51} dur={1.6} etiqueta="enfermos del estómago" x={360} y={510} tam={160} color={KC.yellow} />
      <Chip T={T} at={K.E + 2.6} until={K.Cr - 0.3} texto="3 al hospital" x={540} y={1430} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.E + 3.4} until={K.Cr - 0.3} texto="2 murieron · tenían enfermedades previas" x={540} y={1520} tam={28} borde="#8b8f96" />
      <Chip T={T} at={K.Cr + 0.3} until={K.Cu - 0.3} texto="crudas: lo más ligado a enfermarse" x={540} y={560} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Cr + 0.6} until={K.Cu - 0.3} x={620} y={1160} texto="cocidas o a medias" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Cu + 0.2} until={K.F - 0.3} texto="morillas de cultivo · importadas" x={330} y={760} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Cu + 2.0} until={K.F - 0.3} texto="toxina: no identificada" x={540} y={1340} tam={36} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.F + 0.2} until={K.F + 2.6} anio="2010–2020" quien="centros antitóxicos de Francia" revista="Vodovar et al., Clin. Toxicol., 2024" x={540} y={520} />
      <NumeroGigante T={T} at={K.F + 2.6} until={K.Sh - 0.3} valor={446} dur={1.8} etiqueta="casos reportados" x={330} y={520} tam={170} color={KC.red} />
      <Chip T={T} at={K.F + 3.2} until={K.Sh - 0.3} texto="solo morillas" x={330} y={700} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Sh + 0.4} until={K.C - 0.3} x={560} y={760} texto="shiitake" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Sh + 0.8} until={K.C - 0.3} x={560} y={820} texto="Lentinula edodes" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.Sh + 1.2} until={K.C - 0.3} texto="ya lo vimos: Fungi Mati 26" x={760} y={470} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.Sh + 2.2} until={K.C - 0.3} x={560} y={1250} texto="crudo o mal cocido" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="silvestres: siempre cocidos" x={330} y={470} tam={36} borde="#118a3a" />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="y bien identificados" x={330} y={560} tam={36} borde="#118a3a" />
      <Etq T={T} at={K.C + 2.4} until={K.Ou} x={60} y={1520} texto="No es consejo médico." tam={24} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.D} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.D} until={K.A} texto="2 cm" largo={130} />
      <BarraEscala T={T} at={K.A} until={K.G3} texto="10 µm" largo={140} y={1460} />
      <BarraEscala T={T} at={K.S} until={K.P} texto="5 cm" largo={110} y={1500} />
      <BarraEscala T={T} at={K.P} until={K.Mo} texto="5 cm" largo={160} y={1480} />
      <BarraEscala T={T} at={K.Mo} until={K.E} texto="mapa esquemático" largo={0} y={1500} />
      <BarraEscala T={T} at={K.Cr} until={K.Cu} texto="2 cm" largo={110} y={1480} />
      <BarraEscala T={T} at={K.F} until={K.Sh} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Sh} until={K.C} texto="5 cm" largo={90} y={1480} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={120} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="¿Por qué NO comer *cualquier hongo crudo?*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.A - 0.1} texto="Depende de *lo que trae.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.G3 - 0.1} texto="El champiñón trae *agaritina.*" />
      <Subtitulo T={T} idx={3} at={K.G3 + 0.1} until={K.S - 0.1} texto="Grupo 3: *no clasificable* en humanos." />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="Frito 5 minutos: *dos tercios menos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Mo - 0.1} texto="¿Y la *morilla?*" />
      <Subtitulo T={T} idx={6} at={K.Mo + 0.1} until={K.E - 0.1} texto="Montana, 2023: *crudas o apenas cocidas.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Cr - 0.1} texto="*51 enfermos;* 3 al hospital, 2 murieron." />
      <Subtitulo T={T} idx={8} at={K.Cr + 0.1} until={K.Cu - 0.1} texto="Crudas: *lo más ligado.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.F - 0.1} texto="De cultivo; *la toxina, sin hallar.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.Sh - 0.1} texto="Francia, 2010–2020: *446 casos.*" />
      <Subtitulo T={T} idx={11} at={K.Sh + 0.1} until={K.C - 0.1} texto="Shiitake crudo: *rayas en la piel.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Silvestres: *cocidos y bien identificados.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.A + 0.5, K.G3 - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.G3 + 2.4, K.S - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.S + 3.0, K.P - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.Mo + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.4, K.Cr - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Cu + 0.4, K.F - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.F + 2.6, K.Sh - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="141" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

const CrudosApp = kApp(CrudosShot);
window.CrudosApp = CrudosApp;
window.MiApp = CrudosApp;
