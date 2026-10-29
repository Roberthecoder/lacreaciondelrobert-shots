// Shot Científico #51 · Por qué ves estrellitas al pararte rápido — NARRADO (N1 "Por dentro").
// Datos: Smit et al. 1999 (J Physiol), Arnold y Shibao 2013, Harms et al. 2021, Cleveland Clinic, NHS. Ver guion.md y verificacion.md.
const SANGRE = '#e23b3b', SANGRE2 = '#ff6b6b';
const kd = (deg) => [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];
const kadd = (p, deg, L) => { const v = kd(deg); return [p[0] + v[0] * L, p[1] + v[1] * L]; };
const POSE = { sent: { t: -97, th: -4, sh: 90, br: 62 }, pie: { t: -90, th: 90, sh: 90, br: 96 }, acost: { t: -180, th: 0, sh: 0, br: -4 } };
const mixPose = (a, b, p) => ({ t: klerp(a.t, b.t, p), th: klerp(a.th, b.th, p), sh: klerp(a.sh, b.sh, p), br: klerp(a.br, b.br, p) });
function arco(cx, cy, r, a0, a1) { const [x0, y0] = kadd([cx, cy], a0, r), [x1, y1] = kadd([cx, cy], a1, r); return `M ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`; }
function Seg({ a, b, w, color }) {
  return <g><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={w + 16} strokeLinecap="round" />
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={w} strokeLinecap="round" /></g>;
}
function Estrellita({ x, y, r = 30, color = '#fff', rot = 0, o = 1 }) {
  const q = r * 0.28;
  return <path d={`M 0 ${-r} L ${q} ${-q} L ${r} 0 L ${q} ${q} L 0 ${r} L ${-q} ${q} L ${-r} 0 L ${-q} ${-q} Z`} transform={`translate(${x} ${y}) rotate(${rot})`}
    fill={color} stroke={KC.ink} strokeWidth={4} opacity={o} />;
}

// Persona de perfil (mira a la derecha) con articulaciones: t = tronco, th = muslo, sh = pierna, br = brazo (grados; 90 = hacia abajo).
// (x, y) = cadera. gotas 0..1: gotitas de sangre que bajan por dentro del cuerpo.
function PersonaLado({ x, y, t = -90, th = 90, sh = 90, br = 96, s = 1, color = KC.blue, pantalon = '#3a3f5c', cara = 'normal', T = 0, gotas = 0, piernasRojas = 0 }) {
  const hip = [0, 0], sho = kadd(hip, t, 290), knee = kadd(hip, th, 200), foot = kadd(knee, sh, 200), hand = kadd(sho, br, 225), head = kadd(sho, t, 96);
  const toe = kadd(foot, sh - 90, 46), phi = t + 90;
  const ruta = [head, sho, hip, knee, foot];
  const enRuta = (f) => { const i = Math.min(3, Math.floor(f * 4)), u = f * 4 - i; return [klerp(ruta[i][0], ruta[i + 1][0], u), klerp(ruta[i][1], ruta[i + 1][1], u)]; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform="translate(-14 -8)"><Seg a={hip} b={knee} w={58} color="#2c3049" /><Seg a={knee} b={foot} w={52} color="#2c3049" /></g>
    <Seg a={hip} b={knee} w={60} color={pantalon} /><Seg a={knee} b={foot} w={54} color={pantalon} />
    {piernasRojas > 0 && <g opacity={piernasRojas}><line x1={hip[0]} y1={hip[1]} x2={knee[0]} y2={knee[1]} stroke={SANGRE} strokeWidth={30} strokeLinecap="round" />
      <line x1={knee[0]} y1={knee[1]} x2={foot[0]} y2={foot[1]} stroke={SANGRE} strokeWidth={26} strokeLinecap="round" /></g>}
    <Seg a={foot} b={toe} w={34} color="#22252e" />
    <Seg a={hip} b={sho} w={118} color={color} />
    <g transform={`translate(${head[0]} ${head[1]}) rotate(${phi})`}>
      <rect x={-26} y={50} width={52} height={40} fill={CPIEL} stroke={KC.ink} strokeWidth={8} transform="rotate(90)" />
      <circle cx={-8} cy={-6} r={72} fill={CPELO} stroke={KC.ink} strokeWidth={8} />
      <circle cx={6} cy={4} r={64} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
      <path d="M -60 -30 C -50 -80 10 -84 40 -60 C 10 -66 -30 -50 -50 -10 Z" fill={CPELO} />
      {cara === 'mareo'
        ? <path d={`M 22 -22 l 22 22 m 0 -22 l -22 22`} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
        : <><circle cx={36} cy={-10} r={9} fill={KC.ink} /><path d="M 22 -32 L 50 -28" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" /></>}
      {cara === 'sonrie' ? <path d="M 28 24 Q 46 40 60 20" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
        : cara === 'o' || cara === 'mareo' ? <ellipse cx={46} cy={28} rx={9} ry={12} fill="#5a1f22" stroke={KC.ink} strokeWidth={5} />
          : <path d="M 32 28 L 58 26" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />}
      <circle cx={-12} cy={6} r={14} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
    </g>
    <Seg a={sho} b={hand} w={44} color={color} />
    <circle cx={hand[0]} cy={hand[1]} r={24} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    {gotas > 0 && Array.from({ length: 7 }, (_, i) => { const f = ((T * 0.55 + i / 7) % 1), [gx, gy] = enRuta(f);
      return <circle key={i} cx={gx} cy={gy} r={13} fill={SANGRE} stroke="#fff" strokeWidth={3} opacity={gotas * Math.min(1, f * 4)} />; })}
  </g>;
}
function Sofa({ x0 }) {
  return <g>
    <rect x={x0 - 150} y={600} width={90} height={420} rx={40} fill={KC.teal} stroke={KC.ink} strokeWidth={9} />
    <rect x={x0 - 150} y={975} width={360} height={110} rx={30} fill={KC.teal} stroke={KC.ink} strokeWidth={9} />
    <rect x={x0 - 130} y={1085} width={24} height={95} fill="#5b3a1e" stroke={KC.ink} strokeWidth={6} />
    <rect x={x0 + 160} y={1085} width={24} height={95} fill="#5b3a1e" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Lampara({ x, y }) {
  return <g><rect x={x - 8} y={y} width={16} height={1180 - y} fill="#555" stroke={KC.ink} strokeWidth={5} />
    <path d={`M ${x - 80} ${y + 10} L ${x - 50} ${y - 110} L ${x + 50} ${y - 110} L ${x + 80} ${y + 10} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>;
}
// La sala: pared, piso, sillón.
function Sala({ x0, color = KC.pink }) {
  return <>
    <FondoLunares color={color} />
    <Lienzo z={1}>
      <rect x={0} y={1180} width={KW} height={KH - 1180} fill="#c98a4b" />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 150} y1={1180} x2={i * 150 - 60} y2={KH} stroke="rgba(0,0,0,.18)" strokeWidth={5} />)}
      <line x1={0} y1={1180} x2={KW} y2={1180} stroke={KC.ink} strokeWidth={10} />
      <Sofa x0={x0} />
    </Lienzo>
  </>;
}
// Silueta de frente con la sangre: pool 0..1 (sangre acumulada en piernas y panza), cabeza 0..1 (sangre en la cabeza).
function CuerpoFrente({ x, y, s = 1, pool = 0, cabeza = 1, T = 0, gotas = 0, id = 'cf' }) {
  const partes = (p) => <>
    <circle cx={0} cy={-900} r={85} {...p} /><rect x={-34} y={-835} width={68} height={60} {...p} />
    <rect x={-150} y={-800} width={300} height={400} rx={80} {...p} />
    <rect x={-222} y={-780} width={62} height={370} rx={31} {...p} /><rect x={160} y={-780} width={62} height={370} rx={31} {...p} />
    <rect x={-135} y={-480} width={115} height={480} rx={50} {...p} /><rect x={20} y={-480} width={115} height={480} rx={50} {...p} /></>;
  const nivel = -pool * 560;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={id}>{partes({})}</clipPath></defs>
    {partes({ fill: KC.ink, stroke: KC.ink, strokeWidth: 22 })}
    {partes({ fill: '#eaf6ff' })}
    <g clipPath={`url(#${id})`}>
      <circle cx={0} cy={-900} r={85} fill={SANGRE} opacity={0.1 + 0.5 * cabeza} />
      <path d="M 0 -880 L 0 -470 M 0 -470 L -78 -20 M 0 -470 L 78 -20 M 0 -760 L -190 -430 M 0 -760 L 190 -430" stroke={SANGRE} strokeWidth={14} fill="none" opacity={0.35 + 0.4 * cabeza} strokeLinecap="round" />
      <path d={`M -260 ${nivel} Q -130 ${nivel - 18 * Math.sin(T * 5)} 0 ${nivel} T 260 ${nivel} L 260 20 L -260 20 Z`} fill={SANGRE} opacity={0.88} />
      {gotas > 0 && Array.from({ length: 12 }, (_, i) => { const xx = [-80, 70, -40, 40, 0, -100, 100, -75, 75, -20, 20, 0][i], f = ((T * 0.6 + i / 12) % 1), yy = klerp(-860, -60, f);
        return <circle key={i} cx={xx} cy={yy} r={15} fill={SANGRE2} stroke="#fff" strokeWidth={3} opacity={gotas * Math.min(1, (1 - f) * 5)} />; })}
    </g>
  </g>;
}
// Jarra de medir con marca de ½ L. nivel 0..1 (1 = arriba de la marca).
function Jarra({ x, y, s = 1, nivel = 0, T = 0 }) {
  const h = 360, top = -h + 40, ny = klerp(0, -h * 0.68, nivel);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id="jarraC"><path d={`M -120 ${top} L 120 ${top} L 105 0 L -105 0 Z`} /></clipPath></defs>
    <path d={`M 120 ${top + 40} C 210 ${top + 40} 210 ${top + 220} 112 ${top + 230}`} fill="none" stroke={KC.ink} strokeWidth={22} />
    <path d={`M -120 ${top} L 120 ${top} L 105 0 L -105 0 Z`} fill="rgba(255,255,255,.75)" />
    <g clipPath="url(#jarraC)"><path d={`M -140 ${ny} Q -60 ${ny - 10 * Math.sin(T * 6)} 0 ${ny} T 140 ${ny} L 140 10 L -140 10 Z`} fill={SANGRE} /></g>
    <path d={`M -120 ${top} L 120 ${top} L 105 0 L -105 0 Z`} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <line x1={-100} y1={-h * 0.5} x2={-40} y2={-h * 0.5} stroke={KC.ink} strokeWidth={7} />
    <text x={-30} y={-h * 0.5 + 14} style={{ font: `900 40px ${KF.texto}` }} fill={KC.ink}>½ L</text>
  </g>;
}
// Medidor de presión de aguja: v 0..1 (0 = baja, 1 = normal).
function Manometro({ x, y, r = 170, v = 1, T = 0, tiembla = 0 }) {
  const a = klerp(200, 340, kclamp(v, 0, 1)) + tiembla * 6 * Math.sin(T * 23);
  const [nx, ny] = kadd([0, 0], a, r * 0.82);
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M ${-r - 20} 40 A ${r + 20} ${r + 20} 0 0 1 ${r + 20} 40 Z`} fill="#fff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d={arco(0, 0, r * 0.86, 200, 250)} stroke={KC.red} strokeWidth={30} fill="none" />
    <path d={arco(0, 0, r * 0.86, 250, 290)} stroke={KC.yellow} strokeWidth={30} fill="none" />
    <path d={arco(0, 0, r * 0.86, 290, 340)} stroke={KC.mint} strokeWidth={30} fill="none" />
    <text x={-r * 0.62} y={-r * 0.12} textAnchor="middle" style={{ font: `900 ${r * 0.16}px ${KF.texto}` }} fill={KC.ink}>baja</text>
    <text x={r * 0.6} y={-r * 0.12} textAnchor="middle" style={{ font: `900 ${r * 0.16}px ${KF.texto}` }} fill={KC.ink}>normal</text>
    <line x1={0} y1={0} x2={nx} y2={ny} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
    <circle r={20} fill={KC.ink} />
    <text x={0} y={r * 0.2 + 18} textAnchor="middle" style={{ font: `400 ${r * 0.24}px ${KF.titulo}` }} fill={KC.ink}>PRESIÓN</text>
  </g>;
}
function Corazon({ x, y, s = 1, fase = 0 }) {
  const lat = Math.pow(Math.max(0, Math.sin(fase)), 4), k = s * (1 + 0.14 * lat);
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <path d="M 0 90 C -170 -20 -150 -150 -60 -150 C -20 -150 0 -120 0 -100 C 0 -120 20 -150 60 -150 C 150 -150 170 -20 0 90 Z" fill={SANGRE} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -80 -110 C -110 -100 -118 -70 -110 -50" stroke="rgba(255,255,255,.6)" strokeWidth={12} fill="none" strokeLinecap="round" />
    {lat > 0.3 && [-1, 1].map((sg) => <path key={sg} d={`M ${sg * 175} -60 l ${sg * 40} -20 M ${sg * 180} 0 l ${sg * 45} 0`} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" opacity={lat} />)}
  </g>;
}
// Vaso sanguíneo vertical: apriete 0..1 cierra las paredes (anillos dorados = músculo).
function Vaso({ x, y, largo = 420, ancho = 150, apriete = 0, T = 0 }) {
  const w = ancho * (1 - 0.32 * apriete), y0 = y - largo / 2;
  return <g>
    <rect x={x - w / 2 - 22} y={y0} width={w + 44} height={largo} rx={30} fill="#f7b7c8" stroke={KC.ink} strokeWidth={9} />
    <rect x={x - w / 2} y={y0} width={w} height={largo} fill="#7a1420" />
    {Array.from({ length: 9 }, (_, i) => { const f = ((T * 0.8 + i / 9) % 1); return <ellipse key={i} cx={x + Math.sin(i * 2.1) * w * 0.22} cy={y0 + f * largo} rx={w * 0.26} ry={w * 0.13} fill={SANGRE} stroke="#ffd0d0" strokeWidth={3} />; })}
    {Array.from({ length: 5 }, (_, i) => <rect key={i} x={x - w / 2 - 30} y={y0 + 40 + i * (largo - 80) / 4 - 12} width={w + 60} height={24} rx={12} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} opacity={0.4 + 0.6 * apriete} />)}
  </g>;
}
function VasoVacio({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 -110 L 80 -110 L 62 110 L -62 110 Z" fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -62 92 L 62 92 L 62 110 L -62 110 Z" fill={KC.cyan} opacity={0.8} />
    <path d="M 0 -40 C -18 -10 -22 10 0 18 C 22 10 18 -10 0 -40 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={6} opacity={0.5} />
  </g>;
}
function Cama({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-120} width={22} height={170} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={-20} width={250} height={40} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-104} y={-50} width={70} height={34} rx={14} fill="#dfe8ff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-50} y={-48} width={180} height={34} rx={16} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-70} cy={-58} r={24} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
    {['z', 'z', 'Z'].map((z, i) => <text key={i} x={-40 + i * 30} y={-100 - i * 26 - ((T * 20) % 10)} style={{ font: `900 ${30 + i * 8}px ${KF.texto}` }} fill={KC.ink}>{z}</text>)}
  </g>;
}
function Tarjeta({ x, y, w = 300, h = 300, e = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${e})`} opacity={Math.min(1, e * 1.5)}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={9} />{children}</g>;
}
function CruzMedica({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-120} width={240} height={240} rx={44} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <path d="M -30 -85 L 30 -85 L 30 -30 L 85 -30 L 85 30 L 30 30 L 30 85 L -30 85 L -30 30 L -85 30 L -85 -30 L -30 -30 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
function Repite({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 90})`}>
    <path d={arco(0, 0, 70, 20, 300)} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d={arco(0, 0, 70, 20, 300)} stroke={KC.orange} strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d="M 30 -95 L 70 -50 L 10 -40 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" transform="rotate(-30)" />
  </g>;
}
// Elevador de sangre: cabina con una gota que baja (p 0 = cabeza, 1 = pies).
function Elevador({ x, y0, y1, p = 0, sube = false }) {
  const cy = klerp(y0 + 90, y1 - 90, p);
  return <g>
    <rect x={x - 110} y={y0 - 70} width={220} height={y1 - y0 + 70} rx={18} fill="rgba(14,15,18,.75)" stroke={KC.ink} strokeWidth={9} />
    {[x - 70, x + 70].map((xx) => <line key={xx} x1={xx} y1={y0} x2={xx} y2={y1} stroke="#888" strokeWidth={6} />)}
    <text x={x} y={y0 - 18} textAnchor="middle" style={{ font: `900 40px ${KF.texto}` }} fill={sube ? KC.mint : KC.yellow}>{sube ? '▲' : '▼'}</text>
    <line x1={x} y1={y0} x2={x} y2={cy - 85} stroke="#bbb" strokeWidth={5} />
    <rect x={x - 85} y={cy - 85} width={170} height={170} rx={16} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${x} ${cy - 55} C ${x - 40} ${cy} ${x - 46} ${cy + 40} ${x} ${cy + 52} C ${x + 46} ${cy + 40} ${x + 40} ${cy} ${x} ${cy - 55} Z`} fill={SANGRE} stroke={KC.ink} strokeWidth={6} />
    <circle cx={x - 12} cy={cy + 14} r={5} fill={KC.ink} /><circle cx={x + 12} cy={cy + 14} r={5} fill={KC.ink} />
    <path d={`M ${x - 12} ${cy + 30} Q ${x} ${cy + 38} ${x + 12} ${cy + 30}`} stroke={KC.ink} strokeWidth={4} fill="none" />
  </g>;
}
// Arteria del cuello con su sensor (dentro de la Lupa).
function Carotida({ r, T }) {
  const c = r, pul = 0.5 + 0.5 * Math.sin(T * 7);
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a0f18" />
    <path d={`M ${c} ${r * 2 + 20} L ${c} ${c + 20} M ${c} ${c + 20} C ${c - 20} ${c - 40} ${c - 80} ${c - 80} ${c - 90} -20 M ${c} ${c + 20} C ${c + 20} ${c - 40} ${c + 80} ${c - 80} ${c + 90} -20`} stroke={KC.ink} strokeWidth={70} fill="none" strokeLinecap="round" />
    <path d={`M ${c} ${r * 2 + 20} L ${c} ${c + 20} M ${c} ${c + 20} C ${c - 20} ${c - 40} ${c - 80} ${c - 80} ${c - 90} -20 M ${c} ${c + 20} C ${c + 20} ${c - 40} ${c + 80} ${c - 80} ${c + 90} -20`} stroke={SANGRE} strokeWidth={54} fill="none" strokeLinecap="round" />
    <circle cx={c} cy={c + 10} r={30 + 6 * pul} fill={KC.gold2} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2].map((i) => { const f = ((T * 1.2 + i / 3) % 1); return <circle key={i} cx={c} cy={c + 10} r={36 + f * 120} fill="none" stroke={KC.gold2} strokeWidth={6} opacity={1 - f} />; })}
  </svg>;
}

function Pararte() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const X0 = 200;                                                       // sillón
  // gancho: se para de golpe
  const pG = kprog(T, K.Gancho + 0.15, K.Gancho + 0.6, kEase.sale);
  const poseG = mixPose(POSE.sent, POSE.pie, pG); poseG.t += 30 * Math.sin(Math.PI * pG);
  const hipG = [klerp(X0, X0 + 190, pG), klerp(960, 760, pG)];
  const headG = [hipG[0] + 4, hipG[1] - 390];
  const nubla = kprog(T, K.Gancho + 0.7, K.Gancho + 1.2) * (1 - kprog(T, K.Gancho + 4.4, K.Gravedad));
  // escenas del cuerpo de frente
  const pool = kprog(T, K.Gravedad + 2.4, K.Cantidad + 2.2, kEase.suave);
  const cab = 1 - 0.75 * kprog(T, K.Presion + 0.3, K.Presion + 2.0);
  // ojos
  const blur = 9 * kprog(T, K.Ojos + 1.9, K.Ojos + 2.8);
  // corrige
  const tC = K.Corrige + 4.0, faseC = T < tC ? T * 5.5 : tC * 5.5 + (T - tC) * 10;
  // consejo
  const pS = kprog(T, K.Consejo + 1.3, K.Consejo + 2.4, kEase.suave), pP = kprog(T, K.Consejo + 3.8, K.Consejo + 5.4, kEase.suave);
  let poseC = pP > 0 ? mixPose(POSE.sent, POSE.pie, pP) : mixPose(POSE.acost, POSE.sent, pS); if (pP > 0) poseC.t += 14 * Math.sin(Math.PI * pP);
  const hipC = pP > 0 ? [klerp(560, 760, pP), klerp(930, 730, pP)] : [560, 930];
  const anillo = kprog(T, K.Consejo + 2.0, K.Consejo + 3.8);
  // cierre: elevador baja y sube
  const pEl = kprog(T, K.Cierre + 0.6, K.Cierre + 2.3, kEase.suave) * (1 - kprog(T, K.Cierre + 2.8, K.Cierre + 4.2, kEase.suave));
  const subeEl = T > K.Cierre + 2.6;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: KC.dark }}>
      {/* 0 · gancho: te paras de golpe y ves estrellitas */}
      <Escena T={T} a={K.Gancho} b={K.Gravedad}>
        <div style={{ position: 'absolute', inset: 0, filter: `blur(${nubla * 3.5}px)` }}>
          <Sala x0={X0} />
          <Lienzo><Lampara x={70} y={560} />
            <PersonaLado x={hipG[0]} y={hipG[1]} {...poseG} color={KC.blue} cara={T > K.Gancho + 0.8 ? 'mareo' : 'normal'} T={T}
              gotas={kprog(T, K.Gancho + 2.6, K.Gancho + 3.2)} piernasRojas={0.55 * kprog(T, K.Gancho + 3.0, K.Gancho + 4.5)} /></Lienzo>
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, opacity: nubla * (0.75 + 0.25 * Math.sin(T * 5)), background: 'radial-gradient(circle at 35% 30%, transparent 22%, rgba(20,10,30,.85) 75%)' }}></div>
        <Lienzo z={4}>
          {Array.from({ length: 9 }, (_, i) => { const a = i / 9 * 360 + T * 60, rr = 150 + 30 * Math.sin(T * 3 + i), e = kprog(T, K.Gancho + 0.7 + i * 0.06, K.Gancho + 1.0 + i * 0.06, kEase.rebote);
            const [sx, sy] = kadd(headG, a, rr * e); return <Estrellita key={i} x={sx} y={sy - 20} r={(22 + (i % 3) * 10) * (0.7 + 0.3 * Math.abs(Math.sin(T * 6 + i)))} color={i % 2 ? '#fff' : KC.yellow} rot={T * 90 + i * 20} o={e * (1 - kprog(T, K.Gancho + 4.6, K.Gravedad))} />; })}
        </Lienzo>
        <Etq T={T} at={K.Gancho + 3.0} until={K.Gravedad - 0.2} x={hipG[0] + 90} y={hipG[1] + 230} texto="tu sangre ↓" color={KC.texto} />
      </Escena>

      {/* 1–3 · el cuerpo de frente: la gravedad, más de medio litro, la presión baja */}
      <Escena T={T} a={K.Gravedad} b={K.Ojos} fondo={KC.cyan} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Gravedad - 0.3, K.Gravedad + 0.5, kEase.sale)) * 120})`}>
            <CuerpoFrente x={330} y={1180} s={0.95} pool={pool} cabeza={cab} T={T} gotas={kprog(T, K.Gravedad + 1.2, K.Gravedad + 1.8) * (1 - kprog(T, K.Cantidad + 2.0, K.Cantidad + 2.6))} />
          </g>
          {T < K.Cantidad + 0.2 && [0, 1, 2].map((i) => { const a = K.Gravedad + 1.2 + i * 0.35, f = ((T - a) * 0.7) % 1;
            return T > a && <FlechaRecta key={i} x1={720 + i * 110} y1={760 + (i % 2) * 60} x2={720 + i * 110} y2={1060 + (i % 2) * 60} p={kprog(T, a, a + 0.5, kEase.sale)} color={KC.yellow} />; })}
          {T > K.Gravedad + 1.2 && T < K.Cantidad + 0.2 && <TextoSvg x={830} y={735} tam={64} color={KC.yellow} s={kprog(T, K.Gravedad + 1.2, K.Gravedad + 1.6, kEase.rebote)}>GRAVEDAD</TextoSvg>}
          {T > K.Cantidad - 0.1 && T < K.Presion + 0.3 && <g opacity={kprog(T, K.Cantidad - 0.1, K.Cantidad + 0.3) * (1 - kprog(T, K.Presion, K.Presion + 0.3))}>
            <Jarra x={790} y={1100} s={1.05} nivel={kprog(T, K.Cantidad + 0.3, K.Cantidad + 2.0, kEase.sale)} T={T} />
            <TextoSvg x={760} y={560} tam={92} color={KC.yellow} s={kprog(T, K.Cantidad + 0.6, K.Cantidad + 1.0, kEase.rebote)}>MÁS DE</TextoSvg>
            <TextoSvg x={760} y={670} tam={92} color={KC.yellow} s={kprog(T, K.Cantidad + 0.8, K.Cantidad + 1.2, kEase.rebote)}>½ LITRO</TextoSvg>
          </g>}
          {T > K.Presion + 1.8 && <g transform={`scale(${kprog(T, K.Presion + 1.8, K.Presion + 2.3, kEase.rebote)})`} style={{ transformOrigin: '790px 640px' }}>
            <Manometro x={790} y={640} r={180} v={1 - 0.85 * kprog(T, K.Presion + 2.5, K.Presion + 3.5, kEase.suave)} T={T} /></g>}
        </Lienzo>
        <Etq T={T} at={K.Gravedad + 3.2} until={K.Cantidad + 2.6} x={480} y={980} texto="piernas" color={KC.ink} />
        <Etq T={T} at={K.Gravedad + 4.0} until={K.Cantidad + 2.6} x={480} y={700} texto="panza" color={KC.ink} />
        <Etq T={T} at={K.Presion + 0.5} until={K.Ojos - 0.2} x={430} y={380} texto="menos sangre arriba" color={KC.ink} />
      </Escena>

      {/* 4 · lo que ves: vista nublada, puntitos, mareo */}
      <Escena T={T} a={K.Ojos} b={K.Corrige} fondo={KC.yellow} zoom={0.08}>
        <div style={{ position: 'absolute', inset: 0, filter: `blur(${blur}px)`, transform: `rotate(${kprog(T, K.Ojos + 3.9, K.Ojos + 4.3) * 3 * Math.sin(T * 2.4)}deg) scale(1.06)` }}>
          <FondoLunares color={KC.yellow} />
          <Lienzo>
            <rect x={290} y={420} width={500} height={420} rx={14} fill="#8fd8ff" stroke={KC.ink} strokeWidth={12} />
            <Nube x={460} y={560} s={0.6} /><Nube x={660} y={700} s={0.45} />
            <line x1={540} y1={420} x2={540} y2={840} stroke={KC.ink} strokeWidth={10} /><line x1={290} y1={630} x2={790} y2={630} stroke={KC.ink} strokeWidth={10} />
            <Lampara x={150} y={760} />
            <rect x={840} y={900} width={140} height={150} rx={20} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
            {[-1, 0, 1].map((i) => <ellipse key={i} cx={910 + i * 40} cy={850} rx={28} ry={70} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 25} 910 900)`} />)}
            <rect x={0} y={1180} width={KW} height={KH - 1180} fill="#c98a4b" />
            <rect x={180} y={1000} width={720} height={260} rx={50} fill={KC.teal} stroke={KC.ink} strokeWidth={10} />
          </Lienzo>
        </div>
        <Lienzo z={5}>
          {Array.from({ length: 16 }, (_, i) => { const g = krng(30 + i), x = 80 + g() * 920, y = 380 + g() * 800, a = K.Ojos + 3.0 + i * 0.07;
            return T > a && <g key={i}><circle cx={x} cy={y} r={14 + 22 * g()} fill="#2a1840" opacity={0.55 * kprog(T, a, a + 0.3) * (0.6 + 0.4 * Math.sin(T * 7 + i))} />
              <Estrellita x={x + 40} y={y - 30} r={16} rot={T * 120 + i * 30} o={kprog(T, a, a + 0.3) * Math.abs(Math.sin(T * 5 + i))} /></g>; })}
        </Lienzo>
        <div style={{ position: 'absolute', inset: 0, zIndex: 6, opacity: kprog(T, K.Ojos + 1.9, K.Ojos + 2.8) * 0.8, background: 'radial-gradient(circle at 50% 45%, transparent 30%, rgba(20,10,30,.85) 80%)' }}></div>
        <Chip T={T} at={K.Ojos + 0.2} until={K.Corrige - 0.1} texto="cerebro y ojos" x={660} y={430} tam={40} borde={SANGRE} />
        <Chip T={T} at={K.Ojos + 2.0} until={K.Corrige - 0.1} texto="vista nublada" x={660} y={515} tam={40} borde={KC.gold} />
        <Chip T={T} at={K.Ojos + 3.0} until={K.Corrige - 0.1} texto="puntitos" x={660} y={600} tam={40} borde={KC.gold} />
        <Chip T={T} at={K.Ojos + 4.0} until={K.Corrige - 0.1} texto="mareo" x={660} y={685} tam={40} borde={KC.gold} />
      </Escena>

      {/* 5 · por dentro: sensores del cuello, corazón más rápido, vasos que se aprietan */}
      <Escena T={T} a={K.Corrige} b={K.Pregunta} fondo={KC.noche}>
        <Ambiente T={T} n={22} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g opacity={1 - kprog(T, K.Corrige + 3.7, K.Corrige + 4.2)}>
            <g transform="translate(330 700) scale(1.3)">
              <path d="M -170 330 C -170 260 -120 230 -40 225 L 90 225 C 170 230 220 260 220 330 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
            </g>
            <CabezaPerfil x={330} y={700} s={1.3} />
            <g transform="translate(330 700) scale(1.3)" opacity={0.95}>
              <path d="M 20 330 L 20 205 M 20 205 C 12 185 8 170 6 150 M 20 205 C 30 185 36 170 40 150" stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" />
              <path d="M 20 330 L 20 205 M 20 205 C 12 185 8 170 6 150 M 20 205 C 30 185 36 170 40 150" stroke={SANGRE} strokeWidth={16} fill="none" strokeLinecap="round" />
              <circle cx={20} cy={203} r={14 + 3 * Math.sin(T * 8)} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Corrige + 1.4, K.Corrige + 1.8)} />
            </g>
          </g>
          {T > K.Corrige + 3.8 && <g opacity={kprog(T, K.Corrige + 3.8, K.Corrige + 4.3)}><Corazon x={290} y={760} s={1.25} fase={faseC} /></g>}
          {T > K.Corrige + 5.3 && <g opacity={kprog(T, K.Corrige + 5.3, K.Corrige + 5.7)}><Vaso x={800} y={730} T={T} apriete={kprog(T, K.Corrige + 5.6, K.Corrige + 6.6, kEase.suave)} /></g>}
          {T > K.Corrige + 6.2 && <g transform={`scale(${kprog(T, K.Corrige + 6.2, K.Corrige + 6.6, kEase.rebote)})`} style={{ transformOrigin: '540px 470px' }}>
            <Manometro x={540} y={470} r={120} v={klerp(0.15, 1, kprog(T, K.Corrige + 6.5, K.Pregunta - 0.1, kEase.sale))} T={T} /></g>}
        </Lienzo>
        <Lupa T={T} at={K.Corrige + 1.5} until={K.Corrige + 3.7} x={790} y={560} r={180} fx={356} fy={964} tinte={KC.gold2} etiqueta="POR DENTRO · CUELLO" interior={(t, r) => <Carotida r={r} T={t} />} />
        <Chip T={T} at={K.Corrige + 1.4} until={K.Corrige + 3.7} texto="sensores del cuello" x={480} y={420} tam={40} borde={KC.gold2} />
        <Chip T={T} at={K.Corrige + 4.1} until={K.Pregunta - 0.1} texto="corazón más rápido" x={290} y={1060} tam={34} borde={SANGRE} />
        <Chip T={T} at={K.Corrige + 5.6} until={K.Pregunta - 0.1} texto="vasos que se aprietan" x={800} y={1060} tam={34} borde={KC.gold2} />
      </Escena>

      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Factores} />

      {/* 7 · factores: deshidratación, calor, mucho rato acostado */}
      <Escena T={T} a={K.Factores} b={K.Nombre} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Tarjeta x={190} y={760} e={kprog(T, K.Factores + 0.5, K.Factores + 0.9, kEase.rebote)}><VasoVacio x={0} y={0} s={1} /></Tarjeta>
          <Tarjeta x={540} y={760} e={kprog(T, K.Factores + 1.7, K.Factores + 2.1, kEase.rebote)}><SolDibujo x={0} y={0} r={80} T={T} /></Tarjeta>
          <Tarjeta x={890} y={760} e={kprog(T, K.Factores + 2.9, K.Factores + 3.3, kEase.rebote)}><Cama x={0} y={40} s={0.95} T={T} /></Tarjeta>
          {[[190, 'deshidratación', 0.7], [540, 'calor', 1.9], [875, 'mucho rato acostado', 3.1]].map(([x, t, d]) => <text key={t} x={x} y={975} textAnchor="middle" opacity={kprog(T, K.Factores + d, K.Factores + d + 0.3)}
            style={{ font: `700 26px ${KF.mono}` }} fill={KC.ink}>{t}</text>)}
          {T > K.Factores + 4.0 && <g transform={`scale(${kprog(T, K.Factores + 4.0, K.Factores + 4.4, kEase.rebote)})`} style={{ transformOrigin: '540px 470px' }}>
            <Manometro x={540} y={470} r={120} v={0.2 + 0.25 * kprog(T, K.Factores + 4.4, K.Nombre, kEase.suave)} T={T} tiembla={1} /></g>}
        </Lienzo>
        <Chip T={T} at={K.Factores + 4.0} until={K.Nombre - 0.1} texto="a tu cuerpo le cuesta más corregirlo" x={540} y={1110} tam={34} borde={KC.ink} />
      </Escena>

      {/* 8 · el nombre */}
      <Escena T={T} a={K.Nombre} b={K.Medico} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform={`scale(${kprog(T, K.Nombre + 0.1, K.Nombre + 0.5, kEase.rebote)})`} style={{ transformOrigin: '540px 600px' }}>
            <Manometro x={540} y={600} r={190} v={klerp(1, 0.04, kprog(T, K.Nombre + 0.6, K.Nombre + 1.8, kEase.suave))} T={T} tiembla={kprog(T, K.Nombre + 1.8, K.Nombre + 2.2)} /></g>
          <TextoSvg x={540} y={870} tam={124} color={KC.yellow} s={kprog(T, K.Nombre + 2.4, K.Nombre + 2.8, kEase.rebote)}>HIPOTENSIÓN</TextoSvg>
          <TextoSvg x={540} y={995} tam={124} color={KC.yellow} s={kprog(T, K.Nombre + 2.7, K.Nombre + 3.1, kEase.rebote)}>ORTOSTÁTICA</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Nombre + 0.8} until={K.Medico - 0.1} texto="baja de más al pararte" x={540} y={1105} tam={36} borde={KC.red} />
      </Escena>

      {/* 9 · cuándo ir al médico */}
      <Escena T={T} a={K.Medico} b={K.Consejo} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g opacity={kprog(T, K.Medico + 0.3, K.Medico + 0.6)}><Repite x={520} y={560} s={1.1} T={T} /></g>
          <g opacity={kprog(T, K.Medico + 1.4, K.Medico + 1.7)}>
            <rect x={640} y={690} width={420} height={30} rx={14} fill="rgba(0,0,0,.18)" />
            <PersonaLado x={880} y={660} s={0.42} {...POSE.acost} color={KC.blue} cara="mareo" T={T} />
            {[0, 1, 2].map((i) => <Estrellita key={i} x={760 + i * 40} y={560 - (i % 2) * 30} r={18} color={KC.yellow} rot={T * 100 + i * 30} />)}
          </g>
          <TextoSvg x={720} y={620} tam={70} color={KC.ink} o={kprog(T, K.Medico + 0.9, K.Medico + 1.2)}>o</TextoSvg>
          <FlechaRecta x1={540} y1={770} x2={540} y2={850} p={kprog(T, K.Medico + 2.0, K.Medico + 2.3)} color={KC.red} />
          <g transform={`scale(${kprog(T, K.Medico + 2.2, K.Medico + 2.6, kEase.rebote)})`} style={{ transformOrigin: '540px 960px' }}><CruzMedica x={540} y={960} s={0.75} /></g>
        </Lienzo>
        <Chip T={T} at={K.Medico + 0.4} until={K.Consejo - 0.1} texto="muy seguido o desmayos → médico" x={540} y={1100} tam={36} borde={KC.red} />
      </Escena>

      {/* 10 · el truco: de acostado, primero sentado (~20 s) y luego de pie despacio */}
      <Escena T={T} a={K.Consejo} b={K.Cierre} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill="#c98a4b" /><line x1={0} y1={1150} x2={KW} y2={1150} stroke={KC.ink} strokeWidth={10} />
          <rect x={30} y={800} width={44} height={350} rx={12} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
          <rect x={60} y={1040} width={30} height={110} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} /><rect x={960} y={1040} width={30} height={110} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
          <rect x={60} y={975} width={950} height={75} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={9} />
          <rect x={90} y={935} width={170} height={52} rx={22} fill="#dfe8ff" stroke={KC.ink} strokeWidth={7} />
          <PersonaLado x={hipC[0]} y={hipC[1]} {...poseC} color={KC.pink} cara={pP > 0.9 ? 'sonrie' : 'normal'} T={T} />
          {anillo > 0 && <g transform="translate(320 690)" opacity={1 - kprog(T, K.Consejo + 4.6, K.Consejo + 5.0)}>
            <circle r={84} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            <path d={arco(0, 0, 66, -90, -90 + 359.9 * anillo)} stroke={KC.gold2} strokeWidth={18} fill="none" strokeLinecap="round" />
            <text y={16} textAnchor="middle" style={{ font: `400 50px ${KF.titulo}` }} fill={KC.texto}>~20 s</text>
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Consejo + 1.3} until={K.Cierre - 0.1} texto="1 · siéntate ~20 s" x={330} y={430} tam={38} borde={KC.gold2} />
        <Chip T={T} at={K.Consejo + 3.8} until={K.Cierre - 0.1} texto="2 · párate despacio" x={350} y={520} tam={38} borde={KC.mint} />
      </Escena>

      {/* 11 · cierre: la misma sala; la sangre baja en elevador y regresa */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <Sala x0={X0} />
        <Lienzo>
          <Lampara x={70} y={560} />
          <PersonaLado x={X0 + 190} y={760} {...POSE.pie} color={KC.blue} cara={subeEl ? 'sonrie' : 'normal'} T={T} />
          {Array.from({ length: 7 }, (_, i) => { const a = i / 7 * 360 + T * 60, o = kprog(T, K.Cierre + 0.1, K.Cierre + 0.4) * (1 - kprog(T, K.Cierre + 1.6, K.Cierre + 2.2));
            const [sx, sy] = kadd([X0 + 194, 350], a, 150); return <Estrellita key={i} x={sx} y={sy + kprog(T, K.Cierre + 0.8, K.Cierre + 2.2) * 500} r={24} color={i % 2 ? '#fff' : KC.yellow} rot={T * 90} o={o} />; })}
          <g opacity={kprog(T, K.Cierre + 0.3, K.Cierre + 0.7)}><Elevador x={800} y0={620} y1={1150} p={pEl} sube={subeEl} /></g>
          <text x={940} y={650} style={{ font: `700 28px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Cierre + 0.5, K.Cierre + 0.9)}>cabeza</text>
          <text x={940} y={1130} style={{ font: `700 28px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Cierre + 0.5, K.Cierre + 0.9)}>pies</text>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.5} until={K.Outro - 0.1} texto="tu sangre en elevador" x={700} y={485} tam={38} borde={SANGRE} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Gravedad - 0.1} texto="Te paras y *ves estrellitas.*" />
      <Subtitulo T={T} idx={1} at={K.Gravedad + 0.1} until={K.Cantidad - 0.1} texto="La gravedad la jala *hacia abajo.*" />
      <Subtitulo T={T} idx={2} at={K.Cantidad + 0.1} until={K.Presion - 0.1} texto="*Más de medio litro* se acumula." />
      <Subtitulo T={T} idx={3} at={K.Presion + 0.1} until={K.Ojos - 0.1} texto="Menos sangre arriba: *baja la presión.*" />
      <Subtitulo T={T} idx={4} at={K.Ojos + 0.1} until={K.Corrige - 0.1} texto="Vista nublada, *puntitos y mareo.*" />
      <Subtitulo T={T} idx={5} at={K.Corrige + 0.1} until={K.Pregunta - 0.1} texto="Sensores del cuello: *tu cuerpo corrige.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Factores - 0.1} texto="¿Por qué a veces *es peor?*" />
      <Subtitulo T={T} idx={7} at={K.Factores + 0.1} until={K.Nombre - 0.1} texto="Sin agua, calor o cama: *cuesta más.*" />
      <Subtitulo T={T} idx={8} at={K.Nombre + 0.1} until={K.Medico - 0.1} texto="Se llama *hipotensión ortostática.*" />
      <Subtitulo T={T} idx={9} at={K.Medico + 0.1} until={K.Consejo - 0.1} texto="Muy seguido o desmayos: *al médico.*" />
      <Subtitulo T={T} idx={10} at={K.Consejo + 0.1} until={K.Cierre - 0.1} texto="Siéntate ~20 s y *párate despacio.*" />
      <Subtitulo T={T} idx={11} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Es tu sangre *en elevador.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [K.Gravedad + 0.6, K.Gravedad + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Presion + 0.4, K.Ojos - 0.3, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Ojos + 1.6, K.Corrige - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Pregunta - 0.2, K.Factores + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Factores + 2.6, K.Nombre - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Medico + 0.3, K.Consejo - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="51" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function PararteApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pararte /></CompositionStage></div>;
}
window.PararteApp = PararteApp;
