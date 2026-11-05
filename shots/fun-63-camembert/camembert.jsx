// Shot Fungi Mati #63 · Esa cáscara blanca no es queso: es un hongo clonado (Penicillium camemberti) — NARRADO (N1 "Por dentro" + N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CB = { cas:'#fbfaf4', cas2:'#e9e3d3', casS:'#d8cfba', tiza:'#fbf6e6', crema:'#f3d98a', crema2:'#e8c66a', fresco:'#f3ead0',
  madera:'#c98b4a', madera2:'#a86c34', hoja:'#c9d2da', leche:'#fdfdf8', acido:'#ffe11a', nh3:'#7fe8ff', caseina:'#ff8a5c',
  fusco:'#3fa38f', biforme:'#9aa98a', gris:'#a7a9a0', verde:'#7fae6a', naranja:'#f0a35a' };

// Subtítulo con *resaltado* y _cursiva_ (nombres científicos). Misma caja y lugar que Subtitulo del kit.
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 64 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, cur = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: cur ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:940, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Nota: caja de texto que sí parte renglones (para frases largas). x, y = centro.
function Nota({ T, at, until, x = KW / 2, y, ancho = 820, tam = 32, borde = KC.gold, children }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, width:ancho, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:'rgba(14,15,18,.86)', color:KC.texto, border:`4px solid ${borde}`, borderRadius:26, padding:'14px 26px', font:`800 ${tam}px/1.25 ${KF.texto}`, textAlign:'center', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>{children}</div>;
}

// Rueda de queso (cilindro visto un poco desde arriba). Centro de la cara de arriba en (x, y). pelusa 0..1 = corteza blanca.
// base = color sin corteza (queso fresco). manchas = mohos de colores (años 50).
function Rueda({ T = 0, x, y, rx = 250, ry = 80, h = 140, pelusa = 1, base = CB.fresco, seed = 3, manchas, rot = 0 }) {
  const g = krng(seed), lado = mixHex(base, CB.cas2, pelusa), arriba = mixHex(base, CB.cas, pelusa);
  const pelos = Array.from({ length: 70 }, () => ({ a: g() * Math.PI * 2, r: 0.15 + g() * 0.85, l: 6 + g() * 10, k: g() }));
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <ellipse cx={0} cy={h + 26} rx={rx * 1.04} ry={ry * 0.7} fill="rgba(0,0,0,.22)" />
    <path d={`M ${-rx} 0 L ${-rx} ${h} A ${rx} ${ry} 0 0 0 ${rx} ${h} L ${rx} 0 Z`} fill={lado} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-0.8, -0.55, -0.3, 0, 0.3, 0.55, 0.8].map((u, i) => <path key={i} d={`M ${u * rx} ${ry * Math.sqrt(1 - u * u) + 8} L ${u * rx} ${h + ry * Math.sqrt(1 - u * u) - 10}`} stroke={CB.casS} strokeWidth={4} opacity={0.5 * pelusa} />)}
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={arriba} stroke={KC.ink} strokeWidth={7} />
    {pelusa > 0.05 && pelos.map((p, i) => { const px = Math.cos(p.a) * rx * p.r, py = Math.sin(p.a) * ry * p.r;
      return <line key={i} x1={px} y1={py} x2={px + Math.cos(p.k * 6) * p.l * 0.5} y2={py - p.l * 0.6} stroke={CB.casS} strokeWidth={3} strokeLinecap="round" opacity={pelusa * 0.7 * (0.6 + 0.4 * Math.sin(T * 2 + i))} />; })}
    {manchas && manchas.map(([u, v, r, c], i) => <ellipse key={i} cx={u * rx} cy={v * ry} rx={r * rx} ry={r * ry} fill={c} opacity=".85" />)}
    <path d={`M ${-rx * 0.6} ${-ry * 0.55} Q 0 ${-ry * 0.95} ${rx * 0.55} ${-ry * 0.6}`} stroke="#fff" strokeWidth={9} fill="none" opacity={0.6 * pelusa} strokeLinecap="round" />
  </g>;
}
// Corte (sección) de queso: corteza blanca alrededor; la pasta madura (cremosa) avanza desde la orilla hacia el centro.
// madurez 0..1 · lados = qué orillas tienen corteza ('todo' | 'arriba'). escurre 0..1 = la crema se sale un poquito.
function Corte({ x, y, w, h, rind = 16, madurez = 0, lados = 'todo', escurre = 0, fuzz = 1, T = 0, seed = 9 }) {
  const g = krng(seed), mx = (w / 2 - rind), my = (h / 2 - rind), d = kclamp(madurez, 0, 1) * Math.min(mx, my) * 0.82;
  const ix = lados === 'todo' ? rind + d : 0, iy = rind + d, iw = w - ix * 2, ih = lados === 'todo' ? h - iy * 2 : h - iy;
  const pelos = Array.from({ length: Math.round(w / 9) }, (_, i) => ({ u: i / Math.round(w / 9), l: 8 + g() * 12, k: g() }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={lados === 'todo' ? 22 : 0} fill={CB.cas} stroke={KC.ink} strokeWidth={7} />
    <rect x={lados === 'todo' ? rind : 0} y={rind} width={lados === 'todo' ? w - rind * 2 : w} height={lados === 'todo' ? h - rind * 2 : h - rind} rx={lados === 'todo' ? 12 : 0} fill={madurez > 0.02 ? CB.crema : CB.tiza} />
    {madurez > 0.02 && iw > 4 && ih > 4 && <rect x={ix} y={iy} width={iw} height={ih} rx={14} fill={CB.tiza} stroke={CB.crema2} strokeWidth={4} />}
    {madurez > 0.02 && iw > 4 && ih > 4 && Array.from({ length: 16 }, (_, i) => { const k = krng(seed + i); return <circle key={i} cx={ix + 10 + k() * (iw - 20)} cy={iy + 10 + k() * Math.max(1, ih - 20)} r={3 + k() * 5} fill="#efe6cc" />; })}
    {fuzz > 0 && pelos.map((p, i) => <line key={i} x1={p.u * w} y1={2} x2={p.u * w + (p.k - 0.5) * 8} y2={-p.l * fuzz} stroke={CB.cas} strokeWidth={4} strokeLinecap="round" opacity={0.8 + 0.2 * Math.sin(T * 2 + i)} />)}
    {escurre > 0 && <path d={`M ${w - 4} ${h * 0.35} Q ${w + 30 * escurre} ${h * 0.45} ${w + 22 * escurre} ${h * 0.5 + 60 * escurre} Q ${w + 6} ${h * 0.62 + 50 * escurre} ${w - 4} ${h * 0.62} Z`} fill={CB.crema} stroke={KC.ink} strokeWidth={5} />}
    <rect x={0} y={0} width={w} height={h} rx={lados === 'todo' ? 22 : 0} fill="none" stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Cuchillo de queso (hoja + mango). Punta abajo en (x, y).
function Cuchillo({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -10 0 L -30 -330 L 30 -330 L 30 -40 Q 22 0 -10 0 Z" fill="#dfe6ec" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={-16} y1={-300} x2={-4} y2={-30} stroke="#fff" strokeWidth={6} opacity=".7" />
    <rect x={-36} y={-500} width={72} height={175} rx={18} fill="#3b2a20" stroke={KC.ink} strokeWidth={7} />
    {[-460, -400].map((yy) => <circle key={yy} cx={0} cy={yy} r={8} fill="#c9b08a" />)}
  </g>;
}
// Tabla de madera (vista un poco desde arriba).
function Tabla({ x, y, rx = 430, ry = 120 }) {
  return <g><ellipse cx={x} cy={y + 18} rx={rx} ry={ry} fill={CB.madera2} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={CB.madera} stroke={KC.ink} strokeWidth={7} />
    {[0.75, 0.5, 0.25].map((k, i) => <ellipse key={i} cx={x} cy={y} rx={rx * k} ry={ry * k} fill="none" stroke={CB.madera2} strokeWidth={4} opacity=".6" />)}</g>;
}
// Tina de leche (de lado). Base en (x, y).
function Tina({ x, y, w = 320, h = 230, gota = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-w / 2} ${-h} L ${-w / 2 + 16} 0 L ${w / 2 - 16} 0 L ${w / 2} ${-h} Z`} fill={CB.hoja} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <line x1={-w / 2 + 30} y1={-h + 30} x2={-w / 2 + 40} y2={-20} stroke="#fff" strokeWidth={8} opacity=".6" />
    <ellipse cx={0} cy={-h} rx={w / 2} ry={34} fill={CB.leche} stroke={KC.ink} strokeWidth={7} />
    {gota > 0 && <ellipse cx={0} cy={-h} rx={w * 0.4 * gota} ry={28 * gota} fill="none" stroke="#c9d6c4" strokeWidth={4} opacity={1 - gota * 0.7} />}
  </g>;
}
// Botella de leche cruda. Base en (x, y).
function Botella({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 0 L -90 -230 Q -90 -280 -50 -300 L -40 -370 L 40 -370 L 50 -300 Q 90 -280 90 -230 L 90 0 Z" fill="rgba(220,240,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <path d="M -80 -10 L -80 -215 Q -80 -262 -44 -280 L 44 -280 Q 80 -262 80 -215 L 80 -10 Z" fill={CB.leche} />
    <rect x={-46} y={-400} width={92} height={36} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-74} y={-190} width={148} height={90} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-150} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>LECHE</text>
    <text x={0} y={-118} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>CRUDA</text>
  </g>;
}
// Penicilio (conidióforo en pincel) de Penicillium: tallo de pared rugosa → ramas → métulas → fiálides → cadenas de conidios
// casi redondos (4–5 µm). Base en (x, y), alto L. crece 0..1, esporas 0..1 = cuántas hay en cada cadena, apagado 0..1.
function Penicilio({ T = 0, x, y, L = 360, s = 1, crece = 1, esporas = 1, apagado = 0, color = '#f4f1e8', rot = 0, seed = 2, r = 11 }) {
  if (crece <= 0) return null;
  const tallo = L * kEase.sale(kclamp(crece * 1.6, 0, 1)), br = kclamp(crece * 2.2 - 1.0, 0, 1);
  const g = krng(seed), bultos = Array.from({ length: Math.floor(tallo / 22) }, (_, i) => ({ y: -12 - i * 22, k: g() }));
  const ramas = [];
  [-26, 0, 26].forEach((a1, i) => { const a = a1 * Math.PI / 180, l1 = 44 * br, x1 = Math.sin(a) * l1, y1 = -tallo - Math.cos(a) * l1;
    [-14, 14].forEach((a2, j) => { const b = a + a2 * Math.PI / 180, l2 = 38 * br, x2 = x1 + Math.sin(b) * l2, y2 = y1 - Math.cos(b) * l2;
      [-9, 0, 9].forEach((a3, k) => { const c = b + a3 * Math.PI / 180, l3 = 30 * br, x3 = x2 + Math.sin(c) * l3, y3 = y2 - Math.cos(c) * l3;
        ramas.push({ x1, y1, x2, y2, x3, y3, c, id: i * 6 + j * 3 + k }); }); }); });
  const col = mixHex(color, '#6b6f78', apagado * 0.6);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={1 - apagado * 0.35}>
    <path d={`M 0 0 L 0 ${-tallo}`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M 0 0 L 0 ${-tallo}`} stroke={col} strokeWidth={13} strokeLinecap="round" />
    {bultos.map((b, i) => <circle key={i} cx={(b.k > 0.5 ? 6 : -6)} cy={b.y} r={3} fill="#c9c2b0" />)}
    {br > 0 && ramas.map((q) => <g key={q.id}>
      {q.id % 3 === 1 && q.id % 6 < 3 && <path d={`M 0 ${-tallo} L ${q.x1} ${q.y1}`} stroke={col} strokeWidth={11} strokeLinecap="round" />}
      {q.id % 3 === 1 && <path d={`M ${q.x1} ${q.y1} L ${q.x2} ${q.y2}`} stroke={col} strokeWidth={9} strokeLinecap="round" />}
      <path d={`M ${q.x2} ${q.y2} L ${q.x3} ${q.y3}`} stroke={col} strokeWidth={7} strokeLinecap="round" />
    </g>)}
    {br > 0.6 && ramas.map((q) => { const n = Math.round(6 * esporas * kclamp((br - 0.6) * 2.5, 0, 1)); return Array.from({ length: n }, (_, m) => {
      const d = r * 1.9 * (m + 0.6), cx = q.x3 + Math.sin(q.c) * d + Math.sin(T * 1.2 + q.id + m) * 1.5, cy = q.y3 - Math.cos(q.c) * d;
      return <ellipse key={q.id + '-' + m} cx={cx} cy={cy} rx={r} ry={r * 0.9} fill={mixHex('#f2f6ee', '#5b6070', apagado)} stroke={KC.ink} strokeWidth={3} transform={`rotate(${q.c * 57} ${cx} ${cy})`} />; }); })}
  </g>;
}
// Pedacitos de caseína: cadena de cuentas que las tijeras (enzimas) cortan. corte 0..1.
function Caseina({ x, y, n = 12, corte = 0, cortes = [3, 7, 10], T = 0, seed = 1 }) {
  let off = 0;
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: n }, (_, i) => { if (cortes.includes(i)) off += 26 * corte; const cx = i * 58 + off, cy = Math.sin(i * 0.9 + T * 1.5 + seed) * 10;
      const sig = i < n - 1 && !cortes.includes(i + 1) ? <line x1={cx} y1={cy} x2={cx + 58} y2={Math.sin((i + 1) * 0.9 + T * 1.5 + seed) * 10} stroke={CB.caseina} strokeWidth={7} /> : (i < n - 1 ? <line x1={cx} y1={cy} x2={cx + 58 * (1 - corte)} y2={cy} stroke={CB.caseina} strokeWidth={7} opacity={1 - corte} /> : null);
      return <g key={i}>{sig}<circle cx={cx} cy={cy} r={20} fill={CB.caseina} stroke={KC.ink} strokeWidth={4} /></g>; })}
  </g>;
}
// Tijeritas (enzima proteasa): abre/cierra.
function Tijera({ x, y, abre = 0.5, s = 1, rot = 0 }) {
  const a = 8 + 22 * abre;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 56 -6 L 56 6 Z" fill="#e8f0ff" stroke={KC.ink} strokeWidth={4} /><circle cx={-18} cy={-8} r={12} fill="none" stroke={KC.mint} strokeWidth={6} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 56 -6 L 56 6 Z" fill="#e8f0ff" stroke={KC.ink} strokeWidth={4} /><circle cx={-18} cy={8} r={12} fill="none" stroke={KC.mint} strokeWidth={6} /></g>
    <circle r={5} fill={KC.ink} />
  </g>;
}
// Colonia de Penicillium vista desde arriba en una cajita: color + borde algodonoso.
function ColoniaCaja({ x, y, r = 70, color, p = 1, seed = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))})`}>
    <circle r={r + 12} fill="rgba(255,255,255,.4)" stroke={KC.ink} strokeWidth={5} />
    <circle r={r} fill="#f5e7b8" stroke={KC.ink} strokeWidth={3} />
    <Colonia cx={0} cy={0} r={r * 0.75} color={color} seed={seed} />
    <circle r={r * 0.25} fill={mixHex(color, '#ffffff', 0.35)} opacity=".8" />
  </g>;
}

const MANCHAS50 = [[[-0.3, -0.1, 0.22, CB.gris], [0.35, 0.2, 0.18, CB.gris]], [[0.0, 0.0, 0.3, CB.verde], [-0.4, 0.3, 0.12, CB.verde]], [[0.2, -0.2, 0.2, CB.naranja], [-0.3, 0.25, 0.14, CB.gris]]];

function CamembertShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, S: CUES.Siembra, Pi: CUES.Pinceles, A: CUES.Acido, E: CUES.Enzimas, AA: CUES.AfueraAdentro, P: CUES.Pregunta,
    Es: CUES.Estudio, M: CUES.Mutante, Ep: CUES.Esporas, B: CUES.Biforme, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const corta = kprog(T, K.G + 0.1, K.G + 0.7, kEase.sale);          // el cuchillo baja
  const saca = kprog(T, K.G + 0.8, K.G + 1.6, kEase.sale);           // sale la rebanada
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: cortan el camembert; la cáscara blanca se ve de lado */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={330} y={860} rx={300} ry={95} />
          <Rueda T={T} x={330} y={690} rx={230} ry={72} h={110} />
          <Corte T={T} x={150 + saca * 40} y={890 + saca * 60} w={420} h={110} rind={14} madurez={0.25} />
          {T < K.G + 1.4 && <g opacity={1 - kprog(T, K.G + 1.0, K.G + 1.4)}><Cuchillo x={430 + corta * 10} y={klerp(420, 790, corta)} rot={-6} s={0.85} /></g>}
        </>)}
      </Escena>
      {/* 2 · nombre: camembert y brie, la misma cáscara */}
      <Escena T={T} a={K.N} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rueda T={T} x={250} y={820} rx={110} ry={34} h={70} seed={5} />
          <Rueda T={T} x={560} y={1060} rx={350} ry={100} h={70} seed={8} />
        </>)}
      </Escena>
      {/* 3 · siembra: esporas en la leche o sobre el queso fresco; crece la pelusa (día 1 → 7) */}
      <Escena T={T} a={K.S} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Tina x={250} y={1010} gota={kprog(T, K.S + 0.9, K.S + 1.8)} />
          {Array.from({ length: 22 }, (_, i) => { const k = krng(i + 3), t0 = K.S + 0.2 + k() * 0.4, u = kprog(T, t0, t0 + 0.8); return u > 0 && u < 1 ? <circle key={i} cx={250 + (k() - 0.5) * 120} cy={500 + u * 290} r={6} fill="#e9efe2" stroke={KC.ink} strokeWidth={2} /> : null; })}
          <Rueda T={T} x={760} y={840} rx={180} ry={56} h={90} pelusa={kprog(T, K.S + 2.0, K.S + 4.6)} seed={11} />
          {/* boquilla que rocía */}
          <g opacity={kprog(T, K.S + 1.2, K.S + 1.5) * (1 - kprog(T, K.S + 2.8, K.S + 3.1))}>
            <rect x={730} y={520} width={60} height={110} rx={12} fill="#8a96a3" stroke={KC.ink} strokeWidth={6} />
            <rect x={748} y={625} width={24} height={24} rx={5} fill="#5b6672" stroke={KC.ink} strokeWidth={4} />
            {Array.from({ length: 26 }, (_, i) => { const k = krng(i + 40), t0 = K.S + 1.5 + k() * 1.2, u = kprog(T, t0, t0 + 0.5); return u > 0 && u < 1 ? <circle key={i} cx={760 + (k() - 0.5) * 280 * u} cy={655 + u * 170} r={5} fill="#f2f6ee" stroke={KC.ink} strokeWidth={2} /> : null; })}
          </g>
        </>)}
      </Escena>
      {/* 4 · por dentro: hifas y pinceles de esporas (fondo oscuro) */}
      <Escena T={T} a={K.Pi} b={K.A} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <RedHifas T={T} x={540} y={1110} g={0.4 + 0.6 * kprog(T, K.Pi - 0.3, K.Pi + 1.2)} seed={5} n={260} escala={0.2} circ color="#f4f1e8" ancho={4} rot={-90} />
          <Penicilio T={T} x={240} y={1100} L={220} crece={kprog(T, K.Pi + 0.2, K.Pi + 1.8)} seed={3} />
          <Penicilio T={T} x={540} y={1100} L={260} crece={kprog(T, K.Pi + 0.5, K.Pi + 2.1)} seed={4} />
          <Penicilio T={T} x={820} y={1100} L={200} crece={kprog(T, K.Pi + 0.8, K.Pi + 2.4)} seed={6} rot={6} />
        </>)}
      </Escena>
      {/* 5 · el hongo se come el ácido de la orilla y suelta amoniaco */}
      <Escena T={T} a={K.A} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Corte T={T} x={90} y={660} w={900} h={420} rind={44} madurez={0} lados="arriba" fuzz={1.4} />
          {Array.from({ length: 26 }, (_, i) => { const k = krng(i + 70), x0 = 120 + k() * 840, y0 = 740 + k() * 340, cerca = y0 < 900;
            const sube = cerca ? kprog(T, K.A + 0.6 + k() * 2.4, K.A + 1.6 + k() * 2.4, kEase.suave) : 0;
            return sube < 1 ? <g key={i}><circle cx={x0} cy={klerp(y0, 690, sube)} r={14 * (1 - sube * 0.6)} fill={CB.acido} stroke={KC.ink} strokeWidth={3} opacity={1 - sube * 0.7} /></g> : null; })}
          {Array.from({ length: 18 }, (_, i) => { const k = krng(i + 120), x0 = 120 + k() * 840, t0 = K.A + 1.8 + k() * 2.6, u = kprog(T, t0, t0 + 1.6);
            return u > 0 ? <circle key={i} cx={x0 + Math.sin(T * 2 + i) * 6} cy={710 + u * 200} r={9} fill="none" stroke={CB.nh3} strokeWidth={4} opacity={1 - u * 0.6} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · las enzimas cortan las caseínas */}
      <Escena T={T} a={K.E} b={K.AA} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <RedHifas T={T} x={540} y={600} g={1} seed={9} n={200} escala={0.2} circ color="#f4f1e8" ancho={4} rot={90} />
          <Caseina x={110} y={780} corte={kprog(T, K.E + 0.6, K.E + 1.2)} T={T} seed={1} />
          <Caseina x={140} y={900} corte={kprog(T, K.E + 1.0, K.E + 1.6)} T={T} seed={2} cortes={[2, 6, 9]} />
          <Caseina x={100} y={1020} corte={kprog(T, K.E + 1.4, K.E + 2.0)} T={T} seed={3} cortes={[4, 8]} />
          {[[300, 780, 0.4], [520, 900, 0.8], [640, 1020, 1.2]].map(([tx, ty, d], i) => { const u = kprog(T, K.E + d - 0.4, K.E + d + 0.2, kEase.sale);
            return <Tijera key={i} x={klerp(tx - 40, tx, u)} y={klerp(660, ty - 46, u)} abre={0.5 + 0.5 * Math.sin(T * 14 + i)} rot={90} s={1.1} />; })}
        </>)}
      </Escena>
      {/* 7 · madura de afuera hacia adentro */}
      <Escena T={T} a={K.AA} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Corte T={T} x={90} y={660} w={900} h={320} rind={16} madurez={0.8 * kprog(T, K.AA + 0.4, K.AA + 3.6, kEase.suave)} />
          {[[540, 560, 540, 720], [540, 1080, 540, 920], [30, 820, 170, 820], [1050, 820, 910, 820]].map(([x1, y1, x2, y2], i) => <FlechaCurva key={i} x1={x1} y1={y1} x2={x2} y2={y2} curva={0} p={kprog(T, K.AA + 0.5 + i * 0.15, K.AA + 1.3 + i * 0.15)} color={KC.ink} grosor={10} T={T} />)}
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿y si se está desgastando? */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Rueda T={T} x={330} y={950} rx={230} ry={72} h={110} rot={Math.sin(T * 4) * 3} /><Interrogacion T={T} x={330} y={800} tam={340} /></>)}
      </Escena>
      {/* 9 · estudio 2020: leyeron su ADN; el blanco es un clon */}
      <Escena T={T} a={K.Es} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g opacity={kprog(T, K.Es + 0.9, K.Es + 1.3)}><ADNHebra T={T} x={140} y={730} largo={800} alto={60} vueltas={4} /></g>
          {(() => { const p1 = kprog(T, K.Es + 1.5, K.Es + 2.1, kEase.sale), p2 = kprog(T, K.Es + 2.0, K.Es + 2.6, kEase.sale), p3 = kprog(T, K.Es + 2.5, K.Es + 3.2, kEase.sale);
            const ln = (x1, y1, x2, y2, p) => <line x1={x1} y1={y1} x2={klerp(x1, x2, p)} y2={klerp(y1, y2, p)} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />;
            const tx = (x, y, t, p, it = true, tam = 26) => p > 0 ? <text x={x} y={y} textAnchor="middle" opacity={p} style={{ font:`700 ${tam}px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal' }} fill={KC.ink}>{t}</text> : null;
            return <>
              {ln(380, 1150, 380, 1090, p1)}{ln(380, 1090, 220, 920, p1)}{ln(380, 1090, 700, 1060, p2)}{ln(700, 1060, 560, 920, p2)}{ln(700, 1060, 860, 920, p3)}
              <ColoniaCaja x={220} y={860} r={50} color={CB.fusco} p={kprog(T, K.Es + 1.9, K.Es + 2.3)} seed={2} />
              <ColoniaCaja x={560} y={860} r={50} color={CB.biforme} p={kprog(T, K.Es + 2.4, K.Es + 2.8)} seed={3} />
              {[0, 1, 2].map((k) => <ColoniaCaja key={k} x={800 + k * 60} y={860 - k * 6} r={40} color="#fbfbf6" p={kprog(T, K.Es + 2.9 + k * 0.2, K.Es + 3.2 + k * 0.2)} seed={7} />)}
              {tx(220, 950, 'P. fuscoglaucum', kprog(T, K.Es + 2.0, K.Es + 2.3))}{tx(220, 980, 'silvestre', kprog(T, K.Es + 2.0, K.Es + 2.3), false, 22)}
              {tx(560, 950, 'P. biforme', kprog(T, K.Es + 2.5, K.Es + 2.8))}
              {tx(860, 950, 'P. camemberti', kprog(T, K.Es + 3.0, K.Es + 3.3))}{tx(860, 980, 'var. camemberti', kprog(T, K.Es + 3.0, K.Es + 3.3), true, 22)}
            </>; })()}
        </>)}
      </Escena>
      {/* 10 · un mutante blanco: 1898 brie, 1902 camembert; antes de los 50, mohos de colores */}
      <Escena T={T} a={K.M} b={K.Ep} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <line x1={90} y1={700} x2={kprog(T, K.M + 0.2, K.M + 1.4) * 900 + 90} y2={700} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
          {[[230, 0.8, '1898', 'brie'], [520, 2.0, '1902', 'camembert'], [860, 3.0, 'hoy', 'el mismo clon']].map(([cx, d, a, b], i) => { const p = kprog(T, K.M + d, K.M + d + 0.4, kEase.rebote);
            return p > 0 ? <g key={i} transform={`translate(${cx} 700) scale(${p})`}>
              <circle r={22} fill={KC.gold} stroke={KC.ink} strokeWidth={6} />
              <text y={-50} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{a}</text>
              <text y={70} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{b}</text>
            </g> : null; })}
          {[[230, 0.9, 1.25], [520, 2.1, 0.9], [860, 3.1, 0.9]].map(([cx, d, k], i) => kprog(T, K.M + d, K.M + d + 0.4) > 0 ? <Rueda key={i} T={T} x={cx} y={830} rx={110 * k} ry={34 * k} h={40} seed={20 + i} /> : null)}
          {MANCHAS50.map((mm, i) => kprog(T, K.M + 4.4 + i * 0.2, K.M + 4.8 + i * 0.2) > 0 ? <g key={i} opacity={kprog(T, K.M + 4.4 + i * 0.2, K.M + 4.8 + i * 0.2)}><Rueda T={T} x={250 + i * 290} y={1090} rx={110} ry={34} h={36} seed={30 + i} pelusa={0.55} manchas={mm} /></g> : null)}
        </>)}
      </Escena>
      {/* 11 · solo se copia: casi no hace esporas */}
      <Escena T={T} a={K.Ep} b={K.B} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {fsvg(<>
          <RedHifas T={T} x={540} y={1110} g={1} seed={5} n={220} escala={0.2} circ color="#d9d6cc" ancho={4} rot={-90} />
          <Penicilio T={T} x={540} y={1100} L={280} crece={1} esporas={klerp(1, 0.25, kprog(T, K.Ep + 0.3, K.Ep + 2.2))} apagado={kprog(T, K.Ep + 0.3, K.Ep + 2.2)} seed={4} />
        </>)}
      </Escena>
      {/* 12 · P. biforme: en la leche cruda, con mucha diversidad */}
      <Escena T={T} a={K.B} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Botella x={210} y={1150} s={1.05} />
          {[['#fbfbf6', 600, 800], [CB.biforme, 840, 800], ['#c9d0bd', 600, 1010], ['#7c8f78', 840, 1010], ['#aab8a2', 720, 905]].map(([c, cx, cy], i) =>
            <ColoniaCaja key={i} x={cx} y={cy} r={66} color={c} p={kprog(T, K.B + 0.6 + i * 0.25, K.B + 1.0 + i * 0.25)} seed={40 + i} />)}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma rueda del inicio, ya madura; sello del clon */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tabla x={330} y={860} rx={300} ry={95} />
          <Rueda T={T} x={330} y={690} rx={230} ry={72} h={110} />
          <Corte T={T} x={190} y={950} w={420} h={110} rind={14} madurez={klerp(0.25, 0.92, kprog(T, K.C + 0.3, K.C + 2.2, kEase.suave))} escurre={kprog(T, K.C + 1.8, K.C + 3.2, kEase.sale)} />
          <Sello T={T} at={K.C + 2.6} x={560} y={600} texto="CLON" color={KC.red} r={84} rot={-12} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.N - 0.3} texto="¿queso?" x={250} y={470} tam={50} />
      <Chip T={T} at={K.G + 1.9} until={K.N - 0.3} texto="hongo" x={250} y={580} tam={52} borde={KC.mint} />
      <Etq T={T} at={K.G + 1.7} until={K.N - 0.3} x={590} y={960} texto="cáscara blanca" tam={30} color={KC.ink} />
      <Etq T={T} at={K.N + 0.5} until={K.S - 0.3} x={60} y={500} texto="moho blanco" tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.S - 0.3} x={60} y={560} texto="Penicillium camemberti" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.N + 1.6} until={K.S - 0.3} texto="camembert" x={250} y={700} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.N + 2.2} until={K.S - 0.3} texto="brie" x={820} y={900} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.3} until={K.S + 2.6} texto="esporas" x={250} y={440} tam={34} borde={KC.mint} />
      <Etq T={T} at={K.S + 0.6} until={K.Pi - 0.3} x={110} y={1080} texto="leche" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 1.4} until={K.Pi - 0.3} x={600} y={1080} texto="queso fresco" tam={30} color={KC.ink} />
      {kvisible(T, K.S + 2.0, K.Pi - 0.3) && <Chip T={T} at={K.S + 2.0} until={K.Pi - 0.3} texto={`día ${Math.round(klerp(1, 7, kprog(T, K.S + 2.0, K.S + 4.6)))}`} x={760} y={440} tam={46} borde={KC.gold} mono />}
      <Chip T={T} at={K.Pi + 0.1} until={K.A - 0.3} texto="POR DENTRO · LA CÁSCARA" x={540} y={440} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pi + 0.6} until={K.A - 0.3} x={60} y={1130} texto="hifas" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Pi + 1.6} until={K.A - 0.3} x={520} y={1010} texto="tallo rugoso" lado="izq" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Pi + 2.0} until={K.A - 0.3} x={60} y={520} texto="pincel (conidióforo)" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Pi + 2.4} until={K.A - 0.3} x={60} y={566} texto="esporas (conidios)" tam={30} color={KC.texto} />
      <Chip T={T} at={K.A + 0.1} until={K.E - 0.3} texto="pH a los 16 días" x={540} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.A + 0.5} until={K.E - 0.3} x={60} y={620} texto="corteza: hongo" tam={28} color={KC.texto} />
      <Etq T={T} at={K.A + 0.9} until={K.E - 0.3} x={60} y={548} texto="● ácido láctico" tam={28} color={CB.acido} />
      <Etq T={T} at={K.A + 2.0} until={K.E - 0.3} x={560} y={548} texto="○ NH₃ amoniaco" tam={28} color={CB.nh3} />
      {kvisible(T, K.A + 1.4, K.E - 0.3) && <Chip T={T} at={K.A + 1.4} until={K.E - 0.3} texto={`orilla: pH 4.9 → ${klerp(4.9, 6.0, kprog(T, K.A + 1.6, K.A + 3.6)).toFixed(1)}`} x={540} y={940} tam={36} borde={KC.gold} mono />}
      <Chip T={T} at={K.A + 2.6} until={K.E - 0.3} texto="centro: pH ≈ 4.9" x={540} y={1040} tam={36} borde={KC.ink} mono />
      <Chip T={T} at={K.A + 3.4} until={K.E - 0.3} texto="con ayuda de otros microbios" x={540} y={1135} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.E + 0.3} until={K.AA - 0.3} x={60} y={520} texto="hifas del hongo" tam={28} color={KC.texto} />
      <Etq T={T} at={K.E + 0.7} until={K.AA - 0.3} x={60} y={1110} texto="caseínas (proteínas de la leche)" tam={28} color={CB.caseina} />
      <Etq T={T} at={K.E + 1.0} until={K.AA - 0.3} x={560} y={690} texto="proteasas (enzimas)" tam={28} color={KC.mint} />
      <Chip T={T} at={K.AA + 0.2} until={K.P - 0.3} texto="afuera → adentro" x={540} y={460} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.AA + 1.8} until={K.P - 0.3} x={110} y={610} texto="orilla cremosa" tam={30} color={KC.ink} />
      <Etq T={T} at={K.AA + 2.4} until={K.P - 0.3} x={120} y={1110} texto="centro blanco y más firme" tam={30} color={KC.ink} />
      <Chip T={T} at={K.P + 0.4} until={K.Es - 0.3} texto="la cepa se está desgastando" x={540} y={470} tam={40} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.1} until={K.M - 0.3} anio="2020" quien="CNRS · U. Paris-Saclay" revista="Current Biology, 2020" x={540} y={520} />
      <Chip T={T} at={K.Es + 3.4} until={K.M - 0.3} texto="clon: copias casi idénticas" x={540} y={1420} tam={28} borde={KC.gold} />
      <Chip T={T} at={K.M + 0.2} until={K.Ep - 0.3} texto="un mutante blanco" x={380} y={470} tam={44} borde={KC.ink} />
      <Nota T={T} at={K.M + 4.2} until={K.Ep - 0.3} x={540} y={985} ancho={900} tam={28} borde={KC.ink}>hasta los años 50, los camembert todavía tenían mohos grises, verdes y a veces anaranjados <span style={{ opacity:0.7 }}>(CNRS, 2024)</span></Nota>
      <Chip T={T} at={K.Ep + 0.2} until={K.B - 0.3} texto="solo se reproduce sin sexo (clonal)" x={540} y={470} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.Ep + 1.6} until={K.B - 0.3} texto="CNRS, 2024: «al borde de la extinción»" x={540} y={560} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Ep + 2.2} until={K.B - 0.3} texto="a la industria le cuesta conseguir esporas" x={540} y={1150} tam={28} borde={KC.gold} />
      <Etq T={T} at={K.B + 0.3} until={K.C - 0.3} x={60} y={500} texto="Penicillium biforme" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.B + 0.8} until={K.C - 0.3} x={60} y={555} texto="pariente cercano" tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 1.8} until={K.C - 0.3} texto="mucha diversidad" x={720} y={1130} tam={34} borde={KC.ink} />
      <Nota T={T} at={K.B + 2.8} until={K.C - 0.3} x={540} y={640} ancho={600} tam={26} borde={KC.mint}>algunos queseros ya ayudan al blanco con <i>Geotrichum candidum</i></Nota>
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="hongo ✓" x={250} y={470} tam={52} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={210} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.S} texto="10 cm" largo={200} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.Pi} texto="5 cm" largo={160} color={KC.ink} />
      <BarraEscala T={T} at={K.Pi} until={K.A} texto="10 µm" largo={49} />
      <BarraEscala T={T} at={K.A} until={K.E} texto="1 cm" largo={225} />
      <BarraEscala T={T} at={K.E} until={K.AA} texto="no a escala" largo={0} />
      <BarraEscala T={T} at={K.AA} until={K.P} texto="1 cm" largo={82} color={KC.ink} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="5 cm" largo={210} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.Ep} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.Ep} until={K.B} texto="10 µm" largo={49} />
      <BarraEscala T={T} at={K.B} until={K.C} texto="esquemático" largo={0} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={210} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Esa cáscara blanca *es un hongo.*" />
      <SubIt T={T} idx={1} at={K.N + 0.1} until={K.S - 0.1} texto="_Penicillium camemberti:_ *camembert y brie.*" />
      <SubIt T={T} idx={2} at={K.S + 0.1} until={K.Pi - 0.1} texto="Sus esporas… y crece *una pelusa blanca.*" />
      <SubIt T={T} idx={3} at={K.Pi + 0.1} until={K.A - 0.1} texto="Hifas con *pinceles de esporas.*" />
      <SubIt T={T} idx={4} at={K.A + 0.1} until={K.E - 0.1} texto="La orilla, *mucho menos ácida.*" />
      <SubIt T={T} idx={5} at={K.E + 0.1} until={K.AA - 0.1} texto="Sus enzimas *cortan las proteínas.*" />
      <SubIt T={T} idx={6} at={K.AA + 0.1} until={K.P - 0.1} texto="Madura *de afuera hacia adentro.*" />
      <SubIt T={T} idx={7} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Y si *se está desgastando?*" />
      <SubIt T={T} idx={8} at={K.Es + 0.1} until={K.M - 0.1} texto="Leyeron su ADN: *es un clon.*" />
      <SubIt T={T} idx={9} at={K.M + 0.1} until={K.Ep - 0.1} texto="Un mutante blanco: *1898 y 1902.*" />
      <SubIt T={T} idx={10} at={K.Ep + 0.1} until={K.B - 0.1} texto="Solo se copia: *casi no hace esporas.*" />
      <SubIt T={T} idx={11} at={K.B + 0.1} until={K.C - 0.1} texto="_P. biforme_ *podría reemplazarlo.*" />
      <SubIt T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es un hongo clonado *que madura tu queso.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.3, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.N + 3.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.S + 2.4, K.S + 4.9, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pi + 0.4, K.Pi + 3.3, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.A + 0.6, K.A + 5.0, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.AA + 1.0, K.AA + 4.9, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.P + 0.05, K.Es + 0.3, 'avatar_11_sorprendido', 'presentador-bajo'],
        [K.M + 0.5, K.M + 6.8, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Ep + 0.3, K.Ep + 3.3, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.B + 0.5, K.B + 4.6, 'avatar_07_pensativo_puno', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="63" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CamembertApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CamembertShot /></CompositionStage></div>;
}
window.CamembertApp = CamembertApp;
