// Shot Fungi Mati #100 · Esa pelusa de moho no son hilos: son tubos con un río dentro — NARRADO (N1 Por dentro, gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Protagonista: Neurospora crassa (moho naranja).
// Todos los textos de pantalla están en TX (arriba) para cambiarlos fácil.

const TX = {
  sub: [
    'No son hilos: *son tubos* con un río dentro.',
    'Una hifa: *6 a 12 µm.* Un pelo: unas 70.',
    'Solo crece *por la punta.*',
    'Unas *38,000 vesículas* por minuto.',
    'El río *arrastra a los núcleos.*',
    'Un septo, con *un poro* en medio.',
    '¿Y si el tubo *se rompe?*',
    '*Cuerpos de Woronin:* tapones.',
    '2000: la proteína *Hex1.*',
    'Sin Hex1, *sangran citoplasma.*',
    'Núcleos: *10 mm por hora.*',
    'Son tubos con *un río dentro.*',
  ],
};

const HF = { pared:'#2fe0a8', cito:'rgba(47,224,168,.13)', part:'rgba(226,255,244,.6)', nuc:'#7dff8a', ret:'#ff5fa2', ves:'#ffe11a', enz:'#ff6b9a',
  wor:'#2a1e3a', worBorde:'#b18cff', naranja:['#ff9a2e', '#ffb347', '#f57c00', '#ffc46b'], agar:'#f3e3b0', pelo:'#d9b48a', pelo2:'#b98f63' };

// --- helpers ---
const fmod = (a, n) => ((a % n) + n) % n;
// Nota chica con nombre científico en cursiva: partes = [['texto', it?], ...]
function Nota({ T, at, until, x, y, partes, tam = 30, color = KC.texto, centro = false }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o, transform:`translate(${centro ? '-50%' : 0}, -50%) translateY(${e.y * 0.3}px)`,
    font:`700 ${tam}px ${KF.mono}`, color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>
    {partes.map(([t, it], i) => <span key={i} style={{ fontStyle: it ? 'italic' : 'normal' }}>{t}</span>)}
  </div>;
}
// Etiqueta SVG con línea que apunta a (px, py) desde el texto en (tx, ty).
function EtqSvg({ T, at, until, px, py, tx, ty, texto, color = KC.texto, tam = 30, it = false, ancla = 'start' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), l = kprog(T, at, at + 0.4, kEase.sale);
  return <g opacity={e.o}>
    <line x1={tx} y1={ty - tam * 0.35} x2={klerp(tx, px, l)} y2={klerp(ty - tam * 0.35, py, l)} stroke={color} strokeWidth={4} strokeLinecap="round" />
    <circle cx={px} cy={py} r={7 * l} fill={color} />
    <text x={tx} y={ty + (ty > py ? tam * 0.55 : -tam * 0.1)} textAnchor={ancla} style={{ font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal' }} fill={color} stroke="rgba(0,0,0,.85)" strokeWidth={6} paintOrder="stroke">{texto}</text>
  </g>;
}

// --- partículas del citoplasma: perfil de tubería (más rápido al centro), se aprietan en los poros de los septos ---
function Particulas({ T, x0, x1, y, w, tf = T, vel = 60, n, seed = 3, septos = [], color = HF.part, densidad = 1, sentido = 1, salida }) {
  const r = w / 2, L = x1 - x0, g = krng(seed);
  const N = n || Math.round(L / w * 16 * densidad);
  const out = [];
  for (let i = 0; i < N; i++) {
    const v = (g() * 2 - 1) * 0.86, base = g() * L, s = 0.6 + g() * 0.8, rr = w * (0.025 + g() * 0.03);
    const x = x0 + fmod(base + sentido * tf * vel * (1 - v * v) * s, L);
    let f = 1; for (const sx of septos) f = Math.min(f, 1 - 0.88 * Math.exp(-Math.pow((x - sx) / (w * 0.45), 2)));
    let yy = y + v * r * f;
    if (salida && x > salida.x - w * 0.6) { const q = kclamp((x - (salida.x - w * 0.6)) / (w * 0.6), 0, 1); yy = klerp(yy, salida.y, q * q); }
    out.push(<circle key={i} cx={x} cy={yy} r={rr} fill={color} />);
  }
  return <g>{out}</g>;
}
// --- núcleos (óvalos alargados verdes, como el H1-GFP del estudio); exclusión cerca de la punta ---
function Nucleos({ T, x0, x1, y, w, tf = T, vel = 40, n = 6, ret = 0, seed = 9, punta, septos = [], o = 1 }) {
  const r = w / 2, L = x1 - x0, g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n + ret }, (_, i) => {
    const esRet = i >= n, v = (g() * 2 - 1) * 0.45, base = g() * L, s = 0.8 + g() * 0.4;
    const x = x0 + fmod(base + (esRet ? -0.6 : 1) * tf * vel * s, L);
    let f = 1; for (const sx of septos) f = Math.min(f, 1 - 0.95 * Math.exp(-Math.pow((x - sx) / (w * 0.45), 2)));
    const op = punta != null ? 1 - kclamp((x - (punta - 2.6 * w)) / (0.6 * w), 0, 1) : 1;
    const ap = 1 - 0.5 * (1 - f);
    if (op <= 0) return null;
    const c = esRet ? HF.ret : HF.nuc;
    return <ellipse key={i} cx={x} cy={y + v * r * f} rx={w * 0.17 / ap} ry={w * 0.075 * ap} fill={c} opacity={0.9 * op} style={{ filter:`drop-shadow(0 0 ${w * 0.06}px ${c})` }} />;
  })}</g>;
}
// --- el tubo: pared, citoplasma, septos con poro, Spitzenkörper ---
function Tubo({ T, id, x0, x1, y, w, punta = true, septos = [], septoCrece = 1, spk = 0, flujo = true, vel = 60, densidad = 1, nucleos = 0, ret = 0, nucVel = 40, seed = 3, children, tf = T, grosor }) {
  const r = w / 2, gp = grosor || Math.max(4, w * 0.05);
  const d = punta ? `M ${x0} ${y - r} L ${x1 - r} ${y - r} A ${r} ${r} 0 0 1 ${x1 - r} ${y + r} L ${x0} ${y + r} Z`
    : `M ${x0} ${y - r} L ${x1} ${y - r} L ${x1} ${y + r} L ${x0} ${y + r} Z`;
  const poro = w * 0.13;
  const g = krng(seed + 50);
  const ves = spk > 0 ? Array.from({ length: 46 }, () => ({ a: g() * 6.28, d: Math.sqrt(g()), f: g() * 9 })) : [];
  const sc = x1 - r * 0.62;
  return <g>
    <defs><clipPath id={id}><path d={d} /></clipPath></defs>
    <path d={d} fill={HF.cito} />
    <g clipPath={`url(#${id})`}>
      {flujo && <Particulas T={T} tf={tf} x0={x0} x1={x1} y={y} w={w} vel={vel} densidad={densidad} seed={seed} septos={septos} />}
      {nucleos > 0 && <Nucleos T={T} tf={tf} x0={x0} x1={x1} y={y} w={w} vel={nucVel} n={nucleos} ret={ret} seed={seed + 7} punta={punta ? x1 : null} septos={septos} />}
      {spk > 0 && <g opacity={spk}>
        <circle cx={sc} cy={y} r={r * 0.2} fill={KC.gold2} opacity={0.55} style={{ filter:`blur(${r * 0.08}px)` }} />
        {ves.map((v, i) => <circle key={i} cx={sc + Math.cos(v.a + T * 0.6) * v.d * r * 0.42 + Math.sin(T * 3 + v.f) * r * 0.02} cy={y + Math.sin(v.a + T * 0.6) * v.d * r * 0.34}
          r={r * 0.035} fill={HF.ves} opacity={0.9} />)}
      </g>}
      {children}
    </g>
    {septos.map((sx, i) => { const h = (r - poro / 2) * septoCrece; return <g key={i}>
      <rect x={sx - gp * 0.7} y={y - r} width={gp * 1.4} height={h} rx={gp * 0.5} fill={HF.pared} />
      <rect x={sx - gp * 0.7} y={y + r - h} width={gp * 1.4} height={h} rx={gp * 0.5} fill={HF.pared} />
    </g>; })}
    <path d={d} fill="none" stroke={HF.pared} strokeWidth={gp} strokeLinejoin="round" />
    <path d={d} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={gp * 0.3} transform={`translate(0 ${-gp * 0.25})`} />
  </g>;
}
// Cuerpo de Woronin: esfera con núcleo cristalino hexagonal.
function Woronin({ x, y, r, o = 1 }) {
  const hx = Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(x + r * 0.6 * Math.cos(a)).toFixed(1)} ${(y + r * 0.6 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill={HF.wor} stroke={HF.worBorde} strokeWidth={Math.max(2, r * 0.14)} /><path d={hx} fill="#6f5aa8" stroke="#d9ccff" strokeWidth={Math.max(1.5, r * 0.08)} /></g>;
}
// Pelo humano (corte de lado): banda beige con escamas de cutícula.
function Pelo({ x, y, w, h }) {
  return <g>
    <rect x={x} y={y} width={w} height={h} fill={HF.pelo} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: Math.ceil(w / 70) }, (_, i) => <path key={i} d={`M ${x + i * 70} ${y + 4} Q ${x + i * 70 + 40} ${y + h / 2} ${x + i * 70} ${y + h - 4}`} fill="none" stroke={HF.pelo2} strokeWidth={5} />)}
    <rect x={x} y={y + h * 0.42} width={w} height={h * 0.16} fill={HF.pelo2} opacity=".35" />
  </g>;
}
// Aguja (para romper la hifa). Punta en (x, y).
function Aguja({ x, y, ang = 135, largo = 700, ancho = 26 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={`M 0 0 L ${largo} ${-ancho / 2} L ${largo} ${ancho / 2} Z`} fill="#cfd6dc" stroke={KC.ink} strokeWidth={5} />
    <line x1={largo * 0.15} y1={-2} x2={largo} y2={-ancho * 0.3} stroke="#fff" strokeWidth={4} opacity=".7" />
  </g>;
}
// Pinzas que bajan a tomar un mechón. Punta en (x, y).
function Pinzas({ x, y, ang = -35, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={`M 0 ${-4 - abre * 10} L 520 ${-30 - abre * 30} L 520 ${-8 - abre * 30} L 0 ${-1 - abre * 10} Z`} fill="#c4ccd3" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 0 ${4 + abre * 10} L 520 ${30 + abre * 30} L 520 ${8 + abre * 30} L 0 ${1 + abre * 10} Z`} fill="#aeb7bf" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// --- la colonia de Neurospora crassa en caja Petri (vista desde arriba) ---
const COL = (() => {
  const g = krng(11), segs = [], st = 16;
  const N = 34;
  for (let i = 0; i < N; i++) {
    let a = i / N * Math.PI * 2 + (g() - 0.5) * 0.15, x = Math.cos(a) * 26, y = Math.sin(a) * 26, d = 26;
    const pts = [[x, y]];
    while (d < 362) {
      a += (g() - 0.5) * 0.2; x += Math.cos(a) * st; y += Math.sin(a) * st; d = Math.hypot(x, y); pts.push([x, y]);
      if (g() < 0.13 && d < 330) {
        let b = a + (g() < 0.5 ? -1 : 1) * (0.45 + g() * 0.3), bx = x, by = y; const bp = [[bx, by]]; const len = 3 + Math.floor(g() * 6);
        for (let k = 0; k < len; k++) { b += (g() - 0.5) * 0.2; bx += Math.cos(b) * st; by += Math.sin(b) * st; if (Math.hypot(bx, by) > 362) break; bp.push([bx, by]); }
        if (bp.length > 1) segs.push({ pts: bp, prim: false });
      }
    }
    segs.push({ pts, prim: true, i });
  }
  segs.forEach((s) => { let acc = 0; s.cum = [0]; for (let k = 1; k < s.pts.length; k++) { acc += Math.hypot(s.pts[k][0] - s.pts[k - 1][0], s.pts[k][1] - s.pts[k - 1][1]); s.cum.push(acc); } s.len = acc; s.d = 'M ' + s.pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L '); });
  const fluff = Array.from({ length: 340 }, () => { const rr = 300 * Math.pow(g(), 0.6); const a = g() * Math.PI * 2; return { x: Math.cos(a) * rr, y: Math.sin(a) * rr, r: 7 + g() * 17, c: HF.naranja[Math.floor(g() * 4)], ph: g() * 6 }; });
  return { segs, fluff };
})();
const enSeg = (s, u) => { const L = u * s.len; let k = 1; while (k < s.cum.length - 1 && s.cum[k] < L) k++; const a = s.pts[k - 1], b = s.pts[k], q = (L - s.cum[k - 1]) / ((s.cum[k] - s.cum[k - 1]) || 1); return [klerp(a[0], b[0], q), klerp(a[1], b[1], q)]; };
const SEG_VIAJE = COL.segs.find((s) => s.prim && s.i === 12);   // la hifa por donde corre el núcleo marcado
function Colonia({ T, x, y, r = 430, rio = 0, nucleo = -1, mechon = 0, id = 'col' }) {
  return <PlacaPetri x={x} y={y} r={r} agar={HF.agar} id={id}>
    {/* hifas (borde blanquecino que avanza radialmente) */}
    {COL.segs.map((s, i) => <path key={i} d={s.d} fill="none" stroke={rio > 0 ? HF.pared : '#fffaf0'} strokeWidth={klerp(s.prim ? 3 : 2, s.prim ? 9 : 6, rio)} opacity={klerp(0.85, 0.95, rio)} strokeLinecap="round" />)}
    {rio > 0 && COL.segs.map((s, i) => <path key={'i' + i} d={s.d} fill="none" stroke="#123a36" strokeWidth={s.prim ? 4.5 : 2.8} opacity={rio} strokeLinecap="round" />)}
    {/* pelusa aérea naranja (conidios) */}
    {COL.fluff.map((f, i) => { const dy = mechon > 0 && Math.hypot(f.x + 120, f.y - 120) < 70 ? -mechon * 40 : 0;
      return <circle key={'f' + i} cx={f.x + Math.sin(T * 1.2 + f.ph) * 1.5} cy={f.y + dy} r={f.r} fill={f.c} opacity={0.82 * (1 - 0.72 * rio)} />; })}
    {/* el río: puntitos que corren por dentro de cada hifa hacia su punta */}
    {rio > 0 && COL.segs.map((s, i) => Array.from({ length: Math.max(1, Math.floor(s.len / 34)) }, (_, k) => {
      const u = fmod((k * 34 + T * 46) / s.len, 1); const [px, py] = enSeg(s, u);
      return <circle key={i + '_' + k} cx={px} cy={py} r={2.6} fill="#e8fff6" opacity={rio * 0.9} />; }))}
    {/* núcleo marcado que corre hasta el borde, con estela */}
    {nucleo >= 0 && [0, 0.03, 0.06, 0.09].map((dz, k) => { const u = kclamp(nucleo - dz, 0, 1); const [px, py] = enSeg(SEG_VIAJE, u);
      return <circle key={'n' + k} cx={px} cy={py} r={(13 - k * 3)} fill={HF.nuc} opacity={1 - k * 0.24} style={k === 0 ? { filter:`drop-shadow(0 0 10px ${HF.nuc})` } : null} />; })}
  </PlacaPetri>;
}

function HifaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hifa, P: CUES.Punta, V: CUES.Vesiculas, R: CUES.Rio, S: CUES.Septo, Q: CUES.Pregunta, W: CUES.Woronin, E: CUES.Estudio, ST: CUES.SinTapon, VI: CUES.Viaje, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sub = (i, a, b) => <Subtitulo T={T} idx={i} at={a + 0.1} until={b - 0.1} texto={TX.sub[i]} />;
  // colonia: centro en pantalla
  const CX = 540, CY = 930;
  // pinzas del gancho y del cierre
  const pinzaG = kprog(T, K.G + 0.05, K.G + 0.45, kEase.sale), levanta = kprog(T, K.G + 0.5, K.G + 1.4, kEase.sale);
  // tiempo de flujo efectivo en la escena Woronin (el lado sano se detiene al taparse el poro)
  const tapa = K.W + 2.3;
  const tfIzq = T < tapa ? T : tapa + (1 - Math.exp(-(T - tapa) * 3)) / 3;
  const pique = K.W + 0.7;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la pelusa naranja, las pinzas y la lupa que muestra un tubo */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.06} origen="30% 40%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Colonia T={T} x={CX} y={CY} mechon={levanta} id="colG" />
          <Pinzas x={klerp(-80, CX - 120, pinzaG)} y={klerp(1500, CY + 120 - levanta * 40, pinzaG)} ang={-50} abre={1 - kprog(T, K.G + 0.35, K.G + 0.5)} />
          {levanta > 0 && Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${CX - 120} ${CY + 120 - levanta * 40} Q ${CX - 150 + i * 10} ${CY + 140} ${CX - 170 + i * 16} ${CY + 160}`} stroke="#fffaf0" strokeWidth={2.5} fill="none" opacity={levanta} />)}
        </>)}
      </Escena>
      <Lupa T={T} at={K.G + 2.2} until={K.H - 0.2} x={300} y={560} r={175} fx={CX - 250} fy={CY - 60} tinte={KC.cyan} etiqueta="POR DENTRO · UN TUBO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" />
          <Tubo T={t} id="tLupa" x0={-20} x1={r * 2 + 20} y={r} w={92} punta={false} vel={70} nucleos={2} seed={4} /></svg>} />

      {/* 1 · al microscopio: la hifa contra un pelo */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {(() => { const e = kprog(T, K.H + 2.4, K.H + 3.3, kEase.sale); return e > 0 && <Pelo x={klerp(-1200, -40, e)} y={790} w={1160} h={420} />; })()}
          <Tubo T={T} id="tHifa" x0={-40} x1={klerp(880, 940, kprog(T, K.H, K.P))} y={690} w={72} vel={55} nucleos={4} seed={5} />
          {/* medidores */}
          <g opacity={kprog(T, K.H + 1.2, K.H + 1.6)}><line x1={300} y1={650} x2={300} y2={730} stroke={KC.gold2} strokeWidth={5} /><line x1={288} y1={654} x2={312} y2={654} stroke={KC.gold2} strokeWidth={5} /><line x1={288} y1={726} x2={312} y2={726} stroke={KC.gold2} strokeWidth={5} /></g>
          <g opacity={kprog(T, K.H + 3.3, K.H + 3.7)}><line x1={600} y1={795} x2={600} y2={1205} stroke={KC.ink} strokeWidth={6} /><line x1={584} y1={797} x2={616} y2={797} stroke={KC.ink} strokeWidth={6} /><line x1={584} y1={1203} x2={616} y2={1203} stroke={KC.ink} strokeWidth={6} /></g>
        </>)}
      </Escena>

      {/* 2 · solo crece por la punta: el Spitzenkörper */}
      <Escena T={T} a={K.P} b={K.V} zoom={0.05} origen="80% 50%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg((() => { const tip = klerp(760, 880, kprog(T, K.P, K.V)); return <>
          <Tubo T={T} id="tPunta" x0={-60} x1={tip} y={900} w={260} vel={70} densidad={0.7} nucleos={3} spk={kprog(T, K.P + 1.2, K.P + 1.8)} seed={6} />
          {/* marcas fijas en la pared: el resto del tubo no cambia de largo */}
          {[120, 320, 520].map((mx) => <line key={mx} x1={mx} y1={756} x2={mx} y2={740} stroke={KC.gold2} strokeWidth={6} opacity={kprog(T, K.P + 0.4, K.P + 0.8)} />)}
          <EtqSvg T={T} at={K.P + 2.0} until={K.V - 0.2} px={tip - 82} py={960} tx={180} ty={1150} texto="Spitzenkörper" color={KC.yellow} tam={38} />
          <EtqSvg T={T} at={K.P + 2.4} until={K.V - 0.2} px={tip - 60} py={1010} tx={180} ty={1150} texto="" color={KC.yellow} tam={1} />
        </>; })())}
        <Nota T={T} at={K.P + 2.3} until={K.V - 0.2} x={180} y={1196} partes={[['(cuerpo apical: nube de vesículas)', false]]} tam={24} color={KC.yellow} />
        <Chip T={T} at={K.P + 0.3} until={K.V - 0.2} texto="crece solo por la punta ➜" x={380} y={560} tam={38} borde={KC.mint} />
      </Escena>

      {/* 3 · las vesículas: membrana y enzimas para la pared */}
      <Escena T={T} a={K.V} b={K.R} zoom={0.04} origen="80% 55%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg((() => { const W = 480, Y = 960, X1 = 920, rr = W / 2, cxD = X1 - rr;
          const rieles = [-130, -10, 110];
          const ves = Array.from({ length: 34 }, (_, i) => {
            const t0 = K.V + 0.2 + i * 0.13, u = (T - t0) / 1.5; if (u < 0 || u > 1.25) return null;
            const ri = rieles[i % 3], ang = (ri / rr) * 1.1;
            const fx = cxD + Math.cos(ang) * (rr - 10), fy = Y + Math.sin(ang) * (rr - 10);
            if (u <= 1) { const x = klerp(-30, fx, kEase.suave(u)), y = klerp(Y + ri, fy, kEase.suave(kclamp(u * 1.5 - 0.5, 0, 1)));
              return <circle key={i} cx={x} cy={y} r={15} fill={HF.ves} stroke={KC.ink} strokeWidth={3} />; }
            const q = (u - 1) / 0.25;   // se funde: anillo + enzimas
            return <g key={i}><circle cx={fx} cy={fy} r={15 + q * 26} fill="none" stroke={HF.ves} strokeWidth={4} opacity={1 - q} />
              {[0, 1, 2].map((k) => <circle key={k} cx={fx + Math.cos(ang + (k - 1) * 0.25) * q * 22} cy={fy + Math.sin(ang + (k - 1) * 0.25) * q * 22} r={6} fill={HF.enz} opacity={1 - q * 0.6} />)}</g>;
          });
          const pared = kprog(T, K.V + 1.6, K.R - 0.4);
          return <>
            <Tubo T={T} id="tVes" x0={-60} x1={X1} y={Y} w={W} vel={60} densidad={0.35} flujo seed={7} grosor={16}>
              {rieles.map((ri) => <line key={ri} x1={-60} y1={Y + ri} x2={cxD - 40} y2={Y + ri * 1.05} stroke="rgba(177,140,255,.55)" strokeWidth={5} strokeDasharray="22 10" />)}
            </Tubo>
            <path d={`M ${cxD} ${Y - rr} A ${rr} ${rr} 0 0 1 ${cxD} ${Y + rr}`} fill="none" stroke={HF.enz} strokeWidth={10 * pared} opacity={0.85} />
            {ves}
          </>; })())}
        <NumeroGigante T={T} at={K.V + 2.2} until={K.R - 0.2} valor={38000} dur={1.6} etiqueta="vesículas por minuto" x={380} y={520} tam={130} color={KC.yellow} />
        <Nota T={T} at={K.V + 2.8} until={K.R - 0.2} x={380} y={650} centro partes={[['estimación para ', false], ['N. crassa', true]]} tam={28} color={KC.texto} />
        <Nota T={T} at={K.V + 1.0} until={K.R - 0.2} x={70} y={840} partes={[['vesículas → membrana nueva', false]]} tam={28} color={KC.yellow} />
        <Nota T={T} at={K.V + 1.8} until={K.R - 0.2} x={70} y={1090} partes={[['enzimas de pared (quitina sintasas)', false]]} tam={28} color={HF.enz} />
      </Escena>

      {/* 4 · el río: el citoplasma fluye hacia la punta y arrastra a los núcleos */}
      <Escena T={T} a={K.R} b={K.S} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Tubo T={T} id="tRio" x0={-60} x1={1010} y={760} w={240} vel={95} densidad={1.1} nucleos={Math.round(9 * kprog(T, K.R + 3.0, K.R + 3.4))} ret={kprog(T, K.R + 3.0, K.R + 3.4) > 0.5 ? 1 : 0} nucVel={70} seed={8}>
            {[0, 1, 2, 3, 4].map((k) => { const x = fmod(k * 230 + T * 120, 1100) - 60; return <path key={k} d={`M ${x} 735 L ${x + 30} 760 L ${x} 785`} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={6} strokeLinecap="round" />; })}
          </Tubo>
          <EtqSvg T={T} at={K.R + 4.4} until={K.S - 0.2} px={860} py={800} tx={1030} ty={930} texto="sin núcleos" ancla="end" color={KC.texto} tam={26} />
        </>)}
        <Chip T={T} at={K.R + 0.2} until={K.R + 2.6} texto="citoplasma → hacia la punta" x={400} y={560} tam={34} borde={KC.mint} />
        <Nota T={T} at={K.R + 3.4} until={K.S - 0.2} x={60} y={560} partes={[['● núcleos (proteína fluorescente)', false]]} tam={26} color={HF.nuc} />
        <Nota T={T} at={K.R + 3.8} until={K.S - 0.2} x={60} y={600} partes={[['● algunos van en contra', false]]} tam={26} color={HF.ret} />
        <TarjetaEstudio T={T} at={K.R + 2.6} until={K.S - 0.2} anio="2009" quien="CICESE, Ensenada (México)" revista="Ramos-García et al. · Eukaryotic Cell" x={540} y={1060} />
      </Escena>

      {/* 5 · septos con poro */}
      <Escena T={T} a={K.S} b={K.Q} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Tubo T={T} id="tSep" x0={-60} x1={1160} y={840} w={300} punta={false} vel={90} densidad={1} nucleos={4} nucVel={60} septos={[330, 800]} septoCrece={kprog(T, K.S + 0.3, K.S + 1.4, kEase.sale)} seed={9} />
          {[[190, -1], [520, 1], [640, -1], [960, 1]].map(([wx, s], i) => <Woronin key={i} x={wx} y={840 + s * 128} r={13} o={kprog(T, K.S + 2.6, K.S + 3.0)} />)}
          <EtqSvg T={T} at={K.S + 1.0} until={K.Q - 0.2} px={330} py={700} tx={140} ty={560} texto="septo" color={HF.pared} tam={40} />
          <EtqSvg T={T} at={K.S + 1.8} until={K.Q - 0.2} px={800} py={840} tx={660} ty={1110} texto="poro" color={KC.gold2} tam={40} />
        </>)}
      </Escena>

      {/* 6 · re-gancho: ¿y si se rompe? */}
      <Escena T={T} a={K.Q} b={K.W} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={-40} y={1010} width={1160} height={150} rx={75} fill="#e9fff6" stroke={KC.ink} strokeWidth={9} />
          {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={fmod(k * 190 + T * 160, 1160) - 40} cy={1085 + Math.sin(k) * 30} r={12} fill={HF.pared} />)}
          <Aguja x={klerp(80, 300, kprog(T, K.Q + 0.2, K.Q + 1.6, kEase.suave))} y={klerp(760, 995, kprog(T, K.Q + 0.2, K.Q + 1.6, kEase.suave))} ang={-125} largo={600} />
          <Interrogacion T={T} x={300} y={830} tam={340} />
        </>)}
      </Escena>

      {/* 7 · cuerpos de Woronin: la aguja rompe el tubo y un tapón cierra el poro */}
      <Escena T={T} a={K.W} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg((() => { const Y = 840, W = 300, SX = 520, hx = 860;
          const ag = kprog(T, K.W + 0.1, pique, kEase.suave), saca = kprog(T, pique + 0.25, pique + 0.8);
          const roto = T > pique;
          const mov = kprog(T, K.W + 1.3, tapa, kEase.suave);
          const fuga = roto ? Math.exp(-(T - pique) * 0.15) : 0;
          return <>
            <defs><clipPath id="wIzq"><rect x={-80} y={Y - W / 2} width={SX + 80} height={W} /></clipPath><clipPath id="wDer"><rect x={SX} y={Y - W / 2} width={700} height={W} /></clipPath></defs>
            <Tubo T={T} id="tWor" x0={-60} x1={1160} y={Y} w={W} punta={false} flujo={false} septos={[SX]} seed={10} />
            <g clipPath="url(#wIzq)"><Particulas T={T} tf={roto ? tfIzq : T * 0.3} x0={-60} x1={SX + 10} y={Y} w={W} vel={roto ? 120 : 40} seed={11} septos={[SX]} /></g>
            <g clipPath="url(#wDer)"><Particulas T={T} tf={T} x0={SX} x1={1160} y={Y} w={W} vel={roto ? 110 * fuga : 40} seed={12} septos={[SX]} densidad={roto ? klerp(0.25, 1, fuga) : 1} salida={roto ? { x: hx, y: Y - W / 2 } : null} /></g>
            {/* chorro de citoplasma por la herida */}
            {roto && Array.from({ length: 26 }, (_, i) => { const u = fmod(i / 26 + T * 1.4, 1); return <circle key={i} cx={hx + Math.sin(i * 7.3) * 30 * u} cy={Y - W / 2 - u * 260} r={7 * (1 - u * 0.6)} fill={HF.part} opacity={(1 - u) * kclamp(fuga * 1.4, 0, 1)} />; })}
            {roto && <path d={`M ${hx - 22} ${Y - W / 2 - 4} L ${hx} ${Y - W / 2 + 18} L ${hx + 22} ${Y - W / 2 - 4}`} fill="none" stroke={KC.red} strokeWidth={7} />}
            {/* cuerpos de Woronin amarrados a la orilla; uno corre al poro */}
            <Woronin x={180} y={Y + 128} r={16} />
            <Woronin x={340} y={Y - 128} r={16} />
            <Woronin x={klerp(440, SX - 22, mov)} y={klerp(Y + 128, Y, mov)} r={20} />
            <Woronin x={720} y={Y + 128} r={16} />
            <Aguja x={klerp(1000, hx, ag) + saca * 140} y={klerp(380, Y - W / 2 + 10, ag) - saca * 200} ang={-60} largo={600} />
            <EtqSvg T={T} at={tapa - 0.1} until={K.E - 0.2} px={SX - 22} py={Y} tx={120} ty={1130} texto="cuerpo de Woronin" color={HF.worBorde} tam={36} />
          </>; })())}
        <Chip T={T} at={tapa} until={K.E - 0.2} texto="tapón de emergencia" x={300} y={560} tam={38} borde={HF.worBorde} />
        <Nota T={T} at={pique + 0.2} until={tapa} x={60} y={560} partes={[['¡se escapa el citoplasma!', false]]} tam={32} color={KC.red} />
      </Escena>

      {/* 8 · el estudio: Jedd y Chua, 2000, la proteína Hex1 */}
      <Escena T={T} a={K.E} b={K.ST} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg((() => { const X = 300, Y = 540, R = 150, p = kprog(T, K.E + 0.8, K.E + 3.4);
          const celdas = []; for (let q = -3; q <= 3; q++) for (let s = -3; s <= 3; s++) { const cx = X + q * 34 + s * 17, cy = Y + s * 29.4; const dd = Math.hypot(cx - X, cy - Y); if (dd < R * 0.72) celdas.push([cx, cy, dd]); }
          celdas.sort((a, b) => a[2] - b[2]);
          const hx = (cx, cy, rr) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
          return <>
            <circle cx={X} cy={Y} r={R} fill={HF.wor} stroke={HF.worBorde} strokeWidth={10} />
            {celdas.map(([cx, cy], i) => { const on = kprog(p * celdas.length, i, i + 1); if (on <= 0) return null;
              return <path key={i} d={hx(cx + (1 - on) * (cx - X) * 1.5, cy + (1 - on) * (cy - Y) * 1.5, 16)} fill="#8f78d6" stroke="#e6dcff" strokeWidth={3} opacity={on} />; })}
          </>; })())}
        <Nota T={T} at={K.E + 1.4} until={K.ST - 0.2} x={60} y={740} partes={[['Hex1: se ensambla sola', false]]} tam={32} color={HF.worBorde} />
        <Nota T={T} at={K.E + 1.8} until={K.ST - 0.2} x={60} y={782} partes={[['y forma el cristal del tapón', false]]} tam={26} color={KC.texto} />
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.ST - 0.2} anio="2000" quien="Universidad Rockefeller, Nueva York" revista="Jedd y Chua · Nature Cell Biology" x={540} y={1010} />
      </Escena>

      {/* 9 · sin Hex1 no hay tapones: comparativa */}
      <Escena T={T} a={K.ST} b={K.VI} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg((() => { const W = 170, SX = 520, hx = 800;
          const fila = (Y, con, sd) => { const fuga = con ? 0 : 1;
            return <g>
              <Tubo T={T} id={'tc' + sd} x0={-60} x1={1160} y={Y} w={W} punta={false} flujo={false} septos={[SX]} seed={sd} />
              <defs><clipPath id={'ci' + sd}><rect x={-80} y={Y - W / 2} width={SX + 80} height={W} /></clipPath><clipPath id={'cd' + sd}><rect x={SX} y={Y - W / 2} width={700} height={W} /></clipPath></defs>
              <g clipPath={`url(#ci${sd})`}><Particulas T={T} tf={con ? K.ST + Math.sin(T * 2) * 0.02 : T} x0={-60} x1={SX + 10} y={Y} w={W} vel={con ? 0 : 130} seed={sd + 1} septos={[SX]}
                densidad={con ? 1 : klerp(1, 0.2, kprog(T, K.ST, K.VI))} /></g>
              <g clipPath={`url(#cd${sd})`}><Particulas T={T} x0={SX} x1={1160} y={Y} w={W} vel={130} seed={sd + 2} septos={[SX]} densidad={con ? 0.2 : klerp(0.9, 0.2, kprog(T, K.ST, K.VI))} salida={{ x: hx, y: Y - W / 2 }} /></g>
              {Array.from({ length: 18 }, (_, i) => { const u = fmod(i / 18 + T * 1.4, 1); return <circle key={i} cx={hx + Math.sin(i * 7.3) * 20 * u} cy={Y - W / 2 - u * 150} r={5 * (1 - u * 0.6)} fill={HF.part} opacity={(1 - u) * (con ? 0.25 : 1)} />; })}
              <path d={`M ${hx - 16} ${Y - W / 2 - 3} L ${hx} ${Y - W / 2 + 12} L ${hx + 16} ${Y - W / 2 - 3}`} fill="none" stroke={KC.red} strokeWidth={6} />
              {con && <><Woronin x={SX - 14} y={Y} r={13} /><Woronin x={200} y={Y + 70} r={10} /><Woronin x={380} y={Y - 70} r={10} /></>}
            </g>; };
          return <>{fila(760, true, 21)}{fila(1090, false, 31)}</>; })())}
        <Chip T={T} at={K.ST + 0.2} until={K.VI - 0.2} texto="con Hex1: poro tapado ✓" x={330} y={620} tam={32} borde={KC.mint} />
        <Chip T={T} at={K.ST + 0.9} until={K.VI - 0.2} texto="sin Hex1: no hay tapón ✗" x={330} y={950} tam={32} borde={KC.red} />
        <Nota T={T} at={K.ST + 1.6} until={K.VI - 0.2} x={540} y={1200} centro partes={[['hifas mutantes, sin cuerpos de Woronin', false]]} tam={24} color={KC.texto} />
      </Escena>

      {/* 10 · el viaje: un núcleo corre por la red más rápido de lo que crece la colonia */}
      <Escena T={T} a={K.VI} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Colonia T={T} x={CX} y={CY} rio={1} nucleo={kprog(T, K.VI + 0.6, K.VI + 4.4, kEase.suave)} id="colV" />)}
        <Nota T={T} at={K.VI + 0.8} until={K.C - 0.2} x={60} y={420} partes={[['● núcleo: hasta 10 mm/h', false]]} tam={30} color={KC.ink} />
        <Nota T={T} at={K.VI + 2.0} until={K.C - 0.2} x={60} y={466} partes={[['la colonia crece menos de 1/3 de eso', false]]} tam={26} color={KC.ink} />
        <Chip T={T} at={K.VI + 1.2} until={K.C - 0.2} texto="2013 · UCLA y UC Berkeley · PNAS" x={540} y={1530} tam={30} borde={KC.gold} mono />
      </Escena>

      {/* 11 · cierre: la misma pelusa, ahora tubos con su río */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="30% 40%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Colonia T={T} x={CX} y={CY} rio={kprog(T, K.C + 0.3, K.C + 1.6)} mechon={1} nucleo={fmod((T - K.C) / 3, 1)} id="colC" />
          <Pinzas x={CX - 120} y={CY + 80} ang={-50} abre={0} />
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${CX - 120} ${CY + 80} Q ${CX - 150 + i * 10} ${CY + 140} ${CX - 170 + i * 16} ${CY + 160}`} stroke="#fffaf0" strokeWidth={2.5} fill="none" />)}
        </>)}
        <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="tubos, no hilos" x={330} y={420} tam={44} borde={KC.mint} />
      </Escena>

      {/* etiquetas de la colonia */}
      <Nota T={T} at={K.G + 0.8} until={K.H - 0.3} x={60} y={1510} partes={[['moho naranja · ', false], ['Neurospora crassa', true]]} tam={34} color={KC.ink} />
      <Nota T={T} at={K.G + 0.1} until={K.G + 2.1} x={300} y={420} centro partes={[['¿hilos?', false]]} tam={44} color={KC.ink} />
      <Nota T={T} at={K.H + 0.3} until={K.P - 0.3} x={70} y={420} partes={[['AL MICROSCOPIO', false]]} tam={34} color={KC.cyan} />
      <Nota T={T} at={K.H + 1.3} until={K.P - 0.3} x={325} y={612} partes={[['hifa: 6–12 µm', false]]} tam={30} color={KC.gold2} />
      <Nota T={T} at={K.H + 3.4} until={K.P - 0.3} x={630} y={1000} partes={[['pelo ≈ 70 µm', false]]} tam={38} color={KC.ink} />

      {/* barras de escala (y = 1430) */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="2 cm" largo={190} />
      <BarraEscala T={T} at={K.H} until={K.P} texto="20 µm" largo={120} y={1440} />
      <BarraEscala T={T} at={K.P} until={K.V} texto="5 µm" largo={108} />
      <BarraEscala T={T} at={K.V} until={K.R} texto="1 µm" largo={40} />
      <BarraEscala T={T} at={K.R} until={K.S} texto="10 µm" largo={200} />
      <BarraEscala T={T} at={K.S} until={K.Q} texto="10 µm" largo={250} />
      <BarraEscala T={T} at={K.Q} until={K.W} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.W} until={K.E} texto="10 µm" largo={250} />
      <BarraEscala T={T} at={K.E} until={K.ST} texto="0.5 µm · esquemático" largo={150} />
      <BarraEscala T={T} at={K.ST} until={K.VI} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.VI} until={K.C} texto="1 cm" largo={95} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={190} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      {sub(0, K.G, K.H)}{sub(1, K.H, K.P)}{sub(2, K.P, K.V)}{sub(3, K.V, K.R)}{sub(4, K.R, K.S)}{sub(5, K.S, K.Q)}
      {sub(6, K.Q, K.W)}{sub(7, K.W, K.E)}{sub(8, K.E, K.ST)}{sub(9, K.ST, K.VI)}{sub(10, K.VI, K.C)}{sub(11, K.C, K.Ou)}

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.8, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 2.2, K.P - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.V + 0.8, K.R - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.R + 2.8, K.S - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Q + 0.05, K.W, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 0.3, K.ST - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.ST + 0.5, K.VI - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.VI + 1.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.8, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="100" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HifaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HifaShot /></CompositionStage></div>;
}
window.HifaApp = HifaApp;
