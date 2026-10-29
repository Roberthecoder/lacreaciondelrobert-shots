// Shot Fungi Mati #41 · Esto no es pollo: el hongo que se come un árbol (Laetiporus) — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Nada aquí enseña a recolectarlo.

const PB = { naranja:'#ff8a1f', naranja2:'#ff6a12', amarillo:'#ffd23a', poro:'#fff1a8', corteza:'#5e3d22', corteza2:'#7a5131',
  madera:'#e9c88f', anillo:'#c9a066', cafe:'#8a3f1e', cafe2:'#6b2e14', micelio:'#fffaf0', pollo:'#f2b84b', pollo2:'#d7922c', hifa:'#efe6c9', lumen:'#6b5d45' };

// Repisa de Laetiporus de perfil: abanico sin pie pegado al tronco en (0,0), crece hacia la derecha. Arriba naranja, borde amarillo,
// cara de abajo amarillo pálido con poros. s<0 en x = espejo (lado izquierdo del tronco). viejo 0..1 = se decolora a crema.
function Repisa({ x, y, w = 220, h = 120, crece = 1, lado = 1, rot = 0, viejo = 0, T = 0, seed = 1 }) {
  if (crece <= 0) return null;
  const k = kEase.sale(kclamp(crece, 0, 1)), W = w * k, H = h * (0.35 + 0.65 * k);
  const top = mixHex(PB.naranja, '#e9d7b5', viejo), zona = mixHex(PB.naranja2, '#dcc59c', viejo), borde = mixHex(PB.amarillo, '#f3e9d2', viejo), abajo = mixHex(PB.poro, '#f4ecd8', viejo);
  // abanico: borde de afuera lobulado (ondas), de arriba (-H*0.6) a abajo (+H*0.25), visto un poco desde arriba
  const N = 22, pts = [];
  for (let i = 0; i <= N; i++) { const u = i / N, a = -Math.PI * 0.5 + u * Math.PI * 0.62; const lob = 1 + 0.05 * Math.sin(u * Math.PI * 5 + seed);
    pts.push([W * Math.cos(a) * lob, -H * 0.15 + H * 0.62 * Math.sin(a) * lob]); }
  const filo = pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  const cuerpo = `M 0 ${-H * 0.62} L ${filo} L 0 ${H * 0.28} Z`;
  const esc = (f) => `M 0 ${-H * 0.62 * f} L ` + pts.map((q) => (q[0] * f).toFixed(1) + ' ' + (q[1] * f - H * 0.05 * (1 - f)).toFixed(1)).join(' L ') + ` L 0 ${H * 0.28 * f} Z`;
  const [ex, ey] = pts[N];
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.3) * 0.6}) scale(${lado} 1)`}>
    <path d={`M 0 ${H * 0.2} Q ${ex * 0.6} ${ey + H * 0.38} ${ex} ${ey} L ${ex * 0.98} ${ey + H * 0.12} Q ${ex * 0.55} ${ey + H * 0.5} 0 ${H * 0.4} Z`} fill={abajo} stroke={KC.ink} strokeWidth={5} />
    <path d={cuerpo} fill={borde} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={esc(0.86)} fill={top} />
    <path d={esc(0.6)} fill={zona} opacity={0.55} />
    <path d={esc(0.34)} fill={top} />
    <path d={`M ${W * 0.08} ${-H * 0.5} Q ${W * 0.45} ${-H * 0.62} ${W * 0.62} ${-H * 0.32}`} stroke="rgba(255,255,255,.4)" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Tronco de encino de frente, con repisas encimadas como tejas. g = cuánto han brotado (0..1). cubos 0..1 = la base se vuelve cubitos cafés.
function TroncoRepisas({ T, x, y0 = 380, y1 = 1260, ancho = 230, g = 1, viejo = 0, cubos = 0 }) {
  const q = ancho / 250, Hh = y1 - y0;
  const L = [[1, 0.36, 250, 150, -8], [1, 0.45, 225, 135, -2], [1, 0.54, 195, 118, 5], [-1, 0.40, 235, 140, 7], [-1, 0.50, 205, 124, 2], [1, 0.70, 190, 112, -4], [-1, 0.74, 175, 104, 3], [1, 0.79, 160, 96, 4]];
  const r = krng(41);
  const grietas = Array.from({ length: 9 }, () => [r() * ancho - ancho / 2, r()]);
  return <g transform={`translate(${x} 0)`}>
    <rect x={-ancho / 2} y={y0} width={ancho} height={Hh} fill={PB.corteza2} stroke={KC.ink} strokeWidth={8} />
    {grietas.map(([gx, u], i) => <path key={i} d={`M ${gx} ${y0 + 20} q ${8 * Math.sin(i)} ${Hh * 0.3} 0 ${Hh * 0.6} q -6 ${Hh * 0.15} 3 ${Hh * 0.35}`} stroke={PB.corteza} strokeWidth={8} fill="none" opacity={0.8} />)}
    <path d={`M ${-ancho / 2 - 30 * q} ${y1} Q ${-ancho / 2} ${y1 - 60 * q} ${-ancho / 2} ${y1 - 120 * q} L ${ancho / 2} ${y1 - 120 * q} Q ${ancho / 2} ${y1 - 60 * q} ${ancho / 2 + 30 * q} ${y1} Z`} fill={PB.corteza2} stroke={KC.ink} strokeWidth={8} />
    {L.map(([lado, f, w, h, rot], i) => <Repisa key={i} T={T} seed={i + 1} x={lado * ancho / 2 - lado * 4} y={y0 + f * Hh} w={w * q} h={h * q} rot={rot} lado={lado} viejo={viejo} crece={kclamp(g * 1.6 - i * 0.08, 0, 1)} />)}
    {cubos > 0 && <g>{Array.from({ length: 40 }, (_, i) => { const cw = ancho / 5, cx = -ancho / 2 + (i % 5) * cw, cy = y1 - cw * 0.9 * (1 + Math.floor(i / 5)); const cae = kclamp(cubos * 1.8 - (i % 7) * 0.1 - Math.floor(i / 5) * 0.12, 0, 1);
      return <g key={i} opacity={kclamp(cubos * 4 - Math.floor(i / 5) * 0.5, 0, 1)} transform={`translate(${cx + cw / 2 + (i % 2 ? 1 : -1) * cae * 30} ${cy + cw * 0.45 + cae * (i % 3 === 0 ? (y1 - cy) * 0.6 : 6)}) rotate(${cae * (i % 2 ? 22 : -16)})`}>
        <rect x={-cw / 2 + 2} y={-cw * 0.45 + 2} width={cw - 4} height={cw * 0.9 - 4} rx={4} fill={i % 3 ? PB.cafe : '#9a4a24'} stroke={KC.ink} strokeWidth={3} />
        {i % 4 === 0 && <line x1={-cw / 2 + 2} y1={cw * 0.45 - 2} x2={cw / 2 - 2} y2={cw * 0.45 - 2} stroke={PB.micelio} strokeWidth={5} strokeLinecap="round" />}
      </g>; })}</g>}
  </g>;
}
// Plato con tiras doradas que parecen pollo deshebrado; tenedor que levanta un manojo (lev 0..1).
function Plato({ T, x, y, s = 1, lev = 0, crudo = 0 }) {
  const r = krng(7);
  const tiras = Array.from({ length: 26 }, () => [r() * 300 - 150, r() * 70 - 35, r() * 180 - 90, 40 + r() * 50]);
  const col = mixHex(PB.pollo, '#fff0b8', crudo), col2 = mixHex(PB.pollo2, '#e8cf6a', crudo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={290} ry={96} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={34} rx={210} ry={62} fill="#f1efe9" stroke="#d8d3c8" strokeWidth={4} />
    {tiras.map(([tx, ty, a, l], i) => <line key={i} x1={tx - l / 2} y1={ty} x2={tx + l / 2} y2={ty} transform={`rotate(${a * 0.4} ${tx} ${ty})`} stroke={i % 3 ? col : col2} strokeWidth={16} strokeLinecap="round" />)}
    {tiras.slice(0, 10).map(([tx, ty, a, l], i) => <line key={'b' + i} x1={tx - l / 2} y1={ty} x2={tx + l / 2} y2={ty} transform={`rotate(${a * 0.4} ${tx} ${ty})`} stroke="rgba(120,60,10,.35)" strokeWidth={4} strokeLinecap="round" />)}
    <g transform={`translate(${80 + lev * 20} ${-10 - lev * 170}) rotate(${-30 + lev * 12})`}>
      <rect x={-10} y={-300} width={20} height={250} rx={8} fill="#c9ced6" stroke={KC.ink} strokeWidth={5} />
      <path d="M -34 -60 L -34 20 M -12 -60 L -12 24 M 12 -60 L 12 24 M 34 -60 L 34 20 M -36 -60 Q 0 -80 36 -60" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
      <path d="M -34 -60 L -34 20 M -12 -60 L -12 24 M 12 -60 L 12 24 M 34 -60 L 34 20 M -36 -60 Q 0 -80 36 -60" stroke="#dfe3e8" strokeWidth={7} fill="none" strokeLinecap="round" />
      {lev > 0.05 && [-30, -8, 14, 32].map((dx, i) => <line key={i} x1={dx - 30} y1={10 + i * 6} x2={dx + 34} y2={18 + i * 4} stroke={i % 2 ? col : col2} strokeWidth={16} strokeLinecap="round" />)}
    </g>
  </g>;
}
// Corte del tronco: madera con anillos; p 0..1 = la pudrición café avanza desde el centro, se agrieta en cubitos con micelio blanco.
function CorteTronco({ x, y, R = 330, p = 0, cae = 0 }) {
  const rp = R * 0.82 * kclamp(p * 1.2, 0, 1), cub = 48;
  const celdas = [];
  for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) { const cx = i * cub, cy = j * cub; if (Math.hypot(cx, cy) < rp - cub * 0.4) celdas.push([cx, cy, i, j]); }
  return <g transform={`translate(${x} ${y})`}>
    <circle r={R + 26} fill={PB.corteza} stroke={KC.ink} strokeWidth={9} />
    <circle r={R} fill={PB.madera} stroke={KC.ink} strokeWidth={5} />
    {[0.85, 0.7, 0.55, 0.4, 0.26, 0.12].map((q, i) => <circle key={i} r={R * q} fill="none" stroke={PB.anillo} strokeWidth={5} />)}
    {rp > 2 && <circle r={rp} fill={PB.cafe} stroke={PB.cafe2} strokeWidth={6} />}
    {celdas.map(([cx, cy, i, j], k) => { const d = Math.hypot(cx, cy) / R; const sale = kclamp(cae * 2 - d * 1.2, 0, 1) * ((i + j) % 3 === 0 ? 1 : 0);
      return <g key={k} transform={`translate(${cx + sale * (i * 6)} ${cy + sale * 160}) rotate(${sale * (i % 2 ? 20 : -16)})`} opacity={1 - sale * 0.7}>
        <rect x={-cub / 2 + 3} y={-cub / 2 + 3} width={cub - 6} height={cub - 6} rx={5} fill={(i + j) % 2 ? PB.cafe : '#9a4a24'} stroke={PB.cafe2} strokeWidth={3} />
        {(i * 7 + j * 3) % 4 === 0 && <line x1={-cub / 2} y1={cub / 2 - 1} x2={cub / 2} y2={cub / 2 - 1} stroke={PB.micelio} strokeWidth={6} strokeLinecap="round" />}
        {(i * 5 + j) % 5 === 0 && <line x1={cub / 2 - 1} y1={-cub / 2} x2={cub / 2 - 1} y2={cub / 2} stroke={PB.micelio} strokeWidth={6} strokeLinecap="round" />}
      </g>; })}
  </g>;
}
// Cadena de celulosa (esquema: anillos verdes unidos). corta 0..1 = se rompe y se desvanece.
function Celulosa({ x, y, n = 8, corta = 0, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={1 - corta * 0.9}>
    {Array.from({ length: n }, (_, i) => { const dy = corta * (i % 2 ? 18 : -14) * (i % 3); return <g key={i} transform={`translate(${i * 38} ${dy})`}>
      {i < n - 1 && <line x1={12} y1={0} x2={26} y2={0} stroke="#7dffb0" strokeWidth={6} opacity={1 - corta} />}
      <polygon points="0,-13 11,-6 11,7 0,13 -11,7 -11,-6" fill="#2fe0a8" stroke={KC.ink} strokeWidth={3} /></g>; })}
  </g>;
}
// Hifas al microscopio (fondo oscuro): hifas de unión gruesas, ramificadas, sin tabiques y de pared gruesa (pared clara + luz interior oscura);
// y algunas hifas generativas delgadas. g 0..1 = crecen.
function MaranaHifas({ T, g = 1, resalta = 0 }) {
  const r = krng(11);
  const ramas = [];
  const brota = (x, y, a, largo, ancho, nivel, t0) => { const pts = []; let px = x, py = y, aa = a;
    for (let i = 0; i <= 10; i++) { pts.push([px, py]); aa += (r() - 0.5) * 0.35; px += Math.cos(aa) * largo / 10; py += Math.sin(aa) * largo / 10; }
    ramas.push({ pts, ancho, t0, nivel });
    if (nivel < 2) for (let k = 0; k < 2; k++) { const idx = 3 + Math.floor(r() * 6); const [bx, by] = pts[idx]; brota(bx, by, aa + (k ? 0.9 : -0.9) + (r() - 0.5) * 0.4, largo * 0.6, ancho * 0.8, nivel + 1, t0 + 0.25 + idx * 0.02); } };
  [[60, 520, 0.15], [1040, 640, Math.PI - 0.1], [80, 980, -0.2], [1020, 1060, Math.PI + 0.25], [300, 360, 0.9], [700, 1180, -1.6]].forEach(([x, y, a], i) => brota(x, y, a, 620, 46 - (i % 3) * 8, 0, i * 0.06));
  const finas = Array.from({ length: 7 }, (_, i) => { const y = 420 + i * 120; return { d: `M 0 ${y} C 300 ${y - 60 + r() * 120} 700 ${y + 60 - r() * 120} 1080 ${y + r() * 40}`, t0: 0.1 + i * 0.05 }; });
  const linea = (pts) => 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g>
    {finas.map((f, i) => { const u = kclamp((g - f.t0) * 1.8, 0, 1); return <g key={'f' + i} opacity={0.75}>
      <path d={f.d} stroke="#9aa5b5" strokeWidth={10} fill="none" strokeDasharray={`${u * 1300} 2000`} strokeLinecap="round" />
      <path d={f.d} stroke="#0d1424" strokeWidth={3} fill="none" strokeDasharray="4 70" opacity={u} /></g>; })}
    {ramas.map((b, i) => { const u = kclamp((g - b.t0) * 1.6, 0, 1); if (u <= 0) return null; const d = linea(b.pts), L = 900;
      const brilla = b.nivel === 0 ? resalta : 0;
      return <g key={i} style={brilla ? { filter:`drop-shadow(0 0 ${10 * brilla}px ${KC.gold2})` } : null}>
        <path d={d} stroke={KC.ink} strokeWidth={b.ancho + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${u * L} 2000`} />
        <path d={d} stroke={mixHex(PB.hifa, '#fff3c4', brilla)} strokeWidth={b.ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${u * L} 2000`} />
        <path d={d} stroke={PB.lumen} strokeWidth={b.ancho * 0.28} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${u * L} 2000`} />
      </g>; })}
  </g>;
}
// Pechuga (esquema de fibras de músculo).
function Pechuga({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -60 Q -60 -150 90 -110 Q 190 -70 160 40 Q 120 120 -20 110 Q -170 90 -150 -60 Z" fill="#f6c9a8" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-130 + i * 10} ${-50 + i * 24} Q 0 ${-90 + i * 26} ${140 - i * 6} ${-60 + i * 22}`} stroke="#e39c7c" strokeWidth={5} fill="none" />)}
  </g>;
}
// Sartén con tiras doradas que chisporrotean.
function Sarten({ T, x, y, dorado = 1 }) {
  const r = krng(5);
  const tiras = Array.from({ length: 12 }, () => [r() * 300 - 150, r() * 70 - 35, r() * 60 - 30, 60 + r() * 40]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={250} y={-18} width={300} height={36} rx={18} fill="#333" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={270} ry={110} fill="#3a3a3f" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={-4} rx={232} ry={86} fill="#56565e" />
    {tiras.map(([tx, ty, a, l], i) => <line key={i} x1={tx - l / 2} y1={ty} x2={tx + l / 2} y2={ty} transform={`rotate(${a} ${tx} ${ty})`} stroke={mixHex('#ffcf5a', PB.naranja2, dorado * (i % 2 ? 0.6 : 0.85))} strokeWidth={22} strokeLinecap="round" />)}
    {Array.from({ length: 8 }, (_, i) => { const u = ((T * 1.4 + i / 8) % 1); return <circle key={'v' + i} cx={-180 + i * 50} cy={-60 - u * 200} r={10 + u * 16} fill="#fff" opacity={(1 - u) * 0.45} />; })}
  </g>;
}
// Niña (silueta sencilla). tambalea 0..1; sonrie.
function Nina({ T, x, y, s = 1, tambalea = 0, sonrie = 0 }) {
  const a = Math.sin(T * 4.2) * 9 * tambalea;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${a})`}>
    <path d="M -70 0 L -40 -170 L 40 -170 L 70 0 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
    <line x1={-25} y1={0} x2={-25} y2={70} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" /><line x1={25} y1={0} x2={25} y2={70} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
    <circle cx={0} cy={-220} r={56} fill="#f2c29b" stroke={KC.ink} strokeWidth={6} />
    <path d="M -58 -230 Q -50 -292 0 -284 Q 52 -292 58 -230 Q 30 -262 -58 -230 Z" fill="#5a3a22" stroke={KC.ink} strokeWidth={5} />
    <circle cx={-20} cy={-222} r={6} fill={KC.ink} /><circle cx={20} cy={-222} r={6} fill={KC.ink} />
    <path d={`M -18 -194 Q 0 ${-194 + 16 * sonrie - 6 * (1 - sonrie)} 18 -194`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Molécula esquemática en zigzag con dobles enlaces (polieno).
function Polieno({ x, y, p = 1, n = 12 }) {
  const pts = Array.from({ length: n + 1 }, (_, i) => [i * 52, i % 2 ? -30 : 0]);
  const m = Math.max(1, Math.floor(p * n));
  return <g transform={`translate(${x} ${y})`}>
    {pts.slice(0, m).map(([px, py], i) => { const [qx, qy] = pts[i + 1]; return <g key={i}>
      <line x1={px} y1={py} x2={qx} y2={qy} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
      {i % 2 === 0 && <line x1={px + 4} y1={py + 12} x2={qx + 4} y2={qy + 12} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
      <circle cx={qx} cy={qy} r={7} fill={PB.naranja} stroke={KC.ink} strokeWidth={3} /></g>; })}
  </g>;
}
function Zanahoria({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(18)`}>
    <path d="M -20 -110 Q 0 -150 12 -112 M 0 -112 Q 20 -170 38 -120 M -6 -112 Q -40 -160 -40 -108" stroke={KC.leaf} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M -46 -100 Q 0 -126 46 -100 L 6 170 Q 0 180 -6 170 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-40, 0, 40, 80].map((yy, i) => <line key={i} x1={-30 + i * 6} y1={yy} x2={-6 + i * 6} y2={yy + 4} stroke="#c45a10" strokeWidth={5} strokeLinecap="round" />)}
  </g>;
}

function PolloBosqueShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Repisa, Co: CUES.Corazon, Cu: CUES.Cubitos, P: CUES.Pregunta, Cr: CUES.Correoso, H: CUES.Hifas, E: CUES.Estudio, M: CUES.Monstruo,
    Re: CUES.Recupero, Cd: CUES.Crudo, Ex: CUES.Experto, N: CUES.Naranja, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const lev = kprog(T, K.G + 0.3, K.G + 1.1, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: "esto no es pollo" — el plato y, al abrirse la cámara, el tronco con repisas */}
      <Escena T={T} a={K.G} b={K.R} zoom={-0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform={`translate(${klerp(0, -60, kprog(T, K.G + 1.8, K.G + 3.2, kEase.suave))} 0)`}><Plato T={T} x={400} y={1010} s={1.05} lev={lev} /></g>
          <g opacity={kprog(T, K.G + 1.8, K.G + 2.6)}><TroncoRepisas T={T} x={850} y0={680} y1={1180} ancho={170} g={kprog(T, K.G + 1.9, K.G + 3.4)} /></g>
          <Sello T={T} at={K.G + 1.0} x={290} y={620} texto="NO" color={KC.red} r={110} />
        </>)}
      </Escena>
      {/* 1–2 · las repisas en el tronco de encino; la Lupa entra al corazón del tronco */}
      <Escena T={T} a={K.R} b={K.Cu} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[[150, 330], [330, 260], [880, 250]].map(([hx, hy], i) => <path key={i} transform={`translate(${hx} ${hy}) rotate(${i * 30 - 20 + mece(T, i, 0.4) * 4})`} d="M 0 -40 Q 18 -30 12 -16 Q 30 -10 20 6 Q 34 14 16 24 Q 10 40 0 40 Q -10 40 -16 24 Q -34 14 -20 6 Q -30 -10 -12 -16 Q -18 -30 0 -40 Z" fill="#2f9e44" stroke={KC.ink} strokeWidth={4} />)}
          <TroncoRepisas T={T} x={560} y0={160} y1={1300} ancho={250} g={kprog(T, K.R + 0.2, K.R + 2.4)} />
        </>)}
        <Lupa T={T} at={K.Co + 0.1} until={K.Cu - 0.25} x={400} y={760} r={250} fx={560} fy={860} tinte={KC.cyan} etiqueta="POR DENTRO · el tronco"
          interior={(TT, r) => fsvg(<g>
            <rect x={0} y={0} width={2 * r} height={2 * r} fill="#3b2412" />
            {Array.from({ length: 5 }, (_, i) => <Celulosa key={i} x={30} y={70 + i * 85} n={12} corta={kprog(TT, K.Co + 0.9 + i * 0.35, K.Co + 1.5 + i * 0.35)} />)}
            <RedHifas T={TT} x={20} y={250} g={kprog(TT, K.Co + 0.3, K.Co + 3.4)} seed={4} n={140} escala={0.55} color={PB.micelio} ancho={5} rot={0} />
          </g>)} />
      </Escena>
      {/* 3 · corte del tronco: pudrición café en cubitos con micelio blanco en las grietas */}
      <Escena T={T} a={K.Cu} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<CorteTronco x={540} y={860} R={360} p={kprog(T, K.Cu + 0.1, K.Cu + 2.0, kEase.sale)} cae={kprog(T, K.Cu + 2.6, K.Cu + 4.3)} />)}
      </Escena>
      {/* 4 · re-gancho: ¿por qué pollo, si no tiene músculo? */}
      <Escena T={T} a={K.P} b={K.Cr} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Pechuga x={250} y={500} s={0.9} />
          <Interrogacion T={T} x={250} y={1060} tam={420} />
          <g transform="translate(150 1120)"><Repisa T={T} x={0} y={0} w={240} h={96} crece={kprog(T, K.P + 0.4, K.P + 1.2)} /></g>
          {kprog(T, K.P + 1.4, K.P + 1.8) > 0 && <path d="M 110 400 L 390 620 M 390 400 L 110 620" stroke={KC.red} strokeWidth={18} strokeLinecap="round" opacity={kprog(T, K.P + 1.4, K.P + 1.8)} />}
        </>)}
      </Escena>
      {/* 5 · bien cocido: correoso y sabe parecido al pollo */}
      <Escena T={T} a={K.Cr} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Sarten T={T} x={420} y={940} dorado={kprog(T, K.Cr + 0.2, K.Cr + 2.4)} />)}
      </Escena>
      {/* 6 · al microscopio: maraña de hifas; las más gruesas, 4–14 µm */}
      <Escena T={T} a={K.H} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <MaranaHifas T={T} g={kprog(T, K.H, K.H + 2.4)} resalta={kprog(T, K.H + 2.4, K.H + 3.0)} />
          {kprog(T, K.H + 2.4, K.H + 2.8) > 0 && <g opacity={kprog(T, K.H + 2.4, K.H + 2.8)}>
            {(() => { const u = kprog(T, K.H + 2.4, K.H + 3.4, kEase.sale), d = 'M 80 1640 C 300 1610 520 1670 760 1630 C 860 1615 940 1640 1000 1650', b = 'M 870 1640 Q 920 1720 990 1790';
              return <g><path d={b} stroke={KC.ink} strokeWidth={80} fill="none" strokeLinecap="round" strokeDasharray={`${u * 300} 999`} /><path d={b} stroke={PB.hifa} strokeWidth={70} fill="none" strokeLinecap="round" strokeDasharray={`${u * 300} 999`} /><path d={b} stroke={PB.lumen} strokeWidth={22} fill="none" strokeLinecap="round" strokeDasharray={`${u * 300} 999`} />
                <path d={d} stroke={KC.ink} strokeWidth={102} fill="none" strokeLinecap="round" strokeDasharray={`${u * 1000} 2000`} /><path d={d} stroke="#fff3c4" strokeWidth={92} fill="none" strokeLinecap="round" strokeDasharray={`${u * 1000} 2000`} /><path d={d} stroke={PB.lumen} strokeWidth={30} fill="none" strokeLinecap="round" strokeDasharray={`${u * 1000} 2000`} /></g>; })()}
            <path d="M 300 1574 L 300 1666 M 280 1574 L 320 1574 M 280 1666 L 320 1666" stroke={KC.gold2} strokeWidth={6} opacity={kprog(T, K.H + 3.0, K.H + 3.3)} />
          </g>}
        </>)}
      </Escena>
      {/* 7–9 · el caso de 1987: la niña, los síntomas y su recuperación */}
      <Escena T={T} a={K.E} b={K.Cd}>
        <FondoLunares color={T < K.Re ? KC.cyan : KC.yellow} />
        {fsvg(<>
          {T < K.M + 0.3 && <g opacity={1 - kprog(T, K.M - 0.2, K.M + 0.3)}>
            <rect x={760} y={760} width={90} height={500} fill={PB.corteza2} stroke={KC.ink} strokeWidth={7} />
            <circle cx={805} cy={700} r={180} fill="#2f9e44" stroke={KC.ink} strokeWidth={7} />
            <Repisa T={T} x={850} y={1000} w={150} h={60} />
            <path d="M 850 1060 l 40 -10 l 20 20" stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="8 6" />
          </g>}
          <Nina T={T} x={T < K.M ? 330 : 540} y={1180} s={1.2} tambalea={kprog(T, K.M, K.M + 0.6) * (1 - kprog(T, K.Re - 0.3, K.Re + 0.2))} sonrie={kprog(T, K.Re + 0.4, K.Re + 1.0)} />
          {T >= K.M && T < K.Re + 0.2 && <g opacity={kprog(T, K.M + 0.2, K.M + 0.6) * (1 - kprog(T, K.Re - 0.2, K.Re + 0.2))}>
            <path d="M 600 820 Q 600 760 680 760 L 880 760 Q 950 760 950 820 Q 950 880 880 880 L 700 880 L 650 920 L 665 880 Q 600 880 600 820 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <text x={775} y={838} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink} transform={`rotate(${Math.sin(T * 9) * 4} 775 820)`}>bl… ¿fff?</text>
          </g>}
          {T >= K.M + 1.4 && T < K.Re + 0.2 && <g opacity={kprog(T, K.M + 1.4, K.M + 1.9) * (1 - kprog(T, K.Re - 0.2, K.Re + 0.2))}>
            <path d="M 140 760 Q 120 620 260 610 Q 300 520 420 560 Q 520 520 560 620 Q 660 640 620 740 Q 600 810 480 790 Q 360 830 260 790 Q 150 820 140 760 Z" fill="rgba(255,255,255,.88)" stroke={KC.ink} strokeWidth={6} />
            {[[230, 690, KC.pink], [330, 640, KC.cyan], [430, 700, KC.orange], [520, 660, KC.mint], [300, 740, KC.yellow], [470, 760, KC.lilac]].map(([cx, cy, c], i) =>
              <g key={i} transform={`translate(${cx + Math.sin(T * 3 + i) * 12} ${cy + Math.cos(T * 2.5 + i) * 10}) rotate(${T * 60 * (i % 2 ? 1 : -1)})`}>
                {i % 3 === 0 ? <circle r={24} fill={c} stroke={KC.ink} strokeWidth={4} /> : i % 3 === 1 ? <rect x={-20} y={-20} width={40} height={40} fill={c} stroke={KC.ink} strokeWidth={4} /> : <path d="M -30 0 Q -15 -24 0 0 T 30 0" stroke={c} strokeWidth={10} fill="none" strokeLinecap="round" />}
              </g>)}
          </g>}
          {T >= K.Re - 0.2 && <g opacity={kprog(T, K.Re - 0.2, K.Re + 0.4)}>
            <circle cx={880} cy={klerp(1000, 640, kprog(T, K.Re, K.Re + 1.4, kEase.sale))} r={90} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4 + T * 0.6, cy = klerp(1000, 640, kprog(T, K.Re, K.Re + 1.4, kEase.sale)); return <line key={i} x1={880 + Math.cos(a) * 110} y1={cy + Math.sin(a) * 110} x2={880 + Math.cos(a) * 150} y2={cy + Math.sin(a) * 150} stroke={KC.orange} strokeWidth={10} strokeLinecap="round" />; })}
          </g>}
        </>)}
      </Escena>
      {/* 10 · crudo o mal cocido: ✗ */}
      <Escena T={T} a={K.Cd} b={K.Ex} zoom={0.05}>
        <FondoLunares color={KC.coral} />
        {fsvg(<>
          <Plato T={T} x={330} y={960} s={0.9} crudo={1} />
          <path d="M 170 820 L 490 1080 M 490 820 L 170 1080" stroke={KC.red} strokeWidth={20} strokeLinecap="round" opacity={kprog(T, K.Cd + 0.8, K.Cd + 1.1)} />
          <g transform={`translate(800 1000) rotate(${Math.sin(T * 6) * 5 * kprog(T, K.Cd + 1.6, K.Cd + 2.2)})`} opacity={kprog(T, K.Cd + 1.4, K.Cd + 1.8)}>
            <path d="M -60 -120 Q -110 -40 -70 40 Q -30 110 60 80 Q 120 50 90 -20 Q 60 -60 20 -40 Q -10 -60 0 -120 Z" fill="#f59ab0" stroke={KC.ink} strokeWidth={7} />
            <path d="M -40 0 q 20 -30 40 0 t 40 0" stroke="#b03050" strokeWidth={6} fill="none" />
          </g>
        </>)}
      </Escena>
      {/* 11 · nunca sin un experto */}
      <Escena T={T} a={K.Ex} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <TroncoRepisas T={T} x={560} y0={160} y1={1300} ancho={250} g={1} />
          <g transform={`translate(${klerp(980, 700, kprog(T, K.Ex + 0.3, K.Ex + 1.2, kEase.sale))} 840)`}>
            <circle r={130} fill="rgba(200,240,255,.35)" stroke={KC.ink} strokeWidth={14} />
            <line x1={92} y1={92} x2={190} y2={190} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 12 · su naranja: ácido laetipórico, no carotenos */}
      <Escena T={T} a={K.N} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Zanahoria x={230} y={800} s={1.1} />
          <Polieno x={440} y={860} p={kprog(T, K.N + 1.4, K.N + 2.4)} n={11} />
          <g opacity={kprog(T, K.N + 2.6, K.N + 3.0)} transform="translate(560 1060)">
            <rect x={-40} y={-90} width={80} height={110} rx={14} fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={6} />
            <rect x={-34} y={-40} width={68} height={54} rx={10} fill={PB.naranja} />
            <rect x={-26} y={-112} width={52} height={24} rx={6} fill="#555" stroke={KC.ink} strokeWidth={5} />
          </g>
          <g opacity={kprog(T, K.N + 2.8, K.N + 3.2)} transform="translate(800 1110)">
            <path d="M -90 0 L -70 90 L 70 90 L 90 0 Z" fill="#c98b5a" stroke={KC.ink} strokeWidth={6} />
            <path d="M -100 0 Q -100 -70 -40 -80 Q 0 -130 40 -80 Q 100 -70 100 0 Z" fill={mixHex('#fffaf0', PB.naranja, kprog(T, K.N + 3.2, K.N + 4.0))} stroke={KC.ink} strokeWidth={6} />
          </g>
          {kprog(T, K.N + 3.0, K.N + 3.2) > 0 && <circle cx={klerp(560, 800, kprog(T, K.N + 3.0, K.N + 3.4))} cy={klerp(980, 1000, kprog(T, K.N + 3.0, K.N + 3.4))} r={14} fill={PB.naranja} stroke={KC.ink} strokeWidth={3} opacity={1 - kprog(T, K.N + 3.4, K.N + 3.6)} />}
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo plato; el tronco de al lado ya está hecho cubitos cafés */}
      <Escena T={T} a={K.C} b={FIN} zoom={-0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform="translate(-60 0)"><Plato T={T} x={400} y={1010} s={1.05} lev={0.4} /></g>
          <TroncoRepisas T={T} x={820} y0={680} y1={1180} ancho={170} g={1} viejo={kprog(T, K.C + 0.6, K.C + 2.0)} cubos={kprog(T, K.C + 0.8, K.C + 3.2)} />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.3} until={K.R - 0.2} texto="no es pollo" x={300} y={470} tam={46} borde={KC.red} />
      <Etq T={T} at={K.R + 1.0} until={K.Co - 0.2} x={60} y={430} texto="“pollo del bosque”" tam={36} />
      <Etq T={T} at={K.R + 1.6} until={K.Co - 0.2} x={60} y={490} texto="Laetiporus (complejo sulphureus)" it tam={26} />
      <Etq T={T} at={K.R + 2.4} until={K.Co - 0.2} x={1040} y={1100} lado="izq" texto="encino (Quercus)" tam={30} />
      <Chip T={T} at={K.R + 2.8} until={K.Co - 0.2} texto="repisas encimadas · sin pie" x={420} y={1560} tam={30} borde={PB.naranja} />
      <Chip T={T} at={K.Co + 1.0} until={K.Cu - 0.2} texto="come: celulosa (y hemicelulosa)" x={420} y={1560} tam={32} borde={KC.mint} />
      <Etq T={T} at={K.Co + 0.8} until={K.Cu - 0.2} x={60} y={430} texto="hifas" tam={34} />
      <Etq T={T} at={K.Cu + 1.0} until={K.P - 0.2} x={60} y={430} texto="pudrición café" tam={38} />
      <Chip T={T} at={K.Cu + 1.6} until={K.P - 0.2} texto="queda: lignina (modificada)" x={400} y={1150} tam={34} borde={PB.cafe} />
      <Etq T={T} at={K.Cu + 2.2} until={K.P - 0.2} x={60} y={490} texto="micelio blanco en las grietas" tam={28} />
      <Chip T={T} at={K.P + 1.4} until={K.Cr - 0.2} texto="músculo: 0" x={250} y={670} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Cr + 0.5} until={K.H - 0.2} texto="bien cocido" x={330} y={470} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Cr + 1.4} until={K.H - 0.2} texto="correoso · sabe parecido al pollo" x={460} y={1130} tam={32} borde={KC.yellow} />
      <Etq T={T} at={K.H + 0.8} until={K.E - 0.2} x={60} y={430} texto="AL MICROSCOPIO · hifas" tam={30} color={KC.cyan} />
      <Etq T={T} at={K.H + 3.0} until={K.E - 0.2} x={320} y={1530} texto="las más gruesas: 4–14 µm" tam={32} color={KC.gold2} />
      <Etq T={T} at={K.H + 3.4} until={K.E - 0.2} x={60} y={1760} texto="ramificadas · sin tabiques · pared gruesa" tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="1987" quien="Canadá · niña de 6 años" revista="CMAJ, 1988" x={420} y={560} />
      <Chip T={T} at={K.M + 1.6} until={K.Re - 0.2} texto="alucinaciones" x={380} y={470} tam={40} borde={KC.pink} />
      <Cronometro T={T} at={K.Re + 0.1} until={K.Cd - 0.2} factor={20 * 3600 / 1.6} etiqueta="DESPUÉS DE LOS SÍNTOMAS" x={380} y={470} />
      <Chip T={T} at={K.Re + 0.8} until={K.Cd - 0.2} texto="≈ 20 h · se recuperó" x={380} y={600} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.Cd + 0.4} until={K.Ex - 0.2} texto="crudo o mal cocido: ✗" x={400} y={470} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Cd + 2.0} until={K.Ex - 0.2} texto="hay personas alérgicas" x={400} y={580} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ex + 1.0} until={K.N - 0.2} texto="✓ solo si lo identifica un experto" x={430} y={1130} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.Ex + 1.8} until={K.N - 0.2} texto="no lo recolectes por tu cuenta" x={430} y={1560} tam={32} borde={KC.red} />
      <MitoTachado T={T} at={K.N + 0.3} tacharEn={K.N + 1.1} until={K.C - 0.2} texto="carotenos" x={260} y={560} tam={40} />
      <Etq T={T} at={K.N + 1.8} until={K.C - 0.2} x={440} y={740} texto="ácido laetipórico" tam={32} />
      <Chip T={T} at={K.N + 3.0} until={K.C - 0.2} texto="¿colorante para comida? posible" x={460} y={1560} tam={30} borde={PB.naranja} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no es pollo: es un hongo" x={360} y={470} tam={42} borde={KC.red} />
      <Etq T={T} at={K.C + 2.2} until={K.Ou} x={1040} y={700} lado="izq" texto="Laetiporus" it tam={30} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.R} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.R} until={K.Cu} texto="20 cm" largo={170} />
      <BarraEscala T={T} at={K.Cu} until={K.P} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.P} until={K.H} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.H} until={K.E} texto="20 µm" largo={150} />
      <BarraEscala T={T} at={K.E} until={K.Cd} texto="50 cm" largo={160} />
      <BarraEscala T={T} at={K.Cd} until={K.Ex} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.Ex} until={K.N} texto="20 cm" largo={170} />
      <BarraEscala T={T} at={K.N} until={K.C} texto="5 cm" largo={130} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={130} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.R - 0.1} texto="Esto *no es pollo:* es un hongo" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.Co - 0.1} texto="Pollo del bosque: *Laetiporus*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.Cu - 0.1} texto="Sus hifas *se comen la celulosa*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.P - 0.1} texto="Madera café, *en cubitos*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Cr - 0.1} texto="¿Pollo, *sin músculo?*" />
      <Subtitulo T={T} idx={5} at={K.Cr + 0.1} until={K.H - 0.1} texto="Bien cocido: *correoso*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.E - 0.1} texto="Una maraña *de hifas*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.M - 0.1} texto="1987: *una niña de 6 años*" />
      <Subtitulo T={T} idx={8} at={K.M + 0.1} until={K.Re - 0.1} texto="Habla trabada *y alucinaciones*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Cd - 0.1} texto="Al día siguiente, *bien*" />
      <Subtitulo T={T} idx={10} at={K.Cd + 0.1} until={K.Ex - 0.1} texto="Crudo o mal cocido: *puede caerte mal*" />
      <Subtitulo T={T} idx={11} at={K.Ex + 0.1} until={K.N - 0.1} texto="Solo si lo identifica *un experto*" />
      <Subtitulo T={T} idx={12} at={K.N + 0.1} until={K.C - 0.1} texto="Su naranja: *ácido laetipórico*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es pollo: *es un hongo*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [K.R + 0.6, K.Co - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cu + 0.5, K.P - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Cr - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.H + 1.2, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.M + 0.2, K.Re - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Re + 0.3, K.Cd - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Cd + 0.5, K.Ex - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ex + 0.4, K.N - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.N + 0.4, K.C - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="41" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PolloBosqueApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PolloBosqueShot /></CompositionStage></div>;
}
window.PolloBosqueApp = PolloBosqueApp;
