// Shot Fungi Mati #54 · Ese hilito blanco no es el internet del bosque: es un mercado — NARRADO (N6 mito vs dato + N1 macro → micro → macro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const MZ = { corteza:'#8a5a32', corteza2:'#6e4424', raiz:'#9b6a3c', raiz2:'#7a4f2a', hifa:'#fff4d6', abedul:'#f4f1ea', hojaAbedul:'#9fd356', hojaAbedul2:'#c9e86f',
  celula:'#d9b98a', celula2:'#c9a271', estela:'#e7c96a', suelo:'#6b4a2b', verde:'#2f9e44', verde2:'#46c25a' };

// Sello rectangular de evidencia (COMPROBADO / EN DEBATE / SIN EVIDENCIA) con una línea chica abajo. Cae con golpe.
function SelloRect({ T, at, until, x, y, titulo, sub, color = KC.leaf, rot = -8, escala = 1, tam = 64 }) {
  if (T < at || (until != null && T > until + 0.4)) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), o = kprog(T, at, at + 0.12) * (until != null ? 1 - kprog(T, until, until + 0.4) : 1);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, opacity:o, transform:`translate(-50%,-50%) rotate(${rot}deg) scale(${klerp(2.2, 1, k) * escala})` }}>
    <div style={{ border:`9px solid ${color}`, outline:`3px solid ${color}`, outlineOffset:6, borderRadius:16, padding:'8px 26px 10px', background:'rgba(255,255,255,.9)', textAlign:'center', boxShadow:'0 12px 30px rgba(0,0,0,.35)' }}>
      <div style={{ font:`400 ${tam}px/1 ${KF.titulo}`, color, letterSpacing:'.04em', whiteSpace:'nowrap' }}>{titulo}</div>
      {sub && <div style={{ font:`700 ${Math.round(tam * 0.42)}px ${KF.mono}`, color:KC.ink, marginTop:4, whiteSpace:'nowrap' }}>{sub}</div>}
    </div>
  </div>;
}

// Ícono de wifi ("internet del bosque").
function Wifi({ x, y, s = 1, color = '#2346ff', o = 1, tachado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={110} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    {[70, 48, 26].map((r, i) => <path key={i} d={`M ${-r} ${20 - r * 0.15} A ${r} ${r} 0 0 1 ${r} ${20 - r * 0.15}`} transform="translate(0 10)" stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    <circle cx={0} cy={36} r={11} fill={color} />
    {tachado > 0 && <line x1={-78} y1={-78} x2={-78 + 156 * tachado} y2={-78 + 156 * tachado} stroke={KC.red} strokeWidth={20} strokeLinecap="round" />}
  </g>;
}

// Toldo de mercado (rayas y holanes) con dos postes.
function Toldo({ x, y, w = 300, s = 1, alto = 170 }) {
  if (s <= 0) return null;
  const n = 6, a = w / n;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-w / 2 + 8} y={0} width={14} height={alto} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
    <rect x={w / 2 - 22} y={0} width={14} height={alto} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
    <path d={`M ${-w / 2 - 20} 0 L ${-w / 2 + 20} -70 L ${w / 2 - 20} -70 L ${w / 2 + 20} 0 Z`} fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: n }, (_, i) => i % 2 ? null : <path key={i} d={`M ${-w / 2 - 20 + i * (w + 40) / n} 0 L ${-w / 2 + 20 + i * (w - 40) / n} -70 L ${-w / 2 + 20 + (i + 1) * (w - 40) / n} -70 L ${-w / 2 - 20 + (i + 1) * (w + 40) / n} 0 Z`} fill={KC.red} />)}
    <path d={`M ${-w / 2 - 20} 0 L ${-w / 2 + 20} -70 L ${w / 2 - 20} -70 L ${w / 2 + 20} 0 Z`} fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {Array.from({ length: n }, (_, i) => { const x0 = -w / 2 - 20 + i * (w + 40) / n, x1 = x0 + (w + 40) / n; return <path key={'h' + i} d={`M ${x0} 0 Q ${(x0 + x1) / 2} 44 ${x1} 0 Z`} fill={i % 2 ? '#fff' : KC.red} stroke={KC.ink} strokeWidth={5} />; })}
  </g>;
}

// Close-up del pie de un árbol: base del tronco, raíces y el hilito blanco (micelio) en las puntas. hif 0..1 = crece el micelio.
function PieDeArbol({ T, hif = 1 }) {
  return <g>
    <rect x={0} y={700} width={KW} height={KH - 700} fill={MZ.suelo} />
    <rect x={0} y={700} width={KW} height={22} fill="#4f3520" />
    {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 40); return <ellipse key={i} cx={g() * KW} cy={760 + g() * 700} rx={8 + g() * 16} ry={6 + g() * 9} fill={i % 3 ? '#80603f' : '#5a3d24'} />; })}
    <path d="M 210 -40 L 460 -40 L 470 560 Q 490 680 560 730 L 110 730 Q 180 680 200 560 Z" fill={MZ.corteza} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[250, 40, 320], [330, 120, 260], [410, 60, 380], [290, 420, 140]].map(([x, y, h], i) => <path key={i} d={`M ${x} ${y} q 10 ${h / 2} 0 ${h}`} stroke={MZ.corteza2} strokeWidth={8} fill="none" strokeLinecap="round" />)}
    {[
      'M 300 720 Q 230 860 190 980 Q 160 1080 110 1160',
      'M 360 720 Q 420 880 520 990 Q 590 1070 620 1130',
      'M 430 715 Q 600 780 760 870 Q 860 930 960 960',
      'M 250 720 Q 120 780 40 820',
    ].map((d, i) => <g key={i}><path d={d} stroke={KC.ink} strokeWidth={46 - i * 6} fill="none" strokeLinecap="round" /><path d={d} stroke={MZ.raiz} strokeWidth={34 - i * 6} fill="none" strokeLinecap="round" /></g>)}
    {[[190, 980, 140, 1030], [520, 990, 470, 1060], [760, 870, 800, 950], [620, 1130, 690, 1180], [110, 1160, 70, 1220]].map(([a, b, c, d], i) =>
      <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2 + 20} ${(b + d) / 2} ${c} ${d}`} stroke={MZ.raiz2} strokeWidth={10} fill="none" strokeLinecap="round" />)}
    <RedHifas T={T} x={630} y={1135} g={hif} seed={5} n={110} escala={0.11} circ ancho={3.5} color={MZ.hifa} brillo={0.5} />
    <RedHifas T={T} x={120} y={1170} g={kclamp(hif * 1.2 - 0.1, 0, 1)} seed={7} n={80} escala={0.085} circ ancho={3} color={MZ.hifa} brillo={0.5} />
    <RedHifas T={T} x={950} y={960} g={kclamp(hif * 1.2 - 0.2, 0, 1)} seed={9} n={80} escala={0.085} circ ancho={3} color={MZ.hifa} brillo={0.5} />
  </g>;
}

// Abedul de papel joven (Betula papyrifera): tronco blanco con marcas negras, copa verde clara. Base en (x, y).
function Abedul({ T, x, y, s = 1, seed = 2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.3) * 1.2})`}>
    <rect x={-20} y={-420} width={40} height={420} rx={10} fill={MZ.abedul} stroke={KC.ink} strokeWidth={6} />
    {[[-60, 8], [-140, -6], [-230, 10], [-320, -4]].map(([yy, dx], i) => <rect key={i} x={-16 + dx * 0.3} y={yy} width={22} height={7} rx={3} fill={KC.ink} />)}
    {[[-90, -440, 110], [80, -450, 100], [0, -540, 130], [-40, -380, 80], [60, -370, 80]].map(([cx, cy, r], i) =>
      <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? MZ.hojaAbedul2 : MZ.hojaAbedul} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}

// Árbol de hoja ancha (para el "video viral" y el árbol madre). corona = 0..1.
function ArbolAncho({ T, x, y, s = 1, corona = 0, seed = 1, color = MZ.verde, color2 = MZ.verde2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, seed, 0.3) * 1})`}>
    <path d="M -34 0 L -24 -300 L 24 -300 L 34 0 Z" fill={MZ.corteza} stroke={KC.ink} strokeWidth={6} />
    {[[-110, -330, 120], [110, -330, 120], [0, -440, 150], [-60, -260, 90], [70, -250, 90]].map(([cx, cy, r], i) =>
      <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? color2 : color} stroke={KC.ink} strokeWidth={6} />)}
    {corona > 0 && <g transform={`translate(0 ${-640}) scale(${corona})`}>
      <path d="M -80 40 L -90 -40 L -40 0 L 0 -60 L 40 0 L 90 -40 L 80 40 Z" fill={KC.gold2} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </g>}
  </g>;
}

// Plantita con raíces (para la cuadrícula de "8 de cada 10").
function Plantita({ x, y, s = 1, myc = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L 0 -90" stroke="#2f7d32" strokeWidth={8} />
    <path d="M 0 -60 Q -50 -90 -60 -60 Q -30 -40 0 -60 Z" fill={MZ.verde2} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 -80 Q 50 -110 60 -80 Q 30 -60 0 -80 Z" fill={MZ.verde} stroke={KC.ink} strokeWidth={4} />
    <path d="M 0 0 L 0 50 M 0 20 L -26 52 M 0 22 L 26 54" stroke={MZ.raiz} strokeWidth={6} strokeLinecap="round" />
    {myc > 0 && <g opacity={myc}>{[[-26, 52], [26, 54], [0, 50]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={16} fill="none" stroke={MZ.hifa} strokeWidth={4} strokeDasharray="5 4" />)}</g>}
  </g>;
}

// Corte de una raicita con ectomicorriza (esquemático): estela, corteza, epidermis, manto de hongo por fuera y red de Hartig entre las células.
const CORTE = { cx: 540, cy: 860, rE: 95, rC: 175, rEp: 245, rM: 285 };
function CorteRaiz({ T, manto = 1, hartig = 1, hifas = 1 }) {
  const { cx, cy, rE, rC, rEp, rM } = CORTE;
  const sector = (a0, a1, r0, r1) => `M ${cx + Math.cos(a0) * r0} ${cy + Math.sin(a0) * r0} A ${r0} ${r0} 0 0 1 ${cx + Math.cos(a1) * r0} ${cy + Math.sin(a1) * r0} L ${cx + Math.cos(a1) * r1} ${cy + Math.sin(a1) * r1} A ${r1} ${r1} 0 0 0 ${cx + Math.cos(a0) * r1} ${cy + Math.sin(a0) * r1} Z`;
  const NE = 20, NC = 14, gap = 0.035;
  const hifasFuera = Array.from({ length: 16 }, (_, i) => { const g = krng(i + 11); const a = i / 16 * Math.PI * 2 + g() * 0.2, L = 160 + g() * 160; return { a, L, c: (g() - 0.5) * 120, b: g() }; });
  return <g>
    {hifas > 0 && hifasFuera.map((h, i) => { const u = kclamp(hifas * 1.3 - h.b * 0.3, 0, 1); if (u <= 0) return null; const r0 = rM - 4, r1 = rM + h.L * u;
      const x0 = cx + Math.cos(h.a) * r0, y0 = cy + Math.sin(h.a) * r0, x1 = cx + Math.cos(h.a) * r1 + Math.cos(h.a + 1.57) * h.c * u * 0.4, y1 = cy + Math.sin(h.a) * r1 + Math.sin(h.a + 1.57) * h.c * u * 0.4;
      return <g key={i}><path d={`M ${x0} ${y0} Q ${(x0 + x1) / 2 + Math.cos(h.a + 1.57) * h.c * 0.3} ${(y0 + y1) / 2 + Math.sin(h.a + 1.57) * h.c * 0.3} ${x1} ${y1}`} stroke={MZ.hifa} strokeWidth={5} fill="none" strokeLinecap="round" />
        {u > 0.6 && <path d={`M ${x1} ${y1} l ${Math.cos(h.a - 0.7) * 50} ${Math.sin(h.a - 0.7) * 50}`} stroke={MZ.hifa} strokeWidth={4} fill="none" strokeLinecap="round" />}</g>; })}
    {manto > 0 && <circle cx={cx} cy={cy} r={rEp + (rM - rEp) * manto} fill={MZ.hifa} stroke={KC.ink} strokeWidth={6} />}
    {manto > 0 && Array.from({ length: 40 }, (_, i) => { const a = i / 40 * Math.PI * 2; const r = rEp + 12 + (i % 3) * 9; return <path key={i} d={`M ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r} q ${Math.cos(a + 1.6) * 18} ${Math.sin(a + 1.6) * 18} ${Math.cos(a + 1.57) * 30} ${Math.sin(a + 1.57) * 30}`} stroke="#d8c9a3" strokeWidth={3} fill="none" opacity={manto} />; })}
    <circle cx={cx} cy={cy} r={rEp} fill={hartig > 0 ? MZ.hifa : '#a07a4c'} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: NE }, (_, i) => { const a0 = i / NE * Math.PI * 2 + gap, a1 = (i + 1) / NE * Math.PI * 2 - gap * (0.4 + 0.6 * (1 - hartig)); return <path key={i} d={sector(a0, a1, rC + 4, rEp - 6 * hartig)} fill={MZ.celula} stroke={KC.ink} strokeWidth={3} />; })}
    {Array.from({ length: NC }, (_, i) => { const a0 = i / NC * Math.PI * 2 + 0.03, a1 = (i + 1) / NC * Math.PI * 2 - 0.03; return <path key={i} d={sector(a0, a1, rE + 6, rC - 2)} fill={MZ.celula2} stroke={KC.ink} strokeWidth={3} />; })}
    <circle cx={cx} cy={cy} r={rE} fill={MZ.estela} stroke={KC.ink} strokeWidth={5} />
    {[[0, 0], [-40, -30], [40, -25], [-30, 40], [35, 38]].map(([dx, dy], i) => <circle key={i} cx={cx + dx} cy={cy + dy} r={16} fill="#f6e3a0" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}

// Parcela vista desde arriba (mapa esquemático): árboles como puntos; el mismo hongo se enciende en 19 de ellos.
const PARCELA = { x: 110, y: 620, l: 600 };
const ARBOLES_PARCELA = (() => { const g = krng(54), pts = []; let tries = 0;
  while (pts.length < 34 && tries < 2000) { tries++; const p = [PARCELA.x + 40 + g() * (PARCELA.l - 80), PARCELA.y + 70 + g() * (PARCELA.l - 110), 10 + g() * 18];
    if (pts.every((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) > 58)) pts.push(p); }
  const c = [PARCELA.x + PARCELA.l * 0.48, PARCELA.y + PARCELA.l * 0.55];
  const orden = pts.map((p, i) => [Math.hypot(p[0] - c[0], p[1] - c[1]) + (i % 5) * 18, i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  const lit = new Set(orden.slice(0, 19));
  return { pts, c, orden: orden.slice(0, 19), lit }; })();
function Parcela({ T, at }) {
  const { x, y, l } = PARCELA, { pts, c, orden } = ARBOLES_PARCELA;
  return <g>
    <rect x={x} y={y} width={l} height={l} rx={10} fill="#3d8a46" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 5 }, (_, i) => <g key={i}><line x1={x + (i + 1) * l / 6} y1={y} x2={x + (i + 1) * l / 6} y2={y + l} stroke="rgba(255,255,255,.15)" strokeWidth={2} /><line x1={x} y1={y + (i + 1) * l / 6} x2={x + l} y2={y + (i + 1) * l / 6} stroke="rgba(255,255,255,.15)" strokeWidth={2} /></g>)}
    <text x={x + 20} y={y + 42} style={{ font:`700 24px ${KF.mono}` }} fill="#e8ffe0">mapa esquemático · 30 × 30 m</text>
    {orden.map((i, k) => { const u = kprog(T, at + 0.6 + k * 0.12, at + 0.9 + k * 0.12); if (u <= 0) return null; const p = pts[i];
      return <line key={'l' + k} x1={c[0]} y1={c[1]} x2={klerp(c[0], p[0], u)} y2={klerp(c[1], p[1], u)} stroke={KC.orange} strokeWidth={6} strokeLinecap="round" opacity={0.9} />; })}
    {pts.map((p, i) => { const k = orden.indexOf(i); const on = k >= 0 ? kprog(T, at + 0.9 + k * 0.12, at + 1.0 + k * 0.12) : 0;
      return <g key={i}><circle cx={p[0]} cy={p[1]} r={p[2] + 6} fill={mixHex('#1f5e2a', KC.orange, on)} stroke={KC.ink} strokeWidth={4} />
        {on > 0 && <circle cx={p[0]} cy={p[1]} r={(p[2] + 6) * (1 + (1 - on) * 1.5)} fill="none" stroke={KC.yellow} strokeWidth={4} opacity={1 - on * 0.6} />}</g>; })}
    <circle cx={c[0]} cy={c[1]} r={18 * kprog(T, at + 0.3, at + 0.6, kEase.rebote)} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Experimento de 1997 (esquemático): abedul joven con bolsa de marcaje y abeto de Douglas vecino; el carbono marcado (puntos) viaja.
function Experimento({ T, a, debate }) {
  const bolsa = kprog(T, a + 1.0, a + 1.5);
  const gnd = 1010;
  const pathH = [[300, 640], [300, 1000], [310, 1110], [420, 1150], [560, 1160], [680, 1120], [760, 1060], [760, 700]]; // por la hifa
  const pathS = [[310, 1110], [380, 1230], [540, 1270], [700, 1220], [760, 1060]]; // por el suelo
  const sobre = (pts, u) => { const n = pts.length - 1, f = kclamp(u, 0, 0.9999) * n, i = Math.floor(f), t = f - i; return [klerp(pts[i][0], pts[i + 1][0], t), klerp(pts[i][1], pts[i + 1][1], t)]; };
  const d2 = (pts) => 'M ' + pts.map((p) => p.join(' ')).join(' L ');
  const dbt = debate != null ? kprog(T, debate, debate + 0.8) : 0;
  return <g>
    <rect x={0} y={gnd} width={KW} height={KH - gnd} fill={MZ.suelo} />
    {Array.from({ length: 16 }, (_, i) => { const g = krng(i + 90); return <ellipse key={i} cx={g() * KW} cy={gnd + 40 + g() * 360} rx={8 + g() * 12} ry={6 + g() * 7} fill="#80603f" />; })}
    <path d="M 300 1010 L 300 1080 M 300 1040 L 250 1100 M 300 1050 L 350 1110" stroke={MZ.raiz} strokeWidth={10} strokeLinecap="round" fill="none" />
    <path d="M 760 1010 L 760 1070 M 760 1030 L 700 1100 M 760 1040 L 815 1100" stroke={MZ.raiz} strokeWidth={10} strokeLinecap="round" fill="none" />
    <path d={d2(pathH.slice(2, 7))} stroke={MZ.hifa} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
    <Abedul T={T} x={300} y={gnd} s={0.62} />
    <Conifera T={T} x={760} y={gnd} s={0.55} seed={3} />
    {bolsa > 0 && <path d="M 170 690 Q 160 560 300 540 Q 440 560 430 690 L 400 760 Q 300 790 200 760 Z" fill="rgba(220,245,255,.45)" stroke="#e8f8ff" strokeWidth={6} opacity={bolsa} />}
    {Array.from({ length: 10 }, (_, i) => { const t0 = a + 1.6 + i * 0.35; if (T < t0) return null; const u = ((T - t0) / 3.2) % 1;
      const viaSuelo = dbt > 0 && i % 2 === 1;
      const [px, py] = viaSuelo ? (u < 0.3 ? sobre(pathH, u) : sobre(pathS, (u - 0.3) / 0.7 * 0.999)) : sobre(pathH, u);
      return <circle key={i} cx={px} cy={py} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} style={{ filter:`drop-shadow(0 0 8px ${KC.yellow})` }} />; })}
    {dbt > 0 && <g opacity={dbt}>
      <path d={d2(pathS)} stroke="rgba(255,230,120,.75)" strokeWidth={5} strokeDasharray="14 12" fill="none" />
      <text x={560} y={1125} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4}>?</text>
      <text x={540} y={1330} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4}>?</text>
    </g>}
  </g>;
}

// Bosque del "video viral": árbol grande con corona y arbolitos unidos por "cables" que brillan.
function BosqueViral({ T, x0 = 0, y0 = 0, s = 1, pulso = 1, corona = 1, apagado = 0 }) {
  const kids = [[-250, 30, 0.38], [230, 20, 0.42], [380, 40, 0.3], [-400, 40, 0.3]];
  return <g transform={`translate(${x0} ${y0}) scale(${s})`}>
    <rect x={-600} y={0} width={1200} height={500} fill={MZ.suelo} />
    {kids.map(([dx, dy, k], i) => { const d = `M 0 60 Q ${dx / 2} ${140 + i * 20} ${dx} ${dy + 40}`;
      return <g key={i}><path d={d} stroke={mixHex(KC.cyan, '#777777', apagado)} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.85} />
        {pulso > 0 && apagado < 1 && (() => { const u = (T * 0.8 + i * 0.25) % 1; const qx = 2 * (1 - u) * u * dx / 2 + u * u * dx, qy = (1 - u) * (1 - u) * 60 + 2 * (1 - u) * u * (140 + i * 20) + u * u * (dy + 40);
          return <circle cx={qx} cy={qy} r={13} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} opacity={1 - apagado} />; })()}</g>; })}
    {kids.map(([dx, dy, k], i) => <ArbolAncho key={'k' + i} T={T} x={dx} y={dy} s={k} seed={i + 2} />)}
    <ArbolAncho T={T} x={0} y={10} s={0.95} corona={corona} seed={1} />
  </g>;
}

function MicorrizasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Viral, Mi: CUES.Micorriza, Tr: CUES.Trato, Ca: CUES.Casitodas, P: CUES.Pregunta, R: CUES.Red, Si: CUES.Simard, De: CUES.Debate, Ma: CUES.Madre, Ci: CUES.Citas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const wifiG = kprog(T, K.G + 0.7, K.G + 1.0, kEase.rebote) * (1 - kprog(T, K.G + 3.0, K.G + 3.4));
  const toldoG = kprog(T, K.G + 3.3, K.G + 3.8, kEase.rebote);
  const ESP = ['P', 'N'];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el pie de un árbol, sus raíces y el hilito blanco. ¿Internet? No: mercado */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.05} origen="55% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PieDeArbol T={T} hif={kprog(T, K.G + 0.05, K.G + 1.3, kEase.sale)} />
          {wifiG > 0 && <Wifi x={640} y={960} s={0.75 * wifiG} tachado={kprog(T, K.G + 2.2, K.G + 2.6)} />}
          <Toldo x={630} y={1010} w={320} s={toldoG} alto={110} />
        </>)}
      </Escena>
      {/* 2 · lo viral: un teléfono con el "árbol madre" y su red */}
      <Escena T={T} a={K.V} b={K.Mi} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={170} y={520} width={460} height={700} rx={50} fill={KC.ink} />
          <rect x={192} y={560} width={416} height={620} rx={22} fill="#bfe8ff" />
          <svg x={192} y={560} width={416} height={620} viewBox="0 0 416 620"><BosqueViral T={T} x0={208} y0={420} s={0.42} corona={kprog(T, K.V + 1.2, K.V + 1.6, kEase.rebote)} /></svg>
          <rect x={360} y={530} width={80} height={12} rx={6} fill="#333" />
          <path d="M 560 1130 l 0 -30 l 26 15 Z" fill="#fff" opacity=".85" />
          {[0, 1, 2].map((i) => <circle key={i} cx={575} cy={760 + i * 90} r={26} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={3} />)}
        </>)}
      </Escena>
      {/* 3–4 · por dentro: la raicita con su micorriza (manto + red de Hartig) y el mercado P/N ⇄ azúcares */}
      <Escena T={T} a={K.Mi} b={K.Ca} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <CorteRaiz T={T} manto={kprog(T, K.Mi + 0.3, K.Mi + 1.4, kEase.sale)} hartig={kprog(T, K.Mi + 1.2, K.Mi + 2.4)} hifas={kprog(T, K.Mi + 0.6, K.Mi + 2.6)} />
          {T > K.Tr && Array.from({ length: 8 }, (_, i) => { const t0 = K.Tr + 0.3 + i * 0.3; if (T < t0) return null; const u = ((T - t0) / 2.4) % 1; const a = i * 0.8 + 0.4;
            const r = klerp(560, 230, kEase.suave(u)); const x = CORTE.cx + Math.cos(a) * r, y = CORTE.cy + Math.sin(a) * r;
            return <g key={'n' + i} transform={`translate(${x} ${y})`}><circle r={26} fill={i % 2 ? '#7cc8ff' : KC.lilac} stroke={KC.ink} strokeWidth={4} /><text y={11} textAnchor="middle" style={{ font:`400 32px ${KF.titulo}` }} fill={KC.ink}>{ESP[i % 2]}</text></g>; })}
          {T > K.Tr + 1.6 && Array.from({ length: 7 }, (_, i) => { const t0 = K.Tr + 1.6 + i * 0.32; if (T < t0) return null; const u = ((T - t0) / 2.4) % 1; const a = i * 0.9 + 0.8;
            const r = klerp(90, 520, kEase.suave(u)); const x = CORTE.cx + Math.cos(a) * r, y = CORTE.cy + Math.sin(a) * r;
            return <g key={'s' + i} transform={`translate(${x} ${y}) rotate(${T * 60 + i * 30})`}><rect x={-17} y={-17} width={34} height={34} rx={5} fill="#fff" stroke={KC.ink} strokeWidth={4} /><rect x={-9} y={-9} width={8} height={8} fill="#e2e2e2" /></g>; })}
        </>)}
      </Escena>
      {/* 5 · 8 de cada 10 especies de plantas */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 10 }, (_, i) => { const cx = 150 + (i % 5) * 195, cy = 700 + Math.floor(i / 5) * 290; const on = kprog(T, K.Ca + 0.5 + i * 0.16, K.Ca + 0.8 + i * 0.16);
            const fr = i < 8 ? 1 : i === 8 ? 0.5 : 0;
            return <g key={i}>
              <rect x={cx - 85} y={cy - 130} width={170} height={250} rx={24} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={6} />
              {fr > 0 && <rect x={cx - 82} y={cy - 127 + 244 * (1 - fr * on)} width={164} height={244 * fr * on} rx={20} fill={KC.leaf} opacity={0.85} />}
              <Plantita x={cx} y={cy + 30} s={1.05} myc={fr > 0 ? on : 0} />
            </g>; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿un mismo hongo en varios árboles? */}
      <Escena T={T} a={K.P} b={K.R} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1060} width={KW} height={900} fill={MZ.suelo} />
          <Conifera T={T} x={190} y={1060} s={0.5} seed={4} />
          <Conifera T={T} x={470} y={1060} s={0.45} seed={6} />
          <path d={`M 190 1080 Q 330 ${1180 + Math.sin(T * 3) * 8} 470 1080`} stroke={MZ.hifa} strokeWidth={7} fill="none" strokeDasharray={`${400 * kprog(T, K.P + 0.3, K.P + 1.5)} 999`} strokeLinecap="round" />
          <Interrogacion T={T} x={330} y={760} tam={420} />
        </>)}
      </Escena>
      {/* 7 · el mapa: el mismo hongo en raíces de hasta 19 abetos */}
      <Escena T={T} a={K.R} b={K.Si} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Parcela T={T} at={K.R} />)}
      </Escena>
      {/* 8–9 · el experimento de 1997 y el debate de 2023 */}
      <Escena T={T} a={K.Si} b={K.Ma} zoom={0.04}>
        <FondoLunares color={T < K.De ? KC.cyan : KC.yellow} />
        {fsvg(<g transform="translate(0 -130)"><rect x={0} y={1700} width={KW} height={400} fill={MZ.suelo} /><Experimento T={T} a={K.Si} debate={K.De + 0.6} /></g>)}
      </Escena>
      {/* 10 · ¿el árbol madre? sin evidencia */}
      <Escena T={T} a={K.Ma} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<BosqueViral T={T} x0={480} y0={1090} s={1.05} corona={1} apagado={kprog(T, K.Ma + 2.0, K.Ma + 3.0)} />)}
      </Escena>
      {/* 11 · las citas que exageran: ×2 en 25 años */}
      <Escena T={T} a={K.Ci} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <rect x={90} y={600} width={880} height={600} rx={24} fill="rgba(255,255,255,.9)" stroke={KC.ink} strokeWidth={7} />
          <line x1={170} y1={1110} x2={920} y2={1110} stroke={KC.ink} strokeWidth={6} />
          <line x1={170} y1={1110} x2={170} y2={680} stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 6 }, (_, i) => { const h = klerp(190, 380, i / 5) * kprog(T, K.Ci + 0.4 + i * 0.25, K.Ci + 0.9 + i * 0.25, kEase.sale);
            return <rect key={i} x={210 + i * 118} y={1110 - h} width={84} height={h} rx={8} fill={i === 5 ? KC.red : '#ff8f6b'} stroke={KC.ink} strokeWidth={5} />; })}
          <text x={545} y={1165} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>25 años →</text>
          <text x={200} y={660} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>citas que afirman de más</text>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma raíz del inicio, ya con su toldo y sus sellos */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="55% 60%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <PieDeArbol T={T} hif={1} />
          <Toldo x={630} y={1010} w={320} s={1} alto={110} />
          <Wifi x={880} y={1140} s={0.45} o={kprog(T, K.C + 2.6, K.C + 3.0)} />
          {T > K.C + 2.8 && <text x={880} y={1080} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.C + 2.8, K.C + 3.2)}>?</text>}
        </>)}
      </Escena>

      {/* textos y sellos */}
      <Chip T={T} at={K.G + 1.0} until={K.G + 3.1} texto="¿internet del bosque?" x={380} y={470} tam={38} borde={KC.blue} />
      <Chip T={T} at={K.G + 3.6} until={K.V - 0.3} texto="es un mercado" x={380} y={470} tam={44} borde={KC.red} />
      <Etq T={T} at={K.G + 1.4} until={K.V - 0.3} x={40} y={1090} texto="hilitos de hongo" tam={30} />
      <Chip T={T} at={K.V + 0.3} until={K.Mi - 0.3} texto="lo que se hizo viral" x={420} y={430} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.V + 1.6} until={K.Mi - 0.3} x={180} y={495} texto="«árbol madre»" tam={30} color={KC.ink} />
      <SelloRect T={T} at={K.Mi + 0.2} until={K.Tr - 0.3} x={380} y={440} titulo="COMPROBADO" color={KC.leaf} rot={-6} tam={66} />
      <Etq T={T} at={K.Mi + 1.0} until={K.Tr - 0.2} x={40} y={1120} texto="manto de hongo" tam={30} color={MZ.hifa} />
      <Etq T={T} at={K.Mi + 1.8} until={K.Tr - 0.2} x={60} y={560} texto="red de Hartig (entre células)" tam={28} color={MZ.hifa} />
      <Etq T={T} at={K.Mi + 2.4} until={K.Tr - 0.2} x={60} y={620} texto="micorriza = hongo + raíz" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Tr + 0.5} until={K.Ca - 0.3} texto="hongo → planta: fósforo · nitrógeno" x={540} y={440} tam={32} borde="#7cc8ff" />
      <Chip T={T} at={K.Tr + 1.8} until={K.Ca - 0.3} texto="planta → hongo: carbono, sobre todo azúcares" x={540} y={525} tam={30} borde={KC.gold2} />
      <Chip T={T} at={K.Ca + 0.4} until={K.P - 0.3} texto="85 % de las plantas vasculares · 8 % nunca" x={540} y={460} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.R + 0.3} until={K.Si - 0.3} x={60} y={430} texto="abeto de Douglas" tam={32} color={KC.ink} />
      <Etq T={T} at={K.R + 0.6} until={K.Si - 0.3} x={60} y={480} texto="Pseudotsuga menziesii" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 1.2} until={K.Si - 0.3} x={PARCELA.x + PARCELA.l * 0.48 + 30} y={PARCELA.y + PARCELA.l * 0.55 + 4} texto="Rhizopogon" it tam={28} color={KC.white} />
      <NumeroGigante T={T} at={K.R + 2.0} until={K.Si - 0.3} valor={19} dur={1.0} etiqueta="hasta" x={880} y={880} tam={170} color={KC.orange} />
      <Chip T={T} at={K.R + 2.4} until={K.Si - 0.3} texto="mismo ADN" x={880} y={1050} tam={30} borde={KC.orange} />
      <SelloRect T={T} at={K.R + 3.0} until={K.Si - 0.3} x={860} y={1160} titulo="COMPROBADO" sub="comparten hongo" color={KC.leaf} rot={-8} tam={46} />
      <Chip T={T} at={K.R + 0.9} until={K.Si - 0.3} texto="Canadá · Beiler et al., 2010" x={410} y={560} tam={26} borde={KC.ink} mono />
      <TarjetaEstudio T={T} at={K.Si + 0.2} until={K.Si + 3.4} anio="1997" quien="oeste de Canadá" revista="Simard et al., Nature" y={440} />
      <Etq T={T} at={K.Si + 2.0} until={K.De + 0.4} x={40} y={1000} texto="abedul de papel" tam={28} color={KC.white} />
      <Etq T={T} at={K.Si + 2.3} until={K.De + 0.4} x={40} y={1045} texto="Betula papyrifera" it tam={26} color={KC.white} />
      <Etq T={T} at={K.Si + 2.6} until={K.De + 0.4} x={1040} y={1000} lado="izq" texto="abeto de Douglas" tam={28} color={KC.white} />
      <Etq T={T} at={K.Si + 2.9} until={K.De + 0.4} x={1040} y={1045} lado="izq" texto="Pseudotsuga menziesii" it tam={26} color={KC.white} />
      <Chip T={T} at={K.Si + 3.6} until={K.De - 0.1} texto="carbono marcado ●" x={420} y={440} tam={34} borde={KC.yellow} />
      <SelloRect T={T} at={K.De + 0.3} until={K.Ma - 0.3} x={330} y={590} titulo="EN DEBATE" color="#d99a00" rot={-7} tam={64} />
      <Chip T={T} at={K.De + 0.8} until={K.Ma - 0.3} texto="Karst, Jones y Hoeksema · 2023" x={360} y={410} tam={26} borde={KC.ink} mono />
      <Etq T={T} at={K.De + 1.6} until={K.Ma - 0.3} x={40} y={470} texto="Nature Ecology & Evolution" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.De + 1.2} until={K.Ma - 0.3} x={600} y={910} texto="¿por el hongo?" tam={26} color={KC.white} />
      <Etq T={T} at={K.De + 1.6} until={K.Ma - 0.3} x={640} y={1110} texto="¿por el suelo?" tam={26} color={KC.white} />
      <Chip T={T} at={K.Ma + 0.3} until={K.Ci - 0.3} texto="¿el árbol madre?" x={380} y={430} tam={40} borde={KC.ink} />
      <SelloRect T={T} at={K.Ma + 2.0} until={K.Ci - 0.3} x={520} y={700} titulo="SIN EVIDENCIA" sub="según Karst et al. 2023" color={KC.red} rot={-8} tam={72} />
      <Chip T={T} at={K.Ci + 1.8} until={K.C - 0.3} texto="×2 en 25 años" x={380} y={470} tam={48} borde={KC.red} />
      <Etq T={T} at={K.Ci + 0.6} until={K.C - 0.3} x={60} y={540} texto="según Karst et al. 2023" tam={26} color={KC.ink} />
      <SelloRect T={T} at={K.C + 0.6} until={K.Ou} x={270} y={430} titulo="COMPROBADO" sub="es un mercado" color={KC.leaf} rot={-6} tam={44} />
      <SelloRect T={T} at={K.C + 2.4} until={K.Ou} x={270} y={580} titulo="EN DEBATE" sub="la red entre árboles" color="#d99a00" rot={4} tam={44} />
      <SelloRect T={T} at={K.C + 3.2} until={K.Ou} x={290} y={735} titulo="SIN EVIDENCIA" sub="el «árbol madre»" color={KC.red} rot={-5} tam={44} />
      <Chip T={T} at={K.C + 3.6} until={K.Ou} texto="internet del bosque: se investiga" x={540} y={870} tam={30} borde={KC.blue} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.V} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.Mi} until={K.Ca} texto="100 µm" largo={160} />
      <BarraEscala T={T} at={K.Ca} until={K.P} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.R} texto="1 m" largo={140} />
      <BarraEscala T={T} at={K.R} until={K.Si} texto="10 m" largo={200} />
      <BarraEscala T={T} at={K.Si} until={K.Ma} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Ma} until={K.Ci} texto="1 m" largo={120} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es internet: *es un mercado.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Mi - 0.1} texto="¿Un *árbol madre* que alimenta a sus hijos?" />
      <Subtitulo T={T} idx={2} at={K.Mi + 0.1} until={K.Tr - 0.1} texto="Las *micorrizas* se meten en las raíces." />
      <Subtitulo T={T} idx={3} at={K.Tr + 0.1} until={K.Ca - 0.1} texto="Fósforo y nitrógeno *por azúcares.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.P - 0.1} texto="Más de *8 de cada 10* plantas." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.R - 0.1} texto="¿Un mismo hongo *en varios árboles?*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Si - 0.1} texto="Sí: en *hasta 19 abetos.*" />
      <Subtitulo T={T} idx={7} at={K.Si + 0.1} until={K.De - 0.1} texto="1997: el carbono *pasó a otro árbol.*" />
      <Subtitulo T={T} idx={8} at={K.De + 0.1} until={K.Ma - 0.1} texto="¿Por el hongo o *por el suelo?*" />
      <Subtitulo T={T} idx={9} at={K.Ma + 0.1} until={K.Ci - 0.1} texto="¿Árbol madre? *Sin estudios que lo prueben.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.C - 0.1} texto="Las citas que exageran: *×2.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Mercado, sí. *Internet del bosque: se investiga.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 0.5, K.Mi - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Mi + 0.5, K.Tr + 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.R + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 2.2, K.Si - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.De + 0.5, K.Ma - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Ma + 0.4, K.Ci - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ci + 0.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="54" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MicorrizasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MicorrizasShot /></CompositionStage></div>;
}
window.MicorrizasApp = MicorrizasApp;
