// Shot Fungi Mati #149 · Ese sombrero no es de fieltro: es un hongo que te daba fuego — NARRADO (N1 Por dentro + N5: el estudio de Ötzi como escena).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const YC = { ama:'#b8834f', ama2:'#d6a874', ama3:'#8a5a2e', trama:'#d9a35b', tubos:'#b58a5c', tubos2:'#9c7448', costra:'#3b3631',
  gris1:'#8d8a86', gris2:'#6f6b67', gris3:'#a7a39d', margen:'#c8935a', corteza:'#f2efe8', lenti:'#2a2622', cuero:'#7a4a26', cuero2:'#5a3418',
  yesca:'#1f1a17', pirita:'#d9b13b', pedernal:'#8a7d6b', piel:'#f1b48f', piel2:'#d98f6b', sangre:'#d8262f', hielo:'#dff6ff', roca:'#6d7a88' };

// Subtítulo con *resaltado* y _cursiva_ (especies en cursiva también en subtítulos).
function SubK({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:45, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}

// Fibras cortas (textura afelpada de la trama / del amadou). Puntos fijos por semilla.
function Fibras({ seed = 3, n = 80, x0, y0, w, h, color = YC.ama2, ancho = 3, op = 0.7, largo = 22 }) {
  const g = krng(seed);
  return <g opacity={op}>{Array.from({ length: n }, (_, i) => { const x = x0 + g() * w, y = y0 + g() * h, a = g() * Math.PI, l = largo * (0.5 + g());
    return <path key={i} d={`M ${x.toFixed(1)} ${y.toFixed(1)} q ${(Math.cos(a) * l / 2 + 6).toFixed(1)} ${(Math.sin(a) * l / 2 - 5).toFixed(1)} ${(Math.cos(a) * l).toFixed(1)} ${(Math.sin(a) * l).toFixed(1)}`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" />; })}</g>;
}

// Sombrero de amadou (trama de Fomes estirada): copa con hendidura, ala ancha, cinta. Base del ala en (x, y).
const COPA = 'M -190 -14 C -196 -120 -186 -200 -168 -262 Q -84 -306 0 -272 Q 84 -306 168 -262 C 186 -200 196 -120 190 -14 Z';
function Sombrero({ T = 0, x, y, s = 1, rot = 0, brasa = 0, id = 'a' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs>
      <clipPath id={`sbCopa${id}`}><path d={COPA} /></clipPath>
      <clipPath id={`sbAla${id}`}><ellipse cx={0} cy={0} rx={330} ry={66} /></clipPath>
      <radialGradient id={`sbG${id}`} cx="40%" cy="30%" r="80%"><stop offset="0%" stopColor={YC.ama2} /><stop offset="100%" stopColor={YC.ama} /></radialGradient>
    </defs>
    <ellipse cx={0} cy={14} rx={340} ry={70} fill="rgba(0,0,0,.18)" />
    <ellipse cx={0} cy={0} rx={330} ry={66} fill={`url(#sbG${id})`} stroke={KC.ink} strokeWidth={8} />
    <g clipPath={`url(#sbAla${id})`}><Fibras seed={11} n={70} x0={-330} y0={-66} w={660} h={132} color={YC.ama3} ancho={2.5} op={0.45} largo={18} /></g>
    <path d={COPA} fill={`url(#sbG${id})`} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <g clipPath={`url(#sbCopa${id})`}>
      <Fibras seed={7} n={110} x0={-200} y0={-300} w={400} h={290} color={YC.ama3} ancho={2.5} op={0.45} largo={20} />
      <Fibras seed={8} n={60} x0={-200} y0={-300} w={400} h={290} color="#f0cf9c" ancho={2.5} op={0.5} largo={16} />
      <rect x={-200} y={-74} width={400} height={50} fill={YC.ama3} />
      <path d="M 0 -272 Q -8 -200 0 -150" stroke={YC.ama3} strokeWidth={8} fill="none" opacity=".7" />
      <path d="M -120 -250 Q -150 -150 -150 -80" stroke="#f3d6a8" strokeWidth={14} fill="none" opacity=".35" strokeLinecap="round" />
    </g>
    <path d="M -190 -74 L 190 -74 M -190 -24 L 190 -24" stroke={KC.ink} strokeWidth={4} opacity=".5" />
    {brasa > 0 && <Brasa T={T} x={250} y={-20} r={26 * brasa} />}
  </g>;
}

// Brasa: punto rojo que brilla y respira, con humito.
function Brasa({ T, x, y, r = 30, humo = true }) {
  const p = 0.85 + 0.15 * Math.sin(T * 9) + 0.08 * Math.sin(T * 23);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r * 2.6 * p} fill="rgba(255,120,30,.22)" />
    <circle r={r * 1.6 * p} fill="rgba(255,90,20,.45)" />
    <circle r={r} fill="#ff4a12" />
    <circle r={r * 0.55} fill="#ffd25a" opacity={p} />
    {humo && [0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <circle key={k} cx={Math.sin(u * 6 + k) * 18} cy={-r - u * 160} r={10 + u * 30} fill="rgba(240,240,240,.5)" opacity={(1 - u) * 0.6} />; })}
  </g>;
}

// Chispa con estela: viaja de (x0,y0) a (x1,y1) en arco con p 0..1.
function Chispa({ x0, y0, x1, y1, p, alto = 120, r = 12 }) {
  if (p <= 0 || p >= 1) return null;
  const pos = (q) => [klerp(x0, x1, q), klerp(y0, y1, q) - Math.sin(q * Math.PI) * alto];
  const [x, y] = pos(p);
  const tr = [0.06, 0.12, 0.18].map((d) => pos(Math.max(0, p - d)));
  return <g>
    {tr.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={r * (0.7 - i * 0.18)} fill="#ffb02e" opacity={0.6 - i * 0.18} />)}
    <circle cx={x} cy={y} r={r * 2.4} fill="rgba(255,210,90,.35)" />
    <path d={`M ${x - r * 1.8} ${y} L ${x + r * 1.8} ${y} M ${x} ${y - r * 1.8} L ${x} ${y + r * 1.8}`} stroke="#fff6c0" strokeWidth={4} strokeLinecap="round" />
    <circle cx={x} cy={y} r={r * 0.8} fill="#fffbe0" />
  </g>;
}
// Racimo de chispas que salen de un punto (golpe de pedernal).
function Chisporroteo({ T, at, x, y, n = 9, seed = 4 }) {
  const u = kprog(T, at, at + 0.55); if (u <= 0 || u >= 1) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = -Math.PI * (0.1 + g() * 0.8), v = 120 + g() * 160;
    const px = x + Math.cos(a) * v * u, py = y + Math.sin(a) * v * u + 160 * u * u;
    return <g key={i} opacity={1 - u}><line x1={px} y1={py} x2={px - Math.cos(a) * 26} y2={py - Math.sin(a) * 26} stroke="#ffd25a" strokeWidth={5} strokeLinecap="round" /><circle cx={px} cy={py} r={5} fill="#fffbe0" /></g>; })}
  </g>;
}

// Tronco de abedul vertical (corteza blanca con marcas negras).
function Abedul({ x, y0, y1, w = 190 }) {
  const g = krng(5);
  return <g>
    <rect x={x} y={y0} width={w} height={y1 - y0} fill={YC.corteza} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => { const yy = y0 + 30 + g() * (y1 - y0 - 60), xx = x + g() * (w - 70), l = 30 + g() * 60;
      return <path key={i} d={`M ${xx} ${yy} q ${l / 2} -6 ${l} 0`} stroke={YC.lenti} strokeWidth={7 + g() * 6} fill="none" strokeLinecap="round" />; })}
    <rect x={x + w - 34} y={y0} width={26} height={y1 - y0} fill="rgba(0,0,0,.08)" />
  </g>;
}

// Hongo yesquero (Fomes fomentarius) de perfil, pegado al tronco en x=0: forma de casco / pezuña de caballo.
const HOOF = 'M 0 -170 C 140 -186 320 -142 420 -52 Q 476 -2 454 50 Q 432 70 380 72 L 0 100 Z';
function Yesquero({ x, y, s = 1, crece = 1, corte = 0, T = 0, id = 'h' }) {
  if (crece <= 0) return null;
  const c = kEase.sale(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * c} ${s * (0.4 + 0.6 * c)})`}>
    <defs>
      <clipPath id={`hf${id}`}><path d={HOOF} /></clipPath>
      <linearGradient id={`hg${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={YC.gris3} /><stop offset="60%" stopColor={YC.gris1} /><stop offset="100%" stopColor={YC.gris2} /></linearGradient>
    </defs>
    {corte < 1 && <g opacity={1 - corte}>
      <path d={HOOF} fill={`url(#hg${id})`} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <g clipPath={`url(#hf${id})`}>
        {[1, 2, 3, 4].map((k) => <path key={k} d={`M 0 ${-170 + k * 40} C 140 ${-182 + k * 42} ${320 - k * 16} ${-136 + k * 36} ${420 - k * 10} ${-48 + k * 26}`} stroke={YC.gris2} strokeWidth={10} fill="none" opacity=".75" />)}
        {[1, 2, 3, 4].map((k) => <path key={'b' + k} d={`M 0 ${-158 + k * 40} C 140 ${-170 + k * 42} ${320 - k * 16} ${-124 + k * 36} ${420 - k * 10} ${-36 + k * 26}`} stroke="#c9c5bf" strokeWidth={4} fill="none" opacity=".6" />)}
        <path d="M 330 72 Q 430 66 452 40 Q 466 0 430 -40" stroke={YC.margen} strokeWidth={26} fill="none" />
        <path d="M 0 96 L 380 70" stroke="#c9a77c" strokeWidth={10} />
      </g>
      <path d={HOOF} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>}
    {corte > 0 && <g opacity={corte}><CorteYesquero id={id} T={T} /></g>}
  </g>;
}
// El mismo hongo, cortado a la mitad: costra · trama · capas de tubos (bandas anuales) · poros abajo.
const TRAMA_D = 'M 0 -156 C 140 -170 316 -128 410 -46 Q 430 -24 420 -6 C 300 -40 150 -40 0 -18 Z';
function CorteYesquero({ id = 'h', T = 0, brillo = 0 }) {
  return <g>
    <path d={HOOF} fill={YC.tubos} />
    <g clipPath={`url(#hf${id})`}>
      {[0, 1, 2, 3, 4, 5].map((j) => <path key={j} d={`M 0 ${96 - j * 20} L ${400 + j * 6} ${66 - j * 16}`} stroke={YC.tubos2} strokeWidth={4} />)}
      {Array.from({ length: 40 }, (_, i) => { const xx = 10 + i * 11; return <line key={i} x1={xx} y1={-6 + (xx / 420) * 6} x2={xx} y2={98 - (xx / 420) * 30} stroke="#8a6440" strokeWidth={1.6} opacity=".55" />; })}
      <path d={TRAMA_D} fill={YC.trama} />
      <g clipPath={`url(#tr${id})`}><Fibras seed={21} n={120} x0={0} y0={-170} w={430} h={170} color="#f3cf8f" ancho={2.2} op={0.8} largo={14} />
        <Fibras seed={22} n={70} x0={0} y0={-170} w={430} h={170} color="#a8743c" ancho={2} op={0.6} largo={12} /></g>
      {brillo > 0 && <path d={TRAMA_D} fill="#ffe7a0" opacity={brillo * (0.25 + 0.15 * Math.sin(T * 6))} />}
    </g>
    <defs><clipPath id={`tr${id}`}><path d={TRAMA_D} /></clipPath></defs>
    <path d="M 0 -170 C 140 -186 320 -142 420 -52 Q 476 -2 454 50" fill="none" stroke={YC.costra} strokeWidth={22} strokeLinecap="round" />
    {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={20 + i * 24} cy={98 - i * 1.7} r={4} fill="#5a3e22" />)}
    <path d={HOOF} fill="none" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}

// Maraña de hifas (fondo oscuro). Hilos ramificados que se entrelazan y se mecen.
const HIFAS = (() => { const g = krng(77); return Array.from({ length: 58 }, (_, i) => {
  let x = g() * 1180 - 50, y = 380 + g() * 880, a = g() * Math.PI * 2; const pts = [[x, y]];
  for (let k = 0; k < 9; k++) { a += (g() - 0.5) * 1.1; x += Math.cos(a) * 70; y += Math.sin(a) * 70; pts.push([x, y]); }
  return { pts, w: g() < 0.3 ? 9 : 3 + g() * 3, c: g() < 0.5 ? '#f3dfae' : (g() < 0.5 ? '#e7b863' : '#fff4d6'), f: g() * 6 }; }); })();
function Maraña({ T, p = 1 }) {
  return <g>{HIFAS.map((h, i) => { const n = Math.max(2, Math.ceil(h.pts.length * kclamp(p * 1.3 - i / 120, 0, 1))); if (n < 2) return null;
    const q = h.pts.slice(0, n).map(([x, y], k) => [x + Math.sin(T * 0.9 + h.f + k) * 6, y + Math.cos(T * 0.7 + h.f + k * 0.5) * 6]);
    let d = `M ${q[0][0].toFixed(1)} ${q[0][1].toFixed(1)}`; for (let k = 1; k < q.length; k++) { const mx = (q[k - 1][0] + q[k][0]) / 2, my = (q[k - 1][1] + q[k][1]) / 2; d += ` Q ${q[k - 1][0].toFixed(1)} ${q[k - 1][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`; }
    return <g key={i}><path d={d} stroke="rgba(0,0,0,.5)" strokeWidth={h.w + 4} fill="none" strokeLinecap="round" /><path d={d} stroke={h.c} strokeWidth={h.w} fill="none" strokeLinecap="round" opacity=".92" /></g>; })}</g>;
}

// Olla con agua hirviendo.
function Olla({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 -150 L 230 -150 L 205 90 Q 200 120 170 120 L -170 120 Q -200 120 -205 90 Z" fill="#59626c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-250} y={-176} width={500} height={34} rx={14} fill="#7b8590" stroke={KC.ink} strokeWidth={8} />
    <rect x={-300} y={-140} width={60} height={26} rx={10} fill="#3c434b" stroke={KC.ink} strokeWidth={6} /><rect x={240} y={-140} width={60} height={26} rx={10} fill="#3c434b" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-150} rx={228} ry={26} fill="#7fd0ea" stroke={KC.ink} strokeWidth={5} />
    <g transform={`rotate(${Math.sin(T * 3) * 4})`}><rect x={-120} y={-178} width={240} height={46} rx={18} fill={YC.trama} stroke={KC.ink} strokeWidth={6} /><Fibras seed={31} n={30} x0={-110} y0={-172} w={220} h={36} color="#a8743c" ancho={2} op={0.7} largo={12} /></g>
    {Array.from({ length: 9 }, (_, i) => { const u = (T * 1.4 + i / 9) % 1; return <circle key={i} cx={-190 + i * 47} cy={-150 - u * 26} r={6 + u * 10} fill="none" stroke="#fff" strokeWidth={4} opacity={1 - u} />; })}
    {[-120, 0, 120].map((dx, k) => { const u = (T * 0.5 + k / 3) % 1; return <path key={k} d={`M ${dx} ${-200 - u * 160} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="rgba(255,255,255,.7)" strokeWidth={9} fill="none" opacity={(1 - u) * 0.8} strokeLinecap="round" />; })}
  </g>;
}
// Mazo de madera.
function Mazo({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-14} y={-20} width={28} height={300} rx={12} fill="#c08a4e" stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-110} width={180} height={100} rx={22} fill="#a46a32" stroke={KC.ink} strokeWidth={8} />
    <path d="M -70 -90 L 70 -90" stroke="#d29a5c" strokeWidth={8} opacity=".7" />
  </g>;
}
// Pedernal (sílex) tallado y nódulo de pirita.
function Pedernal({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 30 L -60 -50 L 10 -70 L 80 -40 L 96 20 L 40 52 L -40 56 Z" fill={YC.pedernal} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 -50 L -20 0 L 10 -70 M -20 0 L 40 52 M -20 0 L 80 -40 M -20 0 L -90 30" stroke="#6b604f" strokeWidth={4} fill="none" />
    <path d="M -50 -40 L 0 -58" stroke="#c9bda8" strokeWidth={6} strokeLinecap="round" />
  </g>;
}
function Pirita({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 20 L -50 -50 L 20 -66 L 74 -30 L 70 34 L 10 60 L -50 52 Z" fill={YC.pirita} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -50 -50 L -10 -10 L 20 -66 M -10 -10 L 70 34 M -10 -10 L -50 52" stroke="#a8862a" strokeWidth={4} fill="none" />
    <rect x={10} y={-50} width={26} height={26} fill="#f6e08a" opacity={0.5 + 0.4 * Math.sin(T * 4)} transform="rotate(12 23 -37)" />
  </g>;
}
// Trozo de yesca (negra, fibrosa) con puntitos de pirita.
function Yesca({ x, y, s = 1, T = 0, pirita = 0, seed = 41 }) {
  const g = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 10 Q -160 -60 -90 -80 Q -10 -110 70 -80 Q 160 -60 150 10 Q 150 70 60 80 Q -40 96 -110 70 Q -150 50 -150 10 Z" fill={YC.yesca} stroke={KC.ink} strokeWidth={7} />
    <Fibras seed={seed} n={50} x0={-140} y0={-90} w={280} h={160} color="#4a3d33" ancho={3} op={0.9} largo={20} />
    {pirita > 0 && Array.from({ length: 14 }, (_, i) => { const px = -110 + g() * 220, py = -60 + g() * 110; const tw = 0.5 + 0.5 * Math.sin(T * 7 + i);
      return <g key={i} opacity={kclamp(pirita * 2 - i / 14, 0, 1)}><rect x={px - 5} y={py - 5} width={10} height={10} fill={YC.pirita} transform={`rotate(${i * 23} ${px} ${py})`} /><circle cx={px} cy={py} r={9 * tw} fill="rgba(255,230,120,.35)" /></g>; })}
  </g>;
}
// Bolsa de cuero del cinturón.
function Bolsa({ x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-150} width={660} height={56} fill={YC.cuero2} stroke={KC.ink} strokeWidth={7} />
    <path d="M -170 -110 L 170 -110 L 160 120 Q 150 160 110 160 L -110 160 Q -150 160 -160 120 Z" fill={YC.cuero} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 -90 L 150 -90 L 140 130 L -140 130 Z" fill="none" stroke="#c99a68" strokeWidth={4} strokeDasharray="12 10" />
    <g transform={`translate(0 -110) scale(1 ${1 - 1.7 * abre})`}>
      <path d="M -175 0 L 175 0 L 160 90 Q 0 130 -160 90 Z" fill="#8c5a30" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <circle cx={0} cy={80} r={14} fill="#e2c49a" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Ötzi esquemático: silueta plana (no realista) con capa, palo y armazón de la mochila.
function OtziSilueta({ x, y, s = 1, T = 0 }) {
  const paso = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-95} y1={-250} x2={-120} y2={0} stroke="#6b4a2a" strokeWidth={12} strokeLinecap="round" />
    <path d={`M -28 -100 L ${-36 + paso} -4 M 28 -100 L ${36 - paso} -4`} stroke="#4a3220" strokeWidth={30} strokeLinecap="round" />
    <path d={`M ${-56 + paso} 0 L ${-14 + paso} 0 M ${16 - paso} 0 L ${58 - paso} 0`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d="M -60 -230 Q 0 -250 60 -230 L 78 -90 Q 0 -76 -78 -90 Z" fill="#8a6440" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-44, -16, 12, 40].map((dx) => <path key={dx} d={`M ${dx} -236 L ${dx * 1.25} -86`} stroke="#5a3e22" strokeWidth={9} />)}
    <rect x={-74} y={-128} width={148} height={18} fill={YC.cuero2} stroke={KC.ink} strokeWidth={4} />
    <path d="M -58 -220 Q -100 -170 -95 -140" stroke="#8a6440" strokeWidth={24} fill="none" strokeLinecap="round" />
    <path d="M 58 -220 Q 90 -180 80 -130" stroke="#8a6440" strokeWidth={24} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={-280} r={40} fill={YC.piel2} stroke={KC.ink} strokeWidth={6} />
    <path d="M -44 -284 Q -46 -340 0 -342 Q 46 -340 44 -284 Z" fill="#4a3220" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Alpes: montañas con nieve y glaciar.
function Alpes({ T }) {
  return <g>
    <path d="M -40 1000 L 180 560 L 300 720 L 470 420 L 640 700 L 780 520 L 1120 1000 Z" fill={YC.roca} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 180 560 L 230 660 L 200 650 L 160 600 Z M 470 420 L 540 540 L 500 530 L 470 560 L 430 500 Z M 780 520 L 840 600 L 800 595 L 750 560 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -40 1000 Q 300 880 540 900 Q 800 920 1120 860 L 1120 1240 L -40 1240 Z" fill={YC.hielo} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${120 + k * 240} ${980 + (k % 2) * 40} l 60 30 l 50 -20`} stroke="#9fd3ea" strokeWidth={6} fill="none" />)}
    {Array.from({ length: 30 }, (_, i) => { const g = krng(i + 3); const xx = (g() * 1080 + T * (40 + g() * 40)) % 1080, yy = (g() * 900 + 300 + T * (60 + g() * 50)) % 900 + 300; return <circle key={i} cx={xx} cy={yy} r={3 + g() * 5} fill="#fff" opacity=".8" />; })}
  </g>;
}
// Trozos del políporo del abedul (Fomitopsis betulina) ensartados en una tira de piel.
function TrozosAbedul({ T, x, y, p = 1 }) {
  const a = Math.sin(T * 1.6) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${a})`} opacity={p}>
    <path d="M 0 0 Q 10 260 0 520" stroke={YC.cuero} strokeWidth={14} fill="none" strokeLinecap="round" />
    {[[0, 200, 1], [0, 400, 0.85]].map(([dx, dy, k], i) => <g key={i} transform={`translate(${dx} ${dy}) scale(${k}) rotate(${i ? 12 : -8})`}>
      <path d="M -110 -20 Q -120 -80 -40 -90 Q 60 -100 110 -50 Q 140 0 100 50 Q 40 90 -40 80 Q -110 60 -110 -20 Z" fill="#d9b98a" stroke={KC.ink} strokeWidth={7} />
      <path d="M -80 30 Q 0 60 90 20" stroke="#b8956a" strokeWidth={6} fill="none" />
      <path d="M -60 -60 Q 0 -76 60 -60" stroke="#b49a72" strokeWidth={5} fill="none" opacity=".7" />
      <circle cx={0} cy={0} r={11} fill={YC.cuero2} />
    </g>)}
  </g>;
}
// Dedo con una cortadita (gota que crece) y el cuadrito de trama que la tapa.
function Dedo({ T, x, y, gota = 0, tapa = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-420} y={-90} width={780} height={180} rx={90} fill={YC.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M 250 -70 Q 340 -60 345 0 Q 340 60 250 70 Q 270 0 250 -70 Z" fill="#f8d4c0" stroke={KC.ink} strokeWidth={5} />
    {[-300, -140].map((dx) => <path key={dx} d={`M ${dx} -60 Q ${dx + 12} 0 ${dx} 60`} stroke={YC.piel2} strokeWidth={5} fill="none" />)}
    <path d="M -40 -30 L 30 -24" stroke={YC.sangre} strokeWidth={7} strokeLinecap="round" />
    {gota > 0 && <path d={`M 0 -30 Q ${-34 * gota} ${-30 - 50 * gota} 0 ${-30 - 90 * gota} Q ${34 * gota} ${-30 - 50 * gota} 0 -30 Z`} fill={YC.sangre} stroke={KC.ink} strokeWidth={4} />}
    {tapa > 0 && <g transform={`translate(0 ${-30 - (1 - tapa) * 420})`}>
      <rect x={-90} y={-60} width={180} height={120} rx={14} fill={YC.trama} stroke={KC.ink} strokeWidth={6} />
      <Fibras seed={51} n={30} x0={-84} y0={-54} w={168} h={108} color="#a8743c" ancho={2.5} op={0.7} largo={14} />
    </g>}
  </g>;
}
// Mapa esquemático de Rumania con Corund (Transilvania).
function MapaRumania({ x, y, s = 1, p = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 20 140 Q 40 60 140 40 Q 220 0 320 30 Q 420 10 470 80 Q 520 120 500 190 Q 520 250 470 290 Q 380 330 280 310 Q 180 330 110 290 Q 30 260 20 200 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 330 50 Q 360 150 300 230 Q 230 270 140 250" stroke="#b98a4e" strokeWidth={16} fill="none" strokeLinecap="round" opacity=".55" />
    {p > 0 && <g transform={`translate(330 150) scale(${kEase.rebote(kclamp(p, 0, 1))})`}>
      <circle r={30 + 6 * Math.sin(T * 5)} fill="rgba(255,59,47,.3)" /><circle r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>}
  </g>;
}
// Lámina de trama que dos manos estiran a lo ancho (se hace más ancha y más delgada). Centro en (x, y).
function Lamina({ T, x, y, estira = 0 }) {
  const e = kEase.suave(kclamp(estira, 0, 1)), w = 300 + 260 * e, h = 200 - 70 * e, ond = Math.sin(T * 3) * 6 * (1 - e);
  return <g transform={`translate(${x} ${y})`}>
    <defs><clipPath id="lamClip"><path d={`M ${-w / 2} ${-h / 2} Q 0 ${-h / 2 - 16 + ond} ${w / 2} ${-h / 2} L ${w / 2} ${h / 2} Q 0 ${h / 2 + 16 - ond} ${-w / 2} ${h / 2} Z`} /></clipPath></defs>
    <path d={`M ${-w / 2} ${-h / 2} Q 0 ${-h / 2 - 16 + ond} ${w / 2} ${-h / 2} L ${w / 2} ${h / 2} Q 0 ${h / 2 + 16 - ond} ${-w / 2} ${h / 2} Z`} fill={YC.trama} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <g clipPath="url(#lamClip)"><g transform={`scale(${w / 300} ${h / 200})`}>
      <Fibras seed={61} n={70} x0={-150} y0={-100} w={300} h={200} color="#a8743c" ancho={2.5} op={0.55} largo={16} />
      <Fibras seed={62} n={40} x0={-150} y0={-100} w={300} h={200} color="#f3cf8f" ancho={2.5} op={0.6} largo={14} /></g></g>
    {[-1, 1].map((sg) => <g key={sg} transform={`translate(${sg * (w / 2 + 10)} 0) rotate(${-sg * 90})`}>
      <path d="M -50 -10 Q -56 46 0 60 Q 56 46 50 -10 Q 0 -40 -50 -10 Z" fill={YC.piel} stroke={KC.ink} strokeWidth={6} />
      <path d="M -30 -24 L -30 -60 M -10 -30 L -10 -70 M 10 -30 L 10 -70 M 30 -24 L 30 -60" stroke={YC.piel} strokeWidth={18} strokeLinecap="round" />
      <path d="M -30 -24 L -30 -60 M -10 -30 L -10 -70 M 10 -30 L 10 -70 M 30 -24 L 30 -60" stroke={KC.ink} strokeWidth={3} strokeLinecap="round" opacity=".35" />
      <rect x={-34} y={56} width={68} height={140} rx={22} fill="#3c6fd6" stroke={KC.ink} strokeWidth={6} />
    </g>)}
  </g>;
}
// Pezuña de caballo (contorno punteado) para comparar la forma.
function Pezuna({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -120 100 Q -140 -60 -60 -120 Q 0 -150 60 -120 Q 140 -60 120 100 Q 60 120 0 100 Q -60 120 -120 100 Z" fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={7} strokeDasharray="18 12" />
    <path d="M -70 100 Q -80 0 0 -30 Q 80 0 70 100" fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" />
  </g>;
}

function YescaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Ca: CUES.Capas, M: CUES.Micro, Ch: CUES.Chispa, P: CUES.Pregunta, O: CUES.Otzi, Pi: CUES.Pirita, A: CUES.Abedul, S: CUES.Sangre, Co: CUES.Corund, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // sombrero que cae girando y aterriza en el cuadro 0.4
  const caer = kprog(T, K.G - 0.2, K.G + 0.4, kEase.sale);
  const rebote = Math.exp(-Math.max(0, T - K.G - 0.4) * 7) * Math.sin(Math.max(0, T - K.G - 0.4) * 18) * 5;
  // chispa: golpes, chispa que cae, brasa
  const ch = (d) => K.Ch + d;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el sombrero */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sombrero T={T} id="g" x={400} y={klerp(-300, 1060, caer) + rebote} rot={klerp(-40, 0, caer) + rebote * 0.4} s={0.95} />
          <Chispa x0={1150} y0={420} x1={640} y1={1040} p={kprog(T, K.G + 3.0, K.G + 3.8)} alto={-80} r={14} />
        </>)}
      </Escena>
      {/* 1 · el hongo yesquero en el abedul */}
      <Escena T={T} a={K.H} b={K.Ca} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Abedul x={60} y0={300} y1={1300} w={200} />
          <Yesquero id="h1" T={T} x={260} y={860} s={1.25} crece={kprog(T, K.H, K.H + 1.4)} />
          <Pezuna x={600} y={840} s={1.4} o={kprog(T, K.H + 2.3, K.H + 2.7) * (1 - kprog(T, K.H + 4.3, K.H + 4.8))} />
        </>)}
      </Escena>
      {/* 2 · cortado a la mitad: costra · trama · tubos */}
      <Escena T={T} a={K.Ca} b={K.M} zoom={0.12} origen="45% 48%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Abedul x={-120} y0={300} y1={1300} w={200} />
          <g transform="translate(80 900) scale(1.75)">
            <defs><clipPath id="hfc"><path d={HOOF} /></clipPath></defs>
            {kprog(T, K.Ca, K.Ca + 0.6) < 1 ? <g opacity={1 - kprog(T, K.Ca + 0.2, K.Ca + 0.6)}><Yesquero id="h2" T={T} x={0} y={0} /></g> : null}
            <g opacity={kprog(T, K.Ca + 0.2, K.Ca + 0.6)}><CorteYesquero id="c" T={T} brillo={kprog(T, K.Ca + 2.8, K.Ca + 3.4)} /></g>
            <defs><clipPath id="hfc2"><path d={HOOF} /></clipPath></defs>
          </g>
          {/* cuchillo que corta */}
          {T < K.Ca + 0.8 && <g transform={`translate(${klerp(980, 120, kprog(T, K.Ca, K.Ca + 0.6, kEase.suave))} 900) rotate(-8)`} opacity={1 - kprog(T, K.Ca + 0.6, K.Ca + 0.8)}>
            <rect x={-10} y={-24} width={240} height={48} rx={10} fill="#5a3418" stroke={KC.ink} strokeWidth={6} />
            <path d="M -10 -22 L -330 -6 L -10 24 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={6} /></g>}
        </>)}
      </Escena>
      {/* 3 · al microscopio: maraña de hifas (fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.Ch} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<Maraña T={T} p={kprog(T, K.M - 0.3, K.M + 1.6)} />)}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, transparent 520px, ${KC.noche} 780px)`, zIndex:21 }}></div>
      </Escena>
      {/* 4 · se hierve, se golpea, salitre; chispa → brasa */}
      <Escena T={T} a={K.Ch} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <g opacity={1 - kprog(T, ch(1.4), ch(1.7))}><Olla T={T} x={540} y={980} s={1.1} /></g>
          <g opacity={kprog(T, ch(1.4), ch(1.7)) * (1 - kprog(T, ch(3.2), ch(3.5)))}>
            <rect x={140} y={1040} width={800} height={70} rx={14} fill="#a46a32" stroke={KC.ink} strokeWidth={8} />
            {(() => { const golpes = [1.8, 2.25, 2.7].filter((d) => T > ch(d)).length; const h = 70 - golpes * 14;
              return <g><rect x={300 - golpes * 20} y={1040 - h} width={480 + golpes * 40} height={h} rx={16} fill={YC.trama} stroke={KC.ink} strokeWidth={6} />
                <Fibras seed={71} n={40} x0={310} y0={1040 - h} w={460} h={h} color="#a8743c" ancho={2.5} op={0.6} largo={14} /></g>; })()}
            {(() => { const fase = [1.8, 2.25, 2.7].reduce((a, d) => { const u = (T - ch(d - 0.3)) / 0.3; return u >= 0 && u <= 1.4 ? Math.min(u, 1) - Math.max(0, u - 1) * 2.5 : a; }, 0);
              return <Mazo x={720} y={kclamp(780 + fase * 200, 600, 990)} rot={-20 + fase * 30} />; })()}
            {[0, 1, 2].map((k) => { const u = kprog(T, ch(2.9 + k * 0.1), ch(3.2 + k * 0.1)); return u > 0 && u < 1 ? <circle key={k} cx={420 + k * 90} cy={760 + u * 260} r={14} fill="#e6f4ff" stroke={KC.ink} strokeWidth={4} /> : null; })}
          </g>
          <g opacity={kprog(T, ch(3.2), ch(3.5))}>
            <rect x={200} y={1000} width={520} height={70} rx={16} fill={YC.trama} stroke={KC.ink} strokeWidth={6} />
            <Fibras seed={72} n={36} x0={210} y0={1004} w={500} h={60} color="#a8743c" ancho={2.5} op={0.6} largo={14} />
            <Pedernal x={klerp(820, 760, kprog(T, ch(3.4), ch(3.7), kEase.rebote))} y={760} rot={-20} s={1.4} />
            <Pirita x={600} y={830} s={1.2} T={T} />
            <Chisporroteo T={T} at={ch(3.7)} x={680} y={790} seed={9} />
            <Chispa x0={680} y0={790} x1={420} y1={1000} p={kprog(T, ch(3.75), ch(4.2))} alto={90} />
            {T > ch(4.2) && <Brasa T={T} x={420} y={1000} r={30 * kprog(T, ch(4.2), ch(4.8), kEase.sale) + 4} />}
          </g>
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿desde cuándo? */}
      <Escena T={T} a={K.P} b={K.O} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Yesca x={300} y={1080} s={1.2} T={T} /><Brasa T={T} x={330} y={1040} r={34} /><Interrogacion T={T} x={300} y={820} tam={380} /></>)}
      </Escena>
      {/* 6 · el estudio: Ötzi en el glaciar; la bolsa del cinturón con yesca */}
      <Escena T={T} a={K.O} b={K.Pi}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fd4ff, #cdefff)' }}></div>
        {fsvg(<g opacity={1 - kprog(T, K.O + 5.0, K.O + 5.5)}>
          <Alpes T={T} />
          <g transform={`translate(${klerp(-120, 0, kprog(T, K.O, K.O + 1.2, kEase.sale))} 0)`}><OtziSilueta x={300} y={1130} s={1.0} T={T} /></g>
          {T > K.O + 0.8 && <g transform={`translate(780 ${720 - 30 * kEase.rebote(kprog(T, K.O + 0.8, K.O + 1.2))})`}><path d="M 0 0 C -40 -40 -40 -90 0 -90 C 40 -90 40 -40 0 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={5} /><circle cy={-60} r={12} fill="#fff" /></g>}
        </g>)}
        {fsvg(<g opacity={kprog(T, K.O + 5.0, K.O + 5.5)}>
          <Bolsa x={540} y={900} s={1.25} abre={kprog(T, K.O + 6.0, K.O + 6.6, kEase.sale)} />
          {[0, 1, 2].map((k) => { const u = kprog(T, K.O + 6.5 + k * 0.2, K.O + 7.1 + k * 0.2, kEase.sale); return u > 0 ? <Yesca key={k} x={600 + k * 130} y={klerp(820, 690 - (k % 2) * 50, u)} s={0.45 * u} T={T} seed={41 + k} /> : null; })}
        </g>)}
      </Escena>
      {/* 7 · restos de pirita en la yesca; el raspador de pedernal saca chispas */}
      <Escena T={T} a={K.Pi} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.teal} />
        {fsvg(<>
          <Yesca x={360} y={880} s={1.6} T={T} pirita={kprog(T, K.Pi + 0.6, K.Pi + 1.8)} />
          <g transform={`translate(${klerp(1300, 0, kprog(T, K.Pi + 0.4, K.Pi + 1.0, kEase.sale))} 0)`}><circle cx={400} cy={860} r={120} fill="rgba(255,255,255,.12)" stroke={KC.white} strokeWidth={12} /><line x1={485} y1={945} x2={570} y2={1030} stroke={KC.white} strokeWidth={22} strokeLinecap="round" /></g>
          <Pirita x={740} y={1090} s={1.15} T={T} />
          <Pedernal x={klerp(980, 880, kprog(T, K.Pi + 2.7, K.Pi + 3.0, kEase.rebote)) - (T > K.Pi + 3.9 ? 100 * kprog(T, K.Pi + 3.9, K.Pi + 4.1, kEase.rebote) - 100 * kprog(T, K.Pi + 4.1, K.Pi + 4.3) : 0)} y={990} rot={-30} s={1.35} />
          <Chisporroteo T={T} at={K.Pi + 3.0} x={820} y={1060} seed={12} />
          <Chisporroteo T={T} at={K.Pi + 4.1} x={810} y={1060} seed={13} />
        </>)}
      </Escena>
      {/* 8 · los dos trozos del hongo del abedul en tiras de piel */}
      <Escena T={T} a={K.A} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<g transform="translate(380 560) scale(1.15) translate(-380 -560)"><TrozosAbedul T={T} x={380} y={560} p={kprog(T, K.A, K.A + 0.6)} /></g>)}
      </Escena>
      {/* 9 · cirujanos y barberos: detener sangrados pequeños */}
      <Escena T={T} a={K.S} b={K.Co} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Dedo T={T} x={520} y={980} gota={kprog(T, K.S + 0.3, K.S + 1.6) * (1 - 0.3 * kprog(T, K.S + 2.0, K.S + 2.6))} tapa={kprog(T, K.S + 1.8, K.S + 2.5, kEase.sale)} />)}
      </Escena>
      {/* 10 · Corund, Rumania: la trama se estira a mano sobre un molde */}
      <Escena T={T} a={K.Co} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MapaRumania x={70} y={430} s={1.05} p={kprog(T, K.Co + 0.4, K.Co + 0.9)} T={T} />
          <Lamina T={T} x={540} y={1040} estira={kprog(T, K.Co + 1.6, K.Co + 4.2)} />
        </>)}
      </Escena>
      {/* 11 · cierre: el mismo sombrero del inicio, ahora con su brasa y su historia */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Sombrero T={T} id="c" x={400} y={1060} s={0.95} brasa={kprog(T, K.C + 0.4, K.C + 1.0, kEase.rebote)} />
          <g opacity={kprog(T, K.C + 1.0, K.C + 1.5)}>
            <g transform="translate(60 640) scale(.55)"><Yesquero id="hc" x={0} y={0} s={1} /></g>
            <Yesca x={850} y={1110} s={0.5} T={T} seed={44} />
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 1.4} until={K.H - 0.3} texto="fieltro" x={250} y={470} tam={54} />
      <Chip T={T} at={K.G + 1.6} until={K.H - 0.3} texto="es un hongo" x={290} y={590} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.G + 2.6} until={K.H - 0.3} texto="…que daba fuego" x={290} y={700} tam={36} borde={KC.orange} />

      <Etq T={T} at={K.H + 1.0} until={K.Ca - 0.3} x={300} y={1015} texto="hongo yesquero" tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 1.4} until={K.Ca - 0.3} x={300} y={1065} texto="Fomes fomentarius" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.H + 2.4} until={K.Ca - 0.3} texto="forma de pezuña de caballo" x={390} y={420} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.H + 3.6} until={K.Ca - 0.3} x={300} y={1115} texto="en abedules y hayas" tam={30} color={KC.ink} />

      <Chip T={T} at={K.Ca + 0.6} until={K.M - 0.3} texto="POR DENTRO · CORTADO A LA MITAD" x={540} y={420} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ca + 0.9} until={K.M - 0.3} x={560} y={560} texto="costra dura" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.7} until={K.M - 0.3} x={600} y={1110} texto="capas de tubos" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 2.8} until={K.M - 0.3} x={300} y={720} texto="LA TRAMA" tam={46} color={KC.white} />

      <Etq T={T} at={K.M + 0.6} until={K.Ch - 0.3} x={60} y={1060} texto="hifas · los hilos del hongo" tam={32} color={KC.texto} />
      <Chip T={T} at={K.M + 0.2} until={K.Ch - 0.3} texto="AL MICROSCOPIO · LA TRAMA" x={540} y={1150} tam={32} borde={KC.cyan} mono />

      <Chip T={T} at={ch(0.2)} until={ch(1.5)} texto="se hierve" x={260} y={470} tam={40} borde={KC.cyan} />
      <Chip T={T} at={ch(1.6)} until={ch(3.2)} texto="se golpea" x={260} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={ch(2.8)} until={ch(3.3)} texto="a veces: salitre" x={300} y={580} tam={36} borde={KC.white} />
      <Chip T={T} at={ch(3.6)} until={K.P - 0.3} texto="chispa → se queda ardiendo" x={340} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={ch(3.4)} until={K.P - 0.3} texto="pedernal + pirita" x={300} y={580} tam={32} borde={YC.pirita} />

      <TarjetaEstudio T={T} at={K.O + 0.3} until={K.O + 2.6} anio="1991" quien="Ötzi · glaciar de los Alpes" revista="Tisenjoch, Italia (cerca de Austria)" x={540} y={520} />
      <NumeroGigante T={T} at={K.O + 3.3} until={K.O + 5.0} valor={5300} desde={4800} dur={0.6} prefijo="" sufijo=" años" etiqueta="murió hace unos" x={340} y={540} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.O + 5.4} until={K.Pi - 0.3} texto="bolsa del cinturón" x={330} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.O + 7.0} until={K.Pi - 0.3} x={60} y={560} texto="yesca de" tam={32} color={KC.ink} />
      <Etq T={T} at={K.O + 7.0} until={K.Pi - 0.3} x={60} y={610} texto="Fomes fomentarius" it tam={32} color={KC.ink} />

      <Chip T={T} at={K.Pi + 1.0} until={K.A - 0.3} texto="restos de pirita" x={300} y={470} tam={38} borde={YC.pirita} />
      <Etq T={T} at={K.Pi + 2.6} until={K.A - 0.3} x={60} y={660} texto="raspador de pedernal" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Pi + 3.2} until={K.A - 0.3} texto="huellas de sacar chispas" x={330} y={580} tam={32} borde={KC.ink} />

      <Chip T={T} at={K.A + 0.4} until={K.S - 0.3} texto="2 trozos en tiras de piel" x={310} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.4} until={K.S - 0.3} x={560} y={800} texto="políporo del abedul" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 1.4} until={K.S - 0.3} x={560} y={845} texto="Fomitopsis betulina" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.A + 3.0} until={K.S - 0.3} texto="¿medicina? · hipótesis" x={700} y={1130} tam={34} borde={KC.yellow} />

      <Chip T={T} at={K.S + 0.3} until={K.Co - 0.3} texto="cirujanos y barberos" x={320} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.S + 2.2} until={K.Co - 0.3} x={60} y={570} texto="Fungus chirurgorum" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.S + 2.2} until={K.Co - 0.3} x={60} y={615} texto="«hongo de los cirujanos»" tam={26} color={KC.ink} />

      <Etq T={T} at={K.Co + 0.8} until={K.C - 0.3} x={250} y={790} texto="Corund · Transilvania, Rumania" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Co + 2.0} until={K.C - 0.3} texto="estirada a mano" x={300} y={880} tam={34} borde={KC.ink} />

      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="no es fieltro: es yesca" x={330} y={470} tam={38} borde={KC.orange} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={200} />
      <BarraEscala T={T} at={K.H} until={K.Ca} texto="10 cm" largo={190} />
      <BarraEscala T={T} at={K.Ca} until={K.M} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.M} until={K.Ch} texto="20 µm (esquemático)" largo={160} />
      <BarraEscala T={T} at={K.Ch} until={K.P} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.O} until={K.O + 5.0} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.O + 5.0} until={K.Pi} texto="5 cm" largo={120} />
      <BarraEscala T={T} at={K.Pi} until={K.A} texto="2 cm" largo={120} />
      <BarraEscala T={T} at={K.A} until={K.S} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.S} until={K.Co} texto="1 cm" largo={90} />
      <BarraEscala T={T} at={K.Co} until={K.C} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={200} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubK T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es fieltro: *es un hongo.*" />
      <SubK T={T} idx={1} at={K.H + 0.1} until={K.Ca - 0.1} texto="Hongo yesquero: *_Fomes fomentarius._*" />
      <SubK T={T} idx={2} at={K.Ca + 0.1} until={K.M - 0.1} texto="Costra, tubos… y en medio, *la trama.*" />
      <SubK T={T} idx={3} at={K.M + 0.1} until={K.Ch - 0.1} texto="Una maraña de *hifas.*" />
      <SubK T={T} idx={4} at={K.Ch + 0.1} until={K.P - 0.1} texto="Se hierve, se golpea… *y atrapa la chispa.*" />
      <SubK T={T} idx={5} at={K.P + 0.1} until={K.O - 0.1} texto="¿Desde *cuándo?*" />
      <SubK T={T} idx={6} at={K.O + 0.1} until={K.Pi - 0.1} texto="Ötzi, hace *unos 5,300 años,* traía yesca." />
      <SubK T={T} idx={7} at={K.Pi + 0.1} until={K.A - 0.1} texto="Restos de *pirita* y chispas de pedernal." />
      <SubK T={T} idx={8} at={K.A + 0.1} until={K.S - 0.1} texto="Hongo del abedul: *¿medicina?*" />
      <SubK T={T} idx={9} at={K.S + 0.1} until={K.Co - 0.1} texto="Para detener *sangrados pequeños.*" />
      <SubK T={T} idx={10} at={K.Co + 0.1} until={K.C - 0.1} texto="Corund, Rumania: *sombreros de hongo.*" />
      <SubK T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es fieltro: *es la yesca de Ötzi.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.8, K.Ca - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.5, K.Ch - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ch + 2.4, K.P - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.O + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.O + 4.2, K.Pi - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pi + 1.7, K.A - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.A + 0.9, K.S - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.S + 0.9, K.Co - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Co + 0.7, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="149" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function YescaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><YescaShot /></CompositionStage></div>;
}
window.YescaApp = YescaApp;
