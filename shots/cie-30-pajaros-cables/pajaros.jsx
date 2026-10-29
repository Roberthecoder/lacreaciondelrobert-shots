// Shot Científico #30 · Por qué los pájaros en los cables no se electrocutan — NARRADO (N1 "Por dentro" + N6 mito).
// Datos: explicación de física (APS / Scientific American), APLIC 2006 (aves y líneas eléctricas), seguridad ante cables caídos.
// Ver guion.md y verificacion.md. Dibujo esquemático: tamaños, distancias y corriente (bolitas) no van a escala.
const PJ_CAFE = '#9a6136', PJ_PECHO = '#f3d9a8', PJ_ALA = '#6e3f1f', PJ_MADERA = '#8a5a33', PJ_CABLE = '#23262e', PJ_COBRE = '#d9822b';
const PJ_POSTES = [-240, 150, 930, 1320];

// Altura de un cable colgado entre postes (catenaria simple). y0 = altura en los postes.
function cableY(x, y0, sag = 46) {
  for (let i = 0; i < PJ_POSTES.length - 1; i++) {
    const a = PJ_POSTES[i], b = PJ_POSTES[i + 1];
    if (x >= a && x <= b) { const u = (x - a) / (b - a); return y0 + sag * 4 * u * (1 - u); }
  }
  return y0;
}
const cablePath = (y0, sag = 46) => { let d = ''; for (let x = -240; x <= 1320; x += 20) d += `${d ? 'L' : 'M'} ${x} ${cableY(x, y0, sag).toFixed(1)} `; return d; };

// Bolitas de corriente que corren a lo largo de una curva y(x).
function Flujo({ T, yDe, n = 22, vel = 260, x0 = -40, x1 = 1120, r = 9, color = KC.yellow, o = 1, seed = 1 }) {
  if (o <= 0.01) return null;
  const L = x1 - x0, g = krng(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const x = x0 + ((i / n) * L + T * vel + g() * 18) % L;
    return <circle key={i} cx={x} cy={yDe(x)} r={r} fill={color} stroke={KC.ink} strokeWidth={r / 3} />; })}</g>;
}

// Pajarito parado (pies en 0,0), mira a la derecha. aleteo 0..1 abre el ala; vuela = patas recogidas.
function Pajarito({ x = 0, y = 0, s = 1, T = 0, aleteo = 0, vuela = false, ojos = 'normal', color = PJ_CAFE, rot = 0, alaArriba = 0, alaLargo = 0 }) {
  const parpa = Math.sin(T * 1.7 + x) > 0.97;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {!vuela && <g stroke={KC.ink} strokeWidth={5} strokeLinecap="round" fill="none">
      <path d="M -10 -48 L -16 0" /><path d="M 12 -48 L 16 0" />
      <path d="M -30 2 Q -16 -8 -2 2" strokeWidth={6} /><path d="M 2 2 Q 16 -8 30 2" strokeWidth={6} />
    </g>}
    <path d="M -58 -78 L -118 -98 L -108 -70 Z" fill={PJ_ALA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={0} cy={-84} rx={62} ry={46} fill={color} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={14} cy={-70} rx={40} ry={28} fill={PJ_PECHO} />
    {alaLargo > 0
      ? <g transform={`translate(-6 -96) rotate(${-90 * alaArriba - 10})`}>
          <path d={`M 0 -18 C ${alaLargo * 0.4} -40 ${alaLargo * 0.8} -30 ${alaLargo} -8 L ${alaLargo - 20} 6 L ${alaLargo - 46} 2 L ${alaLargo - 66} 14 C ${alaLargo * 0.5} 22 ${alaLargo * 0.2} 20 0 16 Z`} fill={PJ_ALA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
        </g>
      : <path d={`M -44 -92 Q -4 ${-112 - aleteo * 90} 36 ${-86 - aleteo * 60} Q 6 -62 -44 -70 Z`} fill={PJ_ALA} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />}
    <circle cx={48} cy={-128} r={34} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M 76 -134 L 104 -124 L 76 -114 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {ojos === 'cerrados' || parpa
      ? <path d="M 50 -136 Q 60 -130 70 -136" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
      : <><circle cx={60} cy={-136} r={ojos === 'grandes' ? 12 : 9} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={63} cy={-136} r={ojos === 'grandes' ? 6 : 5} fill={KC.ink} /></>}
  </g>;
}

// Poste de madera visto de lado (x, desde yTop hasta yBase).
function Poste({ x, yTop, yBase = KH + 20, ancho = 46 }) {
  return <g>
    <rect x={x - ancho / 2} y={yTop} width={ancho} height={yBase - yTop} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={8} />
    {[0.2, 0.45, 0.7].map((f) => <line key={f} x1={x - ancho / 4} y1={yTop + 40 + f * 400} x2={x - ancho / 4} y2={yTop + 120 + f * 400} stroke="rgba(0,0,0,.25)" strokeWidth={5} strokeLinecap="round" />)}
  </g>;
}
// Aislador (pila de discos) con el cable arriba en (x, y).
function Aislador({ x, y, alto = 60, color = '#bfe6ff' }) {
  return <g>{[0, 1, 2].map((i) => <ellipse key={i} cx={x} cy={y + 14 + i * (alto / 3)} rx={22 - i * 2} ry={9} fill={color} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={x - 6} y={y} width={12} height={alto} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} /></g>;
}
// Poste visto de frente con cruceta. conductores: lista de [x, y]. fundas 0..1.
function PosteFrente({ x = 540, yCruz = 760, ancho = 820, conductores = [], fundas = 0, aisl = 70 }) {
  return <g>
    <rect x={x - 34} y={yCruz - 80} width={68} height={KH} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={9} />
    <rect x={x - ancho / 2} y={yCruz} width={ancho} height={44} rx={8} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={9} />
    {conductores.map(([cx, cy], i) => <g key={i}>
      <rect x={cx - 6} y={cy} width={12} height={Math.max(0, (cx === x ? yCruz - 80 : yCruz) - cy)} fill="#9aa3ad" stroke={KC.ink} strokeWidth={4} />
      <Aislador x={cx} y={cy + 10} alto={aisl * 0.6} />
      <circle cx={cx} cy={cy} r={20} fill={PJ_CABLE} stroke={KC.ink} strokeWidth={6} />
      <circle cx={cx - 6} cy={cy - 6} r={6} fill="#5b6270" />
      {fundas > 0 && <g opacity={fundas} transform={`translate(${cx} ${cy}) scale(${klerp(1.6, 1, fundas)})`}>
        <rect x={-46} y={-44} width={92} height={110} rx={40} fill={KC.orange} stroke={KC.ink} strokeWidth={7} opacity=".95" />
        <rect x={-30} y={-30} width={22} height={60} rx={10} fill="rgba(255,255,255,.45)" />
      </g>}
    </g>)}
  </g>;
}

// Águila / aguililla de frente con las alas abiertas. (x, y) = cuerpo. alas 0..1 (abiertas). aleteo = vaivén.
function Aguila({ x = 0, y = 0, s = 1, alas = 1, aleteo = 0, T = 0 }) {
  const W = klerp(110, 330, alas), dy = aleteo * Math.sin(T * 9) * 40;
  const ala = (sg) => { const tipX = sg * W, tipY = -30 + dy - (1 - alas) * 40;
    return <g>
      <path d={`M ${sg * 30} -50 C ${sg * W * 0.4} ${-110 + dy} ${sg * W * 0.8} ${-90 + dy} ${tipX} ${tipY} L ${sg * (W - 24)} ${tipY + 34} L ${sg * (W - 50)} ${tipY + 26} L ${sg * (W - 70)} ${tipY + 58} L ${sg * (W - 100)} ${tipY + 46} L ${sg * (W - 120)} ${tipY + 76} C ${sg * W * 0.4} ${10 + dy * 0.5} ${sg * 60} 10 ${sg * 30} 10 Z`}
        fill="#6b4423" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
      <path d={`M ${sg * 40} -36 C ${sg * W * 0.4} ${-80 + dy} ${sg * W * 0.65} ${-66 + dy} ${sg * W * 0.8} ${-40 + dy}`} fill="none" stroke="#a87445" strokeWidth={10} strokeLinecap="round" />
    </g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {ala(-1)}{ala(1)}
    <path d="M -26 60 L -40 130 L 0 140 L 40 130 L 26 60 Z" fill="#c4552b" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={52} ry={84} fill="#7a4d27" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={18} rx={32} ry={52} fill="#e8d2a8" />
    {[-14, 0, 14].map((k) => <path key={k} d={`M ${k - 8} ${10 + Math.abs(k)} q 8 8 16 0`} stroke="#7a4d27" strokeWidth={4} fill="none" />)}
    <circle cx={0} cy={-92} r={42} fill="#8a5a2e" stroke={KC.ink} strokeWidth={8} />
    <path d="M -12 -84 Q 0 -60 12 -84 Q 8 -96 0 -96 Q -8 -96 -12 -84 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <path d="M -6 -66 Q 0 -56 6 -66" fill={KC.ink} />
    <circle cx={-18} cy={-102} r={9} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={-17} cy={-101} r={5} fill={KC.ink} />
    <circle cx={18} cy={-102} r={9} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={17} cy={-101} r={5} fill={KC.ink} />
    <path d="M -30 -116 L -6 -110 M 30 -116 L 6 -110" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <g stroke={KC.ink} strokeWidth={6} strokeLinecap="round"><path d="M -18 78 L -22 104" /><path d="M 18 78 L 22 104" /></g>
  </g>;
}

// Camino de corriente que brilla (polilínea) con bolitas que lo recorren.
function CaminoBrilla({ pts, T, o = 1, p = 1, color = KC.yellow }) {
  if (o <= 0.01 || p <= 0.01) return null;
  const segs = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(d); L += d; }
  const at = (f) => { let r = f * L; for (let i = 0; i < segs.length; i++) { if (r <= segs[i]) { const u = r / segs[i]; return [klerp(pts[i][0], pts[i + 1][0], u), klerp(pts[i][1], pts[i + 1][1], u)]; } r -= segs[i]; } return pts[pts.length - 1]; };
  const s = pts.map((q) => q.join(',')).join(' ');
  return <g opacity={o}>
    <polyline points={s} fill="none" stroke={color} strokeWidth={34} strokeLinejoin="round" strokeLinecap="round" opacity={0.35 + 0.2 * Math.sin(T * 14)} strokeDasharray={`${L * p} ${L}`} />
    <polyline points={s} fill="none" stroke="#fff" strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={`${L * p} ${L}`} />
    {p > 0.98 && Array.from({ length: 7 }, (_, i) => { const [cx, cy] = at(((T * 0.9) + i / 7) % 1); return <circle key={i} cx={cx} cy={cy} r={10} fill={color} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Chispitas alrededor de un punto (cable caído).
function Chispas({ x, y, T, n = 9, r = 70, color = KC.yellow }) {
  return <g>{Array.from({ length: n }, (_, i) => { const f = ((T * 2.4) + i / n) % 1, a = i * 2.4 + Math.floor(T * 2.4 + i / n) * 1.3;
    const d = 14 + f * r; return <line key={i} x1={x + Math.cos(a) * d * 0.5} y1={y + Math.sin(a) * d * 0.5 - 10} x2={x + Math.cos(a) * d} y2={y + Math.sin(a) * d - 10} stroke={i % 2 ? color : '#fff'} strokeWidth={7} strokeLinecap="round" opacity={1 - f} />; })}</g>;
}
// Símbolo de tierra.
function Tierra({ x, y, color = KC.ink }) {
  return <g stroke={color} strokeWidth={8} strokeLinecap="round"><line x1={x} y1={y - 40} x2={x} y2={y} /><line x1={x - 44} y1={y} x2={x + 44} y2={y} /><line x1={x - 28} y1={y + 16} x2={x + 28} y2={y + 16} /><line x1={x - 12} y1={y + 32} x2={x + 12} y2={y + 32} /></g>;
}

// El cielo con postes y cables (cuadro 0 y cierre). tarde = colores de atardecer.
function CieloCables({ T, tarde = 0, flujo = 1 }) {
  const ys = [930, 1030];
  return <g>
    <defs><linearGradient id="pjTarde" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff7a59" /><stop offset="0.6" stopColor="#ffb05c" /><stop offset="1" stopColor="#ffd98a" /></linearGradient></defs>
    {tarde > 0 && <rect width={KW} height={KH} fill="url(#pjTarde)" opacity={tarde} />}
    {tarde > 0 ? <circle cx={760} cy={1500} r={170} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={tarde} /> : <SolDibujo x={180} y={560} r={60} T={T} />}
    <Nube x={350 + Math.sin(T * 0.3) * 20} y={420} s={0.9} />
    <Nube x={860 - Math.sin(T * 0.25) * 20} y={1560} s={0.8} />
    <path d="M 0 1600 Q 200 1520 420 1590 T 820 1570 T 1080 1560 L 1080 1920 L 0 1920 Z" fill={tarde ? '#c46a3c' : KC.leaf} stroke={KC.ink} strokeWidth={8} />
    {[[120, 1640], [330, 1680], [930, 1660]].map(([hx, hy], i) => <Casa key={i} x={hx} y={hy} s={0.45} luz={tarde > 0.5 ? 1 : 0} />)}
    <Poste x={150} yTop={880} /><Poste x={930} yTop={880} />
    {[150, 930].map((px) => <rect key={px} x={px - 120} y={900} width={240} height={26} rx={6} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={7} />)}
    {ys.map((y0, i) => <path key={i} d={cablePath(y0)} fill="none" stroke={PJ_CABLE} strokeWidth={12} />)}
    {ys.map((y0, i) => <Flujo key={i} T={T} yDe={(x) => cableY(x, y0)} n={16} r={7} vel={300} o={flujo * 0.9} seed={i + 2} />)}
  </g>;
}

function Pajaros() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho: el pajarito entra volando y aterriza en el cable de abajo
  const ATERRIZA = 0.9, vuelo = kprog(T, 0, ATERRIZA, kEase.suave);
  const bx = klerp(-120, 420, vuelo), by = klerp(640, cableY(420, 1030), vuelo) - Math.sin(vuelo * Math.PI) * 120;
  // escenas 2-3: primer plano del pajarito en un cable grueso
  const CY = 1000;
  // escena 5: dos cables y un poste
  const D = K.Dos, Y1 = 640, Y2 = 920, PX = 880;
  // escena 7: los cables se separan y se cubren
  const sep = kprog(T, K.Postes + 0.6, K.Postes + 2.0, kEase.suave), fun = kprog(T, K.Postes + 2.9, K.Postes + 3.6, kEase.sale);
  // escena 8: la persona se aleja arrastrando los pies (pasos cortitos)
  const TU0 = K.Tu + 1.6, pasos = Math.max(0, Math.min(14, (T - TU0) / 0.32)), pasoN = Math.floor(pasos), pasoF = pasos - pasoN;
  const perX = 600 + 22 * (pasoN + kEase.suave(kclamp(pasoF * 1.6, 0, 1)));
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.cyan }}>
      {/* 0 · gancho: el pajarito aterriza en el cable de luz */}
      <Escena T={T} a={K.Gancho} b={K.Corriente} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CieloCables T={T} />
          <Pajarito x={bx} y={by} s={1.1} T={T} vuela={T < ATERRIZA - 0.05} aleteo={T < ATERRIZA ? 0.5 + 0.5 * Math.sin(T * 40) : 0} ojos={T > 3.2 && T < 5 ? 'cerrados' : 'normal'} />
          <Pajarito x={700} y={cableY(700, 930)} s={0.8} T={T + 3} />
          <Onomato T={T} at={ATERRIZA} dur={0.9} x={420} y={760} texto="¡TAC!" tam={90} color={KC.yellow} />
        </Lienzo>
        <MitoTachado T={T} at={1.6} tacharEn={3.0} until={K.Corriente - 0.2} texto="¿magia?" x={300} y={560} tam={60} />
        <Etq T={T} at={1.2} until={K.Corriente - 0.2} x={460} y={1150} texto="cable de luz" color={KC.ink} />
      </Escena>
      {/* 1 · corriente: dos puntos con distinto voltaje y un camino */}
      <Escena T={T} a={K.Corriente} b={K.Patas} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          {(() => { const c = kprog(T, K.Corriente + 1.4, K.Corriente + 2.2, kEase.sale), A = [230, 700], B = [850, 1000];
            const pts = [A, [230, 1000], B];
            return <g>
              <rect x={150} y={480} width={160} height={220} rx={24} fill={KC.pink} stroke={KC.ink} strokeWidth={9} />
              <rect x={770} y={880} width={160} height={120} rx={24} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} />
              {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={190 + (i % 4) * 28 + Math.sin(T * 9 + i) * 6} cy={530 + Math.floor(i / 4) * 40 + Math.cos(T * 8 + i) * 6} r={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
              <line x1={230} y1={700} x2={230} y2={klerp(700, 1000, c)} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" />
              {c > 0.5 && <line x1={230} y1={1000} x2={klerp(230, 850, (c - 0.5) * 2)} y2={1000} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" />}
              <CaminoBrilla pts={pts} T={T} p={c} o={kprog(T, K.Corriente + 2.2, K.Corriente + 2.5)} />
              <TextoSvg x={230} y={460} tam={56} fuente="texto" color={KC.texto}>más voltaje</TextoSvg>
              <TextoSvg x={850} y={860} tam={56} fuente="texto" color={KC.texto}>menos voltaje</TextoSvg>
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Corriente + 2.4} until={K.Patas - 0.15} texto="camino = corriente" x={620} y={600} tam={46} borde={KC.ink} />
      </Escena>
      {/* 2-3 · primer plano: las dos patas en el mismo cable; la corriente sigue de largo */}
      <Escena T={T} a={K.Patas} b={K.Pregunta} fondo={KC.pink} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <path d={`M -20 ${CY} L 1100 ${CY}`} stroke={KC.ink} strokeWidth={58} />
          <path d={`M -20 ${CY} L 1100 ${CY}`} stroke={PJ_CABLE} strokeWidth={44} />
          <path d={`M -20 ${CY - 12} L 1100 ${CY - 12}`} stroke="#4a505c" strokeWidth={8} />
          <Flujo T={T} yDe={() => CY} n={14} r={13} vel={klerp(120, 420, kprog(T, K.Nada, K.Nada + 1))} o={kprog(T, K.Patas + 0.2, K.Patas + 0.8)} seed={7} />
          <Pajarito x={540} y={CY - 18} s={3.3} T={T} ojos={T > K.Nada + 3 ? 'cerrados' : 'normal'} />
          {T > K.Patas + 1.2 && T < K.Nada + 1.6 && [487, 593].map((fx, i) => { const e = kprog(T, K.Patas + 1.2 + i * 0.5, K.Patas + 1.6 + i * 0.5, kEase.rebote);
            return <g key={i} transform={`translate(${fx} ${CY}) scale(${e})`}>
              <circle r={44 + 8 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={10} />
              <rect x={-58} y={52} width={116} height={56} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <text x={0} y={92} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>pata {i + 1}</text>
            </g>; })}
          {T > K.Patas + 2.4 && T < K.Nada + 1.6 && <TextoSvg x={540} y={1130} tam={110} color={KC.yellow} s={klerp(0.3, 1, kprog(T, K.Patas + 2.4, K.Patas + 2.8, kEase.rebote))}>≈</TextoSvg>}
          {T > K.Nada + 0.3 && <g opacity={kprog(T, K.Nada + 0.3, K.Nada + 0.7) * (1 - kprog(T, K.Nada + 1.6, K.Nada + 2))}>
            <FlechaRecta x1={120} y1={CY + 110} x2={960} y2={CY + 110} p={kprog(T, K.Nada + 0.3, K.Nada + 1.2)} color={KC.yellow} />
          </g>}
        </Lienzo>
        <Chip T={T} at={K.Patas + 2.6} until={K.Nada - 0.1} texto="casi el mismo voltaje" x={540} y={330} tam={48} borde={KC.yellow} />
        <Chip T={T} at={K.Nada + 0.4} until={K.Nada + 1.7} texto="sigue de largo" x={540} y={330} tam={48} borde={KC.yellow} />
        <Lupa T={T} at={K.Nada + 1.8} until={K.Pregunta - 0.3} x={540} y={600} r={240} fx={540} fy={CY} tinte={KC.yellow} etiqueta="POR DENTRO · EL CABLE"
          interior={(t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 480 480">
            <rect width={480} height={480} fill="#0E0F12" />
            <rect x={-10} y={250} width={500} height={150} fill={PJ_COBRE} stroke="#7a4512" strokeWidth={6} />
            {Array.from({ length: 30 }, (_, i) => { const g = krng(60 + i), yy = 270 + g() * 110, x = ((g() * 480 + t * (380 + g() * 120)) % 520) - 20;
              return <circle key={i} cx={x} cy={yy} r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />; })}
            {[160, 320].map((lx, i) => <g key={i}><rect x={lx - 16} y={40} width={32} height={214} rx={14} fill="#c79a5b" stroke={KC.ink} strokeWidth={6} />
              <path d={`M ${lx - 60} 254 Q ${lx} 220 ${lx + 60} 254`} fill="none" stroke="#c79a5b" strokeWidth={22} strokeLinecap="round" /></g>)}
            <text x={240} y={150} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>patas</text>
            <text x={240} y={460} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.yellow}>metal del cable</text>
          </svg>} />
        <Chip T={T} at={K.Nada + 3.4} until={K.Pregunta - 0.2} texto="el cable conduce mucho mejor" x={540} y={1150} tam={40} borde={KC.yellow} />
      </Escena>
      {/* 4 · ¿y cuándo sí? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Dos} color={KC.lilac} />
      {/* 5 · toca dos cosas a la vez: le abre un camino (dibujo de advertencia) */}
      <Escena T={T} a={K.Dos} b={K.Aguilas} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <rect x={0} y={1180} width={KW} height={KH} fill="#7a5a3a" stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={1180} width={KW} height={26} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
          <Poste x={PX} yTop={520} yBase={1190} ancho={58} />
          <rect x={PX - 200} y={Y1 + 30} width={240} height={30} rx={6} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={7} />
          <rect x={PX - 200} y={Y2 + 30} width={240} height={30} rx={6} fill={PJ_MADERA} stroke={KC.ink} strokeWidth={7} />
          <Aislador x={PX - 170} y={Y1 - 10} alto={44} /><Aislador x={PX - 170} y={Y2 - 10} alto={44} />
          <line x1={-20} y1={Y1} x2={PX - 170} y2={Y1} stroke={PJ_CABLE} strokeWidth={14} />
          <line x1={-20} y1={Y2} x2={PX - 170} y2={Y2} stroke={PJ_CABLE} strokeWidth={14} />
          <Etq T={T} at={D + 0.2} until={D + 3.6} x={40} y={Y1 - 40} texto="otro cable" color={KC.ink} />
          {/* ave 1: estira el ala hasta el otro cable */}
          {(() => { const up = kprog(T, D + 0.6, D + 1.4, kEase.suave), o1 = 1 - kprog(T, D + 3.8, D + 4.2);
            return <g opacity={o1}>
              <CaminoBrilla pts={[[300, Y1], [330, Y2 - 230], [330, Y2 - 90], [330, Y2]]} T={T} p={kprog(T, D + 1.4, D + 1.9)} />
              <Pajarito x={330} y={Y2} s={1.5} T={T} alaLargo={190} alaArriba={up} ojos={T > D + 1.4 ? 'grandes' : 'normal'} />
              {T > D + 1.4 && <Alerta x={520} y={Y2 - 150} s={klerp(0.3, 0.9, kprog(T, D + 1.5, D + 1.8, kEase.rebote))} />}
            </g>; })()}
          {/* ave 2: toca el poste conectado a tierra */}
          {(() => { const e = kprog(T, D + 3.9, D + 4.4), up = kprog(T, D + 4.3, D + 5.0, kEase.suave);
            return e > 0 && <g opacity={e}>
              <CaminoBrilla pts={[[620, Y2], [640, Y2 - 120], [PX - 30, Y2 - 120], [PX - 30, 1170]]} T={T} p={kprog(T, D + 5.0, D + 5.6)} />
              <Pajarito x={600} y={Y2} s={1.5} T={T} alaLargo={190} alaArriba={up * 0.15} rot={0} ojos={T > D + 5 ? 'grandes' : 'normal'} />
              <Tierra x={PX - 30} y={1250} color={KC.ink} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={D + 1.6} until={D + 3.7} texto="¡le abre un camino!" x={420} y={420} tam={48} borde={KC.red} />
        <Etq T={T} at={D + 5.2} until={K.Aguilas - 0.1} x={PX - 60} y={760} texto="poste a tierra" lado="izq" color={KC.ink} />
        <Chip T={T} at={D + 5.4} until={K.Aguilas - 0.1} texto="dibujo de advertencia" x={360} y={420} tam={36} borde={KC.ink} mono />
      </Escena>
      {/* 6 · águilas y aguilillas: las alas abiertas alcanzan dos cosas */}
      <Escena T={T} a={K.Aguilas} b={K.Postes} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <PosteFrente x={540} yCruz={900} conductores={[[180, 840], [540, 740], [900, 840]]} />
          {(() => { const baja = kprog(T, K.Aguilas, K.Aguilas + 1.6, kEase.suave), abre = kprog(T, K.Aguilas + 1.4, K.Aguilas + 2.4, kEase.sale);
            return <Aguila x={klerp(200, 370, baja)} y={klerp(260, 700, baja)} s={0.92} alas={0.55 + 0.45 * abre} aleteo={1 - abre} T={T} />; })()}
          {T > K.Aguilas + 3.2 && [[180, 840], [540, 740]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={42 + 10 * Math.sin(T * 8)} fill="none" stroke={KC.yellow} strokeWidth={12} opacity={kprog(T, K.Aguilas + 3.2 + i * 0.3, K.Aguilas + 3.5 + i * 0.3)} />)}
          {T > K.Aguilas + 4.4 && <g opacity={kprog(T, K.Aguilas + 4.4, K.Aguilas + 4.8)}>
            <line x1={70} y1={540} x2={680} y2={540} stroke={KC.ink} strokeWidth={8} />
            <line x1={70} y1={515} x2={70} y2={565} stroke={KC.ink} strokeWidth={8} /><line x1={680} y1={515} x2={680} y2={565} stroke={KC.ink} strokeWidth={8} />
            <TextoSvg x={375} y={515} tam={46} fuente="texto" color={KC.texto}>alas abiertas</TextoSvg>
          </g>}
          <Pajarito x={900} y={820} s={0.7} T={T} />
        </Lienzo>
        <Etq T={T} at={K.Aguilas + 1.8} until={K.Postes - 0.1} x={150} y={1060} texto="águila · aguililla" color={KC.ink} />
        <Chip T={T} at={K.Aguilas + 3.4} until={K.Postes - 0.15} texto="dos cosas a la vez" x={540} y={420} tam={48} borde={KC.yellow} />
      </Escena>
      {/* 7 · postes adaptados: cables separados y cubiertos */}
      <Escena T={T} a={K.Postes} b={K.Tu} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <PosteFrente x={540} yCruz={900} ancho={klerp(820, 960, sep)} conductores={[[klerp(180, 90, sep), 840], [540, klerp(740, 600, sep)], [klerp(900, 990, sep), 840]]} fundas={fun} aisl={70} />
          {sep > 0 && sep < 1 && [[-1, 180], [1, 900]].map(([sg, cx]) => <FlechaRecta key={sg} x1={cx} y1={980} x2={cx + sg * 90} y2={980} p={1} color={KC.pink} grosor={12} punta={26} />)}
          {(() => { const llega = kprog(T, K.Postes + 4.0, K.Postes + 5.2, kEase.suave);
            return T > K.Postes + 4.0 && <Aguila x={klerp(1250, 330, llega)} y={klerp(380, 820, llega)} s={0.62} alas={1 - 0.75 * llega} aleteo={1 - llega} T={T} />; })()}
        </Lienzo>
        <Chip T={T} at={K.Postes + 0.5} until={K.Postes + 2.7} texto="separan los cables" x={540} y={420} tam={48} borde={KC.pink} />
        <Chip T={T} at={K.Postes + 2.8} until={K.Tu - 0.1} texto="o los cubren" x={540} y={420} tam={48} borde={KC.orange} />
        <Etq T={T} at={K.Postes + 3.4} until={K.Tu - 0.1} x={1000} y={1060} texto="cubierta" lado="izq" color={KC.ink} />
      </Escena>
      {/* 8 · tú: nunca te acerques a un cable caído */}
      <Escena T={T} a={K.Tu} b={K.Cierre} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <rect x={0} y={1140} width={KW} height={KH} fill="#7a5a3a" stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={1140} width={KW} height={26} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
          <g transform="rotate(-8 120 1150)"><Poste x={120} yTop={520} yBase={1160} ancho={52} /></g>
          <path d="M 170 560 Q 230 900 300 1140 L 470 1150" fill="none" stroke={PJ_CABLE} strokeWidth={14} strokeLinecap="round" />
          {[1, 2, 3].map((i) => { const f = ((T - K.Tu) * 0.6 + i / 3) % 1; return <ellipse key={i} cx={470} cy={1160} rx={40 + f * 340} ry={12 + f * 70} fill="none" stroke={KC.yellow} strokeWidth={8} opacity={(1 - f) * kprog(T, K.Tu + 0.4, K.Tu + 1)} />; })}
          <Chispas x={470} y={1150} T={T} />
          {T > K.Tu + 0.6 && <Alerta x={330} y={820} s={klerp(0.3, 1, kprog(T, K.Tu + 0.6, K.Tu + 0.9, kEase.rebote))} />}
          {/* pies juntos, pasos cortitos: se desliza sin despegar los pies */}
          <g transform={`translate(0 ${-Math.sin(pasoF * Math.PI) * 6 * (pasos > 0 && pasos < 14 ? 1 : 0)})`}>
            <PersonaSimple x={perX} yPies={1150} alto={330} color={KC.blue} cara="o" brazos={0.08} />
          </g>
          {pasos > 0 && Array.from({ length: Math.min(pasoN, 13) }, (_, i) => <ellipse key={i} cx={600 + 22 * i} cy={1158} rx={10} ry={4} fill="rgba(0,0,0,.25)" />)}
        </Lienzo>
        <Chip T={T} at={K.Tu + 0.5} until={K.Cierre - 0.1} texto="nunca te acerques" x={540} y={420} tam={52} borde={KC.red} />
        <Etq T={T} at={K.Tu + 1.8} until={K.Cierre - 0.1} x={560} y={700} texto="pies juntos, pasos cortos" lado="der" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Tu + 3.6} until={K.Cierre - 0.1} x={520} y={1200} texto="tú, en el suelo" lado="der" color={KC.ink} tam={30} />
      </Escena>
      {/* 9 · cierre: el mismo pajarito, tranquilo al atardecer */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CieloCables T={T} tarde={kprog(T, K.Cierre, K.Cierre + 1.5)} />
          <Pajarito x={420} y={cableY(420, 1030)} s={1.1} T={T} ojos="cerrados" />
          {(() => { const l = kprog(T, K.Cierre + 0.8, K.Cierre + 1.8, kEase.suave), xx = klerp(1200, 560, l), yy = klerp(700, cableY(560, 1030), l) - Math.sin(l * Math.PI) * 100;
            return <Pajarito x={xx} y={yy} s={0.95} T={T} vuela={l < 0.97} aleteo={l < 1 ? 0.5 + 0.5 * Math.sin(T * 40) : 0} color="#b07848" />; })()}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.2} until={K.Outro - 0.1} texto="sin camino, sin corriente" x={540} y={600} tam={50} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Corriente - 0.1} texto="No es magia: *no le da camino.*" />
      <Subtitulo T={T} idx={1} at={K.Corriente + 0.1} until={K.Patas - 0.1} texto="Fluye entre *distinto voltaje.*" />
      <Subtitulo T={T} idx={2} at={K.Patas + 0.1} until={K.Nada - 0.1} texto="Dos patas, *el mismo cable.*" />
      <Subtitulo T={T} idx={3} at={K.Nada + 0.1} until={K.Pregunta - 0.1} texto="La corriente *sigue de largo.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Dos - 0.1} texto="¿Cuándo *sí le pasa algo?*" />
      <Subtitulo T={T} idx={5} at={K.Dos + 0.1} until={K.Aguilas - 0.1} texto="Toca dos cosas: *abre un camino.*" />
      <Subtitulo T={T} idx={6} at={K.Aguilas + 0.1} until={K.Postes - 0.1} texto="Sobre todo *aves grandes.*" />
      <Subtitulo T={T} idx={7} at={K.Postes + 0.1} until={K.Tu - 0.1} texto="Postes *adaptados.*" />
      <Subtitulo T={T} idx={8} at={K.Tu + 0.1} until={K.Cierre - 0.1} texto="Cable caído: *no te acerques.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="No es inmune: *no hay por dónde.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Corriente - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Corriente + 1.4, K.Patas - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Nada + 2.6, K.Pregunta - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Dos + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.Dos + 1.8, K.Aguilas - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Aguilas + 2.2, K.Postes - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Postes + 2.0, K.Tu - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Tu + 0.4, K.Cierre - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_08_recostado_mano', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="30" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function PajarosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pajaros /></CompositionStage></div>;
}
window.PajarosApp = PajarosApp;
