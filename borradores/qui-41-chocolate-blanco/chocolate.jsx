// Shot Químico #41 · Esa capa blanca no es moho (el "bloom" del chocolate) — NARRADO (N1 por dentro + toque N5).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático. Tableta genérica, sin marca.
const CHOC = '#5b3220', CHOC2 = '#7a4529', CHOC_OSC = '#3d2014', MANTECA = '#f3d36b', BLOOM = '#e9e4da', AZUCAR = '#ffffff';

// Tableta de chocolate genérica (4 × 3 cuadros). bloom 0..1 = capa blanca; brillo 0..1; parte 0..1 = se parte en dos.
// borrado: { r, x, y } círculo donde se quitó el bloom (láser). azucar 0..1 = puntitos de azúcar.
function Tableta({ T = 0, x, y, s = 1, bloom = 0, brillo = 0, parte = 0, borrado, azucar = 0, gotas = 0, id = 'tb', seed = 11 }) {
  const W = 640, H = 420, cols = 4, filas = 3, cw = W / cols, ch = H / filas;
  const R = krng(seed);
  const manchas = Array.from({ length: 16 }, () => [(R() - 0.5) * W * 0.95, (R() - 0.5) * H * 0.9, 40 + R() * 90, 20 + R() * 50, R() * 180]);
  const vetas = Array.from({ length: 9 }, () => [(R() - 0.5) * W * 0.9, (R() - 0.5) * H * 0.8, 80 + R() * 160, R() * 180]);
  const R2 = krng(seed + 5);
  const puntos = Array.from({ length: 90 }, () => [(R2() - 0.5) * W * 0.96, (R2() - 0.5) * H * 0.94, 3 + R2() * 5]);
  const R3 = krng(seed + 9);
  const gts = Array.from({ length: 22 }, () => [(R3() - 0.5) * W * 0.9, (R3() - 0.5) * H * 0.85, 10 + R3() * 16, R3()]);
  const mitad = (lado) => {
    const dx = lado * parte * 40, rot = lado * parte * 8;
    const x0 = lado < 0 ? -W / 2 : 0;
    return <g transform={`translate(${dx} ${parte * 10}) rotate(${rot} ${lado * W / 4} ${H / 2})`}>
      <clipPath id={`${id}c${lado}`}><rect x={x0} y={-H / 2} width={W / 2} height={H} /></clipPath>
      <g clipPath={`url(#${id}c${lado})`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={18} fill={CHOC} />
        {Array.from({ length: cols * filas }, (_, i) => { const c = i % cols, f = Math.floor(i / cols), qx = -W / 2 + c * cw, qy = -H / 2 + f * ch;
          return <g key={i}><rect x={qx + 10} y={qy + 10} width={cw - 20} height={ch - 20} rx={10} fill={CHOC2} stroke={CHOC_OSC} strokeWidth={5} />
            <rect x={qx + 22} y={qy + 22} width={cw - 44} height={ch - 44} rx={8} fill={CHOC} /></g>; })}
        {bloom > 0 && <g opacity={bloom}>
          {manchas.map(([mx, my, rx, ry, r], i) => <ellipse key={i} cx={mx} cy={my} rx={rx} ry={ry} transform={`rotate(${r} ${mx} ${my})`} fill={BLOOM} opacity={0.55} />)}
          {vetas.map(([vx, vy, l, r], i) => <path key={i} d={`M ${vx} ${vy} q ${l / 2} ${-20} ${l} 0`} transform={`rotate(${r} ${vx} ${vy})`} stroke="#fbf8f2" strokeWidth={10} fill="none" opacity={0.7} strokeLinecap="round" />)}
        </g>}
        {azucar > 0 && <g opacity={azucar}>{puntos.map(([px, py, r], i) => <rect key={i} x={px} y={py} width={r} height={r} fill={AZUCAR} transform={`rotate(${i * 23} ${px} ${py})`} />)}</g>}
        {borrado && borrado.r > 0 && <g>
          <circle cx={borrado.x} cy={borrado.y} r={borrado.r} fill={CHOC2} />
          <circle cx={borrado.x} cy={borrado.y} r={borrado.r * 0.75} fill={CHOC} opacity={0.6} /></g>}
        {brillo > 0 && <path d={`M ${-W / 2 + 40} ${-H / 2 + 30} L ${-W / 2 + 200} ${-H / 2 + 30} L ${-W / 2 + 60} ${H / 2 - 30} L ${-W / 2 + 10} ${H / 2 - 30} Z`} fill="#fff" opacity={0.22 * brillo} transform={`translate(${((T * 160) % (W + 300)) - 100} 0)`} />}
      </g>
      <rect x={x0} y={-H / 2} width={W / 2} height={H} fill="none" stroke={KC.ink} strokeWidth={0} />
    </g>;
  };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-W / 2 + 14} y={-H / 2 + 18} width={W} height={H} rx={18} fill="rgba(0,0,0,.28)" />
    {mitad(-1)}{mitad(1)}
    {parte <= 0.02 && <rect x={-W / 2} y={-H / 2} width={W} height={H} rx={18} fill="none" stroke={KC.ink} strokeWidth={10} />}
    {parte > 0.02 && [-1, 1].map((l) => <rect key={l} x={l < 0 ? -W / 2 : 0} y={-H / 2} width={W / 2} height={H} rx={14} fill="none" stroke={KC.ink} strokeWidth={10}
      transform={`translate(${l * parte * 40} ${parte * 10}) rotate(${l * parte * 8} ${l * W / 4} ${H / 2})`} />)}
    {gotas > 0 && gts.map(([gx, gy, r, k], i) => k < gotas ? <g key={i}><ellipse cx={gx} cy={gy} rx={r} ry={r * 0.8} fill="rgba(160,220,255,.75)" stroke="#2a6fa8" strokeWidth={3} />
      <circle cx={gx - r * 0.3} cy={gy - r * 0.3} r={r * 0.25} fill="#fff" /></g> : null)}
  </g>;
}
// Envoltura de papel aluminio que se baja (abre 0..1).
function Envoltura({ x, y, abre = 0 }) {
  const dx = abre * 1100;
  return <g transform={`translate(${x + dx} ${y}) rotate(${abre * 12})`} opacity={1 - kprog(abre, 0.85, 1)}>
    <rect x={-345} y={-235} width={690} height={470} rx={20} fill="#c9ccd3" stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-330 + i * 100} -230 l 40 460`} stroke="#eef0f4" strokeWidth={12} opacity={0.7} />)}
    <rect x={-345} y={-40} width={690} height={120} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={42} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">CHOCOLATE</text>
  </g>;
}
// Lupa de mano dibujada (vidrio con contenido aumentado).
function LupaMano({ x, y, r = 150, o = 1, id = 'lm', children }) {
  if (o <= 0) return null;
  return <g opacity={o} transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, o)})`}>
    <line x1={r * 0.72} y1={r * 0.72} x2={r * 1.5} y2={r * 1.5} stroke={KC.ink} strokeWidth={34} strokeLinecap="round" />
    <line x1={r * 0.75} y1={r * 0.75} x2={r * 1.45} y2={r * 1.45} stroke={KC.orange} strokeWidth={20} strokeLinecap="round" />
    <clipPath id={id}><circle r={r} /></clipPath>
    <g clipPath={`url(#${id})`}><circle r={r} fill={KC.noche} />{children}</g>
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={16} /><circle r={r - 10} fill="none" stroke="#fff" strokeWidth={4} opacity={0.6} />
  </g>;
}
// Cristal esquemático de manteca de cacao, forma I–VI.
function CristalForma({ n, x, y, s = 1, o = 1, glow = 0, T = 0 }) {
  if (o <= 0) return null;
  const col = n === 5 ? KC.gold2 : n === 6 ? '#f6f3ec' : ['#c9b26a', '#d8bf6d', '#e0c66e', '#e8cd70'][n - 1];
  let forma;
  if (n === 1) forma = <path d="M -40 -10 Q -20 -44 10 -30 Q 46 -20 34 14 Q 20 44 -14 36 Q -48 24 -40 -10 Z" />;
  else if (n === 2) forma = <path d="M -44 0 L -20 -38 L 26 -36 L 46 4 L 20 38 L -24 34 Z" />;
  else if (n === 3) forma = <path d="M -50 -14 L 0 -44 L 50 -14 L 50 18 L 0 46 L -50 18 Z" />;
  else if (n === 4) forma = <path d="M -56 -20 L 56 -30 L 60 -6 L -52 6 Z M -50 14 L 58 6 L 54 30 L -56 36 Z" />;
  else if (n === 5) forma = <path d="M 0 -56 L 50 0 L 0 56 L -50 0 Z" />;
  else forma = <g>{[-24, -8, 8, 24].map((dx, i) => <path key={i} d={`M ${dx - 6} 56 L ${dx + (i - 1.5) * 10} -60 L ${dx + 6} 56 Z`} />)}</g>;
  return <g transform={`translate(${x} ${y}) scale(${s * klerp(0.4, 1, o)})`} opacity={o}>
    {glow > 0 && <circle r={90 + Math.sin(T * 6) * 6} fill={KC.gold2} opacity={0.35 * glow} />}
    <g fill={col} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round">{forma}</g>
  </g>;
}
function Sol({ T, x, y, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(${T * 20})`} opacity={o}>
    {Array.from({ length: 12 }, (_, i) => <path key={i} d="M -14 -100 L 0 -140 L 14 -100 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}
    <circle r={86} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Refri({ T, x, y, abre = 0, s = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-420} width={420} height={840} rx={36} fill="#f4f7fb" stroke={KC.ink} strokeWidth={10} />
    <rect x={-190} y={-400} width={380} height={800} rx={24} fill="#cfefff" opacity={abre} />
    {abre > 0 && [-200, 0, 200].map((yy) => <line key={yy} x1={-190} x2={190} y1={yy} y2={yy} stroke="#9fc9e0" strokeWidth={8} opacity={abre} />)}
    {children}
    <g transform={`translate(-210 0) scale(${Math.cos(abre * 1.3)} 1)`}>
      <rect x={0} y={-420} width={420} height={840} rx={36} fill="#e9eef4" stroke={KC.ink} strokeWidth={10} />
      <line x1={0} x2={420} y1={-120} y2={-120} stroke={KC.ink} strokeWidth={8} />
      <rect x={360} y={-80} width={22} height={200} rx={10} fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Patrón de difracción esquemático (anillos) para la forma n.
function Anillos({ n, x, y, o = 1, resalta = 0, T = 0 }) {
  if (o <= 0) return null;
  const rs = [[30, 52], [24, 46, 62], [20, 38, 58], [18, 34, 50, 64], [16, 30, 44, 58, 70], [14, 26, 38, 50, 62, 72]][n - 1];
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.5, 1, o)})`} opacity={o}>
    <rect x={-90} y={-90} width={180} height={180} rx={18} fill="#0b0f1a" stroke={resalta > 0 ? KC.gold2 : KC.ink} strokeWidth={resalta > 0 ? 10 : 6} />
    {rs.map((r, i) => <circle key={i} r={r} fill="none" stroke="#cfe9ff" strokeWidth={3 + (i % 2) * 2} opacity={0.85} />)}
    <circle r={6} fill="#fff" />
    <text x={0} y={-104} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{['I', 'II', 'III', 'IV', 'V', 'VI'][n - 1]}</text>
  </g>;
}
function Aparato({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-70} width={260} height={140} rx={24} fill="#3a4152" stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-44} width={110} height={70} rx={10} fill="#7fe0c0" stroke={KC.ink} strokeWidth={5} />
    <rect x={110} y={-30} width={60} height={60} rx={8} fill="#262b38" stroke={KC.ink} strokeWidth={7} />
    <path d="M -60 70 L -20 70 L -30 220 L -80 220 Z" fill="#262b38" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
function Lengua({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -60 L 90 -60 L 90 40 Q 90 140 0 140 Q -90 140 -90 40 Z" fill="#ff8fa3" stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 -40 L 0 90" stroke="#d9667e" strokeWidth={8} strokeLinecap="round" />
  </g>;
}
function Escudo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -110 L 90 -76 L 90 10 Q 90 90 0 130 Q -90 90 -90 10 L -90 -76 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -38 6 L -10 36 L 42 -24" stroke={KC.ink} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}

function Chocolate() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, M: CUES.Manteca, F: CUES.FormaV, Ca: CUES.Calor, P: CUES.Pregunta, Az: CUES.Azucar, Es: CUES.Estudio, La: CUES.Laser, Co: CUES.Comer, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const mCr = K.M + 2.6;            // entra el mundo de los cristales
  const fCrack = K.F + 2.2, fTemp = K.F + 4.0;
  const azMicro = K.Az + 2.3;
  const esRay = K.Es + 3.0;
  const TX = 540, TY = 940;          // tableta centrada
  const abre = kprog(T, K.G, K.G + 0.9, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: se abre la envoltura y aparece la capa blanca */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Tableta T={T} x={TX} y={TY} bloom={1} id="g0" />
          <Envoltura x={TX} y={TY} abre={abre} />
          <LupaMano x={720} y={850} r={150} o={kprog(T, K.G + 2.6, K.G + 3.1, kEase.sale)} id="lmg">
            {Array.from({ length: 9 }, (_, i) => <g key={i} transform={`translate(${-90 + (i % 3) * 90} ${-70 + Math.floor(i / 3) * 70}) rotate(${i * 40 + T * 10})`}>
              {i % 2 ? <rect x={-14} y={-14} width={28} height={28} fill={AZUCAR} stroke={KC.ink} strokeWidth={3} />
                : <path d="M -6 30 L 0 -34 L 6 30 Z" fill="#f6f3ec" stroke={KC.ink} strokeWidth={3} />}</g>)}
          </LupaMano>
        </SvgCapa>
        <Escala T={T} pxPorMm={6.4} x={60} y={1640} color={KC.texto} />
      </Escena>
      {/* 1 · se llama bloom: dos tipos */}
      <Escena T={T} a={K.Q} b={K.M}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tableta T={T} x={TX} y={960} s={0.65} bloom={1} id="q0" />
          <text x={TX} y={720} textAnchor="middle" transform={`translate(${TX} 720) scale(${kprog(T, K.Q, K.Q + 0.5, kEase.rebote)}) translate(${-TX} -720)`}
            style={{ font:`400 190px ${KF.titulo}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={10} paintOrder="stroke">BLOOM</text>
          <g opacity={kprog(T, K.Q + 1.2, K.Q + 1.6)} transform={`translate(170 ${1150 + Math.sin(T * 3) * 6})`}>
            <path d="M 0 -70 Q -60 10 -40 40 Q 0 80 40 40 Q 60 10 0 -70 Z" fill={MANTECA} stroke={KC.ink} strokeWidth={7} /></g>
          <g opacity={kprog(T, K.Q + 1.8, K.Q + 2.2)}><rect x={870} y={1100} width={90} height={90} fill={AZUCAR} stroke={KC.ink} strokeWidth={7} transform={`rotate(${Math.sin(T * 2) * 8} 915 1145)`} /></g>
        </SvgCapa>
      </Escena>
      {/* 2 · 30 % es manteca de cacao */}
      <Escena T={T} a={K.M} b={mCr}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Tableta T={T} x={TX} y={TY} brillo={1} id="m0" />
          <clipPath id="m30"><rect x={TX - 320} y={TY + 210 - 420 * 0.3 * kprog(T, K.M + 0.4, K.M + 1.6, kEase.sale)} width={640} height={420} /></clipPath>
          <rect x={TX - 320} y={TY - 210} width={640} height={420} rx={18} fill={MANTECA} opacity={0.85} clipPath="url(#m30)" stroke={KC.ink} strokeWidth={6} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.M + 0.5} until={mCr - 0.2} valor={30} dur={1.1} prefijo="≈" sufijo=" %" etiqueta="manteca de cacao" y={540} tam={160} color={MANTECA} />
      </Escena>
      {/* 2–3 · las 6 formas de cristal; la V se ilumina */}
      <Escena T={T} a={mCr} b={fCrack}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} />
        <SvgCapa>
          {[1, 2, 3, 4, 5, 6].map((n, i) => { const cx = 250 + (i % 3) * 290, cy = 760 + Math.floor(i / 3) * 300, t0 = mCr + 0.2 + i * 0.35;
            return <g key={n}>
              <CristalForma n={n} x={cx} y={cy + Math.sin(T * 2 + i) * 6} s={1.3} o={kprog(T, t0, t0 + 0.4, kEase.rebote)} glow={n === 5 ? kprog(T, K.F, K.F + 0.4) : 0} T={T} />
              <text x={cx} y={cy + 125} textAnchor="middle" opacity={kprog(T, t0, t0 + 0.4) * (n === 5 || T < K.F ? 1 : 0.35)} style={{ font:`400 54px ${KF.titulo}` }} fill={n === 5 ? KC.gold2 : KC.texto}>{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</text></g>; })}
          <path d={`M 160 ${700} L 920 ${700}`} stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="12 12" opacity={kprog(T, mCr + 2.2, mCr + 2.6)} />
        </SvgCapa>
        <Etq T={T} at={mCr + 2.3} until={K.F - 0.1} x={160} y={640} texto="menos estable → más estable" tam={32} color={KC.texto} />
        <Escala T={T} pxPorMm={60000} x={60} y={1640} color={KC.texto} />
      </Escena>
      {/* 3 · brillo y ¡crack! */}
      <Escena T={T} a={fCrack} b={fTemp}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Tableta T={T} x={TX} y={TY} brillo={1} parte={kprog(T, fCrack + 0.6, fCrack + 0.9, kEase.sale)} id="f0" />
          <Onomato T={T} at={fCrack + 0.6} until={fTemp - 0.1} x={TX} y={700} texto="¡CRACK!" tam={130} color={KC.yellow} />
        </SvgCapa>
      </Escena>
      {/* 3 · templado: sube, baja, sube; se mueve; quedan cristales V */}
      <Escena T={T} a={fTemp} b={K.Ca}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {(() => { const p = kprog(T, fTemp + 0.2, K.Ca - 0.4); const curva = (u) => u < 0.33 ? klerp(0.3, 0.95, u / 0.33) : u < 0.66 ? klerp(0.95, 0.45, (u - 0.33) / 0.33) : klerp(0.45, 0.6, (u - 0.66) / 0.34);
            const nivel = curva(p); return <g>
              <rect x={150} y={640} width={70} height={520} rx={35} fill="#fff" stroke={KC.ink} strokeWidth={8} />
              <rect x={168} y={1140 - 470 * nivel} width={34} height={470 * nivel} rx={17} fill={KC.red} />
              <circle cx={185} cy={1170} r={56} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
              <path d={Array.from({ length: 41 }, (_, i) => { const u = i / 40 * p; return `${i ? 'L' : 'M'} ${300 + u * 680} ${700 + (1 - curva(u)) * 300}`; }).join(' ')} stroke={KC.red} strokeWidth={10} fill="none" strokeLinecap="round" />
              <path d="M 380 1110 Q 600 1250 820 1110 Z" fill={CHOC} stroke={KC.ink} strokeWidth={9} />
              <ellipse cx={600} cy={1110} rx={220} ry={34} fill={CHOC2} stroke={KC.ink} strokeWidth={7} />
              <g transform={`rotate(${Math.sin(T * 5) * 20} 600 1110)`}><rect x={588} y={880} width={24} height={240} rx={10} fill="#e9c27a" stroke={KC.ink} strokeWidth={6} /></g>
              {[0, 1, 2, 3, 4].map((i) => <CristalForma key={i} n={5} x={420 + i * 90} y={620} s={0.6} o={kprog(T, K.Ca - 1.4 + i * 0.12, K.Ca - 1.0 + i * 0.12, kEase.rebote)} T={T} />)}
            </g>; })()}
        </SvgCapa>
        <Etq T={T} at={fTemp + 0.4} until={K.Ca - 0.2} x={250} y={1420} texto="temperaturas precisas" tam={34} color={KC.texto} />
      </Escena>
      {/* 4 · calor: la manteca sube y recristaliza blanca */}
      <Escena T={T} a={K.Ca} b={K.P}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Sol T={T} x={900} y={560} o={kprog(T, K.Ca, K.Ca + 0.4, kEase.rebote)} />
          <Tableta T={T} x={290} y={960} s={0.55} bloom={kprog(T, K.Ca + 2.6, K.P - 0.4)} id="c0" />
          <line x1={420} y1={960} x2={540} y2={960} stroke={KC.ink} strokeWidth={6} strokeDasharray="12 10" />
          <clipPath id="corte"><circle cx={760} cy={960} r={230} /></clipPath>
          <g clipPath="url(#corte)">
            <rect x={520} y={720} width={480} height={480} fill={KC.noche} />
            <rect x={520} y={860} width={480} height={340} fill={CHOC} />
            {[600, 690, 780, 870, 950].map((px, i) => <path key={i} d={`M ${px} 1200 Q ${px + 20} 1030 ${px - 10} 860`} stroke={CHOC_OSC} strokeWidth={10} fill="none" />)}
            {[600, 690, 780, 870, 950].map((px, i) => { const t0 = K.Ca + 0.8 + i * 0.25, u = kprog(T, t0, t0 + 1.6, kEase.suave);
              return u > 0 && u < 1 ? <circle key={i} cx={px + Math.sin(u * 3) * 14} cy={klerp(1180, 870, u)} r={14} fill={MANTECA} stroke={KC.ink} strokeWidth={3} /> : null; })}
            {Array.from({ length: 14 }, (_, i) => { const t0 = K.Ca + 2.4 + i * 0.1, h = 60 * kprog(T, t0, t0 + 0.5, kEase.sale);
              return <path key={i} d={`M ${560 + i * 30 - 5} 862 L ${560 + i * 30 + ((i % 3) - 1) * 8} ${862 - h} L ${560 + i * 30 + 5} 862 Z`} fill="#f6f3ec" stroke={KC.ink} strokeWidth={2} />; })}
          </g>
          <circle cx={760} cy={960} r={230} fill="none" stroke={KC.ink} strokeWidth={12} />
        </SvgCapa>
        <Etq T={T} at={K.Ca + 1.0} until={K.Ca + 2.7} x={180} y={1420} texto="manteca líquida sube" lado="der" tam={30} color={KC.texto} />
        <Chip T={T} at={K.Ca + 2.8} until={K.P - 0.2} texto="se recristaliza: forma VI" y={1500} tam={40} borde={KC.texto} />
      </Escena>
      {/* 5 · ¿y en el refri? */}
      <Escena T={T} a={K.P} b={K.Az} zoom={0.08}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Refri T={T} x={300} y={960} s={0.8} abre={kprog(T, K.P + 0.2, K.P + 0.9, kEase.sale)}>
            <g transform="translate(0 -60)"><Tableta T={T} x={0} y={0} s={0.45} id="p0" /></g>
          </Refri>
          <text x={300} y={600} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} paintOrder="stroke" transform={`rotate(${Math.sin(T * 3) * 6} 300 500)`} opacity={kprog(T, K.P + 0.4, K.P + 0.7)}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · sale del refri: gotas de condensación */}
      <Escena T={T} a={K.Az} b={azMicro}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Tableta T={T} x={klerp(260, TX, kprog(T, K.Az - 0.3, K.Az + 0.6, kEase.sale))} y={TY} gotas={kprog(T, K.Az + 0.5, K.Az + 2.0)} id="a0" />
        </SvgCapa>
        <Etq T={T} at={K.Az + 0.8} until={azMicro - 0.1} x={220} y={1240} texto="el agua se condensa" tam={32} color={KC.texto} />
      </Escena>
      {/* 6 · micro: la gota disuelve el azúcar y al secarse deja polvito */}
      <Escena T={T} a={azMicro} b={K.Es}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} />
        <SvgCapa>
          <rect x={0} y={1060} width={KW} height={200} fill={CHOC} />
          {(() => { const dis = kprog(T, azMicro + 0.3, azMicro + 1.6), seca = kprog(T, azMicro + 1.7, K.Es - 0.5, kEase.suave);
            return <g>
              <path d={`M ${540 - 330 * (1 - seca)} 1060 Q 540 ${1060 - 520 * (1 - seca)} ${540 + 330 * (1 - seca)} 1060 Z`} fill="rgba(140,205,255,.55)" stroke="#bfe8ff" strokeWidth={6} opacity={1 - seca * 0.9} />
              {[[400, 1000], [520, 940], [640, 990], [470, 1030], [600, 1035]].map(([cx, cy], i) => { const l = 70 * (1 - dis); return l > 2 ? <rect key={i} x={cx - l / 2} y={cy - l / 2} width={l} height={l} fill={AZUCAR} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 17} ${cx} ${cy})`} /> : null; })}
              {dis > 0.5 && seca < 1 && Array.from({ length: 30 }, (_, i) => <circle key={i} cx={300 + ((i * 97) % 480)} cy={1050 - ((i * 53) % 300) * (1 - seca)} r={4} fill="#fff" opacity={0.7} />)}
              {seca > 0.6 && Array.from({ length: 26 }, (_, i) => { const px = 260 + i * 21, h = 18 + (i % 4) * 8; return <rect key={i} x={px} y={1060 - h * kprog(seca, 0.6, 1)} width={14} height={h * kprog(seca, 0.6, 1)} fill={AZUCAR} stroke={KC.ink} strokeWidth={2} />; })}
            </g>; })()}
        </SvgCapa>
        <Etq T={T} at={azMicro + 0.3} until={azMicro + 1.7} x={1040} y={760} texto="el azúcar se disuelve" lado="izq" tam={32} color="#bfe8ff" />
        <Chip T={T} at={K.Es - 1.6} until={K.Es - 0.1} texto="al secarse: polvito de azúcar" y={1500} tam={40} borde={AZUCAR} />
        <Escala T={T} pxPorMm={20000} x={60} y={1640} color={KC.texto} />
      </Escena>
      {/* 7 · 1966: rayos X y las 6 formas */}
      <Escena T={T} a={K.Es} b={K.La}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T > esRay - 0.3 && <g>
            <rect x={60} y={560} width={160} height={90} rx={14} fill="#3a4152" stroke={KC.ink} strokeWidth={8} opacity={kprog(T, esRay - 0.3, esRay)} />
            <path d={`M 220 605 L ${klerp(220, 520, kprog(T, esRay, esRay + 0.4))} 605`} stroke="#bfe8ff" strokeWidth={14} strokeLinecap="round" strokeDasharray="6 10" strokeDashoffset={-T * 60} />
            <CristalForma n={6} x={560} y={605} s={0.7} o={kprog(T, esRay, esRay + 0.3)} T={T} />
            {[1, 2, 3, 4, 5, 6].map((n, i) => { const t0 = esRay + 0.6 + i * 0.3; return <Anillos key={n} n={n} x={240 + (i % 3) * 300} y={840 + Math.floor(i / 3) * 250} o={kprog(T, t0, t0 + 0.35, kEase.sale)} resalta={n === 6 ? kprog(T, K.La - 2.2, K.La - 1.9) : 0} />; })}
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={esRay - 0.2} anio="1966" quien="Wille y Lutton · Cincinnati, EUA" revista="J Am Oil Chem Soc · rayos X" x={540} y={860} />
        <Chip T={T} at={K.La - 2.2} until={K.La - 0.1} texto="bloom: nunca sin forma VI" y={1500} tam={42} borde={KC.gold2} />
      </Escena>
      {/* 8 · 2020: láser infrarrojo que borra parte del bloom */}
      <Escena T={T} a={K.La} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Tableta T={T} x={600} y={1000} s={0.75} bloom={1} borrado={{ x: 60, y: 0, r: 110 * kprog(T, K.La + 2.4, K.La + 4.4, kEase.suave) }} id="l0" />
          <g opacity={kprog(T, K.La + 1.8, K.La + 2.2)}><Aparato x={230} y={780} s={0.9} /></g>
          {T > K.La + 2.2 && <g>
            <line x1={385} y1={780} x2={645} y2={1000} stroke="#fff" strokeWidth={30} opacity={0.10 + 0.04 * Math.sin(T * 9)} strokeLinecap="round" />
            <circle cx={645} cy={1000} r={60 + Math.sin(T * 8) * 6} fill="#fff" opacity={0.12} />
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.La + 0.2} until={K.La + 2.0} anio="2020" quien="Univ. del Sur de Florida" revista="Scientific Reports" x={540} y={760} />
        <Etq T={T} at={K.La + 2.3} until={K.Co - 0.2} x={1040} y={780} lado="izq" texto="láser infrarrojo · invisible" tam={30} color={KC.ink} />
        <Chip T={T} at={K.La + 3.0} until={K.Co - 0.2} texto="borró parte del bloom de grasa" y={1500} tam={38} borde={KC.texto} />
      </Escena>
      {/* 9 · se puede comer */}
      <Escena T={T} a={K.Co} b={K.Ci}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tableta T={T} x={TX} y={820} s={0.6} bloom={1} id="c1" />
          <Marca x={850} y={700} ok={true} s={1.1} o={kprog(T, K.Co + 1.2, K.Co + 1.6)} />
          <g opacity={kprog(T, K.Co + 2.6, K.Co + 3.0)}><Lengua x={300} y={1090} s={0.7} /></g>
          <g opacity={kprog(T, K.Co + 3.6, K.Co + 4.0)}><Escudo x={780} y={1090} s={0.7} /></g>
        </SvgCapa>
        <Chip T={T} at={K.Co + 0.2} until={K.Ci - 0.2} texto="CFIA · Canadá: se puede comer" y={1500} tam={40} borde={KC.mint} />
        <Etq T={T} at={K.Co + 2.8} until={K.Ci - 0.2} x={70} y={990} texto="¿sabor? puede cambiar" tam={28} color={KC.ink} />
        <Etq T={T} at={K.Co + 3.8} until={K.Ci - 0.2} x={1010} y={990} texto="no es riesgo" lado="izq" tam={28} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: la tableta del inicio, ahora con sus etiquetas */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Tableta T={T} x={TX} y={TY} bloom={1} azucar={0.8} id="z0" /></SvgCapa>
        <Etq T={T} at={K.Ci + 0.6} until={K.Ou} x={330} y={690} texto="cristales de grasa (VI)" lado="der" tam={32} color={KC.texto} />
        <Etq T={T} at={K.Ci + 1.4} until={K.Ou} x={780} y={1180} texto="cristales de azúcar" lado="izq" tam={32} color={KC.texto} />
        <Chip T={T} at={K.Ci + 2.4} until={K.Ou} texto="guárdalo fresco y seco" y={1500} tam={44} borde={KC.mint} />
        <Escala T={T} pxPorMm={6.4} x={60} y={1640} color={KC.texto} />
      </Escena>

      {/* textos del gancho */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.7} until={K.G + 3.0} texto="¿moho?" x={300} y={500} tam={60} />
      <Etq T={T} at={K.G + 3.3} until={K.Q - 0.2} x={40} y={680} texto="grasa o azúcar, en cristales" lado="der" tam={24} color={KC.texto} />
      <Etq T={T} at={K.Q + 1.3} until={K.M - 0.2} x={60} y={1040} texto="de grasa" lado="der" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Q + 1.9} until={K.M - 0.2} x={1020} y={1040} texto="de azúcar" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.F + 0.3} until={fCrack - 0.1} texto="forma V: brillo y crack" y={1500} tam={42} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es moho: *son cristales.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.M - 0.1} texto="Se llama *bloom.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.F - 0.1} texto="Manteca de cacao: *6 formas.*" />
      <Subtitulo T={T} idx={3} at={K.F + 0.1} until={K.Ca - 0.1} texto="La buena: *la forma 5.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.P - 0.1} texto="Con calor *recristaliza.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Az - 0.1} texto="¿Y en *el refri?*" />
      <Subtitulo T={T} idx={6} at={K.Az + 0.1} until={K.Es - 0.1} texto="El agua *disuelve el azúcar.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.La - 0.1} texto="1966: *seis formas.*" />
      <Subtitulo T={T} idx={8} at={K.La + 0.1} until={K.Co - 0.1} texto="Borrado *con láser.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="Se puede *comer.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Guárdalo *fresco y seco.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Manteca + 0.3, CUES.FormaV - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.FormaV + 2.4, CUES.Calor - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Calor + 0.6, CUES.Pregunta - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Azucar + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Azucar + 2.4, CUES.Estudio - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.4, CUES.Laser - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Laser + 0.4, CUES.Comer - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Comer + 0.4, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="41" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChocolateApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Chocolate /></CompositionStage></div>;
}
window.ChocolateApp = ChocolateApp;
