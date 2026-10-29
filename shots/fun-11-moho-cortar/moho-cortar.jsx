// Shot Fungi Mati #11 · ¿Le quitas el moho y te comes el resto? — NARRADO (gancho 6 "¿Por qué NO…?" + N2/N1 "qué sí sirve").
// Guion y fuentes: guion.md · verificacion.md (USDA FSIS "Molds on Food"; Rychlik y Schieberle 2001). El dibujo es esquemático.

const MC = { miga:'#f4dfb2', miga2:'#e3c68e', corteza:'#c9782f', moho:'#3f8f6e', moho2:'#1f5e48', moho3:'#a8dcc0', pelusa:'#eef3ea',
  rayos:'#0b1a2a', hifa:'#c8ffe8', toxina:'#ff3b2f', queso:'#f2b233', queso2:'#d9921c', zana:'#ff8a1f', jito:'#e8332a', pim:'#e0262b', verde:'#3fae3a' };

// Mancha de moho vista de frente: pelusa blanca + centro verde azulado + puntitos (esporas). Esquemática.
function Mancha({ x, y, r = 60, seed = 3, o = 1 }) {
  if (o <= 0 || r <= 1) return null;
  const g = krng(seed), n = 20;
  const borde = (k) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * k * (0.85 + g() * 0.3); return `${i ? 'L' : 'M'} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  const d1 = borde(1.18), d2 = borde(0.9);
  return <g opacity={o}>
    <path d={d1} fill={MC.pelusa} opacity=".85" strokeLinejoin="round" />
    <path d={d2} fill={MC.moho} />
    {Array.from({ length: 34 }, (_, i) => { const a = i * 2.4, dd = Math.sqrt(i / 34) * r * 0.8; return <circle key={i} cx={x + Math.cos(a) * dd} cy={y + Math.sin(a) * dd} r={r * 0.05 + (i % 3)} fill={i % 2 ? MC.moho2 : MC.moho3} />; })}
  </g>;
}

// Rebanada de pan de frente. Centro ≈ (x, y). mancha 0..1 · raspado 0..1 (queda la marca) · rx 0..1 = se ven los hilos por dentro.
function PanFrente({ T, x, y, s = 1, mancha = 1, raspado = 0, rx = 0 }) {
  const g = krng(21);
  const hoyos = Array.from({ length: 50 }, () => ({ x: 230 + g() * 620, y: 470 + g() * 720, rx: 6 + g() * 22, ry: 4 + g() * 12, r: g() * 180 }));
  const red = kArbolRadial(5, 300, true);
  const MX = 600, MY = 640;
  return <g transform={`translate(${x} ${y}) scale(${s}) translate(-540 -800)`}>
    <path d="M190 1240 L190 640 C150 470 260 360 420 380 C470 330 610 330 660 380 C820 360 930 470 890 640 L890 1240 Z" fill={MC.corteza} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M222 1212 L222 650 C190 500 285 410 425 425 C480 380 600 380 655 425 C795 410 890 500 858 650 L858 1212 Z" fill={MC.miga} />
    {hoyos.map((h, i) => <ellipse key={i} cx={h.x} cy={h.y} rx={h.rx} ry={h.ry} transform={`rotate(${h.r} ${h.x} ${h.y})`} fill={MC.miga2} />)}
    {rx > 0 && <g opacity={rx}>
      <path d="M222 1212 L222 650 C190 500 285 410 425 425 C480 380 600 380 655 425 C795 410 890 500 858 650 L858 1212 Z" fill={MC.rayos} opacity=".72" />
      {red.map((sg, i) => <line key={i} x1={MX + sg.x1 * 0.09} y1={MY + sg.y1 * 0.09} x2={MX + sg.x2 * 0.09} y2={MY + sg.y2 * 0.09} stroke={MC.hifa} strokeWidth={3.5} strokeLinecap="round" opacity={0.9 * kprog(rx, sg.b * 0.7, sg.b * 0.7 + 0.3)} />)}
    </g>}
    {raspado > 0 && <ellipse cx={MX} cy={MY} rx={95} ry={80} fill="#d9c08c" opacity={raspado * 0.9} />}
    <Mancha x={MX} y={MY} r={82} seed={7} o={mancha} />
  </g>;
}

// Cuchillo de cocina. (x, y) = punta de la hoja; ang en grados.
function Cuchillo({ x, y, ang = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M 0 0 L 300 -40 L 300 18 Q 120 22 0 0 Z" fill="#e6e9ee" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 40 -4 L 290 -34" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
    <rect x={296} y={-46} width={190} height={66} rx={18} fill="#3b2a20" stroke={KC.ink} strokeWidth={7} />
    {[340, 400, 450].map((cx) => <circle key={cx} cx={cx} cy={-13} r={8} fill="#c9c2b0" />)}
  </g>;
}

// Bote de basura. tapa 0..1 = se abre.
function Bote({ x, y, s = 1, tapa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -150 L 110 -150 L 90 120 L -90 120 Z" fill="#7d8792" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-50, 0, 50].map((dx) => <line key={dx} x1={dx} y1={-120} x2={dx * 0.85} y2={95} stroke="#5d6670" strokeWidth={10} strokeLinecap="round" />)}
    <g transform={`rotate(${-tapa * 55} -120 -150)`}>
      <rect x={-125} y={-178} width={250} height={30} rx={10} fill="#9aa3ad" stroke={KC.ink} strokeWidth={7} />
      <rect x={-30} y={-198} width={60} height={22} rx={8} fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}

// Alimentos (de frente, con su manchita de moho). Base en (x, y) = centro.
function Alimento({ tipo, x, y, s = 1, mancha = 1, seed = 1 }) {
  const t = `translate(${x} ${y}) scale(${s})`;
  const M = (mx, my, r = 26) => <Mancha x={mx} y={my} r={r} seed={seed + 11} o={mancha} />;
  if (tipo === 'pan') return <g transform={t}>
    <path d="M -80 80 L -80 -10 C -100 -70 -40 -95 0 -88 C 40 -95 100 -70 80 -10 L 80 80 Z" fill={MC.corteza} stroke={KC.ink} strokeWidth={6} />
    <path d="M -66 68 L -66 -8 C -82 -58 -34 -78 0 -72 C 34 -78 82 -58 66 -8 L 66 68 Z" fill={MC.miga} />{M(10, -10)}</g>;
  if (tipo === 'mermelada') return <g transform={t}>
    <rect x={-62} y={-60} width={124} height={140} rx={22} fill="#9b1d4a" stroke={KC.ink} strokeWidth={6} />
    <rect x={-48} y={-12} width={96} height={50} rx={8} fill={KC.paper} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={-62} rx={62} ry={18} fill="#c2295e" stroke={KC.ink} strokeWidth={6} />{M(4, -64, 18)}</g>;
  if (tipo === 'yogur') return <g transform={t}>
    <path d="M -64 -60 L 64 -60 L 48 80 L -48 80 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-50} y={-10} width={100} height={36} fill="#9fd8ff" />
    <ellipse cx={0} cy={-60} rx={64} ry={16} fill="#fbf6ea" stroke={KC.ink} strokeWidth={6} />{M(-6, -62, 16)}</g>;
  if (tipo === 'jitomate') return <g transform={t}>
    <ellipse cx={0} cy={10} rx={82} ry={72} fill={MC.jito} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-30} cy={-18} rx={18} ry={10} fill="#fff" opacity=".4" />
    <path d="M 0 -60 L -26 -76 L -8 -58 L -34 -50 L -4 -50 L 0 -30 L 6 -50 L 34 -50 L 10 -58 L 26 -76 Z" fill={MC.verde} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />{M(36, 22, 22)}</g>;
  if (tipo === 'quesocrema') return <g transform={t}>
    <rect x={-80} y={-40} width={160} height={110} rx={14} fill="#f7f7f2" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={-40} width={160} height={30} rx={10} fill="#bfe3f4" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={0} cy={-40} rx={80} ry={16} fill="#fffdf6" stroke={KC.ink} strokeWidth={5} />{M(18, -42, 15)}</g>;
  if (tipo === 'quesoduro') return <g transform={t}>
    <path d="M -90 70 L -90 -30 L 90 -60 L 90 70 Z" fill={MC.queso} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -90 -30 L 90 -60" stroke={MC.queso2} strokeWidth={10} />{M(-20, 20, 18)}</g>;
  if (tipo === 'zanahoria') return <g transform={t}>
    <path d="M -24 -60 Q 0 -70 24 -60 L 4 90 Q 0 96 -4 90 Z" fill={MC.zana} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-30, 0, 30].map((a) => <path key={a} d="M 0 -64 Q 0 -110 0 -120" transform={`rotate(${a} 0 -64)`} stroke={MC.verde} strokeWidth={12} strokeLinecap="round" />)}
    {[-30, 0, 30].map((dy) => <line key={dy} x1={-14} y1={dy} x2={-2} y2={dy + 2} stroke="#c55d0c" strokeWidth={4} />)}{M(6, 10, 14)}</g>;
  if (tipo === 'pimiento') return <g transform={t}>
    <path d="M -70 -30 Q -86 60 -40 82 Q -16 70 0 84 Q 16 70 40 82 Q 86 60 70 -30 Q 40 -60 0 -46 Q -40 -60 -70 -30 Z" fill={MC.pim} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 -46 Q -4 -76 14 -90" stroke="#2f7d32" strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M -40 -20 Q -50 30 -30 60" stroke="#fff" strokeWidth={8} opacity=".35" fill="none" strokeLinecap="round" />{M(30, 10, 16)}</g>;
  return null;
}
const NOMBRES = { pan:'pan', mermelada:'mermelada', yogur:'yogur', jitomate:'jitomate', quesocrema:'queso crema', quesoduro:'queso duro', zanahoria:'zanahoria', pimiento:'pimiento' };

// Rebanada en corte (de lado): miga, corteza, colonia arriba (tallitos con esporas) y red de hilos que baja (rx = por dentro).
// toxinas = { cerca 0..1, toda 0..1 }. Esquemático, sin proporción.
function PanCorte({ T, g = 1, rx = 1, esporas = 1, toxinas }) {
  const X0 = 90, X1 = 990, Y0 = 760, Y1 = 1150, CX = 540;
  const gg = krng(9);
  const alv = Array.from({ length: 34 }, () => ({ x: X0 + 30 + gg() * (X1 - X0 - 60), y: Y0 + 30 + gg() * (Y1 - Y0 - 60), rx: 10 + gg() * 26, ry: 6 + gg() * 14 }));
  const segs = kArbolRadial(3, 360, false), ESC = 0.105;
  const cerca = toxinas ? toxinas.cerca || 0 : 0, toda = toxinas ? toxinas.toda || 0 : 0;
  const puntosHifa = segs.filter((sg, i) => i % 7 === 0 && sg.b < g);
  const gr = krng(44);
  const sueltas = Array.from({ length: 26 }, () => ({ x: X0 + 40 + gr() * (X1 - X0 - 80), y: Y0 + 40 + gr() * (Y1 - Y0 - 70), t: gr() }));
  return <g>
    <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} rx={30} fill={MC.corteza} stroke={KC.ink} strokeWidth={10} />
    <rect x={X0 + 22} y={Y0 + 22} width={X1 - X0 - 44} height={Y1 - Y0 - 44} rx={16} fill={MC.miga} />
    {alv.map((a, i) => <ellipse key={i} cx={a.x} cy={a.y} rx={a.rx} ry={a.ry} fill={MC.miga2} />)}
    {rx > 0 && <rect x={X0 + 22} y={Y0 + 22} width={X1 - X0 - 44} height={Y1 - Y0 - 44} rx={16} fill={MC.rayos} opacity={0.78 * rx} />}
    <g opacity={0.35 + 0.65 * rx}><RedHifas T={T} x={CX} y={Y0 + 18} g={g} seed={3} n={360} escala={ESC} color={MC.hifa} ancho={3.5} /></g>
    {cerca > 0 && puntosHifa.map((sg, i) => { const k = kprog(cerca, (i % 9) / 12, (i % 9) / 12 + 0.3, kEase.rebote); return k > 0 ? <circle key={i} cx={CX + sg.x2 * ESC} cy={Y0 + 18 + sg.y2 * ESC} r={9 * k} fill={MC.toxina} stroke={KC.ink} strokeWidth={3} /> : null; })}
    {toda > 0 && sueltas.map((p, i) => { const k = kprog(toda, p.t * 0.6, p.t * 0.6 + 0.4); return k > 0 ? <circle key={i} cx={klerp(CX, p.x, k)} cy={klerp(Y0 + 60, p.y, k)} r={8} fill={MC.toxina} stroke={KC.ink} strokeWidth={3} opacity={k} /> : null; })}
    {/* colonia arriba: pelusa + tallitos con cadenas de esporas (lo que ves) */}
    <path d={`M ${CX - 150} ${Y0 + 4} Q ${CX} ${Y0 - 50} ${CX + 150} ${Y0 + 4} Z`} fill={MC.pelusa} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 11 }, (_, i) => { const dx = -130 + i * 26, h = 60 + ((i * 37) % 40), sway = mece(T, i + 2, 0.4) * 4, tip = CX + dx + sway;
      return <g key={i}><line x1={CX + dx} y1={Y0 - 4} x2={tip} y2={Y0 - h} stroke="#e9f3ee" strokeWidth={6} />
        {esporas > 0 && [0, 1, 2, 3].map((k) => <circle key={k} cx={tip + (k % 2 ? 6 : -6)} cy={Y0 - h - 8 - k * 11} r={7 * esporas} fill={k % 2 ? MC.moho : MC.moho2} stroke={KC.ink} strokeWidth={2} />)}</g>; })}
  </g>;
}

// Micotoxina (esquemática): anillo hexagonal rojo.
function Toxina({ x, y, s = 1, rot = 0 }) {
  const p = Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${(Math.cos(a) * 22).toFixed(1)},${(Math.sin(a) * 22).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}><polygon points={p} fill="none" stroke={KC.ink} strokeWidth={12} /><polygon points={p} fill="none" stroke={MC.toxina} strokeWidth={7} /><circle r={6} fill={MC.toxina} /></g>;
}
// Hifa gruesa (de cerca) a lo largo de una curva, con septos. p 0..1 = crece.
function HifaGruesa({ d, p = 1, largo = 1400 }) {
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={50} fill="none" strokeLinecap="round" strokeDasharray={`${p * largo} 9999`} />
    <path d={d} stroke="#cfe9dc" strokeWidth={38} fill="none" strokeLinecap="round" strokeDasharray={`${p * largo} 9999`} />
    <path d={d} stroke="#8fbfa8" strokeWidth={38} fill="none" strokeDasharray={`5 ${130}`} opacity={p > 0.9 ? 1 : 0} />
  </g>;
}

// Manzana o jitomate partido a la mitad. difunde = { modo:'manzana'|'jitomate', p 0..1 }. La zona con moho a la izquierda.
function FrutaMitad({ T, tipo, x, y, r = 260, p = 0, regla = 0 }) {
  const manz = tipo === 'manzana';
  const piel = manz ? '#d4242c' : MC.jito, pulpa = manz ? '#fbf1d0' : '#f2635a';
  const zx = x - r * 0.78, zy = y - r * 0.05;
  const g = krng(manz ? 5 : 8);
  const pts = Array.from({ length: manz ? 60 : 90 }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * r * 0.9; return { x: x + Math.cos(a) * d, y: y + Math.sin(a) * d * 0.95, t: g() }; });
  const lim = r * 0.58; // en la manzana: más allá de ~2 cm (lim px) no hay
  return <g>
    <ellipse cx={x} cy={y} rx={r + 16} ry={r * 0.95 + 16} fill={piel} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.95} fill={pulpa} />
    {manz ? <g>
      <path d={`M ${x} ${y - 70} Q ${x + 60} ${y} ${x} ${y + 70} Q ${x - 60} ${y} ${x} ${y - 70} Z`} fill="#efe0a8" stroke="#c9b26a" strokeWidth={4} />
      {[[-14, -20], [14, -20], [-14, 22], [14, 22]].map(([dx, dy], i) => <ellipse key={i} cx={x + dx} cy={y + dy} rx={8} ry={14} fill="#5a3418" />)}
      <path d={`M ${x} ${y - r * 0.95 - 16} Q ${x + 8} ${y - r - 50} ${x + 26} ${y - r - 70}`} stroke="#5a3418" strokeWidth={12} fill="none" strokeLinecap="round" />
    </g> : <g>
      {[[-0.35, -0.3], [0.35, -0.3], [-0.35, 0.32], [0.35, 0.32]].map(([u, v], i) => <g key={i}><ellipse cx={x + u * r} cy={y + v * r} rx={r * 0.24} ry={r * 0.2} fill="#ffb3a6" stroke="#d63f37" strokeWidth={5} />
        {[0, 1, 2].map((k) => <ellipse key={k} cx={x + u * r + (k - 1) * 22} cy={y + v * r} rx={6} ry={9} fill="#fff4c2" />)}</g>)}
      <path d={`M ${x} ${y - r * 0.9} L ${x} ${y + r * 0.9} M ${x - r * 0.9} ${y} L ${x + r * 0.9} ${y}`} stroke="#d63f37" strokeWidth={8} opacity=".6" />
    </g>}
    {/* zona con moho, en el borde izquierdo */}
    <path d={`M ${x - r - 10} ${zy - 120} Q ${x - r * 0.45} ${zy - 90} ${x - r * 0.5} ${zy} Q ${x - r * 0.45} ${zy + 90} ${x - r - 10} ${zy + 120} Z`} fill={manz ? '#8a5a2a' : '#7b3b2a'} opacity=".9" />
    <Mancha x={x - r * 0.88} y={zy} r={56} seed={manz ? 4 : 9} />
    {pts.map((q, i) => { const dz = Math.hypot(q.x - zx, q.y - zy);
      const llega = manz ? (dz < lim ? 1 : 0) : 1;
      const k = kprog(p, Math.min(0.95, (dz / (r * 2)) * (manz ? 1 : 0.9)), Math.min(1, (dz / (r * 2)) + 0.12));
      if (!llega || k <= 0) return null;
      const o = manz ? 1 - 0.75 * (dz / lim) : 1;
      return <circle key={i} cx={q.x} cy={q.y} r={9 * k} fill={MC.toxina} stroke={KC.ink} strokeWidth={3} opacity={o} />; })}
    {regla > 0 && <g opacity={regla}>
      <line x1={x - r * 0.5} y1={y - r * 0.55} x2={x - r * 0.5 + lim * regla} y2={y - r * 0.55} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
      <line x1={x - r * 0.5} y1={y - r * 0.55} x2={x - r * 0.5 + lim * regla} y2={y - r * 0.55} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
      <text x={x - r * 0.5 + lim * 0.5} y={y - r * 0.55 - 22} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(regla, 0.6, 1)}>2 cm</text>
      <line x1={x - r * 0.5 + lim} y1={y - r * 0.9} x2={x - r * 0.5 + lim} y2={y + r * 0.9} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" opacity={kprog(regla, 0.8, 1)} />
    </g>}
  </g>;
}

// Queso duro grande con el corte de margen. corte 0..1 = el cuchillo saca el cubo; caja 0..1 = se dibuja el margen.
function QuesoGrande({ T, x, y, caja = 0, corte = 0, hilos = 1 }) {
  const W = 560, H = 320, mx = x - 100, my = y - 90, M = 130, R0 = 34; // 2.5 cm ≈ 130 px (queso de ~11 cm)
  const bx = mx - R0 - M, by = my - 44, bw = 2 * (R0 + M), bh = (my + R0 + M) - by;
  return <g>
    <path d={`M ${x - W / 2} ${y + H / 2} L ${x - W / 2} ${y - H / 2 + 40} L ${x + W / 2} ${y - H / 2} L ${x + W / 2} ${y + H / 2} Z`} fill={MC.queso} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[[x + 170, y + 80, 22], [x + 90, y + 120, 14], [x + 220, y - 20, 16]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={MC.queso2} />)}
    {corte > 0 && <rect x={bx} y={by} width={bw} height={bh} fill={MC.queso2} opacity={kprog(corte, 0.3, 0.6) * 0.85} />}
    {/* hilos poco profundos bajo la mancha (lo duro casi no deja entrar al moho) */}
    {hilos > 0 && corte < 0.3 && [-26, -10, 6, 20].map((dx, i) => <path key={i} d={`M ${mx + dx} ${my + 10} q ${6 - i * 3} 14 ${2 - i} ${24 + (i % 2) * 8}`} stroke={MC.moho2} strokeWidth={4} fill="none" />)}
    {corte < 0.3 && <Mancha x={mx} y={my} r={R0} seed={12} />}
    {caja > 0 && corte < 0.3 && <g opacity={caja}>
      <rect x={bx} y={by} width={bw} height={bh * caja} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray="20 12" />
      <line x1={mx + R0} y1={my} x2={mx + R0 + M * caja} y2={my} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
      <line x1={mx + R0} y1={my} x2={mx + R0 + M * caja} y2={my} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
      <line x1={mx} y1={my + R0} x2={mx} y2={my + R0 + M * caja} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
      <line x1={mx} y1={my + R0} x2={mx} y2={my + R0 + M * caja} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
    </g>}
    {corte > 0 && <g transform={`translate(${-corte * 260} ${-corte * 120}) rotate(${-corte * 14} ${mx} ${my})`} opacity={1 - kprog(corte, 0.75, 1)}>
      <rect x={bx} y={by} width={bw} height={bh} fill={MC.queso} stroke={KC.ink} strokeWidth={7} />
      {[-26, -10, 6, 20].map((dx, i) => <path key={i} d={`M ${mx + dx} ${my + 10} q ${6 - i * 3} 14 ${2 - i} ${24 + (i % 2) * 8}`} stroke={MC.moho2} strokeWidth={4} fill="none" />)}
      <Mancha x={mx} y={my} r={R0} seed={12} />
    </g>}
  </g>;
}

function MohoCortarShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Raices, X: CUES.Toxinas, H: CUES.Hilos, P: CUES.Pregunta, Ti: CUES.Tira, D: CUES.Debajo, C: CUES.Corta, E: CUES.Estudio, M: CUES.Manzana, J: CUES.Jitomate, O: CUES.Oler, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el cuchillo raspa la mancha
  const rasp = kprog(T, K.G + 0.25, K.G + 1.3, kEase.suave);
  const knifeX = klerp(980, 420, kprog(T, K.G + 0.1, K.G + 0.6, kEase.sale)) + Math.sin(rasp * Math.PI * 4) * 70 * (rasp < 1 ? 1 : 0);
  const knifeOut = kprog(T, K.G + 1.4, K.G + 1.9, kEase.suave);
  const TIRA = ['pan', 'mermelada', 'yogur', 'jitomate', 'quesocrema'];
  const CORTA = ['quesoduro', 'zanahoria', 'pimiento'];
  const tiraAt = (i) => K.Ti + 1.9 + i * 0.5;
  const cortaAt = (i) => K.C + 2.4 + i * 0.45;
  const cajaQ = kprog(T, K.C + 4.7, K.C + 5.4, kEase.sale), corteQ = kprog(T, K.C + 6.0, K.C + 7.1, kEase.suave);
  const cuchQ = kprog(T, K.C + 5.5, K.C + 6.1, kEase.sale) * (1 - kprog(T, K.C + 7.2, K.C + 7.7));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: raspas la mancha del pan… */}
      <Escena T={T} a={K.G} b={K.R} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1190} width={KW + 40} height={300} fill="#a8693a" stroke={KC.ink} strokeWidth={8} />
          <PanFrente T={T} x={400} y={830} s={0.78} mancha={1 - rasp} raspado={rasp} rx={kprog(T, K.G + 2.6, K.G + 3.6)} />
          <g opacity={1 - knifeOut}><Cuchillo x={knifeX} y={kprog(T, K.G + 0.1, K.G + 0.6) > 0 ? 690 - knifeOut * 200 : 690} ang={-8} s={0.9} /></g>
          <Sello T={T} at={K.G + 3.4} x={250} y={560} texto="NO" color={KC.red} r={100} />
        </>)}
      </Escena>
      {/* 1 · esporas arriba, hilos que se meten (corte de lado) */}
      <Escena T={T} a={K.R} b={K.X} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<PanCorte T={T} g={kprog(T, K.R + 1.6, K.R + 4.2)} rx={kprog(T, K.R + 1.2, K.R + 1.9)} esporas={kprog(T, K.R + 0.2, K.R + 1.0, kEase.rebote)} />)}
      </Escena>
      {/* 2 · de cerca: algunos mohos sueltan micotoxinas */}
      <Escena T={T} a={K.X} b={K.H} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <HifaGruesa d="M -40 1080 C 200 1000 360 1120 560 980 S 900 860 1140 900" p={kprog(T, K.X - 0.3, K.X + 1.2, kEase.sale)} />
          <HifaGruesa d="M 380 1060 C 420 900 360 780 460 640" p={kprog(T, K.X + 0.4, K.X + 1.6, kEase.sale)} largo={600} />
          <HifaGruesa d="M 760 920 C 820 1040 900 1120 1100 1180" p={kprog(T, K.X + 0.7, K.X + 1.9, kEase.sale)} largo={600} />
          {Array.from({ length: 12 }, (_, i) => { const t0 = K.X + 1.4 + i * 0.16, k = kprog(T, t0, t0 + 0.5, kEase.rebote); if (k <= 0) return null;
            const bx = [300, 560, 820, 450, 700, 980, 220, 620, 400, 880, 520, 760][i], by = [1020, 960, 900, 760, 1040, 880, 1060, 860, 680, 1000, 1100, 960][i];
            const dr = (T - t0) * 22; return <Toxina key={i} x={bx + Math.sin(T + i) * dr * 0.6} y={by - 90 - dr} s={k * 1.1} rot={T * 40 + i * 30} />; })}
        </>)}
      </Escena>
      {/* 3 · están en los hilos y alrededor; a veces, en toda la comida */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<PanCorte T={T} g={1} rx={1} toxinas={{ cerca: kprog(T, K.H + 0.2, K.H + 1.6), toda: kprog(T, K.H + 2.0, K.H + 3.6) }} />)}
      </Escena>
      {/* 4 · ¿cuándo se corta y cuándo se tira? */}
      <Escena T={T} a={K.P} b={K.Ti} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Interrogacion T={T} x={270} y={1000} />
          <Bote x={150} y={1100} s={0.6} tapa={0.5 + 0.5 * Math.sin(T * 5)} />
          <Cuchillo x={330} y={1150} ang={-20 + Math.sin(T * 4) * 6} s={0.5} />
        </>)}
      </Escena>
      {/* 5–6 · SE TIRA: blando, húmedo o poroso; el moho llega por debajo y puede traer bacterias */}
      <Escena T={T} a={K.Ti} b={K.C}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.D - 0.2, K.D + 0.3)}>
            <Bote x={540} y={1100} s={0.6} tapa={0.6 * kprog(T, K.Ti + 0.6, K.Ti + 1.0)} />
            {TIRA.map((t, i) => { const k = kprog(T, tiraAt(i), tiraAt(i) + 0.4, kEase.rebote); if (k <= 0) return null;
              const xx = 140 + i * 200, yy = i % 2 ? 800 : 700;
              return <g key={t}><Alimento tipo={t} x={xx} y={yy} s={0.9 * k} seed={i} />
                <text x={xx} y={yy + 120} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={k}>{NOMBRES[t]}</text></g>; })}
          </g>
          {T > K.D - 0.3 && <g opacity={kprog(T, K.D - 0.3, K.D + 0.2)}>
            {/* jitomate y yogur por dentro: hilos debajo de la superficie */}
            <g transform="translate(300 900)">
              <ellipse cx={0} cy={0} rx={190} ry={170} fill={MC.jito} stroke={KC.ink} strokeWidth={9} />
              <ellipse cx={0} cy={6} rx={168} ry={148} fill="#f2635a" />
              <ellipse cx={0} cy={6} rx={168} ry={148} fill={MC.rayos} opacity=".55" />
              <Mancha x={-20} y={-150} r={50} seed={9} />
              <RedHifas T={T} x={-20} y={-138} g={kprog(T, K.D, K.D + 2.2)} seed={6} n={220} escala={0.075} color={MC.hifa} ancho={5} />
            </g>
            <g transform="translate(790 900)">
              <path d="M -150 -150 L 150 -150 L 112 170 L -112 170 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
              <path d="M -138 -120 L 138 -120 L 106 156 L -106 156 Z" fill="#fbf6ea" />
              <path d="M -138 -120 L 138 -120 L 106 156 L -106 156 Z" fill={MC.rayos} opacity=".5" />
              <Mancha x={0} y={-128} r={44} seed={5} />
              <RedHifas T={T} x={0} y={-118} g={kprog(T, K.D + 0.2, K.D + 2.4)} seed={8} n={200} escala={0.06} color={MC.hifa} ancho={5} />
              {[[-60, 40, 20], [50, 70, -30], [-10, 110, 60], [70, -10, 10]].map(([bx, by, r], i) => <Bacteria key={i} x={bx} y={by} rot={r + Math.sin(T * 2 + i) * 8} s={0.75 * kprog(T, K.D + 1.2 + i * 0.15, K.D + 1.6 + i * 0.15, kEase.rebote)} T={T} seed={i} color={KC.lilac} />)}
            </g>
          </g>}
        </>)}
      </Escena>
      {/* 7 · SE CORTA: lo duro, si la mancha es chica; al menos 2.5 cm alrededor y por debajo */}
      <Escena T={T} a={K.C} b={K.E}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.C + 4.0, K.C + 4.5)}>
            {CORTA.map((t, i) => { const k = kprog(T, cortaAt(i), cortaAt(i) + 0.4, kEase.rebote); if (k <= 0) return null;
              const xx = 220 + i * 320, yy = 880;
              return <g key={t}><Alimento tipo={t} x={xx} y={yy} s={1.25 * k} seed={i + 5} />
                <text x={xx} y={yy + 160} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink} opacity={k}>{NOMBRES[t]}</text></g>; })}
          </g>
          {T > K.C + 4.0 && <g opacity={kprog(T, K.C + 4.0, K.C + 4.5)}>
            <QuesoGrande T={T} x={540} y={940} caja={cajaQ} corte={corteQ} />
            {cuchQ > 0 && <Cuchillo x={klerp(1100, 470, cuchQ)} y={klerp(700, 880, cuchQ)} ang={-30 + cuchQ * 20} s={0.8} />}
            
          </g>}
        </>)}
      </Escena>
      {/* 8 · el estudio de 2001 */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.E + 1.2, K.E + 1.5)} transform={`translate(0 ${(1 - kprog(T, K.E + 1.2, K.E + 1.8, kEase.sale)) * 300})`}>
            <g transform="translate(280 1010) scale(0.5) translate(-280 -1010)"><FrutaMitad T={T} tipo="manzana" x={280} y={1010} r={260} /></g>
            <g transform="translate(800 1010) scale(0.5) translate(-800 -1010)"><FrutaMitad T={T} tipo="jitomate" x={800} y={1010} r={260} /></g>
          </g>
        </>)}
      </Escena>
      {/* 9 · manzana: a más de 2 cm de la zona con moho, ya no aparecía */}
      <Escena T={T} a={K.M} b={K.J} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<FrutaMitad T={T} tipo="manzana" x={470} y={900} r={250} p={kprog(T, K.M + 0.3, K.M + 2.2)} regla={kprog(T, K.M + 2.2, K.M + 3.0, kEase.sale)} />)}
      </Escena>
      {/* 10 · jitomate: llegó a todo el fruto */}
      <Escena T={T} a={K.J} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<FrutaMitad T={T} tipo="jitomate" x={470} y={900} r={250} p={kprog(T, K.J + 0.2, K.J + 2.4)} />)}
      </Escena>
      {/* 11 · no lo huelas */}
      <Escena T={T} a={K.O} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1190} width={KW + 40} height={300} fill="#a8693a" stroke={KC.ink} strokeWidth={8} />
          <PanFrente T={T} x={300} y={860} s={0.62} mancha={1} />
          {Array.from({ length: 36 }, (_, i) => { const t0 = K.O + 0.3 + (i % 12) * 0.08, u = T - t0; if (u < 0) return null; const a = -Math.PI / 2 + (((i * 37) % 100) / 100 - 0.5) * 2.2, v = 60 + (i % 7) * 22;
            return <circle key={i} cx={340 + Math.cos(a) * v * u * 1.4} cy={650 + Math.sin(a) * v * u - 20 * u} r={5} fill={i % 2 ? MC.moho2 : MC.moho} opacity={Math.max(0, 1 - u / 3.2)} />; })}
          <Sello T={T} at={K.O + 1.4} x={300} y={570} texto="NO" color={KC.red} r={90} />
        </>)}
      </Escena>
      {/* 12 · cierre: la misma rebanada y el mismo cuchillo; el pan al bote, el queso duro con margen */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-20} y={1190} width={KW + 40} height={300} fill="#a8693a" stroke={KC.ink} strokeWidth={8} />
          {(() => { const va = kprog(T, K.Ci + 1.4, K.Ci + 2.4, kEase.suave);
            return <g opacity={1 - kprog(T, K.Ci + 2.2, K.Ci + 2.5)}><PanFrente T={T} x={klerp(400, 230, va)} y={klerp(830, 1060, va)} s={klerp(0.78, 0.2, va)} mancha={1} rx={kprog(T, K.Ci, K.Ci + 0.8)} /></g>; })()}
          <Bote x={230} y={1100} s={0.7} tapa={kprog(T, K.Ci + 1.0, K.Ci + 1.4) * (1 - kprog(T, K.Ci + 2.6, K.Ci + 3.0))} />
          {T > K.Ci + 2.4 && <g opacity={kprog(T, K.Ci + 2.4, K.Ci + 2.9)} transform="translate(700 940) scale(0.62) translate(-540 -940)"><QuesoGrande T={T} x={540} y={940} caja={1} corte={1} /></g>}
          <g opacity={1 - kprog(T, K.Ci + 1.2, K.Ci + 1.6)}><Cuchillo x={600} y={690} ang={-8} s={0.9} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.4} until={K.G + 3.3} texto="¿ya quedó?" x={300} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.R + 0.6} until={K.X - 0.3} x={40} y={575} texto="esporas = el color que ves" tam={28} color={KC.ink} />
      <Etq T={T} at={K.R + 2.0} until={K.X - 0.3} x={600} y={1070} texto="hifas: los «hilos»" tam={28} color={KC.texto} />
      <Chip T={T} at={K.R + 2.6} until={K.X - 0.3} texto="esquemático, sin proporción" x={360} y={470} tam={28} borde={KC.ink} mono />
      <Etq T={T} at={K.X + 1.6} until={K.H - 0.3} x={60} y={560} texto="micotoxinas" tam={36} color={MC.toxina} />
      <Chip T={T} at={K.X + 2.2} until={K.H - 0.3} texto="solo algunos mohos" x={400} y={470} tam={34} borde={MC.toxina} />
      <Chip T={T} at={K.X + 0.6} until={K.H - 0.3} texto="esquemático, no a escala" x={540} y={1440} tam={26} borde={KC.texto} mono />
      <Chip T={T} at={K.H + 0.4} until={K.H + 1.9} texto="en los hilos y alrededor" x={400} y={480} tam={34} borde={MC.toxina} />
      <Chip T={T} at={K.H + 2.1} until={K.P - 0.3} texto="a veces: en toda la comida" x={400} y={480} tam={34} borde={MC.toxina} />
      <Chip T={T} at={K.P + 0.3} until={K.Ti - 0.3} texto="¿se corta o se tira?" x={290} y={470} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Ti + 0.2} until={K.D - 0.3} texto="SE TIRA: blando, húmedo o poroso" x={370} y={470} tam={32} borde={KC.red} />
      <Etq T={T} at={K.D + 0.4} until={K.C - 0.3} x={60} y={640} texto="hilos bajo la superficie" tam={30} color={KC.ink} />
      <Chip T={T} at={K.D + 1.3} until={K.C - 0.3} texto="+ bacterias" x={790} y={1130} tam={30} borde={KC.lilac} />
      <Chip T={T} at={K.D + 1.3} until={K.C - 0.3} texto="esquemático, no a escala" x={540} y={1440} tam={26} borde={KC.texto} mono />
      <Chip T={T} at={K.C + 0.2} until={K.C + 4.3} texto="SE CORTA: duro y mancha chica" x={370} y={470} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.C + 4.5} until={K.E - 0.3} texto="al menos 2.5 cm (1 pulgada)" x={370} y={470} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.C + 5.3} until={K.E - 0.3} texto="alrededor y por debajo" x={370} y={565} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.C + 5.9} until={K.E - 0.3} texto="el cuchillo no toca el moho" x={540} y={1440} tam={28} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="2001" quien="Universidad Técnica de Múnich" revista="Rychlik y Schieberle · Eur. Food Res. Technol." y={600} />
      <Etq T={T} at={K.E + 2.4} until={K.M - 0.3} x={60} y={845} texto="patulina: una toxina de moho" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 0.8} until={K.J - 0.3} x={60} y={560} texto="Penicillium expansum" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.M + 1.2} until={K.J - 0.3} x={60} y={610} texto="zona con moho" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 2.6} until={K.J - 0.3} texto="a más de 2 cm: no detectable" x={460} y={1440} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.M + 1.0} until={K.J - 0.3} x={560} y={1000} texto="patulina" tam={30} color={MC.toxina} />
      <Chip T={T} at={K.J + 1.4} until={K.O - 0.3} texto="jitomate: en todo el fruto" x={380} y={470} tam={36} borde={MC.toxina} />
      <Chip T={T} at={K.O + 1.6} until={K.Ci - 0.3} texto="no lo huelas" x={300} y={400} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="pan: se tira" x={250} y={470} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou} texto="queso duro: con margen" x={680} y={760} tam={32} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.R} until={K.X} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.H} until={K.P} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.Ti} until={K.D} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.D} until={K.C} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.C} until={K.C + 4.1} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.C + 4.1} until={K.E} texto="2.5 cm" largo={130} />
      <BarraEscala T={T} at={K.E} until={K.M} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.M} until={K.O} texto="2 cm" largo={145} />
      <BarraEscala T={T} at={K.O} until={K.Ci} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="5 cm" largo={180} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Esa mancha es *solo lo que se ve.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.X - 0.1} texto="Esporas arriba, *hilos por dentro.*" />
      <Subtitulo T={T} idx={2} at={K.X + 0.1} until={K.H - 0.1} texto="Algunos mohos hacen *micotoxinas.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.P - 0.1} texto="En los hilos… *y a veces en todo.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ti - 0.1} texto="¿Cuándo se corta *y cuándo se tira?*" />
      <Subtitulo T={T} idx={5} at={K.Ti + 0.1} until={K.D - 0.1} texto="Blando, húmedo o poroso: *se tira.*" />
      <Subtitulo T={T} idx={6} at={K.D + 0.1} until={K.C - 0.1} texto="Llega por debajo *y puede traer bacterias.*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.E - 0.1} texto="Duro y mancha chica: *corta 2.5 cm o más.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.M - 0.1} texto="2001, Alemania: *la patulina.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.J - 0.1} texto="Manzana: *a más de 2 cm, no detectable.*" />
      <Subtitulo T={T} idx={10} at={K.J + 0.1} until={K.O - 0.1} texto="Jitomate: *llegó a todo el fruto.*" />
      <Subtitulo T={T} idx={11} at={K.O + 0.1} until={K.Ci - 0.1} texto="No la huelas: *problemas al respirar.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Pan: *se tira.* Queso duro: *con margen.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.8, K.X - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.H + 0.3, K.P - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ti + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.D + 0.3, K.C + 3.0, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 3.9, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.3, K.O - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.O + 0.2, K.Ci - 0.1, 'avatar_10_serio_molesto', 'grande'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="11" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MohoCortarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MohoCortarShot /></CompositionStage></div>;
}
window.MohoCortarApp = MohoCortarApp;
