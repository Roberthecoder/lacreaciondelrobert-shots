// Shot Científico #22 · Las agujetas no son ácido láctico — NARRADO (N5 "El experimento" + N1 "Por dentro").
// Datos: Schwane et al. 1983 (Phys. Sportsmed.; MSSE), Cheung et al. 2003, Hotfiel et al. 2018, McHugh 2003. Ver guion.md y verificacion.md.
// Todas las barras son ilustrativas (sin números).
const CMUS = '#e2475f', CMUS2 = '#b52a44', CLAC = KC.cyan, CDOL = KC.red, CREP = KC.mint;

/* ---------- escalera y persona que baja ---------- */
// Escalera que baja hacia la derecha: n escalones de w × h desde (x0, y0).
function Escalera({ x0, y0, n = 5, w = 100, h = 95, color = '#c98b5a' }) {
  let d = `M ${x0 - 200} ${KH} L ${x0 - 200} ${y0} `;
  for (let k = 0; k < n; k++) d += `L ${x0 + w * (k + 1)} ${y0 + h * k} L ${x0 + w * (k + 1)} ${y0 + h * (k + 1)} `;
  d += `L ${KW + 50} ${y0 + h * n} L ${KW + 50} ${KH} Z`;
  return <g><path d={d} fill={color} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {Array.from({ length: n }, (_, k) => <line key={k} x1={x0 + w * k + 10} y1={y0 + h * k + 16} x2={x0 + w * (k + 1) - 6} y2={y0 + h * k + 16} stroke="rgba(0,0,0,.18)" strokeWidth={8} />)}</g>;
}
// Persona que baja escalón por escalón: k (continuo) = escalón actual.
function BajaEscalera({ T, x0, y0, w, h, k, cara = 'normal', dolor = 0, color = KC.pink }) {
  const ki = Math.floor(k), f = k - ki, paso = kEase.suave(kclamp(f / 0.6, 0, 1));
  const x = x0 + w * (ki + 0.5) + w * paso, yp = y0 + h * ki + h * paso - Math.sin(paso * Math.PI) * 20;
  const tiembla = dolor * Math.sin(T * 40) * 3;
  return <g transform={`translate(${tiembla} 0)`}>
    <PersonaSimple x={x} yPies={yp} alto={430} color={color} brazos={0.1 + dolor * 0.15} cara={cara} />
    {dolor > 0 && [[-60, -120], [60, -150], [-40, -40]].map(([dx, dy], i) => {
      const o = dolor * (0.5 + 0.5 * Math.sin(T * 9 + i * 2));
      return <path key={i} d={`M ${x + dx - 26} ${yp + dy} l 13 -16 l 13 16 l 13 -16 l 13 16`} transform={`rotate(${i * 25 - 20} ${x + dx} ${yp + dy})`} fill="none" stroke={KC.red} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={o} />;
    })}
  </g>;
}
// Frasco con etiqueta.
function Frasco({ x, y, s = 1, texto = 'ÁCIDO LÁCTICO', tacha = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-150} width={120} height={40} rx={10} fill="#6b6f7a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -55 -110 L -85 -60 L -85 110 Q -85 130 -65 130 L 65 130 Q 85 130 85 110 L 85 -60 L 55 -110 Z" fill="#e9f7ff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -80 0 L 80 0 L 80 120 Q 80 126 66 126 L -66 126 Q -80 126 -80 120 Z" fill="#f2f0c4" opacity=".9" />
    <rect x={-78} y={-50} width={156} height={80} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-15} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>{texto.split(' ')[0]}</text>
    <text x={0} y={16} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>{texto.split(' ').slice(1).join(' ')}</text>
    {tacha > 0 && <g stroke={KC.red} strokeWidth={26} strokeLinecap="round">
      <line x1={-120} y1={-170} x2={klerp(-120, 120, kprog(tacha, 0, 0.5))} y2={klerp(-170, 170, kprog(tacha, 0, 0.5))} />
      {tacha > 0.5 && <line x1={120} y1={-170} x2={klerp(120, -120, kprog(tacha, 0.5, 1))} y2={klerp(-170, 170, kprog(tacha, 0.5, 1))} />}
    </g>}
  </g>;
}
// Reloj con manecillas que giran (paso de las horas).
function Reloj({ x, y, r = 70, T = 0, vel = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r + 10} x2={0} y2={-r + 22} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${T * 60 * vel})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={KC.red} strokeWidth={6} strokeLinecap="round" transform={`rotate(${T * 720 * vel})`} />
    <circle r={8} fill={KC.ink} />
  </g>;
}
// Corredor de perfil (mirando a la derecha). (x, y) = cadera.
function Corredor({ x, y, s = 1, T = 0, color = KC.pink, vel = 9 }) {
  const a = Math.sin(T * vel), b = Math.sin(T * vel + Math.PI);
  const pierna = (fase, op) => { const mus = fase * 40, rod = 30 + Math.max(0, -fase) * 60;
    const kx = Math.sin(mus * Math.PI / 180) * 90, ky = Math.cos(mus * Math.PI / 180) * 90;
    const ang = (mus - rod) * Math.PI / 180, fx = kx + Math.sin(ang) * 90, fy = ky + Math.cos(ang) * 90;
    return <polyline points={`0,0 ${kx},${ky} ${fx},${fy} ${fx + 30},${fy}`} fill="none" stroke={op ? '#3a3f5c' : '#262a40'} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />; };
  const brazo = (fase, op) => <polyline points={`0,-130 ${-fase * 50},-70 ${-fase * 50 + 45},-50`} fill="none" stroke={op ? CPIEL : CPIEL2} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />;
  const bob = Math.abs(Math.sin(T * vel)) * -8;
  return <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
    {pierna(b, 0)}{brazo(b, 0)}
    <path d="M -22 -150 L 22 -150 L 26 5 L -18 5 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform="rotate(8)" />
    {pierna(a, 1)}
    <circle cx={20} cy={-195} r={38} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -16 -210 Q 10 -246 52 -214 Q 20 -222 -16 -196 Z" fill={CPELO} stroke={KC.ink} strokeWidth={5} />
    <circle cx={36} cy={-198} r={5} fill={KC.ink} />
    {brazo(a, 1)}
  </g>;
}
// Caminadora; inclina en grados (positivo = la banda baja hacia el frente: bajada).
function Caminadora({ x, y, s = 1, T = 0, inclina = 0, color = KC.pink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${inclina})`}>
      <rect x={-230} y={0} width={460} height={46} rx={22} fill="#2b2f3d" stroke={KC.ink} strokeWidth={9} />
      {Array.from({ length: 9 }, (_, i) => { const xx = -220 + (((i * 52 - T * 160) % 468) + 468) % 468; return <line key={i} x1={xx} y1={6} x2={xx} y2={40} stroke="#555c70" strokeWidth={6} />; })}
      <rect x={200} y={-260} width={22} height={262} rx={8} fill="#8a90a0" stroke={KC.ink} strokeWidth={7} />
      <rect x={160} y={-290} width={110} height={52} rx={12} fill="#3a3f5c" stroke={KC.ink} strokeWidth={7} />
      <Corredor x={-10} y={-180} s={0.95} T={T} color={color} />
    </g>
    <rect x={-210} y={40} width={30} height={60 + inclina * -6} fill="#555c70" stroke={KC.ink} strokeWidth={6} />
    <rect x={180} y={40 + inclina * 7} width={30} height={Math.max(20, 60 - inclina * 7)} fill="#555c70" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Barra vertical ilustrativa (dentro de svg). base = y de la base; v 0..1 de alto máximo.
function BarraV({ x, base, alto = 360, ancho = 120, v = 0, color = CLAC, etiqueta }) {
  const h = Math.max(8, alto * v);
  return <g>
    <rect x={x - ancho / 2} y={base - h} width={ancho} height={h} rx={16} fill={color} stroke={KC.ink} strokeWidth={8} />
    {etiqueta && <text x={x} y={base + 46} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">{etiqueta}</text>}
  </g>;
}

/* ---------- músculo por dentro ---------- */
// Fibra muscular al microscopio: bandas claras y oscuras (estrías). desgarres: [{x, p}] p 0..1 = cuánto se abrió.
function FibraMicro({ x, y, largo = 520, alto = 96, T = 0, desgarres = [], fase = 0 }) {
  const paso = 30, bandas = [];
  for (let i = 0; i * paso < largo; i++) bandas.push(<rect key={i} x={i * paso + 6} y={4} width={14} height={alto - 8} fill={CMUS2} opacity=".85" />);
  const lineasZ = []; for (let i = 0; i * paso < largo; i++) lineasZ.push(<line key={i} x1={i * paso} y1={4} x2={i * paso} y2={alto - 4} stroke="#ffd2da" strokeWidth={2} opacity=".7" />);
  return <g transform={`translate(${x + Math.sin(T * 1.2 + fase) * 4} ${y})`}>
    <rect x={0} y={0} width={largo} height={alto} rx={alto / 2} fill={CMUS} stroke={KC.ink} strokeWidth={6} />
    <g clipPath="none">{bandas}{lineasZ}</g>
    <rect x={0} y={0} width={largo} height={alto} rx={alto / 2} fill="none" stroke={KC.ink} strokeWidth={6} />
    {desgarres.map((d, i) => { if (d.p <= 0.01) return null; const w = 6 + 26 * d.p;
      const zz = `M ${d.x} ${-6} l ${w} ${alto * 0.2} l ${-w * 1.4} ${alto * 0.2} l ${w * 1.6} ${alto * 0.25} l ${-w * 1.2} ${alto * 0.2} l ${w} ${alto * 0.25}`;
      return <g key={i}><path d={zz + ` L ${d.x - w} ${alto + 6} l ${-w} ${-alto * 0.25} l ${w * 1.2} ${-alto * 0.2} l ${-w * 1.6} ${-alto * 0.25} l ${w * 1.4} ${-alto * 0.2} Z`} fill="#06121c" stroke={KC.yellow} strokeWidth={4} strokeLinejoin="round" opacity={kprog(d.p, 0, 0.3)} />
        {[0, 1, 2].map((j) => <circle key={j} cx={d.x + Math.cos(T * 5 + j * 2) * (20 + 10 * j)} cy={alto / 2 + Math.sin(T * 5 + j * 2) * 30} r={4} fill={KC.yellow} opacity={d.p * (0.5 + 0.5 * Math.sin(T * 8 + j))} />)}</g>; })}
  </g>;
}
// Muslo en corte: piel, músculo con fibras. (x, y) = centro.
function MusloCorte({ x, y, T = 0, corte = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -150 -380 Q -170 0 -110 330 Q -40 380 40 360 Q 120 330 140 0 Q 150 -260 150 -380 Z" fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} />
    <path d="M -130 -300 Q -150 0 -100 320 Q -40 360 40 345 Q 110 320 125 0 Q 135 -230 130 -300 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    <g opacity={corte}>
      <path d="M -100 -280 Q -118 0 -80 300 Q -30 330 30 320 Q 92 300 102 0 Q 110 -220 102 -280 Z" fill={CMUS} stroke={KC.ink} strokeWidth={7} />
      {Array.from({ length: 9 }, (_, i) => { const xx = -80 + i * 20; return <path key={i} d={`M ${xx} -270 Q ${xx + Math.sin(T + i) * 6 - 6} 0 ${xx * 0.8} 300`} fill="none" stroke={CMUS2} strokeWidth={5} />; })}
    </g>
    <path d="M -110 -380 L 130 -380 L 150 -300 L -150 -300 Z" fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Célula de defensa (glóbulo blanco esquemático).
function CelDefensa({ x, y, r = 34, T = 0, i = 0 }) {
  const w = (k) => r * (1 + 0.1 * Math.sin(T * 4 + i + k));
  const pts = Array.from({ length: 10 }, (_, k) => { const a = k / 10 * Math.PI * 2; return `${Math.cos(a) * w(k)},${Math.sin(a) * w(k)}`; });
  return <g transform={`translate(${x} ${y})`}>
    <polygon points={pts.join(' ')} fill="#e8e4ff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d={`M ${-r * 0.5} ${-r * 0.1} q ${r * 0.25} ${-r * 0.45} ${r * 0.5} 0 q ${r * 0.25} ${r * 0.45} ${r * 0.5} 0`} fill="none" stroke={KC.lilac} strokeWidth={r * 0.35} strokeLinecap="round" />
  </g>;
}
// Nervio: línea ondulada con ramitas; chispa 0..1 = qué tan sensible.
function Nervio({ x1, y1, x2, y2, p = 1, T = 0, chispa = 0 }) {
  const n = 30, pts = [];
  for (let i = 0; i <= n * p; i++) { const f = i / n; const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny);
    const o = Math.sin(f * Math.PI * 4) * 22; pts.push(`${klerp(x1, x2, f) + nx / L * o},${klerp(y1, y2, f) + ny / L * o}`); }
  return <g>
    <polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={20} strokeLinecap="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={KC.yellow} strokeWidth={11} strokeLinecap="round" />
    {p >= 1 && chispa > 0 && Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2 + T * 2, L = (24 + 40 * chispa) * (0.6 + 0.4 * Math.abs(Math.sin(T * 10 + i)));
      return <line key={i} x1={x2 + Math.cos(a) * 26} y1={y2 + Math.sin(a) * 26} x2={x2 + Math.cos(a) * (26 + L)} y2={y2 + Math.sin(a) * (26 + L)} stroke={KC.yellow} strokeWidth={7} strokeLinecap="round" />; })}
    {p >= 1 && <circle cx={x2} cy={y2} r={18 + 6 * chispa * Math.abs(Math.sin(T * 10))} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
  </g>;
}

/* ---------- pierna que baja un escalón (contracción excéntrica) ---------- */
// rodilla por cinemática inversa: cadera H, pie F, largo L; la rodilla va hacia el frente (derecha).
function rodillaIK(H, F, L) {
  const dx = F[0] - H[0], dy = F[1] - H[1], d = Math.min(Math.hypot(dx, dy), 2 * L - 1), h = Math.sqrt(L * L - (d / 2) * (d / 2));
  const mx = (H[0] + F[0]) / 2, my = (H[1] + F[1]) / 2, ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);
  return [mx + uy * h, my - ux * h];
}
function PiernaBaja({ T, a, x = 380, piso = 1100, L = 290, sigue = 1 }) {
  const per = 2.6, f = (((T - a) / per) % 1 + 1) % 1;
  const flex = f < 0.78 ? kEase.suave(f / 0.78) : 1 - kEase.suave((f - 0.78) / 0.22);
  const baja = f < 0.78 ? 1 : 0;
  const H = [x, piso - 570 + flex * 140], F = [x, piso], K = rodillaIK(H, F, L);
  const F2 = [klerp(x + 40, x + 290, flex), klerp(piso - 90, piso + 135, flex) - Math.sin(flex * Math.PI) * 40], K2 = rodillaIK(H, F2, L);
  const pier = (Hh, Kk, Ff, c, op) => <g opacity={op}>
    <polyline points={`${Hh[0]},${Hh[1]} ${Kk[0]},${Kk[1]} ${Ff[0]},${Ff[1]}`} fill="none" stroke={KC.ink} strokeWidth={104} strokeLinecap="round" strokeLinejoin="round" />
    <polyline points={`${Hh[0]},${Hh[1]} ${Kk[0]},${Kk[1]} ${Ff[0]},${Ff[1]}`} fill="none" stroke={c} strokeWidth={88} strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${Ff[0] - 40} ${Ff[1] - 10} L ${Ff[0] + 90} ${Ff[1] - 10} Q ${Ff[0] + 100} ${Ff[1] + 22} ${Ff[0] + 70} ${Ff[1] + 22} L ${Ff[0] - 50} ${Ff[1] + 22} Z`} fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
  // cuádriceps: frente del muslo, de la cadera a la rodilla, con su tendón hasta la espinilla
  const tx = K[0] - H[0], ty = K[1] - H[1], tl = Math.hypot(tx, ty), nx = -ty / tl, ny = tx / tl; // normal hacia el frente
  const fr = (P, k) => [P[0] - nx * k, P[1] - ny * k];
  const m0 = fr([klerp(H[0], K[0], 0.12), klerp(H[1], K[1], 0.12)], 30), m1 = fr([klerp(H[0], K[0], 0.86), klerp(H[1], K[1], 0.86)], 32);
  const sh = [klerp(K[0], F[0], 0.22), klerp(K[1], F[1], 0.22)], kf = fr(K, 40);
  const ancho = 50 - flex * 12;
  const ux = tx / tl, uy = ty / tl, flechas = baja * kprog(flex, 0.05, 0.25) * sigue;
  return <g>
    {pier(H, K2, F2, CPIEL2, 1)}
    <path d={`M ${H[0] - 70} ${H[1] - 70} L ${H[0] + 80} ${H[1] - 70} L ${H[0] + 90} ${H[1] + 50} L ${H[0] - 80} ${H[1] + 50} Z`} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {pier(H, K, F, CPIEL, 1)}
    <path d={`M ${m1[0]} ${m1[1]} Q ${kf[0]} ${kf[1]} ${sh[0] - nx * 26} ${sh[1] - ny * 26}`} fill="none" stroke="#f4e3c8" strokeWidth={16} strokeLinecap="round" />
    <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke={KC.ink} strokeWidth={ancho + 12} strokeLinecap="round" />
    <line x1={m0[0]} y1={m0[1]} x2={m1[0]} y2={m1[1]} stroke={CMUS} strokeWidth={ancho} strokeLinecap="round" />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={klerp(m0[0], m1[0], q) - 8} y1={klerp(m0[1], m1[1], q)} x2={klerp(m0[0], m1[0], q + 0.12) - 8} y2={klerp(m0[1], m1[1], q + 0.12)} stroke={CMUS2} strokeWidth={6} strokeLinecap="round" />)}
    <path d={`M ${H[0] - 70} ${H[1] - 70} L ${H[0] + 80} ${H[1] - 70} L ${H[0] + 90} ${H[1] + 50} L ${H[0] - 80} ${H[1] + 50} Z`} fill="#3a3f5c" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" opacity=".001" />
    {flechas > 0 && <g opacity={flechas}>
      <FlechaRecta x1={m0[0] - nx * 70 + ux * 60} y1={m0[1] - ny * 70 + uy * 60} x2={m0[0] - nx * 70 - ux * 50} y2={m0[1] - ny * 70 - uy * 50} color={KC.yellow} grosor={12} punta={28} />
      <FlechaRecta x1={m1[0] - nx * 70 - ux * 60} y1={m1[1] - ny * 70 - uy * 60} x2={m1[0] - nx * 70 + ux * 50} y2={m1[1] - ny * 70 + uy * 50} color={KC.yellow} grosor={12} punta={28} />
    </g>}
  </g>;
}
// Personita que baja un cerro.
function BajaCerro({ T, x, y, ancho = 460, alto = 380, p = 1 }) {
  const f = ((T * 0.18) % 1), px = klerp(0, ancho / 2 - 30, f), py = -alto + alto * (px / (ancho / 2));
  return <g opacity={p}>
    <Montana x={x} y={y} ancho={ancho} alto={alto} color="#7cc46a" nieve={false} />
    <g transform={`translate(${x + px} ${y + py - 6}) scale(0.35)`}><Corredor x={0} y={0} T={T} vel={5} color={KC.orange} /></g>
  </g>;
}

function Agujetas() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // escalera del inicio y del cierre
  const ES = { x0: 90, y0: 700, w: 102, h: 96 };
  const curva = (u) => { // lactato ilustrativo: base → sube con el ejercicio → baja en horas
    if (u < 0.15) return 0.12; if (u < 0.45) return 0.12 + 0.78 * kEase.suave((u - 0.15) / 0.3);
    if (u < 0.92) return 0.12 + 0.78 * (1 - kEase.suave((u - 0.45) / 0.47)); return 0.12; };
  const G = { x: 140, y: 560, w: 800, h: 480 };
  const gp = kprog(T, K.Lactato + 0.3, K.Tarde - 0.4);
  const gpts = []; for (let i = 0; i <= 80 * gp; i++) { const u = i / 80; gpts.push(`${G.x + u * G.w},${G.y + G.h - curva(u) * G.h}`); }
  const tip = gpts.length ? gpts[gpts.length - 1].split(',').map(Number) : [G.x, G.y + G.h];
  const dias = [{ t: 'ejercicio', v: 0.05 }, { t: 'día 1', v: 0.78 }, { t: 'día 2', v: 0.95 }, { t: 'día 3', v: 0.8 }];
  const ff = (t0, a, b) => kprog(T, t0 + a, t0 + b, kEase.sale);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: al día siguiente, bajar la escalera duele; el frasco de ácido láctico se tacha */}
      <Escena T={T} a={K.Gancho} b={K.Lactato}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Escalera {...ES} n={6} />
          <BajaEscalera T={T} {...ES} k={1.0 + T * 0.5} cara="o" dolor={1} />
          <Frasco x={800} y={1010} s={1.05} tacha={kprog(T, K.Gancho + 2.6, K.Gancho + 3.3)} />
          <Onomato T={T} at={K.Gancho + 0.2} dur={1.6} x={450} y={400} texto="¡AY!" color={KC.red} tam={140} rot={-10} />
        </Lienzo>
        <Chip T={T} at={K.Gancho + 1.6} until={K.Lactato - 0.1} texto="al día siguiente…" x={330} y={1170} tam={40} borde={KC.red} />
      </Escena>
      {/* 1 · el lactato sube con el ejercicio y baja en horas */}
      <Escena T={T} a={K.Lactato} b={K.Tarde} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={G.x - 70} y={G.y - 90} width={G.w + 120} height={G.h + 210} rx={36} fill="rgba(10,12,20,.85)" stroke={KC.ink} strokeWidth={8} />
          <rect x={G.x + G.w * 0.15} y={G.y - 20} width={G.w * 0.3} height={G.h + 20} fill={KC.orange} opacity={0.25 * kprog(T, K.Lactato + 0.4, K.Lactato + 0.8)} />
          <line x1={G.x} y1={G.y - 30} x2={G.x} y2={G.y + G.h} stroke={KC.texto} strokeWidth={6} />
          <line x1={G.x} y1={G.y + G.h} x2={G.x + G.w + 20} y2={G.y + G.h} stroke={KC.texto} strokeWidth={6} />
          <text x={G.x + 16} y={G.y - 40} style={{ font:`900 34px ${KF.texto}` }} fill={CLAC}>lactato en sangre</text>
          <text x={G.x + G.w} y={G.y + G.h + 56} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>tiempo →</text>
          <text x={G.x + G.w * 0.3} y={G.y + G.h + 56} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.orange} opacity={kprog(T, K.Lactato + 0.4, K.Lactato + 0.8)}>ejercicio intenso</text>
          <polyline points={gpts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={gpts.join(' ')} fill="none" stroke={CLAC} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          {gp > 0 && <circle cx={tip[0]} cy={tip[1]} r={18} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />}
          <g opacity={kprog(T, K.Lactato + 2.6, K.Lactato + 3.0)}>
            <Reloj x={G.x + G.w * 0.74} y={G.y + 70} r={62} T={T} vel={3} />
            <text x={G.x + G.w * 0.74} y={G.y + 190} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>en horas</text>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Lactato + 0.2} until={K.Tarde - 0.1} texto="el lactato sube… y baja" x={540} y={400} tam={42} borde={CLAC} />
      </Escena>
      {/* 2 · las agujetas llegan tarde: calendario con dolor */}
      <Escena T={T} a={K.Tarde} b={K.Estudio} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          {dias.map((d, i) => { const cx = 165 + i * 250, e = kprog(T, K.Tarde + 0.2 + i * 0.25, K.Tarde + 0.6 + i * 0.25, kEase.rebote);
            const v = d.v * kprog(T, K.Tarde + 1.4 + i * 0.75, K.Tarde + 2.2 + i * 0.75, kEase.sale);
            return <g key={i} transform={`translate(${cx} 860) scale(${e}) translate(${-cx} -860)`}>
              <rect x={cx - 105} y={560} width={210} height={560} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
              <rect x={cx - 105} y={560} width={210} height={90} rx={24} fill={i === 0 ? KC.orange : KC.red} stroke={KC.ink} strokeWidth={8} />
              <text x={cx} y={622} textAnchor="middle" style={{ font:`900 ${i === 0 ? 30 : 40}px ${KF.texto}` }} fill="#fff">{d.t}</text>
              <rect x={cx - 40} y={690} width={80} height={380} rx={40} fill="#e9e2d2" stroke={KC.ink} strokeWidth={6} />
              <rect x={cx - 40} y={1070 - Math.max(30, 380 * v)} width={80} height={Math.max(30, 380 * v)} rx={40} fill={CDOL} stroke={KC.ink} strokeWidth={6} opacity={v > 0.01 ? 1 : 0.3} />
            </g>; })}
          {T > K.Tarde + 1.0 && <g opacity={kprog(T, K.Tarde + 1.0, K.Tarde + 1.4)}><Reloj x={165} y={500} r={46} T={T} vel={4} /></g>}
          <text x={640} y={525} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Tarde + 1.5, K.Tarde + 2)}>(dolor ilustrativo)</text>
        </Lienzo>
        <Chip T={T} at={K.Tarde + 0.3} until={K.Estudio - 0.1} texto="el dolor llega tarde" x={600} y={420} tam={42} borde={CDOL} />
      </Escena>
      {/* 3 · el estudio de 1983: caminadora en plano y en bajada */}
      <Escena T={T} a={K.Estudio} b={K.Bajada} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {T > K.Estudio + 2.2 && <g opacity={kprog(T, K.Estudio + 2.2, K.Estudio + 2.6)}>
            <g transform={`translate(${(1 - kprog(T, K.Estudio + 2.2, K.Estudio + 2.8, kEase.sale)) * -500} 0)`}><Caminadora x={300} y={760} s={0.75} T={T} inclina={0} color={KC.orange} /></g>
            <g transform={`translate(${(1 - kprog(T, K.Estudio + 2.6, K.Estudio + 3.2, kEase.sale)) * 600} 0)`}><Caminadora x={760} y={1080} s={0.75} T={T} inclina={9} color={KC.lilac} /></g>
            <TextoSvg x={300} y={880} tam={64} color={KC.yellow} o={kprog(T, K.Estudio + 2.6, K.Estudio + 2.9)}>EN PLANO</TextoSvg>
            <TextoSvg x={760} y={1200} tam={64} color={KC.yellow} o={kprog(T, K.Estudio + 3.0, K.Estudio + 3.3)}>EN BAJADA</TextoSvg>
          </g>}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.2} anio="1983" quien="caminadora: en plano y en bajada" revista="Schwane et al. · The Physician and Sportsmedicine" x={540} y={820} />
      </Escena>
      {/* 4 · resultado: en bajada el lactato no sube, pero duele más */}
      <Escena T={T} a={K.Bajada} b={K.Pregunta} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <rect x={60} y={420} width={960} height={810} rx={36} fill="rgba(10,12,20,.82)" stroke={KC.ink} strokeWidth={8} />
          <Caminadora x={290} y={640} s={0.42} T={T} inclina={0} color={KC.orange} />
          <Caminadora x={790} y={640} s={0.42} T={T} inclina={9} color={KC.lilac} />
          <TextoSvg x={290} y={740} tam={52} color={KC.yellow}>PLANO</TextoSvg>
          <TextoSvg x={790} y={740} tam={52} color={KC.yellow}>BAJADA</TextoSvg>
          <line x1={540} y1={460} x2={540} y2={1180} stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="12 12" />
          {[[290, 0.85], [790, 0]].map(([cx, sube], i) => { const v = 0.18 + (sube - 0) * kprog(T, K.Bajada + 0.5, K.Bajada + 1.9, kEase.sale) * (sube ? 0.82 / 0.85 : 0);
            const dol = [0.22, 0.95][i] * kprog(T, K.Bajada + 3.0 + i * 0.4, K.Bajada + 4.0 + i * 0.4, kEase.sale);
            return <g key={i}>
              <BarraV x={cx - 85} base={1110} alto={330} ancho={120} v={v} color={CLAC} etiqueta="lactato" />
              <BarraV x={cx + 85} base={1110} alto={330} ancho={120} v={Math.max(0.0, dol)} color={CDOL} etiqueta="dolor" />
              <line x1={cx - 160} y1={1110 - 330 * 0.18} x2={cx - 10} y2={1110 - 330 * 0.18} stroke={KC.texto} strokeWidth={4} strokeDasharray="10 8" />
            </g>; })}
          <text x={290 - 160} y={1110 - 330 * 0.18 - 14} style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>reposo</text>
          <text x={790 - 160} y={1110 - 330 * 0.18 - 14} style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>reposo</text>
          <text x={540} y={812} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.8)">(barras ilustrativas)</text>
          {T > K.Bajada + 1.6 && <TextoSvg x={705} y={1000} tam={44} color={CLAC} rot={-6} o={kprog(T, K.Bajada + 1.6, K.Bajada + 2.0) * (1 - kprog(T, K.Bajada + 3.0, K.Bajada + 3.3))}>no subió</TextoSvg>}
        </Lienzo>
      </Escena>
      {/* 5 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Fibras} color={KC.orange} />
      {/* 6 · por dentro: daños microscópicos en las fibras */}
      <Escena T={T} a={K.Fibras} b={K.Excentrico} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo><MusloCorte x={250} y={820} T={T} corte={kprog(T, K.Fibras + 0.1, K.Fibras + 0.7)} /></Lienzo>
        <Etq T={T} at={K.Fibras + 0.5} until={K.Fibras + 2.0} x={360} y={560} texto="músculo" color={KC.texto} />
        <Lupa T={T} at={K.Fibras + 1.0} until={K.Excentrico - 0.3} x={650} y={740} r={240} fx={280} fy={820} tinte={KC.coral} etiqueta="AL MICROSCOPIO · FIBRA MUSCULAR"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a0b14" />
            {[0, 1, 2, 3].map((i) => <FibraMicro key={i} x={-20} y={40 + i * 112} largo={r * 2 + 40} alto={96} T={t} fase={i}
              desgarres={[{ x: [150, 330, 220, 380][i], p: kprog(t, K.Fibras + 3.0 + i * 0.35, K.Fibras + 3.6 + i * 0.35, kEase.sale) }]} />)}</svg>} />
        <Chip T={T} at={K.Fibras + 0.2} until={K.Excentrico - 0.1} texto="lo más aceptado" x={540} y={400} tam={40} borde={KC.coral} />
        <Etq T={T} at={K.Fibras + 3.4} until={K.Excentrico - 0.3} x={520} y={1110} texto="daños microscópicos" color={KC.yellow} />
      </Escena>
      {/* 7 · el músculo trabaja mientras se estira: bajar un escalón (o un cerro) */}
      <Escena T={T} a={K.Excentrico} b={K.Inflamacion} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <BajaCerro T={T} x={850} y={980} ancho={420} alto={300} p={kprog(T, K.Excentrico + 3.4, K.Excentrico + 3.9)} />
          <path d={`M -20 1110 L 520 1110 L 520 1240 L ${KW + 20} 1240 L ${KW + 20} ${KH} L -20 ${KH} Z`} fill="#c98b5a" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
          <PiernaBaja T={T} a={K.Excentrico} x={430} piso={1100} L={280} />
        </Lienzo>
        <Chip T={T} at={K.Excentrico + 0.4} until={K.Inflamacion - 0.1} texto="trabaja mientras se estira" x={680} y={420} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Excentrico + 1.2} until={K.Excentrico + 3.3} x={560} y={560} texto="el músculo se alarga" color={KC.ink} />
        <Etq T={T} at={K.Excentrico + 3.6} until={K.Inflamacion - 0.2} x={1050} y={630} texto="bajar un cerro" lado="izq" color={KC.ink} />
      </Escena>
      {/* 8 · inflamación y nervios más sensibles */}
      <Escena T={T} a={K.Inflamacion} b={K.Repetida} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <circle cx={540} cy={790} r={300} fill={KC.orange} opacity={0.22 * kprog(T, K.Inflamacion + 0.8, K.Inflamacion + 2) * (0.8 + 0.2 * Math.sin(T * 4))} />
          {[0, 1, 2].map((i) => <FibraMicro key={i} x={-40} y={600 + i * 118} largo={KW + 80} alto={100} T={T} fase={i} desgarres={[{ x: 560 + i * 30, p: 1 }]} />)}
          {Array.from({ length: 8 }, (_, i) => { const g = krng(30 + i), sx = -80 - g() * 200, sy = 450 + g() * 800, tx = 470 + g() * 160, ty = 600 + g() * 340;
            const p = kprog(T, K.Inflamacion + 0.3 + i * 0.15, K.Inflamacion + 2.2 + i * 0.15, kEase.suave);
            return <CelDefensa key={i} x={klerp(sx, tx, p) + Math.sin(T * 2 + i) * 8} y={klerp(sy, ty, p)} r={32} T={T} i={i} />; })}
          <Nervio x1={KW + 30} y1={1180} x2={680} y2={940} p={kprog(T, K.Inflamacion + 2.6, K.Inflamacion + 3.3, kEase.sale)} T={T} chispa={kprog(T, K.Inflamacion + 3.3, K.Inflamacion + 4.5)} />
        </Lienzo>
        <Chip T={T} at={K.Inflamacion + 0.6} until={K.Repetida - 0.1} texto="inflamación" x={330} y={420} tam={44} borde={KC.orange} />
        <Etq T={T} at={K.Inflamacion + 1.4} until={K.Inflamacion + 2.8} x={420} y={520} texto="células de defensa" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Inflamacion + 3.4} until={K.Repetida - 0.2} x={620} y={1120} texto="nervio más sensible" lado="izq" color={KC.yellow} />
      </Escena>
      {/* 9 · la siguiente vez duele mucho menos */}
      <Escena T={T} a={K.Repetida} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={70} y={500} width={940} height={690} rx={36} fill="rgba(10,12,20,.82)" stroke={KC.ink} strokeWidth={8} />
          <BarraH x={140} y={620} ancho={800} v={0.92 * kprog(T, K.Repetida + 0.4, K.Repetida + 1.6, kEase.sale)} color={CDOL} etiqueta="dolor · la primera vez" />
          <BarraH x={140} y={830} ancho={800} v={0.22 * kprog(T, K.Repetida + 2.2, K.Repetida + 3.2, kEase.sale)} color={CREP} etiqueta="dolor · la siguiente vez" />
          <text x={540} y={970} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="rgba(246,243,236,.8)">(barras ilustrativas)</text>
          {T > K.Repetida + 3.8 && <g transform={`translate(540 1080) scale(${kprog(T, K.Repetida + 3.8, K.Repetida + 4.3, kEase.rebote)})`}>
            <rect x={-260} y={-50} width={520} height={100} rx={50} fill={CMUS} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 16 }, (_, i) => <rect key={i} x={-240 + i * 30} y={-42} width={14} height={84} fill={CMUS2} opacity=".85" />)}
            <rect x={-260} y={-50} width={520} height={100} rx={50} fill="none" stroke={CREP} strokeWidth={10} opacity={0.6 + 0.4 * Math.sin(T * 6)} />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Repetida + 3.8} until={K.Cierre - 0.1} texto="tu músculo se adapta" x={540} y={420} tam={44} borde={CREP} />
      </Escena>
      {/* 10 · cierre: la misma escalera; ahora baja sin dolor */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Escalera {...ES} n={6} />
          <BajaEscalera T={T} {...ES} k={1.0 + (T - K.Cierre) * 0.6} cara="sonrie" color={KC.mint} />
          <Frasco x={800} y={1040} s={0.8} tacha={1} o={0.55} texto="VENENO ACUMULADO" />
          {Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.6 + i / 6) % 1), x = 260 + (i % 3) * 120 + (T - K.Cierre) * 70, y = 900 - f * 260;
            return <text key={i} x={x} y={y} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.mint} stroke={KC.ink} strokeWidth={7} paintOrder="stroke" opacity={(1 - f) * kprog(T, K.Cierre + 1.2, K.Cierre + 1.6)}>+</text>; })}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.2} until={K.Outro - 0.1} texto="se está reparando" x={320} y={420} tam={44} borde={CREP} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Lactato - 0.1} texto="No es *ácido láctico.*" />
      <Subtitulo T={T} idx={1} at={K.Lactato + 0.1} until={K.Tarde - 0.1} texto="El lactato sube… *y baja en horas.*" />
      <Subtitulo T={T} idx={2} at={K.Tarde + 0.1} until={K.Estudio - 0.1} texto="El dolor llega *días después.*" />
      <Subtitulo T={T} idx={3} at={K.Estudio + 0.1} until={K.Bajada - 0.1} texto="1983: *plano y bajada.*" />
      <Subtitulo T={T} idx={4} at={K.Bajada + 0.1} until={K.Pregunta - 0.1} texto="Bajada: sin lactato, *más dolor.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Fibras - 0.1} texto="¿Entonces *qué te duele?*" />
      <Subtitulo T={T} idx={6} at={K.Fibras + 0.1} until={K.Excentrico - 0.1} texto="Daños *microscópicos* en tus fibras." />
      <Subtitulo T={T} idx={7} at={K.Excentrico + 0.1} until={K.Inflamacion - 0.1} texto="Trabaja *mientras se estira.*" />
      <Subtitulo T={T} idx={8} at={K.Inflamacion + 0.1} until={K.Repetida - 0.1} texto="Inflamación y *nervios sensibles.*" />
      <Subtitulo T={T} idx={9} at={K.Repetida + 0.1} until={K.Cierre - 0.1} texto="La siguiente vez: *duele menos.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No es veneno: *se está reparando.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.9, 'avatar_11_sorprendido', 'gancho'],
        [K.Tarde + 0.6, K.Estudio - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Estudio + 0.3, K.Estudio + 2.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Bajada + 3.2, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Fibras + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Fibras + 3.2, K.Excentrico - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Excentrico + 0.6, K.Inflamacion - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Inflamacion + 2.6, K.Repetida - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Repetida + 3.8, K.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_08_recostado_mano', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="22" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function AgujetasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Agujetas /></CompositionStage></div>;
}
window.AgujetasApp = AgujetasApp;
