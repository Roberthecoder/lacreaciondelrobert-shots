// Shot Fungi Mati #78 · Esa madera blanca no está sucia: el hongo que rompe el DDT — NARRADO (gancho 1 «Esto no es X: es Y», N1 + N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const DX = { corteza:'#6b4423', corteza2:'#4e2f17', madera:'#c9a26b', blanco:'#f3eee2', blanco2:'#dcd3c0', costra:'#fbf7ec', linea:'#2b1d12',
  cl:'#3fbf4a', oxi:'#ff3b2f', hifa:'#fff4d6', enz:'#ff8a1f', hemo:'#d81e3a', seta1:'#9a8b7a', seta2:'#b7a893', seta3:'#7f7264', paja:'#e8c35a', suelo:'#5b3a22' };

// Hexágono con vértice arriba (rot en grados).
const hexD = (cx, cy, r, rot = 0) => Array.from({ length: 6 }, (_, i) => { const a = (-90 + 60 * i + rot) * Math.PI / 180; return `${i ? 'L' : 'M'} ${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
const hexV = (cx, cy, r, k, rot = 0) => { const a = (-90 + 60 * k + rot) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };

// Átomo con letra (Cl verde, O rojo).
function Atomo({ x, y, t = 'Cl', r = 22, color = DX.cl, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text x={x} y={y + r * 0.36} textAnchor="middle" style={{ font:`700 ${r * 0.95}px ${KF.mono}` }} fill={t === 'O' ? '#fff' : KC.ink}>{t}</text></g>;
}
// Anillo aromático (hexágono + círculo interior).
function Anillo({ cx, cy, r = 46, color = KC.ink, fill = 'rgba(255,255,255,.55)', w = 7, aromatico = true, rot = 0 }) {
  return <g><path d={hexD(cx, cy, r, rot)} fill={fill} stroke={color} strokeWidth={w} strokeLinejoin="round" />
    {aromatico && <circle cx={cx} cy={cy} r={r * 0.56} fill="none" stroke={color} strokeWidth={w * 0.6} />}</g>;
}
// Molécula de DDT esquemática: dos anillos con un Cl cada uno, unidos a un carbono con un grupo CCl3. rompe 0..1 = se parte.
function Ddt({ x, y, s = 1, rot = 0, rompe = 0, color = KC.ink, fill = 'rgba(255,255,255,.7)', T = 0 }) {
  const u = kEase.sale(kclamp(rompe, 0, 1)), wob = Math.sin(T * 7) * 2 * (1 - u);
  const bond = 1 - kclamp(u * 3, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot + wob}) scale(${s})`}>
    {bond > 0 && <g opacity={bond}>
      <line x1={0} y1={-40} x2={-95} y2={-6} stroke={color} strokeWidth={8} /><line x1={0} y1={-40} x2={95} y2={-6} stroke={color} strokeWidth={8} />
      <line x1={0} y1={-40} x2={0} y2={-110} stroke={color} strokeWidth={8} />
    </g>}
    <g transform={`translate(${-u * 110} ${u * 70}) rotate(${-u * 35} -95 40)`}>
      <Anillo cx={-95} cy={40} color={color} fill={fill} /><line x1={-95} y1={86} x2={-95} y2={112} stroke={color} strokeWidth={7} /><Atomo x={-95} y={132} />
    </g>
    <g transform={`translate(${u * 110} ${u * 70}) rotate(${u * 35} 95 40)`}>
      <Anillo cx={95} cy={40} color={color} fill={fill} /><line x1={95} y1={86} x2={95} y2={112} stroke={color} strokeWidth={7} /><Atomo x={95} y={132} />
    </g>
    <g transform={`translate(0 ${-u * 90})`}>
      <circle cx={0} cy={-40} r={9} fill={color} />
      <line x1={0} y1={-110} x2={-50} y2={-148} stroke={color} strokeWidth={7} /><line x1={0} y1={-110} x2={0} y2={-160} stroke={color} strokeWidth={7} /><line x1={0} y1={-110} x2={50} y2={-148} stroke={color} strokeWidth={7} />
      <circle cx={0} cy={-110} r={9} fill={color} />
      <Atomo x={-50 - u * 60} y={-150 - u * 40} o={1 - u * 0.6} /><Atomo x={0} y={-178 - u * 70} o={1 - u * 0.6} /><Atomo x={50 + u * 60} y={-150 - u * 40} o={1 - u * 0.6} />
    </g>
  </g>;
}
// Otras moléculas de la lista de 1985 (esquemáticas).
function MolLista({ tipo, x, y, s = 1, color = KC.ink, fill = 'rgba(255,255,255,.75)', T = 0 }) {
  const g = (c) => <g transform={`translate(${x} ${y}) rotate(${Math.sin(T * 2 + x) * 3}) scale(${s})`}>{c}</g>;
  if (tipo === 'ddt') return <Ddt x={x} y={y + 10 * s} s={s * 0.85} color={color} fill={fill} T={T} />;
  if (tipo === 'pcb') {
    const A = [-62, 0], B = [62, 0];
    return g(<>
      <line x1={-22} y1={0} x2={22} y2={0} stroke={color} strokeWidth={8} />
      <Anillo cx={A[0]} cy={A[1]} r={40} rot={90} color={color} fill={fill} /><Anillo cx={B[0]} cy={B[1]} r={40} rot={90} color={color} fill={fill} />
      {[[A, 3], [A, 4], [B, 0], [B, 1]].map(([c, k], i) => { const [vx, vy] = hexV(c[0], c[1], 72, k, 90); return <Atomo key={i} x={vx} y={vy} r={18} />; })}
    </>);
  }
  if (tipo === 'lindano') return g(<>
    <path d={hexD(0, 0, 48)} fill={fill} stroke={color} strokeWidth={7} strokeLinejoin="round" />
    {Array.from({ length: 6 }, (_, k) => { const [ax, ay] = hexV(0, 0, 48, k), [bx, by] = hexV(0, 0, 80, k); return <g key={k}><line x1={ax} y1={ay} x2={bx} y2={by} stroke={color} strokeWidth={5} /><Atomo x={bx} y={by} r={17} /></g>; })}
  </>);
  if (tipo === 'dioxina') return g(<>
    {[-69, 0, 69].map((cx, i) => i === 1 ? <path key={i} d={hexD(cx, 0, 40)} fill={fill} stroke={color} strokeWidth={7} strokeLinejoin="round" /> : <Anillo key={i} cx={cx} cy={0} r={40} color={color} fill={fill} />)}
    <Atomo x={0} y={-40} t="O" r={17} color={DX.oxi} /><Atomo x={0} y={40} t="O" r={17} color={DX.oxi} />
    {[[-69, 4], [-69, 5], [69, 1], [69, 2]].map(([cx, k], i) => { const [vx, vy] = hexV(cx, 0, 70, k); return <Atomo key={i} x={vx} y={vy} r={16} />; })}
  </>);
  // benzo[a]pireno: cinco anillos fusionados
  return g(<>{[[-69, 20], [0, 20], [69, 20], [-34.5, -40], [34.5, -40]].map(([cx, cy], i) => <Anillo key={i} cx={cx} cy={cy} r={40} color={color} fill={fill} />)}</>);
}

// Tronco caído con pudrición blanca: corteza café, zonas blancas, fibrosas y esponjosas; cara del corte a la izquierda; costra blanca plana del hongo.
// hunde 0..1 = el dedo lo presiona (la madera se hunde, blanda). (x, y) = esquina superior izquierda.
function TroncoBlanco({ x, y, w = 940, h = 240, hunde = 0, T = 0 }) {
  const dent = 22 * hunde;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={44} fill={DX.corteza} stroke={KC.ink} strokeWidth={8} />
    {/* zonas de pudrición blanca: la corteza se cayó y la madera quedó clara y fibrosa */}
    <path d={`M 110 18 Q 150 4 200 16 Q 240 2 300 12 Q 360 0 410 18 Q 440 50 425 80 Q 455 110 430 ${h * 0.5} Q 380 ${h * 0.62} 330 ${h * 0.55} Q 270 ${h * 0.66} 210 ${h * 0.56} Q 150 ${h * 0.62} 125 ${h * 0.48} Q 100 90 118 60 Q 95 40 110 18 Z`} fill={DX.blanco} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M 575 ${h * 0.42} Q 620 ${h * 0.3} 680 ${h * 0.36} Q 740 ${h * 0.26} 800 ${h * 0.36} Q 860 ${h * 0.32} 880 ${h * 0.48} Q 900 ${h * 0.62} 875 ${h * 0.75} Q 890 ${h * 0.9} 840 ${h - 14} Q 760 ${h - 4} 700 ${h - 16} Q 630 ${h - 6} 590 ${h - 26} Q 560 ${h * 0.8} 585 ${h * 0.66} Q 556 ${h * 0.55} 575 ${h * 0.42} Z`} fill={DX.blanco} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {/* fibras y manchas: madera blanda, clara y fibrosa */}
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M ${130 + i * 21} ${20 + (i % 3) * 6} Q ${150 + i * 21} 70 ${135 + i * 21} ${h * 0.5 - (i % 4) * 6}`} stroke={DX.blanco2} strokeWidth={3} fill="none" />)}
    {Array.from({ length: 12 }, (_, i) => <path key={'b' + i} d={`M ${595 + i * 23} ${h * 0.4 + (i % 3) * 5} Q ${610 + i * 23} ${h * 0.65} ${600 + i * 23} ${h - 24 - (i % 4) * 5}`} stroke={DX.blanco2} strokeWidth={3} fill="none" />)}
    {[[200, 60, 20], [330, 90, 14], [700, h * 0.6, 18], [800, h * 0.75, 12]].map(([cx, cy, r], i) => <ellipse key={'m' + i} cx={cx} cy={cy} rx={r * 1.6} ry={r} fill="#e9dfc8" opacity=".8" />)}
    <path d={`M 140 ${h * 0.4} Q 250 ${h * 0.3} 380 ${h * 0.42}`} stroke={DX.linea} strokeWidth={3} fill="none" opacity=".6" />
    {/* costra blanca, plana (resupinada) del hongo */}
    <path d={`M 300 ${h * 0.62} Q 360 ${h * 0.56} 420 ${h * 0.64} Q 500 ${h * 0.6} 540 ${h * 0.7} Q 520 ${h * 0.86} 430 ${h * 0.84} Q 340 ${h * 0.9} 290 ${h * 0.78} Z`} fill={DX.costra} stroke="#c9bfa8" strokeWidth={4} />
    {/* la madera se hunde donde la presiona el dedo */}
    {hunde > 0 && <ellipse cx={500} cy={10 + dent * 0.4} rx={46} ry={8 + dent * 0.5} fill={DX.blanco2} stroke={KC.ink} strokeWidth={4} />}
    {/* grietas de corteza */}
    {[[440, 30, 520, 60], [760, 20, 860, 50], [80, h * 0.75, 260, h * 0.82], [460, h * 0.8, 540, h * 0.9]].map(([a, b, c, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2} ${b + 14} ${c} ${d}`} stroke={DX.corteza2} strokeWidth={6} fill="none" />)}
    {/* cara del corte: madera blanqueada con manchas y líneas negras de zona */}
    <ellipse cx={0} cy={h / 2} rx={70} ry={h / 2} fill={DX.blanco} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -40 ${h * 0.2} Q 10 ${h * 0.35} -20 ${h * 0.55} Q -50 ${h * 0.7} 20 ${h * 0.82}`} stroke={DX.linea} strokeWidth={4} fill="none" />
    <ellipse cx={18} cy={h * 0.38} rx={26} ry={34} fill={DX.blanco2} />
    {[0.6, 0.35].map((k, i) => <ellipse key={i} cx={0} cy={h / 2} rx={70 * k} ry={h / 2 * k} fill="none" stroke="#cdbf9f" strokeWidth={3} />)}
  </g>;
}
// Dedo que baja y presiona (del cuadro 0.3 al 1.4).
function Dedo({ x, y, p }) {
  if (p <= 0 || p >= 1) return null;
  const baja = Math.sin(Math.PI * p);
  return <g transform={`translate(${x} ${y - 260 + baja * 230})`}>
    <rect x={-38} y={-400} width={76} height={400} rx={38} fill="#e9a77e" stroke={KC.ink} strokeWidth={7} />
    <rect x={-24} y={-70} width={48} height={52} rx={18} fill="#f7d6c2" stroke={KC.ink} strokeWidth={4} />
    <path d="M -38 -150 Q 0 -138 38 -150" stroke="#c98762" strokeWidth={5} fill="none" />
  </g>;
}
// Bomba de fumigar antigua genérica (sin marca). p 0..1 = el émbolo empuja y sale la nube.
function Bomba({ x, y, s = 1, p = 0, T = 0 }) {
  const emb = Math.sin(Math.min(1, p) * Math.PI * 3) * 30;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-240 + emb} y1={0} x2={-40} y2={0} stroke={KC.ink} strokeWidth={12} />
    <rect x={-290 + emb} y={-40} width={30} height={80} rx={10} fill="#a8743c" stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-60} width={250} height={120} rx={20} fill="#7fa8c9" stroke={KC.ink} strokeWidth={8} />
    <rect x={-40} y={-44} width={60} height={88} rx={10} fill="#a9c9e2" opacity=".7" />
    <path d="M 190 -20 L 250 -10 L 250 10 L 190 20 Z" fill="#c9c2b0" stroke={KC.ink} strokeWidth={6} />
    {p > 0.1 && Array.from({ length: 16 }, (_, i) => { const k = ((T * 1.6 + i / 16) % 1); return <circle key={i} cx={260 + k * 260} cy={Math.sin(i * 2.3) * k * 90} r={8 + k * 22} fill="#ffffff" opacity={(1 - k) * 0.6 * Math.min(1, p * 3)} />; })}
  </g>;
}
// Mosquito esquemático.
function Mosco({ x, y, s = 1, T = 0 }) {
  const al = Math.sin(T * 60) * 18;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={34} ry={9} fill="#3a2e26" stroke={KC.ink} strokeWidth={3} />
    <circle cx={-38} cy={-2} r={9} fill="#3a2e26" /><line x1={-46} y1={0} x2={-74} y2={8} stroke={KC.ink} strokeWidth={3} />
    {[-12, 0, 12].map((d, i) => <g key={i}><line x1={d} y1={4} x2={d - 18} y2={36} stroke={KC.ink} strokeWidth={2.5} /><line x1={d} y1={4} x2={d + 16} y2={38} stroke={KC.ink} strokeWidth={2.5} /></g>)}
    <ellipse cx={-4} cy={-22} rx={30} ry={10} fill="rgba(220,240,255,.75)" stroke={KC.ink} strokeWidth={2} transform={`rotate(${-20 + al} -4 -6)`} />
  </g>;
}
// Matraz Erlenmeyer con el hongo creciendo como tapete blanco sobre el líquido. Base en (x, y).
function Matraz({ x, y, s = 1, T = 0, micelio = 1, brillo = 0, burbujas = 0, seed = 1 }) {
  const body = 'M -38 -300 L -38 -200 L -130 -10 Q -138 8 -118 10 L 118 10 Q 138 8 130 -10 L 38 -200 L 38 -300 Z';
  const g = krng(seed); const pts = Array.from({ length: 10 }, () => [g() * 180 - 90, -20 - g() * 60]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -95 -80 L 95 -80 L 128 -8 Q 132 6 116 6 L -116 6 Q -132 6 -128 -8 Z" fill="#f2d98a" opacity=".85" />
    {micelio > 0 && <g opacity={micelio}>{Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-84 + i * 21} cy={-84 - Math.abs(Math.sin(i * 1.7)) * 12} r={16 + Math.sin(i * 2.1) * 4} fill="#fffdf6" stroke="#ddd3bd" strokeWidth={2} />)}</g>}
    {brillo > 0 && pts.map(([px, py], i) => <circle key={i} cx={px} cy={py + Math.sin(T * 2 + i) * 6} r={6} fill={KC.yellow} opacity={brillo} style={{ filter:`drop-shadow(0 0 6px ${KC.yellow})` }} />)}
    {burbujas > 0 && Array.from({ length: 5 }, (_, i) => { const k = (T * 0.6 + i / 5) % 1; return <circle key={i} cx={Math.sin(i * 3) * 18} cy={-110 - k * 180} r={7 + k * 5} fill="none" stroke="#fff" strokeWidth={3} opacity={(1 - k) * burbujas} />; })}
    <path d={body} fill="rgba(255,255,255,.28)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-46} y={-330} width={92} height={44} rx={16} fill="#fbf7ec" stroke={KC.ink} strokeWidth={6} />
    <path d="M -100 -30 L -60 -150" stroke="#fff" strokeWidth={8} opacity=".5" strokeLinecap="round" />
  </g>;
}
// Racimo de setas Pleurotus ostreatus: sombreros en abanico u ostra, gris a café claro, láminas que bajan por un pie corto y lateral.
function SetasOstra({ x, y, s = 1, crece = 1, T = 0 }) {
  if (crece <= 0) return null;
  const caps = [[-150, -20, -38, 1.0, DX.seta2], [130, -10, 34, 0.95, DX.seta1], [-20, -40, -4, 1.15, DX.seta3], [-90, 40, -60, 0.8, DX.seta1], [90, 50, 58, 0.8, DX.seta2]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={110} rx={150} ry={34} fill="#efe6d4" stroke={KC.ink} strokeWidth={6} />
    {caps.map(([dx, dy, r, k, col], i) => { const c = kEase.rebote(kclamp(crece * 1.6 - i * 0.12, 0, 1)); if (c <= 0) return null;
      return <g key={i} transform={`translate(0 100) rotate(${r + Math.sin(T * 1.5 + i) * 1.5}) scale(${c * k}) translate(${dx * 0.15} ${dy * 0.2})`}>
        <path d="M -16 0 Q -20 -60 -8 -110 L 8 -110 Q 20 -60 16 0 Z" fill="#efe6d4" stroke={KC.ink} strokeWidth={5} />
        <path d="M -8 -100 Q -150 -150 -140 -250 Q -60 -300 0 -296 Q 60 -300 140 -250 Q 150 -150 8 -100 Z" fill="#efe6d4" stroke={KC.ink} strokeWidth={5} />
        {Array.from({ length: 11 }, (_, j) => { const a = -0.9 + j * 0.18; return <line key={j} x1={0} y1={-104} x2={Math.sin(a) * 140} y2={-104 - Math.cos(a) * 160} stroke="#cfc3ae" strokeWidth={3} />; })}
        <path d="M -140 -250 Q -60 -300 0 -296 Q 60 -300 140 -250 Q 120 -320 0 -330 Q -120 -320 -140 -250 Z" fill={col} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>; })}
  </g>;
}
// Mapa esquemático de la península escandinava (proyección simple de lon/lat) con Suecia en azul y un punto en el sur (Klippan).
const SC_P = ([lo, la]) => [((lo - 4) * 0.47 * 22).toFixed(1), ((72 - la) * 22).toFixed(1)];
const SC_PEN = [[12.9,55.4],[14.2,55.4],[16.4,56.6],[16.6,57.9],[18.3,59.4],[17.3,60.6],[17.5,62.3],[19.9,63.6],[22.2,65.6],[24.1,65.8],[23.6,67.9],[25.8,69.4],[28,70.2],[31,70.3],[28,71],[25.6,71.1],[18.9,69.9],[15.4,68.3],[13,66],[10.8,64.4],[8,63.2],[5,62],[5.1,60],[5.6,58.9],[7,58],[8.5,58.3],[10.3,59],[11.1,59],[11.8,58.3],[12.6,56.4]];
const SC_SUE = [[12.9,55.4],[14.2,55.4],[16.4,56.6],[16.6,57.9],[18.3,59.4],[17.3,60.6],[17.5,62.3],[19.9,63.6],[22.2,65.6],[24.1,65.8],[23.6,67.9],[20.6,69.1],[16.7,67.9],[14.5,65],[12.1,63.9],[12.3,61],[11.1,59],[11.8,58.3],[12.6,56.4]];
const scPath = (pts) => 'M ' + pts.map((q) => SC_P(q).join(' ')).join(' L ') + ' Z';
function MapaSuecia({ x, y, s = 1, p = 1 }) {
  const [kx, ky] = SC_P([13.2, 56.1]);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <path d={scPath(SC_PEN)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={scPath(SC_SUE)} fill="#9ed3ff" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <circle cx={kx} cy={ky} r={13 * p} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    <text x={150} y={250} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Suecia</text>
  </g>;
}
// Caja de texto de varias líneas (para frases que no caben en un Chip).
function Nota({ T, at, until, x = KW / 2, y, ancho = 900, texto, tam = 34, borde = KC.gold, it = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, width:ancho, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, background:'rgba(14,15,18,.84)', border:`4px solid ${borde}`, borderRadius:28,
    padding:'14px 26px', color:KC.texto, font:`900 ${tam}px/1.2 ${KF.texto}`, textAlign:'center', fontStyle: it ? 'italic' : 'normal', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{texto}</div>;
}
// Texto grande libre (porcentajes).
function Grande({ T, at, until, x, y, texto, etiqueta, tam = 140, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>
    {etiqueta && <div style={{ font:`900 34px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginTop:8, whiteSpace:'nowrap' }}>{etiqueta}</div>}
  </div>;
}

// Red de lignina (esquemática): anillos aromáticos unidos de muchas formas, sin orden.
const LIG = (() => { const g = krng(78), n = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) n.push({ x: 190 + c * 235 + (g() - 0.5) * 90 + (r % 2) * 50, y: 500 + r * 150 + (g() - 0.5) * 50, rot: g() * 60, sus: Math.floor(g() * 3), hit: 0, split: 0 });
  const e = []; n.forEach((a, i) => { const c = i % 4, r = Math.floor(i / 4); if (c < 3) e.push([i, i + 1, g() < 0.5]); if (r < 4 && g() < 0.75) e.push([i, i + 4, g() < 0.4]); if (r < 4 && c < 3 && g() < 0.3) e.push([i, i + 5, false]); });
  return { n, e }; })();
const BLANCOS = [1, 6, 9, 14, 3, 12, 17, 18]; // anillos que alcanzan las enzimas (ilustrativo)

function RedLignina({ T, t0, hits, splits, color = KC.gold2, apagar = 0 }) {
  return <g opacity={1 - apagar}>
    {LIG.e.map(([a, b, oxi], i) => { const A = LIG.n[a], B = LIG.n[b]; const sa = splits[a] ?? 99, sb = splits[b] ?? 99; const o = 1 - kprog(T, Math.min(sa, sb), Math.min(sa, sb) + 0.3);
      const mx = (A.x + B.x) / 2 + (i % 2 ? 18 : -18), my = (A.y + B.y) / 2;
      return <g key={i} opacity={o * kprog(T, t0 + i * 0.02, t0 + 0.4 + i * 0.02)}><path d={`M ${A.x} ${A.y} Q ${mx} ${my - 20} ${B.x} ${B.y}`} stroke={color} strokeWidth={6} fill="none" opacity=".75" />
        {oxi && <circle cx={mx} cy={my - 10} r={9} fill={DX.oxi} />}</g>; })}
    {LIG.n.map((a, i) => { const h = hits[i], sp = splits[i]; const on = kprog(T, t0 + i * 0.04, t0 + 0.35 + i * 0.04, kEase.rebote); if (on <= 0) return null;
      const glow = h != null && T > h ? 1 : 0; const u = sp != null ? kprog(T, sp, sp + 0.6, kEase.sale) : 0;
      const pts = Array.from({ length: 7 }, (_, k) => hexV(0, 0, 38, k % 6, a.rot));
      const half = (k0, dx, dy) => <path d={'M ' + pts.slice(k0, k0 + 4).map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke={glow ? KC.yellow : color} strokeWidth={7} fill="none" strokeLinecap="round" transform={`translate(${dx} ${dy})`} />;
      return <g key={i} transform={`translate(${a.x} ${a.y}) scale(${on})`} style={glow ? { filter:`drop-shadow(0 0 12px ${KC.yellow})` } : null} opacity={1 - u * 0.55}>
        {u === 0 ? <><path d={hexD(0, 0, 38, a.rot)} fill="rgba(244,194,90,.12)" stroke={glow ? KC.yellow : color} strokeWidth={7} strokeLinejoin="round" />
          <circle r={21} fill="none" stroke={glow ? KC.yellow : color} strokeWidth={4} /></>
          : <>{half(0, -u * 30, -u * 20)}{half(3, u * 30, u * 20)}</>}
        {a.sus === 1 && u === 0 && <><line x1={0} y1={-38} x2={0} y2={-62} stroke={color} strokeWidth={5} /><circle cx={0} cy={-68} r={8} fill={DX.oxi} /></>}
        {a.sus === 2 && u === 0 && <><line x1={33} y1={19} x2={56} y2={32} stroke={color} strokeWidth={5} /><circle cx={62} cy={36} r={8} fill={DX.oxi} /><line x1={68} y1={40} x2={86} y2={50} stroke={color} strokeWidth={5} /></>}
        {glow > 0 && u === 0 && <text x={30} y={-30} style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow}>•</text>}
      </g>; })}
  </g>;
}
// Hifa: tubo que crece por la punta, con tabiques (septos). pts = puntos del camino; g 0..1.
function Hifa({ pts, g = 1, ancho = 36 }) {
  if (g <= 0) return null;
  const N = pts.length - 1, k = g * N, n = Math.floor(k), f = k - n;
  const vis = pts.slice(0, n + 1); if (n < N) vis.push([klerp(pts[n][0], pts[n + 1][0], f), klerp(pts[n][1], pts[n + 1][1], f)]);
  const d = 'M ' + vis.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const tip = vis[vis.length - 1];
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={DX.hifa} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {vis.map((q, i) => i > 0 && i % 3 === 0 && i < vis.length - 1 ? (() => { const p0 = vis[i - 1], dx = q[0] - p0[0], dy = q[1] - p0[1], L = Math.hypot(dx, dy) || 1;
      return <line key={i} x1={q[0] - dy / L * ancho * 0.5} y1={q[1] + dx / L * ancho * 0.5} x2={q[0] + dy / L * ancho * 0.5} y2={q[1] - dx / L * ancho * 0.5} stroke="#c9b98f" strokeWidth={4} />; })() : null)}
    <circle cx={tip[0]} cy={tip[1]} r={ancho * 0.3} fill="#fffbe9" />
  </g>;
}
const HIFA1 = Array.from({ length: 25 }, (_, i) => [-40 + i * 34, 1090 - i * 14 + Math.sin(i * 0.7) * 16]);
const HIFA2 = Array.from({ length: 21 }, (_, i) => [1120 - i * 30, 1180 - i * 26 + Math.sin(i * 0.9) * 14]);
const hifaPunta = (pts, g) => { const N = pts.length - 1, k = kclamp(g, 0, 1) * N, n = Math.min(N - 1, Math.floor(k)), f = k - n; return [klerp(pts[n][0], pts[n + 1][0], f), klerp(pts[n][1], pts[n + 1][1], f)]; };
// Enzima (peroxidasa) esquemática: proteína redondeada con su hemo rojo.
function Enzima({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -26 -14 Q -30 -30 -10 -32 Q 8 -40 22 -26 Q 36 -10 26 10 Q 20 30 0 30 Q -22 32 -30 14 Q -38 0 -26 -14 Z" fill={DX.enz} stroke={KC.ink} strokeWidth={4} />
    <rect x={-9} y={-9} width={18} height={18} rx={4} fill={DX.hemo} stroke={KC.ink} strokeWidth={3} transform="rotate(45)" />
  </g>;
}

// Celdas de madera (corte transversal) para el fondo oscuro.
function CeldasMadera({ o = 1 }) {
  return <g opacity={o}>{Array.from({ length: 12 }, (_, i) => { const c = i % 3, r = Math.floor(i / 3); return <rect key={i} x={40 + c * 340} y={380 + r * 230} width={320} height={210} rx={60} fill="none" stroke="#5a3c22" strokeWidth={34} opacity=".55" />; })}
    {Array.from({ length: 18 }, (_, i) => <line key={'f' + i} x1={-400 + i * 90} y1={1900} x2={260 + i * 90} y2={340} stroke="#e8e0cf" strokeWidth={3} opacity=".16" />)}</g>;
}

const MOLS = ['ddt', 'pcb', 'lindano', 'dioxina', 'bap'], MOLX = [140, 340, 560, 760, 950], MOLN = ['DDT', 'PCB', 'lindano', 'dioxina', 'benzopireno'];

function DdtShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, D: CUES.DDT, Li: CUES.Lignina, En: CUES.Enzimas, R: CUES.Radicales, P: CUES.Pregunta, E: CUES.Estudio, Ls: CUES.Lista, S: CUES.Seta, Lm: CUES.Limite, Su: CUES.Suecia, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // tiempos de golpe de enzimas y ruptura (ilustrativo)
  const hits = {}, splits = {};
  BLANCOS.forEach((i, k) => { hits[i] = K.En + 1.2 + k * 0.38; splits[i] = K.R + 0.25 + k * 0.32; });
  const g1 = kprog(T, K.En - 0.1, K.En + 2.6, kEase.sale), g2 = kprog(T, K.En + 0.4, K.En + 3.0, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tronco con pudrición blanca; el dedo lo hunde; la molécula de DDT tiembla */}
      <Escena T={T} a={K.G} b={K.D} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={800} fill="#3f8f4a" />
          {[80, 260, 470, 690, 900].map((px, i) => <path key={i} d={`M ${px} 1130 l 12 -40 l 10 40 M ${px + 30} 1130 l 8 -30 l 9 30`} stroke="#2a6a32" strokeWidth={6} fill="none" />)}
          <TroncoBlanco x={70} y={890} hunde={kprog(T, K.G + 0.55, K.G + 0.9)} T={T} />
          <Dedo x={570} y={900} p={kprog(T, K.G + 0.2, K.G + 1.5)} />
          <Ddt x={300} y={600} s={0.95} T={T} rot={Math.sin(T * 3) * 4} />
        </>)}
      </Escena>
      {/* 2 · el DDT: bomba de fumigar, México lo dejó en 2000; en el suelo tarda años */}
      <Escena T={T} a={K.D} b={K.Li} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Bomba x={250} y={470} s={0.8} p={kprog(T, K.D + 0.2, K.D + 1.6)} T={T} />
          <Mosco x={590 - kprog(T, K.D, K.D + 3) * 100} y={560 + Math.sin(T * 5) * 20} s={0.9} T={T} />
          <g opacity={kprog(T, K.D + 1.6, K.D + 2.1)}><MapaMexico x={40} y={650} ancho={560} conCA={false} /></g>
          <rect x={0} y={1500} width={KW} height={420} fill={DX.suelo} />
          {[[120, 1580], [330, 1700], [560, 1610], [780, 1760], [960, 1640], [240, 1820]].map(([mx, my], i) =>
            <g key={i} opacity={kprog(T, K.D + 2.8 + i * 0.1, K.D + 3.1 + i * 0.1)}><Ddt x={mx} y={my} s={0.32} color={KC.yellow} fill="rgba(0,0,0,.25)" T={T + i} /></g>)}
        </>)}
      </Escena>
      {/* 3–5 · por dentro: lignina, hifas, enzimas, radicales (fondo oscuro) */}
      <Escena T={T} a={K.Li} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <CeldasMadera o={0.9} />
          <RedLignina T={T} t0={K.Li + 0.2} hits={hits} splits={splits} />
          <Hifa pts={HIFA1} g={g1} /><Hifa pts={HIFA2} g={g2} />
          {BLANCOS.map((ri, k) => { const t0 = hits[ri] - 0.8; if (T < t0 || T > hits[ri] + 0.05) return null; const u = kprog(T, t0, hits[ri], kEase.suave);
            const src = hifaPunta(k % 2 ? HIFA2 : HIFA1, k % 2 ? g2 : g1), A = LIG.n[ri];
            return <Enzima key={k} x={klerp(src[0], A.x, u)} y={klerp(src[1], A.y, u)} s={0.9} rot={u * 200} />; })}
          {BLANCOS.map((ri, k) => { const h = hits[ri]; if (T < h || T > h + 0.9) return null; const u = kprog(T, h, h + 0.9), A = LIG.n[ri];
            return <g key={'e' + k} opacity={1 - u}><circle cx={A.x + 40 + u * 90} cy={A.y - 40 - u * 90} r={18} fill={KC.cyan} style={{ filter:`drop-shadow(0 0 10px ${KC.cyan})` }} />
              <text x={A.x + 40 + u * 90} y={A.y - 32 - u * 90} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>e⁻</text></g>; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si el anillo es de un veneno? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[[110, 520], [200, 1120], [470, 560]].map(([ax, ay], i) => <Anillo key={i} cx={ax} cy={ay} r={44} fill="rgba(255,255,255,.3)" />)}
          <Interrogacion T={T} x={300} y={760} tam={340} />
          <Ddt x={300} y={1010} s={0.8} T={T} />
        </>)}
      </Escena>
      {/* 7–8 · el experimento de 1985: matraces; la lista que pasó a CO2 */}
      <Escena T={T} a={K.E} b={K.S} zoom={0.04}>
        <FondoLunares color={T < K.Ls ? KC.cyan : KC.yellow} />
        {fsvg(<>
          {T < K.Ls + 0.3 && <g opacity={1 - kprog(T, K.Ls - 0.2, K.Ls + 0.3)}>
            {[220, 540, 860].map((mx, i) => <Matraz key={i} x={mx} y={1130} s={0.8} T={T} seed={i + 2} micelio={kprog(T, K.E + 0.8 + i * 0.3, K.E + 1.6 + i * 0.3)} brillo={kprog(T, K.E + 2.4, K.E + 3.0)} />)}
          </g>}
          {T > K.Ls - 0.3 && <g opacity={kprog(T, K.Ls - 0.3, K.Ls + 0.2)}>
            {MOLS.map((t, i) => { const on = kprog(T, K.Ls + 0.2 + i * 0.35, K.Ls + 0.6 + i * 0.35, kEase.rebote); const parte = kprog(T, K.Ls + 1.0 + i * 0.35, K.Ls + 3.0 + i * 0.35);
              return <g key={i} opacity={on * (1 - parte * 0.4)}><MolLista tipo={t} x={MOLX[i]} y={900} s={0.5} T={T} /></g>; })}
            {MOLS.map((t, i) => Array.from({ length: 4 }, (_, j) => { const t0 = K.Ls + 1.0 + i * 0.35 + j * 0.5; if (T < t0) return null; const u = kprog(T, t0, t0 + 2.2);
              if (u >= 1) return null; return <g key={i + '-' + j} opacity={1 - u}><circle cx={MOLX[i] + Math.sin(j * 2 + i) * 20} cy={820 - u * 330} r={30} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={4} />
                <text x={MOLX[i] + Math.sin(j * 2 + i) * 20} y={828 - u * 330} textAnchor="middle" style={{ font:`700 20px ${KF.mono}` }} fill={KC.ink}>CO₂</text></g>; }))}
            {MOLN.map((n, i) => <text key={i} x={MOLX[i]} y={1035} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ls + 0.4 + i * 0.35, K.Ls + 0.8 + i * 0.35)}>{n}</text>)}
          </g>}
        </>)}
      </Escena>
      {/* 9 · la seta del súper (Pleurotus ostreatus) también, en laboratorio */}
      <Escena T={T} a={K.S} b={K.Lm} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <SetasOstra x={330} y={1060} s={0.72} crece={kprog(T, K.S + 0.1, K.S + 1.3)} T={T} />
          <Matraz x={830} y={1130} s={0.75} T={T} seed={9} micelio={kprog(T, K.S + 1.6, K.S + 2.4)} burbujas={kprog(T, K.S + 2.4, K.S + 2.9)} />
        </>)}
      </Escena>
      {/* 10 · pero ojo: solo del 9.4 al 23.4 % se volvió CO2 (1990, lindano y clordano) */}
      <Escena T={T} a={K.Lm} b={K.Su} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {(() => { const a = kprog(T, K.Lm + 0.6, K.Lm + 1.6, kEase.sale), b = kprog(T, K.Lm + 1.6, K.Lm + 2.4, kEase.sale);
            return <g>
              <rect x={90} y={770} width={900} height={60} rx={30} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
              <rect x={94} y={774} width={892 * 0.094 * a} height={52} rx={26} fill={KC.mint} />
              <rect x={94 + 892 * 0.094} y={774} width={892 * (0.234 - 0.094) * b} height={52} fill={KC.mint} opacity=".5" />
              <line x1={94 + 892 * 0.234} y1={750} x2={94 + 892 * 0.234} y2={850} stroke={KC.ink} strokeWidth={5} opacity={b} />
              <text x={94} y={880} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={a}>0 %</text>
              <text x={986} y={880} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={a}>100 %</text>
              <text x={540} y={880} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Lm + 2.4, K.Lm + 2.8)}>el resto no llegó a CO₂</text>
            </g>; })()}
          <Matraz x={830} y={1800} s={0.75} T={T} seed={4} micelio={1} burbujas={0.5} />
        </>)}
      </Escena>
      {/* 11 · Suecia 2026: DDT viejo, sin baja medible */}
      <Escena T={T} a={K.Su} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaSuecia x={40} y={640} s={0.95} p={kprog(T, K.Su + 0.3, K.Su + 0.9)} />
          <g transform="translate(340 890)">
            <rect x={0} y={0} width={460} height={240} rx={18} fill={DX.suelo} stroke={KC.ink} strokeWidth={7} />
            {[[30, 40], [150, 90], [270, 30], [360, 120], [80, 150], [220, 170]].map(([bx, by], i) => <g key={i} opacity={kprog(T, K.Su + 0.8 + i * 0.12, K.Su + 1.1 + i * 0.12)}>
              <rect x={bx} y={by} width={80} height={46} rx={8} fill={DX.paja} stroke={KC.ink} strokeWidth={4} />
              {[0, 1, 2].map((k) => <path key={k} d={`M ${bx + 8 + k * 26} ${by + 8} q 8 14 0 30`} stroke="#fffdf6" strokeWidth={5} fill="none" />)}</g>)}
            <text x={230} y={228} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#f4efe4">vivero · suelo con DDT viejo</text>
            {[60, 180, 300, 420].map((sx, i) => <g key={i}><line x1={sx} y1={0} x2={sx} y2={-40} stroke="#2a6a32" strokeWidth={6} /><path d={`M ${sx - 22} -24 L ${sx} -70 L ${sx + 22} -24 Z`} fill="#2f9e44" stroke={KC.ink} strokeWidth={4} /></g>)}
          </g>
          {(() => { const lvl = 0.72 + Math.sin(T * 3) * 0.008; return <g opacity={kprog(T, K.Su + 1.2, K.Su + 1.6)}>
            <rect x={870} y={780} width={80} height={350} rx={20} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
            <rect x={876} y={786 + 338 * (1 - lvl)} width={68} height={338 * lvl} rx={14} fill={KC.red} opacity=".85" />
            <line x1={858} y1={786 + 338 * (1 - lvl)} x2={962} y2={786 + 338 * (1 - lvl)} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 6" />
            <text x={910} y={760} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>DDT</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo tronco del inicio; la molécula ya partida; una lupa con una hifa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1120} width={KW} height={800} fill="#3f8f4a" />
          {[80, 260, 470, 690, 900].map((px, i) => <path key={i} d={`M ${px} 1130 l 12 -40 l 10 40 M ${px + 30} 1130 l 8 -30 l 9 30`} stroke="#2a6a32" strokeWidth={6} fill="none" />)}
          <TroncoBlanco x={70} y={890} T={T} />
          <Ddt x={300} y={640} s={0.85} T={T} rompe={kprog(T, K.C + 0.3, K.C + 1.5)} />
          <g opacity={kprog(T, K.C + 1.2, K.C + 1.7)} transform="translate(800 790)">
            <line x1={-50} y1={70} x2={-160} y2={200} stroke="rgba(255,255,255,.9)" strokeWidth={5} strokeDasharray="12 9" />
            <circle r={125} fill={KC.noche} stroke="#fff" strokeWidth={12} />
            <g transform="translate(-125 -60)"><Hifa pts={Array.from({ length: 10 }, (_, i) => [i * 28, 70 + Math.sin(i * 0.8) * 14])} g={kprog(T, K.C + 1.5, K.C + 2.6)} ancho={24} /></g>
            <Enzima x={30} y={-50} s={0.8} rot={T * 60} /><Enzima x={-40} y={60} s={0.7} rot={-T * 50} />
            <line x1={88} y1={88} x2={150} y2={150} stroke="#fff" strokeWidth={22} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.6} until={K.D - 0.3} x={60} y={790} texto="DDT · insecticida" tam={34} color={KC.ink} />
      <Chip T={T} at={K.G + 1.6} until={K.D - 0.3} texto="pudrición blanca" x={760} y={820} tam={36} borde={KC.white} />
      <Etq T={T} at={K.G + 3.4} until={K.D - 0.3} x={40} y={850} texto="costra blanca del hongo" tam={26} color={KC.texto} />
      <Etq T={T} at={K.D + 2.0} until={K.Li - 0.3} x={470} y={690} texto="se usaba contra el paludismo" tam={26} color={KC.ink} />
      <Chip T={T} at={K.D + 2.0} until={K.Li - 0.3} texto="México lo dejó de usar en 2000" x={330} y={1060} tam={32} borde={KC.ink} />
      <Nota T={T} at={K.D + 3.0} until={K.Li - 0.3} y={1610} ancho={860} tam={34} borde={KC.yellow} texto="En el suelo, la mitad del DDT tarda de 2 a 15 años en romperse" />
      <Chip T={T} at={K.Li + 0.1} until={K.En - 0.3} texto="POR DENTRO · LA MADERA" x={330} y={410} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Li + 1.2} until={K.En - 0.3} x={60} y={1540} texto="celulosa (fibras)" tam={28} color="#e8e0cf" />
      <Chip T={T} at={K.Li + 2.2} until={K.En - 0.3} texto="lignina · polímero desordenado" x={540} y={1100} tam={32} borde={KC.gold2} />
      <Etq T={T} at={K.En + 0.6} until={K.R - 0.3} x={130} y={980} texto="hifa" tam={30} color={DX.hifa} />
      <Chip T={T} at={K.En + 1.4} until={K.R - 0.3} texto="peroxidasas · fuera de la célula" x={500} y={410} tam={30} borde={DX.enz} />
      <Chip T={T} at={K.R + 0.4} until={K.P - 0.3} texto="radicales •" x={250} y={410} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.R + 1.6} until={K.P - 0.3} texto="poco específicas: no escogen" x={500} y={1100} tam={32} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ls - 0.3} anio="1985" quien="U. Estatal de Michigan" revista="Bumpus, Tien, Wright y Aust · Science" x={540} y={450} />
      <Etq T={T} at={K.E + 1.2} until={K.Ls - 0.3} x={60} y={690} texto="Phanerochaete chrysosporium" it tam={36} color={KC.ink} />
      <Nota T={T} at={K.E + 2.6} until={K.Ls - 0.3} y={795} ancho={880} tam={30} borde={KC.gold} texto="con DDT: todo indica que usa sus enzimas de la lignina, fuera de la célula" />
      <Chip T={T} at={K.Ls + 0.2} until={K.S - 0.3} texto="pasaron a CO₂" x={300} y={410} tam={36} borde={KC.mint} />
      <Chip T={T} at={K.Ls + 2.6} until={K.S - 0.3} texto="parte, no todo" x={540} y={1120} tam={36} borde={KC.red} />
      <Chip T={T} at={K.S + 0.4} until={K.Lm - 0.3} texto="1987 · también mineralizó DDT · en laboratorio" x={540} y={690} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.S + 1.0} until={K.Lm - 0.3} x={60} y={770} texto="seta · Pleurotus ostreatus" it tam={32} color={KC.ink} />
      <Grande T={T} at={K.Lm + 0.3} until={K.Su - 0.3} x={330} y={530} texto="9–23 %" etiqueta="se volvió CO₂" tam={140} color={KC.mint} />
      <TarjetaEstudio T={T} at={K.Lm + 2.6} until={K.Su - 0.3} anio="1990" quien="lindano y clordano" revista="AEM, 1990 · 30–60 días" x={540} y={1000} />
      <Chip T={T} at={K.Su + 0.2} until={K.C - 0.3} texto="2026 · PLOS ONE · sur de Suecia" x={350} y={410} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Su + 2.0} until={K.C - 0.3} texto="sin baja medible" x={590} y={810} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Su + 3.0} until={K.C - 0.3} texto="DDT viejo: poco disponible" x={350} y={490} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Su + 3.6} until={K.C - 0.3} texto="al hongo le costó colonizar el suelo" x={360} y={570} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="una pista para limpiar" x={330} y={410} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="no es magia" x={330} y={490} tam={34} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.D} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.D} until={K.Li} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Li} until={K.En} texto="1 nm (esquema)" largo={160} />
      <BarraEscala T={T} at={K.En} until={K.P} texto="hifa: 2–10 µm de ancho · moléculas no a escala" largo={110} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="1 nm (esquema)" largo={160} />
      <BarraEscala T={T} at={K.E} until={K.Ls} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.Ls} until={K.S} texto="1 nm (esquema)" largo={160} />
      <BarraEscala T={T} at={K.S} until={K.Lm} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Lm} until={K.Su} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.Su} until={K.C} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.D - 0.1} texto="Hongos así *pueden romper el DDT.*" />
      <Subtitulo T={T} idx={1} at={K.D + 0.1} until={K.Li - 0.1} texto="En el suelo *tarda años en irse.*" />
      <Subtitulo T={T} idx={2} at={K.Li + 0.1} until={K.En - 0.1} texto="Rompe la *lignina:* una red revuelta." />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.R - 0.1} texto="*Peroxidasas* fuera de sus hifas." />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="Radicales que *no escogen anillo.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si el anillo *es de un veneno?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.Ls - 0.1} texto="1985: *_Phanerochaete chrysosporium_*" />
      <Subtitulo T={T} idx={7} at={K.Ls + 0.1} until={K.S - 0.1} texto="Parte se volvió *dióxido de carbono.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.Lm - 0.1} texto="1987: la seta *_Pleurotus ostreatus,_* también." />
      <Subtitulo T={T} idx={9} at={K.Lm + 0.1} until={K.Su - 0.1} texto="Solo *del 9 al 23 %* se volvió gas." />
      <Subtitulo T={T} idx={10} at={K.Su + 0.1} until={K.C - 0.1} texto="Suecia, 2026: *sin baja medible.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una *pista para limpiar,* no magia." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.9, 'avatar_11_sorprendido', 'gancho'],
        [K.D + 1.4, K.D + 5.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Li + 2.0, K.Li + 4.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 0.2, K.R + 3.7, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ls + 0.3, K.Ls + 4.8, 'avatar_11_sorprendido', 'arriba-der'],
        [K.S + 0.3, K.S + 4.6, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Lm + 0.2, K.Lm + 5.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Su + 0.4, K.Su + 5.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="78" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DdtApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><DdtShot /></CompositionStage></div>;
}
window.DdtApp = DdtApp;
