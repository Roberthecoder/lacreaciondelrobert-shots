// Shot Científico #36 · Nadie ve el mismo arcoíris que tú — NARRADO (N1 "Por dentro" la gota + N3 el ángulo de 42°).
// Datos: HyperPhysics (GSU), Scientific American 1999, Met Office, BBC Science Focus, The Irish Times. Ver guion.md y verificacion.md.
// Dibujo esquemático: los tamaños no van a escala y la separación de colores dentro de la gota está exagerada para que se vea.
// Física que se respeta: Sol DETRÁS de la persona, lluvia enfrente; el rojo a ≈ 42° de la sombra de la cabeza (punto antisolar);
// cada arcoíris está centrado en la sombra de la cabeza de quien lo ve; el secundario va por fuera y con los colores al revés.
const AR_COL = ['#ff3b2f', '#ff8a1f', '#ffe11a', '#3fbf4a', '#2b7bff', '#8a3cff'];   // de afuera (rojo) hacia adentro (violeta)
const AR_N = [1.30, 1.315, 1.33, 1.345, 1.36, 1.375];                                 // índices exagerados (solo para abrir el abanico)
const HOR = 1000, SY = 1110, RA = 500, RB2 = Math.round(RA * 51 / 42), BANDA = 15;    // vista de espaldas: horizonte, sombra de la cabeza, radios
const PIES = 1900, PALTO = 440, CABEZA_Y = PIES - PALTO * 0.9 - 6;                     // persona de espaldas
const PASTO = '#46c45a', PASTO2 = '#35a84a';
// vista de lado
const GY = 1080, PX = 220, OJO = [266, 682], SOL = [70, 568];
const ANTI = [OJO[0] + (GY - OJO[1]) / Math.tan(Math.PI / 6), GY];                   // donde la línea Sol→cabeza toca el suelo (sombra de la cabeza)

// Trazo de un rayo dentro de una gota (radio R, centro 0,0). h = altura de entrada (negativo = arriba), n = índice, reb = rebotes.
function trazaGota(R, h, n, reb) {
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const refr = (d, N, eta) => { const ci = -dot(N, d), k = 1 - eta * eta * (1 - ci * ci), f = eta * ci - Math.sqrt(Math.max(0, k)); return [eta * d[0] + f * N[0], eta * d[1] + f * N[1]]; };
  let P = [-Math.sqrt(R * R - h * h), h], d = [1, 0];
  const pts = [P];
  d = refr(d, [P[0] / R, P[1] / R], 1 / n);
  for (let i = 0; i <= reb; i++) {
    const s = -2 * dot(P, d); P = [P[0] + s * d[0], P[1] + s * d[1]]; pts.push(P);
    const N = [P[0] / R, P[1] / R];
    if (i < reb) { const c = dot(d, N); d = [d[0] - 2 * c * N[0], d[1] - 2 * c * N[1]]; } else d = refr(d, [-N[0], -N[1]], n);
  }
  return { pts, d };
}
const ptsTxt = (pts) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
// Ángulos (grados, y hacia abajo) donde un círculo de centro (cx, cy) y radio R cruza la línea y = recorte.
function arcoLimites(cy, R, recorte) {
  const s = kclamp((cy - recorte) / R, -1, 1), d = Math.asin(s) * 180 / Math.PI;
  return [180 + d, 360 - d];
}
function arcoPts(cx, cy, R, a0, a1, paso = 2) {
  const out = [], n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / paso));
  for (let i = 0; i <= n; i++) { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; out.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  return out;
}
// Arcoíris de 6 bandas. inv = colores al revés (secundario). completo = círculo entero (desde avión). p = cuánto se ha dibujado.
function Arcoiris({ id, cx, cy = SY, R = RA, banda = BANDA, inv = false, p = 1, o = 1, recorte = HOR, completo = false, borde = 0.45 }) {
  if (p <= 0.005 || o <= 0.01) return null;
  const cols = inv ? [...AR_COL].reverse() : AR_COL;
  let a0, a1;
  if (completo) { a0 = 90; a1 = 90 + 360 * p; } else { const [l, r] = arcoLimites(cy, R + 3 * banda, recorte); a0 = l - 4; a1 = a0 + (r - l + 8) * p; }
  const camino = (rr) => 'M ' + ptsTxt(arcoPts(cx, cy, rr, a0, a1)).replace(/ /g, ' L ');
  return <g opacity={o}>
    {!completo && <defs><clipPath id={`clip-${id}`}><rect x={-400} y={-400} width={KW + 800} height={recorte + 400} /></clipPath></defs>}
    <g clipPath={completo ? undefined : `url(#clip-${id})`}>
      <path d={camino(R)} fill="none" stroke={KC.ink} strokeWidth={banda * 6 + 10} opacity={borde} />
      {cols.map((c, i) => <path key={i} d={camino(R + (2.5 - i) * banda)} fill="none" stroke={c} strokeWidth={banda + 1} />)}
      <path d={camino(R + 2.5 * banda)} fill="none" stroke="#fff" strokeWidth={3} opacity=".35" />
    </g>
  </g>;
}
// Círculo punteado (el cono visto de frente): la parte de arriba del horizonte y, si abajo = true, la que tapa el suelo.
function CirculoGuia({ cx, cy = SY, R = RA, p = 1, color = '#fff', o = 1, abajo = false, T = 0 }) {
  if (p <= 0.01 || o <= 0.01) return null;
  const [l, r] = arcoLimites(cy, R, HOR);
  const arr = arcoPts(cx, cy, R, l, l + (r - l) * p);
  return <g opacity={o}>
    <polyline points={ptsTxt(arr)} fill="none" stroke={color} strokeWidth={6} strokeDasharray="18 14" strokeDashoffset={-T * 30} strokeLinecap="round" />
    {abajo && <polyline points={ptsTxt(arcoPts(cx, cy, R, r, l + 360))} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="10 16" opacity=".6" strokeLinecap="round" />}
  </g>;
}
// Gotas de lluvia que caen. Las que cruzan un círculo `circ` (ya revelado hasta `p`) se pintan de rojo con un halo del color de la persona.
function LluviaGotas({ T, seed = 3, n = 210, y0 = 280, y1 = HOR, vel = 70, circ = [] }) {
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => {
    const x = 20 + g() * (KW - 40), off = g() * (y1 - y0), v = vel * (0.8 + 0.4 * g());
    const y = y0 + ((off + T * v) % (y1 - y0));
    let rojo = 0, halo = null;
    for (const c of circ) {
      const dx = x - c.cx, dy = y - (c.cy || SY), d = Math.hypot(dx, dy), prox = 1 - Math.abs(d - (c.R || RA)) / (c.tol || 26);
      if (prox <= 0) continue;
      const [l, r] = arcoLimites(c.cy || SY, c.R || RA, HOR); let a = Math.atan2(dy, dx) * 180 / Math.PI; if (a < 90) a += 360;
      const frac = (a - l) / (r - l);
      if (frac < 0 || frac > (c.p == null ? 1 : c.p)) continue;
      const k = kclamp(prox * 1.6, 0, 1) * (c.o == null ? 1 : c.o);
      if (k > rojo) { rojo = k; halo = c.halo; }
    }
    return <g key={i}>
      {rojo > 0.05 && halo && <circle cx={x} cy={y} r={20} fill="none" stroke={halo} strokeWidth={5} opacity={rojo} />}
      <circle cx={x} cy={y} r={7 + 5 * rojo} fill={rojo > 0.05 ? AR_COL[0] : 'rgba(255,255,255,.6)'} stroke={rojo > 0.05 ? KC.ink : 'none'} strokeWidth={3} opacity={0.55 + 0.45 * rojo} />
    </g>; })}</g>;
}
// Rayitas de lluvia.
function Chubasco({ T, seed = 7, n = 46, x0 = 0, x1 = KW, y0 = 260, y1 = HOR, vel = 1300, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = x0 + g() * (x1 - x0), ph = g() * 3000, l = 40 + g() * 40, alto = y1 - y0;
    const y = y0 + ((T * vel + ph) % (alto + l)) - l;
    return <line key={i} x1={x} y1={Math.max(y0, y)} x2={x - 6} y2={Math.min(y1, y + l)} stroke="rgba(255,255,255,.55)" strokeWidth={4} strokeLinecap="round" />; })}</g>;
}
function NubesLluvia({ T, y = 200, xs = [80, 380, 700, 1000] }) {
  return <g>{xs.map((x, i) => <Nube key={i} x={x + Math.sin(T * 0.3 + i) * 12} y={y + (i % 2) * 40} s={1.25} color="#8f99ad" />)}</g>;
}
// Persona de espaldas (se ve la nuca). (x, yPies) = pies.
function PersonaEspalda({ x, yPies = PIES, alto = PALTO, color = KC.pink, o = 1 }) {
  const s = alto / 600;
  return <g transform={`translate(${x} ${yPies}) scale(${s})`} opacity={o}>
    <rect x={-70} y={-240} width={60} height={240} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <rect x={10} y={-240} width={60} height={240} rx={24} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-470} width={60} height={200} rx={26} fill={color} stroke={KC.ink} strokeWidth={9} transform="rotate(14 -120 -450)" />
    <rect x={90} y={-470} width={60} height={200} rx={26} fill={color} stroke={KC.ink} strokeWidth={9} transform="rotate(-14 120 -450)" />
    <rect x={-95} y={-480} width={190} height={260} rx={46} fill={color} stroke={KC.ink} strokeWidth={9} />
    <rect x={-24} y={-505} width={48} height={40} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-62} cy={-545} r={15} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={62} cy={-545} r={15} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={-550} r={64} fill={CPELO} stroke={KC.ink} strokeWidth={9} />
    <path d="M -30 -590 Q 0 -605 30 -590" stroke="#4a3a30" strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Sombra larga de la persona hacia adelante (el Sol está detrás) y la sombra de su cabeza en (x, SY).
function SombraPersona({ x, o = 1, p = 1 }) {
  if (o <= 0.01 || p <= 0.01) return null;
  const sy = klerp(PIES - 20, SY, p);
  return <g opacity={o}>
    <path d={`M ${x - 55} ${PIES - 14} L ${x + 55} ${PIES - 14} L ${x + 20} ${sy + 18} L ${x - 20} ${sy + 18} Z`} fill="rgba(10,50,25,.42)" />
    <ellipse cx={x} cy={sy} rx={34} ry={20} fill="rgba(10,50,25,.5)" />
  </g>;
}
// Marca que late sobre la sombra de la cabeza.
function PuntoSombra({ T, x, y = SY, color = KC.yellow, o = 1 }) {
  if (o <= 0.01) return null;
  const l = 1 + 0.25 * Math.max(0, Math.sin(T * 6));
  return <g opacity={o}><circle cx={x} cy={y} r={30 * l} fill="none" stroke={color} strokeWidth={7} /><circle cx={x} cy={y} r={9} fill={color} stroke={KC.ink} strokeWidth={4} /></g>;
}
// Cono de la mirada visto desde atrás: abanico de la cabeza al arco.
function ConoMirada({ hx, hy = CABEZA_Y, cx, cy = SY, R = RA, color, o = 1 }) {
  if (o <= 0.01) return null;
  const [l, r] = arcoLimites(cy, R, HOR), arr = arcoPts(cx, cy, R, l, r, 4);
  const pts = [[hx, hy], ...arr];
  return <g opacity={o}>
    <polygon points={ptsTxt(pts)} fill={color} opacity=".2" />
    {[arr[0], arr[Math.floor(arr.length / 2)], arr[arr.length - 1]].map((q, i) =>
      <line key={i} x1={hx} y1={hy} x2={q[0]} y2={q[1]} stroke={color} strokeWidth={6} strokeDasharray="16 12" strokeLinecap="round" />)}
  </g>;
}
// Paisaje visto desde atrás de las personas. cielo = lo que va en el cielo (arcoíris, gotas); frente = encima del suelo.
function VistaEspalda({ T, personas = [], cielo, frente, sombras = true, lluvia = 1 }) {
  return <>
    <FondoLunares color={KC.cyan} />
    <Lienzo>
      <rect x={0} y={250} width={KW} height={HOR - 250} fill="rgba(35,55,120,.3)" />
      <Chubasco T={T} o={lluvia} />
      <NubesLluvia T={T} />
      {cielo}
      <rect x={0} y={HOR} width={KW} height={KH - HOR} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
      {[1060, 1160, 1300, 1480, 1700].map((y, i) => <line key={i} x1={0} y1={y} x2={KW} y2={y} stroke={PASTO2} strokeWidth={6 + i * 3} opacity=".55" />)}
      {sombras && personas.map((p, i) => <SombraPersona key={i} x={p.x + (p.dx || 0)} o={p.o == null ? 1 : p.o} p={p.sombra == null ? 1 : p.sombra} />)}
      {frente}
      {personas.map((p, i) => <PersonaEspalda key={i} x={p.x + (p.dx || 0)} color={p.color} o={p.o == null ? 1 : p.o} />)}
      {personas.map((p, i) => p.etq && <TextoSvg key={'e' + i} x={p.x + (p.dx || 0)} y={1418} tam={40} fuente="texto" color={p.color} o={p.o == null ? 1 : p.o}>{p.etq}</TextoSvg>)}
    </Lienzo>
  </>;
}
// Persona de lado (mira a la derecha), con la cabeza de perfil.
function PersonaPerfil({ x = PX, yPies = GY, color = KC.pink }) {
  return <g>
    <rect x={x - 32} y={yPies - 150} width={42} height={150} rx={18} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 5} y={yPies - 150} width={42} height={150} rx={18} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 55} y={yPies - 315} width={105} height={190} rx={36} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={x - 16} y={yPies - 300} width={44} height={150} rx={20} fill={color} stroke={KC.ink} strokeWidth={8} transform={`rotate(-12 ${x} ${yPies - 290})`} />
    <CabezaPerfil x={x} y={yPies - 385} s={0.42} />
  </g>;
}
// Paisaje de lado: Sol detrás (izquierda), persona, lluvia enfrente (derecha).
function VistaLado({ T, children, lluvia = 1 }) {
  return <>
    <FondoLunares color={KC.cyan} />
    <Lienzo>
      <rect x={600} y={460} width={KW - 600} height={GY - 460} fill="rgba(35,55,120,.3)" />
      <Chubasco T={T} x0={620} x1={KW} y0={480} y1={GY} n={26} o={lluvia} seed={11} />
      <Nube x={700} y={470} s={1.0} color="#8f99ad" />
      <Nube x={940} y={440} s={1.35} color="#8f99ad" />
      <SolDibujo x={SOL[0]} y={SOL[1]} r={70} T={T} />
      <rect x={0} y={GY} width={KW} height={KH - GY} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
      {children}
      <PersonaPerfil />
    </Lienzo>
  </>;
}
// Gota por dentro (para la Lupa). reb = 1 (arcoíris principal) o 2 (secundario). t0 = cuándo arranca.
function GotaPorDentro({ T, t0, r, reb = 1 }) {
  const Rg = r * 0.58, c = [r, r], h = reb === 1 ? -0.86 * Rg : 0.95 * Rg;
  const base = trazaGota(Rg, h, 1.335, reb), P = base.pts.map((q) => [q[0] + c[0], q[1] + c[1]]);
  const seg = reb === 1 ? [[0.5, 1.2], [1.4, 2.1], [2.5, 3.1]] : [[0.3, 0.7], [0.8, 1.2], [1.3, 1.7], [1.8, 2.2]];
  const ini = [0, P[0][1]];
  const tramo = (a, b, k) => { const pr = kprog(T, t0 + seg[k][0], t0 + seg[k][1]); return pr > 0 ? <line x1={a[0]} y1={a[1]} x2={klerp(a[0], b[0], pr)} y2={klerp(a[1], b[1], pr)} stroke="#fff" strokeWidth={9} strokeLinecap="round" /> : null; };
  const fan = kprog(T, t0 + (reb === 1 ? 3.3 : 2.3), t0 + (reb === 1 ? 4.1 : 3.0), kEase.sale), sal = P[P.length - 1];
  return <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`}>
    <circle cx={c[0]} cy={c[1]} r={Rg} fill="rgba(143,220,255,.22)" stroke="#8fdcff" strokeWidth={8} />
    <ellipse cx={c[0] - Rg * 0.4} cy={c[1] - Rg * 0.5} rx={Rg * 0.16} ry={Rg * 0.09} fill="#fff" opacity=".7" transform={`rotate(-35 ${c[0] - Rg * 0.4} ${c[1] - Rg * 0.5})`} />
    {tramo(ini, P[0], 0)}
    {P.slice(1).map((q, i) => <g key={i}>{tramo(P[i], q, i + 1)}</g>)}
    {AR_N.map((n, i) => { const d = trazaGota(Rg, h, n, reb).d, L = r * 0.9 * fan;
      return fan > 0 && <line key={i} x1={sal[0]} y1={sal[1]} x2={sal[0] + d[0] * L} y2={sal[1] + d[1] * L} stroke={AR_COL[i]} strokeWidth={8} strokeLinecap="round" />; })}
    {P.slice(1, -1).map((q, i) => { const at = t0 + seg[i + 1][1]; return T > at && <g key={'r' + i} opacity={kprog(T, at, at + 0.25)}>
      <circle cx={q[0]} cy={q[1]} r={18 + 6 * Math.sin(T * 8)} fill="none" stroke={KC.yellow} strokeWidth={5} />
      {reb === 2 && <text x={q[0] + (q[0] > r ? 30 : -30)} y={q[1] + 12} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{i + 1}</text>}
    </g>; })}
  </svg>;
}
// Avión visto desde arriba. sombra = silueta oscura.
function Avion({ x, y, s = 1, sombra = false, rot = 0 }) {
  const f = sombra ? 'rgba(10,30,40,.55)' : '#f4f6fb', st = sombra ? 'none' : KC.ink;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -150 10 L 0 -30 L 150 10 L 150 34 L 0 18 L -150 34 Z" fill={f} stroke={st} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 112 L 0 92 L 60 112 L 60 126 L 0 118 L -60 126 Z" fill={f} stroke={st} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-20} y={-120} width={40} height={250} rx={20} fill={f} stroke={st} strokeWidth={7} />
    {!sombra && <><circle cx={0} cy={-90} r={8} fill="#2b3a67" /><rect x={-80} y={14} width={22} height={34} rx={8} fill="#c9d2dc" stroke={KC.ink} strokeWidth={4} /><rect x={58} y={14} width={22} height={34} rx={8} fill="#c9d2dc" stroke={KC.ink} strokeWidth={4} /></>}
  </g>;
}
// Destellos (cierre).
function Destellos({ T, pts, color = '#fff', o = 1 }) {
  return <g opacity={o}>{pts.map(([x, y], i) => { const k = 0.5 + 0.5 * Math.sin(T * 5 + i * 1.7), s = 10 + 16 * k;
    return <path key={i} d={`M ${x} ${y - s} L ${x + s * 0.25} ${y - s * 0.25} L ${x + s} ${y} L ${x + s * 0.25} ${y + s * 0.25} L ${x} ${y + s} L ${x - s * 0.25} ${y + s * 0.25} L ${x - s} ${y} L ${x - s * 0.25} ${y - s * 0.25} Z`} fill={color} opacity={0.4 + 0.6 * k} />; })}</g>;
}

function Arcoiris36() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const XA = 330, XB = 610;
  // gancho: un solo arcoíris que se parte en dos (0.35 s) y los conos de cada quien (1.4 s)
  const SPLIT = kprog(T, 0.35, 1.3, kEase.suave);
  // ángulo (vista de lado)
  const AG = K.Angulo, angCol = (i) => 12 - i * 1.6;          // grados sobre la horizontal (separación exagerada; el rojo sí va a 42° de la línea antisolar)
  const finLinea = (deg) => { const a = deg * Math.PI / 180, L = (930 - OJO[0]) / Math.cos(a); return [OJO[0] + L * Math.cos(a), OJO[1] - L * Math.sin(a)]; };
  const CIR = K.Circulo, AV = K.Circulo + 3.9;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.cyan }}>
      {/* 0 · gancho: dos personas, un arcoíris que en realidad son dos */}
      <Escena T={T} a={K.Gancho} b={K.Gotas} fondo={KC.cyan}>
        <VistaEspalda T={T}
          personas={[{ x: XA, color: KC.pink, etq: 'TÚ' }, { x: XB, color: KC.cyan, etq: 'AL LADO' }]}
          cielo={<>
            <Arcoiris id="g-a" cx={klerp(470, XA, SPLIT)} o={klerp(1, 0.9, SPLIT)} />
            <Arcoiris id="g-b" cx={klerp(470, XB, SPLIT)} o={SPLIT > 0.02 ? 0.9 : 0} />
          </>}
          frente={<>
            <PuntoSombra T={T} x={XA} color={KC.pink} o={kprog(T, 1.2, 1.5)} />
            <PuntoSombra T={T} x={XB} color={KC.cyan} o={kprog(T, 1.2, 1.5)} />
            <ConoMirada hx={XA} cx={XA} color={KC.pink} o={kprog(T, 1.5, 2.0)} />
            <ConoMirada hx={XB} cx={XB} color={KC.cyan} o={kprog(T, 1.9, 2.4)} />
          </>} />
        <Chip T={T} at={2.5} until={K.Gotas - 0.1} texto="dos personas, dos arcoíris" x={300} y={330} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 1 · Sol detrás, lluvia enfrente (vista de lado) */}
      <Escena T={T} a={K.Gotas} b={K.Rebote} fondo={KC.cyan}>
        <VistaLado T={T}>
          {[-70, 0, 70].map((k, i) => { const at = K.Gotas + 0.9 + i * 0.15, a = Math.PI / 6, nx = -Math.sin(a), ny = Math.cos(a);
            const x1 = SOL[0] + 90 * Math.cos(a) + k * nx, y1 = SOL[1] + 90 * Math.sin(a) + k * ny, Lr = (650 - x1) / Math.cos(a);
            return <FlechaRecta key={i} x1={x1} y1={y1} x2={x1 + Lr * Math.cos(a)} y2={y1 + Lr * Math.sin(a)} p={kprog(T, at, at + 0.9, kEase.sale)} color={KC.yellow} grosor={10} punta={26} />; })}
          <TextoSvg x={SOL[0] + 40} y={SOL[1] - 110} tam={50} fuente="texto" color={KC.yellow} ancla="start" o={kprog(T, K.Gotas + 0.3, K.Gotas + 0.6)}>SOL</TextoSvg>
          {Array.from({ length: 14 }, (_, i) => { const g = krng(60 + i), x = 650 + g() * 410, y = 520 + (((T - K.Gotas) * 160 + g() * 560) % 560);
            return <circle key={i} cx={x} cy={y} r={11} fill="#8fdcff" stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.Gotas + 2.5, K.Gotas + 3.0)} />; })}
        </VistaLado>
        <Chip T={T} at={K.Gotas + 0.3} until={K.Rebote - 0.1} texto="Sol detrás de ti" x={290} y={330} tam={38} borde={KC.yellow} />
        <Chip T={T} at={K.Gotas + 2.5} until={K.Rebote - 0.1} texto="lluvia enfrente" x={800} y={330} tam={38} borde={KC.cyan} />
      </Escena>
      {/* 2 · la luz dentro de la gota: entra, se dobla, rebota en el fondo y sale en colores */}
      <Escena T={T} a={K.Rebote} b={K.Angulo} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          {Array.from({ length: 22 }, (_, i) => { const g = krng(90 + i), x = g() * KW, y = 300 + (((T - K.Rebote) * 80 + g() * 1300) % 1300);
            return <circle key={i} cx={x} cy={y} r={6 + g() * 8} fill="#8fdcff" opacity=".35" />; })}
          <circle cx={860} cy={500} r={16} fill="#8fdcff" stroke="#fff" strokeWidth={4} />
        </Lienzo>
        <Lupa T={T} at={K.Rebote + 0.15} until={K.Angulo - 0.35} x={540} y={735} r={315} fx={860} fy={500} tinte={KC.cyan}
          etiqueta="AL MICROSCOPIO · GOTA" interior={(Tl, r) => <GotaPorDentro T={Tl} t0={K.Rebote + 0.3} r={r} reb={1} />} />
        <Chip T={T} at={K.Rebote + 0.8} until={K.Rebote + 2.3} texto="entra y se dobla" x={540} y={360} tam={40} borde={KC.white} />
        <Chip T={T} at={K.Rebote + 2.6} until={K.Rebote + 3.6} texto="rebota en el fondo" x={540} y={360} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Rebote + 3.8} until={K.Angulo - 0.1} texto="sale en colores" x={540} y={360} tam={40} borde={KC.pink} />
      </Escena>
      {/* 3 · cada color, otro ángulo; el rojo a ≈ 42° de la sombra de la cabeza */}
      <Escena T={T} a={K.Angulo} b={K.Cono} fondo={KC.cyan}>
        <VistaLado T={T} lluvia={0.6}>
          {/* sombra de la persona y de su cabeza */}
          <path d={`M ${PX - 40} ${GY + 4} L ${ANTI[0]} ${GY + 4}`} stroke="rgba(10,50,25,.45)" strokeWidth={22} strokeLinecap="round" opacity={kprog(T, AG + 0.9, AG + 1.3)} />
          {/* línea antisolar: del Sol, por tu cabeza, a la sombra de tu cabeza */}
          {(() => { const p = kprog(T, AG + 0.2, AG + 1.2, kEase.sale), x = klerp(SOL[0], ANTI[0], p), y = klerp(SOL[1], ANTI[1], p);
            return <line x1={SOL[0]} y1={SOL[1]} x2={x} y2={y} stroke={KC.yellow} strokeWidth={7} strokeDasharray="20 14" strokeLinecap="round" />; })()}
          <PuntoSombra T={T} x={ANTI[0]} y={ANTI[1]} o={kprog(T, AG + 1.1, AG + 1.4)} />
          <TextoSvg x={ANTI[0] - 150} y={GY + 62} tam={36} fuente="texto" color={KC.texto} o={kprog(T, AG + 1.2, AG + 1.5)}>sombra de tu cabeza</TextoSvg>
          {/* abanico de colores hacia las gotas */}
          {AR_COL.map((c, i) => { const at = AG + 1.4 + i * 0.12, q = finLinea(angCol(i)), p = kprog(T, at, at + 0.5, kEase.sale), apaga = i ? 1 - 0.7 * kprog(T, AG + 3.0, AG + 3.3) : 1;
            return p > 0 && <g key={i} opacity={apaga}>
              <line x1={OJO[0]} y1={OJO[1]} x2={klerp(OJO[0], q[0], p)} y2={klerp(OJO[1], q[1], p)} stroke={c} strokeWidth={i ? 7 : 10} strokeLinecap="round" />
              <circle cx={q[0]} cy={q[1]} r={15} fill={c} stroke={KC.ink} strokeWidth={4} opacity={kprog(p, 0.8, 1)} />
            </g>; })}
          {/* el ángulo de ≈ 42° entre la línea de la sombra y la del rojo */}
          {(() => { const p = kprog(T, AG + 3.0, AG + 3.6, kEase.sale); if (p <= 0) return null;
            const rr = 170, a1 = 30 * Math.PI / 180, a2 = a1 - (42 * p) * Math.PI / 180;
            return <g>
              <path d={`M ${OJO[0] + rr * Math.cos(a1)} ${OJO[1] + rr * Math.sin(a1)} A ${rr} ${rr} 0 0 0 ${OJO[0] + rr * Math.cos(a2)} ${OJO[1] + rr * Math.sin(a2)}`} fill="none" stroke={KC.ink} strokeWidth={14} />
              <path d={`M ${OJO[0] + rr * Math.cos(a1)} ${OJO[1] + rr * Math.sin(a1)} A ${rr} ${rr} 0 0 0 ${OJO[0] + rr * Math.cos(a2)} ${OJO[1] + rr * Math.sin(a2)}`} fill="none" stroke={KC.yellow} strokeWidth={8} />
              <TextoSvg x={OJO[0] + 330} y={OJO[1] + 70} tam={96} color={KC.yellow} s={klerp(0.4, 1, kprog(T, AG + 3.3, AG + 3.7, kEase.rebote))} o={kprog(T, AG + 3.3, AG + 3.5)}>≈ 42°</TextoSvg>
            </g>; })()}
        </VistaLado>
        <Chip T={T} at={AG + 1.4} until={AG + 2.9} texto="cada color, otro ángulo" x={540} y={330} tam={40} borde={KC.white} />
        <Chip T={T} at={AG + 3.1} until={K.Cono - 0.1} texto="rojo: ≈ 42° de tu sombra" x={540} y={330} tam={40} borde={AR_COL[0]} />
      </Escena>
      {/* 4 · solo ves rojas las gotas a ese ángulo: un círculo alrededor de tu sombra */}
      <Escena T={T} a={K.Cono} b={K.Pregunta} fondo={KC.cyan}>
        {(() => { const rev = kprog(T, K.Cono + 1.0, K.Cono + 3.4, kEase.suave);
          return <VistaEspalda T={T} personas={[{ x: 540, color: KC.pink, etq: 'TÚ' }]}
            cielo={<>
              <LluviaGotas T={T} seed={5} circ={[{ cx: 540, p: rev, halo: KC.yellow }]} />
              <CirculoGuia cx={540} p={rev} T={T} o={0.85} />
            </>}
            frente={<>
              <PuntoSombra T={T} x={540} o={kprog(T, K.Cono + 0.3, K.Cono + 0.6)} />
              <TextoSvg x={600} y={1128} tam={38} fuente="texto" color={KC.texto} ancla="start" o={kprog(T, K.Cono + 0.5, K.Cono + 0.8)}>tu sombra</TextoSvg>
              <ConoMirada hx={540} cx={540} color={KC.pink} o={kprog(T, K.Cono + 3.6, K.Cono + 4.2)} />
            </>} />; })()}
        <Chip T={T} at={K.Cono + 1.2} until={K.Cono + 3.4} texto="solo esas gotas se ven rojas" x={540} y={330} tam={38} borde={AR_COL[0]} />
        <Chip T={T} at={K.Cono + 3.6} until={K.Pregunta - 0.1} texto="un círculo alrededor de tu sombra" x={540} y={330} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 5 · ¿y la persona de al lado? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Otras} color={KC.lilac} />
      {/* 6 · su cabeza está en otro lugar: su círculo pasa por otras gotas */}
      <Escena T={T} a={K.Otras} b={K.Propio} fondo={KC.cyan}>
        {(() => { const entra = kprog(T, K.Otras + 0.2, K.Otras + 1.0, kEase.sale), revB = kprog(T, K.Otras + 2.0, K.Otras + 3.8, kEase.suave);
          return <VistaEspalda T={T}
            personas={[{ x: XA, color: KC.pink, etq: 'TÚ' }, { x: XB, dx: (1 - entra) * 520, color: KC.cyan, etq: 'AL LADO', sombra: kprog(T, K.Otras + 1.0, K.Otras + 1.6) }]}
            cielo={<>
              <LluviaGotas T={T} seed={5} circ={[{ cx: XA, halo: KC.pink }, { cx: XB, p: revB, halo: KC.cyan }]} />
              <CirculoGuia cx={XA} T={T} color={KC.pink} o={0.9} />
              <CirculoGuia cx={XB} p={revB} T={T} color="#fff" o={0.95} />
            </>}
            frente={<>
              <PuntoSombra T={T} x={XA} color={KC.pink} />
              <PuntoSombra T={T} x={XB} color={KC.cyan} o={kprog(T, K.Otras + 1.4, K.Otras + 1.7)} />
            </>} />; })()}
        <Chip T={T} at={K.Otras + 1.2} until={K.Otras + 3.2} texto="su sombra: en otro lugar" x={540} y={330} tam={38} borde={KC.cyan} />
        <Chip T={T} at={K.Otras + 3.4} until={K.Propio - 0.1} texto="otras gotas" x={540} y={330} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 7 · cada quien su arcoíris: mismos colores, desplazados, cada uno centrado en la sombra de su cabeza */}
      <Escena T={T} a={K.Propio} b={K.Circulo} fondo={KC.cyan}>
        <VistaEspalda T={T}
          personas={[{ x: XA, color: KC.pink, etq: 'TÚ' }, { x: XB, color: KC.cyan, etq: 'AL LADO' }]}
          cielo={<>
            <Arcoiris id="p-a" cx={XA} p={kprog(T, K.Propio + 0.1, K.Propio + 1.0, kEase.suave)} o={0.92} />
            <Arcoiris id="p-b" cx={XB} p={kprog(T, K.Propio + 0.5, K.Propio + 1.4, kEase.suave)} o={0.92} />
            <TextoSvg x={XA - 40} y={548} tam={46} fuente="texto" color={KC.pink} o={kprog(T, K.Propio + 1.0, K.Propio + 1.3)}>TUYO</TextoSvg>
            <TextoSvg x={XB + 40} y={548} tam={46} fuente="texto" color={KC.cyan} o={kprog(T, K.Propio + 1.4, K.Propio + 1.7)}>SUYO</TextoSvg>
          </>}
          frente={<>
            <PuntoSombra T={T} x={XA} color={KC.pink} />
            <PuntoSombra T={T} x={XB} color={KC.cyan} />
            {[XA, XB].map((x, i) => { const p = kprog(T, K.Propio + 1.6 + i * 0.2, K.Propio + 2.2 + i * 0.2);
              return p > 0 && <line key={i} x1={x} y1={SY} x2={x} y2={klerp(SY, SY - RA + 3 * BANDA, p)} stroke={i ? KC.cyan : KC.pink} strokeWidth={5} strokeDasharray="12 10" />; })}
          </>} />
        <Chip T={T} at={K.Propio + 1.6} until={K.Circulo - 0.1} texto="mismos colores, otro centro" x={540} y={330} tam={38} borde={KC.yellow} />
      </Escena>
      {/* 8a · desde el suelo: solo la parte de arriba */}
      <Escena T={T} a={CIR} b={AV} fondo={KC.cyan}>
        <VistaEspalda T={T} personas={[{ x: 540, color: KC.pink }]}
          cielo={<Arcoiris id="c-a" cx={540} p={kprog(T, CIR - 0.2, CIR + 0.6, kEase.suave)} />}
          frente={<>
            {(() => { const [l, r] = arcoLimites(SY, RA, HOR), p = kprog(T, CIR + 1.2, CIR + 2.6, kEase.suave);
              return p > 0 && <polyline points={ptsTxt(arcoPts(540, SY, RA, r, r + (360 - (r - l)) * p))} fill="none" stroke="#fff" strokeWidth={7} strokeDasharray="16 14" strokeLinecap="round" opacity=".85" />; })()}
            <PuntoSombra T={T} x={540} />
          </>} />
        <Chip T={T} at={CIR + 0.3} until={AV - 0.1} texto="desde el suelo: solo la parte de arriba" x={540} y={330} tam={34} borde={KC.yellow} />
      </Escena>
      {/* 8b · desde un avión: el círculo completo, alrededor de la sombra del avión */}
      <Escena T={T} a={AV} b={K.Doble} fondo={KC.mint} zoom={0.08}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {/* campos vistos desde arriba */}
          {Array.from({ length: 7 }, (_, i) => Array.from({ length: 5 }, (_, j) => { const g = krng(i * 9 + j);
            return <rect key={`${i}-${j}`} x={j * 230 - 40 + g() * 20} y={560 + i * 140} width={210} height={124} rx={10} fill={['#3fbf4a', '#7fd35a', '#c9e36a', '#2fa86e'][(i + j) % 4]} stroke={KC.ink} strokeWidth={4} opacity=".85" />; }))}
          <rect x={0} y={540} width={KW} height={760} fill="rgba(35,55,120,.32)" />
          <Chubasco T={T} y0={560} y1={1260} n={40} seed={21} />
          <Arcoiris id="av" cx={540} cy={900} R={250} banda={14} completo p={kprog(T, AV + 0.4, AV + 1.6, kEase.suave)} />
          <Avion x={540} y={900} s={0.32} sombra />
          {(() => { const p = kprog(T, AV + 0.2, AV + 0.7); return <line x1={540} y1={450} x2={540} y2={klerp(450, 860, p)} stroke={KC.yellow} strokeWidth={6} strokeDasharray="14 12" opacity={p} />; })()}
          <Avion x={540 + Math.sin(T * 1.2) * 8} y={420} s={0.9} rot={Math.sin(T * 1.2) * 3} />
        </Lienzo>
        <Chip T={T} at={AV + 0.6} until={K.Doble - 0.1} texto="desde un avión: redondo" x={540} y={230} tam={40} borde={AR_COL[2]} />
      </Escena>
      {/* 9 · dos rebotes: segundo arcoíris más arriba y con los colores al revés */}
      <Escena T={T} a={K.Doble} b={K.Cierre} fondo={KC.cyan}>
        <VistaEspalda T={T} personas={[{ x: 540, color: KC.pink }]}
          cielo={<>
            <Arcoiris id="d-a" cx={540} />
            <Arcoiris id="d-b" cx={540} R={RB2} inv p={kprog(T, K.Doble + 3.6, K.Doble + 4.6, kEase.suave)} o={0.85} />
            {(() => { const o = kprog(T, K.Doble + 4.7, K.Doble + 5.1);
              return o > 0 && <g opacity={o}>
                <TextoSvg x={540} y={SY - RB2 - 3 * BANDA - 18} tam={40} fuente="texto" color={KC.texto}>2º: rojo adentro</TextoSvg>
                <TextoSvg x={540} y={SY - RA + 3 * BANDA + 48} tam={40} fuente="texto" color={KC.texto}>1º: rojo afuera</TextoSvg>
              </g>; })()}
          </>}
          frente={<PuntoSombra T={T} x={540} />} />
        <Lupa T={T} at={K.Doble + 0.1} until={K.Doble + 3.5} x={540} y={680} r={250} fx={300} fy={520} tinte={KC.yellow}
          etiqueta="AL MICROSCOPIO · GOTA" interior={(Tl, r) => <GotaPorDentro T={Tl} t0={K.Doble + 0.2} r={r} reb={2} />} />
        <Chip T={T} at={K.Doble + 0.7} until={K.Doble + 3.5} texto="rebota dos veces" x={540} y={330} tam={40} borde={KC.yellow} />
        <Chip T={T} at={K.Doble + 3.8} until={K.Cierre - 0.1} texto="más arriba · colores al revés" x={540} y={330} tam={38} borde={AR_COL[5]} />
      </Escena>
      {/* 10 · cierre: las dos personas del inicio, cada una con su arcoíris */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <VistaEspalda T={T}
          personas={[{ x: XA, color: KC.pink, etq: 'TÚ' }, { x: XB, color: KC.cyan, etq: 'AL LADO' }]}
          cielo={<>
            <Arcoiris id="f-a" cx={XA} o={0.92} />
            <Arcoiris id="f-b" cx={XB} o={0.92} />
            <TextoSvg x={XA - 40} y={548} tam={46} fuente="texto" color={KC.pink}>TUYO</TextoSvg>
            <TextoSvg x={XB + 40} y={548} tam={46} fuente="texto" color={KC.cyan}>SUYO</TextoSvg>
            <Destellos T={T} o={kprog(T, K.Cierre + 1.0, K.Cierre + 1.6)} pts={[[150, 700], [420, 640], [700, 690], [960, 780], [250, 880], [860, 900]]} />
          </>}
          frente={<>
            <PuntoSombra T={T} x={XA} color={KC.pink} />
            <PuntoSombra T={T} x={XB} color={KC.cyan} />
            <ConoMirada hx={XA} cx={XA} color={KC.pink} o={0.8 * kprog(T, K.Cierre + 0.4, K.Cierre + 0.9)} />
            <ConoMirada hx={XB} cx={XB} color={KC.cyan} o={0.8 * kprog(T, K.Cierre + 0.8, K.Cierre + 1.3)} />
          </>} />
        <Chip T={T} at={K.Cierre + 2.4} until={K.Outro - 0.1} texto="hecho para tus ojos" x={540} y={330} tam={42} borde={KC.pink} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Gotas - 0.1} texto="Nadie ve el *mismo arcoíris* que tú." />
      <Subtitulo T={T} idx={1} at={K.Gotas + 0.1} until={K.Rebote - 0.1} texto="Sol *detrás*, lluvia *enfrente*." />
      <Subtitulo T={T} idx={2} at={K.Rebote + 0.1} until={K.Angulo - 0.1} texto="Entra, se dobla, *rebota* y sale en colores." />
      <Subtitulo T={T} idx={3} at={K.Angulo + 0.1} until={K.Cono - 0.1} texto="El rojo: *≈ 42°* de tu sombra." />
      <Subtitulo T={T} idx={4} at={K.Cono + 0.1} until={K.Pregunta - 0.1} texto="Un *círculo* alrededor de tu sombra." />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Otras - 0.1} texto="¿Y la persona *de al lado?*" />
      <Subtitulo T={T} idx={6} at={K.Otras + 0.1} until={K.Propio - 0.1} texto="Su círculo pasa por *otras gotas.*" />
      <Subtitulo T={T} idx={7} at={K.Propio + 0.1} until={K.Circulo - 0.1} texto="Cada quien, *su propio arcoíris.*" />
      <Subtitulo T={T} idx={8} at={K.Circulo + 0.1} until={K.Doble - 0.1} texto="En realidad es un *círculo completo.*" />
      <Subtitulo T={T} idx={9} at={K.Doble + 0.1} until={K.Cierre - 0.1} texto="Dos rebotes: *colores al revés.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Hecho para *tus ojos.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gotas - 0.3, 'avatar_11_sorprendido', 'gancho'],
        [K.Gotas + 2.4, K.Rebote - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Rebote + 2.9, K.Angulo - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Angulo + 3.0, K.Cono - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cono + 3.4, K.Pregunta - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Otras - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Otras + 2.8, K.Propio - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Propio + 0.6, K.Circulo - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Circulo + 4.5, K.Doble - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Doble + 3.4, K.Cierre - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Cierre + 1.0, K.Outro - 0.1, 'avatar_08_recostado_mano', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="36" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function ArcoirisApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Arcoiris36 /></CompositionStage></div>;
}
window.ArcoirisApp = ArcoirisApp;
