// Shot Científico #32 · Por qué el dolor del dedo golpeado llega tarde — NARRADO (N3 "Capítulos y medidores": carrera de dos señales).
// Datos: Yap et al. 2020 (tabla de Fix y Brueckner 2009), libro abierto MSU "Pain", Melzack y Wall 1965, Mancini et al. 2015.
// Ver guion.md y verificacion.md. Dibujo esquemático: el pie, los nervios y las distancias no van a escala.
const DL_RAP = KC.cyan, DL_LEN = KC.red, DL_MAD = '#a8693a', DL_FORRO = '#fbeec9', DL_AXON = KC.yellow;

// Punto a la fracción f (0..1) de una polilínea.
function dlPunto(P, f) {
  const L = []; let tot = 0;
  for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
  let r = kclamp(f, 0, 1) * tot;
  for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const k = L[i] ? r / L[i] : 0; return [klerp(P[i][0], P[i + 1][0], k), klerp(P[i][1], P[i + 1][1], k)]; } r -= L[i]; }
  return P[P.length - 1];
}
const dlSub = (P, f) => { const out = [P[0]]; const n = 40; for (let i = 1; i <= n; i++) out.push(dlPunto(P, f * i / n)); return out.map((q) => q.join(',')).join(' '); };
// Nervio del pie en coordenadas del Pie (del dedo chiquito hacia arriba por la pierna).
const DL_NERVIO = [[282, 82], [170, 62], [40, 10], [0, -200], [0, -1000]];

// Señal: bolita con estela. color, x, y.
function Senal({ x, y, color, r = 22, o = 1 }) {
  if (o <= 0.01) return null;
  return <g opacity={o}><circle cx={x} cy={y} r={r * 2.2} fill={color} opacity=".28" /><circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={6} /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.3} fill="#fff" opacity=".8" /></g>;
}
// Pie descalzo de lado (el dedo chiquito mira a la cámara). (x, y) = tobillo; el piso queda en y + 112·s.
// nervio 0..1 = se ve el nervio por dentro; rapida / lenta = fracción del recorrido de cada señal (null = no está).
function Pie({ x, y, s = 1, rot = 0, corto = false, nervio = 0, rapida = null, lenta = null, piquete = 0, sordo = 0, T = 0 }) {
  const pR = rapida != null ? dlPunto(DL_NERVIO, rapida) : null, pL = lenta != null ? dlPunto(DL_NERVIO, lenta) : null;
  const lat = 0.75 + 0.25 * Math.sin(T * 7);
  return <g transform={`translate(${x} ${y}) rotate(${rot} 0 100) scale(${s})`}>
    {!corto && <rect x={-96} y={-1800} width={182} height={1180} fill="#3d5bd6" stroke={KC.ink} strokeWidth={9} />}
    {!corto && <rect x={-100} y={-680} width={190} height={60} rx={14} fill="#2e47ad" stroke={KC.ink} strokeWidth={9} />}
    <path d={`M -70 ${corto ? -170 : -622} L -66 -60 C -100 -20 -118 60 -96 104 L 262 112 C 306 112 318 74 296 52 C 262 26 140 -6 62 -48 L 62 ${corto ? -170 : -622} Z`} fill={CPIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -96 104 L 262 112" stroke={CPIEL2} strokeWidth={12} strokeLinecap="round" />
    <circle cx={4} cy={-14} r={20} fill="none" stroke={CPIEL2} strokeWidth={6} />
    <ellipse cx={244} cy={70} rx={30} ry={26} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={284} cy={84} rx={30} ry={26} fill={CPIEL} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={300} cy={74} rx={11} ry={8} fill="#fde3d6" stroke={KC.ink} strokeWidth={4} />
    {sordo > 0.01 && <g opacity={sordo}>
      <circle cx={282} cy={84} r={110 * lat} fill="url(#dlGlow)" />
      <circle cx={282} cy={84} r={40 + 70 * ((T * 0.9) % 1)} fill="none" stroke={DL_LEN} strokeWidth={8} opacity={1 - ((T * 0.9) % 1)} />
    </g>}
    {piquete > 0.01 && <g opacity={piquete}>{Array.from({ length: 7 }, (_, i) => { const a = -Math.PI * 0.9 + i * 0.32, r0 = 50, r1 = 50 + 70 * piquete;
      const mx = 282 + Math.cos(a) * (r0 + r1) / 2 + Math.sin(a) * 12, my = 84 + Math.sin(a) * (r0 + r1) / 2 - Math.cos(a) * 12;
      return <polyline key={i} points={`${282 + Math.cos(a) * r0},${84 + Math.sin(a) * r0} ${mx},${my} ${282 + Math.cos(a) * r1},${84 + Math.sin(a) * r1}`} fill="none" stroke={DL_RAP} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />; })}</g>}
    {nervio > 0.01 && <g opacity={nervio}>
      <polyline points={DL_NERVIO.map((q) => q.join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,.7)" strokeWidth={16} strokeLinejoin="round" />
      <polyline points={DL_NERVIO.map((q) => q.join(',')).join(' ')} fill="none" stroke={KC.ink} strokeWidth={5} strokeDasharray="12 12" strokeLinejoin="round" />
    </g>}
    {pL && <Senal x={pL[0]} y={pL[1]} color={DL_LEN} r={20} />}
    {pR && <Senal x={pR[0]} y={pR[1]} color={DL_RAP} r={20} />}
  </g>;
}
function DefsDolor() {
  return <defs><radialGradient id="dlGlow"><stop offset="0" stopColor="#ff3b2f" stopOpacity=".95" /><stop offset=".55" stopColor="#ff6b5a" stopOpacity=".45" /><stop offset="1" stopColor="#ff6b5a" stopOpacity="0" /></radialGradient></defs>;
}
// Mesa baja (la pata con la que chocas).
function Mesa({ x = 600 }) {
  return <g>
    <rect x={x - 30} y={820} width={600} height={56} rx={10} fill={DL_MAD} stroke={KC.ink} strokeWidth={9} />
    <rect x={x} y={872} width={64} height={320} fill="#8a5129" stroke={KC.ink} strokeWidth={9} />
    <rect x={x + 420} y={872} width={64} height={320} fill="#8a5129" stroke={KC.ink} strokeWidth={9} />
  </g>;
}
// Cerebro esquemático.
function Cerebro({ x, y, s = 1, brillo = 0, color = DL_RAP }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {brillo > 0.01 && <circle r={170} fill={color} opacity={0.35 * brillo} />}
    <path d="M -110 30 C -150 -10 -130 -90 -70 -100 C -50 -140 30 -140 50 -110 C 110 -120 150 -60 120 -10 C 150 30 110 90 60 80 C 30 110 -40 110 -60 80 C -100 90 -130 60 -110 30 Z" fill="#ff9ec4" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -70 -60 C -40 -80 -20 -40 10 -60 M -90 10 C -60 -10 -30 30 0 10 C 30 -10 60 30 90 0 M 20 -95 C 40 -70 70 -80 90 -50 M -40 60 C -10 40 20 70 50 50" fill="none" stroke="#c45585" strokeWidth={7} strokeLinecap="round" />
    <path d="M -10 90 L 0 150 L 20 150 L 25 90" fill="#ff9ec4" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Mano que soba (de canto, desde la derecha).
function Mano({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={120} y={-50} width={260} height={100} rx={20} fill={KC.mint} stroke={KC.ink} strokeWidth={9} />
    <path d="M 130 -46 C 60 -70 -60 -60 -110 -30 C -140 -10 -130 20 -100 24 L 30 30 C 60 50 110 50 130 40 Z" fill={CPIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -60 -38 L -60 18 M -10 -44 L -10 24 M 40 -46 L 40 28" stroke={CPIEL2} strokeWidth={6} strokeLinecap="round" />
  </g>;
}
// Fibra nerviosa al microscopio (dentro de un svg de w × h). forro = con mielina en tramos. p = fase de la señal (0..1); grosor del axón.
function FibraMicro({ w, h, y, forro, p, color, grosor = 20, x0 = -40, x1 }) {
  x1 = x1 == null ? w + 40 : x1;
  const tramos = []; if (forro) for (let x = x0 + 10; x < x1; x += 132) tramos.push(x);
  const sx = klerp(x0, x1, p);
  return <g>
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={DL_AXON} strokeWidth={grosor} strokeLinecap="round" />
    <line x1={x0} y1={y} x2={x1} y2={y} stroke={KC.ink} strokeWidth={grosor} strokeLinecap="round" opacity=".2" />
    {tramos.map((tx, i) => <rect key={i} x={tx} y={y - 40} width={112} height={80} rx={40} fill={DL_FORRO} stroke={KC.ink} strokeWidth={6} />)}
    {p != null && p >= 0 && p <= 1 && <Senal x={sx} y={y} color={color} r={forro ? 26 : 16} />}
  </g>;
}

function Dolor() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el pie choca en 0.35 s; piquete en 0.9 s; dolor sordo desde 2.6 s
  const TOC = 0.35, PIQ = 0.9, SOR = 2.6;
  const C0 = K.Cierre, TOCc = C0 + 0.35, PIQc = C0 + 0.9, SORc = C0 + 2.1;
  // pie que avanza, choca y rebota (ankle x)
  const piePos = (t0) => { const ida = kprog(T, t0 - 0.35, t0, (p) => p * p), reb = kprog(T, t0, t0 + 0.35, kEase.sale);
    const tiembla = T > t0 && T < t0 + 0.6 ? Math.sin((T - t0) * 60) * 6 * (1 - (T - t0) / 0.6) : 0;
    return klerp(70, 290, ida) - 40 * reb + tiembla; };
  const piq = (t) => kprog(T, t, t + 0.12) * (1 - 0.6 * kprog(T, t + 0.8, t + 1.6));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.yellow }}>
      {/* 0 · gancho: el pie choca con la pata de la mesa → piquete → dolor sordo */}
      <Escena T={T} a={K.Gancho} b={K.Dos} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo><g transform="translate(0 -70)">
          <DefsDolor />
          <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
          <Mesa x={560} />
          <Pie x={piePos(TOC)} y={1080} T={T} piquete={piq(PIQ)} sordo={kprog(T, SOR, SOR + 0.8)} />
          <Onomato T={T} at={TOC} dur={1.3} x={470} y={760} texto="¡TOC!" tam={150} color={KC.pink} />
          {T > SOR + 0.4 && <TextoSvg x={760} y={1110 + Math.sin(T * 7) * 6} tam={70} color={KC.red} rot={-4} o={kprog(T, SOR + 0.4, SOR + 0.7)}>¡AAAY…!</TextoSvg>}
        </g></Lienzo>
        <Chip T={T} at={PIQ} until={K.Dos - 0.1} texto="1 · piquete" x={240} y={460} tam={42} borde={DL_RAP} />
        <Chip T={T} at={SOR} until={K.Dos - 0.1} texto="2 · dolor sordo" x={290} y={570} tam={42} borde={DL_LEN} />
      </Escena>
      {/* 1 · primero el piquete: la señal azul sale del dedo casi al instante */}
      <Escena T={T} a={K.Dos} b={K.Fibras} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo><g transform="translate(0 -70)">
          <DefsDolor />
          <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
          <Pie x={330} y={1040} s={1.25} T={T} nervio={kprog(T, K.Dos - 0.1, K.Dos + 0.3)} piquete={piq(K.Dos + 0.2) * 0.8}
            rapida={T > K.Dos + 0.35 ? kprog(T, K.Dos + 0.35, K.Dos + 0.95, kEase.suave) : null} />
          {Array.from({ length: 5 }, (_, i) => { const at = K.Dos + 0.4 + i * 0.05, o = kprog(T, at, at + 0.1) * (1 - kprog(T, at + 0.5, at + 0.9));
            return <line key={i} x1={300 + i * 14} y1={600 - i * 80} x2={300 + i * 14} y2={700 - i * 80} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={o} />; })}
        </g></Lienzo>
        <Chip T={T} at={K.Dos + 0.9} until={K.Fibras - 0.1} texto="piquete agudo" x={720} y={470} tam={46} borde={DL_RAP} />
        <Chip T={T} at={K.Dos + 1.6} until={K.Fibras - 0.1} texto="casi al instante" x={720} y={580} tam={40} borde={KC.ink} />
      </Escena>
      {/* 2 · al microscopio: la fibra con forro de grasa, rápida */}
      <Escena T={T} a={K.Fibras} b={K.Dolor} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo><g transform="translate(0 -70)">
          <DefsDolor />
          <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
          <Pie x={30} y={1080} s={1} T={T} nervio={1} rapida={((T - K.Fibras) * 1.1) % 1} />
        </g></Lienzo>
        <Lupa T={T} at={K.Fibras + 0.3} until={K.Dolor - 0.15} x={640} y={760} r={290} fx={30} fy={710} tinte={DL_RAP} etiqueta="AL MICROSCOPIO · NERVIO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <FibraMicro w={r * 2} h={r * 2} y={r + 30} forro p={((t - K.Fibras - 0.6) * 0.9) % 1} color={DL_RAP} />
            {t > K.Fibras + 1.2 && <g opacity={kprog(t, K.Fibras + 1.2, K.Fibras + 1.5)}>
              <line x1={r - 30} y1={r - 14} x2={r - 80} y2={r - 120} stroke="#fff" strokeWidth={5} />
              <text x={r - 80} y={r - 140} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff">forro de grasa</text>
            </g>}
          </svg>} />
        <Chip T={T} at={K.Fibras + 2.2} until={K.Dolor - 0.1} texto="con forro: rápida" x={620} y={420} tam={46} borde={DL_RAP} />
      </Escena>
      {/* 3 · después el dolor sordo: fibra delgada, sin forro, lenta */}
      <Escena T={T} a={K.Dolor} b={K.Velocidad} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo><g transform="translate(0 -70)">
          <DefsDolor />
          <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
          <Pie x={40} y={1080} s={0.95} T={T} sordo={1} nervio={0.6} lenta={kprog(T, K.Dolor + 0.4, K.Velocidad, kEase.suave) * 0.45} />
        </g></Lienzo>
        <Chip T={T} at={K.Dolor + 0.3} until={K.Velocidad - 0.1} texto="dolor sordo: arde y se queda" x={680} y={430} tam={42} borde={DL_LEN} />
        <Lupa T={T} at={K.Dolor + 2.0} until={K.Velocidad - 0.15} x={680} y={770} r={270} fx={300} fy={1080} tinte={DL_LEN} etiqueta="AL MICROSCOPIO · NERVIO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}>
            <g opacity=".35"><FibraMicro w={r * 2} h={r * 2} y={r - 110} forro p={null} color={DL_RAP} /></g>
            <FibraMicro w={r * 2} h={r * 2} y={r + 60} forro={false} grosor={10} p={kprog(t, K.Dolor + 2.6, K.Velocidad + 0.4)} color={DL_LEN} />
            <text x={r} y={r - 170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="rgba(255,255,255,.6)">con forro</text>
            {t > K.Dolor + 3.4 && <text x={r} y={r + 150} textAnchor="middle" opacity={kprog(t, K.Dolor + 3.4, K.Dolor + 3.7)} style={{ font:`700 36px ${KF.mono}` }} fill="#fff">sin forro: lenta</text>}
          </svg>} />
      </Escena>
      {/* 4 · los medidores: hasta decenas de m/s contra ≈ 2 m/s o menos */}
      <Escena T={T} a={K.Velocidad} b={K.Distancia} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {[[850, DL_RAP, 'rápida', (t) => ((t - K.Velocidad - 0.4) * 1.4) % 1, true], [1050, DL_LEN, 'lenta', (t) => kprog(t, K.Velocidad + 3.0, K.Distancia + 1, (p) => p) * 0.9, false]].map(([y, c, nom, f, forro], i) => {
            const p = f(T), on = i === 0 ? T > K.Velocidad + 0.4 : T > K.Velocidad + 3.0;
            return <g key={i} opacity={kprog(T, K.Velocidad + (i ? 2.8 : 0.2), K.Velocidad + (i ? 3.1 : 0.5))}>
              <rect x={60} y={y - 80} width={960} height={160} rx={40} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
              <svg x={60} y={y - 80} width={960} height={160} overflow="hidden"><FibraMicro w={960} h={160} y={95} forro={forro} grosor={forro ? 20 : 10} p={on ? p : null} color={c} x0={20} x1={940} /></svg>
              <text x={90} y={y - 40} style={{ font:`900 34px ${KF.texto}` }} fill={c}>{nom}</text>
            </g>; })}
        </Lienzo>
        <MedidorG T={T} at={K.Velocidad + 0.2} until={K.Distancia - 0.15} v={kprog(T, K.Velocidad + 0.4, K.Velocidad + 0.9, kEase.sale)} etiqueta="con forro" valor="hasta decenas de m/s" y={420} color={DL_RAP} />
        <MedidorG T={T} at={K.Velocidad + 2.8} until={K.Distancia - 0.15} v={0.07 * kprog(T, K.Velocidad + 3.0, K.Velocidad + 5.0)} etiqueta="sin forro" valor="≈ 2 m/s o menos" y={590} color={DL_LEN} />
      </Escena>
      {/* 5 · del dedo al cerebro hay más de un metro */}
      <Escena T={T} a={K.Distancia} b={K.Pregunta} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          {(() => { const R = [[468, 1178], [455, 860], [425, 820], [420, 480], [420, 400]], p = kprog(T, K.Distancia + 0.3, K.Distancia + 2.3, kEase.suave), q = dlPunto(R, p);
            return <g>
              <PersonaSimple x={420} yPies={1190} alto={860} color={KC.pink} cara="normal" />
              <polyline points={dlSub(R, p)} fill="none" stroke="#fff" strokeWidth={30} strokeLinejoin="round" strokeLinecap="round" opacity=".55" />
              <polyline points={dlSub(R, p)} fill="none" stroke={KC.yellow} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" />
              {p > 0 && <Senal x={q[0]} y={q[1]} color={KC.yellow} r={18} />}
              {p >= 1 && <circle cx={420} cy={385} r={60 + 10 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={8} />}
            </g>; })()}
          {(() => { const p = kprog(T, K.Distancia + 1.6, K.Distancia + 2.6, kEase.sale), yT = klerp(1180, 330, p);
            return <g opacity={kprog(T, K.Distancia + 1.5, K.Distancia + 1.7)}>
              <rect x={690} y={yT} width={70} height={1180 - yT} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: Math.floor((1180 - yT) / 42) }, (_, i) => <line key={i} x1={690} y1={1180 - i * 42} x2={690 + (i % 5 ? 22 : 40)} y2={1180 - i * 42} stroke={KC.ink} strokeWidth={4} />)}
            </g>; })()}
          {T > K.Distancia + 2.5 && <g transform={`translate(890 760) scale(${klerp(0.4, 1, kprog(T, K.Distancia + 2.5, K.Distancia + 2.9, kEase.rebote))})`}>
            <TextoSvg x={0} y={0} tam={92} color={KC.yellow}>MÁS DE</TextoSvg>
            <TextoSvg x={0} y={130} tam={150} color={KC.yellow}>1 M</TextoSvg>
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Distancia + 0.4} until={K.Pregunta - 0.15} x={500} y={1150} texto="dedo" lado="der" color={KC.texto} />
        <Etq T={T} at={K.Distancia + 1.2} until={K.Pregunta - 0.15} x={330} y={640} texto="médula" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Distancia + 2.1} until={K.Pregunta - 0.15} x={330} y={390} texto="cerebro" lado="izq" color={KC.texto} />
      </Escena>
      {/* 6 · ¿por qué no sientes todo junto? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Primer} color={KC.orange} />
      <Escena T={T} a={K.Pregunta} b={K.Primer} zoom={0}>
        <Lienzo>
          {[DL_RAP, DL_LEN].map((c, i) => { const a = T * 3 + i * Math.PI; return <Senal key={i} x={330 + Math.cos(a) * 260} y={880 + Math.sin(a) * 150} color={c} r={26} />; })}
        </Lienzo>
      </Escena>
      {/* 7 · la carrera: primero llega la azul, después la roja (como rayo y trueno) */}
      <Escena T={T} a={K.Primer} b={K.Sobar} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        {(() => { const x0 = 262, x1 = 790, pR = kprog(T, K.Primer + 0.3, K.Primer + 1.0, kEase.suave), pL = kprog(T, K.Primer + 0.9, K.Primer + 4.2, (p) => p);
          const llegaR = K.Primer + 1.0, llegaL = K.Primer + 4.2, br = destelloD(T, llegaR) + destelloD(T, llegaL);
          return <Lienzo>
            <DefsDolor />
            {[[790, DL_RAP, pR, 'rápida', true], [1010, DL_LEN, pL, 'lenta', false]].map(([y, c, p, nom, forro], i) => <g key={i}>
              <rect x={205} y={y - 60} width={620} height={120} rx={60} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
              <svg x={205} y={y - 60} width={620} height={120} overflow="hidden"><FibraMicro w={620} h={120} y={60} forro={forro} grosor={forro ? 18 : 9} p={null} color={c} x0={20} x1={600} /></svg>
              <Senal x={klerp(x0, x1, p)} y={y} color={c} r={forro ? 30 : 22} />
              <text x={225} y={y - 76} style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{nom}</text>
            </g>)}
            <g transform="translate(40 880) scale(0.42)"><Pie x={0} y={0} corto T={T} sordo={T > llegaL ? 1 : 0} piquete={piq(K.Primer + 0.3) * 0.8} /></g>
            <Cerebro x={945} y={900} s={0.72} brillo={br} color={T > llegaL - 0.2 ? DL_LEN : DL_RAP} />
            {[[llegaR, '1', DL_RAP, 690], [llegaL, '2', DL_LEN, 1110]].map(([t, n, c, y]) => T > t && <g key={n} transform={`translate(945 ${y}) scale(${klerp(0.3, 1, kprog(T, t, t + 0.3, kEase.rebote))})`}>
              <circle r={46} fill={c} stroke={KC.ink} strokeWidth={8} /><text y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{n}</text></g>)}
            {T > K.Primer + 4.4 && <g opacity={kprog(T, K.Primer + 4.4, K.Primer + 4.7)}>
              <Nube x={380} y={520} s={0.75} color="#3b4466" borde={KC.ink} />
              <polyline points="370,540 345,610 385,605 355,690" fill="none" stroke="#fff7c2" strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" opacity={0.5 + 0.5 * Math.abs(Math.sin(T * 9))} />
            </g>}
            <Onomato T={T} at={K.Primer + 5.2} dur={1.2} x={740} y={580} texto="¡BRRUM!" tam={110} color={KC.yellow} />
          </Lienzo>; })()}
      </Escena>
      {/* 8 · sobarte ayuda un poco: compuerta en la médula (teoría de 1965) */}
      <Escena T={T} a={K.Sobar} b={K.Cierre} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        {(() => { const S0 = K.Sobar, cierra = kprog(T, S0 + 4.6, S0 + 6.0, kEase.suave), vol = 5 - Math.round(2 * kprog(T, S0 + 4.8, S0 + 6.3));
          const soba = T > S0 + 0.3 ? Math.sin((T - S0) * 7) : 0;
          return <Lienzo>
            <DefsDolor />
            <g transform="translate(0 -70)">
            <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
            <Pie x={40} y={1080} s={0.95} T={T} sordo={1 - 0.45 * kprog(T, S0 + 4.8, S0 + 6.3)} />
            {T > S0 + 0.2 && <Mano x={250 + soba * 40} y={1000} s={0.85} rot={-8} />}
            </g>
            <rect x={60} y={380} width={960} height={460} rx={40} fill="rgba(14,15,18,.9)" stroke={KC.ink} strokeWidth={8} />
            <text x={540} y={440} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} letterSpacing="2">POR DENTRO · MÉDULA ESPINAL</text>
            <line x1={90} y1={720} x2={850} y2={720} stroke={DL_LEN} strokeWidth={10} opacity=".6" />
            <line x1={90} y1={570} x2={560} y2={570} stroke={KC.mint} strokeWidth={10} opacity=".6" />
            <path d="M 560 570 Q 600 570 610 640" fill="none" stroke={KC.mint} strokeWidth={10} opacity=".6" />
            <text x={100} y={682} style={{ font:`700 30px ${KF.mono}` }} fill={DL_LEN}>dolor</text>
            <text x={100} y={540} style={{ font:`700 30px ${KF.mono}` }} fill={KC.mint}>tacto</text>
            {Array.from({ length: 6 }, (_, i) => { const f = ((T - S0) * 0.5 + i / 6) % 1, x = klerp(90, 850, f), pasa = x > 640 ? 1 - 0.55 * cierra : 1;
              return <Senal key={i} x={x} y={720} color={DL_LEN} r={16 * pasa} o={pasa} />; })}
            {T > S0 + 4.2 && Array.from({ length: 4 }, (_, i) => { const f = ((T - S0 - 4.2) * 0.7 + i / 4) % 1, pt = dlPunto([[90, 570], [560, 570], [610, 640]], f);
              return <Senal key={i} x={pt[0]} y={pt[1]} color={KC.mint} r={14} o={kprog(T, S0 + 4.2 + i * 0.3, S0 + 4.5 + i * 0.3)} />; })}
            {/* la compuerta */}
            <rect x={610} y={660} width={34} height={60 * (0.15 + 0.85 * cierra)} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <rect x={610} y={780 - 60 * (0.15 + 0.85 * cierra)} width={34} height={60 * (0.15 + 0.85 * cierra)} rx={6} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            <text x={627} y={650} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.yellow}>compuerta</text>
            {/* volumen del dolor */}
            <g transform="translate(880 720)">
              <path d="M -10 -22 L 10 -22 L 34 -44 L 34 44 L 10 22 L -10 22 Z" fill={KC.texto} stroke={KC.ink} strokeWidth={4} />
              {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={48 + k * 16} y={-10 - k * 12} width={10} height={20 + k * 24} rx={3} fill={k < vol ? DL_LEN : 'rgba(255,255,255,.18)'} />)}
            </g>
            <text x={940} y={810} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.texto}>volumen</text>
          </Lienzo>; })()}
        <TarjetaEstudio T={T} at={K.Sobar + 2.0} until={K.Cierre - 0.15} anio="1965" quien="teoría" revista="Melzack y Wall · Science" x={790} y={1020} />
      </Escena>
      {/* 9 · cierre: el mismo golpe, ahora ves las dos señales subir por el nervio */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo><g transform="translate(0 -70)">
          <DefsDolor />
          <rect x={0} y={1190} width={KW} height={KH} fill="#c98a55" stroke={KC.ink} strokeWidth={9} />
          <Mesa x={560} />
          <Pie x={piePos(TOCc)} y={1080} T={T} nervio={kprog(T, C0 + 0.6, C0 + 1.0)} piquete={piq(PIQc)} sordo={kprog(T, SORc, SORc + 0.8)}
            rapida={T > PIQc ? kprog(T, PIQc, PIQc + 0.6, kEase.suave) : null} lenta={T > SORc ? kprog(T, SORc, SORc + 3.4) * 0.9 : null} />
          <Onomato T={T} at={TOCc} dur={1.2} x={470} y={760} texto="¡TOC!" tam={150} color={KC.pink} />
        </g></Lienzo>
        <Chip T={T} at={PIQc} until={K.Outro - 0.1} texto="1 · piquete" x={240} y={460} tam={42} borde={DL_RAP} />
        <Chip T={T} at={SORc} until={K.Outro - 0.1} texto="2 · dolor sordo" x={290} y={570} tam={42} borde={DL_LEN} />
        <Chip T={T} at={C0 + 3.2} until={K.Outro - 0.1} texto="velocidad de tus nervios" x={700} y={900} tam={40} borde={KC.ink} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Dos - 0.1} texto="Te pegas: *dos dolores,* uno tras otro." />
      <Subtitulo T={T} idx={1} at={K.Dos + 0.1} until={K.Fibras - 0.1} texto="Primero: *un piquete agudo.*" />
      <Subtitulo T={T} idx={2} at={K.Fibras + 0.1} until={K.Dolor - 0.1} texto="Fibras *con forro de grasa:* rápidas." />
      <Subtitulo T={T} idx={3} at={K.Dolor + 0.1} until={K.Velocidad - 0.1} texto="Luego el *dolor sordo:* fibra lenta." />
      <Subtitulo T={T} idx={4} at={K.Velocidad + 0.1} until={K.Distancia - 0.1} texto="*Decenas de m/s* contra *≈ 2 m/s.*" />
      <Subtitulo T={T} idx={5} at={K.Distancia + 0.1} until={K.Pregunta - 0.1} texto="Del pie al cerebro: *más de 1 metro.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Primer - 0.1} texto="¿Por qué no *todo junto?*" />
      <Subtitulo T={T} idx={7} at={K.Primer + 0.1} until={K.Sobar - 0.1} texto="Primero el rápido… *luego el lento.*" />
      <Subtitulo T={T} idx={8} at={K.Sobar + 0.1} until={K.Cierre - 0.1} texto="Sobarte *sí ayuda un poco.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Es la *velocidad de tus nervios.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Dos - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Fibras + 2.6, K.Dolor - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Dolor + 3.6, K.Velocidad - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Velocidad + 3.4, K.Distancia - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Primer - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Primer + 2.0, K.Sobar - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Sobar + 0.6, K.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 1.2, K.Outro - 0.1, 'avatar_12_perfil_serio', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="32" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
// Medidor grande (html): etiqueta, valor escrito y barra.
function MedidorG({ T, at, until, v, etiqueta, valor, y, color }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top:y, width:940, zIndex:42, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
      <span style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{etiqueta}</span>
      <span style={{ font:`400 62px ${KF.titulo}`, color, WebkitTextStroke:`2px ${KC.ink}`, textShadow:`4px 4px 0 ${KC.ink}` }}>{valor}</span>
    </div>
    <div style={{ height:44, borderRadius:22, background:'rgba(0,0,0,.6)', border:`5px solid ${KC.ink}`, overflow:'hidden' }}>
      <div style={{ width:`${kclamp(v, 0, 1) * 100}%`, minWidth: v > 0 ? 30 : 0, height:'100%', background:color, boxShadow:`0 0 24px ${color}` }}></div>
    </div>
  </div>;
}
// Brillo de llegada que se apaga.
const destelloD = (T, t) => (T < t ? 0 : Math.exp(-(T - t) * 2.5));
function DolorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Dolor /></CompositionStage></div>;
}
window.DolorApp = DolorApp;
