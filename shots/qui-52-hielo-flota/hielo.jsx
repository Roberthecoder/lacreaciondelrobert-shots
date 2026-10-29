// Shot Químico #52 · Ese hielo no es agua apretada: es agua con huecos (por qué flota el hielo) — NARRADO (N1 por dentro + N5 Galileo).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (red del hielo en 2D).
const AGUA = '#7fd3ff', AGUA_OSC = '#2a7fc0', HIELO = '#e9f8ff', HIELO_B = '#9fd6f0', D2O = '#7be08a';

// ---------- piezas ----------
// Vaso de vidrio de cocina. x = centro, y = base. nivel = y del agua (absoluta). children = lo que flota adentro.
function VasoCocina({ x, y, s = 1, nivel, children, id = 'v' }) {
  const top = y - 500 * s, wt = 220 * s, wb = 175 * s;
  const lado = (yy) => klerp(wb, wt, (y - yy) / (y - top));
  const lv = nivel ?? (y - 380 * s);
  return <g>
    <clipPath id={`clip${id}`}><path d={`M ${x - wt + 8} ${top} L ${x + wt - 8} ${top} L ${x + wb - 8} ${y - 8} L ${x - wb + 8} ${y - 8} Z`} /></clipPath>
    <path d={`M ${x - lado(lv) + 8} ${lv} L ${x + lado(lv) - 8} ${lv} L ${x + wb - 8} ${y - 8} L ${x - wb + 8} ${y - 8} Z`} fill={AGUA} opacity={0.75} />
    <g clipPath={`url(#clip${id})`}>{children}</g>
    <line x1={x - lado(lv) + 8} x2={x + lado(lv) - 8} y1={lv} y2={lv} stroke="#fff" strokeWidth={6} opacity={0.8} />
    <path d={`M ${x - wt} ${top} L ${x - wb} ${y} L ${x + wb} ${y} L ${x + wt} ${top}`} fill="rgba(255,255,255,.16)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M ${x - wt + 40 * s} ${top + 40 * s} L ${x - wb + 30 * s} ${y - 50 * s}`} stroke="#fff" strokeWidth={14 * s} opacity={0.5} strokeLinecap="round" />
  </g>;
}
// Cubo de hielo (x, y = centro). huecos = 0..1 dibuja la red de hexágonos adentro.
function Cubo({ x, y, l = 150, rot = 0, color = HIELO, borde = HIELO_B, huecos = 0, T = 0, letra }) {
  const h = l / 2;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-h} y={-h} width={l} height={l} rx={l * 0.16} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-h + 14} y={-h + 14} width={l * 0.3} height={l * 0.14} rx={8} fill="#fff" opacity={0.85} />
    <path d={`M ${h - 20} ${-h + 30} L ${h - 20} ${h - 30}`} stroke={borde} strokeWidth={8} strokeLinecap="round" />
    {huecos > 0 && <g opacity={huecos}><clipPath id={`cc${Math.round(x)}`}><rect x={-h + 6} y={-h + 6} width={l - 12} height={l - 12} rx={l * 0.14} /></clipPath>
      <g clipPath={`url(#cc${Math.round(x)})`}>{hexRed(-h - 20, -h - 20, l + 40, l + 40, l / 4).map(([cx, cy], i) => <g key={i}>
        <polygon points={hexPts(cx, cy, l / 4 - 3)} fill={`rgba(0,210,255,${0.25 + 0.15 * Math.sin(T * 3 + i)})`} stroke={AGUA_OSC} strokeWidth={4} />
      </g>)}</g></g>}
    {letra && <text x={0} y={18} textAnchor="middle" style={{ font:`700 ${l * 0.3}px ${KF.mono}` }} fill={KC.ink}>{letra}</text>}
  </g>;
}
const hexPts = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
// Centros de un panal (hexágonos de radio r, punta arriba) que cubren el rectángulo.
function hexRed(x0, y0, w, h, r) {
  const dx = Math.sqrt(3) * r, dy = 1.5 * r, out = [];
  for (let j = 0; y0 + j * dy <= y0 + h + r; j++) for (let i = 0; x0 + i * dx <= x0 + w + dx; i++) out.push([x0 + i * dx + (j % 2 ? dx / 2 : 0), y0 + j * dy]);
  return out;
}
// Red de moléculas de agua: vértices del panal = oxígenos; aristas = puentes de hidrógeno.
const RED = (() => {
  const r = 120, cs = hexRed(150, 560, 780, 620, r), key = (x, y) => `${Math.round(x)}_${Math.round(y)}`, V = new Map(), E = new Map();
  cs.forEach(([cx, cy]) => { const pts = Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    pts.forEach((p) => { if (p[0] > 90 && p[0] < 990 && p[1] > 520 && p[1] < 1220) V.set(key(...p), p); });
    pts.forEach((p, k) => { const q = pts[(k + 1) % 6], a = key(...p), b = key(...q); if (V.has(a) && V.has(b)) E.set([a, b].sort().join('|'), [a, b]); }); });
  const ks = [...V.keys()], idx = new Map(ks.map((k, i) => [k, i])), R = krng(11);
  const verts = ks.map((k) => { const [x, y] = V.get(k); return { x, y, lx: 540 + (x - 540) * 0.86 + (R() - 0.5) * 70, ly: 870 + (y - 870) * 0.86 + (R() - 0.5) * 70, ph: R() * 6.28, rot: R() * 360 }; });
  const edges = [...E.values()].map(([a, b]) => [idx.get(a), idx.get(b)]);
  const centros = cs.filter(([cx, cy]) => cx > 160 && cx < 920 && cy > 600 && cy < 1180);
  return { verts, edges, centros, r };
})();
function MolAgua({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={-26} y2={22} stroke={KC.ink} strokeWidth={8} /><line x1={0} y1={0} x2={26} y2={22} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-26} cy={22} r={13} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={26} cy={22} r={13} fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <circle r={22} fill={QA.O} stroke={KC.ink} strokeWidth={5} /><circle cx={-7} cy={-7} r={5} fill="#fff" opacity={0.5} />
  </g>;
}
// Mundo molecular: f = 0 líquido revuelto (puentes que parpadean) → 1 hielo (panal fijo con huecos que brillan).
function MundoMolecular({ T, f, huecos = 0 }) {
  const { verts, edges, centros, r } = RED;
  const pos = verts.map((v, i) => { const j = (1 - f) * 22; return [klerp(v.lx, v.x, f) + Math.sin(T * 2.3 + v.ph) * j, klerp(v.ly, v.y, f) + Math.cos(T * 2.9 + v.ph) * j]; });
  return <g>
    {huecos > 0 && centros.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={r * 0.55 * (0.9 + 0.1 * Math.sin(T * 3 + i))} fill="rgba(0,210,255,.18)" stroke="rgba(0,210,255,.6)" strokeWidth={4} strokeDasharray="10 8" opacity={huecos} />)}
    {edges.map(([a, b], i) => { const parp = f > 0.95 ? 1 : Math.max(0, Math.sin(T * 2.6 + i * 1.7)) * (1 - f) + f;
      const [x1, y1] = pos[a], [x2, y2] = pos[b]; if (Math.hypot(x2 - x1, y2 - y1) > 190) return null;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={KC.gold2} strokeWidth={6} strokeDasharray="10 9" opacity={parp > 0.35 ? parp : 0} />; })}
    {pos.map(([x, y], i) => <MolAgua key={i} x={x} y={y} s={0.95} rot={klerp(verts[i].rot + T * 40 * (1 - f), (i % 2) * 180, f)} />)}
  </g>;
}
function Barra({ T, at, until, largo, texto, x = 60, y = 1430, color = KC.texto }) {
  if (!kvisible(T, at, until)) return null;
  const o = kentrada(T, at, until, 'fundido').o;
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, opacity:o }}>
    <div style={{ width:largo, height:10, background:color, border:`3px solid ${KC.ink}`, borderRadius:4 }}></div>
    <div style={{ font:`700 30px ${KF.mono}`, color, textShadow:KSOMBRA, marginTop:6 }}>{texto}</div>
  </div>;
}
function TermoSimple({ x, y, nivel = 1, texto, color = KC.red }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-220} width={44} height={240} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={-200 + 180 * (1 - nivel)} width={20} height={190 - 180 * (1 - nivel)} rx={10} fill={color} />
    <circle cx={0} cy={36} r={38} fill={color} stroke={KC.ink} strokeWidth={7} />
    {texto && <text x={0} y={120} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">{texto}</text>}
  </g>;
}
function Pez({ x, y, s = 1, dir = 1, color = KC.orange, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
    <path d={`M -60 0 Q -10 -40 50 0 Q -10 40 -60 0 Z`} fill={color} stroke={KC.ink} strokeWidth={6} />
    <path d={`M -56 0 L -96 ${-26 + Math.sin(T * 8) * 8} L -96 ${26 + Math.sin(T * 8) * 8} Z`} fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={26} cy={-8} r={7} fill={KC.ink} />
  </g>;
}
// Corte de un lago con hielo arriba. congelado = 1 → todo blanco (hipotético).
function Lago({ T, congelado = 0, peces = 1 }) {
  return <g>
    <rect x={0} y={0} width={KW} height={700} fill="#bfe6ff" />
    <circle cx={880} cy={480} r={60} fill="#fff6c8" opacity={0.9} />
    {[160, 300].map((x, i) => <g key={i}><rect x={x - 10} y={560} width={20} height={80} fill="#6b4a2b" /><path d={`M ${x} 430 L ${x - 70} 600 L ${x + 70} 600 Z`} fill="#2e8b57" stroke={KC.ink} strokeWidth={6} /><path d={`M ${x} 430 L ${x - 34} 500 L ${x + 34} 500 Z`} fill="#fff" /></g>)}
    <path d="M 0 640 L 140 660 Q 200 1180 540 1200 Q 880 1180 940 660 L 1080 640 L 1080 1260 L 0 1260 Z" fill="#8a6440" stroke={KC.ink} strokeWidth={8} />
    <path d="M 140 700 Q 200 1180 540 1200 Q 880 1180 940 700 Z" fill={mixHex('#2f8fd8', '#eef7ff', congelado)} />
    <path d="M 140 660 L 940 660 L 940 720 L 140 720 Z" fill={HIELO} stroke={KC.ink} strokeWidth={7} />
    {congelado < 0.5 && peces > 0 && [[380, 900, 1], [640, 1010, -1], [520, 1110, 1]].map(([x, y, d], i) => <Pez key={i} T={T + i} x={x + Math.sin(T * 0.6 + i * 2) * 90 * d} y={y + Math.sin(T * 1.3 + i) * 10} s={0.8} dir={Math.cos(T * 0.6 + i * 2) > 0 ? d : -d} color={[KC.orange, KC.yellow, KC.pink][i]} />)}
    {congelado < 0.5 && <Burbujas T={T} x={200} y={760} w={680} h={400} n={10} f={1} color="rgba(255,255,255,.5)" vel={40} seed={4} rmax={8} />}
  </g>;
}
function Tina({ x, y, children }) {
  return <g>
    <path d={`M ${x - 380} ${y - 360} L ${x - 330} ${y} L ${x + 330} ${y} L ${x + 380} ${y - 360} Z`} fill="#b0784a" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={`M ${x - 362} ${y - 300} L ${x - 322} ${y - 14} L ${x + 322} ${y - 14} L ${x + 362} ${y - 300} Z`} fill={AGUA} opacity={0.85} />
    {children}
    <line x1={x - 362} x2={x + 362} y1={y - 300} y2={y - 300} stroke="#fff" strokeWidth={6} opacity={0.8} />
    {[-200, 0, 200].map((d) => <line key={d} x1={x + d} x2={x + d * 1.1} y1={y - 360} y2={y} stroke="rgba(0,0,0,.25)" strokeWidth={6} />)}
  </g>;
}
function Mano({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-40} y={-420} width={80} height={300} rx={30} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -140 Q -80 -10 -40 0 L 40 0 Q 80 -10 70 -140 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    {[-45, -15, 15, 45].map((d) => <line key={d} x1={d} y1={-40} x2={d} y2={-2} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function Tubo({ T, hinchar = 0, roto = 0, crece = 0 }) {
  const y = 980, b = 20 + 70 * hinchar;
  return <g>
    <rect x={0} y={y - 90} width={KW} height={180} fill="#9aa3b5" stroke={KC.ink} strokeWidth={9} />
    <path d={`M 300 ${y - 90} Q 540 ${y - 90 - b} 780 ${y - 90} L 780 ${y + 90} Q 540 ${y + 90 + b} 300 ${y + 90} Z`} fill="#c7cedb" stroke={KC.ink} strokeWidth={9} />
    <clipPath id="tubin"><path d={`M 310 ${y - 76} Q 540 ${y - 76 - b} 770 ${y - 76} L 770 ${y + 76} Q 540 ${y + 76 + b} 310 ${y + 76} Z`} /></clipPath>
    <g clipPath="url(#tubin)"><rect x={300} y={y - 200} width={480} height={400} fill={AGUA} />
      {hexRed(260, y - 180, 560, 360, 46).map(([cx, cy], i) => { const on = kprog(crece, (Math.abs(cx - 540) / 300), (Math.abs(cx - 540) / 300) + 0.3);
        return on > 0 ? <polygon key={i} points={hexPts(cx, cy, 44 * on)} fill={HIELO} stroke={AGUA_OSC} strokeWidth={4} /> : null; })}</g>
    {[[250, 0], [830, 0]].map(([x], i) => <rect key={i} x={x - 30} y={y - 110} width={60} height={220} rx={10} fill="#7d8597" stroke={KC.ink} strokeWidth={8} />)}
    {roto > 0 && <g>
      <path d={`M 500 ${y - 110 - b * 0.6} L 530 ${y - 60} L 510 ${y - 20} L 560 ${y + 30} L 540 ${y + 100 + b * 0.6}`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinejoin="round" />
      {Array.from({ length: 8 }, (_, i) => { const u = ((T * 1.6 + i / 8) % 1) * roto; return <circle key={i} cx={525 + (i - 4) * 18 * u * 3} cy={y - 140 - b - u * 260 + u * u * 200} r={14 - u * 6} fill={AGUA} stroke={AGUA_OSC} strokeWidth={3} />; })}
    </g>}
    {Array.from({ length: 14 }, (_, i) => { const R = krng(i + 30); const x = R() * KW, yy = ((T * 60 + R() * 900) % 900) + 300; return <circle key={i} cx={x + Math.sin(T + i) * 20} cy={yy} r={6 + R() * 6} fill="#fff" opacity={0.8} />; })}
  </g>;
}

// ---------- shot ----------
function Hielo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ra: CUES.Raro, Li: CUES.Liquido, He: CUES.Hexagonos, Nu: CUES.Numero, Pr: CUES.Pregunta, La: CUES.Lago, Ga: CUES.Galileo, Tu: CUES.Tuberias, Cu: CUES.Curioso, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const NIV = 820;                                    // nivel del agua del vaso grande
  // cubo que cae, se hunde un poco y rebota hasta flotar con la puntita fuera (≈ 10 %)
  const yFlota = NIV + 75 - 15;
  const cuboY = (t0) => { const p = T - t0; if (p < 0) return -200; if (p < 0.32) return klerp(430, yFlota + 60, (p / 0.32) ** 2);
    const q = p - 0.32; return yFlota + 60 * Math.exp(-q * 2.2) * Math.cos(q * 6.5); };
  const salpica = (t0) => { const p = T - t0 - 0.3; return p > 0 && p < 0.9 ? p / 0.9 : 0; };
  const sp = salpica(K.G);
  const congela = kprog(T, K.He + 0.2, K.He + 2.6, kEase.suave);
  const empuja = kprog(T, K.Ga + 3.0, K.Ga + 4.0, kEase.suave), suelta = kprog(T, K.Ga + 4.5, K.Ga + 5.6, kEase.sale);
  const losaY = klerp(klerp(905, 1150, empuja), 905, suelta);
  const mitadLa = K.La + 2.4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el hielo cae al vaso y flota */}
      <Escena T={T} a={K.G} b={K.Ra} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <VasoCocina x={540} y={1250} s={1.25} nivel={NIV} id="g">
            {T - K.G >= 0.2 && <Cubo x={540} y={cuboY(K.G)} l={150} rot={Math.sin(T * 1.4) * 6} />}
          </VasoCocina>
          {T - K.G < 0.2 && <Cubo x={540} y={cuboY(K.G)} l={150} rot={(T - K.G) * 60} />}
          {sp > 0 && Array.from({ length: 8 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 7); return <circle key={i} cx={540 + Math.cos(a) * 260 * sp * (i % 2 ? 1 : -1)} cy={NIV - Math.sin(a) * 220 * sp + sp * sp * 260} r={16 * (1 - sp)} fill={AGUA} stroke={AGUA_OSC} strokeWidth={3} />; })}
        </SvgCapa>
      </Escena>
      {/* 1 · casi todo se hunde en su líquido; el hielo, no */}
      <Escena T={T} a={K.Ra} b={K.Li} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <VasoCocina x={300} y={1180} s={0.8} nivel={850} id="r1">
            <rect x={240} y={klerp(900, 1060, kprog(T, K.Ra + 0.6, K.Ra + 1.6, kEase.suave))} width={120} height={100} rx={18} fill="#e8a35a" stroke={KC.ink} strokeWidth={7} />
          </VasoCocina>
          <path d="M 300 620 L 300 700" stroke={KC.ink} strokeWidth={10} opacity={kprog(T, K.Ra + 0.8, K.Ra + 1.2)} />
          <path d="M 270 680 L 300 715 L 330 680" stroke={KC.ink} strokeWidth={10} fill="none" opacity={kprog(T, K.Ra + 0.8, K.Ra + 1.2)} />
          <VasoCocina x={780} y={1180} s={0.8} nivel={850} id="r2">
            <Cubo x={780} y={klerp(990, 885, kprog(T, K.Ra + 2.6, K.Ra + 3.6, kEase.rebote))} l={110} rot={Math.sin(T * 1.6) * 6} />
          </VasoCocina>
          <g opacity={kprog(T, K.Ra + 3.0, K.Ra + 3.4)}><path d="M 780 720 L 780 640" stroke={KC.ink} strokeWidth={10} /><path d="M 750 670 L 780 635 L 810 670" stroke={KC.ink} strokeWidth={10} fill="none" /></g>
          <text x={300} y={1240} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>CASI TODOS</text>
          <text x={780} y={1240} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={AGUA_OSC} stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.Ra + 2.4, K.Ra + 2.8)}>EL AGUA</text>
        </SvgCapa>
      </Escena>
      {/* 2–3 · por dentro: líquido revuelto → panal de hexágonos */}
      <Escena T={T} a={K.Li} b={K.Nu} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><VasoCocina x={540} y={1250} s={1.25} nivel={NIV} id="l"><Cubo x={540} y={yFlota} l={150} /></VasoCocina></SvgCapa>
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:kprog(T, K.Li + 1.6, K.Li + 2.2) }}>
          <SvgCapa>
            <MundoMolecular T={T} f={congela} huecos={kprog(T, K.He + 2.4, K.He + 3.2)} />
            <g opacity={kprog(T, K.He, K.He + 0.4)}><TermoSimple x={950} y={500} nivel={klerp(0.7, 0.15, congela)} texto={congela > 0.95 ? '0 °C' : `${Math.round(klerp(10, 0, congela))} °C`} color={mixHex('#ff3b2f', '#2346ff', congela)} /></g>
          </SvgCapa>
        </div>
      </Escena>
      <Lupa T={T} at={K.Li + 0.1} until={K.Li + 1.7} x={540} y={760} r={230} fx={540} fy={1000} etiqueta="POR DENTRO · AGUA" interior={(TT, r) =>
        <svg width={r * 2} height={r * 2}><g transform={`translate(${r - 540 * 0.55} ${r - 870 * 0.55}) scale(0.55)`}><MundoMolecular T={TT} f={0} /></g></svg>} />
      {/* 4 · el mismo número de moléculas ocupa más */}
      <Escena T={T} a={K.Nu} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {(() => { const c = kprog(T, K.Nu + 0.5, K.Nu + 2.0, kEase.sale), hL = 330, hH = klerp(330, 360, c);
            const R = krng(3);
            return <g>
              <rect x={120} y={1180 - hL} width={360} height={hL} rx={16} fill={AGUA} stroke={KC.ink} strokeWidth={9} />
              {Array.from({ length: 24 }, (_, i) => <MolAgua key={i} x={160 + (i % 6) * 56 + (Math.floor(i / 6) % 2) * 20 + Math.sin(T * 3 + i) * 5} y={1180 - hL + 50 + Math.floor(i / 6) * 76 + Math.cos(T * 3 + i) * 5} s={0.6} rot={R() * 360 + T * 30} />)}
              <rect x={600} y={1180 - hH} width={360} height={hH} rx={16} fill={HIELO} stroke={KC.ink} strokeWidth={9} />
              <clipPath id="hbox"><rect x={606} y={1186 - hH} width={348} height={hH - 12} rx={12} /></clipPath>
              <g clipPath="url(#hbox)">{hexRed(560, 1180 - hH - 30, 440, hH + 60, 52).map(([cx, cy], i) => <polygon key={i} points={hexPts(cx, cy, 50)} fill="rgba(0,210,255,.18)" stroke={AGUA_OSC} strokeWidth={5} />)}</g>
              <text x={300} y={1240} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>AGUA</text>
              <text x={780} y={1240} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>HIELO</text>
              <g opacity={c}><line x1={990} x2={990} y1={1180} y2={1180 - hH} stroke={KC.ink} strokeWidth={8} /><line x1={975} x2={1005} y1={1180 - hH} y2={1180 - hH} stroke={KC.ink} strokeWidth={8} />
                <line x1={500} x2={1000} y1={1180 - hL} y2={1180 - hL} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" /></g>
            </g>; })()}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Nu + 1.6} until={K.Pr - 0.3} valor={9} prefijo="+" sufijo=" %" etiqueta="más espacio" x={780} y={620} tam={170} color={KC.cyan} />
      </Escena>
      {/* 5 · ¿y si el hielo se hundiera? */}
      <Escena T={T} a={K.Pr} b={K.La} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <VasoCocina x={290} y={1200} s={0.9} nivel={860} id="p"><Cubo x={290} y={klerp(900, 1110, kprog(T, K.Pr + 0.4, K.Pr + 1.6, kEase.suave))} l={120} rot={-8} /></VasoCocina>
          <text x={290} y={680} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 290 600)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · el lago: hipotético (todo hielo) → real (tapa de hielo y peces abajo) */}
      <Escena T={T} a={K.La} b={K.Ga} zoom={0.04}>
        <SvgCapa><Lago T={T} congelado={1 - kprog(T, mitadLa, mitadLa + 0.7, kEase.suave)} />
          <Marca x={330} y={950} ok={false} s={1.1} o={kprog(T, K.La + 0.8, K.La + 1.2) * (1 - kprog(T, mitadLa - 0.3, mitadLa))} />
          <g opacity={kprog(T, mitadLa + 1.6, mitadLa + 2.1)}><TermoSimple x={960} y={900} nivel={0.3} color={KC.blue} /></g>
        </SvgCapa>
      </Escena>
      {/* 7 · Galileo: el hielo ancho empujado al fondo sube solo */}
      <Escena T={T} a={K.Ga} b={K.Tu} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Tina x={540} y={1220}>
            <g transform={`translate(540 ${losaY}) rotate(${Math.sin(T * 1.2) * 2 * (1 - empuja + suelta)})`}><rect x={-230} y={-28} width={460} height={56} rx={16} fill={HIELO} stroke={KC.ink} strokeWidth={8} /><rect x={-210} y={-18} width={120} height={12} rx={6} fill="#fff" /></g>
          </Tina>
          <g opacity={kprog(T, K.Ga + 2.6, K.Ga + 3.0) * (1 - kprog(T, K.Ga + 4.4, K.Ga + 4.8))}><Mano x={540} y={losaY - 26} s={0.9} /></g>
          <Marca x={880} y={760} ok={true} s={1} o={kprog(T, K.Ga + 5.6, K.Ga + 6.0)} />
        </SvgCapa>
      </Escena>
      {/* 8 · tuberías que revientan */}
      <Escena T={T} a={K.Tu} b={K.Cu} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#3d6fb8' }}></div>
        <SvgCapa><Tubo T={T} crece={kprog(T, K.Tu + 0.2, K.Tu + 1.9)} hinchar={kprog(T, K.Tu + 0.9, K.Tu + 2.2, kEase.suave)} roto={kprog(T, K.Tu + 2.2, K.Tu + 2.5)} />
          <Onomato T={T} at={K.Tu + 2.2} until={K.Cu - 0.1} x={560} y={720} texto="¡CRAC!" tam={130} /></SvgCapa>
      </Escena>
      {/* 9 · el hielo de agua pesada se hunde */}
      <Escena T={T} a={K.Cu} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <VasoCocina x={140} y={1180} s={0.55} nivel={960} id="c1"><Cubo x={140} y={990} l={90} rot={Math.sin(T * 1.5) * 6} /></VasoCocina>
          <VasoCocina x={385} y={1180} s={0.55} nivel={960} id="c2"><Cubo x={385} y={klerp(780, 1120, kprog(T, K.Cu + 1.3, K.Cu + 2.6, kEase.suave))} l={90} rot={6} color={D2O} borde="#3fa34d" /></VasoCocina>
          <text x={140} y={1240} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>H₂O</text>
          <text x={385} y={1240} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>D₂O</text>
          <g opacity={kprog(T, K.Cu + 0.4, K.Cu + 0.8)}><Atomo x={140} y={700} r={34} color={QA.H} letra="H" /><Atomo x={385} y={700} r={52} color={D2O} letra="D" /></g>
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el vaso del inicio, ahora con los huecos a la vista */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><VasoCocina x={540} y={1250} s={1.25} nivel={NIV} id="ci">
          <Cubo x={540} y={yFlota} l={150} rot={Math.sin(T * 1.4) * 6} T={T} huecos={kprog(T, K.Ci + 0.4, K.Ci + 1.4)} /></VasoCocina></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.0} until={K.G + 3.2} texto="¿agua apretada?" x={330} y={520} tam={46} />
      <Chip T={T} at={K.G + 3.3} until={K.Ra - 0.3} texto="agua con huecos" x={330} y={520} tam={46} borde={KC.cyan} />
      <Barra T={T} at={K.G + 0.5} until={K.Ra - 0.2} largo={60} texto="1 cm" />
      <Chip T={T} at={K.Ra + 0.4} until={K.Li - 0.3} texto="sólido = más denso… casi siempre" y={1500} tam={38} borde={KC.orange} />
      <Chip T={T} at={K.Li + 2.3} until={K.He - 0.2} texto="puentes de hidrógeno" y={1500} tam={44} borde={KC.gold2} />
      <Etq T={T} at={K.Li + 2.6} until={K.He - 0.2} x={1030} y={480} texto="H₂O" lado="izq" tam={36} />
      <Barra T={T} at={K.Li + 2.2} until={K.Nu - 0.2} largo={110} texto="≈ 0.3 nm" />
      <Chip T={T} at={K.He + 2.8} until={K.Nu - 0.2} texto="hexágonos con huecos" y={1500} tam={44} borde={KC.cyan} />
      <Chip T={T} at={K.Nu + 0.6} until={K.Pr - 0.2} texto="agua 0 °C · 0.9998 g/cm³" y={1470} tam={36} borde={AGUA} mono />
      <Chip T={T} at={K.Nu + 1.4} until={K.Pr - 0.2} texto="hielo 0 °C · 0.917 g/cm³" y={1570} tam={36} borde={KC.cyan} mono />
      <Chip T={T} at={K.Pr + 0.2} until={K.La - 0.1} texto="¿y si…?" x={290} y={1460} tam={46} borde={KC.pink} />
      <Chip T={T} at={K.La + 0.3} until={mitadLa - 0.2} texto="¿y si…? lago congelado entero" y={1500} tam={38} borde={KC.red} />
      <Etq T={T} at={mitadLa + 0.4} until={K.Ga - 0.3} x={560} y={600} texto="tapa de hielo" lado="der" tam={34} color={KC.ink} />
      <Chip T={T} at={mitadLa + 1.6} until={K.Ga - 0.2} texto="abajo: agua líquida, hasta ≈ 4 °C" y={1500} tam={36} borde={KC.blue} />
      <TarjetaEstudio T={T} at={K.Ga + 0.2} until={K.Ga + 2.6} anio="1612" quien="Galileo · Florencia" revista="Discorso intorno alle cose che stanno in su l'acqua" y={620} />
      <MitoTachado T={T} at={K.Ga + 0.8} tacharEn={K.Ga + 2.2} until={K.Ga + 3.4} texto="flota por ser plano" y={1500} tam={44} />
      <Chip T={T} at={K.Ga + 5.0} until={K.Tu - 0.2} texto="flota por ser más ligero" y={1500} tam={42} borde={KC.mint} />
      <Chip T={T} at={K.Tu + 0.3} until={K.Cu - 0.2} texto="el hielo empuja: ≈ 9 % más" y={1500} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.Cu + 0.6} until={K.Ci - 0.2} texto="agua pesada · deuterio" y={1500} tam={42} borde={D2O} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="hielo = agua con huecos" y={1500} tam={44} borde={KC.cyan} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ra - 0.1} texto="No es agua apretada: *tiene huecos.*" />
      <Subtitulo T={T} idx={1} at={K.Ra + 0.1} until={K.Li - 0.1} texto="El agua hace *lo contrario.*" />
      <Subtitulo T={T} idx={2} at={K.Li + 0.1} until={K.He - 0.1} texto="Puentes que *se rompen y forman.*" />
      <Subtitulo T={T} idx={3} at={K.He + 0.1} until={K.Nu - 0.1} texto="Hielo: *hexágonos con huecos.*" />
      <Subtitulo T={T} idx={4} at={K.Nu + 0.1} until={K.Pr - 0.1} texto="*9 % más* espacio: flota." />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.La - 0.1} texto="¿Y si el hielo *se hundiera?*" />
      <Subtitulo T={T} idx={6} at={K.La + 0.1} until={K.Ga - 0.1} texto="Abajo, los peces *siguen nadando.*" />
      <Subtitulo T={T} idx={7} at={K.Ga + 0.1} until={K.Tu - 0.1} texto="1612: *empújalo y sube solo.*" />
      <Subtitulo T={T} idx={8} at={K.Tu + 0.1} until={K.Cu - 0.1} texto="Esa hinchazón *revienta tuberías.*" />
      <Subtitulo T={T} idx={9} at={K.Cu + 0.1} until={K.Ci - 0.1} texto="Agua pesada: *se hunde.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Hielo: *agua llena de huecos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Raro + 0.8, CUES.Liquido - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Hexagonos + 0.5, CUES.Numero - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Numero + 1.0, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Lago + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Lago + 2.6, CUES.Galileo - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Galileo + 2.8, CUES.Tuberias - 0.3, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Tuberias + 0.3, CUES.Curioso - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Curioso + 0.3, CUES.Cierre - 0.3, 'avatar_13_senalando_arriba', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="52" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_05_sonriendo_dientes_uniformes.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HieloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Hielo /></CompositionStage></div>;
}
window.HieloApp = HieloApp;
