// Shot Científico #11 · Las manchitas que flotan en tu vista están dentro de tu ojo — NARRADO (N1 "Por dentro": cielo → ojo en corte → cielo).
// Datos: Webb et al. 2013 (Int J Ophthalmol), Ivanova et al. 2016 (Eye), NEI / AAO / MedlinePlus. Ver guion.md y verificacion.md.
// El ojo en corte es esquemático y las moscas están exageradas para que se vean.
const CIELO1 = '#38b6ff', CIELO2 = '#bfe9ff', MSOMBRA = 'rgba(22,34,58,.55)', VITREO = 'rgba(175,228,255,.55)';

// Una "mosca volante" en el cielo: hebrita o grumito transparente. tipo 0 hebra, 1 anillos, 2 grumo con cola.
function Mosca({ x, y, s = 1, rot = 0, tipo = 0, o = 1, color = MSOMBRA }) {
  const t = 'M -90 10 C -55 -40 -20 40 15 0 S 75 -30 105 15';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {tipo === 0 && <><path d={t} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />
      <path d={t} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={4} strokeLinecap="round" /></>}
    {tipo === 1 && [[0, 0, 22], [34, 14, 15], [-26, 22, 12], [12, -30, 10]].map(([a, b, r], i) =>
      <circle key={i} cx={a} cy={b} r={r} fill="rgba(255,255,255,.2)" stroke={color} strokeWidth={7} />)}
    {tipo === 2 && <><path d="M -30 0 C -30 -34 30 -34 30 0 C 30 30 -30 30 -30 0 Z M 28 6 C 70 30 90 -10 130 20" fill="rgba(255,255,255,.18)" stroke={color} strokeWidth={9} strokeLinecap="round" />
      <circle cx={-6} cy={-8} r={7} fill="rgba(255,255,255,.6)" /></>}
  </g>;
}
// Moscas del cielo: flotan y se deslizan con inercia (tras cada "mirada" se van frenando).
const MOSCAS = [[250, 700, 0, 1.3, 20], [430, 980, 1, 1.4, 0], [180, 1080, 2, 1.2, -15], [620, 760, 2, 1, 30], [760, 1060, 0, 1.1, -25], [380, 600, 1, 0.9, 0], [560, 1150, 0, 0.9, 10], [880, 860, 1, 1.1, 0]];
const MIRADAS = [0.2, 1.6, 3.4];
function MoscasCielo({ T, o = 1, color }) {
  return <g opacity={o}>{MOSCAS.map(([bx, by, tipo, s, r], i) => {
    // cada mirada empuja todas las moscas; después siguen deslizándose y se frenan (inercia)
    let dx = 0, dy = 0; MIRADAS.forEach((m, k) => { if (T > m) { const u = T - m, d = (1 - Math.exp(-u * 2.2)); dx += (k % 2 ? -1 : 1) * 70 * d; dy += (k % 2 ? 26 : -20) * d; } });
    const x = bx + dx + 30 * Math.sin(T * 0.7 + i * 1.7), y = by + dy + 18 * Math.sin(T * 0.5 + i) + T * 6;
    return <Mosca key={i} x={x} y={y} s={s} tipo={tipo} rot={r + 8 * Math.sin(T * 0.9 + i)} color={color} />; })}</g>;
}
function CieloFondo({ T }) {
  return <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${CIELO1} 0%, ${CIELO2} 100%)` }}>
    <Lienzo z={1}>
      <SolDibujo x={890} y={1560} r={80} T={T} />
      <Nube x={220 + T * 8} y={1500} s={0.9} /><Nube x={760 - T * 6} y={1700} s={0.7} /><Nube x={160 + T * 5} y={420} s={0.55} color="rgba(255,255,255,.9)" />
    </Lienzo>
  </div>;
}
// Ojo visto de frente (almendra) que encierra el cielo: s grande = la almendra queda fuera de pantalla.
function AlmendraOjo({ s = 1, cx = 540, cy = 900, o = 1, piel = CPIEL, solido = true }) {
  const w = 430 * s, h = 270 * s;
  const ojo = `M ${cx - w} ${cy} Q ${cx} ${cy - 2 * h} ${cx + w} ${cy} Q ${cx} ${cy + 2 * h} ${cx - w} ${cy} Z`;
  return <g opacity={o}>
    {solido && <path d={`M -400 -400 H ${KW + 400} V ${KH + 400} H -400 Z ${ojo}`} fill={piel} fillRule="evenodd" />}
    <path d={ojo} fill="none" stroke={solido ? KC.ink : 'rgba(255,255,255,.7)'} strokeWidth={solido ? 14 * Math.min(1, s) + 4 : 8} />
    {Array.from({ length: 9 }, (_, i) => { const f = 0.12 + i * 0.095, x = (1 - f) * (1 - f) * (cx - w) + 2 * f * (1 - f) * cx + f * f * (cx + w), y = (1 - f) * (1 - f) * cy + 2 * f * (1 - f) * (cy - 2 * h) + f * f * cy;
      return <line key={i} x1={x} y1={y} x2={x + (f - 0.5) * 60 * s} y2={y - 46 * s} stroke={solido ? KC.ink : 'rgba(255,255,255,.7)'} strokeWidth={8} strokeLinecap="round" />; })}
  </g>;
}

// ---------- el ojo en corte, de perfil, mirando a la derecha ----------
const FIBRAS = (() => { const g = krng(11), cl = [[-140, -100], [-40, 110], [70, -40], [-210, 70], [10, 200], [-60, -200]];
  return Array.from({ length: 22 }, (_, i) => { const y0 = (g() * 2 - 1) * 0.72, c = cl[i % cl.length], amp = 0.03 + g() * 0.05, fase = g() * 6;
    return { y0, c, amp, fase, x0: -0.86 + g() * 0.1, x1: 0.42 - g() * 0.15 }; }); })();
const GRUMOS = [[-140, -100], [-40, 110], [70, -40], [-210, 70], [10, 200], [-60, -200]];
let OJO_ID = 0;
function OjoCorte({ cx, cy, R = 320, rot = 0, T, vit = 1, fibras = 0, junta = 0, liquido = 0, rayos = 0, sombras = 0, rotG = null, mirada = 0, o = 1, id = 'o' }) {
  const L = [0.62 * R, 0], Rr = R - 20, k = R / 320;
  const rg = rotG == null ? rot : rotG;
  // fibras: de una red fina a grumos y hebras (junta 0..1)
  const fib = FIBRAS.map((f, i) => { const c = [f.c[0] * k, f.c[1] * k], pts = [];
    for (let j = 0; j <= 14; j++) { const u = j / 14, x = klerp(f.x0, f.x1, u) * R, y = f.y0 * R + Math.sin(u * 9 + f.fase + T * 1.3) * f.amp * R;
      const q = 0.74 * junta; pts.push(`${(c[0] + (x - c[0]) * (1 - q) + Math.sin(T * 2 + i) * 6 * junta).toFixed(1)},${(c[1] + (y - c[1]) * (1 - q * 0.97)).toFixed(1)}`); }
    return <polyline key={i} points={pts.join(' ')} fill="none" stroke={junta > 0.5 ? 'rgba(40,52,80,.85)' : 'rgba(255,255,255,.85)'} strokeWidth={(3 + 7 * junta) * k} strokeLinecap="round" strokeLinejoin="round" />; });
  // sombras sobre la retina: la luz entra por el cristalino, pasa por cada grumo y sigue hasta el fondo del ojo
  const sombra = GRUMOS.map(([gx0, gy0], i) => { const a = (rg - rot) * Math.PI / 180, gx = (gx0 * Math.cos(a) - gy0 * Math.sin(a)) * k, gy = (gx0 * Math.sin(a) + gy0 * Math.cos(a)) * k;
    const dx = gx - L[0], dy = gy - L[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, b = L[0] * ux + L[1] * uy, t = -b + Math.sqrt(b * b - (L[0] * L[0] + L[1] * L[1] - Rr * Rr));
    const px = L[0] + ux * t, py = L[1] + uy * t, ang = Math.atan2(py, px) * 180 / Math.PI;
    return { gx, gy, px, py, ang }; });
  return <g transform={`translate(${cx} ${cy}) rotate(${rot})`} opacity={o}>
    <defs><clipPath id={`vit-${id}`}><circle r={R - 30} /></clipPath></defs>
    {/* nervio óptico */}
    <path d={`M ${-R + 20} -46 L ${-R - 150} -60 L ${-R - 150} 60 L ${-R + 20} 46 Z`} fill="#f4c99c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {/* córnea */}
    <path d={`M ${0.74 * R} ${-0.66 * R} Q ${1.32 * R} 0 ${0.74 * R} ${0.66 * R}`} fill="rgba(210,245,255,.75)" stroke={KC.ink} strokeWidth={9} />
    {/* esclera */}
    <circle r={R} fill="#fffaf3" stroke={KC.ink} strokeWidth={11} />
    {/* retina (fondo del ojo) */}
    <path d={`M ${Rr * Math.cos(1.05)} ${-Rr * Math.sin(1.05)} A ${Rr} ${Rr} 0 1 0 ${Rr * Math.cos(1.05)} ${Rr * Math.sin(1.05)}`} fill="none" stroke={KC.coral} strokeWidth={20 * k} strokeLinecap="round" />
    {/* gel vítreo: se llena */}
    <g clipPath={`url(#vit-${id})`}>
      <rect x={-R} y={R - 2 * R * vit + Math.sin(T * 3) * 10 * (vit < 1 ? 1 : 0)} width={2 * R} height={2 * R} fill={VITREO} />
      {liquido > 0 && [[-120, 30, 90], [40, -150, 70], [-30, 170, 60], [-230, -60, 55]].map(([x, y, r], i) =>
        <circle key={i} cx={x * k} cy={y * k} r={r * k * liquido} fill="rgba(255,255,255,.35)" stroke="rgba(255,255,255,.9)" strokeWidth={4} strokeDasharray="10 8" strokeDashoffset={-T * 20} />)}
      {fibras > 0 && <g transform={`rotate(${rg - rot})`} opacity={fibras}>{fib}</g>}
    </g>
    {/* iris y cristalino */}
    {[-1, 1].map((sg) => <line key={sg} x1={0.8 * R} y1={sg * 0.17 * R} x2={0.8 * R} y2={sg * 0.6 * R} stroke={KC.teal} strokeWidth={22 * k} strokeLinecap="round" />)}
    <ellipse cx={L[0]} cy={0} rx={0.15 * R} ry={0.34 * R} fill="rgba(255,236,190,.95)" stroke={KC.ink} strokeWidth={8} />
    {/* rayos de luz */}
    {rayos > 0 && <g opacity={rayos}>{[-2, -1, 0, 1, 2].map((j) => { const yIn = j * 0.15 * R, yL = j * 0.1 * R, f = [-R + 22, 0];
      return <g key={j}><polyline points={`${2.4 * R},${yIn} ${L[0]},${yL} ${f[0]},${f[1]}`} fill="none" stroke={KC.ink} strokeWidth={16} strokeLinejoin="round" opacity=".35" />
        <polyline points={`${2.4 * R},${yIn} ${L[0]},${yL} ${f[0]},${f[1]}`} fill="none" stroke={KC.yellow} strokeWidth={9} strokeDasharray="34 18" strokeDashoffset={T * 120} strokeLinejoin="round" /></g>; })}</g>}
    {sombras > 0 && sombra.map((s, i) => <g key={i} opacity={sombras}>
      <line x1={s.gx} y1={s.gy} x2={s.px} y2={s.py} stroke="rgba(20,20,40,.45)" strokeWidth={14 * k} strokeLinecap="round" strokeDasharray="4 14" />
      <ellipse cx={s.px} cy={s.py} rx={30 * k} ry={13 * k} transform={`rotate(${s.ang + 90} ${s.px} ${s.py})`} fill="rgba(25,12,30,.85)" stroke="#fff" strokeWidth={3} />
    </g>)}
    {mirada > 0 && <g opacity={mirada}><line x1={1.3 * R} y1={0} x2={2.1 * R} y2={0} stroke={KC.yellow} strokeWidth={14} strokeDasharray="26 16" strokeDashoffset={-T * 60} strokeLinecap="round" />
      <path d={`M ${2.2 * R} 0 l -50 -32 l 0 64 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /></g>}
  </g>;
}
// Rótulo con línea (dentro de svg).
function Rotulo({ x, y, tx, ty, texto, p = 1, ancla = 'middle', color = KC.white, tam = 40 }) {
  if (p <= 0.01) return null;
  return <g opacity={p}><line x1={x} y1={y} x2={tx} y2={ty + 10} stroke={KC.ink} strokeWidth={6} /><circle cx={x} cy={y} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    <TextoSvg x={tx} y={ty} tam={tam} color={color} ancla={ancla} fuente="texto">{texto}</TextoSvg></g>;
}
// Agua del gel vista de cerca (interior de la Lupa).
function AguaCerca({ t, r }) {
  const g = krng(4);
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d2a44" />
    {Array.from({ length: 16 }, (_, i) => { const x = g() * r * 2, y = g() * r * 2, a = t * 40 + i * 47;
      return <g key={i} transform={`translate(${x + Math.sin(t * 2 + i) * 8} ${y + Math.cos(t * 1.7 + i) * 8}) rotate(${a})`}>
        <circle r={13} fill="#ff5a5a" stroke={KC.ink} strokeWidth={3} /><circle cx={-14} cy={10} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={14} cy={10} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} /></g>; })}
    <path d={`M 0 ${r * 1.3} C ${r * 0.5} ${r * 1.1} ${r} ${r * 1.5} ${r * 2} ${r * 1.2}`} fill="none" stroke="#fff" strokeWidth={4} opacity=".7" />
  </svg>;
}
// Cuarto con muchas cosas (para comparar).
function CuartoCosas({ x, y, w, h }) {
  const cols = [KC.red, KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink, KC.blue];
  return <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx={26} fill="#f6c26b" stroke={KC.ink} strokeWidth={9} />
    {[0, 1].map((f) => <g key={f}><rect x={40} y={70 + f * 120} width={w * 0.5} height={14} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={50 + i * 46} y={70 + f * 120 - 70 + (i % 3) * 8} width={36} height={70 - (i % 3) * 8} fill={cols[(i + f * 3) % 8]} stroke={KC.ink} strokeWidth={4} />)}</g>)}
    <rect x={w * 0.62} y={40} width={150} height={110} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} /><circle cx={w * 0.62 + 50} cy={80} r={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
    <rect x={w * 0.62 + 190} y={60} width={110} height={140} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${w * 0.7} ${h - 20} l 20 -90 l 50 0 l 20 90 Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={w * 0.7 + 45 + Math.cos(i * 1.6) * 40} cy={h - 140 - Math.sin(i * 1.6) * 30} rx={34} ry={16} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 45 - 60} ${w * 0.7 + 45} ${h - 130})`} />)}
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={60 + (i * 97) % (w * 0.55)} cy={h - 50 - (i % 3) * 22} r={14 + (i % 4) * 4} fill={cols[i % 8]} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Íconos de las tres señales de alarma.
function IconoSenal({ tipo, x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={58} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {tipo === 0 && Array.from({ length: 14 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * (8 + (i * 3) % 36)} cy={Math.sin(i * 2.4) * (8 + (i * 3) % 36)} r={5 + (i % 3) * 2} fill={MSOMBRA} />)}
    {tipo === 1 && <path d="M 0 -44 L 10 -12 L 42 -14 L 16 6 L 28 38 L 0 18 L -28 38 L -16 6 L -42 -14 L -10 -12 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" transform={`scale(${0.85 + 0.2 * Math.abs(Math.sin(T * 9))})`} />}
    {tipo === 2 && <><clipPath id="cortina"><circle r={52} /></clipPath><rect x={-60} y={-60} width={120} height={60 + 40 * Math.sin(T * 2.5)} fill="#26232b" clipPath="url(#cortina)" /></>}
  </g>;
}

function Moscas() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const zA = kprog(T, K.Gancho + 2.9, K.Gel + 0.2, kEase.suave);          // la cámara se aleja: aparece el ojo que mira el cielo
  const OG = { cx: 470, cy: 800, R: 280 };                                  // ojo en corte (escena Gel)
  // ojo que gira (Escapan): mira a la derecha-arriba y regresa; los grumos llegan tarde y se mecen
  const giro = (t) => -28 * kprog(t, K.Escapan + 0.6, K.Escapan + 1.1, kEase.suave) + 40 * kprog(t, K.Escapan + 2.6, K.Escapan + 3.1, kEase.suave);
  const giroG = (t) => giro(t - 0.45) + 9 * Math.exp(-Math.max(0, t - K.Escapan - 1.5) * 1.6) * Math.sin((t - K.Escapan) * 7) * (t > K.Escapan + 0.9 ? 1 : 0);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cielo con manchitas; la cámara se aleja y resulta que lo ves desde dentro de tu ojo */}
      <Escena T={T} a={K.Gancho} b={K.Gel} zoom={0}>
        <CieloFondo T={T} />
        <Lienzo>
          <MoscasCielo T={T} />
          {zA > 0 && <AlmendraOjo s={klerp(3.2, 1, zA)} cy={940} />}
          <TextoSvg x={290} y={450} tam={96} color={KC.yellow} rot={-4} o={1 - kprog(T, K.Gancho + 3.0, K.Gancho + 3.3)} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.05, K.Gancho + 0.45, kEase.rebote))}>NO ESTÁN</TextoSvg>
          <TextoSvg x={290} y={555} tam={96} color={KC.yellow} rot={-4} o={1 - kprog(T, K.Gancho + 3.0, K.Gancho + 3.3)} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.6, K.Gancho + 1.0, kEase.rebote))}>EN EL AIRE</TextoSvg>
          <TextoSvg x={290} y={450} tam={96} color={KC.pink} rot={-4} o={kprog(T, K.Gancho + 3.3, K.Gancho + 3.5)} s={klerp(0.5, 1, kprog(T, K.Gancho + 3.3, K.Gancho + 3.7, kEase.rebote))}>¡ESTÁN EN</TextoSvg>
          <TextoSvg x={290} y={555} tam={96} color={KC.pink} rot={-4} o={kprog(T, K.Gancho + 3.6, K.Gancho + 3.8)} s={klerp(0.5, 1, kprog(T, K.Gancho + 3.6, K.Gancho + 4.0, kEase.rebote))}>TU OJO!</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 1 · el gel: el ojo en corte se llena de humor vítreo */}
      <Escena T={T} a={K.Gel} b={K.Fibras} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`translate(${OG.cx} ${OG.cy}) scale(${klerp(0.4, 1, kprog(T, K.Gel - 0.3, K.Gel + 0.5, kEase.rebote))}) translate(${-OG.cx} ${-OG.cy})`}>
            <OjoCorte {...OG} T={T} vit={kprog(T, K.Gel + 0.6, K.Gel + 2.2, kEase.suave)} id="gel" rayos={0} />
          </g>
          <Rotulo x={OG.cx + 1.2 * OG.R} y={OG.cy - 60} tx={950} ty={950} texto="córnea" p={kprog(T, K.Gel + 0.8, K.Gel + 1.1)} />
          <Rotulo x={OG.cx + 0.62 * OG.R} y={OG.cy + 90} tx={790} ty={1110} texto="cristalino" p={kprog(T, K.Gel + 1.1, K.Gel + 1.4)} />
          <Rotulo x={OG.cx - OG.R + 18} y={OG.cy + 160} tx={150} ty={1110} texto="retina" p={kprog(T, K.Gel + 1.4, K.Gel + 1.7)} />
        </Lienzo>
        <Lupa T={T} at={K.Gel + 2.4} until={K.Fibras - 0.2} x={800} y={400} r={130} fx={OG.cx - 40} fy={OG.cy + 60} tinte={KC.cyan} etiqueta="POR DENTRO · GEL"
          interior={(t, r) => <AguaCerca t={t} r={r} />} />
        <Chip T={T} at={K.Gel + 2.6} until={K.Fibras - 0.1} texto="casi pura agua" x={800} y={690} tam={38} borde={KC.cyan} />
        <Chip T={T} at={K.Gel + 3.6} until={K.Fibras - 0.1} texto="humor vítreo" x={OG.cx - 90} y={OG.cy - 60} tam={44} borde={KC.gold} />
      </Escena>
      {/* 2 · fibras de colágeno: zoom dentro del gel */}
      <Escena T={T} a={K.Fibras} b={K.Grumos} fondo={KC.noche}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g transform={`translate(600 900) scale(${klerp(1.2, 1.75, kprog(T, K.Fibras - 0.4, K.Fibras + 1.2, kEase.suave))}) translate(-600 -900)`}>
            <OjoCorte cx={600} cy={900} R={320} T={T} fibras={kprog(T, K.Fibras + 0.3, K.Fibras + 1.4)} id="fib" />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Fibras + 0.9} until={K.Grumos - 0.1} texto="red de fibras de colágeno" x={540} y={430} tam={42} borde={KC.white} />
      </Escena>
      {/* 3 · con los años: el gel se licúa y las fibras se juntan en grumos */}
      <Escena T={T} a={K.Grumos} b={K.Sombra} fondo={KC.noche}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g transform="translate(600 900) scale(1.75) translate(-600 -900)">
            <OjoCorte cx={600} cy={900} R={320} T={T} fibras={1} junta={kprog(T, K.Grumos + 1.6, K.Grumos + 4.6, kEase.suave)} liquido={kprog(T, K.Grumos + 0.6, K.Grumos + 2.4, kEase.sale)} id="gru" />
          </g>
        </Lienzo>
        <Contador T={T} at={K.Grumos + 0.3} desde={20} hasta={60} dur={4.4} sufijo=" años" x={540} y={430} tam={76} color={KC.gold2} />
        <Chip T={T} at={K.Grumos + 1.0} until={K.Sombra - 0.1} texto="más líquido" x={300} y={540} tam={36} borde={KC.cyan} />
        <Chip T={T} at={K.Grumos + 2.8} until={K.Sombra - 0.1} texto="grumitos y hebras" x={760} y={540} tam={36} borde={KC.gold} />
      </Escena>
      {/* 4 · la sombra: la luz cruza el ojo y los grumos tapan pedacitos de retina */}
      <Escena T={T} a={K.Sombra} b={K.Escapan} fondo={KC.blue}>
        <FondoLunares color={KC.blue} />
        <Lienzo>
          <OjoCorte cx={440} cy={950} R={290} T={T} vit={1} fibras={1} junta={1} rayos={kprog(T, K.Sombra + 0.2, K.Sombra + 0.9)} sombras={kprog(T, K.Sombra + 2.0, K.Sombra + 2.8)} id="som" />
          <Rotulo x={440 - 290 + 20} y={950 + 120} tx={110} ty={1215} texto="retina" p={kprog(T, K.Sombra + 1.0, K.Sombra + 1.3)} />
          <Rotulo x={440 + 70} y={950 - 40} tx={760} ty={760} texto="grumo" p={kprog(T, K.Sombra + 1.0, K.Sombra + 1.3)} />
          {/* lo que ves: el cielo con las sombras */}
          <g opacity={kprog(T, K.Sombra + 2.8, K.Sombra + 3.2)} transform={`translate(300 430) scale(${klerp(0.4, 1, kprog(T, K.Sombra + 2.8, K.Sombra + 3.3, kEase.rebote))})`}>
            <clipPath id="lov"><circle r={130} /></clipPath>
            <circle r={130} fill={CIELO1} />
            <g clipPath="url(#lov)"><Mosca x={-50} y={-30} tipo={0} s={0.8} rot={20} /><Mosca x={60} y={40} tipo={1} s={0.9} /><Mosca x={-20} y={80} tipo={2} s={0.7} /></g>
            <circle r={130} fill="none" stroke={KC.ink} strokeWidth={10} />
            <TextoSvg x={0} y={180} tam={40} color={KC.white} fuente="texto">lo que ves</TextoSvg>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Sombra + 0.4} until={K.Sombra + 2.6} texto="luz" x={900} y={850} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 5 · se escapan: el ojo gira y los grumos llegan tarde, como en gelatina */}
      <Escena T={T} a={K.Escapan} b={K.Pregunta} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <OjoCorte cx={430} cy={900} R={300} T={T} rot={giro(T)} rotG={giroG(T)} fibras={1} junta={1} mirada={kprog(T, K.Escapan + 0.3, K.Escapan + 0.8)} id="esc" />
        </Lienzo>
        <Chip T={T} at={K.Escapan + 0.5} until={K.Escapan + 2.6} texto="mueves el ojo…" x={540} y={430} tam={44} borde={KC.yellow} />
        <Chip T={T} at={K.Escapan + 2.6} until={K.Pregunta - 0.1} texto="…y los grumos llegan tarde" x={540} y={430} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Fondo} color={KC.lilac} />
      {/* 7 · fondo claro y parejo vs. cuarto con muchas cosas */}
      <Escena T={T} a={K.Fondo} b={K.Estudio} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Fondo + 0.1, K.Fondo + 0.6, kEase.sale)) * -700})`}>
            <rect x={90} y={320} width={900} height={340} rx={26} fill="#fbfaf6" stroke={KC.ink} strokeWidth={9} />
            <clipPath id="pared"><rect x={90} y={320} width={900} height={340} rx={26} /></clipPath><g clipPath="url(#pared)"><g transform="translate(0 -300)"><MoscasCielo T={T - K.Fondo + 0.3} /></g></g>
            <text x={540} y={385} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.ink}>pared lisa: SE NOTAN</text>
          </g>
          <g transform={`translate(0 ${(1 - kprog(T, K.Fondo + 0.8, K.Fondo + 1.3, kEase.sale)) * 900})`}>
            <CuartoCosas x={90} y={700} w={900} h={380} />
            <clipPath id="cuarto"><rect x={90} y={700} width={900} height={380} rx={26} /></clipPath><g clipPath="url(#cuarto)" opacity={0.22}><g transform="translate(0 80)"><MoscasCielo T={T - K.Fondo + 0.3} /></g></g>
            <TextoSvg x={540} y={1050} tam={42} color={KC.white} fuente="texto">muchas cosas: SE NOTAN MENOS</TextoSvg>
          </g>
        </Lienzo>
      </Escena>
      {/* 8 · el estudio de 2013: 603 personas, 76 % las ve */}
      <Escena T={T} a={K.Estudio} b={K.Aviso} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {T < K.Estudio + 4.0 && <Celular x={190} y={1080} s={0.62} T={T} rot={-10} />}
          {T >= K.Estudio + 3.7 && Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), x = 135 + c * 90, y = 420 + f * 52;
            const e = kprog(T, K.Estudio + 3.8 + i * 0.012, K.Estudio + 4.1 + i * 0.012, kEase.rebote), si = i < 76 && T > K.Estudio + 4.6 + i * 0.008;
            return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}><ellipse rx={36} ry={20} fill={si ? KC.yellow : '#fff'} stroke={KC.ink} strokeWidth={5} />
              <circle r={12} fill={si ? KC.teal : '#bbb'} stroke={KC.ink} strokeWidth={3} /></g>; })}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 3.6} anio="2013" quien="603 personas" revista="encuesta en app de celular · Webb et al." x={600} y={700} />
        <NumeroGigante T={T} at={K.Estudio + 4.6} until={K.Aviso - 0.1} valor={76} sufijo=" %" etiqueta="dijo que las ve" x={540} y={1040} tam={180} />
      </Escena>
      {/* 9 · aviso de urgencia: 3 señales → oftalmólogo ese mismo día */}
      <Escena T={T} a={K.Aviso} b={K.Cierre} fondo={KC.red}>
        <FondoLunares color={KC.red} />
        <Lienzo>
          <g transform={`translate(540 400) scale(${klerp(0.3, 1.0, kprog(T, K.Aviso + 0.05, K.Aviso + 0.45, kEase.rebote)) * (1 + 0.05 * Math.sin(T * 8))})`}><Alerta x={0} y={0} s={1} /></g>
          {['muchas de golpe', 'destellos de luz', 'sombra como cortina'].map((tx, i) => { const at = K.Aviso + [1.5, 3.0, 4.2][i], e = kprog(T, at, at + 0.35, kEase.rebote), y = 590 + i * 140;
            return <g key={i} opacity={kprog(T, at, at + 0.15)} transform={`translate(${(1 - e) * -500} 0)`}>
              <rect x={80} y={y - 62} width={920} height={124} rx={62} fill="rgba(14,15,18,.88)" stroke={KC.yellow} strokeWidth={6} />
              <IconoSenal tipo={i} x={160} y={y} T={T} />
              <TextoSvg x={250} y={y + 18} tam={54} color={KC.white} ancla="start" fuente="texto">{tx}</TextoSvg></g>; })}
          {T > K.Aviso + 5.3 && <g transform={`translate(540 1040) scale(${klerp(0.4, 1, kprog(T, K.Aviso + 5.3, K.Aviso + 5.7, kEase.rebote))})`}>
            <rect x={-440} y={-58} width={880} height={116} rx={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
            <text x={0} y={18} textAnchor="middle" style={{ font:`400 58px ${KF.titulo}` }} fill={KC.ink}>→ OFTALMÓLOGO ESE MISMO DÍA</text></g>}
        </Lienzo>
      </Escena>
      {/* 10 · cierre: el mismo cielo, ahora con tu ojo tenue detrás */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0}>
        <CieloFondo T={T} />
        <Lienzo>
          <g opacity={0.55 * kprog(T, K.Cierre + 0.4, K.Cierre + 1.6)}>
            <AlmendraOjo s={1.15} cy={900} solido={false} />
            <circle cx={540} cy={900} r={240} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={10} />
            <circle cx={540} cy={900} r={110} fill="rgba(20,30,60,.18)" stroke="rgba(255,255,255,.75)" strokeWidth={8} />
          </g>
          <MoscasCielo T={T} color="rgba(14,20,40,.75)" />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.2} until={K.Outro - 0.1} texto="son su sombra" x={340} y={440} tam={46} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Gel - 0.1} texto="No están en el aire: *están en tu ojo.*" />
      <Subtitulo T={T} idx={1} at={K.Gel + 0.1} until={K.Fibras - 0.1} texto="Un gel casi de agua: *humor vítreo.*" />
      <Subtitulo T={T} idx={2} at={K.Fibras + 0.1} until={K.Grumos - 0.1} texto="Lo sostiene una red de *colágeno.*" />
      <Subtitulo T={T} idx={3} at={K.Grumos + 0.1} until={K.Sombra - 0.1} texto="Con los años: *grumitos y hebras.*" />
      <Subtitulo T={T} idx={4} at={K.Sombra + 0.1} until={K.Escapan - 0.1} texto="Lo que ves es *su sombra.*" />
      <Subtitulo T={T} idx={5} at={K.Escapan + 0.1} until={K.Pregunta - 0.1} texto="Por eso *se escapan.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Fondo - 0.1} texto="¿Por qué *en el cielo?*" />
      <Subtitulo T={T} idx={7} at={K.Fondo + 0.1} until={K.Estudio - 0.1} texto="Fondo claro y parejo: *resaltan.*" />
      <Subtitulo T={T} idx={8} at={K.Estudio + 0.1} until={K.Aviso - 0.1} texto="603 personas: *76 %* las ve." />
      <Subtitulo T={T} idx={9} at={K.Aviso + 0.1} until={K.Cierre - 0.1} texto="Al oftalmólogo *ese mismo día.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu ojo *viéndose a sí mismo.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Gel + 2.6, K.Fibras - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Grumos + 1.5, K.Sombra - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Sombra + 2.6, K.Escapan - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pregunta + 0.05, K.Fondo + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Fondo + 1.0, K.Estudio - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Estudio + 4.2, K.Aviso - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Aviso + 0.3, K.Cierre - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="11" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function MoscasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Moscas /></CompositionStage></div>;
}
window.MoscasApp = MoscasApp;
