// Shot Químico #33 · Ese crac no es el plástico (barras de luz y quimioluminiscencia) — NARRADO (N5 el experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (moléculas, barras, vasos y manos).
const VERDE = '#7dff5a', VIDRIO = 'rgba(235,248,255,.75)', PIEL = '#f1b48f', OXA = '#fff3b0';

// Barra de luz. x,y = centro; largo/ancho en px; rot en grados (0 = horizontal); curva = flecha del doblez (px);
// luz 0..1.4 = brillo; roto 0..1 = ampolleta quebrada; color = color de la luz.
function BarraLuz({ x, y, largo = 700, ancho = 90, rot = 0, curva = 0, luz = 0, roto = 0, color = VERDE, ampolla = true, gancho = true }) {
  const L = largo / 2, d = `M ${-L} 0 Q 0 ${curva * 2} ${L} 0`;
  const La = L - ancho * 0.7, da = `M ${-La} 0 Q 0 ${curva * 2 * (La / L)} ${La} 0`;
  const cuerpo = mixHex('#dfe8ee', color, Math.min(1, luz * 0.9));
  const largoA = 2 * La + Math.abs(curva) * 1.2, gap = 34 * roto;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {luz > 0 && <g>
      <path d={d} stroke={color} strokeWidth={ancho + 260 * Math.min(1.4, luz)} strokeLinecap="round" fill="none" opacity={0.07 * luz} />
      <path d={d} stroke={color} strokeWidth={ancho + 130 * Math.min(1.4, luz)} strokeLinecap="round" fill="none" opacity={0.14 * luz} />
      <path d={d} stroke={color} strokeWidth={ancho + 50} strokeLinecap="round" fill="none" opacity={0.3 * Math.min(1, luz)} />
    </g>}
    {gancho && <circle cx={L + ancho * 0.55} cy={0} r={ancho * 0.28} fill="none" stroke={KC.ink} strokeWidth={10} />}
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 16} strokeLinecap="round" fill="none" />
    <path d={d} stroke={cuerpo} strokeWidth={ancho} strokeLinecap="round" fill="none" />
    {ampolla && <g>
      <path d={da} stroke="rgba(22,18,15,.55)" strokeWidth={ancho * 0.4 + 8} strokeLinecap="round" fill="none" strokeDasharray={`${largoA / 2 - gap / 2} ${gap} ${largoA * 2}`} />
      <path d={da} stroke={luz > 0.3 ? 'rgba(255,255,255,.55)' : VIDRIO} strokeWidth={ancho * 0.4} strokeLinecap="round" fill="none" strokeDasharray={`${largoA / 2 - gap / 2} ${gap} ${largoA * 2}`} />
      {roto > 0 && [[-18, -10, 30], [14, 12, -20], [4, -16, 60], [-6, 16, -45]].map(([dx, dy, r], i) =>
        <path key={i} d="M -10 -6 L 12 -2 L -2 10 Z" transform={`translate(${dx * (0.6 + roto)} ${curva + dy * roto}) rotate(${r})`} fill={VIDRIO} stroke="rgba(22,18,15,.6)" strokeWidth={2} opacity={roto} />)}
    </g>}
    <path d={`M ${-L + 20} ${-ancho * 0.28} Q 0 ${curva * 2 - ancho * 0.28} ${L - 20} ${-ancho * 0.28}`} stroke="#fff" strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.5} />
  </g>;
}
// Puño que agarra la barra (esquemático). flip = mano izquierda.
function Mano({ x, y, s = 1, flip = false, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${(flip ? -1 : 1) * s} ${s})`}>
    <path d="M -40 60 L -30 190 L 70 190 L 80 60 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-70} y={-80} width={160} height={150} rx={50} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    {[-40, -5, 30].map((yy, i) => <path key={i} d={`M -60 ${yy} Q 0 ${yy - 10} 80 ${yy}`} stroke="#c98a6a" strokeWidth={6} fill="none" strokeLinecap="round" />)}
    <path d="M -70 -20 Q -110 -60 -60 -90 Q -20 -100 0 -76" fill={PIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Átomo chico para los dibujos moleculares propios.
function A({ x, y, e, r = 34 }) { return <Atomo x={x} y={y} r={r} color={QA[e]} letra={e} />; }
function Enl({ a, b, dbl }) {
  if (!dbl) return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />;
  const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), ox = -dy / n * 9, oy = dx / n * 9;
  return <g><line x1={a[0] + ox} y1={a[1] + oy} x2={b[0] + ox} y2={b[1] + oy} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <line x1={a[0] - ox} y1={a[1] - oy} x2={b[0] - ox} y2={b[1] - oy} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" /></g>;
}
// Anillo de benceno esquemático (grupo fenilo del oxalato).
function Hexa({ x, y, r = 46, color = '#9aa3b5', o = 1 }) {
  const p = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`; }).join(' ');
  return <g opacity={o}><polygon points={p} fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /><circle cx={x} cy={y} r={r * 0.5} fill="none" stroke={KC.ink} strokeWidth={5} /></g>;
}
// Éster oxalato (esquemático): O=C–C=O con dos oxígenos unidos a anillos fenilo.
function Oxalato({ x, y, s = 1, o = 1, fenilos = 0 }) {
  const fx = 40 * fenilos, fy = 60 * fenilos;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <Enl a={[-38, 0]} b={[38, 0]} /><Enl a={[-38, 0]} b={[-70, -60]} dbl /><Enl a={[38, 0]} b={[70, -60]} dbl />
    <Enl a={[-38, 0]} b={[-70, 60]} /><Enl a={[38, 0]} b={[70, 60]} />
    <Enl a={[-70, 60]} b={[-120 - fx, 110 + fy]} /><Enl a={[70, 60]} b={[120 + fx, 110 + fy]} />
    <Hexa x={-140 - fx} y={140 + fy} /><Hexa x={140 + fx} y={140 + fy} />
    <A x={-70} y={-60} e="O" /><A x={70} y={-60} e="O" /><A x={-70} y={60} e="O" /><A x={70} y={60} e="O" />
    <A x={-38} y={0} e="C" /><A x={38} y={0} e="C" />
  </g>;
}
// 1,2-dioxetanodiona: anillo de 4 átomos (C–C–O–O) con un =O en cada carbono. parte 0..1 = se abre en dos CO₂.
function Dioxetanodiona({ x, y, s = 1, tiembla = 0, T = 0, parte = 0, colores = false }) {
  const j = tiembla * 5, jx = Math.sin(T * 47) * j, jy = Math.cos(T * 53) * j;
  const sep = parte * 260;
  const mitad = (sg) => <g transform={`translate(${sg * sep} ${-parte * 40}) rotate(${sg * parte * 40})`}>
    {colores && <rect x={sg < 0 ? -125 : -5} y={-135} width={130} height={230} rx={60} fill="none" stroke={sg < 0 ? KC.mint : KC.gold2} strokeWidth={7} strokeDasharray="16 10" />}
    <Enl a={[sg * 45, -45]} b={[sg * 90, -100]} dbl />
    {parte < 0.15 && <Enl a={[sg * 45, -45]} b={[sg * 45, 45]} />}
    <A x={sg * 90} y={-100} e="O" /><A x={sg * 45} y={-45} e="C" /><A x={sg * 45} y={45} e="O" />
  </g>;
  return <g transform={`translate(${x + jx} ${y + jy}) scale(${s})`}>
    {parte < 0.05 && <g><Enl a={[-45, -45]} b={[45, -45]} /><Enl a={[-45, 45]} b={[45, 45]} /></g>}
    {mitad(-1)}{mitad(1)}
  </g>;
}
// Colorante fluorescente (esquema de 3 anillos fusionados) con halo cuando se excita.
function Colorante({ x, y, s = 1, excita = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {excita > 0 && <g><circle r={150 + Math.sin(T * 9) * 10} fill={VERDE} opacity={0.18 * excita} /><circle r={95} fill={VERDE} opacity={0.3 * excita} /></g>}
    {[-80, 0, 80].map((dx, i) => <Hexa key={i} x={dx} y={0} r={46} color={mixHex('#9aa3b5', VERDE, excita)} />)}
  </g>;
}
// Fotón: onda que sale de (x0,y0) en dirección ang, avanzando con u 0..1.
function Foton({ x0, y0, ang, u, color = VERDE }) {
  if (u <= 0 || u >= 1) return null;
  const dist = 120 + u * 420, a = ang * Math.PI / 180;
  const cx = x0 + Math.cos(a) * dist, cy = y0 + Math.sin(a) * dist;
  const pts = Array.from({ length: 13 }, (_, i) => { const t = (i - 12) * 9; return `${cx + Math.cos(a) * t - Math.sin(a) * Math.sin(i * 1.3) * 14},${cy + Math.sin(a) * t + Math.cos(a) * Math.sin(i * 1.3) * 14}`; }).join(' ');
  return <g opacity={1 - u * 0.6}><polyline points={pts} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" /><circle cx={cx} cy={cy} r={14} fill="#eaffd9" stroke={color} strokeWidth={5} /></g>;
}
// Termómetro sencillo. nivel 0..1.
function Termo({ x, y, nivel = 0.2, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-230} width={44} height={250} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={40} r={42} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={20 - 220 * nivel} width={20} height={220 * nivel + 10} fill={KC.red} />
    {[0.25, 0.5, 0.75].map((m) => <line key={m} x1={22} x2={42} y1={20 - 220 * m} y2={20 - 220 * m} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Reloj sin números (solo marca que pasa el tiempo).
function Reloj({ x, y, ang, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-56} x2={0} y2={-46} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-50} stroke={KC.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${ang})`} />
    <circle r={9} fill={KC.ink} />
    <rect x={-16} y={-96} width={32} height={20} rx={6} fill={KC.ink} />
  </g>;
}
// Vapor que sube (agua caliente).
function Vapor({ T, x, y, o = 1 }) {
  return <g opacity={o}>{[-50, 0, 50].map((dx, i) => { const u = ((T * 0.6 + i * 0.33) % 1);
    return <path key={i} d={`M ${x + dx} ${y - u * 160} q 18 -25 0 -50 q -18 -25 0 -50`} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={(1 - u) * 0.85} />; })}</g>;
}
// Barra parada dentro de un vaso. tipo: 'hielo' | 'ambiente' | 'caliente'.
function VasoBarra({ T, x, y, tipo, luz }) {
  const liq = tipo === 'hielo' ? '#bfe9ff' : tipo === 'caliente' ? '#ffb38a' : '#ffffff';
  const nivel = tipo === 'ambiente' ? 0 : 0.55;
  return <g>
    <VasoLab x={x} y={y} s={1} ancho={230} alto={300} liquido={liq} nivel={nivel}>
      <BarraLuz x={0} y={-250} largo={430} ancho={70} rot={-90} luz={luz} roto={1} gancho={false} />
      {nivel > 0 && <rect x={-115} y={-300 * nivel} width={230} height={300 * nivel} fill={liq} opacity={0.35} />}
      {tipo === 'hielo' && [[-70, -150, 10], [55, -140, -14], [-20, -120, 25]].map(([dx, dy, r], i) =>
        <rect key={i} x={dx - 28} y={dy - 28} width={56} height={56} rx={10} transform={`rotate(${r + Math.sin(T * 2 + i) * 3} ${dx} ${dy})`} fill="rgba(255,255,255,.85)" stroke="#7fb6d6" strokeWidth={5} />)}
    </VasoLab>
    {tipo === 'caliente' && <Vapor T={T} x={x} y={y - 330} />}
  </g>;
}

function BarraLuzShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Me: CUES.Mezcla, En: CUES.Energia, Ex: CUES.Experimento, Re: CUES.Resultado, Es: CUES.Estudio, Da: CUES.Dato, Se: CUES.Seguridad, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: se dobla, crac, se enciende
  const dobla = kprog(T, K.G + 0.05, K.G + 0.4, kEase.sale) * (1 - 0.6 * kprog(T, K.G + 0.6, K.G + 1.0, kEase.suave));
  const crac = kprog(T, K.G + 0.35, K.G + 0.5);
  const enciende = kprog(T, K.G + 1.2, K.G + 2.4, kEase.suave);
  const agita = Math.sin(T * 26) * 10 * kprog(T, K.G + 0.9, K.G + 1.1) * (1 - kprog(T, K.G + 2.2, K.G + 2.5));
  // experimento: brillo de cada barra
  const luzHielo = klerp(0.75, 0.3, kprog(T, K.Re + 0.2, K.Re + 1.0, kEase.suave));
  const luzCal = klerp(0.75, 1.4, kprog(T, K.Re + 2.3, K.Re + 2.9, kEase.sale)) * (1 - kprog(T, K.Re + 3.3, K.Re + 5.0, kEase.suave));
  const luzAmb = klerp(0.75, 0.12, kprog(T, K.Re + 3.8, K.Re + 6.4, kEase.suave));
  const apaga = kprog(T, K.Ex + 2.6, K.Re + 0.4, kEase.suave);
  const reloj = Math.max(0, T - (K.Ex + 2.6)) * 140;
  // estudio y dato
  const panel = kprog(T, K.Es + 3.3, K.Es + 3.9, kEase.sale);
  const barraDic = kprog(T, K.Da + 5.0, K.Da + 6.2, kEase.sale);
  // seguridad
  const lava = kprog(T, K.Se + 2.2, K.Se + 3.6);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: dos manos doblan la barra, crac, se enciende */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <g transform={`translate(0 ${agita})`}>
            <BarraLuz x={540} y={1020} largo={760} ancho={96} curva={70 * dobla} luz={enciende} roto={crac} />
            <Mano x={215} y={1000 + 30 * dobla} rot={-12 * dobla} flip />
            <Mano x={865} y={1000 + 30 * dobla} rot={12 * dobla} />
          </g>
        </SvgCapa>
        <Onomato T={T} at={K.G + 0.35} until={K.G + 1.6} x={540} y={860} texto="¡CRAC!" color={KC.yellow} tam={120} />
      </Escena>
      {/* 1 · qué hay adentro (antes de mezclar) */}
      <Escena T={T} a={K.Q} b={K.Me} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <BarraLuz x={540} y={960} largo={900} ancho={250} luz={0} roto={0} gancho={false} ampolla={false} color={VERDE} />
          <path d="M 175 960 L 905 960" stroke={OXA} strokeWidth={232} strokeLinecap="round" opacity={0.85} />
          <path d="M 250 960 L 830 960" stroke={KC.ink} strokeWidth={118} strokeLinecap="round" />
          <path d="M 250 960 L 830 960" stroke="#e8f6ff" strokeWidth={104} strokeLinecap="round" />
          {Array.from({ length: 5 }, (_, i) => <Mol key={i} tipo="h2o2" x={330 + i * 105} y={960 + Math.sin(T * 2 + i) * 12} s={0.42} rot={T * 25 + i * 60} o={kprog(T, K.Q + 0.4 + i * 0.1, K.Q + 0.8 + i * 0.1)} />)}
          {Array.from({ length: 14 }, (_, i) => { const up = i % 2 === 0, xx = 210 + (i >> 1) * 105, yy = up ? 880 : 1040;
            return <g key={i} opacity={kprog(T, K.Q + 2.0 + i * 0.05, K.Q + 2.4 + i * 0.05)}>
              {i % 3 === 0 ? <circle cx={xx + Math.sin(T * 1.5 + i) * 10} cy={yy} r={13} fill={VERDE} stroke={KC.ink} strokeWidth={4} />
                : <Hexa x={xx + Math.sin(T * 1.5 + i) * 10} y={yy} r={16} color="#c7cdd8" />}</g>; })}
        </SvgCapa>
        <Chip T={T} at={K.Q + 0.4} until={K.Me - 0.3} texto="vidrio: agua oxigenada (H₂O₂)" x={540} y={760} tam={36} borde={KC.cyan} />
        <Chip T={T} at={K.Q + 2.0} until={K.Me - 0.3} texto="plástico: éster oxalato + colorante" x={540} y={1160} tam={34} borde={KC.leaf} />
      </Escena>
      {/* 2 · se mezclan: molécula inestable (micro, fondo noche) */}
      <Escena T={T} a={K.Me} b={K.En} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(125,255,90,.25)" />
        <SvgCapa>
          <Oxalato x={540} y={820} s={1.3} o={1 - kprog(T, K.Me + 1.0, K.Me + 1.4)} fenilos={kprog(T, K.Me + 0.9, K.Me + 1.4)} />
          {T < K.Me + 1.1 && <Mol tipo="h2o2" x={klerp(-100, 470, kprog(T, K.Me, K.Me + 1.0, kEase.sale))} y={680} s={1.3} rot={T * 90} />}
          <circle cx={540} cy={800} r={60 + 260 * kprog(T, K.Me + 1.0, K.Me + 1.5)} fill="none" stroke={VERDE} strokeWidth={10} opacity={kprog(T, K.Me + 1.0, K.Me + 1.05) * (1 - kprog(T, K.Me + 1.05, K.Me + 1.5))} />
          {T > K.Me + 1.1 && <g opacity={kprog(T, K.Me + 1.1, K.Me + 1.5)}>
            <Dioxetanodiona x={540} y={860} s={1.5} T={T} tiembla={1} />
            {[[-1, 1], [1, 1]].map(([sg], i) => <Hexa key={i} x={540 + sg * klerp(260, 420, kprog(T, K.Me + 1.2, K.Me + 3.2))} y={klerp(1060, 1150, kprog(T, K.Me + 1.2, K.Me + 3.2))} r={44} o={0.6} />)}
          </g>}
          <g opacity={kprog(T, K.Me + 0.5, K.Me + 0.9)}>
            <line x1={70} y1={1460} x2={190} y2={1460} stroke={KC.texto} strokeWidth={8} />
            <text x={210} y={1472} style={{ font:`700 32px ${KF.mono}` }} fill={KC.texto}>{'< 1 nm · no a escala'}</text>
          </g>
        </SvgCapa>
        <Chip T={T} at={K.Me + 1.5} until={K.En + 0.6} texto="¡inestable!" x={540} y={560} tam={46} borde={VERDE} />
      </Escena>
      {/* 3 · se parte en CO₂ y la energía pasa al colorante → luz (micro) */}
      <Escena T={T} a={K.En} b={K.Ex} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(125,255,90,.25)" />
        <SvgCapa>
          <Dioxetanodiona x={540} y={720} s={1.2} T={T} tiembla={1 - kprog(T, K.En + 0.4, K.En + 0.5)} parte={kprog(T, K.En + 0.4, K.En + 1.4, kEase.sale)} />
          {(() => { const u = kprog(T, K.En + 1.2, K.En + 1.7); if (u <= 0 || T > K.En + 2.4) return null;
            const pts = [[540, 760], [500, 820], [580, 860], [520, 920], [560, 960]].slice(0, 1 + Math.ceil(u * 4)).map((p) => p.join(',')).join(' ');
            return <polyline points={pts} fill="none" stroke={KC.yellow} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />; })()}
          <Colorante x={540} y={1050} s={1.1} T={T} excita={kprog(T, K.En + 1.7, K.En + 2.1) * (0.8 + 0.2 * Math.sin(T * 7))} />
          {Array.from({ length: 10 }, (_, i) => <Foton key={i} x0={540} y0={1050} ang={[200, 230, 260, 290, 320, 340, 20, 160, 250, 300][i]} u={(T - (K.En + 2.2 + i * 0.32)) / 1.4} />)}
          <Termo x={150} y={1080} nivel={0.22} s={0.8} />
        </SvgCapa>
        <Etq T={T} at={K.En + 1.0} until={K.En + 3.0} x={260} y={600} texto="CO₂" color={KC.texto} lado="der" />
        <Etq T={T} at={K.En + 1.8} until={K.Ex - 0.3} x={760} y={1150} texto="colorante" color={VERDE} lado="der" />
        <Chip T={T} at={K.En + 3.6} until={K.Ex - 0.2} texto="luz sin calor" x={540} y={1500} tam={46} borde={VERDE} />
      </Escena>
      {/* 4–5 · el experimento: hielo, ambiente, caliente */}
      <Escena T={T} a={K.Ex} b={K.Es} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:0.72 * apaga }}></div>
        <SvgCapa>
          <VasoBarra T={T} x={200} y={1150} tipo="hielo" luz={luzHielo} />
          <VasoBarra T={T} x={540} y={1150} tipo="ambiente" luz={luzAmb} />
          <VasoBarra T={T} x={880} y={1150} tipo="caliente" luz={luzCal} />
          <g opacity={kprog(T, K.Ex + 2.6, K.Ex + 3.0)}><Reloj x={540} y={430} ang={reloj} s={0.9} /></g>
          {T > K.Ex + 2.2 && T < K.Re + 0.4 && <text x={420} y={700} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12}
            opacity={kprog(T, K.Ex + 2.2, K.Ex + 2.5) * (1 - kprog(T, K.Re, K.Re + 0.4))} transform={`rotate(${Math.sin(T * 3) * 6} 420 600)`}>¿?</text>}
        </SvgCapa>
        <Etq T={T} at={K.Ex + 0.5} until={K.Es - 0.3} x={120} y={1460} texto="hielo" color="#bfe9ff" tam={34} />
        <Etq T={T} at={K.Ex + 1.2} until={K.Es - 0.3} x={440} y={1460} texto="ambiente" color={KC.texto} tam={34} />
        <Etq T={T} at={K.Ex + 1.9} until={K.Es - 0.3} x={770} y={1460} texto="caliente" color="#ffb38a" tam={34} />
        <Chip T={T} at={K.Re + 0.6} until={K.Re + 2.2} texto="brilla poco · dura más" x={300} y={1560} tam={32} borde="#bfe9ff" />
        <Chip T={T} at={K.Re + 2.5} until={K.Re + 4.9} texto="brilla mucho · se apaga pronto" x={540} y={1560} tam={32} borde="#ffb38a" />
        <Chip T={T} at={K.Re + 5.0} until={K.Es - 0.2} texto="frío = reacción más lenta" x={540} y={1560} tam={38} borde="#bfe9ff" />
      </Escena>
      {/* 6 · 2021, Universidad de São Paulo: la dioxetanodiona */}
      <Escena T={T} a={K.Es} b={K.Da}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', left:70, top:700, width:940, height:500, borderRadius:40, background:KC.noche, border:`8px solid ${KC.ink}`, opacity:panel, transform:`scale(${klerp(0.85, 1, panel)})` }}></div>
        <SvgCapa>
          {panel > 0 && <g opacity={panel}>
            <Dioxetanodiona x={540} y={960} s={1.25} T={T} tiembla={0.4} colores={T > K.Es + 5.6} />
            <text x={540} y={1150} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.texto}>1,2-dioxetanodiona</text>
            {T > K.Es + 5.8 && <text x={880} y={800} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.gold2} opacity={kprog(T, K.Es + 5.8, K.Es + 6.2)}>= 2 CO₂</text>}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.3} anio="2021" quien="Universidad de São Paulo · Brasil" revista="da Silva et al. · J Org Chem" y={760} />
        <Chip T={T} at={K.Es + 3.8} until={K.Da - 0.3} texto="2021 · pruebas fuertes" x={540} y={1500} tam={42} borde={KC.gold} />
      </Escena>
      {/* 7 · Australia 2018: casi 3 mil casos */}
      <Escena T={T} a={K.Da} b={K.Se}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <g opacity={kprog(T, K.Da + 4.6, K.Da + 5.0)}>
            <line x1={80} y1={1160} x2={500} y2={1160} stroke={KC.ink} strokeWidth={8} />
            <rect x={110} y={1160 - 80} width={150} height={80} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <rect x={320} y={1160 - 80 - 270 * barraDic} width={150} height={80 + 270 * barraDic} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            <text x={185} y={1205} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>otro mes</text>
            <text x={395} y={1205} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>diciembre</text>
            {barraDic > 0.9 && <g transform={`translate(395 ${1160 - 350}) rotate(-12)`}>
              <path d="M -60 0 L 0 -90 L 60 0 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-66} y={-6} width={132} height={24} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={-92} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} /></g>}
            {barraDic > 0.9 && <text x={395} y={1160 - 140} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={4}>× 4.4</text>}
          </g>
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Da + 0.2} until={K.Da + 3.2} anio="2018" quien="Centro toxicológico · Sídney, Australia" revista="Cairns et al. · Med J Aust · datos 2013–2017" y={760} />
        <NumeroGigante T={T} at={K.Da + 3.3} until={K.Se - 0.3} valor={2918} dur={1.2} etiqueta="casos con barras de luz · 4 años" x={540} y={470} tam={180} color={KC.yellow} />
        <Chip T={T} at={K.Da + 6.0} until={K.Se - 0.3} texto="94 % niños de 14 años o menos" x={540} y={1500} tam={36} borde={KC.yellow} />
      </Escena>
      {/* 8 · seguridad: irrita, lávate con agua */}
      <Escena T={T} a={K.Se} b={K.Ci}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <g transform="translate(420 1010)">
            <path d="M -170 40 Q -190 -60 -120 -90 L 140 -90 Q 200 -60 180 40 Q 150 160 0 170 Q -150 160 -170 40 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} />
            {[-110, -40, 30, 100].map((dx, i) => <rect key={i} x={dx - 28} y={-260 + Math.abs(i - 1.5) * 20} width={56} height={200} rx={28} fill={PIEL} stroke={KC.ink} strokeWidth={8} />)}
            {[[-60, 20], [40, 60], [90, -20], [-10, 100]].map(([dx, dy], i) => <g key={i} opacity={kprog(T, K.Se + 0.2 + i * 0.15, K.Se + 0.5 + i * 0.15) * (1 - kprog(T, K.Se + 2.6 + i * 0.2, K.Se + 3.2 + i * 0.2))}>
              <circle cx={dx} cy={dy} r={46} fill={VERDE} opacity={0.3} /><circle cx={dx} cy={dy} r={22} fill={VERDE} stroke={KC.ink} strokeWidth={4} /></g>)}
          </g>
          <path d="M 1100 560 L 760 560 Q 700 560 700 620 L 700 660" stroke="#9aa3b5" strokeWidth={60} fill="none" strokeLinejoin="round" />
          <rect x={660} y={650} width={80} height={36} rx={10} fill="#7f8899" stroke={KC.ink} strokeWidth={6} />
          <rect x={860} y={500} width={30} height={60} fill="#7f8899" stroke={KC.ink} strokeWidth={6} />
          <Chorro T={T} x0={700} y0={690} x1={460} y1={950} color="#7fc8ff" o={kprog(T, K.Se + 2.0, K.Se + 2.3)} ancho={26} />
          {lava > 0 && <Burbujas T={T} x={240} y={880} w={360} h={260} n={18} f={lava} color="rgba(127,200,255,.9)" />}
        </SvgCapa>
        <Chip T={T} at={K.Se + 0.3} until={K.Se + 1.9} texto="casi nunca grave" x={540} y={1500} tam={42} borde={KC.mint} />
        <Chip T={T} at={K.Se + 2.0} until={K.Ci - 0.2} texto="irrita → lávate con agua" x={540} y={1500} tam={42} borde={KC.red} />
      </Escena>
      {/* 9 · cierre: las mismas manos, la barra ya encendida */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <BarraLuz x={540} y={1020} largo={760} ancho={96} curva={28} luz={1 + 0.1 * Math.sin(T * 3)} roto={1} />
          <Mano x={215} y={1012} rot={-5} flip />
          <Mano x={865} y={1012} rot={5} />
        </SvgCapa>
        <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="H₂O₂ + oxalato + colorante → luz" x={540} y={1500} tam={36} borde={VERDE} />
      </Escena>

      {/* textos del gancho y lupa por dentro */}
      <Lupa T={T} at={K.G + 0.5} until={K.Q - 0.4} x={290} y={560} r={180} fx={540} fy={1060} tinte={VERDE} etiqueta="POR DENTRO · vidrio roto"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#10202a" />
          <BarraLuz x={r} y={r} largo={r * 4} ancho={150} curva={30} luz={kprog(t, K.G + 1.2, K.G + 2.4)} roto={kprog(t, K.G + 0.35, K.G + 0.5)} gancho={false} /></svg>} />
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.0} until={K.G + 3.2} texto="¿se rompió el plástico?" x={540} y={1500} tam={42} />
      <Chip T={T} at={K.G + 3.3} until={K.Q - 0.2} texto="se rompe el vidrio de adentro" x={540} y={1500} tam={40} borde={VERDE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es plástico: *es vidrio.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Me - 0.1} texto="Agua oxigenada *+ oxalato.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.En - 0.1} texto="Una molécula *muy inestable.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.Ex - 0.1} texto="Su energía *se vuelve luz.*" />
      <Subtitulo T={T} idx={4} at={K.Ex + 0.1} until={K.Re - 0.1} texto="¿Cuál *dura más?*" />
      <Subtitulo T={T} idx={5} at={K.Re + 0.1} until={K.Es - 0.1} texto="El frío *frena la reacción.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Da - 0.1} texto="2021: *la dioxetanodiona.*" />
      <Subtitulo T={T} idx={7} at={K.Da + 0.1} until={K.Se - 0.1} texto="Casi 3 mil casos: *diciembre.*" />
      <Subtitulo T={T} idx={8} at={K.Se + 0.1} until={K.Ci - 0.1} texto="Irrita: *lávate con agua.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Química *en tu mano.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 0.8, CUES.Mezcla - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Energia + 0.8, CUES.Experimento - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Experimento + 1.0, CUES.Resultado + 1.5, 'avatar_07_pensativo_puno', 'arriba-der'],
        [CUES.Resultado + 3.0, CUES.Estudio - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Estudio + 3.6, CUES.Dato - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 4.0, CUES.Seguridad - 0.2, 'avatar_11_sorprendido', 'grande'],
        [CUES.Seguridad + 0.4, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="33" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BarraLuzApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BarraLuzShot /></CompositionStage></div>;
}
window.BarraLuzApp = BarraLuzApp;
