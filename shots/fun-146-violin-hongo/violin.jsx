// Shot Fungi Mati #146 · Este violín no es un Stradivarius: es madera que se comió un hongo — NARRADO
// (gancho 1 "esto no es X: es Y" · formato N1 Por dentro + N5 El experimento). Guion y fuentes: guion.md · verificacion.md.
// El dibujo es esquemático.

const VC = { picea:'#e9a94a', picea2:'#c97f2a', barniz:'#b5541c', barniz2:'#8a3a12', arce:'#d9a25e', arce2:'#a8682e', ebano:'#1b1714',
  cuerda:'#e8e2d0', pared:'#e8c58a', pared2:'#c99a55', lumen:'#140e08', hifa:'#fffbea', telon:'#a3172b', telon2:'#6e0d1b', strad:'#7a2e10' };

// Contorno del cuerpo del violín: mitad derecha en cúbicas, y se refleja. Centro (0, 0); de y = -350 a y = 357.
const V_DER = [[60,-352,130,-346,160,-312],[186,-282,184,-205,166,-160],[140,-140,112,-110,112,-55],[112,-5,140,30,172,52],[208,80,218,170,212,225],[204,305,128,355,0,357]];
function vPath(k = 1) {
  const f = (v) => (v * k).toFixed(1);
  let d = `M 0 ${f(-350)}`;
  V_DER.forEach((s) => { d += ` C ${f(s[0])} ${f(s[1])} ${f(s[2])} ${f(s[3])} ${f(s[4])} ${f(s[5])}`; });
  for (let i = V_DER.length - 1; i >= 0; i--) { const s = V_DER[i], p = i > 0 ? V_DER[i - 1] : [0, 0, 0, 0, 0, -350];
    d += ` C ${f(-s[2])} ${f(s[3])} ${f(-s[0])} ${f(s[1])} ${f(-p[4])} ${f(p[5])}`; }
  return d + ' Z';
}
const V_CUERPO = vPath(1), V_FILETE = vPath(0.93);

// Violín de frente. (x, y) = centro del cuerpo. hifas 0..1 = red de micelio dentro de la tapa; oro = la red brilla dorada.
// arco = true → el arco va y viene sobre las cuerdas. vibra 0..1 = ondas de sonido. silueta = un solo color (detrás de la cortina).
function Violin({ T = 0, id = 'v', x, y, s = 1, rot = 0, tapa = VC.picea, borde = VC.barniz, hifas = 0, oro = 0, arco = false, vibra = 0, silueta, seed = 3 }) {
  const sil = !!silueta, ink = sil ? silueta : KC.ink;
  const off = Math.sin(T * 2.6) * 150;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={id + 'c'}><path d={V_CUERPO} /></clipPath>
      <radialGradient id={id + 'g'} cx="45%" cy="40%" r="70%"><stop offset="0%" stopColor={sil ? silueta : mixHex(tapa, '#fff3c8', 0.35)} /><stop offset="65%" stopColor={sil ? silueta : tapa} /><stop offset="100%" stopColor={sil ? silueta : borde} /></radialGradient></defs>
    {vibra > 0 && [0, 1, 2].map((k) => { const u = ((T * 0.9 + k / 3) % 1); return <g key={k} opacity={vibra * (1 - u) * 0.8}>
      <path d={`M ${250 + u * 260} ${-200 - u * 80} Q ${330 + u * 300} 0 ${250 + u * 260} ${200 + u * 80}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" />
      <path d={`M ${-250 - u * 260} ${-200 - u * 80} Q ${-330 - u * 300} 0 ${-250 - u * 260} ${200 + u * 80}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" /></g>; })}
    {/* mástil, clavijero y voluta */}
    <rect x={-26} y={-640} width={52} height={300} rx={10} fill={sil ? silueta : VC.barniz} stroke={ink} strokeWidth={8} />
    <rect x={-30} y={-770} width={60} height={150} rx={14} fill={sil ? silueta : VC.barniz} stroke={ink} strokeWidth={8} />
    {[-740, -690].map((py) => <g key={py}><ellipse cx={-52} cy={py} rx={26} ry={14} fill={sil ? silueta : VC.ebano} stroke={ink} strokeWidth={5} /><ellipse cx={52} cy={py + 22} rx={26} ry={14} fill={sil ? silueta : VC.ebano} stroke={ink} strokeWidth={5} /></g>)}
    <circle cx={0} cy={-800} r={40} fill={sil ? silueta : VC.barniz} stroke={ink} strokeWidth={8} />
    {!sil && <path d="M 0 -800 m -22 0 a 22 22 0 1 1 22 22 a 12 12 0 1 1 -10 -14" stroke={KC.ink} strokeWidth={5} fill="none" />}
    {/* cuerpo */}
    <path d={V_CUERPO} fill={`url(#${id}g)`} stroke={ink} strokeWidth={10} strokeLinejoin="round" />
    {!sil && <g clipPath={`url(#${id}c)`}>
      {Array.from({ length: 30 }, (_, i) => { const px = -225 + i * 15.5; return <path key={i} d={`M ${px} -360 Q ${px + 6 * Math.sin(i)} 0 ${px} 360`} stroke={borde} strokeWidth={i % 3 ? 2 : 3.5} opacity=".35" fill="none" />; })}
      {hifas > 0 && <RedHifas T={T} x={0} y={-40} g={hifas} seed={seed} n={340} escala={0.62} circ color={oro > 0 ? mixHex(VC.hifa, KC.gold2, oro) : VC.hifa} ancho={7} brillo={0.5 + oro} />}
    </g>}
    {!sil && <path d={V_FILETE} fill="none" stroke={VC.barniz2} strokeWidth={5} opacity=".7" />}
    {/* efes */}
    {!sil && [1, -1].map((k) => <g key={k} transform={`scale(${k} 1)`}>
      <path d="M 66 -40 C 96 0, 48 52, 86 104" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      <circle cx={62} cy={-44} r={9} fill={KC.ink} /><circle cx={90} cy={108} r={9} fill={KC.ink} />
      <path d="M 66 30 l 14 -4 M 72 38 l -14 4" stroke={KC.ink} strokeWidth={4} />
    </g>)}
    {/* diapasón, cordal, puente y cuerdas */}
    <path d="M -21 -630 L 21 -630 L 40 -40 Q 0 -30 -40 -40 Z" fill={sil ? silueta : VC.ebano} stroke={ink} strokeWidth={6} />
    <path d="M -30 175 L 30 175 L 44 330 Q 0 345 -44 330 Z" fill={sil ? silueta : VC.ebano} stroke={ink} strokeWidth={6} />
    {!sil && <path d="M -58 66 L 58 66 L 50 40 Q 0 28 -50 40 Z" fill="#f2deb0" stroke={KC.ink} strokeWidth={5} />}
    {!sil && [-36, -12, 12, 36].map((bx, i) => { const nx = bx * 0.42;
      return <g key={i}><line x1={bx * 0.8} y1={180} x2={bx} y2={40} stroke={VC.cuerda} strokeWidth={3} /><line x1={bx} y1={40} x2={nx} y2={-628} stroke={VC.cuerda} strokeWidth={3 + (arco ? 2 * Math.abs(Math.sin(T * 40 + i)) : 0)} opacity={arco ? 0.85 : 1} /></g>; })}
    {/* arco */}
    {arco && <g transform={`translate(${off} 0) rotate(-7)`}>
      <line x1={-430} y1={6} x2={400} y2={6} stroke="#f7f1de" strokeWidth={10} />
      <path d="M -440 -30 Q 0 -44 410 -24" stroke="#5a2a10" strokeWidth={14} fill="none" strokeLinecap="round" />
      <rect x={-470} y={-40} width={50} height={54} rx={8} fill={KC.ebano} stroke={KC.ink} strokeWidth={4} />
      <line x1={400} y1={6} x2={410} y2={-24} stroke="#5a2a10" strokeWidth={8} />
    </g>}
  </g>;
}
// Fondo del violín (arce) visto por detrás: veta "flameada" en franjas.
function FondoArce({ id = 'f', x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id + 'c'}><path d={V_CUERPO} /></clipPath></defs>
    <path d={V_CUERPO} fill={VC.arce} stroke={KC.ink} strokeWidth={10} />
    <g clipPath={`url(#${id}c)`}>
      {Array.from({ length: 26 }, (_, i) => { const py = -380 + i * 30; return <path key={i} d={`M -240 ${py} Q -120 ${py - 22} 0 ${py + 6} Q 120 ${py - 22} 240 ${py}`} stroke={i % 2 ? VC.arce2 : '#f1cf93'} strokeWidth={13} fill="none" opacity=".55" />; })}
      <line x1={0} y1={-360} x2={0} y2={360} stroke={VC.arce2} strokeWidth={3} opacity=".7" />
    </g>
    <path d={V_FILETE} fill="none" stroke={VC.arce2} strokeWidth={5} />
    <circle cx={0} cy={-352} r={20} fill={VC.arce} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Tapa sola (pícea) para las escenas del sonido: veta fina y recta.
function TapaPicea({ T = 0, id = 't', x, y, s = 1, pulso = 0, vibra = 0 }) {
  const w = vibra ? 1 + Math.sin(T * 30) * 0.006 * vibra : 1;
  return <g transform={`translate(${x} ${y}) scale(${s * w} ${s / w})`}>
    <defs><clipPath id={id + 'c'}><path d={V_CUERPO} /></clipPath></defs>
    <path d={V_CUERPO} fill="#f3cf8a" stroke={KC.ink} strokeWidth={10} />
    <g clipPath={`url(#${id}c)`}>
      {Array.from({ length: 34 }, (_, i) => { const px = -230 + i * 14; return <line key={i} x1={px} y1={-360} x2={px + 3} y2={360} stroke={VC.picea2} strokeWidth={i % 4 ? 2 : 4} opacity=".45" />; })}
      {pulso > 0 && pulso < 1 && <g>
        <ellipse cx={0} cy={klerp(330, -330, pulso)} rx={240} ry={26} fill={KC.cyan} opacity=".55" style={{ filter:`drop-shadow(0 0 18px ${KC.cyan})` }} />
        <ellipse cx={0} cy={klerp(330, -330, pulso)} rx={240} ry={8} fill="#fff" opacity=".8" /></g>}
    </g>
    {[1, -1].map((k) => <g key={k} transform={`scale(${k} 1)`}><path d="M 66 -40 C 96 0, 48 52, 86 104" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" /><circle cx={62} cy={-44} r={9} fill={KC.ink} /><circle cx={90} cy={108} r={9} fill={KC.ink} /></g>)}
  </g>;
}

// Panal: corte transversal de la madera de pícea (células huecas en filas). (x, y, w, h) en pantalla; cel = tamaño de una célula.
// pared = grosor de la pared en px (se adelgaza); hifas 0..1 = hilos del hongo que avanzan de hueco en hueco.
const PANAL_HIFAS = (() => { const g = krng(146), caminos = [];
  for (let k = 0; k < 7; k++) { let c = 0, r = Math.floor(g() * 9); const pts = [[c, r]];
    for (let i = 0; i < 16; i++) { const q = g(); if (q < 0.55) c++; else if (q < 0.78) r++; else r--; r = kclamp(r, 0, 10); pts.push([c, r]); }
    caminos.push({ pts, t0: g() * 0.35 }); }
  return caminos; })();
function Panal({ T = 0, x, y, w, h, cel = 80, pared = 16, hifas = 0, desgaste = 0, tardio = [6, 7] }) {
  const cols = Math.ceil(w / cel), filas = Math.ceil(h / cel), g = krng(7);
  const celdas = [];
  for (let r = 0; r < filas; r++) for (let c = 0; c < cols; c++) {
    const lt = tardio.includes(r % 9);                               // madera tardía: células chicas y de pared gruesa
    const jx = (g() - 0.5) * cel * 0.12, jy = (g() - 0.5) * cel * 0.1;
    const pw = lt ? pared * 1.9 : pared, lw = cel - pw, lh = (lt ? cel * 0.62 : cel) - pw;
    celdas.push(<rect key={r * 100 + c} x={c * cel + pw / 2 + jx * 0.3} y={r * cel + pw / 2 + (lt ? cel * 0.19 : 0) + jy * 0.3} width={Math.max(4, lw)} height={Math.max(4, lh)} rx={Math.min(lw, lh) * 0.22} fill={VC.lumen} />);
  }
  const ctr = (c, r) => [c * cel + cel / 2, r * cel + cel / 2];
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="panalC"><rect x={0} y={0} width={w} height={h} rx={30} /></clipPath></defs>
    <g clipPath="url(#panalC)">
      <rect x={0} y={0} width={w} height={h} fill={mixHex(VC.pared, VC.pared2, desgaste * 0.6)} />
      {celdas}
      {hifas > 0 && PANAL_HIFAS.map((hf, k) => { const p = kclamp((hifas - hf.t0) / (1 - hf.t0), 0, 1); if (p <= 0) return null;
        const n = hf.pts.length - 1, upto = p * n, pts = [];
        for (let i = 0; i <= Math.floor(upto); i++) pts.push(ctr(...hf.pts[i]));
        if (upto < n) { const a = ctr(...hf.pts[Math.floor(upto)]), b = ctr(...hf.pts[Math.floor(upto) + 1]), f = upto % 1; pts.push([klerp(a[0], b[0], f), klerp(a[1], b[1], f)]); }
        const d = 'M ' + pts.map((q, i) => (q[0] + Math.sin(i * 2.1 + k) * cel * 0.12).toFixed(1) + ' ' + (q[1] + Math.cos(i * 1.7 + k) * cel * 0.12).toFixed(1)).join(' L ');
        const [ux, uy] = pts[pts.length - 1];
        return <g key={k}><path d={d} stroke={VC.hifa} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter:'drop-shadow(0 0 6px rgba(255,250,220,.8))' }} />
          {pts.slice(1).map((q, i) => i % 2 ? <circle key={i} cx={q[0] + 10} cy={q[1] - 8} r={5} fill={VC.hifa} /> : null)}
          <circle cx={ux} cy={uy} r={8 + Math.sin(T * 8 + k) * 2} fill="#fff" /></g>; })}
    </g>
    <rect x={0} y={0} width={w} height={h} rx={30} fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Medidor de aguja (POBRE → BUENA) para "radiar sonido".
function Aguja({ x, y, r = 190, v = 0 }) {
  const ang = (a) => [x + Math.cos(Math.PI + a * Math.PI) * r, y + Math.sin(Math.PI + a * Math.PI) * r];
  const arco = (a0, a1, c) => { const [x0, y0] = ang(a0), [x1, y1] = ang(a1); return <path d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} stroke={c} strokeWidth={34} fill="none" />; };
  const [nx, ny] = [x + Math.cos(Math.PI + (0.12 + v * 0.76) * Math.PI) * (r - 30), y + Math.sin(Math.PI + (0.12 + v * 0.76) * Math.PI) * (r - 30)];
  return <g>
    <path d={`M ${x - r - 30} ${y + 20} A ${r + 30} ${r + 30} 0 0 1 ${x + r + 30} ${y + 20} Z`} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {arco(0.02, 0.36, KC.red)}{arco(0.36, 0.64, KC.yellow)}{arco(0.64, 0.98, KC.leaf)}
    <text x={x - r + 10} y={y + 60} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>POBRE</text>
    <text x={x + r - 10} y={y + 60} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>BUENA</text>
    <line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <circle cx={x} cy={y} r={20} fill={KC.ink} />
  </g>;
}
// Rodaja de tronco con anillos (n anillos; angostos = crecimiento lento).
function Rodaja({ x, y, r = 170, n = 26, p = 1 }) {
  const g = krng(11), k = Math.ceil(n * p);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 18} fill="#6b3d1c" stroke={KC.ink} strokeWidth={8} />
    <circle r={r} fill="#f0cf96" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: k }, (_, i) => { const rr = r * (1 - (i + 1) / (n + 2)); const d = Array.from({ length: 25 }, (_, j) => { const a = j / 24 * Math.PI * 2, q = rr * (1 + 0.025 * Math.sin(a * 3 + i)); return `${j ? 'L' : 'M'} ${(Math.cos(a) * q).toFixed(1)} ${(Math.sin(a) * q).toFixed(1)}`; }).join(' ');
      return <path key={i} d={d} fill="none" stroke="#b07a3c" strokeWidth={2.5 + g()} />; })}
    <circle r={6} fill="#8a5a2a" />
  </g>;
}
// Cortina de teatro (de frente). alfa = qué tanto deja ver lo de atrás.
function Cortina({ T = 0, x, y, w, h, alfa = 1 }) {
  const n = 9, cw = w / n;
  return <g transform={`translate(${x} ${y})`} opacity={alfa}>
    {Array.from({ length: n }, (_, i) => { const m = Math.sin(T * 1.2 + i) * 6; return <path key={i} d={`M ${i * cw} 0 L ${(i + 1) * cw} 0 L ${(i + 1) * cw + m} ${h} L ${i * cw + m} ${h} Z`} fill={i % 2 ? VC.telon : VC.telon2} />; })}
    <rect x={-10} y={-30} width={w + 20} height={44} rx={10} fill="#d9a62a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Pícea con nieve (sobre Conifera del fungi-kit).
function PiceaNieve({ T, x, y, s = 1 }) {
  return <g><Conifera x={x} y={y} s={s} T={T} seed={4} />
    {[0, 1, 2, 3].map((k) => { const w = (210 - k * 42) * s, yy = y + (-150 - k * 115) * s; return <path key={k} d={`M ${x - w * 0.9} ${yy - 4} Q ${x - w * 0.5} ${yy - 40 * s} ${x} ${yy - 22 * s} Q ${x + w * 0.5} ${yy - 40 * s} ${x + w * 0.9} ${yy - 4} Z`} fill="#ffffff" opacity=".92" />; })}
  </g>;
}

function ViolinShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ci: CUES.Ciegas, Ma: CUES.Madera, Ho: CUES.Hongos, Ad: CUES.Adelgaza, Li: CUES.Ligera, P: CUES.Pregunta, Ra: CUES.Radia, Hi: CUES.Hipotesis, Pb: CUES.Prueba, Vo: CUES.Votos, Oj: CUES.Ojo, Pc: CUES.Precio, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const PUB = 180, SI113 = 113;
  const pared = klerp(18, 6, kprog(T, K.Ad, K.Ad + 2.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el violín suena y por dentro le crece el hongo */}
      <Escena T={T} a={K.G} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Violin T={T} id="vg" x={380} y={960} s={0.75} rot={-4} arco={T > K.G + 0.15} vibra={kprog(T, K.G + 0.2, K.G + 0.8)} hifas={kprog(T, K.G + 1.0, K.G + 4.6)} />)}
      </Escena>
      {/* 1 · prueba a ciegas: cortina y público */}
      <Escena T={T} a={K.Ci} b={K.Ma}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Violin T={T} id="vc" x={340} y={660} s={0.32} silueta="#2a0710" />
          <Cortina T={T} x={60} y={400} w={560} h={400} alfa={0.86} />
          {Array.from({ length: PUB }, (_, i) => { const c = i % 20, r = Math.floor(i / 20); const on = kprog(T, K.Ci + 0.4 + r * 0.06, K.Ci + 0.7 + r * 0.06, kEase.rebote);
            const oro = i < SI113 && T > K.Ci + 1.3 + (i / SI113) * 1.2; return on > 0 ? <g key={i} transform={`translate(${112 + c * 45} ${872 + r * 30}) scale(${on * 0.85})`}>
              <circle r={12} fill={oro ? KC.gold2 : '#ffffff'} stroke={KC.ink} strokeWidth={4} /></g> : null; })}
        </>)}
      </Escena>
      {/* 2 · la madera: tapa de pícea y fondo de arce → al microscopio */}
      <Escena T={T} a={K.Ma} b={K.Ho} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<g opacity={1 - kprog(T, K.Ma + 1.8, K.Ma + 2.3)}>
          <TapaPicea T={T} id="tm" x={290} y={760} s={0.55} />
          <g transform={`translate(${klerp(300, 0, kprog(T, K.Ma + 0.2, K.Ma + 0.9, kEase.sale))} 0)`}><FondoArce id="fm" x={790} y={760} s={0.55} /></g>
        </g>)}
      </Escena>
      <Lupa T={T} at={K.Ma + 1.9} until={K.Ho - 0.15} x={540} y={780} r={300} fx={290} fy={700} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · PÍCEA"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2}><Panal T={Tl} x={-20} y={-20} w={r * 2 + 40} h={r * 2 + 40} cel={64} pared={14} /></svg>} />
      {/* 3–4 · por dentro: entran las hifas y adelgazan las paredes (fondo oscuro) */}
      <Escena T={T} a={K.Ho} b={K.Li} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<Panal T={T} x={50} y={780} w={980} h={420} cel={84} pared={pared} hifas={kprog(T, K.Ho + 0.6, K.Ad + 2.8)} desgaste={kprog(T, K.Ad, K.Ad + 2.6)} />)}
      </Escena>
      {/* 5 · más ligera, el sonido viaja casi igual de rápido */}
      <Escena T={T} a={K.Li} b={K.P}>
        <FondoLunares color={KC.mint} />
        {fsvg(<TapaPicea T={T} id="tl" x={420} y={930} s={0.72} pulso={((T - K.Li - 1.8) / 1.4) % 1 * (T > K.Li + 1.8 ? 1 : 0)} />)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Ra} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Violin T={T} id="vp" x={270} y={1010} s={0.6} rot={Math.sin(T * 4) * 4} /><Interrogacion T={T} x={300} y={760} tam={340} /></>)}
      </Escena>
      {/* 7 · radia sonido: de pobre a buena */}
      <Escena T={T} a={K.Ra} b={K.Hi}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.Ra + 0.1, K.Ra + 0.5)}>
            {[0, 1, 2].map((k) => { const u = ((T * 0.8 + k / 3) % 1); return <circle key={k} cx={290} cy={900} r={210 + u * 260} fill="none" stroke="#ffffff" strokeWidth={10} opacity={(1 - u) * 0.7 * kprog(T, K.Ra + 2.4, K.Ra + 3.2)} />; })}
            <TapaPicea T={T} id="tr" x={290} y={900} s={0.58} vibra={kprog(T, K.Ra + 2.4, K.Ra + 3.2)} />
          </g>
          <Aguja x={790} y={1060} r={170} v={kprog(T, K.Ra + 2.6, K.Ra + 3.6, kEase.rebote)} />
        </>)}
      </Escena>
      {/* 8 · hipótesis: pícea de clima frío, anillos angostos */}
      <Escena T={T} a={K.Hi} b={K.Pb}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#1c2f6b, #3f63b8)' }}></div>
        <div style={{ position:'absolute', left:0, right:0, top:1150, bottom:0, background:'#eef4ff' }}></div>
        <Ambiente T={T} n={60} color="rgba(255,255,255,.85)" tam={[5, 12]} vel={30} />
        {fsvg(<><PiceaNieve T={T} x={290} y={1160} s={0.95} /><Rodaja x={780} y={880} r={170} n={30} p={kprog(T, K.Hi + 0.6, K.Hi + 2.2)} /></>)}
      </Escena>
      {/* 9 · la prueba de 2009: cinco violines detrás de una cortina */}
      <Escena T={T} a={K.Pb} b={K.Vo}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2a0a12, #4a1220)' }}></div>
        {fsvg(<>
          <ellipse cx={540} cy={1095} rx={520} ry={70} fill="#1a0509" />
          {[0, 1, 2, 3, 4].map((i) => { const on = T > K.Pb + 1.2 + i * 0.55, toca = on && T < K.Pb + 1.75 + i * 0.55;
            return <g key={i}><Violin T={T} id={'vs' + i} x={140 + i * 200} y={960} s={0.24} silueta={toca ? '#ffd76a' : on ? '#7a3a2a' : '#3a0f18'} />
              <text x={140 + i * 200} y={1145} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={on ? KC.gold2 : '#7a4a50'}>{i + 1}</text></g>; })}
          <Cortina T={T} x={30} y={680} w={1020} h={400} alfa={0.55 + 0.1 * Math.sin(T)} />
        </>)}
      </Escena>
      {/* 10 · los votos */}
      <Escena T={T} a={K.Vo} b={K.Oj}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <line x1={110} y1={1110} x2={970} y2={1110} stroke={KC.ink} strokeWidth={9} />
          {(() => { const u = kprog(T, K.Vo + 0.4, K.Vo + 2.0, kEase.sale), v = kprog(T, K.Vo + 2.2, K.Vo + 3.2, kEase.sale); return <>
            <rect x={200} y={1110 - 90 * 5.6 * u} width={260} height={90 * 5.6 * u} fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
            <rect x={620} y={1110 - 39 * 5.6 * v} width={260} height={39 * 5.6 * v} fill={VC.strad} stroke={KC.ink} strokeWidth={8} />
            <text x={330} y={1120 - 90 * 5.6 * u} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink} opacity={u}>{Math.round(90 * u)}</text>
            <text x={750} y={1120 - 39 * 5.6 * v} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink} opacity={v}>{Math.round(39 * v)}</text>
          </>; })()}
          <text x={330} y={1158} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>con hongos · 9 meses</text>
          <text x={750} y={1158} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>Stradivarius 1711</text>
        </>)}
      </Escena>
      {/* 11 · ojo: fue una votación */}
      <Escena T={T} a={K.Oj} b={K.Pc}>
        <FondoLunares color={KC.orange} />
      </Escena>
      {/* 12 · el precio */}
      <Escena T={T} a={K.Pc} b={K.C}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Violin T={T} id="vx" x={800} y={1010} s={0.5} rot={6} tapa="#a8461a" borde="#5a1e08" />
          {(() => { const sw = Math.sin(T * 3) * 4 * kprog(T, K.Pc + 0.3, K.Pc + 0.8), on = kprog(T, K.Pc + 0.3, K.Pc + 0.8, kEase.rebote); return <g transform={`rotate(${sw} 760 600)`} opacity={on}>
            <line x1={760} y1={598} x2={790} y2={530} stroke={KC.ink} strokeWidth={4} />
            <g transform={`translate(790 470) scale(${on})`}>
              <path d="M -190 -70 L 160 -70 L 200 0 L 160 70 L -190 70 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              <circle cx={160} cy={0} r={12} fill={KC.mint} stroke={KC.ink} strokeWidth={4} />
              <text x={-10} y={-14} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>≈ 2 millones</text>
              <text x={-10} y={40} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>de dólares (2009)</text>
            </g></g>; })()}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo violín del inicio, ya afinado por el hongo */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Violin T={T} id="vf" x={380} y={960} s={0.75} rot={-4} arco vibra={1} hifas={1} oro={kprog(T, K.C + 0.4, K.C + 1.6)} />)}
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 2.6} until={K.Ci - 0.3} valor={9} dur={1.6} sufijo=" meses" etiqueta="con hongos" x={800} y={1010} tam={110} color={KC.mint} />
      <Etq T={T} at={K.G + 3.4} until={K.Ci - 0.3} x={620} y={1160} texto="tratada con hongos" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Ci + 1.3} until={K.Ma - 0.3} valor={113} dur={1.2} etiqueta="personas" x={340} y={600} tam={150} color={KC.gold2} />
      <Chip T={T} at={K.Ci + 2.0} until={K.Ma - 0.3} texto="creyeron que era el Stradivarius" x={540} y={840} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Ci + 0.6} until={K.Ma - 0.3} x={60} y={1148} texto="más de 180 asistentes · cada círculo, una persona" tam={22} color={KC.ink} />
      <Etq T={T} at={K.Ma + 0.4} until={K.Ma + 2.0} x={130} y={1010} texto="tapa · pícea" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ma + 0.6} until={K.Ma + 2.0} x={130} y={1055} texto="Picea abies" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ma + 0.9} until={K.Ma + 2.0} x={600} y={1010} texto="fondo · arce" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ma + 1.1} until={K.Ma + 2.0} x={600} y={1055} texto="Acer pseudoplatanus" it tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ho + 0.2} until={K.Ho + 2.5} anio="EMPA" quien="St. Gallen, Suiza" revista="Francis W. M. R. Schwarze" x={380} y={720} />
      <Chip T={T} at={K.Ho + 2.4} until={K.Ad - 0.2} texto="en el laboratorio · 2008–2014" x={380} y={470} tam={30} borde={KC.cyan} mono />
      <Chip T={T} at={K.Ho + 3.0} until={K.Ad - 0.2} texto="hongos que pudren madera" x={380} y={555} tam={32} borde={KC.paper} />
      <Etq T={T} at={K.Ho + 4.2} until={K.Ad - 0.2} x={60} y={650} texto="Physisporinus vitreus" it tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ho + 4.4} until={K.Ad - 0.2} x={590} y={650} texto="→ pícea, en laboratorio" tam={24} color={KC.gold2} />
      <Etq T={T} at={K.Ho + 5.6} until={K.Ad - 0.2} x={60} y={715} texto="Xylaria longipes" it tam={34} color={KC.texto} />
      <Etq T={T} at={K.Ho + 5.8} until={K.Ad - 0.2} x={590} y={715} texto="→ arce, en laboratorio" tam={24} color={KC.gold2} />
      <Chip T={T} at={K.Ad + 0.6} until={K.Li - 0.2} texto="paredes más delgadas" x={420} y={470} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Ad + 0.9} until={K.Li - 0.2} x={60} y={520} texto="hilos del hongo (hifas)" tam={28} color={VC.hifa} />
      <Medidor T={T} at={K.Li + 0.2} until={K.P - 0.2} x={60} y={410} ancho={600} etiqueta="densidad" color={KC.coral}
        valor={(t) => klerp(0.9, 0.62, kprog(t, K.Li + 0.5, K.Li + 1.6, kEase.sale))} texto={(v) => (v < 0.8 ? 'más ligera' : 'antes')} />
      <Medidor T={T} at={K.Li + 1.4} until={K.P - 0.2} x={60} y={520} ancho={600} etiqueta="velocidad del sonido" color={KC.cyan}
        valor={(t) => klerp(0.9, 0.86, kprog(t, K.Li + 1.8, K.Li + 2.8))} texto={() => 'casi igual'} />
      <Etq T={T} at={K.Li + 0.6} until={K.P - 0.2} x={60} y={620} texto="medidores esquemáticos, sin escala" tam={20} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Ra + 0.2} until={K.Ra + 2.4} anio="2008" quien="Empa · Schwarze y colegas" revista="New Phytologist, 2008" x={540} y={560} />
      <Etq T={T} at={K.Ra + 2.6} until={K.Hi - 0.2} x={600} y={830} texto="radiar sonido" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ra + 3.4} until={K.Hi - 0.2} texto="como madera de clima frío" x={540} y={480} tam={36} borde={KC.blue} />
      <Chip T={T} at={K.Hi + 0.1} until={K.Pb - 0.2} texto="HIPÓTESIS" x={540} y={440} tam={52} borde={KC.yellow} />
      <Etq T={T} at={K.Hi + 0.8} until={K.Pb - 0.2} x={600} y={620} texto="anillos angostos:" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Hi + 0.8} until={K.Pb - 0.2} x={600} y={665} texto="creció lento, en frío" tam={28} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Pb + 0.2} until={K.Pb + 3.2} anio="2009" quien="Osnabrück, Alemania" revista="congreso de cuidado de árboles" x={360} y={520} />
      <Chip T={T} at={K.Pb + 3.5} until={K.Vo - 0.2} texto="uno: su Stradivarius de 1711" x={380} y={480} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Pb + 3.3} until={K.Vo - 0.2} x={60} y={560} texto="el público no ve cuál suena" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Vo + 0.2} until={K.Oj - 0.2} x={60} y={430} texto="votos por el mejor sonido" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Vo + 0.5} until={K.Oj - 0.2} x={60} y={480} texto="de más de 180 asistentes" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Oj + 0.1} until={K.Pc - 0.2} texto="OJO" x={300} y={500} tam={90} borde={KC.yellow} />
      <Chip T={T} at={K.Oj + 0.8} until={K.Pc - 0.2} texto="✓ votación del público en un congreso" x={540} y={790} tam={32} borde={KC.leaf} />
      <MitoTachado T={T} at={K.Oj + 1.3} tacharEn={K.Oj + 1.9} until={K.Pc - 0.2} texto="experimento controlado" x={540} y={940} tam={46} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="madera afinada por hongos" x={380} y={360} tam={34} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ci} texto="10 cm" largo={128} />
      <BarraEscala T={T} at={K.Ci} until={K.Ma} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ma} until={K.Ma + 2.0} texto="5 cm" largo={42} />
      <BarraEscala T={T} at={K.Ma + 2.0} until={K.Ho} texto="≈ 30 µm (una célula)" largo={64} />
      <BarraEscala T={T} at={K.Ho} until={K.Li} texto="≈ 30 µm (una célula)" largo={84} />
      <BarraEscala T={T} at={K.Li} until={K.P} texto="5 cm" largo={56} />
      <BarraEscala T={T} at={K.P} until={K.Ra} texto="10 cm" largo={102} />
      <BarraEscala T={T} at={K.Ra} until={K.Hi} texto="5 cm" largo={45} />
      <BarraEscala T={T} at={K.Hi} until={K.Pb} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Pb} until={K.Vo} texto="10 cm" largo={41} />
      <BarraEscala T={T} at={K.Vo} until={K.Oj} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Pc} until={K.C} texto="10 cm" largo={85} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={128} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ci - 0.1} texto="No es un Stradivarius: es *madera con hongos.*" />
      <Subtitulo T={T} idx={1} at={K.Ci + 0.1} until={K.Ma - 0.1} texto="*113 personas* lo confundieron." />
      <Subtitulo T={T} idx={2} at={K.Ma + 0.1} until={K.Ho - 0.1} texto="Pícea y arce: por dentro, *un panal.*" />
      <Subtitulo T={T} idx={3} at={K.Ho + 0.1} until={K.Ad - 0.1} texto="Dos hongos que *pudren madera.*" />
      <Subtitulo T={T} idx={4} at={K.Ad + 0.1} until={K.Li - 0.1} texto="Adelgazan las *paredes.*" />
      <Subtitulo T={T} idx={5} at={K.Li + 0.1} until={K.P - 0.1} texto="Más ligera; el sonido, *casi igual de rápido.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ra - 0.1} texto="¿Y eso *qué cambia?*" />
      <Subtitulo T={T} idx={7} at={K.Ra + 0.1} until={K.Hi - 0.1} texto="Para radiar sonido: de pobre *a buena.*" />
      <Subtitulo T={T} idx={8} at={K.Hi + 0.1} until={K.Pb - 0.1} texto="Hipótesis: *así era la de Stradivari.*" />
      <Subtitulo T={T} idx={9} at={K.Pb + 0.1} until={K.Vo - 0.1} texto="Cinco violines *tras una cortina.*" />
      <Subtitulo T={T} idx={10} at={K.Vo + 0.1} until={K.Oj - 0.1} texto="*90* prefirieron el de hongos." />
      <Subtitulo T={T} idx={11} at={K.Oj + 0.1} until={K.Pc - 0.1} texto="Ojo: *no fue un experimento controlado.*" />
      <Subtitulo T={T} idx={12} at={K.Pc + 0.1} until={K.C - 0.1} texto="Valía unos *2 millones de dólares.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Madera *afinada por hongos.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.Ci - 0.5, 'avatar_11_sorprendido', 'gancho'],
        [K.Ci + 0.6, K.Ci + 4.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ho + 0.5, K.Ho + 4.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Li + 0.4, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Ra - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pb + 0.4, K.Pb + 5.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Oj + 0.2, K.Oj + 3.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pc + 0.15, K.C - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [K.C + 0.25, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="146" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ViolinApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ViolinShot /></CompositionStage></div>;
}
window.ViolinApp = ViolinApp;
