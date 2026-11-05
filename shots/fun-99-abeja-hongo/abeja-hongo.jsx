// Shot Fungi Mati #99 · Esa pelusa blanca es la comida: la abeja sin aguijón que necesita un hongo — NARRADO.
// Formato N5 "El experimento" dentro de un viaje N1 "Por dentro". Gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md.
// Scaptotrigona depilis (Brasil): la celda de cerumen se llena de alimento, la reina pone un huevo encima y se sella; a los ~3 días
// brota del cerumen una pelusa blanca (la levadura Zygosaccharomyces sp., en pseudohifas) que la larva se come; le da ergosterol para volverse pupa.
// Todo es esquemático (sin tamaños en la voz). El color de la obrera no se rotula.

const AC = { cera:'#c58f4e', cera2:'#8a5a2a', dentro:'#f3dfb0', comida:'#e8b341', comida2:'#f7d77e', hongo:'#ffffff', larva:'#fbf3e3', larva2:'#e6d6b8',
  cuerpo:'#2a211a', cuerpo2:'#4a3a2a', ala:'rgba(214,236,255,.62)', ojo:'#120d0a', manda:'#8a5a2a', pozo:'#dfe7ee', grasa:'#ffd84a' };

// Punto de una elipse (centro x, y; radios rx, ry) al ángulo a (grados; −90 = arriba).
const pElipse = (x, y, rx, ry, a) => [x + rx * Math.cos(a * Math.PI / 180), y + ry * Math.sin(a * Math.PI / 180)];

// Larva en "C" (gusanito blanco curvado), centro (x, y), tamaño R. muerde 0..1 abre/cierra las mandíbulas. gris = larva muerta.
function Larva({ x, y, R = 40, muerde = 0, gris = false, rot = 0 }) {
  if (R <= 0.5) return null;
  const n = 9, segs = Array.from({ length: n }, (_, i) => { const a = (200 - i * 30) * Math.PI / 180; return { i, cx: Math.cos(a) * R * 0.62, cy: Math.sin(a) * R * 0.62, r: R * (0.42 - i * 0.018) }; });
  const col = gris ? '#a9a39a' : AC.larva, col2 = gris ? '#8d877e' : AC.larva2;
  const cabeza = segs[n - 1];
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {segs.map((s) => <circle key={s.i} cx={s.cx} cy={s.cy} r={s.r} fill={col} stroke={KC.ink} strokeWidth={Math.max(2.5, R * 0.07)} />)}
    {segs.slice(1, n - 1).map((s) => <path key={'l' + s.i} d={`M ${s.cx - s.r * 0.5} ${s.cy - s.r * 0.6} Q ${s.cx} ${s.cy} ${s.cx - s.r * 0.5} ${s.cy + s.r * 0.6}`} stroke={col2} strokeWidth={Math.max(1.5, R * 0.04)} fill="none" />)}
    {/* cabeza (último segmento) con mandíbulas cafés */}
    <g transform={`translate(${cabeza.cx} ${cabeza.cy})`}>
      <circle r={cabeza.r * 0.78} fill={gris ? '#b8b1a6' : '#f1e2c2'} stroke={KC.ink} strokeWidth={Math.max(2.5, R * 0.06)} />
      {!gris && [-1, 1].map((k) => <path key={k} d={`M ${cabeza.r * 0.3} ${k * cabeza.r * 0.2} L ${cabeza.r * (0.95 + 0.15 * muerde)} ${k * cabeza.r * (0.18 + 0.32 * muerde)} L ${cabeza.r * 0.55} ${k * cabeza.r * 0.45} Z`} fill={AC.manda} stroke={KC.ink} strokeWidth={Math.max(1.5, R * 0.035)} strokeLinejoin="round" />)}
    </g>
  </g>;
}

// Pupa blanca (silueta de abeja todavía blanca), parada con la cabeza arriba. Centro (x, y), alto h.
function Pupa({ x, y, h = 120, o = 1 }) {
  if (o <= 0) return null;
  const k = h / 120;
  return <g transform={`translate(${x} ${y}) scale(${k})`} opacity={o}>
    <ellipse cx={0} cy={22} rx={24} ry={36} fill={AC.larva} stroke={KC.ink} strokeWidth={4} />
    {[8, 22, 36].map((d) => <path key={d} d={`M -22 ${d} Q 0 ${d + 6} 22 ${d}`} stroke={AC.larva2} strokeWidth={3} fill="none" />)}
    <ellipse cx={0} cy={-24} rx={20} ry={18} fill={AC.larva} stroke={KC.ink} strokeWidth={4} />
    <circle cx={0} cy={-52} r={15} fill={AC.larva} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-7} cy={-54} rx={4} ry={6} fill="#c7a78a" /><ellipse cx={7} cy={-54} rx={4} ry={6} fill="#c7a78a" />
    {[-1, 1].map((s) => <path key={s} d={`M ${s * 14} -30 Q ${s * 30} -8 ${s * 18} 26`} stroke={AC.larva2} strokeWidth={4} fill="none" strokeLinecap="round" />)}
  </g>;
}

// Abeja sin aguijón de perfil (esquemática), mirando a la derecha. reina = abdomen más grande. aleteo 0..1.
function Abeja({ T = 0, x, y, s = 1, rot = 0, reina = false, aleteo = 0, espejo = false }) {
  const ab = reina ? { cx: -62, rx: 70, ry: 32 } : { cx: -38, rx: 40, ry: 28 };
  const fl = Math.sin(T * 40) * aleteo;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${espejo ? -s : s} ${s})`}>
    {/* patas */}
    {[-6, 8, 22].map((dx, i) => <path key={i} d={`M ${dx} 14 L ${dx - 10 + i * 6} 40 L ${dx - 4 + i * 8} 58`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
    {/* abdomen con bandas */}
    <ellipse cx={ab.cx} cy={6} rx={ab.rx} ry={ab.ry} fill={reina ? '#6a5236' : AC.cuerpo2} stroke={KC.ink} strokeWidth={5} />
    {[0.25, 0, -0.25].map((u, i) => <path key={i} d={`M ${ab.cx + u * ab.rx * 2 - 6} ${6 - ab.ry * 0.85} Q ${ab.cx + u * ab.rx * 2 + 4} 6 ${ab.cx + u * ab.rx * 2 - 6} ${6 + ab.ry * 0.85}`} stroke={AC.cuerpo} strokeWidth={6} fill="none" />)}
    {/* tórax y cabeza */}
    <circle cx={8} cy={0} r={25} fill={AC.cuerpo} stroke={KC.ink} strokeWidth={5} />
    <circle cx={46} cy={2} r={19} fill={AC.cuerpo} stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={50} cy={-2} rx={7} ry={11} fill="#5b4a3a" />
    <path d="M 52 -14 L 64 -36 L 80 -32" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 60 16 L 70 22" stroke={AC.manda} strokeWidth={5} strokeLinecap="round" />
    {/* alas */}
    <g transform={`rotate(${-8 - fl * 25} 6 -18)`}><ellipse cx={-30} cy={-34} rx={44} ry={15} fill={AC.ala} stroke={KC.ink} strokeWidth={3.5} /></g>
    <g transform={`rotate(${4 - fl * 18} 6 -18)`}><ellipse cx={-22} cy={-22} rx={34} ry={11} fill={AC.ala} stroke={KC.ink} strokeWidth={3} /></g>
  </g>;
}

// Celda de cría vista en corte (óvalo de cerumen abierto arriba). nivel 0..1 = alimento; sello 0..1 = tapa; hongo 0..1 = pelusa que crece
// desde la pared sobre el alimento; comido 0..1 = la larva se la va comiendo. children = lo de adentro (huevo, larva, pupa, abeja).
function Celda({ id, x, y, w, h, nivel = 1, sello = 0, hongo = 0, comido = 0, T = 0, children, dentro = AC.dentro, rastro = 0 }) {
  const k = w / 220, pared = 16 * k, rx = w / 2, ry = h / 2, irx = rx - pared / 2, iry = ry - pared / 2, g = 30;
  const surf = y + iry - nivel * iry * 0.85;
  const [ax, ay] = pElipse(x, y, rx, ry, -90 + g), [bx, by] = pElipse(x, y, rx, ry, -90 - g);
  const anchoEn = (yy) => irx * Math.sqrt(Math.max(0, 1 - ((yy - y) / iry) ** 2));
  const fil = [];
  const hv = hongo * (1 - comido);
  if (hv > 0.01 && nivel > 0.05) {
    const media = anchoEn(surf);
    [-1, 1].forEach((sd) => {
      const n = 16;
      for (let i = 0; i < n; i++) {
        const u = i / n; if (u > hv) continue;
        const g2 = krng(i * 7 + (sd > 0 ? 3 : 11) + (id || '').length)();
        const xi = x + sd * (media - u * media * 0.92), L = (14 + g2 * 26) * k * (1 - u * 0.35) * kclamp(hv * 2, 0, 1);
        const bx2 = xi + Math.sin(T * 2 + i) * 3 * k - sd * g2 * 10 * k;
        fil.push(<path key={sd + '_' + i} d={`M ${xi} ${surf} Q ${xi - sd * 6 * k} ${surf - L * 0.6} ${bx2} ${surf - L}`} stroke={AC.hongo} strokeWidth={3.2 * k} fill="none" strokeLinecap="round" opacity={0.95} />);
      }
      // también trepa un poco por la pared, junto al borde del alimento
      for (let j = 0; j < 6; j++) {
        if (j / 6 > hv) continue;
        const yy = surf - (j + 1) * 9 * k, xw = x + sd * (anchoEn(yy) - 2 * k);
        fil.push(<path key={'w' + sd + j} d={`M ${xw} ${yy} q ${-sd * 12 * k} ${-4 * k} ${-sd * 18 * k} ${-14 * k}`} stroke={AC.hongo} strokeWidth={2.8 * k} fill="none" strokeLinecap="round" opacity={0.9} />);
      }
    });
  }
  return <g>
    <defs><clipPath id={'cel_' + id}><ellipse cx={x} cy={y} rx={irx} ry={iry} /></clipPath></defs>
    <ellipse cx={x} cy={y} rx={irx} ry={iry} fill={dentro} />
    <g clipPath={`url(#cel_${id})`}>
      {nivel > 0 && <rect x={x - rx} y={surf} width={w} height={h} fill={AC.comida} />}
      {nivel > 0 && <path d={`M ${x - rx} ${surf} L ${x + rx} ${surf}`} stroke={AC.comida2} strokeWidth={6 * k} />}
      {hv > 0.01 && nivel > 0.05 && <ellipse cx={x} cy={surf - 4 * k} rx={anchoEn(surf) * (0.15 + 0.85 * hv)} ry={9 * k} fill="#fff" opacity={0.35 * hv} />}
      {rastro > 0 && <path d={`M ${x - anchoEn(surf)} ${surf} L ${x + anchoEn(surf)} ${surf}`} stroke="#fff" strokeWidth={5 * k} opacity={0.45 * rastro} strokeDasharray={`${6 * k} ${10 * k}`} />}
      {fil}
      {children}
    </g>
    <path d={`M ${ax} ${ay} A ${rx} ${ry} 0 1 1 ${bx} ${by}`} fill="none" stroke={AC.cera} strokeWidth={pared} strokeLinecap="round" />
    {[[rx + pared / 2, ry + pared / 2, KC.ink, 4 * k, 1], [rx - pared / 2, ry - pared / 2, AC.cera2, 2.5 * k, 0.7]].map(([a, b, c, sw, op], i) => {
      const [p1x, p1y] = pElipse(x, y, a, b, -90 + g), [p2x, p2y] = pElipse(x, y, a, b, -90 - g);
      return <path key={'o' + i} d={`M ${p1x} ${p1y} A ${a} ${b} 0 1 1 ${p2x} ${p2y}`} fill="none" stroke={c} strokeWidth={sw} opacity={op} />; })}
    {sello > 0 && <path d={`M ${bx} ${by} A ${rx} ${ry} 0 0 1 ${ax} ${ay}`} fill="none" stroke={AC.cera} strokeWidth={pared * 1.15} strokeLinecap="round" pathLength={1} strokeDasharray={`${sello} 1`} />}
    {sello > 0.98 && <path d={`M ${bx} ${by - pared * 0.55} A ${rx + pared * 0.55} ${ry + pared * 0.55} 0 0 1 ${ax} ${ay - pared * 0.55}`} fill="none" stroke={KC.ink} strokeWidth={4 * k} />}
  </g>;
}
// superficie del alimento de una celda (para poner huevo y larva encima)
const superficie = (y, h, w, nivel) => { const k = w / 220, iry = h / 2 - 8 * k; return y + iry - nivel * iry * 0.85; };

// Huevo alargado acostado sobre el alimento.
function Huevo({ x, y, s = 1, o = 1 }) {
  if (o <= 0 || s <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(72) scale(${s})`} opacity={o}><ellipse rx={10} ry={30} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} /><ellipse cx={-3} cy={-12} rx={3} ry={8} fill="#fff" /></g>;
}

// Células de levadura en cadena (pseudohifas): óvalos alargados que brotan uno tras otro y se ramifican. g 0..1. gotas = gotitas de grasa.
const LEV_CADENA = (() => {
  const r = krng(99), pts = [];
  const rama = (x, y, ang, n, prof) => {
    for (let i = 0; i < n; i++) {
      const L = 70 + r() * 16; const cx = x + Math.cos(ang) * L / 2, cy = y + Math.sin(ang) * L / 2;
      pts.push({ cx, cy, ang: ang * 180 / Math.PI, L, ord: pts.length, prof });
      x += Math.cos(ang) * L * 0.92; y += Math.sin(ang) * L * 0.92; ang += (r() - 0.5) * 0.5;
      if (prof < 2 && i % 2 === 1) rama(x, y, ang + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4), Math.max(2, n - i - 2), prof + 1);
    }
  };
  rama(0, 0, -0.35, 6, 0);
  return pts;
})();
function Levaduras({ T, x, y, s = 1, g = 1, gotas = 1, brilloGotas = 0 }) {
  const N = LEV_CADENA.length, k = g * N;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {LEV_CADENA.map((p, i) => { const u = kclamp(k - i, 0, 1); if (u <= 0) return null;
      const L = p.L * (0.4 + 0.6 * u), W = 22;
      return <g key={i} transform={`translate(${p.cx} ${p.cy}) rotate(${p.ang + mece(T, i, 0.2) * 2})`} opacity={u}>
        <ellipse rx={L / 2} ry={W} fill="#f7ecd2" stroke={KC.ink} strokeWidth={4} />
        <ellipse cx={-L * 0.12} cy={-W * 0.35} rx={L * 0.2} ry={W * 0.22} fill="#fff" opacity={0.6} />
        {gotas > 0 && [[-0.18, 0.2, 7], [0.16, -0.1, 9], [0.3, 0.32, 5]].map(([a, b, rr], j) =>
          <g key={j}>{brilloGotas > 0 && <circle cx={a * L} cy={b * W} r={rr * 2.4} fill={AC.grasa} opacity={0.25 * brilloGotas} />}
            <circle cx={a * L} cy={b * W} r={rr * gotas} fill={AC.grasa} stroke="#9a6d10" strokeWidth={1.5} /></g>)}
      </g>; })}
  </g>;
}

// Molécula esquemática de esterol (4 anillos: 3 hexágonos y 1 pentágono, OH y cadena lateral). Centro (x, y).
function Esterol({ x, y, s = 1, p = 1, color = KC.gold2 }) {
  if (p <= 0) return null;
  const a = 34, hx = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const t = (i * 60 - 30) * Math.PI / 180; return [cx + a * Math.cos(t), cy + a * Math.sin(t)]; });
  const dx = a * Math.sqrt(3);
  const A = hx(0, 0), B = hx(dx, 0), C = hx(dx * 1.5, -a * 1.5);
  const D = Array.from({ length: 5 }, (_, i) => { const t = (-18 + i * 72) * Math.PI / 180; return [dx * 1.5 + dx * 0.95 + 28 * Math.cos(t + Math.PI), -a * 1.5 + 28 * Math.sin(t + Math.PI) - 4]; });
  const poly = (P) => 'M ' + P.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const e = kEase.rebote(kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.6, 1, e)})`} opacity={kclamp(p * 2, 0, 1)}>
    <circle cx={dx} cy={-a * 0.7} r={a * 3.4} fill={color} opacity={0.14} />
    {[A, B, C].map((P, i) => <path key={i} d={poly(P)} fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" />)}
    <path d={poly(D)} fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M ${D[2][0]} ${D[2][1]} l 30 -22 l 30 14 l 30 -22 l 30 14`} fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
    <text x={-a * 1.9} y={a * 0.95} textAnchor="end" style={{ font:`700 34px ${KF.mono}` }} fill={color}>HO</text>
    <path d={`M ${A[3][0]} ${A[3][1]} L ${-a * 1.7} ${a * 0.65}`} stroke={color} strokeWidth={7} strokeLinecap="round" />
  </g>;
}

// Placa de laboratorio de pozos (vista desde arriba). llenos 0..N: cuántos pozos ya tienen alimento.
function Placa({ x, y, cols = 10, filas = 4, paso = 80, llenos = 0, larvas = 0 }) {
  const W = cols * paso + 40, H = filas * paso + 40;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-20} y={-20} width={W} height={H} rx={26} fill="#f4f7fa" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), cx = c * paso + paso / 2, cy = f * paso + paso / 2;
      return <g key={i}><circle cx={cx} cy={cy} r={paso * 0.36} fill={i < llenos ? AC.comida : AC.pozo} stroke={KC.ink} strokeWidth={4} />
        {i < larvas && <Larva x={cx} y={cy} R={paso * 0.2} />}</g>; })}
  </g>;
}

// Caja clara para nombres (acepta <i> dentro). tachar 0..1 la raya en rojo.
function Caja({ T, at, until, x, y, children, tam = 34, centro = false, tachar }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), r = tachar != null ? kprog(T, tachar, tachar + 0.35, kEase.sale) : 0;
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o * (1 - r * 0.3), transform:`${centro ? 'translateX(-50%) ' : ''}translateY(${e.y * 0.4}px)`, background:'rgba(244,239,228,.95)', border:`4px solid ${KC.ink}`,
    borderRadius:14, padding:'6px 18px', font:`700 ${tam}px ${KF.mono}`, color:KC.ink, whiteSpace:'nowrap', boxShadow:`6px 6px 0 ${KC.ink}`, filter:`grayscale(${r * 0.7})` }}>
    {children}
    {r > 0 && <div style={{ position:'absolute', left:-10, top:'50%', height:10, width:`calc(${r * 100}% + 20px)`, background:KC.red, borderRadius:5, transform:'translateY(-50%) rotate(-3deg)' }}></div>}
  </div>;
}

// Subtítulo con *resaltado* y _cursiva_ (nombres científicos en cursiva también en el subtítulo).
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w;
    if (p.startsWith('*')) { on = true; p = p.slice(1); }
    if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it;
    if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    if (p.includes('*')) { p = p.replace('*', ''); on = false; }
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

// Texto SVG con contorno (para títulos de las gráficas).
const TxtS = ({ x, y, children, tam = 40, color = KC.ink, anchor = 'middle', fuente = KF.texto, peso = 900, o = 1 }) =>
  <text x={x} y={y} textAnchor={anchor} opacity={o} style={{ font:`${peso} ${tam}px ${fuente}` }} fill={color}>{children}</text>;

// Panal en corte: fila de celdas. La del centro es la protagonista (la pasan como `centro`).
function Panal({ T, y = 900, centro }) {
  return <g>
    <rect x={-60} y={y - 190} width={KW + 120} height={380} rx={40} fill="#b07a3c" stroke={KC.ink} strokeWidth={7} />
    {[-2, -1, 1, 2].map((i) => { const cx = 540 + i * 250;
      return <Celda key={i} id={'pan' + i} x={cx} y={y} w={220} h={300} T={T} nivel={i === -2 ? 0.9 : 1} sello={i === 1 || i === -2 ? 1 : 0} hongo={i === -1 ? 0.7 : 0}>
        {i === 2 && <Huevo x={cx} y={superficie(y, 300, 220, 1) - 9} s={0.9} />}
        {i === -2 && <Pupa x={cx} y={y + 10} h={150} />}
        {i === 1 && <Larva x={cx} y={superficie(y, 300, 220, 1) - 22} R={34} />}
        {i === -1 && <Larva x={cx} y={superficie(y, 300, 220, 1) - 16} R={24} />}
      </Celda>; })}
    {centro}
  </g>;
}

function AbejaHongoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Ce: CUES.Celda, H: CUES.Huevo, Ho: CUES.Hongo, Co: CUES.Come, P: CUES.Pregunta, E: CUES.Estudio,
    R: CUES.Resultado, Er: CUES.Ergosterol, Pu: CUES.Pupa, L: CUES.Levadura, M: CUES.Mexico, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  // ---------- gancho y cierre: la celda del centro del panal ----------
  const zG = 1 + 0.7 * kprog(T, K.G + 0.2, K.G + 1.3, kEase.suave);
  const zoomEn = (z, cx, cy) => `translate(${cx * (1 - z)} ${cy * (1 - z)}) scale(${z})`;
  const sG = superficie(980, 300, 220, 1);
  const celdaGancho = <Celda id="cg" x={540} y={980} w={220} h={300} T={T} nivel={1} hongo={1} comido={0}>
    <Larva x={540} y={sG - 20} R={30} muerde={(Math.sin(T * 9) + 1) / 2} />
  </Celda>;
  // cierre: la misma celda, ahora con una abeja adulta que sale
  const abre = kprog(T, K.C + 0.2, K.C + 0.8);
  const sube = kprog(T, K.C + 0.6, K.C + 2.6, kEase.sale);
  const celdaCierre = <Celda id="cc" x={540} y={980} w={220} h={300} T={T} nivel={0.12} sello={1 - abre} rastro={1}>
    <Pupa x={540} y={1010} h={150} o={1 - kprog(T, K.C + 0.5, K.C + 0.9)} />
  </Celda>;

  // ---------- la celda grande (celda → huevo → hongo → come) ----------
  const CX = 540, CY = 880, CW = 440, CH = 560;
  const nivel = kprog(T, K.Ce + 0.5, K.Ce + 3.2, kEase.suave);
  const sC = superficie(CY, CH, CW, Math.max(0.001, nivel));
  const huevoS = kprog(T, K.H + 0.8, K.H + 1.1, kEase.rebote) * (1 - kprog(T, K.Ho + 2.0, K.Ho + 2.4));
  const larvaR = 26 * kprog(T, K.Ho + 2.0, K.Ho + 2.6, kEase.sale) + 18 * kprog(T, K.Co, K.Co + 3.0);
  const sello = kprog(T, K.H + 2.0, K.H + 2.9, kEase.suave);
  const hongoG = kprog(T, K.Ho + 1.6, K.Ho + 4.2, kEase.sale);
  const comido = 0.85 * kprog(T, K.Co + 0.4, K.Co + 3.0);
  const oscuro = kprog(T, K.Ho - 0.2, K.Ho + 0.5);
  const zCo = 1 + 0.45 * kprog(T, K.Co, K.Co + 1.0, kEase.suave) * (1 - kprog(T, K.P - 0.3, K.P + 0.2));
  const dia = Math.min(3, Math.floor(kprog(T, K.Ho + 0.3, K.Ho + 2.0) * 3 + 0.0001));
  const reinaX = klerp(-200, 540, kprog(T, K.H, K.H + 0.7, kEase.sale)) + klerp(0, -800, kprog(T, K.H + 1.3, K.H + 2.0, kEase.suave));
  const obreraSello = kprog(T, K.H + 1.7, K.H + 2.0) * (1 - kprog(T, K.H + 2.9, K.H + 3.2));

  // ---------- resultados (2015): 5×5 pozos por grupo; vivas 19/25 = 76 % y 2/25 = 8 % ----------
  const VIVAS_CON = new Set([0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 21, 23]); // 19
  const VIVAS_SIN = new Set([7, 18]); // 2
  const rPozos = kprog(T, K.R + 0.2, K.R + 1.0);
  const rMueren = kprog(T, K.R + 1.3, K.R + 2.3);
  const rNum = kprog(T, K.R + 2.0, K.R + 2.9, kEase.sale);

  // ---------- México ----------
  const MXX = 210, MXY = 690, MXS = 0.9;
  const ESTADOS = [['Tamaulipas', -98.8, 24.2], ['San Luis Potosí', -100.4, 22.4], ['Hidalgo', -98.8, 20.5], ['Veracruz', -96.6, 19.4], ['Puebla', -97.9, 18.9],
    ['México', -99.7, 19.4], ['Morelos', -99.1, 18.75], ['Guerrero', -99.9, 17.5], ['Oaxaca', -96.6, 16.9], ['Chiapas', -92.7, 16.5]];
  const mxPant = (lon, lat) => { const [px, py] = mxProy(lon, lat); return [MXX + px * MXS, MXY + py * MXS]; };

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pelusa blanca en la celdita (la cámara entra desde el panal) */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={zoomEn(zG, 540, 980)}><Panal T={T} y={980} centro={celdaGancho} /></g>)}
      </Escena>

      {/* 2 · la abeja: obrera pequeña en el tubo de entrada de la colmena (esquemática) */}
      <Escena T={T} a={K.N} b={K.Ce} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <path d="M -40 860 Q 160 900 300 840 Q 330 980 300 1120 Q 160 1060 -40 1100 Z" fill={AC.cera} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <ellipse cx={300} cy={980} rx={50} ry={140} fill={AC.cera2} stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={300} cy={980} rx={26} ry={100} fill="#3a2614" />
          <Abeja T={T} x={klerp(380, 610, kprog(T, K.N + 0.1, K.N + 2.4, kEase.sale))} y={980 + Math.sin(T * 7) * 4} s={2.5} aleteo={0.3} />
        </>)}
      </Escena>

      {/* 3–6 · la celda grande: alimento → huevo → se sella → (por dentro) brota el hongo → la larva se lo come */}
      <Escena T={T} a={K.Ce} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:oscuro }}></div>
        {oscuro > 0 && <Ambiente T={T} n={18} o={oscuro} />}
        {fsvg(<g transform={zoomEn(zCo, 600, sC - 30)}>
          <Celda id="cgr" x={CX} y={CY} w={CW} h={CH} T={T} nivel={nivel} sello={sello} hongo={hongoG} comido={comido}>
            <Huevo x={CX - 10} y={sC - 14} s={huevoS * 1.7} />
            <Larva x={CX} y={sC - larvaR * 0.65} R={larvaR} muerde={T > K.Co ? (Math.sin(T * 11) + 1) / 2 : 0} />
          </Celda>
          {/* obrera que regurgita el alimento */}
          {T < K.H + 0.2 && <g opacity={kprog(T, K.Ce, K.Ce + 0.4) * (1 - kprog(T, K.H - 0.2, K.H + 0.2))}>
            <Goteo T={T} x={CX + 4} y0={CY - CH / 2 + 40} y1={sC} cada={0.35} desde={K.Ce + 0.5} hasta={K.Ce + 3.0} color={AC.comida} r={11} />
            <Abeja T={T} x={CX - 30} y={CY - CH / 2 - 30} s={1.5} rot={60} aleteo={0.2} />
          </g>}
          {/* la reina llega, pone el huevo y se va */}
          {T > K.H - 0.1 && T < K.H + 2.2 && <Abeja T={T} x={reinaX} y={CY - CH / 2 - 70} s={1.5} rot={35} reina aleteo={0.2} />}
          {/* una obrera sella la celda */}
          {obreraSello > 0 && <g opacity={obreraSello}><Abeja T={T} x={CX + klerp(-150, 150, sello)} y={CY - CH / 2 - 60} s={1.2} rot={10} aleteo={0.15} /></g>}
        </g>)}
      </Escena>

      {/* 7 · re-gancho: ¿y si le quitas el hongo? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Celda id="p1" x={170} y={1010} w={200} h={270} T={T} nivel={1} hongo={1}><Larva x={170} y={superficie(1010, 270, 200, 1) - 18} R={28} /></Celda>
          <Celda id="p2" x={410} y={1010} w={200} h={270} T={T} nivel={1} hongo={1 - kprog(T, K.P + 0.2, K.P + 0.9)}><Larva x={410} y={superficie(1010, 270, 200, 1) - 18} R={28} /></Celda>
          <g opacity={kprog(T, K.P + 0.8, K.P + 1.0)} transform={`translate(410 ${superficie(1010, 270, 200, 1) - 70})`}><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>
          <Interrogacion T={T} x={290} y={800} tam={360} />
        </>)}
      </Escena>

      {/* 8 · el experimento de 2015: larvas en pozos con comida esterilizada */}
      <Escena T={T} a={K.E} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg((() => { const ll = Math.floor(kprog(T, K.E + 2.4, K.E + 3.8) * 40); const c = Math.min(39, ll), cx = 140 + (c % 10) * 80 + 40, cy = 830 + Math.floor(c / 10) * 80 + 40;
          return <>
            <Placa x={140} y={830} llenos={ll} larvas={Math.floor(kprog(T, K.E + 3.8, K.E + 4.5) * 40)} />
            {T > K.E + 2.2 && T < K.E + 4.0 && <g transform={`translate(${cx} ${cy - 30 - Math.abs(Math.sin(T * 9)) * 18})`}>
              <path d="M -16 -300 L 16 -300 L 12 -60 L 4 0 L -4 0 L -12 -60 Z" fill="#e8eef4" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
              <rect x={-30} y={-350} width={60} height={60} rx={12} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
            </g>}
          </>; })())}
      </Escena>

      {/* 9 · resultado 2015: con hongo 76 % · sin hongo 8 % (supervivencia de larvas) */}
      <Escena T={T} a={K.R} b={K.Er} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[[110, 'con hongo', VIVAS_CON, 76, KC.blue], [600, 'sin hongo', VIVAS_SIN, 8, KC.red]].map(([gx, tit, vivas, pct, col], gi) => <g key={gi}>
            <TxtS x={gx + 165} y={688} tam={42}>{tit}</TxtS>
            <rect x={gx - 10} y={712} width={350} height={336} rx={24} fill="#f4f7fa" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 25 }, (_, i) => { const cx = gx + 37 + (i % 5) * 64, cy = 746 + Math.floor(i / 5) * 64, aparece = kclamp(rPozos * 25 - i * 0.6, 0, 1); const viva = vivas.has(i);
              return <g key={i} opacity={aparece}><circle cx={cx} cy={cy} r={27} fill={AC.comida} stroke={KC.ink} strokeWidth={4} />
                {gi === 0 && <g>{[0, 1, 2, 3].map((q) => <path key={q} d={`M ${cx - 20 + q * 12} ${cy - 22} q 3 -10 0 -16`} stroke="#fff" strokeWidth={3} fill="none" />)}</g>}
                <Larva x={cx} y={cy + 2} R={klerp(15, viva ? 16 : 11, rMueren)} gris={!viva && rMueren > 0.5} /></g>; })}
            <text x={gx + 165} y={1150} textAnchor="middle" opacity={rNum} style={{ font:`400 104px ${KF.titulo}` }} fill={col} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">{Math.round(pct * rNum)} %</text>
          </g>)}
        </>)}
      </Escena>

      {/* 10 · 2018, USP Ribeirão Preto: el hongo le da ergosterol (al microscopio, esquemático) */}
      <Escena T={T} a={K.Er} b={K.Pu} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <Levaduras T={T} x={260} y={1000} s={1.0} g={kprog(T, K.Er + 2.2, K.Er + 3.4)} gotas={kprog(T, K.Er + 2.8, K.Er + 3.4)} brilloGotas={kprog(T, K.Er + 3.2, K.Er + 3.8)} />
          <Esterol x={190} y={720} s={0.75} p={kprog(T, K.Er + 3.4, K.Er + 4.0)} />
        </>)}
      </Escena>

      {/* 11 · ergosterol → hormonas de la muda → pupa · barras 2018 (llegaron a pupa) */}
      <Escena T={T} a={K.Pu} b={K.L} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Esterol x={110} y={680} s={0.42} p={kprog(T, K.Pu + 0.1, K.Pu + 0.5)} color={KC.ink} />
          {[[300, 690], [700, 690]].map(([ax, ay], i) => { const p = kprog(T, K.Pu + 0.4 + i * 0.6, K.Pu + 0.8 + i * 0.6); return p > 0 ? <path key={i} d={`M ${ax - 40} ${ay} L ${ax - 40 + 80 * p} ${ay}`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" markerEnd="" /> : null; })}
          {[[340, 690], [740, 690]].map(([ax, ay], i) => kprog(T, K.Pu + 0.8 + i * 0.6, K.Pu + 0.9 + i * 0.6) > 0 ? <path key={'p' + i} d={`M ${ax - 18} ${ay - 16} L ${ax + 2} ${ay} L ${ax - 18} ${ay + 16}`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null)}
          <Larva x={880} y={700} R={46 * (1 - kprog(T, K.Pu + 1.6, K.Pu + 2.2))} />
          <Pupa x={880} y={690} h={170} o={kprog(T, K.Pu + 1.8, K.Pu + 2.4)} />
          {[['con hongo', 71, KC.blue], ['con ergosterol (2.5 µM)', 65, KC.gold], ['sin hongo ni esterol', 8, KC.red]].map(([t, v, c], i) => {
            const y = 870 + i * 105, g = kprog(T, K.Pu + 1.4 + i * 0.35, K.Pu + 2.2 + i * 0.35, kEase.sale);
            return <g key={i} opacity={kprog(T, K.Pu + 1.3 + i * 0.35, K.Pu + 1.5 + i * 0.35)}>
              <TxtS x={90} y={y - 14} tam={30} anchor="start" fuente={KF.mono} peso={700}>{t}</TxtS>
              <rect x={90} y={y} width={Math.max(8, 9.2 * v * g)} height={46} rx={10} fill={c} stroke={KC.ink} strokeWidth={5} />
              <TxtS x={90 + Math.max(8, 9.2 * v * g) + 18} y={y + 40} tam={44} anchor="start" fuente={KF.titulo} peso={400}>{Math.round(v * g)} %</TxtS>
            </g>; })}
        </>)}
      </Escena>

      {/* 12 · el giro: no es moho, es una levadura que crece en hilitos (pseudohifas) */}
      <Escena T={T} a={K.L} b={K.M} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<Levaduras T={T} x={470} y={1040} s={1.0} g={kprog(T, K.L + 0.2, K.L + 2.6)} gotas={1} brilloGotas={0.4} />)}
      </Escena>

      {/* 13 · México: su prima Scaptotrigona mexicana (catálogo Moure: 10 estados, de Tamaulipas a Chiapas) */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMexico x={MXX} y={MXY} ancho={1000 * MXS} conCA={false} />
          {ESTADOS.map(([n, lon, lat], i) => { const [sx, sy] = mxPant(lon, lat); const p = kprog(T, K.M + 0.8 + i * 0.16, K.M + 1.2 + i * 0.16, kEase.rebote); if (p <= 0) return null;
            const hx = Array.from({ length: 6 }, (_, j) => { const t = (j * 60 - 30) * Math.PI / 180; return `${(sx + 17 * p * Math.cos(t)).toFixed(1)} ${(sy + 17 * p * Math.sin(t)).toFixed(1)}`; }).join(' L ');
            return <path key={n} d={`M ${hx} Z`} fill={KC.gold} stroke={KC.ink} strokeWidth={4} />; })}
        </>)}
      </Escena>

      {/* 14 · cierre: la misma celdita del inicio, ahora sale una abeja adulta */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<g transform={zoomEn(1.7, 540, 980)}>
          <Panal T={T} y={980} centro={<>
            {celdaCierre}
            {sube > 0 && <Abeja T={T} x={540 + Math.sin(T * 3) * 3} y={klerp(940, 770, sube)} s={1.05} rot={-90} aleteo={kprog(T, K.C + 2.0, K.C + 2.6)} />}
          </>} />
        </g>)}
      </Escena>

      {/* ---------- textos en pantalla ---------- */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.3} until={K.G + 3.6} texto="¿se echó a perder?" x={330} y={430} tam={46} />
      <Etq T={T} at={K.G + 2.6} until={K.N - 0.3} x={325} y={938} lado="izq" texto="comida" tam={34} color={KC.ink} />
      <Etq T={T} at={K.G + 3.0} until={K.N - 0.3} x={640} y={1060} texto="larva" tam={34} color={KC.ink} />
      <Caja T={T} at={K.N + 0.2} until={K.Ce - 0.3} x={50} y={410}><i>Scaptotrigona depilis</i></Caja>
      <Chip T={T} at={K.N + 0.8} until={K.Ce - 0.3} texto="Brasil · mandaguari" x={300} y={560} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.N + 1.6} until={K.Ce - 0.3} x={1040} y={840} lado="izq" texto="abeja sin aguijón" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ce + 0.3} until={K.H - 0.3} texto="celda de cerumen: cera + resina" x={540} y={440} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ce + 1.6} until={K.H - 0.3} x={325} y={1110} lado="izq" texto="alimento" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ce + 2.0} until={K.H - 0.3} texto="alimento azucarado" x={540} y={1540} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.H + 1.0} until={K.Ho - 0.3} x={775} y={sC - 18} texto="huevo" tam={34} color={KC.ink} />
      <Chip T={T} at={K.H + 2.2} until={K.Ho - 0.3} texto="se sella" x={330} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Ho + 0.2} until={K.Co - 0.3} texto="POR DENTRO · esquemático" x={540} y={440} tam={32} borde={KC.gold} mono />
      {T >= K.Ho + 0.2 && T < K.Co - 0.1 && <div style={{ position:'absolute', left:540, top:530, zIndex:42, transform:'translate(-50%,-50%)', opacity:kprog(T, K.Ho + 0.2, K.Ho + 0.5) * (1 - kprog(T, K.Co - 0.4, K.Co - 0.1)),
        font:`700 52px ${KF.mono}`, color:KC.texto, background:'rgba(0,0,0,.6)', border:`3px solid ${KC.texto}`, borderRadius:14, padding:'4px 26px' }}>día {dia}</div>}
      <Etq T={T} at={K.Ho + 3.0} until={K.Co - 0.3} x={770} y={sC - 30} texto="hongo" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ho + 3.0} until={K.Co - 0.3} x={315} y={sC - 30} lado="izq" texto="pelusa" tam={34} color={KC.texto} />
      <Chip T={T} at={K.Co + 0.2} until={K.P - 0.3} texto="larva de 3 días" x={330} y={470} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Co + 1.0} until={K.P - 0.3} x={600 + (CX + larvaR * 0.475 - 600) * zCo + 30} y={(sC - 30) + (sC - larvaR * 1.05 - (sC - 30)) * zCo - 10} texto="mandíbulas" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="2015" quien="Menezes y colaboradores" revista="Current Biology" x={540} y={610} />
      <Chip T={T} at={K.E + 2.8} until={K.R - 0.3} texto="comida esterilizada" x={540} y={560} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.E + 3.4} until={K.R - 0.3} x={140} y={790} texto="huevos → larvas en cada pozo" tam={28} color={KC.ink} />
      <Chip T={T} at={K.R + 0.2} until={K.Er - 0.3} texto="supervivencia de larvas · 2015" x={360} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.R + 0.6} until={K.Er - 0.3} x={90} y={545} texto="esquema: 25 pozos = 100 %" tam={26} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.Er + 0.2} until={K.Er + 2.3} anio="2018" quien="Universidad de São Paulo · Ribeirão Preto" revista="Paludo, Pupo y colaboradores · Scientific Reports" x={540} y={640} />
      <Chip T={T} at={K.Er + 2.4} until={K.Pu - 0.3} texto="AL MICROSCOPIO · esquemático" x={360} y={470} tam={28} borde={KC.gold} mono />
      <Etq T={T} at={K.Er + 3.3} until={K.Pu - 0.3} x={1040} y={860} lado="izq" texto="gotitas de grasa" tam={30} color={AC.grasa} />
      <Etq T={T} at={K.Er + 3.8} until={K.Pu - 0.3} x={60} y={820} texto="ergosterol" tam={36} color={KC.gold2} />
      <Chip T={T} at={K.Pu + 0.2} until={K.L - 0.3} texto="llegaron a pupa · 2018" x={540} y={470} tam={36} borde={KC.ink} />
      {kvisible(T, K.Pu + 1.0, K.L - 0.3) && <div style={{ position:'absolute', left:500, top:690, zIndex:42, transform:'translate(-50%,-50%)', opacity:kentrada(T, K.Pu + 1.0, K.L - 0.3).o,
        background:KC.paper, border:`4px solid ${KC.ink}`, borderRadius:14, padding:'6px 16px', font:`700 28px/1.15 ${KF.mono}`, color:KC.ink, textAlign:'center' }}>hormonas<br />de la muda</div>}
      <Etq T={T} at={K.Pu + 2.4} until={K.L - 0.3} x={950} y={800} lado="izq" texto="pupa" tam={32} color={KC.ink} />
      <Caja T={T} at={K.L + 0.2} until={K.M - 0.3} x={540} y={385} centro tachar={K.L + 1.0} tam={34}>moho (<i>Monascus</i>, 2015)</Caja>
      <Caja T={T} at={K.L + 1.5} until={K.M - 0.3} x={540} y={470} centro tam={32}>levadura · <i>Zygosaccharomyces</i> sp. (2018)</Caja>
      <Etq T={T} at={K.L + 2.4} until={K.M - 0.3} x={1050} y={640} lado="izq" texto="hilitos (pseudohifas)" tam={30} color={KC.texto} />
      <Caja T={T} at={K.M + 0.2} until={K.C - 0.3} x={50} y={410}><i>Scaptotrigona mexicana</i></Caja>
      <Chip T={T} at={K.M + 0.6} until={K.C - 0.3} texto="su prima · mismo género" x={300} y={560} tam={32} borde={KC.ink} />
      {(() => { const [tx, ty] = mxPant(-98.8, 24.2), [cx, cy] = mxPant(-92.7, 16.5); return <>
        <Etq T={T} at={K.M + 1.0} until={K.C - 0.3} x={tx + 22} y={ty} texto="Tamaulipas" tam={28} color={KC.ink} />
        <Etq T={T} at={K.M + 2.3} until={K.C - 0.3} x={cx + 22} y={cy} texto="Chiapas" tam={28} color={KC.ink} />
      </>; })()}
      <Etq T={T} at={K.M + 2.6} until={K.C - 0.3} x={60} y={650} texto="10 estados · catálogo Moure" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="hongo → ergosterol → abeja" x={360} y={470} tam={32} borde={KC.ink} />

      <BarraEscala T={T} at={K.G} until={K.Ou} texto="dibujo esquemático" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No se echó a perder: *es su comida.*" />
      <SubIt T={T} idx={1} at={K.N + 0.1} until={K.Ce - 0.1} texto="_Scaptotrigona depilis:_ *sin aguijón.*" />
      <SubIt T={T} idx={2} at={K.Ce + 0.1} until={K.H - 0.1} texto="Llenan la celdita de *alimento.*" />
      <SubIt T={T} idx={3} at={K.H + 0.1} until={K.Ho - 0.1} texto="Un huevo encima, y *se sella.*" />
      <SubIt T={T} idx={4} at={K.Ho + 0.1} until={K.Co - 0.1} texto="A los tres días brota *un hongo.*" />
      <SubIt T={T} idx={5} at={K.Co + 0.1} until={K.P - 0.1} texto="La larva *se lo come.*" />
      <SubIt T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si le quitas *el hongo?*" />
      <SubIt T={T} idx={7} at={K.E + 0.1} until={K.R - 0.1} texto="2015: larvas con *comida esterilizada.*" />
      <SubIt T={T} idx={8} at={K.R + 0.1} until={K.Er - 0.1} texto="Con hongo *76 %;* sin hongo, *8 %.*" />
      <SubIt T={T} idx={9} at={K.Er + 0.1} until={K.Pu - 0.1} texto="2018: el hongo da *ergosterol.*" />
      <SubIt T={T} idx={10} at={K.Pu + 0.1} until={K.L - 0.1} texto="Lo necesita para *volverse pupa.*" />
      <SubIt T={T} idx={11} at={K.L + 0.1} until={K.M - 0.1} texto="No es moho: *es una levadura.*" />
      <SubIt T={T} idx={12} at={K.M + 0.1} until={K.C - 0.1} texto="En México: *_Scaptotrigona mexicana._*" />
      <SubIt T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo que convierte a una larva *en abeja.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.Ce - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.H + 0.2, K.Ho - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Co + 0.3, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P - 0.1, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.R + 0.8, K.Er - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Er + 2.5, K.Pu - 0.5, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.L + 0.6, K.M - 0.4, 'avatar_11_sorprendido', 'grande-izq'],
        [K.M + 0.9, K.C - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="99" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AbejaHongoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AbejaHongoShot /></CompositionStage></div>;
}
window.AbejaHongoApp = AbejaHongoApp;
