// Shot Científico #23 · El helio no cambia tu nota: cambia tu timbre — NARRADO (N1 "Por dentro" + N2 casi 3 veces más rápido).
// Datos: UNSW (Wolfe, "Speech and helium speech"), Sprott (Wisconsin), HKUST Science Focus, Missouri Poison Center. Ver guion.md y verificacion.md.
// Dibujo esquemático: las gráficas de picos, las ondas y el tubo no van a escala.
const HE_AIRE = KC.cyan, HE_HELIO = KC.pink, HE_SF6 = KC.violet, HE_TUBO = '#c2456b';
// Cabeza del shot (gancho, tubo y cierre).
const HC = { x: 360, y: 820, s: 1.35 };
// Recorrido del tubo (garganta → boca) en coordenadas locales de CabezaPerfil.
const TUBO_PTS = [[25, 228], [25, 140], [42, 102], [85, 88], [150, 100]];
function enTubo(f) {
  const L = []; let tot = 0;
  for (let i = 1; i < TUBO_PTS.length; i++) { const d = Math.hypot(TUBO_PTS[i][0] - TUBO_PTS[i - 1][0], TUBO_PTS[i][1] - TUBO_PTS[i - 1][1]); L.push(d); tot += d; }
  let r = kclamp(f, 0, 1) * tot;
  for (let i = 0; i < L.length; i++) { if (r <= L[i] || i === L.length - 1) { const q = L[i] ? r / L[i] : 0; return [klerp(TUBO_PTS[i][0], TUBO_PTS[i + 1][0], q), klerp(TUBO_PTS[i][1], TUBO_PTS[i + 1][1], q)]; } r -= L[i]; }
  return TUBO_PTS[TUBO_PTS.length - 1];
}
// El tubo de la voz dibujado dentro de la cabeza (va como children de CabezaPerfil). luz 0..1 lo hace brillar; ondas 0..1 = pulsos que rebotan.
function TuboVoz({ T, o = 1, luz = 0, ondas = 0, color = KC.yellow }) {
  if (o <= 0.01) return null;
  const pts = TUBO_PTS.map((p) => p.join(',')).join(' ');
  return <g opacity={o}>
    {luz > 0 && <polyline points={pts} fill="none" stroke={color} strokeWidth={62} strokeLinejoin="round" strokeLinecap="round" opacity={0.35 * luz * (0.8 + 0.2 * Math.sin(T * 6))} />}
    <polyline points={pts} fill="none" stroke={KC.ink} strokeWidth={40} strokeLinejoin="round" strokeLinecap="round" />
    <polyline points={pts} fill="none" stroke={HE_TUBO} strokeWidth={28} strokeLinejoin="round" strokeLinecap="round" />
    <polyline points={pts} fill="none" stroke="#5a1f22" strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" opacity=".6" />
    {/* cuerdas vocales al fondo del tubo */}
    <line x1={8} y1={205 + Math.sin(T * 40) * 3} x2={42} y2={205 - Math.sin(T * 40) * 3} stroke="#f6d6d9" strokeWidth={8} strokeLinecap="round" />
    {ondas > 0 && Array.from({ length: 5 }, (_, i) => { const ph = (T * 0.7 + i / 5) % 1, f = ph < 0.5 ? ph * 2 : 2 - ph * 2; const [x, y] = enTubo(f);
      return <circle key={i} cx={x} cy={y} r={9 + 6 * Math.sin(ph * Math.PI)} fill={color} stroke={KC.ink} strokeWidth={3} opacity={ondas} />; })}
  </g>;
}
// Globo de helio. des 0..1 = qué tanto se desinfló.
function Globo({ x, y, r = 100, T = 0, des = 0, color = KC.pink, etiqueta = 'He', cuerda = 260 }) {
  const s = 1 - 0.45 * des, w = Math.sin(T * 9) * 6 * des;
  return <g transform={`translate(${x} ${y}) rotate(${w})`}>
    <path d={`M 0 ${r * 1.12 * s} q 30 ${cuerda * 0.3} -10 ${cuerda * 0.6} t 10 ${cuerda * 0.4}`} fill="none" stroke={KC.ink} strokeWidth={5} />
    <g transform={`scale(${s * (1 + 0.04 * Math.sin(T * 3))}, ${s})`}>
      <ellipse cx={0} cy={0} rx={r} ry={r * 1.12} fill={color} stroke={KC.ink} strokeWidth={9} />
      <ellipse cx={-r * 0.38} cy={-r * 0.45} rx={r * 0.18} ry={r * 0.3} fill="#fff" opacity=".45" transform={`rotate(-25 ${-r * 0.38} ${-r * 0.45})`} />
      <path d={`M -14 ${r * 1.1} L 14 ${r * 1.1} L 0 ${r * 1.1 + 18} Z`} fill={color} stroke={KC.ink} strokeWidth={5} />
      {etiqueta && <text x={0} y={r * 0.18} textAnchor="middle" style={{ font:`400 ${r * 0.62}px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{etiqueta}</text>}
    </g>
  </g>;
}
// Tanque de gas.
function Tanque({ x, y, s = 1, color = KC.lilac, etiqueta }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-250} width={44} height={50} fill="#888" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-262} width={120} height={24} rx={8} fill="#aaa" stroke={KC.ink} strokeWidth={7} />
    <rect x={-110} y={-210} width={220} height={420} rx={90} fill={color} stroke={KC.ink} strokeWidth={10} />
    <rect x={-80} y={-170} width={30} height={330} rx={15} fill="#fff" opacity=".3" />
    {etiqueta && <><rect x={-90} y={-40} width={180} height={90} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={30} textAnchor="middle" style={{ font:`400 66px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text></>}
  </g>;
}
// Cuerdas vocales vistas desde arriba (dos pliegues en V que se abren y cierran).
function CuerdasArriba({ x, y, s = 1, T = 0, vel = 9 }) {
  const g = 18 + 30 * Math.abs(Math.sin(T * vel));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={250} ry={300} fill="#7a2840" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={10} rx={200} ry={250} fill="#a8385a" />
    <path d={`M 0 -200 L ${-g} 200 L ${g} 200 Z`} fill="#1a0610" />
    <path d={`M -4 -205 L ${-g - 4} 205 L -140 200 Q -150 0 -60 -190 Z`} fill="#f6d6d9" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M 4 -205 L ${g + 4} 205 L 140 200 Q 150 0 60 -190 Z`} fill="#f6d6d9" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M -30 -120 Q ${-g * 0.7 - 40} 40 ${-g - 30} 170`} fill="none" stroke="#e8a9b4" strokeWidth={8} strokeLinecap="round" />
    <path d={`M 30 -120 Q ${g * 0.7 + 40} 40 ${g + 30} 170`} fill="none" stroke="#e8a9b4" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
// Onda continua (osciloscopio). forma(u) con u en radianes; periodo en px.
function OndaLinea({ x, y, ancho, periodo = 120, amp = 60, fase = 0, forma, color = KC.yellow, grosor = 9, p = 1 }) {
  const N = 180, pts = [];
  for (let i = 0; i <= N * p; i++) { const px = i / N * ancho, u = (px / periodo) * 2 * Math.PI + fase; pts.push(`${(x + px).toFixed(1)},${(y - amp * (forma ? forma(u) : Math.sin(u))).toFixed(1)}`); }
  if (pts.length < 2) return null;
  return <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={grosor} strokeLinejoin="round" strokeLinecap="round" />;
}
// Espectro esquemático: barras = armónicos (los pone la cuerda vocal, separación fija); curva = picos que refuerza el tubo.
// f = cuánto se recorren los picos (1 = aire, > 1 helio, < 1 gas pesado). p = crecimiento.
const PICOS = [[0.17, 1, 0.055], [0.43, 0.78, 0.06], [0.69, 0.55, 0.065]];
function envolvente(u, f) { return 0.07 + PICOS.reduce((a, [c, h, w]) => a + h * Math.exp(-((u - c * f) ** 2) / (2 * (w * f) ** 2)), 0); }
function Espectro({ x, y, w, h, f = 1, p = 1, T = 0, fantasma = false, curva = 1, color = KC.yellow, barra = HE_AIRE, etiquetas = true }) {
  const n = 18, paso = (w - 60) / n, cur = [];
  for (let i = 0; i <= 120; i++) { const u = i / 120; cur.push(`${(x + 30 + u * (w - 60)).toFixed(1)},${(y + h - 30 - (h - 70) * envolvente(u, f) * p).toFixed(1)}`); }
  const fan = []; for (let i = 0; i <= 120; i++) { const u = i / 120; fan.push(`${(x + 30 + u * (w - 60)).toFixed(1)},${(y + h - 30 - (h - 70) * envolvente(u, 1)).toFixed(1)}`); }
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={30} fill="rgba(10,12,20,.88)" stroke={KC.ink} strokeWidth={8} />
    <line x1={x + 30} y1={y + h - 30} x2={x + w - 30} y2={y + h - 30} stroke="rgba(255,255,255,.35)" strokeWidth={4} />
    {Array.from({ length: n }, (_, i) => { const u = (i + 0.5) / n, bh = (h - 70) * envolvente(u, f) * p * (0.94 + 0.06 * Math.sin(T * 9 + i));
      return <rect key={i} x={x + 30 + i * paso + paso * 0.25} y={y + h - 30 - bh} width={paso * 0.5} height={bh} rx={6} fill={barra} stroke={KC.ink} strokeWidth={3} />; })}
    {fantasma && <polyline points={fan.join(' ')} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="14 12" opacity=".55" />}
    {curva > 0 && <polyline points={cur.slice(0, Math.max(2, Math.ceil(cur.length * curva))).join(' ')} fill="none" stroke={color} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />}
    {etiquetas && <><text x={x + 30} y={y + h + 46} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">graves</text>
      <text x={x + w - 30} y={y + h + 46} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">agudos</text></>}
  </g>;
}
// Texto chillón que tiembla letra por letra.
function Chillon({ x, y, texto, T, tam = 120, color = KC.yellow, o = 1, s = 1, temblor = 1, rot = -6 }) {
  const letras = [...texto], an = letras.map((c) => (c === '¡' || c === '!' ? 0.3 : 0.45) * tam), tot = an.reduce((a, b) => a + b, 0);
  const cx = an.map((w, i) => an.slice(0, i).reduce((a, b) => a + b, 0) + w / 2 - tot / 2);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {letras.map((c, i) => <text key={i} x={cx[i]} y={Math.sin(T * 26 + i * 1.7) * 10 * temblor} textAnchor="middle"
      transform={`rotate(${Math.sin(T * 21 + i * 2.3) * 9 * temblor} ${cx[i]} 0)`}
      style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={tam / 9} paintOrder="stroke" strokeLinejoin="round">{c}</text>)}
  </g>;
}
// Nota musical (corchea).
function NotaMusical({ x, y, s = 1, color = KC.ink, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={0} rx={34} ry={24} transform="rotate(-22)" fill={color} stroke={KC.ink} strokeWidth={5} />
    <line x1={30} y1={-8} x2={30} y2={-170} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <path d="M 30 -170 Q 80 -140 72 -80 Q 66 -120 30 -125" fill={KC.ink} />
  </g>;
}
// Señal de «prohibido» encima de algo.
function Prohibido({ x, y, r = 140, o = 1 }) {
  return <g opacity={o}><circle cx={x} cy={y} r={r} fill="none" stroke={KC.red} strokeWidth={26} />
    <line x1={x - r * 0.7} y1={y - r * 0.7} x2={x + r * 0.7} y2={y + r * 0.7} stroke={KC.red} strokeWidth={26} strokeLinecap="round" /></g>;
}
// Pulmones con bolitas de oxígeno que el helio va desplazando (cambio 0..1).
function Pulmones({ x, y, s = 1, cambio = 0, T = 0 }) {
  const lobulo = 'M -20 -150 C -90 -160 -170 -60 -170 70 C -170 160 -110 190 -40 170 C -15 160 -15 120 -15 60 Z';
  const g = krng(23), pts = Array.from({ length: 22 }, (_, i) => { const lado = i % 2 ? 1 : -1; return [lado * (45 + g() * 95), -90 + g() * 230, g()]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-16} y={-260} width={32} height={130} rx={14} fill="#f7b7c8" stroke={KC.ink} strokeWidth={7} />
    <path d={lobulo} fill="#f7b7c8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d={lobulo} fill="#f7b7c8" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" transform="scale(-1 1)" />
    {pts.map(([px, py, q], i) => { const he = cambio > q * 0.85 + 0.05;
      return <circle key={i} cx={px + Math.sin(T * 3 + i) * 4} cy={py + Math.cos(T * 2.6 + i) * 4} r={17} fill={he ? KC.gold2 : HE_AIRE} stroke={KC.ink} strokeWidth={4} />; })}
  </g>;
}
// Carril de la carrera del sonido. prog 0..1 = dónde va el frente.
function Carril({ y, prog, color, nombre, T, globo = false }) {
  const x0 = 150, x1 = 950, fx = klerp(x0, x1, prog);
  return <g>
    <rect x={90} y={y - 95} width={900} height={190} rx={40} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
    <line x1={x1 + 10} y1={y - 95} x2={x1 + 10} y2={y + 95} stroke={KC.ink} strokeWidth={8} strokeDasharray="18 12" />
    {Array.from({ length: 6 }, (_, i) => { const xx = fx - i * 46; if (xx < x0) return null;
      return <path key={i} d={`M ${xx - 22} ${y - 60} Q ${xx + 22} ${y} ${xx - 22} ${y + 60}`} fill="none" stroke={i ? color : KC.ink} strokeWidth={i ? 10 : 14} strokeLinecap="round" opacity={1 - i * 0.15} />; })}
    <path d={`M ${fx - 22} ${y - 60} Q ${fx + 22} ${y} ${fx - 22} ${y + 60}`} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
    <text x={110} y={y - 115} style={{ font:`900 42px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
    {prog >= 1 && <text x={x1 - 10} y={y - 110} textAnchor="end" style={{ font:`400 52px ${KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">¡LLEGÓ!</text>}
  </g>;
}

function Helio() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const habla = (a, b) => (T > a && T < b ? 0.5 + 0.5 * Math.sin(T * 17) : 0);
  const BOCA = [HC.x + 150 * HC.s, HC.y + 100 * HC.s], CUELLO = [HC.x + 25 * HC.s, HC.y + 205 * HC.s];
  // carrera: el helio llega en 1.6 s; el aire va casi 3 veces más lento
  const C0 = K.Helio + 0.6, CD = 1.6, pHe = kprog(T, C0, C0 + CD), pAire = kprog(T, C0, C0 + CD * 2.9);
  // picos que se recorren
  const fSube = klerp(1, 1.65, kprog(T, K.Sube + 0.6, K.Sube + 2.6, kEase.suave));
  const fBaja = klerp(1, 0.62, kprog(T, K.Pesado + 2.6, K.Pesado + 4.6, kEase.suave));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el globo se desinfla, la voz sale chillona; no son tus cuerdas: es el tubo */}
      <Escena T={T} a={K.Gancho} b={K.Cuerdas} origen="40% 55%">
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Globo x={130} y={470} r={90} T={T} des={kprog(T, 0, 2.2, kEase.sale)} color={KC.yellow} cuerda={200} />
          <CabezaPerfil x={HC.x} y={HC.y} s={HC.s} boca={habla(0.1, K.Cuerdas)} gesto="mueca" corte={0}>
            <TuboVoz T={T} o={kprog(T, K.Gancho + 3.3, K.Gancho + 3.8)} luz={kprog(T, K.Gancho + 3.6, K.Gancho + 4.2)} ondas={kprog(T, K.Gancho + 3.8, K.Gancho + 4.3)} />
          </CabezaPerfil>
          <OndasArco x={BOCA[0] + 20} y={BOCA[1]} ang={-10} T={T * 1.8} color={KC.yellow} largo={200} />
          <Chillon x={830} y={1010} texto="¡HOLA!" T={T} tam={120} s={klerp(0.3, 1, kprog(T, 0.15, 0.55, kEase.rebote))} />
          {T > K.Gancho + 1.2 && T < K.Gancho + 3.4 && <g opacity={kprog(T, K.Gancho + 1.2, K.Gancho + 1.5)}>
            <circle cx={CUELLO[0]} cy={CUELLO[1]} r={46} fill="none" stroke={KC.ink} strokeWidth={14} /><circle cx={CUELLO[0]} cy={CUELLO[1]} r={46} fill="none" stroke="#fff" strokeWidth={7} />
            <path d={`M ${CUELLO[0] - 30} ${CUELLO[1] - 30} L ${CUELLO[0] + 30} ${CUELLO[1] + 30} M ${CUELLO[0] + 30} ${CUELLO[1] - 30} L ${CUELLO[0] - 30} ${CUELLO[1] + 30}`} stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Gancho + 1.2} until={K.Gancho + 3.3} texto="no son tus cuerdas" x={430} y={400} tam={38} borde={KC.red} />
        <Chip T={T} at={K.Gancho + 3.6} until={K.Cuerdas - 0.1} texto="es el tubo" x={420} y={400} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 1 · por dentro: las cuerdas vocales vibran */}
      <Escena T={T} a={K.Cuerdas} b={K.Tubo} fondo={KC.noche}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={18} color="rgba(255,255,255,.12)" />
        <Lienzo>
          <g transform={`translate(540 690) scale(${klerp(0.15, 1, kprog(T, K.Cuerdas - 0.3, K.Cuerdas + 0.6, kEase.sale))}) translate(-540 -690)`}>
            <CuerdasArriba x={540} y={690} s={0.9} T={T} vel={11} />
          </g>
          <g opacity={kprog(T, K.Cuerdas + 1.8, K.Cuerdas + 2.3)}>
            <rect x={90} y={1000} width={900} height={150} rx={30} fill="rgba(10,12,20,.85)" stroke={KC.yellow} strokeWidth={5} />
            <OndaLinea x={120} y={1075} ancho={840} periodo={95} amp={48} fase={-T * 14} p={kprog(T, K.Cuerdas + 1.8, K.Cuerdas + 2.8)} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Cuerdas + 0.4} until={K.Cuerdas + 2.3} texto="POR DENTRO · TU GARGANTA" x={540} y={330} tam={36} borde={HE_AIRE} mono />
        <Etq T={T} at={K.Cuerdas + 0.9} until={K.Tubo - 0.2} x={570} y={420} texto="cuerdas vocales" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Cuerdas + 2.4} until={K.Tubo - 0.1} texto="vibraciones por segundo = tono" x={540} y={330} tam={36} borde={KC.yellow} />
      </Escena>

      {/* 2 · garganta y boca: un tubo que refuerza frecuencias */}
      <Escena T={T} a={K.Tubo} b={K.Timbre} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CabezaPerfil x={HC.x} y={HC.y} s={HC.s} boca={habla(K.Tubo, K.Timbre)} corte={0.25}>
            <TuboVoz T={T} o={1} luz={kprog(T, K.Tubo + 1.4, K.Tubo + 2)} ondas={kprog(T, K.Tubo + 0.5, K.Tubo + 1)} />
          </CabezaPerfil>
          <OndasArco x={BOCA[0] + 20} y={BOCA[1]} ang={-10} T={T} color={KC.yellow} largo={200} o={kprog(T, K.Tubo + 1, K.Tubo + 1.5)} />
          {T > K.Tubo + 2.2 && <g transform={`translate(800 600) scale(${klerp(0.3, 1, kprog(T, K.Tubo + 2.2, K.Tubo + 2.6, kEase.rebote))})`}>
            <rect x={-170} y={-60} width={340} height={120} rx={20} fill={HE_TUBO} stroke={KC.ink} strokeWidth={9} />
            <rect x={-150} y={-40} width={300} height={80} rx={12} fill="#5a1f22" />
            <OndaLinea x={-150} y={0} ancho={300} periodo={150} amp={30 * Math.sin(T * 12)} color={KC.yellow} grosor={7} />
            <text x={0} y={-90} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>= un tubo</text>
          </g>}
        </Lienzo>
        <Etq T={T} at={K.Tubo + 0.6} until={K.Tubo + 3.2} x={CUELLO[0] - 40} y={CUELLO[1] - 70} texto="garganta" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Tubo + 1.0} until={K.Tubo + 3.2} x={BOCA[0] + 50} y={BOCA[1] + 70} texto="boca" lado="der" color={KC.texto} />
        <Chip T={T} at={K.Tubo + 3.4} until={K.Timbre - 0.1} texto="refuerza ciertas frecuencias" x={540} y={330} tam={40} borde={KC.yellow} />
      </Escena>

      {/* 3 · timbre: la gráfica de picos = el color de tu voz */}
      <Escena T={T} a={K.Timbre} b={K.Helio} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Espectro x={90} y={680} w={900} h={400} T={T} p={kprog(T, K.Timbre + 0.2, K.Timbre + 1.2, kEase.sale)} curva={kprog(T, K.Timbre + 1.2, K.Timbre + 2.4)} />
          {T > K.Timbre + 2.6 && <TextoSvg x={680} y={630} tam={68} color={KC.yellow} s={klerp(0.4, 1, kprog(T, K.Timbre + 2.6, K.Timbre + 3, kEase.rebote))}>EL COLOR DE TU VOZ</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Timbre + 0.3} until={K.Timbre + 2.5} texto="frecuencias reforzadas" x={640} y={460} tam={40} borde={KC.yellow} />
        <Etq T={T} at={K.Timbre + 1.6} until={K.Helio - 0.2} x={560} y={790} texto="picos = timbre" lado="der" color={KC.yellow} />
      </Escena>

      {/* 4 · en el helio el sonido corre casi 3 veces más rápido */}
      <Escena T={T} a={K.Helio} b={K.Sube} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Carril y={740} prog={pAire} color={HE_AIRE} nombre="en aire" T={T} />
          <Carril y={1010} prog={pHe} color={HE_HELIO} nombre="en helio" T={T} />
          {T > C0 + CD && <TextoSvg x={760} y={520} tam={170} color={HE_HELIO} rot={-5} s={klerp(0.3, 1, kprog(T, C0 + CD, C0 + CD + 0.4, kEase.rebote))}>≈ 3×</TextoSvg>}
        </Lienzo>
        <Chip T={T} at={K.Helio + 0.2} until={C0 + CD - 0.5} texto="carrera del sonido" x={540} y={400} tam={42} borde={KC.ink} />
              </Escena>

      {/* 5 · suben los picos: voz chillona */}
      <Escena T={T} a={K.Sube} b={K.Pregunta} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Espectro x={90} y={680} w={900} h={400} T={T} f={fSube} fantasma barra={HE_HELIO} />
          {T > K.Sube + 0.8 && T < K.Sube + 3.2 && <FlechaRecta x1={330} y1={610} x2={330 + 380 * kprog(T, K.Sube + 0.8, K.Sube + 2.4, kEase.sale)} y2={610} p={1} color={KC.yellow} />}
          {T > K.Sube + 0.8 && T < K.Sube + 3.2 && <text x={340} y={570} style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={8} paintOrder="stroke">más agudo</text>}
          {T > K.Sube + 3.2 && <Chillon x={560} y={470} texto="¡HOLAAA!" T={T} tam={100} color={KC.yellow} s={klerp(0.3, 1, kprog(T, K.Sube + 3.2, K.Sube + 3.6, kEase.rebote))} rot={-3} />}
        </Lienzo>
        <Chip T={T} at={K.Sube + 0.2} until={K.Sube + 3.0} texto="con helio" x={200} y={420} tam={40} borde={HE_HELIO} />
              </Escena>

      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Igual} color={KC.orange} />

      {/* 7 · la nota casi no cambia; cambia el color de la onda */}
      <Escena T={T} a={K.Igual} b={K.Pesado} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={100} y1={520 + i * 40} x2={980} y2={520 + i * 40} stroke={KC.ink} strokeWidth={5} />)}
          <text x={110} y={670} style={{ font:`400 190px ${KF.titulo}` }} fill={KC.ink}>𝄞</text>
          <NotaMusical x={420} y={600} s={1.1} color={HE_AIRE} o={kprog(T, K.Igual + 0.2, K.Igual + 0.5)} />
          <NotaMusical x={760} y={600} s={1.1} color={HE_HELIO} o={kprog(T, K.Igual + 1.0, K.Igual + 1.3)} />
          {T > K.Igual + 1.2 && <line x1={460} y1={600} x2={720} y2={600} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" opacity={kprog(T, K.Igual + 1.2, K.Igual + 1.6)} />}
          <text x={440} y={780} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Igual + 0.2, K.Igual + 0.5)}>en aire</text>
          <text x={780} y={780} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Igual + 1.0, K.Igual + 1.3)}>en helio</text>
          <g opacity={kprog(T, K.Igual + 2.4, K.Igual + 2.9)}>
            <rect x={90} y={830} width={900} height={350} rx={30} fill="rgba(10,12,20,.85)" stroke={KC.ink} strokeWidth={8} />
            {[0, 1, 2, 3].map((i) => <line key={i} x1={130 + i * 260} y1={845} x2={130 + i * 260} y2={1165} stroke="rgba(255,255,255,.3)" strokeWidth={4} strokeDasharray="10 10" />)}
            <OndaLinea x={130} y={925} ancho={780} periodo={260} amp={55} fase={-T * 4} color={HE_AIRE} forma={(u) => (Math.sin(u) + 0.3 * Math.sin(2 * u)) / 1.2} />
            <OndaLinea x={130} y={1085} ancho={780} periodo={260} amp={55} fase={-T * 4} color={HE_HELIO} forma={(u) => (Math.sin(u) + 0.55 * Math.sin(3 * u) + 0.4 * Math.sin(5 * u)) / 1.5} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Igual + 0.3} until={K.Igual + 2.6} texto="casi la misma nota" x={540} y={420} tam={42} borde={KC.ink} />
        <Chip T={T} at={K.Igual + 2.8} until={K.Pesado - 0.1} texto="cambia el color del sonido" x={540} y={420} tam={40} borde={HE_HELIO} />
      </Escena>

      {/* 8 · gas pesado: al revés, los picos bajan y la voz suena grave */}
      <Escena T={T} a={K.Pesado} b={K.Peligro} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Pesado + 0.1, K.Pesado + 0.7, kEase.rebote)) * 900})`}>
            <Tanque x={230} y={560} s={0.8} color={HE_SF6} etiqueta="SF₆" />
          </g>
          <g opacity={kprog(T, K.Pesado + 2.2, K.Pesado + 2.6)}>
            <Espectro x={90} y={830} w={900} h={290} T={T} f={fBaja} fantasma barra={KC.lilac} color={KC.yellow} etiquetas={false} />
            {T > K.Pesado + 2.8 && <FlechaRecta x1={760} y1={790} x2={760 - 360 * kprog(T, K.Pesado + 2.8, K.Pesado + 4.4, kEase.sale)} y2={790} p={1} color={KC.yellow} />}
          </g>
        </Lienzo>
        <Etq T={T} at={K.Pesado + 0.8} until={K.Pesado + 3.2} x={350} y={480} texto="hexafluoruro de azufre" lado="der" color={KC.texto} tam={32} />
        <Chip T={T} at={K.Pesado + 1.2} until={K.Pesado + 3.2} texto="mucho más pesado" x={660} y={640} tam={40} borde={HE_SF6} />
        <Chip T={T} at={K.Pesado + 3.4} until={K.Peligro - 0.1} texto="sonido más lento = voz grave" x={660} y={640} tam={36} borde={KC.yellow} />
      </Escena>

      {/* 9 · peligro: no respires helio */}
      <Escena T={T} a={K.Peligro} b={K.Cierre} fondo={KC.yellow} zoom={0.02}>
        <FondoMarca color={KC.yellow} patron="rayas" />
        <Lienzo>
          <g transform={`translate(540 560) scale(${klerp(0.3, 1, kprog(T, K.Peligro, K.Peligro + 0.4, kEase.rebote)) * (1 + 0.04 * Math.sin(T * 8))}) translate(-540 -560)`}>
            <Alerta x={540} y={560} s={2.1} color={KC.orange} />
          </g>
          {T < K.Peligro + 3.6 && <g opacity={1 - kprog(T, K.Peligro + 3.3, K.Peligro + 3.6)}>
            <TextoSvg x={540} y={820} tam={92} color={KC.red} s={klerp(0.4, 1, kprog(T, K.Peligro + 0.4, K.Peligro + 0.8, kEase.rebote))}>¡NO LO RESPIRES!</TextoSvg>
            <g opacity={kprog(T, K.Peligro + 0.9, K.Peligro + 1.2)}><Globo x={310} y={990} r={80} T={T} color={KC.pink} cuerda={90} />
              <Prohibido x={310} y={1020} r={140} o={kprog(T, K.Peligro + 1.2, K.Peligro + 1.4)} /></g>
            <g opacity={kprog(T, K.Peligro + 1.6, K.Peligro + 1.9)}><Tanque x={770} y={1030} s={0.48} color={KC.lilac} etiqueta="He" />
              <Prohibido x={770} y={1020} r={140} o={kprog(T, K.Peligro + 1.9, K.Peligro + 2.1)} /></g>
          </g>}
          {T > K.Peligro + 3.4 && <g opacity={kprog(T, K.Peligro + 3.4, K.Peligro + 3.8)}>
            <Pulmones x={540} y={1010} s={0.75} T={T} cambio={kprog(T, K.Peligro + 3.8, K.Peligro + 5.6)} />
            <circle cx={110} cy={920} r={22} fill={HE_AIRE} stroke={KC.ink} strokeWidth={5} />
            <text x={145} y={934} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>oxígeno</text>
            <g opacity={kprog(T, K.Peligro + 4.0, K.Peligro + 4.3)}><circle cx={790} cy={920} r={22} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
            <text x={825} y={934} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>helio</text></g>
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Peligro + 3.6} until={K.Cierre - 0.1} texto="desplaza el oxígeno" x={540} y={750} tam={46} borde={KC.red} />
      </Escena>

      {/* 10 · cierre: el globo del inicio, ahora con la nota fija y el timbre de color */}
      <Escena T={T} a={K.Cierre} b={FIN} origen="40% 55%">
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Globo x={130} y={470} r={90} T={T} des={1} color={KC.yellow} cuerda={200} />
          <CabezaPerfil x={HC.x} y={HC.y} s={HC.s} boca={habla(K.Cierre, K.Outro)} gesto="sonrie" corte={0}>
            <TuboVoz T={T} o={1} luz={1} ondas={1} />
          </CabezaPerfil>
          <OndasArco x={BOCA[0] + 20} y={BOCA[1]} ang={-10} T={T * 1.8} color={HE_HELIO} largo={200} n={3} />
          <OndasArco x={BOCA[0] + 20} y={BOCA[1]} ang={-10} T={T * 1.8 + 0.17} color={KC.yellow} largo={200} n={3} />
          <NotaMusical x={820} y={900} s={1.2} color={KC.yellow} o={kprog(T, K.Cierre + 0.5, K.Cierre + 0.9)} />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.4} until={K.Outro - 0.1} texto="misma nota · otro timbre" x={470} y={400} tam={42} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Cuerdas - 0.1} texto="No son tus cuerdas: *es el tubo.*" />
      <Subtitulo T={T} idx={1} at={K.Cuerdas + 0.1} until={K.Tubo - 0.1} texto="El tono: *tus cuerdas vocales.*" />
      <Subtitulo T={T} idx={2} at={K.Tubo + 0.1} until={K.Timbre - 0.1} texto="Garganta y boca: *un tubo.*" />
      <Subtitulo T={T} idx={3} at={K.Timbre + 0.1} until={K.Helio - 0.1} texto="El timbre: *el color de tu voz.*" />
      <Subtitulo T={T} idx={4} at={K.Helio + 0.1} until={K.Sube - 0.1} texto="En helio: *casi 3 veces más rápido.*" />
      <Subtitulo T={T} idx={5} at={K.Sube + 0.1} until={K.Pregunta - 0.1} texto="Suben las frecuencias: *voz chillona.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Igual - 0.1} texto="¿Y *la nota?*" />
      <Subtitulo T={T} idx={7} at={K.Igual + 0.1} until={K.Pesado - 0.1} texto="Casi igual: *cambia el color.*" />
      <Subtitulo T={T} idx={8} at={K.Pesado + 0.1} until={K.Peligro - 0.1} texto="Gas pesado: *voz grave.*" />
      <Subtitulo T={T} idx={9} at={K.Peligro + 0.1} until={K.Cierre - 0.1} texto="No respires helio: *es peligroso.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Con helio: *cambias de timbre.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Cuerdas + 2.5, K.Tubo - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Timbre + 1.0, K.Helio - 0.2, 'avatar_08_recostado_mano', 'izq-alto'],
        [K.Helio + 1.4, K.Sube - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Sube + 2.4, K.Pregunta - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Igual + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pesado + 1.0, K.Pesado + 5.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Peligro + 0.8, K.Cierre - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="23" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function HelioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Helio /></CompositionStage></div>;
}
window.HelioApp = HelioApp;
