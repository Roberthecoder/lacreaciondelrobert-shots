// Shot Fungi Mati #142 · Ese champiñón no es una verdura: es más pariente tuyo que de la lechuga — NARRADO
// Formato N3 (capítulos: PRUEBA 1–4) + N1 (por dentro). Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PL = { tabla:'#d9a86a', tabla2:'#b9864a', lechuga:'#8fdc5a', lechuga2:'#4fa83a', vena:'#d8f5b8', cloro:'#2fbf4a', celV:'#bff0a0',
  hifa:'#eafff7', quitina:'#F4C25A', glucano:'#b18cff', higado:'#a8463a', higado2:'#7a2e26', cangrejo:'#ff6b3a', escarabajo:'#2b6b4a', almidon:'#fff3c4' };

// Hoja de lechuga (orilla ondulada) con base en (x, y).
function Lechuga({ x, y, s = 1, rot = 0 }) {
  const N = 26, pts = Array.from({ length: N + 1 }, (_, i) => { const a = Math.PI * (i / N); const r = 190 + 18 * Math.sin(i * 2.3) + (i % 2) * 14; return [-Math.cos(a) * r * 1.05, -Math.sin(a) * r * 1.25]; });
  const d = 'M 0 0 ' + pts.map(([a, b]) => `L ${a.toFixed(1)} ${b.toFixed(1)}`).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} fill={PL.lechuga} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 0 0 L 0 -210" stroke={PL.vena} strokeWidth={14} strokeLinecap="round" />
    {[-1, 1].map((k) => [60, 110, 160].map((yy, i) => <path key={k + '' + i} d={`M 0 ${-yy + 30} Q ${k * 60} ${-yy - 10} ${k * (130 - i * 25)} ${-yy - 40}`} stroke={PL.vena} strokeWidth={6} fill="none" strokeLinecap="round" />))}
    <path d={d} fill="none" stroke={PL.lechuga2} strokeWidth={3} opacity=".6" transform="scale(.9)" />
  </g>;
}
// Silueta de persona (tú) dentro de una insignia redonda: es un ícono, no está a escala.
function InsigniaTu({ x, y, r = 110, color = KC.pink, texto = 'TÚ' }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cy={-r * 0.3} r={r * 0.27} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-r * 0.55} ${r * 0.55} Q ${-r * 0.55} ${r * 0.02} 0 ${r * 0.02} Q ${r * 0.55} ${r * 0.02} ${r * 0.55} ${r * 0.55} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    {texto && <text y={r + 52} textAnchor="middle" style={{ font:`400 48px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
function Tabla({ x = 60, y = 1020, w = 960, h = 150 }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={34} fill={PL.tabla} stroke={KC.ink} strokeWidth={8} />
    {[0.3, 0.55, 0.78].map((k, i) => <path key={i} d={`M ${x + 40} ${y + h * k} Q ${x + w * 0.5} ${y + h * k - 10} ${x + w - 40} ${y + h * k + 6}`} stroke={PL.tabla2} strokeWidth={5} fill="none" />)}
    <circle cx={x + w - 60} cy={y + h / 2} r={18} fill={KC.ink} opacity=".5" />
  </g>;
}
// Célula vegetal: pared gruesa, vacuola y cloroplastos (brillo 0..1 = hacen fotosíntesis).
function CelulaVegetal({ x, y, w = 380, h = 300, brillo = 0, almidon = 0, cloro = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={26} fill={PL.celV} stroke={PL.cloro} strokeWidth={16} />
    <rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} rx={18} fill="none" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={20} cy={10} rx={w * 0.28} ry={h * 0.26} fill="rgba(140,200,255,.45)" stroke="#5aa0d8" strokeWidth={4} />
    <circle cx={-w * 0.3} cy={h * 0.18} r={26} fill="#c9a0ff" stroke={KC.ink} strokeWidth={4} />
    {cloro > 0 && [[-120, -80, 20], [-40, -100, -10], [110, -80, 15], [140, 40, -25], [-130, 10, 30], [60, 100, 5], [-60, 95, -20]].map(([cx, cy, r], i) => <g key={i} transform={`translate(${cx * w / 380} ${cy * h / 300}) rotate(${r + Math.sin(T * 2 + i) * 4})`}>
      <ellipse rx={34} ry={17} fill={PL.cloro} stroke={KC.ink} strokeWidth={4} style={brillo ? { filter:`drop-shadow(0 0 ${16 * brillo}px #9dff6a)` } : null} />
      {[-16, -4, 8, 20].map((dx) => <line key={dx} x1={dx - 6} y1={-8} x2={dx - 6} y2={8} stroke="#1a6a2a" strokeWidth={3} />)}
      {almidon > 0 && <ellipse cx={0} cy={0} rx={12 * almidon} ry={8 * almidon} fill={PL.almidon} stroke={KC.ink} strokeWidth={2} />}
    </g>)}
  </g>;
}
// Segmento de hifa (célula de hongo): tubo con septos y núcleos; SIN cloroplastos.
function CelulaHongo({ x, y, w = 420, h = 150, rot = 0, roseta = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={PL.hifa} stroke={PL.quitina} strokeWidth={14} />
    <rect x={-w / 2 + 10} y={-h / 2 + 10} width={w - 20} height={h - 20} rx={h / 2 - 10} fill="none" stroke={KC.ink} strokeWidth={3} />
    {[-w / 6, w / 6].map((sx, i) => <line key={i} x1={sx} y1={-h / 2 + 8} x2={sx} y2={h / 2 - 8} stroke={PL.quitina} strokeWidth={8} />)}
    {[-w / 3, 0, w / 3].map((nx, i) => <circle key={i} cx={nx + 10 * Math.sin(T + i)} cy={-8} r={18} fill="#c9a0ff" stroke={KC.ink} strokeWidth={4} />)}
    {roseta > 0 && [[-w / 3 + 30, 30], [-40, 34], [40, 26], [w / 3 - 20, 32]].map(([rx, ry], i) => <Roseta key={i} x={rx} y={ry} r={22 * roseta} />)}
  </g>;
}
// Gránulo de glucógeno: roseta de cadenas ramificadas de glucosa (esquemático).
function Roseta({ x, y, r = 30, color = KC.pink }) {
  const ramas = Array.from({ length: 7 }, (_, i) => i * Math.PI * 2 / 7);
  return <g transform={`translate(${x} ${y})`}>
    {ramas.map((a, i) => { const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r, x2 = Math.cos(a + 0.35) * r * 1.6, y2 = Math.sin(a + 0.35) * r * 1.6;
      return <g key={i}><line x1={0} y1={0} x2={x1} y2={y1} stroke={color} strokeWidth={r * 0.18} /><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={r * 0.14} />
        <circle cx={x1} cy={y1} r={r * 0.2} fill={color} stroke={KC.ink} strokeWidth={2} /><circle cx={x2} cy={y2} r={r * 0.17} fill={color} stroke={KC.ink} strokeWidth={2} /></g>; })}
    <circle r={r * 0.3} fill="#fff" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Grano de almidón: óvalo con anillos de crecimiento.
function GranoAlmidon({ x, y, r = 34, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse rx={r} ry={r * 0.78} fill={PL.almidon} stroke={KC.ink} strokeWidth={5} />
    {[0.7, 0.45, 0.22].map((k, i) => <ellipse key={i} cx={-r * 0.12 * (1 - k)} rx={r * k} ry={r * 0.78 * k} fill="none" stroke="#c9a85a" strokeWidth={3} />)}
  </g>;
}
// Estómago esquemático (por dentro): la comida se deshace ADENTRO.
function Estomago({ x, y, s = 1, p = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -200 L -40 -120 Q -150 -90 -140 40 Q -130 170 10 170 Q 150 170 150 60 Q 150 -20 90 -60 Q 40 -90 20 -120 L 20 -200 Z" fill="#ff9aa8" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -110 30 Q -100 130 10 135 Q 115 135 115 60" stroke="#e86a7e" strokeWidth={8} fill="none" />
    {[[-60, 20], [10, 60], [60, 10], [-20, -30], [40, 100]].map(([a, b], i) => { const k = 1 - p; return <g key={i}>
      {k > 0.05 && <rect x={a - 22 * k} y={b - 18 * k} width={44 * k} height={36 * k} rx={8} fill="#c98b2b" stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 30} ${a} ${b})`} />}
      {p > 0 && [0, 1, 2].map((j) => <circle key={j} cx={a + Math.cos(j * 2.1 + T) * 26 * p} cy={b + Math.sin(j * 2.1 + T) * 26 * p} r={6} fill="#c98b2b" opacity={p} />)}
    </g>; })}
    {[[-80, -40], [80, 30], [0, 120]].map(([a, b], i) => <circle key={'e' + i} cx={a + 8 * Math.sin(T * 3 + i)} cy={b} r={9} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Hoja caída que se deshace (p 0..1).
function HojaSeca({ x, y, s = 1, p = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={1 - p * 0.75}>
    <path d="M -200 0 Q -100 -110 60 -90 Q 180 -70 220 0 Q 160 70 40 80 Q -110 80 -200 0 Z" fill="#b9732e" stroke={KC.ink} strokeWidth={7} />
    <path d="M -190 0 Q 0 -10 210 0" stroke="#7a4a1a" strokeWidth={5} fill="none" />
    {[-120, -40, 40, 120].map((xx, i) => <path key={i} d={`M ${xx} -4 L ${xx + 40} ${i % 2 ? 50 : -55}`} stroke="#7a4a1a" strokeWidth={4} />)}
  </g>;
}
// Fibras de pared: celulosa (rectas, paralelas, en capas cruzadas) o quitina + glucanos.
function ParedCelulosa({ x, y, w = 420, h = 520, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={24} fill="rgba(47,191,74,.12)" stroke={PL.cloro} strokeWidth={5} />
    <clipPath id="cpCel"><rect x={0} y={0} width={w} height={h} rx={24} /></clipPath>
    <g clipPath="url(#cpCel)">
      {Array.from({ length: 12 }, (_, i) => <line key={'a' + i} x1={-20} y1={30 + i * 44} x2={-20 + (w + 40) * kclamp(p * 1.6 - i * 0.04, 0, 1)} y2={30 + i * 44} stroke={PL.cloro} strokeWidth={12} strokeLinecap="round" />)}
      {Array.from({ length: 10 }, (_, i) => <line key={'b' + i} x1={30 + i * 44} y1={-20} x2={30 + i * 44} y2={-20 + (h + 40) * kclamp(p * 1.6 - 0.5 - i * 0.04, 0, 1)} stroke="#8fe07a" strokeWidth={8} strokeLinecap="round" opacity=".8" />)}
    </g>
  </g>;
}
function ParedQuitina({ x, y, w = 420, h = 520, p = 1, T = 0 }) {
  const rng = krng(11); const red = Array.from({ length: 34 }, () => [rng() * w, rng() * h, rng() * Math.PI]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={24} fill="rgba(244,194,90,.10)" stroke={PL.quitina} strokeWidth={5} />
    <clipPath id="cpQui"><rect x={0} y={0} width={w} height={h} rx={24} /></clipPath>
    <g clipPath="url(#cpQui)">
      {/* red de glucanos (ramificada) */}
      {red.map(([a, b, ang], i) => { const q = kclamp(p * 2 - 0.6 - i * 0.02, 0, 1); if (q <= 0) return null; const L = 70 * q;
        return <g key={i}><line x1={a} y1={b} x2={a + Math.cos(ang) * L} y2={b + Math.sin(ang) * L} stroke={PL.glucano} strokeWidth={6} strokeLinecap="round" />
          <line x1={a + Math.cos(ang) * L * 0.5} y1={b + Math.sin(ang) * L * 0.5} x2={a + Math.cos(ang + 1.2) * L * 0.9} y2={b + Math.sin(ang + 1.2) * L * 0.9} stroke={PL.glucano} strokeWidth={4} strokeLinecap="round" /></g>; })}
      {/* microfibrillas de quitina: gruesas, en haces */}
      {Array.from({ length: 7 }, (_, i) => { const yy = 50 + i * 70, q = kclamp(p * 1.6 - i * 0.06, 0, 1);
        return <path key={i} d={`M -20 ${yy} Q ${w * 0.3} ${yy - 16 + 6 * Math.sin(T + i)} ${w * 0.55} ${yy} T ${w + 20} ${yy}`} stroke={PL.quitina} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${(w + 60) * q} 2000`} />; })}
    </g>
  </g>;
}
function Cangrejo({ x, y, s = 1, T = 0 }) {
  const pinza = Math.sin(T * 5) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => [0, 1, 2].map((i) => <path key={k + '' + i} d={`M ${k * 70} ${10 + i * 22} L ${k * (150 + i * 10)} ${-10 + i * 40} L ${k * (170 + i * 6)} ${50 + i * 30}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinejoin="round" />))}
    {[-1, 1].map((k) => [0, 1, 2].map((i) => <path key={'c' + k + i} d={`M ${k * 70} ${10 + i * 22} L ${k * (150 + i * 10)} ${-10 + i * 40} L ${k * (170 + i * 6)} ${50 + i * 30}`} stroke={PL.cangrejo} strokeWidth={6} fill="none" strokeLinejoin="round" />))}
    {[-1, 1].map((k) => <g key={'p' + k}>
      <path d={`M ${k * 60} -30 Q ${k * 120} -100 ${k * 150} -140`} stroke={KC.ink} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d={`M ${k * 60} -30 Q ${k * 120} -100 ${k * 150} -140`} stroke={PL.cangrejo} strokeWidth={10} fill="none" strokeLinecap="round" />
      <g transform={`translate(${k * 160} -160) rotate(${k * (-20 + pinza)})`}>
        <path d={`M 0 0 Q ${k * 30} -60 ${k * 10} -90 Q ${k * -20} -50 0 0 Z`} fill={PL.cangrejo} stroke={KC.ink} strokeWidth={6} />
        <path d={`M 0 0 Q ${k * 50} -30 ${k * 50} -70 Q ${k * 20} -40 0 0 Z`} fill={PL.cangrejo} stroke={KC.ink} strokeWidth={6} />
      </g></g>)}
    <ellipse cx={0} cy={0} rx={110} ry={74} fill={PL.cangrejo} stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -20 Q 0 -60 70 -20" stroke="#c9481e" strokeWidth={6} fill="none" />
    {[-1, 1].map((k) => <g key={'o' + k}><line x1={k * 26} y1={-66} x2={k * 34} y2={-100} stroke={KC.ink} strokeWidth={6} /><circle cx={k * 34} cy={-104} r={12} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={k * 36} cy={-104} r={5} fill={KC.ink} /></g>)}
  </g>;
}
function Escarabajo({ x, y, s = 1, T = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((k) => [-40, 10, 60].map((yy, i) => <path key={k + '' + i} d={`M ${k * 50} ${yy} L ${k * 110} ${yy - 20 + Math.sin(T * 8 + i) * 6} L ${k * 140} ${yy + 30}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinejoin="round" />))}
    <ellipse cx={0} cy={-120} rx={40} ry={30} fill={KC.ink} />
    {[-1, 1].map((k) => <path key={'a' + k} d={`M ${k * 16} -145 Q ${k * 40} -200 ${k * 70} -210`} stroke={KC.ink} strokeWidth={6} fill="none" />)}
    <ellipse cx={0} cy={-80} rx={58} ry={34} fill="#1e4a34" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={30} rx={84} ry={120} fill={PL.escarabajo} stroke={KC.ink} strokeWidth={8} />
    <line x1={0} y1={-86} x2={0} y2={148} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-36} cy={-10} rx={18} ry={44} fill="#fff" opacity=".25" />
  </g>;
}
// Hígado humano (silueta esquemática).
function Higado({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -40 Q -220 -130 -60 -130 Q 120 -140 210 -90 Q 250 -60 200 -20 Q 120 40 20 90 Q -80 130 -150 80 Q -240 30 -230 -40 Z" fill={PL.higado} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -20 -128 Q -10 -40 30 80" stroke={PL.higado2} strokeWidth={6} fill="none" />
    {children}
  </g>;
}
// Tira de secuencia de aminoácidos (esquemática). hueco = posición donde va la inserción de 12; ins 0..1 = se ve el bloque dorado.
const COL_AA = [KC.pink, KC.cyan, KC.mint, KC.lilac, KC.orange, '#7fd88a'];
function Secuencia({ x, y, n = 24, celda = 34, seed = 1, ins = 0, hueco = -1, desliza = 0, sinIns = false }) {
  const r = krng(seed), cols = Array.from({ length: n }, () => COL_AA[Math.floor(r() * COL_AA.length)]);
  const W12 = 12 * celda * 0.6;
  return <g transform={`translate(${x + desliza} ${y})`}>
    {cols.map((c, i) => { const dx = hueco >= 0 && i >= hueco ? W12 : 0; return <rect key={i} x={i * celda * 0.6 + dx} y={0} width={celda * 0.6 - 3} height={celda} rx={4} fill={c} stroke={KC.ink} strokeWidth={2} />; })}
    {hueco >= 0 && !sinIns && Array.from({ length: 12 }, (_, j) => { const q = kclamp(ins * 2 - j * 0.08, 0, 1); return q > 0 ? <rect key={'g' + j} x={hueco * celda * 0.6 + j * celda * 0.6} y={(1 - q) * -40} width={celda * 0.6 - 3} height={celda} rx={4} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} opacity={q} /> : null; })}
    {hueco >= 0 && sinIns && <line x1={hueco * celda * 0.6} y1={celda / 2} x2={hueco * celda * 0.6 + W12 - 3} y2={celda / 2} stroke="#fff" strokeWidth={4} strokeDasharray="8 8" opacity={kclamp(ins * 2, 0, 1)} />}
  </g>;
}
// Champiñón pequeño como ícono (para el árbol y los reinos).
function ChampIcono({ x, y, s = 1 }) { return <Champinon x={x} y={y} s={s} lam="#8a5a44" />; }

function PlantasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Cocina, Cl: CUES.Clorofila, Es: CUES.Estomago, Pa: CUES.Pared, Qu: CUES.Quitina, Gl: CUES.Glucogeno, P: CUES.Pregunta, E: CUES.Estudio, A: CUES.Arbol, F: CUES.Firma, W: CUES.Whittaker, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el champiñón entra brincando desde la derecha (se mueve desde el cuadro 0)
  const hop = kprog(T, K.G, K.G + 0.9, kEase.sale);
  const champX = klerp(1180, 560, hop), champY = 1030 - Math.abs(Math.sin(hop * Math.PI * 3)) * 110 * (1 - hop);
  const arcoNo = kprog(T, K.G + 1.0, K.G + 1.6, kEase.sale), arcoSi = kprog(T, K.G + 2.0, K.G + 2.8, kEase.sale);
  const vuelo = kprog(T, K.Co + 1.8, K.Co + 2.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: champiñón y lechuga en la tabla; el champiñón se va con "tú" */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla />
          <Lechuga x={250} y={1040} s={0.95} rot={-6 + Math.sin(T * 2) * 1.5} />
          <Champinon x={champX} y={champY} s={0.9} rot={(1 - hop) * -40} lam="#8a5a44" />
          <InsigniaTu x={860} y={880} r={100} />
          {arcoNo > 0 && <g><path d="M 340 800 Q 450 700 520 820" stroke={KC.red} strokeWidth={9} fill="none" strokeDasharray={`${280 * arcoNo} 400`} strokeLinecap="round" />
            {arcoNo >= 1 && <path d="M 410 720 L 470 780 M 470 720 L 410 780" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}</g>}
          {arcoSi > 0 && <path d="M 620 820 Q 700 660 780 790" stroke={KC.ink} strokeWidth={9} fill="none" strokeDasharray="18 14" strokeDashoffset={-T * 40} opacity={arcoSi} />}
        </>)}
      </Escena>
      {/* 2 · en la cocina es verdura; en biología, otro reino */}
      <Escena T={T} a={K.Co} b={K.Cl} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g transform="translate(330 700)">
            <circle r={230} fill="#fff" stroke={KC.ink} strokeWidth={9} />
            <circle r={190} fill="none" stroke="#e6ded0" strokeWidth={6} />
            <path d="M 0 -230 L 0 230 M 0 0 L 230 0" stroke="#e6ded0" strokeWidth={6} />
            <text x={-100} y={-60} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>VERDURAS</text>
            <Lechuga x={-100} y={110} s={0.36} />
            <circle cx={110} cy={-100} r={40} fill="#e8b04a" stroke={KC.ink} strokeWidth={5} />
            <rect x={70} y={60} width={90} height={60} rx={18} fill="#c98b2b" stroke={KC.ink} strokeWidth={5} />
          </g>
          {vuelo < 1 && <Champinon x={klerp(220, 540, vuelo) + 0} y={klerp(780, 1130, vuelo) - Math.sin(vuelo * Math.PI) * 260} s={0.45} rot={vuelo * 360} lam="#8a5a44" />}
          {[['PLANTAE', 200, PL.lechuga], ['ANIMALIA', 540, KC.pink], ['FUNGI', 880, KC.gold2]].map(([t, cx, c], i) => { const on = kprog(T, K.Co + 1.0 + i * 0.2, K.Co + 1.4 + i * 0.2, kEase.rebote);
            return on > 0 ? <g key={t} transform={`translate(${cx} 1110) scale(${on})`}>
              <rect x={-150} y={-120} width={300} height={170} rx={24} fill={c} stroke={KC.ink} strokeWidth={8} style={i === 2 && vuelo >= 1 ? { filter:'drop-shadow(0 0 22px #fff6c0)' } : null} />
              <text y={40} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{t}</text>
              {i === 0 && <Lechuga x={0} y={-12} s={0.22} />}
              {i === 1 && <InsigniaTu x={0} y={-60} r={44} texto="" color="#ffd0dc" />}
              {i === 2 && vuelo >= 1 && <Champinon x={0} y={-14} s={0.42} lam="#8a5a44" />}
            </g> : null; })}
        </>)}
      </Escena>
      {/* 3 · PRUEBA 1: sin clorofila (al microscopio) */}
      <Escena T={T} a={K.Cl} b={K.Es} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {Array.from({ length: 6 }, (_, i) => { const q = kprog(T, K.Cl + 0.3 + i * 0.08, K.Cl + 0.9 + i * 0.08); const x0 = 80 + i * 170;
            const destino = i < 3 ? 900 : 1020; const yR = klerp(560, destino, q);
            return <g key={i}><line x1={x0 + 60} y1={560} x2={x0 + 60 - 30 * q} y2={yR} stroke="#ffe11a" strokeWidth={6} opacity=".8" strokeDasharray="20 12" />
              {i >= 3 && q >= 1 && <line x1={x0 + 30} y1={1020} x2={x0 + 30 + 80 * kprog(T, K.Cl + 1.2, K.Cl + 1.8)} y2={1020 - 220 * kprog(T, K.Cl + 1.2, K.Cl + 1.8)} stroke="#ffe11a" strokeWidth={5} opacity=".6" strokeDasharray="14 12" />}</g>; })}
          <circle cx={540} cy={500} r={46} fill="#ffe11a" stroke={KC.ink} strokeWidth={5} style={{ filter:'drop-shadow(0 0 30px #ffe11a)' }} />
          <CelulaVegetal x={290} y={1000} w={420} h={300} brillo={kprog(T, K.Cl + 1.0, K.Cl + 1.6)} T={T} />
          <CelulaHongo x={800} y={1010} w={420} h={170} T={T} />
        </>)}
      </Escena>
      {/* 4 · PRUEBA 2: estómago al revés */}
      <Escena T={T} a={K.Es} b={K.Pa} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Estomago x={250} y={960} s={1.05} p={kprog(T, K.Es + 0.6, K.Es + 2.4)} T={T} />
          <HojaSeca x={790} y={1120} s={0.95} p={kprog(T, K.Es + 2.2, K.Es + 4.4)} />
          <path d={`M 1100 640 Q 920 700 ${klerp(980, 820, kprog(T, K.Es + 0.3, K.Es + 1.4))} ${klerp(760, 1010, kprog(T, K.Es + 0.3, K.Es + 1.4))}`} stroke={PL.quitina} strokeWidth={66} fill="none" strokeLinecap="round" />
          <path d={`M 1100 640 Q 920 700 ${klerp(980, 820, kprog(T, K.Es + 0.3, K.Es + 1.4))} ${klerp(760, 1010, kprog(T, K.Es + 0.3, K.Es + 1.4))}`} stroke={PL.hifa} strokeWidth={46} fill="none" strokeLinecap="round" />
          {/* enzimas que SALEN de la punta y moléculas chiquitas que ENTRAN */}
          {Array.from({ length: 10 }, (_, i) => { const t0 = K.Es + 1.4 + i * 0.18, q = kprog(T, t0, t0 + 0.9); if (q <= 0) return null; const a = -0.2 + i * 0.35;
            return <circle key={'e' + i} cx={820 + Math.cos(a) * 160 * q - 80 * q} cy={1010 + Math.sin(a) * 40 * q + 60 * q} r={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} opacity={1 - q * 0.3} />; })}
          {Array.from({ length: 10 }, (_, i) => { const t0 = K.Es + 3.0 + i * 0.16, q = kprog(T, t0, t0 + 0.8); if (q <= 0 || q >= 1) return null;
            return <circle key={'m' + i} cx={klerp(700 + i * 22, 822, q)} cy={klerp(1120, 1010, q)} r={7} fill="#c98b2b" stroke={KC.ink} strokeWidth={2} />; })}
        </>)}
      </Escena>
      {/* 5 · PRUEBA 3: pared de celulosa vs. pared con quitina (por dentro) */}
      <Escena T={T} a={K.Pa} b={K.Qu} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <ParedCelulosa x={70} y={600} w={440} h={520} p={kprog(T, K.Pa + 0.4, K.Pa + 1.8)} />
          <ParedQuitina x={570} y={700} w={440} h={420} p={kprog(T, K.Pa + 2.4, K.Pa + 4.0)} T={T} />
        </>)}
      </Escena>
      {/* 6 · la quitina también está en cangrejos e insectos */}
      <Escena T={T} a={K.Qu} b={K.Gl} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Champinon x={540} y={1110} s={0.7} lam="#8a5a44" />
          {(() => { const q = kprog(T, K.Qu + 0.4, K.Qu + 1.4, kEase.sale), q2 = kprog(T, K.Qu + 1.0, K.Qu + 2.0, kEase.sale); return <>
            <path d="M 500 1030 Q 330 960 260 860" stroke={PL.quitina} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${330 * q} 600`} />
            <path d="M 580 1030 Q 740 960 820 860" stroke={PL.quitina} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${330 * q2} 600`} />
            <g opacity={q} transform={`translate(0 ${(1 - q) * 60})`}><Cangrejo x={240} y={790} s={0.95} T={T} /></g>
            <g opacity={q2} transform={`translate(0 ${(1 - q2) * 60})`}><Escarabajo x={830} y={800} s={0.75} T={T} rot={12} /></g>
          </>; })()}
        </>)}
      </Escena>
      {/* 7 · PRUEBA 4: glucógeno como tu hígado; las plantas, almidón */}
      <Escena T={T} a={K.Gl} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <CelulaHongo x={300} y={680} w={460} h={170} T={T} roseta={kprog(T, K.Gl + 0.6, K.Gl + 1.4, kEase.rebote)} />
          <Higado x={330} y={950} s={0.9}>
            {[[-130, -40], [-40, -70], [60, -50], [140, -60], [-80, 40], [20, 20]].map(([a, b], i) => <Roseta key={i} x={a} y={b} r={24 * kprog(T, K.Gl + 1.6 + i * 0.1, K.Gl + 2.1 + i * 0.1, kEase.rebote)} />)}
          </Higado>
          <CelulaVegetal x={810} y={975} w={360} h={260} T={T} almidon={kprog(T, K.Gl + 3.4, K.Gl + 4.2, kEase.rebote)} />
          {[[730, 940], [880, 1030], [800, 1010]].map(([a, b], i) => <GranoAlmidon key={i} x={a} y={b} r={30 * kprog(T, K.Gl + 3.6 + i * 0.12, K.Gl + 4.1 + i * 0.12, kEase.rebote)} rot={i * 40} />)}
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿quién es pariente de quién? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Lechuga x={140} y={620} s={0.4} />
          <Champinon x={290} y={620} s={0.5} lam="#8a5a44" />
          <InsigniaTu x={440} y={540} r={66} texto="" />
          <Interrogacion T={T} x={290} y={1120} tam={420} />
        </>)}
      </Escena>
      {/* 9–11 · el estudio de 1993: secuencias de proteínas y el árbol */}
      <Escena T={T} a={K.E} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {[['planta', 1, 900], ['animal', 2, 980], ['hongo', 3, 1060]].map(([t, sd, yy], i) => { const q = kprog(T, K.E + 1.4 + i * 0.3, K.E + 2.2 + i * 0.3, kEase.sale);
            return <g key={t} opacity={q}><text x={70} y={yy + 26} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{t}</text>
              <Secuencia x={230} y={yy} n={36} seed={sd} desliza={(1 - q) * (i % 2 ? -300 : 300)} /></g>; })}
        </>)}
      </Escena>
      <Escena T={T} a={K.A} b={K.F} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<g transform="translate(0 -70)">
          {(() => { const r = kprog(T, K.A + 0.2, K.A + 1.0, kEase.sale), b1 = kprog(T, K.A + 0.8, K.A + 1.6, kEase.sale), b2 = kprog(T, K.A + 1.4, K.A + 2.2, kEase.sale);
            const tr = (d, p, w = 18) => <><path d={d} stroke={KC.ink} strokeWidth={w + 10} fill="none" strokeLinecap="round" strokeDasharray={`${1000 * p} 2000`} /><path d={d} stroke="#7a4a22" strokeWidth={w} fill="none" strokeLinecap="round" strokeDasharray={`${1000 * p} 2000`} /></>;
            return <>
              {tr('M 540 1200 L 540 1050', r, 24)}
              {tr('M 540 1050 Q 360 980 230 780', b1)}
              {tr('M 540 1050 Q 640 960 690 900', b1)}
              {tr('M 690 900 Q 610 800 560 700', b2, 14)}
              {tr('M 690 900 Q 800 800 860 700', b2, 14)}
              {b1 >= 1 && <Lechuga x={230} y={770} s={0.42} />}
              {b2 >= 1 && <><Champinon x={540} y={700} s={0.55} lam="#8a5a44" /><InsigniaTu x={880} y={620} r={70} texto="" /></>}
              {b2 >= 1 && <path d={`M 470 ${560} Q 710 ${480} 960 560`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="16 12" opacity={kprog(T, K.A + 2.4, K.A + 2.8)} />}
            </>; })()}
        </g>)}
      </Escena>
      <Escena T={T} a={K.F} b={K.W} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {[['planta', 1, 820, true], ['animal', 2, 940, false], ['hongo', 3, 1060, false]].map(([t, sd, yy, sin]) =>
            <g key={t}><text x={50} y={yy + 26} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{t}</text>
              <Secuencia x={190} y={yy} n={24} seed={sd} hueco={8} sinIns={sin} ins={kprog(T, K.F + 0.6, K.F + 2.0)} /></g>)}
          <rect x={190 + 8 * 34 * 0.6 - 8} y={790} width={12 * 34 * 0.6 + 10} height={320} rx={14} fill="none" stroke={KC.gold2} strokeWidth={5} strokeDasharray="14 10" opacity={kprog(T, K.F + 2.0, K.F + 2.4)} />
        </>)}
      </Escena>
      {/* 12 · el sistema de cinco reinos (Whittaker, 1969) */}
      <Escena T={T} a={K.W} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {[['MONERA', 160, 880, '#9fd8ff'], ['PROTISTA', 380, 1000, '#ffc2a8'], ['FUNGI', 540, 830, KC.gold2], ['PLANTAE', 700, 1000, PL.lechuga], ['ANIMALIA', 920, 880, '#ffb3c8']].map(([t, cx, cy, c], i) => {
            const on = kprog(T, K.W + 0.4 + i * 0.25, K.W + 0.8 + i * 0.25, kEase.rebote); if (on <= 0) return null; const f = i === 2;
            return <g key={t} transform={`translate(${cx} ${cy}) scale(${on * (f ? 1 + 0.04 * Math.sin(T * 4) : 1)})`}>
              <circle r={f ? 130 : 100} fill={c} stroke={KC.ink} strokeWidth={8} style={f ? { filter:'drop-shadow(0 0 24px #fff3b0)' } : null} />
              <text y={f ? 90 : 12} textAnchor="middle" style={{ font:`400 ${f ? 44 : 34}px ${KF.titulo}` }} fill={KC.ink}>{t}</text>
              {f && <Champinon x={0} y={30} s={0.42} lam="#8a5a44" />}
            </g>; })}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma tabla del inicio; el champiñón ya está con "tú" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla />
          <Lechuga x={200} y={1040} s={0.85} rot={-6} />
          <Champinon x={klerp(560, 680, kprog(T, K.C + 0.2, K.C + 1.0, kEase.suave))} y={1030} s={0.9} lam="#8a5a44" />
          <InsigniaTu x={880} y={880} r={100} />
          <path d="M 700 790 Q 780 700 850 760" stroke={KC.ink} strokeWidth={9} fill="none" strokeDasharray="18 14" strokeDashoffset={-T * 40} />
          <path d="M 330 790 Q 420 720 520 800" stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M 400 730 L 450 780 M 450 730 L 400 780" stroke={KC.red} strokeWidth={12} strokeLinecap="round" />
        </>)}
      </Escena>

      {/* capítulos: las 4 pruebas */}
      <Capitulo T={T} hasta={K.P - 0.1} caps={[{ at: K.Cl, titulo: 'PRUEBA · sin clorofila' }, { at: K.Es, titulo: 'PRUEBA · digiere por fuera' }, { at: K.Pa, titulo: 'PRUEBA · pared con quitina' }, { at: K.Gl, titulo: 'PRUEBA · glucógeno' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 1.3} until={K.Co - 0.3} texto="verdura ✗" x={300} y={560} tam={44} borde={KC.red} />
      <Chip T={T} at={K.G + 2.4} until={K.Co - 0.3} texto="pariente tuyo ✓" x={330} y={660} tam={44} borde={KC.mint} />
      <Etq T={T} at={K.G + 0.9} until={K.Co - 0.3} x={60} y={1520} texto="champiñón · Agaricus bisporus" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.2} until={K.Co + 1.9} texto="en la cocina: verdura" x={720} y={520} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Co + 2.0} until={K.Cl - 0.3} texto="en biología: otro reino" x={540} y={880} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Cl + 0.1} until={K.Es - 0.3} texto="AL MICROSCOPIO" x={300} y={440} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Cl + 1.0} until={K.Es - 0.3} x={110} y={790} texto="lechuga: cloroplastos" tam={28} color={PL.lechuga} />
      <Etq T={T} at={K.Cl + 1.6} until={K.Es - 0.3} x={620} y={850} texto="hongo: clorofila 0" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Es + 0.8} until={K.Pa - 0.3} x={110} y={720} texto="tú: digieres adentro" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.8} until={K.Pa - 0.3} x={480} y={760} texto="hongo: enzimas afuera" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Es + 3.2} until={K.Pa - 0.3} texto="estómago al revés" x={330} y={520} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.Pa + 0.1} until={K.Qu - 0.3} texto="POR DENTRO · LA PARED" x={330} y={440} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pa + 0.6} until={K.Qu - 0.3} x={70} y={565} texto="lechuga: celulosa" tam={28} color={PL.lechuga} />
      <Etq T={T} at={K.Pa + 2.6} until={K.Qu - 0.3} x={570} y={665} texto="hongo: quitina + glucanos" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.Qu + 1.6} until={K.Gl - 0.3} x={60} y={1520} texto="la misma molécula: quitina" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Qu + 0.9} until={K.Gl - 0.3} x={60} y={990} texto="caparazón de cangrejo" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Gl + 0.8} until={K.P - 0.3} x={70} y={560} texto="hongo: glucógeno" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Gl + 1.8} until={K.P - 0.3} x={70} y={1100} texto="tu hígado: glucógeno" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Gl + 3.5} until={K.P - 0.3} x={610} y={830} texto="planta: almidón" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.A - 0.3} anio="1993" quien="Baldauf y Palmer" revista="PNAS, 1993 · secuencias de proteínas" x={540} y={590} />
      <Chip T={T} at={K.A + 2.5} until={K.F - 0.3} texto="grupos hermanos" x={710} y={400} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.A + 1.7} until={K.F - 0.3} x={80} y={570} texto="plantas: por su lado" tam={28} color={KC.ink} />
      <Chip T={T} at={K.F + 0.2} until={K.W - 0.3} texto="AL MICROSCOPIO · PROTEÍNA EF-1α" x={420} y={440} tam={28} borde={KC.cyan} mono />
      <NumeroGigante T={T} at={K.F + 1.8} until={K.W - 0.3} valor={12} dur={0.8} etiqueta="aminoácidos extra" x={330} y={640} tam={150} color={KC.gold2} />
      <Etq T={T} at={K.F + 2.4} until={K.W - 0.3} x={190} y={1170} texto="planta: no la tiene" tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.W + 1.6} until={K.C - 0.3} anio="1969" quien="Robert H. Whittaker" revista="Science, 1969 · cinco reinos" x={380} y={600} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="Fungi · primo lejano" x={540} y={1520} tam={36} borde={KC.gold} />
      {['sin clorofila', 'digiere por fuera', 'pared con quitina', 'glucógeno'].map((t, i) => <Chip key={t} T={T} at={K.C + 1.2 + i * 0.25} until={K.Ou} texto={t} x={250} y={470 + i * 78} tam={28} borde={KC.mint} />)}

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Co} texto="5 cm" largo={270} />
      <BarraEscala T={T} at={K.Cl} until={K.Es} texto="10 µm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.Es} until={K.Pa} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Pa} until={K.Qu} texto="100 nm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.Qu} until={K.Gl} texto="esquemático · no a escala" largo={0} />
      <BarraEscala T={T} at={K.Gl} until={K.P} texto="esquemático · no a escala" largo={0} />
      <BarraEscala T={T} at={K.F} until={K.W} texto="1 casilla = 1 aminoácido" largo={20} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={270} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No es verdura: es *más pariente tuyo.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Cl - 0.1} texto="En biología, es *otro reino.*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.Es - 0.1} texto="Sin clorofila: *no hace fotosíntesis.*" />
      <Subtitulo T={T} idx={3} at={K.Es + 0.1} until={K.Pa - 0.1} texto="Digiere *por fuera* y absorbe." />
      <Subtitulo T={T} idx={4} at={K.Pa + 0.1} until={K.Qu - 0.1} texto="Pared sin celulosa: *con quitina.*" />
      <Subtitulo T={T} idx={5} at={K.Qu + 0.1} until={K.Gl - 0.1} texto="Como el caparazón *del cangrejo.*" />
      <Subtitulo T={T} idx={6} at={K.Gl + 0.1} until={K.P - 0.1} texto="Glucógeno, *como tu hígado.*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Quién es *pariente de quién?*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.A - 0.1} texto="1993: compararon *sus proteínas.*" />
      <Subtitulo T={T} idx={9} at={K.A + 0.1} until={K.F - 0.1} texto="Hongos y animales: *hermanos.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.W - 0.1} texto="*12 aminoácidos* extra en común." />
      <Subtitulo T={T} idx={11} at={K.W + 0.1} until={K.C - 0.1} texto="Cinco reinos: *otro Robert,* 1969." />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es verdura: *es tu primo lejano.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Cl + 0.4, K.Es - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Es + 0.5, K.Pa - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Qu + 0.3, K.Gl + 0.5, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Gl + 2.5, K.P - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.F + 0.3, K.W - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.W + 2.0, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="142" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlantasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PlantasShot /></CompositionStage></div>;
}
window.PlantasApp = PlantasApp;
