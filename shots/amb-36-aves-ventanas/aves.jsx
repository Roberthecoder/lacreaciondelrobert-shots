// Shot Ambiental #36 · Esa ventana no es una pared para un pájaro: es cielo — NARRADO (N1 por dentro + toque de N5).
// Datos: Loss et al. 2014 (The Condor) y guía del U.S. Fish and Wildlife Service (2021). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (rayos de luz, separación de rayas y golpe en la cabeza no están a escala).

const AV = { cielo1: '#7fd3ff', cielo2: '#d8f3ff', vidrio: '#9fe3f5', marco: '#f4efe4', muro: '#f6d9a8', muro2: '#e8c38a', pasto: '#7cc46a', cafe: '#a8794a', cafe2: '#6e4a2a', panza: '#ece0c8' };

// Gorrión común (Passer domesticus, macho) de perfil, mirando a la derecha. ala = fase del aleteo (radianes); vuela=false → posado.
function Gorrion({ x, y, s = 1, ala = 0, rot = 0, dir = 1, vuela = true, o = 1, ko = false }) {
  const a = vuela ? Math.sin(ala) * 38 : 6;
  return <g transform={`translate(${x} ${y}) scale(${s * dir} ${s}) rotate(${rot})`} opacity={o}>
    {/* cola */}
    <path d="M -50 -4 L -112 -22 L -116 4 L -54 14 Z" fill={AV.cafe2} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {!vuela && <g stroke={KC.ink} strokeWidth={5} strokeLinecap="round"><line x1={-4} y1={32} x2={-10} y2={58} /><line x1={14} y1={32} x2={12} y2={58} /></g>}
    {/* cuerpo y panza */}
    <ellipse cx={0} cy={0} rx={62} ry={38} fill={AV.cafe} stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 14 Q 0 42 50 12 Q 30 34 -10 36 Q -34 30 -40 14 Z" fill={AV.panza} />
    {/* cabeza: corona gris, mejilla clara, babero negro */}
    <circle cx={52} cy={-26} r={30} fill={AV.panza} stroke={KC.ink} strokeWidth={6} />
    <path d="M 26 -40 Q 48 -62 76 -40 Q 60 -34 40 -32 Z" fill="#8d8d8d" />
    <path d="M 26 -40 Q 30 -30 44 -28" stroke={AV.cafe2} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 60 -8 Q 70 -2 66 8 Q 56 6 52 -4 Z" fill={KC.ink} />
    <path d="M 78 -30 L 100 -22 L 78 -16 Z" fill="#3b3631" stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    {ko ? <g stroke={KC.ink} strokeWidth={4}><line x1={58} y1={-34} x2={68} y2={-24} /><line x1={68} y1={-34} x2={58} y2={-24} /></g>
      : <><circle cx={64} cy={-30} r={6} fill={KC.ink} /><circle cx={66} cy={-32} r={2} fill="#fff" /></>}
    {/* ala con barras blancas */}
    <g transform={`rotate(${-a} -6 -16)`}>
      <path d="M -6 -16 Q -40 -70 -86 -62 Q -60 -30 -30 -6 Q -16 -2 -6 -16 Z" fill={AV.cafe2} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -24 -30 Q -48 -50 -70 -54" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M -34 -20 Q -52 -34 -76 -40" stroke={KC.ink} strokeWidth={3} fill="none" />
    </g>
  </g>;
}
function Arbol({ x, y, s = 1, o = 1, dash = false }) {
  const st = dash ? { strokeDasharray: '16 12' } : {};
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -18 0 L -12 -170 L 12 -170 L 18 0 Z" fill="#8a5a33" stroke={KC.ink} strokeWidth={6} {...st} />
    <path d="M 0 -120 L 50 -170" stroke="#8a5a33" strokeWidth={12} />
    <circle cx={-50} cy={-220} r={80} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} {...st} />
    <circle cx={50} cy={-230} r={84} fill="#35a83f" stroke={KC.ink} strokeWidth={6} {...st} />
    <circle cx={0} cy={-300} r={86} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} {...st} />
  </g>;
}
function Nube({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -90 20 Q -110 -20 -60 -30 Q -50 -70 0 -60 Q 40 -90 70 -40 Q 120 -40 100 20 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}
// Maceta con planta (la de tu sala).
function Maceta({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -20, 10, 40].map((a, i) => <path key={i} d={`M 0 -60 Q ${a} -150 ${a * 1.8} -200 Q ${a * 0.4} -130 0 -60 Z`} fill={i % 2 ? '#35a83f' : KC.leaf} stroke={KC.ink} strokeWidth={5} />)}
    <path d="M -50 -70 L 50 -70 L 38 0 L -38 0 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>;
}
// Lo que refleja el vidrio: cielo, nubes que pasan y la copa de un árbol (dibujado dentro de un clip).
function Reflejo({ T, w, h, id }) {
  const d = (T * 14) % (w + 300);
  return <g>
    <defs><linearGradient id={id + 'g'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={AV.cielo1} /><stop offset="1" stopColor={AV.cielo2} /></linearGradient></defs>
    <rect width={w} height={h} fill={`url(#${id}g)`} />
    <Nube x={w - d + 150} y={h * 0.22} s={0.9} />
    <Nube x={w * 0.35 - d * 0.6 + 200} y={h * 0.45} s={0.6} o={0.9} />
    <Arbol x={w * 0.8} y={h + 40} s={0.9} />
  </g>;
}
// Ventana: x,y esquina sup. izq. modo 'reflejo' | 'transparente'. rayasH / rayasV 0..1 (se dibujan), malla 0..1, halcon 0..1.
function Ventana({ T, x, y, w = 460, h = 520, id = 'v', rayasH = 0, rayasV = 0, malla = 0, halcon = 0, sepH = 24, sepV = 48, brillo = true }) {
  const nH = Math.floor(h / sepH), nV = Math.floor(w / sepV);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-22} width={w + 44} height={h + 44} rx={8} fill={AV.marco} stroke={KC.ink} strokeWidth={7} />
    <clipPath id={id + 'c'}><rect width={w} height={h} /></clipPath>
    <g clipPath={`url(#${id}c)`}>
      <Reflejo T={T} w={w} h={h} id={id} />
      {brillo && <path d={`M ${w * 0.1} ${h} L ${w * 0.45} 0 L ${w * 0.58} 0 L ${w * 0.23} ${h} Z`} fill="#fff" opacity=".28" />}
      {Array.from({ length: nH }, (_, i) => { const p = kclamp(rayasH * nH - i, 0, 1); return p > 0 && <line key={'h' + i} x1={0} y1={(i + 0.5) * sepH} x2={w * p} y2={(i + 0.5) * sepH} stroke="#fff" strokeWidth={6} />; })}
      {Array.from({ length: nV }, (_, i) => { const p = kclamp(rayasV * nV - i, 0, 1); return p > 0 && <line key={'v' + i} x1={(i + 0.5) * sepV} y1={0} x2={(i + 0.5) * sepV} y2={h * p} stroke="#fff" strokeWidth={6} />; })}
      {malla > 0 && <g opacity={malla}><rect width={w} height={h} fill="rgba(40,40,40,.35)" />
        {Array.from({ length: Math.ceil(w / 12) }, (_, i) => <line key={'m' + i} x1={i * 12} y1={0} x2={i * 12} y2={h} stroke="#333" strokeWidth={2} />)}
        {Array.from({ length: Math.ceil(h / 12) }, (_, i) => <line key={'n' + i} x1={0} y1={i * 12} x2={w} y2={i * 12} stroke="#333" strokeWidth={2} />)}</g>}
      {halcon > 0 && <g transform={`translate(${w * 0.5} ${h * 0.3}) scale(${0.6 + 0.4 * halcon})`} opacity={halcon}>
        <path d="M 0 -30 Q 8 -30 10 -16 Q 60 -26 120 -6 Q 70 2 22 10 L 30 60 L 0 50 L -30 60 L -22 10 Q -70 2 -120 -6 Q -60 -26 -10 -16 Q -8 -30 0 -30 Z" fill={KC.ink} />
      </g>}
    </g>
    <rect width={w} height={h} fill="none" stroke={KC.ink} strokeWidth={6} />
    <line x1={w / 2} y1={0} x2={w / 2} y2={h} stroke={AV.marco} strokeWidth={14} opacity={malla > 0.5 ? 0 : 1} />
    <line x1={w / 2 - 7} y1={0} x2={w / 2 - 7} y2={h} stroke={KC.ink} strokeWidth={3} opacity={malla > 0.5 ? 0 : 1} />
    <line x1={w / 2 + 7} y1={0} x2={w / 2 + 7} y2={h} stroke={KC.ink} strokeWidth={3} opacity={malla > 0.5 ? 0 : 1} />
  </g>;
}
// Fachada de casa con ventana (mismo encuadre en Gancho y Cierre).
function Fachada({ T, rayasH = 0, id = 'fa' }) {
  return <g>
    <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
    <rect x={-10} y={420} width={760} height={740} fill={AV.muro} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-10} y1={500 + i * 80} x2={750} y2={500 + i * 80} stroke={AV.muro2} strokeWidth={4} />)}
    <rect x={-10} y={380} width={790} height={50} fill="#c9563c" stroke={KC.ink} strokeWidth={7} />
    <Ventana T={T} x={130} y={560} w={460} h={500} id={id} rayasH={rayasH} />
    <rect x={100} y={1080} width={520} height={34} rx={6} fill={AV.marco} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Edificios para la pregunta y el reparto.
function Rascacielos({ x, y, w = 200, h = 700 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-h} width={w} height={h} fill="#5fb6e0" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: Math.floor(h / 46) }, (_, i) => <line key={i} x1={0} y1={-h + 40 + i * 46} x2={w} y2={-h + 40 + i * 46} stroke="#2c6f96" strokeWidth={4} />)}
    {[1, 2, 3].map((i) => <line key={'c' + i} x1={(w / 4) * i} y1={-h} x2={(w / 4) * i} y2={0} stroke="#2c6f96" strokeWidth={4} />)}
    <path d={`M ${w * 0.15} ${-h + 10} L ${w * 0.55} ${-h + 10} L ${w * 0.15} ${-h + 220} Z`} fill="#fff" opacity=".35" />
  </g>;
}
function Casita({ x, y, w = 240, h = 170 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-h} width={w} height={h} fill={AV.muro} stroke={KC.ink} strokeWidth={7} />
    <path d={`M -20 ${-h} L ${w / 2} ${-h - 110} L ${w + 20} ${-h} Z`} fill="#c9563c" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={w * 0.12} y={-h + 40} width={w * 0.36} height={70} fill={AV.vidrio} stroke={KC.ink} strokeWidth={5} />
    <rect x={w * 0.6} y={-h + 50} width={w * 0.26} height={h - 50} fill="#8a5a33" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
function EdificioBajo({ x, y, w = 240, h = 340 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-h} width={w} height={h} fill="#f2a65a" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 5 }, (_, r) => [0, 1, 2].map((c) => <rect key={r + '-' + c} x={22 + c * 72} y={-h + 24 + r * 62} width={50} height={38} fill={AV.vidrio} stroke={KC.ink} strokeWidth={4} />))}
  </g>;
}
// Estrella de golpe.
function Pum({ x, y, s = 1, o = 1 }) {
  const pts = Array.from({ length: 16 }, (_, i) => { const r = i % 2 ? 34 : 80, a = (i / 16) * Math.PI * 2; return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}><polygon points={pts} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <text y={12} textAnchor="middle" style={{ font: `400 40px ${KF.titulo}` }} fill={KC.ink}>¡PUM!</text></g>;
}
// Cota con flechas (para "≤ 5 cm").
function Cota({ x, y1, y2, texto, o = 1 }) {
  return <g opacity={o}><line x1={x} y1={y1} x2={x} y2={y2} stroke={KC.ink} strokeWidth={5} />
    <line x1={x - 14} y1={y1} x2={x + 14} y2={y1} stroke={KC.ink} strokeWidth={5} /><line x1={x - 14} y1={y2} x2={x + 14} y2={y2} stroke={KC.ink} strokeWidth={5} />
    <text x={x + 24} y={(y1 + y2) / 2 + 12} style={{ font: `700 36px ${KF.mono}` }} fill={KC.ink}>{texto}</text></g>;
}

function AvesShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Re: CUES.Reflejo, A: CUES.Atraves, P: CUES.Pregunta, E: CUES.Estudio, Ci: CUES.Cifra, Ca: CUES.Casas, H: CUES.Halcon, Rg: CUES.Regla, Go: CUES.Golpe, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position: 'absolute', left: 0, top: 0 }}>{c}</svg>;
  const aleteo = T * 22;

  // gancho: el ave vuela hacia el reflejo
  const g1 = kprog(T, K.G - 0.2, K.Re + 0.3, kEase.suave);
  // corte lateral: geometría del reflejo (vidrio en x = 600)
  const VX = 600, arbolX = 150, ojo = [kprog(T, K.Re, K.A, kEase.suave) * 60 + 420, 760];
  const espejo = [2 * VX - ojo[0], ojo[1]], copa = [arbolX, 600];
  const yR = copa[1] + (espejo[1] - copa[1]) * (VX - copa[0]) / (espejo[0] - copa[0]);
  const rayo1 = kprog(T, K.Re + 0.8, K.Re + 1.8, kEase.sale), virt = kprog(T, K.Re + 2.0, K.Re + 3.0, kEase.suave);
  const planta = [860, 1000], yA = ojo[1] + (planta[1] - 120 - ojo[1]) * (VX - ojo[0]) / (planta[0] - ojo[0]);
  const rayo2 = kprog(T, K.A + 0.6, K.A + 1.6, kEase.sale);
  // halcón: el ave esquiva la silueta y choca en el vidrio libre
  const hv = kprog(T, K.H + 0.8, K.H + 2.4, kEase.suave);
  const hx = klerp(1020, 520, hv), hy = klerp(860, 980, hv) + Math.sin(hv * 6) * 10;
  // regla: rayas horizontales, luego verticales, luego mosquitero
  const rH = kprog(T, K.Rg + 0.4, K.Rg + 1.6) * (1 - kprog(T, K.Rg + 2.5, K.Rg + 2.8));
  const rV = kprog(T, K.Rg + 2.8, K.Rg + 3.9) * (1 - kprog(T, K.Rg + 4.6, K.Rg + 4.9));
  const ml = kprog(T, K.Rg + 4.7, K.Rg + 5.3);
  const rv = kprog(T, K.Rg + 0.6, K.Rg + 2.4, kEase.suave);
  const rgx = klerp(1000, 720, kclamp(rv * 2, 0, 1)) + kclamp(rv * 2 - 1, 0, 1) * 80, rgy = klerp(900, 860, rv) - kclamp(rv * 2 - 1, 0, 1) * 50;
  // golpe: el ave tirada se levanta y se va
  const sube = kprog(T, K.Go + 2.6, K.Go + 4.2, kEase.suave);
  // cierre: el ave llega y se posa en el árbol en vez de chocar
  const c1 = kprog(T, K.C + 0.2, K.C + 2.6, kEase.suave);
  // cifra
  const cMin = klerp(0, 365, kprog(T, K.Ci + 1.4, K.Ci + 2.6, kEase.sale)), cMax = klerp(0, 988, kprog(T, K.Ci + 3.2, K.Ci + 4.6, kEase.sale));
  const barra = (v) => 90 + v / 1000 * 900;

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: KC.dark }}>
      {/* 1 · gancho: la ventana refleja el cielo; el ave vuela hacia ella */}
      <Escena T={T} a={K.G} b={K.Re}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Fachada T={T} id="fg" />
          <Gorrion x={klerp(1000, 560, g1)} y={klerp(1060, 840, g1)} s={klerp(1.15, 0.8, g1)} dir={-1} ala={aleteo} rot={-8} /></>)}
      </Escena>
      <Lupa T={T} at={K.G + 1.0} until={K.Re - 0.15} x={340} y={460} r={170} fx={360} fy={810} zoom={1.6} tinte={KC.yellow} etiqueta="LO QUE VE EL AVE"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><Reflejo T={t} w={r * 2} h={r * 2} id="lu" /></svg>} />
      {/* 2 · corte lateral: el reflejo del árbol "detrás" del vidrio */}
      <Escena T={T} a={K.Re} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={1100} width={KW} height={400} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <rect x={VX} y={380} width={KW - VX + 20} height={720} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={6} />
          <Arbol x={2 * VX - arbolX} y={1100} o={0.55 * virt} dash />
          <rect x={VX} y={380} width={KW - VX + 20} height={720} fill="rgba(255,255,255,.35)" opacity={virt} />
          <rect x={VX - 8} y={560} width={16} height={420} fill={AV.vidrio} stroke={KC.ink} strokeWidth={5} />
          <rect x={VX - 10} y={380} width={20} height={180} fill={AV.muro} stroke={KC.ink} strokeWidth={5} />
          <rect x={VX - 10} y={980} width={20} height={120} fill={AV.muro} stroke={KC.ink} strokeWidth={5} />
          <Arbol x={arbolX} y={1100} />
          <Nube x={300} y={400} s={0.8} />
          <line x1={copa[0]} y1={copa[1]} x2={klerp(copa[0], VX, kclamp(rayo1 * 2, 0, 1))} y2={klerp(copa[1], yR, kclamp(rayo1 * 2, 0, 1))} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
          {rayo1 > 0.5 && <line x1={VX} y1={yR} x2={klerp(VX, ojo[0] + 64, rayo1 * 2 - 1)} y2={klerp(yR, ojo[1] - 30, rayo1 * 2 - 1)} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />}
          {virt > 0 && <line x1={VX} y1={yR} x2={klerp(VX, 2 * VX - copa[0], virt)} y2={klerp(yR, copa[1], virt)} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />}
          <Gorrion x={ojo[0]} y={ojo[1]} s={0.85} ala={aleteo} rot={-4} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1108} color={KC.ink} />
      </Escena>
      {/* 3 · a través del vidrio: la planta de tu sala */}
      <Escena T={T} a={K.A} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={1100} width={KW} height={400} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <rect x={VX} y={380} width={KW - VX + 20} height={720} fill="#fff4dc" stroke={KC.ink} strokeWidth={6} />
          <rect x={VX} y={1060} width={KW - VX + 20} height={40} fill="#c79a6a" stroke={KC.ink} strokeWidth={5} />
          <rect x={VX - 8} y={560} width={16} height={420} fill="rgba(159,227,245,.45)" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
          <rect x={VX - 10} y={380} width={20} height={180} fill={AV.muro} stroke={KC.ink} strokeWidth={5} />
          <rect x={VX - 10} y={980} width={20} height={120} fill={AV.muro} stroke={KC.ink} strokeWidth={5} />
          <Maceta x={planta[0]} y={1060} s={1.2} />
          <Arbol x={arbolX} y={1100} o={0.5} />
          {rayo2 > 0 && <line x1={ojo[0] + 64} y1={ojo[1] - 30} x2={klerp(ojo[0] + 64, planta[0], rayo2)} y2={klerp(ojo[1] - 30, planta[1] - 150, rayo2)} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />}
          <Gorrion x={ojo[0] + kprog(T, K.A, K.P, kEase.suave) * 60} y={ojo[1]} s={0.85} ala={aleteo} rot={-4} />
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1108} color={KC.ink} />
      </Escena>
      {/* 4 · pregunta: ¿rascacielos o casas? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <Rascacielos x={70} y={1150} w={170} h={kprog(T, K.P + 0.2, K.P + 1.0, kEase.rebote) * 640} />
          <Casita x={290} y={1150} w={210} h={150} />
          <text x={260} y={760} textAnchor="middle" style={{ font: `400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 260 660)`} opacity={kprog(T, K.P + 1.0, K.P + 1.5)}>?</text>
        </>)}
      </Escena>
      {/* 5 · el estudio: 23 estudios juntos */}
      <Escena T={T} a={K.E} b={K.Ci}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{Array.from({ length: 23 }, (_, i) => { const p = kprog(T, K.E + 1.2 + i * 0.09, K.E + 1.5 + i * 0.09, kEase.rebote); const c = i % 8, r = Math.floor(i / 8);
          return p > 0 && <g key={i} transform={`translate(${150 + c * 110} ${900 + r * 120}) scale(${p}) rotate(${(i % 3 - 1) * 5})`}>
            <rect x={-38} y={-50} width={76} height={100} rx={6} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            {[0, 1, 2, 3].map((k) => <line key={k} x1={-24} y1={-28 + k * 18} x2={k === 3 ? 6 : 24} y2={-28 + k * 18} stroke="#9a9086" strokeWidth={5} />)}
          </g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ci - 0.2} anio="2014" quien="Smithsonian + gobierno de EE. UU." revista="Loss et al. · The Condor" x={540} y={560} />
      {/* 6 · la cifra: 365 a 988 millones de aves al año (EE. UU.) */}
      <Escena T={T} a={K.Ci} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={90} y={1070} width={900} height={36} rx={18} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={6} />
          {cMax > 365 && <rect x={barra(365)} y={1070} width={barra(cMax) - barra(365)} height={36} fill={KC.red} stroke={KC.ink} strokeWidth={6} />}
          {cMin > 0 && <line x1={barra(cMin)} y1={1050} x2={barra(cMin)} y2={1126} stroke={KC.ink} strokeWidth={6} />}
          {[0, 500, 1000].map((v) => <text key={v} x={barra(v)} y={1145} textAnchor="middle" style={{ font: `700 26px ${KF.mono}` }} fill={KC.ink}>{v === 1000 ? '1,000' : v}</text>)}
          {Array.from({ length: 14 }, (_, i) => { const u = ((T - K.Ci) * 0.45 + i / 14) % 1; return T > K.Ci + 0.3 && <Gorrion key={i} x={100 + (i * 157) % 900} y={430 + u * 220} s={0.28} ala={aleteo + i} rot={10} o={0.35 * Math.sin(Math.PI * u)} />; })}
        </>)}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 650, textAlign: 'center', zIndex: 41 }}>
          <div style={{ font: `900 44px ${KF.texto}`, color: KC.ink, opacity: kprog(T, K.Ci + 0.4, K.Ci + 0.8) }}>entre</div>
          <div style={{ font: `400 190px/1 ${KF.titulo}`, color: '#fff', WebkitTextStroke: `7px ${KC.ink}`, textShadow: `8px 8px 0 ${KC.ink}`, opacity: kprog(T, K.Ci + 1.2, K.Ci + 1.5) }}>
            {kformato(cMin, 0)}{cMax > 0 ? ' – ' + kformato(cMax, 0) : ''}</div>
          <div style={{ font: `900 46px ${KF.texto}`, color: KC.ink, marginTop: 6, opacity: kprog(T, K.Ci + 2.6, K.Ci + 3.0) }}>millones de aves al año</div>
        </div>
      </Escena>
      {/* 7 · dónde: casas, otros edificios bajos y rascacielos */}
      <Escena T={T} a={K.Ca} b={K.H}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <Rascacielos x={70} y={1150} w={180} h={720} />
          <Casita x={360} y={1150} w={250} h={170} />
          <EdificioBajo x={720} y={1150} w={250} h={340} />
        </>)}
        <div style={{ position: 'absolute', left: 300, width: 370, top: 640, textAlign: 'center', zIndex: 41, opacity: kprog(T, K.Ca + 0.3, K.Ca + 0.7) }}>
          <div style={{ font: `400 150px/1 ${KF.titulo}`, color: KC.yellow, WebkitTextStroke: `6px ${KC.ink}`, textShadow: `6px 6px 0 ${KC.ink}` }}>{kformato(klerp(0, 44, kprog(T, K.Ca + 0.3, K.Ca + 1.3, kEase.sale)))} %</div>
          <div style={{ font: `700 26px/1.2 ${KF.mono}`, color: KC.ink, marginTop: 6 }}>casas y depas<br />de 1–3 pisos</div>
        </div>
        <div style={{ position: 'absolute', left: 30, width: 260, top: 1190, textAlign: 'center', zIndex: 41, opacity: 0 }} />
        <div style={{ position: 'absolute', left: 250, top: 300, zIndex: 41, opacity: kprog(T, K.Ca + 3.0, K.Ca + 3.4), transform: `scale(${klerp(0.6, 1, kprog(T, K.Ca + 3.0, K.Ca + 3.5, kEase.rebote))})`, transformOrigin: '0 50%' }}>
          <div style={{ font: `400 96px/1 ${KF.titulo}`, color: '#fff', WebkitTextStroke: `5px ${KC.ink}`, textShadow: `5px 5px 0 ${KC.ink}` }}>{'< 1 %'}</div>
          <div style={{ font: `700 24px/1.2 ${KF.mono}`, color: KC.ink, background: 'rgba(255,255,255,.75)', padding: '2px 8px', borderRadius: 8 }}>rascacielos (12+ pisos)</div>
        </div>
        <div style={{ position: 'absolute', left: 690, width: 310, top: 680, textAlign: 'center', zIndex: 41, opacity: kprog(T, K.Ca + 1.6, K.Ca + 2.0) }}>
          <div style={{ font: `400 96px/1 ${KF.titulo}`, color: '#fff', WebkitTextStroke: `5px ${KC.ink}`, textShadow: `5px 5px 0 ${KC.ink}` }}>56 %</div>
          <div style={{ font: `700 22px/1.2 ${KF.mono}`, color: KC.ink, background: 'rgba(255,255,255,.75)', padding: '2px 8px', borderRadius: 8, display: 'inline-block' }}>otros edificios bajos<br />(≤ 11 pisos)</div>
        </div>
      </Escena>
      {/* 8 · la calcomanía del halcón */}
      <Escena T={T} a={K.H} b={K.Rg}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <rect x={-10} y={480} width={760} height={680} fill={AV.muro} stroke={KC.ink} strokeWidth={7} />
          <Ventana T={T} x={130} y={600} w={460} h={480} id="vh" halcon={kprog(T, K.H + 0.2, K.H + 0.6, kEase.rebote)} />
          {hv < 1 ? <Gorrion x={hx} y={hy} s={0.7} dir={-1} ala={aleteo} rot={-6} /> : <Gorrion x={540} y={1110 - 30 * (1 - kprog(T, K.H + 2.4, K.H + 2.7))} s={0.6} dir={-1} vuela={false} ko rot={-70} />}
          <Pum x={520} y={960} s={kprog(T, K.H + 2.4, K.H + 2.6, kEase.rebote)} o={1 - kprog(T, K.H + 3.2, K.H + 3.6)} />
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.H + 0.6} tacharEn={K.H + 2.6} until={K.Rg - 0.15} texto="1 halcón pegado" x={360} y={480} tam={42} />
      {/* 9 · lo que sí sirve: rayas por fuera (≤ 5 cm acostadas, ≤ 10 cm paradas) o mosquitero */}
      <Escena T={T} a={K.Rg} b={K.Go}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <rect x={-10} y={480} width={760} height={680} fill={AV.muro} stroke={KC.ink} strokeWidth={7} />
          <Ventana T={T} x={130} y={600} w={460} h={480} id="vr" rayasH={rH} rayasV={rV} malla={ml} />
          <Cota x={630} y1={600 + 24 * 2.5} y2={600 + 24 * 3.5} texto="≤ 5 cm" o={kprog(T, K.Rg + 1.2, K.Rg + 1.5) * (1 - kprog(T, K.Rg + 2.4, K.Rg + 2.7))} />
          {rV > 0.3 && <g opacity={1 - kprog(T, K.Rg + 4.5, K.Rg + 4.8)}><line x1={130 + 48 * 2.5} y1={1110} x2={130 + 48 * 3.5} y2={1110} stroke={KC.ink} strokeWidth={5} />
            <text x={130 + 48 * 3} y={1145} textAnchor="middle" style={{ font: `700 32px ${KF.mono}` }} fill={KC.ink}>≤ 10 cm</text></g>}
          <Gorrion x={rgx} y={rgy} s={0.7} dir={rv < 0.5 ? -1 : 1} ala={aleteo} rot={rv < 0.5 ? -6 : -30} o={1 - kprog(T, K.Rg + 2.3, K.Rg + 2.5)} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Rg + 0.3} until={K.Rg + 4.5} texto="rayas por fuera del vidrio" x={400} y={470} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Rg + 4.8} until={K.Go - 0.15} texto="o un mosquitero" x={400} y={470} tam={38} borde={KC.leaf} />
      {/* 10 · el golpe: parece bien, pero… */}
      <Escena T={T} a={K.Go} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <rect x={0} y={1150} width={KW} height={300} fill={AV.pasto} stroke={KC.ink} strokeWidth={6} />
          <rect x={-10} y={480} width={420} height={680} fill={AV.muro} stroke={KC.ink} strokeWidth={7} />
          <Ventana T={T} x={60} y={620} w={280} h={440} id="vg" />
          {sube <= 0 ? <Gorrion x={560} y={1112} s={0.8} vuela={false} ko={T < K.Go + 1.8} rot={T < K.Go + 1.8 ? -70 : 0} />
            : <Gorrion x={klerp(560, 1100, sube)} y={klerp(1100, 800, sube)} s={0.8} ala={aleteo} rot={-12} />}
        </>)}
      </Escena>
      <Lupa T={T} at={K.Go + 0.4} until={K.Go + 2.5} x={760} y={800} r={150} fx={600} fy={1080} zoom={2} tinte={KC.red} etiqueta="GOLPE (ESQUEMA)"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill={KC.noche} />
          <g transform={`translate(${r - 52 * 3.2} ${r + 26 * 3.2}) scale(3.2)`}><Gorrion x={0} y={0} s={1} vuela={false} ko /></g>
          <circle cx={r + 4} cy={r - 50} r={r * 0.3} fill={KC.red} opacity={0.35 + 0.25 * Math.sin(t * 8)} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${r - 40 + i * 40} ${r - 120} l 10 -24 l 10 24`} stroke={KC.yellow} strokeWidth={6} fill="none" opacity={0.6 + 0.4 * Math.sin(t * 9 + i)} />)}</svg>} />
      <Chip T={T} at={K.Go + 2.7} until={K.C - 0.15} texto="parece bien… pero puede morir después" x={660} y={470} tam={26} borde={KC.red} />
      {/* 11 · cierre: la misma ventana, ahora con rayas */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Fachada T={T} id="fc" rayasH={kprog(T, K.C - 0.3, K.C + 0.8)} />
          <Arbol x={900} y={1150} s={0.8} />
          {c1 < 1 ? <Gorrion x={klerp(560, 940, c1)} y={klerp(860, 860 - 80 * Math.sin(Math.PI * c1), c1)} s={0.6} ala={aleteo} rot={-10} />
            : <Gorrion x={940} y={862} s={0.6} vuela={false} />}
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="con rayas: para el ave, ya es pared" x={410} y={470} tam={30} borde={KC.yellow} />

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.2} until={K.Re - 0.2} texto="¿pared… o cielo?" x={360} y={1130} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Re + 0.4} until={K.A - 0.2} x={VX + 30} y={1030} texto="vidrio" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Re + 1.6} until={K.A - 0.2} x={VX - 40} y={yR - 70} texto="reflejo" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Re + 2.8} until={K.A - 0.2} x={1060} y={600} texto="lo que cree ver" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.A + 0.4} until={K.P - 0.2} x={VX - 40} y={1030} texto="transparencia" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 1.6} until={K.P - 0.2} x={1040} y={1120} texto="la planta de tu sala" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.P + 0.3} until={K.E - 0.2} texto="¿dónde mueren más aves en total?" x={540} y={430} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.E + 2.0} until={K.Ci - 0.2} texto="23 estudios" x={540} y={1150} tam={34} borde={KC.ink} mono />
      <Chip T={T} at={K.Ci + 3.4} until={K.Ca - 0.2} texto="EE. UU. · choques con edificios" x={540} y={1008} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Rg + 1.0} until={K.Rg + 2.5} x={620} y={540} texto="acostadas" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Rg + 3.0} until={K.Rg + 4.5} x={620} y={540} texto="paradas" tam={28} color={KC.ink} />
      <EscalaFija T={T} texto="esquema (no a escala)" largo={0} x={60} y={1112} color={KC.ink} o={T > K.Rg && T < K.Go ? 1 : 0} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Re - 0.1} texto="Para un pájaro, esa ventana *es cielo.*" />
      <Subtitulo T={T} idx={1} at={K.Re + 0.1} until={K.A - 0.1} texto="No ven el vidrio: *ven el reflejo.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.P - 0.1} texto="O ven *a través.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.E - 0.1} texto="¿Rascacielos *o casas?*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.Ci - 0.1} texto="2014: *23 estudios juntos.*" />
      <Subtitulo T={T} idx={5} at={K.Ci + 0.1} until={K.Ca - 0.1} texto="365 a 988 millones *de aves al año.*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.H - 0.1} texto="44 % en casas. *Rascacielos: menos de 1 %.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.Rg - 0.1} texto="¿El halcón? *Casi no sirve.*" />
      <Subtitulo T={T} idx={8} at={K.Rg + 0.1} until={K.Go - 0.1} texto="Rayas *por fuera* o mosquitero." />
      <Subtitulo T={T} idx={9} at={K.Go + 0.1} until={K.C - 0.1} texto="Parece bien… *pero el golpe cuenta.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Con rayitas, *por fin es pared.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Atraves + 0.5, CUES.Atraves + 3.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Cifra + 1.7, CUES.Cifra + 5.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Casas + 3.0, CUES.Halcon - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Halcon + 1.6, CUES.Regla + 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Regla + 3.4, CUES.Golpe - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Golpe + 2.0, CUES.Golpe + 5.4, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 1.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="36" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AvesApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AvesShot /></CompositionStage></div>;
}
window.AvesApp = AvesApp;
