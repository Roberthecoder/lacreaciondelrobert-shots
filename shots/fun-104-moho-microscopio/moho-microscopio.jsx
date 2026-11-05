// Shot Fungi Mati #104 · Esa pelusa azul de tu naranja no es una mancha: es un bosque de pinceles — NARRADO
// (gancho 1 "Esto no es X: es Y" · N1 Por dentro + N5 El experimento: la prueba de la cinta).
// Guion y fuentes: guion.md · verificacion.md. Los conidióforos son esquemáticos pero con su morfología real:
//  · Penicillium (terverticilado): tallo CON tabiques → ramas → métulas → fiálides en botellita → cadenas de conidios.
//  · Aspergillus fumigatus: tallo LISO sin tabiques → vesícula en mazo (20–30 µm) → UNA fila de fiálides solo en sus
//    2/3 de arriba → cadenas largas y apretadas en columna de conidios esféricos verdes (2.5–3 µm).
// Escala de los dibujos del microscopio: 10 µm = 100 px × s.

const MM = {
  naranja:'#ff9a1f', naranja2:'#e07a0c', naranjaOsc:'#b85d08', moho:'#3f9fb0', moho2:'#2b7f93', mohoClaro:'#8fd0d6', micelio:'#fbfaf2',
  tinte:'#8ec5ff', tinte2:'#cfe6ff', tinteOsc:'#2f6fc4', conP:'#4aa3d8', conA:'#5fbf7a', conA2:'#3c9a58', campo:'#1b2a3d',
  vidrio:'rgba(210,235,255,.55)', cinta:'rgba(255,255,255,.38)', madera:'#d9a86a', papel:'#c99b62',
};
const rad = (g) => g * Math.PI / 180;

// ---------- TEXTOS (fáciles de cambiar si el verificador corrige algo) ----------
const SUBS_TXT = [
  'No es una mancha: es un *bosque de pinceles.*',
  '_Penicillium italicum:_ el azul *son sus esporas.*',
  'Al cultivo le pegan *cinta transparente…*',
  '…y azul de lactofenol: *tiñe sus paredes.*',
  'Un tallo que se abre en ramitas: *pincel.*',
  'La espora nueva *nace abajo* y empuja a las viejas.',
  '¿Todos los mohos verdes *son pinceles?*',
  '_Aspergillus:_ una *punta hinchada* con cadenas.',
  '1729, Florencia: *Pier Antonio Micheli.*',
  'Le recordó *el rociador del agua bendita.*',
  'De sus esporas salía *el mismo hongo.*',
  'Miles de esporas *de unas 3 micras.*',
  '*No la huelas:* envuélvela y tírala.',
  'No es una mancha: es un *bosque de pinceles.*',
];

// Subtítulo con *resaltado* y _cursiva_ (nombres científicos). Misma zona y tiempos que el Subtitulo del kit.
function SubtituloI({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
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
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Píldora con partes en cursiva: partes = [['texto', it?], ...]
function ChipI({ T, at, until, partes, x = KW / 2, y = 420, borde = KC.gold, tam = 36, fondo = 'rgba(14,15,18,.84)' }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) translateY(${e.y * 0.4}px) scale(${e.s})`, opacity:e.o,
    background:fondo, color:KC.texto, border:`4px solid ${borde}`, borderRadius:999, padding:'12px 30px', font:`900 ${tam}px/1.1 ${KF.texto}`, whiteSpace:'nowrap', boxShadow:'0 10px 30px rgba(0,0,0,.45)' }}>
    {partes.map(([t, it], i) => <span key={i} style={{ fontStyle: it ? 'italic' : 'normal' }}>{t}</span>)}
  </div>;
}

// ---------- MACRO ----------
// Naranja con una zona de moho azul (centro azul-verdoso con anillo blanco de micelio). (mx, my) = centro del moho.
function Naranja({ x, y, r = 290, mx = -70, my = -40, moho = 1, seed = 4 }) {
  const g = krng(seed);
  const poros = Array.from({ length: 140 }, () => { const a = g() * 6.283, d = Math.sqrt(g()) * r * 0.94; return [Math.cos(a) * d, Math.sin(a) * d, 2 + g() * 3]; });
  const borde = (R, n, amp, s2) => { const h = krng(s2); return Array.from({ length: n }, (_, i) => { const a = i / n * 6.283, rr = R * (1 + (h() - 0.5) * amp); return `${i ? 'L' : 'M'} ${(mx + Math.cos(a) * rr).toFixed(1)} ${(my + Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z'; };
  const R = 150 * moho;
  return <g transform={`translate(${x} ${y})`}>
    <defs><radialGradient id="mmNar" cx="38%" cy="32%" r="75%"><stop offset="0%" stopColor="#ffc15a" /><stop offset="55%" stopColor={MM.naranja} /><stop offset="100%" stopColor={MM.naranjaOsc} /></radialGradient>
      <clipPath id="mmNarClip"><circle r={r} /></clipPath></defs>
    <circle r={r} fill="url(#mmNar)" stroke={KC.ink} strokeWidth={9} />
    {poros.map(([a, b, rr], i) => <circle key={i} cx={a} cy={b} r={rr} fill={MM.naranja2} opacity=".55" />)}
    <g clipPath="url(#mmNarClip)">
      {R > 4 && <><path d={borde(R * 1.12, 40, 0.16, 3)} fill="#c97a2a" opacity=".55" />
        <path d={borde(R, 46, 0.2, 5)} fill={MM.micelio} stroke="rgba(0,0,0,.18)" strokeWidth={3} />
        <path d={borde(R * 0.68, 40, 0.28, 7)} fill={MM.moho} />
        <path d={borde(R * 0.44, 30, 0.3, 9)} fill={MM.moho2} />
        {Array.from({ length: 46 }, (_, i) => { const a = i * 2.4, d = Math.sqrt(i / 46) * R * 0.62; return <circle key={i} cx={mx + Math.cos(a) * d} cy={my + Math.sin(a) * d} r={3 + (i % 3)} fill={i % 2 ? MM.mohoClaro : '#1f6a7a'} opacity=".8" />; })}</>}
    </g>
    <path d={`M -10 ${-r + 4} q 8 -34 34 -40`} stroke="#4a7a2a" strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={-r * 0.45} cy={-r * 0.55} rx={r * 0.22} ry={r * 0.09} fill="#fff" opacity=".35" transform={`rotate(-35 ${-r * 0.45} ${-r * 0.55})`} />
  </g>;
}

// ---------- MICRO: piezas ----------
// segmento grueso con contorno (hifa)
const Seg = ({ x1, y1, x2, y2, w, c = MM.tinte, k = 1 }) => <>
  <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} stroke={MM.tinte2} strokeWidth={w + 8} strokeLinecap="round" />
  <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} stroke={c} strokeWidth={w} strokeLinecap="round" /></>;
// fiálide en botellita, apoyada en (x, y) y apuntando en ang (grados, 0 = arriba). largo en px.
function Fialide({ x, y, ang = 0, largo = 90, ancho = 26, c = MM.tinte, k = 1 }) {
  if (k <= 0) return null;
  const L = largo * k, w = ancho / 2;
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={`M ${-w} 0 Q ${-w * 1.25} ${-L * 0.55} ${-w * 0.42} ${-L * 0.78} L ${-w * 0.34} ${-L} L ${w * 0.34} ${-L} L ${w * 0.42} ${-L * 0.78} Q ${w * 1.25} ${-L * 0.55} ${w} 0 Z`}
      fill={c} stroke={MM.tinte2} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
// Cadena basípeta: la espora más joven está en la base (junto a la fiálide). L = largo de la cadena en "esporas" (continuo).
// La que se está formando crece en la base y empuja hacia arriba a las demás.
function Cadena({ x, y, ang = 0, L = 5, d = 34, rx = 17, ry = 15, c = MM.conP, borde = '#dff3ff', rugosa = false, suelta = 0, seed = 1 }) {
  if (L <= 0) return null;
  const n = Math.floor(L), f = L - n, out = [];
  const g = krng(seed);
  for (let i = n - 1; i >= -1; i--) {          // i = -1 es la que se está formando
    const s = i < 0 ? f : 1;
    if (s <= 0.02) continue;
    const pos = (i + f) * d + d * 0.5 * s;      // las de arriba se recorren conforme crece la nueva
    const sx = i === n - 1 && suelta ? suelta * 160 : 0, sy = i === n - 1 && suelta ? -suelta * 120 : 0;
    out.push(<g key={i} transform={`translate(${sx} ${-pos + sy})`} opacity={i === n - 1 && suelta ? 1 - suelta * 0.6 : 1}>
      <ellipse rx={rx * s} ry={ry * s} fill={c} stroke={borde} strokeWidth={3} />
      {rugosa && s > 0.6 && [0, 1, 2, 3, 4].map((k) => <circle key={k} cx={Math.cos(k * 1.3 + g()) * rx * 0.55} cy={Math.sin(k * 1.3 + g()) * ry * 0.55} r={1.8} fill="rgba(0,0,0,.35)" />)}
    </g>);
  }
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>{out}</g>;
}
// Conidióforo de Penicillium terverticilado. Base del tallo visible en (x, y). p 0..1 = crece; cad = largo de las cadenas.
// Unidades: 10 µm = 100 px (antes de s). Tallo ~3 µm de ancho, métulas ~12 µm, fiálides ~9 µm, conidios ~3.5 µm.
const PEN = (() => {
  const H = 330, top = [0, -H];
  const ramas = [{ a: -9, L: 150, o: [0, -H] }, { a: 16, L: 140, o: [2, -H + 46] }];   // eje que sigue + rama lateral pegada
  const met = [], fia = [];
  ramas.forEach((r, ri) => {
    const ex = r.o[0] + Math.sin(rad(r.a)) * r.L, ey = r.o[1] - Math.cos(rad(r.a)) * r.L; r.e = [ex, ey];
    [-13, 0, 13].forEach((da, mi) => {
      const a = r.a + da * 0.9, L = 118, mx = ex + Math.sin(rad(a)) * L, my = ey - Math.cos(rad(a)) * L;
      met.push({ o: [ex, ey], e: [mx, my], a, k: ri * 3 + mi });
      [-11, -3.5, 3.5, 11].forEach((fa, fi) => { const aa = a + fa * 0.6; fia.push({ x: mx + Math.sin(rad(a + 90)) * fa * 1.6, y: my - Math.cos(rad(a + 90)) * fa * 1.6, a: aa, k: ri * 12 + mi * 4 + fi }); });
    });
  });
  return { H, top, ramas, met, fia };
})();
function Pincel({ T, x, y, s = 1, p = 1, cad = 5, seed = 1, suelta = 0 }) {
  const pT = kprog(p, 0, 0.35), pR = kprog(p, 0.3, 0.55), pM = kprog(p, 0.5, 0.75), pF = kprog(p, 0.7, 0.95);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* tallo con tabiques (septos) */}
    <Seg x1={0} y1={60} x2={0} y2={-PEN.H} w={30} k={pT} />
    {pT > 0.4 && [-70, -210].map((yy, i) => pT * (PEN.H + 60) > 60 - yy ? <line key={i} x1={-15} y1={yy} x2={15} y2={yy - 3} stroke={MM.tinteOsc} strokeWidth={5} /> : null)}
    {PEN.ramas.map((r, i) => <Seg key={'r' + i} x1={r.o[0]} y1={r.o[1]} x2={r.e[0]} y2={r.e[1]} w={28} k={pR} />)}
    {PEN.met.map((m, i) => <Seg key={'m' + i} x1={m.o[0]} y1={m.o[1]} x2={m.e[0]} y2={m.e[1]} w={26} k={pM} />)}
    {PEN.fia.map((f, i) => <Fialide key={'f' + i} x={f.x} y={f.y} ang={f.a} largo={88} ancho={24} k={pF} />)}
    {pF >= 1 && PEN.fia.map((f, i) => { const L = Math.max(0, cad - (i % 4) * 0.35 - (i % 3) * 0.2);
      return <Cadena key={'c' + i} x={f.x + Math.sin(rad(f.a)) * 88} y={f.y - Math.cos(rad(f.a)) * 88} ang={f.a} L={L} d={34} rx={17} ry={15} seed={seed + i} suelta={suelta ? kclamp(suelta - (i % 5) * 0.15, 0, 1) : 0} />; })}
  </g>;
}
// Conidióforo de Aspergillus fumigatus. Base del tallo visible en (x, y). Unidades: 10 µm = 100 px.
// Tallo liso (sin tabiques) ~6 µm, vesícula en mazo de ~25 µm, fiálides 7 µm solo en los 2/3 de arriba, conidios ~2.8 µm.
const ASP = (() => {
  const H = 300, vW = 125, vH = 190;                         // semiancho y alto de la vesícula
  const fia = [];
  for (let i = 0; i <= 12; i++) {                             // de -60° a +60° sobre la cúpula (2/3 de arriba)
    const t = -60 + i * 10, a = rad(t);
    const px = Math.sin(a) * vW, py = -H - vH * 0.45 - Math.cos(a) * vH * 0.55;
    fia.push({ x: px, y: py, a: t * 0.42, k: i });            // apuntan hacia arriba (columna), apenas abiertas
  }
  return { H, vW, vH, fia };
})();
function Regadera({ T, x, y, s = 1, p = 1, cad = 8, seed = 2, suelta = 0, sinCadenas = false }) {
  const pT = kprog(p, 0, 0.35), pV = kprog(p, 0.3, 0.6), pF = kprog(p, 0.55, 0.85);
  const { H, vW, vH } = ASP;
  const ves = `M -32 ${-H + 20} C -40 ${-H - 40} ${-vW} ${-H - vH * 0.2} ${-vW} ${-H - vH * 0.5} C ${-vW} ${-H - vH * 1.05} ${vW} ${-H - vH * 1.05} ${vW} ${-H - vH * 0.5} C ${vW} ${-H - vH * 0.2} 40 ${-H - 40} 32 ${-H + 20} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Seg x1={0} y1={60} x2={0} y2={-H + 10} w={56} k={pT} />
    {pV > 0 && <g transform={`translate(0 ${-H + 20}) scale(${pV}) translate(0 ${H - 20})`}><path d={ves} fill={MM.tinte} stroke={MM.tinte2} strokeWidth={6} /></g>}
    {ASP.fia.map((f, i) => <Fialide key={i} x={f.x} y={f.y} ang={f.a} largo={70} ancho={24} k={kprog(pF, i / 26, i / 26 + 0.5)} />)}
    {!sinCadenas && pF >= 1 && ASP.fia.map((f, i) => { const L = Math.max(0, cad - (i % 3) * 0.4);
      return <Cadena key={'c' + i} x={f.x + Math.sin(rad(f.a)) * 70} y={f.y - Math.cos(rad(f.a)) * 70} ang={f.a} L={L} d={29} rx={14} ry={14} c={MM.conA} borde="#d7ffe0" rugosa seed={seed + i} suelta={suelta ? kclamp(suelta - (i % 4) * 0.18, 0, 1) : 0} />; })}
  </g>;
}
// Campo del microscopio: disco de luz sobre fondo oscuro.
function Campo({ cx = 540, cy = 880, r = 520 }) {
  return <div style={{ position:'absolute', inset:0, background:KC.dark }}>
    <div style={{ position:'absolute', left:cx - r, top:cy - r, width:r * 2, height:r * 2, borderRadius:'50%',
      background:`radial-gradient(circle, ${MM.campo} 0%, #142133 55%, rgba(14,15,18,0) 72%)` }}></div>
  </div>;
}
// Bosque de pinceles dentro de la lupa (esquemático).
function Bosque({ T, cad = 4 }) {
  return <>{[[-120, 230, 0.2, 5], [-40, 250, 0.24, -4], [50, 235, 0.21, 7], [130, 255, 0.23, -6], [-170, 270, 0.17, 3], [175, 275, 0.18, -2]].map(([dx, dy, k, r], i) =>
    <g key={i} transform={`rotate(${r + mece(T, i + 2, 0.3) * 1.5} ${dx} ${dy})`}><Pincel T={T} x={dx} y={dy} s={k} cad={cad} seed={i * 9} /></g>)}</>;
}
// Lupa: círculo con el bosque dentro. (fx, fy) = punto que amplía en la naranja. ab 0..1 = se abre.
function LupaBosque({ T, x, y, fx, fy, r = 230, ab = 1, cad = 4 }) {
  if (ab <= 0) return null;
  const R = r * kEase.sale(ab);
  return <g>
    <line x1={fx} y1={fy} x2={x} y2={y} stroke="#fff" strokeWidth={6} strokeDasharray="14 10" opacity={ab} />
    <circle cx={fx} cy={fy} r={18} fill="none" stroke="#fff" strokeWidth={6} opacity={ab} />
    <defs><clipPath id="mmLupa"><circle cx={x} cy={y} r={R} /></clipPath></defs>
    <circle cx={x} cy={y} r={R + 14} fill={KC.ink} />
    <g clipPath="url(#mmLupa)">
      <rect x={x - R} y={y - R} width={R * 2} height={R * 2} fill={MM.campo} />
      <g transform={`translate(${x} ${y})`}><Bosque T={T} cad={cad} /></g>
    </g>
    <circle cx={x} cy={y} r={R} fill="none" stroke="#fff" strokeWidth={10} />
  </g>;
}
// Cinta adhesiva en un palito (bandera de cinta), centro de la cinta en (x, y).
function Bandera({ x, y, rot = 0, polvo = 0, palo = true }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {palo && <line x1={70} y1={-70} x2={330} y2={-330} stroke={MM.madera} strokeWidth={18} strokeLinecap="round" />}
    {palo && <line x1={70} y1={-70} x2={330} y2={-330} stroke={KC.ink} strokeWidth={3} strokeLinecap="round" opacity=".4" />}
    <rect x={-80} y={-80} width={160} height={160} rx={6} fill={MM.cinta} stroke="#ffffff" strokeWidth={5} />
    {polvo > 0 && Array.from({ length: 60 }, (_, i) => { const a = i * 2.4, d = Math.sqrt(i / 60) * 62; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={3.2} fill={i % 3 ? MM.moho : MM.moho2} opacity={polvo} />; })}
    <line x1={-70} y1={-60} x2={-20} y2={-75} stroke="#fff" strokeWidth={5} opacity=".7" />
  </g>;
}
// Rociador de agua bendita (aspergillum): mango y bola perforada. Bola en (x, y).
function Aspergillum({ T, x, y, s = 1, rot = -30, gotas = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-16} y={60} width={32} height={300} rx={14} fill="#c9a24a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-26} y={40} width={52} height={34} rx={8} fill="#e8c55a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={0} r={70} fill="#e8c55a" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, d = Math.sqrt((i + 0.5) / 14) * 52; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d - 6} r={5} fill={KC.ink} />; })}
    <ellipse cx={-22} cy={-30} rx={18} ry={9} fill="#fff" opacity=".5" transform="rotate(-30 -22 -30)" />
    {gotas > 0 && Array.from({ length: 12 }, (_, i) => { const ph = ((T * 1.6 + i / 12) % 1), a = rad(-90 + (i - 5.5) * 9);
      return <ellipse key={'g' + i} cx={Math.cos(a) * (80 + ph * 220)} cy={Math.sin(a) * (80 + ph * 220) + ph * ph * 60} rx={7} ry={10} fill="#7fd4ff" stroke={KC.ink} strokeWidth={2} opacity={gotas * (1 - ph)} />; })}
  </g>;
}
// Portaobjetos (vidrio) con gota de azul, cinta y cubreobjetos. Centro (x, y).
function Portaobjetos({ T, x, y, gota = 0, charco = 0, cinta = 0, cubre = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-400} y={-90} width={800} height={180} rx={10} fill={MM.vidrio} stroke={KC.ink} strokeWidth={7} />
    <rect x={-400} y={-90} width={190} height={180} rx={10} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2].map((k) => <line key={k} x1={-385} y1={-60 + k * 50} x2={-225} y2={-60 + k * 50} stroke="rgba(0,0,0,.2)" strokeWidth={4} />)}
    {charco > 0 && <ellipse cx={60} cy={4} rx={95 * charco} ry={52 * charco} fill="#2f5fd0" opacity=".85" />}
    {gota > 0 && gota < 1 && <path d={`M 60 ${-320 + gota * 310} q -18 26 0 40 q 18 -14 0 -40 Z`} fill="#2f5fd0" stroke={KC.ink} strokeWidth={3} />}
    {cinta > 0 && <g transform={`translate(${60} ${klerp(-260, 0, kEase.sale(cinta))})`}><Bandera x={0} y={0} polvo={1} palo={cinta < 0.95} /></g>}
    {cubre > 0 && <rect x={-60} y={klerp(-330, -110, kEase.sale(cubre)) + 0} width={240} height={220} rx={4} fill="rgba(235,248,255,.35)" stroke="#fff" strokeWidth={5} />}
  </g>;
}
// Bote de basura con tapa.
function Bote({ x, y, tapa = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -110 -200 L 110 -200 L 90 0 L -90 0 Z" fill="#6a7b8c" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[-50, 0, 50].map((dx) => <line key={dx} x1={dx} y1={-170} x2={dx * 0.85} y2={-30} stroke="#4a5866" strokeWidth={8} />)}
    <g transform={`translate(-120 -205) rotate(${(1 - tapa) * -55})`}><rect x={0} y={-26} width={240} height={30} rx={10} fill="#8496a8" stroke={KC.ink} strokeWidth={7} /></g>
  </g>;
}

function MohoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Mo: CUES.Moho, Ci: CUES.Cinta, Ti: CUES.Tincion, Pi: CUES.Pincel, Ca: CUES.Cadenas, P: CUES.Pregunta, A: CUES.Aspergillus, Mi: CUES.Micheli, S: CUES.Sembro, Mil: CUES.Miles, Se: CUES.Seguridad, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const Mi2 = K.Mi + 4.75;                       // empieza «le recordó el aspergillum…» (segunda línea de la escena)
  const NX = 470, NY = 900, MX = NX - 70, MY = NY - 40;   // naranja y su moho
  // gancho: zoom rápido hacia el moho y se abre la lupa (cuadro 0.3)
  const zG = 1 + 0.18 * kprog(T, K.G, K.G + 0.6, kEase.sale);
  const abreG = kprog(T, K.G + 0.25, K.G + 0.85) * (1 - kprog(T, K.Mo + 0.2, K.Mo + 0.7));
  const abreC = kprog(T, K.C + 0.3, K.C + 1.0);
  // cinta en la caja Petri: baja, presiona y sube con polvo
  const baja = kprog(T, K.Ci + 0.2, K.Ci + 1.1, kEase.suave), sube = kprog(T, K.Ci + 1.6, K.Ci + 2.5, kEase.suave);
  const bandY = klerp(klerp(520, 860, baja), 600, sube), polvo = kprog(T, K.Ci + 1.2, K.Ci + 1.5);
  // pincel: crece y luego zoom a las fiálides (cadenas)
  const pPin = kprog(T, K.Pi + 0.1, K.Pi + 2.0);
  const zC = kprog(T, K.Ca - 0.2, K.Ca + 0.8, kEase.suave) * (1 - kprog(T, K.P - 0.5, K.P, kEase.suave));
  const cadPin = T < K.Ca ? 1.5 + kprog(T, K.Pi + 2.0, K.Ca) * 2 : 3.5 + (T - K.Ca) * 0.9;
  const pAsp = kprog(T, K.A + 0.1, K.A + 1.6), cadAsp = 2 + kprog(T, K.A + 1.6, K.A + 4.4) * 7;
  const pMil = kprog(T, K.Mil, K.Mil + 0.01), sueltaMil = kprog(T, K.Mil + 0.4, K.Mil + 2.4);
  const bubble = kprog(T, K.Mil + 2.4, K.Mil + 3.0, kEase.rebote);
  // seguridad
  const nariz = kprog(T, K.Se + 0.1, K.Se + 0.8, kEase.sale) * (1 - kprog(T, K.Se + 1.3, K.Se + 1.7));
  const bolsa = kprog(T, K.Se + 1.8, K.Se + 2.4, kEase.sale), tira = kprog(T, K.Se + 2.5, K.Se + 3.2, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y moho: la naranja con su pelusa azul */}
      <Escena T={T} a={K.G} b={K.Ci} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${zG})`, transformOrigin:`${MX}px ${MY}px` }}>
          {fsvg(<>
            <Naranja x={NX} y={NY} r={290} />
            {/* puff de esporas azules */}
            {T > K.Mo + 0.6 && Array.from({ length: 26 }, (_, i) => { const ph = kclamp((T - K.Mo - 0.6 - i * 0.04) / 2.2, 0, 1); if (ph <= 0) return null;
              return <circle key={i} cx={MX + Math.cos(i * 2.1) * 40 + ph * (60 + (i % 5) * 40)} cy={MY - ph * (220 + (i % 4) * 60)} r={6} fill={i % 2 ? MM.moho : MM.mohoClaro} stroke={KC.ink} strokeWidth={1.5} opacity={1 - ph * 0.7} />; })}
          </>)}
        </div>
        {fsvg(<LupaBosque T={T} x={760} y={1010} fx={MX} fy={MY} r={190} ab={abreG} cad={2 + kprog(T, K.G + 0.5, K.G + 3.5) * 3} />, 25)}
      </Escena>
      {/* 3 · la prueba de la cinta sobre un cultivo */}
      <Escena T={T} a={K.Ci} b={K.Ti} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Petri x={470} y={900} r={250} medio="#f2e6bd">
            <Colonia cx={0} cy={0} r={175} color={MM.micelio} seed={3} />
            <Colonia cx={0} cy={0} r={130} color={MM.moho} seed={5} />
            <Colonia cx={0} cy={0} r={80} color={MM.moho2} seed={8} />
          </Petri>
          <Bandera x={470} y={bandY} polvo={polvo} />
        </>)}
      </Escena>
      {/* 4 · portaobjetos con azul de lactofenol */}
      <Escena T={T} a={K.Ti} b={K.Pi} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Portaobjetos T={T} x={540} y={980} gota={kprog(T, K.Ti + 0.1, K.Ti + 0.7)} charco={kprog(T, K.Ti + 0.65, K.Ti + 0.95, kEase.sale)} cinta={kprog(T, K.Ti + 1.1, K.Ti + 2.0)} cubre={kprog(T, K.Ti + 2.2, K.Ti + 2.8)} />
          {/* gotero */}
          <g opacity={1 - kprog(T, K.Ti + 0.9, K.Ti + 1.2)} transform={`translate(600 ${560 + Math.sin(T * 3) * 4})`}>
            <rect x={-18} y={-180} width={36} height={150} rx={8} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
            <rect x={-26} y={-250} width={52} height={80} rx={22} fill="#e2432f" stroke={KC.ink} strokeWidth={6} />
            <path d="M -10 -32 L 0 10 L 10 -32 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={5} />
          </g>
          {/* objetivo del microscopio que baja */}
          {(() => { const o = kprog(T, K.Ti + 3.0, K.Ti + 3.8, kEase.sale); return o > 0 ? <g transform={`translate(600 ${klerp(380, 700, o)})`}>
            <rect x={-90} y={-260} width={180} height={150} rx={12} fill="#d7dde3" stroke={KC.ink} strokeWidth={7} />
            <path d="M -70 -110 L 70 -110 L 40 0 L -40 0 Z" fill="#b8c1ca" stroke={KC.ink} strokeWidth={7} />
            <rect x={-90} y={-200} width={180} height={16} fill="#e2432f" />
            <ellipse cx={0} cy={60} rx={70 * o} ry={22 * o} fill="#fffbd0" opacity={0.6 * o} />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 5–6 · al microscopio: el pincel de Penicillium y sus cadenas */}
      <Escena T={T} a={K.Pi} b={K.P} zoom={0.02}>
        <Campo />
        <div style={{ position:'absolute', inset:0, transform:`scale(${1 + 1.25 * zC})`, transformOrigin:'440px 720px' }}>
          {fsvg(<Pincel T={T} x={440} y={1210} s={0.62} p={pPin} cad={cadPin} seed={11} />)}
        </div>
        {/* pincel de pintor (comparación) */}
        {fsvg(<g opacity={kprog(T, K.Pi + 2.6, K.Pi + 3.1) * (1 - zC)} transform={`translate(880 1130) rotate(-8)`}>
          <rect x={-12} y={-20} width={24} height={150} rx={10} fill="#b5651d" stroke={KC.ink} strokeWidth={5} />
          <rect x={-18} y={-70} width={36} height={56} fill="#c9c9c9" stroke={KC.ink} strokeWidth={5} />
          <path d="M -18 -70 Q -40 -170 0 -220 Q 40 -170 18 -70 Z" fill="#4a3426" stroke={KC.ink} strokeWidth={5} />
          {[-10, 0, 10].map((d) => <line key={d} x1={d} y1={-80} x2={d * 1.6} y2={-190} stroke="#2a1d14" strokeWidth={3} />)}
        </g>, 22)}
      </Escena>
      {/* 7 · re-gancho: ¿todos los mohos verdes son pinceles? */}
      <Escena T={T} a={K.P} b={K.A} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Petri x={250} y={640} r={150} medio="#f2e6bd"><Colonia cx={0} cy={0} r={110} color={MM.micelio} seed={2} /><Colonia cx={0} cy={0} r={80} color={MM.moho} seed={4} /></Petri>
          <Petri x={600} y={640} r={150} medio="#f2e6bd"><Colonia cx={0} cy={0} r={115} color="#e9f0e4" seed={6} /><Colonia cx={0} cy={0} r={85} color="#6f8f6a" seed={7} /></Petri>
          <Interrogacion T={T} x={600} y={1080} tam={300} />
        </>)}
      </Escena>
      {/* 8 · Aspergillus fumigatus al microscopio */}
      <Escena T={T} a={K.A} b={K.Mi} zoom={0.02}>
        <Campo />
        {fsvg(<Regadera T={T} x={560} y={1220} s={0.78} p={pAsp} cad={cadAsp} seed={21} />)}
      </Escena>
      {/* 9–10 · Micheli, 1729: el rociador del agua bendita; y sus esporas dan el mismo hongo */}
      <Escena T={T} a={K.Mi} b={K.Mil} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* el rociador se acerca a la cabeza del moho: encajan */}
          {(() => { const o = kprog(T, Mi2 - 0.3, Mi2 + 0.3), m = kprog(T, Mi2 + 1.2, Mi2 + 2.4, kEase.suave), f = 1 - kprog(T, K.S - 0.3, K.S + 0.2);
            return o > 0 ? <g opacity={o * f}>
              <g transform={`translate(${klerp(0, 0, m)} 0)`}><Regadera T={T} x={720} y={1160} s={0.55} p={1} cad={0} sinCadenas /></g>
              <g opacity={1 - m * 0.35}><Aspergillum T={T} x={klerp(290, 712, m)} y={klerp(850, 1003, m)} s={klerp(1, 1.22, m)} rot={klerp(-30, 0, m)} gotas={1} /></g>
            </g> : null; })()}
          {/* siembra: esporas que caen al medio y crece el mismo moho */}
          {(() => { const o = kprog(T, K.S - 0.1, K.S + 0.4); if (o <= 0) return null; const col = kprog(T, K.S + 1.4, K.S + 3.4, kEase.sale);
            return <g opacity={o}>
              <Petri x={560} y={1010} r={190} medio="#f2e6bd">{col > 0 && <><Colonia cx={0} cy={0} r={150 * col} color="#e9f0e4" seed={6} /><Colonia cx={0} cy={0} r={110 * col} color={MM.conA2} seed={7} /></>}</Petri>
              {Array.from({ length: 16 }, (_, i) => { const ph = kclamp((T - K.S - 0.3 - i * 0.06) / 0.9, 0, 1); return ph > 0 && ph < 1 ? <circle key={i} cx={560 + Math.cos(i * 2.3) * 110 * (0.4 + (i % 3) * 0.3)} cy={klerp(560, 1000 + Math.sin(i * 2.3) * 60, ph)} r={9} fill={MM.conA} stroke={KC.ink} strokeWidth={2} /> : null; })}
            </g>; })()}
        </>)}
      </Escena>
      {/* 11 · miles de esporas por cabeza; un conidio de 2.5–3 µm */}
      <Escena T={T} a={K.Mil} b={K.Se} zoom={0.03}>
        <Campo />
        <div style={{ position:'absolute', inset:0, opacity:1 - bubble * 0.75 }}>
          {fsvg(<Regadera T={T} x={470} y={1220} s={0.6} p={pMil} cad={9} seed={31} suelta={sueltaMil} />)}
          {fsvg(<>{Array.from({ length: 70 }, (_, i) => { const ph = kclamp((T - K.Mil - 0.6 - i * 0.03) / 3, 0, 1); return ph > 0 ? <circle key={i} cx={470 + Math.cos(i * 1.7) * 140 + ph * (150 + (i % 7) * 50)} cy={700 - ph * (120 + (i % 5) * 70) + Math.sin(i) * 60} r={8} fill={MM.conA} stroke="#d7ffe0" strokeWidth={2} opacity={1 - ph * 0.5} /> : null; })}</>, 21)}
        </div>
        {bubble > 0 && fsvg(<g transform={`translate(560 900) scale(${bubble})`}>
          <circle r={250} fill={MM.campo} stroke="#fff" strokeWidth={10} />
          <circle r={150} fill={MM.conA} stroke="#d7ffe0" strokeWidth={6} />
          {Array.from({ length: 40 }, (_, i) => { const a = i * 2.4, d = Math.sqrt((i + 0.5) / 40) * 135; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={5} fill="rgba(0,0,0,.28)" />; })}
          <ellipse cx={-50} cy={-60} rx={40} ry={20} fill="#fff" opacity=".3" transform="rotate(-30 -50 -60)" />
          <line x1={-150} y1={190} x2={150} y2={190} stroke="#fff" strokeWidth={6} /><line x1={-150} y1={175} x2={-150} y2={205} stroke="#fff" strokeWidth={6} /><line x1={150} y1={175} x2={150} y2={205} stroke="#fff" strokeWidth={6} />
        </g>, 26)}
      </Escena>
      {/* 12 · no la huelas: envuélvela y tírala */}
      <Escena T={T} a={K.Se} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <g transform={`translate(${klerp(0, 330, tira)} ${klerp(0, 80, tira) - Math.sin(Math.PI * tira) * 220}) scale(${klerp(1, 0.45, tira)})`} style={{ transformOrigin:'440px 900px' }}>
            <g opacity={tira > 0.92 ? 0 : 1}>
              <Naranja x={440} y={900} r={220} mx={-50} my={-30} moho={0.8} />
              {bolsa > 0 && <g transform={`translate(440 ${klerp(1300, 900, bolsa)})`}>
                <path d="M -260 -250 L 260 -250 L 240 250 L -240 250 Z" fill={MM.papel} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
                <path d="M -260 -250 l 40 -30 l 40 30 l 40 -30 l 40 30 l 40 -30 l 40 30 l 40 -30 l 40 30 l 40 -30 l 40 30 l 40 -30 l 40 30" fill="none" stroke={KC.ink} strokeWidth={6} />
              </g>}
            </g>
          </g>
          <Bote x={840} y={1200} tapa={kprog(T, K.Se + 3.2, K.Se + 3.5)} />
          {nariz > 0 && <g transform={`translate(${klerp(-160, 120, nariz)} 760)`}>
            <path d="M 0 -120 Q 40 -40 90 20 Q 110 50 80 64 Q 50 74 20 60" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <path d="M -60 -140 L 0 -120 L 20 60 L -60 80 Z" fill="#f1b48f" />
            <path d="M 46 54 q 12 -6 18 4" stroke={KC.ink} strokeWidth={5} fill="none" />
          </g>}
          {T > K.Se + 0.8 && T < K.Se + 1.9 && <Sello T={T} at={K.Se + 0.8} x={260} y={720} texto="NO" color={KC.red} r={110} />}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma naranja, vista por dentro */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<><Naranja x={NX} y={NY} r={290} />
          <LupaBosque T={T} x={760} y={1010} fx={MX} fy={MY} r={190} ab={abreC} cad={3 + kprog(T, K.C + 0.5, K.C + 4) * 2} /></>)}
      </Escena>

      {/* textos y etiquetas */}
      <Sello2 T={T} at={K.G + 0.5} until={K.Mo - 0.2} />
      <Etq T={T} at={K.G + 0.9} until={K.Mo + 3.5} x={560} y={790} texto="dibujo esquemático" tam={22} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.3} until={K.Ci - 0.2} x={60} y={470} texto="moho azul" tam={40} color={KC.ink} />
      <Etq T={T} at={K.Mo + 0.6} until={K.Ci - 0.2} x={60} y={525} texto="Penicillium italicum" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Mo + 1.2} until={K.Ci - 0.2} texto="el color = sus esporas" x={720} y={1170} tam={32} borde={MM.moho} />
      <Chip T={T} at={K.Ci + 0.2} until={K.Ti - 0.2} texto="EN EL LABORATORIO" x={330} y={440} tam={34} borde={KC.ink} mono />
      <Etq T={T} at={K.Ci + 0.4} until={K.Ti - 0.2} x={60} y={1160} texto="cultivo del moho en agar" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ci + 1.7} until={K.Ti - 0.2} x={60} y={520} texto="cinta transparente" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ti + 0.4} until={K.Pi - 0.2} texto="azul de algodón de lactofenol" x={340} y={440} tam={30} borde={KC.blue} />
      <Etq T={T} at={K.Ti + 1.3} until={K.Pi - 0.2} x={60} y={1150} texto="tiñe la quitina de las paredes" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ti + 2.4} until={K.Pi - 0.2} x={60} y={1200} texto="portaobjetos + cubreobjetos" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Pi + 0.1} until={K.Ca - 0.2} texto="AL MICROSCOPIO" x={300} y={440} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Pi + 0.9} until={K.Ca - 0.2} x={470} y={1080} texto="tallo con tabiques" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Pi + 1.5} until={K.Ca - 0.2} x={540} y={900} texto="ramas y métulas" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Pi + 2.0} until={K.Ca - 0.2} x={560} y={760} texto="fiálides" tam={28} color={KC.texto} />
      <ChipI T={T} at={K.Pi + 2.6} until={K.Ca - 0.2} partes={[['Penicillium', true], [' = pincel (Link, 1809)', false]]} x={420} y={530} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Ca + 1.0} until={K.P - 0.3} x={60} y={1150} texto="la espora más joven: abajo" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Ca + 1.6} until={K.P - 0.3} x={60} y={470} texto="la más vieja: arriba" tam={28} color={KC.texto} />
      <Chip T={T} at={K.P + 0.3} until={K.A - 0.2} texto="✓ pincel" x={250} y={850} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.A + 0.6} until={K.Mi - 0.2} x={60} y={1150} texto="tallo liso, sin tabiques" tam={26} color={KC.texto} />
      <Etq T={T} at={K.A + 1.0} until={K.Mi - 0.2} x={60} y={470} texto="Aspergillus fumigatus" it tam={38} color={KC.texto} />
      <Etq T={T} at={K.A + 1.4} until={K.Mi - 0.2} x={60} y={880} texto="vesícula · 20–30 µm" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.A + 1.9} until={K.Mi - 0.2} x={60} y={790} texto="fiálides (1 fila)" tam={26} color={KC.texto} />
      <Etq T={T} at={K.A + 2.6} until={K.Mi - 0.2} x={60} y={570} texto="cadenas de esporas" tam={26} color={MM.conA} />
      <TarjetaEstudio T={T} at={K.Mi + 0.2} until={Mi2 - 0.3} anio="1729" quien="Florencia · Pier Antonio Micheli" revista="Nova plantarum genera" x={420} y={860} />
      <ChipI T={T} at={Mi2 + 0.4} until={K.S - 0.2} partes={[['aspergillum', true], [': rociador de agua bendita', false]]} x={480} y={460} tam={30} borde={KC.ink} />
      <ChipI T={T} at={Mi2 + 1.4} until={K.S - 0.2} partes={[['aspergere', true], [' = rociar', false]]} x={300} y={560} tam={30} borde={KC.gold} />
      <MitoTachado T={T} at={K.S + 0.2} tacharEn={K.S + 1.6} until={K.Mil - 0.2} texto="nace de la nada" x={330} y={460} tam={40} />
      <Chip T={T} at={K.S + 2.2} until={K.Mil - 0.2} texto="espora → el mismo hongo" x={420} y={580} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.Mil + 0.5} until={K.Mil + 2.4} texto="miles por cabeza" x={300} y={460} tam={36} borde={MM.conA} />
      <Etq T={T} at={K.Mil + 2.8} until={K.Se - 0.2} x={410} y={1140} texto="2.5–3 µm" tam={34} color={KC.texto} />
      <Etq T={T} at={K.Mil + 2.8} until={K.Se - 0.2} x={60} y={470} texto="un conidio de A. fumigatus" it tam={30} color={KC.texto} />
      <Chip T={T} at={K.Se + 0.9} until={K.C - 0.2} texto="no la huelas" x={290} y={460} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Se + 1.0} until={K.C - 0.2} x={60} y={540} texto="USDA: puede dar problemas al respirar" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Se + 2.0} until={K.C - 0.2} texto="envuélvela y tírala" x={330} y={1170} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto="no es una mancha" x={300} y={470} tam={34} borde={KC.red} />
      <Etq T={T} at={K.C + 1.4} until={K.Ou} x={600} y={1225} texto="Penicillium" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.C + 1.4} until={K.Ou} x={560} y={790} texto="dibujo esquemático" tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ci} texto="5 cm" largo={110} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.Ci} until={K.Ti} texto="2 cm" largo={60} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.Ti} until={K.Pi} texto="1 cm" largo={21} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.Pi} until={K.Ca} texto="10 µm" largo={62} y={1450} />
      <BarraEscala T={T} at={K.Ca} until={K.P} texto="10 µm" largo={139} y={1450} />
      <BarraEscala T={T} at={K.P} until={K.A} texto="5 cm" largo={170} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.A} until={K.Mi} texto="20 µm" largo={156} y={1450} />
      <BarraEscala T={T} at={K.Mi} until={K.Mil} texto="dibujo esquemático" largo={0} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.Mil} until={K.Mil + 2.4} texto="20 µm" largo={120} y={1450} />
      <BarraEscala T={T} at={K.Mil + 2.4} until={K.Se} texto="1 µm" largo={109} y={1450} />
      <BarraEscala T={T} at={K.Se} until={K.C} texto="5 cm" largo={84} y={1450} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1450} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      {[K.G, K.Mo, K.Ci, K.Ti, K.Pi, K.Ca, K.P, K.A, K.Mi, Mi2, K.S, K.Mil, K.Se, K.C].map((a, i, arr) =>
        <SubtituloI key={i} T={T} idx={i} at={a + 0.1} until={(i + 1 < arr.length ? arr[i + 1] : K.Ou) - 0.1} texto={SUBS_TXT[i]} />)}

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ci + 0.3, K.Ti - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pi + 0.3, K.Ca - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.A - 0.05, 'avatar_07_pensativo_puno', 'presentador'],
        [K.Mi + 0.2, Mi2 - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.S + 0.2, K.Mil - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Mil + 0.2, K.Se - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Se + 0.2, K.C - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.2, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="104" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Sello «NO ES UNA MANCHA» (gancho).
function Sello2({ T, at, until }) {
  if (!kvisible(T, at, until)) return null;
  const k = kprog(T, at, at + 0.35, kEase.rebote), o = kprog(T, at, at + 0.15) * (1 - kprog(T, until, until + 0.3));
  return <div style={{ position:'absolute', left:300, top:470, zIndex:42, opacity:o, transform:`translate(-50%,-50%) rotate(-8deg) scale(${klerp(2, 1, k)})`,
    border:`10px solid ${KC.red}`, borderRadius:24, padding:'8px 26px', font:`400 70px/1 ${KF.titulo}`, color:KC.red, background:'rgba(255,255,255,.75)', whiteSpace:'nowrap' }}>NO ES UNA MANCHA</div>;
}

function MohoMicroscopioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><MohoShot /></CompositionStage></div>;
}
window.MohoMicroscopioApp = MohoMicroscopioApp;
