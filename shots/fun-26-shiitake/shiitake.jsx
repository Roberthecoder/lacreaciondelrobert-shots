// Shot Fungi Mati #26 · ¿Por qué NO comer shiitake crudo? — NARRADO (gancho 6 "¿Por qué NO…?" + N1 "Por dentro").
// Viaje: plato de shiitake (macro) → pared de la hifa y corte de piel (micro, fondo noche) → el mismo plato, ya bien cocido.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const SH = { cafe:'#8a5530', cafe2:'#6e3f1f', cocido:'#5a3216', crema:'#f3e6cc', fleco:'#f6ead2', lamina:'#fbf4e4', pie:'#efe1c4', dorado:'#c98a3c', piel:'#efb48e', piel2:'#d9916c', raya:'#e8344a' };

// Shiitake (Lentinula edodes) de perfil: sombrero convexo café con escamitas claras hacia la orilla, orilla enrollada,
// láminas blancas, pie fibroso y algo curvo, sin anillo. cocido 0..1 = se dora y brilla.
function Shiitake({ x, y, s = 1, rot = 0, crece = 1, cocido = 0 }) {
  if (crece <= 0) return null;
  const h = 150 * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = 260 * (0.5 + 0.5 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  const som = mixHex(SH.cafe, SH.cocido, cocido), pie = mixHex(SH.pie, SH.dorado, cocido * 0.7), lam = mixHex(SH.lamina, '#e2b878', cocido);
  const flecos = [[-0.38, 0.12], [-0.3, 0.2], [-0.18, 0.1], [0.36, 0.13], [0.28, 0.21], [0.16, 0.08], [-0.42, 0.05], [0.42, 0.06], [0.0, 0.07]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -20 0 Q -26 ${-h * 0.5} -10 ${-h} L 16 ${-h} Q 2 ${-h * 0.5} 18 0 Z`} fill={pie} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -8 -14 Q -12 ${-h * 0.5} -2 ${-h + 8} M 6 -12 Q 0 ${-h * 0.5} 8 ${-h + 8}`} stroke="rgba(120,80,40,.45)" strokeWidth={3} fill="none" />
    <path d={`M ${-a / 2 + 10} ${-h + 4} Q 0 ${-h + a * 0.16} ${a / 2 - 10} ${-h + 4} Z`} fill={lam} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const u = (i + 1) / 10 - 0.5; return <line key={i} x1={u * a * 0.9} y1={-h + 6} x2={u * a * 0.25} y2={-h + a * 0.1} stroke="rgba(150,120,80,.5)" strokeWidth={2.5} />; })}
    <path d={`M ${-a / 2} ${-h} Q ${-a / 2 - 6} ${-h - a * 0.36} 0 ${-h - a * 0.4} Q ${a / 2 + 6} ${-h - a * 0.36} ${a / 2} ${-h} Q ${a / 2 - 14} ${-h + 10} ${a / 2 - 26} ${-h + 6} L ${-a / 2 + 26} ${-h + 6} Q ${-a / 2 + 14} ${-h + 10} ${-a / 2} ${-h} Z`} fill={som} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-a * 0.28} ${-h - a * 0.3} Q 0 ${-h - a * 0.38} ${a * 0.22} ${-h - a * 0.32}`} stroke={cocido > 0.3 ? 'rgba(255,230,180,.7)' : 'rgba(255,255,255,.22)'} strokeWidth={10} fill="none" strokeLinecap="round" />
    {flecos.map(([u, v], i) => <ellipse key={i} cx={u * a} cy={-h - v * a - 4} rx={a * 0.03 + 2} ry={a * 0.014 + 1.5} fill={SH.fleco} opacity={1 - cocido * 0.6} transform={`rotate(${u * 40} ${u * a} ${-h - v * a - 4})`} />)}
  </g>;
}
// Rebanada de shiitake (corte en "T"): banda café del sombrero y carne blanca. cocido 0..1 → dorada.
function Rebanada({ x, y, s = 1, rot = 0, cocido = 0 }) {
  const carne = mixHex('#f7eedc', SH.dorado, cocido), borde = mixHex(SH.cafe, SH.cocido, cocido);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -70 -10 Q -70 -46 0 -50 Q 70 -46 70 -10 Q 40 2 14 0 L 12 46 Q 0 52 -12 46 L -14 0 Q -40 2 -70 -10 Z" fill={carne} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -66 -16 Q -64 -44 0 -47 Q 64 -44 66 -16" stroke={borde} strokeWidth={11} fill="none" strokeLinecap="round" />
    {cocido > 0.4 && <path d="M -40 -20 Q 0 -30 40 -20" stroke="rgba(255,240,200,.7)" strokeWidth={5} fill="none" strokeLinecap="round" />}
  </g>;
}
// Plato visto un poco desde arriba, con hongos (crudos o cocidos) y vapor si están calientes.
function Plato({ T, x, y, s = 1, cocido = 0, vapor = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={380} ry={120} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={0} rx={370} ry={112} fill="#ffffff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={4} rx={270} ry={74} fill="#eef0f2" stroke="rgba(0,0,0,.18)" strokeWidth={4} />
    <Rebanada x={-150} y={6} s={1.05} rot={-14} cocido={cocido} />
    <Rebanada x={-30} y={22} s={1.1} rot={8} cocido={cocido} />
    <Rebanada x={160} y={14} s={1.0} rot={18} cocido={cocido} />
    <Shiitake x={70} y={-6} s={0.8} rot={-6} cocido={cocido} />
    {vapor > 0 && Array.from({ length: 5 }, (_, i) => { const u = (T * 0.5 + i / 5) % 1; return <path key={i} d={`M ${-160 + i * 80} ${-60 - u * 260} q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.7 * vapor} />; })}
  </g>;
}
function Tenedor({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={300} rx={12} fill="#d8dde3" stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 0 L -36 -110 M -12 0 L -12 -118 M 12 0 L 12 -118 M 36 0 L 36 -110" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    <path d="M -36 0 L -36 -110 M -12 0 L -12 -118 M 12 0 L 12 -118 M 36 0 L 36 -110" stroke="#e9edf1" strokeWidth={8} strokeLinecap="round" />
    <path d="M -44 10 Q 0 40 44 10 L 44 0 L -44 0 Z" fill="#d8dde3" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Rayas lineales tipo latigazo: lista [x1,y1,x2,y2,curva] (coordenadas locales). p = 0..1 cuántas se ven.
function Rayas({ lista, p = 1, ancho = 14, seed = 2 }) {
  const n = lista.length;
  return <g>{lista.map(([x1, y1, x2, y2, c = 20], i) => {
    const u = kclamp(p * n - i, 0, 1); if (u <= 0) return null;
    const L = Math.hypot(x2 - x1, y2 - y1) * 1.1, mx = (x1 + x2) / 2 + c, my = (y1 + y2) / 2 - c * 0.4, d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
    const g = krng(seed + i);
    return <g key={i}>
      <path d={d} stroke="rgba(232,52,74,.35)" strokeWidth={ancho * 2.2} fill="none" strokeLinecap="round" strokeDasharray={`${u * L} 9999`} />
      <path d={d} stroke={SH.raya} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeDasharray={`${u * L} 9999`} />
      {u > 0.9 && Array.from({ length: 5 }, (_, k) => { const t = (k + 0.5) / 5; return <circle key={k} cx={klerp(x1, x2, t) + (g() - 0.5) * 10 + c * 0.6 * Math.sin(Math.PI * t)} cy={klerp(y1, y2, t) + (g() - 0.5) * 10 - c * 0.2 * Math.sin(Math.PI * t)} r={ancho * 0.32} fill="#b81f35" />; })}
    </g>; })}</g>;
}
// Antebrazo horizontal con mano (macro). rayas 0..1.
function Brazo({ x, y, s = 1, rayas = 0, rasca = 0, T = 0 }) {
  const RB = [[-170, -30, -60, 40, 18], [-110, -46, 20, 30, -16], [-20, -40, 90, 34, 14], [60, -44, 160, 20, -10]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -280 -56 Q -60 -76 200 -50 Q 250 -46 250 0 Q 250 46 200 50 Q -60 70 -280 56 Z" fill={SH.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M 220 -52 Q 330 -80 350 -20 Q 372 40 300 58 Q 250 62 220 48 Z" fill={SH.piel2} stroke={KC.ink} strokeWidth={7} />
    <path d="M 320 -40 Q 370 -60 380 -30" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <Rayas lista={RB} p={rayas} ancho={11} seed={3} />
    {rasca > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${-120 + i * 70} ${-90 - Math.abs(Math.sin(T * 14 + i)) * 16} l 14 -22 l 14 22`} stroke={KC.ink} strokeWidth={6} fill="none" opacity={rasca} strokeLinecap="round" />)}
  </g>;
}
// Silueta de cuerpo de frente con rayas en torso, brazos y piernas. p = 0..1.
function Cuerpo({ x, y, s = 1, p = 0, rasca = 0, T = 0 }) {
  const R = [[-60, -380, 40, -300, 16], [20, -360, 70, -250, -14], [-70, -270, 10, -190, 12], [-150, -360, -170, -230, 10], [160, -350, 180, -240, -10],
    [-180, -200, -195, -100, 8], [190, -190, 200, -90, -8], [-60, -60, -50, 80, 10], [55, -40, 70, 110, -10], [-40, 150, -60, 260, 8], [60, 140, 50, 250, -8]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-520} r={80} fill={SH.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -120 -420 Q 0 -450 120 -420 L 140 -120 Q 0 -100 -140 -120 Z" fill={SH.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 -410 L -215 -80 L -165 -66 L -110 -300 Z M 120 -410 L 215 -80 L 165 -66 L 110 -300 Z" fill={SH.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -140 -120 L 140 -120 L 120 -40 L -120 -40 Z" fill="#3b5bdb" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 -40 L -100 300 L -20 300 L -4 -20 Z M 120 -40 L 100 300 L 20 300 L 4 -20 Z" fill={SH.piel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <Rayas lista={R} p={p} ancho={12} seed={9} />
    {rasca > 0 && [[-260, -260], [250, -200], [-200, 120]].map(([dx, dy], i) => <g key={i} opacity={rasca} transform={`translate(${dx} ${dy}) rotate(${Math.sin(T * 12 + i) * 12})`}>
      <path d="M -26 -10 l 12 -20 l 12 20 l 12 -20 l 12 20" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" /></g>)}
  </g>;
}
// Lentinano esquemático: triple hélice de cadenas de glucosa (hexágonos). sep 0..1 = el calor la separa en tres hilos sueltos.
function Helice({ T, x, y, largo = 520, s = 1, rot = 0, sep = 0, fase = 0, n = 14 }) {
  const cols = ['#ffd84a', '#7ee0ff', '#ff9ac2'];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[0, 1, 2].map((k) => {
      const off = (k - 1) * 90 * kEase.suave(sep);
      const pts = Array.from({ length: n }, (_, i) => { const u = i / (n - 1), xx = -largo / 2 + u * largo;
        const amp = 34 * (1 - sep * 0.75), yy = Math.sin(u * Math.PI * 4 + T * 2.2 + fase + k * 2.094) * amp + off + Math.sin(u * 9 + T * 3 + k) * 10 * sep;
        return [xx, yy]; });
      const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
      return <g key={k}>
        <path d={d} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinejoin="round" />
        <path d={d} stroke={cols[k]} strokeWidth={5} fill="none" strokeLinejoin="round" />
        {pts.map(([px, py], i) => <polygon key={i} points={Array.from({ length: 6 }, (_, j) => `${(px + 13 * Math.cos(j * Math.PI / 3)).toFixed(1)},${(py + 13 * Math.sin(j * Math.PI / 3)).toFixed(1)}`).join(' ')} fill={cols[k]} stroke={KC.ink} strokeWidth={3} />)}
      </g>; })}
  </g>;
}
// Hifa del shiitake (micro): tubo con pared gruesa, tabique y citoplasma.
function Hifa({ T, y = 820, alto = 260 }) {
  return <g>
    <rect x={-60} y={y - alto / 2} width={1200} height={alto} rx={alto / 2} fill="#e9d9a6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={y - alto / 2 + 34} width={1200} height={alto - 68} rx={(alto - 68) / 2} fill="#3a2f56" stroke={KC.ink} strokeWidth={5} />
    <rect x={640} y={y - alto / 2 + 30} width={26} height={alto - 60} rx={10} fill="#e9d9a6" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={((i * 113 + T * 30) % 1160) - 40} cy={y + Math.sin(i * 1.7 + T) * 40} r={10 + (i % 3) * 4} fill="rgba(180,160,255,.45)" />)}
    {Array.from({ length: 22 }, (_, i) => <line key={i} x1={i * 52} y1={y - alto / 2 + 6} x2={i * 52 + 16} y2={y - alto / 2 + 28} stroke="rgba(120,90,40,.5)" strokeWidth={4} />)}
  </g>;
}
// Corte de piel (micro): epidermis en celdas, dermis y un vasito con glóbulos. abre 0..1 = se ensancha y enrojece.
function CortePiel({ T, abre = 0 }) {
  const vy = 1020, r = 34 + abre * 30;
  return <g>
    <rect x={0} y={420} width={KW} height={200} fill="#f7d9c4" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 4 }, (_, f) => Array.from({ length: 12 }, (_, i) => <rect key={f + '_' + i} x={(f % 2) * 45 + i * 90 - 30} y={430 + f * 46} width={84} height={42} rx={14} fill={mixHex('#f9e3d2', '#eab69a', f / 3)} stroke="rgba(0,0,0,.35)" strokeWidth={3} />))}
    <rect x={0} y={620} width={KW} height={600} fill="#e9a08c" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M 0 ${660 + i * 60} C 300 ${640 + i * 60} 700 ${690 + i * 60} 1080 ${660 + i * 60}`} stroke="rgba(150,60,50,.25)" strokeWidth={5} fill="none" />)}
    {abre > 0 && <ellipse cx={540} cy={vy} rx={520} ry={120 * abre} fill="rgba(255,40,60,.25)" />}
    <rect x={-20} y={vy - r} width={1120} height={r * 2} rx={r} fill={mixHex('#f2b6ab', '#ff6a6a', abre)} stroke="#9c2b2b" strokeWidth={6} />
    {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={((i * 83 + T * 120) % 1160) - 40} cy={vy + Math.sin(i * 2.3) * r * 0.4} rx={22} ry={13} fill="#d62828" stroke="#7a1414" strokeWidth={3} />)}
  </g>;
}
// Linfocito T esquemático: célula redonda con núcleo grande y bordes con vellosidades.
function LinfocitoT({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y + Math.sin(T * 2) * 6}) scale(${s})`}>
    {Array.from({ length: 18 }, (_, i) => { const a = i / 18 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * 80} y1={Math.sin(a) * 80} x2={Math.cos(a) * 96} y2={Math.sin(a) * 96} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />; })}
    <circle r={84} fill="#c7b8ff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={6} cy={4} r={62} fill="#6a4fd1" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Sartén de lado con lumbre.
function Sarten({ T, x, y, s = 1, fuego = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fuego > 0 && [-150, -75, 0, 75, 150].map((dx, i) => <path key={i} d={`M ${dx - 34} 120 Q ${dx} ${30 - 40 * Math.abs(Math.sin(T * 7 + i))} ${dx + 34} 120 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={fuego} />)}
    <rect x={250} y={-34} width={300} height={40} rx={18} fill="#2b2b30" stroke={KC.ink} strokeWidth={7} transform="rotate(-6 250 -14)" />
    <path d="M -270 -40 L 270 -40 L 240 60 Q 0 90 -240 60 Z" fill="#3a3c44" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <ellipse cx={0} cy={-40} rx={270} ry={30} fill="#55575f" stroke={KC.ink} strokeWidth={6} />
    {children}
  </g>;
}
function Termometro({ x, y, valor = 0, max = 160 }) {
  const H = 420, f = H * kclamp(valor / max, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-H} width={52} height={H + 20} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-12} y={-f} width={24} height={f + 10} rx={10} fill={KC.red} />
    <circle cx={0} cy={40} r={46} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[0, 50, 100, 150].map((v) => <g key={v}><line x1={26} y1={-H * v / max} x2={50} y2={-H * v / max} stroke={KC.ink} strokeWidth={5} />
      <text x={58} y={-H * v / max + 10} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{v}</text></g>)}
  </g>;
}
// Persona (ícono) con rayas o contenta.
function Persona({ x, y, s = 1, color = '#8fb6ff', rayas = 0, feliz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 40 Q -50 -30 0 -32 Q 50 -30 46 40 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-74} r={34} fill={SH.piel} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-12} cy={-80} r={4.5} fill={KC.ink} /><circle cx={12} cy={-80} r={4.5} fill={KC.ink} />
    <path d={feliz ? 'M -14 -62 Q 0 -48 14 -62' : 'M -12 -58 Q 0 -66 12 -58'} stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    {rayas > 0 && <Rayas lista={[[-26, -96, -4, -60, 6], [8, -98, 26, -64, -6], [-30, -20, 20, 26, 8]]} p={rayas} ancho={6} seed={4} />}
  </g>;
}
// Platito mini (poco / medio / mucho).
function Platito({ x, y, n = 1, cocido = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={110} ry={34} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: n }, (_, i) => <Rebanada key={i} x={-50 + (i % 3) * 50} y={-14 - Math.floor(i / 3) * 34} s={0.5} rot={(i % 2 ? 10 : -10)} cocido={cocido} />)}
  </g>;
}

function ShiitakeShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Es: CUES.Espera, R: CUES.Rayas, L: CUES.Lentinano, P: CUES.Pregunta, H: CUES.Hipotesis, Ca: CUES.Calor, E: CUES.Estudio, D: CUES.Dosis, Ce: CUES.Cena, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const pincha = kprog(T, K.G + 0.2, K.G + 0.7, kEase.sale);
  const latigo = kprog(T, K.G + 3.2, K.G + 4.8);
  const mitadCa = K.Ca + (K.E - K.Ca) * 0.45;
  const sep = kprog(T, mitadCa + 0.6, mitadCa + 2.2, kEase.suave);
  const temp = 25 + 115 * kprog(T, mitadCa, mitadCa + 2.0, kEase.suave);
  const dosisT = (i) => K.D + 0.5 + i * 0.6;
  const DIAS = [4, 7, 15];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el tenedor pincha shiitake crudo; un brazo se raya como a latigazos */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato T={T} x={470} y={1010} s={1.15} />
          <Tenedor x={klerp(760, 640, pincha)} y={klerp(560, 900, pincha)} rot={24} s={1.1} />
          {T > K.G + 2.9 && <g opacity={kprog(T, K.G + 2.9, K.G + 3.2)}><Brazo T={T} x={330} y={560} s={0.95} rayas={latigo} /></g>}
        </>)}
      </Escena>
      {/* 1 · tiene nombre: dermatitis flagelada; es raro, no le pasa a todos */}
      <Escena T={T} a={K.N} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Shiitake x={330} y={900} s={1.5} crece={kprog(T, K.N - 0.2, K.N + 1.0)} rot={-4} />
          {Array.from({ length: 8 }, (_, i) => { const on = kprog(T, K.N + 1.6 + i * 0.1, K.N + 1.9 + i * 0.1, kEase.rebote); return on > 0 ? <Persona key={i} x={110 + i * 122} y={1110} s={0.9 * on} color={i === 5 ? KC.orange : '#8fb6ff'} rayas={i === 5 ? kprog(T, K.N + 2.6, K.N + 3.4) : 0} /> : null; })}
        </>)}
      </Escena>
      {/* 2 · tarda: de horas a días */}
      <Escena T={T} a={K.Es} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {Array.from({ length: 7 }, (_, i) => { const on = kprog(T, K.Es + 0.6 + i * 0.25, K.Es + 0.9 + i * 0.25, kEase.rebote);
            return <g key={i} transform={`translate(${130 + i * 137} 900) scale(${0.3 + 0.7 * on})`} opacity={0.25 + 0.75 * on}>
              <rect x={-56} y={-60} width={112} height={120} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <rect x={-56} y={-60} width={112} height={34} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
              <text y={42} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text></g>; })}
          <text x={540} y={1070} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>días después de comer</text>
        </>)}
      </Escena>
      {/* 3 · rayas rojas con comezón en torso, brazos o piernas */}
      <Escena T={T} a={K.R} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Cuerpo T={T} x={400} y={1060} s={1.0} p={kprog(T, K.R + 0.2, K.R + 3.0)} rasca={kprog(T, K.R + 1.2, K.R + 1.6)} />)}
      </Escena>
      {/* 4 · micro: la pared de la hifa del shiitake y el lentinano */}
      <Escena T={T} a={K.L} b={K.P} zoom={0.12}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Hifa T={T} y={1000} />
          {[[260, 640, -78], [560, 600, -96], [860, 650, -84]].map(([hx, hy, r], i) => { const on = kprog(T, K.L + 1.2 + i * 0.35, K.L + 2.0 + i * 0.35, kEase.sale);
            return on > 0 ? <g key={i} opacity={on}><Helice T={T} x={hx} y={hy + (1 - on) * 120} largo={420} s={0.62} rot={r} fase={i} n={12} /></g> : null; })}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿por qué hace rayas? */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <path d="M 40 1000 Q 300 940 520 1000 L 520 1180 L 40 1180 Z" fill={SH.piel} stroke={KC.ink} strokeWidth={8} />
          <Rayas lista={[[90, 1060, 470, 1030, 16], [110, 1120, 460, 1100, -12]]} p={kprog(T, K.P + 0.1, K.P + 0.8)} ancho={14} />
          <Interrogacion T={T} x={290} y={900} />
        </>)}
      </Escena>
      {/* 6 · hipótesis: inflamación que abre los vasitos · o alergia retardada (linfocito T) */}
      <Escena T={T} a={K.H} b={K.Ca} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <CortePiel T={T} abre={kprog(T, K.H + 1.2, K.H + 2.6, kEase.suave)} />
          {Array.from({ length: 12 }, (_, i) => { const u = kprog(T, K.H + 0.3 + i * 0.1, K.H + 1.5 + i * 0.1); return u > 0 && u < 1 ? <circle key={i} cx={120 + i * 75 + Math.sin(i) * 20} cy={klerp(470, 990, u)} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /> : null; })}
          {T > K.H + 3.3 && <g opacity={kprog(T, K.H + 3.3, K.H + 3.8)}><LinfocitoT T={T} x={760} y={800} s={kprog(T, K.H + 3.3, K.H + 3.9, kEase.rebote)} /></g>}
        </>)}
      </Escena>
      {/* 7 · pasa con crudo o poco cocido; el calor fuerte separa la triple hélice */}
      <Escena T={T} a={K.Ca} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {T < mitadCa + 0.3 && <g opacity={1 - kprog(T, mitadCa - 0.2, mitadCa + 0.3)}>
            <Shiitake x={300} y={1080} s={1.2} crece={kprog(T, K.Ca, K.Ca + 0.6)} />
            <Shiitake x={720} y={1080} s={1.2} crece={kprog(T, K.Ca + 0.4, K.Ca + 1.0)} cocido={0.35} />
          </g>}
          {T > mitadCa - 0.3 && <g opacity={kprog(T, mitadCa - 0.3, mitadCa + 0.2)}>
            <Sarten T={T} x={420} y={1100} s={1.0} />
            <Helice T={T} x={420} y={830} largo={560} s={1.0} sep={sep} n={15} />
            <Termometro x={930} y={1080} valor={temp} />
          </g>}
        </>)}
      </Escena>
      {/* 8 · el estudio: Francia, 2014–2019, 59 casos de 125 expuestos (cuadrícula esquemática) */}
      <Escena T={T} a={K.E} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>{Array.from({ length: 125 }, (_, i) => { const on = kprog(T, K.E + 1.8 + i * 0.012, K.E + 2.1 + i * 0.012, kEase.rebote); if (on <= 0) return null;
          const caso = i < 59 && T > K.E + 2.6 + i * 0.012; return <circle key={i} cx={130 + (i % 25) * 34.5} cy={880 + Math.floor(i / 25) * 52} r={13 * on} fill={caso ? SH.raya : '#ffffff'} stroke={KC.ink} strokeWidth={4} />; })}</>)}
      </Escena>
      {/* 9 · todos se recuperaron; entre más comieron, más días les duró (medianas 4, 7, 15) */}
      <Escena T={T} a={K.D} b={K.Ce} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{DIAS.map((d, i) => { const on = kprog(T, dosisT(i), dosisT(i) + 0.5, kEase.sale), y = 700 + i * 170;
          return <g key={i} opacity={kprog(T, dosisT(i) - 0.2, dosisT(i))}>
            <Platito x={150} y={y + 20} n={[1, 3, 6][i]} s={0.9} />
            <rect x={270} y={y - 30} width={40 * d * on} height={60} rx={14} fill={SH.raya} stroke={KC.ink} strokeWidth={6} />
            <text x={290 + 40 * d * on} y={y + 14} style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>{on > 0.9 ? `${d} días` : ''}</text>
          </g>; })}
          <text x={150} y={630} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>cuánto shiitake</text>
          <text x={560} y={630} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>días con rayas (mediana)</text>
        </>)}
      </Escena>
      {/* 10 · comidas compartidas: los que lo prefirieron cocido, sin nada */}
      <Escena T={T} a={K.Ce} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={60} y={1010} width={960} height={50} rx={18} fill="#b07a45" stroke={KC.ink} strokeWidth={8} />
          <rect x={120} y={1060} width={30} height={160} fill="#8a5a2e" stroke={KC.ink} strokeWidth={6} /><rect x={930} y={1060} width={30} height={160} fill="#8a5a2e" stroke={KC.ink} strokeWidth={6} />
          {[0, 1, 2, 3].map((i) => { const crudo = i === 0, on = kprog(T, K.Ce + 0.2 + i * 0.25, K.Ce + 0.6 + i * 0.25, kEase.rebote);
            return <g key={i} opacity={on}>
              <Persona x={180 + i * 240} y={930} s={1.25} color={crudo ? KC.orange : '#8fb6ff'} rayas={crudo ? kprog(T, K.Ce + 1.2, K.Ce + 2.0) : 0} feliz={!crudo && T > K.Ce + 2.2 ? 1 : 0} />
              <Platito x={180 + i * 240} y={1000} n={2} s={0.75} cocido={crudo ? 0 : 1} />
            </g>; })}
        </>)}
      </Escena>
      {/* 11 · lo que sí sirve: cocinarlo bien */}
      <Escena T={T} a={K.S} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Sarten T={T} x={440} y={1060} s={1.05}>
          {[-150, -30, 100].map((dx, i) => <Rebanada key={i} x={dx} y={-62 + Math.sin(T * 6 + i) * 4} s={1.0} rot={(i - 1) * 10} cocido={kprog(T, K.S + 0.2, K.S + 2.2)} />)}
          {Array.from({ length: 4 }, (_, i) => { const u = (T * 0.7 + i / 4) % 1; return <path key={i} d={`M ${-120 + i * 80} ${-110 - u * 220} q 20 -26 0 -52 q -20 -26 0 -52`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.7} />; })}
        </Sarten>)}
      </Escena>
      {/* 12 · cierre: el mismo plato y el mismo tenedor, ahora con shiitake bien cocido; el brazo ya sin rayas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato T={T} x={470} y={1010} s={1.15} cocido={1} vapor={1} />
          <Tenedor x={640} y={900} rot={24} s={1.1} />
          <Brazo T={T} x={330} y={560} s={0.95} rayas={1 - kprog(T, K.C + 0.3, K.C + 1.6)} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 3.4} until={K.N - 0.3} texto="¿crudo?" x={400} y={1640} tam={44} borde={KC.red} />
      <Etq T={T} at={K.N + 0.9} until={K.Es - 0.3} x={520} y={560} texto="shiitake" tam={36} color={KC.ink} />
      <Etq T={T} at={K.N + 1.2} until={K.Es - 0.3} x={520} y={612} texto="Lentinula edodes" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.N + 2.6} until={K.Es - 0.3} texto="dermatitis flagelada" x={540} y={1460} tam={48} borde={KC.red} />
      <Chip T={T} at={K.N + 3.0} until={K.Es - 0.3} texto="flagelo = látigo · es raro" x={540} y={1570} tam={32} borde={KC.ink} />
      <Cronometro T={T} at={K.Es + 0.1} until={K.R - 0.3} factor={168 * 3600 / 2.6} etiqueta="DESPUÉS DE COMER" x={420} y={560} />
      <Chip T={T} at={K.Es + 1.0} until={K.R - 0.3} texto="de 1 hora a 7 días" x={420} y={700} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.R + 0.8} until={K.L - 0.3} x={560} y={700} texto="torso" tam={34} color={KC.ink} />
      <Etq T={T} at={K.R + 1.4} until={K.L - 0.3} x={640} y={880} texto="brazos" tam={34} color={KC.ink} />
      <Etq T={T} at={K.R + 2.0} until={K.L - 0.3} x={520} y={1170} texto="piernas" tam={34} color={KC.ink} />
      <Chip T={T} at={K.R + 1.2} until={K.L - 0.3} texto="mucha comezón" x={200} y={1500} tam={36} borde={KC.red} />
      <Etq T={T} at={K.L + 0.5} until={K.P - 0.3} x={60} y={1170} texto="hifa del shiitake" tam={30} />
      <Etq T={T} at={K.L + 0.9} until={K.P - 0.3} x={60} y={1500} texto="pared celular" tam={30} color={'#e9d9a6'} />
      <Etq T={T} at={K.L + 2.0} until={K.P - 0.3} x={60} y={440} texto="lentinano (β-glucano)" tam={34} color={KC.yellow} />
      <Chip T={T} at={K.L + 2.6} until={K.P - 0.3} texto="se cree que es el culpable" x={540} y={1620} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.L + 2.0} until={K.P - 0.3} texto="moléculas agrandadas" x={540} y={1720} tam={26} borde={KC.ink} mono />
      <Chip T={T} at={K.H + 0.4} until={K.H + 3.2} texto="hipótesis 1: inflamación" x={360} y={360} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.H + 1.4} until={K.Ca - 0.3} x={60} y={1170} texto="vasito de la piel" tam={30} color={'#ffb3b3'} />
      <Etq T={T} at={K.H + 0.3} until={K.Ca - 0.3} x={60} y={680} texto="piel (corte)" tam={30} color={KC.ink} />
      <Chip T={T} at={K.H + 3.4} until={K.Ca - 0.3} texto="hipótesis 2: alergia retardada" x={420} y={360} tam={32} borde={KC.lilac} />
      <Etq T={T} at={K.H + 3.8} until={K.Ca - 0.3} x={640} y={1500} texto="linfocito T" lado="izq" tam={30} color={'#c7b8ff'} />
      <Chip T={T} at={K.Ca + 0.6} until={mitadCa - 0.2} texto="crudo" x={300} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ca + 1.0} until={mitadCa - 0.2} texto="poco cocido" x={720} y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ca + 1.4} until={mitadCa - 0.2} texto="✓ aquí pasa" x={420} y={460} tam={40} borde={KC.ink} />
      <Chip T={T} at={mitadCa + 1.6} until={K.E - 0.3} texto="~140 °C: la hélice se separa" x={440} y={460} tam={36} borde={KC.yellow} />
      <Etq T={T} at={mitadCa + 0.4} until={K.E - 0.3} x={60} y={1560} texto="lentinano (molécula agrandada)" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.D - 0.3} anio="2014–2019" quien="Francia · centros de toxicología" revista="Boels et al., Clin Toxicol, 2022" y={520} />
      <Chip T={T} at={K.E + 2.6} until={K.D - 0.3} texto="59 casos de dermatitis · de 125 expuestos" x={540} y={1490} tam={32} borde={KC.red} />
      <Chip T={T} at={K.E + 2.0} until={K.D - 0.3} texto="esquemático" x={540} y={1590} tam={24} borde={KC.ink} mono />
      <Chip T={T} at={K.D + 2.4} until={K.Ce - 0.3} texto="✓ todos se recuperaron" x={420} y={460} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.Ce + 0.4} until={K.S - 0.3} texto="Boels et al., 2014" x={540} y={1490} tam={30} borde={KC.ink} mono />
      <Etq T={T} at={K.Ce + 1.0} until={K.S - 0.3} x={110} y={700} texto="crudo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ce + 1.6} until={K.S - 0.3} x={540} y={700} texto="cocido: nada" tam={34} color={KC.ink} />
      <Chip T={T} at={K.S + 0.5} until={K.C - 0.2} texto="✓ bien cocido" x={400} y={460} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.4} until={K.C - 0.2} texto="¿rayas raras? al médico" x={420} y={1500} tam={34} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.N} until={K.Es} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.R} until={K.L} texto="50 cm" largo={170} />
      <BarraEscala T={T} at={K.L} until={K.P} texto="10 µm" largo={160} />
      <BarraEscala T={T} at={K.P} until={K.H} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.H} until={K.Ca} texto="100 µm" largo={170} />
      <BarraEscala T={T} at={K.Ca} until={K.E} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.S} until={K.C} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="¿Shiitake crudo? *Piel a latigazos.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Es - 0.1} texto="Es raro: *dermatitis flagelada.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.R - 0.1} texto="Tarda *de horas a días.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.L - 0.1} texto="Rayas rojas *con comezón.*" />
      <Subtitulo T={T} idx={4} at={K.L + 0.1} until={K.P - 0.1} texto="¿El culpable? *El lentinano.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Por qué *rayas?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.Ca - 0.1} texto="¿Inflamación *o alergia?*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.E - 0.1} texto="El calor fuerte *lo desarma.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.D - 0.1} texto="Francia, 2014–2019: *59 casos.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Ce - 0.1} texto="Más shiitake, *más días.*" />
      <Subtitulo T={T} idx={10} at={K.Ce + 0.1} until={K.S - 0.1} texto="Cocido: *nada.*" />
      <Subtitulo T={T} idx={11} at={K.S + 0.1} until={K.C - 0.1} texto="Sin miedo: *cocínalo bien.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Bien cocido, *solo lo rico.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.8, K.Es - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.R + 0.3, K.L - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.H + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.H + 3.6, K.Ca - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ca + 1.8, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.D + 0.3, K.Ce - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ce + 1.4, K.S - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="26" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ShiitakeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ShiitakeShot /></CompositionStage></div>;
}
window.ShiitakeApp = ShiitakeApp;
