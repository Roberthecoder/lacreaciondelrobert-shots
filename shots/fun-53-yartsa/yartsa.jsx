// Shot Fungi Mati #53 · Esa ramita es una oruga: el hongo-oruga del Tíbet (Ophiocordyceps sinensis, yartsa gunbu) — NARRADO.
// Formato N1 "Por dentro" + tramo N2 (el precio). Gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md.
// Morfología (Kew, Catalogue of Fungi of Colombia): estroma oscuro que sale de la cabeza del huésped, 1.7–8 cm; pie 2–3.5 cm × 2–3 mm.
// La oruga y las hifas son esquemáticas. El dibujo es esquemático. Sin promesas medicinales.

const YC = { piel:'#e9b48a', piel2:'#c98d66', oruga:'#f3e6c4', momia:'#c89452', momia2:'#8a5a2a', estroma:'#3a2616', estroma2:'#24170d',
  pasto:'#3fbf4a', pasto2:'#2f9e44', tierra:'#6b4a2b', tierra2:'#4a321c', nieve:'#f4f8ff', roca:'#9aa3b5', roca2:'#6f788c', oro:'#f4c25a', oro2:'#c98b2b' };

// Oruga de perfil: cabeza en (x, y); el cuerpo sale en dirección `ang` (grados; 90 = hacia abajo). momia 0..1 = blanca y viva → café y rígida.
function Oruga({ T = 0, x, y, ang = 90, largo = 240, ancho = 60, seg = 11, ondula = 0, momia = 0, patas = true }) {
  const col = mixHex(YC.oruga, YC.momia, momia), col2 = mixHex('#d9c9a3', YC.momia2, momia);
  const pts = Array.from({ length: seg }, (_, i) => ({ i, cx: Math.sin(i * 0.7 - T * 5) * ondula * ancho * 0.18 * (1 - momia), cy: (i + 0.5) * largo / seg,
    r: ancho / 2 * (i === 0 ? 0.82 : 1 - (i / seg) * 0.28) }));
  return <g transform={`translate(${x} ${y}) rotate(${ang - 90})`}>
    {patas && pts.filter((p) => p.i >= 2 && p.i <= seg - 2).map((p) => <ellipse key={'p' + p.i} cx={p.cx - p.r * 0.95} cy={p.cy} rx={ancho * 0.12} ry={ancho * 0.08} fill={col2} stroke={KC.ink} strokeWidth={3} />)}
    {pts.slice().reverse().map((p) => <g key={p.i}>
      <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.i === 0 ? mixHex('#c79a5e', YC.momia2, momia) : col} stroke={KC.ink} strokeWidth={Math.max(3, ancho * 0.07)} />
      {p.i > 0 && <path d={`M ${p.cx - p.r * 0.7} ${p.cy - p.r * 0.2} Q ${p.cx} ${p.cy + p.r * 0.25} ${p.cx + p.r * 0.7} ${p.cy - p.r * 0.2}`} stroke={col2} strokeWidth={Math.max(2, ancho * 0.05)} fill="none" />}
    </g>)}
    <circle cx={pts[0].cx + ancho * 0.12} cy={pts[0].cy - ancho * 0.12} r={ancho * 0.06} fill={KC.ink} opacity={1 - momia * 0.6} />
  </g>;
}
// Estroma (el "tallo" del hongo): sale de (x, y) en dirección `ang` (−90 = hacia arriba). Pie delgado + parte fértil más gruesa y oscura, punta estéril.
function Estroma({ x, y, ang = -90, largo = 300, ancho = 22, crece = 1 }) {
  if (crece <= 0) return null;
  const L = largo * crece, w = ancho, pie = L * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${ang + 90})`}>
    <path d={`M ${-w * 0.32} 0 L ${-w * 0.3} ${-pie} L ${w * 0.3} ${-pie} L ${w * 0.32} 0 Z`} fill={YC.estroma} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    {L > pie && <path d={`M ${-w * 0.3} ${-pie} Q ${-w * 0.55} ${-(pie + L) / 2} ${-w * 0.42} ${-L * 0.94} Q 0 ${-L * 1.02} ${w * 0.42} ${-L * 0.94} Q ${w * 0.55} ${-(pie + L) / 2} ${w * 0.3} ${-pie} Z`} fill={YC.estroma2} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />}
    {L > pie + 20 && Array.from({ length: 7 }, (_, i) => <circle key={i} cx={(i % 2 ? 0.18 : -0.18) * w} cy={-pie - (i + 0.6) * (L * 0.38) / 7} r={2.5} fill="#7a5a3c" />)}
  </g>;
}
// Hongo-oruga completo (como se vende): oruga momificada + estroma que sale de su cabeza.
function Yartsa({ T = 0, x, y, angCuerpo = 40, angTallo = -130, largo = 260, ancho = 58, tallo = 360, crece = 1, momia = 1 }) {
  return <g>
    <Oruga T={T} x={x} y={y} ang={angCuerpo} largo={largo} ancho={ancho} momia={momia} />
    <Estroma x={x} y={y} ang={angTallo} largo={tallo} ancho={ancho * 0.42} crece={crece} />
  </g>;
}
// Mano abierta vista de frente (palma), centro de la palma en (x, y).
function Mano({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-120, -150, -12], [-45, -185, -4], [35, -185, 4], [110, -160, 12]].map(([dx, dy, r], i) =>
      <rect key={i} x={dx - 34} y={dy - 130} width={68} height={220} rx={34} fill={YC.piel} stroke={KC.ink} strokeWidth={7} transform={`rotate(${r} ${dx} ${dy})`} />)}
    <rect x={-250} y={-60} width={70} height={200} rx={35} fill={YC.piel} stroke={KC.ink} strokeWidth={7} transform="rotate(-48 -215 40)" />
    <path d="M -175 -110 Q -190 120 -60 230 Q 60 280 150 210 Q 200 120 175 -110 Q 0 -150 -175 -110 Z" fill={YC.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 40 Q -20 90 90 20" stroke={YC.piel2} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -130 -40 Q 0 0 120 -60" stroke={YC.piel2} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Montañas nevadas del Tíbet (fondo), con pastizal alpino abajo.
function Montanas({ T = 0, y0 = 1180, pasto = true }) {
  const picos = [[-100, 560, 330], [300, 470, 300], [680, 520, 330], [1050, 600, 280]];
  return <g>
    {picos.map(([px, py, w], i) => <g key={i}>
      <path d={`M ${px - w} ${y0 - 200} L ${px} ${py} L ${px + w} ${y0 - 200} Z`} fill={i % 2 ? YC.roca : YC.roca2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d={`M ${px - w * 0.33} ${py + (y0 - 200 - py) * 0.33} L ${px} ${py} L ${px + w * 0.33} ${py + (y0 - 200 - py) * 0.33} L ${px + w * 0.12} ${py + (y0 - 200 - py) * 0.26} L ${px} ${py + (y0 - 200 - py) * 0.36} L ${px - w * 0.14} ${py + (y0 - 200 - py) * 0.27} Z`} fill={YC.nieve} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    </g>)}
    {pasto && <path d={`M 0 ${y0 - 230} Q 270 ${y0 - 270} 540 ${y0 - 235} Q 820 ${y0 - 200} ${KW} ${y0 - 250} L ${KW} ${KH} L 0 ${KH} Z`} fill={YC.pasto} stroke={KC.ink} strokeWidth={7} />}
    {pasto && Array.from({ length: 22 }, (_, i) => { const gx = 20 + i * 50, gy = y0 - 225 + Math.sin(i * 1.7) * 14; return <path key={i} d={`M ${gx} ${gy + 30} Q ${gx + 4 + Math.sin(T * 2 + i) * 4} ${gy} ${gx + 10} ${gy - 10}`} stroke={YC.pasto2} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Polilla fantasma (Hepialidae) esquemática, en vuelo.
function Polilla({ T, x, y, s = 1 }) {
  const al = Math.sin(T * 14) * 0.35 + 0.65;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L -120 ${-60 * al} L -110 ${10} Z`} fill="#c9a26a" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M 0 0 L 120 ${-60 * al} L 110 ${10} Z`} fill="#c9a26a" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={6} rx={14} ry={46} fill="#8a6a44" stroke={KC.ink} strokeWidth={5} />
    <path d="M -6 -36 Q -20 -60 -30 -62 M 6 -36 Q 20 -60 30 -62" stroke={KC.ink} strokeWidth={4} fill="none" />
  </g>;
}
// Recolector agachado (ícono) con pala chica que se mueve.
function Recolector({ T, x, y, s = 1, fase = 0, color = '#ff6b5a', espejo = false }) {
  const pala = Math.sin(T * 6 + fase) * 10;
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`}>
    <path d="M -50 0 L -40 -70 Q -10 -120 40 -100 L 50 -60 L 20 -40 L 10 0 Z" fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={62} cy={-92} r={26} fill="#d79a6e" stroke={KC.ink} strokeWidth={5} />
    <path d="M 52 -118 Q 70 -132 88 -110" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${pala} 40 -60)`}><line x1={40} y1={-60} x2={90} y2={-4} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
      <path d="M 82 -10 L 104 8 L 92 16 L 78 0 Z" fill="#b8c0c8" stroke={KC.ink} strokeWidth={4} /></g>
  </g>;
}
function Moneda({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={26} fill={YC.oro} stroke={KC.ink} strokeWidth={5} /><circle r={16} fill="none" stroke={YC.oro2} strokeWidth={4} /></g>;
}
function Lingote({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 0 L -50 -44 L 50 -44 L 70 0 Z" fill={YC.oro} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -40 -34 L 40 -34" stroke="#fff3c4" strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Mapa esquemático (no a escala) de la región: China (meseta tibetana), Nepal, Bután, India.
function MapaRegion({ T, at }) {
  const p = (d) => kprog(T, at + d, at + d + 0.4, kEase.rebote);
  const pais = [['China', 'M 120 600 Q 380 520 700 600 L 700 820 Q 480 880 300 840 Q 160 800 120 600 Z', '#ffd5a8', 0, 360, 700],
    ['Nepal', 'M 230 870 L 400 880 L 410 925 L 240 915 Z', '#bfe3b4', 0.25, 320, 910],
    ['Bután', 'M 450 885 L 520 885 L 525 920 L 455 920 Z', '#b3d8ff', 0.4, 600, 914],
    ['India', 'M 120 930 L 600 935 Q 520 1080 380 1150 Q 200 1060 120 930 Z', '#ffe9a8', 0.55, 330, 1050]];
  return <g>
    {pais.map(([n, d, c, dl, lx, ly], i) => { const k = p(dl); return k > 0 ? <g key={i} opacity={kclamp(k, 0, 1)}>
      <path d={d} fill={c} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <text x={lx} y={ly} textAnchor="middle" style={{ font:`900 ${n === 'Bután' || n === 'Nepal' ? 28 : 34}px ${KF.texto}` }} fill={KC.ink}>{n}</text></g> : null; })}
  </g>;
}

// Etiqueta en cajita clara (se lee aunque pase encima del dibujo).
function Caja({ T, at, until, x, y, texto, it = false, tam = 34 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.94)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}` }}>{texto}</div>;
}

function YartsaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Me: CUES.Meseta, L: CUES.Larvas, I: CUES.Infeccion, Ta: CUES.Tallo, P: CUES.Pregunta, Pr: CUES.Precio,
    Re: CUES.Recolectores, E: CUES.Estudio, Mn: CUES.Menos, V: CUES.Vulnerable, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la "ramita" gira en la mano desde el cuadro 0
  const giro = kprog(T, K.G, K.G + 1.2, kEase.sale);
  const pista = kprog(T, K.G + 0.2, K.G + 1.0); // la cámara se acerca
  const momiaI = kprog(T, K.I + 0.9, K.I + 3.6);
  const hifas = kprog(T, K.I + 0.5, K.I + 3.4);
  const deshielo = kprog(T, K.Ta + 0.1, K.Ta + 1.4);
  const sale = kprog(T, K.Ta + 0.9, K.Ta + 3.0, kEase.sale);
  const balanza = kprog(T, K.Pr + 3.0, K.Pr + 4.2, kEase.rebote);
  const barras = [1, 0.86, 0.7, 0.55, 0.42];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y nombre: la "ramita" en tu mano es una oruga con un hongo saliéndole de la cabeza */}
      <Escena T={T} a={K.G} b={K.Me} zoom={0.08} origen="45% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={`translate(${540 - 540 * (1 + 0.12 * pista)} ${940 - 940 * (1 + 0.12 * pista)}) scale(${1 + 0.12 * pista})`}>
          <Mano x={560} y={1130} s={1.2} />
          <g transform={`rotate(${klerp(-35, 0, giro)} 560 820)`}>
            <Yartsa T={T} x={560} y={820} angCuerpo={35} angTallo={-125} largo={380} ancho={88} tallo={480} />
          </g>
        </g>)}
      </Escena>
      {/* 3 · la meseta: pastizales del Tíbet y el Himalaya, a más de 3,000 m */}
      <Escena T={T} a={K.Me} b={K.L} zoom={0.06}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Montanas T={T} y0={1380} />
          {(() => { const h = kprog(T, K.Me + 0.3, K.Me + 2.4, kEase.sale); const y = (m) => 1150 - (m / 5000) * 650; return <g>
            <rect x={60} y={y(5000)} width={46} height={650} rx={20} fill="rgba(0,0,0,.45)" stroke={KC.ink} strokeWidth={5} />
            <rect x={60} y={y(5000 * h)} width={46} height={650 * h} rx={20} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
            <rect x={56} y={y(5000)} width={54} height={y(3000) - y(5000)} rx={10} fill="none" stroke={KC.yellow} strokeWidth={7} opacity={kprog(T, K.Me + 1.8, K.Me + 2.2)} />
            {[0, 3000, 5000].map((m) => <text key={m} x={124} y={y(m) + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{kformato(m)} m</text>)}
          </g>; })()}
        </>)}
      </Escena>
      {/* 4 · bajo el pasto: orugas de polilla fantasma en sus túneles, años bajo tierra */}
      <Escena T={T} a={K.L} b={K.I} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={640} width={KW} height={KH} fill={YC.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={600} width={KW} height={50} fill={YC.pasto} stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M ${30 + i * 60} 640 q ${(i % 3 - 1) * 20} 120 ${(i % 2 ? 30 : -20)} ${200 + (i % 4) * 60}`} stroke="#d9b98a" strokeWidth={5} fill="none" strokeLinecap="round" opacity=".8" />)}
          {[[260, 820, 200], [660, 960, 160], [380, 1100, 190]].map(([tx, ty, w], i) => <path key={'t' + i} d={`M ${tx - w} ${ty} Q ${tx} ${ty - 50} ${tx + w} ${ty}`} stroke={YC.tierra2} strokeWidth={70} fill="none" strokeLinecap="round" />)}
          <Oruga T={T} x={klerp(380, 420, mece(T, 1, 0.3) * 0.5 + 0.5)} y={790} ang={180} largo={220} ancho={46} ondula={1} />
          <Oruga T={T + 0.5} x={760} y={950} ang={0} largo={200} ancho={42} ondula={1} />
          <Oruga T={T + 1.1} x={500} y={1090} ang={180} largo={210} ancho={44} ondula={1} />
          <Polilla T={T} x={klerp(150, 560, kprog(T, K.L + 0.2, K.I + 0.3))} y={500 + Math.sin(T * 3) * 20} s={0.7} />
        </>)}
      </Escena>
      {/* 5 · por dentro: el hongo la llena y la deja dura (fondo oscuro, esquemático) */}
      <Escena T={T} a={K.I} b={K.Ta} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <defs><clipPath id="cuerpoOruga"><ellipse cx={500} cy={880} rx={350} ry={74} /></clipPath></defs>
          <Oruga T={T} x={840} y={880} ang={180} largo={700} ancho={160} seg={12} ondula={1 - momiaI} momia={momiaI} />
          <g clipPath="url(#cuerpoOruga)"><RedHifas T={T} x={560} y={880} g={hifas} seed={53} n={360} escala={1.2} color={FK.hifa} ancho={7} brillo={0.8} /></g>
          {Array.from({ length: 5 }, (_, i) => { const u = kprog(T, K.I + i * 0.12, K.I + 0.6 + i * 0.12); return u < 1 ? <ellipse key={i} cx={300 + i * 110} cy={klerp(520, 800, u)} rx={6} ry={14} fill={KC.gold2} opacity={1 - u * 0.6} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · primavera: deshielo y el tallo sale por la cabeza de la oruga enterrada */}
      <Escena T={T} a={K.Ta} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={760} width={KW} height={KH} fill={YC.tierra} stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={724} width={KW} height={44} fill={YC.pasto} stroke={KC.ink} strokeWidth={7} />
          <path d={`M 0 ${690 + deshielo * 40} Q 270 ${660 + deshielo * 60} 540 ${690 + deshielo * 40} T ${KW} ${690 + deshielo * 40} L ${KW} 740 L 0 740 Z`} fill={YC.nieve} stroke={KC.ink} strokeWidth={6} opacity={1 - deshielo} />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.9 + i / 6) % 1); return deshielo > 0 && deshielo < 1 ? <ellipse key={i} cx={120 + i * 160} cy={760 + u * 260} rx={7} ry={12} fill="#9ad7ff" opacity={(1 - u) * 0.8} /> : null; })}
          <Oruga T={T} x={540} y={1000} ang={90} largo={230} ancho={58} momia={1} />
          <Estroma x={540} y={1000} ang={-90} largo={420} ancho={26} crece={sale} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿por qué tanta gente lo busca? */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <path d="M 0 900 Q 500 760 1080 980 L 1080 1920 L 0 1920 Z" fill={YC.pasto} stroke={KC.ink} strokeWidth={8} />
          {[[90, 960], [230, 920], [370, 900], [150, 1080], [310, 1050], [460, 1010]].map(([x, y], i) => <Recolector key={i} T={T} x={x} y={y} s={0.55} fase={i} color={[KC.coral, KC.blue, KC.orange, KC.pink, KC.teal, KC.violet][i]} />)}
          <Interrogacion T={T} x={280} y={820} tam={420} />
        </>)}
      </Escena>
      {/* 8 · el precio: 2017, Pekín, más de 140,000 USD por kilo; más del triple que el oro */}
      <Escena T={T} a={K.Pr} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(balanza > 0 && (() => {
          // Precio por kilo en 2017 (Hopping et al. 2018): el hongo-oruga (los mejores, Pekín) > 3 × el oro. Barras de precio, no de peso.
          const base = 1020, A = 380, hH = A * balanza, hO = (A / 3.4) * balanza;
          return <g opacity={kclamp(balanza, 0, 1)}>
            <line x1={150} y1={base} x2={930} y2={base} stroke={KC.ink} strokeWidth={7} />
            <rect x={230} y={base - hH} width={220} height={hH} fill={YC.estroma} stroke={KC.ink} strokeWidth={6} />
            {[1, 2, 3].map((k) => (A / 3.4) * k <= hH ? <line key={k} x1={230} y1={base - (A / 3.4) * k} x2={450} y2={base - (A / 3.4) * k} stroke={YC.oro} strokeWidth={5} strokeDasharray="14 10" /> : null)}
            {[1, 2, 3].map((k) => (A / 3.4) * k <= hH ? <text key={'x' + k} x={470} y={base - (A / 3.4) * k + 12} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{k}×</text> : null)}
            <rect x={630} y={base - hO} width={220} height={hO} fill={YC.oro} stroke={KC.ink} strokeWidth={6} />
            <text x={340} y={base + 44} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>hongo-oruga</text>
            <text x={740} y={base + 44} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>oro</text>
            <text x={540} y={base + 88} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>precio por kilo · 2017</text>
          </g>; })())}
      </Escena>
      {/* 9 · recolectores: lo desentierran en la montaña */}
      <Escena T={T} a={K.Re} b={K.E} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Montanas T={T} y0={1300} />
          {[[150, 1000, 0], [380, 1040, 1], [600, 1010, 2]].map(([x, y, i]) => <g key={i}>
            <Recolector T={T} x={x} y={y} s={0.9} fase={i * 1.3} color={[KC.coral, KC.blue, KC.orange][i]} />
            {kprog(T, K.Re + 0.8 + i * 0.5, K.Re + 1.2 + i * 0.5) > 0 && <g transform={`translate(${x + 110} ${y + 10}) scale(${0.35 * kprog(T, K.Re + 0.8 + i * 0.5, K.Re + 1.2 + i * 0.5, kEase.rebote)})`}><Yartsa x={0} y={0} angCuerpo={90} angTallo={-90} largo={200} ancho={52} tallo={260} /></g>}
            {Array.from({ length: 3 }, (_, k) => { const t0 = K.Re + 1.4 + i * 0.5 + k * 0.25; const u = kprog(T, t0, t0 + 1.0, kEase.sale); return u > 0 && u < 1 ? <g key={k} opacity={1 - u}><Moneda x={x + 110 + k * 20} y={y - 60 - u * 260} s={0.9} /></g> : null; })}
          </g>)}
        </>)}
      </Escena>
      {/* 10 · el estudio de 2018: reportes de más de 800 personas en 4 países */}
      <Escena T={T} a={K.E} b={K.Mn} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g transform="translate(20 60) scale(0.88)"><MapaRegion T={T} at={K.E + 2.4} />
          {Array.from({ length: 40 }, (_, i) => { const g = krng(i + 7); const px = 150 + g() * 520, py = 640 + g() * 440; const t0 = K.E + 3.0 + i * 0.05;
            return T > t0 ? <circle key={i} cx={px} cy={py} r={9 * kprog(T, t0, t0 + 0.25, kEase.rebote)} fill={KC.violet} stroke="#fff" strokeWidth={3} /> : null; })}</g>
        </>)}
      </Escena>
      {/* 11 · cada vez menos: sobre todo por recolectar de más; el calentamiento también influye */}
      <Escena T={T} a={K.Mn} b={K.V} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <line x1={90} y1={1120} x2={640} y2={1120} stroke={KC.ink} strokeWidth={7} /><line x1={90} y1={1120} x2={90} y2={720} stroke={KC.ink} strokeWidth={7} />
          {barras.map((h, i) => { const u = kprog(T, K.Mn + 0.2 + i * 0.25, K.Mn + 0.6 + i * 0.25, kEase.sale); return <rect key={i} x={120 + i * 100} y={1120 - 360 * h * u} width={70} height={360 * h * u} fill={YC.estroma} stroke={KC.ink} strokeWidth={5} />; })}
          <text x={360} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>cosecha (esquema)</text>
          {kprog(T, K.Mn + 3.4, K.Mn + 3.8) > 0 && <g opacity={kprog(T, K.Mn + 3.4, K.Mn + 3.8)} transform="translate(820 900)">
            <rect x={-26} y={-200} width={52} height={260} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={-12} y={-180 + 220 * (1 - kprog(T, K.Mn + 3.6, K.Mn + 5.4))} width={24} height={220 * kprog(T, K.Mn + 3.6, K.Mn + 5.4) + 20} rx={12} fill={KC.red} />
            <circle cx={0} cy={80} r={46} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
          </g>}
        </>)}
      </Escena>
      {/* 12 · vulnerable en la Lista Roja de la UICN */}
      <Escena T={T} a={K.V} b={K.C} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g transform="translate(300 880) scale(0.9)"><Yartsa x={0} y={0} angCuerpo={70} angTallo={-110} largo={260} ancho={60} tallo={360} /></g>
          <Sello T={T} at={K.V + 0.3} x={480} y={720} texto="VU" color={KC.red} r={150} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma ramita en la misma mano, ahora con la montaña y la gente detrás */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={kprog(T, K.C + 0.3, K.C + 1.2)}><Montanas T={T} y0={1000} pasto={false} />
            {[[120, 760], [860, 790]].map(([x, y], i) => <Recolector key={i} T={T} x={x} y={y} s={0.5} fase={i} color={[KC.coral, KC.blue][i]} espejo={i === 1} />)}</g>
          <g transform={`translate(${540 - 540 * 1.12} ${940 - 940 * 1.12}) scale(1.12)`}>
            <Mano x={560} y={1130} s={1.2} />
            <Yartsa T={T} x={560} y={820} angCuerpo={35} angTallo={-125} largo={380} ancho={88} tallo={480} />
          </g>
        </>)}
      </Escena>

      {/* textos en pantalla */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 2.0} until={K.G + 3.4} texto="una ramita" x={330} y={420} tam={52} />
      <Etq T={T} at={K.G + 2.6} until={K.Me - 0.3} x={420} y={640} lado="izq" texto="hongo (tallo)" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.0} until={K.Me - 0.3} x={640} y={1080} lado="izq" texto="oruga momificada" tam={34} color={KC.ink} />
      <Caja T={T} at={K.N + 0.2} until={K.Me - 0.3} x={50} y={420} texto="Ophiocordyceps sinensis" it tam={36} />
      <Caja T={T} at={K.N + 0.9} until={K.Me - 0.3} x={50} y={500} texto="yartsa gunbu (Tíbet)" tam={32} />
      <Chip T={T} at={K.Me + 0.4} until={K.L - 0.3} texto="Tíbet · Himalaya" x={400} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Me + 2.0} until={K.L - 0.3} x={1020} y={1000} lado="izq" texto="pastizal alpino" tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 0.6} until={K.I - 0.3} x={60} y={470} texto="polilla fantasma · Thitarodes" tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 1.2} until={K.I - 0.3} x={60} y={1010} texto="oruga (larva) bajo tierra" tam={30} />
      <Chip T={T} at={K.L + 2.0} until={K.I - 0.3} texto="3 años o más" x={330} y={700} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.I + 0.2} until={K.Ta - 0.3} texto="POR DENTRO · esquemático" x={380} y={470} tam={32} borde={KC.gold} mono />
      <Etq T={T} at={K.I + 1.6} until={K.Ta - 0.3} x={60} y={700} texto="hifas del hongo" tam={32} color={FK.hifa} />
      <Etq T={T} at={K.I + 2.8} until={K.Ta - 0.3} x={60} y={1060} texto="oruga muerta y rígida" tam={32} color={KC.gold2} />
      <Chip T={T} at={K.Ta + 0.2} until={K.P - 0.3} texto="primavera · deshielo" x={330} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ta + 2.2} until={K.P - 0.3} x={590} y={640} texto="estroma (el tallo)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ta + 2.4} until={K.P - 0.3} x={580} y={1000} texto="sale de la cabeza" tam={30} />
      <NumeroGigante T={T} at={K.Pr + 0.4} until={K.Pr + 2.9} valor={140000} dur={1.0} sufijo=" USD" etiqueta="más de… por kilo" x={540} y={620} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.Pr + 0.9} until={K.Pr + 2.9} texto="Pekín, 2017 · los mejores" x={540} y={800} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Pr + 3.6} until={K.Re - 0.3} texto="más del triple que el oro" x={360} y={480} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Pr + 4.0} until={K.Re - 0.3} x={60} y={590} texto="precio de 2017 (PNAS, 2018)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Re + 0.3} until={K.E - 0.3} texto="cientos de miles de recolectores" x={360} y={480} tam={30} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.3} anio="2018" quien="Stanford y Colorado State" revista="Hopping, Chignell y Lambin · PNAS" x={460} y={640} />
      {T < K.Mn - 0.2 && <Contador T={T} at={K.E + 3.0} desde={0} hasta={800} dur={2.0} sufijo="+ personas" x={360} y={510} tam={56} color={KC.texto} />}
      <Etq T={T} at={K.E + 3.4} until={K.Mn - 0.3} x={60} y={1110} texto="mapa esquemático" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Mn + 0.3} until={K.V - 0.3} texto="cada vez menos" x={330} y={480} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Mn + 1.6} until={K.V - 0.3} x={60} y={560} texto="1º recolectar de más" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Mn + 3.6} until={K.V - 0.3} x={1020} y={1110} lado="izq" texto="calentamiento" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Mn + 2.4} until={K.Mn + 3.5} texto="lo sacan antes de que suelte esporas" x={380} y={650} tam={26} borde={KC.red} />
      <Chip T={T} at={K.V + 0.6} until={K.C - 0.2} texto="Lista Roja de la UICN" x={380} y={480} tam={34} borde={KC.red} />
      <Etq T={T} at={K.V + 0.9} until={K.C - 0.2} x={640} y={900} texto="vulnerable" tam={36} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="oruga + hongo + ingreso" x={360} y={480} tam={36} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Me} texto="2 cm (tallo) · oruga esquemática" largo={160} />
      <BarraEscala T={T} at={K.Me} until={K.L} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.L} until={K.I} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.I} until={K.Ta} texto="esquemático" largo={160} />
      <BarraEscala T={T} at={K.Ta} until={K.P} texto="2 cm (tallo) · oruga esquemática" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm (tallo) · oruga esquemática" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No es una ramita: *es una oruga.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.Me - 0.1} texto="En el Tíbet: *yartsa gunbu.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.L - 0.1} texto="Arriba de *3,000 metros.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.I - 0.1} texto="Orugas bajo tierra *3 años o más.*" />
      <Subtitulo T={T} idx={4} at={K.I + 0.1} until={K.Ta - 0.1} texto="La llena por dentro: *momia.*" />
      <Subtitulo T={T} idx={5} at={K.Ta + 0.1} until={K.P - 0.1} texto="En primavera *sale el tallo.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Por qué *tanta gente lo busca?*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.Re - 0.1} texto="2017: *más del triple que el oro.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.E - 0.1} texto="Ingreso de *cientos de miles.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Mn - 0.1} texto="2018: *más de 800 personas.*" />
      <Subtitulo T={T} idx={10} at={K.Mn + 0.1} until={K.V - 0.1} texto="Cada vez menos: *recolectar de más.*" />
      <Subtitulo T={T} idx={11} at={K.V + 0.1} until={K.C - 0.1} texto="La UICN: *vulnerable.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Oruga, hongo *e ingreso.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.Me + 2.6, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.L + 0.8, K.I + 2.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P - 0.1, K.Pr + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pr + 3.0, K.Re - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Re + 0.4, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 2.6, K.Mn - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Mn + 1.4, K.V - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.V + 0.2, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="53" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function YartsaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><YartsaShot /></CompositionStage></div>;
}
window.YartsaApp = YartsaApp;
