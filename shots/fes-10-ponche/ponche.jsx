// Shot Festivo #10 · Posadas · Científico: lo que el hervor le hace al tejocote de tu ponche — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md (verificacion.md: APROBADO). El dibujo es esquemático: células, lámina media y cadenas de pectina simplificadas y fuera de escala.
const TEJ = '#f7a823', TEJ2 = '#e2701a', TEJ3 = '#ffd36b', CALIZ = '#5a3a1e', BARRO = '#b4643a', BARRO2 = '#8f4a26', PONCHE = '#b8561f';
const CANA = '#d9c46a', CANA2 = '#a8933c', GUAYABA = '#d8e07a', CANELA = '#8a4a22', ORO = '#f4c25a', CITO = '#ffe2a0';
const PAPEL = [KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink];

// Papel picado con estrellas de posada que se mece arriba de la pantalla
function PapelPicado({ T, y = 0, n = 7, alto = 150 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={PAPEL[i % 6]} opacity=".93" />
        <path d={Array.from({ length: 10 }, (_, k) => { const r = k % 2 ? 9 : 22, an = (k / 10) * Math.PI * 2 - Math.PI / 2; return `${k ? 'L' : 'M'} ${Math.cos(an) * r} ${alto * 0.4 + Math.sin(an) * r}`; }).join(' ') + ' Z'} fill={KC.blue} opacity=".85" />
        <path d={`M -24 ${alto * 0.7} l 12 -12 l 12 12 l 12 -12 l 12 12`} stroke={KC.blue} strokeWidth={6} fill="none" opacity=".85" />
      </g>; })}
  </svg>;
}

// Tejocote: fruto chico, redondo, amarillo-anaranjado, con el cáliz seco (estrellita café) en la punta.
// suave 0..1 = cocido (se aplasta un poco y se oscurece); aplasta 0..1 = la cuchara lo abre en grumitos; caliz: 'arriba' o 'frente'.
function Tejocote({ x, y, r = 40, rot = 0, suave = 0, aplasta = 0, id = 't', caliz = 'arriba', brillo = 1 }) {
  const sy = 1 - 0.12 * suave - 0.35 * aplasta, sx = 1 + 0.06 * suave + 0.25 * aplasta;
  const c1 = mixHex(TEJ3, '#e9a44a', suave), c2 = mixHex(TEJ, '#c9692a', suave), c3 = mixHex(TEJ2, '#9a4a1c', suave);
  const g = krng(r * 7 + 3);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <defs><radialGradient id={id} cx="38%" cy="34%" r="70%"><stop offset="0%" stopColor={c1} /><stop offset="55%" stopColor={c2} /><stop offset="100%" stopColor={c3} /></radialGradient></defs>
    <g transform={`scale(${sx} ${sy})`}>
      <circle r={r} fill={`url(#${id})`} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.08)} />
      {/* chapita rojiza y puntitos claros (lenticelas) */}
      <ellipse cx={r * 0.3} cy={r * 0.25} rx={r * 0.45} ry={r * 0.35} fill="#d84a1c" opacity={0.18 * (1 - suave)} />
      {Array.from({ length: 9 }, (_, i) => { const a = g() * Math.PI * 2, d = g() * r * 0.8; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={Math.max(1, r * 0.035)} fill="#fff1c2" opacity={0.7} />; })}
      <ellipse cx={-r * 0.35} cy={-r * 0.38} rx={r * 0.22} ry={r * 0.13} fill="#fff" opacity={0.45 * brillo} transform={`rotate(-30 ${-r * 0.35} ${-r * 0.38})`} />
      {/* cáliz seco: cinco sépalos cafés en estrella */}
      <g transform={caliz === 'frente' ? 'translate(0 0)' : `translate(0 ${-r * 0.92}) scale(1 0.55)`}>
        <circle r={r * 0.2} fill="#3d2814" />
        {Array.from({ length: 5 }, (_, k) => { const a = (k / 5) * Math.PI * 2 - Math.PI / 2; return <path key={k} d={`M 0 0 L ${Math.cos(a - 0.3) * r * 0.16} ${Math.sin(a - 0.3) * r * 0.16} L ${Math.cos(a) * r * 0.36} ${Math.sin(a) * r * 0.36} L ${Math.cos(a + 0.3) * r * 0.16} ${Math.sin(a + 0.3) * r * 0.16} Z`} fill={CALIZ} stroke="#2a1a0c" strokeWidth={Math.max(1, r * 0.03)} />; })}
      </g>
      {aplasta > 0 && Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2; return <circle key={'gr' + i} cx={Math.cos(a) * r * 0.55} cy={Math.sin(a) * r * 0.55} r={r * 0.14} fill={TEJ3} stroke={c3} strokeWidth={2} opacity={aplasta} />; })}
    </g>
  </g>;
}
// Pedazo de caña (trozo con sus nudos)
function Cana({ x, y, l = 150, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-l / 2} y={-14} width={l} height={28} rx={6} fill={CANA} stroke={KC.ink} strokeWidth={4} />
    {[-0.25, 0.25].map((f, i) => <rect key={i} x={l * f - 4} y={-16} width={8} height={32} rx={3} fill={CANA2} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Rajita de canela
function Canela({ x, y, l = 120, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-l / 2} y={-9} width={l} height={18} rx={9} fill={CANELA} stroke={KC.ink} strokeWidth={3} />
    <path d={`M ${-l / 2 + 6} -2 L ${l / 2 - 6} -2`} stroke="#b9703a" strokeWidth={4} />
  </g>;
}
// Olla de barro con ponche que hierve (centro = boca de la olla)
function Olla({ T, x, y, s = 1, children, hierve = 1 }) {
  const g = krng(5);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* leña y fuego */}
    {[-140, -70, 0, 70, 140].map((fx, i) => <path key={i} d={`M ${fx - 34} 330 Q ${fx} ${220 - 26 * Math.sin(T * 11 + i)} ${fx + 34} 330 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} />)}
    {[-110, 0, 110].map((lx, i) => <rect key={'l' + i} x={lx - 90} y={320} width={180} height={30} rx={12} fill="#6b4226" stroke={KC.ink} strokeWidth={5} transform={`rotate(${(i - 1) * 7} ${lx} 335)`} />)}
    {/* cuerpo de barro con asas */}
    <path d="M -290 -10 C -330 -6 -340 40 -300 50" stroke={BARRO2} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 290 -10 C 330 -6 340 40 300 50" stroke={BARRO2} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M -260 0 C -330 120 -260 300 0 310 C 260 300 330 120 260 0 Z" fill={BARRO} stroke={KC.ink} strokeWidth={9} />
    <path d="M -230 90 Q 0 130 230 90" stroke="#f3e3b0" strokeWidth={8} fill="none" opacity=".8" />
    {[-150, -50, 50, 150].map((px, i) => <circle key={i} cx={px} cy={150 + (i % 2) * 12} r={10} fill="#f3e3b0" opacity=".8" />)}
    <ellipse cx={0} cy={0} rx={262} ry={60} fill={BARRO2} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={6} rx={238} ry={48} fill={PONCHE} />
    <g>{children}</g>
    {hierve > 0 && Array.from({ length: 10 }, (_, i) => { const ph = (T * 1.4 + g()) % 1, bx = (g() - 0.5) * 400; return <circle key={'b' + i} cx={bx} cy={6 + (g() - 0.5) * 50} r={5 + 13 * ph} fill="none" stroke="#ffd9a8" strokeWidth={4} opacity={hierve * 0.9 * (1 - ph)} />; })}
    {hierve > 0 && [-120, 0, 120].map((vx, i) => <path key={'v' + i} d={`M ${vx} -50 q 22 -40 0 -80 q -22 -40 0 -80`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={hierve * 0.45 * (0.5 + 0.5 * Math.sin(T * 3 + i))} transform={`translate(0 ${-((T * 40 + i * 25) % 50)})`} />)}
  </g>;
}
// Frutas que flotan en el ponche (coordenadas relativas a la boca de la olla)
function FrutasPonche({ T, sin = -1 }) {
  const f = [[-160, 0, 'c', 20], [-60, 12, 't'], [40, -6, 'g'], [130, 10, 't'], [-120, 22, 'k', -15], [180, -4, 't'], [-10, 26, 'c', 70], [90, 22, 't']];
  return <g>{f.map(([fx, fy, tipo, rot], i) => { if (i === sin) return null; const b = Math.sin(T * 2.2 + i) * 6, dx = Math.sin(T * 0.9 + i * 2) * 10;
    if (tipo === 't') return <Tejocote key={i} x={fx + dx} y={fy + b} r={30} rot={i * 40} id={'pf' + i} suave={0.6} />;
    if (tipo === 'c') return <Cana key={i} x={fx + dx} y={fy + b} l={120} rot={rot} />;
    if (tipo === 'k') return <Canela key={i} x={fx + dx} y={fy + b} l={100} rot={rot} />;
    return <g key={i} transform={`translate(${fx + dx} ${fy + b})`}><path d="M -32 0 A 32 24 0 0 1 32 0 Z" fill={GUAYABA} stroke={KC.ink} strokeWidth={3} /><path d="M -24 -2 A 24 16 0 0 1 24 -2 Z" fill="#f2a3a0" />{[-12, 0, 12].map((sx, k) => <circle key={k} cx={sx} cy={-7} r={3} fill="#f6e2b0" />)}</g>; })}</g>;
}
// Cucharón de madera. (x, y) = centro de la cuchara
function Cucharon({ x, y, rot = 0, children, izq = false }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={izq ? -460 : 40} y={-14} width={420} height={28} rx={12} fill="#c9935a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={70} ry={46} fill="#c9935a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-4} rx={56} ry={30} fill="#a8733f" />
    {children}
  </g>;
}

// Tejido del tejocote por dentro: células infladas (infla), membrana que se rompe (rompe), lo disuelto que sale (fuga),
// pegamento dorado entre células (lamela) y células que se separan (separa). Coordenadas absolutas.
function Tejido({ T, cx = 540, cy = 860, cols = 6, rows = 7, r = 92, infla = 1, rompe = 0, fuga = 0, lamela = 1, separa = 0, seed = 3 }) {
  const g = krng(seed), cells = [];
  const W = r * 1.732;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const px = cx + (i - (cols - 1) / 2) * W + (j % 2 ? W / 2 : 0) - W / 4, py = cy + (j - (rows - 1) / 2) * r * 1.5;
    cells.push({ px, py, f: g(), f2: g(), f3: g() });
  }
  const hex = (x, y, rr, wob = 0, k0 = 0) => Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2 + Math.PI / 6, w = 1 - wob * (0.5 + 0.5 * Math.sin(k * 2.3 + k0 * 9)) * 0.22;
    const pr = k % 2 ? rr * 0.97 * w : rr * w; return `${(x + Math.cos(a) * pr).toFixed(1)},${(y + Math.sin(a) * pr).toFixed(1)}`; }).join(' ');
  return <g>
    {lamela > 0 && cells.map((c, k) => <polygon key={'l' + k} points={hex(c.px, c.py, r * 1.04)} fill={ORO} opacity={lamela * (1 - separa)} />)}
    {cells.map((c, k) => {
      const dx = (c.px - cx) * separa * 0.22 + Math.sin(T * 1.2 + k) * 10 * separa, dy = (c.py - cy) * separa * 0.22 + Math.cos(T * 1.1 + k) * 10 * separa;
      const x = c.px + dx, y = c.py + dy, rr = r * klerp(0.8, 0.9, infla) * (1 - 0.1 * separa);
      const wob = (1 - infla) * 0.9;
      const mem = 1 - kclamp(rompe * 1.6 - c.f * 0.6, 0, 1);
      return <g key={k}>
        <polygon points={hex(x, y, rr, wob, c.f)} fill={mixHex(CITO, '#e3a35a', 1 - infla)} fillOpacity={0.9} stroke="#fff5d6" strokeWidth={7} strokeLinejoin="round" />
        <polygon points={hex(x, y, rr * 0.86, wob, c.f)} fill="none" stroke="#7fd3ff" strokeWidth={4} strokeDasharray="12 8" opacity={mem} />
        <ellipse cx={x - rr * 0.25} cy={y - rr * 0.3} rx={rr * 0.3 * (0.6 + 0.4 * infla)} ry={rr * 0.15} fill="#fff" opacity={0.35 * infla} />
        <circle cx={x + rr * 0.3} cy={y + rr * 0.25} r={rr * 0.12} fill="#c98a3a" opacity=".7" />
        {fuga > 0 && Array.from({ length: 4 }, (_, q) => { const a = c.f3 * 6.28 + q * 1.57, ph = ((T * 0.7 + c.f2 + q * 0.25) % 1); const d = rr * (0.3 + ph * 1.1);
          return <circle key={q} cx={x + Math.cos(a) * d} cy={y + Math.sin(a) * d} r={q % 2 ? 6 : 8} fill={q % 2 ? '#ffd27a' : '#5ab8ff'} opacity={fuga * (1 - mem) * Math.sin(ph * Math.PI)} />; })}
      </g>;
    })}
  </g>;
}
// Lámina media en grande: dos paredes y cadenas de pectina (collares). corta 0..1 las rompe en pedacitos que se van flotando.
function LaminaMedia({ T, x = 540, y = 880, alto = 760, corta = 0, abre = 0 }) {
  const sep = 110 + abre * 260, n = 7;
  const g = krng(13);
  const chains = Array.from({ length: n }, (_, i) => {
    const yy = y - alto / 2 + 70 + i * (alto - 140) / (n - 1);
    const beads = Array.from({ length: 9 }, (_, k) => { const u = k / 8; return [klerp(-sep + 20, sep - 20, u), Math.sin(u * Math.PI * 2 + i) * 18]; });
    return beads.map(([bx, by], k) => { const pedazo = Math.floor(k / 3), drift = corta * (1 + g() * 0.5), ang = (pedazo - 1) * 0.9 + i;
      const ox = corta * Math.cos(ang) * 120 * drift, oy = -corta * (60 + pedazo * 40 + i * 6) * drift;
      return { x: x + bx + ox, y: yy + by + oy, rompe: corta > 0.05 && (k === 3 || k === 6) }; });
  });
  return <g>
    {/* paredes de las dos células */}
    <path d={`M ${x - sep} ${y - alto / 2} Q ${x - sep - 30} ${y} ${x - sep} ${y + alto / 2} L ${x - sep - 520} ${y + alto / 2} L ${x - sep - 520} ${y - alto / 2} Z`} fill={CITO} fillOpacity=".85" stroke="#fff5d6" strokeWidth={14} />
    <path d={`M ${x + sep} ${y - alto / 2} Q ${x + sep + 30} ${y} ${x + sep} ${y + alto / 2} L ${x + sep + 520} ${y + alto / 2} L ${x + sep + 520} ${y - alto / 2} Z`} fill={CITO} fillOpacity=".85" stroke="#fff5d6" strokeWidth={14} />
    <rect x={x - sep + 8} y={y - alto / 2} width={(sep - 8) * 2} height={alto} fill={ORO} opacity={0.22 * (1 - corta)} />
    {chains.map((b, i) => <g key={i}>
      {b.map((p, k) => k < b.length - 1 && !(corta > 0.05 && (k === 2 || k === 5)) ? <line key={'s' + k} x1={p.x} y1={p.y} x2={b[k + 1].x} y2={b[k + 1].y} stroke="#c98a1e" strokeWidth={6} /> : null)}
      {b.map((p, k) => <circle key={k} cx={p.x} cy={p.y} r={15} fill={ORO} stroke="#8a5a10" strokeWidth={3} opacity={1 - corta * 0.5} />)}
    </g>)}
  </g>;
}
// Termómetro chico (0..100 °C)
function Termo({ x, y, temp }) {
  const h = klerp(20, 300, kclamp(temp / 100, 0, 1));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-330} width={52} height={360} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={40} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    <rect x={-13} y={20 - h} width={26} height={h + 20} rx={13} fill={KC.red} />
    <text x={44} y={-300} style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{Math.round(temp)} °C</text>
  </g>;
}
// Frasco de jalea/mermelada. cuaja 0..1 (líquido → gel que tiembla)
function Frasco({ T, x, y, color = '#d8342c', cuaja = 0, etiqueta }) {
  const tiembla = cuaja > 0.9 ? Math.sin(T * 14) * 3 * Math.exp(-((T * 2) % 3)) : 0;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-95} y={-150} width={190} height={250} rx={30} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M -85 ${klerp(-60, -100, cuaja) + tiembla} Q 0 ${klerp(-60, -125, cuaja) + tiembla} 85 ${klerp(-60, -100, cuaja) + tiembla} L 85 90 Q 0 104 -85 90 Z`} fill={color} opacity={klerp(0.65, 0.95, cuaja)} />
    <rect x={-105} y={-195} width={210} height={50} rx={12} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={-20} width={140} height={70} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={24} textAnchor="middle" style={{ font:`900 26px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>
  </g>;
}
// Árbol de tejocote cargado de frutos
function Arbol({ T, x, y, s = 1, frutos = 1 }) {
  const g = krng(41);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -24 0 L -18 -220 Q -80 -280 -120 -300 M -18 -220 Q 40 -300 90 -320 M -18 -180 L 24 0 Z" stroke="#6b4226" strokeWidth={30} fill="none" strokeLinecap="round" />
    <rect x={-30} y={-230} width={50} height={230} rx={14} fill="#7a4e2c" stroke={KC.ink} strokeWidth={6} />
    {[[-150, -330, 150], [40, -380, 170], [150, -300, 130], [-40, -260, 140], [-200, -250, 110], [200, -230, 110]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy + Math.sin(T * 1.3 + i) * 4} r={r} fill={i % 2 ? '#3f8a3a' : '#4fa04a'} stroke={KC.ink} strokeWidth={6} />)}
    {Array.from({ length: 16 }, (_, i) => { const a = g() * Math.PI * 2, d = 60 + g() * 200; const fx = Math.cos(a) * d * 1.1, fy = -300 + Math.sin(a) * d * 0.55;
      return <g key={i} opacity={kclamp(frutos * 2 - i / 16, 0, 1)}><Tejocote x={fx} y={fy} r={20} id={'ar' + i} rot={i * 30} /></g>; })}
  </g>;
}
// Piñata de estrella
function Pinata({ T, x, y, s = 1 }) {
  const a = Math.sin(T * 2) * 8;
  return <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <line x1={0} y1={-300} x2={0} y2={-80} stroke={KC.ink} strokeWidth={4} />
    <circle r={80} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, k) => { const an = (k / 7) * Math.PI * 2 - Math.PI / 2, c = PAPEL[k % 6]; return <g key={k}>
      <path d={`M ${Math.cos(an - 0.22) * 70} ${Math.sin(an - 0.22) * 70} L ${Math.cos(an) * 190} ${Math.sin(an) * 190} L ${Math.cos(an + 0.22) * 70} ${Math.sin(an + 0.22) * 70} Z`} fill={c} stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${Math.cos(an) * 190} ${Math.sin(an) * 190} l ${Math.cos(an + 0.4) * 40} ${Math.sin(an + 0.4) * 40} M ${Math.cos(an) * 190} ${Math.sin(an) * 190} l ${Math.cos(an - 0.4) * 40} ${Math.sin(an - 0.4) * 40}`} stroke={PAPEL[(k + 2) % 6]} strokeWidth={6} />
    </g>; })}
  </g>;
}
// Rebanada de seta (Pleurotus): abanico color crema con laminillas. seca 0..1 = se arruga, encoge y oscurece
function Seta({ x, y, s = 1, seca = 0, capa = 0, rot = 0 }) {
  const k = 1 - 0.28 * seca, col = mixHex('#efe6d6', '#8a7a62', seca);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k} ${s * k * (1 - 0.12 * seca)})`}>
    <path d={`M 0 50 C -70 40 -110 -10 -90 -50 C ${-60 + seca * 10} -80 ${60 - seca * 10} -82 90 -50 C 110 -10 70 40 0 50 Z`} fill={col} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 9 }, (_, i) => { const a = Math.PI + (i + 1) / 10 * Math.PI; return <path key={i} d={`M 0 40 Q ${Math.cos(a) * 50} ${30 + Math.sin(a) * 50 + seca * 8} ${Math.cos(a) * 88} ${28 + Math.sin(a) * 76}`} stroke={mixHex('#cbbfa6', '#5e5242', seca)} strokeWidth={3} fill="none" />; })}
    <rect x={-14} y={36} width={28} height={30} rx={8} fill={col} stroke={KC.ink} strokeWidth={4} />
    {capa > 0 && <path d="M 0 50 C -70 40 -110 -10 -90 -50 C -60 -80 60 -82 90 -50 C 110 -10 70 40 0 50 Z" fill="rgba(190,230,255,.28)" stroke="#bfe8ff" strokeWidth={6} opacity={capa} />}
  </g>;
}
// Adelfa amarilla (Thevetia peruviana): flor amarilla de trompeta y hojas angostas
function Adelfa({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-40, 20, 70, -90].map((a, i) => <path key={i} d="M 0 0 C 30 -60 40 -150 10 -230 C -10 -150 -10 -60 0 0 Z" fill="#3f8a3a" stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
    <g transform={`translate(0 -40) rotate(${Math.sin(T * 1.5) * 4})`}>
      <path d="M -26 60 L -40 -40 L 40 -40 L 26 60 Z" fill="#f2c21c" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 5 }, (_, k) => { const a = (k / 5) * Math.PI * 2 - Math.PI / 2; return <path key={k} d={`M 0 -60 C ${Math.cos(a - 0.5) * 90} ${-60 + Math.sin(a - 0.5) * 90} ${Math.cos(a + 0.2) * 120} ${-60 + Math.sin(a + 0.2) * 120} ${Math.cos(a + 0.5) * 60} ${-60 + Math.sin(a + 0.5) * 60} Z`} fill="#ffd52e" stroke={KC.ink} strokeWidth={4} />; })}
      <circle cx={0} cy={-60} r={22} fill="#e8a01a" stroke={KC.ink} strokeWidth={4} />
    </g>
  </g>;
}
// Frasco de cápsulas con etiqueta. voltea 0..1 (la etiqueta se cae y se ve lo de adentro)
function FrascoCapsulas({ T, x, y, voltea = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-230} width={300} height={430} rx={40} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-300} width={240} height={80} rx={16} fill="#2c2f38" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 16 }, (_, i) => { const q = krng(i + 5); return <rect key={i} x={-110 + q() * 190} y={-180 + q() * 350} width={60} height={26} rx={13} fill={i % 2 ? '#f2c21c' : '#8a6a2a'} stroke={KC.ink} strokeWidth={3} transform={`rotate(${q() * 180} ${-80 + q() * 190} ${-170 + q() * 350})`} opacity={0.9} />; })}
    <g transform={`translate(${voltea * 520} ${-voltea * 420}) rotate(${voltea * 50})`} opacity={1 - voltea}>
      <rect x={-140} y={-110} width={280} height={190} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={-50} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>RAÍZ DE</text>
      <text x={0} y={0} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={TEJ2}>TEJOCOTE</text>
      <text x={0} y={46} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="#5a524a">suplemento</text>
    </g>
  </g>;
}

function Ponche() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Fi: CUES.Firme, Me: CUES.Membrana, Pg: CUES.Pegamento, P: CUES.Pregunta, De: CUES.Despega, Pc: CUES.Pectina, Na: CUES.Nativo, E: CUES.Estudio, Se: CUES.Setas, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: el cucharón saca un tejocote y lo aprieta
  const saca = kprog(T, K.G + 0.2, K.G + 1.1, kEase.suave), aprieta = kprog(T, K.G + 1.9, K.G + 2.6, kEase.sale);
  const OLLA = (sacaU, apr, tej = true) => <g>
    <Olla T={T} x={560} y={820} s={1.05}><FrutasPonche T={T} sin={1} /></Olla>
    <Cucharon x={klerp(470, 400, sacaU)} y={klerp(830, 600, sacaU)} rot={klerp(10, 24, sacaU)} izq>
      {tej && <Tejocote x={0} y={-30} r={56} id="gt" suave={0.7} aplasta={apr} />}
    </Cucharon>
  </g>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tejocote del ponche no se deshace: se despega */}
      <Escena T={T} a={K.G} b={K.Fi} zoom={0.06}>
        <FondoLunares color={KC.orange} />
        <PapelPicado T={T} />
        {svg(OLLA(saca, aprieta))}
      </Escena>
      {/* 2 · crudo: células infladas y pegadas */}
      <Escena T={T} a={K.Fi} b={K.Me}>
        <FondoLunares color={KC.mint} />
        {svg(<Tejocote x={330} y={klerp(-200, 960, kprog(T, K.Fi, K.Fi + 0.6, kEase.rebote))} r={170} id="fi" rot={Math.sin(T * 2) * 4} />)}
        <Lupa T={T} at={K.Fi + 1.2} until={K.Me - 0.2} x={760} y={740} r={230} fx={360} fy={990} tinte={KC.yellow} etiqueta="POR DENTRO · crudo"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(.55) translate(-540 -860)`}><Tejido T={Tl} /></g></svg>} />
      </Escena>
      {/* 3 · al hervir: se rompen las membranas, sale el agua y lo disuelto */}
      <Escena T={T} a={K.Me} b={K.Pg} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(255,200,120,.18)" />
        {svg((() => { const temp = klerp(20, 96, kprog(T, K.Me + 0.2, K.Me + 1.6, kEase.suave)), rompe = kprog(T, K.Me + 1.6, K.Me + 3.2), infla = 1 - kprog(T, K.Me + 2.4, K.Me + 4.6, kEase.suave);
          return <g><Tejido T={T} rompe={rompe} fuga={kprog(T, K.Me + 1.8, K.Me + 2.4)} infla={infla} /><Termo x={960} y={1700} temp={temp} /></g>; })())}
      </Escena>
      {/* 4 · el pegamento entre célula y célula: la lámina media, rica en pectina */}
      <Escena T={T} a={K.Pg} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<g>
          <g opacity={1 - kprog(T, K.Pg + 0.6, K.Pg + 1.4)}><Tejido T={T} infla={0.3} rompe={1} lamela={1 + 0.4 * Math.sin(T * 4)} /></g>
          <g opacity={kprog(T, K.Pg + 0.9, K.Pg + 1.6)}><LaminaMedia T={T} /></g>
        </g>)}
      </Escena>
      {/* 5 · pregunta: ¿qué le hace el hervor al pegamento? */}
      <Escena T={T} a={K.P} b={K.De} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        {svg(<g>
          <g transform="translate(-130 -60)"><Olla T={T} x={400} y={1000} s={0.85}><FrutasPonche T={T} /></Olla></g>
          <text x={170} y={640} textAnchor="middle" style={{ font:`400 360px ${KF.titulo}` }} fill={KC.orange} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 170 520)`}>?</text>
        </g>)}
      </Escena>
      {/* 6 · la pectina se rompe y se disuelve; las células se separan */}
      <Escena T={T} a={K.De} b={K.Pc} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg((() => { const corta = kprog(T, K.De + 0.3, K.De + 2.2, kEase.suave), sep = kprog(T, K.De + 2.4, K.De + 4.6, kEase.suave);
          return <g>
            <g opacity={1 - kprog(T, K.De + 2.0, K.De + 2.6)}><LaminaMedia T={T} corta={corta} abre={corta} /></g>
            <g opacity={kprog(T, K.De + 2.2, K.De + 2.8)}><Tejido T={T} infla={0.3} rompe={1} lamela={1} separa={sep} /></g>
          </g>; })())}
      </Escena>
      {/* 7 · el tejocote, cargado de pectina: la industria la usa para cuajar jaleas y mermeladas */}
      <Escena T={T} a={K.Pc} b={K.Na}>
        <FondoLunares color={KC.pink} />
        {svg((() => { const cu = kprog(T, K.Pc + 3.0, K.Pc + 4.6, kEase.suave);
          return <g>
            <Tejocote x={300} y={940} r={150} id="pc" rot={Math.sin(T * 2) * 5} />
            {Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.Pc + 2.0 + i * 0.08, K.Pc + 3.0 + i * 0.08, kEase.suave); return u > 0 && u < 1 ? <circle key={i} cx={klerp(380, 700 + (i % 2) * 220, u)} cy={klerp(940, 900, u) - Math.sin(u * Math.PI) * 160} r={12} fill={ORO} stroke="#8a5a10" strokeWidth={3} /> : null; })}
            <Frasco T={T} x={720} y={1000} color="#d8342c" cuaja={cu} etiqueta="JALEA" />
            <Frasco T={T} x={940} y={1000} color="#f08a1c" cuaja={cu} etiqueta="MERMELADA" />
          </g>; })())}
      </Escena>
      {/* 8 · nativo de México; fruto en noviembre y diciembre */}
      <Escena T={T} a={K.Na} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg((() => { const eje = kprog(T, K.Na + 0.6, K.Na + 1.6), ej = [[-105.2, 20.6], [-103.4, 19.7], [-101.5, 19.6], [-99.6, 19.2], [-97.9, 19.1], [-96.6, 19.3]].map(([lo, la]) => mxProy(lo, la));
          return <g>
            <MapaMexico x={40} y={430} ancho={860} conCA={false}>
              <path d={ej.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ')} stroke={KC.leaf} strokeWidth={46} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={0.85 * eje} strokeDasharray={`${eje * 1400} 3000`} />
            </MapaMexico>
            <g opacity={kprog(T, K.Na + 1.8, K.Na + 2.4)}><Arbol T={T} x={260} y={1180} s={0.8} frutos={kprog(T, K.Na + 2.0, K.Na + 3.4)} /></g>
            <g opacity={kprog(T, K.Na + 3.4, K.Na + 4.0)}><Pinata T={T} x={830} y={980} s={0.75} /></g>
          </g>; })())}
      </Escena>
      {/* 9 · el estudio: Chapingo, 2016 — pectina de tejocote + cera de candelilla = capa comestible para setas */}
      <Escena T={T} a={K.E} b={K.Se}>
        <FondoLunares color={KC.yellow} />
        {svg((() => { const mez = kprog(T, K.E + 2.6, K.E + 3.8), brocha = kprog(T, K.E + 4.2, K.E + 6.4);
          return <g>
            <g transform="translate(300 1000)">
              <path d="M -130 -170 L 130 -170 L 110 170 Q 0 186 -110 170 Z" fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={7} />
              <path d={`M -122 ${klerp(60, -40, mez)} L 122 ${klerp(60, -40, mez)} L 110 170 Q 0 186 -110 170 Z`} fill={mixHex('#f4e4b0', '#e9d690', mez)} opacity=".9" />
              {Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.E + 1.2 + i * 0.1, K.E + 2.2 + i * 0.1); return u > 0 && u < 1 ? <rect key={i} x={(i % 2 ? 60 : -80) + Math.sin(i) * 20} y={klerp(-360, 0, u)} width={16} height={10} rx={3} fill={i % 2 ? '#e8d27a' : '#fff'} stroke={KC.ink} strokeWidth={2} /> : null; })}
              <rect x={-8} y={-260} width={16} height={260} rx={6} fill="#c9ced8" stroke={KC.ink} strokeWidth={4} transform={`rotate(${Math.sin(T * 7) * 18 * mez})`} />
            </g>
            {[0, 1, 2].map((k) => <Seta key={k} x={640 + k * 150} y={1080 - (k % 2) * 40} s={0.8} capa={kclamp(brocha * 3 - k, 0, 1)} rot={k * 12 - 10} />)}
            {brocha > 0 && brocha < 1 && <g transform={`translate(${klerp(600, 960, brocha)} ${1000 + Math.sin(brocha * 30) * 20}) rotate(30)`}>
              <rect x={-12} y={-200} width={24} height={150} rx={8} fill="#8a5a33" stroke={KC.ink} strokeWidth={4} />
              <rect x={-26} y={-60} width={52} height={70} rx={6} fill="#e8d27a" stroke={KC.ink} strokeWidth={4} />
            </g>}
          </g>; })())}
      </Escena>
      {/* 10 · 20 días a 4 °C: con capa pierden menos peso y firmeza (también se arrugan, pero menos) */}
      <Escena T={T} a={K.Se} b={K.Da}>
        <FondoLunares color={KC.mint} />
        {svg((() => { const d = kprog(T, K.Se + 0.6, K.Se + 3.6);
          return <g>
            <rect x={70} y={560} width={940} height={700} rx={40} fill="#eef6fb" stroke={KC.ink} strokeWidth={9} />
            <rect x={100} y={590} width={880} height={640} rx={26} fill="#d9eef8" />
            <line x1={540} y1={600} x2={540} y2={1220} stroke="#a9c9da" strokeWidth={6} strokeDasharray="14 12" />
            {[0, 1].map((lado) => <g key={lado}>
              <rect x={lado ? 590 : 130} y={1060} width={360} height={40} rx={10} fill="#c9ced8" stroke={KC.ink} strokeWidth={5} />
              {[0, 1, 2].map((k) => <Seta key={k} x={(lado ? 650 : 190) + k * 120} y={990 - (k % 2) * 30} s={0.62} seca={d * (lado ? 0.45 : 1)} capa={lado} rot={k * 12 - 10} />)}
            </g>)}
            <text x={310} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>sin capa</text>
            <text x={770} y={700} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>con capa</text>
          </g>; })())}
      </Escena>
      {/* 11 · ojo: suplementos de «raíz de tejocote» que traían adelfa amarilla (FDA) */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        {svg((() => { const vol = kprog(T, K.Da + 2.4, K.Da + 3.2, kEase.suave);
          return <g>
            <FrascoCapsulas T={T} x={420} y={1000} voltea={vol} />
            <g opacity={kprog(T, K.Da + 3.0, K.Da + 3.6)}><Adelfa T={T} x={420} y={1020} s={1.1} /></g>
            <g opacity={kprog(T, K.Da + 4.2, K.Da + 4.6)} transform={`translate(830 ${780}) rotate(${-8 + Math.sin(T * 2) * 2})`}>
              <path d="M 0 -120 L 110 80 L -110 80 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
              <text x={0} y={60} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>!</text>
            </g>
          </g>; })())}
      </Escena>
      {/* 12 · cierre: la misma olla; por dentro, las células ya despegadas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <PapelPicado T={T} />
        {svg(OLLA(1, 1))}
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={800} y={1590} r={190} fx={400} fy={570} tinte={KC.yellow} etiqueta="POR DENTRO · sin pegamento"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(.45) translate(-540 -860)`}><Tejido T={Tl} infla={0.3} rompe={1} separa={1} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Fi, titulo: 'Crudo' }, { at: K.Me, titulo: 'El hervor' }, { at: K.Pc, titulo: 'La pectina' }, { at: K.E, titulo: 'El estudio' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Fi - 0.2} texto="Especial Posadas" x={540} y={1700} tam={40} borde={KC.yellow} />
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.0} until={K.G + 2.8} texto="¿se deshace?" x={540} y={1480} tam={50} />
      <Chip T={T} at={K.G + 2.7} until={K.Fi - 0.3} texto="se despega" x={540} y={1490} tam={52} borde={KC.yellow} />
      <Etq T={T} at={K.Fi + 0.6} until={K.Fi + 1.3} x={520} y={1080} texto="tejocote crudo" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Fi + 0.8} until={K.Fi + 2.0} x={420} y={790} texto="cáliz seco" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Fi + 2.0} until={K.Me - 0.3} texto="células infladas de agua" x={540} y={1500} tam={40} borde={KC.cyan} />
      {T > K.Me - 0.3 && T < K.P + 0.2 && <Escala T={T} z={1} pxPorMm={2400} x={60} y={1440} />}
      <Etq T={T} at={K.Me + 0.3} until={K.Me + 2.0} x={60} y={1560} texto="membrana (azul)" tam={32} color="#7fd3ff" />
      <Etq T={T} at={K.Me + 2.0} until={K.Pg - 0.3} x={60} y={1560} texto="sale el agua y lo disuelto" tam={32} color="#7fd3ff" />
      <Chip T={T} at={K.Me + 3.6} until={K.Pg - 0.3} texto="se desinflan" x={480} y={1680} tam={46} borde="#7fd3ff" />
      <Etq T={T} at={K.Pg + 1.6} until={K.P - 0.3} x={60} y={480} texto="lámina media" tam={34} color={ORO} />
      <Chip T={T} at={K.Pg + 2.2} until={K.P - 0.3} texto="pegamento rico en pectina" x={540} y={1560} tam={42} borde={ORO} />
      <Etq T={T} at={K.De + 0.6} until={K.De + 2.2} x={60} y={480} texto="la pectina se rompe" tam={32} color={ORO} />
      <Chip T={T} at={K.De + 3.0} until={K.Pc - 0.3} texto="se despega" x={540} y={1560} tam={52} borde={KC.yellow} />
      <Medidor T={T} at={K.Pc + 0.6} until={K.Pc + 2.6} x={90} y={1440} ancho={900} etiqueta="pectina" valor={(t) => kprog(t, K.Pc + 0.8, K.Pc + 2.2, kEase.suave)} texto={() => 'alta'} color={ORO} />
      <Chip T={T} at={K.Pc + 3.2} until={K.Na - 0.3} texto="cuaja jaleas y mermeladas" x={540} y={1560} tam={42} borde={KC.yellow} />
      <Etq T={T} at={K.Na + 1.2} until={K.E - 0.3} x={600} y={760} texto="Eje Neovolcánico" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Na + 0.3} until={K.E - 0.3} texto="nativo de México" x={540} y={1500} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.Na + 3.0} until={K.E - 0.3} texto="fruto: nov – dic" x={540} y={1620} tam={46} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2016" quien="U. A. Chapingo · Texcoco" revista="Agrociencia" x={360} y={560} />
      <Etq T={T} at={K.E + 1.2} until={K.Se - 0.3} x={110} y={1440} texto="pectina + cera de candelilla" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 4.2} until={K.Se - 0.3} x={600} y={900} it texto="Pleurotus ostreatus" tam={28} color={KC.ink} />
      <Chip T={T} at={K.E + 3.0} until={K.Se - 0.3} texto="capa comestible" x={540} y={1560} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.Se + 0.3} until={K.Da - 0.3} texto={`día ${Math.max(0, Math.min(20, Math.round(kprog(T, K.Se + 0.6, K.Se + 3.6) * 20)))} · 4 °C`} x={540} y={470} tam={44} borde={KC.cyan} mono />
      <Chip T={T} at={K.Se + 3.8} until={K.Da - 0.3} texto="con capa: pierde menos" x={540} y={1440} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.Se + 4.2} until={K.Da - 0.3} x={230} y={1545} texto="2 % pectina + 1 % cera" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Da + 0.4} until={K.Ci - 0.3} texto="FDA · alerta desde 2024" x={540} y={470} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Da + 3.6} until={K.Ci - 0.3} x={600} y={1110} texto="adelfa amarilla" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Da + 3.9} until={K.Ci - 0.3} x={600} y={1160} it texto="Thevetia peruviana" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Da + 4.8} until={K.Ci - 0.3} texto="no era tejocote: era adelfa" x={540} y={1560} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.Ci + 2.8} until={K.Ou} texto="se despega" x={540} y={1490} tam={46} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Fi - 0.1} texto="No se deshace: *se despega.*" />
      <Subtitulo T={T} idx={1} at={K.Fi + 0.1} until={K.Me - 0.1} texto="Crudo: células *infladas y pegadas.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.Pg - 0.1} texto="El calor *rompe las membranas.*" />
      <Subtitulo T={T} idx={3} at={K.Pg + 0.1} until={K.P - 0.1} texto="Un pegamento: *pectina.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.De - 0.1} texto="¿Y qué le hace *el hervor?*" />
      <Subtitulo T={T} idx={5} at={K.De + 0.1} until={K.Pc - 0.1} texto="Se disuelve: *las células se separan.*" />
      <Subtitulo T={T} idx={6} at={K.Pc + 0.1} until={K.Na - 0.1} texto="El tejocote: *cargado de pectina.*" />
      <Subtitulo T={T} idx={7} at={K.Na + 0.1} until={K.E - 0.1} texto="Nativo, y *da fruto en diciembre.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Se - 0.1} texto="Chapingo, 2016: *capa comestible.*" />
      <Subtitulo T={T} idx={9} at={K.Se + 0.1} until={K.Da - 0.1} texto="Con capa *pierden menos.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.Ci - 0.1} texto="«Raíz de tejocote»: *era adelfa.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="El hervor *le disolvió el pegamento.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Firme + 0.5, CUES.Firme + 4.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Membrana + 0.6, CUES.Membrana + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Despega + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Pectina + 0.5, CUES.Pectina + 5.6, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Nativo + 0.6, CUES.Nativo + 5.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Estudio + 0.6, CUES.Estudio + 5.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Dato + 0.4, CUES.Dato + 6.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" serie="Festivo" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PoncheApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Ponche /></CompositionStage></div>;
}
window.PoncheApp = PoncheApp;
