// Shot Científico #37 · La Luna no es más grande en el horizonte — NARRADO (N2 mito + participación: tápala con la uña del meñique).
// Datos: NASA Science 2023 (fotos del mismo ancho, prueba con el dedo, sin explicación sólida), Kaufman y Kaufman 2000 (PNAS),
// Ross 2019 / Ross y Plug 2002 (más de 2,000 años, cielo aplanado), Wikipedia «Moon illusion» (≈ 1.5 % más lejos). Ver guion.md y
// verificacion.md. Dibujo esquemático: tamaños y distancias sin escala.
const LH_CIELO_A = '#0f1838', LH_CIELO_B = '#3a2c6b', LH_EDIF = '#241c45', LH_VENT = '#ffd76a', LH_LUNA = '#e9e4d6';

// La Luna con cráteres y un halo. halo 0..1.
function LunaH({ x, y, r = 100, halo = 0.5 }) {
  return <g transform={`translate(${x} ${y})`}>
    {halo > 0 && <circle r={r * 1.45} fill="#fff4c9" opacity={0.16 * halo} />}
    {halo > 0 && <circle r={r * 1.18} fill="#fff4c9" opacity={0.18 * halo} />}
    <circle r={r} fill={LH_LUNA} stroke={KC.ink} strokeWidth={Math.max(4, r / 14)} />
    {[[-0.35, -0.3, 0.22], [0.3, 0.15, 0.16], [-0.1, 0.45, 0.12], [0.45, -0.4, 0.1], [-0.55, 0.2, 0.09]].map(([cx, cy, cr], i) =>
      <circle key={i} cx={cx * r} cy={cy * r} r={cr * r} fill="#c4bdae" stroke={KC.ink} strokeWidth={Math.max(2, r / 30)} opacity=".9" />)}
  </g>;
}
// Regla horizontal sin números (dentro de svg).
function ReglaLH({ x, y, ancho, alto = 40, color = KC.yellow, o = 1 }) {
  return <g opacity={o}>
    <rect x={x} y={y} width={ancho} height={alto} rx={8} fill={color} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 21 }, (_, i) => <line key={i} x1={x + ancho * i / 20} y1={y} x2={x + ancho * i / 20} y2={y + (i % 5 ? 13 : 24)} stroke={KC.ink} strokeWidth={3.5} />)}
  </g>;
}
// Regla que mide una Luna: va arriba de ella con dos líneas punteadas a sus bordes.
function MideLuna({ x, y, r, o = 1, color = KC.yellow }) {
  if (o <= 0.01) return null;
  const yR = y - r - 80;
  return <g opacity={o}>
    {[-1, 1].map((s) => <line key={s} x1={x + s * r} y1={yR + 40} x2={x + s * r} y2={y} stroke="#fff" strokeWidth={5} strokeDasharray="10 9" />)}
    <ReglaLH x={x - r - 30} y={yR} ancho={2 * r + 60} color={color} />
    {[-1, 1].map((s) => <path key={s} d={`M ${x + s * r} ${yR - 6} l ${-s * 0} 0 l ${-s * 16} -18 l ${s * 32} 0 Z`} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Silueta de ciudad: edificios con ventanas. base = y del suelo.
function CiudadLH({ base = 1200, T = 0, color = LH_EDIF, ventanas = true, esc = 1 }) {
  const E = [[-20, 210, 170], [150, 300, 120], [270, 160, 150], [420, 250, 110], [530, 190, 170], [700, 330, 130], [830, 220, 120], [950, 280, 150]];
  return <g>{E.map(([x, h0, w], i) => { const h = h0 * esc; return <g key={i}>
    <rect x={x} y={base - h} width={w} height={h + 20} fill={color} stroke={KC.ink} strokeWidth={6} />
    {ventanas && Array.from({ length: Math.floor(h / 70) * 2 }, (_, k) => { const c = k % 2, f = Math.floor(k / 2), on = ((i * 7 + k * 3) % 5) > 1;
      return <rect key={k} x={x + 22 + c * (w - 70)} y={base - h + 30 + f * 70} width={26} height={34} fill={on ? LH_VENT : '#3a3168'} opacity={on ? 0.75 + 0.25 * Math.sin(T * 2 + k + i) : 1} />; })}
  </g>; })}</g>;
}
// Árbol sencillo. (x, y) = base del tronco.
function ArbolLH({ x, y, s = 1, T = 0, color = '#2f9e5b' }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.6 + x) * 2})`}>
    <rect x={-14} y={-120} width={28} height={120} fill="#6b4226" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-150} r={70} fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-45} cy={-110} r={45} fill={color} stroke={KC.ink} strokeWidth={7} />
    <circle cx={45} cy={-112} r={45} fill={color} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Mano con el meñique levantado: (x, y) = centro de la uña. El brazo baja hacia abajo a la derecha.
function ManoMenique({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 60 300 L 260 1100 L 520 1100 L 250 280 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-30} y={-30} width={62} height={270} rx={30} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={170} width={290} height={230} rx={70} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2].map((k) => <path key={k} d={`M ${40 + k * 62} 200 q 30 -10 50 20`} stroke={CPIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <path d="M 200 230 C 260 220 280 300 230 330" fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={0} rx={24} ry={28} fill="#f7d0c6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -12 -14 Q 0 -22 12 -14" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity=".8" />
  </g>;
}
// Visto bueno que salta.
function Palomita({ T, at, x, y, s = 1, color = KC.mint }) {
  if (T < at) return null;
  const k = klerp(0.3, 1, kprog(T, at, at + 0.35, kEase.rebote)) * s;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <circle r={46} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 0 L -5 16 L 22 -16" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Pergamino que se desenrolla (a 0..1). Adentro: dibujo antiguo de la Luna en el horizonte.
function Pergamino({ x, y, a = 1, T = 0 }) {
  const w = 640 * Math.max(0.04, a), h = 380;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="#f3e2b8" stroke={KC.ink} strokeWidth={8} />
    {a > 0.6 && <g opacity={kprog(a, 0.6, 1)}>
      <path d="M -260 90 Q -150 60 -60 85 T 120 80 T 270 90" stroke="#8a5a2b" strokeWidth={6} fill="none" />
      <circle cx={-120} cy={30} r={70} fill="none" stroke="#8a5a2b" strokeWidth={6} />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M 40 ${-120 + i * 42} q 30 -12 60 0 t 60 0 t 60 0`} stroke="#8a5a2b" strokeWidth={5} fill="none" opacity=".75" />)}
      {[0, 1].map((i) => <path key={i} d={`M -250 ${130 + i * 26} q 40 -10 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0`} stroke="#8a5a2b" strokeWidth={4} fill="none" opacity=".6" />)}
    </g>}
    {[-1, 1].map((s) => <rect key={s} x={s * w / 2 - 22} y={-h / 2 - 26} width={44} height={h + 52} rx={20} fill="#d9b77a" stroke={KC.ink} strokeWidth={8} />)}
  </g>;
}
// Cielo nocturno con ciudad (gancho y cierre).
function NocheCiudad({ T, children, frente }) {
  return <g>
    <defs><linearGradient id="lhCielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={LH_CIELO_A} /><stop offset="1" stopColor={LH_CIELO_B} /></linearGradient></defs>
    <rect width={KW} height={KH} fill="url(#lhCielo)" />
    <EstrellasFondo T={T} n={80} seed={37} alto={1000} />
    {children}
    <CiudadLH base={1200} T={T} />
    <rect x={0} y={1190} width={KW} height={KH - 1190} fill="#1a1433" stroke={KC.ink} strokeWidth={8} />
    {frente}
  </g>;
}

function LunaHorizonte() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: la Luna enorme sale detrás de los edificios
  const gS = kprog(T, K.Gancho, K.Medida, (p) => p), gY = klerp(860, 780, gS);
  // medida: la Luna sube del horizonte al cielo y la regla la sigue
  const mS = kprog(T, K.Medida + 2.6, K.Medida + 4.0, kEase.suave);
  const mX = klerp(260, 600, mS), mY = klerp(1010, 690, mS) - Math.sin(mS * Math.PI) * 60, mR = klerp(70, 68, mS);
  // fotos: 6 lunas del mismo ancho subiendo en arco
  const FOT = Array.from({ length: 6 }, (_, i) => { const f = i / 5; return [klerp(200, 870, f), klerp(1040, 600, f) - Math.sin(f * Math.PI) * 120, K.Foto + 0.4 + i * 0.7]; });
  const flash = FOT.reduce((a, [, , t]) => a + Math.max(0, 1 - Math.abs(T - t) * 6) * (T >= t - 0.02 ? 1 : 0), 0);
  // dedo: la mano tapa la Luna abajo y luego arriba
  const dS = kprog(T, K.Dedo + 2.9, K.Dedo + 3.8, kEase.suave), dX = klerp(560, 600, dS), dY = klerp(950, 600, dS);
  const dMano = kprog(T, K.Dedo + 0.3, K.Dedo + 1.2, kEase.sale) * (1 - kprog(T, K.Dedo + 2.3, K.Dedo + 2.9, kEase.suave)) + kprog(T, K.Dedo + 3.9, K.Dedo + 4.6, kEase.sale);
  // cierre: la Luna del cielo vuelve a su tamaño real; la gigante se queda en la nube de pensamiento
  const cS = kprog(T, K.Cierre + 1.0, K.Cierre + 2.2, kEase.suave);
  const cR = klerp(230, 72, cS), cX = klerp(330, 220, cS), cY = klerp(780, 840, cS);
  const burbuja = kprog(T, K.Cierre + 0.9, K.Cierre + 1.5, kEase.rebote);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.noche }}>
      {/* 0 · gancho: Luna gigante saliendo detrás de la ciudad; una regla la mide */}
      <Escena T={T} a={K.Gancho} b={K.Medida} fondo={KC.noche}>
        <Lienzo>
          <NocheCiudad T={T}>
            <LunaH x={330} y={gY} r={230} halo={0.8 + 0.2 * Math.sin(T * 2)} />
          </NocheCiudad>
          <MideLuna x={330} y={gY} r={230} o={kprog(T, K.Gancho + 2.3, K.Gancho + 2.7)} />
          <TextoSvg x={330} y={470} tam={96} color={KC.yellow} rot={-4} s={klerp(0.4, 1, kprog(T, K.Gancho + 0.3, K.Gancho + 0.7, kEase.rebote))} o={kprog(T, K.Gancho + 0.3, K.Gancho + 0.4) * (1 - kprog(T, K.Gancho + 2.2, K.Gancho + 2.4))}>¿GIGANTE?</TextoSvg>
          <TextoSvg x={330} y={gY + 30} tam={104} color={KC.pink} rot={-12} s={klerp(1.6, 1, kprog(T, K.Gancho + 3.4, K.Gancho + 3.7, kEase.rebote))} o={kprog(T, K.Gancho + 3.4, K.Gancho + 3.5)}>ENGAÑO</TextoSvg>
        </Lienzo>
        <Etq T={T} at={K.Gancho + 2.8} until={K.Medida - 0.1} x={150} y={440} texto="la medimos" lado="der" color={KC.texto} tam={34} />
      </Escena>

      {/* 1 · la misma regla: abajo y arriba, casi lo mismo */}
      <Escena T={T} a={K.Medida} b={K.Foto} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {mS > 0.02 && <g opacity={0.9}>
            <circle cx={260} cy={1010} r={70} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" />
            <ReglaLH x={260 - 100} y={1010 - 150} ancho={200} color="#fff3a0" o={0.8} />
          </g>}
          {mS > 0.02 && mS < 0.98 && <path d={`M 260 1010 Q 380 720 600 690`} stroke="#fff" strokeWidth={6} strokeDasharray="4 16" strokeLinecap="round" fill="none" opacity=".7" />}
          <LunaH x={mX} y={mY} r={mR} halo={0.6} />
          <CiudadLH base={1180} T={T} color="#4b3a86" ventanas={false} esc={0.45} />
          <rect x={0} y={1170} width={KW} height={KH - 1170} fill="#3a2c6b" stroke={KC.ink} strokeWidth={8} />
          <MideLuna x={mX} y={mY} r={mR} o={kprog(T, K.Medida + 0.4, K.Medida + 0.8)} />
        </Lienzo>
        <Etq T={T} at={K.Medida + 1.2} until={K.Foto - 0.1} x={360} y={1000} texto="en el horizonte" lado="der" color={KC.ink} tam={36} />
        <Etq T={T} at={K.Medida + 4.0} until={K.Foto - 0.1} x={700} y={700} texto="más arriba" lado="der" color={KC.ink} tam={36} />
        <Chip T={T} at={K.Medida + 4.3} until={K.Foto - 0.1} texto="casi el mismo tamaño" x={540} y={400} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 2 · fotos: misma cámara, mismo zoom → todas del mismo ancho */}
      <Escena T={T} a={K.Foto} b={K.Dedo} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <rect x={70} y={490} width={940} height={690} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={9} transform={`rotate(-1.5 540 835)`} />
          <g transform="rotate(-1.5 540 835)">
            <rect x={96} y={516} width={888} height={638} fill={LH_CIELO_A} stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={120 + (i * 137) % 850} cy={540 + (i * 89) % 420} r={2.5} fill="#fff" opacity=".6" />)}
            <path d="M 96 1110 L 180 1080 L 260 1100 L 380 1060 L 470 1095 L 600 1070 L 720 1100 L 860 1065 L 984 1090 L 984 1154 L 96 1154 Z" fill="#1d1638" stroke={KC.ink} strokeWidth={5} />
            {FOT.map(([x, y, t], i) => T >= t && <g key={i} opacity={klerp(0.3, 1, kprog(T, t, t + 0.2))}><LunaH x={x} y={y} r={46} halo={0.4} /></g>)}
            {[0, 5].map((i) => { const [x, y] = FOT[i], o = kprog(T, K.Foto + 4.4 + i * 0.06, K.Foto + 4.8 + i * 0.06);
              return <g key={i} opacity={o}>
                <line x1={x - 46} y1={y - 70} x2={x + 46} y2={y - 70} stroke={KC.pink} strokeWidth={8} strokeLinecap="round" />
                {[-1, 1].map((s) => <line key={s} x1={x + s * 46} y1={y - 84} x2={x + s * 46} y2={y} stroke={KC.pink} strokeWidth={4} strokeDasharray="8 8" />)}
              </g>; })}
            <rect x={96} y={516} width={888} height={638} fill="#fff" opacity={0.55 * Math.min(1, flash)} />
          </g>
          <TextoSvg x={540} y={1110 - 300} tam={120} color={KC.pink} o={kprog(T, K.Foto + 4.9, K.Foto + 5.1)} s={klerp(0.5, 1, kprog(T, K.Foto + 4.9, K.Foto + 5.2, kEase.rebote))}>=</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Foto + 0.2} until={K.Foto + 4.3} texto="misma cámara · mismo zoom" x={540} y={410} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Foto + 4.4} until={K.Dedo - 0.1} texto="todas del mismo ancho" x={540} y={410} tam={44} borde={KC.pink} />
      </Escena>

      {/* 3 · haz la prueba: la uña del meñique la tapa abajo y arriba */}
      <Escena T={T} a={K.Dedo} b={K.Pregunta} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <path d="M 0 1010 Q 200 960 420 1000 T 820 990 T 1080 1000 L 1080 1920 L 0 1920 Z" fill="#1f8a63" stroke={KC.ink} strokeWidth={8} />
          <LunaH x={dX} y={dY} r={24} halo={1} />
          <g transform={`translate(${dX} ${dY + (1 - dMano) * 1100}) scale(0.8)`}><ManoMenique x={0} y={0} /></g>
          <Palomita T={T} at={K.Dedo + 1.5} x={560 - 130} y={950} />
          <Palomita T={T} at={K.Dedo + 4.8} x={600 - 130} y={600} />
          {T < K.Dedo + 2.3 && <circle cx={dX} cy={dY} r={44} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="8 8" opacity={kprog(T, K.Dedo + 1.3, K.Dedo + 1.5)} />}
        </Lienzo>
        <Chip T={T} at={K.Dedo + 0.2} until={K.Pregunta - 0.1} texto="haz la prueba · brazo estirado" x={540} y={400} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Dedo + 1.6} until={K.Dedo + 2.6} x={370} y={860} texto="cuando sale" lado="izq" color={KC.ink} tam={36} />
        <Etq T={T} at={K.Dedo + 4.9} until={K.Pregunta - 0.1} x={410} y={510} texto="ya arriba" lado="izq" color={KC.ink} tam={36} />
      </Escena>

      {/* 4 · ¿entonces por qué la ves enorme? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Nadie} color={KC.orange} />

      {/* 5 · nadie lo sabe con certeza; ilusión conocida desde hace más de 2,000 años */}
      <Escena T={T} a={K.Nadie} b={K.Hipotesis} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          {[[180, 640, -12], [900, 700, 10], [230, 1000, 8], [860, 1040, -10]].map(([x, y, r], i) =>
            <TextoSvg key={i} x={x} y={y + Math.sin(T * 2 + i) * 14} tam={120} color={KC.yellow} rot={r} o={kprog(T, K.Nadie + 0.4 + i * 0.25, K.Nadie + 0.6 + i * 0.25) * (1 - kprog(T, K.Nadie + 2.0, K.Nadie + 2.4))}>?</TextoSvg>)}
          <g opacity={kprog(T, K.Nadie + 1.8, K.Nadie + 2.0)}>
            <Pergamino x={540} y={740} a={kprog(T, K.Nadie + 1.9, K.Nadie + 2.8, kEase.suave)} T={T} />
          </g>
          <text x={540} y={1000} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke" opacity={kprog(T, K.Nadie + 2.8, K.Nadie + 3.1)}>ilusión conocida desde hace</text>
          <TextoSvg x={540} y={1105} tam={100} color={KC.yellow} s={klerp(0.5, 1, kprog(T, K.Nadie + 3.1, K.Nadie + 3.5, kEase.rebote))} o={kprog(T, K.Nadie + 3.1, K.Nadie + 3.2)}>MÁS DE 2,000 AÑOS</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Nadie + 0.2} until={K.Hipotesis - 0.1} texto="nadie lo sabe con certeza" x={540} y={410} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 6 · hipótesis: sentimos el cielo como un techo aplanado */}
      <Escena T={T} a={K.Hipotesis} b={K.Lejos} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <rect x={0} y={1150} width={KW} height={KH - 1150} fill="#2fb36b" stroke={KC.ink} strokeWidth={8} />
          <path d="M 80 1150 A 460 340 0 0 1 1000 1150" fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={10} pathLength={1}
            strokeDasharray={`${kprog(T, K.Hipotesis + 0.8, K.Hipotesis + 2.2, kEase.suave)} 1`} />
          <path d="M 80 1150 A 460 340 0 0 1 1000 1150" fill="none" stroke="#fff" strokeWidth={4} pathLength={1}
            strokeDasharray={`${kprog(T, K.Hipotesis + 0.8, K.Hipotesis + 2.2, kEase.suave)} 1`} transform="translate(0 6)" opacity=".7" />
          <g transform="translate(540 1150) scale(0.38)"><PersonaSimple x={0} yPies={0} alto={560} color={KC.pink} cara="o" /></g>
          <g opacity={kprog(T, K.Hipotesis + 2.6, K.Hipotesis + 3.0)}><LunaH x={540} y={812} r={36} halo={0.6} /></g>
          <g opacity={kprog(T, K.Hipotesis + 3.0, K.Hipotesis + 3.4)}><LunaH x={968} y={1112} r={36} halo={0.6} /></g>
          <FlechaRecta x1={540} y1={920} x2={540} y2={866} p={kprog(T, K.Hipotesis + 3.6, K.Hipotesis + 4.0, kEase.sale)} color={KC.yellow} grosor={10} punta={22} />
          <FlechaRecta x1={590} y1={1000} x2={915} y2={1100} p={kprog(T, K.Hipotesis + 4.6, K.Hipotesis + 5.4, kEase.sale)} color={KC.pink} grosor={10} punta={24} />
        </Lienzo>
        <Chip T={T} at={K.Hipotesis + 0.2} until={K.Lejos - 0.1} texto="una explicación · hipótesis" x={540} y={410} tam={42} borde={KC.yellow} />
        <Etq T={T} at={K.Hipotesis + 2.2} until={K.Lejos - 0.1} x={130} y={1000} texto="techo aplanado" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Hipotesis + 4.0} until={K.Lejos - 0.1} x={590} y={760} texto="se siente cerca" lado="der" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Hipotesis + 5.4} until={K.Lejos - 0.1} x={720} y={990} texto="«más lejos»" lado="der" color={KC.ink} tam={36} />
      </Escena>

      {/* 7 · lo que parece más lejos y ocupa lo mismo en tu vista, el cerebro lo agranda (ilusión de Ponzo) */}
      <Escena T={T} a={K.Lejos} b={K.Cerca} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {(() => { const VY = 330, dib = kprog(T, K.Lejos + 0.2, K.Lejos + 1.0, kEase.sale);
            const lx = (y) => 150 + 390 * (1200 - y) / 870, rxx = (y) => 930 - 390 * (1200 - y) / 870;
            const yTop = klerp(1200, VY, dib);
            return <g>
              {Array.from({ length: 9 }, (_, i) => { const y = 1200 - 870 * (1 - Math.pow(1 - i / 9, 1.8)); return y > yTop && <line key={i} x1={lx(y) - 30} y1={y} x2={rxx(y) + 30} y2={y} stroke="#8a5a2b" strokeWidth={Math.max(6, 22 * (y - VY) / 870)} strokeLinecap="round" />; })}
              <line x1={150} y1={1200} x2={lx(yTop)} y2={yTop} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
              <line x1={930} y1={1200} x2={rxx(yTop)} y2={yTop} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
            </g>; })()}
          {[[540, 560, 1.0], [540, 1020, 1.4]].map(([x, y, d], i) => <g key={i} opacity={kprog(T, K.Lejos + d, K.Lejos + d + 0.3)}><LunaH x={x} y={y} r={70} halo={0.3} /></g>)}
          {T > K.Lejos + 2.4 && <circle cx={540} cy={560} r={klerp(70, 96, kprog(T, K.Lejos + 2.4, K.Lejos + 3.2, kEase.rebote))} fill="none" stroke={KC.pink} strokeWidth={7} strokeDasharray="14 10" />}
          {[-1, 1].map((s) => <line key={s} x1={540 + s * 70} y1={470} x2={540 + s * 70} y2={1110} stroke={KC.blue} strokeWidth={5} strokeDasharray="12 10" opacity={kprog(T, K.Lejos + 3.8, K.Lejos + 4.3)} />)}
        </Lienzo>
        <Chip T={T} at={K.Lejos + 0.2} until={K.Cerca - 0.1} texto="hipótesis" x={540} y={300} tam={40} borde={KC.ink} />
        <Etq T={T} at={K.Lejos + 2.6} until={K.Cerca - 0.1} x={630} y={620} texto="se ve más grande" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Lejos + 4.1} until={K.Cerca - 0.1} x={630} y={800} texto="mismo tamaño" lado="der" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Lejos + 1.2} until={K.Cerca - 0.1} x={420} y={1160} texto="ilusión de Ponzo" lado="izq" color={KC.ink} tam={30} />
      </Escena>

      {/* 8 · otra idea: junto a árboles y edificios la Luna parece enorme */}
      <Escena T={T} a={K.Cerca} b={K.Real} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          {[[60, 0.3], [560, 0.6]].map(([x0, d], i) => <g key={i} opacity={kprog(T, K.Cerca + d, K.Cerca + d + 0.3)}>
            <rect x={x0} y={520} width={460} height={640} rx={12} fill={LH_CIELO_A} stroke={KC.ink} strokeWidth={9} />
          </g>)}
          <svg x={60} y={520} width={460} height={640} viewBox="0 0 460 640">
            <LunaH x={250} y={470} r={44} halo={0.7 + 0.3 * Math.sin(T * 3)} />
            {[[20, 200, 90], [120, 280, 80], [330, 230, 100]].map(([x, h, w], k) => <rect key={k} x={x} y={560 - h} width={w} height={h + 10} fill={LH_EDIF} stroke={KC.ink} strokeWidth={5} />)}
            {[0, 1, 2, 3].map((k) => <rect key={k} x={k % 2 ? 150 : 40} y={400 + Math.floor(k / 2) * 60} width={20} height={26} fill={LH_VENT} />)}
            <ArbolLH x={235} y={575} s={0.7} T={T} />
            <ArbolLH x={430} y={580} s={0.55} T={T + 1} />
            <rect x={0} y={560} width={460} height={80} fill="#2a2150" />
            <text x={230} y={50} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Cerca + 1.4, K.Cerca + 1.8)}>con edificios y árboles</text>
          </svg>
          <svg x={560} y={520} width={460} height={640} viewBox="0 0 460 640">
            <LunaH x={230} y={180} r={44} halo={0.7 + 0.3 * Math.sin(T * 3 + 1)} />
            <rect x={0} y={560} width={460} height={80} fill="#2a2150" />
            <text x={230} y={50} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto} opacity={kprog(T, K.Cerca + 2.2, K.Cerca + 2.6)}>sin nada al lado</text>
          </svg>
          {[[60, 0.3], [560, 0.6]].map(([x0], i) => <rect key={i} x={x0} y={520} width={460} height={640} rx={12} fill="none" stroke={KC.ink} strokeWidth={9} opacity={kprog(T, K.Cerca + 0.3, K.Cerca + 0.6)} />)}
          <TextoSvg x={290} y={760} tam={70} color={KC.yellow} rot={-6} s={klerp(0.5, 1, kprog(T, K.Cerca + 3.2, K.Cerca + 3.6, kEase.rebote))} o={kprog(T, K.Cerca + 3.2, K.Cerca + 3.3)}>¡ENORME!</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Cerca + 0.2} until={K.Real - 0.1} texto="otra idea · hipótesis" x={540} y={410} tam={42} borde={KC.yellow} />
      </Escena>

      {/* 9 · de hecho, en el horizonte está un poquito más lejos (≈ 1.5 %) */}
      <Escena T={T} a={K.Real} b={K.Cierre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {(() => { const E = [290, 880], R = 180, M = [910, 880];
            const pY = kprog(T, K.Real + 0.8, K.Real + 1.5, kEase.sale), pR = kprog(T, K.Real + 1.8, K.Real + 2.6, kEase.sale), pr = kprog(T, K.Real + 3.0, K.Real + 3.6);
            return <g>
              <circle cx={E[0]} cy={E[1]} r={R} fill="#3d8bff" stroke={KC.ink} strokeWidth={9} />
              <path d={`M ${E[0] - 100} ${E[1] - 90} C ${E[0] - 40} ${E[1] - 150} ${E[0] + 40} ${E[1] - 80} ${E[0] - 10} ${E[1] - 20} C ${E[0] - 60} ${E[1] + 20} ${E[0] - 120} ${E[1] - 20} ${E[0] - 100} ${E[1] - 90} Z`} fill="#2fb36b" stroke={KC.ink} strokeWidth={6} />
              <path d={`M ${E[0] + 40} ${E[1] + 30} C ${E[0] + 110} ${E[1] + 10} ${E[0] + 140} ${E[1] + 70} ${E[0] + 90} ${E[1] + 110} C ${E[0] + 50} ${E[1] + 130} ${E[0] + 20} ${E[1] + 80} ${E[0] + 40} ${E[1] + 30} Z`} fill="#2fb36b" stroke={KC.ink} strokeWidth={6} />
              <LunaH x={M[0]} y={M[1]} r={55} halo={0.5} />
              <g transform={`translate(${E[0] + R} ${E[1]}) rotate(90) scale(0.16)`}><PersonaSimple x={0} yPies={0} alto={600} color={KC.yellow} /></g>
              <g transform={`translate(${E[0]} ${E[1] - R}) scale(0.16)`}><PersonaSimple x={0} yPies={0} alto={600} color={KC.pink} /></g>
              <FlechaRecta x1={E[0] + R + 100} y1={E[1]} x2={M[0] - 65} y2={M[1]} p={pY} color={KC.yellow} grosor={10} punta={24} />
              <FlechaRecta x1={E[0] + 12} y1={E[1] - R - 50} x2={M[0] - 60} y2={M[1] - 22} p={pR} color={KC.pink} grosor={10} punta={24} />
              <g opacity={pr}>
                <line x1={E[0]} y1={E[1]} x2={E[0]} y2={E[1] - R} stroke={KC.ink} strokeWidth={6} strokeDasharray="10 8" />
                <circle cx={E[0]} cy={E[1]} r={8} fill={KC.ink} />
              </g>
            </g>; })()}
          <TextoSvg x={540} y={1140} tam={64} color={KC.yellow} o={kprog(T, K.Real + 3.4, K.Real + 3.6)} s={klerp(0.5, 1, kprog(T, K.Real + 3.4, K.Real + 3.8, kEase.rebote))}>UN POQUITO MÁS LEJOS · ≈ 1.5 %</TextoSvg>
        </Lienzo>
        <Etq T={T} at={K.Real + 1.3} until={K.Cierre - 0.1} x={660} y={930} texto="arriba de ti" lado="der" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Real + 2.4} until={K.Cierre - 0.1} x={560} y={720} texto="en el horizonte" lado="der" color={KC.ink} tam={32} />
        <Etq T={T} at={K.Real + 3.1} until={K.Cierre - 0.1} x={290} y={800} texto="radio de la Tierra" lado="der" color={KC.ink} tam={28} />
        <Chip T={T} at={K.Real + 0.2} until={K.Cierre - 0.1} texto="de hecho…" x={540} y={410} tam={42} borde={KC.yellow} />
        <div style={{ position:'absolute', left:540, top:1190, transform:'translate(-50%,-50%)', zIndex:41, font:`700 24px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.Real + 0.6, K.Real + 1.0) * (1 - kprog(T, K.Real + 3.2, K.Real + 3.4)) }}>(dibujo sin escala)</div>
      </Escena>

      {/* 10 · cierre: la misma ciudad; la Luna gigante se queda en tu cabeza, en el cielo es normal */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.noche}>
        <Lienzo>
          <NocheCiudad T={T} frente={<g>
            <PersonaSimple x={800} yPies={1200} alto={330} color={KC.cyan} cara="sonrie" />
          </g>}>
            <LunaH x={cX} y={cY} r={cR} halo={0.8} />
            {cS > 0.95 && <MideLuna x={cX} y={cY} r={cR} o={kprog(T, K.Cierre + 2.3, K.Cierre + 2.6)} />}
          </NocheCiudad>
          <g opacity={burbuja > 0 ? 1 : 0} transform={`translate(760 640) scale(${Math.max(0.01, burbuja)}) translate(-760 -640)`}>
            {[[790, 850, 18], [770, 800, 28]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" stroke={KC.ink} strokeWidth={6} />)}
            <ellipse cx={760} cy={600} rx={250} ry={180} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            <svg x={510} y={420} width={500} height={360} viewBox="0 0 500 360"><ellipse cx={250} cy={180} rx={242} ry={172} fill={LH_CIELO_B} /><LunaH x={250} y={200} r={140} halo={0.6} /></svg>
            <ellipse cx={760} cy={600} rx={250} ry={180} fill="none" stroke={KC.ink} strokeWidth={8} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.4} until={K.Outro - 0.1} texto="en tu cabeza" x={760} y={360} tam={42} borde={KC.pink} />
        <Etq T={T} at={K.Cierre + 2.5} until={K.Outro - 0.1} x={300} y={850} texto="en el cielo" lado="der" color={KC.texto} tam={32} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Medida - 0.1} texto="No es más grande: *es tu cerebro.*" />
      <Subtitulo T={T} idx={1} at={K.Medida + 0.1} until={K.Foto - 0.1} texto="Mídela: *casi lo mismo.*" />
      <Subtitulo T={T} idx={2} at={K.Foto + 0.1} until={K.Dedo - 0.1} texto="En fotos: *del mismo ancho.*" />
      <Subtitulo T={T} idx={3} at={K.Dedo + 0.1} until={K.Pregunta - 0.1} texto="Tápala con *la uña del meñique.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Nadie - 0.1} texto="¿Por qué *la ves enorme?*" />
      <Subtitulo T={T} idx={5} at={K.Nadie + 0.1} until={K.Hipotesis - 0.1} texto="Nadie lo sabe *con certeza.*" />
      <Subtitulo T={T} idx={6} at={K.Hipotesis + 0.1} until={K.Lejos - 0.1} texto="El cielo como *techo aplanado.*" />
      <Subtitulo T={T} idx={7} at={K.Lejos + 0.1} until={K.Cerca - 0.1} texto="Parece lejos: *la agranda.*" />
      <Subtitulo T={T} idx={8} at={K.Cerca + 0.1} until={K.Real - 0.1} texto="Junto a edificios, *enorme.*" />
      <Subtitulo T={T} idx={9} at={K.Real + 0.1} until={K.Cierre - 0.1} texto="Un poquito *más lejos.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Gigante *en tu cabeza.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Medida - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Medida + 3.0, K.Foto - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Foto + 3.0, K.Dedo - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Dedo + 2.4, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Nadie + 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.Nadie + 2.6, K.Hipotesis - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Hipotesis + 3.4, K.Lejos - 0.1, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Lejos + 2.4, K.Cerca - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Cerca + 2.6, K.Real - 0.1, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Real + 2.0, K.Cierre - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="37" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function LunaHorizonteApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LunaHorizonte /></CompositionStage></div>;
}
window.LunaHorizonteApp = LunaHorizonteApp;
