// Shot Científico #29 · El espejo no te invierte izquierda y derecha — NARRADO (N3 capítulos + participación).
// Física del espejo plano: invierte la dirección perpendicular a su superficie (adelante-atrás). Ver guion.md y verificacion.md.
// Dibujo esquemático. Reglas del dibujo (para que la física quede bien):
//  · Vista de frente al espejo: la mano derecha de la persona (de espaldas, punto rojo) y la mano que levanta el reflejo quedan
//    del MISMO lado de la pantalla, justo enfrente (un espejo plano frente a la cámara conserva x e y; solo cambia la profundidad).
//  · Vista desde arriba: el espejo solo voltea adelante-atrás; la nariz apunta al espejo y la del reflejo hacia ti.
//  · Dos espejos a 90° con unión vertical: el punto rojo del reflejo queda del lado CONTRARIO al de la persona.
const EROJO = '#ff1f3d', EVIDRIO = '#cfefff', EVIDRIO2 = '#9fd8f2', EMARCO = '#8a5a2b';
const ES = { mx1: 90, mx2: 770, my1: 540, my2: 1215 };          // marco del espejo (escena principal)
const REF = { x: 520, pies: 1190, alto: 500 };                  // reflejo (de frente, dentro del espejo)
const PER = { x: 190, pies: 1960, alto: 1000 };                 // tú (de espaldas, en primer plano)

// Persona de cuerpo completo. vista 'frente' | 'espalda'. (x, pies) en px, alto en px.
// brazoD / brazoI: cuánto sube el brazo del lado DERECHO / IZQUIERDO DE LA PANTALLA (0 abajo … 1 arriba).
// punto: 'D' | 'I' = punto rojo en la mano de ese lado de la pantalla. guino: 'D' | 'I' = ojo cerrado de ese lado (vista frente).
function brazoAng(lado, r) { return lado === 'D' ? -(18 + 150 * r) : (18 + 150 * r); }
function manoPos(lado, r) {   // posición local (alto 600) de la mano
  const a = brazoAng(lado, r) * Math.PI / 180, sx = lado === 'D' ? 112 : -112, sy = -452, L = 196;
  return [sx - Math.sin(a) * L, sy + Math.cos(a) * L];
}
function Figura({ x = 0, pies = 0, alto = 600, vista = 'frente', brazoD = 0, brazoI = 0, punto, guino, color = KC.pink, cara = 'sonrie', o = 1, T = 0, sx = 1 }) {
  const k = alto / 600, cy = -540;
  const brazo = (lado, r) => { const a = brazoAng(lado, r), bx = lado === 'D' ? 112 : -112;
    return <g transform={`rotate(${a} ${bx} -452)`}>
      <rect x={bx - 30} y={-470} width={60} height={196} rx={28} fill={color} stroke={KC.ink} strokeWidth={8} />
      <circle cx={bx} cy={-262} r={34} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    </g>; };
  const dot = (lado, r) => { const [hx, hy] = manoPos(lado, r);
    return <g><circle cx={hx} cy={hy} r={30} fill={EROJO} stroke={KC.ink} strokeWidth={7} /><circle cx={hx - 9} cy={hy - 9} r={8} fill="#fff" opacity=".7" /></g>; };
  const resp = 1 + 0.012 * Math.sin(T * 2.2);
  return <g transform={`translate(${x} ${pies}) scale(${k * sx} ${k * resp})`} opacity={o}>
    <rect x={-74} y={-240} width={64} height={240} rx={26} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    <rect x={10} y={-240} width={64} height={240} rx={26} fill="#3a3f5c" stroke={KC.ink} strokeWidth={8} />
    {brazo('I', brazoI)}{brazo('D', brazoD)}
    <rect x={-96} y={-480} width={192} height={260} rx={46} fill={color} stroke={KC.ink} strokeWidth={8} />
    {vista === 'espalda' && <path d="M -40 -478 Q 0 -455 40 -478" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />}
    {vista === 'frente' && <path d="M -36 -480 L 0 -446 L 36 -480" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinejoin="round" />}
    {punto === 'D' && dot('D', brazoD)}{punto === 'I' && dot('I', brazoI)}
    {/* cabeza */}
    <ellipse cx={-64} cy={cy + 6} rx={14} ry={20} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={64} cy={cy + 6} rx={14} ry={20} fill={CPIEL} stroke={KC.ink} strokeWidth={6} />
    {vista === 'espalda'
      ? <g><circle cx={0} cy={cy} r={64} fill={CPELO} stroke={KC.ink} strokeWidth={8} />
          <path d={`M -30 ${cy - 30} Q 0 ${cy - 10} 26 ${cy - 34}`} stroke="#4a3528" strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d={`M -44 ${cy + 40} Q 0 ${cy + 66} 44 ${cy + 40}`} stroke={CPIEL2} strokeWidth={8} fill="none" strokeLinecap="round" /></g>
      : <g><circle cx={0} cy={cy} r={62} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
          <path d={`M -62 ${cy - 10} Q -60 ${cy - 75} 0 ${cy - 72} Q 60 ${cy - 75} 62 ${cy - 10} Q 30 ${cy - 40} -62 ${cy - 10} Z`} fill={CPELO} stroke={KC.ink} strokeWidth={6} />
          {guino === 'I' ? <path d={`M -32 ${cy + 2} Q -22 ${cy + 10} -12 ${cy + 2}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /> : <circle cx={-22} cy={cy + 2} r={8} fill={KC.ink} />}
          {guino === 'D' ? <path d={`M 12 ${cy + 2} Q 22 ${cy + 10} 32 ${cy + 2}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /> : <circle cx={22} cy={cy + 2} r={8} fill={KC.ink} />}
          <path d={cara === 'sonrie' ? `M -22 ${cy + 26} Q 0 ${cy + 44} 22 ${cy + 26}` : cara === 'o' ? `M -9 ${cy + 32} a 9 11 0 1 0 18 0 a 9 11 0 1 0 -18 0` : `M -20 ${cy + 32} L 20 ${cy + 32}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /></g>}
  </g>;
}
// Punto de la mano en coordenadas de pantalla.
function manoPantalla(f, lado, r) { const [hx, hy] = manoPos(lado, r), k = f.alto / 600; return [f.x + hx * k, f.pies + hy * k]; }

// Espejo de pared con vidrio y un brillo que barre.
function EspejoPared({ T, x1, y1, x2, y2, children, id = 'ep' }) {
  const w = x2 - x1, h = y2 - y1, b = ((T * 0.35) % 1.6) - 0.3;
  return <g>
    <defs><clipPath id={id}><rect x={x1} y={y1} width={w} height={h} rx={18} /></clipPath>
      <linearGradient id={id + 'g'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={EVIDRIO} /><stop offset="1" stopColor={EVIDRIO2} /></linearGradient></defs>
    <rect x={x1 - 26} y={y1 - 26} width={w + 52} height={h + 52} rx={30} fill={EMARCO} stroke={KC.ink} strokeWidth={10} />
    <rect x={x1} y={y1} width={w} height={h} rx={18} fill={`url(#${id}g)`} stroke={KC.ink} strokeWidth={7} />
    <g clipPath={`url(#${id})`}>
      <rect x={x1} y={y2 - h * 0.2} width={w} height={h * 0.2} fill="#8fc3dc" opacity=".55" />
      {children}
      <path d={`M ${x1 + w * b} ${y1} l 90 0 l ${-h * 0.5} ${h} l -90 0 Z`} fill="#fff" opacity=".28" />
      <path d={`M ${x1 + w * b + 130} ${y1} l 30 0 l ${-h * 0.5} ${h} l -30 0 Z`} fill="#fff" opacity=".22" />
    </g>
  </g>;
}
// Flecha doble (↔) gruesa.
function FlechaDoble({ x1, y1, x2, y2, p = 1, color = KC.yellow, grosor = 14 }) {
  if (p <= 0.01) return null;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return <g><FlechaRecta x1={mx} y1={my} x2={klerp(mx, x2, 1)} y2={klerp(my, y2, 1)} p={p} color={color} grosor={grosor} />
    <FlechaRecta x1={mx} y1={my} x2={x1} y2={y1} p={p} color={color} grosor={grosor} /></g>;
}
// Palomita en círculo.
function Palomita({ x, y, s = 1, p = 1 }) {
  if (p <= 0.01) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, p)})`} opacity={Math.min(1, p * 2)}>
    <circle r={90} fill={KC.mint} stroke={KC.ink} strokeWidth={10} />
    <path d="M -44 2 L -12 36 L 48 -34" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -44 2 L -12 36 L 48 -34" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Línea punteada entre dos puntos (une los puntos rojos).
function Punteada({ a, b, p = 1, color = '#fff' }) {
  if (p <= 0.01) return null;
  const x2 = klerp(a[0], b[0], p), y2 = klerp(a[1], b[1], p);
  return <g><line x1={a[0]} y1={a[1]} x2={x2} y2={y2} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" strokeDasharray="4 26" />
    <line x1={a[0]} y1={a[1]} x2={x2} y2={y2} stroke={color} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 26" /></g>;
}

// Persona vista desde arriba. Mira hacia `dir` (-1 = arriba de la pantalla, 1 = abajo). punto: lado de pantalla 'D'|'I'.
function PersonaArriba({ x, y, dir = -1, s = 1, color = KC.pink, punto = 'D', o = 1, fantasma = false, T = 0 }) {
  const ny = dir * 78;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={170} ry={62} fill={color} stroke={KC.ink} strokeWidth={9} strokeDasharray={fantasma ? '22 14' : undefined} />
    {[-1, 1].map((l) => { const hx = l * 190, hy = dir * 52;
      return <g key={l}><line x1={l * 150} y1={0} x2={hx} y2={hy} stroke={KC.ink} strokeWidth={42} strokeLinecap="round" /><line x1={l * 150} y1={0} x2={hx} y2={hy} stroke={color} strokeWidth={28} strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={28} fill={(punto === 'D' && l === 1) || (punto === 'I' && l === -1) ? EROJO : CPIEL} stroke={KC.ink} strokeWidth={7} /></g>; })}
    <path d={`M -16 ${dir * 50} L 0 ${ny + dir * 22} L 16 ${dir * 50} Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={0} cy={0} r={64} fill={CPELO} stroke={KC.ink} strokeWidth={8} />
    <path d={`M -30 ${-dir * 10} Q 0 ${dir * 20} 30 ${-dir * 10}`} stroke="#4a3528" strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>;
}

// Hoja con letras. cara: 'texto' | 'atras'. sx = escala horizontal (giro).
function Hoja({ x, y, w = 360, h = 250, cara = 'texto', sx = 1, palabra = 'HOLA', manos = false }) {
  return <g transform={`translate(${x} ${y}) scale(${sx} 1)`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={cara === 'texto' ? '#fffdf5' : '#e9e3d4'} stroke={KC.ink} strokeWidth={8} />
    {cara === 'texto' && <text x={0} y={h * 0.2} textAnchor="middle" style={{ font:`400 ${h * 0.55}px ${KF.titulo}` }} fill={KC.blue}>{palabra}</text>}
    {manos && <><circle cx={-w / 2 + 6} cy={h / 2 - 20} r={34} fill={CPIEL} stroke={KC.ink} strokeWidth={7} /><circle cx={w / 2 - 6} cy={h / 2 - 20} r={34} fill={CPIEL} stroke={KC.ink} strokeWidth={7} /></>}
  </g>;
}

// Frente de ambulancia. El nombre va escrito AL REVÉS (como en las ambulancias reales).
function AmbFrente({ x, y, s = 1, T = 0 }) {
  const luz = Math.sin(T * 14) > 0;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-280} width={660} height={480} rx={46} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <rect x={-250} y={-330} width={110} height={56} rx={18} fill={luz ? KC.red : '#7a1a1a'} stroke={KC.ink} strokeWidth={8} />
    <rect x={140} y={-330} width={110} height={56} rx={18} fill={!luz ? KC.blue : '#1a2a6a'} stroke={KC.ink} strokeWidth={8} />
    {luz && <circle cx={-195} cy={-302} r={90} fill={KC.red} opacity=".25" />}
    {!luz && <circle cx={195} cy={-302} r={90} fill={KC.blue} opacity=".25" />}
    <rect x={-300} y={-250} width={600} height={92} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-178} textAnchor="middle" transform="scale(-1 1)" style={{ font:`400 82px ${KF.titulo}`, letterSpacing:'.04em' }} fill={KC.red}>AMBULANCIA</text>
    <path d="M -290 -140 L 290 -140 L 270 20 L -270 20 Z" fill="#2b3a67" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -200 -120 L -120 -120 L -220 0 L -260 0 Z" fill="#fff" opacity=".25" />
    <rect x={-330} y={40} width={660} height={40} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={100} width={240} height={70} rx={12} fill="#cfd6e0" stroke={KC.ink} strokeWidth={7} />
    {[-1, 1].map((l) => <circle key={l} cx={l * 250} cy={135} r={40} fill="#ffe9a8" stroke={KC.ink} strokeWidth={8} />)}
    <rect x={-300} y={200} width={90} height={70} rx={16} fill={KC.ink} /><rect x={210} y={200} width={90} height={70} rx={16} fill={KC.ink} />
  </g>;
}

// Escena principal: tú (de espaldas) frente al espejo con tu reflejo (de frente).
function CuartoEspejo({ T, brazo = 0, punto = false, refColor = KC.pink }) {
  return <Lienzo>
    <rect x={0} y={1235} width={KW} height={KH - 1235} fill="rgba(0,0,0,.12)" />
    <EspejoPared T={T} x1={ES.mx1} y1={ES.my1} x2={ES.mx2} y2={ES.my2} id="ep1">
      <Figura T={T} x={REF.x} pies={REF.pies} alto={REF.alto} vista="frente" brazoD={brazo} punto={punto ? 'D' : null} color={refColor} cara={brazo > 0.5 ? 'sonrie' : 'normal'} />
    </EspejoPared>
    <Figura T={T} x={PER.x} pies={PER.pies} alto={PER.alto} vista="espalda" brazoD={brazo} punto={punto ? 'D' : null} color={KC.pink} />
  </Lienzo>;
}

function Espejo() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // mano: sube al mismo tiempo en ti y en tu reflejo
  const subeMano = kprog(T, K.Mano + 0.4, K.Mano + 1.2, kEase.rebote);
  const brazoMano = T < K.Arriba ? subeMano : 1 - kprog(T, K.Arriba - 0.1, K.Arriba + 0.5, kEase.suave);
  const mP = manoPantalla(PER, 'D', 1), mR = manoPantalla(REF, 'D', 1);
  // giro de la "otra persona"
  const giro = kprog(T, K.Girar + 2.0, K.Girar + 3.6, kEase.suave), cg = Math.cos(giro * Math.PI);
  // hoja que se voltea hacia el espejo
  const gh = kprog(T, K.Texto + 1.5, K.Texto + 2.5, kEase.suave), ch = Math.cos(gh * Math.PI);
  // dos espejos
  const subeDos = kprog(T, K.Dos + 2.2, K.Dos + 3.0, kEase.rebote);
  const REF2 = { x: 540, pies: 1160, alto: 500 }, PER2 = { x: 850, pies: 1960, alto: 900 };
  const mP2 = manoPantalla(PER2, 'D', subeDos), mR2 = manoPantalla(REF2, 'I', subeDos);
  const guina = T > K.Dos + 4.2 && ((T - K.Dos - 4.2) % 1.4) < 0.7;
  // cierre
  const brazoC = kprog(T, K.Cierre + 0.3, K.Cierre + 1.0, kEase.rebote) * (0.85 + 0.15 * Math.sin(T * 6));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0–2 · gancho, la mano y arriba-abajo: una sola escena frente al espejo */}
      <Escena T={T} a={K.Gancho} b={K.Frente} zoom={0.06} origen="40% 50%">
        <FondoLunares color={KC.pink} />
        <CuartoEspejo T={T} brazo={brazoMano} punto={T > K.Mano + 0.3} />
        <Lienzo z={3}>
          {/* gancho: el eje que sí se invierte, adelante ⇄ atrás (perpendicular al espejo) */}
          {T < K.Mano + 0.3 && <g opacity={1 - kprog(T, K.Mano - 0.1, K.Mano + 0.3)}>
            <FlechaDoble x1={PER.x + 40} y1={1080} x2={REF.x - 30} y2={830} p={kprog(T, K.Gancho + 2.4, K.Gancho + 3.1, kEase.sale)} color={KC.yellow} grosor={18} />
            <FlechaDoble x1={150} y1={1150} x2={720} y2={1150} p={kprog(T, K.Gancho + 0.2, K.Gancho + 0.8, kEase.sale)} color="#fff" grosor={12} />
            {T > K.Gancho + 1.7 && <g opacity={kprog(T, K.Gancho + 1.7, K.Gancho + 2.0)}><line x1={380} y1={1100} x2={490} y2={1200} stroke={KC.red} strokeWidth={20} strokeLinecap="round" /><line x1={490} y1={1100} x2={380} y2={1200} stroke={KC.red} strokeWidth={20} strokeLinecap="round" /></g>}
          </g>}
          {/* la mano: los dos puntos rojos, del mismo lado de la pantalla */}
          {T > K.Mano + 2.6 && T < K.Arriba && <Punteada a={mP} b={mR} p={kprog(T, K.Mano + 2.6, K.Mano + 3.3, kEase.sale)} />}
          {/* arriba-abajo: igual en los dos */}
          {T > K.Arriba && T < K.Frente + 0.3 && <g>
            <FlechaRecta x1={REF.x + 140} y1={760} x2={REF.x + 140} y2={640} p={kprog(T, K.Arriba + 0.4, K.Arriba + 0.9, kEase.sale)} color={KC.yellow} />
            <FlechaRecta x1={REF.x + 140} y1={1080} x2={REF.x + 140} y2={1190} p={kprog(T, K.Arriba + 1.4, K.Arriba + 1.9, kEase.sale)} color={KC.cyan} />
            <FlechaRecta x1={PER.x + 230} y1={1120} x2={PER.x + 230} y2={960} p={kprog(T, K.Arriba + 0.4, K.Arriba + 0.9, kEase.sale)} color={KC.yellow} />
            <FlechaRecta x1={PER.x + 230} y1={1500} x2={PER.x + 230} y2={1700} p={kprog(T, K.Arriba + 1.4, K.Arriba + 1.9, kEase.sale)} color={KC.cyan} />
            <Palomita x={900} y={880} p={kprog(T, K.Arriba + 2.6, K.Arriba + 3.1, kEase.rebote)} />
          </g>}
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 0.15} tacharEn={K.Gancho + 1.7} until={K.Gancho + 2.3} texto="izquierda ⇄ derecha" x={330} y={455} tam={44} />
        <Chip T={T} at={K.Gancho + 2.6} until={K.Mano + 0.2} texto="adelante ⇄ atrás" x={330} y={455} tam={46} borde={KC.yellow} />
        <Etq T={T} at={K.Mano + 1.2} until={K.Arriba - 0.2} x={mP[0] + 50} y={mP[1] + 20} texto="tu mano derecha" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Mano + 1.8} until={K.Arriba - 0.2} x={mR[0] + 40} y={mR[1] - 10} texto="tu reflejo" lado="der" color={KC.texto} tam={30} />
        <Chip T={T} at={K.Mano + 3.0} until={K.Arriba - 0.1} texto="¡del mismo lado!" x={540} y={455} tam={46} borde={EROJO} />
        <Chip T={T} at={K.Arriba + 0.5} until={K.Frente - 0.1} texto="arriba sigue arriba" x={540} y={455} tam={44} borde={KC.yellow} />
        <Etq T={T} at={K.Arriba + 0.6} until={K.Frente - 0.2} x={REF.x + 175} y={650} texto="cabeza" lado="der" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Arriba + 1.5} until={K.Frente - 0.2} x={REF.x + 175} y={1170} texto="pies" lado="der" color={KC.texto} tam={30} />
      </Escena>

      {/* 3 · vista desde arriba: lo que se invierte es adelante-atrás */}
      <Escena T={T} a={K.Frente} b={K.Pregunta} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          {/* el reflejo (imagen detrás del espejo) */}
          <rect x={60} y={560} width={960} height={250} rx={30} fill="rgba(255,255,255,.18)" />
          <PersonaArriba T={T} x={540} y={600} dir={1} s={kprog(T, K.Frente + 0.3, K.Frente + 0.8, kEase.rebote)} color="#ff7fae" punto="D" fantasma />
          {/* el espejo, de canto */}
          <rect x={80} y={812} width={920} height={34} rx={8} fill={EVIDRIO} stroke={KC.ink} strokeWidth={8} />
          <rect x={80} y={798} width={920} height={16} rx={6} fill="#5b6475" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 10 }, (_, i) => <line key={i} x1={110 + i * 92} y1={800} x2={140 + i * 92} y2={784} stroke={KC.ink} strokeWidth={5} />)}
          <PersonaArriba T={T} x={540} y={1090} dir={-1} color={KC.pink} punto="D" />
          <FlechaRecta x1={540} y1={980} x2={540} y2={880} p={kprog(T, K.Frente + 1.2, K.Frente + 1.8, kEase.sale)} color={KC.yellow} grosor={16} />
          <FlechaRecta x1={540} y1={710} x2={540} y2={790} p={kprog(T, K.Frente + 3.2, K.Frente + 3.8, kEase.sale)} color={KC.yellow} grosor={16} />
          <Punteada a={[730, 1142]} b={[730, 652]} p={kprog(T, K.Frente + 4.6, K.Frente + 5.4, kEase.sale)} />
        </Lienzo>
        <Chip T={T} at={K.Frente + 0.1} until={K.Pregunta - 0.1} texto="VISTA DESDE ARRIBA" x={540} y={440} tam={40} borde={KC.ink} mono />
        <Etq T={T} at={K.Frente + 0.9} until={K.Pregunta - 0.2} x={300} y={1080} texto="tú" lado="izq" color={KC.ink} tam={40} />
        <Etq T={T} at={K.Frente + 2.6} until={K.Pregunta - 0.2} x={300} y={600} texto="tu reflejo" lado="izq" color={KC.ink} tam={36} />
        <Etq T={T} at={K.Frente + 1.4} until={K.Pregunta - 0.2} x={575} y={935} texto="tu nariz → espejo" lado="der" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Frente + 3.4} until={K.Pregunta - 0.2} x={575} y={740} texto="su nariz → tú" lado="der" color={KC.ink} tam={32} />
      </Escena>

      {/* 4 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Girar} />

      {/* 5 · si fuera otra persona que se da la vuelta */}
      <Escena T={T} a={K.Girar} b={K.Texto} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {/* otra persona que se voltea para verte (gira sobre sí misma) */}
          <ellipse cx={360} cy={1180} rx={190} ry={40} fill="rgba(0,0,0,.15)" />
          {giro > 0 && giro < 1 && <path d="M 170 900 A 190 60 0 1 0 550 900" fill="none" stroke={KC.ink} strokeWidth={12} strokeDasharray="20 16" opacity={Math.sin(giro * Math.PI)} />}
          <Figura T={T} x={360} pies={1180} alto={560} vista={cg >= 0 ? 'espalda' : 'frente'} sx={Math.abs(cg) < 0.06 ? 0.06 * Math.sign(cg || 1) : cg} brazoD={1} punto="D" color={KC.orange} cara="sonrie" />
          {/* tu reflejo, para comparar: su mano levantada sigue de tu lado */}
          <EspejoPared T={T} x1={700} y1={760} x2={1000} y2={1180} id="ep2">
            <Figura T={T} x={850} pies={1170} alto={340} vista="frente" brazoD={1} punto="D" color={KC.pink} />
          </EspejoPared>
        </Lienzo>
        <Chip T={T} at={K.Girar + 0.3} until={K.Texto - 0.1} texto="si fuera otra persona…" x={540} y={445} tam={44} borde={KC.orange} />
        <Etq T={T} at={K.Girar + 0.8} until={K.Girar + 2.0} x={460} y={690} texto="de espaldas" lado="der" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Girar + 3.9} until={K.Texto - 0.2} x={210} y={640} texto="su derecha" lado="der" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Girar + 1.0} until={K.Texto - 0.2} x={850} y={700} texto="tu reflejo" lado="der" color={KC.ink} tam={30} />
      </Escena>

      {/* 6 · las letras: la hoja mira al espejo, no a ti */}
      <Escena T={T} a={K.Texto} b={K.Ambulancia} fondo={KC.yellow} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <EspejoPared T={T} x1={150} y1={540} x2={930} y2={1210} id="ep3">
            {/* en el espejo se ve la cara de la hoja que mira hacia él, con x e y iguales */}
            <Hoja x={640} y={830} w={300} h={210} cara={ch > 0 ? 'atras' : 'texto'} sx={Math.max(0.04, Math.abs(ch)) * (ch > 0 ? 1 : -1)} />
          </EspejoPared>
          <Hoja x={400} y={1060} w={440} h={300} cara={ch > 0 ? 'texto' : 'atras'} sx={Math.max(0.04, Math.abs(ch)) * (ch > 0 ? 1 : -1)} manos />
        </Lienzo>
        <Chip T={T} at={K.Texto + 2.7} until={K.Ambulancia - 0.1} texto="la hoja mira al espejo" x={540} y={445} tam={44} borde={KC.blue} />
        <Etq T={T} at={K.Texto + 2.9} until={K.Ambulancia - 0.2} x={800} y={720} texto="al revés" lado="der" color={KC.ink} tam={34} />
      </Escena>

      {/* 7 · ambulancia: al revés en el frente, derecha en el retrovisor */}
      <Escena T={T} a={K.Ambulancia} b={K.Dos} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Ambulancia + 0.1, K.Ambulancia + 0.9, kEase.sale)) * 500})`}>
            <AmbFrente x={540} y={960} s={0.92} T={T} />
          </g>
          {/* retrovisor: un espejo invierte la imagen y el nombre se lee derecho */}
          <g transform={`translate(540 640) scale(${kprog(T, K.Ambulancia + 3.0, K.Ambulancia + 3.5, kEase.rebote)})`}>
            <rect x={-12} y={-210} width={24} height={70} fill="#333" stroke={KC.ink} strokeWidth={6} />
            <rect x={-330} y={-150} width={660} height={240} rx={110} fill="#2a2d36" stroke={KC.ink} strokeWidth={10} />
            <clipPath id="retro"><rect x={-300} y={-125} width={600} height={190} rx={90} /></clipPath>
            <rect x={-300} y={-125} width={600} height={190} rx={90} fill="#bfe3f5" />
            <g clipPath="url(#retro)"><g transform="scale(-1 1)"><AmbFrente x={0} y={70} s={0.62} T={T} /></g>
              <path d="M -180 -125 l 60 0 l -120 190 l -60 0 Z" fill="#fff" opacity=".22" /></g>
          </g>
        </Lienzo>
        <Etq T={T} at={K.Ambulancia + 1.4} until={K.Dos - 0.2} x={850} y={1150} texto="al revés" lado="izq" color={KC.ink} tam={36} />
        <Chip T={T} at={K.Ambulancia + 3.6} until={K.Dos - 0.1} texto="en el retrovisor: derecho" x={540} y={410} tam={42} borde={KC.mint} />
      </Escena>

      {/* 8 · dos espejos en ángulo recto (unión vertical): te ves como te ven los demás */}
      <Escena T={T} a={K.Dos} b={K.Cierre} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <defs>
            <clipPath id="esqI"><path d="M 150 520 L 540 600 L 540 1170 L 150 1215 Z" /></clipPath>
            <clipPath id="esqD"><path d="M 930 520 L 540 600 L 540 1170 L 930 1215 Z" /></clipPath>
          </defs>
          <g transform={`translate(0 ${(1 - kprog(T, K.Dos, K.Dos + 0.6, kEase.sale)) * 60})`}>
            <path d="M 126 492 L 540 576 L 954 492 L 954 1240 L 540 1194 L 126 1240 Z" fill={EMARCO} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            <path d="M 150 520 L 540 600 L 540 1170 L 150 1215 Z" fill={EVIDRIO} stroke={KC.ink} strokeWidth={7} />
            <path d="M 930 520 L 540 600 L 540 1170 L 930 1215 Z" fill={EVIDRIO2} stroke={KC.ink} strokeWidth={7} />
            {/* el reflejo: una sola persona partida por la unión, como te ven los demás */}
            {[['esqI'], ['esqD']].map(([c]) => <g key={c} clipPath={`url(#${c})`}>
              <Figura T={T} x={REF2.x} pies={REF2.pies} alto={REF2.alto} vista="frente" brazoI={subeDos} punto="I" color={KC.pink} guino={guina ? 'I' : null} cara="sonrie" />
            </g>)}
            <line x1={540} y1={590} x2={540} y2={1180} stroke={KC.ink} strokeWidth={10} />
            <line x1={540} y1={590} x2={540} y2={1180} stroke="#fff" strokeWidth={3} opacity=".7" />
          </g>
          <Figura T={T} x={PER2.x} pies={PER2.pies} alto={PER2.alto} vista="espalda" brazoD={subeDos} punto="D" color={KC.pink} />
          {T > K.Dos + 3.4 && <Punteada a={mP2} b={mR2} p={kprog(T, K.Dos + 3.4, K.Dos + 4.1, kEase.sale)} />}
          {/* esquema de arriba: dos espejos a 90° */}
          <g transform="translate(870 400)" opacity={kprog(T, K.Dos + 0.4, K.Dos + 0.9)}>
            <rect x={-110} y={-90} width={220} height={170} rx={22} fill="rgba(14,15,18,.82)" stroke={KC.gold} strokeWidth={4} />
            <path d="M -70 -50 L 0 20 L 70 -50" fill="none" stroke={EVIDRIO} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M -22 -2 L 0 -24 L 22 -2" fill="none" stroke={KC.gold2} strokeWidth={5} />
            <text x={0} y={66} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>90°</text>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Dos + 0.3} until={K.Dos + 3.3} texto="dos espejos a 90°" x={400} y={420} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Dos + 3.4} until={K.Cierre - 0.1} texto="como te ven los demás" x={420} y={420} tam={42} borde={EROJO} />
        <Etq T={T} at={K.Dos + 3.0} until={K.Cierre - 0.2} x={mP2[0] - 40} y={mP2[1] - 60} texto="tu derecha" lado="izq" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Dos + 3.4} until={K.Cierre - 0.2} x={mR2[0] - 40} y={mR2[1] - 50} texto="su derecha" lado="izq" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Dos + 4.4} until={K.Cierre - 0.2} x={480} y={655} texto="guiña su ojo derecho" lado="izq" color={KC.ink} tam={28} />
      </Escena>

      {/* 9 · cierre: la misma imagen del inicio; la vuelta la das tú en tu cabeza */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.04} origen="40% 50%">
        <FondoLunares color={KC.pink} />
        <CuartoEspejo T={T} brazo={brazoC} punto refColor={KC.pink} />
        <Lienzo z={3}>
          {/* globo de pensamiento: tu cabeza le da la vuelta a tu reflejo */}
          <g opacity={kprog(T, K.Cierre + 1.2, K.Cierre + 1.7)} transform={`translate(860 820) scale(${klerp(0.6, 1, kprog(T, K.Cierre + 1.2, K.Cierre + 1.8, kEase.rebote))})`}>
            <circle cx={-250} cy={250} r={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <circle cx={-200} cy={185} r={28} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={0} rx={175} ry={185} fill="#fff" stroke={KC.ink} strokeWidth={9} />
            <path d="M -110 -90 A 120 50 0 1 0 110 -90" fill="none" stroke={KC.ink} strokeWidth={9} strokeDasharray="16 12" transform={`rotate(${Math.sin(T * 2) * 4})`} />
            <path d="M 110 -90 l -6 -32 l 32 10 Z" fill={KC.ink} />
            {(() => { const g = ((T - K.Cierre) * 0.7) % 1, c = Math.cos(g * Math.PI * 2);
              return <Figura T={T} x={0} pies={150} alto={280} vista={c >= 0 ? 'espalda' : 'frente'} sx={Math.abs(c) < 0.08 ? 0.08 * Math.sign(c || 1) : c} brazoD={1} punto="D" color={KC.orange} cara="sonrie" />; })()}
          </g>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.8} until={K.Outro - 0.1} texto="tú te das la vuelta en tu cabeza" x={540} y={440} tam={40} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Mano - 0.1} texto="No es izquierda-derecha: *es adelante-atrás.*" />
      <Subtitulo T={T} idx={1} at={K.Mano + 0.1} until={K.Arriba - 0.1} texto="Tu reflejo: *del mismo lado.*" />
      <Subtitulo T={T} idx={2} at={K.Arriba + 0.1} until={K.Frente - 0.1} texto="Arriba y abajo: *nada cambió.*" />
      <Subtitulo T={T} idx={3} at={K.Frente + 0.1} until={K.Pregunta - 0.1} texto="Se invierte *adelante y atrás.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Girar - 0.1} texto="¿Y por qué *parece que cambian?*" />
      <Subtitulo T={T} idx={5} at={K.Girar + 0.1} until={K.Texto - 0.1} texto="Al voltearse, *su derecha cambia.*" />
      <Subtitulo T={T} idx={6} at={K.Texto + 0.1} until={K.Ambulancia - 0.1} texto="La hoja *mira al espejo.*" />
      <Subtitulo T={T} idx={7} at={K.Ambulancia + 0.1} until={K.Dos - 0.1} texto="Al revés: *se lee en el retrovisor.*" />
      <Subtitulo T={T} idx={8} at={K.Dos + 0.1} until={K.Cierre - 0.1} texto="Dos espejos: *como te ven.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="La vuelta *la das tú.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [K.Mano + 2.4, K.Arriba - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Frente + 3.0, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Girar + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Girar + 4.2, K.Texto - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Ambulancia + 3.0, K.Dos - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Dos + 4.0, K.Cierre - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="29" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function EspejoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Espejo /></CompositionStage></div>;
}
window.EspejoApp = EspejoApp;
