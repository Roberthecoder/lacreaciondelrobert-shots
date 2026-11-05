// Shot Fungi Mati #145 · Esa cápsula no es de gelatina: es baba de un hongo — NARRADO (N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PC = { piel:'#f1b48f', piel2:'#d98f6b', concha:'rgba(255,255,255,.55)', tapa:'rgba(255,240,200,.62)', polvo:'#fbf7ee',
  crema:'#efe3c6', negro:'#221c1a', negro2:'#3a302b', baba:'rgba(190,240,255,.42)', glu:'#7fe0ff', oro:'#F4C25A', o2:'#ff3b2f',
  aceite:'#f6c13a', lengua:'#ff8fa8', lengua2:'#e8607e', menta:'rgba(70,230,170,.55)', tierra:'#6b4325', uva:'#7b3fa0', pared:'#f3efe6' };

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

// Cápsula dura de dos piezas, horizontal, centrada en (x, y). largo ≈ 520 px a s = 1. escalera 0..1 = la pared muestra la molécula.
function Capsula({ T = 0, x, y, s = 1, rot = 0, escalera = 0, hongo = 0, id = 'a' }) {
  const L = 260, R = 92, cap = 40; // medio largo, radio, traslape
  const cuerpo = `M ${-L + R} ${-R} L ${cap} ${-R} L ${cap} ${R} L ${-L + R} ${R} A ${R} ${R} 0 0 1 ${-L + R} ${-R} Z`;
  const tapa = `M ${-cap - 30} ${-R - 6} L ${L - R} ${-R - 6} A ${R + 6} ${R + 6} 0 0 1 ${L - R} ${R + 6} L ${-cap - 30} ${R + 6} Z`;
  const g = krng(9);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <defs><clipPath id={`cpC${id}`}><path d={cuerpo} /><path d={tapa} /></clipPath></defs>
    <ellipse cx={0} cy={R + 34} rx={L * 0.9} ry={22} fill="rgba(0,0,0,.18)" />
    <path d={cuerpo} fill={PC.concha} stroke={KC.ink} strokeWidth={8} />
    {/* polvito adentro */}
    <g clipPath={`url(#cpC${id})`}>
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={-L + 30 + g() * (2 * L - 60)} cy={R * 0.1 + g() * R * 0.85} r={6 + g() * 8} fill={PC.polvo} stroke="rgba(0,0,0,.12)" strokeWidth={2} />)}
    </g>
    <path d={tapa} fill={PC.tapa} stroke={KC.ink} strokeWidth={8} />
    {/* brillo */}
    <path d={`M ${-L + R} ${-R * 0.55} L ${L - R} ${-R * 0.6}`} stroke="#fff" strokeWidth={16} strokeLinecap="round" opacity=".7" />
    {escalera > 0 && <g clipPath={`url(#cpC${id})`} opacity={escalera}>
      {Array.from({ length: 4 }, (_, k) => <g key={k} transform={`translate(${-L + 40 + k * 120} ${-40 + (k % 2) * 30}) scale(.32)`}><Trio x={0} y={0} oro={1} /></g>)}
    </g>}
    {hongo > 0 && <g opacity={hongo}>{[[-120, 30], [-60, 52], [20, 20], [110, 46], [170, 18]].map(([cx, cy], i) => <ellipse key={i} cx={cx} cy={cy} rx={9} ry={6} fill={PC.negro} transform={`rotate(${i * 30} ${cx} ${cy})`} />)}</g>}
  </g>;
}

// Mano abierta vista de frente (palma hacia arriba, esquemática). (x, y) = centro de la palma.
function Palma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 260 Q -260 60 -200 -20 L 210 -20 Q 270 60 230 260 Z" fill={PC.piel} stroke={KC.ink} strokeWidth={8} />
    {[-165, -58, 50, 155].map((fx, i) => <rect key={i} x={fx - 46} y={-130 + Math.abs(i - 1.5) * 18} width={92} height={170} rx={46} fill={PC.piel} stroke={KC.ink} strokeWidth={8} />)}
    <path d="M -200 -20 L 210 -20 L 230 120 L -230 120 Z" fill={PC.piel} />
    <path d="M 200 60 Q 330 -20 360 -110 Q 380 -150 340 -160 Q 300 -160 280 -100 Q 250 -30 190 0" fill={PC.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -150 120 Q 0 170 150 110" stroke={PC.piel2} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -120 60 Q 20 90 120 40" stroke={PC.piel2} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}

// Glucosa = hexágono. Trío (maltotriosa) horizontal desde (x, y) con uniones α-1,4. n = cuántas ya llegaron (0..3).
const RH = 36, PASO = 86;
const hexD = (cx, cy, r = RH) => 'M ' + [30, 90, 150, 210, 270, 330].map((a) => { const t = a * Math.PI / 180; return `${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`; }).join(' L ') + ' Z';
function Trio({ x, y, n = 3, oro = 0, brillo = 0 }) {
  const col = mixHex('#7fe0ff', '#F4C25A', oro);
  return <g>
    {n > 1 && <line x1={x + RH} y1={y} x2={x + PASO - RH} y2={y} stroke={KC.texto} strokeWidth={7} />}
    {n > 2 && <line x1={x + PASO + RH} y1={y} x2={x + 2 * PASO - RH} y2={y} stroke={KC.texto} strokeWidth={7} />}
    {[0, 1, 2].slice(0, Math.ceil(n)).map((k) => { const u = kclamp(n - k, 0, 1);
      return <g key={k} transform={`translate(${x + k * PASO} ${y}) scale(${kEase.rebote(u)})`} opacity={u}>
        <path d={hexD(0, 0)} fill={col} stroke={KC.ink} strokeWidth={6} style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${KC.gold})` } : null} />
        <circle r={8} fill={KC.ink} opacity=".35" />
      </g>; })}
  </g>;
}
// Escalera de tríos: el k-ésimo trío baja un escalón (unión α-1,6) respecto al anterior.
const ESC = [[110, 640], [390, 800], [670, 960]];
function Escalera({ T, at, cada = 0.28 }) {
  return <g>
    {ESC.map(([x, y], k) => { const t0 = at + k * 3 * cada; const n = kclamp((T - t0) / cada, 0, 3);
      const oro = kprog(T, t0 + 3 * cada, t0 + 3 * cada + 0.4);
      const sig = ESC[k + 1], esc = sig ? kprog(T, at + (k + 1) * 3 * cada - 0.1, at + (k + 1) * 3 * cada + 0.15) : 0;
      return <g key={k}>
        {sig && esc > 0 && <path d={`M ${x + 2 * PASO} ${y + RH} L ${x + 2 * PASO} ${klerp(y + RH, sig[1], esc)} ${esc >= 1 ? `L ${sig[0] - RH} ${sig[1]}` : ''}`} stroke={KC.gold2} strokeWidth={8} fill="none" strokeLinejoin="round" />}
        {n > 0 && <Trio x={x} y={y} n={n} oro={oro} />}
      </g>; })}
  </g>;
}

// Célula de levadura (óvalo) con yema que crece. oscura 0..1 = melanina.
function Celula({ x, y, rx = 46, ry = 32, rot = 0, yema = 0, oscura = 0, T = 0, seed = 1 }) {
  const col = mixHex('#efe3c6', '#2a221e', oscura);
  return <g transform={`translate(${x + mece(T, seed, 0.3) * 4} ${y + mece(T, seed + 3, 0.3) * 4}) rotate(${rot})`}>
    {yema > 0 && <ellipse cx={rx + yema * ry * 0.6} cy={0} rx={ry * 0.75 * yema} ry={ry * 0.6 * yema} fill={col} stroke={KC.ink} strokeWidth={5} />}
    <ellipse rx={rx} ry={ry} fill={col} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-rx * 0.2} cy={-ry * 0.1} rx={rx * 0.3} ry={ry * 0.32} fill={oscura > 0.5 ? '#4b3e36' : '#d8c9a4'} />
  </g>;
}
// Hilo (hifa) con tabiques, que crece con p 0..1. Puntos de control fijos.
function Hilo({ pts, p = 1, color = '#efe3c6', ancho = 26 }) {
  const n = Math.max(2, Math.ceil(pts.length * p)); const q = pts.slice(0, n);
  const d = 'M ' + q.map((a) => a[0] + ' ' + a[1]).join(' L ');
  return <g>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {q.slice(1, -1).map((a, i) => { const b = q[i + 2] || a, ang = Math.atan2(b[1] - a[1], b[0] - a[0]) + Math.PI / 2;
      return <line key={i} x1={a[0] + Math.cos(ang) * ancho * 0.5} y1={a[1] + Math.sin(ang) * ancho * 0.5} x2={a[0] - Math.cos(ang) * ancho * 0.5} y2={a[1] - Math.sin(ang) * ancho * 0.5} stroke={KC.ink} strokeWidth={4} />; })}
  </g>;
}

// Cadenitas de pululano que salen de la superficie de una célula (la «baba»). p 0..1.
const BABA = (() => { const g = krng(31); return Array.from({ length: 26 }, (_, i) => ({ a: (i / 26) * Math.PI * 2 + g() * 0.2, l: 160 + g() * 140, f: g() * 6, w: 0.6 + g() })); })();
function Baba({ T, x, y, R, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={R + 260 * p} fill={PC.baba} opacity={0.35 * p} />
    {BABA.map((b, i) => { const L = b.l * p; if (L < 4) return null; const N = 14;
      const pts = Array.from({ length: N + 1 }, (_, k) => { const u = k / N, r = R + u * L, w = Math.sin(u * 9 + T * 3 + b.f) * 12 * u; return [Math.cos(b.a) * r - Math.sin(b.a) * w, Math.sin(b.a) * r + Math.cos(b.a) * w]; });
      return <path key={i} d={'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ')} stroke="#bff3ff" strokeWidth={5 * b.w} fill="none" strokeLinecap="round" opacity={0.85} />; })}
  </g>;
}

// Vaso de vidrio con agua. polvo 0..1 cae; mezcla 0..1 remolinos; nivel = altura del agua (0..1).
function Vaso({ T, x, y, polvo = 0, mezcla = 0, nivel = 1, inclina = 0 }) {
  const H = 300, W = 220;
  return <g transform={`translate(${x} ${y}) rotate(${inclina})`}>
    <defs><clipPath id="vasoC"><path d={`M ${-W / 2} ${-H} L ${W / 2} ${-H} L ${W / 2 - 20} 0 L ${-W / 2 + 20} 0 Z`} /></clipPath></defs>
    <g clipPath="url(#vasoC)">
      <rect x={-W} y={-H * nivel * 0.85} width={W * 2} height={H} fill="rgba(120,220,255,.55)" transform={`rotate(${-inclina} 0 0)`} />
      {mezcla > 0 && [0, 1, 2].map((k) => <path key={k} d={`M ${-70 + k * 50} ${-60 - k * 40} q 40 -40 80 0 q -40 40 -80 0`} stroke="#fff" strokeWidth={6} fill="none" opacity={mezcla * (1 - mezcla) * 3} transform={`rotate(${T * 140 + k * 60} ${-30 + k * 50} ${-60 - k * 40})`} />)}
      {polvo > 0 && polvo < 1 && Array.from({ length: 18 }, (_, i) => { const g = krng(i + 5); const yy = -H - 80 + (polvo * 1.4 - g() * 0.4) * H; return <circle key={i} cx={-60 + g() * 120} cy={yy} r={7} fill="#fff" opacity={yy < -H * 0.85 ? 1 : 1 - mezcla} />; })}
    </g>
    <path d={`M ${-W / 2} ${-H} L ${-W / 2 + 20} 0 L ${W / 2 - 20} 0 L ${W / 2} ${-H}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-W / 2 + 26} ${-H + 30} L ${-W / 2 + 40} ${-40}`} stroke="#fff" strokeWidth={10} opacity=".6" strokeLinecap="round" />
  </g>;
}

// Etiqueta de precio que cuelga y se balancea.
function Precio({ T, x, y, p = 1 }) {
  const rot = Math.sin(T * 2.2) * 6 * p;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${kEase.rebote(p)})`} opacity={kprog(p, 0, 0.3)}>
    <line x1={0} y1={-170} x2={0} y2={-60} stroke={KC.ink} strokeWidth={5} />
    <path d="M -220 -60 L 250 -60 L 320 40 L 250 140 L -220 140 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={262} cy={40} r={16} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    <text x={-190} y={0} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>pululano a granel</text>
    <text x={-190} y={72} style={{ font:`400 66px ${KF.titulo}` }} fill={KC.red}>25–30 USD/kg</text>
    <text x={-190} y={118} style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">precio en 2026</text>
  </g>;
}

// Filtro de carbón activado: caldo oscuro arriba → gotas claras abajo.
function Filtro({ T, x, y, at }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-330} width={300} height={130} rx={18} fill={PC.negro2} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-252} textAnchor="middle" style={{ font:`700 21px ${KF.mono}` }} fill="#e9dcc6">caldo con melanina</text>
    <path d="M -170 -180 L 170 -180 L 30 -20 L 30 30 L -30 30 L -30 -20 Z" fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -130 -150 L 130 -150 L 70 -80 L -70 -80 Z" fill="#141414" />
    <text x={0} y={-104} textAnchor="middle" style={{ font:`700 17px ${KF.mono}` }} fill="#ddd">carbón activado</text>
    <Goteo T={T} x={-60} y0={-200} y1={-160} cada={0.35} color={PC.negro} desde={at} r={9} />
    <Goteo T={T} x={60} y0={-200} y1={-160} cada={0.42} color={PC.negro} desde={at + 0.15} r={9} />
    <Goteo T={T} x={0} y0={40} y1={250} cada={0.4} color="#c8f2ff" desde={at + 0.5} r={13} />
    <path d="M -120 200 L -100 330 L 100 330 L 120 200" fill="rgba(200,242,255,.6)" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Panza que se infla (esquemática). inf 0..1.
function Panza({ T, x, y, inf = 0 }) {
  const r = 150 + 70 * inf;
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={0} cy={-330} r={95} fill={PC.piel} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-32} cy={-340} r={10} fill={KC.ink} /><circle cx={32} cy={-340} r={10} fill={KC.ink} />
    <path d={inf > 0.5 ? 'M -30 -290 Q 0 -275 30 -290' : 'M -30 -295 Q 0 -275 30 -295'} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M -120 -230 L 120 -230 Q ${130 + inf * 60} -60 ${r * 0.95} 60 Q 0 ${120 + r * 0.6} ${-r * 0.95} 60 Q ${-130 - inf * 60} -60 -120 -230 Z`} fill="#2fbfa0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={0} cy={40 + inf * 30} r={9} fill="rgba(0,0,0,.4)" />
    {inf > 0.6 && [0, 1, 2].map((k) => <path key={k} d={`M ${r + 20} ${-40 + k * 50} l 40 ${-10 + k * 10}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" opacity={inf} />)}
  </g>;
}

// Lengua (vista desde arriba) con una tira que cae y se deshace. cae 0..1, deshace 0..1.
function Lengua({ T, x, y, cae = 0, deshace = 0 }) {
  const g = krng(17);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -260 300 Q -300 -120 0 -180 Q 300 -120 260 300 Z" fill={PC.lengua} stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 -140 L 0 240" stroke={PC.lengua2} strokeWidth={10} strokeLinecap="round" />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={-200 + g() * 400} cy={-120 + g() * 380} r={4 + g() * 4} fill={PC.lengua2} opacity=".5" />)}
    {cae > 0 && <g transform={`translate(0 ${klerp(-600, 40, kEase.sale(cae))}) rotate(${klerp(-25, -6, cae)})`} opacity={1 - deshace}>
      <rect x={-150} y={-80} width={300} height={160} rx={18} fill={PC.menta} stroke="rgba(16,18,15,.8)" strokeWidth={5} />
      <path d="M -120 -50 L 60 -60" stroke="#fff" strokeWidth={10} opacity=".6" strokeLinecap="round" />
    </g>}
    {deshace > 0 && deshace < 1 && Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, d = 40 + deshace * 220;
      return <path key={i} d="M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" transform={`translate(${Math.cos(a) * d} ${40 + Math.sin(a) * d * 0.6}) scale(${1.6 - deshace})`} fill="#eafff6" opacity={1 - deshace} />; })}
  </g>;
}

// Moléculas de O₂ que llegan desde la izquierda y rebotan en una pared en x = W0; una de cada 8 pasa despacio.
function Oxigeno({ T, at, W0 = 470, W1 = 560 }) {
  return <g>{Array.from({ length: 16 }, (_, i) => { const g = krng(i * 7 + 3); const per = 1.6 + g() * 0.8, fase = g() * per, yy = 720 + g() * 420;
    const t = T - at + fase; if (t < 0) return null; const u = (t % per) / per; const pasa = i === 5 || i === 12;
    let xx; if (pasa) xx = klerp(80, 960, ((T - at + fase * 2) % 4) / 4); else xx = u < 0.5 ? klerp(60, W0 - 26, u * 2) : klerp(W0 - 26, 60, (u - 0.5) * 2);
    if (pasa && xx > W0 - 20 && xx < W1 + 20 && false) return null;
    return <g key={i} transform={`translate(${xx} ${yy}) rotate(${T * 90 + i * 40})`} opacity={pasa ? 0.9 : 1}>
      <circle cx={-14} r={16} fill={PC.o2} stroke={KC.ink} strokeWidth={4} /><circle cx={14} r={16} fill={PC.o2} stroke={KC.ink} strokeWidth={4} />
    </g>; })}</g>;
}

function PululanoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Ca: CUES.Casa, M: CUES.Micro, B: CUES.Baba, Mo: CUES.Molecula, P: CUES.Pregunta, Pe: CUES.Pelicula,
    O: CUES.Oxigeno, E: CUES.Estudio, Ti: CUES.Tiras, Pr: CUES.Precio, Pa: CUES.Panza, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caer = kprog(T, K.G - 0.2, K.G + 0.4, kEase.sale);
  const rebote = Math.exp(-Math.max(0, T - K.G - 0.4) * 7) * Math.sin(Math.max(0, T - K.G - 0.4) * 18) * 6;
  const colonia = kprog(T, K.H + 0.3, K.H + 3.2, kEase.suave);
  const pe = (d) => K.Pe + d;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cápsula cae en la palma */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Palma x={540} y={1110} s={1.15} />
          <Capsula T={T} id="g" x={540} y={klerp(-300, 960, caer) + rebote} rot={klerp(-50, -8, caer) + rebote * 0.5} s={0.95} />
          {/* el hongo negro va AFUERA, al lado: «de aquí sale» (la cápsula no lleva células) */}
          <g opacity={kprog(T, K.G + 1.9, K.G + 2.4)}>
            {[[870, 800, 20, 1, 0.7], [960, 770, -30, 1, 0], [975, 860, 60, 0.85, 0]].map(([x, y, r, o, ym], i) => <Celula key={i} T={T} x={x} y={y} rx={40} ry={28} rot={r} oscura={o} seed={i + 50} yema={ym} />)}
            <path d="M 840 840 Q 800 880 760 890" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="12 10" />
          </g>
        </>)}
        <Lupa T={T} at={K.G + 1.4} until={K.H - 0.2} x={300} y={790} r={110} fx={470} fy={930} interior={(TT, r) => <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#0d1424" />
          <g transform={`translate(${r * 0.18} ${r * 0.55}) scale(.42)`}><Trio x={0} y={0} oro={1} /><path d={`M ${2 * PASO} ${RH} L ${2 * PASO} 160 L ${3 * PASO - RH + 10} 160`} stroke={KC.gold2} strokeWidth={8} fill="none" /><Trio x={3 * PASO + 10} y={160} oro={1} /></g>
        </svg>} etiqueta="POR DENTRO · PARED" tinte={KC.gold} />
      </Escena>
      {/* 1 · el hongo: colonias en placa que se ponen negras */}
      <Escena T={T} a={K.H} b={K.Ca} zoom={0.06}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Petri x={540} y={1000} r={250} medio="#f5ebc8">
          {[[-100, -75, 58, 1], [75, -100, 46, 2], [110, 60, 66, 3], [-75, 95, 50, 4], [8, 8, 38, 5], [-150, 25, 30, 6], [160, -18, 32, 7]].map(([cx, cy, r, sd], i) => {
            const c = kprog(T, K.H + 0.1 + i * 0.12, K.H + 1.2 + i * 0.12, kEase.sale);
            return <g key={i}><Colonia cx={cx} cy={cy} r={r * c} color={mixHex('#efe3c6', '#2a221e', colonia)} seed={sd} />
              <Colonia cx={cx} cy={cy} r={r * c * 0.55} color={mixHex('#e6d6b0', '#121010', colonia)} seed={sd + 20} /></g>; })}
        </Petri>)}
      </Escena>
      {/* 2 · donde vive: tierra, frutas, pintura */}
      <Escena T={T} a={K.Ca} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          {[0, 1, 2].map((k) => { const e = kprog(T, K.Ca + 0.1 + k * 0.7, K.Ca + 0.5 + k * 0.7, kEase.rebote); if (e <= 0) return null;
            const cx = 200 + k * 340, cy = 900 + (k === 1 ? -40 : 30), puntos = kprog(T, K.Ca + 0.5 + k * 0.7, K.Ca + 1.2 + k * 0.7);
            const g = krng(k + 40);
            return <g key={k} transform={`translate(${cx} ${cy}) scale(${e}) rotate(${(k - 1) * 4})`}>
              <rect x={-150} y={-170} width={300} height={340} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
              {k === 0 && <path d="M -120 120 Q -100 -40 0 -60 Q 110 -40 120 120 Z" fill={PC.tierra} stroke={KC.ink} strokeWidth={6} />}
              {k === 1 && [[-40, -40], [40, -40], [0, 20], [-60, 30], [60, 30], [-20, 80], [30, 80]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={42} fill={PC.uva} stroke={KC.ink} strokeWidth={5} />)}
              {k === 1 && <path d="M 0 -90 Q 10 -130 30 -140" stroke="#5a3418" strokeWidth={10} fill="none" />}
              {k === 2 && <><rect x={-120} y={-140} width={240} height={260} fill={PC.pared} stroke={KC.ink} strokeWidth={5} /><path d="M -110 -20 Q 0 -60 110 -10 L 110 40 Q 0 0 -110 40 Z" fill={KC.cyan} opacity=".8" /></>}
              {Array.from({ length: 9 }, (_, i) => { const px = -100 + g() * 200, py = -100 + g() * 200; return <circle key={i} cx={px} cy={py} r={7 * kprog(puntos, i / 12, i / 12 + 0.3)} fill={PC.negro} />; })}
              <text y={150} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>{['tierra', 'frutas', 'pintura'][k]}</text>
            </g>; })}
        </>)}
      </Escena>
      {/* 3 · al microscopio: levadura que echa yemas e hilos (fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.B} zoom={0.07}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          {[[200, 760, 10, 0.1], [380, 900, -20, 0.6], [170, 1040, 30, 0], [430, 1120, 5, 0.9], [540, 780, -10, 0]].map(([x, y, r, osc], i) =>
            <Celula key={i} T={T} seed={i + 1} x={x} y={y} rx={62} ry={44} rot={r} oscura={osc} yema={kprog(T, K.M + 0.6 + i * 0.25, K.M + 1.6 + i * 0.25, kEase.sale)} />)}
          <Hilo pts={[[600, 1160], [650, 1080], [700, 1010], [770, 950], [820, 870], [900, 820], [960, 760]]} p={kprog(T, K.M + 1.8, K.M + 3.2)} />
          <Hilo pts={[[770, 950], [840, 980], [920, 1020], [990, 1040]]} p={kprog(T, K.M + 2.4, K.M + 3.6)} ancho={22} />
        </>)}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, transparent 520px, ${KC.noche} 780px)`, zIndex:21 }}></div>
      </Escena>
      {/* 4 · la baba: el pululano sale fuera de la célula */}
      <Escena T={T} a={K.B} b={K.Mo} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Baba T={T} x={540} y={900} R={150} p={kprog(T, K.B + 0.6, K.B + 3.4, kEase.suave)} />
          <Celula T={T} x={540} y={900} rx={170} ry={120} seed={9} />
        </>)}
      </Escena>
      {/* 5 · la molécula: tríos de glucosa en escalera */}
      <Escena T={T} a={K.Mo} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<Escalera T={T} at={K.Mo + 0.3} cada={0.3} />)}
      </Escena>
      {/* 6 · re-gancho: ¿y cómo se vuelve cápsula? */}
      <Escena T={T} a={K.P} b={K.Pe} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Capsula T={T} id="p" x={300} y={1080} s={0.62} rot={-20} /><Interrogacion T={T} x={300} y={900} tam={360} /></>)}
      </Escena>
      {/* 7 · la película: se disuelve, se seca, queda transparente */}
      <Escena T={T} a={K.Pe} b={K.O} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g opacity={1 - kprog(T, pe(2.0), pe(2.4))}>
            <Vaso T={T} x={540} y={1120} polvo={kprog(T, pe(0.1), pe(0.9))} mezcla={kprog(T, pe(0.7), pe(1.9))} inclina={klerp(0, 60, kprog(T, pe(1.6), pe(2.2), kEase.suave))} />
          </g>
          <g opacity={kprog(T, pe(1.9), pe(2.3))}>
            <text x={540} y={1050} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>FUNGI MATI</text>
            <rect x={130} y={940} width={820} height={160} rx={16} fill="rgba(120,220,255,.35)" stroke={KC.ink} strokeWidth={6} opacity={1 - kprog(T, pe(2.6), pe(3.2))} />
            {[0, 1, 2].map((k) => { const u = ((T - pe(2.3)) * 0.8 + k / 3) % 1; return T > pe(2.3) && T < pe(3.4) ? <path key={k} d={`M ${300 + k * 240} ${930 - u * 180} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="rgba(255,255,255,.85)" strokeWidth={9} fill="none" opacity={(1 - u) * 0.9} strokeLinecap="round" /> : null; })}
            {(() => { const lev = kprog(T, pe(3.3), pe(4.2), kEase.sale); return <g transform={`translate(0 ${-lev * 60}) rotate(${-lev * 3} 540 1020)`} opacity={kprog(T, pe(2.8), pe(3.2))}>
              <path d={`M 140 950 L 940 950 L 940 1090 L 140 1090 Z`} fill="rgba(255,255,255,.22)" stroke="#ffffff" strokeWidth={6} />
              <path d="M 180 975 L 600 970" stroke="#fff" strokeWidth={10} opacity=".7" strokeLinecap="round" />
              <g transform="translate(940 950)"><rect x={-10} y={-90} width={30} height={120} rx={8} fill="#c9ced4" stroke={KC.ink} strokeWidth={6} transform="rotate(20)" /></g>
            </g>; })()}
          </g>
        </>)}
      </Escena>
      {/* 8 · oxígeno: la pared casi no lo deja pasar */}
      <Escena T={T} a={K.O} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={470} y={650} width={90} height={560} rx={20} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
          <text x={515} y={630} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>pared de pululano</text>
          <circle cx={800} cy={930} r={130} fill={PC.aceite} stroke={KC.ink} strokeWidth={8} />
          <path d="M 730 860 Q 760 830 800 830" stroke="#fff6c8" strokeWidth={14} fill="none" strokeLinecap="round" />
          <text x={800} y={1110} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>lo de adentro</text>
          <Oxigeno T={T} at={K.O} />
        </>)}
      </Escena>
      {/* 9 · el estudio: Japón 1976, Europa 2025 */}
      <Escena T={T} a={K.E} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Capsula T={T} id="e" x={540} y={1110} s={0.7} rot={-6} />
          <Sello T={T} at={K.E + 4.8} x={820} y={980} texto="" color={KC.leaf} r={110} />
          {T > K.E + 4.8 && <path d="M 770 985 L 805 1025 L 875 935" stroke={KC.leaf} strokeWidth={22} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.E + 4.8, K.E + 5.0)} />}
        </>)}
      </Escena>
      {/* 10 · tiras para el aliento */}
      <Escena T={T} a={K.Ti} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Lengua T={T} x={540} y={960} cae={kprog(T, K.Ti + 0.4, K.Ti + 1.2)} deshace={kprog(T, K.Ti + 2.0, K.Ti + 3.4)} />)}
      </Escena>
      {/* 11 · el problema: caro y hay que quitarle el pigmento */}
      <Escena T={T} a={K.Pr} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Precio T={T} x={290} y={740} p={kprog(T, K.Pr + 0.3, K.Pr + 0.8)} />
          <g opacity={kprog(T, K.Pr + 1.6, K.Pr + 2.0)}><Filtro T={T} x={770} y={1010} at={K.Pr + 1.7} /></g>
        </>)}
      </Escena>
      {/* 12 · la panza */}
      <Escena T={T} a={K.Pa} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Panza T={T} x={380} y={1060} inf={kprog(T, K.Pa + 1.2, K.Pa + 2.2, kEase.rebote) * (1 - 0.6 * kprog(T, K.Pa + 3.0, K.Pa + 3.6))} />
          <g transform="translate(810 1050)" opacity={kprog(T, K.Pa + 0.2, K.Pa + 0.5)}>
            <rect x={-130} y={-40} width={260} height={120} rx={20} fill="#dfe6ec" stroke={KC.ink} strokeWidth={8} />
            <rect x={-100} y={-20} width={200} height={70} rx={10} fill="#1d2b22" />
            <text x={0} y={32} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill="#7dff9e">10 g/día</text>
          </g>
        </>)}
      </Escena>
      {/* 13 · cierre: la misma cápsula en la palma, ahora con su historia */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Palma x={540} y={1110} s={1.15} />
          <Capsula T={T} id="c" x={540} y={960} rot={-8} s={0.95} escalera={kprog(T, K.C + 0.4, K.C + 1.2)} />
          <g opacity={kprog(T, K.C + 1.4, K.C + 2.0)}>
            {[[140, 730, 0, 1], [230, 700, 30, 1]].map(([x, y, r, o], i) => <Celula key={i} T={T} x={x} y={y} rx={34} ry={24} rot={r} oscura={o} seed={i + 30} yema={i ? 0.7 : 0} />)}
          </g>
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.2} until={K.H - 0.3} texto="gelatina" x={300} y={470} tam={54} />
      <Chip T={T} at={K.G + 1.5} until={K.H - 0.3} texto="es baba de hongo" x={310} y={590} tam={44} borde={KC.leaf} />

      <Chip T={T} at={K.H + 0.2} until={K.Ca - 0.3} texto="PULULANO" x={300} y={470} tam={64} borde={KC.gold} />
      <Etq T={T} at={K.H + 0.9} until={K.Ca - 0.3} x={60} y={570} texto="Aureobasidium pullulans" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.H + 2.6} until={K.Ca - 0.3} texto="«levadura negra»" x={300} y={660} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.H + 3.4} until={K.Ca - 0.3} x={60} y={720} texto="pigmento: melanina" tam={28} color={KC.ink} />

      <Chip T={T} at={K.M + 0.2} until={K.B - 0.3} texto="AL MICROSCOPIO" x={320} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.M + 1.2} until={K.B - 0.3} x={60} y={560} texto="levadura (echa yemas)" tam={30} />
      <Etq T={T} at={K.M + 2.2} until={K.B - 0.3} x={560} y={1170} texto="hilos (hifas)" tam={30} />
      <Chip T={T} at={K.M + 2.8} until={K.B - 0.3} texto="cambia de forma" x={320} y={650} tam={34} borde={KC.gold} />

      <Chip T={T} at={K.B + 0.8} until={K.Mo - 0.3} texto="fuera de la célula" x={320} y={470} tam={38} borde={KC.cyan} />
      <Etq T={T} at={K.B + 2.0} until={K.Mo - 0.3} x={60} y={580} texto="pululano («baba»)" tam={32} />

      <Chip T={T} at={K.Mo + 0.2} until={K.P - 0.3} texto="glucosa" x={200} y={470} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Mo + 1.5} until={K.P - 0.3} texto="maltotriosa = 3 glucosas" x={420} y={560} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Mo + 1.0} until={K.P - 0.3} x={110} y={700} texto="unión α-1,4" tam={26} />
      <Etq T={T} at={K.Mo + 2.4} until={K.P - 0.3} x={560} y={760} texto="unión α-1,6 (escalón)" tam={26} color={KC.gold2} />
      <Chip T={T} at={K.Mo + 3.4} until={K.P - 0.3} texto="forma de escalera" x={320} y={1150} tam={34} borde={KC.gold} />

      <Chip T={T} at={pe(0.2)} until={pe(1.9)} texto="se disuelve en agua" x={330} y={470} tam={36} borde={KC.cyan} />
      <Chip T={T} at={pe(2.3)} until={pe(3.2)} texto="se seca" x={330} y={470} tam={40} borde={KC.white} />
      <Chip T={T} at={pe(3.3)} until={K.O - 0.3} texto="transparente" x={300} y={470} tam={40} borde={KC.cyan} />
      <Chip T={T} at={pe(3.7)} until={K.O - 0.3} texto="muy delgada (hasta 0.01 mm)" x={350} y={580} tam={30} borde={KC.ink} />

      <Chip T={T} at={K.O + 0.6} until={K.E - 0.3} texto="pasa muy poco oxígeno" x={340} y={470} tam={34} borde={KC.red} />
      <Etq T={T} at={K.O + 0.3} until={K.E - 0.3} x={60} y={560} texto="O₂" tam={40} color={KC.ink} />

      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="1976" quien="Japón" revista="aditivo y alimento" x={370} y={620} />
      <TarjetaEstudio T={T} at={K.E + 2.8} until={K.Ti - 0.3} anio="2025" quien="EFSA · Unión Europea" revista="re-evaluación del pululano (E 1204)" x={370} y={620} />
      <Chip T={T} at={K.E + 5.0} until={K.Ti - 0.3} texto="sin problema de seguridad" x={360} y={860} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.E + 5.2} until={K.Ti - 0.3} texto="en sus usos actuales" x={360} y={950} tam={28} borde={KC.leaf} />

      <Chip T={T} at={K.Ti + 0.6} until={K.Pr - 0.3} texto="tira para el aliento" x={320} y={470} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Ti + 2.2} until={K.Pr - 0.3} texto="se deshace en tu lengua" x={340} y={580} tam={32} borde={KC.ink} />

      <Chip T={T} at={K.Pr + 2.2} until={K.Pa - 0.3} texto="hay que quitarle la melanina" x={300} y={980} tam={30} borde={KC.ink} />

      <Chip T={T} at={K.Pa + 0.3} until={K.C - 0.3} texto="≥ 10 g al día" x={300} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 1.6} until={K.C - 0.3} texto="hinchazón, gases (leves)" x={330} y={580} tam={32} borde={KC.orange} />

      <Etq T={T} at={K.C + 1.8} until={K.Ou} x={60} y={620} texto="el hongo (afuera)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="no es gelatina: es pululano" x={350} y={470} tam={38} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="1 cm" largo={110} />
      <BarraEscala T={T} at={K.H} until={K.Ca} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ca} until={K.M} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.M} until={K.B} texto="10 µm (esquemático)" largo={150} />
      <BarraEscala T={T} at={K.B} until={K.Mo} texto="5 µm (esquemático)" largo={150} />
      <BarraEscala T={T} at={K.Mo} until={K.P} texto="molécula esquemática" largo={0} />
      <BarraEscala T={T} at={K.P} until={K.Pe} texto="1 cm" largo={70} />
      <BarraEscala T={T} at={K.Pe} until={K.O} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.O} until={K.E} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.E} until={K.Ti} texto="1 cm" largo={80} />
      <BarraEscala T={T} at={K.Ti} until={K.Pr} texto="2 cm" largo={140} />
      <BarraEscala T={T} at={K.Pr} until={K.C} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="1 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubK T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es gelatina: *es baba de hongo.*" />
      <SubK T={T} idx={1} at={K.H + 0.1} until={K.Ca - 0.1} texto="Pululano, de *_Aureobasidium pullulans._*" />
      <SubK T={T} idx={2} at={K.Ca + 0.1} until={K.M - 0.1} texto="Tierra, frutas… *y pintura.*" />
      <SubK T={T} idx={3} at={K.M + 0.1} until={K.B - 0.1} texto="Levadura con yemas… *o hilos.*" />
      <SubK T={T} idx={4} at={K.B + 0.1} until={K.Mo - 0.1} texto="Lo suelta *fuera de la célula.*" />
      <SubK T={T} idx={5} at={K.Mo + 0.1} until={K.P - 0.1} texto="Tríos de glucosa *en escalera.*" />
      <SubK T={T} idx={6} at={K.P + 0.1} until={K.Pe - 0.1} texto="¿Cómo se vuelve *cápsula?*" />
      <SubK T={T} idx={7} at={K.Pe + 0.1} until={K.O - 0.1} texto="Una película *transparente.*" />
      <SubK T={T} idx={8} at={K.O + 0.1} until={K.E - 0.1} texto="Pasa *muy poco oxígeno.*" />
      <SubK T={T} idx={9} at={K.E + 0.1} until={K.Ti - 0.1} texto="Europa 2025: *sin problema de seguridad.*" />
      <SubK T={T} idx={10} at={K.Ti + 0.1} until={K.Pr - 0.1} texto="Tiras que *se deshacen.*" />
      <SubK T={T} idx={11} at={K.Pr + 0.1} until={K.Pa - 0.1} texto="Es caro… *y hay que blanquearlo.*" />
      <SubK T={T} idx={12} at={K.Pa + 0.1} until={K.C - 0.1} texto="10 g al día: *panza inflada.*" />
      <SubK T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es gelatina: *es baba de hongo.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.9, K.Ca - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.7, K.B - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.B + 0.7, K.Mo - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Pe + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.O + 0.7, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 2.4, K.Ti - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ti + 1.0, K.Pr - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Pr + 0.8, K.Pa - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pa + 0.5, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="145" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PululanoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PululanoShot /></CompositionStage></div>;
}
window.PululanoApp = PululanoApp;
