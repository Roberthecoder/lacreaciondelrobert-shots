// Shot Ambiental #45 · Tú y cuatro vecinos: menos de uno confía en el agua de la llave — NARRADO (N2 "El número").
// Datos: INEGI ENCIG 2025 (nov–dic 2025), INEGI MOHOMA 2017, OMS 2015 (hervir), NOM-244-SSA1-2020 (Cofepris). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (casas, microbios, tubería, Vibrio cholerae).

const AG_AZUL = '#2f8fd8';
// Casita con un vaso encima (en globito). marca: 'x' | 'ok' | null · objeto: 'garrafon' | 'olla' | 'filtro' | 'llave' | null
function Casa({ x, y, s = 1, color = KC.paper, techo = KC.red, marca = null, pm = 1, objeto = null, po = 1, tu = false, vaso = true, T = 0, i = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-150} width={160} height={150} rx={8} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -100 -145 L 0 -235 L 100 -145 Z" fill={techo} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-22} y={-70} width={44} height={70} rx={6} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
    <rect x={-66} y={-122} width={40} height={36} rx={4} fill="#bfe7ff" stroke={KC.ink} strokeWidth={5} />
    <rect x={26} y={-122} width={40} height={36} rx={4} fill="#bfe7ff" stroke={KC.ink} strokeWidth={5} />
    {vaso && <g transform={`translate(0 ${-330 + Math.sin(T * 2 + i) * 4})`}>
      <ellipse cx={0} cy={0} rx={70} ry={58} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <path d="M -14 52 L 0 80 L 12 52 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <rect x={-12} y={50} width={22} height={8} fill="#fff" />
      <path d="M -26 -32 L 26 -32 L 20 34 L -20 34 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -23 -6 L 23 -6 L 20 34 L -20 34 Z" fill={AG_AZUL} opacity={0.8} />
      {marca === 'x' && <g opacity={pm} transform={`scale(${0.6 + 0.4 * pm})`}><line x1={-40} y1={-40} x2={40} y2={40} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /><line x1={40} y1={-40} x2={-40} y2={40} stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>}
      {marca === 'ok' && <path d="M -36 2 L -10 28 L 40 -30" stroke={KC.leaf} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={pm} />}
    </g>}
    {objeto && <g opacity={po} transform={`translate(110 0) scale(${0.5 + 0.5 * po})`}>
      {objeto === 'garrafon' && <Garrafon x={0} y={0} s={0.34} />}
      {objeto === 'olla' && <Olla x={0} y={-10} s={0.3} T={T} hierve={1} />}
      {objeto === 'filtro' && <Filtro x={0} y={0} s={0.27} />}
      {objeto === 'llave' && <Llave x={-10} y={-90} s={0.6} />}
    </g>}
    {tu && <text x={0} y={46} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>tú</text>}
  </g>;
}
// Garrafón de 19 L (esquemático), pie en y.
function Garrafon({ x, y, s = 1, lleno = 0.85, monedas = 0, T = 0 }) {
  const h = 330 * lleno;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -130 0 L -130 -300 Q -130 -360 -60 -380 L -40 -420 L 40 -420 L 60 -380 Q 130 -360 130 -300 L 130 0 Z" fill="rgba(210,236,255,.75)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <clipPath id={`gcl${Math.round(x)}${Math.round(y)}`}><path d="M -124 -6 L -124 -300 Q -124 -352 -56 -372 L 56 -372 Q 124 -352 124 -300 L 124 -6 Z" /></clipPath>
    <rect x={-124} y={-h} width={248} height={h} fill={AG_AZUL} opacity={0.85} clipPath={`url(#gcl${Math.round(x)}${Math.round(y)})`} />
    {[-100, -200].map((yy) => <line key={yy} x1={-130} y1={yy} x2={130} y2={yy} stroke={KC.ink} strokeWidth={6} opacity={0.5} />)}
    <rect x={-48} y={-450} width={96} height={40} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-250} width={60} height={14} rx={7} fill="#fff" opacity={0.55} />
  </g>;
}
// Botella chica de 600 ml.
function Botella({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -22 0 L -22 -80 Q -22 -100 -10 -108 L -10 -122 L 10 -122 L 10 -108 Q 22 -100 22 -80 L 22 0 Z" fill="rgba(210,236,255,.85)" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-22} y={-70} width={44} height={22} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} />
    <rect x={-12} y={-132} width={24} height={14} rx={3} fill={KC.blue} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Llave de agua (grifo) con gota.
function Llave({ x, y, s = 1, T = 0, gota = false }) {
  const u = (T * 1.2) % 1;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-30} width={150} height={52} rx={14} fill="#c7cdd6" stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={-30} width={52} height={110} rx={14} fill="#c7cdd6" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-80} width={24} height={52} rx={6} fill="#9aa3ae" stroke={KC.ink} strokeWidth={6} />
    <rect x={-96} y={-96} width={96} height={24} rx={12} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
    {gota && <path d="M 0 -18 Q 12 0 0 12 Q -12 0 0 -18 Z" transform={`translate(26 ${100 + u * 260})`} fill={AG_AZUL} stroke={KC.ink} strokeWidth={4} opacity={1 - u * 0.6} />}
  </g>;
}
// Olla en la estufa; hierve 0..1 = burbujas grandes.
function Olla({ x, y, s = 1, T = 0, hierve = 0, microbios = 0 }) {
  const bur = Array.from({ length: 9 }, (_, i) => { const u = (T * (0.9 + (i % 3) * 0.3) + i / 9) % 1; return { x: -150 + i * 37, y: -40 - u * 190, r: (8 + (i % 4) * 6) * (0.4 + u * 0.8) * hierve, o: (1 - u) * hierve }; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* llama */}
    {[-90, -30, 30, 90].map((dx, i) => <path key={i} d={`M ${dx} 70 q -22 -40 0 ${-70 - Math.sin(T * 12 + i) * 10} q 22 40 0 ${70 + Math.sin(T * 12 + i) * 10} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={-210} y={60} width={420} height={30} rx={10} fill="#555b66" stroke={KC.ink} strokeWidth={6} />
    <path d="M -190 -240 L 190 -240 L 170 40 Q 170 60 150 60 L -150 60 Q -170 60 -170 40 Z" fill="#9aa3ae" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-240} y={-230} width={60} height={26} rx={12} fill="#555b66" stroke={KC.ink} strokeWidth={6} />
    <rect x={180} y={-230} width={60} height={26} rx={12} fill="#555b66" stroke={KC.ink} strokeWidth={6} />
    <rect x={-176} y={-220} width={352} height={260} fill={AG_AZUL} opacity={0.6} />
    {microbios > 0.02 && <g opacity={microbios}>
      <Bacteria x={-90} y={-130} rot={20} s={0.55} color={KC.mint} T={T} seed={1} vida={microbios} />
      <Virus x={70} y={-150} r={34 * (0.5 + 0.5 * microbios)} T={T} />
      <Protozoo x={20} y={-60} s={0.8 * (0.5 + 0.5 * microbios)} T={T} />
      <Bacteria x={110} y={-40} rot={-30} s={0.45} color={KC.yellow} T={T} seed={3} vida={microbios} />
    </g>}
    {bur.map((b, i) => <circle key={i} cx={b.x} cy={b.y} r={Math.max(0, b.r)} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={3} opacity={b.o} />)}
  </g>;
}
// Virus esquemático (cápside con espículas).
function Virus({ x, y, r = 30, T = 0, color = KC.pink }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 30})`}>
    {Array.from({ length: 10 }, (_, i) => <g key={i} transform={`rotate(${i * 36})`}><line x1={0} y1={-r} x2={0} y2={-r - 14} stroke={KC.ink} strokeWidth={4} /><circle cx={0} cy={-r - 16} r={5} fill={color} stroke={KC.ink} strokeWidth={3} /></g>)}
    <polygon points={Array.from({ length: 6 }, (_, i) => `${(Math.cos(i * Math.PI / 3) * r).toFixed(1)},${(Math.sin(i * Math.PI / 3) * r).toFixed(1)}`).join(' ')} fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Protozoario esquemático (célula con núcleo, contorno que ondula).
function Protozoo({ x, y, s = 1, T = 0 }) {
  const pts = Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2, rr = 50 + 8 * Math.sin(T * 3 + i * 1.7); return `${(Math.cos(a) * rr * 1.3).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points={pts} fill={KC.lilac} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={10} cy={-4} r={16} fill={KC.violet} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Filtro de agua tipo dispensador con sello de certificado.
function Filtro({ x, y, s = 1, sello = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-560} width={300} height={260} rx={30} fill="rgba(210,236,255,.8)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-140} y={-470} width={280} height={160} rx={20} fill={AG_AZUL} opacity={0.5} />
    <rect x={-60} y={-540} width={120} height={160} rx={18} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((k) => <line key={k} x1={-46} y1={-510 + k * 40} x2={46} y2={-510 + k * 40} stroke={KC.ink} strokeWidth={4} opacity={0.5} />)}
    <rect x={-150} y={-300} width={300} height={300} rx={30} fill="rgba(210,236,255,.8)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-140} y={-170} width={280} height={160} rx={20} fill={AG_AZUL} opacity={0.85} />
    <rect x={150} y={-120} width={50} height={36} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    {sello > 0 && <g transform={`translate(-150 -580) rotate(-12) scale(${sello})`}>
      <circle r={92} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 8) * 92} cy={Math.sin(i * Math.PI / 8) * 92} r={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />)}
      <circle r={80} fill={KC.leaf} />
      <path d="M -36 2 L -10 28 L 40 -30" stroke="#fff" strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>}
  </g>;
}
// Vibrio cholerae esquemático: bacilo curvo (en coma) con un flagelo polar.
function Vibrio({ x, y, s = 1, T = 0 }) {
  const ond = Math.sin(T * 9) * 10;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 70 -10 q 30 ${-14 + ond} 60 0 t 60 0`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -80 10 Q -60 -60 20 -48 Q 70 -40 78 -10 Q 60 -18 22 -20 Q -40 -26 -50 30 Q -70 40 -80 10 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}
// Tubo que se rompe (esquema del sismo).
function Tubo({ x, y, s = 1, rompe = 0, T = 0 }) {
  const sac = rompe > 0 && rompe < 1 ? Math.sin(T * 60) * 8 * (1 - rompe) : 0;
  return <g transform={`translate(${x + sac} ${y}) scale(${s})`}>
    <g transform={`rotate(${-8 * rompe} -20 0)`}><rect x={-230} y={-40} width={210} height={80} fill="#9aa3ae" stroke={KC.ink} strokeWidth={8} /></g>
    <g transform={`rotate(${10 * rompe} 20 0) translate(${30 * rompe} ${16 * rompe})`}><rect x={20} y={-40} width={210} height={80} fill="#9aa3ae" stroke={KC.ink} strokeWidth={8} /></g>
    {rompe > 0.3 && Array.from({ length: 6 }, (_, i) => { const u = ((T * 1.5 + i / 6) % 1); return <path key={i} d="M 0 -14 Q 10 0 0 10 Q -10 0 0 -14 Z" transform={`translate(${-10 + i * 6} ${20 + u * 180}) scale(1.6)`} fill={AG_AZUL} stroke={KC.ink} strokeWidth={2} opacity={1 - u} />; })}
    <path d="M -20 -60 L 0 -20 L -14 10 L 10 60" stroke={KC.ink} strokeWidth={6} fill="none" opacity={rompe} />
  </g>;
}
// Barra horizontal de un estado (ENCIG 2025).
function BarraEdo({ T, at, y, nombre, valor, color, max = 50, x0 = 360, ancho = 480 }) {
  const p = kprog(T, at, at + 1.0, kEase.sale), w = ancho * (valor / max) * p;
  return <g opacity={kprog(T, at - 0.2, at + 0.2)}>
    <text x={x0 - 20} y={y + 22} textAnchor="end" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
    <rect x={x0} y={y - 26} width={ancho} height={64} rx={14} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={5} />
    <rect x={x0} y={y - 26} width={Math.max(0, w)} height={64} rx={14} fill={color} stroke={KC.ink} strokeWidth={5} />
    <text x={x0 + Math.max(w, 0) + 14} y={y + 20} style={{ font:`700 38px ${KF.mono}` }} fill={KC.ink} opacity={p}>{kformato(valor * p, 1)} %</text>
  </g>;
}

function AguaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Encuesta, Ma: CUES.Mapa, Ga: CUES.Garrafon, P: CUES.Pregunta, H: CUES.Historia, Gs: CUES.Gasto, Q: CUES.QueSirve, Hv: CUES.Hervir, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const XS = [110, 310, 510, 710, 910];
  // gancho: 5 casas; 4 vasos con ❌ y 1 con ✓ (menos de 1 de 5)
  const casasGancho = XS.map((x, i) => { const t = K.G + 0.5 + i * 0.45; const marca = i === 4 ? 'ok' : 'x';
    return <Casa key={i} x={x} y={1070} s={0.82} i={i} T={T} tu={i === 0} techo={[KC.red, KC.orange, KC.pink, KC.violet, KC.leaf][i]} marca={marca} pm={kprog(T, t, t + 0.3, kEase.rebote)} />; });
  const objsCierre = ['garrafon', 'olla', 'filtro', 'garrafon', 'olla'];
  const casasCierre = XS.map((x, i) => { const t = K.C + 0.3 + i * 0.3;
    return <Casa key={i} x={x} y={1070} s={0.82} i={i} T={T} tu={i === 0} techo={[KC.red, KC.orange, KC.pink, KC.violet, KC.leaf][i]} marca="ok" pm={kprog(T, t + 0.6, t + 0.9)} objeto={objsCierre[i]} po={kprog(T, t, t + 0.4, kEase.rebote)} />; });
  // garrafón: 4 casas, 3 con garrafón
  const X4 = [170, 400, 630, 860];
  const casas4 = X4.map((x, i) => { const t = K.Ga + 0.6 + i * 0.4;
    return <Casa key={i} x={x - 30} y={1070} s={0.8} i={i} T={T} vaso={false} techo={[KC.red, KC.orange, KC.pink, KC.violet][i]} objeto={i < 3 ? 'garrafon' : 'llave'} po={kprog(T, t, t + 0.4, kEase.rebote)} />; });
  // botellas sueltas que se van en el cierre
  const sueltas = (o) => Array.from({ length: 10 }, (_, i) => <Botella key={i} x={90 + i * 100} y={760 + (i % 2) * 40 - (1 - o) * 500} s={0.7} o={o} />);
  const pila = Array.from({ length: 32 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8), t = K.Q + 1.6 + i * 0.07;
    return <Botella key={i} x={505 + c * 62} y={1110 - f * 90} s={0.7} o={kprog(T, t, t + 0.15)} />; });
  const monedas = Array.from({ length: 8 }, (_, i) => { const t0 = K.Gs + 0.4 + i * 0.45, u = kprog(T, t0, t0 + 0.6, (p) => p * p); if (T < t0 || T > t0 + 0.7) return null;
    return <g key={i} transform={`translate(${330 + (i % 3) * 20} ${520 + u * 260})`}><ellipse rx={34} ry={34} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} /><text y={14} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>$</text></g>; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú y cuatro vecinos */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {svg(casasGancho)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · la encuesta del INEGI: 19.0 % y Jalisco 8.9 % */}
      <Escena T={T} a={K.E} b={K.Ma}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g transform="translate(860 1110) scale(0.92)">
          <path d="M -110 -420 L 110 -420 L 90 0 L -90 0 Z" fill="rgba(255,255,255,.8)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
          <path d={`M ${-90 - 20 * 0.19} ${-420 * 0.19 * kprog(T, K.E + 1.2, K.E + 2.6, kEase.suave)} L ${90 + 20 * 0.19} ${-420 * 0.19 * kprog(T, K.E + 1.2, K.E + 2.6, kEase.suave)} L 90 0 L -90 0 Z`} fill={AG_AZUL} />
          <line x1={-125} y1={-80} x2={-100} y2={-80} stroke={KC.ink} strokeWidth={5} />
          <text x={0} y={-450} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>¿se puede beber?</text>
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ma - 0.2} anio="2025" quien="INEGI · ENCIG" revista="nov–dic · ciudades de +100 mil hab." x={360} y={500} />
      {T > K.E - 0.5 && T < K.Ma + 0.5 && svg(<g opacity={1 - kprog(T, K.Ma - 0.05, K.Ma + 0.45)}>
        <text x={60} y={760} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.E + 1.0, K.E + 1.3)}>la creen bebible:</text>
        <BarraEdo T={T} at={K.E + 1.2} y={850} nombre="México" valor={19.0} color={AG_AZUL} x0={250} ancho={400} />
        <BarraEdo T={T} at={K.E + 4.0} y={970} nombre="Jalisco" valor={8.9} color={KC.red} x0={250} ancho={400} />
      </g>)}
      {/* 3 · cambia por estado */}
      <Escena T={T} a={K.Ma} b={K.Ga}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <BarraEdo T={T} at={K.Ma + 0.4} y={760} nombre="Tlaxcala" valor={44.2} color={KC.mint} />
          <BarraEdo T={T} at={K.Ma + 0.9} y={880} nombre="México" valor={19.0} color={AG_AZUL} />
          <BarraEdo T={T} at={K.Ma + 1.4} y={1000} nombre="Jalisco" valor={8.9} color={KC.orange} />
          <BarraEdo T={T} at={K.Ma + 2.6} y={1120} nombre="Tabasco" valor={3.5} color={KC.red} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ma + 0.2} until={K.Ga - 0.2} texto="la creen bebible · ENCIG 2025" y={600} x={680} tam={34} borde={KC.ink} />
      {/* 4 · tres de cada cuatro hogares compran agua (2017) */}
      <Escena T={T} a={K.Ga} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(casas4)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <NumeroGigante T={T} at={K.Ga + 0.3} until={K.Ga + 3.3} valor={3} dur={0.6} sufijo=" de 4" etiqueta="hogares (2017):" x={700} y={560} tam={140} color={KC.yellow} />
      <Chip T={T} at={K.Ga + 1.2} until={K.Ga + 3.3} texto="INEGI · MOHOMA 2017: 76.3 %" y={760} x={680} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Ga + 3.6} until={K.P - 0.2} texto="69.4 %: «es más saludable»" y={560} x={680} tam={38} borde={KC.leaf} />
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Llave x={290} y={440} s={1} T={T} gota />
          <text x={260} y={1150} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 1000)`}>?</text></>)}
      </Escena>
      {/* 6 · 1985 y 1991 */}
      <Escena T={T} a={K.H} b={K.Gs}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <line x1={90} y1={1030} x2={90 + 900 * kprog(T, K.H + 0.1, K.H + 1.2, kEase.sale)} y2={1030} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
          <g opacity={kprog(T, K.H + 0.3, K.H + 0.6)}><circle cx={280} cy={1030} r={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
            <text x={280} y={1110} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>1985 · sismo</text>
            <Tubo x={280} y={800} s={0.85} T={T} rompe={kprog(T, K.H + 0.5, K.H + 1.3, kEase.sale)} /></g>
          <g opacity={kprog(T, K.H + 2.0, K.H + 2.3)}><circle cx={790} cy={1030} r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <text x={790} y={1110} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>1991 · cólera</text>
            <Vibrio x={760} y={820} s={1.25} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.H + 1.1} until={K.Gs - 0.2} texto="relación que proponen estudios (2018, 2024)" y={560} x={540} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.H + 2.5} until={K.Gs - 0.2} x={620} y={720} texto="Vibrio cholerae" it lado="der" tam={30} color={KC.ink} />
      {/* 7 · cuánto cuesta */}
      <Escena T={T} a={K.Gs} b={K.Q}>
        <FondoLunares color={KC.orange} />
        {svg(<>{monedas}<Garrafon x={340} y={1120} s={1} lleno={0.85} /></>)}
      </Escena>
      <NumeroGigante T={T} at={K.Gs + 1.0} until={K.Q - 0.2} valor={52} dur={1.6} prefijo="$" etiqueta="por semana" x={780} y={900} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Gs + 0.5} until={K.Q - 0.2} texto="hogares que la compran · 2017" y={540} x={380} tam={30} borde={KC.ink} />
      {/* 8 · qué sí sirve: garrafón retornable = casi 32 botellas */}
      <Escena T={T} a={K.Q} b={K.Hv}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Garrafon x={230} y={1110} s={0.95} />
          <g transform={`translate(230 600) rotate(${T * 90})`} opacity={kprog(T, K.Q + 0.8, K.Q + 1.2)}><path d="M -70 0 A 70 70 0 1 1 0 70" stroke={KC.ink} strokeWidth={10} fill="none" /><path d="M -10 50 L 0 70 L -20 86" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>
          {pila}</>)}
      </Escena>
      <Etq T={T} at={K.Q + 0.8} until={K.Hv - 0.2} x={330} y={600} texto="se rellena" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.5} until={K.Hv - 0.2} texto="19 L" y={1000} x={230} tam={44} borde={KC.blue} />
      <Chip T={T} at={K.Q + 3.6} until={K.Hv - 0.2} texto="≈ 32 botellas de 600 ml" y={690} x={620} tam={34} borde={KC.ink} />
      {/* 9 · hervir y filtro */}
      <Escena T={T} a={K.Hv} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Olla x={300} y={1010} s={1} T={T} hierve={kprog(T, K.Hv + 0.3, K.Hv + 1.5)} microbios={1 - kprog(T, K.Hv + 1.6, K.Hv + 3.6)} />
          <g opacity={kprog(T, K.Hv + 4.0, K.Hv + 4.5)}><Filtro x={830} y={1110} s={0.85} sello={kprog(T, K.Hv + 5.0, K.Hv + 5.6, kEase.rebote)} /></g></>)}
      </Escena>
      <Chip T={T} at={K.Hv + 0.4} until={K.Hv + 3.9} texto="OMS 2015: hervor a borbotones" y={560} x={380} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Hv + 0.8} until={K.Hv + 3.6} x={110} y={720} texto="bacterias · virus · protozoarios" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Hv + 5.2} until={K.C - 0.2} texto="certificado Cofepris (NOM-244)" y={470} x={680} tam={28} borde={KC.leaf} />
      {/* 10 · cierre: las mismas 5 casas, ahora con garrafón, olla o filtro */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{sueltas(1 - kprog(T, K.C + 0.2, K.C + 1.6, kEase.suave))}{casasCierre}</>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="depende de tu ciudad" y={560} x={380} tam={38} borde={KC.yellow} />

      <NumeroGigante T={T} at={K.G + 0.2} until={K.E - 0.2} valor={1} dur={0.4} prefijo="< " sufijo=" de 5" etiqueta="confía en la llave:" x={300} y={500} tam={140} color={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Menos de 1 de 5 *confía en la llave.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.Ma - 0.1} texto="INEGI 2025: *19 %.* Jalisco: 8.9 %." />
      <Subtitulo T={T} idx={2} at={K.Ma + 0.1} until={K.Ga - 0.1} texto="Tlaxcala 44 %, *Tabasco 3.5 %.*" />
      <Subtitulo T={T} idx={3} at={K.Ga + 0.1} until={K.P - 0.1} texto="3 de cada 4 hogares: *garrafón o botella.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.H - 0.1} texto="¿De dónde salió *tanta desconfianza?*" />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.Gs - 0.1} texto="El sismo de 1985 *y el cólera de 1991.*" />
      <Subtitulo T={T} idx={6} at={K.Gs + 0.1} until={K.Q - 0.1} texto="Unos *52 pesos por semana* (2017)." />
      <Subtitulo T={T} idx={7} at={K.Q + 0.1} until={K.Hv - 0.1} texto="Garrafón retornable: *casi 32 botellas.*" />
      <Subtitulo T={T} idx={8} at={K.Hv + 0.1} until={K.C - 0.1} texto="Hervirla o un *filtro certificado.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Agua segura *con menos botellas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Encuesta + 2.6, CUES.Mapa - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Mapa + 2.4, CUES.Garrafon - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Garrafon + 3.6, CUES.Pregunta - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Historia + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Gasto + 2.0, CUES.QueSirve - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.QueSirve + 2.4, CUES.Hervir - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Hervir + 4.2, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="45" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AguaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AguaShot /></CompositionStage></div>;
}
window.AguaApp = AguaApp;
