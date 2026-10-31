// Shot Científico #53 · El pelo y las uñas no crecen después de morir — NARRADO (N6 mito + N1 "Por dentro": la piel que se retrae).
// Datos: Vreeman y Carroll 2007 (BMJ), Yaemsiri et al. 2010 (JEADV), Wolff et al. 2016 (Dtsch Arztebl Int). Ver guion.md y verificacion.md.
// Tono amable: mano y mejilla dibujadas de forma simpática (dibujo esquemático), sin nada de miedo.
const UNA = '#ffe1d8', UNA2 = '#fff6f0', SANGRE = '#e23b3b', NUTRI = KC.yellow, DERMIS = '#f3c6aa';

// Célula que se divide: ph 0..1 (0–0.5 se alarga, 0.5–1 ya son dos). act 0..1 (apagada = gris quieta).
function CelulaDiv({ x, y, r = 22, ph = 0, act = 1, color = KC.mint, rot = 0 }) {
  const c = act > 0.5 ? color : '#8d96a8';
  if (ph < 0.5) { const f = ph / 0.5;
    return <g transform={`translate(${x} ${y}) rotate(${rot})`}><ellipse rx={r * (1 + f * 0.7)} ry={r * (1 - f * 0.25)} fill={c} stroke={KC.ink} strokeWidth={4} />
      <circle r={r * 0.32} fill={KC.violet} opacity={0.8} /></g>; }
  const f = (ph - 0.5) / 0.5, d = r * (0.55 + f * 0.6);
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>{[-1, 1].map((k) => <g key={k}><circle cx={k * d} cy={0} r={r * 0.82} fill={c} stroke={KC.ink} strokeWidth={4} /><circle cx={k * d} cy={0} r={r * 0.26} fill={KC.violet} opacity={0.8} /></g>)}</g>;
}
// Racimo de células: Tc = reloj de las células (se congela cuando paran).
function Racimo({ x, y, Tc, act = 1, pts, r = 20, color }) {
  return <g>{pts.map(([dx, dy], i) => <CelulaDiv key={i} x={x + dx} y={y + dy} r={r} ph={(Tc * 0.55 + i * 0.29) % 1} act={act} color={color} rot={i * 37} />)}</g>;
}

// Mano de frente (dorso), dedos hacia arriba, con uñas. (x, y) = centro de la palma.
// largas: uñas de cuento (mito, exageradas). retrae 0..1: flechitas de la piel que se recorre (cierre).
function ManoFrente({ x, y, s = 1, T = 0, largas = 0, retrae = 0, manga = KC.blue, rot = 0 }) {
  const dedos = [[-105, -300], [-35, -365], [35, -350], [105, -290]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-150} y={170} width={300} height={170} rx={30} fill={manga} stroke={KC.ink} strokeWidth={9} />
    <rect x={-155} y={155} width={310} height={44} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <g transform="rotate(-24 -140 150)"><rect x={-178} y={-70} width={68} height={240} rx={34} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <rect x={-167} y={-58} width={46} height={52} rx={18} fill={UNA} stroke={KC.ink} strokeWidth={5} /></g>
    {dedos.map(([cx, top], i) => <g key={i}>
      <rect x={cx - 32} y={top} width={64} height={-top + 20} rx={32} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <path d={`M ${cx - 16} ${top + 150} q 16 -8 32 0 M ${cx - 16} ${top + 172} q 16 -8 32 0`} stroke={CPIEL2} strokeWidth={5} fill="none" strokeLinecap="round" />
      <rect x={cx - 22} y={top + 10} width={44} height={56} rx={18} fill={UNA} stroke={KC.ink} strokeWidth={5} />
      <path d={`M ${cx - 20} ${top + 58} q 20 10 40 0`} stroke={CPIEL2} strokeWidth={5} fill="none" strokeLinecap="round" />
      {largas > 0 && <path d={`M ${cx - 14} ${top + 14} C ${cx - 30} ${top - 60 * largas} ${cx + 50} ${top - 90 * largas} ${cx + 30} ${top - 140 * largas} C ${cx + 10} ${top - 175 * largas} ${cx - 30} ${top - 150 * largas} ${cx - 10} ${top - 130 * largas}`}
        stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />}
      {largas > 0 && <path d={`M ${cx - 14} ${top + 14} C ${cx - 30} ${top - 60 * largas} ${cx + 50} ${top - 90 * largas} ${cx + 30} ${top - 140 * largas} C ${cx + 10} ${top - 175 * largas} ${cx - 30} ${top - 150 * largas} ${cx - 10} ${top - 130 * largas}`}
        stroke={UNA} strokeWidth={12} fill="none" strokeLinecap="round" />}
      {retrae > 0 && <g opacity={retrae}>
        <path d={`M ${cx} ${top + 74} L ${cx} ${top + 74 + 34 * Math.abs(Math.sin(T * 3 + i))}`} stroke={KC.gold2} strokeWidth={7} strokeLinecap="round" />
        <path d={`M ${cx - 10} ${top + 96} L ${cx} ${top + 110} L ${cx + 10} ${top + 96}`} transform={`translate(0 ${24 * Math.abs(Math.sin(T * 3 + i))})`} stroke={KC.gold2} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>}
    </g>)}
    <rect x={-140} y={-60} width={280} height={250} rx={70} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {dedos.map(([cx], i) => <rect key={i} x={cx - 26} y={-75} width={52} height={40} rx={18} fill={CPIEL} />)}
    {[-70, 0, 70].map((xx) => <path key={xx} d={`M ${xx - 14} ${-20} q 14 -10 28 0`} stroke={CPIEL2} strokeWidth={5} fill="none" strokeLinecap="round" />)}
  </g>;
}
// Barba corta (puntitos) en la quijada de CabezaPerfil (coordenadas locales de la cabeza).
const BARBA_PTS = (() => { const g = krng(53), p = []; for (let i = 0; i < 70; i++) { const x = 10 + g() * 150, y = 122 + g() * 52; if (!(x > 118 && y < 135)) p.push([x, y]); } return p; })();
function Barbita({ largo = 0 }) {
  return <g>{BARBA_PTS.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x + 2} y2={y + 5 + largo} stroke={CPELO} strokeWidth={5} strokeLinecap="round" />)}</g>;
}

// Dedo de perfil apuntando a la derecha (punta en x=0). Uña encima; el pliegue de piel tapa su base.
// retrae 0..1: la piel pierde agua y se recorre (se ve más uña). crece: px extra de uña. agua: gotitas que se van.
// guia: contorno punteado de la parte de la uña que está bajo la piel. vellos: pelitos sobre el dorso.
function Dedo({ x, y, s = 1, T = 0, retrae = 0, crece = 0, agua = 0, guia = 0, vellos = 0, manga = KC.blue, raiz }) {
  const tipX = -10 - 34 * retrae, foldX = -140 - 52 * retrae, sy = 1 - 0.06 * retrae;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-640} y={-120} width={170} height={250} rx={26} fill={manga} stroke={KC.ink} strokeWidth={9} />
    <g transform={`scale(1 ${sy})`}>
      <rect x={-500} y={-66} width={tipX + 500} height={150} rx={74} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
      <path d="M -380 -40 q 10 40 0 90 M -360 -40 q 10 40 0 90" stroke={CPIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
      {retrae > 0 && <g opacity={retrae * 0.8}>{[-300, -240, -180, -120, -70].map((xx, i) => <path key={i} d={`M ${xx} ${-20 + (i % 2) * 40} q 14 -8 28 0`} stroke={CPIEL2} strokeWidth={5} fill="none" strokeLinecap="round" />)}</g>}
      {vellos > 0 && <g>{[-450, -425, -400, -330, -305, -280].map((xx, i) => <line key={i} x1={xx} y1={-64 + 2 * retrae} x2={xx + 10} y2={-64 - (14 + 10 * retrae) * vellos} stroke={CPELO} strokeWidth={5} strokeLinecap="round" />)}</g>}
    </g>
    <rect x={-215} y={-82} width={245 + crece} height={36} rx={18} fill={UNA} stroke={KC.ink} strokeWidth={7} />
    <rect x={tipX + 4} y={-77} width={Math.max(0, 30 + crece - tipX - 12)} height={26} rx={12} fill={UNA2} />
    <ellipse cx={-120} cy={-64} rx={20} ry={9} fill="#fff" opacity={0.5} />
    <rect x={-262} y={-100} width={foldX + 262} height={50} rx={25} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-262} y={-56} width={foldX + 240} height={14} fill={CPIEL} />
    {raiz}
    {guia > 0 && <rect x={-215} y={-82} width={foldX + 215} height={36} rx={18} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="10 8" opacity={guia} />}
    {agua > 0 && Array.from({ length: 7 }, (_, i) => { const f = (T * 0.8 + i / 7) % 1, xx = -460 + i * 64;
      return <path key={i} d="M 0 -14 C 8 -2 10 6 0 10 C -10 6 -8 -2 0 -14 Z" transform={`translate(${xx + Math.sin(T * 3 + i) * 8} ${-80 - f * 170}) scale(1.6)`} fill={KC.cyan} stroke={KC.ink} strokeWidth={3} opacity={agua * (1 - f)} />; })}
  </g>;
}
// Corte de piel con pelos (para Lupa): superficie que baja `baja` px; lo que asoma se pinta dorado. corto = barba.
function PielPelo({ r, T = 0, baja = 0, corto = false, resalta = 0 }) {
  const W = r * 2, sup0 = r * (corto ? 1.0 : 0.9), sup = sup0 + baja, tip = corto ? r * 0.72 : r * 0.35;
  const xs = corto ? [0.32, 0.62, 0.9, 1.22, 1.5] : [0.45, 0.95, 1.45];
  return <svg width={W} height={W}>
    <rect width={W} height={W} fill="#ffe9c9" />
    <rect x={0} y={sup} width={W} height={W} fill={DERMIS} />
    <rect x={0} y={sup} width={W} height={22} fill={CPIEL} stroke={KC.ink} strokeWidth={5} />
    {xs.map((f, i) => { const hx = f * r, bulbo = W - 30;
      return <g key={i}>
        <path d={`M ${hx - 22} ${sup} L ${hx - 18} ${bulbo - 10} M ${hx + 22} ${sup} L ${hx + 18} ${bulbo - 10}`} stroke="#c98a70" strokeWidth={4} fill="none" />
        <rect x={hx - 8} y={tip} width={16} height={bulbo - tip} rx={8} fill={CPELO} />
        {resalta > 0 && baja > 1 && <rect x={hx - 10} y={sup0} width={20} height={baja} rx={6} fill={KC.gold2} stroke={KC.ink} strokeWidth={3} opacity={resalta} />}
        <ellipse cx={hx} cy={bulbo} rx={22} ry={18} fill="#e89a7e" stroke={KC.ink} strokeWidth={4} />
      </g>; })}
    {baja > 1 && <line x1={0} y1={sup0} x2={W} y2={sup0} stroke="#fff" strokeWidth={4} strokeDasharray="12 10" opacity={0.9} />}
  </svg>;
}
// Folículo en corte: (x, y) = bulbo. Superficie de la piel a y-300. crece = px de pelo extra.
function Foliculo({ x, y, s = 1, Tc = 0, act = 1, crece = 0, ancho = 200 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-ancho} y={-300} width={ancho * 2} height={390} rx={20} fill={DERMIS} stroke={KC.ink} strokeWidth={7} />
    <rect x={-ancho} y={-300} width={ancho * 2} height={40} rx={14} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <path d="M -38 -300 L -50 -20 M 38 -300 L 50 -20" stroke="#c98a70" strokeWidth={8} fill="none" />
    <rect x={-15} y={-430 - crece} width={30} height={430 + crece} rx={15} fill={CPELO} />
    <ellipse cx={0} cy={0} rx={78} ry={58} fill="#e89a7e" stroke={KC.ink} strokeWidth={7} />
    <Racimo x={0} y={8} Tc={Tc} act={act} r={15} pts={[[-44, 10], [-14, 26], [18, 26], [46, 8], [0, -6]]} color={KC.pink} />
  </g>;
}
function Libro({ x, y, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-410} y={-290} width={820} height={580} rx={28} fill={KC.violet} stroke={KC.ink} strokeWidth={10} />
    <path d="M -380 -260 Q -190 -290 0 -250 L 0 260 Q -190 225 -380 260 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 380 -260 Q 190 -290 0 -250 L 0 260 Q 190 225 380 260 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={0} y1={-250} x2={0} y2={260} stroke={KC.ink} strokeWidth={8} />
    {children}
  </g>;
}
function Sello({ T, at, x, y, texto = 'MITO', rot = -14 }) {
  if (T < at) return null;
  const p = kprog(T, at, at + 0.22, kEase.sale), s = klerp(2.3, 1, p), sac = 1 + 0.06 * Math.sin(kprog(T, at + 0.22, at + 0.6) * Math.PI);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * sac})`} opacity={kprog(T, at, at + 0.12)}>
    <rect x={-190} y={-88} width={380} height={176} rx={22} fill="rgba(255,59,47,.12)" stroke={KC.red} strokeWidth={14} />
    <rect x={-170} y={-70} width={340} height={140} rx={14} fill="none" stroke={KC.red} strokeWidth={5} />
    <text x={0} y={52} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}`, letterSpacing:'.06em' }} fill={KC.red}>{texto}</text>
  </g>;
}
function Bateria({ x, y, nivel = 1, s = 1, T = 0 }) {
  const col = nivel > 0.5 ? KC.mint : nivel > 0.2 ? KC.yellow : KC.red;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-60} width={240} height={120} rx={22} fill="#1d2433" stroke={KC.texto} strokeWidth={8} />
    <rect x={120} y={-24} width={22} height={48} rx={6} fill={KC.texto} />
    <rect x={-104} y={-44} width={Math.max(0, 208 * nivel)} height={88} rx={12} fill={col} />
    {nivel > 0.05 && <path d="M 8 -40 L -26 6 L 0 6 L -10 40 L 28 -8 L 2 -8 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" opacity={0.6 + 0.4 * Math.sin(T * 6)} />}
  </g>;
}
function Tache({ x, y, p = 1, r = 60 }) {
  if (p <= 0) return null;
  const a = Math.min(1, p * 2), b = Math.max(0, p * 2 - 1);
  return <g transform={`translate(${x} ${y})`}>
    <line x1={-r} y1={-r} x2={-r + 2 * r * a} y2={-r + 2 * r * a} stroke={KC.red} strokeWidth={18} strokeLinecap="round" />
    {b > 0 && <line x1={r} y1={-r} x2={r - 2 * r * b} y2={-r + 2 * r * b} stroke={KC.red} strokeWidth={18} strokeLinecap="round" />}
  </g>;
}
function IconoSangre({ x, y }) { return <g transform={`translate(${x} ${y})`}><circle r={62} fill="#20283a" stroke={KC.texto} strokeWidth={6} /><path d="M 0 -40 C 18 -12 30 6 30 20 C 30 38 16 46 0 46 C -16 46 -30 38 -30 20 C -30 6 -18 -12 0 -40 Z" fill={SANGRE} stroke={KC.ink} strokeWidth={5} /></g>; }
function IconoO2({ x, y }) { return <g transform={`translate(${x} ${y})`}><circle r={62} fill="#20283a" stroke={KC.texto} strokeWidth={6} /><circle r={40} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} /><text x={0} y={14} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>O₂</text></g>; }
function IconoAzucar({ x, y }) { return <g transform={`translate(${x} ${y})`}><circle r={62} fill="#20283a" stroke={KC.texto} strokeWidth={6} />
  <path d="M -30 -10 L 0 -28 L 30 -10 L 0 8 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /><path d="M -30 -10 L 0 8 L 0 40 L -30 22 Z" fill="#e8e8e8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /><path d="M 30 -10 L 0 8 L 0 40 L 30 22 Z" fill="#cfcfcf" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" /></g>; }
function Corazon({ x, y, s = 1, late = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.14 * late)})`}>
    <path d="M 0 40 C -80 -10 -66 -80 -26 -80 C -8 -80 0 -62 0 -54 C 0 -62 8 -80 26 -80 C 66 -80 80 -10 0 40 Z" fill={SANGRE} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -36 -56 Q -46 -40 -40 -26" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity=".7" />
  </g>;
}
// Regla horizontal en mm (0..n), pxmm px por mm.
function ReglaMm({ x, y, pxmm, n = 5, unidad = 'mm' }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-16} y={0} width={n * pxmm + 32} height={64} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: n * 2 + 1 }, (_, i) => <line key={i} x1={i * pxmm / 2} y1={0} x2={i * pxmm / 2} y2={i % 2 ? 18 : 32} stroke={KC.ink} strokeWidth={4} />)}
    {Array.from({ length: n + 1 }, (_, i) => <text key={i} x={i * pxmm} y={56} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>{i}</text>)}
    <text x={n * pxmm + 4} y={-12} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{unidad}</text>
  </g>;
}
// Regla vertical de 0 a 1 cm (de abajo hacia arriba), pxcm px por cm.
function ReglaCm({ x, y, pxcm }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={-pxcm - 20} width={70} height={pxcm + 40} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 11 }, (_, i) => <line key={i} x1={0} y1={-i * pxcm / 10} x2={i % 5 ? 20 : 36} y2={-i * pxcm / 10} stroke={KC.ink} strokeWidth={4} />)}
    <text x={44} y={8} style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>0</text>
    <text x={40} y={-pxcm + 8} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>1cm</text>
  </g>;
}
function Calendario({ x, y, dia = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-70} width={160} height={150} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={-70} width={160} height={42} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {[-40, 40].map((xx) => <rect key={xx} x={xx - 7} y={-88} width={14} height={34} rx={7} fill={KC.ink} />)}
    <text x={0} y={-38} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill="#fff">DÍA</text>
    <text x={0} y={56} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{Math.max(1, Math.round(dia))}</text>
  </g>;
}
// Corchete con etiqueta encima (dentro de svg).
function Corchete({ x1, x2, y, color = '#fff', texto, p = 1, tam = 30 }) {
  if (p <= 0) return null;
  return <g opacity={p}>
    <path d={`M ${x1} ${y + 18} L ${x1} ${y} L ${x2} ${y} L ${x2} ${y + 18}`} stroke={KC.ink} strokeWidth={13} fill="none" strokeLinejoin="round" />
    <path d={`M ${x1} ${y + 18} L ${x1} ${y} L ${x2} ${y} L ${x2} ${y + 18}`} stroke={color} strokeWidth={6} fill="none" strokeLinejoin="round" />
    {texto && <text x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" style={{ font:`900 ${tam}px ${KF.texto}` }} fill={color} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{texto}</text>}
  </g>;
}
// Punto en una curva cúbica.
function bez(p0, p1, p2, p3, t) { const u = 1 - t; return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k]); }

function PeloMuerto() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // portada: mano + cara con barbita (inicio y cierre)
  const Portada = ({ cierre = false }) => <Lienzo>
    <ManoFrente x={300} y={930} s={1.0} T={T} rot={mece(T, 2, 0.4) * 4} retrae={cierre ? kprog(T, K.Cierre + 0.8, K.Cierre + 1.3) : 0} />
    <CabezaPerfil x={790} y={1010} s={0.75} gesto={cierre ? 'sonrie' : 'normal'}><Barbita largo={cierre ? 2 : 0} /></CabezaPerfil>
  </Lienzo>;
  // tiempos del gancho
  const G = K.Gancho, flechas = kprog(T, G + 0.1, G + 0.6, kEase.sale), tacha = kprog(T, G + 1.4, G + 1.9, kEase.sale);
  // reloj de las células: corre hasta que "dejan de trabajar"
  const STOP = K.Sin + 3.0, Tc = Math.min(T, STOP), act = T < STOP ? 1 : 0, nivel = 1 - kprog(T, K.Sin + 0.3, STOP, kEase.suave);
  // piel que se retrae
  const ret = kprog(T, K.Piel + 0.8, K.Asoma + 2.2, kEase.suave);
  // barba
  const bajaB = 46 * kprog(T, K.Barba + 1.0, K.Barba + 3.0, kEase.suave);
  // uñas: 3.5 mm en un mes (70 px por mm)
  const PXMM = 70, fU = kprog(T, K.Unas + 2.2, K.Unas + 4.6, kEase.suave);
  // pelo: 1 cm en un mes (360 px por cm)
  const PXCM = 360, fP = kprog(T, K.Pelo + 0.5, K.Pelo + 2.8, kEase.suave);
  // vida: corazón y riego
  const late = Math.max(0, Math.sin(T * 7.5)) ** 4;
  const H = [230, 700], V1 = [230, 860], V2 = [520, 1220], V3 = [640, 1150];
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mano y la barba; "¿crecen?" se tacha */}
      <Escena T={T} a={K.Gancho} b={K.Mito}>
        <FondoLunares color={KC.pink} />
        <Portada />
        <Lienzo z={3}>
          {[-105, -35, 35, 105].map((dx, i) => <FlechaRecta key={i} x1={300 + dx} y1={600} x2={300 + dx} y2={560 - 90 * flechas - (i % 2) * 20} p={flechas} color={KC.yellow} grosor={12} punta={26} />)}
          <TextoSvg x={300} y={420} tam={96} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, G + 0.15, G + 0.55, kEase.rebote))} o={1 - 0.4 * tacha}>¿CRECEN?</TextoSvg>
          {tacha > 0 && <line x1={110} y1={440} x2={110 + 380 * tacha} y2={360 - 20 * tacha} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />}
        </Lienzo>
        <Chip T={T} at={G + 2.9} until={K.Mito - 0.1} texto="es la piel" x={790} y={790} tam={48} borde={KC.gold} />
      </Escena>
      {/* 1 · el mito en un libro de cuentos (amable) con sello MITO */}
      <Escena T={T} a={K.Mito} b={K.Crecer} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Mito - 0.2, K.Mito + 0.5, kEase.rebote)) * 500})`}>
            <Libro x={540} y={860}>
              <circle cx={-300} cy={-180} r={34} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
              <circle cx={-286} cy={-190} r={30} fill={KC.paper} />
              {[[-120, -200], [-70, -150], [-220, -110]].map(([sx, sy], i) => <path key={i} d="M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" transform={`translate(${sx} ${sy}) scale(${1 + 0.2 * Math.sin(T * 4 + i)})`} fill={KC.gold2} />)}
              <ManoFrente x={-190} y={110} s={0.42} T={T} largas={kprog(T, K.Mito + 0.6, K.Mito + 1.6, kEase.sale)} manga={KC.lilac} />
              <text x={190} y={-150} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>«Les crece</text>
              <text x={190} y={-104} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>la barba</text>
              <text x={190} y={-58} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>y las uñas»</text>
              <text x={190} y={40} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.magenta}>crecen</text>
              <text x={190} y={104} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.magenta}>después</text>
              <text x={190} y={168} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.magenta}>de morir</text>
            </Libro>
          </g>
          <Sello T={T} at={K.Mito + 2.4} x={730} y={960} />
        </Lienzo>
        <Chip T={T} at={K.Mito + 0.3} until={K.Crecer - 0.1} texto="historias de miedo" x={540} y={470} tam={44} borde={KC.violet} />
      </Escena>
      {/* 2–3 · por dentro: células que se dividen con energía… y que paran sin sangre, oxígeno ni azúcar */}
      <Escena T={T} a={K.Crecer} b={K.Piel} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <Foliculo x={300} y={1060} Tc={Tc} act={act} crece={12 * (Tc - K.Crecer)} />
          <Dedo x={1040} y={930} s={0.75} T={T} guia={0} raiz={<Racimo x={-205} y={-62} Tc={Tc} act={act} r={13} pts={[[-30, 0], [0, 4], [30, 0]]} color={KC.pink} />} />
          <Bateria x={540} y={420} nivel={nivel} T={T} s={kprog(T, K.Crecer + 2.4, K.Crecer + 2.9, kEase.rebote)} />
          {T > K.Sin && [[IconoSangre, 170], [IconoO2, 370], [IconoAzucar, 570]].map(([Ic, ix], i) => {
            const a0 = K.Sin + 0.2 + i * 0.9, e = kprog(T, a0, a0 + 0.35, kEase.rebote);
            return <g key={i}><g transform={`translate(${ix} 590) scale(${e}) translate(${-ix} -590)`}><Ic x={ix} y={590} /></g><Tache x={ix} y={590} p={kprog(T, a0 + 0.4, a0 + 0.8, kEase.sale)} r={44} /></g>; })}
        </Lienzo>
        <Chip T={T} at={K.Crecer + 2.6} until={K.Sin - 0.1} texto="energía" x={540} y={530} tam={36} borde={KC.mint} />
        <Etq T={T} at={K.Crecer + 0.5} until={K.Piel - 0.2} x={380} y={1110} texto="raíz del pelo" color={KC.texto} />
        <Etq T={T} at={K.Crecer + 1.2} until={K.Piel - 0.2} x={860} y={1030} texto="raíz de la uña" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Crecer + 0.9} until={K.Sin - 0.1} texto="células que se dividen" x={540} y={290} tam={36} borde={KC.pink} />
        <Chip T={T} at={STOP} until={K.Piel - 0.1} texto="dejan de trabajar" x={420} y={290} tam={40} borde={KC.red} />
      </Escena>
      {/* 4–5 · la piel pierde agua, se retrae y deja ver más uña (y más pelo) */}
      <Escena T={T} a={K.Piel} b={K.Barba} fondo={KC.cyan} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Dedo x={880} y={640} s={1.25} T={T} retrae={ret} agua={kprog(T, K.Piel + 0.3, K.Piel + 0.8) * (1 - kprog(T, K.Asoma + 2.4, K.Asoma + 3))} guia={kprog(T, K.Asoma + 0.3, K.Asoma + 0.8)} vellos={1} />
          {(() => { const foldG = 880 + (-140 - 52 * ret) * 1.25, baseG = 880 - 215 * 1.25, tipG = 880 + 30 * 1.25;
            return <g>
              <Corchete x1={baseG} x2={tipG} y={480} color="#fff" texto="misma uña" tam={36} p={kprog(T, K.Asoma + 0.3, K.Asoma + 0.8)} />
              <Corchete x1={foldG} x2={tipG} y={390} color={KC.yellow} texto="se ve" tam={36} p={kprog(T, K.Asoma + 0.9, K.Asoma + 1.4)} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Piel + 0.4} until={K.Asoma + 0.2} texto="pierde agua" x={330} y={880} tam={44} borde={KC.cyan} />
        <Etq T={T} at={K.Piel + 1.2} until={K.Asoma + 0.6} x={880 - 220 * 1.25} y={780} texto="la piel se retrae" lado="izq" color={KC.ink} />
        <Lupa T={T} at={K.Asoma + 1.0} until={K.Barba - 0.3} x={430} y={900} r={150} fx={880 - 400 * 1.25} fy={640 - 70 * 1.25} tinte={KC.yellow} etiqueta="POR DENTRO · PIEL Y PELO"
          interior={(t, r) => <PielPelo r={r} T={t} baja={40 * kprog(t, K.Asoma + 1.4, K.Asoma + 3.0, kEase.suave)} resalta={1} />} />
        <Chip T={T} at={K.Asoma + 1.0} until={K.Asoma + 4.0} texto="más uña y más pelo a la vista" x={540} y={300} tam={38} borde={KC.yellow} />
        <Chip T={T} at={K.Asoma + 4.2} until={K.Barba - 0.1} texto="creció: 0 mm" x={540} y={300} tam={48} borde={KC.red} />
      </Escena>
      {/* 6 · la barba: la piel se retrae y asoma un trozo que estaba bajo la piel */}
      <Escena T={T} a={K.Barba} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <CabezaPerfil x={330} y={800} s={1.3}><Barbita largo={bajaB / 10} /></CabezaPerfil>
        </Lienzo>
        <Etq T={T} at={K.Barba + 0.3} until={K.Barba + 2.4} x={330 + 160 * 1.3} y={800 + 205 * 1.3} texto="mejilla" lado="der" color={KC.ink} />
        <Lupa T={T} at={K.Barba + 0.5} until={K.Pregunta - 0.2} x={790} y={850} r={185} fx={330 + 100 * 1.3} fy={800 + 150 * 1.3} tinte={KC.gold2} etiqueta="POR DENTRO · MEJILLA"
          interior={(t, r) => <PielPelo r={r} T={t} corto baja={bajaB} resalta={kprog(t, K.Barba + 2.4, K.Barba + 2.9)} />} />
        <Chip T={T} at={K.Barba + 2.6} until={K.Pregunta - 0.1} texto="estaba bajo la piel" x={360} y={400} tam={40} borde={KC.gold2} />
      </Escena>
      {/* 7 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Unas} color={KC.lilac} />
      {/* 8 · uñas en vida: ≈ 3.5 mm al mes (estudio 2010) */}
      <Escena T={T} a={K.Unas} b={K.Pelo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <g opacity={kprog(T, K.Unas + 1.8, K.Unas + 2.2)}>
            <Dedo x={560} y={760} s={1} T={T} crece={3.5 * PXMM * fU} />
            <ReglaMm x={590} y={870} pxmm={PXMM} n={5} />
            {fU > 0 && <line x1={590 + 3.5 * PXMM * fU} y1={700} x2={590 + 3.5 * PXMM * fU} y2={870} stroke={KC.red} strokeWidth={5} strokeDasharray="10 8" />}
            <Calendario x={220} y={470} dia={1 + 29 * fU} />
          </g>
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Unas + 0.2} until={K.Unas + 1.8} anio="2010" quien="uñas de las manos" revista="Yaemsiri y col. · JEADV" x={540} y={700} />
        <Chip T={T} at={K.Unas + 2.4} until={K.Pelo - 0.1} texto="≈ 3.5 mm al mes (estudio 2010)" x={540} y={1060} tam={40} borde={KC.ink} />
      </Escena>
      {/* 9 · pelo en vida: ≈ 1 cm al mes (revisión 2016) */}
      <Escena T={T} a={K.Pelo} b={K.Vida} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g opacity={1 - kprog(T, K.Pelo + 2.3, K.Pelo + 2.7)}><CabezaPerfil x={290} y={800} s={0.95} /></g>
          <rect x={560} y={470} width={440} height={600} rx={36} fill="#fff7e8" stroke={KC.ink} strokeWidth={9} />
          <rect x={560} y={960} width={440} height={110} rx={0} fill={DERMIS} stroke={KC.ink} strokeWidth={7} />
          <rect x={560} y={960} width={440} height={26} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
          <rect x={741} y={960 - 24 - PXCM * fP} width={18} height={24 + PXCM * fP + 60} rx={9} fill={CPELO} />
          <ReglaCm x={820} y={960 - 24} pxcm={PXCM} />
          <Calendario x={650} y={600} dia={1 + 29 * fP} />
        </Lienzo>
        <Etq T={T} at={K.Pelo + 0.4} until={K.Pelo + 2.3} x={110} y={520} texto="pelo de tu cabeza" lado="der" color={KC.texto} />
        <TarjetaEstudio T={T} at={K.Pelo + 2.6} until={K.Vida - 0.1} anio="2016" quien="una revisión" revista="Wolff y col. · Dtsch Arztebl Int" x={300} y={790} />
        <Chip T={T} at={K.Pelo + 1.2} until={K.Vida - 0.1} texto="≈ 1 cm al mes (revisión 2016)" x={540} y={1150} tam={40} borde={KC.ink} />
      </Escena>
      {/* 10 · en vida: el corazón les manda sangre y nutrientes */}
      <Escena T={T} a={K.Vida} b={K.Cierre} fondo={KC.noche} zoom={0.03}>
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <path d={`M ${V1[0]} ${V1[1]} C ${V1[0]} ${V1[1] + 250} ${V2[0] - 200} ${V2[1]} ${V2[0]} ${V2[1]} S ${V3[0] + 30} ${V3[1] + 40} ${V3[0]} ${V3[1]}`} stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
          <path d={`M ${V1[0]} ${V1[1]} C ${V1[0]} ${V1[1] + 250} ${V2[0] - 200} ${V2[1]} ${V2[0]} ${V2[1]} S ${V3[0] + 30} ${V3[1] + 40} ${V3[0]} ${V3[1]}`} stroke="#b0303a" strokeWidth={32} fill="none" strokeLinecap="round" />
          <Foliculo x={640} y={1090} Tc={T} act={1} crece={10 * (T - K.Vida)} ancho={220} />
          {Array.from({ length: 12 }, (_, i) => { const f = (T * 0.35 + i / 12) % 1;
            const P = f < 0.6 ? bez(V1, [V1[0], V1[1] + 250], [V2[0] - 200, V2[1]], V2, f / 0.6) : bez(V2, [V2[0] + 200, V2[1]], [V3[0] + 30, V3[1] + 40], V3, (f - 0.6) / 0.4);
            return i % 3 === 2 ? <circle key={i} cx={P[0]} cy={P[1]} r={9} fill={NUTRI} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Vida + 0.8, K.Vida + 1.2)} />
              : <ellipse key={i} cx={P[0]} cy={P[1]} rx={13} ry={9} fill={SANGRE} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Vida + 0.3, K.Vida + 0.7)} />; })}
          <line x1={H[0]} y1={H[1] + 40} x2={V1[0]} y2={V1[1]} stroke="#b0303a" strokeWidth={30} />
          <Corazon x={H[0]} y={H[1]} s={1.8} late={late} />
        </Lienzo>
        <Chip T={T} at={K.Vida + 0.5} until={K.Vida + 3.6} texto="sangre y nutrientes" x={360} y={400} tam={40} borde={SANGRE} />
        <Chip T={T} at={K.Vida + 1.6} until={K.Vida + 3.6} texto="todos los días" x={300} y={480} tam={36} borde={NUTRI} />
        <Chip T={T} at={K.Vida + 3.8} until={K.Cierre - 0.1} texto="sin eso: se detiene" x={360} y={420} tam={42} borde={KC.red} />
        <Etq T={T} at={K.Vida + 1.0} until={K.Cierre - 0.2} x={720} y={1110} texto="folículo" color={KC.texto} />
      </Escena>
      {/* 11 · cierre: la misma mano y barba; no crece: se retira la piel */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Portada cierre />
        <Lienzo z={3}>
          <TextoSvg x={300} y={420} tam={96} color={KC.yellow} rot={-4} o={0.6}>¿CRECEN?</TextoSvg>
          <line x1={110} y1={440} x2={490} y2={340} stroke={KC.red} strokeWidth={22} strokeLinecap="round" />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.6} until={K.Outro - 0.1} texto="se retira la piel" x={540} y={560} tam={52} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Mito - 0.1} texto="No crecen: *la piel se encoge.*" />
      <Subtitulo T={T} idx={1} at={K.Mito + 0.1} until={K.Crecer - 0.1} texto="Un mito de *historias de miedo.*" />
      <Subtitulo T={T} idx={2} at={K.Crecer + 0.1} until={K.Sin - 0.1} texto="Crecer: *células que se dividen.*" />
      <Subtitulo T={T} idx={3} at={K.Sin + 0.1} until={K.Piel - 0.1} texto="Sin sangre ni azúcar: *paran.*" />
      <Subtitulo T={T} idx={4} at={K.Piel + 0.1} until={K.Asoma - 0.1} texto="La piel *pierde agua.*" />
      <Subtitulo T={T} idx={5} at={K.Asoma + 0.1} until={K.Barba - 0.1} texto="Se ve más… *sin crecer nada.*" />
      <Subtitulo T={T} idx={6} at={K.Barba + 0.1} until={K.Pregunta - 0.1} texto="Asoma barba *de bajo la piel.*" />
      <Subtitulo T={T} idx={7} at={K.Pregunta + 0.1} until={K.Unas - 0.1} texto="¿Y *en vida?*" />
      <Subtitulo T={T} idx={8} at={K.Unas + 0.1} until={K.Pelo - 0.1} texto="Uñas: *≈ 3.5 mm al mes.*" />
      <Subtitulo T={T} idx={9} at={K.Pelo + 0.1} until={K.Vida - 0.1} texto="Pelo: *≈ 1 cm al mes.*" />
      <Subtitulo T={T} idx={10} at={K.Vida + 0.1} until={K.Cierre - 0.1} texto="Necesitan *sangre y nutrientes.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Es una *ilusión.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [K.Mito + 2.9, K.Crecer - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Sin + 0.4, K.Piel - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Asoma + 3.6, K.Barba - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Barba + 2.3, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Pregunta + 0.05, K.Unas + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Unas + 3.0, K.Pelo - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Pelo + 2.4, K.Vida - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Vida + 3.4, K.Cierre - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="53" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function PeloMuertoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PeloMuerto /></CompositionStage></div>;
}
window.PeloMuertoApp = PeloMuertoApp;
